var Lc=Object.create;var xs=Object.defineProperty;var Oc=Object.getOwnPropertyDescriptor;var Dc=Object.getOwnPropertyNames;var Mc=Object.getPrototypeOf,Nc=Object.prototype.hasOwnProperty;var Pc=(e,t,r)=>t in e?xs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Ss=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Fc=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Dc(t))!Nc.call(e,s)&&s!==r&&xs(e,s,{get:()=>t[s],enumerable:!(n=Oc(t,s))||n.enumerable});return e};var qc=(e,t,r)=>(r=e!=null?Lc(Mc(e)):{},Fc(t||!e||!e.__esModule?xs(r,"default",{value:e,enumerable:!0}):r,e));var Je=(e,t,r)=>Pc(e,typeof t!="symbol"?t+"":t,r);var xa=Ss((d_,$a)=>{var Nr=1e3,Pr=Nr*60,Fr=Pr*60,Sr=Fr*24,Hc=Sr*7,Wc=Sr*365.25;$a.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Gc(e);if(r==="number"&&isFinite(e))return t.long?Vc(e):Yc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Gc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Wc;case"weeks":case"week":case"w":return r*Hc;case"days":case"day":case"d":return r*Sr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Fr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Pr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Nr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Yc(e){var t=Math.abs(e);return t>=Sr?Math.round(e/Sr)+"d":t>=Fr?Math.round(e/Fr)+"h":t>=Pr?Math.round(e/Pr)+"m":t>=Nr?Math.round(e/Nr)+"s":e+"ms"}function Vc(e){var t=Math.abs(e);return t>=Sr?On(e,t,Sr,"day"):t>=Fr?On(e,t,Fr,"hour"):t>=Pr?On(e,t,Pr,"minute"):t>=Nr?On(e,t,Nr,"second"):e+" ms"}function On(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Aa=Ss((u_,Sa)=>{function Kc(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=xa(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let m=0;for(let b=0;b<f.length;b++)m=(m<<5)-m+f.charCodeAt(b),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(f){let m,b=null,S,$;function C(...j){if(!C.enabled)return;let x=C,K=Number(new Date),te=K-(m||K);x.diff=te,x.prev=m,x.curr=K,m=K,j[0]=r.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let H=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(E,P)=>{if(E==="%%")return"%";H++;let q=r.formatters[P];if(typeof q=="function"){let ce=j[H];E=q.call(x,ce),j.splice(H,1),H--}return E}),r.formatArgs.call(x,j),(x.log||r.log).apply(x,j)}return C.namespace=f,C.useColors=r.useColors(),C.color=r.selectColor(f),C.extend=n,C.destroy=r.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(S!==r.namespaces&&(S=r.namespaces,$=r.enabled(f)),$),set:j=>{b=j}}),typeof r.init=="function"&&r.init(C),C}function n(f,m){let b=r(this.namespace+(typeof m>"u"?":":m)+f);return b.log=this.log,b}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let m=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of m)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(f,m){let b=0,S=0,$=-1,C=0;for(;b<f.length;)if(S<m.length&&(m[S]===f[b]||m[S]==="*"))m[S]==="*"?($=S,C=b,S++):(b++,S++);else if($!==-1)S=$+1,C++,b=C;else return!1;for(;S<m.length&&m[S]==="*";)S++;return S===m.length}function a(){let f=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),f}function l(f){for(let m of r.skips)if(o(f,m))return!1;for(let m of r.names)if(o(f,m))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Sa.exports=Kc});var Ta=Ss((St,Dn)=>{St.formatArgs=Xc;St.save=Qc;St.load=Jc;St.useColors=Zc;St.storage=ed();St.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();St.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Zc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Xc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Dn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}St.log=console.debug||console.log||(()=>{});function Qc(e){try{e?St.storage.setItem("debug",e):St.storage.removeItem("debug")}catch{}}function Jc(){let e;try{e=St.storage.getItem("debug")||St.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function ed(){try{return localStorage}catch{}}Dn.exports=Aa()(St);var{formatters:td}=Dn.exports;td.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Xr=globalThis,Ln=Xr.trustedTypes,ca=Ln?Ln.createPolicy("lit-html",{createHTML:e=>e}):void 0,ma="$lit$",cr=`lit$${Math.random().toFixed(9).slice(2)}$`,ga="?"+cr,Bc=`<${ga}>`,kr=document,Qr=()=>kr.createComment(""),Jr=e=>e===null||typeof e!="object"&&typeof e!="function",Ls=Array.isArray,Uc=e=>Ls(e)||typeof e?.[Symbol.iterator]=="function",As=`[ 	
\f\r]`,Zr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,da=/-->/g,ua=/>/g,yr=RegExp(`>|${As}(?:([^\\s"'>=/]+)(${As}*=${As}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pa=/'/g,fa=/"/g,ha=/^(?:script|style|textarea|title)$/i,Os=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Os(1),Jt=Os(2),n_=Os(3),$r=Symbol.for("lit-noChange"),ct=Symbol.for("lit-nothing"),_a=new WeakMap,wr=kr.createTreeWalker(kr,129);function ba(e,t){if(!Ls(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ca!==void 0?ca.createHTML(t):t}var jc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Zr;for(let l=0;l<r;l++){let c=e[l],u,f,m=-1,b=0;for(;b<c.length&&(a.lastIndex=b,f=a.exec(c),f!==null);)b=a.lastIndex,a===Zr?f[1]==="!--"?a=da:f[1]!==void 0?a=ua:f[2]!==void 0?(ha.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=yr):f[3]!==void 0&&(a=yr):a===yr?f[0]===">"?(a=s??Zr,m=-1):f[1]===void 0?m=-2:(m=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?yr:f[3]==='"'?fa:pa):a===fa||a===pa?a=yr:a===da||a===ua?a=Zr:(a=yr,s=void 0);let S=a===yr&&e[l+1].startsWith("/>")?" ":"";o+=a===Zr?c+Bc:m>=0?(n.push(u),c.slice(0,m)+ma+c.slice(m)+cr+S):c+cr+(m===-2?l:S)}return[ba(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},en=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[u,f]=jc(t,r);if(this.el=e.createElement(u,n),wr.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=wr.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(ma)){let b=f[a++],S=s.getAttribute(m).split(cr),$=/([.?@])?(.*)/.exec(b);c.push({type:1,index:o,name:$[2],strings:S,ctor:$[1]==="."?Es:$[1]==="?"?Cs:$[1]==="@"?Rs:Mr}),s.removeAttribute(m)}else m.startsWith(cr)&&(c.push({type:6,index:o}),s.removeAttribute(m));if(ha.test(s.tagName)){let m=s.textContent.split(cr),b=m.length-1;if(b>0){s.textContent=Ln?Ln.emptyScript:"";for(let S=0;S<b;S++)s.append(m[S],Qr()),wr.nextNode(),c.push({type:2,index:++o});s.append(m[b],Qr())}}}else if(s.nodeType===8)if(s.data===ga)c.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(cr,m+1))!==-1;)c.push({type:7,index:o}),m+=cr.length-1}o++}}static createElement(t,r){let n=kr.createElement("template");return n.innerHTML=t,n}};function Dr(e,t,r=e,n){if(t===$r)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Jr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Dr(e,s._$AS(e,t.values),s,n)),t}var Ts=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??kr).importNode(r,!0);wr.currentNode=s;let o=wr.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new tn(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Is(o,this,t)),this._$AV.push(u),c=n[++l]}a!==c?.index&&(o=wr.nextNode(),a++)}return wr.currentNode=kr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},tn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ct,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Dr(this,t,r),Jr(t)?t===ct||t==null||t===""?(this._$AH!==ct&&this._$AR(),this._$AH=ct):t!==this._$AH&&t!==$r&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Uc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ct&&Jr(this._$AH)?this._$AA.nextSibling.data=t:this.T(kr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=en.createElement(ba(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ts(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=_a.get(t.strings);return r===void 0&&_a.set(t.strings,r=new en(t)),r}k(t){Ls(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Qr()),this.O(Qr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Mr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ct,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ct}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Dr(this,t,r,0),a=!Jr(t)||t!==this._$AH&&t!==$r,a&&(this._$AH=t);else{let l=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Dr(this,l[n+c],r,c),u===$r&&(u=this._$AH[c]),a||(a=!Jr(u)||u!==this._$AH[c]),u===ct?t=ct:t!==ct&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Es=class extends Mr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ct?void 0:t}},Cs=class extends Mr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ct)}},Rs=class extends Mr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Dr(this,t,r,0)??ct)===$r)return;let n=this._$AH,s=t===ct&&n!==ct||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ct&&(n===ct||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Is=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Dr(this,t)}};var zc=Xr.litHtmlPolyfillSupport;zc?.(en,tn),(Xr.litHtmlVersions??(Xr.litHtmlVersions=[])).push("3.3.1");var Be=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new tn(t.insertBefore(Qr(),o),o,void 0,r??{})}return s._$AI(e),s};var At="today",Gt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Rt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function xr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function va(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ya(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function wa(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ka(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Ea=qc(Ta(),1);function nt(e){return(0,Ea.default)(`beads-ui:${e}`)}function Ft(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ar(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Ia(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function La(e,t){let r=Ft(e.updated_at),n=Ft(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Oa(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Ft(e.created_at),o=Ft(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Da(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var rd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ca(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ra(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=rd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ma(e,t){let r=Ca(e),n=Ca(t);if(r!==n)return r<n?-1:1;let s=Ra(e),o=Ra(t);if(s!==o)return s<o?-1:1;let a=Ft(e&&e.created_at),l=Ft(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Ds=2**20;function qr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Ft(e&&e.created_at)}function Mn(e){return(t,r)=>{let n=qr(t,e),s=qr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ms(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:qr(l,r)-Ds};if(!l)return{rank:qr(a,r)+Ds};let c=qr(a,r),u=qr(l,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((m,b)=>({bead_id:m.id,rank:b*Ds}))}}function Ns(e,t={}){let r=nt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Ar;function u(){for(let b of Array.from(a))try{b()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function m(b){if(l||!b||b.id!==e)return;let S=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,S),!(S<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(S<=o)return;n.clear();let $=Array.isArray(b.issues)?b.issues:[];for(let C of $)C&&typeof C.id=="string"&&C.id.length>0&&n.set(C.id,C);f(),o=S,u();return}if(b.type==="upsert"){let $=b.issue;if($&&typeof $.id=="string"&&$.id.length>0){let C=n.get($.id);if(!C)n.set($.id,$);else{let j=Number.isFinite(C.updated_at)?C.updated_at:0,x=Number.isFinite($.updated_at)?$.updated_at:0;if(j<=x){for(let K of Object.keys(C))K in $||delete C[K];for(let[K,te]of Object.entries($))C[K]=te}}f()}o=S,u()}else if(b.type==="delete"){let $=String(b.issue_id||"");$&&(n.delete($),f()),o=S,u()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Nn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Na(e){let t=nt("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],m=Array.isArray(c.updated)?c.updated:[],b=Array.isArray(c.removed)?c.removed:[];for(let S of Array.from(u)){let $=r.get(S);if(!$)continue;let C=$.itemsById;for(let j of f)typeof j=="string"&&j.length>0&&C.set(j,!0);for(let j of m)typeof j=="string"&&j.length>0&&C.set(j,!0);for(let j of b)typeof j=="string"&&j.length>0&&C.delete(j)}}async function o(l,c){let u=Nn(c);if(t("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let m=r.get(l);if(m&&m.key!==u){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(m){let b=r.get(l)||null;if(b){let S=n.get(b.key);S&&(S.delete(l),S.size===0&&n.delete(b.key))}throw r.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let m=r.get(l)||null;if(m){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Nn,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let u=r.get(l);return u?u.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function Pa(){let e=nt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let m=u?Nn(u):"",b=r.get(c)||"",S=t.has(c);if(e("register %s key=%s (prev=%s)",c,m,b),S&&b&&m&&b!==m){let $=t.get(c);if($)try{$.dispose()}catch{}let C=s.get(c);if(C){try{C()}catch{}s.delete(c)}let j=Ns(c,f);t.set(c,j);let x=j.subscribe(()=>o());s.set(c,x)}else if(!S){let $=Ns(c,f);t.set(c,$);let C=$.subscribe(()=>o());s.set(c,C)}return r.set(c,m),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function Fa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function qa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ps(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function nd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function sd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Ba(e){let t=nt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):nd(n),a=sd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ps(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ps(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var od=Object.freeze({workspace_config:{default_workspace:null}});function Ua(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:od.workspace_config.default_workspace}}}function ja(e={}){let t=nt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ua(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ua(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function za(e){let t=nt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(m,b)=>{let S=s++,$=Date.now();n.set(S,{type:m,start_ts:$}),t("request start id=%d type=%s count=%d",S,m,r+1),a();let C=!1,j=()=>{C||(C=!0,n.delete(S),l())},x=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",S,m,Date.now()-$),j())},3e4);try{let K=await u(m,b),te=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",S,m,te),K}catch(K){let te=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",S,m,te,K),K}finally{clearTimeout(x),j()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,m])=>({id:f,type:m.type,elapsed_ms:u-m.start_ts}))}}}function J(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Pn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(Da),c;switch(l){case"created_desc":return c.sort(Ar),c;case"created_asc":return c.sort(Ia),c;case"updated_desc":return c.sort(La),c;case"priority":return c.sort(Oa),c;case"manual":default:{let u=r();return u?c.sort(Mn(u)):c.sort(Ar),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function er(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function pt(e){let t=er(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Tt(e,t){let r=er(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Fn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=er(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function qn(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let u of l)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(Ms(l,c,u.order),a);s(u,f);let m=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(m&&m.conflict){let b={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(b);let S=n(Ms(l,c,b.order),a);s(b,S);let $=await t("ui-order-set",{expected_revision:b.revision,entries:S});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Bn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fs(e,t){return!t||typeof e!="string"||e.length===0||Bn(t.visible_labels).includes(e)?!0:Bn(t.hidden_labels).includes(e)?!1:!Bn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Un(e,t){return Bn(e).filter(r=>Fs(r,t))}function dr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var ad={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Wa={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ha={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},id={review:"\u2713",skip:"\u2298"},ur={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function ld(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ga(e){let t=e&&e.fill||"none";return t==="none"?ur.none:e&&e.stale===!0?ur.stale:t==="dim"?ur.dim:e&&e.glyph==="review"?ur.review:e&&e.glyph==="skip"?ur.skip:ur.done}function cd(e){if(!e||e.fill==="none"||!e.approval_state)return Ga(e);let t=[];return e.glyph==="review"?t.push(ur.review):e.glyph==="skip"&&t.push(ur.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function dd(e,t,r){let n=ad[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=id[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${u}>${a}</div>
      <div class=${c}>
        ${Wa[e]||e}
      </div>
    </div>
  `}function jn(e,t){if(!e||!e.stages)return"";let r=Ha[e.route]||Ha.spec_backed,n=e.stages,s=ld(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Wa[a]||a} ${a==="plan"?cd(n[a]||{}):Ga(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>dd(a,n[a]||{},a===s))}
    </div>
  `}function ud(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ya=2;function pd(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ya).join(", "),s=r.length-Ya,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function fd(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&dr(r,"route")){let a=n.route_source==="derived";s.push(i`<span
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
      </button>`),dr(r,"blocked")&&s.push(...pd(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&dr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function _d(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function md(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
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
  </span>`}function gd(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ma):r.children;return i`
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
        ${md(e)}
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
                  <span class=${_d(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function zn(e,t){let r=ud(e.priority);return i`
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
      ${fd(e,t)}
      ${e.workflow&&dr(t.policy||null,"stepper")?jn(e.workflow,e.status):""}
      ${gd(e,t)}
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
  `}function Va(e,t,r){return i`
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
  `}var hd=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],bd=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],vd=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function yd(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function Ka(e,t,r){return i`
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
        ${hd.map(n=>i`<option
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
        ${bd.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${yd(e,t,r)}
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
        ${vd.map(n=>i`<option
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
  `}var wd=200,kd={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},$d=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Za="beads-ui.board.sort",Xa=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function xd(){try{let e=window.localStorage.getItem(Za);if(e&&Xa.has(e))return e}catch{}return"created_desc"}function Qa(e,t){let r=nt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,m=t.closedRange||At,b=s?Pn(s,a):null,S=qn({transport:o,uiOrderStore:a}),$=[],C=[],j=[],x=[],K=[],te=[],H=!1,T=0,E=xd(),P=new Map,q=new Map,ce=new Map,ve=new Set,ie={search:"",priority:"",type:"",labels:[]},me=!1,Ie=null;function Re(U){return String(U.status||"open")==="open"}function He(U){let Z=String(U.status||"open");return Z==="open"||Z==="blocked"}function Ne(U){let Z=ie.search.trim().toLowerCase(),oe=ie.priority,le=ie.type,re=ie.labels;return U.filter(Te=>{if(Z){let Ve=String(Te.id||"").toLowerCase(),Xe=String(Te.title||"").toLowerCase();if(!Ve.includes(Z)&&!Xe.includes(Z))return!1}if(oe!==""&&String(Te.priority)!==oe||le!==""&&String(Te.issue_type||"")!==le)return!1;if(re.length>0){let Ve=Array.isArray(Te.labels)?Te.labels:[];if(!re.some(Xe=>Ve.includes(Xe)))return!1}return!0})}function Le(){let U=new Set;for(let Z of[$,C,j,x,K,te])for(let oe of Z){let le=Array.isArray(oe.labels)?oe.labels:[];for(let re of le)typeof re=="string"&&re.length>0&&U.add(re)}return Array.from(U).sort()}function be(){return ie.search.trim()!==""||ie.priority!==""||ie.type!==""||ie.labels.length>0}function fe(){try{if(b){let U=b.selectBoardColumn("tab:board:in-progress","in_progress",E),Z=b.selectBoardColumn("tab:board:blocked","blocked",E).filter(He),oe=new Set(U.map(we=>we.id)),le=b.selectBoardColumn("tab:board:ready","ready",E).filter(we=>Re(we)&&!oe.has(we.id)),re=b.selectBoardColumn("tab:board:resolved","resolved",E),Te=b.selectBoardColumn("tab:board:deferred","deferred",E),Ve=b.selectBoardColumn("tab:board:closed","closed").slice(0,wd),Xe=[...Z,...le,...U,...re,...Ve];ge(Xe);let Se=new Set;for(let we of Xe)we&&we.id&&!qs(we)&&Se.add(we.id);let Ge=!be();$=Ge?rn(Z,Se):Z,C=Ge?rn(le,Se):le,j=Ge?rn(U,Se):U,x=Ge?rn(re,Se):re,K=Te,T=Te.length,te=Ge?rn(Ve,Se):Ve,P=new Map;for(let we of $)P.set(we.id,"open");for(let we of C)P.set(we.id,"open");for(let we of j)P.set(we.id,"in_progress");for(let we of x)P.set(we.id,"resolved");for(let we of K)P.set(we.id,"deferred");for(let we of te)P.set(we.id,"closed");q=new Map;for(let we of $)q.set(we.id,"blocked-col");for(let we of C)q.set(we.id,"ready-col");for(let we of j)q.set(we.id,"in-progress-col");for(let we of x)q.set(we.id,"resolved-col");for(let we of te)q.set(we.id,"closed-col")}De()}catch{$=[],C=[],j=[],x=[],K=[],te=[],ce=new Map,De()}}function ge(U){let Z=new Map;for(let le of U)le&&le.id&&!Z.has(le.id)&&Z.set(le.id,le);let oe=new Map;for(let le of Z.values()){let re=qs(le);if(!re)continue;let Te=oe.get(re);Te||(Te=[],oe.set(re,Te)),Te.push({id:le.id,title:le.title,status:le.status,metadata:le.metadata,created_at:le.created_at,updated_at:le.updated_at})}ce=oe}function _e(U){let Z=ce.get(U)||[],oe=0;for(let re of Z)(re.status==="resolved"||re.status==="closed")&&(oe+=1);let le=Fn(Z);return{total:Z.length,count:oe,current:le,children:Z}}function Y(U){return!ve.has(U)}function G(U,Z){U.preventDefault(),U.stopPropagation(),ve.has(Z)?ve.delete(Z):ve.add(Z),De()}function Ae(U,Z){U.preventDefault(),U.stopPropagation(),n(Z)}function de(U,Z){U.preventDefault(),U.stopPropagation(),n(Z)}function pe(U,Z){Ie||n(Z)}function L(U,Z){U.preventDefault(),U.stopPropagation(),Sd(Z).then(oe=>{oe&&J("\uBCF5\uC0AC\uB428","success",1200)})}function R(U,Z){Ie=Z,U.dataTransfer&&(U.dataTransfer.setData("text/plain",Z),U.dataTransfer.effectAllowed="move"),U.target.classList.add("board-card--dragging")}function ae(U){U.target.classList.remove("board-card--dragging"),$t(),setTimeout(()=>{Ie=null},0)}function Ue(U){let Z=String(U.target.value||"");!Z||Z===m||(m=Z,u&&u(Z),De())}function Ce(){return l?l.get():null}function ye(U){let Z=c?c.get():null,oe=Z?Z.cleanup_failed:null;if(!oe||typeof oe!="object"||Array.isArray(oe))return null;let le=oe[U];return!le||typeof le!="object"||Array.isArray(le)?null:le}let $e={onCardClick:pe,onCopyId:L,onDragStart:R,onDragEnd:ae,onClosedRangeChange:Ue,rollupFor:_e,isExpanded:Y,onRollupToggle:G,onChildClick:Ae,onFromChipClick:de,cleanupFailureFor:ye,get policy(){return Ce()}};function Ze(U,Z){Ie||(V(),n(Z))}function qe(U,Z){U.preventDefault(),U.stopPropagation(),V(),n(Z)}let Qe={...$e,onCardClick:Ze,onChildClick:qe,onFromChipClick:qe,get policy(){return Ce()}};function O(U){let Z=U.target,oe=e.querySelector(".board-filter__labels");Z&&oe&&oe.contains(Z)||y()}function W(U){U.key==="Escape"&&y()}function B(){me||(me=!0,document.addEventListener("mousedown",O),document.addEventListener("keydown",W),De())}function y(){me&&(me=!1,document.removeEventListener("mousedown",O),document.removeEventListener("keydown",W),De())}function I(U){U.key==="Escape"&&V()}function N(){H||(H=!0,document.addEventListener("keydown",I),De())}function V(){H&&(H=!1,document.removeEventListener("keydown",I),De())}let Q={onClose:V,onOverlayClick(U){U.target===U.currentTarget&&V()}},Oe={onSearchInput(U){ie.search=String(U.target.value||""),fe()},onPriorityChange(U){ie.priority=String(U.target.value||""),fe()},onTypeChange(U){ie.type=String(U.target.value||""),fe()},onSortChange(U){let Z=String(U.target.value||"");if(!(!Xa.has(Z)||Z===E)){E=Z;try{window.localStorage.setItem(Za,Z)}catch{}fe()}},onDeferredToggle(){H?V():N()},onLabelMenuToggle(){me?y():B()},onLabelToggle(U){let Z=ie.labels.indexOf(U);Z===-1?ie.labels.push(U):ie.labels.splice(Z,1),fe()},onLabelClear(){ie.labels.length!==0&&(ie.labels=[],fe())},onNewIssue(){f&&f()}};function xe(){return i`
      <div class="board-view">
        ${Ka(ie,Oe,{sort_mode:E,deferred_popup_open:H,deferred_count:T,label_options:Le(),label_menu_open:me})}
        <div class="board-root">
          ${Br({title:"Blocked",id:"blocked-col",items:Ne($)},$e)}
          ${Br({title:"Ready",id:"ready-col",items:Ne(C)},$e)}
          ${Br({title:"In progress",id:"in-progress-col",items:Ne(j)},$e)}
          ${Br({title:"Resolved",id:"resolved-col",items:Ne(x)},$e)}
          ${Br({title:"Closed",id:"closed-col",items:Ne(te),is_closed:!0,closed_range:m},$e)}
        </div>
        ${H?Va({items:Ne(K),count:T},Qe,Q):""}
      </div>
    `}function De(){Be(xe(),e),We()}function We(){try{let U=e.querySelector("#deferred-popup");U&&!U.open&&(typeof U.showModal=="function"?U.showModal():U.setAttribute("open",""));let Z=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let oe of Z)Array.from(oe.querySelectorAll(".board-card")).forEach((re,Te)=>{re.tabIndex=Te===0?0:-1})}catch{}}async function st(U,Z){if(!o){J("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:U,status:Z}),J("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(oe){r("update-status failed: %o",oe),J("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function et(U){switch(U){case"blocked-col":return $;case"ready-col":return C;case"in-progress-col":return j;case"resolved-col":return x;default:return[]}}function ut(U,Z,oe){if(!o||!a)return;let le=et(U),re=le.find(Ge=>Ge.id===Z);if(!re)return;let Te=le.filter(Ge=>Ge.id!==Z),Ve=oe.closest?oe.closest(".board-card"):null,Xe=Te.length;if(Ve){let Ge=Ve.getAttribute("data-issue-id");if(Ge===Z)return;let we=Te.findIndex(dt=>dt.id===Ge);we>=0&&(Xe=we)}let Se=Te.slice();Se.splice(Xe,0,re),S.applyReorder(Z,Se,Xe)}function $t(){for(let U of Array.from(e.querySelectorAll(".board-column--drag-over")))U.classList.remove("board-column--drag-over")}let rt=null;e.addEventListener("dragover",U=>{U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move");let oe=U.target.closest(".board-column");oe&&oe!==rt&&(rt&&rt.classList.remove("board-column--drag-over"),oe.classList.add("board-column--drag-over"),rt=oe)}),e.addEventListener("dragleave",U=>{let Z=U.relatedTarget;(!Z||!e.contains(Z))&&rt&&(rt.classList.remove("board-column--drag-over"),rt=null)}),e.addEventListener("drop",U=>{U.preventDefault(),rt&&(rt.classList.remove("board-column--drag-over"),rt=null);let Z=U.target,oe=Z.closest(".board-column");if(!oe)return;let le=U.dataTransfer?.getData("text/plain")||"";if(!le)return;let re=oe.id,Te=q.get(le);if(Te&&Te===re){if($d.has(re)){if(E!=="manual"){J("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ut(re,le,Z)}return}let Ve=kd[re];if(!Ve){J("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}P.get(le)!==Ve&&st(le,Ve)}),e.addEventListener("keydown",U=>{let Z=U.target;if(!(Z instanceof HTMLElement))return;let oe=String(Z.tagName||"").toLowerCase();if(oe==="input"||oe==="textarea"||oe==="select"||oe==="button"||oe==="a"||Z.isContentEditable===!0)return;let le=Z.closest(".board-card");if(!le)return;let re=String(U.key||"");if(re==="Enter"||re===" "){U.preventDefault();let Se=le.getAttribute("data-issue-id");Se&&n(Se);return}if(re!=="ArrowUp"&&re!=="ArrowDown"&&re!=="ArrowLeft"&&re!=="ArrowRight")return;U.preventDefault();let Te=le.closest(".board-column");if(!Te)return;let Ve=Array.from(Te.querySelectorAll(".board-card")),Xe=Ve.indexOf(le);if(re==="ArrowDown"&&Xe<Ve.length-1){ot(le,Ve[Xe+1]);return}if(re==="ArrowUp"&&Xe>0){ot(le,Ve[Xe-1]);return}if(re==="ArrowLeft"||re==="ArrowRight"){let Se=Array.from(e.querySelectorAll(".board-column")),Ge=Se.indexOf(Te),we=re==="ArrowRight"?1:-1,dt=Ge+we;for(;dt>=0&&dt<Se.length;){let ht=Se[dt].querySelector(".board-card");if(ht){ot(le,ht);return}dt+=we}}});function ot(U,Z){try{U.tabIndex=-1,Z.tabIndex=0,Z.focus()}catch{}}let tt=null;b&&b.subscribe&&(tt=b.subscribe(()=>{try{fe()}catch{}}));let at=null;l&&l.subscribe&&(at=l.subscribe(()=>{try{fe()}catch{}}));let _t=null;return c&&c.subscribe&&(_t=c.subscribe(()=>{De()})),{async load(){r("load"),fe()},clear(){y(),V(),tt&&(tt(),tt=null),at&&(at(),at=null),_t&&(_t(),_t=null),e.replaceChildren(),$=[],C=[],j=[],x=[],K=[],te=[],P=new Map,q=new Map}}}function qs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function rn(e,t){return e.filter(r=>{let n=qs(r);return!(n&&t.has(n))})}async function Sd(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Tr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Yt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function pr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Ad(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Yt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Yt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function tr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Ad(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var ni="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var rr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],nn=[...rr,"reasoning_output_tokens"],Td=["implementation","review-consult"];function Bs(e){let t=0;for(let r of rr)t+=ft(e?.[r]);return t}function Ed(e){return!e||typeof e!="object"?!1:rr.some(t=>Number.isFinite(e[t]))}function Ja(e){return!e||typeof e!="object"?!1:nn.some(t=>Number.isFinite(e[t]))}function Cd(e){let t={};for(let r of nn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function ei(e){let t={};for(let r of nn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ti(e,t){return e==="codex"?ft(t.input_tokens)+ft(t.output_tokens):Bs(t)}function Rd(e){return e==="claude"?"Claude":"Codex"}function Id(e){return`\u03C4 ${si(e)}`}function Ld(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${ft(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${ft(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(ni),o.join(`
`)}function gt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Rd(r)} ${Id(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Ld(r,n)})}return t}function Wn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of nn)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=ft(l.breakdown[c])+ft(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Us(e){return!e||typeof e!="object"?null:It({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Od(e){return e==="codex"?"codex":"claude"}function fr(){return{subtotal:0,breakdown:Cd(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Hn(e,t,r){e.subtotal+=t.subtotal;for(let n of nn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=ft(e.breakdown[n])+ft(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ri(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function si(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ur(e){return Ed(e)?`\u03C4 ${si(Bs(e))}`:null}function qt(e){let t=Ur(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function jr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Bs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(ni),r.join(`
`)}function It(e,t){let r={claude:fr(),codex:fr()},n={orchestrator:{claude:fr(),codex:fr()},implementation:{claude:fr(),codex:fr()},"review-consult":{claude:fr(),codex:fr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(Ja(c)){let f=Od(l.runner),m=ei(c),b={provider:f,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:ti(f,m)};m.replayed===!0&&(b.replayed=!0),typeof l.model=="string"&&(b.model=l.model),typeof l.session_id=="string"&&(b.session_id=l.session_id),Hn(r[f],b,!0),Hn(n.orchestrator[f],b,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!Td.includes(f.role)||!Ja(f.usage))continue;let m=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let b=ei(f.usage),S={provider:"codex",role:f.role,attempt_id:String(l.attempt_id||""),usage:b,subtotal:ti("codex",b)};S.receipt_id=m,typeof f.model=="string"&&(S.model=f.model),typeof f.session_id=="string"?S.session_id=f.session_id:typeof f.thread_id=="string"&&(S.session_id=f.thread_id),typeof f.turn_id=="string"&&(S.turn_id=f.turn_id),typeof f.completed_at=="string"&&(S.completed_at=f.completed_at),b.replayed===!0&&(S.replayed=!0),Hn(r.codex,S,!1),Hn(n[S.role].codex,S,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let u=ri(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[l]=u}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[l][u];f.legs.length>0&&(c[u]={...ri(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:fi,setPrototypeOf:oi,isFrozen:Dd,getPrototypeOf:Md,getOwnPropertyDescriptor:Nd}=Object,{freeze:yt,seal:Lt,create:Vs}=Object,{apply:Ks,construct:Zs}=typeof Reflect<"u"&&Reflect;yt||(yt=function(t){return t});Lt||(Lt=function(t){return t});Ks||(Ks=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Zs||(Zs=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Gn=wt(Array.prototype.forEach),Pd=wt(Array.prototype.lastIndexOf),ai=wt(Array.prototype.pop),sn=wt(Array.prototype.push),Fd=wt(Array.prototype.splice),Vn=wt(String.prototype.toLowerCase),js=wt(String.prototype.toString),zs=wt(String.prototype.match),on=wt(String.prototype.replace),qd=wt(String.prototype.indexOf),Bd=wt(String.prototype.trim),Bt=wt(Object.prototype.hasOwnProperty),vt=wt(RegExp.prototype.test),an=Ud(TypeError);function wt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Ks(e,t,n)}}function Ud(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Zs(e,r)}}function Fe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Vn;oi&&oi(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Dd(t)||(t[n]=o),s=o)}e[s]=!0}return e}function jd(e){for(let t=0;t<e.length;t++)Bt(e,t)||(e[t]=null);return e}function nr(e){let t=Vs(null);for(let[r,n]of fi(e))Bt(e,r)&&(Array.isArray(n)?t[r]=jd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=nr(n):t[r]=n);return t}function ln(e,t){for(;e!==null;){let n=Nd(e,t);if(n){if(n.get)return wt(n.get);if(typeof n.value=="function")return wt(n.value)}e=Md(e)}function r(){return null}return r}var ii=yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Hs=yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ws=yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),zd=yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Gs=yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Hd=yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),li=yt(["#text"]),ci=yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ys=yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),di=yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Yn=yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Wd=Lt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Gd=Lt(/<%[\w\W]*|[\w\W]*%>/gm),Yd=Lt(/\$\{[\w\W]*/gm),Vd=Lt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Kd=Lt(/^aria-[\-\w]+$/),_i=Lt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Zd=Lt(/^(?:\w+script|data):/i),Xd=Lt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),mi=Lt(/^html$/i),Qd=Lt(/^[a-z][.\w]*(-[.\w]+)+$/i),ui=Object.freeze({__proto__:null,ARIA_ATTR:Kd,ATTR_WHITESPACE:Xd,CUSTOM_ELEMENT:Qd,DATA_ATTR:Vd,DOCTYPE_NAME:mi,ERB_EXPR:Gd,IS_ALLOWED_URI:_i,IS_SCRIPT_OR_DATA:Zd,MUSTACHE_EXPR:Wd,TMPLIT_EXPR:Yd}),cn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Jd=function(){return typeof window>"u"?null:window},eu=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},pi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function gi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Jd(),t=z=>gi(z);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==cn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:b,trustedTypes:S}=e,$=c.prototype,C=ln($,"cloneNode"),j=ln($,"remove"),x=ln($,"nextSibling"),K=ln($,"childNodes"),te=ln($,"parentNode");if(typeof a=="function"){let z=r.createElement("template");z.content&&z.content.ownerDocument&&(r=z.content.ownerDocument)}let H,T="",{implementation:E,createNodeIterator:P,createDocumentFragment:q,getElementsByTagName:ce}=r,{importNode:ve}=n,ie=pi();t.isSupported=typeof fi=="function"&&typeof te=="function"&&E&&E.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:me,ERB_EXPR:Ie,TMPLIT_EXPR:Re,DATA_ATTR:He,ARIA_ATTR:Ne,IS_SCRIPT_OR_DATA:Le,ATTR_WHITESPACE:be,CUSTOM_ELEMENT:fe}=ui,{IS_ALLOWED_URI:ge}=ui,_e=null,Y=Fe({},[...ii,...Hs,...Ws,...Gs,...li]),G=null,Ae=Fe({},[...ci,...Ys,...di,...Yn]),de=Object.seal(Vs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),pe=null,L=null,R=Object.seal(Vs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ae=!0,Ue=!0,Ce=!1,ye=!0,$e=!1,Ze=!0,qe=!1,Qe=!1,O=!1,W=!1,B=!1,y=!1,I=!0,N=!1,V="user-content-",Q=!0,Oe=!1,xe={},De=null,We=Fe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),st=null,et=Fe({},["audio","video","img","source","image","track"]),ut=null,$t=Fe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",ot="http://www.w3.org/2000/svg",tt="http://www.w3.org/1999/xhtml",at=tt,_t=!1,U=null,Z=Fe({},[rt,ot,tt],js),oe=Fe({},["mi","mo","mn","ms","mtext"]),le=Fe({},["annotation-xml"]),re=Fe({},["title","style","font","a","script"]),Te=null,Ve=["application/xhtml+xml","text/html"],Xe="text/html",Se=null,Ge=null,we=r.createElement("form"),dt=function(h){return h instanceof RegExp||h instanceof Function},ht=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ge&&Ge===h)){if((!h||typeof h!="object")&&(h={}),h=nr(h),Te=Ve.indexOf(h.PARSER_MEDIA_TYPE)===-1?Xe:h.PARSER_MEDIA_TYPE,Se=Te==="application/xhtml+xml"?js:Vn,_e=Bt(h,"ALLOWED_TAGS")?Fe({},h.ALLOWED_TAGS,Se):Y,G=Bt(h,"ALLOWED_ATTR")?Fe({},h.ALLOWED_ATTR,Se):Ae,U=Bt(h,"ALLOWED_NAMESPACES")?Fe({},h.ALLOWED_NAMESPACES,js):Z,ut=Bt(h,"ADD_URI_SAFE_ATTR")?Fe(nr($t),h.ADD_URI_SAFE_ATTR,Se):$t,st=Bt(h,"ADD_DATA_URI_TAGS")?Fe(nr(et),h.ADD_DATA_URI_TAGS,Se):et,De=Bt(h,"FORBID_CONTENTS")?Fe({},h.FORBID_CONTENTS,Se):We,pe=Bt(h,"FORBID_TAGS")?Fe({},h.FORBID_TAGS,Se):nr({}),L=Bt(h,"FORBID_ATTR")?Fe({},h.FORBID_ATTR,Se):nr({}),xe=Bt(h,"USE_PROFILES")?h.USE_PROFILES:!1,ae=h.ALLOW_ARIA_ATTR!==!1,Ue=h.ALLOW_DATA_ATTR!==!1,Ce=h.ALLOW_UNKNOWN_PROTOCOLS||!1,ye=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,$e=h.SAFE_FOR_TEMPLATES||!1,Ze=h.SAFE_FOR_XML!==!1,qe=h.WHOLE_DOCUMENT||!1,W=h.RETURN_DOM||!1,B=h.RETURN_DOM_FRAGMENT||!1,y=h.RETURN_TRUSTED_TYPE||!1,O=h.FORCE_BODY||!1,I=h.SANITIZE_DOM!==!1,N=h.SANITIZE_NAMED_PROPS||!1,Q=h.KEEP_CONTENT!==!1,Oe=h.IN_PLACE||!1,ge=h.ALLOWED_URI_REGEXP||_i,at=h.NAMESPACE||tt,oe=h.MATHML_TEXT_INTEGRATION_POINTS||oe,le=h.HTML_INTEGRATION_POINTS||le,de=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&dt(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(de.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&dt(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(de.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(de.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),$e&&(Ue=!1),B&&(W=!0),xe&&(_e=Fe({},li),G=[],xe.html===!0&&(Fe(_e,ii),Fe(G,ci)),xe.svg===!0&&(Fe(_e,Hs),Fe(G,Ys),Fe(G,Yn)),xe.svgFilters===!0&&(Fe(_e,Ws),Fe(G,Ys),Fe(G,Yn)),xe.mathMl===!0&&(Fe(_e,Gs),Fe(G,di),Fe(G,Yn))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?R.tagCheck=h.ADD_TAGS:(_e===Y&&(_e=nr(_e)),Fe(_e,h.ADD_TAGS,Se))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?R.attributeCheck=h.ADD_ATTR:(G===Ae&&(G=nr(G)),Fe(G,h.ADD_ATTR,Se))),h.ADD_URI_SAFE_ATTR&&Fe(ut,h.ADD_URI_SAFE_ATTR,Se),h.FORBID_CONTENTS&&(De===We&&(De=nr(De)),Fe(De,h.FORBID_CONTENTS,Se)),Q&&(_e["#text"]=!0),qe&&Fe(_e,["html","head","body"]),_e.table&&(Fe(_e,["tbody"]),delete pe.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw an('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw an('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');H=h.TRUSTED_TYPES_POLICY,T=H.createHTML("")}else H===void 0&&(H=eu(S,s)),H!==null&&typeof T=="string"&&(T=H.createHTML(""));yt&&yt(h),Ge=h}},Zt=Fe({},[...Hs,...Ws,...zd]),zt=Fe({},[...Gs,...Hd]),Xt=function(h){let A=te(h);(!A||!A.tagName)&&(A={namespaceURI:at,tagName:"template"});let X=Vn(h.tagName),ue=Vn(A.tagName);return U[h.namespaceURI]?h.namespaceURI===ot?A.namespaceURI===tt?X==="svg":A.namespaceURI===rt?X==="svg"&&(ue==="annotation-xml"||oe[ue]):!!Zt[X]:h.namespaceURI===rt?A.namespaceURI===tt?X==="math":A.namespaceURI===ot?X==="math"&&le[ue]:!!zt[X]:h.namespaceURI===tt?A.namespaceURI===ot&&!le[ue]||A.namespaceURI===rt&&!oe[ue]?!1:!zt[X]&&(re[X]||!Zt[X]):!!(Te==="application/xhtml+xml"&&U[h.namespaceURI]):!1},mt=function(h){sn(t.removed,{element:h});try{te(h).removeChild(h)}catch{j(h)}},xt=function(h,A){try{sn(t.removed,{attribute:A.getAttributeNode(h),from:A})}catch{sn(t.removed,{attribute:null,from:A})}if(A.removeAttribute(h),h==="is")if(W||B)try{mt(A)}catch{}else try{A.setAttribute(h,"")}catch{}},Ot=function(h){let A=null,X=null;if(O)h="<remove></remove>"+h;else{let je=zs(h,/^[\r\n\t ]+/);X=je&&je[0]}Te==="application/xhtml+xml"&&at===tt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let ue=H?H.createHTML(h):h;if(at===tt)try{A=new b().parseFromString(ue,Te)}catch{}if(!A||!A.documentElement){A=E.createDocument(at,"template",null);try{A.documentElement.innerHTML=_t?T:ue}catch{}}let Me=A.body||A.documentElement;return h&&X&&Me.insertBefore(r.createTextNode(X),Me.childNodes[0]||null),at===tt?ce.call(A,qe?"html":"body")[0]:qe?A.documentElement:Me},Dt=function(h){return P.call(h.ownerDocument||h,h,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Mt=function(h){return h instanceof m&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof f)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},Ht=function(h){return typeof l=="function"&&h instanceof l};function Ee(z,h,A){Gn(z,X=>{X.call(t,h,A,Ge)})}let bt=function(h){let A=null;if(Ee(ie.beforeSanitizeElements,h,null),Mt(h))return mt(h),!0;let X=Se(h.nodeName);if(Ee(ie.uponSanitizeElement,h,{tagName:X,allowedTags:_e}),Ze&&h.hasChildNodes()&&!Ht(h.firstElementChild)&&vt(/<[/\w!]/g,h.innerHTML)&&vt(/<[/\w!]/g,h.textContent)||h.nodeType===cn.progressingInstruction||Ze&&h.nodeType===cn.comment&&vt(/<[/\w]/g,h.data))return mt(h),!0;if(!(R.tagCheck instanceof Function&&R.tagCheck(X))&&(!_e[X]||pe[X])){if(!pe[X]&&w(X)&&(de.tagNameCheck instanceof RegExp&&vt(de.tagNameCheck,X)||de.tagNameCheck instanceof Function&&de.tagNameCheck(X)))return!1;if(Q&&!De[X]){let ue=te(h)||h.parentNode,Me=K(h)||h.childNodes;if(Me&&ue){let je=Me.length;for(let _=je-1;_>=0;--_){let d=C(Me[_],!0);d.__removalCount=(h.__removalCount||0)+1,ue.insertBefore(d,x(h))}}}return mt(h),!0}return h instanceof c&&!Xt(h)||(X==="noscript"||X==="noembed"||X==="noframes")&&vt(/<\/no(script|embed|frames)/i,h.innerHTML)?(mt(h),!0):($e&&h.nodeType===cn.text&&(A=h.textContent,Gn([me,Ie,Re],ue=>{A=on(A,ue," ")}),h.textContent!==A&&(sn(t.removed,{element:h.cloneNode()}),h.textContent=A)),Ee(ie.afterSanitizeElements,h,null),!1)},p=function(h,A,X){if(I&&(A==="id"||A==="name")&&(X in r||X in we))return!1;if(!(Ue&&!L[A]&&vt(He,A))){if(!(ae&&vt(Ne,A))){if(!(R.attributeCheck instanceof Function&&R.attributeCheck(A,h))){if(!G[A]||L[A]){if(!(w(h)&&(de.tagNameCheck instanceof RegExp&&vt(de.tagNameCheck,h)||de.tagNameCheck instanceof Function&&de.tagNameCheck(h))&&(de.attributeNameCheck instanceof RegExp&&vt(de.attributeNameCheck,A)||de.attributeNameCheck instanceof Function&&de.attributeNameCheck(A,h))||A==="is"&&de.allowCustomizedBuiltInElements&&(de.tagNameCheck instanceof RegExp&&vt(de.tagNameCheck,X)||de.tagNameCheck instanceof Function&&de.tagNameCheck(X))))return!1}else if(!ut[A]){if(!vt(ge,on(X,be,""))){if(!((A==="src"||A==="xlink:href"||A==="href")&&h!=="script"&&qd(X,"data:")===0&&st[h])){if(!(Ce&&!vt(Le,on(X,be,"")))){if(X)return!1}}}}}}}return!0},w=function(h){return h!=="annotation-xml"&&zs(h,fe)},D=function(h){Ee(ie.beforeSanitizeAttributes,h,null);let{attributes:A}=h;if(!A||Mt(h))return;let X={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:G,forceKeepAttr:void 0},ue=A.length;for(;ue--;){let Me=A[ue],{name:je,namespaceURI:_,value:d}=Me,k=Se(je),v=d,F=je==="value"?v:Bd(v);if(X.attrName=k,X.attrValue=F,X.keepAttr=!0,X.forceKeepAttr=void 0,Ee(ie.uponSanitizeAttribute,h,X),F=X.attrValue,N&&(k==="id"||k==="name")&&(xt(je,h),F=V+F),Ze&&vt(/((--!?|])>)|<\/(style|title|textarea)/i,F)){xt(je,h);continue}if(k==="attributename"&&zs(F,"href")){xt(je,h);continue}if(X.forceKeepAttr)continue;if(!X.keepAttr){xt(je,h);continue}if(!ye&&vt(/\/>/i,F)){xt(je,h);continue}$e&&Gn([me,Ie,Re],he=>{F=on(F,he," ")});let ee=Se(h.nodeName);if(!p(ee,k,F)){xt(je,h);continue}if(H&&typeof S=="object"&&typeof S.getAttributeType=="function"&&!_)switch(S.getAttributeType(ee,k)){case"TrustedHTML":{F=H.createHTML(F);break}case"TrustedScriptURL":{F=H.createScriptURL(F);break}}if(F!==v)try{_?h.setAttributeNS(_,je,F):h.setAttribute(je,F),Mt(h)?mt(h):ai(t.removed)}catch{xt(je,h)}}Ee(ie.afterSanitizeAttributes,h,null)},se=function z(h){let A=null,X=Dt(h);for(Ee(ie.beforeSanitizeShadowDOM,h,null);A=X.nextNode();)Ee(ie.uponSanitizeShadowNode,A,null),bt(A),D(A),A.content instanceof o&&z(A.content);Ee(ie.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(z){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},A=null,X=null,ue=null,Me=null;if(_t=!z,_t&&(z="<!-->"),typeof z!="string"&&!Ht(z))if(typeof z.toString=="function"){if(z=z.toString(),typeof z!="string")throw an("dirty is not a string, aborting")}else throw an("toString is not a function");if(!t.isSupported)return z;if(Qe||ht(h),t.removed=[],typeof z=="string"&&(Oe=!1),Oe){if(z.nodeName){let d=Se(z.nodeName);if(!_e[d]||pe[d])throw an("root node is forbidden and cannot be sanitized in-place")}}else if(z instanceof l)A=Ot("<!---->"),X=A.ownerDocument.importNode(z,!0),X.nodeType===cn.element&&X.nodeName==="BODY"||X.nodeName==="HTML"?A=X:A.appendChild(X);else{if(!W&&!$e&&!qe&&z.indexOf("<")===-1)return H&&y?H.createHTML(z):z;if(A=Ot(z),!A)return W?null:y?T:""}A&&O&&mt(A.firstChild);let je=Dt(Oe?z:A);for(;ue=je.nextNode();)bt(ue),D(ue),ue.content instanceof o&&se(ue.content);if(Oe)return z;if(W){if(B)for(Me=q.call(A.ownerDocument);A.firstChild;)Me.appendChild(A.firstChild);else Me=A;return(G.shadowroot||G.shadowrootmode)&&(Me=ve.call(n,Me,!0)),Me}let _=qe?A.outerHTML:A.innerHTML;return qe&&_e["!doctype"]&&A.ownerDocument&&A.ownerDocument.doctype&&A.ownerDocument.doctype.name&&vt(mi,A.ownerDocument.doctype.name)&&(_="<!DOCTYPE "+A.ownerDocument.doctype.name+`>
`+_),$e&&Gn([me,Ie,Re],d=>{_=on(_,d," ")}),H&&y?H.createHTML(_):_},t.setConfig=function(){let z=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ht(z),Qe=!0},t.clearConfig=function(){Ge=null,Qe=!1},t.isValidAttribute=function(z,h,A){Ge||ht({});let X=Se(z),ue=Se(h);return p(X,ue,A)},t.addHook=function(z,h){typeof h=="function"&&sn(ie[z],h)},t.removeHook=function(z,h){if(h!==void 0){let A=Pd(ie[z],h);return A===-1?void 0:Fd(ie[z],A,1)[0]}return ai(ie[z])},t.removeHooks=function(z){ie[z]=[]},t.removeAllHooks=function(){ie=pi()},t}var hi=gi();var bi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},vi=e=>(...t)=>({_$litDirective$:e,values:t}),Kn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var dn=class extends Kn{constructor(t){if(super(t),this.it=ct,t.type!==bi.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ct||t==null)return this._t=void 0,this.it=t;if(t===$r)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};dn.directiveName="unsafeHTML",dn.resultType=1;var yi=vi(dn);function eo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Cr=eo();function Ti(e){Cr=e}var _n={exec:()=>null};function ze(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(kt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var tu=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),kt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},ru=/^(?:[ \t]*(?:\n|$))+/,nu=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,su=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,mn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ou=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,to=/(?:[*+-]|\d{1,9}[.)])/,Ei=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ci=ze(Ei).replace(/bull/g,to).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),au=ze(Ei).replace(/bull/g,to).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ro=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,iu=/^[^\n]+/,no=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,lu=ze(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",no).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),cu=ze(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,to).getRegex(),ts="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",so=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,du=ze("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",so).replace("tag",ts).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ri=ze(ro).replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ts).getRegex(),uu=ze(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ri).getRegex(),oo={blockquote:uu,code:nu,def:lu,fences:su,heading:ou,hr:mn,html:du,lheading:Ci,list:cu,newline:ru,paragraph:Ri,table:_n,text:iu},wi=ze("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ts).getRegex(),pu={...oo,lheading:au,table:wi,paragraph:ze(ro).replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",wi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ts).getRegex()},fu={...oo,html:ze(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",so).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_n,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ze(ro).replace("hr",mn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ci).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},_u=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,mu=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ii=/^( {2,}|\\)\n(?!\s*$)/,gu=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,rs=/[\p{P}\p{S}]/u,ao=/[\s\p{P}\p{S}]/u,Li=/[^\s\p{P}\p{S}]/u,hu=ze(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ao).getRegex(),Oi=/(?!~)[\p{P}\p{S}]/u,bu=/(?!~)[\s\p{P}\p{S}]/u,vu=/(?:[^\s\p{P}\p{S}]|~)/u,yu=ze(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",tu?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Di=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,wu=ze(Di,"u").replace(/punct/g,rs).getRegex(),ku=ze(Di,"u").replace(/punct/g,Oi).getRegex(),Mi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",$u=ze(Mi,"gu").replace(/notPunctSpace/g,Li).replace(/punctSpace/g,ao).replace(/punct/g,rs).getRegex(),xu=ze(Mi,"gu").replace(/notPunctSpace/g,vu).replace(/punctSpace/g,bu).replace(/punct/g,Oi).getRegex(),Su=ze("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Li).replace(/punctSpace/g,ao).replace(/punct/g,rs).getRegex(),Au=ze(/\\(punct)/,"gu").replace(/punct/g,rs).getRegex(),Tu=ze(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Eu=ze(so).replace("(?:-->|$)","-->").getRegex(),Cu=ze("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Eu).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Qn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ru=ze(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Qn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ni=ze(/^!?\[(label)\]\[(ref)\]/).replace("label",Qn).replace("ref",no).getRegex(),Pi=ze(/^!?\[(ref)\](?:\[\])?/).replace("ref",no).getRegex(),Iu=ze("reflink|nolink(?!\\()","g").replace("reflink",Ni).replace("nolink",Pi).getRegex(),ki=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,io={_backpedal:_n,anyPunctuation:Au,autolink:Tu,blockSkip:yu,br:Ii,code:mu,del:_n,emStrongLDelim:wu,emStrongRDelimAst:$u,emStrongRDelimUnd:Su,escape:_u,link:Ru,nolink:Pi,punctuation:hu,reflink:Ni,reflinkSearch:Iu,tag:Cu,text:gu,url:_n},Lu={...io,link:ze(/^!?\[(label)\]\((.*?)\)/).replace("label",Qn).getRegex(),reflink:ze(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Qn).getRegex()},Xs={...io,emStrongRDelimAst:xu,emStrongLDelim:ku,url:ze(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ki).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ze(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ki).getRegex()},Ou={...Xs,br:ze(Ii).replace("{2,}","*").getRegex(),text:ze(Xs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Zn={normal:oo,gfm:pu,pedantic:fu},un={normal:io,gfm:Xs,breaks:Ou,pedantic:Lu},Du={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},$i=e=>Du[e];function sr(e,t){if(t){if(kt.escapeTest.test(e))return e.replace(kt.escapeReplace,$i)}else if(kt.escapeTestNoEncode.test(e))return e.replace(kt.escapeReplaceNoEncode,$i);return e}function xi(e){try{e=encodeURI(e).replace(kt.percentDecode,"%")}catch{return null}return e}function Si(e,t){let r=e.replace(kt.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(kt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(kt.slashPipe,"|");return n}function pn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Mu(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ai(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function Nu(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Jn=class{constructor(e){Je(this,"options");Je(this,"rules");Je(this,"lexer");this.options=e||Cr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:pn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Nu(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=pn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:pn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=pn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=m,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let S=b,$=S.raw+`
`+r.join(`
`),C=this.blockquote($);o[o.length-1]=C,n=n.substring(0,n.length-S.raw.length)+C.raw,s=s.substring(0,s.length-S.text.length)+C.text;break}else if(b?.type==="list"){let S=b,$=S.raw+`
`+r.join(`
`),C=this.list($);o[o.length-1]=C,n=n.substring(0,n.length-b.raw.length)+C.raw,s=s.substring(0,s.length-S.raw.length)+C.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),b=e.split(`
`,1)[0],S=!m.trim(),$=0;if(this.options.pedantic?($=2,f=m.trimStart()):S?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=m.slice($),$+=t[1].length),S&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),c=!0),!c){let C=this.rules.other.nextBulletRegex($),j=this.rules.other.hrRegex($),x=this.rules.other.fencesBeginRegex($),K=this.rules.other.headingBeginRegex($),te=this.rules.other.htmlBeginRegex($);for(;e;){let H=e.split(`
`,1)[0],T;if(b=H,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),T=b):T=b.replace(this.rules.other.tabCharGlobal,"    "),x.test(b)||K.test(b)||te.test(b)||C.test(b)||j.test(b))break;if(T.search(this.rules.other.nonSpaceChar)>=$||!b.trim())f+=`
`+T.slice($);else{if(S||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(m)||K.test(m)||j.test(m))break;f+=`
`+b}!S&&!b.trim()&&(S=!0),u+=H+`
`,e=e.substring(H.length+1),m=T.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(m=>m.type==="space"),f=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Si(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Si(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=pn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Mu(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ai(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ai(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let f=[...n[0]][0].length,m=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let S=m.slice(1,-1);return{type:"em",raw:m,text:S,tokens:this.lexer.inlineTokens(S)}}let b=m.slice(2,-2);return{type:"strong",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ut=class Qs{constructor(t){Je(this,"tokens");Je(this,"options");Je(this,"state");Je(this,"inlineQueue");Je(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Cr,this.options.tokenizer=this.options.tokenizer||new Jn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:kt,block:Zn.normal,inline:un.normal};this.options.pedantic?(r.block=Zn.pedantic,r.inline=un.pedantic):this.options.gfm&&(r.block=Zn.gfm,this.options.breaks?r.inline=un.breaks:r.inline=un.gfm),this.tokenizer.rules=r}static get rules(){return{block:Zn,inline:un}}static lex(t,r){return new Qs(r).lex(t)}static lexInline(t,r){return new Qs(r).inlineTokens(t)}lex(t){t=t.replace(kt.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,m=t.slice(1),b;this.options.extensions.startInline.forEach(S=>{b=S.call({lexer:this},m),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},es=class{constructor(e){Je(this,"options");Je(this,"parser");this.options=e||Cr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(kt.notSpaceStart)?.[0],s=e.replace(kt.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${sr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=xi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+sr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=xi(e);if(s===null)return sr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${sr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:sr(e.text)}},lo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jt=class Js{constructor(t){Je(this,"options");Je(this,"renderer");Je(this,"textRenderer");this.options=t||Cr,this.options.renderer=this.options.renderer||new es,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new lo}static parse(t,r){return new Js(r).parse(t)}static parseInline(t,r){return new Js(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Xn,fn=(Xn=class{constructor(e){Je(this,"options");Je(this,"block");this.options=e||Cr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?jt.parse:jt.parseInline}},Je(Xn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Je(Xn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Xn),Pu=class{constructor(...e){Je(this,"defaults",eo());Je(this,"options",this.setOptions);Je(this,"parse",this.parseMarkdown(!0));Je(this,"parseInline",this.parseMarkdown(!1));Je(this,"Parser",jt);Je(this,"Renderer",es);Je(this,"TextRenderer",lo);Je(this,"Lexer",Ut);Je(this,"Tokenizer",Jn);Je(this,"Hooks",fn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new es(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Jn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new fn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];fn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&fn.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,u);return c.call(s,m)})();let f=l.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,u);return m===!1&&(m=await c.apply(s,u)),m})();let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ut.lex(e,t??this.defaults)}parser(e,t){return jt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?jt.parse:jt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?jt.parse:jt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+sr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Er=new Pu;function Ke(e,t){return Er.parse(e,t)}Ke.options=Ke.setOptions=function(e){return Er.setOptions(e),Ke.defaults=Er.defaults,Ti(Ke.defaults),Ke};Ke.getDefaults=eo;Ke.defaults=Cr;Ke.use=function(...e){return Er.use(...e),Ke.defaults=Er.defaults,Ti(Ke.defaults),Ke};Ke.walkTokens=function(e,t){return Er.walkTokens(e,t)};Ke.parseInline=Er.parseInline;Ke.Parser=jt;Ke.parser=jt.parse;Ke.Renderer=es;Ke.TextRenderer=lo;Ke.Lexer=Ut;Ke.lexer=Ut.lex;Ke.Tokenizer=Jn;Ke.Hooks=fn;Ke.parse=Ke;var Am=Ke.options,Tm=Ke.setOptions,Em=Ke.use,Cm=Ke.walkTokens,Rm=Ke.parseInline;var Im=jt.parse,Lm=Ut.lex;function _r(e){let t=Ke.parse(e),r=hi.sanitize(t);return yi(r)}function or(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function zr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ns(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Fu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},qu=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Bu=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function mr(e){return!!e&&typeof e=="object"}function co(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Fi(e,t){let r=co(e),n=co(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Uu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>mr(s)&&typeof s.text=="string"?s.text:"").join(""):mr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function ju(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Fu[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=co(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Fi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=Fi(mr(l)?l.old_string:"",mr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function qi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Bi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=qu.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Bu.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function zu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(mr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Bi(o.text));else if(o.type==="thinking"){let a=qi(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=ju(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(mr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Uu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Hu(e){if(e.type==="item.completed"&&mr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Bi(t.text)];if(t.type==="reasoning"){let r=qi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Wu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ui(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!mr(o))continue;let a=Wu(o)?Hu(o):zu(o,r);for(let l of a)t.push(l)}return t}var Gu=5,Yu=10,Vu=/Task\s+#(\d+)/,Ku=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Zu=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ss(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Xu(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Qu(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Ju(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Vu.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function ep(e){if(e.tool==="Bash"){let t=e.command||"";return Ku.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Zu.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function tp(e){let t=e.filter(s=>s.kind==="tool").slice(-Yu),r=new Map;t.forEach((s,o)=>{let a=ep(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function rp(e){let t=Qu(e);if(t)return{text:t,guess:!1};let r=Ju(e);if(r)return{text:r,guess:!1};let n=tp(e);return n?{text:n,guess:!0}:null}function np(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Tt(e,t)}function os(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},l=!0,c=new Set,u=new Set,f=null,m=null,b=!1,S=!1,$=!1,C=null,j=null;function x(){b=!1,S=!1,$=!1,C=null,j=null}async function K(L){if(r){S=!0,$=!1,be();try{let R=await Promise.resolve(r("get-attempt-prompt",{attempt_id:L}));if(o!==L)return;!R||typeof R!="object"||Array.isArray(R)?$=!0:(C=R,j=L)}catch{o===L&&($=!0)}finally{o===L&&(S=!1,be())}}}function te(){if(b=!b,b&&o&&j!==o){K(o);return}be()}function H(){if(!b)return"";let L=zr({loading:S,error:$});if(L)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${L}
      </div>`;if(!C)return"";if(C.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let R=ns(C.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${R?i`<div class="prompt-block__meta">${R} 발송</div>`:""}
      ${typeof C.task_prompt=="string"?or("\uACFC\uC5C5 (user)",C.task_prompt):""}
      ${typeof C.system_prompt=="string"?or("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",C.system_prompt):""}
    </div>`}function T(){if(!o||!n)return[];let L=n.get(o);return Ui(L?L.lines:[])}function E(){if(!o||!n)return null;let L=n.get(o),R=L?L.last_event_at:null;return typeof R=="number"?R:null}function P(){return a.status==="running"}function q(){if(P()&&o){m||(m=setInterval(()=>be(),1e3));return}ce()}function ce(){m&&(clearInterval(m),m=null)}function ve(L){let R=[],ae=0;for(;ae<L.length;){let Ue=L[ae];if(Ue.kind==="tool"){let Ce=ae;for(;Ce<L.length&&L[Ce].kind==="tool"&&L[Ce].tool===Ue.tool;)Ce+=1;if(Ce-ae>=Gu&&!u.has(ae)){R.push({kind:"group",idx:ae,tool:Ue.tool||"",lines:L.slice(ae,Ce).map((ye,$e)=>({idx:ae+$e,line:ye}))}),ae=Ce;continue}}R.push({kind:"line",idx:ae,line:Ue}),ae+=1}return R}function ie(L){for(let R=L.length-1;R>=0;R-=1){let ae=L[R];if(ae.kind==="result"||ae.kind==="error")return null;if(ae.kind==="tool"&&!Object.hasOwn(ae,"result"))return ae}return null}function me(L){for(let R=L.length-1;R>=0;R-=1)if(L[R].kind==="thinking")return L[R];return null}function Ie(L,R){if(R.kind==="gate")return i`<div class="sv__gate">${R.text}</div>`;if(R.kind==="phase")return i`<div class="sv__phase">${R.text}</div>`;if(R.kind==="result")return i`<div
        class="sv__result${R.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${R.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${_r(R.text||(R.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(R.kind==="thinking"){let ae=c.has(L);return i`<div
        class="sv__think${ae?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ge(L)}
      >
        <span class="sv__think-line">💭 ${ss(R.text)}</span>
        ${ae?i`<pre class="sv__think-expand">${R.text}</pre>`:""}
      </div>`}if(R.kind==="error")return i`<div class="sv__error">⛔ ${R.text}</div>`;if(R.kind==="blocker")return i`<div class="sv__error">⛔ ${R.text}</div>`;if(R.kind==="tool"){let ae=c.has(L),Ue=R.tool==="Bash"?Xu(R.command):0,Ce=R.tool==="Bash"?Ue>1?ss(R.command):R.command:R.path||R.command||"";return i`<div
        class="sv__tool${ae?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ge(L)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${R.icon}</span>
          <span class="sv__tool-name">${R.tool}</span>
          ${Ce?i`<span class="sv__tool-detail">${Ce}</span>`:""}
          ${Ue>1?i`<span class="sv__tool-more">⋯ ${Ue}줄</span>`:""}
          ${typeof R.added=="number"?i`<span class="sv__diff-add">+${R.added}</span>`:""}
          ${typeof R.removed=="number"?i`<span class="sv__diff-del">−${R.removed}</span>`:""}
          ${R.result?i`<span class="sv__tool-ok">→ ${R.result}</span>`:""}
        </span>
        ${ae?i`<pre class="sv__tool-expand">${Re(R)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${_r(R.text||"")}</div>`}function Re(L){let R=[];if(L.tool==="Bash"&&typeof L.command=="string"&&L.command.length>0)R.push(L.command);else if(L.input!==void 0)try{R.push(`input: ${JSON.stringify(L.input,null,2)}`)}catch{}return typeof L.output=="string"&&L.output.length>0&&R.push(`output:
${L.output}`),R.join(`

`)}function He(){if(!o)return i``;let L=T(),R=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ae=a.session_id||"",Ue=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,Ce=P(),ye=Ce?np(E(),Date.now()):"",$e=Ce?ie(L):null,Ze=Ce?me(L):null,qe=rp(L);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${qe?i`<span
              class="sv__stage${qe.guess?" sv__stage--guess":""}"
              title=${qe.text}
              >${qe.text}</span
            >`:""}
        ${Ce?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ye?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ye}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ye?i`<span class="sv__live-ago">${ye}</span>`:""}</span
            >`:""}
        ${ae?i`<button
              type="button"
              class="sv__session"
              title=${ae}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ae}`}
              @click=${()=>Y(ae)}
            >
              ⧉ ${ae.slice(0,8)}
            </button>`:""}
        ${R?i`<span class="sv__meta">${R}</span>`:""}
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
          aria-label=${Ue}
          @click=${_e}
        >
          <span class="sv__follow-full">⇣ ${Ue}</span>
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
      ${H()}
      <div class="sv__body">
        ${L.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:ve(L).map(Qe=>Qe.kind==="group"?Ne(Qe):Ie(Qe.idx,Qe.line))}
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
    </div>`}function Ne(L){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Le(L.idx)}
    >
      <span class="sv__group-icon">${L.lines[0].line.icon}</span>
      <span class="sv__group-name">${L.tool}</span>
      <span class="sv__group-count">${L.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Le(L){u.add(L),be()}function be(){Be(He(),e),q(),l&&fe()}function fe(){let L=e.querySelector(".sv__body");L&&(L.scrollTop=L.scrollHeight)}function ge(L){c.has(L)?c.delete(L):c.add(L),be()}function _e(){l=!l,be()}function Y(L){Tr(L).then(R=>{R?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function G(L){!o||!L||(a={...a,...L},be())}function Ae(L){let R=L.target;if(!R||!R.classList||!R.classList.contains("sv__body"))return;!(R.scrollHeight-R.scrollTop-R.clientHeight<=4)&&l&&(l=!1,be())}e.addEventListener("scroll",Ae,!0);function de(L){let R=L&&L.attempt_id;R&&(o=R,a=L.meta||{},l=!0,c.clear(),u.clear(),x(),!f&&n&&(f=n.subscribe(be)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),be())}function pe(){let L=o;o=null,c.clear(),u.clear(),x(),ce(),r&&L&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${L}`})).catch(()=>{}),Be(i``,e),s&&s()}return{open:de,updateMeta:G,close:pe,isOpen(){return o!==null},destroy(){ce(),f&&(f(),f=null),e.removeEventListener("scroll",Ae,!0),o=null,Be(i``,e)}}}function gn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=ji(t.spec_id),s=ji(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ji(e){return typeof e=="string"?e.trim():""}function sp(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function op(e){let t=e&&e.metadata||{},r=gn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:sp(t)?null:"plan_pending"}),n}function zi(e,t){let r=op(e);return i`
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
  `}var ap="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",ip=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,lp=/^\*\*결론\*\* — (.+)$/;function as(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==ap)return null;let r=ip.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?lp.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",u=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Hi=20;function Wi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function cp(e){return e.length>Hi?`${e.slice(0,Hi)}\u2026`:e}function dp(e,t,r,n){let s=`${t.lane} ${cp(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${Wi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${_r(t.body)}
        </div>`:""}
  </div>`}function up(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Wi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${_r(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Gi(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let u=as(typeof c.text=="string"?c.text:"");return u?dp(c,u,t,s.has(c.id)):up(c)})}
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
  `}var pp=["codex","opus","fable","self","skip"],fp=["codex","fable","skip"],_p=["low","medium","high","xhigh"],mp=["standard","fast_track"],Rr=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],po=["impl_runtime","orchestration_model"],hn=[{id:"worker-detail",label:"\uC6CC\uCEE4 \uC0C1\uC138",keys:["orchestration_effort","orchestration_speed"]},{id:"implementation-detail",label:"\uAD6C\uD604 \uC0C1\uC138",keys:["impl_model","impl_effort"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]}],fo={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Yi={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},gp=["self","skip"],hp="opus",_o={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function mo(e){let t=fo[e]||{title:e};return i`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?i`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function bp(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:_o[e]||"(\uAE30\uBCF8)"}function Hr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ir(e){if(!Hr(e)||!Hr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Hr(r)&&Hr(r.models));return t.length>0?t:null}function uo(e){return{value:e,label:e}}function go(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Vi(e,t,r=null){let n=Ir(e);if(!n)return t?[{label:null,options:[uo(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,l])=>({label:a,options:Object.keys(l.models).map(uo)})),o=s.some(a=>a.options.some(l=>l.value===t));return t&&!o?[go(t),...s]:s}function gr(e,t){let r={label:null,options:e.map(uo)};return t&&!e.includes(t)?[go(t),r]:[r]}function ar(e,t){let r=Ir(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function ho(e,t){return Hr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function vp(e,t){return Hr(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():ho(e,t)}function yp(e,t){let r=Ir(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return vp(n,n.models[t]);return[]}function wp(e,t){let r=Ir(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function bo(e,t){let r=Ir(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return ho(n,n.models[t]);return[]}function Xi(e){let t=Ir(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of ho(n,s))r.includes(o)||r.push(o);return r}function Qi(e,t){if(!t)return Xi(e);let n=Ir(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of bo(e,o))s.includes(a)||s.push(a);return s}function ls(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ar(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?bo(t,n.impl_model):Qi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Wr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||hp,a=r("impl_model"),l=r("impl_runtime"),c=l==="claude"||l==="codex"?l:l==="inherit"?s===void 0?ar(n,o):s:null;return Rr.map(u=>{let f=t(u),m,b=!1;return u==="orchestration_model"?m=Vi(n,f):u==="impl_runtime"?m=gr(["inherit","claude","codex"],f):u==="impl_model"?(m=c?Vi(n,f,c):f?[go(f)]:[],b=l==="inherit"&&c===null):u==="orchestration_effort"?m=gr(yp(n,o),f):u==="orchestration_speed"?m=kp(wp(n,o),f):u==="impl_effort"?(m=gr(a?bo(n,a):c?Qi(n,c):Xi(n),f),b=l==="inherit"&&c===null):u==="plan_review_model"?m=gr(fp,f):Object.hasOwn(Yi,u)?(m=gr(_p,f),b=gp.includes(r(Yi[u]))):m=gr(pp,f),{key:u,groups:m,selected:f,disabled:b,runner:u==="orchestration_model"?ar(n,o):null}})}function is(e,t,r){return i`
    ${typeof r=="string"?i`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Ki(s,t)):i`<optgroup label=${n.label}>
            ${n.options.map(s=>Ki(s,t))}
          </optgroup>`)}
  `}function kp(e,t){return gr(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Ki(e,t){return i`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Zi(e,t,r,n,s,o,a){return i`
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
  `}function $p(e,t,r,n){return e.some(s=>t(s))?"\uC774\uC288 \uD540":e.some(s=>r(s))?`\uD504\uB9AC\uC14B \u300C${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"}\u300D`:"\uAE30\uBCF8"}function xp(e,t,r){let n=[t("orchestration_model")||"opus"],s=t("orchestration_effort"),o=t("orchestration_speed");s&&n.push(`effort ${s}`),o&&o!=="default"&&n.push(`speed ${o==="fast"?"Fast":o}`);let a=`${t("impl_runtime")||"inherit"} \xB7 ${t("impl_model")||"auto"}`,l=[["\uC2A4\uD399","spec_review_model","spec_review_effort"],["\uACC4\uD68D","plan_review_model","plan_review_effort"],["\uAD6C\uD604","impl_review_model","impl_review_effort"]].map(([u,f,m])=>{let b=t(f)||"codex",S=t(m);return`${u} ${b}${S?`/${S}`:""}`}),c=[{id:"worker",label:"\uC6CC\uCEE4",keys:Rr.slice(0,3),value:n.join(" \xB7 ")},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_runtime","impl_model","impl_effort"],value:a},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"],value:l.join(" \xB7 ")}];return i`<section
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
              >${$p(u.keys,e,t,r)}</span
            >
          </span>
        </div>`)}
  </section>`}function Ji(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},l=$=>typeof o[$]=="string"?o[$]:"",c=$=>{let C=l($);return C||(typeof a[$]=="string"?a[$]:"")},u=Wr({selectedOf:l,effectiveOf:c,runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard",m=new Map(u.map($=>[$.key,$])),b=hn.flatMap($=>$.keys).filter($=>l($)).length,S=$=>{let C=m.get($);return C?Zi(C.key,is(C.groups,C.selected,bp(C.key,a,s)),C.selected,!!C.selected,C.disabled,C.runner,t):""};return i`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${xp(l,c,s)}
    <section class="exec-settings-core" data-exec-settings-core>
      ${Zi("workflow_mode",is(gr(mp,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
      ${po.map(S)}
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
            ${$.keys.map(S)}
          </section>`)}
    </details>
  `}function Sp(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function el(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c($){$.key==="Escape"&&s&&($.preventDefault(),b())}document.addEventListener("keydown",c);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Sp(s)}</span
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
    `:i``}function f(){Be(u(),e)}async function m($,C={}){s=$,o="loading",a="",l="",f();let j=r?r():"";if(!j){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let x="/api/doc?workspace="+encodeURIComponent(j)+"&path="+encodeURIComponent($);try{let K=await n(x),te=await K.json().catch(()=>({}));if(!K.ok||!te||te.ok!==!0){if(te?.error==="not_found"&&C.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(te&&te.error||K.status)+")",f();return}a=String(te.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){s=null,Be(i``,e)}function S(){document.removeEventListener("keydown",c),b()}return{open:m,close:b,destroy:S}}var Ap=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],nl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Tp(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Ep(e){let t=gt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Ur(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${nl}
          >부분 집계</span
        >`:""}`}function tl(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function rl(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?sl(t):""}function Cp(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=gt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
        ${rl(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${rl(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function Rp(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Ap,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Tp(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${nl}</span>`:""}
  </div>`}var Ip={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function sl(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Lp(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function ol(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let m=typeof u.session_id=="string"&&u.session_id.length>0,b=o.has(u.attempt_id),S=m&&!b,$=m?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!S}
      title=${$}
      @click=${C=>{C.stopPropagation(),S&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let m=u.cause_detail,b=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:u.cause;return i`<div class="detail-session__cause" title=${b}>
      ${u.cause}
    </div>`},c=u=>{let f=tl(Us(u));if(gt(f).length===0&&!Ur(u.usage))return"";let m=s.has(u.attempt_id);return i`<button
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
      세션 이력${Ep(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=Us(u),m=tl(f),b=gt(m);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Ip[u.status||""]||"\xB7"}</span
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
            ${b.length>0?b.map(S=>i`<span
                      class="detail-session__usage"
                      title=${S.tooltip}
                      >${S.label}</span
                    >`):Ur(u.usage)?i`<span class="detail-session__usage"
                    >${Ur(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${sl(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${l(u)} ${Lp(u)}
          ${s.has(u.attempt_id)&&u.usage?Rp(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Cp(f)}
        </div>`})}
    </div>
  `}function al(e,t={}){return i`
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
          ${Op(e)}
        </div>`:""}
  `}function Op(e){let t=zr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?or("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=ns(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?or("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?or("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Dp=["open","in_progress","deferred","resolved","closed"],Mp=[0,1,2,3,4];function il(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,m={},b="",S=!1,$=!1,C=!1,j="",x="",K="";function te(){$=!1,C=!1,j="",x="",K=""}let H=[],T=null,E=null,P=!1,q="",ce=!1,ve=0,ie=new Set;function me(){H=[],T=null,E=null,P=!1,q="",ce=!1,ve+=1,ie.clear()}async function Ie(d){if(!s)return;let k=++ve;try{let v=await Promise.resolve(s("get-comments",{id:d}));if(k!==ve||d!==u)return;H=Array.isArray(v)?v:[],P=!1}catch{if(k!==ve||d!==u)return;P=!0}_()}function Re(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(T!==u){T=u,E=d,Ie(u);return}d!==null&&d!==E&&(E=d,Ie(u))}function He(d){ie.has(d)?ie.delete(d):ie.add(d),_()}function Ne(d){let k=q.trim().length===0;q=d,k!==(d.trim().length===0)&&_()}async function Le(){let d=q.trim();if(!s||!u||d.length===0||ce)return;let k=u;ce=!0,_();let v=!1;try{let F=await Promise.resolve(s("add-comment",{id:k,text:d}));Array.isArray(F)&&F.length>0&&(v=!0,k===u&&(H=F,P=!1,q="",E=F.length))}catch{v=!1}v||J("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),k===u&&(ce=!1),_()}let be={onToggle:He,onDraftInput:Ne,onSubmit:Le},fe=document.createElement("div");fe.className="md-viewer-root",document.body.appendChild(fe);let ge=el(fe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),_e=document.createElement("div");_e.className="session-log-root",document.body.appendChild(_e);let Y=os(_e,{transport:s?(d,k)=>Promise.resolve(s(d,k)):void 0,sessionLogStore:c}),G=!1,Ae=!1,de=!1,pe=null,L=null,R=0;function ae(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function Ue(){G=!1,Ae=!1,de=!1,pe=null,L=null,R+=1}async function Ce(d){if(!s)return;let k=++R;Ae=!0,de=!1,_();try{let v=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(k!==R)return;!v||typeof v!="object"||Array.isArray(v)?de=!0:(pe=v,L=ae(d))}catch{k===R&&(de=!0)}finally{k===R&&(Ae=!1,_())}}function ye(){if(G=!G,G&&u&&L!==ae(u)){pe=null,Ce(u);return}_()}function $e(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(v=>v&&v.bead_id===u).sort((v,F)=>(F.started_at||0)-(v.started_at||0)).map(v=>({attempt_id:v.attempt_id,bead_id:v.bead_id,status:v.status,started_at:typeof v.started_at=="number"?v.started_at:null,runner:v.runner||null,model:v.model||null,effort:v.effort||null,speed:v.speed||null,session_id:v.session_id||null,resumed_from:v.resumed_from||null,continuation_mode:v.continuation_mode||null,dismissed_at:typeof v.dismissed_at=="number"?v.dismissed_at:null,cause:typeof v.cause=="string"?v.cause:null,cause_detail:v.cause_detail||null,exec_default_preset_id:typeof v.exec_default_preset_id=="string"?v.exec_default_preset_id:null,exec_default_preset_revision:typeof v.exec_default_preset_revision=="number"?v.exec_default_preset_revision:null,exec_values:v.exec_values&&typeof v.exec_values=="object"?v.exec_values:null,usage:v.usage||null,usage_legs:Array.isArray(v.usage_legs)?v.usage_legs:[]}))}function Ze(){if(!a||!u)return null;let d=a.get();return It(d&&d.attempts||{},u)}let qe=new Set;function Qe(d){qe.has(d)?qe.delete(d):qe.add(d),_()}function O(d){let k=a?a.get():null,v=k&&k.attempts?k.attempts[d]:null;Y.open({attempt_id:d,meta:v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}})}async function W(d){if(!s||!d)return;let k=()=>{let he=a?a.get():null;return he&&typeof he.revision=="number"?he.revision:0},v=async(he={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:k(),...he}),F=he=>{he?.queue&&a?.set&&a.set(he.queue)},ee=await v();if(F(ee),ee&&ee.conflict){let he=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:k();ee=await s("worker-attempt-resume",{attempt_id:d,expected_revision:he}),F(ee)}ee=await tr(ee,(he,it)=>v({continuation:he,decision_token:it}),{onResult:F,refresh:()=>v()}),ee&&ee.resumed===!1&&!ee.conflict&&ee.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ee.reason}`,"error",2400)}let B={onOpen:O,onResume:W,onToggleUsage:Qe};function y(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,v=typeof k=="string"?Q()?.presets.find(F=>F.id===k):null;return v&&v.compatible!==!1&&v.settings?v.settings:{}}function I(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,v=typeof k=="string"?Q()?.presets.find(F=>F.id===k):null;return v&&v.compatible!==!1&&typeof v.name=="string"?v.name:""}function N(){let d=a?a.get():null;return d&&d.runner_catalog||null}function V(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},v=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof y().orchestration_model=="string"?y().orchestration_model:"")||"opus";return ar(N(),v)}function Q(){let d=l?l.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function Oe(d){let k=d&&d.settings&&typeof d.settings=="object"?d.settings:{},v=F=>typeof k[F]=="string"?k[F]:F==="impl_runtime"&&typeof k.impl_model=="string"&&ar(N(),k.impl_model)||"";return Wr({selectedOf:v,effectiveOf:v,runner_catalog:N()}).some(F=>F.groups.some(ee=>ee.options.some(he=>he.value===F.selected&&he.label.endsWith("(\uBE44\uD638\uD658)"))))}function xe(d){l&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&l.set({revision:d.revision,presets:d.presets})}async function De(){let d=Q(),k=d?.presets.find(v=>v.id===b);if(!(!s||!u||!d||!k||Oe(k)||S)){S=!0,_();try{let v=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:k.id,expected_revision:d.revision}));if(v&&v.conflict){xe(v),J("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let F=v&&Array.isArray(v.issue)?v.issue[0]:v?.issue;if(v&&v.applied&&F&&typeof F=="object"){f=F;for(let ee of Rr)delete m[ee];J("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}v&&v.error==="bd_readback_failed"?J("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):J("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(v){v&&typeof v=="object"&&v.code==="bd_readback_failed"?J("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):J("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{S=!1,_()}}}function We(){let d=Q();if(d&&d.presets.length===0)return i`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let k=d?d.presets:[],v=k.find(ee=>ee.id===b),F=v?Oe(v):!1;return i`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||S}
          @change=${ee=>{b=ee.target.value,_()}}
        >
          <option value="" ?selected=${b===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${k.map(ee=>{let he=Oe(ee);return i`<option
              value=${ee.id}
              ?selected=${ee.id===b}
            >
              ${ee.name}${he?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!v||F||S}
          @click=${()=>{De()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let st=null;r&&r.subscribe&&(st=r.subscribe(()=>rt()));let et=null;a&&typeof a.subscribe=="function"&&(et=a.subscribe(()=>{u&&_()}));let ut=null;l&&typeof l.subscribe=="function"&&(ut=l.subscribe(()=>{u&&_()}));function $t(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",$t);function rt(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(v=>v&&v.id===u)||d[0]||f}Re(),_()}}function ot(d){Tr(d).then(k=>{k?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function tt(d){d.preventDefault(),d.stopPropagation(),u&&ot(u)}function at(d,k){d.preventDefault(),d.stopPropagation(),ot(k)}function _t(d,k,v){d.preventDefault(),d.stopPropagation(),ge.open(k,{missing_state:v})}function U(d,k){m[d]=k,_(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:k})).catch(()=>{J("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Z(d,k){let v=f||{},F=v.metadata&&typeof v.metadata=="object"?v.metadata:{},ee={};for(let Pe of["impl_runtime","impl_model","impl_effort"])ee[Pe]=Object.hasOwn(m,Pe)?m[Pe]:typeof F[Pe]=="string"?F[Pe]:"";ee[d]=k;let he=ls(ee,N(),V()),it={};for(let Pe of["impl_runtime","impl_model","impl_effort"])it[Pe]=m[Pe],m[Pe]=he[Pe]||"";_(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...he,orchestration_runtime:V()})).then(Pe=>{let Nt=Array.isArray(Pe)?Pe[0]:Pe;if(!Nt||typeof Nt!="object"||!Nt.id)throw new Error("implementation target readback failed");f=Nt;for(let ke of["impl_runtime","impl_model","impl_effort"])delete m[ke];_()}).catch(()=>{for(let Pe of["impl_runtime","impl_model","impl_effort"])it[Pe]===void 0?delete m[Pe]:m[Pe]=it[Pe];_(),J("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function oe(d,k,v){if(!s||!u)return!1;try{let F=await Promise.resolve(s(d,k)),ee=Array.isArray(F)?F[0]:F;return ee&&typeof ee=="object"&&ee.id?(f=ee,!0):(J(v,"error"),!1)}catch{return J(v,"error"),!1}}function le(d){setTimeout(()=>{try{let k=e.querySelector(d);k&&typeof k.focus=="function"&&k.focus()}catch{}},0)}function re(){$=!0,j=f&&f.title||"",_(),le('.detail-edit__input[data-edit="title"]')}function Te(d){j=d.target.value}function Ve(){$=!1,j="",_()}function Xe(){oe("edit-text",{id:u,field:"title",value:j},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&($=!1,j=""),_()})}function Se(){C=!0,x=f&&f.description||"",_(),le('.detail-edit__textarea[data-edit="description"]')}function Ge(d){x=d.target.value}function we(){C=!1,x="",_()}function dt(){oe("edit-text",{id:u,field:"description",value:x},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&(C=!1,x=""),_()})}function ht(d,k,v,F){if(d.key==="Escape"){d.stopPropagation(),v();return}d.key==="Enter"&&(!F||d.ctrlKey||d.metaKey)&&(d.preventDefault(),k())}function Zt(d){let k=d.target.value;oe("update-status",{id:u,status:k},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function zt(d){let k=Number(d.target.value);oe("update-priority",{id:u,priority:k},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function Xt(d){K=d.target.value}function mt(){let d=K.trim();d.length!==0&&oe("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(k=>{k&&(K=""),_()})}function xt(d){if(d.key==="Escape"){d.stopPropagation(),K="",_();return}d.key==="Enter"&&(d.preventDefault(),mt())}function Ot(d){oe("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>_())}let Dt={onCopyPath:at,onOpenDoc:_t},Mt={onChange:U,onImplTargetChange:Z};function Ht(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function Ee(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function bt(d){let v=(Array.isArray(d.dependencies)?d.dependencies:[]).map(F=>({id:Ht(F),icon:Ee(F)})).filter(F=>F.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${v.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${v.map(F=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(F.id)}
                  >
                    ${F.icon?`${F.icon} `:""}${F.id}
                  </button>`:i`<span class="detail-dep"
                    >${F.icon?`${F.icon} `:""}${F.id}</span
                  >`)}
          </div>`}
    `}function p(d){let k=d.metadata||{},v=d.workflow||{},F=v.stages||{},ee=F.spec&&F.spec.stale,he=F.impl&&F.impl.stale,it=F.plan||null,Pe=v.route_source==="derived",Nt=v.route||k.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Pe?" detail-kv__v--derived":""}"
          title=${Pe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Pe?"unset":Nt}</span
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
    `}let w={route:["quick_fix","spec_backed","full_plan"]};async function D(d,k){let v=k.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&v!=="full_plan"&&!window.confirm(`full_plan \u2192 ${v||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){_();return}await oe("update-workflow-meta",{id:u,key:d,value:v},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),_()}function se(d){let k=d.metadata||{};return i` ${((F,ee)=>{let he=w[F],it=typeof k[F]=="string"?k[F]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${F}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${F}
          data-edit=${`wfmeta-${F}`}
          @change=${Pe=>D(F,Pe)}
        >
          <option value="" ?selected=${!he.includes(it)}>
            ${ee}
          </option>
          ${he.map(Pe=>i`<option value=${Pe} ?selected=${it===Pe}>${Pe}</option>`)}
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
    `}function A(d,k){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Zt}
        >
          ${Dp.map(v=>i`<option value=${v} ?selected=${v===d}>${v}</option>`)}
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
          ${Mp.map(v=>i`<option value=${String(v)} ?selected=${v===k}>
                P${v}
              </option>`)}
        </select>
      </div>
    `}function X(d){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${C?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Se}
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
    `}function ue(d){let k=typeof d.notes=="string"?d.notes:"";return k.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${k}</div>
    `}function Me(d){let k=Array.isArray(d.labels)?d.labels:[];return i`
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
    `}function je(){if(!u)return i``;let d=f||{},k=String(d.id||u),v=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",F=Ze(),ee=d.status||"open",he=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",it=d.description||"",Pe={...d,metadata:{...d.metadata||{},...m}};return i`
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
          ${z(v,F)}
          ${A(ee,he)} ${h(d)}
          ${X(it)}
          ${Gi(H,be,{expanded:ie,draft:q,sending:ce,error:P})}
          ${ue(d)} ${Me(d)} ${bt(d)}
          ${p(d)} ${se(d)}
          ${zi(d,Dt)}
          ${We()}
          ${Ji(Pe,Mt,y(),N(),I())}
          ${al({expanded:G,loading:Ae,error:de,data:pe},{onToggle:ye})}
          ${ol($e(),B,{total:F,expanded:qe})}
        </div>
      </div>
    `}function _(){Be(je(),e)}return{load(d){d!==u&&(m={},b="",te(),me(),Ue()),u=d,f=null,rt()},clear(){u=null,f=null,m={},b="",S=!1,te(),me(),Ue(),ge.close(),Y.close(),Be(i``,e)},destroy(){st&&(st(),st=null),et&&(et(),et=null),ut&&(ut(),ut=null),document.removeEventListener("keydown",$t),ge.destroy(),fe.parentNode&&fe.parentNode.removeChild(fe),Y.destroy(),_e.parentNode&&_e.parentNode.removeChild(_e),u=null,f=null,b="",S=!1,me(),Ue(),Be(i``,e)}}}var Np=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ll(e,t){return Fs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Pp(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function cl(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function l(E){let P=r.get();if(P)try{let q=await n("display-policy-set",{expected_revision:P.revision,policy:E(P)});c(q),q&&q.conflict&&q.policy&&(q=await n("display-policy-set",{expected_revision:q.policy.revision,policy:E(q.policy)}),c(q)),q&&q.conflict&&J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function c(E){E&&E.policy&&typeof E.policy=="object"&&r.set(E.policy)}function u(E){let P=r.get();if(!P)return;let q=ll(E,P)!=="shown";l(ce=>Pp(E,ce,q))}function f(){let E=a.trim();E.length!==0&&(a="",l(P=>P.hidden_prefixes.includes(E)?{hidden_prefixes:P.hidden_prefixes}:{hidden_prefixes:[...P.hidden_prefixes,E]}),j())}function m(E){l(P=>({hidden_prefixes:P.hidden_prefixes.filter(q=>q!==E)}))}function b(E){let P=r.get();if(!P)return;let q=P.chips[E]===!1;l(()=>({chips:{[E]:q}}))}function S(E){let P=s();return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${P.length===0?i`<div class="display-settings__empty">라벨 없음</div>`:i`<div class="display-settings__pills">
              ${P.map(q=>{let ce=ll(q,E);return i`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${ce}`}
                  data-label=${q}
                  data-state=${ce}
                  @click=${()=>u(q)}
                >
                  ${q}
                </button>`})}
            </div>`}
      </section>
    `}function $(E){return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${E.hidden_prefixes.map(P=>i`<span class="display-settings__prefix">
                ${P}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${P} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>m(P)}
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
            @input=${P=>{a=String(P.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function C(E){return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Np.map(([P,q])=>i`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${P}
                  .checked=${E.chips[P]!==!1}
                  @change=${()=>b(P)}
                />
                <span>${q}</span>
              </label>`)}
        </div>
      </section>
    `}function j(){let E=r.get();Be(i`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${T}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${E?i`${S(E)} ${$(E)}
                ${C(E)}`:i`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let x=!1,K=()=>{x=!1};o.addEventListener("close",K),o.addEventListener("cancel",K);let te=null;r.subscribe&&(te=r.subscribe(()=>{x&&j()}));function H(){x||(a="",x=!0,j(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function T(){x&&(x=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:H,close:T,destroy(){x=!1,o.removeEventListener("close",K),o.removeEventListener("cancel",K),te&&(te(),te=null),o.remove()}}}function dl(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,m="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let b=typeof m=="string"?m.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function cs(e,t){let{queueStore:r,presetStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=null,l=!1;function c(){return r&&r.get()||{revision:0,exec_defaults:{}}}function u(){let y=c();return typeof y.revision=="number"?y.revision:0}function f(){let y=n?n.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function m(y){n&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&n.set({revision:y.revision,presets:y.presets})}function b(y){y&&y.queue&&r&&r.set(y.queue)}function S(){return c().runner_catalog??null}let $=null;function C(){if($!==null)return $;let y=c().default_exec_preset_id;return typeof y=="string"&&y.length>0?y:null}async function j(y){if(!s)return;let I=f();if(!I)return;$=y||"";let N=H(y);if(ye(),!N.viable){J(N.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3),$=null,ye();return}try{let V=await s("worker-queue-set-default-exec-preset",{preset_id:y||null,expected_queue_revision:u(),expected_preset_revision:I.revision});b(V),V&&V.presets&&n&&n.set(V.presets),V&&V.conflict?J("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3):V&&V.applied||J("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{J("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}$=null,ye()}function x(y){a={id:y.id,name:y.name,settings:{...y.settings||{}}},E(),l=!1,ye()}function K(){a={id:null,name:"",settings:{}},l=!1,ye()}function te(y){let I=y&&y.settings&&typeof y.settings=="object"?y.settings:{},N=V=>typeof I[V]=="string"?I[V]:V==="impl_runtime"&&typeof I.impl_model=="string"&&ar(S(),I.impl_model)||"";return Wr({selectedOf:N,effectiveOf:N,runner_catalog:S()}).some(V=>V.groups.some(Q=>Q.options.some(Oe=>Oe.value===V.selected&&Oe.label.endsWith("(\uBE44\uD638\uD658)"))))}function H(y){if(!y)return{viable:!0,missing:!1,incompatible:!1,preset:null};let N=f()?.presets.find(Q=>Q.id===y);if(!N||N.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let V=N.compatible===!1||te(N);return{viable:!V,missing:!1,incompatible:V,preset:N}}function T(){let y=a?.settings.orchestration_model;return typeof y!="string"?null:ar(S(),y)}function E(){if(!a)return;let y=ls({impl_runtime:a.settings.impl_runtime||"",impl_model:a.settings.impl_model||"",impl_effort:a.settings.impl_effort||""},S(),T());for(let I of["impl_runtime","impl_model","impl_effort"])y[I]?a.settings[I]=y[I]:delete a.settings[I]}function P(y){let I=y&&y.settings&&typeof y.settings=="object"?y.settings:{},N=Rr.filter(Q=>typeof I[Q]=="string").length,V=Rr.filter(Q=>typeof I[Q]=="string").map(Q=>`${fo[Q]?.title||Q}: ${I[Q]}`);return{count:`${N}/12 \uC9C0\uC815`,choices:V.length>0?V.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function q(y){if(!s||!window.confirm(`\u201C${y.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let I=f();if(I)try{let N=await s("exec-preset-delete",{expected_revision:I.revision,id:y.id});m(N),N&&N.conflict&&J("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{J("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function ce(y=!1){if(!s||!a)return;let I=f();if(!I)return;let N=y||a.id===null,V={expected_revision:I.revision,...N?{}:{id:a.id},name:a.name,settings:{...a.settings}};try{let Q=await s(N?"exec-preset-create":"exec-preset-update",V);if(m(Q),Q&&Q.conflict){l=!0,ye();return}if(Q&&Q.applied){a=null,l=!1,ye();return}J("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{J("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function ve(y){return i`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${mo(y.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${y.key}
        ?disabled=${y.disabled}
        @change=${I=>{if(!a)return;let N=I.target.value;N?a.settings[y.key]=N:delete a.settings[y.key],(y.key==="impl_runtime"||y.key==="impl_model"||y.key==="impl_effort"||y.key==="orchestration_model")&&E(),l=!1,ye()}}
      >
        ${is(y.groups,y.selected,_o[y.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function ie(){if(!a)return"";let y=xe=>typeof a?.settings[xe]=="string"?a.settings[xe]:"",I=Wr({selectedOf:y,effectiveOf:y,runner_catalog:S(),controller_runtime:T()}),N=hn.flatMap(xe=>xe.keys).filter(xe=>typeof a?.settings[xe]=="string").length,V=xe=>{let De=I.find(We=>We.key===xe);return De?ve(De):""},Q=f(),Oe=a.id!==null&&Q!==null&&!Q.presets.some(xe=>xe.id===a?.id);return i`<div class="exec-preset-editor" data-preset-editor>
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
      ${Oe?i`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      <section class="exec-preset-editor__core" data-preset-core>
        ${po.map(V)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${N}개 변경됨</summary>
        ${hn.map(xe=>i`<section
              class="exec-preset-editor__group"
              data-preset-group=${xe.id}
            >
              <h4>${xe.label}</h4>
              ${xe.keys.map(V)}
            </section>`)}
      </details>
      <div class="exec-preset-editor__actions">
        ${Oe?i`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{ce(!0)}}
            >
              새 프리셋으로 저장
            </button>`:i`<button
              type="button"
              data-preset-save
              @click=${()=>{ce(!1)}}
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
    </div>`}function me(){let y=f(),I=y?y.presets.filter(Q=>Q?.migration_pending!==!0):[],N=C()||"",V=H(N);return i`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${K}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${y===null?i`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:I.length===0?i`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:I.map(Q=>{let Oe=P(Q),xe=H(Q.id),De=Q.id===N,We=xe.missing?"\uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":xe.incompatible?"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"",st=typeof Q.reference_count=="number",et=st?Q.reference_count:null,ut=Array.isArray(Q.reference_summary)?Q.reference_summary.map($t=>$t?.display_name||$t?.workspace_key).filter(Boolean).join(", "):"";return i`<article
                class="exec-preset-card"
                data-preset-id=${Q.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${Q.name}</strong>
                  ${De?i`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`:""}
                  <span>${Oe.count}</span>
                  <span data-preset-references=${Q.id}
                    >${st?`\uCC38\uC870 ${et}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${xe.incompatible?i`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Oe.choices}</small>
                  ${ut?i`<small data-preset-impact=${Q.id}
                        >업데이트 영향: ${ut}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  ${De?i`<button
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
                    @click=${()=>{q(Q)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${y!==null&&N&&V.missing?i`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${N} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${N}
                @click=${()=>{j("")}}
              >
                기본 해제
              </button>
            </div>
          </article>`:""}
      ${ie()}
    </section>`}function Ie(){let y=c().workspace_info;return y&&typeof y=="object"?y:{}}function Re(y,I){return i`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${y}"
      >${I}</span
    >`}let He=!1,Ne=!1,Le=!1,be=null;async function fe(){if(s){Ne=!0,Le=!1,ye();try{let y=await Promise.resolve(s("get-worker-system-prompt",{}));!y||typeof y!="object"||Array.isArray(y)?Le=!0:be=y}catch{Le=!0}finally{Ne=!1,ye()}}}function ge(){if(He=!He,He&&!be){fe();return}ye()}function _e(){return i`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${He?"true":"false"}
          @click=${ge}
        >
          ${He?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${He?Y():""}
    </section>`}function Y(){let y=zr({loading:Ne,error:Le});if(y)return y;if(!be)return"";let I=Array.isArray(be.variants)?be.variants:[];return i`<div class="exec-defaults__sp-body">
      ${be.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${be.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${I.map(N=>i`<div class="exec-defaults__sp-variant" data-variant=${N.key}>
            <div class="exec-defaults__sp-cond">${N.condition}</div>
            ${or(N.label,N.system_prompt)}
          </div>`)}
    </div>`}function G(y){if(typeof y!="number"||!Number.isFinite(y))return"";let I=y/6e4;return Number.isInteger(I)?`timeout ${I}\uBD84`:`timeout ${Math.round(y/1e3)}\uCD08`}function Ae(y){let I=G(y);return I?Re("config",I):""}function de(y){let I=typeof y.base_sha=="string"?y.base_sha:"",N=`${y.source_path||"repo-ops/config.toml"} @ ${y.base_ref||"?"}${I?`@${I.slice(0,7)}`:""}`;return i`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">
        저장소 작업 선언
        <span class="exec-defaults__vd-src">${N}</span>
      </p>
      <div class="exec-defaults__lane" data-lane="verify">
        <span class="exec-defaults__lane-k">머지 전 검증</span>
        <span class="exec-defaults__lane-v"
          >${y.verify?i`<code class="exec-defaults__vd-cmd"
                  >${y.verify.script}</code
                >${Ae(y.verify.timeout_ms)}`:i`선언 없음${Re("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
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
                >${Ae(y.deploy.timeout_ms)}`:i`선언 없음${Re("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${y.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function pe(y){let I=y.repo_ops&&typeof y.repo_ops=="object"?y.repo_ops:null;return I&&(I.status==="resolved"||I.status==="absent")?de(I):I&&(I.status==="pending"||I.status==="error")?i`<section class="exec-defaults__vd" data-seam="repo-ops">
        <p class="exec-defaults__vd-title">
          저장소 작업 선언
          <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
        </p>
        <div
          class="exec-defaults__vd-line exec-defaults__vd-absent"
          data-seam="repo-ops-status"
        >
          ${I.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${I.error_code?i` — <code>${I.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">저장소 작업 선언</p>
      <div class="exec-defaults__vd-line exec-defaults__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function L(y){if(!s)return;let I=await s("worker-auto-repair-toggle",{on:y,expected_revision:u()});if(b(I),I&&I.conflict){let N=await s("worker-auto-repair-toggle",{on:y,expected_revision:u()});b(N)}ye()}let R={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function ae(y,I,N){return i`<div class="exec-defaults__policy-group" data-policy=${N}>
      <div class="exec-defaults__policy-label">${y}</div>
      <ul class="exec-defaults__policy-list">
        ${I.map(V=>i`<li data-token=${V}>
              ${R[V]||V}
            </li>`)}
      </ul>
    </div>`}function Ue(y){return i`<div
      class="exec-defaults__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="exec-defaults__policy-label">해결 사다리</div>
      <ol class="exec-defaults__policy-list">
        ${y.map(I=>{let N=[R[I.trigger]||I.trigger];return Number.isInteger(I.attempts_per_operation_attempt)?N.push(`operation\uB2F9 ${I.attempts_per_operation_attempt}\uD68C`):Number.isInteger(I.attempts)?N.push(`${R[I.budget]||I.budget} ${I.attempts}\uD68C`):Number.isInteger(I.sessions_per_user_action)&&N.push(`${I.sessions_per_user_action}\uD68C`,R[I.user_actions]||I.user_actions),I.applies_when&&N.push(R[I.applies_when]||I.applies_when),i`<li data-token=${I.id}>
            <strong>${R[I.id]||I.id}</strong>
            <span>${N.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function Ce(){let y=c(),I=y.auto_repair!==!1,N=y.repo_operation_policy&&typeof y.repo_operation_policy=="object"?y.repo_operation_policy:null,V=Array.isArray(y.repo_operations)?y.repo_operations:[],Q=V.find(We=>We.state==="repairing"),Oe=V.filter(We=>We.state==="failed"||We.state==="repairing"),xe=Oe.length?Math.min(...Oe.map(We=>typeof We.repair?.remaining=="number"?We.repair.remaining:0)):N?.auto_repair?.resolution_ladder?.find(We=>We.id==="auto_repair_session")?.attempts??1,De=Array.isArray(N?.auto_repair?.resolution_ladder)?N.auto_repair.resolution_ladder:[];return i`<section class="exec-defaults__repair" data-seam="auto-repair">
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
          .checked=${I}
          @change=${We=>{L(We.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="exec-defaults__repair-state">
        <span class="exec-defaults__repair-value" data-seam="auto-repair-value"
          >${I?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
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
      ${N?i`<details class="exec-defaults__policy" data-seam="policy-lists">
            <summary>
              Worker 자동 처리 기준
              <span class="exec-defaults__policy-count"
                >자동 ${(N.worker_automatic||[]).length} · 해결 사다리
                ${De.length} · 금지
                ${(N.never_automatic||[]).length}</span
              >
            </summary>
            ${ae("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",N.worker_automatic||[],"worker-automatic")}
            ${N.supported===!1||N.schema_version!==2?i`<div
                  class="exec-defaults__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${N.schema_version})`}
                </div>`:Ue(De)}
            ${ae("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",N.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}function ye(){Be(i`
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
            ${Ce()} ${_e()}
          </div>
        </div>
      `,o)}let $e=!1,Ze=()=>{$e=!1},qe=y=>{y.target===y.currentTarget&&B()};o.addEventListener("close",Ze),o.addEventListener("cancel",Ze),o.addEventListener("click",qe);let Qe=null;r&&r.subscribe&&(Qe=r.subscribe(()=>{$e&&ye()}));let O=null;n&&n.subscribe&&(O=n.subscribe(()=>{$e&&ye()}));function W(){$e||($e=!0,ye(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function B(){$e&&($e=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:W,close:B,destroy(){$e=!1,o.removeEventListener("close",Ze),o.removeEventListener("cancel",Ze),o.removeEventListener("click",qe),Qe&&(Qe(),Qe=null),O&&(O(),O=null),o.remove()}}}function ds(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function vo(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function us(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Fp(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:ds(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function ul(e,t){let r=Fp(e,t);return r?i`<button
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
  </div>`}function qp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function bn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ps(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Vt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,m)=>(f.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?qp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:u}}function ir(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
      >`:"",S=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,$=i`<span class="worker-mini__title">${e.title}</span>`,C=e.pr_url&&e.pr_number?i`<a
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
          >`:"",H=o?i`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",T=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",E=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",P=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",q=e.discard,ce=q?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${q?.attempt_id||""}
          data-operation-id=${q?.operation?.operation_id||""}
          data-discard-mode=${q?.confirmation||"unmerged"}
          ?disabled=${q?!q.enabled:e.discard_enabled===!1}
          title=${q?q.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${q?.label||"\uD3D0\uAE30"}
        </button>`:"",ve=e.revise_action?i`<button
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
        </button>`:"",ie=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||q?.operation||e.revise_action);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${b}${S}${$}</div>
          <div class="worker-mini__row2">
            ${te}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${pt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${x}${H}
            <span class="worker-mini__actions"
              >${T}${E}${P}${ce}</span
            >
            ${Gr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${u}${f}${b}${S}${C}${j}${x}${m}${K}
            </div>
            <div class="worker-mini__body">${$}</div>
            ${ie?i`<div class="worker-mini__foot">
                  ${te}${H}
                  <span class="worker-mini__actions"
                    >${T}${E}${P}${ce}${ve}</span
                  >
                  ${ir(e)}
                </div>`:""}
            ${Gr(e)}`:i`<div class="worker-mini__line">
              ${u}${f}${b}${S}${$}${C}${j}${x}${m}${K}${te}${H}${T}${E}${P}${ce}
            </div>
            ${ir(e)} ${Gr(e)}`}
  </div>`}function Bp(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Bp(n):yo(n))}
          </div>`}
  </section>`}var pl=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],vn=pl.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function wo(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=pl.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function fl(e){let t=vn.findIndex(r=>r.step===e);return vn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Lr(e){let t=vn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Up(e){let t=vn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:vn.length}}function fs(e){let t=Up(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var _l={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},ml={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function gl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ko(e){for(let t of gl(e))if(Object.hasOwn(_l,t))return _l[t];return null}function $o(e){let t=null;for(let r of gl(e))Object.hasOwn(ml,r)&&(t=ml[r]);return t}function _s(e){let t=ko(e),r=$o(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function hl(e,t){let r=ko(e)??ko(t),n=$o(t)??$o(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var bl=160;function jp(e){return e.length>bl?`${e.slice(0,bl)}\u2026`:e}function zp(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${jp(e.command)}</code>`:""}
  </div>`}function Hp(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function xo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function vl(e){let t=e.failure?_s(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${zp(e.failure.cause_detail)}
          ${Hp(e.failure.reason)}
          ${ir({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Wp(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?xo(t-e.started_at):"\u2014",a=Yt(e),l=pr(e),c=gt(e.usage),u=qt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,b=e.attempt_id&&e.attempt_id===r,S=e.discard?.action?i`<button
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
            ${S}
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
            ${S}`}
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
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Wp(s,t,r))}
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
  </svg>`}function Ao(){return hr(Jt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function To(){return hr(Jt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function yl(){return hr(Jt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function wl(){return hr(Jt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function kl(){return hr(Jt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function $l(){return hr(Jt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function xl(){return hr(Jt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Sl(){return hr(Jt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var yn=1,Gp=6e4,Yp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Vp=new Set(["auto_merge","merged","merge","done"]),Al={running:3,paused:2,failed:1};function Kp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Zp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),b=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let m=Al[u.run_state],b=Al[l];if(m>b||m===b&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:It(e,a.bead_id),can_pause:l==="running"&&f,can_resume:l!=="running"&&f&&!n.has(a.attempt_id)})}return o}function Tl(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Et(e){return e&&typeof e=="object"?e:{}}function Eo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&a.set(x.root_dir,x);let l=[],c=[],u=[],f=[],m=[],b=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let K=x.root_dir,te=x.name||K,H=a.get(K),T=H&&typeof H.revision=="number"?H.revision:typeof x.revision=="number"?x.revision:0,E=Et(x.attempts),P=Et(x.bead_titles),q=Et(x.pr_observations),ce=Et(x.admission),ve=Et(x.revise_parked),ie=Et(x.merge_queue_state),me=Et(x.cleanup_failed),Ie=Et(x.discard_operations),Re=Array.isArray(x.merge_queue)?x.merge_queue:[],He=new Set(Re.filter(Y=>Y&&typeof Y.bead_id=="string").map(Y=>Y.bead_id)),Ne=new Map(Re.filter(Y=>Y&&typeof Y.bead_id=="string").map(Y=>[Y.bead_id,Y])),Le=Array.isArray(x.queue)?x.queue:[],be=Array.isArray(x.done)?x.done:[],fe=new Map;for(let Y of be)Y&&typeof Y.bead_id=="string"&&typeof Y.added_at=="number"&&fe.set(Y.bead_id,Y.added_at);let ge=Y=>({id:Y,title:P[Y]||Y,root_dir:K,workspace_name:te,expected_revision:T,draggable:!1}),_e=new Set;for(let[Y,G]of Zp(E,fe))_e.add(Y),c.push({...ge(Y),lane:"running",attempt_id:G.attempt_id,run_state:G.run_state,can_pause:G.can_pause,can_resume:G.can_resume,started_at:G.started_at,last_event_at:G.last_event_at,runner:G.runner,model:G.model,effort:G.effort,speed:G.speed,resumed_from:G.resumed_from,continuation_mode:G.continuation_mode,usage:G.usage,discard:Vt(Ie,Y,{attempt_id:G.attempt_id}),badges:G.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:G.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:G.run_state==="failed"});for(let Y of Array.isArray(x.pr_wait)?x.pr_wait:[]){let G=Y&&Y.bead_id;if(typeof G!="string"||_e.has(G))continue;_e.add(G);let Ae=Et(q[G]),de=Et(Ae.pr),pe=Ae.gate?Et(Ae.gate):null,L=He.has(G),R=Ne.get(G)?.continuation_action||null,ae=!!R&&R.continuation===null,Ue=ie.active===G,Ce=Y.external===!0,ye=me[G]||null,$e=!!pe&&pe.base_badge==="\uCDA9\uB3CC",Ze=!!ye&&["child_sweep","branch_cleanup","parent_close"].includes(ye.step)&&!!pe&&pe.tier==="merged",qe=Ce&&!!ye&&!!pe&&pe.tier==="merged",Qe=!!pe&&["closed_unmerged","review","undecidable"].includes(pe.tier),O=Vt(Ie,G,{external:Ce,merge_active:Ue,merge_queued:L,merged:!!ye||pe?.tier==="merged"}),W=!!O.operation;u.push({...ge(G),lane:"pr_wait",pr_number:typeof de.number=="number"?de.number:null,pr_url:typeof de.url=="string"?de.url:void 0,external:Ce,usage:It(E,G),badges:ae?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ye?[Lr(ye.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Lr(ye.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof pe?.gate_badge=="string"&&pe.gate_badge.length>0?[pe.gate_badge]:[],alert:!!ye||Qe,reason:ye?fs(ye.step):"PR \uB300\uAE30",merge_action:!L||ae,merge_enabled:!W&&(ae||pe?.enabled===!0||$e||Ze||qe),merge_label:ae?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":qe||Ze?"\uC815\uB9AC \uC7AC\uAC1C":$e&&!Ze?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ae?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":W?O.error?`\uD3D0\uAE30 \uC2E4\uD328: ${O.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${O.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:qe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ze?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":$e?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?.enabled===!0?`\uBA38\uC9C0 (${pe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${pe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:L&&!ae,cancel_enabled:!Ue,continuation_mismatch:R?.mismatch||null,discard:O,discard_action:O.action,discard_enabled:O.enabled,discard_title:O.title})}for(let Y=0;Y<Le.length;Y++){let G=Le[Y],Ae=G&&G.bead_id;if(typeof Ae!="string"||_e.has(Ae))continue;_e.add(Ae);let de=ve[Ae],pe=Vt(Ie,Ae),L=pe.operation?pe:null,R={...ge(Ae),lane:"queue",draggable:!L,discard:L||void 0,reason:Tl(ce,Ae),queue_position:Y+1,queue_index:Y,queue_length:Le.length,badges:de?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!de,revise_action:!!de,revise_enabled:!!de&&!L,revise_title:de?de.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${de.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(R);let ae=b.get(K);ae?ae.push(R):b.set(K,[R])}for(let Y of Array.isArray(x.runnable)?x.runnable:[]){let G=Y&&Y.bead_id;typeof G!="string"||_e.has(G)||(_e.add(G),l.push({...ge(G),title:Y.title||P[G]||G,lane:"runnable",draggable:!0,reason:Tl(ce,G),created_at:Y.created_at??void 0,updated_at:Y.updated_at??void 0,labels:Array.isArray(Y.labels)?Y.labels:[],spec_reviewer:typeof Y.spec_reviewer=="string"?Y.spec_reviewer:void 0,plan_state:Y.plan_state==="approved"||Y.plan_state==="authored"?Y.plan_state:"none",workflow:Y.route?{route:Y.route,chips:{route:Y.route}}:null,place_index:Le.length}))}for(let Y of be){let G=Y&&Y.bead_id;if(typeof G!="string"||_e.has(G)||(_e.add(G),o!==void 0&&typeof Y.added_at=="number"&&Y.added_at<o))continue;let Ae=Kp(E,G);m.push({...ge(G),lane:"done",done:!0,usage:It(E,G),done_at:typeof Y.added_at=="number"?Y.added_at:void 0,done_kind:Ae&&typeof Ae.done_kind=="string"?Ae.done_kind:null})}}let S=new Map;s.forEach((x,K)=>{x&&typeof x.root_dir=="string"&&S.set(x.root_dir,K)});let $=r&&r.running_sort==="repo"?"repo":"started";c.sort((x,K)=>{if($==="repo"){let T=S.get(x.root_dir)??Number.MAX_SAFE_INTEGER,E=S.get(K.root_dir)??Number.MAX_SAFE_INTEGER;if(T!==E)return T-E}let te=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,H=typeof K.started_at=="number"&&Number.isFinite(K.started_at)?K.started_at:null;return te!==null&&H!==null&&te!==H?te-H:te===null&&H!==null?1:te!==null&&H===null?-1:x.id.localeCompare(K.id)}),m.sort((x,K)=>(K.done_at??0)-(x.done_at??0));let C=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,exec_defaults:x&&x.exec_defaults,default_exec_preset_id:x&&x.default_exec_preset_id,runner_catalog:x&&x.runner_catalog})),j=[];for(let x of C)!x||typeof x.root_dir!="string"||j.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=yn?x.slots:yn,revision:typeof x.revision=="number"?x.revision:0,exec_defaults:Et(x.exec_defaults),default_exec_preset_id:typeof x.default_exec_preset_id=="string"?x.default_exec_preset_id:null,runner_catalog:Et(x.runner_catalog),items:b.get(x.root_dir)||[]});return{runnable:l,queue:f,queue_groups:j,running:c,pr_wait:u,done:m,automation:{total:j.length,both_on:j.filter(x=>x.auto_advance&&x.auto_merge).length}}}function Xp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Gp;return i`<span
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
      >`)}function Qp(e){return i`<span class="mon-c__ops">
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
          ${wl()}
        </button>`:""}
  </span>`}function Jp(e,t){let r=typeof e.started_at=="number"?xo(t-e.started_at):"";return i`${wn(e)}
    <div class="mon-c__meta">
      ${Ro(e)}${Xp(e.last_event_at,t)}${kn(e)}${ms(e)}
      ${Yt(e)?i`<span class="mon-c__model">${Yt(e)}</span>`:""}
      ${pr(e)?i`<span
            class="rtile__resumed"
            title=${pr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Co(e)}${Qp(e)}${ir(e)}
    </div>`}function ef(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=Tt(e.updated_at);return i`${wn(e)}
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
    </div>`}function tf(e){let t=!!e.discard?.operation;return i`${wn(e)}
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
        </div>`:""}`}function rf(e){let t=!!(qt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return i`${wn(e)}
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
        </div>`:""}`}function nf(e,t){let r=e.done_kind||"",n=r?Yp[r]||r:"",s=Tt(e.done_at,t);return i`${wn(e)}
    <div class="mon-c__meta">
      ${kn(e)}${ms(e)}
      ${n?i`<span
            class="mon-live__kind${Vp.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Co(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${pt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function El(e,t){return e.lane==="running"?Jp(e,t):e.lane==="runnable"?ef(e):e.lane==="queue"?tf(e):e.lane==="pr_wait"?rf(e):nf(e,t)}function Cl(e){let t=String(e.revision);return i`<header
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
        ${kl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${$l()}
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
        ${xl()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Rl(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Gt.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?yl():Sl()}
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
  </div>`}function Il(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Ll(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return gt(Wn(t));let r={};for(let l of rr)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let u=!1;for(let f of rr){let m=c[f];typeof m=="number"&&Number.isFinite(m)&&(r[f]+=m,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?qt(r):null}var Dl="bdui.monitor.done-range",Ml="bdui.monitor.running_sort";function sf(){try{let e=window.localStorage.getItem(Dl);return Rt(e)?e:At}catch{return At}}function of(e){try{window.localStorage.setItem(Dl,e)}catch{}}function af(){try{return window.localStorage.getItem(Ml)==="repo"?"repo":"started"}catch{return"started"}}function lf(e){try{window.localStorage.setItem(Ml,e)}catch{}}var Nl="tab:monitor:pipeline",cf=1e3,df=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Ol(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${El(e,t)}
  </div>`}function Pl(e,t){let r=nt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,l=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(O=>typeof globalThis.confirm!="function"||globalThis.confirm(O)),m=sf(),b=af();function S(){let O=Gt.find(W=>W.value===m);return O?O.label:""}let $=document.createElement("div");$.className="mon",e.appendChild($);let C=Eo(null,null),j=null,x=new Map,K=new Set;function te(O){return C.queue_groups.find(W=>W.root_dir===O)||null}let T=cs(e,{queueStore:{get(){if(!j)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let O=x.get(j);if(O)return O;let W=te(j),B=s&&s.get?s.get():null,y=(Array.isArray(B)?B:[]).find(I=>I&&I.root_dir===j);return{revision:W?W.revision:0,exec_defaults:W?W.exec_defaults:{},default_exec_preset_id:W?W.default_exec_preset_id:null,runner_catalog:W?W.runner_catalog:null,workspace_info:y?y.workspace_info:void 0}},set(O){j&&x.set(j,O);for(let W of Array.from(K))W()},subscribe(O){return K.add(O),()=>K.delete(O)}},presetStore:a,transport:o?(O,W)=>o(O,O==="worker-queue-set-default-exec-preset"||O==="get-worker-system-prompt"?{...W||{},root_dir:j}:W):void 0}),E=null,P=null;async function q(O,W,B,y,I=!0){if(!o||!B)return null;let N=await o(O,{...W,root_dir:B,expected_revision:y});if(N&&N.conflict&&I){N.queue&&x.set(B,N.queue);let V=N.queue&&typeof N.queue.revision=="number"?N.queue.revision:y;N=await o(O,{...W,root_dir:B,expected_revision:V})}return N&&N.queue&&B&&x.set(B,N.queue),N}function ce(O,W){let B=x.get(O),y=s&&s.get?s.get():null,I=(Array.isArray(y)?y:[]).find(V=>V?.root_dir===O);return(B||I)?.merge_queue?.find(V=>V.bead_id===W)?.continuation_action}async function ve(O,W,B,y){let I=await q(O,W,B,y),N=x.get(B)?.revision??I?.queue?.revision??y;return tr(I,(V,Q)=>q(O,{...W,continuation:V,decision_token:Q},B,N,!1),{refresh:V=>q(O,W,B,V?.queue?.revision??x.get(B)?.revision??N,!1)})}async function ie(O,W,B,y){let I=await tr({continuation_mismatch:y},(V,Q)=>q("worker-merge-queue-add",{bead_id:W,continuation:V,decision_token:Q},O,B,!1)),N=I?.queue?.merge_queue?.find(V=>V.bead_id===W)?.continuation_action;I?.applied!==!0&&N?.continuation===null&&N.mismatch&&await ie(O,W,I.queue.revision,N.mismatch)}async function me(O,W,B){let y=await q("worker-discard",O,W,B);if(y&&y.discarded===!0){J(ps(y),"success",5e3);return}if(y&&y.reason){J(`\uD3D0\uAE30 \uC2E4\uD328: ${y.reason}`,"error");return}if(y&&y.accepted&&y.pending==="merged_revert"){J("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(y&&y.accepted){J(`\uD3D0\uAE30 \uC9C4\uD589: ${y.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}y&&!y.conflict&&J("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ie(O,W,B){return!o||!B?null:await o(O,{...W,root_dir:B})}async function Re(O){if(!o||!O&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let W=await o("monitor-auto-toggle",{on:O}),B=W&&Array.isArray(W.failed)?W.failed:[];B.length>0&&J(`\uC790\uB3D9\uD654 ${O?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${B.map(y=>y.root_dir).join(", ")}`,"error",3200)}async function He(){let O=new Map;for(let W of C.pr_wait)O.has(W.root_dir)||O.set(W.root_dir,W.expected_revision);for(let[W,B]of O)await q("worker-merge-queue-add-all",{},W,B)}let Ne=null,Le=!1,be=null;function fe(){be!==null&&clearTimeout(be),be=setTimeout(()=>{be=null,Le=!1},0)}function ge(O){let W=O.target;return typeof W?.closest=="function"?W.closest(".mon-group"):null}function _e(O){let W=ge(O);return!W||!Ne?null:(W.getAttribute("data-root-dir")||"")===Ne.root_dir?W:null}function Y(){for(let O of Array.from($.querySelectorAll(".mon-group--drag-over")))O.classList.remove("mon-group--drag-over")}function G(O){let W=O.target,B=typeof W?.closest=="function"?W.closest('.mon-card[draggable="true"]'):null;if(B){Ne={bead_id:B.getAttribute("data-issue-id")||"",lane:B.getAttribute("data-lane")||"",root_dir:B.getAttribute("data-root-dir")||"",revision:Number(B.getAttribute("data-revision")||0)||0,queue_index:Number(B.getAttribute("data-queue-index")),queue_length:Number(B.getAttribute("data-queue-length")),place_index:Number(B.getAttribute("data-place-index"))},Le=!0;try{O.dataTransfer?.setData("text/plain",Ne.bead_id),O.dataTransfer&&(O.dataTransfer.effectAllowed="move")}catch{}}}function Ae(O){let W=_e(O);W&&(O.preventDefault(),O.dataTransfer&&(O.dataTransfer.dropEffect="move"),W.classList.add("mon-group--drag-over"))}function de(O){ge(O)?.classList.remove("mon-group--drag-over")}function pe(){Ne=null,Y(),fe()}function L(O){let W=_e(O),B=Ne;if(Ne=null,Y(),!W||!B||!B.bead_id)return;O.preventDefault();let y=O.target,I=typeof y?.closest=="function"?y.closest('.mon-card[data-lane="queue"]'):null,N=I&&W.contains(I)?Number(I.getAttribute("data-queue-index")):NaN;if(B.lane==="runnable"){let Oe=Number.isFinite(N)?N:B.place_index;if(!Number.isFinite(Oe))return;q("worker-queue-place",{bead_id:B.bead_id,index:Oe},B.root_dir,B.revision);return}if(B.lane!=="queue"||I&&I.getAttribute("data-issue-id")===B.bead_id)return;let V=B.queue_index,Q=Number.isFinite(N)?V>N?N:N-1:B.queue_length-1;!Number.isFinite(Q)||Q<0||Q===V||q("worker-queue-reorder",{bead_id:B.bead_id,to_index:Q},B.root_dir,B.revision)}function R(O){let W={runnable:C.runnable,queue:C.queue,running:C.running,pr_wait:C.pr_wait,done:C.done};return i`${Rl({automation:C.automation,counts:{running:C.running.length,queue:C.queue.length,pr_wait:C.pr_wait.length},running_sort:b,done_range:m,token_total:Ll(C.done),token_tooltip:Il(S())})}
      <div class="worker-lanes mon-lanes">
        ${df.map(B=>{let y=W[B.lane],I=B.lane==="queue"?C.queue_groups.length>0?i`${C.queue_groups.map(N=>i`<div
                        class="mon-group"
                        data-root-dir=${N.root_dir}
                      >
                        ${Cl(N)}
                        <div class="mon-group__list">
                          ${N.items.map(V=>Ol(V,O))}
                        </div>
                      </div>`)}`:void 0:y.length>0?i`${y.map(N=>Ol(N,O))}`:void 0;return Kt({id:`monitor-${B.lane}`,lane:B.pane,title:B.lane==="done"?`\uC644\uB8CC\xB7${S()}`:B.title,items:y,empty:B.empty,body:I,live:B.lane==="running"&&y.length>0,header_control:B.lane==="pr_wait"&&y.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ae(){let O=s&&s.get?s.get():null,W=s&&s.getWorkspacesState?s.getWorkspacesState():[],B=u();C=Eo(O,W,{done_since:xr(m,B),running_sort:b}),Be(R(B),$)}function Ue(O,W){let B=l?l():void 0;if(!W||!B||W===B||!c){n(O);return}c(W).then(()=>{n(O)}).catch(y=>{r("workspace switch for %s failed: %o",W,y)})}function Ce(O){return{root_dir:O.getAttribute("data-root-dir")||"",revision:Number(O.getAttribute("data-revision")||0)||0}}function ye(O,W){let{root_dir:B,revision:y}=Ce(O),I=O.getAttribute("data-issue-id")||"",N=W.dataset.attemptId||O.getAttribute("data-attempt-id")||"",V=W.classList;if(V.contains("worker-card__place")){q("worker-queue-place",{bead_id:I,index:Number(O.getAttribute("data-place-index")||0)||0},B,y);return}if(V.contains("mon-op--up")||V.contains("mon-op--down")){let Q=Number(O.getAttribute("data-queue-index")||0)||0,Oe=V.contains("mon-op--up")?Q-1:Q+1;if(Oe<0)return;q("worker-queue-reorder",{bead_id:I,to_index:Oe},B,y);return}if(V.contains("mon-op--remove")){q("worker-queue-remove",{bead_id:I},B,y);return}if(V.contains("mon-op--pause")){Ie("worker-attempt-pause",{attempt_id:N},B);return}if(V.contains("mon-op--discard")){if(!f(bn(I,"unmerged")))return;me({bead_id:I,...N?{attempt_id:N}:{},...W.dataset.operationId?{operation_id:W.dataset.operationId}:{}},B,y);return}if(V.contains("mon-op--resume")){ve("worker-attempt-resume",{attempt_id:N},B,y);return}if(V.contains("mon-op--dismiss")){q("worker-attempt-dismiss",{attempt_id:N},B,y);return}if(V.contains("worker-mini__merge")){let Q=ce(B,I);Q?.mismatch&&Q.continuation===null?ie(B,I,y,Q.mismatch):q("worker-merge-queue-add",{bead_id:I},B,y);return}if(V.contains("worker-mini__merge-cancel")){q("worker-merge-queue-remove",{bead_id:I},B,y);return}if(V.contains("worker-mini__discard")){let Q=W.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(bn(I,Q)))return;me({bead_id:I,...N?{attempt_id:N}:{},...W.dataset.operationId?{operation_id:W.dataset.operationId}:{}},B,y);return}if(V.contains("worker-mini__revise-fix")){ve("worker-revise-fix",{bead_id:I},B,y);return}V.contains("worker-mini__revise-approve")&&q("worker-revise-approve",{bead_id:I},B,y)}function $e(O){let W=Le;Le=!1;let B=O.target;if(!B||typeof B.closest!="function"||B.closest("dialog")||B.closest("a"))return;let y=B.closest(".mon-running-sort");if(y){O.preventDefault(),b=y.getAttribute("data-sort")==="repo"?"repo":"started",lf(b),ae();return}let I=B.closest(".mon-auto-all");if(I){O.preventDefault(),Re(I.getAttribute("data-on")==="true");return}if(B.closest(".mon-merge-all")){O.preventDefault(),He();return}let V=B.closest(".mon-ctl--advance");if(V){O.preventDefault();let{root_dir:st,revision:et}=Ce(V);q("worker-automation-toggle",{on:V.getAttribute("data-on")==="true"},st,et);return}let Q=B.closest(".mon-ctl--merge-auto");if(Q){O.preventDefault();let{root_dir:st,revision:et}=Ce(Q);q("worker-merge-auto-toggle",{on:Q.getAttribute("data-on")==="true"},st,et);return}let Oe=B.closest(".mon-ctl--exec");if(Oe){O.preventDefault(),j=Oe.getAttribute("data-root-dir")||null,x.delete(j||""),T.open();return}let xe=B.closest(".mon-card");if(!xe)return;let De=B.closest("button");if(De){O.preventDefault(),ye(xe,De);return}let We=xe.getAttribute("data-issue-id");We&&!W&&(O.preventDefault(),Ue(We,xe.getAttribute("data-root-dir")||""))}function Ze(O){let W=O.target;if(!W||typeof W.closest!="function")return;let B=W.closest(".mon-done-range");if(B){m=Rt(B.value)?B.value:At,of(m),ae();return}let y=W.closest(".mon-slots__input");if(!y)return;let{root_dir:I,revision:N}=Ce(y),V=Number(y.value);if(!Number.isFinite(V))return;let Q=Math.max(yn,Math.floor(V));q("worker-queue-set-slots",{slots:Q},I,N)}e.addEventListener("click",$e),e.addEventListener("change",Ze),e.addEventListener("dragstart",G),e.addEventListener("dragover",Ae),e.addEventListener("dragleave",de),e.addEventListener("drop",L),e.addEventListener("dragend",pe),s&&typeof s.subscribe=="function"&&(E=s.subscribe(()=>{try{x.clear(),ae();for(let O of Array.from(K))O()}catch{}}));function qe(){P!==null&&(clearInterval(P),P=null)}function Qe(){be!==null&&(clearTimeout(be),be=null)}return{load(){r("load"),ae(),P===null&&(P=setInterval(()=>{try{ae()}catch{}},cf))},pause(){qe()},clear(){qe(),Qe(),E&&(E(),E=null),e.removeEventListener("click",$e),e.removeEventListener("change",Ze),e.removeEventListener("dragstart",G),e.removeEventListener("dragover",Ae),e.removeEventListener("dragleave",de),e.removeEventListener("drop",L),e.removeEventListener("dragend",pe),T.destroy(),K.clear(),e.replaceChildren()}}}function Fl(e,t,r){let n=nt("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return i`
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
    `}function l(){Be(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),Be(i``,e)}}}var ql=["bug","feature","task","epic","chore"];function Bl(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Ul=["Critical","High","Medium","Low","Backlog"];function jl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function S(){o.replaceChildren();let T=document.createElement("option");T.value="",T.textContent="\u2014 Select \u2014",o.appendChild(T);for(let E of ql){let P=document.createElement("option");P.value=E,P.textContent=Bl(E),o.appendChild(P)}a.replaceChildren();for(let E=0;E<=4;E+=1){let P=document.createElement("option");P.value=String(E);let q=Ul[E]||"Medium";P.textContent=`${E} \u2013 ${q}`,a.appendChild(P)}}S();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function C(T){s.disabled=T,o.disabled=T,a.disabled=T,l.disabled=T,c.disabled=T,f.disabled=T,m.disabled=T,m.textContent=T?"Creating\u2026":"Create"}function j(){u.textContent=""}function x(T){u.textContent=T}function K(){try{let T=window.localStorage.getItem("beads-ui.new.type");T?o.value=T:o.value="";let E=window.localStorage.getItem("beads-ui.new.priority");E&&/^\d$/.test(E)?a.value=E:a.value="2"}catch{o.value="",a.value="2"}}function te(){let T=o.value||"",E=a.value||"";T.length>0&&window.localStorage.setItem("beads-ui.new.type",T),E.length>0&&window.localStorage.setItem("beads-ui.new.priority",E)}async function H(){j();let T=String(s.value||"").trim();if(T.length===0){x("Title is required"),s.focus();return}let E=Number(a.value||"2");if(!(E>=0&&E<=4)){x("Priority must be 0..4"),a.focus();return}let P=String(o.value||""),q=String(c.value||""),ce={title:T};P.length>0&&(ce.type=P),String(E).length>0&&(ce.priority=E),q.length>0&&(ce.description=q),C(!0);try{await t("create-issue",ce)}catch{C(!1),x("Failed to create issue");return}te(),C(!1),$()}return r.addEventListener("cancel",T=>{T.preventDefault(),$()}),b.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",T=>{T.key==="Enter"&&(T.ctrlKey||T.metaKey)&&(T.preventDefault(),H())}),n.addEventListener("submit",T=>{T.preventDefault(),H()}),{open(){n.reset(),j(),K();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var uf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function zl(e){return String(e).padStart(2,"0")}function pf(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function ff(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${zl(n.getHours())}:${zl(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${uf[n.getMonth()]} ${n.getDate()} ${o}`;return`${pf(r,t)} \xB7 ${l}`}function _f(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Hl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Wl(e){let t=!1,r=null,n=new Map;function s(){Be(i``,e),e.hidden=!0}function o(){let c=Hl.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();Be(i`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let m=n.get(f.key),b=typeof m.ageSeconds=="number"&&m.ageSeconds>600,S=b?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${m.windows.map($=>{let C=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,j=Math.min(100,Math.max(0,C)),K=`resets ${ff($.resetsAt,u)}${b?` \xB7 ${S}`:""}`;return i`<span
                class="usage-meter__window ${_f(j)}"
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
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function l(){let c=await Promise.all(Hl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var mf="worker-ineligible";function Io(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Gl(e){return Io(e).includes(mf)}var Lo="worker-serial";function $n(e){return Io(e).includes(Lo)}var gf=20,Yl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Vl={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function hf(e,t,r=gf){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Kl(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function bf(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Zl(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Xl(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function vf(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Vl,n)?Vl[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function yf(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
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
      ><span class="worker-ev__dot worker-ev__dot--${Kl(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Yl,t.kind)?Yl[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ds(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${vo(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Kl(e)}"
          >${bf(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Xl(hl(t.failure_kind,n)):""}
      ${vf(t)}
      ${Zl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ds(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function wf(e){let t=e.cleanup,r=Lr(t.step);return i`<li
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
        ${fl(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Xl(_s(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Zl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function kf(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?wf(t):yf(t))}
        </ul>`}
  </section>`}function Ql(e,t={}){let r=null;function n(){Be(r?kf(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:hf(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var $f="tab:worker:ready",xf="tab:worker:blocked",Sf="tab:worker:in-progress",Af="tab:worker:closed",xn=1,Tf=new Set(["done","failed","orphaned","stopped","discarded"]);function Jl(e){return gn(e).path.length>0}var rc="beads-ui.worker.candidate-filter",Oo={show_blocked:!1,spec:"all"};function Ef(){try{let e=window.localStorage.getItem(rc);if(!e)return{...Oo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Oo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Oo}}}function Cf(e){try{window.localStorage.setItem(rc,JSON.stringify(e))}catch{}}function Rf(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),u=n(l);c&&u?s.push(l):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var If=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],nc="bdui.worker.candidate_sort",Lf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],gs="spec";function Of(){try{let e=window.localStorage.getItem(nc);return e==="board"||e==="created"||e==="spec"?e:gs}catch{return gs}}function Df(e){try{window.localStorage.setItem(nc,e)}catch{}}var sc="bdui.worker.done-range";function Mf(){try{let e=window.localStorage.getItem(sc);return Rt(e)?e:At}catch{return At}}function Nf(e){try{window.localStorage.setItem(sc,e)}catch{}}var Pf="(max-width: 640px)",oc="beads-ui.worker.lane-collapsed",Sn={queue:!0,done:!0};function Ff(){try{let e=window.localStorage.getItem(oc);if(!e)return{...Sn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Sn}:{queue:typeof t.queue=="boolean"?t.queue:Sn.queue,done:typeof t.done=="boolean"?t.done:Sn.done}}catch{return{...Sn}}}function qf(e){try{window.localStorage.setItem(oc,JSON.stringify(e))}catch{}}function ec(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Bf(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Ar):(n.sort(Mn(r)),t==="board"?n:[...n.filter(Jl),...n.filter(s=>!Jl(s))])}function Uf(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function jf(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function zf(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Hf=["closed_unmerged","review","undecidable"],Wf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function Gf(e,t){for(let r of Wf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function tc(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Yf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Vf(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Do(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Kf(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Zf(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,u=!0,f=null,m=null,b=null,S={},$=!1,C=!1){let j=!!c&&c.position>0,x=!!c?.continuation_action&&c.continuation_action.continuation===null,K=!!c&&c.active===!0,te=c&&c.failure||null,H=r[e]||null,T=H&&H.gate?H.gate:null,E=H&&H.pr?H.pr:null,P=Kf(b),q=Yf(c?c.resolution:null),ce=Vf(c?c.head_review:null),ve=c&&c.head_review||null,ie=c&&c.authority||null,me=!!ve&&["pending","reviewing","revising"].includes(ve.state),Ie=j&&!K&&(ve?.state==="failed"||!ie||ie.source==="automatic"&&!C),Re=[];l&&Re.push("\uC138\uC158");let He=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":q?q.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,Ne=Gf(l&&T&&T.tier==="closed_unmerged"?"\uB2EB\uD798":T&&T.gate_badge||"",He?null:o&&o.activity||null);if(He&&Re.push(He),ce&&Re.push(ce.badge),Ne.label&&Re.push(Ne.label),T&&T.base_badge&&T.base_badge!==T.gate_badge&&Re.push(T.base_badge),m&&Re.push(m),n){let pe=Lr(n.step);Re.push(pe?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${pe}`:"\uC815\uB9AC \uBA48\uCDA4")}P&&Re.push(P.badge),j&&!K&&Re.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),te&&Re.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${tc(te)}`),x&&Re.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&Re.push(`\uC790\uB3D9 \uC81C\uC678: ${tc(f)}`);let Le=!!T&&T.base_badge==="\uCDA9\uB3CC",be=!!T&&T.enabled===!0,fe=wo(o&&o.merge_progress?o.merge_progress.step:null),ge=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!T&&T.tier==="merged",_e=l&&!!n&&!!T&&T.tier==="merged",Y=l&&Le&&u===!1,G=Vt(S,e,{external:l,merge_active:K||!!fe,merge_queued:j,conflict_active:!!a,cleanup_active:!1,merged:!!n||T?.tier==="merged"}),Ae=!!G.operation,de=!ge&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?fs(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:l,pr_number:E&&typeof E.number=="number"?E.number:null,pr_url:E&&typeof E.url=="string"?E.url:"",completion_badge:P?P.badge:null,completion_title:P?P.title:"",completion_repair_pr_url:P?P.repair_pr_url:"",completion_repair_pr_number:P?P.repair_pr_number:null,badges:Re,live_badge:a==="paused"?null:q?.live||a==="running"?He:ce?.live?ce.badge:Ne.live?Ne.label:null,usage:s,alert:!!T&&Hf.includes(T.tier)||!!n||!!te||!!(ce&&ce.alert)||!!(P&&P.alert),merge_action:de?!1:!j||x||Ie,timeline_action:de,cancel_action:j&&!x,cancel_enabled:(!K||me)&&!(P&&P.lock_actions),cancel_title:P&&P.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":K&&!me?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":me?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:G,discard_action:G.action,merge_step:fe,discard_enabled:G.enabled,discard_title:G.title,merge_enabled:!fe&&!a&&!Ae&&!(P&&P.lock_actions)&&!Y&&!de&&(be||Le||ge||_e||Ie),merge_label:x?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ge||_e?"\uC815\uB9AC \uC7AC\uAC1C":Le&&!fe&&!ge?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":Ie?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Ae?G.error?`\uD3D0\uAE30 \uC2E4\uD328: ${G.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${G.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:x?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":fe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${fe.label}`:_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Y?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Le?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":be?`\uBA38\uC9C0 (${T.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:T&&T.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${T&&T.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Mo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:m}=t,b=n?Pn(n,l):null,S=qn({transport:r,uiOrderStore:l}),$=null,C=[],j=Ef(),x=Of(),K=Rt(f)?f:Mf(),te=new Map;function H(){let p=Gt.find(w=>w.value===K);return p?p.label:"\uC624\uB298"}let T=Ff(),E=!1,P=new Set,q=new Set,ce=new Set,ve=new Set,ie="ordinary",me=!1,Ie=new Map,Re=[],He=document.createElement("div");He.className="worker-console";let Ne=document.createElement("div");Ne.className="worker-top";let Le=document.createElement("div");Le.className="worker-drawer-overlay",Le.hidden=!0;let be=document.createElement("div");be.className="worker-drawer-overlay__backdrop";let fe=document.createElement("div");fe.className="worker-drawer-host";let ge=document.createElement("div");ge.className="worker-drawer-host",ge.hidden=!0,Le.append(be,fe,ge);let _e=document.createElement("div");_e.className="worker-lanes-host",He.append(Ne,Le,_e),e.appendChild(He);let Y=null,G=os(fe,{transport:r,sessionLogStore:a,onClose:()=>{Y=null,Le.hidden=!0,re()}}),Ae=Ql(ge,{onClose:()=>{ge.hidden=!0,Le.hidden=!0,re()}}),de=cs(He,{queueStore:s,presetStore:o,transport:r});function pe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:xn,queue:[],pr_wait:[],done:[]}}function L(){let p=pe();return typeof p.revision=="number"?p.revision:0}function R(p){p&&p.queue&&s&&s.set(p.queue)}function ae(){let p=pe().queue;return Array.isArray(p)?p.length:0}async function Ue(p,w){if(!r)return;let D=await r("worker-queue-place",{bead_id:p,index:w,expected_revision:L()});R(D),D&&D.conflict&&await r("worker-queue-place",{bead_id:p,index:w,expected_revision:L()}).then(R)}async function Ce(p,w){if(!r)return;let D=await r("worker-queue-reorder",{bead_id:p,to_index:w,expected_revision:L()});R(D),D&&D.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:w,expected_revision:L()}).then(R)}async function ye(p){if(!r)return;let w=await r("worker-queue-remove",{bead_id:p,expected_revision:L()});R(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:L()}).then(R)}async function $e(){if(!r||me)return;let w=(Array.isArray(pe().queue)?pe().queue:[]).map(A=>A.bead_id).filter(A=>ve.has(A));if(w.length===0)return;if(w.some(A=>{let X=Ie.get(A);return X!==!0&&X!==!1})){J("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let D=ie==="serial",se=w.filter(A=>Ie.get(A)!==D);if(se.length===0){ve.clear(),re(),J("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}me=!0,re();let z=[],h=0;try{for(let A of se){let X=await Promise.resolve(r(D?"label-add":"label-remove",{id:A,label:Lo})).catch(()=>[]),ue=Array.isArray(X)?X[0]:X,Me=ue&&typeof ue=="object"?ue.labels:null;ue&&typeof ue=="object"&&ue.id===A&&Array.isArray(Me)&&$n(Me)===D?h+=1:z.push(A)}if(z.length===0){ve.clear(),J(`${h}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}ve.clear();for(let A of z)ve.add(A);J(`${se.length}\uAC1C \uC911 ${h}\uAC1C \uBCC0\uACBD \xB7 ${z.length}\uAC1C \uC2E4\uD328 (${z.join(", ")})`,"error")}finally{me=!1,re()}}async function Ze(p){if(!r||!p)return;let w=await r("worker-attempt-pause",{attempt_id:p});w&&w.paused===!1&&w.reason&&J(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function qe(p){if(!r||!p)return;let w=async(se={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:L(),...se}),D=await w();R(D),D&&D.conflict&&(D=await r("worker-attempt-resume",{attempt_id:p,expected_revision:L()}),R(D)),D=await tr(D,(se,z)=>w({continuation:se,decision_token:z}),{onResult:R,refresh:()=>w()}),D&&D.resumed===!1&&!D.conflict&&D.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${D.reason}`,"error",2400)}async function Qe(p){if(!r||!p)return;let w=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:L()});R(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:L()}),R(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&J(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function O(p,w,D=!0){if(!r)return null;let se=r,z=await se(p,{...w,expected_revision:L()});return R(z),z&&z.conflict&&D&&(z=await se(p,{...w,expected_revision:L()}),R(z)),z}async function W(p){if(!r||!p)return;let w=pe().merge_queue?.find(se=>se.bead_id===p)?.continuation_action;if(w?.mismatch&&w.continuation===null){await y(p,w.mismatch);return}P.add(p),re();let D;try{D=await O("worker-merge-queue-add",{bead_id:p})}finally{P.delete(p),re()}!D||D.conflict||D.applied||J("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function B(p){if(!(!r||!p||q.has(p))){q.add(p),re();try{let w=await r("worker-cleanup-retry",{bead_id:p,expected_revision:L()});R(w),w&&!w.retried&&!w.conflict&&w.reason&&J(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{q.delete(p),re()}}}async function y(p,w){let D=await tr({continuation_mismatch:w},(z,h)=>O("worker-merge-queue-add",{bead_id:p,continuation:z,decision_token:h},!1)),se=D?.queue?.merge_queue?.find(z=>z.bead_id===p)?.continuation_action;if(D?.applied!==!0&&se?.continuation===null&&se.mismatch){await y(p,se.mismatch);return}D&&D.applied===!1&&!D.conflict&&J("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function I(p){if(!r)return;let w=await O("worker-merge-auto-toggle",{on:p});!w||w.conflict||J(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function N(p){if(!r||!p)return;let w=await O("worker-merge-queue-remove",{bead_id:p});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&J("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function V(){await O("worker-merge-queue-remove",{all:!0})}async function Q(p,w=null,D="unmerged",se=null){if(!r||!p)return;let z=bn(p,D);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(z)))return;let A=await r("worker-discard",{bead_id:p,...w?{attempt_id:w}:{},...se?{operation_id:se}:{},expected_revision:L()});if(R(A),A&&A.conflict&&(A=await r("worker-discard",{bead_id:p,...w?{attempt_id:w}:{},...se?{operation_id:se}:{},expected_revision:L()}),R(A)),A&&A.discarded===!0){J(ps(A),"success",5e3);return}if(A&&A.reason){J(`\uD3D0\uAE30 \uC2E4\uD328: ${A.reason}`,"error",2800);return}if(A&&A.accepted&&A.pending==="merged_revert"){J("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(A&&A.accepted&&!A.discarded){J(`\uD3D0\uAE30 \uC9C4\uD589: ${A.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}A&&!A.conflict&&J("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Oe(p,w){if(!r||!w||ce.has(w))return;ce.add(w),re();let D;try{let se=async(z={})=>await r(p,{bead_id:w,expected_revision:L(),...z});D=await se(),R(D),D&&D.conflict&&(D=await r(p,{bead_id:w,expected_revision:L()}),R(D)),p==="worker-revise-fix"&&(D=await tr(D,(z,h)=>se({continuation:z,decision_token:h}),{onResult:R,refresh:()=>se()}))}finally{ce.delete(w),re()}if(!(!D||D.conflict)){if(D.ok){J(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}J(`\uCC98\uBD84 \uAC70\uBD80: ${D.reason||""}`,"error",3e3)}}async function xe(p){if(!r)return;let w=await r("worker-automation-toggle",{on:p,expected_revision:L()});R(w),w&&w.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:L()}).then(R)}async function De(p){if(!r||!p)return;let w=await r("worker-repo-operation-repair",{operation_id:p});if(R(w),w&&w.ok===!1){J(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&J("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function We(p){if(!r||!p)return;let w=await r("worker-repo-operation-dismiss",{operation_id:p});R(w),w&&w.ok===!1&&J(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function st(p){if(!r||!Number.isFinite(p))return;let w=Math.max(xn,Math.floor(p)),D=await r("worker-queue-set-slots",{slots:w,expected_revision:L()});R(D),D&&D.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:L()}).then(R)}async function et(p){if(!r)return;let w=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:L()});R(w),w&&w.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:L()}).then(R)}function ut(){let p=pe(),w=b?b.selectBoardColumn($f,"ready"):[],D=b?b.selectBoardColumn(xf,"blocked"):[],se=b?b.selectBoardColumn(Af,"closed"):[],z=b?b.selectBoardColumn(Sf,"in_progress"):[],h=new Map;for(let g of z){let M=jf(g);if(!M)continue;let ne=h.get(M);ne?ne.push(g):h.set(M,[g])}let A=g=>{let M=Fn(h.get(g)||[]);return M?M.title||M.id:null},X=p.bead_titles||{},ue=new Map;for(let[g,M]of Object.entries(X))typeof M=="string"&&M.length>0&&ue.set(g,M);for(let g of[...w,...D])ue.set(g.id,g.title||g.id);Ie.clear();let Me=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},je=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[g,M]of Object.entries(je))Array.isArray(M)&&Ie.set(g,$n(M));for(let g of[...w,...D]){let M=g.labels;if(!Array.isArray(M))continue;if(!Ie.has(g.id)){Ie.set(g.id,$n(M));continue}let ne=Me[g.id],Ye=er(ne&&typeof ne=="object"?ne.updated_at:null),Wt=er(g.updated_at);Wt!==null&&Ye!==null&&Wt>Ye&&Ie.set(g.id,$n(M))}let _=new Map;for(let[g,M]of Object.entries(Me))M&&typeof M=="object"&&_.set(g,M);for(let g of[...w,...D])_.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let d=g=>_.get(g)||{},k=p.pr_wait||[],v=p.pr_observations||{},F=p.pr_activity||{},ee=p.cleanup_failed||{},he=Object.entries(ee).map(([g,M])=>({bead_id:g,step:M&&M.step?M.step:"",reason:M&&M.reason?M.reason:"",at:M&&typeof M.at=="number"?M.at:null,detail:M&&typeof M.detail=="string"?M.detail:null,output_tail:M&&typeof M.output_tail=="string"&&M.output_tail?M.output_tail:void 0,log_path:M&&typeof M.log_path=="string"&&M.log_path?M.log_path:void 0,retry_count:M&&typeof M.retry_count=="number"&&Number.isInteger(M.retry_count)&&M.retry_count>0?M.retry_count:0,failure_code:M&&typeof M.failure_code=="string"?M.failure_code:void 0,subject_id:M&&typeof M.subject_id=="string"?M.subject_id:void 0,repair_eligible:!!(M&&M.repair_eligible),repair:M&&M.repair?M.repair:void 0})),it=p.queue||[],Pe=new Set(it.map(g=>g.bead_id));for(let g of ve)Pe.has(g)||ve.delete(g);let Nt=new Set([...it.map(g=>g.bead_id),...k.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),ke=new Set(D.map(g=>g.id)),lt=l?l.get()?.order||{}:{},Or=new Set,qo=[];for(let g of[...w,...D])Nt.has(g.id)||Or.has(g.id)||Uf(g)||Gl(g.labels)||(Or.add(g.id),qo.push(g));C=Bf(qo,x,lt);let hc=p.admission||{},Bo=g=>{let M=hc[g];if(!M)return"";if(M.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof M.reason=="string"?M.reason:"",Ye=ne.indexOf(":");return Ye>0&&Ye<ne.length-1?`\u26D4 ${ne.slice(0,Ye)} (${ne.slice(Ye+1)})`:`\u26D4 ${ne}`},bc=C.map(g=>{let M=gn(g),ne=M.path.length>0,Ye=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",Wt=!Ye&&ne&&!M.conflict,lr=ke.has(g.id),Ct=[];lr&&Ct.push(zf(g)),Ye?Ct.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):M.conflict?Ct.push("spec_id_conflict"):ne||Ct.push("spec \uC5C6\uC74C");let In=Bo(g.id);return In&&Ct.push(In),{id:g.id,title:g.title||g.id,reason:Ct.join(" \xB7 "),draggable:Wt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ye,status:g.status,blocked:lr,has_spec:ne}}),hs=Rf(bc,j),vc=hs.visible,yc=p.revise_parked||{},Yr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Uo=(g,M)=>g.map(ne=>{let Ye=M==="queue"?yc[ne.bead_id]:null,Wt=M==="queue"?Vt(Yr,ne.bead_id):null,lr=Wt?.operation?Wt:null,Ct=M==="queue"?Ie.has(ne.bead_id)?Ie.get(ne.bead_id)||!1:null:!1,In=Ct===!0&&(Object.values(p.attempts||{}).some(Qt=>Qt&&Qt.bead_id!==ne.bead_id&&!Tf.has(Qt.status))||k.some(Qt=>Qt.bead_id!==ne.bead_id)||Object.values(Yr).some(Qt=>Qt&&Qt.bead_id!==ne.bead_id&&Qt.phase!=="done")),la=M==="done"?[]:[Bo(ne.bead_id)];return In&&la.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:ne.bead_id,title:ue.get(ne.bead_id)||ne.bead_id,reason:la.filter(Boolean).join(" \xB7 "),draggable:M!=="done"&&!lr,done:M==="done",lane:M,selectable:M==="queue",selected:M==="queue"&&ve.has(ne.bead_id),worker_serial:Ct,discard:lr,badges:Ye?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ye,revise_action:!!Ye,revise_enabled:!!Ye&&!lr&&!ce.has(ne.bead_id),revise_title:Ye?Ye.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ye.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:M==="done"?It(p.attempts||{},ne.bead_id):null,done_at:M==="done"&&typeof ne.added_at=="number"?ne.added_at:void 0,...d(ne.bead_id)}}),jo=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&jo.set(g.bead_id,g.added_at);let Vr=p.attempts?Object.values(p.attempts):[],bs=new Set;for(let g of Vr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&bs.add(g.resumed_from);let vs=new Map;for(let g of Vr)vs.set(g.bead_id,g.attempt_id);let ys=new Map;for(let g of Vr)ys.set(g.attempt_id,g);function ws(g){let M=new Set,ne=g;for(;ne&&!M.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;M.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&ys.get(ne.resumed_from)||null}return!1}let An=typeof p.declared_base=="string"?p.declared_base:null;function wc(g){let M=null;for(let ne of Vr)!ne||ne.bead_id!==g||ws(ne)||(M===null||(typeof ne.started_at=="number"?ne.started_at:0)>=(typeof M.started_at=="number"?M.started_at:0))&&(M=ne);return M&&typeof M.target_base=="string"?M.target_base:null}let zo=[],Ho=[],kc=g=>{let M=vs.get(g.bead_id)!==g.attempt_id,ne=jo.get(g.bead_id),Ye=typeof ne=="number"&&ne>0&&typeof g.finished_at=="number"&&ne>=g.finished_at;return!M&&!Ye&&typeof g.dismissed_at!="number"},Wo=g=>{let M=typeof g.session_id=="string"&&g.session_id.length>0,ne=bs.has(g.attempt_id);return{eligible:M&&!ne,reason:M?ne?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Pt=null;for(let g of Vr){let M=g.status==="paused"&&!bs.has(g.attempt_id);if(g.status==="running"||M)Ho.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:ue.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:M,conflict_resolution:ws(g),base_exception:Do(An,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Vt(Yr,g.bead_id,{attempt_id:g.attempt_id}),usage:It(p.attempts||{},g.bead_id),current_child:A(g.bead_id),...d(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&kc(g)){let ne=Wo(g);zo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:ue.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Vt(Yr,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ne.eligible,resume_reason:ne.reason,conflict_resolution:ws(g),base_exception:Do(An,g.target_base),usage:It(p.attempts||{},g.bead_id),current_child:A(g.bead_id),...d(g.bead_id)}),Pt=g}}let Tn=[...zo,...Ho],Go=null;if(Pt){let g=Wo(Pt),M=Pt.cause_detail;Go={bead_id:Pt.bead_id,repo:Pt.repo||"",reason:Pt.cause||Pt.status,cause_detail:M&&typeof M.reason=="string"?{reason:M.reason,command:typeof M.command=="string"?M.command:null}:null,resume_attempt_id:Pt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Vt(Yr,Pt.bead_id,{attempt_id:Pt.attempt_id})}}let $c=new Set(Tn.map(g=>g.bead_id)),ks=Array.isArray(p.merge_queue)?p.merge_queue:[],Yo=new Map,Vo=new Map,Ko=new Map,Zo=new Map,Xo=new Map;ks.forEach((g,M)=>{g&&typeof g.bead_id=="string"&&(Yo.set(g.bead_id,M+1),Vo.set(g.bead_id,g.resolution),Ko.set(g.bead_id,g.continuation_action||null),Zo.set(g.bead_id,g.head_review||null),Xo.set(g.bead_id,g.authority||null))});let Qo=p.merge_queue_state||{active:null,failures:{}},xc=Qo.failures||{},Sc=p.auto_merge_skips||{},Jo=g=>{let M=Sc[g];if(!M)return null;let ne=v[g],Ye=ne&&ne.pr?ne.pr.head_sha:null;return Ye&&Ye===M.head_sha?M.reason||"":null},En=new Map;for(let g of Tn)g.failed!==!0&&g.conflict_resolution&&(g.paused?En.has(g.bead_id)||En.set(g.bead_id,"paused"):En.set(g.bead_id,"running"));let ea=Tn.filter(g=>!g.paused&&g.failed!==!0).length,ta=(p.workspace_info||{}).slots,Ac=typeof ta=="number"?ta:typeof p.slots=="number"?p.slots:xn,ra=p.pr_wait_holds_slot===!0?xn:Ac,Tc=ea>ra,Cn=xr(K),Ec=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>Cn===void 0||typeof g.added_at!="number"||g.added_at>=Cn).sort((g,M)=>(M.added_at||0)-(g.added_at||0)),Kr=Uo(Ec,"done"),Cc=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),na=[],Rc=u?.()||"";for(let g of se){let M=er(g.closed_at);if(typeof g.id!="string"||Cc.has(g.id)||M===null||Cn!==void 0&&M<Cn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ne=`${Rc}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ye=te.get(ne);Ye===void 0&&r&&(te.set(ne,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(Wt=>{let lr=Array.isArray(Wt)&&Wt.some(Ct=>as(typeof Ct?.text=="string"?Ct.text:"")?.lane==="session");te.set(ne,lr?"session":"not-session"),re()}).catch(()=>{te.set(ne,"failed"),re()})),Ye==="session"&&na.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:M,created_at:g.created_at,updated_at:g.updated_at})}Kr.push(...na),Kr.sort((g,M)=>(M.done_at||0)-(g.done_at||0));let Rn={};for(let g of rr)Rn[g]=0;let sa=!1,oa=0,$s=0,aa=0;for(let g of Kr){let M=g.usage;if(M&&typeof M=="object"){let ne=!1;for(let Ye of rr)Number.isFinite(M[Ye])&&(Rn[Ye]+=M[Ye],sa=!0,ne=!0);ne&&($s+=1,Number.isFinite(M.total_cost_usd)&&(oa+=M.total_cost_usd,aa+=1))}}$s>0&&aa===$s&&(Rn.total_cost_usd=oa);let ia=Kr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Ic=ia.length>0?gt(Wn(ia)):sa?qt(Rn):null;return{queue:p,idToTitle:ue,candidates:vc,candidate_hidden:{blocked:hs.hidden_blocked,spec:hs.hidden_spec},running:Tn,live_count:ea,slots:ra,over_cap:Tc,failure:Go,waiting:Uo(it.filter(g=>!$c.has(g.bead_id)),"queue"),pr_wait:k.map(g=>Zf(g.bead_id,ue.get(g.bead_id)||g.bead_id,v,ee[g.bead_id]||null,It(p.attempts||{},g.bead_id),F[g.bead_id]||(P.has(g.bead_id)||q.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),En.get(g.bead_id)||null,g.external===!0,{position:Yo.get(g.bead_id)||0,active:Qo.active===g.bead_id,failure:xc[g.bead_id]||null,resolution:Vo.get(g.bead_id),continuation_action:Ko.get(g.bead_id),head_review:Zo.get(g.bead_id)||null,authority:Xo.get(g.bead_id)||null},g.wt_present!==!1,p.auto_merge===!0?Jo(g.bead_id):null,Do(An,wc(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},ys.get(vs.get(g.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0)).map(g=>({...g,...d(g.id)})),merge_queue_length:ks.length,merge_queue_running:ks.length>0,auto_excluded:k.map(g=>g.bead_id).filter(g=>Jo(g)!==null),declared_base:An,done:Kr,token_total:Ic,cleanup_failures:he,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function $t(p){let w=p.waiting.length>0?p.waiting[0].id:"\u2014",D=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,se=Z(p),z=p.over_cap?i`<span
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
        >${H()} 완료 <b>${p.done.length}</b></span
      >`,A=i`<span
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
      </button>`,ue=vl({failure:p.failure}),Me=ul(p.repo_operations,p.cleanup_failures);return E?i`<div class="worker-ribbon">
          ${D} ${se}
          <div class="worker-kpi worker-kpi--ribbon">${z}${h}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${X}</div>
          <div class="worker-kpi">${A}</div>
        </div>
        ${Me}${ue}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${D}${se}${X}</div>
        <div class="worker-kpi">
          ${z}${h}${A}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${H()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(je=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${je.tooltip}
                >${H()} 완료 · 누적 ${je.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${Me}${ue}`}function rt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let w=p.running.some(D=>!D.paused&&D.failed!==!0);return i`<section
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
      ${p.pr_wait.map(D=>yo(D))}
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
        ${If.map(D=>i`<button
              type="button"
              class="worker-filter__chip${j.spec===D.value?" is-active":""}"
              data-spec=${D.value}
              aria-pressed=${j.spec===D.value?"true":"false"}
            >
              ${D.label}
            </button>`)}
        ${w.spec>0?i`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function tt(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${Lf.map(p=>i`<option value=${p.value} ?selected=${x===p.value}>
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
    </div>`}function _t(){if(ve.size===0)return"";let p=Array.from(ve),w=p.some(D=>{let se=Ie.get(D);return se!==!0&&se!==!1});return i`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${ie}
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
    </div>`}function U(p){let w=(p.queue.pr_wait||[]).filter(h=>h&&h.external!==!0&&typeof h.bead_id=="string"),D=new Set(p.running.filter(h=>!h.paused&&h.failed!==!0).map(h=>h.bead_id));for(let h of w)D.add(h.bead_id);let se=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||w.length===0||p.waiting.length===0||D.size<p.slots),z=p.pr_wait.some(h=>h.worker_serial===!0);if(!(!se&&!(z&&p.queue.auto_merge!==!0)))return i`${se?i`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${z&&p.queue.auto_merge!==!0?i`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function Z(p){let w=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
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
      </button>`;let D=new Set(p.auto_excluded),se=p.pr_wait.filter(z=>z.merge_action&&z.merge_enabled&&!D.has(z.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${se>0?` ${se}`:""}
    </button>`}function oe(p){let w=Kt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:tt(),controls:ot(p)});return E?i`<div class="worker-lanes worker-lanes--mobile">
        ${rt(p)}
        ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:i`${_t()}${U(p)}`,collapsible:!0,collapsed:T.queue,preview:ec(p.waiting)})}
        ${w}
        ${Kt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${H()} \uC644\uB8CC \uC5C6\uC74C`,controls:at(),collapsible:!0,collapsed:T.done,preview:Array.isArray(p.token_total)?p.token_total.map(D=>D.label).join(" \xB7 "):p.token_total||ec(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${w}
      ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:i`${_t()}${U(p)}`})}
      ${Kt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(D=>!D.paused&&D.failed!==!0),body:So(p.running,Date.now(),Y)})}
      ${Kt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Kt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${H()} ${p.done.length}`,items:p.done,empty:`${H()} \uC644\uB8CC \uC5C6\uC74C`,controls:at()})}
    </div>`}function le(p){T={...T,[p]:!T[p]},qf(T),re()}function re(){let p=ut();Be($t(p),Ne),Be(oe(p),_e)}function Te(){let p=document.querySelector(".app-header");if(!p)return;let w=()=>{let D=Math.round(p.getBoundingClientRect().height);He.style.setProperty("--worker-ribbon-top",`${D}px`)};if(w(),typeof ResizeObserver=="function"){let D=new ResizeObserver(w);D.observe(p),Re.push(()=>D.disconnect())}else window.addEventListener("resize",w),Re.push(()=>window.removeEventListener("resize",w))}function Ve(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Pf);E=!!p.matches;let w=D=>{let se=!!(D&&typeof D.matches=="boolean"?D.matches:p.matches);se!==E&&(E=se,re())};typeof p.addEventListener=="function"?(p.addEventListener("change",w),Re.push(()=>p.removeEventListener("change",w))):typeof p.addListener=="function"&&(p.addListener(w),Re.push(()=>p.removeListener(w)))}let Xe=null;function Se(p){Xe=p.target instanceof Element?p.target:null}function Ge(p){let D=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!D)return;if(Xe&&D.contains(Xe)&&Xe.closest("input, button, a")){p.preventDefault();return}let se=D.dataset.beadId||"",z=D.dataset.lane||"";$={bead_id:se,from_lane:z};try{p.dataTransfer?.setData("text/plain",se),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function we(p){let w=p.target?.closest?.(".worker-pane");if(!w)return;let D=w.dataset.lane||"";D!=="candidate"&&D!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function dt(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ht(p,w){let D=C.find(A=>A.id===p);if(!D)return;let se=C.filter(A=>A.id!==p),z=se.length;if(w){let A=w.dataset.beadId;if(A===p)return;let X=se.findIndex(ue=>ue.id===A);X>=0&&(z=X)}let h=se.slice();h.splice(z,0,D),S.applyReorder(p,h,z)}function Zt(p){let w=p.target?.closest?.(".worker-pane");if(!w)return;p.preventDefault(),w.classList.remove("worker-pane--drag-over");let D=w.dataset.lane||"",se=$?.bead_id||p.dataTransfer?.getData("text/plain")||"",z=$?.from_lane||"";if($=null,!se)return;let h=p.target?.closest?.(".worker-mini, .worker-card"),A=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),X=A.length;if(h){let ue=A.indexOf(h);ue>=0&&(X=ue)}if(w.classList.contains("worker-pane--collapsed")&&(X=ae()),D==="candidate"){if(z==="candidate"){ht(se,h);return}z==="queue"&&ye(se);return}D==="queue"&&(z==="queue"?Ce(se,X):Ue(se,X))}function zt(p){j=p,Cf(p),re()}function Xt(p){x=p==="board"||p==="created"||p==="spec"?p:gs,Df(x),re()}function mt(p){K=Rt(p)?p:At,Nf(K),m?.(K),re()}function xt(p){let w=p.target?.closest?.(".worker-mini__select");if(w){let Me=w.dataset.beadId||"";Me&&(w.checked?ve.add(Me):ve.delete(Me),re());return}let D=p.target?.closest?.(".worker-bulk__mode");if(D){ie=D.value==="serial"?"serial":"ordinary";return}let se=p.target?.closest?.(".worker-filter__blocked");if(se){zt({...j,show_blocked:se.checked});return}let z=p.target?.closest?.(".worker-done-range");if(z){mt(z.value);return}let h=p.target?.closest?.(".worker-sort");if(h){Xt(h.value||gs);return}let A=p.target?.closest?.(".worker-pr-wait-hold");if(A){et(A.checked);return}let X=p.target?.closest?.(".worker-slots__input");if(!X)return;let ue=Number.parseInt(X.value,10);if(!Number.isFinite(ue)){re();return}st(ue).then(re)}function Ot(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Dt(){let p=ut();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function Mt(){Y&&G.close(),ge.hidden=!1,Le.hidden=!1,Ae.open(Dt()),re()}function Ht(p){let w=pe(),D=w.attempts?w.attempts[p]:null;Y=p,Ae.close(),ge.hidden=!0,Le.hidden=!1,G.open({attempt_id:p,meta:Ot(D)}),re()}function Ee(){if(Ae.isOpen()&&Ae.refresh(Dt()),!Y)return;let p=pe(),w=p.attempts?p.attempts[Y]:null;if(w){G.updateMeta(Ot(w));return}G.close()}function bt(p){let w=p.target,D=w?.closest?.(".worker-bulk__apply");if(D){D.disabled||$e();return}if(w?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-exec-defaults-dialog"))return;if(w?.closest?.(".worker-exec-defaults-btn")){de.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){Mt();return}let se=w?.closest?.(".worker-repo-op__session");if(se){let ke=se.dataset.attemptId;ke&&Ht(ke);return}let z=w?.closest?.(".worker-repo-op__resolve");if(z){De(z.dataset.operationId||"");return}let h=w?.closest?.(".worker-repo-op__dismiss");if(h){We(h.dataset.operationId||"");return}let A=w?.closest?.(".worker-cleanup__resume");if(A){let ke=A.dataset.beadId;ke&&B(ke);return}let X=w?.closest?.(".worker-banner__resume");if(X){let ke=X.dataset.attemptId;ke&&qe(ke);return}let ue=w?.closest?.(".worker-banner__discard");if(ue){let ke=ue.dataset.confirmation==="merged"?"merged":"unmerged";Q(ue.dataset.beadId||"",ue.dataset.attemptId||null,ke,ue.dataset.operationId||null);return}let Me=w?.closest?.(".worker-banner__dismiss");if(Me){let ke=Me.dataset.attemptId;ke&&Qe(ke);return}if(w?.closest?.(".worker-play")){xe(!pe().auto_advance);return}let je=w?.closest?.(".worker-merge-all");if(je){je.classList.contains("worker-merge-all--stop")?pe().auto_merge===!0?I(!1):V():I(!0);return}let _=w?.closest?.(".worker-pane__hd--toggle");if(_){let ke=_.dataset.lane;(ke==="queue"||ke==="done")&&le(ke);return}let d=w?.closest?.(".worker-card__place");if(d){let ke=d.dataset.beadId;ke&&!d.disabled&&Ue(ke,ae());return}let k=w?.closest?.(".worker-filter__chip");if(k){let ke=k.dataset.spec;(ke==="all"||ke==="with"||ke==="without")&&zt({...j,spec:ke});return}let v=w?.closest?.(".worker-mini__merge");if(v){let ke=v.dataset.beadId||"";pe().cleanup_failed?.[ke]?B(ke):W(ke);return}let F=w?.closest?.(".worker-mini__merge-cancel");if(F){N(F.dataset.beadId||"");return}let ee=w?.closest?.(".worker-mini__discard");if(ee){Q(ee.dataset.beadId||"",ee.dataset.attemptId||null,ee.dataset.discardMode==="merged"?"merged":"unmerged",ee.dataset.operationId||null);return}let he=w?.closest?.(".worker-mini__revise-fix");if(he){Oe("worker-revise-fix",he.dataset.beadId||"");return}let it=w?.closest?.(".worker-mini__revise-approve");if(it){Oe("worker-revise-approve",it.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let ke=w?.closest?.(".rtile"),lt=ke?.dataset?.beadId,Or=ke?.dataset?.attemptId;lt&&Q(lt,Or||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let lt=w?.closest?.(".rtile")?.dataset?.attemptId;lt&&Qe(lt);return}if(w?.closest?.(".rtile__pause")){let lt=w?.closest?.(".rtile")?.dataset?.attemptId;lt&&Ze(lt);return}if(w?.closest?.(".rtile__resume")){let lt=w?.closest?.(".rtile")?.dataset?.attemptId;lt&&qe(lt);return}if(w?.closest?.(".rtile__session")){let lt=w?.closest?.(".rtile")?.dataset?.attemptId;lt&&Ht(lt);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){Ae.close(),G.close();return}if(w?.closest?.(".worker-drawer-host"))return;let Pe=w?.closest?.(".rtile");if(Pe){if(w?.closest?.(".rtile__id")){let lt=Pe.dataset.beadId;lt&&Tr(lt).then(Or=>{Or?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ke=Pe.dataset.beadId;ke&&c&&c(ke);return}let Nt=w?.closest?.(".worker-mini, .worker-card");if(Nt){let ke=Nt.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){ke&&Tr(ke).then(lt=>{lt?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ke&&c&&c(ke)}}return e.addEventListener("pointerdown",Se),e.addEventListener("dragstart",Ge),e.addEventListener("dragover",we),e.addEventListener("dragleave",dt),e.addEventListener("drop",Zt),e.addEventListener("click",bt),e.addEventListener("change",xt),Ve(),Te(),b&&Re.push(b.subscribe(()=>{for(let[p,w]of te)w==="failed"&&te.delete(p);re()})),s&&Re.push(s.subscribe(()=>{re(),Ee()})),re(),{load(){re()},openExecDefaults(){de.open()},destroy(){for(let p of Re.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",Se),e.removeEventListener("dragstart",Ge),e.removeEventListener("dragover",we),e.removeEventListener("dragleave",dt),e.removeEventListener("drop",Zt),e.removeEventListener("click",bt),e.removeEventListener("change",xt);try{G.destroy()}catch{}Le.hidden=!0;try{de.destroy()}catch{}Be(i``,e)}}}function No(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function ac(e,t,r,n=async()=>{},s=async()=>{}){let o=nt("views:workspace-picker"),a=null,l=!1,c=!1,u=!1;async function f(E){let q=E.target.value,ve=t.getState().workspace?.current?.path||"";if(q&&q!==ve){o("switching workspace to %s",q),l=!0,T();try{await r(q)}catch(ie){o("workspace switch failed: %o",ie)}finally{l=!1,T()}}}async function m(){let E=t.getState(),P=E.workspace?.current?.path||E.workspace?.available?.[0]?.path||"";if(!(!P||c)){o("git-pulling workspace %s",P),c=!0,T();try{await n(P)}catch(q){o("workspace git pull failed: %o",q)}finally{c=!1,T()}}}function b(E){let P=E.target;P&&e.contains(P)||C()}function S(E){E.key==="Escape"&&C()}function $(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",S),T())}function C(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",S),T())}function j(){u?C():$()}async function x(E){let P=E.target,q=P.value,ce=P.checked;o("toggling visibility %s \u2192 %s",q,String(ce));try{await s(q,ce)}catch(ve){o("workspace visibility toggle failed: %o",ve)}}function K(E){return E?i`
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
    `:i``}function te(E,P){return i`
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
                ${E.map(q=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${q.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${q.path}"
                        .checked=${!P.has(q.path)}
                        @change=${x}
                      />
                      <span class="workspace-picker__manage-name"
                        >${No(q.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function H(){let E=t.getState(),P=E.workspace?.current,q=E.workspace?.available||[],ce=new Set(E.workspace?.hidden||[]),ve=P?.path||q[0]?.path||"";if(q.length===0)return i``;let ie=q.filter(me=>!ce.has(me.path)||me.path===ve);if(ie.length<=1){let me=ie[0]||q[0],Ie=No(me.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${me.path}"
            >${Ie}</span
          >
          ${te(q,ce)}
          ${K(ve)}
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
          ${ie.map(me=>i`
              <option
                value="${me.path}"
                ?selected=${me.path===ve}
                title="${me.path}"
              >
                ${No(me.path)}
              </option>
            `)}
        </select>
        ${te(q,ce)}
        ${K(ve)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function T(){Be(H(),e)}return T(),a=t.subscribe(()=>T()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",S),Be(i``,e)}}}var ic=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Po(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function lc(e,t,r=Po()){return{id:r,type:e,payload:t}}function cc(e={}){let t=nt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,u=new Map,f=[],m=new Map,b=new Set;function S(H){for(let T of Array.from(b))try{T(H)}catch{}}function $(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),S(o);let H=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),T=(r.jitterRatio||0)*H,E=Math.max(0,Math.round(H+(Math.random()*2-1)*T));t("ws retry in %d ms (attempt %d)",E,a+1),l=setTimeout(()=>{l=null,te()},E)}function C(H){try{s?.send(JSON.stringify(H))}catch(T){t("ws send failed",T)}}function j(){for(o="open",t("ws open"),S(o),a=0;f.length;){let H=f.shift();H&&C(H)}}function x(H){let T;try{T=JSON.parse(String(H.data))}catch{t("ws received non-JSON message");return}if(!T||typeof T.id!="string"||typeof T.type!="string"){t("ws received invalid envelope");return}if(u.has(T.id)){let P=u.get(T.id);u.delete(T.id),T.ok?P?.resolve(T.payload):P?.reject(T.error||new Error("ws error"));return}let E=m.get(T.type);if(E&&E.size>0)for(let P of Array.from(E))try{P(T.payload)}catch(q){t("ws event handler error",q)}else t("ws received unhandled message type: %s",T.type)}function K(){o="closed",t("ws closed"),S(o);for(let[H,T]of u.entries())T.reject(new Error("ws disconnected")),u.delete(H);a+=1,$()}function te(){if(!c)return;let H=n();try{s=new WebSocket(H),t("ws connecting %s",H),o="connecting",S(o),s.addEventListener("open",j),s.addEventListener("message",x),s.addEventListener("error",()=>{}),s.addEventListener("close",K)}catch(T){t("ws connect failed %o",T),$()}}return te(),{send(H,T){if(!ic.includes(H))return Promise.reject(new Error(`unknown message type: ${H}`));let E=Po(),P=lc(H,T,E);return t("send %s id=%s",H,E),new Promise((q,ce)=>{u.set(E,{resolve:q,reject:ce,type:H}),s&&s.readyState===s.OPEN?C(P):(t("queue %s id=%s (state=%s)",H,E,o),f.push(P))})},on(H,T){m.has(H)||m.set(H,new Set);let E=m.get(H);return E?.add(T),()=>{E?.delete(T)}},onConnection(H){return b.add(H),()=>{b.delete(H)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,te()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Xf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Qf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Fo=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],dc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],br="tab:worker:closed",Jf="bdui.worker.done-range",uc=Nl,pc="worker:queue",fc="ui:order",_c="ui:display-policy",mc="exec:presets",vr="tab:board:closed",gc="beads-ui.board.closed-range";function e_(e){let t=nt("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Be(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Wl(s),o&&a&&l&&c){let be=function(_,d){let k="Request failed",v="";if(_&&typeof _=="object"){let ee=_;if(typeof ee.message=="string"&&ee.message.length>0&&(k=ee.message),typeof ee.details=="string")v=ee.details;else if(ee.details&&typeof ee.details=="object")try{v=JSON.stringify(ee.details,null,2)}catch{v=""}}else typeof _=="string"&&_.length>0&&(k=_);let F=d&&d.length>0?`Failed to load ${d}`:"Request failed";Le.open(F,k,v)},O=function(_){return`${Ee.getState().workspace.current?.path||""}\0${_}`},W=function(){ae&&(ae().catch(()=>{}),ae=null),Ue=null,Ce=null},y=function(_){ye=_;let d=()=>{ye!==_||Ee.getState().selected_id!==_||(ye=null,B(_))};if(!qe){Ze.then(d);return}d()},Q=function(_,d,k,v,F){return k!==V[d]?(F().catch(()=>{}),!1):(_.set(v,F),!0)},Oe=function(){let _=Ee.getState();et(_.view==="board"),at(_.view==="worker"),le(_.view==="monitor"),U(_.view==="board"||_.view==="worker"||!!_.selected_id)},We=function(){let _=xr(xe);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},st=function(){let _=xr(De);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},et=function(_){if(_)for(let[d,k]of Fo){if(I.has(d)||N.has(d))continue;let v=d===vr?We():{type:k};try{Y.register(d,v)}catch(he){t("register %s store failed: %o",d,he)}N.add(d);let F=V.board,ee=!1;_e.subscribeList(d,v).then(he=>{ee=!Q(I,"board",F,d,he)}).catch(he=>{t("subscribe %s failed: %o",d,he),be(he,"board")}).finally(()=>{N.delete(d),ee&&Oe()})}else rt()},rt=function(){V.board+=1;for(let[_]of Fo){let d=I.get(_);d&&(d().catch(()=>{}),I.delete(_));try{Y.unregister(_)}catch(k){t("unregister %s failed: %o",_,k)}}},at=function(_){if(!_){_t();return}for(let[d,k]of dc){if(ot.has(d)||N.has(d))continue;let v=d===br?st():{type:k};try{Y.register(d,v)}catch(he){t("register %s store failed: %o",d,he)}N.add(d);let F=V.worker,ee=!1;_e.subscribeList(d,v).then(he=>{ee=!Q(ot,"worker",F,d,he)}).catch(he=>{t("subscribe %s failed: %o",d,he),be(he,"worker")}).finally(()=>{N.delete(d),ee&&Oe()})}},_t=function(){V.worker+=1;for(let[_]of dc){let d=ot.get(_);d&&(d().catch(()=>{}),ot.delete(_));try{Y.unregister(_)}catch(k){t("unregister %s failed: %o",_,k)}}},U=function(_){if(!_){Z();return}tt||(ge("subscribe-worker-queue",{id:pc}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),tt=()=>ge("unsubscribe-worker-queue",{id:pc}))},Z=function(){tt&&(tt().catch(()=>{}),tt=null)},le=function(_){if(!_){re();return}oe||(ge("subscribe-monitor-pipeline",{id:uc}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),oe=()=>ge("unsubscribe-monitor-pipeline",{id:uc}))},re=function(){oe&&(oe().catch(()=>{}),oe=null)},Ve=function(){Te||(ge("subscribe-ui-order",{id:fc}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),Te=()=>ge("unsubscribe-ui-order",{id:fc}))},Xe=function(){Te&&(Te().catch(()=>{}),Te=null),de.clear()},Ge=function(){Se||(ge("subscribe-display-policy",{id:_c}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),Se=()=>ge("unsubscribe-display-policy",{id:_c}))},we=function(){Se&&(Se().catch(()=>{}),Se=null),pe.clear()},ht=function(){dt||(ge("subscribe-exec-presets",{id:mc}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),dt=()=>ge("unsubscribe-exec-presets",{id:mc}))},Ot=function(_){if(!_)return"Unknown";let d=_.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=be,f=O,m=W,b=y,S=Q,$=Oe,C=We,j=st,x=et,K=rt,te=at,H=_t,T=U,E=Z,P=le,q=re,ce=Ve,ve=Xe,ie=Ge,me=we,Ie=ht,Re=Ot;let He=document.getElementById("header-loading"),Ne=za(He),Le=dl(e),fe=cc(),ge=Ne.wrapSend((_,d)=>fe.send(_,d)),_e=Na(ge),Y=Pa(),G=qa(),Ae=wa(),de=Fa(),pe=va(),L=ya(),R=ka();fe.on("exec-presets-snapshot",_=>{let d=_;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&L.set({revision:d.revision,presets:d.presets})}),fe.on("monitor-pipeline-snapshot",_=>{let d=_;if(!(!d||!Array.isArray(d.workspaces)))try{Ae.set(d.workspaces,d.workspaces_state)}catch{}}),fe.on("ui-order-snapshot",_=>{let d=_;if(d&&typeof d.revision=="number")try{de.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),fe.on("display-policy-snapshot",_=>{let d=_;if(d&&d.policy&&typeof d.policy=="object")try{pe.set(d.policy)}catch{}}),fe.on("session-log-snapshot",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{R.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),fe.on("session-log-append",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{R.append(d.attempt_id,d.event)}catch{}}),fe.on("snapshot",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",v=k?Y.getStore(k):null;if(v&&d&&d.type==="snapshot")try{v.applyPush(d)}catch{}}),fe.on("upsert",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",v=k?Y.getStore(k):null;if(v&&d&&d.type==="upsert")try{v.applyPush(d)}catch{}}),fe.on("delete",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",v=k?Y.getStore(k):null;if(v&&d&&d.type==="delete")try{v.applyPush(d)}catch{}});let ae=null,Ue=null,Ce=null,ye=null,$e=()=>{},Ze=new Promise(_=>{$e=()=>_(void 0)}),qe=!1,Qe=!1;async function B(_){let d=O(_);if(d===Ue||d===Ce)return;Ce=d;let k=`detail:${_}`,v={type:"issue-detail",params:{id:_}};try{Y.register(k,v)}catch(F){t("register detail store failed: %o",F)}try{let F=await _e.subscribeList(k,v);if(Ee.getState().selected_id!==_||O(_)!==d){await F().catch(()=>{});return}ae&&await ae().catch(()=>{}),ae=F,Ue=d}catch(F){t("detail subscribe failed: %o",F),be(F,"issue details")}finally{Ce===d&&(Ce=null)}}let I=new Map,N=new Set,V={board:0,worker:0},xe=At;try{let _=window.localStorage.getItem(gc);Rt(_)&&(xe=_)}catch{}let De=At;try{let _=window.localStorage.getItem(Jf);Rt(_)&&(De=_)}catch{}async function ut(_){if(!Rt(_)||_===xe)return;xe=_;try{window.localStorage.setItem(gc,_)}catch{}let d=I.get(vr);if(!d)return;I.delete(vr),await d().catch(()=>{});let k=We();try{Y.register(vr,k)}catch(v){t("register %s store failed: %o",vr,v)}try{let v=await _e.subscribeList(vr,k);I.set(vr,v)}catch(v){t("re-subscribe %s failed: %o",vr,v),be(v,"board")}}async function $t(_){if(!Rt(_)||_===De)return;De=_;let d=ot.get(br);if(!d)return;ot.delete(br),await d().catch(()=>{});let k=st();try{Y.register(br,k)}catch(v){t("register %s store failed: %o",br,v)}try{let v=await _e.subscribeList(br,k);ot.set(br,v)}catch(v){t("re-subscribe %s failed: %o",br,v),be(v,"worker")}}let ot=new Map,tt=null,oe=null,Te=null,Se=null,dt=null;async function Zt(){Se=null,pe.clear(),dt=null,L.clear(),tt=null,oe=null,I.clear(),ot.clear(),V.board+=1,V.worker+=1,ht();let _=Ee.getState().workspace.current?.path;if(_)try{await fe.send("set-workspace",{path:_})}catch(k){t("workspace restore after reconnect failed: %o",k);return}Ge();let d=Ee.getState();et(d.view==="board"),at(d.view==="worker"),le(d.view==="monitor"),U(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function zt(){t("clearing all subscriptions for workspace switch"),rt(),_t(),Z(),G.clear(),Xe(),Ve(),we(),Ge(),W();let _=Ee.getState();if(_.selected_id)try{Y.unregister(`detail:${_.selected_id}`)}catch{}let d=Ee.getState();et(d.view==="board"),at(d.view==="worker"),le(d.view==="monitor"),U(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&y(d.selected_id)}async function Xt(_){t("requesting workspace switch to %s",_),Qe=!0;try{let d=await fe.send("set-workspace",{path:_});t("workspace switch result: %o",d),d&&d.workspace&&(Ee.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),d.changed&&(await zt(),J("Switched to "+Ot(_),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),J("Failed to switch workspace","error",3e3),d}finally{Qe=!1}}async function mt(_){t("requesting workspace git pull for %s",_);try{let d=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let k=d?.status;if(k==="up_to_date"){J("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){J("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}J("Git pulled "+Ot(_),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let k=d?.code,v=d?.message;if(k==="rebase_conflict"){J("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){J("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){J("Git pull skipped: another operation is running","warning",3e3);return}let F=v?`: ${v}`:"";throw J(`Git pull failed${F}`,"error",3e3),d}}async function xt(_,d){t("setting workspace visibility %s \u2192 %s",_,String(d));try{await fe.send("set-workspace-visibility",{path:_,visible:d}),await Dt()}catch(k){t("workspace visibility update failed: %o",k),J("Failed to update project visibility","error",3e3)}}async function Dt(){try{let _=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let d=_.workspaces.map(ee=>({path:ee.path,database:ee.database,pid:ee.pid,version:ee.version})),k=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,v=Array.isArray(_.hidden)?_.hidden.filter(ee=>typeof ee=="string"):[];Ee.setState({workspace:{current:k,available:d,hidden:v}});let F=window.localStorage.getItem("beads-ui.workspace");F&&(!d.some(he=>he.path===F)||v.includes(F)?window.localStorage.removeItem("beads-ui.workspace"):k&&F!==k.path&&(t("restoring saved workspace preference: %s",F),await Xt(F)))}}catch(_){t("failed to load workspaces: %o",_)}}fe.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(Ee.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Dt(),zt())});let Mt=!1;if(typeof fe.onConnection=="function"){let _=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(Mt=!0,J("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&Mt&&(Mt=!1,J("Reconnected","success",2200),Qf(Ee,(k,v)=>{t(`${k}: %o`,v)}),Zt())};fe.onConnection(_)}let Ht="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(Ht=_)}catch(_){t("view parse error: %o",_)}let Ee=ja({config:Xf(),view:Ht});fe.on("worker-queue-snapshot",_=>{let d=_;if(!d||!d.queue)return;let k=Ee.getState().workspace.current?.path;if(typeof k=="string"&&k.length>0&&d.root_dir!==k){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{G.set(d.queue)}catch{}});let bt=Ba(Ee);bt.start();let p=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),w=async(_,d)=>{try{return await ge(_,d)}catch(k){if(p.has(_))throw k;return[]}};n&&Fl(n,Ee,bt);let D=document.getElementById("workspace-picker");D&&ac(D,Ee,Xt,mt,xt);let se=jl(e,(_,d)=>ge(_,d));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>se.open())}catch{}let z=cl(e,{policyStore:pe,transport:(_,d)=>ge(_,d),labelOptions:()=>{let _=new Set;for(let[d]of Fo)for(let k of Y.snapshotFor(d)||[]){let v=k.labels;if(Array.isArray(v))for(let F of v)typeof F=="string"&&F.length>0&&_.add(F)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>z.open())}catch{}let h=Qa(o,{gotoIssue:_=>bt.gotoIssue(_),issueStores:Y,transport:w,workerQueueStore:G,uiOrderStore:de,displayPolicyStore:pe,closedRange:xe,onClosedRangeChange:_=>{ut(_)},onNewIssue:()=>se.open()}),A=Mo(a,{transport:w,issueStores:Y,queueStore:G,execPresetStore:L,sessionLogStore:R,uiOrderStore:de,gotoIssue:_=>Ee.setState({selected_id:_}),getWorkspacePath:()=>Ee.getState().workspace.current?.path,doneRange:De,onDoneRangeChange:_=>{$t(_)}}),X=Pl(l,{transport:w,pipelineStore:Ae,execPresetStore:L,gotoIssue:_=>bt.gotoIssue(_),getWorkspacePath:()=>Ee.getState().workspace.current?.path,switchWorkspace:_=>Xt(_)}),ue=il(c,{issueStores:Y,transport:w,queueStore:G,execPresetStore:L,sessionLogStore:R,getWorkspacePath:()=>Ee.getState().workspace.current?.path,onNavigate:_=>{Ee.getState().view==="worker"?Ee.setState({selected_id:_}):bt.gotoIssue(_)},onClose:()=>{let _=Ee.getState();Ee.setState({selected_id:null});try{bt.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{Ee.setState({selected_id:null}),bt.gotoView("worker"),A.openExecDefaults()}}),Me=Ee.getState().selected_id;Me&&(c.hidden=!1,ue.load(Me),y(Me)),Ee.subscribe(_=>{let d=_.selected_id;d?(c.hidden=!1,ue.load(d),Qe||y(d)):(ue.clear(),c.hidden=!0,W())});let je=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",l.hidden=_.view!=="monitor",et(_.view==="board"),at(_.view==="worker"),le(_.view==="monitor"),U(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&h.load(),_.view==="worker"&&A.load(),_.view==="monitor"?X.load():X.pause(),window.localStorage.setItem("beads-ui.view",_.view)};Ee.subscribe(je),je(Ee.getState()),Ve(),Ge(),ht(),Dt().finally(()=>{qe=!0,$e()}),window.addEventListener("keydown",_=>{let d=_.ctrlKey||_.metaKey,k=String(_.key||"").toLowerCase(),v=_.target,F=v&&v.tagName?String(v.tagName).toLowerCase():"",ee=F==="input"||F==="textarea"||F==="select"||v&&typeof v.isContentEditable=="boolean"&&v.isContentEditable;d&&k==="n"&&(ee||(_.preventDefault(),se.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&e_(t)});export{e_ as bootstrap,Xf as readBootstrapConfig,Qf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
