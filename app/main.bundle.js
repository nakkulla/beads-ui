var rl=Object.create;var Bn=Object.defineProperty;var nl=Object.getOwnPropertyDescriptor;var sl=Object.getOwnPropertyNames;var ol=Object.getPrototypeOf,il=Object.prototype.hasOwnProperty;var al=(e,t,r)=>t in e?Bn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Un=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ll=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of sl(t))!il.call(e,s)&&s!==r&&Bn(e,s,{get:()=>t[s],enumerable:!(n=nl(t,s))||n.enumerable});return e};var cl=(e,t,r)=>(r=e!=null?rl(ol(e)):{},ll(t||!e||!e.__esModule?Bn(r,"default",{value:e,enumerable:!0}):r,e));var Ge=(e,t,r)=>al(e,typeof t!="symbol"?t+"":t,r);var vo=Un((op,bo)=>{var hr=1e3,br=hr*60,vr=br*60,or=vr*24,_l=or*7,ml=or*365.25;bo.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return gl(e);if(r==="number"&&isFinite(e))return t.long?bl(e):hl(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function gl(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*ml;case"weeks":case"week":case"w":return r*_l;case"days":case"day":case"d":return r*or;case"hours":case"hour":case"hrs":case"hr":case"h":return r*vr;case"minutes":case"minute":case"mins":case"min":case"m":return r*br;case"seconds":case"second":case"secs":case"sec":case"s":return r*hr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function hl(e){var t=Math.abs(e);return t>=or?Math.round(e/or)+"d":t>=vr?Math.round(e/vr)+"h":t>=br?Math.round(e/br)+"m":t>=hr?Math.round(e/hr)+"s":e+"ms"}function bl(e){var t=Math.abs(e);return t>=or?on(e,t,or,"day"):t>=vr?on(e,t,vr,"hour"):t>=br?on(e,t,br,"minute"):t>=hr?on(e,t,hr,"second"):e+" ms"}function on(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var wo=Un((ip,yo)=>{function vl(e){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=vo(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let _=0;for(let y=0;y<p.length;y++)_=(_<<5)-_+p.charCodeAt(y),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(p){let _,y=null,A,k;function b(...T){if(!b.enabled)return;let Y=b,V=Number(new Date),ee=V-(_||V);Y.diff=ee,Y.prev=_,Y.curr=V,_=V,T[0]=r.coerce(T[0]),typeof T[0]!="string"&&T.unshift("%O");let U=0;T[0]=T[0].replace(/%([a-zA-Z%])/g,(S,I)=>{if(S==="%%")return"%";U++;let j=r.formatters[I];if(typeof j=="function"){let ce=T[U];S=j.call(Y,ce),T.splice(U,1),U--}return S}),r.formatArgs.call(Y,T),(Y.log||r.log).apply(Y,T)}return b.namespace=p,b.useColors=r.useColors(),b.color=r.selectColor(p),b.extend=n,b.destroy=r.destroy,Object.defineProperty(b,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(A!==r.namespaces&&(A=r.namespaces,k=r.enabled(p)),k),set:T=>{y=T}}),typeof r.init=="function"&&r.init(b),b}function n(p,_){let y=r(this.namespace+(typeof _>"u"?":":_)+p);return y.log=this.log,y}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let _=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of _)y[0]==="-"?r.skips.push(y.slice(1)):r.names.push(y)}function o(p,_){let y=0,A=0,k=-1,b=0;for(;y<p.length;)if(A<_.length&&(_[A]===p[y]||_[A]==="*"))_[A]==="*"?(k=A,b=y,A++):(y++,A++);else if(k!==-1)A=k+1,b++,y=b;else return!1;for(;A<_.length&&_[A]==="*";)A++;return A===_.length}function i(){let p=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),p}function l(p){for(let _ of r.skips)if(o(p,_))return!1;for(let _ of r.names)if(o(p,_))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}yo.exports=vl});var ko=Un(($t,an)=>{$t.formatArgs=wl;$t.save=kl;$t.load=$l;$t.useColors=yl;$t.storage=xl();$t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();$t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function yl(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function wl(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+an.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}$t.log=console.debug||console.log||(()=>{});function kl(e){try{e?$t.storage.setItem("debug",e):$t.storage.removeItem("debug")}catch{}}function $l(){let e;try{e=$t.storage.getItem("debug")||$t.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function xl(){try{return localStorage}catch{}}an.exports=wo()($t);var{formatters:Sl}=an.exports;Sl.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Cr=globalThis,sn=Cr.trustedTypes,no=sn?sn.createPolicy("lit-html",{createHTML:e=>e}):void 0,co="$lit$",Kt=`lit$${Math.random().toFixed(9).slice(2)}$`,uo="?"+Kt,dl=`<${uo}>`,nr=document,Rr=()=>nr.createComment(""),Ir=e=>e===null||typeof e!="object"&&typeof e!="function",Vn=Array.isArray,ul=e=>Vn(e)||typeof e?.[Symbol.iterator]=="function",zn=`[ 	
\f\r]`,Er=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,so=/-->/g,oo=/>/g,tr=RegExp(`>|${zn}(?:([^\\s"'>=/]+)(${zn}*=${zn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),io=/'/g,ao=/"/g,po=/^(?:script|style|textarea|title)$/i,Kn=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=Kn(1),Bt=Kn(2),Qu=Kn(3),sr=Symbol.for("lit-noChange"),ot=Symbol.for("lit-nothing"),lo=new WeakMap,rr=nr.createTreeWalker(nr,129);function fo(e,t){if(!Vn(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return no!==void 0?no.createHTML(t):t}var pl=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=Er;for(let l=0;l<r;l++){let a=e[l],d,p,_=-1,y=0;for(;y<a.length&&(i.lastIndex=y,p=i.exec(a),p!==null);)y=i.lastIndex,i===Er?p[1]==="!--"?i=so:p[1]!==void 0?i=oo:p[2]!==void 0?(po.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=tr):p[3]!==void 0&&(i=tr):i===tr?p[0]===">"?(i=s??Er,_=-1):p[1]===void 0?_=-2:(_=i.lastIndex-p[2].length,d=p[1],i=p[3]===void 0?tr:p[3]==='"'?ao:io):i===ao||i===io?i=tr:i===so||i===oo?i=Er:(i=tr,s=void 0);let A=i===tr&&e[l+1].startsWith("/>")?" ":"";o+=i===Er?a+dl:_>=0?(n.push(d),a.slice(0,_)+co+a.slice(_)+Kt+A):a+Kt+(_===-2?l:A)}return[fo(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Lr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=t.length-1,a=this.parts,[d,p]=pl(t,r);if(this.el=e.createElement(d,n),rr.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=rr.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(co)){let y=p[i++],A=s.getAttribute(_).split(Kt),k=/([.?@])?(.*)/.exec(y);a.push({type:1,index:o,name:k[2],strings:A,ctor:k[1]==="."?jn:k[1]==="?"?Wn:k[1]==="@"?Gn:mr}),s.removeAttribute(_)}else _.startsWith(Kt)&&(a.push({type:6,index:o}),s.removeAttribute(_));if(po.test(s.tagName)){let _=s.textContent.split(Kt),y=_.length-1;if(y>0){s.textContent=sn?sn.emptyScript:"";for(let A=0;A<y;A++)s.append(_[A],Rr()),rr.nextNode(),a.push({type:2,index:++o});s.append(_[y],Rr())}}}else if(s.nodeType===8)if(s.data===uo)a.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Kt,_+1))!==-1;)a.push({type:7,index:o}),_+=Kt.length-1}o++}}static createElement(t,r){let n=nr.createElement("template");return n.innerHTML=t,n}};function _r(e,t,r=e,n){if(t===sr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Ir(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=_r(e,s._$AS(e,t.values),s,n)),t}var Hn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??nr).importNode(r,!0);rr.currentNode=s;let o=rr.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new Dr(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new Yn(o,this,t)),this._$AV.push(d),a=n[++l]}i!==a?.index&&(o=rr.nextNode(),i++)}return rr.currentNode=nr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Dr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ot,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=_r(this,t,r),Ir(t)?t===ot||t==null||t===""?(this._$AH!==ot&&this._$AR(),this._$AH=ot):t!==this._$AH&&t!==sr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ul(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ot&&Ir(this._$AH)?this._$AA.nextSibling.data=t:this.T(nr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Lr.createElement(fo(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Hn(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(t){let r=lo.get(t.strings);return r===void 0&&lo.set(t.strings,r=new Lr(t)),r}k(t){Vn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Rr()),this.O(Rr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},mr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ot,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ot}_$AI(t,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)t=_r(this,t,r,0),i=!Ir(t)||t!==this._$AH&&t!==sr,i&&(this._$AH=t);else{let l=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=_r(this,l[n+a],r,a),d===sr&&(d=this._$AH[a]),i||(i=!Ir(d)||d!==this._$AH[a]),d===ot?t=ot:t!==ot&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}i&&!s&&this.j(t)}j(t){t===ot?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},jn=class extends mr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ot?void 0:t}},Wn=class extends mr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ot)}},Gn=class extends mr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=_r(this,t,r,0)??ot)===sr)return;let n=this._$AH,s=t===ot&&n!==ot||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ot&&(n===ot||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Yn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){_r(this,t)}};var fl=Cr.litHtmlPolyfillSupport;fl?.(Lr,Dr),(Cr.litHtmlVersions??(Cr.litHtmlVersions=[])).push("3.3.1");var De=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Dr(t.insertBefore(Rr(),o),o,void 0,r??{})}return s._$AI(e),s};var Tt="today",Pt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ut(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function gr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function _o(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function mo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function go(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ho(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var $o=cl(ko(),1);function rt(e){return(0,$o.default)(`beads-ui:${e}`)}function Rt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ir(e,t){let r=Rt(e.created_at),n=Rt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Ao(e,t){let r=Rt(e.created_at),n=Rt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function To(e,t){let r=Rt(e.updated_at),n=Rt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Eo(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Rt(e.created_at),o=Rt(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Co(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Al=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function xo(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function So(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Al.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ro(e,t){let r=xo(e),n=xo(t);if(r!==n)return r<n?-1:1;let s=So(e),o=So(t);if(s!==o)return s<o?-1:1;let i=Rt(e&&e.created_at),l=Rt(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,d=t&&t.id;return a===d?0:String(a)<String(d)?-1:1}var Zn=2**20;function yr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Rt(e&&e.created_at)}function ln(e){return(t,r)=>{let n=yr(t,e),s=yr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Xn(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:yr(l,r)-Zn};if(!l)return{rank:yr(i,r)+Zn};let a=yr(i,r),d=yr(l,r),p=(a+d)/2;return a<p&&p<d?{rank:p}:{renormalize:n.map((_,y)=>({bead_id:_.id,rank:y*Zn}))}}function Qn(e,t={}){let r=rt(`issue-store:${e}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=t.sort||ir;function d(){for(let y of Array.from(i))try{y()}catch{}}function p(){s=Array.from(n.values()).sort(a)}function _(y){if(l||!y||y.id!==e)return;let A=Number(y.revision)||0;if(r("apply %s rev=%d",y.type,A),!(A<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(A<=o)return;n.clear();let k=Array.isArray(y.issues)?y.issues:[];for(let b of k)b&&typeof b.id=="string"&&b.id.length>0&&n.set(b.id,b);p(),o=A,d();return}if(y.type==="upsert"){let k=y.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let b=n.get(k.id);if(!b)n.set(k.id,k);else{let T=Number.isFinite(b.updated_at)?b.updated_at:0,Y=Number.isFinite(k.updated_at)?k.updated_at:0;if(T<=Y){for(let V of Object.keys(b))V in k||delete b[V];for(let[V,ee]of Object.entries(k))b[V]=ee}}p()}o=A,d()}else if(y.type==="delete"){let k=String(y.issue_id||"");k&&(n.delete(k),p()),o=A,d()}}}return{id:e,subscribe(y){return i.add(y),()=>{i.delete(y)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(y){return n.get(y)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function cn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Io(e){let t=rt("subs"),r=new Map,n=new Map;function s(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let p=Array.isArray(a.added)?a.added:[],_=Array.isArray(a.updated)?a.updated:[],y=Array.isArray(a.removed)?a.removed:[];for(let A of Array.from(d)){let k=r.get(A);if(!k)continue;let b=k.itemsById;for(let T of p)typeof T=="string"&&T.length>0&&b.set(T,!0);for(let T of _)typeof T=="string"&&T.length>0&&b.set(T,!0);for(let T of y)typeof T=="string"&&T.length>0&&b.delete(T)}}async function o(l,a){let d=cn(a);if(t("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let _=r.get(l);if(_&&_.key!==d){let y=n.get(_.key);y&&(y.delete(l),y.size===0&&n.delete(_.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(_){let y=r.get(l)||null;if(y){let A=n.get(y.key);A&&(A.delete(l),A.size===0&&n.delete(y.key))}throw r.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let _=r.get(l)||null;if(_){let y=n.get(_.key);y&&(y.delete(l),y.size===0&&n.delete(_.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:cn,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=r.get(l);return d?d.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),d={};if(!a)return d;for(let p of a.itemsById.keys())d[p]=!0;return d}}}}function Lo(){let e=rt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,d,p){let _=d?cn(d):"",y=r.get(a)||"",A=t.has(a);if(e("register %s key=%s (prev=%s)",a,_,y),A&&y&&_&&y!==_){let k=t.get(a);if(k)try{k.dispose()}catch{}let b=s.get(a);if(b){try{b()}catch{}s.delete(a)}let T=Qn(a,p);t.set(a,T);let Y=T.subscribe(()=>o());s.set(a,Y)}else if(!A){let k=Qn(a,p);t.set(a,k);let b=k.subscribe(()=>o());s.set(a,b)}return r.set(a,_),()=>l(a)}function l(a){e("unregister %s",a),r.delete(a);let d=t.get(a);d&&(d.dispose(),t.delete(a));let p=s.get(a);if(p){try{p()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let d=t.get(a);return d?d.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function Do(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Oo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Jn(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Tl(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function El(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Mo(e){let t=rt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Tl(n),i=El(n);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=Jn(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Jn(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Cl=Object.freeze({workspace_config:{default_workspace:null}});function Po(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Cl.workspace_config.default_workspace}}}function No(e={}){let t=rt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Po(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Po(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!l&&!a||(r=i,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Fo(e){let t=rt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function i(){r+=1,t("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function a(d){return async(_,y)=>{let A=s++,k=Date.now();n.set(A,{type:_,start_ts:k}),t("request start id=%d type=%s count=%d",A,_,r+1),i();let b=!1,T=()=>{b||(b=!0,n.delete(A),l())},Y=setTimeout(()=>{b||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,_,Date.now()-k),T())},3e4);try{let V=await d(_,y),ee=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",A,_,ee),V}catch(V){let ee=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,_,ee,V),V}finally{clearTimeout(Y),T()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,_])=>({id:p,type:_.type,elapsed_ms:d-_.start_ts}))}}}function re(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function dn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Co),a;switch(l){case"created_desc":return a.sort(ir),a;case"created_asc":return a.sort(Ao),a;case"updated_desc":return a.sort(To),a;case"priority":return a.sort(Eo),a;case"manual":default:{let d=r();return d?a.sort(ln(d)):a.sort(ir),a}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Or(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function gt(e){let t=Or(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function St(e,t){let r=Or(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function un(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Or(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function pn(e){let t=e.transport,r=e.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let d of l)a[d.bead_id]=d.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(Xn(l,a,d.order),i);s(d,p);let _=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(_&&_.conflict){let y={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(y);let A=n(Xn(l,a,y.order),i);s(y,A);let k=await t("ui-order-set",{expected_revision:y.revision,entries:A});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function fn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function es(e,t){return!t||typeof e!="string"||e.length===0||fn(t.visible_labels).includes(e)?!0:fn(t.hidden_labels).includes(e)?!1:!fn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function _n(e,t){return fn(e).filter(r=>es(r,t))}function ar(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Rl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Bo={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},qo={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Il={review:"\u2713",skip:"\u2298"},Zt={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Ll(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Uo(e){let t=e&&e.fill||"none";return t==="none"?Zt.none:e&&e.stale===!0?Zt.stale:t==="dim"?Zt.dim:e&&e.glyph==="review"?Zt.review:e&&e.glyph==="skip"?Zt.skip:Zt.done}function Dl(e){if(!e||e.fill==="none"||!e.approval_state)return Uo(e);let t=[];return e.glyph==="review"?t.push(Zt.review):e.glyph==="skip"&&t.push(Zt.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Ol(e,t,r){let n=Rl[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,i=Il[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let a=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${l} style=${d}>${i}</div>
      <div class=${a}>
        ${Bo[e]||e}
      </div>
    </div>
  `}function mn(e,t){if(!e||!e.stages)return"";let r=qo[e.route]||qo.spec_backed,n=e.stages,s=Ll(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(i=>`${Bo[i]||i} ${i==="plan"?Dl(n[i]||{}):Uo(n[i]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(i=>Ol(i,n[i]||{},i===s))}
    </div>
  `}function Ml(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var zo=2;function Pl(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,zo).join(", "),s=r.length-zo,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Nl(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&ar(r,"route")){let o=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${o?"unset":n.route}</span
      >`)}if(n.fast_track&&ar(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&ar(r,"pr")){let o=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of _n(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${o}</span>`);return e.from_id&&ar(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(o,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),ar(r,"blocked")&&s.push(...Pl(e.blocked_info)),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Fl(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ql(e){let t=St(e.created_at),r=St(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
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
  </span>`}function Bl(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ro):r.children;return c`
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
        ${ql(e)}
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
                  <span class=${Fl(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function gn(e,t){let r=Ml(e.priority);return c`
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
      ${Nl(e,t)}
      ${e.workflow&&ar(t.policy||null,"stepper")?mn(e.workflow,e.status):""}
      ${Bl(e,t)}
    </article>
  `}function wr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
              ${Pt.map(o=>c`<option
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
        ${e.items.map(o=>gn(o,t))}
      </div>
    </section>
  `}function Ho(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>gn(n,t))}
        </div>
      </div>
    </dialog>
  `}var Ul=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],zl=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Hl=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function jl(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function jo(e,t,r){return c`
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
        ${Ul.map(n=>c`<option
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
        ${zl.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${jl(e,t,r)}
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
        ${Hl.map(n=>c`<option
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
  `}var Wl=200,Gl={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Yl=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Wo="beads-ui.board.sort",Go=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Vl(){try{let e=window.localStorage.getItem(Wo);if(e&&Go.has(e))return e}catch{}return"created_desc"}function Yo(e,t){let r=rt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.onClosedRangeChange,d=t.onNewIssue,p=t.closedRange||Tt,_=s?dn(s,i):null,y=pn({transport:o,uiOrderStore:i}),A=[],k=[],b=[],T=[],Y=[],V=[],ee=!1,U=0,E=Vl(),S=new Map,I=new Map,j=new Map,ce=new Set,he={search:"",priority:"",type:"",labels:[]},pe=!1,Ae=null;function Re(D){return String(D.status||"open")==="open"}function Je(D){let F=String(D.status||"open");return F==="open"||F==="blocked"}function Xe(D){let F=he.search.trim().toLowerCase(),de=he.priority,fe=he.type,_e=he.labels;return D.filter(ve=>{if(F){let Ne=String(ve.id||"").toLowerCase(),We=String(ve.title||"").toLowerCase();if(!Ne.includes(F)&&!We.includes(F))return!1}if(de!==""&&String(ve.priority)!==de||fe!==""&&String(ve.issue_type||"")!==fe)return!1;if(_e.length>0){let Ne=Array.isArray(ve.labels)?ve.labels:[];if(!_e.some(We=>Ne.includes(We)))return!1}return!0})}function Me(){let D=new Set;for(let F of[A,k,b,T,Y,V])for(let de of F){let fe=Array.isArray(de.labels)?de.labels:[];for(let _e of fe)typeof _e=="string"&&_e.length>0&&D.add(_e)}return Array.from(D).sort()}function me(){return he.search.trim()!==""||he.priority!==""||he.type!==""||he.labels.length>0}function L(){try{if(_){let D=_.selectBoardColumn("tab:board:in-progress","in_progress",E),F=_.selectBoardColumn("tab:board:blocked","blocked",E).filter(Je),de=new Set(D.map(g=>g.id)),fe=_.selectBoardColumn("tab:board:ready","ready",E).filter(g=>Re(g)&&!de.has(g.id)),_e=_.selectBoardColumn("tab:board:resolved","resolved",E),ve=_.selectBoardColumn("tab:board:deferred","deferred",E),Ne=_.selectBoardColumn("tab:board:closed","closed").slice(0,Wl),We=[...F,...fe,...D,..._e,...Ne];X(We);let Fe=new Set;for(let g of We)g&&g.id&&!ts(g)&&Fe.add(g.id);let u=!me();A=u?Mr(F,Fe):F,k=u?Mr(fe,Fe):fe,b=u?Mr(D,Fe):D,T=u?Mr(_e,Fe):_e,Y=ve,U=ve.length,V=u?Mr(Ne,Fe):Ne,S=new Map;for(let g of A)S.set(g.id,"open");for(let g of k)S.set(g.id,"open");for(let g of b)S.set(g.id,"in_progress");for(let g of T)S.set(g.id,"resolved");for(let g of Y)S.set(g.id,"deferred");for(let g of V)S.set(g.id,"closed");I=new Map;for(let g of A)I.set(g.id,"blocked-col");for(let g of k)I.set(g.id,"ready-col");for(let g of b)I.set(g.id,"in-progress-col");for(let g of T)I.set(g.id,"resolved-col");for(let g of V)I.set(g.id,"closed-col")}Ye()}catch{A=[],k=[],b=[],T=[],Y=[],V=[],j=new Map,Ye()}}function X(D){let F=new Map;for(let fe of D)fe&&fe.id&&!F.has(fe.id)&&F.set(fe.id,fe);let de=new Map;for(let fe of F.values()){let _e=ts(fe);if(!_e)continue;let ve=de.get(_e);ve||(ve=[],de.set(_e,ve)),ve.push({id:fe.id,title:fe.title,status:fe.status,metadata:fe.metadata,created_at:fe.created_at,updated_at:fe.updated_at})}j=de}function ye(D){let F=j.get(D)||[],de=0;for(let _e of F)(_e.status==="resolved"||_e.status==="closed")&&(de+=1);let fe=un(F);return{total:F.length,count:de,current:fe,children:F}}function ne(D){return!ce.has(D)}function ke(D,F){D.preventDefault(),D.stopPropagation(),ce.has(F)?ce.delete(F):ce.add(F),Ye()}function ge(D,F){D.preventDefault(),D.stopPropagation(),n(F)}function He(D,F){D.preventDefault(),D.stopPropagation(),n(F)}function be(D,F){Ae||n(F)}function Ce(D,F){D.preventDefault(),D.stopPropagation(),Kl(F).then(de=>{de&&re("\uBCF5\uC0AC\uB428","success",1200)})}function P(D,F){Ae=F,D.dataTransfer&&(D.dataTransfer.setData("text/plain",F),D.dataTransfer.effectAllowed="move"),D.target.classList.add("board-card--dragging")}function O(D){D.target.classList.remove("board-card--dragging"),pt(),setTimeout(()=>{Ae=null},0)}function te(D){let F=String(D.target.value||"");!F||F===p||(p=F,a&&a(F),Ye())}function $e(){return l?l.get():null}let xe={onCardClick:be,onCopyId:Ce,onDragStart:P,onDragEnd:O,onClosedRangeChange:te,rollupFor:ye,isExpanded:ne,onRollupToggle:ke,onChildClick:ge,onFromChipClick:He,get policy(){return $e()}};function N(D,F){Ae||(ie(),n(F))}function q(D,F){D.preventDefault(),D.stopPropagation(),ie(),n(F)}let M={...xe,onCardClick:N,onChildClick:q,onFromChipClick:q,get policy(){return $e()}};function se(D){let F=D.target,de=e.querySelector(".board-filter__labels");F&&de&&de.contains(F)||H()}function le(D){D.key==="Escape"&&H()}function w(){pe||(pe=!0,document.addEventListener("mousedown",se),document.addEventListener("keydown",le),Ye())}function H(){pe&&(pe=!1,document.removeEventListener("mousedown",se),document.removeEventListener("keydown",le),Ye())}function z(D){D.key==="Escape"&&ie()}function Q(){ee||(ee=!0,document.addEventListener("keydown",z),Ye())}function ie(){ee&&(ee=!1,document.removeEventListener("keydown",z),Ye())}let Te={onClose:ie,onOverlayClick(D){D.target===D.currentTarget&&ie()}},Pe={onSearchInput(D){he.search=String(D.target.value||""),L()},onPriorityChange(D){he.priority=String(D.target.value||""),L()},onTypeChange(D){he.type=String(D.target.value||""),L()},onSortChange(D){let F=String(D.target.value||"");if(!(!Go.has(F)||F===E)){E=F;try{window.localStorage.setItem(Wo,F)}catch{}L()}},onDeferredToggle(){ee?ie():Q()},onLabelMenuToggle(){pe?H():w()},onLabelToggle(D){let F=he.labels.indexOf(D);F===-1?he.labels.push(D):he.labels.splice(F,1),L()},onLabelClear(){he.labels.length!==0&&(he.labels=[],L())},onNewIssue(){d&&d()}};function et(){return c`
      <div class="board-view">
        ${jo(he,Pe,{sort_mode:E,deferred_popup_open:ee,deferred_count:U,label_options:Me(),label_menu_open:pe})}
        <div class="board-root">
          ${wr({title:"Blocked",id:"blocked-col",items:Xe(A)},xe)}
          ${wr({title:"Ready",id:"ready-col",items:Xe(k)},xe)}
          ${wr({title:"In progress",id:"in-progress-col",items:Xe(b)},xe)}
          ${wr({title:"Resolved",id:"resolved-col",items:Xe(T)},xe)}
          ${wr({title:"Closed",id:"closed-col",items:Xe(V),is_closed:!0,closed_range:p},xe)}
        </div>
        ${ee?Ho({items:Xe(Y),count:U},M,Te):""}
      </div>
    `}function Ye(){De(et(),e),mt()}function mt(){try{let D=e.querySelector("#deferred-popup");D&&!D.open&&(typeof D.showModal=="function"?D.showModal():D.setAttribute("open",""));let F=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let de of F)Array.from(de.querySelectorAll(".board-card")).forEach((_e,ve)=>{_e.tabIndex=ve===0?0:-1})}catch{}}async function ct(D,F){if(!o){re("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:D,status:F}),re("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(de){r("update-status failed: %o",de),re("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Qe(D){switch(D){case"blocked-col":return A;case"ready-col":return k;case"in-progress-col":return b;case"resolved-col":return T;default:return[]}}function ht(D,F,de){if(!o||!i)return;let fe=Qe(D),_e=fe.find(u=>u.id===F);if(!_e)return;let ve=fe.filter(u=>u.id!==F),Ne=de.closest?de.closest(".board-card"):null,We=ve.length;if(Ne){let u=Ne.getAttribute("data-issue-id");if(u===F)return;let g=ve.findIndex(R=>R.id===u);g>=0&&(We=g)}let Fe=ve.slice();Fe.splice(We,0,_e),y.applyReorder(F,Fe,We)}function pt(){for(let D of Array.from(e.querySelectorAll(".board-column--drag-over")))D.classList.remove("board-column--drag-over")}let je=null;e.addEventListener("dragover",D=>{D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="move");let de=D.target.closest(".board-column");de&&de!==je&&(je&&je.classList.remove("board-column--drag-over"),de.classList.add("board-column--drag-over"),je=de)}),e.addEventListener("dragleave",D=>{let F=D.relatedTarget;(!F||!e.contains(F))&&je&&(je.classList.remove("board-column--drag-over"),je=null)}),e.addEventListener("drop",D=>{D.preventDefault(),je&&(je.classList.remove("board-column--drag-over"),je=null);let F=D.target,de=F.closest(".board-column");if(!de)return;let fe=D.dataTransfer?.getData("text/plain")||"";if(!fe)return;let _e=de.id,ve=I.get(fe);if(ve&&ve===_e){if(Yl.has(_e)){if(E!=="manual"){re("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ht(_e,fe,F)}return}let Ne=Gl[_e];if(!Ne){re("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}S.get(fe)!==Ne&&ct(fe,Ne)}),e.addEventListener("keydown",D=>{let F=D.target;if(!(F instanceof HTMLElement))return;let de=String(F.tagName||"").toLowerCase();if(de==="input"||de==="textarea"||de==="select"||de==="button"||de==="a"||F.isContentEditable===!0)return;let fe=F.closest(".board-card");if(!fe)return;let _e=String(D.key||"");if(_e==="Enter"||_e===" "){D.preventDefault();let Fe=fe.getAttribute("data-issue-id");Fe&&n(Fe);return}if(_e!=="ArrowUp"&&_e!=="ArrowDown"&&_e!=="ArrowLeft"&&_e!=="ArrowRight")return;D.preventDefault();let ve=fe.closest(".board-column");if(!ve)return;let Ne=Array.from(ve.querySelectorAll(".board-card")),We=Ne.indexOf(fe);if(_e==="ArrowDown"&&We<Ne.length-1){dt(fe,Ne[We+1]);return}if(_e==="ArrowUp"&&We>0){dt(fe,Ne[We-1]);return}if(_e==="ArrowLeft"||_e==="ArrowRight"){let Fe=Array.from(e.querySelectorAll(".board-column")),u=Fe.indexOf(ve),g=_e==="ArrowRight"?1:-1,R=u+g;for(;R>=0&&R<Fe.length;){let ae=Fe[R].querySelector(".board-card");if(ae){dt(fe,ae);return}R+=g}}});function dt(D,F){try{D.tabIndex=-1,F.tabIndex=0,F.focus()}catch{}}let at=null;_&&_.subscribe&&(at=_.subscribe(()=>{try{L()}catch{}}));let it=null;return l&&l.subscribe&&(it=l.subscribe(()=>{try{L()}catch{}})),{async load(){r("load"),L()},clear(){H(),ie(),at&&(at(),at=null),it&&(it(),it=null),e.replaceChildren(),A=[],k=[],b=[],T=[],Y=[],V=[],S=new Map,I=new Map}}}function ts(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Mr(e,t){return e.filter(r=>{let n=ts(r);return!(n&&t.has(n))})}async function Kl(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function lr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Zl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function cr(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var zt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function Vo(e){let t=0;for(let r of zt)t+=cr(e?.[r]);return t}function Ko(e){return!e||typeof e!="object"?!1:zt.some(t=>Number.isFinite(e[t]))}function Xl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function kr(e){return Ko(e)?`\u03C4 ${Xl(Vo(e))}`:null}function It(e){let t=kr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function $r(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${cr(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${cr(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${cr(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${cr(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Vo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Zl),r.join(`
`)}function Nt(e,t){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,i=!1;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Ko(a)){n+=1;for(let d of zt)r[d]=cr(r[d])+cr(a[d]);typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)&&(s+=a.total_cost_usd,o+=1),a.replayed===!0&&(i=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),i&&(r.replayed=!0),r)}var{entries:si,setPrototypeOf:Zo,isFrozen:Ql,getPrototypeOf:Jl,getOwnPropertyDescriptor:ec}=Object,{freeze:yt,seal:Et,create:ls}=Object,{apply:cs,construct:ds}=typeof Reflect<"u"&&Reflect;yt||(yt=function(t){return t});Et||(Et=function(t){return t});cs||(cs=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ds||(ds=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var hn=wt(Array.prototype.forEach),tc=wt(Array.prototype.lastIndexOf),Xo=wt(Array.prototype.pop),Pr=wt(Array.prototype.push),rc=wt(Array.prototype.splice),vn=wt(String.prototype.toLowerCase),rs=wt(String.prototype.toString),ns=wt(String.prototype.match),Nr=wt(String.prototype.replace),nc=wt(String.prototype.indexOf),sc=wt(String.prototype.trim),Lt=wt(Object.prototype.hasOwnProperty),vt=wt(RegExp.prototype.test),Fr=oc(TypeError);function wt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return cs(e,t,n)}}function oc(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ds(e,r)}}function Ee(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:vn;Zo&&Zo(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ql(t)||(t[n]=o),s=o)}e[s]=!0}return e}function ic(e){for(let t=0;t<e.length;t++)Lt(e,t)||(e[t]=null);return e}function Ht(e){let t=ls(null);for(let[r,n]of si(e))Lt(e,r)&&(Array.isArray(n)?t[r]=ic(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Ht(n):t[r]=n);return t}function qr(e,t){for(;e!==null;){let n=ec(e,t);if(n){if(n.get)return wt(n.get);if(typeof n.value=="function")return wt(n.value)}e=Jl(e)}function r(){return null}return r}var Qo=yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ss=yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),os=yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ac=yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),is=yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),lc=yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Jo=yt(["#text"]),ei=yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),as=yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ti=yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),bn=yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),cc=Et(/\{\{[\w\W]*|[\w\W]*\}\}/gm),dc=Et(/<%[\w\W]*|[\w\W]*%>/gm),uc=Et(/\$\{[\w\W]*/gm),pc=Et(/^data-[\-\w.\u00B7-\uFFFF]+$/),fc=Et(/^aria-[\-\w]+$/),oi=Et(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),_c=Et(/^(?:\w+script|data):/i),mc=Et(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ii=Et(/^html$/i),gc=Et(/^[a-z][.\w]*(-[.\w]+)+$/i),ri=Object.freeze({__proto__:null,ARIA_ATTR:fc,ATTR_WHITESPACE:mc,CUSTOM_ELEMENT:gc,DATA_ATTR:pc,DOCTYPE_NAME:ii,ERB_EXPR:dc,IS_ALLOWED_URI:oi,IS_SCRIPT_OR_DATA:_c,MUSTACHE_EXPR:cc,TMPLIT_EXPR:uc}),Br={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},hc=function(){return typeof window>"u"?null:window},bc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ni=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ai(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:hc(),t=oe=>ai(oe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Br.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:y,trustedTypes:A}=e,k=a.prototype,b=qr(k,"cloneNode"),T=qr(k,"remove"),Y=qr(k,"nextSibling"),V=qr(k,"childNodes"),ee=qr(k,"parentNode");if(typeof i=="function"){let oe=r.createElement("template");oe.content&&oe.content.ownerDocument&&(r=oe.content.ownerDocument)}let U,E="",{implementation:S,createNodeIterator:I,createDocumentFragment:j,getElementsByTagName:ce}=r,{importNode:he}=n,pe=ni();t.isSupported=typeof si=="function"&&typeof ee=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Ae,ERB_EXPR:Re,TMPLIT_EXPR:Je,DATA_ATTR:Xe,ARIA_ATTR:Me,IS_SCRIPT_OR_DATA:me,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:X}=ri,{IS_ALLOWED_URI:ye}=ri,ne=null,ke=Ee({},[...Qo,...ss,...os,...is,...Jo]),ge=null,He=Ee({},[...ei,...as,...ti,...bn]),be=Object.seal(ls(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ce=null,P=null,O=Object.seal(ls(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),te=!0,$e=!0,xe=!1,N=!0,q=!1,M=!0,se=!1,le=!1,w=!1,H=!1,z=!1,Q=!1,ie=!0,Te=!1,Pe="user-content-",et=!0,Ye=!1,mt={},ct=null,Qe=Ee({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ht=null,pt=Ee({},["audio","video","img","source","image","track"]),je=null,dt=Ee({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),at="http://www.w3.org/1998/Math/MathML",it="http://www.w3.org/2000/svg",D="http://www.w3.org/1999/xhtml",F=D,de=!1,fe=null,_e=Ee({},[at,it,D],rs),ve=Ee({},["mi","mo","mn","ms","mtext"]),Ne=Ee({},["annotation-xml"]),We=Ee({},["title","style","font","a","script"]),Fe=null,u=["application/xhtml+xml","text/html"],g="text/html",R=null,ae=null,qe=r.createElement("form"),Ve=function(h){return h instanceof RegExp||h instanceof Function},Ue=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ae&&ae===h)){if((!h||typeof h!="object")&&(h={}),h=Ht(h),Fe=u.indexOf(h.PARSER_MEDIA_TYPE)===-1?g:h.PARSER_MEDIA_TYPE,R=Fe==="application/xhtml+xml"?rs:vn,ne=Lt(h,"ALLOWED_TAGS")?Ee({},h.ALLOWED_TAGS,R):ke,ge=Lt(h,"ALLOWED_ATTR")?Ee({},h.ALLOWED_ATTR,R):He,fe=Lt(h,"ALLOWED_NAMESPACES")?Ee({},h.ALLOWED_NAMESPACES,rs):_e,je=Lt(h,"ADD_URI_SAFE_ATTR")?Ee(Ht(dt),h.ADD_URI_SAFE_ATTR,R):dt,ht=Lt(h,"ADD_DATA_URI_TAGS")?Ee(Ht(pt),h.ADD_DATA_URI_TAGS,R):pt,ct=Lt(h,"FORBID_CONTENTS")?Ee({},h.FORBID_CONTENTS,R):Qe,Ce=Lt(h,"FORBID_TAGS")?Ee({},h.FORBID_TAGS,R):Ht({}),P=Lt(h,"FORBID_ATTR")?Ee({},h.FORBID_ATTR,R):Ht({}),mt=Lt(h,"USE_PROFILES")?h.USE_PROFILES:!1,te=h.ALLOW_ARIA_ATTR!==!1,$e=h.ALLOW_DATA_ATTR!==!1,xe=h.ALLOW_UNKNOWN_PROTOCOLS||!1,N=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,q=h.SAFE_FOR_TEMPLATES||!1,M=h.SAFE_FOR_XML!==!1,se=h.WHOLE_DOCUMENT||!1,H=h.RETURN_DOM||!1,z=h.RETURN_DOM_FRAGMENT||!1,Q=h.RETURN_TRUSTED_TYPE||!1,w=h.FORCE_BODY||!1,ie=h.SANITIZE_DOM!==!1,Te=h.SANITIZE_NAMED_PROPS||!1,et=h.KEEP_CONTENT!==!1,Ye=h.IN_PLACE||!1,ye=h.ALLOWED_URI_REGEXP||oi,F=h.NAMESPACE||D,ve=h.MATHML_TEXT_INTEGRATION_POINTS||ve,Ne=h.HTML_INTEGRATION_POINTS||Ne,be=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&Ve(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&Ve(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),q&&($e=!1),z&&(H=!0),mt&&(ne=Ee({},Jo),ge=[],mt.html===!0&&(Ee(ne,Qo),Ee(ge,ei)),mt.svg===!0&&(Ee(ne,ss),Ee(ge,as),Ee(ge,bn)),mt.svgFilters===!0&&(Ee(ne,os),Ee(ge,as),Ee(ge,bn)),mt.mathMl===!0&&(Ee(ne,is),Ee(ge,ti),Ee(ge,bn))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?O.tagCheck=h.ADD_TAGS:(ne===ke&&(ne=Ht(ne)),Ee(ne,h.ADD_TAGS,R))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?O.attributeCheck=h.ADD_ATTR:(ge===He&&(ge=Ht(ge)),Ee(ge,h.ADD_ATTR,R))),h.ADD_URI_SAFE_ATTR&&Ee(je,h.ADD_URI_SAFE_ATTR,R),h.FORBID_CONTENTS&&(ct===Qe&&(ct=Ht(ct)),Ee(ct,h.FORBID_CONTENTS,R)),et&&(ne["#text"]=!0),se&&Ee(ne,["html","head","body"]),ne.table&&(Ee(ne,["tbody"]),delete Ce.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw Fr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Fr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');U=h.TRUSTED_TYPES_POLICY,E=U.createHTML("")}else U===void 0&&(U=bc(A,s)),U!==null&&typeof E=="string"&&(E=U.createHTML(""));yt&&yt(h),ae=h}},Ke=Ee({},[...ss,...os,...ac]),nt=Ee({},[...is,...lc]),ft=function(h){let B=ee(h);(!B||!B.tagName)&&(B={namespaceURI:F,tagName:"template"});let f=vn(h.tagName),v=vn(B.tagName);return fe[h.namespaceURI]?h.namespaceURI===it?B.namespaceURI===D?f==="svg":B.namespaceURI===at?f==="svg"&&(v==="annotation-xml"||ve[v]):!!Ke[f]:h.namespaceURI===at?B.namespaceURI===D?f==="math":B.namespaceURI===it?f==="math"&&Ne[v]:!!nt[f]:h.namespaceURI===D?B.namespaceURI===it&&!Ne[v]||B.namespaceURI===at&&!ve[v]?!1:!nt[f]&&(We[f]||!Ke[f]):!!(Fe==="application/xhtml+xml"&&fe[h.namespaceURI]):!1},tt=function(h){Pr(t.removed,{element:h});try{ee(h).removeChild(h)}catch{T(h)}},lt=function(h,B){try{Pr(t.removed,{attribute:B.getAttributeNode(h),from:B})}catch{Pr(t.removed,{attribute:null,from:B})}if(B.removeAttribute(h),h==="is")if(H||z)try{tt(B)}catch{}else try{B.setAttribute(h,"")}catch{}},Se=function(h){let B=null,f=null;if(w)h="<remove></remove>"+h;else{let J=ns(h,/^[\r\n\t ]+/);f=J&&J[0]}Fe==="application/xhtml+xml"&&F===D&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let v=U?U.createHTML(h):h;if(F===D)try{B=new y().parseFromString(v,Fe)}catch{}if(!B||!B.documentElement){B=S.createDocument(F,"template",null);try{B.documentElement.innerHTML=de?E:v}catch{}}let Z=B.body||B.documentElement;return h&&f&&Z.insertBefore(r.createTextNode(f),Z.childNodes[0]||null),F===D?ce.call(B,se?"html":"body")[0]:se?B.documentElement:Z},ut=function(h){return I.call(h.ownerDocument||h,h,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},xt=function(h){return h instanceof _&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof p)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},we=function(h){return typeof l=="function"&&h instanceof l};function Le(oe,h,B){hn(oe,f=>{f.call(t,h,B,ae)})}let At=function(h){let B=null;if(Le(pe.beforeSanitizeElements,h,null),xt(h))return tt(h),!0;let f=R(h.nodeName);if(Le(pe.uponSanitizeElement,h,{tagName:f,allowedTags:ne}),M&&h.hasChildNodes()&&!we(h.firstElementChild)&&vt(/<[/\w!]/g,h.innerHTML)&&vt(/<[/\w!]/g,h.textContent)||h.nodeType===Br.progressingInstruction||M&&h.nodeType===Br.comment&&vt(/<[/\w]/g,h.data))return tt(h),!0;if(!(O.tagCheck instanceof Function&&O.tagCheck(f))&&(!ne[f]||Ce[f])){if(!Ce[f]&&Vt(f)&&(be.tagNameCheck instanceof RegExp&&vt(be.tagNameCheck,f)||be.tagNameCheck instanceof Function&&be.tagNameCheck(f)))return!1;if(et&&!ct[f]){let v=ee(h)||h.parentNode,Z=V(h)||h.childNodes;if(Z&&v){let J=Z.length;for(let G=J-1;G>=0;--G){let m=b(Z[G],!0);m.__removalCount=(h.__removalCount||0)+1,v.insertBefore(m,Y(h))}}}return tt(h),!0}return h instanceof a&&!ft(h)||(f==="noscript"||f==="noembed"||f==="noframes")&&vt(/<\/no(script|embed|frames)/i,h.innerHTML)?(tt(h),!0):(q&&h.nodeType===Br.text&&(B=h.textContent,hn([Ae,Re,Je],v=>{B=Nr(B,v," ")}),h.textContent!==B&&(Pr(t.removed,{element:h.cloneNode()}),h.textContent=B)),Le(pe.afterSanitizeElements,h,null),!1)},Yt=function(h,B,f){if(ie&&(B==="id"||B==="name")&&(f in r||f in qe))return!1;if(!($e&&!P[B]&&vt(Xe,B))){if(!(te&&vt(Me,B))){if(!(O.attributeCheck instanceof Function&&O.attributeCheck(B,h))){if(!ge[B]||P[B]){if(!(Vt(h)&&(be.tagNameCheck instanceof RegExp&&vt(be.tagNameCheck,h)||be.tagNameCheck instanceof Function&&be.tagNameCheck(h))&&(be.attributeNameCheck instanceof RegExp&&vt(be.attributeNameCheck,B)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(B,h))||B==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&vt(be.tagNameCheck,f)||be.tagNameCheck instanceof Function&&be.tagNameCheck(f))))return!1}else if(!je[B]){if(!vt(ye,Nr(f,L,""))){if(!((B==="src"||B==="xlink:href"||B==="href")&&h!=="script"&&nc(f,"data:")===0&&ht[h])){if(!(xe&&!vt(me,Nr(f,L,"")))){if(f)return!1}}}}}}}return!0},Vt=function(h){return h!=="annotation-xml"&&ns(h,X)},Mt=function(h){Le(pe.beforeSanitizeAttributes,h,null);let{attributes:B}=h;if(!B||xt(h))return;let f={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ge,forceKeepAttr:void 0},v=B.length;for(;v--;){let Z=B[v],{name:J,namespaceURI:G,value:m}=Z,C=R(J),x=m,W=J==="value"?x:sc(x);if(f.attrName=C,f.attrValue=W,f.keepAttr=!0,f.forceKeepAttr=void 0,Le(pe.uponSanitizeAttribute,h,f),W=f.attrValue,Te&&(C==="id"||C==="name")&&(lt(J,h),W=Pe+W),M&&vt(/((--!?|])>)|<\/(style|title|textarea)/i,W)){lt(J,h);continue}if(C==="attributename"&&ns(W,"href")){lt(J,h);continue}if(f.forceKeepAttr)continue;if(!f.keepAttr){lt(J,h);continue}if(!N&&vt(/\/>/i,W)){lt(J,h);continue}q&&hn([Ae,Re,Je],st=>{W=Nr(W,st," ")});let Oe=R(h.nodeName);if(!Yt(Oe,C,W)){lt(J,h);continue}if(U&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!G)switch(A.getAttributeType(Oe,C)){case"TrustedHTML":{W=U.createHTML(W);break}case"TrustedScriptURL":{W=U.createScriptURL(W);break}}if(W!==x)try{G?h.setAttributeNS(G,J,W):h.setAttribute(J,W),xt(h)?tt(h):Xo(t.removed)}catch{lt(J,h)}}Le(pe.afterSanitizeAttributes,h,null)},qt=function oe(h){let B=null,f=ut(h);for(Le(pe.beforeSanitizeShadowDOM,h,null);B=f.nextNode();)Le(pe.uponSanitizeShadowNode,B,null),At(B),Mt(B),B.content instanceof o&&oe(B.content);Le(pe.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(oe){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},B=null,f=null,v=null,Z=null;if(de=!oe,de&&(oe="<!-->"),typeof oe!="string"&&!we(oe))if(typeof oe.toString=="function"){if(oe=oe.toString(),typeof oe!="string")throw Fr("dirty is not a string, aborting")}else throw Fr("toString is not a function");if(!t.isSupported)return oe;if(le||Ue(h),t.removed=[],typeof oe=="string"&&(Ye=!1),Ye){if(oe.nodeName){let m=R(oe.nodeName);if(!ne[m]||Ce[m])throw Fr("root node is forbidden and cannot be sanitized in-place")}}else if(oe instanceof l)B=Se("<!---->"),f=B.ownerDocument.importNode(oe,!0),f.nodeType===Br.element&&f.nodeName==="BODY"||f.nodeName==="HTML"?B=f:B.appendChild(f);else{if(!H&&!q&&!se&&oe.indexOf("<")===-1)return U&&Q?U.createHTML(oe):oe;if(B=Se(oe),!B)return H?null:Q?E:""}B&&w&&tt(B.firstChild);let J=ut(Ye?oe:B);for(;v=J.nextNode();)At(v),Mt(v),v.content instanceof o&&qt(v.content);if(Ye)return oe;if(H){if(z)for(Z=j.call(B.ownerDocument);B.firstChild;)Z.appendChild(B.firstChild);else Z=B;return(ge.shadowroot||ge.shadowrootmode)&&(Z=he.call(n,Z,!0)),Z}let G=se?B.outerHTML:B.innerHTML;return se&&ne["!doctype"]&&B.ownerDocument&&B.ownerDocument.doctype&&B.ownerDocument.doctype.name&&vt(ii,B.ownerDocument.doctype.name)&&(G="<!DOCTYPE "+B.ownerDocument.doctype.name+`>
`+G),q&&hn([Ae,Re,Je],m=>{G=Nr(G,m," ")}),U&&Q?U.createHTML(G):G},t.setConfig=function(){let oe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ue(oe),le=!0},t.clearConfig=function(){ae=null,le=!1},t.isValidAttribute=function(oe,h,B){ae||Ue({});let f=R(oe),v=R(h);return Yt(f,v,B)},t.addHook=function(oe,h){typeof h=="function"&&Pr(pe[oe],h)},t.removeHook=function(oe,h){if(h!==void 0){let B=tc(pe[oe],h);return B===-1?void 0:rc(pe[oe],B,1)[0]}return Xo(pe[oe])},t.removeHooks=function(oe){pe[oe]=[]},t.removeAllHooks=function(){pe=ni()},t}var li=ai();var ci={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},di=e=>(...t)=>({_$litDirective$:e,values:t}),yn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Ur=class extends yn{constructor(t){if(super(t),this.it=ot,t.type!==ci.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ot||t==null)return this._t=void 0,this.it=t;if(t===sr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Ur.directiveName="unsafeHTML",Ur.resultType=1;var ui=di(Ur);function _s(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ur=_s();function bi(e){ur=e}var Wr={exec:()=>null};function Be(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(kt.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,t)};return n}var vc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),kt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},yc=/^(?:[ \t]*(?:\n|$))+/,wc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,kc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Gr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,$c=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ms=/(?:[*+-]|\d{1,9}[.)])/,vi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,yi=Be(vi).replace(/bull/g,ms).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),xc=Be(vi).replace(/bull/g,ms).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),gs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Sc=/^[^\n]+/,hs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ac=Be(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",hs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Tc=Be(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ms).getRegex(),An="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",bs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ec=Be("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",bs).replace("tag",An).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),wi=Be(gs).replace("hr",Gr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",An).getRegex(),Cc=Be(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",wi).getRegex(),vs={blockquote:Cc,code:wc,def:Ac,fences:kc,heading:$c,hr:Gr,html:Ec,lheading:yi,list:Tc,newline:yc,paragraph:wi,table:Wr,text:Sc},pi=Be("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Gr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",An).getRegex(),Rc={...vs,lheading:xc,table:pi,paragraph:Be(gs).replace("hr",Gr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",pi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",An).getRegex()},Ic={...vs,html:Be(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",bs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Wr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Be(gs).replace("hr",Gr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",yi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Lc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Dc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ki=/^( {2,}|\\)\n(?!\s*$)/,Oc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Tn=/[\p{P}\p{S}]/u,ys=/[\s\p{P}\p{S}]/u,$i=/[^\s\p{P}\p{S}]/u,Mc=Be(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ys).getRegex(),xi=/(?!~)[\p{P}\p{S}]/u,Pc=/(?!~)[\s\p{P}\p{S}]/u,Nc=/(?:[^\s\p{P}\p{S}]|~)/u,Fc=Be(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",vc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Si=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,qc=Be(Si,"u").replace(/punct/g,Tn).getRegex(),Bc=Be(Si,"u").replace(/punct/g,xi).getRegex(),Ai="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Uc=Be(Ai,"gu").replace(/notPunctSpace/g,$i).replace(/punctSpace/g,ys).replace(/punct/g,Tn).getRegex(),zc=Be(Ai,"gu").replace(/notPunctSpace/g,Nc).replace(/punctSpace/g,Pc).replace(/punct/g,xi).getRegex(),Hc=Be("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,$i).replace(/punctSpace/g,ys).replace(/punct/g,Tn).getRegex(),jc=Be(/\\(punct)/,"gu").replace(/punct/g,Tn).getRegex(),Wc=Be(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Gc=Be(bs).replace("(?:-->|$)","-->").getRegex(),Yc=Be("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Gc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),$n=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Vc=Be(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",$n).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ti=Be(/^!?\[(label)\]\[(ref)\]/).replace("label",$n).replace("ref",hs).getRegex(),Ei=Be(/^!?\[(ref)\](?:\[\])?/).replace("ref",hs).getRegex(),Kc=Be("reflink|nolink(?!\\()","g").replace("reflink",Ti).replace("nolink",Ei).getRegex(),fi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ws={_backpedal:Wr,anyPunctuation:jc,autolink:Wc,blockSkip:Fc,br:ki,code:Dc,del:Wr,emStrongLDelim:qc,emStrongRDelimAst:Uc,emStrongRDelimUnd:Hc,escape:Lc,link:Vc,nolink:Ei,punctuation:Mc,reflink:Ti,reflinkSearch:Kc,tag:Yc,text:Oc,url:Wr},Zc={...ws,link:Be(/^!?\[(label)\]\((.*?)\)/).replace("label",$n).getRegex(),reflink:Be(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",$n).getRegex()},us={...ws,emStrongRDelimAst:zc,emStrongLDelim:Bc,url:Be(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",fi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Be(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",fi).getRegex()},Xc={...us,br:Be(ki).replace("{2,}","*").getRegex(),text:Be(us.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},wn={normal:vs,gfm:Rc,pedantic:Ic},zr={normal:ws,gfm:us,breaks:Xc,pedantic:Zc},Qc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},_i=e=>Qc[e];function jt(e,t){if(t){if(kt.escapeTest.test(e))return e.replace(kt.escapeReplace,_i)}else if(kt.escapeTestNoEncode.test(e))return e.replace(kt.escapeReplaceNoEncode,_i);return e}function mi(e){try{e=encodeURI(e).replace(kt.percentDecode,"%")}catch{return null}return e}function gi(e,t){let r=e.replace(kt.findPipe,(o,i,l)=>{let a=!1,d=i;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),n=r.split(kt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(kt.slashPipe,"|");return n}function Hr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Jc(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function hi(e,t,r,n,s){let o=t.href,i=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function ed(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var xn=class{constructor(e){Ge(this,"options");Ge(this,"rules");Ge(this,"lexer");this.options=e||ur}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Hr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=ed(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Hr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Hr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Hr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let d=l.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=_,r.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let A=y,k=A.raw+`
`+r.join(`
`),b=this.blockquote(k);o[o.length-1]=b,n=n.substring(0,n.length-A.raw.length)+b.raw,s=s.substring(0,s.length-A.text.length)+b.text;break}else if(y?.type==="list"){let A=y,k=A.raw+`
`+r.join(`
`),b=this.list(k);o[o.length-1]=b,n=n.substring(0,n.length-y.raw.length)+b.raw,s=s.substring(0,s.length-A.raw.length)+b.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;e;){let a=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,b=>" ".repeat(3*b.length)),y=e.split(`
`,1)[0],A=!_.trim(),k=0;if(this.options.pedantic?(k=2,p=_.trimStart()):A?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,p=_.slice(k),k+=t[1].length),A&&this.rules.other.blankLine.test(y)&&(d+=y+`
`,e=e.substring(y.length+1),a=!0),!a){let b=this.rules.other.nextBulletRegex(k),T=this.rules.other.hrRegex(k),Y=this.rules.other.fencesBeginRegex(k),V=this.rules.other.headingBeginRegex(k),ee=this.rules.other.htmlBeginRegex(k);for(;e;){let U=e.split(`
`,1)[0],E;if(y=U,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),E=y):E=y.replace(this.rules.other.tabCharGlobal,"    "),Y.test(y)||V.test(y)||ee.test(y)||b.test(y)||T.test(y))break;if(E.search(this.rules.other.nonSpaceChar)>=k||!y.trim())p+=`
`+E.slice(k);else{if(A||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(_)||V.test(_)||T.test(_))break;p+=`
`+y}!A&&!y.trim()&&(A=!0),d+=U+`
`,e=e.substring(U.length+1),_=E.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=p.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!s.loose){let d=a.tokens.filter(_=>_.type==="space"),p=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=p}}if(s.loose)for(let a of s.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=gi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(gi(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Hr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Jc(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),hi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return hi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let p=[...n[0]][0].length,_=e.slice(0,s+n.index+p+i);if(Math.min(s,i)%2){let A=_.slice(1,-1);return{type:"em",raw:_,text:A,tokens:this.lexer.inlineTokens(A)}}let y=_.slice(2,-2);return{type:"strong",raw:_,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Dt=class ps{constructor(t){Ge(this,"tokens");Ge(this,"options");Ge(this,"state");Ge(this,"inlineQueue");Ge(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ur,this.options.tokenizer=this.options.tokenizer||new xn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:kt,block:wn.normal,inline:zr.normal};this.options.pedantic?(r.block=wn.pedantic,r.inline=zr.pedantic):this.options.gfm&&(r.block=wn.gfm,this.options.breaks?r.inline=zr.breaks:r.inline=zr.gfm),this.tokenizer.rules=r}static get rules(){return{block:wn,inline:zr}}static lex(t,r){return new ps(r).lex(t)}static lexInline(t,r){return new ps(r).inlineTokens(t)}lex(t){t=t.replace(kt.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},t,r))?(t=t.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(t,n,l)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),r.push(a);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,_=t.slice(1),y;this.options.extensions.startInline.forEach(A=>{y=A.call({lexer:this},_),typeof y=="number"&&y>=0&&(p=Math.min(p,y))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(a=this.tokenizer.inlineText(d)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Sn=class{constructor(e){Ge(this,"options");Ge(this,"parser");this.options=e||ur}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(kt.notSpaceStart)?.[0],s=e.replace(kt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+jt(n)+'">'+(r?s:jt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:jt(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${jt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=mi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+jt(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=mi(e);if(s===null)return jt(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${jt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:jt(e.text)}},ks=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Ot=class fs{constructor(t){Ge(this,"options");Ge(this,"renderer");Ge(this,"textRenderer");this.options=t||ur,this.options.renderer=this.options.renderer||new Sn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ks}static parse(t,r){return new fs(r).parse(t)}static parseInline(t,r){return new fs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},kn,jr=(kn=class{constructor(e){Ge(this,"options");Ge(this,"block");this.options=e||ur}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Dt.lex:Dt.lexInline}provideParser(){return this.block?Ot.parse:Ot.parseInline}},Ge(kn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ge(kn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),kn),td=class{constructor(...e){Ge(this,"defaults",_s());Ge(this,"options",this.setOptions);Ge(this,"parse",this.parseMarkdown(!0));Ge(this,"parseInline",this.parseMarkdown(!1));Ge(this,"Parser",Ot);Ge(this,"Renderer",Sn);Ge(this,"TextRenderer",ks);Ge(this,"Lexer",Dt);Ge(this,"Tokenizer",xn);Ge(this,"Hooks",jr);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Sn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new xn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new jr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];jr.passThroughHooks.has(o)?s[i]=d=>{if(this.defaults.async&&jr.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,d);return a.call(s,_)})();let p=l.call(s,d);return a.call(s,p)}:s[i]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,d);return _===!1&&(_=await a.apply(s,d)),_})();let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Dt.lex(e,t??this.defaults)}parser(e,t){return Ot.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Dt.lex:Dt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Ot.parse:Ot.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Dt.lex:Dt.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Ot.parse:Ot.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+jt(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},dr=new td;function ze(e,t){return dr.parse(e,t)}ze.options=ze.setOptions=function(e){return dr.setOptions(e),ze.defaults=dr.defaults,bi(ze.defaults),ze};ze.getDefaults=_s;ze.defaults=ur;ze.use=function(...e){return dr.use(...e),ze.defaults=dr.defaults,bi(ze.defaults),ze};ze.walkTokens=function(e,t){return dr.walkTokens(e,t)};ze.parseInline=dr.parseInline;ze.Parser=Ot;ze.parser=Ot.parse;ze.Renderer=Sn;ze.TextRenderer=ks;ze.Lexer=Dt;ze.lexer=Dt.lex;ze.Tokenizer=xn;ze.Hooks=jr;ze.parse=ze;var vf=ze.options,yf=ze.setOptions,wf=ze.use,kf=ze.walkTokens,$f=ze.parseInline;var xf=Ot.parse,Sf=Dt.lex;function Xt(e){let t=ze.parse(e),r=li.sanitize(t);return ui(r)}function Wt(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function xr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function En(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var rd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},nd=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,sd=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Qt(e){return!!e&&typeof e=="object"}function $s(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ci(e,t){let r=$s(e),n=$s(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function od(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Qt(s)&&typeof s.text=="string"?s.text:"").join(""):Qt(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function id(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:rd[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=$s(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ci(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=Ci(Qt(l)?l.old_string:"",Qt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ri(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Ii(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=nd.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:sd.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function ad(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(Qt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ii(o.text));else if(o.type==="thinking"){let i=Ri(o.thinking);i&&s.push(i)}else if(o.type==="tool_use"){let i=id(o);typeof o.id=="string"&&t.set(o.id,i),s.push(i)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(Qt(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let i=od(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function ld(e){if(e.type==="item.completed"&&Qt(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ii(t.text)];if(t.type==="reasoning"){let r=Ri(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function cd(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Li(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!Qt(o))continue;let i=cd(o)?ld(o):ad(o,r);for(let l of i)t.push(l)}return t}var dd=5,ud=10,pd=/Task\s+#(\d+)/,fd=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,_d=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Cn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function md(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function gd(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function hd(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let a=pd.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!a||d.length===0)continue;t.set(a[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let i=t.get(String(o.taskId??""));if(!i)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof o.status=="string"&&(i.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function bd(e){if(e.tool==="Bash"){let t=e.command||"";return fd.test(t)?"~ PR/\uAC8C\uC2DC \uC911":_d.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function vd(e){let t=e.filter(s=>s.kind==="tool").slice(-ud),r=new Map;t.forEach((s,o)=>{let i=bd(s);if(!i)return;let l=r.get(i)||{count:0,last:-1};l.count+=1,l.last=o,r.set(i,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function yd(e){let t=gd(e);if(t)return{text:t,guess:!1};let r=hd(e);if(r)return{text:r,guess:!1};let n=vd(e);return n?{text:n,guess:!0}:null}function wd(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:St(e,t)}function Rn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,i={},l=!0,a=new Set,d=new Set,p=null,_=null,y=!1,A=!1,k=!1,b=null,T=null;function Y(){y=!1,A=!1,k=!1,b=null,T=null}async function V(P){if(r){A=!0,k=!1,L();try{let O=await Promise.resolve(r("get-attempt-prompt",{attempt_id:P}));if(o!==P)return;!O||typeof O!="object"||Array.isArray(O)?k=!0:(b=O,T=P)}catch{o===P&&(k=!0)}finally{o===P&&(A=!1,L())}}}function ee(){if(y=!y,y&&o&&T!==o){V(o);return}L()}function U(){if(!y)return"";let P=xr({loading:A,error:k});if(P)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${P}
      </div>`;if(!b)return"";if(b.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let O=En(b.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${O?c`<div class="prompt-block__meta">${O} 발송</div>`:""}
      ${typeof b.task_prompt=="string"?Wt("\uACFC\uC5C5 (user)",b.task_prompt):""}
      ${typeof b.system_prompt=="string"?Wt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",b.system_prompt):""}
    </div>`}function E(){if(!o||!n)return[];let P=n.get(o);return Li(P?P.lines:[])}function S(){if(!o||!n)return null;let P=n.get(o),O=P?P.last_event_at:null;return typeof O=="number"?O:null}function I(){return i.status==="running"}function j(){if(I()&&o){_||(_=setInterval(()=>L(),1e3));return}ce()}function ce(){_&&(clearInterval(_),_=null)}function he(P){let O=[],te=0;for(;te<P.length;){let $e=P[te];if($e.kind==="tool"){let xe=te;for(;xe<P.length&&P[xe].kind==="tool"&&P[xe].tool===$e.tool;)xe+=1;if(xe-te>=dd&&!d.has(te)){O.push({kind:"group",idx:te,tool:$e.tool||"",lines:P.slice(te,xe).map((N,q)=>({idx:te+q,line:N}))}),te=xe;continue}}O.push({kind:"line",idx:te,line:$e}),te+=1}return O}function pe(P){for(let O=P.length-1;O>=0;O-=1){let te=P[O];if(te.kind==="result"||te.kind==="error")return null;if(te.kind==="tool"&&!Object.hasOwn(te,"result"))return te}return null}function Ae(P){for(let O=P.length-1;O>=0;O-=1)if(P[O].kind==="thinking")return P[O];return null}function Re(P,O){if(O.kind==="gate")return c`<div class="sv__gate">${O.text}</div>`;if(O.kind==="phase")return c`<div class="sv__phase">${O.text}</div>`;if(O.kind==="result")return c`<div
        class="sv__result${O.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${O.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Xt(O.text||(O.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(O.kind==="thinking"){let te=a.has(P);return c`<div
        class="sv__think${te?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ye(P)}
      >
        <span class="sv__think-line">💭 ${Cn(O.text)}</span>
        ${te?c`<pre class="sv__think-expand">${O.text}</pre>`:""}
      </div>`}if(O.kind==="error")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="blocker")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="tool"){let te=a.has(P),$e=O.tool==="Bash"?md(O.command):0,xe=O.tool==="Bash"?$e>1?Cn(O.command):O.command:O.path||O.command||"";return c`<div
        class="sv__tool${te?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ye(P)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${O.icon}</span>
          <span class="sv__tool-name">${O.tool}</span>
          ${xe?c`<span class="sv__tool-detail">${xe}</span>`:""}
          ${$e>1?c`<span class="sv__tool-more">⋯ ${$e}줄</span>`:""}
          ${typeof O.added=="number"?c`<span class="sv__diff-add">+${O.added}</span>`:""}
          ${typeof O.removed=="number"?c`<span class="sv__diff-del">−${O.removed}</span>`:""}
          ${O.result?c`<span class="sv__tool-ok">→ ${O.result}</span>`:""}
        </span>
        ${te?c`<pre class="sv__tool-expand">${Je(O)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Xt(O.text||"")}</div>`}function Je(P){let O=[];if(P.tool==="Bash"&&typeof P.command=="string"&&P.command.length>0)O.push(P.command);else if(P.input!==void 0)try{O.push(`input: ${JSON.stringify(P.input,null,2)}`)}catch{}return typeof P.output=="string"&&P.output.length>0&&O.push(`output:
${P.output}`),O.join(`

`)}function Xe(){if(!o)return c``;let P=E(),O=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),te=i.session_id||"",$e=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,xe=I(),N=xe?wd(S(),Date.now()):"",q=xe?pe(P):null,M=xe?Ae(P):null,se=yd(P);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${se?c`<span
              class="sv__stage${se.guess?" sv__stage--guess":""}"
              title=${se.text}
              >${se.text}</span
            >`:""}
        ${xe?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${N?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${N}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${N?c`<span class="sv__live-ago">${N}</span>`:""}</span
            >`:""}
        ${te?c`<button
              type="button"
              class="sv__session"
              title=${te}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${te}`}
              @click=${()=>ke(te)}
            >
              ⧉ ${te.slice(0,8)}
            </button>`:""}
        ${O?c`<span class="sv__meta">${O}</span>`:""}
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
          @click=${ee}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${$e}
          @click=${ne}
        >
          <span class="sv__follow-full">⇣ ${$e}</span>
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
      ${U()}
      <div class="sv__body">
        ${P.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:he(P).map(le=>le.kind==="group"?Me(le):Re(le.idx,le.line))}
      </div>
      ${q||M?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${q?c`<span class="sv__now-icon">${q.icon}</span>
                  <span class="sv__now-name">${q.tool}</span>
                  <span class="sv__now-detail"
                    >${q.tool==="Bash"?Cn(q.command):q.path||q.command||""}</span
                  >`:""}
            ${M?c`<span class="sv__now-think"
                  >💭 ${Cn(M.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Me(P){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>me(P.idx)}
    >
      <span class="sv__group-icon">${P.lines[0].line.icon}</span>
      <span class="sv__group-name">${P.tool}</span>
      <span class="sv__group-count">${P.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function me(P){d.add(P),L()}function L(){De(Xe(),e),j(),l&&X()}function X(){let P=e.querySelector(".sv__body");P&&(P.scrollTop=P.scrollHeight)}function ye(P){a.has(P)?a.delete(P):a.add(P),L()}function ne(){l=!l,L()}function ke(P){lr(P).then(O=>{O?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ge(P){!o||!P||(i={...i,...P},L())}function He(P){let O=P.target;if(!O||!O.classList||!O.classList.contains("sv__body"))return;!(O.scrollHeight-O.scrollTop-O.clientHeight<=4)&&l&&(l=!1,L())}e.addEventListener("scroll",He,!0);function be(P){let O=P&&P.attempt_id;O&&(o=O,i=P.meta||{},l=!0,a.clear(),d.clear(),Y(),!p&&n&&(p=n.subscribe(L)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),L())}function Ce(){let P=o;o=null,a.clear(),d.clear(),Y(),ce(),r&&P&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${P}`})).catch(()=>{}),De(c``,e),s&&s()}return{open:be,updateMeta:ge,close:Ce,isOpen(){return o!==null},destroy(){ce(),p&&(p(),p=null),e.removeEventListener("scroll",He,!0),o=null,De(c``,e)}}}function Yr(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Di(t.spec_id),s=Di(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Di(e){return typeof e=="string"?e.trim():""}function kd(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function $d(e){let t=e&&e.metadata||{},r=Yr(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:kd(t)?null:"plan_pending"}),n}function Oi(e,t){let r=$d(e);return c`
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
  `}var xd="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Sd=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Ad=/^\*\*결론\*\* — (.+)$/;function Mi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==xd)return null;let r=Sd.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Ad.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",d=l?i+1:i;return{lane:n,identifier:s,timestamp:o,conclusion:a,body:t.slice(d).join(`
`).trim()}}var Pi=20;function Ni(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Td(e){return e.length>Pi?`${e.slice(0,Pi)}\u2026`:e}function Ed(e,t,r,n){let s=`${t.lane} ${Td(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Ni(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${Xt(t.body)}
        </div>`:""}
  </div>`}function Cd(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ni(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Xt(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Fi(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",i=r.sending===!0,l=n.slice().sort((a,d)=>String(d.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let d=Mi(typeof a.text=="string"?a.text:"");return d?Ed(a,d,t,s.has(a.id)):Cd(a)})}
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
  `}var Rd=["codex","opus","fable","self","skip"],Id=["codex","fable","skip"],Ld=["low","medium","high","xhigh"],Dd=["standard","fast_track"],Sr=["orchestration_model","orchestration_effort","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],Ss={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},qi={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},Od=["self","skip"],Md="opus",As={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function Ts(e){let t=Ss[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function Pd(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:As[e]||"(\uAE30\uBCF8)"}function Vr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Kr(e){if(!Vr(e)||!Vr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Vr(r)&&Vr(r.models));return t.length>0?t:null}function xs(e){return{value:e,label:e}}function Es(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Bi(e,t,r=null){let n=Kr(e);if(!n)return t?[{label:null,options:[xs(t)]}]:[];let s=n.filter(([i])=>r===null||i===r).map(([i,l])=>({label:i,options:Object.keys(l.models).map(xs)})),o=s.some(i=>i.options.some(l=>l.value===t));return t&&!o?[Es(t),...s]:s}function pr(e,t){let r={label:null,options:e.map(xs)};return t&&!e.includes(t)?[Es(t),r]:[r]}function Gt(e,t){let r=Kr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Hi(e,t){return Vr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function In(e,t){let r=Kr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Hi(n,n.models[t]);return[]}function ji(e){let t=Kr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Hi(n,s))r.includes(o)||r.push(o);return r}function Wi(e,t){if(!t)return ji(e);let n=Kr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let i of In(e,o))s.includes(i)||s.push(i);return s}function Dn(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Gt(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let i=n.impl_model?In(t,n.impl_model):Wi(t,s);return n.impl_effort&&i.length>0&&!i.includes(n.impl_effort)&&(n.impl_effort=""),n}function Ar(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||Md,i=r("impl_model"),l=r("impl_runtime"),a=l==="claude"||l==="codex"?l:l==="inherit"?s===void 0?Gt(n,o):s:null;return Sr.map(d=>{let p=t(d),_,y=!1;return d==="orchestration_model"?_=Bi(n,p):d==="impl_runtime"?_=pr(["inherit","claude","codex"],p):d==="impl_model"?(_=a?Bi(n,p,a):p?[Es(p)]:[],y=l==="inherit"&&a===null):d==="orchestration_effort"?_=pr(In(n,o),p):d==="impl_effort"?(_=pr(i?In(n,i):a?Wi(n,a):ji(n),p),y=l==="inherit"&&a===null):d==="plan_review_model"?_=pr(Id,p):Object.hasOwn(qi,d)?(_=pr(Ld,p),y=Od.includes(r(qi[d]))):_=pr(Rd,p),{key:d,groups:_,selected:p,disabled:y,runner:d==="orchestration_model"?Gt(n,o):null}})}function Ln(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Ui(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>Ui(s,t))}
          </optgroup>`)}
  `}function Ui(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function zi(e,t,r,n,s,o,i){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${Ts(e)}</span>
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
  `}function Gi(e,t,r,n,s=""){let o=e&&e.metadata||{},i=r&&typeof r=="object"?r:{},l=_=>typeof o[_]=="string"?o[_]:"",d=Ar({selectedOf:l,effectiveOf:_=>{let y=l(_);return y||(typeof i[_]=="string"?i[_]:"")},runner_catalog:n}),p=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${d.map(_=>zi(_.key,Ln(_.groups,_.selected,Pd(_.key,i,s)),_.selected,!1,_.disabled,_.runner,t))}
    ${zi("workflow_mode",Ln(pr(Dd,p),p),p,o.workflow_mode==="fast_track",!1,null,t)}
  `}function Nd(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Yi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(k){k.key==="Escape"&&s&&(k.preventDefault(),y())}document.addEventListener("keydown",a);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>y()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Nd(s)}</span
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
                    </div>`:Xt(i)}
          </div>
        </div>
      </div>
    `:c``}function p(){De(d(),e)}async function _(k,b={}){s=k,o="loading",i="",l="",p();let T=r?r():"";if(!T){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let Y="/api/doc?workspace="+encodeURIComponent(T)+"&path="+encodeURIComponent(k);try{let V=await n(Y),ee=await V.json().catch(()=>({}));if(!V.ok||!ee||ee.ok!==!0){if(ee?.error==="not_found"&&b.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(ee&&ee.error||V.status)+")",p();return}i=String(ee.content||""),o="ready",p()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function y(){s=null,De(c``,e)}function A(){document.removeEventListener("keydown",a),y()}return{open:_,close:y,destroy:A}}var Fd=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Vi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function qd(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Bd(e){let t=kr(e);if(!t||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Vi}
          >부분 집계</span
        >`:""}`}function Ud(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return c`<div class="detail-session__usage-detail">
    ${Fd.map(r=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${qd(e[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Vi}</span>`:""}
  </div>`}var zd={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Hd(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function jd(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Ki(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let i=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,y=o.has(d.attempt_id),A=_&&!y,k=_?y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!A}
      title=${k}
      @click=${b=>{b.stopPropagation(),A&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,y=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return c`<div class="detail-session__cause" title=${y}>
      ${d.cause}
    </div>`},a=d=>{if(!kr(d.usage))return"";let p=s.has(d.attempt_id);return c`<button
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
      세션 이력${Bd(r.total)}
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
                >${zd[d.status||""]||"\xB7"}</span
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
              ${kr(d.usage)?c`<span class="detail-session__usage"
                    >${kr(d.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Hd(d.started_at)}</span
              >
            </button>
            ${a(d)} ${i(d)} ${l(d)}
            ${jd(d)}
            ${s.has(d.attempt_id)&&d.usage?Ud(d.usage):""}
          </div>`)}
    </div>
  `}function Zi(e,t={}){return c`
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
          ${Wd(e)}
        </div>`:""}
  `}function Wd(e){let t=xr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Wt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=En(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Wt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Wt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Gd=["open","in_progress","deferred","resolved","closed"],Yd=[0,1,2,3,4];function Xi(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,d=null,p=null,_={},y="",A=!1,k=!1,b=!1,T="",Y="",V="";function ee(){k=!1,b=!1,T="",Y="",V=""}let U=[],E=null,S=null,I=!1,j="",ce=!1,he=0,pe=new Set;function Ae(){U=[],E=null,S=null,I=!1,j="",ce=!1,he+=1,pe.clear()}async function Re(m){if(!s)return;let C=++he;try{let x=await Promise.resolve(s("get-comments",{id:m}));if(C!==he||m!==d)return;U=Array.isArray(x)?x:[],I=!1}catch{if(C!==he||m!==d)return;I=!0}G()}function Je(){if(!s||!d)return;let m=p&&typeof p.comment_count=="number"?p.comment_count:null;if(E!==d){E=d,S=m,Re(d);return}m!==null&&m!==S&&(S=m,Re(d))}function Xe(m){pe.has(m)?pe.delete(m):pe.add(m),G()}function Me(m){let C=j.trim().length===0;j=m,C!==(m.trim().length===0)&&G()}async function me(){let m=j.trim();if(!s||!d||m.length===0||ce)return;let C=d;ce=!0,G();let x=!1;try{let W=await Promise.resolve(s("add-comment",{id:C,text:m}));Array.isArray(W)&&W.length>0&&(x=!0,C===d&&(U=W,I=!1,j="",S=W.length))}catch{x=!1}x||re("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),C===d&&(ce=!1),G()}let L={onToggle:Xe,onDraftInput:Me,onSubmit:me},X=document.createElement("div");X.className="md-viewer-root",document.body.appendChild(X);let ye=Yi(X,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),ne=document.createElement("div");ne.className="session-log-root",document.body.appendChild(ne);let ke=Rn(ne,{transport:s?(m,C)=>Promise.resolve(s(m,C)):void 0,sessionLogStore:a}),ge=!1,He=!1,be=!1,Ce=null,P=null,O=0;function te(m){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${m}`}function $e(){ge=!1,He=!1,be=!1,Ce=null,P=null,O+=1}async function xe(m){if(!s)return;let C=++O;He=!0,be=!1,G();try{let x=await Promise.resolve(s("get-bead-prompt",{bead_id:m}));if(C!==O)return;!x||typeof x!="object"||Array.isArray(x)?be=!0:(Ce=x,P=te(m))}catch{C===O&&(be=!0)}finally{C===O&&(He=!1,G())}}function N(){if(ge=!ge,ge&&d&&P!==te(d)){Ce=null,xe(d);return}G()}function q(){if(!i||!d)return[];let m=i.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(x=>x&&x.bead_id===d).sort((x,W)=>(W.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null,exec_default_preset_id:typeof x.exec_default_preset_id=="string"?x.exec_default_preset_id:null,exec_default_preset_revision:typeof x.exec_default_preset_revision=="number"?x.exec_default_preset_revision:null,exec_values:x.exec_values&&typeof x.exec_values=="object"?x.exec_values:null,usage:x.usage||null}))}function M(){if(!i||!d)return null;let m=i.get();return Nt(m&&m.attempts||{},d)}let se=new Set;function le(m){se.has(m)?se.delete(m):se.add(m),G()}function w(m){let C=i?i.get():null,x=C&&C.attempts?C.attempts[m]:null;ke.open({attempt_id:m,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}async function H(m){if(!s||!m)return;let C=()=>{let W=i?i.get():null;return W&&typeof W.revision=="number"?W.revision:0},x=await s("worker-attempt-resume",{attempt_id:m,expected_revision:C()});if(x&&x.conflict){let W=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:C();x=await s("worker-attempt-resume",{attempt_id:m,expected_revision:W})}x&&x.resumed===!1&&!x.conflict&&x.reason&&re(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let z={onOpen:w,onResume:H,onToggleUsage:le};function Q(){let m=i?i.get():null,C=m&&m.default_exec_preset_id,x=typeof C=="string"?et()?.presets.find(W=>W.id===C):null;return x&&x.compatible!==!1&&x.settings?x.settings:{}}function ie(){let m=i?i.get():null,C=m&&m.default_exec_preset_id,x=typeof C=="string"?et()?.presets.find(W=>W.id===C):null;return x&&x.compatible!==!1&&typeof x.name=="string"?x.name:""}function Te(){let m=i?i.get():null;return m&&m.runner_catalog||null}function Pe(){let m=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},x=(Object.hasOwn(_,"orchestration_model")?_.orchestration_model:void 0)||(typeof m.orchestration_model=="string"?m.orchestration_model:"")||(typeof Q().orchestration_model=="string"?Q().orchestration_model:"")||"opus";return Gt(Te(),x)}function et(){let m=l?l.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function Ye(m){let C=m&&m.settings&&typeof m.settings=="object"?m.settings:{},x=W=>typeof C[W]=="string"?C[W]:W==="impl_runtime"&&typeof C.impl_model=="string"&&Gt(Te(),C.impl_model)||"";return Ar({selectedOf:x,effectiveOf:x,runner_catalog:Te()}).some(W=>W.groups.some(Oe=>Oe.options.some(st=>st.value===W.selected&&st.label.endsWith("(\uBE44\uD638\uD658)"))))}function mt(m){l&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&l.set({revision:m.revision,presets:m.presets})}async function ct(){let m=et(),C=m?.presets.find(x=>x.id===y);if(!(!s||!d||!m||!C||Ye(C)||A)){A=!0,G();try{let x=await Promise.resolve(s("apply-exec-preset",{id:d,preset_id:C.id,expected_revision:m.revision}));if(x&&x.conflict){mt(x),re("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let W=x&&Array.isArray(x.issue)?x.issue[0]:x?.issue;if(x&&x.applied&&W&&typeof W=="object"){p=W;for(let Oe of Sr)delete _[Oe];re("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}x&&x.error==="bd_readback_failed"?re("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):re("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(x){x&&typeof x=="object"&&x.code==="bd_readback_failed"?re("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):re("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,G()}}}function Qe(){let m=et();if(m&&m.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let C=m?m.presets:[],x=C.find(Oe=>Oe.id===y),W=x?Ye(x):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${m===null||A}
          @change=${Oe=>{y=Oe.target.value,G()}}
        >
          <option value="" ?selected=${y===""}>
            ${m===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${C.map(Oe=>{let st=Ye(Oe);return c`<option
              value=${Oe.id}
              ?selected=${Oe.id===y}
            >
              ${Oe.name}${st?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${m===null||!x||W||A}
          @click=${()=>{ct()}}
        >
          11개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let ht=null;r&&r.subscribe&&(ht=r.subscribe(()=>at()));let pt=null;i&&typeof i.subscribe=="function"&&(pt=i.subscribe(()=>{d&&G()}));let je=null;l&&typeof l.subscribe=="function"&&(je=l.subscribe(()=>{d&&G()}));function dt(m){m.key==="Escape"&&d&&(m.preventDefault(),n())}document.addEventListener("keydown",dt);function at(){if(d){if(r&&typeof r.snapshotFor=="function"){let m=r.snapshotFor("detail:"+d)||[];p=m.find(x=>x&&x.id===d)||m[0]||p}Je(),G()}}function it(m){lr(m).then(C=>{C?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function D(m){m.preventDefault(),m.stopPropagation(),d&&it(d)}function F(m,C){m.preventDefault(),m.stopPropagation(),it(C)}function de(m,C,x){m.preventDefault(),m.stopPropagation(),ye.open(C,{missing_state:x})}function fe(m,C){_[m]=C,G(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",{id:d,key:m,value:C})).catch(()=>{re("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function _e(m,C){let x=p||{},W=x.metadata&&typeof x.metadata=="object"?x.metadata:{},Oe={};for(let Ie of["impl_runtime","impl_model","impl_effort"])Oe[Ie]=Object.hasOwn(_,Ie)?_[Ie]:typeof W[Ie]=="string"?W[Ie]:"";Oe[m]=C;let st=Dn(Oe,Te(),Pe()),bt={};for(let Ie of["impl_runtime","impl_model","impl_effort"])bt[Ie]=_[Ie],_[Ie]=st[Ie]||"";G(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...st,orchestration_runtime:Pe()})).then(Ie=>{let _t=Array.isArray(Ie)?Ie[0]:Ie;if(!_t||typeof _t!="object"||!_t.id)throw new Error("implementation target readback failed");p=_t;for(let tn of["impl_runtime","impl_model","impl_effort"])delete _[tn];G()}).catch(()=>{for(let Ie of["impl_runtime","impl_model","impl_effort"])bt[Ie]===void 0?delete _[Ie]:_[Ie]=bt[Ie];G(),re("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ve(m,C,x){if(!s||!d)return!1;try{let W=await Promise.resolve(s(m,C)),Oe=Array.isArray(W)?W[0]:W;return Oe&&typeof Oe=="object"&&Oe.id?(p=Oe,!0):(re(x,"error"),!1)}catch{return re(x,"error"),!1}}function Ne(m){setTimeout(()=>{try{let C=e.querySelector(m);C&&typeof C.focus=="function"&&C.focus()}catch{}},0)}function We(){k=!0,T=p&&p.title||"",G(),Ne('.detail-edit__input[data-edit="title"]')}function Fe(m){T=m.target.value}function u(){k=!1,T="",G()}function g(){ve("edit-text",{id:d,field:"title",value:T},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(C=>{C&&(k=!1,T=""),G()})}function R(){b=!0,Y=p&&p.description||"",G(),Ne('.detail-edit__textarea[data-edit="description"]')}function ae(m){Y=m.target.value}function qe(){b=!1,Y="",G()}function Ve(){ve("edit-text",{id:d,field:"description",value:Y},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(C=>{C&&(b=!1,Y=""),G()})}function Ue(m,C,x,W){if(m.key==="Escape"){m.stopPropagation(),x();return}m.key==="Enter"&&(!W||m.ctrlKey||m.metaKey)&&(m.preventDefault(),C())}function Ke(m){let C=m.target.value;ve("update-status",{id:d,status:C},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>G())}function nt(m){let C=Number(m.target.value);ve("update-priority",{id:d,priority:C},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>G())}function ft(m){V=m.target.value}function tt(){let m=V.trim();m.length!==0&&ve("label-add",{id:d,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(C=>{C&&(V=""),G()})}function lt(m){if(m.key==="Escape"){m.stopPropagation(),V="",G();return}m.key==="Enter"&&(m.preventDefault(),tt())}function Se(m){ve("label-remove",{id:d,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>G())}let ut={onCopyPath:F,onOpenDoc:de},xt={onChange:fe,onImplTargetChange:_e};function we(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function Le(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function At(m){let x=(Array.isArray(m.dependencies)?m.dependencies:[]).map(W=>({id:we(W),icon:Le(W)})).filter(W=>W.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${x.map(W=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(W.id)}
                  >
                    ${W.icon?`${W.icon} `:""}${W.id}
                  </button>`:c`<span class="detail-dep"
                    >${W.icon?`${W.icon} `:""}${W.id}</span
                  >`)}
          </div>`}
    `}function Yt(m){let C=m.metadata||{},x=m.workflow||{},W=x.stages||{},Oe=W.spec&&W.spec.stale,st=W.impl&&W.impl.stale,bt=W.plan||null,Ie=x.route_source==="derived",_t=x.route||C.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ie?" detail-kv__v--derived":""}"
          title=${Ie?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ie?"unset":_t}</span
        >
      </div>
      ${x.route!=="quick_fix"||Object.hasOwn(C,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${C.spec_review||"\uC5C6\uC74C"}${Oe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${bt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${bt?.approval_receipt||"\uC5C6\uC74C"}${bt?.approval_state==="stale"?" \xB7 stale":bt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${x.route!=="quick_fix"||Object.hasOwn(C,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${C.impl_review||"\uC5C6\uC74C"}${st?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${C.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${C.pr_url}</span>
          </div>`:""}
    `}let Vt={route:["quick_fix","spec_backed","full_plan"]};async function Mt(m,C){let x=C.target.value;if(m==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){G();return}await ve("update-workflow-meta",{id:d,key:m,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),G()}function qt(m){let C=m.metadata||{};return c` ${((W,Oe)=>{let st=Vt[W],bt=typeof C[W]=="string"?C[W]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${W}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${W}
          data-edit=${`wfmeta-${W}`}
          @change=${Ie=>Mt(W,Ie)}
        >
          <option value="" ?selected=${!st.includes(bt)}>
            ${Oe}
          </option>
          ${st.map(Ie=>c`<option value=${Ie} ?selected=${bt===Ie}>${Ie}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function oe(m){return k?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${T}
            @input=${Fe}
            @keydown=${C=>Ue(C,g,u,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${g}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${u}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${We}
        >
          ✎
        </button>
      </div>
    `}function h(m){let C=gt(m.created_at),x=gt(m.updated_at);return!C&&!x?c``:c`
      ${C?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
      ${x?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function B(m,C){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ke}
        >
          ${Gd.map(x=>c`<option value=${x} ?selected=${x===m}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${nt}
        >
          ${Yd.map(x=>c`<option value=${String(x)} ?selected=${x===C}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function f(m){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${R}
            >
              ✎
            </button>`}
      </div>
      ${b?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${Y}
              @input=${ae}
              @keydown=${C=>Ue(C,Ve,qe,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ve}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${qe}
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
    `}function Z(m){let C=Array.isArray(m.labels)?m.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${C.map(x=>c`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>Se(x)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${V}
            @input=${ft}
            @keydown=${lt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${tt}
          >
            추가
          </button>
        </span>
      </div>
    `}function J(){if(!d)return c``;let m=p||{},C=String(m.id||d),x=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",W=m.status||"open",Oe=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",st=m.description||"",bt={...m,metadata:{...m.metadata||{},..._}};return c`
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
            @click=${D}
          >
            ${C}
          </button>
          ${oe(x)} ${B(W,Oe)}
          ${h(m)} ${f(st)}
          ${Fi(U,L,{expanded:pe,draft:j,sending:ce,error:I})}
          ${v(m)} ${Z(m)} ${At(m)}
          ${Yt(m)} ${qt(m)}
          ${Oi(m,ut)}
          ${Qe()}
          ${Gi(bt,xt,Q(),Te(),ie())}
          ${Zi({expanded:ge,loading:He,error:be,data:Ce},{onToggle:N})}
          ${Ki(q(),z,{total:M(),expanded:se})}
        </div>
      </div>
    `}function G(){De(J(),e)}return{load(m){m!==d&&(_={},y="",ee(),Ae(),$e()),d=m,p=null,at()},clear(){d=null,p=null,_={},y="",A=!1,ee(),Ae(),$e(),ye.close(),ke.close(),De(c``,e)},destroy(){ht&&(ht(),ht=null),pt&&(pt(),pt=null),je&&(je(),je=null),document.removeEventListener("keydown",dt),ye.destroy(),X.parentNode&&X.parentNode.removeChild(X),ke.destroy(),ne.parentNode&&ne.parentNode.removeChild(ne),d=null,p=null,y="",A=!1,Ae(),$e(),De(c``,e)}}}var Vd=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Qi(e,t){return es(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Kd(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function Ji(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let i="";async function l(S){let I=r.get();if(I)try{let j=await n("display-policy-set",{expected_revision:I.revision,policy:S(I)});a(j),j&&j.conflict&&j.policy&&(j=await n("display-policy-set",{expected_revision:j.policy.revision,policy:S(j.policy)}),a(j)),j&&j.conflict&&re("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{re("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function d(S){let I=r.get();if(!I)return;let j=Qi(S,I)!=="shown";l(ce=>Kd(S,ce,j))}function p(){let S=i.trim();S.length!==0&&(i="",l(I=>I.hidden_prefixes.includes(S)?{hidden_prefixes:I.hidden_prefixes}:{hidden_prefixes:[...I.hidden_prefixes,S]}),T())}function _(S){l(I=>({hidden_prefixes:I.hidden_prefixes.filter(j=>j!==S)}))}function y(S){let I=r.get();if(!I)return;let j=I.chips[S]===!1;l(()=>({chips:{[S]:j}}))}function A(S){let I=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${I.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${I.map(j=>{let ce=Qi(j,S);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${ce}`}
                  data-label=${j}
                  data-state=${ce}
                  @click=${()=>d(j)}
                >
                  ${j}
                </button>`})}
            </div>`}
      </section>
    `}function k(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(I=>c`<span class="display-settings__prefix">
                ${I}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${I} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(I)}
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
            @input=${I=>{i=String(I.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function b(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Vd.map(([I,j])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${I}
                  .checked=${S.chips[I]!==!1}
                  @change=${()=>y(I)}
                />
                <span>${j}</span>
              </label>`)}
        </div>
      </section>
    `}function T(){let S=r.get();De(c`
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
            ${S?c`${A(S)} ${k(S)}
                ${b(S)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let Y=!1,V=()=>{Y=!1};o.addEventListener("close",V),o.addEventListener("cancel",V);let ee=null;r.subscribe&&(ee=r.subscribe(()=>{Y&&T()}));function U(){Y||(i="",Y=!0,T(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){Y&&(Y=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:U,close:E,destroy(){Y=!1,o.removeEventListener("close",V),o.removeEventListener("cancel",V),ee&&(ee(),ee=null),o.remove()}}}function ea(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(d,p,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let y=typeof _=="string"?_.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}function ta(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function ra(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var Zd={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},na=160;function Xd(e){return e.length>na?`${e.slice(0,na)}\u2026`:e}function On(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,i=document.createElement("dialog");i.id="worker-exec-defaults-dialog",i.className="exec-defaults",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=null,a=!1;function d(){return r&&r.get()||{revision:0,exec_defaults:{}}}function p(){let w=d();return typeof w.revision=="number"?w.revision:0}function _(){let w=n?n.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function y(w){n&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&n.set({revision:w.revision,presets:w.presets})}function A(w){w&&w.queue&&r&&r.set(w.queue)}function k(){return d().runner_catalog??null}let b=null;function T(){if(b!==null)return b;let w=d().default_exec_preset_id;return typeof w=="string"&&w.length>0?w:null}async function Y(w){if(!s)return;let H=_();if(!H)return;b=w||"";let z=E(w);if(te(),!z.viable){re(z.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let Q=await s("worker-queue-set-default-exec-preset",{preset_id:w||null,expected_queue_revision:p(),expected_preset_revision:H.revision});if(A(Q),Q&&Q.presets&&n&&n.set(Q.presets),Q&&Q.conflict){re("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(Q&&Q.applied){b=null,te();return}re("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{re("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function V(w){l={id:w.id,name:w.name,settings:{...w.settings||{}}},I(),a=!1,te()}function ee(){l={id:null,name:"",settings:{}},a=!1,te()}function U(w){let H=w&&w.settings&&typeof w.settings=="object"?w.settings:{},z=Q=>typeof H[Q]=="string"?H[Q]:Q==="impl_runtime"&&typeof H.impl_model=="string"&&Gt(k(),H.impl_model)||"";return Ar({selectedOf:z,effectiveOf:z,runner_catalog:k()}).some(Q=>Q.groups.some(ie=>ie.options.some(Te=>Te.value===Q.selected&&Te.label.endsWith("(\uBE44\uD638\uD658)"))))}function E(w){if(!w)return{viable:!0,missing:!1,incompatible:!1,preset:null};let z=_()?.presets.find(ie=>ie.id===w);if(!z||z.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let Q=z.compatible===!1||U(z);return{viable:!Q,missing:!1,incompatible:Q,preset:z}}function S(){let w=l?.settings.orchestration_model;return typeof w!="string"?null:Gt(k(),w)}function I(){if(!l)return;let w=Dn({impl_runtime:l.settings.impl_runtime||"",impl_model:l.settings.impl_model||"",impl_effort:l.settings.impl_effort||""},k(),S());for(let H of["impl_runtime","impl_model","impl_effort"])w[H]?l.settings[H]=w[H]:delete l.settings[H]}function j(w){let H=w&&w.settings&&typeof w.settings=="object"?w.settings:{},z=Sr.filter(ie=>typeof H[ie]=="string").length,Q=Sr.filter(ie=>typeof H[ie]=="string").map(ie=>`${Ss[ie]?.title||ie}: ${H[ie]}`);return{count:`${z}/11 \uC9C0\uC815`,choices:Q.length>0?Q.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function ce(w){if(!s||!window.confirm(`\u201C${w.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let H=_();if(H)try{let z=await s("exec-preset-delete",{expected_revision:H.revision,id:w.id});y(z),z&&z.conflict&&re("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{re("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function he(w=!1){if(!s||!l)return;let H=_();if(!H)return;let z=w||l.id===null,Q={expected_revision:H.revision,...z?{}:{id:l.id},name:l.name,settings:{...l.settings}};try{let ie=await s(z?"exec-preset-create":"exec-preset-update",Q);if(y(ie),ie&&ie.conflict){a=!0,te();return}if(ie&&ie.applied){l=null,a=!1,te();return}re("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{re("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function pe(w){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${Ts(w.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${w.key}
        ?disabled=${w.disabled}
        @change=${H=>{if(!l)return;let z=H.target.value;z?l.settings[w.key]=z:delete l.settings[w.key],(w.key==="impl_runtime"||w.key==="impl_model"||w.key==="impl_effort"||w.key==="orchestration_model")&&I(),a=!1,te()}}
      >
        ${Ln(w.groups,w.selected,As[w.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function Ae(){if(!l)return"";let w=ie=>typeof l?.settings[ie]=="string"?l.settings[ie]:"",H=Ar({selectedOf:w,effectiveOf:w,runner_catalog:k(),controller_runtime:S()}),z=_(),Q=l.id!==null&&z!==null&&!z.presets.some(ie=>ie.id===l?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${l.name}
          data-preset-name
          @input=${ie=>{l&&(l.name=ie.target.value,a=!1)}}
        />
      </label>
      ${a?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${Q?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${H.map(pe)}
      <div class="exec-preset-editor__actions">
        ${Q?c`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{he(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{he(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{l=null,a=!1,te()}}
        >
          취소
        </button>
      </div>
    </div>`}function Re(){let w=_(),H=w?w.presets.filter(z=>z?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${ee}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${w===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:H.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:H.map(z=>{let Q=j(z),ie=typeof z.reference_count=="number",Te=ie?z.reference_count:null,Pe=Array.isArray(z.reference_summary)?z.reference_summary.map(et=>et?.display_name||et?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${z.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${z.name}</strong>
                  <span>${Q.count}</span>
                  <span data-preset-references=${z.id}
                    >${ie?`\uCC38\uC870 ${Te}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${U(z)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Q.choices}</small>
                  ${Pe?c`<small data-preset-impact=${z.id}
                        >업데이트 영향: ${Pe}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${z.id}
                    @click=${()=>V(z)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${z.id}
                    ?disabled=${Te===null||Te>0||z.reference_scan_complete===!1}
                    title=${Te===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Te>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":z.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{ce(z)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${Ae()}
    </section>`}function Je(){let w=_(),H=w?w.presets.filter(Pe=>Pe?.migration_pending!==!0):[],z=T()||"",Q=E(z),ie=Q.preset,Te=ie?j(ie):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
      <h3>현재 워크스페이스 기본 프리셋</h3>
      <p class="exec-defaults__hint">
        이 워크스페이스는 프리셋 하나를 참조합니다. 없음은 harness 기본값을
        사용합니다.
      </p>
      <select
        class="exec-defaults__sel"
        data-workspace-preset-select
        aria-label="워크스페이스 기본 프리셋"
        .value=${z}
        ?disabled=${w===null}
        @change=${Pe=>{Y(Pe.target.value)}}
      >
        <option value="" ?selected=${z===""}>
          없음 — harness 기본값
        </option>
        ${z&&Q.missing?c`<option value=${z} ?selected=${!0}>
              ${z} (선택한 프리셋 없음)
            </option>`:""}
        ${H.map(Pe=>c`<option
              value=${Pe.id}
              ?selected=${Pe.id===z}
              ?disabled=${Pe.compatible===!1}
            >
              ${Pe.name}${Pe.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${ie?c`<p data-workspace-preset-summary>
            ${Te?.count} · ${Te?.choices}
            ${Q.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${Q.missing?c`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:Q.incompatible?c`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function Xe(){let w=d().workspace_info;return w&&typeof w=="object"?w:{}}function Me(w,H){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${w}"
      >${H}</span
    >`}function me(w){let H=w?ra(w.cmd):"",z=w?ta(w.timeout_ms):"",Q=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${H?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${H}</span>
            ${Me("config","config")}
            ${z?c`<span class="exec-defaults__vd-meta"
                  >timeout ${z}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${Q}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function L(w){let H=w?ra(w.cmd):"",z=w?ta(w.timeout_ms):"",Q=z?`timeout ${z} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",ie=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${H?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${H}</span>
            ${Me("config","config")}
            ${w.detached===!0?Me("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${Q}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${ie}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function X(w){if(!w||typeof w!="object")return"";let H=Zd[String(w.outcome)];if(!H)return"";let z=w.outcome==="failed"&&w.reason?`${H.label} \xB7 ${w.reason}`:H.label,Q=[gt(w.at),typeof w.bead_id=="string"?w.bead_id:"",typeof w.base_sha=="string"?w.base_sha.slice(0,7):""].filter(Pe=>Pe.length>0).join(" \xB7 "),ie=typeof w.detail=="string"&&w.detail.length>0?Xd(w.detail):"",Te=typeof w.log_path=="string"&&w.log_path.length>0?w.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${Me(H.modifier,z)}
        ${Q?c`<span class="exec-defaults__vd-meta">${Q}</span>`:""}
      </div>
      ${ie?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${ie}</code>
          </div>`:""}
      ${Te?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${Te}</code>
          </div>`:""}
    </div>`}let ye=!1,ne=!1,ke=!1,ge=null;async function He(){if(s){ne=!0,ke=!1,te();try{let w=await Promise.resolve(s("get-worker-system-prompt",{}));!w||typeof w!="object"||Array.isArray(w)?ke=!0:ge=w}catch{ke=!0}finally{ne=!1,te()}}}function be(){if(ye=!ye,ye&&!ge){He();return}te()}function Ce(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${ye?"true":"false"}
          @click=${be}
        >
          ${ye?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${ye?P():""}
    </section>`}function P(){let w=xr({loading:ne,error:ke});if(w)return w;if(!ge)return"";let H=Array.isArray(ge.variants)?ge.variants:[];return c`<div class="exec-defaults__sp-body">
      ${ge.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${ge.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${H.map(z=>c`<div class="exec-defaults__sp-variant" data-variant=${z.key}>
            <div class="exec-defaults__sp-cond">${z.condition}</div>
            ${Wt(z.label,z.system_prompt)}
          </div>`)}
    </div>`}function O(w){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${me(w.verify_cmd)} ${L(w.deploy_cmd)}
      ${X(w.last_deploy)}
    </section>`}function te(){if(De(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${le}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Re()} ${Je()}
            ${O(Xe())}
            ${Ce()}
          </div>
        </div>
      `,i),b!==null){let w=i.querySelector("[data-workspace-preset-select]");w&&(w.value=b)}}let $e=!1,xe=()=>{$e=!1},N=w=>{w.target===w.currentTarget&&le()};i.addEventListener("close",xe),i.addEventListener("cancel",xe),i.addEventListener("click",N);let q=null;r&&r.subscribe&&(q=r.subscribe(()=>{$e&&te()}));let M=null;n&&n.subscribe&&(M=n.subscribe(()=>{$e&&te()}));function se(){$e||($e=!0,te(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function le(){$e&&($e=!1,typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:se,close:le,destroy(){$e=!1,i.removeEventListener("close",xe),i.removeEventListener("cancel",xe),i.removeEventListener("click",N),q&&(q(),q=null),M&&(M(),M=null),i.remove()}}}function Tr(e){let t=St(e.created_at),r=St(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${gt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Cs(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=It(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,i=e.lane==="done"&&!o,l=i?St(e.done_at):"",a=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
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
        >`:"",A=r.map(S=>S===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${S}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${S}</span
        >`),k=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",b=n?c`<span class="worker-usage" title=${$r(e.usage)}
        >${n}</span
      >`:"",T=s?c`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",Y=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",V=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",ee=e.discard_action?c`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",U=e.revise_action?c`<button
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
        </button>`:"",E=!!(n||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return c`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${d}${p}${_}</div>
          <div class="worker-mini__row2">
            ${b}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${gt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${A}${T}
            <span class="worker-mini__actions"
              >${Y}${V}${ee}</span
            >
            ${Tr(e)}
          </div>`:o?c`<div class="worker-mini__head">
              ${a}${d}${p}${y}${A}${k}
            </div>
            <div class="worker-mini__body">${_}</div>
            ${E?c`<div class="worker-mini__foot">
                  ${b}${T}
                  <span class="worker-mini__actions"
                    >${Y}${V}${ee}${U}</span
                  >
                </div>`:""}
            ${Tr(e)}`:c`<div class="worker-mini__line">
              ${a}${d}${p}${_}${y}${A}${k}${b}${T}${Y}${V}${ee}
            </div>
            ${Tr(e)}`}
  </div>`}function Qd(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
    ${r?mn(r,e.status):""}
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
    ${Tr(e)}
  </div>`}function Ft(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Qd(n):Cs(n))}
          </div>`}
  </section>`}var sa=160;function oa(e){return e.length>sa?`${e.slice(0,sa)}\u2026`:e}function Jd(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${oa(e.command)}</code>`:""}
  </div>`}function eu(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function tu(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function Rs(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function ia(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
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
          ${Jd(e.failure.cause_detail)}
        </div>`:""}
    ${t.map(r=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}). bead는 resolved로 남아 있고 자동 재시도는
          하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?c`<div class="worker-banner__detail">
                <code>${oa(r.detail)}</code>
              </div>`:""}
          ${tu(r.log_path)} ${eu(r.output_tail)}
        </div>`)}
  </div>`}function ru(e,t,r=null){let n=!!e.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Rs(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),i=It(e.usage),l=e.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=e.base_exception||null,d=e.attempt_id&&e.attempt_id===r;return c`<div
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
          ${i?c`<span class="worker-usage" title=${$r(e.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    ${Tr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Is(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>ru(s,t,r))}
  </div>`}function Jt(e){return c`<svg
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
  </svg>`}function Ls(){return Jt(Bt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ds(){return Jt(Bt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Os(){return Jt(Bt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function aa(){return Jt(Bt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function la(){return Jt(Bt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ca(){return Jt(Bt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function da(){return Jt(Bt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function ua(){return Jt(Bt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Zr=1,nu=6e4,su={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},ou=new Set(["auto_merge","merged","merge","done"]),pa={running:3,paused:2,failed:1};function iu(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function au(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let i of r)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from),s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of r){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0)continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!n.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let _=t.get(i.bead_id),y=typeof _=="number"&&_>0&&typeof i.finished_at=="number"&&_>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!y&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,d=o.get(i.bead_id);if(d){let _=pa[d.run_state],y=pa[l];if(_>y||_===y&&(d.started_at??0)>(a??0))continue}let p=typeof i.session_id=="string"&&i.session_id.length>0;o.set(i.bead_id,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:a,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,model:typeof i.model=="string"?i.model:null,usage:Nt(e,i.bead_id),can_pause:l==="running"&&p,can_resume:l!=="running"&&p&&!n.has(i.attempt_id)})}return o}function fa(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Ct(e){return e&&typeof e=="object"?e:{}}function Ms(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,i=new Map;for(let b of s)b&&typeof b.root_dir=="string"&&i.set(b.root_dir,b);let l=[],a=[],d=[],p=[],_=[],y=new Map;for(let b of n){if(!b||typeof b.root_dir!="string")continue;let T=b.root_dir,Y=b.name||T,V=i.get(T),ee=V&&typeof V.revision=="number"?V.revision:typeof b.revision=="number"?b.revision:0,U=Ct(b.attempts),E=Ct(b.bead_titles),S=Ct(b.pr_observations),I=Ct(b.admission),j=Ct(b.revise_parked),ce=Ct(b.merge_queue_state),he=Ct(b.cleanup_failed),pe=Array.isArray(b.merge_queue)?b.merge_queue:[],Ae=new Set(pe.filter(L=>L&&typeof L.bead_id=="string").map(L=>L.bead_id)),Re=Array.isArray(b.queue)?b.queue:[],Je=Array.isArray(b.done)?b.done:[],Xe=new Map;for(let L of Je)L&&typeof L.bead_id=="string"&&typeof L.added_at=="number"&&Xe.set(L.bead_id,L.added_at);let Me=L=>({id:L,title:E[L]||L,root_dir:T,workspace_name:Y,expected_revision:ee,draggable:!1}),me=new Set;for(let[L,X]of au(U,Xe))me.add(L),a.push({...Me(L),lane:"running",attempt_id:X.attempt_id,run_state:X.run_state,can_pause:X.can_pause,can_resume:X.can_resume,started_at:X.started_at,last_event_at:X.last_event_at,model:X.model,usage:X.usage,badges:X.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:X.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:X.run_state==="failed"});for(let L of Array.isArray(b.pr_wait)?b.pr_wait:[]){let X=L&&L.bead_id;if(typeof X!="string"||me.has(X))continue;me.add(X);let ye=Ct(S[X]),ne=Ct(ye.pr),ke=ye.gate?Ct(ye.gate):null,ge=Ae.has(X),He=ce.active===X,be=L.external===!0,Ce=he[X]||null,P=!!ke&&ke.base_badge==="\uCDA9\uB3CC",O=!!Ce&&!!ke&&ke.tier==="merged",te=be&&!!ke&&ke.tier==="merged";d.push({...Me(X),lane:"pr_wait",pr_number:typeof ne.number=="number"?ne.number:null,pr_url:typeof ne.url=="string"?ne.url:void 0,external:be,usage:Nt(U,X),badges:Ce?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Ce,reason:Ce?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!ge,merge_enabled:ke?.enabled===!0||P||O||te,merge_label:te?"\uC815\uB9AC":P&&!O?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:te?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":O?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":P?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ke?.enabled===!0?`\uBA38\uC9C0 (${ke.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ke?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ge,cancel_enabled:!He,discard_action:!be&&!Ce&&!(ke&&ke.tier==="merged"),discard_enabled:!He&&!ge,discard_title:ge?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let L=0;L<Re.length;L++){let X=Re[L],ye=X&&X.bead_id;if(typeof ye!="string"||me.has(ye))continue;me.add(ye);let ne=j[ye],ke={...Me(ye),lane:"queue",reason:fa(I,ye),queue_position:L+1,queue_index:L,queue_length:Re.length,badges:ne?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ne,revise_action:!!ne,revise_enabled:!!ne,revise_title:ne?ne.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ne.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(ke);let ge=y.get(T);ge?ge.push(ke):y.set(T,[ke])}for(let L of Array.isArray(b.runnable)?b.runnable:[]){let X=L&&L.bead_id;typeof X!="string"||me.has(X)||(me.add(X),l.push({...Me(X),title:L.title||E[X]||X,lane:"runnable",draggable:!0,reason:fa(I,X),created_at:L.created_at??void 0,updated_at:L.updated_at??void 0,labels:Array.isArray(L.labels)?L.labels:[],workflow:L.route?{route:L.route,chips:{route:L.route}}:null,place_index:Re.length}))}for(let L of Je){let X=L&&L.bead_id;if(typeof X!="string"||me.has(X)||(me.add(X),o!==void 0&&typeof L.added_at=="number"&&L.added_at<o))continue;let ye=iu(U,X);_.push({...Me(X),lane:"done",done:!0,usage:Nt(U,X),done_at:typeof L.added_at=="number"?L.added_at:void 0,done_kind:ye&&typeof ye.done_kind=="string"?ye.done_kind:null})}}a.sort((b,T)=>(T.last_event_at??0)-(b.last_event_at??0)),_.sort((b,T)=>(T.done_at??0)-(b.done_at??0));let A=s.length>0?s:n.map(b=>({root_dir:b&&b.root_dir,name:b&&b.name,auto_advance:b&&b.auto_advance,auto_merge:b&&b.auto_merge,slots:b&&b.slots,revision:b&&b.revision,exec_defaults:b&&b.exec_defaults,default_exec_preset_id:b&&b.default_exec_preset_id,runner_catalog:b&&b.runner_catalog})),k=[];for(let b of A)!b||typeof b.root_dir!="string"||k.push({root_dir:b.root_dir,name:b.name||b.root_dir,auto_advance:b.auto_advance===!0,auto_merge:b.auto_merge===!0,slots:typeof b.slots=="number"&&b.slots>=Zr?b.slots:Zr,revision:typeof b.revision=="number"?b.revision:0,exec_defaults:Ct(b.exec_defaults),default_exec_preset_id:typeof b.default_exec_preset_id=="string"?b.default_exec_preset_id:null,runner_catalog:Ct(b.runner_catalog),items:y.get(b.root_dir)||[]});return{runnable:l,queue:p,queue_groups:k,running:a,pr_wait:d,done:_,automation:{total:k.length,both_on:k.filter(b=>b.auto_advance&&b.auto_merge).length}}}function lu(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<nu;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${gt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${St(e,t)}</span
        >`}</span
  >`}function Xr(e){return c`<div class="mon-c__title">${e.title}</div>`}function Qr(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Mn(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Ps(e){let t=It(e.usage);return t?c`<span class="mon-c__usage" title=${$r(e.usage)}
        >${t}</span
      >`:""}function Ns(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function cu(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Ds()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Ls()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${Os()}
    </button>
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${aa()}
        </button>`:""}
  </span>`}function du(e,t){let r=typeof e.started_at=="number"?Rs(t-e.started_at):"";return c`${Xr(e)}
    <div class="mon-c__meta">
      ${Ns(e)}${lu(e.last_event_at,t)}${Qr(e)}${Mn(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Ps(e)}${cu(e)}
    </div>`}function uu(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=St(e.updated_at);return c`${Xr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Qr(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${_n(e.labels,null).map(i=>c`<span class="ctl-chip ctl-chip--label">${i}</span>`)}
      ${Mn(e)}
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
    </div>`}function pu(e){return c`${Xr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Qr(e)}
      ${Ns(e)}
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
        </div>`:""}`}function fu(e){let t=!!(It(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${Xr(e)}
    <div class="mon-c__meta">
      ${Qr(e)}${Mn(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Ns(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${Ps(e)}
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
        </div>`:""}`}function _u(e,t){let r=e.done_kind||"",n=r?su[r]||r:"",s=St(e.done_at,t);return c`${Xr(e)}
    <div class="mon-c__meta">
      ${Qr(e)}${Mn(e)}
      ${n?c`<span
            class="mon-live__kind${ou.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Ps(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${gt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function _a(e,t){return e.lane==="running"?du(e,t):e.lane==="runnable"?uu(e):e.lane==="queue"?pu(e):e.lane==="pr_wait"?fu(e):_u(e,t)}function ma(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?Ds():Ls()}
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
        ${la()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${ca()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Zr}
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
        ${da()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function ga(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=Pt.find(o=>o.value===e.done_range)?.label||"";return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Os():ua()}
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
        ${Pt.map(o=>c`<option
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
  </div>`}function ha(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ba(e){let t={};for(let i of zt)t[i]=0;let r=!1,n=0,s=0,o=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let a=!1;for(let d of zt){let p=l[d];typeof p=="number"&&Number.isFinite(p)&&(t[d]+=p,r=!0,a=!0)}if(a){s+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(n+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=n),r?It(t):null}var ya="bdui.monitor.done-range";function mu(){try{let e=window.localStorage.getItem(ya);return Ut(e)?e:Tt}catch{return Tt}}function gu(e){try{window.localStorage.setItem(ya,e)}catch{}}var wa="tab:monitor:pipeline",hu=1e3,bu=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function va(e,t){let r=e.lane==="runnable"||e.lane==="queue";return c`<div
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
    ${_a(e,t)}
  </div>`}function ka(e,t){let r=rt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.execPresetStore,l=t.getWorkspacePath,a=t.switchWorkspace,d=t.now||(()=>Date.now()),p=t.confirm||(N=>typeof globalThis.confirm!="function"||globalThis.confirm(N)),_=mu();function y(){let N=Pt.find(q=>q.value===_);return N?N.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let k=Ms(null,null),b=null,T=new Map,Y=new Set;function V(N){return k.queue_groups.find(q=>q.root_dir===N)||null}let U=On(e,{queueStore:{get(){if(!b)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let N=T.get(b);if(N)return N;let q=V(b),M=s&&s.get?s.get():null,se=(Array.isArray(M)?M:[]).find(le=>le&&le.root_dir===b);return{revision:q?q.revision:0,exec_defaults:q?q.exec_defaults:{},default_exec_preset_id:q?q.default_exec_preset_id:null,runner_catalog:q?q.runner_catalog:null,workspace_info:se?se.workspace_info:void 0}},set(N){b&&T.set(b,N);for(let q of Array.from(Y))q()},subscribe(N){return Y.add(N),()=>Y.delete(N)}},presetStore:i,transport:o?(N,q)=>o(N,N==="worker-queue-set-default-exec-preset"||N==="get-worker-system-prompt"?{...q||{},root_dir:b}:q):void 0,getWorkspacePath:()=>b||void 0}),E=null,S=null;async function I(N,q,M,se){if(!o||!M)return null;let le=await o(N,{...q,root_dir:M,expected_revision:se});if(le&&le.conflict){let w=le.queue&&typeof le.queue.revision=="number"?le.queue.revision:se;le=await o(N,{...q,root_dir:M,expected_revision:w})}return le&&le.queue&&M&&T.set(M,le.queue),le}async function j(N,q,M){return!o||!M?null:await o(N,{...q,root_dir:M})}async function ce(N){if(!o||!N&&!p("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let q=await o("monitor-auto-toggle",{on:N}),M=q&&Array.isArray(q.failed)?q.failed:[];M.length>0&&re(`\uC790\uB3D9\uD654 ${N?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${M.map(se=>se.root_dir).join(", ")}`,"error",3200)}async function he(){let N=new Map;for(let q of k.pr_wait)N.has(q.root_dir)||N.set(q.root_dir,q.expected_revision);for(let[q,M]of N)await I("worker-merge-queue-add-all",{},q,M)}let pe=null,Ae=!1,Re=null;function Je(){Re!==null&&clearTimeout(Re),Re=setTimeout(()=>{Re=null,Ae=!1},0)}function Xe(N){let q=N.target;return typeof q?.closest=="function"?q.closest(".mon-group"):null}function Me(N){let q=Xe(N);return!q||!pe?null:(q.getAttribute("data-root-dir")||"")===pe.root_dir?q:null}function me(){for(let N of Array.from(A.querySelectorAll(".mon-group--drag-over")))N.classList.remove("mon-group--drag-over")}function L(N){let q=N.target,M=typeof q?.closest=="function"?q.closest('.mon-card[draggable="true"]'):null;if(M){pe={bead_id:M.getAttribute("data-issue-id")||"",lane:M.getAttribute("data-lane")||"",root_dir:M.getAttribute("data-root-dir")||"",revision:Number(M.getAttribute("data-revision")||0)||0,queue_index:Number(M.getAttribute("data-queue-index")),queue_length:Number(M.getAttribute("data-queue-length")),place_index:Number(M.getAttribute("data-place-index"))},Ae=!0;try{N.dataTransfer?.setData("text/plain",pe.bead_id),N.dataTransfer&&(N.dataTransfer.effectAllowed="move")}catch{}}}function X(N){let q=Me(N);q&&(N.preventDefault(),N.dataTransfer&&(N.dataTransfer.dropEffect="move"),q.classList.add("mon-group--drag-over"))}function ye(N){Xe(N)?.classList.remove("mon-group--drag-over")}function ne(){pe=null,me(),Je()}function ke(N){let q=Me(N),M=pe;if(pe=null,me(),!q||!M||!M.bead_id)return;N.preventDefault();let se=N.target,le=typeof se?.closest=="function"?se.closest('.mon-card[data-lane="queue"]'):null,w=le&&q.contains(le)?Number(le.getAttribute("data-queue-index")):NaN;if(M.lane==="runnable"){let Q=Number.isFinite(w)?w:M.place_index;if(!Number.isFinite(Q))return;I("worker-queue-place",{bead_id:M.bead_id,index:Q},M.root_dir,M.revision);return}if(M.lane!=="queue"||le&&le.getAttribute("data-issue-id")===M.bead_id)return;let H=M.queue_index,z=Number.isFinite(w)?H>w?w:w-1:M.queue_length-1;!Number.isFinite(z)||z<0||z===H||I("worker-queue-reorder",{bead_id:M.bead_id,to_index:z},M.root_dir,M.revision)}function ge(N){let q={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return c`${ga({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},done_range:_,token_total:ba(k.done),token_tooltip:ha(y())})}
      <div class="worker-lanes mon-lanes">
        ${bu.map(M=>{let se=q[M.lane],le=M.lane==="queue"?k.queue_groups.length>0?c`${k.queue_groups.map(w=>c`<div
                        class="mon-group"
                        data-root-dir=${w.root_dir}
                      >
                        ${ma(w)}
                        <div class="mon-group__list">
                          ${w.items.map(H=>va(H,N))}
                        </div>
                      </div>`)}`:void 0:se.length>0?c`${se.map(w=>va(w,N))}`:void 0;return Ft({id:`monitor-${M.lane}`,lane:M.pane,title:M.lane==="done"?`\uC644\uB8CC\xB7${y()}`:M.title,items:se,empty:M.empty,body:le,live:M.lane==="running"&&se.length>0,header_control:M.lane==="pr_wait"&&se.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function He(){let N=s&&s.get?s.get():null,q=s&&s.getWorkspacesState?s.getWorkspacesState():[],M=d();k=Ms(N,q,{done_since:gr(_,M)}),De(ge(M),A)}function be(N,q){let M=l?l():void 0;if(!q||!M||q===M||!a){n(N);return}a(q).then(()=>{n(N)}).catch(se=>{r("workspace switch for %s failed: %o",q,se)})}function Ce(N){return{root_dir:N.getAttribute("data-root-dir")||"",revision:Number(N.getAttribute("data-revision")||0)||0}}function P(N,q){let{root_dir:M,revision:se}=Ce(N),le=N.getAttribute("data-issue-id")||"",w=N.getAttribute("data-attempt-id")||"",H=q.classList;if(H.contains("worker-card__place")){I("worker-queue-place",{bead_id:le,index:Number(N.getAttribute("data-place-index")||0)||0},M,se);return}if(H.contains("mon-op--up")||H.contains("mon-op--down")){let z=Number(N.getAttribute("data-queue-index")||0)||0,Q=H.contains("mon-op--up")?z-1:z+1;if(Q<0)return;I("worker-queue-reorder",{bead_id:le,to_index:Q},M,se);return}if(H.contains("mon-op--remove")){I("worker-queue-remove",{bead_id:le},M,se);return}if(H.contains("mon-op--pause")){j("worker-attempt-pause",{attempt_id:w},M);return}if(H.contains("mon-op--stop")){j("worker-attempt-stop",{attempt_id:w},M);return}if(H.contains("mon-op--resume")){I("worker-attempt-resume",{attempt_id:w},M,se);return}if(H.contains("mon-op--dismiss")){I("worker-attempt-dismiss",{attempt_id:w},M,se);return}if(H.contains("worker-mini__merge")){I("worker-merge-queue-add",{bead_id:le},M,se);return}if(H.contains("worker-mini__merge-cancel")){I("worker-merge-queue-remove",{bead_id:le},M,se);return}if(H.contains("worker-mini__discard")){if(!p(`${le}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;I("worker-pr-discard",{bead_id:le},M,se);return}if(H.contains("worker-mini__revise-fix")){I("worker-revise-fix",{bead_id:le},M,se);return}H.contains("worker-mini__revise-approve")&&I("worker-revise-approve",{bead_id:le},M,se)}function O(N){let q=Ae;Ae=!1;let M=N.target;if(!M||typeof M.closest!="function"||M.closest("dialog")||M.closest("a"))return;let se=M.closest(".mon-auto-all");if(se){N.preventDefault(),ce(se.getAttribute("data-on")==="true");return}if(M.closest(".mon-merge-all")){N.preventDefault(),he();return}let w=M.closest(".mon-ctl--advance");if(w){N.preventDefault();let{root_dir:Pe,revision:et}=Ce(w);I("worker-queue-toggle",{on:w.getAttribute("data-on")==="true"},Pe,et);return}let H=M.closest(".mon-ctl--merge-auto");if(H){N.preventDefault();let{root_dir:Pe,revision:et}=Ce(H);I("worker-merge-auto-toggle",{on:H.getAttribute("data-on")==="true"},Pe,et);return}let z=M.closest(".mon-ctl--exec");if(z){N.preventDefault(),b=z.getAttribute("data-root-dir")||null,T.delete(b||""),U.open();return}let Q=M.closest(".mon-card");if(!Q)return;let ie=M.closest("button");if(ie){N.preventDefault(),P(Q,ie);return}let Te=Q.getAttribute("data-issue-id");Te&&!q&&(N.preventDefault(),be(Te,Q.getAttribute("data-root-dir")||""))}function te(N){let q=N.target;if(!q||typeof q.closest!="function")return;let M=q.closest(".mon-done-range");if(M){_=Ut(M.value)?M.value:Tt,gu(_),He();return}let se=q.closest(".mon-slots__input");if(!se)return;let{root_dir:le,revision:w}=Ce(se),H=Number(se.value);if(!Number.isFinite(H))return;let z=Math.max(Zr,Math.floor(H));I("worker-queue-set-slots",{slots:z},le,w)}e.addEventListener("click",O),e.addEventListener("change",te),e.addEventListener("dragstart",L),e.addEventListener("dragover",X),e.addEventListener("dragleave",ye),e.addEventListener("drop",ke),e.addEventListener("dragend",ne),s&&typeof s.subscribe=="function"&&(E=s.subscribe(()=>{try{T.clear(),He();for(let N of Array.from(Y))N()}catch{}}));function $e(){S!==null&&(clearInterval(S),S=null)}function xe(){Re!==null&&(clearTimeout(Re),Re=null)}return{load(){r("load"),He(),S===null&&(S=setInterval(()=>{try{He()}catch{}},hu))},pause(){$e()},clear(){$e(),xe(),E&&(E(),E=null),e.removeEventListener("click",O),e.removeEventListener("change",te),e.removeEventListener("dragstart",L),e.removeEventListener("dragover",X),e.removeEventListener("dragleave",ye),e.removeEventListener("drop",ke),e.removeEventListener("dragend",ne),U.destroy(),Y.clear(),e.replaceChildren()}}}function $a(e,t,r){let n=rt("views:nav"),s=null;function o(a){return d=>{d.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let a=t.getState(),d=a.view==="worker"||a.view==="monitor"?a.view:"board";return c`
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
    `}function l(){De(i(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),De(c``,e)}}}var xa=["bug","feature","task","epic","chore"];function Sa(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Aa=["Critical","High","Medium","Low","Backlog"];function Ta(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),y=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let S of xa){let I=document.createElement("option");I.value=S,I.textContent=Sa(S),o.appendChild(I)}i.replaceChildren();for(let S=0;S<=4;S+=1){let I=document.createElement("option");I.value=String(S);let j=Aa[S]||"Medium";I.textContent=`${S} \u2013 ${j}`,i.appendChild(I)}}A();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function b(E){s.disabled=E,o.disabled=E,i.disabled=E,l.disabled=E,a.disabled=E,p.disabled=E,_.disabled=E,_.textContent=E?"Creating\u2026":"Create"}function T(){d.textContent=""}function Y(E){d.textContent=E}function V(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?i.value=S:i.value="2"}catch{o.value="",i.value="2"}}function ee(){let E=o.value||"",S=i.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function U(){T();let E=String(s.value||"").trim();if(E.length===0){Y("Title is required"),s.focus();return}let S=Number(i.value||"2");if(!(S>=0&&S<=4)){Y("Priority must be 0..4"),i.focus();return}let I=String(o.value||""),j=String(a.value||""),ce={title:E};I.length>0&&(ce.type=I),String(S).length>0&&(ce.priority=S),j.length>0&&(ce.description=j),b(!0);try{await t("create-issue",ce)}catch{b(!1),Y("Failed to create issue");return}ee(),b(!1),k()}return r.addEventListener("cancel",E=>{E.preventDefault(),k()}),y.addEventListener("click",()=>k()),p.addEventListener("click",()=>k()),r.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),U())}),n.addEventListener("submit",E=>{E.preventDefault(),U()}),{open(){n.reset(),T(),V();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var vu=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ea(e){return String(e).padStart(2,"0")}function yu(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function wu(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Ea(n.getHours())}:${Ea(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${vu[n.getMonth()]} ${n.getDate()} ${o}`;return`${yu(r,t)} \xB7 ${l}`}function ku(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Ca(e){let t=!1,r=null;function n(){De(c``,e),e.hidden=!0}async function s(){try{let o=await fetch("/api/claude-usage");if(!o.ok)throw new Error(`usage request failed: ${o.status}`);let i=await o.json();if(t)return;if(!i||i.available!==!0||!Array.isArray(i.windows)){n();return}let l=typeof i.ageSeconds=="number"&&i.ageSeconds>600,a=l?`${Math.floor(i.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",d=Date.now();De(c`<div
          class="usage-meter${l?" usage-meter--stale":""}"
          aria-label="Claude Code usage"
        >
          ${i.windows.map(p=>{let _=typeof p.pct=="number"&&Number.isFinite(p.pct)?p.pct:0,y=Math.min(100,Math.max(0,_)),k=`resets ${wu(p.resetsAt,d)}${l?` \xB7 ${a}`:""}`;return c`<span
              class="usage-meter__window ${ku(_)}"
              style=${`--progress: ${y}%`}
              title=${k}
            >
              <span class="usage-meter__label">${p.key}</span>
              <span class="usage-meter__track" aria-hidden="true">
                <span class="usage-meter__fill"></span>
              </span>
              <span class="usage-meter__pct">${_}%</span>
            </span>`})}
        </div>`,e),e.hidden=!1}catch{t||n()}}return n(),s(),r=setInterval(()=>{s()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),n()}}}var $u="tab:worker:ready",xu="tab:worker:blocked",Su="tab:worker:in-progress",Jr=1;function Ra(e){return Yr(e).path.length>0}var Oa="beads-ui.worker.candidate-filter",Fs={show_blocked:!1,spec:"all"};function Au(){try{let e=window.localStorage.getItem(Oa);if(!e)return{...Fs};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Fs};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Fs}}}function Tu(e){try{window.localStorage.setItem(Oa,JSON.stringify(e))}catch{}}function Eu(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of e){let a=r(l),d=n(l);a&&d?s.push(l):!a&&d?o+=1:a&&!d&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Cu=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ma="bdui.worker.candidate_sort",Ru=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Pn="spec";function Iu(){try{let e=window.localStorage.getItem(Ma);return e==="board"||e==="created"||e==="spec"?e:Pn}catch{return Pn}}function Lu(e){try{window.localStorage.setItem(Ma,e)}catch{}}var Pa="bdui.worker.done-range";function Du(){try{let e=window.localStorage.getItem(Pa);return Ut(e)?e:Tt}catch{return Tt}}function Ou(e){try{window.localStorage.setItem(Pa,e)}catch{}}var Mu="(max-width: 640px)",Na="beads-ui.worker.lane-collapsed",en={queue:!0,done:!0};function Pu(){try{let e=window.localStorage.getItem(Na);if(!e)return{...en};let t=JSON.parse(e);return!t||typeof t!="object"?{...en}:{queue:typeof t.queue=="boolean"?t.queue:en.queue,done:typeof t.done=="boolean"?t.done:en.done}}catch{return{...en}}}function Nu(e){try{window.localStorage.setItem(Na,JSON.stringify(e))}catch{}}function Ia(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Fu(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(ir):(n.sort(ln(r)),t==="board"?n:[...n.filter(Ra),...n.filter(s=>!Ra(s))])}function qu(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Bu(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Uu(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var zu=["closed_unmerged","undecidable"],Hu=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function ju(e,t){for(let r of Hu)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var qs=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Wu(e){if(typeof e!="string"||e.length===0)return null;let t=qs.length,r=qs.findIndex(n=>n.step===e);return r<0?{label:e,index:0,total:t,percent:0}:{label:qs[r].label,index:r+1,total:t,percent:Math.round((r+1)/t*100)}}function La(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Da(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Gu(e,t,r,n,s=null,o=null,i=null,l=!1,a=null,d=!0,p=null,_=null){let y=!!a&&a.position>0,A=!!a&&a.active===!0,k=a&&a.failure||null,b=r[e]||null,T=b&&b.gate?b.gate:null,Y=b&&b.pr?b.pr:null,V=[];l&&V.push("\uC138\uC158");let ee=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,U=ju(l&&T&&T.tier==="closed_unmerged"?"\uB2EB\uD798":T&&T.gate_badge||"",ee?null:o&&o.activity||null);ee&&V.push(ee),U.label&&V.push(U.label),T&&T.base_badge&&T.base_badge!==T.gate_badge&&V.push(T.base_badge),_&&V.push(_),n&&V.push("\uC815\uB9AC \uC2E4\uD328"),y&&!A&&V.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),k&&V.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${La(k)}`),p&&V.push(`\uC790\uB3D9 \uC81C\uC678: ${La(p)}`);let E=!!T&&T.base_badge==="\uCDA9\uB3CC",S=!!T&&T.enabled===!0,I=Wu(o&&o.merge_progress?o.merge_progress.step:null),j=!!n&&!!T&&T.tier==="merged",ce=l&&!!T&&T.tier==="merged",he=l&&E&&d===!1;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:Y&&typeof Y.number=="number"?Y.number:null,pr_url:Y&&typeof Y.url=="string"?Y.url:"",badges:V,live_badge:i==="running"?ee:ee?null:U.live?U.label:null,usage:s,alert:!!T&&zu.includes(T.tier)||!!n||!!k,merge_action:!y,cancel_action:y,cancel_enabled:!A,cancel_title:A?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(T&&T.tier==="merged"),merge_step:I,discard_enabled:!I&&!i&&!y,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":y?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!I&&!i&&!he&&(S||E||j||ce),merge_label:ce?"\uC815\uB9AC":E&&!I&&!j?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:I?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${I.label}`:ce?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":he?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":j?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":E?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?`\uBA38\uC9C0 (${T.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:T&&T.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${T&&T.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Bs(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:i,uiOrderStore:l,gotoIssue:a,getWorkspacePath:d}=t,p=n?dn(n,l):null,_=pn({transport:r,uiOrderStore:l}),y=null,A=[],k=Au(),b=Iu(),T=Du();function Y(){let u=Pt.find(g=>g.value===T);return u?u.label:"\uC624\uB298"}let V=Pu(),ee=!1,U=new Set,E=new Set,S=[],I=document.createElement("div");I.className="worker-console";let j=document.createElement("div");j.className="worker-top";let ce=document.createElement("div");ce.className="worker-drawer-overlay",ce.hidden=!0;let he=document.createElement("div");he.className="worker-drawer-overlay__backdrop";let pe=document.createElement("div");pe.className="worker-drawer-host",ce.append(he,pe);let Ae=document.createElement("div");Ae.className="worker-lanes-host",I.append(j,ce,Ae),e.appendChild(I);let Re=null,Je=Rn(pe,{transport:r,sessionLogStore:i,onClose:()=>{Re=null,ce.hidden=!0,Qe()}}),Xe=On(I,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:d});function Me(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:Jr,queue:[],pr_wait:[],done:[]}}function me(){let u=Me();return typeof u.revision=="number"?u.revision:0}function L(u){u&&u.queue&&s&&s.set(u.queue)}function X(){let u=Me().queue;return Array.isArray(u)?u.length:0}async function ye(u,g){if(!r)return;let R=await r("worker-queue-place",{bead_id:u,index:g,expected_revision:me()});L(R),R&&R.conflict&&await r("worker-queue-place",{bead_id:u,index:g,expected_revision:me()}).then(L)}async function ne(u,g){if(!r)return;let R=await r("worker-queue-reorder",{bead_id:u,to_index:g,expected_revision:me()});L(R),R&&R.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:g,expected_revision:me()}).then(L)}async function ke(u){if(!r)return;let g=await r("worker-queue-remove",{bead_id:u,expected_revision:me()});L(g),g&&g.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:me()}).then(L)}async function ge(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function He(u){if(!r||!u)return;let g=await r("worker-attempt-pause",{attempt_id:u});g&&g.paused===!1&&g.reason&&re(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function be(u){if(!r||!u)return;let g=await r("worker-attempt-resume",{attempt_id:u,expected_revision:me()});L(g),g&&g.conflict&&(g=await r("worker-attempt-resume",{attempt_id:u,expected_revision:me()}),L(g)),g&&g.resumed===!1&&!g.conflict&&g.reason&&re(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function Ce(u){if(!r||!u)return;let g=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:me()});L(g),g&&g.conflict&&(g=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:me()}),L(g)),g&&g.dismissed===!1&&!g.conflict&&g.reason&&re(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function P(u,g){if(!r)return null;let R=r,ae=await R(u,{...g,expected_revision:me()});return L(ae),ae&&ae.conflict&&(ae=await R(u,{...g,expected_revision:me()}),L(ae)),ae}async function O(u){if(!r||!u)return;U.add(u),Qe();let g;try{g=await P("worker-merge-queue-add",{bead_id:u})}finally{U.delete(u),Qe()}!g||g.conflict||g.applied||re("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function te(u){if(!r)return;let g=await P("worker-merge-auto-toggle",{on:u});!g||g.conflict||re(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function $e(u){if(!r||!u)return;let g=await P("worker-merge-queue-remove",{bead_id:u});g&&!g.conflict&&!g.applied&&g.reason==="merge_active"&&re("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function xe(){await P("worker-merge-queue-remove",{all:!0})}async function N(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let R=await r("worker-pr-discard",{bead_id:u,expected_revision:me()});if(L(R),R&&R.conflict&&(R=await r("worker-pr-discard",{bead_id:u,expected_revision:me()}),L(R)),R&&R.discarded===!0){re("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}R&&R.discarded===!1&&!R.conflict&&re(`\uD3D0\uAE30 \uAC70\uBD80: ${R.reason||""}`,"error",2800)}async function q(u,g){if(!r||!g||E.has(g))return;E.add(g),Qe();let R;try{R=await r(u,{bead_id:g,expected_revision:me()}),L(R),R&&R.conflict&&(R=await r(u,{bead_id:g,expected_revision:me()}),L(R))}finally{E.delete(g),Qe()}if(!(!R||R.conflict)){if(R.ok){re(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}re(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function M(u){if(!r)return;let g=await r("worker-queue-toggle",{on:u,expected_revision:me()});L(g),g&&g.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:me()}).then(L)}async function se(u){await M(u),await te(u)}async function le(u){if(!r||!Number.isFinite(u))return;let g=Math.max(Jr,Math.floor(u)),R=await r("worker-queue-set-slots",{slots:g,expected_revision:me()});L(R),R&&R.conflict&&await r("worker-queue-set-slots",{slots:g,expected_revision:me()}).then(L)}async function w(u){if(!r)return;let g=await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:me()});L(g),g&&g.conflict&&await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:me()}).then(L)}function H(){let u=Me(),g=p?p.selectBoardColumn($u,"ready"):[],R=p?p.selectBoardColumn(xu,"blocked"):[],ae=p?p.selectBoardColumn(Su,"in_progress"):[],qe=new Map;for(let $ of ae){let K=Bu($);if(!K)continue;let ue=qe.get(K);ue?ue.push($):qe.set(K,[$])}let Ve=$=>{let K=un(qe.get($)||[]);return K?K.title||K.id:null},Ue=u.bead_titles||{},Ke=new Map;for(let[$,K]of Object.entries(Ue))typeof K=="string"&&K.length>0&&Ke.set($,K);for(let $ of[...g,...R])Ke.set($.id,$.title||$.id);let nt=u.bead_times||{},ft=new Map;for(let[$,K]of Object.entries(nt))K&&typeof K=="object"&&ft.set($,K);for(let $ of[...g,...R])ft.set($.id,{created_at:$.created_at,updated_at:$.updated_at});let tt=$=>ft.get($)||{},lt=u.pr_wait||[],Se=u.pr_observations||{},ut=u.pr_activity||{},xt=u.cleanup_failed||{},we=Object.entries(xt).map(([$,K])=>({bead_id:$,step:K&&K.step?K.step:"",reason:K&&K.reason?K.reason:"",detail:K&&typeof K.detail=="string"?K.detail:null,output_tail:K&&typeof K.output_tail=="string"&&K.output_tail?K.output_tail:void 0,log_path:K&&typeof K.log_path=="string"&&K.log_path?K.log_path:void 0})),Le=u.queue||[],At=new Set([...Le.map($=>$.bead_id),...lt.map($=>$.bead_id),...u.done.map($=>$.bead_id)]),Yt=new Set(R.map($=>$.id)),Vt=l?l.get()?.order||{}:{},Mt=new Set,qt=[];for(let $ of[...g,...R])At.has($.id)||Mt.has($.id)||qu($)||(Mt.add($.id),qt.push($));A=Fu(qt,b,Vt);let oe=u.admission||{},h=$=>{let K=oe[$];if(!K)return"";if(K.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ue=typeof K.reason=="string"?K.reason:"",Ze=ue.indexOf(":");return Ze>0&&Ze<ue.length-1?`\u26D4 ${ue.slice(0,Ze)} (${ue.slice(Ze+1)})`:`\u26D4 ${ue}`},B=A.map($=>{let K=Yr($),ue=K.path.length>0,Ze=$.workflow?.route==="quick_fix"||$.metadata&&$.metadata.route==="quick_fix",qn=!Ze&&ue&&!K.conflict,to=Yt.has($.id),fr=[];to&&fr.push(Uu($)),Ze?fr.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):K.conflict?fr.push("spec_id_conflict"):ue||fr.push("spec \uC5C6\uC74C");let ro=h($.id);return ro&&fr.push(ro),{id:$.id,title:$.title||$.id,reason:fr.join(" \xB7 "),draggable:qn,lane:"candidate",created_at:$.created_at,updated_at:$.updated_at,workflow:$.workflow,is_quick_fix:Ze,status:$.status,blocked:to,has_spec:ue}}),f=Eu(B,k),v=f.visible,Z=u.revise_parked||{},J=($,K)=>$.map(ue=>{let Ze=K==="queue"?Z[ue.bead_id]:null;return{id:ue.bead_id,title:Ke.get(ue.bead_id)||ue.bead_id,reason:K==="done"?"":h(ue.bead_id),draggable:K!=="done",done:K==="done",lane:K,badges:Ze?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ze,revise_action:!!Ze,revise_enabled:!!Ze&&!E.has(ue.bead_id),revise_title:Ze?Ze.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ze.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:K==="done"?Nt(u.attempts||{},ue.bead_id):null,done_at:K==="done"&&typeof ue.added_at=="number"?ue.added_at:void 0,...tt(ue.bead_id)}}),G=new Map;for(let $ of u.done)$&&typeof $.bead_id=="string"&&typeof $.added_at=="number"&&G.set($.bead_id,$.added_at);let m=u.attempts?Object.values(u.attempts):[],C=new Set;for(let $ of m)$&&typeof $.resumed_from=="string"&&$.resumed_from.length>0&&C.add($.resumed_from);let x=new Map;for(let $ of m)x.set($.bead_id,$.attempt_id);let W=new Map;for(let $ of m)W.set($.attempt_id,$);function Oe($){let K=new Set,ue=$;for(;ue&&!K.has(ue.attempt_id);){if(ue.conflict_resolution===!0)return!0;K.add(ue.attempt_id),ue=typeof ue.resumed_from=="string"&&ue.resumed_from.length>0&&W.get(ue.resumed_from)||null}return!1}let st=typeof u.declared_base=="string"?u.declared_base:null;function bt($){let K=null;for(let ue of m)!ue||ue.bead_id!==$||Oe(ue)||(K===null||(typeof ue.started_at=="number"?ue.started_at:0)>=(typeof K.started_at=="number"?K.started_at:0))&&(K=ue);return K&&typeof K.target_base=="string"?K.target_base:null}let Ie=[],_t=null;for(let $ of m){let K=$.status==="paused"&&!C.has($.attempt_id);if($.status==="running"||K)Ie.push({bead_id:$.bead_id,attempt_id:$.attempt_id,title:Ke.get($.bead_id)||$.bead_id,runner:$.runner||null,model:$.model||null,effort:$.effort||null,started_at:typeof $.started_at=="number"?$.started_at:null,resumed_from:$.resumed_from||null,paused:K,conflict_resolution:Oe($),base_exception:Da(st,$.target_base),can_pause:typeof $.session_id=="string"&&$.session_id.length>0,usage:Nt(u.attempts||{},$.bead_id),current_child:Ve($.bead_id),...tt($.bead_id)});else if($.status==="failed"||$.status==="orphaned"){let ue=x.get($.bead_id)!==$.attempt_id,Ze=G.get($.bead_id),qn=typeof Ze=="number"&&Ze>0&&typeof $.finished_at=="number"&&Ze>=$.finished_at;!ue&&!qn&&typeof $.dismissed_at!="number"&&(_t=$)}}let tn=null;if(_t){let $=typeof _t.session_id=="string"&&_t.session_id.length>0,K=C.has(_t.attempt_id),ue=_t.cause_detail;tn={repo:_t.repo||"",reason:_t.cause||_t.status,cause_detail:ue&&typeof ue.reason=="string"?{reason:ue.reason,command:typeof ue.command=="string"?ue.command:null}:null,resume_attempt_id:_t.attempt_id,resume_eligible:$&&!K,resume_reason:$?K?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Ka=new Set(Ie.map($=>$.bead_id)),Nn=Array.isArray(u.merge_queue)?u.merge_queue:[],js=new Map;Nn.forEach(($,K)=>{$&&typeof $.bead_id=="string"&&js.set($.bead_id,K+1)});let Ws=u.merge_queue_state||{active:null,failures:{}},Za=Ws.failures||{},Xa=u.auto_merge_skips||{},Gs=$=>{let K=Xa[$];if(!K)return null;let ue=Se[$],Ze=ue&&ue.pr?ue.pr.head_sha:null;return Ze&&Ze===K.head_sha?K.reason||"":null},rn=new Map;for(let $ of Ie)$.conflict_resolution&&($.paused?rn.has($.bead_id)||rn.set($.bead_id,"paused"):rn.set($.bead_id,"running"));let Ys=Ie.filter($=>!$.paused).length,Vs=(u.workspace_info||{}).slots,Qa=typeof Vs=="number"?Vs:typeof u.slots=="number"?u.slots:Jr,Ks=u.pr_wait_holds_slot===!0?Jr:Qa,Ja=Ys>Ks,Zs=gr(T),el=(Array.isArray(u.done)?u.done.slice():[]).filter($=>Zs===void 0||typeof $.added_at!="number"||$.added_at>=Zs).sort(($,K)=>(K.added_at||0)-($.added_at||0)),Xs=J(el,"done"),nn={};for(let $ of zt)nn[$]=0;let Qs=!1,Js=0,Fn=0,eo=0;for(let $ of Xs){let K=$.usage;if(K&&typeof K=="object"){let ue=!1;for(let Ze of zt)Number.isFinite(K[Ze])&&(nn[Ze]+=K[Ze],Qs=!0,ue=!0);ue&&(Fn+=1,Number.isFinite(K.total_cost_usd)&&(Js+=K.total_cost_usd,eo+=1))}}Fn>0&&eo===Fn&&(nn.total_cost_usd=Js);let tl=Qs?It(nn):null;return{queue:u,idToTitle:Ke,candidates:v,candidate_hidden:{blocked:f.hidden_blocked,spec:f.hidden_spec},running:Ie,live_count:Ys,slots:Ks,over_cap:Ja,failure:tn,waiting:J(Le.filter($=>!Ka.has($.bead_id)),"queue"),pr_wait:lt.map($=>Gu($.bead_id,Ke.get($.bead_id)||$.bead_id,Se,xt[$.bead_id]||null,Nt(u.attempts||{},$.bead_id),ut[$.bead_id]||(U.has($.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),rn.get($.bead_id)||null,$.external===!0,{position:js.get($.bead_id)||0,active:Ws.active===$.bead_id,failure:Za[$.bead_id]||null},$.wt_present!==!1,u.auto_merge===!0?Gs($.bead_id):null,Da(st,bt($.bead_id)))).map($=>({...$,...tt($.id)})),merge_queue_length:Nn.length,merge_queue_running:Nn.length>0,auto_excluded:lt.map($=>$.bead_id).filter($=>Gs($)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:st,done:Xs,token_total:tl,cleanup_failures:we}}function z(u){let g=u.waiting.length>0?u.waiting[0].id:"\u2014",R=c`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,ae=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,qe=c`<button
      type="button"
      class="worker-auto-all${ae?" is-active":""}"
      title=${ae?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${ae?"true":"false"}
    >
      ${ae?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,Ve=u.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ue=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${Y()} 완료 <b>${u.done.length}</b></span
      >`,Ke=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,nt=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Jr}
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
      </button>`,ft=ia({failure:u.failure,cleanupFailures:u.cleanup_failures});return ee?c`<div class="worker-ribbon">
          ${R}
          <div class="worker-kpi worker-kpi--ribbon">${Ve}${Ue}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${qe}${nt}</div>
          <div class="worker-kpi">${Ke}</div>
        </div>
        ${ft}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${R}${qe}${nt}</div>
        <div class="worker-kpi">
          ${Ve}${Ue}${Ke}
          ${u.token_total?c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${Y()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${Y()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${g}</b></span
          >
        </div>
      </div>
      ${ft}`}function Q(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let g=u.running.some(R=>!R.paused);return c`<section
      class="worker-now${g?" worker-pane--live":""}"
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
        ${Ye(u)}
      </header>
      ${u.running.length>0?Is(u.running,Date.now(),Re):""}
      ${u.pr_wait.map(R=>Cs(R))}
    </section>`}function ie(u){let g=u.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒 blocked${g.blocked>0?` ${g.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Cu.map(R=>c`<button
              type="button"
              class="worker-filter__chip${k.spec===R.value?" is-active":""}"
              data-spec=${R.value}
              aria-pressed=${k.spec===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${g.spec>0?c`<span class="worker-filter__hidden">숨김 ${g.spec}</span>`:""}
      </div>
    </div>`}function Te(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${b}
    >
      ${Ru.map(u=>c`<option value=${u.value} ?selected=${b===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function Pe(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${T}
      >
        ${Pt.map(u=>c`<option value=${u.value} ?selected=${T===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function et(u){let g=(u.queue.pr_wait||[]).filter(ae=>ae&&ae.external!==!0&&typeof ae.bead_id=="string"),R=new Set(u.running.filter(ae=>!ae.paused).map(ae=>ae.bead_id));for(let ae of g)R.add(ae.bead_id);if(!(u.queue.pr_wait_holds_slot!==!0||u.queue.auto_advance!==!0||u.queue.auto_merge===!0||g.length===0||u.waiting.length===0||R.size<u.slots))return c`<div class="worker-stat worker-pr-wait-hint">
      PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
      꺼짐)
    </div>`}function Ye(u){let g=u.queue.auto_merge===!0;if(u.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${g?" is-active":""}"
        title=${g?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${g?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(g)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let R=new Set(u.auto_excluded),ae=u.pr_wait.filter(qe=>qe.merge_action&&qe.merge_enabled&&!R.has(qe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${ae>0?` ${ae}`:""}
    </button>`}function mt(u){let g=Ft({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Te(),controls:ie(u)});return ee?c`<div class="worker-lanes worker-lanes--mobile">
        ${Q(u)}
        ${Ft({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:et(u),collapsible:!0,collapsed:V.queue,preview:Ia(u.waiting)})}
        ${g}
        ${Ft({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${Y()} \uC644\uB8CC \uC5C6\uC74C`,controls:Pe(),collapsible:!0,collapsed:V.done,preview:u.token_total||Ia(u.done)})}
      </div>`:c`<div class="worker-lanes">
      ${g}
      ${Ft({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:et(u)})}
      ${Ft({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(R=>!R.paused),body:Is(u.running,Date.now(),Re)})}
      ${Ft({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:Ye(u)})}
      ${Ft({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${Y()} ${u.done.length}`,items:u.done,empty:`${Y()} \uC644\uB8CC \uC5C6\uC74C`,controls:Pe()})}
    </div>`}function ct(u){V={...V,[u]:!V[u]},Nu(V),Qe()}function Qe(){let u=H();De(z(u),j),De(mt(u),Ae)}function ht(){let u=document.querySelector(".app-header");if(!u)return;let g=()=>{let R=Math.round(u.getBoundingClientRect().height);I.style.setProperty("--worker-ribbon-top",`${R}px`)};if(g(),typeof ResizeObserver=="function"){let R=new ResizeObserver(g);R.observe(u),S.push(()=>R.disconnect())}else window.addEventListener("resize",g),S.push(()=>window.removeEventListener("resize",g))}function pt(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Mu);ee=!!u.matches;let g=R=>{let ae=!!(R&&typeof R.matches=="boolean"?R.matches:u.matches);ae!==ee&&(ee=ae,Qe())};typeof u.addEventListener=="function"?(u.addEventListener("change",g),S.push(()=>u.removeEventListener("change",g))):typeof u.addListener=="function"&&(u.addListener(g),S.push(()=>u.removeListener(g)))}function je(u){let g=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!g)return;let R=g.dataset.beadId||"",ae=g.dataset.lane||"";y={bead_id:R,from_lane:ae};try{u.dataTransfer?.setData("text/plain",R),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function dt(u){let g=u.target?.closest?.(".worker-pane");if(!g)return;let R=g.dataset.lane||"";R!=="candidate"&&R!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),g.classList.add("worker-pane--drag-over"))}function at(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function it(u,g){let R=A.find(Ue=>Ue.id===u);if(!R)return;let ae=A.filter(Ue=>Ue.id!==u),qe=ae.length;if(g){let Ue=g.dataset.beadId;if(Ue===u)return;let Ke=ae.findIndex(nt=>nt.id===Ue);Ke>=0&&(qe=Ke)}let Ve=ae.slice();Ve.splice(qe,0,R),_.applyReorder(u,Ve,qe)}function D(u){let g=u.target?.closest?.(".worker-pane");if(!g)return;u.preventDefault(),g.classList.remove("worker-pane--drag-over");let R=g.dataset.lane||"",ae=y?.bead_id||u.dataTransfer?.getData("text/plain")||"",qe=y?.from_lane||"";if(y=null,!ae)return;let Ve=u.target?.closest?.(".worker-mini, .worker-card"),Ue=Array.from(g.querySelectorAll(".worker-mini, .worker-card")),Ke=Ue.length;if(Ve){let nt=Ue.indexOf(Ve);nt>=0&&(Ke=nt)}if(g.classList.contains("worker-pane--collapsed")&&(Ke=X()),R==="candidate"){if(qe==="candidate"){it(ae,Ve);return}qe==="queue"&&ke(ae);return}R==="queue"&&(qe==="queue"?ne(ae,Ke):ye(ae,Ke))}function F(u){k=u,Tu(u),Qe()}function de(u){b=u==="board"||u==="created"||u==="spec"?u:Pn,Lu(b),Qe()}function fe(u){T=Ut(u)?u:Tt,Ou(T),Qe()}function _e(u){let g=u.target?.closest?.(".worker-filter__blocked");if(g){F({...k,show_blocked:g.checked});return}let R=u.target?.closest?.(".worker-done-range");if(R){fe(R.value);return}let ae=u.target?.closest?.(".worker-sort");if(ae){de(ae.value||Pn);return}let qe=u.target?.closest?.(".worker-pr-wait-hold");if(qe){w(qe.checked);return}let Ve=u.target?.closest?.(".worker-slots__input");if(!Ve)return;let Ue=Number.parseInt(Ve.value,10);if(!Number.isFinite(Ue)){Qe();return}le(Ue).then(Qe)}function ve(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function Ne(u){let g=Me(),R=g.attempts?g.attempts[u]:null;Re=u,ce.hidden=!1,Je.open({attempt_id:u,meta:ve(R)}),Qe()}function We(){if(!Re)return;let u=Me(),g=u.attempts?u.attempts[Re]:null;if(g){Je.updateMeta(ve(g));return}Je.close()}function Fe(u){let g=u.target;if(g?.closest?.("#worker-exec-defaults-dialog"))return;if(g?.closest?.(".worker-exec-defaults-btn")){Xe.open();return}let R=g?.closest?.(".worker-banner__resume");if(R){let we=R.dataset.attemptId;we&&be(we);return}let ae=g?.closest?.(".worker-banner__dismiss");if(ae){let we=ae.dataset.attemptId;we&&Ce(we);return}if(g?.closest?.(".worker-play")){M(!Me().auto_advance);return}if(g?.closest?.(".worker-auto-all")){let we=Me();se(!(we.auto_advance===!0&&we.auto_merge===!0));return}let qe=g?.closest?.(".worker-merge-all");if(qe){qe.classList.contains("worker-merge-all--stop")?Me().auto_merge===!0?te(!1):xe():te(!0);return}let Ve=g?.closest?.(".worker-pane__hd--toggle");if(Ve){let we=Ve.dataset.lane;(we==="queue"||we==="done")&&ct(we);return}let Ue=g?.closest?.(".worker-card__place");if(Ue){let we=Ue.dataset.beadId;we&&!Ue.disabled&&ye(we,X());return}let Ke=g?.closest?.(".worker-filter__chip");if(Ke){let we=Ke.dataset.spec;(we==="all"||we==="with"||we==="without")&&F({...k,spec:we});return}let nt=g?.closest?.(".worker-mini__merge");if(nt){O(nt.dataset.beadId||"");return}let ft=g?.closest?.(".worker-mini__merge-cancel");if(ft){$e(ft.dataset.beadId||"");return}let tt=g?.closest?.(".worker-mini__discard");if(tt){N(tt.dataset.beadId||"");return}let lt=g?.closest?.(".worker-mini__revise-fix");if(lt){q("worker-revise-fix",lt.dataset.beadId||"");return}let Se=g?.closest?.(".worker-mini__revise-approve");if(Se){q("worker-revise-approve",Se.dataset.beadId||"");return}if(g?.closest?.(".worker-mini__pr"))return;if(g?.closest?.(".rtile__stop")){let Le=g?.closest?.(".rtile")?.dataset?.attemptId;Le&&ge(Le);return}if(g?.closest?.(".rtile__pause")){let Le=g?.closest?.(".rtile")?.dataset?.attemptId;Le&&He(Le);return}if(g?.closest?.(".rtile__resume")){let Le=g?.closest?.(".rtile")?.dataset?.attemptId;Le&&be(Le);return}if(g?.closest?.(".rtile__session")){let Le=g?.closest?.(".rtile")?.dataset?.attemptId;Le&&Ne(Le);return}if(g?.closest?.(".worker-drawer-overlay__backdrop")){Je.close();return}if(g?.closest?.(".worker-drawer-host"))return;let ut=g?.closest?.(".rtile");if(ut){if(g?.closest?.(".rtile__id")){let Le=ut.dataset.beadId;Le&&lr(Le).then(At=>{At?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let we=ut.dataset.beadId;we&&a&&a(we);return}let xt=g?.closest?.(".worker-mini, .worker-card");if(xt){let we=xt.dataset.beadId;if(g?.closest?.(".worker-mini__id, .worker-card__id")){we&&lr(we).then(Le=>{Le?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}we&&a&&a(we)}}return e.addEventListener("dragstart",je),e.addEventListener("dragover",dt),e.addEventListener("dragleave",at),e.addEventListener("drop",D),e.addEventListener("click",Fe),e.addEventListener("change",_e),pt(),ht(),p&&S.push(p.subscribe(Qe)),s&&S.push(s.subscribe(()=>{Qe(),We()})),Qe(),{load(){Qe()},openExecDefaults(){Xe.open()},destroy(){for(let u of S.splice(0))try{u()}catch{}e.removeEventListener("dragstart",je),e.removeEventListener("dragover",dt),e.removeEventListener("dragleave",at),e.removeEventListener("drop",D),e.removeEventListener("click",Fe),e.removeEventListener("change",_e);try{Je.destroy()}catch{}ce.hidden=!0;try{Xe.destroy()}catch{}De(c``,e)}}}function Us(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Fa(e,t,r,n=async()=>{},s=async()=>{}){let o=rt("views:workspace-picker"),i=null,l=!1,a=!1,d=!1;async function p(S){let j=S.target.value,he=t.getState().workspace?.current?.path||"";if(j&&j!==he){o("switching workspace to %s",j),l=!0,E();try{await r(j)}catch(pe){o("workspace switch failed: %o",pe)}finally{l=!1,E()}}}async function _(){let S=t.getState(),I=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!I||a)){o("git-pulling workspace %s",I),a=!0,E();try{await n(I)}catch(j){o("workspace git pull failed: %o",j)}finally{a=!1,E()}}}function y(S){let I=S.target;I&&e.contains(I)||b()}function A(S){S.key==="Escape"&&b()}function k(){d||(d=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",A),E())}function b(){d&&(d=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",A),E())}function T(){d?b():k()}async function Y(S){let I=S.target,j=I.value,ce=I.checked;o("toggling visibility %s \u2192 %s",j,String(ce));try{await s(j,ce)}catch(he){o("workspace visibility toggle failed: %o",he)}}function V(S){return S?c`
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
    `:c``}function ee(S,I){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${T}
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
                ${S.map(j=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${j.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${j.path}"
                        .checked=${!I.has(j.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Us(j.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function U(){let S=t.getState(),I=S.workspace?.current,j=S.workspace?.available||[],ce=new Set(S.workspace?.hidden||[]),he=I?.path||j[0]?.path||"";if(j.length===0)return c``;let pe=j.filter(Ae=>!ce.has(Ae.path)||Ae.path===he);if(pe.length<=1){let Ae=pe[0]||j[0],Re=Us(Ae.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Ae.path}"
            >${Re}</span
          >
          ${ee(j,ce)}
          ${V(he)}
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
          ${pe.map(Ae=>c`
              <option
                value="${Ae.path}"
                ?selected=${Ae.path===he}
                title="${Ae.path}"
              >
                ${Us(Ae.path)}
              </option>
            `)}
        </select>
        ${ee(j,ce)}
        ${V(he)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){De(U(),e)}return E(),i=t.subscribe(()=>E()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",A),De(c``,e)}}}var qa=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function zs(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Ba(e,t,r=zs()){return{id:r,type:e,payload:t}}function Ua(e={}){let t=rt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,d=new Map,p=[],_=new Map,y=new Set;function A(U){for(let E of Array.from(y))try{E(U)}catch{}}function k(){if(!a||l)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let U=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),E=(r.jitterRatio||0)*U,S=Math.max(0,Math.round(U+(Math.random()*2-1)*E));t("ws retry in %d ms (attempt %d)",S,i+1),l=setTimeout(()=>{l=null,ee()},S)}function b(U){try{s?.send(JSON.stringify(U))}catch(E){t("ws send failed",E)}}function T(){for(o="open",t("ws open"),A(o),i=0;p.length;){let U=p.shift();U&&b(U)}}function Y(U){let E;try{E=JSON.parse(String(U.data))}catch{t("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){t("ws received invalid envelope");return}if(d.has(E.id)){let I=d.get(E.id);d.delete(E.id),E.ok?I?.resolve(E.payload):I?.reject(E.error||new Error("ws error"));return}let S=_.get(E.type);if(S&&S.size>0)for(let I of Array.from(S))try{I(E.payload)}catch(j){t("ws event handler error",j)}else t("ws received unhandled message type: %s",E.type)}function V(){o="closed",t("ws closed"),A(o);for(let[U,E]of d.entries())E.reject(new Error("ws disconnected")),d.delete(U);i+=1,k()}function ee(){if(!a)return;let U=n();try{s=new WebSocket(U),t("ws connecting %s",U),o="connecting",A(o),s.addEventListener("open",T),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",V)}catch(E){t("ws connect failed %o",E),k()}}return ee(),{send(U,E){if(!qa.includes(U))return Promise.reject(new Error(`unknown message type: ${U}`));let S=zs(),I=Ba(U,E,S);return t("send %s id=%s",U,S),new Promise((j,ce)=>{d.set(S,{resolve:j,reject:ce,type:U}),s&&s.readyState===s.OPEN?b(I):(t("queue %s id=%s (state=%s)",U,S,o),p.push(I))})},on(U,E){_.has(U)||_.set(U,new Set);let S=_.get(U);return S?.add(E),()=>{S?.delete(E)}},onConnection(U){return y.add(U),()=>{y.delete(U)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,ee()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Yu(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Vu(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Hs=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],za=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Ha=wa,ja="worker:queue",Wa="ui:order",Ga="ui:display-policy",Ya="exec:presets",er="tab:board:closed",Va="beads-ui.board.closed-range";function Ku(e){let t=rt("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;De(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),i=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),a=document.getElementById("detail-panel");if(s&&Ca(s),o&&i&&l&&a){let me=function(f,v){let Z="Request failed",J="";if(f&&typeof f=="object"){let m=f;if(typeof m.message=="string"&&m.message.length>0&&(Z=m.message),typeof m.details=="string")J=m.details;else if(m.details&&typeof m.details=="object")try{J=JSON.stringify(m.details,null,2)}catch{J=""}}else typeof f=="string"&&f.length>0&&(Z=f);let G=v&&v.length>0?`Failed to load ${v}`:"Request failed";Me.open(G,Z,J)},le=function(f){return`${Se.getState().workspace.current?.path||""}\0${f}`},w=function(){O&&(O().catch(()=>{}),O=null),te=null,$e=null},z=function(f){xe=f;let v=()=>{xe!==f||Se.getState().selected_id!==f||(xe=null,H(f))};if(!M){q.then(v);return}v()},Pe=function(f,v,Z,J,G){return Z!==Te[v]?(G().catch(()=>{}),!1):(f.set(J,G),!0)},et=function(){let f=Se.getState();ct(f.view==="board"),dt(f.view==="worker"),de(f.view==="monitor"),it(f.view==="worker"||!!f.selected_id)},mt=function(){let f=gr(Ye);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},ct=function(f){if(f)for(let[v,Z]of Hs){if(Q.has(v)||ie.has(v))continue;let J=v===er?mt():{type:Z};try{ne.register(v,J)}catch(C){t("register %s store failed: %o",v,C)}ie.add(v);let G=Te.board,m=!1;ye.subscribeList(v,J).then(C=>{m=!Pe(Q,"board",G,v,C)}).catch(C=>{t("subscribe %s failed: %o",v,C),me(C,"board")}).finally(()=>{ie.delete(v),m&&et()})}else ht()},ht=function(){Te.board+=1;for(let[f]of Hs){let v=Q.get(f);v&&(v().catch(()=>{}),Q.delete(f));try{ne.unregister(f)}catch(Z){t("unregister %s failed: %o",f,Z)}}},dt=function(f){if(!f){at();return}for(let[v,Z]of za){if(pt.has(v)||ie.has(v))continue;try{ne.register(v,{type:Z})}catch(m){t("register %s store failed: %o",v,m)}ie.add(v);let J=Te.worker,G=!1;ye.subscribeList(v,{type:Z}).then(m=>{G=!Pe(pt,"worker",J,v,m)}).catch(m=>{t("subscribe %s failed: %o",v,m),me(m,"worker")}).finally(()=>{ie.delete(v),G&&et()})}},at=function(){Te.worker+=1;for(let[f]of za){let v=pt.get(f);v&&(v().catch(()=>{}),pt.delete(f));try{ne.unregister(f)}catch(Z){t("unregister %s failed: %o",f,Z)}}},it=function(f){if(!f){D();return}je||(X("subscribe-worker-queue",{id:ja}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),je=()=>X("unsubscribe-worker-queue",{id:ja}))},D=function(){je&&(je().catch(()=>{}),je=null)},de=function(f){if(!f){fe();return}F||(X("subscribe-monitor-pipeline",{id:Ha}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),F=()=>X("unsubscribe-monitor-pipeline",{id:Ha}))},fe=function(){F&&(F().catch(()=>{}),F=null)},ve=function(){_e||(X("subscribe-ui-order",{id:Wa}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),_e=()=>X("unsubscribe-ui-order",{id:Wa}))},Ne=function(){_e&&(_e().catch(()=>{}),_e=null),He.clear()},Fe=function(){We||(X("subscribe-display-policy",{id:Ga}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),We=()=>X("unsubscribe-display-policy",{id:Ga}))},u=function(){We&&(We().catch(()=>{}),We=null),be.clear()},R=function(){g||(X("subscribe-exec-presets",{id:Ya}).catch(f=>{t("subscribe-exec-presets failed: %o",f)}),g=()=>X("unsubscribe-exec-presets",{id:Ya}))},nt=function(f){if(!f)return"Unknown";let v=f.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var d=me,p=le,_=w,y=z,A=Pe,k=et,b=mt,T=ct,Y=ht,V=dt,ee=at,U=it,E=D,S=de,I=fe,j=ve,ce=Ne,he=Fe,pe=u,Ae=R,Re=nt;let Je=document.getElementById("header-loading"),Xe=Fo(Je),Me=ea(e),L=Ua(),X=Xe.wrapSend((f,v)=>L.send(f,v)),ye=Io(X),ne=Lo(),ke=Oo(),ge=go(),He=Do(),be=_o(),Ce=mo(),P=ho();L.on("exec-presets-snapshot",f=>{let v=f;v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&Ce.set({revision:v.revision,presets:v.presets})}),L.on("monitor-pipeline-snapshot",f=>{let v=f;if(!(!v||!Array.isArray(v.workspaces)))try{ge.set(v.workspaces,v.workspaces_state)}catch{}}),L.on("ui-order-snapshot",f=>{let v=f;if(v&&typeof v.revision=="number")try{He.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),L.on("display-policy-snapshot",f=>{let v=f;if(v&&v.policy&&typeof v.policy=="object")try{be.set(v.policy)}catch{}}),L.on("session-log-snapshot",f=>{let v=f;if(v&&typeof v.attempt_id=="string")try{P.set(v.attempt_id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),L.on("session-log-append",f=>{let v=f;if(v&&typeof v.attempt_id=="string")try{P.append(v.attempt_id,v.event)}catch{}}),L.on("snapshot",f=>{let v=f,Z=v&&typeof v.id=="string"?v.id:"",J=Z?ne.getStore(Z):null;if(J&&v&&v.type==="snapshot")try{J.applyPush(v)}catch{}}),L.on("upsert",f=>{let v=f,Z=v&&typeof v.id=="string"?v.id:"",J=Z?ne.getStore(Z):null;if(J&&v&&v.type==="upsert")try{J.applyPush(v)}catch{}}),L.on("delete",f=>{let v=f,Z=v&&typeof v.id=="string"?v.id:"",J=Z?ne.getStore(Z):null;if(J&&v&&v.type==="delete")try{J.applyPush(v)}catch{}});let O=null,te=null,$e=null,xe=null,N=()=>{},q=new Promise(f=>{N=()=>f(void 0)}),M=!1,se=!1;async function H(f){let v=le(f);if(v===te||v===$e)return;$e=v;let Z=`detail:${f}`,J={type:"issue-detail",params:{id:f}};try{ne.register(Z,J)}catch(G){t("register detail store failed: %o",G)}try{let G=await ye.subscribeList(Z,J);if(Se.getState().selected_id!==f||le(f)!==v){await G().catch(()=>{});return}O&&await O().catch(()=>{}),O=G,te=v}catch(G){t("detail subscribe failed: %o",G),me(G,"issue details")}finally{$e===v&&($e=null)}}let Q=new Map,ie=new Set,Te={board:0,worker:0},Ye=Tt;try{let f=window.localStorage.getItem(Va);Ut(f)&&(Ye=f)}catch{}async function Qe(f){if(!Ut(f)||f===Ye)return;Ye=f;try{window.localStorage.setItem(Va,f)}catch{}let v=Q.get(er);if(!v)return;Q.delete(er),await v().catch(()=>{});let Z=mt();try{ne.register(er,Z)}catch(J){t("register %s store failed: %o",er,J)}try{let J=await ye.subscribeList(er,Z);Q.set(er,J)}catch(J){t("re-subscribe %s failed: %o",er,J),me(J,"board")}}let pt=new Map,je=null,F=null,_e=null,We=null,g=null;async function ae(){We=null,be.clear(),g=null,Ce.clear(),je=null,F=null,Q.clear(),pt.clear(),Te.board+=1,Te.worker+=1,R();let f=Se.getState().workspace.current?.path;if(f)try{await L.send("set-workspace",{path:f})}catch(Z){t("workspace restore after reconnect failed: %o",Z);return}Fe();let v=Se.getState();ct(v.view==="board"),dt(v.view==="worker"),de(v.view==="monitor"),it(v.view==="worker"||!!v.selected_id)}async function qe(){t("clearing all subscriptions for workspace switch"),ht(),at(),D(),ke.clear(),Ne(),ve(),u(),Fe(),w();let f=Se.getState();if(f.selected_id)try{ne.unregister(`detail:${f.selected_id}`)}catch{}let v=Se.getState();ct(v.view==="board"),dt(v.view==="worker"),de(v.view==="monitor"),it(v.view==="worker"||!!v.selected_id),v.selected_id&&z(v.selected_id)}async function Ve(f){t("requesting workspace switch to %s",f),se=!0;try{let v=await L.send("set-workspace",{path:f});t("workspace switch result: %o",v),v&&v.workspace&&(Se.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),v.changed&&(await qe(),re("Switched to "+nt(f),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),re("Failed to switch workspace","error",3e3),v}finally{se=!1}}async function Ue(f){t("requesting workspace git pull for %s",f);try{let v=await L.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let Z=v?.status;if(Z==="up_to_date"){re("Already up to date","success",2e3);return}if(Z==="stash_pop_conflict"){re("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}re("Git pulled "+nt(f),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let Z=v?.code,J=v?.message;if(Z==="rebase_conflict"){re("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Z==="rebase_conflict_abort_failed"){re("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Z==="busy"){re("Git pull skipped: another operation is running","warning",3e3);return}let G=J?`: ${J}`:"";throw re(`Git pull failed${G}`,"error",3e3),v}}async function Ke(f,v){t("setting workspace visibility %s \u2192 %s",f,String(v));try{await L.send("set-workspace-visibility",{path:f,visible:v}),await ft()}catch(Z){t("workspace visibility update failed: %o",Z),re("Failed to update project visibility","error",3e3)}}async function ft(){try{let f=await L.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let v=f.workspaces.map(m=>({path:m.path,database:m.database,pid:m.pid,version:m.version})),Z=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,J=Array.isArray(f.hidden)?f.hidden.filter(m=>typeof m=="string"):[];Se.setState({workspace:{current:Z,available:v,hidden:J}});let G=window.localStorage.getItem("beads-ui.workspace");G&&(!v.some(C=>C.path===G)||J.includes(G)?window.localStorage.removeItem("beads-ui.workspace"):Z&&G!==Z.path&&(t("restoring saved workspace preference: %s",G),await Ve(G)))}}catch(f){t("failed to load workspaces: %o",f)}}L.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(Se.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),ft(),qe())});let tt=!1;if(typeof L.onConnection=="function"){let f=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(tt=!0,re("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&tt&&(tt=!1,re("Reconnected","success",2200),Vu(Se,(Z,J)=>{t(`${Z}: %o`,J)}),ae())};L.onConnection(f)}let lt="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(lt=f)}catch(f){t("view parse error: %o",f)}let Se=No({config:Yu(),view:lt});L.on("worker-queue-snapshot",f=>{let v=f;if(!v||!v.queue)return;let Z=Se.getState().workspace.current?.path;if(typeof Z=="string"&&Z.length>0&&v.root_dir!==Z){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{ke.set(v.queue)}catch{}});let ut=Mo(Se);ut.start();let xt=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),we=async(f,v)=>{try{return await X(f,v)}catch(Z){if(xt.has(f))throw Z;return[]}};n&&$a(n,Se,ut);let Le=document.getElementById("workspace-picker");Le&&Fa(Le,Se,Ve,Ue,Ke);let At=Ta(e,(f,v)=>X(f,v));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>At.open())}catch{}let Yt=Ji(e,{policyStore:be,transport:(f,v)=>X(f,v),labelOptions:()=>{let f=new Set;for(let[v]of Hs)for(let Z of ne.snapshotFor(v)||[]){let J=Z.labels;if(Array.isArray(J))for(let G of J)typeof G=="string"&&G.length>0&&f.add(G)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>Yt.open())}catch{}let Vt=Yo(o,{gotoIssue:f=>ut.gotoIssue(f),issueStores:ne,transport:we,uiOrderStore:He,displayPolicyStore:be,closedRange:Ye,onClosedRangeChange:f=>{Qe(f)},onNewIssue:()=>At.open()}),Mt=Bs(i,{transport:we,issueStores:ne,queueStore:ke,execPresetStore:Ce,sessionLogStore:P,uiOrderStore:He,gotoIssue:f=>Se.setState({selected_id:f}),getWorkspacePath:()=>Se.getState().workspace.current?.path}),qt=ka(l,{transport:we,pipelineStore:ge,execPresetStore:Ce,gotoIssue:f=>ut.gotoIssue(f),getWorkspacePath:()=>Se.getState().workspace.current?.path,switchWorkspace:f=>Ve(f)}),oe=Xi(a,{issueStores:ne,transport:we,queueStore:ke,execPresetStore:Ce,sessionLogStore:P,getWorkspacePath:()=>Se.getState().workspace.current?.path,onNavigate:f=>{Se.getState().view==="worker"?Se.setState({selected_id:f}):ut.gotoIssue(f)},onClose:()=>{let f=Se.getState();Se.setState({selected_id:null});try{ut.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{Se.setState({selected_id:null}),ut.gotoView("worker"),Mt.openExecDefaults()}}),h=Se.getState().selected_id;h&&(a.hidden=!1,oe.load(h),z(h)),Se.subscribe(f=>{let v=f.selected_id;v?(a.hidden=!1,oe.load(v),se||z(v)):(oe.clear(),a.hidden=!0,w())});let B=f=>{o.hidden=f.view!=="board",i.hidden=f.view!=="worker",l.hidden=f.view!=="monitor",ct(f.view==="board"),dt(f.view==="worker"),de(f.view==="monitor"),it(f.view==="worker"||!!f.selected_id),!f.selected_id&&f.view==="board"&&Vt.load(),f.view==="worker"&&Mt.load(),f.view==="monitor"?qt.load():qt.pause(),window.localStorage.setItem("beads-ui.view",f.view)};Se.subscribe(B),B(Se.getState()),ve(),Fe(),R(),ft().finally(()=>{M=!0,N()}),window.addEventListener("keydown",f=>{let v=f.ctrlKey||f.metaKey,Z=String(f.key||"").toLowerCase(),J=f.target,G=J&&J.tagName?String(J.tagName).toLowerCase():"",m=G==="input"||G==="textarea"||G==="select"||J&&typeof J.isContentEditable=="boolean"&&J.isContentEditable;v&&Z==="n"&&(m||(f.preventDefault(),At.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Ku(t)});export{Ku as bootstrap,Yu as readBootstrapConfig,Vu as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
