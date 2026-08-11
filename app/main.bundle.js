var El=Object.create;var Qn=Object.defineProperty;var Cl=Object.getOwnPropertyDescriptor;var Rl=Object.getOwnPropertyNames;var Il=Object.getPrototypeOf,Ll=Object.prototype.hasOwnProperty;var Dl=(e,t,r)=>t in e?Qn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Jn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ol=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Rl(t))!Ll.call(e,s)&&s!==r&&Qn(e,s,{get:()=>t[s],enumerable:!(n=Cl(t,s))||n.enumerable});return e};var Pl=(e,t,r)=>(r=e!=null?El(Il(e)):{},Ol(t||!e||!e.__esModule?Qn(r,"default",{value:e,enumerable:!0}):r,e));var Ge=(e,t,r)=>Dl(e,typeof t!="symbol"?t+"":t,r);var Mo=Jn((Kp,Po)=>{var xr=1e3,Sr=xr*60,Ar=Sr*60,fr=Ar*24,Bl=fr*7,Ul=fr*365.25;Po.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return jl(e);if(r==="number"&&isFinite(e))return t.long?Hl(e):zl(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function jl(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Ul;case"weeks":case"week":case"w":return r*Bl;case"days":case"day":case"d":return r*fr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Ar;case"minutes":case"minute":case"mins":case"min":case"m":return r*Sr;case"seconds":case"second":case"secs":case"sec":case"s":return r*xr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function zl(e){var t=Math.abs(e);return t>=fr?Math.round(e/fr)+"d":t>=Ar?Math.round(e/Ar)+"h":t>=Sr?Math.round(e/Sr)+"m":t>=xr?Math.round(e/xr)+"s":e+"ms"}function Hl(e){var t=Math.abs(e);return t>=fr?mn(e,t,fr,"day"):t>=Ar?mn(e,t,Ar,"hour"):t>=Sr?mn(e,t,Sr,"minute"):t>=xr?mn(e,t,xr,"second"):e+" ms"}function mn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Fo=Jn((Zp,No)=>{function Wl(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=Mo(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let g=0;g<p.length;g++)f=(f<<5)-f+p.charCodeAt(g),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,g=null,A,x;function T(...q){if(!T.enabled)return;let w=T,D=Number(new Date),ee=D-(f||D);w.diff=ee,w.prev=f,w.curr=D,f=D,q[0]=r.coerce(q[0]),typeof q[0]!="string"&&q.unshift("%O");let I=0;q[0]=q[0].replace(/%([a-zA-Z%])/g,(S,M)=>{if(S==="%%")return"%";I++;let N=r.formatters[M];if(typeof N=="function"){let le=q[I];S=N.call(w,le),q.splice(I,1),I--}return S}),r.formatArgs.call(w,q),(w.log||r.log).apply(w,q)}return T.namespace=p,T.useColors=r.useColors(),T.color=r.selectColor(p),T.extend=n,T.destroy=r.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(A!==r.namespaces&&(A=r.namespaces,x=r.enabled(p)),x),set:q=>{g=q}}),typeof r.init=="function"&&r.init(T),T}function n(p,f){let g=r(this.namespace+(typeof f>"u"?":":f)+p);return g.log=this.log,g}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of f)g[0]==="-"?r.skips.push(g.slice(1)):r.names.push(g)}function o(p,f){let g=0,A=0,x=-1,T=0;for(;g<p.length;)if(A<f.length&&(f[A]===p[g]||f[A]==="*"))f[A]==="*"?(x=A,T=g,A++):(g++,A++);else if(x!==-1)A=x+1,T++,g=T;else return!1;for(;A<f.length&&f[A]==="*";)A++;return A===f.length}function a(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function i(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}No.exports=Wl});var qo=Jn((St,gn)=>{St.formatArgs=Yl;St.save=Vl;St.load=Kl;St.useColors=Gl;St.storage=Zl();St.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();St.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Gl(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Yl(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+gn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}St.log=console.debug||console.log||(()=>{});function Vl(e){try{e?St.storage.setItem("debug",e):St.storage.removeItem("debug")}catch{}}function Kl(){let e;try{e=St.storage.getItem("debug")||St.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Zl(){try{return localStorage}catch{}}gn.exports=Fo()(St);var{formatters:Xl}=gn.exports;Xl.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Nr=globalThis,_n=Nr.trustedTypes,ko=_n?_n.createPolicy("lit-html",{createHTML:e=>e}):void 0,To="$lit$",er=`lit$${Math.random().toFixed(9).slice(2)}$`,Eo="?"+er,Ml=`<${Eo}>`,ur=document,Fr=()=>ur.createComment(""),qr=e=>e===null||typeof e!="object"&&typeof e!="function",as=Array.isArray,Nl=e=>as(e)||typeof e?.[Symbol.iterator]=="function",es=`[ 	
\f\r]`,Mr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wo=/-->/g,$o=/>/g,cr=RegExp(`>|${es}(?:([^\\s"'>=/]+)(${es}*=${es}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xo=/'/g,So=/"/g,Co=/^(?:script|style|textarea|title)$/i,is=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=is(1),Ht=is(2),jp=is(3),pr=Symbol.for("lit-noChange"),nt=Symbol.for("lit-nothing"),Ao=new WeakMap,dr=ur.createTreeWalker(ur,129);function Ro(e,t){if(!as(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ko!==void 0?ko.createHTML(t):t}var Fl=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Mr;for(let i=0;i<r;i++){let l=e[i],d,p,f=-1,g=0;for(;g<l.length&&(a.lastIndex=g,p=a.exec(l),p!==null);)g=a.lastIndex,a===Mr?p[1]==="!--"?a=wo:p[1]!==void 0?a=$o:p[2]!==void 0?(Co.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=cr):p[3]!==void 0&&(a=cr):a===cr?p[0]===">"?(a=s??Mr,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?cr:p[3]==='"'?So:xo):a===So||a===xo?a=cr:a===wo||a===$o?a=Mr:(a=cr,s=void 0);let A=a===cr&&e[i+1].startsWith("/>")?" ":"";o+=a===Mr?l+Ml:f>=0?(n.push(d),l.slice(0,f)+To+l.slice(f)+er+A):l+er+(f===-2?i:A)}return[Ro(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Br=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[d,p]=Fl(t,r);if(this.el=e.createElement(d,n),dr.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=dr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(To)){let g=p[a++],A=s.getAttribute(f).split(er),x=/([.?@])?(.*)/.exec(g);l.push({type:1,index:o,name:x[2],strings:A,ctor:x[1]==="."?rs:x[1]==="?"?ns:x[1]==="@"?ss:wr}),s.removeAttribute(f)}else f.startsWith(er)&&(l.push({type:6,index:o}),s.removeAttribute(f));if(Co.test(s.tagName)){let f=s.textContent.split(er),g=f.length-1;if(g>0){s.textContent=_n?_n.emptyScript:"";for(let A=0;A<g;A++)s.append(f[A],Fr()),dr.nextNode(),l.push({type:2,index:++o});s.append(f[g],Fr())}}}else if(s.nodeType===8)if(s.data===Eo)l.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(er,f+1))!==-1;)l.push({type:7,index:o}),f+=er.length-1}o++}}static createElement(t,r){let n=ur.createElement("template");return n.innerHTML=t,n}};function kr(e,t,r=e,n){if(t===pr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=qr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=kr(e,s._$AS(e,t.values),s,n)),t}var ts=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??ur).importNode(r,!0);dr.currentNode=s;let o=dr.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Ur(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new os(o,this,t)),this._$AV.push(d),l=n[++i]}a!==l?.index&&(o=dr.nextNode(),a++)}return dr.currentNode=ur,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Ur=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=nt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=kr(this,t,r),qr(t)?t===nt||t==null||t===""?(this._$AH!==nt&&this._$AR(),this._$AH=nt):t!==this._$AH&&t!==pr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Nl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==nt&&qr(this._$AH)?this._$AA.nextSibling.data=t:this.T(ur.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Br.createElement(Ro(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ts(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Ao.get(t.strings);return r===void 0&&Ao.set(t.strings,r=new Br(t)),r}k(t){as(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Fr()),this.O(Fr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},wr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=nt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=nt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=kr(this,t,r,0),a=!qr(t)||t!==this._$AH&&t!==pr,a&&(this._$AH=t);else{let i=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=kr(this,i[n+l],r,l),d===pr&&(d=this._$AH[l]),a||(a=!qr(d)||d!==this._$AH[l]),d===nt?t=nt:t!==nt&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===nt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},rs=class extends wr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===nt?void 0:t}},ns=class extends wr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==nt)}},ss=class extends wr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=kr(this,t,r,0)??nt)===pr)return;let n=this._$AH,s=t===nt&&n!==nt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==nt&&(n===nt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},os=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){kr(this,t)}};var ql=Nr.litHtmlPolyfillSupport;ql?.(Br,Ur),(Nr.litHtmlVersions??(Nr.litHtmlVersions=[])).push("3.3.1");var qe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Ur(t.insertBefore(Fr(),o),o,void 0,r??{})}return s._$AI(e),s};var Tt="today",qt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Wt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Io(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Lo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Do(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Oo(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Bo=Pl(qo(),1);function Ze(e){return(0,Bo.default)(`beads-ui:${e}`)}function It(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function _r(e,t){let r=It(e.created_at),n=It(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function zo(e,t){let r=It(e.created_at),n=It(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ho(e,t){let r=It(e.updated_at),n=It(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Wo(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=It(e.created_at),o=It(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Go(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Ql=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Uo(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function jo(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Ql.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Yo(e,t){let r=Uo(e),n=Uo(t);if(r!==n)return r<n?-1:1;let s=jo(e),o=jo(t);if(s!==o)return s<o?-1:1;let a=It(e&&e.created_at),i=It(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var ls=2**20;function Tr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-It(e&&e.created_at)}function hn(e){return(t,r)=>{let n=Tr(t,e),s=Tr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function cs(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Tr(i,r)-ls};if(!i)return{rank:Tr(a,r)+ls};let l=Tr(a,r),d=Tr(i,r),p=(l+d)/2;return l<p&&p<d?{rank:p}:{renormalize:n.map((f,g)=>({bead_id:f.id,rank:g*ls}))}}function ds(e,t={}){let r=Ze(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||_r;function d(){for(let g of Array.from(a))try{g()}catch{}}function p(){s=Array.from(n.values()).sort(l)}function f(g){if(i||!g||g.id!==e)return;let A=Number(g.revision)||0;if(r("apply %s rev=%d",g.type,A),!(A<=o&&g.type!=="snapshot")){if(g.type==="snapshot"){if(A<=o)return;n.clear();let x=Array.isArray(g.issues)?g.issues:[];for(let T of x)T&&typeof T.id=="string"&&T.id.length>0&&n.set(T.id,T);p(),o=A,d();return}if(g.type==="upsert"){let x=g.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let T=n.get(x.id);if(!T)n.set(x.id,x);else{let q=Number.isFinite(T.updated_at)?T.updated_at:0,w=Number.isFinite(x.updated_at)?x.updated_at:0;if(q<=w){for(let D of Object.keys(T))D in x||delete T[D];for(let[D,ee]of Object.entries(x))T[D]=ee}}p()}o=A,d()}else if(g.type==="delete"){let x=String(g.issue_id||"");x&&(n.delete(x),p()),o=A,d()}}}return{id:e,subscribe(g){return a.add(g),()=>{a.delete(g)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(g){return n.get(g)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function bn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Vo(e){let t=Ze("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let p=Array.isArray(l.added)?l.added:[],f=Array.isArray(l.updated)?l.updated:[],g=Array.isArray(l.removed)?l.removed:[];for(let A of Array.from(d)){let x=r.get(A);if(!x)continue;let T=x.itemsById;for(let q of p)typeof q=="string"&&q.length>0&&T.set(q,!0);for(let q of f)typeof q=="string"&&q.length>0&&T.set(q,!0);for(let q of g)typeof q=="string"&&q.length>0&&T.delete(q)}}async function o(i,l){let d=bn(l);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let f=r.get(i);if(f&&f.key!==d){let g=n.get(f.key);g&&(g.delete(i),g.size===0&&n.delete(f.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(f){let g=r.get(i)||null;if(g){let A=n.get(g.key);A&&(A.delete(i),A.size===0&&n.delete(g.key))}throw r.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=r.get(i)||null;if(f){let g=n.get(f.key);g&&(g.delete(i),g.size===0&&n.delete(f.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:bn,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let d=r.get(i);return d?d.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),d={};if(!l)return d;for(let p of l.itemsById.keys())d[p]=!0;return d}}}}function Ko(){let e=Ze("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,p){let f=d?bn(d):"",g=r.get(l)||"",A=t.has(l);if(e("register %s key=%s (prev=%s)",l,f,g),A&&g&&f&&g!==f){let x=t.get(l);if(x)try{x.dispose()}catch{}let T=s.get(l);if(T){try{T()}catch{}s.delete(l)}let q=ds(l,p);t.set(l,q);let w=q.subscribe(()=>o());s.set(l,w)}else if(!A){let x=ds(l,p);t.set(l,x);let T=x.subscribe(()=>o());s.set(l,T)}return r.set(l,f),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Zo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Xo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function us(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Jl(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ec(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Qo(e){let t=Ze("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Jl(n),a=ec(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=us(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?us(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var tc=Object.freeze({workspace_config:{default_workspace:null}});function Jo(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:tc.workspace_config.default_workspace}}}function ea(e={}){let t=Ze("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Jo(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Jo(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function ta(e){let t=Ze("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(f,g)=>{let A=s++,x=Date.now();n.set(A,{type:f,start_ts:x}),t("request start id=%d type=%s count=%d",A,f,r+1),a();let T=!1,q=()=>{T||(T=!0,n.delete(A),i())},w=setTimeout(()=>{T||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,f,Date.now()-x),q())},3e4);try{let D=await d(f,g),ee=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",A,f,ee),D}catch(D){let ee=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,f,ee,D),D}finally{clearTimeout(w),q()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function re(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function vn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Go),l;switch(i){case"created_desc":return l.sort(_r),l;case"created_asc":return l.sort(zo),l;case"updated_desc":return l.sort(Ho),l;case"priority":return l.sort(Wo),l;case"manual":default:{let d=r();return d?l.sort(hn(d)):l.sort(_r),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ht(e){let t=jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function At(e,t){let r=jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function yn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function kn(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let d of i)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(cs(i,l,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let g={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(g);let A=n(cs(i,l,g.order),a);s(g,A);let x=await t("ui-order-set",{expected_revision:g.revision,entries:A});x&&x.applied&&r.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function wn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ps(e,t){return!t||typeof e!="string"||e.length===0||wn(t.visible_labels).includes(e)?!0:wn(t.hidden_labels).includes(e)?!1:!wn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function $n(e,t){return wn(e).filter(r=>ps(r,t))}function tr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var rc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},na={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},ra={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},nc={review:"\u2713",skip:"\u2298"},rr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function sc(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function sa(e){let t=e&&e.fill||"none";return t==="none"?rr.none:e&&e.stale===!0?rr.stale:t==="dim"?rr.dim:e&&e.glyph==="review"?rr.review:e&&e.glyph==="skip"?rr.skip:rr.done}function oc(e){if(!e||e.fill==="none"||!e.approval_state)return sa(e);let t=[];return e.glyph==="review"?t.push(rr.review):e.glyph==="skip"&&t.push(rr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function ac(e,t,r){let n=rc[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=nc[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${l}>
        ${na[e]||e}
      </div>
    </div>
  `}function xn(e,t){if(!e||!e.stages)return"";let r=ra[e.route]||ra.spec_backed,n=e.stages,s=sc(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${na[a]||a} ${a==="plan"?oc(n[a]||{}):sa(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>ac(a,n[a]||{},a===s))}
    </div>
  `}function ic(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var oa=2;function lc(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,oa).join(", "),s=r.length-oa,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function cc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&tr(r,"route")){let a=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&tr(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&tr(r,"pr")){let a=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}for(let a of $n(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&tr(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),tr(r,"blocked")&&s.push(...lc(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&tr(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function dc(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function uc(e){let t=At(e.created_at),r=At(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function pc(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Yo):r.children;return c`
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
        ${uc(e)}
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
                  <span class=${dc(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Sn(e,t){let r=ic(e.priority);return c`
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
      ${cc(e,t)}
      ${e.workflow&&tr(t.policy||null,"stepper")?xn(e.workflow,e.status):""}
      ${pc(e,t)}
    </article>
  `}function Er(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
        ${e.items.map(o=>Sn(o,t))}
      </div>
    </section>
  `}function aa(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Sn(n,t))}
        </div>
      </div>
    </dialog>
  `}var fc=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],_c=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],mc=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function gc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function ia(e,t,r){return c`
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
        ${fc.map(n=>c`<option
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
        ${_c.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${gc(e,t,r)}
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
        ${mc.map(n=>c`<option
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
  `}var hc=200,bc={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},vc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),la="beads-ui.board.sort",ca=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function yc(){try{let e=window.localStorage.getItem(la);if(e&&ca.has(e))return e}catch{}return"created_desc"}function da(e,t){let r=Ze("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||Tt,g=s?vn(s,a):null,A=kn({transport:o,uiOrderStore:a}),x=[],T=[],q=[],w=[],D=[],ee=[],I=!1,E=0,S=yc(),M=new Map,N=new Map,le=new Map,Le=new Set,ce={search:"",priority:"",type:"",labels:[]},$e=!1,Ee=null;function je(F){return String(F.status||"open")==="open"}function Pe(F){let G=String(F.status||"open");return G==="open"||G==="blocked"}function Me(F){let G=ce.search.trim().toLowerCase(),de=ce.priority,fe=ce.type,u=ce.labels;return F.filter(h=>{if(G){let P=String(h.id||"").toLowerCase(),Q=String(h.title||"").toLowerCase();if(!P.includes(G)&&!Q.includes(G))return!1}if(de!==""&&String(h.priority)!==de||fe!==""&&String(h.issue_type||"")!==fe)return!1;if(u.length>0){let P=Array.isArray(h.labels)?h.labels:[];if(!u.some(Q=>P.includes(Q)))return!1}return!0})}function be(){let F=new Set;for(let G of[x,T,q,w,D,ee])for(let de of G){let fe=Array.isArray(de.labels)?de.labels:[];for(let u of fe)typeof u=="string"&&u.length>0&&F.add(u)}return Array.from(F).sort()}function oe(){return ce.search.trim()!==""||ce.priority!==""||ce.type!==""||ce.labels.length>0}function ve(){try{if(g){let F=g.selectBoardColumn("tab:board:in-progress","in_progress",S),G=g.selectBoardColumn("tab:board:blocked","blocked",S).filter(Pe),de=new Set(F.map(K=>K.id)),fe=g.selectBoardColumn("tab:board:ready","ready",S).filter(K=>je(K)&&!de.has(K.id)),u=g.selectBoardColumn("tab:board:resolved","resolved",S),h=g.selectBoardColumn("tab:board:deferred","deferred",S),P=g.selectBoardColumn("tab:board:closed","closed").slice(0,hc),Q=[...G,...fe,...F,...u,...P];Oe(Q);let ie=new Set;for(let K of Q)K&&K.id&&!fs(K)&&ie.add(K.id);let ke=!oe();x=ke?zr(G,ie):G,T=ke?zr(fe,ie):fe,q=ke?zr(F,ie):F,w=ke?zr(u,ie):u,D=h,E=h.length,ee=ke?zr(P,ie):P,M=new Map;for(let K of x)M.set(K.id,"open");for(let K of T)M.set(K.id,"open");for(let K of q)M.set(K.id,"in_progress");for(let K of w)M.set(K.id,"resolved");for(let K of D)M.set(K.id,"deferred");for(let K of ee)M.set(K.id,"closed");N=new Map;for(let K of x)N.set(K.id,"blocked-col");for(let K of T)N.set(K.id,"ready-col");for(let K of q)N.set(K.id,"in-progress-col");for(let K of w)N.set(K.id,"resolved-col");for(let K of ee)N.set(K.id,"closed-col")}ze()}catch{x=[],T=[],q=[],w=[],D=[],ee=[],le=new Map,ze()}}function Oe(F){let G=new Map;for(let fe of F)fe&&fe.id&&!G.has(fe.id)&&G.set(fe.id,fe);let de=new Map;for(let fe of G.values()){let u=fs(fe);if(!u)continue;let h=de.get(u);h||(h=[],de.set(u,h)),h.push({id:fe.id,title:fe.title,status:fe.status,metadata:fe.metadata,created_at:fe.created_at,updated_at:fe.updated_at})}le=de}function pe(F){let G=le.get(F)||[],de=0;for(let u of G)(u.status==="resolved"||u.status==="closed")&&(de+=1);let fe=yn(G);return{total:G.length,count:de,current:fe,children:G}}function te(F){return!Le.has(F)}function Z(F,G){F.preventDefault(),F.stopPropagation(),Le.has(G)?Le.delete(G):Le.add(G),ze()}function Se(F,G){F.preventDefault(),F.stopPropagation(),n(G)}function _e(F,G){F.preventDefault(),F.stopPropagation(),n(G)}function ge(F,G){Ee||n(G)}function U(F,G){F.preventDefault(),F.stopPropagation(),kc(G).then(de=>{de&&re("\uBCF5\uC0AC\uB428","success",1200)})}function L(F,G){Ee=G,F.dataTransfer&&(F.dataTransfer.setData("text/plain",G),F.dataTransfer.effectAllowed="move"),F.target.classList.add("board-card--dragging")}function ae(F){F.target.classList.remove("board-card--dragging"),bt(),setTimeout(()=>{Ee=null},0)}function he(F){let G=String(F.target.value||"");!G||G===f||(f=G,d&&d(G),ze())}function xe(){return i?i.get():null}function We(F){let G=l?l.get():null,de=G?G.cleanup_failed:null;if(!de||typeof de!="object"||Array.isArray(de))return null;let fe=de[F];return!fe||typeof fe!="object"||Array.isArray(fe)?null:fe}let Ae={onCardClick:ge,onCopyId:U,onDragStart:L,onDragEnd:ae,onClosedRangeChange:he,rollupFor:pe,isExpanded:te,onRollupToggle:Z,onChildClick:Se,onFromChipClick:_e,cleanupFailureFor:We,get policy(){return xe()}};function O(F,G){Ee||(Re(),n(G))}function j(F,G){F.preventDefault(),F.stopPropagation(),Re(),n(G)}let R={...Ae,onCardClick:O,onChildClick:j,onFromChipClick:j,get policy(){return xe()}};function y(F){let G=F.target,de=e.querySelector(".board-filter__labels");G&&de&&de.contains(G)||Y()}function z(F){F.key==="Escape"&&Y()}function B(){$e||($e=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",z),ze())}function Y(){$e&&($e=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",z),ze())}function se(F){F.key==="Escape"&&Re()}function ye(){I||(I=!0,document.addEventListener("keydown",se),ze())}function Re(){I&&(I=!1,document.removeEventListener("keydown",se),ze())}let Qe={onClose:Re,onOverlayClick(F){F.target===F.currentTarget&&Re()}},Je={onSearchInput(F){ce.search=String(F.target.value||""),ve()},onPriorityChange(F){ce.priority=String(F.target.value||""),ve()},onTypeChange(F){ce.type=String(F.target.value||""),ve()},onSortChange(F){let G=String(F.target.value||"");if(!(!ca.has(G)||G===S)){S=G;try{window.localStorage.setItem(la,G)}catch{}ve()}},onDeferredToggle(){I?Re():ye()},onLabelMenuToggle(){$e?Y():B()},onLabelToggle(F){let G=ce.labels.indexOf(F);G===-1?ce.labels.push(F):ce.labels.splice(G,1),ve()},onLabelClear(){ce.labels.length!==0&&(ce.labels=[],ve())},onNewIssue(){p&&p()}};function De(){return c`
      <div class="board-view">
        ${ia(ce,Je,{sort_mode:S,deferred_popup_open:I,deferred_count:E,label_options:be(),label_menu_open:$e})}
        <div class="board-root">
          ${Er({title:"Blocked",id:"blocked-col",items:Me(x)},Ae)}
          ${Er({title:"Ready",id:"ready-col",items:Me(T)},Ae)}
          ${Er({title:"In progress",id:"in-progress-col",items:Me(q)},Ae)}
          ${Er({title:"Resolved",id:"resolved-col",items:Me(w)},Ae)}
          ${Er({title:"Closed",id:"closed-col",items:Me(ee),is_closed:!0,closed_range:f},Ae)}
        </div>
        ${I?aa({items:Me(D),count:E},R,Qe):""}
      </div>
    `}function ze(){qe(De(),e),Mt()}function Mt(){try{let F=e.querySelector("#deferred-popup");F&&!F.open&&(typeof F.showModal=="function"?F.showModal():F.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let de of G)Array.from(de.querySelectorAll(".board-card")).forEach((u,h)=>{u.tabIndex=h===0?0:-1})}catch{}}async function _t(F,G){if(!o){re("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:F,status:G}),re("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(de){r("update-status failed: %o",de),re("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function lt(F){switch(F){case"blocked-col":return x;case"ready-col":return T;case"in-progress-col":return q;case"resolved-col":return w;default:return[]}}function st(F,G,de){if(!o||!a)return;let fe=lt(F),u=fe.find(ke=>ke.id===G);if(!u)return;let h=fe.filter(ke=>ke.id!==G),P=de.closest?de.closest(".board-card"):null,Q=h.length;if(P){let ke=P.getAttribute("data-issue-id");if(ke===G)return;let K=h.findIndex(Ce=>Ce.id===ke);K>=0&&(Q=K)}let ie=h.slice();ie.splice(Q,0,u),A.applyReorder(G,ie,Q)}function bt(){for(let F of Array.from(e.querySelectorAll(".board-column--drag-over")))F.classList.remove("board-column--drag-over")}let Ye=null;e.addEventListener("dragover",F=>{F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move");let de=F.target.closest(".board-column");de&&de!==Ye&&(Ye&&Ye.classList.remove("board-column--drag-over"),de.classList.add("board-column--drag-over"),Ye=de)}),e.addEventListener("dragleave",F=>{let G=F.relatedTarget;(!G||!e.contains(G))&&Ye&&(Ye.classList.remove("board-column--drag-over"),Ye=null)}),e.addEventListener("drop",F=>{F.preventDefault(),Ye&&(Ye.classList.remove("board-column--drag-over"),Ye=null);let G=F.target,de=G.closest(".board-column");if(!de)return;let fe=F.dataTransfer?.getData("text/plain")||"";if(!fe)return;let u=de.id,h=N.get(fe);if(h&&h===u){if(vc.has(u)){if(S!=="manual"){re("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}st(u,fe,G)}return}let P=bc[u];if(!P){re("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}M.get(fe)!==P&&_t(fe,P)}),e.addEventListener("keydown",F=>{let G=F.target;if(!(G instanceof HTMLElement))return;let de=String(G.tagName||"").toLowerCase();if(de==="input"||de==="textarea"||de==="select"||de==="button"||de==="a"||G.isContentEditable===!0)return;let fe=G.closest(".board-card");if(!fe)return;let u=String(F.key||"");if(u==="Enter"||u===" "){F.preventDefault();let ie=fe.getAttribute("data-issue-id");ie&&n(ie);return}if(u!=="ArrowUp"&&u!=="ArrowDown"&&u!=="ArrowLeft"&&u!=="ArrowRight")return;F.preventDefault();let h=fe.closest(".board-column");if(!h)return;let P=Array.from(h.querySelectorAll(".board-card")),Q=P.indexOf(fe);if(u==="ArrowDown"&&Q<P.length-1){ot(fe,P[Q+1]);return}if(u==="ArrowUp"&&Q>0){ot(fe,P[Q-1]);return}if(u==="ArrowLeft"||u==="ArrowRight"){let ie=Array.from(e.querySelectorAll(".board-column")),ke=ie.indexOf(h),K=u==="ArrowRight"?1:-1,Ce=ke+K;for(;Ce>=0&&Ce<ie.length;){let Ke=ie[Ce].querySelector(".board-card");if(Ke){ot(fe,Ke);return}Ce+=K}}});function ot(F,G){try{F.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let et=null;g&&g.subscribe&&(et=g.subscribe(()=>{try{ve()}catch{}}));let tt=null;i&&i.subscribe&&(tt=i.subscribe(()=>{try{ve()}catch{}}));let it=null;return l&&l.subscribe&&(it=l.subscribe(()=>{ze()})),{async load(){r("load"),ve()},clear(){Y(),Re(),et&&(et(),et=null),tt&&(tt(),tt=null),it&&(it(),it=null),e.replaceChildren(),x=[],T=[],q=[],w=[],D=[],ee=[],M=new Map,N=new Map}}}function fs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function zr(e,t){return e.filter(r=>{let n=fs(r);return!(n&&t.has(n))})}async function kc(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function mr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var ma="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function dt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Gt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Hr=[...Gt,"reasoning_output_tokens"],wc=["implementation","review-consult"];function _s(e){let t=0;for(let r of Gt)t+=dt(e?.[r]);return t}function $c(e){return!e||typeof e!="object"?!1:Gt.some(t=>Number.isFinite(e[t]))}function ua(e){return!e||typeof e!="object"?!1:Hr.some(t=>Number.isFinite(e[t]))}function xc(e){let t={};for(let r of Hr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function pa(e){let t={};for(let r of Hr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function fa(e,t){return e==="codex"?dt(t.input_tokens)+dt(t.output_tokens):_s(t)}function Sc(e){return e==="claude"?"Claude":"Codex"}function Ac(e){return`\u03C4 ${ga(e)}`}function Tc(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${dt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${dt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${dt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${dt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${dt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${dt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${dt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(ma),o.join(`
`)}function ft(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Sc(r)} ${Ac(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Tc(r,n)})}return t}function Tn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of Hr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=dt(i.breakdown[l])+dt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ms(e){return!e||typeof e!="object"?null:Et({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Ec(e){return e==="codex"?"codex":"claude"}function nr(){return{subtotal:0,breakdown:xc(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function An(e,t,r){e.subtotal+=t.subtotal;for(let n of Hr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=dt(e.breakdown[n])+dt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function _a(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ga(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Cr(e){return $c(e)?`\u03C4 ${ga(_s(e))}`:null}function Lt(e){let t=Cr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Rr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${dt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${dt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${dt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${dt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${_s(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(ma),r.join(`
`)}function Et(e,t){let r={claude:nr(),codex:nr()},n={orchestrator:{claude:nr(),codex:nr()},implementation:{claude:nr(),codex:nr()},"review-consult":{claude:nr(),codex:nr()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(ua(l)){let p=Ec(i.runner),f=pa(l),g={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:fa(p,f)};f.replayed===!0&&(g.replayed=!0),typeof i.model=="string"&&(g.model=i.model),typeof i.session_id=="string"&&(g.session_id=i.session_id),An(r[p],g,!0),An(n.orchestrator[p],g,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){if(!p||p.provider!=="codex"||!wc.includes(p.role)||!ua(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let g=pa(p.usage),A={provider:"codex",role:p.role,attempt_id:String(i.attempt_id||""),usage:g,subtotal:fa("codex",g)};A.receipt_id=f,typeof p.model=="string"&&(A.model=p.model),typeof p.session_id=="string"?A.session_id=p.session_id:typeof p.thread_id=="string"&&(A.session_id=p.thread_id),typeof p.turn_id=="string"&&(A.turn_id=p.turn_id),typeof p.completed_at=="string"&&(A.completed_at=p.completed_at),g.replayed===!0&&(A.replayed=!0),An(r.codex,A,!1),An(n[A.role].codex,A,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let d=_a(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let p=n[i][d];p.legs.length>0&&(l[d]={..._a(p,!0),legs:p.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:Sa,setPrototypeOf:ha,isFrozen:Cc,getPrototypeOf:Rc,getOwnPropertyDescriptor:Ic}=Object,{freeze:kt,seal:Ct,create:ws}=Object,{apply:$s,construct:xs}=typeof Reflect<"u"&&Reflect;kt||(kt=function(t){return t});Ct||(Ct=function(t){return t});$s||($s=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});xs||(xs=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var En=wt(Array.prototype.forEach),Lc=wt(Array.prototype.lastIndexOf),ba=wt(Array.prototype.pop),Wr=wt(Array.prototype.push),Dc=wt(Array.prototype.splice),Rn=wt(String.prototype.toLowerCase),gs=wt(String.prototype.toString),hs=wt(String.prototype.match),Gr=wt(String.prototype.replace),Oc=wt(String.prototype.indexOf),Pc=wt(String.prototype.trim),Dt=wt(Object.prototype.hasOwnProperty),yt=wt(RegExp.prototype.test),Yr=Mc(TypeError);function wt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return $s(e,t,n)}}function Mc(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return xs(e,r)}}function Ie(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Rn;ha&&ha(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Cc(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Nc(e){for(let t=0;t<e.length;t++)Dt(e,t)||(e[t]=null);return e}function Yt(e){let t=ws(null);for(let[r,n]of Sa(e))Dt(e,r)&&(Array.isArray(n)?t[r]=Nc(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Yt(n):t[r]=n);return t}function Vr(e,t){for(;e!==null;){let n=Ic(e,t);if(n){if(n.get)return wt(n.get);if(typeof n.value=="function")return wt(n.value)}e=Rc(e)}function r(){return null}return r}var va=kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),bs=kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),vs=kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Fc=kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ys=kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),qc=kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ya=kt(["#text"]),ka=kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ks=kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),wa=kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Cn=kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Bc=Ct(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Uc=Ct(/<%[\w\W]*|[\w\W]*%>/gm),jc=Ct(/\$\{[\w\W]*/gm),zc=Ct(/^data-[\-\w.\u00B7-\uFFFF]+$/),Hc=Ct(/^aria-[\-\w]+$/),Aa=Ct(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Wc=Ct(/^(?:\w+script|data):/i),Gc=Ct(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ta=Ct(/^html$/i),Yc=Ct(/^[a-z][.\w]*(-[.\w]+)+$/i),$a=Object.freeze({__proto__:null,ARIA_ATTR:Hc,ATTR_WHITESPACE:Gc,CUSTOM_ELEMENT:Yc,DATA_ATTR:zc,DOCTYPE_NAME:Ta,ERB_EXPR:Uc,IS_ALLOWED_URI:Aa,IS_SCRIPT_OR_DATA:Wc,MUSTACHE_EXPR:Bc,TMPLIT_EXPR:jc}),Kr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Vc=function(){return typeof window>"u"?null:window},Kc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},xa=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ea(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Vc(),t=ue=>Ea(ue);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Kr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:A}=e,x=l.prototype,T=Vr(x,"cloneNode"),q=Vr(x,"remove"),w=Vr(x,"nextSibling"),D=Vr(x,"childNodes"),ee=Vr(x,"parentNode");if(typeof a=="function"){let ue=r.createElement("template");ue.content&&ue.content.ownerDocument&&(r=ue.content.ownerDocument)}let I,E="",{implementation:S,createNodeIterator:M,createDocumentFragment:N,getElementsByTagName:le}=r,{importNode:Le}=n,ce=xa();t.isSupported=typeof Sa=="function"&&typeof ee=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:$e,ERB_EXPR:Ee,TMPLIT_EXPR:je,DATA_ATTR:Pe,ARIA_ATTR:Me,IS_SCRIPT_OR_DATA:be,ATTR_WHITESPACE:oe,CUSTOM_ELEMENT:ve}=$a,{IS_ALLOWED_URI:Oe}=$a,pe=null,te=Ie({},[...va,...bs,...vs,...ys,...ya]),Z=null,Se=Ie({},[...ka,...ks,...wa,...Cn]),_e=Object.seal(ws(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ge=null,U=null,L=Object.seal(ws(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ae=!0,he=!0,xe=!1,We=!0,Ae=!1,O=!0,j=!1,R=!1,y=!1,z=!1,B=!1,Y=!1,se=!0,ye=!1,Re="user-content-",Qe=!0,Je=!1,De={},ze=null,Mt=Ie({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),_t=null,lt=Ie({},["audio","video","img","source","image","track"]),st=null,bt=Ie({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ye="http://www.w3.org/1998/Math/MathML",ot="http://www.w3.org/2000/svg",et="http://www.w3.org/1999/xhtml",tt=et,it=!1,F=null,G=Ie({},[Ye,ot,et],gs),de=Ie({},["mi","mo","mn","ms","mtext"]),fe=Ie({},["annotation-xml"]),u=Ie({},["title","style","font","a","script"]),h=null,P=["application/xhtml+xml","text/html"],Q="text/html",ie=null,ke=null,K=r.createElement("form"),Ce=function(b){return b instanceof RegExp||b instanceof Function},Ke=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ke&&ke===b)){if((!b||typeof b!="object")&&(b={}),b=Yt(b),h=P.indexOf(b.PARSER_MEDIA_TYPE)===-1?Q:b.PARSER_MEDIA_TYPE,ie=h==="application/xhtml+xml"?gs:Rn,pe=Dt(b,"ALLOWED_TAGS")?Ie({},b.ALLOWED_TAGS,ie):te,Z=Dt(b,"ALLOWED_ATTR")?Ie({},b.ALLOWED_ATTR,ie):Se,F=Dt(b,"ALLOWED_NAMESPACES")?Ie({},b.ALLOWED_NAMESPACES,gs):G,st=Dt(b,"ADD_URI_SAFE_ATTR")?Ie(Yt(bt),b.ADD_URI_SAFE_ATTR,ie):bt,_t=Dt(b,"ADD_DATA_URI_TAGS")?Ie(Yt(lt),b.ADD_DATA_URI_TAGS,ie):lt,ze=Dt(b,"FORBID_CONTENTS")?Ie({},b.FORBID_CONTENTS,ie):Mt,ge=Dt(b,"FORBID_TAGS")?Ie({},b.FORBID_TAGS,ie):Yt({}),U=Dt(b,"FORBID_ATTR")?Ie({},b.FORBID_ATTR,ie):Yt({}),De=Dt(b,"USE_PROFILES")?b.USE_PROFILES:!1,ae=b.ALLOW_ARIA_ATTR!==!1,he=b.ALLOW_DATA_ATTR!==!1,xe=b.ALLOW_UNKNOWN_PROTOCOLS||!1,We=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ae=b.SAFE_FOR_TEMPLATES||!1,O=b.SAFE_FOR_XML!==!1,j=b.WHOLE_DOCUMENT||!1,z=b.RETURN_DOM||!1,B=b.RETURN_DOM_FRAGMENT||!1,Y=b.RETURN_TRUSTED_TYPE||!1,y=b.FORCE_BODY||!1,se=b.SANITIZE_DOM!==!1,ye=b.SANITIZE_NAMED_PROPS||!1,Qe=b.KEEP_CONTENT!==!1,Je=b.IN_PLACE||!1,Oe=b.ALLOWED_URI_REGEXP||Aa,tt=b.NAMESPACE||et,de=b.MATHML_TEXT_INTEGRATION_POINTS||de,fe=b.HTML_INTEGRATION_POINTS||fe,_e=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&Ce(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_e.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&Ce(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_e.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(_e.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ae&&(he=!1),B&&(z=!0),De&&(pe=Ie({},ya),Z=[],De.html===!0&&(Ie(pe,va),Ie(Z,ka)),De.svg===!0&&(Ie(pe,bs),Ie(Z,ks),Ie(Z,Cn)),De.svgFilters===!0&&(Ie(pe,vs),Ie(Z,ks),Ie(Z,Cn)),De.mathMl===!0&&(Ie(pe,ys),Ie(Z,wa),Ie(Z,Cn))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?L.tagCheck=b.ADD_TAGS:(pe===te&&(pe=Yt(pe)),Ie(pe,b.ADD_TAGS,ie))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?L.attributeCheck=b.ADD_ATTR:(Z===Se&&(Z=Yt(Z)),Ie(Z,b.ADD_ATTR,ie))),b.ADD_URI_SAFE_ATTR&&Ie(st,b.ADD_URI_SAFE_ATTR,ie),b.FORBID_CONTENTS&&(ze===Mt&&(ze=Yt(ze)),Ie(ze,b.FORBID_CONTENTS,ie)),Qe&&(pe["#text"]=!0),j&&Ie(pe,["html","head","body"]),pe.table&&(Ie(pe,["tbody"]),delete ge.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw Yr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Yr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=b.TRUSTED_TYPES_POLICY,E=I.createHTML("")}else I===void 0&&(I=Kc(A,s)),I!==null&&typeof E=="string"&&(E=I.createHTML(""));kt&&kt(b),ke=b}},mt=Ie({},[...bs,...vs,...Fc]),gt=Ie({},[...ys,...qc]),ut=function(b){let H=ee(b);(!H||!H.tagName)&&(H={namespaceURI:tt,tagName:"template"});let _=Rn(b.tagName),v=Rn(H.tagName);return F[b.namespaceURI]?b.namespaceURI===ot?H.namespaceURI===et?_==="svg":H.namespaceURI===Ye?_==="svg"&&(v==="annotation-xml"||de[v]):!!mt[_]:b.namespaceURI===Ye?H.namespaceURI===et?_==="math":H.namespaceURI===ot?_==="math"&&fe[v]:!!gt[_]:b.namespaceURI===et?H.namespaceURI===ot&&!fe[v]||H.namespaceURI===Ye&&!de[v]?!1:!gt[_]&&(u[_]||!mt[_]):!!(h==="application/xhtml+xml"&&F[b.namespaceURI]):!1},Xe=function(b){Wr(t.removed,{element:b});try{ee(b).removeChild(b)}catch{q(b)}},pt=function(b,H){try{Wr(t.removed,{attribute:H.getAttributeNode(b),from:H})}catch{Wr(t.removed,{attribute:null,from:H})}if(H.removeAttribute(b),b==="is")if(z||B)try{Xe(H)}catch{}else try{H.setAttribute(b,"")}catch{}},Te=function(b){let H=null,_=null;if(y)b="<remove></remove>"+b;else{let ne=hs(b,/^[\r\n\t ]+/);_=ne&&ne[0]}h==="application/xhtml+xml"&&tt===et&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let v=I?I.createHTML(b):b;if(tt===et)try{H=new g().parseFromString(v,h)}catch{}if(!H||!H.documentElement){H=S.createDocument(tt,"template",null);try{H.documentElement.innerHTML=it?E:v}catch{}}let J=H.body||H.documentElement;return b&&_&&J.insertBefore(r.createTextNode(_),J.childNodes[0]||null),tt===et?le.call(H,j?"html":"body")[0]:j?H.documentElement:J},ct=function(b){return M.call(b.ownerDocument||b,b,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},we=function(b){return b instanceof f&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof p)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},Be=function(b){return typeof i=="function"&&b instanceof i};function at(ue,b,H){En(ue,_=>{_.call(t,b,H,ke)})}let Nt=function(b){let H=null;if(at(ce.beforeSanitizeElements,b,null),we(b))return Xe(b),!0;let _=ie(b.nodeName);if(at(ce.uponSanitizeElement,b,{tagName:_,allowedTags:pe}),O&&b.hasChildNodes()&&!Be(b.firstElementChild)&&yt(/<[/\w!]/g,b.innerHTML)&&yt(/<[/\w!]/g,b.textContent)||b.nodeType===Kr.progressingInstruction||O&&b.nodeType===Kr.comment&&yt(/<[/\w]/g,b.data))return Xe(b),!0;if(!(L.tagCheck instanceof Function&&L.tagCheck(_))&&(!pe[_]||ge[_])){if(!ge[_]&&jt(_)&&(_e.tagNameCheck instanceof RegExp&&yt(_e.tagNameCheck,_)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(_)))return!1;if(Qe&&!ze[_]){let v=ee(b)||b.parentNode,J=D(b)||b.childNodes;if(J&&v){let ne=J.length;for(let X=ne-1;X>=0;--X){let m=T(J[X],!0);m.__removalCount=(b.__removalCount||0)+1,v.insertBefore(m,w(b))}}}return Xe(b),!0}return b instanceof l&&!ut(b)||(_==="noscript"||_==="noembed"||_==="noframes")&&yt(/<\/no(script|embed|frames)/i,b.innerHTML)?(Xe(b),!0):(Ae&&b.nodeType===Kr.text&&(H=b.textContent,En([$e,Ee,je],v=>{H=Gr(H,v," ")}),b.textContent!==H&&(Wr(t.removed,{element:b.cloneNode()}),b.textContent=H)),at(ce.afterSanitizeElements,b,null),!1)},Qt=function(b,H,_){if(se&&(H==="id"||H==="name")&&(_ in r||_ in K))return!1;if(!(he&&!U[H]&&yt(Pe,H))){if(!(ae&&yt(Me,H))){if(!(L.attributeCheck instanceof Function&&L.attributeCheck(H,b))){if(!Z[H]||U[H]){if(!(jt(b)&&(_e.tagNameCheck instanceof RegExp&&yt(_e.tagNameCheck,b)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(b))&&(_e.attributeNameCheck instanceof RegExp&&yt(_e.attributeNameCheck,H)||_e.attributeNameCheck instanceof Function&&_e.attributeNameCheck(H,b))||H==="is"&&_e.allowCustomizedBuiltInElements&&(_e.tagNameCheck instanceof RegExp&&yt(_e.tagNameCheck,_)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(_))))return!1}else if(!st[H]){if(!yt(Oe,Gr(_,oe,""))){if(!((H==="src"||H==="xlink:href"||H==="href")&&b!=="script"&&Oc(_,"data:")===0&&_t[b])){if(!(xe&&!yt(be,Gr(_,oe,"")))){if(_)return!1}}}}}}}return!0},jt=function(b){return b!=="annotation-xml"&&hs(b,ve)},Ft=function(b){at(ce.beforeSanitizeAttributes,b,null);let{attributes:H}=b;if(!H||we(b))return;let _={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Z,forceKeepAttr:void 0},v=H.length;for(;v--;){let J=H[v],{name:ne,namespaceURI:X,value:m}=J,C=ie(ne),$=m,V=ne==="value"?$:Pc($);if(_.attrName=C,_.attrValue=V,_.keepAttr=!0,_.forceKeepAttr=void 0,at(ce.uponSanitizeAttribute,b,_),V=_.attrValue,ye&&(C==="id"||C==="name")&&(pt(ne,b),V=Re+V),O&&yt(/((--!?|])>)|<\/(style|title|textarea)/i,V)){pt(ne,b);continue}if(C==="attributename"&&hs(V,"href")){pt(ne,b);continue}if(_.forceKeepAttr)continue;if(!_.keepAttr){pt(ne,b);continue}if(!We&&yt(/\/>/i,V)){pt(ne,b);continue}Ae&&En([$e,Ee,je],rt=>{V=Gr(V,rt," ")});let Ne=ie(b.nodeName);if(!Qt(Ne,C,V)){pt(ne,b);continue}if(I&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!X)switch(A.getAttributeType(Ne,C)){case"TrustedHTML":{V=I.createHTML(V);break}case"TrustedScriptURL":{V=I.createScriptURL(V);break}}if(V!==$)try{X?b.setAttributeNS(X,ne,V):b.setAttribute(ne,V),we(b)?Xe(b):ba(t.removed)}catch{pt(ne,b)}}at(ce.afterSanitizeAttributes,b,null)},Jt=function ue(b){let H=null,_=ct(b);for(at(ce.beforeSanitizeShadowDOM,b,null);H=_.nextNode();)at(ce.uponSanitizeShadowNode,H,null),Nt(H),Ft(H),H.content instanceof o&&ue(H.content);at(ce.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(ue){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},H=null,_=null,v=null,J=null;if(it=!ue,it&&(ue="<!-->"),typeof ue!="string"&&!Be(ue))if(typeof ue.toString=="function"){if(ue=ue.toString(),typeof ue!="string")throw Yr("dirty is not a string, aborting")}else throw Yr("toString is not a function");if(!t.isSupported)return ue;if(R||Ke(b),t.removed=[],typeof ue=="string"&&(Je=!1),Je){if(ue.nodeName){let m=ie(ue.nodeName);if(!pe[m]||ge[m])throw Yr("root node is forbidden and cannot be sanitized in-place")}}else if(ue instanceof i)H=Te("<!---->"),_=H.ownerDocument.importNode(ue,!0),_.nodeType===Kr.element&&_.nodeName==="BODY"||_.nodeName==="HTML"?H=_:H.appendChild(_);else{if(!z&&!Ae&&!j&&ue.indexOf("<")===-1)return I&&Y?I.createHTML(ue):ue;if(H=Te(ue),!H)return z?null:Y?E:""}H&&y&&Xe(H.firstChild);let ne=ct(Je?ue:H);for(;v=ne.nextNode();)Nt(v),Ft(v),v.content instanceof o&&Jt(v.content);if(Je)return ue;if(z){if(B)for(J=N.call(H.ownerDocument);H.firstChild;)J.appendChild(H.firstChild);else J=H;return(Z.shadowroot||Z.shadowrootmode)&&(J=Le.call(n,J,!0)),J}let X=j?H.outerHTML:H.innerHTML;return j&&pe["!doctype"]&&H.ownerDocument&&H.ownerDocument.doctype&&H.ownerDocument.doctype.name&&yt(Ta,H.ownerDocument.doctype.name)&&(X="<!DOCTYPE "+H.ownerDocument.doctype.name+`>
`+X),Ae&&En([$e,Ee,je],m=>{X=Gr(X,m," ")}),I&&Y?I.createHTML(X):X},t.setConfig=function(){let ue=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ke(ue),R=!0},t.clearConfig=function(){ke=null,R=!1},t.isValidAttribute=function(ue,b,H){ke||Ke({});let _=ie(ue),v=ie(b);return Qt(_,v,H)},t.addHook=function(ue,b){typeof b=="function"&&Wr(ce[ue],b)},t.removeHook=function(ue,b){if(b!==void 0){let H=Lc(ce[ue],b);return H===-1?void 0:Dc(ce[ue],H,1)[0]}return ba(ce[ue])},t.removeHooks=function(ue){ce[ue]=[]},t.removeAllHooks=function(){ce=xa()},t}var Ca=Ea();var Ra={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ia=e=>(...t)=>({_$litDirective$:e,values:t}),In=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Zr=class extends In{constructor(t){if(super(t),this.it=nt,t.type!==Ra.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===nt||t==null)return this._t=void 0,this.it=t;if(t===pr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Zr.directiveName="unsafeHTML",Zr.resultType=1;var La=Ia(Zr);function Es(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var hr=Es();function qa(e){hr=e}var en={exec:()=>null};function Ue(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace($t.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Zc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),$t={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Xc=/^(?:[ \t]*(?:\n|$))+/,Qc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Jc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,tn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ed=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Cs=/(?:[*+-]|\d{1,9}[.)])/,Ba=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ua=Ue(Ba).replace(/bull/g,Cs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),td=Ue(Ba).replace(/bull/g,Cs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Rs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,rd=/^[^\n]+/,Is=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,nd=Ue(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Is).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),sd=Ue(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Cs).getRegex(),Nn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ls=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,od=Ue("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ls).replace("tag",Nn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ja=Ue(Rs).replace("hr",tn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nn).getRegex(),ad=Ue(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ja).getRegex(),Ds={blockquote:ad,code:Qc,def:nd,fences:Jc,heading:ed,hr:tn,html:od,lheading:Ua,list:sd,newline:Xc,paragraph:ja,table:en,text:rd},Da=Ue("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",tn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nn).getRegex(),id={...Ds,lheading:td,table:Da,paragraph:Ue(Rs).replace("hr",tn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Da).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nn).getRegex()},ld={...Ds,html:Ue(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ls).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:en,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ue(Rs).replace("hr",tn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ua).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},cd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,dd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,za=/^( {2,}|\\)\n(?!\s*$)/,ud=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Fn=/[\p{P}\p{S}]/u,Os=/[\s\p{P}\p{S}]/u,Ha=/[^\s\p{P}\p{S}]/u,pd=Ue(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Os).getRegex(),Wa=/(?!~)[\p{P}\p{S}]/u,fd=/(?!~)[\s\p{P}\p{S}]/u,_d=/(?:[^\s\p{P}\p{S}]|~)/u,md=Ue(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Zc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ga=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,gd=Ue(Ga,"u").replace(/punct/g,Fn).getRegex(),hd=Ue(Ga,"u").replace(/punct/g,Wa).getRegex(),Ya="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",bd=Ue(Ya,"gu").replace(/notPunctSpace/g,Ha).replace(/punctSpace/g,Os).replace(/punct/g,Fn).getRegex(),vd=Ue(Ya,"gu").replace(/notPunctSpace/g,_d).replace(/punctSpace/g,fd).replace(/punct/g,Wa).getRegex(),yd=Ue("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ha).replace(/punctSpace/g,Os).replace(/punct/g,Fn).getRegex(),kd=Ue(/\\(punct)/,"gu").replace(/punct/g,Fn).getRegex(),wd=Ue(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),$d=Ue(Ls).replace("(?:-->|$)","-->").getRegex(),xd=Ue("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",$d).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),On=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Sd=Ue(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",On).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Va=Ue(/^!?\[(label)\]\[(ref)\]/).replace("label",On).replace("ref",Is).getRegex(),Ka=Ue(/^!?\[(ref)\](?:\[\])?/).replace("ref",Is).getRegex(),Ad=Ue("reflink|nolink(?!\\()","g").replace("reflink",Va).replace("nolink",Ka).getRegex(),Oa=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ps={_backpedal:en,anyPunctuation:kd,autolink:wd,blockSkip:md,br:za,code:dd,del:en,emStrongLDelim:gd,emStrongRDelimAst:bd,emStrongRDelimUnd:yd,escape:cd,link:Sd,nolink:Ka,punctuation:pd,reflink:Va,reflinkSearch:Ad,tag:xd,text:ud,url:en},Td={...Ps,link:Ue(/^!?\[(label)\]\((.*?)\)/).replace("label",On).getRegex(),reflink:Ue(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",On).getRegex()},Ss={...Ps,emStrongRDelimAst:vd,emStrongLDelim:hd,url:Ue(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Oa).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ue(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Oa).getRegex()},Ed={...Ss,br:Ue(za).replace("{2,}","*").getRegex(),text:Ue(Ss.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ln={normal:Ds,gfm:id,pedantic:ld},Xr={normal:Ps,gfm:Ss,breaks:Ed,pedantic:Td},Cd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Pa=e=>Cd[e];function Vt(e,t){if(t){if($t.escapeTest.test(e))return e.replace($t.escapeReplace,Pa)}else if($t.escapeTestNoEncode.test(e))return e.replace($t.escapeReplaceNoEncode,Pa);return e}function Ma(e){try{e=encodeURI(e).replace($t.percentDecode,"%")}catch{return null}return e}function Na(e,t){let r=e.replace($t.findPipe,(o,a,i)=>{let l=!1,d=a;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split($t.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace($t.slashPipe,"|");return n}function Qr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Rd(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Fa(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function Id(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Pn=class{constructor(e){Ge(this,"options");Ge(this,"rules");Ge(this,"lexer");this.options=e||hr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Qr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Id(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Qr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Qr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Qr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let A=g,x=A.raw+`
`+r.join(`
`),T=this.blockquote(x);o[o.length-1]=T,n=n.substring(0,n.length-A.raw.length)+T.raw,s=s.substring(0,s.length-A.text.length)+T.text;break}else if(g?.type==="list"){let A=g,x=A.raw+`
`+r.join(`
`),T=this.list(x);o[o.length-1]=T,n=n.substring(0,n.length-g.raw.length)+T.raw,s=s.substring(0,s.length-A.raw.length)+T.raw,r=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),g=e.split(`
`,1)[0],A=!f.trim(),x=0;if(this.options.pedantic?(x=2,p=f.trimStart()):A?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,p=f.slice(x),x+=t[1].length),A&&this.rules.other.blankLine.test(g)&&(d+=g+`
`,e=e.substring(g.length+1),l=!0),!l){let T=this.rules.other.nextBulletRegex(x),q=this.rules.other.hrRegex(x),w=this.rules.other.fencesBeginRegex(x),D=this.rules.other.headingBeginRegex(x),ee=this.rules.other.htmlBeginRegex(x);for(;e;){let I=e.split(`
`,1)[0],E;if(g=I,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),E=g):E=g.replace(this.rules.other.tabCharGlobal,"    "),w.test(g)||D.test(g)||ee.test(g)||T.test(g)||q.test(g))break;if(E.search(this.rules.other.nonSpaceChar)>=x||!g.trim())p+=`
`+E.slice(x);else{if(A||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||w.test(f)||D.test(f)||q.test(f))break;p+=`
`+g}!A&&!g.trim()&&(A=!0),d+=I+`
`,e=e.substring(I.length+1),f=E.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let d=l.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Na(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Na(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Qr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Rd(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Fa(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Fa(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let A=f.slice(1,-1);return{type:"em",raw:f,text:A,tokens:this.lexer.inlineTokens(A)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ot=class As{constructor(t){Ge(this,"tokens");Ge(this,"options");Ge(this,"state");Ge(this,"inlineQueue");Ge(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||hr,this.options.tokenizer=this.options.tokenizer||new Pn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:$t,block:Ln.normal,inline:Xr.normal};this.options.pedantic?(r.block=Ln.pedantic,r.inline=Xr.pedantic):this.options.gfm&&(r.block=Ln.gfm,this.options.breaks?r.inline=Xr.breaks:r.inline=Xr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Ln,inline:Xr}}static lex(t,r){return new As(r).lex(t)}static lexInline(t,r){return new As(r).inlineTokens(t)}lex(t){t=t.replace($t.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace($t.tabCharGlobal,"    ").replace($t.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=r.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),g;this.options.extensions.startInline.forEach(A=>{g=A.call({lexer:this},f),typeof g=="number"&&g>=0&&(p=Math.min(p,g))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Mn=class{constructor(e){Ge(this,"options");Ge(this,"parser");this.options=e||hr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match($t.notSpaceStart)?.[0],s=e.replace($t.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Vt(n)+'">'+(r?s:Vt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Vt(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Vt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Ma(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Vt(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ma(e);if(s===null)return Vt(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Vt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Vt(e.text)}},Ms=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Pt=class Ts{constructor(t){Ge(this,"options");Ge(this,"renderer");Ge(this,"textRenderer");this.options=t||hr,this.options.renderer=this.options.renderer||new Mn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ms}static parse(t,r){return new Ts(r).parse(t)}static parseInline(t,r){return new Ts(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Dn,Jr=(Dn=class{constructor(e){Ge(this,"options");Ge(this,"block");this.options=e||hr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ot.lex:Ot.lexInline}provideParser(){return this.block?Pt.parse:Pt.parseInline}},Ge(Dn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ge(Dn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Dn),Ld=class{constructor(...e){Ge(this,"defaults",Es());Ge(this,"options",this.setOptions);Ge(this,"parse",this.parseMarkdown(!0));Ge(this,"parseInline",this.parseMarkdown(!1));Ge(this,"Parser",Pt);Ge(this,"Renderer",Mn);Ge(this,"TextRenderer",Ms);Ge(this,"Lexer",Ot);Ge(this,"Tokenizer",Pn);Ge(this,"Hooks",Jr);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Mn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Pn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Jr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];Jr.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Jr.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,d);return l.call(s,f)})();let p=i.call(s,d);return l.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,d);return f===!1&&(f=await l.apply(s,d)),f})();let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ot.lex(e,t??this.defaults)}parser(e,t){return Pt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Ot.lex:Ot.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Pt.parse:Pt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ot.lex:Ot.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?Pt.parse:Pt.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Vt(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},gr=new Ld;function He(e,t){return gr.parse(e,t)}He.options=He.setOptions=function(e){return gr.setOptions(e),He.defaults=gr.defaults,qa(He.defaults),He};He.getDefaults=Es;He.defaults=hr;He.use=function(...e){return gr.use(...e),He.defaults=gr.defaults,qa(He.defaults),He};He.walkTokens=function(e,t){return gr.walkTokens(e,t)};He.parseInline=gr.parseInline;He.Parser=Pt;He.parser=Pt.parse;He.Renderer=Mn;He.TextRenderer=Ms;He.Lexer=Ot;He.lexer=Ot.lex;He.Tokenizer=Pn;He.Hooks=Jr;He.parse=He;var c_=He.options,d_=He.setOptions,u_=He.use,p_=He.walkTokens,f_=He.parseInline;var __=Pt.parse,m_=Ot.lex;function sr(e){let t=He.parse(e),r=Ca.sanitize(t);return La(r)}function Kt(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Ir(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function qn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Dd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Od=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Pd=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function or(e){return!!e&&typeof e=="object"}function Ns(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Za(e,t){let r=Ns(e),n=Ns(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Md(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>or(s)&&typeof s.text=="string"?s.text:"").join(""):or(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Nd(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Dd[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Ns(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Za(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=Za(or(i)?i.old_string:"",or(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Xa(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Qa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Od.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Pd.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Fd(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(or(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Qa(o.text));else if(o.type==="thinking"){let a=Xa(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Nd(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(or(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Md(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function qd(e){if(e.type==="item.completed"&&or(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Qa(t.text)];if(t.type==="reasoning"){let r=Xa(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Bd(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ja(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!or(o))continue;let a=Bd(o)?qd(o):Fd(o,r);for(let i of a)t.push(i)}return t}var Ud=5,jd=10,zd=/Task\s+#(\d+)/,Hd=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Wd=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Bn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Gd(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Yd(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Vd(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=zd.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Kd(e){if(e.tool==="Bash"){let t=e.command||"";return Hd.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Wd.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Zd(e){let t=e.filter(s=>s.kind==="tool").slice(-jd),r=new Map;t.forEach((s,o)=>{let a=Kd(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Xd(e){let t=Yd(e);if(t)return{text:t,guess:!1};let r=Vd(e);if(r)return{text:r,guess:!1};let n=Zd(e);return n?{text:n,guess:!0}:null}function Qd(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:At(e,t)}function Un(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,l=new Set,d=new Set,p=null,f=null,g=!1,A=!1,x=!1,T=null,q=null;function w(){g=!1,A=!1,x=!1,T=null,q=null}async function D(U){if(r){A=!0,x=!1,oe();try{let L=await Promise.resolve(r("get-attempt-prompt",{attempt_id:U}));if(o!==U)return;!L||typeof L!="object"||Array.isArray(L)?x=!0:(T=L,q=U)}catch{o===U&&(x=!0)}finally{o===U&&(A=!1,oe())}}}function ee(){if(g=!g,g&&o&&q!==o){D(o);return}oe()}function I(){if(!g)return"";let U=Ir({loading:A,error:x});if(U)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${U}
      </div>`;if(!T)return"";if(T.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let L=qn(T.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${L?c`<div class="prompt-block__meta">${L} 발송</div>`:""}
      ${typeof T.task_prompt=="string"?Kt("\uACFC\uC5C5 (user)",T.task_prompt):""}
      ${typeof T.system_prompt=="string"?Kt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",T.system_prompt):""}
    </div>`}function E(){if(!o||!n)return[];let U=n.get(o);return Ja(U?U.lines:[])}function S(){if(!o||!n)return null;let U=n.get(o),L=U?U.last_event_at:null;return typeof L=="number"?L:null}function M(){return a.status==="running"}function N(){if(M()&&o){f||(f=setInterval(()=>oe(),1e3));return}le()}function le(){f&&(clearInterval(f),f=null)}function Le(U){let L=[],ae=0;for(;ae<U.length;){let he=U[ae];if(he.kind==="tool"){let xe=ae;for(;xe<U.length&&U[xe].kind==="tool"&&U[xe].tool===he.tool;)xe+=1;if(xe-ae>=Ud&&!d.has(ae)){L.push({kind:"group",idx:ae,tool:he.tool||"",lines:U.slice(ae,xe).map((We,Ae)=>({idx:ae+Ae,line:We}))}),ae=xe;continue}}L.push({kind:"line",idx:ae,line:he}),ae+=1}return L}function ce(U){for(let L=U.length-1;L>=0;L-=1){let ae=U[L];if(ae.kind==="result"||ae.kind==="error")return null;if(ae.kind==="tool"&&!Object.hasOwn(ae,"result"))return ae}return null}function $e(U){for(let L=U.length-1;L>=0;L-=1)if(U[L].kind==="thinking")return U[L];return null}function Ee(U,L){if(L.kind==="gate")return c`<div class="sv__gate">${L.text}</div>`;if(L.kind==="phase")return c`<div class="sv__phase">${L.text}</div>`;if(L.kind==="result")return c`<div
        class="sv__result${L.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${L.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${sr(L.text||(L.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(L.kind==="thinking"){let ae=l.has(U);return c`<div
        class="sv__think${ae?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Oe(U)}
      >
        <span class="sv__think-line">💭 ${Bn(L.text)}</span>
        ${ae?c`<pre class="sv__think-expand">${L.text}</pre>`:""}
      </div>`}if(L.kind==="error")return c`<div class="sv__error">⛔ ${L.text}</div>`;if(L.kind==="blocker")return c`<div class="sv__error">⛔ ${L.text}</div>`;if(L.kind==="tool"){let ae=l.has(U),he=L.tool==="Bash"?Gd(L.command):0,xe=L.tool==="Bash"?he>1?Bn(L.command):L.command:L.path||L.command||"";return c`<div
        class="sv__tool${ae?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Oe(U)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${L.icon}</span>
          <span class="sv__tool-name">${L.tool}</span>
          ${xe?c`<span class="sv__tool-detail">${xe}</span>`:""}
          ${he>1?c`<span class="sv__tool-more">⋯ ${he}줄</span>`:""}
          ${typeof L.added=="number"?c`<span class="sv__diff-add">+${L.added}</span>`:""}
          ${typeof L.removed=="number"?c`<span class="sv__diff-del">−${L.removed}</span>`:""}
          ${L.result?c`<span class="sv__tool-ok">→ ${L.result}</span>`:""}
        </span>
        ${ae?c`<pre class="sv__tool-expand">${je(L)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${sr(L.text||"")}</div>`}function je(U){let L=[];if(U.tool==="Bash"&&typeof U.command=="string"&&U.command.length>0)L.push(U.command);else if(U.input!==void 0)try{L.push(`input: ${JSON.stringify(U.input,null,2)}`)}catch{}return typeof U.output=="string"&&U.output.length>0&&L.push(`output:
${U.output}`),L.join(`

`)}function Pe(){if(!o)return c``;let U=E(),L=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ae=a.session_id||"",he=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,xe=M(),We=xe?Qd(S(),Date.now()):"",Ae=xe?ce(U):null,O=xe?$e(U):null,j=Xd(U);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${j?c`<span
              class="sv__stage${j.guess?" sv__stage--guess":""}"
              title=${j.text}
              >${j.text}</span
            >`:""}
        ${xe?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${We?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${We}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${We?c`<span class="sv__live-ago">${We}</span>`:""}</span
            >`:""}
        ${ae?c`<button
              type="button"
              class="sv__session"
              title=${ae}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ae}`}
              @click=${()=>te(ae)}
            >
              ⧉ ${ae.slice(0,8)}
            </button>`:""}
        ${L?c`<span class="sv__meta">${L}</span>`:""}
        ${a.worktree?c`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${g?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${g?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${ee}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${i?" sv__follow--on":""}"
          aria-pressed=${i?"true":"false"}
          aria-label=${he}
          @click=${pe}
        >
          <span class="sv__follow-full">⇣ ${he}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
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
      ${I()}
      <div class="sv__body">
        ${U.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Le(U).map(R=>R.kind==="group"?Me(R):Ee(R.idx,R.line))}
      </div>
      ${Ae||O?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ae?c`<span class="sv__now-icon">${Ae.icon}</span>
                  <span class="sv__now-name">${Ae.tool}</span>
                  <span class="sv__now-detail"
                    >${Ae.tool==="Bash"?Bn(Ae.command):Ae.path||Ae.command||""}</span
                  >`:""}
            ${O?c`<span class="sv__now-think"
                  >💭 ${Bn(O.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Me(U){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>be(U.idx)}
    >
      <span class="sv__group-icon">${U.lines[0].line.icon}</span>
      <span class="sv__group-name">${U.tool}</span>
      <span class="sv__group-count">${U.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function be(U){d.add(U),oe()}function oe(){qe(Pe(),e),N(),i&&ve()}function ve(){let U=e.querySelector(".sv__body");U&&(U.scrollTop=U.scrollHeight)}function Oe(U){l.has(U)?l.delete(U):l.add(U),oe()}function pe(){i=!i,oe()}function te(U){mr(U).then(L=>{L?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Z(U){!o||!U||(a={...a,...U},oe())}function Se(U){let L=U.target;if(!L||!L.classList||!L.classList.contains("sv__body"))return;!(L.scrollHeight-L.scrollTop-L.clientHeight<=4)&&i&&(i=!1,oe())}e.addEventListener("scroll",Se,!0);function _e(U){let L=U&&U.attempt_id;L&&(o=L,a=U.meta||{},i=!0,l.clear(),d.clear(),w(),!p&&n&&(p=n.subscribe(oe)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),oe())}function ge(){let U=o;o=null,l.clear(),d.clear(),w(),le(),r&&U&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${U}`})).catch(()=>{}),qe(c``,e),s&&s()}return{open:_e,updateMeta:Z,close:ge,isOpen(){return o!==null},destroy(){le(),p&&(p(),p=null),e.removeEventListener("scroll",Se,!0),o=null,qe(c``,e)}}}function rn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=ei(t.spec_id),s=ei(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ei(e){return typeof e=="string"?e.trim():""}function Jd(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function eu(e){let t=e&&e.metadata||{},r=rn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Jd(t)?null:"plan_pending"}),n}function ti(e,t){let r=eu(e);return c`
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
  `}var tu="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",ru=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,nu=/^\*\*결론\*\* — (.+)$/;function ri(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==tu)return null;let r=ru.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?nu.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var ni=20;function si(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function su(e){return e.length>ni?`${e.slice(0,ni)}\u2026`:e}function ou(e,t,r,n){let s=`${t.lane} ${su(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${si(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${sr(t.body)}
        </div>`:""}
  </div>`}function au(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${si(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${sr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function oi(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let d=ri(typeof l.text=="string"?l.text:"");return d?ou(l,d,t,s.has(l.id)):au(l)})}
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
  `}var iu=["codex","opus","fable","self","skip"],lu=["codex","fable","skip"],cu=["low","medium","high","xhigh"],du=["standard","fast_track"],Dr=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],qs={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},ai={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},uu=["self","skip"],pu="opus",Bs={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function Us(e){let t=qs[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function fu(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:Bs[e]||"(\uAE30\uBCF8)"}function Lr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function br(e){if(!Lr(e)||!Lr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Lr(r)&&Lr(r.models));return t.length>0?t:null}function Fs(e){return{value:e,label:e}}function js(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function ii(e,t,r=null){let n=br(e);if(!n)return t?[{label:null,options:[Fs(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(Fs)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[js(t),...s]:s}function ar(e,t){let r={label:null,options:e.map(Fs)};return t&&!e.includes(t)?[js(t),r]:[r]}function Zt(e,t){let r=br(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function zs(e,t){return Lr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function _u(e,t){return Lr(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():zs(e,t)}function mu(e,t){let r=br(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return _u(n,n.models[t]);return[]}function gu(e,t){let r=br(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function Hs(e,t){let r=br(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return zs(n,n.models[t]);return[]}function di(e){let t=br(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of zs(n,s))r.includes(o)||r.push(o);return r}function ui(e,t){if(!t)return di(e);let n=br(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Hs(e,o))s.includes(a)||s.push(a);return s}function zn(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Zt(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Hs(t,n.impl_model):ui(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Or(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||pu,a=r("impl_model"),i=r("impl_runtime"),l=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?Zt(n,o):s:null;return Dr.map(d=>{let p=t(d),f,g=!1;return d==="orchestration_model"?f=ii(n,p):d==="impl_runtime"?f=ar(["inherit","claude","codex"],p):d==="impl_model"?(f=l?ii(n,p,l):p?[js(p)]:[],g=i==="inherit"&&l===null):d==="orchestration_effort"?f=ar(mu(n,o),p):d==="orchestration_speed"?f=hu(gu(n,o),p):d==="impl_effort"?(f=ar(a?Hs(n,a):l?ui(n,l):di(n),p),g=i==="inherit"&&l===null):d==="plan_review_model"?f=ar(lu,p):Object.hasOwn(ai,d)?(f=ar(cu,p),g=uu.includes(r(ai[d]))):f=ar(iu,p),{key:d,groups:f,selected:p,disabled:g,runner:d==="orchestration_model"?Zt(n,o):null}})}function jn(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>li(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>li(s,t))}
          </optgroup>`)}
  `}function hu(e,t){return ar(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function li(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function ci(e,t,r,n,s,o,a){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${Us(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${i=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&a.onImplTargetChange?a.onImplTargetChange(e,i.target.value):a.onChange(e,i.target.value)}
        >
          ${t}
        </select>
        ${o?c`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function pi(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=f=>typeof o[f]=="string"?o[f]:"",d=Or({selectedOf:i,effectiveOf:f=>{let g=i(f);return g||(typeof a[f]=="string"?a[f]:"")},runner_catalog:n}),p=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${d.map(f=>ci(f.key,jn(f.groups,f.selected,fu(f.key,a,s)),f.selected,!1,f.disabled,f.runner,t))}
    ${ci("workflow_mode",jn(ar(du,p),p),p,o.workflow_mode==="fast_track",!1,null,t)}
  `}function bu(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function fi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l(x){x.key==="Escape"&&s&&(x.preventDefault(),g())}document.addEventListener("keydown",l);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>g()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${bu(s)}</span
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
                    </div>`:sr(a)}
          </div>
        </div>
      </div>
    `:c``}function p(){qe(d(),e)}async function f(x,T={}){s=x,o="loading",a="",i="",p();let q=r?r():"";if(!q){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let w="/api/doc?workspace="+encodeURIComponent(q)+"&path="+encodeURIComponent(x);try{let D=await n(w),ee=await D.json().catch(()=>({}));if(!D.ok||!ee||ee.ok!==!0){if(ee?.error==="not_found"&&T.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(ee&&ee.error||D.status)+")",p();return}a=String(ee.content||""),o="ready",p()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function g(){s=null,qe(c``,e)}function A(){document.removeEventListener("keydown",l),g()}return{open:f,close:g,destroy:A}}var vu=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],gi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function yu(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function ku(e){let t=ft(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Cr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${gi}
          >부분 집계</span
        >`:""}`}function _i(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function mi(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?hi(t):""}function wu(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=ft({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
        ${mi(s.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
              >${mi(s.completed_at)}</span
            >`:""}
        ${a?c`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function $u(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...vu,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${yu(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${gi}</span>`:""}
  </div>`}var xu={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function hi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Su(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function bi(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,g=o.has(d.attempt_id),A=f&&!g,x=f?g?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!A}
      title=${x}
      @click=${T=>{T.stopPropagation(),A&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,g=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return c`<div class="detail-session__cause" title=${g}>
      ${d.cause}
    </div>`},l=d=>{let p=_i(ms(d));if(ft(p).length===0&&!Cr(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
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
      세션 이력${ku(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let p=ms(d),f=_i(p),g=ft(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${xu[d.status||""]||"\xB7"}</span
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
            ${g.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${g.length>0?g.map(A=>c`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):Cr(d.usage)?c`<span class="detail-session__usage"
                    >${Cr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${hi(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${i(d)} ${Su(d)}
          ${s.has(d.attempt_id)&&d.usage?$u(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${wu(p)}
        </div>`})}
    </div>
  `}function vi(e,t={}){return c`
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
          ${Au(e)}
        </div>`:""}
  `}function Au(e){let t=Ir(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Kt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=qn(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Kt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Kt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Tu=["open","in_progress","deferred","resolved","closed"],Eu=[0,1,2,3,4];function yi(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,d=null,p=null,f={},g="",A=!1,x=!1,T=!1,q="",w="",D="";function ee(){x=!1,T=!1,q="",w="",D=""}let I=[],E=null,S=null,M=!1,N="",le=!1,Le=0,ce=new Set;function $e(){I=[],E=null,S=null,M=!1,N="",le=!1,Le+=1,ce.clear()}async function Ee(m){if(!s)return;let C=++Le;try{let $=await Promise.resolve(s("get-comments",{id:m}));if(C!==Le||m!==d)return;I=Array.isArray($)?$:[],M=!1}catch{if(C!==Le||m!==d)return;M=!0}X()}function je(){if(!s||!d)return;let m=p&&typeof p.comment_count=="number"?p.comment_count:null;if(E!==d){E=d,S=m,Ee(d);return}m!==null&&m!==S&&(S=m,Ee(d))}function Pe(m){ce.has(m)?ce.delete(m):ce.add(m),X()}function Me(m){let C=N.trim().length===0;N=m,C!==(m.trim().length===0)&&X()}async function be(){let m=N.trim();if(!s||!d||m.length===0||le)return;let C=d;le=!0,X();let $=!1;try{let V=await Promise.resolve(s("add-comment",{id:C,text:m}));Array.isArray(V)&&V.length>0&&($=!0,C===d&&(I=V,M=!1,N="",S=V.length))}catch{$=!1}$||re("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),C===d&&(le=!1),X()}let oe={onToggle:Pe,onDraftInput:Me,onSubmit:be},ve=document.createElement("div");ve.className="md-viewer-root",document.body.appendChild(ve);let Oe=fi(ve,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),pe=document.createElement("div");pe.className="session-log-root",document.body.appendChild(pe);let te=Un(pe,{transport:s?(m,C)=>Promise.resolve(s(m,C)):void 0,sessionLogStore:l}),Z=!1,Se=!1,_e=!1,ge=null,U=null,L=0;function ae(m){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${m}`}function he(){Z=!1,Se=!1,_e=!1,ge=null,U=null,L+=1}async function xe(m){if(!s)return;let C=++L;Se=!0,_e=!1,X();try{let $=await Promise.resolve(s("get-bead-prompt",{bead_id:m}));if(C!==L)return;!$||typeof $!="object"||Array.isArray($)?_e=!0:(ge=$,U=ae(m))}catch{C===L&&(_e=!0)}finally{C===L&&(Se=!1,X())}}function We(){if(Z=!Z,Z&&d&&U!==ae(d)){ge=null,xe(d);return}X()}function Ae(){if(!a||!d)return[];let m=a.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter($=>$&&$.bead_id===d).sort(($,V)=>(V.started_at||0)-($.started_at||0)).map($=>({attempt_id:$.attempt_id,bead_id:$.bead_id,status:$.status,started_at:typeof $.started_at=="number"?$.started_at:null,runner:$.runner||null,model:$.model||null,session_id:$.session_id||null,resumed_from:$.resumed_from||null,dismissed_at:typeof $.dismissed_at=="number"?$.dismissed_at:null,cause:typeof $.cause=="string"?$.cause:null,cause_detail:$.cause_detail||null,exec_default_preset_id:typeof $.exec_default_preset_id=="string"?$.exec_default_preset_id:null,exec_default_preset_revision:typeof $.exec_default_preset_revision=="number"?$.exec_default_preset_revision:null,exec_values:$.exec_values&&typeof $.exec_values=="object"?$.exec_values:null,usage:$.usage||null,usage_legs:Array.isArray($.usage_legs)?$.usage_legs:[]}))}function O(){if(!a||!d)return null;let m=a.get();return Et(m&&m.attempts||{},d)}let j=new Set;function R(m){j.has(m)?j.delete(m):j.add(m),X()}function y(m){let C=a?a.get():null,$=C&&C.attempts?C.attempts[m]:null;te.open({attempt_id:m,meta:$?{runner:$.runner||void 0,model:$.model||void 0,effort:$.effort||void 0,status:$.status||void 0,session_id:$.session_id||void 0}:{}})}async function z(m){if(!s||!m)return;let C=()=>{let V=a?a.get():null;return V&&typeof V.revision=="number"?V.revision:0},$=await s("worker-attempt-resume",{attempt_id:m,expected_revision:C()});if($&&$.conflict){let V=$.queue&&typeof $.queue.revision=="number"?$.queue.revision:C();$=await s("worker-attempt-resume",{attempt_id:m,expected_revision:V})}$&&$.resumed===!1&&!$.conflict&&$.reason&&re(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${$.reason}`,"error",2400)}let B={onOpen:y,onResume:z,onToggleUsage:R};function Y(){let m=a?a.get():null,C=m&&m.default_exec_preset_id,$=typeof C=="string"?Qe()?.presets.find(V=>V.id===C):null;return $&&$.compatible!==!1&&$.settings?$.settings:{}}function se(){let m=a?a.get():null,C=m&&m.default_exec_preset_id,$=typeof C=="string"?Qe()?.presets.find(V=>V.id===C):null;return $&&$.compatible!==!1&&typeof $.name=="string"?$.name:""}function ye(){let m=a?a.get():null;return m&&m.runner_catalog||null}function Re(){let m=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},$=(Object.hasOwn(f,"orchestration_model")?f.orchestration_model:void 0)||(typeof m.orchestration_model=="string"?m.orchestration_model:"")||(typeof Y().orchestration_model=="string"?Y().orchestration_model:"")||"opus";return Zt(ye(),$)}function Qe(){let m=i?i.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function Je(m){let C=m&&m.settings&&typeof m.settings=="object"?m.settings:{},$=V=>typeof C[V]=="string"?C[V]:V==="impl_runtime"&&typeof C.impl_model=="string"&&Zt(ye(),C.impl_model)||"";return Or({selectedOf:$,effectiveOf:$,runner_catalog:ye()}).some(V=>V.groups.some(Ne=>Ne.options.some(rt=>rt.value===V.selected&&rt.label.endsWith("(\uBE44\uD638\uD658)"))))}function De(m){i&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&i.set({revision:m.revision,presets:m.presets})}async function ze(){let m=Qe(),C=m?.presets.find($=>$.id===g);if(!(!s||!d||!m||!C||Je(C)||A)){A=!0,X();try{let $=await Promise.resolve(s("apply-exec-preset",{id:d,preset_id:C.id,expected_revision:m.revision}));if($&&$.conflict){De($),re("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let V=$&&Array.isArray($.issue)?$.issue[0]:$?.issue;if($&&$.applied&&V&&typeof V=="object"){p=V;for(let Ne of Dr)delete f[Ne];re("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}$&&$.error==="bd_readback_failed"?re("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):re("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch($){$&&typeof $=="object"&&$.code==="bd_readback_failed"?re("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):re("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,X()}}}function Mt(){let m=Qe();if(m&&m.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let C=m?m.presets:[],$=C.find(Ne=>Ne.id===g),V=$?Je($):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${m===null||A}
          @change=${Ne=>{g=Ne.target.value,X()}}
        >
          <option value="" ?selected=${g===""}>
            ${m===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${C.map(Ne=>{let rt=Je(Ne);return c`<option
              value=${Ne.id}
              ?selected=${Ne.id===g}
            >
              ${Ne.name}${rt?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${m===null||!$||V||A}
          @click=${()=>{ze()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let _t=null;r&&r.subscribe&&(_t=r.subscribe(()=>Ye()));let lt=null;a&&typeof a.subscribe=="function"&&(lt=a.subscribe(()=>{d&&X()}));let st=null;i&&typeof i.subscribe=="function"&&(st=i.subscribe(()=>{d&&X()}));function bt(m){m.key==="Escape"&&d&&(m.preventDefault(),n())}document.addEventListener("keydown",bt);function Ye(){if(d){if(r&&typeof r.snapshotFor=="function"){let m=r.snapshotFor("detail:"+d)||[];p=m.find($=>$&&$.id===d)||m[0]||p}je(),X()}}function ot(m){mr(m).then(C=>{C?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function et(m){m.preventDefault(),m.stopPropagation(),d&&ot(d)}function tt(m,C){m.preventDefault(),m.stopPropagation(),ot(C)}function it(m,C,$){m.preventDefault(),m.stopPropagation(),Oe.open(C,{missing_state:$})}function F(m,C){f[m]=C,X(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",{id:d,key:m,value:C})).catch(()=>{re("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function G(m,C){let $=p||{},V=$.metadata&&typeof $.metadata=="object"?$.metadata:{},Ne={};for(let Fe of["impl_runtime","impl_model","impl_effort"])Ne[Fe]=Object.hasOwn(f,Fe)?f[Fe]:typeof V[Fe]=="string"?V[Fe]:"";Ne[m]=C;let rt=zn(Ne,ye(),Re()),vt={};for(let Fe of["impl_runtime","impl_model","impl_effort"])vt[Fe]=f[Fe],f[Fe]=rt[Fe]||"";X(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...rt,orchestration_runtime:Re()})).then(Fe=>{let zt=Array.isArray(Fe)?Fe[0]:Fe;if(!zt||typeof zt!="object"||!zt.id)throw new Error("implementation target readback failed");p=zt;for(let Vn of["impl_runtime","impl_model","impl_effort"])delete f[Vn];X()}).catch(()=>{for(let Fe of["impl_runtime","impl_model","impl_effort"])vt[Fe]===void 0?delete f[Fe]:f[Fe]=vt[Fe];X(),re("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function de(m,C,$){if(!s||!d)return!1;try{let V=await Promise.resolve(s(m,C)),Ne=Array.isArray(V)?V[0]:V;return Ne&&typeof Ne=="object"&&Ne.id?(p=Ne,!0):(re($,"error"),!1)}catch{return re($,"error"),!1}}function fe(m){setTimeout(()=>{try{let C=e.querySelector(m);C&&typeof C.focus=="function"&&C.focus()}catch{}},0)}function u(){x=!0,q=p&&p.title||"",X(),fe('.detail-edit__input[data-edit="title"]')}function h(m){q=m.target.value}function P(){x=!1,q="",X()}function Q(){de("edit-text",{id:d,field:"title",value:q},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(C=>{C&&(x=!1,q=""),X()})}function ie(){T=!0,w=p&&p.description||"",X(),fe('.detail-edit__textarea[data-edit="description"]')}function ke(m){w=m.target.value}function K(){T=!1,w="",X()}function Ce(){de("edit-text",{id:d,field:"description",value:w},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(C=>{C&&(T=!1,w=""),X()})}function Ke(m,C,$,V){if(m.key==="Escape"){m.stopPropagation(),$();return}m.key==="Enter"&&(!V||m.ctrlKey||m.metaKey)&&(m.preventDefault(),C())}function mt(m){let C=m.target.value;de("update-status",{id:d,status:C},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>X())}function gt(m){let C=Number(m.target.value);de("update-priority",{id:d,priority:C},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>X())}function ut(m){D=m.target.value}function Xe(){let m=D.trim();m.length!==0&&de("label-add",{id:d,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(C=>{C&&(D=""),X()})}function pt(m){if(m.key==="Escape"){m.stopPropagation(),D="",X();return}m.key==="Enter"&&(m.preventDefault(),Xe())}function Te(m){de("label-remove",{id:d,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>X())}let ct={onCopyPath:tt,onOpenDoc:it},we={onChange:F,onImplTargetChange:G};function Be(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function at(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Nt(m){let $=(Array.isArray(m.dependencies)?m.dependencies:[]).map(V=>({id:Be(V),icon:at(V)})).filter(V=>V.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${$.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${$.map(V=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(V.id)}
                  >
                    ${V.icon?`${V.icon} `:""}${V.id}
                  </button>`:c`<span class="detail-dep"
                    >${V.icon?`${V.icon} `:""}${V.id}</span
                  >`)}
          </div>`}
    `}function Qt(m){let C=m.metadata||{},$=m.workflow||{},V=$.stages||{},Ne=V.spec&&V.spec.stale,rt=V.impl&&V.impl.stale,vt=V.plan||null,Fe=$.route_source==="derived",zt=$.route||C.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Fe?" detail-kv__v--derived":""}"
          title=${Fe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Fe?"unset":zt}</span
        >
      </div>
      ${$.route!=="quick_fix"||Object.hasOwn(C,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${C.spec_review||"\uC5C6\uC74C"}${Ne?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${$.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${vt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${vt?.approval_receipt||"\uC5C6\uC74C"}${vt?.approval_state==="stale"?" \xB7 stale":vt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${$.route!=="quick_fix"||Object.hasOwn(C,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${C.impl_review||"\uC5C6\uC74C"}${rt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${C.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${C.pr_url}</span>
          </div>`:""}
    `}let jt={route:["quick_fix","spec_backed","full_plan"]};async function Ft(m,C){let $=C.target.value;if(m==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&$!=="full_plan"&&!window.confirm(`full_plan \u2192 ${$||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){X();return}await de("update-workflow-meta",{id:d,key:m,value:$},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),X()}function Jt(m){let C=m.metadata||{};return c` ${((V,Ne)=>{let rt=jt[V],vt=typeof C[V]=="string"?C[V]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${V}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${V}
          data-edit=${`wfmeta-${V}`}
          @change=${Fe=>Ft(V,Fe)}
        >
          <option value="" ?selected=${!rt.includes(vt)}>
            ${Ne}
          </option>
          ${rt.map(Fe=>c`<option value=${Fe} ?selected=${vt===Fe}>${Fe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function ue(m,C){return x?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${q}
            @input=${h}
            @keydown=${$=>Ke($,Q,P,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Q}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${P}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
        ${ft(C).map($=>c`<span class="detail-usage-total" title=${$.tooltip}
              >${$.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${u}
        >
          ✎
        </button>
      </div>
    `}function b(m){let C=ht(m.created_at),$=ht(m.updated_at);return!C&&!$?c``:c`
      ${C?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
      ${$?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
    `}function H(m,C){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${mt}
        >
          ${Tu.map($=>c`<option value=${$} ?selected=${$===m}>${$}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${gt}
        >
          ${Eu.map($=>c`<option value=${String($)} ?selected=${$===C}>
                P${$}
              </option>`)}
        </select>
      </div>
    `}function _(m){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${T?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ie}
            >
              ✎
            </button>`}
      </div>
      ${T?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${w}
              @input=${ke}
              @keydown=${C=>Ke(C,Ce,K,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ce}
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
            ${m||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function v(m){let C=typeof m.notes=="string"?m.notes:"";return C.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${C}</div>
    `}function J(m){let C=Array.isArray(m.labels)?m.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${C.map($=>c`<span class="detail-label-chip"
              >${$}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${$}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+$}
                @click=${()=>Te($)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${D}
            @input=${ut}
            @keydown=${pt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Xe}
          >
            추가
          </button>
        </span>
      </div>
    `}function ne(){if(!d)return c``;let m=p||{},C=String(m.id||d),$=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",V=O(),Ne=m.status||"open",rt=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",vt=m.description||"",Fe={...m,metadata:{...m.metadata||{},...f}};return c`
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
            @click=${et}
          >
            ${C}
          </button>
          ${ue($,V)}
          ${H(Ne,rt)} ${b(m)}
          ${_(vt)}
          ${oi(I,oe,{expanded:ce,draft:N,sending:le,error:M})}
          ${v(m)} ${J(m)} ${Nt(m)}
          ${Qt(m)} ${Jt(m)}
          ${ti(m,ct)}
          ${Mt()}
          ${pi(Fe,we,Y(),ye(),se())}
          ${vi({expanded:Z,loading:Se,error:_e,data:ge},{onToggle:We})}
          ${bi(Ae(),B,{total:V,expanded:j})}
        </div>
      </div>
    `}function X(){qe(ne(),e)}return{load(m){m!==d&&(f={},g="",ee(),$e(),he()),d=m,p=null,Ye()},clear(){d=null,p=null,f={},g="",A=!1,ee(),$e(),he(),Oe.close(),te.close(),qe(c``,e)},destroy(){_t&&(_t(),_t=null),lt&&(lt(),lt=null),st&&(st(),st=null),document.removeEventListener("keydown",bt),Oe.destroy(),ve.parentNode&&ve.parentNode.removeChild(ve),te.destroy(),pe.parentNode&&pe.parentNode.removeChild(pe),d=null,p=null,g="",A=!1,$e(),he(),qe(c``,e)}}}var Cu=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ki(e,t){return ps(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Ru(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function wi(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(S){let M=r.get();if(M)try{let N=await n("display-policy-set",{expected_revision:M.revision,policy:S(M)});l(N),N&&N.conflict&&N.policy&&(N=await n("display-policy-set",{expected_revision:N.policy.revision,policy:S(N.policy)}),l(N)),N&&N.conflict&&re("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{re("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function l(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function d(S){let M=r.get();if(!M)return;let N=ki(S,M)!=="shown";i(le=>Ru(S,le,N))}function p(){let S=a.trim();S.length!==0&&(a="",i(M=>M.hidden_prefixes.includes(S)?{hidden_prefixes:M.hidden_prefixes}:{hidden_prefixes:[...M.hidden_prefixes,S]}),q())}function f(S){i(M=>({hidden_prefixes:M.hidden_prefixes.filter(N=>N!==S)}))}function g(S){let M=r.get();if(!M)return;let N=M.chips[S]===!1;i(()=>({chips:{[S]:N}}))}function A(S){let M=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${M.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${M.map(N=>{let le=ki(N,S);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${le}`}
                  data-label=${N}
                  data-state=${le}
                  @click=${()=>d(N)}
                >
                  ${N}
                </button>`})}
            </div>`}
      </section>
    `}function x(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(M=>c`<span class="display-settings__prefix">
                ${M}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${M} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>f(M)}
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
            @input=${M=>{a=String(M.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function T(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Cu.map(([M,N])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${M}
                  .checked=${S.chips[M]!==!1}
                  @change=${()=>g(M)}
                />
                <span>${N}</span>
              </label>`)}
        </div>
      </section>
    `}function q(){let S=r.get();qe(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${E}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?c`${A(S)} ${x(S)}
                ${T(S)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let w=!1,D=()=>{w=!1};o.addEventListener("close",D),o.addEventListener("cancel",D);let ee=null;r.subscribe&&(ee=r.subscribe(()=>{w&&q()}));function I(){w||(a="",w=!0,q(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){w&&(w=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:I,close:E,destroy(){w=!1,o.removeEventListener("close",D),o.removeEventListener("cancel",D),ee&&(ee(),ee=null),o.remove()}}}function $i(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,p,f="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let g=typeof f=="string"?f.trim():"";if(s&&(g.length>0?(s.textContent=g,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function xi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Si(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var Iu={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Ai=160;function Lu(e){return e.length>Ai?`${e.slice(0,Ai)}\u2026`:e}function Hn(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,l=!1;function d(){return r&&r.get()||{revision:0,exec_defaults:{}}}function p(){let y=d();return typeof y.revision=="number"?y.revision:0}function f(){let y=n?n.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function g(y){n&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&n.set({revision:y.revision,presets:y.presets})}function A(y){y&&y.queue&&r&&r.set(y.queue)}function x(){return d().runner_catalog??null}let T=null;function q(){if(T!==null)return T;let y=d().default_exec_preset_id;return typeof y=="string"&&y.length>0?y:null}async function w(y){if(!s)return;let z=f();if(!z)return;T=y||"";let B=E(y);if(ae(),!B.viable){re(B.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let Y=await s("worker-queue-set-default-exec-preset",{preset_id:y||null,expected_queue_revision:p(),expected_preset_revision:z.revision});if(A(Y),Y&&Y.presets&&n&&n.set(Y.presets),Y&&Y.conflict){re("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(Y&&Y.applied){T=null,ae();return}re("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{re("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function D(y){i={id:y.id,name:y.name,settings:{...y.settings||{}}},M(),l=!1,ae()}function ee(){i={id:null,name:"",settings:{}},l=!1,ae()}function I(y){let z=y&&y.settings&&typeof y.settings=="object"?y.settings:{},B=Y=>typeof z[Y]=="string"?z[Y]:Y==="impl_runtime"&&typeof z.impl_model=="string"&&Zt(x(),z.impl_model)||"";return Or({selectedOf:B,effectiveOf:B,runner_catalog:x()}).some(Y=>Y.groups.some(se=>se.options.some(ye=>ye.value===Y.selected&&ye.label.endsWith("(\uBE44\uD638\uD658)"))))}function E(y){if(!y)return{viable:!0,missing:!1,incompatible:!1,preset:null};let B=f()?.presets.find(se=>se.id===y);if(!B||B.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let Y=B.compatible===!1||I(B);return{viable:!Y,missing:!1,incompatible:Y,preset:B}}function S(){let y=i?.settings.orchestration_model;return typeof y!="string"?null:Zt(x(),y)}function M(){if(!i)return;let y=zn({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},x(),S());for(let z of["impl_runtime","impl_model","impl_effort"])y[z]?i.settings[z]=y[z]:delete i.settings[z]}function N(y){let z=y&&y.settings&&typeof y.settings=="object"?y.settings:{},B=Dr.filter(se=>typeof z[se]=="string").length,Y=Dr.filter(se=>typeof z[se]=="string").map(se=>`${qs[se]?.title||se}: ${z[se]}`);return{count:`${B}/12 \uC9C0\uC815`,choices:Y.length>0?Y.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function le(y){if(!s||!window.confirm(`\u201C${y.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let z=f();if(z)try{let B=await s("exec-preset-delete",{expected_revision:z.revision,id:y.id});g(B),B&&B.conflict&&re("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{re("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function Le(y=!1){if(!s||!i)return;let z=f();if(!z)return;let B=y||i.id===null,Y={expected_revision:z.revision,...B?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let se=await s(B?"exec-preset-create":"exec-preset-update",Y);if(g(se),se&&se.conflict){l=!0,ae();return}if(se&&se.applied){i=null,l=!1,ae();return}re("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{re("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function ce(y){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${Us(y.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${y.key}
        ?disabled=${y.disabled}
        @change=${z=>{if(!i)return;let B=z.target.value;B?i.settings[y.key]=B:delete i.settings[y.key],(y.key==="impl_runtime"||y.key==="impl_model"||y.key==="impl_effort"||y.key==="orchestration_model")&&M(),l=!1,ae()}}
      >
        ${jn(y.groups,y.selected,Bs[y.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function $e(){if(!i)return"";let y=se=>typeof i?.settings[se]=="string"?i.settings[se]:"",z=Or({selectedOf:y,effectiveOf:y,runner_catalog:x(),controller_runtime:S()}),B=f(),Y=i.id!==null&&B!==null&&!B.presets.some(se=>se.id===i?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${se=>{i&&(i.name=se.target.value,l=!1)}}
        />
      </label>
      ${l?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${Y?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${z.map(ce)}
      <div class="exec-preset-editor__actions">
        ${Y?c`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{Le(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{Le(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{i=null,l=!1,ae()}}
        >
          취소
        </button>
      </div>
    </div>`}function Ee(){let y=f(),z=y?y.presets.filter(B=>B?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${ee}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${y===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:z.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:z.map(B=>{let Y=N(B),se=typeof B.reference_count=="number",ye=se?B.reference_count:null,Re=Array.isArray(B.reference_summary)?B.reference_summary.map(Qe=>Qe?.display_name||Qe?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${B.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${B.name}</strong>
                  <span>${Y.count}</span>
                  <span data-preset-references=${B.id}
                    >${se?`\uCC38\uC870 ${ye}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${I(B)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Y.choices}</small>
                  ${Re?c`<small data-preset-impact=${B.id}
                        >업데이트 영향: ${Re}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${B.id}
                    @click=${()=>D(B)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${B.id}
                    ?disabled=${ye===null||ye>0||B.reference_scan_complete===!1}
                    title=${ye===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ye>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":B.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{le(B)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${$e()}
    </section>`}function je(){let y=f(),z=y?y.presets.filter(Re=>Re?.migration_pending!==!0):[],B=q()||"",Y=E(B),se=Y.preset,ye=se?N(se):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
      <h3>현재 워크스페이스 기본 프리셋</h3>
      <p class="exec-defaults__hint">
        이 워크스페이스는 프리셋 하나를 참조합니다. 없음은 harness 기본값을
        사용합니다.
      </p>
      <select
        class="exec-defaults__sel"
        data-workspace-preset-select
        aria-label="워크스페이스 기본 프리셋"
        .value=${B}
        ?disabled=${y===null}
        @change=${Re=>{w(Re.target.value)}}
      >
        <option value="" ?selected=${B===""}>
          없음 — harness 기본값
        </option>
        ${B&&Y.missing?c`<option value=${B} ?selected=${!0}>
              ${B} (선택한 프리셋 없음)
            </option>`:""}
        ${z.map(Re=>c`<option
              value=${Re.id}
              ?selected=${Re.id===B}
              ?disabled=${Re.compatible===!1}
            >
              ${Re.name}${Re.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${se?c`<p data-workspace-preset-summary>
            ${ye?.count} · ${ye?.choices}
            ${Y.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${Y.missing?c`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:Y.incompatible?c`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function Pe(){let y=d().workspace_info;return y&&typeof y=="object"?y:{}}function Me(y,z){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${y}"
      >${z}</span
    >`}function be(y){let z=y?Si(y.cmd):"",B=y?xi(y.timeout_ms):"",Y=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${z?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${z}</span>
            ${Me("config","config")}
            ${B?c`<span class="exec-defaults__vd-meta"
                  >timeout ${B}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${Y}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function oe(y){let z=y?Si(y.cmd):"",B=y?xi(y.timeout_ms):"",Y=B?`timeout ${B} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",se=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${z?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${z}</span>
            ${Me("config","config")}
            ${y.detached===!0?Me("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${Y}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${se}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function ve(y){if(!y||typeof y!="object")return"";let z=Iu[String(y.outcome)];if(!z)return"";let B=y.outcome==="failed"&&y.reason?`${z.label} \xB7 ${y.reason}`:z.label,Y=[ht(y.at),typeof y.bead_id=="string"?y.bead_id:"",typeof y.base_sha=="string"?y.base_sha.slice(0,7):""].filter(Re=>Re.length>0).join(" \xB7 "),se=typeof y.detail=="string"&&y.detail.length>0?Lu(y.detail):"",ye=typeof y.log_path=="string"&&y.log_path.length>0?y.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${Me(z.modifier,B)}
        ${Y?c`<span class="exec-defaults__vd-meta">${Y}</span>`:""}
      </div>
      ${se?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${se}</code>
          </div>`:""}
      ${ye?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${ye}</code>
          </div>`:""}
    </div>`}let Oe=!1,pe=!1,te=!1,Z=null;async function Se(){if(s){pe=!0,te=!1,ae();try{let y=await Promise.resolve(s("get-worker-system-prompt",{}));!y||typeof y!="object"||Array.isArray(y)?te=!0:Z=y}catch{te=!0}finally{pe=!1,ae()}}}function _e(){if(Oe=!Oe,Oe&&!Z){Se();return}ae()}function ge(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${Oe?"true":"false"}
          @click=${_e}
        >
          ${Oe?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${Oe?U():""}
    </section>`}function U(){let y=Ir({loading:pe,error:te});if(y)return y;if(!Z)return"";let z=Array.isArray(Z.variants)?Z.variants:[];return c`<div class="exec-defaults__sp-body">
      ${Z.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${Z.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${z.map(B=>c`<div class="exec-defaults__sp-variant" data-variant=${B.key}>
            <div class="exec-defaults__sp-cond">${B.condition}</div>
            ${Kt(B.label,B.system_prompt)}
          </div>`)}
    </div>`}function L(y){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${be(y.verify_cmd)} ${oe(y.deploy_cmd)}
      ${ve(y.last_deploy)}
    </section>`}function ae(){if(qe(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${R}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Ee()} ${je()}
            ${L(Pe())}
            ${ge()}
          </div>
        </div>
      `,a),T!==null){let y=a.querySelector("[data-workspace-preset-select]");y&&(y.value=T)}}let he=!1,xe=()=>{he=!1},We=y=>{y.target===y.currentTarget&&R()};a.addEventListener("close",xe),a.addEventListener("cancel",xe),a.addEventListener("click",We);let Ae=null;r&&r.subscribe&&(Ae=r.subscribe(()=>{he&&ae()}));let O=null;n&&n.subscribe&&(O=n.subscribe(()=>{he&&ae()}));function j(){he||(he=!0,ae(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function R(){he&&(he=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:j,close:R,destroy(){he=!1,a.removeEventListener("close",xe),a.removeEventListener("cancel",xe),a.removeEventListener("click",We),Ae&&(Ae(),Ae=null),O&&(O(),O=null),a.remove()}}}function Pr(e){let t=At(e.created_at),r=At(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Du(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function nn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Wn(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Bt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,f)=>(p.requested_at||0)-(f.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?Du(s.phase):null,d=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function Xt(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
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
  </div>`}function Ws(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=ft(e.usage),s=Lt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action,i=e.lane==="done"&&!a,l=i?At(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",f=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,g=c`<span class="worker-mini__title">${e.title}</span>`,A=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",x=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",T=r.map(le=>le===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${le}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${le===e.completion_badge&&e.completion_title||""}
          >${le}</span
        >`),q=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",w=n.length>0?n.map(le=>c`<span class="worker-usage" title=${le.tooltip}
              >${le.label}</span
            >`):s?c`<span class="worker-usage" title=${Rr(e.usage)}
            >${s}</span
          >`:"",D=o?c`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",ee=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",I=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",E=e.discard,S=E?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${E?.attempt_id||""}
          data-operation-id=${E?.operation?.operation_id||""}
          data-discard-mode=${E?.confirmation||"unmerged"}
          ?disabled=${E?!E.enabled:e.discard_enabled===!1}
          title=${E?E.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${E?.label||"\uD3D0\uAE30"}
        </button>`:"",M=e.revise_action?c`<button
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
        </button>`:"",N=!!(s||o||e.merge_action||e.cancel_action||e.discard_action||E?.operation||e.revise_action);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${p}${f}${g}</div>
          <div class="worker-mini__row2">
            ${w}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ht(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${T}${D}
            <span class="worker-mini__actions"
              >${ee}${I}${S}</span
            >
            ${Pr(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${p}${f}${A}${x}${T}${q}
            </div>
            <div class="worker-mini__body">${g}</div>
            ${N?c`<div class="worker-mini__foot">
                  ${w}${D}
                  <span class="worker-mini__actions"
                    >${ee}${I}${S}${M}</span
                  >
                  ${Xt(e)}
                </div>`:""}
            ${Pr(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${f}${g}${A}${x}${T}${q}${w}${D}${ee}${I}${S}
            </div>
            ${Xt(e)} ${Pr(e)}`}
  </div>`}function Ou(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
    ${r?xn(r,e.status):""}
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"quick_fix route\uB294 \uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${Pr(e)}
  </div>`}function Ut(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Ou(n):Ws(n))}
          </div>`}
  </section>`}var Ti=160;function Ei(e){return e.length>Ti?`${e.slice(0,Ti)}\u2026`:e}function Pu(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Ei(e.command)}</code>`:""}
  </div>`}function Mu(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function Nu(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function Gs(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Ci(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
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
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Pu(e.failure.cause_detail)}
          ${Xt({discard:e.failure.discard})}
        </div>`:""}
    ${t.map(r=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}).
          ${typeof r.retry_count=="number"&&Number.isInteger(r.retry_count)&&r.retry_count>0?c`${r.retry_count}회 자동 재시도 후에도 실패했습니다 — `:""}정리를
          사람이 마무리하세요.
          ${r.detail?c`<div class="worker-banner__detail">
                <code>${Ei(r.detail)}</code>
              </div>`:""}
          ${Nu(r.log_path)} ${Mu(r.output_tail)}
        </div>`)}
  </div>`}function Fu(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Gs(t-e.started_at):"\u2014",a=[e.runner,e.model].filter(Boolean).join(" \xB7 "),i=ft(e.usage),l=Lt(e.usage),d=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,p=e.base_exception||null,f=e.attempt_id&&e.attempt_id===r,g=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
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
            ${g}
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
            ${g}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||i.length>0||l||d||p?c`<div class="rtile__meta">
          ${d?c`<span class="worker-mini__badge">${d}</span>`:""}
          ${p?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${p}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${i.length>0?i.map(A=>c`<span class="worker-usage" title=${A.tooltip}
                    >${A.label}</span
                  >`):l?c`<span
                  class="worker-usage"
                  title=${Rr(e.usage)}
                  >${l}</span
                >`:""}
        </div>`:""}
    ${Pr(e)} ${Xt(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ys(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Fu(s,t,r))}
  </div>`}function ir(e){return c`<svg
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
  </svg>`}function Vs(){return ir(Ht`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ks(){return ir(Ht`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ri(){return ir(Ht`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Ii(){return ir(Ht`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Li(){return ir(Ht`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Di(){return ir(Ht`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Oi(){return ir(Ht`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Pi(){return ir(Ht`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var sn=1,qu=6e4,Bu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Uu=new Set(["auto_merge","merged","merge","done"]),Mi={running:3,paused:2,failed:1};function ju(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function zu(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),g=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!g&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let f=Mi[d.run_state],g=Mi[i];if(f>g||f===g&&(d.started_at??0)>(l??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Et(e,a.bead_id),can_pause:i==="running"&&p,can_resume:i!=="running"&&p&&!n.has(a.attempt_id)})}return o}function Ni(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function xt(e){return e&&typeof e=="object"?e:{}}function Zs(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let w of s)w&&typeof w.root_dir=="string"&&a.set(w.root_dir,w);let i=[],l=[],d=[],p=[],f=[],g=new Map;for(let w of n){if(!w||typeof w.root_dir!="string")continue;let D=w.root_dir,ee=w.name||D,I=a.get(D),E=I&&typeof I.revision=="number"?I.revision:typeof w.revision=="number"?w.revision:0,S=xt(w.attempts),M=xt(w.bead_titles),N=xt(w.pr_observations),le=xt(w.admission),Le=xt(w.revise_parked),ce=xt(w.merge_queue_state),$e=xt(w.cleanup_failed),Ee=xt(w.deployment_reconcile||w.reconcile),je=xt(w.discard_operations),Pe=Array.isArray(w.merge_queue)?w.merge_queue:[],Me=new Set(Pe.filter(te=>te&&typeof te.bead_id=="string").map(te=>te.bead_id)),be=Array.isArray(w.queue)?w.queue:[],oe=Array.isArray(w.done)?w.done:[],ve=new Map;for(let te of oe)te&&typeof te.bead_id=="string"&&typeof te.added_at=="number"&&ve.set(te.bead_id,te.added_at);let Oe=te=>({id:te,title:M[te]||te,root_dir:D,workspace_name:ee,expected_revision:E,draggable:!1}),pe=new Set;for(let[te,Z]of zu(S,ve))pe.add(te),l.push({...Oe(te),lane:"running",attempt_id:Z.attempt_id,run_state:Z.run_state,can_pause:Z.can_pause,can_resume:Z.can_resume,started_at:Z.started_at,last_event_at:Z.last_event_at,model:Z.model,usage:Z.usage,discard:Bt(je,te,{attempt_id:Z.attempt_id}),badges:Z.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:Z.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:Z.run_state==="failed"});for(let te of Array.isArray(w.pr_wait)?w.pr_wait:[]){let Z=te&&te.bead_id;if(typeof Z!="string"||pe.has(Z))continue;pe.add(Z);let Se=xt(N[Z]),_e=xt(Se.pr),ge=Se.gate?xt(Se.gate):null,U=Me.has(Z),L=ce.active===Z,ae=te.external===!0,he=$e[Z]||null,xe=xt(Ee[Z]),We=!he&&xe.adapter==="managed"&&xe.stage==="restarting",Ae=!!ge&&ge.base_badge==="\uCDA9\uB3CC",O=!!he&&!!ge&&ge.tier==="merged",j=ae&&!!ge&&ge.tier==="merged",R=Bt(je,Z,{external:ae,merge_active:L,merge_queued:U,merged:!!he||ge?.tier==="merged"}),y=!!R.operation;d.push({...Oe(Z),lane:"pr_wait",pr_number:typeof _e.number=="number"?_e.number:null,pr_url:typeof _e.url=="string"?_e.url:void 0,external:ae,usage:Et(S,Z),badges:he?["\uC815\uB9AC \uC2E4\uD328"]:We?["\uC815\uB9AC \uC911 \xB7 \uC7AC\uC2DC\uC791"]:[],alert:!!he,reason:he?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":We?"\uC815\uB9AC \uC911 \xB7 \uC7AC\uC2DC\uC791":"PR \uB300\uAE30",merge_action:!U,merge_enabled:!y&&(ge?.enabled===!0||Ae||O||j),merge_label:j||O?"\uC815\uB9AC":Ae&&!O?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:y?R.error?`\uD3D0\uAE30 \uC2E4\uD328: ${R.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${R.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:j?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":O?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":Ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ge?.enabled===!0?`\uBA38\uC9C0 (${ge.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ge?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:U,cancel_enabled:!L,discard:R,discard_action:R.action,discard_enabled:R.enabled,discard_title:R.title})}for(let te=0;te<be.length;te++){let Z=be[te],Se=Z&&Z.bead_id;if(typeof Se!="string"||pe.has(Se))continue;pe.add(Se);let _e=Le[Se],ge=Bt(je,Se),U=ge.operation?ge:null,L={...Oe(Se),lane:"queue",draggable:!U,discard:U||void 0,reason:Ni(le,Se),queue_position:te+1,queue_index:te,queue_length:be.length,badges:_e?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!_e,revise_action:!!_e,revise_enabled:!!_e&&!U,revise_title:_e?_e.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${_e.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(L);let ae=g.get(D);ae?ae.push(L):g.set(D,[L])}for(let te of Array.isArray(w.runnable)?w.runnable:[]){let Z=te&&te.bead_id;typeof Z!="string"||pe.has(Z)||(pe.add(Z),i.push({...Oe(Z),title:te.title||M[Z]||Z,lane:"runnable",draggable:!0,reason:Ni(le,Z),created_at:te.created_at??void 0,updated_at:te.updated_at??void 0,labels:Array.isArray(te.labels)?te.labels:[],spec_reviewer:typeof te.spec_reviewer=="string"?te.spec_reviewer:void 0,plan_state:te.plan_state==="approved"||te.plan_state==="authored"?te.plan_state:"none",workflow:te.route?{route:te.route,chips:{route:te.route}}:null,place_index:be.length}))}for(let te of oe){let Z=te&&te.bead_id;if(typeof Z!="string"||pe.has(Z)||(pe.add(Z),o!==void 0&&typeof te.added_at=="number"&&te.added_at<o))continue;let Se=ju(S,Z);f.push({...Oe(Z),lane:"done",done:!0,usage:Et(S,Z),done_at:typeof te.added_at=="number"?te.added_at:void 0,done_kind:Se&&typeof Se.done_kind=="string"?Se.done_kind:null})}}let A=new Map;s.forEach((w,D)=>{w&&typeof w.root_dir=="string"&&A.set(w.root_dir,D)});let x=r&&r.running_sort==="repo"?"repo":"started";l.sort((w,D)=>{if(x==="repo"){let E=A.get(w.root_dir)??Number.MAX_SAFE_INTEGER,S=A.get(D.root_dir)??Number.MAX_SAFE_INTEGER;if(E!==S)return E-S}let ee=typeof w.started_at=="number"&&Number.isFinite(w.started_at)?w.started_at:null,I=typeof D.started_at=="number"&&Number.isFinite(D.started_at)?D.started_at:null;return ee!==null&&I!==null&&ee!==I?ee-I:ee===null&&I!==null?1:ee!==null&&I===null?-1:w.id.localeCompare(D.id)}),f.sort((w,D)=>(D.done_at??0)-(w.done_at??0));let T=s.length>0?s:n.map(w=>({root_dir:w&&w.root_dir,name:w&&w.name,auto_advance:w&&w.auto_advance,auto_merge:w&&w.auto_merge,slots:w&&w.slots,revision:w&&w.revision,exec_defaults:w&&w.exec_defaults,default_exec_preset_id:w&&w.default_exec_preset_id,runner_catalog:w&&w.runner_catalog})),q=[];for(let w of T)!w||typeof w.root_dir!="string"||q.push({root_dir:w.root_dir,name:w.name||w.root_dir,auto_advance:w.auto_advance===!0,auto_merge:w.auto_merge===!0,slots:typeof w.slots=="number"&&w.slots>=sn?w.slots:sn,revision:typeof w.revision=="number"?w.revision:0,exec_defaults:xt(w.exec_defaults),default_exec_preset_id:typeof w.default_exec_preset_id=="string"?w.default_exec_preset_id:null,runner_catalog:xt(w.runner_catalog),items:g.get(w.root_dir)||[]});return{runnable:i,queue:p,queue_groups:q,running:l,pr_wait:d,done:f,automation:{total:q.length,both_on:q.filter(w=>w.auto_advance&&w.auto_merge).length}}}function Hu(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<qu;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ht(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${At(e,t)}</span
        >`}</span
  >`}function on(e){return c`<div class="mon-c__title">${e.title}</div>`}function an(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Gn(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Xs(e){let t=ft(e.usage),r=Lt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${Rr(e.usage)}
        >${r}</span
      >`:""}function Qs(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Wu(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Ks()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Vs()}
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
          ${Ii()}
        </button>`:""}
  </span>`}function Gu(e,t){let r=typeof e.started_at=="number"?Gs(t-e.started_at):"";return c`${on(e)}
    <div class="mon-c__meta">
      ${Qs(e)}${Hu(e.last_event_at,t)}${an(e)}${Gn(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Xs(e)}${Wu(e)}${Xt(e)}
    </div>`}function Yu(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=At(e.updated_at);return c`${on(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${an(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${$n(e.labels,null).map(l=>c`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${Gn(e)}
      ${i?c`<span title=${`\uC218\uC815 ${ht(e.updated_at)}`}
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
    </div>`}function Vu(e){let t=!!e.discard?.operation;return c`${on(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${an(e)}
      ${Qs(e)}
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
    ${Xt(e)}
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
        </div>`:""}`}function Ku(e){let t=!!(Lt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${on(e)}
    <div class="mon-c__meta">
      ${an(e)}${Gn(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Qs(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${Xs(e)}
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
          ${Xt(e)}
        </div>`:""}`}function Zu(e,t){let r=e.done_kind||"",n=r?Bu[r]||r:"",s=At(e.done_at,t);return c`${on(e)}
    <div class="mon-c__meta">
      ${an(e)}${Gn(e)}
      ${n?c`<span
            class="mon-live__kind${Uu.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Xs(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${ht(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Fi(e,t){return e.lane==="running"?Gu(e,t):e.lane==="runnable"?Yu(e):e.lane==="queue"?Vu(e):e.lane==="pr_wait"?Ku(e):Zu(e,t)}function qi(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?Ks():Vs()}
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
        ${Li()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Di()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${sn}
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
        ${Oi()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Bi(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=qt.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Ri():Pi()}
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
        ${qt.map(i=>c`<option
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
  </div>`}function Ui(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ji(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return ft(Tn(t));let r={};for(let i of Gt)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let d=!1;for(let p of Gt){let f=l[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,d=!0)}if(d){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Lt(r):null}var Hi="bdui.monitor.done-range",Wi="bdui.monitor.running_sort";function Xu(){try{let e=window.localStorage.getItem(Hi);return Wt(e)?e:Tt}catch{return Tt}}function Qu(e){try{window.localStorage.setItem(Hi,e)}catch{}}function Ju(){try{return window.localStorage.getItem(Wi)==="repo"?"repo":"started"}catch{return"started"}}function ep(e){try{window.localStorage.setItem(Wi,e)}catch{}}var Gi="tab:monitor:pipeline",tp=1e3,rp=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function zi(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
    ${Fi(e,t)}
  </div>`}function Yi(e,t){let r=Ze("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,l=t.switchWorkspace,d=t.now||(()=>Date.now()),p=t.confirm||(O=>typeof globalThis.confirm!="function"||globalThis.confirm(O)),f=Xu(),g=Ju();function A(){let O=qt.find(j=>j.value===f);return O?O.label:""}let x=document.createElement("div");x.className="mon",e.appendChild(x);let T=Zs(null,null),q=null,w=new Map,D=new Set;function ee(O){return T.queue_groups.find(j=>j.root_dir===O)||null}let E=Hn(e,{queueStore:{get(){if(!q)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let O=w.get(q);if(O)return O;let j=ee(q),R=s&&s.get?s.get():null,y=(Array.isArray(R)?R:[]).find(z=>z&&z.root_dir===q);return{revision:j?j.revision:0,exec_defaults:j?j.exec_defaults:{},default_exec_preset_id:j?j.default_exec_preset_id:null,runner_catalog:j?j.runner_catalog:null,workspace_info:y?y.workspace_info:void 0}},set(O){q&&w.set(q,O);for(let j of Array.from(D))j()},subscribe(O){return D.add(O),()=>D.delete(O)}},presetStore:a,transport:o?(O,j)=>o(O,O==="worker-queue-set-default-exec-preset"||O==="get-worker-system-prompt"?{...j||{},root_dir:q}:j):void 0,getWorkspacePath:()=>q||void 0}),S=null,M=null;async function N(O,j,R,y){if(!o||!R)return null;let z=await o(O,{...j,root_dir:R,expected_revision:y});if(z&&z.conflict){let B=z.queue&&typeof z.queue.revision=="number"?z.queue.revision:y;z=await o(O,{...j,root_dir:R,expected_revision:B})}return z&&z.queue&&R&&w.set(R,z.queue),z}async function le(O,j,R){let y=await N("worker-discard",O,j,R);if(y&&y.discarded===!0){re(Wn(y),"success",5e3);return}if(y&&y.reason){re(`\uD3D0\uAE30 \uC2E4\uD328: ${y.reason}`,"error");return}if(y&&y.accepted&&y.pending==="merged_revert"){re("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(y&&y.accepted){re(`\uD3D0\uAE30 \uC9C4\uD589: ${y.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}y&&!y.conflict&&re("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Le(O,j,R){return!o||!R?null:await o(O,{...j,root_dir:R})}async function ce(O){if(!o||!O&&!p("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let j=await o("monitor-auto-toggle",{on:O}),R=j&&Array.isArray(j.failed)?j.failed:[];R.length>0&&re(`\uC790\uB3D9\uD654 ${O?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${R.map(y=>y.root_dir).join(", ")}`,"error",3200)}async function $e(){let O=new Map;for(let j of T.pr_wait)O.has(j.root_dir)||O.set(j.root_dir,j.expected_revision);for(let[j,R]of O)await N("worker-merge-queue-add-all",{},j,R)}let Ee=null,je=!1,Pe=null;function Me(){Pe!==null&&clearTimeout(Pe),Pe=setTimeout(()=>{Pe=null,je=!1},0)}function be(O){let j=O.target;return typeof j?.closest=="function"?j.closest(".mon-group"):null}function oe(O){let j=be(O);return!j||!Ee?null:(j.getAttribute("data-root-dir")||"")===Ee.root_dir?j:null}function ve(){for(let O of Array.from(x.querySelectorAll(".mon-group--drag-over")))O.classList.remove("mon-group--drag-over")}function Oe(O){let j=O.target,R=typeof j?.closest=="function"?j.closest('.mon-card[draggable="true"]'):null;if(R){Ee={bead_id:R.getAttribute("data-issue-id")||"",lane:R.getAttribute("data-lane")||"",root_dir:R.getAttribute("data-root-dir")||"",revision:Number(R.getAttribute("data-revision")||0)||0,queue_index:Number(R.getAttribute("data-queue-index")),queue_length:Number(R.getAttribute("data-queue-length")),place_index:Number(R.getAttribute("data-place-index"))},je=!0;try{O.dataTransfer?.setData("text/plain",Ee.bead_id),O.dataTransfer&&(O.dataTransfer.effectAllowed="move")}catch{}}}function pe(O){let j=oe(O);j&&(O.preventDefault(),O.dataTransfer&&(O.dataTransfer.dropEffect="move"),j.classList.add("mon-group--drag-over"))}function te(O){be(O)?.classList.remove("mon-group--drag-over")}function Z(){Ee=null,ve(),Me()}function Se(O){let j=oe(O),R=Ee;if(Ee=null,ve(),!j||!R||!R.bead_id)return;O.preventDefault();let y=O.target,z=typeof y?.closest=="function"?y.closest('.mon-card[data-lane="queue"]'):null,B=z&&j.contains(z)?Number(z.getAttribute("data-queue-index")):NaN;if(R.lane==="runnable"){let ye=Number.isFinite(B)?B:R.place_index;if(!Number.isFinite(ye))return;N("worker-queue-place",{bead_id:R.bead_id,index:ye},R.root_dir,R.revision);return}if(R.lane!=="queue"||z&&z.getAttribute("data-issue-id")===R.bead_id)return;let Y=R.queue_index,se=Number.isFinite(B)?Y>B?B:B-1:R.queue_length-1;!Number.isFinite(se)||se<0||se===Y||N("worker-queue-reorder",{bead_id:R.bead_id,to_index:se},R.root_dir,R.revision)}function _e(O){let j={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done};return c`${Bi({automation:T.automation,counts:{running:T.running.length,queue:T.queue.length,pr_wait:T.pr_wait.length},running_sort:g,done_range:f,token_total:ji(T.done),token_tooltip:Ui(A())})}
      <div class="worker-lanes mon-lanes">
        ${rp.map(R=>{let y=j[R.lane],z=R.lane==="queue"?T.queue_groups.length>0?c`${T.queue_groups.map(B=>c`<div
                        class="mon-group"
                        data-root-dir=${B.root_dir}
                      >
                        ${qi(B)}
                        <div class="mon-group__list">
                          ${B.items.map(Y=>zi(Y,O))}
                        </div>
                      </div>`)}`:void 0:y.length>0?c`${y.map(B=>zi(B,O))}`:void 0;return Ut({id:`monitor-${R.lane}`,lane:R.pane,title:R.lane==="done"?`\uC644\uB8CC\xB7${A()}`:R.title,items:y,empty:R.empty,body:z,live:R.lane==="running"&&y.length>0,header_control:R.lane==="pr_wait"&&y.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ge(){let O=s&&s.get?s.get():null,j=s&&s.getWorkspacesState?s.getWorkspacesState():[],R=d();T=Zs(O,j,{done_since:$r(f,R),running_sort:g}),qe(_e(R),x)}function U(O,j){let R=i?i():void 0;if(!j||!R||j===R||!l){n(O);return}l(j).then(()=>{n(O)}).catch(y=>{r("workspace switch for %s failed: %o",j,y)})}function L(O){return{root_dir:O.getAttribute("data-root-dir")||"",revision:Number(O.getAttribute("data-revision")||0)||0}}function ae(O,j){let{root_dir:R,revision:y}=L(O),z=O.getAttribute("data-issue-id")||"",B=j.dataset.attemptId||O.getAttribute("data-attempt-id")||"",Y=j.classList;if(Y.contains("worker-card__place")){N("worker-queue-place",{bead_id:z,index:Number(O.getAttribute("data-place-index")||0)||0},R,y);return}if(Y.contains("mon-op--up")||Y.contains("mon-op--down")){let se=Number(O.getAttribute("data-queue-index")||0)||0,ye=Y.contains("mon-op--up")?se-1:se+1;if(ye<0)return;N("worker-queue-reorder",{bead_id:z,to_index:ye},R,y);return}if(Y.contains("mon-op--remove")){N("worker-queue-remove",{bead_id:z},R,y);return}if(Y.contains("mon-op--pause")){Le("worker-attempt-pause",{attempt_id:B},R);return}if(Y.contains("mon-op--discard")){if(!p(nn(z,"unmerged")))return;le({bead_id:z,...B?{attempt_id:B}:{},...j.dataset.operationId?{operation_id:j.dataset.operationId}:{}},R,y);return}if(Y.contains("mon-op--resume")){N("worker-attempt-resume",{attempt_id:B},R,y);return}if(Y.contains("mon-op--dismiss")){N("worker-attempt-dismiss",{attempt_id:B},R,y);return}if(Y.contains("worker-mini__merge")){N("worker-merge-queue-add",{bead_id:z},R,y);return}if(Y.contains("worker-mini__merge-cancel")){N("worker-merge-queue-remove",{bead_id:z},R,y);return}if(Y.contains("worker-mini__discard")){let se=j.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(nn(z,se)))return;le({bead_id:z,...B?{attempt_id:B}:{},...j.dataset.operationId?{operation_id:j.dataset.operationId}:{}},R,y);return}if(Y.contains("worker-mini__revise-fix")){N("worker-revise-fix",{bead_id:z},R,y);return}Y.contains("worker-mini__revise-approve")&&N("worker-revise-approve",{bead_id:z},R,y)}function he(O){let j=je;je=!1;let R=O.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest("a"))return;let y=R.closest(".mon-running-sort");if(y){O.preventDefault(),g=y.getAttribute("data-sort")==="repo"?"repo":"started",ep(g),ge();return}let z=R.closest(".mon-auto-all");if(z){O.preventDefault(),ce(z.getAttribute("data-on")==="true");return}if(R.closest(".mon-merge-all")){O.preventDefault(),$e();return}let Y=R.closest(".mon-ctl--advance");if(Y){O.preventDefault();let{root_dir:De,revision:ze}=L(Y);N("worker-queue-toggle",{on:Y.getAttribute("data-on")==="true"},De,ze);return}let se=R.closest(".mon-ctl--merge-auto");if(se){O.preventDefault();let{root_dir:De,revision:ze}=L(se);N("worker-merge-auto-toggle",{on:se.getAttribute("data-on")==="true"},De,ze);return}let ye=R.closest(".mon-ctl--exec");if(ye){O.preventDefault(),q=ye.getAttribute("data-root-dir")||null,w.delete(q||""),E.open();return}let Re=R.closest(".mon-card");if(!Re)return;let Qe=R.closest("button");if(Qe){O.preventDefault(),ae(Re,Qe);return}let Je=Re.getAttribute("data-issue-id");Je&&!j&&(O.preventDefault(),U(Je,Re.getAttribute("data-root-dir")||""))}function xe(O){let j=O.target;if(!j||typeof j.closest!="function")return;let R=j.closest(".mon-done-range");if(R){f=Wt(R.value)?R.value:Tt,Qu(f),ge();return}let y=j.closest(".mon-slots__input");if(!y)return;let{root_dir:z,revision:B}=L(y),Y=Number(y.value);if(!Number.isFinite(Y))return;let se=Math.max(sn,Math.floor(Y));N("worker-queue-set-slots",{slots:se},z,B)}e.addEventListener("click",he),e.addEventListener("change",xe),e.addEventListener("dragstart",Oe),e.addEventListener("dragover",pe),e.addEventListener("dragleave",te),e.addEventListener("drop",Se),e.addEventListener("dragend",Z),s&&typeof s.subscribe=="function"&&(S=s.subscribe(()=>{try{w.clear(),ge();for(let O of Array.from(D))O()}catch{}}));function We(){M!==null&&(clearInterval(M),M=null)}function Ae(){Pe!==null&&(clearTimeout(Pe),Pe=null)}return{load(){r("load"),ge(),M===null&&(M=setInterval(()=>{try{ge()}catch{}},tp))},pause(){We()},clear(){We(),Ae(),S&&(S(),S=null),e.removeEventListener("click",he),e.removeEventListener("change",xe),e.removeEventListener("dragstart",Oe),e.removeEventListener("dragover",pe),e.removeEventListener("dragleave",te),e.removeEventListener("drop",Se),e.removeEventListener("dragend",Z),E.destroy(),D.clear(),e.replaceChildren()}}}function Vi(e,t,r){let n=Ze("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){qe(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),qe(c``,e)}}}var Ki=["bug","feature","task","epic","chore"];function Zi(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Xi=["Critical","High","Medium","Low","Backlog"];function Qi(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),g=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let S of Ki){let M=document.createElement("option");M.value=S,M.textContent=Zi(S),o.appendChild(M)}a.replaceChildren();for(let S=0;S<=4;S+=1){let M=document.createElement("option");M.value=String(S);let N=Xi[S]||"Medium";M.textContent=`${S} \u2013 ${N}`,a.appendChild(M)}}A();function x(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function T(E){s.disabled=E,o.disabled=E,a.disabled=E,i.disabled=E,l.disabled=E,p.disabled=E,f.disabled=E,f.textContent=E?"Creating\u2026":"Create"}function q(){d.textContent=""}function w(E){d.textContent=E}function D(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function ee(){let E=o.value||"",S=a.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function I(){q();let E=String(s.value||"").trim();if(E.length===0){w("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){w("Priority must be 0..4"),a.focus();return}let M=String(o.value||""),N=String(l.value||""),le={title:E};M.length>0&&(le.type=M),String(S).length>0&&(le.priority=S),N.length>0&&(le.description=N),T(!0);try{await t("create-issue",le)}catch{T(!1),w("Failed to create issue");return}ee(),T(!1),x()}return r.addEventListener("cancel",E=>{E.preventDefault(),x()}),g.addEventListener("click",()=>x()),p.addEventListener("click",()=>x()),r.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),I())}),n.addEventListener("submit",E=>{E.preventDefault(),I()}),{open(){n.reset(),q(),D();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var np=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ji(e){return String(e).padStart(2,"0")}function sp(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function op(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Ji(n.getHours())}:${Ji(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${np[n.getMonth()]} ${n.getDate()} ${o}`;return`${sp(r,t)} \xB7 ${i}`}function ap(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var el=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function tl(e){let t=!1,r=null,n=new Map;function s(){qe(c``,e),e.hidden=!0}function o(){let l=el.filter(p=>n.has(p.key));if(l.length===0){s();return}let d=Date.now();qe(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(p=>{let f=n.get(p.key),g=typeof f.ageSeconds=="number"&&f.ageSeconds>600,A=g?`${Math.floor(f.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${g?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${f.windows.map(x=>{let T=typeof x.pct=="number"&&Number.isFinite(x.pct)?x.pct:0,q=Math.min(100,Math.max(0,T)),D=`resets ${op(x.resetsAt,d)}${g?` \xB7 ${A}`:""}`;return c`<span
                class="usage-meter__window ${ap(q)}"
                style=${`--progress: ${q}%`}
                title=${D}
              >
                <span class="usage-meter__label">${x.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${q}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let p=await d.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function i(){let l=await Promise.all(el.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var ip="worker-ineligible";function lp(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function rl(e){return lp(e).includes(ip)}var cp="tab:worker:ready",dp="tab:worker:blocked",up="tab:worker:in-progress",ln=1;function nl(e){return rn(e).path.length>0}var al="beads-ui.worker.candidate-filter",Js={show_blocked:!1,spec:"all"};function pp(){try{let e=window.localStorage.getItem(al);if(!e)return{...Js};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Js};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Js}}}function fp(e){try{window.localStorage.setItem(al,JSON.stringify(e))}catch{}}function _p(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),d=n(i);l&&d?s.push(i):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var mp=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],il="bdui.worker.candidate_sort",gp=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Yn="spec";function hp(){try{let e=window.localStorage.getItem(il);return e==="board"||e==="created"||e==="spec"?e:Yn}catch{return Yn}}function bp(e){try{window.localStorage.setItem(il,e)}catch{}}var ll="bdui.worker.done-range";function vp(){try{let e=window.localStorage.getItem(ll);return Wt(e)?e:Tt}catch{return Tt}}function yp(e){try{window.localStorage.setItem(ll,e)}catch{}}var kp="(max-width: 640px)",cl="beads-ui.worker.lane-collapsed",cn={queue:!0,done:!0};function wp(){try{let e=window.localStorage.getItem(cl);if(!e)return{...cn};let t=JSON.parse(e);return!t||typeof t!="object"?{...cn}:{queue:typeof t.queue=="boolean"?t.queue:cn.queue,done:typeof t.done=="boolean"?t.done:cn.done}}catch{return{...cn}}}function $p(e){try{window.localStorage.setItem(cl,JSON.stringify(e))}catch{}}function sl(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function xp(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(_r):(n.sort(hn(r)),t==="board"?n:[...n.filter(nl),...n.filter(s=>!nl(s))])}function Sp(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Ap(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Tp(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Ep=["closed_unmerged","undecidable"],Cp=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Rp(e,t){for(let r of Cp)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var Ip=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_sync",label:"base \uB3D9\uAE30\uD654",index:2},{step:"reconcile_queued",label:"\uC815\uB9AC \uC900\uBE44",index:2},{step:"candidate_pinned",label:"\uBC30\uD3EC \uD6C4\uBCF4 \uACE0\uC815",index:3},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D",index:4},{step:"reconcile_verify",label:"\uC815\uB9AC \uC911 \xB7 \uAC80\uC99D",index:4},{step:"deploy",label:"\uBC30\uD3EC",index:5},{step:"reconcile_deploy",label:"\uC815\uB9AC \uC911 \xB7 \uBC30\uD3EC",index:5},{step:"reconcile_restart",label:"\uC815\uB9AC \uC911 \xB7 \uC7AC\uC2DC\uC791",index:6},{step:"reconcile_readback",label:"\uC815\uB9AC \uC911 \xB7 readback",index:6},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:7},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:8},{step:"parent_close",label:"\uBD80\uBAA8 close",index:9}];function Lp(e){if(typeof e!="string"||e.length===0)return null;let t=9,r=Ip.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Dp(e){if(!e||e.adapter!=="managed"&&e.stage!=="queued")return null;let t=e.stage==="queued"?"reconcile_queued":e.stage==="pinned"?"candidate_pinned":e.stage==="verifying"?"reconcile_verify":e.stage==="deploying"?"reconcile_deploy":e.stage==="restarting"?"reconcile_restart":e.stage==="readback"?"reconcile_readback":null;return t?{activity:null,merge_progress:{step:t,started_at:typeof e.updated_at=="number"?e.updated_at:0}}:null}function ol(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Op(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function eo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Pp(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Mp(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,d=!0,p=null,f=null,g=null,A={}){let x=!!l&&l.position>0,T=!!l&&l.active===!0,q=l&&l.failure||null,w=r[e]||null,D=w&&w.gate?w.gate:null,ee=w&&w.pr?w.pr:null,I=Pp(g),E=Op(l?l.resolution:null),S=[];i&&S.push("\uC138\uC158");let M=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":E?E.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,N=Rp(i&&D&&D.tier==="closed_unmerged"?"\uB2EB\uD798":D&&D.gate_badge||"",M?null:o&&o.activity||null);M&&S.push(M),N.label&&S.push(N.label),D&&D.base_badge&&D.base_badge!==D.gate_badge&&S.push(D.base_badge),f&&S.push(f),n&&S.push("\uC815\uB9AC \uC2E4\uD328"),I&&S.push(I.badge),x&&!T&&S.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),q&&S.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${ol(q)}`),p&&S.push(`\uC790\uB3D9 \uC81C\uC678: ${ol(p)}`);let le=!!D&&D.base_badge==="\uCDA9\uB3CC",Le=!!D&&D.enabled===!0,ce=Lp(o&&o.merge_progress?o.merge_progress.step:null),$e=!!n&&!!D&&D.tier==="merged",Ee=i&&!!D&&D.tier==="merged",je=i&&le&&d===!1,Pe=Bt(A,e,{external:i,merge_active:T||!!ce,merge_queued:x,conflict_active:!!a,cleanup_active:!1,merged:!!n||D?.tier==="merged"}),Me=!!Pe.operation;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:i,pr_number:ee&&typeof ee.number=="number"?ee.number:null,pr_url:ee&&typeof ee.url=="string"?ee.url:"",completion_badge:I?I.badge:null,completion_title:I?I.title:"",completion_repair_pr_url:I?I.repair_pr_url:"",completion_repair_pr_number:I?I.repair_pr_number:null,badges:S,live_badge:a==="paused"?null:E?.live||a==="running"?M:N.live?N.label:null,usage:s,alert:!!D&&Ep.includes(D.tier)||!!n||!!q||!!(I&&I.alert),merge_action:!x,cancel_action:x,cancel_enabled:!T&&!(I&&I.lock_actions),cancel_title:I&&I.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":T?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Pe,discard_action:Pe.action,merge_step:ce,discard_enabled:Pe.enabled,discard_title:Pe.title,merge_enabled:!ce&&!a&&!Me&&!(I&&I.lock_actions)&&!je&&(Le||le||$e||Ee),merge_label:$e||Ee?"\uC815\uB9AC":le&&!ce&&!$e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Me?Pe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Pe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Pe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ce?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ce.label}`:Ee?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":je?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":$e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":le?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Le?`\uBA38\uC9C0 (${D.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:D&&D.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${D&&D.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function to(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:d}=t,p=n?vn(n,i):null,f=kn({transport:r,uiOrderStore:i}),g=null,A=[],x=pp(),T=hp(),q=vp();function w(){let u=qt.find(h=>h.value===q);return u?u.label:"\uC624\uB298"}let D=wp(),ee=!1,I=new Set,E=new Set,S=[],M=document.createElement("div");M.className="worker-console";let N=document.createElement("div");N.className="worker-top";let le=document.createElement("div");le.className="worker-drawer-overlay",le.hidden=!0;let Le=document.createElement("div");Le.className="worker-drawer-overlay__backdrop";let ce=document.createElement("div");ce.className="worker-drawer-host",le.append(Le,ce);let $e=document.createElement("div");$e.className="worker-lanes-host",M.append(N,le,$e),e.appendChild(M);let Ee=null,je=Un(ce,{transport:r,sessionLogStore:a,onClose:()=>{Ee=null,le.hidden=!0,De()}}),Pe=Hn(M,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:d});function Me(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:ln,queue:[],pr_wait:[],done:[]}}function be(){let u=Me();return typeof u.revision=="number"?u.revision:0}function oe(u){u&&u.queue&&s&&s.set(u.queue)}function ve(){let u=Me().queue;return Array.isArray(u)?u.length:0}async function Oe(u,h){if(!r)return;let P=await r("worker-queue-place",{bead_id:u,index:h,expected_revision:be()});oe(P),P&&P.conflict&&await r("worker-queue-place",{bead_id:u,index:h,expected_revision:be()}).then(oe)}async function pe(u,h){if(!r)return;let P=await r("worker-queue-reorder",{bead_id:u,to_index:h,expected_revision:be()});oe(P),P&&P.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:h,expected_revision:be()}).then(oe)}async function te(u){if(!r)return;let h=await r("worker-queue-remove",{bead_id:u,expected_revision:be()});oe(h),h&&h.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:be()}).then(oe)}async function Z(u){if(!r||!u)return;let h=await r("worker-attempt-pause",{attempt_id:u});h&&h.paused===!1&&h.reason&&re(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function Se(u){if(!r||!u)return;let h=await r("worker-attempt-resume",{attempt_id:u,expected_revision:be()});oe(h),h&&h.conflict&&(h=await r("worker-attempt-resume",{attempt_id:u,expected_revision:be()}),oe(h)),h&&h.resumed===!1&&!h.conflict&&h.reason&&re(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function _e(u){if(!r||!u)return;let h=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:be()});oe(h),h&&h.conflict&&(h=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:be()}),oe(h)),h&&h.dismissed===!1&&!h.conflict&&h.reason&&re(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function ge(u,h){if(!r)return null;let P=r,Q=await P(u,{...h,expected_revision:be()});return oe(Q),Q&&Q.conflict&&(Q=await P(u,{...h,expected_revision:be()}),oe(Q)),Q}async function U(u){if(!r||!u)return;I.add(u),De();let h;try{h=await ge("worker-merge-queue-add",{bead_id:u})}finally{I.delete(u),De()}!h||h.conflict||h.applied||re("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function L(u){if(!r)return;let h=await ge("worker-merge-auto-toggle",{on:u});!h||h.conflict||re(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function ae(u){if(!r||!u)return;let h=await ge("worker-merge-queue-remove",{bead_id:u});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&re("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function he(){await ge("worker-merge-queue-remove",{all:!0})}async function xe(u,h=null,P="unmerged",Q=null){if(!r||!u)return;let ie=nn(u,P);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(ie)))return;let K=await r("worker-discard",{bead_id:u,...h?{attempt_id:h}:{},...Q?{operation_id:Q}:{},expected_revision:be()});if(oe(K),K&&K.conflict&&(K=await r("worker-discard",{bead_id:u,...h?{attempt_id:h}:{},...Q?{operation_id:Q}:{},expected_revision:be()}),oe(K)),K&&K.discarded===!0){re(Wn(K),"success",5e3);return}if(K&&K.reason){re(`\uD3D0\uAE30 \uC2E4\uD328: ${K.reason}`,"error",2800);return}if(K&&K.accepted&&K.pending==="merged_revert"){re("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(K&&K.accepted&&!K.discarded){re(`\uD3D0\uAE30 \uC9C4\uD589: ${K.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}K&&!K.conflict&&re("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function We(u,h){if(!r||!h||E.has(h))return;E.add(h),De();let P;try{P=await r(u,{bead_id:h,expected_revision:be()}),oe(P),P&&P.conflict&&(P=await r(u,{bead_id:h,expected_revision:be()}),oe(P))}finally{E.delete(h),De()}if(!(!P||P.conflict)){if(P.ok){re(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}re(`\uCC98\uBD84 \uAC70\uBD80: ${P.reason||""}`,"error",3e3)}}async function Ae(u){if(!r)return;let h=await r("worker-queue-toggle",{on:u,expected_revision:be()});oe(h),h&&h.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:be()}).then(oe)}async function O(u){if(!r||!Number.isFinite(u))return;let h=Math.max(ln,Math.floor(u)),P=await r("worker-queue-set-slots",{slots:h,expected_revision:be()});oe(P),P&&P.conflict&&await r("worker-queue-set-slots",{slots:h,expected_revision:be()}).then(oe)}async function j(u){if(!r)return;let h=await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:be()});oe(h),h&&h.conflict&&await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:be()}).then(oe)}function R(){let u=Me(),h=p?p.selectBoardColumn(cp,"ready"):[],P=p?p.selectBoardColumn(dp,"blocked"):[],Q=p?p.selectBoardColumn(up,"in_progress"):[],ie=new Map;for(let k of Q){let W=Ap(k);if(!W)continue;let me=ie.get(W);me?me.push(k):ie.set(W,[k])}let ke=k=>{let W=yn(ie.get(k)||[]);return W?W.title||W.id:null},K=u.bead_titles||{},Ce=new Map;for(let[k,W]of Object.entries(K))typeof W=="string"&&W.length>0&&Ce.set(k,W);for(let k of[...h,...P])Ce.set(k.id,k.title||k.id);let Ke=u.bead_times||{},mt=new Map;for(let[k,W]of Object.entries(Ke))W&&typeof W=="object"&&mt.set(k,W);for(let k of[...h,...P])mt.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let gt=k=>mt.get(k)||{},ut=u.pr_wait||[],Xe=u.pr_observations||{},pt=u.pr_activity||{},Te=u.deployment_reconcile||u.reconcile||{},ct=u.cleanup_failed||{},we=Object.entries(ct).map(([k,W])=>({bead_id:k,step:W&&W.step?W.step:"",reason:W&&W.reason?W.reason:"",detail:Te[k]?.adapter==="managed"&&(W?.detail==="checkout_dirty"||W?.detail==="checkout_not_on_base"||W?.detail==="head_not_base_sha")?null:W&&typeof W.detail=="string"?W.detail:null,output_tail:W&&typeof W.output_tail=="string"&&W.output_tail?W.output_tail:void 0,log_path:W&&typeof W.log_path=="string"&&W.log_path?W.log_path:void 0,retry_count:W&&typeof W.retry_count=="number"&&Number.isInteger(W.retry_count)&&W.retry_count>0?W.retry_count:0})),Be=u.queue||[],at=new Set([...Be.map(k=>k.bead_id),...ut.map(k=>k.bead_id),...u.done.map(k=>k.bead_id)]),Nt=new Set(P.map(k=>k.id)),Qt=i?i.get()?.order||{}:{},jt=new Set,Ft=[];for(let k of[...h,...P])at.has(k.id)||jt.has(k.id)||Sp(k)||rl(k.labels)||(jt.add(k.id),Ft.push(k));A=xp(Ft,T,Qt);let Jt=u.admission||{},ue=k=>{let W=Jt[k];if(!W)return"";if(W.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let me=typeof W.reason=="string"?W.reason:"",Ve=me.indexOf(":");return Ve>0&&Ve<me.length-1?`\u26D4 ${me.slice(0,Ve)} (${me.slice(Ve+1)})`:`\u26D4 ${me}`},b=A.map(k=>{let W=rn(k),me=W.path.length>0,Ve=k.workflow?.route==="quick_fix"||k.metadata&&k.metadata.route==="quick_fix",fn=!Ve&&me&&!W.conflict,vr=Nt.has(k.id),yr=[];vr&&yr.push(Tp(k)),Ve?yr.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):W.conflict?yr.push("spec_id_conflict"):me||yr.push("spec \uC5C6\uC74C");let yo=ue(k.id);return yo&&yr.push(yo),{id:k.id,title:k.title||k.id,reason:yr.join(" \xB7 "),draggable:fn,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,is_quick_fix:Ve,status:k.status,blocked:vr,has_spec:me}}),H=_p(b,x),_=H.visible,v=u.revise_parked||{},J=u.discard_operations&&typeof u.discard_operations=="object"&&!Array.isArray(u.discard_operations)?u.discard_operations:{},ne=(k,W)=>k.map(me=>{let Ve=W==="queue"?v[me.bead_id]:null,fn=W==="queue"?Bt(J,me.bead_id):null,vr=fn?.operation?fn:null;return{id:me.bead_id,title:Ce.get(me.bead_id)||me.bead_id,reason:W==="done"?"":ue(me.bead_id),draggable:W!=="done"&&!vr,done:W==="done",lane:W,discard:vr,badges:Ve?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ve,revise_action:!!Ve,revise_enabled:!!Ve&&!vr&&!E.has(me.bead_id),revise_title:Ve?Ve.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ve.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:W==="done"?Et(u.attempts||{},me.bead_id):null,done_at:W==="done"&&typeof me.added_at=="number"?me.added_at:void 0,...gt(me.bead_id)}}),X=new Map;for(let k of u.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&X.set(k.bead_id,k.added_at);let m=u.attempts?Object.values(u.attempts):[],C=new Set;for(let k of m)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&C.add(k.resumed_from);let $=new Map;for(let k of m)$.set(k.bead_id,k.attempt_id);let V=new Map;for(let k of m)V.set(k.attempt_id,k);function Ne(k){let W=new Set,me=k;for(;me&&!W.has(me.attempt_id);){if(me.conflict_resolution===!0)return!0;W.add(me.attempt_id),me=typeof me.resumed_from=="string"&&me.resumed_from.length>0&&V.get(me.resumed_from)||null}return!1}let rt=typeof u.declared_base=="string"?u.declared_base:null;function vt(k){let W=null;for(let me of m)!me||me.bead_id!==k||Ne(me)||(W===null||(typeof me.started_at=="number"?me.started_at:0)>=(typeof W.started_at=="number"?W.started_at:0))&&(W=me);return W&&typeof W.target_base=="string"?W.target_base:null}let Fe=[],zt=[],Vn=k=>{let W=$.get(k.bead_id)!==k.attempt_id,me=X.get(k.bead_id),Ve=typeof me=="number"&&me>0&&typeof k.finished_at=="number"&&me>=k.finished_at;return!W&&!Ve&&typeof k.dismissed_at!="number"},oo=k=>{let W=typeof k.session_id=="string"&&k.session_id.length>0,me=C.has(k.attempt_id);return{eligible:W&&!me,reason:W?me?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Rt=null;for(let k of m){let W=k.status==="paused"&&!C.has(k.attempt_id);if(k.status==="running"||W)zt.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:Ce.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:W,conflict_resolution:Ne(k),base_exception:eo(rt,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,discard:Bt(J,k.bead_id,{attempt_id:k.attempt_id}),usage:Et(u.attempts||{},k.bead_id),current_child:ke(k.bead_id),...gt(k.bead_id)});else if((k.status==="failed"||k.status==="orphaned")&&Vn(k)){let me=oo(k);Fe.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:Ce.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,failed:!0,status:k.status,status_label:k.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Bt(J,k.bead_id,{attempt_id:k.attempt_id}),resume_eligible:me.eligible,resume_reason:me.reason,conflict_resolution:Ne(k),base_exception:eo(rt,k.target_base),usage:Et(u.attempts||{},k.bead_id),current_child:ke(k.bead_id),...gt(k.bead_id)}),Rt=k}}let dn=[...Fe,...zt],ao=null;if(Rt){let k=oo(Rt),W=Rt.cause_detail;ao={bead_id:Rt.bead_id,repo:Rt.repo||"",reason:Rt.cause||Rt.status,cause_detail:W&&typeof W.reason=="string"?{reason:W.reason,command:typeof W.command=="string"?W.command:null}:null,resume_attempt_id:Rt.attempt_id,resume_eligible:k.eligible,resume_reason:k.reason,discard:Bt(J,Rt.bead_id,{attempt_id:Rt.attempt_id})}}let kl=new Set(dn.map(k=>k.bead_id)),Kn=Array.isArray(u.merge_queue)?u.merge_queue:[],io=new Map,lo=new Map;Kn.forEach((k,W)=>{k&&typeof k.bead_id=="string"&&(io.set(k.bead_id,W+1),lo.set(k.bead_id,k.resolution))});let co=u.merge_queue_state||{active:null,failures:{}},wl=co.failures||{},$l=u.auto_merge_skips||{},uo=k=>{let W=$l[k];if(!W)return null;let me=Xe[k],Ve=me&&me.pr?me.pr.head_sha:null;return Ve&&Ve===W.head_sha?W.reason||"":null},un=new Map;for(let k of dn)k.failed!==!0&&k.conflict_resolution&&(k.paused?un.has(k.bead_id)||un.set(k.bead_id,"paused"):un.set(k.bead_id,"running"));let po=dn.filter(k=>!k.paused&&k.failed!==!0).length,fo=(u.workspace_info||{}).slots,xl=typeof fo=="number"?fo:typeof u.slots=="number"?u.slots:ln,_o=u.pr_wait_holds_slot===!0?ln:xl,Sl=po>_o,mo=$r(q),Al=(Array.isArray(u.done)?u.done.slice():[]).filter(k=>mo===void 0||typeof k.added_at!="number"||k.added_at>=mo).sort((k,W)=>(W.added_at||0)-(k.added_at||0)),Zn=ne(Al,"done"),pn={};for(let k of Gt)pn[k]=0;let go=!1,ho=0,Xn=0,bo=0;for(let k of Zn){let W=k.usage;if(W&&typeof W=="object"){let me=!1;for(let Ve of Gt)Number.isFinite(W[Ve])&&(pn[Ve]+=W[Ve],go=!0,me=!0);me&&(Xn+=1,Number.isFinite(W.total_cost_usd)&&(ho+=W.total_cost_usd,bo+=1))}}Xn>0&&bo===Xn&&(pn.total_cost_usd=ho);let vo=Zn.map(k=>k.usage).filter(k=>k&&typeof k=="object"&&k.providers),Tl=vo.length>0?ft(Tn(vo)):go?Lt(pn):null;return{queue:u,idToTitle:Ce,candidates:_,candidate_hidden:{blocked:H.hidden_blocked,spec:H.hidden_spec},running:dn,live_count:po,slots:_o,over_cap:Sl,failure:ao,waiting:ne(Be.filter(k=>!kl.has(k.bead_id)),"queue"),pr_wait:ut.map(k=>Mp(k.bead_id,Ce.get(k.bead_id)||k.bead_id,Xe,ct[k.bead_id]||null,Et(u.attempts||{},k.bead_id),Dp(Te[k.bead_id])||pt[k.bead_id]||(I.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),un.get(k.bead_id)||null,k.external===!0,{position:io.get(k.bead_id)||0,active:co.active===k.bead_id,failure:wl[k.bead_id]||null,resolution:lo.get(k.bead_id)},k.wt_present!==!1,u.auto_merge===!0?uo(k.bead_id):null,eo(rt,vt(k.bead_id)),u.completion_status&&typeof u.completion_status=="object"&&!Array.isArray(u.completion_status)&&u.completion_status[k.bead_id]||null,u.discard_operations&&typeof u.discard_operations=="object"&&!Array.isArray(u.discard_operations)?u.discard_operations:{})).map(k=>({...k,...gt(k.id)})),merge_queue_length:Kn.length,merge_queue_running:Kn.length>0,auto_excluded:ut.map(k=>k.bead_id).filter(k=>uo(k)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:rt,done:Zn,token_total:Tl,cleanup_failures:we}}function y(u){let h=u.waiting.length>0?u.waiting[0].id:"\u2014",P=c`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,Q=Re(u),ie=u.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ke=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${w()} 완료 <b>${u.done.length}</b></span
      >`,K=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Ce=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ln}
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
      </button>`,Ke=Ci({failure:u.failure,cleanupFailures:u.cleanup_failures});return ee?c`<div class="worker-ribbon">
          ${P} ${Q}
          <div class="worker-kpi worker-kpi--ribbon">${ie}${ke}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ce}</div>
          <div class="worker-kpi">${K}</div>
        </div>
        ${Ke}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${P}${Q}${Ce}</div>
        <div class="worker-kpi">
          ${ie}${ke}${K}
          ${(Array.isArray(u.token_total)?u.token_total:u.token_total?[{label:u.token_total,tooltip:`${w()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(mt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${mt.tooltip}
                >${w()} 완료 · 누적 ${mt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${h}</b></span
          >
        </div>
      </div>
      ${Ke}`}function z(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let h=u.running.some(P=>!P.paused&&P.failed!==!0);return c`<section
      class="worker-now${h?" worker-pane--live":""}"
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
      ${u.running.length>0?Ys(u.running,Date.now(),Ee):""}
      ${u.pr_wait.map(P=>Ws(P))}
    </section>`}function B(u){let h=u.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${mp.map(P=>c`<button
              type="button"
              class="worker-filter__chip${x.spec===P.value?" is-active":""}"
              data-spec=${P.value}
              aria-pressed=${x.spec===P.value?"true":"false"}
            >
              ${P.label}
            </button>`)}
        ${h.spec>0?c`<span class="worker-filter__hidden">숨김 ${h.spec}</span>`:""}
      </div>
    </div>`}function Y(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${T}
    >
      ${gp.map(u=>c`<option value=${u.value} ?selected=${T===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function se(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${q}
      >
        ${qt.map(u=>c`<option value=${u.value} ?selected=${q===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function ye(u){let h=(u.queue.pr_wait||[]).filter(Q=>Q&&Q.external!==!0&&typeof Q.bead_id=="string"),P=new Set(u.running.filter(Q=>!Q.paused&&Q.failed!==!0).map(Q=>Q.bead_id));for(let Q of h)P.add(Q.bead_id);if(!(u.queue.pr_wait_holds_slot!==!0||u.queue.auto_advance!==!0||u.queue.auto_merge===!0||h.length===0||u.waiting.length===0||P.size<u.slots))return c`<div class="worker-stat worker-pr-wait-hint">
      PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
      꺼짐)
    </div>`}function Re(u){let h=u.queue.auto_merge===!0;if(u.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${h?" is-active":""}"
        title=${h?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${h?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(h)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let P=new Set(u.auto_excluded),Q=u.pr_wait.filter(ie=>ie.merge_action&&ie.merge_enabled&&!P.has(ie.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${Q>0?` ${Q}`:""}
    </button>`}function Qe(u){let h=Ut({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Y(),controls:B(u)});return ee?c`<div class="worker-lanes worker-lanes--mobile">
        ${z(u)}
        ${Ut({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:ye(u),collapsible:!0,collapsed:D.queue,preview:sl(u.waiting)})}
        ${h}
        ${Ut({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${w()} \uC644\uB8CC \uC5C6\uC74C`,controls:se(),collapsible:!0,collapsed:D.done,preview:Array.isArray(u.token_total)?u.token_total.map(P=>P.label).join(" \xB7 "):u.token_total||sl(u.done)})}
      </div>`:c`<div class="worker-lanes">
      ${h}
      ${Ut({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:ye(u)})}
      ${Ut({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(P=>!P.paused&&P.failed!==!0),body:Ys(u.running,Date.now(),Ee)})}
      ${Ut({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Ut({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${w()} ${u.done.length}`,items:u.done,empty:`${w()} \uC644\uB8CC \uC5C6\uC74C`,controls:se()})}
    </div>`}function Je(u){D={...D,[u]:!D[u]},$p(D),De()}function De(){let u=R();qe(y(u),N),qe(Qe(u),$e)}function ze(){let u=document.querySelector(".app-header");if(!u)return;let h=()=>{let P=Math.round(u.getBoundingClientRect().height);M.style.setProperty("--worker-ribbon-top",`${P}px`)};if(h(),typeof ResizeObserver=="function"){let P=new ResizeObserver(h);P.observe(u),S.push(()=>P.disconnect())}else window.addEventListener("resize",h),S.push(()=>window.removeEventListener("resize",h))}function Mt(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(kp);ee=!!u.matches;let h=P=>{let Q=!!(P&&typeof P.matches=="boolean"?P.matches:u.matches);Q!==ee&&(ee=Q,De())};typeof u.addEventListener=="function"?(u.addEventListener("change",h),S.push(()=>u.removeEventListener("change",h))):typeof u.addListener=="function"&&(u.addListener(h),S.push(()=>u.removeListener(h)))}function _t(u){let h=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!h)return;let P=h.dataset.beadId||"",Q=h.dataset.lane||"";g={bead_id:P,from_lane:Q};try{u.dataTransfer?.setData("text/plain",P),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function lt(u){let h=u.target?.closest?.(".worker-pane");if(!h)return;let P=h.dataset.lane||"";P!=="candidate"&&P!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),h.classList.add("worker-pane--drag-over"))}function st(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function bt(u,h){let P=A.find(K=>K.id===u);if(!P)return;let Q=A.filter(K=>K.id!==u),ie=Q.length;if(h){let K=h.dataset.beadId;if(K===u)return;let Ce=Q.findIndex(Ke=>Ke.id===K);Ce>=0&&(ie=Ce)}let ke=Q.slice();ke.splice(ie,0,P),f.applyReorder(u,ke,ie)}function Ye(u){let h=u.target?.closest?.(".worker-pane");if(!h)return;u.preventDefault(),h.classList.remove("worker-pane--drag-over");let P=h.dataset.lane||"",Q=g?.bead_id||u.dataTransfer?.getData("text/plain")||"",ie=g?.from_lane||"";if(g=null,!Q)return;let ke=u.target?.closest?.(".worker-mini, .worker-card"),K=Array.from(h.querySelectorAll(".worker-mini, .worker-card")),Ce=K.length;if(ke){let Ke=K.indexOf(ke);Ke>=0&&(Ce=Ke)}if(h.classList.contains("worker-pane--collapsed")&&(Ce=ve()),P==="candidate"){if(ie==="candidate"){bt(Q,ke);return}ie==="queue"&&te(Q);return}P==="queue"&&(ie==="queue"?pe(Q,Ce):Oe(Q,Ce))}function ot(u){x=u,fp(u),De()}function et(u){T=u==="board"||u==="created"||u==="spec"?u:Yn,bp(T),De()}function tt(u){q=Wt(u)?u:Tt,yp(q),De()}function it(u){let h=u.target?.closest?.(".worker-filter__blocked");if(h){ot({...x,show_blocked:h.checked});return}let P=u.target?.closest?.(".worker-done-range");if(P){tt(P.value);return}let Q=u.target?.closest?.(".worker-sort");if(Q){et(Q.value||Yn);return}let ie=u.target?.closest?.(".worker-pr-wait-hold");if(ie){j(ie.checked);return}let ke=u.target?.closest?.(".worker-slots__input");if(!ke)return;let K=Number.parseInt(ke.value,10);if(!Number.isFinite(K)){De();return}O(K).then(De)}function F(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function G(u){let h=Me(),P=h.attempts?h.attempts[u]:null;Ee=u,le.hidden=!1,je.open({attempt_id:u,meta:F(P)}),De()}function de(){if(!Ee)return;let u=Me(),h=u.attempts?u.attempts[Ee]:null;if(h){je.updateMeta(F(h));return}je.close()}function fe(u){let h=u.target;if(h?.closest?.("#worker-exec-defaults-dialog"))return;if(h?.closest?.(".worker-exec-defaults-btn")){Pe.open();return}let P=h?.closest?.(".worker-banner__resume");if(P){let we=P.dataset.attemptId;we&&Se(we);return}let Q=h?.closest?.(".worker-banner__discard");if(Q){let we=Q.dataset.confirmation==="merged"?"merged":"unmerged";xe(Q.dataset.beadId||"",Q.dataset.attemptId||null,we,Q.dataset.operationId||null);return}let ie=h?.closest?.(".worker-banner__dismiss");if(ie){let we=ie.dataset.attemptId;we&&_e(we);return}if(h?.closest?.(".worker-play")){Ae(!Me().auto_advance);return}let ke=h?.closest?.(".worker-merge-all");if(ke){ke.classList.contains("worker-merge-all--stop")?Me().auto_merge===!0?L(!1):he():L(!0);return}let K=h?.closest?.(".worker-pane__hd--toggle");if(K){let we=K.dataset.lane;(we==="queue"||we==="done")&&Je(we);return}let Ce=h?.closest?.(".worker-card__place");if(Ce){let we=Ce.dataset.beadId;we&&!Ce.disabled&&Oe(we,ve());return}let Ke=h?.closest?.(".worker-filter__chip");if(Ke){let we=Ke.dataset.spec;(we==="all"||we==="with"||we==="without")&&ot({...x,spec:we});return}let mt=h?.closest?.(".worker-mini__merge");if(mt){U(mt.dataset.beadId||"");return}let gt=h?.closest?.(".worker-mini__merge-cancel");if(gt){ae(gt.dataset.beadId||"");return}let ut=h?.closest?.(".worker-mini__discard");if(ut){xe(ut.dataset.beadId||"",ut.dataset.attemptId||null,ut.dataset.discardMode==="merged"?"merged":"unmerged",ut.dataset.operationId||null);return}let Xe=h?.closest?.(".worker-mini__revise-fix");if(Xe){We("worker-revise-fix",Xe.dataset.beadId||"");return}let pt=h?.closest?.(".worker-mini__revise-approve");if(pt){We("worker-revise-approve",pt.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;if(h?.closest?.(".rtile__discard")){let we=h?.closest?.(".rtile"),Be=we?.dataset?.beadId,at=we?.dataset?.attemptId;Be&&xe(Be,at||null,"unmerged",h?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(h?.closest?.(".rtile__dismiss")){let Be=h?.closest?.(".rtile")?.dataset?.attemptId;Be&&_e(Be);return}if(h?.closest?.(".rtile__pause")){let Be=h?.closest?.(".rtile")?.dataset?.attemptId;Be&&Z(Be);return}if(h?.closest?.(".rtile__resume")){let Be=h?.closest?.(".rtile")?.dataset?.attemptId;Be&&Se(Be);return}if(h?.closest?.(".rtile__session")){let Be=h?.closest?.(".rtile")?.dataset?.attemptId;Be&&G(Be);return}if(h?.closest?.(".worker-drawer-overlay__backdrop")){je.close();return}if(h?.closest?.(".worker-drawer-host"))return;let Te=h?.closest?.(".rtile");if(Te){if(h?.closest?.(".rtile__id")){let Be=Te.dataset.beadId;Be&&mr(Be).then(at=>{at?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let we=Te.dataset.beadId;we&&l&&l(we);return}let ct=h?.closest?.(".worker-mini, .worker-card");if(ct){let we=ct.dataset.beadId;if(h?.closest?.(".worker-mini__id, .worker-card__id")){we&&mr(we).then(Be=>{Be?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}we&&l&&l(we)}}return e.addEventListener("dragstart",_t),e.addEventListener("dragover",lt),e.addEventListener("dragleave",st),e.addEventListener("drop",Ye),e.addEventListener("click",fe),e.addEventListener("change",it),Mt(),ze(),p&&S.push(p.subscribe(De)),s&&S.push(s.subscribe(()=>{De(),de()})),De(),{load(){De()},openExecDefaults(){Pe.open()},destroy(){for(let u of S.splice(0))try{u()}catch{}e.removeEventListener("dragstart",_t),e.removeEventListener("dragover",lt),e.removeEventListener("dragleave",st),e.removeEventListener("drop",Ye),e.removeEventListener("click",fe),e.removeEventListener("change",it);try{je.destroy()}catch{}le.hidden=!0;try{Pe.destroy()}catch{}qe(c``,e)}}}function ro(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function dl(e,t,r,n=async()=>{},s=async()=>{}){let o=Ze("views:workspace-picker"),a=null,i=!1,l=!1,d=!1;async function p(S){let N=S.target.value,Le=t.getState().workspace?.current?.path||"";if(N&&N!==Le){o("switching workspace to %s",N),i=!0,E();try{await r(N)}catch(ce){o("workspace switch failed: %o",ce)}finally{i=!1,E()}}}async function f(){let S=t.getState(),M=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!M||l)){o("git-pulling workspace %s",M),l=!0,E();try{await n(M)}catch(N){o("workspace git pull failed: %o",N)}finally{l=!1,E()}}}function g(S){let M=S.target;M&&e.contains(M)||T()}function A(S){S.key==="Escape"&&T()}function x(){d||(d=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",A),E())}function T(){d&&(d=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",A),E())}function q(){d?T():x()}async function w(S){let M=S.target,N=M.value,le=M.checked;o("toggling visibility %s \u2192 %s",N,String(le));try{await s(N,le)}catch(Le){o("workspace visibility toggle failed: %o",Le)}}function D(S){return S?c`
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
    `:c``}function ee(S,M){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${q}
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
                ${S.map(N=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${N.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${N.path}"
                        .checked=${!M.has(N.path)}
                        @change=${w}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ro(N.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let S=t.getState(),M=S.workspace?.current,N=S.workspace?.available||[],le=new Set(S.workspace?.hidden||[]),Le=M?.path||N[0]?.path||"";if(N.length===0)return c``;let ce=N.filter($e=>!le.has($e.path)||$e.path===Le);if(ce.length<=1){let $e=ce[0]||N[0],Ee=ro($e.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${$e.path}"
            >${Ee}</span
          >
          ${ee(N,le)}
          ${D(Le)}
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
          ${ce.map($e=>c`
              <option
                value="${$e.path}"
                ?selected=${$e.path===Le}
                title="${$e.path}"
              >
                ${ro($e.path)}
              </option>
            `)}
        </select>
        ${ee(N,le)}
        ${D(Le)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){qe(I(),e)}return E(),a=t.subscribe(()=>E()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",A),qe(c``,e)}}}var ul=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function no(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function pl(e,t,r=no()){return{id:r,type:e,payload:t}}function fl(e={}){let t=Ze("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,d=new Map,p=[],f=new Map,g=new Set;function A(I){for(let E of Array.from(g))try{E(I)}catch{}}function x(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),E=(r.jitterRatio||0)*I,S=Math.max(0,Math.round(I+(Math.random()*2-1)*E));t("ws retry in %d ms (attempt %d)",S,a+1),i=setTimeout(()=>{i=null,ee()},S)}function T(I){try{s?.send(JSON.stringify(I))}catch(E){t("ws send failed",E)}}function q(){for(o="open",t("ws open"),A(o),a=0;p.length;){let I=p.shift();I&&T(I)}}function w(I){let E;try{E=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){t("ws received invalid envelope");return}if(d.has(E.id)){let M=d.get(E.id);d.delete(E.id),E.ok?M?.resolve(E.payload):M?.reject(E.error||new Error("ws error"));return}let S=f.get(E.type);if(S&&S.size>0)for(let M of Array.from(S))try{M(E.payload)}catch(N){t("ws event handler error",N)}else t("ws received unhandled message type: %s",E.type)}function D(){o="closed",t("ws closed"),A(o);for(let[I,E]of d.entries())E.reject(new Error("ws disconnected")),d.delete(I);a+=1,x()}function ee(){if(!l)return;let I=n();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",A(o),s.addEventListener("open",q),s.addEventListener("message",w),s.addEventListener("error",()=>{}),s.addEventListener("close",D)}catch(E){t("ws connect failed %o",E),x()}}return ee(),{send(I,E){if(!ul.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let S=no(),M=pl(I,E,S);return t("send %s id=%s",I,S),new Promise((N,le)=>{d.set(S,{resolve:N,reject:le,type:I}),s&&s.readyState===s.OPEN?T(M):(t("queue %s id=%s (state=%s)",I,S,o),p.push(M))})},on(I,E){f.has(I)||f.set(I,new Set);let S=f.get(I);return S?.add(E),()=>{S?.delete(E)}},onConnection(I){return g.add(I),()=>{g.delete(I)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,ee()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Np(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Fp(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var so=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],_l=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],ml=Gi,gl="worker:queue",hl="ui:order",bl="ui:display-policy",vl="exec:presets",lr="tab:board:closed",yl="beads-ui.board.closed-range";function qp(e){let t=Ze("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;qe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&tl(s),o&&a&&i&&l){let be=function(_,v){let J="Request failed",ne="";if(_&&typeof _=="object"){let m=_;if(typeof m.message=="string"&&m.message.length>0&&(J=m.message),typeof m.details=="string")ne=m.details;else if(m.details&&typeof m.details=="object")try{ne=JSON.stringify(m.details,null,2)}catch{ne=""}}else typeof _=="string"&&_.length>0&&(J=_);let X=v&&v.length>0?`Failed to load ${v}`:"Request failed";Me.open(X,J,ne)},R=function(_){return`${Te.getState().workspace.current?.path||""}\0${_}`},y=function(){L&&(L().catch(()=>{}),L=null),ae=null,he=null},B=function(_){xe=_;let v=()=>{xe!==_||Te.getState().selected_id!==_||(xe=null,z(_))};if(!O){Ae.then(v);return}v()},Re=function(_,v,J,ne,X){return J!==ye[v]?(X().catch(()=>{}),!1):(_.set(ne,X),!0)},Qe=function(){let _=Te.getState();ze(_.view==="board"),bt(_.view==="worker"),it(_.view==="monitor"),ot(_.view==="board"||_.view==="worker"||!!_.selected_id)},De=function(){let _=$r(Je);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},ze=function(_){if(_)for(let[v,J]of so){if(Y.has(v)||se.has(v))continue;let ne=v===lr?De():{type:J};try{pe.register(v,ne)}catch(C){t("register %s store failed: %o",v,C)}se.add(v);let X=ye.board,m=!1;Oe.subscribeList(v,ne).then(C=>{m=!Re(Y,"board",X,v,C)}).catch(C=>{t("subscribe %s failed: %o",v,C),be(C,"board")}).finally(()=>{se.delete(v),m&&Qe()})}else _t()},_t=function(){ye.board+=1;for(let[_]of so){let v=Y.get(_);v&&(v().catch(()=>{}),Y.delete(_));try{pe.unregister(_)}catch(J){t("unregister %s failed: %o",_,J)}}},bt=function(_){if(!_){Ye();return}for(let[v,J]of _l){if(lt.has(v)||se.has(v))continue;try{pe.register(v,{type:J})}catch(m){t("register %s store failed: %o",v,m)}se.add(v);let ne=ye.worker,X=!1;Oe.subscribeList(v,{type:J}).then(m=>{X=!Re(lt,"worker",ne,v,m)}).catch(m=>{t("subscribe %s failed: %o",v,m),be(m,"worker")}).finally(()=>{se.delete(v),X&&Qe()})}},Ye=function(){ye.worker+=1;for(let[_]of _l){let v=lt.get(_);v&&(v().catch(()=>{}),lt.delete(_));try{pe.unregister(_)}catch(J){t("unregister %s failed: %o",_,J)}}},ot=function(_){if(!_){et();return}st||(ve("subscribe-worker-queue",{id:gl}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),st=()=>ve("unsubscribe-worker-queue",{id:gl}))},et=function(){st&&(st().catch(()=>{}),st=null)},it=function(_){if(!_){F();return}tt||(ve("subscribe-monitor-pipeline",{id:ml}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),tt=()=>ve("unsubscribe-monitor-pipeline",{id:ml}))},F=function(){tt&&(tt().catch(()=>{}),tt=null)},de=function(){G||(ve("subscribe-ui-order",{id:hl}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),G=()=>ve("unsubscribe-ui-order",{id:hl}))},fe=function(){G&&(G().catch(()=>{}),G=null),Se.clear()},h=function(){u||(ve("subscribe-display-policy",{id:bl}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),u=()=>ve("unsubscribe-display-policy",{id:bl}))},P=function(){u&&(u().catch(()=>{}),u=null),_e.clear()},ie=function(){Q||(ve("subscribe-exec-presets",{id:vl}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),Q=()=>ve("unsubscribe-exec-presets",{id:vl}))},gt=function(_){if(!_)return"Unknown";let v=_.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var d=be,p=R,f=y,g=B,A=Re,x=Qe,T=De,q=ze,w=_t,D=bt,ee=Ye,I=ot,E=et,S=it,M=F,N=de,le=fe,Le=h,ce=P,$e=ie,Ee=gt;let je=document.getElementById("header-loading"),Pe=ta(je),Me=$i(e),oe=fl(),ve=Pe.wrapSend((_,v)=>oe.send(_,v)),Oe=Vo(ve),pe=Ko(),te=Xo(),Z=Do(),Se=Zo(),_e=Io(),ge=Lo(),U=Oo();oe.on("exec-presets-snapshot",_=>{let v=_;v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&ge.set({revision:v.revision,presets:v.presets})}),oe.on("monitor-pipeline-snapshot",_=>{let v=_;if(!(!v||!Array.isArray(v.workspaces)))try{Z.set(v.workspaces,v.workspaces_state)}catch{}}),oe.on("ui-order-snapshot",_=>{let v=_;if(v&&typeof v.revision=="number")try{Se.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),oe.on("display-policy-snapshot",_=>{let v=_;if(v&&v.policy&&typeof v.policy=="object")try{_e.set(v.policy)}catch{}}),oe.on("session-log-snapshot",_=>{let v=_;if(v&&typeof v.attempt_id=="string")try{U.set(v.attempt_id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),oe.on("session-log-append",_=>{let v=_;if(v&&typeof v.attempt_id=="string")try{U.append(v.attempt_id,v.event)}catch{}}),oe.on("snapshot",_=>{let v=_,J=v&&typeof v.id=="string"?v.id:"",ne=J?pe.getStore(J):null;if(ne&&v&&v.type==="snapshot")try{ne.applyPush(v)}catch{}}),oe.on("upsert",_=>{let v=_,J=v&&typeof v.id=="string"?v.id:"",ne=J?pe.getStore(J):null;if(ne&&v&&v.type==="upsert")try{ne.applyPush(v)}catch{}}),oe.on("delete",_=>{let v=_,J=v&&typeof v.id=="string"?v.id:"",ne=J?pe.getStore(J):null;if(ne&&v&&v.type==="delete")try{ne.applyPush(v)}catch{}});let L=null,ae=null,he=null,xe=null,We=()=>{},Ae=new Promise(_=>{We=()=>_(void 0)}),O=!1,j=!1;async function z(_){let v=R(_);if(v===ae||v===he)return;he=v;let J=`detail:${_}`,ne={type:"issue-detail",params:{id:_}};try{pe.register(J,ne)}catch(X){t("register detail store failed: %o",X)}try{let X=await Oe.subscribeList(J,ne);if(Te.getState().selected_id!==_||R(_)!==v){await X().catch(()=>{});return}L&&await L().catch(()=>{}),L=X,ae=v}catch(X){t("detail subscribe failed: %o",X),be(X,"issue details")}finally{he===v&&(he=null)}}let Y=new Map,se=new Set,ye={board:0,worker:0},Je=Tt;try{let _=window.localStorage.getItem(yl);Wt(_)&&(Je=_)}catch{}async function Mt(_){if(!Wt(_)||_===Je)return;Je=_;try{window.localStorage.setItem(yl,_)}catch{}let v=Y.get(lr);if(!v)return;Y.delete(lr),await v().catch(()=>{});let J=De();try{pe.register(lr,J)}catch(ne){t("register %s store failed: %o",lr,ne)}try{let ne=await Oe.subscribeList(lr,J);Y.set(lr,ne)}catch(ne){t("re-subscribe %s failed: %o",lr,ne),be(ne,"board")}}let lt=new Map,st=null,tt=null,G=null,u=null,Q=null;async function ke(){u=null,_e.clear(),Q=null,ge.clear(),st=null,tt=null,Y.clear(),lt.clear(),ye.board+=1,ye.worker+=1,ie();let _=Te.getState().workspace.current?.path;if(_)try{await oe.send("set-workspace",{path:_})}catch(J){t("workspace restore after reconnect failed: %o",J);return}h();let v=Te.getState();ze(v.view==="board"),bt(v.view==="worker"),it(v.view==="monitor"),ot(v.view==="board"||v.view==="worker"||!!v.selected_id)}async function K(){t("clearing all subscriptions for workspace switch"),_t(),Ye(),et(),te.clear(),fe(),de(),P(),h(),y();let _=Te.getState();if(_.selected_id)try{pe.unregister(`detail:${_.selected_id}`)}catch{}let v=Te.getState();ze(v.view==="board"),bt(v.view==="worker"),it(v.view==="monitor"),ot(v.view==="board"||v.view==="worker"||!!v.selected_id),v.selected_id&&B(v.selected_id)}async function Ce(_){t("requesting workspace switch to %s",_),j=!0;try{let v=await oe.send("set-workspace",{path:_});t("workspace switch result: %o",v),v&&v.workspace&&(Te.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),v.changed&&(await K(),re("Switched to "+gt(_),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),re("Failed to switch workspace","error",3e3),v}finally{j=!1}}async function Ke(_){t("requesting workspace git pull for %s",_);try{let v=await oe.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let J=v?.status;if(J==="up_to_date"){re("Already up to date","success",2e3);return}if(J==="stash_pop_conflict"){re("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}re("Git pulled "+gt(_),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let J=v?.code,ne=v?.message;if(J==="rebase_conflict"){re("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(J==="rebase_conflict_abort_failed"){re("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(J==="busy"){re("Git pull skipped: another operation is running","warning",3e3);return}let X=ne?`: ${ne}`:"";throw re(`Git pull failed${X}`,"error",3e3),v}}async function mt(_,v){t("setting workspace visibility %s \u2192 %s",_,String(v));try{await oe.send("set-workspace-visibility",{path:_,visible:v}),await ut()}catch(J){t("workspace visibility update failed: %o",J),re("Failed to update project visibility","error",3e3)}}async function ut(){try{let _=await oe.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let v=_.workspaces.map(m=>({path:m.path,database:m.database,pid:m.pid,version:m.version})),J=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,ne=Array.isArray(_.hidden)?_.hidden.filter(m=>typeof m=="string"):[];Te.setState({workspace:{current:J,available:v,hidden:ne}});let X=window.localStorage.getItem("beads-ui.workspace");X&&(!v.some(C=>C.path===X)||ne.includes(X)?window.localStorage.removeItem("beads-ui.workspace"):J&&X!==J.path&&(t("restoring saved workspace preference: %s",X),await Ce(X)))}}catch(_){t("failed to load workspaces: %o",_)}}oe.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(Te.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),ut(),K())});let Xe=!1;if(typeof oe.onConnection=="function"){let _=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(Xe=!0,re("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&Xe&&(Xe=!1,re("Reconnected","success",2200),Fp(Te,(J,ne)=>{t(`${J}: %o`,ne)}),ke())};oe.onConnection(_)}let pt="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(pt=_)}catch(_){t("view parse error: %o",_)}let Te=ea({config:Np(),view:pt});oe.on("worker-queue-snapshot",_=>{let v=_;if(!v||!v.queue)return;let J=Te.getState().workspace.current?.path;if(typeof J=="string"&&J.length>0&&v.root_dir!==J){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{te.set(v.queue)}catch{}});let ct=Qo(Te);ct.start();let we=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),Be=async(_,v)=>{try{return await ve(_,v)}catch(J){if(we.has(_))throw J;return[]}};n&&Vi(n,Te,ct);let at=document.getElementById("workspace-picker");at&&dl(at,Te,Ce,Ke,mt);let Nt=Qi(e,(_,v)=>ve(_,v));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>Nt.open())}catch{}let Qt=wi(e,{policyStore:_e,transport:(_,v)=>ve(_,v),labelOptions:()=>{let _=new Set;for(let[v]of so)for(let J of pe.snapshotFor(v)||[]){let ne=J.labels;if(Array.isArray(ne))for(let X of ne)typeof X=="string"&&X.length>0&&_.add(X)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>Qt.open())}catch{}let jt=da(o,{gotoIssue:_=>ct.gotoIssue(_),issueStores:pe,transport:Be,workerQueueStore:te,uiOrderStore:Se,displayPolicyStore:_e,closedRange:Je,onClosedRangeChange:_=>{Mt(_)},onNewIssue:()=>Nt.open()}),Ft=to(a,{transport:Be,issueStores:pe,queueStore:te,execPresetStore:ge,sessionLogStore:U,uiOrderStore:Se,gotoIssue:_=>Te.setState({selected_id:_}),getWorkspacePath:()=>Te.getState().workspace.current?.path}),Jt=Yi(i,{transport:Be,pipelineStore:Z,execPresetStore:ge,gotoIssue:_=>ct.gotoIssue(_),getWorkspacePath:()=>Te.getState().workspace.current?.path,switchWorkspace:_=>Ce(_)}),ue=yi(l,{issueStores:pe,transport:Be,queueStore:te,execPresetStore:ge,sessionLogStore:U,getWorkspacePath:()=>Te.getState().workspace.current?.path,onNavigate:_=>{Te.getState().view==="worker"?Te.setState({selected_id:_}):ct.gotoIssue(_)},onClose:()=>{let _=Te.getState();Te.setState({selected_id:null});try{ct.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{Te.setState({selected_id:null}),ct.gotoView("worker"),Ft.openExecDefaults()}}),b=Te.getState().selected_id;b&&(l.hidden=!1,ue.load(b),B(b)),Te.subscribe(_=>{let v=_.selected_id;v?(l.hidden=!1,ue.load(v),j||B(v)):(ue.clear(),l.hidden=!0,y())});let H=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",i.hidden=_.view!=="monitor",ze(_.view==="board"),bt(_.view==="worker"),it(_.view==="monitor"),ot(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&jt.load(),_.view==="worker"&&Ft.load(),_.view==="monitor"?Jt.load():Jt.pause(),window.localStorage.setItem("beads-ui.view",_.view)};Te.subscribe(H),H(Te.getState()),de(),h(),ie(),ut().finally(()=>{O=!0,We()}),window.addEventListener("keydown",_=>{let v=_.ctrlKey||_.metaKey,J=String(_.key||"").toLowerCase(),ne=_.target,X=ne&&ne.tagName?String(ne.tagName).toLowerCase():"",m=X==="input"||X==="textarea"||X==="select"||ne&&typeof ne.isContentEditable=="boolean"&&ne.isContentEditable;v&&J==="n"&&(m||(_.preventDefault(),Nt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&qp(t)});export{qp as bootstrap,Np as readBootstrapConfig,Fp as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
