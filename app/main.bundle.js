var Oo=Object.create;var Cr=Object.defineProperty;var Mo=Object.getOwnPropertyDescriptor;var No=Object.getOwnPropertyNames;var Po=Object.getPrototypeOf,Fo=Object.prototype.hasOwnProperty;var Bo=(t,e,r)=>e in t?Cr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Rr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var zo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of No(e))!Fo.call(t,s)&&s!==r&&Cr(t,s,{get:()=>e[s],enumerable:!(n=Mo(e,s))||n.enumerable});return t};var qo=(t,e,r)=>(r=t!=null?Oo(Po(t)):{},zo(e||!t||!t.__esModule?Cr(r,"default",{value:t,enumerable:!0}):r,t));var de=(t,e,r)=>Bo(t,typeof e!="symbol"?e+"":e,r);var Kn=Rr((gl,Zn)=>{var At=1e3,Tt=At*60,Et=Tt*60,gt=Et*24,jo=gt*7,Yo=gt*365.25;Zn.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Vo(t);if(r==="number"&&isFinite(t))return e.long?Ko(t):Zo(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Vo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Yo;case"weeks":case"week":case"w":return r*jo;case"days":case"day":case"d":return r*gt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Et;case"minutes":case"minute":case"mins":case"min":case"m":return r*Tt;case"seconds":case"second":case"secs":case"sec":case"s":return r*At;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Zo(t){var e=Math.abs(t);return e>=gt?Math.round(t/gt)+"d":e>=Et?Math.round(t/Et)+"h":e>=Tt?Math.round(t/Tt)+"m":e>=At?Math.round(t/At)+"s":t+"ms"}function Ko(t){var e=Math.abs(t);return e>=gt?or(t,e,gt,"day"):e>=Et?or(t,e,Et,"hour"):e>=Tt?or(t,e,Tt,"minute"):e>=At?or(t,e,At,"second"):t+" ms"}function or(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Qn=Rr((bl,Xn)=>{function Xo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Kn(),r.destroy=c,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let h=0;for(let _=0;_<u.length;_++)h=(h<<5)-h+u.charCodeAt(_),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(u){let h,_=null,$,y;function C(...M){if(!C.enabled)return;let O=C,P=Number(new Date),z=P-(h||P);O.diff=z,O.prev=h,O.curr=P,h=P,M[0]=r.coerce(M[0]),typeof M[0]!="string"&&M.unshift("%O");let I=0;M[0]=M[0].replace(/%([a-zA-Z%])/g,(w,x)=>{if(w==="%%")return"%";I++;let k=r.formatters[x];if(typeof k=="function"){let B=M[I];w=k.call(O,B),M.splice(I,1),I--}return w}),r.formatArgs.call(O,M),(O.log||r.log).apply(O,M)}return C.namespace=u,C.useColors=r.useColors(),C.color=r.selectColor(u),C.extend=n,C.destroy=r.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:($!==r.namespaces&&($=r.namespaces,y=r.enabled(u)),y),set:M=>{_=M}}),typeof r.init=="function"&&r.init(C),C}function n(u,h){let _=r(this.namespace+(typeof h>"u"?":":h)+u);return _.log=this.log,_}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let h=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of h)_[0]==="-"?r.skips.push(_.slice(1)):r.names.push(_)}function o(u,h){let _=0,$=0,y=-1,C=0;for(;_<u.length;)if($<h.length&&(h[$]===u[_]||h[$]==="*"))h[$]==="*"?(y=$,C=_,$++):(_++,$++);else if(y!==-1)$=y+1,C++,_=C;else return!1;for(;$<h.length&&h[$]==="*";)$++;return $===h.length}function i(){let u=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),u}function l(u){for(let h of r.skips)if(o(u,h))return!1;for(let h of r.names)if(o(u,h))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Xn.exports=Xo});var Jn=Rr((je,ir)=>{je.formatArgs=Jo;je.save=ei;je.load=ti;je.useColors=Qo;je.storage=ri();je.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();je.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Qo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Jo(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+ir.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}je.log=console.debug||console.log||(()=>{});function ei(t){try{t?je.storage.setItem("debug",t):je.storage.removeItem("debug")}catch{}}function ti(){let t;try{t=je.storage.getItem("debug")||je.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function ri(){try{return localStorage}catch{}}ir.exports=Qn()(je);var{formatters:ni}=ir.exports;ni.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Mt=globalThis,nr=Mt.trustedTypes,Mn=nr?nr.createPolicy("lit-html",{createHTML:t=>t}):void 0,qn="$lit$",lt=`lit$${Math.random().toFixed(9).slice(2)}$`,Un="?"+lt,Uo=`<${Un}>`,ht=document,Nt=()=>ht.createComment(""),Pt=t=>t===null||typeof t!="object"&&typeof t!="function",Pr=Array.isArray,Ho=t=>Pr(t)||typeof t?.[Symbol.iterator]=="function",Lr=`[ 	
\f\r]`,Ot=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Nn=/-->/g,Pn=/>/g,pt=RegExp(`>|${Lr}(?:([^\\s"'>=/]+)(${Lr}*=${Lr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fn=/'/g,Bn=/"/g,Hn=/^(?:script|style|textarea|title)$/i,Fr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),f=Fr(1),dl=Fr(2),ul=Fr(3),mt=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),zn=new WeakMap,ft=ht.createTreeWalker(ht,129);function Wn(t,e){if(!Pr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mn!==void 0?Mn.createHTML(e):e}var Wo=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Ot;for(let l=0;l<r;l++){let a=t[l],c,u,h=-1,_=0;for(;_<a.length&&(i.lastIndex=_,u=i.exec(a),u!==null);)_=i.lastIndex,i===Ot?u[1]==="!--"?i=Nn:u[1]!==void 0?i=Pn:u[2]!==void 0?(Hn.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=pt):u[3]!==void 0&&(i=pt):i===pt?u[0]===">"?(i=s??Ot,h=-1):u[1]===void 0?h=-2:(h=i.lastIndex-u[2].length,c=u[1],i=u[3]===void 0?pt:u[3]==='"'?Bn:Fn):i===Bn||i===Fn?i=pt:i===Nn||i===Pn?i=Ot:(i=pt,s=void 0);let $=i===pt&&t[l+1].startsWith("/>")?" ":"";o+=i===Ot?a+Uo:h>=0?(n.push(c),a.slice(0,h)+qn+a.slice(h)+lt+$):a+lt+(h===-2?l:$)}return[Wn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Ft=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,u]=Wo(e,r);if(this.el=t.createElement(c,n),ft.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=ft.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(qn)){let _=u[i++],$=s.getAttribute(h).split(lt),y=/([.?@])?(.*)/.exec(_);a.push({type:1,index:o,name:y[2],strings:$,ctor:y[1]==="."?Dr:y[1]==="?"?Or:y[1]==="@"?Mr:St}),s.removeAttribute(h)}else h.startsWith(lt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Hn.test(s.tagName)){let h=s.textContent.split(lt),_=h.length-1;if(_>0){s.textContent=nr?nr.emptyScript:"";for(let $=0;$<_;$++)s.append(h[$],Nt()),ft.nextNode(),a.push({type:2,index:++o});s.append(h[_],Nt())}}}else if(s.nodeType===8)if(s.data===Un)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(lt,h+1))!==-1;)a.push({type:7,index:o}),h+=lt.length-1}o++}}static createElement(e,r){let n=ht.createElement("template");return n.innerHTML=e,n}};function $t(t,e,r=t,n){if(e===mt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Pt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=$t(t,s._$AS(t,e.values),s,n)),e}var Ir=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??ht).importNode(r,!0);ft.currentNode=s;let o=ft.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new Bt(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Nr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=ft.nextNode(),i++)}return ft.currentNode=ht,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Bt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=$t(this,e,r),Pt(e)?e===ve||e==null||e===""?(this._$AH!==ve&&this._$AR(),this._$AH=ve):e!==this._$AH&&e!==mt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ho(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ve&&Pt(this._$AH)?this._$AA.nextSibling.data=e:this.T(ht.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Ft.createElement(Wn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ir(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=zn.get(e.strings);return r===void 0&&zn.set(e.strings,r=new Ft(e)),r}k(e){Pr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Nt()),this.O(Nt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},St=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ve}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=$t(this,e,r,0),i=!Pt(e)||e!==this._$AH&&e!==mt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=$t(this,l[n+a],r,a),c===mt&&(c=this._$AH[a]),i||(i=!Pt(c)||c!==this._$AH[a]),c===ve?e=ve:e!==ve&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Dr=class extends St{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ve?void 0:e}},Or=class extends St{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ve)}},Mr=class extends St{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=$t(this,e,r,0)??ve)===mt)return;let n=this._$AH,s=e===ve&&n!==ve||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==ve&&(n===ve||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Nr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){$t(this,e)}};var Go=Mt.litHtmlPolyfillSupport;Go?.(Ft,Bt),(Mt.litHtmlVersions??(Mt.litHtmlVersions=[])).push("3.3.1");var ae=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Bt(e.insertBefore(Nt(),o),o,void 0,r??{})}return s._$AI(t),s};var sr="today",Gn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Br(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function jn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Yn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Vn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var es=qo(Jn(),1);function we(t){return(0,es.default)(`beads-ui:${t}`)}function Qe(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function zt(t,e){let r=Qe(t.created_at),n=Qe(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ns(t,e){let r=Qe(t.created_at),n=Qe(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ss(t,e){let r=Qe(t.updated_at),n=Qe(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function os(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=Qe(t.created_at),o=Qe(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function is(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var si=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ts(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function rs(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=si.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function as(t,e){let r=ts(t),n=ts(e);if(r!==n)return r<n?-1:1;let s=rs(t),o=rs(e);if(s!==o)return s<o?-1:1;let i=Qe(t&&t.created_at),l=Qe(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var zr=2**20;function Ct(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-Qe(t&&t.created_at)}function ar(t){return(e,r)=>{let n=Ct(e,t),s=Ct(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function qr(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ct(l,r)-zr};if(!l)return{rank:Ct(i,r)+zr};let a=Ct(i,r),c=Ct(l,r),u=(a+c)/2;return a<u&&u<c?{rank:u}:{renormalize:n.map((h,_)=>({bead_id:h.id,rank:_*zr}))}}function Ur(t,e={}){let r=we(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||zt;function c(){for(let _ of Array.from(i))try{_()}catch{}}function u(){s=Array.from(n.values()).sort(a)}function h(_){if(l||!_||_.id!==t)return;let $=Number(_.revision)||0;if(r("apply %s rev=%d",_.type,$),!($<=o&&_.type!=="snapshot")){if(_.type==="snapshot"){if($<=o)return;n.clear();let y=Array.isArray(_.issues)?_.issues:[];for(let C of y)C&&typeof C.id=="string"&&C.id.length>0&&n.set(C.id,C);u(),o=$,c();return}if(_.type==="upsert"){let y=_.issue;if(y&&typeof y.id=="string"&&y.id.length>0){let C=n.get(y.id);if(!C)n.set(y.id,y);else{let M=Number.isFinite(C.updated_at)?C.updated_at:0,O=Number.isFinite(y.updated_at)?y.updated_at:0;if(M<=O){for(let P of Object.keys(C))P in y||delete C[P];for(let[P,z]of Object.entries(y))C[P]=z}}u()}o=$,c()}else if(_.type==="delete"){let y=String(_.issue_id||"");y&&(n.delete(y),u()),o=$,c()}}}return{id:t,subscribe(_){return i.add(_),()=>{i.delete(_)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(_){return n.get(_)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function lr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function ls(t){let e=we("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let u=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let $ of Array.from(c)){let y=r.get($);if(!y)continue;let C=y.itemsById;for(let M of u)typeof M=="string"&&M.length>0&&C.set(M,!0);for(let M of h)typeof M=="string"&&M.length>0&&C.set(M,!0);for(let M of _)typeof M=="string"&&M.length>0&&C.delete(M)}}async function o(l,a){let c=lr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let _=n.get(h.key);_&&(_.delete(l),_.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let u=n.get(c);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let _=r.get(l)||null;if(_){let $=n.get(_.key);$&&($.delete(l),$.size===0&&n.delete(_.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let _=n.get(h.key);_&&(_.delete(l),_.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:lr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let u of a.itemsById.keys())c[u]=!0;return c}}}}function cs(){let t=we("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,u){let h=c?lr(c):"",_=r.get(a)||"",$=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,_),$&&_&&h&&_!==h){let y=e.get(a);if(y)try{y.dispose()}catch{}let C=s.get(a);if(C){try{C()}catch{}s.delete(a)}let M=Ur(a,u);e.set(a,M);let O=M.subscribe(()=>o());s.set(a,O)}else if(!$){let y=Ur(a,u);e.set(a,y);let C=y.subscribe(()=>o());s.set(a,C)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let u=s.get(a);if(u){try{u()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function ds(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function us(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Hr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function oi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ii(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function ps(t){let e=we("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):oi(n),i=ii(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Hr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Hr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ai=Object.freeze({workspace_config:{default_workspace:null}});function fs(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:ai.workspace_config.default_workspace}}}function hs(t={}){let e=we("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:fs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?fs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,u)=>c!==r.workspace.hidden[u]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,u)=>c===r.worker.show_closed_children[u])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function ms(t){let e=we("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,_)=>{let $=s++,y=Date.now();n.set($,{type:h,start_ts:y}),e("request start id=%d type=%s count=%d",$,h,r+1),i();let C=!1,M=()=>{C||(C=!0,n.delete($),l())},O=setTimeout(()=>{C||(e("request TIMEOUT id=%d type=%s elapsed=%dms",$,h,Date.now()-y),M())},3e4);try{let P=await c(h,_),z=Date.now()-y;return e("request done id=%d type=%s elapsed=%dms",$,h,z),P}catch(P){let z=Date.now()-y;throw e("request error id=%d type=%s elapsed=%dms err=%o",$,h,z,P),P}finally{clearTimeout(O),M()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([u,h])=>({id:u,type:h.type,elapsed_ms:c-h.start_ts}))}}}function ee(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function cr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(is),a;switch(l){case"created_desc":return a.sort(zt),a;case"created_asc":return a.sort(ns),a;case"updated_desc":return a.sort(ss),a;case"priority":return a.sort(os),a;case"manual":default:{let c=r();return c?a.sort(ar(c)):a.sort(zt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function dr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},u=n(qr(l,a,c.order),i);s(c,u);let h=await e("ui-order-set",{expected_revision:c.revision,entries:u});if(h&&h.conflict){let _={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(_);let $=n(qr(l,a,_.order),i);s(_,$);let y=await e("ui-order-set",{expected_revision:_.revision,entries:$});y&&y.applied&&r.set({revision:typeof y.revision=="number"?y.revision:0,order:y.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function ur(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Wr(t,e){return!e||typeof t!="string"||t.length===0||ur(e.visible_labels).includes(t)?!0:ur(e.hidden_labels).includes(t)?!1:!ur(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function gs(t,e){return ur(t).filter(r=>Wr(r,e))}function bt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function Gr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Rt(t){let e=Gr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function jr(t,e){let r=Gr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var li={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},ci={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},di={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},ui={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function pi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function fi(t,e,r){let n=li[t]||t,s=e&&e.state||"empty",o=ui[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return f`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${ci[t]||t}
      </div>
    </div>
  `}function pr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=di[r],s=t.stages,o=pi(n,s,String(e||"open"));return f`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>fi(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function hi(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var bs=2;function mi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(f`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,bs).join(", "),s=r.length-bs,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(f`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function gi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&bt(r,"route")){let o=n.route_source==="derived";s.push(f`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&bt(r,"fast_track")&&s.push(f`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&bt(r,"pr")){let o=n.pr.number;s.push(f`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of gs(t.labels,r))s.push(f`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&bt(r,"from")&&s.push(f`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),bt(r,"blocked")&&s.push(...mi(t.blocked_info)),s.length===0?"":f`<div class="board-card__chips">${s}</div>`}function bi(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function _i(t){let e=jr(t.created_at),r=jr(t.updated_at);return!e&&!r?"":f`<span class="board-card__times">
    ${e?f`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Rt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?f`<span class="board-card__time-sep">·</span>`:""}
    ${r?f`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Rt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function yi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(as):r.children;return f`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?f`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:f`<span class="board-card__roll-none">children 없음</span>`}
        ${_i(t)}
      </div>
      ${n>0&&r.current?f`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?f`<div class="board-card__roll-list">
            ${o.map((i,l)=>f`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${bi(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function _s(t,e){let r=hi(t.priority);return f`
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
        ${r?f`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${gi(t,e)}
      ${t.workflow&&bt(e.policy||null,"stepper")?pr(t.workflow,t.status):""}
      ${yi(t,e)}
    </article>
  `}function _t(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return f`
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
        ${n?f`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${Gn.map(o=>f`<option
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
        ${t.items.map(o=>_s(o,e))}
      </div>
    </section>
  `}var wi=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ki=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],vi=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function xi(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return f`
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
      ${r.label_menu_open?f`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?f`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>f`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?f`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ys(t,e,r){return f`
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
        ${wi.map(n=>f`<option
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
        ${ki.map(n=>f`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${xi(t,e,r)}
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
        ${vi.map(n=>f`<option
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
  `}var $i=200,Si={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ai=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),ws="beads-ui.board.sort",ks=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ti(){try{let t=window.localStorage.getItem(ws);if(t&&ks.has(t))return t}catch{}return"created_desc"}function vs(t,e){let r=we("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,u=e.closedRange||sr,h=s?cr(s,i):null,_=dr({transport:o,uiOrderStore:i}),$=[],y=[],C=[],M=[],O=[],P=[],z=!1,I=0,v=Ti(),w=new Map,x=new Map,k=new Map,B=new Set,G={search:"",priority:"",type:"",labels:[]},X=!1,Q=null;function Ae(T){return String(T.status||"open")==="open"}function Pe(T){let D=String(T.status||"open");return D==="open"||D==="blocked"}function Te(T){let D=G.search.trim().toLowerCase(),j=G.priority,W=G.type,N=G.labels;return T.filter(g=>{if(D){let m=String(g.id||"").toLowerCase(),S=String(g.title||"").toLowerCase();if(!m.includes(D)&&!S.includes(D))return!1}if(j!==""&&String(g.priority)!==j||W!==""&&String(g.issue_type||"")!==W)return!1;if(N.length>0){let m=Array.isArray(g.labels)?g.labels:[];if(!N.some(S=>m.includes(S)))return!1}return!0})}function Ve(){let T=new Set;for(let D of[$,y,C,M,O,P])for(let j of D){let W=Array.isArray(j.labels)?j.labels:[];for(let N of W)typeof N=="string"&&N.length>0&&T.add(N)}return Array.from(T).sort()}function Se(){return G.search.trim()!==""||G.priority!==""||G.type!==""||G.labels.length>0}function be(){try{if(h){let T=h.selectBoardColumn("tab:board:in-progress","in_progress",v),D=h.selectBoardColumn("tab:board:blocked","blocked",v).filter(Pe),j=new Set(T.map(q=>q.id)),W=h.selectBoardColumn("tab:board:ready","ready",v).filter(q=>Ae(q)&&!j.has(q.id)),N=h.selectBoardColumn("tab:board:resolved","resolved",v),g=h.selectBoardColumn("tab:board:deferred","deferred",v),m=z?g:[],S=h.selectBoardColumn("tab:board:closed","closed").slice(0,$i),E=[...D,...W,...T,...N,...m,...S];xe(E);let K=new Set;for(let q of E)q&&q.id&&!Yr(q)&&K.add(q.id);let pe=!Se();$=pe?Lt(D,K):D,y=pe?Lt(W,K):W,C=pe?Lt(T,K):T,M=pe?Lt(N,K):N,O=pe?Lt(m,K):m,I=g.length,P=pe?Lt(S,K):S,w=new Map;for(let q of $)w.set(q.id,"open");for(let q of y)w.set(q.id,"open");for(let q of C)w.set(q.id,"in_progress");for(let q of M)w.set(q.id,"resolved");for(let q of O)w.set(q.id,"deferred");for(let q of P)w.set(q.id,"closed");x=new Map;for(let q of $)x.set(q.id,"blocked-col");for(let q of y)x.set(q.id,"ready-col");for(let q of C)x.set(q.id,"in-progress-col");for(let q of M)x.set(q.id,"resolved-col");for(let q of O)x.set(q.id,"deferred-col");for(let q of P)x.set(q.id,"closed-col")}ke()}catch{$=[],y=[],C=[],M=[],O=[],P=[],k=new Map,ke()}}function xe(T){let D=new Map;for(let W of T)W&&W.id&&!D.has(W.id)&&D.set(W.id,W);let j=new Map;for(let W of D.values()){let N=Yr(W);if(!N)continue;let g=j.get(N);g||(g=[],j.set(N,g)),g.push({id:W.id,title:W.title,status:W.status,metadata:W.metadata,created_at:W.created_at})}k=j}function Ue(T){let D=k.get(T)||[],j=0,W=null;for(let N of D)(N.status==="resolved"||N.status==="closed")&&(j+=1),!W&&N.status==="in_progress"&&(W=N);return{total:D.length,count:j,current:W,children:D}}function ue(T){return!B.has(T)}function Xe(T,D){T.preventDefault(),T.stopPropagation(),B.has(D)?B.delete(D):B.add(D),ke()}function le(T,D){T.preventDefault(),T.stopPropagation(),n(D)}function Ye(T,D){T.preventDefault(),T.stopPropagation(),n(D)}function oe(T,D){Q||n(D)}function Me(T,D){T.preventDefault(),T.stopPropagation(),Ei(D).then(j=>{j&&ee("\uBCF5\uC0AC\uB428","success",1200)})}function A(T,D){Q=D,T.dataTransfer&&(T.dataTransfer.setData("text/plain",D),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function R(T){T.target.classList.remove("board-card--dragging"),Ze(),setTimeout(()=>{Q=null},0)}function Z(T){let D=String(T.target.value||"");!D||D===u||(u=D,a&&a(D),ke())}let Y={onCardClick:oe,onCopyId:Me,onDragStart:A,onDragEnd:R,onClosedRangeChange:Z,rollupFor:Ue,isExpanded:ue,onRollupToggle:Xe,onChildClick:le,onFromChipClick:Ye,get policy(){return l?l.get():null}};function ce(T){let D=T.target,j=t.querySelector(".board-filter__labels");D&&j&&j.contains(D)||_e()}function ne(T){T.key==="Escape"&&_e()}function J(){X||(X=!0,document.addEventListener("mousedown",ce),document.addEventListener("keydown",ne),ke())}function _e(){X&&(X=!1,document.removeEventListener("mousedown",ce),document.removeEventListener("keydown",ne),ke())}let ge={onSearchInput(T){G.search=String(T.target.value||""),be()},onPriorityChange(T){G.priority=String(T.target.value||""),be()},onTypeChange(T){G.type=String(T.target.value||""),be()},onSortChange(T){let D=String(T.target.value||"");if(!(!ks.has(D)||D===v)){v=D;try{window.localStorage.setItem(ws,D)}catch{}be()}},onDeferredToggle(){z=!z,be()},onLabelMenuToggle(){X?_e():J()},onLabelToggle(T){let D=G.labels.indexOf(T);D===-1?G.labels.push(T):G.labels.splice(D,1),be()},onLabelClear(){G.labels.length!==0&&(G.labels=[],be())},onNewIssue(){c&&c()}};function Le(){let T=z?"board-root board-root--deferred":"board-root";return f`
      <div class="board-view">
        ${ys(G,ge,{sort_mode:v,show_deferred:z,deferred_count:I,label_options:Ve(),label_menu_open:X})}
        <div class=${T}>
          ${_t({title:"Blocked",id:"blocked-col",items:Te($)},Y)}
          ${_t({title:"Ready",id:"ready-col",items:Te(y)},Y)}
          ${_t({title:"In progress",id:"in-progress-col",items:Te(C)},Y)}
          ${_t({title:"Resolved",id:"resolved-col",items:Te(M)},Y)}
          ${z?_t({title:"Deferred",id:"deferred-col",items:Te(O)},Y):""}
          ${_t({title:"Closed",id:"closed-col",items:Te(P),is_closed:!0,closed_range:u},Y)}
        </div>
      </div>
    `}function ke(){ae(Le(),t),Ie()}function Ie(){try{let T=Array.from(t.querySelectorAll(".board-column"));for(let D of T)Array.from(D.querySelectorAll(".board-card")).forEach((W,N)=>{W.tabIndex=N===0?0:-1})}catch{}}async function He(T,D){if(!o){ee("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:T,status:D}),ee("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(j){r("update-status failed: %o",j),ee("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ee(T){switch(T){case"blocked-col":return $;case"ready-col":return y;case"in-progress-col":return C;case"resolved-col":return M;case"deferred-col":return O;default:return[]}}function We(T,D,j){if(!o||!i)return;let W=Ee(T),N=W.find(K=>K.id===D);if(!N)return;let g=W.filter(K=>K.id!==D),m=j.closest?j.closest(".board-card"):null,S=g.length;if(m){let K=m.getAttribute("data-issue-id");if(K===D)return;let pe=g.findIndex(q=>q.id===K);pe>=0&&(S=pe)}let E=g.slice();E.splice(S,0,N),_.applyReorder(D,E,S)}function Ze(){for(let T of Array.from(t.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let fe=null;t.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let j=T.target.closest(".board-column");j&&j!==fe&&(fe&&fe.classList.remove("board-column--drag-over"),j.classList.add("board-column--drag-over"),fe=j)}),t.addEventListener("dragleave",T=>{let D=T.relatedTarget;(!D||!t.contains(D))&&fe&&(fe.classList.remove("board-column--drag-over"),fe=null)}),t.addEventListener("drop",T=>{T.preventDefault(),fe&&(fe.classList.remove("board-column--drag-over"),fe=null);let D=T.target,j=D.closest(".board-column");if(!j)return;let W=T.dataTransfer?.getData("text/plain")||"";if(!W)return;let N=j.id,g=x.get(W);if(g&&g===N){if(Ai.has(N)){if(v!=="manual"){ee("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}We(N,W,D)}return}let m=Si[N];if(!m){ee("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}w.get(W)!==m&&He(W,m)}),t.addEventListener("keydown",T=>{let D=T.target;if(!(D instanceof HTMLElement))return;let j=String(D.tagName||"").toLowerCase();if(j==="input"||j==="textarea"||j==="select"||j==="button"||j==="a"||D.isContentEditable===!0)return;let W=D.closest(".board-card");if(!W)return;let N=String(T.key||"");if(N==="Enter"||N===" "){T.preventDefault();let E=W.getAttribute("data-issue-id");E&&n(E);return}if(N!=="ArrowUp"&&N!=="ArrowDown"&&N!=="ArrowLeft"&&N!=="ArrowRight")return;T.preventDefault();let g=W.closest(".board-column");if(!g)return;let m=Array.from(g.querySelectorAll(".board-card")),S=m.indexOf(W);if(N==="ArrowDown"&&S<m.length-1){Ce(W,m[S+1]);return}if(N==="ArrowUp"&&S>0){Ce(W,m[S-1]);return}if(N==="ArrowLeft"||N==="ArrowRight"){let E=Array.from(t.querySelectorAll(".board-column")),K=E.indexOf(g),pe=N==="ArrowRight"?1:-1,q=K+pe;for(;q>=0&&q<E.length;){let De=E[q].querySelector(".board-card");if(De){Ce(W,De);return}q+=pe}}});function Ce(T,D){try{T.tabIndex=-1,D.tabIndex=0,D.focus()}catch{}}let he=null;h&&h.subscribe&&(he=h.subscribe(()=>{try{be()}catch{}}));let Re=null;return l&&l.subscribe&&(Re=l.subscribe(()=>{try{be()}catch{}})),{async load(){r("load"),be()},clear(){_e(),he&&(he(),he=null),Re&&(Re(),Re=null),t.replaceChildren(),$=[],y=[],C=[],M=[],O=[],P=[],w=new Map,x=new Map}}}function Yr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Lt(t,e){return t.filter(r=>{let n=Yr(r);return!(n&&e.has(n))})}async function Ei(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function It(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ci={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ri=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Li=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ct(t){return!!t&&typeof t=="object"}function Vr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function xs(t,e){let r=Vr(t),n=Vr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Ii(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ct(s)&&typeof s.text=="string"?s.text:"").join(""):ct(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Di(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Ci[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Vr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=xs(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=xs(ct(l)?l.old_string:"",ct(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function $s(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ri.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Li.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Oi(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ct(o)){if(o.type==="text"&&typeof o.text=="string")s.push($s(o.text));else if(o.type==="tool_use"){let i=Di(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ct(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Ii(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Mi(t){if(t.type==="item.completed"&&ct(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[$s(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Ni(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function Ss(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ct(o))continue;let i=Ni(o)?Mi(o):Oi(o,r);for(let l of i)e.push(l)}return e}function fr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function u(){if(!o||!n)return[];let x=n.get(o);return Ss(x?x.lines:[])}function h(x,k){if(k.kind==="gate")return f`<div class="sv__gate">${k.text}</div>`;if(k.kind==="phase")return f`<div class="sv__phase">${k.text}</div>`;if(k.kind==="result")return f`<div
        class="sv__result${k.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${k.success?"\u2713":"\u2717"}
        ${k.text||(k.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(k.kind==="error")return f`<div class="sv__error">⛔ ${k.text}</div>`;if(k.kind==="blocker")return f`<div class="sv__error">⛔ ${k.text}</div>`;if(k.kind==="tool"){let B=a.has(x),G=k.tool==="Bash"?k.command:k.path||k.command||"";return f`<div
        class="sv__tool${B?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>M(x)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${k.icon}</span>
          <span class="sv__tool-name">${k.tool}</span>
          ${G?f`<span class="sv__tool-detail">${G}</span>`:""}
          ${typeof k.added=="number"?f`<span class="sv__diff-add">+${k.added}</span>`:""}
          ${typeof k.removed=="number"?f`<span class="sv__diff-del">−${k.removed}</span>`:""}
          ${k.result?f`<span class="sv__tool-ok">→ ${k.result}</span>`:""}
        </span>
        ${B?f`<pre class="sv__tool-expand">${_(k)}</pre>`:""}
      </div>`}return f`<div class="sv__as">${k.text}</div>`}function _(x){let k=[];if(x.input!==void 0)try{k.push(`input: ${JSON.stringify(x.input,null,2)}`)}catch{}return typeof x.output=="string"&&x.output.length>0&&k.push(`output:
${x.output}`),k.join(`

`)}function $(){if(!o)return f``;let x=u(),k=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),B=i.session_id||"",G=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return f`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${B?f`<button
              type="button"
              class="sv__session"
              title=${B}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${B}`}
              @click=${()=>P(B)}
            >
              ⧉ ${B.slice(0,8)}
            </button>`:""}
        ${k?f`<span class="sv__meta">${k}</span>`:""}
        ${i.worktree?f`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${G}
          @click=${O}
        >
          <span class="sv__follow-full">⇣ ${G}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>w()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${x.length===0?f`<div class="sv__empty">세션 로그 없음</div>`:x.map((X,Q)=>h(Q,X))}
      </div>
    </div>`}function y(){ae($(),t),l&&C()}function C(){let x=t.querySelector(".sv__body");x&&(x.scrollTop=x.scrollHeight)}function M(x){a.has(x)?a.delete(x):a.add(x),y()}function O(){l=!l,y()}function P(x){It(x).then(k=>{k?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function z(x){!o||!x||(i={...i,...x},y())}function I(x){let k=x.target;if(!k||!k.classList||!k.classList.contains("sv__body"))return;!(k.scrollHeight-k.scrollTop-k.clientHeight<=4)&&l&&(l=!1,y())}t.addEventListener("scroll",I,!0);function v(x){let k=x&&x.attempt_id;k&&(o=k,i=x.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(y)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),y())}function w(){let x=o;o=null,a.clear(),r&&x&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${x}`})).catch(()=>{}),ae(f``,t),s&&s()}return{open:v,updateMeta:z,close:w,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",I,!0),o=null,ae(f``,t)}}}function Pi(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function As(t,e){let r=Pi(t);return f`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?f`<div class="detail-empty">산출물 없음</div>`:f`
          ${r.map(n=>f`<div class="detail-art">
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
  `}var Zr=["opus","sonnet","haiku","fable"],Kr=["low","medium","high","xhigh"],Xr=["codex","opus","fable","self","skip"],Qr=["opus","fable","sonnet","haiku"],Fi=["standard","fast_track"],Jr={orchestration_model:"(\uAE30\uBCF8: CLI \uAE30\uBCF8 \uBAA8\uB378)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function hr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Jr[t]||"(\uAE30\uBCF8)"}function qt(t,e,r,n,s,o){return f`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>f`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function Ut(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Ts(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return f`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${qt("orchestration_model","orchestration_model",Ut(Zr,hr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${qt("orchestration_effort","orchestration_effort",Ut(Kr,hr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${qt("review_model","review_model",Ut(Xr,hr("review_model",s)),n.review_model||"",!1,e)}
    ${qt("impl_model","impl_model",Ut(Qr,hr("impl_model",s)),n.impl_model||"",!1,e)}
    ${qt("workflow_mode","workflow_mode",Ut(Fi),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Ns,setPrototypeOf:Es,isFrozen:Bi,getPrototypeOf:zi,getOwnPropertyDescriptor:qi}=Object,{freeze:Be,seal:Ke,create:an}=Object,{apply:ln,construct:cn}=typeof Reflect<"u"&&Reflect;Be||(Be=function(e){return e});Ke||(Ke=function(e){return e});ln||(ln=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});cn||(cn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var mr=ze(Array.prototype.forEach),Ui=ze(Array.prototype.lastIndexOf),Cs=ze(Array.prototype.pop),Ht=ze(Array.prototype.push),Hi=ze(Array.prototype.splice),br=ze(String.prototype.toLowerCase),en=ze(String.prototype.toString),tn=ze(String.prototype.match),Wt=ze(String.prototype.replace),Wi=ze(String.prototype.indexOf),Gi=ze(String.prototype.trim),Je=ze(Object.prototype.hasOwnProperty),Fe=ze(RegExp.prototype.test),Gt=ji(TypeError);function ze(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return ln(t,e,n)}}function ji(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return cn(t,r)}}function re(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:br;Es&&Es(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Bi(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Yi(t){for(let e=0;e<t.length;e++)Je(t,e)||(t[e]=null);return t}function it(t){let e=an(null);for(let[r,n]of Ns(t))Je(t,r)&&(Array.isArray(n)?e[r]=Yi(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=it(n):e[r]=n);return e}function jt(t,e){for(;t!==null;){let n=qi(t,e);if(n){if(n.get)return ze(n.get);if(typeof n.value=="function")return ze(n.value)}t=zi(t)}function r(){return null}return r}var Rs=Be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),rn=Be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),nn=Be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Vi=Be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),sn=Be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Zi=Be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ls=Be(["#text"]),Is=Be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),on=Be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ds=Be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),gr=Be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ki=Ke(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Xi=Ke(/<%[\w\W]*|[\w\W]*%>/gm),Qi=Ke(/\$\{[\w\W]*/gm),Ji=Ke(/^data-[\-\w.\u00B7-\uFFFF]+$/),ea=Ke(/^aria-[\-\w]+$/),Ps=Ke(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ta=Ke(/^(?:\w+script|data):/i),ra=Ke(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Fs=Ke(/^html$/i),na=Ke(/^[a-z][.\w]*(-[.\w]+)+$/i),Os=Object.freeze({__proto__:null,ARIA_ATTR:ea,ATTR_WHITESPACE:ra,CUSTOM_ELEMENT:na,DATA_ATTR:Ji,DOCTYPE_NAME:Fs,ERB_EXPR:Xi,IS_ALLOWED_URI:Ps,IS_SCRIPT_OR_DATA:ta,MUSTACHE_EXPR:Ki,TMPLIT_EXPR:Qi}),Yt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},sa=function(){return typeof window>"u"?null:window},oa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ms=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Bs(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:sa(),e=U=>Bs(U);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Yt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:_,trustedTypes:$}=t,y=a.prototype,C=jt(y,"cloneNode"),M=jt(y,"remove"),O=jt(y,"nextSibling"),P=jt(y,"childNodes"),z=jt(y,"parentNode");if(typeof i=="function"){let U=r.createElement("template");U.content&&U.content.ownerDocument&&(r=U.content.ownerDocument)}let I,v="",{implementation:w,createNodeIterator:x,createDocumentFragment:k,getElementsByTagName:B}=r,{importNode:G}=n,X=Ms();e.isSupported=typeof Ns=="function"&&typeof z=="function"&&w&&w.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Q,ERB_EXPR:Ae,TMPLIT_EXPR:Pe,DATA_ATTR:Te,ARIA_ATTR:Ve,IS_SCRIPT_OR_DATA:Se,ATTR_WHITESPACE:be,CUSTOM_ELEMENT:xe}=Os,{IS_ALLOWED_URI:Ue}=Os,ue=null,Xe=re({},[...Rs,...rn,...nn,...sn,...Ls]),le=null,Ye=re({},[...Is,...on,...Ds,...gr]),oe=Object.seal(an(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Me=null,A=null,R=Object.seal(an(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Z=!0,Y=!0,ce=!1,ne=!0,J=!1,_e=!0,ge=!1,Le=!1,ke=!1,Ie=!1,He=!1,Ee=!1,We=!0,Ze=!1,fe="user-content-",Ce=!0,he=!1,Re={},T=null,D=re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),j=null,W=re({},["audio","video","img","source","image","track"]),N=null,g=re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),m="http://www.w3.org/1998/Math/MathML",S="http://www.w3.org/2000/svg",E="http://www.w3.org/1999/xhtml",K=E,pe=!1,q=null,De=re({},[m,S,E],en),kt=re({},["mi","mo","mn","ms","mtext"]),vt=re({},["annotation-xml"]),Ar=re({},["title","style","font","a","script"]),nt=null,Dt=["application/xhtml+xml","text/html"],tr="text/html",p=null,b=null,V=r.createElement("form"),H=function(d){return d instanceof RegExp||d instanceof Function},te=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(b&&b===d)){if((!d||typeof d!="object")&&(d={}),d=it(d),nt=Dt.indexOf(d.PARSER_MEDIA_TYPE)===-1?tr:d.PARSER_MEDIA_TYPE,p=nt==="application/xhtml+xml"?en:br,ue=Je(d,"ALLOWED_TAGS")?re({},d.ALLOWED_TAGS,p):Xe,le=Je(d,"ALLOWED_ATTR")?re({},d.ALLOWED_ATTR,p):Ye,q=Je(d,"ALLOWED_NAMESPACES")?re({},d.ALLOWED_NAMESPACES,en):De,N=Je(d,"ADD_URI_SAFE_ATTR")?re(it(g),d.ADD_URI_SAFE_ATTR,p):g,j=Je(d,"ADD_DATA_URI_TAGS")?re(it(W),d.ADD_DATA_URI_TAGS,p):W,T=Je(d,"FORBID_CONTENTS")?re({},d.FORBID_CONTENTS,p):D,Me=Je(d,"FORBID_TAGS")?re({},d.FORBID_TAGS,p):it({}),A=Je(d,"FORBID_ATTR")?re({},d.FORBID_ATTR,p):it({}),Re=Je(d,"USE_PROFILES")?d.USE_PROFILES:!1,Z=d.ALLOW_ARIA_ATTR!==!1,Y=d.ALLOW_DATA_ATTR!==!1,ce=d.ALLOW_UNKNOWN_PROTOCOLS||!1,ne=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,J=d.SAFE_FOR_TEMPLATES||!1,_e=d.SAFE_FOR_XML!==!1,ge=d.WHOLE_DOCUMENT||!1,Ie=d.RETURN_DOM||!1,He=d.RETURN_DOM_FRAGMENT||!1,Ee=d.RETURN_TRUSTED_TYPE||!1,ke=d.FORCE_BODY||!1,We=d.SANITIZE_DOM!==!1,Ze=d.SANITIZE_NAMED_PROPS||!1,Ce=d.KEEP_CONTENT!==!1,he=d.IN_PLACE||!1,Ue=d.ALLOWED_URI_REGEXP||Ps,K=d.NAMESPACE||E,kt=d.MATHML_TEXT_INTEGRATION_POINTS||kt,vt=d.HTML_INTEGRATION_POINTS||vt,oe=d.CUSTOM_ELEMENT_HANDLING||{},d.CUSTOM_ELEMENT_HANDLING&&H(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(oe.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&H(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(oe.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(oe.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),J&&(Y=!1),He&&(Ie=!0),Re&&(ue=re({},Ls),le=[],Re.html===!0&&(re(ue,Rs),re(le,Is)),Re.svg===!0&&(re(ue,rn),re(le,on),re(le,gr)),Re.svgFilters===!0&&(re(ue,nn),re(le,on),re(le,gr)),Re.mathMl===!0&&(re(ue,sn),re(le,Ds),re(le,gr))),d.ADD_TAGS&&(typeof d.ADD_TAGS=="function"?R.tagCheck=d.ADD_TAGS:(ue===Xe&&(ue=it(ue)),re(ue,d.ADD_TAGS,p))),d.ADD_ATTR&&(typeof d.ADD_ATTR=="function"?R.attributeCheck=d.ADD_ATTR:(le===Ye&&(le=it(le)),re(le,d.ADD_ATTR,p))),d.ADD_URI_SAFE_ATTR&&re(N,d.ADD_URI_SAFE_ATTR,p),d.FORBID_CONTENTS&&(T===D&&(T=it(T)),re(T,d.FORBID_CONTENTS,p)),Ce&&(ue["#text"]=!0),ge&&re(ue,["html","head","body"]),ue.table&&(re(ue,["tbody"]),delete Me.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw Gt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Gt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=d.TRUSTED_TYPES_POLICY,v=I.createHTML("")}else I===void 0&&(I=oa($,s)),I!==null&&typeof v=="string"&&(v=I.createHTML(""));Be&&Be(d),b=d}},ye=re({},[...rn,...nn,...Vi]),rr=re({},[...sn,...Zi]),Io=function(d){let L=z(d);(!L||!L.tagName)&&(L={namespaceURI:K,tagName:"template"});let F=br(d.tagName),me=br(L.tagName);return q[d.namespaceURI]?d.namespaceURI===S?L.namespaceURI===E?F==="svg":L.namespaceURI===m?F==="svg"&&(me==="annotation-xml"||kt[me]):!!ye[F]:d.namespaceURI===m?L.namespaceURI===E?F==="math":L.namespaceURI===S?F==="math"&&vt[me]:!!rr[F]:d.namespaceURI===E?L.namespaceURI===S&&!vt[me]||L.namespaceURI===m&&!kt[me]?!1:!rr[F]&&(Ar[F]||!ye[F]):!!(nt==="application/xhtml+xml"&&q[d.namespaceURI]):!1},rt=function(d){Ht(e.removed,{element:d});try{z(d).removeChild(d)}catch{M(d)}},ut=function(d,L){try{Ht(e.removed,{attribute:L.getAttributeNode(d),from:L})}catch{Ht(e.removed,{attribute:null,from:L})}if(L.removeAttribute(d),d==="is")if(Ie||He)try{rt(L)}catch{}else try{L.setAttribute(d,"")}catch{}},An=function(d){let L=null,F=null;if(ke)d="<remove></remove>"+d;else{let $e=tn(d,/^[\r\n\t ]+/);F=$e&&$e[0]}nt==="application/xhtml+xml"&&K===E&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");let me=I?I.createHTML(d):d;if(K===E)try{L=new _().parseFromString(me,nt)}catch{}if(!L||!L.documentElement){L=w.createDocument(K,"template",null);try{L.documentElement.innerHTML=pe?v:me}catch{}}let Ne=L.body||L.documentElement;return d&&F&&Ne.insertBefore(r.createTextNode(F),Ne.childNodes[0]||null),K===E?B.call(L,ge?"html":"body")[0]:ge?L.documentElement:Ne},Tn=function(d){return x.call(d.ownerDocument||d,d,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Tr=function(d){return d instanceof h&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof u)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function")},En=function(d){return typeof l=="function"&&d instanceof l};function st(U,d,L){mr(U,F=>{F.call(e,d,L,b)})}let Cn=function(d){let L=null;if(st(X.beforeSanitizeElements,d,null),Tr(d))return rt(d),!0;let F=p(d.nodeName);if(st(X.uponSanitizeElement,d,{tagName:F,allowedTags:ue}),_e&&d.hasChildNodes()&&!En(d.firstElementChild)&&Fe(/<[/\w!]/g,d.innerHTML)&&Fe(/<[/\w!]/g,d.textContent)||d.nodeType===Yt.progressingInstruction||_e&&d.nodeType===Yt.comment&&Fe(/<[/\w]/g,d.data))return rt(d),!0;if(!(R.tagCheck instanceof Function&&R.tagCheck(F))&&(!ue[F]||Me[F])){if(!Me[F]&&Ln(F)&&(oe.tagNameCheck instanceof RegExp&&Fe(oe.tagNameCheck,F)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(F)))return!1;if(Ce&&!T[F]){let me=z(d)||d.parentNode,Ne=P(d)||d.childNodes;if(Ne&&me){let $e=Ne.length;for(let Ge=$e-1;Ge>=0;--Ge){let ot=C(Ne[Ge],!0);ot.__removalCount=(d.__removalCount||0)+1,me.insertBefore(ot,O(d))}}}return rt(d),!0}return d instanceof a&&!Io(d)||(F==="noscript"||F==="noembed"||F==="noframes")&&Fe(/<\/no(script|embed|frames)/i,d.innerHTML)?(rt(d),!0):(J&&d.nodeType===Yt.text&&(L=d.textContent,mr([Q,Ae,Pe],me=>{L=Wt(L,me," ")}),d.textContent!==L&&(Ht(e.removed,{element:d.cloneNode()}),d.textContent=L)),st(X.afterSanitizeElements,d,null),!1)},Rn=function(d,L,F){if(We&&(L==="id"||L==="name")&&(F in r||F in V))return!1;if(!(Y&&!A[L]&&Fe(Te,L))){if(!(Z&&Fe(Ve,L))){if(!(R.attributeCheck instanceof Function&&R.attributeCheck(L,d))){if(!le[L]||A[L]){if(!(Ln(d)&&(oe.tagNameCheck instanceof RegExp&&Fe(oe.tagNameCheck,d)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(d))&&(oe.attributeNameCheck instanceof RegExp&&Fe(oe.attributeNameCheck,L)||oe.attributeNameCheck instanceof Function&&oe.attributeNameCheck(L,d))||L==="is"&&oe.allowCustomizedBuiltInElements&&(oe.tagNameCheck instanceof RegExp&&Fe(oe.tagNameCheck,F)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(F))))return!1}else if(!N[L]){if(!Fe(Ue,Wt(F,be,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&d!=="script"&&Wi(F,"data:")===0&&j[d])){if(!(ce&&!Fe(Se,Wt(F,be,"")))){if(F)return!1}}}}}}}return!0},Ln=function(d){return d!=="annotation-xml"&&tn(d,xe)},In=function(d){st(X.beforeSanitizeAttributes,d,null);let{attributes:L}=d;if(!L||Tr(d))return;let F={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:le,forceKeepAttr:void 0},me=L.length;for(;me--;){let Ne=L[me],{name:$e,namespaceURI:Ge,value:ot}=Ne,xt=p($e),Er=ot,Oe=$e==="value"?Er:Gi(Er);if(F.attrName=xt,F.attrValue=Oe,F.keepAttr=!0,F.forceKeepAttr=void 0,st(X.uponSanitizeAttribute,d,F),Oe=F.attrValue,Ze&&(xt==="id"||xt==="name")&&(ut($e,d),Oe=fe+Oe),_e&&Fe(/((--!?|])>)|<\/(style|title|textarea)/i,Oe)){ut($e,d);continue}if(xt==="attributename"&&tn(Oe,"href")){ut($e,d);continue}if(F.forceKeepAttr)continue;if(!F.keepAttr){ut($e,d);continue}if(!ne&&Fe(/\/>/i,Oe)){ut($e,d);continue}J&&mr([Q,Ae,Pe],On=>{Oe=Wt(Oe,On," ")});let Dn=p(d.nodeName);if(!Rn(Dn,xt,Oe)){ut($e,d);continue}if(I&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Ge)switch($.getAttributeType(Dn,xt)){case"TrustedHTML":{Oe=I.createHTML(Oe);break}case"TrustedScriptURL":{Oe=I.createScriptURL(Oe);break}}if(Oe!==Er)try{Ge?d.setAttributeNS(Ge,$e,Oe):d.setAttribute($e,Oe),Tr(d)?rt(d):Cs(e.removed)}catch{ut($e,d)}}st(X.afterSanitizeAttributes,d,null)},Do=function U(d){let L=null,F=Tn(d);for(st(X.beforeSanitizeShadowDOM,d,null);L=F.nextNode();)st(X.uponSanitizeShadowNode,L,null),Cn(L),In(L),L.content instanceof o&&U(L.content);st(X.afterSanitizeShadowDOM,d,null)};return e.sanitize=function(U){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,F=null,me=null,Ne=null;if(pe=!U,pe&&(U="<!-->"),typeof U!="string"&&!En(U))if(typeof U.toString=="function"){if(U=U.toString(),typeof U!="string")throw Gt("dirty is not a string, aborting")}else throw Gt("toString is not a function");if(!e.isSupported)return U;if(Le||te(d),e.removed=[],typeof U=="string"&&(he=!1),he){if(U.nodeName){let ot=p(U.nodeName);if(!ue[ot]||Me[ot])throw Gt("root node is forbidden and cannot be sanitized in-place")}}else if(U instanceof l)L=An("<!---->"),F=L.ownerDocument.importNode(U,!0),F.nodeType===Yt.element&&F.nodeName==="BODY"||F.nodeName==="HTML"?L=F:L.appendChild(F);else{if(!Ie&&!J&&!ge&&U.indexOf("<")===-1)return I&&Ee?I.createHTML(U):U;if(L=An(U),!L)return Ie?null:Ee?v:""}L&&ke&&rt(L.firstChild);let $e=Tn(he?U:L);for(;me=$e.nextNode();)Cn(me),In(me),me.content instanceof o&&Do(me.content);if(he)return U;if(Ie){if(He)for(Ne=k.call(L.ownerDocument);L.firstChild;)Ne.appendChild(L.firstChild);else Ne=L;return(le.shadowroot||le.shadowrootmode)&&(Ne=G.call(n,Ne,!0)),Ne}let Ge=ge?L.outerHTML:L.innerHTML;return ge&&ue["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&Fe(Fs,L.ownerDocument.doctype.name)&&(Ge="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+Ge),J&&mr([Q,Ae,Pe],ot=>{Ge=Wt(Ge,ot," ")}),I&&Ee?I.createHTML(Ge):Ge},e.setConfig=function(){let U=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};te(U),Le=!0},e.clearConfig=function(){b=null,Le=!1},e.isValidAttribute=function(U,d,L){b||te({});let F=p(U),me=p(d);return Rn(F,me,L)},e.addHook=function(U,d){typeof d=="function"&&Ht(X[U],d)},e.removeHook=function(U,d){if(d!==void 0){let L=Ui(X[U],d);return L===-1?void 0:Hi(X[U],L,1)[0]}return Cs(X[U])},e.removeHooks=function(U){X[U]=[]},e.removeAllHooks=function(){X=Ms()},e}var zs=Bs();var qs={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Us=t=>(...e)=>({_$litDirective$:t,values:e}),_r=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Vt=class extends _r{constructor(e){if(super(e),this.it=ve,e.type!==qs.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ve||e==null)return this._t=void 0,this.it=e;if(e===mt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Vt.directiveName="unsafeHTML",Vt.resultType=1;var Hs=Us(Vt);function fn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var wt=fn();function Ks(t){wt=t}var Qt={exec:()=>null};function se(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(qe.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var ia=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),qe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},aa=/^(?:[ \t]*(?:\n|$))+/,la=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ca=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Jt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,da=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hn=/(?:[*+-]|\d{1,9}[.)])/,Xs=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Qs=se(Xs).replace(/bull/g,hn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ua=se(Xs).replace(/bull/g,hn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),mn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,pa=/^[^\n]+/,gn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,fa=se(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",gn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ha=se(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,hn).getRegex(),$r="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",bn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ma=se("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",bn).replace("tag",$r).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Js=se(mn).replace("hr",Jt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$r).getRegex(),ga=se(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Js).getRegex(),_n={blockquote:ga,code:la,def:fa,fences:ca,heading:da,hr:Jt,html:ma,lheading:Qs,list:ha,newline:aa,paragraph:Js,table:Qt,text:pa},Ws=se("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Jt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$r).getRegex(),ba={..._n,lheading:ua,table:Ws,paragraph:se(mn).replace("hr",Jt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ws).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$r).getRegex()},_a={..._n,html:se(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",bn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Qt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:se(mn).replace("hr",Jt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Qs).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ya=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,wa=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,eo=/^( {2,}|\\)\n(?!\s*$)/,ka=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Sr=/[\p{P}\p{S}]/u,yn=/[\s\p{P}\p{S}]/u,to=/[^\s\p{P}\p{S}]/u,va=se(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,yn).getRegex(),ro=/(?!~)[\p{P}\p{S}]/u,xa=/(?!~)[\s\p{P}\p{S}]/u,$a=/(?:[^\s\p{P}\p{S}]|~)/u,Sa=se(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ia?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),no=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Aa=se(no,"u").replace(/punct/g,Sr).getRegex(),Ta=se(no,"u").replace(/punct/g,ro).getRegex(),so="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ea=se(so,"gu").replace(/notPunctSpace/g,to).replace(/punctSpace/g,yn).replace(/punct/g,Sr).getRegex(),Ca=se(so,"gu").replace(/notPunctSpace/g,$a).replace(/punctSpace/g,xa).replace(/punct/g,ro).getRegex(),Ra=se("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,to).replace(/punctSpace/g,yn).replace(/punct/g,Sr).getRegex(),La=se(/\\(punct)/,"gu").replace(/punct/g,Sr).getRegex(),Ia=se(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Da=se(bn).replace("(?:-->|$)","-->").getRegex(),Oa=se("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Da).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),kr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ma=se(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",kr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),oo=se(/^!?\[(label)\]\[(ref)\]/).replace("label",kr).replace("ref",gn).getRegex(),io=se(/^!?\[(ref)\](?:\[\])?/).replace("ref",gn).getRegex(),Na=se("reflink|nolink(?!\\()","g").replace("reflink",oo).replace("nolink",io).getRegex(),Gs=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,wn={_backpedal:Qt,anyPunctuation:La,autolink:Ia,blockSkip:Sa,br:eo,code:wa,del:Qt,emStrongLDelim:Aa,emStrongRDelimAst:Ea,emStrongRDelimUnd:Ra,escape:ya,link:Ma,nolink:io,punctuation:va,reflink:oo,reflinkSearch:Na,tag:Oa,text:ka,url:Qt},Pa={...wn,link:se(/^!?\[(label)\]\((.*?)\)/).replace("label",kr).getRegex(),reflink:se(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",kr).getRegex()},dn={...wn,emStrongRDelimAst:Ca,emStrongLDelim:Ta,url:se(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Gs).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:se(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Gs).getRegex()},Fa={...dn,br:se(eo).replace("{2,}","*").getRegex(),text:se(dn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},yr={normal:_n,gfm:ba,pedantic:_a},Zt={normal:wn,gfm:dn,breaks:Fa,pedantic:Pa},Ba={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},js=t=>Ba[t];function at(t,e){if(e){if(qe.escapeTest.test(t))return t.replace(qe.escapeReplace,js)}else if(qe.escapeTestNoEncode.test(t))return t.replace(qe.escapeReplaceNoEncode,js);return t}function Ys(t){try{t=encodeURI(t).replace(qe.percentDecode,"%")}catch{return null}return t}function Vs(t,e){let r=t.replace(qe.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(qe.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(qe.slashPipe,"|");return n}function Kt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function za(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Zs(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function qa(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var vr=class{constructor(t){de(this,"options");de(this,"rules");de(this,"lexer");this.options=t||wt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Kt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=qa(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Kt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Kt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Kt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${u}`:u;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=h,r.length===0)break;let _=o.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let $=_,y=$.raw+`
`+r.join(`
`),C=this.blockquote(y);o[o.length-1]=C,n=n.substring(0,n.length-$.raw.length)+C.raw,s=s.substring(0,s.length-$.text.length)+C.text;break}else if(_?.type==="list"){let $=_,y=$.raw+`
`+r.join(`
`),C=this.list(y);o[o.length-1]=C,n=n.substring(0,n.length-_.raw.length)+C.raw,s=s.substring(0,s.length-$.raw.length)+C.raw,r=y.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",u="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),_=t.split(`
`,1)[0],$=!h.trim(),y=0;if(this.options.pedantic?(y=2,u=h.trimStart()):$?y=e[1].length+1:(y=e[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,u=h.slice(y),y+=e[1].length),$&&this.rules.other.blankLine.test(_)&&(c+=_+`
`,t=t.substring(_.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(y),M=this.rules.other.hrRegex(y),O=this.rules.other.fencesBeginRegex(y),P=this.rules.other.headingBeginRegex(y),z=this.rules.other.htmlBeginRegex(y);for(;t;){let I=t.split(`
`,1)[0],v;if(_=I,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),v=_):v=_.replace(this.rules.other.tabCharGlobal,"    "),O.test(_)||P.test(_)||z.test(_)||C.test(_)||M.test(_))break;if(v.search(this.rules.other.nonSpaceChar)>=y||!_.trim())u+=`
`+v.slice(y);else{if($||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||O.test(h)||P.test(h)||M.test(h))break;u+=`
`+_}!$&&!_.trim()&&($=!0),c+=I+`
`,t=t.substring(I.length+1),h=v.slice(y)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=u.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),u=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=u}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Vs(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Vs(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Kt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=za(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Zs(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Zs(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...n[0]][0].length,h=t.slice(0,s+n.index+u+i);if(Math.min(s,i)%2){let $=h.slice(1,-1);return{type:"em",raw:h,text:$,tokens:this.lexer.inlineTokens($)}}let _=h.slice(2,-2);return{type:"strong",raw:h,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},et=class un{constructor(e){de(this,"tokens");de(this,"options");de(this,"state");de(this,"inlineQueue");de(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||wt,this.options.tokenizer=this.options.tokenizer||new vr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:qe,block:yr.normal,inline:Zt.normal};this.options.pedantic?(r.block=yr.pedantic,r.inline=Zt.pedantic):this.options.gfm&&(r.block=yr.gfm,this.options.breaks?r.inline=Zt.breaks:r.inline=Zt.gfm),this.tokenizer.rules=r}static get rules(){return{block:yr,inline:Zt}}static lex(e,r){return new un(r).lex(e)}static lexInline(e,r){return new un(r).inlineTokens(e)}lex(e){e=e.replace(qe.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(qe.tabCharGlobal,"    ").replace(qe.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,h=e.slice(1),_;this.options.extensions.startInline.forEach($=>{_=$.call({lexer:this},h),typeof _=="number"&&_>=0&&(u=Math.min(u,_))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},xr=class{constructor(t){de(this,"options");de(this,"parser");this.options=t||wt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(qe.notSpaceStart)?.[0],s=t.replace(qe.endingNewline,"")+`
`;return n?'<pre><code class="language-'+at(n)+'">'+(r?s:at(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:at(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${at(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Ys(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+at(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ys(t);if(s===null)return at(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${at(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:at(t.text)}},kn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},tt=class pn{constructor(e){de(this,"options");de(this,"renderer");de(this,"textRenderer");this.options=e||wt,this.options.renderer=this.options.renderer||new xr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new kn}static parse(e,r){return new pn(r).parse(e)}static parseInline(e,r){return new pn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},wr,Xt=(wr=class{constructor(t){de(this,"options");de(this,"block");this.options=t||wt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?et.lex:et.lexInline}provideParser(){return this.block?tt.parse:tt.parseInline}},de(wr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),de(wr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),wr),Ua=class{constructor(...t){de(this,"defaults",fn());de(this,"options",this.setOptions);de(this,"parse",this.parseMarkdown(!0));de(this,"parseInline",this.parseMarkdown(!1));de(this,"Parser",tt);de(this,"Renderer",xr);de(this,"TextRenderer",kn);de(this,"Lexer",et);de(this,"Tokenizer",vr);de(this,"Hooks",Xt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new xr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new vr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Xt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Xt.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Xt.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let u=l.call(s,c);return a.call(s,u)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return et.lex(t,e??this.defaults)}parser(t,e){return tt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?et.lex:et.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?tt.parse:tt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?et.lex:et.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?tt.parse:tt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+at(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},yt=new Ua;function ie(t,e){return yt.parse(t,e)}ie.options=ie.setOptions=function(t){return yt.setOptions(t),ie.defaults=yt.defaults,Ks(ie.defaults),ie};ie.getDefaults=fn;ie.defaults=wt;ie.use=function(...t){return yt.use(...t),ie.defaults=yt.defaults,Ks(ie.defaults),ie};ie.walkTokens=function(t,e){return yt.walkTokens(t,e)};ie.parseInline=yt.parseInline;ie.Parser=tt;ie.parser=tt.parse;ie.Renderer=xr;ie.TextRenderer=kn;ie.Lexer=et;ie.lexer=et.lex;ie.Tokenizer=vr;ie.Hooks=Xt;ie.parse=ie;var Lc=ie.options,Ic=ie.setOptions,Dc=ie.use,Oc=ie.walkTokens,Mc=ie.parseInline;var Nc=tt.parse,Pc=et.lex;function ao(t){let e=ie.parse(t),r=zs.sanitize(e);return Hs(r)}function Ha(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function lo(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(y){y.key==="Escape"&&s&&(y.preventDefault(),_())}document.addEventListener("keydown",a);function c(){return s?f`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>_()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ha(s)}</span
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
            ${o==="loading"?f`<div class="mv__status">불러오는 중…</div>`:o==="error"?f`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:ao(i)}
          </div>
        </div>
      </div>
    `:f``}function u(){ae(c(),t)}async function h(y){s=y,o="loading",i="",l="",u();let C=r?r():"";if(!C){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",u();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",u();return}let M="/api/doc?workspace="+encodeURIComponent(C)+"&path="+encodeURIComponent(y);try{let O=await n(M),P=await O.json().catch(()=>({}));if(!O.ok||!P||P.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(P&&P.error||O.status)+")",u();return}i=String(P.content||""),o="ready",u()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",u()}}function _(){s=null,ae(f``,t)}function $(){document.removeEventListener("keydown",a),_()}return{open:h,close:_,destroy:$}}var Wa={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ga(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function co(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return f`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let o of r)o&&typeof o.resumed_from=="string"&&o.resumed_from.length>0&&n.add(o.resumed_from);let s=o=>{if(!(o.status==="failed"||o.status==="orphaned"))return"";let l=typeof o.session_id=="string"&&o.session_id.length>0,a=n.has(o.attempt_id),c=l&&!a,u=l?a?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return f`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${o.attempt_id}
      ?disabled=${!c}
      title=${u}
      @click=${h=>{h.stopPropagation(),c&&e.onResume&&e.onResume(o.attempt_id)}}
    >
      ↻ 이어하기
    </button>`};return f`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(o=>f`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${o.status||"unknown"}"
              data-attempt-id=${o.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(o.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Wa[o.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${o.attempt_id}</span>
              ${o.resumed_from?f`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${o.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[o.runner,o.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${o.session_id?f`<span class="detail-session__sid" title=${o.session_id}
                    >${String(o.session_id).slice(0,8)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Ga(o.started_at)}</span
              >
            </button>
            ${s(o)}
          </div>`)}
    </div>
  `}var ja=["open","in_progress","deferred","resolved","closed"],Ya=[0,1,2,3,4];function uo(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,u={},h=!1,_=!1,$="",y="",C="";function M(){h=!1,_=!1,$="",y="",C=""}let O=document.createElement("div");O.className="md-viewer-root",document.body.appendChild(O);let P=lo(O,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),z=document.createElement("div");z.className="session-log-root",document.body.appendChild(z);let I=fr(z,{transport:s?(g,m)=>Promise.resolve(s(g,m)):void 0,sessionLogStore:l});function v(){if(!i||!a)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(S=>S&&S.bead_id===a).sort((S,E)=>(E.started_at||0)-(S.started_at||0)).map(S=>({attempt_id:S.attempt_id,bead_id:S.bead_id,status:S.status,started_at:typeof S.started_at=="number"?S.started_at:null,runner:S.runner||null,model:S.model||null,session_id:S.session_id||null,resumed_from:S.resumed_from||null}))}function w(g){let m=i?i.get():null,S=m&&m.attempts?m.attempts[g]:null;I.open({attempt_id:g,meta:S?{runner:S.runner||void 0,model:S.model||void 0,effort:S.effort||void 0,status:S.status||void 0,session_id:S.session_id||void 0}:{}})}async function x(g){if(!s||!g)return;let m=()=>{let E=i?i.get():null;return E&&typeof E.revision=="number"?E.revision:0},S=await s("worker-attempt-resume",{attempt_id:g,expected_revision:m()});if(S&&S.conflict){let E=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:m();S=await s("worker-attempt-resume",{attempt_id:g,expected_revision:E})}S&&S.resumed===!1&&!S.conflict&&S.reason&&ee(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}let k={onOpen:w,onResume:x};function B(){let g=i?i.get():null,m=g&&g.exec_defaults;return m&&typeof m=="object"?m:{}}let G=null;r&&r.subscribe&&(G=r.subscribe(()=>Ae()));let X=null;i&&typeof i.subscribe=="function"&&(X=i.subscribe(()=>{a&&N()}));function Q(g){g.key==="Escape"&&a&&(g.preventDefault(),n())}document.addEventListener("keydown",Q);function Ae(){if(a){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+a)||[];c=g.find(S=>S&&S.id===a)||g[0]||c}N()}}function Pe(g){It(g).then(m=>{m?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Te(g){g.preventDefault(),g.stopPropagation(),a&&Pe(a)}function Ve(g,m){g.preventDefault(),g.stopPropagation(),Pe(m)}function Se(g,m){g.preventDefault(),g.stopPropagation(),P.open(m)}function be(g,m){u[g]=m,N(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:g,value:m})).catch(()=>{ee("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function xe(g,m,S){if(!s||!a)return!1;try{let E=await Promise.resolve(s(g,m)),K=Array.isArray(E)?E[0]:E;return K&&typeof K=="object"&&K.id?(c=K,!0):(ee(S,"error"),!1)}catch{return ee(S,"error"),!1}}function Ue(g){setTimeout(()=>{try{let m=t.querySelector(g);m&&typeof m.focus=="function"&&m.focus()}catch{}},0)}function ue(){h=!0,$=c&&c.title||"",N(),Ue('.detail-edit__input[data-edit="title"]')}function Xe(g){$=g.target.value}function le(){h=!1,$="",N()}function Ye(){xe("edit-text",{id:a,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(m=>{m&&(h=!1,$=""),N()})}function oe(){_=!0,y=c&&c.description||"",N(),Ue('.detail-edit__textarea[data-edit="description"]')}function Me(g){y=g.target.value}function A(){_=!1,y="",N()}function R(){xe("edit-text",{id:a,field:"description",value:y},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(m=>{m&&(_=!1,y=""),N()})}function Z(g,m,S,E){if(g.key==="Escape"){g.stopPropagation(),S();return}g.key==="Enter"&&(!E||g.ctrlKey||g.metaKey)&&(g.preventDefault(),m())}function Y(g){let m=g.target.value;xe("update-status",{id:a,status:m},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>N())}function ce(g){let m=Number(g.target.value);xe("update-priority",{id:a,priority:m},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>N())}function ne(g){C=g.target.value}function J(){let g=C.trim();g.length!==0&&xe("label-add",{id:a,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(m=>{m&&(C=""),N()})}function _e(g){if(g.key==="Escape"){g.stopPropagation(),C="",N();return}g.key==="Enter"&&(g.preventDefault(),J())}function ge(g){xe("label-remove",{id:a,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>N())}let Le={onCopyPath:Ve,onOpenDoc:Se},ke={onChange:be};function Ie(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function He(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ee(g){let S=(Array.isArray(g.dependencies)?g.dependencies:[]).map(E=>({id:Ie(E),icon:He(E)})).filter(E=>E.id.length>0);return f`
      <div class="detail-section-label">의존성</div>
      ${S.length===0?f`<div class="detail-empty">의존성 없음</div>`:f`<div class="detail-deps">
            ${S.map(E=>o?f`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(E.id)}
                  >
                    ${E.icon?`${E.icon} `:""}${E.id}
                  </button>`:f`<span class="detail-dep"
                    >${E.icon?`${E.icon} `:""}${E.id}</span
                  >`)}
          </div>`}
    `}function We(g){let m=g.metadata||{},S=g.workflow||{},E=S.stages||{},K=E.spec&&E.spec.stale,pe=E.impl&&E.impl.stale,q=S.route_source==="derived",De=S.route||m.route||"\u2014";return f`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${q?" detail-kv__v--derived":""}"
          title=${q?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${q&&S.route?`${De} ? (\uCD94\uB860)`:De}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${m.spec_review||"\uC5C6\uC74C"}${K?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${m.impl_review||"\uC5C6\uC74C"}${pe?" \xB7 stale":""}</span
        >
      </div>
      ${m.pr_url?f`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${m.pr_url}</span>
          </div>`:""}
    `}let Ze={route:["spec_backed","full_plan"],merge_policy:["auto_merge","pr_stop"],drift_policy:["auto_rereview","halt"]};async function fe(g,m){let S=m.target.value;if(g==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&S!=="full_plan"&&!window.confirm(`full_plan \u2192 ${S||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){N();return}await xe("update-workflow-meta",{id:a,key:g,value:S},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),N()}function Ce(g){let m=g.metadata||{},S=(E,K)=>{let pe=Ze[E],q=typeof m[E]=="string"?m[E]:"";return f`<div class="detail-kv">
        <span class="detail-kv__k">${E}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${E}
          data-edit=${`wfmeta-${E}`}
          @change=${De=>fe(E,De)}
        >
          <option value="" ?selected=${!pe.includes(q)}>
            ${K}
          </option>
          ${pe.map(De=>f`<option value=${De} ?selected=${q===De}>${De}</option>`)}
        </select>
      </div>`};return f`
      ${S("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")}
      ${S("merge_policy","(\uAE30\uBCF8 auto_merge)")}
      ${S("drift_policy","(\uAE30\uBCF8 auto_rereview)")}
    `}function he(g){return h?f`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${Xe}
            @keydown=${m=>Z(m,Ye,le,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ye}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${le}
            >
              취소
            </button>
          </div>
        </div>
      `:f`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ue}
        >
          ✎
        </button>
      </div>
    `}function Re(g){let m=Rt(g.created_at),S=Rt(g.updated_at);return!m&&!S?f``:f`
      ${m?f`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${m}</span>
          </div>`:""}
      ${S?f`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${S}</span>
          </div>`:""}
    `}function T(g,m){return f`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Y}
        >
          ${ja.map(S=>f`<option value=${S} ?selected=${S===g}>${S}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ce}
        >
          ${Ya.map(S=>f`<option value=${String(S)} ?selected=${S===m}>
                P${S}
              </option>`)}
        </select>
      </div>
    `}function D(g){return f`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${_?"":f`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${oe}
            >
              ✎
            </button>`}
      </div>
      ${_?f`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${y}
              @input=${Me}
              @keydown=${m=>Z(m,R,A,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${R}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${A}
              >
                취소
              </button>
            </div>
          </div>`:f`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function j(g){let m=Array.isArray(g.labels)?g.labels:[];return f`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${m.map(S=>f`<span class="detail-label-chip"
              >${S}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${S}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+S}
                @click=${()=>ge(S)}
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
            @input=${ne}
            @keydown=${_e}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${J}
          >
            추가
          </button>
        </span>
      </div>
    `}function W(){if(!a)return f``;let g=c||{},m=String(g.id||a),S=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",E=g.status||"open",K=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",pe=g.description||"",q={...g,metadata:{...g.metadata||{},...u}};return f`
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
            ${m}
          </button>
          ${he(S)} ${T(E,K)}
          ${Re(g)} ${D(pe)}
          ${j(g)} ${Ee(g)}
          ${We(g)} ${Ce(g)}
          ${As(g,Le)}
          ${Ts(q,ke,B())}
          ${co(v(),k)}
        </div>
      </div>
    `}function N(){ae(W(),t)}return{load(g){g!==a&&(u={},M()),a=g,c=null,Ae()},clear(){a=null,c=null,u={},M(),P.close(),I.close(),ae(f``,t)},destroy(){G&&(G(),G=null),X&&(X(),X=null),document.removeEventListener("keydown",Q),P.destroy(),O.parentNode&&O.parentNode.removeChild(O),I.destroy(),z.parentNode&&z.parentNode.removeChild(z),a=null,c=null,ae(f``,t)}}}var Va=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function po(t,e){return Wr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Za(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function fo(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(w){let x=r.get();if(x)try{let k=await n("display-policy-set",{expected_revision:x.revision,policy:w(x)});a(k),k&&k.conflict&&k.policy&&(k=await n("display-policy-set",{expected_revision:k.policy.revision,policy:w(k.policy)}),a(k)),k&&k.conflict&&ee("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ee("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(w){w&&w.policy&&typeof w.policy=="object"&&r.set(w.policy)}function c(w){let x=r.get();if(!x)return;let k=po(w,x)!=="shown";l(B=>Za(w,B,k))}function u(){let w=i.trim();w.length!==0&&(i="",l(x=>x.hidden_prefixes.includes(w)?{hidden_prefixes:x.hidden_prefixes}:{hidden_prefixes:[...x.hidden_prefixes,w]}),M())}function h(w){l(x=>({hidden_prefixes:x.hidden_prefixes.filter(k=>k!==w)}))}function _(w){let x=r.get();if(!x)return;let k=x.chips[w]===!1;l(()=>({chips:{[w]:k}}))}function $(w){let x=s();return f`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${x.length===0?f`<div class="display-settings__empty">라벨 없음</div>`:f`<div class="display-settings__pills">
              ${x.map(k=>{let B=po(k,w);return f`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${B}`}
                  data-label=${k}
                  data-state=${B}
                  @click=${()=>c(k)}
                >
                  ${k}
                </button>`})}
            </div>`}
      </section>
    `}function y(w){return f`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${w.hidden_prefixes.map(x=>f`<span class="display-settings__prefix">
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
          <button type="button" @click=${u}>추가</button>
        </div>
      </section>
    `}function C(w){return f`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Va.map(([x,k])=>f`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${x}
                  .checked=${w.chips[x]!==!1}
                  @change=${()=>_(x)}
                />
                <span>${k}</span>
              </label>`)}
        </div>
      </section>
    `}function M(){let w=r.get();ae(f`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${v}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${w?f`${$(w)} ${y(w)}
                ${C(w)}`:f`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let O=!1,P=()=>{O=!1};o.addEventListener("close",P),o.addEventListener("cancel",P);let z=null;r.subscribe&&(z=r.subscribe(()=>{O&&M()}));function I(){O||(i="",O=!0,M(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function v(){O&&(O=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:I,close:v,destroy(){O=!1,o.removeEventListener("close",P),o.removeEventListener("cancel",P),z&&(z(),z=null),o.remove()}}}function ho(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,u,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let _=typeof h=="string"?h.trim():"";if(s&&(_.length>0?(s.textContent=_,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function mo(t,e,r){let n=we("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return f`
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
      </div>
    `}function l(){ae(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),ae(f``,t)}}}var go=["bug","feature","task","epic","chore"];function bo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var _o=["Critical","High","Medium","Low","Backlog"];function yo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),u=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),_=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let v=document.createElement("option");v.value="",v.textContent="\u2014 Select \u2014",o.appendChild(v);for(let w of go){let x=document.createElement("option");x.value=w,x.textContent=bo(w),o.appendChild(x)}i.replaceChildren();for(let w=0;w<=4;w+=1){let x=document.createElement("option");x.value=String(w);let k=_o[w]||"Medium";x.textContent=`${w} \u2013 ${k}`,i.appendChild(x)}}$();function y(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function C(v){s.disabled=v,o.disabled=v,i.disabled=v,l.disabled=v,a.disabled=v,u.disabled=v,h.disabled=v,h.textContent=v?"Creating\u2026":"Create"}function M(){c.textContent=""}function O(v){c.textContent=v}function P(){try{let v=window.localStorage.getItem("beads-ui.new.type");v?o.value=v:o.value="";let w=window.localStorage.getItem("beads-ui.new.priority");w&&/^\d$/.test(w)?i.value=w:i.value="2"}catch{o.value="",i.value="2"}}function z(){let v=o.value||"",w=i.value||"";v.length>0&&window.localStorage.setItem("beads-ui.new.type",v),w.length>0&&window.localStorage.setItem("beads-ui.new.priority",w)}async function I(){M();let v=String(s.value||"").trim();if(v.length===0){O("Title is required"),s.focus();return}let w=Number(i.value||"2");if(!(w>=0&&w<=4)){O("Priority must be 0..4"),i.focus();return}let x=String(o.value||""),k=String(a.value||""),B={title:v};x.length>0&&(B.type=x),String(w).length>0&&(B.priority=w),k.length>0&&(B.description=k),C(!0);try{await e("create-issue",B)}catch{C(!1),O("Failed to create issue");return}z(),C(!1),y()}return r.addEventListener("cancel",v=>{v.preventDefault(),y()}),_.addEventListener("click",()=>y()),u.addEventListener("click",()=>y()),r.addEventListener("keydown",v=>{v.key==="Enter"&&(v.ctrlKey||v.metaKey)&&(v.preventDefault(),I())}),n.addEventListener("submit",v=>{v.preventDefault(),I()}),{open(){n.reset(),M(),P();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){y()}}}var Ka=[{key:"orchestration_model",values:()=>Zr},{key:"orchestration_effort",values:()=>Kr},{key:"review_model",values:()=>Xr},{key:"impl_model",values:()=>Qr}];function wo(t,e){let{queueStore:r,transport:n}=e,s=document.createElement("dialog");s.id="worker-exec-defaults-dialog",s.className="exec-defaults",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),t.appendChild(s);function o(){return r&&r.get()||{revision:0,exec_defaults:{}}}function i(){let O=o();return typeof O.revision=="number"?O.revision:0}function l(){let O=o().exec_defaults;return O&&typeof O=="object"?O:{}}function a(O){O&&O.queue&&r&&r.set(O.queue)}async function c(O,P){if(!n)return;let z={key:O,value:P||null};try{let I=await n("worker-queue-set-exec-default",{...z,expected_revision:i()});a(I),I&&I.conflict&&(I=await n("worker-queue-set-exec-default",{...z,expected_revision:i()}),a(I)),I&&I.conflict&&ee("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ee("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function u(O,P,z){let I=!!z&&!P.includes(z);return f`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${O}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${O}`}
        data-key=${O}
        @change=${v=>{c(O,v.target.value)}}
      >
        <option value="" ?selected=${!z}>
          ${Jr[O]||"(\uAE30\uBCF8)"}
        </option>
        ${I?f`<option value=${z} ?selected=${!0}>
              ${z} (비호환)
            </option>`:""}
        ${P.map(v=>f`<option value=${v} ?selected=${z===v}>${v}</option>`)}
      </select>
    </div>`}function h(){let O=l();ae(f`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${M}
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
            ${Ka.map(P=>u(P.key,P.values(),O[P.key]||""))}
          </div>
        </div>
      `,s)}let _=!1,$=()=>{_=!1};s.addEventListener("close",$),s.addEventListener("cancel",$);let y=null;r&&r.subscribe&&(y=r.subscribe(()=>{_&&h()}));function C(){_||(_=!0,h(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))}function M(){_&&(_=!1,typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:C,close:M,destroy(){_=!1,s.removeEventListener("close",$),s.removeEventListener("cancel",$),y&&(y(),y=null),s.remove()}}}function Xa(t){let e=t.draggable&&!t.done;return f`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?f`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id" title="클릭하면 ID 복사">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.reason?f`<span class="worker-mini__reason">${t.reason}</span>`:""}
  </div>`}function Qa(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return f`<div
    class="worker-card${e?"":" worker-card--static"}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    <div class="worker-card__head">
      ${e?f`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${t.id}</span>
      ${r&&s?f`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${t.title}</div>
    ${r?pr(r,t.status):""}
    ${t.reason?f`<div class="worker-card__foot">
          <span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >
        </div>`:""}
  </div>`}function er(t){return f`<section
    class="worker-pane${t.src?" worker-pane--src":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${t.title}</span>
      <span class="worker-pane__count">${t.items.length}</span>
    </header>
    <div class="worker-pane__body">
      ${t.items.length===0?f`<div class="worker-pane__empty">${t.empty||""}</div>`:t.items.map(e=>t.lane==="candidate"?Qa(e):Xa(e))}
    </div>
  </section>`}function Ja(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function ko(t){return f`<div class="worker-banners">
    ${t.autoAdvance?f`<div class="worker-banner worker-banner--on" role="status">
          ▶ 자동 진행 켜짐 — Serial head 1 + Parallel 슬롯까지 실행합니다.
        </div>`:f`<div class="worker-banner worker-banner--off" role="status">
          ⏸ 자동 진행 꺼짐 — 새 세션을 시작하지 않습니다. ▶로 재개.
        </div>`}
    ${t.failure?f`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${t.failure.repo||"repo"} 세션 실패 —
          ${t.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${t.failure.resume_attempt_id?f`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.failure.resume_attempt_id}
                ?disabled=${!t.failure.resume_eligible}
                title=${t.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
        </div>`:""}
  </div>`}function el(t,e,r=null){let n=t.lane==="serial"?"serial":"\u2225",s=!!t.paused,o=s?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?Ja(e-t.started_at):"\u2014",i=[t.runner,t.model].filter(Boolean).join(" \xB7 "),l=t.attempt_id&&t.attempt_id===r;return f`<div
    class="rtile${l?" rtile--sel":""}${s?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id">${t.bead_id}</span>
      <span class="rtile__badge rtile__badge--${t.lane}">${n}</span>
      ${t.resumed_from?f`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${t.resumed_from})`}
            >↻</span
          >`:""}
      <span class="rtile__elapsed">${o}</span>
      <button
        type="button"
        class="rtile__info"
        title="상세 보기"
        aria-label="상세 보기"
      >
        ⓘ
      </button>
      ${s?f`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:f`<button
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
    ${i?f`<div class="rtile__meta">${i}</div>`:""}
  </div>`}function vo(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return f`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?f`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>el(s,e,r))}
  </div>`}var tl="tab:worker:ready",rl="tab:worker:blocked";function nl(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function sl(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function ol(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function vn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l}=e,a=n?cr(n,i):null,c=dr({transport:r,uiOrderStore:i}),u=null,h=[],_=[],$=document.createElement("div");$.className="worker-console";let y=document.createElement("div"),C=document.createElement("div");C.className="worker-drawer-host";let M=document.createElement("div");M.className="worker-lanes-host",$.append(y,C,M),t.appendChild($);let O=null,P=fr(C,{transport:r,sessionLogStore:o,onClose:()=>{O=null,Se()}}),z=wo($,{queueStore:s,transport:r});function I(){return s&&s.get()||{revision:0,auto_advance:!1,serial:[],parallel:[],pr_wait:[],done:[]}}function v(){let A=I();return typeof A.revision=="number"?A.revision:0}function w(A){A&&A.queue&&s&&s.set(A.queue)}async function x(A,R,Z){if(!r)return;let Y=await r("worker-queue-place",{bead_id:A,lane:R,index:Z,expected_revision:v()});w(Y),Y&&Y.conflict&&await r("worker-queue-place",{bead_id:A,lane:R,index:Z,expected_revision:v()}).then(w)}async function k(A,R,Z){if(!r)return;let Y=await r("worker-queue-reorder",{bead_id:A,lane:R,to_index:Z,expected_revision:v()});w(Y),Y&&Y.conflict&&await r("worker-queue-reorder",{bead_id:A,lane:R,to_index:Z,expected_revision:v()}).then(w)}async function B(A){if(!r)return;let R=await r("worker-queue-remove",{bead_id:A,expected_revision:v()});w(R),R&&R.conflict&&await r("worker-queue-remove",{bead_id:A,expected_revision:v()}).then(w)}async function G(A){!r||!A||await r("worker-attempt-stop",{attempt_id:A})}async function X(A){if(!r||!A)return;let R=await r("worker-attempt-pause",{attempt_id:A});R&&R.paused===!1&&R.reason&&ee(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${R.reason}`,"error",2400)}async function Q(A){if(!r||!A)return;let R=await r("worker-attempt-resume",{attempt_id:A,expected_revision:v()});w(R),R&&R.conflict&&(R=await r("worker-attempt-resume",{attempt_id:A,expected_revision:v()}),w(R)),R&&R.resumed===!1&&!R.conflict&&R.reason&&ee(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${R.reason}`,"error",2400)}async function Ae(A){if(!r)return;let R=await r("worker-queue-toggle",{on:A,expected_revision:v()});w(R),R&&R.conflict&&await r("worker-queue-toggle",{on:A,expected_revision:v()}).then(w)}function Pe(){let A=I(),R=a?a.selectBoardColumn(tl,"ready"):[],Z=a?a.selectBoardColumn(rl,"blocked"):[],Y=new Map;for(let m of[...R,...Z])Y.set(m.id,m.title||m.id);let ce=A.pr_wait||[],ne=new Set([...A.serial.map(m=>m.bead_id),...A.parallel.map(m=>m.bead_id),...ce.map(m=>m.bead_id),...A.done.map(m=>m.bead_id)]),J=new Set(Z.map(m=>m.id)),_e=i?i.get()?.order||{}:{},ge=new Set,Le=[];for(let m of[...R,...Z])ne.has(m.id)||ge.has(m.id)||sl(m)||(ge.add(m.id),Le.push(m));Le.sort(ar(_e)),h=Le;let ke=A.admission||{},Ie=m=>ke[m]?`\u26D4 ${ke[m].reason}`:"",He=Le.map(m=>{let S=nl(m),E=[];J.has(m.id)&&E.push(ol(m)),S||E.push("spec \uC5C6\uC74C");let K=Ie(m.id);return K&&E.push(K),{id:m.id,title:m.title||m.id,reason:E.join(" \xB7 "),draggable:S,lane:"candidate",workflow:m.workflow,status:m.status}}),Ee=(m,S)=>m.map(E=>({id:E.bead_id,title:Y.get(E.bead_id)||E.bead_id,reason:S==="done"?"":Ie(E.bead_id),draggable:S!=="done",done:S==="done",lane:S})),We=new Map;for(let m of A.serial||[])We.set(m.bead_id,"serial");for(let m of A.parallel||[])We.set(m.bead_id,"parallel");let Ze=A.attempts?Object.values(A.attempts):[],fe=new Set;for(let m of Ze)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&fe.add(m.resumed_from);let Ce=[],he=null;for(let m of Ze){let S=m.status==="paused"&&!fe.has(m.attempt_id);m.status==="running"||S?Ce.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Y.get(m.bead_id)||m.bead_id,lane:We.get(m.bead_id)||"parallel",runner:m.runner||null,model:m.model||null,effort:m.effort||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:S,can_pause:typeof m.session_id=="string"&&m.session_id.length>0}):(m.status==="failed"||m.status==="orphaned")&&(he=m)}let Re=null;if(he){let m=typeof he.session_id=="string"&&he.session_id.length>0,S=fe.has(he.attempt_id);Re={repo:he.repo||"",reason:he.cause||he.status,resume_attempt_id:he.attempt_id,resume_eligible:m&&!S,resume_reason:m?S?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let T=Ce.filter(m=>!m.paused),D=T.length,j=T.filter(m=>m.lane==="serial").length,W=D-j,N=(A.workspace_info||{}).parallel_slots,g=j>1||typeof N=="number"&&W>N;return{queue:A,idToTitle:Y,candidates:He,running:Ce,live_count:D,over_cap:g,failure:Re,serial:Ee(A.serial,"serial"),parallel:Ee(A.parallel,"parallel"),done:[...ce.map(m=>({id:m.bead_id,title:Y.get(m.bead_id)||m.bead_id,reason:"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait"})),...Ee(A.done,"done")]}}function Te(A){let R=A.serial.length>0?A.serial[0].id:"\u2014";return f`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${A.queue.auto_advance?" is-active":""}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${A.live_count}</b> · serial 다음 <b>${R}</b></span
        >
        ${A.over_cap?f`<span
              class="worker-overcap"
              title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
              >cap 초과</span
            >`:""}
        <span class="worker-tgl"
          >parallel slot <b>${A.parallel.length}</b></span
        >
        <button
          type="button"
          class="worker-exec-defaults-btn"
          aria-haspopup="dialog"
          aria-label="전역 실행 설정"
          title="전역 실행 설정"
        >
          ⚙
        </button>
      </div>
      ${ko({autoAdvance:!!A.queue.auto_advance,failure:A.failure})}
      ${vo(A.running,Date.now(),O)}`}function Ve(A){return f`<div class="worker-lanes">
      ${er({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:A.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${er({id:"worker-pane-serial",lane:"serial",title:"Serial \uD050",items:A.serial,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${er({id:"worker-pane-parallel",lane:"parallel",title:"Parallel \uD480",items:A.parallel,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${er({id:"worker-pane-done",lane:"done",title:`Done \xB7 \uC624\uB298 ${A.done.length}`,items:A.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Se(){let A=Pe();ae(Te(A),y),ae(Ve(A),M)}function be(A){let R=A.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!R)return;let Z=R.dataset.beadId||"",Y=R.dataset.lane||"";u={bead_id:Z,from_lane:Y};try{A.dataTransfer?.setData("text/plain",Z),A.dataTransfer&&(A.dataTransfer.effectAllowed="move")}catch{}}function xe(A){let R=A.target?.closest?.(".worker-pane");R&&(A.preventDefault(),A.dataTransfer&&(A.dataTransfer.dropEffect="move"),R.classList.add("worker-pane--drag-over"))}function Ue(A){A.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ue(A,R){let Z=h.find(J=>J.id===A);if(!Z)return;let Y=h.filter(J=>J.id!==A),ce=Y.length;if(R){let J=R.dataset.beadId;if(J===A)return;let _e=Y.findIndex(ge=>ge.id===J);_e>=0&&(ce=_e)}let ne=Y.slice();ne.splice(ce,0,Z),c.applyReorder(A,ne,ce)}function Xe(A){let R=A.target?.closest?.(".worker-pane");if(!R)return;A.preventDefault(),R.classList.remove("worker-pane--drag-over");let Z=R.dataset.lane||"",Y=u?.bead_id||A.dataTransfer?.getData("text/plain")||"",ce=u?.from_lane||"";if(u=null,!Y)return;let ne=A.target?.closest?.(".worker-mini, .worker-card"),J=Array.from(R.querySelectorAll(".worker-mini, .worker-card")),_e=J.length;if(ne){let ge=J.indexOf(ne);ge>=0&&(_e=ge)}if(Z==="candidate"){if(ce==="candidate"){ue(Y,ne);return}(ce==="serial"||ce==="parallel")&&B(Y);return}(Z==="serial"||Z==="parallel")&&(ce===Z?k(Y,Z,_e):x(Y,Z,_e))}function le(A){return A?{runner:A.runner||void 0,model:A.model||void 0,effort:A.effort||void 0,worktree:A.worktree||void 0,status:A.status||void 0,session_id:A.session_id||void 0}:{}}function Ye(A){let R=I(),Z=R.attempts?R.attempts[A]:null;O=A,P.open({attempt_id:A,meta:le(Z)}),Se()}function oe(){if(!O)return;let A=I(),R=A.attempts?A.attempts[O]:null;R&&P.updateMeta(le(R))}function Me(A){let R=A.target;if(R?.closest?.("#worker-exec-defaults-dialog"))return;if(R?.closest?.(".worker-exec-defaults-btn")){z.open();return}let Z=R?.closest?.(".worker-banner__resume");if(Z){let ne=Z.dataset.attemptId;ne&&Q(ne);return}if(R?.closest?.(".worker-play")){Ae(!0);return}if(R?.closest?.(".worker-pause")){Ae(!1);return}if(R?.closest?.(".rtile__stop")){let J=R?.closest?.(".rtile")?.dataset?.attemptId;J&&G(J);return}if(R?.closest?.(".rtile__pause")){let J=R?.closest?.(".rtile")?.dataset?.attemptId;J&&X(J);return}if(R?.closest?.(".rtile__resume")){let J=R?.closest?.(".rtile")?.dataset?.attemptId;J&&Q(J);return}if(R?.closest?.(".rtile__info")){let J=R?.closest?.(".rtile")?.dataset?.beadId;J&&l&&l(J);return}if(R?.closest?.(".worker-drawer-host"))return;let Y=R?.closest?.(".rtile");if(Y){let ne=Y.dataset.attemptId;ne&&Ye(ne);return}let ce=R?.closest?.(".worker-mini, .worker-card");if(ce){let ne=ce.dataset.beadId;if(R?.closest?.(".worker-mini__id, .worker-card__id")){ne&&It(ne).then(J=>{J?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ne&&l&&l(ne)}}return t.addEventListener("dragstart",be),t.addEventListener("dragover",xe),t.addEventListener("dragleave",Ue),t.addEventListener("drop",Xe),t.addEventListener("click",Me),a&&_.push(a.subscribe(Se)),s&&_.push(s.subscribe(()=>{Se(),oe()})),Se(),{load(){Se()},destroy(){for(let A of _.splice(0))try{A()}catch{}t.removeEventListener("dragstart",be),t.removeEventListener("dragover",xe),t.removeEventListener("dragleave",Ue),t.removeEventListener("drop",Xe),t.removeEventListener("click",Me);try{P.destroy()}catch{}try{z.destroy()}catch{}ae(f``,t)}}}function xn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function xo(t,e,r,n=async()=>{},s=async()=>{}){let o=we("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function u(w){let k=w.target.value,G=e.getState().workspace?.current?.path||"";if(k&&k!==G){o("switching workspace to %s",k),l=!0,v();try{await r(k)}catch(X){o("workspace switch failed: %o",X)}finally{l=!1,v()}}}async function h(){let w=e.getState(),x=w.workspace?.current?.path||w.workspace?.available?.[0]?.path||"";if(!(!x||a)){o("git-pulling workspace %s",x),a=!0,v();try{await n(x)}catch(k){o("workspace git pull failed: %o",k)}finally{a=!1,v()}}}function _(w){let x=w.target;x&&t.contains(x)||C()}function $(w){w.key==="Escape"&&C()}function y(){c||(c=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",$),v())}function C(){c&&(c=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",$),v())}function M(){c?C():y()}async function O(w){let x=w.target,k=x.value,B=x.checked;o("toggling visibility %s \u2192 %s",k,String(B));try{await s(k,B)}catch(G){o("workspace visibility toggle failed: %o",G)}}function P(w){return w?f`
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
    `:f``}function z(w,x){return f`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${M}
          aria-haspopup="true"
          aria-expanded=${c?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${c?f`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${w.map(k=>f`
                    <label
                      class="workspace-picker__manage-row"
                      title="${k.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${k.path}"
                        .checked=${!x.has(k.path)}
                        @change=${O}
                      />
                      <span class="workspace-picker__manage-name"
                        >${xn(k.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let w=e.getState(),x=w.workspace?.current,k=w.workspace?.available||[],B=new Set(w.workspace?.hidden||[]),G=x?.path||k[0]?.path||"";if(k.length===0)return f``;let X=k.filter(Q=>!B.has(Q.path)||Q.path===G);if(X.length<=1){let Q=X[0]||k[0],Ae=xn(Q.path);return f`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Q.path}"
            >${Ae}</span
          >
          ${z(k,B)}
          ${P(G)}
          ${a?f`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return f`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${u}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${X.map(Q=>f`
              <option
                value="${Q.path}"
                ?selected=${Q.path===G}
                title="${Q.path}"
              >
                ${xn(Q.path)}
              </option>
            `)}
        </select>
        ${z(k,B)}
        ${P(G)}
        ${l||a?f`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function v(){ae(I(),t)}return v(),i=e.subscribe(()=>v()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",$),ae(f``,t)}}}var $o=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function $n(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function So(t,e,r=$n()){return{id:r,type:t,payload:e}}function Ao(t={}){let e=we("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,u=[],h=new Map,_=new Set;function $(I){for(let v of Array.from(_))try{v(I)}catch{}}function y(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),$(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),v=(r.jitterRatio||0)*I,w=Math.max(0,Math.round(I+(Math.random()*2-1)*v));e("ws retry in %d ms (attempt %d)",w,i+1),l=setTimeout(()=>{l=null,z()},w)}function C(I){try{s?.send(JSON.stringify(I))}catch(v){e("ws send failed",v)}}function M(){for(o="open",e("ws open"),$(o),i=0;u.length;){let I=u.shift();I&&C(I)}}function O(I){let v;try{v=JSON.parse(String(I.data))}catch{e("ws received non-JSON message");return}if(!v||typeof v.id!="string"||typeof v.type!="string"){e("ws received invalid envelope");return}if(c.has(v.id)){let x=c.get(v.id);c.delete(v.id),v.ok?x?.resolve(v.payload):x?.reject(v.error||new Error("ws error"));return}let w=h.get(v.type);if(w&&w.size>0)for(let x of Array.from(w))try{x(v.payload)}catch(k){e("ws event handler error",k)}else e("ws received unhandled message type: %s",v.type)}function P(){o="closed",e("ws closed"),$(o);for(let[I,v]of c.entries())v.reject(new Error("ws disconnected")),c.delete(I);i+=1,y()}function z(){if(!a)return;let I=n();try{s=new WebSocket(I),e("ws connecting %s",I),o="connecting",$(o),s.addEventListener("open",M),s.addEventListener("message",O),s.addEventListener("error",()=>{}),s.addEventListener("close",P)}catch(v){e("ws connect failed %o",v),y()}}return z(),{send(I,v){if(!$o.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let w=$n(),x=So(I,v,w);return e("send %s id=%s",I,w),new Promise((k,B)=>{c.set(w,{resolve:k,reject:B,type:I}),s&&s.readyState===s.OPEN?C(x):(e("queue %s id=%s (state=%s)",I,w,o),u.push(x))})},on(I,v){h.has(I)||h.set(I,new Set);let w=h.get(I);return w?.add(v),()=>{w?.delete(v)}},onConnection(I){return _.add(I),()=>{_.delete(I)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,z()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function il(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function al(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var Sn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],To=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Eo="worker:queue",Co="ui:order",Ro="ui:display-policy",dt="tab:board:closed",Lo="beads-ui.board.closed-range";function ll(t){let e=we("main");e("bootstrap start");let r=f`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ae(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let k=function(p,b){let V="Request failed",H="";if(p&&typeof p=="object"){let ye=p;if(typeof ye.message=="string"&&ye.message.length>0&&(V=ye.message),typeof ye.details=="string")H=ye.details;else if(ye.details&&typeof ye.details=="object")try{H=JSON.stringify(ye.details,null,2)}catch{H=""}}else typeof p=="string"&&p.length>0&&(V=p);let te=b&&b.length>0?`Failed to load ${b}`:"Request failed";x.open(te,V,H)},oe=function(p){return`${E.getState().workspace.current?.path||""}\0${p}`},Me=function(){Se&&(Se().catch(()=>{}),Se=null),be=null,xe=null},R=function(p){Ue=p;let b=()=>{Ue!==p||E.getState().selected_id!==p||(Ue=null,A(p))};if(!le){Xe.then(b);return}b()},ne=function(){let p=jn(ce);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},J=function(p){if(p)for(let[b,V]of Sn){if(Z.has(b)||Y.has(b))continue;let H=b===dt?ne():{type:V};try{Q.register(b,H)}catch(te){e("register %s store failed: %o",b,te)}Y.add(b),X.subscribeList(b,H).then(te=>{Z.set(b,te)}).catch(te=>{e("subscribe %s failed: %o",b,te),k(te,"board")}).finally(()=>{Y.delete(b)})}else ge()},ge=function(){for(let[p]of Sn){let b=Z.get(p);b&&(b().catch(()=>{}),Z.delete(p));try{Q.unregister(p)}catch(V){e("unregister %s failed: %o",p,V)}}},Ie=function(p){if(!p){He();return}for(let[b,V]of To)if(!(Le.has(b)||Y.has(b))){try{Q.register(b,{type:V})}catch(H){e("register %s store failed: %o",b,H)}Y.add(b),X.subscribeList(b,{type:V}).then(H=>{Le.set(b,H)}).catch(H=>{e("subscribe %s failed: %o",b,H),k(H,"worker")}).finally(()=>{Y.delete(b)})}ke||(G("subscribe-worker-queue",{id:Eo}).catch(b=>{e("subscribe-worker-queue failed: %o",b)}),ke=()=>G("unsubscribe-worker-queue",{id:Eo}))},He=function(){for(let[p]of To){let b=Le.get(p);b&&(b().catch(()=>{}),Le.delete(p));try{Q.unregister(p)}catch(V){e("unregister %s failed: %o",p,V)}}ke&&(ke().catch(()=>{}),ke=null)},We=function(){Ee||(G("subscribe-ui-order",{id:Co}).catch(p=>{e("subscribe-ui-order failed: %o",p)}),Ee=()=>G("unsubscribe-ui-order",{id:Co}))},Ze=function(){Ee&&(Ee().catch(()=>{}),Ee=null),Pe.clear()},Ce=function(){fe||(G("subscribe-display-policy",{id:Ro}).catch(p=>{e("subscribe-display-policy failed: %o",p)}),fe=()=>G("unsubscribe-display-policy",{id:Ro}))},he=function(){fe&&(fe().catch(()=>{}),fe=null),Te.clear()},N=function(p){if(!p)return"Unknown";let b=p.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var l=k,a=oe,c=Me,u=R,h=ne,_=J,$=ge,y=Ie,C=He,M=We,O=Ze,P=Ce,z=he,I=N;let v=document.getElementById("header-loading"),w=ms(v),x=ho(t),B=Ao(),G=w.wrapSend((p,b)=>B.send(p,b)),X=ls(G),Q=cs(),Ae=us(),Pe=ds(),Te=Yn(),Ve=Vn();B.on("worker-queue-snapshot",p=>{let b=p;if(b&&b.queue)try{Ae.set(b.queue)}catch{}}),B.on("ui-order-snapshot",p=>{let b=p;if(b&&typeof b.revision=="number")try{Pe.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),B.on("display-policy-snapshot",p=>{let b=p;if(b&&b.policy&&typeof b.policy=="object")try{Te.set(b.policy)}catch{}}),B.on("session-log-snapshot",p=>{let b=p;if(b&&typeof b.attempt_id=="string")try{Ve.set(b.attempt_id,Array.isArray(b.lines)?b.lines:[])}catch{}}),B.on("session-log-append",p=>{let b=p;if(b&&typeof b.attempt_id=="string")try{Ve.append(b.attempt_id,b.event)}catch{}}),B.on("snapshot",p=>{let b=p,V=b&&typeof b.id=="string"?b.id:"",H=V?Q.getStore(V):null;if(H&&b&&b.type==="snapshot")try{H.applyPush(b)}catch{}}),B.on("upsert",p=>{let b=p,V=b&&typeof b.id=="string"?b.id:"",H=V?Q.getStore(V):null;if(H&&b&&b.type==="upsert")try{H.applyPush(b)}catch{}}),B.on("delete",p=>{let b=p,V=b&&typeof b.id=="string"?b.id:"",H=V?Q.getStore(V):null;if(H&&b&&b.type==="delete")try{H.applyPush(b)}catch{}});let Se=null,be=null,xe=null,Ue=null,ue=()=>{},Xe=new Promise(p=>{ue=()=>p(void 0)}),le=!1,Ye=!1;async function A(p){let b=oe(p);if(b===be||b===xe)return;xe=b;let V=`detail:${p}`,H={type:"issue-detail",params:{id:p}};try{Q.register(V,H)}catch(te){e("register detail store failed: %o",te)}try{let te=await X.subscribeList(V,H);if(E.getState().selected_id!==p||oe(p)!==b){await te().catch(()=>{});return}Se&&await Se().catch(()=>{}),Se=te,be=b}catch(te){e("detail subscribe failed: %o",te),k(te,"issue details")}finally{xe===b&&(xe=null)}}let Z=new Map,Y=new Set,ce=sr;try{let p=window.localStorage.getItem(Lo);Br(p)&&(ce=p)}catch{}async function _e(p){if(!Br(p)||p===ce)return;ce=p;try{window.localStorage.setItem(Lo,p)}catch{}let b=Z.get(dt);if(!b)return;Z.delete(dt),await b().catch(()=>{});let V=ne();try{Q.register(dt,V)}catch(H){e("register %s store failed: %o",dt,H)}try{let H=await X.subscribeList(dt,V);Z.set(dt,H)}catch(H){e("re-subscribe %s failed: %o",dt,H),k(H,"board")}}let Le=new Map,ke=null,Ee=null,fe=null;async function Re(){fe=null,Te.clear();let p=E.getState().workspace.current?.path;if(p)try{await B.send("set-workspace",{path:p})}catch(b){e("workspace restore after reconnect failed: %o",b);return}Ce()}async function T(){e("clearing all subscriptions for workspace switch"),ge(),He(),Ae.clear(),Ze(),We(),he(),Ce(),Me();let p=E.getState();if(p.selected_id)try{Q.unregister(`detail:${p.selected_id}`)}catch{}let b=E.getState();J(b.view==="board"),Ie(b.view==="worker"),b.selected_id&&R(b.selected_id)}async function D(p){e("requesting workspace switch to %s",p),Ye=!0;try{let b=await B.send("set-workspace",{path:p});e("workspace switch result: %o",b),b&&b.workspace&&(E.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",p),b.changed&&(await T(),ee("Switched to "+N(p),"success",2e3)))}catch(b){throw e("workspace switch failed: %o",b),ee("Failed to switch workspace","error",3e3),b}finally{Ye=!1}}async function j(p){e("requesting workspace git pull for %s",p);try{let b=await B.send("git-pull-workspace",{});e("workspace git pull result: %o",b);let V=b?.status;if(V==="up_to_date"){ee("Already up to date","success",2e3);return}if(V==="stash_pop_conflict"){ee("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ee("Git pulled "+N(p),"success",2e3)}catch(b){e("workspace git pull failed: %o",b);let V=b?.code,H=b?.message;if(V==="rebase_conflict"){ee("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(V==="rebase_conflict_abort_failed"){ee("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(V==="busy"){ee("Git pull skipped: another operation is running","warning",3e3);return}let te=H?`: ${H}`:"";throw ee(`Git pull failed${te}`,"error",3e3),b}}async function W(p,b){e("setting workspace visibility %s \u2192 %s",p,String(b));try{await B.send("set-workspace-visibility",{path:p,visible:b}),await g()}catch(V){e("workspace visibility update failed: %o",V),ee("Failed to update project visibility","error",3e3)}}async function g(){try{let p=await B.send("list-workspaces",{});if(e("workspaces loaded: %o",p),p&&Array.isArray(p.workspaces)){let b=p.workspaces.map(ye=>({path:ye.path,database:ye.database,pid:ye.pid,version:ye.version})),V=p.current?{path:p.current.root_dir,database:p.current.db_path}:null,H=Array.isArray(p.hidden)?p.hidden.filter(ye=>typeof ye=="string"):[];E.setState({workspace:{current:V,available:b,hidden:H}});let te=window.localStorage.getItem("beads-ui.workspace");te&&(!b.some(rr=>rr.path===te)||H.includes(te)?window.localStorage.removeItem("beads-ui.workspace"):V&&te!==V.path&&(e("restoring saved workspace preference: %s",te),await D(te)))}}catch(p){e("failed to load workspaces: %o",p)}}B.on("workspace-changed",p=>{e("workspace-changed event: %o",p),p&&p.root_dir&&(E.setState({workspace:{current:{path:p.root_dir,database:p.db_path}}}),g(),T())});let m=!1;if(typeof B.onConnection=="function"){let p=b=>{e("ws state %s",b),b==="reconnecting"||b==="closed"?(m=!0,ee("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&m&&(m=!1,ee("Reconnected","success",2200),al(E,(V,H)=>{e(`${V}: %o`,H)}),Re())};B.onConnection(p)}let S="board";try{let p=window.localStorage.getItem("beads-ui.view");(p==="board"||p==="worker")&&(S=p)}catch(p){e("view parse error: %o",p)}let E=hs({config:il(),view:S}),K=ps(E);K.start();let pe=async(p,b)=>{try{return await G(p,b)}catch{return[]}};n&&mo(n,E,K);let q=document.getElementById("workspace-picker");q&&xo(q,E,D,j,W);let De=yo(t,(p,b)=>G(p,b));try{let p=document.getElementById("new-issue-btn");p&&p.addEventListener("click",()=>De.open())}catch{}let kt=fo(t,{policyStore:Te,transport:(p,b)=>G(p,b),labelOptions:()=>{let p=new Set;for(let[b]of Sn)for(let V of Q.snapshotFor(b)||[]){let H=V.labels;if(Array.isArray(H))for(let te of H)typeof te=="string"&&te.length>0&&p.add(te)}return Array.from(p).sort()}});try{let p=document.getElementById("display-settings-btn");p&&p.addEventListener("click",()=>kt.open())}catch{}let vt=vs(s,{gotoIssue:p=>K.gotoIssue(p),issueStores:Q,transport:pe,uiOrderStore:Pe,displayPolicyStore:Te,closedRange:ce,onClosedRangeChange:p=>{_e(p)},onNewIssue:()=>De.open()}),Ar=vn(o,{transport:pe,issueStores:Q,queueStore:Ae,sessionLogStore:Ve,uiOrderStore:Pe,gotoIssue:p=>E.setState({selected_id:p})}),nt=uo(i,{issueStores:Q,transport:pe,queueStore:Ae,sessionLogStore:Ve,getWorkspacePath:()=>E.getState().workspace.current?.path,onNavigate:p=>{E.getState().view==="worker"?E.setState({selected_id:p}):K.gotoIssue(p)},onClose:()=>{let p=E.getState();E.setState({selected_id:null});try{K.gotoView(p.view==="worker"?"worker":"board")}catch{}}}),Dt=E.getState().selected_id;Dt&&(i.hidden=!1,nt.load(Dt),R(Dt)),E.subscribe(p=>{let b=p.selected_id;b?(i.hidden=!1,nt.load(b),Ye||R(b)):(nt.clear(),i.hidden=!0,Me())});let tr=p=>{s.hidden=p.view!=="board",o.hidden=p.view!=="worker",J(p.view==="board"),Ie(p.view==="worker"),!p.selected_id&&p.view==="board"&&vt.load(),p.view==="worker"&&Ar.load(),window.localStorage.setItem("beads-ui.view",p.view)};E.subscribe(tr),tr(E.getState()),We(),Ce(),g().finally(()=>{le=!0,ue()}),window.addEventListener("keydown",p=>{let b=p.ctrlKey||p.metaKey,V=String(p.key||"").toLowerCase(),H=p.target,te=H&&H.tagName?String(H.tagName).toLowerCase():"",ye=te==="input"||te==="textarea"||te==="select"||H&&typeof H.isContentEditable=="boolean"&&H.isContentEditable;b&&V==="n"&&(ye||(p.preventDefault(),De.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&ll(e)});export{ll as bootstrap,il as readBootstrapConfig,al as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
