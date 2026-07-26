var Mo=Object.create;var Rr=Object.defineProperty;var No=Object.getOwnPropertyDescriptor;var Po=Object.getOwnPropertyNames;var Fo=Object.getPrototypeOf,Bo=Object.prototype.hasOwnProperty;var qo=(t,e,r)=>e in t?Rr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Lr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var zo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Po(e))!Bo.call(t,s)&&s!==r&&Rr(t,s,{get:()=>e[s],enumerable:!(n=No(e,s))||n.enumerable});return t};var Uo=(t,e,r)=>(r=t!=null?Mo(Fo(t)):{},zo(e||!t||!t.__esModule?Rr(r,"default",{value:t,enumerable:!0}):r,t));var fe=(t,e,r)=>qo(t,typeof e!="symbol"?e+"":e,r);var Xn=Lr((yl,Kn)=>{var At=1e3,Tt=At*60,Et=Tt*60,gt=Et*24,Yo=gt*7,Vo=gt*365.25;Kn.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Zo(t);if(r==="number"&&isFinite(t))return e.long?Xo(t):Ko(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Zo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Vo;case"weeks":case"week":case"w":return r*Yo;case"days":case"day":case"d":return r*gt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Et;case"minutes":case"minute":case"mins":case"min":case"m":return r*Tt;case"seconds":case"second":case"secs":case"sec":case"s":return r*At;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ko(t){var e=Math.abs(t);return e>=gt?Math.round(t/gt)+"d":e>=Et?Math.round(t/Et)+"h":e>=Tt?Math.round(t/Tt)+"m":e>=At?Math.round(t/At)+"s":t+"ms"}function Xo(t){var e=Math.abs(t);return e>=gt?sr(t,e,gt,"day"):e>=Et?sr(t,e,Et,"hour"):e>=Tt?sr(t,e,Tt,"minute"):e>=At?sr(t,e,At,"second"):t+" ms"}function sr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Jn=Lr((wl,Qn)=>{function Qo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Xn(),r.destroy=c,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let h=0;for(let b=0;b<u.length;b++)h=(h<<5)-h+u.charCodeAt(b),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(u){let h,b=null,S,y;function R(...M){if(!R.enabled)return;let O=R,P=Number(new Date),z=P-(h||P);O.diff=z,O.prev=h,O.curr=P,h=P,M[0]=r.coerce(M[0]),typeof M[0]!="string"&&M.unshift("%O");let D=0;M[0]=M[0].replace(/%([a-zA-Z%])/g,(w,$)=>{if(w==="%%")return"%";D++;let x=r.formatters[$];if(typeof x=="function"){let B=M[D];w=x.call(O,B),M.splice(D,1),D--}return w}),r.formatArgs.call(O,M),(O.log||r.log).apply(O,M)}return R.namespace=u,R.useColors=r.useColors(),R.color=r.selectColor(u),R.extend=n,R.destroy=r.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(S!==r.namespaces&&(S=r.namespaces,y=r.enabled(u)),y),set:M=>{b=M}}),typeof r.init=="function"&&r.init(R),R}function n(u,h){let b=r(this.namespace+(typeof h>"u"?":":h)+u);return b.log=this.log,b}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let h=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of h)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(u,h){let b=0,S=0,y=-1,R=0;for(;b<u.length;)if(S<h.length&&(h[S]===u[b]||h[S]==="*"))h[S]==="*"?(y=S,R=b,S++):(b++,S++);else if(y!==-1)S=y+1,R++,b=R;else return!1;for(;S<h.length&&h[S]==="*";)S++;return S===h.length}function i(){let u=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),u}function l(u){for(let h of r.skips)if(o(u,h))return!1;for(let h of r.names)if(o(u,h))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Qn.exports=Qo});var es=Lr((Ge,or)=>{Ge.formatArgs=ei;Ge.save=ti;Ge.load=ri;Ge.useColors=Jo;Ge.storage=ni();Ge.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ge.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Jo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ei(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+or.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Ge.log=console.debug||console.log||(()=>{});function ti(t){try{t?Ge.storage.setItem("debug",t):Ge.storage.removeItem("debug")}catch{}}function ri(){let t;try{t=Ge.storage.getItem("debug")||Ge.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function ni(){try{return localStorage}catch{}}or.exports=Jn()(Ge);var{formatters:si}=or.exports;si.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Mt=globalThis,rr=Mt.trustedTypes,Nn=rr?rr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Un="$lit$",lt=`lit$${Math.random().toFixed(9).slice(2)}$`,Hn="?"+lt,Ho=`<${Hn}>`,ht=document,Nt=()=>ht.createComment(""),Pt=t=>t===null||typeof t!="object"&&typeof t!="function",Fr=Array.isArray,Wo=t=>Fr(t)||typeof t?.[Symbol.iterator]=="function",Ir=`[ 	
\f\r]`,Ot=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pn=/-->/g,Fn=/>/g,pt=RegExp(`>|${Ir}(?:([^\\s"'>=/]+)(${Ir}*=${Ir}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bn=/'/g,qn=/"/g,Wn=/^(?:script|style|textarea|title)$/i,Br=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),p=Br(1),fl=Br(2),hl=Br(3),mt=Symbol.for("lit-noChange"),we=Symbol.for("lit-nothing"),zn=new WeakMap,ft=ht.createTreeWalker(ht,129);function Gn(t,e){if(!Fr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nn!==void 0?Nn.createHTML(e):e}var Go=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Ot;for(let l=0;l<r;l++){let a=t[l],c,u,h=-1,b=0;for(;b<a.length&&(i.lastIndex=b,u=i.exec(a),u!==null);)b=i.lastIndex,i===Ot?u[1]==="!--"?i=Pn:u[1]!==void 0?i=Fn:u[2]!==void 0?(Wn.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=pt):u[3]!==void 0&&(i=pt):i===pt?u[0]===">"?(i=s??Ot,h=-1):u[1]===void 0?h=-2:(h=i.lastIndex-u[2].length,c=u[1],i=u[3]===void 0?pt:u[3]==='"'?qn:Bn):i===qn||i===Bn?i=pt:i===Pn||i===Fn?i=Ot:(i=pt,s=void 0);let S=i===pt&&t[l+1].startsWith("/>")?" ":"";o+=i===Ot?a+Ho:h>=0?(n.push(c),a.slice(0,h)+Un+a.slice(h)+lt+S):a+lt+(h===-2?l:S)}return[Gn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Ft=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,u]=Go(e,r);if(this.el=t.createElement(c,n),ft.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=ft.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Un)){let b=u[i++],S=s.getAttribute(h).split(lt),y=/([.?@])?(.*)/.exec(b);a.push({type:1,index:o,name:y[2],strings:S,ctor:y[1]==="."?Or:y[1]==="?"?Mr:y[1]==="@"?Nr:St}),s.removeAttribute(h)}else h.startsWith(lt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Wn.test(s.tagName)){let h=s.textContent.split(lt),b=h.length-1;if(b>0){s.textContent=rr?rr.emptyScript:"";for(let S=0;S<b;S++)s.append(h[S],Nt()),ft.nextNode(),a.push({type:2,index:++o});s.append(h[b],Nt())}}}else if(s.nodeType===8)if(s.data===Hn)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(lt,h+1))!==-1;)a.push({type:7,index:o}),h+=lt.length-1}o++}}static createElement(e,r){let n=ht.createElement("template");return n.innerHTML=e,n}};function $t(t,e,r=t,n){if(e===mt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Pt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=$t(t,s._$AS(t,e.values),s,n)),e}var Dr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??ht).importNode(r,!0);ft.currentNode=s;let o=ft.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new Bt(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Pr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=ft.nextNode(),i++)}return ft.currentNode=ht,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Bt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=we,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=$t(this,e,r),Pt(e)?e===we||e==null||e===""?(this._$AH!==we&&this._$AR(),this._$AH=we):e!==this._$AH&&e!==mt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Wo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==we&&Pt(this._$AH)?this._$AA.nextSibling.data=e:this.T(ht.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Ft.createElement(Gn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Dr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=zn.get(e.strings);return r===void 0&&zn.set(e.strings,r=new Ft(e)),r}k(e){Fr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Nt()),this.O(Nt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},St=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=we,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=we}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=$t(this,e,r,0),i=!Pt(e)||e!==this._$AH&&e!==mt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=$t(this,l[n+a],r,a),c===mt&&(c=this._$AH[a]),i||(i=!Pt(c)||c!==this._$AH[a]),c===we?e=we:e!==we&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===we?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Or=class extends St{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===we?void 0:e}},Mr=class extends St{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==we)}},Nr=class extends St{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=$t(this,e,r,0)??we)===mt)return;let n=this._$AH,s=e===we&&n!==we||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==we&&(n===we||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Pr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){$t(this,e)}};var jo=Mt.litHtmlPolyfillSupport;jo?.(Ft,Bt),(Mt.litHtmlVersions??(Mt.litHtmlVersions=[])).push("3.3.1");var ce=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Bt(e.insertBefore(Nt(),o),o,void 0,r??{})}return s._$AI(t),s};var nr="today",jn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function qr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Yn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Vn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Zn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var ts=Uo(es(),1);function _e(t){return(0,ts.default)(`beads-ui:${t}`)}function Xe(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function qt(t,e){let r=Xe(t.created_at),n=Xe(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ss(t,e){let r=Xe(t.created_at),n=Xe(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function os(t,e){let r=Xe(t.updated_at),n=Xe(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function is(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=Xe(t.created_at),o=Xe(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function as(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var oi=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function rs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ns(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=oi.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ls(t,e){let r=rs(t),n=rs(e);if(r!==n)return r<n?-1:1;let s=ns(t),o=ns(e);if(s!==o)return s<o?-1:1;let i=Xe(t&&t.created_at),l=Xe(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var zr=2**20;function Ct(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-Xe(t&&t.created_at)}function ir(t){return(e,r)=>{let n=Ct(e,t),s=Ct(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Ur(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ct(l,r)-zr};if(!l)return{rank:Ct(i,r)+zr};let a=Ct(i,r),c=Ct(l,r),u=(a+c)/2;return a<u&&u<c?{rank:u}:{renormalize:n.map((h,b)=>({bead_id:h.id,rank:b*zr}))}}function Hr(t,e={}){let r=_e(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||qt;function c(){for(let b of Array.from(i))try{b()}catch{}}function u(){s=Array.from(n.values()).sort(a)}function h(b){if(l||!b||b.id!==t)return;let S=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,S),!(S<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(S<=o)return;n.clear();let y=Array.isArray(b.issues)?b.issues:[];for(let R of y)R&&typeof R.id=="string"&&R.id.length>0&&n.set(R.id,R);u(),o=S,c();return}if(b.type==="upsert"){let y=b.issue;if(y&&typeof y.id=="string"&&y.id.length>0){let R=n.get(y.id);if(!R)n.set(y.id,y);else{let M=Number.isFinite(R.updated_at)?R.updated_at:0,O=Number.isFinite(y.updated_at)?y.updated_at:0;if(M<=O){for(let P of Object.keys(R))P in y||delete R[P];for(let[P,z]of Object.entries(y))R[P]=z}}u()}o=S,c()}else if(b.type==="delete"){let y=String(b.issue_id||"");y&&(n.delete(y),u()),o=S,c()}}}return{id:t,subscribe(b){return i.add(b),()=>{i.delete(b)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function ar(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function cs(t){let e=_e("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let u=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let S of Array.from(c)){let y=r.get(S);if(!y)continue;let R=y.itemsById;for(let M of u)typeof M=="string"&&M.length>0&&R.set(M,!0);for(let M of h)typeof M=="string"&&M.length>0&&R.set(M,!0);for(let M of b)typeof M=="string"&&M.length>0&&R.delete(M)}}async function o(l,a){let c=ar(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let b=n.get(h.key);b&&(b.delete(l),b.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let u=n.get(c);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let b=r.get(l)||null;if(b){let S=n.get(b.key);S&&(S.delete(l),S.size===0&&n.delete(b.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let b=n.get(h.key);b&&(b.delete(l),b.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ar,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let u of a.itemsById.keys())c[u]=!0;return c}}}}function ds(){let t=_e("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,u){let h=c?ar(c):"",b=r.get(a)||"",S=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,b),S&&b&&h&&b!==h){let y=e.get(a);if(y)try{y.dispose()}catch{}let R=s.get(a);if(R){try{R()}catch{}s.delete(a)}let M=Hr(a,u);e.set(a,M);let O=M.subscribe(()=>o());s.set(a,O)}else if(!S){let y=Hr(a,u);e.set(a,y);let R=y.subscribe(()=>o());s.set(a,R)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let u=s.get(a);if(u){try{u()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function us(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ps(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Wr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function ii(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ai(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function fs(t){let e=_e("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):ii(n),i=ai(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Wr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Wr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var li=Object.freeze({workspace_config:{default_workspace:null}});function hs(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:li.workspace_config.default_workspace}}}function ms(t={}){let e=_e("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:hs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?hs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,u)=>c!==r.workspace.hidden[u]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,u)=>c===r.worker.show_closed_children[u])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function gs(t){let e=_e("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,b)=>{let S=s++,y=Date.now();n.set(S,{type:h,start_ts:y}),e("request start id=%d type=%s count=%d",S,h,r+1),i();let R=!1,M=()=>{R||(R=!0,n.delete(S),l())},O=setTimeout(()=>{R||(e("request TIMEOUT id=%d type=%s elapsed=%dms",S,h,Date.now()-y),M())},3e4);try{let P=await c(h,b),z=Date.now()-y;return e("request done id=%d type=%s elapsed=%dms",S,h,z),P}catch(P){let z=Date.now()-y;throw e("request error id=%d type=%s elapsed=%dms err=%o",S,h,z,P),P}finally{clearTimeout(O),M()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([u,h])=>({id:u,type:h.type,elapsed_ms:c-h.start_ts}))}}}function J(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function lr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(as),a;switch(l){case"created_desc":return a.sort(qt),a;case"created_asc":return a.sort(ss),a;case"updated_desc":return a.sort(os),a;case"priority":return a.sort(is),a;case"manual":default:{let c=r();return c?a.sort(ir(c)):a.sort(qt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function cr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},u=n(Ur(l,a,c.order),i);s(c,u);let h=await e("ui-order-set",{expected_revision:c.revision,entries:u});if(h&&h.conflict){let b={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(b);let S=n(Ur(l,a,b.order),i);s(b,S);let y=await e("ui-order-set",{expected_revision:b.revision,entries:S});y&&y.applied&&r.set({revision:typeof y.revision=="number"?y.revision:0,order:y.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function dr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Gr(t,e){return!e||typeof t!="string"||t.length===0||dr(e.visible_labels).includes(t)?!0:dr(e.hidden_labels).includes(t)?!1:!dr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function bs(t,e){return dr(t).filter(r=>Gr(r,e))}function bt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function jr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Rt(t){let e=jr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Yr(t,e){let r=jr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var ci={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},di={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},ui={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},pi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function fi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function hi(t,e,r){let n=ci[t]||t,s=e&&e.state||"empty",o=pi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return p`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${di[t]||t}
      </div>
    </div>
  `}function ur(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=ui[r],s=t.stages,o=fi(n,s,String(e||"open"));return p`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>hi(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function mi(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var _s=2;function gi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(p`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,_s).join(", "),s=r.length-_s,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(p`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function bi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&bt(r,"route")){let o=n.route_source==="derived";s.push(p`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&bt(r,"fast_track")&&s.push(p`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&bt(r,"pr")){let o=n.pr.number;s.push(p`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of bs(t.labels,r))s.push(p`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&bt(r,"from")&&s.push(p`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),bt(r,"blocked")&&s.push(...gi(t.blocked_info)),s.length===0?"":p`<div class="board-card__chips">${s}</div>`}function _i(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function yi(t){let e=Yr(t.created_at),r=Yr(t.updated_at);return!e&&!r?"":p`<span class="board-card__times">
    ${e?p`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Rt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?p`<span class="board-card__time-sep">·</span>`:""}
    ${r?p`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Rt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function wi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(ls):r.children;return p`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?p`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:p`<span class="board-card__roll-none">children 없음</span>`}
        ${yi(t)}
      </div>
      ${n>0&&r.current?p`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?p`<div class="board-card__roll-list">
            ${o.map((i,l)=>p`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${_i(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function ys(t,e){let r=mi(t.priority);return p`
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
        ${r?p`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${bi(t,e)}
      ${t.workflow&&bt(e.policy||null,"stepper")?ur(t.workflow,t.status):""}
      ${wi(t,e)}
    </article>
  `}function _t(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return p`
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
        ${n?p`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${jn.map(o=>p`<option
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
        ${t.items.map(o=>ys(o,e))}
      </div>
    </section>
  `}var ki=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],vi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],xi=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function $i(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return p`
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
      ${r.label_menu_open?p`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?p`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>p`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?p`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ws(t,e,r){return p`
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
        ${ki.map(n=>p`<option
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
        ${vi.map(n=>p`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${$i(t,e,r)}
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
        ${xi.map(n=>p`<option
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
  `}var Si=200,Ai={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ti=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),ks="beads-ui.board.sort",vs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ei(){try{let t=window.localStorage.getItem(ks);if(t&&vs.has(t))return t}catch{}return"created_desc"}function xs(t,e){let r=_e("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,u=e.closedRange||nr,h=s?lr(s,i):null,b=cr({transport:o,uiOrderStore:i}),S=[],y=[],R=[],M=[],O=[],P=[],z=!1,D=0,v=Ei(),w=new Map,$=new Map,x=new Map,B=new Set,G={search:"",priority:"",type:"",labels:[]},K=!1,Q=null;function Ae(T){return String(T.status||"open")==="open"}function Oe(T){let L=String(T.status||"open");return L==="open"||L==="blocked"}function Te(T){let L=G.search.trim().toLowerCase(),Y=G.priority,j=G.type,N=G.labels;return T.filter(m=>{if(L){let C=String(m.id||"").toLowerCase(),A=String(m.title||"").toLowerCase();if(!C.includes(L)&&!A.includes(L))return!1}if(Y!==""&&String(m.priority)!==Y||j!==""&&String(m.issue_type||"")!==j)return!1;if(N.length>0){let C=Array.isArray(m.labels)?m.labels:[];if(!N.some(A=>C.includes(A)))return!1}return!0})}function Ye(){let T=new Set;for(let L of[S,y,R,M,O,P])for(let Y of L){let j=Array.isArray(Y.labels)?Y.labels:[];for(let N of j)typeof N=="string"&&N.length>0&&T.add(N)}return Array.from(T).sort()}function ze(){return G.search.trim()!==""||G.priority!==""||G.type!==""||G.labels.length>0}function de(){try{if(h){let T=h.selectBoardColumn("tab:board:in-progress","in_progress",v),L=h.selectBoardColumn("tab:board:blocked","blocked",v).filter(Oe),Y=new Set(T.map(q=>q.id)),j=h.selectBoardColumn("tab:board:ready","ready",v).filter(q=>Ae(q)&&!Y.has(q.id)),N=h.selectBoardColumn("tab:board:resolved","resolved",v),m=h.selectBoardColumn("tab:board:deferred","deferred",v),C=z?m:[],A=h.selectBoardColumn("tab:board:closed","closed").slice(0,Si),_=[...L,...j,...T,...N,...C,...A];ke(_);let H=new Set;for(let q of _)q&&q.id&&!Vr(q)&&H.add(q.id);let te=!ze();S=te?Lt(L,H):L,y=te?Lt(j,H):j,R=te?Lt(T,H):T,M=te?Lt(N,H):N,O=te?Lt(C,H):C,D=m.length,P=te?Lt(A,H):A,w=new Map;for(let q of S)w.set(q.id,"open");for(let q of y)w.set(q.id,"open");for(let q of R)w.set(q.id,"in_progress");for(let q of M)w.set(q.id,"resolved");for(let q of O)w.set(q.id,"deferred");for(let q of P)w.set(q.id,"closed");$=new Map;for(let q of S)$.set(q.id,"blocked-col");for(let q of y)$.set(q.id,"ready-col");for(let q of R)$.set(q.id,"in-progress-col");for(let q of M)$.set(q.id,"resolved-col");for(let q of O)$.set(q.id,"deferred-col");for(let q of P)$.set(q.id,"closed-col")}he()}catch{S=[],y=[],R=[],M=[],O=[],P=[],x=new Map,he()}}function ke(T){let L=new Map;for(let j of T)j&&j.id&&!L.has(j.id)&&L.set(j.id,j);let Y=new Map;for(let j of L.values()){let N=Vr(j);if(!N)continue;let m=Y.get(N);m||(m=[],Y.set(N,m)),m.push({id:j.id,title:j.title,status:j.status,metadata:j.metadata,created_at:j.created_at})}x=Y}function Ue(T){let L=x.get(T)||[],Y=0,j=null;for(let N of L)(N.status==="resolved"||N.status==="closed")&&(Y+=1),!j&&N.status==="in_progress"&&(j=N);return{total:L.length,count:Y,current:j,children:L}}function ue(T){return!B.has(T)}function tt(T,L){T.preventDefault(),T.stopPropagation(),B.has(L)?B.delete(L):B.add(L),he()}function pe(T,L){T.preventDefault(),T.stopPropagation(),n(L)}function He(T,L){T.preventDefault(),T.stopPropagation(),n(L)}function se(T,L){Q||n(L)}function Me(T,L){T.preventDefault(),T.stopPropagation(),Ci(L).then(Y=>{Y&&J("\uBCF5\uC0AC\uB428","success",1200)})}function Ve(T,L){Q=L,T.dataTransfer&&(T.dataTransfer.setData("text/plain",L),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function xe(T){T.target.classList.remove("board-card--dragging"),Ze(),setTimeout(()=>{Q=null},0)}function k(T){let L=String(T.target.value||"");!L||L===u||(u=L,a&&a(L),he())}let E={onCardClick:se,onCopyId:Me,onDragStart:Ve,onDragEnd:xe,onClosedRangeChange:k,rollupFor:Ue,isExpanded:ue,onRollupToggle:tt,onChildClick:pe,onFromChipClick:He,get policy(){return l?l.get():null}};function Z(T){let L=T.target,Y=t.querySelector(".board-filter__labels");L&&Y&&Y.contains(L)||ee()}function oe(T){T.key==="Escape"&&ee()}function le(){K||(K=!0,document.addEventListener("mousedown",Z),document.addEventListener("keydown",oe),he())}function ee(){K&&(K=!1,document.removeEventListener("mousedown",Z),document.removeEventListener("keydown",oe),he())}let X={onSearchInput(T){G.search=String(T.target.value||""),de()},onPriorityChange(T){G.priority=String(T.target.value||""),de()},onTypeChange(T){G.type=String(T.target.value||""),de()},onSortChange(T){let L=String(T.target.value||"");if(!(!vs.has(L)||L===v)){v=L;try{window.localStorage.setItem(ks,L)}catch{}de()}},onDeferredToggle(){z=!z,de()},onLabelMenuToggle(){K?ee():le()},onLabelToggle(T){let L=G.labels.indexOf(T);L===-1?G.labels.push(T):G.labels.splice(L,1),de()},onLabelClear(){G.labels.length!==0&&(G.labels=[],de())},onNewIssue(){c&&c()}};function ye(){let T=z?"board-root board-root--deferred":"board-root";return p`
      <div class="board-view">
        ${ws(G,X,{sort_mode:v,show_deferred:z,deferred_count:D,label_options:Ye(),label_menu_open:K})}
        <div class=${T}>
          ${_t({title:"Blocked",id:"blocked-col",items:Te(S)},E)}
          ${_t({title:"Ready",id:"ready-col",items:Te(y)},E)}
          ${_t({title:"In progress",id:"in-progress-col",items:Te(R)},E)}
          ${_t({title:"Resolved",id:"resolved-col",items:Te(M)},E)}
          ${z?_t({title:"Deferred",id:"deferred-col",items:Te(O)},E):""}
          ${_t({title:"Closed",id:"closed-col",items:Te(P),is_closed:!0,closed_range:u},E)}
        </div>
      </div>
    `}function he(){ce(ye(),t),Ie()}function Ie(){try{let T=Array.from(t.querySelectorAll(".board-column"));for(let L of T)Array.from(L.querySelectorAll(".board-card")).forEach((j,N)=>{j.tabIndex=N===0?0:-1})}catch{}}async function Ne(T,L){if(!o){J("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:T,status:L}),J("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Y){r("update-status failed: %o",Y),J("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function $e(T){switch(T){case"blocked-col":return S;case"ready-col":return y;case"in-progress-col":return R;case"resolved-col":return M;case"deferred-col":return O;default:return[]}}function je(T,L,Y){if(!o||!i)return;let j=$e(T),N=j.find(H=>H.id===L);if(!N)return;let m=j.filter(H=>H.id!==L),C=Y.closest?Y.closest(".board-card"):null,A=m.length;if(C){let H=C.getAttribute("data-issue-id");if(H===L)return;let te=m.findIndex(q=>q.id===H);te>=0&&(A=te)}let _=m.slice();_.splice(A,0,N),b.applyReorder(L,_,A)}function Ze(){for(let T of Array.from(t.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let ge=null;t.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let Y=T.target.closest(".board-column");Y&&Y!==ge&&(ge&&ge.classList.remove("board-column--drag-over"),Y.classList.add("board-column--drag-over"),ge=Y)}),t.addEventListener("dragleave",T=>{let L=T.relatedTarget;(!L||!t.contains(L))&&ge&&(ge.classList.remove("board-column--drag-over"),ge=null)}),t.addEventListener("drop",T=>{T.preventDefault(),ge&&(ge.classList.remove("board-column--drag-over"),ge=null);let L=T.target,Y=L.closest(".board-column");if(!Y)return;let j=T.dataTransfer?.getData("text/plain")||"";if(!j)return;let N=Y.id,m=$.get(j);if(m&&m===N){if(Ti.has(N)){if(v!=="manual"){J("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}je(N,j,L)}return}let C=Ai[N];if(!C){J("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}w.get(j)!==C&&Ne(j,C)}),t.addEventListener("keydown",T=>{let L=T.target;if(!(L instanceof HTMLElement))return;let Y=String(L.tagName||"").toLowerCase();if(Y==="input"||Y==="textarea"||Y==="select"||Y==="button"||Y==="a"||L.isContentEditable===!0)return;let j=L.closest(".board-card");if(!j)return;let N=String(T.key||"");if(N==="Enter"||N===" "){T.preventDefault();let _=j.getAttribute("data-issue-id");_&&n(_);return}if(N!=="ArrowUp"&&N!=="ArrowDown"&&N!=="ArrowLeft"&&N!=="ArrowRight")return;T.preventDefault();let m=j.closest(".board-column");if(!m)return;let C=Array.from(m.querySelectorAll(".board-card")),A=C.indexOf(j);if(N==="ArrowDown"&&A<C.length-1){Ce(j,C[A+1]);return}if(N==="ArrowUp"&&A>0){Ce(j,C[A-1]);return}if(N==="ArrowLeft"||N==="ArrowRight"){let _=Array.from(t.querySelectorAll(".board-column")),H=_.indexOf(m),te=N==="ArrowRight"?1:-1,q=H+te;for(;q>=0&&q<_.length;){let Re=_[q].querySelector(".board-card");if(Re){Ce(j,Re);return}q+=te}}});function Ce(T,L){try{T.tabIndex=-1,L.tabIndex=0,L.focus()}catch{}}let Ee=null;h&&h.subscribe&&(Ee=h.subscribe(()=>{try{de()}catch{}}));let Se=null;return l&&l.subscribe&&(Se=l.subscribe(()=>{try{de()}catch{}})),{async load(){r("load"),de()},clear(){ee(),Ee&&(Ee(),Ee=null),Se&&(Se(),Se=null),t.replaceChildren(),S=[],y=[],R=[],M=[],O=[],P=[],w=new Map,$=new Map}}}function Vr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Lt(t,e){return t.filter(r=>{let n=Vr(r);return!(n&&e.has(n))})}async function Ci(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function It(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ri={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Li=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ii=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ct(t){return!!t&&typeof t=="object"}function Zr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function $s(t,e){let r=Zr(t),n=Zr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Di(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ct(s)&&typeof s.text=="string"?s.text:"").join(""):ct(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Oi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Ri[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Zr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=$s(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=$s(ct(l)?l.old_string:"",ct(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ss(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Li.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Ii.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Mi(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ct(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ss(o.text));else if(o.type==="tool_use"){let i=Oi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ct(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Di(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Ni(t){if(t.type==="item.completed"&&ct(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Ss(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Pi(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function As(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ct(o))continue;let i=Pi(o)?Ni(o):Mi(o,r);for(let l of i)e.push(l)}return e}function pr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function u(){if(!o||!n)return[];let $=n.get(o);return As($?$.lines:[])}function h($,x){if(x.kind==="gate")return p`<div class="sv__gate">${x.text}</div>`;if(x.kind==="phase")return p`<div class="sv__phase">${x.text}</div>`;if(x.kind==="result")return p`<div
        class="sv__result${x.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${x.success?"\u2713":"\u2717"}
        ${x.text||(x.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(x.kind==="error")return p`<div class="sv__error">⛔ ${x.text}</div>`;if(x.kind==="blocker")return p`<div class="sv__error">⛔ ${x.text}</div>`;if(x.kind==="tool"){let B=a.has($),G=x.tool==="Bash"?x.command:x.path||x.command||"";return p`<div
        class="sv__tool${B?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>M($)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${x.icon}</span>
          <span class="sv__tool-name">${x.tool}</span>
          ${G?p`<span class="sv__tool-detail">${G}</span>`:""}
          ${typeof x.added=="number"?p`<span class="sv__diff-add">+${x.added}</span>`:""}
          ${typeof x.removed=="number"?p`<span class="sv__diff-del">−${x.removed}</span>`:""}
          ${x.result?p`<span class="sv__tool-ok">→ ${x.result}</span>`:""}
        </span>
        ${B?p`<pre class="sv__tool-expand">${b(x)}</pre>`:""}
      </div>`}return p`<div class="sv__as">${x.text}</div>`}function b($){let x=[];if($.input!==void 0)try{x.push(`input: ${JSON.stringify($.input,null,2)}`)}catch{}return typeof $.output=="string"&&$.output.length>0&&x.push(`output:
${$.output}`),x.join(`

`)}function S(){if(!o)return p``;let $=u(),x=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),B=i.session_id||"",G=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return p`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${B?p`<button
              type="button"
              class="sv__session"
              title=${B}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${B}`}
              @click=${()=>P(B)}
            >
              ⧉ ${B.slice(0,8)}
            </button>`:""}
        ${x?p`<span class="sv__meta">${x}</span>`:""}
        ${i.worktree?p`<span class="sv__wt" title=${i.worktree}
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
        ${$.length===0?p`<div class="sv__empty">세션 로그 없음</div>`:$.map((K,Q)=>h(Q,K))}
      </div>
    </div>`}function y(){ce(S(),t),l&&R()}function R(){let $=t.querySelector(".sv__body");$&&($.scrollTop=$.scrollHeight)}function M($){a.has($)?a.delete($):a.add($),y()}function O(){l=!l,y()}function P($){It($).then(x=>{x?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function z($){!o||!$||(i={...i,...$},y())}function D($){let x=$.target;if(!x||!x.classList||!x.classList.contains("sv__body"))return;!(x.scrollHeight-x.scrollTop-x.clientHeight<=4)&&l&&(l=!1,y())}t.addEventListener("scroll",D,!0);function v($){let x=$&&$.attempt_id;x&&(o=x,i=$.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(y)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),y())}function w(){let $=o;o=null,a.clear(),r&&$&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${$}`})).catch(()=>{}),ce(p``,t),s&&s()}return{open:v,updateMeta:z,close:w,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",D,!0),o=null,ce(p``,t)}}}function Fi(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Ts(t,e){let r=Fi(t);return p`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?p`<div class="detail-empty">산출물 없음</div>`:p`
          ${r.map(n=>p`<div class="detail-art">
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
  `}var Kr=["opus","sonnet","haiku","fable"],Xr=["low","medium","high","xhigh"],Qr=["codex","opus","fable","self","skip"],Jr=["opus","fable","sonnet","haiku"],Bi=["standard","fast_track"],en={orchestration_model:"(\uAE30\uBCF8: CLI \uAE30\uBCF8 \uBAA8\uB378)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function fr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:en[t]||"(\uAE30\uBCF8)"}function zt(t,e,r,n,s,o){return p`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>p`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function Ut(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Es(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return p`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${zt("orchestration_model","orchestration_model",Ut(Kr,fr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${zt("orchestration_effort","orchestration_effort",Ut(Xr,fr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${zt("review_model","review_model",Ut(Qr,fr("review_model",s)),n.review_model||"",!1,e)}
    ${zt("impl_model","impl_model",Ut(Jr,fr("impl_model",s)),n.impl_model||"",!1,e)}
    ${zt("workflow_mode","workflow_mode",Ut(Bi),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Ps,setPrototypeOf:Cs,isFrozen:qi,getPrototypeOf:zi,getOwnPropertyDescriptor:Ui}=Object,{freeze:Fe,seal:Ke,create:ln}=Object,{apply:cn,construct:dn}=typeof Reflect<"u"&&Reflect;Fe||(Fe=function(e){return e});Ke||(Ke=function(e){return e});cn||(cn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});dn||(dn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var hr=Be(Array.prototype.forEach),Hi=Be(Array.prototype.lastIndexOf),Rs=Be(Array.prototype.pop),Ht=Be(Array.prototype.push),Wi=Be(Array.prototype.splice),gr=Be(String.prototype.toLowerCase),tn=Be(String.prototype.toString),rn=Be(String.prototype.match),Wt=Be(String.prototype.replace),Gi=Be(String.prototype.indexOf),ji=Be(String.prototype.trim),Qe=Be(Object.prototype.hasOwnProperty),Pe=Be(RegExp.prototype.test),Gt=Yi(TypeError);function Be(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return cn(t,e,n)}}function Yi(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return dn(t,r)}}function ne(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:gr;Cs&&Cs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(qi(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Vi(t){for(let e=0;e<t.length;e++)Qe(t,e)||(t[e]=null);return t}function it(t){let e=ln(null);for(let[r,n]of Ps(t))Qe(t,r)&&(Array.isArray(n)?e[r]=Vi(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=it(n):e[r]=n);return e}function jt(t,e){for(;t!==null;){let n=Ui(t,e);if(n){if(n.get)return Be(n.get);if(typeof n.value=="function")return Be(n.value)}t=zi(t)}function r(){return null}return r}var Ls=Fe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),nn=Fe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),sn=Fe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Zi=Fe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),on=Fe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ki=Fe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Is=Fe(["#text"]),Ds=Fe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),an=Fe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Os=Fe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),mr=Fe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Xi=Ke(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Qi=Ke(/<%[\w\W]*|[\w\W]*%>/gm),Ji=Ke(/\$\{[\w\W]*/gm),ea=Ke(/^data-[\-\w.\u00B7-\uFFFF]+$/),ta=Ke(/^aria-[\-\w]+$/),Fs=Ke(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ra=Ke(/^(?:\w+script|data):/i),na=Ke(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Bs=Ke(/^html$/i),sa=Ke(/^[a-z][.\w]*(-[.\w]+)+$/i),Ms=Object.freeze({__proto__:null,ARIA_ATTR:ta,ATTR_WHITESPACE:na,CUSTOM_ELEMENT:sa,DATA_ATTR:ea,DOCTYPE_NAME:Bs,ERB_EXPR:Qi,IS_ALLOWED_URI:Fs,IS_SCRIPT_OR_DATA:ra,MUSTACHE_EXPR:Xi,TMPLIT_EXPR:Ji}),Yt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},oa=function(){return typeof window>"u"?null:window},ia=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ns=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qs(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:oa(),e=U=>qs(U);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Yt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:b,trustedTypes:S}=t,y=a.prototype,R=jt(y,"cloneNode"),M=jt(y,"remove"),O=jt(y,"nextSibling"),P=jt(y,"childNodes"),z=jt(y,"parentNode");if(typeof i=="function"){let U=r.createElement("template");U.content&&U.content.ownerDocument&&(r=U.content.ownerDocument)}let D,v="",{implementation:w,createNodeIterator:$,createDocumentFragment:x,getElementsByTagName:B}=r,{importNode:G}=n,K=Ns();e.isSupported=typeof Ps=="function"&&typeof z=="function"&&w&&w.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Q,ERB_EXPR:Ae,TMPLIT_EXPR:Oe,DATA_ATTR:Te,ARIA_ATTR:Ye,IS_SCRIPT_OR_DATA:ze,ATTR_WHITESPACE:de,CUSTOM_ELEMENT:ke}=Ms,{IS_ALLOWED_URI:Ue}=Ms,ue=null,tt=ne({},[...Ls,...nn,...sn,...on,...Is]),pe=null,He=ne({},[...Ds,...an,...Os,...mr]),se=Object.seal(ln(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Me=null,Ve=null,xe=Object.seal(ln(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),k=!0,E=!0,Z=!1,oe=!0,le=!1,ee=!0,X=!1,ye=!1,he=!1,Ie=!1,Ne=!1,$e=!1,je=!0,Ze=!1,ge="user-content-",Ce=!0,Ee=!1,Se={},T=null,L=ne({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Y=null,j=ne({},["audio","video","img","source","image","track"]),N=null,m=ne({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),C="http://www.w3.org/1998/Math/MathML",A="http://www.w3.org/2000/svg",_="http://www.w3.org/1999/xhtml",H=_,te=!1,q=null,Re=ne({},[C,A,_],tn),kt=ne({},["mi","mo","mn","ms","mtext"]),vt=ne({},["annotation-xml"]),Tr=ne({},["title","style","font","a","script"]),nt=null,Dt=["application/xhtml+xml","text/html"],er="text/html",f=null,g=null,V=r.createElement("form"),W=function(d){return d instanceof RegExp||d instanceof Function},re=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(g&&g===d)){if((!d||typeof d!="object")&&(d={}),d=it(d),nt=Dt.indexOf(d.PARSER_MEDIA_TYPE)===-1?er:d.PARSER_MEDIA_TYPE,f=nt==="application/xhtml+xml"?tn:gr,ue=Qe(d,"ALLOWED_TAGS")?ne({},d.ALLOWED_TAGS,f):tt,pe=Qe(d,"ALLOWED_ATTR")?ne({},d.ALLOWED_ATTR,f):He,q=Qe(d,"ALLOWED_NAMESPACES")?ne({},d.ALLOWED_NAMESPACES,tn):Re,N=Qe(d,"ADD_URI_SAFE_ATTR")?ne(it(m),d.ADD_URI_SAFE_ATTR,f):m,Y=Qe(d,"ADD_DATA_URI_TAGS")?ne(it(j),d.ADD_DATA_URI_TAGS,f):j,T=Qe(d,"FORBID_CONTENTS")?ne({},d.FORBID_CONTENTS,f):L,Me=Qe(d,"FORBID_TAGS")?ne({},d.FORBID_TAGS,f):it({}),Ve=Qe(d,"FORBID_ATTR")?ne({},d.FORBID_ATTR,f):it({}),Se=Qe(d,"USE_PROFILES")?d.USE_PROFILES:!1,k=d.ALLOW_ARIA_ATTR!==!1,E=d.ALLOW_DATA_ATTR!==!1,Z=d.ALLOW_UNKNOWN_PROTOCOLS||!1,oe=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,le=d.SAFE_FOR_TEMPLATES||!1,ee=d.SAFE_FOR_XML!==!1,X=d.WHOLE_DOCUMENT||!1,Ie=d.RETURN_DOM||!1,Ne=d.RETURN_DOM_FRAGMENT||!1,$e=d.RETURN_TRUSTED_TYPE||!1,he=d.FORCE_BODY||!1,je=d.SANITIZE_DOM!==!1,Ze=d.SANITIZE_NAMED_PROPS||!1,Ce=d.KEEP_CONTENT!==!1,Ee=d.IN_PLACE||!1,Ue=d.ALLOWED_URI_REGEXP||Fs,H=d.NAMESPACE||_,kt=d.MATHML_TEXT_INTEGRATION_POINTS||kt,vt=d.HTML_INTEGRATION_POINTS||vt,se=d.CUSTOM_ELEMENT_HANDLING||{},d.CUSTOM_ELEMENT_HANDLING&&W(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(se.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&W(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(se.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(se.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),le&&(E=!1),Ne&&(Ie=!0),Se&&(ue=ne({},Is),pe=[],Se.html===!0&&(ne(ue,Ls),ne(pe,Ds)),Se.svg===!0&&(ne(ue,nn),ne(pe,an),ne(pe,mr)),Se.svgFilters===!0&&(ne(ue,sn),ne(pe,an),ne(pe,mr)),Se.mathMl===!0&&(ne(ue,on),ne(pe,Os),ne(pe,mr))),d.ADD_TAGS&&(typeof d.ADD_TAGS=="function"?xe.tagCheck=d.ADD_TAGS:(ue===tt&&(ue=it(ue)),ne(ue,d.ADD_TAGS,f))),d.ADD_ATTR&&(typeof d.ADD_ATTR=="function"?xe.attributeCheck=d.ADD_ATTR:(pe===He&&(pe=it(pe)),ne(pe,d.ADD_ATTR,f))),d.ADD_URI_SAFE_ATTR&&ne(N,d.ADD_URI_SAFE_ATTR,f),d.FORBID_CONTENTS&&(T===L&&(T=it(T)),ne(T,d.FORBID_CONTENTS,f)),Ce&&(ue["#text"]=!0),X&&ne(ue,["html","head","body"]),ue.table&&(ne(ue,["tbody"]),delete Me.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw Gt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Gt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=d.TRUSTED_TYPES_POLICY,v=D.createHTML("")}else D===void 0&&(D=ia(S,s)),D!==null&&typeof v=="string"&&(v=D.createHTML(""));Fe&&Fe(d),g=d}},be=ne({},[...nn,...sn,...Zi]),tr=ne({},[...on,...Ki]),Do=function(d){let I=z(d);(!I||!I.tagName)&&(I={namespaceURI:H,tagName:"template"});let F=gr(d.tagName),me=gr(I.tagName);return q[d.namespaceURI]?d.namespaceURI===A?I.namespaceURI===_?F==="svg":I.namespaceURI===C?F==="svg"&&(me==="annotation-xml"||kt[me]):!!be[F]:d.namespaceURI===C?I.namespaceURI===_?F==="math":I.namespaceURI===A?F==="math"&&vt[me]:!!tr[F]:d.namespaceURI===_?I.namespaceURI===A&&!vt[me]||I.namespaceURI===C&&!kt[me]?!1:!tr[F]&&(Tr[F]||!be[F]):!!(nt==="application/xhtml+xml"&&q[d.namespaceURI]):!1},rt=function(d){Ht(e.removed,{element:d});try{z(d).removeChild(d)}catch{M(d)}},ut=function(d,I){try{Ht(e.removed,{attribute:I.getAttributeNode(d),from:I})}catch{Ht(e.removed,{attribute:null,from:I})}if(I.removeAttribute(d),d==="is")if(Ie||Ne)try{rt(I)}catch{}else try{I.setAttribute(d,"")}catch{}},Tn=function(d){let I=null,F=null;if(he)d="<remove></remove>"+d;else{let ve=rn(d,/^[\r\n\t ]+/);F=ve&&ve[0]}nt==="application/xhtml+xml"&&H===_&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");let me=D?D.createHTML(d):d;if(H===_)try{I=new b().parseFromString(me,nt)}catch{}if(!I||!I.documentElement){I=w.createDocument(H,"template",null);try{I.documentElement.innerHTML=te?v:me}catch{}}let De=I.body||I.documentElement;return d&&F&&De.insertBefore(r.createTextNode(F),De.childNodes[0]||null),H===_?B.call(I,X?"html":"body")[0]:X?I.documentElement:De},En=function(d){return $.call(d.ownerDocument||d,d,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Er=function(d){return d instanceof h&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof u)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function")},Cn=function(d){return typeof l=="function"&&d instanceof l};function st(U,d,I){hr(U,F=>{F.call(e,d,I,g)})}let Rn=function(d){let I=null;if(st(K.beforeSanitizeElements,d,null),Er(d))return rt(d),!0;let F=f(d.nodeName);if(st(K.uponSanitizeElement,d,{tagName:F,allowedTags:ue}),ee&&d.hasChildNodes()&&!Cn(d.firstElementChild)&&Pe(/<[/\w!]/g,d.innerHTML)&&Pe(/<[/\w!]/g,d.textContent)||d.nodeType===Yt.progressingInstruction||ee&&d.nodeType===Yt.comment&&Pe(/<[/\w]/g,d.data))return rt(d),!0;if(!(xe.tagCheck instanceof Function&&xe.tagCheck(F))&&(!ue[F]||Me[F])){if(!Me[F]&&In(F)&&(se.tagNameCheck instanceof RegExp&&Pe(se.tagNameCheck,F)||se.tagNameCheck instanceof Function&&se.tagNameCheck(F)))return!1;if(Ce&&!T[F]){let me=z(d)||d.parentNode,De=P(d)||d.childNodes;if(De&&me){let ve=De.length;for(let We=ve-1;We>=0;--We){let ot=R(De[We],!0);ot.__removalCount=(d.__removalCount||0)+1,me.insertBefore(ot,O(d))}}}return rt(d),!0}return d instanceof a&&!Do(d)||(F==="noscript"||F==="noembed"||F==="noframes")&&Pe(/<\/no(script|embed|frames)/i,d.innerHTML)?(rt(d),!0):(le&&d.nodeType===Yt.text&&(I=d.textContent,hr([Q,Ae,Oe],me=>{I=Wt(I,me," ")}),d.textContent!==I&&(Ht(e.removed,{element:d.cloneNode()}),d.textContent=I)),st(K.afterSanitizeElements,d,null),!1)},Ln=function(d,I,F){if(je&&(I==="id"||I==="name")&&(F in r||F in V))return!1;if(!(E&&!Ve[I]&&Pe(Te,I))){if(!(k&&Pe(Ye,I))){if(!(xe.attributeCheck instanceof Function&&xe.attributeCheck(I,d))){if(!pe[I]||Ve[I]){if(!(In(d)&&(se.tagNameCheck instanceof RegExp&&Pe(se.tagNameCheck,d)||se.tagNameCheck instanceof Function&&se.tagNameCheck(d))&&(se.attributeNameCheck instanceof RegExp&&Pe(se.attributeNameCheck,I)||se.attributeNameCheck instanceof Function&&se.attributeNameCheck(I,d))||I==="is"&&se.allowCustomizedBuiltInElements&&(se.tagNameCheck instanceof RegExp&&Pe(se.tagNameCheck,F)||se.tagNameCheck instanceof Function&&se.tagNameCheck(F))))return!1}else if(!N[I]){if(!Pe(Ue,Wt(F,de,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&d!=="script"&&Gi(F,"data:")===0&&Y[d])){if(!(Z&&!Pe(ze,Wt(F,de,"")))){if(F)return!1}}}}}}}return!0},In=function(d){return d!=="annotation-xml"&&rn(d,ke)},Dn=function(d){st(K.beforeSanitizeAttributes,d,null);let{attributes:I}=d;if(!I||Er(d))return;let F={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:pe,forceKeepAttr:void 0},me=I.length;for(;me--;){let De=I[me],{name:ve,namespaceURI:We,value:ot}=De,xt=f(ve),Cr=ot,Le=ve==="value"?Cr:ji(Cr);if(F.attrName=xt,F.attrValue=Le,F.keepAttr=!0,F.forceKeepAttr=void 0,st(K.uponSanitizeAttribute,d,F),Le=F.attrValue,Ze&&(xt==="id"||xt==="name")&&(ut(ve,d),Le=ge+Le),ee&&Pe(/((--!?|])>)|<\/(style|title|textarea)/i,Le)){ut(ve,d);continue}if(xt==="attributename"&&rn(Le,"href")){ut(ve,d);continue}if(F.forceKeepAttr)continue;if(!F.keepAttr){ut(ve,d);continue}if(!oe&&Pe(/\/>/i,Le)){ut(ve,d);continue}le&&hr([Q,Ae,Oe],Mn=>{Le=Wt(Le,Mn," ")});let On=f(d.nodeName);if(!Ln(On,xt,Le)){ut(ve,d);continue}if(D&&typeof S=="object"&&typeof S.getAttributeType=="function"&&!We)switch(S.getAttributeType(On,xt)){case"TrustedHTML":{Le=D.createHTML(Le);break}case"TrustedScriptURL":{Le=D.createScriptURL(Le);break}}if(Le!==Cr)try{We?d.setAttributeNS(We,ve,Le):d.setAttribute(ve,Le),Er(d)?rt(d):Rs(e.removed)}catch{ut(ve,d)}}st(K.afterSanitizeAttributes,d,null)},Oo=function U(d){let I=null,F=En(d);for(st(K.beforeSanitizeShadowDOM,d,null);I=F.nextNode();)st(K.uponSanitizeShadowNode,I,null),Rn(I),Dn(I),I.content instanceof o&&U(I.content);st(K.afterSanitizeShadowDOM,d,null)};return e.sanitize=function(U){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,F=null,me=null,De=null;if(te=!U,te&&(U="<!-->"),typeof U!="string"&&!Cn(U))if(typeof U.toString=="function"){if(U=U.toString(),typeof U!="string")throw Gt("dirty is not a string, aborting")}else throw Gt("toString is not a function");if(!e.isSupported)return U;if(ye||re(d),e.removed=[],typeof U=="string"&&(Ee=!1),Ee){if(U.nodeName){let ot=f(U.nodeName);if(!ue[ot]||Me[ot])throw Gt("root node is forbidden and cannot be sanitized in-place")}}else if(U instanceof l)I=Tn("<!---->"),F=I.ownerDocument.importNode(U,!0),F.nodeType===Yt.element&&F.nodeName==="BODY"||F.nodeName==="HTML"?I=F:I.appendChild(F);else{if(!Ie&&!le&&!X&&U.indexOf("<")===-1)return D&&$e?D.createHTML(U):U;if(I=Tn(U),!I)return Ie?null:$e?v:""}I&&he&&rt(I.firstChild);let ve=En(Ee?U:I);for(;me=ve.nextNode();)Rn(me),Dn(me),me.content instanceof o&&Oo(me.content);if(Ee)return U;if(Ie){if(Ne)for(De=x.call(I.ownerDocument);I.firstChild;)De.appendChild(I.firstChild);else De=I;return(pe.shadowroot||pe.shadowrootmode)&&(De=G.call(n,De,!0)),De}let We=X?I.outerHTML:I.innerHTML;return X&&ue["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&Pe(Bs,I.ownerDocument.doctype.name)&&(We="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+We),le&&hr([Q,Ae,Oe],ot=>{We=Wt(We,ot," ")}),D&&$e?D.createHTML(We):We},e.setConfig=function(){let U=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};re(U),ye=!0},e.clearConfig=function(){g=null,ye=!1},e.isValidAttribute=function(U,d,I){g||re({});let F=f(U),me=f(d);return Ln(F,me,I)},e.addHook=function(U,d){typeof d=="function"&&Ht(K[U],d)},e.removeHook=function(U,d){if(d!==void 0){let I=Hi(K[U],d);return I===-1?void 0:Wi(K[U],I,1)[0]}return Rs(K[U])},e.removeHooks=function(U){K[U]=[]},e.removeAllHooks=function(){K=Ns()},e}var zs=qs();var Us={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Hs=t=>(...e)=>({_$litDirective$:t,values:e}),br=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Vt=class extends br{constructor(e){if(super(e),this.it=we,e.type!==Us.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===we||e==null)return this._t=void 0,this.it=e;if(e===mt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Vt.directiveName="unsafeHTML",Vt.resultType=1;var Ws=Hs(Vt);function hn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var wt=hn();function Xs(t){wt=t}var Qt={exec:()=>null};function ie(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(qe.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var aa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),qe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},la=/^(?:[ \t]*(?:\n|$))+/,ca=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,da=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Jt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ua=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,mn=/(?:[*+-]|\d{1,9}[.)])/,Qs=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Js=ie(Qs).replace(/bull/g,mn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),pa=ie(Qs).replace(/bull/g,mn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),gn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,fa=/^[^\n]+/,bn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ha=ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",bn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ma=ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,mn).getRegex(),xr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",_n=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ga=ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",_n).replace("tag",xr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),eo=ie(gn).replace("hr",Jt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex(),ba=ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",eo).getRegex(),yn={blockquote:ba,code:ca,def:ha,fences:da,heading:ua,hr:Jt,html:ga,lheading:Js,list:ma,newline:la,paragraph:eo,table:Qt,text:fa},Gs=ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Jt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex(),_a={...yn,lheading:pa,table:Gs,paragraph:ie(gn).replace("hr",Jt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Gs).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex()},ya={...yn,html:ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",_n).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Qt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ie(gn).replace("hr",Jt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Js).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},wa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ka=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,to=/^( {2,}|\\)\n(?!\s*$)/,va=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$r=/[\p{P}\p{S}]/u,wn=/[\s\p{P}\p{S}]/u,ro=/[^\s\p{P}\p{S}]/u,xa=ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,wn).getRegex(),no=/(?!~)[\p{P}\p{S}]/u,$a=/(?!~)[\s\p{P}\p{S}]/u,Sa=/(?:[^\s\p{P}\p{S}]|~)/u,Aa=ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",aa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),so=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ta=ie(so,"u").replace(/punct/g,$r).getRegex(),Ea=ie(so,"u").replace(/punct/g,no).getRegex(),oo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ca=ie(oo,"gu").replace(/notPunctSpace/g,ro).replace(/punctSpace/g,wn).replace(/punct/g,$r).getRegex(),Ra=ie(oo,"gu").replace(/notPunctSpace/g,Sa).replace(/punctSpace/g,$a).replace(/punct/g,no).getRegex(),La=ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ro).replace(/punctSpace/g,wn).replace(/punct/g,$r).getRegex(),Ia=ie(/\\(punct)/,"gu").replace(/punct/g,$r).getRegex(),Da=ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Oa=ie(_n).replace("(?:-->|$)","-->").getRegex(),Ma=ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Oa).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),wr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Na=ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",wr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),io=ie(/^!?\[(label)\]\[(ref)\]/).replace("label",wr).replace("ref",bn).getRegex(),ao=ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",bn).getRegex(),Pa=ie("reflink|nolink(?!\\()","g").replace("reflink",io).replace("nolink",ao).getRegex(),js=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,kn={_backpedal:Qt,anyPunctuation:Ia,autolink:Da,blockSkip:Aa,br:to,code:ka,del:Qt,emStrongLDelim:Ta,emStrongRDelimAst:Ca,emStrongRDelimUnd:La,escape:wa,link:Na,nolink:ao,punctuation:xa,reflink:io,reflinkSearch:Pa,tag:Ma,text:va,url:Qt},Fa={...kn,link:ie(/^!?\[(label)\]\((.*?)\)/).replace("label",wr).getRegex(),reflink:ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",wr).getRegex()},un={...kn,emStrongRDelimAst:Ra,emStrongLDelim:Ea,url:ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",js).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",js).getRegex()},Ba={...un,br:ie(to).replace("{2,}","*").getRegex(),text:ie(un.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},_r={normal:yn,gfm:_a,pedantic:ya},Zt={normal:kn,gfm:un,breaks:Ba,pedantic:Fa},qa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ys=t=>qa[t];function at(t,e){if(e){if(qe.escapeTest.test(t))return t.replace(qe.escapeReplace,Ys)}else if(qe.escapeTestNoEncode.test(t))return t.replace(qe.escapeReplaceNoEncode,Ys);return t}function Vs(t){try{t=encodeURI(t).replace(qe.percentDecode,"%")}catch{return null}return t}function Zs(t,e){let r=t.replace(qe.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(qe.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(qe.slashPipe,"|");return n}function Kt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function za(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ks(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Ua(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var kr=class{constructor(t){fe(this,"options");fe(this,"rules");fe(this,"lexer");this.options=t||wt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Kt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Ua(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Kt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Kt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Kt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${u}`:u;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=h,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let S=b,y=S.raw+`
`+r.join(`
`),R=this.blockquote(y);o[o.length-1]=R,n=n.substring(0,n.length-S.raw.length)+R.raw,s=s.substring(0,s.length-S.text.length)+R.text;break}else if(b?.type==="list"){let S=b,y=S.raw+`
`+r.join(`
`),R=this.list(y);o[o.length-1]=R,n=n.substring(0,n.length-b.raw.length)+R.raw,s=s.substring(0,s.length-S.raw.length)+R.raw,r=y.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",u="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),b=t.split(`
`,1)[0],S=!h.trim(),y=0;if(this.options.pedantic?(y=2,u=h.trimStart()):S?y=e[1].length+1:(y=e[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,u=h.slice(y),y+=e[1].length),S&&this.rules.other.blankLine.test(b)&&(c+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let R=this.rules.other.nextBulletRegex(y),M=this.rules.other.hrRegex(y),O=this.rules.other.fencesBeginRegex(y),P=this.rules.other.headingBeginRegex(y),z=this.rules.other.htmlBeginRegex(y);for(;t;){let D=t.split(`
`,1)[0],v;if(b=D,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),v=b):v=b.replace(this.rules.other.tabCharGlobal,"    "),O.test(b)||P.test(b)||z.test(b)||R.test(b)||M.test(b))break;if(v.search(this.rules.other.nonSpaceChar)>=y||!b.trim())u+=`
`+v.slice(y);else{if(S||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||O.test(h)||P.test(h)||M.test(h))break;u+=`
`+b}!S&&!b.trim()&&(S=!0),c+=D+`
`,t=t.substring(D.length+1),h=v.slice(y)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=u.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),u=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=u}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Zs(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Zs(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Kt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=za(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ks(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ks(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...n[0]][0].length,h=t.slice(0,s+n.index+u+i);if(Math.min(s,i)%2){let S=h.slice(1,-1);return{type:"em",raw:h,text:S,tokens:this.lexer.inlineTokens(S)}}let b=h.slice(2,-2);return{type:"strong",raw:h,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},Je=class pn{constructor(e){fe(this,"tokens");fe(this,"options");fe(this,"state");fe(this,"inlineQueue");fe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||wt,this.options.tokenizer=this.options.tokenizer||new kr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:qe,block:_r.normal,inline:Zt.normal};this.options.pedantic?(r.block=_r.pedantic,r.inline=Zt.pedantic):this.options.gfm&&(r.block=_r.gfm,this.options.breaks?r.inline=Zt.breaks:r.inline=Zt.gfm),this.tokenizer.rules=r}static get rules(){return{block:_r,inline:Zt}}static lex(e,r){return new pn(r).lex(e)}static lexInline(e,r){return new pn(r).inlineTokens(e)}lex(e){e=e.replace(qe.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,h=e.slice(1),b;this.options.extensions.startInline.forEach(S=>{b=S.call({lexer:this},h),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},vr=class{constructor(t){fe(this,"options");fe(this,"parser");this.options=t||wt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(qe.notSpaceStart)?.[0],s=t.replace(qe.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${at(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Vs(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+at(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Vs(t);if(s===null)return at(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${at(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:at(t.text)}},vn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},et=class fn{constructor(e){fe(this,"options");fe(this,"renderer");fe(this,"textRenderer");this.options=e||wt,this.options.renderer=this.options.renderer||new vr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vn}static parse(e,r){return new fn(r).parse(e)}static parseInline(e,r){return new fn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},yr,Xt=(yr=class{constructor(t){fe(this,"options");fe(this,"block");this.options=t||wt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?Je.lex:Je.lexInline}provideParser(){return this.block?et.parse:et.parseInline}},fe(yr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),fe(yr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),yr),Ha=class{constructor(...t){fe(this,"defaults",hn());fe(this,"options",this.setOptions);fe(this,"parse",this.parseMarkdown(!0));fe(this,"parseInline",this.parseMarkdown(!1));fe(this,"Parser",et);fe(this,"Renderer",vr);fe(this,"TextRenderer",vn);fe(this,"Lexer",Je);fe(this,"Tokenizer",kr);fe(this,"Hooks",Xt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new vr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new kr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Xt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Xt.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Xt.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let u=l.call(s,c);return a.call(s,u)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return Je.lex(t,e??this.defaults)}parser(t,e){return et.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?Je.lex:Je.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?et.parse:et.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?Je.lex:Je.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?et.parse:et.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+at(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},yt=new Ha;function ae(t,e){return yt.parse(t,e)}ae.options=ae.setOptions=function(t){return yt.setOptions(t),ae.defaults=yt.defaults,Xs(ae.defaults),ae};ae.getDefaults=hn;ae.defaults=wt;ae.use=function(...t){return yt.use(...t),ae.defaults=yt.defaults,Xs(ae.defaults),ae};ae.walkTokens=function(t,e){return yt.walkTokens(t,e)};ae.parseInline=yt.parseInline;ae.Parser=et;ae.parser=et.parse;ae.Renderer=vr;ae.TextRenderer=vn;ae.Lexer=Je;ae.lexer=Je.lex;ae.Tokenizer=kr;ae.Hooks=Xt;ae.parse=ae;var Oc=ae.options,Mc=ae.setOptions,Nc=ae.use,Pc=ae.walkTokens,Fc=ae.parseInline;var Bc=et.parse,qc=Je.lex;function lo(t){let e=ae.parse(t),r=zs.sanitize(e);return Ws(r)}function Wa(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function co(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(y){y.key==="Escape"&&s&&(y.preventDefault(),b())}document.addEventListener("keydown",a);function c(){return s?p`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Wa(s)}</span
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
            ${o==="loading"?p`<div class="mv__status">불러오는 중…</div>`:o==="error"?p`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:lo(i)}
          </div>
        </div>
      </div>
    `:p``}function u(){ce(c(),t)}async function h(y){s=y,o="loading",i="",l="",u();let R=r?r():"";if(!R){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",u();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",u();return}let M="/api/doc?workspace="+encodeURIComponent(R)+"&path="+encodeURIComponent(y);try{let O=await n(M),P=await O.json().catch(()=>({}));if(!O.ok||!P||P.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(P&&P.error||O.status)+")",u();return}i=String(P.content||""),o="ready",u()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",u()}}function b(){s=null,ce(p``,t)}function S(){document.removeEventListener("keydown",a),b()}return{open:h,close:b,destroy:S}}var Ga={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ja(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function uo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return p`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let o of r)o&&typeof o.resumed_from=="string"&&o.resumed_from.length>0&&n.add(o.resumed_from);let s=o=>{if(!(o.status==="failed"||o.status==="orphaned"))return"";let l=typeof o.session_id=="string"&&o.session_id.length>0,a=n.has(o.attempt_id),c=l&&!a,u=l?a?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return p`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${o.attempt_id}
      ?disabled=${!c}
      title=${u}
      @click=${h=>{h.stopPropagation(),c&&e.onResume&&e.onResume(o.attempt_id)}}
    >
      ↻ 이어하기
    </button>`};return p`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(o=>p`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${o.status||"unknown"}"
              data-attempt-id=${o.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(o.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Ga[o.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${o.attempt_id}</span>
              ${o.resumed_from?p`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${o.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[o.runner,o.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${o.session_id?p`<span class="detail-session__sid" title=${o.session_id}
                    >${String(o.session_id).slice(0,8)}</span
                  >`:""}
              <span class="detail-session__time"
                >${ja(o.started_at)}</span
              >
            </button>
            ${s(o)}
          </div>`)}
    </div>
  `}var Ya=["open","in_progress","deferred","resolved","closed"],Va=[0,1,2,3,4];function po(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,u={},h=!1,b=!1,S="",y="",R="";function M(){h=!1,b=!1,S="",y="",R=""}let O=document.createElement("div");O.className="md-viewer-root",document.body.appendChild(O);let P=co(O,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),z=document.createElement("div");z.className="session-log-root",document.body.appendChild(z);let D=pr(z,{transport:s?(m,C)=>Promise.resolve(s(m,C)):void 0,sessionLogStore:l});function v(){if(!i||!a)return[];let m=i.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(A=>A&&A.bead_id===a).sort((A,_)=>(_.started_at||0)-(A.started_at||0)).map(A=>({attempt_id:A.attempt_id,bead_id:A.bead_id,status:A.status,started_at:typeof A.started_at=="number"?A.started_at:null,runner:A.runner||null,model:A.model||null,session_id:A.session_id||null,resumed_from:A.resumed_from||null}))}function w(m){let C=i?i.get():null,A=C&&C.attempts?C.attempts[m]:null;D.open({attempt_id:m,meta:A?{runner:A.runner||void 0,model:A.model||void 0,effort:A.effort||void 0,status:A.status||void 0,session_id:A.session_id||void 0}:{}})}async function $(m){if(!s||!m)return;let C=()=>{let _=i?i.get():null;return _&&typeof _.revision=="number"?_.revision:0},A=await s("worker-attempt-resume",{attempt_id:m,expected_revision:C()});if(A&&A.conflict){let _=A.queue&&typeof A.queue.revision=="number"?A.queue.revision:C();A=await s("worker-attempt-resume",{attempt_id:m,expected_revision:_})}A&&A.resumed===!1&&!A.conflict&&A.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${A.reason}`,"error",2400)}let x={onOpen:w,onResume:$};function B(){let m=i?i.get():null,C=m&&m.exec_defaults;return C&&typeof C=="object"?C:{}}let G=null;r&&r.subscribe&&(G=r.subscribe(()=>Ae()));let K=null;i&&typeof i.subscribe=="function"&&(K=i.subscribe(()=>{a&&N()}));function Q(m){m.key==="Escape"&&a&&(m.preventDefault(),n())}document.addEventListener("keydown",Q);function Ae(){if(a){if(r&&typeof r.snapshotFor=="function"){let m=r.snapshotFor("detail:"+a)||[];c=m.find(A=>A&&A.id===a)||m[0]||c}N()}}function Oe(m){It(m).then(C=>{C?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Te(m){m.preventDefault(),m.stopPropagation(),a&&Oe(a)}function Ye(m,C){m.preventDefault(),m.stopPropagation(),Oe(C)}function ze(m,C){m.preventDefault(),m.stopPropagation(),P.open(C)}function de(m,C){u[m]=C,N(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:m,value:C})).catch(()=>{J("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function ke(m,C,A){if(!s||!a)return!1;try{let _=await Promise.resolve(s(m,C)),H=Array.isArray(_)?_[0]:_;return H&&typeof H=="object"&&H.id?(c=H,!0):(J(A,"error"),!1)}catch{return J(A,"error"),!1}}function Ue(m){setTimeout(()=>{try{let C=t.querySelector(m);C&&typeof C.focus=="function"&&C.focus()}catch{}},0)}function ue(){h=!0,S=c&&c.title||"",N(),Ue('.detail-edit__input[data-edit="title"]')}function tt(m){S=m.target.value}function pe(){h=!1,S="",N()}function He(){ke("edit-text",{id:a,field:"title",value:S},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(C=>{C&&(h=!1,S=""),N()})}function se(){b=!0,y=c&&c.description||"",N(),Ue('.detail-edit__textarea[data-edit="description"]')}function Me(m){y=m.target.value}function Ve(){b=!1,y="",N()}function xe(){ke("edit-text",{id:a,field:"description",value:y},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(C=>{C&&(b=!1,y=""),N()})}function k(m,C,A,_){if(m.key==="Escape"){m.stopPropagation(),A();return}m.key==="Enter"&&(!_||m.ctrlKey||m.metaKey)&&(m.preventDefault(),C())}function E(m){let C=m.target.value;ke("update-status",{id:a,status:C},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>N())}function Z(m){let C=Number(m.target.value);ke("update-priority",{id:a,priority:C},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>N())}function oe(m){R=m.target.value}function le(){let m=R.trim();m.length!==0&&ke("label-add",{id:a,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(C=>{C&&(R=""),N()})}function ee(m){if(m.key==="Escape"){m.stopPropagation(),R="",N();return}m.key==="Enter"&&(m.preventDefault(),le())}function X(m){ke("label-remove",{id:a,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>N())}let ye={onCopyPath:Ye,onOpenDoc:ze},he={onChange:de};function Ie(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function Ne(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function $e(m){let A=(Array.isArray(m.dependencies)?m.dependencies:[]).map(_=>({id:Ie(_),icon:Ne(_)})).filter(_=>_.id.length>0);return p`
      <div class="detail-section-label">의존성</div>
      ${A.length===0?p`<div class="detail-empty">의존성 없음</div>`:p`<div class="detail-deps">
            ${A.map(_=>o?p`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(_.id)}
                  >
                    ${_.icon?`${_.icon} `:""}${_.id}
                  </button>`:p`<span class="detail-dep"
                    >${_.icon?`${_.icon} `:""}${_.id}</span
                  >`)}
          </div>`}
    `}function je(m){let C=m.metadata||{},A=m.workflow||{},_=A.stages||{},H=_.spec&&_.spec.stale,te=_.impl&&_.impl.stale,q=A.route_source==="derived",Re=A.route||C.route||"\u2014";return p`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${q?" detail-kv__v--derived":""}"
          title=${q?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${q&&A.route?`${Re} ? (\uCD94\uB860)`:Re}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${C.spec_review||"\uC5C6\uC74C"}${H?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${C.impl_review||"\uC5C6\uC74C"}${te?" \xB7 stale":""}</span
        >
      </div>
      ${C.pr_url?p`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${C.pr_url}</span>
          </div>`:""}
    `}let Ze={route:["spec_backed","full_plan"],merge_policy:["auto_merge","pr_stop"],drift_policy:["auto_rereview","halt"]};async function ge(m,C){let A=C.target.value;if(m==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&A!=="full_plan"&&!window.confirm(`full_plan \u2192 ${A||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){N();return}await ke("update-workflow-meta",{id:a,key:m,value:A},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),N()}function Ce(m){let C=m.metadata||{},A=(_,H)=>{let te=Ze[_],q=typeof C[_]=="string"?C[_]:"";return p`<div class="detail-kv">
        <span class="detail-kv__k">${_}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${_}
          data-edit=${`wfmeta-${_}`}
          @change=${Re=>ge(_,Re)}
        >
          <option value="" ?selected=${!te.includes(q)}>
            ${H}
          </option>
          ${te.map(Re=>p`<option value=${Re} ?selected=${q===Re}>${Re}</option>`)}
        </select>
      </div>`};return p`
      ${A("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")}
      ${A("merge_policy","(\uAE30\uBCF8 auto_merge)")}
      ${A("drift_policy","(\uAE30\uBCF8 auto_rereview)")}
    `}function Ee(m){return h?p`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${S}
            @input=${tt}
            @keydown=${C=>k(C,He,pe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${He}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${pe}
            >
              취소
            </button>
          </div>
        </div>
      `:p`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
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
    `}function Se(m){let C=Rt(m.created_at),A=Rt(m.updated_at);return!C&&!A?p``:p`
      ${C?p`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
      ${A?p`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
    `}function T(m,C){return p`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${E}
        >
          ${Ya.map(A=>p`<option value=${A} ?selected=${A===m}>${A}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Z}
        >
          ${Va.map(A=>p`<option value=${String(A)} ?selected=${A===C}>
                P${A}
              </option>`)}
        </select>
      </div>
    `}function L(m){return p`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":p`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${se}
            >
              ✎
            </button>`}
      </div>
      ${b?p`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${y}
              @input=${Me}
              @keydown=${C=>k(C,xe,Ve,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${xe}
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
          </div>`:p`<div class="detail-overlay__desc">
            ${m||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Y(m){let C=Array.isArray(m.labels)?m.labels:[];return p`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${C.map(A=>p`<span class="detail-label-chip"
              >${A}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${A}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+A}
                @click=${()=>X(A)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${R}
            @input=${oe}
            @keydown=${ee}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${le}
          >
            추가
          </button>
        </span>
      </div>
    `}function j(){if(!a)return p``;let m=c||{},C=String(m.id||a),A=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",_=m.status||"open",H=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",te=m.description||"",q={...m,metadata:{...m.metadata||{},...u}};return p`
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
            ${C}
          </button>
          ${Ee(A)} ${T(_,H)}
          ${Se(m)} ${L(te)}
          ${Y(m)} ${$e(m)}
          ${je(m)} ${Ce(m)}
          ${Ts(m,ye)}
          ${Es(q,he,B())}
          ${uo(v(),x)}
        </div>
      </div>
    `}function N(){ce(j(),t)}return{load(m){m!==a&&(u={},M()),a=m,c=null,Ae()},clear(){a=null,c=null,u={},M(),P.close(),D.close(),ce(p``,t)},destroy(){G&&(G(),G=null),K&&(K(),K=null),document.removeEventListener("keydown",Q),P.destroy(),O.parentNode&&O.parentNode.removeChild(O),D.destroy(),z.parentNode&&z.parentNode.removeChild(z),a=null,c=null,ce(p``,t)}}}var Za=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function fo(t,e){return Gr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Ka(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function ho(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(w){let $=r.get();if($)try{let x=await n("display-policy-set",{expected_revision:$.revision,policy:w($)});a(x),x&&x.conflict&&x.policy&&(x=await n("display-policy-set",{expected_revision:x.policy.revision,policy:w(x.policy)}),a(x)),x&&x.conflict&&J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(w){w&&w.policy&&typeof w.policy=="object"&&r.set(w.policy)}function c(w){let $=r.get();if(!$)return;let x=fo(w,$)!=="shown";l(B=>Ka(w,B,x))}function u(){let w=i.trim();w.length!==0&&(i="",l($=>$.hidden_prefixes.includes(w)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,w]}),M())}function h(w){l($=>({hidden_prefixes:$.hidden_prefixes.filter(x=>x!==w)}))}function b(w){let $=r.get();if(!$)return;let x=$.chips[w]===!1;l(()=>({chips:{[w]:x}}))}function S(w){let $=s();return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${$.length===0?p`<div class="display-settings__empty">라벨 없음</div>`:p`<div class="display-settings__pills">
              ${$.map(x=>{let B=fo(x,w);return p`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${B}`}
                  data-label=${x}
                  data-state=${B}
                  @click=${()=>c(x)}
                >
                  ${x}
                </button>`})}
            </div>`}
      </section>
    `}function y(w){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${w.hidden_prefixes.map($=>p`<span class="display-settings__prefix">
                ${$}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${$} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h($)}
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
            @input=${$=>{i=String($.target.value||"")}}
          />
          <button type="button" @click=${u}>추가</button>
        </div>
      </section>
    `}function R(w){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Za.map(([$,x])=>p`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${$}
                  .checked=${w.chips[$]!==!1}
                  @change=${()=>b($)}
                />
                <span>${x}</span>
              </label>`)}
        </div>
      </section>
    `}function M(){let w=r.get();ce(p`
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
            ${w?p`${S(w)} ${y(w)}
                ${R(w)}`:p`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let O=!1,P=()=>{O=!1};o.addEventListener("close",P),o.addEventListener("cancel",P);let z=null;r.subscribe&&(z=r.subscribe(()=>{O&&M()}));function D(){O||(i="",O=!0,M(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function v(){O&&(O=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:D,close:v,destroy(){O=!1,o.removeEventListener("close",P),o.removeEventListener("cancel",P),z&&(z(),z=null),o.remove()}}}function mo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,u,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let b=typeof h=="string"?h.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function go(t,e,r){let n=_e("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return p`
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
    `}function l(){ce(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),ce(p``,t)}}}var bo=["bug","feature","task","epic","chore"];function _o(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var yo=["Critical","High","Medium","Low","Backlog"];function wo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),u=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function S(){o.replaceChildren();let v=document.createElement("option");v.value="",v.textContent="\u2014 Select \u2014",o.appendChild(v);for(let w of bo){let $=document.createElement("option");$.value=w,$.textContent=_o(w),o.appendChild($)}i.replaceChildren();for(let w=0;w<=4;w+=1){let $=document.createElement("option");$.value=String(w);let x=yo[w]||"Medium";$.textContent=`${w} \u2013 ${x}`,i.appendChild($)}}S();function y(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function R(v){s.disabled=v,o.disabled=v,i.disabled=v,l.disabled=v,a.disabled=v,u.disabled=v,h.disabled=v,h.textContent=v?"Creating\u2026":"Create"}function M(){c.textContent=""}function O(v){c.textContent=v}function P(){try{let v=window.localStorage.getItem("beads-ui.new.type");v?o.value=v:o.value="";let w=window.localStorage.getItem("beads-ui.new.priority");w&&/^\d$/.test(w)?i.value=w:i.value="2"}catch{o.value="",i.value="2"}}function z(){let v=o.value||"",w=i.value||"";v.length>0&&window.localStorage.setItem("beads-ui.new.type",v),w.length>0&&window.localStorage.setItem("beads-ui.new.priority",w)}async function D(){M();let v=String(s.value||"").trim();if(v.length===0){O("Title is required"),s.focus();return}let w=Number(i.value||"2");if(!(w>=0&&w<=4)){O("Priority must be 0..4"),i.focus();return}let $=String(o.value||""),x=String(a.value||""),B={title:v};$.length>0&&(B.type=$),String(w).length>0&&(B.priority=w),x.length>0&&(B.description=x),R(!0);try{await e("create-issue",B)}catch{R(!1),O("Failed to create issue");return}z(),R(!1),y()}return r.addEventListener("cancel",v=>{v.preventDefault(),y()}),b.addEventListener("click",()=>y()),u.addEventListener("click",()=>y()),r.addEventListener("keydown",v=>{v.key==="Enter"&&(v.ctrlKey||v.metaKey)&&(v.preventDefault(),D())}),n.addEventListener("submit",v=>{v.preventDefault(),D()}),{open(){n.reset(),M(),P();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){y()}}}var Xa=[{key:"orchestration_model",values:()=>Kr},{key:"orchestration_effort",values:()=>Xr},{key:"review_model",values:()=>Qr},{key:"impl_model",values:()=>Jr}];function ko(t,e){let{queueStore:r,transport:n}=e,s=document.createElement("dialog");s.id="worker-exec-defaults-dialog",s.className="exec-defaults",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),t.appendChild(s);function o(){return r&&r.get()||{revision:0,exec_defaults:{}}}function i(){let O=o();return typeof O.revision=="number"?O.revision:0}function l(){let O=o().exec_defaults;return O&&typeof O=="object"?O:{}}function a(O){O&&O.queue&&r&&r.set(O.queue)}async function c(O,P){if(!n)return;let z={key:O,value:P||null};try{let D=await n("worker-queue-set-exec-default",{...z,expected_revision:i()});a(D),D&&D.conflict&&(D=await n("worker-queue-set-exec-default",{...z,expected_revision:i()}),a(D)),D&&D.conflict&&J("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function u(O,P,z){let D=!!z&&!P.includes(z);return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${O}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${O}`}
        data-key=${O}
        @change=${v=>{c(O,v.target.value)}}
      >
        <option value="" ?selected=${!z}>
          ${en[O]||"(\uAE30\uBCF8)"}
        </option>
        ${D?p`<option value=${z} ?selected=${!0}>
              ${z} (비호환)
            </option>`:""}
        ${P.map(v=>p`<option value=${v} ?selected=${z===v}>${v}</option>`)}
      </select>
    </div>`}function h(){let O=l();ce(p`
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
            ${Xa.map(P=>u(P.key,P.values(),O[P.key]||""))}
          </div>
        </div>
      `,s)}let b=!1,S=()=>{b=!1};s.addEventListener("close",S),s.addEventListener("cancel",S);let y=null;r&&r.subscribe&&(y=r.subscribe(()=>{b&&h()}));function R(){b||(b=!0,h(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))}function M(){b&&(b=!1,typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:R,close:M,destroy(){b=!1,s.removeEventListener("close",S),s.removeEventListener("cancel",S),y&&(y(),y=null),s.remove()}}}function Qa(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[];return p`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?p`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id" title="클릭하면 ID 복사">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.pr_url&&t.pr_number?p`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:""}
    ${r.map(n=>p`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${n}</span
        >`)}
    ${t.reason?p`<span class="worker-mini__reason">${t.reason}</span>`:""}
  </div>`}function Ja(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return p`<div
    class="worker-card${e?"":" worker-card--static"}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    <div class="worker-card__head">
      ${e?p`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${t.id}</span>
      ${r&&s?p`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${t.title}</div>
    ${r?ur(r,t.status):""}
    ${t.reason?p`<div class="worker-card__foot">
          <span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >
        </div>`:""}
  </div>`}function Sr(t){return p`<section
    class="worker-pane${t.src?" worker-pane--src":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${t.title}</span>
      <span class="worker-pane__count">${t.items.length}</span>
    </header>
    <div class="worker-pane__body">
      ${t.items.length===0?p`<div class="worker-pane__empty">${t.empty||""}</div>`:t.items.map(e=>t.lane==="candidate"?Ja(e):Qa(e))}
    </div>
  </section>`}function el(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function vo(t){return p`<div class="worker-banners">
    ${t.autoAdvance?p`<div class="worker-banner worker-banner--on" role="status">
          ▶ 자동 진행 켜짐 — 대기 큐를 순서대로 슬롯 수만큼 실행합니다.
        </div>`:p`<div class="worker-banner worker-banner--off" role="status">
          ⏸ 자동 진행 꺼짐 — 새 세션을 시작하지 않습니다. ▶로 재개.
        </div>`}
    ${t.failure?p`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${t.failure.repo||"repo"} 세션 실패 —
          ${t.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${t.failure.resume_attempt_id?p`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.failure.resume_attempt_id}
                ?disabled=${!t.failure.resume_eligible}
                title=${t.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
        </div>`:""}
  </div>`}function tl(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?el(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=t.attempt_id&&t.attempt_id===r;return p`<div
    class="rtile${i?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id">${t.bead_id}</span>
      ${t.resumed_from?p`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${t.resumed_from})`}
            >↻</span
          >`:""}
      <span class="rtile__elapsed">${s}</span>
      <button
        type="button"
        class="rtile__info"
        title="상세 보기"
        aria-label="상세 보기"
      >
        ⓘ
      </button>
      ${n?p`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:p`<button
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
    ${o?p`<div class="rtile__meta">${o}</div>`:""}
  </div>`}function xo(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return p`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?p`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>tl(s,e,r))}
  </div>`}var rl="tab:worker:ready",nl="tab:worker:blocked",Ar=1;function sl(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function ol(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function il(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var al=["closed_unmerged","undecidable"];function ll(t,e,r){let n=r[t]||null,s=n&&n.gate?n.gate:null,o=n&&n.pr?n.pr:null,i=[];return s&&s.gate_badge&&i.push(s.gate_badge),s&&s.base_badge&&s.base_badge!==s.gate_badge&&i.push(s.base_badge),{id:t,title:e,reason:"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:o&&typeof o.number=="number"?o.number:null,pr_url:o&&typeof o.url=="string"?o.url:"",badges:i,alert:!!s&&al.includes(s.tier)}}function xn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l}=e,a=n?lr(n,i):null,c=cr({transport:r,uiOrderStore:i}),u=null,h=[],b=[],S=document.createElement("div");S.className="worker-console";let y=document.createElement("div"),R=document.createElement("div");R.className="worker-drawer-host";let M=document.createElement("div");M.className="worker-lanes-host",S.append(y,R,M),t.appendChild(S);let O=null,P=pr(R,{transport:r,sessionLogStore:o,onClose:()=>{O=null,de()}}),z=ko(S,{queueStore:s,transport:r});function D(){return s&&s.get()||{revision:0,auto_advance:!1,slots:Ar,queue:[],pr_wait:[],done:[]}}function v(){let k=D();return typeof k.revision=="number"?k.revision:0}function w(k){k&&k.queue&&s&&s.set(k.queue)}async function $(k,E){if(!r)return;let Z=await r("worker-queue-place",{bead_id:k,index:E,expected_revision:v()});w(Z),Z&&Z.conflict&&await r("worker-queue-place",{bead_id:k,index:E,expected_revision:v()}).then(w)}async function x(k,E){if(!r)return;let Z=await r("worker-queue-reorder",{bead_id:k,to_index:E,expected_revision:v()});w(Z),Z&&Z.conflict&&await r("worker-queue-reorder",{bead_id:k,to_index:E,expected_revision:v()}).then(w)}async function B(k){if(!r)return;let E=await r("worker-queue-remove",{bead_id:k,expected_revision:v()});w(E),E&&E.conflict&&await r("worker-queue-remove",{bead_id:k,expected_revision:v()}).then(w)}async function G(k){!r||!k||await r("worker-attempt-stop",{attempt_id:k})}async function K(k){if(!r||!k)return;let E=await r("worker-attempt-pause",{attempt_id:k});E&&E.paused===!1&&E.reason&&J(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${E.reason}`,"error",2400)}async function Q(k){if(!r||!k)return;let E=await r("worker-attempt-resume",{attempt_id:k,expected_revision:v()});w(E),E&&E.conflict&&(E=await r("worker-attempt-resume",{attempt_id:k,expected_revision:v()}),w(E)),E&&E.resumed===!1&&!E.conflict&&E.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${E.reason}`,"error",2400)}async function Ae(k){if(!r)return;let E=await r("worker-queue-toggle",{on:k,expected_revision:v()});w(E),E&&E.conflict&&await r("worker-queue-toggle",{on:k,expected_revision:v()}).then(w)}async function Oe(k){if(!r||!Number.isFinite(k))return;let E=Math.max(Ar,Math.floor(k)),Z=await r("worker-queue-set-slots",{slots:E,expected_revision:v()});w(Z),Z&&Z.conflict&&await r("worker-queue-set-slots",{slots:E,expected_revision:v()}).then(w)}function Te(){let k=D(),E=a?a.selectBoardColumn(rl,"ready"):[],Z=a?a.selectBoardColumn(nl,"blocked"):[],oe=new Map;for(let _ of[...E,...Z])oe.set(_.id,_.title||_.id);let le=k.pr_wait||[],ee=k.pr_observations||{},X=k.queue||[],ye=new Set([...X.map(_=>_.bead_id),...le.map(_=>_.bead_id),...k.done.map(_=>_.bead_id)]),he=new Set(Z.map(_=>_.id)),Ie=i?i.get()?.order||{}:{},Ne=new Set,$e=[];for(let _ of[...E,...Z])ye.has(_.id)||Ne.has(_.id)||ol(_)||(Ne.add(_.id),$e.push(_));$e.sort(ir(Ie)),h=$e;let je=k.admission||{},Ze=_=>je[_]?`\u26D4 ${je[_].reason}`:"",ge=$e.map(_=>{let H=sl(_),te=[];he.has(_.id)&&te.push(il(_)),H||te.push("spec \uC5C6\uC74C");let q=Ze(_.id);return q&&te.push(q),{id:_.id,title:_.title||_.id,reason:te.join(" \xB7 "),draggable:H,lane:"candidate",workflow:_.workflow,status:_.status}}),Ce=(_,H)=>_.map(te=>({id:te.bead_id,title:oe.get(te.bead_id)||te.bead_id,reason:H==="done"?"":Ze(te.bead_id),draggable:H!=="done",done:H==="done",lane:H})),Ee=k.attempts?Object.values(k.attempts):[],Se=new Set;for(let _ of Ee)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&Se.add(_.resumed_from);let T=[],L=null;for(let _ of Ee){let H=_.status==="paused"&&!Se.has(_.attempt_id);_.status==="running"||H?T.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:oe.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:H,can_pause:typeof _.session_id=="string"&&_.session_id.length>0}):(_.status==="failed"||_.status==="orphaned")&&(L=_)}let Y=null;if(L){let _=typeof L.session_id=="string"&&L.session_id.length>0,H=Se.has(L.attempt_id);Y={repo:L.repo||"",reason:L.cause||L.status,resume_attempt_id:L.attempt_id,resume_eligible:_&&!H,resume_reason:_?H?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let N=T.filter(_=>!_.paused).length,m=(k.workspace_info||{}).slots,C=typeof m=="number"?m:typeof k.slots=="number"?k.slots:Ar,A=N>C;return{queue:k,idToTitle:oe,candidates:ge,running:T,live_count:N,slots:C,over_cap:A,failure:Y,waiting:Ce(X,"queue"),done:[...le.map(_=>ll(_.bead_id,oe.get(_.bead_id)||_.bead_id,ee)),...Ce(k.done,"done")]}}function Ye(k){let E=k.waiting.length>0?k.waiting[0].id:"\u2014";return p`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${k.queue.auto_advance?" is-active":""}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${k.live_count}</b> · 다음 <b>${E}</b></span
        >
        ${k.over_cap?p`<span
              class="worker-overcap"
              title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
              >cap 초과</span
            >`:""}
        <label class="worker-tgl worker-slots"
          >동시 실행
          <input
            type="number"
            class="worker-slots__input"
            min=${Ar}
            step="1"
            .value=${String(k.slots)}
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
        </button>
      </div>
      ${vo({autoAdvance:!!k.queue.auto_advance,failure:k.failure})}
      ${xo(k.running,Date.now(),O)}`}function ze(k){return p`<div class="worker-lanes">
      ${Sr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:k.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${Sr({id:"worker-pane-queue",lane:"queue",title:`\uB300\uAE30 \uD050 \xB7 \uC2AC\uB86F ${k.slots}`,items:k.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Sr({id:"worker-pane-done",lane:"done",title:`Done \xB7 \uC624\uB298 ${k.done.length}`,items:k.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function de(){let k=Te();ce(Ye(k),y),ce(ze(k),M)}function ke(k){let E=k.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!E)return;let Z=E.dataset.beadId||"",oe=E.dataset.lane||"";u={bead_id:Z,from_lane:oe};try{k.dataTransfer?.setData("text/plain",Z),k.dataTransfer&&(k.dataTransfer.effectAllowed="move")}catch{}}function Ue(k){let E=k.target?.closest?.(".worker-pane");E&&(k.preventDefault(),k.dataTransfer&&(k.dataTransfer.dropEffect="move"),E.classList.add("worker-pane--drag-over"))}function ue(k){k.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function tt(k,E){let Z=h.find(X=>X.id===k);if(!Z)return;let oe=h.filter(X=>X.id!==k),le=oe.length;if(E){let X=E.dataset.beadId;if(X===k)return;let ye=oe.findIndex(he=>he.id===X);ye>=0&&(le=ye)}let ee=oe.slice();ee.splice(le,0,Z),c.applyReorder(k,ee,le)}function pe(k){let E=k.target?.closest?.(".worker-pane");if(!E)return;k.preventDefault(),E.classList.remove("worker-pane--drag-over");let Z=E.dataset.lane||"",oe=u?.bead_id||k.dataTransfer?.getData("text/plain")||"",le=u?.from_lane||"";if(u=null,!oe)return;let ee=k.target?.closest?.(".worker-mini, .worker-card"),X=Array.from(E.querySelectorAll(".worker-mini, .worker-card")),ye=X.length;if(ee){let he=X.indexOf(ee);he>=0&&(ye=he)}if(Z==="candidate"){if(le==="candidate"){tt(oe,ee);return}le==="queue"&&B(oe);return}Z==="queue"&&(le==="queue"?x(oe,ye):$(oe,ye))}function He(k){let E=k.target?.closest?.(".worker-slots__input");if(!E)return;let Z=Number.parseInt(E.value,10);if(!Number.isFinite(Z)){de();return}Oe(Z).then(de)}function se(k){return k?{runner:k.runner||void 0,model:k.model||void 0,effort:k.effort||void 0,worktree:k.worktree||void 0,status:k.status||void 0,session_id:k.session_id||void 0}:{}}function Me(k){let E=D(),Z=E.attempts?E.attempts[k]:null;O=k,P.open({attempt_id:k,meta:se(Z)}),de()}function Ve(){if(!O)return;let k=D(),E=k.attempts?k.attempts[O]:null;E&&P.updateMeta(se(E))}function xe(k){let E=k.target;if(E?.closest?.("#worker-exec-defaults-dialog"))return;if(E?.closest?.(".worker-exec-defaults-btn")){z.open();return}let Z=E?.closest?.(".worker-banner__resume");if(Z){let ee=Z.dataset.attemptId;ee&&Q(ee);return}if(E?.closest?.(".worker-play")){Ae(!0);return}if(E?.closest?.(".worker-pause")){Ae(!1);return}if(E?.closest?.(".rtile__stop")){let X=E?.closest?.(".rtile")?.dataset?.attemptId;X&&G(X);return}if(E?.closest?.(".rtile__pause")){let X=E?.closest?.(".rtile")?.dataset?.attemptId;X&&K(X);return}if(E?.closest?.(".rtile__resume")){let X=E?.closest?.(".rtile")?.dataset?.attemptId;X&&Q(X);return}if(E?.closest?.(".rtile__info")){let X=E?.closest?.(".rtile")?.dataset?.beadId;X&&l&&l(X);return}if(E?.closest?.(".worker-drawer-host"))return;let oe=E?.closest?.(".rtile");if(oe){let ee=oe.dataset.attemptId;ee&&Me(ee);return}let le=E?.closest?.(".worker-mini, .worker-card");if(le){let ee=le.dataset.beadId;if(E?.closest?.(".worker-mini__id, .worker-card__id")){ee&&It(ee).then(X=>{X?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ee&&l&&l(ee)}}return t.addEventListener("dragstart",ke),t.addEventListener("dragover",Ue),t.addEventListener("dragleave",ue),t.addEventListener("drop",pe),t.addEventListener("click",xe),t.addEventListener("change",He),a&&b.push(a.subscribe(de)),s&&b.push(s.subscribe(()=>{de(),Ve()})),de(),{load(){de()},destroy(){for(let k of b.splice(0))try{k()}catch{}t.removeEventListener("dragstart",ke),t.removeEventListener("dragover",Ue),t.removeEventListener("dragleave",ue),t.removeEventListener("drop",pe),t.removeEventListener("click",xe),t.removeEventListener("change",He);try{P.destroy()}catch{}try{z.destroy()}catch{}ce(p``,t)}}}function $n(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function $o(t,e,r,n=async()=>{},s=async()=>{}){let o=_e("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function u(w){let x=w.target.value,G=e.getState().workspace?.current?.path||"";if(x&&x!==G){o("switching workspace to %s",x),l=!0,v();try{await r(x)}catch(K){o("workspace switch failed: %o",K)}finally{l=!1,v()}}}async function h(){let w=e.getState(),$=w.workspace?.current?.path||w.workspace?.available?.[0]?.path||"";if(!(!$||a)){o("git-pulling workspace %s",$),a=!0,v();try{await n($)}catch(x){o("workspace git pull failed: %o",x)}finally{a=!1,v()}}}function b(w){let $=w.target;$&&t.contains($)||R()}function S(w){w.key==="Escape"&&R()}function y(){c||(c=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",S),v())}function R(){c&&(c=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",S),v())}function M(){c?R():y()}async function O(w){let $=w.target,x=$.value,B=$.checked;o("toggling visibility %s \u2192 %s",x,String(B));try{await s(x,B)}catch(G){o("workspace visibility toggle failed: %o",G)}}function P(w){return w?p`
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
    `:p``}function z(w,$){return p`
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
        ${c?p`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${w.map(x=>p`
                    <label
                      class="workspace-picker__manage-row"
                      title="${x.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${x.path}"
                        .checked=${!$.has(x.path)}
                        @change=${O}
                      />
                      <span class="workspace-picker__manage-name"
                        >${$n(x.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let w=e.getState(),$=w.workspace?.current,x=w.workspace?.available||[],B=new Set(w.workspace?.hidden||[]),G=$?.path||x[0]?.path||"";if(x.length===0)return p``;let K=x.filter(Q=>!B.has(Q.path)||Q.path===G);if(K.length<=1){let Q=K[0]||x[0],Ae=$n(Q.path);return p`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Q.path}"
            >${Ae}</span
          >
          ${z(x,B)}
          ${P(G)}
          ${a?p`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return p`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${u}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${K.map(Q=>p`
              <option
                value="${Q.path}"
                ?selected=${Q.path===G}
                title="${Q.path}"
              >
                ${$n(Q.path)}
              </option>
            `)}
        </select>
        ${z(x,B)}
        ${P(G)}
        ${l||a?p`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function v(){ce(D(),t)}return v(),i=e.subscribe(()=>v()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",S),ce(p``,t)}}}var So=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Sn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Ao(t,e,r=Sn()){return{id:r,type:t,payload:e}}function To(t={}){let e=_e("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,u=[],h=new Map,b=new Set;function S(D){for(let v of Array.from(b))try{v(D)}catch{}}function y(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),S(o);let D=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),v=(r.jitterRatio||0)*D,w=Math.max(0,Math.round(D+(Math.random()*2-1)*v));e("ws retry in %d ms (attempt %d)",w,i+1),l=setTimeout(()=>{l=null,z()},w)}function R(D){try{s?.send(JSON.stringify(D))}catch(v){e("ws send failed",v)}}function M(){for(o="open",e("ws open"),S(o),i=0;u.length;){let D=u.shift();D&&R(D)}}function O(D){let v;try{v=JSON.parse(String(D.data))}catch{e("ws received non-JSON message");return}if(!v||typeof v.id!="string"||typeof v.type!="string"){e("ws received invalid envelope");return}if(c.has(v.id)){let $=c.get(v.id);c.delete(v.id),v.ok?$?.resolve(v.payload):$?.reject(v.error||new Error("ws error"));return}let w=h.get(v.type);if(w&&w.size>0)for(let $ of Array.from(w))try{$(v.payload)}catch(x){e("ws event handler error",x)}else e("ws received unhandled message type: %s",v.type)}function P(){o="closed",e("ws closed"),S(o);for(let[D,v]of c.entries())v.reject(new Error("ws disconnected")),c.delete(D);i+=1,y()}function z(){if(!a)return;let D=n();try{s=new WebSocket(D),e("ws connecting %s",D),o="connecting",S(o),s.addEventListener("open",M),s.addEventListener("message",O),s.addEventListener("error",()=>{}),s.addEventListener("close",P)}catch(v){e("ws connect failed %o",v),y()}}return z(),{send(D,v){if(!So.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let w=Sn(),$=Ao(D,v,w);return e("send %s id=%s",D,w),new Promise((x,B)=>{c.set(w,{resolve:x,reject:B,type:D}),s&&s.readyState===s.OPEN?R($):(e("queue %s id=%s (state=%s)",D,w,o),u.push($))})},on(D,v){h.has(D)||h.set(D,new Set);let w=h.get(D);return w?.add(v),()=>{w?.delete(v)}},onConnection(D){return b.add(D),()=>{b.delete(D)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,z()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function cl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function dl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var An=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Eo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Co="worker:queue",Ro="ui:order",Lo="ui:display-policy",dt="tab:board:closed",Io="beads-ui.board.closed-range";function ul(t){let e=_e("main");e("bootstrap start");let r=p`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ce(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let x=function(f,g){let V="Request failed",W="";if(f&&typeof f=="object"){let be=f;if(typeof be.message=="string"&&be.message.length>0&&(V=be.message),typeof be.details=="string")W=be.details;else if(be.details&&typeof be.details=="object")try{W=JSON.stringify(be.details,null,2)}catch{W=""}}else typeof f=="string"&&f.length>0&&(V=f);let re=g&&g.length>0?`Failed to load ${g}`:"Request failed";$.open(re,V,W)},se=function(f){return`${_.getState().workspace.current?.path||""}\0${f}`},Me=function(){ze&&(ze().catch(()=>{}),ze=null),de=null,ke=null},xe=function(f){Ue=f;let g=()=>{Ue!==f||_.getState().selected_id!==f||(Ue=null,Ve(f))};if(!pe){tt.then(g);return}g()},oe=function(){let f=Yn(Z);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},le=function(f){if(f)for(let[g,V]of An){if(k.has(g)||E.has(g))continue;let W=g===dt?oe():{type:V};try{Q.register(g,W)}catch(re){e("register %s store failed: %o",g,re)}E.add(g),K.subscribeList(g,W).then(re=>{k.set(g,re)}).catch(re=>{e("subscribe %s failed: %o",g,re),x(re,"board")}).finally(()=>{E.delete(g)})}else X()},X=function(){for(let[f]of An){let g=k.get(f);g&&(g().catch(()=>{}),k.delete(f));try{Q.unregister(f)}catch(V){e("unregister %s failed: %o",f,V)}}},Ie=function(f){if(!f){Ne();return}for(let[g,V]of Eo)if(!(ye.has(g)||E.has(g))){try{Q.register(g,{type:V})}catch(W){e("register %s store failed: %o",g,W)}E.add(g),K.subscribeList(g,{type:V}).then(W=>{ye.set(g,W)}).catch(W=>{e("subscribe %s failed: %o",g,W),x(W,"worker")}).finally(()=>{E.delete(g)})}he||(G("subscribe-worker-queue",{id:Co}).catch(g=>{e("subscribe-worker-queue failed: %o",g)}),he=()=>G("unsubscribe-worker-queue",{id:Co}))},Ne=function(){for(let[f]of Eo){let g=ye.get(f);g&&(g().catch(()=>{}),ye.delete(f));try{Q.unregister(f)}catch(V){e("unregister %s failed: %o",f,V)}}he&&(he().catch(()=>{}),he=null)},je=function(){$e||(G("subscribe-ui-order",{id:Ro}).catch(f=>{e("subscribe-ui-order failed: %o",f)}),$e=()=>G("unsubscribe-ui-order",{id:Ro}))},Ze=function(){$e&&($e().catch(()=>{}),$e=null),Oe.clear()},Ce=function(){ge||(G("subscribe-display-policy",{id:Lo}).catch(f=>{e("subscribe-display-policy failed: %o",f)}),ge=()=>G("unsubscribe-display-policy",{id:Lo}))},Ee=function(){ge&&(ge().catch(()=>{}),ge=null),Te.clear()},N=function(f){if(!f)return"Unknown";let g=f.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var l=x,a=se,c=Me,u=xe,h=oe,b=le,S=X,y=Ie,R=Ne,M=je,O=Ze,P=Ce,z=Ee,D=N;let v=document.getElementById("header-loading"),w=gs(v),$=mo(t),B=To(),G=w.wrapSend((f,g)=>B.send(f,g)),K=cs(G),Q=ds(),Ae=ps(),Oe=us(),Te=Vn(),Ye=Zn();B.on("worker-queue-snapshot",f=>{let g=f;if(g&&g.queue)try{Ae.set(g.queue)}catch{}}),B.on("ui-order-snapshot",f=>{let g=f;if(g&&typeof g.revision=="number")try{Oe.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),B.on("display-policy-snapshot",f=>{let g=f;if(g&&g.policy&&typeof g.policy=="object")try{Te.set(g.policy)}catch{}}),B.on("session-log-snapshot",f=>{let g=f;if(g&&typeof g.attempt_id=="string")try{Ye.set(g.attempt_id,Array.isArray(g.lines)?g.lines:[])}catch{}}),B.on("session-log-append",f=>{let g=f;if(g&&typeof g.attempt_id=="string")try{Ye.append(g.attempt_id,g.event)}catch{}}),B.on("snapshot",f=>{let g=f,V=g&&typeof g.id=="string"?g.id:"",W=V?Q.getStore(V):null;if(W&&g&&g.type==="snapshot")try{W.applyPush(g)}catch{}}),B.on("upsert",f=>{let g=f,V=g&&typeof g.id=="string"?g.id:"",W=V?Q.getStore(V):null;if(W&&g&&g.type==="upsert")try{W.applyPush(g)}catch{}}),B.on("delete",f=>{let g=f,V=g&&typeof g.id=="string"?g.id:"",W=V?Q.getStore(V):null;if(W&&g&&g.type==="delete")try{W.applyPush(g)}catch{}});let ze=null,de=null,ke=null,Ue=null,ue=()=>{},tt=new Promise(f=>{ue=()=>f(void 0)}),pe=!1,He=!1;async function Ve(f){let g=se(f);if(g===de||g===ke)return;ke=g;let V=`detail:${f}`,W={type:"issue-detail",params:{id:f}};try{Q.register(V,W)}catch(re){e("register detail store failed: %o",re)}try{let re=await K.subscribeList(V,W);if(_.getState().selected_id!==f||se(f)!==g){await re().catch(()=>{});return}ze&&await ze().catch(()=>{}),ze=re,de=g}catch(re){e("detail subscribe failed: %o",re),x(re,"issue details")}finally{ke===g&&(ke=null)}}let k=new Map,E=new Set,Z=nr;try{let f=window.localStorage.getItem(Io);qr(f)&&(Z=f)}catch{}async function ee(f){if(!qr(f)||f===Z)return;Z=f;try{window.localStorage.setItem(Io,f)}catch{}let g=k.get(dt);if(!g)return;k.delete(dt),await g().catch(()=>{});let V=oe();try{Q.register(dt,V)}catch(W){e("register %s store failed: %o",dt,W)}try{let W=await K.subscribeList(dt,V);k.set(dt,W)}catch(W){e("re-subscribe %s failed: %o",dt,W),x(W,"board")}}let ye=new Map,he=null,$e=null,ge=null;async function Se(){ge=null,Te.clear();let f=_.getState().workspace.current?.path;if(f)try{await B.send("set-workspace",{path:f})}catch(g){e("workspace restore after reconnect failed: %o",g);return}Ce()}async function T(){e("clearing all subscriptions for workspace switch"),X(),Ne(),Ae.clear(),Ze(),je(),Ee(),Ce(),Me();let f=_.getState();if(f.selected_id)try{Q.unregister(`detail:${f.selected_id}`)}catch{}let g=_.getState();le(g.view==="board"),Ie(g.view==="worker"),g.selected_id&&xe(g.selected_id)}async function L(f){e("requesting workspace switch to %s",f),He=!0;try{let g=await B.send("set-workspace",{path:f});e("workspace switch result: %o",g),g&&g.workspace&&(_.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),g.changed&&(await T(),J("Switched to "+N(f),"success",2e3)))}catch(g){throw e("workspace switch failed: %o",g),J("Failed to switch workspace","error",3e3),g}finally{He=!1}}async function Y(f){e("requesting workspace git pull for %s",f);try{let g=await B.send("git-pull-workspace",{});e("workspace git pull result: %o",g);let V=g?.status;if(V==="up_to_date"){J("Already up to date","success",2e3);return}if(V==="stash_pop_conflict"){J("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}J("Git pulled "+N(f),"success",2e3)}catch(g){e("workspace git pull failed: %o",g);let V=g?.code,W=g?.message;if(V==="rebase_conflict"){J("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(V==="rebase_conflict_abort_failed"){J("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(V==="busy"){J("Git pull skipped: another operation is running","warning",3e3);return}let re=W?`: ${W}`:"";throw J(`Git pull failed${re}`,"error",3e3),g}}async function j(f,g){e("setting workspace visibility %s \u2192 %s",f,String(g));try{await B.send("set-workspace-visibility",{path:f,visible:g}),await m()}catch(V){e("workspace visibility update failed: %o",V),J("Failed to update project visibility","error",3e3)}}async function m(){try{let f=await B.send("list-workspaces",{});if(e("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let g=f.workspaces.map(be=>({path:be.path,database:be.database,pid:be.pid,version:be.version})),V=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,W=Array.isArray(f.hidden)?f.hidden.filter(be=>typeof be=="string"):[];_.setState({workspace:{current:V,available:g,hidden:W}});let re=window.localStorage.getItem("beads-ui.workspace");re&&(!g.some(tr=>tr.path===re)||W.includes(re)?window.localStorage.removeItem("beads-ui.workspace"):V&&re!==V.path&&(e("restoring saved workspace preference: %s",re),await L(re)))}}catch(f){e("failed to load workspaces: %o",f)}}B.on("workspace-changed",f=>{e("workspace-changed event: %o",f),f&&f.root_dir&&(_.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),m(),T())});let C=!1;if(typeof B.onConnection=="function"){let f=g=>{e("ws state %s",g),g==="reconnecting"||g==="closed"?(C=!0,J("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&C&&(C=!1,J("Reconnected","success",2200),dl(_,(V,W)=>{e(`${V}: %o`,W)}),Se())};B.onConnection(f)}let A="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker")&&(A=f)}catch(f){e("view parse error: %o",f)}let _=ms({config:cl(),view:A}),H=fs(_);H.start();let te=async(f,g)=>{try{return await G(f,g)}catch{return[]}};n&&go(n,_,H);let q=document.getElementById("workspace-picker");q&&$o(q,_,L,Y,j);let Re=wo(t,(f,g)=>G(f,g));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>Re.open())}catch{}let kt=ho(t,{policyStore:Te,transport:(f,g)=>G(f,g),labelOptions:()=>{let f=new Set;for(let[g]of An)for(let V of Q.snapshotFor(g)||[]){let W=V.labels;if(Array.isArray(W))for(let re of W)typeof re=="string"&&re.length>0&&f.add(re)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>kt.open())}catch{}let vt=xs(s,{gotoIssue:f=>H.gotoIssue(f),issueStores:Q,transport:te,uiOrderStore:Oe,displayPolicyStore:Te,closedRange:Z,onClosedRangeChange:f=>{ee(f)},onNewIssue:()=>Re.open()}),Tr=xn(o,{transport:te,issueStores:Q,queueStore:Ae,sessionLogStore:Ye,uiOrderStore:Oe,gotoIssue:f=>_.setState({selected_id:f})}),nt=po(i,{issueStores:Q,transport:te,queueStore:Ae,sessionLogStore:Ye,getWorkspacePath:()=>_.getState().workspace.current?.path,onNavigate:f=>{_.getState().view==="worker"?_.setState({selected_id:f}):H.gotoIssue(f)},onClose:()=>{let f=_.getState();_.setState({selected_id:null});try{H.gotoView(f.view==="worker"?"worker":"board")}catch{}}}),Dt=_.getState().selected_id;Dt&&(i.hidden=!1,nt.load(Dt),xe(Dt)),_.subscribe(f=>{let g=f.selected_id;g?(i.hidden=!1,nt.load(g),He||xe(g)):(nt.clear(),i.hidden=!0,Me())});let er=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",le(f.view==="board"),Ie(f.view==="worker"),!f.selected_id&&f.view==="board"&&vt.load(),f.view==="worker"&&Tr.load(),window.localStorage.setItem("beads-ui.view",f.view)};_.subscribe(er),er(_.getState()),je(),Ce(),m().finally(()=>{pe=!0,ue()}),window.addEventListener("keydown",f=>{let g=f.ctrlKey||f.metaKey,V=String(f.key||"").toLowerCase(),W=f.target,re=W&&W.tagName?String(W.tagName).toLowerCase():"",be=re==="input"||re==="textarea"||re==="select"||W&&typeof W.isContentEditable=="boolean"&&W.isContentEditable;g&&V==="n"&&(be||(f.preventDefault(),Re.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&ul(e)});export{ul as bootstrap,cl as readBootstrapConfig,dl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
