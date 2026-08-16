var Ic=Object.create;var xs=Object.defineProperty;var Lc=Object.getOwnPropertyDescriptor;var Oc=Object.getOwnPropertyNames;var Dc=Object.getPrototypeOf,Mc=Object.prototype.hasOwnProperty;var Nc=(e,t,r)=>t in e?xs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Ss=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Pc=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Oc(t))!Mc.call(e,s)&&s!==r&&xs(e,s,{get:()=>t[s],enumerable:!(n=Lc(t,s))||n.enumerable});return e};var Fc=(e,t,r)=>(r=e!=null?Ic(Dc(e)):{},Pc(t||!e||!e.__esModule?xs(r,"default",{value:e,enumerable:!0}):r,e));var Je=(e,t,r)=>Nc(e,typeof t!="symbol"?t+"":t,r);var $a=Ss((c_,ka)=>{var Nr=1e3,Pr=Nr*60,Fr=Pr*60,Sr=Fr*24,zc=Sr*7,Hc=Sr*365.25;ka.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Wc(e);if(r==="number"&&isFinite(e))return t.long?Yc(e):Gc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Wc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Hc;case"weeks":case"week":case"w":return r*zc;case"days":case"day":case"d":return r*Sr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Fr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Pr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Nr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Gc(e){var t=Math.abs(e);return t>=Sr?Math.round(e/Sr)+"d":t>=Fr?Math.round(e/Fr)+"h":t>=Pr?Math.round(e/Pr)+"m":t>=Nr?Math.round(e/Nr)+"s":e+"ms"}function Yc(e){var t=Math.abs(e);return t>=Sr?On(e,t,Sr,"day"):t>=Fr?On(e,t,Fr,"hour"):t>=Pr?On(e,t,Pr,"minute"):t>=Nr?On(e,t,Nr,"second"):e+" ms"}function On(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Sa=Ss((d_,xa)=>{function Vc(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=$a(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let m=0;for(let b=0;b<f.length;b++)m=(m<<5)-m+f.charCodeAt(b),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(f){let m,b=null,A,$;function E(...j){if(!E.enabled)return;let x=E,K=Number(new Date),te=K-(m||K);x.diff=te,x.prev=m,x.curr=K,m=K,j[0]=r.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let L=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(S,H)=>{if(S==="%%")return"%";L++;let F=r.formatters[H];if(typeof F=="function"){let se=j[L];S=F.call(x,se),j.splice(L,1),L--}return S}),r.formatArgs.call(x,j),(x.log||r.log).apply(x,j)}return E.namespace=f,E.useColors=r.useColors(),E.color=r.selectColor(f),E.extend=n,E.destroy=r.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(A!==r.namespaces&&(A=r.namespaces,$=r.enabled(f)),$),set:j=>{b=j}}),typeof r.init=="function"&&r.init(E),E}function n(f,m){let b=r(this.namespace+(typeof m>"u"?":":m)+f);return b.log=this.log,b}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let m=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of m)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(f,m){let b=0,A=0,$=-1,E=0;for(;b<f.length;)if(A<m.length&&(m[A]===f[b]||m[A]==="*"))m[A]==="*"?($=A,E=b,A++):(b++,A++);else if($!==-1)A=$+1,E++,b=E;else return!1;for(;A<m.length&&m[A]==="*";)A++;return A===m.length}function a(){let f=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),f}function l(f){for(let m of r.skips)if(o(f,m))return!1;for(let m of r.names)if(o(f,m))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}xa.exports=Vc});var Aa=Ss((St,Dn)=>{St.formatArgs=Zc;St.save=Xc;St.load=Qc;St.useColors=Kc;St.storage=Jc();St.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();St.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Kc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Zc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Dn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}St.log=console.debug||console.log||(()=>{});function Xc(e){try{e?St.storage.setItem("debug",e):St.storage.removeItem("debug")}catch{}}function Qc(){let e;try{e=St.storage.getItem("debug")||St.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Jc(){try{return localStorage}catch{}}Dn.exports=Sa()(St);var{formatters:ed}=Dn.exports;ed.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Xr=globalThis,Ln=Xr.trustedTypes,la=Ln?Ln.createPolicy("lit-html",{createHTML:e=>e}):void 0,_a="$lit$",cr=`lit$${Math.random().toFixed(9).slice(2)}$`,ma="?"+cr,qc=`<${ma}>`,kr=document,Qr=()=>kr.createComment(""),Jr=e=>e===null||typeof e!="object"&&typeof e!="function",Ls=Array.isArray,Bc=e=>Ls(e)||typeof e?.[Symbol.iterator]=="function",As=`[ 	
\f\r]`,Zr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ca=/-->/g,da=/>/g,yr=RegExp(`>|${As}(?:([^\\s"'>=/]+)(${As}*=${As}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ua=/'/g,pa=/"/g,ga=/^(?:script|style|textarea|title)$/i,Os=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Os(1),Jt=Os(2),r_=Os(3),$r=Symbol.for("lit-noChange"),ct=Symbol.for("lit-nothing"),fa=new WeakMap,wr=kr.createTreeWalker(kr,129);function ha(e,t){if(!Ls(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return la!==void 0?la.createHTML(t):t}var Uc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Zr;for(let l=0;l<r;l++){let c=e[l],u,f,m=-1,b=0;for(;b<c.length&&(a.lastIndex=b,f=a.exec(c),f!==null);)b=a.lastIndex,a===Zr?f[1]==="!--"?a=ca:f[1]!==void 0?a=da:f[2]!==void 0?(ga.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=yr):f[3]!==void 0&&(a=yr):a===yr?f[0]===">"?(a=s??Zr,m=-1):f[1]===void 0?m=-2:(m=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?yr:f[3]==='"'?pa:ua):a===pa||a===ua?a=yr:a===ca||a===da?a=Zr:(a=yr,s=void 0);let A=a===yr&&e[l+1].startsWith("/>")?" ":"";o+=a===Zr?c+qc:m>=0?(n.push(u),c.slice(0,m)+_a+c.slice(m)+cr+A):c+cr+(m===-2?l:A)}return[ha(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},en=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[u,f]=Uc(t,r);if(this.el=e.createElement(u,n),wr.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=wr.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(_a)){let b=f[a++],A=s.getAttribute(m).split(cr),$=/([.?@])?(.*)/.exec(b);c.push({type:1,index:o,name:$[2],strings:A,ctor:$[1]==="."?Es:$[1]==="?"?Cs:$[1]==="@"?Rs:Mr}),s.removeAttribute(m)}else m.startsWith(cr)&&(c.push({type:6,index:o}),s.removeAttribute(m));if(ga.test(s.tagName)){let m=s.textContent.split(cr),b=m.length-1;if(b>0){s.textContent=Ln?Ln.emptyScript:"";for(let A=0;A<b;A++)s.append(m[A],Qr()),wr.nextNode(),c.push({type:2,index:++o});s.append(m[b],Qr())}}}else if(s.nodeType===8)if(s.data===ma)c.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(cr,m+1))!==-1;)c.push({type:7,index:o}),m+=cr.length-1}o++}}static createElement(t,r){let n=kr.createElement("template");return n.innerHTML=t,n}};function Dr(e,t,r=e,n){if(t===$r)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Jr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Dr(e,s._$AS(e,t.values),s,n)),t}var Ts=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??kr).importNode(r,!0);wr.currentNode=s;let o=wr.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new tn(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Is(o,this,t)),this._$AV.push(u),c=n[++l]}a!==c?.index&&(o=wr.nextNode(),a++)}return wr.currentNode=kr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},tn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ct,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Dr(this,t,r),Jr(t)?t===ct||t==null||t===""?(this._$AH!==ct&&this._$AR(),this._$AH=ct):t!==this._$AH&&t!==$r&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Bc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ct&&Jr(this._$AH)?this._$AA.nextSibling.data=t:this.T(kr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=en.createElement(ha(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ts(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=fa.get(t.strings);return r===void 0&&fa.set(t.strings,r=new en(t)),r}k(t){Ls(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Qr()),this.O(Qr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Mr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ct,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ct}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Dr(this,t,r,0),a=!Jr(t)||t!==this._$AH&&t!==$r,a&&(this._$AH=t);else{let l=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Dr(this,l[n+c],r,c),u===$r&&(u=this._$AH[c]),a||(a=!Jr(u)||u!==this._$AH[c]),u===ct?t=ct:t!==ct&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Es=class extends Mr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ct?void 0:t}},Cs=class extends Mr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ct)}},Rs=class extends Mr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Dr(this,t,r,0)??ct)===$r)return;let n=this._$AH,s=t===ct&&n!==ct||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ct&&(n===ct||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Is=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Dr(this,t)}};var jc=Xr.litHtmlPolyfillSupport;jc?.(en,tn),(Xr.litHtmlVersions??(Xr.litHtmlVersions=[])).push("3.3.1");var qe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new tn(t.insertBefore(Qr(),o),o,void 0,r??{})}return s._$AI(e),s};var At="today",Gt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Rt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function xr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ba(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function va(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ya(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function wa(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Ta=Fc(Aa(),1);function nt(e){return(0,Ta.default)(`beads-ui:${e}`)}function Ft(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ar(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Ra(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Ia(e,t){let r=Ft(e.updated_at),n=Ft(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function La(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Ft(e.created_at),o=Ft(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Oa(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var td=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ea(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ca(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=td.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Da(e,t){let r=Ea(e),n=Ea(t);if(r!==n)return r<n?-1:1;let s=Ca(e),o=Ca(t);if(s!==o)return s<o?-1:1;let a=Ft(e&&e.created_at),l=Ft(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Ds=2**20;function qr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Ft(e&&e.created_at)}function Mn(e){return(t,r)=>{let n=qr(t,e),s=qr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ms(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:qr(l,r)-Ds};if(!l)return{rank:qr(a,r)+Ds};let c=qr(a,r),u=qr(l,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((m,b)=>({bead_id:m.id,rank:b*Ds}))}}function Ns(e,t={}){let r=nt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Ar;function u(){for(let b of Array.from(a))try{b()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function m(b){if(l||!b||b.id!==e)return;let A=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,A),!(A<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(A<=o)return;n.clear();let $=Array.isArray(b.issues)?b.issues:[];for(let E of $)E&&typeof E.id=="string"&&E.id.length>0&&n.set(E.id,E);f(),o=A,u();return}if(b.type==="upsert"){let $=b.issue;if($&&typeof $.id=="string"&&$.id.length>0){let E=n.get($.id);if(!E)n.set($.id,$);else{let j=Number.isFinite(E.updated_at)?E.updated_at:0,x=Number.isFinite($.updated_at)?$.updated_at:0;if(j<=x){for(let K of Object.keys(E))K in $||delete E[K];for(let[K,te]of Object.entries($))E[K]=te}}f()}o=A,u()}else if(b.type==="delete"){let $=String(b.issue_id||"");$&&(n.delete($),f()),o=A,u()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Nn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ma(e){let t=nt("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],m=Array.isArray(c.updated)?c.updated:[],b=Array.isArray(c.removed)?c.removed:[];for(let A of Array.from(u)){let $=r.get(A);if(!$)continue;let E=$.itemsById;for(let j of f)typeof j=="string"&&j.length>0&&E.set(j,!0);for(let j of m)typeof j=="string"&&j.length>0&&E.set(j,!0);for(let j of b)typeof j=="string"&&j.length>0&&E.delete(j)}}async function o(l,c){let u=Nn(c);if(t("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let m=r.get(l);if(m&&m.key!==u){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(m){let b=r.get(l)||null;if(b){let A=n.get(b.key);A&&(A.delete(l),A.size===0&&n.delete(b.key))}throw r.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let m=r.get(l)||null;if(m){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Nn,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let u=r.get(l);return u?u.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function Na(){let e=nt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let m=u?Nn(u):"",b=r.get(c)||"",A=t.has(c);if(e("register %s key=%s (prev=%s)",c,m,b),A&&b&&m&&b!==m){let $=t.get(c);if($)try{$.dispose()}catch{}let E=s.get(c);if(E){try{E()}catch{}s.delete(c)}let j=Ns(c,f);t.set(c,j);let x=j.subscribe(()=>o());s.set(c,x)}else if(!A){let $=Ns(c,f);t.set(c,$);let E=$.subscribe(()=>o());s.set(c,E)}return r.set(c,m),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function Pa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Fa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ps(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function rd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function nd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function qa(e){let t=nt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):rd(n),a=nd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ps(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ps(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var sd=Object.freeze({workspace_config:{default_workspace:null}});function Ba(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:sd.workspace_config.default_workspace}}}function Ua(e={}){let t=nt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ba(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ba(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function ja(e){let t=nt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(m,b)=>{let A=s++,$=Date.now();n.set(A,{type:m,start_ts:$}),t("request start id=%d type=%s count=%d",A,m,r+1),a();let E=!1,j=()=>{E||(E=!0,n.delete(A),l())},x=setTimeout(()=>{E||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,m,Date.now()-$),j())},3e4);try{let K=await u(m,b),te=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",A,m,te),K}catch(K){let te=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,m,te,K),K}finally{clearTimeout(x),j()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,m])=>({id:f,type:m.type,elapsed_ms:u-m.start_ts}))}}}function J(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Pn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(Oa),c;switch(l){case"created_desc":return c.sort(Ar),c;case"created_asc":return c.sort(Ra),c;case"updated_desc":return c.sort(Ia),c;case"priority":return c.sort(La),c;case"manual":default:{let u=r();return u?c.sort(Mn(u)):c.sort(Ar),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function er(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function pt(e){let t=er(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Tt(e,t){let r=er(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Fn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=er(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function qn(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let u of l)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(Ms(l,c,u.order),a);s(u,f);let m=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(m&&m.conflict){let b={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(b);let A=n(Ms(l,c,b.order),a);s(b,A);let $=await t("ui-order-set",{expected_revision:b.revision,entries:A});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Bn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fs(e,t){return!t||typeof e!="string"||e.length===0||Bn(t.visible_labels).includes(e)?!0:Bn(t.hidden_labels).includes(e)?!1:!Bn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Un(e,t){return Bn(e).filter(r=>Fs(r,t))}function dr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var od={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ha={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},za={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},ad={review:"\u2713",skip:"\u2298"},ur={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function id(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Wa(e){let t=e&&e.fill||"none";return t==="none"?ur.none:e&&e.stale===!0?ur.stale:t==="dim"?ur.dim:e&&e.glyph==="review"?ur.review:e&&e.glyph==="skip"?ur.skip:ur.done}function ld(e){if(!e||e.fill==="none"||!e.approval_state)return Wa(e);let t=[];return e.glyph==="review"?t.push(ur.review):e.glyph==="skip"&&t.push(ur.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function cd(e,t,r){let n=od[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=ad[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${u}>${a}</div>
      <div class=${c}>
        ${Ha[e]||e}
      </div>
    </div>
  `}function jn(e,t){if(!e||!e.stages)return"";let r=za[e.route]||za.spec_backed,n=e.stages,s=id(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ha[a]||a} ${a==="plan"?ld(n[a]||{}):Wa(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>cd(a,n[a]||{},a===s))}
    </div>
  `}function dd(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ga=2;function ud(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ga).join(", "),s=r.length-Ga,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function pd(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&dr(r,"route")){let a=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&dr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&dr(r,"pr")){let a=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}if(n.exec_receipt){let a=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${a.kind}:${a.actor}@${a.sha}`}
        >${`exec ${a.kind==="delegated"?a.actor:`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let a=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of Un(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&dr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),dr(r,"blocked")&&s.push(...ud(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&dr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function fd(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function _d(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${pt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${pt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function md(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Da):r.children;return i`
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
        ${_d(e)}
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
                  <span class=${fd(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function zn(e,t){let r=dd(e.priority);return i`
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
      ${pd(e,t)}
      ${e.workflow&&dr(t.policy||null,"stepper")?jn(e.workflow,e.status):""}
      ${md(e,t)}
    </article>
  `}function Br(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${Gt.map(o=>i`<option
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
        ${e.items.map(o=>zn(o,t))}
      </div>
    </section>
  `}function Ya(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>zn(n,t))}
        </div>
      </div>
    </dialog>
  `}var gd=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],hd=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],bd=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function vd(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function Va(e,t,r){return i`
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
        ${gd.map(n=>i`<option
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
        ${hd.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${vd(e,t,r)}
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
        ${bd.map(n=>i`<option
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
  `}var yd=200,wd={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},kd=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ka="beads-ui.board.sort",Za=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function $d(){try{let e=window.localStorage.getItem(Ka);if(e&&Za.has(e))return e}catch{}return"created_desc"}function Xa(e,t){let r=nt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,m=t.closedRange||At,b=s?Pn(s,a):null,A=qn({transport:o,uiOrderStore:a}),$=[],E=[],j=[],x=[],K=[],te=[],L=!1,D=0,S=$d(),H=new Map,F=new Map,se=new Map,be=new Set,le={search:"",priority:"",type:"",labels:[]},me=!1,Ie=null;function Ue(U){return String(U.status||"open")==="open"}function ze(U){let V=String(U.status||"open");return V==="open"||V==="blocked"}function Pe(U){let V=le.search.trim().toLowerCase(),ae=le.priority,ce=le.type,re=le.labels;return U.filter(Te=>{if(V){let Ve=String(Te.id||"").toLowerCase(),Xe=String(Te.title||"").toLowerCase();if(!Ve.includes(V)&&!Xe.includes(V))return!1}if(ae!==""&&String(Te.priority)!==ae||ce!==""&&String(Te.issue_type||"")!==ce)return!1;if(re.length>0){let Ve=Array.isArray(Te.labels)?Te.labels:[];if(!re.some(Xe=>Ve.includes(Xe)))return!1}return!0})}function De(){let U=new Set;for(let V of[$,E,j,x,K,te])for(let ae of V){let ce=Array.isArray(ae.labels)?ae.labels:[];for(let re of ce)typeof re=="string"&&re.length>0&&U.add(re)}return Array.from(U).sort()}function _e(){return le.search.trim()!==""||le.priority!==""||le.type!==""||le.labels.length>0}function ge(){try{if(b){let U=b.selectBoardColumn("tab:board:in-progress","in_progress",S),V=b.selectBoardColumn("tab:board:blocked","blocked",S).filter(ze),ae=new Set(U.map(we=>we.id)),ce=b.selectBoardColumn("tab:board:ready","ready",S).filter(we=>Ue(we)&&!ae.has(we.id)),re=b.selectBoardColumn("tab:board:resolved","resolved",S),Te=b.selectBoardColumn("tab:board:deferred","deferred",S),Ve=b.selectBoardColumn("tab:board:closed","closed").slice(0,yd),Xe=[...V,...ce,...U,...re,...Ve];ve(Xe);let Se=new Set;for(let we of Xe)we&&we.id&&!qs(we)&&Se.add(we.id);let Ge=!_e();$=Ge?rn(V,Se):V,E=Ge?rn(ce,Se):ce,j=Ge?rn(U,Se):U,x=Ge?rn(re,Se):re,K=Te,D=Te.length,te=Ge?rn(Ve,Se):Ve,H=new Map;for(let we of $)H.set(we.id,"open");for(let we of E)H.set(we.id,"open");for(let we of j)H.set(we.id,"in_progress");for(let we of x)H.set(we.id,"resolved");for(let we of K)H.set(we.id,"deferred");for(let we of te)H.set(we.id,"closed");F=new Map;for(let we of $)F.set(we.id,"blocked-col");for(let we of E)F.set(we.id,"ready-col");for(let we of j)F.set(we.id,"in-progress-col");for(let we of x)F.set(we.id,"resolved-col");for(let we of te)F.set(we.id,"closed-col")}Le()}catch{$=[],E=[],j=[],x=[],K=[],te=[],se=new Map,Le()}}function ve(U){let V=new Map;for(let ce of U)ce&&ce.id&&!V.has(ce.id)&&V.set(ce.id,ce);let ae=new Map;for(let ce of V.values()){let re=qs(ce);if(!re)continue;let Te=ae.get(re);Te||(Te=[],ae.set(re,Te)),Te.push({id:ce.id,title:ce.title,status:ce.status,metadata:ce.metadata,created_at:ce.created_at,updated_at:ce.updated_at})}se=ae}function fe(U){let V=se.get(U)||[],ae=0;for(let re of V)(re.status==="resolved"||re.status==="closed")&&(ae+=1);let ce=Fn(V);return{total:V.length,count:ae,current:ce,children:V}}function Y(U){return!be.has(U)}function Z(U,V){U.preventDefault(),U.stopPropagation(),be.has(V)?be.delete(V):be.add(V),Le()}function Ae(U,V){U.preventDefault(),U.stopPropagation(),n(V)}function ue(U,V){U.preventDefault(),U.stopPropagation(),n(V)}function pe(U,V){Ie||n(V)}function I(U,V){U.preventDefault(),U.stopPropagation(),xd(V).then(ae=>{ae&&J("\uBCF5\uC0AC\uB428","success",1200)})}function C(U,V){Ie=V,U.dataTransfer&&(U.dataTransfer.setData("text/plain",V),U.dataTransfer.effectAllowed="move"),U.target.classList.add("board-card--dragging")}function ie(U){U.target.classList.remove("board-card--dragging"),$t(),setTimeout(()=>{Ie=null},0)}function Be(U){let V=String(U.target.value||"");!V||V===m||(m=V,u&&u(V),Le())}function Ce(){return l?l.get():null}function ye(U){let V=c?c.get():null,ae=V?V.cleanup_failed:null;if(!ae||typeof ae!="object"||Array.isArray(ae))return null;let ce=ae[U];return!ce||typeof ce!="object"||Array.isArray(ce)?null:ce}let $e={onCardClick:pe,onCopyId:I,onDragStart:C,onDragEnd:ie,onClosedRangeChange:Be,rollupFor:fe,isExpanded:Y,onRollupToggle:Z,onChildClick:Ae,onFromChipClick:ue,cleanupFailureFor:ye,get policy(){return Ce()}};function Ze(U,V){Ie||(G(),n(V))}function Fe(U,V){U.preventDefault(),U.stopPropagation(),G(),n(V)}let Qe={...$e,onCardClick:Ze,onChildClick:Fe,onFromChipClick:Fe,get policy(){return Ce()}};function O(U){let V=U.target,ae=e.querySelector(".board-filter__labels");V&&ae&&ae.contains(V)||y()}function W(U){U.key==="Escape"&&y()}function B(){me||(me=!0,document.addEventListener("mousedown",O),document.addEventListener("keydown",W),Le())}function y(){me&&(me=!1,document.removeEventListener("mousedown",O),document.removeEventListener("keydown",W),Le())}function R(U){U.key==="Escape"&&G()}function P(){L||(L=!0,document.addEventListener("keydown",R),Le())}function G(){L&&(L=!1,document.removeEventListener("keydown",R),Le())}let Q={onClose:G,onOverlayClick(U){U.target===U.currentTarget&&G()}},Re={onSearchInput(U){le.search=String(U.target.value||""),ge()},onPriorityChange(U){le.priority=String(U.target.value||""),ge()},onTypeChange(U){le.type=String(U.target.value||""),ge()},onSortChange(U){let V=String(U.target.value||"");if(!(!Za.has(V)||V===S)){S=V;try{window.localStorage.setItem(Ka,V)}catch{}ge()}},onDeferredToggle(){L?G():P()},onLabelMenuToggle(){me?y():B()},onLabelToggle(U){let V=le.labels.indexOf(U);V===-1?le.labels.push(U):le.labels.splice(V,1),ge()},onLabelClear(){le.labels.length!==0&&(le.labels=[],ge())},onNewIssue(){f&&f()}};function xe(){return i`
      <div class="board-view">
        ${Va(le,Re,{sort_mode:S,deferred_popup_open:L,deferred_count:D,label_options:De(),label_menu_open:me})}
        <div class="board-root">
          ${Br({title:"Blocked",id:"blocked-col",items:Pe($)},$e)}
          ${Br({title:"Ready",id:"ready-col",items:Pe(E)},$e)}
          ${Br({title:"In progress",id:"in-progress-col",items:Pe(j)},$e)}
          ${Br({title:"Resolved",id:"resolved-col",items:Pe(x)},$e)}
          ${Br({title:"Closed",id:"closed-col",items:Pe(te),is_closed:!0,closed_range:m},$e)}
        </div>
        ${L?Ya({items:Pe(K),count:D},Qe,Q):""}
      </div>
    `}function Le(){qe(xe(),e),We()}function We(){try{let U=e.querySelector("#deferred-popup");U&&!U.open&&(typeof U.showModal=="function"?U.showModal():U.setAttribute("open",""));let V=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ae of V)Array.from(ae.querySelectorAll(".board-card")).forEach((re,Te)=>{re.tabIndex=Te===0?0:-1})}catch{}}async function st(U,V){if(!o){J("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:U,status:V}),J("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ae){r("update-status failed: %o",ae),J("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function et(U){switch(U){case"blocked-col":return $;case"ready-col":return E;case"in-progress-col":return j;case"resolved-col":return x;default:return[]}}function ut(U,V,ae){if(!o||!a)return;let ce=et(U),re=ce.find(Ge=>Ge.id===V);if(!re)return;let Te=ce.filter(Ge=>Ge.id!==V),Ve=ae.closest?ae.closest(".board-card"):null,Xe=Te.length;if(Ve){let Ge=Ve.getAttribute("data-issue-id");if(Ge===V)return;let we=Te.findIndex(dt=>dt.id===Ge);we>=0&&(Xe=we)}let Se=Te.slice();Se.splice(Xe,0,re),A.applyReorder(V,Se,Xe)}function $t(){for(let U of Array.from(e.querySelectorAll(".board-column--drag-over")))U.classList.remove("board-column--drag-over")}let rt=null;e.addEventListener("dragover",U=>{U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move");let ae=U.target.closest(".board-column");ae&&ae!==rt&&(rt&&rt.classList.remove("board-column--drag-over"),ae.classList.add("board-column--drag-over"),rt=ae)}),e.addEventListener("dragleave",U=>{let V=U.relatedTarget;(!V||!e.contains(V))&&rt&&(rt.classList.remove("board-column--drag-over"),rt=null)}),e.addEventListener("drop",U=>{U.preventDefault(),rt&&(rt.classList.remove("board-column--drag-over"),rt=null);let V=U.target,ae=V.closest(".board-column");if(!ae)return;let ce=U.dataTransfer?.getData("text/plain")||"";if(!ce)return;let re=ae.id,Te=F.get(ce);if(Te&&Te===re){if(kd.has(re)){if(S!=="manual"){J("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ut(re,ce,V)}return}let Ve=wd[re];if(!Ve){J("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}H.get(ce)!==Ve&&st(ce,Ve)}),e.addEventListener("keydown",U=>{let V=U.target;if(!(V instanceof HTMLElement))return;let ae=String(V.tagName||"").toLowerCase();if(ae==="input"||ae==="textarea"||ae==="select"||ae==="button"||ae==="a"||V.isContentEditable===!0)return;let ce=V.closest(".board-card");if(!ce)return;let re=String(U.key||"");if(re==="Enter"||re===" "){U.preventDefault();let Se=ce.getAttribute("data-issue-id");Se&&n(Se);return}if(re!=="ArrowUp"&&re!=="ArrowDown"&&re!=="ArrowLeft"&&re!=="ArrowRight")return;U.preventDefault();let Te=ce.closest(".board-column");if(!Te)return;let Ve=Array.from(Te.querySelectorAll(".board-card")),Xe=Ve.indexOf(ce);if(re==="ArrowDown"&&Xe<Ve.length-1){ot(ce,Ve[Xe+1]);return}if(re==="ArrowUp"&&Xe>0){ot(ce,Ve[Xe-1]);return}if(re==="ArrowLeft"||re==="ArrowRight"){let Se=Array.from(e.querySelectorAll(".board-column")),Ge=Se.indexOf(Te),we=re==="ArrowRight"?1:-1,dt=Ge+we;for(;dt>=0&&dt<Se.length;){let ht=Se[dt].querySelector(".board-card");if(ht){ot(ce,ht);return}dt+=we}}});function ot(U,V){try{U.tabIndex=-1,V.tabIndex=0,V.focus()}catch{}}let tt=null;b&&b.subscribe&&(tt=b.subscribe(()=>{try{ge()}catch{}}));let at=null;l&&l.subscribe&&(at=l.subscribe(()=>{try{ge()}catch{}}));let _t=null;return c&&c.subscribe&&(_t=c.subscribe(()=>{Le()})),{async load(){r("load"),ge()},clear(){y(),G(),tt&&(tt(),tt=null),at&&(at(),at=null),_t&&(_t(),_t=null),e.replaceChildren(),$=[],E=[],j=[],x=[],K=[],te=[],H=new Map,F=new Map}}}function qs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function rn(e,t){return e.filter(r=>{let n=qs(r);return!(n&&t.has(n))})}async function xd(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Tr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Yt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function pr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Sd(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Yt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Yt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function tr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Sd(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var ri="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var rr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],nn=[...rr,"reasoning_output_tokens"],Ad=["implementation","review-consult"];function Bs(e){let t=0;for(let r of rr)t+=ft(e?.[r]);return t}function Td(e){return!e||typeof e!="object"?!1:rr.some(t=>Number.isFinite(e[t]))}function Qa(e){return!e||typeof e!="object"?!1:nn.some(t=>Number.isFinite(e[t]))}function Ed(e){let t={};for(let r of nn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ja(e){let t={};for(let r of nn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ei(e,t){return e==="codex"?ft(t.input_tokens)+ft(t.output_tokens):Bs(t)}function Cd(e){return e==="claude"?"Claude":"Codex"}function Rd(e){return`\u03C4 ${ni(e)}`}function Id(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${ft(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${ft(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(ri),o.join(`
`)}function gt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Cd(r)} ${Rd(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Id(r,n)})}return t}function Wn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of nn)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=ft(l.breakdown[c])+ft(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Us(e){return!e||typeof e!="object"?null:It({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Ld(e){return e==="codex"?"codex":"claude"}function fr(){return{subtotal:0,breakdown:Ed(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Hn(e,t,r){e.subtotal+=t.subtotal;for(let n of nn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=ft(e.breakdown[n])+ft(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ti(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ni(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ur(e){return Td(e)?`\u03C4 ${ni(Bs(e))}`:null}function qt(e){let t=Ur(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function jr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Bs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(ri),r.join(`
`)}function It(e,t){let r={claude:fr(),codex:fr()},n={orchestrator:{claude:fr(),codex:fr()},implementation:{claude:fr(),codex:fr()},"review-consult":{claude:fr(),codex:fr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(Qa(c)){let f=Ld(l.runner),m=Ja(c),b={provider:f,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:ei(f,m)};m.replayed===!0&&(b.replayed=!0),typeof l.model=="string"&&(b.model=l.model),typeof l.session_id=="string"&&(b.session_id=l.session_id),Hn(r[f],b,!0),Hn(n.orchestrator[f],b,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!Ad.includes(f.role)||!Qa(f.usage))continue;let m=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let b=Ja(f.usage),A={provider:"codex",role:f.role,attempt_id:String(l.attempt_id||""),usage:b,subtotal:ei("codex",b)};A.receipt_id=m,typeof f.model=="string"&&(A.model=f.model),typeof f.session_id=="string"?A.session_id=f.session_id:typeof f.thread_id=="string"&&(A.session_id=f.thread_id),typeof f.turn_id=="string"&&(A.turn_id=f.turn_id),typeof f.completed_at=="string"&&(A.completed_at=f.completed_at),b.replayed===!0&&(A.replayed=!0),Hn(r.codex,A,!1),Hn(n[A.role].codex,A,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let u=ti(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[l]=u}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[l][u];f.legs.length>0&&(c[u]={...ti(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:pi,setPrototypeOf:si,isFrozen:Od,getPrototypeOf:Dd,getOwnPropertyDescriptor:Md}=Object,{freeze:yt,seal:Lt,create:Vs}=Object,{apply:Ks,construct:Zs}=typeof Reflect<"u"&&Reflect;yt||(yt=function(t){return t});Lt||(Lt=function(t){return t});Ks||(Ks=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Zs||(Zs=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Gn=wt(Array.prototype.forEach),Nd=wt(Array.prototype.lastIndexOf),oi=wt(Array.prototype.pop),sn=wt(Array.prototype.push),Pd=wt(Array.prototype.splice),Vn=wt(String.prototype.toLowerCase),js=wt(String.prototype.toString),zs=wt(String.prototype.match),on=wt(String.prototype.replace),Fd=wt(String.prototype.indexOf),qd=wt(String.prototype.trim),Bt=wt(Object.prototype.hasOwnProperty),vt=wt(RegExp.prototype.test),an=Bd(TypeError);function wt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Ks(e,t,n)}}function Bd(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Zs(e,r)}}function Ne(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Vn;si&&si(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Od(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Ud(e){for(let t=0;t<e.length;t++)Bt(e,t)||(e[t]=null);return e}function nr(e){let t=Vs(null);for(let[r,n]of pi(e))Bt(e,r)&&(Array.isArray(n)?t[r]=Ud(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=nr(n):t[r]=n);return t}function ln(e,t){for(;e!==null;){let n=Md(e,t);if(n){if(n.get)return wt(n.get);if(typeof n.value=="function")return wt(n.value)}e=Dd(e)}function r(){return null}return r}var ai=yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Hs=yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ws=yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),jd=yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Gs=yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),zd=yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ii=yt(["#text"]),li=yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ys=yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ci=yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Yn=yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Hd=Lt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Wd=Lt(/<%[\w\W]*|[\w\W]*%>/gm),Gd=Lt(/\$\{[\w\W]*/gm),Yd=Lt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Vd=Lt(/^aria-[\-\w]+$/),fi=Lt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Kd=Lt(/^(?:\w+script|data):/i),Zd=Lt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),_i=Lt(/^html$/i),Xd=Lt(/^[a-z][.\w]*(-[.\w]+)+$/i),di=Object.freeze({__proto__:null,ARIA_ATTR:Vd,ATTR_WHITESPACE:Zd,CUSTOM_ELEMENT:Xd,DATA_ATTR:Yd,DOCTYPE_NAME:_i,ERB_EXPR:Wd,IS_ALLOWED_URI:fi,IS_SCRIPT_OR_DATA:Kd,MUSTACHE_EXPR:Hd,TMPLIT_EXPR:Gd}),cn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Qd=function(){return typeof window>"u"?null:window},Jd=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ui=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function mi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Qd(),t=z=>mi(z);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==cn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:b,trustedTypes:A}=e,$=c.prototype,E=ln($,"cloneNode"),j=ln($,"remove"),x=ln($,"nextSibling"),K=ln($,"childNodes"),te=ln($,"parentNode");if(typeof a=="function"){let z=r.createElement("template");z.content&&z.content.ownerDocument&&(r=z.content.ownerDocument)}let L,D="",{implementation:S,createNodeIterator:H,createDocumentFragment:F,getElementsByTagName:se}=r,{importNode:be}=n,le=ui();t.isSupported=typeof pi=="function"&&typeof te=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:me,ERB_EXPR:Ie,TMPLIT_EXPR:Ue,DATA_ATTR:ze,ARIA_ATTR:Pe,IS_SCRIPT_OR_DATA:De,ATTR_WHITESPACE:_e,CUSTOM_ELEMENT:ge}=di,{IS_ALLOWED_URI:ve}=di,fe=null,Y=Ne({},[...ai,...Hs,...Ws,...Gs,...ii]),Z=null,Ae=Ne({},[...li,...Ys,...ci,...Yn]),ue=Object.seal(Vs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),pe=null,I=null,C=Object.seal(Vs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ie=!0,Be=!0,Ce=!1,ye=!0,$e=!1,Ze=!0,Fe=!1,Qe=!1,O=!1,W=!1,B=!1,y=!1,R=!0,P=!1,G="user-content-",Q=!0,Re=!1,xe={},Le=null,We=Ne({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),st=null,et=Ne({},["audio","video","img","source","image","track"]),ut=null,$t=Ne({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",ot="http://www.w3.org/2000/svg",tt="http://www.w3.org/1999/xhtml",at=tt,_t=!1,U=null,V=Ne({},[rt,ot,tt],js),ae=Ne({},["mi","mo","mn","ms","mtext"]),ce=Ne({},["annotation-xml"]),re=Ne({},["title","style","font","a","script"]),Te=null,Ve=["application/xhtml+xml","text/html"],Xe="text/html",Se=null,Ge=null,we=r.createElement("form"),dt=function(h){return h instanceof RegExp||h instanceof Function},ht=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ge&&Ge===h)){if((!h||typeof h!="object")&&(h={}),h=nr(h),Te=Ve.indexOf(h.PARSER_MEDIA_TYPE)===-1?Xe:h.PARSER_MEDIA_TYPE,Se=Te==="application/xhtml+xml"?js:Vn,fe=Bt(h,"ALLOWED_TAGS")?Ne({},h.ALLOWED_TAGS,Se):Y,Z=Bt(h,"ALLOWED_ATTR")?Ne({},h.ALLOWED_ATTR,Se):Ae,U=Bt(h,"ALLOWED_NAMESPACES")?Ne({},h.ALLOWED_NAMESPACES,js):V,ut=Bt(h,"ADD_URI_SAFE_ATTR")?Ne(nr($t),h.ADD_URI_SAFE_ATTR,Se):$t,st=Bt(h,"ADD_DATA_URI_TAGS")?Ne(nr(et),h.ADD_DATA_URI_TAGS,Se):et,Le=Bt(h,"FORBID_CONTENTS")?Ne({},h.FORBID_CONTENTS,Se):We,pe=Bt(h,"FORBID_TAGS")?Ne({},h.FORBID_TAGS,Se):nr({}),I=Bt(h,"FORBID_ATTR")?Ne({},h.FORBID_ATTR,Se):nr({}),xe=Bt(h,"USE_PROFILES")?h.USE_PROFILES:!1,ie=h.ALLOW_ARIA_ATTR!==!1,Be=h.ALLOW_DATA_ATTR!==!1,Ce=h.ALLOW_UNKNOWN_PROTOCOLS||!1,ye=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,$e=h.SAFE_FOR_TEMPLATES||!1,Ze=h.SAFE_FOR_XML!==!1,Fe=h.WHOLE_DOCUMENT||!1,W=h.RETURN_DOM||!1,B=h.RETURN_DOM_FRAGMENT||!1,y=h.RETURN_TRUSTED_TYPE||!1,O=h.FORCE_BODY||!1,R=h.SANITIZE_DOM!==!1,P=h.SANITIZE_NAMED_PROPS||!1,Q=h.KEEP_CONTENT!==!1,Re=h.IN_PLACE||!1,ve=h.ALLOWED_URI_REGEXP||fi,at=h.NAMESPACE||tt,ae=h.MATHML_TEXT_INTEGRATION_POINTS||ae,ce=h.HTML_INTEGRATION_POINTS||ce,ue=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&dt(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ue.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&dt(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ue.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ue.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),$e&&(Be=!1),B&&(W=!0),xe&&(fe=Ne({},ii),Z=[],xe.html===!0&&(Ne(fe,ai),Ne(Z,li)),xe.svg===!0&&(Ne(fe,Hs),Ne(Z,Ys),Ne(Z,Yn)),xe.svgFilters===!0&&(Ne(fe,Ws),Ne(Z,Ys),Ne(Z,Yn)),xe.mathMl===!0&&(Ne(fe,Gs),Ne(Z,ci),Ne(Z,Yn))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?C.tagCheck=h.ADD_TAGS:(fe===Y&&(fe=nr(fe)),Ne(fe,h.ADD_TAGS,Se))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?C.attributeCheck=h.ADD_ATTR:(Z===Ae&&(Z=nr(Z)),Ne(Z,h.ADD_ATTR,Se))),h.ADD_URI_SAFE_ATTR&&Ne(ut,h.ADD_URI_SAFE_ATTR,Se),h.FORBID_CONTENTS&&(Le===We&&(Le=nr(Le)),Ne(Le,h.FORBID_CONTENTS,Se)),Q&&(fe["#text"]=!0),Fe&&Ne(fe,["html","head","body"]),fe.table&&(Ne(fe,["tbody"]),delete pe.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw an('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw an('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=h.TRUSTED_TYPES_POLICY,D=L.createHTML("")}else L===void 0&&(L=Jd(A,s)),L!==null&&typeof D=="string"&&(D=L.createHTML(""));yt&&yt(h),Ge=h}},Zt=Ne({},[...Hs,...Ws,...jd]),zt=Ne({},[...Gs,...zd]),Xt=function(h){let T=te(h);(!T||!T.tagName)&&(T={namespaceURI:at,tagName:"template"});let X=Vn(h.tagName),de=Vn(T.tagName);return U[h.namespaceURI]?h.namespaceURI===ot?T.namespaceURI===tt?X==="svg":T.namespaceURI===rt?X==="svg"&&(de==="annotation-xml"||ae[de]):!!Zt[X]:h.namespaceURI===rt?T.namespaceURI===tt?X==="math":T.namespaceURI===ot?X==="math"&&ce[de]:!!zt[X]:h.namespaceURI===tt?T.namespaceURI===ot&&!ce[de]||T.namespaceURI===rt&&!ae[de]?!1:!zt[X]&&(re[X]||!Zt[X]):!!(Te==="application/xhtml+xml"&&U[h.namespaceURI]):!1},mt=function(h){sn(t.removed,{element:h});try{te(h).removeChild(h)}catch{j(h)}},xt=function(h,T){try{sn(t.removed,{attribute:T.getAttributeNode(h),from:T})}catch{sn(t.removed,{attribute:null,from:T})}if(T.removeAttribute(h),h==="is")if(W||B)try{mt(T)}catch{}else try{T.setAttribute(h,"")}catch{}},Ot=function(h){let T=null,X=null;if(O)h="<remove></remove>"+h;else{let je=zs(h,/^[\r\n\t ]+/);X=je&&je[0]}Te==="application/xhtml+xml"&&at===tt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let de=L?L.createHTML(h):h;if(at===tt)try{T=new b().parseFromString(de,Te)}catch{}if(!T||!T.documentElement){T=S.createDocument(at,"template",null);try{T.documentElement.innerHTML=_t?D:de}catch{}}let Oe=T.body||T.documentElement;return h&&X&&Oe.insertBefore(r.createTextNode(X),Oe.childNodes[0]||null),at===tt?se.call(T,Fe?"html":"body")[0]:Fe?T.documentElement:Oe},Dt=function(h){return H.call(h.ownerDocument||h,h,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Mt=function(h){return h instanceof m&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof f)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},Ht=function(h){return typeof l=="function"&&h instanceof l};function Ee(z,h,T){Gn(z,X=>{X.call(t,h,T,Ge)})}let bt=function(h){let T=null;if(Ee(le.beforeSanitizeElements,h,null),Mt(h))return mt(h),!0;let X=Se(h.nodeName);if(Ee(le.uponSanitizeElement,h,{tagName:X,allowedTags:fe}),Ze&&h.hasChildNodes()&&!Ht(h.firstElementChild)&&vt(/<[/\w!]/g,h.innerHTML)&&vt(/<[/\w!]/g,h.textContent)||h.nodeType===cn.progressingInstruction||Ze&&h.nodeType===cn.comment&&vt(/<[/\w]/g,h.data))return mt(h),!0;if(!(C.tagCheck instanceof Function&&C.tagCheck(X))&&(!fe[X]||pe[X])){if(!pe[X]&&w(X)&&(ue.tagNameCheck instanceof RegExp&&vt(ue.tagNameCheck,X)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(X)))return!1;if(Q&&!Le[X]){let de=te(h)||h.parentNode,Oe=K(h)||h.childNodes;if(Oe&&de){let je=Oe.length;for(let _=je-1;_>=0;--_){let d=E(Oe[_],!0);d.__removalCount=(h.__removalCount||0)+1,de.insertBefore(d,x(h))}}}return mt(h),!0}return h instanceof c&&!Xt(h)||(X==="noscript"||X==="noembed"||X==="noframes")&&vt(/<\/no(script|embed|frames)/i,h.innerHTML)?(mt(h),!0):($e&&h.nodeType===cn.text&&(T=h.textContent,Gn([me,Ie,Ue],de=>{T=on(T,de," ")}),h.textContent!==T&&(sn(t.removed,{element:h.cloneNode()}),h.textContent=T)),Ee(le.afterSanitizeElements,h,null),!1)},p=function(h,T,X){if(R&&(T==="id"||T==="name")&&(X in r||X in we))return!1;if(!(Be&&!I[T]&&vt(ze,T))){if(!(ie&&vt(Pe,T))){if(!(C.attributeCheck instanceof Function&&C.attributeCheck(T,h))){if(!Z[T]||I[T]){if(!(w(h)&&(ue.tagNameCheck instanceof RegExp&&vt(ue.tagNameCheck,h)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(h))&&(ue.attributeNameCheck instanceof RegExp&&vt(ue.attributeNameCheck,T)||ue.attributeNameCheck instanceof Function&&ue.attributeNameCheck(T,h))||T==="is"&&ue.allowCustomizedBuiltInElements&&(ue.tagNameCheck instanceof RegExp&&vt(ue.tagNameCheck,X)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(X))))return!1}else if(!ut[T]){if(!vt(ve,on(X,_e,""))){if(!((T==="src"||T==="xlink:href"||T==="href")&&h!=="script"&&Fd(X,"data:")===0&&st[h])){if(!(Ce&&!vt(De,on(X,_e,"")))){if(X)return!1}}}}}}}return!0},w=function(h){return h!=="annotation-xml"&&zs(h,ge)},M=function(h){Ee(le.beforeSanitizeAttributes,h,null);let{attributes:T}=h;if(!T||Mt(h))return;let X={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Z,forceKeepAttr:void 0},de=T.length;for(;de--;){let Oe=T[de],{name:je,namespaceURI:_,value:d}=Oe,k=Se(je),v=d,q=je==="value"?v:qd(v);if(X.attrName=k,X.attrValue=q,X.keepAttr=!0,X.forceKeepAttr=void 0,Ee(le.uponSanitizeAttribute,h,X),q=X.attrValue,P&&(k==="id"||k==="name")&&(xt(je,h),q=G+q),Ze&&vt(/((--!?|])>)|<\/(style|title|textarea)/i,q)){xt(je,h);continue}if(k==="attributename"&&zs(q,"href")){xt(je,h);continue}if(X.forceKeepAttr)continue;if(!X.keepAttr){xt(je,h);continue}if(!ye&&vt(/\/>/i,q)){xt(je,h);continue}$e&&Gn([me,Ie,Ue],he=>{q=on(q,he," ")});let ee=Se(h.nodeName);if(!p(ee,k,q)){xt(je,h);continue}if(L&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!_)switch(A.getAttributeType(ee,k)){case"TrustedHTML":{q=L.createHTML(q);break}case"TrustedScriptURL":{q=L.createScriptURL(q);break}}if(q!==v)try{_?h.setAttributeNS(_,je,q):h.setAttribute(je,q),Mt(h)?mt(h):oi(t.removed)}catch{xt(je,h)}}Ee(le.afterSanitizeAttributes,h,null)},oe=function z(h){let T=null,X=Dt(h);for(Ee(le.beforeSanitizeShadowDOM,h,null);T=X.nextNode();)Ee(le.uponSanitizeShadowNode,T,null),bt(T),M(T),T.content instanceof o&&z(T.content);Ee(le.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(z){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},T=null,X=null,de=null,Oe=null;if(_t=!z,_t&&(z="<!-->"),typeof z!="string"&&!Ht(z))if(typeof z.toString=="function"){if(z=z.toString(),typeof z!="string")throw an("dirty is not a string, aborting")}else throw an("toString is not a function");if(!t.isSupported)return z;if(Qe||ht(h),t.removed=[],typeof z=="string"&&(Re=!1),Re){if(z.nodeName){let d=Se(z.nodeName);if(!fe[d]||pe[d])throw an("root node is forbidden and cannot be sanitized in-place")}}else if(z instanceof l)T=Ot("<!---->"),X=T.ownerDocument.importNode(z,!0),X.nodeType===cn.element&&X.nodeName==="BODY"||X.nodeName==="HTML"?T=X:T.appendChild(X);else{if(!W&&!$e&&!Fe&&z.indexOf("<")===-1)return L&&y?L.createHTML(z):z;if(T=Ot(z),!T)return W?null:y?D:""}T&&O&&mt(T.firstChild);let je=Dt(Re?z:T);for(;de=je.nextNode();)bt(de),M(de),de.content instanceof o&&oe(de.content);if(Re)return z;if(W){if(B)for(Oe=F.call(T.ownerDocument);T.firstChild;)Oe.appendChild(T.firstChild);else Oe=T;return(Z.shadowroot||Z.shadowrootmode)&&(Oe=be.call(n,Oe,!0)),Oe}let _=Fe?T.outerHTML:T.innerHTML;return Fe&&fe["!doctype"]&&T.ownerDocument&&T.ownerDocument.doctype&&T.ownerDocument.doctype.name&&vt(_i,T.ownerDocument.doctype.name)&&(_="<!DOCTYPE "+T.ownerDocument.doctype.name+`>
`+_),$e&&Gn([me,Ie,Ue],d=>{_=on(_,d," ")}),L&&y?L.createHTML(_):_},t.setConfig=function(){let z=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ht(z),Qe=!0},t.clearConfig=function(){Ge=null,Qe=!1},t.isValidAttribute=function(z,h,T){Ge||ht({});let X=Se(z),de=Se(h);return p(X,de,T)},t.addHook=function(z,h){typeof h=="function"&&sn(le[z],h)},t.removeHook=function(z,h){if(h!==void 0){let T=Nd(le[z],h);return T===-1?void 0:Pd(le[z],T,1)[0]}return oi(le[z])},t.removeHooks=function(z){le[z]=[]},t.removeAllHooks=function(){le=ui()},t}var gi=mi();var hi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},bi=e=>(...t)=>({_$litDirective$:e,values:t}),Kn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var dn=class extends Kn{constructor(t){if(super(t),this.it=ct,t.type!==hi.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ct||t==null)return this._t=void 0,this.it=t;if(t===$r)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};dn.directiveName="unsafeHTML",dn.resultType=1;var vi=bi(dn);function eo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Cr=eo();function Ai(e){Cr=e}var _n={exec:()=>null};function He(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(kt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var eu=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),kt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},tu=/^(?:[ \t]*(?:\n|$))+/,ru=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,nu=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,mn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,su=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,to=/(?:[*+-]|\d{1,9}[.)])/,Ti=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ei=He(Ti).replace(/bull/g,to).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ou=He(Ti).replace(/bull/g,to).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ro=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,au=/^[^\n]+/,no=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,iu=He(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",no).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),lu=He(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,to).getRegex(),ts="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",so=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,cu=He("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",so).replace("tag",ts).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ci=He(ro).replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ts).getRegex(),du=He(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ci).getRegex(),oo={blockquote:du,code:ru,def:iu,fences:nu,heading:su,hr:mn,html:cu,lheading:Ei,list:lu,newline:tu,paragraph:Ci,table:_n,text:au},yi=He("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ts).getRegex(),uu={...oo,lheading:ou,table:yi,paragraph:He(ro).replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",yi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ts).getRegex()},pu={...oo,html:He(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",so).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_n,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:He(ro).replace("hr",mn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ei).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},fu=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,_u=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ri=/^( {2,}|\\)\n(?!\s*$)/,mu=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,rs=/[\p{P}\p{S}]/u,ao=/[\s\p{P}\p{S}]/u,Ii=/[^\s\p{P}\p{S}]/u,gu=He(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ao).getRegex(),Li=/(?!~)[\p{P}\p{S}]/u,hu=/(?!~)[\s\p{P}\p{S}]/u,bu=/(?:[^\s\p{P}\p{S}]|~)/u,vu=He(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",eu?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Oi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,yu=He(Oi,"u").replace(/punct/g,rs).getRegex(),wu=He(Oi,"u").replace(/punct/g,Li).getRegex(),Di="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ku=He(Di,"gu").replace(/notPunctSpace/g,Ii).replace(/punctSpace/g,ao).replace(/punct/g,rs).getRegex(),$u=He(Di,"gu").replace(/notPunctSpace/g,bu).replace(/punctSpace/g,hu).replace(/punct/g,Li).getRegex(),xu=He("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ii).replace(/punctSpace/g,ao).replace(/punct/g,rs).getRegex(),Su=He(/\\(punct)/,"gu").replace(/punct/g,rs).getRegex(),Au=He(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Tu=He(so).replace("(?:-->|$)","-->").getRegex(),Eu=He("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Tu).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Qn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Cu=He(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Qn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Mi=He(/^!?\[(label)\]\[(ref)\]/).replace("label",Qn).replace("ref",no).getRegex(),Ni=He(/^!?\[(ref)\](?:\[\])?/).replace("ref",no).getRegex(),Ru=He("reflink|nolink(?!\\()","g").replace("reflink",Mi).replace("nolink",Ni).getRegex(),wi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,io={_backpedal:_n,anyPunctuation:Su,autolink:Au,blockSkip:vu,br:Ri,code:_u,del:_n,emStrongLDelim:yu,emStrongRDelimAst:ku,emStrongRDelimUnd:xu,escape:fu,link:Cu,nolink:Ni,punctuation:gu,reflink:Mi,reflinkSearch:Ru,tag:Eu,text:mu,url:_n},Iu={...io,link:He(/^!?\[(label)\]\((.*?)\)/).replace("label",Qn).getRegex(),reflink:He(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Qn).getRegex()},Xs={...io,emStrongRDelimAst:$u,emStrongLDelim:wu,url:He(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",wi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:He(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",wi).getRegex()},Lu={...Xs,br:He(Ri).replace("{2,}","*").getRegex(),text:He(Xs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Zn={normal:oo,gfm:uu,pedantic:pu},un={normal:io,gfm:Xs,breaks:Lu,pedantic:Iu},Ou={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ki=e=>Ou[e];function sr(e,t){if(t){if(kt.escapeTest.test(e))return e.replace(kt.escapeReplace,ki)}else if(kt.escapeTestNoEncode.test(e))return e.replace(kt.escapeReplaceNoEncode,ki);return e}function $i(e){try{e=encodeURI(e).replace(kt.percentDecode,"%")}catch{return null}return e}function xi(e,t){let r=e.replace(kt.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(kt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(kt.slashPipe,"|");return n}function pn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Du(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Si(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function Mu(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Jn=class{constructor(e){Je(this,"options");Je(this,"rules");Je(this,"lexer");this.options=e||Cr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:pn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Mu(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=pn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:pn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=pn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=m,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let A=b,$=A.raw+`
`+r.join(`
`),E=this.blockquote($);o[o.length-1]=E,n=n.substring(0,n.length-A.raw.length)+E.raw,s=s.substring(0,s.length-A.text.length)+E.text;break}else if(b?.type==="list"){let A=b,$=A.raw+`
`+r.join(`
`),E=this.list($);o[o.length-1]=E,n=n.substring(0,n.length-b.raw.length)+E.raw,s=s.substring(0,s.length-A.raw.length)+E.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),b=e.split(`
`,1)[0],A=!m.trim(),$=0;if(this.options.pedantic?($=2,f=m.trimStart()):A?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=m.slice($),$+=t[1].length),A&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),c=!0),!c){let E=this.rules.other.nextBulletRegex($),j=this.rules.other.hrRegex($),x=this.rules.other.fencesBeginRegex($),K=this.rules.other.headingBeginRegex($),te=this.rules.other.htmlBeginRegex($);for(;e;){let L=e.split(`
`,1)[0],D;if(b=L,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),D=b):D=b.replace(this.rules.other.tabCharGlobal,"    "),x.test(b)||K.test(b)||te.test(b)||E.test(b)||j.test(b))break;if(D.search(this.rules.other.nonSpaceChar)>=$||!b.trim())f+=`
`+D.slice($);else{if(A||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(m)||K.test(m)||j.test(m))break;f+=`
`+b}!A&&!b.trim()&&(A=!0),u+=L+`
`,e=e.substring(L.length+1),m=D.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(m=>m.type==="space"),f=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=xi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(xi(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=pn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Du(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Si(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Si(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let f=[...n[0]][0].length,m=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let A=m.slice(1,-1);return{type:"em",raw:m,text:A,tokens:this.lexer.inlineTokens(A)}}let b=m.slice(2,-2);return{type:"strong",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ut=class Qs{constructor(t){Je(this,"tokens");Je(this,"options");Je(this,"state");Je(this,"inlineQueue");Je(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Cr,this.options.tokenizer=this.options.tokenizer||new Jn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:kt,block:Zn.normal,inline:un.normal};this.options.pedantic?(r.block=Zn.pedantic,r.inline=un.pedantic):this.options.gfm&&(r.block=Zn.gfm,this.options.breaks?r.inline=un.breaks:r.inline=un.gfm),this.tokenizer.rules=r}static get rules(){return{block:Zn,inline:un}}static lex(t,r){return new Qs(r).lex(t)}static lexInline(t,r){return new Qs(r).inlineTokens(t)}lex(t){t=t.replace(kt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(kt.tabCharGlobal,"    ").replace(kt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,m=t.slice(1),b;this.options.extensions.startInline.forEach(A=>{b=A.call({lexer:this},m),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},es=class{constructor(e){Je(this,"options");Je(this,"parser");this.options=e||Cr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(kt.notSpaceStart)?.[0],s=e.replace(kt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+sr(n)+'">'+(r?s:sr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:sr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${sr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=$i(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+sr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=$i(e);if(s===null)return sr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${sr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:sr(e.text)}},lo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jt=class Js{constructor(t){Je(this,"options");Je(this,"renderer");Je(this,"textRenderer");this.options=t||Cr,this.options.renderer=this.options.renderer||new es,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new lo}static parse(t,r){return new Js(r).parse(t)}static parseInline(t,r){return new Js(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Xn,fn=(Xn=class{constructor(e){Je(this,"options");Je(this,"block");this.options=e||Cr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?jt.parse:jt.parseInline}},Je(Xn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Je(Xn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Xn),Nu=class{constructor(...e){Je(this,"defaults",eo());Je(this,"options",this.setOptions);Je(this,"parse",this.parseMarkdown(!0));Je(this,"parseInline",this.parseMarkdown(!1));Je(this,"Parser",jt);Je(this,"Renderer",es);Je(this,"TextRenderer",lo);Je(this,"Lexer",Ut);Je(this,"Tokenizer",Jn);Je(this,"Hooks",fn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new es(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Jn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new fn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];fn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&fn.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,u);return c.call(s,m)})();let f=l.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,u);return m===!1&&(m=await c.apply(s,u)),m})();let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ut.lex(e,t??this.defaults)}parser(e,t){return jt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?jt.parse:jt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?jt.parse:jt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+sr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Er=new Nu;function Ke(e,t){return Er.parse(e,t)}Ke.options=Ke.setOptions=function(e){return Er.setOptions(e),Ke.defaults=Er.defaults,Ai(Ke.defaults),Ke};Ke.getDefaults=eo;Ke.defaults=Cr;Ke.use=function(...e){return Er.use(...e),Ke.defaults=Er.defaults,Ai(Ke.defaults),Ke};Ke.walkTokens=function(e,t){return Er.walkTokens(e,t)};Ke.parseInline=Er.parseInline;Ke.Parser=jt;Ke.parser=jt.parse;Ke.Renderer=es;Ke.TextRenderer=lo;Ke.Lexer=Ut;Ke.lexer=Ut.lex;Ke.Tokenizer=Jn;Ke.Hooks=fn;Ke.parse=Ke;var Sm=Ke.options,Am=Ke.setOptions,Tm=Ke.use,Em=Ke.walkTokens,Cm=Ke.parseInline;var Rm=jt.parse,Im=Ut.lex;function _r(e){let t=Ke.parse(e),r=gi.sanitize(t);return vi(r)}function or(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function zr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ns(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Pu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Fu=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,qu=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function mr(e){return!!e&&typeof e=="object"}function co(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Pi(e,t){let r=co(e),n=co(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Bu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>mr(s)&&typeof s.text=="string"?s.text:"").join(""):mr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Uu(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Pu[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=co(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Pi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=Pi(mr(l)?l.old_string:"",mr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Fi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function qi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Fu.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:qu.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function ju(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(mr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(qi(o.text));else if(o.type==="thinking"){let a=Fi(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Uu(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(mr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Bu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function zu(e){if(e.type==="item.completed"&&mr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[qi(t.text)];if(t.type==="reasoning"){let r=Fi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Hu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Bi(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!mr(o))continue;let a=Hu(o)?zu(o):ju(o,r);for(let l of a)t.push(l)}return t}var Wu=5,Gu=10,Yu=/Task\s+#(\d+)/,Vu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Ku=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ss(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Zu(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Xu(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Qu(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Yu.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Ju(e){if(e.tool==="Bash"){let t=e.command||"";return Vu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Ku.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ep(e){let t=e.filter(s=>s.kind==="tool").slice(-Gu),r=new Map;t.forEach((s,o)=>{let a=Ju(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function tp(e){let t=Xu(e);if(t)return{text:t,guess:!1};let r=Qu(e);if(r)return{text:r,guess:!1};let n=ep(e);return n?{text:n,guess:!0}:null}function rp(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Tt(e,t)}function os(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},l=!0,c=new Set,u=new Set,f=null,m=null,b=!1,A=!1,$=!1,E=null,j=null;function x(){b=!1,A=!1,$=!1,E=null,j=null}async function K(I){if(r){A=!0,$=!1,_e();try{let C=await Promise.resolve(r("get-attempt-prompt",{attempt_id:I}));if(o!==I)return;!C||typeof C!="object"||Array.isArray(C)?$=!0:(E=C,j=I)}catch{o===I&&($=!0)}finally{o===I&&(A=!1,_e())}}}function te(){if(b=!b,b&&o&&j!==o){K(o);return}_e()}function L(){if(!b)return"";let I=zr({loading:A,error:$});if(I)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${I}
      </div>`;if(!E)return"";if(E.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let C=ns(E.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${C?i`<div class="prompt-block__meta">${C} 발송</div>`:""}
      ${typeof E.task_prompt=="string"?or("\uACFC\uC5C5 (user)",E.task_prompt):""}
      ${typeof E.system_prompt=="string"?or("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",E.system_prompt):""}
    </div>`}function D(){if(!o||!n)return[];let I=n.get(o);return Bi(I?I.lines:[])}function S(){if(!o||!n)return null;let I=n.get(o),C=I?I.last_event_at:null;return typeof C=="number"?C:null}function H(){return a.status==="running"}function F(){if(H()&&o){m||(m=setInterval(()=>_e(),1e3));return}se()}function se(){m&&(clearInterval(m),m=null)}function be(I){let C=[],ie=0;for(;ie<I.length;){let Be=I[ie];if(Be.kind==="tool"){let Ce=ie;for(;Ce<I.length&&I[Ce].kind==="tool"&&I[Ce].tool===Be.tool;)Ce+=1;if(Ce-ie>=Wu&&!u.has(ie)){C.push({kind:"group",idx:ie,tool:Be.tool||"",lines:I.slice(ie,Ce).map((ye,$e)=>({idx:ie+$e,line:ye}))}),ie=Ce;continue}}C.push({kind:"line",idx:ie,line:Be}),ie+=1}return C}function le(I){for(let C=I.length-1;C>=0;C-=1){let ie=I[C];if(ie.kind==="result"||ie.kind==="error")return null;if(ie.kind==="tool"&&!Object.hasOwn(ie,"result"))return ie}return null}function me(I){for(let C=I.length-1;C>=0;C-=1)if(I[C].kind==="thinking")return I[C];return null}function Ie(I,C){if(C.kind==="gate")return i`<div class="sv__gate">${C.text}</div>`;if(C.kind==="phase")return i`<div class="sv__phase">${C.text}</div>`;if(C.kind==="result")return i`<div
        class="sv__result${C.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${C.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${_r(C.text||(C.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(C.kind==="thinking"){let ie=c.has(I);return i`<div
        class="sv__think${ie?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ve(I)}
      >
        <span class="sv__think-line">💭 ${ss(C.text)}</span>
        ${ie?i`<pre class="sv__think-expand">${C.text}</pre>`:""}
      </div>`}if(C.kind==="error")return i`<div class="sv__error">⛔ ${C.text}</div>`;if(C.kind==="blocker")return i`<div class="sv__error">⛔ ${C.text}</div>`;if(C.kind==="tool"){let ie=c.has(I),Be=C.tool==="Bash"?Zu(C.command):0,Ce=C.tool==="Bash"?Be>1?ss(C.command):C.command:C.path||C.command||"";return i`<div
        class="sv__tool${ie?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ve(I)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${C.icon}</span>
          <span class="sv__tool-name">${C.tool}</span>
          ${Ce?i`<span class="sv__tool-detail">${Ce}</span>`:""}
          ${Be>1?i`<span class="sv__tool-more">⋯ ${Be}줄</span>`:""}
          ${typeof C.added=="number"?i`<span class="sv__diff-add">+${C.added}</span>`:""}
          ${typeof C.removed=="number"?i`<span class="sv__diff-del">−${C.removed}</span>`:""}
          ${C.result?i`<span class="sv__tool-ok">→ ${C.result}</span>`:""}
        </span>
        ${ie?i`<pre class="sv__tool-expand">${Ue(C)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${_r(C.text||"")}</div>`}function Ue(I){let C=[];if(I.tool==="Bash"&&typeof I.command=="string"&&I.command.length>0)C.push(I.command);else if(I.input!==void 0)try{C.push(`input: ${JSON.stringify(I.input,null,2)}`)}catch{}return typeof I.output=="string"&&I.output.length>0&&C.push(`output:
${I.output}`),C.join(`

`)}function ze(){if(!o)return i``;let I=D(),C=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ie=a.session_id||"",Be=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,Ce=H(),ye=Ce?rp(S(),Date.now()):"",$e=Ce?le(I):null,Ze=Ce?me(I):null,Fe=tp(I);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Fe?i`<span
              class="sv__stage${Fe.guess?" sv__stage--guess":""}"
              title=${Fe.text}
              >${Fe.text}</span
            >`:""}
        ${Ce?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ye?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ye}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ye?i`<span class="sv__live-ago">${ye}</span>`:""}</span
            >`:""}
        ${ie?i`<button
              type="button"
              class="sv__session"
              title=${ie}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ie}`}
              @click=${()=>Y(ie)}
            >
              ⧉ ${ie.slice(0,8)}
            </button>`:""}
        ${C?i`<span class="sv__meta">${C}</span>`:""}
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
          @click=${te}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Be}
          @click=${fe}
        >
          <span class="sv__follow-full">⇣ ${Be}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>pe()}
        >
          ✕
        </button>
      </div>
      ${L()}
      <div class="sv__body">
        ${I.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:be(I).map(Qe=>Qe.kind==="group"?Pe(Qe):Ie(Qe.idx,Qe.line))}
      </div>
      ${$e||Ze?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${$e?i`<span class="sv__now-icon">${$e.icon}</span>
                  <span class="sv__now-name">${$e.tool}</span>
                  <span class="sv__now-detail"
                    >${$e.tool==="Bash"?ss($e.command):$e.path||$e.command||""}</span
                  >`:""}
            ${Ze?i`<span class="sv__now-think"
                  >💭 ${ss(Ze.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Pe(I){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>De(I.idx)}
    >
      <span class="sv__group-icon">${I.lines[0].line.icon}</span>
      <span class="sv__group-name">${I.tool}</span>
      <span class="sv__group-count">${I.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function De(I){u.add(I),_e()}function _e(){qe(ze(),e),F(),l&&ge()}function ge(){let I=e.querySelector(".sv__body");I&&(I.scrollTop=I.scrollHeight)}function ve(I){c.has(I)?c.delete(I):c.add(I),_e()}function fe(){l=!l,_e()}function Y(I){Tr(I).then(C=>{C?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Z(I){!o||!I||(a={...a,...I},_e())}function Ae(I){let C=I.target;if(!C||!C.classList||!C.classList.contains("sv__body"))return;!(C.scrollHeight-C.scrollTop-C.clientHeight<=4)&&l&&(l=!1,_e())}e.addEventListener("scroll",Ae,!0);function ue(I){let C=I&&I.attempt_id;C&&(o=C,a=I.meta||{},l=!0,c.clear(),u.clear(),x(),!f&&n&&(f=n.subscribe(_e)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),_e())}function pe(){let I=o;o=null,c.clear(),u.clear(),x(),se(),r&&I&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${I}`})).catch(()=>{}),qe(i``,e),s&&s()}return{open:ue,updateMeta:Z,close:pe,isOpen(){return o!==null},destroy(){se(),f&&(f(),f=null),e.removeEventListener("scroll",Ae,!0),o=null,qe(i``,e)}}}function gn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Ui(t.spec_id),s=Ui(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ui(e){return typeof e=="string"?e.trim():""}function np(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function sp(e){let t=e&&e.metadata||{},r=gn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:np(t)?null:"plan_pending"}),n}function ji(e,t){let r=sp(e);return i`
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
  `}var op="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",ap=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ip=/^\*\*결론\*\* — (.+)$/;function as(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==op)return null;let r=ap.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?ip.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",u=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var zi=20;function Hi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function lp(e){return e.length>zi?`${e.slice(0,zi)}\u2026`:e}function cp(e,t,r,n){let s=`${t.lane} ${lp(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${Hi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${_r(t.body)}
        </div>`:""}
  </div>`}function dp(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Hi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${_r(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Wi(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let u=as(typeof c.text=="string"?c.text:"");return u?cp(c,u,t,s.has(c.id)):dp(c)})}
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
  `}var up=["codex","opus","fable","self","skip"],pp=["codex","fable","skip"],fp=["low","medium","high","xhigh"],_p=["standard","fast_track"],Rr=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],po=["impl_runtime","orchestration_model"],hn=[{id:"worker-detail",label:"\uC6CC\uCEE4 \uC0C1\uC138",keys:["orchestration_effort","orchestration_speed"]},{id:"implementation-detail",label:"\uAD6C\uD604 \uC0C1\uC138",keys:["impl_model","impl_effort"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]}],fo={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Gi={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},mp=["self","skip"],gp="opus",_o={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function mo(e){let t=fo[e]||{title:e};return i`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?i`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function hp(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:_o[e]||"(\uAE30\uBCF8)"}function Hr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ir(e){if(!Hr(e)||!Hr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Hr(r)&&Hr(r.models));return t.length>0?t:null}function uo(e){return{value:e,label:e}}function go(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Yi(e,t,r=null){let n=Ir(e);if(!n)return t?[{label:null,options:[uo(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,l])=>({label:a,options:Object.keys(l.models).map(uo)})),o=s.some(a=>a.options.some(l=>l.value===t));return t&&!o?[go(t),...s]:s}function gr(e,t){let r={label:null,options:e.map(uo)};return t&&!e.includes(t)?[go(t),r]:[r]}function ar(e,t){let r=Ir(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function ho(e,t){return Hr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function bp(e,t){return Hr(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():ho(e,t)}function vp(e,t){let r=Ir(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return bp(n,n.models[t]);return[]}function yp(e,t){let r=Ir(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function bo(e,t){let r=Ir(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return ho(n,n.models[t]);return[]}function Zi(e){let t=Ir(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of ho(n,s))r.includes(o)||r.push(o);return r}function Xi(e,t){if(!t)return Zi(e);let n=Ir(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of bo(e,o))s.includes(a)||s.push(a);return s}function ls(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ar(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?bo(t,n.impl_model):Xi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Wr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||gp,a=r("impl_model"),l=r("impl_runtime"),c=l==="claude"||l==="codex"?l:l==="inherit"?s===void 0?ar(n,o):s:null;return Rr.map(u=>{let f=t(u),m,b=!1;return u==="orchestration_model"?m=Yi(n,f):u==="impl_runtime"?m=gr(["inherit","claude","codex"],f):u==="impl_model"?(m=c?Yi(n,f,c):f?[go(f)]:[],b=l==="inherit"&&c===null):u==="orchestration_effort"?m=gr(vp(n,o),f):u==="orchestration_speed"?m=wp(yp(n,o),f):u==="impl_effort"?(m=gr(a?bo(n,a):c?Xi(n,c):Zi(n),f),b=l==="inherit"&&c===null):u==="plan_review_model"?m=gr(pp,f):Object.hasOwn(Gi,u)?(m=gr(fp,f),b=mp.includes(r(Gi[u]))):m=gr(up,f),{key:u,groups:m,selected:f,disabled:b,runner:u==="orchestration_model"?ar(n,o):null}})}function is(e,t,r){return i`
    ${typeof r=="string"?i`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Vi(s,t)):i`<optgroup label=${n.label}>
            ${n.options.map(s=>Vi(s,t))}
          </optgroup>`)}
  `}function wp(e,t){return gr(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Vi(e,t){return i`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Ki(e,t,r,n,s,o,a){return i`
    <div class="detail-kv">
      <span class="detail-kv__k">${mo(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${l=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&a.onImplTargetChange?a.onImplTargetChange(e,l.target.value):a.onChange(e,l.target.value)}
        >
          ${t}
        </select>
        ${o?i`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function kp(e,t,r,n){return e.some(s=>t(s))?"\uC774\uC288 \uD540":e.some(s=>r(s))?`\uD504\uB9AC\uC14B \u300C${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"}\u300D`:"\uAE30\uBCF8"}function $p(e,t,r){let n=[t("orchestration_model")||"opus"],s=t("orchestration_effort"),o=t("orchestration_speed");s&&n.push(`effort ${s}`),o&&o!=="default"&&n.push(`speed ${o==="fast"?"Fast":o}`);let a=`${t("impl_runtime")||"inherit"} \xB7 ${t("impl_model")||"auto"}`,l=[["\uC2A4\uD399","spec_review_model","spec_review_effort"],["\uACC4\uD68D","plan_review_model","plan_review_effort"],["\uAD6C\uD604","impl_review_model","impl_review_effort"]].map(([u,f,m])=>{let b=t(f)||"codex",A=t(m);return`${u} ${b}${A?`/${A}`:""}`}),c=[{id:"worker",label:"\uC6CC\uCEE4",keys:Rr.slice(0,3),value:n.join(" \xB7 ")},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_runtime","impl_model","impl_effort"],value:a},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"],value:l.join(" \xB7 ")}];return i`<section
    class="detail-exec-presets exec-settings-summary"
    data-exec-settings-summary
  >
    ${c.map(u=>i`<div
          class="workflow-summary__row exec-settings-summary__row"
          data-exec-summary=${u.id}
        >
          <span class="workflow-summary__label">${u.label}</span>
          <span class="detail-kv__vgroup">
            <span class="workflow-summary__value">${u.value}</span>
            <span class="detail-kv__v" data-exec-source
              >${kp(u.keys,e,t,r)}</span
            >
          </span>
        </div>`)}
  </section>`}function Qi(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},l=$=>typeof o[$]=="string"?o[$]:"",c=$=>{let E=l($);return E||(typeof a[$]=="string"?a[$]:"")},u=Wr({selectedOf:l,effectiveOf:c,runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard",m=new Map(u.map($=>[$.key,$])),b=hn.flatMap($=>$.keys).filter($=>l($)).length,A=$=>{let E=m.get($);return E?Ki(E.key,is(E.groups,E.selected,hp(E.key,a,s)),E.selected,!!E.selected,E.disabled,E.runner,t):""};return i`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${$p(l,c,s)}
    <section class="exec-settings-core" data-exec-settings-core>
      ${Ki("workflow_mode",is(gr(_p,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
      ${po.map(A)}
    </section>
    <details
      class="detail-exec-presets exec-settings-advanced"
      data-exec-settings-advanced
    >
      <summary>고급 설정 — ${b}개 변경됨</summary>
      ${hn.map($=>i`<section
            class="exec-settings-advanced__group"
            data-exec-settings-group=${$.id}
          >
            <h4>${$.label}</h4>
            ${$.keys.map(A)}
          </section>`)}
    </details>
  `}function xp(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ji(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c($){$.key==="Escape"&&s&&($.preventDefault(),b())}document.addEventListener("keydown",c);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${xp(s)}</span
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
                    </div>`:_r(a)}
          </div>
        </div>
      </div>
    `:i``}function f(){qe(u(),e)}async function m($,E={}){s=$,o="loading",a="",l="",f();let j=r?r():"";if(!j){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let x="/api/doc?workspace="+encodeURIComponent(j)+"&path="+encodeURIComponent($);try{let K=await n(x),te=await K.json().catch(()=>({}));if(!K.ok||!te||te.ok!==!0){if(te?.error==="not_found"&&E.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(te&&te.error||K.status)+")",f();return}a=String(te.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){s=null,qe(i``,e)}function A(){document.removeEventListener("keydown",c),b()}return{open:m,close:b,destroy:A}}var Sp=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],rl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ap(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Tp(e){let t=gt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Ur(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${rl}
          >부분 집계</span
        >`:""}`}function el(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function tl(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?nl(t):""}function Ep(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=gt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
        ${tl(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${tl(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function Cp(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Sp,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Ap(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${rl}</span>`:""}
  </div>`}var Rp={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function nl(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Ip(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function sl(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let m=typeof u.session_id=="string"&&u.session_id.length>0,b=o.has(u.attempt_id),A=m&&!b,$=m?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!A}
      title=${$}
      @click=${E=>{E.stopPropagation(),A&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let m=u.cause_detail,b=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:u.cause;return i`<div class="detail-session__cause" title=${b}>
      ${u.cause}
    </div>`},c=u=>{let f=el(Us(u));if(gt(f).length===0&&!Ur(u.usage))return"";let m=s.has(u.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${m?"true":"false"}
      title=${m?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${Tp(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=Us(u),m=el(f),b=gt(m);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Rp[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${pr(u)?i`<span
                  class="detail-session__resumed"
                  title=${pr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Yt(u)}</span>
            ${b.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(A=>i`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):Ur(u.usage)?i`<span class="detail-session__usage"
                    >${Ur(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${nl(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${l(u)} ${Ip(u)}
          ${s.has(u.attempt_id)&&u.usage?Cp(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Ep(f)}
        </div>`})}
    </div>
  `}function ol(e,t={}){return i`
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
          ${Lp(e)}
        </div>`:""}
  `}function Lp(e){let t=zr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?or("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=ns(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?or("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?or("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Op=["open","in_progress","deferred","resolved","closed"],Dp=[0,1,2,3,4];function al(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,m={},b="",A=!1,$=!1,E=!1,j="",x="",K="";function te(){$=!1,E=!1,j="",x="",K=""}let L=[],D=null,S=null,H=!1,F="",se=!1,be=0,le=new Set;function me(){L=[],D=null,S=null,H=!1,F="",se=!1,be+=1,le.clear()}async function Ie(d){if(!s)return;let k=++be;try{let v=await Promise.resolve(s("get-comments",{id:d}));if(k!==be||d!==u)return;L=Array.isArray(v)?v:[],H=!1}catch{if(k!==be||d!==u)return;H=!0}_()}function Ue(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(D!==u){D=u,S=d,Ie(u);return}d!==null&&d!==S&&(S=d,Ie(u))}function ze(d){le.has(d)?le.delete(d):le.add(d),_()}function Pe(d){let k=F.trim().length===0;F=d,k!==(d.trim().length===0)&&_()}async function De(){let d=F.trim();if(!s||!u||d.length===0||se)return;let k=u;se=!0,_();let v=!1;try{let q=await Promise.resolve(s("add-comment",{id:k,text:d}));Array.isArray(q)&&q.length>0&&(v=!0,k===u&&(L=q,H=!1,F="",S=q.length))}catch{v=!1}v||J("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),k===u&&(se=!1),_()}let _e={onToggle:ze,onDraftInput:Pe,onSubmit:De},ge=document.createElement("div");ge.className="md-viewer-root",document.body.appendChild(ge);let ve=Ji(ge,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),fe=document.createElement("div");fe.className="session-log-root",document.body.appendChild(fe);let Y=os(fe,{transport:s?(d,k)=>Promise.resolve(s(d,k)):void 0,sessionLogStore:c}),Z=!1,Ae=!1,ue=!1,pe=null,I=null,C=0;function ie(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function Be(){Z=!1,Ae=!1,ue=!1,pe=null,I=null,C+=1}async function Ce(d){if(!s)return;let k=++C;Ae=!0,ue=!1,_();try{let v=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(k!==C)return;!v||typeof v!="object"||Array.isArray(v)?ue=!0:(pe=v,I=ie(d))}catch{k===C&&(ue=!0)}finally{k===C&&(Ae=!1,_())}}function ye(){if(Z=!Z,Z&&u&&I!==ie(u)){pe=null,Ce(u);return}_()}function $e(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(v=>v&&v.bead_id===u).sort((v,q)=>(q.started_at||0)-(v.started_at||0)).map(v=>({attempt_id:v.attempt_id,bead_id:v.bead_id,status:v.status,started_at:typeof v.started_at=="number"?v.started_at:null,runner:v.runner||null,model:v.model||null,effort:v.effort||null,speed:v.speed||null,session_id:v.session_id||null,resumed_from:v.resumed_from||null,continuation_mode:v.continuation_mode||null,dismissed_at:typeof v.dismissed_at=="number"?v.dismissed_at:null,cause:typeof v.cause=="string"?v.cause:null,cause_detail:v.cause_detail||null,exec_default_preset_id:typeof v.exec_default_preset_id=="string"?v.exec_default_preset_id:null,exec_default_preset_revision:typeof v.exec_default_preset_revision=="number"?v.exec_default_preset_revision:null,exec_values:v.exec_values&&typeof v.exec_values=="object"?v.exec_values:null,usage:v.usage||null,usage_legs:Array.isArray(v.usage_legs)?v.usage_legs:[]}))}function Ze(){if(!a||!u)return null;let d=a.get();return It(d&&d.attempts||{},u)}let Fe=new Set;function Qe(d){Fe.has(d)?Fe.delete(d):Fe.add(d),_()}function O(d){let k=a?a.get():null,v=k&&k.attempts?k.attempts[d]:null;Y.open({attempt_id:d,meta:v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}})}async function W(d){if(!s||!d)return;let k=()=>{let he=a?a.get():null;return he&&typeof he.revision=="number"?he.revision:0},v=async(he={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:k(),...he}),q=he=>{he?.queue&&a?.set&&a.set(he.queue)},ee=await v();if(q(ee),ee&&ee.conflict){let he=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:k();ee=await s("worker-attempt-resume",{attempt_id:d,expected_revision:he}),q(ee)}ee=await tr(ee,(he,it)=>v({continuation:he,decision_token:it}),{onResult:q,refresh:()=>v()}),ee&&ee.resumed===!1&&!ee.conflict&&ee.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ee.reason}`,"error",2400)}let B={onOpen:O,onResume:W,onToggleUsage:Qe};function y(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,v=typeof k=="string"?Q()?.presets.find(q=>q.id===k):null;return v&&v.compatible!==!1&&v.settings?v.settings:{}}function R(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,v=typeof k=="string"?Q()?.presets.find(q=>q.id===k):null;return v&&v.compatible!==!1&&typeof v.name=="string"?v.name:""}function P(){let d=a?a.get():null;return d&&d.runner_catalog||null}function G(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},v=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof y().orchestration_model=="string"?y().orchestration_model:"")||"opus";return ar(P(),v)}function Q(){let d=l?l.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function Re(d){let k=d&&d.settings&&typeof d.settings=="object"?d.settings:{},v=q=>typeof k[q]=="string"?k[q]:q==="impl_runtime"&&typeof k.impl_model=="string"&&ar(P(),k.impl_model)||"";return Wr({selectedOf:v,effectiveOf:v,runner_catalog:P()}).some(q=>q.groups.some(ee=>ee.options.some(he=>he.value===q.selected&&he.label.endsWith("(\uBE44\uD638\uD658)"))))}function xe(d){l&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&l.set({revision:d.revision,presets:d.presets})}async function Le(){let d=Q(),k=d?.presets.find(v=>v.id===b);if(!(!s||!u||!d||!k||Re(k)||A)){A=!0,_();try{let v=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:k.id,expected_revision:d.revision}));if(v&&v.conflict){xe(v),J("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let q=v&&Array.isArray(v.issue)?v.issue[0]:v?.issue;if(v&&v.applied&&q&&typeof q=="object"){f=q;for(let ee of Rr)delete m[ee];J("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}v&&v.error==="bd_readback_failed"?J("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):J("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(v){v&&typeof v=="object"&&v.code==="bd_readback_failed"?J("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):J("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,_()}}}function We(){let d=Q();if(d&&d.presets.length===0)return i`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let k=d?d.presets:[],v=k.find(ee=>ee.id===b),q=v?Re(v):!1;return i`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||A}
          @change=${ee=>{b=ee.target.value,_()}}
        >
          <option value="" ?selected=${b===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${k.map(ee=>{let he=Re(ee);return i`<option
              value=${ee.id}
              ?selected=${ee.id===b}
            >
              ${ee.name}${he?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!v||q||A}
          @click=${()=>{Le()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let st=null;r&&r.subscribe&&(st=r.subscribe(()=>rt()));let et=null;a&&typeof a.subscribe=="function"&&(et=a.subscribe(()=>{u&&_()}));let ut=null;l&&typeof l.subscribe=="function"&&(ut=l.subscribe(()=>{u&&_()}));function $t(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",$t);function rt(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(v=>v&&v.id===u)||d[0]||f}Ue(),_()}}function ot(d){Tr(d).then(k=>{k?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function tt(d){d.preventDefault(),d.stopPropagation(),u&&ot(u)}function at(d,k){d.preventDefault(),d.stopPropagation(),ot(k)}function _t(d,k,v){d.preventDefault(),d.stopPropagation(),ve.open(k,{missing_state:v})}function U(d,k){m[d]=k,_(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:k})).catch(()=>{J("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function V(d,k){let v=f||{},q=v.metadata&&typeof v.metadata=="object"?v.metadata:{},ee={};for(let Me of["impl_runtime","impl_model","impl_effort"])ee[Me]=Object.hasOwn(m,Me)?m[Me]:typeof q[Me]=="string"?q[Me]:"";ee[d]=k;let he=ls(ee,P(),G()),it={};for(let Me of["impl_runtime","impl_model","impl_effort"])it[Me]=m[Me],m[Me]=he[Me]||"";_(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...he,orchestration_runtime:G()})).then(Me=>{let Nt=Array.isArray(Me)?Me[0]:Me;if(!Nt||typeof Nt!="object"||!Nt.id)throw new Error("implementation target readback failed");f=Nt;for(let ke of["impl_runtime","impl_model","impl_effort"])delete m[ke];_()}).catch(()=>{for(let Me of["impl_runtime","impl_model","impl_effort"])it[Me]===void 0?delete m[Me]:m[Me]=it[Me];_(),J("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ae(d,k,v){if(!s||!u)return!1;try{let q=await Promise.resolve(s(d,k)),ee=Array.isArray(q)?q[0]:q;return ee&&typeof ee=="object"&&ee.id?(f=ee,!0):(J(v,"error"),!1)}catch{return J(v,"error"),!1}}function ce(d){setTimeout(()=>{try{let k=e.querySelector(d);k&&typeof k.focus=="function"&&k.focus()}catch{}},0)}function re(){$=!0,j=f&&f.title||"",_(),ce('.detail-edit__input[data-edit="title"]')}function Te(d){j=d.target.value}function Ve(){$=!1,j="",_()}function Xe(){ae("edit-text",{id:u,field:"title",value:j},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&($=!1,j=""),_()})}function Se(){E=!0,x=f&&f.description||"",_(),ce('.detail-edit__textarea[data-edit="description"]')}function Ge(d){x=d.target.value}function we(){E=!1,x="",_()}function dt(){ae("edit-text",{id:u,field:"description",value:x},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&(E=!1,x=""),_()})}function ht(d,k,v,q){if(d.key==="Escape"){d.stopPropagation(),v();return}d.key==="Enter"&&(!q||d.ctrlKey||d.metaKey)&&(d.preventDefault(),k())}function Zt(d){let k=d.target.value;ae("update-status",{id:u,status:k},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function zt(d){let k=Number(d.target.value);ae("update-priority",{id:u,priority:k},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function Xt(d){K=d.target.value}function mt(){let d=K.trim();d.length!==0&&ae("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(k=>{k&&(K=""),_()})}function xt(d){if(d.key==="Escape"){d.stopPropagation(),K="",_();return}d.key==="Enter"&&(d.preventDefault(),mt())}function Ot(d){ae("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>_())}let Dt={onCopyPath:at,onOpenDoc:_t},Mt={onChange:U,onImplTargetChange:V};function Ht(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function Ee(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function bt(d){let v=(Array.isArray(d.dependencies)?d.dependencies:[]).map(q=>({id:Ht(q),icon:Ee(q)})).filter(q=>q.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${v.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${v.map(q=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(q.id)}
                  >
                    ${q.icon?`${q.icon} `:""}${q.id}
                  </button>`:i`<span class="detail-dep"
                    >${q.icon?`${q.icon} `:""}${q.id}</span
                  >`)}
          </div>`}
    `}function p(d){let k=d.metadata||{},v=d.workflow||{},q=v.stages||{},ee=q.spec&&q.spec.stale,he=q.impl&&q.impl.stale,it=q.plan||null,Me=v.route_source==="derived",Nt=v.route||k.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Me?" detail-kv__v--derived":""}"
          title=${Me?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Me?"unset":Nt}</span
        >
      </div>
      ${v.route!=="quick_fix"||Object.hasOwn(k,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${k.spec_review||"\uC5C6\uC74C"}${ee?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${it?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${it?.approval_receipt||"\uC5C6\uC74C"}${it?.approval_state==="stale"?" \xB7 stale":it?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${v.route!=="quick_fix"||Object.hasOwn(k,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${k.impl_review||"\uC5C6\uC74C"}${he?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${v.exec_receipt.kind}:${v.exec_receipt.actor}@${v.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${v.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${v.impl_entry.actor}@${v.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${k.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${k.pr_url}</span>
          </div>`:""}
    `}let w={route:["quick_fix","spec_backed","full_plan"]};async function M(d,k){let v=k.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&v!=="full_plan"&&!window.confirm(`full_plan \u2192 ${v||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){_();return}await ae("update-workflow-meta",{id:u,key:d,value:v},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),_()}function oe(d){let k=d.metadata||{};return i` ${((q,ee)=>{let he=w[q],it=typeof k[q]=="string"?k[q]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${q}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${q}
          data-edit=${`wfmeta-${q}`}
          @change=${Me=>M(q,Me)}
        >
          <option value="" ?selected=${!he.includes(it)}>
            ${ee}
          </option>
          ${he.map(Me=>i`<option value=${Me} ?selected=${it===Me}>${Me}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function z(d,k){return $?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${j}
            @input=${Te}
            @keydown=${v=>ht(v,Xe,Ve,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Xe}
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
        <h2 class="detail-overlay__title">${d}</h2>
        ${gt(k).map(v=>i`<span class="detail-usage-total" title=${v.tooltip}
              >${v.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${re}
        >
          ✎
        </button>
      </div>
    `}function h(d){let k=pt(d.created_at),v=pt(d.updated_at);return!k&&!v?i``:i`
      ${k?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
      ${v?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${v}</span>
          </div>`:""}
    `}function T(d,k){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Zt}
        >
          ${Op.map(v=>i`<option value=${v} ?selected=${v===d}>${v}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${zt}
        >
          ${Dp.map(v=>i`<option value=${String(v)} ?selected=${v===k}>
                P${v}
              </option>`)}
        </select>
      </div>
    `}function X(d){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${E?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Se}
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
              .value=${x}
              @input=${Ge}
              @keydown=${k=>ht(k,dt,we,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${dt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${we}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function de(d){let k=typeof d.notes=="string"?d.notes:"";return k.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${k}</div>
    `}function Oe(d){let k=Array.isArray(d.labels)?d.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${k.map(v=>i`<span class="detail-label-chip"
              >${v}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${v}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+v}
                @click=${()=>Ot(v)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${K}
            @input=${Xt}
            @keydown=${xt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${mt}
          >
            추가
          </button>
        </span>
      </div>
    `}function je(){if(!u)return i``;let d=f||{},k=String(d.id||u),v=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",q=Ze(),ee=d.status||"open",he=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",it=d.description||"",Me={...d,metadata:{...d.metadata||{},...m}};return i`
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
            @click=${tt}
          >
            ${k}
          </button>
          ${z(v,q)}
          ${T(ee,he)} ${h(d)}
          ${X(it)}
          ${Wi(L,_e,{expanded:le,draft:F,sending:se,error:H})}
          ${de(d)} ${Oe(d)} ${bt(d)}
          ${p(d)} ${oe(d)}
          ${ji(d,Dt)}
          ${We()}
          ${Qi(Me,Mt,y(),P(),R())}
          ${ol({expanded:Z,loading:Ae,error:ue,data:pe},{onToggle:ye})}
          ${sl($e(),B,{total:q,expanded:Fe})}
        </div>
      </div>
    `}function _(){qe(je(),e)}return{load(d){d!==u&&(m={},b="",te(),me(),Be()),u=d,f=null,rt()},clear(){u=null,f=null,m={},b="",A=!1,te(),me(),Be(),ve.close(),Y.close(),qe(i``,e)},destroy(){st&&(st(),st=null),et&&(et(),et=null),ut&&(ut(),ut=null),document.removeEventListener("keydown",$t),ve.destroy(),ge.parentNode&&ge.parentNode.removeChild(ge),Y.destroy(),fe.parentNode&&fe.parentNode.removeChild(fe),u=null,f=null,b="",A=!1,me(),Be(),qe(i``,e)}}}var Mp=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function il(e,t){return Fs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Np(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function ll(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function l(S){let H=r.get();if(H)try{let F=await n("display-policy-set",{expected_revision:H.revision,policy:S(H)});c(F),F&&F.conflict&&F.policy&&(F=await n("display-policy-set",{expected_revision:F.policy.revision,policy:S(F.policy)}),c(F)),F&&F.conflict&&J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function c(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function u(S){let H=r.get();if(!H)return;let F=il(S,H)!=="shown";l(se=>Np(S,se,F))}function f(){let S=a.trim();S.length!==0&&(a="",l(H=>H.hidden_prefixes.includes(S)?{hidden_prefixes:H.hidden_prefixes}:{hidden_prefixes:[...H.hidden_prefixes,S]}),j())}function m(S){l(H=>({hidden_prefixes:H.hidden_prefixes.filter(F=>F!==S)}))}function b(S){let H=r.get();if(!H)return;let F=H.chips[S]===!1;l(()=>({chips:{[S]:F}}))}function A(S){let H=s();return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${H.length===0?i`<div class="display-settings__empty">라벨 없음</div>`:i`<div class="display-settings__pills">
              ${H.map(F=>{let se=il(F,S);return i`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${se}`}
                  data-label=${F}
                  data-state=${se}
                  @click=${()=>u(F)}
                >
                  ${F}
                </button>`})}
            </div>`}
      </section>
    `}function $(S){return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(H=>i`<span class="display-settings__prefix">
                ${H}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${H} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>m(H)}
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
            .value=${a}
            @input=${H=>{a=String(H.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function E(S){return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Mp.map(([H,F])=>i`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${H}
                  .checked=${S.chips[H]!==!1}
                  @change=${()=>b(H)}
                />
                <span>${F}</span>
              </label>`)}
        </div>
      </section>
    `}function j(){let S=r.get();qe(i`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${D}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?i`${A(S)} ${$(S)}
                ${E(S)}`:i`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let x=!1,K=()=>{x=!1};o.addEventListener("close",K),o.addEventListener("cancel",K);let te=null;r.subscribe&&(te=r.subscribe(()=>{x&&j()}));function L(){x||(a="",x=!0,j(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function D(){x&&(x=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:L,close:D,destroy(){x=!1,o.removeEventListener("close",K),o.removeEventListener("cancel",K),te&&(te(),te=null),o.remove()}}}function cl(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,m="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let b=typeof m=="string"?m.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function cs(e,t){let{queueStore:r,presetStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=null,l=!1;function c(){return r&&r.get()||{revision:0,exec_defaults:{}}}function u(){let y=c();return typeof y.revision=="number"?y.revision:0}function f(){let y=n?n.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function m(y){n&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&n.set({revision:y.revision,presets:y.presets})}function b(y){y&&y.queue&&r&&r.set(y.queue)}function A(){return c().runner_catalog??null}let $=null;function E(){if($!==null)return $;let y=c().default_exec_preset_id;return typeof y=="string"&&y.length>0?y:null}async function j(y){if(!s)return;let R=f();if(!R)return;$=y||"";let P=L(y);if(ye(),!P.viable){J(P.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3),$=null,ye();return}try{let G=await s("worker-queue-set-default-exec-preset",{preset_id:y||null,expected_queue_revision:u(),expected_preset_revision:R.revision});b(G),G&&G.presets&&n&&n.set(G.presets),G&&G.conflict?J("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3):G&&G.applied||J("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{J("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}$=null,ye()}function x(y){a={id:y.id,name:y.name,settings:{...y.settings||{}}},S(),l=!1,ye()}function K(){a={id:null,name:"",settings:{}},l=!1,ye()}function te(y){let R=y&&y.settings&&typeof y.settings=="object"?y.settings:{},P=G=>typeof R[G]=="string"?R[G]:G==="impl_runtime"&&typeof R.impl_model=="string"&&ar(A(),R.impl_model)||"";return Wr({selectedOf:P,effectiveOf:P,runner_catalog:A()}).some(G=>G.groups.some(Q=>Q.options.some(Re=>Re.value===G.selected&&Re.label.endsWith("(\uBE44\uD638\uD658)"))))}function L(y){if(!y)return{viable:!0,missing:!1,incompatible:!1,preset:null};let P=f()?.presets.find(Q=>Q.id===y);if(!P||P.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let G=P.compatible===!1||te(P);return{viable:!G,missing:!1,incompatible:G,preset:P}}function D(){let y=a?.settings.orchestration_model;return typeof y!="string"?null:ar(A(),y)}function S(){if(!a)return;let y=ls({impl_runtime:a.settings.impl_runtime||"",impl_model:a.settings.impl_model||"",impl_effort:a.settings.impl_effort||""},A(),D());for(let R of["impl_runtime","impl_model","impl_effort"])y[R]?a.settings[R]=y[R]:delete a.settings[R]}function H(y){let R=y&&y.settings&&typeof y.settings=="object"?y.settings:{},P=Rr.filter(Q=>typeof R[Q]=="string").length,G=Rr.filter(Q=>typeof R[Q]=="string").map(Q=>`${fo[Q]?.title||Q}: ${R[Q]}`);return{count:`${P}/12 \uC9C0\uC815`,choices:G.length>0?G.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function F(y){if(!s||!window.confirm(`\u201C${y.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let R=f();if(R)try{let P=await s("exec-preset-delete",{expected_revision:R.revision,id:y.id});m(P),P&&P.conflict&&J("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{J("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function se(y=!1){if(!s||!a)return;let R=f();if(!R)return;let P=y||a.id===null,G={expected_revision:R.revision,...P?{}:{id:a.id},name:a.name,settings:{...a.settings}};try{let Q=await s(P?"exec-preset-create":"exec-preset-update",G);if(m(Q),Q&&Q.conflict){l=!0,ye();return}if(Q&&Q.applied){a=null,l=!1,ye();return}J("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{J("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function be(y){return i`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${mo(y.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${y.key}
        ?disabled=${y.disabled}
        @change=${R=>{if(!a)return;let P=R.target.value;P?a.settings[y.key]=P:delete a.settings[y.key],(y.key==="impl_runtime"||y.key==="impl_model"||y.key==="impl_effort"||y.key==="orchestration_model")&&S(),l=!1,ye()}}
      >
        ${is(y.groups,y.selected,_o[y.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function le(){if(!a)return"";let y=xe=>typeof a?.settings[xe]=="string"?a.settings[xe]:"",R=Wr({selectedOf:y,effectiveOf:y,runner_catalog:A(),controller_runtime:D()}),P=hn.flatMap(xe=>xe.keys).filter(xe=>typeof a?.settings[xe]=="string").length,G=xe=>{let Le=R.find(We=>We.key===xe);return Le?be(Le):""},Q=f(),Re=a.id!==null&&Q!==null&&!Q.presets.some(xe=>xe.id===a?.id);return i`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${a.name}
          data-preset-name
          @input=${xe=>{a&&(a.name=xe.target.value,l=!1)}}
        />
      </label>
      ${l?i`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${Re?i`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      <section class="exec-preset-editor__core" data-preset-core>
        ${po.map(G)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${P}개 변경됨</summary>
        ${hn.map(xe=>i`<section
              class="exec-preset-editor__group"
              data-preset-group=${xe.id}
            >
              <h4>${xe.label}</h4>
              ${xe.keys.map(G)}
            </section>`)}
      </details>
      <div class="exec-preset-editor__actions">
        ${Re?i`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{se(!0)}}
            >
              새 프리셋으로 저장
            </button>`:i`<button
              type="button"
              data-preset-save
              @click=${()=>{se(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{a=null,l=!1,ye()}}
        >
          취소
        </button>
      </div>
    </div>`}function me(){let y=f(),R=y?y.presets.filter(Q=>Q?.migration_pending!==!0):[],P=E()||"",G=L(P);return i`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${K}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${y===null?i`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:R.length===0?i`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:R.map(Q=>{let Re=H(Q),xe=L(Q.id),Le=Q.id===P,We=xe.missing?"\uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":xe.incompatible?"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"",st=typeof Q.reference_count=="number",et=st?Q.reference_count:null,ut=Array.isArray(Q.reference_summary)?Q.reference_summary.map($t=>$t?.display_name||$t?.workspace_key).filter(Boolean).join(", "):"";return i`<article
                class="exec-preset-card"
                data-preset-id=${Q.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${Q.name}</strong>
                  ${Le?i`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`:""}
                  <span>${Re.count}</span>
                  <span data-preset-references=${Q.id}
                    >${st?`\uCC38\uC870 ${et}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${xe.incompatible?i`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Re.choices}</small>
                  ${ut?i`<small data-preset-impact=${Q.id}
                        >업데이트 영향: ${ut}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  ${Le?i`<button
                        type="button"
                        data-workspace-preset-release=${Q.id}
                        @click=${()=>{j("")}}
                      >
                        기본 해제
                      </button>`:i`<button
                        type="button"
                        data-workspace-preset-assign=${Q.id}
                        ?disabled=${!xe.viable}
                        title=${We}
                        @click=${()=>{j(Q.id)}}
                      >
                        기본으로
                      </button>`}
                  <button
                    type="button"
                    data-preset-edit=${Q.id}
                    @click=${()=>x(Q)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${Q.id}
                    ?disabled=${et===null||et>0||Q.reference_scan_complete===!1}
                    title=${et===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":et>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Q.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{F(Q)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${y!==null&&P&&G.missing?i`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${P} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${P}
                @click=${()=>{j("")}}
              >
                기본 해제
              </button>
            </div>
          </article>`:""}
      ${le()}
    </section>`}function Ie(){let y=c().workspace_info;return y&&typeof y=="object"?y:{}}function Ue(y,R){return i`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${y}"
      >${R}</span
    >`}let ze=!1,Pe=!1,De=!1,_e=null;async function ge(){if(s){Pe=!0,De=!1,ye();try{let y=await Promise.resolve(s("get-worker-system-prompt",{}));!y||typeof y!="object"||Array.isArray(y)?De=!0:_e=y}catch{De=!0}finally{Pe=!1,ye()}}}function ve(){if(ze=!ze,ze&&!_e){ge();return}ye()}function fe(){return i`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${ze?"true":"false"}
          @click=${ve}
        >
          ${ze?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${ze?Y():""}
    </section>`}function Y(){let y=zr({loading:Pe,error:De});if(y)return y;if(!_e)return"";let R=Array.isArray(_e.variants)?_e.variants:[];return i`<div class="exec-defaults__sp-body">
      ${_e.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${_e.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${R.map(P=>i`<div class="exec-defaults__sp-variant" data-variant=${P.key}>
            <div class="exec-defaults__sp-cond">${P.condition}</div>
            ${or(P.label,P.system_prompt)}
          </div>`)}
    </div>`}function Z(y){if(typeof y!="number"||!Number.isFinite(y))return"";let R=y/6e4;return Number.isInteger(R)?`timeout ${R}\uBD84`:`timeout ${Math.round(y/1e3)}\uCD08`}function Ae(y){let R=Z(y);return R?Ue("config",R):""}function ue(y){let R=typeof y.base_sha=="string"?y.base_sha:"",P=`${y.source_path||"repo-ops/config.toml"} @ ${y.base_ref||"?"}${R?`@${R.slice(0,7)}`:""}`;return i`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">
        저장소 작업 선언
        <span class="exec-defaults__vd-src">${P}</span>
      </p>
      <div class="exec-defaults__lane" data-lane="verify">
        <span class="exec-defaults__lane-k">머지 전 검증</span>
        <span class="exec-defaults__lane-v"
          >${y.verify?i`<code class="exec-defaults__vd-cmd"
                  >${y.verify.script}</code
                >${Ae(y.verify.timeout_ms)}`:i`선언 없음${Ue("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${y.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="exec-defaults__lane" data-lane="deploy">
        <span class="exec-defaults__lane-k">머지 후 배포</span>
        <span class="exec-defaults__lane-v"
          >${y.deploy?i`<code class="exec-defaults__vd-cmd"
                  >${y.deploy.script}</code
                >${Ae(y.deploy.timeout_ms)}`:i`선언 없음${Ue("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${y.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function pe(y){let R=y.repo_ops&&typeof y.repo_ops=="object"?y.repo_ops:null;return R&&(R.status==="resolved"||R.status==="absent")?ue(R):R&&(R.status==="pending"||R.status==="error")?i`<section class="exec-defaults__vd" data-seam="repo-ops">
        <p class="exec-defaults__vd-title">
          저장소 작업 선언
          <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
        </p>
        <div
          class="exec-defaults__vd-line exec-defaults__vd-absent"
          data-seam="repo-ops-status"
        >
          ${R.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${R.error_code?i` — <code>${R.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">저장소 작업 선언</p>
      <div class="exec-defaults__vd-line exec-defaults__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function I(y){if(!s)return;let R=await s("worker-auto-repair-toggle",{on:y,expected_revision:u()});if(b(R),R&&R.conflict){let P=await s("worker-auto-repair-toggle",{on:y,expected_revision:u()});b(P)}ye()}let C={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function ie(y,R,P){return i`<div class="exec-defaults__policy-group" data-policy=${P}>
      <div class="exec-defaults__policy-label">${y}</div>
      <ul class="exec-defaults__policy-list">
        ${R.map(G=>i`<li data-token=${G}>
              ${C[G]||G}
            </li>`)}
      </ul>
    </div>`}function Be(y){return i`<div
      class="exec-defaults__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="exec-defaults__policy-label">해결 사다리</div>
      <ol class="exec-defaults__policy-list">
        ${y.map(R=>{let P=[C[R.trigger]||R.trigger];return Number.isInteger(R.attempts_per_operation_attempt)?P.push(`operation\uB2F9 ${R.attempts_per_operation_attempt}\uD68C`):Number.isInteger(R.attempts)?P.push(`${C[R.budget]||R.budget} ${R.attempts}\uD68C`):Number.isInteger(R.sessions_per_user_action)&&P.push(`${R.sessions_per_user_action}\uD68C`,C[R.user_actions]||R.user_actions),R.applies_when&&P.push(C[R.applies_when]||R.applies_when),i`<li data-token=${R.id}>
            <strong>${C[R.id]||R.id}</strong>
            <span>${P.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function Ce(){let y=c(),R=y.auto_repair!==!1,P=y.repo_operation_policy&&typeof y.repo_operation_policy=="object"?y.repo_operation_policy:null,G=Array.isArray(y.repo_operations)?y.repo_operations:[],Q=G.find(We=>We.state==="repairing"),Re=G.filter(We=>We.state==="failed"||We.state==="repairing"),xe=Re.length?Math.min(...Re.map(We=>typeof We.repair?.remaining=="number"?We.repair.remaining:0)):P?.auto_repair?.resolution_ladder?.find(We=>We.id==="auto_repair_session")?.attempts??1,Le=Array.isArray(P?.auto_repair?.resolution_ladder)?P.auto_repair.resolution_ladder:[];return i`<section class="exec-defaults__repair" data-seam="auto-repair">
      <p class="exec-defaults__vd-title">
        자동 해결
        <span class="exec-defaults__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="exec-defaults__repair-toggle">
        <input
          type="checkbox"
          class="exec-defaults__repair-input"
          .checked=${R}
          @change=${We=>{I(We.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="exec-defaults__repair-state">
        <span class="exec-defaults__repair-value" data-seam="auto-repair-value"
          >${R?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="exec-defaults__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${xe}회</span
        >
        <span
          class="exec-defaults__repair-session"
          data-seam="auto-repair-session"
          >${Q?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${Q.repair?.owner_bead||Q.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${P?i`<details class="exec-defaults__policy" data-seam="policy-lists">
            <summary>
              Worker 자동 처리 기준
              <span class="exec-defaults__policy-count"
                >자동 ${(P.worker_automatic||[]).length} · 해결 사다리
                ${Le.length} · 금지
                ${(P.never_automatic||[]).length}</span
              >
            </summary>
            ${ie("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",P.worker_automatic||[],"worker-automatic")}
            ${P.supported===!1||P.schema_version!==2?i`<div
                  class="exec-defaults__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${P.schema_version})`}
                </div>`:Be(Le)}
            ${ie("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",P.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}function ye(){qe(i`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${B}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${me()} ${pe(Ie())}
            ${Ce()} ${fe()}
          </div>
        </div>
      `,o)}let $e=!1,Ze=()=>{$e=!1},Fe=y=>{y.target===y.currentTarget&&B()};o.addEventListener("close",Ze),o.addEventListener("cancel",Ze),o.addEventListener("click",Fe);let Qe=null;r&&r.subscribe&&(Qe=r.subscribe(()=>{$e&&ye()}));let O=null;n&&n.subscribe&&(O=n.subscribe(()=>{$e&&ye()}));function W(){$e||($e=!0,ye(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function B(){$e&&($e=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:W,close:B,destroy(){$e=!1,o.removeEventListener("close",Ze),o.removeEventListener("cancel",Ze),o.removeEventListener("click",Fe),Qe&&(Qe(),Qe=null),O&&(O(),O=null),o.remove()}}}function ds(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function vo(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function us(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Pp(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:ds(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function dl(e,t){let r=Pp(e,t);return r?i`<button
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
            title=${r.deploy.at?pt(r.deploy.at):""}
            >${us(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${vo(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Gr(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${pt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${pt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Fp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function bn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ps(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Vt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,m)=>(f.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?Fp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:u}}function ir(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}function yo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=gt(e.usage),s=qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action,l=e.lane==="done"&&!a,c=l?Tt(e.done_at):"",u=e.selectable?i`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",f=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",m=e.worker_serial===!0?i`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?i`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",b=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",A=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,$=i`<span class="worker-mini__title">${e.title}</span>`,E=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",j=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",x=r.map(me=>me===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${me}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${me===e.completion_badge&&e.completion_title||""}
          >${me}</span
        >`),K=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",te=n.length>0?n.map(me=>i`<span class="worker-usage" title=${me.tooltip}
              >${me.label}</span
            >`):s?i`<span class="worker-usage" title=${jr(e.usage)}
            >${s}</span
          >`:"",L=o?i`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",D=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",S=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",H=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",F=e.discard,se=F?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${F?.attempt_id||""}
          data-operation-id=${F?.operation?.operation_id||""}
          data-discard-mode=${F?.confirmation||"unmerged"}
          ?disabled=${F?!F.enabled:e.discard_enabled===!1}
          title=${F?F.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${F?.label||"\uD3D0\uAE30"}
        </button>`:"",be=e.revise_action?i`<button
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
        </button>`:"",le=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||F?.operation||e.revise_action);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${b}${A}${$}</div>
          <div class="worker-mini__row2">
            ${te}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${pt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${x}${L}
            <span class="worker-mini__actions"
              >${D}${S}${H}${se}</span
            >
            ${Gr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${u}${f}${b}${A}${E}${j}${x}${m}${K}
            </div>
            <div class="worker-mini__body">${$}</div>
            ${le?i`<div class="worker-mini__foot">
                  ${te}${L}
                  <span class="worker-mini__actions"
                    >${D}${S}${H}${se}${be}</span
                  >
                  ${ir(e)}
                </div>`:""}
            ${Gr(e)}`:i`<div class="worker-mini__line">
              ${u}${f}${b}${A}${$}${E}${j}${x}${m}${K}${te}${L}${D}${S}${H}${se}
            </div>
            ${ir(e)} ${Gr(e)}`}
  </div>`}function qp(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
    ${r?jn(r,e.status):""}
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
    ${Gr(e)}
  </div>`}function Kt(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?qp(n):yo(n))}
          </div>`}
  </section>`}var ul=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],vn=ul.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function wo(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=ul.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function pl(e){let t=vn.findIndex(r=>r.step===e);return vn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Lr(e){let t=vn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Bp(e){let t=vn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:vn.length}}function fs(e){let t=Bp(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var fl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},_l={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function ml(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ko(e){for(let t of ml(e))if(Object.hasOwn(fl,t))return fl[t];return null}function $o(e){let t=null;for(let r of ml(e))Object.hasOwn(_l,r)&&(t=_l[r]);return t}function _s(e){let t=ko(e),r=$o(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function gl(e,t){let r=ko(e)??ko(t),n=$o(t)??$o(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var hl=160;function Up(e){return e.length>hl?`${e.slice(0,hl)}\u2026`:e}function jp(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Up(e.command)}</code>`:""}
  </div>`}function zp(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function xo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function bl(e){let t=e.failure?_s(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${jp(e.failure.cause_detail)}
          ${zp(e.failure.reason)}
          ${ir({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Hp(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?xo(t-e.started_at):"\u2014",a=Yt(e),l=pr(e),c=gt(e.usage),u=qt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,b=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?i`<button
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
            ${A}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||c.length>0||u||f||m?i`<div class="rtile__meta">
          ${f?i`<span class="worker-mini__badge">${f}</span>`:""}
          ${m?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map($=>i`<span class="worker-usage" title=${$.tooltip}
                    >${$.label}</span
                  >`):u?i`<span
                  class="worker-usage"
                  title=${jr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${Gr(e)} ${ir(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function So(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Hp(s,t,r))}
  </div>`}function hr(e){return i`<svg
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
  </svg>`}function Ao(){return hr(Jt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function To(){return hr(Jt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function vl(){return hr(Jt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function yl(){return hr(Jt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function wl(){return hr(Jt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function kl(){return hr(Jt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function $l(){return hr(Jt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function xl(){return hr(Jt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var yn=1,Wp=6e4,Gp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Yp=new Set(["auto_merge","merged","merge","done"]),Sl={running:3,paused:2,failed:1};function Vp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Kp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),b=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let m=Sl[u.run_state],b=Sl[l];if(m>b||m===b&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:It(e,a.bead_id),can_pause:l==="running"&&f,can_resume:l!=="running"&&f&&!n.has(a.attempt_id)})}return o}function Al(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Et(e){return e&&typeof e=="object"?e:{}}function Eo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&a.set(x.root_dir,x);let l=[],c=[],u=[],f=[],m=[],b=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let K=x.root_dir,te=x.name||K,L=a.get(K),D=L&&typeof L.revision=="number"?L.revision:typeof x.revision=="number"?x.revision:0,S=Et(x.attempts),H=Et(x.bead_titles),F=Et(x.pr_observations),se=Et(x.admission),be=Et(x.revise_parked),le=Et(x.merge_queue_state),me=Et(x.cleanup_failed),Ie=Et(x.discard_operations),Ue=Array.isArray(x.merge_queue)?x.merge_queue:[],ze=new Set(Ue.filter(Y=>Y&&typeof Y.bead_id=="string").map(Y=>Y.bead_id)),Pe=new Map(Ue.filter(Y=>Y&&typeof Y.bead_id=="string").map(Y=>[Y.bead_id,Y])),De=Array.isArray(x.queue)?x.queue:[],_e=Array.isArray(x.done)?x.done:[],ge=new Map;for(let Y of _e)Y&&typeof Y.bead_id=="string"&&typeof Y.added_at=="number"&&ge.set(Y.bead_id,Y.added_at);let ve=Y=>({id:Y,title:H[Y]||Y,root_dir:K,workspace_name:te,expected_revision:D,draggable:!1}),fe=new Set;for(let[Y,Z]of Kp(S,ge))fe.add(Y),c.push({...ve(Y),lane:"running",attempt_id:Z.attempt_id,run_state:Z.run_state,can_pause:Z.can_pause,can_resume:Z.can_resume,started_at:Z.started_at,last_event_at:Z.last_event_at,runner:Z.runner,model:Z.model,effort:Z.effort,speed:Z.speed,resumed_from:Z.resumed_from,continuation_mode:Z.continuation_mode,usage:Z.usage,discard:Vt(Ie,Y,{attempt_id:Z.attempt_id}),badges:Z.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:Z.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:Z.run_state==="failed"});for(let Y of Array.isArray(x.pr_wait)?x.pr_wait:[]){let Z=Y&&Y.bead_id;if(typeof Z!="string"||fe.has(Z))continue;fe.add(Z);let Ae=Et(F[Z]),ue=Et(Ae.pr),pe=Ae.gate?Et(Ae.gate):null,I=ze.has(Z),C=Pe.get(Z)?.continuation_action||null,ie=!!C&&C.continuation===null,Be=le.active===Z,Ce=Y.external===!0,ye=me[Z]||null,$e=!!pe&&pe.base_badge==="\uCDA9\uB3CC",Ze=!!ye&&["child_sweep","branch_cleanup","parent_close"].includes(ye.step)&&!!pe&&pe.tier==="merged",Fe=Ce&&!!ye&&!!pe&&pe.tier==="merged",Qe=!!pe&&["closed_unmerged","review","undecidable"].includes(pe.tier),O=Vt(Ie,Z,{external:Ce,merge_active:Be,merge_queued:I,merged:!!ye||pe?.tier==="merged"}),W=!!O.operation;u.push({...ve(Z),lane:"pr_wait",pr_number:typeof ue.number=="number"?ue.number:null,pr_url:typeof ue.url=="string"?ue.url:void 0,external:Ce,usage:It(S,Z),badges:ie?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ye?[Lr(ye.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Lr(ye.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof pe?.gate_badge=="string"&&pe.gate_badge.length>0?[pe.gate_badge]:[],alert:!!ye||Qe,reason:ye?fs(ye.step):"PR \uB300\uAE30",merge_action:!I||ie,merge_enabled:!W&&(ie||pe?.enabled===!0||$e||Ze||Fe),merge_label:ie?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Fe||Ze?"\uC815\uB9AC \uC7AC\uAC1C":$e&&!Ze?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ie?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":W?O.error?`\uD3D0\uAE30 \uC2E4\uD328: ${O.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${O.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ze?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":$e?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?.enabled===!0?`\uBA38\uC9C0 (${pe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${pe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:I&&!ie,cancel_enabled:!Be,continuation_mismatch:C?.mismatch||null,discard:O,discard_action:O.action,discard_enabled:O.enabled,discard_title:O.title})}for(let Y=0;Y<De.length;Y++){let Z=De[Y],Ae=Z&&Z.bead_id;if(typeof Ae!="string"||fe.has(Ae))continue;fe.add(Ae);let ue=be[Ae],pe=Vt(Ie,Ae),I=pe.operation?pe:null,C={...ve(Ae),lane:"queue",draggable:!I,discard:I||void 0,reason:Al(se,Ae),queue_position:Y+1,queue_index:Y,queue_length:De.length,badges:ue?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ue,revise_action:!!ue,revise_enabled:!!ue&&!I,revise_title:ue?ue.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ue.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(C);let ie=b.get(K);ie?ie.push(C):b.set(K,[C])}for(let Y of Array.isArray(x.runnable)?x.runnable:[]){let Z=Y&&Y.bead_id;typeof Z!="string"||fe.has(Z)||(fe.add(Z),l.push({...ve(Z),title:Y.title||H[Z]||Z,lane:"runnable",draggable:!0,reason:Al(se,Z),created_at:Y.created_at??void 0,updated_at:Y.updated_at??void 0,labels:Array.isArray(Y.labels)?Y.labels:[],spec_reviewer:typeof Y.spec_reviewer=="string"?Y.spec_reviewer:void 0,plan_state:Y.plan_state==="approved"||Y.plan_state==="authored"?Y.plan_state:"none",workflow:Y.route?{route:Y.route,chips:{route:Y.route}}:null,place_index:De.length}))}for(let Y of _e){let Z=Y&&Y.bead_id;if(typeof Z!="string"||fe.has(Z)||(fe.add(Z),o!==void 0&&typeof Y.added_at=="number"&&Y.added_at<o))continue;let Ae=Vp(S,Z);m.push({...ve(Z),lane:"done",done:!0,usage:It(S,Z),done_at:typeof Y.added_at=="number"?Y.added_at:void 0,done_kind:Ae&&typeof Ae.done_kind=="string"?Ae.done_kind:null})}}let A=new Map;s.forEach((x,K)=>{x&&typeof x.root_dir=="string"&&A.set(x.root_dir,K)});let $=r&&r.running_sort==="repo"?"repo":"started";c.sort((x,K)=>{if($==="repo"){let D=A.get(x.root_dir)??Number.MAX_SAFE_INTEGER,S=A.get(K.root_dir)??Number.MAX_SAFE_INTEGER;if(D!==S)return D-S}let te=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,L=typeof K.started_at=="number"&&Number.isFinite(K.started_at)?K.started_at:null;return te!==null&&L!==null&&te!==L?te-L:te===null&&L!==null?1:te!==null&&L===null?-1:x.id.localeCompare(K.id)}),m.sort((x,K)=>(K.done_at??0)-(x.done_at??0));let E=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,exec_defaults:x&&x.exec_defaults,default_exec_preset_id:x&&x.default_exec_preset_id,runner_catalog:x&&x.runner_catalog})),j=[];for(let x of E)!x||typeof x.root_dir!="string"||j.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=yn?x.slots:yn,revision:typeof x.revision=="number"?x.revision:0,exec_defaults:Et(x.exec_defaults),default_exec_preset_id:typeof x.default_exec_preset_id=="string"?x.default_exec_preset_id:null,runner_catalog:Et(x.runner_catalog),items:b.get(x.root_dir)||[]});return{runnable:l,queue:f,queue_groups:j,running:c,pr_wait:u,done:m,automation:{total:j.length,both_on:j.filter(x=>x.auto_advance&&x.auto_merge).length}}}function Zp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Wp;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${pt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Tt(e,t)}</span
        >`}</span
  >`}function wn(e){return i`<div class="mon-c__title">${e.title}</div>`}function kn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function ms(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Co(e){let t=gt(e.usage),r=qt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${jr(e.usage)}
        >${r}</span
      >`:""}function Ro(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Xp(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${To()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Ao()}
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
          ${yl()}
        </button>`:""}
  </span>`}function Qp(e,t){let r=typeof e.started_at=="number"?xo(t-e.started_at):"";return i`${wn(e)}
    <div class="mon-c__meta">
      ${Ro(e)}${Zp(e.last_event_at,t)}${kn(e)}${ms(e)}
      ${Yt(e)?i`<span class="mon-c__model">${Yt(e)}</span>`:""}
      ${pr(e)?i`<span
            class="rtile__resumed"
            title=${pr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Co(e)}${Xp(e)}${ir(e)}
    </div>`}function Jp(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=Tt(e.updated_at);return i`${wn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${kn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Un(e.labels,null).map(c=>i`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${ms(e)}
      ${l?i`<span title=${`\uC218\uC815 ${pt(e.updated_at)}`}
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
    </div>`}function ef(e){let t=!!e.discard?.operation;return i`${wn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${kn(e)}
      ${Ro(e)}
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
    ${ir(e)}
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
        </div>`:""}`}function tf(e){let t=!!(qt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return i`${wn(e)}
    <div class="mon-c__meta">
      ${kn(e)}${ms(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Ro(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?i`<div class="mon-c__tail">
          ${Co(e)}
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
          ${ir(e)}
        </div>`:""}`}function rf(e,t){let r=e.done_kind||"",n=r?Gp[r]||r:"",s=Tt(e.done_at,t);return i`${wn(e)}
    <div class="mon-c__meta">
      ${kn(e)}${ms(e)}
      ${n?i`<span
            class="mon-live__kind${Yp.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Co(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${pt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Tl(e,t){return e.lane==="running"?Qp(e,t):e.lane==="runnable"?Jp(e):e.lane==="queue"?ef(e):e.lane==="pr_wait"?tf(e):rf(e,t)}function El(e){let t=String(e.revision);return i`<header
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
        ${e.auto_advance?To():Ao()}
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
        ${wl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${kl()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${yn}
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
        ${$l()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Cl(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Gt.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?vl():xl()}
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
        ${Gt.map(l=>i`<option
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
  </div>`}function Rl(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Il(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return gt(Wn(t));let r={};for(let l of rr)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let u=!1;for(let f of rr){let m=c[f];typeof m=="number"&&Number.isFinite(m)&&(r[f]+=m,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?qt(r):null}var Ol="bdui.monitor.done-range",Dl="bdui.monitor.running_sort";function nf(){try{let e=window.localStorage.getItem(Ol);return Rt(e)?e:At}catch{return At}}function sf(e){try{window.localStorage.setItem(Ol,e)}catch{}}function of(){try{return window.localStorage.getItem(Dl)==="repo"?"repo":"started"}catch{return"started"}}function af(e){try{window.localStorage.setItem(Dl,e)}catch{}}var Ml="tab:monitor:pipeline",lf=1e3,cf=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Ll(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${Tl(e,t)}
  </div>`}function Nl(e,t){let r=nt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,l=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(O=>typeof globalThis.confirm!="function"||globalThis.confirm(O)),m=nf(),b=of();function A(){let O=Gt.find(W=>W.value===m);return O?O.label:""}let $=document.createElement("div");$.className="mon",e.appendChild($);let E=Eo(null,null),j=null,x=new Map,K=new Set;function te(O){return E.queue_groups.find(W=>W.root_dir===O)||null}let D=cs(e,{queueStore:{get(){if(!j)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let O=x.get(j);if(O)return O;let W=te(j),B=s&&s.get?s.get():null,y=(Array.isArray(B)?B:[]).find(R=>R&&R.root_dir===j);return{revision:W?W.revision:0,exec_defaults:W?W.exec_defaults:{},default_exec_preset_id:W?W.default_exec_preset_id:null,runner_catalog:W?W.runner_catalog:null,workspace_info:y?y.workspace_info:void 0}},set(O){j&&x.set(j,O);for(let W of Array.from(K))W()},subscribe(O){return K.add(O),()=>K.delete(O)}},presetStore:a,transport:o?(O,W)=>o(O,O==="worker-queue-set-default-exec-preset"||O==="get-worker-system-prompt"?{...W||{},root_dir:j}:W):void 0}),S=null,H=null;async function F(O,W,B,y,R=!0){if(!o||!B)return null;let P=await o(O,{...W,root_dir:B,expected_revision:y});if(P&&P.conflict&&R){P.queue&&x.set(B,P.queue);let G=P.queue&&typeof P.queue.revision=="number"?P.queue.revision:y;P=await o(O,{...W,root_dir:B,expected_revision:G})}return P&&P.queue&&B&&x.set(B,P.queue),P}function se(O,W){let B=x.get(O),y=s&&s.get?s.get():null,R=(Array.isArray(y)?y:[]).find(G=>G?.root_dir===O);return(B||R)?.merge_queue?.find(G=>G.bead_id===W)?.continuation_action}async function be(O,W,B,y){let R=await F(O,W,B,y),P=x.get(B)?.revision??R?.queue?.revision??y;return tr(R,(G,Q)=>F(O,{...W,continuation:G,decision_token:Q},B,P,!1),{refresh:G=>F(O,W,B,G?.queue?.revision??x.get(B)?.revision??P,!1)})}async function le(O,W,B,y){let R=await tr({continuation_mismatch:y},(G,Q)=>F("worker-merge-queue-add",{bead_id:W,continuation:G,decision_token:Q},O,B,!1)),P=R?.queue?.merge_queue?.find(G=>G.bead_id===W)?.continuation_action;R?.applied!==!0&&P?.continuation===null&&P.mismatch&&await le(O,W,R.queue.revision,P.mismatch)}async function me(O,W,B){let y=await F("worker-discard",O,W,B);if(y&&y.discarded===!0){J(ps(y),"success",5e3);return}if(y&&y.reason){J(`\uD3D0\uAE30 \uC2E4\uD328: ${y.reason}`,"error");return}if(y&&y.accepted&&y.pending==="merged_revert"){J("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(y&&y.accepted){J(`\uD3D0\uAE30 \uC9C4\uD589: ${y.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}y&&!y.conflict&&J("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ie(O,W,B){return!o||!B?null:await o(O,{...W,root_dir:B})}async function Ue(O){if(!o||!O&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let W=await o("monitor-auto-toggle",{on:O}),B=W&&Array.isArray(W.failed)?W.failed:[];B.length>0&&J(`\uC790\uB3D9\uD654 ${O?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${B.map(y=>y.root_dir).join(", ")}`,"error",3200)}async function ze(){let O=new Map;for(let W of E.pr_wait)O.has(W.root_dir)||O.set(W.root_dir,W.expected_revision);for(let[W,B]of O)await F("worker-merge-queue-add-all",{},W,B)}let Pe=null,De=!1,_e=null;function ge(){_e!==null&&clearTimeout(_e),_e=setTimeout(()=>{_e=null,De=!1},0)}function ve(O){let W=O.target;return typeof W?.closest=="function"?W.closest(".mon-group"):null}function fe(O){let W=ve(O);return!W||!Pe?null:(W.getAttribute("data-root-dir")||"")===Pe.root_dir?W:null}function Y(){for(let O of Array.from($.querySelectorAll(".mon-group--drag-over")))O.classList.remove("mon-group--drag-over")}function Z(O){let W=O.target,B=typeof W?.closest=="function"?W.closest('.mon-card[draggable="true"]'):null;if(B){Pe={bead_id:B.getAttribute("data-issue-id")||"",lane:B.getAttribute("data-lane")||"",root_dir:B.getAttribute("data-root-dir")||"",revision:Number(B.getAttribute("data-revision")||0)||0,queue_index:Number(B.getAttribute("data-queue-index")),queue_length:Number(B.getAttribute("data-queue-length")),place_index:Number(B.getAttribute("data-place-index"))},De=!0;try{O.dataTransfer?.setData("text/plain",Pe.bead_id),O.dataTransfer&&(O.dataTransfer.effectAllowed="move")}catch{}}}function Ae(O){let W=fe(O);W&&(O.preventDefault(),O.dataTransfer&&(O.dataTransfer.dropEffect="move"),W.classList.add("mon-group--drag-over"))}function ue(O){ve(O)?.classList.remove("mon-group--drag-over")}function pe(){Pe=null,Y(),ge()}function I(O){let W=fe(O),B=Pe;if(Pe=null,Y(),!W||!B||!B.bead_id)return;O.preventDefault();let y=O.target,R=typeof y?.closest=="function"?y.closest('.mon-card[data-lane="queue"]'):null,P=R&&W.contains(R)?Number(R.getAttribute("data-queue-index")):NaN;if(B.lane==="runnable"){let Re=Number.isFinite(P)?P:B.place_index;if(!Number.isFinite(Re))return;F("worker-queue-place",{bead_id:B.bead_id,index:Re},B.root_dir,B.revision);return}if(B.lane!=="queue"||R&&R.getAttribute("data-issue-id")===B.bead_id)return;let G=B.queue_index,Q=Number.isFinite(P)?G>P?P:P-1:B.queue_length-1;!Number.isFinite(Q)||Q<0||Q===G||F("worker-queue-reorder",{bead_id:B.bead_id,to_index:Q},B.root_dir,B.revision)}function C(O){let W={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done};return i`${Cl({automation:E.automation,counts:{running:E.running.length,queue:E.queue.length,pr_wait:E.pr_wait.length},running_sort:b,done_range:m,token_total:Il(E.done),token_tooltip:Rl(A())})}
      <div class="worker-lanes mon-lanes">
        ${cf.map(B=>{let y=W[B.lane],R=B.lane==="queue"?E.queue_groups.length>0?i`${E.queue_groups.map(P=>i`<div
                        class="mon-group"
                        data-root-dir=${P.root_dir}
                      >
                        ${El(P)}
                        <div class="mon-group__list">
                          ${P.items.map(G=>Ll(G,O))}
                        </div>
                      </div>`)}`:void 0:y.length>0?i`${y.map(P=>Ll(P,O))}`:void 0;return Kt({id:`monitor-${B.lane}`,lane:B.pane,title:B.lane==="done"?`\uC644\uB8CC\xB7${A()}`:B.title,items:y,empty:B.empty,body:R,live:B.lane==="running"&&y.length>0,header_control:B.lane==="pr_wait"&&y.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ie(){let O=s&&s.get?s.get():null,W=s&&s.getWorkspacesState?s.getWorkspacesState():[],B=u();E=Eo(O,W,{done_since:xr(m,B),running_sort:b}),qe(C(B),$)}function Be(O,W){let B=l?l():void 0;if(!W||!B||W===B||!c){n(O);return}c(W).then(()=>{n(O)}).catch(y=>{r("workspace switch for %s failed: %o",W,y)})}function Ce(O){return{root_dir:O.getAttribute("data-root-dir")||"",revision:Number(O.getAttribute("data-revision")||0)||0}}function ye(O,W){let{root_dir:B,revision:y}=Ce(O),R=O.getAttribute("data-issue-id")||"",P=W.dataset.attemptId||O.getAttribute("data-attempt-id")||"",G=W.classList;if(G.contains("worker-card__place")){F("worker-queue-place",{bead_id:R,index:Number(O.getAttribute("data-place-index")||0)||0},B,y);return}if(G.contains("mon-op--up")||G.contains("mon-op--down")){let Q=Number(O.getAttribute("data-queue-index")||0)||0,Re=G.contains("mon-op--up")?Q-1:Q+1;if(Re<0)return;F("worker-queue-reorder",{bead_id:R,to_index:Re},B,y);return}if(G.contains("mon-op--remove")){F("worker-queue-remove",{bead_id:R},B,y);return}if(G.contains("mon-op--pause")){Ie("worker-attempt-pause",{attempt_id:P},B);return}if(G.contains("mon-op--discard")){if(!f(bn(R,"unmerged")))return;me({bead_id:R,...P?{attempt_id:P}:{},...W.dataset.operationId?{operation_id:W.dataset.operationId}:{}},B,y);return}if(G.contains("mon-op--resume")){be("worker-attempt-resume",{attempt_id:P},B,y);return}if(G.contains("mon-op--dismiss")){F("worker-attempt-dismiss",{attempt_id:P},B,y);return}if(G.contains("worker-mini__merge")){let Q=se(B,R);Q?.mismatch&&Q.continuation===null?le(B,R,y,Q.mismatch):F("worker-merge-queue-add",{bead_id:R},B,y);return}if(G.contains("worker-mini__merge-cancel")){F("worker-merge-queue-remove",{bead_id:R},B,y);return}if(G.contains("worker-mini__discard")){let Q=W.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(bn(R,Q)))return;me({bead_id:R,...P?{attempt_id:P}:{},...W.dataset.operationId?{operation_id:W.dataset.operationId}:{}},B,y);return}if(G.contains("worker-mini__revise-fix")){be("worker-revise-fix",{bead_id:R},B,y);return}G.contains("worker-mini__revise-approve")&&F("worker-revise-approve",{bead_id:R},B,y)}function $e(O){let W=De;De=!1;let B=O.target;if(!B||typeof B.closest!="function"||B.closest("dialog")||B.closest("a"))return;let y=B.closest(".mon-running-sort");if(y){O.preventDefault(),b=y.getAttribute("data-sort")==="repo"?"repo":"started",af(b),ie();return}let R=B.closest(".mon-auto-all");if(R){O.preventDefault(),Ue(R.getAttribute("data-on")==="true");return}if(B.closest(".mon-merge-all")){O.preventDefault(),ze();return}let G=B.closest(".mon-ctl--advance");if(G){O.preventDefault();let{root_dir:st,revision:et}=Ce(G);F("worker-automation-toggle",{on:G.getAttribute("data-on")==="true"},st,et);return}let Q=B.closest(".mon-ctl--merge-auto");if(Q){O.preventDefault();let{root_dir:st,revision:et}=Ce(Q);F("worker-merge-auto-toggle",{on:Q.getAttribute("data-on")==="true"},st,et);return}let Re=B.closest(".mon-ctl--exec");if(Re){O.preventDefault(),j=Re.getAttribute("data-root-dir")||null,x.delete(j||""),D.open();return}let xe=B.closest(".mon-card");if(!xe)return;let Le=B.closest("button");if(Le){O.preventDefault(),ye(xe,Le);return}let We=xe.getAttribute("data-issue-id");We&&!W&&(O.preventDefault(),Be(We,xe.getAttribute("data-root-dir")||""))}function Ze(O){let W=O.target;if(!W||typeof W.closest!="function")return;let B=W.closest(".mon-done-range");if(B){m=Rt(B.value)?B.value:At,sf(m),ie();return}let y=W.closest(".mon-slots__input");if(!y)return;let{root_dir:R,revision:P}=Ce(y),G=Number(y.value);if(!Number.isFinite(G))return;let Q=Math.max(yn,Math.floor(G));F("worker-queue-set-slots",{slots:Q},R,P)}e.addEventListener("click",$e),e.addEventListener("change",Ze),e.addEventListener("dragstart",Z),e.addEventListener("dragover",Ae),e.addEventListener("dragleave",ue),e.addEventListener("drop",I),e.addEventListener("dragend",pe),s&&typeof s.subscribe=="function"&&(S=s.subscribe(()=>{try{x.clear(),ie();for(let O of Array.from(K))O()}catch{}}));function Fe(){H!==null&&(clearInterval(H),H=null)}function Qe(){_e!==null&&(clearTimeout(_e),_e=null)}return{load(){r("load"),ie(),H===null&&(H=setInterval(()=>{try{ie()}catch{}},lf))},pause(){Fe()},clear(){Fe(),Qe(),S&&(S(),S=null),e.removeEventListener("click",$e),e.removeEventListener("change",Ze),e.removeEventListener("dragstart",Z),e.removeEventListener("dragover",Ae),e.removeEventListener("dragleave",ue),e.removeEventListener("drop",I),e.removeEventListener("dragend",pe),D.destroy(),K.clear(),e.replaceChildren()}}}function Pl(e,t,r){let n=nt("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return i`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${u==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${u==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${u==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function l(){qe(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),qe(i``,e)}}}var Fl=["bug","feature","task","epic","chore"];function ql(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Bl=["Critical","High","Medium","Low","Backlog"];function Ul(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let S of Fl){let H=document.createElement("option");H.value=S,H.textContent=ql(S),o.appendChild(H)}a.replaceChildren();for(let S=0;S<=4;S+=1){let H=document.createElement("option");H.value=String(S);let F=Bl[S]||"Medium";H.textContent=`${S} \u2013 ${F}`,a.appendChild(H)}}A();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function E(D){s.disabled=D,o.disabled=D,a.disabled=D,l.disabled=D,c.disabled=D,f.disabled=D,m.disabled=D,m.textContent=D?"Creating\u2026":"Create"}function j(){u.textContent=""}function x(D){u.textContent=D}function K(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function te(){let D=o.value||"",S=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function L(){j();let D=String(s.value||"").trim();if(D.length===0){x("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){x("Priority must be 0..4"),a.focus();return}let H=String(o.value||""),F=String(c.value||""),se={title:D};H.length>0&&(se.type=H),String(S).length>0&&(se.priority=S),F.length>0&&(se.description=F),E(!0);try{await t("create-issue",se)}catch{E(!1),x("Failed to create issue");return}te(),E(!1),$()}return r.addEventListener("cancel",D=>{D.preventDefault(),$()}),b.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),L())}),n.addEventListener("submit",D=>{D.preventDefault(),L()}),{open(){n.reset(),j(),K();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var df=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function jl(e){return String(e).padStart(2,"0")}function uf(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function pf(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${jl(n.getHours())}:${jl(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${df[n.getMonth()]} ${n.getDate()} ${o}`;return`${uf(r,t)} \xB7 ${l}`}function ff(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var zl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Hl(e){let t=!1,r=null,n=new Map;function s(){qe(i``,e),e.hidden=!0}function o(){let c=zl.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();qe(i`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let m=n.get(f.key),b=typeof m.ageSeconds=="number"&&m.ageSeconds>600,A=b?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${m.windows.map($=>{let E=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,j=Math.min(100,Math.max(0,E)),K=`resets ${pf($.resetsAt,u)}${b?` \xB7 ${A}`:""}`;return i`<span
                class="usage-meter__window ${ff(j)}"
                style=${`--progress: ${j}%`}
                title=${K}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${j}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function l(){let c=await Promise.all(zl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var _f="worker-ineligible";function Io(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Wl(e){return Io(e).includes(_f)}var Lo="worker-serial";function $n(e){return Io(e).includes(Lo)}var mf=20,Gl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Yl={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function gf(e,t,r=mf){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Vl(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function hf(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Kl(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Zl(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function bf(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Yl,n)?Yl[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function vf(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?pt(e.at):""}
      >${us(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Vl(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Gl,t.kind)?Gl[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ds(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${vo(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Vl(e)}"
          >${hf(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Zl(gl(t.failure_kind,n)):""}
      ${bf(t)}
      ${Kl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ds(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function yf(e){let t=e.cleanup,r=Lr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?pt(e.at):""}
      >${us(e.at)||"\u2014"}</span
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
        ${pl(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Zl(_s(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Kl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function wf(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?yf(t):vf(t))}
        </ul>`}
  </section>`}function Xl(e,t={}){let r=null;function n(){qe(r?wf(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:gf(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var kf="tab:worker:ready",$f="tab:worker:blocked",xf="tab:worker:in-progress",Sf="tab:worker:closed",xn=1,Af=new Set(["done","failed","orphaned","stopped","discarded"]);function Ql(e){return gn(e).path.length>0}var tc="beads-ui.worker.candidate-filter",Oo={show_blocked:!1,spec:"all"};function Tf(){try{let e=window.localStorage.getItem(tc);if(!e)return{...Oo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Oo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Oo}}}function Ef(e){try{window.localStorage.setItem(tc,JSON.stringify(e))}catch{}}function Cf(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),u=n(l);c&&u?s.push(l):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Rf=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],rc="bdui.worker.candidate_sort",If=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],gs="spec";function Lf(){try{let e=window.localStorage.getItem(rc);return e==="board"||e==="created"||e==="spec"?e:gs}catch{return gs}}function Of(e){try{window.localStorage.setItem(rc,e)}catch{}}var nc="bdui.worker.done-range";function Df(){try{let e=window.localStorage.getItem(nc);return Rt(e)?e:At}catch{return At}}function Mf(e){try{window.localStorage.setItem(nc,e)}catch{}}var Nf="(max-width: 640px)",sc="beads-ui.worker.lane-collapsed",Sn={queue:!0,done:!0};function Pf(){try{let e=window.localStorage.getItem(sc);if(!e)return{...Sn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Sn}:{queue:typeof t.queue=="boolean"?t.queue:Sn.queue,done:typeof t.done=="boolean"?t.done:Sn.done}}catch{return{...Sn}}}function Ff(e){try{window.localStorage.setItem(sc,JSON.stringify(e))}catch{}}function Jl(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function qf(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Ar):(n.sort(Mn(r)),t==="board"?n:[...n.filter(Ql),...n.filter(s=>!Ql(s))])}function Bf(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Uf(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function jf(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var zf=["closed_unmerged","review","undecidable"],Hf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function Wf(e,t){for(let r of Hf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function ec(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Gf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Yf(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Do(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Vf(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Kf(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,u=!0,f=null,m=null,b=null,A={},$=!1){let E=!!c&&c.position>0,j=!!c?.continuation_action&&c.continuation_action.continuation===null,x=!!c&&c.active===!0,K=c&&c.failure||null,te=r[e]||null,L=te&&te.gate?te.gate:null,D=te&&te.pr?te.pr:null,S=Vf(b),H=Gf(c?c.resolution:null),F=Yf(c?c.head_review:null),se=[];l&&se.push("\uC138\uC158");let be=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":H?H.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,le=Wf(l&&L&&L.tier==="closed_unmerged"?"\uB2EB\uD798":L&&L.gate_badge||"",be?null:o&&o.activity||null);if(be&&se.push(be),F&&se.push(F.badge),le.label&&se.push(le.label),L&&L.base_badge&&L.base_badge!==L.gate_badge&&se.push(L.base_badge),m&&se.push(m),n){let fe=Lr(n.step);se.push(fe?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${fe}`:"\uC815\uB9AC \uBA48\uCDA4")}S&&se.push(S.badge),E&&!x&&se.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),K&&se.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${ec(K)}`),j&&se.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&se.push(`\uC790\uB3D9 \uC81C\uC678: ${ec(f)}`);let me=!!L&&L.base_badge==="\uCDA9\uB3CC",Ie=!!L&&L.enabled===!0,Ue=wo(o&&o.merge_progress?o.merge_progress.step:null),ze=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!L&&L.tier==="merged",Pe=l&&!!n&&!!L&&L.tier==="merged",De=l&&me&&u===!1,_e=Vt(A,e,{external:l,merge_active:x||!!Ue,merge_queued:E,conflict_active:!!a,cleanup_active:!1,merged:!!n||L?.tier==="merged"}),ge=!!_e.operation,ve=!ze&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?fs(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:l,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:S?S.badge:null,completion_title:S?S.title:"",completion_repair_pr_url:S?S.repair_pr_url:"",completion_repair_pr_number:S?S.repair_pr_number:null,badges:se,live_badge:a==="paused"?null:H?.live||a==="running"?be:F?.live?F.badge:le.live?le.label:null,usage:s,alert:!!L&&zf.includes(L.tier)||!!n||!!K||!!(F&&F.alert)||!!(S&&S.alert),merge_action:ve?!1:!E||j,timeline_action:ve,cancel_action:E&&!j,cancel_enabled:!x&&!(S&&S.lock_actions),cancel_title:S&&S.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:_e,discard_action:_e.action,merge_step:Ue,discard_enabled:_e.enabled,discard_title:_e.title,merge_enabled:!Ue&&!a&&!ge&&!(S&&S.lock_actions)&&!De&&!ve&&(Ie||me||ze||Pe),merge_label:j?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ze||Pe?"\uC815\uB9AC \uC7AC\uAC1C":me&&!Ue&&!ze?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ge?_e.error?`\uD3D0\uAE30 \uC2E4\uD328: ${_e.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${_e.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:j?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ue?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Ue.label}`:Pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":De?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ze?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":me?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Ie?`\uBA38\uC9C0 (${L.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:L&&L.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${L&&L.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Mo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:m}=t,b=n?Pn(n,l):null,A=qn({transport:r,uiOrderStore:l}),$=null,E=[],j=Tf(),x=Lf(),K=Rt(f)?f:Df(),te=new Map;function L(){let p=Gt.find(w=>w.value===K);return p?p.label:"\uC624\uB298"}let D=Pf(),S=!1,H=new Set,F=new Set,se=new Set,be=new Set,le="ordinary",me=!1,Ie=new Map,Ue=[],ze=document.createElement("div");ze.className="worker-console";let Pe=document.createElement("div");Pe.className="worker-top";let De=document.createElement("div");De.className="worker-drawer-overlay",De.hidden=!0;let _e=document.createElement("div");_e.className="worker-drawer-overlay__backdrop";let ge=document.createElement("div");ge.className="worker-drawer-host";let ve=document.createElement("div");ve.className="worker-drawer-host",ve.hidden=!0,De.append(_e,ge,ve);let fe=document.createElement("div");fe.className="worker-lanes-host",ze.append(Pe,De,fe),e.appendChild(ze);let Y=null,Z=os(ge,{transport:r,sessionLogStore:a,onClose:()=>{Y=null,De.hidden=!0,re()}}),Ae=Xl(ve,{onClose:()=>{ve.hidden=!0,De.hidden=!0,re()}}),ue=cs(ze,{queueStore:s,presetStore:o,transport:r});function pe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:xn,queue:[],pr_wait:[],done:[]}}function I(){let p=pe();return typeof p.revision=="number"?p.revision:0}function C(p){p&&p.queue&&s&&s.set(p.queue)}function ie(){let p=pe().queue;return Array.isArray(p)?p.length:0}async function Be(p,w){if(!r)return;let M=await r("worker-queue-place",{bead_id:p,index:w,expected_revision:I()});C(M),M&&M.conflict&&await r("worker-queue-place",{bead_id:p,index:w,expected_revision:I()}).then(C)}async function Ce(p,w){if(!r)return;let M=await r("worker-queue-reorder",{bead_id:p,to_index:w,expected_revision:I()});C(M),M&&M.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:w,expected_revision:I()}).then(C)}async function ye(p){if(!r)return;let w=await r("worker-queue-remove",{bead_id:p,expected_revision:I()});C(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:I()}).then(C)}async function $e(){if(!r||me)return;let w=(Array.isArray(pe().queue)?pe().queue:[]).map(T=>T.bead_id).filter(T=>be.has(T));if(w.length===0)return;if(w.some(T=>{let X=Ie.get(T);return X!==!0&&X!==!1})){J("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let M=le==="serial",oe=w.filter(T=>Ie.get(T)!==M);if(oe.length===0){be.clear(),re(),J("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}me=!0,re();let z=[],h=0;try{for(let T of oe){let X=await Promise.resolve(r(M?"label-add":"label-remove",{id:T,label:Lo})).catch(()=>[]),de=Array.isArray(X)?X[0]:X,Oe=de&&typeof de=="object"?de.labels:null;de&&typeof de=="object"&&de.id===T&&Array.isArray(Oe)&&$n(Oe)===M?h+=1:z.push(T)}if(z.length===0){be.clear(),J(`${h}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}be.clear();for(let T of z)be.add(T);J(`${oe.length}\uAC1C \uC911 ${h}\uAC1C \uBCC0\uACBD \xB7 ${z.length}\uAC1C \uC2E4\uD328 (${z.join(", ")})`,"error")}finally{me=!1,re()}}async function Ze(p){if(!r||!p)return;let w=await r("worker-attempt-pause",{attempt_id:p});w&&w.paused===!1&&w.reason&&J(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Fe(p){if(!r||!p)return;let w=async(oe={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:I(),...oe}),M=await w();C(M),M&&M.conflict&&(M=await r("worker-attempt-resume",{attempt_id:p,expected_revision:I()}),C(M)),M=await tr(M,(oe,z)=>w({continuation:oe,decision_token:z}),{onResult:C,refresh:()=>w()}),M&&M.resumed===!1&&!M.conflict&&M.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${M.reason}`,"error",2400)}async function Qe(p){if(!r||!p)return;let w=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:I()});C(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:I()}),C(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&J(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function O(p,w,M=!0){if(!r)return null;let oe=r,z=await oe(p,{...w,expected_revision:I()});return C(z),z&&z.conflict&&M&&(z=await oe(p,{...w,expected_revision:I()}),C(z)),z}async function W(p){if(!r||!p)return;let w=pe().merge_queue?.find(oe=>oe.bead_id===p)?.continuation_action;if(w?.mismatch&&w.continuation===null){await y(p,w.mismatch);return}H.add(p),re();let M;try{M=await O("worker-merge-queue-add",{bead_id:p})}finally{H.delete(p),re()}!M||M.conflict||M.applied||J("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function B(p){if(!(!r||!p||F.has(p))){F.add(p),re();try{let w=await r("worker-cleanup-retry",{bead_id:p,expected_revision:I()});C(w),w&&!w.retried&&!w.conflict&&w.reason&&J(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{F.delete(p),re()}}}async function y(p,w){let M=await tr({continuation_mismatch:w},(z,h)=>O("worker-merge-queue-add",{bead_id:p,continuation:z,decision_token:h},!1)),oe=M?.queue?.merge_queue?.find(z=>z.bead_id===p)?.continuation_action;if(M?.applied!==!0&&oe?.continuation===null&&oe.mismatch){await y(p,oe.mismatch);return}M&&M.applied===!1&&!M.conflict&&J("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function R(p){if(!r)return;let w=await O("worker-merge-auto-toggle",{on:p});!w||w.conflict||J(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function P(p){if(!r||!p)return;let w=await O("worker-merge-queue-remove",{bead_id:p});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&J("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function G(){await O("worker-merge-queue-remove",{all:!0})}async function Q(p,w=null,M="unmerged",oe=null){if(!r||!p)return;let z=bn(p,M);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(z)))return;let T=await r("worker-discard",{bead_id:p,...w?{attempt_id:w}:{},...oe?{operation_id:oe}:{},expected_revision:I()});if(C(T),T&&T.conflict&&(T=await r("worker-discard",{bead_id:p,...w?{attempt_id:w}:{},...oe?{operation_id:oe}:{},expected_revision:I()}),C(T)),T&&T.discarded===!0){J(ps(T),"success",5e3);return}if(T&&T.reason){J(`\uD3D0\uAE30 \uC2E4\uD328: ${T.reason}`,"error",2800);return}if(T&&T.accepted&&T.pending==="merged_revert"){J("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(T&&T.accepted&&!T.discarded){J(`\uD3D0\uAE30 \uC9C4\uD589: ${T.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}T&&!T.conflict&&J("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Re(p,w){if(!r||!w||se.has(w))return;se.add(w),re();let M;try{let oe=async(z={})=>await r(p,{bead_id:w,expected_revision:I(),...z});M=await oe(),C(M),M&&M.conflict&&(M=await r(p,{bead_id:w,expected_revision:I()}),C(M)),p==="worker-revise-fix"&&(M=await tr(M,(z,h)=>oe({continuation:z,decision_token:h}),{onResult:C,refresh:()=>oe()}))}finally{se.delete(w),re()}if(!(!M||M.conflict)){if(M.ok){J(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}J(`\uCC98\uBD84 \uAC70\uBD80: ${M.reason||""}`,"error",3e3)}}async function xe(p){if(!r)return;let w=await r("worker-automation-toggle",{on:p,expected_revision:I()});C(w),w&&w.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:I()}).then(C)}async function Le(p){if(!r||!p)return;let w=await r("worker-repo-operation-repair",{operation_id:p});if(C(w),w&&w.ok===!1){J(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&J("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function We(p){if(!r||!p)return;let w=await r("worker-repo-operation-dismiss",{operation_id:p});C(w),w&&w.ok===!1&&J(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function st(p){if(!r||!Number.isFinite(p))return;let w=Math.max(xn,Math.floor(p)),M=await r("worker-queue-set-slots",{slots:w,expected_revision:I()});C(M),M&&M.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:I()}).then(C)}async function et(p){if(!r)return;let w=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:I()});C(w),w&&w.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:I()}).then(C)}function ut(){let p=pe(),w=b?b.selectBoardColumn(kf,"ready"):[],M=b?b.selectBoardColumn($f,"blocked"):[],oe=b?b.selectBoardColumn(Sf,"closed"):[],z=b?b.selectBoardColumn(xf,"in_progress"):[],h=new Map;for(let g of z){let N=Uf(g);if(!N)continue;let ne=h.get(N);ne?ne.push(g):h.set(N,[g])}let T=g=>{let N=Fn(h.get(g)||[]);return N?N.title||N.id:null},X=p.bead_titles||{},de=new Map;for(let[g,N]of Object.entries(X))typeof N=="string"&&N.length>0&&de.set(g,N);for(let g of[...w,...M])de.set(g.id,g.title||g.id);Ie.clear();let Oe=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},je=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[g,N]of Object.entries(je))Array.isArray(N)&&Ie.set(g,$n(N));for(let g of[...w,...M]){let N=g.labels;if(!Array.isArray(N))continue;if(!Ie.has(g.id)){Ie.set(g.id,$n(N));continue}let ne=Oe[g.id],Ye=er(ne&&typeof ne=="object"?ne.updated_at:null),Wt=er(g.updated_at);Wt!==null&&Ye!==null&&Wt>Ye&&Ie.set(g.id,$n(N))}let _=new Map;for(let[g,N]of Object.entries(Oe))N&&typeof N=="object"&&_.set(g,N);for(let g of[...w,...M])_.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let d=g=>_.get(g)||{},k=p.pr_wait||[],v=p.pr_observations||{},q=p.pr_activity||{},ee=p.cleanup_failed||{},he=Object.entries(ee).map(([g,N])=>({bead_id:g,step:N&&N.step?N.step:"",reason:N&&N.reason?N.reason:"",at:N&&typeof N.at=="number"?N.at:null,detail:N&&typeof N.detail=="string"?N.detail:null,output_tail:N&&typeof N.output_tail=="string"&&N.output_tail?N.output_tail:void 0,log_path:N&&typeof N.log_path=="string"&&N.log_path?N.log_path:void 0,retry_count:N&&typeof N.retry_count=="number"&&Number.isInteger(N.retry_count)&&N.retry_count>0?N.retry_count:0,failure_code:N&&typeof N.failure_code=="string"?N.failure_code:void 0,subject_id:N&&typeof N.subject_id=="string"?N.subject_id:void 0,repair_eligible:!!(N&&N.repair_eligible),repair:N&&N.repair?N.repair:void 0})),it=p.queue||[],Me=new Set(it.map(g=>g.bead_id));for(let g of be)Me.has(g)||be.delete(g);let Nt=new Set([...it.map(g=>g.bead_id),...k.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),ke=new Set(M.map(g=>g.id)),lt=l?l.get()?.order||{}:{},Or=new Set,qo=[];for(let g of[...w,...M])Nt.has(g.id)||Or.has(g.id)||Bf(g)||Wl(g.labels)||(Or.add(g.id),qo.push(g));E=qf(qo,x,lt);let gc=p.admission||{},Bo=g=>{let N=gc[g];if(!N)return"";if(N.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof N.reason=="string"?N.reason:"",Ye=ne.indexOf(":");return Ye>0&&Ye<ne.length-1?`\u26D4 ${ne.slice(0,Ye)} (${ne.slice(Ye+1)})`:`\u26D4 ${ne}`},hc=E.map(g=>{let N=gn(g),ne=N.path.length>0,Ye=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",Wt=!Ye&&ne&&!N.conflict,lr=ke.has(g.id),Ct=[];lr&&Ct.push(jf(g)),Ye?Ct.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):N.conflict?Ct.push("spec_id_conflict"):ne||Ct.push("spec \uC5C6\uC74C");let In=Bo(g.id);return In&&Ct.push(In),{id:g.id,title:g.title||g.id,reason:Ct.join(" \xB7 "),draggable:Wt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ye,status:g.status,blocked:lr,has_spec:ne}}),hs=Cf(hc,j),bc=hs.visible,vc=p.revise_parked||{},Yr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Uo=(g,N)=>g.map(ne=>{let Ye=N==="queue"?vc[ne.bead_id]:null,Wt=N==="queue"?Vt(Yr,ne.bead_id):null,lr=Wt?.operation?Wt:null,Ct=N==="queue"?Ie.has(ne.bead_id)?Ie.get(ne.bead_id)||!1:null:!1,In=Ct===!0&&(Object.values(p.attempts||{}).some(Qt=>Qt&&Qt.bead_id!==ne.bead_id&&!Af.has(Qt.status))||k.some(Qt=>Qt.bead_id!==ne.bead_id)||Object.values(Yr).some(Qt=>Qt&&Qt.bead_id!==ne.bead_id&&Qt.phase!=="done")),ia=N==="done"?[]:[Bo(ne.bead_id)];return In&&ia.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:ne.bead_id,title:de.get(ne.bead_id)||ne.bead_id,reason:ia.filter(Boolean).join(" \xB7 "),draggable:N!=="done"&&!lr,done:N==="done",lane:N,selectable:N==="queue",selected:N==="queue"&&be.has(ne.bead_id),worker_serial:Ct,discard:lr,badges:Ye?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ye,revise_action:!!Ye,revise_enabled:!!Ye&&!lr&&!se.has(ne.bead_id),revise_title:Ye?Ye.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ye.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:N==="done"?It(p.attempts||{},ne.bead_id):null,done_at:N==="done"&&typeof ne.added_at=="number"?ne.added_at:void 0,...d(ne.bead_id)}}),jo=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&jo.set(g.bead_id,g.added_at);let Vr=p.attempts?Object.values(p.attempts):[],bs=new Set;for(let g of Vr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&bs.add(g.resumed_from);let vs=new Map;for(let g of Vr)vs.set(g.bead_id,g.attempt_id);let ys=new Map;for(let g of Vr)ys.set(g.attempt_id,g);function ws(g){let N=new Set,ne=g;for(;ne&&!N.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;N.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&ys.get(ne.resumed_from)||null}return!1}let An=typeof p.declared_base=="string"?p.declared_base:null;function yc(g){let N=null;for(let ne of Vr)!ne||ne.bead_id!==g||ws(ne)||(N===null||(typeof ne.started_at=="number"?ne.started_at:0)>=(typeof N.started_at=="number"?N.started_at:0))&&(N=ne);return N&&typeof N.target_base=="string"?N.target_base:null}let zo=[],Ho=[],wc=g=>{let N=vs.get(g.bead_id)!==g.attempt_id,ne=jo.get(g.bead_id),Ye=typeof ne=="number"&&ne>0&&typeof g.finished_at=="number"&&ne>=g.finished_at;return!N&&!Ye&&typeof g.dismissed_at!="number"},Wo=g=>{let N=typeof g.session_id=="string"&&g.session_id.length>0,ne=bs.has(g.attempt_id);return{eligible:N&&!ne,reason:N?ne?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Pt=null;for(let g of Vr){let N=g.status==="paused"&&!bs.has(g.attempt_id);if(g.status==="running"||N)Ho.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:de.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:N,conflict_resolution:ws(g),base_exception:Do(An,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Vt(Yr,g.bead_id,{attempt_id:g.attempt_id}),usage:It(p.attempts||{},g.bead_id),current_child:T(g.bead_id),...d(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&wc(g)){let ne=Wo(g);zo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:de.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Vt(Yr,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ne.eligible,resume_reason:ne.reason,conflict_resolution:ws(g),base_exception:Do(An,g.target_base),usage:It(p.attempts||{},g.bead_id),current_child:T(g.bead_id),...d(g.bead_id)}),Pt=g}}let Tn=[...zo,...Ho],Go=null;if(Pt){let g=Wo(Pt),N=Pt.cause_detail;Go={bead_id:Pt.bead_id,repo:Pt.repo||"",reason:Pt.cause||Pt.status,cause_detail:N&&typeof N.reason=="string"?{reason:N.reason,command:typeof N.command=="string"?N.command:null}:null,resume_attempt_id:Pt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Vt(Yr,Pt.bead_id,{attempt_id:Pt.attempt_id})}}let kc=new Set(Tn.map(g=>g.bead_id)),ks=Array.isArray(p.merge_queue)?p.merge_queue:[],Yo=new Map,Vo=new Map,Ko=new Map,Zo=new Map;ks.forEach((g,N)=>{g&&typeof g.bead_id=="string"&&(Yo.set(g.bead_id,N+1),Vo.set(g.bead_id,g.resolution),Ko.set(g.bead_id,g.continuation_action||null),Zo.set(g.bead_id,g.head_review||null))});let Xo=p.merge_queue_state||{active:null,failures:{}},$c=Xo.failures||{},xc=p.auto_merge_skips||{},Qo=g=>{let N=xc[g];if(!N)return null;let ne=v[g],Ye=ne&&ne.pr?ne.pr.head_sha:null;return Ye&&Ye===N.head_sha?N.reason||"":null},En=new Map;for(let g of Tn)g.failed!==!0&&g.conflict_resolution&&(g.paused?En.has(g.bead_id)||En.set(g.bead_id,"paused"):En.set(g.bead_id,"running"));let Jo=Tn.filter(g=>!g.paused&&g.failed!==!0).length,ea=(p.workspace_info||{}).slots,Sc=typeof ea=="number"?ea:typeof p.slots=="number"?p.slots:xn,ta=p.pr_wait_holds_slot===!0?xn:Sc,Ac=Jo>ta,Cn=xr(K),Tc=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>Cn===void 0||typeof g.added_at!="number"||g.added_at>=Cn).sort((g,N)=>(N.added_at||0)-(g.added_at||0)),Kr=Uo(Tc,"done"),Ec=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),ra=[],Cc=u?.()||"";for(let g of oe){let N=er(g.closed_at);if(typeof g.id!="string"||Ec.has(g.id)||N===null||Cn!==void 0&&N<Cn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ne=`${Cc}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ye=te.get(ne);Ye===void 0&&r&&(te.set(ne,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(Wt=>{let lr=Array.isArray(Wt)&&Wt.some(Ct=>as(typeof Ct?.text=="string"?Ct.text:"")?.lane==="session");te.set(ne,lr?"session":"not-session"),re()}).catch(()=>{te.set(ne,"failed"),re()})),Ye==="session"&&ra.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:N,created_at:g.created_at,updated_at:g.updated_at})}Kr.push(...ra),Kr.sort((g,N)=>(N.done_at||0)-(g.done_at||0));let Rn={};for(let g of rr)Rn[g]=0;let na=!1,sa=0,$s=0,oa=0;for(let g of Kr){let N=g.usage;if(N&&typeof N=="object"){let ne=!1;for(let Ye of rr)Number.isFinite(N[Ye])&&(Rn[Ye]+=N[Ye],na=!0,ne=!0);ne&&($s+=1,Number.isFinite(N.total_cost_usd)&&(sa+=N.total_cost_usd,oa+=1))}}$s>0&&oa===$s&&(Rn.total_cost_usd=sa);let aa=Kr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Rc=aa.length>0?gt(Wn(aa)):na?qt(Rn):null;return{queue:p,idToTitle:de,candidates:bc,candidate_hidden:{blocked:hs.hidden_blocked,spec:hs.hidden_spec},running:Tn,live_count:Jo,slots:ta,over_cap:Ac,failure:Go,waiting:Uo(it.filter(g=>!kc.has(g.bead_id)),"queue"),pr_wait:k.map(g=>Kf(g.bead_id,de.get(g.bead_id)||g.bead_id,v,ee[g.bead_id]||null,It(p.attempts||{},g.bead_id),q[g.bead_id]||(H.has(g.bead_id)||F.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),En.get(g.bead_id)||null,g.external===!0,{position:Yo.get(g.bead_id)||0,active:Xo.active===g.bead_id,failure:$c[g.bead_id]||null,resolution:Vo.get(g.bead_id),continuation_action:Ko.get(g.bead_id),head_review:Zo.get(g.bead_id)||null},g.wt_present!==!1,p.auto_merge===!0?Qo(g.bead_id):null,Do(An,yc(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},ys.get(vs.get(g.bead_id)||"")?.worker_serial===!0)).map(g=>({...g,...d(g.id)})),merge_queue_length:ks.length,merge_queue_running:ks.length>0,auto_excluded:k.map(g=>g.bead_id).filter(g=>Qo(g)!==null),declared_base:An,done:Kr,token_total:Rc,cleanup_failures:he,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function $t(p){let w=p.waiting.length>0?p.waiting[0].id:"\u2014",M=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,oe=V(p),z=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",h=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${L()} 완료 <b>${p.done.length}</b></span
      >`,T=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,X=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${xn}
          step="1"
          .value=${String(p.slots)}
          ?disabled=${p.queue.pr_wait_holds_slot===!0}
          title=${p.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${p.queue.pr_wait_holds_slot===!0}
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
      </button>`,de=bl({failure:p.failure}),Oe=dl(p.repo_operations,p.cleanup_failures);return S?i`<div class="worker-ribbon">
          ${M} ${oe}
          <div class="worker-kpi worker-kpi--ribbon">${z}${h}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${X}</div>
          <div class="worker-kpi">${T}</div>
        </div>
        ${Oe}${de}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${M}${oe}${X}</div>
        <div class="worker-kpi">
          ${z}${h}${T}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${L()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(je=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${je.tooltip}
                >${L()} 완료 · 누적 ${je.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${Oe}${de}`}function rt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let w=p.running.some(M=>!M.paused&&M.failed!==!0);return i`<section
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
          >${p.running.length+p.pr_wait.length}</span
        >
      </header>
      ${p.running.length>0?So(p.running,Date.now(),Y):""}
      ${p.pr_wait.map(M=>yo(M))}
    </section>`}function ot(p){let w=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${j.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Rf.map(M=>i`<button
              type="button"
              class="worker-filter__chip${j.spec===M.value?" is-active":""}"
              data-spec=${M.value}
              aria-pressed=${j.spec===M.value?"true":"false"}
            >
              ${M.label}
            </button>`)}
        ${w.spec>0?i`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function tt(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${If.map(p=>i`<option value=${p.value} ?selected=${x===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function at(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${K}
      >
        ${Gt.map(p=>i`<option value=${p.value} ?selected=${K===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function _t(){if(be.size===0)return"";let p=Array.from(be),w=p.some(M=>{let oe=Ie.get(M);return oe!==!0&&oe!==!1});return i`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${le}
        ?disabled=${me}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${w||me}
        title=${w?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":me?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function U(p){let w=(p.queue.pr_wait||[]).filter(h=>h&&h.external!==!0&&typeof h.bead_id=="string"),M=new Set(p.running.filter(h=>!h.paused&&h.failed!==!0).map(h=>h.bead_id));for(let h of w)M.add(h.bead_id);let oe=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||w.length===0||p.waiting.length===0||M.size<p.slots),z=p.pr_wait.some(h=>h.worker_serial===!0);if(!(!oe&&!(z&&p.queue.auto_merge!==!0)))return i`${oe?i`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${z&&p.queue.auto_merge!==!0?i`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function V(p){let w=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(w)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let M=new Set(p.auto_excluded),oe=p.pr_wait.filter(z=>z.merge_action&&z.merge_enabled&&!M.has(z.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${oe>0?` ${oe}`:""}
    </button>`}function ae(p){let w=Kt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:tt(),controls:ot(p)});return S?i`<div class="worker-lanes worker-lanes--mobile">
        ${rt(p)}
        ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:i`${_t()}${U(p)}`,collapsible:!0,collapsed:D.queue,preview:Jl(p.waiting)})}
        ${w}
        ${Kt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:at(),collapsible:!0,collapsed:D.done,preview:Array.isArray(p.token_total)?p.token_total.map(M=>M.label).join(" \xB7 "):p.token_total||Jl(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${w}
      ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:i`${_t()}${U(p)}`})}
      ${Kt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(M=>!M.paused&&M.failed!==!0),body:So(p.running,Date.now(),Y)})}
      ${Kt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Kt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${L()} ${p.done.length}`,items:p.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:at()})}
    </div>`}function ce(p){D={...D,[p]:!D[p]},Ff(D),re()}function re(){let p=ut();qe($t(p),Pe),qe(ae(p),fe)}function Te(){let p=document.querySelector(".app-header");if(!p)return;let w=()=>{let M=Math.round(p.getBoundingClientRect().height);ze.style.setProperty("--worker-ribbon-top",`${M}px`)};if(w(),typeof ResizeObserver=="function"){let M=new ResizeObserver(w);M.observe(p),Ue.push(()=>M.disconnect())}else window.addEventListener("resize",w),Ue.push(()=>window.removeEventListener("resize",w))}function Ve(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Nf);S=!!p.matches;let w=M=>{let oe=!!(M&&typeof M.matches=="boolean"?M.matches:p.matches);oe!==S&&(S=oe,re())};typeof p.addEventListener=="function"?(p.addEventListener("change",w),Ue.push(()=>p.removeEventListener("change",w))):typeof p.addListener=="function"&&(p.addListener(w),Ue.push(()=>p.removeListener(w)))}let Xe=null;function Se(p){Xe=p.target instanceof Element?p.target:null}function Ge(p){let M=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!M)return;if(Xe&&M.contains(Xe)&&Xe.closest("input, button, a")){p.preventDefault();return}let oe=M.dataset.beadId||"",z=M.dataset.lane||"";$={bead_id:oe,from_lane:z};try{p.dataTransfer?.setData("text/plain",oe),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function we(p){let w=p.target?.closest?.(".worker-pane");if(!w)return;let M=w.dataset.lane||"";M!=="candidate"&&M!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function dt(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ht(p,w){let M=E.find(T=>T.id===p);if(!M)return;let oe=E.filter(T=>T.id!==p),z=oe.length;if(w){let T=w.dataset.beadId;if(T===p)return;let X=oe.findIndex(de=>de.id===T);X>=0&&(z=X)}let h=oe.slice();h.splice(z,0,M),A.applyReorder(p,h,z)}function Zt(p){let w=p.target?.closest?.(".worker-pane");if(!w)return;p.preventDefault(),w.classList.remove("worker-pane--drag-over");let M=w.dataset.lane||"",oe=$?.bead_id||p.dataTransfer?.getData("text/plain")||"",z=$?.from_lane||"";if($=null,!oe)return;let h=p.target?.closest?.(".worker-mini, .worker-card"),T=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),X=T.length;if(h){let de=T.indexOf(h);de>=0&&(X=de)}if(w.classList.contains("worker-pane--collapsed")&&(X=ie()),M==="candidate"){if(z==="candidate"){ht(oe,h);return}z==="queue"&&ye(oe);return}M==="queue"&&(z==="queue"?Ce(oe,X):Be(oe,X))}function zt(p){j=p,Ef(p),re()}function Xt(p){x=p==="board"||p==="created"||p==="spec"?p:gs,Of(x),re()}function mt(p){K=Rt(p)?p:At,Mf(K),m?.(K),re()}function xt(p){let w=p.target?.closest?.(".worker-mini__select");if(w){let Oe=w.dataset.beadId||"";Oe&&(w.checked?be.add(Oe):be.delete(Oe),re());return}let M=p.target?.closest?.(".worker-bulk__mode");if(M){le=M.value==="serial"?"serial":"ordinary";return}let oe=p.target?.closest?.(".worker-filter__blocked");if(oe){zt({...j,show_blocked:oe.checked});return}let z=p.target?.closest?.(".worker-done-range");if(z){mt(z.value);return}let h=p.target?.closest?.(".worker-sort");if(h){Xt(h.value||gs);return}let T=p.target?.closest?.(".worker-pr-wait-hold");if(T){et(T.checked);return}let X=p.target?.closest?.(".worker-slots__input");if(!X)return;let de=Number.parseInt(X.value,10);if(!Number.isFinite(de)){re();return}st(de).then(re)}function Ot(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Dt(){let p=ut();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function Mt(){Y&&Z.close(),ve.hidden=!1,De.hidden=!1,Ae.open(Dt()),re()}function Ht(p){let w=pe(),M=w.attempts?w.attempts[p]:null;Y=p,Ae.close(),ve.hidden=!0,De.hidden=!1,Z.open({attempt_id:p,meta:Ot(M)}),re()}function Ee(){if(Ae.isOpen()&&Ae.refresh(Dt()),!Y)return;let p=pe(),w=p.attempts?p.attempts[Y]:null;if(w){Z.updateMeta(Ot(w));return}Z.close()}function bt(p){let w=p.target,M=w?.closest?.(".worker-bulk__apply");if(M){M.disabled||$e();return}if(w?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-exec-defaults-dialog"))return;if(w?.closest?.(".worker-exec-defaults-btn")){ue.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){Mt();return}let oe=w?.closest?.(".worker-repo-op__session");if(oe){let ke=oe.dataset.attemptId;ke&&Ht(ke);return}let z=w?.closest?.(".worker-repo-op__resolve");if(z){Le(z.dataset.operationId||"");return}let h=w?.closest?.(".worker-repo-op__dismiss");if(h){We(h.dataset.operationId||"");return}let T=w?.closest?.(".worker-cleanup__resume");if(T){let ke=T.dataset.beadId;ke&&B(ke);return}let X=w?.closest?.(".worker-banner__resume");if(X){let ke=X.dataset.attemptId;ke&&Fe(ke);return}let de=w?.closest?.(".worker-banner__discard");if(de){let ke=de.dataset.confirmation==="merged"?"merged":"unmerged";Q(de.dataset.beadId||"",de.dataset.attemptId||null,ke,de.dataset.operationId||null);return}let Oe=w?.closest?.(".worker-banner__dismiss");if(Oe){let ke=Oe.dataset.attemptId;ke&&Qe(ke);return}if(w?.closest?.(".worker-play")){xe(!pe().auto_advance);return}let je=w?.closest?.(".worker-merge-all");if(je){je.classList.contains("worker-merge-all--stop")?pe().auto_merge===!0?R(!1):G():R(!0);return}let _=w?.closest?.(".worker-pane__hd--toggle");if(_){let ke=_.dataset.lane;(ke==="queue"||ke==="done")&&ce(ke);return}let d=w?.closest?.(".worker-card__place");if(d){let ke=d.dataset.beadId;ke&&!d.disabled&&Be(ke,ie());return}let k=w?.closest?.(".worker-filter__chip");if(k){let ke=k.dataset.spec;(ke==="all"||ke==="with"||ke==="without")&&zt({...j,spec:ke});return}let v=w?.closest?.(".worker-mini__merge");if(v){let ke=v.dataset.beadId||"";pe().cleanup_failed?.[ke]?B(ke):W(ke);return}let q=w?.closest?.(".worker-mini__merge-cancel");if(q){P(q.dataset.beadId||"");return}let ee=w?.closest?.(".worker-mini__discard");if(ee){Q(ee.dataset.beadId||"",ee.dataset.attemptId||null,ee.dataset.discardMode==="merged"?"merged":"unmerged",ee.dataset.operationId||null);return}let he=w?.closest?.(".worker-mini__revise-fix");if(he){Re("worker-revise-fix",he.dataset.beadId||"");return}let it=w?.closest?.(".worker-mini__revise-approve");if(it){Re("worker-revise-approve",it.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let ke=w?.closest?.(".rtile"),lt=ke?.dataset?.beadId,Or=ke?.dataset?.attemptId;lt&&Q(lt,Or||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let lt=w?.closest?.(".rtile")?.dataset?.attemptId;lt&&Qe(lt);return}if(w?.closest?.(".rtile__pause")){let lt=w?.closest?.(".rtile")?.dataset?.attemptId;lt&&Ze(lt);return}if(w?.closest?.(".rtile__resume")){let lt=w?.closest?.(".rtile")?.dataset?.attemptId;lt&&Fe(lt);return}if(w?.closest?.(".rtile__session")){let lt=w?.closest?.(".rtile")?.dataset?.attemptId;lt&&Ht(lt);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){Ae.close(),Z.close();return}if(w?.closest?.(".worker-drawer-host"))return;let Me=w?.closest?.(".rtile");if(Me){if(w?.closest?.(".rtile__id")){let lt=Me.dataset.beadId;lt&&Tr(lt).then(Or=>{Or?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ke=Me.dataset.beadId;ke&&c&&c(ke);return}let Nt=w?.closest?.(".worker-mini, .worker-card");if(Nt){let ke=Nt.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){ke&&Tr(ke).then(lt=>{lt?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ke&&c&&c(ke)}}return e.addEventListener("pointerdown",Se),e.addEventListener("dragstart",Ge),e.addEventListener("dragover",we),e.addEventListener("dragleave",dt),e.addEventListener("drop",Zt),e.addEventListener("click",bt),e.addEventListener("change",xt),Ve(),Te(),b&&Ue.push(b.subscribe(()=>{for(let[p,w]of te)w==="failed"&&te.delete(p);re()})),s&&Ue.push(s.subscribe(()=>{re(),Ee()})),re(),{load(){re()},openExecDefaults(){ue.open()},destroy(){for(let p of Ue.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",Se),e.removeEventListener("dragstart",Ge),e.removeEventListener("dragover",we),e.removeEventListener("dragleave",dt),e.removeEventListener("drop",Zt),e.removeEventListener("click",bt),e.removeEventListener("change",xt);try{Z.destroy()}catch{}De.hidden=!0;try{ue.destroy()}catch{}qe(i``,e)}}}function No(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function oc(e,t,r,n=async()=>{},s=async()=>{}){let o=nt("views:workspace-picker"),a=null,l=!1,c=!1,u=!1;async function f(S){let F=S.target.value,be=t.getState().workspace?.current?.path||"";if(F&&F!==be){o("switching workspace to %s",F),l=!0,D();try{await r(F)}catch(le){o("workspace switch failed: %o",le)}finally{l=!1,D()}}}async function m(){let S=t.getState(),H=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!H||c)){o("git-pulling workspace %s",H),c=!0,D();try{await n(H)}catch(F){o("workspace git pull failed: %o",F)}finally{c=!1,D()}}}function b(S){let H=S.target;H&&e.contains(H)||E()}function A(S){S.key==="Escape"&&E()}function $(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",A),D())}function E(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",A),D())}function j(){u?E():$()}async function x(S){let H=S.target,F=H.value,se=H.checked;o("toggling visibility %s \u2192 %s",F,String(se));try{await s(F,se)}catch(be){o("workspace visibility toggle failed: %o",be)}}function K(S){return S?i`
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
    `:i``}function te(S,H){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${j}
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
                ${S.map(F=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${F.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${F.path}"
                        .checked=${!H.has(F.path)}
                        @change=${x}
                      />
                      <span class="workspace-picker__manage-name"
                        >${No(F.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function L(){let S=t.getState(),H=S.workspace?.current,F=S.workspace?.available||[],se=new Set(S.workspace?.hidden||[]),be=H?.path||F[0]?.path||"";if(F.length===0)return i``;let le=F.filter(me=>!se.has(me.path)||me.path===be);if(le.length<=1){let me=le[0]||F[0],Ie=No(me.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${me.path}"
            >${Ie}</span
          >
          ${te(F,se)}
          ${K(be)}
          ${c?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||c}
          aria-label="Select project workspace"
        >
          ${le.map(me=>i`
              <option
                value="${me.path}"
                ?selected=${me.path===be}
                title="${me.path}"
              >
                ${No(me.path)}
              </option>
            `)}
        </select>
        ${te(F,se)}
        ${K(be)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){qe(L(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",A),qe(i``,e)}}}var ac=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Po(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function ic(e,t,r=Po()){return{id:r,type:e,payload:t}}function lc(e={}){let t=nt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,u=new Map,f=[],m=new Map,b=new Set;function A(L){for(let D of Array.from(b))try{D(L)}catch{}}function $(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let L=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),D=(r.jitterRatio||0)*L,S=Math.max(0,Math.round(L+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",S,a+1),l=setTimeout(()=>{l=null,te()},S)}function E(L){try{s?.send(JSON.stringify(L))}catch(D){t("ws send failed",D)}}function j(){for(o="open",t("ws open"),A(o),a=0;f.length;){let L=f.shift();L&&E(L)}}function x(L){let D;try{D=JSON.parse(String(L.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let H=u.get(D.id);u.delete(D.id),D.ok?H?.resolve(D.payload):H?.reject(D.error||new Error("ws error"));return}let S=m.get(D.type);if(S&&S.size>0)for(let H of Array.from(S))try{H(D.payload)}catch(F){t("ws event handler error",F)}else t("ws received unhandled message type: %s",D.type)}function K(){o="closed",t("ws closed"),A(o);for(let[L,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(L);a+=1,$()}function te(){if(!c)return;let L=n();try{s=new WebSocket(L),t("ws connecting %s",L),o="connecting",A(o),s.addEventListener("open",j),s.addEventListener("message",x),s.addEventListener("error",()=>{}),s.addEventListener("close",K)}catch(D){t("ws connect failed %o",D),$()}}return te(),{send(L,D){if(!ac.includes(L))return Promise.reject(new Error(`unknown message type: ${L}`));let S=Po(),H=ic(L,D,S);return t("send %s id=%s",L,S),new Promise((F,se)=>{u.set(S,{resolve:F,reject:se,type:L}),s&&s.readyState===s.OPEN?E(H):(t("queue %s id=%s (state=%s)",L,S,o),f.push(H))})},on(L,D){m.has(L)||m.set(L,new Set);let S=m.get(L);return S?.add(D),()=>{S?.delete(D)}},onConnection(L){return b.add(L),()=>{b.delete(L)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,te()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Zf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Xf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Fo=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],cc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],br="tab:worker:closed",Qf="bdui.worker.done-range",dc=Ml,uc="worker:queue",pc="ui:order",fc="ui:display-policy",_c="exec:presets",vr="tab:board:closed",mc="beads-ui.board.closed-range";function Jf(e){let t=nt("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;qe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Hl(s),o&&a&&l&&c){let _e=function(_,d){let k="Request failed",v="";if(_&&typeof _=="object"){let ee=_;if(typeof ee.message=="string"&&ee.message.length>0&&(k=ee.message),typeof ee.details=="string")v=ee.details;else if(ee.details&&typeof ee.details=="object")try{v=JSON.stringify(ee.details,null,2)}catch{v=""}}else typeof _=="string"&&_.length>0&&(k=_);let q=d&&d.length>0?`Failed to load ${d}`:"Request failed";De.open(q,k,v)},O=function(_){return`${Ee.getState().workspace.current?.path||""}\0${_}`},W=function(){ie&&(ie().catch(()=>{}),ie=null),Be=null,Ce=null},y=function(_){ye=_;let d=()=>{ye!==_||Ee.getState().selected_id!==_||(ye=null,B(_))};if(!Fe){Ze.then(d);return}d()},Q=function(_,d,k,v,q){return k!==G[d]?(q().catch(()=>{}),!1):(_.set(v,q),!0)},Re=function(){let _=Ee.getState();et(_.view==="board"),at(_.view==="worker"),ce(_.view==="monitor"),U(_.view==="board"||_.view==="worker"||!!_.selected_id)},We=function(){let _=xr(xe);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},st=function(){let _=xr(Le);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},et=function(_){if(_)for(let[d,k]of Fo){if(R.has(d)||P.has(d))continue;let v=d===vr?We():{type:k};try{Y.register(d,v)}catch(he){t("register %s store failed: %o",d,he)}P.add(d);let q=G.board,ee=!1;fe.subscribeList(d,v).then(he=>{ee=!Q(R,"board",q,d,he)}).catch(he=>{t("subscribe %s failed: %o",d,he),_e(he,"board")}).finally(()=>{P.delete(d),ee&&Re()})}else rt()},rt=function(){G.board+=1;for(let[_]of Fo){let d=R.get(_);d&&(d().catch(()=>{}),R.delete(_));try{Y.unregister(_)}catch(k){t("unregister %s failed: %o",_,k)}}},at=function(_){if(!_){_t();return}for(let[d,k]of cc){if(ot.has(d)||P.has(d))continue;let v=d===br?st():{type:k};try{Y.register(d,v)}catch(he){t("register %s store failed: %o",d,he)}P.add(d);let q=G.worker,ee=!1;fe.subscribeList(d,v).then(he=>{ee=!Q(ot,"worker",q,d,he)}).catch(he=>{t("subscribe %s failed: %o",d,he),_e(he,"worker")}).finally(()=>{P.delete(d),ee&&Re()})}},_t=function(){G.worker+=1;for(let[_]of cc){let d=ot.get(_);d&&(d().catch(()=>{}),ot.delete(_));try{Y.unregister(_)}catch(k){t("unregister %s failed: %o",_,k)}}},U=function(_){if(!_){V();return}tt||(ve("subscribe-worker-queue",{id:uc}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),tt=()=>ve("unsubscribe-worker-queue",{id:uc}))},V=function(){tt&&(tt().catch(()=>{}),tt=null)},ce=function(_){if(!_){re();return}ae||(ve("subscribe-monitor-pipeline",{id:dc}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),ae=()=>ve("unsubscribe-monitor-pipeline",{id:dc}))},re=function(){ae&&(ae().catch(()=>{}),ae=null)},Ve=function(){Te||(ve("subscribe-ui-order",{id:pc}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),Te=()=>ve("unsubscribe-ui-order",{id:pc}))},Xe=function(){Te&&(Te().catch(()=>{}),Te=null),ue.clear()},Ge=function(){Se||(ve("subscribe-display-policy",{id:fc}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),Se=()=>ve("unsubscribe-display-policy",{id:fc}))},we=function(){Se&&(Se().catch(()=>{}),Se=null),pe.clear()},ht=function(){dt||(ve("subscribe-exec-presets",{id:_c}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),dt=()=>ve("unsubscribe-exec-presets",{id:_c}))},Ot=function(_){if(!_)return"Unknown";let d=_.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=_e,f=O,m=W,b=y,A=Q,$=Re,E=We,j=st,x=et,K=rt,te=at,L=_t,D=U,S=V,H=ce,F=re,se=Ve,be=Xe,le=Ge,me=we,Ie=ht,Ue=Ot;let ze=document.getElementById("header-loading"),Pe=ja(ze),De=cl(e),ge=lc(),ve=Pe.wrapSend((_,d)=>ge.send(_,d)),fe=Ma(ve),Y=Na(),Z=Fa(),Ae=ya(),ue=Pa(),pe=ba(),I=va(),C=wa();ge.on("exec-presets-snapshot",_=>{let d=_;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&I.set({revision:d.revision,presets:d.presets})}),ge.on("monitor-pipeline-snapshot",_=>{let d=_;if(!(!d||!Array.isArray(d.workspaces)))try{Ae.set(d.workspaces,d.workspaces_state)}catch{}}),ge.on("ui-order-snapshot",_=>{let d=_;if(d&&typeof d.revision=="number")try{ue.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),ge.on("display-policy-snapshot",_=>{let d=_;if(d&&d.policy&&typeof d.policy=="object")try{pe.set(d.policy)}catch{}}),ge.on("session-log-snapshot",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{C.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),ge.on("session-log-append",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{C.append(d.attempt_id,d.event)}catch{}}),ge.on("snapshot",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",v=k?Y.getStore(k):null;if(v&&d&&d.type==="snapshot")try{v.applyPush(d)}catch{}}),ge.on("upsert",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",v=k?Y.getStore(k):null;if(v&&d&&d.type==="upsert")try{v.applyPush(d)}catch{}}),ge.on("delete",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",v=k?Y.getStore(k):null;if(v&&d&&d.type==="delete")try{v.applyPush(d)}catch{}});let ie=null,Be=null,Ce=null,ye=null,$e=()=>{},Ze=new Promise(_=>{$e=()=>_(void 0)}),Fe=!1,Qe=!1;async function B(_){let d=O(_);if(d===Be||d===Ce)return;Ce=d;let k=`detail:${_}`,v={type:"issue-detail",params:{id:_}};try{Y.register(k,v)}catch(q){t("register detail store failed: %o",q)}try{let q=await fe.subscribeList(k,v);if(Ee.getState().selected_id!==_||O(_)!==d){await q().catch(()=>{});return}ie&&await ie().catch(()=>{}),ie=q,Be=d}catch(q){t("detail subscribe failed: %o",q),_e(q,"issue details")}finally{Ce===d&&(Ce=null)}}let R=new Map,P=new Set,G={board:0,worker:0},xe=At;try{let _=window.localStorage.getItem(mc);Rt(_)&&(xe=_)}catch{}let Le=At;try{let _=window.localStorage.getItem(Qf);Rt(_)&&(Le=_)}catch{}async function ut(_){if(!Rt(_)||_===xe)return;xe=_;try{window.localStorage.setItem(mc,_)}catch{}let d=R.get(vr);if(!d)return;R.delete(vr),await d().catch(()=>{});let k=We();try{Y.register(vr,k)}catch(v){t("register %s store failed: %o",vr,v)}try{let v=await fe.subscribeList(vr,k);R.set(vr,v)}catch(v){t("re-subscribe %s failed: %o",vr,v),_e(v,"board")}}async function $t(_){if(!Rt(_)||_===Le)return;Le=_;let d=ot.get(br);if(!d)return;ot.delete(br),await d().catch(()=>{});let k=st();try{Y.register(br,k)}catch(v){t("register %s store failed: %o",br,v)}try{let v=await fe.subscribeList(br,k);ot.set(br,v)}catch(v){t("re-subscribe %s failed: %o",br,v),_e(v,"worker")}}let ot=new Map,tt=null,ae=null,Te=null,Se=null,dt=null;async function Zt(){Se=null,pe.clear(),dt=null,I.clear(),tt=null,ae=null,R.clear(),ot.clear(),G.board+=1,G.worker+=1,ht();let _=Ee.getState().workspace.current?.path;if(_)try{await ge.send("set-workspace",{path:_})}catch(k){t("workspace restore after reconnect failed: %o",k);return}Ge();let d=Ee.getState();et(d.view==="board"),at(d.view==="worker"),ce(d.view==="monitor"),U(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function zt(){t("clearing all subscriptions for workspace switch"),rt(),_t(),V(),Z.clear(),Xe(),Ve(),we(),Ge(),W();let _=Ee.getState();if(_.selected_id)try{Y.unregister(`detail:${_.selected_id}`)}catch{}let d=Ee.getState();et(d.view==="board"),at(d.view==="worker"),ce(d.view==="monitor"),U(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&y(d.selected_id)}async function Xt(_){t("requesting workspace switch to %s",_),Qe=!0;try{let d=await ge.send("set-workspace",{path:_});t("workspace switch result: %o",d),d&&d.workspace&&(Ee.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),d.changed&&(await zt(),J("Switched to "+Ot(_),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),J("Failed to switch workspace","error",3e3),d}finally{Qe=!1}}async function mt(_){t("requesting workspace git pull for %s",_);try{let d=await ge.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let k=d?.status;if(k==="up_to_date"){J("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){J("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}J("Git pulled "+Ot(_),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let k=d?.code,v=d?.message;if(k==="rebase_conflict"){J("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){J("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){J("Git pull skipped: another operation is running","warning",3e3);return}let q=v?`: ${v}`:"";throw J(`Git pull failed${q}`,"error",3e3),d}}async function xt(_,d){t("setting workspace visibility %s \u2192 %s",_,String(d));try{await ge.send("set-workspace-visibility",{path:_,visible:d}),await Dt()}catch(k){t("workspace visibility update failed: %o",k),J("Failed to update project visibility","error",3e3)}}async function Dt(){try{let _=await ge.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let d=_.workspaces.map(ee=>({path:ee.path,database:ee.database,pid:ee.pid,version:ee.version})),k=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,v=Array.isArray(_.hidden)?_.hidden.filter(ee=>typeof ee=="string"):[];Ee.setState({workspace:{current:k,available:d,hidden:v}});let q=window.localStorage.getItem("beads-ui.workspace");q&&(!d.some(he=>he.path===q)||v.includes(q)?window.localStorage.removeItem("beads-ui.workspace"):k&&q!==k.path&&(t("restoring saved workspace preference: %s",q),await Xt(q)))}}catch(_){t("failed to load workspaces: %o",_)}}ge.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(Ee.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Dt(),zt())});let Mt=!1;if(typeof ge.onConnection=="function"){let _=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(Mt=!0,J("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&Mt&&(Mt=!1,J("Reconnected","success",2200),Xf(Ee,(k,v)=>{t(`${k}: %o`,v)}),Zt())};ge.onConnection(_)}let Ht="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(Ht=_)}catch(_){t("view parse error: %o",_)}let Ee=Ua({config:Zf(),view:Ht});ge.on("worker-queue-snapshot",_=>{let d=_;if(!d||!d.queue)return;let k=Ee.getState().workspace.current?.path;if(typeof k=="string"&&k.length>0&&d.root_dir!==k){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{Z.set(d.queue)}catch{}});let bt=qa(Ee);bt.start();let p=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),w=async(_,d)=>{try{return await ve(_,d)}catch(k){if(p.has(_))throw k;return[]}};n&&Pl(n,Ee,bt);let M=document.getElementById("workspace-picker");M&&oc(M,Ee,Xt,mt,xt);let oe=Ul(e,(_,d)=>ve(_,d));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>oe.open())}catch{}let z=ll(e,{policyStore:pe,transport:(_,d)=>ve(_,d),labelOptions:()=>{let _=new Set;for(let[d]of Fo)for(let k of Y.snapshotFor(d)||[]){let v=k.labels;if(Array.isArray(v))for(let q of v)typeof q=="string"&&q.length>0&&_.add(q)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>z.open())}catch{}let h=Xa(o,{gotoIssue:_=>bt.gotoIssue(_),issueStores:Y,transport:w,workerQueueStore:Z,uiOrderStore:ue,displayPolicyStore:pe,closedRange:xe,onClosedRangeChange:_=>{ut(_)},onNewIssue:()=>oe.open()}),T=Mo(a,{transport:w,issueStores:Y,queueStore:Z,execPresetStore:I,sessionLogStore:C,uiOrderStore:ue,gotoIssue:_=>Ee.setState({selected_id:_}),getWorkspacePath:()=>Ee.getState().workspace.current?.path,doneRange:Le,onDoneRangeChange:_=>{$t(_)}}),X=Nl(l,{transport:w,pipelineStore:Ae,execPresetStore:I,gotoIssue:_=>bt.gotoIssue(_),getWorkspacePath:()=>Ee.getState().workspace.current?.path,switchWorkspace:_=>Xt(_)}),de=al(c,{issueStores:Y,transport:w,queueStore:Z,execPresetStore:I,sessionLogStore:C,getWorkspacePath:()=>Ee.getState().workspace.current?.path,onNavigate:_=>{Ee.getState().view==="worker"?Ee.setState({selected_id:_}):bt.gotoIssue(_)},onClose:()=>{let _=Ee.getState();Ee.setState({selected_id:null});try{bt.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{Ee.setState({selected_id:null}),bt.gotoView("worker"),T.openExecDefaults()}}),Oe=Ee.getState().selected_id;Oe&&(c.hidden=!1,de.load(Oe),y(Oe)),Ee.subscribe(_=>{let d=_.selected_id;d?(c.hidden=!1,de.load(d),Qe||y(d)):(de.clear(),c.hidden=!0,W())});let je=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",l.hidden=_.view!=="monitor",et(_.view==="board"),at(_.view==="worker"),ce(_.view==="monitor"),U(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&h.load(),_.view==="worker"&&T.load(),_.view==="monitor"?X.load():X.pause(),window.localStorage.setItem("beads-ui.view",_.view)};Ee.subscribe(je),je(Ee.getState()),Ve(),Ge(),ht(),Dt().finally(()=>{Fe=!0,$e()}),window.addEventListener("keydown",_=>{let d=_.ctrlKey||_.metaKey,k=String(_.key||"").toLowerCase(),v=_.target,q=v&&v.tagName?String(v.tagName).toLowerCase():"",ee=q==="input"||q==="textarea"||q==="select"||v&&typeof v.isContentEditable=="boolean"&&v.isContentEditable;d&&k==="n"&&(ee||(_.preventDefault(),oe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Jf(t)});export{Jf as bootstrap,Zf as readBootstrapConfig,Xf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
