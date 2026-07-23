var No=Object.create;var Cr=Object.defineProperty;var Po=Object.getOwnPropertyDescriptor;var Fo=Object.getOwnPropertyNames;var Bo=Object.getPrototypeOf,zo=Object.prototype.hasOwnProperty;var qo=(t,e,r)=>e in t?Cr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Rr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Uo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Fo(e))!zo.call(t,s)&&s!==r&&Cr(t,s,{get:()=>e[s],enumerable:!(n=Po(e,s))||n.enumerable});return t};var Ho=(t,e,r)=>(r=t!=null?No(Bo(t)):{},Uo(e||!t||!t.__esModule?Cr(r,"default",{value:t,enumerable:!0}):r,t));var ue=(t,e,r)=>qo(t,typeof e!="symbol"?e+"":e,r);var Xn=Rr((yl,Kn)=>{var At=1e3,Tt=At*60,Et=Tt*60,gt=Et*24,Vo=gt*7,Zo=gt*365.25;Kn.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Ko(t);if(r==="number"&&isFinite(t))return e.long?Qo(t):Xo(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Ko(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Zo;case"weeks":case"week":case"w":return r*Vo;case"days":case"day":case"d":return r*gt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Et;case"minutes":case"minute":case"mins":case"min":case"m":return r*Tt;case"seconds":case"second":case"secs":case"sec":case"s":return r*At;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Xo(t){var e=Math.abs(t);return e>=gt?Math.round(t/gt)+"d":e>=Et?Math.round(t/Et)+"h":e>=Tt?Math.round(t/Tt)+"m":e>=At?Math.round(t/At)+"s":t+"ms"}function Qo(t){var e=Math.abs(t);return e>=gt?ir(t,e,gt,"day"):e>=Et?ir(t,e,Et,"hour"):e>=Tt?ir(t,e,Tt,"minute"):e>=At?ir(t,e,At,"second"):t+" ms"}function ir(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Jn=Rr((kl,Qn)=>{function Jo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Xn(),r.destroy=c,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let h=0;for(let y=0;y<u.length;y++)h=(h<<5)-h+u.charCodeAt(y),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(u){let h,y=null,x,w;function A(...M){if(!A.enabled)return;let P=A,z=Number(new Date),D=z-(h||z);P.diff=D,P.prev=h,P.curr=z,h=z,M[0]=r.coerce(M[0]),typeof M[0]!="string"&&M.unshift("%O");let R=0;M[0]=M[0].replace(/%([a-zA-Z%])/g,(b,v)=>{if(b==="%%")return"%";R++;let $=r.formatters[v];if(typeof $=="function"){let B=M[R];b=$.call(P,B),M.splice(R,1),R--}return b}),r.formatArgs.call(P,M),(P.log||r.log).apply(P,M)}return A.namespace=u,A.useColors=r.useColors(),A.color=r.selectColor(u),A.extend=n,A.destroy=r.destroy,Object.defineProperty(A,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(x!==r.namespaces&&(x=r.namespaces,w=r.enabled(u)),w),set:M=>{y=M}}),typeof r.init=="function"&&r.init(A),A}function n(u,h){let y=r(this.namespace+(typeof h>"u"?":":h)+u);return y.log=this.log,y}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let h=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of h)y[0]==="-"?r.skips.push(y.slice(1)):r.names.push(y)}function o(u,h){let y=0,x=0,w=-1,A=0;for(;y<u.length;)if(x<h.length&&(h[x]===u[y]||h[x]==="*"))h[x]==="*"?(w=x,A=y,x++):(y++,x++);else if(w!==-1)x=w+1,A++,y=A;else return!1;for(;x<h.length&&h[x]==="*";)x++;return x===h.length}function i(){let u=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),u}function l(u){for(let h of r.skips)if(o(u,h))return!1;for(let h of r.names)if(o(u,h))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Qn.exports=Jo});var es=Rr((Ge,ar)=>{Ge.formatArgs=ti;Ge.save=ri;Ge.load=ni;Ge.useColors=ei;Ge.storage=si();Ge.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ge.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ei(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ti(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+ar.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Ge.log=console.debug||console.log||(()=>{});function ri(t){try{t?Ge.storage.setItem("debug",t):Ge.storage.removeItem("debug")}catch{}}function ni(){let t;try{t=Ge.storage.getItem("debug")||Ge.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function si(){try{return localStorage}catch{}}ar.exports=Jn()(Ge);var{formatters:oi}=ar.exports;oi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Pt=globalThis,sr=Pt.trustedTypes,Nn=sr?sr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Un="$lit$",lt=`lit$${Math.random().toFixed(9).slice(2)}$`,Hn="?"+lt,Wo=`<${Hn}>`,ht=document,Ft=()=>ht.createComment(""),Bt=t=>t===null||typeof t!="object"&&typeof t!="function",Pr=Array.isArray,Go=t=>Pr(t)||typeof t?.[Symbol.iterator]=="function",Lr=`[ 	
\f\r]`,Nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pn=/-->/g,Fn=/>/g,pt=RegExp(`>|${Lr}(?:([^\\s"'>=/]+)(${Lr}*=${Lr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bn=/'/g,zn=/"/g,Wn=/^(?:script|style|textarea|title)$/i,Fr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),p=Fr(1),fl=Fr(2),hl=Fr(3),mt=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),qn=new WeakMap,ft=ht.createTreeWalker(ht,129);function Gn(t,e){if(!Pr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nn!==void 0?Nn.createHTML(e):e}var jo=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Nt;for(let l=0;l<r;l++){let a=t[l],c,u,h=-1,y=0;for(;y<a.length&&(i.lastIndex=y,u=i.exec(a),u!==null);)y=i.lastIndex,i===Nt?u[1]==="!--"?i=Pn:u[1]!==void 0?i=Fn:u[2]!==void 0?(Wn.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=pt):u[3]!==void 0&&(i=pt):i===pt?u[0]===">"?(i=s??Nt,h=-1):u[1]===void 0?h=-2:(h=i.lastIndex-u[2].length,c=u[1],i=u[3]===void 0?pt:u[3]==='"'?zn:Bn):i===zn||i===Bn?i=pt:i===Pn||i===Fn?i=Nt:(i=pt,s=void 0);let x=i===pt&&t[l+1].startsWith("/>")?" ":"";o+=i===Nt?a+Wo:h>=0?(n.push(c),a.slice(0,h)+Un+a.slice(h)+lt+x):a+lt+(h===-2?l:x)}return[Gn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},zt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,u]=jo(e,r);if(this.el=t.createElement(c,n),ft.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=ft.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Un)){let y=u[i++],x=s.getAttribute(h).split(lt),w=/([.?@])?(.*)/.exec(y);a.push({type:1,index:o,name:w[2],strings:x,ctor:w[1]==="."?Dr:w[1]==="?"?Or:w[1]==="@"?Mr:St}),s.removeAttribute(h)}else h.startsWith(lt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Wn.test(s.tagName)){let h=s.textContent.split(lt),y=h.length-1;if(y>0){s.textContent=sr?sr.emptyScript:"";for(let x=0;x<y;x++)s.append(h[x],Ft()),ft.nextNode(),a.push({type:2,index:++o});s.append(h[y],Ft())}}}else if(s.nodeType===8)if(s.data===Hn)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(lt,h+1))!==-1;)a.push({type:7,index:o}),h+=lt.length-1}o++}}static createElement(e,r){let n=ht.createElement("template");return n.innerHTML=e,n}};function xt(t,e,r=t,n){if(e===mt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Bt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=xt(t,s._$AS(t,e.values),s,n)),e}var Ir=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??ht).importNode(r,!0);ft.currentNode=s;let o=ft.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new qt(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Nr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=ft.nextNode(),i++)}return ft.currentNode=ht,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},qt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=xt(this,e,r),Bt(e)?e===ve||e==null||e===""?(this._$AH!==ve&&this._$AR(),this._$AH=ve):e!==this._$AH&&e!==mt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Go(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ve&&Bt(this._$AH)?this._$AA.nextSibling.data=e:this.T(ht.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=zt.createElement(Gn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ir(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=qn.get(e.strings);return r===void 0&&qn.set(e.strings,r=new zt(e)),r}k(e){Pr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Ft()),this.O(Ft()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},St=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ve}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=xt(this,e,r,0),i=!Bt(e)||e!==this._$AH&&e!==mt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=xt(this,l[n+a],r,a),c===mt&&(c=this._$AH[a]),i||(i=!Bt(c)||c!==this._$AH[a]),c===ve?e=ve:e!==ve&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Dr=class extends St{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ve?void 0:e}},Or=class extends St{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ve)}},Mr=class extends St{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=xt(this,e,r,0)??ve)===mt)return;let n=this._$AH,s=e===ve&&n!==ve||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==ve&&(n===ve||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Nr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){xt(this,e)}};var Yo=Pt.litHtmlPolyfillSupport;Yo?.(zt,qt),(Pt.litHtmlVersions??(Pt.litHtmlVersions=[])).push("3.3.1");var le=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new qt(e.insertBefore(Ft(),o),o,void 0,r??{})}return s._$AI(t),s};var or="today",jn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Br(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Yn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Vn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Zn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var ts=Ho(es(),1);function we(t){return(0,ts.default)(`beads-ui:${t}`)}function Qe(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Ut(t,e){let r=Qe(t.created_at),n=Qe(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ss(t,e){let r=Qe(t.created_at),n=Qe(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function os(t,e){let r=Qe(t.updated_at),n=Qe(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function is(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=Qe(t.created_at),o=Qe(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function as(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var ii=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function rs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ns(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=ii.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ls(t,e){let r=rs(t),n=rs(e);if(r!==n)return r<n?-1:1;let s=ns(t),o=ns(e);if(s!==o)return s<o?-1:1;let i=Qe(t&&t.created_at),l=Qe(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var zr=2**20;function Ct(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-Qe(t&&t.created_at)}function lr(t){return(e,r)=>{let n=Ct(e,t),s=Ct(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function qr(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ct(l,r)-zr};if(!l)return{rank:Ct(i,r)+zr};let a=Ct(i,r),c=Ct(l,r),u=(a+c)/2;return a<u&&u<c?{rank:u}:{renormalize:n.map((h,y)=>({bead_id:h.id,rank:y*zr}))}}function Ur(t,e={}){let r=we(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Ut;function c(){for(let y of Array.from(i))try{y()}catch{}}function u(){s=Array.from(n.values()).sort(a)}function h(y){if(l||!y||y.id!==t)return;let x=Number(y.revision)||0;if(r("apply %s rev=%d",y.type,x),!(x<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(x<=o)return;n.clear();let w=Array.isArray(y.issues)?y.issues:[];for(let A of w)A&&typeof A.id=="string"&&A.id.length>0&&n.set(A.id,A);u(),o=x,c();return}if(y.type==="upsert"){let w=y.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let A=n.get(w.id);if(!A)n.set(w.id,w);else{let M=Number.isFinite(A.updated_at)?A.updated_at:0,P=Number.isFinite(w.updated_at)?w.updated_at:0;if(M<=P){for(let z of Object.keys(A))z in w||delete A[z];for(let[z,D]of Object.entries(w))A[z]=D}}u()}o=x,c()}else if(y.type==="delete"){let w=String(y.issue_id||"");w&&(n.delete(w),u()),o=x,c()}}}return{id:t,subscribe(y){return i.add(y),()=>{i.delete(y)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(y){return n.get(y)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function cr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function cs(t){let e=we("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let u=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],y=Array.isArray(a.removed)?a.removed:[];for(let x of Array.from(c)){let w=r.get(x);if(!w)continue;let A=w.itemsById;for(let M of u)typeof M=="string"&&M.length>0&&A.set(M,!0);for(let M of h)typeof M=="string"&&M.length>0&&A.set(M,!0);for(let M of y)typeof M=="string"&&M.length>0&&A.delete(M)}}async function o(l,a){let c=cr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let y=n.get(h.key);y&&(y.delete(l),y.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let u=n.get(c);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let y=r.get(l)||null;if(y){let x=n.get(y.key);x&&(x.delete(l),x.size===0&&n.delete(y.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let y=n.get(h.key);y&&(y.delete(l),y.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:cr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let u of a.itemsById.keys())c[u]=!0;return c}}}}function ds(){let t=we("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,u){let h=c?cr(c):"",y=r.get(a)||"",x=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,y),x&&y&&h&&y!==h){let w=e.get(a);if(w)try{w.dispose()}catch{}let A=s.get(a);if(A){try{A()}catch{}s.delete(a)}let M=Ur(a,u);e.set(a,M);let P=M.subscribe(()=>o());s.set(a,P)}else if(!x){let w=Ur(a,u);e.set(a,w);let A=w.subscribe(()=>o());s.set(a,A)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let u=s.get(a);if(u){try{u()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function us(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ps(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Hr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function ai(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function li(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function fs(t){let e=we("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):ai(n),i=li(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Hr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Hr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ci=Object.freeze({workspace_config:{default_workspace:null}});function hs(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:ci.workspace_config.default_workspace}}}function ms(t={}){let e=we("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:hs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?hs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,u)=>c!==r.workspace.hidden[u]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,u)=>c===r.worker.show_closed_children[u])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function gs(t){let e=we("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,y)=>{let x=s++,w=Date.now();n.set(x,{type:h,start_ts:w}),e("request start id=%d type=%s count=%d",x,h,r+1),i();let A=!1,M=()=>{A||(A=!0,n.delete(x),l())},P=setTimeout(()=>{A||(e("request TIMEOUT id=%d type=%s elapsed=%dms",x,h,Date.now()-w),M())},3e4);try{let z=await c(h,y),D=Date.now()-w;return e("request done id=%d type=%s elapsed=%dms",x,h,D),z}catch(z){let D=Date.now()-w;throw e("request error id=%d type=%s elapsed=%dms err=%o",x,h,D,z),z}finally{clearTimeout(P),M()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([u,h])=>({id:u,type:h.type,elapsed_ms:c-h.start_ts}))}}}function X(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function dr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(as),a;switch(l){case"created_desc":return a.sort(Ut),a;case"created_asc":return a.sort(ss),a;case"updated_desc":return a.sort(os),a;case"priority":return a.sort(is),a;case"manual":default:{let c=r();return c?a.sort(lr(c)):a.sort(Ut),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function ur(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},u=n(qr(l,a,c.order),i);s(c,u);let h=await e("ui-order-set",{expected_revision:c.revision,entries:u});if(h&&h.conflict){let y={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(y);let x=n(qr(l,a,y.order),i);s(y,x);let w=await e("ui-order-set",{expected_revision:y.revision,entries:x});w&&w.applied&&r.set({revision:typeof w.revision=="number"?w.revision:0,order:w.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function pr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Wr(t,e){return!e||typeof t!="string"||t.length===0||pr(e.visible_labels).includes(t)?!0:pr(e.hidden_labels).includes(t)?!1:!pr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function _s(t,e){return pr(t).filter(r=>Wr(r,e))}function _t(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function Gr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Rt(t){let e=Gr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function jr(t,e){let r=Gr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var di={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},ui={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},pi={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},fi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function hi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function mi(t,e,r){let n=di[t]||t,s=e&&e.state||"empty",o=fi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return p`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${ui[t]||t}
      </div>
    </div>
  `}function fr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=pi[r],s=t.stages,o=hi(n,s,String(e||"open"));return p`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>mi(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function gi(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var bs=2;function _i(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(p`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,bs).join(", "),s=r.length-bs,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(p`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function bi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&_t(r,"route")){let o=n.route_source==="derived";s.push(p`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&_t(r,"fast_track")&&s.push(p`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&_t(r,"pr")){let o=n.pr.number;s.push(p`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of _s(t.labels,r))s.push(p`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&_t(r,"from")&&s.push(p`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),_t(r,"blocked")&&s.push(..._i(t.blocked_info)),s.length===0?"":p`<div class="board-card__chips">${s}</div>`}function yi(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ki(t){let e=jr(t.created_at),r=jr(t.updated_at);return!e&&!r?"":p`<span class="board-card__times">
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
        ${ki(t)}
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
                  <span class=${yi(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function ys(t,e){let r=gi(t.priority);return p`
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
      ${t.workflow&&_t(e.policy||null,"stepper")?fr(t.workflow,t.status):""}
      ${wi(t,e)}
    </article>
  `}function bt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return p`
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
  `}var vi=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],$i=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],xi=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Si(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return p`
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
  `}function ks(t,e,r){return p`
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
        ${vi.map(n=>p`<option
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
        ${$i.map(n=>p`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Si(t,e,r)}
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
  `}var Ai=200,Ti={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ei=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),ws="beads-ui.board.sort",vs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ci(){try{let t=window.localStorage.getItem(ws);if(t&&vs.has(t))return t}catch{}return"created_desc"}function $s(t,e){let r=we("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,u=e.closedRange||or,h=s?dr(s,i):null,y=ur({transport:o,uiOrderStore:i}),x=[],w=[],A=[],M=[],P=[],z=[],D=!1,R=0,k=Ci(),b=new Map,v=new Map,$=new Map,B=new Set,Y={search:"",priority:"",type:"",labels:[]},K=!1,Q=null;function Ie(m){return String(m.status||"open")==="open"}function Fe(m){let C=String(m.status||"open");return C==="open"||C==="blocked"}function Ce(m){let C=Y.search.trim().toLowerCase(),U=Y.priority,G=Y.type,N=Y.labels;return m.filter(_=>{if(C){let T=String(_.id||"").toLowerCase(),E=String(_.title||"").toLowerCase();if(!T.includes(C)&&!E.includes(C))return!1}if(U!==""&&String(_.priority)!==U||G!==""&&String(_.issue_type||"")!==G)return!1;if(N.length>0){let T=Array.isArray(_.labels)?_.labels:[];if(!N.some(E=>T.includes(E)))return!1}return!0})}function Ve(){let m=new Set;for(let C of[x,w,A,M,P,z])for(let U of C){let G=Array.isArray(U.labels)?U.labels:[];for(let N of G)typeof N=="string"&&N.length>0&&m.add(N)}return Array.from(m).sort()}function Ae(){return Y.search.trim()!==""||Y.priority!==""||Y.type!==""||Y.labels.length>0}function be(){try{if(h){let m=h.selectBoardColumn("tab:board:in-progress","in_progress",k),C=h.selectBoardColumn("tab:board:blocked","blocked",k).filter(Fe),U=new Set(m.map(H=>H.id)),G=h.selectBoardColumn("tab:board:ready","ready",k).filter(H=>Ie(H)&&!U.has(H.id)),N=h.selectBoardColumn("tab:board:resolved","resolved",k),_=h.selectBoardColumn("tab:board:deferred","deferred",k),T=D?_:[],E=h.selectBoardColumn("tab:board:closed","closed").slice(0,Ai),I=[...C,...G,...m,...N,...T,...E];$e(I);let J=new Set;for(let H of I)H&&H.id&&!Yr(H)&&J.add(H.id);let fe=!Ae();x=fe?Lt(C,J):C,w=fe?Lt(G,J):G,A=fe?Lt(m,J):m,M=fe?Lt(N,J):N,P=fe?Lt(T,J):T,R=_.length,z=fe?Lt(E,J):E,b=new Map;for(let H of x)b.set(H.id,"open");for(let H of w)b.set(H.id,"open");for(let H of A)b.set(H.id,"in_progress");for(let H of M)b.set(H.id,"resolved");for(let H of P)b.set(H.id,"deferred");for(let H of z)b.set(H.id,"closed");v=new Map;for(let H of x)v.set(H.id,"blocked-col");for(let H of w)v.set(H.id,"ready-col");for(let H of A)v.set(H.id,"in-progress-col");for(let H of M)v.set(H.id,"resolved-col");for(let H of P)v.set(H.id,"deferred-col");for(let H of z)v.set(H.id,"closed-col")}_e()}catch{x=[],w=[],A=[],M=[],P=[],z=[],$=new Map,_e()}}function $e(m){let C=new Map;for(let G of m)G&&G.id&&!C.has(G.id)&&C.set(G.id,G);let U=new Map;for(let G of C.values()){let N=Yr(G);if(!N)continue;let _=U.get(N);_||(_=[],U.set(N,_)),_.push({id:G.id,title:G.title,status:G.status,metadata:G.metadata,created_at:G.created_at})}$=U}function He(m){let C=$.get(m)||[],U=0,G=null;for(let N of C)(N.status==="resolved"||N.status==="closed")&&(U+=1),!G&&N.status==="in_progress"&&(G=N);return{total:C.length,count:U,current:G,children:C}}function pe(m){return!B.has(m)}function Xe(m,C){m.preventDefault(),m.stopPropagation(),B.has(C)?B.delete(C):B.add(C),_e()}function ce(m,C){m.preventDefault(),m.stopPropagation(),n(C)}function je(m,C){m.preventDefault(),m.stopPropagation(),n(C)}function ie(m,C){Q||n(C)}function Ne(m,C){m.preventDefault(),m.stopPropagation(),Ri(C).then(U=>{U&&X("\uBCF5\uC0AC\uB428","success",1200)})}function S(m,C){Q=C,m.dataTransfer&&(m.dataTransfer.setData("text/plain",C),m.dataTransfer.effectAllowed="move"),m.target.classList.add("board-card--dragging")}function O(m){m.target.classList.remove("board-card--dragging"),Ze(),setTimeout(()=>{Q=null},0)}function V(m){let C=String(m.target.value||"");!C||C===u||(u=C,a&&a(C),_e())}let q={onCardClick:ie,onCopyId:Ne,onDragStart:S,onDragEnd:O,onClosedRangeChange:V,rollupFor:He,isExpanded:pe,onRollupToggle:Xe,onChildClick:ce,onFromChipClick:je,get policy(){return l?l.get():null}};function de(m){let C=m.target,U=t.querySelector(".board-filter__labels");C&&U&&U.contains(C)||he()}function ee(m){m.key==="Escape"&&he()}function te(){K||(K=!0,document.addEventListener("mousedown",de),document.addEventListener("keydown",ee),_e())}function he(){K&&(K=!1,document.removeEventListener("mousedown",de),document.removeEventListener("keydown",ee),_e())}let se={onSearchInput(m){Y.search=String(m.target.value||""),be()},onPriorityChange(m){Y.priority=String(m.target.value||""),be()},onTypeChange(m){Y.type=String(m.target.value||""),be()},onSortChange(m){let C=String(m.target.value||"");if(!(!vs.has(C)||C===k)){k=C;try{window.localStorage.setItem(ws,C)}catch{}be()}},onDeferredToggle(){D=!D,be()},onLabelMenuToggle(){K?he():te()},onLabelToggle(m){let C=Y.labels.indexOf(m);C===-1?Y.labels.push(m):Y.labels.splice(C,1),be()},onLabelClear(){Y.labels.length!==0&&(Y.labels=[],be())},onNewIssue(){c&&c()}};function Re(){let m=D?"board-root board-root--deferred":"board-root";return p`
      <div class="board-view">
        ${ks(Y,se,{sort_mode:k,show_deferred:D,deferred_count:R,label_options:Ve(),label_menu_open:K})}
        <div class=${m}>
          ${bt({title:"Blocked",id:"blocked-col",items:Ce(x)},q)}
          ${bt({title:"Ready",id:"ready-col",items:Ce(w)},q)}
          ${bt({title:"In progress",id:"in-progress-col",items:Ce(A)},q)}
          ${bt({title:"Resolved",id:"resolved-col",items:Ce(M)},q)}
          ${D?bt({title:"Deferred",id:"deferred-col",items:Ce(P)},q):""}
          ${bt({title:"Closed",id:"closed-col",items:Ce(z),is_closed:!0,closed_range:u},q)}
        </div>
      </div>
    `}function _e(){le(Re(),t),Te()}function Te(){try{let m=Array.from(t.querySelectorAll(".board-column"));for(let C of m)Array.from(C.querySelectorAll(".board-card")).forEach((G,N)=>{G.tabIndex=N===0?0:-1})}catch{}}async function ye(m,C){if(!o){X("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:m,status:C}),X("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(U){r("update-status failed: %o",U),X("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Le(m){switch(m){case"blocked-col":return x;case"ready-col":return w;case"in-progress-col":return A;case"resolved-col":return M;case"deferred-col":return P;default:return[]}}function Ye(m,C,U){if(!o||!i)return;let G=Le(m),N=G.find(J=>J.id===C);if(!N)return;let _=G.filter(J=>J.id!==C),T=U.closest?U.closest(".board-card"):null,E=_.length;if(T){let J=T.getAttribute("data-issue-id");if(J===C)return;let fe=_.findIndex(H=>H.id===J);fe>=0&&(E=fe)}let I=_.slice();I.splice(E,0,N),y.applyReorder(C,I,E)}function Ze(){for(let m of Array.from(t.querySelectorAll(".board-column--drag-over")))m.classList.remove("board-column--drag-over")}let me=null;t.addEventListener("dragover",m=>{m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move");let U=m.target.closest(".board-column");U&&U!==me&&(me&&me.classList.remove("board-column--drag-over"),U.classList.add("board-column--drag-over"),me=U)}),t.addEventListener("dragleave",m=>{let C=m.relatedTarget;(!C||!t.contains(C))&&me&&(me.classList.remove("board-column--drag-over"),me=null)}),t.addEventListener("drop",m=>{m.preventDefault(),me&&(me.classList.remove("board-column--drag-over"),me=null);let C=m.target,U=C.closest(".board-column");if(!U)return;let G=m.dataTransfer?.getData("text/plain")||"";if(!G)return;let N=U.id,_=v.get(G);if(_&&_===N){if(Ei.has(N)){if(k!=="manual"){X("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ye(N,G,C)}return}let T=Ti[N];if(!T){X("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}b.get(G)!==T&&ye(G,T)}),t.addEventListener("keydown",m=>{let C=m.target;if(!(C instanceof HTMLElement))return;let U=String(C.tagName||"").toLowerCase();if(U==="input"||U==="textarea"||U==="select"||U==="button"||U==="a"||C.isContentEditable===!0)return;let G=C.closest(".board-card");if(!G)return;let N=String(m.key||"");if(N==="Enter"||N===" "){m.preventDefault();let I=G.getAttribute("data-issue-id");I&&n(I);return}if(N!=="ArrowUp"&&N!=="ArrowDown"&&N!=="ArrowLeft"&&N!=="ArrowRight")return;m.preventDefault();let _=G.closest(".board-column");if(!_)return;let T=Array.from(_.querySelectorAll(".board-card")),E=T.indexOf(G);if(N==="ArrowDown"&&E<T.length-1){xe(G,T[E+1]);return}if(N==="ArrowUp"&&E>0){xe(G,T[E-1]);return}if(N==="ArrowLeft"||N==="ArrowRight"){let I=Array.from(t.querySelectorAll(".board-column")),J=I.indexOf(_),fe=N==="ArrowRight"?1:-1,H=J+fe;for(;H>=0&&H<I.length;){let Oe=I[H].querySelector(".board-card");if(Oe){xe(G,Oe);return}H+=fe}}});function xe(m,C){try{m.tabIndex=-1,C.tabIndex=0,C.focus()}catch{}}let Ee=null;h&&h.subscribe&&(Ee=h.subscribe(()=>{try{be()}catch{}}));let De=null;return l&&l.subscribe&&(De=l.subscribe(()=>{try{be()}catch{}})),{async load(){r("load"),be()},clear(){he(),Ee&&(Ee(),Ee=null),De&&(De(),De=null),t.replaceChildren(),x=[],w=[],A=[],M=[],P=[],z=[],b=new Map,v=new Map}}}function Yr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Lt(t,e){return t.filter(r=>{let n=Yr(r);return!(n&&e.has(n))})}async function Ri(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function It(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Li={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ii=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Di=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ct(t){return!!t&&typeof t=="object"}function Vr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function xs(t,e){let r=Vr(t),n=Vr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Oi(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ct(s)&&typeof s.text=="string"?s.text:"").join(""):ct(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Mi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Li[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Vr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=xs(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=xs(ct(l)?l.old_string:"",ct(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ss(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ii.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Di.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ni(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ct(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ss(o.text));else if(o.type==="tool_use"){let i=Mi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ct(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Oi(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Pi(t){if(t.type==="item.completed"&&ct(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Ss(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Fi(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function As(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ct(o))continue;let i=Fi(o)?Pi(o):Ni(o,r);for(let l of i)e.push(l)}return e}function hr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function u(){if(!o||!n)return[];let v=n.get(o);return As(v?v.lines:[])}function h(v,$){if($.kind==="gate")return p`<div class="sv__gate">${$.text}</div>`;if($.kind==="phase")return p`<div class="sv__phase">${$.text}</div>`;if($.kind==="result")return p`<div
        class="sv__result${$.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${$.success?"\u2713":"\u2717"}
        ${$.text||($.success?"DONE":"\uC2E4\uD328")}
      </div>`;if($.kind==="error")return p`<div class="sv__error">⛔ ${$.text}</div>`;if($.kind==="blocker")return p`<div class="sv__error">⛔ ${$.text}</div>`;if($.kind==="tool"){let B=a.has(v),Y=$.tool==="Bash"?$.command:$.path||$.command||"";return p`<div
        class="sv__tool${B?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>M(v)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${$.icon}</span>
          <span class="sv__tool-name">${$.tool}</span>
          ${Y?p`<span class="sv__tool-detail">${Y}</span>`:""}
          ${typeof $.added=="number"?p`<span class="sv__diff-add">+${$.added}</span>`:""}
          ${typeof $.removed=="number"?p`<span class="sv__diff-del">−${$.removed}</span>`:""}
          ${$.result?p`<span class="sv__tool-ok">→ ${$.result}</span>`:""}
        </span>
        ${B?p`<pre class="sv__tool-expand">${y($)}</pre>`:""}
      </div>`}return p`<div class="sv__as">${$.text}</div>`}function y(v){let $=[];if(v.input!==void 0)try{$.push(`input: ${JSON.stringify(v.input,null,2)}`)}catch{}return typeof v.output=="string"&&v.output.length>0&&$.push(`output:
${v.output}`),$.join(`

`)}function x(){if(!o)return p``;let v=u(),$=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),B=i.session_id||"",Y=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return p`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${B?p`<button
              type="button"
              class="sv__session"
              title=${B}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${B}`}
              @click=${()=>z(B)}
            >
              ⧉ ${B.slice(0,8)}
            </button>`:""}
        ${$?p`<span class="sv__meta">${$}</span>`:""}
        ${i.worktree?p`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Y}
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${Y}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>b()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${v.length===0?p`<div class="sv__empty">세션 로그 없음</div>`:v.map((K,Q)=>h(Q,K))}
      </div>
    </div>`}function w(){le(x(),t),l&&A()}function A(){let v=t.querySelector(".sv__body");v&&(v.scrollTop=v.scrollHeight)}function M(v){a.has(v)?a.delete(v):a.add(v),w()}function P(){l=!l,w()}function z(v){It(v).then($=>{$?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function D(v){!o||!v||(i={...i,...v},w())}function R(v){let $=v.target;if(!$||!$.classList||!$.classList.contains("sv__body"))return;!($.scrollHeight-$.scrollTop-$.clientHeight<=4)&&l&&(l=!1,w())}t.addEventListener("scroll",R,!0);function k(v){let $=v&&v.attempt_id;$&&(o=$,i=v.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(w)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),w())}function b(){let v=o;o=null,a.clear(),r&&v&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${v}`})).catch(()=>{}),le(p``,t),s&&s()}return{open:k,updateMeta:D,close:b,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",R,!0),o=null,le(p``,t)}}}function Bi(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Ts(t,e){let r=Bi(t);return p`
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
  `}var Zr=["claude","codex","ccx"],Es={claude:["opus","sonnet","haiku","fable"],codex:["gpt-5.6","gpt-5.4"],ccx:["opus","sonnet","haiku","fable"]},Kr=["low","medium","high","xhigh"],Xr=["codex","opus","fable","self","skip"],Qr=["opus","fable","sonnet","haiku"],zi=["standard","fast_track"],Jr={worker_runner:"(\uAE30\uBCF8: claude)",orchestration_model:"(\uAE30\uBCF8: CLI \uAE30\uBCF8 \uBAA8\uB378)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Ht(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Jr[t]||"(\uAE30\uBCF8)"}function en(t){return Es[String(t||"claude")]||Es.claude}function Dt(t,e,r,n,s,o){return p`
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
  `}function Ot(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Cs(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.worker_runner||"",i=o||s.worker_runner||"claude",l=n.workflow_mode==="fast_track"?"fast_track":"standard";return p`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Dt("worker_runner","worker_runner",Ot(Zr,Ht("worker_runner",s)),o,!!o,e)}
    ${Dt("orchestration_model","orchestration_model",Ot(en(i),Ht("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${Dt("orchestration_effort","orchestration_effort",Ot(Kr,Ht("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${Dt("review_model","review_model",Ot(Xr,Ht("review_model",s)),n.review_model||"",!1,e)}
    ${Dt("impl_model","impl_model",Ot(Qr,Ht("impl_model",s)),n.impl_model||"",!1,e)}
    ${Dt("workflow_mode","workflow_mode",Ot(zi),l,n.workflow_mode==="fast_track",e)}
  `}var{entries:Fs,setPrototypeOf:Rs,isFrozen:qi,getPrototypeOf:Ui,getOwnPropertyDescriptor:Hi}=Object,{freeze:ze,seal:Ke,create:ln}=Object,{apply:cn,construct:dn}=typeof Reflect<"u"&&Reflect;ze||(ze=function(e){return e});Ke||(Ke=function(e){return e});cn||(cn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});dn||(dn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var mr=qe(Array.prototype.forEach),Wi=qe(Array.prototype.lastIndexOf),Ls=qe(Array.prototype.pop),Wt=qe(Array.prototype.push),Gi=qe(Array.prototype.splice),_r=qe(String.prototype.toLowerCase),tn=qe(String.prototype.toString),rn=qe(String.prototype.match),Gt=qe(String.prototype.replace),ji=qe(String.prototype.indexOf),Yi=qe(String.prototype.trim),Je=qe(Object.prototype.hasOwnProperty),Be=qe(RegExp.prototype.test),jt=Vi(TypeError);function qe(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return cn(t,e,n)}}function Vi(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return dn(t,r)}}function ne(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:_r;Rs&&Rs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(qi(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Zi(t){for(let e=0;e<t.length;e++)Je(t,e)||(t[e]=null);return t}function it(t){let e=ln(null);for(let[r,n]of Fs(t))Je(t,r)&&(Array.isArray(n)?e[r]=Zi(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=it(n):e[r]=n);return e}function Yt(t,e){for(;t!==null;){let n=Hi(t,e);if(n){if(n.get)return qe(n.get);if(typeof n.value=="function")return qe(n.value)}t=Ui(t)}function r(){return null}return r}var Is=ze(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),nn=ze(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),sn=ze(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ki=ze(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),on=ze(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Xi=ze(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ds=ze(["#text"]),Os=ze(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),an=ze(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ms=ze(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),gr=ze(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Qi=Ke(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ji=Ke(/<%[\w\W]*|[\w\W]*%>/gm),ea=Ke(/\$\{[\w\W]*/gm),ta=Ke(/^data-[\-\w.\u00B7-\uFFFF]+$/),ra=Ke(/^aria-[\-\w]+$/),Bs=Ke(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),na=Ke(/^(?:\w+script|data):/i),sa=Ke(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),zs=Ke(/^html$/i),oa=Ke(/^[a-z][.\w]*(-[.\w]+)+$/i),Ns=Object.freeze({__proto__:null,ARIA_ATTR:ra,ATTR_WHITESPACE:sa,CUSTOM_ELEMENT:oa,DATA_ATTR:ta,DOCTYPE_NAME:zs,ERB_EXPR:Ji,IS_ALLOWED_URI:Bs,IS_SCRIPT_OR_DATA:na,MUSTACHE_EXPR:Qi,TMPLIT_EXPR:ea}),Vt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ia=function(){return typeof window>"u"?null:window},aa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ps=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qs(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ia(),e=W=>qs(W);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Vt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:y,trustedTypes:x}=t,w=a.prototype,A=Yt(w,"cloneNode"),M=Yt(w,"remove"),P=Yt(w,"nextSibling"),z=Yt(w,"childNodes"),D=Yt(w,"parentNode");if(typeof i=="function"){let W=r.createElement("template");W.content&&W.content.ownerDocument&&(r=W.content.ownerDocument)}let R,k="",{implementation:b,createNodeIterator:v,createDocumentFragment:$,getElementsByTagName:B}=r,{importNode:Y}=n,K=Ps();e.isSupported=typeof Fs=="function"&&typeof D=="function"&&b&&b.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Q,ERB_EXPR:Ie,TMPLIT_EXPR:Fe,DATA_ATTR:Ce,ARIA_ATTR:Ve,IS_SCRIPT_OR_DATA:Ae,ATTR_WHITESPACE:be,CUSTOM_ELEMENT:$e}=Ns,{IS_ALLOWED_URI:He}=Ns,pe=null,Xe=ne({},[...Is,...nn,...sn,...on,...Ds]),ce=null,je=ne({},[...Os,...an,...Ms,...gr]),ie=Object.seal(ln(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ne=null,S=null,O=Object.seal(ln(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),V=!0,q=!0,de=!1,ee=!0,te=!1,he=!0,se=!1,Re=!1,_e=!1,Te=!1,ye=!1,Le=!1,Ye=!0,Ze=!1,me="user-content-",xe=!0,Ee=!1,De={},m=null,C=ne({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),U=null,G=ne({},["audio","video","img","source","image","track"]),N=null,_=ne({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),T="http://www.w3.org/1998/Math/MathML",E="http://www.w3.org/2000/svg",I="http://www.w3.org/1999/xhtml",J=I,fe=!1,H=null,Oe=ne({},[T,E,I],tn),wt=ne({},["mi","mo","mn","ms","mtext"]),vt=ne({},["annotation-xml"]),Ar=ne({},["title","style","font","a","script"]),nt=null,Mt=["application/xhtml+xml","text/html"],rr="text/html",f=null,g=null,Z=r.createElement("form"),j=function(d){return d instanceof RegExp||d instanceof Function},re=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(g&&g===d)){if((!d||typeof d!="object")&&(d={}),d=it(d),nt=Mt.indexOf(d.PARSER_MEDIA_TYPE)===-1?rr:d.PARSER_MEDIA_TYPE,f=nt==="application/xhtml+xml"?tn:_r,pe=Je(d,"ALLOWED_TAGS")?ne({},d.ALLOWED_TAGS,f):Xe,ce=Je(d,"ALLOWED_ATTR")?ne({},d.ALLOWED_ATTR,f):je,H=Je(d,"ALLOWED_NAMESPACES")?ne({},d.ALLOWED_NAMESPACES,tn):Oe,N=Je(d,"ADD_URI_SAFE_ATTR")?ne(it(_),d.ADD_URI_SAFE_ATTR,f):_,U=Je(d,"ADD_DATA_URI_TAGS")?ne(it(G),d.ADD_DATA_URI_TAGS,f):G,m=Je(d,"FORBID_CONTENTS")?ne({},d.FORBID_CONTENTS,f):C,Ne=Je(d,"FORBID_TAGS")?ne({},d.FORBID_TAGS,f):it({}),S=Je(d,"FORBID_ATTR")?ne({},d.FORBID_ATTR,f):it({}),De=Je(d,"USE_PROFILES")?d.USE_PROFILES:!1,V=d.ALLOW_ARIA_ATTR!==!1,q=d.ALLOW_DATA_ATTR!==!1,de=d.ALLOW_UNKNOWN_PROTOCOLS||!1,ee=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,te=d.SAFE_FOR_TEMPLATES||!1,he=d.SAFE_FOR_XML!==!1,se=d.WHOLE_DOCUMENT||!1,Te=d.RETURN_DOM||!1,ye=d.RETURN_DOM_FRAGMENT||!1,Le=d.RETURN_TRUSTED_TYPE||!1,_e=d.FORCE_BODY||!1,Ye=d.SANITIZE_DOM!==!1,Ze=d.SANITIZE_NAMED_PROPS||!1,xe=d.KEEP_CONTENT!==!1,Ee=d.IN_PLACE||!1,He=d.ALLOWED_URI_REGEXP||Bs,J=d.NAMESPACE||I,wt=d.MATHML_TEXT_INTEGRATION_POINTS||wt,vt=d.HTML_INTEGRATION_POINTS||vt,ie=d.CUSTOM_ELEMENT_HANDLING||{},d.CUSTOM_ELEMENT_HANDLING&&j(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ie.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&j(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ie.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),te&&(q=!1),ye&&(Te=!0),De&&(pe=ne({},Ds),ce=[],De.html===!0&&(ne(pe,Is),ne(ce,Os)),De.svg===!0&&(ne(pe,nn),ne(ce,an),ne(ce,gr)),De.svgFilters===!0&&(ne(pe,sn),ne(ce,an),ne(ce,gr)),De.mathMl===!0&&(ne(pe,on),ne(ce,Ms),ne(ce,gr))),d.ADD_TAGS&&(typeof d.ADD_TAGS=="function"?O.tagCheck=d.ADD_TAGS:(pe===Xe&&(pe=it(pe)),ne(pe,d.ADD_TAGS,f))),d.ADD_ATTR&&(typeof d.ADD_ATTR=="function"?O.attributeCheck=d.ADD_ATTR:(ce===je&&(ce=it(ce)),ne(ce,d.ADD_ATTR,f))),d.ADD_URI_SAFE_ATTR&&ne(N,d.ADD_URI_SAFE_ATTR,f),d.FORBID_CONTENTS&&(m===C&&(m=it(m)),ne(m,d.FORBID_CONTENTS,f)),xe&&(pe["#text"]=!0),se&&ne(pe,["html","head","body"]),pe.table&&(ne(pe,["tbody"]),delete Ne.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');R=d.TRUSTED_TYPES_POLICY,k=R.createHTML("")}else R===void 0&&(R=aa(x,s)),R!==null&&typeof k=="string"&&(k=R.createHTML(""));ze&&ze(d),g=d}},ke=ne({},[...nn,...sn,...Ki]),nr=ne({},[...on,...Xi]),Oo=function(d){let L=D(d);(!L||!L.tagName)&&(L={namespaceURI:J,tagName:"template"});let F=_r(d.tagName),ge=_r(L.tagName);return H[d.namespaceURI]?d.namespaceURI===E?L.namespaceURI===I?F==="svg":L.namespaceURI===T?F==="svg"&&(ge==="annotation-xml"||wt[ge]):!!ke[F]:d.namespaceURI===T?L.namespaceURI===I?F==="math":L.namespaceURI===E?F==="math"&&vt[ge]:!!nr[F]:d.namespaceURI===I?L.namespaceURI===E&&!vt[ge]||L.namespaceURI===T&&!wt[ge]?!1:!nr[F]&&(Ar[F]||!ke[F]):!!(nt==="application/xhtml+xml"&&H[d.namespaceURI]):!1},rt=function(d){Wt(e.removed,{element:d});try{D(d).removeChild(d)}catch{M(d)}},ut=function(d,L){try{Wt(e.removed,{attribute:L.getAttributeNode(d),from:L})}catch{Wt(e.removed,{attribute:null,from:L})}if(L.removeAttribute(d),d==="is")if(Te||ye)try{rt(L)}catch{}else try{L.setAttribute(d,"")}catch{}},Tn=function(d){let L=null,F=null;if(_e)d="<remove></remove>"+d;else{let Se=rn(d,/^[\r\n\t ]+/);F=Se&&Se[0]}nt==="application/xhtml+xml"&&J===I&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");let ge=R?R.createHTML(d):d;if(J===I)try{L=new y().parseFromString(ge,nt)}catch{}if(!L||!L.documentElement){L=b.createDocument(J,"template",null);try{L.documentElement.innerHTML=fe?k:ge}catch{}}let Pe=L.body||L.documentElement;return d&&F&&Pe.insertBefore(r.createTextNode(F),Pe.childNodes[0]||null),J===I?B.call(L,se?"html":"body")[0]:se?L.documentElement:Pe},En=function(d){return v.call(d.ownerDocument||d,d,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Tr=function(d){return d instanceof h&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof u)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function")},Cn=function(d){return typeof l=="function"&&d instanceof l};function st(W,d,L){mr(W,F=>{F.call(e,d,L,g)})}let Rn=function(d){let L=null;if(st(K.beforeSanitizeElements,d,null),Tr(d))return rt(d),!0;let F=f(d.nodeName);if(st(K.uponSanitizeElement,d,{tagName:F,allowedTags:pe}),he&&d.hasChildNodes()&&!Cn(d.firstElementChild)&&Be(/<[/\w!]/g,d.innerHTML)&&Be(/<[/\w!]/g,d.textContent)||d.nodeType===Vt.progressingInstruction||he&&d.nodeType===Vt.comment&&Be(/<[/\w]/g,d.data))return rt(d),!0;if(!(O.tagCheck instanceof Function&&O.tagCheck(F))&&(!pe[F]||Ne[F])){if(!Ne[F]&&In(F)&&(ie.tagNameCheck instanceof RegExp&&Be(ie.tagNameCheck,F)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(F)))return!1;if(xe&&!m[F]){let ge=D(d)||d.parentNode,Pe=z(d)||d.childNodes;if(Pe&&ge){let Se=Pe.length;for(let We=Se-1;We>=0;--We){let ot=A(Pe[We],!0);ot.__removalCount=(d.__removalCount||0)+1,ge.insertBefore(ot,P(d))}}}return rt(d),!0}return d instanceof a&&!Oo(d)||(F==="noscript"||F==="noembed"||F==="noframes")&&Be(/<\/no(script|embed|frames)/i,d.innerHTML)?(rt(d),!0):(te&&d.nodeType===Vt.text&&(L=d.textContent,mr([Q,Ie,Fe],ge=>{L=Gt(L,ge," ")}),d.textContent!==L&&(Wt(e.removed,{element:d.cloneNode()}),d.textContent=L)),st(K.afterSanitizeElements,d,null),!1)},Ln=function(d,L,F){if(Ye&&(L==="id"||L==="name")&&(F in r||F in Z))return!1;if(!(q&&!S[L]&&Be(Ce,L))){if(!(V&&Be(Ve,L))){if(!(O.attributeCheck instanceof Function&&O.attributeCheck(L,d))){if(!ce[L]||S[L]){if(!(In(d)&&(ie.tagNameCheck instanceof RegExp&&Be(ie.tagNameCheck,d)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(d))&&(ie.attributeNameCheck instanceof RegExp&&Be(ie.attributeNameCheck,L)||ie.attributeNameCheck instanceof Function&&ie.attributeNameCheck(L,d))||L==="is"&&ie.allowCustomizedBuiltInElements&&(ie.tagNameCheck instanceof RegExp&&Be(ie.tagNameCheck,F)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(F))))return!1}else if(!N[L]){if(!Be(He,Gt(F,be,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&d!=="script"&&ji(F,"data:")===0&&U[d])){if(!(de&&!Be(Ae,Gt(F,be,"")))){if(F)return!1}}}}}}}return!0},In=function(d){return d!=="annotation-xml"&&rn(d,$e)},Dn=function(d){st(K.beforeSanitizeAttributes,d,null);let{attributes:L}=d;if(!L||Tr(d))return;let F={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ce,forceKeepAttr:void 0},ge=L.length;for(;ge--;){let Pe=L[ge],{name:Se,namespaceURI:We,value:ot}=Pe,$t=f(Se),Er=ot,Me=Se==="value"?Er:Yi(Er);if(F.attrName=$t,F.attrValue=Me,F.keepAttr=!0,F.forceKeepAttr=void 0,st(K.uponSanitizeAttribute,d,F),Me=F.attrValue,Ze&&($t==="id"||$t==="name")&&(ut(Se,d),Me=me+Me),he&&Be(/((--!?|])>)|<\/(style|title|textarea)/i,Me)){ut(Se,d);continue}if($t==="attributename"&&rn(Me,"href")){ut(Se,d);continue}if(F.forceKeepAttr)continue;if(!F.keepAttr){ut(Se,d);continue}if(!ee&&Be(/\/>/i,Me)){ut(Se,d);continue}te&&mr([Q,Ie,Fe],Mn=>{Me=Gt(Me,Mn," ")});let On=f(d.nodeName);if(!Ln(On,$t,Me)){ut(Se,d);continue}if(R&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!We)switch(x.getAttributeType(On,$t)){case"TrustedHTML":{Me=R.createHTML(Me);break}case"TrustedScriptURL":{Me=R.createScriptURL(Me);break}}if(Me!==Er)try{We?d.setAttributeNS(We,Se,Me):d.setAttribute(Se,Me),Tr(d)?rt(d):Ls(e.removed)}catch{ut(Se,d)}}st(K.afterSanitizeAttributes,d,null)},Mo=function W(d){let L=null,F=En(d);for(st(K.beforeSanitizeShadowDOM,d,null);L=F.nextNode();)st(K.uponSanitizeShadowNode,L,null),Rn(L),Dn(L),L.content instanceof o&&W(L.content);st(K.afterSanitizeShadowDOM,d,null)};return e.sanitize=function(W){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,F=null,ge=null,Pe=null;if(fe=!W,fe&&(W="<!-->"),typeof W!="string"&&!Cn(W))if(typeof W.toString=="function"){if(W=W.toString(),typeof W!="string")throw jt("dirty is not a string, aborting")}else throw jt("toString is not a function");if(!e.isSupported)return W;if(Re||re(d),e.removed=[],typeof W=="string"&&(Ee=!1),Ee){if(W.nodeName){let ot=f(W.nodeName);if(!pe[ot]||Ne[ot])throw jt("root node is forbidden and cannot be sanitized in-place")}}else if(W instanceof l)L=Tn("<!---->"),F=L.ownerDocument.importNode(W,!0),F.nodeType===Vt.element&&F.nodeName==="BODY"||F.nodeName==="HTML"?L=F:L.appendChild(F);else{if(!Te&&!te&&!se&&W.indexOf("<")===-1)return R&&Le?R.createHTML(W):W;if(L=Tn(W),!L)return Te?null:Le?k:""}L&&_e&&rt(L.firstChild);let Se=En(Ee?W:L);for(;ge=Se.nextNode();)Rn(ge),Dn(ge),ge.content instanceof o&&Mo(ge.content);if(Ee)return W;if(Te){if(ye)for(Pe=$.call(L.ownerDocument);L.firstChild;)Pe.appendChild(L.firstChild);else Pe=L;return(ce.shadowroot||ce.shadowrootmode)&&(Pe=Y.call(n,Pe,!0)),Pe}let We=se?L.outerHTML:L.innerHTML;return se&&pe["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&Be(zs,L.ownerDocument.doctype.name)&&(We="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+We),te&&mr([Q,Ie,Fe],ot=>{We=Gt(We,ot," ")}),R&&Le?R.createHTML(We):We},e.setConfig=function(){let W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};re(W),Re=!0},e.clearConfig=function(){g=null,Re=!1},e.isValidAttribute=function(W,d,L){g||re({});let F=f(W),ge=f(d);return Ln(F,ge,L)},e.addHook=function(W,d){typeof d=="function"&&Wt(K[W],d)},e.removeHook=function(W,d){if(d!==void 0){let L=Wi(K[W],d);return L===-1?void 0:Gi(K[W],L,1)[0]}return Ls(K[W])},e.removeHooks=function(W){K[W]=[]},e.removeAllHooks=function(){K=Ps()},e}var Us=qs();var Hs={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ws=t=>(...e)=>({_$litDirective$:t,values:e}),br=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Zt=class extends br{constructor(e){if(super(e),this.it=ve,e.type!==Hs.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ve||e==null)return this._t=void 0,this.it=e;if(e===mt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Zt.directiveName="unsafeHTML",Zt.resultType=1;var Gs=Ws(Zt);function hn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kt=hn();function Qs(t){kt=t}var Jt={exec:()=>null};function oe(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Ue.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var la=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ue={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},ca=/^(?:[ \t]*(?:\n|$))+/,da=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ua=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,er=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,pa=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,mn=/(?:[*+-]|\d{1,9}[.)])/,Js=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,eo=oe(Js).replace(/bull/g,mn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),fa=oe(Js).replace(/bull/g,mn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),gn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ha=/^[^\n]+/,_n=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ma=oe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",_n).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ga=oe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,mn).getRegex(),xr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",bn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,_a=oe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",bn).replace("tag",xr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),to=oe(gn).replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex(),ba=oe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",to).getRegex(),yn={blockquote:ba,code:da,def:ma,fences:ua,heading:pa,hr:er,html:_a,lheading:eo,list:ga,newline:ca,paragraph:to,table:Jt,text:ha},js=oe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex(),ya={...yn,lheading:fa,table:js,paragraph:oe(gn).replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",js).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex()},ka={...yn,html:oe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",bn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Jt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:oe(gn).replace("hr",er).replace("heading",` *#{1,6} *[^
]`).replace("lheading",eo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},wa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,va=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ro=/^( {2,}|\\)\n(?!\s*$)/,$a=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Sr=/[\p{P}\p{S}]/u,kn=/[\s\p{P}\p{S}]/u,no=/[^\s\p{P}\p{S}]/u,xa=oe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,kn).getRegex(),so=/(?!~)[\p{P}\p{S}]/u,Sa=/(?!~)[\s\p{P}\p{S}]/u,Aa=/(?:[^\s\p{P}\p{S}]|~)/u,Ta=oe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",la?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),oo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ea=oe(oo,"u").replace(/punct/g,Sr).getRegex(),Ca=oe(oo,"u").replace(/punct/g,so).getRegex(),io="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ra=oe(io,"gu").replace(/notPunctSpace/g,no).replace(/punctSpace/g,kn).replace(/punct/g,Sr).getRegex(),La=oe(io,"gu").replace(/notPunctSpace/g,Aa).replace(/punctSpace/g,Sa).replace(/punct/g,so).getRegex(),Ia=oe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,no).replace(/punctSpace/g,kn).replace(/punct/g,Sr).getRegex(),Da=oe(/\\(punct)/,"gu").replace(/punct/g,Sr).getRegex(),Oa=oe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ma=oe(bn).replace("(?:-->|$)","-->").getRegex(),Na=oe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ma).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),wr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Pa=oe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",wr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ao=oe(/^!?\[(label)\]\[(ref)\]/).replace("label",wr).replace("ref",_n).getRegex(),lo=oe(/^!?\[(ref)\](?:\[\])?/).replace("ref",_n).getRegex(),Fa=oe("reflink|nolink(?!\\()","g").replace("reflink",ao).replace("nolink",lo).getRegex(),Ys=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,wn={_backpedal:Jt,anyPunctuation:Da,autolink:Oa,blockSkip:Ta,br:ro,code:va,del:Jt,emStrongLDelim:Ea,emStrongRDelimAst:Ra,emStrongRDelimUnd:Ia,escape:wa,link:Pa,nolink:lo,punctuation:xa,reflink:ao,reflinkSearch:Fa,tag:Na,text:$a,url:Jt},Ba={...wn,link:oe(/^!?\[(label)\]\((.*?)\)/).replace("label",wr).getRegex(),reflink:oe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",wr).getRegex()},un={...wn,emStrongRDelimAst:La,emStrongLDelim:Ca,url:oe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ys).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:oe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ys).getRegex()},za={...un,br:oe(ro).replace("{2,}","*").getRegex(),text:oe(un.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},yr={normal:yn,gfm:ya,pedantic:ka},Kt={normal:wn,gfm:un,breaks:za,pedantic:Ba},qa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Vs=t=>qa[t];function at(t,e){if(e){if(Ue.escapeTest.test(t))return t.replace(Ue.escapeReplace,Vs)}else if(Ue.escapeTestNoEncode.test(t))return t.replace(Ue.escapeReplaceNoEncode,Vs);return t}function Zs(t){try{t=encodeURI(t).replace(Ue.percentDecode,"%")}catch{return null}return t}function Ks(t,e){let r=t.replace(Ue.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Ue.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ue.slashPipe,"|");return n}function Xt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Ua(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Xs(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Ha(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var vr=class{constructor(t){ue(this,"options");ue(this,"rules");ue(this,"lexer");this.options=t||kt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Xt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Ha(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Xt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Xt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Xt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${u}`:u;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=h,r.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let x=y,w=x.raw+`
`+r.join(`
`),A=this.blockquote(w);o[o.length-1]=A,n=n.substring(0,n.length-x.raw.length)+A.raw,s=s.substring(0,s.length-x.text.length)+A.text;break}else if(y?.type==="list"){let x=y,w=x.raw+`
`+r.join(`
`),A=this.list(w);o[o.length-1]=A,n=n.substring(0,n.length-y.raw.length)+A.raw,s=s.substring(0,s.length-x.raw.length)+A.raw,r=w.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",u="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,A=>" ".repeat(3*A.length)),y=t.split(`
`,1)[0],x=!h.trim(),w=0;if(this.options.pedantic?(w=2,u=h.trimStart()):x?w=e[1].length+1:(w=e[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,u=h.slice(w),w+=e[1].length),x&&this.rules.other.blankLine.test(y)&&(c+=y+`
`,t=t.substring(y.length+1),a=!0),!a){let A=this.rules.other.nextBulletRegex(w),M=this.rules.other.hrRegex(w),P=this.rules.other.fencesBeginRegex(w),z=this.rules.other.headingBeginRegex(w),D=this.rules.other.htmlBeginRegex(w);for(;t;){let R=t.split(`
`,1)[0],k;if(y=R,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),k=y):k=y.replace(this.rules.other.tabCharGlobal,"    "),P.test(y)||z.test(y)||D.test(y)||A.test(y)||M.test(y))break;if(k.search(this.rules.other.nonSpaceChar)>=w||!y.trim())u+=`
`+k.slice(w);else{if(x||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||P.test(h)||z.test(h)||M.test(h))break;u+=`
`+y}!x&&!y.trim()&&(x=!0),c+=R+`
`,t=t.substring(R.length+1),h=k.slice(w)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=u.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),u=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=u}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Ks(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Ks(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Xt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ua(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Xs(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Xs(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...n[0]][0].length,h=t.slice(0,s+n.index+u+i);if(Math.min(s,i)%2){let x=h.slice(1,-1);return{type:"em",raw:h,text:x,tokens:this.lexer.inlineTokens(x)}}let y=h.slice(2,-2);return{type:"strong",raw:h,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},et=class pn{constructor(e){ue(this,"tokens");ue(this,"options");ue(this,"state");ue(this,"inlineQueue");ue(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||kt,this.options.tokenizer=this.options.tokenizer||new vr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ue,block:yr.normal,inline:Kt.normal};this.options.pedantic?(r.block=yr.pedantic,r.inline=Kt.pedantic):this.options.gfm&&(r.block=yr.gfm,this.options.breaks?r.inline=Kt.breaks:r.inline=Kt.gfm),this.tokenizer.rules=r}static get rules(){return{block:yr,inline:Kt}}static lex(e,r){return new pn(r).lex(e)}static lexInline(e,r){return new pn(r).inlineTokens(e)}lex(e){e=e.replace(Ue.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(Ue.tabCharGlobal,"    ").replace(Ue.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,h=e.slice(1),y;this.options.extensions.startInline.forEach(x=>{y=x.call({lexer:this},h),typeof y=="number"&&y>=0&&(u=Math.min(u,y))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},$r=class{constructor(t){ue(this,"options");ue(this,"parser");this.options=t||kt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Ue.notSpaceStart)?.[0],s=t.replace(Ue.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${at(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Zs(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+at(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Zs(t);if(s===null)return at(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${at(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:at(t.text)}},vn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},tt=class fn{constructor(e){ue(this,"options");ue(this,"renderer");ue(this,"textRenderer");this.options=e||kt,this.options.renderer=this.options.renderer||new $r,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vn}static parse(e,r){return new fn(r).parse(e)}static parseInline(e,r){return new fn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},kr,Qt=(kr=class{constructor(t){ue(this,"options");ue(this,"block");this.options=t||kt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?et.lex:et.lexInline}provideParser(){return this.block?tt.parse:tt.parseInline}},ue(kr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ue(kr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),kr),Wa=class{constructor(...t){ue(this,"defaults",hn());ue(this,"options",this.setOptions);ue(this,"parse",this.parseMarkdown(!0));ue(this,"parseInline",this.parseMarkdown(!1));ue(this,"Parser",tt);ue(this,"Renderer",$r);ue(this,"TextRenderer",vn);ue(this,"Lexer",et);ue(this,"Tokenizer",vr);ue(this,"Hooks",Qt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new $r(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new vr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Qt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Qt.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Qt.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let u=l.call(s,c);return a.call(s,u)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return et.lex(t,e??this.defaults)}parser(t,e){return tt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?et.lex:et.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?tt.parse:tt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?et.lex:et.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?tt.parse:tt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+at(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},yt=new Wa;function ae(t,e){return yt.parse(t,e)}ae.options=ae.setOptions=function(t){return yt.setOptions(t),ae.defaults=yt.defaults,Qs(ae.defaults),ae};ae.getDefaults=hn;ae.defaults=kt;ae.use=function(...t){return yt.use(...t),ae.defaults=yt.defaults,Qs(ae.defaults),ae};ae.walkTokens=function(t,e){return yt.walkTokens(t,e)};ae.parseInline=yt.parseInline;ae.Parser=tt;ae.parser=tt.parse;ae.Renderer=$r;ae.TextRenderer=vn;ae.Lexer=et;ae.lexer=et.lex;ae.Tokenizer=vr;ae.Hooks=Qt;ae.parse=ae;var Oc=ae.options,Mc=ae.setOptions,Nc=ae.use,Pc=ae.walkTokens,Fc=ae.parseInline;var Bc=tt.parse,zc=et.lex;function co(t){let e=ae.parse(t),r=Us.sanitize(e);return Gs(r)}function Ga(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function uo(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(w){w.key==="Escape"&&s&&(w.preventDefault(),y())}document.addEventListener("keydown",a);function c(){return s?p`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>y()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ga(s)}</span
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
            ${o==="loading"?p`<div class="mv__status">불러오는 중…</div>`:o==="error"?p`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:co(i)}
          </div>
        </div>
      </div>
    `:p``}function u(){le(c(),t)}async function h(w){s=w,o="loading",i="",l="",u();let A=r?r():"";if(!A){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",u();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",u();return}let M="/api/doc?workspace="+encodeURIComponent(A)+"&path="+encodeURIComponent(w);try{let P=await n(M),z=await P.json().catch(()=>({}));if(!P.ok||!z||z.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(z&&z.error||P.status)+")",u();return}i=String(z.content||""),o="ready",u()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",u()}}function y(){s=null,le(p``,t)}function x(){document.removeEventListener("keydown",a),y()}return{open:h,close:y,destroy:x}}var ja={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ya(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function po(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return p`
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
                >${ja[o.status||""]||"\xB7"}</span
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
                >${Ya(o.started_at)}</span
              >
            </button>
            ${s(o)}
          </div>`)}
    </div>
  `}var Va=["open","in_progress","deferred","resolved","closed"],Za=[0,1,2,3,4];function fo(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,u={},h=!1,y=!1,x="",w="",A="";function M(){h=!1,y=!1,x="",w="",A=""}let P=document.createElement("div");P.className="md-viewer-root",document.body.appendChild(P);let z=uo(P,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),D=document.createElement("div");D.className="session-log-root",document.body.appendChild(D);let R=hr(D,{transport:s?(_,T)=>Promise.resolve(s(_,T)):void 0,sessionLogStore:l});function k(){if(!i||!a)return[];let _=i.get();return(_&&_.attempts?Object.values(_.attempts):[]).filter(E=>E&&E.bead_id===a).sort((E,I)=>(I.started_at||0)-(E.started_at||0)).map(E=>({attempt_id:E.attempt_id,bead_id:E.bead_id,status:E.status,started_at:typeof E.started_at=="number"?E.started_at:null,runner:E.runner||null,model:E.model||null,session_id:E.session_id||null,resumed_from:E.resumed_from||null}))}function b(_){let T=i?i.get():null,E=T&&T.attempts?T.attempts[_]:null;R.open({attempt_id:_,meta:E?{runner:E.runner||void 0,model:E.model||void 0,effort:E.effort||void 0,status:E.status||void 0,session_id:E.session_id||void 0}:{}})}function v(_){!s||!_||Promise.resolve(s("worker-attempt-resume",{attempt_id:_})).then(T=>{let E=T;E&&E.resumed===!1&&E.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${E.reason}`,"error",2400)})}let $={onOpen:b,onResume:v};function B(){let _=i?i.get():null,T=_&&_.exec_defaults;return T&&typeof T=="object"?T:{}}let Y=null;r&&r.subscribe&&(Y=r.subscribe(()=>Ie()));let K=null;i&&typeof i.subscribe=="function"&&(K=i.subscribe(()=>{a&&N()}));function Q(_){_.key==="Escape"&&a&&(_.preventDefault(),n())}document.addEventListener("keydown",Q);function Ie(){if(a){if(r&&typeof r.snapshotFor=="function"){let _=r.snapshotFor("detail:"+a)||[];c=_.find(E=>E&&E.id===a)||_[0]||c}N()}}function Fe(_){It(_).then(T=>{T?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ce(_){_.preventDefault(),_.stopPropagation(),a&&Fe(a)}function Ve(_,T){_.preventDefault(),_.stopPropagation(),Fe(T)}function Ae(_,T){_.preventDefault(),_.stopPropagation(),z.open(T)}function be(_,T){u[_]=T,N(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:_,value:T})).catch(()=>{X("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function $e(_,T,E){if(!s||!a)return!1;try{let I=await Promise.resolve(s(_,T)),J=Array.isArray(I)?I[0]:I;return J&&typeof J=="object"&&J.id?(c=J,!0):(X(E,"error"),!1)}catch{return X(E,"error"),!1}}function He(_){setTimeout(()=>{try{let T=t.querySelector(_);T&&typeof T.focus=="function"&&T.focus()}catch{}},0)}function pe(){h=!0,x=c&&c.title||"",N(),He('.detail-edit__input[data-edit="title"]')}function Xe(_){x=_.target.value}function ce(){h=!1,x="",N()}function je(){$e("edit-text",{id:a,field:"title",value:x},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(T=>{T&&(h=!1,x=""),N()})}function ie(){y=!0,w=c&&c.description||"",N(),He('.detail-edit__textarea[data-edit="description"]')}function Ne(_){w=_.target.value}function S(){y=!1,w="",N()}function O(){$e("edit-text",{id:a,field:"description",value:w},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(T=>{T&&(y=!1,w=""),N()})}function V(_,T,E,I){if(_.key==="Escape"){_.stopPropagation(),E();return}_.key==="Enter"&&(!I||_.ctrlKey||_.metaKey)&&(_.preventDefault(),T())}function q(_){let T=_.target.value;$e("update-status",{id:a,status:T},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>N())}function de(_){let T=Number(_.target.value);$e("update-priority",{id:a,priority:T},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>N())}function ee(_){A=_.target.value}function te(){let _=A.trim();_.length!==0&&$e("label-add",{id:a,label:_},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(T=>{T&&(A=""),N()})}function he(_){if(_.key==="Escape"){_.stopPropagation(),A="",N();return}_.key==="Enter"&&(_.preventDefault(),te())}function se(_){$e("label-remove",{id:a,label:_},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>N())}let Re={onCopyPath:Ve,onOpenDoc:Ae},_e={onChange:be};function Te(_){return typeof _=="string"?_:_&&typeof _=="object"?String(_.id||_.to||_.issue_id||_.depends_on||""):""}function ye(_){switch(_&&typeof _=="object"?String(_.dependency_type||_.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Le(_){let E=(Array.isArray(_.dependencies)?_.dependencies:[]).map(I=>({id:Te(I),icon:ye(I)})).filter(I=>I.id.length>0);return p`
      <div class="detail-section-label">의존성</div>
      ${E.length===0?p`<div class="detail-empty">의존성 없음</div>`:p`<div class="detail-deps">
            ${E.map(I=>o?p`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(I.id)}
                  >
                    ${I.icon?`${I.icon} `:""}${I.id}
                  </button>`:p`<span class="detail-dep"
                    >${I.icon?`${I.icon} `:""}${I.id}</span
                  >`)}
          </div>`}
    `}function Ye(_){let T=_.metadata||{},E=_.workflow||{},I=E.stages||{},J=I.spec&&I.spec.stale,fe=I.impl&&I.impl.stale,H=E.route_source==="derived",Oe=E.route||T.route||"\u2014";return p`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${H?" detail-kv__v--derived":""}"
          title=${H?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${H&&E.route?`${Oe} ? (\uCD94\uB860)`:Oe}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${T.spec_review||"\uC5C6\uC74C"}${J?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${T.impl_review||"\uC5C6\uC74C"}${fe?" \xB7 stale":""}</span
        >
      </div>
      ${T.pr_url?p`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${T.pr_url}</span>
          </div>`:""}
    `}let Ze={route:["spec_backed","full_plan"],merge_policy:["auto_merge","pr_stop"],drift_policy:["auto_rereview","halt"]};async function me(_,T){let E=T.target.value;if(_==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&E!=="full_plan"&&!window.confirm(`full_plan \u2192 ${E||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){N();return}await $e("update-workflow-meta",{id:a,key:_,value:E},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),N()}function xe(_){let T=_.metadata||{},E=(I,J)=>{let fe=Ze[I],H=typeof T[I]=="string"?T[I]:"";return p`<div class="detail-kv">
        <span class="detail-kv__k">${I}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${I}
          data-edit=${`wfmeta-${I}`}
          @change=${Oe=>me(I,Oe)}
        >
          <option value="" ?selected=${!fe.includes(H)}>
            ${J}
          </option>
          ${fe.map(Oe=>p`<option value=${Oe} ?selected=${H===Oe}>${Oe}</option>`)}
        </select>
      </div>`};return p`
      ${E("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")}
      ${E("merge_policy","(\uAE30\uBCF8 auto_merge)")}
      ${E("drift_policy","(\uAE30\uBCF8 auto_rereview)")}
    `}function Ee(_){return h?p`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${x}
            @input=${Xe}
            @keydown=${T=>V(T,je,ce,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${je}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${ce}
            >
              취소
            </button>
          </div>
        </div>
      `:p`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${_}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${pe}
        >
          ✎
        </button>
      </div>
    `}function De(_){let T=Rt(_.created_at),E=Rt(_.updated_at);return!T&&!E?p``:p`
      ${T?p`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
      ${E?p`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
    `}function m(_,T){return p`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${q}
        >
          ${Va.map(E=>p`<option value=${E} ?selected=${E===_}>${E}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${de}
        >
          ${Za.map(E=>p`<option value=${String(E)} ?selected=${E===T}>
                P${E}
              </option>`)}
        </select>
      </div>
    `}function C(_){return p`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${y?"":p`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ie}
            >
              ✎
            </button>`}
      </div>
      ${y?p`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${w}
              @input=${Ne}
              @keydown=${T=>V(T,O,S,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${O}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${S}
              >
                취소
              </button>
            </div>
          </div>`:p`<div class="detail-overlay__desc">
            ${_||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function U(_){let T=Array.isArray(_.labels)?_.labels:[];return p`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${T.map(E=>p`<span class="detail-label-chip"
              >${E}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${E}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+E}
                @click=${()=>se(E)}
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
            @input=${ee}
            @keydown=${he}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${te}
          >
            추가
          </button>
        </span>
      </div>
    `}function G(){if(!a)return p``;let _=c||{},T=String(_.id||a),E=_.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",I=_.status||"open",J=typeof _.priority=="number"?Math.max(0,Math.min(4,_.priority)):"",fe=_.description||"",H={..._,metadata:{..._.metadata||{},...u}};return p`
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
            @click=${Ce}
          >
            ${T}
          </button>
          ${Ee(E)} ${m(I,J)}
          ${De(_)} ${C(fe)}
          ${U(_)} ${Le(_)}
          ${Ye(_)} ${xe(_)}
          ${Ts(_,Re)}
          ${Cs(H,_e,B())}
          ${po(k(),$)}
        </div>
      </div>
    `}function N(){le(G(),t)}return{load(_){_!==a&&(u={},M()),a=_,c=null,Ie()},clear(){a=null,c=null,u={},M(),z.close(),R.close(),le(p``,t)},destroy(){Y&&(Y(),Y=null),K&&(K(),K=null),document.removeEventListener("keydown",Q),z.destroy(),P.parentNode&&P.parentNode.removeChild(P),R.destroy(),D.parentNode&&D.parentNode.removeChild(D),a=null,c=null,le(p``,t)}}}var Ka=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ho(t,e){return Wr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Xa(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function mo(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(b){let v=r.get();if(v)try{let $=await n("display-policy-set",{expected_revision:v.revision,policy:b(v)});a($),$&&$.conflict&&$.policy&&($=await n("display-policy-set",{expected_revision:$.policy.revision,policy:b($.policy)}),a($)),$&&$.conflict&&X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(b){b&&b.policy&&typeof b.policy=="object"&&r.set(b.policy)}function c(b){let v=r.get();if(!v)return;let $=ho(b,v)!=="shown";l(B=>Xa(b,B,$))}function u(){let b=i.trim();b.length!==0&&(i="",l(v=>v.hidden_prefixes.includes(b)?{hidden_prefixes:v.hidden_prefixes}:{hidden_prefixes:[...v.hidden_prefixes,b]}),M())}function h(b){l(v=>({hidden_prefixes:v.hidden_prefixes.filter($=>$!==b)}))}function y(b){let v=r.get();if(!v)return;let $=v.chips[b]===!1;l(()=>({chips:{[b]:$}}))}function x(b){let v=s();return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${v.length===0?p`<div class="display-settings__empty">라벨 없음</div>`:p`<div class="display-settings__pills">
              ${v.map($=>{let B=ho($,b);return p`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${B}`}
                  data-label=${$}
                  data-state=${B}
                  @click=${()=>c($)}
                >
                  ${$}
                </button>`})}
            </div>`}
      </section>
    `}function w(b){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${b.hidden_prefixes.map(v=>p`<span class="display-settings__prefix">
                ${v}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${v} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h(v)}
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
            @input=${v=>{i=String(v.target.value||"")}}
          />
          <button type="button" @click=${u}>추가</button>
        </div>
      </section>
    `}function A(b){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Ka.map(([v,$])=>p`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${v}
                  .checked=${b.chips[v]!==!1}
                  @change=${()=>y(v)}
                />
                <span>${$}</span>
              </label>`)}
        </div>
      </section>
    `}function M(){let b=r.get();le(p`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${k}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${b?p`${x(b)} ${w(b)}
                ${A(b)}`:p`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let P=!1,z=()=>{P=!1};o.addEventListener("close",z),o.addEventListener("cancel",z);let D=null;r.subscribe&&(D=r.subscribe(()=>{P&&M()}));function R(){P||(i="",P=!0,M(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function k(){P&&(P=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:R,close:k,destroy(){P=!1,o.removeEventListener("close",z),o.removeEventListener("cancel",z),D&&(D(),D=null),o.remove()}}}function go(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,u,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let y=typeof h=="string"?h.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function _o(t,e,r){let n=we("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return p`
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
    `}function l(){le(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),le(p``,t)}}}var bo=["bug","feature","task","epic","chore"];function yo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ko=["Critical","High","Medium","Low","Backlog"];function wo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),u=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),y=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let k=document.createElement("option");k.value="",k.textContent="\u2014 Select \u2014",o.appendChild(k);for(let b of bo){let v=document.createElement("option");v.value=b,v.textContent=yo(b),o.appendChild(v)}i.replaceChildren();for(let b=0;b<=4;b+=1){let v=document.createElement("option");v.value=String(b);let $=ko[b]||"Medium";v.textContent=`${b} \u2013 ${$}`,i.appendChild(v)}}x();function w(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function A(k){s.disabled=k,o.disabled=k,i.disabled=k,l.disabled=k,a.disabled=k,u.disabled=k,h.disabled=k,h.textContent=k?"Creating\u2026":"Create"}function M(){c.textContent=""}function P(k){c.textContent=k}function z(){try{let k=window.localStorage.getItem("beads-ui.new.type");k?o.value=k:o.value="";let b=window.localStorage.getItem("beads-ui.new.priority");b&&/^\d$/.test(b)?i.value=b:i.value="2"}catch{o.value="",i.value="2"}}function D(){let k=o.value||"",b=i.value||"";k.length>0&&window.localStorage.setItem("beads-ui.new.type",k),b.length>0&&window.localStorage.setItem("beads-ui.new.priority",b)}async function R(){M();let k=String(s.value||"").trim();if(k.length===0){P("Title is required"),s.focus();return}let b=Number(i.value||"2");if(!(b>=0&&b<=4)){P("Priority must be 0..4"),i.focus();return}let v=String(o.value||""),$=String(a.value||""),B={title:k};v.length>0&&(B.type=v),String(b).length>0&&(B.priority=b),$.length>0&&(B.description=$),A(!0);try{await e("create-issue",B)}catch{A(!1),P("Failed to create issue");return}D(),A(!1),w()}return r.addEventListener("cancel",k=>{k.preventDefault(),w()}),y.addEventListener("click",()=>w()),u.addEventListener("click",()=>w()),r.addEventListener("keydown",k=>{k.key==="Enter"&&(k.ctrlKey||k.metaKey)&&(k.preventDefault(),R())}),n.addEventListener("submit",k=>{k.preventDefault(),R()}),{open(){n.reset(),M(),z();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){w()}}}var Qa=[{key:"worker_runner",values:()=>Zr},{key:"orchestration_model",values:t=>en(t)},{key:"orchestration_effort",values:()=>Kr},{key:"review_model",values:()=>Xr},{key:"impl_model",values:()=>Qr}],Ja=[{key:"merge_policy",values:["auto_merge","pr_stop"],default_label:"(\uAE30\uBCF8 auto_merge)"},{key:"drift_policy",values:["auto_rereview","halt"],default_label:"(\uAE30\uBCF8 auto_rereview)"}];function vo(t,e){let{queueStore:r,transport:n}=e,s=document.createElement("dialog");s.id="worker-exec-defaults-dialog",s.className="exec-defaults",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),t.appendChild(s);function o(){return r&&r.get()||{revision:0,exec_defaults:{}}}function i(){let D=o();return typeof D.revision=="number"?D.revision:0}function l(){let D=o().exec_defaults;return D&&typeof D=="object"?D:{}}function a(D){D&&D.queue&&r&&r.set(D.queue)}async function c(D,R){if(!n)return;let k={key:D,value:R||null};try{let b=await n("worker-queue-set-exec-default",{...k,expected_revision:i()});a(b),b&&b.conflict&&(b=await n("worker-queue-set-exec-default",{...k,expected_revision:i()}),a(b)),b&&b.conflict&&X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}async function u(D,R){if(!n)return;let k={key:D,value:R||null};try{let b=await n("worker-queue-set-policy",{...k,expected_revision:i()});a(b),b&&b.conflict&&(b=await n("worker-queue-set-policy",{...k,expected_revision:i()}),a(b)),b&&b.conflict&&X("\uC804\uC5ED \uC815\uCC45 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uC804\uC5ED \uC815\uCC45 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function h(D,R,k){let b=!!k&&!R.includes(k);return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${D}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${D}`}
        data-key=${D}
        @change=${v=>{c(D,v.target.value)}}
      >
        <option value="" ?selected=${!k}>
          ${Jr[D]||"(\uAE30\uBCF8)"}
        </option>
        ${b?p`<option value=${k} ?selected=${!0}>
              ${k} (비호환)
            </option>`:""}
        ${R.map(v=>p`<option value=${v} ?selected=${k===v}>${v}</option>`)}
      </select>
    </div>`}function y(D,R){let k=typeof R[D.key]=="string"?R[D.key]:"";return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${D.key}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${D.key}`}
        data-policy-key=${D.key}
        @change=${b=>{u(D.key,b.target.value)}}
      >
        <option value="" ?selected=${!D.values.includes(k)}>
          ${D.default_label}
        </option>
        ${D.values.map(b=>p`<option value=${b} ?selected=${k===b}>${b}</option>`)}
      </select>
    </div>`}function x(){let D=o(),R=l(),k=R.worker_runner||"";le(p`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${z}
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
            ${Qa.map(b=>h(b.key,b.values(k),R[b.key]||""))}
            <p class="exec-defaults__hint exec-defaults__hint--policy">
              전역 정책 (좁은 화면에서 상단 바 대신 여기서 편집)
            </p>
            ${Ja.map(b=>y(b,D))}
          </div>
        </div>
      `,s)}let w=!1,A=()=>{w=!1};s.addEventListener("close",A),s.addEventListener("cancel",A);let M=null;r&&r.subscribe&&(M=r.subscribe(()=>{w&&x()}));function P(){w||(w=!0,x(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))}function z(){w&&(w=!1,typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:P,close:z,destroy(){w=!1,s.removeEventListener("close",A),s.removeEventListener("cancel",A),M&&(M(),M=null),s.remove()}}}function el(t){let e=t.draggable&&!t.done;return p`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?p`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id" title="클릭하면 ID 복사">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.reason?p`<span class="worker-mini__reason">${t.reason}</span>`:""}
  </div>`}function tl(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return p`<div
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
    ${r?fr(r,t.status):""}
    ${t.reason?p`<div class="worker-card__foot">
          <span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >
        </div>`:""}
  </div>`}function tr(t){return p`<section
    class="worker-pane${t.src?" worker-pane--src":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${t.title}</span>
      <span class="worker-pane__count">${t.items.length}</span>
    </header>
    <div class="worker-pane__body">
      ${t.items.length===0?p`<div class="worker-pane__empty">${t.empty||""}</div>`:t.items.map(e=>t.lane==="candidate"?tl(e):el(e))}
    </div>
  </section>`}function rl(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function $o(t){return p`<div class="worker-banners">
    ${t.autoAdvance?p`<div class="worker-banner worker-banner--on" role="status">
          ▶ 자동 진행 켜짐 — Serial head 1 + Parallel 슬롯까지 실행합니다.
        </div>`:p`<div class="worker-banner worker-banner--off" role="status">
          ⏸ 자동 진행 꺼짐 — 새 세션을 시작하지 않습니다. ▶로 재개.
        </div>`}
    ${t.breaker?p`<div class="worker-banner worker-banner--breaker" role="alert">
          ⛔ ${t.breaker.repo||"repo"} 세션 실패로 차단 —
          ${t.breaker.reason||""}. 신규 launch·머지 진입 차단, 수동 ▶
          필요.
          ${t.breaker.resume_attempt_id?p`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.breaker.resume_attempt_id}
                title="최근 실패 세션을 같은 워크트리에서 이어서 진행"
              >
                ↻ 이어하기
              </button>`:""}
        </div>`:""}
  </div>`}function nl(t,e,r=null){let n=t.lane==="serial"?"serial":"\u2225",s=typeof t.started_at=="number"?rl(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=t.attempt_id&&t.attempt_id===r;return p`<div
    class="rtile${i?" rtile--sel":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id">${t.bead_id}</span>
      <span class="rtile__badge rtile__badge--${t.lane}">${n}</span>
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
      <button type="button" class="rtile__stop" title="중지" aria-label="중지">
        ■
      </button>
    </div>
    <div class="rtile__title">${t.title}</div>
    ${o?p`<div class="rtile__meta">${o}</div>`:""}
    ${t.merge_policy?p`<div class="rtile__meta rtile__meta--policy">
          ${t.merge_policy}${t.demoted_reason?p` <span
                class="rtile__demoted"
                title=${`\uAC15\uB4F1: ${t.demoted_reason}`}
                >⤵ ${t.demoted_reason}</span
              >`:""}
        </div>`:""}
  </div>`}function xo(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return p`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?p`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>nl(s,e,r))}
  </div>`}var sl="tab:worker:ready",ol="tab:worker:blocked";function il(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function al(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function ll(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function $n(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l}=e,a=n?dr(n,i):null,c=ur({transport:r,uiOrderStore:i}),u=null,h=[],y=[],x=document.createElement("div");x.className="worker-console";let w=document.createElement("div"),A=document.createElement("div");A.className="worker-drawer-host";let M=document.createElement("div");M.className="worker-lanes-host",x.append(w,A,M),t.appendChild(x);let P=null,z=hr(A,{transport:r,sessionLogStore:o,onClose:()=>{P=null,Ae()}}),D=vo(x,{queueStore:s,transport:r});function R(){return s&&s.get()||{revision:0,auto_advance:!1,serial:[],parallel:[],done:[]}}function k(){let S=R();return typeof S.revision=="number"?S.revision:0}function b(S){S&&S.queue&&s&&s.set(S.queue)}async function v(S,O,V){if(!r)return;let q=await r("worker-queue-place",{bead_id:S,lane:O,index:V,expected_revision:k()});b(q),q&&q.conflict&&await r("worker-queue-place",{bead_id:S,lane:O,index:V,expected_revision:k()}).then(b)}async function $(S,O,V){if(!r)return;let q=await r("worker-queue-reorder",{bead_id:S,lane:O,to_index:V,expected_revision:k()});b(q),q&&q.conflict&&await r("worker-queue-reorder",{bead_id:S,lane:O,to_index:V,expected_revision:k()}).then(b)}async function B(S){if(!r)return;let O=await r("worker-queue-remove",{bead_id:S,expected_revision:k()});b(O),O&&O.conflict&&await r("worker-queue-remove",{bead_id:S,expected_revision:k()}).then(b)}async function Y(S){!r||!S||await r("worker-attempt-stop",{attempt_id:S})}async function K(S){if(!r||!S)return;let O=await r("worker-attempt-resume",{attempt_id:S});O&&O.resumed===!1&&O.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${O.reason}`,"error",2400)}async function Q(S){if(!r)return;let O=await r("worker-queue-toggle",{on:S,expected_revision:k()});b(O),O&&O.conflict&&await r("worker-queue-toggle",{on:S,expected_revision:k()}).then(b)}async function Ie(S,O){if(!r)return;let V={key:S,value:O||null},q=await r("worker-queue-set-policy",{...V,expected_revision:k()});b(q),q&&q.conflict&&await r("worker-queue-set-policy",{...V,expected_revision:k()}).then(b)}function Fe(){let S=R(),O=a?a.selectBoardColumn(sl,"ready"):[],V=a?a.selectBoardColumn(ol,"blocked"):[],q=new Map;for(let m of[...O,...V])q.set(m.id,m.title||m.id);let de=new Set([...S.serial.map(m=>m.bead_id),...S.parallel.map(m=>m.bead_id),...S.done.map(m=>m.bead_id)]),ee=new Set(V.map(m=>m.id)),te=i?i.get()?.order||{}:{},he=new Set,se=[];for(let m of[...O,...V])de.has(m.id)||he.has(m.id)||al(m)||(he.add(m.id),se.push(m));se.sort(lr(te)),h=se;let Re=S.admission||{},_e=m=>Re[m]?`\u26D4 ${Re[m].reason}`:"",Te=se.map(m=>{let C=il(m),U=[];ee.has(m.id)&&U.push(ll(m)),C||U.push("spec \uC5C6\uC74C");let G=_e(m.id);return G&&U.push(G),{id:m.id,title:m.title||m.id,reason:U.join(" \xB7 "),draggable:C,lane:"candidate",workflow:m.workflow,status:m.status}}),ye=(m,C)=>m.map(U=>({id:U.bead_id,title:q.get(U.bead_id)||U.bead_id,reason:C==="done"?"":_e(U.bead_id),draggable:C!=="done",done:C==="done",lane:C})),Le=new Map;for(let m of S.serial||[])Le.set(m.bead_id,"serial");for(let m of S.parallel||[])Le.set(m.bead_id,"parallel");let Ye=S.attempts?Object.values(S.attempts):[],Ze=new Set;for(let m of Ye)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&Ze.add(m.resumed_from);let me=[],xe=null,Ee=null;for(let m of Ye)m.status==="running"?me.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:q.get(m.bead_id)||m.bead_id,lane:Le.get(m.bead_id)||"parallel",runner:m.runner||null,model:m.model||null,effort:m.effort||null,started_at:typeof m.started_at=="number"?m.started_at:null,merge_policy:m.merge_policy||null,demoted_reason:m.demoted_reason||null,resumed_from:m.resumed_from||null}):(m.status==="failed"||m.status==="orphaned")&&(xe=m,typeof m.session_id=="string"&&m.session_id.length>0&&!Ze.has(m.attempt_id)&&(Ee=m));let De=xe?{repo:xe.repo||"",reason:xe.cause||xe.status,resume_attempt_id:Ee?Ee.attempt_id:null}:null;return{queue:S,idToTitle:q,candidates:Te,running:me,breaker:De,serial:ye(S.serial,"serial"),parallel:ye(S.parallel,"parallel"),done:ye(S.done,"done")}}function Ce(S){let O=S.serial.length>0?S.serial[0].id:"\u2014",V=S.queue.workspace_info||{},q=V.verify_cmd&&Array.isArray(V.verify_cmd.cmd)?V.verify_cmd.cmd.join(" "):null,ee=!!V.verify_cmd&&V.verify_cmd.source==="detected"?" (\uC790\uB3D9 \uAC10\uC9C0)":"",te=q?`verify_cmd \u2014 \uC124\uC815 \uD30C\uC77C \uBA85\uC2DC > \uC790\uB3D9 \uAC10\uC9C0 > \uC5C6\uC74C, \uBBF8\uC124\uC815 \uC2DC auto_merge\uAC00 pr_stop\uC73C\uB85C \uAC15\uB4F1. \uC804\uCCB4 \uBA85\uB839: ${q}${ee}`:"verify_cmd \u2014 \uC124\uC815 \uD30C\uC77C \uBA85\uC2DC > \uC790\uB3D9 \uAC10\uC9C0 > \uC5C6\uC74C, \uBBF8\uC124\uC815 \uC2DC auto_merge\uAC00 pr_stop\uC73C\uB85C \uAC15\uB4F1",he=(se,Re,_e)=>{let Te=typeof S.queue[se]=="string"?S.queue[se]:"";return p`<label class="worker-policy">
        <span class="worker-policy__k">${se}</span>
        <select
          class="worker-policy__sel"
          aria-label=${`\uC804\uC5ED ${se}`}
          data-policy-key=${se}
          @change=${ye=>{Ie(se,ye.target.value)}}
        >
          <option value="" ?selected=${!Re.includes(Te)}>
            ${_e}
          </option>
          ${Re.map(ye=>p`<option value=${ye} ?selected=${Te===ye}>${ye}</option>`)}
        </select>
      </label>`};return p`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${S.queue.auto_advance?" is-active":""}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${S.running.length}</b> · serial 다음
          <b>${O}</b></span
        >
        <span class="worker-tgl"
          >parallel slot <b>${S.parallel.length}</b></span
        >
        ${he("merge_policy",["auto_merge","pr_stop"],"(\uAE30\uBCF8 auto_merge)")}
        ${he("drift_policy",["auto_rereview","halt"],"(\uAE30\uBCF8 auto_rereview)")}
        <button
          type="button"
          class="worker-exec-defaults-btn"
          aria-haspopup="dialog"
          aria-label="전역 실행 설정"
          title="전역 실행 설정"
        >
          ⚙
        </button>
        <span
          class="worker-verifycmd${q?"":" worker-verifycmd--unset"}"
          title=${te}
        >
          ${q?p`<span class="worker-verifycmd__full"
                  >verify_cmd:
                  <code>${q}</code>${ee}</span
                ><span class="worker-verifycmd__badge"
                  >verify_cmd ✓${ee}</span
                >`:p`<span class="worker-verifycmd__full"
                  >verify_cmd: 미설정 (auto_merge→pr_stop 강등)</span
                ><span class="worker-verifycmd__badge"
                  >verify_cmd 미설정 ⤵pr_stop</span
                >`}</span
        >
      </div>
      ${$o({autoAdvance:!!S.queue.auto_advance,breaker:S.breaker})}
      ${xo(S.running,Date.now(),P)}`}function Ve(S){return p`<div class="worker-lanes">
      ${tr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:S.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${tr({id:"worker-pane-serial",lane:"serial",title:"Serial \uD050",items:S.serial,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${tr({id:"worker-pane-parallel",lane:"parallel",title:"Parallel \uD480",items:S.parallel,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${tr({id:"worker-pane-done",lane:"done",title:`Done \xB7 \uC624\uB298 ${S.done.length}`,items:S.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Ae(){let S=Fe();le(Ce(S),w),le(Ve(S),M)}function be(S){let O=S.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!O)return;let V=O.dataset.beadId||"",q=O.dataset.lane||"";u={bead_id:V,from_lane:q};try{S.dataTransfer?.setData("text/plain",V),S.dataTransfer&&(S.dataTransfer.effectAllowed="move")}catch{}}function $e(S){let O=S.target?.closest?.(".worker-pane");O&&(S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move"),O.classList.add("worker-pane--drag-over"))}function He(S){S.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function pe(S,O){let V=h.find(te=>te.id===S);if(!V)return;let q=h.filter(te=>te.id!==S),de=q.length;if(O){let te=O.dataset.beadId;if(te===S)return;let he=q.findIndex(se=>se.id===te);he>=0&&(de=he)}let ee=q.slice();ee.splice(de,0,V),c.applyReorder(S,ee,de)}function Xe(S){let O=S.target?.closest?.(".worker-pane");if(!O)return;S.preventDefault(),O.classList.remove("worker-pane--drag-over");let V=O.dataset.lane||"",q=u?.bead_id||S.dataTransfer?.getData("text/plain")||"",de=u?.from_lane||"";if(u=null,!q)return;let ee=S.target?.closest?.(".worker-mini, .worker-card"),te=Array.from(O.querySelectorAll(".worker-mini, .worker-card")),he=te.length;if(ee){let se=te.indexOf(ee);se>=0&&(he=se)}if(V==="candidate"){if(de==="candidate"){pe(q,ee);return}(de==="serial"||de==="parallel")&&B(q);return}(V==="serial"||V==="parallel")&&(de===V?$(q,V,he):v(q,V,he))}function ce(S){return S?{runner:S.runner||void 0,model:S.model||void 0,effort:S.effort||void 0,worktree:S.worktree||void 0,status:S.status||void 0,session_id:S.session_id||void 0}:{}}function je(S){let O=R(),V=O.attempts?O.attempts[S]:null;P=S,z.open({attempt_id:S,meta:ce(V)}),Ae()}function ie(){if(!P)return;let S=R(),O=S.attempts?S.attempts[P]:null;O&&z.updateMeta(ce(O))}function Ne(S){let O=S.target;if(O?.closest?.("#worker-exec-defaults-dialog"))return;if(O?.closest?.(".worker-exec-defaults-btn")){D.open();return}let V=O?.closest?.(".worker-banner__resume");if(V){let ee=V.dataset.attemptId;ee&&K(ee);return}if(O?.closest?.(".worker-play")){Q(!0);return}if(O?.closest?.(".worker-pause")){Q(!1);return}if(O?.closest?.(".rtile__stop")){let te=O?.closest?.(".rtile")?.dataset?.attemptId;te&&Y(te);return}if(O?.closest?.(".rtile__info")){let te=O?.closest?.(".rtile")?.dataset?.beadId;te&&l&&l(te);return}if(O?.closest?.(".worker-drawer-host"))return;let q=O?.closest?.(".rtile");if(q){let ee=q.dataset.attemptId;ee&&je(ee);return}let de=O?.closest?.(".worker-mini, .worker-card");if(de){let ee=de.dataset.beadId;if(O?.closest?.(".worker-mini__id, .worker-card__id")){ee&&It(ee).then(te=>{te?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ee&&l&&l(ee)}}return t.addEventListener("dragstart",be),t.addEventListener("dragover",$e),t.addEventListener("dragleave",He),t.addEventListener("drop",Xe),t.addEventListener("click",Ne),a&&y.push(a.subscribe(Ae)),s&&y.push(s.subscribe(()=>{Ae(),ie()})),Ae(),{load(){Ae()},destroy(){for(let S of y.splice(0))try{S()}catch{}t.removeEventListener("dragstart",be),t.removeEventListener("dragover",$e),t.removeEventListener("dragleave",He),t.removeEventListener("drop",Xe),t.removeEventListener("click",Ne);try{z.destroy()}catch{}try{D.destroy()}catch{}le(p``,t)}}}function xn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function So(t,e,r,n=async()=>{},s=async()=>{}){let o=we("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function u(b){let $=b.target.value,Y=e.getState().workspace?.current?.path||"";if($&&$!==Y){o("switching workspace to %s",$),l=!0,k();try{await r($)}catch(K){o("workspace switch failed: %o",K)}finally{l=!1,k()}}}async function h(){let b=e.getState(),v=b.workspace?.current?.path||b.workspace?.available?.[0]?.path||"";if(!(!v||a)){o("git-pulling workspace %s",v),a=!0,k();try{await n(v)}catch($){o("workspace git pull failed: %o",$)}finally{a=!1,k()}}}function y(b){let v=b.target;v&&t.contains(v)||A()}function x(b){b.key==="Escape"&&A()}function w(){c||(c=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",x),k())}function A(){c&&(c=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",x),k())}function M(){c?A():w()}async function P(b){let v=b.target,$=v.value,B=v.checked;o("toggling visibility %s \u2192 %s",$,String(B));try{await s($,B)}catch(Y){o("workspace visibility toggle failed: %o",Y)}}function z(b){return b?p`
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
    `:p``}function D(b,v){return p`
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
                ${b.map($=>p`
                    <label
                      class="workspace-picker__manage-row"
                      title="${$.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${$.path}"
                        .checked=${!v.has($.path)}
                        @change=${P}
                      />
                      <span class="workspace-picker__manage-name"
                        >${xn($.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function R(){let b=e.getState(),v=b.workspace?.current,$=b.workspace?.available||[],B=new Set(b.workspace?.hidden||[]),Y=v?.path||$[0]?.path||"";if($.length===0)return p``;let K=$.filter(Q=>!B.has(Q.path)||Q.path===Y);if(K.length<=1){let Q=K[0]||$[0],Ie=xn(Q.path);return p`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Q.path}"
            >${Ie}</span
          >
          ${D($,B)}
          ${z(Y)}
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
                ?selected=${Q.path===Y}
                title="${Q.path}"
              >
                ${xn(Q.path)}
              </option>
            `)}
        </select>
        ${D($,B)}
        ${z(Y)}
        ${l||a?p`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function k(){le(R(),t)}return k(),i=e.subscribe(()=>k()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",x),le(p``,t)}}}var Ao=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-policy","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-stop","worker-attempt-resume","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Sn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function To(t,e,r=Sn()){return{id:r,type:t,payload:e}}function Eo(t={}){let e=we("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,u=[],h=new Map,y=new Set;function x(R){for(let k of Array.from(y))try{k(R)}catch{}}function w(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),x(o);let R=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),k=(r.jitterRatio||0)*R,b=Math.max(0,Math.round(R+(Math.random()*2-1)*k));e("ws retry in %d ms (attempt %d)",b,i+1),l=setTimeout(()=>{l=null,D()},b)}function A(R){try{s?.send(JSON.stringify(R))}catch(k){e("ws send failed",k)}}function M(){for(o="open",e("ws open"),x(o),i=0;u.length;){let R=u.shift();R&&A(R)}}function P(R){let k;try{k=JSON.parse(String(R.data))}catch{e("ws received non-JSON message");return}if(!k||typeof k.id!="string"||typeof k.type!="string"){e("ws received invalid envelope");return}if(c.has(k.id)){let v=c.get(k.id);c.delete(k.id),k.ok?v?.resolve(k.payload):v?.reject(k.error||new Error("ws error"));return}let b=h.get(k.type);if(b&&b.size>0)for(let v of Array.from(b))try{v(k.payload)}catch($){e("ws event handler error",$)}else e("ws received unhandled message type: %s",k.type)}function z(){o="closed",e("ws closed"),x(o);for(let[R,k]of c.entries())k.reject(new Error("ws disconnected")),c.delete(R);i+=1,w()}function D(){if(!a)return;let R=n();try{s=new WebSocket(R),e("ws connecting %s",R),o="connecting",x(o),s.addEventListener("open",M),s.addEventListener("message",P),s.addEventListener("error",()=>{}),s.addEventListener("close",z)}catch(k){e("ws connect failed %o",k),w()}}return D(),{send(R,k){if(!Ao.includes(R))return Promise.reject(new Error(`unknown message type: ${R}`));let b=Sn(),v=To(R,k,b);return e("send %s id=%s",R,b),new Promise(($,B)=>{c.set(b,{resolve:$,reject:B,type:R}),s&&s.readyState===s.OPEN?A(v):(e("queue %s id=%s (state=%s)",R,b,o),u.push(v))})},on(R,k){h.has(R)||h.set(R,new Set);let b=h.get(R);return b?.add(k),()=>{b?.delete(k)}},onConnection(R){return y.add(R),()=>{y.delete(R)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,D()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function cl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function dl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var An=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Co=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Ro="worker:queue",Lo="ui:order",Io="ui:display-policy",dt="tab:board:closed",Do="beads-ui.board.closed-range";function ul(t){let e=we("main");e("bootstrap start");let r=p`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;le(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let $=function(f,g){let Z="Request failed",j="";if(f&&typeof f=="object"){let ke=f;if(typeof ke.message=="string"&&ke.message.length>0&&(Z=ke.message),typeof ke.details=="string")j=ke.details;else if(ke.details&&typeof ke.details=="object")try{j=JSON.stringify(ke.details,null,2)}catch{j=""}}else typeof f=="string"&&f.length>0&&(Z=f);let re=g&&g.length>0?`Failed to load ${g}`:"Request failed";v.open(re,Z,j)},ie=function(f){return`${I.getState().workspace.current?.path||""}\0${f}`},Ne=function(){Ae&&(Ae().catch(()=>{}),Ae=null),be=null,$e=null},O=function(f){He=f;let g=()=>{He!==f||I.getState().selected_id!==f||(He=null,S(f))};if(!ce){Xe.then(g);return}g()},ee=function(){let f=Yn(de);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},te=function(f){if(f)for(let[g,Z]of An){if(V.has(g)||q.has(g))continue;let j=g===dt?ee():{type:Z};try{Q.register(g,j)}catch(re){e("register %s store failed: %o",g,re)}q.add(g),K.subscribeList(g,j).then(re=>{V.set(g,re)}).catch(re=>{e("subscribe %s failed: %o",g,re),$(re,"board")}).finally(()=>{q.delete(g)})}else se()},se=function(){for(let[f]of An){let g=V.get(f);g&&(g().catch(()=>{}),V.delete(f));try{Q.unregister(f)}catch(Z){e("unregister %s failed: %o",f,Z)}}},Te=function(f){if(!f){ye();return}for(let[g,Z]of Co)if(!(Re.has(g)||q.has(g))){try{Q.register(g,{type:Z})}catch(j){e("register %s store failed: %o",g,j)}q.add(g),K.subscribeList(g,{type:Z}).then(j=>{Re.set(g,j)}).catch(j=>{e("subscribe %s failed: %o",g,j),$(j,"worker")}).finally(()=>{q.delete(g)})}_e||(Y("subscribe-worker-queue",{id:Ro}).catch(g=>{e("subscribe-worker-queue failed: %o",g)}),_e=()=>Y("unsubscribe-worker-queue",{id:Ro}))},ye=function(){for(let[f]of Co){let g=Re.get(f);g&&(g().catch(()=>{}),Re.delete(f));try{Q.unregister(f)}catch(Z){e("unregister %s failed: %o",f,Z)}}_e&&(_e().catch(()=>{}),_e=null)},Ye=function(){Le||(Y("subscribe-ui-order",{id:Lo}).catch(f=>{e("subscribe-ui-order failed: %o",f)}),Le=()=>Y("unsubscribe-ui-order",{id:Lo}))},Ze=function(){Le&&(Le().catch(()=>{}),Le=null),Fe.clear()},xe=function(){me||(Y("subscribe-display-policy",{id:Io}).catch(f=>{e("subscribe-display-policy failed: %o",f)}),me=()=>Y("unsubscribe-display-policy",{id:Io}))},Ee=function(){me&&(me().catch(()=>{}),me=null),Ce.clear()},N=function(f){if(!f)return"Unknown";let g=f.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var l=$,a=ie,c=Ne,u=O,h=ee,y=te,x=se,w=Te,A=ye,M=Ye,P=Ze,z=xe,D=Ee,R=N;let k=document.getElementById("header-loading"),b=gs(k),v=go(t),B=Eo(),Y=b.wrapSend((f,g)=>B.send(f,g)),K=cs(Y),Q=ds(),Ie=ps(),Fe=us(),Ce=Vn(),Ve=Zn();B.on("worker-queue-snapshot",f=>{let g=f;if(g&&g.queue)try{Ie.set(g.queue)}catch{}}),B.on("ui-order-snapshot",f=>{let g=f;if(g&&typeof g.revision=="number")try{Fe.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),B.on("display-policy-snapshot",f=>{let g=f;if(g&&g.policy&&typeof g.policy=="object")try{Ce.set(g.policy)}catch{}}),B.on("session-log-snapshot",f=>{let g=f;if(g&&typeof g.attempt_id=="string")try{Ve.set(g.attempt_id,Array.isArray(g.lines)?g.lines:[])}catch{}}),B.on("session-log-append",f=>{let g=f;if(g&&typeof g.attempt_id=="string")try{Ve.append(g.attempt_id,g.event)}catch{}}),B.on("snapshot",f=>{let g=f,Z=g&&typeof g.id=="string"?g.id:"",j=Z?Q.getStore(Z):null;if(j&&g&&g.type==="snapshot")try{j.applyPush(g)}catch{}}),B.on("upsert",f=>{let g=f,Z=g&&typeof g.id=="string"?g.id:"",j=Z?Q.getStore(Z):null;if(j&&g&&g.type==="upsert")try{j.applyPush(g)}catch{}}),B.on("delete",f=>{let g=f,Z=g&&typeof g.id=="string"?g.id:"",j=Z?Q.getStore(Z):null;if(j&&g&&g.type==="delete")try{j.applyPush(g)}catch{}});let Ae=null,be=null,$e=null,He=null,pe=()=>{},Xe=new Promise(f=>{pe=()=>f(void 0)}),ce=!1,je=!1;async function S(f){let g=ie(f);if(g===be||g===$e)return;$e=g;let Z=`detail:${f}`,j={type:"issue-detail",params:{id:f}};try{Q.register(Z,j)}catch(re){e("register detail store failed: %o",re)}try{let re=await K.subscribeList(Z,j);if(I.getState().selected_id!==f||ie(f)!==g){await re().catch(()=>{});return}Ae&&await Ae().catch(()=>{}),Ae=re,be=g}catch(re){e("detail subscribe failed: %o",re),$(re,"issue details")}finally{$e===g&&($e=null)}}let V=new Map,q=new Set,de=or;try{let f=window.localStorage.getItem(Do);Br(f)&&(de=f)}catch{}async function he(f){if(!Br(f)||f===de)return;de=f;try{window.localStorage.setItem(Do,f)}catch{}let g=V.get(dt);if(!g)return;V.delete(dt),await g().catch(()=>{});let Z=ee();try{Q.register(dt,Z)}catch(j){e("register %s store failed: %o",dt,j)}try{let j=await K.subscribeList(dt,Z);V.set(dt,j)}catch(j){e("re-subscribe %s failed: %o",dt,j),$(j,"board")}}let Re=new Map,_e=null,Le=null,me=null;async function De(){me=null,Ce.clear();let f=I.getState().workspace.current?.path;if(f)try{await B.send("set-workspace",{path:f})}catch(g){e("workspace restore after reconnect failed: %o",g);return}xe()}async function m(){e("clearing all subscriptions for workspace switch"),se(),ye(),Ie.clear(),Ze(),Ye(),Ee(),xe(),Ne();let f=I.getState();if(f.selected_id)try{Q.unregister(`detail:${f.selected_id}`)}catch{}let g=I.getState();te(g.view==="board"),Te(g.view==="worker"),g.selected_id&&O(g.selected_id)}async function C(f){e("requesting workspace switch to %s",f),je=!0;try{let g=await B.send("set-workspace",{path:f});e("workspace switch result: %o",g),g&&g.workspace&&(I.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),g.changed&&(await m(),X("Switched to "+N(f),"success",2e3)))}catch(g){throw e("workspace switch failed: %o",g),X("Failed to switch workspace","error",3e3),g}finally{je=!1}}async function U(f){e("requesting workspace git pull for %s",f);try{let g=await B.send("git-pull-workspace",{});e("workspace git pull result: %o",g);let Z=g?.status;if(Z==="up_to_date"){X("Already up to date","success",2e3);return}if(Z==="stash_pop_conflict"){X("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}X("Git pulled "+N(f),"success",2e3)}catch(g){e("workspace git pull failed: %o",g);let Z=g?.code,j=g?.message;if(Z==="rebase_conflict"){X("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Z==="rebase_conflict_abort_failed"){X("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Z==="busy"){X("Git pull skipped: another operation is running","warning",3e3);return}let re=j?`: ${j}`:"";throw X(`Git pull failed${re}`,"error",3e3),g}}async function G(f,g){e("setting workspace visibility %s \u2192 %s",f,String(g));try{await B.send("set-workspace-visibility",{path:f,visible:g}),await _()}catch(Z){e("workspace visibility update failed: %o",Z),X("Failed to update project visibility","error",3e3)}}async function _(){try{let f=await B.send("list-workspaces",{});if(e("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let g=f.workspaces.map(ke=>({path:ke.path,database:ke.database,pid:ke.pid,version:ke.version})),Z=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,j=Array.isArray(f.hidden)?f.hidden.filter(ke=>typeof ke=="string"):[];I.setState({workspace:{current:Z,available:g,hidden:j}});let re=window.localStorage.getItem("beads-ui.workspace");re&&(!g.some(nr=>nr.path===re)||j.includes(re)?window.localStorage.removeItem("beads-ui.workspace"):Z&&re!==Z.path&&(e("restoring saved workspace preference: %s",re),await C(re)))}}catch(f){e("failed to load workspaces: %o",f)}}B.on("workspace-changed",f=>{e("workspace-changed event: %o",f),f&&f.root_dir&&(I.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),_(),m())});let T=!1;if(typeof B.onConnection=="function"){let f=g=>{e("ws state %s",g),g==="reconnecting"||g==="closed"?(T=!0,X("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&T&&(T=!1,X("Reconnected","success",2200),dl(I,(Z,j)=>{e(`${Z}: %o`,j)}),De())};B.onConnection(f)}let E="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker")&&(E=f)}catch(f){e("view parse error: %o",f)}let I=ms({config:cl(),view:E}),J=fs(I);J.start();let fe=async(f,g)=>{try{return await Y(f,g)}catch{return[]}};n&&_o(n,I,J);let H=document.getElementById("workspace-picker");H&&So(H,I,C,U,G);let Oe=wo(t,(f,g)=>Y(f,g));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>Oe.open())}catch{}let wt=mo(t,{policyStore:Ce,transport:(f,g)=>Y(f,g),labelOptions:()=>{let f=new Set;for(let[g]of An)for(let Z of Q.snapshotFor(g)||[]){let j=Z.labels;if(Array.isArray(j))for(let re of j)typeof re=="string"&&re.length>0&&f.add(re)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>wt.open())}catch{}let vt=$s(s,{gotoIssue:f=>J.gotoIssue(f),issueStores:Q,transport:fe,uiOrderStore:Fe,displayPolicyStore:Ce,closedRange:de,onClosedRangeChange:f=>{he(f)},onNewIssue:()=>Oe.open()}),Ar=$n(o,{transport:fe,issueStores:Q,queueStore:Ie,sessionLogStore:Ve,uiOrderStore:Fe,gotoIssue:f=>I.setState({selected_id:f})}),nt=fo(i,{issueStores:Q,transport:fe,queueStore:Ie,sessionLogStore:Ve,getWorkspacePath:()=>I.getState().workspace.current?.path,onNavigate:f=>{I.getState().view==="worker"?I.setState({selected_id:f}):J.gotoIssue(f)},onClose:()=>{let f=I.getState();I.setState({selected_id:null});try{J.gotoView(f.view==="worker"?"worker":"board")}catch{}}}),Mt=I.getState().selected_id;Mt&&(i.hidden=!1,nt.load(Mt),O(Mt)),I.subscribe(f=>{let g=f.selected_id;g?(i.hidden=!1,nt.load(g),je||O(g)):(nt.clear(),i.hidden=!0,Ne())});let rr=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",te(f.view==="board"),Te(f.view==="worker"),!f.selected_id&&f.view==="board"&&vt.load(),f.view==="worker"&&Ar.load(),window.localStorage.setItem("beads-ui.view",f.view)};I.subscribe(rr),rr(I.getState()),Ye(),xe(),_().finally(()=>{ce=!0,pe()}),window.addEventListener("keydown",f=>{let g=f.ctrlKey||f.metaKey,Z=String(f.key||"").toLowerCase(),j=f.target,re=j&&j.tagName?String(j.tagName).toLowerCase():"",ke=re==="input"||re==="textarea"||re==="select"||j&&typeof j.isContentEditable=="boolean"&&j.isContentEditable;g&&Z==="n"&&(ke||(f.preventDefault(),Oe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&ul(e)});export{ul as bootstrap,cl as readBootstrapConfig,dl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
