var ji=Object.create;var _n=Object.defineProperty;var Yi=Object.getOwnPropertyDescriptor;var Vi=Object.getOwnPropertyNames;var Ki=Object.getPrototypeOf,Zi=Object.prototype.hasOwnProperty;var Xi=(t,e,r)=>e in t?_n(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var gn=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Qi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Vi(e))!Zi.call(t,s)&&s!==r&&_n(t,s,{get:()=>e[s],enumerable:!(n=Yi(e,s))||n.enumerable});return t};var Ji=(t,e,r)=>(r=t!=null?ji(Ki(t)):{},Qi(e||!t||!t.__esModule?_n(r,"default",{value:t,enumerable:!0}):r,t));var xe=(t,e,r)=>Xi(t,typeof e!="symbol"?e+"":e,r);var Us=gn((ld,Bs)=>{var rr=1e3,nr=rr*60,sr=nr*60,Ht=sr*24,sa=Ht*7,oa=Ht*365.25;Bs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return ia(t);if(r==="number"&&isFinite(t))return e.long?la(t):aa(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function ia(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*oa;case"weeks":case"week":case"w":return r*sa;case"days":case"day":case"d":return r*Ht;case"hours":case"hour":case"hrs":case"hr":case"h":return r*sr;case"minutes":case"minute":case"mins":case"min":case"m":return r*nr;case"seconds":case"second":case"secs":case"sec":case"s":return r*rr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function aa(t){var e=Math.abs(t);return e>=Ht?Math.round(t/Ht)+"d":e>=sr?Math.round(t/sr)+"h":e>=nr?Math.round(t/nr)+"m":e>=rr?Math.round(t/rr)+"s":t+"ms"}function la(t){var e=Math.abs(t);return e>=Ht?zr(t,e,Ht,"day"):e>=sr?zr(t,e,sr,"hour"):e>=nr?zr(t,e,nr,"minute"):e>=rr?zr(t,e,rr,"second"):t+" ms"}function zr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Hs=gn((cd,zs)=>{function ca(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Us(),r.destroy=c,Object.keys(t).forEach(h=>{r[h]=t[h]}),r.names=[],r.skips=[],r.formatters={};function e(h){let _=0;for(let w=0;w<h.length;w++)_=(_<<5)-_+h.charCodeAt(w),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=e;function r(h){let _,w=null,$,v;function T(...C){if(!T.enabled)return;let L=T,M=Number(new Date),q=M-(_||M);L.diff=q,L.prev=_,L.curr=M,_=M,C[0]=r.coerce(C[0]),typeof C[0]!="string"&&C.unshift("%O");let P=0;C[0]=C[0].replace(/%([a-zA-Z%])/g,(A,x)=>{if(A==="%%")return"%";P++;let g=r.formatters[x];if(typeof g=="function"){let B=C[P];A=g.call(L,B),C.splice(P,1),P--}return A}),r.formatArgs.call(L,C),(L.log||r.log).apply(L,C)}return T.namespace=h,T.useColors=r.useColors(),T.color=r.selectColor(h),T.extend=n,T.destroy=r.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>w!==null?w:($!==r.namespaces&&($=r.namespaces,v=r.enabled(h)),v),set:C=>{w=C}}),typeof r.init=="function"&&r.init(T),T}function n(h,_){let w=r(this.namespace+(typeof _>"u"?":":_)+h);return w.log=this.log,w}function s(h){r.save(h),r.namespaces=h,r.names=[],r.skips=[];let _=(typeof h=="string"?h:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let w of _)w[0]==="-"?r.skips.push(w.slice(1)):r.names.push(w)}function o(h,_){let w=0,$=0,v=-1,T=0;for(;w<h.length;)if($<_.length&&(_[$]===h[w]||_[$]==="*"))_[$]==="*"?(v=$,T=w,$++):(w++,$++);else if(v!==-1)$=v+1,T++,w=T;else return!1;for(;$<_.length&&_[$]==="*";)$++;return $===_.length}function i(){let h=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),h}function l(h){for(let _ of r.skips)if(o(h,_))return!1;for(let _ of r.names)if(o(h,_))return!0;return!1}function a(h){return h instanceof Error?h.stack||h.message:h}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}zs.exports=ca});var Ws=gn((ct,Hr)=>{ct.formatArgs=ua;ct.save=pa;ct.load=fa;ct.useColors=da;ct.storage=ha();ct.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();ct.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function da(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ua(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+Hr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}ct.log=console.debug||console.log||(()=>{});function pa(t){try{t?ct.storage.setItem("debug",t):ct.storage.removeItem("debug")}catch{}}function fa(){let t;try{t=ct.storage.getItem("debug")||ct.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function ha(){try{return localStorage}catch{}}Hr.exports=Hs()(ct);var{formatters:_a}=Hr.exports;_a.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var _r=globalThis,Br=_r.trustedTypes,Es=Br?Br.createPolicy("lit-html",{createHTML:t=>t}):void 0,Os="$lit$",Rt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ms="?"+Rt,ea=`<${Ms}>`,Ut=document,gr=()=>Ut.createComment(""),mr=t=>t===null||typeof t!="object"&&typeof t!="function",$n=Array.isArray,ta=t=>$n(t)||typeof t?.[Symbol.iterator]=="function",mn=`[ 	
\f\r]`,hr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Cs=/-->/g,Rs=/>/g,qt=RegExp(`>|${mn}(?:([^\\s"'>=/]+)(${mn}*=${mn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Is=/'/g,Ls=/"/g,Ns=/^(?:script|style|textarea|title)$/i,xn=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=xn(1),rd=xn(2),nd=xn(3),zt=Symbol.for("lit-noChange"),Me=Symbol.for("lit-nothing"),Ds=new WeakMap,Bt=Ut.createTreeWalker(Ut,129);function Ps(t,e){if(!$n(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Es!==void 0?Es.createHTML(e):e}var ra=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=hr;for(let l=0;l<r;l++){let a=t[l],c,h,_=-1,w=0;for(;w<a.length&&(i.lastIndex=w,h=i.exec(a),h!==null);)w=i.lastIndex,i===hr?h[1]==="!--"?i=Cs:h[1]!==void 0?i=Rs:h[2]!==void 0?(Ns.test(h[2])&&(s=RegExp("</"+h[2],"g")),i=qt):h[3]!==void 0&&(i=qt):i===qt?h[0]===">"?(i=s??hr,_=-1):h[1]===void 0?_=-2:(_=i.lastIndex-h[2].length,c=h[1],i=h[3]===void 0?qt:h[3]==='"'?Ls:Is):i===Ls||i===Is?i=qt:i===Cs||i===Rs?i=hr:(i=qt,s=void 0);let $=i===qt&&t[l+1].startsWith("/>")?" ":"";o+=i===hr?a+ea:_>=0?(n.push(c),a.slice(0,_)+Os+a.slice(_)+Rt+$):a+Rt+(_===-2?l:$)}return[Ps(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},br=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,h]=ra(e,r);if(this.el=t.createElement(c,n),Bt.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Bt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(Os)){let w=h[i++],$=s.getAttribute(_).split(Rt),v=/([.?@])?(.*)/.exec(w);a.push({type:1,index:o,name:v[2],strings:$,ctor:v[1]==="."?wn:v[1]==="?"?kn:v[1]==="@"?yn:er}),s.removeAttribute(_)}else _.startsWith(Rt)&&(a.push({type:6,index:o}),s.removeAttribute(_));if(Ns.test(s.tagName)){let _=s.textContent.split(Rt),w=_.length-1;if(w>0){s.textContent=Br?Br.emptyScript:"";for(let $=0;$<w;$++)s.append(_[$],gr()),Bt.nextNode(),a.push({type:2,index:++o});s.append(_[w],gr())}}}else if(s.nodeType===8)if(s.data===Ms)a.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Rt,_+1))!==-1;)a.push({type:7,index:o}),_+=Rt.length-1}o++}}static createElement(e,r){let n=Ut.createElement("template");return n.innerHTML=e,n}};function Jt(t,e,r=t,n){if(e===zt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=mr(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Jt(t,s._$AS(t,e.values),s,n)),e}var bn=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??Ut).importNode(r,!0);Bt.currentNode=s;let o=Bt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new wr(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new vn(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=Bt.nextNode(),i++)}return Bt.currentNode=Ut,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},wr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Me,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Jt(this,e,r),mr(e)?e===Me||e==null||e===""?(this._$AH!==Me&&this._$AR(),this._$AH=Me):e!==this._$AH&&e!==zt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ta(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Me&&mr(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ut.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=br.createElement(Ps(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new bn(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=Ds.get(e.strings);return r===void 0&&Ds.set(e.strings,r=new br(e)),r}k(e){$n(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(gr()),this.O(gr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},er=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=Me,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Me}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Jt(this,e,r,0),i=!mr(e)||e!==this._$AH&&e!==zt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=Jt(this,l[n+a],r,a),c===zt&&(c=this._$AH[a]),i||(i=!mr(c)||c!==this._$AH[a]),c===Me?e=Me:e!==Me&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===Me?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},wn=class extends er{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Me?void 0:e}},kn=class extends er{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Me)}},yn=class extends er{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Jt(this,e,r,0)??Me)===zt)return;let n=this._$AH,s=e===Me&&n!==Me||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Me&&(n===Me||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},vn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Jt(this,e)}};var na=_r.litHtmlPolyfillSupport;na?.(br,wr),(_r.litHtmlVersions??(_r.litHtmlVersions=[])).push("3.3.1");var me=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new wr(e.insertBefore(gr(),o),o,void 0,r??{})}return s._$AI(t),s};var It="today",kr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function tr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Ur(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Fs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function qs(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var Gs=Ji(Ws(),1);function Ce(t){return(0,Gs.default)(`beads-ui:${t}`)}function kt(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Wt(t,e){let r=kt(t.created_at),n=kt(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Vs(t,e){let r=kt(t.created_at),n=kt(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Ks(t,e){let r=kt(t.updated_at),n=kt(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function Zs(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=kt(t.created_at),o=kt(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Xs(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var ga=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function js(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ys(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=ga.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Qs(t,e){let r=js(t),n=js(e);if(r!==n)return r<n?-1:1;let s=Ys(t),o=Ys(e);if(s!==o)return s<o?-1:1;let i=kt(t&&t.created_at),l=kt(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var Sn=2**20;function or(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-kt(t&&t.created_at)}function Wr(t){return(e,r)=>{let n=or(e,t),s=or(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Tn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:or(l,r)-Sn};if(!l)return{rank:or(i,r)+Sn};let a=or(i,r),c=or(l,r),h=(a+c)/2;return a<h&&h<c?{rank:h}:{renormalize:n.map((_,w)=>({bead_id:_.id,rank:w*Sn}))}}function An(t,e={}){let r=Ce(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Wt;function c(){for(let w of Array.from(i))try{w()}catch{}}function h(){s=Array.from(n.values()).sort(a)}function _(w){if(l||!w||w.id!==t)return;let $=Number(w.revision)||0;if(r("apply %s rev=%d",w.type,$),!($<=o&&w.type!=="snapshot")){if(w.type==="snapshot"){if($<=o)return;n.clear();let v=Array.isArray(w.issues)?w.issues:[];for(let T of v)T&&typeof T.id=="string"&&T.id.length>0&&n.set(T.id,T);h(),o=$,c();return}if(w.type==="upsert"){let v=w.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let T=n.get(v.id);if(!T)n.set(v.id,v);else{let C=Number.isFinite(T.updated_at)?T.updated_at:0,L=Number.isFinite(v.updated_at)?v.updated_at:0;if(C<=L){for(let M of Object.keys(T))M in v||delete T[M];for(let[M,q]of Object.entries(v))T[M]=q}}h()}o=$,c()}else if(w.type==="delete"){let v=String(w.issue_id||"");v&&(n.delete(v),h()),o=$,c()}}}return{id:t,subscribe(w){return i.add(w),()=>{i.delete(w)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(w){return n.get(w)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function Gr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function Js(t){let e=Ce("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let h=Array.isArray(a.added)?a.added:[],_=Array.isArray(a.updated)?a.updated:[],w=Array.isArray(a.removed)?a.removed:[];for(let $ of Array.from(c)){let v=r.get($);if(!v)continue;let T=v.itemsById;for(let C of h)typeof C=="string"&&C.length>0&&T.set(C,!0);for(let C of _)typeof C=="string"&&C.length>0&&T.set(C,!0);for(let C of w)typeof C=="string"&&C.length>0&&T.delete(C)}}async function o(l,a){let c=Gr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let _=r.get(l);if(_&&_.key!==c){let w=n.get(_.key);w&&(w.delete(l),w.size===0&&n.delete(_.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let h=n.get(c);h&&h.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(_){let w=r.get(l)||null;if(w){let $=n.get(w.key);$&&($.delete(l),$.size===0&&n.delete(w.key))}throw r.delete(l),_}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let _=r.get(l)||null;if(_){let w=n.get(_.key);w&&(w.delete(l),w.size===0&&n.delete(_.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Gr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let h of a.itemsById.keys())c[h]=!0;return c}}}}function eo(){let t=Ce("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,h){let _=c?Gr(c):"",w=r.get(a)||"",$=e.has(a);if(t("register %s key=%s (prev=%s)",a,_,w),$&&w&&_&&w!==_){let v=e.get(a);if(v)try{v.dispose()}catch{}let T=s.get(a);if(T){try{T()}catch{}s.delete(a)}let C=An(a,h);e.set(a,C);let L=C.subscribe(()=>o());s.set(a,L)}else if(!$){let v=An(a,h);e.set(a,v);let T=v.subscribe(()=>o());s.set(a,T)}return r.set(a,_),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let h=s.get(a);if(h){try{h()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function to(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ro(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function En(t,e){return`#/${t==="worker"||t==="monitor"?t:"board"}?issue=${encodeURIComponent(e)}`}function ma(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ba(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":/^#\/monitor(\b|\/|$)/.test(e)?"monitor":"board"}function no(t){let e=Ce("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):ma(n),i=ba(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=t.getState?t.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=En(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?En(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var wa=Object.freeze({workspace_config:{default_workspace:null}});function so(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:wa.workspace_config.default_workspace}}}function oo(t={}){let e=Ce("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:so(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?so(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,h)=>c!==r.workspace.hidden[h]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,h)=>c===r.worker.show_closed_children[h])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function io(t){let e=Ce("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(_,w)=>{let $=s++,v=Date.now();n.set($,{type:_,start_ts:v}),e("request start id=%d type=%s count=%d",$,_,r+1),i();let T=!1,C=()=>{T||(T=!0,n.delete($),l())},L=setTimeout(()=>{T||(e("request TIMEOUT id=%d type=%s elapsed=%dms",$,_,Date.now()-v),C())},3e4);try{let M=await c(_,w),q=Date.now()-v;return e("request done id=%d type=%s elapsed=%dms",$,_,q),M}catch(M){let q=Date.now()-v;throw e("request error id=%d type=%s elapsed=%dms err=%o",$,_,q,M),M}finally{clearTimeout(L),C()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([h,_])=>({id:h,type:_.type,elapsed_ms:c-_.start_ts}))}}}function J(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function jr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Xs),a;switch(l){case"created_desc":return a.sort(Wt),a;case"created_asc":return a.sort(Vs),a;case"updated_desc":return a.sort(Ks),a;case"priority":return a.sort(Zs),a;case"manual":default:{let c=r();return c?a.sort(Wr(c)):a.sort(Wt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Lt(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function dt(t){let e=Lt(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function At(t,e){let r=Lt(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function ir(t){if(!Array.isArray(t))return null;let e=null,r=-1;for(let n of t){if(!n||n.status!=="in_progress")continue;let s=Lt(n.updated_at)??0;if(e===null||s>r){e=n,r=s;continue}s===r&&String(n.id)<String(e.id)&&(e=n)}return e}function Yr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},h=n(Tn(l,a,c.order),i);s(c,h);let _=await e("ui-order-set",{expected_revision:c.revision,entries:h});if(_&&_.conflict){let w={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(w);let $=n(Tn(l,a,w.order),i);s(w,$);let v=await e("ui-order-set",{expected_revision:w.revision,entries:$});v&&v.applied&&r.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Vr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Cn(t,e){return!e||typeof t!="string"||t.length===0||Vr(e.visible_labels).includes(t)?!0:Vr(e.hidden_labels).includes(t)?!1:!Vr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function ao(t,e){return Vr(t).filter(r=>Cn(r,e))}function Gt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}var ka={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},lo={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},ya={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},va={review:"\u2713",skip:"\u2298"},ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function $a(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t){let o=e[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function xa(t){let e=t&&t.fill||"none";return e==="none"?ar.none:t&&t.stale===!0?ar.stale:e==="dim"?ar.dim:t&&t.glyph==="review"?ar.review:t&&t.glyph==="skip"?ar.skip:ar.done}function Sa(t,e,r){let n=ka[t]||t,s=e&&e.fill||"none",o=!!e&&e.stale===!0,i=va[e&&e.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let a=s==="none"?"lbl":`lbl l-${n} on`,c=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${l} style=${c}>${i}</div>
      <div class=${a}>
        ${lo[t]||t}
      </div>
    </div>
  `}function Kr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=ya[r],s=t.stages,o=$a(n,s,String(e||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(l=>`${lo[l]||l} ${xa(s[l]||{})}`).join(" \xB7 ")}`;return d`
    <div class="stp" role="img" aria-label=${i}>
      ${n.map(l=>Sa(l,s[l]||{},l===o))}
    </div>
  `}function Ta(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var co=2;function Aa(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,co).join(", "),s=r.length-co,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function Ea(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&Gt(r,"route")){let o=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Gt(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Gt(r,"pr")){let o=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of ao(t.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&Gt(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),Gt(r,"blocked")&&s.push(...Aa(t.blocked_info)),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function Ca(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Ra(t){let e=At(t.created_at),r=At(t.updated_at);return!e&&!r?"":d`<span class="board-card__times">
    ${e?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${dt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${dt(t.updated_at)}`}
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
      ${t.workflow&&Gt(e.policy||null,"stepper")?Kr(t.workflow,t.status):""}
      ${Ia(t,e)}
    </article>
  `}function jt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return d`
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
              ${kr.map(o=>d`<option
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
  `}var Na=200,Pa={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Fa=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),fo="beads-ui.board.sort",ho=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function qa(){try{let t=window.localStorage.getItem(fo);if(t&&ho.has(t))return t}catch{}return"created_desc"}function _o(t,e){let r=Ce("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,h=e.closedRange||It,_=s?jr(s,i):null,w=Yr({transport:o,uiOrderStore:i}),$=[],v=[],T=[],C=[],L=[],M=[],q=!1,P=0,E=qa(),A=new Map,x=new Map,g=new Map,B=new Set,z={search:"",priority:"",type:"",labels:[]},Y=!1,ne=null;function ye(I){return String(I.status||"open")==="open"}function ue(I){let N=String(I.status||"open");return N==="open"||N==="blocked"}function he(I){let N=z.search.trim().toLowerCase(),K=z.priority,j=z.type,Z=z.labels;return I.filter(le=>{if(N){let ce=String(le.id||"").toLowerCase(),ge=String(le.title||"").toLowerCase();if(!ce.includes(N)&&!ge.includes(N))return!1}if(K!==""&&String(le.priority)!==K||j!==""&&String(le.issue_type||"")!==j)return!1;if(Z.length>0){let ce=Array.isArray(le.labels)?le.labels:[];if(!Z.some(ge=>ce.includes(ge)))return!1}return!0})}function pe(){let I=new Set;for(let N of[$,v,T,C,L,M])for(let K of N){let j=Array.isArray(K.labels)?K.labels:[];for(let Z of j)typeof Z=="string"&&Z.length>0&&I.add(Z)}return Array.from(I).sort()}function ee(){return z.search.trim()!==""||z.priority!==""||z.type!==""||z.labels.length>0}function Ae(){try{if(_){let I=_.selectBoardColumn("tab:board:in-progress","in_progress",E),N=_.selectBoardColumn("tab:board:blocked","blocked",E).filter(ue),K=new Set(I.map(S=>S.id)),j=_.selectBoardColumn("tab:board:ready","ready",E).filter(S=>ye(S)&&!K.has(S.id)),Z=_.selectBoardColumn("tab:board:resolved","resolved",E),le=_.selectBoardColumn("tab:board:deferred","deferred",E),ce=q?le:[],ge=_.selectBoardColumn("tab:board:closed","closed").slice(0,Na),te=[...N,...j,...I,...Z,...ce,...ge];ut(te);let k=new Set;for(let S of te)S&&S.id&&!Rn(S)&&k.add(S.id);let D=!ee();$=D?lr(N,k):N,v=D?lr(j,k):j,T=D?lr(I,k):I,C=D?lr(Z,k):Z,L=D?lr(ce,k):ce,P=le.length,M=D?lr(ge,k):ge,A=new Map;for(let S of $)A.set(S.id,"open");for(let S of v)A.set(S.id,"open");for(let S of T)A.set(S.id,"in_progress");for(let S of C)A.set(S.id,"resolved");for(let S of L)A.set(S.id,"deferred");for(let S of M)A.set(S.id,"closed");x=new Map;for(let S of $)x.set(S.id,"blocked-col");for(let S of v)x.set(S.id,"ready-col");for(let S of T)x.set(S.id,"in-progress-col");for(let S of C)x.set(S.id,"resolved-col");for(let S of L)x.set(S.id,"deferred-col");for(let S of M)x.set(S.id,"closed-col")}je()}catch{$=[],v=[],T=[],C=[],L=[],M=[],g=new Map,je()}}function ut(I){let N=new Map;for(let j of I)j&&j.id&&!N.has(j.id)&&N.set(j.id,j);let K=new Map;for(let j of N.values()){let Z=Rn(j);if(!Z)continue;let le=K.get(Z);le||(le=[],K.set(Z,le)),le.push({id:j.id,title:j.title,status:j.status,metadata:j.metadata,created_at:j.created_at,updated_at:j.updated_at})}g=K}function ot(I){let N=g.get(I)||[],K=0;for(let Z of N)(Z.status==="resolved"||Z.status==="closed")&&(K+=1);let j=ir(N);return{total:N.length,count:K,current:j,children:N}}function we(I){return!B.has(I)}function Le(I,N){I.preventDefault(),I.stopPropagation(),B.has(N)?B.delete(N):B.add(N),je()}function ve(I,N){I.preventDefault(),I.stopPropagation(),n(N)}function Qe(I,N){I.preventDefault(),I.stopPropagation(),n(N)}function _e(I,N){ne||n(N)}function We(I,N){I.preventDefault(),I.stopPropagation(),Ba(N).then(K=>{K&&J("\uBCF5\uC0AC\uB428","success",1200)})}function ht(I,N){ne=N,I.dataTransfer&&(I.dataTransfer.setData("text/plain",N),I.dataTransfer.effectAllowed="move"),I.target.classList.add("board-card--dragging")}function Ye(I){I.target.classList.remove("board-card--dragging"),Xe(),setTimeout(()=>{ne=null},0)}function _t(I){let N=String(I.target.value||"");!N||N===h||(h=N,a&&a(N),je())}let Be={onCardClick:_e,onCopyId:We,onDragStart:ht,onDragEnd:Ye,onClosedRangeChange:_t,rollupFor:ot,isExpanded:we,onRollupToggle:Le,onChildClick:ve,onFromChipClick:Qe,get policy(){return l?l.get():null}};function it(I){let N=I.target,K=t.querySelector(".board-filter__labels");N&&K&&K.contains(N)||De()}function pt(I){I.key==="Escape"&&De()}function Ge(){Y||(Y=!0,document.addEventListener("mousedown",it),document.addEventListener("keydown",pt),je())}function De(){Y&&(Y=!1,document.removeEventListener("mousedown",it),document.removeEventListener("keydown",pt),je())}let Re={onSearchInput(I){z.search=String(I.target.value||""),Ae()},onPriorityChange(I){z.priority=String(I.target.value||""),Ae()},onTypeChange(I){z.type=String(I.target.value||""),Ae()},onSortChange(I){let N=String(I.target.value||"");if(!(!ho.has(N)||N===E)){E=N;try{window.localStorage.setItem(fo,N)}catch{}Ae()}},onDeferredToggle(){q=!q,Ae()},onLabelMenuToggle(){Y?De():Ge()},onLabelToggle(I){let N=z.labels.indexOf(I);N===-1?z.labels.push(I):z.labels.splice(N,1),Ae()},onLabelClear(){z.labels.length!==0&&(z.labels=[],Ae())},onNewIssue(){c&&c()}};function Ke(){let I=q?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${po(z,Re,{sort_mode:E,show_deferred:q,deferred_count:P,label_options:pe(),label_menu_open:Y})}
        <div class=${I}>
          ${jt({title:"Blocked",id:"blocked-col",items:he($)},Be)}
          ${jt({title:"Ready",id:"ready-col",items:he(v)},Be)}
          ${jt({title:"In progress",id:"in-progress-col",items:he(T)},Be)}
          ${jt({title:"Resolved",id:"resolved-col",items:he(C)},Be)}
          ${q?jt({title:"Deferred",id:"deferred-col",items:he(L)},Be):""}
          ${jt({title:"Closed",id:"closed-col",items:he(M),is_closed:!0,closed_range:h},Be)}
        </div>
      </div>
    `}function je(){me(Ke(),t),Ze()}function Ze(){try{let I=Array.from(t.querySelectorAll(".board-column"));for(let N of I)Array.from(N.querySelectorAll(".board-card")).forEach((j,Z)=>{j.tabIndex=Z===0?0:-1})}catch{}}async function gt(I,N){if(!o){J("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:I,status:N}),J("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(K){r("update-status failed: %o",K),J("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function at(I){switch(I){case"blocked-col":return $;case"ready-col":return v;case"in-progress-col":return T;case"resolved-col":return C;case"deferred-col":return L;default:return[]}}function lt(I,N,K){if(!o||!i)return;let j=at(I),Z=j.find(k=>k.id===N);if(!Z)return;let le=j.filter(k=>k.id!==N),ce=K.closest?K.closest(".board-card"):null,ge=le.length;if(ce){let k=ce.getAttribute("data-issue-id");if(k===N)return;let D=le.findIndex(S=>S.id===k);D>=0&&(ge=D)}let te=le.slice();te.splice(ge,0,Z),w.applyReorder(N,te,ge)}function Xe(){for(let I of Array.from(t.querySelectorAll(".board-column--drag-over")))I.classList.remove("board-column--drag-over")}let Oe=null;t.addEventListener("dragover",I=>{I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move");let K=I.target.closest(".board-column");K&&K!==Oe&&(Oe&&Oe.classList.remove("board-column--drag-over"),K.classList.add("board-column--drag-over"),Oe=K)}),t.addEventListener("dragleave",I=>{let N=I.relatedTarget;(!N||!t.contains(N))&&Oe&&(Oe.classList.remove("board-column--drag-over"),Oe=null)}),t.addEventListener("drop",I=>{I.preventDefault(),Oe&&(Oe.classList.remove("board-column--drag-over"),Oe=null);let N=I.target,K=N.closest(".board-column");if(!K)return;let j=I.dataTransfer?.getData("text/plain")||"";if(!j)return;let Z=K.id,le=x.get(j);if(le&&le===Z){if(Fa.has(Z)){if(E!=="manual"){J("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}lt(Z,j,N)}return}let ce=Pa[Z];if(!ce){J("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}A.get(j)!==ce&&gt(j,ce)}),t.addEventListener("keydown",I=>{let N=I.target;if(!(N instanceof HTMLElement))return;let K=String(N.tagName||"").toLowerCase();if(K==="input"||K==="textarea"||K==="select"||K==="button"||K==="a"||N.isContentEditable===!0)return;let j=N.closest(".board-card");if(!j)return;let Z=String(I.key||"");if(Z==="Enter"||Z===" "){I.preventDefault();let te=j.getAttribute("data-issue-id");te&&n(te);return}if(Z!=="ArrowUp"&&Z!=="ArrowDown"&&Z!=="ArrowLeft"&&Z!=="ArrowRight")return;I.preventDefault();let le=j.closest(".board-column");if(!le)return;let ce=Array.from(le.querySelectorAll(".board-card")),ge=ce.indexOf(j);if(Z==="ArrowDown"&&ge<ce.length-1){Je(j,ce[ge+1]);return}if(Z==="ArrowUp"&&ge>0){Je(j,ce[ge-1]);return}if(Z==="ArrowLeft"||Z==="ArrowRight"){let te=Array.from(t.querySelectorAll(".board-column")),k=te.indexOf(le),D=Z==="ArrowRight"?1:-1,S=k+D;for(;S>=0&&S<te.length;){let X=te[S].querySelector(".board-card");if(X){Je(j,X);return}S+=D}}});function Je(I,N){try{I.tabIndex=-1,N.tabIndex=0,N.focus()}catch{}}let de=null;_&&_.subscribe&&(de=_.subscribe(()=>{try{Ae()}catch{}}));let Ue=null;return l&&l.subscribe&&(Ue=l.subscribe(()=>{try{Ae()}catch{}})),{async load(){r("load"),Ae()},clear(){De(),de&&(de(),de=null),Ue&&(Ue(),Ue=null),t.replaceChildren(),$=[],v=[],T=[],C=[],L=[],M=[],A=new Map,x=new Map}}}function Rn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function lr(t,e){return t.filter(r=>{let n=Rn(r);return!(n&&e.has(n))})}async function Ba(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Yt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ua="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Vt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}var cr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function go(t){let e=0;for(let r of cr)e+=Vt(t?.[r]);return e}function mo(t){return!t||typeof t!="object"?!1:cr.some(e=>Number.isFinite(t[e]))}function za(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function dr(t){return mo(t)?`\u03C4 ${za(go(t))}`:null}function Dt(t){let e=dr(t);if(!e)return null;let r=t?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${e} \xB7 $${r.toFixed(2)}`:e}function ur(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${Vt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Vt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Vt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Vt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${go(t).toLocaleString("en-US")}`,e.join(" \xB7 ")];return t.replayed&&r.push(Ua),r.join(`
`)}function Ot(t,e){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,i=!1;for(let l of Object.values(t||{})){if(!l||l.bead_id!==e)continue;let a=l.usage;if(mo(a)){n+=1;for(let c of cr)r[c]=Vt(r[c])+Vt(a[c]);typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)&&(s+=a.total_cost_usd,o+=1),a.replayed===!0&&(i=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),i&&(r.replayed=!0),r)}var Ha={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Wa=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ga=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Mt(t){return!!t&&typeof t=="object"}function In(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function bo(t,e){let r=In(t),n=In(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function ja(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>Mt(s)&&typeof s.text=="string"?s.text:"").join(""):Mt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Ya(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Ha[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=In(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=bo(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=bo(Mt(l)?l.old_string:"",Mt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function wo(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Wa.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Ga.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Va(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(Mt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(wo(o.text));else if(o.type==="tool_use"){let i=Ya(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(Mt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=ja(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Ka(t){if(t.type==="item.completed"&&Mt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[wo(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Za(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function ko(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!Mt(o))continue;let i=Za(o)?Ka(o):Va(o,r);for(let l of i)e.push(l)}return e}function Zr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function h(){if(!o||!n)return[];let x=n.get(o);return ko(x?x.lines:[])}function _(x,g){if(g.kind==="gate")return d`<div class="sv__gate">${g.text}</div>`;if(g.kind==="phase")return d`<div class="sv__phase">${g.text}</div>`;if(g.kind==="result")return d`<div
        class="sv__result${g.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${g.success?"\u2713":"\u2717"}
        ${g.text||(g.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(g.kind==="error")return d`<div class="sv__error">⛔ ${g.text}</div>`;if(g.kind==="blocker")return d`<div class="sv__error">⛔ ${g.text}</div>`;if(g.kind==="tool"){let B=a.has(x),z=g.tool==="Bash"?g.command:g.path||g.command||"";return d`<div
        class="sv__tool${B?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>C(x)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${g.icon}</span>
          <span class="sv__tool-name">${g.tool}</span>
          ${z?d`<span class="sv__tool-detail">${z}</span>`:""}
          ${typeof g.added=="number"?d`<span class="sv__diff-add">+${g.added}</span>`:""}
          ${typeof g.removed=="number"?d`<span class="sv__diff-del">−${g.removed}</span>`:""}
          ${g.result?d`<span class="sv__tool-ok">→ ${g.result}</span>`:""}
        </span>
        ${B?d`<pre class="sv__tool-expand">${w(g)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${g.text}</div>`}function w(x){let g=[];if(x.input!==void 0)try{g.push(`input: ${JSON.stringify(x.input,null,2)}`)}catch{}return typeof x.output=="string"&&x.output.length>0&&g.push(`output:
${x.output}`),g.join(`

`)}function $(){if(!o)return d``;let x=h(),g=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),B=i.session_id||"",z=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${B?d`<button
              type="button"
              class="sv__session"
              title=${B}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${B}`}
              @click=${()=>M(B)}
            >
              ⧉ ${B.slice(0,8)}
            </button>`:""}
        ${g?d`<span class="sv__meta">${g}</span>`:""}
        ${i.worktree?d`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${z}
          @click=${L}
        >
          <span class="sv__follow-full">⇣ ${z}</span>
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
        ${x.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:x.map((Y,ne)=>_(ne,Y))}
      </div>
    </div>`}function v(){me($(),t),l&&T()}function T(){let x=t.querySelector(".sv__body");x&&(x.scrollTop=x.scrollHeight)}function C(x){a.has(x)?a.delete(x):a.add(x),v()}function L(){l=!l,v()}function M(x){Yt(x).then(g=>{g?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function q(x){!o||!x||(i={...i,...x},v())}function P(x){let g=x.target;if(!g||!g.classList||!g.classList.contains("sv__body"))return;!(g.scrollHeight-g.scrollTop-g.clientHeight<=4)&&l&&(l=!1,v())}t.addEventListener("scroll",P,!0);function E(x){let g=x&&x.attempt_id;g&&(o=g,i=x.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(v)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),v())}function A(){let x=o;o=null,a.clear(),r&&x&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${x}`})).catch(()=>{}),me(d``,t),s&&s()}return{open:E,updateMeta:q,close:A,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",P,!0),o=null,me(d``,t)}}}function Xa(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function yo(t,e){let r=Xa(t);return d`
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
  `}var Ln=["opus","sonnet","haiku","fable"],Dn=["low","medium","high","xhigh"],On=["codex","opus","fable","self","skip"],Mn=["opus","fable","sonnet","haiku"],Qa=["standard","fast_track"],Nn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Xr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Nn[t]||"(\uAE30\uBCF8)"}function yr(t,e,r,n,s,o){return d`
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
  `}function vr(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function vo(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return d`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${yr("orchestration_model","orchestration_model",vr(Ln,Xr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${yr("orchestration_effort","orchestration_effort",vr(Dn,Xr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${yr("review_model","review_model",vr(On,Xr("review_model",s)),n.review_model||"",!1,e)}
    ${yr("impl_model","impl_model",vr(Mn,Xr("impl_model",s)),n.impl_model||"",!1,e)}
    ${yr("workflow_mode","workflow_mode",vr(Qa),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Io,setPrototypeOf:$o,isFrozen:Ja,getPrototypeOf:el,getOwnPropertyDescriptor:tl}=Object,{freeze:rt,seal:mt,create:Hn}=Object,{apply:Wn,construct:Gn}=typeof Reflect<"u"&&Reflect;rt||(rt=function(e){return e});mt||(mt=function(e){return e});Wn||(Wn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Gn||(Gn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Qr=nt(Array.prototype.forEach),rl=nt(Array.prototype.lastIndexOf),xo=nt(Array.prototype.pop),$r=nt(Array.prototype.push),nl=nt(Array.prototype.splice),en=nt(String.prototype.toLowerCase),Pn=nt(String.prototype.toString),Fn=nt(String.prototype.match),xr=nt(String.prototype.replace),sl=nt(String.prototype.indexOf),ol=nt(String.prototype.trim),yt=nt(Object.prototype.hasOwnProperty),tt=nt(RegExp.prototype.test),Sr=il(TypeError);function nt(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Wn(t,e,n)}}function il(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Gn(t,r)}}function ae(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:en;$o&&$o(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ja(e)||(e[n]=o),s=o)}t[s]=!0}return t}function al(t){for(let e=0;e<t.length;e++)yt(t,e)||(t[e]=null);return t}function Et(t){let e=Hn(null);for(let[r,n]of Io(t))yt(t,r)&&(Array.isArray(n)?e[r]=al(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=Et(n):e[r]=n);return e}function Tr(t,e){for(;t!==null;){let n=tl(t,e);if(n){if(n.get)return nt(n.get);if(typeof n.value=="function")return nt(n.value)}t=el(t)}function r(){return null}return r}var So=rt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),qn=rt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Bn=rt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ll=rt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Un=rt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),cl=rt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),To=rt(["#text"]),Ao=rt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),zn=rt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Eo=rt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Jr=rt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),dl=mt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ul=mt(/<%[\w\W]*|[\w\W]*%>/gm),pl=mt(/\$\{[\w\W]*/gm),fl=mt(/^data-[\-\w.\u00B7-\uFFFF]+$/),hl=mt(/^aria-[\-\w]+$/),Lo=mt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),_l=mt(/^(?:\w+script|data):/i),gl=mt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Do=mt(/^html$/i),ml=mt(/^[a-z][.\w]*(-[.\w]+)+$/i),Co=Object.freeze({__proto__:null,ARIA_ATTR:hl,ATTR_WHITESPACE:gl,CUSTOM_ELEMENT:ml,DATA_ATTR:fl,DOCTYPE_NAME:Do,ERB_EXPR:ul,IS_ALLOWED_URI:Lo,IS_SCRIPT_OR_DATA:_l,MUSTACHE_EXPR:dl,TMPLIT_EXPR:pl}),Ar={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},bl=function(){return typeof window>"u"?null:window},wl=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ro=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Oo(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:bl(),e=G=>Oo(G);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Ar.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:h=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:_,DOMParser:w,trustedTypes:$}=t,v=a.prototype,T=Tr(v,"cloneNode"),C=Tr(v,"remove"),L=Tr(v,"nextSibling"),M=Tr(v,"childNodes"),q=Tr(v,"parentNode");if(typeof i=="function"){let G=r.createElement("template");G.content&&G.content.ownerDocument&&(r=G.content.ownerDocument)}let P,E="",{implementation:A,createNodeIterator:x,createDocumentFragment:g,getElementsByTagName:B}=r,{importNode:z}=n,Y=Ro();e.isSupported=typeof Io=="function"&&typeof q=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ne,ERB_EXPR:ye,TMPLIT_EXPR:ue,DATA_ATTR:he,ARIA_ATTR:pe,IS_SCRIPT_OR_DATA:ee,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:ut}=Co,{IS_ALLOWED_URI:ot}=Co,we=null,Le=ae({},[...So,...qn,...Bn,...Un,...To]),ve=null,Qe=ae({},[...Ao,...zn,...Eo,...Jr]),_e=Object.seal(Hn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),We=null,ht=null,Ye=Object.seal(Hn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),_t=!0,Be=!0,it=!1,pt=!0,Ge=!1,De=!0,Re=!1,Ke=!1,je=!1,Ze=!1,gt=!1,at=!1,lt=!0,Xe=!1,Oe="user-content-",Je=!0,de=!1,Ue={},I=null,N=ae({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),K=null,j=ae({},["audio","video","img","source","image","track"]),Z=null,le=ae({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ce="http://www.w3.org/1998/Math/MathML",ge="http://www.w3.org/2000/svg",te="http://www.w3.org/1999/xhtml",k=te,D=!1,S=null,X=ae({},[ce,ge,te],Pn),Ne=ae({},["mi","mo","mn","ms","mtext"]),u=ae({},["annotation-xml"]),b=ae({},["title","style","font","a","script"]),R=null,se=["application/xhtml+xml","text/html"],V="text/html",re=null,ke=null,Te=r.createElement("form"),ze=function(f){return f instanceof RegExp||f instanceof Function},et=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ke&&ke===f)){if((!f||typeof f!="object")&&(f={}),f=Et(f),R=se.indexOf(f.PARSER_MEDIA_TYPE)===-1?V:f.PARSER_MEDIA_TYPE,re=R==="application/xhtml+xml"?Pn:en,we=yt(f,"ALLOWED_TAGS")?ae({},f.ALLOWED_TAGS,re):Le,ve=yt(f,"ALLOWED_ATTR")?ae({},f.ALLOWED_ATTR,re):Qe,S=yt(f,"ALLOWED_NAMESPACES")?ae({},f.ALLOWED_NAMESPACES,Pn):X,Z=yt(f,"ADD_URI_SAFE_ATTR")?ae(Et(le),f.ADD_URI_SAFE_ATTR,re):le,K=yt(f,"ADD_DATA_URI_TAGS")?ae(Et(j),f.ADD_DATA_URI_TAGS,re):j,I=yt(f,"FORBID_CONTENTS")?ae({},f.FORBID_CONTENTS,re):N,We=yt(f,"FORBID_TAGS")?ae({},f.FORBID_TAGS,re):Et({}),ht=yt(f,"FORBID_ATTR")?ae({},f.FORBID_ATTR,re):Et({}),Ue=yt(f,"USE_PROFILES")?f.USE_PROFILES:!1,_t=f.ALLOW_ARIA_ATTR!==!1,Be=f.ALLOW_DATA_ATTR!==!1,it=f.ALLOW_UNKNOWN_PROTOCOLS||!1,pt=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ge=f.SAFE_FOR_TEMPLATES||!1,De=f.SAFE_FOR_XML!==!1,Re=f.WHOLE_DOCUMENT||!1,Ze=f.RETURN_DOM||!1,gt=f.RETURN_DOM_FRAGMENT||!1,at=f.RETURN_TRUSTED_TYPE||!1,je=f.FORCE_BODY||!1,lt=f.SANITIZE_DOM!==!1,Xe=f.SANITIZE_NAMED_PROPS||!1,Je=f.KEEP_CONTENT!==!1,de=f.IN_PLACE||!1,ot=f.ALLOWED_URI_REGEXP||Lo,k=f.NAMESPACE||te,Ne=f.MATHML_TEXT_INTEGRATION_POINTS||Ne,u=f.HTML_INTEGRATION_POINTS||u,_e=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&ze(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_e.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&ze(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_e.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(_e.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ge&&(Be=!1),gt&&(Ze=!0),Ue&&(we=ae({},To),ve=[],Ue.html===!0&&(ae(we,So),ae(ve,Ao)),Ue.svg===!0&&(ae(we,qn),ae(ve,zn),ae(ve,Jr)),Ue.svgFilters===!0&&(ae(we,Bn),ae(ve,zn),ae(ve,Jr)),Ue.mathMl===!0&&(ae(we,Un),ae(ve,Eo),ae(ve,Jr))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?Ye.tagCheck=f.ADD_TAGS:(we===Le&&(we=Et(we)),ae(we,f.ADD_TAGS,re))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?Ye.attributeCheck=f.ADD_ATTR:(ve===Qe&&(ve=Et(ve)),ae(ve,f.ADD_ATTR,re))),f.ADD_URI_SAFE_ATTR&&ae(Z,f.ADD_URI_SAFE_ATTR,re),f.FORBID_CONTENTS&&(I===N&&(I=Et(I)),ae(I,f.FORBID_CONTENTS,re)),Je&&(we["#text"]=!0),Re&&ae(we,["html","head","body"]),we.table&&(ae(we,["tbody"]),delete We.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw Sr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Sr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=f.TRUSTED_TYPES_POLICY,E=P.createHTML("")}else P===void 0&&(P=wl($,s)),P!==null&&typeof E=="string"&&(E=P.createHTML(""));rt&&rt(f),ke=f}},bt=ae({},[...qn,...Bn,...ll]),wt=ae({},[...Un,...cl]),St=function(f){let O=q(f);(!O||!O.tagName)&&(O={namespaceURI:k,tagName:"template"});let W=en(f.tagName),Se=en(O.tagName);return S[f.namespaceURI]?f.namespaceURI===ge?O.namespaceURI===te?W==="svg":O.namespaceURI===ce?W==="svg"&&(Se==="annotation-xml"||Ne[Se]):!!bt[W]:f.namespaceURI===ce?O.namespaceURI===te?W==="math":O.namespaceURI===ge?W==="math"&&u[Se]:!!wt[W]:f.namespaceURI===te?O.namespaceURI===ge&&!u[Se]||O.namespaceURI===ce&&!Ne[Se]?!1:!wt[W]&&(b[W]||!bt[W]):!!(R==="application/xhtml+xml"&&S[f.namespaceURI]):!1},Pe=function(f){$r(e.removed,{element:f});try{q(f).removeChild(f)}catch{C(f)}},Ve=function(f,O){try{$r(e.removed,{attribute:O.getAttributeNode(f),from:O})}catch{$r(e.removed,{attribute:null,from:O})}if(O.removeAttribute(f),f==="is")if(Ze||gt)try{Pe(O)}catch{}else try{O.setAttribute(f,"")}catch{}},oe=function(f){let O=null,W=null;if(je)f="<remove></remove>"+f;else{let Ie=Fn(f,/^[\r\n\t ]+/);W=Ie&&Ie[0]}R==="application/xhtml+xml"&&k===te&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");let Se=P?P.createHTML(f):f;if(k===te)try{O=new w().parseFromString(Se,R)}catch{}if(!O||!O.documentElement){O=A.createDocument(k,"template",null);try{O.documentElement.innerHTML=D?E:Se}catch{}}let He=O.body||O.documentElement;return f&&W&&He.insertBefore(r.createTextNode(W),He.childNodes[0]||null),k===te?B.call(O,Re?"html":"body")[0]:Re?O.documentElement:He},p=function(f){return x.call(f.ownerDocument||f,f,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},m=function(f){return f instanceof _&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof h)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},H=function(f){return typeof l=="function"&&f instanceof l};function U(G,f,O){Qr(G,W=>{W.call(e,f,O,ke)})}let ie=function(f){let O=null;if(U(Y.beforeSanitizeElements,f,null),m(f))return Pe(f),!0;let W=re(f.nodeName);if(U(Y.uponSanitizeElement,f,{tagName:W,allowedTags:we}),De&&f.hasChildNodes()&&!H(f.firstElementChild)&&tt(/<[/\w!]/g,f.innerHTML)&&tt(/<[/\w!]/g,f.textContent)||f.nodeType===Ar.progressingInstruction||De&&f.nodeType===Ar.comment&&tt(/<[/\w]/g,f.data))return Pe(f),!0;if(!(Ye.tagCheck instanceof Function&&Ye.tagCheck(W))&&(!we[W]||We[W])){if(!We[W]&&Ft(W)&&(_e.tagNameCheck instanceof RegExp&&tt(_e.tagNameCheck,W)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(W)))return!1;if(Je&&!I[W]){let Se=q(f)||f.parentNode,He=M(f)||f.childNodes;if(He&&Se){let Ie=He.length;for(let Fe=Ie-1;Fe>=0;--Fe){let ft=T(He[Fe],!0);ft.__removalCount=(f.__removalCount||0)+1,Se.insertBefore(ft,L(f))}}}return Pe(f),!0}return f instanceof a&&!St(f)||(W==="noscript"||W==="noembed"||W==="noframes")&&tt(/<\/no(script|embed|frames)/i,f.innerHTML)?(Pe(f),!0):(Ge&&f.nodeType===Ar.text&&(O=f.textContent,Qr([ne,ye,ue],Se=>{O=xr(O,Se," ")}),f.textContent!==O&&($r(e.removed,{element:f.cloneNode()}),f.textContent=O)),U(Y.afterSanitizeElements,f,null),!1)},Ee=function(f,O,W){if(lt&&(O==="id"||O==="name")&&(W in r||W in Te))return!1;if(!(Be&&!ht[O]&&tt(he,O))){if(!(_t&&tt(pe,O))){if(!(Ye.attributeCheck instanceof Function&&Ye.attributeCheck(O,f))){if(!ve[O]||ht[O]){if(!(Ft(f)&&(_e.tagNameCheck instanceof RegExp&&tt(_e.tagNameCheck,f)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(f))&&(_e.attributeNameCheck instanceof RegExp&&tt(_e.attributeNameCheck,O)||_e.attributeNameCheck instanceof Function&&_e.attributeNameCheck(O,f))||O==="is"&&_e.allowCustomizedBuiltInElements&&(_e.tagNameCheck instanceof RegExp&&tt(_e.tagNameCheck,W)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(W))))return!1}else if(!Z[O]){if(!tt(ot,xr(W,Ae,""))){if(!((O==="src"||O==="xlink:href"||O==="href")&&f!=="script"&&sl(W,"data:")===0&&K[f])){if(!(it&&!tt(ee,xr(W,Ae,"")))){if(W)return!1}}}}}}}return!0},Ft=function(f){return f!=="annotation-xml"&&Fn(f,ut)},pr=function(f){U(Y.beforeSanitizeAttributes,f,null);let{attributes:O}=f;if(!O||m(f))return;let W={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0},Se=O.length;for(;Se--;){let He=O[Se],{name:Ie,namespaceURI:Fe,value:ft}=He,Tt=re(Ie),Xt=ft,qe=Ie==="value"?Xt:ol(Xt);if(W.attrName=Tt,W.attrValue=qe,W.keepAttr=!0,W.forceKeepAttr=void 0,U(Y.uponSanitizeAttribute,f,W),qe=W.attrValue,Xe&&(Tt==="id"||Tt==="name")&&(Ve(Ie,f),qe=Oe+qe),De&&tt(/((--!?|])>)|<\/(style|title|textarea)/i,qe)){Ve(Ie,f);continue}if(Tt==="attributename"&&Fn(qe,"href")){Ve(Ie,f);continue}if(W.forceKeepAttr)continue;if(!W.keepAttr){Ve(Ie,f);continue}if(!pt&&tt(/\/>/i,qe)){Ve(Ie,f);continue}Ge&&Qr([ne,ye,ue],Nr=>{qe=xr(qe,Nr," ")});let Qt=re(f.nodeName);if(!Ee(Qt,Tt,qe)){Ve(Ie,f);continue}if(P&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Fe)switch($.getAttributeType(Qt,Tt)){case"TrustedHTML":{qe=P.createHTML(qe);break}case"TrustedScriptURL":{qe=P.createScriptURL(qe);break}}if(qe!==Xt)try{Fe?f.setAttributeNS(Fe,Ie,qe):f.setAttribute(Ie,qe),m(f)?Pe(f):xo(e.removed)}catch{Ve(Ie,f)}}U(Y.afterSanitizeAttributes,f,null)},pn=function G(f){let O=null,W=p(f);for(U(Y.beforeSanitizeShadowDOM,f,null);O=W.nextNode();)U(Y.uponSanitizeShadowNode,O,null),ie(O),pr(O),O.content instanceof o&&G(O.content);U(Y.afterSanitizeShadowDOM,f,null)};return e.sanitize=function(G){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},O=null,W=null,Se=null,He=null;if(D=!G,D&&(G="<!-->"),typeof G!="string"&&!H(G))if(typeof G.toString=="function"){if(G=G.toString(),typeof G!="string")throw Sr("dirty is not a string, aborting")}else throw Sr("toString is not a function");if(!e.isSupported)return G;if(Ke||et(f),e.removed=[],typeof G=="string"&&(de=!1),de){if(G.nodeName){let ft=re(G.nodeName);if(!we[ft]||We[ft])throw Sr("root node is forbidden and cannot be sanitized in-place")}}else if(G instanceof l)O=oe("<!---->"),W=O.ownerDocument.importNode(G,!0),W.nodeType===Ar.element&&W.nodeName==="BODY"||W.nodeName==="HTML"?O=W:O.appendChild(W);else{if(!Ze&&!Ge&&!Re&&G.indexOf("<")===-1)return P&&at?P.createHTML(G):G;if(O=oe(G),!O)return Ze?null:at?E:""}O&&je&&Pe(O.firstChild);let Ie=p(de?G:O);for(;Se=Ie.nextNode();)ie(Se),pr(Se),Se.content instanceof o&&pn(Se.content);if(de)return G;if(Ze){if(gt)for(He=g.call(O.ownerDocument);O.firstChild;)He.appendChild(O.firstChild);else He=O;return(ve.shadowroot||ve.shadowrootmode)&&(He=z.call(n,He,!0)),He}let Fe=Re?O.outerHTML:O.innerHTML;return Re&&we["!doctype"]&&O.ownerDocument&&O.ownerDocument.doctype&&O.ownerDocument.doctype.name&&tt(Do,O.ownerDocument.doctype.name)&&(Fe="<!DOCTYPE "+O.ownerDocument.doctype.name+`>
`+Fe),Ge&&Qr([ne,ye,ue],ft=>{Fe=xr(Fe,ft," ")}),P&&at?P.createHTML(Fe):Fe},e.setConfig=function(){let G=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};et(G),Ke=!0},e.clearConfig=function(){ke=null,Ke=!1},e.isValidAttribute=function(G,f,O){ke||et({});let W=re(G),Se=re(f);return Ee(W,Se,O)},e.addHook=function(G,f){typeof f=="function"&&$r(Y[G],f)},e.removeHook=function(G,f){if(f!==void 0){let O=rl(Y[G],f);return O===-1?void 0:nl(Y[G],O,1)[0]}return xo(Y[G])},e.removeHooks=function(G){Y[G]=[]},e.removeAllHooks=function(){Y=Ro()},e}var Mo=Oo();var No={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Po=t=>(...e)=>({_$litDirective$:t,values:e}),tn=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Er=class extends tn{constructor(e){if(super(e),this.it=Me,e.type!==No.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Me||e==null)return this._t=void 0,this.it=e;if(e===zt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Er.directiveName="unsafeHTML",Er.resultType=1;var Fo=Po(Er);function Kn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Zt=Kn();function Go(t){Zt=t}var Lr={exec:()=>null};function fe(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(st.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var kl=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),st={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},yl=/^(?:[ \t]*(?:\n|$))+/,vl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,$l=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Dr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,xl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Zn=/(?:[*+-]|\d{1,9}[.)])/,jo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Yo=fe(jo).replace(/bull/g,Zn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Sl=fe(jo).replace(/bull/g,Zn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Xn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Tl=/^[^\n]+/,Qn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Al=fe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Qn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),El=fe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Zn).getRegex(),ln="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Jn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Cl=fe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Jn).replace("tag",ln).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Vo=fe(Xn).replace("hr",Dr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ln).getRegex(),Rl=fe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Vo).getRegex(),es={blockquote:Rl,code:vl,def:Al,fences:$l,heading:xl,hr:Dr,html:Cl,lheading:Yo,list:El,newline:yl,paragraph:Vo,table:Lr,text:Tl},qo=fe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Dr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ln).getRegex(),Il={...es,lheading:Sl,table:qo,paragraph:fe(Xn).replace("hr",Dr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",qo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ln).getRegex()},Ll={...es,html:fe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Jn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Lr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:fe(Xn).replace("hr",Dr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Yo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Dl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ol=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ko=/^( {2,}|\\)\n(?!\s*$)/,Ml=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,cn=/[\p{P}\p{S}]/u,ts=/[\s\p{P}\p{S}]/u,Zo=/[^\s\p{P}\p{S}]/u,Nl=fe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ts).getRegex(),Xo=/(?!~)[\p{P}\p{S}]/u,Pl=/(?!~)[\s\p{P}\p{S}]/u,Fl=/(?:[^\s\p{P}\p{S}]|~)/u,ql=fe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",kl?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Qo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Bl=fe(Qo,"u").replace(/punct/g,cn).getRegex(),Ul=fe(Qo,"u").replace(/punct/g,Xo).getRegex(),Jo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",zl=fe(Jo,"gu").replace(/notPunctSpace/g,Zo).replace(/punctSpace/g,ts).replace(/punct/g,cn).getRegex(),Hl=fe(Jo,"gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Pl).replace(/punct/g,Xo).getRegex(),Wl=fe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zo).replace(/punctSpace/g,ts).replace(/punct/g,cn).getRegex(),Gl=fe(/\\(punct)/,"gu").replace(/punct/g,cn).getRegex(),jl=fe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Yl=fe(Jn).replace("(?:-->|$)","-->").getRegex(),Vl=fe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Yl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),sn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Kl=fe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",sn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ei=fe(/^!?\[(label)\]\[(ref)\]/).replace("label",sn).replace("ref",Qn).getRegex(),ti=fe(/^!?\[(ref)\](?:\[\])?/).replace("ref",Qn).getRegex(),Zl=fe("reflink|nolink(?!\\()","g").replace("reflink",ei).replace("nolink",ti).getRegex(),Bo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,rs={_backpedal:Lr,anyPunctuation:Gl,autolink:jl,blockSkip:ql,br:Ko,code:Ol,del:Lr,emStrongLDelim:Bl,emStrongRDelimAst:zl,emStrongRDelimUnd:Wl,escape:Dl,link:Kl,nolink:ti,punctuation:Nl,reflink:ei,reflinkSearch:Zl,tag:Vl,text:Ml,url:Lr},Xl={...rs,link:fe(/^!?\[(label)\]\((.*?)\)/).replace("label",sn).getRegex(),reflink:fe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",sn).getRegex()},jn={...rs,emStrongRDelimAst:Hl,emStrongLDelim:Ul,url:fe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Bo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:fe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Bo).getRegex()},Ql={...jn,br:fe(Ko).replace("{2,}","*").getRegex(),text:fe(jn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},rn={normal:es,gfm:Il,pedantic:Ll},Cr={normal:rs,gfm:jn,breaks:Ql,pedantic:Xl},Jl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Uo=t=>Jl[t];function Ct(t,e){if(e){if(st.escapeTest.test(t))return t.replace(st.escapeReplace,Uo)}else if(st.escapeTestNoEncode.test(t))return t.replace(st.escapeReplaceNoEncode,Uo);return t}function zo(t){try{t=encodeURI(t).replace(st.percentDecode,"%")}catch{return null}return t}function Ho(t,e){let r=t.replace(st.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(st.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(st.slashPipe,"|");return n}function Rr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function ec(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Wo(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function tc(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var on=class{constructor(t){xe(this,"options");xe(this,"rules");xe(this,"lexer");this.options=t||Zt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Rr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=tc(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Rr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Rr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Rr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),h=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${h}`:h;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,o,!0),this.lexer.state.top=_,r.length===0)break;let w=o.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let $=w,v=$.raw+`
`+r.join(`
`),T=this.blockquote(v);o[o.length-1]=T,n=n.substring(0,n.length-$.raw.length)+T.raw,s=s.substring(0,s.length-$.text.length)+T.text;break}else if(w?.type==="list"){let $=w,v=$.raw+`
`+r.join(`
`),T=this.list(v);o[o.length-1]=T,n=n.substring(0,n.length-w.raw.length)+T.raw,s=s.substring(0,s.length-$.raw.length)+T.raw,r=v.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",h="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let _=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),w=t.split(`
`,1)[0],$=!_.trim(),v=0;if(this.options.pedantic?(v=2,h=_.trimStart()):$?v=e[1].length+1:(v=e[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,h=_.slice(v),v+=e[1].length),$&&this.rules.other.blankLine.test(w)&&(c+=w+`
`,t=t.substring(w.length+1),a=!0),!a){let T=this.rules.other.nextBulletRegex(v),C=this.rules.other.hrRegex(v),L=this.rules.other.fencesBeginRegex(v),M=this.rules.other.headingBeginRegex(v),q=this.rules.other.htmlBeginRegex(v);for(;t;){let P=t.split(`
`,1)[0],E;if(w=P,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),E=w):E=w.replace(this.rules.other.tabCharGlobal,"    "),L.test(w)||M.test(w)||q.test(w)||T.test(w)||C.test(w))break;if(E.search(this.rules.other.nonSpaceChar)>=v||!w.trim())h+=`
`+E.slice(v);else{if($||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||L.test(_)||M.test(_)||C.test(_))break;h+=`
`+w}!$&&!w.trim()&&($=!0),c+=P+`
`,t=t.substring(P.length+1),_=E.slice(v)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let h={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=h.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=h.raw+a.tokens[0].raw,a.tokens[0].text=h.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(h)):a.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):a.tokens.unshift(h)}}if(!s.loose){let c=a.tokens.filter(_=>_.type==="space"),h=c.length>0&&c.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=h}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Ho(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Ho(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Rr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=ec(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Wo(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Wo(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let h=[...n[0]][0].length,_=t.slice(0,s+n.index+h+i);if(Math.min(s,i)%2){let $=_.slice(1,-1);return{type:"em",raw:_,text:$,tokens:this.lexer.inlineTokens($)}}let w=_.slice(2,-2);return{type:"strong",raw:_,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},vt=class Yn{constructor(e){xe(this,"tokens");xe(this,"options");xe(this,"state");xe(this,"inlineQueue");xe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Zt,this.options.tokenizer=this.options.tokenizer||new on,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:st,block:rn.normal,inline:Cr.normal};this.options.pedantic?(r.block=rn.pedantic,r.inline=Cr.pedantic):this.options.gfm&&(r.block=rn.gfm,this.options.breaks?r.inline=Cr.breaks:r.inline=Cr.gfm),this.tokenizer.rules=r}static get rules(){return{block:rn,inline:Cr}}static lex(e,r){return new Yn(r).lex(e)}static lexInline(e,r){return new Yn(r).inlineTokens(e)}lex(e){e=e.replace(st.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(st.tabCharGlobal,"    ").replace(st.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(h=>(a=h.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let h=r.at(-1);a.type==="text"&&h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let h=1/0,_=e.slice(1),w;this.options.extensions.startInline.forEach($=>{w=$.call({lexer:this},_),typeof w=="number"&&w>=0&&(h=Math.min(h,w))}),h<1/0&&h>=0&&(c=e.substring(0,h+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let h=r.at(-1);h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(e){let h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return r}},an=class{constructor(t){xe(this,"options");xe(this,"parser");this.options=t||Zt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(st.notSpaceStart)?.[0],s=t.replace(st.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Ct(n)+'">'+(r?s:Ct(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Ct(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${Ct(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=zo(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+Ct(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=zo(t);if(s===null)return Ct(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${Ct(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:Ct(t.text)}},ns=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},$t=class Vn{constructor(e){xe(this,"options");xe(this,"renderer");xe(this,"textRenderer");this.options=e||Zt,this.options.renderer=this.options.renderer||new an,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ns}static parse(e,r){return new Vn(r).parse(e)}static parseInline(e,r){return new Vn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},nn,Ir=(nn=class{constructor(t){xe(this,"options");xe(this,"block");this.options=t||Zt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?vt.lex:vt.lexInline}provideParser(){return this.block?$t.parse:$t.parseInline}},xe(nn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),xe(nn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),nn),rc=class{constructor(...t){xe(this,"defaults",Kn());xe(this,"options",this.setOptions);xe(this,"parse",this.parseMarkdown(!0));xe(this,"parseInline",this.parseMarkdown(!1));xe(this,"Parser",$t);xe(this,"Renderer",an);xe(this,"TextRenderer",ns);xe(this,"Lexer",vt);xe(this,"Tokenizer",on);xe(this,"Hooks",Ir);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new an(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let h=l.apply(s,c);return h===!1&&(h=a.apply(s,c)),h||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new on(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let h=l.apply(s,c);return h===!1&&(h=a.apply(s,c)),h}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Ir;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Ir.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Ir.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,c);return a.call(s,_)})();let h=l.call(s,c);return a.call(s,h)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,c);return _===!1&&(_=await a.apply(s,c)),_})();let h=l.apply(s,c);return h===!1&&(h=a.apply(s,c)),h}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return vt.lex(t,e??this.defaults)}parser(t,e){return $t.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?vt.lex:vt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?$t.parse:$t.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?vt.lex:vt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?$t.parse:$t.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+Ct(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Kt=new rc;function be(t,e){return Kt.parse(t,e)}be.options=be.setOptions=function(t){return Kt.setOptions(t),be.defaults=Kt.defaults,Go(be.defaults),be};be.getDefaults=Kn;be.defaults=Zt;be.use=function(...t){return Kt.use(...t),be.defaults=Kt.defaults,Go(be.defaults),be};be.walkTokens=function(t,e){return Kt.walkTokens(t,e)};be.parseInline=Kt.parseInline;be.Parser=$t;be.parser=$t.parse;be.Renderer=an;be.TextRenderer=ns;be.Lexer=vt;be.lexer=vt.lex;be.Tokenizer=on;be.Hooks=Ir;be.parse=be;var Au=be.options,Eu=be.setOptions,Cu=be.use,Ru=be.walkTokens,Iu=be.parseInline;var Lu=$t.parse,Du=vt.lex;function ri(t){let e=be.parse(t),r=Mo.sanitize(e);return Fo(r)}function nc(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function ni(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(v){v.key==="Escape"&&s&&(v.preventDefault(),w())}document.addEventListener("keydown",a);function c(){return s?d`
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
    `:d``}function h(){me(c(),t)}async function _(v){s=v,o="loading",i="",l="",h();let T=r?r():"";if(!T){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",h();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",h();return}let C="/api/doc?workspace="+encodeURIComponent(T)+"&path="+encodeURIComponent(v);try{let L=await n(C),M=await L.json().catch(()=>({}));if(!L.ok||!M||M.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||L.status)+")",h();return}i=String(M.content||""),o="ready",h()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",h()}}function w(){s=null,me(d``,t)}function $(){document.removeEventListener("keydown",a),w()}return{open:_,close:w,destroy:$}}var sc=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],si="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function oc(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function ic(t){let e=dr(t);if(!e||!t)return"";let r=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?` \xB7 $${t.total_cost_usd.toFixed(2)}`:"";return d`<span
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
    `;let o=new Set;for(let c of n)c&&typeof c.resumed_from=="string"&&c.resumed_from.length>0&&o.add(c.resumed_from);let i=c=>{if(!(c.status==="failed"||c.status==="orphaned"))return"";let _=typeof c.session_id=="string"&&c.session_id.length>0,w=o.has(c.attempt_id),$=_&&!w,v=_?w?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${c.attempt_id}
      ?disabled=${!$}
      title=${v}
      @click=${T=>{T.stopPropagation(),$&&e.onResume&&e.onResume(c.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=c=>{if(!(c.status==="failed"||c.status==="orphaned")||typeof c.cause!="string"||c.cause==="")return"";let _=c.cause_detail,w=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:c.cause;return d`<div class="detail-session__cause" title=${w}>
      ${c.cause}
    </div>`},a=c=>{if(!dr(c.usage))return"";let h=s.has(c.attempt_id);return d`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${c.attempt_id}
      aria-expanded=${h?"true":"false"}
      title=${h?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${_=>{_.stopPropagation(),e.onToggleUsage&&e.onToggleUsage(c.attempt_id)}}
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
              ${dr(c.usage)?d`<span class="detail-session__usage"
                    >${dr(c.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${cc(c.started_at)}</span
              >
            </button>
            ${a(c)} ${i(c)} ${l(c)}
            ${s.has(c.attempt_id)&&c.usage?ac(c.usage):""}
          </div>`)}
    </div>
  `}var dc=["open","in_progress","deferred","resolved","closed"],uc=[0,1,2,3,4];function ii(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,h={},_=!1,w=!1,$="",v="",T="";function C(){_=!1,w=!1,$="",v="",T=""}let L=document.createElement("div");L.className="md-viewer-root",document.body.appendChild(L);let M=ni(L,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),q=document.createElement("div");q.className="session-log-root",document.body.appendChild(q);let P=Zr(q,{transport:s?(k,D)=>Promise.resolve(s(k,D)):void 0,sessionLogStore:l});function E(){if(!i||!a)return[];let k=i.get();return(k&&k.attempts?Object.values(k.attempts):[]).filter(S=>S&&S.bead_id===a).sort((S,X)=>(X.started_at||0)-(S.started_at||0)).map(S=>({attempt_id:S.attempt_id,bead_id:S.bead_id,status:S.status,started_at:typeof S.started_at=="number"?S.started_at:null,runner:S.runner||null,model:S.model||null,session_id:S.session_id||null,resumed_from:S.resumed_from||null,dismissed_at:typeof S.dismissed_at=="number"?S.dismissed_at:null,cause:typeof S.cause=="string"?S.cause:null,cause_detail:S.cause_detail||null,usage:S.usage||null}))}function A(){if(!i||!a)return null;let k=i.get();return Ot(k&&k.attempts||{},a)}let x=new Set;function g(k){x.has(k)?x.delete(k):x.add(k),te()}function B(k){let D=i?i.get():null,S=D&&D.attempts?D.attempts[k]:null;P.open({attempt_id:k,meta:S?{runner:S.runner||void 0,model:S.model||void 0,effort:S.effort||void 0,status:S.status||void 0,session_id:S.session_id||void 0}:{}})}async function z(k){if(!s||!k)return;let D=()=>{let X=i?i.get():null;return X&&typeof X.revision=="number"?X.revision:0},S=await s("worker-attempt-resume",{attempt_id:k,expected_revision:D()});if(S&&S.conflict){let X=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:D();S=await s("worker-attempt-resume",{attempt_id:k,expected_revision:X})}S&&S.resumed===!1&&!S.conflict&&S.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}let Y={onOpen:B,onResume:z,onToggleUsage:g};function ne(){let k=i?i.get():null,D=k&&k.exec_defaults;return D&&typeof D=="object"?D:{}}let ye=null;r&&r.subscribe&&(ye=r.subscribe(()=>pe()));let ue=null;i&&typeof i.subscribe=="function"&&(ue=i.subscribe(()=>{a&&te()}));function he(k){k.key==="Escape"&&a&&(k.preventDefault(),n())}document.addEventListener("keydown",he);function pe(){if(a){if(r&&typeof r.snapshotFor=="function"){let k=r.snapshotFor("detail:"+a)||[];c=k.find(S=>S&&S.id===a)||k[0]||c}te()}}function ee(k){Yt(k).then(D=>{D?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ae(k){k.preventDefault(),k.stopPropagation(),a&&ee(a)}function ut(k,D){k.preventDefault(),k.stopPropagation(),ee(D)}function ot(k,D){k.preventDefault(),k.stopPropagation(),M.open(D)}function we(k,D){h[k]=D,te(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:k,value:D})).catch(()=>{J("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Le(k,D,S){if(!s||!a)return!1;try{let X=await Promise.resolve(s(k,D)),Ne=Array.isArray(X)?X[0]:X;return Ne&&typeof Ne=="object"&&Ne.id?(c=Ne,!0):(J(S,"error"),!1)}catch{return J(S,"error"),!1}}function ve(k){setTimeout(()=>{try{let D=t.querySelector(k);D&&typeof D.focus=="function"&&D.focus()}catch{}},0)}function Qe(){_=!0,$=c&&c.title||"",te(),ve('.detail-edit__input[data-edit="title"]')}function _e(k){$=k.target.value}function We(){_=!1,$="",te()}function ht(){Le("edit-text",{id:a,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D&&(_=!1,$=""),te()})}function Ye(){w=!0,v=c&&c.description||"",te(),ve('.detail-edit__textarea[data-edit="description"]')}function _t(k){v=k.target.value}function Be(){w=!1,v="",te()}function it(){Le("edit-text",{id:a,field:"description",value:v},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D&&(w=!1,v=""),te()})}function pt(k,D,S,X){if(k.key==="Escape"){k.stopPropagation(),S();return}k.key==="Enter"&&(!X||k.ctrlKey||k.metaKey)&&(k.preventDefault(),D())}function Ge(k){let D=k.target.value;Le("update-status",{id:a,status:D},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>te())}function De(k){let D=Number(k.target.value);Le("update-priority",{id:a,priority:D},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>te())}function Re(k){T=k.target.value}function Ke(){let k=T.trim();k.length!==0&&Le("label-add",{id:a,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(D=>{D&&(T=""),te()})}function je(k){if(k.key==="Escape"){k.stopPropagation(),T="",te();return}k.key==="Enter"&&(k.preventDefault(),Ke())}function Ze(k){Le("label-remove",{id:a,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>te())}let gt={onCopyPath:ut,onOpenDoc:ot},at={onChange:we};function lt(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function Xe(k){switch(k&&typeof k=="object"?String(k.dependency_type||k.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Oe(k){let S=(Array.isArray(k.dependencies)?k.dependencies:[]).map(X=>({id:lt(X),icon:Xe(X)})).filter(X=>X.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${S.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${S.map(X=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(X.id)}
                  >
                    ${X.icon?`${X.icon} `:""}${X.id}
                  </button>`:d`<span class="detail-dep"
                    >${X.icon?`${X.icon} `:""}${X.id}</span
                  >`)}
          </div>`}
    `}function Je(k){let D=k.metadata||{},S=k.workflow||{},X=S.stages||{},Ne=X.spec&&X.spec.stale,u=X.impl&&X.impl.stale,b=S.route_source==="derived",R=S.route||D.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${b?" detail-kv__v--derived":""}"
          title=${b?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${b&&S.route?`${R} ? (\uCD94\uB860)`:R}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${D.spec_review||"\uC5C6\uC74C"}${Ne?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${D.impl_review||"\uC5C6\uC74C"}${u?" \xB7 stale":""}</span
        >
      </div>
      ${D.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${D.pr_url}</span>
          </div>`:""}
    `}let de={route:["spec_backed","full_plan"]};async function Ue(k,D){let S=D.target.value;if(k==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&S!=="full_plan"&&!window.confirm(`full_plan \u2192 ${S||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){te();return}await Le("update-workflow-meta",{id:a,key:k,value:S},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),te()}function I(k){let D=k.metadata||{};return d` ${((X,Ne)=>{let u=de[X],b=typeof D[X]=="string"?D[X]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${X}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${X}
          data-edit=${`wfmeta-${X}`}
          @change=${R=>Ue(X,R)}
        >
          <option value="" ?selected=${!u.includes(b)}>
            ${Ne}
          </option>
          ${u.map(R=>d`<option value=${R} ?selected=${b===R}>${R}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function N(k){return _?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${_e}
            @keydown=${D=>pt(D,ht,We,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ht}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${We}
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
          @click=${Qe}
        >
          ✎
        </button>
      </div>
    `}function K(k){let D=dt(k.created_at),S=dt(k.updated_at);return!D&&!S?d``:d`
      ${D?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
      ${S?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${S}</span>
          </div>`:""}
    `}function j(k,D){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ge}
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
          @change=${De}
        >
          ${uc.map(S=>d`<option value=${String(S)} ?selected=${S===D}>
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
              @click=${Ye}
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
              @input=${_t}
              @keydown=${D=>pt(D,it,Be,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${it}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Be}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function le(k){let D=typeof k.notes=="string"?k.notes:"";return D.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${D}</div>
    `}function ce(k){let D=Array.isArray(k.labels)?k.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${D.map(S=>d`<span class="detail-label-chip"
              >${S}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${S}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+S}
                @click=${()=>Ze(S)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${T}
            @input=${Re}
            @keydown=${je}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ke}
          >
            추가
          </button>
        </span>
      </div>
    `}function ge(){if(!a)return d``;let k=c||{},D=String(k.id||a),S=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",X=k.status||"open",Ne=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",u=k.description||"",b={...k,metadata:{...k.metadata||{},...h}};return d`
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
            ${D}
          </button>
          ${N(S)} ${j(X,Ne)}
          ${K(k)} ${Z(u)}
          ${le(k)} ${ce(k)} ${Oe(k)}
          ${Je(k)} ${I(k)}
          ${yo(k,gt)}
          ${vo(b,at,ne())}
          ${oi(E(),Y,{total:A(),expanded:x})}
        </div>
      </div>
    `}function te(){me(ge(),t)}return{load(k){k!==a&&(h={},C()),a=k,c=null,pe()},clear(){a=null,c=null,h={},C(),M.close(),P.close(),me(d``,t)},destroy(){ye&&(ye(),ye=null),ue&&(ue(),ue=null),document.removeEventListener("keydown",he),M.destroy(),L.parentNode&&L.parentNode.removeChild(L),P.destroy(),q.parentNode&&q.parentNode.removeChild(q),a=null,c=null,me(d``,t)}}}var pc=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ai(t,e){return Cn(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function fc(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function li(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(A){let x=r.get();if(x)try{let g=await n("display-policy-set",{expected_revision:x.revision,policy:A(x)});a(g),g&&g.conflict&&g.policy&&(g=await n("display-policy-set",{expected_revision:g.policy.revision,policy:A(g.policy)}),a(g)),g&&g.conflict&&J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(A){A&&A.policy&&typeof A.policy=="object"&&r.set(A.policy)}function c(A){let x=r.get();if(!x)return;let g=ai(A,x)!=="shown";l(B=>fc(A,B,g))}function h(){let A=i.trim();A.length!==0&&(i="",l(x=>x.hidden_prefixes.includes(A)?{hidden_prefixes:x.hidden_prefixes}:{hidden_prefixes:[...x.hidden_prefixes,A]}),C())}function _(A){l(x=>({hidden_prefixes:x.hidden_prefixes.filter(g=>g!==A)}))}function w(A){let x=r.get();if(!x)return;let g=x.chips[A]===!1;l(()=>({chips:{[A]:g}}))}function $(A){let x=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${x.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${x.map(g=>{let B=ai(g,A);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${B}`}
                  data-label=${g}
                  data-state=${B}
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
                  @click=${()=>_(x)}
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
          <button type="button" @click=${h}>추가</button>
        </div>
      </section>
    `}function T(A){return d`
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
    `}function C(){let A=r.get();me(d`
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
            ${A?d`${$(A)} ${v(A)}
                ${T(A)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let L=!1,M=()=>{L=!1};o.addEventListener("close",M),o.addEventListener("cancel",M);let q=null;r.subscribe&&(q=r.subscribe(()=>{L&&C()}));function P(){L||(i="",L=!0,C(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){L&&(L=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:P,close:E,destroy(){L=!1,o.removeEventListener("close",M),o.removeEventListener("cancel",M),q&&(q(),q=null),o.remove()}}}function ci(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,h,_="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=h||"An unrecoverable error occurred.");let w=typeof _=="string"?_.trim():"";if(s&&(w.length>0?(s.textContent=w,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Or(t){let e=At(t.created_at),r=At(t.updated_at);return!e&&!r?"":d`<div class="worker-mini__meta">
    ${e?d`<span title=${`\uC0DD\uC131 ${dt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}${e&&r?d`<span>·</span>`:""}${r?d`<span title=${`\uC218\uC815 ${dt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function ss(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Dt(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait"||!!t.revise_action,i=e?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",l=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,a=d`<span class="worker-mini__title">${t.title}</span>`,c=t.pr_url&&t.pr_number?d`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",h=r.map(q=>q===t.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${q}</span
        >`:d`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${q}</span
        >`),_=t.reason?d`<span class="worker-mini__reason">${t.reason}</span>`:"",w=n?d`<span class="worker-usage" title=${ur(t.usage)}
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
      </button>`:"",T=t.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${t.id}
        ?disabled=${t.cancel_enabled===!1}
        title=${t.cancel_title||""}
      >
        취소
      </button>`:"",C=t.discard_action?d`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",L=t.revise_action?d`<button
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
        </button>`:"",M=!!(n||s||t.merge_action||t.cancel_action||t.discard_action||t.revise_action);return d`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${t.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${o?d`<div class="worker-mini__head">
            ${i}${l}${c}${h}${_}
          </div>
          <div class="worker-mini__body">${a}</div>
          ${M?d`<div class="worker-mini__foot">
                ${w}${$}
                <span class="worker-mini__actions"
                  >${v}${T}${C}${L}</span
                >
              </div>`:""}
          ${Or(t)}`:d`<div class="worker-mini__line">
            ${i}${l}${a}${c}${h}${_}${w}${$}${v}${T}${C}
          </div>
          ${Or(t)}`}
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
    ${r?Kr(r,t.status):""}
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
    ${Or(t)}
  </div>`}function Nt(t){let e=!!t.collapsible&&!!t.collapsed,r=d`<span
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
  </div>`}function wc(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?is(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Dt(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.base_exception||null,c=t.attempt_id&&t.attempt_id===r;return d`<div
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
          ${i?d`<span class="worker-usage" title=${ur(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    ${Or(t)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function as(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>wc(s,e,r))}
  </div>`}var kc=6e4;function yc(t,e){if(typeof t!="number"||!Number.isFinite(t))return"";let n=e-t<kc,s=`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${dt(t)}`;return d`<span
    class="mon-row__beat${n?" mon-row__beat--live":""}"
    title=${s}
    ><span class="mon-row__beat-dot" aria-hidden="true"></span>${n?"":d`<span class="mon-row__beat-age"
          >${At(t,e)}</span
        >`}</span
  >`}function vc(t,e){let r=Dt(t.usage),n=t.has_attempt===!0,s=n&&typeof t.started_at=="number"?is(e-t.started_at):"",o=n?"":At(t.updated_at,e);return d`<div class="mon-row" data-issue-id=${t.id} role="listitem">
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
            title=${`\uC218\uC815 ${dt(t.updated_at)}`}
            >마지막 갱신 ${o}</span
          >`:""}
      ${r?d`<span class="worker-usage" title=${ur(t.usage)}
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
  </section>`}var ls="tab:monitor:in-progress";function $c(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function fi(t,e){let r=Ce("views:monitor"),n=e.gotoIssue,s=e.issueStores,o=e.queueStore,i=e.now||(()=>Date.now()),l=null,a=null;function c(){return(s&&s.snapshotFor?s.snapshotFor(ls)||[]:[]).slice().sort((T,C)=>(Lt(C&&C.updated_at)??0)-(Lt(T&&T.updated_at)??0))}function h(){let v=new Map,T=o&&o.get?o.get():null,C=T&&T.attempts||{};for(let L of Object.values(C)){if(!L||L.status!=="running")continue;let M=L.bead_id;typeof M!="string"||M.length===0||v.set(M,{started_at:typeof L.started_at=="number"?L.started_at:null,last_event_at:typeof L.last_event_at=="number"?L.last_event_at:null,usage:Ot(C,M)})}return v}function _(){let v=c(),T=new Map;for(let L of v){let M=$c(L);if(!M)continue;let q=T.get(M);q?q.push(L):T.set(M,[L])}let C=h();return v.map(L=>{let M=C.get(L.id)||null,q=ir(T.get(L.id)||[]);return{id:L.id,title:L.title||L.id,current_child:q?q.title||q.id:null,started_at:M?M.started_at:null,last_event_at:M?M.last_event_at:null,updated_at:L.updated_at,usage:M?M.usage:null,has_attempt:!!M}})}function w(){me(pi(_(),i()),t)}function $(v){let T=v.target,C=T&&T.closest?T.closest(".mon-row"):null;if(!C)return;let L=C.getAttribute("data-issue-id");L&&(v.preventDefault(),n(L))}return t.addEventListener("click",$),s&&typeof s.subscribe=="function"&&(l=s.subscribe(()=>{try{w()}catch{}})),o&&typeof o.subscribe=="function"&&(a=o.subscribe(()=>{try{w()}catch{}})),{load(){r("load"),w()},clear(){l&&(l(),l=null),a&&(a(),a=null),t.removeEventListener("click",$),t.replaceChildren()}}}function hi(t,e,r){let n=Ce("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let a=e.getState(),c=a.view==="worker"||a.view==="monitor"?a.view:"board";return d`
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
    `}function l(){me(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),me(d``,t)}}}var _i=["bug","feature","task","epic","chore"];function gi(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var mi=["Critical","High","Medium","Low","Backlog"];function bi(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),h=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),w=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let A of _i){let x=document.createElement("option");x.value=A,x.textContent=gi(A),o.appendChild(x)}i.replaceChildren();for(let A=0;A<=4;A+=1){let x=document.createElement("option");x.value=String(A);let g=mi[A]||"Medium";x.textContent=`${A} \u2013 ${g}`,i.appendChild(x)}}$();function v(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function T(E){s.disabled=E,o.disabled=E,i.disabled=E,l.disabled=E,a.disabled=E,h.disabled=E,_.disabled=E,_.textContent=E?"Creating\u2026":"Create"}function C(){c.textContent=""}function L(E){c.textContent=E}function M(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?i.value=A:i.value="2"}catch{o.value="",i.value="2"}}function q(){let E=o.value||"",A=i.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function P(){C();let E=String(s.value||"").trim();if(E.length===0){L("Title is required"),s.focus();return}let A=Number(i.value||"2");if(!(A>=0&&A<=4)){L("Priority must be 0..4"),i.focus();return}let x=String(o.value||""),g=String(a.value||""),B={title:E};x.length>0&&(B.type=x),String(A).length>0&&(B.priority=A),g.length>0&&(B.description=g),T(!0);try{await e("create-issue",B)}catch{T(!1),L("Failed to create issue");return}q(),T(!1),v()}return r.addEventListener("cancel",E=>{E.preventDefault(),v()}),w.addEventListener("click",()=>v()),h.addEventListener("click",()=>v()),r.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),P())}),n.addEventListener("submit",E=>{E.preventDefault(),P()}),{open(){n.reset(),C(),M();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){v()}}}function wi(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function ki(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var xc={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},yi=160;function Sc(t){return t.length>yi?`${t.slice(0,yi)}\u2026`:t}var Tc=[{key:"orchestration_model",values:()=>Ln},{key:"orchestration_effort",values:()=>Dn},{key:"review_model",values:()=>On},{key:"impl_model",values:()=>Mn}];function vi(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let g=i();return typeof g.revision=="number"?g.revision:0}function a(){let g=i().exec_defaults;return g&&typeof g=="object"?g:{}}function c(g){g&&g.queue&&r&&r.set(g.queue)}async function h(g,B){if(!n)return;let z={key:g,value:B||null};try{let Y=await n("worker-queue-set-exec-default",{...z,expected_revision:l()});c(Y),Y&&Y.conflict&&(Y=await n("worker-queue-set-exec-default",{...z,expected_revision:l()}),c(Y)),Y&&Y.conflict&&J("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function _(g,B,z){let Y=!!z&&!B.includes(z);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${g}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${g}`}
        data-key=${g}
        @change=${ne=>{h(g,ne.target.value)}}
      >
        <option value="" ?selected=${!z}>
          ${Nn[g]||"(\uAE30\uBCF8)"}
        </option>
        ${Y?d`<option value=${z} ?selected=${!0}>
              ${z} (비호환)
            </option>`:""}
        ${B.map(ne=>d`<option value=${ne} ?selected=${z===ne}>${ne}</option>`)}
      </select>
    </div>`}function w(){let g=i().workspace_info;return g&&typeof g=="object"?g:{}}function $(g,B){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${g}"
      >${B}</span
    >`}function v(g){let B=g?ki(g.cmd):"",z=g?wi(g.timeout_ms):"",Y=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${B?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${B}</span>
            ${$("config","config")}
            ${z?d`<span class="exec-defaults__vd-meta"
                  >timeout ${z}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${Y}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function T(g){let B=g?ki(g.cmd):"",z=g?wi(g.timeout_ms):"",Y=z?`timeout ${z} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",ne=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${B?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${B}</span>
            ${$("config","config")}
            ${g.detached===!0?$("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${Y}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${ne}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function C(g){if(!g||typeof g!="object")return"";let B=xc[String(g.outcome)];if(!B)return"";let z=g.outcome==="failed"&&g.reason?`${B.label} \xB7 ${g.reason}`:B.label,Y=[dt(g.at),typeof g.bead_id=="string"?g.bead_id:"",typeof g.base_sha=="string"?g.base_sha.slice(0,7):""].filter(ue=>ue.length>0).join(" \xB7 "),ne=typeof g.detail=="string"&&g.detail.length>0?Sc(g.detail):"",ye=typeof g.log_path=="string"&&g.log_path.length>0?g.log_path:"";return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${$(B.modifier,z)}
        ${Y?d`<span class="exec-defaults__vd-meta">${Y}</span>`:""}
      </div>
      ${ne?d`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${ne}</code>
          </div>`:""}
      ${ye?d`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${ye}</code>
          </div>`:""}
    </div>`}function L(g){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${v(g.verify_cmd)} ${T(g.deploy_cmd)}
      ${C(g.last_deploy)}
    </section>`}function M(){let g=a();me(d`
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
            ${Tc.map(B=>_(B.key,B.values(),g[B.key]||""))}
            ${L(w())}
          </div>
        </div>
      `,o)}let q=!1,P=()=>{q=!1};o.addEventListener("close",P),o.addEventListener("cancel",P);let E=null;r&&r.subscribe&&(E=r.subscribe(()=>{q&&M()}));function A(){q||(q=!0,M(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function x(){q&&(q=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:A,close:x,destroy(){q=!1,o.removeEventListener("close",P),o.removeEventListener("cancel",P),E&&(E(),E=null),o.remove()}}}var Ac="tab:worker:ready",Ec="tab:worker:blocked",Cc="tab:worker:in-progress",dn=1;function us(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Ti="beads-ui.worker.candidate-filter",cs={show_blocked:!1,spec:"all"};function Rc(){try{let t=window.localStorage.getItem(Ti);if(!t)return{...cs};let e=JSON.parse(t);if(!e||typeof e!="object")return{...cs};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...cs}}}function Ic(t){try{window.localStorage.setItem(Ti,JSON.stringify(t))}catch{}}function Lc(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Dc=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ai="bdui.worker.candidate_sort",Oc=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],un="spec";function Mc(){try{let t=window.localStorage.getItem(Ai);return t==="board"||t==="created"||t==="spec"?t:un}catch{return un}}function Nc(t){try{window.localStorage.setItem(Ai,t)}catch{}}var Ei="bdui.worker.done-range";function Pc(){try{let t=window.localStorage.getItem(Ei);return tr(t)?t:It}catch{return It}}function Fc(t){try{window.localStorage.setItem(Ei,t)}catch{}}var qc="(max-width: 640px)",Ci="beads-ui.worker.lane-collapsed",Mr={queue:!0,done:!0};function Bc(){try{let t=window.localStorage.getItem(Ci);if(!t)return{...Mr};let e=JSON.parse(t);return!e||typeof e!="object"?{...Mr}:{queue:typeof e.queue=="boolean"?e.queue:Mr.queue,done:typeof e.done=="boolean"?e.done:Mr.done}}catch{return{...Mr}}}function Uc(t){try{window.localStorage.setItem(Ci,JSON.stringify(t))}catch{}}function $i(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function zc(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(Wt):(n.sort(Wr(r)),e==="board"?n:[...n.filter(us),...n.filter(s=>!us(s))])}function Hc(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Wc(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Gc(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var jc=["closed_unmerged","undecidable"],Yc=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Vc(t,e){for(let r of Yc)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var ds=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function Kc(t){if(typeof t!="string"||t.length===0)return null;let e=ds.length,r=ds.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:ds[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function xi(t){switch(t){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return t}}function Si(t,e){return typeof t!="string"||t.length===0||typeof e!="string"||e.length===0||e===t?null:`\u2192 ${e}`}function Zc(t,e,r,n,s=null,o=null,i=null,l=!1,a=null,c=!0,h=null,_=null){let w=!!a&&a.position>0,$=!!a&&a.active===!0,v=a&&a.failure||null,T=r[t]||null,C=T&&T.gate?T.gate:null,L=T&&T.pr?T.pr:null,M=[];l&&M.push("\uC138\uC158");let q=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,P=Vc(l&&C&&C.tier==="closed_unmerged"?"\uB2EB\uD798":C&&C.gate_badge||"",q?null:o&&o.activity||null);q&&M.push(q),P.label&&M.push(P.label),C&&C.base_badge&&C.base_badge!==C.gate_badge&&M.push(C.base_badge),_&&M.push(_),n&&M.push("\uC815\uB9AC \uC2E4\uD328"),w&&!$&&M.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),v&&M.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${xi(v)}`),h&&M.push(`\uC790\uB3D9 \uC81C\uC678: ${xi(h)}`);let E=!!C&&C.base_badge==="\uCDA9\uB3CC",A=!!C&&C.enabled===!0,x=Kc(o&&o.merge_progress?o.merge_progress.step:null),g=!!n&&!!C&&C.tier==="merged",B=l&&!!C&&C.tier==="merged",z=l&&E&&c===!1;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:L&&typeof L.number=="number"?L.number:null,pr_url:L&&typeof L.url=="string"?L.url:"",badges:M,live_badge:i==="running"?q:q?null:P.live?P.label:null,usage:s,alert:!!C&&jc.includes(C.tier)||!!n||!!v,merge_action:!w,cancel_action:w,cancel_enabled:!$,cancel_title:$?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(C&&C.tier==="merged"),merge_step:x,discard_enabled:!x&&!i&&!w,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":w?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!x&&!i&&!z&&(A||E||g||B),merge_label:B?"\uC815\uB9AC":E&&!x&&!g?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:x?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${x.label}`:B?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":z?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":g?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":E?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":A?`\uBA38\uC9C0 (${C.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:C&&C.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${C&&C.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ps(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?jr(n,i):null,h=Yr({transport:r,uiOrderStore:i}),_=null,w=[],$=Rc(),v=Mc(),T=Pc();function C(){let u=kr.find(b=>b.value===T);return u?u.label:"\uC624\uB298"}let L=Bc(),M=!1,q=new Set,P=new Set,E=[],A=document.createElement("div");A.className="worker-console";let x=document.createElement("div");x.className="worker-top";let g=document.createElement("div");g.className="worker-drawer-overlay",g.hidden=!0;let B=document.createElement("div");B.className="worker-drawer-overlay__backdrop";let z=document.createElement("div");z.className="worker-drawer-host",g.append(B,z);let Y=document.createElement("div");Y.className="worker-lanes-host",A.append(x,g,Y),t.appendChild(A);let ne=null,ye=Zr(z,{transport:r,sessionLogStore:o,onClose:()=>{ne=null,g.hidden=!0,de()}}),ue=vi(A,{queueStore:s,transport:r,getWorkspacePath:a});function he(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:dn,queue:[],pr_wait:[],done:[]}}function pe(){let u=he();return typeof u.revision=="number"?u.revision:0}function ee(u){u&&u.queue&&s&&s.set(u.queue)}function Ae(){let u=he().queue;return Array.isArray(u)?u.length:0}async function ut(u,b){if(!r)return;let R=await r("worker-queue-place",{bead_id:u,index:b,expected_revision:pe()});ee(R),R&&R.conflict&&await r("worker-queue-place",{bead_id:u,index:b,expected_revision:pe()}).then(ee)}async function ot(u,b){if(!r)return;let R=await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:pe()});ee(R),R&&R.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:pe()}).then(ee)}async function we(u){if(!r)return;let b=await r("worker-queue-remove",{bead_id:u,expected_revision:pe()});ee(b),b&&b.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:pe()}).then(ee)}async function Le(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function ve(u){if(!r||!u)return;let b=await r("worker-attempt-pause",{attempt_id:u});b&&b.paused===!1&&b.reason&&J(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function Qe(u){if(!r||!u)return;let b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:pe()});ee(b),b&&b.conflict&&(b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:pe()}),ee(b)),b&&b.resumed===!1&&!b.conflict&&b.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function _e(u){if(!r||!u)return;let b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:pe()});ee(b),b&&b.conflict&&(b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:pe()}),ee(b)),b&&b.dismissed===!1&&!b.conflict&&b.reason&&J(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function We(u,b){if(!r)return null;let R=r,se=await R(u,{...b,expected_revision:pe()});return ee(se),se&&se.conflict&&(se=await R(u,{...b,expected_revision:pe()}),ee(se)),se}async function ht(u){if(!r||!u)return;q.add(u),de();let b;try{b=await We("worker-merge-queue-add",{bead_id:u})}finally{q.delete(u),de()}!b||b.conflict||b.applied||J("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Ye(u){if(!r)return;let b=await We("worker-merge-auto-toggle",{on:u});!b||b.conflict||J(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function _t(u){if(!r||!u)return;let b=await We("worker-merge-queue-remove",{bead_id:u});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&J("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Be(){await We("worker-merge-queue-remove",{all:!0})}async function it(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let R=await r("worker-pr-discard",{bead_id:u,expected_revision:pe()});if(ee(R),R&&R.conflict&&(R=await r("worker-pr-discard",{bead_id:u,expected_revision:pe()}),ee(R)),R&&R.discarded===!0){J("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}R&&R.discarded===!1&&!R.conflict&&J(`\uD3D0\uAE30 \uAC70\uBD80: ${R.reason||""}`,"error",2800)}async function pt(u,b){if(!r||!b||P.has(b))return;P.add(b),de();let R;try{R=await r(u,{bead_id:b,expected_revision:pe()}),ee(R),R&&R.conflict&&(R=await r(u,{bead_id:b,expected_revision:pe()}),ee(R))}finally{P.delete(b),de()}if(!(!R||R.conflict)){if(R.ok){J(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}J(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function Ge(u){if(!r)return;let b=await r("worker-queue-toggle",{on:u,expected_revision:pe()});ee(b),b&&b.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:pe()}).then(ee)}async function De(u){await Ge(u),await Ye(u)}async function Re(u){if(!r||!Number.isFinite(u))return;let b=Math.max(dn,Math.floor(u)),R=await r("worker-queue-set-slots",{slots:b,expected_revision:pe()});ee(R),R&&R.conflict&&await r("worker-queue-set-slots",{slots:b,expected_revision:pe()}).then(ee)}function Ke(){let u=he(),b=c?c.selectBoardColumn(Ac,"ready"):[],R=c?c.selectBoardColumn(Ec,"blocked"):[],se=c?c.selectBoardColumn(Cc,"in_progress"):[],V=new Map;for(let y of se){let F=Wc(y);if(!F)continue;let Q=V.get(F);Q?Q.push(y):V.set(F,[y])}let re=y=>{let F=ir(V.get(y)||[]);return F?F.title||F.id:null},ke=u.bead_titles||{},Te=new Map;for(let[y,F]of Object.entries(ke))typeof F=="string"&&F.length>0&&Te.set(y,F);for(let y of[...b,...R])Te.set(y.id,y.title||y.id);let ze=u.bead_times||{},et=new Map;for(let[y,F]of Object.entries(ze))F&&typeof F=="object"&&et.set(y,F);for(let y of[...b,...R])et.set(y.id,{created_at:y.created_at,updated_at:y.updated_at});let bt=y=>et.get(y)||{},wt=u.pr_wait||[],St=u.pr_observations||{},Pe=u.pr_activity||{},Ve=u.cleanup_failed||{},oe=Object.entries(Ve).map(([y,F])=>({bead_id:y,step:F&&F.step?F.step:"",reason:F&&F.reason?F.reason:"",detail:F&&typeof F.detail=="string"?F.detail:null,output_tail:F&&typeof F.output_tail=="string"&&F.output_tail?F.output_tail:void 0,log_path:F&&typeof F.log_path=="string"&&F.log_path?F.log_path:void 0})),p=u.ship_failure||null,m=p&&typeof p.reason=="string"&&p.reason?{bead_id:typeof p.bead_id=="string"?p.bead_id:"",reason:p.reason,detail:typeof p.detail=="string"?p.detail:null,pr_url:typeof p.pr_url=="string"?p.pr_url:null}:null,H=u.queue||[],U=new Set([...H.map(y=>y.bead_id),...wt.map(y=>y.bead_id),...u.done.map(y=>y.bead_id)]),ie=new Set(R.map(y=>y.id)),Ee=i?i.get()?.order||{}:{},Ft=new Set,pr=[];for(let y of[...b,...R])U.has(y.id)||Ft.has(y.id)||Hc(y)||(Ft.add(y.id),pr.push(y));w=zc(pr,v,Ee);let pn=u.admission||{},G=y=>{let F=pn[y];if(!F)return"";if(F.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let Q=typeof F.reason=="string"?F.reason:"",$e=Q.indexOf(":");return $e>0&&$e<Q.length-1?`\u26D4 ${Q.slice(0,$e)} (${Q.slice($e+1)})`:`\u26D4 ${Q}`},f=w.map(y=>{let F=us(y),Q=ie.has(y.id),$e=[];Q&&$e.push(Gc(y)),F||$e.push("spec \uC5C6\uC74C");let qr=G(y.id);return qr&&$e.push(qr),{id:y.id,title:y.title||y.id,reason:$e.join(" \xB7 "),draggable:F,lane:"candidate",created_at:y.created_at,updated_at:y.updated_at,workflow:y.workflow,status:y.status,blocked:Q,has_spec:F}}),O=Lc(f,$),W=O.visible,Se=u.revise_parked||{},He=(y,F)=>y.map(Q=>{let $e=F==="queue"?Se[Q.bead_id]:null;return{id:Q.bead_id,title:Te.get(Q.bead_id)||Q.bead_id,reason:F==="done"?"":G(Q.bead_id),draggable:F!=="done",done:F==="done",lane:F,badges:$e?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!$e,revise_action:!!$e,revise_enabled:!!$e&&!P.has(Q.bead_id),revise_title:$e?$e.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${$e.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:F==="done"?Ot(u.attempts||{},Q.bead_id):null,...bt(Q.bead_id)}}),Ie=new Map;for(let y of u.done)y&&typeof y.bead_id=="string"&&typeof y.added_at=="number"&&Ie.set(y.bead_id,y.added_at);let Fe=u.attempts?Object.values(u.attempts):[],ft=new Set;for(let y of Fe)y&&typeof y.resumed_from=="string"&&y.resumed_from.length>0&&ft.add(y.resumed_from);let Tt=new Map;for(let y of Fe)Tt.set(y.bead_id,y.attempt_id);let Xt=new Map;for(let y of Fe)Xt.set(y.attempt_id,y);function qe(y){let F=new Set,Q=y;for(;Q&&!F.has(Q.attempt_id);){if(Q.conflict_resolution===!0)return!0;F.add(Q.attempt_id),Q=typeof Q.resumed_from=="string"&&Q.resumed_from.length>0&&Xt.get(Q.resumed_from)||null}return!1}let Qt=typeof u.declared_base=="string"?u.declared_base:null;function Nr(y){let F=null;for(let Q of Fe)!Q||Q.bead_id!==y||qe(Q)||(F===null||(typeof Q.started_at=="number"?Q.started_at:0)>=(typeof F.started_at=="number"?F.started_at:0))&&(F=Q);return F&&typeof F.target_base=="string"?F.target_base:null}let fr=[],xt=null;for(let y of Fe){let F=y.status==="paused"&&!ft.has(y.attempt_id);if(y.status==="running"||F)fr.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:Te.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,paused:F,conflict_resolution:qe(y),base_exception:Si(Qt,y.target_base),can_pause:typeof y.session_id=="string"&&y.session_id.length>0,usage:Ot(u.attempts||{},y.bead_id),current_child:re(y.bead_id),...bt(y.bead_id)});else if(y.status==="failed"||y.status==="orphaned"){let Q=Tt.get(y.bead_id)!==y.attempt_id,$e=Ie.get(y.bead_id),qr=typeof $e=="number"&&$e>0&&typeof y.finished_at=="number"&&$e>=y.finished_at;!Q&&!qr&&typeof y.dismissed_at!="number"&&(xt=y)}}let gs=null;if(xt){let y=typeof xt.session_id=="string"&&xt.session_id.length>0,F=ft.has(xt.attempt_id),Q=xt.cause_detail;gs={repo:xt.repo||"",reason:xt.cause||xt.status,cause_detail:Q&&typeof Q.reason=="string"?{reason:Q.reason,command:typeof Q.command=="string"?Q.command:null}:null,resume_attempt_id:xt.attempt_id,resume_eligible:y&&!F,resume_reason:y?F?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Bi=new Set(fr.map(y=>y.bead_id)),fn=Array.isArray(u.merge_queue)?u.merge_queue:[],ms=new Map;fn.forEach((y,F)=>{y&&typeof y.bead_id=="string"&&ms.set(y.bead_id,F+1)});let bs=u.merge_queue_state||{active:null,failures:{}},Ui=bs.failures||{},zi=u.auto_merge_skips||{},ws=y=>{let F=zi[y];if(!F)return null;let Q=St[y],$e=Q&&Q.pr?Q.pr.head_sha:null;return $e&&$e===F.head_sha?F.reason||"":null},Pr=new Map;for(let y of fr)y.conflict_resolution&&(y.paused?Pr.has(y.bead_id)||Pr.set(y.bead_id,"paused"):Pr.set(y.bead_id,"running"));let ks=fr.filter(y=>!y.paused).length,ys=(u.workspace_info||{}).slots,vs=typeof ys=="number"?ys:typeof u.slots=="number"?u.slots:dn,Hi=ks>vs,$s=Ur(T),Wi=(Array.isArray(u.done)?u.done.slice():[]).filter(y=>$s===void 0||typeof y.added_at!="number"||y.added_at>=$s).sort((y,F)=>(F.added_at||0)-(y.added_at||0)),xs=He(Wi,"done"),Fr={};for(let y of cr)Fr[y]=0;let Ss=!1,Ts=0,hn=0,As=0;for(let y of xs){let F=y.usage;if(F&&typeof F=="object"){let Q=!1;for(let $e of cr)Number.isFinite(F[$e])&&(Fr[$e]+=F[$e],Ss=!0,Q=!0);Q&&(hn+=1,Number.isFinite(F.total_cost_usd)&&(Ts+=F.total_cost_usd,As+=1))}}hn>0&&As===hn&&(Fr.total_cost_usd=Ts);let Gi=Ss?Dt(Fr):null;return{queue:u,idToTitle:Te,candidates:W,candidate_hidden:{blocked:O.hidden_blocked,spec:O.hidden_spec},running:fr,live_count:ks,slots:vs,over_cap:Hi,failure:gs,waiting:He(H.filter(y=>!Bi.has(y.bead_id)),"queue"),pr_wait:wt.map(y=>Zc(y.bead_id,Te.get(y.bead_id)||y.bead_id,St,Ve[y.bead_id]||null,Ot(u.attempts||{},y.bead_id),Pe[y.bead_id]||(q.has(y.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Pr.get(y.bead_id)||null,y.external===!0,{position:ms.get(y.bead_id)||0,active:bs.active===y.bead_id,failure:Ui[y.bead_id]||null},y.wt_present!==!1,u.auto_merge===!0?ws(y.bead_id):null,Si(Qt,Nr(y.bead_id)))).map(y=>({...y,...bt(y.id)})),merge_queue_length:fn.length,merge_queue_running:fn.length>0,auto_excluded:wt.map(y=>y.bead_id).filter(y=>ws(y)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:Qt,done:xs,token_total:Gi,cleanup_failures:oe,ship_failure:m}}function je(u){let b=u.waiting.length>0?u.waiting[0].id:"\u2014",R=d`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,se=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,V=d`<button
      type="button"
      class="worker-auto-all${se?" is-active":""}"
      title=${se?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${se?"true":"false"}
    >
      ${se?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,re=u.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ke=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${C()} 완료 <b>${u.done.length}</b></span
      >`,Te=d`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,ze=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${dn}
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
      </button>`,et=ui({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return M?d`<div class="worker-ribbon">
          ${R}
          <div class="worker-kpi worker-kpi--ribbon">${re}${ke}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${V}${ze}</div>
          <div class="worker-kpi">${Te}</div>
        </div>
        ${et}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${R}${V}${ze}</div>
        <div class="worker-kpi">
          ${re}${ke}${Te}
          ${u.token_total?d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${C()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${C()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${b}</b></span
          >
        </div>
      </div>
      ${et}`}function Ze(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let b=u.running.some(R=>!R.paused);return d`<section
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
        ${Xe(u)}
      </header>
      ${u.running.length>0?as(u.running,Date.now(),ne):""}
      ${u.pr_wait.map(R=>ss(R))}
    </section>`}function gt(u){let b=u.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Dc.map(R=>d`<button
              type="button"
              class="worker-filter__chip${$.spec===R.value?" is-active":""}"
              data-spec=${R.value}
              aria-pressed=${$.spec===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${b.spec>0?d`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function at(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${Oc.map(u=>d`<option value=${u.value} ?selected=${v===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function lt(){return d`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${T}
      >
        ${kr.map(u=>d`<option value=${u.value} ?selected=${T===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function Xe(u){let b=u.queue.auto_merge===!0;if(u.merge_queue_running)return d`<button
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
      </button>`;let R=new Set(u.auto_excluded),se=u.pr_wait.filter(V=>V.merge_action&&V.merge_enabled&&!R.has(V.id)).length;return d`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${se>0?` ${se}`:""}
    </button>`}function Oe(u){let b=Nt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:at(),controls:gt(u)});return M?d`<div class="worker-lanes worker-lanes--mobile">
        ${Ze(u)}
        ${Nt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:L.queue,preview:$i(u.waiting)})}
        ${b}
        ${Nt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${C()} \uC644\uB8CC \uC5C6\uC74C`,controls:lt(),collapsible:!0,collapsed:L.done,preview:u.token_total||$i(u.done)})}
      </div>`:d`<div class="worker-lanes">
      ${b}
      ${Nt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Nt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(R=>!R.paused),body:as(u.running,Date.now(),ne)})}
      ${Nt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:Xe(u)})}
      ${Nt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${C()} ${u.done.length}`,items:u.done,empty:`${C()} \uC644\uB8CC \uC5C6\uC74C`,controls:lt()})}
    </div>`}function Je(u){L={...L,[u]:!L[u]},Uc(L),de()}function de(){let u=Ke();me(je(u),x),me(Oe(u),Y)}function Ue(){let u=document.querySelector(".app-header");if(!u)return;let b=()=>{let R=Math.round(u.getBoundingClientRect().height);A.style.setProperty("--worker-ribbon-top",`${R}px`)};if(b(),typeof ResizeObserver=="function"){let R=new ResizeObserver(b);R.observe(u),E.push(()=>R.disconnect())}else window.addEventListener("resize",b),E.push(()=>window.removeEventListener("resize",b))}function I(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(qc);M=!!u.matches;let b=R=>{let se=!!(R&&typeof R.matches=="boolean"?R.matches:u.matches);se!==M&&(M=se,de())};typeof u.addEventListener=="function"?(u.addEventListener("change",b),E.push(()=>u.removeEventListener("change",b))):typeof u.addListener=="function"&&(u.addListener(b),E.push(()=>u.removeListener(b)))}function N(u){let b=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!b)return;let R=b.dataset.beadId||"",se=b.dataset.lane||"";_={bead_id:R,from_lane:se};try{u.dataTransfer?.setData("text/plain",R),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function K(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;let R=b.dataset.lane||"";R!=="candidate"&&R!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),b.classList.add("worker-pane--drag-over"))}function j(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Z(u,b){let R=w.find(ke=>ke.id===u);if(!R)return;let se=w.filter(ke=>ke.id!==u),V=se.length;if(b){let ke=b.dataset.beadId;if(ke===u)return;let Te=se.findIndex(ze=>ze.id===ke);Te>=0&&(V=Te)}let re=se.slice();re.splice(V,0,R),h.applyReorder(u,re,V)}function le(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;u.preventDefault(),b.classList.remove("worker-pane--drag-over");let R=b.dataset.lane||"",se=_?.bead_id||u.dataTransfer?.getData("text/plain")||"",V=_?.from_lane||"";if(_=null,!se)return;let re=u.target?.closest?.(".worker-mini, .worker-card"),ke=Array.from(b.querySelectorAll(".worker-mini, .worker-card")),Te=ke.length;if(re){let ze=ke.indexOf(re);ze>=0&&(Te=ze)}if(b.classList.contains("worker-pane--collapsed")&&(Te=Ae()),R==="candidate"){if(V==="candidate"){Z(se,re);return}V==="queue"&&we(se);return}R==="queue"&&(V==="queue"?ot(se,Te):ut(se,Te))}function ce(u){$=u,Ic(u),de()}function ge(u){v=u==="board"||u==="created"||u==="spec"?u:un,Nc(v),de()}function te(u){T=tr(u)?u:It,Fc(T),de()}function k(u){let b=u.target?.closest?.(".worker-filter__blocked");if(b){ce({...$,show_blocked:b.checked});return}let R=u.target?.closest?.(".worker-done-range");if(R){te(R.value);return}let se=u.target?.closest?.(".worker-sort");if(se){ge(se.value||un);return}let V=u.target?.closest?.(".worker-slots__input");if(!V)return;let re=Number.parseInt(V.value,10);if(!Number.isFinite(re)){de();return}Re(re).then(de)}function D(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function S(u){let b=he(),R=b.attempts?b.attempts[u]:null;ne=u,g.hidden=!1,ye.open({attempt_id:u,meta:D(R)}),de()}function X(){if(!ne)return;let u=he(),b=u.attempts?u.attempts[ne]:null;if(b){ye.updateMeta(D(b));return}ye.close()}function Ne(u){let b=u.target;if(b?.closest?.("#worker-exec-defaults-dialog"))return;if(b?.closest?.(".worker-exec-defaults-btn")){ue.open();return}let R=b?.closest?.(".worker-banner__resume");if(R){let oe=R.dataset.attemptId;oe&&Qe(oe);return}let se=b?.closest?.(".worker-banner__dismiss");if(se){let oe=se.dataset.attemptId;oe&&_e(oe);return}if(b?.closest?.(".worker-play")){Ge(!he().auto_advance);return}if(b?.closest?.(".worker-auto-all")){let oe=he();De(!(oe.auto_advance===!0&&oe.auto_merge===!0));return}let V=b?.closest?.(".worker-merge-all");if(V){V.classList.contains("worker-merge-all--stop")?he().auto_merge===!0?Ye(!1):Be():Ye(!0);return}let re=b?.closest?.(".worker-pane__hd--toggle");if(re){let oe=re.dataset.lane;(oe==="queue"||oe==="done")&&Je(oe);return}let ke=b?.closest?.(".worker-card__place");if(ke){let oe=ke.dataset.beadId;oe&&!ke.disabled&&ut(oe,Ae());return}let Te=b?.closest?.(".worker-filter__chip");if(Te){let oe=Te.dataset.spec;(oe==="all"||oe==="with"||oe==="without")&&ce({...$,spec:oe});return}let ze=b?.closest?.(".worker-mini__merge");if(ze){ht(ze.dataset.beadId||"");return}let et=b?.closest?.(".worker-mini__merge-cancel");if(et){_t(et.dataset.beadId||"");return}let bt=b?.closest?.(".worker-mini__discard");if(bt){it(bt.dataset.beadId||"");return}let wt=b?.closest?.(".worker-mini__revise-fix");if(wt){pt("worker-revise-fix",wt.dataset.beadId||"");return}let St=b?.closest?.(".worker-mini__revise-approve");if(St){pt("worker-revise-approve",St.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;if(b?.closest?.(".rtile__stop")){let p=b?.closest?.(".rtile")?.dataset?.attemptId;p&&Le(p);return}if(b?.closest?.(".rtile__pause")){let p=b?.closest?.(".rtile")?.dataset?.attemptId;p&&ve(p);return}if(b?.closest?.(".rtile__resume")){let p=b?.closest?.(".rtile")?.dataset?.attemptId;p&&Qe(p);return}if(b?.closest?.(".rtile__session")){let p=b?.closest?.(".rtile")?.dataset?.attemptId;p&&S(p);return}if(b?.closest?.(".worker-drawer-overlay__backdrop")){ye.close();return}if(b?.closest?.(".worker-drawer-host"))return;let Pe=b?.closest?.(".rtile");if(Pe){if(b?.closest?.(".rtile__id")){let p=Pe.dataset.beadId;p&&Yt(p).then(m=>{m?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let oe=Pe.dataset.beadId;oe&&l&&l(oe);return}let Ve=b?.closest?.(".worker-mini, .worker-card");if(Ve){let oe=Ve.dataset.beadId;if(b?.closest?.(".worker-mini__id, .worker-card__id")){oe&&Yt(oe).then(p=>{p?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}oe&&l&&l(oe)}}return t.addEventListener("dragstart",N),t.addEventListener("dragover",K),t.addEventListener("dragleave",j),t.addEventListener("drop",le),t.addEventListener("click",Ne),t.addEventListener("change",k),I(),Ue(),c&&E.push(c.subscribe(de)),s&&E.push(s.subscribe(()=>{de(),X()})),de(),{load(){de()},destroy(){for(let u of E.splice(0))try{u()}catch{}t.removeEventListener("dragstart",N),t.removeEventListener("dragover",K),t.removeEventListener("dragleave",j),t.removeEventListener("drop",le),t.removeEventListener("click",Ne),t.removeEventListener("change",k);try{ye.destroy()}catch{}g.hidden=!0;try{ue.destroy()}catch{}me(d``,t)}}}function fs(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Ri(t,e,r,n=async()=>{},s=async()=>{}){let o=Ce("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function h(A){let g=A.target.value,z=e.getState().workspace?.current?.path||"";if(g&&g!==z){o("switching workspace to %s",g),l=!0,E();try{await r(g)}catch(Y){o("workspace switch failed: %o",Y)}finally{l=!1,E()}}}async function _(){let A=e.getState(),x=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!x||a)){o("git-pulling workspace %s",x),a=!0,E();try{await n(x)}catch(g){o("workspace git pull failed: %o",g)}finally{a=!1,E()}}}function w(A){let x=A.target;x&&t.contains(x)||T()}function $(A){A.key==="Escape"&&T()}function v(){c||(c=!0,document.addEventListener("mousedown",w),document.addEventListener("keydown",$),E())}function T(){c&&(c=!1,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),E())}function C(){c?T():v()}async function L(A){let x=A.target,g=x.value,B=x.checked;o("toggling visibility %s \u2192 %s",g,String(B));try{await s(g,B)}catch(z){o("workspace visibility toggle failed: %o",z)}}function M(A){return A?d`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:d``}function q(A,x){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${C}
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
                        @change=${L}
                      />
                      <span class="workspace-picker__manage-name"
                        >${fs(g.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let A=e.getState(),x=A.workspace?.current,g=A.workspace?.available||[],B=new Set(A.workspace?.hidden||[]),z=x?.path||g[0]?.path||"";if(g.length===0)return d``;let Y=g.filter(ne=>!B.has(ne.path)||ne.path===z);if(Y.length<=1){let ne=Y[0]||g[0],ye=fs(ne.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ne.path}"
            >${ye}</span
          >
          ${q(g,B)}
          ${M(z)}
          ${a?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${h}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${Y.map(ne=>d`
              <option
                value="${ne.path}"
                ?selected=${ne.path===z}
                title="${ne.path}"
              >
                ${fs(ne.path)}
              </option>
            `)}
        </select>
        ${q(g,B)}
        ${M(z)}
        ${l||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){me(P(),t)}return E(),i=e.subscribe(()=>E()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),me(d``,t)}}}var Ii=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function hs(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Li(t,e,r=hs()){return{id:r,type:t,payload:e}}function Di(t={}){let e=Ce("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,h=[],_=new Map,w=new Set;function $(P){for(let E of Array.from(w))try{E(P)}catch{}}function v(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),$(o);let P=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),E=(r.jitterRatio||0)*P,A=Math.max(0,Math.round(P+(Math.random()*2-1)*E));e("ws retry in %d ms (attempt %d)",A,i+1),l=setTimeout(()=>{l=null,q()},A)}function T(P){try{s?.send(JSON.stringify(P))}catch(E){e("ws send failed",E)}}function C(){for(o="open",e("ws open"),$(o),i=0;h.length;){let P=h.shift();P&&T(P)}}function L(P){let E;try{E=JSON.parse(String(P.data))}catch{e("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){e("ws received invalid envelope");return}if(c.has(E.id)){let x=c.get(E.id);c.delete(E.id),E.ok?x?.resolve(E.payload):x?.reject(E.error||new Error("ws error"));return}let A=_.get(E.type);if(A&&A.size>0)for(let x of Array.from(A))try{x(E.payload)}catch(g){e("ws event handler error",g)}else e("ws received unhandled message type: %s",E.type)}function M(){o="closed",e("ws closed"),$(o);for(let[P,E]of c.entries())E.reject(new Error("ws disconnected")),c.delete(P);i+=1,v()}function q(){if(!a)return;let P=n();try{s=new WebSocket(P),e("ws connecting %s",P),o="connecting",$(o),s.addEventListener("open",C),s.addEventListener("message",L),s.addEventListener("error",()=>{}),s.addEventListener("close",M)}catch(E){e("ws connect failed %o",E),v()}}return q(),{send(P,E){if(!Ii.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let A=hs(),x=Li(P,E,A);return e("send %s id=%s",P,A),new Promise((g,B)=>{c.set(A,{resolve:g,reject:B,type:P}),s&&s.readyState===s.OPEN?T(x):(e("queue %s id=%s (state=%s)",P,A,o),h.push(x))})},on(P,E){_.has(P)||_.set(P,new Set);let A=_.get(P);return A?.add(E),()=>{A?.delete(E)}},onConnection(P){return w.add(P),()=>{w.delete(P)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,q()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Xc(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function Qc(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var _s=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Oi=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Mi=[[ls,"in-progress-issues"]],Ni="worker:queue",Pi="ui:order",Fi="ui:display-policy",Pt="tab:board:closed",qi="beads-ui.board.closed-range";function Jc(t){let e=Ce("main");e("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;me(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&o&&i&&l){let ye=function(p,m){let H="Request failed",U="";if(p&&typeof p=="object"){let Ee=p;if(typeof Ee.message=="string"&&Ee.message.length>0&&(H=Ee.message),typeof Ee.details=="string")U=Ee.details;else if(Ee.details&&typeof Ee.details=="object")try{U=JSON.stringify(Ee.details,null,2)}catch{U=""}}else typeof p=="string"&&p.length>0&&(H=p);let ie=m&&m.length>0?`Failed to load ${m}`:"Request failed";ne.open(ie,H,U)},Be=function(p){return`${V.getState().workspace.current?.path||""}\0${p}`},it=function(){Le&&(Le().catch(()=>{}),Le=null),ve=null,Qe=null},Ge=function(p){_e=p;let m=()=>{_e!==p||V.getState().selected_id!==p||(_e=null,pt(p))};if(!Ye){ht.then(m);return}m()},je=function(){let p=Ur(Ke);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},Ze=function(p){if(p)for(let[m,H]of _s){if(De.has(m)||Re.has(m))continue;let U=m===Pt?je():{type:H};try{ee.register(m,U)}catch(ie){e("register %s store failed: %o",m,ie)}Re.add(m),pe.subscribeList(m,U).then(ie=>{De.set(m,ie)}).catch(ie=>{e("subscribe %s failed: %o",m,ie),ye(ie,"board")}).finally(()=>{Re.delete(m)})}else at()},at=function(){for(let[p]of _s){let m=De.get(p);m&&(m().catch(()=>{}),De.delete(p));try{ee.unregister(p)}catch(H){e("unregister %s failed: %o",p,H)}}},Oe=function(p){if(!p){Je();return}for(let[m,H]of Oi)if(!(lt.has(m)||Re.has(m))){try{ee.register(m,{type:H})}catch(U){e("register %s store failed: %o",m,U)}Re.add(m),pe.subscribeList(m,{type:H}).then(U=>{lt.set(m,U)}).catch(U=>{e("subscribe %s failed: %o",m,U),ye(U,"worker")}).finally(()=>{Re.delete(m)})}},Je=function(){for(let[p]of Oi){let m=lt.get(p);m&&(m().catch(()=>{}),lt.delete(p));try{ee.unregister(p)}catch(H){e("unregister %s failed: %o",p,H)}}},de=function(p){if(!p){Ue();return}Xe||(he("subscribe-worker-queue",{id:Ni}).catch(m=>{e("subscribe-worker-queue failed: %o",m)}),Xe=()=>he("unsubscribe-worker-queue",{id:Ni}))},Ue=function(){Xe&&(Xe().catch(()=>{}),Xe=null)},N=function(p){if(!p){K();return}for(let[m,H]of Mi)if(!(I.has(m)||Re.has(m))){try{ee.register(m,{type:H})}catch(U){e("register %s store failed: %o",m,U)}Re.add(m),pe.subscribeList(m,{type:H}).then(U=>{I.set(m,U)}).catch(U=>{e("subscribe %s failed: %o",m,U),ye(U,"monitor")}).finally(()=>{Re.delete(m)})}},K=function(){for(let[p]of Mi){let m=I.get(p);m&&(m().catch(()=>{}),I.delete(p));try{ee.unregister(p)}catch(H){e("unregister %s failed: %o",p,H)}}},Z=function(){j||(he("subscribe-ui-order",{id:Pi}).catch(p=>{e("subscribe-ui-order failed: %o",p)}),j=()=>he("unsubscribe-ui-order",{id:Pi}))},le=function(){j&&(j().catch(()=>{}),j=null),ut.clear()},ge=function(){ce||(he("subscribe-display-policy",{id:Fi}).catch(p=>{e("subscribe-display-policy failed: %o",p)}),ce=()=>he("unsubscribe-display-policy",{id:Fi}))},te=function(){ce&&(ce().catch(()=>{}),ce=null),ot.clear()},u=function(p){if(!p)return"Unknown";let m=p.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var a=ye,c=Be,h=it,_=Ge,w=je,$=Ze,v=at,T=Oe,C=Je,L=de,M=Ue,q=N,P=K,E=Z,A=le,x=ge,g=te,B=u;let z=document.getElementById("header-loading"),Y=io(z),ne=ci(t),ue=Di(),he=Y.wrapSend((p,m)=>ue.send(p,m)),pe=Js(he),ee=eo(),Ae=ro(),ut=to(),ot=Fs(),we=qs();ue.on("ui-order-snapshot",p=>{let m=p;if(m&&typeof m.revision=="number")try{ut.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),ue.on("display-policy-snapshot",p=>{let m=p;if(m&&m.policy&&typeof m.policy=="object")try{ot.set(m.policy)}catch{}}),ue.on("session-log-snapshot",p=>{let m=p;if(m&&typeof m.attempt_id=="string")try{we.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[])}catch{}}),ue.on("session-log-append",p=>{let m=p;if(m&&typeof m.attempt_id=="string")try{we.append(m.attempt_id,m.event)}catch{}}),ue.on("snapshot",p=>{let m=p,H=m&&typeof m.id=="string"?m.id:"",U=H?ee.getStore(H):null;if(U&&m&&m.type==="snapshot")try{U.applyPush(m)}catch{}}),ue.on("upsert",p=>{let m=p,H=m&&typeof m.id=="string"?m.id:"",U=H?ee.getStore(H):null;if(U&&m&&m.type==="upsert")try{U.applyPush(m)}catch{}}),ue.on("delete",p=>{let m=p,H=m&&typeof m.id=="string"?m.id:"",U=H?ee.getStore(H):null;if(U&&m&&m.type==="delete")try{U.applyPush(m)}catch{}});let Le=null,ve=null,Qe=null,_e=null,We=()=>{},ht=new Promise(p=>{We=()=>p(void 0)}),Ye=!1,_t=!1;async function pt(p){let m=Be(p);if(m===ve||m===Qe)return;Qe=m;let H=`detail:${p}`,U={type:"issue-detail",params:{id:p}};try{ee.register(H,U)}catch(ie){e("register detail store failed: %o",ie)}try{let ie=await pe.subscribeList(H,U);if(V.getState().selected_id!==p||Be(p)!==m){await ie().catch(()=>{});return}Le&&await Le().catch(()=>{}),Le=ie,ve=m}catch(ie){e("detail subscribe failed: %o",ie),ye(ie,"issue details")}finally{Qe===m&&(Qe=null)}}let De=new Map,Re=new Set,Ke=It;try{let p=window.localStorage.getItem(qi);tr(p)&&(Ke=p)}catch{}async function gt(p){if(!tr(p)||p===Ke)return;Ke=p;try{window.localStorage.setItem(qi,p)}catch{}let m=De.get(Pt);if(!m)return;De.delete(Pt),await m().catch(()=>{});let H=je();try{ee.register(Pt,H)}catch(U){e("register %s store failed: %o",Pt,U)}try{let U=await pe.subscribeList(Pt,H);De.set(Pt,U)}catch(U){e("re-subscribe %s failed: %o",Pt,U),ye(U,"board")}}let lt=new Map,Xe=null,I=new Map,j=null,ce=null;async function k(){ce=null,ot.clear(),Xe=null;let p=V.getState().workspace.current?.path;if(p)try{await ue.send("set-workspace",{path:p})}catch(H){e("workspace restore after reconnect failed: %o",H);return}ge();let m=V.getState().view;Oe(m==="worker"),N(m==="monitor"),de(m==="worker"||m==="monitor")}async function D(){e("clearing all subscriptions for workspace switch"),at(),Je(),K(),Ue(),Ae.clear(),le(),Z(),te(),ge(),it();let p=V.getState();if(p.selected_id)try{ee.unregister(`detail:${p.selected_id}`)}catch{}let m=V.getState();Ze(m.view==="board"),Oe(m.view==="worker"),N(m.view==="monitor"),de(m.view==="worker"||m.view==="monitor"),m.selected_id&&Ge(m.selected_id)}async function S(p){e("requesting workspace switch to %s",p),_t=!0;try{let m=await ue.send("set-workspace",{path:p});e("workspace switch result: %o",m),m&&m.workspace&&(V.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",p),m.changed&&(await D(),J("Switched to "+u(p),"success",2e3)))}catch(m){throw e("workspace switch failed: %o",m),J("Failed to switch workspace","error",3e3),m}finally{_t=!1}}async function X(p){e("requesting workspace git pull for %s",p);try{let m=await ue.send("git-pull-workspace",{});e("workspace git pull result: %o",m);let H=m?.status;if(H==="up_to_date"){J("Already up to date","success",2e3);return}if(H==="stash_pop_conflict"){J("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}J("Git pulled "+u(p),"success",2e3)}catch(m){e("workspace git pull failed: %o",m);let H=m?.code,U=m?.message;if(H==="rebase_conflict"){J("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(H==="rebase_conflict_abort_failed"){J("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(H==="busy"){J("Git pull skipped: another operation is running","warning",3e3);return}let ie=U?`: ${U}`:"";throw J(`Git pull failed${ie}`,"error",3e3),m}}async function Ne(p,m){e("setting workspace visibility %s \u2192 %s",p,String(m));try{await ue.send("set-workspace-visibility",{path:p,visible:m}),await b()}catch(H){e("workspace visibility update failed: %o",H),J("Failed to update project visibility","error",3e3)}}async function b(){try{let p=await ue.send("list-workspaces",{});if(e("workspaces loaded: %o",p),p&&Array.isArray(p.workspaces)){let m=p.workspaces.map(Ee=>({path:Ee.path,database:Ee.database,pid:Ee.pid,version:Ee.version})),H=p.current?{path:p.current.root_dir,database:p.current.db_path}:null,U=Array.isArray(p.hidden)?p.hidden.filter(Ee=>typeof Ee=="string"):[];V.setState({workspace:{current:H,available:m,hidden:U}});let ie=window.localStorage.getItem("beads-ui.workspace");ie&&(!m.some(Ft=>Ft.path===ie)||U.includes(ie)?window.localStorage.removeItem("beads-ui.workspace"):H&&ie!==H.path&&(e("restoring saved workspace preference: %s",ie),await S(ie)))}}catch(p){e("failed to load workspaces: %o",p)}}ue.on("workspace-changed",p=>{e("workspace-changed event: %o",p),p&&p.root_dir&&(V.setState({workspace:{current:{path:p.root_dir,database:p.db_path}}}),b(),D())});let R=!1;if(typeof ue.onConnection=="function"){let p=m=>{e("ws state %s",m),m==="reconnecting"||m==="closed"?(R=!0,J("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&R&&(R=!1,J("Reconnected","success",2200),Qc(V,(H,U)=>{e(`${H}: %o`,U)}),k())};ue.onConnection(p)}let se="board";try{let p=window.localStorage.getItem("beads-ui.view");(p==="board"||p==="worker"||p==="monitor")&&(se=p)}catch(p){e("view parse error: %o",p)}let V=oo({config:Xc(),view:se});ue.on("worker-queue-snapshot",p=>{let m=p;if(!m||!m.queue)return;let H=V.getState().workspace.current?.path;if(typeof H=="string"&&H.length>0&&m.root_dir!==H){e("dropping worker-queue snapshot for %s",String(m.root_dir));return}try{Ae.set(m.queue)}catch{}});let re=no(V);re.start();let ke=async(p,m)=>{try{return await he(p,m)}catch{return[]}};n&&hi(n,V,re);let Te=document.getElementById("workspace-picker");Te&&Ri(Te,V,S,X,Ne);let ze=bi(t,(p,m)=>he(p,m));try{let p=document.getElementById("new-issue-btn");p&&p.addEventListener("click",()=>ze.open())}catch{}let et=li(t,{policyStore:ot,transport:(p,m)=>he(p,m),labelOptions:()=>{let p=new Set;for(let[m]of _s)for(let H of ee.snapshotFor(m)||[]){let U=H.labels;if(Array.isArray(U))for(let ie of U)typeof ie=="string"&&ie.length>0&&p.add(ie)}return Array.from(p).sort()}});try{let p=document.getElementById("display-settings-btn");p&&p.addEventListener("click",()=>et.open())}catch{}let bt=_o(s,{gotoIssue:p=>re.gotoIssue(p),issueStores:ee,transport:ke,uiOrderStore:ut,displayPolicyStore:ot,closedRange:Ke,onClosedRangeChange:p=>{gt(p)},onNewIssue:()=>ze.open()}),wt=ps(o,{transport:ke,issueStores:ee,queueStore:Ae,sessionLogStore:we,uiOrderStore:ut,gotoIssue:p=>V.setState({selected_id:p}),getWorkspacePath:()=>V.getState().workspace.current?.path}),St=fi(i,{issueStores:ee,queueStore:Ae,gotoIssue:p=>re.gotoIssue(p)}),Pe=ii(l,{issueStores:ee,transport:ke,queueStore:Ae,sessionLogStore:we,getWorkspacePath:()=>V.getState().workspace.current?.path,onNavigate:p=>{V.getState().view==="worker"?V.setState({selected_id:p}):re.gotoIssue(p)},onClose:()=>{let p=V.getState();V.setState({selected_id:null});try{re.gotoView(p.view==="worker"||p.view==="monitor"?p.view:"board")}catch{}}}),Ve=V.getState().selected_id;Ve&&(l.hidden=!1,Pe.load(Ve),Ge(Ve)),V.subscribe(p=>{let m=p.selected_id;m?(l.hidden=!1,Pe.load(m),_t||Ge(m)):(Pe.clear(),l.hidden=!0,it())});let oe=p=>{s.hidden=p.view!=="board",o.hidden=p.view!=="worker",i.hidden=p.view!=="monitor",Ze(p.view==="board"),Oe(p.view==="worker"),N(p.view==="monitor"),de(p.view==="worker"||p.view==="monitor"),!p.selected_id&&p.view==="board"&&bt.load(),p.view==="worker"&&wt.load(),p.view==="monitor"&&St.load(),window.localStorage.setItem("beads-ui.view",p.view)};V.subscribe(oe),oe(V.getState()),Z(),ge(),b().finally(()=>{Ye=!0,We()}),window.addEventListener("keydown",p=>{let m=p.ctrlKey||p.metaKey,H=String(p.key||"").toLowerCase(),U=p.target,ie=U&&U.tagName?String(U.tagName).toLowerCase():"",Ee=ie==="input"||ie==="textarea"||ie==="select"||U&&typeof U.isContentEditable=="boolean"&&U.isContentEditable;m&&H==="n"&&(Ee||(p.preventDefault(),ze.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Jc(e)});export{Jc as bootstrap,Xc as readBootstrapConfig,Qc as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
