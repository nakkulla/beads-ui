var ji=Object.create;var _n=Object.defineProperty;var Yi=Object.getOwnPropertyDescriptor;var Vi=Object.getOwnPropertyNames;var Ki=Object.getPrototypeOf,Zi=Object.prototype.hasOwnProperty;var Xi=(t,e,r)=>e in t?_n(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var gn=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Qi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Vi(e))!Zi.call(t,s)&&s!==r&&_n(t,s,{get:()=>e[s],enumerable:!(n=Yi(e,s))||n.enumerable});return t};var Ji=(t,e,r)=>(r=t!=null?ji(Ki(t)):{},Qi(e||!t||!t.__esModule?_n(r,"default",{value:t,enumerable:!0}):r,t));var ve=(t,e,r)=>Xi(t,typeof e!="symbol"?e+"":e,r);var Us=gn((cd,Bs)=>{var sr=1e3,or=sr*60,ir=or*60,Gt=ir*24,sa=Gt*7,oa=Gt*365.25;Bs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return ia(t);if(r==="number"&&isFinite(t))return e.long?la(t):aa(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function ia(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*oa;case"weeks":case"week":case"w":return r*sa;case"days":case"day":case"d":return r*Gt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*ir;case"minutes":case"minute":case"mins":case"min":case"m":return r*or;case"seconds":case"second":case"secs":case"sec":case"s":return r*sr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function aa(t){var e=Math.abs(t);return e>=Gt?Math.round(t/Gt)+"d":e>=ir?Math.round(t/ir)+"h":e>=or?Math.round(t/or)+"m":e>=sr?Math.round(t/sr)+"s":t+"ms"}function la(t){var e=Math.abs(t);return e>=Gt?Hr(t,e,Gt,"day"):e>=ir?Hr(t,e,ir,"hour"):e>=or?Hr(t,e,or,"minute"):e>=sr?Hr(t,e,sr,"second"):t+" ms"}function Hr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Hs=gn((dd,zs)=>{function ca(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Us(),r.destroy=c,Object.keys(t).forEach(f=>{r[f]=t[f]}),r.names=[],r.skips=[],r.formatters={};function e(f){let h=0;for(let w=0;w<f.length;w++)h=(h<<5)-h+f.charCodeAt(w),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(f){let h,w=null,$,v;function C(...E){if(!C.enabled)return;let P=C,q=Number(new Date),F=q-(h||q);P.diff=F,P.prev=h,P.curr=q,h=q,E[0]=r.coerce(E[0]),typeof E[0]!="string"&&E.unshift("%O");let R=0;E[0]=E[0].replace(/%([a-zA-Z%])/g,(A,x)=>{if(A==="%%")return"%";R++;let g=r.formatters[x];if(typeof g=="function"){let U=E[R];A=g.call(P,U),E.splice(R,1),R--}return A}),r.formatArgs.call(P,E),(P.log||r.log).apply(P,E)}return C.namespace=f,C.useColors=r.useColors(),C.color=r.selectColor(f),C.extend=n,C.destroy=r.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>w!==null?w:($!==r.namespaces&&($=r.namespaces,v=r.enabled(f)),v),set:E=>{w=E}}),typeof r.init=="function"&&r.init(C),C}function n(f,h){let w=r(this.namespace+(typeof h>"u"?":":h)+f);return w.log=this.log,w}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let h=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let w of h)w[0]==="-"?r.skips.push(w.slice(1)):r.names.push(w)}function o(f,h){let w=0,$=0,v=-1,C=0;for(;w<f.length;)if($<h.length&&(h[$]===f[w]||h[$]==="*"))h[$]==="*"?(v=$,C=w,$++):(w++,$++);else if(v!==-1)$=v+1,C++,w=C;else return!1;for(;$<h.length&&h[$]==="*";)$++;return $===h.length}function i(){let f=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),f}function l(f){for(let h of r.skips)if(o(f,h))return!1;for(let h of r.names)if(o(f,h))return!0;return!1}function a(f){return f instanceof Error?f.stack||f.message:f}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}zs.exports=ca});var Ws=gn((pt,Wr)=>{pt.formatArgs=ua;pt.save=pa;pt.load=fa;pt.useColors=da;pt.storage=ha();pt.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();pt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function da(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ua(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+Wr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}pt.log=console.debug||console.log||(()=>{});function pa(t){try{t?pt.storage.setItem("debug",t):pt.storage.removeItem("debug")}catch{}}function fa(){let t;try{t=pt.storage.getItem("debug")||pt.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function ha(){try{return localStorage}catch{}}Wr.exports=Hs()(pt);var{formatters:_a}=Wr.exports;_a.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var gr=globalThis,Ur=gr.trustedTypes,Es=Ur?Ur.createPolicy("lit-html",{createHTML:t=>t}):void 0,Os="$lit$",Lt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ms="?"+Lt,ea=`<${Ms}>`,Ht=document,mr=()=>Ht.createComment(""),br=t=>t===null||typeof t!="object"&&typeof t!="function",$n=Array.isArray,ta=t=>$n(t)||typeof t?.[Symbol.iterator]=="function",mn=`[ 	
\f\r]`,_r=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Cs=/-->/g,Rs=/>/g,Ut=RegExp(`>|${mn}(?:([^\\s"'>=/]+)(${mn}*=${mn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Is=/'/g,Ls=/"/g,Ns=/^(?:script|style|textarea|title)$/i,xn=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=xn(1),nd=xn(2),sd=xn(3),Wt=Symbol.for("lit-noChange"),Pe=Symbol.for("lit-nothing"),Ds=new WeakMap,zt=Ht.createTreeWalker(Ht,129);function Ps(t,e){if(!$n(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Es!==void 0?Es.createHTML(e):e}var ra=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=_r;for(let l=0;l<r;l++){let a=t[l],c,f,h=-1,w=0;for(;w<a.length&&(i.lastIndex=w,f=i.exec(a),f!==null);)w=i.lastIndex,i===_r?f[1]==="!--"?i=Cs:f[1]!==void 0?i=Rs:f[2]!==void 0?(Ns.test(f[2])&&(s=RegExp("</"+f[2],"g")),i=Ut):f[3]!==void 0&&(i=Ut):i===Ut?f[0]===">"?(i=s??_r,h=-1):f[1]===void 0?h=-2:(h=i.lastIndex-f[2].length,c=f[1],i=f[3]===void 0?Ut:f[3]==='"'?Ls:Is):i===Ls||i===Is?i=Ut:i===Cs||i===Rs?i=_r:(i=Ut,s=void 0);let $=i===Ut&&t[l+1].startsWith("/>")?" ":"";o+=i===_r?a+ea:h>=0?(n.push(c),a.slice(0,h)+Os+a.slice(h)+Lt+$):a+Lt+(h===-2?l:$)}return[Ps(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},wr=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,f]=ra(e,r);if(this.el=t.createElement(c,n),zt.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=zt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Os)){let w=f[i++],$=s.getAttribute(h).split(Lt),v=/([.?@])?(.*)/.exec(w);a.push({type:1,index:o,name:v[2],strings:$,ctor:v[1]==="."?wn:v[1]==="?"?kn:v[1]==="@"?yn:rr}),s.removeAttribute(h)}else h.startsWith(Lt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Ns.test(s.tagName)){let h=s.textContent.split(Lt),w=h.length-1;if(w>0){s.textContent=Ur?Ur.emptyScript:"";for(let $=0;$<w;$++)s.append(h[$],mr()),zt.nextNode(),a.push({type:2,index:++o});s.append(h[w],mr())}}}else if(s.nodeType===8)if(s.data===Ms)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(Lt,h+1))!==-1;)a.push({type:7,index:o}),h+=Lt.length-1}o++}}static createElement(e,r){let n=Ht.createElement("template");return n.innerHTML=e,n}};function tr(t,e,r=t,n){if(e===Wt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=br(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=tr(t,s._$AS(t,e.values),s,n)),e}var bn=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??Ht).importNode(r,!0);zt.currentNode=s;let o=zt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new kr(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new vn(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=zt.nextNode(),i++)}return zt.currentNode=Ht,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},kr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Pe,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=tr(this,e,r),br(e)?e===Pe||e==null||e===""?(this._$AH!==Pe&&this._$AR(),this._$AH=Pe):e!==this._$AH&&e!==Wt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ta(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Pe&&br(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ht.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=wr.createElement(Ps(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new bn(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=Ds.get(e.strings);return r===void 0&&Ds.set(e.strings,r=new wr(e)),r}k(e){$n(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(mr()),this.O(mr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},rr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=Pe,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Pe}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=tr(this,e,r,0),i=!br(e)||e!==this._$AH&&e!==Wt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=tr(this,l[n+a],r,a),c===Wt&&(c=this._$AH[a]),i||(i=!br(c)||c!==this._$AH[a]),c===Pe?e=Pe:e!==Pe&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===Pe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},wn=class extends rr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Pe?void 0:e}},kn=class extends rr{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Pe)}},yn=class extends rr{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=tr(this,e,r,0)??Pe)===Wt)return;let n=this._$AH,s=e===Pe&&n!==Pe||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Pe&&(n===Pe||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},vn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){tr(this,e)}};var na=gr.litHtmlPolyfillSupport;na?.(wr,kr),(gr.litHtmlVersions??(gr.litHtmlVersions=[])).push("3.3.1");var he=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new kr(e.insertBefore(mr(),o),o,void 0,r??{})}return s._$AI(t),s};var Dt="today",yr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function nr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function zr(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Fs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function qs(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var Gs=Ji(Ws(),1);function Ce(t){return(0,Gs.default)(`beads-ui:${t}`)}function wt(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function jt(t,e){let r=wt(t.created_at),n=wt(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Vs(t,e){let r=wt(t.created_at),n=wt(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Ks(t,e){let r=wt(t.updated_at),n=wt(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function Zs(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=wt(t.created_at),o=wt(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Xs(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var ga=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function js(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ys(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=ga.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Qs(t,e){let r=js(t),n=js(e);if(r!==n)return r<n?-1:1;let s=Ys(t),o=Ys(e);if(s!==o)return s<o?-1:1;let i=wt(t&&t.created_at),l=wt(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var Sn=2**20;function ar(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-wt(t&&t.created_at)}function Gr(t){return(e,r)=>{let n=ar(e,t),s=ar(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Tn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:ar(l,r)-Sn};if(!l)return{rank:ar(i,r)+Sn};let a=ar(i,r),c=ar(l,r),f=(a+c)/2;return a<f&&f<c?{rank:f}:{renormalize:n.map((h,w)=>({bead_id:h.id,rank:w*Sn}))}}function An(t,e={}){let r=Ce(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||jt;function c(){for(let w of Array.from(i))try{w()}catch{}}function f(){s=Array.from(n.values()).sort(a)}function h(w){if(l||!w||w.id!==t)return;let $=Number(w.revision)||0;if(r("apply %s rev=%d",w.type,$),!($<=o&&w.type!=="snapshot")){if(w.type==="snapshot"){if($<=o)return;n.clear();let v=Array.isArray(w.issues)?w.issues:[];for(let C of v)C&&typeof C.id=="string"&&C.id.length>0&&n.set(C.id,C);f(),o=$,c();return}if(w.type==="upsert"){let v=w.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let C=n.get(v.id);if(!C)n.set(v.id,v);else{let E=Number.isFinite(C.updated_at)?C.updated_at:0,P=Number.isFinite(v.updated_at)?v.updated_at:0;if(E<=P){for(let q of Object.keys(C))q in v||delete C[q];for(let[q,F]of Object.entries(v))C[q]=F}}f()}o=$,c()}else if(w.type==="delete"){let v=String(w.issue_id||"");v&&(n.delete(v),f()),o=$,c()}}}return{id:t,subscribe(w){return i.add(w),()=>{i.delete(w)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(w){return n.get(w)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function jr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function Js(t){let e=Ce("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let f=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],w=Array.isArray(a.removed)?a.removed:[];for(let $ of Array.from(c)){let v=r.get($);if(!v)continue;let C=v.itemsById;for(let E of f)typeof E=="string"&&E.length>0&&C.set(E,!0);for(let E of h)typeof E=="string"&&E.length>0&&C.set(E,!0);for(let E of w)typeof E=="string"&&E.length>0&&C.delete(E)}}async function o(l,a){let c=jr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let w=n.get(h.key);w&&(w.delete(l),w.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let f=n.get(c);f&&f.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let w=r.get(l)||null;if(w){let $=n.get(w.key);$&&($.delete(l),$.size===0&&n.delete(w.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let w=n.get(h.key);w&&(w.delete(l),w.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:jr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let f of a.itemsById.keys())c[f]=!0;return c}}}}function eo(){let t=Ce("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,f){let h=c?jr(c):"",w=r.get(a)||"",$=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,w),$&&w&&h&&w!==h){let v=e.get(a);if(v)try{v.dispose()}catch{}let C=s.get(a);if(C){try{C()}catch{}s.delete(a)}let E=An(a,f);e.set(a,E);let P=E.subscribe(()=>o());s.set(a,P)}else if(!$){let v=An(a,f);e.set(a,v);let C=v.subscribe(()=>o());s.set(a,C)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let f=s.get(a);if(f){try{f()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function to(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ro(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function En(t,e){return`#/${t==="worker"||t==="monitor"?t:"board"}?issue=${encodeURIComponent(e)}`}function ma(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ba(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":/^#\/monitor(\b|\/|$)/.test(e)?"monitor":"board"}function no(t){let e=Ce("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):ma(n),i=ba(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=t.getState?t.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=En(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?En(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var wa=Object.freeze({workspace_config:{default_workspace:null}});function so(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:wa.workspace_config.default_workspace}}}function oo(t={}){let e=Ce("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:so(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?so(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,f)=>c!==r.workspace.hidden[f]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,f)=>c===r.worker.show_closed_children[f])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function io(t){let e=Ce("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,w)=>{let $=s++,v=Date.now();n.set($,{type:h,start_ts:v}),e("request start id=%d type=%s count=%d",$,h,r+1),i();let C=!1,E=()=>{C||(C=!0,n.delete($),l())},P=setTimeout(()=>{C||(e("request TIMEOUT id=%d type=%s elapsed=%dms",$,h,Date.now()-v),E())},3e4);try{let q=await c(h,w),F=Date.now()-v;return e("request done id=%d type=%s elapsed=%dms",$,h,F),q}catch(q){let F=Date.now()-v;throw e("request error id=%d type=%s elapsed=%dms err=%o",$,h,F,q),q}finally{clearTimeout(P),E()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([f,h])=>({id:f,type:h.type,elapsed_ms:c-h.start_ts}))}}}function Q(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Yr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Xs),a;switch(l){case"created_desc":return a.sort(jt),a;case"created_asc":return a.sort(Vs),a;case"updated_desc":return a.sort(Ks),a;case"priority":return a.sort(Zs),a;case"manual":default:{let c=r();return c?a.sort(Gr(c)):a.sort(jt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Ot(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function ft(t){let e=Ot(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Ct(t,e){let r=Ot(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function lr(t){if(!Array.isArray(t))return null;let e=null,r=-1;for(let n of t){if(!n||n.status!=="in_progress")continue;let s=Ot(n.updated_at)??0;if(e===null||s>r){e=n,r=s;continue}s===r&&String(n.id)<String(e.id)&&(e=n)}return e}function Vr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},f=n(Tn(l,a,c.order),i);s(c,f);let h=await e("ui-order-set",{expected_revision:c.revision,entries:f});if(h&&h.conflict){let w={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(w);let $=n(Tn(l,a,w.order),i);s(w,$);let v=await e("ui-order-set",{expected_revision:w.revision,entries:$});v&&v.applied&&r.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function Kr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Cn(t,e){return!e||typeof t!="string"||t.length===0||Kr(e.visible_labels).includes(t)?!0:Kr(e.hidden_labels).includes(t)?!1:!Kr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function ao(t,e){return Kr(t).filter(r=>Cn(r,e))}function Yt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}var ka={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},lo={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},ya={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},va={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function $a(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t){let o=e[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function xa(t){let e=t&&t.fill||"none";return e==="none"?cr.none:t&&t.stale===!0?cr.stale:e==="dim"?cr.dim:t&&t.glyph==="review"?cr.review:t&&t.glyph==="skip"?cr.skip:cr.done}function Sa(t,e,r){let n=ka[t]||t,s=e&&e.fill||"none",o=!!e&&e.stale===!0,i=va[e&&e.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let a=s==="none"?"lbl":`lbl l-${n} on`,c=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${l} style=${c}>${i}</div>
      <div class=${a}>
        ${lo[t]||t}
      </div>
    </div>
  `}function Zr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=ya[r],s=t.stages,o=$a(n,s,String(e||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(l=>`${lo[l]||l} ${xa(s[l]||{})}`).join(" \xB7 ")}`;return d`
    <div class="stp" role="img" aria-label=${i}>
      ${n.map(l=>Sa(l,s[l]||{},l===o))}
    </div>
  `}function Ta(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var co=2;function Aa(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,co).join(", "),s=r.length-co,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function Ea(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&Yt(r,"route")){let o=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Yt(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Yt(r,"pr")){let o=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of ao(t.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&Yt(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),Yt(r,"blocked")&&s.push(...Aa(t.blocked_info)),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function Ca(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Ra(t){let e=Ct(t.created_at),r=Ct(t.updated_at);return!e&&!r?"":d`<span class="board-card__times">
    ${e?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ft(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ft(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Ia(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(Qs):r.children;return d`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?d`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:d`<span class="board-card__roll-none">children 없음</span>`}
        ${Ra(t)}
      </div>
      ${n>0&&r.current?d`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?d`<div class="board-card__roll-list">
            ${o.map((i,l)=>d`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${Ca(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function uo(t,e){let r=Ta(t.priority);return d`
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
        ${r?d`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Ea(t,e)}
      ${t.workflow&&Yt(e.policy||null,"stepper")?Zr(t.workflow,t.status):""}
      ${Ia(t,e)}
    </article>
  `}function Vt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return d`
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
        ${n?d`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${yr.map(o=>d`<option
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
        ${t.items.map(o=>uo(o,e))}
      </div>
    </section>
  `}var La=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Da=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Oa=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Ma(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
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
      ${r.label_menu_open?d`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?d`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>d`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?d`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function po(t,e,r){return d`
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
        ${La.map(n=>d`<option
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
        ${Da.map(n=>d`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Ma(t,e,r)}
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
        ${Oa.map(n=>d`<option
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
  `}var Na=200,Pa={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Fa=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),fo="beads-ui.board.sort",ho=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function qa(){try{let t=window.localStorage.getItem(fo);if(t&&ho.has(t))return t}catch{}return"created_desc"}function _o(t,e){let r=Ce("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,f=e.closedRange||Dt,h=s?Yr(s,i):null,w=Vr({transport:o,uiOrderStore:i}),$=[],v=[],C=[],E=[],P=[],q=[],F=!1,R=0,T=qa(),A=new Map,x=new Map,g=new Map,U=new Set,W={search:"",priority:"",type:"",labels:[]},j=!1,te=null;function Re(L){return String(L.status||"open")==="open"}function Ye(L){let N=String(L.status||"open");return N==="open"||N==="blocked"}function $e(L){let N=W.search.trim().toLowerCase(),K=W.priority,G=W.type,Z=W.labels;return L.filter(oe=>{if(N){let ce=String(oe.id||"").toLowerCase(),_e=String(oe.title||"").toLowerCase();if(!ce.includes(N)&&!_e.includes(N))return!1}if(K!==""&&String(oe.priority)!==K||G!==""&&String(oe.issue_type||"")!==G)return!1;if(Z.length>0){let ce=Array.isArray(oe.labels)?oe.labels:[];if(!Z.some(_e=>ce.includes(_e)))return!1}return!0})}function ee(){let L=new Set;for(let N of[$,v,C,E,P,q])for(let K of N){let G=Array.isArray(K.labels)?K.labels:[];for(let Z of G)typeof Z=="string"&&Z.length>0&&L.add(Z)}return Array.from(L).sort()}function ae(){return W.search.trim()!==""||W.priority!==""||W.type!==""||W.labels.length>0}function Ae(){try{if(h){let L=h.selectBoardColumn("tab:board:in-progress","in_progress",T),N=h.selectBoardColumn("tab:board:blocked","blocked",T).filter(Ye),K=new Set(L.map(S=>S.id)),G=h.selectBoardColumn("tab:board:ready","ready",T).filter(S=>Re(S)&&!K.has(S.id)),Z=h.selectBoardColumn("tab:board:resolved","resolved",T),oe=h.selectBoardColumn("tab:board:deferred","deferred",T),ce=F?oe:[],_e=h.selectBoardColumn("tab:board:closed","closed").slice(0,Na),J=[...N,...G,...L,...Z,...ce,..._e];xe(J);let k=new Set;for(let S of J)S&&S.id&&!Rn(S)&&k.add(S.id);let M=!ae();$=M?dr(N,k):N,v=M?dr(G,k):G,C=M?dr(L,k):L,E=M?dr(Z,k):Z,P=M?dr(ce,k):ce,R=oe.length,q=M?dr(_e,k):_e,A=new Map;for(let S of $)A.set(S.id,"open");for(let S of v)A.set(S.id,"open");for(let S of C)A.set(S.id,"in_progress");for(let S of E)A.set(S.id,"resolved");for(let S of P)A.set(S.id,"deferred");for(let S of q)A.set(S.id,"closed");x=new Map;for(let S of $)x.set(S.id,"blocked-col");for(let S of v)x.set(S.id,"ready-col");for(let S of C)x.set(S.id,"in-progress-col");for(let S of E)x.set(S.id,"resolved-col");for(let S of P)x.set(S.id,"deferred-col");for(let S of q)x.set(S.id,"closed-col")}Ee()}catch{$=[],v=[],C=[],E=[],P=[],q=[],g=new Map,Ee()}}function xe(L){let N=new Map;for(let G of L)G&&G.id&&!N.has(G.id)&&N.set(G.id,G);let K=new Map;for(let G of N.values()){let Z=Rn(G);if(!Z)continue;let oe=K.get(Z);oe||(oe=[],K.set(Z,oe)),oe.push({id:G.id,title:G.title,status:G.status,metadata:G.metadata,created_at:G.created_at,updated_at:G.updated_at})}g=K}function ct(L){let N=g.get(L)||[],K=0;for(let Z of N)(Z.status==="resolved"||Z.status==="closed")&&(K+=1);let G=lr(N);return{total:N.length,count:K,current:G,children:N}}function me(L){return!U.has(L)}function Fe(L,N){L.preventDefault(),L.stopPropagation(),U.has(N)?U.delete(N):U.add(N),Ee()}function be(L,N){L.preventDefault(),L.stopPropagation(),n(N)}function Ze(L,N){L.preventDefault(),L.stopPropagation(),n(N)}function fe(L,N){te||n(N)}function Oe(L,N){L.preventDefault(),L.stopPropagation(),Ba(N).then(K=>{K&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function dt(L,N){te=N,L.dataTransfer&&(L.dataTransfer.setData("text/plain",N),L.dataTransfer.effectAllowed="move"),L.target.classList.add("board-card--dragging")}function Ve(L){L.target.classList.remove("board-card--dragging"),ht(),setTimeout(()=>{te=null},0)}function $t(L){let N=String(L.target.value||"");!N||N===f||(f=N,a&&a(N),Ee())}let We={onCardClick:fe,onCopyId:Oe,onDragStart:dt,onDragEnd:Ve,onClosedRangeChange:$t,rollupFor:ct,isExpanded:me,onRollupToggle:Fe,onChildClick:be,onFromChipClick:Ze,get policy(){return l?l.get():null}};function ut(L){let N=L.target,K=t.querySelector(".board-filter__labels");N&&K&&K.contains(N)||Je()}function Qe(L){L.key==="Escape"&&Je()}function Ke(){j||(j=!0,document.addEventListener("mousedown",ut),document.addEventListener("keydown",Qe),Ee())}function Je(){j&&(j=!1,document.removeEventListener("mousedown",ut),document.removeEventListener("keydown",Qe),Ee())}let Ge={onSearchInput(L){W.search=String(L.target.value||""),Ae()},onPriorityChange(L){W.priority=String(L.target.value||""),Ae()},onTypeChange(L){W.type=String(L.target.value||""),Ae()},onSortChange(L){let N=String(L.target.value||"");if(!(!ho.has(N)||N===T)){T=N;try{window.localStorage.setItem(fo,N)}catch{}Ae()}},onDeferredToggle(){F=!F,Ae()},onLabelMenuToggle(){j?Je():Ke()},onLabelToggle(L){let N=W.labels.indexOf(L);N===-1?W.labels.push(L):W.labels.splice(N,1),Ae()},onLabelClear(){W.labels.length!==0&&(W.labels=[],Ae())},onNewIssue(){c&&c()}};function ze(){let L=F?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${po(W,Ge,{sort_mode:T,show_deferred:F,deferred_count:R,label_options:ee(),label_menu_open:j})}
        <div class=${L}>
          ${Vt({title:"Blocked",id:"blocked-col",items:$e($)},We)}
          ${Vt({title:"Ready",id:"ready-col",items:$e(v)},We)}
          ${Vt({title:"In progress",id:"in-progress-col",items:$e(C)},We)}
          ${Vt({title:"Resolved",id:"resolved-col",items:$e(E)},We)}
          ${F?Vt({title:"Deferred",id:"deferred-col",items:$e(P)},We):""}
          ${Vt({title:"Closed",id:"closed-col",items:$e(q),is_closed:!0,closed_range:f},We)}
        </div>
      </div>
    `}function Ee(){he(ze(),t),Ie()}function Ie(){try{let L=Array.from(t.querySelectorAll(".board-column"));for(let N of L)Array.from(N.querySelectorAll(".board-card")).forEach((G,Z)=>{G.tabIndex=Z===0?0:-1})}catch{}}async function et(L,N){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:L,status:N}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(K){r("update-status failed: %o",K),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function tt(L){switch(L){case"blocked-col":return $;case"ready-col":return v;case"in-progress-col":return C;case"resolved-col":return E;case"deferred-col":return P;default:return[]}}function rt(L,N,K){if(!o||!i)return;let G=tt(L),Z=G.find(k=>k.id===N);if(!Z)return;let oe=G.filter(k=>k.id!==N),ce=K.closest?K.closest(".board-card"):null,_e=oe.length;if(ce){let k=ce.getAttribute("data-issue-id");if(k===N)return;let M=oe.findIndex(S=>S.id===k);M>=0&&(_e=M)}let J=oe.slice();J.splice(_e,0,Z),w.applyReorder(N,J,_e)}function ht(){for(let L of Array.from(t.querySelectorAll(".board-column--drag-over")))L.classList.remove("board-column--drag-over")}let De=null;t.addEventListener("dragover",L=>{L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move");let K=L.target.closest(".board-column");K&&K!==De&&(De&&De.classList.remove("board-column--drag-over"),K.classList.add("board-column--drag-over"),De=K)}),t.addEventListener("dragleave",L=>{let N=L.relatedTarget;(!N||!t.contains(N))&&De&&(De.classList.remove("board-column--drag-over"),De=null)}),t.addEventListener("drop",L=>{L.preventDefault(),De&&(De.classList.remove("board-column--drag-over"),De=null);let N=L.target,K=N.closest(".board-column");if(!K)return;let G=L.dataTransfer?.getData("text/plain")||"";if(!G)return;let Z=K.id,oe=x.get(G);if(oe&&oe===Z){if(Fa.has(Z)){if(T!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}rt(Z,G,N)}return}let ce=Pa[Z];if(!ce){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}A.get(G)!==ce&&et(G,ce)}),t.addEventListener("keydown",L=>{let N=L.target;if(!(N instanceof HTMLElement))return;let K=String(N.tagName||"").toLowerCase();if(K==="input"||K==="textarea"||K==="select"||K==="button"||K==="a"||N.isContentEditable===!0)return;let G=N.closest(".board-card");if(!G)return;let Z=String(L.key||"");if(Z==="Enter"||Z===" "){L.preventDefault();let J=G.getAttribute("data-issue-id");J&&n(J);return}if(Z!=="ArrowUp"&&Z!=="ArrowDown"&&Z!=="ArrowLeft"&&Z!=="ArrowRight")return;L.preventDefault();let oe=G.closest(".board-column");if(!oe)return;let ce=Array.from(oe.querySelectorAll(".board-card")),_e=ce.indexOf(G);if(Z==="ArrowDown"&&_e<ce.length-1){_t(G,ce[_e+1]);return}if(Z==="ArrowUp"&&_e>0){_t(G,ce[_e-1]);return}if(Z==="ArrowLeft"||Z==="ArrowRight"){let J=Array.from(t.querySelectorAll(".board-column")),k=J.indexOf(oe),M=Z==="ArrowRight"?1:-1,S=k+M;for(;S>=0&&S<J.length;){let Y=J[S].querySelector(".board-card");if(Y){_t(G,Y);return}S+=M}}});function _t(L,N){try{L.tabIndex=-1,N.tabIndex=0,N.focus()}catch{}}let de=null;h&&h.subscribe&&(de=h.subscribe(()=>{try{Ae()}catch{}}));let Me=null;return l&&l.subscribe&&(Me=l.subscribe(()=>{try{Ae()}catch{}})),{async load(){r("load"),Ae()},clear(){Je(),de&&(de(),de=null),Me&&(Me(),Me=null),t.replaceChildren(),$=[],v=[],C=[],E=[],P=[],q=[],A=new Map,x=new Map}}}function Rn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function dr(t,e){return t.filter(r=>{let n=Rn(r);return!(n&&e.has(n))})}async function Ba(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Kt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ua="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Zt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}var ur=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function go(t){let e=0;for(let r of ur)e+=Zt(t?.[r]);return e}function mo(t){return!t||typeof t!="object"?!1:ur.some(e=>Number.isFinite(t[e]))}function za(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function pr(t){return mo(t)?`\u03C4 ${za(go(t))}`:null}function Mt(t){let e=pr(t);if(!e)return null;let r=t?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${e} \xB7 $${r.toFixed(2)}`:e}function fr(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${Zt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Zt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${go(t).toLocaleString("en-US")}`,e.join(" \xB7 ")];return t.replayed&&r.push(Ua),r.join(`
`)}function Nt(t,e){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,i=!1;for(let l of Object.values(t||{})){if(!l||l.bead_id!==e)continue;let a=l.usage;if(mo(a)){n+=1;for(let c of ur)r[c]=Zt(r[c])+Zt(a[c]);typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)&&(s+=a.total_cost_usd,o+=1),a.replayed===!0&&(i=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),i&&(r.replayed=!0),r)}var Ha={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Wa=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ga=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Pt(t){return!!t&&typeof t=="object"}function In(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function bo(t,e){let r=In(t),n=In(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function ja(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>Pt(s)&&typeof s.text=="string"?s.text:"").join(""):Pt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Ya(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Ha[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=In(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=bo(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=bo(Pt(l)?l.old_string:"",Pt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function wo(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Wa.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Ga.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Va(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(Pt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(wo(o.text));else if(o.type==="tool_use"){let i=Ya(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(Pt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=ja(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Ka(t){if(t.type==="item.completed"&&Pt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[wo(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Za(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function ko(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!Pt(o))continue;let i=Za(o)?Ka(o):Va(o,r);for(let l of i)e.push(l)}return e}function Xr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function f(){if(!o||!n)return[];let x=n.get(o);return ko(x?x.lines:[])}function h(x,g){if(g.kind==="gate")return d`<div class="sv__gate">${g.text}</div>`;if(g.kind==="phase")return d`<div class="sv__phase">${g.text}</div>`;if(g.kind==="result")return d`<div
        class="sv__result${g.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${g.success?"\u2713":"\u2717"}
        ${g.text||(g.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(g.kind==="error")return d`<div class="sv__error">⛔ ${g.text}</div>`;if(g.kind==="blocker")return d`<div class="sv__error">⛔ ${g.text}</div>`;if(g.kind==="tool"){let U=a.has(x),W=g.tool==="Bash"?g.command:g.path||g.command||"";return d`<div
        class="sv__tool${U?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>E(x)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${g.icon}</span>
          <span class="sv__tool-name">${g.tool}</span>
          ${W?d`<span class="sv__tool-detail">${W}</span>`:""}
          ${typeof g.added=="number"?d`<span class="sv__diff-add">+${g.added}</span>`:""}
          ${typeof g.removed=="number"?d`<span class="sv__diff-del">−${g.removed}</span>`:""}
          ${g.result?d`<span class="sv__tool-ok">→ ${g.result}</span>`:""}
        </span>
        ${U?d`<pre class="sv__tool-expand">${w(g)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${g.text}</div>`}function w(x){let g=[];if(x.input!==void 0)try{g.push(`input: ${JSON.stringify(x.input,null,2)}`)}catch{}return typeof x.output=="string"&&x.output.length>0&&g.push(`output:
${x.output}`),g.join(`

`)}function $(){if(!o)return d``;let x=f(),g=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),U=i.session_id||"",W=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${U?d`<button
              type="button"
              class="sv__session"
              title=${U}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${U}`}
              @click=${()=>q(U)}
            >
              ⧉ ${U.slice(0,8)}
            </button>`:""}
        ${g?d`<span class="sv__meta">${g}</span>`:""}
        ${i.worktree?d`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${W}
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${W}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>A()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${x.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:x.map((j,te)=>h(te,j))}
      </div>
    </div>`}function v(){he($(),t),l&&C()}function C(){let x=t.querySelector(".sv__body");x&&(x.scrollTop=x.scrollHeight)}function E(x){a.has(x)?a.delete(x):a.add(x),v()}function P(){l=!l,v()}function q(x){Kt(x).then(g=>{g?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function F(x){!o||!x||(i={...i,...x},v())}function R(x){let g=x.target;if(!g||!g.classList||!g.classList.contains("sv__body"))return;!(g.scrollHeight-g.scrollTop-g.clientHeight<=4)&&l&&(l=!1,v())}t.addEventListener("scroll",R,!0);function T(x){let g=x&&x.attempt_id;g&&(o=g,i=x.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(v)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),v())}function A(){let x=o;o=null,a.clear(),r&&x&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${x}`})).catch(()=>{}),he(d``,t),s&&s()}return{open:T,updateMeta:F,close:A,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",R,!0),o=null,he(d``,t)}}}function Xa(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function yo(t,e){let r=Xa(t);return d`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?d`<div class="detail-empty">산출물 없음</div>`:d`
          ${r.map(n=>d`<div class="detail-art">
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
  `}var Ln=["opus","sonnet","haiku","fable"],Dn=["low","medium","high","xhigh"],On=["codex","opus","fable","self","skip"],Mn=["opus","fable","sonnet","haiku"],Qa=["standard","fast_track"],Nn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Qr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Nn[t]||"(\uAE30\uBCF8)"}function vr(t,e,r,n,s,o){return d`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>d`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function $r(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function vo(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return d`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${vr("orchestration_model","orchestration_model",$r(Ln,Qr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${vr("orchestration_effort","orchestration_effort",$r(Dn,Qr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${vr("review_model","review_model",$r(On,Qr("review_model",s)),n.review_model||"",!1,e)}
    ${vr("impl_model","impl_model",$r(Mn,Qr("impl_model",s)),n.impl_model||"",!1,e)}
    ${vr("workflow_mode","workflow_mode",$r(Qa),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Io,setPrototypeOf:$o,isFrozen:Ja,getPrototypeOf:el,getOwnPropertyDescriptor:tl}=Object,{freeze:it,seal:bt,create:Hn}=Object,{apply:Wn,construct:Gn}=typeof Reflect<"u"&&Reflect;it||(it=function(e){return e});bt||(bt=function(e){return e});Wn||(Wn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Gn||(Gn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Jr=at(Array.prototype.forEach),rl=at(Array.prototype.lastIndexOf),xo=at(Array.prototype.pop),xr=at(Array.prototype.push),nl=at(Array.prototype.splice),tn=at(String.prototype.toLowerCase),Pn=at(String.prototype.toString),Fn=at(String.prototype.match),Sr=at(String.prototype.replace),sl=at(String.prototype.indexOf),ol=at(String.prototype.trim),kt=at(Object.prototype.hasOwnProperty),ot=at(RegExp.prototype.test),Tr=il(TypeError);function at(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Wn(t,e,n)}}function il(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Gn(t,r)}}function le(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:tn;$o&&$o(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ja(e)||(e[n]=o),s=o)}t[s]=!0}return t}function al(t){for(let e=0;e<t.length;e++)kt(t,e)||(t[e]=null);return t}function Rt(t){let e=Hn(null);for(let[r,n]of Io(t))kt(t,r)&&(Array.isArray(n)?e[r]=al(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=Rt(n):e[r]=n);return e}function Ar(t,e){for(;t!==null;){let n=tl(t,e);if(n){if(n.get)return at(n.get);if(typeof n.value=="function")return at(n.value)}t=el(t)}function r(){return null}return r}var So=it(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),qn=it(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Bn=it(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ll=it(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Un=it(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),cl=it(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),To=it(["#text"]),Ao=it(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),zn=it(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Eo=it(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),en=it(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),dl=bt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ul=bt(/<%[\w\W]*|[\w\W]*%>/gm),pl=bt(/\$\{[\w\W]*/gm),fl=bt(/^data-[\-\w.\u00B7-\uFFFF]+$/),hl=bt(/^aria-[\-\w]+$/),Lo=bt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),_l=bt(/^(?:\w+script|data):/i),gl=bt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Do=bt(/^html$/i),ml=bt(/^[a-z][.\w]*(-[.\w]+)+$/i),Co=Object.freeze({__proto__:null,ARIA_ATTR:hl,ATTR_WHITESPACE:gl,CUSTOM_ELEMENT:ml,DATA_ATTR:fl,DOCTYPE_NAME:Do,ERB_EXPR:ul,IS_ALLOWED_URI:Lo,IS_SCRIPT_OR_DATA:_l,MUSTACHE_EXPR:dl,TMPLIT_EXPR:pl}),Er={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},bl=function(){return typeof window>"u"?null:window},wl=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ro=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Oo(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:bl(),e=O=>Oo(O);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Er.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:f=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:w,trustedTypes:$}=t,v=a.prototype,C=Ar(v,"cloneNode"),E=Ar(v,"remove"),P=Ar(v,"nextSibling"),q=Ar(v,"childNodes"),F=Ar(v,"parentNode");if(typeof i=="function"){let O=r.createElement("template");O.content&&O.content.ownerDocument&&(r=O.content.ownerDocument)}let R,T="",{implementation:A,createNodeIterator:x,createDocumentFragment:g,getElementsByTagName:U}=r,{importNode:W}=n,j=Ro();e.isSupported=typeof Io=="function"&&typeof F=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:te,ERB_EXPR:Re,TMPLIT_EXPR:Ye,DATA_ATTR:$e,ARIA_ATTR:ee,IS_SCRIPT_OR_DATA:ae,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:xe}=Co,{IS_ALLOWED_URI:ct}=Co,me=null,Fe=le({},[...So,...qn,...Bn,...Un,...To]),be=null,Ze=le({},[...Ao,...zn,...Eo,...en]),fe=Object.seal(Hn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Oe=null,dt=null,Ve=Object.seal(Hn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),$t=!0,We=!0,ut=!1,Qe=!0,Ke=!1,Je=!0,Ge=!1,ze=!1,Ee=!1,Ie=!1,et=!1,tt=!1,rt=!0,ht=!1,De="user-content-",_t=!0,de=!1,Me={},L=null,N=le({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),K=null,G=le({},["audio","video","img","source","image","track"]),Z=null,oe=le({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ce="http://www.w3.org/1998/Math/MathML",_e="http://www.w3.org/2000/svg",J="http://www.w3.org/1999/xhtml",k=J,M=!1,S=null,Y=le({},[ce,_e,J],Pn),Ne=le({},["mi","mo","mn","ms","mtext"]),u=le({},["annotation-xml"]),b=le({},["title","style","font","a","script"]),I=null,re=["application/xhtml+xml","text/html"],ke="text/html",se=null,we=null,Se=r.createElement("form"),je=function(p){return p instanceof RegExp||p instanceof Function},ne=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(we&&we===p)){if((!p||typeof p!="object")&&(p={}),p=Rt(p),I=re.indexOf(p.PARSER_MEDIA_TYPE)===-1?ke:p.PARSER_MEDIA_TYPE,se=I==="application/xhtml+xml"?Pn:tn,me=kt(p,"ALLOWED_TAGS")?le({},p.ALLOWED_TAGS,se):Fe,be=kt(p,"ALLOWED_ATTR")?le({},p.ALLOWED_ATTR,se):Ze,S=kt(p,"ALLOWED_NAMESPACES")?le({},p.ALLOWED_NAMESPACES,Pn):Y,Z=kt(p,"ADD_URI_SAFE_ATTR")?le(Rt(oe),p.ADD_URI_SAFE_ATTR,se):oe,K=kt(p,"ADD_DATA_URI_TAGS")?le(Rt(G),p.ADD_DATA_URI_TAGS,se):G,L=kt(p,"FORBID_CONTENTS")?le({},p.FORBID_CONTENTS,se):N,Oe=kt(p,"FORBID_TAGS")?le({},p.FORBID_TAGS,se):Rt({}),dt=kt(p,"FORBID_ATTR")?le({},p.FORBID_ATTR,se):Rt({}),Me=kt(p,"USE_PROFILES")?p.USE_PROFILES:!1,$t=p.ALLOW_ARIA_ATTR!==!1,We=p.ALLOW_DATA_ATTR!==!1,ut=p.ALLOW_UNKNOWN_PROTOCOLS||!1,Qe=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ke=p.SAFE_FOR_TEMPLATES||!1,Je=p.SAFE_FOR_XML!==!1,Ge=p.WHOLE_DOCUMENT||!1,Ie=p.RETURN_DOM||!1,et=p.RETURN_DOM_FRAGMENT||!1,tt=p.RETURN_TRUSTED_TYPE||!1,Ee=p.FORCE_BODY||!1,rt=p.SANITIZE_DOM!==!1,ht=p.SANITIZE_NAMED_PROPS||!1,_t=p.KEEP_CONTENT!==!1,de=p.IN_PLACE||!1,ct=p.ALLOWED_URI_REGEXP||Lo,k=p.NAMESPACE||J,Ne=p.MATHML_TEXT_INTEGRATION_POINTS||Ne,u=p.HTML_INTEGRATION_POINTS||u,fe=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&je(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(fe.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&je(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(fe.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(fe.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ke&&(We=!1),et&&(Ie=!0),Me&&(me=le({},To),be=[],Me.html===!0&&(le(me,So),le(be,Ao)),Me.svg===!0&&(le(me,qn),le(be,zn),le(be,en)),Me.svgFilters===!0&&(le(me,Bn),le(be,zn),le(be,en)),Me.mathMl===!0&&(le(me,Un),le(be,Eo),le(be,en))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Ve.tagCheck=p.ADD_TAGS:(me===Fe&&(me=Rt(me)),le(me,p.ADD_TAGS,se))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Ve.attributeCheck=p.ADD_ATTR:(be===Ze&&(be=Rt(be)),le(be,p.ADD_ATTR,se))),p.ADD_URI_SAFE_ATTR&&le(Z,p.ADD_URI_SAFE_ATTR,se),p.FORBID_CONTENTS&&(L===N&&(L=Rt(L)),le(L,p.FORBID_CONTENTS,se)),_t&&(me["#text"]=!0),Ge&&le(me,["html","head","body"]),me.table&&(le(me,["tbody"]),delete Oe.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw Tr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Tr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');R=p.TRUSTED_TYPES_POLICY,T=R.createHTML("")}else R===void 0&&(R=wl($,s)),R!==null&&typeof T=="string"&&(T=R.createHTML(""));it&&it(p),we=p}},Xe=le({},[...qn,...Bn,...ll]),gt=le({},[...Un,...cl]),xt=function(p){let D=F(p);(!D||!D.tagName)&&(D={namespaceURI:k,tagName:"template"});let H=tn(p.tagName),Te=tn(D.tagName);return S[p.namespaceURI]?p.namespaceURI===_e?D.namespaceURI===J?H==="svg":D.namespaceURI===ce?H==="svg"&&(Te==="annotation-xml"||Ne[Te]):!!Xe[H]:p.namespaceURI===ce?D.namespaceURI===J?H==="math":D.namespaceURI===_e?H==="math"&&u[Te]:!!gt[H]:p.namespaceURI===J?D.namespaceURI===_e&&!u[Te]||D.namespaceURI===ce&&!Ne[Te]?!1:!gt[H]&&(b[H]||!Xe[H]):!!(I==="application/xhtml+xml"&&S[p.namespaceURI]):!1},qe=function(p){xr(e.removed,{element:p});try{F(p).removeChild(p)}catch{E(p)}},nt=function(p,D){try{xr(e.removed,{attribute:D.getAttributeNode(p),from:D})}catch{xr(e.removed,{attribute:null,from:D})}if(D.removeAttribute(p),p==="is")if(Ie||et)try{qe(D)}catch{}else try{D.setAttribute(p,"")}catch{}},ie=function(p){let D=null,H=null;if(Ee)p="<remove></remove>"+p;else{let Le=Fn(p,/^[\r\n\t ]+/);H=Le&&Le[0]}I==="application/xhtml+xml"&&k===J&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let Te=R?R.createHTML(p):p;if(k===J)try{D=new w().parseFromString(Te,I)}catch{}if(!D||!D.documentElement){D=A.createDocument(k,"template",null);try{D.documentElement.innerHTML=M?T:Te}catch{}}let He=D.body||D.documentElement;return p&&H&&He.insertBefore(r.createTextNode(H),He.childNodes[0]||null),k===J?U.call(D,Ge?"html":"body")[0]:Ge?D.documentElement:He},ue=function(p){return x.call(p.ownerDocument||p,p,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},St=function(p){return p instanceof h&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof f)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},At=function(p){return typeof l=="function"&&p instanceof l};function st(O,p,D){Jr(O,H=>{H.call(e,p,D,we)})}let Bt=function(p){let D=null;if(st(j.beforeSanitizeElements,p,null),St(p))return qe(p),!0;let H=se(p.nodeName);if(st(j.uponSanitizeElement,p,{tagName:H,allowedTags:me}),Je&&p.hasChildNodes()&&!At(p.firstElementChild)&&ot(/<[/\w!]/g,p.innerHTML)&&ot(/<[/\w!]/g,p.textContent)||p.nodeType===Er.progressingInstruction||Je&&p.nodeType===Er.comment&&ot(/<[/\w]/g,p.data))return qe(p),!0;if(!(Ve.tagCheck instanceof Function&&Ve.tagCheck(H))&&(!me[H]||Oe[H])){if(!Oe[H]&&m(H)&&(fe.tagNameCheck instanceof RegExp&&ot(fe.tagNameCheck,H)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(H)))return!1;if(_t&&!L[H]){let Te=F(p)||p.parentNode,He=q(p)||p.childNodes;if(He&&Te){let Le=He.length;for(let Be=Le-1;Be>=0;--Be){let mt=C(He[Be],!0);mt.__removalCount=(p.__removalCount||0)+1,Te.insertBefore(mt,P(p))}}}return qe(p),!0}return p instanceof a&&!xt(p)||(H==="noscript"||H==="noembed"||H==="noframes")&&ot(/<\/no(script|embed|frames)/i,p.innerHTML)?(qe(p),!0):(Ke&&p.nodeType===Er.text&&(D=p.textContent,Jr([te,Re,Ye],Te=>{D=Sr(D,Te," ")}),p.textContent!==D&&(xr(e.removed,{element:p.cloneNode()}),p.textContent=D)),st(j.afterSanitizeElements,p,null),!1)},_=function(p,D,H){if(rt&&(D==="id"||D==="name")&&(H in r||H in Se))return!1;if(!(We&&!dt[D]&&ot($e,D))){if(!($t&&ot(ee,D))){if(!(Ve.attributeCheck instanceof Function&&Ve.attributeCheck(D,p))){if(!be[D]||dt[D]){if(!(m(p)&&(fe.tagNameCheck instanceof RegExp&&ot(fe.tagNameCheck,p)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(p))&&(fe.attributeNameCheck instanceof RegExp&&ot(fe.attributeNameCheck,D)||fe.attributeNameCheck instanceof Function&&fe.attributeNameCheck(D,p))||D==="is"&&fe.allowCustomizedBuiltInElements&&(fe.tagNameCheck instanceof RegExp&&ot(fe.tagNameCheck,H)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(H))))return!1}else if(!Z[D]){if(!ot(ct,Sr(H,Ae,""))){if(!((D==="src"||D==="xlink:href"||D==="href")&&p!=="script"&&sl(H,"data:")===0&&K[p])){if(!(ut&&!ot(ae,Sr(H,Ae,"")))){if(H)return!1}}}}}}}return!0},m=function(p){return p!=="annotation-xml"&&Fn(p,xe)},z=function(p){st(j.beforeSanitizeAttributes,p,null);let{attributes:D}=p;if(!D||St(p))return;let H={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:be,forceKeepAttr:void 0},Te=D.length;for(;Te--;){let He=D[Te],{name:Le,namespaceURI:Be,value:mt}=He,Et=se(Le),Jt=mt,Ue=Le==="value"?Jt:ol(Jt);if(H.attrName=Et,H.attrValue=Ue,H.keepAttr=!0,H.forceKeepAttr=void 0,st(j.uponSanitizeAttribute,p,H),Ue=H.attrValue,ht&&(Et==="id"||Et==="name")&&(nt(Le,p),Ue=De+Ue),Je&&ot(/((--!?|])>)|<\/(style|title|textarea)/i,Ue)){nt(Le,p);continue}if(Et==="attributename"&&Fn(Ue,"href")){nt(Le,p);continue}if(H.forceKeepAttr)continue;if(!H.keepAttr){nt(Le,p);continue}if(!Qe&&ot(/\/>/i,Ue)){nt(Le,p);continue}Ke&&Jr([te,Re,Ye],Pr=>{Ue=Sr(Ue,Pr," ")});let er=se(p.nodeName);if(!_(er,Et,Ue)){nt(Le,p);continue}if(R&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Be)switch($.getAttributeType(er,Et)){case"TrustedHTML":{Ue=R.createHTML(Ue);break}case"TrustedScriptURL":{Ue=R.createScriptURL(Ue);break}}if(Ue!==Jt)try{Be?p.setAttributeNS(Be,Le,Ue):p.setAttribute(Le,Ue),St(p)?qe(p):xo(e.removed)}catch{nt(Le,p)}}st(j.afterSanitizeAttributes,p,null)},V=function O(p){let D=null,H=ue(p);for(st(j.beforeSanitizeShadowDOM,p,null);D=H.nextNode();)st(j.uponSanitizeShadowNode,D,null),Bt(D),z(D),D.content instanceof o&&O(D.content);st(j.afterSanitizeShadowDOM,p,null)};return e.sanitize=function(O){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},D=null,H=null,Te=null,He=null;if(M=!O,M&&(O="<!-->"),typeof O!="string"&&!At(O))if(typeof O.toString=="function"){if(O=O.toString(),typeof O!="string")throw Tr("dirty is not a string, aborting")}else throw Tr("toString is not a function");if(!e.isSupported)return O;if(ze||ne(p),e.removed=[],typeof O=="string"&&(de=!1),de){if(O.nodeName){let mt=se(O.nodeName);if(!me[mt]||Oe[mt])throw Tr("root node is forbidden and cannot be sanitized in-place")}}else if(O instanceof l)D=ie("<!---->"),H=D.ownerDocument.importNode(O,!0),H.nodeType===Er.element&&H.nodeName==="BODY"||H.nodeName==="HTML"?D=H:D.appendChild(H);else{if(!Ie&&!Ke&&!Ge&&O.indexOf("<")===-1)return R&&tt?R.createHTML(O):O;if(D=ie(O),!D)return Ie?null:tt?T:""}D&&Ee&&qe(D.firstChild);let Le=ue(de?O:D);for(;Te=Le.nextNode();)Bt(Te),z(Te),Te.content instanceof o&&V(Te.content);if(de)return O;if(Ie){if(et)for(He=g.call(D.ownerDocument);D.firstChild;)He.appendChild(D.firstChild);else He=D;return(be.shadowroot||be.shadowrootmode)&&(He=W.call(n,He,!0)),He}let Be=Ge?D.outerHTML:D.innerHTML;return Ge&&me["!doctype"]&&D.ownerDocument&&D.ownerDocument.doctype&&D.ownerDocument.doctype.name&&ot(Do,D.ownerDocument.doctype.name)&&(Be="<!DOCTYPE "+D.ownerDocument.doctype.name+`>
`+Be),Ke&&Jr([te,Re,Ye],mt=>{Be=Sr(Be,mt," ")}),R&&tt?R.createHTML(Be):Be},e.setConfig=function(){let O=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ne(O),ze=!0},e.clearConfig=function(){we=null,ze=!1},e.isValidAttribute=function(O,p,D){we||ne({});let H=se(O),Te=se(p);return _(H,Te,D)},e.addHook=function(O,p){typeof p=="function"&&xr(j[O],p)},e.removeHook=function(O,p){if(p!==void 0){let D=rl(j[O],p);return D===-1?void 0:nl(j[O],D,1)[0]}return xo(j[O])},e.removeHooks=function(O){j[O]=[]},e.removeAllHooks=function(){j=Ro()},e}var Mo=Oo();var No={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Po=t=>(...e)=>({_$litDirective$:t,values:e}),rn=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Cr=class extends rn{constructor(e){if(super(e),this.it=Pe,e.type!==No.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Pe||e==null)return this._t=void 0,this.it=e;if(e===Wt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Cr.directiveName="unsafeHTML",Cr.resultType=1;var Fo=Po(Cr);function Kn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Qt=Kn();function Go(t){Qt=t}var Dr={exec:()=>null};function pe(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(lt.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var kl=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),lt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},yl=/^(?:[ \t]*(?:\n|$))+/,vl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,$l=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Or=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,xl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Zn=/(?:[*+-]|\d{1,9}[.)])/,jo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Yo=pe(jo).replace(/bull/g,Zn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Sl=pe(jo).replace(/bull/g,Zn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Xn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Tl=/^[^\n]+/,Qn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Al=pe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Qn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),El=pe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Zn).getRegex(),cn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Jn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Cl=pe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Jn).replace("tag",cn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Vo=pe(Xn).replace("hr",Or).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cn).getRegex(),Rl=pe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Vo).getRegex(),es={blockquote:Rl,code:vl,def:Al,fences:$l,heading:xl,hr:Or,html:Cl,lheading:Yo,list:El,newline:yl,paragraph:Vo,table:Dr,text:Tl},qo=pe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Or).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cn).getRegex(),Il={...es,lheading:Sl,table:qo,paragraph:pe(Xn).replace("hr",Or).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",qo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cn).getRegex()},Ll={...es,html:pe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Jn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Dr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:pe(Xn).replace("hr",Or).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Yo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Dl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ol=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ko=/^( {2,}|\\)\n(?!\s*$)/,Ml=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,dn=/[\p{P}\p{S}]/u,ts=/[\s\p{P}\p{S}]/u,Zo=/[^\s\p{P}\p{S}]/u,Nl=pe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ts).getRegex(),Xo=/(?!~)[\p{P}\p{S}]/u,Pl=/(?!~)[\s\p{P}\p{S}]/u,Fl=/(?:[^\s\p{P}\p{S}]|~)/u,ql=pe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",kl?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Qo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Bl=pe(Qo,"u").replace(/punct/g,dn).getRegex(),Ul=pe(Qo,"u").replace(/punct/g,Xo).getRegex(),Jo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",zl=pe(Jo,"gu").replace(/notPunctSpace/g,Zo).replace(/punctSpace/g,ts).replace(/punct/g,dn).getRegex(),Hl=pe(Jo,"gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Pl).replace(/punct/g,Xo).getRegex(),Wl=pe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zo).replace(/punctSpace/g,ts).replace(/punct/g,dn).getRegex(),Gl=pe(/\\(punct)/,"gu").replace(/punct/g,dn).getRegex(),jl=pe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Yl=pe(Jn).replace("(?:-->|$)","-->").getRegex(),Vl=pe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Yl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),on=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Kl=pe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",on).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ei=pe(/^!?\[(label)\]\[(ref)\]/).replace("label",on).replace("ref",Qn).getRegex(),ti=pe(/^!?\[(ref)\](?:\[\])?/).replace("ref",Qn).getRegex(),Zl=pe("reflink|nolink(?!\\()","g").replace("reflink",ei).replace("nolink",ti).getRegex(),Bo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,rs={_backpedal:Dr,anyPunctuation:Gl,autolink:jl,blockSkip:ql,br:Ko,code:Ol,del:Dr,emStrongLDelim:Bl,emStrongRDelimAst:zl,emStrongRDelimUnd:Wl,escape:Dl,link:Kl,nolink:ti,punctuation:Nl,reflink:ei,reflinkSearch:Zl,tag:Vl,text:Ml,url:Dr},Xl={...rs,link:pe(/^!?\[(label)\]\((.*?)\)/).replace("label",on).getRegex(),reflink:pe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",on).getRegex()},jn={...rs,emStrongRDelimAst:Hl,emStrongLDelim:Ul,url:pe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Bo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:pe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Bo).getRegex()},Ql={...jn,br:pe(Ko).replace("{2,}","*").getRegex(),text:pe(jn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},nn={normal:es,gfm:Il,pedantic:Ll},Rr={normal:rs,gfm:jn,breaks:Ql,pedantic:Xl},Jl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Uo=t=>Jl[t];function It(t,e){if(e){if(lt.escapeTest.test(t))return t.replace(lt.escapeReplace,Uo)}else if(lt.escapeTestNoEncode.test(t))return t.replace(lt.escapeReplaceNoEncode,Uo);return t}function zo(t){try{t=encodeURI(t).replace(lt.percentDecode,"%")}catch{return null}return t}function Ho(t,e){let r=t.replace(lt.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(lt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(lt.slashPipe,"|");return n}function Ir(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function ec(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Wo(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function tc(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var an=class{constructor(t){ve(this,"options");ve(this,"rules");ve(this,"lexer");this.options=t||Qt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Ir(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=tc(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Ir(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Ir(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Ir(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),f=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${f}`:f;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=h,r.length===0)break;let w=o.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let $=w,v=$.raw+`
`+r.join(`
`),C=this.blockquote(v);o[o.length-1]=C,n=n.substring(0,n.length-$.raw.length)+C.raw,s=s.substring(0,s.length-$.text.length)+C.text;break}else if(w?.type==="list"){let $=w,v=$.raw+`
`+r.join(`
`),C=this.list(v);o[o.length-1]=C,n=n.substring(0,n.length-w.raw.length)+C.raw,s=s.substring(0,s.length-$.raw.length)+C.raw,r=v.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",f="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),w=t.split(`
`,1)[0],$=!h.trim(),v=0;if(this.options.pedantic?(v=2,f=h.trimStart()):$?v=e[1].length+1:(v=e[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,f=h.slice(v),v+=e[1].length),$&&this.rules.other.blankLine.test(w)&&(c+=w+`
`,t=t.substring(w.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(v),E=this.rules.other.hrRegex(v),P=this.rules.other.fencesBeginRegex(v),q=this.rules.other.headingBeginRegex(v),F=this.rules.other.htmlBeginRegex(v);for(;t;){let R=t.split(`
`,1)[0],T;if(w=R,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),T=w):T=w.replace(this.rules.other.tabCharGlobal,"    "),P.test(w)||q.test(w)||F.test(w)||C.test(w)||E.test(w))break;if(T.search(this.rules.other.nonSpaceChar)>=v||!w.trim())f+=`
`+T.slice(v);else{if($||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||P.test(h)||q.test(h)||E.test(h))break;f+=`
`+w}!$&&!w.trim()&&($=!0),c+=R+`
`,t=t.substring(R.length+1),h=T.slice(v)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let f={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=f.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=f.raw+a.tokens[0].raw,a.tokens[0].text=f.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(f)):a.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):a.tokens.unshift(f)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),f=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=f}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Ho(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Ho(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Ir(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=ec(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Wo(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Wo(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let f=[...n[0]][0].length,h=t.slice(0,s+n.index+f+i);if(Math.min(s,i)%2){let $=h.slice(1,-1);return{type:"em",raw:h,text:$,tokens:this.lexer.inlineTokens($)}}let w=h.slice(2,-2);return{type:"strong",raw:h,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},yt=class Yn{constructor(e){ve(this,"tokens");ve(this,"options");ve(this,"state");ve(this,"inlineQueue");ve(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Qt,this.options.tokenizer=this.options.tokenizer||new an,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:lt,block:nn.normal,inline:Rr.normal};this.options.pedantic?(r.block=nn.pedantic,r.inline=Rr.pedantic):this.options.gfm&&(r.block=nn.gfm,this.options.breaks?r.inline=Rr.breaks:r.inline=Rr.gfm),this.tokenizer.rules=r}static get rules(){return{block:nn,inline:Rr}}static lex(e,r){return new Yn(r).lex(e)}static lexInline(e,r){return new Yn(r).inlineTokens(e)}lex(e){e=e.replace(lt.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(lt.tabCharGlobal,"    ").replace(lt.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(f=>(a=f.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let f=r.at(-1);a.type==="text"&&f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let f=1/0,h=e.slice(1),w;this.options.extensions.startInline.forEach($=>{w=$.call({lexer:this},h),typeof w=="number"&&w>=0&&(f=Math.min(f,w))}),f<1/0&&f>=0&&(c=e.substring(0,f+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(e){let f="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},ln=class{constructor(t){ve(this,"options");ve(this,"parser");this.options=t||Qt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(lt.notSpaceStart)?.[0],s=t.replace(lt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+It(n)+'">'+(r?s:It(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:It(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${It(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=zo(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+It(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=zo(t);if(s===null)return It(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${It(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:It(t.text)}},ns=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},vt=class Vn{constructor(e){ve(this,"options");ve(this,"renderer");ve(this,"textRenderer");this.options=e||Qt,this.options.renderer=this.options.renderer||new ln,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ns}static parse(e,r){return new Vn(r).parse(e)}static parseInline(e,r){return new Vn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},sn,Lr=(sn=class{constructor(t){ve(this,"options");ve(this,"block");this.options=t||Qt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?yt.lex:yt.lexInline}provideParser(){return this.block?vt.parse:vt.parseInline}},ve(sn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ve(sn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),sn),rc=class{constructor(...t){ve(this,"defaults",Kn());ve(this,"options",this.setOptions);ve(this,"parse",this.parseMarkdown(!0));ve(this,"parseInline",this.parseMarkdown(!1));ve(this,"Parser",vt);ve(this,"Renderer",ln);ve(this,"TextRenderer",ns);ve(this,"Lexer",yt);ve(this,"Tokenizer",an);ve(this,"Hooks",Lr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new ln(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let f=l.apply(s,c);return f===!1&&(f=a.apply(s,c)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new an(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let f=l.apply(s,c);return f===!1&&(f=a.apply(s,c)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Lr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Lr.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Lr.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let f=l.call(s,c);return a.call(s,f)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let f=l.apply(s,c);return f===!1&&(f=a.apply(s,c)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return yt.lex(t,e??this.defaults)}parser(t,e){return vt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?yt.lex:yt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?vt.parse:vt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?yt.lex:yt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?vt.parse:vt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+It(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Xt=new rc;function ge(t,e){return Xt.parse(t,e)}ge.options=ge.setOptions=function(t){return Xt.setOptions(t),ge.defaults=Xt.defaults,Go(ge.defaults),ge};ge.getDefaults=Kn;ge.defaults=Qt;ge.use=function(...t){return Xt.use(...t),ge.defaults=Xt.defaults,Go(ge.defaults),ge};ge.walkTokens=function(t,e){return Xt.walkTokens(t,e)};ge.parseInline=Xt.parseInline;ge.Parser=vt;ge.parser=vt.parse;ge.Renderer=ln;ge.TextRenderer=ns;ge.Lexer=yt;ge.lexer=yt.lex;ge.Tokenizer=an;ge.Hooks=Lr;ge.parse=ge;var Eu=ge.options,Cu=ge.setOptions,Ru=ge.use,Iu=ge.walkTokens,Lu=ge.parseInline;var Du=vt.parse,Ou=yt.lex;function ri(t){let e=ge.parse(t),r=Mo.sanitize(e);return Fo(r)}function nc(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function ni(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(v){v.key==="Escape"&&s&&(v.preventDefault(),w())}document.addEventListener("keydown",a);function c(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${nc(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>w()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?d`<div class="mv__status">불러오는 중…</div>`:o==="error"?d`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:ri(i)}
          </div>
        </div>
      </div>
    `:d``}function f(){he(c(),t)}async function h(v){s=v,o="loading",i="",l="",f();let C=r?r():"";if(!C){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let E="/api/doc?workspace="+encodeURIComponent(C)+"&path="+encodeURIComponent(v);try{let P=await n(E),q=await P.json().catch(()=>({}));if(!P.ok||!q||q.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||P.status)+")",f();return}i=String(q.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function w(){s=null,he(d``,t)}function $(){document.removeEventListener("keydown",a),w()}return{open:h,close:w,destroy:$}}var sc=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],si="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function oc(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function ic(t){let e=pr(t);if(!e||!t)return"";let r=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?` \xB7 $${t.total_cost_usd.toFixed(2)}`:"";return d`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${e.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${t.replayed?d`<span class="detail-usage-partial" title=${si}
          >부분 집계</span
        >`:""}`}function ac(t){let e=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?t.total_cost_usd:null;return d`<div class="detail-session__usage-detail">
    ${sc.map(r=>d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${oc(t[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${e===null?"":d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${e.toFixed(2)}</span
          ></span
        >`}
    ${t.replayed?d`<span class="detail-session__usage-note">${si}</span>`:""}
  </div>`}var lc={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function cc(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function oi(t,e={},r={}){let n=Array.isArray(t)?t:[],s=r.expanded||new Set;if(n.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let c of n)c&&typeof c.resumed_from=="string"&&c.resumed_from.length>0&&o.add(c.resumed_from);let i=c=>{if(!(c.status==="failed"||c.status==="orphaned"))return"";let h=typeof c.session_id=="string"&&c.session_id.length>0,w=o.has(c.attempt_id),$=h&&!w,v=h?w?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${c.attempt_id}
      ?disabled=${!$}
      title=${v}
      @click=${C=>{C.stopPropagation(),$&&e.onResume&&e.onResume(c.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=c=>{if(!(c.status==="failed"||c.status==="orphaned")||typeof c.cause!="string"||c.cause==="")return"";let h=c.cause_detail,w=h&&typeof h.reason=="string"&&h.reason.length>0?typeof h.command=="string"&&h.command.length>0?`${h.reason} \xB7 ${h.command}`:h.reason:c.cause;return d`<div class="detail-session__cause" title=${w}>
      ${c.cause}
    </div>`},a=c=>{if(!pr(c.usage))return"";let f=s.has(c.attempt_id);return d`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${c.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),e.onToggleUsage&&e.onToggleUsage(c.attempt_id)}}
    >
      τ 자세히
    </button>`};return d`
    <div class="detail-section-label">
      세션 이력${ic(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(c=>d`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${c.status||"unknown"}"
              data-attempt-id=${c.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(c.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${lc[c.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${c.attempt_id}</span>
              ${c.resumed_from?d`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${c.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[c.runner,c.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${c.session_id?d`<span class="detail-session__sid" title=${c.session_id}
                    >${String(c.session_id).slice(0,8)}</span
                  >`:""}
              ${pr(c.usage)?d`<span class="detail-session__usage"
                    >${pr(c.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${cc(c.started_at)}</span
              >
            </button>
            ${a(c)} ${i(c)} ${l(c)}
            ${s.has(c.attempt_id)&&c.usage?ac(c.usage):""}
          </div>`)}
    </div>
  `}var dc=["open","in_progress","deferred","resolved","closed"],uc=[0,1,2,3,4];function ii(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,f={},h=!1,w=!1,$="",v="",C="";function E(){h=!1,w=!1,$="",v="",C=""}let P=document.createElement("div");P.className="md-viewer-root",document.body.appendChild(P);let q=ni(P,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),F=document.createElement("div");F.className="session-log-root",document.body.appendChild(F);let R=Xr(F,{transport:s?(k,M)=>Promise.resolve(s(k,M)):void 0,sessionLogStore:l});function T(){if(!i||!a)return[];let k=i.get();return(k&&k.attempts?Object.values(k.attempts):[]).filter(S=>S&&S.bead_id===a).sort((S,Y)=>(Y.started_at||0)-(S.started_at||0)).map(S=>({attempt_id:S.attempt_id,bead_id:S.bead_id,status:S.status,started_at:typeof S.started_at=="number"?S.started_at:null,runner:S.runner||null,model:S.model||null,session_id:S.session_id||null,resumed_from:S.resumed_from||null,dismissed_at:typeof S.dismissed_at=="number"?S.dismissed_at:null,cause:typeof S.cause=="string"?S.cause:null,cause_detail:S.cause_detail||null,usage:S.usage||null}))}function A(){if(!i||!a)return null;let k=i.get();return Nt(k&&k.attempts||{},a)}let x=new Set;function g(k){x.has(k)?x.delete(k):x.add(k),J()}function U(k){let M=i?i.get():null,S=M&&M.attempts?M.attempts[k]:null;R.open({attempt_id:k,meta:S?{runner:S.runner||void 0,model:S.model||void 0,effort:S.effort||void 0,status:S.status||void 0,session_id:S.session_id||void 0}:{}})}async function W(k){if(!s||!k)return;let M=()=>{let Y=i?i.get():null;return Y&&typeof Y.revision=="number"?Y.revision:0},S=await s("worker-attempt-resume",{attempt_id:k,expected_revision:M()});if(S&&S.conflict){let Y=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:M();S=await s("worker-attempt-resume",{attempt_id:k,expected_revision:Y})}S&&S.resumed===!1&&!S.conflict&&S.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}let j={onOpen:U,onResume:W,onToggleUsage:g};function te(){let k=i?i.get():null,M=k&&k.exec_defaults;return M&&typeof M=="object"?M:{}}let Re=null;r&&r.subscribe&&(Re=r.subscribe(()=>ee()));let Ye=null;i&&typeof i.subscribe=="function"&&(Ye=i.subscribe(()=>{a&&J()}));function $e(k){k.key==="Escape"&&a&&(k.preventDefault(),n())}document.addEventListener("keydown",$e);function ee(){if(a){if(r&&typeof r.snapshotFor=="function"){let k=r.snapshotFor("detail:"+a)||[];c=k.find(S=>S&&S.id===a)||k[0]||c}J()}}function ae(k){Kt(k).then(M=>{M?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ae(k){k.preventDefault(),k.stopPropagation(),a&&ae(a)}function xe(k,M){k.preventDefault(),k.stopPropagation(),ae(M)}function ct(k,M){k.preventDefault(),k.stopPropagation(),q.open(M)}function me(k,M){f[k]=M,J(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:k,value:M})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Fe(k,M,S){if(!s||!a)return!1;try{let Y=await Promise.resolve(s(k,M)),Ne=Array.isArray(Y)?Y[0]:Y;return Ne&&typeof Ne=="object"&&Ne.id?(c=Ne,!0):(Q(S,"error"),!1)}catch{return Q(S,"error"),!1}}function be(k){setTimeout(()=>{try{let M=t.querySelector(k);M&&typeof M.focus=="function"&&M.focus()}catch{}},0)}function Ze(){h=!0,$=c&&c.title||"",J(),be('.detail-edit__input[data-edit="title"]')}function fe(k){$=k.target.value}function Oe(){h=!1,$="",J()}function dt(){Fe("edit-text",{id:a,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(M=>{M&&(h=!1,$=""),J()})}function Ve(){w=!0,v=c&&c.description||"",J(),be('.detail-edit__textarea[data-edit="description"]')}function $t(k){v=k.target.value}function We(){w=!1,v="",J()}function ut(){Fe("edit-text",{id:a,field:"description",value:v},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(M=>{M&&(w=!1,v=""),J()})}function Qe(k,M,S,Y){if(k.key==="Escape"){k.stopPropagation(),S();return}k.key==="Enter"&&(!Y||k.ctrlKey||k.metaKey)&&(k.preventDefault(),M())}function Ke(k){let M=k.target.value;Fe("update-status",{id:a,status:M},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>J())}function Je(k){let M=Number(k.target.value);Fe("update-priority",{id:a,priority:M},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>J())}function Ge(k){C=k.target.value}function ze(){let k=C.trim();k.length!==0&&Fe("label-add",{id:a,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(M=>{M&&(C=""),J()})}function Ee(k){if(k.key==="Escape"){k.stopPropagation(),C="",J();return}k.key==="Enter"&&(k.preventDefault(),ze())}function Ie(k){Fe("label-remove",{id:a,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>J())}let et={onCopyPath:xe,onOpenDoc:ct},tt={onChange:me};function rt(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function ht(k){switch(k&&typeof k=="object"?String(k.dependency_type||k.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function De(k){let S=(Array.isArray(k.dependencies)?k.dependencies:[]).map(Y=>({id:rt(Y),icon:ht(Y)})).filter(Y=>Y.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${S.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${S.map(Y=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Y.id)}
                  >
                    ${Y.icon?`${Y.icon} `:""}${Y.id}
                  </button>`:d`<span class="detail-dep"
                    >${Y.icon?`${Y.icon} `:""}${Y.id}</span
                  >`)}
          </div>`}
    `}function _t(k){let M=k.metadata||{},S=k.workflow||{},Y=S.stages||{},Ne=Y.spec&&Y.spec.stale,u=Y.impl&&Y.impl.stale,b=S.route_source==="derived",I=S.route||M.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${b?" detail-kv__v--derived":""}"
          title=${b?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${b&&S.route?`${I} ? (\uCD94\uB860)`:I}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${M.spec_review||"\uC5C6\uC74C"}${Ne?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${M.impl_review||"\uC5C6\uC74C"}${u?" \xB7 stale":""}</span
        >
      </div>
      ${M.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${M.pr_url}</span>
          </div>`:""}
    `}let de={route:["spec_backed","full_plan"]};async function Me(k,M){let S=M.target.value;if(k==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&S!=="full_plan"&&!window.confirm(`full_plan \u2192 ${S||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){J();return}await Fe("update-workflow-meta",{id:a,key:k,value:S},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),J()}function L(k){let M=k.metadata||{};return d` ${((Y,Ne)=>{let u=de[Y],b=typeof M[Y]=="string"?M[Y]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${Y}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Y}
          data-edit=${`wfmeta-${Y}`}
          @change=${I=>Me(Y,I)}
        >
          <option value="" ?selected=${!u.includes(b)}>
            ${Ne}
          </option>
          ${u.map(I=>d`<option value=${I} ?selected=${b===I}>${I}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function N(k){return h?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${fe}
            @keydown=${M=>Qe(M,dt,Oe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${dt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Oe}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${k}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ze}
        >
          ✎
        </button>
      </div>
    `}function K(k){let M=ft(k.created_at),S=ft(k.updated_at);return!M&&!S?d``:d`
      ${M?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${M}</span>
          </div>`:""}
      ${S?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${S}</span>
          </div>`:""}
    `}function G(k,M){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ke}
        >
          ${dc.map(S=>d`<option value=${S} ?selected=${S===k}>${S}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Je}
        >
          ${uc.map(S=>d`<option value=${String(S)} ?selected=${S===M}>
                P${S}
              </option>`)}
        </select>
      </div>
    `}function Z(k){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${w?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ve}
            >
              ✎
            </button>`}
      </div>
      ${w?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${v}
              @input=${$t}
              @keydown=${M=>Qe(M,ut,We,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ut}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${We}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function oe(k){let M=typeof k.notes=="string"?k.notes:"";return M.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${M}</div>
    `}function ce(k){let M=Array.isArray(k.labels)?k.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${M.map(S=>d`<span class="detail-label-chip"
              >${S}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${S}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+S}
                @click=${()=>Ie(S)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${C}
            @input=${Ge}
            @keydown=${Ee}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ze}
          >
            추가
          </button>
        </span>
      </div>
    `}function _e(){if(!a)return d``;let k=c||{},M=String(k.id||a),S=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Y=k.status||"open",Ne=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",u=k.description||"",b={...k,metadata:{...k.metadata||{},...f}};return d`
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
            @click=${Ae}
          >
            ${M}
          </button>
          ${N(S)} ${G(Y,Ne)}
          ${K(k)} ${Z(u)}
          ${oe(k)} ${ce(k)} ${De(k)}
          ${_t(k)} ${L(k)}
          ${yo(k,et)}
          ${vo(b,tt,te())}
          ${oi(T(),j,{total:A(),expanded:x})}
        </div>
      </div>
    `}function J(){he(_e(),t)}return{load(k){k!==a&&(f={},E()),a=k,c=null,ee()},clear(){a=null,c=null,f={},E(),q.close(),R.close(),he(d``,t)},destroy(){Re&&(Re(),Re=null),Ye&&(Ye(),Ye=null),document.removeEventListener("keydown",$e),q.destroy(),P.parentNode&&P.parentNode.removeChild(P),R.destroy(),F.parentNode&&F.parentNode.removeChild(F),a=null,c=null,he(d``,t)}}}var pc=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ai(t,e){return Cn(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function fc(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function li(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(A){let x=r.get();if(x)try{let g=await n("display-policy-set",{expected_revision:x.revision,policy:A(x)});a(g),g&&g.conflict&&g.policy&&(g=await n("display-policy-set",{expected_revision:g.policy.revision,policy:A(g.policy)}),a(g)),g&&g.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(A){A&&A.policy&&typeof A.policy=="object"&&r.set(A.policy)}function c(A){let x=r.get();if(!x)return;let g=ai(A,x)!=="shown";l(U=>fc(A,U,g))}function f(){let A=i.trim();A.length!==0&&(i="",l(x=>x.hidden_prefixes.includes(A)?{hidden_prefixes:x.hidden_prefixes}:{hidden_prefixes:[...x.hidden_prefixes,A]}),E())}function h(A){l(x=>({hidden_prefixes:x.hidden_prefixes.filter(g=>g!==A)}))}function w(A){let x=r.get();if(!x)return;let g=x.chips[A]===!1;l(()=>({chips:{[A]:g}}))}function $(A){let x=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${x.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${x.map(g=>{let U=ai(g,A);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${U}`}
                  data-label=${g}
                  data-state=${U}
                  @click=${()=>c(g)}
                >
                  ${g}
                </button>`})}
            </div>`}
      </section>
    `}function v(A){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${A.hidden_prefixes.map(x=>d`<span class="display-settings__prefix">
                ${x}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${x} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h(x)}
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
            @input=${x=>{i=String(x.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function C(A){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${pc.map(([x,g])=>d`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${x}
                  .checked=${A.chips[x]!==!1}
                  @change=${()=>w(x)}
                />
                <span>${g}</span>
              </label>`)}
        </div>
      </section>
    `}function E(){let A=r.get();he(d`
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
            ${A?d`${$(A)} ${v(A)}
                ${C(A)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let P=!1,q=()=>{P=!1};o.addEventListener("close",q),o.addEventListener("cancel",q);let F=null;r.subscribe&&(F=r.subscribe(()=>{P&&E()}));function R(){P||(i="",P=!0,E(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function T(){P&&(P=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:R,close:T,destroy(){P=!1,o.removeEventListener("close",q),o.removeEventListener("cancel",q),F&&(F(),F=null),o.remove()}}}function ci(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,f,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let w=typeof h=="string"?h.trim():"";if(s&&(w.length>0?(s.textContent=w,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Mr(t){let e=Ct(t.created_at),r=Ct(t.updated_at);return!e&&!r?"":d`<div class="worker-mini__meta">
    ${e?d`<span title=${`\uC0DD\uC131 ${ft(t.created_at)}`}
          >생성 ${e}</span
        >`:""}${e&&r?d`<span>·</span>`:""}${r?d`<span title=${`\uC218\uC815 ${ft(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function ss(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Mt(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait"||!!t.revise_action,i=e?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",l=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,a=d`<span class="worker-mini__title">${t.title}</span>`,c=t.pr_url&&t.pr_number?d`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",f=r.map(F=>F===t.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${F}</span
        >`:d`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${F}</span
        >`),h=t.reason?d`<span class="worker-mini__reason">${t.reason}</span>`:"",w=n?d`<span class="worker-usage" title=${fr(t.usage)}
        >${n}</span
      >`:"",$=s?d`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",v=t.merge_action?d`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${t.id}
        ?disabled=${t.merge_enabled===!1}
        title=${t.merge_title||""}
      >
        ${t.merge_label||"\uBA38\uC9C0"}
      </button>`:"",C=t.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${t.id}
        ?disabled=${t.cancel_enabled===!1}
        title=${t.cancel_title||""}
      >
        취소
      </button>`:"",E=t.discard_action?d`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",P=t.revise_action?d`<button
          type="button"
          class="worker-mini__revise-fix"
          data-bead-id=${t.id}
          ?disabled=${t.revise_enabled===!1}
          title=${t.revise_title||"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        >
          finding 수용·수정
        </button>
        <button
          type="button"
          class="worker-mini__revise-approve"
          data-bead-id=${t.id}
          ?disabled=${t.revise_enabled===!1}
          title="델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)"
        >
          승인하고 진행
        </button>`:"",q=!!(n||s||t.merge_action||t.cancel_action||t.discard_action||t.revise_action);return d`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${t.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${o?d`<div class="worker-mini__head">
            ${i}${l}${c}${f}${h}
          </div>
          <div class="worker-mini__body">${a}</div>
          ${q?d`<div class="worker-mini__foot">
                ${w}${$}
                <span class="worker-mini__actions"
                  >${v}${C}${E}${P}</span
                >
              </div>`:""}
          ${Mr(t)}`:d`<div class="worker-mini__line">
            ${i}${l}${a}${c}${f}${h}${w}${$}${v}${C}${E}
          </div>
          ${Mr(t)}`}
  </div>`}function hc(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return d`<div
    class="worker-card${e?"":" worker-card--static"}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    <div class="worker-card__head">
      ${e?d`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${t.id}</span>
      ${r&&s?d`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${t.title}</div>
    ${r?Zr(r,t.status):""}
    <div
      class="worker-card__foot${t.reason?"":" worker-card__foot--actions-only"}"
    >
      ${t.reason?d`<span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >`:""}
      <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 드래그의 보완재이지 대체재가
           아니므로 자격 조건은 드래그와 완전히 같다 — spec 없는 후보만 막고,
           blocked-with-spec은 드래그와 마찬가지로 적재할 수 있다. 표시 조건
           (coarse pointer / 좁은 화면)은 CSS가 소유한다. -->
      <button
        type="button"
        class="worker-card__place"
        data-bead-id=${t.id}
        ?disabled=${!e}
        title=${e?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${Mr(t)}
  </div>`}function Ft(t){let e=!!t.collapsible&&!!t.collapsed,r=d`<span
      class="worker-pane__dot worker-pane__dot--${t.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${t.title}</span>
    ${e&&t.preview?d`<span class="worker-pane__preview">${t.preview}</span>`:""}
    <span class="worker-pane__count">${t.items.length}</span>`;return d`<section
    class="worker-pane worker-pane--lane-${t.lane}${t.src?" worker-pane--src":""}${t.live?" worker-pane--live":""}${t.collapsible?" worker-pane--collapsible":""}${e?" worker-pane--collapsed":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    ${t.collapsible?d`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${t.lane}
          aria-expanded=${e?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${e?"\u25B8":"\u25BE"}</span
          >
        </button>`:d`<header class="worker-pane__hd">
          ${r}${t.header_control?t.header_control:""}
        </header>`}
    ${e?"":d`${t.controls?t.controls:""}
          <div class="worker-pane__body">
            ${t.body?t.body:t.items.length===0?d`<div class="worker-pane__empty">
                    ${t.empty||""}
                  </div>`:t.items.map(n=>t.lane==="candidate"?hc(n):ss(n))}
          </div>`}
  </section>`}var di=160;function os(t){return t.length>di?`${t.slice(0,di)}\u2026`:t}function _c(t){return!t||!t.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?d` · <code>${os(t.command)}</code>`:""}
  </div>`}function gc(t){return t?d`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function mc(t){return t?d`<div class="worker-banner__log-path">
    전체 로그: <code>${t}</code>
  </div>`:""}function is(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function bc(t){if(!t||!t.reason)return"";let e=t.reason.startsWith("export_removal_failed:");return d`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${t.bead_id||""}
  >
    ⚠ ${t.bead_id||"(bead \uBBF8\uC0C1)"} 머지 완료 — capability 발행이
    실패했습니다 (${t.reason}). bead는 closed지만
    ${e?d`취소 처분된 자손의 <code>export:</code> 라벨이 남아 있어 다음
          스윕이 이를 다시 발행 대상으로 읽습니다.`:d`<code>provides:</code> 라벨이 없어 이 capability에 걸린 external
          의존은 계속 막혀 있습니다.`}
    ${t.detail?d`<div class="worker-banner__detail">
          남은 작업: <code>${os(t.detail)}</code>
        </div>`:""}
    <div class="worker-banner__detail">
      ${e?d`수동 복구:
            <code
              >bd -C &lt;워크스페이스&gt; label remove &lt;id&gt;
              export:&lt;capability&gt;</code
            >
            실행 후 <code>bd show &lt;id&gt; --json</code>으로 라벨이 사라졌는지
            확인하세요 — 이 자손은 ship하지 마세요.`:d`수동 복구:
            <code>bd -C &lt;워크스페이스&gt; ship &lt;capability&gt;</code> 실행
            후 <code>bd show &lt;id&gt; --json</code>으로
            <code>provides:</code> 라벨을 확인하세요.`}
    </div>
    ${t.pr_url?d`<div class="worker-banner__detail">
          <code>${t.pr_url}</code>
        </div>`:""}
  </div>`}function ui(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return d`<div class="worker-banners">
    ${t.failure?d`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${t.failure.repo||"repo"} 세션 실패 —
          ${t.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${t.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.failure.resume_attempt_id}
                ?disabled=${!t.failure.resume_eligible}
                title=${t.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${t.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${t.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${_c(t.failure.cause_detail)}
        </div>`:""}
    ${e.map(r=>d`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}).
          <!-- capability 발행은 close 뒤에 오는 유일한 단계라 실패해도 close를
               롤백하지 않는다 (UI-4ii4). "resolved로 남아 있다"는 다른 모든
               단계에만 참이므로 여기서만 문안을 바꾼다. -->
          ${r.step==="ship_exported_capabilities"?"bead\uB294 closed\uB85C \uB0A8\uC544 \uC788\uACE0(close\uB294 \uB864\uBC31\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"bead\uB294 resolved\uB85C \uB0A8\uC544 \uC788\uACE0"}
          자동 재시도는 하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?d`<div class="worker-banner__detail">
                <code>${os(r.detail)}</code>
              </div>`:""}
          ${mc(r.log_path)} ${gc(r.output_tail)}
        </div>`)}
    ${bc(t.shipFailure)}
  </div>`}function wc(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?is(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Mt(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.base_exception||null,c=t.attempt_id&&t.attempt_id===r;return d`<div
    class="rtile${c?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${t.bead_id}</span>
      ${t.resumed_from?d`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${t.resumed_from})`}
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
      ${n?d`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:d`<button
            type="button"
            class="rtile__pause"
            ?disabled=${t.can_pause===!1}
            title=${t.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
            aria-label="일시정지"
          >
            ⏸
          </button>`}
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${t.title}</div>
    ${t.current_child?d`<div class="rtile__child" title="현재 진행중 child">
          └ ${t.current_child}
        </div>`:""}
    ${o||i||l||a?d`<div class="rtile__meta">
          ${l?d`<span class="worker-mini__badge">${l}</span>`:""}
          ${a?d`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${a}</span
              >`:""}
          ${o?d`<span class="rtile__runner">${o}</span>`:""}
          ${i?d`<span class="worker-usage" title=${fr(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    ${Mr(t)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function as(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>wc(s,e,r))}
  </div>`}var kc=6e4;function yc(t,e){if(typeof t!="number"||!Number.isFinite(t))return"";let n=e-t<kc,s=`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ft(t)}`;return d`<span
    class="mon-row__beat${n?" mon-row__beat--live":""}"
    title=${s}
    ><span class="mon-row__beat-dot" aria-hidden="true"></span>${n?"":d`<span class="mon-row__beat-age"
          >${Ct(t,e)}</span
        >`}</span
  >`}function vc(t,e){let r=Mt(t.usage),n=t.has_attempt===!0,s=n&&typeof t.started_at=="number"?is(e-t.started_at):"",o=n?"":Ct(t.updated_at,e);return d`<div class="mon-row" data-issue-id=${t.id} role="listitem">
    <span class="mon-row__spine" aria-hidden="true"></span>
    <button type="button" class="mon-row__id" title="상세 열기">
      ${t.id}
    </button>
    <span class="mon-row__title">${t.title||t.id}</span>
    ${t.current_child?d`<span class="mon-row__child" title="현재 진행중 child"
          >└ ${t.current_child}</span
        >`:""}
    <span class="mon-row__live">
      ${s?d`<span class="mon-row__elapsed">${s}</span>`:""}
      ${n?yc(t.last_event_at,e):""}
      ${o?d`<span
            class="mon-row__since"
            title=${`\uC218\uC815 ${ft(t.updated_at)}`}
            >마지막 갱신 ${o}</span
          >`:""}
      ${r?d`<span class="worker-usage" title=${fr(t.usage)}
            >${r}</span
          >`:""}
    </span>
  </div>`}function pi(t,e=Date.now()){let r=Array.isArray(t)?t:[];return d`<section class="mon-group" id="monitor-in-progress">
    <header class="mon-group__hd">
      <span class="mon-group__title">진행중</span>
      <span class="mon-group__count">${r.length}</span>
    </header>
    ${r.length===0?d`<div class="mon-group__empty">진행중 이슈 없음</div>`:d`<div class="mon-group__list" role="list">
          ${r.map(n=>vc(n,e))}
        </div>`}
  </section>`}var ls="tab:monitor:in-progress",$c=1e3;function xc(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function fi(t,e){let r=Ce("views:monitor"),n=e.gotoIssue,s=e.issueStores,o=e.queueStore,i=e.now||(()=>Date.now()),l=null,a=null,c=null;function f(){return(s&&s.snapshotFor?s.snapshotFor(ls)||[]:[]).slice().sort((P,q)=>(Ot(q&&q.updated_at)??0)-(Ot(P&&P.updated_at)??0))}function h(){let E=new Map,P=o&&o.get?o.get():null,q=P&&P.attempts||{};for(let F of Object.values(q)){if(!F||F.status!=="running")continue;let R=F.bead_id;typeof R!="string"||R.length===0||E.set(R,{started_at:typeof F.started_at=="number"?F.started_at:null,last_event_at:typeof F.last_event_at=="number"?F.last_event_at:null,usage:Nt(q,R)})}return E}function w(){let E=f(),P=new Map;for(let F of E){let R=xc(F);if(!R)continue;let T=P.get(R);T?T.push(F):P.set(R,[F])}let q=h();return E.map(F=>{let R=q.get(F.id)||null,T=lr(P.get(F.id)||[]);return{id:F.id,title:F.title||F.id,current_child:T?T.title||T.id:null,started_at:R?R.started_at:null,last_event_at:R?R.last_event_at:null,updated_at:F.updated_at,usage:R?R.usage:null,has_attempt:!!R}})}function $(){he(pi(w(),i()),t)}function v(E){let P=E.target,q=P&&P.closest?P.closest(".mon-row"):null;if(!q)return;let F=q.getAttribute("data-issue-id");F&&(E.preventDefault(),n(F))}t.addEventListener("click",v),s&&typeof s.subscribe=="function"&&(l=s.subscribe(()=>{try{$()}catch{}})),o&&typeof o.subscribe=="function"&&(a=o.subscribe(()=>{try{$()}catch{}}));function C(){c!==null&&(clearInterval(c),c=null)}return{load(){r("load"),$(),c===null&&(c=setInterval(()=>{try{$()}catch{}},$c))},pause(){C()},clear(){C(),l&&(l(),l=null),a&&(a(),a=null),t.removeEventListener("click",v),t.replaceChildren()}}}function hi(t,e,r){let n=Ce("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let a=e.getState(),c=a.view==="worker"||a.view==="monitor"?a.view:"board";return d`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${c==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${c==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${c==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function l(){he(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),he(d``,t)}}}var _i=["bug","feature","task","epic","chore"];function gi(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var mi=["Critical","High","Medium","Low","Backlog"];function bi(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),w=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let T=document.createElement("option");T.value="",T.textContent="\u2014 Select \u2014",o.appendChild(T);for(let A of _i){let x=document.createElement("option");x.value=A,x.textContent=gi(A),o.appendChild(x)}i.replaceChildren();for(let A=0;A<=4;A+=1){let x=document.createElement("option");x.value=String(A);let g=mi[A]||"Medium";x.textContent=`${A} \u2013 ${g}`,i.appendChild(x)}}$();function v(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function C(T){s.disabled=T,o.disabled=T,i.disabled=T,l.disabled=T,a.disabled=T,f.disabled=T,h.disabled=T,h.textContent=T?"Creating\u2026":"Create"}function E(){c.textContent=""}function P(T){c.textContent=T}function q(){try{let T=window.localStorage.getItem("beads-ui.new.type");T?o.value=T:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?i.value=A:i.value="2"}catch{o.value="",i.value="2"}}function F(){let T=o.value||"",A=i.value||"";T.length>0&&window.localStorage.setItem("beads-ui.new.type",T),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function R(){E();let T=String(s.value||"").trim();if(T.length===0){P("Title is required"),s.focus();return}let A=Number(i.value||"2");if(!(A>=0&&A<=4)){P("Priority must be 0..4"),i.focus();return}let x=String(o.value||""),g=String(a.value||""),U={title:T};x.length>0&&(U.type=x),String(A).length>0&&(U.priority=A),g.length>0&&(U.description=g),C(!0);try{await e("create-issue",U)}catch{C(!1),P("Failed to create issue");return}F(),C(!1),v()}return r.addEventListener("cancel",T=>{T.preventDefault(),v()}),w.addEventListener("click",()=>v()),f.addEventListener("click",()=>v()),r.addEventListener("keydown",T=>{T.key==="Enter"&&(T.ctrlKey||T.metaKey)&&(T.preventDefault(),R())}),n.addEventListener("submit",T=>{T.preventDefault(),R()}),{open(){n.reset(),E(),q();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){v()}}}function wi(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function ki(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var Sc={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},yi=160;function Tc(t){return t.length>yi?`${t.slice(0,yi)}\u2026`:t}var Ac=[{key:"orchestration_model",values:()=>Ln},{key:"orchestration_effort",values:()=>Dn},{key:"review_model",values:()=>On},{key:"impl_model",values:()=>Mn}];function vi(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let g=i();return typeof g.revision=="number"?g.revision:0}function a(){let g=i().exec_defaults;return g&&typeof g=="object"?g:{}}function c(g){g&&g.queue&&r&&r.set(g.queue)}async function f(g,U){if(!n)return;let W={key:g,value:U||null};try{let j=await n("worker-queue-set-exec-default",{...W,expected_revision:l()});c(j),j&&j.conflict&&(j=await n("worker-queue-set-exec-default",{...W,expected_revision:l()}),c(j)),j&&j.conflict&&Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function h(g,U,W){let j=!!W&&!U.includes(W);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${g}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${g}`}
        data-key=${g}
        @change=${te=>{f(g,te.target.value)}}
      >
        <option value="" ?selected=${!W}>
          ${Nn[g]||"(\uAE30\uBCF8)"}
        </option>
        ${j?d`<option value=${W} ?selected=${!0}>
              ${W} (비호환)
            </option>`:""}
        ${U.map(te=>d`<option value=${te} ?selected=${W===te}>${te}</option>`)}
      </select>
    </div>`}function w(){let g=i().workspace_info;return g&&typeof g=="object"?g:{}}function $(g,U){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${g}"
      >${U}</span
    >`}function v(g){let U=g?ki(g.cmd):"",W=g?wi(g.timeout_ms):"",j=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${U?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${U}</span>
            ${$("config","config")}
            ${W?d`<span class="exec-defaults__vd-meta"
                  >timeout ${W}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${j}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function C(g){let U=g?ki(g.cmd):"",W=g?wi(g.timeout_ms):"",j=W?`timeout ${W} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",te=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${U?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${U}</span>
            ${$("config","config")}
            ${g.detached===!0?$("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${j}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${te}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function E(g){if(!g||typeof g!="object")return"";let U=Sc[String(g.outcome)];if(!U)return"";let W=g.outcome==="failed"&&g.reason?`${U.label} \xB7 ${g.reason}`:U.label,j=[ft(g.at),typeof g.bead_id=="string"?g.bead_id:"",typeof g.base_sha=="string"?g.base_sha.slice(0,7):""].filter(Ye=>Ye.length>0).join(" \xB7 "),te=typeof g.detail=="string"&&g.detail.length>0?Tc(g.detail):"",Re=typeof g.log_path=="string"&&g.log_path.length>0?g.log_path:"";return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${$(U.modifier,W)}
        ${j?d`<span class="exec-defaults__vd-meta">${j}</span>`:""}
      </div>
      ${te?d`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${te}</code>
          </div>`:""}
      ${Re?d`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${Re}</code>
          </div>`:""}
    </div>`}function P(g){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${v(g.verify_cmd)} ${C(g.deploy_cmd)}
      ${E(g.last_deploy)}
    </section>`}function q(){let g=a();he(d`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${x}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            <p class="exec-defaults__hint">
              워크스페이스 전역 기본값입니다. bead metadata가 우선하며, '(기본:
              …)'은 이 전역값도 미설정일 때 실제 적용되는 하드코딩·CLI·워크플로
              기본입니다.
            </p>
            ${Ac.map(U=>h(U.key,U.values(),g[U.key]||""))}
            ${P(w())}
          </div>
        </div>
      `,o)}let F=!1,R=()=>{F=!1};o.addEventListener("close",R),o.addEventListener("cancel",R);let T=null;r&&r.subscribe&&(T=r.subscribe(()=>{F&&q()}));function A(){F||(F=!0,q(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function x(){F&&(F=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:A,close:x,destroy(){F=!1,o.removeEventListener("close",R),o.removeEventListener("cancel",R),T&&(T(),T=null),o.remove()}}}var Ec="tab:worker:ready",Cc="tab:worker:blocked",Rc="tab:worker:in-progress",un=1;function us(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Ti="beads-ui.worker.candidate-filter",cs={show_blocked:!1,spec:"all"};function Ic(){try{let t=window.localStorage.getItem(Ti);if(!t)return{...cs};let e=JSON.parse(t);if(!e||typeof e!="object")return{...cs};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...cs}}}function Lc(t){try{window.localStorage.setItem(Ti,JSON.stringify(t))}catch{}}function Dc(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Oc=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ai="bdui.worker.candidate_sort",Mc=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],pn="spec";function Nc(){try{let t=window.localStorage.getItem(Ai);return t==="board"||t==="created"||t==="spec"?t:pn}catch{return pn}}function Pc(t){try{window.localStorage.setItem(Ai,t)}catch{}}var Ei="bdui.worker.done-range";function Fc(){try{let t=window.localStorage.getItem(Ei);return nr(t)?t:Dt}catch{return Dt}}function qc(t){try{window.localStorage.setItem(Ei,t)}catch{}}var Bc="(max-width: 640px)",Ci="beads-ui.worker.lane-collapsed",Nr={queue:!0,done:!0};function Uc(){try{let t=window.localStorage.getItem(Ci);if(!t)return{...Nr};let e=JSON.parse(t);return!e||typeof e!="object"?{...Nr}:{queue:typeof e.queue=="boolean"?e.queue:Nr.queue,done:typeof e.done=="boolean"?e.done:Nr.done}}catch{return{...Nr}}}function zc(t){try{window.localStorage.setItem(Ci,JSON.stringify(t))}catch{}}function $i(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Hc(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(jt):(n.sort(Gr(r)),e==="board"?n:[...n.filter(us),...n.filter(s=>!us(s))])}function Wc(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Gc(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function jc(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Yc=["closed_unmerged","undecidable"],Vc=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Kc(t,e){for(let r of Vc)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var ds=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function Zc(t){if(typeof t!="string"||t.length===0)return null;let e=ds.length,r=ds.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:ds[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function xi(t){switch(t){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return t}}function Si(t,e){return typeof t!="string"||t.length===0||typeof e!="string"||e.length===0||e===t?null:`\u2192 ${e}`}function Xc(t,e,r,n,s=null,o=null,i=null,l=!1,a=null,c=!0,f=null,h=null){let w=!!a&&a.position>0,$=!!a&&a.active===!0,v=a&&a.failure||null,C=r[t]||null,E=C&&C.gate?C.gate:null,P=C&&C.pr?C.pr:null,q=[];l&&q.push("\uC138\uC158");let F=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,R=Kc(l&&E&&E.tier==="closed_unmerged"?"\uB2EB\uD798":E&&E.gate_badge||"",F?null:o&&o.activity||null);F&&q.push(F),R.label&&q.push(R.label),E&&E.base_badge&&E.base_badge!==E.gate_badge&&q.push(E.base_badge),h&&q.push(h),n&&q.push("\uC815\uB9AC \uC2E4\uD328"),w&&!$&&q.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),v&&q.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${xi(v)}`),f&&q.push(`\uC790\uB3D9 \uC81C\uC678: ${xi(f)}`);let T=!!E&&E.base_badge==="\uCDA9\uB3CC",A=!!E&&E.enabled===!0,x=Zc(o&&o.merge_progress?o.merge_progress.step:null),g=!!n&&!!E&&E.tier==="merged",U=l&&!!E&&E.tier==="merged",W=l&&T&&c===!1;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:P&&typeof P.number=="number"?P.number:null,pr_url:P&&typeof P.url=="string"?P.url:"",badges:q,live_badge:i==="running"?F:F?null:R.live?R.label:null,usage:s,alert:!!E&&Yc.includes(E.tier)||!!n||!!v,merge_action:!w,cancel_action:w,cancel_enabled:!$,cancel_title:$?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(E&&E.tier==="merged"),merge_step:x,discard_enabled:!x&&!i&&!w,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":w?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!x&&!i&&!W&&(A||T||g||U),merge_label:U?"\uC815\uB9AC":T&&!x&&!g?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:x?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${x.label}`:U?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":W?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":g?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":T?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":A?`\uBA38\uC9C0 (${E.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:E&&E.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${E&&E.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ps(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?Yr(n,i):null,f=Vr({transport:r,uiOrderStore:i}),h=null,w=[],$=Ic(),v=Nc(),C=Fc();function E(){let u=yr.find(b=>b.value===C);return u?u.label:"\uC624\uB298"}let P=Uc(),q=!1,F=new Set,R=new Set,T=[],A=document.createElement("div");A.className="worker-console";let x=document.createElement("div");x.className="worker-top";let g=document.createElement("div");g.className="worker-drawer-overlay",g.hidden=!0;let U=document.createElement("div");U.className="worker-drawer-overlay__backdrop";let W=document.createElement("div");W.className="worker-drawer-host",g.append(U,W);let j=document.createElement("div");j.className="worker-lanes-host",A.append(x,g,j),t.appendChild(A);let te=null,Re=Xr(W,{transport:r,sessionLogStore:o,onClose:()=>{te=null,g.hidden=!0,de()}}),Ye=vi(A,{queueStore:s,transport:r,getWorkspacePath:a});function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:un,queue:[],pr_wait:[],done:[]}}function ee(){let u=$e();return typeof u.revision=="number"?u.revision:0}function ae(u){u&&u.queue&&s&&s.set(u.queue)}function Ae(){let u=$e().queue;return Array.isArray(u)?u.length:0}async function xe(u,b){if(!r)return;let I=await r("worker-queue-place",{bead_id:u,index:b,expected_revision:ee()});ae(I),I&&I.conflict&&await r("worker-queue-place",{bead_id:u,index:b,expected_revision:ee()}).then(ae)}async function ct(u,b){if(!r)return;let I=await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:ee()});ae(I),I&&I.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:ee()}).then(ae)}async function me(u){if(!r)return;let b=await r("worker-queue-remove",{bead_id:u,expected_revision:ee()});ae(b),b&&b.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:ee()}).then(ae)}async function Fe(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function be(u){if(!r||!u)return;let b=await r("worker-attempt-pause",{attempt_id:u});b&&b.paused===!1&&b.reason&&Q(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function Ze(u){if(!r||!u)return;let b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:ee()});ae(b),b&&b.conflict&&(b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:ee()}),ae(b)),b&&b.resumed===!1&&!b.conflict&&b.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function fe(u){if(!r||!u)return;let b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:ee()});ae(b),b&&b.conflict&&(b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:ee()}),ae(b)),b&&b.dismissed===!1&&!b.conflict&&b.reason&&Q(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function Oe(u,b){if(!r)return null;let I=r,re=await I(u,{...b,expected_revision:ee()});return ae(re),re&&re.conflict&&(re=await I(u,{...b,expected_revision:ee()}),ae(re)),re}async function dt(u){if(!r||!u)return;F.add(u),de();let b;try{b=await Oe("worker-merge-queue-add",{bead_id:u})}finally{F.delete(u),de()}!b||b.conflict||b.applied||Q("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Ve(u){if(!r)return;let b=await Oe("worker-merge-auto-toggle",{on:u});!b||b.conflict||Q(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function $t(u){if(!r||!u)return;let b=await Oe("worker-merge-queue-remove",{bead_id:u});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&Q("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function We(){await Oe("worker-merge-queue-remove",{all:!0})}async function ut(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let I=await r("worker-pr-discard",{bead_id:u,expected_revision:ee()});if(ae(I),I&&I.conflict&&(I=await r("worker-pr-discard",{bead_id:u,expected_revision:ee()}),ae(I)),I&&I.discarded===!0){Q("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}I&&I.discarded===!1&&!I.conflict&&Q(`\uD3D0\uAE30 \uAC70\uBD80: ${I.reason||""}`,"error",2800)}async function Qe(u,b){if(!r||!b||R.has(b))return;R.add(b),de();let I;try{I=await r(u,{bead_id:b,expected_revision:ee()}),ae(I),I&&I.conflict&&(I=await r(u,{bead_id:b,expected_revision:ee()}),ae(I))}finally{R.delete(b),de()}if(!(!I||I.conflict)){if(I.ok){Q(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Q(`\uCC98\uBD84 \uAC70\uBD80: ${I.reason||""}`,"error",3e3)}}async function Ke(u){if(!r)return;let b=await r("worker-queue-toggle",{on:u,expected_revision:ee()});ae(b),b&&b.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:ee()}).then(ae)}async function Je(u){await Ke(u),await Ve(u)}async function Ge(u){if(!r||!Number.isFinite(u))return;let b=Math.max(un,Math.floor(u)),I=await r("worker-queue-set-slots",{slots:b,expected_revision:ee()});ae(I),I&&I.conflict&&await r("worker-queue-set-slots",{slots:b,expected_revision:ee()}).then(ae)}function ze(){let u=$e(),b=c?c.selectBoardColumn(Ec,"ready"):[],I=c?c.selectBoardColumn(Cc,"blocked"):[],re=c?c.selectBoardColumn(Rc,"in_progress"):[],ke=new Map;for(let y of re){let B=Gc(y);if(!B)continue;let X=ke.get(B);X?X.push(y):ke.set(B,[y])}let se=y=>{let B=lr(ke.get(y)||[]);return B?B.title||B.id:null},we=u.bead_titles||{},Se=new Map;for(let[y,B]of Object.entries(we))typeof B=="string"&&B.length>0&&Se.set(y,B);for(let y of[...b,...I])Se.set(y.id,y.title||y.id);let je=u.bead_times||{},ne=new Map;for(let[y,B]of Object.entries(je))B&&typeof B=="object"&&ne.set(y,B);for(let y of[...b,...I])ne.set(y.id,{created_at:y.created_at,updated_at:y.updated_at});let Xe=y=>ne.get(y)||{},gt=u.pr_wait||[],xt=u.pr_observations||{},qe=u.pr_activity||{},nt=u.cleanup_failed||{},ie=Object.entries(nt).map(([y,B])=>({bead_id:y,step:B&&B.step?B.step:"",reason:B&&B.reason?B.reason:"",detail:B&&typeof B.detail=="string"?B.detail:null,output_tail:B&&typeof B.output_tail=="string"&&B.output_tail?B.output_tail:void 0,log_path:B&&typeof B.log_path=="string"&&B.log_path?B.log_path:void 0})),ue=u.ship_failure||null,St=ue&&typeof ue.reason=="string"&&ue.reason?{bead_id:typeof ue.bead_id=="string"?ue.bead_id:"",reason:ue.reason,detail:typeof ue.detail=="string"?ue.detail:null,pr_url:typeof ue.pr_url=="string"?ue.pr_url:null}:null,At=u.queue||[],st=new Set([...At.map(y=>y.bead_id),...gt.map(y=>y.bead_id),...u.done.map(y=>y.bead_id)]),Bt=new Set(I.map(y=>y.id)),_=i?i.get()?.order||{}:{},m=new Set,z=[];for(let y of[...b,...I])st.has(y.id)||m.has(y.id)||Wc(y)||(m.add(y.id),z.push(y));w=Hc(z,v,_);let V=u.admission||{},O=y=>{let B=V[y];if(!B)return"";if(B.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let X=typeof B.reason=="string"?B.reason:"",ye=X.indexOf(":");return ye>0&&ye<X.length-1?`\u26D4 ${X.slice(0,ye)} (${X.slice(ye+1)})`:`\u26D4 ${X}`},p=w.map(y=>{let B=us(y),X=Bt.has(y.id),ye=[];X&&ye.push(jc(y)),B||ye.push("spec \uC5C6\uC74C");let Br=O(y.id);return Br&&ye.push(Br),{id:y.id,title:y.title||y.id,reason:ye.join(" \xB7 "),draggable:B,lane:"candidate",created_at:y.created_at,updated_at:y.updated_at,workflow:y.workflow,status:y.status,blocked:X,has_spec:B}}),D=Dc(p,$),H=D.visible,Te=u.revise_parked||{},He=(y,B)=>y.map(X=>{let ye=B==="queue"?Te[X.bead_id]:null;return{id:X.bead_id,title:Se.get(X.bead_id)||X.bead_id,reason:B==="done"?"":O(X.bead_id),draggable:B!=="done",done:B==="done",lane:B,badges:ye?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ye,revise_action:!!ye,revise_enabled:!!ye&&!R.has(X.bead_id),revise_title:ye?ye.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ye.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:B==="done"?Nt(u.attempts||{},X.bead_id):null,...Xe(X.bead_id)}}),Le=new Map;for(let y of u.done)y&&typeof y.bead_id=="string"&&typeof y.added_at=="number"&&Le.set(y.bead_id,y.added_at);let Be=u.attempts?Object.values(u.attempts):[],mt=new Set;for(let y of Be)y&&typeof y.resumed_from=="string"&&y.resumed_from.length>0&&mt.add(y.resumed_from);let Et=new Map;for(let y of Be)Et.set(y.bead_id,y.attempt_id);let Jt=new Map;for(let y of Be)Jt.set(y.attempt_id,y);function Ue(y){let B=new Set,X=y;for(;X&&!B.has(X.attempt_id);){if(X.conflict_resolution===!0)return!0;B.add(X.attempt_id),X=typeof X.resumed_from=="string"&&X.resumed_from.length>0&&Jt.get(X.resumed_from)||null}return!1}let er=typeof u.declared_base=="string"?u.declared_base:null;function Pr(y){let B=null;for(let X of Be)!X||X.bead_id!==y||Ue(X)||(B===null||(typeof X.started_at=="number"?X.started_at:0)>=(typeof B.started_at=="number"?B.started_at:0))&&(B=X);return B&&typeof B.target_base=="string"?B.target_base:null}let hr=[],Tt=null;for(let y of Be){let B=y.status==="paused"&&!mt.has(y.attempt_id);if(y.status==="running"||B)hr.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:Se.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,paused:B,conflict_resolution:Ue(y),base_exception:Si(er,y.target_base),can_pause:typeof y.session_id=="string"&&y.session_id.length>0,usage:Nt(u.attempts||{},y.bead_id),current_child:se(y.bead_id),...Xe(y.bead_id)});else if(y.status==="failed"||y.status==="orphaned"){let X=Et.get(y.bead_id)!==y.attempt_id,ye=Le.get(y.bead_id),Br=typeof ye=="number"&&ye>0&&typeof y.finished_at=="number"&&ye>=y.finished_at;!X&&!Br&&typeof y.dismissed_at!="number"&&(Tt=y)}}let gs=null;if(Tt){let y=typeof Tt.session_id=="string"&&Tt.session_id.length>0,B=mt.has(Tt.attempt_id),X=Tt.cause_detail;gs={repo:Tt.repo||"",reason:Tt.cause||Tt.status,cause_detail:X&&typeof X.reason=="string"?{reason:X.reason,command:typeof X.command=="string"?X.command:null}:null,resume_attempt_id:Tt.attempt_id,resume_eligible:y&&!B,resume_reason:y?B?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Bi=new Set(hr.map(y=>y.bead_id)),fn=Array.isArray(u.merge_queue)?u.merge_queue:[],ms=new Map;fn.forEach((y,B)=>{y&&typeof y.bead_id=="string"&&ms.set(y.bead_id,B+1)});let bs=u.merge_queue_state||{active:null,failures:{}},Ui=bs.failures||{},zi=u.auto_merge_skips||{},ws=y=>{let B=zi[y];if(!B)return null;let X=xt[y],ye=X&&X.pr?X.pr.head_sha:null;return ye&&ye===B.head_sha?B.reason||"":null},Fr=new Map;for(let y of hr)y.conflict_resolution&&(y.paused?Fr.has(y.bead_id)||Fr.set(y.bead_id,"paused"):Fr.set(y.bead_id,"running"));let ks=hr.filter(y=>!y.paused).length,ys=(u.workspace_info||{}).slots,vs=typeof ys=="number"?ys:typeof u.slots=="number"?u.slots:un,Hi=ks>vs,$s=zr(C),Wi=(Array.isArray(u.done)?u.done.slice():[]).filter(y=>$s===void 0||typeof y.added_at!="number"||y.added_at>=$s).sort((y,B)=>(B.added_at||0)-(y.added_at||0)),xs=He(Wi,"done"),qr={};for(let y of ur)qr[y]=0;let Ss=!1,Ts=0,hn=0,As=0;for(let y of xs){let B=y.usage;if(B&&typeof B=="object"){let X=!1;for(let ye of ur)Number.isFinite(B[ye])&&(qr[ye]+=B[ye],Ss=!0,X=!0);X&&(hn+=1,Number.isFinite(B.total_cost_usd)&&(Ts+=B.total_cost_usd,As+=1))}}hn>0&&As===hn&&(qr.total_cost_usd=Ts);let Gi=Ss?Mt(qr):null;return{queue:u,idToTitle:Se,candidates:H,candidate_hidden:{blocked:D.hidden_blocked,spec:D.hidden_spec},running:hr,live_count:ks,slots:vs,over_cap:Hi,failure:gs,waiting:He(At.filter(y=>!Bi.has(y.bead_id)),"queue"),pr_wait:gt.map(y=>Xc(y.bead_id,Se.get(y.bead_id)||y.bead_id,xt,nt[y.bead_id]||null,Nt(u.attempts||{},y.bead_id),qe[y.bead_id]||(F.has(y.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Fr.get(y.bead_id)||null,y.external===!0,{position:ms.get(y.bead_id)||0,active:bs.active===y.bead_id,failure:Ui[y.bead_id]||null},y.wt_present!==!1,u.auto_merge===!0?ws(y.bead_id):null,Si(er,Pr(y.bead_id)))).map(y=>({...y,...Xe(y.id)})),merge_queue_length:fn.length,merge_queue_running:fn.length>0,auto_excluded:gt.map(y=>y.bead_id).filter(y=>ws(y)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:er,done:xs,token_total:Gi,cleanup_failures:ie,ship_failure:St}}function Ee(u){let b=u.waiting.length>0?u.waiting[0].id:"\u2014",I=d`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,re=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,ke=d`<button
      type="button"
      class="worker-auto-all${re?" is-active":""}"
      title=${re?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${re?"true":"false"}
    >
      ${re?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,se=u.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",we=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${E()} 완료 <b>${u.done.length}</b></span
      >`,Se=d`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,je=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${un}
          step="1"
          .value=${String(u.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,ne=ui({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return q?d`<div class="worker-ribbon">
          ${I}
          <div class="worker-kpi worker-kpi--ribbon">${se}${we}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ke}${je}</div>
          <div class="worker-kpi">${Se}</div>
        </div>
        ${ne}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${I}${ke}${je}</div>
        <div class="worker-kpi">
          ${se}${we}${Se}
          ${u.token_total?d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${E()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${E()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${b}</b></span
          >
        </div>
      </div>
      ${ne}`}function Ie(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let b=u.running.some(I=>!I.paused);return d`<section
      class="worker-now${b?" worker-pane--live":""}"
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
        ${ht(u)}
      </header>
      ${u.running.length>0?as(u.running,Date.now(),te):""}
      ${u.pr_wait.map(I=>ss(I))}
    </section>`}function et(u){let b=u.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Oc.map(I=>d`<button
              type="button"
              class="worker-filter__chip${$.spec===I.value?" is-active":""}"
              data-spec=${I.value}
              aria-pressed=${$.spec===I.value?"true":"false"}
            >
              ${I.label}
            </button>`)}
        ${b.spec>0?d`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function tt(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${Mc.map(u=>d`<option value=${u.value} ?selected=${v===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function rt(){return d`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${C}
      >
        ${yr.map(u=>d`<option value=${u.value} ?selected=${C===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function ht(u){let b=u.queue.auto_merge===!0;if(u.merge_queue_running)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${b?" is-active":""}"
        title=${b?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${b?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(b)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let I=new Set(u.auto_excluded),re=u.pr_wait.filter(ke=>ke.merge_action&&ke.merge_enabled&&!I.has(ke.id)).length;return d`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${re>0?` ${re}`:""}
    </button>`}function De(u){let b=Ft({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:tt(),controls:et(u)});return q?d`<div class="worker-lanes worker-lanes--mobile">
        ${Ie(u)}
        ${Ft({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:P.queue,preview:$i(u.waiting)})}
        ${b}
        ${Ft({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${E()} \uC644\uB8CC \uC5C6\uC74C`,controls:rt(),collapsible:!0,collapsed:P.done,preview:u.token_total||$i(u.done)})}
      </div>`:d`<div class="worker-lanes">
      ${b}
      ${Ft({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Ft({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(I=>!I.paused),body:as(u.running,Date.now(),te)})}
      ${Ft({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:ht(u)})}
      ${Ft({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${E()} ${u.done.length}`,items:u.done,empty:`${E()} \uC644\uB8CC \uC5C6\uC74C`,controls:rt()})}
    </div>`}function _t(u){P={...P,[u]:!P[u]},zc(P),de()}function de(){let u=ze();he(Ee(u),x),he(De(u),j)}function Me(){let u=document.querySelector(".app-header");if(!u)return;let b=()=>{let I=Math.round(u.getBoundingClientRect().height);A.style.setProperty("--worker-ribbon-top",`${I}px`)};if(b(),typeof ResizeObserver=="function"){let I=new ResizeObserver(b);I.observe(u),T.push(()=>I.disconnect())}else window.addEventListener("resize",b),T.push(()=>window.removeEventListener("resize",b))}function L(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Bc);q=!!u.matches;let b=I=>{let re=!!(I&&typeof I.matches=="boolean"?I.matches:u.matches);re!==q&&(q=re,de())};typeof u.addEventListener=="function"?(u.addEventListener("change",b),T.push(()=>u.removeEventListener("change",b))):typeof u.addListener=="function"&&(u.addListener(b),T.push(()=>u.removeListener(b)))}function N(u){let b=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!b)return;let I=b.dataset.beadId||"",re=b.dataset.lane||"";h={bead_id:I,from_lane:re};try{u.dataTransfer?.setData("text/plain",I),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function K(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;let I=b.dataset.lane||"";I!=="candidate"&&I!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),b.classList.add("worker-pane--drag-over"))}function G(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Z(u,b){let I=w.find(we=>we.id===u);if(!I)return;let re=w.filter(we=>we.id!==u),ke=re.length;if(b){let we=b.dataset.beadId;if(we===u)return;let Se=re.findIndex(je=>je.id===we);Se>=0&&(ke=Se)}let se=re.slice();se.splice(ke,0,I),f.applyReorder(u,se,ke)}function oe(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;u.preventDefault(),b.classList.remove("worker-pane--drag-over");let I=b.dataset.lane||"",re=h?.bead_id||u.dataTransfer?.getData("text/plain")||"",ke=h?.from_lane||"";if(h=null,!re)return;let se=u.target?.closest?.(".worker-mini, .worker-card"),we=Array.from(b.querySelectorAll(".worker-mini, .worker-card")),Se=we.length;if(se){let je=we.indexOf(se);je>=0&&(Se=je)}if(b.classList.contains("worker-pane--collapsed")&&(Se=Ae()),I==="candidate"){if(ke==="candidate"){Z(re,se);return}ke==="queue"&&me(re);return}I==="queue"&&(ke==="queue"?ct(re,Se):xe(re,Se))}function ce(u){$=u,Lc(u),de()}function _e(u){v=u==="board"||u==="created"||u==="spec"?u:pn,Pc(v),de()}function J(u){C=nr(u)?u:Dt,qc(C),de()}function k(u){let b=u.target?.closest?.(".worker-filter__blocked");if(b){ce({...$,show_blocked:b.checked});return}let I=u.target?.closest?.(".worker-done-range");if(I){J(I.value);return}let re=u.target?.closest?.(".worker-sort");if(re){_e(re.value||pn);return}let ke=u.target?.closest?.(".worker-slots__input");if(!ke)return;let se=Number.parseInt(ke.value,10);if(!Number.isFinite(se)){de();return}Ge(se).then(de)}function M(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function S(u){let b=$e(),I=b.attempts?b.attempts[u]:null;te=u,g.hidden=!1,Re.open({attempt_id:u,meta:M(I)}),de()}function Y(){if(!te)return;let u=$e(),b=u.attempts?u.attempts[te]:null;if(b){Re.updateMeta(M(b));return}Re.close()}function Ne(u){let b=u.target;if(b?.closest?.("#worker-exec-defaults-dialog"))return;if(b?.closest?.(".worker-exec-defaults-btn")){Ye.open();return}let I=b?.closest?.(".worker-banner__resume");if(I){let ie=I.dataset.attemptId;ie&&Ze(ie);return}let re=b?.closest?.(".worker-banner__dismiss");if(re){let ie=re.dataset.attemptId;ie&&fe(ie);return}if(b?.closest?.(".worker-play")){Ke(!$e().auto_advance);return}if(b?.closest?.(".worker-auto-all")){let ie=$e();Je(!(ie.auto_advance===!0&&ie.auto_merge===!0));return}let ke=b?.closest?.(".worker-merge-all");if(ke){ke.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?Ve(!1):We():Ve(!0);return}let se=b?.closest?.(".worker-pane__hd--toggle");if(se){let ie=se.dataset.lane;(ie==="queue"||ie==="done")&&_t(ie);return}let we=b?.closest?.(".worker-card__place");if(we){let ie=we.dataset.beadId;ie&&!we.disabled&&xe(ie,Ae());return}let Se=b?.closest?.(".worker-filter__chip");if(Se){let ie=Se.dataset.spec;(ie==="all"||ie==="with"||ie==="without")&&ce({...$,spec:ie});return}let je=b?.closest?.(".worker-mini__merge");if(je){dt(je.dataset.beadId||"");return}let ne=b?.closest?.(".worker-mini__merge-cancel");if(ne){$t(ne.dataset.beadId||"");return}let Xe=b?.closest?.(".worker-mini__discard");if(Xe){ut(Xe.dataset.beadId||"");return}let gt=b?.closest?.(".worker-mini__revise-fix");if(gt){Qe("worker-revise-fix",gt.dataset.beadId||"");return}let xt=b?.closest?.(".worker-mini__revise-approve");if(xt){Qe("worker-revise-approve",xt.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;if(b?.closest?.(".rtile__stop")){let ue=b?.closest?.(".rtile")?.dataset?.attemptId;ue&&Fe(ue);return}if(b?.closest?.(".rtile__pause")){let ue=b?.closest?.(".rtile")?.dataset?.attemptId;ue&&be(ue);return}if(b?.closest?.(".rtile__resume")){let ue=b?.closest?.(".rtile")?.dataset?.attemptId;ue&&Ze(ue);return}if(b?.closest?.(".rtile__session")){let ue=b?.closest?.(".rtile")?.dataset?.attemptId;ue&&S(ue);return}if(b?.closest?.(".worker-drawer-overlay__backdrop")){Re.close();return}if(b?.closest?.(".worker-drawer-host"))return;let qe=b?.closest?.(".rtile");if(qe){if(b?.closest?.(".rtile__id")){let ue=qe.dataset.beadId;ue&&Kt(ue).then(St=>{St?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ie=qe.dataset.beadId;ie&&l&&l(ie);return}let nt=b?.closest?.(".worker-mini, .worker-card");if(nt){let ie=nt.dataset.beadId;if(b?.closest?.(".worker-mini__id, .worker-card__id")){ie&&Kt(ie).then(ue=>{ue?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ie&&l&&l(ie)}}return t.addEventListener("dragstart",N),t.addEventListener("dragover",K),t.addEventListener("dragleave",G),t.addEventListener("drop",oe),t.addEventListener("click",Ne),t.addEventListener("change",k),L(),Me(),c&&T.push(c.subscribe(de)),s&&T.push(s.subscribe(()=>{de(),Y()})),de(),{load(){de()},destroy(){for(let u of T.splice(0))try{u()}catch{}t.removeEventListener("dragstart",N),t.removeEventListener("dragover",K),t.removeEventListener("dragleave",G),t.removeEventListener("drop",oe),t.removeEventListener("click",Ne),t.removeEventListener("change",k);try{Re.destroy()}catch{}g.hidden=!0;try{Ye.destroy()}catch{}he(d``,t)}}}function fs(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Ri(t,e,r,n=async()=>{},s=async()=>{}){let o=Ce("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function f(A){let g=A.target.value,W=e.getState().workspace?.current?.path||"";if(g&&g!==W){o("switching workspace to %s",g),l=!0,T();try{await r(g)}catch(j){o("workspace switch failed: %o",j)}finally{l=!1,T()}}}async function h(){let A=e.getState(),x=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!x||a)){o("git-pulling workspace %s",x),a=!0,T();try{await n(x)}catch(g){o("workspace git pull failed: %o",g)}finally{a=!1,T()}}}function w(A){let x=A.target;x&&t.contains(x)||C()}function $(A){A.key==="Escape"&&C()}function v(){c||(c=!0,document.addEventListener("mousedown",w),document.addEventListener("keydown",$),T())}function C(){c&&(c=!1,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),T())}function E(){c?C():v()}async function P(A){let x=A.target,g=x.value,U=x.checked;o("toggling visibility %s \u2192 %s",g,String(U));try{await s(g,U)}catch(W){o("workspace visibility toggle failed: %o",W)}}function q(A){return A?d`
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
    `:d``}function F(A,x){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${E}
          aria-haspopup="true"
          aria-expanded=${c?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${c?d`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${A.map(g=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${g.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${g.path}"
                        .checked=${!x.has(g.path)}
                        @change=${P}
                      />
                      <span class="workspace-picker__manage-name"
                        >${fs(g.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function R(){let A=e.getState(),x=A.workspace?.current,g=A.workspace?.available||[],U=new Set(A.workspace?.hidden||[]),W=x?.path||g[0]?.path||"";if(g.length===0)return d``;let j=g.filter(te=>!U.has(te.path)||te.path===W);if(j.length<=1){let te=j[0]||g[0],Re=fs(te.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${te.path}"
            >${Re}</span
          >
          ${F(g,U)}
          ${q(W)}
          ${a?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${j.map(te=>d`
              <option
                value="${te.path}"
                ?selected=${te.path===W}
                title="${te.path}"
              >
                ${fs(te.path)}
              </option>
            `)}
        </select>
        ${F(g,U)}
        ${q(W)}
        ${l||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function T(){he(R(),t)}return T(),i=e.subscribe(()=>T()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),he(d``,t)}}}var Ii=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function hs(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Li(t,e,r=hs()){return{id:r,type:t,payload:e}}function Di(t={}){let e=Ce("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,f=[],h=new Map,w=new Set;function $(R){for(let T of Array.from(w))try{T(R)}catch{}}function v(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),$(o);let R=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),T=(r.jitterRatio||0)*R,A=Math.max(0,Math.round(R+(Math.random()*2-1)*T));e("ws retry in %d ms (attempt %d)",A,i+1),l=setTimeout(()=>{l=null,F()},A)}function C(R){try{s?.send(JSON.stringify(R))}catch(T){e("ws send failed",T)}}function E(){for(o="open",e("ws open"),$(o),i=0;f.length;){let R=f.shift();R&&C(R)}}function P(R){let T;try{T=JSON.parse(String(R.data))}catch{e("ws received non-JSON message");return}if(!T||typeof T.id!="string"||typeof T.type!="string"){e("ws received invalid envelope");return}if(c.has(T.id)){let x=c.get(T.id);c.delete(T.id),T.ok?x?.resolve(T.payload):x?.reject(T.error||new Error("ws error"));return}let A=h.get(T.type);if(A&&A.size>0)for(let x of Array.from(A))try{x(T.payload)}catch(g){e("ws event handler error",g)}else e("ws received unhandled message type: %s",T.type)}function q(){o="closed",e("ws closed"),$(o);for(let[R,T]of c.entries())T.reject(new Error("ws disconnected")),c.delete(R);i+=1,v()}function F(){if(!a)return;let R=n();try{s=new WebSocket(R),e("ws connecting %s",R),o="connecting",$(o),s.addEventListener("open",E),s.addEventListener("message",P),s.addEventListener("error",()=>{}),s.addEventListener("close",q)}catch(T){e("ws connect failed %o",T),v()}}return F(),{send(R,T){if(!Ii.includes(R))return Promise.reject(new Error(`unknown message type: ${R}`));let A=hs(),x=Li(R,T,A);return e("send %s id=%s",R,A),new Promise((g,U)=>{c.set(A,{resolve:g,reject:U,type:R}),s&&s.readyState===s.OPEN?C(x):(e("queue %s id=%s (state=%s)",R,A,o),f.push(x))})},on(R,T){h.has(R)||h.set(R,new Set);let A=h.get(R);return A?.add(T),()=>{A?.delete(T)}},onConnection(R){return w.add(R),()=>{w.delete(R)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,F()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Qc(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function Jc(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var _s=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Oi=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Mi=[[ls,"in-progress-issues"]],Ni="worker:queue",Pi="ui:order",Fi="ui:display-policy",qt="tab:board:closed",qi="beads-ui.board.closed-range";function ed(t){let e=Ce("main");e("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;he(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&o&&i&&l){let $e=function(_,m){let z="Request failed",V="";if(_&&typeof _=="object"){let p=_;if(typeof p.message=="string"&&p.message.length>0&&(z=p.message),typeof p.details=="string")V=p.details;else if(p.details&&typeof p.details=="object")try{V=JSON.stringify(p.details,null,2)}catch{V=""}}else typeof _=="string"&&_.length>0&&(z=_);let O=m&&m.length>0?`Failed to load ${m}`:"Request failed";Ye.open(O,z,V)},Qe=function(_){return`${ne.getState().workspace.current?.path||""}\0${_}`},Ke=function(){Ze&&(Ze().catch(()=>{}),Ze=null),fe=null,Oe=null},Ge=function(_){dt=_;let m=()=>{dt!==_||ne.getState().selected_id!==_||(dt=null,Je(_))};if(!We){$t.then(m);return}m()},et=function(_,m,z,V,O){return z!==Ie[m]?(O().catch(()=>{}),!1):(_.set(V,O),!0)},tt=function(){let _=ne.getState().view;De(_==="board"),N(_==="worker"),ce(_==="monitor"),G(_==="worker"||_==="monitor")},ht=function(){let _=zr(rt);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},De=function(_){if(_)for(let[m,z]of _s){if(ze.has(m)||Ee.has(m))continue;let V=m===qt?ht():{type:z};try{xe.register(m,V)}catch(D){e("register %s store failed: %o",m,D)}Ee.add(m);let O=Ie.board,p=!1;Ae.subscribeList(m,V).then(D=>{p=!et(ze,"board",O,m,D)}).catch(D=>{e("subscribe %s failed: %o",m,D),$e(D,"board")}).finally(()=>{Ee.delete(m),p&&tt()})}else de()},de=function(){Ie.board+=1;for(let[_]of _s){let m=ze.get(_);m&&(m().catch(()=>{}),ze.delete(_));try{xe.unregister(_)}catch(z){e("unregister %s failed: %o",_,z)}}},N=function(_){if(!_){K();return}for(let[m,z]of Oi){if(Me.has(m)||Ee.has(m))continue;try{xe.register(m,{type:z})}catch(p){e("register %s store failed: %o",m,p)}Ee.add(m);let V=Ie.worker,O=!1;Ae.subscribeList(m,{type:z}).then(p=>{O=!et(Me,"worker",V,m,p)}).catch(p=>{e("subscribe %s failed: %o",m,p),$e(p,"worker")}).finally(()=>{Ee.delete(m),O&&tt()})}},K=function(){Ie.worker+=1;for(let[_]of Oi){let m=Me.get(_);m&&(m().catch(()=>{}),Me.delete(_));try{xe.unregister(_)}catch(z){e("unregister %s failed: %o",_,z)}}},G=function(_){if(!_){Z();return}L||(ae("subscribe-worker-queue",{id:Ni}).catch(m=>{e("subscribe-worker-queue failed: %o",m)}),L=()=>ae("unsubscribe-worker-queue",{id:Ni}))},Z=function(){L&&(L().catch(()=>{}),L=null)},ce=function(_){if(!_){_e();return}for(let[m,z]of Mi){if(oe.has(m)||Ee.has(m))continue;try{xe.register(m,{type:z})}catch(p){e("register %s store failed: %o",m,p)}Ee.add(m);let V=Ie.monitor,O=!1;Ae.subscribeList(m,{type:z}).then(p=>{O=!et(oe,"monitor",V,m,p)}).catch(p=>{e("subscribe %s failed: %o",m,p),$e(p,"monitor")}).finally(()=>{Ee.delete(m),O&&tt()})}},_e=function(){Ie.monitor+=1;for(let[_]of Mi){let m=oe.get(_);m&&(m().catch(()=>{}),oe.delete(_));try{xe.unregister(_)}catch(z){e("unregister %s failed: %o",_,z)}}},k=function(){J||(ae("subscribe-ui-order",{id:Pi}).catch(_=>{e("subscribe-ui-order failed: %o",_)}),J=()=>ae("unsubscribe-ui-order",{id:Pi}))},M=function(){J&&(J().catch(()=>{}),J=null),me.clear()},Y=function(){S||(ae("subscribe-display-policy",{id:Fi}).catch(_=>{e("subscribe-display-policy failed: %o",_)}),S=()=>ae("unsubscribe-display-policy",{id:Fi}))},Ne=function(){S&&(S().catch(()=>{}),S=null),Fe.clear()},se=function(_){if(!_)return"Unknown";let m=_.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var a=$e,c=Qe,f=Ke,h=Ge,w=et,$=tt,v=ht,C=De,E=de,P=N,q=K,F=G,R=Z,T=ce,A=_e,x=k,g=M,U=Y,W=Ne,j=se;let te=document.getElementById("header-loading"),Re=io(te),Ye=ci(t),ee=Di(),ae=Re.wrapSend((_,m)=>ee.send(_,m)),Ae=Js(ae),xe=eo(),ct=ro(),me=to(),Fe=Fs(),be=qs();ee.on("ui-order-snapshot",_=>{let m=_;if(m&&typeof m.revision=="number")try{me.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),ee.on("display-policy-snapshot",_=>{let m=_;if(m&&m.policy&&typeof m.policy=="object")try{Fe.set(m.policy)}catch{}}),ee.on("session-log-snapshot",_=>{let m=_;if(m&&typeof m.attempt_id=="string")try{be.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[])}catch{}}),ee.on("session-log-append",_=>{let m=_;if(m&&typeof m.attempt_id=="string")try{be.append(m.attempt_id,m.event)}catch{}}),ee.on("snapshot",_=>{let m=_,z=m&&typeof m.id=="string"?m.id:"",V=z?xe.getStore(z):null;if(V&&m&&m.type==="snapshot")try{V.applyPush(m)}catch{}}),ee.on("upsert",_=>{let m=_,z=m&&typeof m.id=="string"?m.id:"",V=z?xe.getStore(z):null;if(V&&m&&m.type==="upsert")try{V.applyPush(m)}catch{}}),ee.on("delete",_=>{let m=_,z=m&&typeof m.id=="string"?m.id:"",V=z?xe.getStore(z):null;if(V&&m&&m.type==="delete")try{V.applyPush(m)}catch{}});let Ze=null,fe=null,Oe=null,dt=null,Ve=()=>{},$t=new Promise(_=>{Ve=()=>_(void 0)}),We=!1,ut=!1;async function Je(_){let m=Qe(_);if(m===fe||m===Oe)return;Oe=m;let z=`detail:${_}`,V={type:"issue-detail",params:{id:_}};try{xe.register(z,V)}catch(O){e("register detail store failed: %o",O)}try{let O=await Ae.subscribeList(z,V);if(ne.getState().selected_id!==_||Qe(_)!==m){await O().catch(()=>{});return}Ze&&await Ze().catch(()=>{}),Ze=O,fe=m}catch(O){e("detail subscribe failed: %o",O),$e(O,"issue details")}finally{Oe===m&&(Oe=null)}}let ze=new Map,Ee=new Set,Ie={board:0,worker:0,monitor:0},rt=Dt;try{let _=window.localStorage.getItem(qi);nr(_)&&(rt=_)}catch{}async function _t(_){if(!nr(_)||_===rt)return;rt=_;try{window.localStorage.setItem(qi,_)}catch{}let m=ze.get(qt);if(!m)return;ze.delete(qt),await m().catch(()=>{});let z=ht();try{xe.register(qt,z)}catch(V){e("register %s store failed: %o",qt,V)}try{let V=await Ae.subscribeList(qt,z);ze.set(qt,V)}catch(V){e("re-subscribe %s failed: %o",qt,V),$e(V,"board")}}let Me=new Map,L=null,oe=new Map,J=null,S=null;async function u(){S=null,Fe.clear(),L=null,ze.clear(),Me.clear(),oe.clear(),Ie.board+=1,Ie.worker+=1,Ie.monitor+=1;let _=ne.getState().workspace.current?.path;if(_)try{await ee.send("set-workspace",{path:_})}catch(z){e("workspace restore after reconnect failed: %o",z);return}Y();let m=ne.getState().view;De(m==="board"),N(m==="worker"),ce(m==="monitor"),G(m==="worker"||m==="monitor")}async function b(){e("clearing all subscriptions for workspace switch"),de(),K(),_e(),Z(),ct.clear(),M(),k(),Ne(),Y(),Ke();let _=ne.getState();if(_.selected_id)try{xe.unregister(`detail:${_.selected_id}`)}catch{}let m=ne.getState();De(m.view==="board"),N(m.view==="worker"),ce(m.view==="monitor"),G(m.view==="worker"||m.view==="monitor"),m.selected_id&&Ge(m.selected_id)}async function I(_){e("requesting workspace switch to %s",_),ut=!0;try{let m=await ee.send("set-workspace",{path:_});e("workspace switch result: %o",m),m&&m.workspace&&(ne.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),m.changed&&(await b(),Q("Switched to "+se(_),"success",2e3)))}catch(m){throw e("workspace switch failed: %o",m),Q("Failed to switch workspace","error",3e3),m}finally{ut=!1}}async function re(_){e("requesting workspace git pull for %s",_);try{let m=await ee.send("git-pull-workspace",{});e("workspace git pull result: %o",m);let z=m?.status;if(z==="up_to_date"){Q("Already up to date","success",2e3);return}if(z==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+se(_),"success",2e3)}catch(m){e("workspace git pull failed: %o",m);let z=m?.code,V=m?.message;if(z==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(z==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(z==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let O=V?`: ${V}`:"";throw Q(`Git pull failed${O}`,"error",3e3),m}}async function ke(_,m){e("setting workspace visibility %s \u2192 %s",_,String(m));try{await ee.send("set-workspace-visibility",{path:_,visible:m}),await we()}catch(z){e("workspace visibility update failed: %o",z),Q("Failed to update project visibility","error",3e3)}}async function we(){try{let _=await ee.send("list-workspaces",{});if(e("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let m=_.workspaces.map(p=>({path:p.path,database:p.database,pid:p.pid,version:p.version})),z=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,V=Array.isArray(_.hidden)?_.hidden.filter(p=>typeof p=="string"):[];ne.setState({workspace:{current:z,available:m,hidden:V}});let O=window.localStorage.getItem("beads-ui.workspace");O&&(!m.some(D=>D.path===O)||V.includes(O)?window.localStorage.removeItem("beads-ui.workspace"):z&&O!==z.path&&(e("restoring saved workspace preference: %s",O),await I(O)))}}catch(_){e("failed to load workspaces: %o",_)}}ee.on("workspace-changed",_=>{e("workspace-changed event: %o",_),_&&_.root_dir&&(ne.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),we(),b())});let Se=!1;if(typeof ee.onConnection=="function"){let _=m=>{e("ws state %s",m),m==="reconnecting"||m==="closed"?(Se=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&Se&&(Se=!1,Q("Reconnected","success",2200),Jc(ne,(z,V)=>{e(`${z}: %o`,V)}),u())};ee.onConnection(_)}let je="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(je=_)}catch(_){e("view parse error: %o",_)}let ne=oo({config:Qc(),view:je});ee.on("worker-queue-snapshot",_=>{let m=_;if(!m||!m.queue)return;let z=ne.getState().workspace.current?.path;if(typeof z=="string"&&z.length>0&&m.root_dir!==z){e("dropping worker-queue snapshot for %s",String(m.root_dir));return}try{ct.set(m.queue)}catch{}});let Xe=no(ne);Xe.start();let gt=async(_,m)=>{try{return await ae(_,m)}catch{return[]}};n&&hi(n,ne,Xe);let xt=document.getElementById("workspace-picker");xt&&Ri(xt,ne,I,re,ke);let qe=bi(t,(_,m)=>ae(_,m));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>qe.open())}catch{}let nt=li(t,{policyStore:Fe,transport:(_,m)=>ae(_,m),labelOptions:()=>{let _=new Set;for(let[m]of _s)for(let z of xe.snapshotFor(m)||[]){let V=z.labels;if(Array.isArray(V))for(let O of V)typeof O=="string"&&O.length>0&&_.add(O)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>nt.open())}catch{}let ie=_o(s,{gotoIssue:_=>Xe.gotoIssue(_),issueStores:xe,transport:gt,uiOrderStore:me,displayPolicyStore:Fe,closedRange:rt,onClosedRangeChange:_=>{_t(_)},onNewIssue:()=>qe.open()}),ue=ps(o,{transport:gt,issueStores:xe,queueStore:ct,sessionLogStore:be,uiOrderStore:me,gotoIssue:_=>ne.setState({selected_id:_}),getWorkspacePath:()=>ne.getState().workspace.current?.path}),St=fi(i,{issueStores:xe,queueStore:ct,gotoIssue:_=>Xe.gotoIssue(_)}),At=ii(l,{issueStores:xe,transport:gt,queueStore:ct,sessionLogStore:be,getWorkspacePath:()=>ne.getState().workspace.current?.path,onNavigate:_=>{ne.getState().view==="worker"?ne.setState({selected_id:_}):Xe.gotoIssue(_)},onClose:()=>{let _=ne.getState();ne.setState({selected_id:null});try{Xe.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}}}),st=ne.getState().selected_id;st&&(l.hidden=!1,At.load(st),Ge(st)),ne.subscribe(_=>{let m=_.selected_id;m?(l.hidden=!1,At.load(m),ut||Ge(m)):(At.clear(),l.hidden=!0,Ke())});let Bt=_=>{s.hidden=_.view!=="board",o.hidden=_.view!=="worker",i.hidden=_.view!=="monitor",De(_.view==="board"),N(_.view==="worker"),ce(_.view==="monitor"),G(_.view==="worker"||_.view==="monitor"),!_.selected_id&&_.view==="board"&&ie.load(),_.view==="worker"&&ue.load(),_.view==="monitor"?St.load():St.pause(),window.localStorage.setItem("beads-ui.view",_.view)};ne.subscribe(Bt),Bt(ne.getState()),k(),Y(),we().finally(()=>{We=!0,Ve()}),window.addEventListener("keydown",_=>{let m=_.ctrlKey||_.metaKey,z=String(_.key||"").toLowerCase(),V=_.target,O=V&&V.tagName?String(V.tagName).toLowerCase():"",p=O==="input"||O==="textarea"||O==="select"||V&&typeof V.isContentEditable=="boolean"&&V.isContentEditable;m&&z==="n"&&(p||(_.preventDefault(),qe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&ed(e)});export{ed as bootstrap,Qc as readBootstrapConfig,Jc as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
