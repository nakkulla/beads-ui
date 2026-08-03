var Vi=Object.create;var _n=Object.defineProperty;var Ki=Object.getOwnPropertyDescriptor;var Zi=Object.getOwnPropertyNames;var Xi=Object.getPrototypeOf,Qi=Object.prototype.hasOwnProperty;var Ji=(t,e,r)=>e in t?_n(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var mn=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ea=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Zi(e))!Qi.call(t,s)&&s!==r&&_n(t,s,{get:()=>e[s],enumerable:!(n=Ki(e,s))||n.enumerable});return t};var ta=(t,e,r)=>(r=t!=null?Vi(Xi(t)):{},ea(e||!t||!t.__esModule?_n(r,"default",{value:t,enumerable:!0}):r,t));var xe=(t,e,r)=>Ji(t,typeof e!="symbol"?e+"":e,r);var Us=mn((kd,Bs)=>{var nr=1e3,sr=nr*60,or=sr*60,Wt=or*24,ia=Wt*7,aa=Wt*365.25;Bs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return la(t);if(r==="number"&&isFinite(t))return e.long?da(t):ca(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function la(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*aa;case"weeks":case"week":case"w":return r*ia;case"days":case"day":case"d":return r*Wt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*or;case"minutes":case"minute":case"mins":case"min":case"m":return r*sr;case"seconds":case"second":case"secs":case"sec":case"s":return r*nr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ca(t){var e=Math.abs(t);return e>=Wt?Math.round(t/Wt)+"d":e>=or?Math.round(t/or)+"h":e>=sr?Math.round(t/sr)+"m":e>=nr?Math.round(t/nr)+"s":t+"ms"}function da(t){var e=Math.abs(t);return e>=Wt?zr(t,e,Wt,"day"):e>=or?zr(t,e,or,"hour"):e>=sr?zr(t,e,sr,"minute"):e>=nr?zr(t,e,nr,"second"):t+" ms"}function zr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Hs=mn((yd,zs)=>{function ua(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Us(),r.destroy=c,Object.keys(t).forEach(h=>{r[h]=t[h]}),r.names=[],r.skips=[],r.formatters={};function e(h){let f=0;for(let _=0;_<h.length;_++)f=(f<<5)-f+h.charCodeAt(_),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=e;function r(h){let f,_=null,y,$;function A(...C){if(!A.enabled)return;let F=A,U=Number(new Date),H=U-(f||U);F.diff=H,F.prev=f,F.curr=U,f=U,C[0]=r.coerce(C[0]),typeof C[0]!="string"&&C.unshift("%O");let P=0;C[0]=C[0].replace(/%([a-zA-Z%])/g,(E,D)=>{if(E==="%%")return"%";P++;let v=r.formatters[D];if(typeof v=="function"){let W=C[P];E=v.call(F,W),C.splice(P,1),P--}return E}),r.formatArgs.call(F,C),(F.log||r.log).apply(F,C)}return A.namespace=h,A.useColors=r.useColors(),A.color=r.selectColor(h),A.extend=n,A.destroy=r.destroy,Object.defineProperty(A,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(y!==r.namespaces&&(y=r.namespaces,$=r.enabled(h)),$),set:C=>{_=C}}),typeof r.init=="function"&&r.init(A),A}function n(h,f){let _=r(this.namespace+(typeof f>"u"?":":f)+h);return _.log=this.log,_}function s(h){r.save(h),r.namespaces=h,r.names=[],r.skips=[];let f=(typeof h=="string"?h:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of f)_[0]==="-"?r.skips.push(_.slice(1)):r.names.push(_)}function o(h,f){let _=0,y=0,$=-1,A=0;for(;_<h.length;)if(y<f.length&&(f[y]===h[_]||f[y]==="*"))f[y]==="*"?($=y,A=_,y++):(_++,y++);else if($!==-1)y=$+1,A++,_=A;else return!1;for(;y<f.length&&f[y]==="*";)y++;return y===f.length}function i(){let h=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),h}function l(h){for(let f of r.skips)if(o(h,f))return!1;for(let f of r.names)if(o(h,f))return!0;return!1}function a(h){return h instanceof Error?h.stack||h.message:h}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}zs.exports=ua});var Ws=mn((ft,Hr)=>{ft.formatArgs=fa;ft.save=ha;ft.load=_a;ft.useColors=pa;ft.storage=ma();ft.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();ft.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function pa(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function fa(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+Hr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}ft.log=console.debug||console.log||(()=>{});function ha(t){try{t?ft.storage.setItem("debug",t):ft.storage.removeItem("debug")}catch{}}function _a(){let t;try{t=ft.storage.getItem("debug")||ft.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function ma(){try{return localStorage}catch{}}Hr.exports=Hs()(ft);var{formatters:ga}=Hr.exports;ga.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var _r=globalThis,Br=_r.trustedTypes,As=Br?Br.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ds="$lit$",Lt=`lit$${Math.random().toFixed(9).slice(2)}$`,Os="?"+Lt,ra=`<${Os}>`,zt=document,mr=()=>zt.createComment(""),gr=t=>t===null||typeof t!="object"&&typeof t!="function",$n=Array.isArray,na=t=>$n(t)||typeof t?.[Symbol.iterator]=="function",gn=`[ 	
\f\r]`,hr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Es=/-->/g,Cs=/>/g,Bt=RegExp(`>|${gn}(?:([^\\s"'>=/]+)(${gn}*=${gn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Rs=/'/g,Is=/"/g,Ms=/^(?:script|style|textarea|title)$/i,xn=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=xn(1),fd=xn(2),hd=xn(3),Ht=Symbol.for("lit-noChange"),Oe=Symbol.for("lit-nothing"),Ls=new WeakMap,Ut=zt.createTreeWalker(zt,129);function Ns(t,e){if(!$n(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return As!==void 0?As.createHTML(e):e}var sa=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=hr;for(let l=0;l<r;l++){let a=t[l],c,h,f=-1,_=0;for(;_<a.length&&(i.lastIndex=_,h=i.exec(a),h!==null);)_=i.lastIndex,i===hr?h[1]==="!--"?i=Es:h[1]!==void 0?i=Cs:h[2]!==void 0?(Ms.test(h[2])&&(s=RegExp("</"+h[2],"g")),i=Bt):h[3]!==void 0&&(i=Bt):i===Bt?h[0]===">"?(i=s??hr,f=-1):h[1]===void 0?f=-2:(f=i.lastIndex-h[2].length,c=h[1],i=h[3]===void 0?Bt:h[3]==='"'?Is:Rs):i===Is||i===Rs?i=Bt:i===Es||i===Cs?i=hr:(i=Bt,s=void 0);let y=i===Bt&&t[l+1].startsWith("/>")?" ":"";o+=i===hr?a+ra:f>=0?(n.push(c),a.slice(0,f)+Ds+a.slice(f)+Lt+y):a+Lt+(f===-2?l:y)}return[Ns(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},br=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,h]=sa(e,r);if(this.el=t.createElement(c,n),Ut.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=Ut.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(Ds)){let _=h[i++],y=s.getAttribute(f).split(Lt),$=/([.?@])?(.*)/.exec(_);a.push({type:1,index:o,name:$[2],strings:y,ctor:$[1]==="."?wn:$[1]==="?"?kn:$[1]==="@"?yn:tr}),s.removeAttribute(f)}else f.startsWith(Lt)&&(a.push({type:6,index:o}),s.removeAttribute(f));if(Ms.test(s.tagName)){let f=s.textContent.split(Lt),_=f.length-1;if(_>0){s.textContent=Br?Br.emptyScript:"";for(let y=0;y<_;y++)s.append(f[y],mr()),Ut.nextNode(),a.push({type:2,index:++o});s.append(f[_],mr())}}}else if(s.nodeType===8)if(s.data===Os)a.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(Lt,f+1))!==-1;)a.push({type:7,index:o}),f+=Lt.length-1}o++}}static createElement(e,r){let n=zt.createElement("template");return n.innerHTML=e,n}};function er(t,e,r=t,n){if(e===Ht)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=gr(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=er(t,s._$AS(t,e.values),s,n)),e}var bn=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??zt).importNode(r,!0);Ut.currentNode=s;let o=Ut.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new wr(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new vn(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=Ut.nextNode(),i++)}return Ut.currentNode=zt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},wr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Oe,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=er(this,e,r),gr(e)?e===Oe||e==null||e===""?(this._$AH!==Oe&&this._$AR(),this._$AH=Oe):e!==this._$AH&&e!==Ht&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):na(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Oe&&gr(this._$AH)?this._$AA.nextSibling.data=e:this.T(zt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=br.createElement(Ns(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new bn(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=Ls.get(e.strings);return r===void 0&&Ls.set(e.strings,r=new br(e)),r}k(e){$n(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(mr()),this.O(mr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},tr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=Oe,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Oe}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=er(this,e,r,0),i=!gr(e)||e!==this._$AH&&e!==Ht,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=er(this,l[n+a],r,a),c===Ht&&(c=this._$AH[a]),i||(i=!gr(c)||c!==this._$AH[a]),c===Oe?e=Oe:e!==Oe&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===Oe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},wn=class extends tr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Oe?void 0:e}},kn=class extends tr{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Oe)}},yn=class extends tr{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=er(this,e,r,0)??Oe)===Ht)return;let n=this._$AH,s=e===Oe&&n!==Oe||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Oe&&(n===Oe||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},vn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){er(this,e)}};var oa=_r.litHtmlPolyfillSupport;oa?.(br,wr),(_r.litHtmlVersions??(_r.litHtmlVersions=[])).push("3.3.1");var be=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new wr(e.insertBefore(mr(),o),o,void 0,r??{})}return s._$AI(t),s};var Dt="today",kr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function rr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Ur(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Ps(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Fs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=Array.isArray(n)?n:null,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function qs(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s,o=null){t.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=t.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var Gs=ta(Ws(),1);function Re(t){return(0,Gs.default)(`beads-ui:${t}`)}function yt(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Gt(t,e){let r=yt(t.created_at),n=yt(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Vs(t,e){let r=yt(t.created_at),n=yt(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Ks(t,e){let r=yt(t.updated_at),n=yt(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function Zs(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=yt(t.created_at),o=yt(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Xs(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var ba=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function js(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ys(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=ba.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Qs(t,e){let r=js(t),n=js(e);if(r!==n)return r<n?-1:1;let s=Ys(t),o=Ys(e);if(s!==o)return s<o?-1:1;let i=yt(t&&t.created_at),l=yt(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var Sn=2**20;function ir(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-yt(t&&t.created_at)}function Wr(t){return(e,r)=>{let n=ir(e,t),s=ir(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Tn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:ir(l,r)-Sn};if(!l)return{rank:ir(i,r)+Sn};let a=ir(i,r),c=ir(l,r),h=(a+c)/2;return a<h&&h<c?{rank:h}:{renormalize:n.map((f,_)=>({bead_id:f.id,rank:_*Sn}))}}function An(t,e={}){let r=Re(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Gt;function c(){for(let _ of Array.from(i))try{_()}catch{}}function h(){s=Array.from(n.values()).sort(a)}function f(_){if(l||!_||_.id!==t)return;let y=Number(_.revision)||0;if(r("apply %s rev=%d",_.type,y),!(y<=o&&_.type!=="snapshot")){if(_.type==="snapshot"){if(y<=o)return;n.clear();let $=Array.isArray(_.issues)?_.issues:[];for(let A of $)A&&typeof A.id=="string"&&A.id.length>0&&n.set(A.id,A);h(),o=y,c();return}if(_.type==="upsert"){let $=_.issue;if($&&typeof $.id=="string"&&$.id.length>0){let A=n.get($.id);if(!A)n.set($.id,$);else{let C=Number.isFinite(A.updated_at)?A.updated_at:0,F=Number.isFinite($.updated_at)?$.updated_at:0;if(C<=F){for(let U of Object.keys(A))U in $||delete A[U];for(let[U,H]of Object.entries($))A[U]=H}}h()}o=y,c()}else if(_.type==="delete"){let $=String(_.issue_id||"");$&&(n.delete($),h()),o=y,c()}}}return{id:t,subscribe(_){return i.add(_),()=>{i.delete(_)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(_){return n.get(_)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function Gr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function Js(t){let e=Re("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let h=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let y of Array.from(c)){let $=r.get(y);if(!$)continue;let A=$.itemsById;for(let C of h)typeof C=="string"&&C.length>0&&A.set(C,!0);for(let C of f)typeof C=="string"&&C.length>0&&A.set(C,!0);for(let C of _)typeof C=="string"&&C.length>0&&A.delete(C)}}async function o(l,a){let c=Gr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let f=r.get(l);if(f&&f.key!==c){let _=n.get(f.key);_&&(_.delete(l),_.size===0&&n.delete(f.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let h=n.get(c);h&&h.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let _=r.get(l)||null;if(_){let y=n.get(_.key);y&&(y.delete(l),y.size===0&&n.delete(_.key))}throw r.delete(l),f}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let f=r.get(l)||null;if(f){let _=n.get(f.key);_&&(_.delete(l),_.size===0&&n.delete(f.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Gr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let h of a.itemsById.keys())c[h]=!0;return c}}}}function eo(){let t=Re("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,h){let f=c?Gr(c):"",_=r.get(a)||"",y=e.has(a);if(t("register %s key=%s (prev=%s)",a,f,_),y&&_&&f&&_!==f){let $=e.get(a);if($)try{$.dispose()}catch{}let A=s.get(a);if(A){try{A()}catch{}s.delete(a)}let C=An(a,h);e.set(a,C);let F=C.subscribe(()=>o());s.set(a,F)}else if(!y){let $=An(a,h);e.set(a,$);let A=$.subscribe(()=>o());s.set(a,A)}return r.set(a,f),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let h=s.get(a);if(h){try{h()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function to(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ro(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function En(t,e){return`#/${t==="worker"||t==="monitor"?t:"board"}?issue=${encodeURIComponent(e)}`}function wa(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ka(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":/^#\/monitor(\b|\/|$)/.test(e)?"monitor":"board"}function no(t){let e=Re("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):wa(n),i=ka(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=t.getState?t.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=En(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?En(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ya=Object.freeze({workspace_config:{default_workspace:null}});function so(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:ya.workspace_config.default_workspace}}}function oo(t={}){let e=Re("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:so(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?so(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,h)=>c!==r.workspace.hidden[h]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,h)=>c===r.worker.show_closed_children[h])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function io(t){let e=Re("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(f,_)=>{let y=s++,$=Date.now();n.set(y,{type:f,start_ts:$}),e("request start id=%d type=%s count=%d",y,f,r+1),i();let A=!1,C=()=>{A||(A=!0,n.delete(y),l())},F=setTimeout(()=>{A||(e("request TIMEOUT id=%d type=%s elapsed=%dms",y,f,Date.now()-$),C())},3e4);try{let U=await c(f,_),H=Date.now()-$;return e("request done id=%d type=%s elapsed=%dms",y,f,H),U}catch(U){let H=Date.now()-$;throw e("request error id=%d type=%s elapsed=%dms err=%o",y,f,H,U),U}finally{clearTimeout(F),C()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([h,f])=>({id:h,type:f.type,elapsed_ms:c-f.start_ts}))}}}function ee(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function jr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Xs),a;switch(l){case"created_desc":return a.sort(Gt),a;case"created_asc":return a.sort(Vs),a;case"updated_desc":return a.sort(Ks),a;case"priority":return a.sort(Zs),a;case"manual":default:{let c=r();return c?a.sort(Wr(c)):a.sort(Gt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function yr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function at(t){let e=yr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function gt(t,e){let r=yr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Yr(t){if(!Array.isArray(t))return null;let e=null,r=-1;for(let n of t){if(!n||n.status!=="in_progress")continue;let s=yr(n.updated_at)??0;if(e===null||s>r){e=n,r=s;continue}s===r&&String(n.id)<String(e.id)&&(e=n)}return e}function Vr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},h=n(Tn(l,a,c.order),i);s(c,h);let f=await e("ui-order-set",{expected_revision:c.revision,entries:h});if(f&&f.conflict){let _={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(_);let y=n(Tn(l,a,_.order),i);s(_,y);let $=await e("ui-order-set",{expected_revision:_.revision,entries:y});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function Kr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Cn(t,e){return!e||typeof t!="string"||t.length===0||Kr(e.visible_labels).includes(t)?!0:Kr(e.hidden_labels).includes(t)?!1:!Kr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function ao(t,e){return Kr(t).filter(r=>Cn(r,e))}function jt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}var va={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},lo={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},$a={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},xa={review:"\u2713",skip:"\u2298"},ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Sa(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t){let o=e[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ta(t){let e=t&&t.fill||"none";return e==="none"?ar.none:t&&t.stale===!0?ar.stale:e==="dim"?ar.dim:t&&t.glyph==="review"?ar.review:t&&t.glyph==="skip"?ar.skip:ar.done}function Aa(t,e,r){let n=va[t]||t,s=e&&e.fill||"none",o=!!e&&e.stale===!0,i=xa[e&&e.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let a=s==="none"?"lbl":`lbl l-${n} on`,c=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${l} style=${c}>${i}</div>
      <div class=${a}>
        ${lo[t]||t}
      </div>
    </div>
  `}function Zr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=$a[r],s=t.stages,o=Sa(n,s,String(e||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(l=>`${lo[l]||l} ${Ta(s[l]||{})}`).join(" \xB7 ")}`;return d`
    <div class="stp" role="img" aria-label=${i}>
      ${n.map(l=>Aa(l,s[l]||{},l===o))}
    </div>
  `}function Ea(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var co=2;function Ca(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,co).join(", "),s=r.length-co,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function Ra(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&jt(r,"route")){let o=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&jt(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&jt(r,"pr")){let o=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of ao(t.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&jt(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),jt(r,"blocked")&&s.push(...Ca(t.blocked_info)),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function Ia(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function La(t){let e=gt(t.created_at),r=gt(t.updated_at);return!e&&!r?"":d`<span class="board-card__times">
    ${e?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${at(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${at(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Da(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(Qs):r.children;return d`
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
        ${La(t)}
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
                  <span class=${Ia(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function uo(t,e){let r=Ea(t.priority);return d`
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
      ${Ra(t,e)}
      ${t.workflow&&jt(e.policy||null,"stepper")?Zr(t.workflow,t.status):""}
      ${Da(t,e)}
    </article>
  `}function Yt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return d`
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
  `}var Oa=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Ma=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Na=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Pa(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
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
        ${Oa.map(n=>d`<option
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
        ${Ma.map(n=>d`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Pa(t,e,r)}
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
        ${Na.map(n=>d`<option
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
  `}var Fa=200,qa={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ba=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),fo="beads-ui.board.sort",ho=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ua(){try{let t=window.localStorage.getItem(fo);if(t&&ho.has(t))return t}catch{}return"created_desc"}function _o(t,e){let r=Re("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,h=e.closedRange||Dt,f=s?jr(s,i):null,_=Vr({transport:o,uiOrderStore:i}),y=[],$=[],A=[],C=[],F=[],U=[],H=!1,P=0,T=Ua(),E=new Map,D=new Map,v=new Map,W=new Set,G={search:"",priority:"",type:"",labels:[]},K=!1,se=null;function Ee(L){return String(L.status||"open")==="open"}function Me(L){let N=String(L.status||"open");return N==="open"||N==="blocked"}function ye(L){let N=G.search.trim().toLowerCase(),Z=G.priority,V=G.type,X=G.labels;return L.filter(de=>{if(N){let pe=String(de.id||"").toLowerCase(),_e=String(de.title||"").toLowerCase();if(!pe.includes(N)&&!_e.includes(N))return!1}if(Z!==""&&String(de.priority)!==Z||V!==""&&String(de.issue_type||"")!==V)return!1;if(X.length>0){let pe=Array.isArray(de.labels)?de.labels:[];if(!X.some(_e=>pe.includes(_e)))return!1}return!0})}function te(){let L=new Set;for(let N of[y,$,A,C,F,U])for(let Z of N){let V=Array.isArray(Z.labels)?Z.labels:[];for(let X of V)typeof X=="string"&&X.length>0&&L.add(X)}return Array.from(L).sort()}function O(){return G.search.trim()!==""||G.priority!==""||G.type!==""||G.labels.length>0}function q(){try{if(f){let L=f.selectBoardColumn("tab:board:in-progress","in_progress",T),N=f.selectBoardColumn("tab:board:blocked","blocked",T).filter(Me),Z=new Set(L.map(x=>x.id)),V=f.selectBoardColumn("tab:board:ready","ready",T).filter(x=>Ee(x)&&!Z.has(x.id)),X=f.selectBoardColumn("tab:board:resolved","resolved",T),de=f.selectBoardColumn("tab:board:deferred","deferred",T),pe=H?de:[],_e=f.selectBoardColumn("tab:board:closed","closed").slice(0,Fa),re=[...N,...V,...L,...X,...pe,..._e];J(re);let w=new Set;for(let x of re)x&&x.id&&!Rn(x)&&w.add(x.id);let M=!O();y=M?lr(N,w):N,$=M?lr(V,w):V,A=M?lr(L,w):L,C=M?lr(X,w):X,F=M?lr(pe,w):pe,P=de.length,U=M?lr(_e,w):_e,E=new Map;for(let x of y)E.set(x.id,"open");for(let x of $)E.set(x.id,"open");for(let x of A)E.set(x.id,"in_progress");for(let x of C)E.set(x.id,"resolved");for(let x of F)E.set(x.id,"deferred");for(let x of U)E.set(x.id,"closed");D=new Map;for(let x of y)D.set(x.id,"blocked-col");for(let x of $)D.set(x.id,"ready-col");for(let x of A)D.set(x.id,"in-progress-col");for(let x of C)D.set(x.id,"resolved-col");for(let x of F)D.set(x.id,"deferred-col");for(let x of U)D.set(x.id,"closed-col")}Ie()}catch{y=[],$=[],A=[],C=[],F=[],U=[],v=new Map,Ie()}}function J(L){let N=new Map;for(let V of L)V&&V.id&&!N.has(V.id)&&N.set(V.id,V);let Z=new Map;for(let V of N.values()){let X=Rn(V);if(!X)continue;let de=Z.get(X);de||(de=[],Z.set(X,de)),de.push({id:V.id,title:V.title,status:V.status,metadata:V.metadata,created_at:V.created_at,updated_at:V.updated_at})}v=Z}function Ce(L){let N=v.get(L)||[],Z=0;for(let X of N)(X.status==="resolved"||X.status==="closed")&&(Z+=1);let V=Yr(N);return{total:N.length,count:Z,current:V,children:N}}function ie(L){return!W.has(L)}function Se(L,N){L.preventDefault(),L.stopPropagation(),W.has(N)?W.delete(N):W.add(N),Ie()}function oe(L,N){L.preventDefault(),L.stopPropagation(),n(N)}function qe(L,N){L.preventDefault(),L.stopPropagation(),n(N)}function fe(L,N){se||n(N)}function Be(L,N){L.preventDefault(),L.stopPropagation(),za(N).then(Z=>{Z&&ee("\uBCF5\uC0AC\uB428","success",1200)})}function Je(L,N){se=N,L.dataTransfer&&(L.dataTransfer.setData("text/plain",N),L.dataTransfer.effectAllowed="move"),L.target.classList.add("board-card--dragging")}function je(L){L.target.classList.remove("board-card--dragging"),ot(),setTimeout(()=>{se=null},0)}function wt(L){let N=String(L.target.value||"");!N||N===h||(h=N,a&&a(N),Ie())}let Ve={onCardClick:fe,onCopyId:Be,onDragStart:Je,onDragEnd:je,onClosedRangeChange:wt,rollupFor:Ce,isExpanded:ie,onRollupToggle:Se,onChildClick:oe,onFromChipClick:qe,get policy(){return l?l.get():null}};function ht(L){let N=L.target,Z=t.querySelector(".board-filter__labels");N&&Z&&Z.contains(N)||Ze()}function rt(L){L.key==="Escape"&&Ze()}function Ke(){K||(K=!0,document.addEventListener("mousedown",ht),document.addEventListener("keydown",rt),Ie())}function Ze(){K&&(K=!1,document.removeEventListener("mousedown",ht),document.removeEventListener("keydown",rt),Ie())}let nt={onSearchInput(L){G.search=String(L.target.value||""),q()},onPriorityChange(L){G.priority=String(L.target.value||""),q()},onTypeChange(L){G.type=String(L.target.value||""),q()},onSortChange(L){let N=String(L.target.value||"");if(!(!ho.has(N)||N===T)){T=N;try{window.localStorage.setItem(fo,N)}catch{}q()}},onDeferredToggle(){H=!H,q()},onLabelMenuToggle(){K?Ze():Ke()},onLabelToggle(L){let N=G.labels.indexOf(L);N===-1?G.labels.push(L):G.labels.splice(N,1),q()},onLabelClear(){G.labels.length!==0&&(G.labels=[],q())},onNewIssue(){c&&c()}};function st(){let L=H?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${po(G,nt,{sort_mode:T,show_deferred:H,deferred_count:P,label_options:te(),label_menu_open:K})}
        <div class=${L}>
          ${Yt({title:"Blocked",id:"blocked-col",items:ye(y)},Ve)}
          ${Yt({title:"Ready",id:"ready-col",items:ye($)},Ve)}
          ${Yt({title:"In progress",id:"in-progress-col",items:ye(A)},Ve)}
          ${Yt({title:"Resolved",id:"resolved-col",items:ye(C)},Ve)}
          ${H?Yt({title:"Deferred",id:"deferred-col",items:ye(F)},Ve):""}
          ${Yt({title:"Closed",id:"closed-col",items:ye(U),is_closed:!0,closed_range:h},Ve)}
        </div>
      </div>
    `}function Ie(){be(st(),t),Ue()}function Ue(){try{let L=Array.from(t.querySelectorAll(".board-column"));for(let N of L)Array.from(N.querySelectorAll(".board-card")).forEach((V,X)=>{V.tabIndex=X===0?0:-1})}catch{}}async function Ye(L,N){if(!o){ee("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:L,status:N}),ee("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Z){r("update-status failed: %o",Z),ee("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function pt(L){switch(L){case"blocked-col":return y;case"ready-col":return $;case"in-progress-col":return A;case"resolved-col":return C;case"deferred-col":return F;default:return[]}}function _t(L,N,Z){if(!o||!i)return;let V=pt(L),X=V.find(w=>w.id===N);if(!X)return;let de=V.filter(w=>w.id!==N),pe=Z.closest?Z.closest(".board-card"):null,_e=de.length;if(pe){let w=pe.getAttribute("data-issue-id");if(w===N)return;let M=de.findIndex(x=>x.id===w);M>=0&&(_e=M)}let re=de.slice();re.splice(_e,0,X),_.applyReorder(N,re,_e)}function ot(){for(let L of Array.from(t.querySelectorAll(".board-column--drag-over")))L.classList.remove("board-column--drag-over")}let Ne=null;t.addEventListener("dragover",L=>{L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move");let Z=L.target.closest(".board-column");Z&&Z!==Ne&&(Ne&&Ne.classList.remove("board-column--drag-over"),Z.classList.add("board-column--drag-over"),Ne=Z)}),t.addEventListener("dragleave",L=>{let N=L.relatedTarget;(!N||!t.contains(N))&&Ne&&(Ne.classList.remove("board-column--drag-over"),Ne=null)}),t.addEventListener("drop",L=>{L.preventDefault(),Ne&&(Ne.classList.remove("board-column--drag-over"),Ne=null);let N=L.target,Z=N.closest(".board-column");if(!Z)return;let V=L.dataTransfer?.getData("text/plain")||"";if(!V)return;let X=Z.id,de=D.get(V);if(de&&de===X){if(Ba.has(X)){if(T!=="manual"){ee("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}_t(X,V,N)}return}let pe=qa[X];if(!pe){ee("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}E.get(V)!==pe&&Ye(V,pe)}),t.addEventListener("keydown",L=>{let N=L.target;if(!(N instanceof HTMLElement))return;let Z=String(N.tagName||"").toLowerCase();if(Z==="input"||Z==="textarea"||Z==="select"||Z==="button"||Z==="a"||N.isContentEditable===!0)return;let V=N.closest(".board-card");if(!V)return;let X=String(L.key||"");if(X==="Enter"||X===" "){L.preventDefault();let re=V.getAttribute("data-issue-id");re&&n(re);return}if(X!=="ArrowUp"&&X!=="ArrowDown"&&X!=="ArrowLeft"&&X!=="ArrowRight")return;L.preventDefault();let de=V.closest(".board-column");if(!de)return;let pe=Array.from(de.querySelectorAll(".board-card")),_e=pe.indexOf(V);if(X==="ArrowDown"&&_e<pe.length-1){Xe(V,pe[_e+1]);return}if(X==="ArrowUp"&&_e>0){Xe(V,pe[_e-1]);return}if(X==="ArrowLeft"||X==="ArrowRight"){let re=Array.from(t.querySelectorAll(".board-column")),w=re.indexOf(de),M=X==="ArrowRight"?1:-1,x=w+M;for(;x>=0&&x<re.length;){let Y=re[x].querySelector(".board-card");if(Y){Xe(V,Y);return}x+=M}}});function Xe(L,N){try{L.tabIndex=-1,N.tabIndex=0,N.focus()}catch{}}let he=null;f&&f.subscribe&&(he=f.subscribe(()=>{try{q()}catch{}}));let ze=null;return l&&l.subscribe&&(ze=l.subscribe(()=>{try{q()}catch{}})),{async load(){r("load"),q()},clear(){Ze(),he&&(he(),he=null),ze&&(ze(),ze=null),t.replaceChildren(),y=[],$=[],A=[],C=[],F=[],U=[],E=new Map,D=new Map}}}function Rn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function lr(t,e){return t.filter(r=>{let n=Rn(r);return!(n&&e.has(n))})}async function za(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Vt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ha="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Kt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}var cr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function mo(t){let e=0;for(let r of cr)e+=Kt(t?.[r]);return e}function go(t){return!t||typeof t!="object"?!1:cr.some(e=>Number.isFinite(t[e]))}function Wa(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function dr(t){return go(t)?`\u03C4 ${Wa(mo(t))}`:null}function Ot(t){let e=dr(t);if(!e)return null;let r=t?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${e} \xB7 $${r.toFixed(2)}`:e}function ur(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${Kt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Kt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Kt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Kt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${mo(t).toLocaleString("en-US")}`,e.join(" \xB7 ")];return t.replayed&&r.push(Ha),r.join(`
`)}function Mt(t,e){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,i=!1;for(let l of Object.values(t||{})){if(!l||l.bead_id!==e)continue;let a=l.usage;if(go(a)){n+=1;for(let c of cr)r[c]=Kt(r[c])+Kt(a[c]);typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)&&(s+=a.total_cost_usd,o+=1),a.replayed===!0&&(i=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),i&&(r.replayed=!0),r)}var Ga={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},ja=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ya=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Nt(t){return!!t&&typeof t=="object"}function In(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function bo(t,e){let r=In(t),n=In(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Va(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>Nt(s)&&typeof s.text=="string"?s.text:"").join(""):Nt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Ka(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Ga[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=In(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=bo(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=bo(Nt(l)?l.old_string:"",Nt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function wo(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=ja.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Ya.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Za(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(Nt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(wo(o.text));else if(o.type==="tool_use"){let i=Ka(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(Nt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Va(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Xa(t){if(t.type==="item.completed"&&Nt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[wo(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Qa(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function ko(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!Nt(o))continue;let i=Qa(o)?Xa(o):Za(o,r);for(let l of i)e.push(l)}return e}var Ja=5;function el(t,e){if(typeof t!="number")return"";let r=Math.max(0,Math.floor((e-t)/1e3));return r<60?`${r}\uCD08 \uC804`:gt(t,e)}function Xr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=new Set,h=null,f=null;function _(){if(!o||!n)return[];let O=n.get(o);return ko(O?O.lines:[])}function y(){if(!o||!n)return null;let O=n.get(o),q=O?O.last_event_at:null;return typeof q=="number"?q:null}function $(){return i.status==="running"}function A(){if($()&&o){f||(f=setInterval(()=>v(),1e3));return}C()}function C(){f&&(clearInterval(f),f=null)}function F(O){let q=[],J=0;for(;J<O.length;){let Ce=O[J];if(Ce.kind==="tool"){let ie=J;for(;ie<O.length&&O[ie].kind==="tool"&&O[ie].tool===Ce.tool;)ie+=1;if(ie-J>=Ja&&!c.has(J)){q.push({kind:"group",idx:J,tool:Ce.tool||"",lines:O.slice(J,ie).map((Se,oe)=>({idx:J+oe,line:Se}))}),J=ie;continue}}q.push({kind:"line",idx:J,line:Ce}),J+=1}return q}function U(O){for(let q=O.length-1;q>=0;q-=1){let J=O[q];if(J.kind==="result"||J.kind==="error")return null;if(J.kind==="tool"&&!Object.hasOwn(J,"result"))return J}return null}function H(O,q){if(q.kind==="gate")return d`<div class="sv__gate">${q.text}</div>`;if(q.kind==="phase")return d`<div class="sv__phase">${q.text}</div>`;if(q.kind==="result")return d`<div
        class="sv__result${q.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${q.success?"\u2713":"\u2717"}
        ${q.text||(q.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(q.kind==="error")return d`<div class="sv__error">⛔ ${q.text}</div>`;if(q.kind==="blocker")return d`<div class="sv__error">⛔ ${q.text}</div>`;if(q.kind==="tool"){let J=a.has(O),Ce=q.tool==="Bash"?q.command:q.path||q.command||"";return d`<div
        class="sv__tool${J?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>G(O)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${q.icon}</span>
          <span class="sv__tool-name">${q.tool}</span>
          ${Ce?d`<span class="sv__tool-detail">${Ce}</span>`:""}
          ${typeof q.added=="number"?d`<span class="sv__diff-add">+${q.added}</span>`:""}
          ${typeof q.removed=="number"?d`<span class="sv__diff-del">−${q.removed}</span>`:""}
          ${q.result?d`<span class="sv__tool-ok">→ ${q.result}</span>`:""}
        </span>
        ${J?d`<pre class="sv__tool-expand">${P(q)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${q.text}</div>`}function P(O){let q=[];if(O.input!==void 0)try{q.push(`input: ${JSON.stringify(O.input,null,2)}`)}catch{}return typeof O.output=="string"&&O.output.length>0&&q.push(`output:
${O.output}`),q.join(`

`)}function T(){if(!o)return d``;let O=_(),q=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),J=i.session_id||"",Ce=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,ie=$(),Se=ie?el(y(),Date.now()):"",oe=ie?U(O):null;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${ie?d`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Se?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Se}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Se?d`<span class="sv__live-ago">${Se}</span>`:""}</span
            >`:""}
        ${J?d`<button
              type="button"
              class="sv__session"
              title=${J}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${J}`}
              @click=${()=>se(J)}
            >
              ⧉ ${J.slice(0,8)}
            </button>`:""}
        ${q?d`<span class="sv__meta">${q}</span>`:""}
        ${i.worktree?d`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Ce}
          @click=${K}
        >
          <span class="sv__follow-full">⇣ ${Ce}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>te()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${O.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:F(O).map(qe=>qe.kind==="group"?E(qe):H(qe.idx,qe.line))}
      </div>
      ${oe?d`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            <span class="sv__now-icon">${oe.icon}</span>
            <span class="sv__now-name">${oe.tool}</span>
            <span class="sv__now-detail"
              >${oe.tool==="Bash"?oe.command:oe.path||oe.command||""}</span
            >
          </div>`:""}
    </div>`}function E(O){return d`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>D(O.idx)}
    >
      <span class="sv__group-icon">${O.lines[0].line.icon}</span>
      <span class="sv__group-name">${O.tool}</span>
      <span class="sv__group-count">${O.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function D(O){c.add(O),v()}function v(){be(T(),t),A(),l&&W()}function W(){let O=t.querySelector(".sv__body");O&&(O.scrollTop=O.scrollHeight)}function G(O){a.has(O)?a.delete(O):a.add(O),v()}function K(){l=!l,v()}function se(O){Vt(O).then(q=>{q?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ee(O){!o||!O||(i={...i,...O},v())}function Me(O){let q=O.target;if(!q||!q.classList||!q.classList.contains("sv__body"))return;!(q.scrollHeight-q.scrollTop-q.clientHeight<=4)&&l&&(l=!1,v())}t.addEventListener("scroll",Me,!0);function ye(O){let q=O&&O.attempt_id;q&&(o=q,i=O.meta||{},l=!0,a.clear(),c.clear(),!h&&n&&(h=n.subscribe(v)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),v())}function te(){let O=o;o=null,a.clear(),c.clear(),C(),r&&O&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${O}`})).catch(()=>{}),be(d``,t),s&&s()}return{open:ye,updateMeta:Ee,close:te,isOpen(){return o!==null},destroy(){C(),h&&(h(),h=null),t.removeEventListener("scroll",Me,!0),o=null,be(d``,t)}}}function tl(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function yo(t,e){let r=tl(t);return d`
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
  `}var Ln=["opus","sonnet","haiku","fable"],Dn=["low","medium","high","xhigh"],On=["codex","opus","fable","self","skip"],Mn=["opus","fable","sonnet","haiku"],rl=["standard","fast_track"],Nn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Qr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Nn[t]||"(\uAE30\uBCF8)"}function vr(t,e,r,n,s,o){return d`
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
    ${vr("workflow_mode","workflow_mode",$r(rl),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Io,setPrototypeOf:$o,isFrozen:nl,getPrototypeOf:sl,getOwnPropertyDescriptor:ol}=Object,{freeze:ct,seal:bt,create:Hn}=Object,{apply:Wn,construct:Gn}=typeof Reflect<"u"&&Reflect;ct||(ct=function(e){return e});bt||(bt=function(e){return e});Wn||(Wn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Gn||(Gn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Jr=dt(Array.prototype.forEach),il=dt(Array.prototype.lastIndexOf),xo=dt(Array.prototype.pop),xr=dt(Array.prototype.push),al=dt(Array.prototype.splice),tn=dt(String.prototype.toLowerCase),Pn=dt(String.prototype.toString),Fn=dt(String.prototype.match),Sr=dt(String.prototype.replace),ll=dt(String.prototype.indexOf),cl=dt(String.prototype.trim),vt=dt(Object.prototype.hasOwnProperty),lt=dt(RegExp.prototype.test),Tr=dl(TypeError);function dt(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Wn(t,e,n)}}function dl(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Gn(t,r)}}function ue(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:tn;$o&&$o(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(nl(e)||(e[n]=o),s=o)}t[s]=!0}return t}function ul(t){for(let e=0;e<t.length;e++)vt(t,e)||(t[e]=null);return t}function Et(t){let e=Hn(null);for(let[r,n]of Io(t))vt(t,r)&&(Array.isArray(n)?e[r]=ul(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=Et(n):e[r]=n);return e}function Ar(t,e){for(;t!==null;){let n=ol(t,e);if(n){if(n.get)return dt(n.get);if(typeof n.value=="function")return dt(n.value)}t=sl(t)}function r(){return null}return r}var So=ct(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),qn=ct(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Bn=ct(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),pl=ct(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Un=ct(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),fl=ct(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),To=ct(["#text"]),Ao=ct(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),zn=ct(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Eo=ct(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),en=ct(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),hl=bt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),_l=bt(/<%[\w\W]*|[\w\W]*%>/gm),ml=bt(/\$\{[\w\W]*/gm),gl=bt(/^data-[\-\w.\u00B7-\uFFFF]+$/),bl=bt(/^aria-[\-\w]+$/),Lo=bt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),wl=bt(/^(?:\w+script|data):/i),kl=bt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Do=bt(/^html$/i),yl=bt(/^[a-z][.\w]*(-[.\w]+)+$/i),Co=Object.freeze({__proto__:null,ARIA_ATTR:bl,ATTR_WHITESPACE:kl,CUSTOM_ELEMENT:yl,DATA_ATTR:gl,DOCTYPE_NAME:Do,ERB_EXPR:_l,IS_ALLOWED_URI:Lo,IS_SCRIPT_OR_DATA:wl,MUSTACHE_EXPR:hl,TMPLIT_EXPR:ml}),Er={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},vl=function(){return typeof window>"u"?null:window},$l=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ro=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Oo(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:vl(),e=R=>Oo(R);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Er.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:h=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:f,DOMParser:_,trustedTypes:y}=t,$=a.prototype,A=Ar($,"cloneNode"),C=Ar($,"remove"),F=Ar($,"nextSibling"),U=Ar($,"childNodes"),H=Ar($,"parentNode");if(typeof i=="function"){let R=r.createElement("template");R.content&&R.content.ownerDocument&&(r=R.content.ownerDocument)}let P,T="",{implementation:E,createNodeIterator:D,createDocumentFragment:v,getElementsByTagName:W}=r,{importNode:G}=n,K=Ro();e.isSupported=typeof Io=="function"&&typeof H=="function"&&E&&E.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:se,ERB_EXPR:Ee,TMPLIT_EXPR:Me,DATA_ATTR:ye,ARIA_ATTR:te,IS_SCRIPT_OR_DATA:O,ATTR_WHITESPACE:q,CUSTOM_ELEMENT:J}=Co,{IS_ALLOWED_URI:Ce}=Co,ie=null,Se=ue({},[...So,...qn,...Bn,...Un,...To]),oe=null,qe=ue({},[...Ao,...zn,...Eo,...en]),fe=Object.seal(Hn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Be=null,Je=null,je=Object.seal(Hn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),wt=!0,Ve=!0,ht=!1,rt=!0,Ke=!1,Ze=!0,nt=!1,st=!1,Ie=!1,Ue=!1,Ye=!1,pt=!1,_t=!0,ot=!1,Ne="user-content-",Xe=!0,he=!1,ze={},L=null,N=ue({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Z=null,V=ue({},["audio","video","img","source","image","track"]),X=null,de=ue({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),pe="http://www.w3.org/1998/Math/MathML",_e="http://www.w3.org/2000/svg",re="http://www.w3.org/1999/xhtml",w=re,M=!1,x=null,Y=ue({},[pe,_e,re],Pn),Le=ue({},["mi","mo","mn","ms","mtext"]),u=ue({},["annotation-xml"]),b=ue({},["title","style","font","a","script"]),I=null,ne=["application/xhtml+xml","text/html"],ve="text/html",le=null,ke=null,Te=r.createElement("form"),He=function(p){return p instanceof RegExp||p instanceof Function},et=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ke&&ke===p)){if((!p||typeof p!="object")&&(p={}),p=Et(p),I=ne.indexOf(p.PARSER_MEDIA_TYPE)===-1?ve:p.PARSER_MEDIA_TYPE,le=I==="application/xhtml+xml"?Pn:tn,ie=vt(p,"ALLOWED_TAGS")?ue({},p.ALLOWED_TAGS,le):Se,oe=vt(p,"ALLOWED_ATTR")?ue({},p.ALLOWED_ATTR,le):qe,x=vt(p,"ALLOWED_NAMESPACES")?ue({},p.ALLOWED_NAMESPACES,Pn):Y,X=vt(p,"ADD_URI_SAFE_ATTR")?ue(Et(de),p.ADD_URI_SAFE_ATTR,le):de,Z=vt(p,"ADD_DATA_URI_TAGS")?ue(Et(V),p.ADD_DATA_URI_TAGS,le):V,L=vt(p,"FORBID_CONTENTS")?ue({},p.FORBID_CONTENTS,le):N,Be=vt(p,"FORBID_TAGS")?ue({},p.FORBID_TAGS,le):Et({}),Je=vt(p,"FORBID_ATTR")?ue({},p.FORBID_ATTR,le):Et({}),ze=vt(p,"USE_PROFILES")?p.USE_PROFILES:!1,wt=p.ALLOW_ARIA_ATTR!==!1,Ve=p.ALLOW_DATA_ATTR!==!1,ht=p.ALLOW_UNKNOWN_PROTOCOLS||!1,rt=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ke=p.SAFE_FOR_TEMPLATES||!1,Ze=p.SAFE_FOR_XML!==!1,nt=p.WHOLE_DOCUMENT||!1,Ue=p.RETURN_DOM||!1,Ye=p.RETURN_DOM_FRAGMENT||!1,pt=p.RETURN_TRUSTED_TYPE||!1,Ie=p.FORCE_BODY||!1,_t=p.SANITIZE_DOM!==!1,ot=p.SANITIZE_NAMED_PROPS||!1,Xe=p.KEEP_CONTENT!==!1,he=p.IN_PLACE||!1,Ce=p.ALLOWED_URI_REGEXP||Lo,w=p.NAMESPACE||re,Le=p.MATHML_TEXT_INTEGRATION_POINTS||Le,u=p.HTML_INTEGRATION_POINTS||u,fe=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&He(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(fe.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&He(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(fe.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(fe.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ke&&(Ve=!1),Ye&&(Ue=!0),ze&&(ie=ue({},To),oe=[],ze.html===!0&&(ue(ie,So),ue(oe,Ao)),ze.svg===!0&&(ue(ie,qn),ue(oe,zn),ue(oe,en)),ze.svgFilters===!0&&(ue(ie,Bn),ue(oe,zn),ue(oe,en)),ze.mathMl===!0&&(ue(ie,Un),ue(oe,Eo),ue(oe,en))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?je.tagCheck=p.ADD_TAGS:(ie===Se&&(ie=Et(ie)),ue(ie,p.ADD_TAGS,le))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?je.attributeCheck=p.ADD_ATTR:(oe===qe&&(oe=Et(oe)),ue(oe,p.ADD_ATTR,le))),p.ADD_URI_SAFE_ATTR&&ue(X,p.ADD_URI_SAFE_ATTR,le),p.FORBID_CONTENTS&&(L===N&&(L=Et(L)),ue(L,p.FORBID_CONTENTS,le)),Xe&&(ie["#text"]=!0),nt&&ue(ie,["html","head","body"]),ie.table&&(ue(ie,["tbody"]),delete Be.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw Tr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Tr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=p.TRUSTED_TYPES_POLICY,T=P.createHTML("")}else P===void 0&&(P=$l(y,s)),P!==null&&typeof T=="string"&&(T=P.createHTML(""));ct&&ct(p),ke=p}},ce=ue({},[...qn,...Bn,...pl]),tt=ue({},[...Un,...fl]),kt=function(p){let S=H(p);(!S||!S.tagName)&&(S={namespaceURI:w,tagName:"template"});let z=tn(p.tagName),Ae=tn(S.tagName);return x[p.namespaceURI]?p.namespaceURI===_e?S.namespaceURI===re?z==="svg":S.namespaceURI===pe?z==="svg"&&(Ae==="annotation-xml"||Le[Ae]):!!ce[z]:p.namespaceURI===pe?S.namespaceURI===re?z==="math":S.namespaceURI===_e?z==="math"&&u[Ae]:!!tt[z]:p.namespaceURI===re?S.namespaceURI===_e&&!u[Ae]||S.namespaceURI===pe&&!Le[Ae]?!1:!tt[z]&&(b[z]||!ce[z]):!!(I==="application/xhtml+xml"&&x[p.namespaceURI]):!1},We=function(p){xr(e.removed,{element:p});try{H(p).removeChild(p)}catch{C(p)}},Qe=function(p,S){try{xr(e.removed,{attribute:S.getAttributeNode(p),from:S})}catch{xr(e.removed,{attribute:null,from:S})}if(S.removeAttribute(p),p==="is")if(Ue||Ye)try{We(S)}catch{}else try{S.setAttribute(p,"")}catch{}},ae=function(p){let S=null,z=null;if(Ie)p="<remove></remove>"+p;else{let De=Fn(p,/^[\r\n\t ]+/);z=De&&De[0]}I==="application/xhtml+xml"&&w===re&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let Ae=P?P.createHTML(p):p;if(w===re)try{S=new _().parseFromString(Ae,I)}catch{}if(!S||!S.documentElement){S=E.createDocument(w,"template",null);try{S.documentElement.innerHTML=M?T:Ae}catch{}}let Ge=S.body||S.documentElement;return p&&z&&Ge.insertBefore(r.createTextNode(z),Ge.childNodes[0]||null),w===re?W.call(S,nt?"html":"body")[0]:nt?S.documentElement:Ge},me=function(p){return D.call(p.ownerDocument||p,p,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Tt=function(p){return p instanceof f&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof h)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},Rt=function(p){return typeof l=="function"&&p instanceof l};function it(R,p,S){Jr(R,z=>{z.call(e,p,S,ke)})}let It=function(p){let S=null;if(it(K.beforeSanitizeElements,p,null),Tt(p))return We(p),!0;let z=le(p.nodeName);if(it(K.uponSanitizeElement,p,{tagName:z,allowedTags:ie}),Ze&&p.hasChildNodes()&&!Rt(p.firstElementChild)&&lt(/<[/\w!]/g,p.innerHTML)&&lt(/<[/\w!]/g,p.textContent)||p.nodeType===Er.progressingInstruction||Ze&&p.nodeType===Er.comment&&lt(/<[/\w]/g,p.data))return We(p),!0;if(!(je.tagCheck instanceof Function&&je.tagCheck(z))&&(!ie[z]||Be[z])){if(!Be[z]&&m(z)&&(fe.tagNameCheck instanceof RegExp&&lt(fe.tagNameCheck,z)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(z)))return!1;if(Xe&&!L[z]){let Ae=H(p)||p.parentNode,Ge=U(p)||p.childNodes;if(Ge&&Ae){let De=Ge.length;for(let Pe=De-1;Pe>=0;--Pe){let mt=A(Ge[Pe],!0);mt.__removalCount=(p.__removalCount||0)+1,Ae.insertBefore(mt,F(p))}}}return We(p),!0}return p instanceof a&&!kt(p)||(z==="noscript"||z==="noembed"||z==="noframes")&&lt(/<\/no(script|embed|frames)/i,p.innerHTML)?(We(p),!0):(Ke&&p.nodeType===Er.text&&(S=p.textContent,Jr([se,Ee,Me],Ae=>{S=Sr(S,Ae," ")}),p.textContent!==S&&(xr(e.removed,{element:p.cloneNode()}),p.textContent=S)),it(K.afterSanitizeElements,p,null),!1)},qt=function(p,S,z){if(_t&&(S==="id"||S==="name")&&(z in r||z in Te))return!1;if(!(Ve&&!Je[S]&&lt(ye,S))){if(!(wt&&lt(te,S))){if(!(je.attributeCheck instanceof Function&&je.attributeCheck(S,p))){if(!oe[S]||Je[S]){if(!(m(p)&&(fe.tagNameCheck instanceof RegExp&&lt(fe.tagNameCheck,p)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(p))&&(fe.attributeNameCheck instanceof RegExp&&lt(fe.attributeNameCheck,S)||fe.attributeNameCheck instanceof Function&&fe.attributeNameCheck(S,p))||S==="is"&&fe.allowCustomizedBuiltInElements&&(fe.tagNameCheck instanceof RegExp&&lt(fe.tagNameCheck,z)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(z))))return!1}else if(!X[S]){if(!lt(Ce,Sr(z,q,""))){if(!((S==="src"||S==="xlink:href"||S==="href")&&p!=="script"&&ll(z,"data:")===0&&Z[p])){if(!(ht&&!lt(O,Sr(z,q,"")))){if(z)return!1}}}}}}}return!0},m=function(p){return p!=="annotation-xml"&&Fn(p,J)},g=function(p){it(K.beforeSanitizeAttributes,p,null);let{attributes:S}=p;if(!S||Tt(p))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:oe,forceKeepAttr:void 0},Ae=S.length;for(;Ae--;){let Ge=S[Ae],{name:De,namespaceURI:Pe,value:mt}=Ge,At=le(De),Qt=mt,Fe=De==="value"?Qt:cl(Qt);if(z.attrName=At,z.attrValue=Fe,z.keepAttr=!0,z.forceKeepAttr=void 0,it(K.uponSanitizeAttribute,p,z),Fe=z.attrValue,ot&&(At==="id"||At==="name")&&(Qe(De,p),Fe=Ne+Fe),Ze&&lt(/((--!?|])>)|<\/(style|title|textarea)/i,Fe)){Qe(De,p);continue}if(At==="attributename"&&Fn(Fe,"href")){Qe(De,p);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){Qe(De,p);continue}if(!rt&&lt(/\/>/i,Fe)){Qe(De,p);continue}Ke&&Jr([se,Ee,Me],Nr=>{Fe=Sr(Fe,Nr," ")});let Jt=le(p.nodeName);if(!qt(Jt,At,Fe)){Qe(De,p);continue}if(P&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!Pe)switch(y.getAttributeType(Jt,At)){case"TrustedHTML":{Fe=P.createHTML(Fe);break}case"TrustedScriptURL":{Fe=P.createScriptURL(Fe);break}}if(Fe!==Qt)try{Pe?p.setAttributeNS(Pe,De,Fe):p.setAttribute(De,Fe),Tt(p)?We(p):xo(e.removed)}catch{Qe(De,p)}}it(K.afterSanitizeAttributes,p,null)},j=function R(p){let S=null,z=me(p);for(it(K.beforeSanitizeShadowDOM,p,null);S=z.nextNode();)it(K.uponSanitizeShadowNode,S,null),It(S),g(S),S.content instanceof o&&R(S.content);it(K.afterSanitizeShadowDOM,p,null)};return e.sanitize=function(R){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},S=null,z=null,Ae=null,Ge=null;if(M=!R,M&&(R="<!-->"),typeof R!="string"&&!Rt(R))if(typeof R.toString=="function"){if(R=R.toString(),typeof R!="string")throw Tr("dirty is not a string, aborting")}else throw Tr("toString is not a function");if(!e.isSupported)return R;if(st||et(p),e.removed=[],typeof R=="string"&&(he=!1),he){if(R.nodeName){let mt=le(R.nodeName);if(!ie[mt]||Be[mt])throw Tr("root node is forbidden and cannot be sanitized in-place")}}else if(R instanceof l)S=ae("<!---->"),z=S.ownerDocument.importNode(R,!0),z.nodeType===Er.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?S=z:S.appendChild(z);else{if(!Ue&&!Ke&&!nt&&R.indexOf("<")===-1)return P&&pt?P.createHTML(R):R;if(S=ae(R),!S)return Ue?null:pt?T:""}S&&Ie&&We(S.firstChild);let De=me(he?R:S);for(;Ae=De.nextNode();)It(Ae),g(Ae),Ae.content instanceof o&&j(Ae.content);if(he)return R;if(Ue){if(Ye)for(Ge=v.call(S.ownerDocument);S.firstChild;)Ge.appendChild(S.firstChild);else Ge=S;return(oe.shadowroot||oe.shadowrootmode)&&(Ge=G.call(n,Ge,!0)),Ge}let Pe=nt?S.outerHTML:S.innerHTML;return nt&&ie["!doctype"]&&S.ownerDocument&&S.ownerDocument.doctype&&S.ownerDocument.doctype.name&&lt(Do,S.ownerDocument.doctype.name)&&(Pe="<!DOCTYPE "+S.ownerDocument.doctype.name+`>
`+Pe),Ke&&Jr([se,Ee,Me],mt=>{Pe=Sr(Pe,mt," ")}),P&&pt?P.createHTML(Pe):Pe},e.setConfig=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};et(R),st=!0},e.clearConfig=function(){ke=null,st=!1},e.isValidAttribute=function(R,p,S){ke||et({});let z=le(R),Ae=le(p);return qt(z,Ae,S)},e.addHook=function(R,p){typeof p=="function"&&xr(K[R],p)},e.removeHook=function(R,p){if(p!==void 0){let S=il(K[R],p);return S===-1?void 0:al(K[R],S,1)[0]}return xo(K[R])},e.removeHooks=function(R){K[R]=[]},e.removeAllHooks=function(){K=Ro()},e}var Mo=Oo();var No={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Po=t=>(...e)=>({_$litDirective$:t,values:e}),rn=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Cr=class extends rn{constructor(e){if(super(e),this.it=Oe,e.type!==No.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Oe||e==null)return this._t=void 0,this.it=e;if(e===Ht)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Cr.directiveName="unsafeHTML",Cr.resultType=1;var Fo=Po(Cr);function Kn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Xt=Kn();function Go(t){Xt=t}var Dr={exec:()=>null};function ge(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(ut.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var xl=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ut={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Sl=/^(?:[ \t]*(?:\n|$))+/,Tl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Al=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Or=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,El=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Zn=/(?:[*+-]|\d{1,9}[.)])/,jo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Yo=ge(jo).replace(/bull/g,Zn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Cl=ge(jo).replace(/bull/g,Zn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Xn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Rl=/^[^\n]+/,Qn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Il=ge(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Qn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ll=ge(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Zn).getRegex(),cn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Jn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Dl=ge("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Jn).replace("tag",cn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Vo=ge(Xn).replace("hr",Or).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cn).getRegex(),Ol=ge(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Vo).getRegex(),es={blockquote:Ol,code:Tl,def:Il,fences:Al,heading:El,hr:Or,html:Dl,lheading:Yo,list:Ll,newline:Sl,paragraph:Vo,table:Dr,text:Rl},qo=ge("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Or).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cn).getRegex(),Ml={...es,lheading:Cl,table:qo,paragraph:ge(Xn).replace("hr",Or).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",qo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cn).getRegex()},Nl={...es,html:ge(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Jn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Dr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ge(Xn).replace("hr",Or).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Yo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Pl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Fl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ko=/^( {2,}|\\)\n(?!\s*$)/,ql=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,dn=/[\p{P}\p{S}]/u,ts=/[\s\p{P}\p{S}]/u,Zo=/[^\s\p{P}\p{S}]/u,Bl=ge(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ts).getRegex(),Xo=/(?!~)[\p{P}\p{S}]/u,Ul=/(?!~)[\s\p{P}\p{S}]/u,zl=/(?:[^\s\p{P}\p{S}]|~)/u,Hl=ge(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",xl?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Qo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Wl=ge(Qo,"u").replace(/punct/g,dn).getRegex(),Gl=ge(Qo,"u").replace(/punct/g,Xo).getRegex(),Jo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",jl=ge(Jo,"gu").replace(/notPunctSpace/g,Zo).replace(/punctSpace/g,ts).replace(/punct/g,dn).getRegex(),Yl=ge(Jo,"gu").replace(/notPunctSpace/g,zl).replace(/punctSpace/g,Ul).replace(/punct/g,Xo).getRegex(),Vl=ge("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zo).replace(/punctSpace/g,ts).replace(/punct/g,dn).getRegex(),Kl=ge(/\\(punct)/,"gu").replace(/punct/g,dn).getRegex(),Zl=ge(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Xl=ge(Jn).replace("(?:-->|$)","-->").getRegex(),Ql=ge("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Xl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),on=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Jl=ge(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",on).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ei=ge(/^!?\[(label)\]\[(ref)\]/).replace("label",on).replace("ref",Qn).getRegex(),ti=ge(/^!?\[(ref)\](?:\[\])?/).replace("ref",Qn).getRegex(),ec=ge("reflink|nolink(?!\\()","g").replace("reflink",ei).replace("nolink",ti).getRegex(),Bo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,rs={_backpedal:Dr,anyPunctuation:Kl,autolink:Zl,blockSkip:Hl,br:Ko,code:Fl,del:Dr,emStrongLDelim:Wl,emStrongRDelimAst:jl,emStrongRDelimUnd:Vl,escape:Pl,link:Jl,nolink:ti,punctuation:Bl,reflink:ei,reflinkSearch:ec,tag:Ql,text:ql,url:Dr},tc={...rs,link:ge(/^!?\[(label)\]\((.*?)\)/).replace("label",on).getRegex(),reflink:ge(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",on).getRegex()},jn={...rs,emStrongRDelimAst:Yl,emStrongLDelim:Gl,url:ge(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Bo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ge(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Bo).getRegex()},rc={...jn,br:ge(Ko).replace("{2,}","*").getRegex(),text:ge(jn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},nn={normal:es,gfm:Ml,pedantic:Nl},Rr={normal:rs,gfm:jn,breaks:rc,pedantic:tc},nc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Uo=t=>nc[t];function Ct(t,e){if(e){if(ut.escapeTest.test(t))return t.replace(ut.escapeReplace,Uo)}else if(ut.escapeTestNoEncode.test(t))return t.replace(ut.escapeReplaceNoEncode,Uo);return t}function zo(t){try{t=encodeURI(t).replace(ut.percentDecode,"%")}catch{return null}return t}function Ho(t,e){let r=t.replace(ut.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(ut.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(ut.slashPipe,"|");return n}function Ir(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function sc(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Wo(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function oc(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var an=class{constructor(t){xe(this,"options");xe(this,"rules");xe(this,"lexer");this.options=t||Xt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Ir(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=oc(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Ir(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Ir(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Ir(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),h=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${h}`:h;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,o,!0),this.lexer.state.top=f,r.length===0)break;let _=o.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let y=_,$=y.raw+`
`+r.join(`
`),A=this.blockquote($);o[o.length-1]=A,n=n.substring(0,n.length-y.raw.length)+A.raw,s=s.substring(0,s.length-y.text.length)+A.text;break}else if(_?.type==="list"){let y=_,$=y.raw+`
`+r.join(`
`),A=this.list($);o[o.length-1]=A,n=n.substring(0,n.length-_.raw.length)+A.raw,s=s.substring(0,s.length-y.raw.length)+A.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",h="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let f=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,A=>" ".repeat(3*A.length)),_=t.split(`
`,1)[0],y=!f.trim(),$=0;if(this.options.pedantic?($=2,h=f.trimStart()):y?$=e[1].length+1:($=e[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,h=f.slice($),$+=e[1].length),y&&this.rules.other.blankLine.test(_)&&(c+=_+`
`,t=t.substring(_.length+1),a=!0),!a){let A=this.rules.other.nextBulletRegex($),C=this.rules.other.hrRegex($),F=this.rules.other.fencesBeginRegex($),U=this.rules.other.headingBeginRegex($),H=this.rules.other.htmlBeginRegex($);for(;t;){let P=t.split(`
`,1)[0],T;if(_=P,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),T=_):T=_.replace(this.rules.other.tabCharGlobal,"    "),F.test(_)||U.test(_)||H.test(_)||A.test(_)||C.test(_))break;if(T.search(this.rules.other.nonSpaceChar)>=$||!_.trim())h+=`
`+T.slice($);else{if(y||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||F.test(f)||U.test(f)||C.test(f))break;h+=`
`+_}!y&&!_.trim()&&(y=!0),c+=P+`
`,t=t.substring(P.length+1),f=T.slice($)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let h={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=h.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=h.raw+a.tokens[0].raw,a.tokens[0].text=h.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(h)):a.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):a.tokens.unshift(h)}}if(!s.loose){let c=a.tokens.filter(f=>f.type==="space"),h=c.length>0&&c.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=h}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Ho(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Ho(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Ir(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=sc(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Wo(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Wo(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let h=[...n[0]][0].length,f=t.slice(0,s+n.index+h+i);if(Math.min(s,i)%2){let y=f.slice(1,-1);return{type:"em",raw:f,text:y,tokens:this.lexer.inlineTokens(y)}}let _=f.slice(2,-2);return{type:"strong",raw:f,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},$t=class Yn{constructor(e){xe(this,"tokens");xe(this,"options");xe(this,"state");xe(this,"inlineQueue");xe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Xt,this.options.tokenizer=this.options.tokenizer||new an,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:ut,block:nn.normal,inline:Rr.normal};this.options.pedantic?(r.block=nn.pedantic,r.inline=Rr.pedantic):this.options.gfm&&(r.block=nn.gfm,this.options.breaks?r.inline=Rr.breaks:r.inline=Rr.gfm),this.tokenizer.rules=r}static get rules(){return{block:nn,inline:Rr}}static lex(e,r){return new Yn(r).lex(e)}static lexInline(e,r){return new Yn(r).inlineTokens(e)}lex(e){e=e.replace(ut.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(ut.tabCharGlobal,"    ").replace(ut.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(h=>(a=h.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let h=r.at(-1);a.type==="text"&&h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let h=1/0,f=e.slice(1),_;this.options.extensions.startInline.forEach(y=>{_=y.call({lexer:this},f),typeof _=="number"&&_>=0&&(h=Math.min(h,_))}),h<1/0&&h>=0&&(c=e.substring(0,h+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let h=r.at(-1);h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(e){let h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return r}},ln=class{constructor(t){xe(this,"options");xe(this,"parser");this.options=t||Xt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(ut.notSpaceStart)?.[0],s=t.replace(ut.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${Ct(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=zo(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+Ct(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=zo(t);if(s===null)return Ct(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${Ct(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:Ct(t.text)}},ns=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},xt=class Vn{constructor(e){xe(this,"options");xe(this,"renderer");xe(this,"textRenderer");this.options=e||Xt,this.options.renderer=this.options.renderer||new ln,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ns}static parse(e,r){return new Vn(r).parse(e)}static parseInline(e,r){return new Vn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},sn,Lr=(sn=class{constructor(t){xe(this,"options");xe(this,"block");this.options=t||Xt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?$t.lex:$t.lexInline}provideParser(){return this.block?xt.parse:xt.parseInline}},xe(sn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),xe(sn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),sn),ic=class{constructor(...t){xe(this,"defaults",Kn());xe(this,"options",this.setOptions);xe(this,"parse",this.parseMarkdown(!0));xe(this,"parseInline",this.parseMarkdown(!1));xe(this,"Parser",xt);xe(this,"Renderer",ln);xe(this,"TextRenderer",ns);xe(this,"Lexer",$t);xe(this,"Tokenizer",an);xe(this,"Hooks",Lr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new ln(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let h=l.apply(s,c);return h===!1&&(h=a.apply(s,c)),h||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new an(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let h=l.apply(s,c);return h===!1&&(h=a.apply(s,c)),h}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Lr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Lr.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Lr.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await l.call(s,c);return a.call(s,f)})();let h=l.call(s,c);return a.call(s,h)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(s,c);return f===!1&&(f=await a.apply(s,c)),f})();let h=l.apply(s,c);return h===!1&&(h=a.apply(s,c)),h}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return $t.lex(t,e??this.defaults)}parser(t,e){return xt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?$t.lex:$t.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?xt.parse:xt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?$t.lex:$t.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?xt.parse:xt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+Ct(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Zt=new ic;function we(t,e){return Zt.parse(t,e)}we.options=we.setOptions=function(t){return Zt.setOptions(t),we.defaults=Zt.defaults,Go(we.defaults),we};we.getDefaults=Kn;we.defaults=Xt;we.use=function(...t){return Zt.use(...t),we.defaults=Zt.defaults,Go(we.defaults),we};we.walkTokens=function(t,e){return Zt.walkTokens(t,e)};we.parseInline=Zt.parseInline;we.Parser=xt;we.parser=xt.parse;we.Renderer=ln;we.TextRenderer=ns;we.Lexer=$t;we.lexer=$t.lex;we.Tokenizer=an;we.Hooks=Lr;we.parse=we;var Bu=we.options,Uu=we.setOptions,zu=we.use,Hu=we.walkTokens,Wu=we.parseInline;var Gu=xt.parse,ju=$t.lex;function ri(t){let e=we.parse(t),r=Mo.sanitize(e);return Fo(r)}function ac(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function ni(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a($){$.key==="Escape"&&s&&($.preventDefault(),_())}document.addEventListener("keydown",a);function c(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>_()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${ac(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>_()}
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
    `:d``}function h(){be(c(),t)}async function f($){s=$,o="loading",i="",l="",h();let A=r?r():"";if(!A){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",h();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",h();return}let C="/api/doc?workspace="+encodeURIComponent(A)+"&path="+encodeURIComponent($);try{let F=await n(C),U=await F.json().catch(()=>({}));if(!F.ok||!U||U.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(U&&U.error||F.status)+")",h();return}i=String(U.content||""),o="ready",h()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",h()}}function _(){s=null,be(d``,t)}function y(){document.removeEventListener("keydown",a),_()}return{open:f,close:_,destroy:y}}var lc=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],si="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function cc(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function dc(t){let e=dr(t);if(!e||!t)return"";let r=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?` \xB7 $${t.total_cost_usd.toFixed(2)}`:"";return d`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${e.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${t.replayed?d`<span class="detail-usage-partial" title=${si}
          >부분 집계</span
        >`:""}`}function uc(t){let e=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?t.total_cost_usd:null;return d`<div class="detail-session__usage-detail">
    ${lc.map(r=>d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${cc(t[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${e===null?"":d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${e.toFixed(2)}</span
          ></span
        >`}
    ${t.replayed?d`<span class="detail-session__usage-note">${si}</span>`:""}
  </div>`}var pc={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function fc(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function oi(t,e={},r={}){let n=Array.isArray(t)?t:[],s=r.expanded||new Set;if(n.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let c of n)c&&typeof c.resumed_from=="string"&&c.resumed_from.length>0&&o.add(c.resumed_from);let i=c=>{if(!(c.status==="failed"||c.status==="orphaned"))return"";let f=typeof c.session_id=="string"&&c.session_id.length>0,_=o.has(c.attempt_id),y=f&&!_,$=f?_?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${c.attempt_id}
      ?disabled=${!y}
      title=${$}
      @click=${A=>{A.stopPropagation(),y&&e.onResume&&e.onResume(c.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=c=>{if(!(c.status==="failed"||c.status==="orphaned")||typeof c.cause!="string"||c.cause==="")return"";let f=c.cause_detail,_=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:c.cause;return d`<div class="detail-session__cause" title=${_}>
      ${c.cause}
    </div>`},a=c=>{if(!dr(c.usage))return"";let h=s.has(c.attempt_id);return d`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${c.attempt_id}
      aria-expanded=${h?"true":"false"}
      title=${h?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${f=>{f.stopPropagation(),e.onToggleUsage&&e.onToggleUsage(c.attempt_id)}}
    >
      τ 자세히
    </button>`};return d`
    <div class="detail-section-label">
      세션 이력${dc(r.total)}
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
                >${pc[c.status||""]||"\xB7"}</span
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
                >${fc(c.started_at)}</span
              >
            </button>
            ${a(c)} ${i(c)} ${l(c)}
            ${s.has(c.attempt_id)&&c.usage?uc(c.usage):""}
          </div>`)}
    </div>
  `}var hc=["open","in_progress","deferred","resolved","closed"],_c=[0,1,2,3,4];function ii(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,h={},f=!1,_=!1,y="",$="",A="";function C(){f=!1,_=!1,y="",$="",A=""}let F=document.createElement("div");F.className="md-viewer-root",document.body.appendChild(F);let U=ni(F,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),H=document.createElement("div");H.className="session-log-root",document.body.appendChild(H);let P=Xr(H,{transport:s?(w,M)=>Promise.resolve(s(w,M)):void 0,sessionLogStore:l});function T(){if(!i||!a)return[];let w=i.get();return(w&&w.attempts?Object.values(w.attempts):[]).filter(x=>x&&x.bead_id===a).sort((x,Y)=>(Y.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null,usage:x.usage||null}))}function E(){if(!i||!a)return null;let w=i.get();return Mt(w&&w.attempts||{},a)}let D=new Set;function v(w){D.has(w)?D.delete(w):D.add(w),re()}function W(w){let M=i?i.get():null,x=M&&M.attempts?M.attempts[w]:null;P.open({attempt_id:w,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}async function G(w){if(!s||!w)return;let M=()=>{let Y=i?i.get():null;return Y&&typeof Y.revision=="number"?Y.revision:0},x=await s("worker-attempt-resume",{attempt_id:w,expected_revision:M()});if(x&&x.conflict){let Y=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:M();x=await s("worker-attempt-resume",{attempt_id:w,expected_revision:Y})}x&&x.resumed===!1&&!x.conflict&&x.reason&&ee(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let K={onOpen:W,onResume:G,onToggleUsage:v};function se(){let w=i?i.get():null,M=w&&w.exec_defaults;return M&&typeof M=="object"?M:{}}let Ee=null;r&&r.subscribe&&(Ee=r.subscribe(()=>te()));let Me=null;i&&typeof i.subscribe=="function"&&(Me=i.subscribe(()=>{a&&re()}));function ye(w){w.key==="Escape"&&a&&(w.preventDefault(),n())}document.addEventListener("keydown",ye);function te(){if(a){if(r&&typeof r.snapshotFor=="function"){let w=r.snapshotFor("detail:"+a)||[];c=w.find(x=>x&&x.id===a)||w[0]||c}re()}}function O(w){Vt(w).then(M=>{M?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function q(w){w.preventDefault(),w.stopPropagation(),a&&O(a)}function J(w,M){w.preventDefault(),w.stopPropagation(),O(M)}function Ce(w,M){w.preventDefault(),w.stopPropagation(),U.open(M)}function ie(w,M){h[w]=M,re(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:w,value:M})).catch(()=>{ee("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Se(w,M,x){if(!s||!a)return!1;try{let Y=await Promise.resolve(s(w,M)),Le=Array.isArray(Y)?Y[0]:Y;return Le&&typeof Le=="object"&&Le.id?(c=Le,!0):(ee(x,"error"),!1)}catch{return ee(x,"error"),!1}}function oe(w){setTimeout(()=>{try{let M=t.querySelector(w);M&&typeof M.focus=="function"&&M.focus()}catch{}},0)}function qe(){f=!0,y=c&&c.title||"",re(),oe('.detail-edit__input[data-edit="title"]')}function fe(w){y=w.target.value}function Be(){f=!1,y="",re()}function Je(){Se("edit-text",{id:a,field:"title",value:y},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(M=>{M&&(f=!1,y=""),re()})}function je(){_=!0,$=c&&c.description||"",re(),oe('.detail-edit__textarea[data-edit="description"]')}function wt(w){$=w.target.value}function Ve(){_=!1,$="",re()}function ht(){Se("edit-text",{id:a,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(M=>{M&&(_=!1,$=""),re()})}function rt(w,M,x,Y){if(w.key==="Escape"){w.stopPropagation(),x();return}w.key==="Enter"&&(!Y||w.ctrlKey||w.metaKey)&&(w.preventDefault(),M())}function Ke(w){let M=w.target.value;Se("update-status",{id:a,status:M},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>re())}function Ze(w){let M=Number(w.target.value);Se("update-priority",{id:a,priority:M},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>re())}function nt(w){A=w.target.value}function st(){let w=A.trim();w.length!==0&&Se("label-add",{id:a,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(M=>{M&&(A=""),re()})}function Ie(w){if(w.key==="Escape"){w.stopPropagation(),A="",re();return}w.key==="Enter"&&(w.preventDefault(),st())}function Ue(w){Se("label-remove",{id:a,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>re())}let Ye={onCopyPath:J,onOpenDoc:Ce},pt={onChange:ie};function _t(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function ot(w){switch(w&&typeof w=="object"?String(w.dependency_type||w.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ne(w){let x=(Array.isArray(w.dependencies)?w.dependencies:[]).map(Y=>({id:_t(Y),icon:ot(Y)})).filter(Y=>Y.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${x.map(Y=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Y.id)}
                  >
                    ${Y.icon?`${Y.icon} `:""}${Y.id}
                  </button>`:d`<span class="detail-dep"
                    >${Y.icon?`${Y.icon} `:""}${Y.id}</span
                  >`)}
          </div>`}
    `}function Xe(w){let M=w.metadata||{},x=w.workflow||{},Y=x.stages||{},Le=Y.spec&&Y.spec.stale,u=Y.impl&&Y.impl.stale,b=x.route_source==="derived",I=x.route||M.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${b?" detail-kv__v--derived":""}"
          title=${b?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${b&&x.route?`${I} ? (\uCD94\uB860)`:I}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${M.spec_review||"\uC5C6\uC74C"}${Le?" \xB7 stale":""}</span
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
    `}let he={route:["spec_backed","full_plan"]};async function ze(w,M){let x=M.target.value;if(w==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){re();return}await Se("update-workflow-meta",{id:a,key:w,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),re()}function L(w){let M=w.metadata||{};return d` ${((Y,Le)=>{let u=he[Y],b=typeof M[Y]=="string"?M[Y]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${Y}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Y}
          data-edit=${`wfmeta-${Y}`}
          @change=${I=>ze(Y,I)}
        >
          <option value="" ?selected=${!u.includes(b)}>
            ${Le}
          </option>
          ${u.map(I=>d`<option value=${I} ?selected=${b===I}>${I}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function N(w){return f?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${y}
            @input=${fe}
            @keydown=${M=>rt(M,Je,Be,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Je}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Be}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${qe}
        >
          ✎
        </button>
      </div>
    `}function Z(w){let M=at(w.created_at),x=at(w.updated_at);return!M&&!x?d``:d`
      ${M?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${M}</span>
          </div>`:""}
      ${x?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function V(w,M){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ke}
        >
          ${hc.map(x=>d`<option value=${x} ?selected=${x===w}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Ze}
        >
          ${_c.map(x=>d`<option value=${String(x)} ?selected=${x===M}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function X(w){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${_?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${je}
            >
              ✎
            </button>`}
      </div>
      ${_?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${wt}
              @keydown=${M=>rt(M,ht,Ve,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ht}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ve}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function de(w){let M=typeof w.notes=="string"?w.notes:"";return M.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${M}</div>
    `}function pe(w){let M=Array.isArray(w.labels)?w.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${M.map(x=>d`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>Ue(x)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${A}
            @input=${nt}
            @keydown=${Ie}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${st}
          >
            추가
          </button>
        </span>
      </div>
    `}function _e(){if(!a)return d``;let w=c||{},M=String(w.id||a),x=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Y=w.status||"open",Le=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",u=w.description||"",b={...w,metadata:{...w.metadata||{},...h}};return d`
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
            @click=${q}
          >
            ${M}
          </button>
          ${N(x)} ${V(Y,Le)}
          ${Z(w)} ${X(u)}
          ${de(w)} ${pe(w)} ${Ne(w)}
          ${Xe(w)} ${L(w)}
          ${yo(w,Ye)}
          ${vo(b,pt,se())}
          ${oi(T(),K,{total:E(),expanded:D})}
        </div>
      </div>
    `}function re(){be(_e(),t)}return{load(w){w!==a&&(h={},C()),a=w,c=null,te()},clear(){a=null,c=null,h={},C(),U.close(),P.close(),be(d``,t)},destroy(){Ee&&(Ee(),Ee=null),Me&&(Me(),Me=null),document.removeEventListener("keydown",ye),U.destroy(),F.parentNode&&F.parentNode.removeChild(F),P.destroy(),H.parentNode&&H.parentNode.removeChild(H),a=null,c=null,be(d``,t)}}}var mc=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ai(t,e){return Cn(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function gc(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function li(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(E){let D=r.get();if(D)try{let v=await n("display-policy-set",{expected_revision:D.revision,policy:E(D)});a(v),v&&v.conflict&&v.policy&&(v=await n("display-policy-set",{expected_revision:v.policy.revision,policy:E(v.policy)}),a(v)),v&&v.conflict&&ee("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ee("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(E){E&&E.policy&&typeof E.policy=="object"&&r.set(E.policy)}function c(E){let D=r.get();if(!D)return;let v=ai(E,D)!=="shown";l(W=>gc(E,W,v))}function h(){let E=i.trim();E.length!==0&&(i="",l(D=>D.hidden_prefixes.includes(E)?{hidden_prefixes:D.hidden_prefixes}:{hidden_prefixes:[...D.hidden_prefixes,E]}),C())}function f(E){l(D=>({hidden_prefixes:D.hidden_prefixes.filter(v=>v!==E)}))}function _(E){let D=r.get();if(!D)return;let v=D.chips[E]===!1;l(()=>({chips:{[E]:v}}))}function y(E){let D=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${D.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${D.map(v=>{let W=ai(v,E);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${W}`}
                  data-label=${v}
                  data-state=${W}
                  @click=${()=>c(v)}
                >
                  ${v}
                </button>`})}
            </div>`}
      </section>
    `}function $(E){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${E.hidden_prefixes.map(D=>d`<span class="display-settings__prefix">
                ${D}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${D} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>f(D)}
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
            @input=${D=>{i=String(D.target.value||"")}}
          />
          <button type="button" @click=${h}>추가</button>
        </div>
      </section>
    `}function A(E){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${mc.map(([D,v])=>d`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${D}
                  .checked=${E.chips[D]!==!1}
                  @change=${()=>_(D)}
                />
                <span>${v}</span>
              </label>`)}
        </div>
      </section>
    `}function C(){let E=r.get();be(d`
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
            ${E?d`${y(E)} ${$(E)}
                ${A(E)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let F=!1,U=()=>{F=!1};o.addEventListener("close",U),o.addEventListener("cancel",U);let H=null;r.subscribe&&(H=r.subscribe(()=>{F&&C()}));function P(){F||(i="",F=!0,C(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function T(){F&&(F=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:P,close:T,destroy(){F=!1,o.removeEventListener("close",U),o.removeEventListener("cancel",U),H&&(H(),H=null),o.remove()}}}function ci(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,h,f="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=h||"An unrecoverable error occurred.");let _=typeof f=="string"?f.trim():"";if(s&&(_.length>0?(s.textContent=_,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function pr(t){let e=gt(t.created_at),r=gt(t.updated_at);return!e&&!r?"":d`<div class="worker-mini__meta">
    ${e?d`<span title=${`\uC0DD\uC131 ${at(t.created_at)}`}
          >생성 ${e}</span
        >`:""}${e&&r?d`<span>·</span>`:""}${r?d`<span title=${`\uC218\uC815 ${at(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function ss(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Ot(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait"||!!t.revise_action,i=t.lane==="done"&&!o,l=i?gt(t.done_at):"",a=e?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",c=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,h=d`<span class="worker-mini__title">${t.title}</span>`,f=t.pr_url&&t.pr_number?d`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",_=r.map(T=>T===t.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${T}</span
        >`:d`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${T}</span
        >`),y=t.reason?d`<span class="worker-mini__reason">${t.reason}</span>`:"",$=n?d`<span class="worker-usage" title=${ur(t.usage)}
        >${n}</span
      >`:"",A=s?d`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",C=t.merge_action?d`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${t.id}
        ?disabled=${t.merge_enabled===!1}
        title=${t.merge_title||""}
      >
        ${t.merge_label||"\uBA38\uC9C0"}
      </button>`:"",F=t.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${t.id}
        ?disabled=${t.cancel_enabled===!1}
        title=${t.cancel_title||""}
      >
        취소
      </button>`:"",U=t.discard_action?d`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",H=t.revise_action?d`<button
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
        </button>`:"",P=!!(n||s||t.merge_action||t.cancel_action||t.discard_action||t.revise_action);return d`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${t.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${i?d`<div class="worker-mini__row1">${c}${h}</div>
          <div class="worker-mini__row2">
            ${$}${l?d`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${at(t.done_at)}`}
                  >완료 ${l}</span
                >`:""}${_}${A}
            <span class="worker-mini__actions"
              >${C}${F}${U}</span
            >
            ${pr(t)}
          </div>`:o?d`<div class="worker-mini__head">
              ${a}${c}${f}${_}${y}
            </div>
            <div class="worker-mini__body">${h}</div>
            ${P?d`<div class="worker-mini__foot">
                  ${$}${A}
                  <span class="worker-mini__actions"
                    >${C}${F}${U}${H}</span
                  >
                </div>`:""}
            ${pr(t)}`:d`<div class="worker-mini__line">
              ${a}${c}${h}${f}${_}${y}${$}${A}${C}${F}${U}
            </div>
            ${pr(t)}`}
  </div>`}function bc(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return d`<div
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
    ${pr(t)}
  </div>`}function Pt(t){let e=!!t.collapsible&&!!t.collapsed,r=d`<span
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
                  </div>`:t.items.map(n=>t.lane==="candidate"?bc(n):ss(n))}
          </div>`}
  </section>`}var di=160;function os(t){return t.length>di?`${t.slice(0,di)}\u2026`:t}function wc(t){return!t||!t.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?d` · <code>${os(t.command)}</code>`:""}
  </div>`}function kc(t){return t?d`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function yc(t){return t?d`<div class="worker-banner__log-path">
    전체 로그: <code>${t}</code>
  </div>`:""}function is(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function vc(t){if(!t||!t.reason)return"";let e=t.reason.startsWith("export_removal_failed:");return d`<div
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
          ${wc(t.failure.cause_detail)}
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
          ${yc(r.log_path)} ${kc(r.output_tail)}
        </div>`)}
    ${vc(t.shipFailure)}
  </div>`}function $c(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?is(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Ot(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.base_exception||null,c=t.attempt_id&&t.attempt_id===r;return d`<div
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
    ${pr(t)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function as(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>$c(s,e,r))}
  </div>`}var xc=6e4,pi=[{lane:"running",title:"\uC2E4\uD589\uC911"},{lane:"pr_wait",title:"PR \uB300\uAE30"},{lane:"queue",title:"\uB300\uAE30"},{lane:"done",title:"\uC644\uB8CC\xB7\uC624\uB298"}],Sc={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Tc=new Set(["auto_merge","merged","merge","done"]);function Ac(t,e){if(typeof t!="number"||!Number.isFinite(t))return"";let n=e-t<xc,s=`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${at(t)}`;return d`<span
    class="mon-row__beat${n?" mon-row__beat--live":""}"
    title=${s}
    ><span class="mon-row__beat-dot" aria-hidden="true"></span>${n?"":d`<span class="mon-row__beat-age"
          >${gt(t,e)}</span
        >`}</span
  >`}function Ec(t,e){if(t.lane==="running"){let o=typeof t.started_at=="number"?is(e-t.started_at):"",i=Ot(t.usage);return d`<span class="mon-row__live">
      ${Ac(t.last_event_at,e)}
      ${o?d`<span class="mon-row__elapsed">${o}</span>`:""}
      ${t.model?d`<span class="mon-row__model">${t.model}</span>`:""}
      ${i?d`<span class="worker-usage" title=${ur(t.usage)}
            >${i}</span
          >`:""}
    </span>`}if(t.lane==="pr_wait")return d`<span class="mon-row__live">
      ${t.external?d`<span class="mon-row__chip">외부 PR</span>`:""}
      ${typeof t.pr_number=="number"?d`<span class="mon-row__pr">#${t.pr_number}</span>`:""}
    </span>`;if(t.lane==="queue")return d`<span class="mon-row__live">
      ${typeof t.queue_position=="number"?d`<span class="mon-row__pos">#${t.queue_position}</span>`:""}
    </span>`;let r=t.done_kind||"",n=r?Sc[r]||r:"",s=Tc.has(r);return d`<span class="mon-row__live">
    ${n?d`<span
          class="mon-row__kind${s?" mon-row__kind--ok":" mon-row__kind--warn"}"
          >${n}</span
        >`:""}
    ${typeof t.done_at=="number"?d`<span
          class="mon-row__done-at"
          title=${`\uC644\uB8CC ${at(t.done_at)}`}
          >${gt(t.done_at,e)}</span
        >`:""}
  </span>`}function Cc(t,e){return d`<div
    class="mon-row mon-row--${t.lane}"
    data-issue-id=${t.id}
    data-root-dir=${t.root_dir}
    role="listitem"
  >
    <span class="mon-row__spine" aria-hidden="true"></span>
    <span class="mon-row__repo" title=${t.root_dir}
      >${t.workspace_name}</span
    >
    <button type="button" class="mon-row__id" title="상세 열기">
      ${t.id}
    </button>
    <span class="mon-row__title">${t.title||t.id}</span>
    ${Ec(t,e)}
  </div>`}function Rc(t,e){return d`<section
    class="mon-group mon-group--${t.lane}"
    id=${`monitor-${t.lane}`}
  >
    <header class="mon-group__hd">
      <span class="mon-group__title">${t.title}</span>
      <span class="mon-group__count">${t.items.length}</span>
    </header>
    <div class="mon-group__list" role="list">
      ${t.items.map(r=>Cc(r,e))}
    </div>
  </section>`}function fi(t,e=Date.now()){let r=(Array.isArray(t)?t:[]).filter(n=>n.items.length>0);return r.length===0?d`<div class="mon-group__empty">진행 중인 워커 작업 없음</div>`:d`<div class="mon-pipeline">
    ${r.map(n=>Rc(n,e))}
  </div>`}var hi="tab:monitor:pipeline",Ic=1e3;function Lc(t,e){let r=null,n=-1/0;for(let s of Object.values(t)){if(!s||s.bead_id!==e||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Dc(t){let e=new Map;for(let r of Object.values(t)){if(!r||r.status!=="running")continue;let n=r.bead_id;if(typeof n!="string"||n.length===0)continue;let s=typeof r.started_at=="number"?r.started_at:null,o=e.get(n);o&&(o.started_at??0)>(s??0)||e.set(n,{started_at:s,last_event_at:typeof r.last_event_at=="number"?r.last_event_at:null,model:typeof r.model=="string"?r.model:null,usage:Mt(t,n)})}return e}function Oc(t){let e={running:[],pr_wait:[],queue:[],done:[]};for(let r of Array.isArray(t)?t:[]){if(!r||typeof r.root_dir!="string")continue;let n=r.root_dir,s=r.name||n,o=r.attempts||{},i=r.bead_titles||{},l=r.pr_observations||{},a=f=>({id:f,title:i[f]||f,root_dir:n,workspace_name:s}),c=new Set;for(let[f,_]of Dc(o))c.add(f),e.running.push({...a(f),lane:"running",started_at:_.started_at,last_event_at:_.last_event_at,model:_.model,usage:_.usage});for(let f of Array.isArray(r.pr_wait)?r.pr_wait:[]){let _=f&&f.bead_id;if(typeof _!="string"||c.has(_))continue;c.add(_);let y=l[_]&&l[_].pr;e.pr_wait.push({...a(_),lane:"pr_wait",pr_number:y&&typeof y.number=="number"?y.number:null,external:f.external===!0})}let h=Array.isArray(r.queue)?r.queue:[];for(let f=0;f<h.length;f++){let _=h[f],y=_&&_.bead_id;typeof y!="string"||c.has(y)||(c.add(y),e.queue.push({...a(y),lane:"queue",queue_position:f+1}))}for(let f of Array.isArray(r.done)?r.done:[]){let _=f&&f.bead_id;if(typeof _!="string"||c.has(_))continue;c.add(_);let y=Lc(o,_);e.done.push({...a(_),lane:"done",done_at:typeof f.added_at=="number"?f.added_at:null,done_kind:y&&typeof y.done_kind=="string"?y.done_kind:null})}}return e.running.sort((r,n)=>(n.last_event_at??0)-(r.last_event_at??0)),e.done.sort((r,n)=>(n.done_at??0)-(r.done_at??0)),pi.map(r=>({lane:r.lane,title:r.title,items:e[r.lane]}))}function _i(t,e){let r=Re("views:monitor"),n=e.gotoIssue,s=e.pipelineStore,o=e.getWorkspacePath,i=e.switchWorkspace,l=e.now||(()=>Date.now()),a=null,c=null;function h(){let $=s&&s.get?s.get():null;be(fi(Oc($),l()),t)}function f($,A){let C=o?o():void 0;if(!A||!C||A===C||!i){n($);return}i(A).then(()=>{n($)}).catch(F=>{r("workspace switch for %s failed: %o",A,F)})}function _($){let A=$.target,C=A&&A.closest?A.closest(".mon-row"):null;if(!C)return;let F=C.getAttribute("data-issue-id");F&&($.preventDefault(),f(F,C.getAttribute("data-root-dir")||""))}t.addEventListener("click",_),s&&typeof s.subscribe=="function"&&(a=s.subscribe(()=>{try{h()}catch{}}));function y(){c!==null&&(clearInterval(c),c=null)}return{load(){r("load"),h(),c===null&&(c=setInterval(()=>{try{h()}catch{}},Ic))},pause(){y()},clear(){y(),a&&(a(),a=null),t.removeEventListener("click",_),t.replaceChildren()}}}function mi(t,e,r){let n=Re("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let a=e.getState(),c=a.view==="worker"||a.view==="monitor"?a.view:"board";return d`
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
    `}function l(){be(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),be(d``,t)}}}var gi=["bug","feature","task","epic","chore"];function bi(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var wi=["Critical","High","Medium","Low","Backlog"];function ki(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),h=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),_=r.querySelector(".new-issue__close");function y(){o.replaceChildren();let T=document.createElement("option");T.value="",T.textContent="\u2014 Select \u2014",o.appendChild(T);for(let E of gi){let D=document.createElement("option");D.value=E,D.textContent=bi(E),o.appendChild(D)}i.replaceChildren();for(let E=0;E<=4;E+=1){let D=document.createElement("option");D.value=String(E);let v=wi[E]||"Medium";D.textContent=`${E} \u2013 ${v}`,i.appendChild(D)}}y();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function A(T){s.disabled=T,o.disabled=T,i.disabled=T,l.disabled=T,a.disabled=T,h.disabled=T,f.disabled=T,f.textContent=T?"Creating\u2026":"Create"}function C(){c.textContent=""}function F(T){c.textContent=T}function U(){try{let T=window.localStorage.getItem("beads-ui.new.type");T?o.value=T:o.value="";let E=window.localStorage.getItem("beads-ui.new.priority");E&&/^\d$/.test(E)?i.value=E:i.value="2"}catch{o.value="",i.value="2"}}function H(){let T=o.value||"",E=i.value||"";T.length>0&&window.localStorage.setItem("beads-ui.new.type",T),E.length>0&&window.localStorage.setItem("beads-ui.new.priority",E)}async function P(){C();let T=String(s.value||"").trim();if(T.length===0){F("Title is required"),s.focus();return}let E=Number(i.value||"2");if(!(E>=0&&E<=4)){F("Priority must be 0..4"),i.focus();return}let D=String(o.value||""),v=String(a.value||""),W={title:T};D.length>0&&(W.type=D),String(E).length>0&&(W.priority=E),v.length>0&&(W.description=v),A(!0);try{await e("create-issue",W)}catch{A(!1),F("Failed to create issue");return}H(),A(!1),$()}return r.addEventListener("cancel",T=>{T.preventDefault(),$()}),_.addEventListener("click",()=>$()),h.addEventListener("click",()=>$()),r.addEventListener("keydown",T=>{T.key==="Enter"&&(T.ctrlKey||T.metaKey)&&(T.preventDefault(),P())}),n.addEventListener("submit",T=>{T.preventDefault(),P()}),{open(){n.reset(),C(),U();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}function yi(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function vi(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var Mc={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},$i=160;function Nc(t){return t.length>$i?`${t.slice(0,$i)}\u2026`:t}var Pc=[{key:"orchestration_model",values:()=>Ln},{key:"orchestration_effort",values:()=>Dn},{key:"review_model",values:()=>On},{key:"impl_model",values:()=>Mn}];function xi(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let v=i();return typeof v.revision=="number"?v.revision:0}function a(){let v=i().exec_defaults;return v&&typeof v=="object"?v:{}}function c(v){v&&v.queue&&r&&r.set(v.queue)}async function h(v,W){if(!n)return;let G={key:v,value:W||null};try{let K=await n("worker-queue-set-exec-default",{...G,expected_revision:l()});c(K),K&&K.conflict&&(K=await n("worker-queue-set-exec-default",{...G,expected_revision:l()}),c(K)),K&&K.conflict&&ee("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ee("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function f(v,W,G){let K=!!G&&!W.includes(G);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${v}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${v}`}
        data-key=${v}
        @change=${se=>{h(v,se.target.value)}}
      >
        <option value="" ?selected=${!G}>
          ${Nn[v]||"(\uAE30\uBCF8)"}
        </option>
        ${K?d`<option value=${G} ?selected=${!0}>
              ${G} (비호환)
            </option>`:""}
        ${W.map(se=>d`<option value=${se} ?selected=${G===se}>${se}</option>`)}
      </select>
    </div>`}function _(){let v=i().workspace_info;return v&&typeof v=="object"?v:{}}function y(v,W){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${v}"
      >${W}</span
    >`}function $(v){let W=v?vi(v.cmd):"",G=v?yi(v.timeout_ms):"",K=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${W?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${W}</span>
            ${y("config","config")}
            ${G?d`<span class="exec-defaults__vd-meta"
                  >timeout ${G}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${K}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function A(v){let W=v?vi(v.cmd):"",G=v?yi(v.timeout_ms):"",K=G?`timeout ${G} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",se=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${W?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${W}</span>
            ${y("config","config")}
            ${v.detached===!0?y("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${K}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${se}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function C(v){if(!v||typeof v!="object")return"";let W=Mc[String(v.outcome)];if(!W)return"";let G=v.outcome==="failed"&&v.reason?`${W.label} \xB7 ${v.reason}`:W.label,K=[at(v.at),typeof v.bead_id=="string"?v.bead_id:"",typeof v.base_sha=="string"?v.base_sha.slice(0,7):""].filter(Me=>Me.length>0).join(" \xB7 "),se=typeof v.detail=="string"&&v.detail.length>0?Nc(v.detail):"",Ee=typeof v.log_path=="string"&&v.log_path.length>0?v.log_path:"";return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${y(W.modifier,G)}
        ${K?d`<span class="exec-defaults__vd-meta">${K}</span>`:""}
      </div>
      ${se?d`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${se}</code>
          </div>`:""}
      ${Ee?d`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${Ee}</code>
          </div>`:""}
    </div>`}function F(v){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$(v.verify_cmd)} ${A(v.deploy_cmd)}
      ${C(v.last_deploy)}
    </section>`}function U(){let v=a();be(d`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${D}
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
            ${Pc.map(W=>f(W.key,W.values(),v[W.key]||""))}
            ${F(_())}
          </div>
        </div>
      `,o)}let H=!1,P=()=>{H=!1};o.addEventListener("close",P),o.addEventListener("cancel",P);let T=null;r&&r.subscribe&&(T=r.subscribe(()=>{H&&U()}));function E(){H||(H=!0,U(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function D(){H&&(H=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:E,close:D,destroy(){H=!1,o.removeEventListener("close",P),o.removeEventListener("cancel",P),T&&(T(),T=null),o.remove()}}}var Fc="tab:worker:ready",qc="tab:worker:blocked",Bc="tab:worker:in-progress",un=1;function ds(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Ei="beads-ui.worker.candidate-filter",ls={show_blocked:!1,spec:"all"};function Uc(){try{let t=window.localStorage.getItem(Ei);if(!t)return{...ls};let e=JSON.parse(t);if(!e||typeof e!="object")return{...ls};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ls}}}function zc(t){try{window.localStorage.setItem(Ei,JSON.stringify(t))}catch{}}function Hc(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Wc=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ci="bdui.worker.candidate_sort",Gc=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],pn="spec";function jc(){try{let t=window.localStorage.getItem(Ci);return t==="board"||t==="created"||t==="spec"?t:pn}catch{return pn}}function Yc(t){try{window.localStorage.setItem(Ci,t)}catch{}}var Ri="bdui.worker.done-range";function Vc(){try{let t=window.localStorage.getItem(Ri);return rr(t)?t:Dt}catch{return Dt}}function Kc(t){try{window.localStorage.setItem(Ri,t)}catch{}}var Zc="(max-width: 640px)",Ii="beads-ui.worker.lane-collapsed",Mr={queue:!0,done:!0};function Xc(){try{let t=window.localStorage.getItem(Ii);if(!t)return{...Mr};let e=JSON.parse(t);return!e||typeof e!="object"?{...Mr}:{queue:typeof e.queue=="boolean"?e.queue:Mr.queue,done:typeof e.done=="boolean"?e.done:Mr.done}}catch{return{...Mr}}}function Qc(t){try{window.localStorage.setItem(Ii,JSON.stringify(t))}catch{}}function Si(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Jc(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(Gt):(n.sort(Wr(r)),e==="board"?n:[...n.filter(ds),...n.filter(s=>!ds(s))])}function ed(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function td(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function rd(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var nd=["closed_unmerged","undecidable"],sd=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function od(t,e){for(let r of sd)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var cs=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function id(t){if(typeof t!="string"||t.length===0)return null;let e=cs.length,r=cs.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:cs[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function Ti(t){switch(t){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return t}}function Ai(t,e){return typeof t!="string"||t.length===0||typeof e!="string"||e.length===0||e===t?null:`\u2192 ${e}`}function ad(t,e,r,n,s=null,o=null,i=null,l=!1,a=null,c=!0,h=null,f=null){let _=!!a&&a.position>0,y=!!a&&a.active===!0,$=a&&a.failure||null,A=r[t]||null,C=A&&A.gate?A.gate:null,F=A&&A.pr?A.pr:null,U=[];l&&U.push("\uC138\uC158");let H=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,P=od(l&&C&&C.tier==="closed_unmerged"?"\uB2EB\uD798":C&&C.gate_badge||"",H?null:o&&o.activity||null);H&&U.push(H),P.label&&U.push(P.label),C&&C.base_badge&&C.base_badge!==C.gate_badge&&U.push(C.base_badge),f&&U.push(f),n&&U.push("\uC815\uB9AC \uC2E4\uD328"),_&&!y&&U.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),$&&U.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Ti($)}`),h&&U.push(`\uC790\uB3D9 \uC81C\uC678: ${Ti(h)}`);let T=!!C&&C.base_badge==="\uCDA9\uB3CC",E=!!C&&C.enabled===!0,D=id(o&&o.merge_progress?o.merge_progress.step:null),v=!!n&&!!C&&C.tier==="merged",W=l&&!!C&&C.tier==="merged",G=l&&T&&c===!1;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:F&&typeof F.number=="number"?F.number:null,pr_url:F&&typeof F.url=="string"?F.url:"",badges:U,live_badge:i==="running"?H:H?null:P.live?P.label:null,usage:s,alert:!!C&&nd.includes(C.tier)||!!n||!!$,merge_action:!_,cancel_action:_,cancel_enabled:!y,cancel_title:y?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(C&&C.tier==="merged"),merge_step:D,discard_enabled:!D&&!i&&!_,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":_?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!D&&!i&&!G&&(E||T||v||W),merge_label:W?"\uC815\uB9AC":T&&!D&&!v?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:D?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${D.label}`:W?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":G?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":v?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":T?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":E?`\uBA38\uC9C0 (${C.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:C&&C.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${C&&C.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function us(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?jr(n,i):null,h=Vr({transport:r,uiOrderStore:i}),f=null,_=[],y=Uc(),$=jc(),A=Vc();function C(){let u=kr.find(b=>b.value===A);return u?u.label:"\uC624\uB298"}let F=Xc(),U=!1,H=new Set,P=new Set,T=[],E=document.createElement("div");E.className="worker-console";let D=document.createElement("div");D.className="worker-top";let v=document.createElement("div");v.className="worker-drawer-overlay",v.hidden=!0;let W=document.createElement("div");W.className="worker-drawer-overlay__backdrop";let G=document.createElement("div");G.className="worker-drawer-host",v.append(W,G);let K=document.createElement("div");K.className="worker-lanes-host",E.append(D,v,K),t.appendChild(E);let se=null,Ee=Xr(G,{transport:r,sessionLogStore:o,onClose:()=>{se=null,v.hidden=!0,he()}}),Me=xi(E,{queueStore:s,transport:r,getWorkspacePath:a});function ye(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:un,queue:[],pr_wait:[],done:[]}}function te(){let u=ye();return typeof u.revision=="number"?u.revision:0}function O(u){u&&u.queue&&s&&s.set(u.queue)}function q(){let u=ye().queue;return Array.isArray(u)?u.length:0}async function J(u,b){if(!r)return;let I=await r("worker-queue-place",{bead_id:u,index:b,expected_revision:te()});O(I),I&&I.conflict&&await r("worker-queue-place",{bead_id:u,index:b,expected_revision:te()}).then(O)}async function Ce(u,b){if(!r)return;let I=await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:te()});O(I),I&&I.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:te()}).then(O)}async function ie(u){if(!r)return;let b=await r("worker-queue-remove",{bead_id:u,expected_revision:te()});O(b),b&&b.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:te()}).then(O)}async function Se(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function oe(u){if(!r||!u)return;let b=await r("worker-attempt-pause",{attempt_id:u});b&&b.paused===!1&&b.reason&&ee(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function qe(u){if(!r||!u)return;let b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:te()});O(b),b&&b.conflict&&(b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:te()}),O(b)),b&&b.resumed===!1&&!b.conflict&&b.reason&&ee(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function fe(u){if(!r||!u)return;let b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:te()});O(b),b&&b.conflict&&(b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:te()}),O(b)),b&&b.dismissed===!1&&!b.conflict&&b.reason&&ee(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function Be(u,b){if(!r)return null;let I=r,ne=await I(u,{...b,expected_revision:te()});return O(ne),ne&&ne.conflict&&(ne=await I(u,{...b,expected_revision:te()}),O(ne)),ne}async function Je(u){if(!r||!u)return;H.add(u),he();let b;try{b=await Be("worker-merge-queue-add",{bead_id:u})}finally{H.delete(u),he()}!b||b.conflict||b.applied||ee("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function je(u){if(!r)return;let b=await Be("worker-merge-auto-toggle",{on:u});!b||b.conflict||ee(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function wt(u){if(!r||!u)return;let b=await Be("worker-merge-queue-remove",{bead_id:u});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&ee("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ve(){await Be("worker-merge-queue-remove",{all:!0})}async function ht(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let I=await r("worker-pr-discard",{bead_id:u,expected_revision:te()});if(O(I),I&&I.conflict&&(I=await r("worker-pr-discard",{bead_id:u,expected_revision:te()}),O(I)),I&&I.discarded===!0){ee("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}I&&I.discarded===!1&&!I.conflict&&ee(`\uD3D0\uAE30 \uAC70\uBD80: ${I.reason||""}`,"error",2800)}async function rt(u,b){if(!r||!b||P.has(b))return;P.add(b),he();let I;try{I=await r(u,{bead_id:b,expected_revision:te()}),O(I),I&&I.conflict&&(I=await r(u,{bead_id:b,expected_revision:te()}),O(I))}finally{P.delete(b),he()}if(!(!I||I.conflict)){if(I.ok){ee(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ee(`\uCC98\uBD84 \uAC70\uBD80: ${I.reason||""}`,"error",3e3)}}async function Ke(u){if(!r)return;let b=await r("worker-queue-toggle",{on:u,expected_revision:te()});O(b),b&&b.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:te()}).then(O)}async function Ze(u){await Ke(u),await je(u)}async function nt(u){if(!r||!Number.isFinite(u))return;let b=Math.max(un,Math.floor(u)),I=await r("worker-queue-set-slots",{slots:b,expected_revision:te()});O(I),I&&I.conflict&&await r("worker-queue-set-slots",{slots:b,expected_revision:te()}).then(O)}function st(){let u=ye(),b=c?c.selectBoardColumn(Fc,"ready"):[],I=c?c.selectBoardColumn(qc,"blocked"):[],ne=c?c.selectBoardColumn(Bc,"in_progress"):[],ve=new Map;for(let k of ne){let B=td(k);if(!B)continue;let Q=ve.get(B);Q?Q.push(k):ve.set(B,[k])}let le=k=>{let B=Yr(ve.get(k)||[]);return B?B.title||B.id:null},ke=u.bead_titles||{},Te=new Map;for(let[k,B]of Object.entries(ke))typeof B=="string"&&B.length>0&&Te.set(k,B);for(let k of[...b,...I])Te.set(k.id,k.title||k.id);let He=u.bead_times||{},et=new Map;for(let[k,B]of Object.entries(He))B&&typeof B=="object"&&et.set(k,B);for(let k of[...b,...I])et.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let ce=k=>et.get(k)||{},tt=u.pr_wait||[],kt=u.pr_observations||{},We=u.pr_activity||{},Qe=u.cleanup_failed||{},ae=Object.entries(Qe).map(([k,B])=>({bead_id:k,step:B&&B.step?B.step:"",reason:B&&B.reason?B.reason:"",detail:B&&typeof B.detail=="string"?B.detail:null,output_tail:B&&typeof B.output_tail=="string"&&B.output_tail?B.output_tail:void 0,log_path:B&&typeof B.log_path=="string"&&B.log_path?B.log_path:void 0})),me=u.ship_failure||null,Tt=me&&typeof me.reason=="string"&&me.reason?{bead_id:typeof me.bead_id=="string"?me.bead_id:"",reason:me.reason,detail:typeof me.detail=="string"?me.detail:null,pr_url:typeof me.pr_url=="string"?me.pr_url:null}:null,Rt=u.queue||[],it=new Set([...Rt.map(k=>k.bead_id),...tt.map(k=>k.bead_id),...u.done.map(k=>k.bead_id)]),It=new Set(I.map(k=>k.id)),qt=i?i.get()?.order||{}:{},m=new Set,g=[];for(let k of[...b,...I])it.has(k.id)||m.has(k.id)||ed(k)||(m.add(k.id),g.push(k));_=Jc(g,$,qt);let j=u.admission||{},R=k=>{let B=j[k];if(!B)return"";if(B.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let Q=typeof B.reason=="string"?B.reason:"",$e=Q.indexOf(":");return $e>0&&$e<Q.length-1?`\u26D4 ${Q.slice(0,$e)} (${Q.slice($e+1)})`:`\u26D4 ${Q}`},p=_.map(k=>{let B=ds(k),Q=It.has(k.id),$e=[];Q&&$e.push(rd(k)),B||$e.push("spec \uC5C6\uC74C");let qr=R(k.id);return qr&&$e.push(qr),{id:k.id,title:k.title||k.id,reason:$e.join(" \xB7 "),draggable:B,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,status:k.status,blocked:Q,has_spec:B}}),S=Hc(p,y),z=S.visible,Ae=u.revise_parked||{},Ge=(k,B)=>k.map(Q=>{let $e=B==="queue"?Ae[Q.bead_id]:null;return{id:Q.bead_id,title:Te.get(Q.bead_id)||Q.bead_id,reason:B==="done"?"":R(Q.bead_id),draggable:B!=="done",done:B==="done",lane:B,badges:$e?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!$e,revise_action:!!$e,revise_enabled:!!$e&&!P.has(Q.bead_id),revise_title:$e?$e.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${$e.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:B==="done"?Mt(u.attempts||{},Q.bead_id):null,done_at:B==="done"&&typeof Q.added_at=="number"?Q.added_at:void 0,...ce(Q.bead_id)}}),De=new Map;for(let k of u.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&De.set(k.bead_id,k.added_at);let Pe=u.attempts?Object.values(u.attempts):[],mt=new Set;for(let k of Pe)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&mt.add(k.resumed_from);let At=new Map;for(let k of Pe)At.set(k.bead_id,k.attempt_id);let Qt=new Map;for(let k of Pe)Qt.set(k.attempt_id,k);function Fe(k){let B=new Set,Q=k;for(;Q&&!B.has(Q.attempt_id);){if(Q.conflict_resolution===!0)return!0;B.add(Q.attempt_id),Q=typeof Q.resumed_from=="string"&&Q.resumed_from.length>0&&Qt.get(Q.resumed_from)||null}return!1}let Jt=typeof u.declared_base=="string"?u.declared_base:null;function Nr(k){let B=null;for(let Q of Pe)!Q||Q.bead_id!==k||Fe(Q)||(B===null||(typeof Q.started_at=="number"?Q.started_at:0)>=(typeof B.started_at=="number"?B.started_at:0))&&(B=Q);return B&&typeof B.target_base=="string"?B.target_base:null}let fr=[],St=null;for(let k of Pe){let B=k.status==="paused"&&!mt.has(k.attempt_id);if(k.status==="running"||B)fr.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:Te.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:B,conflict_resolution:Fe(k),base_exception:Ai(Jt,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,usage:Mt(u.attempts||{},k.bead_id),current_child:le(k.bead_id),...ce(k.bead_id)});else if(k.status==="failed"||k.status==="orphaned"){let Q=At.get(k.bead_id)!==k.attempt_id,$e=De.get(k.bead_id),qr=typeof $e=="number"&&$e>0&&typeof k.finished_at=="number"&&$e>=k.finished_at;!Q&&!qr&&typeof k.dismissed_at!="number"&&(St=k)}}let _s=null;if(St){let k=typeof St.session_id=="string"&&St.session_id.length>0,B=mt.has(St.attempt_id),Q=St.cause_detail;_s={repo:St.repo||"",reason:St.cause||St.status,cause_detail:Q&&typeof Q.reason=="string"?{reason:Q.reason,command:typeof Q.command=="string"?Q.command:null}:null,resume_attempt_id:St.attempt_id,resume_eligible:k&&!B,resume_reason:k?B?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let zi=new Set(fr.map(k=>k.bead_id)),fn=Array.isArray(u.merge_queue)?u.merge_queue:[],ms=new Map;fn.forEach((k,B)=>{k&&typeof k.bead_id=="string"&&ms.set(k.bead_id,B+1)});let gs=u.merge_queue_state||{active:null,failures:{}},Hi=gs.failures||{},Wi=u.auto_merge_skips||{},bs=k=>{let B=Wi[k];if(!B)return null;let Q=kt[k],$e=Q&&Q.pr?Q.pr.head_sha:null;return $e&&$e===B.head_sha?B.reason||"":null},Pr=new Map;for(let k of fr)k.conflict_resolution&&(k.paused?Pr.has(k.bead_id)||Pr.set(k.bead_id,"paused"):Pr.set(k.bead_id,"running"));let ws=fr.filter(k=>!k.paused).length,ks=(u.workspace_info||{}).slots,ys=typeof ks=="number"?ks:typeof u.slots=="number"?u.slots:un,Gi=ws>ys,vs=Ur(A),ji=(Array.isArray(u.done)?u.done.slice():[]).filter(k=>vs===void 0||typeof k.added_at!="number"||k.added_at>=vs).sort((k,B)=>(B.added_at||0)-(k.added_at||0)),$s=Ge(ji,"done"),Fr={};for(let k of cr)Fr[k]=0;let xs=!1,Ss=0,hn=0,Ts=0;for(let k of $s){let B=k.usage;if(B&&typeof B=="object"){let Q=!1;for(let $e of cr)Number.isFinite(B[$e])&&(Fr[$e]+=B[$e],xs=!0,Q=!0);Q&&(hn+=1,Number.isFinite(B.total_cost_usd)&&(Ss+=B.total_cost_usd,Ts+=1))}}hn>0&&Ts===hn&&(Fr.total_cost_usd=Ss);let Yi=xs?Ot(Fr):null;return{queue:u,idToTitle:Te,candidates:z,candidate_hidden:{blocked:S.hidden_blocked,spec:S.hidden_spec},running:fr,live_count:ws,slots:ys,over_cap:Gi,failure:_s,waiting:Ge(Rt.filter(k=>!zi.has(k.bead_id)),"queue"),pr_wait:tt.map(k=>ad(k.bead_id,Te.get(k.bead_id)||k.bead_id,kt,Qe[k.bead_id]||null,Mt(u.attempts||{},k.bead_id),We[k.bead_id]||(H.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Pr.get(k.bead_id)||null,k.external===!0,{position:ms.get(k.bead_id)||0,active:gs.active===k.bead_id,failure:Hi[k.bead_id]||null},k.wt_present!==!1,u.auto_merge===!0?bs(k.bead_id):null,Ai(Jt,Nr(k.bead_id)))).map(k=>({...k,...ce(k.id)})),merge_queue_length:fn.length,merge_queue_running:fn.length>0,auto_excluded:tt.map(k=>k.bead_id).filter(k=>bs(k)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:Jt,done:$s,token_total:Yi,cleanup_failures:ae,ship_failure:Tt}}function Ie(u){let b=u.waiting.length>0?u.waiting[0].id:"\u2014",I=d`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,ne=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,ve=d`<button
      type="button"
      class="worker-auto-all${ne?" is-active":""}"
      title=${ne?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${ne?"true":"false"}
    >
      ${ne?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,le=u.over_cap?d`<span
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
    >`,He=d`<label class="worker-tgl worker-slots"
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
      </button>`,et=ui({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return U?d`<div class="worker-ribbon">
          ${I}
          <div class="worker-kpi worker-kpi--ribbon">${le}${ke}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ve}${He}</div>
          <div class="worker-kpi">${Te}</div>
        </div>
        ${et}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${I}${ve}${He}</div>
        <div class="worker-kpi">
          ${le}${ke}${Te}
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
      ${et}`}function Ue(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let b=u.running.some(I=>!I.paused);return d`<section
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
        ${ot(u)}
      </header>
      ${u.running.length>0?as(u.running,Date.now(),se):""}
      ${u.pr_wait.map(I=>ss(I))}
    </section>`}function Ye(u){let b=u.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${y.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Wc.map(I=>d`<button
              type="button"
              class="worker-filter__chip${y.spec===I.value?" is-active":""}"
              data-spec=${I.value}
              aria-pressed=${y.spec===I.value?"true":"false"}
            >
              ${I.label}
            </button>`)}
        ${b.spec>0?d`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function pt(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Gc.map(u=>d`<option value=${u.value} ?selected=${$===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function _t(){return d`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${A}
      >
        ${kr.map(u=>d`<option value=${u.value} ?selected=${A===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function ot(u){let b=u.queue.auto_merge===!0;if(u.merge_queue_running)return d`<button
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
      </button>`;let I=new Set(u.auto_excluded),ne=u.pr_wait.filter(ve=>ve.merge_action&&ve.merge_enabled&&!I.has(ve.id)).length;return d`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${ne>0?` ${ne}`:""}
    </button>`}function Ne(u){let b=Pt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:pt(),controls:Ye(u)});return U?d`<div class="worker-lanes worker-lanes--mobile">
        ${Ue(u)}
        ${Pt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:F.queue,preview:Si(u.waiting)})}
        ${b}
        ${Pt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${C()} \uC644\uB8CC \uC5C6\uC74C`,controls:_t(),collapsible:!0,collapsed:F.done,preview:u.token_total||Si(u.done)})}
      </div>`:d`<div class="worker-lanes">
      ${b}
      ${Pt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Pt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(I=>!I.paused),body:as(u.running,Date.now(),se)})}
      ${Pt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:ot(u)})}
      ${Pt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${C()} ${u.done.length}`,items:u.done,empty:`${C()} \uC644\uB8CC \uC5C6\uC74C`,controls:_t()})}
    </div>`}function Xe(u){F={...F,[u]:!F[u]},Qc(F),he()}function he(){let u=st();be(Ie(u),D),be(Ne(u),K)}function ze(){let u=document.querySelector(".app-header");if(!u)return;let b=()=>{let I=Math.round(u.getBoundingClientRect().height);E.style.setProperty("--worker-ribbon-top",`${I}px`)};if(b(),typeof ResizeObserver=="function"){let I=new ResizeObserver(b);I.observe(u),T.push(()=>I.disconnect())}else window.addEventListener("resize",b),T.push(()=>window.removeEventListener("resize",b))}function L(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Zc);U=!!u.matches;let b=I=>{let ne=!!(I&&typeof I.matches=="boolean"?I.matches:u.matches);ne!==U&&(U=ne,he())};typeof u.addEventListener=="function"?(u.addEventListener("change",b),T.push(()=>u.removeEventListener("change",b))):typeof u.addListener=="function"&&(u.addListener(b),T.push(()=>u.removeListener(b)))}function N(u){let b=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!b)return;let I=b.dataset.beadId||"",ne=b.dataset.lane||"";f={bead_id:I,from_lane:ne};try{u.dataTransfer?.setData("text/plain",I),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function Z(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;let I=b.dataset.lane||"";I!=="candidate"&&I!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),b.classList.add("worker-pane--drag-over"))}function V(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function X(u,b){let I=_.find(ke=>ke.id===u);if(!I)return;let ne=_.filter(ke=>ke.id!==u),ve=ne.length;if(b){let ke=b.dataset.beadId;if(ke===u)return;let Te=ne.findIndex(He=>He.id===ke);Te>=0&&(ve=Te)}let le=ne.slice();le.splice(ve,0,I),h.applyReorder(u,le,ve)}function de(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;u.preventDefault(),b.classList.remove("worker-pane--drag-over");let I=b.dataset.lane||"",ne=f?.bead_id||u.dataTransfer?.getData("text/plain")||"",ve=f?.from_lane||"";if(f=null,!ne)return;let le=u.target?.closest?.(".worker-mini, .worker-card"),ke=Array.from(b.querySelectorAll(".worker-mini, .worker-card")),Te=ke.length;if(le){let He=ke.indexOf(le);He>=0&&(Te=He)}if(b.classList.contains("worker-pane--collapsed")&&(Te=q()),I==="candidate"){if(ve==="candidate"){X(ne,le);return}ve==="queue"&&ie(ne);return}I==="queue"&&(ve==="queue"?Ce(ne,Te):J(ne,Te))}function pe(u){y=u,zc(u),he()}function _e(u){$=u==="board"||u==="created"||u==="spec"?u:pn,Yc($),he()}function re(u){A=rr(u)?u:Dt,Kc(A),he()}function w(u){let b=u.target?.closest?.(".worker-filter__blocked");if(b){pe({...y,show_blocked:b.checked});return}let I=u.target?.closest?.(".worker-done-range");if(I){re(I.value);return}let ne=u.target?.closest?.(".worker-sort");if(ne){_e(ne.value||pn);return}let ve=u.target?.closest?.(".worker-slots__input");if(!ve)return;let le=Number.parseInt(ve.value,10);if(!Number.isFinite(le)){he();return}nt(le).then(he)}function M(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function x(u){let b=ye(),I=b.attempts?b.attempts[u]:null;se=u,v.hidden=!1,Ee.open({attempt_id:u,meta:M(I)}),he()}function Y(){if(!se)return;let u=ye(),b=u.attempts?u.attempts[se]:null;if(b){Ee.updateMeta(M(b));return}Ee.close()}function Le(u){let b=u.target;if(b?.closest?.("#worker-exec-defaults-dialog"))return;if(b?.closest?.(".worker-exec-defaults-btn")){Me.open();return}let I=b?.closest?.(".worker-banner__resume");if(I){let ae=I.dataset.attemptId;ae&&qe(ae);return}let ne=b?.closest?.(".worker-banner__dismiss");if(ne){let ae=ne.dataset.attemptId;ae&&fe(ae);return}if(b?.closest?.(".worker-play")){Ke(!ye().auto_advance);return}if(b?.closest?.(".worker-auto-all")){let ae=ye();Ze(!(ae.auto_advance===!0&&ae.auto_merge===!0));return}let ve=b?.closest?.(".worker-merge-all");if(ve){ve.classList.contains("worker-merge-all--stop")?ye().auto_merge===!0?je(!1):Ve():je(!0);return}let le=b?.closest?.(".worker-pane__hd--toggle");if(le){let ae=le.dataset.lane;(ae==="queue"||ae==="done")&&Xe(ae);return}let ke=b?.closest?.(".worker-card__place");if(ke){let ae=ke.dataset.beadId;ae&&!ke.disabled&&J(ae,q());return}let Te=b?.closest?.(".worker-filter__chip");if(Te){let ae=Te.dataset.spec;(ae==="all"||ae==="with"||ae==="without")&&pe({...y,spec:ae});return}let He=b?.closest?.(".worker-mini__merge");if(He){Je(He.dataset.beadId||"");return}let et=b?.closest?.(".worker-mini__merge-cancel");if(et){wt(et.dataset.beadId||"");return}let ce=b?.closest?.(".worker-mini__discard");if(ce){ht(ce.dataset.beadId||"");return}let tt=b?.closest?.(".worker-mini__revise-fix");if(tt){rt("worker-revise-fix",tt.dataset.beadId||"");return}let kt=b?.closest?.(".worker-mini__revise-approve");if(kt){rt("worker-revise-approve",kt.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;if(b?.closest?.(".rtile__stop")){let me=b?.closest?.(".rtile")?.dataset?.attemptId;me&&Se(me);return}if(b?.closest?.(".rtile__pause")){let me=b?.closest?.(".rtile")?.dataset?.attemptId;me&&oe(me);return}if(b?.closest?.(".rtile__resume")){let me=b?.closest?.(".rtile")?.dataset?.attemptId;me&&qe(me);return}if(b?.closest?.(".rtile__session")){let me=b?.closest?.(".rtile")?.dataset?.attemptId;me&&x(me);return}if(b?.closest?.(".worker-drawer-overlay__backdrop")){Ee.close();return}if(b?.closest?.(".worker-drawer-host"))return;let We=b?.closest?.(".rtile");if(We){if(b?.closest?.(".rtile__id")){let me=We.dataset.beadId;me&&Vt(me).then(Tt=>{Tt?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ae=We.dataset.beadId;ae&&l&&l(ae);return}let Qe=b?.closest?.(".worker-mini, .worker-card");if(Qe){let ae=Qe.dataset.beadId;if(b?.closest?.(".worker-mini__id, .worker-card__id")){ae&&Vt(ae).then(me=>{me?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ae&&l&&l(ae)}}return t.addEventListener("dragstart",N),t.addEventListener("dragover",Z),t.addEventListener("dragleave",V),t.addEventListener("drop",de),t.addEventListener("click",Le),t.addEventListener("change",w),L(),ze(),c&&T.push(c.subscribe(he)),s&&T.push(s.subscribe(()=>{he(),Y()})),he(),{load(){he()},destroy(){for(let u of T.splice(0))try{u()}catch{}t.removeEventListener("dragstart",N),t.removeEventListener("dragover",Z),t.removeEventListener("dragleave",V),t.removeEventListener("drop",de),t.removeEventListener("click",Le),t.removeEventListener("change",w);try{Ee.destroy()}catch{}v.hidden=!0;try{Me.destroy()}catch{}be(d``,t)}}}function ps(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Li(t,e,r,n=async()=>{},s=async()=>{}){let o=Re("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function h(E){let v=E.target.value,G=e.getState().workspace?.current?.path||"";if(v&&v!==G){o("switching workspace to %s",v),l=!0,T();try{await r(v)}catch(K){o("workspace switch failed: %o",K)}finally{l=!1,T()}}}async function f(){let E=e.getState(),D=E.workspace?.current?.path||E.workspace?.available?.[0]?.path||"";if(!(!D||a)){o("git-pulling workspace %s",D),a=!0,T();try{await n(D)}catch(v){o("workspace git pull failed: %o",v)}finally{a=!1,T()}}}function _(E){let D=E.target;D&&t.contains(D)||A()}function y(E){E.key==="Escape"&&A()}function $(){c||(c=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",y),T())}function A(){c&&(c=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",y),T())}function C(){c?A():$()}async function F(E){let D=E.target,v=D.value,W=D.checked;o("toggling visibility %s \u2192 %s",v,String(W));try{await s(v,W)}catch(G){o("workspace visibility toggle failed: %o",G)}}function U(E){return E?d`
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
    `:d``}function H(E,D){return d`
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
                ${E.map(v=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${v.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${v.path}"
                        .checked=${!D.has(v.path)}
                        @change=${F}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ps(v.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let E=e.getState(),D=E.workspace?.current,v=E.workspace?.available||[],W=new Set(E.workspace?.hidden||[]),G=D?.path||v[0]?.path||"";if(v.length===0)return d``;let K=v.filter(se=>!W.has(se.path)||se.path===G);if(K.length<=1){let se=K[0]||v[0],Ee=ps(se.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${se.path}"
            >${Ee}</span
          >
          ${H(v,W)}
          ${U(G)}
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
          ${K.map(se=>d`
              <option
                value="${se.path}"
                ?selected=${se.path===G}
                title="${se.path}"
              >
                ${ps(se.path)}
              </option>
            `)}
        </select>
        ${H(v,W)}
        ${U(G)}
        ${l||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function T(){be(P(),t)}return T(),i=e.subscribe(()=>T()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",y),be(d``,t)}}}var Di=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot"];function fs(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Oi(t,e,r=fs()){return{id:r,type:t,payload:e}}function Mi(t={}){let e=Re("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,h=[],f=new Map,_=new Set;function y(P){for(let T of Array.from(_))try{T(P)}catch{}}function $(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),y(o);let P=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),T=(r.jitterRatio||0)*P,E=Math.max(0,Math.round(P+(Math.random()*2-1)*T));e("ws retry in %d ms (attempt %d)",E,i+1),l=setTimeout(()=>{l=null,H()},E)}function A(P){try{s?.send(JSON.stringify(P))}catch(T){e("ws send failed",T)}}function C(){for(o="open",e("ws open"),y(o),i=0;h.length;){let P=h.shift();P&&A(P)}}function F(P){let T;try{T=JSON.parse(String(P.data))}catch{e("ws received non-JSON message");return}if(!T||typeof T.id!="string"||typeof T.type!="string"){e("ws received invalid envelope");return}if(c.has(T.id)){let D=c.get(T.id);c.delete(T.id),T.ok?D?.resolve(T.payload):D?.reject(T.error||new Error("ws error"));return}let E=f.get(T.type);if(E&&E.size>0)for(let D of Array.from(E))try{D(T.payload)}catch(v){e("ws event handler error",v)}else e("ws received unhandled message type: %s",T.type)}function U(){o="closed",e("ws closed"),y(o);for(let[P,T]of c.entries())T.reject(new Error("ws disconnected")),c.delete(P);i+=1,$()}function H(){if(!a)return;let P=n();try{s=new WebSocket(P),e("ws connecting %s",P),o="connecting",y(o),s.addEventListener("open",C),s.addEventListener("message",F),s.addEventListener("error",()=>{}),s.addEventListener("close",U)}catch(T){e("ws connect failed %o",T),$()}}return H(),{send(P,T){if(!Di.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let E=fs(),D=Oi(P,T,E);return e("send %s id=%s",P,E),new Promise((v,W)=>{c.set(E,{resolve:v,reject:W,type:P}),s&&s.readyState===s.OPEN?A(D):(e("queue %s id=%s (state=%s)",P,E,o),h.push(D))})},on(P,T){f.has(P)||f.set(P,new Set);let E=f.get(P);return E?.add(T),()=>{E?.delete(T)}},onConnection(P){return _.add(P),()=>{_.delete(P)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,H()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function ld(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function cd(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var hs=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Ni=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Pi=hi,Fi="worker:queue",qi="ui:order",Bi="ui:display-policy",Ft="tab:board:closed",Ui="beads-ui.board.closed-range";function dd(t){let e=Re("main");e("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;be(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&o&&i&&l){let ye=function(m,g){let j="Request failed",R="";if(m&&typeof m=="object"){let S=m;if(typeof S.message=="string"&&S.message.length>0&&(j=S.message),typeof S.details=="string")R=S.details;else if(S.details&&typeof S.details=="object")try{R=JSON.stringify(S.details,null,2)}catch{R=""}}else typeof m=="string"&&m.length>0&&(j=m);let p=g&&g.length>0?`Failed to load ${g}`:"Request failed";Me.open(p,j,R)},Ke=function(m){return`${ce.getState().workspace.current?.path||""}\0${m}`},Ze=function(){fe&&(fe().catch(()=>{}),fe=null),Be=null,Je=null},st=function(m){je=m;let g=()=>{je!==m||ce.getState().selected_id!==m||(je=null,nt(m))};if(!ht){Ve.then(g);return}g()},pt=function(m,g,j,R,p){return j!==Ye[g]?(p().catch(()=>{}),!1):(m.set(R,p),!0)},_t=function(){let m=ce.getState().view;Xe(m==="board"),Z(m==="worker"),_e(m==="monitor"),X(m==="worker")},Ne=function(){let m=Ur(ot);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},Xe=function(m){if(m)for(let[g,j]of hs){if(Ie.has(g)||Ue.has(g))continue;let R=g===Ft?Ne():{type:j};try{J.register(g,R)}catch(z){e("register %s store failed: %o",g,z)}Ue.add(g);let p=Ye.board,S=!1;q.subscribeList(g,R).then(z=>{S=!pt(Ie,"board",p,g,z)}).catch(z=>{e("subscribe %s failed: %o",g,z),ye(z,"board")}).finally(()=>{Ue.delete(g),S&&_t()})}else ze()},ze=function(){Ye.board+=1;for(let[m]of hs){let g=Ie.get(m);g&&(g().catch(()=>{}),Ie.delete(m));try{J.unregister(m)}catch(j){e("unregister %s failed: %o",m,j)}}},Z=function(m){if(!m){V();return}for(let[g,j]of Ni){if(L.has(g)||Ue.has(g))continue;try{J.register(g,{type:j})}catch(S){e("register %s store failed: %o",g,S)}Ue.add(g);let R=Ye.worker,p=!1;q.subscribeList(g,{type:j}).then(S=>{p=!pt(L,"worker",R,g,S)}).catch(S=>{e("subscribe %s failed: %o",g,S),ye(S,"worker")}).finally(()=>{Ue.delete(g),p&&_t()})}},V=function(){Ye.worker+=1;for(let[m]of Ni){let g=L.get(m);g&&(g().catch(()=>{}),L.delete(m));try{J.unregister(m)}catch(j){e("unregister %s failed: %o",m,j)}}},X=function(m){if(!m){de();return}N||(O("subscribe-worker-queue",{id:Fi}).catch(g=>{e("subscribe-worker-queue failed: %o",g)}),N=()=>O("unsubscribe-worker-queue",{id:Fi}))},de=function(){N&&(N().catch(()=>{}),N=null)},_e=function(m){if(!m){re();return}pe||(O("subscribe-monitor-pipeline",{id:Pi}).catch(g=>{e("subscribe-monitor-pipeline failed: %o",g)}),pe=()=>O("unsubscribe-monitor-pipeline",{id:Pi}))},re=function(){pe&&(pe().catch(()=>{}),pe=null)},M=function(){w||(O("subscribe-ui-order",{id:qi}).catch(m=>{e("subscribe-ui-order failed: %o",m)}),w=()=>O("unsubscribe-ui-order",{id:qi}))},x=function(){w&&(w().catch(()=>{}),w=null),Se.clear()},Le=function(){Y||(O("subscribe-display-policy",{id:Bi}).catch(m=>{e("subscribe-display-policy failed: %o",m)}),Y=()=>O("unsubscribe-display-policy",{id:Bi}))},u=function(){Y&&(Y().catch(()=>{}),Y=null),oe.clear()},ke=function(m){if(!m)return"Unknown";let g=m.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var a=ye,c=Ke,h=Ze,f=st,_=pt,y=_t,$=Ne,A=Xe,C=ze,F=Z,U=V,H=X,P=de,T=_e,E=re,D=M,v=x,W=Le,G=u,K=ke;let se=document.getElementById("header-loading"),Ee=io(se),Me=ci(t),te=Mi(),O=Ee.wrapSend((m,g)=>te.send(m,g)),q=Js(O),J=eo(),Ce=ro(),ie=Fs(),Se=to(),oe=Ps(),qe=qs();te.on("monitor-pipeline-snapshot",m=>{let g=m;if(!(!g||!Array.isArray(g.workspaces)))try{ie.set(g.workspaces)}catch{}}),te.on("ui-order-snapshot",m=>{let g=m;if(g&&typeof g.revision=="number")try{Se.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),te.on("display-policy-snapshot",m=>{let g=m;if(g&&g.policy&&typeof g.policy=="object")try{oe.set(g.policy)}catch{}}),te.on("session-log-snapshot",m=>{let g=m;if(g&&typeof g.attempt_id=="string")try{qe.set(g.attempt_id,Array.isArray(g.lines)?g.lines:[],typeof g.last_event_at=="number"?g.last_event_at:null)}catch{}}),te.on("session-log-append",m=>{let g=m;if(g&&typeof g.attempt_id=="string")try{qe.append(g.attempt_id,g.event)}catch{}}),te.on("snapshot",m=>{let g=m,j=g&&typeof g.id=="string"?g.id:"",R=j?J.getStore(j):null;if(R&&g&&g.type==="snapshot")try{R.applyPush(g)}catch{}}),te.on("upsert",m=>{let g=m,j=g&&typeof g.id=="string"?g.id:"",R=j?J.getStore(j):null;if(R&&g&&g.type==="upsert")try{R.applyPush(g)}catch{}}),te.on("delete",m=>{let g=m,j=g&&typeof g.id=="string"?g.id:"",R=j?J.getStore(j):null;if(R&&g&&g.type==="delete")try{R.applyPush(g)}catch{}});let fe=null,Be=null,Je=null,je=null,wt=()=>{},Ve=new Promise(m=>{wt=()=>m(void 0)}),ht=!1,rt=!1;async function nt(m){let g=Ke(m);if(g===Be||g===Je)return;Je=g;let j=`detail:${m}`,R={type:"issue-detail",params:{id:m}};try{J.register(j,R)}catch(p){e("register detail store failed: %o",p)}try{let p=await q.subscribeList(j,R);if(ce.getState().selected_id!==m||Ke(m)!==g){await p().catch(()=>{});return}fe&&await fe().catch(()=>{}),fe=p,Be=g}catch(p){e("detail subscribe failed: %o",p),ye(p,"issue details")}finally{Je===g&&(Je=null)}}let Ie=new Map,Ue=new Set,Ye={board:0,worker:0},ot=Dt;try{let m=window.localStorage.getItem(Ui);rr(m)&&(ot=m)}catch{}async function he(m){if(!rr(m)||m===ot)return;ot=m;try{window.localStorage.setItem(Ui,m)}catch{}let g=Ie.get(Ft);if(!g)return;Ie.delete(Ft),await g().catch(()=>{});let j=Ne();try{J.register(Ft,j)}catch(R){e("register %s store failed: %o",Ft,R)}try{let R=await q.subscribeList(Ft,j);Ie.set(Ft,R)}catch(R){e("re-subscribe %s failed: %o",Ft,R),ye(R,"board")}}let L=new Map,N=null,pe=null,w=null,Y=null;async function b(){Y=null,oe.clear(),N=null,pe=null,Ie.clear(),L.clear(),Ye.board+=1,Ye.worker+=1;let m=ce.getState().workspace.current?.path;if(m)try{await te.send("set-workspace",{path:m})}catch(j){e("workspace restore after reconnect failed: %o",j);return}Le();let g=ce.getState().view;Xe(g==="board"),Z(g==="worker"),_e(g==="monitor"),X(g==="worker")}async function I(){e("clearing all subscriptions for workspace switch"),ze(),V(),de(),Ce.clear(),x(),M(),u(),Le(),Ze();let m=ce.getState();if(m.selected_id)try{J.unregister(`detail:${m.selected_id}`)}catch{}let g=ce.getState();Xe(g.view==="board"),Z(g.view==="worker"),_e(g.view==="monitor"),X(g.view==="worker"),g.selected_id&&st(g.selected_id)}async function ne(m){e("requesting workspace switch to %s",m),rt=!0;try{let g=await te.send("set-workspace",{path:m});e("workspace switch result: %o",g),g&&g.workspace&&(ce.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),g.changed&&(await I(),ee("Switched to "+ke(m),"success",2e3)))}catch(g){throw e("workspace switch failed: %o",g),ee("Failed to switch workspace","error",3e3),g}finally{rt=!1}}async function ve(m){e("requesting workspace git pull for %s",m);try{let g=await te.send("git-pull-workspace",{});e("workspace git pull result: %o",g);let j=g?.status;if(j==="up_to_date"){ee("Already up to date","success",2e3);return}if(j==="stash_pop_conflict"){ee("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ee("Git pulled "+ke(m),"success",2e3)}catch(g){e("workspace git pull failed: %o",g);let j=g?.code,R=g?.message;if(j==="rebase_conflict"){ee("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(j==="rebase_conflict_abort_failed"){ee("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(j==="busy"){ee("Git pull skipped: another operation is running","warning",3e3);return}let p=R?`: ${R}`:"";throw ee(`Git pull failed${p}`,"error",3e3),g}}async function le(m,g){e("setting workspace visibility %s \u2192 %s",m,String(g));try{await te.send("set-workspace-visibility",{path:m,visible:g}),await Te()}catch(j){e("workspace visibility update failed: %o",j),ee("Failed to update project visibility","error",3e3)}}async function Te(){try{let m=await te.send("list-workspaces",{});if(e("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let g=m.workspaces.map(S=>({path:S.path,database:S.database,pid:S.pid,version:S.version})),j=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,R=Array.isArray(m.hidden)?m.hidden.filter(S=>typeof S=="string"):[];ce.setState({workspace:{current:j,available:g,hidden:R}});let p=window.localStorage.getItem("beads-ui.workspace");p&&(!g.some(z=>z.path===p)||R.includes(p)?window.localStorage.removeItem("beads-ui.workspace"):j&&p!==j.path&&(e("restoring saved workspace preference: %s",p),await ne(p)))}}catch(m){e("failed to load workspaces: %o",m)}}te.on("workspace-changed",m=>{e("workspace-changed event: %o",m),m&&m.root_dir&&(ce.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),Te(),I())});let He=!1;if(typeof te.onConnection=="function"){let m=g=>{e("ws state %s",g),g==="reconnecting"||g==="closed"?(He=!0,ee("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&He&&(He=!1,ee("Reconnected","success",2200),cd(ce,(j,R)=>{e(`${j}: %o`,R)}),b())};te.onConnection(m)}let et="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(et=m)}catch(m){e("view parse error: %o",m)}let ce=oo({config:ld(),view:et});te.on("worker-queue-snapshot",m=>{let g=m;if(!g||!g.queue)return;let j=ce.getState().workspace.current?.path;if(typeof j=="string"&&j.length>0&&g.root_dir!==j){e("dropping worker-queue snapshot for %s",String(g.root_dir));return}try{Ce.set(g.queue)}catch{}});let tt=no(ce);tt.start();let kt=async(m,g)=>{try{return await O(m,g)}catch{return[]}};n&&mi(n,ce,tt);let We=document.getElementById("workspace-picker");We&&Li(We,ce,ne,ve,le);let Qe=ki(t,(m,g)=>O(m,g));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>Qe.open())}catch{}let ae=li(t,{policyStore:oe,transport:(m,g)=>O(m,g),labelOptions:()=>{let m=new Set;for(let[g]of hs)for(let j of J.snapshotFor(g)||[]){let R=j.labels;if(Array.isArray(R))for(let p of R)typeof p=="string"&&p.length>0&&m.add(p)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>ae.open())}catch{}let me=_o(s,{gotoIssue:m=>tt.gotoIssue(m),issueStores:J,transport:kt,uiOrderStore:Se,displayPolicyStore:oe,closedRange:ot,onClosedRangeChange:m=>{he(m)},onNewIssue:()=>Qe.open()}),Tt=us(o,{transport:kt,issueStores:J,queueStore:Ce,sessionLogStore:qe,uiOrderStore:Se,gotoIssue:m=>ce.setState({selected_id:m}),getWorkspacePath:()=>ce.getState().workspace.current?.path}),Rt=_i(i,{pipelineStore:ie,gotoIssue:m=>tt.gotoIssue(m),getWorkspacePath:()=>ce.getState().workspace.current?.path,switchWorkspace:m=>ne(m)}),it=ii(l,{issueStores:J,transport:kt,queueStore:Ce,sessionLogStore:qe,getWorkspacePath:()=>ce.getState().workspace.current?.path,onNavigate:m=>{ce.getState().view==="worker"?ce.setState({selected_id:m}):tt.gotoIssue(m)},onClose:()=>{let m=ce.getState();ce.setState({selected_id:null});try{tt.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}}}),It=ce.getState().selected_id;It&&(l.hidden=!1,it.load(It),st(It)),ce.subscribe(m=>{let g=m.selected_id;g?(l.hidden=!1,it.load(g),rt||st(g)):(it.clear(),l.hidden=!0,Ze())});let qt=m=>{s.hidden=m.view!=="board",o.hidden=m.view!=="worker",i.hidden=m.view!=="monitor",Xe(m.view==="board"),Z(m.view==="worker"),_e(m.view==="monitor"),X(m.view==="worker"),!m.selected_id&&m.view==="board"&&me.load(),m.view==="worker"&&Tt.load(),m.view==="monitor"?Rt.load():Rt.pause(),window.localStorage.setItem("beads-ui.view",m.view)};ce.subscribe(qt),qt(ce.getState()),M(),Le(),Te().finally(()=>{ht=!0,wt()}),window.addEventListener("keydown",m=>{let g=m.ctrlKey||m.metaKey,j=String(m.key||"").toLowerCase(),R=m.target,p=R&&R.tagName?String(R.tagName).toLowerCase():"",S=p==="input"||p==="textarea"||p==="select"||R&&typeof R.isContentEditable=="boolean"&&R.isContentEditable;g&&j==="n"&&(S||(m.preventDefault(),Qe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&dd(e)});export{dd as bootstrap,ld as readBootstrapConfig,cd as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
