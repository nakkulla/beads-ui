var ol=Object.create;var zn=Object.defineProperty;var il=Object.getOwnPropertyDescriptor;var al=Object.getOwnPropertyNames;var ll=Object.getPrototypeOf,cl=Object.prototype.hasOwnProperty;var dl=(e,t,r)=>t in e?zn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var jn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ul=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of al(t))!cl.call(e,s)&&s!==r&&zn(e,s,{get:()=>t[s],enumerable:!(n=il(t,s))||n.enumerable});return e};var pl=(e,t,r)=>(r=e!=null?ol(ll(e)):{},ul(t||!e||!e.__esModule?zn(r,"default",{value:e,enumerable:!0}):r,e));var ze=(e,t,r)=>dl(e,typeof t!="symbol"?t+"":t,r);var ko=jn((fp,wo)=>{var vr=1e3,yr=vr*60,wr=yr*60,lr=wr*24,hl=lr*7,bl=lr*365.25;wo.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return vl(e);if(r==="number"&&isFinite(e))return t.long?wl(e):yl(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function vl(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*bl;case"weeks":case"week":case"w":return r*hl;case"days":case"day":case"d":return r*lr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*wr;case"minutes":case"minute":case"mins":case"min":case"m":return r*yr;case"seconds":case"second":case"secs":case"sec":case"s":return r*vr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function yl(e){var t=Math.abs(e);return t>=lr?Math.round(e/lr)+"d":t>=wr?Math.round(e/wr)+"h":t>=yr?Math.round(e/yr)+"m":t>=vr?Math.round(e/vr)+"s":e+"ms"}function wl(e){var t=Math.abs(e);return t>=lr?an(e,t,lr,"day"):t>=wr?an(e,t,wr,"hour"):t>=yr?an(e,t,yr,"minute"):t>=vr?an(e,t,vr,"second"):e+" ms"}function an(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var xo=jn((_p,$o)=>{function kl(e){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=ko(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let _=0;for(let y=0;y<p.length;y++)_=(_<<5)-_+p.charCodeAt(y),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(p){let _,y=null,A,k;function v(...O){if(!v.enabled)return;let q=v,J=Number(new Date),K=J-(_||J);q.diff=K,q.prev=_,q.curr=J,_=J,O[0]=r.coerce(O[0]),typeof O[0]!="string"&&O.unshift("%O");let P=0;O[0]=O[0].replace(/%([a-zA-Z%])/g,(S,C)=>{if(S==="%%")return"%";P++;let H=r.formatters[C];if(typeof H=="function"){let de=O[P];S=H.call(q,de),O.splice(P,1),P--}return S}),r.formatArgs.call(q,O),(q.log||r.log).apply(q,O)}return v.namespace=p,v.useColors=r.useColors(),v.color=r.selectColor(p),v.extend=n,v.destroy=r.destroy,Object.defineProperty(v,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(A!==r.namespaces&&(A=r.namespaces,k=r.enabled(p)),k),set:O=>{y=O}}),typeof r.init=="function"&&r.init(v),v}function n(p,_){let y=r(this.namespace+(typeof _>"u"?":":_)+p);return y.log=this.log,y}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let _=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of _)y[0]==="-"?r.skips.push(y.slice(1)):r.names.push(y)}function o(p,_){let y=0,A=0,k=-1,v=0;for(;y<p.length;)if(A<_.length&&(_[A]===p[y]||_[A]==="*"))_[A]==="*"?(k=A,v=y,A++):(y++,A++);else if(k!==-1)A=k+1,v++,y=v;else return!1;for(;A<_.length&&_[A]==="*";)A++;return A===_.length}function i(){let p=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),p}function l(p){for(let _ of r.skips)if(o(p,_))return!1;for(let _ of r.names)if(o(p,_))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}$o.exports=kl});var So=jn((xt,ln)=>{xt.formatArgs=xl;xt.save=Sl;xt.load=Al;xt.useColors=$l;xt.storage=Tl();xt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();xt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function $l(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function xl(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ln.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}xt.log=console.debug||console.log||(()=>{});function Sl(e){try{e?xt.storage.setItem("debug",e):xt.storage.removeItem("debug")}catch{}}function Al(){let e;try{e=xt.storage.getItem("debug")||xt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Tl(){try{return localStorage}catch{}}ln.exports=xo()(xt);var{formatters:El}=ln.exports;El.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Ir=globalThis,on=Ir.trustedTypes,io=on?on.createPolicy("lit-html",{createHTML:e=>e}):void 0,fo="$lit$",Zt=`lit$${Math.random().toFixed(9).slice(2)}$`,_o="?"+Zt,fl=`<${_o}>`,ir=document,Lr=()=>ir.createComment(""),Dr=e=>e===null||typeof e!="object"&&typeof e!="function",Zn=Array.isArray,_l=e=>Zn(e)||typeof e?.[Symbol.iterator]=="function",Hn=`[ 	
\f\r]`,Rr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ao=/-->/g,lo=/>/g,sr=RegExp(`>|${Hn}(?:([^\\s"'>=/]+)(${Hn}*=${Hn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),co=/'/g,uo=/"/g,mo=/^(?:script|style|textarea|title)$/i,Xn=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=Xn(1),Ut=Xn(2),ip=Xn(3),ar=Symbol.for("lit-noChange"),tt=Symbol.for("lit-nothing"),po=new WeakMap,or=ir.createTreeWalker(ir,129);function go(e,t){if(!Zn(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return io!==void 0?io.createHTML(t):t}var ml=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=Rr;for(let l=0;l<r;l++){let a=e[l],d,p,_=-1,y=0;for(;y<a.length&&(i.lastIndex=y,p=i.exec(a),p!==null);)y=i.lastIndex,i===Rr?p[1]==="!--"?i=ao:p[1]!==void 0?i=lo:p[2]!==void 0?(mo.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=sr):p[3]!==void 0&&(i=sr):i===sr?p[0]===">"?(i=s??Rr,_=-1):p[1]===void 0?_=-2:(_=i.lastIndex-p[2].length,d=p[1],i=p[3]===void 0?sr:p[3]==='"'?uo:co):i===uo||i===co?i=sr:i===ao||i===lo?i=Rr:(i=sr,s=void 0);let A=i===sr&&e[l+1].startsWith("/>")?" ":"";o+=i===Rr?a+fl:_>=0?(n.push(d),a.slice(0,_)+fo+a.slice(_)+Zt+A):a+Zt+(_===-2?l:A)}return[go(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Or=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=t.length-1,a=this.parts,[d,p]=ml(t,r);if(this.el=e.createElement(d,n),or.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=or.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(fo)){let y=p[i++],A=s.getAttribute(_).split(Zt),k=/([.?@])?(.*)/.exec(y);a.push({type:1,index:o,name:k[2],strings:A,ctor:k[1]==="."?Gn:k[1]==="?"?Yn:k[1]==="@"?Vn:hr}),s.removeAttribute(_)}else _.startsWith(Zt)&&(a.push({type:6,index:o}),s.removeAttribute(_));if(mo.test(s.tagName)){let _=s.textContent.split(Zt),y=_.length-1;if(y>0){s.textContent=on?on.emptyScript:"";for(let A=0;A<y;A++)s.append(_[A],Lr()),or.nextNode(),a.push({type:2,index:++o});s.append(_[y],Lr())}}}else if(s.nodeType===8)if(s.data===_o)a.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Zt,_+1))!==-1;)a.push({type:7,index:o}),_+=Zt.length-1}o++}}static createElement(t,r){let n=ir.createElement("template");return n.innerHTML=t,n}};function gr(e,t,r=e,n){if(t===ar)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Dr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=gr(e,s._$AS(e,t.values),s,n)),t}var Wn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??ir).importNode(r,!0);or.currentNode=s;let o=or.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new Pr(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new Kn(o,this,t)),this._$AV.push(d),a=n[++l]}i!==a?.index&&(o=or.nextNode(),i++)}return or.currentNode=ir,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Pr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=tt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=gr(this,t,r),Dr(t)?t===tt||t==null||t===""?(this._$AH!==tt&&this._$AR(),this._$AH=tt):t!==this._$AH&&t!==ar&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):_l(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==tt&&Dr(this._$AH)?this._$AA.nextSibling.data=t:this.T(ir.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Or.createElement(go(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Wn(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(t){let r=po.get(t.strings);return r===void 0&&po.set(t.strings,r=new Or(t)),r}k(t){Zn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Lr()),this.O(Lr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},hr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=tt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=tt}_$AI(t,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)t=gr(this,t,r,0),i=!Dr(t)||t!==this._$AH&&t!==ar,i&&(this._$AH=t);else{let l=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=gr(this,l[n+a],r,a),d===ar&&(d=this._$AH[a]),i||(i=!Dr(d)||d!==this._$AH[a]),d===tt?t=tt:t!==tt&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}i&&!s&&this.j(t)}j(t){t===tt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Gn=class extends hr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===tt?void 0:t}},Yn=class extends hr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==tt)}},Vn=class extends hr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=gr(this,t,r,0)??tt)===ar)return;let n=this._$AH,s=t===tt&&n!==tt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==tt&&(n===tt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Kn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){gr(this,t)}};var gl=Ir.litHtmlPolyfillSupport;gl?.(Or,Pr),(Ir.litHtmlVersions??(Ir.litHtmlVersions=[])).push("3.3.1");var Oe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Pr(t.insertBefore(Lr(),o),o,void 0,r??{})}return s._$AI(e),s};var Et="today",Ft=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function zt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function br(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ho(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function bo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function vo(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function yo(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Ao=pl(So(),1);function Ve(e){return(0,Ao.default)(`beads-ui:${e}`)}function Lt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function cr(e,t){let r=Lt(e.created_at),n=Lt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Co(e,t){let r=Lt(e.created_at),n=Lt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Ro(e,t){let r=Lt(e.updated_at),n=Lt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Io(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Lt(e.created_at),o=Lt(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Lo(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Cl=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function To(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Eo(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Cl.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Do(e,t){let r=To(e),n=To(t);if(r!==n)return r<n?-1:1;let s=Eo(e),o=Eo(t);if(s!==o)return s<o?-1:1;let i=Lt(e&&e.created_at),l=Lt(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,d=t&&t.id;return a===d?0:String(a)<String(d)?-1:1}var Qn=2**20;function kr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Lt(e&&e.created_at)}function cn(e){return(t,r)=>{let n=kr(t,e),s=kr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Jn(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:kr(l,r)-Qn};if(!l)return{rank:kr(i,r)+Qn};let a=kr(i,r),d=kr(l,r),p=(a+d)/2;return a<p&&p<d?{rank:p}:{renormalize:n.map((_,y)=>({bead_id:_.id,rank:y*Qn}))}}function es(e,t={}){let r=Ve(`issue-store:${e}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=t.sort||cr;function d(){for(let y of Array.from(i))try{y()}catch{}}function p(){s=Array.from(n.values()).sort(a)}function _(y){if(l||!y||y.id!==e)return;let A=Number(y.revision)||0;if(r("apply %s rev=%d",y.type,A),!(A<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(A<=o)return;n.clear();let k=Array.isArray(y.issues)?y.issues:[];for(let v of k)v&&typeof v.id=="string"&&v.id.length>0&&n.set(v.id,v);p(),o=A,d();return}if(y.type==="upsert"){let k=y.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let v=n.get(k.id);if(!v)n.set(k.id,k);else{let O=Number.isFinite(v.updated_at)?v.updated_at:0,q=Number.isFinite(k.updated_at)?k.updated_at:0;if(O<=q){for(let J of Object.keys(v))J in k||delete v[J];for(let[J,K]of Object.entries(k))v[J]=K}}p()}o=A,d()}else if(y.type==="delete"){let k=String(y.issue_id||"");k&&(n.delete(k),p()),o=A,d()}}}return{id:e,subscribe(y){return i.add(y),()=>{i.delete(y)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(y){return n.get(y)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function dn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Oo(e){let t=Ve("subs"),r=new Map,n=new Map;function s(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let p=Array.isArray(a.added)?a.added:[],_=Array.isArray(a.updated)?a.updated:[],y=Array.isArray(a.removed)?a.removed:[];for(let A of Array.from(d)){let k=r.get(A);if(!k)continue;let v=k.itemsById;for(let O of p)typeof O=="string"&&O.length>0&&v.set(O,!0);for(let O of _)typeof O=="string"&&O.length>0&&v.set(O,!0);for(let O of y)typeof O=="string"&&O.length>0&&v.delete(O)}}async function o(l,a){let d=dn(a);if(t("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let _=r.get(l);if(_&&_.key!==d){let y=n.get(_.key);y&&(y.delete(l),y.size===0&&n.delete(_.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(_){let y=r.get(l)||null;if(y){let A=n.get(y.key);A&&(A.delete(l),A.size===0&&n.delete(y.key))}throw r.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let _=r.get(l)||null;if(_){let y=n.get(_.key);y&&(y.delete(l),y.size===0&&n.delete(_.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:dn,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=r.get(l);return d?d.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),d={};if(!a)return d;for(let p of a.itemsById.keys())d[p]=!0;return d}}}}function Po(){let e=Ve("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,d,p){let _=d?dn(d):"",y=r.get(a)||"",A=t.has(a);if(e("register %s key=%s (prev=%s)",a,_,y),A&&y&&_&&y!==_){let k=t.get(a);if(k)try{k.dispose()}catch{}let v=s.get(a);if(v){try{v()}catch{}s.delete(a)}let O=es(a,p);t.set(a,O);let q=O.subscribe(()=>o());s.set(a,q)}else if(!A){let k=es(a,p);t.set(a,k);let v=k.subscribe(()=>o());s.set(a,v)}return r.set(a,_),()=>l(a)}function l(a){e("unregister %s",a),r.delete(a);let d=t.get(a);d&&(d.dispose(),t.delete(a));let p=s.get(a);if(p){try{p()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let d=t.get(a);return d?d.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function Mo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function No(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ts(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Rl(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Il(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Fo(e){let t=Ve("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Rl(n),i=Il(n);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=ts(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?ts(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Ll=Object.freeze({workspace_config:{default_workspace:null}});function qo(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Ll.workspace_config.default_workspace}}}function Bo(e={}){let t=Ve("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:qo(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?qo(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!l&&!a||(r=i,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Uo(e){let t=Ve("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function i(){r+=1,t("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function a(d){return async(_,y)=>{let A=s++,k=Date.now();n.set(A,{type:_,start_ts:k}),t("request start id=%d type=%s count=%d",A,_,r+1),i();let v=!1,O=()=>{v||(v=!0,n.delete(A),l())},q=setTimeout(()=>{v||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,_,Date.now()-k),O())},3e4);try{let J=await d(_,y),K=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",A,_,K),J}catch(J){let K=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,_,K,J),J}finally{clearTimeout(q),O()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,_])=>({id:p,type:_.type,elapsed_ms:d-_.start_ts}))}}}function se(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function un(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Lo),a;switch(l){case"created_desc":return a.sort(cr),a;case"created_asc":return a.sort(Co),a;case"updated_desc":return a.sort(Ro),a;case"priority":return a.sort(Io),a;case"manual":default:{let d=r();return d?a.sort(cn(d)):a.sort(cr),a}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Mr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function gt(e){let t=Mr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Tt(e,t){let r=Mr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function pn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Mr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function fn(e){let t=e.transport,r=e.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let d of l)a[d.bead_id]=d.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(Jn(l,a,d.order),i);s(d,p);let _=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(_&&_.conflict){let y={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(y);let A=n(Jn(l,a,y.order),i);s(y,A);let k=await t("ui-order-set",{expected_revision:y.revision,entries:A});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function _n(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function rs(e,t){return!t||typeof e!="string"||e.length===0||_n(t.visible_labels).includes(e)?!0:_n(t.hidden_labels).includes(e)?!1:!_n(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function mn(e,t){return _n(e).filter(r=>rs(r,t))}function Xt(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Dl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},jo={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},zo={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Ol={review:"\u2713",skip:"\u2298"},Qt={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Pl(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ho(e){let t=e&&e.fill||"none";return t==="none"?Qt.none:e&&e.stale===!0?Qt.stale:t==="dim"?Qt.dim:e&&e.glyph==="review"?Qt.review:e&&e.glyph==="skip"?Qt.skip:Qt.done}function Ml(e){if(!e||e.fill==="none"||!e.approval_state)return Ho(e);let t=[];return e.glyph==="review"?t.push(Qt.review):e.glyph==="skip"&&t.push(Qt.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Nl(e,t,r){let n=Dl[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,i=Ol[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let a=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${l} style=${d}>${i}</div>
      <div class=${a}>
        ${jo[e]||e}
      </div>
    </div>
  `}function gn(e,t){if(!e||!e.stages)return"";let r=zo[e.route]||zo.spec_backed,n=e.stages,s=Pl(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(i=>`${jo[i]||i} ${i==="plan"?Ml(n[i]||{}):Ho(n[i]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(i=>Nl(i,n[i]||{},i===s))}
    </div>
  `}function Fl(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Wo=2;function ql(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Wo).join(", "),s=r.length-Wo,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Bl(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Xt(r,"route")){let i=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&Xt(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Xt(r,"pr")){let i=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}for(let i of mn(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);e.from_id&&Xt(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Xt(r,"blocked")&&s.push(...ql(e.blocked_info));let o=t.cleanupFailureFor?t.cleanupFailureFor(e.id):null;if(o&&Xt(r,"blocked")){let i=t.isCleanupDiagnosisPending?t.isCleanupDiagnosisPending(e.id):!1,l=o.diagnosis&&typeof o.diagnosis=="object"&&!Array.isArray(o.diagnosis)?o.diagnosis:null;if(s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),l){let a=l.malformed===!0||l.verdict==="malformed"?"\uD310\uC815 \uBD88\uAC00":String(l.verdict||"\uD310\uC815 \uBD88\uAC00"),d=typeof l.evidence=="string"?l.evidence.trim().slice(0,96):"",p=typeof l.fix_bead_id=="string"&&l.fix_bead_id.length>0?` \xB7 fix ${l.fix_bead_id}`:"",_=d?` \xB7 ${d}`:"";s.push(c`<span
          class="ctl-chip ctl-chip--cleanup board-card__cleanup-diagnosis"
          title=${d}
          >AI ${a}${_}${p}</span
        >`)}s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--cleanup board-card__cleanup-diagnose"
        data-bead-id=${e.id}
        ?disabled=${i}
        title="정리 실패 원인을 AI 세션으로 분류합니다"
        @click=${a=>{t.onCleanupDiagnose&&t.onCleanupDiagnose(a,e.id)}}
      >
        AI 정리
      </button>`)}return s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Ul(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function zl(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${gt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function jl(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Do):r.children;return c`
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
        ${zl(e)}
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
                  <span class=${Ul(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function hn(e,t){let r=Fl(e.priority);return c`
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
      ${Bl(e,t)}
      ${e.workflow&&Xt(t.policy||null,"stepper")?gn(e.workflow,e.status):""}
      ${jl(e,t)}
    </article>
  `}function $r(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
              ${Ft.map(o=>c`<option
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
        ${e.items.map(o=>hn(o,t))}
      </div>
    </section>
  `}function Go(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>hn(n,t))}
        </div>
      </div>
    </dialog>
  `}var Hl=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Wl=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Gl=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Yl(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function Yo(e,t,r){return c`
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
        ${Hl.map(n=>c`<option
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
        ${Wl.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Yl(e,t,r)}
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
        ${Gl.map(n=>c`<option
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
  `}var Vl=200,Kl={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Zl=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Vo="beads-ui.board.sort",Ko=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Xl(){try{let e=window.localStorage.getItem(Vo);if(e&&Ko.has(e))return e}catch{}return"created_desc"}function Zo(e,t){let r=Ve("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,_=t.closedRange||Et,y=s?un(s,i):null,A=fn({transport:o,uiOrderStore:i}),k=[],v=[],O=[],q=[],J=[],K=[],P=!1,I=0,S=Xl(),C=new Map,H=new Map,de=new Map,ke=new Set,fe=new Set,ue={search:"",priority:"",type:"",labels:[]},Ee=!1,Ue=null;function Ke(E){return String(E.status||"open")==="open"}function je(E){let F=String(E.status||"open");return F==="open"||F==="blocked"}function $e(E){let F=ue.search.trim().toLowerCase(),te=ue.priority,u=ue.type,m=ue.labels;return E.filter(T=>{if(F){let X=String(T.id||"").toLowerCase(),he=String(T.title||"").toLowerCase();if(!X.includes(F)&&!he.includes(F))return!1}if(te!==""&&String(T.priority)!==te||u!==""&&String(T.issue_type||"")!==u)return!1;if(m.length>0){let X=Array.isArray(T.labels)?T.labels:[];if(!m.some(he=>X.includes(he)))return!1}return!0})}function L(){let E=new Set;for(let F of[k,v,O,q,J,K])for(let te of F){let u=Array.isArray(te.labels)?te.labels:[];for(let m of u)typeof m=="string"&&m.length>0&&E.add(m)}return Array.from(E).sort()}function z(){return ue.search.trim()!==""||ue.priority!==""||ue.type!==""||ue.labels.length>0}function me(){try{if(y){let E=y.selectBoardColumn("tab:board:in-progress","in_progress",S),F=y.selectBoardColumn("tab:board:blocked","blocked",S).filter(je),te=new Set(E.map(ie=>ie.id)),u=y.selectBoardColumn("tab:board:ready","ready",S).filter(ie=>Ke(ie)&&!te.has(ie.id)),m=y.selectBoardColumn("tab:board:resolved","resolved",S),T=y.selectBoardColumn("tab:board:deferred","deferred",S),X=y.selectBoardColumn("tab:board:closed","closed").slice(0,Vl),he=[...F,...u,...E,...m,...X];oe(he);let Se=new Set;for(let ie of he)ie&&ie.id&&!ns(ie)&&Se.add(ie.id);let ye=!z();k=ye?Nr(F,Se):F,v=ye?Nr(u,Se):u,O=ye?Nr(E,Se):E,q=ye?Nr(m,Se):m,J=T,I=T.length,K=ye?Nr(X,Se):X,C=new Map;for(let ie of k)C.set(ie.id,"open");for(let ie of v)C.set(ie.id,"open");for(let ie of O)C.set(ie.id,"in_progress");for(let ie of q)C.set(ie.id,"resolved");for(let ie of J)C.set(ie.id,"deferred");for(let ie of K)C.set(ie.id,"closed");H=new Map;for(let ie of k)H.set(ie.id,"blocked-col");for(let ie of v)H.set(ie.id,"ready-col");for(let ie of O)H.set(ie.id,"in-progress-col");for(let ie of q)H.set(ie.id,"resolved-col");for(let ie of K)H.set(ie.id,"closed-col")}We()}catch{k=[],v=[],O=[],q=[],J=[],K=[],de=new Map,We()}}function oe(E){let F=new Map;for(let u of E)u&&u.id&&!F.has(u.id)&&F.set(u.id,u);let te=new Map;for(let u of F.values()){let m=ns(u);if(!m)continue;let T=te.get(m);T||(T=[],te.set(m,T)),T.push({id:u.id,title:u.title,status:u.status,metadata:u.metadata,created_at:u.created_at,updated_at:u.updated_at})}de=te}function we(E){let F=de.get(E)||[],te=0;for(let m of F)(m.status==="resolved"||m.status==="closed")&&(te+=1);let u=pn(F);return{total:F.length,count:te,current:u,children:F}}function ge(E){return!ke.has(E)}function Be(E,F){E.preventDefault(),E.stopPropagation(),ke.has(F)?ke.delete(F):ke.add(F),We()}function be(E,F){E.preventDefault(),E.stopPropagation(),n(F)}function Ce(E,F){E.preventDefault(),E.stopPropagation(),n(F)}function B(E,F){Ue||n(F)}function D(E,F){E.preventDefault(),E.stopPropagation(),Ql(F).then(te=>{te&&se("\uBCF5\uC0AC\uB428","success",1200)})}function ne(E,F){Ue=F,E.dataTransfer&&(E.dataTransfer.setData("text/plain",F),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function xe(E){E.target.classList.remove("board-card--dragging"),_t(),setTimeout(()=>{Ue=null},0)}function Re(E){let F=String(E.target.value||"");!F||F===_||(_=F,d&&d(F),We())}function N(){return l?l.get():null}function U(E){let F=a?a.get():null,te=F?F.cleanup_failed:null;if(!te||typeof te!="object"||Array.isArray(te))return null;let u=te[E];return!u||typeof u!="object"||Array.isArray(u)?null:u}function M(E,F){if(!E||typeof E!="object"||Array.isArray(E))return!1;let te=Object.values(E),u=new Set;for(let m of te)m&&typeof m=="object"&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);return te.some(m=>m&&typeof m=="object"&&m.bead_id===F&&m.cleanup_diagnosis===!0&&(m.status==="running"||m.status==="paused"&&!u.has(m.attempt_id)))}function ae(E){let F=a?a.get():null;return fe.has(E)||M(F?F.attempts:null,E)}function ce(E){E&&E.queue&&a&&a.set(E.queue)}async function w(E,F){if(E.preventDefault(),E.stopPropagation(),!o||!a||!U(F)||fe.has(F))return;fe.add(F),We();let te;try{let u=a.get(),m=u&&typeof u.revision=="number"?u.revision:0;if(te=await o("worker-cleanup-diagnose",{bead_id:F,expected_revision:m}),ce(te),te&&te.conflict){let T=a.get(),X=T&&typeof T.revision=="number"?T.revision:0;te=await o("worker-cleanup-diagnose",{bead_id:F,expected_revision:X}),ce(te)}}finally{fe.delete(F),We()}te&&!te.conflict&&te.ok===!1&&te.reason&&se(`AI \uC815\uB9AC \uAC70\uBD80: ${te.reason}`,"error",2400)}let G={onCardClick:B,onCopyId:D,onDragStart:ne,onDragEnd:xe,onClosedRangeChange:Re,rollupFor:we,isExpanded:ge,onRollupToggle:Be,onChildClick:be,onFromChipClick:Ce,cleanupFailureFor:U,isCleanupDiagnosisPending:ae,onCleanupDiagnose:w,get policy(){return N()}};function W(E,F){Ue||(pt(),n(F))}function ee(E,F){E.preventDefault(),E.stopPropagation(),pt(),n(F)}let pe={...G,onCardClick:W,onChildClick:ee,onFromChipClick:ee,get policy(){return N()}};function Te(E){let F=E.target,te=e.querySelector(".board-filter__labels");F&&te&&te.contains(F)||Xe()}function Ne(E){E.key==="Escape"&&Xe()}function Ze(){Ee||(Ee=!0,document.addEventListener("mousedown",Te),document.addEventListener("keydown",Ne),We())}function Xe(){Ee&&(Ee=!1,document.removeEventListener("mousedown",Te),document.removeEventListener("keydown",Ne),We())}function lt(E){E.key==="Escape"&&pt()}function st(){P||(P=!0,document.addEventListener("keydown",lt),We())}function pt(){P&&(P=!1,document.removeEventListener("keydown",lt),We())}let ht={onClose:pt,onOverlayClick(E){E.target===E.currentTarget&&pt()}},De={onSearchInput(E){ue.search=String(E.target.value||""),me()},onPriorityChange(E){ue.priority=String(E.target.value||""),me()},onTypeChange(E){ue.type=String(E.target.value||""),me()},onSortChange(E){let F=String(E.target.value||"");if(!(!Ko.has(F)||F===S)){S=F;try{window.localStorage.setItem(Vo,F)}catch{}me()}},onDeferredToggle(){P?pt():st()},onLabelMenuToggle(){Ee?Xe():Ze()},onLabelToggle(E){let F=ue.labels.indexOf(E);F===-1?ue.labels.push(E):ue.labels.splice(F,1),me()},onLabelClear(){ue.labels.length!==0&&(ue.labels=[],me())},onNewIssue(){p&&p()}};function ot(){return c`
      <div class="board-view">
        ${Yo(ue,De,{sort_mode:S,deferred_popup_open:P,deferred_count:I,label_options:L(),label_menu_open:Ee})}
        <div class="board-root">
          ${$r({title:"Blocked",id:"blocked-col",items:$e(k)},G)}
          ${$r({title:"Ready",id:"ready-col",items:$e(v)},G)}
          ${$r({title:"In progress",id:"in-progress-col",items:$e(O)},G)}
          ${$r({title:"Resolved",id:"resolved-col",items:$e(q)},G)}
          ${$r({title:"Closed",id:"closed-col",items:$e(K),is_closed:!0,closed_range:_},G)}
        </div>
        ${P?Go({items:$e(J),count:I},pe,ht):""}
      </div>
    `}function We(){Oe(ot(),e),ft()}function ft(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let F=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let te of F)Array.from(te.querySelectorAll(".board-card")).forEach((m,T)=>{m.tabIndex=T===0?0:-1})}catch{}}async function ct(E,F){if(!o){se("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:E,status:F}),se("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(te){r("update-status failed: %o",te),se("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function rt(E){switch(E){case"blocked-col":return k;case"ready-col":return v;case"in-progress-col":return O;case"resolved-col":return q;default:return[]}}function it(E,F,te){if(!o||!i)return;let u=rt(E),m=u.find(ye=>ye.id===F);if(!m)return;let T=u.filter(ye=>ye.id!==F),X=te.closest?te.closest(".board-card"):null,he=T.length;if(X){let ye=X.getAttribute("data-issue-id");if(ye===F)return;let ie=T.findIndex(Ie=>Ie.id===ye);ie>=0&&(he=ie)}let Se=T.slice();Se.splice(he,0,m),A.applyReorder(F,Se,he)}function _t(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let Je=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let te=E.target.closest(".board-column");te&&te!==Je&&(Je&&Je.classList.remove("board-column--drag-over"),te.classList.add("board-column--drag-over"),Je=te)}),e.addEventListener("dragleave",E=>{let F=E.relatedTarget;(!F||!e.contains(F))&&Je&&(Je.classList.remove("board-column--drag-over"),Je=null)}),e.addEventListener("drop",E=>{E.preventDefault(),Je&&(Je.classList.remove("board-column--drag-over"),Je=null);let F=E.target,te=F.closest(".board-column");if(!te)return;let u=E.dataTransfer?.getData("text/plain")||"";if(!u)return;let m=te.id,T=H.get(u);if(T&&T===m){if(Zl.has(m)){if(S!=="manual"){se("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}it(m,u,F)}return}let X=Kl[m];if(!X){se("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}C.get(u)!==X&&ct(u,X)}),e.addEventListener("keydown",E=>{let F=E.target;if(!(F instanceof HTMLElement))return;let te=String(F.tagName||"").toLowerCase();if(te==="input"||te==="textarea"||te==="select"||te==="button"||te==="a"||F.isContentEditable===!0)return;let u=F.closest(".board-card");if(!u)return;let m=String(E.key||"");if(m==="Enter"||m===" "){E.preventDefault();let Se=u.getAttribute("data-issue-id");Se&&n(Se);return}if(m!=="ArrowUp"&&m!=="ArrowDown"&&m!=="ArrowLeft"&&m!=="ArrowRight")return;E.preventDefault();let T=u.closest(".board-column");if(!T)return;let X=Array.from(T.querySelectorAll(".board-card")),he=X.indexOf(u);if(m==="ArrowDown"&&he<X.length-1){bt(u,X[he+1]);return}if(m==="ArrowUp"&&he>0){bt(u,X[he-1]);return}if(m==="ArrowLeft"||m==="ArrowRight"){let Se=Array.from(e.querySelectorAll(".board-column")),ye=Se.indexOf(T),ie=m==="ArrowRight"?1:-1,Ie=ye+ie;for(;Ie>=0&&Ie<Se.length;){let Ge=Se[Ie].querySelector(".board-card");if(Ge){bt(u,Ge);return}Ie+=ie}}});function bt(E,F){try{E.tabIndex=-1,F.tabIndex=0,F.focus()}catch{}}let Qe=null;y&&y.subscribe&&(Qe=y.subscribe(()=>{try{me()}catch{}}));let dt=null;l&&l.subscribe&&(dt=l.subscribe(()=>{try{me()}catch{}}));let ut=null;return a&&a.subscribe&&(ut=a.subscribe(()=>{We()})),{async load(){r("load"),me()},clear(){Xe(),pt(),Qe&&(Qe(),Qe=null),dt&&(dt(),dt=null),ut&&(ut(),ut=null),e.replaceChildren(),k=[],v=[],O=[],q=[],J=[],K=[],C=new Map,H=new Map}}}function ns(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Nr(e,t){return e.filter(r=>{let n=ns(r);return!(n&&t.has(n))})}async function Ql(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function dr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Jl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ur(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var jt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function Xo(e){let t=0;for(let r of jt)t+=ur(e?.[r]);return t}function Qo(e){return!e||typeof e!="object"?!1:jt.some(t=>Number.isFinite(e[t]))}function ec(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function xr(e){return Qo(e)?`\u03C4 ${ec(Xo(e))}`:null}function Dt(e){let t=xr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Sr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ur(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ur(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ur(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ur(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Xo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Jl),r.join(`
`)}function qt(e,t){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,i=!1;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Qo(a)){n+=1;for(let d of jt)r[d]=ur(r[d])+ur(a[d]);typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)&&(s+=a.total_cost_usd,o+=1),a.replayed===!0&&(i=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),i&&(r.replayed=!0),r)}var{entries:ai,setPrototypeOf:Jo,isFrozen:tc,getPrototypeOf:rc,getOwnPropertyDescriptor:nc}=Object,{freeze:yt,seal:Ct,create:ds}=Object,{apply:us,construct:ps}=typeof Reflect<"u"&&Reflect;yt||(yt=function(t){return t});Ct||(Ct=function(t){return t});us||(us=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ps||(ps=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var bn=wt(Array.prototype.forEach),sc=wt(Array.prototype.lastIndexOf),ei=wt(Array.prototype.pop),Fr=wt(Array.prototype.push),oc=wt(Array.prototype.splice),yn=wt(String.prototype.toLowerCase),ss=wt(String.prototype.toString),os=wt(String.prototype.match),qr=wt(String.prototype.replace),ic=wt(String.prototype.indexOf),ac=wt(String.prototype.trim),Ot=wt(Object.prototype.hasOwnProperty),vt=wt(RegExp.prototype.test),Br=lc(TypeError);function wt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return us(e,t,n)}}function lc(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ps(e,r)}}function Le(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:yn;Jo&&Jo(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(tc(t)||(t[n]=o),s=o)}e[s]=!0}return e}function cc(e){for(let t=0;t<e.length;t++)Ot(e,t)||(e[t]=null);return e}function Ht(e){let t=ds(null);for(let[r,n]of ai(e))Ot(e,r)&&(Array.isArray(n)?t[r]=cc(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Ht(n):t[r]=n);return t}function Ur(e,t){for(;e!==null;){let n=nc(e,t);if(n){if(n.get)return wt(n.get);if(typeof n.value=="function")return wt(n.value)}e=rc(e)}function r(){return null}return r}var ti=yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),is=yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),as=yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),dc=yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ls=yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),uc=yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ri=yt(["#text"]),ni=yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),cs=yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),si=yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),vn=yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),pc=Ct(/\{\{[\w\W]*|[\w\W]*\}\}/gm),fc=Ct(/<%[\w\W]*|[\w\W]*%>/gm),_c=Ct(/\$\{[\w\W]*/gm),mc=Ct(/^data-[\-\w.\u00B7-\uFFFF]+$/),gc=Ct(/^aria-[\-\w]+$/),li=Ct(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),hc=Ct(/^(?:\w+script|data):/i),bc=Ct(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ci=Ct(/^html$/i),vc=Ct(/^[a-z][.\w]*(-[.\w]+)+$/i),oi=Object.freeze({__proto__:null,ARIA_ATTR:gc,ATTR_WHITESPACE:bc,CUSTOM_ELEMENT:vc,DATA_ATTR:mc,DOCTYPE_NAME:ci,ERB_EXPR:fc,IS_ALLOWED_URI:li,IS_SCRIPT_OR_DATA:hc,MUSTACHE_EXPR:pc,TMPLIT_EXPR:_c}),zr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},yc=function(){return typeof window>"u"?null:window},wc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ii=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function di(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:yc(),t=le=>di(le);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==zr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:y,trustedTypes:A}=e,k=a.prototype,v=Ur(k,"cloneNode"),O=Ur(k,"remove"),q=Ur(k,"nextSibling"),J=Ur(k,"childNodes"),K=Ur(k,"parentNode");if(typeof i=="function"){let le=r.createElement("template");le.content&&le.content.ownerDocument&&(r=le.content.ownerDocument)}let P,I="",{implementation:S,createNodeIterator:C,createDocumentFragment:H,getElementsByTagName:de}=r,{importNode:ke}=n,fe=ii();t.isSupported=typeof ai=="function"&&typeof K=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ue,ERB_EXPR:Ee,TMPLIT_EXPR:Ue,DATA_ATTR:Ke,ARIA_ATTR:je,IS_SCRIPT_OR_DATA:$e,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:z}=oi,{IS_ALLOWED_URI:me}=oi,oe=null,we=Le({},[...ti,...is,...as,...ls,...ri]),ge=null,Be=Le({},[...ni,...cs,...si,...vn]),be=Object.seal(ds(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ce=null,B=null,D=Object.seal(ds(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ne=!0,xe=!0,Re=!1,N=!0,U=!1,M=!0,ae=!1,ce=!1,w=!1,G=!1,W=!1,ee=!1,pe=!0,Te=!1,Ne="user-content-",Ze=!0,Xe=!1,lt={},st=null,pt=Le({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ht=null,De=Le({},["audio","video","img","source","image","track"]),ot=null,We=Le({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ft="http://www.w3.org/1998/Math/MathML",ct="http://www.w3.org/2000/svg",rt="http://www.w3.org/1999/xhtml",it=rt,_t=!1,Je=null,bt=Le({},[ft,ct,rt],ss),Qe=Le({},["mi","mo","mn","ms","mtext"]),dt=Le({},["annotation-xml"]),ut=Le({},["title","style","font","a","script"]),E=null,F=["application/xhtml+xml","text/html"],te="text/html",u=null,m=null,T=r.createElement("form"),X=function(h){return h instanceof RegExp||h instanceof Function},he=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(m&&m===h)){if((!h||typeof h!="object")&&(h={}),h=Ht(h),E=F.indexOf(h.PARSER_MEDIA_TYPE)===-1?te:h.PARSER_MEDIA_TYPE,u=E==="application/xhtml+xml"?ss:yn,oe=Ot(h,"ALLOWED_TAGS")?Le({},h.ALLOWED_TAGS,u):we,ge=Ot(h,"ALLOWED_ATTR")?Le({},h.ALLOWED_ATTR,u):Be,Je=Ot(h,"ALLOWED_NAMESPACES")?Le({},h.ALLOWED_NAMESPACES,ss):bt,ot=Ot(h,"ADD_URI_SAFE_ATTR")?Le(Ht(We),h.ADD_URI_SAFE_ATTR,u):We,ht=Ot(h,"ADD_DATA_URI_TAGS")?Le(Ht(De),h.ADD_DATA_URI_TAGS,u):De,st=Ot(h,"FORBID_CONTENTS")?Le({},h.FORBID_CONTENTS,u):pt,Ce=Ot(h,"FORBID_TAGS")?Le({},h.FORBID_TAGS,u):Ht({}),B=Ot(h,"FORBID_ATTR")?Le({},h.FORBID_ATTR,u):Ht({}),lt=Ot(h,"USE_PROFILES")?h.USE_PROFILES:!1,ne=h.ALLOW_ARIA_ATTR!==!1,xe=h.ALLOW_DATA_ATTR!==!1,Re=h.ALLOW_UNKNOWN_PROTOCOLS||!1,N=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,U=h.SAFE_FOR_TEMPLATES||!1,M=h.SAFE_FOR_XML!==!1,ae=h.WHOLE_DOCUMENT||!1,G=h.RETURN_DOM||!1,W=h.RETURN_DOM_FRAGMENT||!1,ee=h.RETURN_TRUSTED_TYPE||!1,w=h.FORCE_BODY||!1,pe=h.SANITIZE_DOM!==!1,Te=h.SANITIZE_NAMED_PROPS||!1,Ze=h.KEEP_CONTENT!==!1,Xe=h.IN_PLACE||!1,me=h.ALLOWED_URI_REGEXP||li,it=h.NAMESPACE||rt,Qe=h.MATHML_TEXT_INTEGRATION_POINTS||Qe,dt=h.HTML_INTEGRATION_POINTS||dt,be=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&X(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&X(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),U&&(xe=!1),W&&(G=!0),lt&&(oe=Le({},ri),ge=[],lt.html===!0&&(Le(oe,ti),Le(ge,ni)),lt.svg===!0&&(Le(oe,is),Le(ge,cs),Le(ge,vn)),lt.svgFilters===!0&&(Le(oe,as),Le(ge,cs),Le(ge,vn)),lt.mathMl===!0&&(Le(oe,ls),Le(ge,si),Le(ge,vn))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?D.tagCheck=h.ADD_TAGS:(oe===we&&(oe=Ht(oe)),Le(oe,h.ADD_TAGS,u))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?D.attributeCheck=h.ADD_ATTR:(ge===Be&&(ge=Ht(ge)),Le(ge,h.ADD_ATTR,u))),h.ADD_URI_SAFE_ATTR&&Le(ot,h.ADD_URI_SAFE_ATTR,u),h.FORBID_CONTENTS&&(st===pt&&(st=Ht(st)),Le(st,h.FORBID_CONTENTS,u)),Ze&&(oe["#text"]=!0),ae&&Le(oe,["html","head","body"]),oe.table&&(Le(oe,["tbody"]),delete Ce.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw Br('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Br('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=h.TRUSTED_TYPES_POLICY,I=P.createHTML("")}else P===void 0&&(P=wc(A,s)),P!==null&&typeof I=="string"&&(I=P.createHTML(""));yt&&yt(h),m=h}},Se=Le({},[...is,...as,...dc]),ye=Le({},[...ls,...uc]),ie=function(h){let j=K(h);(!j||!j.tagName)&&(j={namespaceURI:it,tagName:"template"});let f=yn(h.tagName),b=yn(j.tagName);return Je[h.namespaceURI]?h.namespaceURI===ct?j.namespaceURI===rt?f==="svg":j.namespaceURI===ft?f==="svg"&&(b==="annotation-xml"||Qe[b]):!!Se[f]:h.namespaceURI===ft?j.namespaceURI===rt?f==="math":j.namespaceURI===ct?f==="math"&&dt[b]:!!ye[f]:h.namespaceURI===rt?j.namespaceURI===ct&&!dt[b]||j.namespaceURI===ft&&!Qe[b]?!1:!ye[f]&&(ut[f]||!Se[f]):!!(E==="application/xhtml+xml"&&Je[h.namespaceURI]):!1},Ie=function(h){Fr(t.removed,{element:h});try{K(h).removeChild(h)}catch{O(h)}},Ge=function(h,j){try{Fr(t.removed,{attribute:j.getAttributeNode(h),from:j})}catch{Fr(t.removed,{attribute:null,from:j})}if(j.removeAttribute(h),h==="is")if(G||W)try{Ie(j)}catch{}else try{j.setAttribute(h,"")}catch{}},Ae=function(h){let j=null,f=null;if(w)h="<remove></remove>"+h;else{let re=os(h,/^[\r\n\t ]+/);f=re&&re[0]}E==="application/xhtml+xml"&&it===rt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let b=P?P.createHTML(h):h;if(it===rt)try{j=new y().parseFromString(b,E)}catch{}if(!j||!j.documentElement){j=S.createDocument(it,"template",null);try{j.documentElement.innerHTML=_t?I:b}catch{}}let Q=j.body||j.documentElement;return h&&f&&Q.insertBefore(r.createTextNode(f),Q.childNodes[0]||null),it===rt?de.call(j,ae?"html":"body")[0]:ae?j.documentElement:Q},at=function(h){return C.call(h.ownerDocument||h,h,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},St=function(h){return h instanceof _&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof p)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},$t=function(h){return typeof l=="function"&&h instanceof l};function et(le,h,j){bn(le,f=>{f.call(t,h,j,m)})}let At=function(h){let j=null;if(et(fe.beforeSanitizeElements,h,null),St(h))return Ie(h),!0;let f=u(h.nodeName);if(et(fe.uponSanitizeElement,h,{tagName:f,allowedTags:oe}),M&&h.hasChildNodes()&&!$t(h.firstElementChild)&&vt(/<[/\w!]/g,h.innerHTML)&&vt(/<[/\w!]/g,h.textContent)||h.nodeType===zr.progressingInstruction||M&&h.nodeType===zr.comment&&vt(/<[/\w]/g,h.data))return Ie(h),!0;if(!(D.tagCheck instanceof Function&&D.tagCheck(f))&&(!oe[f]||Ce[f])){if(!Ce[f]&&Ye(f)&&(be.tagNameCheck instanceof RegExp&&vt(be.tagNameCheck,f)||be.tagNameCheck instanceof Function&&be.tagNameCheck(f)))return!1;if(Ze&&!st[f]){let b=K(h)||h.parentNode,Q=J(h)||h.childNodes;if(Q&&b){let re=Q.length;for(let Z=re-1;Z>=0;--Z){let g=v(Q[Z],!0);g.__removalCount=(h.__removalCount||0)+1,b.insertBefore(g,q(h))}}}return Ie(h),!0}return h instanceof a&&!ie(h)||(f==="noscript"||f==="noembed"||f==="noframes")&&vt(/<\/no(script|embed|frames)/i,h.innerHTML)?(Ie(h),!0):(U&&h.nodeType===zr.text&&(j=h.textContent,bn([ue,Ee,Ue],b=>{j=qr(j,b," ")}),h.textContent!==j&&(Fr(t.removed,{element:h.cloneNode()}),h.textContent=j)),et(fe.afterSanitizeElements,h,null),!1)},ve=function(h,j,f){if(pe&&(j==="id"||j==="name")&&(f in r||f in T))return!1;if(!(xe&&!B[j]&&vt(Ke,j))){if(!(ne&&vt(je,j))){if(!(D.attributeCheck instanceof Function&&D.attributeCheck(j,h))){if(!ge[j]||B[j]){if(!(Ye(h)&&(be.tagNameCheck instanceof RegExp&&vt(be.tagNameCheck,h)||be.tagNameCheck instanceof Function&&be.tagNameCheck(h))&&(be.attributeNameCheck instanceof RegExp&&vt(be.attributeNameCheck,j)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(j,h))||j==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&vt(be.tagNameCheck,f)||be.tagNameCheck instanceof Function&&be.tagNameCheck(f))))return!1}else if(!ot[j]){if(!vt(me,qr(f,L,""))){if(!((j==="src"||j==="xlink:href"||j==="href")&&h!=="script"&&ic(f,"data:")===0&&ht[h])){if(!(Re&&!vt($e,qr(f,L,"")))){if(f)return!1}}}}}}}return!0},Ye=function(h){return h!=="annotation-xml"&&os(h,z)},It=function(h){et(fe.beforeSanitizeAttributes,h,null);let{attributes:j}=h;if(!j||St(h))return;let f={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ge,forceKeepAttr:void 0},b=j.length;for(;b--;){let Q=j[b],{name:re,namespaceURI:Z,value:g}=Q,R=u(re),x=g,V=re==="value"?x:ac(x);if(f.attrName=R,f.attrValue=V,f.keepAttr=!0,f.forceKeepAttr=void 0,et(fe.uponSanitizeAttribute,h,f),V=f.attrValue,Te&&(R==="id"||R==="name")&&(Ge(re,h),V=Ne+V),M&&vt(/((--!?|])>)|<\/(style|title|textarea)/i,V)){Ge(re,h);continue}if(R==="attributename"&&os(V,"href")){Ge(re,h);continue}if(f.forceKeepAttr)continue;if(!f.keepAttr){Ge(re,h);continue}if(!N&&vt(/\/>/i,V)){Ge(re,h);continue}U&&bn([ue,Ee,Ue],nt=>{V=qr(V,nt," ")});let Pe=u(h.nodeName);if(!ve(Pe,R,V)){Ge(re,h);continue}if(P&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!Z)switch(A.getAttributeType(Pe,R)){case"TrustedHTML":{V=P.createHTML(V);break}case"TrustedScriptURL":{V=P.createScriptURL(V);break}}if(V!==x)try{Z?h.setAttributeNS(Z,re,V):h.setAttribute(re,V),St(h)?Ie(h):ei(t.removed)}catch{Ge(re,h)}}et(fe.afterSanitizeAttributes,h,null)},Vt=function le(h){let j=null,f=at(h);for(et(fe.beforeSanitizeShadowDOM,h,null);j=f.nextNode();)et(fe.uponSanitizeShadowNode,j,null),At(j),It(j),j.content instanceof o&&le(j.content);et(fe.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(le){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},j=null,f=null,b=null,Q=null;if(_t=!le,_t&&(le="<!-->"),typeof le!="string"&&!$t(le))if(typeof le.toString=="function"){if(le=le.toString(),typeof le!="string")throw Br("dirty is not a string, aborting")}else throw Br("toString is not a function");if(!t.isSupported)return le;if(ce||he(h),t.removed=[],typeof le=="string"&&(Xe=!1),Xe){if(le.nodeName){let g=u(le.nodeName);if(!oe[g]||Ce[g])throw Br("root node is forbidden and cannot be sanitized in-place")}}else if(le instanceof l)j=Ae("<!---->"),f=j.ownerDocument.importNode(le,!0),f.nodeType===zr.element&&f.nodeName==="BODY"||f.nodeName==="HTML"?j=f:j.appendChild(f);else{if(!G&&!U&&!ae&&le.indexOf("<")===-1)return P&&ee?P.createHTML(le):le;if(j=Ae(le),!j)return G?null:ee?I:""}j&&w&&Ie(j.firstChild);let re=at(Xe?le:j);for(;b=re.nextNode();)At(b),It(b),b.content instanceof o&&Vt(b.content);if(Xe)return le;if(G){if(W)for(Q=H.call(j.ownerDocument);j.firstChild;)Q.appendChild(j.firstChild);else Q=j;return(ge.shadowroot||ge.shadowrootmode)&&(Q=ke.call(n,Q,!0)),Q}let Z=ae?j.outerHTML:j.innerHTML;return ae&&oe["!doctype"]&&j.ownerDocument&&j.ownerDocument.doctype&&j.ownerDocument.doctype.name&&vt(ci,j.ownerDocument.doctype.name)&&(Z="<!DOCTYPE "+j.ownerDocument.doctype.name+`>
`+Z),U&&bn([ue,Ee,Ue],g=>{Z=qr(Z,g," ")}),P&&ee?P.createHTML(Z):Z},t.setConfig=function(){let le=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};he(le),ce=!0},t.clearConfig=function(){m=null,ce=!1},t.isValidAttribute=function(le,h,j){m||he({});let f=u(le),b=u(h);return ve(f,b,j)},t.addHook=function(le,h){typeof h=="function"&&Fr(fe[le],h)},t.removeHook=function(le,h){if(h!==void 0){let j=sc(fe[le],h);return j===-1?void 0:oc(fe[le],j,1)[0]}return ei(fe[le])},t.removeHooks=function(le){fe[le]=[]},t.removeAllHooks=function(){fe=ii()},t}var ui=di();var pi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},fi=e=>(...t)=>({_$litDirective$:e,values:t}),wn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var jr=class extends wn{constructor(t){if(super(t),this.it=tt,t.type!==pi.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===tt||t==null)return this._t=void 0,this.it=t;if(t===ar)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};jr.directiveName="unsafeHTML",jr.resultType=1;var _i=fi(jr);function gs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var fr=gs();function wi(e){fr=e}var Yr={exec:()=>null};function Fe(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(kt.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,t)};return n}var kc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),kt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},$c=/^(?:[ \t]*(?:\n|$))+/,xc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Sc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Vr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ac=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hs=/(?:[*+-]|\d{1,9}[.)])/,ki=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,$i=Fe(ki).replace(/bull/g,hs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Tc=Fe(ki).replace(/bull/g,hs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),bs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ec=/^[^\n]+/,vs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Cc=Fe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",vs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Rc=Fe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,hs).getRegex(),Tn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ys=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ic=Fe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ys).replace("tag",Tn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),xi=Fe(bs).replace("hr",Vr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tn).getRegex(),Lc=Fe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",xi).getRegex(),ws={blockquote:Lc,code:xc,def:Cc,fences:Sc,heading:Ac,hr:Vr,html:Ic,lheading:$i,list:Rc,newline:$c,paragraph:xi,table:Yr,text:Ec},mi=Fe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Vr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tn).getRegex(),Dc={...ws,lheading:Tc,table:mi,paragraph:Fe(bs).replace("hr",Vr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",mi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tn).getRegex()},Oc={...ws,html:Fe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ys).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Yr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Fe(bs).replace("hr",Vr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",$i).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Pc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Mc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Si=/^( {2,}|\\)\n(?!\s*$)/,Nc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,En=/[\p{P}\p{S}]/u,ks=/[\s\p{P}\p{S}]/u,Ai=/[^\s\p{P}\p{S}]/u,Fc=Fe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ks).getRegex(),Ti=/(?!~)[\p{P}\p{S}]/u,qc=/(?!~)[\s\p{P}\p{S}]/u,Bc=/(?:[^\s\p{P}\p{S}]|~)/u,Uc=Fe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",kc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ei=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,zc=Fe(Ei,"u").replace(/punct/g,En).getRegex(),jc=Fe(Ei,"u").replace(/punct/g,Ti).getRegex(),Ci="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Hc=Fe(Ci,"gu").replace(/notPunctSpace/g,Ai).replace(/punctSpace/g,ks).replace(/punct/g,En).getRegex(),Wc=Fe(Ci,"gu").replace(/notPunctSpace/g,Bc).replace(/punctSpace/g,qc).replace(/punct/g,Ti).getRegex(),Gc=Fe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ai).replace(/punctSpace/g,ks).replace(/punct/g,En).getRegex(),Yc=Fe(/\\(punct)/,"gu").replace(/punct/g,En).getRegex(),Vc=Fe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Kc=Fe(ys).replace("(?:-->|$)","-->").getRegex(),Zc=Fe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Kc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Xc=Fe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",xn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ri=Fe(/^!?\[(label)\]\[(ref)\]/).replace("label",xn).replace("ref",vs).getRegex(),Ii=Fe(/^!?\[(ref)\](?:\[\])?/).replace("ref",vs).getRegex(),Qc=Fe("reflink|nolink(?!\\()","g").replace("reflink",Ri).replace("nolink",Ii).getRegex(),gi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,$s={_backpedal:Yr,anyPunctuation:Yc,autolink:Vc,blockSkip:Uc,br:Si,code:Mc,del:Yr,emStrongLDelim:zc,emStrongRDelimAst:Hc,emStrongRDelimUnd:Gc,escape:Pc,link:Xc,nolink:Ii,punctuation:Fc,reflink:Ri,reflinkSearch:Qc,tag:Zc,text:Nc,url:Yr},Jc={...$s,link:Fe(/^!?\[(label)\]\((.*?)\)/).replace("label",xn).getRegex(),reflink:Fe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",xn).getRegex()},fs={...$s,emStrongRDelimAst:Wc,emStrongLDelim:jc,url:Fe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",gi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Fe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",gi).getRegex()},ed={...fs,br:Fe(Si).replace("{2,}","*").getRegex(),text:Fe(fs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},kn={normal:ws,gfm:Dc,pedantic:Oc},Hr={normal:$s,gfm:fs,breaks:ed,pedantic:Jc},td={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},hi=e=>td[e];function Wt(e,t){if(t){if(kt.escapeTest.test(e))return e.replace(kt.escapeReplace,hi)}else if(kt.escapeTestNoEncode.test(e))return e.replace(kt.escapeReplaceNoEncode,hi);return e}function bi(e){try{e=encodeURI(e).replace(kt.percentDecode,"%")}catch{return null}return e}function vi(e,t){let r=e.replace(kt.findPipe,(o,i,l)=>{let a=!1,d=i;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),n=r.split(kt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(kt.slashPipe,"|");return n}function Wr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function rd(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function yi(e,t,r,n,s){let o=t.href,i=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function nd(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Sn=class{constructor(e){ze(this,"options");ze(this,"rules");ze(this,"lexer");this.options=e||fr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Wr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=nd(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Wr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Wr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Wr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let d=l.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=_,r.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let A=y,k=A.raw+`
`+r.join(`
`),v=this.blockquote(k);o[o.length-1]=v,n=n.substring(0,n.length-A.raw.length)+v.raw,s=s.substring(0,s.length-A.text.length)+v.text;break}else if(y?.type==="list"){let A=y,k=A.raw+`
`+r.join(`
`),v=this.list(k);o[o.length-1]=v,n=n.substring(0,n.length-y.raw.length)+v.raw,s=s.substring(0,s.length-A.raw.length)+v.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;e;){let a=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,v=>" ".repeat(3*v.length)),y=e.split(`
`,1)[0],A=!_.trim(),k=0;if(this.options.pedantic?(k=2,p=_.trimStart()):A?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,p=_.slice(k),k+=t[1].length),A&&this.rules.other.blankLine.test(y)&&(d+=y+`
`,e=e.substring(y.length+1),a=!0),!a){let v=this.rules.other.nextBulletRegex(k),O=this.rules.other.hrRegex(k),q=this.rules.other.fencesBeginRegex(k),J=this.rules.other.headingBeginRegex(k),K=this.rules.other.htmlBeginRegex(k);for(;e;){let P=e.split(`
`,1)[0],I;if(y=P,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),I=y):I=y.replace(this.rules.other.tabCharGlobal,"    "),q.test(y)||J.test(y)||K.test(y)||v.test(y)||O.test(y))break;if(I.search(this.rules.other.nonSpaceChar)>=k||!y.trim())p+=`
`+I.slice(k);else{if(A||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||q.test(_)||J.test(_)||O.test(_))break;p+=`
`+y}!A&&!y.trim()&&(A=!0),d+=P+`
`,e=e.substring(P.length+1),_=I.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=p.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!s.loose){let d=a.tokens.filter(_=>_.type==="space"),p=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=p}}if(s.loose)for(let a of s.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=vi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(vi(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Wr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=rd(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),yi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return yi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let p=[...n[0]][0].length,_=e.slice(0,s+n.index+p+i);if(Math.min(s,i)%2){let A=_.slice(1,-1);return{type:"em",raw:_,text:A,tokens:this.lexer.inlineTokens(A)}}let y=_.slice(2,-2);return{type:"strong",raw:_,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Pt=class _s{constructor(t){ze(this,"tokens");ze(this,"options");ze(this,"state");ze(this,"inlineQueue");ze(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||fr,this.options.tokenizer=this.options.tokenizer||new Sn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:kt,block:kn.normal,inline:Hr.normal};this.options.pedantic?(r.block=kn.pedantic,r.inline=Hr.pedantic):this.options.gfm&&(r.block=kn.gfm,this.options.breaks?r.inline=Hr.breaks:r.inline=Hr.gfm),this.tokenizer.rules=r}static get rules(){return{block:kn,inline:Hr}}static lex(t,r){return new _s(r).lex(t)}static lexInline(t,r){return new _s(r).inlineTokens(t)}lex(t){t=t.replace(kt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(kt.tabCharGlobal,"    ").replace(kt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},t,r))?(t=t.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(t,n,l)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),r.push(a);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,_=t.slice(1),y;this.options.extensions.startInline.forEach(A=>{y=A.call({lexer:this},_),typeof y=="number"&&y>=0&&(p=Math.min(p,y))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(a=this.tokenizer.inlineText(d)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},An=class{constructor(e){ze(this,"options");ze(this,"parser");this.options=e||fr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(kt.notSpaceStart)?.[0],s=e.replace(kt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Wt(n)+'">'+(r?s:Wt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Wt(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Wt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=bi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Wt(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=bi(e);if(s===null)return Wt(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Wt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Wt(e.text)}},xs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Mt=class ms{constructor(t){ze(this,"options");ze(this,"renderer");ze(this,"textRenderer");this.options=t||fr,this.options.renderer=this.options.renderer||new An,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new xs}static parse(t,r){return new ms(r).parse(t)}static parseInline(t,r){return new ms(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},$n,Gr=($n=class{constructor(e){ze(this,"options");ze(this,"block");this.options=e||fr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Pt.lex:Pt.lexInline}provideParser(){return this.block?Mt.parse:Mt.parseInline}},ze($n,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ze($n,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),$n),sd=class{constructor(...e){ze(this,"defaults",gs());ze(this,"options",this.setOptions);ze(this,"parse",this.parseMarkdown(!0));ze(this,"parseInline",this.parseMarkdown(!1));ze(this,"Parser",Mt);ze(this,"Renderer",An);ze(this,"TextRenderer",xs);ze(this,"Lexer",Pt);ze(this,"Tokenizer",Sn);ze(this,"Hooks",Gr);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new An(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Sn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Gr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Gr.passThroughHooks.has(o)?s[i]=d=>{if(this.defaults.async&&Gr.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,d);return a.call(s,_)})();let p=l.call(s,d);return a.call(s,p)}:s[i]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,d);return _===!1&&(_=await a.apply(s,d)),_})();let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Pt.lex(e,t??this.defaults)}parser(e,t){return Mt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Pt.lex:Pt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Mt.parse:Mt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Pt.lex:Pt.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Mt.parse:Mt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Wt(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},pr=new sd;function qe(e,t){return pr.parse(e,t)}qe.options=qe.setOptions=function(e){return pr.setOptions(e),qe.defaults=pr.defaults,wi(qe.defaults),qe};qe.getDefaults=gs;qe.defaults=fr;qe.use=function(...e){return pr.use(...e),qe.defaults=pr.defaults,wi(qe.defaults),qe};qe.walkTokens=function(e,t){return pr.walkTokens(e,t)};qe.parseInline=pr.parseInline;qe.Parser=Mt;qe.parser=Mt.parse;qe.Renderer=An;qe.TextRenderer=xs;qe.Lexer=Pt;qe.lexer=Pt.lex;qe.Tokenizer=Sn;qe.Hooks=Gr;qe.parse=qe;var Tf=qe.options,Ef=qe.setOptions,Cf=qe.use,Rf=qe.walkTokens,If=qe.parseInline;var Lf=Mt.parse,Df=Pt.lex;function Jt(e){let t=qe.parse(e),r=ui.sanitize(t);return _i(r)}function Gt(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Ar(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Cn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var od={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},id=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,ad=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function er(e){return!!e&&typeof e=="object"}function Ss(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Li(e,t){let r=Ss(e),n=Ss(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function ld(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>er(s)&&typeof s.text=="string"?s.text:"").join(""):er(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function cd(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:od[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Ss(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Li(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=Li(er(l)?l.old_string:"",er(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Di(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Oi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=id.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:ad.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function dd(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(er(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Oi(o.text));else if(o.type==="thinking"){let i=Di(o.thinking);i&&s.push(i)}else if(o.type==="tool_use"){let i=cd(o);typeof o.id=="string"&&t.set(o.id,i),s.push(i)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(er(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let i=ld(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function ud(e){if(e.type==="item.completed"&&er(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Oi(t.text)];if(t.type==="reasoning"){let r=Di(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function pd(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Pi(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!er(o))continue;let i=pd(o)?ud(o):dd(o,r);for(let l of i)t.push(l)}return t}var fd=5,_d=10,md=/Task\s+#(\d+)/,gd=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,hd=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Rn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function bd(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function vd(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function yd(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let a=md.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!a||d.length===0)continue;t.set(a[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let i=t.get(String(o.taskId??""));if(!i)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof o.status=="string"&&(i.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function wd(e){if(e.tool==="Bash"){let t=e.command||"";return gd.test(t)?"~ PR/\uAC8C\uC2DC \uC911":hd.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function kd(e){let t=e.filter(s=>s.kind==="tool").slice(-_d),r=new Map;t.forEach((s,o)=>{let i=wd(s);if(!i)return;let l=r.get(i)||{count:0,last:-1};l.count+=1,l.last=o,r.set(i,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function $d(e){let t=vd(e);if(t)return{text:t,guess:!1};let r=yd(e);if(r)return{text:r,guess:!1};let n=kd(e);return n?{text:n,guess:!0}:null}function xd(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Tt(e,t)}function In(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,i={},l=!0,a=new Set,d=new Set,p=null,_=null,y=!1,A=!1,k=!1,v=null,O=null;function q(){y=!1,A=!1,k=!1,v=null,O=null}async function J(B){if(r){A=!0,k=!1,L();try{let D=await Promise.resolve(r("get-attempt-prompt",{attempt_id:B}));if(o!==B)return;!D||typeof D!="object"||Array.isArray(D)?k=!0:(v=D,O=B)}catch{o===B&&(k=!0)}finally{o===B&&(A=!1,L())}}}function K(){if(y=!y,y&&o&&O!==o){J(o);return}L()}function P(){if(!y)return"";let B=Ar({loading:A,error:k});if(B)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${B}
      </div>`;if(!v)return"";if(v.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let D=Cn(v.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${D?c`<div class="prompt-block__meta">${D} 발송</div>`:""}
      ${typeof v.task_prompt=="string"?Gt("\uACFC\uC5C5 (user)",v.task_prompt):""}
      ${typeof v.system_prompt=="string"?Gt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",v.system_prompt):""}
    </div>`}function I(){if(!o||!n)return[];let B=n.get(o);return Pi(B?B.lines:[])}function S(){if(!o||!n)return null;let B=n.get(o),D=B?B.last_event_at:null;return typeof D=="number"?D:null}function C(){return i.status==="running"}function H(){if(C()&&o){_||(_=setInterval(()=>L(),1e3));return}de()}function de(){_&&(clearInterval(_),_=null)}function ke(B){let D=[],ne=0;for(;ne<B.length;){let xe=B[ne];if(xe.kind==="tool"){let Re=ne;for(;Re<B.length&&B[Re].kind==="tool"&&B[Re].tool===xe.tool;)Re+=1;if(Re-ne>=fd&&!d.has(ne)){D.push({kind:"group",idx:ne,tool:xe.tool||"",lines:B.slice(ne,Re).map((N,U)=>({idx:ne+U,line:N}))}),ne=Re;continue}}D.push({kind:"line",idx:ne,line:xe}),ne+=1}return D}function fe(B){for(let D=B.length-1;D>=0;D-=1){let ne=B[D];if(ne.kind==="result"||ne.kind==="error")return null;if(ne.kind==="tool"&&!Object.hasOwn(ne,"result"))return ne}return null}function ue(B){for(let D=B.length-1;D>=0;D-=1)if(B[D].kind==="thinking")return B[D];return null}function Ee(B,D){if(D.kind==="gate")return c`<div class="sv__gate">${D.text}</div>`;if(D.kind==="phase")return c`<div class="sv__phase">${D.text}</div>`;if(D.kind==="result")return c`<div
        class="sv__result${D.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${D.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Jt(D.text||(D.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(D.kind==="thinking"){let ne=a.has(B);return c`<div
        class="sv__think${ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>me(B)}
      >
        <span class="sv__think-line">💭 ${Rn(D.text)}</span>
        ${ne?c`<pre class="sv__think-expand">${D.text}</pre>`:""}
      </div>`}if(D.kind==="error")return c`<div class="sv__error">⛔ ${D.text}</div>`;if(D.kind==="blocker")return c`<div class="sv__error">⛔ ${D.text}</div>`;if(D.kind==="tool"){let ne=a.has(B),xe=D.tool==="Bash"?bd(D.command):0,Re=D.tool==="Bash"?xe>1?Rn(D.command):D.command:D.path||D.command||"";return c`<div
        class="sv__tool${ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>me(B)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${D.icon}</span>
          <span class="sv__tool-name">${D.tool}</span>
          ${Re?c`<span class="sv__tool-detail">${Re}</span>`:""}
          ${xe>1?c`<span class="sv__tool-more">⋯ ${xe}줄</span>`:""}
          ${typeof D.added=="number"?c`<span class="sv__diff-add">+${D.added}</span>`:""}
          ${typeof D.removed=="number"?c`<span class="sv__diff-del">−${D.removed}</span>`:""}
          ${D.result?c`<span class="sv__tool-ok">→ ${D.result}</span>`:""}
        </span>
        ${ne?c`<pre class="sv__tool-expand">${Ue(D)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Jt(D.text||"")}</div>`}function Ue(B){let D=[];if(B.tool==="Bash"&&typeof B.command=="string"&&B.command.length>0)D.push(B.command);else if(B.input!==void 0)try{D.push(`input: ${JSON.stringify(B.input,null,2)}`)}catch{}return typeof B.output=="string"&&B.output.length>0&&D.push(`output:
${B.output}`),D.join(`

`)}function Ke(){if(!o)return c``;let B=I(),D=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),ne=i.session_id||"",xe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,Re=C(),N=Re?xd(S(),Date.now()):"",U=Re?fe(B):null,M=Re?ue(B):null,ae=$d(B);return c`<div class="sv" data-attempt-id=${o}>
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
              aria-label=${N?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${N}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${N?c`<span class="sv__live-ago">${N}</span>`:""}</span
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
        ${D?c`<span class="sv__meta">${D}</span>`:""}
        ${i.worktree?c`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${y?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${y?"true":"false"}
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
          aria-label=${xe}
          @click=${oe}
        >
          <span class="sv__follow-full">⇣ ${xe}</span>
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
        ${B.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ke(B).map(ce=>ce.kind==="group"?je(ce):Ee(ce.idx,ce.line))}
      </div>
      ${U||M?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${U?c`<span class="sv__now-icon">${U.icon}</span>
                  <span class="sv__now-name">${U.tool}</span>
                  <span class="sv__now-detail"
                    >${U.tool==="Bash"?Rn(U.command):U.path||U.command||""}</span
                  >`:""}
            ${M?c`<span class="sv__now-think"
                  >💭 ${Rn(M.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function je(B){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>$e(B.idx)}
    >
      <span class="sv__group-icon">${B.lines[0].line.icon}</span>
      <span class="sv__group-name">${B.tool}</span>
      <span class="sv__group-count">${B.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function $e(B){d.add(B),L()}function L(){Oe(Ke(),e),H(),l&&z()}function z(){let B=e.querySelector(".sv__body");B&&(B.scrollTop=B.scrollHeight)}function me(B){a.has(B)?a.delete(B):a.add(B),L()}function oe(){l=!l,L()}function we(B){dr(B).then(D=>{D?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ge(B){!o||!B||(i={...i,...B},L())}function Be(B){let D=B.target;if(!D||!D.classList||!D.classList.contains("sv__body"))return;!(D.scrollHeight-D.scrollTop-D.clientHeight<=4)&&l&&(l=!1,L())}e.addEventListener("scroll",Be,!0);function be(B){let D=B&&B.attempt_id;D&&(o=D,i=B.meta||{},l=!0,a.clear(),d.clear(),q(),!p&&n&&(p=n.subscribe(L)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),L())}function Ce(){let B=o;o=null,a.clear(),d.clear(),q(),de(),r&&B&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${B}`})).catch(()=>{}),Oe(c``,e),s&&s()}return{open:be,updateMeta:ge,close:Ce,isOpen(){return o!==null},destroy(){de(),p&&(p(),p=null),e.removeEventListener("scroll",Be,!0),o=null,Oe(c``,e)}}}function Kr(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Mi(t.spec_id),s=Mi(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Mi(e){return typeof e=="string"?e.trim():""}function Sd(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Ad(e){let t=e&&e.metadata||{},r=Kr(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Sd(t)?null:"plan_pending"}),n}function Ni(e,t){let r=Ad(e);return c`
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
  `}var Td="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Ed=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Cd=/^\*\*결론\*\* — (.+)$/;function Fi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Td)return null;let r=Ed.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Cd.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",d=l?i+1:i;return{lane:n,identifier:s,timestamp:o,conclusion:a,body:t.slice(d).join(`
`).trim()}}var qi=20;function Bi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Rd(e){return e.length>qi?`${e.slice(0,qi)}\u2026`:e}function Id(e,t,r,n){let s=`${t.lane} ${Rd(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Bi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${Jt(t.body)}
        </div>`:""}
  </div>`}function Ld(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Bi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Jt(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ui(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",i=r.sending===!0,l=n.slice().sort((a,d)=>String(d.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let d=Fi(typeof a.text=="string"?a.text:"");return d?Id(a,d,t,s.has(a.id)):Ld(a)})}
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
  `}var Dd=["codex","opus","fable","self","skip"],Od=["codex","fable","skip"],Pd=["low","medium","high","xhigh"],Md=["standard","fast_track"],Tr=["orchestration_model","orchestration_effort","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],Ts={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},zi={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},Nd=["self","skip"],Fd="opus",Es={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function Cs(e){let t=Ts[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function qd(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:Es[e]||"(\uAE30\uBCF8)"}function Zr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Xr(e){if(!Zr(e)||!Zr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Zr(r)&&Zr(r.models));return t.length>0?t:null}function As(e){return{value:e,label:e}}function Rs(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function ji(e,t,r=null){let n=Xr(e);if(!n)return t?[{label:null,options:[As(t)]}]:[];let s=n.filter(([i])=>r===null||i===r).map(([i,l])=>({label:i,options:Object.keys(l.models).map(As)})),o=s.some(i=>i.options.some(l=>l.value===t));return t&&!o?[Rs(t),...s]:s}function _r(e,t){let r={label:null,options:e.map(As)};return t&&!e.includes(t)?[Rs(t),r]:[r]}function Yt(e,t){let r=Xr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Gi(e,t){return Zr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Ln(e,t){let r=Xr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Gi(n,n.models[t]);return[]}function Yi(e){let t=Xr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Gi(n,s))r.includes(o)||r.push(o);return r}function Vi(e,t){if(!t)return Yi(e);let n=Xr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let i of Ln(e,o))s.includes(i)||s.push(i);return s}function On(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Yt(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let i=n.impl_model?Ln(t,n.impl_model):Vi(t,s);return n.impl_effort&&i.length>0&&!i.includes(n.impl_effort)&&(n.impl_effort=""),n}function Er(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||Fd,i=r("impl_model"),l=r("impl_runtime"),a=l==="claude"||l==="codex"?l:l==="inherit"?s===void 0?Yt(n,o):s:null;return Tr.map(d=>{let p=t(d),_,y=!1;return d==="orchestration_model"?_=ji(n,p):d==="impl_runtime"?_=_r(["inherit","claude","codex"],p):d==="impl_model"?(_=a?ji(n,p,a):p?[Rs(p)]:[],y=l==="inherit"&&a===null):d==="orchestration_effort"?_=_r(Ln(n,o),p):d==="impl_effort"?(_=_r(i?Ln(n,i):a?Vi(n,a):Yi(n),p),y=l==="inherit"&&a===null):d==="plan_review_model"?_=_r(Od,p):Object.hasOwn(zi,d)?(_=_r(Pd,p),y=Nd.includes(r(zi[d]))):_=_r(Dd,p),{key:d,groups:_,selected:p,disabled:y,runner:d==="orchestration_model"?Yt(n,o):null}})}function Dn(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Hi(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>Hi(s,t))}
          </optgroup>`)}
  `}function Hi(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Wi(e,t,r,n,s,o,i){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${Cs(e)}</span>
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
  `}function Ki(e,t,r,n,s=""){let o=e&&e.metadata||{},i=r&&typeof r=="object"?r:{},l=_=>typeof o[_]=="string"?o[_]:"",d=Er({selectedOf:l,effectiveOf:_=>{let y=l(_);return y||(typeof i[_]=="string"?i[_]:"")},runner_catalog:n}),p=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${d.map(_=>Wi(_.key,Dn(_.groups,_.selected,qd(_.key,i,s)),_.selected,!1,_.disabled,_.runner,t))}
    ${Wi("workflow_mode",Dn(_r(Md,p),p),p,o.workflow_mode==="fast_track",!1,null,t)}
  `}function Bd(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Zi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(k){k.key==="Escape"&&s&&(k.preventDefault(),y())}document.addEventListener("keydown",a);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>y()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Bd(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Jt(i)}
          </div>
        </div>
      </div>
    `:c``}function p(){Oe(d(),e)}async function _(k,v={}){s=k,o="loading",i="",l="",p();let O=r?r():"";if(!O){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let q="/api/doc?workspace="+encodeURIComponent(O)+"&path="+encodeURIComponent(k);try{let J=await n(q),K=await J.json().catch(()=>({}));if(!J.ok||!K||K.ok!==!0){if(K?.error==="not_found"&&v.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(K&&K.error||J.status)+")",p();return}i=String(K.content||""),o="ready",p()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function y(){s=null,Oe(c``,e)}function A(){document.removeEventListener("keydown",a),y()}return{open:_,close:y,destroy:A}}var Ud=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Xi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function zd(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function jd(e){let t=xr(e);if(!t||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Xi}
          >부분 집계</span
        >`:""}`}function Hd(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return c`<div class="detail-session__usage-detail">
    ${Ud.map(r=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${zd(e[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Xi}</span>`:""}
  </div>`}var Wd={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Gd(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Yd(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Qi(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let i=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,y=o.has(d.attempt_id),A=_&&!y,k=_?y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!A}
      title=${k}
      @click=${v=>{v.stopPropagation(),A&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,y=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return c`<div class="detail-session__cause" title=${y}>
      ${d.cause}
    </div>`},a=d=>{if(!xr(d.usage))return"";let p=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${p?"true":"false"}
      title=${p?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${_=>{_.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${jd(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>c`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${d.status||"unknown"}"
              data-attempt-id=${d.attempt_id}
              @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Wd[d.status||""]||"\xB7"}</span
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
              ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                    >${String(d.session_id).slice(0,8)}</span
                  >`:""}
              ${xr(d.usage)?c`<span class="detail-session__usage"
                    >${xr(d.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Gd(d.started_at)}</span
              >
            </button>
            ${a(d)} ${i(d)} ${l(d)}
            ${Yd(d)}
            ${s.has(d.attempt_id)&&d.usage?Hd(d.usage):""}
          </div>`)}
    </div>
  `}function Ji(e,t={}){return c`
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
          ${Vd(e)}
        </div>`:""}
  `}function Vd(e){let t=Ar(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Gt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Cn(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Gt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Gt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Kd=["open","in_progress","deferred","resolved","closed"],Zd=[0,1,2,3,4];function ea(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,d=null,p=null,_={},y="",A=!1,k=!1,v=!1,O="",q="",J="";function K(){k=!1,v=!1,O="",q="",J=""}let P=[],I=null,S=null,C=!1,H="",de=!1,ke=0,fe=new Set;function ue(){P=[],I=null,S=null,C=!1,H="",de=!1,ke+=1,fe.clear()}async function Ee(g){if(!s)return;let R=++ke;try{let x=await Promise.resolve(s("get-comments",{id:g}));if(R!==ke||g!==d)return;P=Array.isArray(x)?x:[],C=!1}catch{if(R!==ke||g!==d)return;C=!0}Z()}function Ue(){if(!s||!d)return;let g=p&&typeof p.comment_count=="number"?p.comment_count:null;if(I!==d){I=d,S=g,Ee(d);return}g!==null&&g!==S&&(S=g,Ee(d))}function Ke(g){fe.has(g)?fe.delete(g):fe.add(g),Z()}function je(g){let R=H.trim().length===0;H=g,R!==(g.trim().length===0)&&Z()}async function $e(){let g=H.trim();if(!s||!d||g.length===0||de)return;let R=d;de=!0,Z();let x=!1;try{let V=await Promise.resolve(s("add-comment",{id:R,text:g}));Array.isArray(V)&&V.length>0&&(x=!0,R===d&&(P=V,C=!1,H="",S=V.length))}catch{x=!1}x||se("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),R===d&&(de=!1),Z()}let L={onToggle:Ke,onDraftInput:je,onSubmit:$e},z=document.createElement("div");z.className="md-viewer-root",document.body.appendChild(z);let me=Zi(z,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),oe=document.createElement("div");oe.className="session-log-root",document.body.appendChild(oe);let we=In(oe,{transport:s?(g,R)=>Promise.resolve(s(g,R)):void 0,sessionLogStore:a}),ge=!1,Be=!1,be=!1,Ce=null,B=null,D=0;function ne(g){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${g}`}function xe(){ge=!1,Be=!1,be=!1,Ce=null,B=null,D+=1}async function Re(g){if(!s)return;let R=++D;Be=!0,be=!1,Z();try{let x=await Promise.resolve(s("get-bead-prompt",{bead_id:g}));if(R!==D)return;!x||typeof x!="object"||Array.isArray(x)?be=!0:(Ce=x,B=ne(g))}catch{R===D&&(be=!0)}finally{R===D&&(Be=!1,Z())}}function N(){if(ge=!ge,ge&&d&&B!==ne(d)){Ce=null,Re(d);return}Z()}function U(){if(!i||!d)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(x=>x&&x.bead_id===d).sort((x,V)=>(V.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null,exec_default_preset_id:typeof x.exec_default_preset_id=="string"?x.exec_default_preset_id:null,exec_default_preset_revision:typeof x.exec_default_preset_revision=="number"?x.exec_default_preset_revision:null,exec_values:x.exec_values&&typeof x.exec_values=="object"?x.exec_values:null,usage:x.usage||null}))}function M(){if(!i||!d)return null;let g=i.get();return qt(g&&g.attempts||{},d)}let ae=new Set;function ce(g){ae.has(g)?ae.delete(g):ae.add(g),Z()}function w(g){let R=i?i.get():null,x=R&&R.attempts?R.attempts[g]:null;we.open({attempt_id:g,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}async function G(g){if(!s||!g)return;let R=()=>{let V=i?i.get():null;return V&&typeof V.revision=="number"?V.revision:0},x=await s("worker-attempt-resume",{attempt_id:g,expected_revision:R()});if(x&&x.conflict){let V=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:R();x=await s("worker-attempt-resume",{attempt_id:g,expected_revision:V})}x&&x.resumed===!1&&!x.conflict&&x.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let W={onOpen:w,onResume:G,onToggleUsage:ce};function ee(){let g=i?i.get():null,R=g&&g.default_exec_preset_id,x=typeof R=="string"?Ze()?.presets.find(V=>V.id===R):null;return x&&x.compatible!==!1&&x.settings?x.settings:{}}function pe(){let g=i?i.get():null,R=g&&g.default_exec_preset_id,x=typeof R=="string"?Ze()?.presets.find(V=>V.id===R):null;return x&&x.compatible!==!1&&typeof x.name=="string"?x.name:""}function Te(){let g=i?i.get():null;return g&&g.runner_catalog||null}function Ne(){let g=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},x=(Object.hasOwn(_,"orchestration_model")?_.orchestration_model:void 0)||(typeof g.orchestration_model=="string"?g.orchestration_model:"")||(typeof ee().orchestration_model=="string"?ee().orchestration_model:"")||"opus";return Yt(Te(),x)}function Ze(){let g=l?l.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function Xe(g){let R=g&&g.settings&&typeof g.settings=="object"?g.settings:{},x=V=>typeof R[V]=="string"?R[V]:V==="impl_runtime"&&typeof R.impl_model=="string"&&Yt(Te(),R.impl_model)||"";return Er({selectedOf:x,effectiveOf:x,runner_catalog:Te()}).some(V=>V.groups.some(Pe=>Pe.options.some(nt=>nt.value===V.selected&&nt.label.endsWith("(\uBE44\uD638\uD658)"))))}function lt(g){l&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&l.set({revision:g.revision,presets:g.presets})}async function st(){let g=Ze(),R=g?.presets.find(x=>x.id===y);if(!(!s||!d||!g||!R||Xe(R)||A)){A=!0,Z();try{let x=await Promise.resolve(s("apply-exec-preset",{id:d,preset_id:R.id,expected_revision:g.revision}));if(x&&x.conflict){lt(x),se("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let V=x&&Array.isArray(x.issue)?x.issue[0]:x?.issue;if(x&&x.applied&&V&&typeof V=="object"){p=V;for(let Pe of Tr)delete _[Pe];se("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}x&&x.error==="bd_readback_failed"?se("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):se("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(x){x&&typeof x=="object"&&x.code==="bd_readback_failed"?se("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):se("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,Z()}}}function pt(){let g=Ze();if(g&&g.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let R=g?g.presets:[],x=R.find(Pe=>Pe.id===y),V=x?Xe(x):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${g===null||A}
          @change=${Pe=>{y=Pe.target.value,Z()}}
        >
          <option value="" ?selected=${y===""}>
            ${g===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${R.map(Pe=>{let nt=Xe(Pe);return c`<option
              value=${Pe.id}
              ?selected=${Pe.id===y}
            >
              ${Pe.name}${nt?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${g===null||!x||V||A}
          @click=${()=>{st()}}
        >
          11개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let ht=null;r&&r.subscribe&&(ht=r.subscribe(()=>ft()));let De=null;i&&typeof i.subscribe=="function"&&(De=i.subscribe(()=>{d&&Z()}));let ot=null;l&&typeof l.subscribe=="function"&&(ot=l.subscribe(()=>{d&&Z()}));function We(g){g.key==="Escape"&&d&&(g.preventDefault(),n())}document.addEventListener("keydown",We);function ft(){if(d){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+d)||[];p=g.find(x=>x&&x.id===d)||g[0]||p}Ue(),Z()}}function ct(g){dr(g).then(R=>{R?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function rt(g){g.preventDefault(),g.stopPropagation(),d&&ct(d)}function it(g,R){g.preventDefault(),g.stopPropagation(),ct(R)}function _t(g,R,x){g.preventDefault(),g.stopPropagation(),me.open(R,{missing_state:x})}function Je(g,R){_[g]=R,Z(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",{id:d,key:g,value:R})).catch(()=>{se("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function bt(g,R){let x=p||{},V=x.metadata&&typeof x.metadata=="object"?x.metadata:{},Pe={};for(let Me of["impl_runtime","impl_model","impl_effort"])Pe[Me]=Object.hasOwn(_,Me)?_[Me]:typeof V[Me]=="string"?V[Me]:"";Pe[g]=R;let nt=On(Pe,Te(),Ne()),mt={};for(let Me of["impl_runtime","impl_model","impl_effort"])mt[Me]=_[Me],_[Me]=nt[Me]||"";Z(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...nt,orchestration_runtime:Ne()})).then(Me=>{let Kt=Array.isArray(Me)?Me[0]:Me;if(!Kt||typeof Kt!="object"||!Kt.id)throw new Error("implementation target readback failed");p=Kt;for(let nr of["impl_runtime","impl_model","impl_effort"])delete _[nr];Z()}).catch(()=>{for(let Me of["impl_runtime","impl_model","impl_effort"])mt[Me]===void 0?delete _[Me]:_[Me]=mt[Me];Z(),se("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Qe(g,R,x){if(!s||!d)return!1;try{let V=await Promise.resolve(s(g,R)),Pe=Array.isArray(V)?V[0]:V;return Pe&&typeof Pe=="object"&&Pe.id?(p=Pe,!0):(se(x,"error"),!1)}catch{return se(x,"error"),!1}}function dt(g){setTimeout(()=>{try{let R=e.querySelector(g);R&&typeof R.focus=="function"&&R.focus()}catch{}},0)}function ut(){k=!0,O=p&&p.title||"",Z(),dt('.detail-edit__input[data-edit="title"]')}function E(g){O=g.target.value}function F(){k=!1,O="",Z()}function te(){Qe("edit-text",{id:d,field:"title",value:O},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(R=>{R&&(k=!1,O=""),Z()})}function u(){v=!0,q=p&&p.description||"",Z(),dt('.detail-edit__textarea[data-edit="description"]')}function m(g){q=g.target.value}function T(){v=!1,q="",Z()}function X(){Qe("edit-text",{id:d,field:"description",value:q},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(R=>{R&&(v=!1,q=""),Z()})}function he(g,R,x,V){if(g.key==="Escape"){g.stopPropagation(),x();return}g.key==="Enter"&&(!V||g.ctrlKey||g.metaKey)&&(g.preventDefault(),R())}function Se(g){let R=g.target.value;Qe("update-status",{id:d,status:R},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Z())}function ye(g){let R=Number(g.target.value);Qe("update-priority",{id:d,priority:R},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Z())}function ie(g){J=g.target.value}function Ie(){let g=J.trim();g.length!==0&&Qe("label-add",{id:d,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(R=>{R&&(J=""),Z()})}function Ge(g){if(g.key==="Escape"){g.stopPropagation(),J="",Z();return}g.key==="Enter"&&(g.preventDefault(),Ie())}function Ae(g){Qe("label-remove",{id:d,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Z())}let at={onCopyPath:it,onOpenDoc:_t},St={onChange:Je,onImplTargetChange:bt};function $t(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function et(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function At(g){let x=(Array.isArray(g.dependencies)?g.dependencies:[]).map(V=>({id:$t(V),icon:et(V)})).filter(V=>V.id.length>0);return c`
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
    `}function ve(g){let R=g.metadata||{},x=g.workflow||{},V=x.stages||{},Pe=V.spec&&V.spec.stale,nt=V.impl&&V.impl.stale,mt=V.plan||null,Me=x.route_source==="derived",Kt=x.route||R.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Me?" detail-kv__v--derived":""}"
          title=${Me?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Me?"unset":Kt}</span
        >
      </div>
      ${x.route!=="quick_fix"||Object.hasOwn(R,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${R.spec_review||"\uC5C6\uC74C"}${Pe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${mt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${mt?.approval_receipt||"\uC5C6\uC74C"}${mt?.approval_state==="stale"?" \xB7 stale":mt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${x.route!=="quick_fix"||Object.hasOwn(R,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${R.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${R.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${R.pr_url}</span>
          </div>`:""}
    `}let Ye={route:["quick_fix","spec_backed","full_plan"]};async function It(g,R){let x=R.target.value;if(g==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Z();return}await Qe("update-workflow-meta",{id:d,key:g,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Z()}function Vt(g){let R=g.metadata||{};return c` ${((V,Pe)=>{let nt=Ye[V],mt=typeof R[V]=="string"?R[V]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${V}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${V}
          data-edit=${`wfmeta-${V}`}
          @change=${Me=>It(V,Me)}
        >
          <option value="" ?selected=${!nt.includes(mt)}>
            ${Pe}
          </option>
          ${nt.map(Me=>c`<option value=${Me} ?selected=${mt===Me}>${Me}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function le(g){return k?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${O}
            @input=${E}
            @keydown=${R=>he(R,te,F,!1)}
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
              @click=${F}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
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
    `}function h(g){let R=gt(g.created_at),x=gt(g.updated_at);return!R&&!x?c``:c`
      ${R?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${R}</span>
          </div>`:""}
      ${x?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function j(g,R){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Se}
        >
          ${Kd.map(x=>c`<option value=${x} ?selected=${x===g}>${x}</option>`)}
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
          ${Zd.map(x=>c`<option value=${String(x)} ?selected=${x===R}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function f(g){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${v?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${u}
            >
              ✎
            </button>`}
      </div>
      ${v?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${q}
              @input=${m}
              @keydown=${R=>he(R,X,T,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${X}
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
    `}function b(g){let R=typeof g.notes=="string"?g.notes:"";return R.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${R}</div>
    `}function Q(g){let R=Array.isArray(g.labels)?g.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${R.map(x=>c`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>Ae(x)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${J}
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
    `}function re(){if(!d)return c``;let g=p||{},R=String(g.id||d),x=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",V=g.status||"open",Pe=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",nt=g.description||"",mt={...g,metadata:{...g.metadata||{},..._}};return c`
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
            ${R}
          </button>
          ${le(x)} ${j(V,Pe)}
          ${h(g)} ${f(nt)}
          ${Ui(P,L,{expanded:fe,draft:H,sending:de,error:C})}
          ${b(g)} ${Q(g)} ${At(g)}
          ${ve(g)} ${Vt(g)}
          ${Ni(g,at)}
          ${pt()}
          ${Ki(mt,St,ee(),Te(),pe())}
          ${Ji({expanded:ge,loading:Be,error:be,data:Ce},{onToggle:N})}
          ${Qi(U(),W,{total:M(),expanded:ae})}
        </div>
      </div>
    `}function Z(){Oe(re(),e)}return{load(g){g!==d&&(_={},y="",K(),ue(),xe()),d=g,p=null,ft()},clear(){d=null,p=null,_={},y="",A=!1,K(),ue(),xe(),me.close(),we.close(),Oe(c``,e)},destroy(){ht&&(ht(),ht=null),De&&(De(),De=null),ot&&(ot(),ot=null),document.removeEventListener("keydown",We),me.destroy(),z.parentNode&&z.parentNode.removeChild(z),we.destroy(),oe.parentNode&&oe.parentNode.removeChild(oe),d=null,p=null,y="",A=!1,ue(),xe(),Oe(c``,e)}}}var Xd=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ta(e,t){return rs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Qd(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function ra(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let i="";async function l(S){let C=r.get();if(C)try{let H=await n("display-policy-set",{expected_revision:C.revision,policy:S(C)});a(H),H&&H.conflict&&H.policy&&(H=await n("display-policy-set",{expected_revision:H.policy.revision,policy:S(H.policy)}),a(H)),H&&H.conflict&&se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function d(S){let C=r.get();if(!C)return;let H=ta(S,C)!=="shown";l(de=>Qd(S,de,H))}function p(){let S=i.trim();S.length!==0&&(i="",l(C=>C.hidden_prefixes.includes(S)?{hidden_prefixes:C.hidden_prefixes}:{hidden_prefixes:[...C.hidden_prefixes,S]}),O())}function _(S){l(C=>({hidden_prefixes:C.hidden_prefixes.filter(H=>H!==S)}))}function y(S){let C=r.get();if(!C)return;let H=C.chips[S]===!1;l(()=>({chips:{[S]:H}}))}function A(S){let C=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${C.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${C.map(H=>{let de=ta(H,S);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${de}`}
                  data-label=${H}
                  data-state=${de}
                  @click=${()=>d(H)}
                >
                  ${H}
                </button>`})}
            </div>`}
      </section>
    `}function k(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(C=>c`<span class="display-settings__prefix">
                ${C}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${C} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(C)}
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
    `}function v(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Xd.map(([C,H])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${C}
                  .checked=${S.chips[C]!==!1}
                  @change=${()=>y(C)}
                />
                <span>${H}</span>
              </label>`)}
        </div>
      </section>
    `}function O(){let S=r.get();Oe(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${I}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?c`${A(S)} ${k(S)}
                ${v(S)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let q=!1,J=()=>{q=!1};o.addEventListener("close",J),o.addEventListener("cancel",J);let K=null;r.subscribe&&(K=r.subscribe(()=>{q&&O()}));function P(){q||(i="",q=!0,O(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function I(){q&&(q=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:P,close:I,destroy(){q=!1,o.removeEventListener("close",J),o.removeEventListener("cancel",J),K&&(K(),K=null),o.remove()}}}function na(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(d,p,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let y=typeof _=="string"?_.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}function sa(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function oa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var Jd={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},ia=160;function eu(e){return e.length>ia?`${e.slice(0,ia)}\u2026`:e}function Pn(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,i=document.createElement("dialog");i.id="worker-exec-defaults-dialog",i.className="exec-defaults",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=null,a=!1;function d(){return r&&r.get()||{revision:0,exec_defaults:{}}}function p(){let w=d();return typeof w.revision=="number"?w.revision:0}function _(){let w=n?n.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function y(w){n&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&n.set({revision:w.revision,presets:w.presets})}function A(w){w&&w.queue&&r&&r.set(w.queue)}function k(){return d().runner_catalog??null}let v=null;function O(){if(v!==null)return v;let w=d().default_exec_preset_id;return typeof w=="string"&&w.length>0?w:null}async function q(w){if(!s)return;let G=_();if(!G)return;v=w||"";let W=I(w);if(ne(),!W.viable){se(W.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let ee=await s("worker-queue-set-default-exec-preset",{preset_id:w||null,expected_queue_revision:p(),expected_preset_revision:G.revision});if(A(ee),ee&&ee.presets&&n&&n.set(ee.presets),ee&&ee.conflict){se("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(ee&&ee.applied){v=null,ne();return}se("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{se("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function J(w){l={id:w.id,name:w.name,settings:{...w.settings||{}}},C(),a=!1,ne()}function K(){l={id:null,name:"",settings:{}},a=!1,ne()}function P(w){let G=w&&w.settings&&typeof w.settings=="object"?w.settings:{},W=ee=>typeof G[ee]=="string"?G[ee]:ee==="impl_runtime"&&typeof G.impl_model=="string"&&Yt(k(),G.impl_model)||"";return Er({selectedOf:W,effectiveOf:W,runner_catalog:k()}).some(ee=>ee.groups.some(pe=>pe.options.some(Te=>Te.value===ee.selected&&Te.label.endsWith("(\uBE44\uD638\uD658)"))))}function I(w){if(!w)return{viable:!0,missing:!1,incompatible:!1,preset:null};let W=_()?.presets.find(pe=>pe.id===w);if(!W||W.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let ee=W.compatible===!1||P(W);return{viable:!ee,missing:!1,incompatible:ee,preset:W}}function S(){let w=l?.settings.orchestration_model;return typeof w!="string"?null:Yt(k(),w)}function C(){if(!l)return;let w=On({impl_runtime:l.settings.impl_runtime||"",impl_model:l.settings.impl_model||"",impl_effort:l.settings.impl_effort||""},k(),S());for(let G of["impl_runtime","impl_model","impl_effort"])w[G]?l.settings[G]=w[G]:delete l.settings[G]}function H(w){let G=w&&w.settings&&typeof w.settings=="object"?w.settings:{},W=Tr.filter(pe=>typeof G[pe]=="string").length,ee=Tr.filter(pe=>typeof G[pe]=="string").map(pe=>`${Ts[pe]?.title||pe}: ${G[pe]}`);return{count:`${W}/11 \uC9C0\uC815`,choices:ee.length>0?ee.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function de(w){if(!s||!window.confirm(`\u201C${w.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let G=_();if(G)try{let W=await s("exec-preset-delete",{expected_revision:G.revision,id:w.id});y(W),W&&W.conflict&&se("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{se("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function ke(w=!1){if(!s||!l)return;let G=_();if(!G)return;let W=w||l.id===null,ee={expected_revision:G.revision,...W?{}:{id:l.id},name:l.name,settings:{...l.settings}};try{let pe=await s(W?"exec-preset-create":"exec-preset-update",ee);if(y(pe),pe&&pe.conflict){a=!0,ne();return}if(pe&&pe.applied){l=null,a=!1,ne();return}se("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{se("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function fe(w){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${Cs(w.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${w.key}
        ?disabled=${w.disabled}
        @change=${G=>{if(!l)return;let W=G.target.value;W?l.settings[w.key]=W:delete l.settings[w.key],(w.key==="impl_runtime"||w.key==="impl_model"||w.key==="impl_effort"||w.key==="orchestration_model")&&C(),a=!1,ne()}}
      >
        ${Dn(w.groups,w.selected,Es[w.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function ue(){if(!l)return"";let w=pe=>typeof l?.settings[pe]=="string"?l.settings[pe]:"",G=Er({selectedOf:w,effectiveOf:w,runner_catalog:k(),controller_runtime:S()}),W=_(),ee=l.id!==null&&W!==null&&!W.presets.some(pe=>pe.id===l?.id);return c`<div class="exec-preset-editor" data-preset-editor>
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
              @click=${()=>{ke(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{ke(!1)}}
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
    </div>`}function Ee(){let w=_(),G=w?w.presets.filter(W=>W?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${K}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${w===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:G.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:G.map(W=>{let ee=H(W),pe=typeof W.reference_count=="number",Te=pe?W.reference_count:null,Ne=Array.isArray(W.reference_summary)?W.reference_summary.map(Ze=>Ze?.display_name||Ze?.workspace_key).filter(Boolean).join(", "):"";return c`<article
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
                    @click=${()=>J(W)}
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
    </section>`}function Ue(){let w=_(),G=w?w.presets.filter(Ne=>Ne?.migration_pending!==!0):[],W=O()||"",ee=I(W),pe=ee.preset,Te=pe?H(pe):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
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
        ?disabled=${w===null}
        @change=${Ne=>{q(Ne.target.value)}}
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
    </section>`}function Ke(){let w=d().workspace_info;return w&&typeof w=="object"?w:{}}function je(w,G){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${w}"
      >${G}</span
    >`}function $e(w){let G=w?oa(w.cmd):"",W=w?sa(w.timeout_ms):"",ee=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${G?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${G}</span>
            ${je("config","config")}
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
    </div>`}function L(w){let G=w?oa(w.cmd):"",W=w?sa(w.timeout_ms):"",ee=W?`timeout ${W} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",pe=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${G?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${G}</span>
            ${je("config","config")}
            ${w.detached===!0?je("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${ee}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${pe}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function z(w){if(!w||typeof w!="object")return"";let G=Jd[String(w.outcome)];if(!G)return"";let W=w.outcome==="failed"&&w.reason?`${G.label} \xB7 ${w.reason}`:G.label,ee=[gt(w.at),typeof w.bead_id=="string"?w.bead_id:"",typeof w.base_sha=="string"?w.base_sha.slice(0,7):""].filter(Ne=>Ne.length>0).join(" \xB7 "),pe=typeof w.detail=="string"&&w.detail.length>0?eu(w.detail):"",Te=typeof w.log_path=="string"&&w.log_path.length>0?w.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${je(G.modifier,W)}
        ${ee?c`<span class="exec-defaults__vd-meta">${ee}</span>`:""}
      </div>
      ${pe?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${pe}</code>
          </div>`:""}
      ${Te?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${Te}</code>
          </div>`:""}
    </div>`}let me=!1,oe=!1,we=!1,ge=null;async function Be(){if(s){oe=!0,we=!1,ne();try{let w=await Promise.resolve(s("get-worker-system-prompt",{}));!w||typeof w!="object"||Array.isArray(w)?we=!0:ge=w}catch{we=!0}finally{oe=!1,ne()}}}function be(){if(me=!me,me&&!ge){Be();return}ne()}function Ce(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
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
      ${me?B():""}
    </section>`}function B(){let w=Ar({loading:oe,error:we});if(w)return w;if(!ge)return"";let G=Array.isArray(ge.variants)?ge.variants:[];return c`<div class="exec-defaults__sp-body">
      ${ge.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${ge.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${G.map(W=>c`<div class="exec-defaults__sp-variant" data-variant=${W.key}>
            <div class="exec-defaults__sp-cond">${W.condition}</div>
            ${Gt(W.label,W.system_prompt)}
          </div>`)}
    </div>`}function D(w){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$e(w.verify_cmd)} ${L(w.deploy_cmd)}
      ${z(w.last_deploy)}
    </section>`}function ne(){if(Oe(c`
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
            ${D(Ke())}
            ${Ce()}
          </div>
        </div>
      `,i),v!==null){let w=i.querySelector("[data-workspace-preset-select]");w&&(w.value=v)}}let xe=!1,Re=()=>{xe=!1},N=w=>{w.target===w.currentTarget&&ce()};i.addEventListener("close",Re),i.addEventListener("cancel",Re),i.addEventListener("click",N);let U=null;r&&r.subscribe&&(U=r.subscribe(()=>{xe&&ne()}));let M=null;n&&n.subscribe&&(M=n.subscribe(()=>{xe&&ne()}));function ae(){xe||(xe=!0,ne(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function ce(){xe&&(xe=!1,typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:ae,close:ce,destroy(){xe=!1,i.removeEventListener("close",Re),i.removeEventListener("cancel",Re),i.removeEventListener("click",N),U&&(U(),U=null),M&&(M(),M=null),i.remove()}}}function Cr(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${gt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Is(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Dt(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,i=e.lane==="done"&&!o,l=i?Tt(e.done_at):"",a=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",p=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,_=c`<span class="worker-mini__title">${e.title}</span>`,y=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",A=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",k=r.map(C=>C===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${C}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${C===e.completion_badge&&e.completion_title||""}
          >${C}</span
        >`),v=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",O=n?c`<span class="worker-usage" title=${Sr(e.usage)}
        >${n}</span
      >`:"",q=s?c`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",J=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",K=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",P=e.discard_action?c`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",I=e.revise_action?c`<button
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
        </button>`:"",S=!!(n||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return c`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${d}${p}${_}</div>
          <div class="worker-mini__row2">
            ${O}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${gt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${k}${q}
            <span class="worker-mini__actions"
              >${J}${K}${P}</span
            >
            ${Cr(e)}
          </div>`:o?c`<div class="worker-mini__head">
              ${a}${d}${p}${y}${A}${k}${v}
            </div>
            <div class="worker-mini__body">${_}</div>
            ${S?c`<div class="worker-mini__foot">
                  ${O}${q}
                  <span class="worker-mini__actions"
                    >${J}${K}${P}${I}</span
                  >
                </div>`:""}
            ${Cr(e)}`:c`<div class="worker-mini__line">
              ${a}${d}${p}${_}${y}${A}${k}${v}${O}${q}${J}${K}${P}
            </div>
            ${Cr(e)}`}
  </div>`}function tu(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
    ${r?gn(r,e.status):""}
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
    ${Cr(e)}
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?tu(n):Is(n))}
          </div>`}
  </section>`}var aa=160;function Mn(e){return e.length>aa?`${e.slice(0,aa)}\u2026`:e}function ru(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Mn(e.command)}</code>`:""}
  </div>`}function nu(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function su(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function ou(e){return!e||typeof e.verdict!="string"||typeof e.evidence!="string"?"":e.malformed===!0||e.verdict==="malformed"?c`<div class="worker-banner__detail">
      <b>진단 결과 형식 오류</b> · ${Mn(e.evidence)}
    </div>`:c`<div class="worker-banner__detail">
    진단: <b>${e.verdict}</b> · 근거:
    ${Mn(e.evidence)}
    ${e.verdict==="regression"&&e.fix_bead_id?c` · 수정 bead: ${e.fix_bead_id}`:""}
  </div>`}function Ls(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function la(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
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
          ${ru(e.failure.cause_detail)}
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
          ${ou(r.diagnosis)}
          ${r.detail?c`<div class="worker-banner__detail">
                <code>${Mn(r.detail)}</code>
              </div>`:""}
          ${su(r.log_path)} ${nu(r.output_tail)}
        </div>`)}
  </div>`}function iu(e,t,r=null){let n=!!e.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ls(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),i=Dt(e.usage),l=e.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=e.base_exception||null,d=e.attempt_id&&e.attempt_id===r;return c`<div
    class="rtile${d?" rtile--sel":""}${n?" rtile--paused":""}"
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
    ${o||i||l||a?c`<div class="rtile__meta">
          ${l?c`<span class="worker-mini__badge">${l}</span>`:""}
          ${a?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${a}</span
              >`:""}
          ${o?c`<span class="rtile__runner">${o}</span>`:""}
          ${i?c`<span class="worker-usage" title=${Sr(e.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    ${Cr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ds(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>iu(s,t,r))}
  </div>`}function tr(e){return c`<svg
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
  </svg>`}function Os(){return tr(Ut`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ps(){return tr(Ut`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ms(){return tr(Ut`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function ca(){return tr(Ut`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function da(){return tr(Ut`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ua(){return tr(Ut`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function pa(){return tr(Ut`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function fa(){return tr(Ut`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Qr=1,au=6e4,lu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},cu=new Set(["auto_merge","merged","merge","done"]),_a={running:3,paused:2,failed:1};function du(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function uu(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let i of r)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from),s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of r){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0)continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!n.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let _=t.get(i.bead_id),y=typeof _=="number"&&_>0&&typeof i.finished_at=="number"&&_>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!y&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,d=o.get(i.bead_id);if(d){let _=_a[d.run_state],y=_a[l];if(_>y||_===y&&(d.started_at??0)>(a??0))continue}let p=typeof i.session_id=="string"&&i.session_id.length>0;o.set(i.bead_id,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:a,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,model:typeof i.model=="string"?i.model:null,usage:qt(e,i.bead_id),can_pause:l==="running"&&p,can_resume:l!=="running"&&p&&!n.has(i.attempt_id)})}return o}function ma(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function Ns(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,i=new Map;for(let v of s)v&&typeof v.root_dir=="string"&&i.set(v.root_dir,v);let l=[],a=[],d=[],p=[],_=[],y=new Map;for(let v of n){if(!v||typeof v.root_dir!="string")continue;let O=v.root_dir,q=v.name||O,J=i.get(O),K=J&&typeof J.revision=="number"?J.revision:typeof v.revision=="number"?v.revision:0,P=Rt(v.attempts),I=Rt(v.bead_titles),S=Rt(v.pr_observations),C=Rt(v.admission),H=Rt(v.revise_parked),de=Rt(v.merge_queue_state),ke=Rt(v.cleanup_failed),fe=Array.isArray(v.merge_queue)?v.merge_queue:[],ue=new Set(fe.filter(L=>L&&typeof L.bead_id=="string").map(L=>L.bead_id)),Ee=Array.isArray(v.queue)?v.queue:[],Ue=Array.isArray(v.done)?v.done:[],Ke=new Map;for(let L of Ue)L&&typeof L.bead_id=="string"&&typeof L.added_at=="number"&&Ke.set(L.bead_id,L.added_at);let je=L=>({id:L,title:I[L]||L,root_dir:O,workspace_name:q,expected_revision:K,draggable:!1}),$e=new Set;for(let[L,z]of uu(P,Ke))$e.add(L),a.push({...je(L),lane:"running",attempt_id:z.attempt_id,run_state:z.run_state,can_pause:z.can_pause,can_resume:z.can_resume,started_at:z.started_at,last_event_at:z.last_event_at,model:z.model,usage:z.usage,badges:z.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:z.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:z.run_state==="failed"});for(let L of Array.isArray(v.pr_wait)?v.pr_wait:[]){let z=L&&L.bead_id;if(typeof z!="string"||$e.has(z))continue;$e.add(z);let me=Rt(S[z]),oe=Rt(me.pr),we=me.gate?Rt(me.gate):null,ge=ue.has(z),Be=de.active===z,be=L.external===!0,Ce=ke[z]||null,B=!!we&&we.base_badge==="\uCDA9\uB3CC",D=!!Ce&&!!we&&we.tier==="merged",ne=be&&!!we&&we.tier==="merged";d.push({...je(z),lane:"pr_wait",pr_number:typeof oe.number=="number"?oe.number:null,pr_url:typeof oe.url=="string"?oe.url:void 0,external:be,usage:qt(P,z),badges:Ce?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Ce,reason:Ce?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!ge,merge_enabled:we?.enabled===!0||B||D||ne,merge_label:ne?"\uC815\uB9AC":B&&!D?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ne?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":D?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":B?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":we?.enabled===!0?`\uBA38\uC9C0 (${we.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${we?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ge,cancel_enabled:!Be,discard_action:!be&&!Ce&&!(we&&we.tier==="merged"),discard_enabled:!Be&&!ge,discard_title:ge?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let L=0;L<Ee.length;L++){let z=Ee[L],me=z&&z.bead_id;if(typeof me!="string"||$e.has(me))continue;$e.add(me);let oe=H[me],we={...je(me),lane:"queue",reason:ma(C,me),queue_position:L+1,queue_index:L,queue_length:Ee.length,badges:oe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!oe,revise_action:!!oe,revise_enabled:!!oe,revise_title:oe?oe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${oe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(we);let ge=y.get(O);ge?ge.push(we):y.set(O,[we])}for(let L of Array.isArray(v.runnable)?v.runnable:[]){let z=L&&L.bead_id;typeof z!="string"||$e.has(z)||($e.add(z),l.push({...je(z),title:L.title||I[z]||z,lane:"runnable",draggable:!0,reason:ma(C,z),created_at:L.created_at??void 0,updated_at:L.updated_at??void 0,labels:Array.isArray(L.labels)?L.labels:[],workflow:L.route?{route:L.route,chips:{route:L.route}}:null,place_index:Ee.length}))}for(let L of Ue){let z=L&&L.bead_id;if(typeof z!="string"||$e.has(z)||($e.add(z),o!==void 0&&typeof L.added_at=="number"&&L.added_at<o))continue;let me=du(P,z);_.push({...je(z),lane:"done",done:!0,usage:qt(P,z),done_at:typeof L.added_at=="number"?L.added_at:void 0,done_kind:me&&typeof me.done_kind=="string"?me.done_kind:null})}}a.sort((v,O)=>(O.last_event_at??0)-(v.last_event_at??0)),_.sort((v,O)=>(O.done_at??0)-(v.done_at??0));let A=s.length>0?s:n.map(v=>({root_dir:v&&v.root_dir,name:v&&v.name,auto_advance:v&&v.auto_advance,auto_merge:v&&v.auto_merge,slots:v&&v.slots,revision:v&&v.revision,exec_defaults:v&&v.exec_defaults,default_exec_preset_id:v&&v.default_exec_preset_id,runner_catalog:v&&v.runner_catalog})),k=[];for(let v of A)!v||typeof v.root_dir!="string"||k.push({root_dir:v.root_dir,name:v.name||v.root_dir,auto_advance:v.auto_advance===!0,auto_merge:v.auto_merge===!0,slots:typeof v.slots=="number"&&v.slots>=Qr?v.slots:Qr,revision:typeof v.revision=="number"?v.revision:0,exec_defaults:Rt(v.exec_defaults),default_exec_preset_id:typeof v.default_exec_preset_id=="string"?v.default_exec_preset_id:null,runner_catalog:Rt(v.runner_catalog),items:y.get(v.root_dir)||[]});return{runnable:l,queue:p,queue_groups:k,running:a,pr_wait:d,done:_,automation:{total:k.length,both_on:k.filter(v=>v.auto_advance&&v.auto_merge).length}}}function pu(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<au;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${gt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Tt(e,t)}</span
        >`}</span
  >`}function Jr(e){return c`<div class="mon-c__title">${e.title}</div>`}function en(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Nn(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Fs(e){let t=Dt(e.usage);return t?c`<span class="mon-c__usage" title=${Sr(e.usage)}
        >${t}</span
      >`:""}function qs(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function fu(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Ps()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Os()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${Ms()}
    </button>
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${ca()}
        </button>`:""}
  </span>`}function _u(e,t){let r=typeof e.started_at=="number"?Ls(t-e.started_at):"";return c`${Jr(e)}
    <div class="mon-c__meta">
      ${qs(e)}${pu(e.last_event_at,t)}${en(e)}${Nn(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Fs(e)}${fu(e)}
    </div>`}function mu(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=Tt(e.updated_at);return c`${Jr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${en(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${mn(e.labels,null).map(i=>c`<span class="ctl-chip ctl-chip--label">${i}</span>`)}
      ${Nn(e)}
      ${o?c`<span title=${`\uC218\uC815 ${gt(e.updated_at)}`}
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
    </div>`}function gu(e){return c`${Jr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${en(e)}
      ${qs(e)}
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
        </div>`:""}`}function hu(e){let t=!!(Dt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${Jr(e)}
    <div class="mon-c__meta">
      ${en(e)}${Nn(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${qs(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${Fs(e)}
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
        </div>`:""}`}function bu(e,t){let r=e.done_kind||"",n=r?lu[r]||r:"",s=Tt(e.done_at,t);return c`${Jr(e)}
    <div class="mon-c__meta">
      ${en(e)}${Nn(e)}
      ${n?c`<span
            class="mon-live__kind${cu.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Fs(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${gt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function ga(e,t){return e.lane==="running"?_u(e,t):e.lane==="runnable"?mu(e):e.lane==="queue"?gu(e):e.lane==="pr_wait"?hu(e):bu(e,t)}function ha(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?Ps():Os()}
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
        ${da()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${ua()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Qr}
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
        ${pa()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function ba(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=Ft.find(o=>o.value===e.done_range)?.label||"";return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Ms():fa()}
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
        ${Ft.map(o=>c`<option
              value=${o.value}
              ?selected=${e.done_range===o.value}
            >
              ${o.label}
            </option>`)}
      </select>
      ${e.token_total?c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${e.token_tooltip}
            >${s} 완료 · 누적 ${e.token_total}</span
          >`:""}
    </div>
  </div>`}function va(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ya(e){let t={};for(let i of jt)t[i]=0;let r=!1,n=0,s=0,o=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let a=!1;for(let d of jt){let p=l[d];typeof p=="number"&&Number.isFinite(p)&&(t[d]+=p,r=!0,a=!0)}if(a){s+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(n+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=n),r?Dt(t):null}var ka="bdui.monitor.done-range";function vu(){try{let e=window.localStorage.getItem(ka);return zt(e)?e:Et}catch{return Et}}function yu(e){try{window.localStorage.setItem(ka,e)}catch{}}var $a="tab:monitor:pipeline",wu=1e3,ku=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function wa(e,t){let r=e.lane==="runnable"||e.lane==="queue";return c`<div
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
    ${ga(e,t)}
  </div>`}function xa(e,t){let r=Ve("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.execPresetStore,l=t.getWorkspacePath,a=t.switchWorkspace,d=t.now||(()=>Date.now()),p=t.confirm||(N=>typeof globalThis.confirm!="function"||globalThis.confirm(N)),_=vu();function y(){let N=Ft.find(U=>U.value===_);return N?N.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let k=Ns(null,null),v=null,O=new Map,q=new Set;function J(N){return k.queue_groups.find(U=>U.root_dir===N)||null}let P=Pn(e,{queueStore:{get(){if(!v)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let N=O.get(v);if(N)return N;let U=J(v),M=s&&s.get?s.get():null,ae=(Array.isArray(M)?M:[]).find(ce=>ce&&ce.root_dir===v);return{revision:U?U.revision:0,exec_defaults:U?U.exec_defaults:{},default_exec_preset_id:U?U.default_exec_preset_id:null,runner_catalog:U?U.runner_catalog:null,workspace_info:ae?ae.workspace_info:void 0}},set(N){v&&O.set(v,N);for(let U of Array.from(q))U()},subscribe(N){return q.add(N),()=>q.delete(N)}},presetStore:i,transport:o?(N,U)=>o(N,N==="worker-queue-set-default-exec-preset"||N==="get-worker-system-prompt"?{...U||{},root_dir:v}:U):void 0,getWorkspacePath:()=>v||void 0}),I=null,S=null;async function C(N,U,M,ae){if(!o||!M)return null;let ce=await o(N,{...U,root_dir:M,expected_revision:ae});if(ce&&ce.conflict){let w=ce.queue&&typeof ce.queue.revision=="number"?ce.queue.revision:ae;ce=await o(N,{...U,root_dir:M,expected_revision:w})}return ce&&ce.queue&&M&&O.set(M,ce.queue),ce}async function H(N,U,M){return!o||!M?null:await o(N,{...U,root_dir:M})}async function de(N){if(!o||!N&&!p("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let U=await o("monitor-auto-toggle",{on:N}),M=U&&Array.isArray(U.failed)?U.failed:[];M.length>0&&se(`\uC790\uB3D9\uD654 ${N?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${M.map(ae=>ae.root_dir).join(", ")}`,"error",3200)}async function ke(){let N=new Map;for(let U of k.pr_wait)N.has(U.root_dir)||N.set(U.root_dir,U.expected_revision);for(let[U,M]of N)await C("worker-merge-queue-add-all",{},U,M)}let fe=null,ue=!1,Ee=null;function Ue(){Ee!==null&&clearTimeout(Ee),Ee=setTimeout(()=>{Ee=null,ue=!1},0)}function Ke(N){let U=N.target;return typeof U?.closest=="function"?U.closest(".mon-group"):null}function je(N){let U=Ke(N);return!U||!fe?null:(U.getAttribute("data-root-dir")||"")===fe.root_dir?U:null}function $e(){for(let N of Array.from(A.querySelectorAll(".mon-group--drag-over")))N.classList.remove("mon-group--drag-over")}function L(N){let U=N.target,M=typeof U?.closest=="function"?U.closest('.mon-card[draggable="true"]'):null;if(M){fe={bead_id:M.getAttribute("data-issue-id")||"",lane:M.getAttribute("data-lane")||"",root_dir:M.getAttribute("data-root-dir")||"",revision:Number(M.getAttribute("data-revision")||0)||0,queue_index:Number(M.getAttribute("data-queue-index")),queue_length:Number(M.getAttribute("data-queue-length")),place_index:Number(M.getAttribute("data-place-index"))},ue=!0;try{N.dataTransfer?.setData("text/plain",fe.bead_id),N.dataTransfer&&(N.dataTransfer.effectAllowed="move")}catch{}}}function z(N){let U=je(N);U&&(N.preventDefault(),N.dataTransfer&&(N.dataTransfer.dropEffect="move"),U.classList.add("mon-group--drag-over"))}function me(N){Ke(N)?.classList.remove("mon-group--drag-over")}function oe(){fe=null,$e(),Ue()}function we(N){let U=je(N),M=fe;if(fe=null,$e(),!U||!M||!M.bead_id)return;N.preventDefault();let ae=N.target,ce=typeof ae?.closest=="function"?ae.closest('.mon-card[data-lane="queue"]'):null,w=ce&&U.contains(ce)?Number(ce.getAttribute("data-queue-index")):NaN;if(M.lane==="runnable"){let ee=Number.isFinite(w)?w:M.place_index;if(!Number.isFinite(ee))return;C("worker-queue-place",{bead_id:M.bead_id,index:ee},M.root_dir,M.revision);return}if(M.lane!=="queue"||ce&&ce.getAttribute("data-issue-id")===M.bead_id)return;let G=M.queue_index,W=Number.isFinite(w)?G>w?w:w-1:M.queue_length-1;!Number.isFinite(W)||W<0||W===G||C("worker-queue-reorder",{bead_id:M.bead_id,to_index:W},M.root_dir,M.revision)}function ge(N){let U={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return c`${ba({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},done_range:_,token_total:ya(k.done),token_tooltip:va(y())})}
      <div class="worker-lanes mon-lanes">
        ${ku.map(M=>{let ae=U[M.lane],ce=M.lane==="queue"?k.queue_groups.length>0?c`${k.queue_groups.map(w=>c`<div
                        class="mon-group"
                        data-root-dir=${w.root_dir}
                      >
                        ${ha(w)}
                        <div class="mon-group__list">
                          ${w.items.map(G=>wa(G,N))}
                        </div>
                      </div>`)}`:void 0:ae.length>0?c`${ae.map(w=>wa(w,N))}`:void 0;return Bt({id:`monitor-${M.lane}`,lane:M.pane,title:M.lane==="done"?`\uC644\uB8CC\xB7${y()}`:M.title,items:ae,empty:M.empty,body:ce,live:M.lane==="running"&&ae.length>0,header_control:M.lane==="pr_wait"&&ae.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function Be(){let N=s&&s.get?s.get():null,U=s&&s.getWorkspacesState?s.getWorkspacesState():[],M=d();k=Ns(N,U,{done_since:br(_,M)}),Oe(ge(M),A)}function be(N,U){let M=l?l():void 0;if(!U||!M||U===M||!a){n(N);return}a(U).then(()=>{n(N)}).catch(ae=>{r("workspace switch for %s failed: %o",U,ae)})}function Ce(N){return{root_dir:N.getAttribute("data-root-dir")||"",revision:Number(N.getAttribute("data-revision")||0)||0}}function B(N,U){let{root_dir:M,revision:ae}=Ce(N),ce=N.getAttribute("data-issue-id")||"",w=N.getAttribute("data-attempt-id")||"",G=U.classList;if(G.contains("worker-card__place")){C("worker-queue-place",{bead_id:ce,index:Number(N.getAttribute("data-place-index")||0)||0},M,ae);return}if(G.contains("mon-op--up")||G.contains("mon-op--down")){let W=Number(N.getAttribute("data-queue-index")||0)||0,ee=G.contains("mon-op--up")?W-1:W+1;if(ee<0)return;C("worker-queue-reorder",{bead_id:ce,to_index:ee},M,ae);return}if(G.contains("mon-op--remove")){C("worker-queue-remove",{bead_id:ce},M,ae);return}if(G.contains("mon-op--pause")){H("worker-attempt-pause",{attempt_id:w},M);return}if(G.contains("mon-op--stop")){H("worker-attempt-stop",{attempt_id:w},M);return}if(G.contains("mon-op--resume")){C("worker-attempt-resume",{attempt_id:w},M,ae);return}if(G.contains("mon-op--dismiss")){C("worker-attempt-dismiss",{attempt_id:w},M,ae);return}if(G.contains("worker-mini__merge")){C("worker-merge-queue-add",{bead_id:ce},M,ae);return}if(G.contains("worker-mini__merge-cancel")){C("worker-merge-queue-remove",{bead_id:ce},M,ae);return}if(G.contains("worker-mini__discard")){if(!p(`${ce}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;C("worker-pr-discard",{bead_id:ce},M,ae);return}if(G.contains("worker-mini__revise-fix")){C("worker-revise-fix",{bead_id:ce},M,ae);return}G.contains("worker-mini__revise-approve")&&C("worker-revise-approve",{bead_id:ce},M,ae)}function D(N){let U=ue;ue=!1;let M=N.target;if(!M||typeof M.closest!="function"||M.closest("dialog")||M.closest("a"))return;let ae=M.closest(".mon-auto-all");if(ae){N.preventDefault(),de(ae.getAttribute("data-on")==="true");return}if(M.closest(".mon-merge-all")){N.preventDefault(),ke();return}let w=M.closest(".mon-ctl--advance");if(w){N.preventDefault();let{root_dir:Ne,revision:Ze}=Ce(w);C("worker-queue-toggle",{on:w.getAttribute("data-on")==="true"},Ne,Ze);return}let G=M.closest(".mon-ctl--merge-auto");if(G){N.preventDefault();let{root_dir:Ne,revision:Ze}=Ce(G);C("worker-merge-auto-toggle",{on:G.getAttribute("data-on")==="true"},Ne,Ze);return}let W=M.closest(".mon-ctl--exec");if(W){N.preventDefault(),v=W.getAttribute("data-root-dir")||null,O.delete(v||""),P.open();return}let ee=M.closest(".mon-card");if(!ee)return;let pe=M.closest("button");if(pe){N.preventDefault(),B(ee,pe);return}let Te=ee.getAttribute("data-issue-id");Te&&!U&&(N.preventDefault(),be(Te,ee.getAttribute("data-root-dir")||""))}function ne(N){let U=N.target;if(!U||typeof U.closest!="function")return;let M=U.closest(".mon-done-range");if(M){_=zt(M.value)?M.value:Et,yu(_),Be();return}let ae=U.closest(".mon-slots__input");if(!ae)return;let{root_dir:ce,revision:w}=Ce(ae),G=Number(ae.value);if(!Number.isFinite(G))return;let W=Math.max(Qr,Math.floor(G));C("worker-queue-set-slots",{slots:W},ce,w)}e.addEventListener("click",D),e.addEventListener("change",ne),e.addEventListener("dragstart",L),e.addEventListener("dragover",z),e.addEventListener("dragleave",me),e.addEventListener("drop",we),e.addEventListener("dragend",oe),s&&typeof s.subscribe=="function"&&(I=s.subscribe(()=>{try{O.clear(),Be();for(let N of Array.from(q))N()}catch{}}));function xe(){S!==null&&(clearInterval(S),S=null)}function Re(){Ee!==null&&(clearTimeout(Ee),Ee=null)}return{load(){r("load"),Be(),S===null&&(S=setInterval(()=>{try{Be()}catch{}},wu))},pause(){xe()},clear(){xe(),Re(),I&&(I(),I=null),e.removeEventListener("click",D),e.removeEventListener("change",ne),e.removeEventListener("dragstart",L),e.removeEventListener("dragover",z),e.removeEventListener("dragleave",me),e.removeEventListener("drop",we),e.removeEventListener("dragend",oe),P.destroy(),q.clear(),e.replaceChildren()}}}function Sa(e,t,r){let n=Ve("views:nav"),s=null;function o(a){return d=>{d.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let a=t.getState(),d=a.view==="worker"||a.view==="monitor"?a.view:"board";return c`
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
    `}function l(){Oe(i(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),Oe(c``,e)}}}var Aa=["bug","feature","task","epic","chore"];function Ta(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Ea=["Critical","High","Medium","Low","Backlog"];function Ca(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),y=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",o.appendChild(I);for(let S of Aa){let C=document.createElement("option");C.value=S,C.textContent=Ta(S),o.appendChild(C)}i.replaceChildren();for(let S=0;S<=4;S+=1){let C=document.createElement("option");C.value=String(S);let H=Ea[S]||"Medium";C.textContent=`${S} \u2013 ${H}`,i.appendChild(C)}}A();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function v(I){s.disabled=I,o.disabled=I,i.disabled=I,l.disabled=I,a.disabled=I,p.disabled=I,_.disabled=I,_.textContent=I?"Creating\u2026":"Create"}function O(){d.textContent=""}function q(I){d.textContent=I}function J(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?o.value=I:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?i.value=S:i.value="2"}catch{o.value="",i.value="2"}}function K(){let I=o.value||"",S=i.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function P(){O();let I=String(s.value||"").trim();if(I.length===0){q("Title is required"),s.focus();return}let S=Number(i.value||"2");if(!(S>=0&&S<=4)){q("Priority must be 0..4"),i.focus();return}let C=String(o.value||""),H=String(a.value||""),de={title:I};C.length>0&&(de.type=C),String(S).length>0&&(de.priority=S),H.length>0&&(de.description=H),v(!0);try{await t("create-issue",de)}catch{v(!1),q("Failed to create issue");return}K(),v(!1),k()}return r.addEventListener("cancel",I=>{I.preventDefault(),k()}),y.addEventListener("click",()=>k()),p.addEventListener("click",()=>k()),r.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),P())}),n.addEventListener("submit",I=>{I.preventDefault(),P()}),{open(){n.reset(),O(),J();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var $u=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ra(e){return String(e).padStart(2,"0")}function xu(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Su(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Ra(n.getHours())}:${Ra(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${$u[n.getMonth()]} ${n.getDate()} ${o}`;return`${xu(r,t)} \xB7 ${l}`}function Au(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Ia(e){let t=!1,r=null;function n(){Oe(c``,e),e.hidden=!0}async function s(){try{let o=await fetch("/api/claude-usage");if(!o.ok)throw new Error(`usage request failed: ${o.status}`);let i=await o.json();if(t)return;if(!i||i.available!==!0||!Array.isArray(i.windows)){n();return}let l=typeof i.ageSeconds=="number"&&i.ageSeconds>600,a=l?`${Math.floor(i.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",d=Date.now();Oe(c`<div
          class="usage-meter${l?" usage-meter--stale":""}"
          aria-label="Claude Code usage"
        >
          ${i.windows.map(p=>{let _=typeof p.pct=="number"&&Number.isFinite(p.pct)?p.pct:0,y=Math.min(100,Math.max(0,_)),k=`resets ${Su(p.resetsAt,d)}${l?` \xB7 ${a}`:""}`;return c`<span
              class="usage-meter__window ${Au(_)}"
              style=${`--progress: ${y}%`}
              title=${k}
            >
              <span class="usage-meter__label">${p.key}</span>
              <span class="usage-meter__track" aria-hidden="true">
                <span class="usage-meter__fill"></span>
              </span>
              <span class="usage-meter__pct">${_}%</span>
            </span>`})}
        </div>`,e),e.hidden=!1}catch{t||n()}}return n(),s(),r=setInterval(()=>{s()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),n()}}}var Tu="worker-ineligible";function Eu(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function La(e){return Eu(e).includes(Tu)}var Cu="tab:worker:ready",Ru="tab:worker:blocked",Iu="tab:worker:in-progress",tn=1;function Da(e){return Kr(e).path.length>0}var Na="beads-ui.worker.candidate-filter",Bs={show_blocked:!1,spec:"all"};function Lu(e,t){if(!e||typeof e!="object"||Array.isArray(e))return!1;let r=Object.values(e),n=new Set;for(let s of r)s&&typeof s=="object"&&typeof s.resumed_from=="string"&&s.resumed_from.length>0&&n.add(s.resumed_from);return r.some(s=>s&&typeof s=="object"&&s.bead_id===t&&s.cleanup_diagnosis===!0&&(s.status==="running"||s.status==="paused"&&!n.has(s.attempt_id)))}function Du(){try{let e=window.localStorage.getItem(Na);if(!e)return{...Bs};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Bs};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Bs}}}function Ou(e){try{window.localStorage.setItem(Na,JSON.stringify(e))}catch{}}function Pu(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of e){let a=r(l),d=n(l);a&&d?s.push(l):!a&&d?o+=1:a&&!d&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Mu=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Fa="bdui.worker.candidate_sort",Nu=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Fn="spec";function Fu(){try{let e=window.localStorage.getItem(Fa);return e==="board"||e==="created"||e==="spec"?e:Fn}catch{return Fn}}function qu(e){try{window.localStorage.setItem(Fa,e)}catch{}}var qa="bdui.worker.done-range";function Bu(){try{let e=window.localStorage.getItem(qa);return zt(e)?e:Et}catch{return Et}}function Uu(e){try{window.localStorage.setItem(qa,e)}catch{}}var zu="(max-width: 640px)",Ba="beads-ui.worker.lane-collapsed",rn={queue:!0,done:!0};function ju(){try{let e=window.localStorage.getItem(Ba);if(!e)return{...rn};let t=JSON.parse(e);return!t||typeof t!="object"?{...rn}:{queue:typeof t.queue=="boolean"?t.queue:rn.queue,done:typeof t.done=="boolean"?t.done:rn.done}}catch{return{...rn}}}function Hu(e){try{window.localStorage.setItem(Ba,JSON.stringify(e))}catch{}}function Oa(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Wu(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(cr):(n.sort(cn(r)),t==="board"?n:[...n.filter(Da),...n.filter(s=>!Da(s))])}function Gu(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Yu(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Vu(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Ku=["closed_unmerged","undecidable"],Zu=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Xu(e,t){for(let r of Zu)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var Us=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Qu(e){if(typeof e!="string"||e.length===0)return null;let t=Us.length,r=Us.findIndex(n=>n.step===e);return r<0?{label:e,index:0,total:t,percent:0}:{label:Us[r].label,index:r+1,total:t,percent:Math.round((r+1)/t*100)}}function Pa(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Ma(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Ju(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let i=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&i.push(`repair ${n.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:o,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function ep(e,t,r,n,s=null,o=null,i=null,l=!1,a=null,d=!0,p=null,_=null,y=null){let A=!!a&&a.position>0,k=!!a&&a.active===!0,v=a&&a.failure||null,O=r[e]||null,q=O&&O.gate?O.gate:null,J=O&&O.pr?O.pr:null,K=Ju(y),P=[];l&&P.push("\uC138\uC158");let I=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,S=Xu(l&&q&&q.tier==="closed_unmerged"?"\uB2EB\uD798":q&&q.gate_badge||"",I?null:o&&o.activity||null);I&&P.push(I),S.label&&P.push(S.label),q&&q.base_badge&&q.base_badge!==q.gate_badge&&P.push(q.base_badge),_&&P.push(_),n&&P.push("\uC815\uB9AC \uC2E4\uD328"),K&&P.push(K.badge),A&&!k&&P.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),v&&P.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Pa(v)}`),p&&P.push(`\uC790\uB3D9 \uC81C\uC678: ${Pa(p)}`);let C=!!q&&q.base_badge==="\uCDA9\uB3CC",H=!!q&&q.enabled===!0,de=Qu(o&&o.merge_progress?o.merge_progress.step:null),ke=!!n&&!!q&&q.tier==="merged",fe=l&&!!q&&q.tier==="merged",ue=l&&C&&d===!1;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:J&&typeof J.number=="number"?J.number:null,pr_url:J&&typeof J.url=="string"?J.url:"",completion_badge:K?K.badge:null,completion_title:K?K.title:"",completion_repair_pr_url:K?K.repair_pr_url:"",completion_repair_pr_number:K?K.repair_pr_number:null,badges:P,live_badge:i==="running"?I:I?null:S.live?S.label:null,usage:s,alert:!!q&&Ku.includes(q.tier)||!!n||!!v||!!(K&&K.alert),merge_action:!A,cancel_action:A,cancel_enabled:!k&&!(K&&K.lock_actions),cancel_title:K&&K.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":k?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(q&&q.tier==="merged"),merge_step:de,discard_enabled:!de&&!i&&!A&&!(K&&K.lock_actions),discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":A?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!de&&!i&&!(K&&K.lock_actions)&&!ue&&(H||C||ke||fe),merge_label:fe?"\uC815\uB9AC":C&&!de&&!ke?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:de?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${de.label}`:fe?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":ue?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":C?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":H?`\uBA38\uC9C0 (${q.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:q&&q.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${q&&q.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function zs(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:i,uiOrderStore:l,gotoIssue:a,getWorkspacePath:d}=t,p=n?un(n,l):null,_=fn({transport:r,uiOrderStore:l}),y=null,A=[],k=Du(),v=Fu(),O=Bu();function q(){let u=Ft.find(m=>m.value===O);return u?u.label:"\uC624\uB298"}let J=ju(),K=!1,P=new Set,I=new Set,S=new Set,C=[],H=document.createElement("div");H.className="worker-console";let de=document.createElement("div");de.className="worker-top";let ke=document.createElement("div");ke.className="worker-drawer-overlay",ke.hidden=!0;let fe=document.createElement("div");fe.className="worker-drawer-overlay__backdrop";let ue=document.createElement("div");ue.className="worker-drawer-host",ke.append(fe,ue);let Ee=document.createElement("div");Ee.className="worker-lanes-host",H.append(de,ke,Ee),e.appendChild(H);let Ue=null,Ke=In(ue,{transport:r,sessionLogStore:i,onClose:()=>{Ue=null,ke.hidden=!0,De()}}),je=Pn(H,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:d});function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:tn,queue:[],pr_wait:[],done:[]}}function L(){let u=$e();return typeof u.revision=="number"?u.revision:0}function z(u){u&&u.queue&&s&&s.set(u.queue)}function me(){let u=$e().queue;return Array.isArray(u)?u.length:0}async function oe(u,m){if(!r)return;let T=await r("worker-queue-place",{bead_id:u,index:m,expected_revision:L()});z(T),T&&T.conflict&&await r("worker-queue-place",{bead_id:u,index:m,expected_revision:L()}).then(z)}async function we(u,m){if(!r)return;let T=await r("worker-queue-reorder",{bead_id:u,to_index:m,expected_revision:L()});z(T),T&&T.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:m,expected_revision:L()}).then(z)}async function ge(u){if(!r)return;let m=await r("worker-queue-remove",{bead_id:u,expected_revision:L()});z(m),m&&m.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:L()}).then(z)}async function Be(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function be(u){if(!r||!u)return;let m=await r("worker-attempt-pause",{attempt_id:u});m&&m.paused===!1&&m.reason&&se(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Ce(u){if(!r||!u)return;let m=await r("worker-attempt-resume",{attempt_id:u,expected_revision:L()});z(m),m&&m.conflict&&(m=await r("worker-attempt-resume",{attempt_id:u,expected_revision:L()}),z(m)),m&&m.resumed===!1&&!m.conflict&&m.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function B(u){if(!r||!u)return;let m=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:L()});z(m),m&&m.conflict&&(m=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:L()}),z(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&se(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function D(u){if(!r||!u||S.has(u))return;S.add(u),De();let m;try{m=await r("worker-cleanup-diagnose",{bead_id:u,expected_revision:L()}),z(m),m&&m.conflict&&(m=await r("worker-cleanup-diagnose",{bead_id:u,expected_revision:L()}),z(m))}finally{S.delete(u),De()}m&&!m.conflict&&m.ok===!1&&m.reason&&se(`AI \uC815\uB9AC \uAC70\uBD80: ${m.reason}`,"error",2400)}async function ne(u,m){if(!r)return null;let T=r,X=await T(u,{...m,expected_revision:L()});return z(X),X&&X.conflict&&(X=await T(u,{...m,expected_revision:L()}),z(X)),X}async function xe(u){if(!r||!u)return;P.add(u),De();let m;try{m=await ne("worker-merge-queue-add",{bead_id:u})}finally{P.delete(u),De()}!m||m.conflict||m.applied||se("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Re(u){if(!r)return;let m=await ne("worker-merge-auto-toggle",{on:u});!m||m.conflict||se(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function N(u){if(!r||!u)return;let m=await ne("worker-merge-queue-remove",{bead_id:u});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&se("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function U(){await ne("worker-merge-queue-remove",{all:!0})}async function M(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let T=await r("worker-pr-discard",{bead_id:u,expected_revision:L()});if(z(T),T&&T.conflict&&(T=await r("worker-pr-discard",{bead_id:u,expected_revision:L()}),z(T)),T&&T.discarded===!0){se("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}T&&T.discarded===!1&&!T.conflict&&se(`\uD3D0\uAE30 \uAC70\uBD80: ${T.reason||""}`,"error",2800)}async function ae(u,m){if(!r||!m||I.has(m))return;I.add(m),De();let T;try{T=await r(u,{bead_id:m,expected_revision:L()}),z(T),T&&T.conflict&&(T=await r(u,{bead_id:m,expected_revision:L()}),z(T))}finally{I.delete(m),De()}if(!(!T||T.conflict)){if(T.ok){se(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}se(`\uCC98\uBD84 \uAC70\uBD80: ${T.reason||""}`,"error",3e3)}}async function ce(u){if(!r)return;let m=await r("worker-queue-toggle",{on:u,expected_revision:L()});z(m),m&&m.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:L()}).then(z)}async function w(u){await ce(u),await Re(u)}async function G(u){if(!r||!Number.isFinite(u))return;let m=Math.max(tn,Math.floor(u)),T=await r("worker-queue-set-slots",{slots:m,expected_revision:L()});z(T),T&&T.conflict&&await r("worker-queue-set-slots",{slots:m,expected_revision:L()}).then(z)}async function W(u){if(!r)return;let m=await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:L()});z(m),m&&m.conflict&&await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:L()}).then(z)}function ee(){let u=$e(),m=p?p.selectBoardColumn(Cu,"ready"):[],T=p?p.selectBoardColumn(Ru,"blocked"):[],X=p?p.selectBoardColumn(Iu,"in_progress"):[],he=new Map;for(let $ of X){let Y=Yu($);if(!Y)continue;let _e=he.get(Y);_e?_e.push($):he.set(Y,[$])}let Se=$=>{let Y=pn(he.get($)||[]);return Y?Y.title||Y.id:null},ye=u.bead_titles||{},ie=new Map;for(let[$,Y]of Object.entries(ye))typeof Y=="string"&&Y.length>0&&ie.set($,Y);for(let $ of[...m,...T])ie.set($.id,$.title||$.id);let Ie=u.bead_times||{},Ge=new Map;for(let[$,Y]of Object.entries(Ie))Y&&typeof Y=="object"&&Ge.set($,Y);for(let $ of[...m,...T])Ge.set($.id,{created_at:$.created_at,updated_at:$.updated_at});let Ae=$=>Ge.get($)||{},at=u.pr_wait||[],St=u.pr_observations||{},$t=u.pr_activity||{},et=u.cleanup_failed||{},At=Object.entries(et).map(([$,Y])=>({bead_id:$,step:Y&&Y.step?Y.step:"",reason:Y&&Y.reason?Y.reason:"",detail:Y&&typeof Y.detail=="string"?Y.detail:null,output_tail:Y&&typeof Y.output_tail=="string"&&Y.output_tail?Y.output_tail:void 0,log_path:Y&&typeof Y.log_path=="string"&&Y.log_path?Y.log_path:void 0,diagnosis:Y&&Y.diagnosis&&typeof Y.diagnosis=="object"&&typeof Y.diagnosis.verdict=="string"&&typeof Y.diagnosis.evidence=="string"?{verdict:Y.diagnosis.verdict,evidence:Y.diagnosis.evidence,fix_bead_id:typeof Y.diagnosis.fix_bead_id=="string"?Y.diagnosis.fix_bead_id:null,malformed:Y.diagnosis.malformed===!0}:null,diagnosis_pending:S.has($)||Lu(u.attempts,$)})),ve=u.queue||[],Ye=new Set([...ve.map($=>$.bead_id),...at.map($=>$.bead_id),...u.done.map($=>$.bead_id)]),It=new Set(T.map($=>$.id)),Vt=l?l.get()?.order||{}:{},le=new Set,h=[];for(let $ of[...m,...T])Ye.has($.id)||le.has($.id)||Gu($)||La($.labels)||(le.add($.id),h.push($));A=Wu(h,v,Vt);let j=u.admission||{},f=$=>{let Y=j[$];if(!Y)return"";if(Y.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let _e=typeof Y.reason=="string"?Y.reason:"",He=_e.indexOf(":");return He>0&&He<_e.length-1?`\u26D4 ${_e.slice(0,He)} (${_e.slice(He+1)})`:`\u26D4 ${_e}`},b=A.map($=>{let Y=Kr($),_e=Y.path.length>0,He=$.workflow?.route==="quick_fix"||$.metadata&&$.metadata.route==="quick_fix",Un=!He&&_e&&!Y.conflict,so=It.has($.id),mr=[];so&&mr.push(Vu($)),He?mr.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):Y.conflict?mr.push("spec_id_conflict"):_e||mr.push("spec \uC5C6\uC74C");let oo=f($.id);return oo&&mr.push(oo),{id:$.id,title:$.title||$.id,reason:mr.join(" \xB7 "),draggable:Un,lane:"candidate",created_at:$.created_at,updated_at:$.updated_at,workflow:$.workflow,is_quick_fix:He,status:$.status,blocked:so,has_spec:_e}}),Q=Pu(b,k),re=Q.visible,Z=u.revise_parked||{},g=($,Y)=>$.map(_e=>{let He=Y==="queue"?Z[_e.bead_id]:null;return{id:_e.bead_id,title:ie.get(_e.bead_id)||_e.bead_id,reason:Y==="done"?"":f(_e.bead_id),draggable:Y!=="done",done:Y==="done",lane:Y,badges:He?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!He,revise_action:!!He,revise_enabled:!!He&&!I.has(_e.bead_id),revise_title:He?He.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${He.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:Y==="done"?qt(u.attempts||{},_e.bead_id):null,done_at:Y==="done"&&typeof _e.added_at=="number"?_e.added_at:void 0,...Ae(_e.bead_id)}}),R=new Map;for(let $ of u.done)$&&typeof $.bead_id=="string"&&typeof $.added_at=="number"&&R.set($.bead_id,$.added_at);let x=u.attempts?Object.values(u.attempts):[],V=new Set;for(let $ of x)$&&typeof $.resumed_from=="string"&&$.resumed_from.length>0&&V.add($.resumed_from);let Pe=new Map;for(let $ of x)Pe.set($.bead_id,$.attempt_id);let nt=new Map;for(let $ of x)nt.set($.attempt_id,$);function mt($){let Y=new Set,_e=$;for(;_e&&!Y.has(_e.attempt_id);){if(_e.conflict_resolution===!0)return!0;Y.add(_e.attempt_id),_e=typeof _e.resumed_from=="string"&&_e.resumed_from.length>0&&nt.get(_e.resumed_from)||null}return!1}let Me=typeof u.declared_base=="string"?u.declared_base:null;function Kt($){let Y=null;for(let _e of x)!_e||_e.bead_id!==$||mt(_e)||(Y===null||(typeof _e.started_at=="number"?_e.started_at:0)>=(typeof Y.started_at=="number"?Y.started_at:0))&&(Y=_e);return Y&&typeof Y.target_base=="string"?Y.target_base:null}let nr=[],Nt=null;for(let $ of x){let Y=$.status==="paused"&&!V.has($.attempt_id);if($.status==="running"||Y)nr.push({bead_id:$.bead_id,attempt_id:$.attempt_id,title:ie.get($.bead_id)||$.bead_id,runner:$.runner||null,model:$.model||null,effort:$.effort||null,started_at:typeof $.started_at=="number"?$.started_at:null,resumed_from:$.resumed_from||null,paused:Y,conflict_resolution:mt($),base_exception:Ma(Me,$.target_base),can_pause:typeof $.session_id=="string"&&$.session_id.length>0,usage:qt(u.attempts||{},$.bead_id),current_child:Se($.bead_id),...Ae($.bead_id)});else if($.status==="failed"||$.status==="orphaned"){let _e=Pe.get($.bead_id)!==$.attempt_id,He=R.get($.bead_id),Un=typeof He=="number"&&He>0&&typeof $.finished_at=="number"&&He>=$.finished_at;!_e&&!Un&&typeof $.dismissed_at!="number"&&(Nt=$)}}let Gs=null;if(Nt){let $=typeof Nt.session_id=="string"&&Nt.session_id.length>0,Y=V.has(Nt.attempt_id),_e=Nt.cause_detail;Gs={repo:Nt.repo||"",reason:Nt.cause||Nt.status,cause_detail:_e&&typeof _e.reason=="string"?{reason:_e.reason,command:typeof _e.command=="string"?_e.command:null}:null,resume_attempt_id:Nt.attempt_id,resume_eligible:$&&!Y,resume_reason:$?Y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Qa=new Set(nr.map($=>$.bead_id)),qn=Array.isArray(u.merge_queue)?u.merge_queue:[],Ys=new Map;qn.forEach(($,Y)=>{$&&typeof $.bead_id=="string"&&Ys.set($.bead_id,Y+1)});let Vs=u.merge_queue_state||{active:null,failures:{}},Ja=Vs.failures||{},el=u.auto_merge_skips||{},Ks=$=>{let Y=el[$];if(!Y)return null;let _e=St[$],He=_e&&_e.pr?_e.pr.head_sha:null;return He&&He===Y.head_sha?Y.reason||"":null},nn=new Map;for(let $ of nr)$.conflict_resolution&&($.paused?nn.has($.bead_id)||nn.set($.bead_id,"paused"):nn.set($.bead_id,"running"));let Zs=nr.filter($=>!$.paused).length,Xs=(u.workspace_info||{}).slots,tl=typeof Xs=="number"?Xs:typeof u.slots=="number"?u.slots:tn,Qs=u.pr_wait_holds_slot===!0?tn:tl,rl=Zs>Qs,Js=br(O),nl=(Array.isArray(u.done)?u.done.slice():[]).filter($=>Js===void 0||typeof $.added_at!="number"||$.added_at>=Js).sort(($,Y)=>(Y.added_at||0)-($.added_at||0)),eo=g(nl,"done"),sn={};for(let $ of jt)sn[$]=0;let to=!1,ro=0,Bn=0,no=0;for(let $ of eo){let Y=$.usage;if(Y&&typeof Y=="object"){let _e=!1;for(let He of jt)Number.isFinite(Y[He])&&(sn[He]+=Y[He],to=!0,_e=!0);_e&&(Bn+=1,Number.isFinite(Y.total_cost_usd)&&(ro+=Y.total_cost_usd,no+=1))}}Bn>0&&no===Bn&&(sn.total_cost_usd=ro);let sl=to?Dt(sn):null;return{queue:u,idToTitle:ie,candidates:re,candidate_hidden:{blocked:Q.hidden_blocked,spec:Q.hidden_spec},running:nr,live_count:Zs,slots:Qs,over_cap:rl,failure:Gs,waiting:g(ve.filter($=>!Qa.has($.bead_id)),"queue"),pr_wait:at.map($=>ep($.bead_id,ie.get($.bead_id)||$.bead_id,St,et[$.bead_id]||null,qt(u.attempts||{},$.bead_id),$t[$.bead_id]||(P.has($.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),nn.get($.bead_id)||null,$.external===!0,{position:Ys.get($.bead_id)||0,active:Vs.active===$.bead_id,failure:Ja[$.bead_id]||null},$.wt_present!==!1,u.auto_merge===!0?Ks($.bead_id):null,Ma(Me,Kt($.bead_id)),u.completion_status&&typeof u.completion_status=="object"&&!Array.isArray(u.completion_status)&&u.completion_status[$.bead_id]||null)).map($=>({...$,...Ae($.id)})),merge_queue_length:qn.length,merge_queue_running:qn.length>0,auto_excluded:at.map($=>$.bead_id).filter($=>Ks($)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:Me,done:eo,token_total:sl,cleanup_failures:At}}function pe(u){let m=u.waiting.length>0?u.waiting[0].id:"\u2014",T=c`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,X=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,he=c`<button
      type="button"
      class="worker-auto-all${X?" is-active":""}"
      title=${X?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${X?"true":"false"}
    >
      ${X?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,Se=u.over_cap?c`<span
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
        >${q()} 완료 <b>${u.done.length}</b></span
      >`,ie=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Ie=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${tn}
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
      </button>`,Ge=la({failure:u.failure,cleanupFailures:u.cleanup_failures});return K?c`<div class="worker-ribbon">
          ${T}
          <div class="worker-kpi worker-kpi--ribbon">${Se}${ye}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${he}${Ie}</div>
          <div class="worker-kpi">${ie}</div>
        </div>
        ${Ge}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${T}${he}${Ie}</div>
        <div class="worker-kpi">
          ${Se}${ye}${ie}
          ${u.token_total?c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${q()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${q()} 완료 · 누적 ${u.token_total}</span
              >`:""}
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
      ${u.running.length>0?Ds(u.running,Date.now(),Ue):""}
      ${u.pr_wait.map(T=>Is(T))}
    </section>`}function Ne(u){let m=u.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Mu.map(T=>c`<button
              type="button"
              class="worker-filter__chip${k.spec===T.value?" is-active":""}"
              data-spec=${T.value}
              aria-pressed=${k.spec===T.value?"true":"false"}
            >
              ${T.label}
            </button>`)}
        ${m.spec>0?c`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function Ze(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${Nu.map(u=>c`<option value=${u.value} ?selected=${v===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function Xe(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${O}
      >
        ${Ft.map(u=>c`<option value=${u.value} ?selected=${O===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function lt(u){let m=(u.queue.pr_wait||[]).filter(X=>X&&X.external!==!0&&typeof X.bead_id=="string"),T=new Set(u.running.filter(X=>!X.paused).map(X=>X.bead_id));for(let X of m)T.add(X.bead_id);if(!(u.queue.pr_wait_holds_slot!==!0||u.queue.auto_advance!==!0||u.queue.auto_merge===!0||m.length===0||u.waiting.length===0||T.size<u.slots))return c`<div class="worker-stat worker-pr-wait-hint">
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
      </button>`;let T=new Set(u.auto_excluded),X=u.pr_wait.filter(he=>he.merge_action&&he.merge_enabled&&!T.has(he.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${X>0?` ${X}`:""}
    </button>`}function pt(u){let m=Bt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ze(),controls:Ne(u)});return K?c`<div class="worker-lanes worker-lanes--mobile">
        ${Te(u)}
        ${Bt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:lt(u),collapsible:!0,collapsed:J.queue,preview:Oa(u.waiting)})}
        ${m}
        ${Bt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${q()} \uC644\uB8CC \uC5C6\uC74C`,controls:Xe(),collapsible:!0,collapsed:J.done,preview:u.token_total||Oa(u.done)})}
      </div>`:c`<div class="worker-lanes">
      ${m}
      ${Bt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:lt(u)})}
      ${Bt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(T=>!T.paused),body:Ds(u.running,Date.now(),Ue)})}
      ${Bt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:st(u)})}
      ${Bt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${q()} ${u.done.length}`,items:u.done,empty:`${q()} \uC644\uB8CC \uC5C6\uC74C`,controls:Xe()})}
    </div>`}function ht(u){J={...J,[u]:!J[u]},Hu(J),De()}function De(){let u=ee();Oe(pe(u),de),Oe(pt(u),Ee)}function ot(){let u=document.querySelector(".app-header");if(!u)return;let m=()=>{let T=Math.round(u.getBoundingClientRect().height);H.style.setProperty("--worker-ribbon-top",`${T}px`)};if(m(),typeof ResizeObserver=="function"){let T=new ResizeObserver(m);T.observe(u),C.push(()=>T.disconnect())}else window.addEventListener("resize",m),C.push(()=>window.removeEventListener("resize",m))}function We(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(zu);K=!!u.matches;let m=T=>{let X=!!(T&&typeof T.matches=="boolean"?T.matches:u.matches);X!==K&&(K=X,De())};typeof u.addEventListener=="function"?(u.addEventListener("change",m),C.push(()=>u.removeEventListener("change",m))):typeof u.addListener=="function"&&(u.addListener(m),C.push(()=>u.removeListener(m)))}function ft(u){let m=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!m)return;let T=m.dataset.beadId||"",X=m.dataset.lane||"";y={bead_id:T,from_lane:X};try{u.dataTransfer?.setData("text/plain",T),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function ct(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;let T=m.dataset.lane||"";T!=="candidate"&&T!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function rt(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function it(u,m){let T=A.find(ye=>ye.id===u);if(!T)return;let X=A.filter(ye=>ye.id!==u),he=X.length;if(m){let ye=m.dataset.beadId;if(ye===u)return;let ie=X.findIndex(Ie=>Ie.id===ye);ie>=0&&(he=ie)}let Se=X.slice();Se.splice(he,0,T),_.applyReorder(u,Se,he)}function _t(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;u.preventDefault(),m.classList.remove("worker-pane--drag-over");let T=m.dataset.lane||"",X=y?.bead_id||u.dataTransfer?.getData("text/plain")||"",he=y?.from_lane||"";if(y=null,!X)return;let Se=u.target?.closest?.(".worker-mini, .worker-card"),ye=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),ie=ye.length;if(Se){let Ie=ye.indexOf(Se);Ie>=0&&(ie=Ie)}if(m.classList.contains("worker-pane--collapsed")&&(ie=me()),T==="candidate"){if(he==="candidate"){it(X,Se);return}he==="queue"&&ge(X);return}T==="queue"&&(he==="queue"?we(X,ie):oe(X,ie))}function Je(u){k=u,Ou(u),De()}function bt(u){v=u==="board"||u==="created"||u==="spec"?u:Fn,qu(v),De()}function Qe(u){O=zt(u)?u:Et,Uu(O),De()}function dt(u){let m=u.target?.closest?.(".worker-filter__blocked");if(m){Je({...k,show_blocked:m.checked});return}let T=u.target?.closest?.(".worker-done-range");if(T){Qe(T.value);return}let X=u.target?.closest?.(".worker-sort");if(X){bt(X.value||Fn);return}let he=u.target?.closest?.(".worker-pr-wait-hold");if(he){W(he.checked);return}let Se=u.target?.closest?.(".worker-slots__input");if(!Se)return;let ye=Number.parseInt(Se.value,10);if(!Number.isFinite(ye)){De();return}G(ye).then(De)}function ut(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function E(u){let m=$e(),T=m.attempts?m.attempts[u]:null;Ue=u,ke.hidden=!1,Ke.open({attempt_id:u,meta:ut(T)}),De()}function F(){if(!Ue)return;let u=$e(),m=u.attempts?u.attempts[Ue]:null;if(m){Ke.updateMeta(ut(m));return}Ke.close()}function te(u){let m=u.target;if(m?.closest?.("#worker-exec-defaults-dialog"))return;if(m?.closest?.(".worker-exec-defaults-btn")){je.open();return}let T=m?.closest?.(".worker-banner__resume");if(T){let ve=T.dataset.attemptId;ve&&Ce(ve);return}let X=m?.closest?.(".worker-banner__dismiss");if(X){let ve=X.dataset.attemptId;ve&&B(ve);return}let he=m?.closest?.(".worker-banner__cleanup-diagnose");if(he){let ve=he.dataset.beadId;ve&&D(ve);return}if(m?.closest?.(".worker-play")){ce(!$e().auto_advance);return}if(m?.closest?.(".worker-auto-all")){let ve=$e();w(!(ve.auto_advance===!0&&ve.auto_merge===!0));return}let Se=m?.closest?.(".worker-merge-all");if(Se){Se.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?Re(!1):U():Re(!0);return}let ye=m?.closest?.(".worker-pane__hd--toggle");if(ye){let ve=ye.dataset.lane;(ve==="queue"||ve==="done")&&ht(ve);return}let ie=m?.closest?.(".worker-card__place");if(ie){let ve=ie.dataset.beadId;ve&&!ie.disabled&&oe(ve,me());return}let Ie=m?.closest?.(".worker-filter__chip");if(Ie){let ve=Ie.dataset.spec;(ve==="all"||ve==="with"||ve==="without")&&Je({...k,spec:ve});return}let Ge=m?.closest?.(".worker-mini__merge");if(Ge){xe(Ge.dataset.beadId||"");return}let Ae=m?.closest?.(".worker-mini__merge-cancel");if(Ae){N(Ae.dataset.beadId||"");return}let at=m?.closest?.(".worker-mini__discard");if(at){M(at.dataset.beadId||"");return}let St=m?.closest?.(".worker-mini__revise-fix");if(St){ae("worker-revise-fix",St.dataset.beadId||"");return}let $t=m?.closest?.(".worker-mini__revise-approve");if($t){ae("worker-revise-approve",$t.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__stop")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&Be(Ye);return}if(m?.closest?.(".rtile__pause")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&be(Ye);return}if(m?.closest?.(".rtile__resume")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&Ce(Ye);return}if(m?.closest?.(".rtile__session")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&E(Ye);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Ke.close();return}if(m?.closest?.(".worker-drawer-host"))return;let et=m?.closest?.(".rtile");if(et){if(m?.closest?.(".rtile__id")){let Ye=et.dataset.beadId;Ye&&dr(Ye).then(It=>{It?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ve=et.dataset.beadId;ve&&a&&a(ve);return}let At=m?.closest?.(".worker-mini, .worker-card");if(At){let ve=At.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){ve&&dr(ve).then(Ye=>{Ye?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ve&&a&&a(ve)}}return e.addEventListener("dragstart",ft),e.addEventListener("dragover",ct),e.addEventListener("dragleave",rt),e.addEventListener("drop",_t),e.addEventListener("click",te),e.addEventListener("change",dt),We(),ot(),p&&C.push(p.subscribe(De)),s&&C.push(s.subscribe(()=>{De(),F()})),De(),{load(){De()},openExecDefaults(){je.open()},destroy(){for(let u of C.splice(0))try{u()}catch{}e.removeEventListener("dragstart",ft),e.removeEventListener("dragover",ct),e.removeEventListener("dragleave",rt),e.removeEventListener("drop",_t),e.removeEventListener("click",te),e.removeEventListener("change",dt);try{Ke.destroy()}catch{}ke.hidden=!0;try{je.destroy()}catch{}Oe(c``,e)}}}function js(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Ua(e,t,r,n=async()=>{},s=async()=>{}){let o=Ve("views:workspace-picker"),i=null,l=!1,a=!1,d=!1;async function p(S){let H=S.target.value,ke=t.getState().workspace?.current?.path||"";if(H&&H!==ke){o("switching workspace to %s",H),l=!0,I();try{await r(H)}catch(fe){o("workspace switch failed: %o",fe)}finally{l=!1,I()}}}async function _(){let S=t.getState(),C=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!C||a)){o("git-pulling workspace %s",C),a=!0,I();try{await n(C)}catch(H){o("workspace git pull failed: %o",H)}finally{a=!1,I()}}}function y(S){let C=S.target;C&&e.contains(C)||v()}function A(S){S.key==="Escape"&&v()}function k(){d||(d=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",A),I())}function v(){d&&(d=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",A),I())}function O(){d?v():k()}async function q(S){let C=S.target,H=C.value,de=C.checked;o("toggling visibility %s \u2192 %s",H,String(de));try{await s(H,de)}catch(ke){o("workspace visibility toggle failed: %o",ke)}}function J(S){return S?c`
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
    `:c``}function K(S,C){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${O}
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
                ${S.map(H=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${H.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${H.path}"
                        .checked=${!C.has(H.path)}
                        @change=${q}
                      />
                      <span class="workspace-picker__manage-name"
                        >${js(H.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let S=t.getState(),C=S.workspace?.current,H=S.workspace?.available||[],de=new Set(S.workspace?.hidden||[]),ke=C?.path||H[0]?.path||"";if(H.length===0)return c``;let fe=H.filter(ue=>!de.has(ue.path)||ue.path===ke);if(fe.length<=1){let ue=fe[0]||H[0],Ee=js(ue.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ue.path}"
            >${Ee}</span
          >
          ${K(H,de)}
          ${J(ke)}
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
                ?selected=${ue.path===ke}
                title="${ue.path}"
              >
                ${js(ue.path)}
              </option>
            `)}
        </select>
        ${K(H,de)}
        ${J(ke)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){Oe(P(),e)}return I(),i=t.subscribe(()=>I()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",A),Oe(c``,e)}}}var za=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Hs(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function ja(e,t,r=Hs()){return{id:r,type:e,payload:t}}function Ha(e={}){let t=Ve("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,d=new Map,p=[],_=new Map,y=new Set;function A(P){for(let I of Array.from(y))try{I(P)}catch{}}function k(){if(!a||l)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let P=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),I=(r.jitterRatio||0)*P,S=Math.max(0,Math.round(P+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",S,i+1),l=setTimeout(()=>{l=null,K()},S)}function v(P){try{s?.send(JSON.stringify(P))}catch(I){t("ws send failed",I)}}function O(){for(o="open",t("ws open"),A(o),i=0;p.length;){let P=p.shift();P&&v(P)}}function q(P){let I;try{I=JSON.parse(String(P.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(d.has(I.id)){let C=d.get(I.id);d.delete(I.id),I.ok?C?.resolve(I.payload):C?.reject(I.error||new Error("ws error"));return}let S=_.get(I.type);if(S&&S.size>0)for(let C of Array.from(S))try{C(I.payload)}catch(H){t("ws event handler error",H)}else t("ws received unhandled message type: %s",I.type)}function J(){o="closed",t("ws closed"),A(o);for(let[P,I]of d.entries())I.reject(new Error("ws disconnected")),d.delete(P);i+=1,k()}function K(){if(!a)return;let P=n();try{s=new WebSocket(P),t("ws connecting %s",P),o="connecting",A(o),s.addEventListener("open",O),s.addEventListener("message",q),s.addEventListener("error",()=>{}),s.addEventListener("close",J)}catch(I){t("ws connect failed %o",I),k()}}return K(),{send(P,I){if(!za.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let S=Hs(),C=ja(P,I,S);return t("send %s id=%s",P,S),new Promise((H,de)=>{d.set(S,{resolve:H,reject:de,type:P}),s&&s.readyState===s.OPEN?v(C):(t("queue %s id=%s (state=%s)",P,S,o),p.push(C))})},on(P,I){_.has(P)||_.set(P,new Set);let S=_.get(P);return S?.add(I),()=>{S?.delete(I)}},onConnection(P){return y.add(P),()=>{y.delete(P)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,K()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function tp(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function rp(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Ws=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Wa=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Ga=$a,Ya="worker:queue",Va="ui:order",Ka="ui:display-policy",Za="exec:presets",rr="tab:board:closed",Xa="beads-ui.board.closed-range";function np(e){let t=Ve("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Oe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),i=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),a=document.getElementById("detail-panel");if(s&&Ia(s),o&&i&&l&&a){let $e=function(f,b){let Q="Request failed",re="";if(f&&typeof f=="object"){let g=f;if(typeof g.message=="string"&&g.message.length>0&&(Q=g.message),typeof g.details=="string")re=g.details;else if(g.details&&typeof g.details=="object")try{re=JSON.stringify(g.details,null,2)}catch{re=""}}else typeof f=="string"&&f.length>0&&(Q=f);let Z=b&&b.length>0?`Failed to load ${b}`:"Request failed";je.open(Z,Q,re)},ce=function(f){return`${Ae.getState().workspace.current?.path||""}\0${f}`},w=function(){D&&(D().catch(()=>{}),D=null),ne=null,xe=null},W=function(f){Re=f;let b=()=>{Re!==f||Ae.getState().selected_id!==f||(Re=null,G(f))};if(!M){U.then(b);return}b()},Ne=function(f,b,Q,re,Z){return Q!==Te[b]?(Z().catch(()=>{}),!1):(f.set(re,Z),!0)},Ze=function(){let f=Ae.getState();st(f.view==="board"),We(f.view==="worker"),_t(f.view==="monitor"),ct(f.view==="board"||f.view==="worker"||!!f.selected_id)},lt=function(){let f=br(Xe);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},st=function(f){if(f)for(let[b,Q]of Ws){if(ee.has(b)||pe.has(b))continue;let re=b===rr?lt():{type:Q};try{oe.register(b,re)}catch(R){t("register %s store failed: %o",b,R)}pe.add(b);let Z=Te.board,g=!1;me.subscribeList(b,re).then(R=>{g=!Ne(ee,"board",Z,b,R)}).catch(R=>{t("subscribe %s failed: %o",b,R),$e(R,"board")}).finally(()=>{pe.delete(b),g&&Ze()})}else ht()},ht=function(){Te.board+=1;for(let[f]of Ws){let b=ee.get(f);b&&(b().catch(()=>{}),ee.delete(f));try{oe.unregister(f)}catch(Q){t("unregister %s failed: %o",f,Q)}}},We=function(f){if(!f){ft();return}for(let[b,Q]of Wa){if(De.has(b)||pe.has(b))continue;try{oe.register(b,{type:Q})}catch(g){t("register %s store failed: %o",b,g)}pe.add(b);let re=Te.worker,Z=!1;me.subscribeList(b,{type:Q}).then(g=>{Z=!Ne(De,"worker",re,b,g)}).catch(g=>{t("subscribe %s failed: %o",b,g),$e(g,"worker")}).finally(()=>{pe.delete(b),Z&&Ze()})}},ft=function(){Te.worker+=1;for(let[f]of Wa){let b=De.get(f);b&&(b().catch(()=>{}),De.delete(f));try{oe.unregister(f)}catch(Q){t("unregister %s failed: %o",f,Q)}}},ct=function(f){if(!f){rt();return}ot||(z("subscribe-worker-queue",{id:Ya}).catch(b=>{t("subscribe-worker-queue failed: %o",b)}),ot=()=>z("unsubscribe-worker-queue",{id:Ya}))},rt=function(){ot&&(ot().catch(()=>{}),ot=null)},_t=function(f){if(!f){Je();return}it||(z("subscribe-monitor-pipeline",{id:Ga}).catch(b=>{t("subscribe-monitor-pipeline failed: %o",b)}),it=()=>z("unsubscribe-monitor-pipeline",{id:Ga}))},Je=function(){it&&(it().catch(()=>{}),it=null)},Qe=function(){bt||(z("subscribe-ui-order",{id:Va}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),bt=()=>z("unsubscribe-ui-order",{id:Va}))},dt=function(){bt&&(bt().catch(()=>{}),bt=null),Be.clear()},E=function(){ut||(z("subscribe-display-policy",{id:Ka}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),ut=()=>z("unsubscribe-display-policy",{id:Ka}))},F=function(){ut&&(ut().catch(()=>{}),ut=null),be.clear()},u=function(){te||(z("subscribe-exec-presets",{id:Za}).catch(f=>{t("subscribe-exec-presets failed: %o",f)}),te=()=>z("unsubscribe-exec-presets",{id:Za}))},ye=function(f){if(!f)return"Unknown";let b=f.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var d=$e,p=ce,_=w,y=W,A=Ne,k=Ze,v=lt,O=st,q=ht,J=We,K=ft,P=ct,I=rt,S=_t,C=Je,H=Qe,de=dt,ke=E,fe=F,ue=u,Ee=ye;let Ue=document.getElementById("header-loading"),Ke=Uo(Ue),je=na(e),L=Ha(),z=Ke.wrapSend((f,b)=>L.send(f,b)),me=Oo(z),oe=Po(),we=No(),ge=vo(),Be=Mo(),be=ho(),Ce=bo(),B=yo();L.on("exec-presets-snapshot",f=>{let b=f;b&&typeof b.revision=="number"&&Array.isArray(b.presets)&&Ce.set({revision:b.revision,presets:b.presets})}),L.on("monitor-pipeline-snapshot",f=>{let b=f;if(!(!b||!Array.isArray(b.workspaces)))try{ge.set(b.workspaces,b.workspaces_state)}catch{}}),L.on("ui-order-snapshot",f=>{let b=f;if(b&&typeof b.revision=="number")try{Be.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),L.on("display-policy-snapshot",f=>{let b=f;if(b&&b.policy&&typeof b.policy=="object")try{be.set(b.policy)}catch{}}),L.on("session-log-snapshot",f=>{let b=f;if(b&&typeof b.attempt_id=="string")try{B.set(b.attempt_id,Array.isArray(b.lines)?b.lines:[],typeof b.last_event_at=="number"?b.last_event_at:null)}catch{}}),L.on("session-log-append",f=>{let b=f;if(b&&typeof b.attempt_id=="string")try{B.append(b.attempt_id,b.event)}catch{}}),L.on("snapshot",f=>{let b=f,Q=b&&typeof b.id=="string"?b.id:"",re=Q?oe.getStore(Q):null;if(re&&b&&b.type==="snapshot")try{re.applyPush(b)}catch{}}),L.on("upsert",f=>{let b=f,Q=b&&typeof b.id=="string"?b.id:"",re=Q?oe.getStore(Q):null;if(re&&b&&b.type==="upsert")try{re.applyPush(b)}catch{}}),L.on("delete",f=>{let b=f,Q=b&&typeof b.id=="string"?b.id:"",re=Q?oe.getStore(Q):null;if(re&&b&&b.type==="delete")try{re.applyPush(b)}catch{}});let D=null,ne=null,xe=null,Re=null,N=()=>{},U=new Promise(f=>{N=()=>f(void 0)}),M=!1,ae=!1;async function G(f){let b=ce(f);if(b===ne||b===xe)return;xe=b;let Q=`detail:${f}`,re={type:"issue-detail",params:{id:f}};try{oe.register(Q,re)}catch(Z){t("register detail store failed: %o",Z)}try{let Z=await me.subscribeList(Q,re);if(Ae.getState().selected_id!==f||ce(f)!==b){await Z().catch(()=>{});return}D&&await D().catch(()=>{}),D=Z,ne=b}catch(Z){t("detail subscribe failed: %o",Z),$e(Z,"issue details")}finally{xe===b&&(xe=null)}}let ee=new Map,pe=new Set,Te={board:0,worker:0},Xe=Et;try{let f=window.localStorage.getItem(Xa);zt(f)&&(Xe=f)}catch{}async function pt(f){if(!zt(f)||f===Xe)return;Xe=f;try{window.localStorage.setItem(Xa,f)}catch{}let b=ee.get(rr);if(!b)return;ee.delete(rr),await b().catch(()=>{});let Q=lt();try{oe.register(rr,Q)}catch(re){t("register %s store failed: %o",rr,re)}try{let re=await me.subscribeList(rr,Q);ee.set(rr,re)}catch(re){t("re-subscribe %s failed: %o",rr,re),$e(re,"board")}}let De=new Map,ot=null,it=null,bt=null,ut=null,te=null;async function m(){ut=null,be.clear(),te=null,Ce.clear(),ot=null,it=null,ee.clear(),De.clear(),Te.board+=1,Te.worker+=1,u();let f=Ae.getState().workspace.current?.path;if(f)try{await L.send("set-workspace",{path:f})}catch(Q){t("workspace restore after reconnect failed: %o",Q);return}E();let b=Ae.getState();st(b.view==="board"),We(b.view==="worker"),_t(b.view==="monitor"),ct(b.view==="board"||b.view==="worker"||!!b.selected_id)}async function T(){t("clearing all subscriptions for workspace switch"),ht(),ft(),rt(),we.clear(),dt(),Qe(),F(),E(),w();let f=Ae.getState();if(f.selected_id)try{oe.unregister(`detail:${f.selected_id}`)}catch{}let b=Ae.getState();st(b.view==="board"),We(b.view==="worker"),_t(b.view==="monitor"),ct(b.view==="board"||b.view==="worker"||!!b.selected_id),b.selected_id&&W(b.selected_id)}async function X(f){t("requesting workspace switch to %s",f),ae=!0;try{let b=await L.send("set-workspace",{path:f});t("workspace switch result: %o",b),b&&b.workspace&&(Ae.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),b.changed&&(await T(),se("Switched to "+ye(f),"success",2e3)))}catch(b){throw t("workspace switch failed: %o",b),se("Failed to switch workspace","error",3e3),b}finally{ae=!1}}async function he(f){t("requesting workspace git pull for %s",f);try{let b=await L.send("git-pull-workspace",{});t("workspace git pull result: %o",b);let Q=b?.status;if(Q==="up_to_date"){se("Already up to date","success",2e3);return}if(Q==="stash_pop_conflict"){se("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}se("Git pulled "+ye(f),"success",2e3)}catch(b){t("workspace git pull failed: %o",b);let Q=b?.code,re=b?.message;if(Q==="rebase_conflict"){se("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Q==="rebase_conflict_abort_failed"){se("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Q==="busy"){se("Git pull skipped: another operation is running","warning",3e3);return}let Z=re?`: ${re}`:"";throw se(`Git pull failed${Z}`,"error",3e3),b}}async function Se(f,b){t("setting workspace visibility %s \u2192 %s",f,String(b));try{await L.send("set-workspace-visibility",{path:f,visible:b}),await ie()}catch(Q){t("workspace visibility update failed: %o",Q),se("Failed to update project visibility","error",3e3)}}async function ie(){try{let f=await L.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let b=f.workspaces.map(g=>({path:g.path,database:g.database,pid:g.pid,version:g.version})),Q=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,re=Array.isArray(f.hidden)?f.hidden.filter(g=>typeof g=="string"):[];Ae.setState({workspace:{current:Q,available:b,hidden:re}});let Z=window.localStorage.getItem("beads-ui.workspace");Z&&(!b.some(R=>R.path===Z)||re.includes(Z)?window.localStorage.removeItem("beads-ui.workspace"):Q&&Z!==Q.path&&(t("restoring saved workspace preference: %s",Z),await X(Z)))}}catch(f){t("failed to load workspaces: %o",f)}}L.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(Ae.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),ie(),T())});let Ie=!1;if(typeof L.onConnection=="function"){let f=b=>{t("ws state %s",b),b==="reconnecting"||b==="closed"?(Ie=!0,se("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&Ie&&(Ie=!1,se("Reconnected","success",2200),rp(Ae,(Q,re)=>{t(`${Q}: %o`,re)}),m())};L.onConnection(f)}let Ge="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(Ge=f)}catch(f){t("view parse error: %o",f)}let Ae=Bo({config:tp(),view:Ge});L.on("worker-queue-snapshot",f=>{let b=f;if(!b||!b.queue)return;let Q=Ae.getState().workspace.current?.path;if(typeof Q=="string"&&Q.length>0&&b.root_dir!==Q){t("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{we.set(b.queue)}catch{}});let at=Fo(Ae);at.start();let St=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),$t=async(f,b)=>{try{return await z(f,b)}catch(Q){if(St.has(f))throw Q;return[]}};n&&Sa(n,Ae,at);let et=document.getElementById("workspace-picker");et&&Ua(et,Ae,X,he,Se);let At=Ca(e,(f,b)=>z(f,b));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>At.open())}catch{}let ve=ra(e,{policyStore:be,transport:(f,b)=>z(f,b),labelOptions:()=>{let f=new Set;for(let[b]of Ws)for(let Q of oe.snapshotFor(b)||[]){let re=Q.labels;if(Array.isArray(re))for(let Z of re)typeof Z=="string"&&Z.length>0&&f.add(Z)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>ve.open())}catch{}let Ye=Zo(o,{gotoIssue:f=>at.gotoIssue(f),issueStores:oe,transport:$t,workerQueueStore:we,uiOrderStore:Be,displayPolicyStore:be,closedRange:Xe,onClosedRangeChange:f=>{pt(f)},onNewIssue:()=>At.open()}),It=zs(i,{transport:$t,issueStores:oe,queueStore:we,execPresetStore:Ce,sessionLogStore:B,uiOrderStore:Be,gotoIssue:f=>Ae.setState({selected_id:f}),getWorkspacePath:()=>Ae.getState().workspace.current?.path}),Vt=xa(l,{transport:$t,pipelineStore:ge,execPresetStore:Ce,gotoIssue:f=>at.gotoIssue(f),getWorkspacePath:()=>Ae.getState().workspace.current?.path,switchWorkspace:f=>X(f)}),le=ea(a,{issueStores:oe,transport:$t,queueStore:we,execPresetStore:Ce,sessionLogStore:B,getWorkspacePath:()=>Ae.getState().workspace.current?.path,onNavigate:f=>{Ae.getState().view==="worker"?Ae.setState({selected_id:f}):at.gotoIssue(f)},onClose:()=>{let f=Ae.getState();Ae.setState({selected_id:null});try{at.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{Ae.setState({selected_id:null}),at.gotoView("worker"),It.openExecDefaults()}}),h=Ae.getState().selected_id;h&&(a.hidden=!1,le.load(h),W(h)),Ae.subscribe(f=>{let b=f.selected_id;b?(a.hidden=!1,le.load(b),ae||W(b)):(le.clear(),a.hidden=!0,w())});let j=f=>{o.hidden=f.view!=="board",i.hidden=f.view!=="worker",l.hidden=f.view!=="monitor",st(f.view==="board"),We(f.view==="worker"),_t(f.view==="monitor"),ct(f.view==="board"||f.view==="worker"||!!f.selected_id),!f.selected_id&&f.view==="board"&&Ye.load(),f.view==="worker"&&It.load(),f.view==="monitor"?Vt.load():Vt.pause(),window.localStorage.setItem("beads-ui.view",f.view)};Ae.subscribe(j),j(Ae.getState()),Qe(),E(),u(),ie().finally(()=>{M=!0,N()}),window.addEventListener("keydown",f=>{let b=f.ctrlKey||f.metaKey,Q=String(f.key||"").toLowerCase(),re=f.target,Z=re&&re.tagName?String(re.tagName).toLowerCase():"",g=Z==="input"||Z==="textarea"||Z==="select"||re&&typeof re.isContentEditable=="boolean"&&re.isContentEditable;b&&Q==="n"&&(g||(f.preventDefault(),At.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&np(t)});export{np as bootstrap,tp as readBootstrapConfig,rp as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
