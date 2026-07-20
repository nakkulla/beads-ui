var Eo=Object.create;var Sr=Object.defineProperty;var Co=Object.getOwnPropertyDescriptor;var Ro=Object.getOwnPropertyNames;var Io=Object.getPrototypeOf,Lo=Object.prototype.hasOwnProperty;var Do=(t,e,r)=>e in t?Sr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Ar=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Oo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ro(e))!Lo.call(t,s)&&s!==r&&Sr(t,s,{get:()=>e[s],enumerable:!(n=Co(e,s))||n.enumerable});return t};var Mo=(t,e,r)=>(r=t!=null?Eo(Io(t)):{},Oo(e||!t||!t.__esModule?Sr(r,"default",{value:t,enumerable:!0}):r,t));var ae=(t,e,r)=>Do(t,typeof e!="symbol"?e+"":e,r);var Hn=Ar((ul,Un)=>{var St=1e3,At=St*60,Tt=At*60,gt=Tt*24,zo=gt*7,Uo=gt*365.25;Un.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Ho(t);if(r==="number"&&isFinite(t))return e.long?Go(t):qo(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Ho(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Uo;case"weeks":case"week":case"w":return r*zo;case"days":case"day":case"d":return r*gt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Tt;case"minutes":case"minute":case"mins":case"min":case"m":return r*At;case"seconds":case"second":case"secs":case"sec":case"s":return r*St;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function qo(t){var e=Math.abs(t);return e>=gt?Math.round(t/gt)+"d":e>=Tt?Math.round(t/Tt)+"h":e>=At?Math.round(t/At)+"m":e>=St?Math.round(t/St)+"s":t+"ms"}function Go(t){var e=Math.abs(t);return e>=gt?nr(t,e,gt,"day"):e>=Tt?nr(t,e,Tt,"hour"):e>=At?nr(t,e,At,"minute"):e>=St?nr(t,e,St,"second"):t+" ms"}function nr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Gn=Ar((pl,qn)=>{function Wo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Hn(),r.destroy=d,Object.keys(t).forEach(p=>{r[p]=t[p]}),r.names=[],r.skips=[],r.formatters={};function e(p){let h=0;for(let y=0;y<p.length;y++)h=(h<<5)-h+p.charCodeAt(y),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(p){let h,y=null,w,k;function S(...L){if(!S.enabled)return;let M=S,F=Number(new Date),G=F-(h||F);M.diff=G,M.prev=h,M.curr=F,h=F,L[0]=r.coerce(L[0]),typeof L[0]!="string"&&L.unshift("%O");let E=0;L[0]=L[0].replace(/%([a-zA-Z%])/g,(_,C)=>{if(_==="%%")return"%";E++;let N=r.formatters[C];if(typeof N=="function"){let H=L[E];_=N.call(M,H),L.splice(E,1),E--}return _}),r.formatArgs.call(M,L),(M.log||r.log).apply(M,L)}return S.namespace=p,S.useColors=r.useColors(),S.color=r.selectColor(p),S.extend=n,S.destroy=r.destroy,Object.defineProperty(S,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(w!==r.namespaces&&(w=r.namespaces,k=r.enabled(p)),k),set:L=>{y=L}}),typeof r.init=="function"&&r.init(S),S}function n(p,h){let y=r(this.namespace+(typeof h>"u"?":":h)+p);return y.log=this.log,y}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let h=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of h)y[0]==="-"?r.skips.push(y.slice(1)):r.names.push(y)}function o(p,h){let y=0,w=0,k=-1,S=0;for(;y<p.length;)if(w<h.length&&(h[w]===p[y]||h[w]==="*"))h[w]==="*"?(k=w,S=y,w++):(y++,w++);else if(k!==-1)w=k+1,S++,y=S;else return!1;for(;w<h.length&&h[w]==="*";)w++;return w===h.length}function i(){let p=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),p}function l(p){for(let h of r.skips)if(o(p,h))return!1;for(let h of r.names)if(o(p,h))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}qn.exports=Wo});var Wn=Ar((He,sr)=>{He.formatArgs=Yo;He.save=Vo;He.load=Zo;He.useColors=jo;He.storage=Ko();He.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();He.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function jo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Yo(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+sr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}He.log=console.debug||console.log||(()=>{});function Vo(t){try{t?He.storage.setItem("debug",t):He.storage.removeItem("debug")}catch{}}function Zo(){let t;try{t=He.storage.getItem("debug")||He.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Ko(){try{return localStorage}catch{}}sr.exports=Gn()(He);var{formatters:Xo}=sr.exports;Xo.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Mt=globalThis,tr=Mt.trustedTypes,Tn=tr?tr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Dn="$lit$",at=`lit$${Math.random().toFixed(9).slice(2)}$`,On="?"+at,No=`<${On}>`,ft=document,Nt=()=>ft.createComment(""),Pt=t=>t===null||typeof t!="object"&&typeof t!="function",Dr=Array.isArray,Po=t=>Dr(t)||typeof t?.[Symbol.iterator]=="function",Tr=`[ 	
\f\r]`,Ot=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,En=/-->/g,Cn=/>/g,ut=RegExp(`>|${Tr}(?:([^\\s"'>=/]+)(${Tr}*=${Tr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Rn=/'/g,In=/"/g,Mn=/^(?:script|style|textarea|title)$/i,Or=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),b=Or(1),ol=Or(2),il=Or(3),ht=Symbol.for("lit-noChange"),we=Symbol.for("lit-nothing"),Ln=new WeakMap,pt=ft.createTreeWalker(ft,129);function Nn(t,e){if(!Dr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Tn!==void 0?Tn.createHTML(e):e}var Fo=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Ot;for(let l=0;l<r;l++){let a=t[l],d,p,h=-1,y=0;for(;y<a.length&&(i.lastIndex=y,p=i.exec(a),p!==null);)y=i.lastIndex,i===Ot?p[1]==="!--"?i=En:p[1]!==void 0?i=Cn:p[2]!==void 0?(Mn.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=ut):p[3]!==void 0&&(i=ut):i===ut?p[0]===">"?(i=s??Ot,h=-1):p[1]===void 0?h=-2:(h=i.lastIndex-p[2].length,d=p[1],i=p[3]===void 0?ut:p[3]==='"'?In:Rn):i===In||i===Rn?i=ut:i===En||i===Cn?i=Ot:(i=ut,s=void 0);let w=i===ut&&t[l+1].startsWith("/>")?" ":"";o+=i===Ot?a+No:h>=0?(n.push(d),a.slice(0,h)+Dn+a.slice(h)+at+w):a+at+(h===-2?l:w)}return[Nn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Ft=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[d,p]=Fo(e,r);if(this.el=t.createElement(d,n),pt.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=pt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Dn)){let y=p[i++],w=s.getAttribute(h).split(at),k=/([.?@])?(.*)/.exec(y);a.push({type:1,index:o,name:k[2],strings:w,ctor:k[1]==="."?Cr:k[1]==="?"?Rr:k[1]==="@"?Ir:$t}),s.removeAttribute(h)}else h.startsWith(at)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Mn.test(s.tagName)){let h=s.textContent.split(at),y=h.length-1;if(y>0){s.textContent=tr?tr.emptyScript:"";for(let w=0;w<y;w++)s.append(h[w],Nt()),pt.nextNode(),a.push({type:2,index:++o});s.append(h[y],Nt())}}}else if(s.nodeType===8)if(s.data===On)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(at,h+1))!==-1;)a.push({type:7,index:o}),h+=at.length-1}o++}}static createElement(e,r){let n=ft.createElement("template");return n.innerHTML=e,n}};function xt(t,e,r=t,n){if(e===ht)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Pt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=xt(t,s._$AS(t,e.values),s,n)),e}var Er=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??ft).importNode(r,!0);pt.currentNode=s;let o=pt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new Bt(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Lr(o,this,e)),this._$AV.push(d),a=n[++l]}i!==a?.index&&(o=pt.nextNode(),i++)}return pt.currentNode=ft,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Bt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=we,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=xt(this,e,r),Pt(e)?e===we||e==null||e===""?(this._$AH!==we&&this._$AR(),this._$AH=we):e!==this._$AH&&e!==ht&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Po(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==we&&Pt(this._$AH)?this._$AA.nextSibling.data=e:this.T(ft.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Ft.createElement(Nn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Er(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=Ln.get(e.strings);return r===void 0&&Ln.set(e.strings,r=new Ft(e)),r}k(e){Dr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Nt()),this.O(Nt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},$t=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=we,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=we}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=xt(this,e,r,0),i=!Pt(e)||e!==this._$AH&&e!==ht,i&&(this._$AH=e);else{let l=e,a,d;for(e=o[0],a=0;a<o.length-1;a++)d=xt(this,l[n+a],r,a),d===ht&&(d=this._$AH[a]),i||(i=!Pt(d)||d!==this._$AH[a]),d===we?e=we:e!==we&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}i&&!s&&this.j(e)}j(e){e===we?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Cr=class extends $t{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===we?void 0:e}},Rr=class extends $t{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==we)}},Ir=class extends $t{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=xt(this,e,r,0)??we)===ht)return;let n=this._$AH,s=e===we&&n!==we||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==we&&(n===we||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Lr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){xt(this,e)}};var Bo=Mt.litHtmlPolyfillSupport;Bo?.(Ft,Bt),(Mt.litHtmlVersions??(Mt.litHtmlVersions=[])).push("3.3.1");var ue=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Bt(e.insertBefore(Nt(),o),o,void 0,r??{})}return s._$AI(t),s};var rr="today",Pn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Mr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Fn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Bn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function zn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var jn=Mo(Wn(),1);function ye(t){return(0,jn.default)(`beads-ui:${t}`)}function Ze(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function zt(t,e){let r=Ze(t.created_at),n=Ze(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Zn(t,e){let r=Ze(t.created_at),n=Ze(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Kn(t,e){let r=Ze(t.updated_at),n=Ze(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function Xn(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=Ze(t.created_at),o=Ze(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Qn(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var Qo=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Yn(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Vn(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=Qo.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Jn(t,e){let r=Yn(t),n=Yn(e);if(r!==n)return r<n?-1:1;let s=Vn(t),o=Vn(e);if(s!==o)return s<o?-1:1;let i=Ze(t&&t.created_at),l=Ze(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,d=e&&e.id;return a===d?0:String(a)<String(d)?-1:1}var Nr=2**20;function Et(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-Ze(t&&t.created_at)}function or(t){return(e,r)=>{let n=Et(e,t),s=Et(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Pr(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Et(l,r)-Nr};if(!l)return{rank:Et(i,r)+Nr};let a=Et(i,r),d=Et(l,r),p=(a+d)/2;return a<p&&p<d?{rank:p}:{renormalize:n.map((h,y)=>({bead_id:h.id,rank:y*Nr}))}}function Fr(t,e={}){let r=ye(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||zt;function d(){for(let y of Array.from(i))try{y()}catch{}}function p(){s=Array.from(n.values()).sort(a)}function h(y){if(l||!y||y.id!==t)return;let w=Number(y.revision)||0;if(r("apply %s rev=%d",y.type,w),!(w<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(w<=o)return;n.clear();let k=Array.isArray(y.issues)?y.issues:[];for(let S of k)S&&typeof S.id=="string"&&S.id.length>0&&n.set(S.id,S);p(),o=w,d();return}if(y.type==="upsert"){let k=y.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let S=n.get(k.id);if(!S)n.set(k.id,k);else{let L=Number.isFinite(S.updated_at)?S.updated_at:0,M=Number.isFinite(k.updated_at)?k.updated_at:0;if(L<=M){for(let F of Object.keys(S))F in k||delete S[F];for(let[F,G]of Object.entries(k))S[F]=G}}p()}o=w,d()}else if(y.type==="delete"){let k=String(y.issue_id||"");k&&(n.delete(k),p()),o=w,d()}}}return{id:t,subscribe(y){return i.add(y),()=>{i.delete(y)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(y){return n.get(y)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function ir(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function es(t){let e=ye("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let p=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],y=Array.isArray(a.removed)?a.removed:[];for(let w of Array.from(d)){let k=r.get(w);if(!k)continue;let S=k.itemsById;for(let L of p)typeof L=="string"&&L.length>0&&S.set(L,!0);for(let L of h)typeof L=="string"&&L.length>0&&S.set(L,!0);for(let L of y)typeof L=="string"&&L.length>0&&S.delete(L)}}async function o(l,a){let d=ir(a);if(e("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==d){let y=n.get(h.key);y&&(y.delete(l),y.size===0&&n.delete(h.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let y=r.get(l)||null;if(y){let w=n.get(y.key);w&&(w.delete(l),w.size===0&&n.delete(y.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,d);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let y=n.get(h.key);y&&(y.delete(l),y.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ir,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=r.get(l);return d?d.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),d={};if(!a)return d;for(let p of a.itemsById.keys())d[p]=!0;return d}}}}function ts(){let t=ye("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,d,p){let h=d?ir(d):"",y=r.get(a)||"",w=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,y),w&&y&&h&&y!==h){let k=e.get(a);if(k)try{k.dispose()}catch{}let S=s.get(a);if(S){try{S()}catch{}s.delete(a)}let L=Fr(a,p);e.set(a,L);let M=L.subscribe(()=>o());s.set(a,M)}else if(!w){let k=Fr(a,p);e.set(a,k);let S=k.subscribe(()=>o());s.set(a,S)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let d=e.get(a);d&&(d.dispose(),e.delete(a));let p=s.get(a);if(p){try{p()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let d=e.get(a);return d?d.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function rs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ns(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Br(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function Jo(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ei(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function ss(t){let e=ye("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Jo(n),i=ei(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Br(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Br(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ti=Object.freeze({workspace_config:{default_workspace:null}});function os(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:ti.workspace_config.default_workspace}}}function is(t={}){let e=ye("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:os(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?os(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function as(t){let e=ye("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let d=r>0;t.toggleAttribute("hidden",!d),t.setAttribute("aria-busy",d?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?e("done called but count was already %d",d):e("done count=%d\u2192%d",d,r),o()}function a(d){return async(h,y)=>{let w=s++,k=Date.now();n.set(w,{type:h,start_ts:k}),e("request start id=%d type=%s count=%d",w,h,r+1),i();let S=!1,L=()=>{S||(S=!0,n.delete(w),l())},M=setTimeout(()=>{S||(e("request TIMEOUT id=%d type=%s elapsed=%dms",w,h,Date.now()-k),L())},3e4);try{let F=await d(h,y),G=Date.now()-k;return e("request done id=%d type=%s elapsed=%dms",w,h,G),F}catch(F){let G=Date.now()-k;throw e("request error id=%d type=%s elapsed=%dms err=%o",w,h,G,F),F}finally{clearTimeout(M),L()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,h])=>({id:p,type:h.type,elapsed_ms:d-h.start_ts}))}}}function le(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function ar(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Qn),a;switch(l){case"created_desc":return a.sort(zt),a;case"created_asc":return a.sort(Zn),a;case"updated_desc":return a.sort(Kn),a;case"priority":return a.sort(Xn),a;case"manual":default:{let d=r();return d?a.sort(or(d)):a.sort(zt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function lr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let d of l)a[d.bead_id]=d.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let d=r.get()||{revision:0,order:{}},p=n(Pr(l,a,d.order),i);s(d,p);let h=await e("ui-order-set",{expected_revision:d.revision,entries:p});if(h&&h.conflict){let y={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(y);let w=n(Pr(l,a,y.order),i);s(y,w);let k=await e("ui-order-set",{expected_revision:y.revision,entries:w});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function cr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function zr(t,e){return!e||typeof t!="string"||t.length===0||cr(e.visible_labels).includes(t)?!0:cr(e.hidden_labels).includes(t)?!1:!cr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function ls(t,e){return cr(t).filter(r=>zr(r,e))}function mt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function Ur(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Ct(t){let e=Ur(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Hr(t,e){let r=Ur(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var ri={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},ni={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},si={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},oi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function ii(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function ai(t,e,r){let n=ri[t]||t,s=e&&e.state||"empty",o=oi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return b`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${ni[t]||t}
      </div>
    </div>
  `}function cs(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=si[r],s=t.stages,o=ii(n,s,String(e||"open"));return b`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>ai(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function li(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var ds=2;function ci(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(b`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,ds).join(", "),s=r.length-ds,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(b`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function di(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&mt(r,"route")&&s.push(b`<span class="ctl-chip ctl-chip--route">${n.route}</span>`),n.fast_track&&mt(r,"fast_track")&&s.push(b`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&mt(r,"pr")){let o=n.pr.number;s.push(b`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of ls(t.labels,r))s.push(b`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&mt(r,"from")&&s.push(b`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),mt(r,"blocked")&&s.push(...ci(t.blocked_info)),s.length===0?"":b`<div class="board-card__chips">${s}</div>`}function ui(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function pi(t){let e=Hr(t.created_at),r=Hr(t.updated_at);return!e&&!r?"":b`<span class="board-card__times">
    ${e?b`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Ct(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?b`<span class="board-card__time-sep">·</span>`:""}
    ${r?b`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Ct(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function fi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(Jn):r.children;return b`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?b`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:b`<span class="board-card__roll-none">children 없음</span>`}
        ${pi(t)}
      </div>
      ${n>0&&r.current?b`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?b`<div class="board-card__roll-list">
            ${o.map((i,l)=>b`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${ui(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function us(t,e){let r=li(t.priority);return b`
    <article
      class="board-card"
      data-issue-id=${t.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${n=>e.onCardClick(n,t.id)}
      @dragstart=${n=>e.onDragStart(n,t.id)}
      @dragend=${e.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${t.id} \uBCF5\uC0AC`}
          @click=${n=>e.onCopyId(n,t.id)}
        >
          ${t.id}
        </button>
        ${r?b`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${di(t,e)}
      ${t.workflow&&mt(e.policy||null,"stepper")?cs(t.workflow,t.status):""}
      ${fi(t,e)}
    </article>
  `}function bt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return b`
    <section class=${n?"board-column board-column--closed":"board-column"} id=${t.id}>
      <header
        class="board-column__header"
        id=${t.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${t.title}</span>
          <span class="board-column__count" aria-label=${`${r}\uAC74`}
            >${r}</span
          >
        </div>
        ${n?b`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${Pn.map(o=>b`<option
                    value=${o.value}
                    ?selected=${o.value===t.closed_range}
                  >
                    ${o.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${t.id+"-header"}
      >
        ${t.items.map(o=>us(o,e))}
      </div>
    </section>
  `}var hi=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],gi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],mi=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function bi(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return b`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${n>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${r.label_menu_open?"true":"false"}
        @click=${e.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${r.label_menu_open?b`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?b`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>b`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?b`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ps(t,e,r){return b`
    <div class="board-filter">
      <input
        class="board-filter__search"
        type="search"
        placeholder="ID·제목 검색"
        aria-label="이슈 검색"
        .value=${t.search}
        @input=${e.onSearchInput}
      />
      <select
        class="board-filter__select"
        aria-label="우선순위 필터"
        @change=${e.onPriorityChange}
      >
        ${hi.map(n=>b`<option
              value=${n.value}
              ?selected=${t.priority===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${e.onTypeChange}
      >
        ${gi.map(n=>b`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${bi(t,e,r)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${r.show_deferred?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-pressed=${r.show_deferred?"true":"false"}
        @click=${e.onDeferredToggle}
      >
        Deferred ${r.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${e.onSortChange}
      >
        ${mi.map(n=>b`<option
              value=${n.value}
              ?selected=${r.sort_mode===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <button
        type="button"
        class="board-filter__new"
        @click=${e.onNewIssue}
      >
        + 새 이슈
      </button>
    </div>
  `}var _i=200,yi={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},ki=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),fs="beads-ui.board.sort",hs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function wi(){try{let t=window.localStorage.getItem(fs);if(t&&hs.has(t))return t}catch{}return"created_desc"}function gs(t,e){let r=ye("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,d=e.onNewIssue,p=e.closedRange||rr,h=s?ar(s,i):null,y=lr({transport:o,uiOrderStore:i}),w=[],k=[],S=[],L=[],M=[],F=[],G=!1,E=0,f=wi(),_=new Map,C=new Map,N=new Map,H=new Set,W={search:"",priority:"",type:"",labels:[]},Z=!1,K=null;function Te(v){return String(v.status||"open")==="open"}function he(v){let u=W.search.trim().toLowerCase(),$=W.priority,x=W.type,R=W.labels;return v.filter(Y=>{if(u){let re=String(Y.id||"").toLowerCase(),de=String(Y.title||"").toLowerCase();if(!re.includes(u)&&!de.includes(u))return!1}if($!==""&&String(Y.priority)!==$||x!==""&&String(Y.issue_type||"")!==x)return!1;if(R.length>0){let re=Array.isArray(Y.labels)?Y.labels:[];if(!R.some(de=>re.includes(de)))return!1}return!0})}function qe(){let v=new Set;for(let u of[w,k,S,L,M,F])for(let $ of u){let x=Array.isArray($.labels)?$.labels:[];for(let R of x)typeof R=="string"&&R.length>0&&v.add(R)}return Array.from(v).sort()}function Ge(){return W.search.trim()!==""||W.priority!==""||W.type!==""||W.labels.length>0}function se(){try{if(h){let v=h.selectBoardColumn("tab:board:in-progress","in_progress",f),u=h.selectBoardColumn("tab:board:blocked","blocked",f).filter(Te),$=new Set(v.map(q=>q.id)),x=h.selectBoardColumn("tab:board:ready","ready",f).filter(q=>Te(q)&&!$.has(q.id)),R=h.selectBoardColumn("tab:board:resolved","resolved",f),Y=h.selectBoardColumn("tab:board:deferred","deferred",f),re=G?Y:[],de=h.selectBoardColumn("tab:board:closed","closed").slice(0,_i),V=[...u,...x,...v,...R,...re,...de];We(V);let ee=new Set;for(let q of V)q&&q.id&&!qr(q)&&ee.add(q.id);let me=!Ge();w=me?Rt(u,ee):u,k=me?Rt(x,ee):x,S=me?Rt(v,ee):v,L=me?Rt(R,ee):R,M=me?Rt(re,ee):re,E=Y.length,F=me?Rt(de,ee):de,_=new Map;for(let q of w)_.set(q.id,"open");for(let q of k)_.set(q.id,"open");for(let q of S)_.set(q.id,"in_progress");for(let q of L)_.set(q.id,"resolved");for(let q of M)_.set(q.id,"deferred");for(let q of F)_.set(q.id,"closed");C=new Map;for(let q of w)C.set(q.id,"blocked-col");for(let q of k)C.set(q.id,"ready-col");for(let q of S)C.set(q.id,"in-progress-col");for(let q of L)C.set(q.id,"resolved-col");for(let q of M)C.set(q.id,"deferred-col");for(let q of F)C.set(q.id,"closed-col")}ve()}catch{w=[],k=[],S=[],L=[],M=[],F=[],N=new Map,ve()}}function We(v){let u=new Map;for(let x of v)x&&x.id&&!u.has(x.id)&&u.set(x.id,x);let $=new Map;for(let x of u.values()){let R=qr(x);if(!R)continue;let Y=$.get(R);Y||(Y=[],$.set(R,Y)),Y.push({id:x.id,title:x.title,status:x.status,metadata:x.metadata,created_at:x.created_at})}N=$}function Pe(v){let u=N.get(v)||[],$=0,x=null;for(let R of u)(R.status==="resolved"||R.status==="closed")&&($+=1),!x&&R.status==="in_progress"&&(x=R);return{total:u.length,count:$,current:x,children:u}}function je(v){return!H.has(v)}function oe(v,u){v.preventDefault(),v.stopPropagation(),H.has(u)?H.delete(u):H.add(u),ve()}function A(v,u){v.preventDefault(),v.stopPropagation(),n(u)}function I(v,u){v.preventDefault(),v.stopPropagation(),n(u)}function j(v,u){K||n(u)}function P(v,u){v.preventDefault(),v.stopPropagation(),vi(u).then($=>{$&&le("\uBCF5\uC0AC\uB428","success",1200)})}function J(v,u){K=u,v.dataTransfer&&(v.dataTransfer.setData("text/plain",u),v.dataTransfer.effectAllowed="move"),v.target.classList.add("board-card--dragging")}function pe(v){v.target.classList.remove("board-card--dragging"),Je(),setTimeout(()=>{K=null},0)}function ce(v){let u=String(v.target.value||"");!u||u===p||(p=u,a&&a(u),ve())}let ie={onCardClick:j,onCopyId:P,onDragStart:J,onDragEnd:pe,onClosedRangeChange:ce,rollupFor:Pe,isExpanded:je,onRollupToggle:oe,onChildClick:A,onFromChipClick:I,get policy(){return l?l.get():null}};function fe(v){let u=v.target;u&&t.contains(u)||ke()}function Ce(v){v.key==="Escape"&&ke()}function Fe(){Z||(Z=!0,document.addEventListener("mousedown",fe),document.addEventListener("keydown",Ce),ve())}function ke(){Z&&(Z=!1,document.removeEventListener("mousedown",fe),document.removeEventListener("keydown",Ce),ve())}let Ye={onSearchInput(v){W.search=String(v.target.value||""),se()},onPriorityChange(v){W.priority=String(v.target.value||""),se()},onTypeChange(v){W.type=String(v.target.value||""),se()},onSortChange(v){let u=String(v.target.value||"");if(!(!hs.has(u)||u===f)){f=u;try{window.localStorage.setItem(fs,u)}catch{}se()}},onDeferredToggle(){G=!G,se()},onLabelMenuToggle(){Z?ke():Fe()},onLabelToggle(v){let u=W.labels.indexOf(v);u===-1?W.labels.push(v):W.labels.splice(u,1),se()},onLabelClear(){W.labels.length!==0&&(W.labels=[],se())},onNewIssue(){d&&d()}};function Se(){let v=G?"board-root board-root--deferred":"board-root";return b`
      <div class="board-view">
        ${ps(W,Ye,{sort_mode:f,show_deferred:G,deferred_count:E,label_options:qe(),label_menu_open:Z})}
        <div class=${v}>
          ${bt({title:"Blocked",id:"blocked-col",items:he(w)},ie)}
          ${bt({title:"Ready",id:"ready-col",items:he(k)},ie)}
          ${bt({title:"In progress",id:"in-progress-col",items:he(S)},ie)}
          ${bt({title:"Resolved",id:"resolved-col",items:he(L)},ie)}
          ${G?bt({title:"Deferred",id:"deferred-col",items:he(M)},ie):""}
          ${bt({title:"Closed",id:"closed-col",items:he(F),is_closed:!0,closed_range:p},ie)}
        </div>
      </div>
    `}function ve(){ue(Se(),t),D()}function D(){try{let v=Array.from(t.querySelectorAll(".board-column"));for(let u of v)Array.from(u.querySelectorAll(".board-card")).forEach((x,R)=>{x.tabIndex=R===0?0:-1})}catch{}}async function _e(v,u){if(!o){le("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:v,status:u}),le("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch($){r("update-status failed: %o",$),le("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function xe(v){switch(v){case"blocked-col":return w;case"ready-col":return k;case"in-progress-col":return S;case"resolved-col":return L;case"deferred-col":return M;default:return[]}}function Be(v,u,$){if(!o||!i)return;let x=xe(v),R=x.find(ee=>ee.id===u);if(!R)return;let Y=x.filter(ee=>ee.id!==u),re=$.closest?$.closest(".board-card"):null,de=Y.length;if(re){let ee=re.getAttribute("data-issue-id");if(ee===u)return;let me=Y.findIndex(q=>q.id===ee);me>=0&&(de=me)}let V=Y.slice();V.splice(de,0,R),y.applyReorder(u,V,de)}function Je(){for(let v of Array.from(t.querySelectorAll(".board-column--drag-over")))v.classList.remove("board-column--drag-over")}let Ae=null;t.addEventListener("dragover",v=>{v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move");let $=v.target.closest(".board-column");$&&$!==Ae&&(Ae&&Ae.classList.remove("board-column--drag-over"),$.classList.add("board-column--drag-over"),Ae=$)}),t.addEventListener("dragleave",v=>{let u=v.relatedTarget;(!u||!t.contains(u))&&Ae&&(Ae.classList.remove("board-column--drag-over"),Ae=null)}),t.addEventListener("drop",v=>{v.preventDefault(),Ae&&(Ae.classList.remove("board-column--drag-over"),Ae=null);let u=v.target,$=u.closest(".board-column");if(!$)return;let x=v.dataTransfer?.getData("text/plain")||"";if(!x)return;let R=$.id,Y=C.get(x);if(Y&&Y===R){if(ki.has(R)){if(f!=="manual"){le("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Be(R,x,u)}return}let re=yi[R];if(!re){le("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}_.get(x)!==re&&_e(x,re)}),t.addEventListener("keydown",v=>{let u=v.target;if(!(u instanceof HTMLElement))return;let $=String(u.tagName||"").toLowerCase();if($==="input"||$==="textarea"||$==="select"||$==="button"||$==="a"||u.isContentEditable===!0)return;let x=u.closest(".board-card");if(!x)return;let R=String(v.key||"");if(R==="Enter"||R===" "){v.preventDefault();let V=x.getAttribute("data-issue-id");V&&n(V);return}if(R!=="ArrowUp"&&R!=="ArrowDown"&&R!=="ArrowLeft"&&R!=="ArrowRight")return;v.preventDefault();let Y=x.closest(".board-column");if(!Y)return;let re=Array.from(Y.querySelectorAll(".board-card")),de=re.indexOf(x);if(R==="ArrowDown"&&de<re.length-1){ze(x,re[de+1]);return}if(R==="ArrowUp"&&de>0){ze(x,re[de-1]);return}if(R==="ArrowLeft"||R==="ArrowRight"){let V=Array.from(t.querySelectorAll(".board-column")),ee=V.indexOf(Y),me=R==="ArrowRight"?1:-1,q=ee+me;for(;q>=0&&q<V.length;){let et=V[q].querySelector(".board-card");if(et){ze(x,et);return}q+=me}}});function ze(v,u){try{v.tabIndex=-1,u.tabIndex=0,u.focus()}catch{}}let Ie=null;h&&h.subscribe&&(Ie=h.subscribe(()=>{try{se()}catch{}}));let Le=null;return l&&l.subscribe&&(Le=l.subscribe(()=>{try{se()}catch{}})),{async load(){r("load"),se()},clear(){ke(),Ie&&(Ie(),Ie=null),Le&&(Le(),Le=null),t.replaceChildren(),w=[],k=[],S=[],L=[],M=[],F=[],_=new Map,C=new Map}}}function qr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Rt(t,e){return t.filter(r=>{let n=qr(r);return!(n&&e.has(n))})}async function vi(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}var xi={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},$i=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Si=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function lt(t){return!!t&&typeof t=="object"}function Gr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function ms(t,e){let r=Gr(t),n=Gr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Ai(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>lt(s)&&typeof s.text=="string"?s.text:"").join(""):lt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Ti(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:xi[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Gr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=ms(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=ms(lt(l)?l.old_string:"",lt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function bs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=$i.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Si.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ei(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(lt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(bs(o.text));else if(o.type==="tool_use"){let i=Ti(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(lt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Ai(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Ci(t){if(t.type==="item.completed"&&lt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[bs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Ri(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function _s(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!lt(o))continue;let i=Ri(o)?Ci(o):Ei(o,r);for(let l of i)e.push(l)}return e}function dr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,d=null;function p(){if(!o||!n)return[];let f=n.get(o);return _s(f?f.lines:[])}function h(f,_){if(_.kind==="gate")return b`<div class="sv__gate">${_.text}</div>`;if(_.kind==="phase")return b`<div class="sv__phase">${_.text}</div>`;if(_.kind==="result")return b`<div
        class="sv__result${_.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${_.success?"\u2713":"\u2717"}
        ${_.text||(_.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(_.kind==="error")return b`<div class="sv__error">⛔ ${_.text}</div>`;if(_.kind==="blocker")return b`<div class="sv__error">⛔ ${_.text}</div>`;if(_.kind==="tool"){let C=a.has(f),N=_.tool==="Bash"?_.command:_.path||_.command||"";return b`<div
        class="sv__tool${C?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>L(f)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${_.icon}</span>
          <span class="sv__tool-name">${_.tool}</span>
          ${N?b`<span class="sv__tool-detail">${N}</span>`:""}
          ${typeof _.added=="number"?b`<span class="sv__diff-add">+${_.added}</span>`:""}
          ${typeof _.removed=="number"?b`<span class="sv__diff-del">−${_.removed}</span>`:""}
          ${_.result?b`<span class="sv__tool-ok">→ ${_.result}</span>`:""}
        </span>
        ${C?b`<pre class="sv__tool-expand">${y(_)}</pre>`:""}
      </div>`}return b`<div class="sv__as">${_.text}</div>`}function y(f){let _=[];if(f.input!==void 0)try{_.push(`input: ${JSON.stringify(f.input,null,2)}`)}catch{}return typeof f.output=="string"&&f.output.length>0&&_.push(`output:
${f.output}`),_.join(`

`)}function w(){if(!o)return b``;let f=p(),_=[i.runner,i.model,i.effort,i.worktree].filter(Boolean).join(" \xB7 ");return b`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${_?b`<span class="sv__meta">${_}</span>`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          @click=${M}
        >
          ⇣ 라이브 따라가기 ${l?"ON":"OFF"}
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>E()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${f.length===0?b`<div class="sv__empty">세션 로그 없음</div>`:f.map((C,N)=>h(N,C))}
      </div>
    </div>`}function k(){ue(w(),t),l&&S()}function S(){let f=t.querySelector(".sv__body");f&&(f.scrollTop=f.scrollHeight)}function L(f){a.has(f)?a.delete(f):a.add(f),k()}function M(){l=!l,k()}function F(f){let _=f.target;if(!_||!_.classList||!_.classList.contains("sv__body"))return;!(_.scrollHeight-_.scrollTop-_.clientHeight<=4)&&l&&(l=!1,k())}t.addEventListener("scroll",F,!0);function G(f){let _=f&&f.attempt_id;_&&(o=_,i=f.meta||{},l=!0,a.clear(),!d&&n&&(d=n.subscribe(k)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),k())}function E(){let f=o;o=null,a.clear(),r&&f&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${f}`})).catch(()=>{}),ue(b``,t),s&&s()}return{open:G,close:E,isOpen(){return o!==null},destroy(){d&&(d(),d=null),t.removeEventListener("scroll",F,!0),o=null,ue(b``,t)}}}function Ii(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function ys(t,e){let r=Ii(t);return b`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?b`<div class="detail-empty">산출물 없음</div>`:b`
          ${r.map(n=>b`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>e.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>e.onOpenDoc(s,n.path)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Li=["claude","codex","ccx"],ks={claude:["opus","sonnet","haiku","fable"],codex:["gpt-5.6","gpt-5.4"],ccx:["opus","sonnet","haiku","fable"]},Di=["low","medium","high","xhigh"],Oi=["codex","opus","fable","self","skip"],Mi=["opus","fable","sonnet","haiku"],Ni=["standard","fast_track"];function Pi(t){return ks[String(t||"claude")]||ks.claude}function It(t,e,r,n,s,o){return b`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>b`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function Lt(t,e=!0){let r=t.map(n=>({value:n,label:n}));return e?[{value:"",label:"(\uAE30\uBCF8)"},...r]:r}function ws(t,e){let r=t&&t.metadata||{},n=r.worker_runner||"",s=r.workflow_mode==="fast_track"?"fast_track":"standard";return b`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${It("worker_runner","worker_runner",Lt(Li),n,!!n,e)}
    ${It("orchestration_model","orchestration_model",Lt(Pi(n)),r.orchestration_model||"",!1,e)}
    ${It("orchestration_effort","orchestration_effort",Lt(Di),r.orchestration_effort||"",!1,e)}
    ${It("review_model","review_model",Lt(Oi),r.review_model||"",!1,e)}
    ${It("impl_model","impl_model",Lt(Mi),r.impl_model||"",!1,e)}
    ${It("workflow_mode","workflow_mode",Lt(Ni,!1),s,r.workflow_mode==="fast_track",e)}
  `}var{entries:Rs,setPrototypeOf:vs,isFrozen:Fi,getPrototypeOf:Bi,getOwnPropertyDescriptor:zi}=Object,{freeze:Oe,seal:Ve,create:Xr}=Object,{apply:Qr,construct:Jr}=typeof Reflect<"u"&&Reflect;Oe||(Oe=function(e){return e});Ve||(Ve=function(e){return e});Qr||(Qr=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Jr||(Jr=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var ur=Me(Array.prototype.forEach),Ui=Me(Array.prototype.lastIndexOf),xs=Me(Array.prototype.pop),Ut=Me(Array.prototype.push),Hi=Me(Array.prototype.splice),fr=Me(String.prototype.toLowerCase),Wr=Me(String.prototype.toString),jr=Me(String.prototype.match),Ht=Me(String.prototype.replace),qi=Me(String.prototype.indexOf),Gi=Me(String.prototype.trim),Ke=Me(Object.prototype.hasOwnProperty),De=Me(RegExp.prototype.test),qt=Wi(TypeError);function Me(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Qr(t,e,n)}}function Wi(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Jr(t,r)}}function X(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:fr;vs&&vs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Fi(e)||(e[n]=o),s=o)}t[s]=!0}return t}function ji(t){for(let e=0;e<t.length;e++)Ke(t,e)||(t[e]=null);return t}function ot(t){let e=Xr(null);for(let[r,n]of Rs(t))Ke(t,r)&&(Array.isArray(n)?e[r]=ji(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=ot(n):e[r]=n);return e}function Gt(t,e){for(;t!==null;){let n=zi(t,e);if(n){if(n.get)return Me(n.get);if(typeof n.value=="function")return Me(n.value)}t=Bi(t)}function r(){return null}return r}var $s=Oe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Yr=Oe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Vr=Oe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Yi=Oe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Zr=Oe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Vi=Oe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ss=Oe(["#text"]),As=Oe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Kr=Oe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ts=Oe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),pr=Oe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Zi=Ve(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ki=Ve(/<%[\w\W]*|[\w\W]*%>/gm),Xi=Ve(/\$\{[\w\W]*/gm),Qi=Ve(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ji=Ve(/^aria-[\-\w]+$/),Is=Ve(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ea=Ve(/^(?:\w+script|data):/i),ta=Ve(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ls=Ve(/^html$/i),ra=Ve(/^[a-z][.\w]*(-[.\w]+)+$/i),Es=Object.freeze({__proto__:null,ARIA_ATTR:Ji,ATTR_WHITESPACE:ta,CUSTOM_ELEMENT:ra,DATA_ATTR:Qi,DOCTYPE_NAME:Ls,ERB_EXPR:Ki,IS_ALLOWED_URI:Is,IS_SCRIPT_OR_DATA:ea,MUSTACHE_EXPR:Zi,TMPLIT_EXPR:Xi}),Wt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},na=function(){return typeof window>"u"?null:window},sa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Cs=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ds(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:na(),e=B=>Ds(B);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Wt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:d,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:y,trustedTypes:w}=t,k=a.prototype,S=Gt(k,"cloneNode"),L=Gt(k,"remove"),M=Gt(k,"nextSibling"),F=Gt(k,"childNodes"),G=Gt(k,"parentNode");if(typeof i=="function"){let B=r.createElement("template");B.content&&B.content.ownerDocument&&(r=B.content.ownerDocument)}let E,f="",{implementation:_,createNodeIterator:C,createDocumentFragment:N,getElementsByTagName:H}=r,{importNode:W}=n,Z=Cs();e.isSupported=typeof Rs=="function"&&typeof G=="function"&&_&&_.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:K,ERB_EXPR:Te,TMPLIT_EXPR:he,DATA_ATTR:qe,ARIA_ATTR:Ge,IS_SCRIPT_OR_DATA:se,ATTR_WHITESPACE:We,CUSTOM_ELEMENT:Pe}=Es,{IS_ALLOWED_URI:je}=Es,oe=null,A=X({},[...$s,...Yr,...Vr,...Zr,...Ss]),I=null,j=X({},[...As,...Kr,...Ts,...pr]),P=Object.seal(Xr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),J=null,pe=null,ce=Object.seal(Xr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ie=!0,fe=!0,Ce=!1,Fe=!0,ke=!1,Ye=!0,Se=!1,ve=!1,D=!1,_e=!1,xe=!1,Be=!1,Je=!0,Ae=!1,ze="user-content-",Ie=!0,Le=!1,v={},u=null,$=X({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),x=null,R=X({},["audio","video","img","source","image","track"]),Y=null,re=X({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),de="http://www.w3.org/1998/Math/MathML",V="http://www.w3.org/2000/svg",ee="http://www.w3.org/1999/xhtml",me=ee,q=!1,et=null,vr=X({},[de,V,ee],Wr),kt=X({},["mi","mo","mn","ms","mtext"]),wt=X({},["annotation-xml"]),Dt=X({},["title","style","font","a","script"]),rt=null,Jt=["application/xhtml+xml","text/html"],m="text/html",g=null,z=null,U=r.createElement("form"),Q=function(c){return c instanceof RegExp||c instanceof Function},be=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(z&&z===c)){if((!c||typeof c!="object")&&(c={}),c=ot(c),rt=Jt.indexOf(c.PARSER_MEDIA_TYPE)===-1?m:c.PARSER_MEDIA_TYPE,g=rt==="application/xhtml+xml"?Wr:fr,oe=Ke(c,"ALLOWED_TAGS")?X({},c.ALLOWED_TAGS,g):A,I=Ke(c,"ALLOWED_ATTR")?X({},c.ALLOWED_ATTR,g):j,et=Ke(c,"ALLOWED_NAMESPACES")?X({},c.ALLOWED_NAMESPACES,Wr):vr,Y=Ke(c,"ADD_URI_SAFE_ATTR")?X(ot(re),c.ADD_URI_SAFE_ATTR,g):re,x=Ke(c,"ADD_DATA_URI_TAGS")?X(ot(R),c.ADD_DATA_URI_TAGS,g):R,u=Ke(c,"FORBID_CONTENTS")?X({},c.FORBID_CONTENTS,g):$,J=Ke(c,"FORBID_TAGS")?X({},c.FORBID_TAGS,g):ot({}),pe=Ke(c,"FORBID_ATTR")?X({},c.FORBID_ATTR,g):ot({}),v=Ke(c,"USE_PROFILES")?c.USE_PROFILES:!1,ie=c.ALLOW_ARIA_ATTR!==!1,fe=c.ALLOW_DATA_ATTR!==!1,Ce=c.ALLOW_UNKNOWN_PROTOCOLS||!1,Fe=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ke=c.SAFE_FOR_TEMPLATES||!1,Ye=c.SAFE_FOR_XML!==!1,Se=c.WHOLE_DOCUMENT||!1,_e=c.RETURN_DOM||!1,xe=c.RETURN_DOM_FRAGMENT||!1,Be=c.RETURN_TRUSTED_TYPE||!1,D=c.FORCE_BODY||!1,Je=c.SANITIZE_DOM!==!1,Ae=c.SANITIZE_NAMED_PROPS||!1,Ie=c.KEEP_CONTENT!==!1,Le=c.IN_PLACE||!1,je=c.ALLOWED_URI_REGEXP||Is,me=c.NAMESPACE||ee,kt=c.MATHML_TEXT_INTEGRATION_POINTS||kt,wt=c.HTML_INTEGRATION_POINTS||wt,P=c.CUSTOM_ELEMENT_HANDLING||{},c.CUSTOM_ELEMENT_HANDLING&&Q(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(P.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&Q(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(P.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(P.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ke&&(fe=!1),xe&&(_e=!0),v&&(oe=X({},Ss),I=[],v.html===!0&&(X(oe,$s),X(I,As)),v.svg===!0&&(X(oe,Yr),X(I,Kr),X(I,pr)),v.svgFilters===!0&&(X(oe,Vr),X(I,Kr),X(I,pr)),v.mathMl===!0&&(X(oe,Zr),X(I,Ts),X(I,pr))),c.ADD_TAGS&&(typeof c.ADD_TAGS=="function"?ce.tagCheck=c.ADD_TAGS:(oe===A&&(oe=ot(oe)),X(oe,c.ADD_TAGS,g))),c.ADD_ATTR&&(typeof c.ADD_ATTR=="function"?ce.attributeCheck=c.ADD_ATTR:(I===j&&(I=ot(I)),X(I,c.ADD_ATTR,g))),c.ADD_URI_SAFE_ATTR&&X(Y,c.ADD_URI_SAFE_ATTR,g),c.FORBID_CONTENTS&&(u===$&&(u=ot(u)),X(u,c.FORBID_CONTENTS,g)),Ie&&(oe["#text"]=!0),Se&&X(oe,["html","head","body"]),oe.table&&(X(oe,["tbody"]),delete J.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw qt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw qt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');E=c.TRUSTED_TYPES_POLICY,f=E.createHTML("")}else E===void 0&&(E=sa(w,s)),E!==null&&typeof f=="string"&&(f=E.createHTML(""));Oe&&Oe(c),z=c}},er=X({},[...Yr,...Vr,...Yi]),bn=X({},[...Zr,...Vi]),Ao=function(c){let T=G(c);(!T||!T.tagName)&&(T={namespaceURI:me,tagName:"template"});let O=fr(c.tagName),ge=fr(T.tagName);return et[c.namespaceURI]?c.namespaceURI===V?T.namespaceURI===ee?O==="svg":T.namespaceURI===de?O==="svg"&&(ge==="annotation-xml"||kt[ge]):!!er[O]:c.namespaceURI===de?T.namespaceURI===ee?O==="math":T.namespaceURI===V?O==="math"&&wt[ge]:!!bn[O]:c.namespaceURI===ee?T.namespaceURI===V&&!wt[ge]||T.namespaceURI===de&&!kt[ge]?!1:!bn[O]&&(Dt[O]||!er[O]):!!(rt==="application/xhtml+xml"&&et[c.namespaceURI]):!1},tt=function(c){Ut(e.removed,{element:c});try{G(c).removeChild(c)}catch{L(c)}},dt=function(c,T){try{Ut(e.removed,{attribute:T.getAttributeNode(c),from:T})}catch{Ut(e.removed,{attribute:null,from:T})}if(T.removeAttribute(c),c==="is")if(_e||xe)try{tt(T)}catch{}else try{T.setAttribute(c,"")}catch{}},_n=function(c){let T=null,O=null;if(D)c="<remove></remove>"+c;else{let $e=jr(c,/^[\r\n\t ]+/);O=$e&&$e[0]}rt==="application/xhtml+xml"&&me===ee&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");let ge=E?E.createHTML(c):c;if(me===ee)try{T=new y().parseFromString(ge,rt)}catch{}if(!T||!T.documentElement){T=_.createDocument(me,"template",null);try{T.documentElement.innerHTML=q?f:ge}catch{}}let Re=T.body||T.documentElement;return c&&O&&Re.insertBefore(r.createTextNode(O),Re.childNodes[0]||null),me===ee?H.call(T,Se?"html":"body")[0]:Se?T.documentElement:Re},yn=function(c){return C.call(c.ownerDocument||c,c,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},xr=function(c){return c instanceof h&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof p)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function")},kn=function(c){return typeof l=="function"&&c instanceof l};function nt(B,c,T){ur(B,O=>{O.call(e,c,T,z)})}let wn=function(c){let T=null;if(nt(Z.beforeSanitizeElements,c,null),xr(c))return tt(c),!0;let O=g(c.nodeName);if(nt(Z.uponSanitizeElement,c,{tagName:O,allowedTags:oe}),Ye&&c.hasChildNodes()&&!kn(c.firstElementChild)&&De(/<[/\w!]/g,c.innerHTML)&&De(/<[/\w!]/g,c.textContent)||c.nodeType===Wt.progressingInstruction||Ye&&c.nodeType===Wt.comment&&De(/<[/\w]/g,c.data))return tt(c),!0;if(!(ce.tagCheck instanceof Function&&ce.tagCheck(O))&&(!oe[O]||J[O])){if(!J[O]&&xn(O)&&(P.tagNameCheck instanceof RegExp&&De(P.tagNameCheck,O)||P.tagNameCheck instanceof Function&&P.tagNameCheck(O)))return!1;if(Ie&&!u[O]){let ge=G(c)||c.parentNode,Re=F(c)||c.childNodes;if(Re&&ge){let $e=Re.length;for(let Ue=$e-1;Ue>=0;--Ue){let st=S(Re[Ue],!0);st.__removalCount=(c.__removalCount||0)+1,ge.insertBefore(st,M(c))}}}return tt(c),!0}return c instanceof a&&!Ao(c)||(O==="noscript"||O==="noembed"||O==="noframes")&&De(/<\/no(script|embed|frames)/i,c.innerHTML)?(tt(c),!0):(ke&&c.nodeType===Wt.text&&(T=c.textContent,ur([K,Te,he],ge=>{T=Ht(T,ge," ")}),c.textContent!==T&&(Ut(e.removed,{element:c.cloneNode()}),c.textContent=T)),nt(Z.afterSanitizeElements,c,null),!1)},vn=function(c,T,O){if(Je&&(T==="id"||T==="name")&&(O in r||O in U))return!1;if(!(fe&&!pe[T]&&De(qe,T))){if(!(ie&&De(Ge,T))){if(!(ce.attributeCheck instanceof Function&&ce.attributeCheck(T,c))){if(!I[T]||pe[T]){if(!(xn(c)&&(P.tagNameCheck instanceof RegExp&&De(P.tagNameCheck,c)||P.tagNameCheck instanceof Function&&P.tagNameCheck(c))&&(P.attributeNameCheck instanceof RegExp&&De(P.attributeNameCheck,T)||P.attributeNameCheck instanceof Function&&P.attributeNameCheck(T,c))||T==="is"&&P.allowCustomizedBuiltInElements&&(P.tagNameCheck instanceof RegExp&&De(P.tagNameCheck,O)||P.tagNameCheck instanceof Function&&P.tagNameCheck(O))))return!1}else if(!Y[T]){if(!De(je,Ht(O,We,""))){if(!((T==="src"||T==="xlink:href"||T==="href")&&c!=="script"&&qi(O,"data:")===0&&x[c])){if(!(Ce&&!De(se,Ht(O,We,"")))){if(O)return!1}}}}}}}return!0},xn=function(c){return c!=="annotation-xml"&&jr(c,Pe)},$n=function(c){nt(Z.beforeSanitizeAttributes,c,null);let{attributes:T}=c;if(!T||xr(c))return;let O={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:I,forceKeepAttr:void 0},ge=T.length;for(;ge--;){let Re=T[ge],{name:$e,namespaceURI:Ue,value:st}=Re,vt=g($e),$r=st,Ee=$e==="value"?$r:Gi($r);if(O.attrName=vt,O.attrValue=Ee,O.keepAttr=!0,O.forceKeepAttr=void 0,nt(Z.uponSanitizeAttribute,c,O),Ee=O.attrValue,Ae&&(vt==="id"||vt==="name")&&(dt($e,c),Ee=ze+Ee),Ye&&De(/((--!?|])>)|<\/(style|title|textarea)/i,Ee)){dt($e,c);continue}if(vt==="attributename"&&jr(Ee,"href")){dt($e,c);continue}if(O.forceKeepAttr)continue;if(!O.keepAttr){dt($e,c);continue}if(!Fe&&De(/\/>/i,Ee)){dt($e,c);continue}ke&&ur([K,Te,he],An=>{Ee=Ht(Ee,An," ")});let Sn=g(c.nodeName);if(!vn(Sn,vt,Ee)){dt($e,c);continue}if(E&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!Ue)switch(w.getAttributeType(Sn,vt)){case"TrustedHTML":{Ee=E.createHTML(Ee);break}case"TrustedScriptURL":{Ee=E.createScriptURL(Ee);break}}if(Ee!==$r)try{Ue?c.setAttributeNS(Ue,$e,Ee):c.setAttribute($e,Ee),xr(c)?tt(c):xs(e.removed)}catch{dt($e,c)}}nt(Z.afterSanitizeAttributes,c,null)},To=function B(c){let T=null,O=yn(c);for(nt(Z.beforeSanitizeShadowDOM,c,null);T=O.nextNode();)nt(Z.uponSanitizeShadowNode,T,null),wn(T),$n(T),T.content instanceof o&&B(T.content);nt(Z.afterSanitizeShadowDOM,c,null)};return e.sanitize=function(B){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},T=null,O=null,ge=null,Re=null;if(q=!B,q&&(B="<!-->"),typeof B!="string"&&!kn(B))if(typeof B.toString=="function"){if(B=B.toString(),typeof B!="string")throw qt("dirty is not a string, aborting")}else throw qt("toString is not a function");if(!e.isSupported)return B;if(ve||be(c),e.removed=[],typeof B=="string"&&(Le=!1),Le){if(B.nodeName){let st=g(B.nodeName);if(!oe[st]||J[st])throw qt("root node is forbidden and cannot be sanitized in-place")}}else if(B instanceof l)T=_n("<!---->"),O=T.ownerDocument.importNode(B,!0),O.nodeType===Wt.element&&O.nodeName==="BODY"||O.nodeName==="HTML"?T=O:T.appendChild(O);else{if(!_e&&!ke&&!Se&&B.indexOf("<")===-1)return E&&Be?E.createHTML(B):B;if(T=_n(B),!T)return _e?null:Be?f:""}T&&D&&tt(T.firstChild);let $e=yn(Le?B:T);for(;ge=$e.nextNode();)wn(ge),$n(ge),ge.content instanceof o&&To(ge.content);if(Le)return B;if(_e){if(xe)for(Re=N.call(T.ownerDocument);T.firstChild;)Re.appendChild(T.firstChild);else Re=T;return(I.shadowroot||I.shadowrootmode)&&(Re=W.call(n,Re,!0)),Re}let Ue=Se?T.outerHTML:T.innerHTML;return Se&&oe["!doctype"]&&T.ownerDocument&&T.ownerDocument.doctype&&T.ownerDocument.doctype.name&&De(Ls,T.ownerDocument.doctype.name)&&(Ue="<!DOCTYPE "+T.ownerDocument.doctype.name+`>
`+Ue),ke&&ur([K,Te,he],st=>{Ue=Ht(Ue,st," ")}),E&&Be?E.createHTML(Ue):Ue},e.setConfig=function(){let B=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};be(B),ve=!0},e.clearConfig=function(){z=null,ve=!1},e.isValidAttribute=function(B,c,T){z||be({});let O=g(B),ge=g(c);return vn(O,ge,T)},e.addHook=function(B,c){typeof c=="function"&&Ut(Z[B],c)},e.removeHook=function(B,c){if(c!==void 0){let T=Ui(Z[B],c);return T===-1?void 0:Hi(Z[B],T,1)[0]}return xs(Z[B])},e.removeHooks=function(B){Z[B]=[]},e.removeAllHooks=function(){Z=Cs()},e}var Os=Ds();var Ms={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ns=t=>(...e)=>({_$litDirective$:t,values:e}),hr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var jt=class extends hr{constructor(e){if(super(e),this.it=we,e.type!==Ms.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===we||e==null)return this._t=void 0,this.it=e;if(e===ht)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};jt.directiveName="unsafeHTML",jt.resultType=1;var Ps=Ns(jt);function nn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var yt=nn();function Gs(t){yt=t}var Kt={exec:()=>null};function te(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Ne.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var oa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ne={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},ia=/^(?:[ \t]*(?:\n|$))+/,aa=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,la=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Xt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ca=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,sn=/(?:[*+-]|\d{1,9}[.)])/,Ws=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,js=te(Ws).replace(/bull/g,sn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),da=te(Ws).replace(/bull/g,sn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),on=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ua=/^[^\n]+/,an=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,pa=te(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",an).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),fa=te(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,sn).getRegex(),kr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ln=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ha=te("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ln).replace("tag",kr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ys=te(on).replace("hr",Xt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",kr).getRegex(),ga=te(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ys).getRegex(),cn={blockquote:ga,code:aa,def:pa,fences:la,heading:ca,hr:Xt,html:ha,lheading:js,list:fa,newline:ia,paragraph:Ys,table:Kt,text:ua},Fs=te("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Xt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",kr).getRegex(),ma={...cn,lheading:da,table:Fs,paragraph:te(on).replace("hr",Xt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Fs).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",kr).getRegex()},ba={...cn,html:te(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ln).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Kt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:te(on).replace("hr",Xt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",js).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},_a=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ya=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Vs=/^( {2,}|\\)\n(?!\s*$)/,ka=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,wr=/[\p{P}\p{S}]/u,dn=/[\s\p{P}\p{S}]/u,Zs=/[^\s\p{P}\p{S}]/u,wa=te(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,dn).getRegex(),Ks=/(?!~)[\p{P}\p{S}]/u,va=/(?!~)[\s\p{P}\p{S}]/u,xa=/(?:[^\s\p{P}\p{S}]|~)/u,$a=te(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",oa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Xs=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Sa=te(Xs,"u").replace(/punct/g,wr).getRegex(),Aa=te(Xs,"u").replace(/punct/g,Ks).getRegex(),Qs="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ta=te(Qs,"gu").replace(/notPunctSpace/g,Zs).replace(/punctSpace/g,dn).replace(/punct/g,wr).getRegex(),Ea=te(Qs,"gu").replace(/notPunctSpace/g,xa).replace(/punctSpace/g,va).replace(/punct/g,Ks).getRegex(),Ca=te("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zs).replace(/punctSpace/g,dn).replace(/punct/g,wr).getRegex(),Ra=te(/\\(punct)/,"gu").replace(/punct/g,wr).getRegex(),Ia=te(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),La=te(ln).replace("(?:-->|$)","-->").getRegex(),Da=te("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",La).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),br=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Oa=te(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",br).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Js=te(/^!?\[(label)\]\[(ref)\]/).replace("label",br).replace("ref",an).getRegex(),eo=te(/^!?\[(ref)\](?:\[\])?/).replace("ref",an).getRegex(),Ma=te("reflink|nolink(?!\\()","g").replace("reflink",Js).replace("nolink",eo).getRegex(),Bs=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,un={_backpedal:Kt,anyPunctuation:Ra,autolink:Ia,blockSkip:$a,br:Vs,code:ya,del:Kt,emStrongLDelim:Sa,emStrongRDelimAst:Ta,emStrongRDelimUnd:Ca,escape:_a,link:Oa,nolink:eo,punctuation:wa,reflink:Js,reflinkSearch:Ma,tag:Da,text:ka,url:Kt},Na={...un,link:te(/^!?\[(label)\]\((.*?)\)/).replace("label",br).getRegex(),reflink:te(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",br).getRegex()},en={...un,emStrongRDelimAst:Ea,emStrongLDelim:Aa,url:te(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Bs).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:te(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Bs).getRegex()},Pa={...en,br:te(Vs).replace("{2,}","*").getRegex(),text:te(en.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},gr={normal:cn,gfm:ma,pedantic:ba},Yt={normal:un,gfm:en,breaks:Pa,pedantic:Na},Fa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},zs=t=>Fa[t];function it(t,e){if(e){if(Ne.escapeTest.test(t))return t.replace(Ne.escapeReplace,zs)}else if(Ne.escapeTestNoEncode.test(t))return t.replace(Ne.escapeReplaceNoEncode,zs);return t}function Us(t){try{t=encodeURI(t).replace(Ne.percentDecode,"%")}catch{return null}return t}function Hs(t,e){let r=t.replace(Ne.findPipe,(o,i,l)=>{let a=!1,d=i;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Ne.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ne.slashPipe,"|");return n}function Vt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Ba(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function qs(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function za(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var _r=class{constructor(t){ae(this,"options");ae(this,"rules");ae(this,"lexer");this.options=t||yt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Vt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=za(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Vt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Vt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Vt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let d=l.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=h,r.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let w=y,k=w.raw+`
`+r.join(`
`),S=this.blockquote(k);o[o.length-1]=S,n=n.substring(0,n.length-w.raw.length)+S.raw,s=s.substring(0,s.length-w.text.length)+S.text;break}else if(y?.type==="list"){let w=y,k=w.raw+`
`+r.join(`
`),S=this.list(k);o[o.length-1]=S,n=n.substring(0,n.length-y.raw.length)+S.raw,s=s.substring(0,s.length-w.raw.length)+S.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,d="",p="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;d=e[0],t=t.substring(d.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),y=t.split(`
`,1)[0],w=!h.trim(),k=0;if(this.options.pedantic?(k=2,p=h.trimStart()):w?k=e[1].length+1:(k=e[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,p=h.slice(k),k+=e[1].length),w&&this.rules.other.blankLine.test(y)&&(d+=y+`
`,t=t.substring(y.length+1),a=!0),!a){let S=this.rules.other.nextBulletRegex(k),L=this.rules.other.hrRegex(k),M=this.rules.other.fencesBeginRegex(k),F=this.rules.other.headingBeginRegex(k),G=this.rules.other.htmlBeginRegex(k);for(;t;){let E=t.split(`
`,1)[0],f;if(y=E,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),f=y):f=y.replace(this.rules.other.tabCharGlobal,"    "),M.test(y)||F.test(y)||G.test(y)||S.test(y)||L.test(y))break;if(f.search(this.rules.other.nonSpaceChar)>=k||!y.trim())p+=`
`+f.slice(k);else{if(w||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||M.test(h)||F.test(h)||L.test(h))break;p+=`
`+y}!w&&!y.trim()&&(w=!0),d+=E+`
`,t=t.substring(E.length+1),h=f.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=p.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!s.loose){let d=a.tokens.filter(h=>h.type==="space"),p=d.length>0&&d.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=p}}if(s.loose)for(let a of s.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Hs(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Hs(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Vt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ba(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),qs(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return qs(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,e=e.slice(-1*t.length+s);(n=d.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let p=[...n[0]][0].length,h=t.slice(0,s+n.index+p+i);if(Math.min(s,i)%2){let w=h.slice(1,-1);return{type:"em",raw:h,text:w,tokens:this.lexer.inlineTokens(w)}}let y=h.slice(2,-2);return{type:"strong",raw:h,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},Xe=class tn{constructor(e){ae(this,"tokens");ae(this,"options");ae(this,"state");ae(this,"inlineQueue");ae(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||yt,this.options.tokenizer=this.options.tokenizer||new _r,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ne,block:gr.normal,inline:Yt.normal};this.options.pedantic?(r.block=gr.pedantic,r.inline=Yt.pedantic):this.options.gfm&&(r.block=gr.gfm,this.options.breaks?r.inline=Yt.breaks:r.inline=Yt.gfm),this.tokenizer.rules=r}static get rules(){return{block:gr,inline:Yt}}static lex(e,r){return new tn(r).lex(e)}static lexInline(e,r){return new tn(r).inlineTokens(e)}lex(e){e=e.replace(Ne.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(Ne.tabCharGlobal,"    ").replace(Ne.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(d=>{a=d.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let d=e;if(this.options.extensions?.startInline){let p=1/0,h=e.slice(1),y;this.options.extensions.startInline.forEach(w=>{y=w.call({lexer:this},h),typeof y=="number"&&y>=0&&(p=Math.min(p,y))}),p<1/0&&p>=0&&(d=e.substring(0,p+1))}if(a=this.tokenizer.inlineText(d)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},yr=class{constructor(t){ae(this,"options");ae(this,"parser");this.options=t||yt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Ne.notSpaceStart)?.[0],s=t.replace(Ne.endingNewline,"")+`
`;return n?'<pre><code class="language-'+it(n)+'">'+(r?s:it(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:it(s,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,n="";for(let i=0;i<t.items.length;i++){let l=t.items[i];n+=this.listitem(l)}let s=e?"ol":"ul",o=e&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",r="";for(let s=0;s<t.header.length;s++)r+=this.tablecell(t.header[s]);e+=this.tablerow({text:r});let n="";for(let s=0;s<t.rows.length;s++){let o=t.rows[s];r="";for(let i=0;i<o.length;i++)r+=this.tablecell(o[i]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${it(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Us(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+it(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Us(t);if(s===null)return it(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${it(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:it(t.text)}},pn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},Qe=class rn{constructor(e){ae(this,"options");ae(this,"renderer");ae(this,"textRenderer");this.options=e||yt,this.options.renderer=this.options.renderer||new yr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new pn}static parse(e,r){return new rn(r).parse(e)}static parseInline(e,r){return new rn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},mr,Zt=(mr=class{constructor(t){ae(this,"options");ae(this,"block");this.options=t||yt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?Xe.lex:Xe.lexInline}provideParser(){return this.block?Qe.parse:Qe.parseInline}},ae(mr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ae(mr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),mr),Ua=class{constructor(...t){ae(this,"defaults",nn());ae(this,"options",this.setOptions);ae(this,"parse",this.parseMarkdown(!0));ae(this,"parseInline",this.parseMarkdown(!1));ae(this,"Parser",Qe);ae(this,"Renderer",yr);ae(this,"TextRenderer",pn);ae(this,"Lexer",Xe);ae(this,"Tokenizer",_r);ae(this,"Hooks",Zt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new yr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new _r(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Zt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Zt.passThroughHooks.has(o)?s[i]=d=>{if(this.defaults.async&&Zt.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,d);return a.call(s,h)})();let p=l.call(s,d);return a.call(s,p)}:s[i]=(...d)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,d);return h===!1&&(h=await a.apply(s,d)),h})();let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return Xe.lex(t,e??this.defaults)}parser(t,e){return Qe.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?Xe.lex:Xe.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():t?Qe.parse:Qe.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?Xe.lex:Xe.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?Qe.parse:Qe.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+it(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},_t=new Ua;function ne(t,e){return _t.parse(t,e)}ne.options=ne.setOptions=function(t){return _t.setOptions(t),ne.defaults=_t.defaults,Gs(ne.defaults),ne};ne.getDefaults=nn;ne.defaults=yt;ne.use=function(...t){return _t.use(...t),ne.defaults=_t.defaults,Gs(ne.defaults),ne};ne.walkTokens=function(t,e){return _t.walkTokens(t,e)};ne.parseInline=_t.parseInline;ne.Parser=Qe;ne.parser=Qe.parse;ne.Renderer=yr;ne.TextRenderer=pn;ne.Lexer=Xe;ne.lexer=Xe.lex;ne.Tokenizer=_r;ne.Hooks=Zt;ne.parse=ne;var xc=ne.options,$c=ne.setOptions,Sc=ne.use,Ac=ne.walkTokens,Tc=ne.parseInline;var Ec=Qe.parse,Cc=Xe.lex;function to(t){let e=ne.parse(t),r=Os.sanitize(e);return Ps(r)}function Ha(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function ro(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(k){k.key==="Escape"&&s&&(k.preventDefault(),y())}document.addEventListener("keydown",a);function d(){return s?b`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>y()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ha(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>y()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?b`<div class="mv__status">불러오는 중…</div>`:o==="error"?b`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:to(i)}
          </div>
        </div>
      </div>
    `:b``}function p(){ue(d(),t)}async function h(k){s=k,o="loading",i="",l="",p();let S=r?r():"";if(!S){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let L="/api/doc?workspace="+encodeURIComponent(S)+"&path="+encodeURIComponent(k);try{let M=await n(L),F=await M.json().catch(()=>({}));if(!M.ok||!F||F.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(F&&F.error||M.status)+")",p();return}i=String(F.content||""),o="ready",p()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function y(){s=null,ue(b``,t)}function w(){document.removeEventListener("keydown",a),y()}return{open:h,close:y,destroy:w}}var qa={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ga(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function no(t,e={}){let r=Array.isArray(t)?t:[];return r.length===0?b`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `:b`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(n=>b`<button
            type="button"
            class="detail-session detail-session--${n.status||"unknown"}"
            data-attempt-id=${n.attempt_id}
            @click=${()=>e.onOpen&&e.onOpen(n.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${qa[n.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${n.attempt_id}</span>
            <span class="detail-session__meta"
              >${[n.runner,n.model].filter(Boolean).join(" \xB7 ")}</span
            >
            <span class="detail-session__time">${Ga(n.started_at)}</span>
          </button>`)}
    </div>
  `}var Wa=["open","in_progress","deferred","resolved","closed"],ja=[0,1,2,3,4];function so(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,d=null,p={},h=!1,y=!1,w="",k="",S="";function L(){h=!1,y=!1,w="",k="",S=""}let M=document.createElement("div");M.className="md-viewer-root",document.body.appendChild(M);let F=ro(M,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),G=document.createElement("div");G.className="session-log-root",document.body.appendChild(G);let E=dr(G,{transport:s?(u,$)=>Promise.resolve(s(u,$)):void 0,sessionLogStore:l});function f(){if(!i||!a)return[];let u=i.get();return(u&&u.attempts?Object.values(u.attempts):[]).filter(x=>x&&x.bead_id===a).sort((x,R)=>(R.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null}))}function _(u){let $=i?i.get():null,x=$&&$.attempts?$.attempts[u]:null;E.open({attempt_id:u,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0}:{}})}let C={onOpen:_},N=null;r&&r.subscribe&&(N=r.subscribe(()=>Z()));let H=null;i&&typeof i.subscribe=="function"&&(H=i.subscribe(()=>{a&&v()}));function W(u){u.key==="Escape"&&a&&(u.preventDefault(),n())}document.addEventListener("keydown",W);function Z(){if(a){if(r&&typeof r.snapshotFor=="function"){let u=r.snapshotFor("detail:"+a)||[];d=u.find(x=>x&&x.id===a)||u[0]||d}v()}}function K(u){try{navigator.clipboard&&typeof navigator.clipboard.writeText=="function"&&navigator.clipboard.writeText(String(u)).then(()=>le("\uBCF5\uC0AC\uB428","success",1200)).catch(()=>{})}catch{}}function Te(u){u.preventDefault(),u.stopPropagation(),a&&K(a)}function he(u,$){u.preventDefault(),u.stopPropagation(),K($)}function qe(u,$){u.preventDefault(),u.stopPropagation(),F.open($)}function Ge(u,$){p[u]=$,v(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:u,value:$})).catch(()=>{le("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function se(u,$,x){if(!s||!a)return!1;try{let R=await Promise.resolve(s(u,$)),Y=Array.isArray(R)?R[0]:R;return Y&&typeof Y=="object"&&Y.id?(d=Y,!0):(le(x,"error"),!1)}catch{return le(x,"error"),!1}}function We(u){setTimeout(()=>{try{let $=t.querySelector(u);$&&typeof $.focus=="function"&&$.focus()}catch{}},0)}function Pe(){h=!0,w=d&&d.title||"",v(),We('.detail-edit__input[data-edit="title"]')}function je(u){w=u.target.value}function oe(){h=!1,w="",v()}function A(){se("edit-text",{id:a,field:"title",value:w},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(h=!1,w=""),v()})}function I(){y=!0,k=d&&d.description||"",v(),We('.detail-edit__textarea[data-edit="description"]')}function j(u){k=u.target.value}function P(){y=!1,k="",v()}function J(){se("edit-text",{id:a,field:"description",value:k},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(y=!1,k=""),v()})}function pe(u,$,x,R){if(u.key==="Escape"){u.stopPropagation(),x();return}u.key==="Enter"&&(!R||u.ctrlKey||u.metaKey)&&(u.preventDefault(),$())}function ce(u){let $=u.target.value;se("update-status",{id:a,status:$},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function ie(u){let $=Number(u.target.value);se("update-priority",{id:a,priority:$},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function fe(u){S=u.target.value}function Ce(){let u=S.trim();u.length!==0&&se("label-add",{id:a,label:u},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then($=>{$&&(S=""),v()})}function Fe(u){if(u.key==="Escape"){u.stopPropagation(),S="",v();return}u.key==="Enter"&&(u.preventDefault(),Ce())}function ke(u){se("label-remove",{id:a,label:u},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>v())}let Ye={onCopyPath:he,onOpenDoc:qe},Se={onChange:Ge};function ve(u){return typeof u=="string"?u:u&&typeof u=="object"?String(u.id||u.to||u.issue_id||u.depends_on||""):""}function D(u){switch(u&&typeof u=="object"?String(u.dependency_type||u.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function _e(u){let x=(Array.isArray(u.dependencies)?u.dependencies:[]).map(R=>({id:ve(R),icon:D(R)})).filter(R=>R.id.length>0);return b`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?b`<div class="detail-empty">의존성 없음</div>`:b`<div class="detail-deps">
            ${x.map(R=>o?b`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(R.id)}
                  >
                    ${R.icon?`${R.icon} `:""}${R.id}
                  </button>`:b`<span class="detail-dep"
                    >${R.icon?`${R.icon} `:""}${R.id}</span
                  >`)}
          </div>`}
    `}function xe(u){let $=u.metadata||{},x=u.workflow||{},R=x.stages||{},Y=R.spec&&R.spec.stale,re=R.impl&&R.impl.stale;return b`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span class="detail-kv__v">${x.route||$.route||"\u2014"}</span>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${$.spec_review||"\uC5C6\uC74C"}${Y?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${$.impl_review||"\uC5C6\uC74C"}${re?" \xB7 stale":""}</span
        >
      </div>
      ${$.pr_url?b`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${$.pr_url}</span>
          </div>`:""}
    `}function Be(u){return h?b`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${w}
            @input=${je}
            @keydown=${$=>pe($,A,oe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${A}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${oe}
            >
              취소
            </button>
          </div>
        </div>
      `:b`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${u}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Pe}
        >
          ✎
        </button>
      </div>
    `}function Je(u){let $=Ct(u.created_at),x=Ct(u.updated_at);return!$&&!x?b``:b`
      ${$?b`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
      ${x?b`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function Ae(u,$){return b`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ce}
        >
          ${Wa.map(x=>b`<option value=${x} ?selected=${x===u}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ie}
        >
          ${ja.map(x=>b`<option value=${String(x)} ?selected=${x===$}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function ze(u){return b`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${y?"":b`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${I}
            >
              ✎
            </button>`}
      </div>
      ${y?b`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${k}
              @input=${j}
              @keydown=${$=>pe($,J,P,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${J}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${P}
              >
                취소
              </button>
            </div>
          </div>`:b`<div class="detail-overlay__desc">
            ${u||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ie(u){let $=Array.isArray(u.labels)?u.labels:[];return b`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${$.map(x=>b`<span class="detail-label-chip"
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
            .value=${S}
            @input=${fe}
            @keydown=${Fe}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ce}
          >
            추가
          </button>
        </span>
      </div>
    `}function Le(){if(!a)return b``;let u=d||{},$=String(u.id||a),x=u.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",R=u.status||"open",Y=typeof u.priority=="number"?Math.max(0,Math.min(4,u.priority)):"",re=u.description||"",de={...u,metadata:{...u.metadata||{},...p}};return b`
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
            @click=${Te}
          >
            ${$}
          </button>
          ${Be(x)} ${Ae(R,Y)}
          ${Je(u)} ${ze(re)}
          ${Ie(u)} ${_e(u)}
          ${xe(u)}
          ${ys(u,Ye)}
          ${ws(de,Se)}
          ${no(f(),C)}
        </div>
      </div>
    `}function v(){ue(Le(),t)}return{load(u){u!==a&&(p={},L()),a=u,d=null,Z()},clear(){a=null,d=null,p={},L(),F.close(),E.close(),ue(b``,t)},destroy(){N&&(N(),N=null),H&&(H(),H=null),document.removeEventListener("keydown",W),F.destroy(),M.parentNode&&M.parentNode.removeChild(M),E.destroy(),G.parentNode&&G.parentNode.removeChild(G),a=null,d=null,ue(b``,t)}}}var Ya=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function oo(t,e){return zr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Va(t,e){switch(oo(t,e)){case"shown":return{hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(r=>r!==t)};case"hidden_exact":return{hidden_labels:e.hidden_labels.filter(r=>r!==t)};default:return{visible_labels:[...e.visible_labels,t]}}}function io(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(f){let _=r.get();if(_)try{let C=await n("display-policy-set",{expected_revision:_.revision,policy:f(_)});a(C),C&&C.conflict&&C.policy&&(C=await n("display-policy-set",{expected_revision:C.policy.revision,policy:f(C.policy)}),a(C)),C&&C.conflict&&le("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{le("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(f){f&&f.policy&&typeof f.policy=="object"&&r.set(f.policy)}function d(f){l(_=>Va(f,_))}function p(){let f=i.trim();f.length!==0&&(i="",l(_=>_.hidden_prefixes.includes(f)?{hidden_prefixes:_.hidden_prefixes}:{hidden_prefixes:[..._.hidden_prefixes,f]}),L())}function h(f){l(_=>({hidden_prefixes:_.hidden_prefixes.filter(C=>C!==f)}))}function y(f){l(_=>({chips:{[f]:!_.chips[f]}}))}function w(f){let _=s();return b`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${_.length===0?b`<div class="display-settings__empty">라벨 없음</div>`:b`<div class="display-settings__pills">
              ${_.map(C=>{let N=oo(C,f);return b`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${N}`}
                  data-label=${C}
                  data-state=${N}
                  @click=${()=>d(C)}
                >
                  ${C}
                </button>`})}
            </div>`}
      </section>
    `}function k(f){return b`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${f.hidden_prefixes.map(_=>b`<span class="display-settings__prefix">
                ${_}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${_} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h(_)}
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
            @input=${_=>{i=String(_.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function S(f){return b`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Ya.map(([_,C])=>b`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${_}
                  .checked=${f.chips[_]!==!1}
                  @change=${()=>y(_)}
                />
                <span>${C}</span>
              </label>`)}
        </div>
      </section>
    `}function L(){let f=r.get();ue(b`
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
            ${f?b`${w(f)} ${k(f)}
                ${S(f)}`:b`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let M=!1,F=null;r.subscribe&&(F=r.subscribe(()=>{M&&L()}));function G(){M||(i="",M=!0,L(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){M&&(M=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:G,close:E,destroy(){M=!1,F&&(F(),F=null),o.remove()}}}function ao(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(d,p,h="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let y=typeof h=="string"?h.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function lo(t,e,r){let n=ye("views:nav"),s=null;function o(a){return d=>{d.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let d=e.getState().view==="worker"?"worker":"board";return b`
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
      </div>
    `}function l(){ue(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),ue(b``,t)}}}var co=["bug","feature","task","epic","chore"];function uo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var po=["Critical","High","Medium","Low","Backlog"];function fo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),y=r.querySelector(".new-issue__close");function w(){o.replaceChildren();let f=document.createElement("option");f.value="",f.textContent="\u2014 Select \u2014",o.appendChild(f);for(let _ of co){let C=document.createElement("option");C.value=_,C.textContent=uo(_),o.appendChild(C)}i.replaceChildren();for(let _=0;_<=4;_+=1){let C=document.createElement("option");C.value=String(_);let N=po[_]||"Medium";C.textContent=`${_} \u2013 ${N}`,i.appendChild(C)}}w();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function S(f){s.disabled=f,o.disabled=f,i.disabled=f,l.disabled=f,a.disabled=f,p.disabled=f,h.disabled=f,h.textContent=f?"Creating\u2026":"Create"}function L(){d.textContent=""}function M(f){d.textContent=f}function F(){try{let f=window.localStorage.getItem("beads-ui.new.type");f?o.value=f:o.value="";let _=window.localStorage.getItem("beads-ui.new.priority");_&&/^\d$/.test(_)?i.value=_:i.value="2"}catch{o.value="",i.value="2"}}function G(){let f=o.value||"",_=i.value||"";f.length>0&&window.localStorage.setItem("beads-ui.new.type",f),_.length>0&&window.localStorage.setItem("beads-ui.new.priority",_)}async function E(){L();let f=String(s.value||"").trim();if(f.length===0){M("Title is required"),s.focus();return}let _=Number(i.value||"2");if(!(_>=0&&_<=4)){M("Priority must be 0..4"),i.focus();return}let C=String(o.value||""),N=String(a.value||""),H={title:f};C.length>0&&(H.type=C),String(_).length>0&&(H.priority=_),N.length>0&&(H.description=N),S(!0);try{await e("create-issue",H)}catch{S(!1),M("Failed to create issue");return}G(),S(!1),k()}return r.addEventListener("cancel",f=>{f.preventDefault(),k()}),y.addEventListener("click",()=>k()),p.addEventListener("click",()=>k()),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),E())}),n.addEventListener("submit",f=>{f.preventDefault(),E()}),{open(){n.reset(),L(),F();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}function Za(t){let e=t.draggable&&!t.done;return b`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?b`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.reason?b`<span class="worker-mini__reason">${t.reason}</span>`:""}
  </div>`}function Qt(t){return b`<section
    class="worker-pane${t.src?" worker-pane--src":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${t.title}</span>
      <span class="worker-pane__count">${t.items.length}</span>
    </header>
    <div class="worker-pane__body">
      ${t.items.length===0?b`<div class="worker-pane__empty">${t.empty||""}</div>`:t.items.map(e=>Za(e))}
    </div>
  </section>`}function Ka(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function ho(t){return b`<div class="worker-banners">
    ${t.autoAdvance?b`<div class="worker-banner worker-banner--on" role="status">
          ▶ 자동 진행 켜짐 — Serial head 1 + Parallel 슬롯까지 실행합니다.
        </div>`:b`<div class="worker-banner worker-banner--off" role="status">
          ⏸ 자동 진행 꺼짐 — 새 세션을 시작하지 않습니다. ▶로 재개.
        </div>`}
    ${t.breaker?b`<div class="worker-banner worker-banner--breaker" role="alert">
          ⛔ ${t.breaker.repo||"repo"} 세션 실패로 차단 —
          ${t.breaker.reason||""}. 신규 launch·머지 진입 차단, 수동 ▶
          필요.
        </div>`:""}
  </div>`}function Xa(t,e,r=null){let n=t.lane==="serial"?"serial":"\u2225",s=typeof t.started_at=="number"?Ka(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=t.attempt_id&&t.attempt_id===r;return b`<div
    class="rtile${i?" rtile--sel":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id">${t.bead_id}</span>
      <span class="rtile__badge rtile__badge--${t.lane}">${n}</span>
      <span class="rtile__elapsed">${s}</span>
      <button
        type="button"
        class="rtile__info"
        title="상세 보기"
        aria-label="상세 보기"
      >
        ⓘ
      </button>
      <button type="button" class="rtile__stop" title="중지" aria-label="중지">
        ■
      </button>
    </div>
    <div class="rtile__title">${t.title}</div>
    ${o?b`<div class="rtile__meta">${o}</div>`:""}
  </div>`}function go(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return b`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?b`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Xa(s,e,r))}
  </div>`}var Qa="tab:worker:ready",Ja="tab:worker:blocked";function el(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function mo(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function fn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l}=e,a=n?ar(n,i):null,d=lr({transport:r,uiOrderStore:i}),p=null,h=[],y=[],w=document.createElement("div");w.className="worker-console";let k=document.createElement("div"),S=document.createElement("div");S.className="worker-drawer-host";let L=document.createElement("div");w.append(k,S,L),t.appendChild(w);let M=null,F=dr(S,{transport:r,sessionLogStore:o,onClose:()=>{M=null,he()}});function G(){return s&&s.get()||{revision:0,auto_advance:!1,serial:[],parallel:[],done:[]}}function E(){let A=G();return typeof A.revision=="number"?A.revision:0}function f(A){A&&A.queue&&s&&s.set(A.queue)}async function _(A,I,j){if(!r)return;let P=await r("worker-queue-place",{bead_id:A,lane:I,index:j,expected_revision:E()});f(P),P&&P.conflict&&await r("worker-queue-place",{bead_id:A,lane:I,index:j,expected_revision:E()}).then(f)}async function C(A,I,j){if(!r)return;let P=await r("worker-queue-reorder",{bead_id:A,lane:I,to_index:j,expected_revision:E()});f(P),P&&P.conflict&&await r("worker-queue-reorder",{bead_id:A,lane:I,to_index:j,expected_revision:E()}).then(f)}async function N(A){if(!r)return;let I=await r("worker-queue-remove",{bead_id:A,expected_revision:E()});f(I),I&&I.conflict&&await r("worker-queue-remove",{bead_id:A,expected_revision:E()}).then(f)}async function H(A){!r||!A||await r("worker-attempt-stop",{attempt_id:A})}async function W(A){if(!r)return;let I=await r("worker-queue-toggle",{on:A,expected_revision:E()});f(I),I&&I.conflict&&await r("worker-queue-toggle",{on:A,expected_revision:E()}).then(f)}function Z(){let A=G(),I=a?a.selectBoardColumn(Qa,"ready"):[],j=a?a.selectBoardColumn(Ja,"blocked"):[],P=new Map;for(let D of[...I,...j])P.set(D.id,D.title||D.id);let J=new Set([...A.serial.map(D=>D.bead_id),...A.parallel.map(D=>D.bead_id),...A.done.map(D=>D.bead_id)]),pe=new Set(j.map(D=>D.id)),ce=i?i.get()?.order||{}:{},ie=new Set,fe=[];for(let D of[...I,...j])J.has(D.id)||ie.has(D.id)||(ie.add(D.id),fe.push(D));fe.sort(or(ce)),h=fe;let Ce=fe.map(D=>{let _e=el(D),xe;return pe.has(D.id)?xe=_e?mo(D):`${mo(D)} \xB7 spec \uC5C6\uC74C`:xe=_e?"":"spec \uC5C6\uC74C",{id:D.id,title:D.title||D.id,reason:xe,draggable:_e,lane:"candidate"}}),Fe=(D,_e)=>D.map(xe=>({id:xe.bead_id,title:P.get(xe.bead_id)||xe.bead_id,draggable:_e!=="done",done:_e==="done",lane:_e})),ke=new Map;for(let D of A.serial||[])ke.set(D.bead_id,"serial");for(let D of A.parallel||[])ke.set(D.bead_id,"parallel");let Ye=A.attempts?Object.values(A.attempts):[],Se=[],ve=null;for(let D of Ye)D.status==="running"?Se.push({bead_id:D.bead_id,attempt_id:D.attempt_id,title:P.get(D.bead_id)||D.bead_id,lane:ke.get(D.bead_id)||"parallel",runner:D.runner||null,model:D.model||null,effort:D.effort||null,started_at:typeof D.started_at=="number"?D.started_at:null}):(D.status==="failed"||D.status==="orphaned")&&(ve={repo:D.repo||"",reason:D.cause||D.status});return{queue:A,idToTitle:P,candidates:Ce,running:Se,breaker:ve,serial:Fe(A.serial,"serial"),parallel:Fe(A.parallel,"parallel"),done:Fe(A.done,"done")}}function K(A){let I=A.serial.length>0?A.serial[0].id:"\u2014";return b`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${A.queue.auto_advance?" is-active":""}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${A.running.length}</b> · serial 다음
          <b>${I}</b></span
        >
        <span class="worker-tgl"
          >parallel slot <b>${A.parallel.length}</b></span
        >
      </div>
      ${ho({autoAdvance:!!A.queue.auto_advance,breaker:A.breaker})}
      ${go(A.running,Date.now(),M)}`}function Te(A){return b`<div class="worker-lanes">
      ${Qt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:A.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${Qt({id:"worker-pane-serial",lane:"serial",title:"Serial \uD050",items:A.serial,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Qt({id:"worker-pane-parallel",lane:"parallel",title:"Parallel \uD480",items:A.parallel,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Qt({id:"worker-pane-done",lane:"done",title:`Done \xB7 \uC624\uB298 ${A.done.length}`,items:A.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function he(){let A=Z();ue(K(A),k),ue(Te(A),L)}function qe(A){let I=A.target?.closest?.('.worker-mini[draggable="true"]');if(!I)return;let j=I.dataset.beadId||"",P=I.dataset.lane||"";p={bead_id:j,from_lane:P};try{A.dataTransfer?.setData("text/plain",j),A.dataTransfer&&(A.dataTransfer.effectAllowed="move")}catch{}}function Ge(A){let I=A.target?.closest?.(".worker-pane");I&&(A.preventDefault(),A.dataTransfer&&(A.dataTransfer.dropEffect="move"),I.classList.add("worker-pane--drag-over"))}function se(A){A.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function We(A,I){let j=h.find(ce=>ce.id===A);if(!j)return;let P=h.filter(ce=>ce.id!==A),J=P.length;if(I){let ce=I.dataset.beadId;if(ce===A)return;let ie=P.findIndex(fe=>fe.id===ce);ie>=0&&(J=ie)}let pe=P.slice();pe.splice(J,0,j),d.applyReorder(A,pe,J)}function Pe(A){let I=A.target?.closest?.(".worker-pane");if(!I)return;A.preventDefault(),I.classList.remove("worker-pane--drag-over");let j=I.dataset.lane||"",P=p?.bead_id||A.dataTransfer?.getData("text/plain")||"",J=p?.from_lane||"";if(p=null,!P)return;let pe=A.target?.closest?.(".worker-mini"),ce=Array.from(I.querySelectorAll(".worker-mini")),ie=ce.length;if(pe){let fe=ce.indexOf(pe);fe>=0&&(ie=fe)}if(j==="candidate"){if(J==="candidate"){We(P,pe);return}(J==="serial"||J==="parallel")&&N(P);return}(j==="serial"||j==="parallel")&&(J===j?C(P,j,ie):_(P,j,ie))}function je(A){let I=G(),j=I.attempts?I.attempts[A]:null,P=j?{runner:j.runner||void 0,model:j.model||void 0,effort:j.effort||void 0,worktree:j.worktree||void 0,status:j.status||void 0}:{};M=A,F.open({attempt_id:A,meta:P}),he()}function oe(A){let I=A.target;if(I?.closest?.(".worker-play")){W(!0);return}if(I?.closest?.(".worker-pause")){W(!1);return}if(I?.closest?.(".rtile__stop")){let pe=I?.closest?.(".rtile")?.dataset?.attemptId;pe&&H(pe);return}if(I?.closest?.(".rtile__info")){let pe=I?.closest?.(".rtile")?.dataset?.beadId;pe&&l&&l(pe);return}if(I?.closest?.(".worker-drawer-host"))return;let j=I?.closest?.(".rtile");if(j){let J=j.dataset.attemptId;J&&je(J);return}let P=I?.closest?.(".worker-mini");if(P&&l){let J=P.dataset.beadId;J&&l(J)}}return t.addEventListener("dragstart",qe),t.addEventListener("dragover",Ge),t.addEventListener("dragleave",se),t.addEventListener("drop",Pe),t.addEventListener("click",oe),a&&y.push(a.subscribe(he)),s&&y.push(s.subscribe(he)),he(),{load(){he()},destroy(){for(let A of y.splice(0))try{A()}catch{}t.removeEventListener("dragstart",qe),t.removeEventListener("dragover",Ge),t.removeEventListener("dragleave",se),t.removeEventListener("drop",Pe),t.removeEventListener("click",oe);try{F.destroy()}catch{}ue(b``,t)}}}function hn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function bo(t,e,r,n=async()=>{},s=async()=>{}){let o=ye("views:workspace-picker"),i=null,l=!1,a=!1,d=!1;async function p(_){let N=_.target.value,W=e.getState().workspace?.current?.path||"";if(N&&N!==W){o("switching workspace to %s",N),l=!0,f();try{await r(N)}catch(Z){o("workspace switch failed: %o",Z)}finally{l=!1,f()}}}async function h(){let _=e.getState(),C=_.workspace?.current?.path||_.workspace?.available?.[0]?.path||"";if(!(!C||a)){o("git-pulling workspace %s",C),a=!0,f();try{await n(C)}catch(N){o("workspace git pull failed: %o",N)}finally{a=!1,f()}}}function y(_){let C=_.target;C&&t.contains(C)||S()}function w(_){_.key==="Escape"&&S()}function k(){d||(d=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",w),f())}function S(){d&&(d=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",w),f())}function L(){d?S():k()}async function M(_){let C=_.target,N=C.value,H=C.checked;o("toggling visibility %s \u2192 %s",N,String(H));try{await s(N,H)}catch(W){o("workspace visibility toggle failed: %o",W)}}function F(_){return _?b`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${h}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:b``}function G(_,C){return b`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${L}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?b`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${_.map(N=>b`
                    <label
                      class="workspace-picker__manage-row"
                      title="${N.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${N.path}"
                        .checked=${!C.has(N.path)}
                        @change=${M}
                      />
                      <span class="workspace-picker__manage-name"
                        >${hn(N.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function E(){let _=e.getState(),C=_.workspace?.current,N=_.workspace?.available||[],H=new Set(_.workspace?.hidden||[]),W=C?.path||N[0]?.path||"";if(N.length===0)return b``;let Z=N.filter(K=>!H.has(K.path)||K.path===W);if(Z.length<=1){let K=Z[0]||N[0],Te=hn(K.path);return b`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${K.path}"
            >${Te}</span
          >
          ${G(N,H)}
          ${F(W)}
          ${a?b`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return b`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${Z.map(K=>b`
              <option
                value="${K.path}"
                ?selected=${K.path===W}
                title="${K.path}"
              >
                ${hn(K.path)}
              </option>
            `)}
        </select>
        ${G(N,H)}
        ${F(W)}
        ${l||a?b`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function f(){ue(E(),t)}return f(),i=e.subscribe(()=>f()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",w),ue(b``,t)}}}var _o=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-remove","worker-attempt-stop","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function gn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function yo(t,e,r=gn()){return{id:r,type:t,payload:e}}function ko(t={}){let e=ye("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,d=new Map,p=[],h=new Map,y=new Set;function w(E){for(let f of Array.from(y))try{f(E)}catch{}}function k(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),w(o);let E=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),f=(r.jitterRatio||0)*E,_=Math.max(0,Math.round(E+(Math.random()*2-1)*f));e("ws retry in %d ms (attempt %d)",_,i+1),l=setTimeout(()=>{l=null,G()},_)}function S(E){try{s?.send(JSON.stringify(E))}catch(f){e("ws send failed",f)}}function L(){for(o="open",e("ws open"),w(o),i=0;p.length;){let E=p.shift();E&&S(E)}}function M(E){let f;try{f=JSON.parse(String(E.data))}catch{e("ws received non-JSON message");return}if(!f||typeof f.id!="string"||typeof f.type!="string"){e("ws received invalid envelope");return}if(d.has(f.id)){let C=d.get(f.id);d.delete(f.id),f.ok?C?.resolve(f.payload):C?.reject(f.error||new Error("ws error"));return}let _=h.get(f.type);if(_&&_.size>0)for(let C of Array.from(_))try{C(f.payload)}catch(N){e("ws event handler error",N)}else e("ws received unhandled message type: %s",f.type)}function F(){o="closed",e("ws closed"),w(o);for(let[E,f]of d.entries())f.reject(new Error("ws disconnected")),d.delete(E);i+=1,k()}function G(){if(!a)return;let E=n();try{s=new WebSocket(E),e("ws connecting %s",E),o="connecting",w(o),s.addEventListener("open",L),s.addEventListener("message",M),s.addEventListener("error",()=>{}),s.addEventListener("close",F)}catch(f){e("ws connect failed %o",f),k()}}return G(),{send(E,f){if(!_o.includes(E))return Promise.reject(new Error(`unknown message type: ${E}`));let _=gn(),C=yo(E,f,_);return e("send %s id=%s",E,_),new Promise((N,H)=>{d.set(_,{resolve:N,reject:H,type:E}),s&&s.readyState===s.OPEN?S(C):(e("queue %s id=%s (state=%s)",E,_,o),p.push(C))})},on(E,f){h.has(E)||h.set(E,new Set);let _=h.get(E);return _?.add(f),()=>{_?.delete(f)}},onConnection(E){return y.add(E),()=>{y.delete(E)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,G()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function tl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function rl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var mn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],wo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],vo="worker:queue",xo="ui:order",$o="ui:display-policy",ct="tab:board:closed",So="beads-ui.board.closed-range";function nl(t){let e=ye("main");e("bootstrap start");let r=b`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ue(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let N=function(m,g){let z="Request failed",U="";if(m&&typeof m=="object"){let be=m;if(typeof be.message=="string"&&be.message.length>0&&(z=be.message),typeof be.details=="string")U=be.details;else if(be.details&&typeof be.details=="object")try{U=JSON.stringify(be.details,null,2)}catch{U=""}}else typeof m=="string"&&m.length>0&&(z=m);let Q=g&&g.length>0?`Failed to load ${g}`:"Request failed";C.open(Q,z,U)},P=function(m){return`${V.getState().workspace.current?.path||""}\0${m}`},J=function(){se&&(se().catch(()=>{}),se=null),We=null,Pe=null},ce=function(m){je=m;let g=()=>{je!==m||V.getState().selected_id!==m||(je=null,pe(m))};if(!I){A.then(g);return}g()},Fe=function(){let m=Fn(Ce);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},ke=function(m){if(m)for(let[g,z]of mn){if(ie.has(g)||fe.has(g))continue;let U=g===ct?Fe():{type:z};try{K.register(g,U)}catch(Q){e("register %s store failed: %o",g,Q)}fe.add(g),Z.subscribeList(g,U).then(Q=>{ie.set(g,Q)}).catch(Q=>{e("subscribe %s failed: %o",g,Q),N(Q,"board")}).finally(()=>{fe.delete(g)})}else Se()},Se=function(){for(let[m]of mn){let g=ie.get(m);g&&(g().catch(()=>{}),ie.delete(m));try{K.unregister(m)}catch(z){e("unregister %s failed: %o",m,z)}}},_e=function(m){if(!m){xe();return}for(let[g,z]of wo)if(!(ve.has(g)||fe.has(g))){try{K.register(g,{type:z})}catch(U){e("register %s store failed: %o",g,U)}fe.add(g),Z.subscribeList(g,{type:z}).then(U=>{ve.set(g,U)}).catch(U=>{e("subscribe %s failed: %o",g,U),N(U,"worker")}).finally(()=>{fe.delete(g)})}D||(W("subscribe-worker-queue",{id:vo}).catch(g=>{e("subscribe-worker-queue failed: %o",g)}),D=()=>W("unsubscribe-worker-queue",{id:vo}))},xe=function(){for(let[m]of wo){let g=ve.get(m);g&&(g().catch(()=>{}),ve.delete(m));try{K.unregister(m)}catch(z){e("unregister %s failed: %o",m,z)}}D&&(D().catch(()=>{}),D=null)},Je=function(){Be||(W("subscribe-ui-order",{id:xo}).catch(m=>{e("subscribe-ui-order failed: %o",m)}),Be=()=>W("unsubscribe-ui-order",{id:xo}))},Ae=function(){Be&&(Be().catch(()=>{}),Be=null),he.clear()},Ie=function(){ze||(W("subscribe-display-policy",{id:$o}).catch(m=>{e("subscribe-display-policy failed: %o",m)}),ze=()=>W("unsubscribe-display-policy",{id:$o}))},Le=function(){ze&&(ze().catch(()=>{}),ze=null),qe.clear()},R=function(m){if(!m)return"Unknown";let g=m.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var l=N,a=P,d=J,p=ce,h=Fe,y=ke,w=Se,k=_e,S=xe,L=Je,M=Ae,F=Ie,G=Le,E=R;let f=document.getElementById("header-loading"),_=as(f),C=ao(t),H=ko(),W=_.wrapSend((m,g)=>H.send(m,g)),Z=es(W),K=ts(),Te=ns(),he=rs(),qe=Bn(),Ge=zn();H.on("worker-queue-snapshot",m=>{let g=m;if(g&&g.queue)try{Te.set(g.queue)}catch{}}),H.on("ui-order-snapshot",m=>{let g=m;if(g&&typeof g.revision=="number")try{he.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),H.on("display-policy-snapshot",m=>{let g=m;if(g&&g.policy&&typeof g.policy=="object")try{qe.set(g.policy)}catch{}}),H.on("session-log-snapshot",m=>{let g=m;if(g&&typeof g.attempt_id=="string")try{Ge.set(g.attempt_id,Array.isArray(g.lines)?g.lines:[])}catch{}}),H.on("session-log-append",m=>{let g=m;if(g&&typeof g.attempt_id=="string")try{Ge.append(g.attempt_id,g.event)}catch{}}),H.on("snapshot",m=>{let g=m,z=g&&typeof g.id=="string"?g.id:"",U=z?K.getStore(z):null;if(U&&g&&g.type==="snapshot")try{U.applyPush(g)}catch{}}),H.on("upsert",m=>{let g=m,z=g&&typeof g.id=="string"?g.id:"",U=z?K.getStore(z):null;if(U&&g&&g.type==="upsert")try{U.applyPush(g)}catch{}}),H.on("delete",m=>{let g=m,z=g&&typeof g.id=="string"?g.id:"",U=z?K.getStore(z):null;if(U&&g&&g.type==="delete")try{U.applyPush(g)}catch{}});let se=null,We=null,Pe=null,je=null,oe=()=>{},A=new Promise(m=>{oe=()=>m(void 0)}),I=!1,j=!1;async function pe(m){let g=P(m);if(g===We||g===Pe)return;Pe=g;let z=`detail:${m}`,U={type:"issue-detail",params:{id:m}};try{K.register(z,U)}catch(Q){e("register detail store failed: %o",Q)}try{let Q=await Z.subscribeList(z,U);if(V.getState().selected_id!==m||P(m)!==g){await Q().catch(()=>{});return}se&&await se().catch(()=>{}),se=Q,We=g}catch(Q){e("detail subscribe failed: %o",Q),N(Q,"issue details")}finally{Pe===g&&(Pe=null)}}let ie=new Map,fe=new Set,Ce=rr;try{let m=window.localStorage.getItem(So);Mr(m)&&(Ce=m)}catch{}async function Ye(m){if(!Mr(m)||m===Ce)return;Ce=m;try{window.localStorage.setItem(So,m)}catch{}let g=ie.get(ct);if(!g)return;ie.delete(ct),await g().catch(()=>{});let z=Fe();try{K.register(ct,z)}catch(U){e("register %s store failed: %o",ct,U)}try{let U=await Z.subscribeList(ct,z);ie.set(ct,U)}catch(U){e("re-subscribe %s failed: %o",ct,U),N(U,"board")}}let ve=new Map,D=null,Be=null,ze=null;async function v(){e("clearing all subscriptions for workspace switch"),Se(),xe(),Te.clear(),Ae(),Je(),Le(),Ie(),J();let m=V.getState();if(m.selected_id)try{K.unregister(`detail:${m.selected_id}`)}catch{}let g=V.getState();ke(g.view==="board"),_e(g.view==="worker"),g.selected_id&&ce(g.selected_id)}async function u(m){e("requesting workspace switch to %s",m),j=!0;try{let g=await H.send("set-workspace",{path:m});e("workspace switch result: %o",g),g&&g.workspace&&(V.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),g.changed&&(await v(),le("Switched to "+R(m),"success",2e3)))}catch(g){throw e("workspace switch failed: %o",g),le("Failed to switch workspace","error",3e3),g}finally{j=!1}}async function $(m){e("requesting workspace git pull for %s",m);try{let g=await H.send("git-pull-workspace",{});e("workspace git pull result: %o",g);let z=g?.status;if(z==="up_to_date"){le("Already up to date","success",2e3);return}if(z==="stash_pop_conflict"){le("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}le("Git pulled "+R(m),"success",2e3)}catch(g){e("workspace git pull failed: %o",g);let z=g?.code,U=g?.message;if(z==="rebase_conflict"){le("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(z==="rebase_conflict_abort_failed"){le("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(z==="busy"){le("Git pull skipped: another operation is running","warning",3e3);return}let Q=U?`: ${U}`:"";throw le(`Git pull failed${Q}`,"error",3e3),g}}async function x(m,g){e("setting workspace visibility %s \u2192 %s",m,String(g));try{await H.send("set-workspace-visibility",{path:m,visible:g}),await Y()}catch(z){e("workspace visibility update failed: %o",z),le("Failed to update project visibility","error",3e3)}}async function Y(){try{let m=await H.send("list-workspaces",{});if(e("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let g=m.workspaces.map(be=>({path:be.path,database:be.database,pid:be.pid,version:be.version})),z=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,U=Array.isArray(m.hidden)?m.hidden.filter(be=>typeof be=="string"):[];V.setState({workspace:{current:z,available:g,hidden:U}});let Q=window.localStorage.getItem("beads-ui.workspace");Q&&(!g.some(er=>er.path===Q)||U.includes(Q)?window.localStorage.removeItem("beads-ui.workspace"):z&&Q!==z.path&&(e("restoring saved workspace preference: %s",Q),await u(Q)))}}catch(m){e("failed to load workspaces: %o",m)}}H.on("workspace-changed",m=>{e("workspace-changed event: %o",m),m&&m.root_dir&&(V.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),Y(),v())});let re=!1;if(typeof H.onConnection=="function"){let m=g=>{e("ws state %s",g),g==="reconnecting"||g==="closed"?(re=!0,le("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&re&&(re=!1,le("Reconnected","success",2200),rl(V,(z,U)=>{e(`${z}: %o`,U)}),ze=null,Ie())};H.onConnection(m)}let de="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker")&&(de=m)}catch(m){e("view parse error: %o",m)}let V=is({config:tl(),view:de}),ee=ss(V);ee.start();let me=async(m,g)=>{try{return await W(m,g)}catch{return[]}};n&&lo(n,V,ee);let q=document.getElementById("workspace-picker");q&&bo(q,V,u,$,x);let et=fo(t,(m,g)=>W(m,g));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>et.open())}catch{}let vr=io(t,{policyStore:qe,transport:(m,g)=>W(m,g),labelOptions:()=>{let m=new Set;for(let[g]of mn)for(let z of K.snapshotFor(g)||[]){let U=z.labels;if(Array.isArray(U))for(let Q of U)typeof Q=="string"&&Q.length>0&&m.add(Q)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>vr.open())}catch{}let kt=gs(s,{gotoIssue:m=>ee.gotoIssue(m),issueStores:K,transport:me,uiOrderStore:he,displayPolicyStore:qe,closedRange:Ce,onClosedRangeChange:m=>{Ye(m)},onNewIssue:()=>et.open()}),wt=fn(o,{transport:me,issueStores:K,queueStore:Te,sessionLogStore:Ge,uiOrderStore:he,gotoIssue:m=>V.setState({selected_id:m})}),Dt=so(i,{issueStores:K,transport:me,queueStore:Te,sessionLogStore:Ge,getWorkspacePath:()=>V.getState().workspace.current?.path,onNavigate:m=>{V.getState().view==="worker"?V.setState({selected_id:m}):ee.gotoIssue(m)},onClose:()=>{let m=V.getState();V.setState({selected_id:null});try{ee.gotoView(m.view==="worker"?"worker":"board")}catch{}}}),rt=V.getState().selected_id;rt&&(i.hidden=!1,Dt.load(rt),ce(rt)),V.subscribe(m=>{let g=m.selected_id;g?(i.hidden=!1,Dt.load(g),j||ce(g)):(Dt.clear(),i.hidden=!0,J())});let Jt=m=>{s.hidden=m.view!=="board",o.hidden=m.view!=="worker",ke(m.view==="board"),_e(m.view==="worker"),!m.selected_id&&m.view==="board"&&kt.load(),m.view==="worker"&&wt.load(),window.localStorage.setItem("beads-ui.view",m.view)};V.subscribe(Jt),Jt(V.getState()),Je(),Ie(),Y().finally(()=>{I=!0,oe()}),window.addEventListener("keydown",m=>{let g=m.ctrlKey||m.metaKey,z=String(m.key||"").toLowerCase(),U=m.target,Q=U&&U.tagName?String(U.tagName).toLowerCase():"",be=Q==="input"||Q==="textarea"||Q==="select"||U&&typeof U.isContentEditable=="boolean"&&U.isContentEditable;g&&z==="n"&&(be||(m.preventDefault(),et.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&nl(e)});export{nl as bootstrap,tl as readBootstrapConfig,rl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
