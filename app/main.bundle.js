var No=Object.create;var Cr=Object.defineProperty;var Po=Object.getOwnPropertyDescriptor;var Fo=Object.getOwnPropertyNames;var Bo=Object.getPrototypeOf,qo=Object.prototype.hasOwnProperty;var zo=(t,e,r)=>e in t?Cr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Rr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Uo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Fo(e))!qo.call(t,s)&&s!==r&&Cr(t,s,{get:()=>e[s],enumerable:!(n=Po(e,s))||n.enumerable});return t};var Ho=(t,e,r)=>(r=t!=null?No(Bo(t)):{},Uo(e||!t||!t.__esModule?Cr(r,"default",{value:t,enumerable:!0}):r,t));var pe=(t,e,r)=>zo(t,typeof e!="symbol"?e+"":e,r);var Xn=Rr((yl,Kn)=>{var At=1e3,Tt=At*60,Et=Tt*60,gt=Et*24,Vo=gt*7,Zo=gt*365.25;Kn.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Ko(t);if(r==="number"&&isFinite(t))return e.long?Qo(t):Xo(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Ko(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Zo;case"weeks":case"week":case"w":return r*Vo;case"days":case"day":case"d":return r*gt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Et;case"minutes":case"minute":case"mins":case"min":case"m":return r*Tt;case"seconds":case"second":case"secs":case"sec":case"s":return r*At;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Xo(t){var e=Math.abs(t);return e>=gt?Math.round(t/gt)+"d":e>=Et?Math.round(t/Et)+"h":e>=Tt?Math.round(t/Tt)+"m":e>=At?Math.round(t/At)+"s":t+"ms"}function Qo(t){var e=Math.abs(t);return e>=gt?ir(t,e,gt,"day"):e>=Et?ir(t,e,Et,"hour"):e>=Tt?ir(t,e,Tt,"minute"):e>=At?ir(t,e,At,"second"):t+" ms"}function ir(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Jn=Rr((kl,Qn)=>{function Jo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Xn(),r.destroy=c,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let h=0;for(let b=0;b<u.length;b++)h=(h<<5)-h+u.charCodeAt(b),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(u){let h,b=null,$,k;function T(...N){if(!T.enabled)return;let F=T,z=Number(new Date),O=z-(h||z);F.diff=O,F.prev=h,F.curr=z,h=z,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let R=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(_,w)=>{if(_==="%%")return"%";R++;let v=r.formatters[w];if(typeof v=="function"){let q=N[R];_=v.call(F,q),N.splice(R,1),R--}return _}),r.formatArgs.call(F,N),(F.log||r.log).apply(F,N)}return T.namespace=u,T.useColors=r.useColors(),T.color=r.selectColor(u),T.extend=n,T.destroy=r.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:($!==r.namespaces&&($=r.namespaces,k=r.enabled(u)),k),set:N=>{b=N}}),typeof r.init=="function"&&r.init(T),T}function n(u,h){let b=r(this.namespace+(typeof h>"u"?":":h)+u);return b.log=this.log,b}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let h=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of h)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(u,h){let b=0,$=0,k=-1,T=0;for(;b<u.length;)if($<h.length&&(h[$]===u[b]||h[$]==="*"))h[$]==="*"?(k=$,T=b,$++):(b++,$++);else if(k!==-1)$=k+1,T++,b=T;else return!1;for(;$<h.length&&h[$]==="*";)$++;return $===h.length}function i(){let u=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),u}function l(u){for(let h of r.skips)if(o(u,h))return!1;for(let h of r.names)if(o(u,h))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Qn.exports=Jo});var es=Rr((Ge,ar)=>{Ge.formatArgs=ti;Ge.save=ri;Ge.load=ni;Ge.useColors=ei;Ge.storage=si();Ge.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ge.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ei(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ti(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+ar.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Ge.log=console.debug||console.log||(()=>{});function ri(t){try{t?Ge.storage.setItem("debug",t):Ge.storage.removeItem("debug")}catch{}}function ni(){let t;try{t=Ge.storage.getItem("debug")||Ge.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function si(){try{return localStorage}catch{}}ar.exports=Jn()(Ge);var{formatters:oi}=ar.exports;oi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Pt=globalThis,sr=Pt.trustedTypes,Nn=sr?sr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Un="$lit$",lt=`lit$${Math.random().toFixed(9).slice(2)}$`,Hn="?"+lt,Wo=`<${Hn}>`,ht=document,Ft=()=>ht.createComment(""),Bt=t=>t===null||typeof t!="object"&&typeof t!="function",Pr=Array.isArray,Go=t=>Pr(t)||typeof t?.[Symbol.iterator]=="function",Lr=`[ 	
\f\r]`,Nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pn=/-->/g,Fn=/>/g,pt=RegExp(`>|${Lr}(?:([^\\s"'>=/]+)(${Lr}*=${Lr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bn=/'/g,qn=/"/g,Wn=/^(?:script|style|textarea|title)$/i,Fr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),p=Fr(1),fl=Fr(2),hl=Fr(3),mt=Symbol.for("lit-noChange"),xe=Symbol.for("lit-nothing"),zn=new WeakMap,ft=ht.createTreeWalker(ht,129);function Gn(t,e){if(!Pr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nn!==void 0?Nn.createHTML(e):e}var jo=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Nt;for(let l=0;l<r;l++){let a=t[l],c,u,h=-1,b=0;for(;b<a.length&&(i.lastIndex=b,u=i.exec(a),u!==null);)b=i.lastIndex,i===Nt?u[1]==="!--"?i=Pn:u[1]!==void 0?i=Fn:u[2]!==void 0?(Wn.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=pt):u[3]!==void 0&&(i=pt):i===pt?u[0]===">"?(i=s??Nt,h=-1):u[1]===void 0?h=-2:(h=i.lastIndex-u[2].length,c=u[1],i=u[3]===void 0?pt:u[3]==='"'?qn:Bn):i===qn||i===Bn?i=pt:i===Pn||i===Fn?i=Nt:(i=pt,s=void 0);let $=i===pt&&t[l+1].startsWith("/>")?" ":"";o+=i===Nt?a+Wo:h>=0?(n.push(c),a.slice(0,h)+Un+a.slice(h)+lt+$):a+lt+(h===-2?l:$)}return[Gn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},qt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,u]=jo(e,r);if(this.el=t.createElement(c,n),ft.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=ft.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Un)){let b=u[i++],$=s.getAttribute(h).split(lt),k=/([.?@])?(.*)/.exec(b);a.push({type:1,index:o,name:k[2],strings:$,ctor:k[1]==="."?Dr:k[1]==="?"?Or:k[1]==="@"?Mr:St}),s.removeAttribute(h)}else h.startsWith(lt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Wn.test(s.tagName)){let h=s.textContent.split(lt),b=h.length-1;if(b>0){s.textContent=sr?sr.emptyScript:"";for(let $=0;$<b;$++)s.append(h[$],Ft()),ft.nextNode(),a.push({type:2,index:++o});s.append(h[b],Ft())}}}else if(s.nodeType===8)if(s.data===Hn)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(lt,h+1))!==-1;)a.push({type:7,index:o}),h+=lt.length-1}o++}}static createElement(e,r){let n=ht.createElement("template");return n.innerHTML=e,n}};function xt(t,e,r=t,n){if(e===mt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Bt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=xt(t,s._$AS(t,e.values),s,n)),e}var Ir=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??ht).importNode(r,!0);ft.currentNode=s;let o=ft.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new zt(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Nr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=ft.nextNode(),i++)}return ft.currentNode=ht,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},zt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=xe,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=xt(this,e,r),Bt(e)?e===xe||e==null||e===""?(this._$AH!==xe&&this._$AR(),this._$AH=xe):e!==this._$AH&&e!==mt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Go(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==xe&&Bt(this._$AH)?this._$AA.nextSibling.data=e:this.T(ht.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=qt.createElement(Gn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ir(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=zn.get(e.strings);return r===void 0&&zn.set(e.strings,r=new qt(e)),r}k(e){Pr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Ft()),this.O(Ft()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},St=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=xe,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=xe}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=xt(this,e,r,0),i=!Bt(e)||e!==this._$AH&&e!==mt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=xt(this,l[n+a],r,a),c===mt&&(c=this._$AH[a]),i||(i=!Bt(c)||c!==this._$AH[a]),c===xe?e=xe:e!==xe&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===xe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Dr=class extends St{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===xe?void 0:e}},Or=class extends St{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==xe)}},Mr=class extends St{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=xt(this,e,r,0)??xe)===mt)return;let n=this._$AH,s=e===xe&&n!==xe||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==xe&&(n===xe||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Nr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){xt(this,e)}};var Yo=Pt.litHtmlPolyfillSupport;Yo?.(qt,zt),(Pt.litHtmlVersions??(Pt.litHtmlVersions=[])).push("3.3.1");var ce=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new zt(e.insertBefore(Ft(),o),o,void 0,r??{})}return s._$AI(t),s};var or="today",jn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Br(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Yn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Vn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Zn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var ts=Ho(es(),1);function $e(t){return(0,ts.default)(`beads-ui:${t}`)}function Qe(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Ut(t,e){let r=Qe(t.created_at),n=Qe(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ss(t,e){let r=Qe(t.created_at),n=Qe(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function os(t,e){let r=Qe(t.updated_at),n=Qe(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function is(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=Qe(t.created_at),o=Qe(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function as(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var ii=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function rs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ns(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=ii.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ls(t,e){let r=rs(t),n=rs(e);if(r!==n)return r<n?-1:1;let s=ns(t),o=ns(e);if(s!==o)return s<o?-1:1;let i=Qe(t&&t.created_at),l=Qe(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var qr=2**20;function Ct(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-Qe(t&&t.created_at)}function lr(t){return(e,r)=>{let n=Ct(e,t),s=Ct(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function zr(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ct(l,r)-qr};if(!l)return{rank:Ct(i,r)+qr};let a=Ct(i,r),c=Ct(l,r),u=(a+c)/2;return a<u&&u<c?{rank:u}:{renormalize:n.map((h,b)=>({bead_id:h.id,rank:b*qr}))}}function Ur(t,e={}){let r=$e(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Ut;function c(){for(let b of Array.from(i))try{b()}catch{}}function u(){s=Array.from(n.values()).sort(a)}function h(b){if(l||!b||b.id!==t)return;let $=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,$),!($<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if($<=o)return;n.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let T of k)T&&typeof T.id=="string"&&T.id.length>0&&n.set(T.id,T);u(),o=$,c();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let T=n.get(k.id);if(!T)n.set(k.id,k);else{let N=Number.isFinite(T.updated_at)?T.updated_at:0,F=Number.isFinite(k.updated_at)?k.updated_at:0;if(N<=F){for(let z of Object.keys(T))z in k||delete T[z];for(let[z,O]of Object.entries(k))T[z]=O}}u()}o=$,c()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(n.delete(k),u()),o=$,c()}}}return{id:t,subscribe(b){return i.add(b),()=>{i.delete(b)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function cr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function cs(t){let e=$e("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let u=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let $ of Array.from(c)){let k=r.get($);if(!k)continue;let T=k.itemsById;for(let N of u)typeof N=="string"&&N.length>0&&T.set(N,!0);for(let N of h)typeof N=="string"&&N.length>0&&T.set(N,!0);for(let N of b)typeof N=="string"&&N.length>0&&T.delete(N)}}async function o(l,a){let c=cr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let b=n.get(h.key);b&&(b.delete(l),b.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let u=n.get(c);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let b=r.get(l)||null;if(b){let $=n.get(b.key);$&&($.delete(l),$.size===0&&n.delete(b.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let b=n.get(h.key);b&&(b.delete(l),b.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:cr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let u of a.itemsById.keys())c[u]=!0;return c}}}}function ds(){let t=$e("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,u){let h=c?cr(c):"",b=r.get(a)||"",$=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,b),$&&b&&h&&b!==h){let k=e.get(a);if(k)try{k.dispose()}catch{}let T=s.get(a);if(T){try{T()}catch{}s.delete(a)}let N=Ur(a,u);e.set(a,N);let F=N.subscribe(()=>o());s.set(a,F)}else if(!$){let k=Ur(a,u);e.set(a,k);let T=k.subscribe(()=>o());s.set(a,T)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let u=s.get(a);if(u){try{u()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function us(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ps(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Hr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function ai(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function li(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function fs(t){let e=$e("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):ai(n),i=li(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Hr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Hr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ci=Object.freeze({workspace_config:{default_workspace:null}});function hs(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:ci.workspace_config.default_workspace}}}function ms(t={}){let e=$e("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:hs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?hs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,u)=>c!==r.workspace.hidden[u]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,u)=>c===r.worker.show_closed_children[u])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function gs(t){let e=$e("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,b)=>{let $=s++,k=Date.now();n.set($,{type:h,start_ts:k}),e("request start id=%d type=%s count=%d",$,h,r+1),i();let T=!1,N=()=>{T||(T=!0,n.delete($),l())},F=setTimeout(()=>{T||(e("request TIMEOUT id=%d type=%s elapsed=%dms",$,h,Date.now()-k),N())},3e4);try{let z=await c(h,b),O=Date.now()-k;return e("request done id=%d type=%s elapsed=%dms",$,h,O),z}catch(z){let O=Date.now()-k;throw e("request error id=%d type=%s elapsed=%dms err=%o",$,h,O,z),z}finally{clearTimeout(F),N()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([u,h])=>({id:u,type:h.type,elapsed_ms:c-h.start_ts}))}}}function Q(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function dr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(as),a;switch(l){case"created_desc":return a.sort(Ut),a;case"created_asc":return a.sort(ss),a;case"updated_desc":return a.sort(os),a;case"priority":return a.sort(is),a;case"manual":default:{let c=r();return c?a.sort(lr(c)):a.sort(Ut),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function ur(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},u=n(zr(l,a,c.order),i);s(c,u);let h=await e("ui-order-set",{expected_revision:c.revision,entries:u});if(h&&h.conflict){let b={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(b);let $=n(zr(l,a,b.order),i);s(b,$);let k=await e("ui-order-set",{expected_revision:b.revision,entries:$});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function pr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Wr(t,e){return!e||typeof t!="string"||t.length===0||pr(e.visible_labels).includes(t)?!0:pr(e.hidden_labels).includes(t)?!1:!pr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function _s(t,e){return pr(t).filter(r=>Wr(r,e))}function _t(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function Gr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Rt(t){let e=Gr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function jr(t,e){let r=Gr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var di={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},ui={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},pi={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},fi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function hi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function mi(t,e,r){let n=di[t]||t,s=e&&e.state||"empty",o=fi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return p`
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
  `}var Ai=200,Ti={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ei=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),ws="beads-ui.board.sort",vs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ci(){try{let t=window.localStorage.getItem(ws);if(t&&vs.has(t))return t}catch{}return"created_desc"}function $s(t,e){let r=$e("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,u=e.closedRange||or,h=s?dr(s,i):null,b=ur({transport:o,uiOrderStore:i}),$=[],k=[],T=[],N=[],F=[],z=[],O=!1,R=0,y=Ci(),_=new Map,w=new Map,v=new Map,q=new Set,j={search:"",priority:"",type:"",labels:[]},X=!1,J=null;function De(S){return String(S.status||"open")==="open"}function Fe(S){let C=String(S.status||"open");return C==="open"||C==="blocked"}function Ce(S){let C=j.search.trim().toLowerCase(),Z=j.priority,V=j.type,P=j.labels;return S.filter(g=>{if(C){let E=String(g.id||"").toLowerCase(),A=String(g.title||"").toLowerCase();if(!E.includes(C)&&!A.includes(C))return!1}if(Z!==""&&String(g.priority)!==Z||V!==""&&String(g.issue_type||"")!==V)return!1;if(P.length>0){let E=Array.isArray(g.labels)?g.labels:[];if(!P.some(A=>E.includes(A)))return!1}return!0})}function Ve(){let S=new Set;for(let C of[$,k,T,N,F,z])for(let Z of C){let V=Array.isArray(Z.labels)?Z.labels:[];for(let P of V)typeof P=="string"&&P.length>0&&S.add(P)}return Array.from(S).sort()}function Te(){return j.search.trim()!==""||j.priority!==""||j.type!==""||j.labels.length>0}function ke(){try{if(h){let S=h.selectBoardColumn("tab:board:in-progress","in_progress",y),C=h.selectBoardColumn("tab:board:blocked","blocked",y).filter(Fe),Z=new Set(S.map(H=>H.id)),V=h.selectBoardColumn("tab:board:ready","ready",y).filter(H=>De(H)&&!Z.has(H.id)),P=h.selectBoardColumn("tab:board:resolved","resolved",y),g=h.selectBoardColumn("tab:board:deferred","deferred",y),E=O?g:[],A=h.selectBoardColumn("tab:board:closed","closed").slice(0,Ai),I=[...C,...V,...S,...P,...E,...A];Se(I);let ee=new Set;for(let H of I)H&&H.id&&!Yr(H)&&ee.add(H.id);let he=!Te();$=he?Lt(C,ee):C,k=he?Lt(V,ee):V,T=he?Lt(S,ee):S,N=he?Lt(P,ee):P,F=he?Lt(E,ee):E,R=g.length,z=he?Lt(A,ee):A,_=new Map;for(let H of $)_.set(H.id,"open");for(let H of k)_.set(H.id,"open");for(let H of T)_.set(H.id,"in_progress");for(let H of N)_.set(H.id,"resolved");for(let H of F)_.set(H.id,"deferred");for(let H of z)_.set(H.id,"closed");w=new Map;for(let H of $)w.set(H.id,"blocked-col");for(let H of k)w.set(H.id,"ready-col");for(let H of T)w.set(H.id,"in-progress-col");for(let H of N)w.set(H.id,"resolved-col");for(let H of F)w.set(H.id,"deferred-col");for(let H of z)w.set(H.id,"closed-col")}ye()}catch{$=[],k=[],T=[],N=[],F=[],z=[],v=new Map,ye()}}function Se(S){let C=new Map;for(let V of S)V&&V.id&&!C.has(V.id)&&C.set(V.id,V);let Z=new Map;for(let V of C.values()){let P=Yr(V);if(!P)continue;let g=Z.get(P);g||(g=[],Z.set(P,g)),g.push({id:V.id,title:V.title,status:V.status,metadata:V.metadata,created_at:V.created_at})}v=Z}function He(S){let C=v.get(S)||[],Z=0,V=null;for(let P of C)(P.status==="resolved"||P.status==="closed")&&(Z+=1),!V&&P.status==="in_progress"&&(V=P);return{total:C.length,count:Z,current:V,children:C}}function fe(S){return!q.has(S)}function Xe(S,C){S.preventDefault(),S.stopPropagation(),q.has(C)?q.delete(C):q.add(C),ye()}function de(S,C){S.preventDefault(),S.stopPropagation(),n(C)}function je(S,C){S.preventDefault(),S.stopPropagation(),n(C)}function ae(S,C){J||n(C)}function Ne(S,C){S.preventDefault(),S.stopPropagation(),Ri(C).then(Z=>{Z&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function x(S,C){J=C,S.dataTransfer&&(S.dataTransfer.setData("text/plain",C),S.dataTransfer.effectAllowed="move"),S.target.classList.add("board-card--dragging")}function D(S){S.target.classList.remove("board-card--dragging"),Ze(),setTimeout(()=>{J=null},0)}function Y(S){let C=String(S.target.value||"");!C||C===u||(u=C,a&&a(C),ye())}let U={onCardClick:ae,onCopyId:Ne,onDragStart:x,onDragEnd:D,onClosedRangeChange:Y,rollupFor:He,isExpanded:fe,onRollupToggle:Xe,onChildClick:de,onFromChipClick:je,get policy(){return l?l.get():null}};function ue(S){let C=S.target,Z=t.querySelector(".board-filter__labels");C&&Z&&Z.contains(C)||me()}function te(S){S.key==="Escape"&&me()}function re(){X||(X=!0,document.addEventListener("mousedown",ue),document.addEventListener("keydown",te),ye())}function me(){X&&(X=!1,document.removeEventListener("mousedown",ue),document.removeEventListener("keydown",te),ye())}let oe={onSearchInput(S){j.search=String(S.target.value||""),ke()},onPriorityChange(S){j.priority=String(S.target.value||""),ke()},onTypeChange(S){j.type=String(S.target.value||""),ke()},onSortChange(S){let C=String(S.target.value||"");if(!(!vs.has(C)||C===y)){y=C;try{window.localStorage.setItem(ws,C)}catch{}ke()}},onDeferredToggle(){O=!O,ke()},onLabelMenuToggle(){X?me():re()},onLabelToggle(S){let C=j.labels.indexOf(S);C===-1?j.labels.push(S):j.labels.splice(C,1),ke()},onLabelClear(){j.labels.length!==0&&(j.labels=[],ke())},onNewIssue(){c&&c()}};function Re(){let S=O?"board-root board-root--deferred":"board-root";return p`
      <div class="board-view">
        ${ks(j,oe,{sort_mode:y,show_deferred:O,deferred_count:R,label_options:Ve(),label_menu_open:X})}
        <div class=${S}>
          ${bt({title:"Blocked",id:"blocked-col",items:Ce($)},U)}
          ${bt({title:"Ready",id:"ready-col",items:Ce(k)},U)}
          ${bt({title:"In progress",id:"in-progress-col",items:Ce(T)},U)}
          ${bt({title:"Resolved",id:"resolved-col",items:Ce(N)},U)}
          ${O?bt({title:"Deferred",id:"deferred-col",items:Ce(F)},U):""}
          ${bt({title:"Closed",id:"closed-col",items:Ce(z),is_closed:!0,closed_range:u},U)}
        </div>
      </div>
    `}function ye(){ce(Re(),t),Ee()}function Ee(){try{let S=Array.from(t.querySelectorAll(".board-column"));for(let C of S)Array.from(C.querySelectorAll(".board-card")).forEach((V,P)=>{V.tabIndex=P===0?0:-1})}catch{}}async function we(S,C){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:S,status:C}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Z){r("update-status failed: %o",Z),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Le(S){switch(S){case"blocked-col":return $;case"ready-col":return k;case"in-progress-col":return T;case"resolved-col":return N;case"deferred-col":return F;default:return[]}}function Ye(S,C,Z){if(!o||!i)return;let V=Le(S),P=V.find(ee=>ee.id===C);if(!P)return;let g=V.filter(ee=>ee.id!==C),E=Z.closest?Z.closest(".board-card"):null,A=g.length;if(E){let ee=E.getAttribute("data-issue-id");if(ee===C)return;let he=g.findIndex(H=>H.id===ee);he>=0&&(A=he)}let I=g.slice();I.splice(A,0,P),b.applyReorder(C,I,A)}function Ze(){for(let S of Array.from(t.querySelectorAll(".board-column--drag-over")))S.classList.remove("board-column--drag-over")}let ge=null;t.addEventListener("dragover",S=>{S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move");let Z=S.target.closest(".board-column");Z&&Z!==ge&&(ge&&ge.classList.remove("board-column--drag-over"),Z.classList.add("board-column--drag-over"),ge=Z)}),t.addEventListener("dragleave",S=>{let C=S.relatedTarget;(!C||!t.contains(C))&&ge&&(ge.classList.remove("board-column--drag-over"),ge=null)}),t.addEventListener("drop",S=>{S.preventDefault(),ge&&(ge.classList.remove("board-column--drag-over"),ge=null);let C=S.target,Z=C.closest(".board-column");if(!Z)return;let V=S.dataTransfer?.getData("text/plain")||"";if(!V)return;let P=Z.id,g=w.get(V);if(g&&g===P){if(Ei.has(P)){if(y!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ye(P,V,C)}return}let E=Ti[P];if(!E){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}_.get(V)!==E&&we(V,E)}),t.addEventListener("keydown",S=>{let C=S.target;if(!(C instanceof HTMLElement))return;let Z=String(C.tagName||"").toLowerCase();if(Z==="input"||Z==="textarea"||Z==="select"||Z==="button"||Z==="a"||C.isContentEditable===!0)return;let V=C.closest(".board-card");if(!V)return;let P=String(S.key||"");if(P==="Enter"||P===" "){S.preventDefault();let I=V.getAttribute("data-issue-id");I&&n(I);return}if(P!=="ArrowUp"&&P!=="ArrowDown"&&P!=="ArrowLeft"&&P!=="ArrowRight")return;S.preventDefault();let g=V.closest(".board-column");if(!g)return;let E=Array.from(g.querySelectorAll(".board-card")),A=E.indexOf(V);if(P==="ArrowDown"&&A<E.length-1){_e(V,E[A+1]);return}if(P==="ArrowUp"&&A>0){_e(V,E[A-1]);return}if(P==="ArrowLeft"||P==="ArrowRight"){let I=Array.from(t.querySelectorAll(".board-column")),ee=I.indexOf(g),he=P==="ArrowRight"?1:-1,H=ee+he;for(;H>=0&&H<I.length;){let Oe=I[H].querySelector(".board-card");if(Oe){_e(V,Oe);return}H+=he}}});function _e(S,C){try{S.tabIndex=-1,C.tabIndex=0,C.focus()}catch{}}let Ie=null;h&&h.subscribe&&(Ie=h.subscribe(()=>{try{ke()}catch{}}));let M=null;return l&&l.subscribe&&(M=l.subscribe(()=>{try{ke()}catch{}})),{async load(){r("load"),ke()},clear(){me(),Ie&&(Ie(),Ie=null),M&&(M(),M=null),t.replaceChildren(),$=[],k=[],T=[],N=[],F=[],z=[],_=new Map,w=new Map}}}function Yr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Lt(t,e){return t.filter(r=>{let n=Yr(r);return!(n&&e.has(n))})}async function Ri(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function It(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Li={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ii=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Di=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ct(t){return!!t&&typeof t=="object"}function Vr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function xs(t,e){let r=Vr(t),n=Vr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Oi(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ct(s)&&typeof s.text=="string"?s.text:"").join(""):ct(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Mi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Li[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Vr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=xs(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=xs(ct(l)?l.old_string:"",ct(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ss(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ii.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Di.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ni(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ct(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ss(o.text));else if(o.type==="tool_use"){let i=Mi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ct(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Oi(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Pi(t){if(t.type==="item.completed"&&ct(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Ss(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Fi(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function As(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ct(o))continue;let i=Fi(o)?Pi(o):Ni(o,r);for(let l of i)e.push(l)}return e}function hr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function u(){if(!o||!n)return[];let w=n.get(o);return As(w?w.lines:[])}function h(w,v){if(v.kind==="gate")return p`<div class="sv__gate">${v.text}</div>`;if(v.kind==="phase")return p`<div class="sv__phase">${v.text}</div>`;if(v.kind==="result")return p`<div
        class="sv__result${v.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${v.success?"\u2713":"\u2717"}
        ${v.text||(v.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(v.kind==="error")return p`<div class="sv__error">⛔ ${v.text}</div>`;if(v.kind==="blocker")return p`<div class="sv__error">⛔ ${v.text}</div>`;if(v.kind==="tool"){let q=a.has(w),j=v.tool==="Bash"?v.command:v.path||v.command||"";return p`<div
        class="sv__tool${q?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>N(w)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${v.icon}</span>
          <span class="sv__tool-name">${v.tool}</span>
          ${j?p`<span class="sv__tool-detail">${j}</span>`:""}
          ${typeof v.added=="number"?p`<span class="sv__diff-add">+${v.added}</span>`:""}
          ${typeof v.removed=="number"?p`<span class="sv__diff-del">−${v.removed}</span>`:""}
          ${v.result?p`<span class="sv__tool-ok">→ ${v.result}</span>`:""}
        </span>
        ${q?p`<pre class="sv__tool-expand">${b(v)}</pre>`:""}
      </div>`}return p`<div class="sv__as">${v.text}</div>`}function b(w){let v=[];if(w.input!==void 0)try{v.push(`input: ${JSON.stringify(w.input,null,2)}`)}catch{}return typeof w.output=="string"&&w.output.length>0&&v.push(`output:
${w.output}`),v.join(`

`)}function $(){if(!o)return p``;let w=u(),v=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),q=i.session_id||"",j=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return p`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${q?p`<button
              type="button"
              class="sv__session"
              title=${q}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${q}`}
              @click=${()=>z(q)}
            >
              ⧉ ${q.slice(0,8)}
            </button>`:""}
        ${v?p`<span class="sv__meta">${v}</span>`:""}
        ${i.worktree?p`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${j}
          @click=${F}
        >
          <span class="sv__follow-full">⇣ ${j}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>_()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${w.length===0?p`<div class="sv__empty">세션 로그 없음</div>`:w.map((X,J)=>h(J,X))}
      </div>
    </div>`}function k(){ce($(),t),l&&T()}function T(){let w=t.querySelector(".sv__body");w&&(w.scrollTop=w.scrollHeight)}function N(w){a.has(w)?a.delete(w):a.add(w),k()}function F(){l=!l,k()}function z(w){It(w).then(v=>{v?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function O(w){!o||!w||(i={...i,...w},k())}function R(w){let v=w.target;if(!v||!v.classList||!v.classList.contains("sv__body"))return;!(v.scrollHeight-v.scrollTop-v.clientHeight<=4)&&l&&(l=!1,k())}t.addEventListener("scroll",R,!0);function y(w){let v=w&&w.attempt_id;v&&(o=v,i=w.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(k)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),k())}function _(){let w=o;o=null,a.clear(),r&&w&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${w}`})).catch(()=>{}),ce(p``,t),s&&s()}return{open:y,updateMeta:O,close:_,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",R,!0),o=null,ce(p``,t)}}}function Bi(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Ts(t,e){let r=Bi(t);return p`
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
  `}var Zr=["claude","codex","ccx"],Es={claude:["opus","sonnet","haiku","fable"],codex:["gpt-5.6","gpt-5.4"],ccx:["opus","sonnet","haiku","fable"]},Kr=["low","medium","high","xhigh"],Xr=["codex","opus","fable","self","skip"],Qr=["opus","fable","sonnet","haiku"],qi=["standard","fast_track"],Jr={worker_runner:"(\uAE30\uBCF8: claude)",orchestration_model:"(\uAE30\uBCF8: CLI \uAE30\uBCF8 \uBAA8\uB378)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Ht(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Jr[t]||"(\uAE30\uBCF8)"}function en(t){return Es[String(t||"claude")]||Es.claude}function Dt(t,e,r,n,s,o){return p`
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
    ${Dt("workflow_mode","workflow_mode",Ot(qi),l,n.workflow_mode==="fast_track",e)}
  `}var{entries:Fs,setPrototypeOf:Rs,isFrozen:zi,getPrototypeOf:Ui,getOwnPropertyDescriptor:Hi}=Object,{freeze:qe,seal:Ke,create:ln}=Object,{apply:cn,construct:dn}=typeof Reflect<"u"&&Reflect;qe||(qe=function(e){return e});Ke||(Ke=function(e){return e});cn||(cn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});dn||(dn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var mr=ze(Array.prototype.forEach),Wi=ze(Array.prototype.lastIndexOf),Ls=ze(Array.prototype.pop),Wt=ze(Array.prototype.push),Gi=ze(Array.prototype.splice),_r=ze(String.prototype.toLowerCase),tn=ze(String.prototype.toString),rn=ze(String.prototype.match),Gt=ze(String.prototype.replace),ji=ze(String.prototype.indexOf),Yi=ze(String.prototype.trim),Je=ze(Object.prototype.hasOwnProperty),Be=ze(RegExp.prototype.test),jt=Vi(TypeError);function ze(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return cn(t,e,n)}}function Vi(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return dn(t,r)}}function se(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:_r;Rs&&Rs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(zi(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Zi(t){for(let e=0;e<t.length;e++)Je(t,e)||(t[e]=null);return t}function it(t){let e=ln(null);for(let[r,n]of Fs(t))Je(t,r)&&(Array.isArray(n)?e[r]=Zi(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=it(n):e[r]=n);return e}function Yt(t,e){for(;t!==null;){let n=Hi(t,e);if(n){if(n.get)return ze(n.get);if(typeof n.value=="function")return ze(n.value)}t=Ui(t)}function r(){return null}return r}var Is=qe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),nn=qe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),sn=qe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ki=qe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),on=qe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Xi=qe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ds=qe(["#text"]),Os=qe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),an=qe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ms=qe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),gr=qe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Qi=Ke(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ji=Ke(/<%[\w\W]*|[\w\W]*%>/gm),ea=Ke(/\$\{[\w\W]*/gm),ta=Ke(/^data-[\-\w.\u00B7-\uFFFF]+$/),ra=Ke(/^aria-[\-\w]+$/),Bs=Ke(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),na=Ke(/^(?:\w+script|data):/i),sa=Ke(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),qs=Ke(/^html$/i),oa=Ke(/^[a-z][.\w]*(-[.\w]+)+$/i),Ns=Object.freeze({__proto__:null,ARIA_ATTR:ra,ATTR_WHITESPACE:sa,CUSTOM_ELEMENT:oa,DATA_ATTR:ta,DOCTYPE_NAME:qs,ERB_EXPR:Ji,IS_ALLOWED_URI:Bs,IS_SCRIPT_OR_DATA:na,MUSTACHE_EXPR:Qi,TMPLIT_EXPR:ea}),Vt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ia=function(){return typeof window>"u"?null:window},aa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ps=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function zs(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ia(),e=W=>zs(W);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Vt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:b,trustedTypes:$}=t,k=a.prototype,T=Yt(k,"cloneNode"),N=Yt(k,"remove"),F=Yt(k,"nextSibling"),z=Yt(k,"childNodes"),O=Yt(k,"parentNode");if(typeof i=="function"){let W=r.createElement("template");W.content&&W.content.ownerDocument&&(r=W.content.ownerDocument)}let R,y="",{implementation:_,createNodeIterator:w,createDocumentFragment:v,getElementsByTagName:q}=r,{importNode:j}=n,X=Ps();e.isSupported=typeof Fs=="function"&&typeof O=="function"&&_&&_.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:J,ERB_EXPR:De,TMPLIT_EXPR:Fe,DATA_ATTR:Ce,ARIA_ATTR:Ve,IS_SCRIPT_OR_DATA:Te,ATTR_WHITESPACE:ke,CUSTOM_ELEMENT:Se}=Ns,{IS_ALLOWED_URI:He}=Ns,fe=null,Xe=se({},[...Is,...nn,...sn,...on,...Ds]),de=null,je=se({},[...Os,...an,...Ms,...gr]),ae=Object.seal(ln(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ne=null,x=null,D=Object.seal(ln(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Y=!0,U=!0,ue=!1,te=!0,re=!1,me=!0,oe=!1,Re=!1,ye=!1,Ee=!1,we=!1,Le=!1,Ye=!0,Ze=!1,ge="user-content-",_e=!0,Ie=!1,M={},S=null,C=se({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Z=null,V=se({},["audio","video","img","source","image","track"]),P=null,g=se({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),E="http://www.w3.org/1998/Math/MathML",A="http://www.w3.org/2000/svg",I="http://www.w3.org/1999/xhtml",ee=I,he=!1,H=null,Oe=se({},[E,A,I],tn),wt=se({},["mi","mo","mn","ms","mtext"]),vt=se({},["annotation-xml"]),Ar=se({},["title","style","font","a","script"]),nt=null,Mt=["application/xhtml+xml","text/html"],rr="text/html",f=null,m=null,K=r.createElement("form"),G=function(d){return d instanceof RegExp||d instanceof Function},ne=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(m&&m===d)){if((!d||typeof d!="object")&&(d={}),d=it(d),nt=Mt.indexOf(d.PARSER_MEDIA_TYPE)===-1?rr:d.PARSER_MEDIA_TYPE,f=nt==="application/xhtml+xml"?tn:_r,fe=Je(d,"ALLOWED_TAGS")?se({},d.ALLOWED_TAGS,f):Xe,de=Je(d,"ALLOWED_ATTR")?se({},d.ALLOWED_ATTR,f):je,H=Je(d,"ALLOWED_NAMESPACES")?se({},d.ALLOWED_NAMESPACES,tn):Oe,P=Je(d,"ADD_URI_SAFE_ATTR")?se(it(g),d.ADD_URI_SAFE_ATTR,f):g,Z=Je(d,"ADD_DATA_URI_TAGS")?se(it(V),d.ADD_DATA_URI_TAGS,f):V,S=Je(d,"FORBID_CONTENTS")?se({},d.FORBID_CONTENTS,f):C,Ne=Je(d,"FORBID_TAGS")?se({},d.FORBID_TAGS,f):it({}),x=Je(d,"FORBID_ATTR")?se({},d.FORBID_ATTR,f):it({}),M=Je(d,"USE_PROFILES")?d.USE_PROFILES:!1,Y=d.ALLOW_ARIA_ATTR!==!1,U=d.ALLOW_DATA_ATTR!==!1,ue=d.ALLOW_UNKNOWN_PROTOCOLS||!1,te=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,re=d.SAFE_FOR_TEMPLATES||!1,me=d.SAFE_FOR_XML!==!1,oe=d.WHOLE_DOCUMENT||!1,Ee=d.RETURN_DOM||!1,we=d.RETURN_DOM_FRAGMENT||!1,Le=d.RETURN_TRUSTED_TYPE||!1,ye=d.FORCE_BODY||!1,Ye=d.SANITIZE_DOM!==!1,Ze=d.SANITIZE_NAMED_PROPS||!1,_e=d.KEEP_CONTENT!==!1,Ie=d.IN_PLACE||!1,He=d.ALLOWED_URI_REGEXP||Bs,ee=d.NAMESPACE||I,wt=d.MATHML_TEXT_INTEGRATION_POINTS||wt,vt=d.HTML_INTEGRATION_POINTS||vt,ae=d.CUSTOM_ELEMENT_HANDLING||{},d.CUSTOM_ELEMENT_HANDLING&&G(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ae.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&G(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ae.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ae.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),re&&(U=!1),we&&(Ee=!0),M&&(fe=se({},Ds),de=[],M.html===!0&&(se(fe,Is),se(de,Os)),M.svg===!0&&(se(fe,nn),se(de,an),se(de,gr)),M.svgFilters===!0&&(se(fe,sn),se(de,an),se(de,gr)),M.mathMl===!0&&(se(fe,on),se(de,Ms),se(de,gr))),d.ADD_TAGS&&(typeof d.ADD_TAGS=="function"?D.tagCheck=d.ADD_TAGS:(fe===Xe&&(fe=it(fe)),se(fe,d.ADD_TAGS,f))),d.ADD_ATTR&&(typeof d.ADD_ATTR=="function"?D.attributeCheck=d.ADD_ATTR:(de===je&&(de=it(de)),se(de,d.ADD_ATTR,f))),d.ADD_URI_SAFE_ATTR&&se(P,d.ADD_URI_SAFE_ATTR,f),d.FORBID_CONTENTS&&(S===C&&(S=it(S)),se(S,d.FORBID_CONTENTS,f)),_e&&(fe["#text"]=!0),oe&&se(fe,["html","head","body"]),fe.table&&(se(fe,["tbody"]),delete Ne.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');R=d.TRUSTED_TYPES_POLICY,y=R.createHTML("")}else R===void 0&&(R=aa($,s)),R!==null&&typeof y=="string"&&(y=R.createHTML(""));qe&&qe(d),m=d}},ve=se({},[...nn,...sn,...Ki]),nr=se({},[...on,...Xi]),Oo=function(d){let L=O(d);(!L||!L.tagName)&&(L={namespaceURI:ee,tagName:"template"});let B=_r(d.tagName),be=_r(L.tagName);return H[d.namespaceURI]?d.namespaceURI===A?L.namespaceURI===I?B==="svg":L.namespaceURI===E?B==="svg"&&(be==="annotation-xml"||wt[be]):!!ve[B]:d.namespaceURI===E?L.namespaceURI===I?B==="math":L.namespaceURI===A?B==="math"&&vt[be]:!!nr[B]:d.namespaceURI===I?L.namespaceURI===A&&!vt[be]||L.namespaceURI===E&&!wt[be]?!1:!nr[B]&&(Ar[B]||!ve[B]):!!(nt==="application/xhtml+xml"&&H[d.namespaceURI]):!1},rt=function(d){Wt(e.removed,{element:d});try{O(d).removeChild(d)}catch{N(d)}},ut=function(d,L){try{Wt(e.removed,{attribute:L.getAttributeNode(d),from:L})}catch{Wt(e.removed,{attribute:null,from:L})}if(L.removeAttribute(d),d==="is")if(Ee||we)try{rt(L)}catch{}else try{L.setAttribute(d,"")}catch{}},Tn=function(d){let L=null,B=null;if(ye)d="<remove></remove>"+d;else{let Ae=rn(d,/^[\r\n\t ]+/);B=Ae&&Ae[0]}nt==="application/xhtml+xml"&&ee===I&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");let be=R?R.createHTML(d):d;if(ee===I)try{L=new b().parseFromString(be,nt)}catch{}if(!L||!L.documentElement){L=_.createDocument(ee,"template",null);try{L.documentElement.innerHTML=he?y:be}catch{}}let Pe=L.body||L.documentElement;return d&&B&&Pe.insertBefore(r.createTextNode(B),Pe.childNodes[0]||null),ee===I?q.call(L,oe?"html":"body")[0]:oe?L.documentElement:Pe},En=function(d){return w.call(d.ownerDocument||d,d,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Tr=function(d){return d instanceof h&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof u)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function")},Cn=function(d){return typeof l=="function"&&d instanceof l};function st(W,d,L){mr(W,B=>{B.call(e,d,L,m)})}let Rn=function(d){let L=null;if(st(X.beforeSanitizeElements,d,null),Tr(d))return rt(d),!0;let B=f(d.nodeName);if(st(X.uponSanitizeElement,d,{tagName:B,allowedTags:fe}),me&&d.hasChildNodes()&&!Cn(d.firstElementChild)&&Be(/<[/\w!]/g,d.innerHTML)&&Be(/<[/\w!]/g,d.textContent)||d.nodeType===Vt.progressingInstruction||me&&d.nodeType===Vt.comment&&Be(/<[/\w]/g,d.data))return rt(d),!0;if(!(D.tagCheck instanceof Function&&D.tagCheck(B))&&(!fe[B]||Ne[B])){if(!Ne[B]&&In(B)&&(ae.tagNameCheck instanceof RegExp&&Be(ae.tagNameCheck,B)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(B)))return!1;if(_e&&!S[B]){let be=O(d)||d.parentNode,Pe=z(d)||d.childNodes;if(Pe&&be){let Ae=Pe.length;for(let We=Ae-1;We>=0;--We){let ot=T(Pe[We],!0);ot.__removalCount=(d.__removalCount||0)+1,be.insertBefore(ot,F(d))}}}return rt(d),!0}return d instanceof a&&!Oo(d)||(B==="noscript"||B==="noembed"||B==="noframes")&&Be(/<\/no(script|embed|frames)/i,d.innerHTML)?(rt(d),!0):(re&&d.nodeType===Vt.text&&(L=d.textContent,mr([J,De,Fe],be=>{L=Gt(L,be," ")}),d.textContent!==L&&(Wt(e.removed,{element:d.cloneNode()}),d.textContent=L)),st(X.afterSanitizeElements,d,null),!1)},Ln=function(d,L,B){if(Ye&&(L==="id"||L==="name")&&(B in r||B in K))return!1;if(!(U&&!x[L]&&Be(Ce,L))){if(!(Y&&Be(Ve,L))){if(!(D.attributeCheck instanceof Function&&D.attributeCheck(L,d))){if(!de[L]||x[L]){if(!(In(d)&&(ae.tagNameCheck instanceof RegExp&&Be(ae.tagNameCheck,d)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(d))&&(ae.attributeNameCheck instanceof RegExp&&Be(ae.attributeNameCheck,L)||ae.attributeNameCheck instanceof Function&&ae.attributeNameCheck(L,d))||L==="is"&&ae.allowCustomizedBuiltInElements&&(ae.tagNameCheck instanceof RegExp&&Be(ae.tagNameCheck,B)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(B))))return!1}else if(!P[L]){if(!Be(He,Gt(B,ke,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&d!=="script"&&ji(B,"data:")===0&&Z[d])){if(!(ue&&!Be(Te,Gt(B,ke,"")))){if(B)return!1}}}}}}}return!0},In=function(d){return d!=="annotation-xml"&&rn(d,Se)},Dn=function(d){st(X.beforeSanitizeAttributes,d,null);let{attributes:L}=d;if(!L||Tr(d))return;let B={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0},be=L.length;for(;be--;){let Pe=L[be],{name:Ae,namespaceURI:We,value:ot}=Pe,$t=f(Ae),Er=ot,Me=Ae==="value"?Er:Yi(Er);if(B.attrName=$t,B.attrValue=Me,B.keepAttr=!0,B.forceKeepAttr=void 0,st(X.uponSanitizeAttribute,d,B),Me=B.attrValue,Ze&&($t==="id"||$t==="name")&&(ut(Ae,d),Me=ge+Me),me&&Be(/((--!?|])>)|<\/(style|title|textarea)/i,Me)){ut(Ae,d);continue}if($t==="attributename"&&rn(Me,"href")){ut(Ae,d);continue}if(B.forceKeepAttr)continue;if(!B.keepAttr){ut(Ae,d);continue}if(!te&&Be(/\/>/i,Me)){ut(Ae,d);continue}re&&mr([J,De,Fe],Mn=>{Me=Gt(Me,Mn," ")});let On=f(d.nodeName);if(!Ln(On,$t,Me)){ut(Ae,d);continue}if(R&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!We)switch($.getAttributeType(On,$t)){case"TrustedHTML":{Me=R.createHTML(Me);break}case"TrustedScriptURL":{Me=R.createScriptURL(Me);break}}if(Me!==Er)try{We?d.setAttributeNS(We,Ae,Me):d.setAttribute(Ae,Me),Tr(d)?rt(d):Ls(e.removed)}catch{ut(Ae,d)}}st(X.afterSanitizeAttributes,d,null)},Mo=function W(d){let L=null,B=En(d);for(st(X.beforeSanitizeShadowDOM,d,null);L=B.nextNode();)st(X.uponSanitizeShadowNode,L,null),Rn(L),Dn(L),L.content instanceof o&&W(L.content);st(X.afterSanitizeShadowDOM,d,null)};return e.sanitize=function(W){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,B=null,be=null,Pe=null;if(he=!W,he&&(W="<!-->"),typeof W!="string"&&!Cn(W))if(typeof W.toString=="function"){if(W=W.toString(),typeof W!="string")throw jt("dirty is not a string, aborting")}else throw jt("toString is not a function");if(!e.isSupported)return W;if(Re||ne(d),e.removed=[],typeof W=="string"&&(Ie=!1),Ie){if(W.nodeName){let ot=f(W.nodeName);if(!fe[ot]||Ne[ot])throw jt("root node is forbidden and cannot be sanitized in-place")}}else if(W instanceof l)L=Tn("<!---->"),B=L.ownerDocument.importNode(W,!0),B.nodeType===Vt.element&&B.nodeName==="BODY"||B.nodeName==="HTML"?L=B:L.appendChild(B);else{if(!Ee&&!re&&!oe&&W.indexOf("<")===-1)return R&&Le?R.createHTML(W):W;if(L=Tn(W),!L)return Ee?null:Le?y:""}L&&ye&&rt(L.firstChild);let Ae=En(Ie?W:L);for(;be=Ae.nextNode();)Rn(be),Dn(be),be.content instanceof o&&Mo(be.content);if(Ie)return W;if(Ee){if(we)for(Pe=v.call(L.ownerDocument);L.firstChild;)Pe.appendChild(L.firstChild);else Pe=L;return(de.shadowroot||de.shadowrootmode)&&(Pe=j.call(n,Pe,!0)),Pe}let We=oe?L.outerHTML:L.innerHTML;return oe&&fe["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&Be(qs,L.ownerDocument.doctype.name)&&(We="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+We),re&&mr([J,De,Fe],ot=>{We=Gt(We,ot," ")}),R&&Le?R.createHTML(We):We},e.setConfig=function(){let W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ne(W),Re=!0},e.clearConfig=function(){m=null,Re=!1},e.isValidAttribute=function(W,d,L){m||ne({});let B=f(W),be=f(d);return Ln(B,be,L)},e.addHook=function(W,d){typeof d=="function"&&Wt(X[W],d)},e.removeHook=function(W,d){if(d!==void 0){let L=Wi(X[W],d);return L===-1?void 0:Gi(X[W],L,1)[0]}return Ls(X[W])},e.removeHooks=function(W){X[W]=[]},e.removeAllHooks=function(){X=Ps()},e}var Us=zs();var Hs={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ws=t=>(...e)=>({_$litDirective$:t,values:e}),br=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Zt=class extends br{constructor(e){if(super(e),this.it=xe,e.type!==Hs.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===xe||e==null)return this._t=void 0,this.it=e;if(e===mt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Zt.directiveName="unsafeHTML",Zt.resultType=1;var Gs=Ws(Zt);function hn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kt=hn();function Qs(t){kt=t}var Jt={exec:()=>null};function ie(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Ue.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var la=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ue={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},ca=/^(?:[ \t]*(?:\n|$))+/,da=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ua=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,er=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,pa=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,mn=/(?:[*+-]|\d{1,9}[.)])/,Js=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,eo=ie(Js).replace(/bull/g,mn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),fa=ie(Js).replace(/bull/g,mn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),gn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ha=/^[^\n]+/,_n=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ma=ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",_n).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ga=ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,mn).getRegex(),xr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",bn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,_a=ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",bn).replace("tag",xr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),to=ie(gn).replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex(),ba=ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",to).getRegex(),yn={blockquote:ba,code:da,def:ma,fences:ua,heading:pa,hr:er,html:_a,lheading:eo,list:ga,newline:ca,paragraph:to,table:Jt,text:ha},js=ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex(),ya={...yn,lheading:fa,table:js,paragraph:ie(gn).replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",js).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex()},ka={...yn,html:ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",bn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Jt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ie(gn).replace("hr",er).replace("heading",` *#{1,6} *[^
]`).replace("lheading",eo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},wa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,va=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ro=/^( {2,}|\\)\n(?!\s*$)/,$a=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Sr=/[\p{P}\p{S}]/u,kn=/[\s\p{P}\p{S}]/u,no=/[^\s\p{P}\p{S}]/u,xa=ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,kn).getRegex(),so=/(?!~)[\p{P}\p{S}]/u,Sa=/(?!~)[\s\p{P}\p{S}]/u,Aa=/(?:[^\s\p{P}\p{S}]|~)/u,Ta=ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",la?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),oo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ea=ie(oo,"u").replace(/punct/g,Sr).getRegex(),Ca=ie(oo,"u").replace(/punct/g,so).getRegex(),io="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ra=ie(io,"gu").replace(/notPunctSpace/g,no).replace(/punctSpace/g,kn).replace(/punct/g,Sr).getRegex(),La=ie(io,"gu").replace(/notPunctSpace/g,Aa).replace(/punctSpace/g,Sa).replace(/punct/g,so).getRegex(),Ia=ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,no).replace(/punctSpace/g,kn).replace(/punct/g,Sr).getRegex(),Da=ie(/\\(punct)/,"gu").replace(/punct/g,Sr).getRegex(),Oa=ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ma=ie(bn).replace("(?:-->|$)","-->").getRegex(),Na=ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ma).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),wr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Pa=ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",wr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ao=ie(/^!?\[(label)\]\[(ref)\]/).replace("label",wr).replace("ref",_n).getRegex(),lo=ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",_n).getRegex(),Fa=ie("reflink|nolink(?!\\()","g").replace("reflink",ao).replace("nolink",lo).getRegex(),Ys=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,wn={_backpedal:Jt,anyPunctuation:Da,autolink:Oa,blockSkip:Ta,br:ro,code:va,del:Jt,emStrongLDelim:Ea,emStrongRDelimAst:Ra,emStrongRDelimUnd:Ia,escape:wa,link:Pa,nolink:lo,punctuation:xa,reflink:ao,reflinkSearch:Fa,tag:Na,text:$a,url:Jt},Ba={...wn,link:ie(/^!?\[(label)\]\((.*?)\)/).replace("label",wr).getRegex(),reflink:ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",wr).getRegex()},un={...wn,emStrongRDelimAst:La,emStrongLDelim:Ca,url:ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ys).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ys).getRegex()},qa={...un,br:ie(ro).replace("{2,}","*").getRegex(),text:ie(un.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},yr={normal:yn,gfm:ya,pedantic:ka},Kt={normal:wn,gfm:un,breaks:qa,pedantic:Ba},za={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Vs=t=>za[t];function at(t,e){if(e){if(Ue.escapeTest.test(t))return t.replace(Ue.escapeReplace,Vs)}else if(Ue.escapeTestNoEncode.test(t))return t.replace(Ue.escapeReplaceNoEncode,Vs);return t}function Zs(t){try{t=encodeURI(t).replace(Ue.percentDecode,"%")}catch{return null}return t}function Ks(t,e){let r=t.replace(Ue.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Ue.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ue.slashPipe,"|");return n}function Xt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Ua(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Xs(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Ha(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var vr=class{constructor(t){pe(this,"options");pe(this,"rules");pe(this,"lexer");this.options=t||kt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Xt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Ha(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Xt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Xt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Xt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${u}`:u;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=h,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let $=b,k=$.raw+`
`+r.join(`
`),T=this.blockquote(k);o[o.length-1]=T,n=n.substring(0,n.length-$.raw.length)+T.raw,s=s.substring(0,s.length-$.text.length)+T.text;break}else if(b?.type==="list"){let $=b,k=$.raw+`
`+r.join(`
`),T=this.list(k);o[o.length-1]=T,n=n.substring(0,n.length-b.raw.length)+T.raw,s=s.substring(0,s.length-$.raw.length)+T.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",u="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),b=t.split(`
`,1)[0],$=!h.trim(),k=0;if(this.options.pedantic?(k=2,u=h.trimStart()):$?k=e[1].length+1:(k=e[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,u=h.slice(k),k+=e[1].length),$&&this.rules.other.blankLine.test(b)&&(c+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let T=this.rules.other.nextBulletRegex(k),N=this.rules.other.hrRegex(k),F=this.rules.other.fencesBeginRegex(k),z=this.rules.other.headingBeginRegex(k),O=this.rules.other.htmlBeginRegex(k);for(;t;){let R=t.split(`
`,1)[0],y;if(b=R,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),y=b):y=b.replace(this.rules.other.tabCharGlobal,"    "),F.test(b)||z.test(b)||O.test(b)||T.test(b)||N.test(b))break;if(y.search(this.rules.other.nonSpaceChar)>=k||!b.trim())u+=`
`+y.slice(k);else{if($||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||F.test(h)||z.test(h)||N.test(h))break;u+=`
`+b}!$&&!b.trim()&&($=!0),c+=R+`
`,t=t.substring(R.length+1),h=y.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=u.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),u=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=u}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Ks(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Ks(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Xt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ua(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Xs(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Xs(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...n[0]][0].length,h=t.slice(0,s+n.index+u+i);if(Math.min(s,i)%2){let $=h.slice(1,-1);return{type:"em",raw:h,text:$,tokens:this.lexer.inlineTokens($)}}let b=h.slice(2,-2);return{type:"strong",raw:h,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},et=class pn{constructor(e){pe(this,"tokens");pe(this,"options");pe(this,"state");pe(this,"inlineQueue");pe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||kt,this.options.tokenizer=this.options.tokenizer||new vr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ue,block:yr.normal,inline:Kt.normal};this.options.pedantic?(r.block=yr.pedantic,r.inline=Kt.pedantic):this.options.gfm&&(r.block=yr.gfm,this.options.breaks?r.inline=Kt.breaks:r.inline=Kt.gfm),this.tokenizer.rules=r}static get rules(){return{block:yr,inline:Kt}}static lex(e,r){return new pn(r).lex(e)}static lexInline(e,r){return new pn(r).inlineTokens(e)}lex(e){e=e.replace(Ue.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,h=e.slice(1),b;this.options.extensions.startInline.forEach($=>{b=$.call({lexer:this},h),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},$r=class{constructor(t){pe(this,"options");pe(this,"parser");this.options=t||kt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Ue.notSpaceStart)?.[0],s=t.replace(Ue.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${at(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Zs(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+at(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Zs(t);if(s===null)return at(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${at(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:at(t.text)}},vn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},tt=class fn{constructor(e){pe(this,"options");pe(this,"renderer");pe(this,"textRenderer");this.options=e||kt,this.options.renderer=this.options.renderer||new $r,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vn}static parse(e,r){return new fn(r).parse(e)}static parseInline(e,r){return new fn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},kr,Qt=(kr=class{constructor(t){pe(this,"options");pe(this,"block");this.options=t||kt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?et.lex:et.lexInline}provideParser(){return this.block?tt.parse:tt.parseInline}},pe(kr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),pe(kr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),kr),Wa=class{constructor(...t){pe(this,"defaults",hn());pe(this,"options",this.setOptions);pe(this,"parse",this.parseMarkdown(!0));pe(this,"parseInline",this.parseMarkdown(!1));pe(this,"Parser",tt);pe(this,"Renderer",$r);pe(this,"TextRenderer",vn);pe(this,"Lexer",et);pe(this,"Tokenizer",vr);pe(this,"Hooks",Qt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new $r(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new vr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Qt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Qt.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Qt.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let u=l.call(s,c);return a.call(s,u)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return et.lex(t,e??this.defaults)}parser(t,e){return tt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?et.lex:et.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?tt.parse:tt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?et.lex:et.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?tt.parse:tt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+at(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},yt=new Wa;function le(t,e){return yt.parse(t,e)}le.options=le.setOptions=function(t){return yt.setOptions(t),le.defaults=yt.defaults,Qs(le.defaults),le};le.getDefaults=hn;le.defaults=kt;le.use=function(...t){return yt.use(...t),le.defaults=yt.defaults,Qs(le.defaults),le};le.walkTokens=function(t,e){return yt.walkTokens(t,e)};le.parseInline=yt.parseInline;le.Parser=tt;le.parser=tt.parse;le.Renderer=$r;le.TextRenderer=vn;le.Lexer=et;le.lexer=et.lex;le.Tokenizer=vr;le.Hooks=Qt;le.parse=le;var Oc=le.options,Mc=le.setOptions,Nc=le.use,Pc=le.walkTokens,Fc=le.parseInline;var Bc=tt.parse,qc=et.lex;function co(t){let e=le.parse(t),r=Us.sanitize(e);return Gs(r)}function Ga(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function uo(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(k){k.key==="Escape"&&s&&(k.preventDefault(),b())}document.addEventListener("keydown",a);function c(){return s?p`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ga(s)}</span
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
                  </div>`:co(i)}
          </div>
        </div>
      </div>
    `:p``}function u(){ce(c(),t)}async function h(k){s=k,o="loading",i="",l="",u();let T=r?r():"";if(!T){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",u();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",u();return}let N="/api/doc?workspace="+encodeURIComponent(T)+"&path="+encodeURIComponent(k);try{let F=await n(N),z=await F.json().catch(()=>({}));if(!F.ok||!z||z.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(z&&z.error||F.status)+")",u();return}i=String(z.content||""),o="ready",u()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",u()}}function b(){s=null,ce(p``,t)}function $(){document.removeEventListener("keydown",a),b()}return{open:h,close:b,destroy:$}}var ja={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ya(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function po(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return p`
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
  `}var Va=["open","in_progress","deferred","resolved","closed"],Za=[0,1,2,3,4];function fo(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,u={},h=!1,b=!1,$="",k="",T="";function N(){h=!1,b=!1,$="",k="",T=""}let F=document.createElement("div");F.className="md-viewer-root",document.body.appendChild(F);let z=uo(F,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),O=document.createElement("div");O.className="session-log-root",document.body.appendChild(O);let R=hr(O,{transport:s?(g,E)=>Promise.resolve(s(g,E)):void 0,sessionLogStore:l});function y(){if(!i||!a)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(A=>A&&A.bead_id===a).sort((A,I)=>(I.started_at||0)-(A.started_at||0)).map(A=>({attempt_id:A.attempt_id,bead_id:A.bead_id,status:A.status,started_at:typeof A.started_at=="number"?A.started_at:null,runner:A.runner||null,model:A.model||null,session_id:A.session_id||null,resumed_from:A.resumed_from||null}))}function _(g){let E=i?i.get():null,A=E&&E.attempts?E.attempts[g]:null;R.open({attempt_id:g,meta:A?{runner:A.runner||void 0,model:A.model||void 0,effort:A.effort||void 0,status:A.status||void 0,session_id:A.session_id||void 0}:{}})}async function w(g){if(!s||!g)return;let E=()=>{let I=i?i.get():null;return I&&typeof I.revision=="number"?I.revision:0},A=await s("worker-attempt-resume",{attempt_id:g,expected_revision:E()});if(A&&A.conflict){let I=A.queue&&typeof A.queue.revision=="number"?A.queue.revision:E();A=await s("worker-attempt-resume",{attempt_id:g,expected_revision:I})}A&&A.resumed===!1&&!A.conflict&&A.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${A.reason}`,"error",2400)}let v={onOpen:_,onResume:w};function q(){let g=i?i.get():null,E=g&&g.exec_defaults;return E&&typeof E=="object"?E:{}}let j=null;r&&r.subscribe&&(j=r.subscribe(()=>De()));let X=null;i&&typeof i.subscribe=="function"&&(X=i.subscribe(()=>{a&&P()}));function J(g){g.key==="Escape"&&a&&(g.preventDefault(),n())}document.addEventListener("keydown",J);function De(){if(a){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+a)||[];c=g.find(A=>A&&A.id===a)||g[0]||c}P()}}function Fe(g){It(g).then(E=>{E?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ce(g){g.preventDefault(),g.stopPropagation(),a&&Fe(a)}function Ve(g,E){g.preventDefault(),g.stopPropagation(),Fe(E)}function Te(g,E){g.preventDefault(),g.stopPropagation(),z.open(E)}function ke(g,E){u[g]=E,P(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:g,value:E})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Se(g,E,A){if(!s||!a)return!1;try{let I=await Promise.resolve(s(g,E)),ee=Array.isArray(I)?I[0]:I;return ee&&typeof ee=="object"&&ee.id?(c=ee,!0):(Q(A,"error"),!1)}catch{return Q(A,"error"),!1}}function He(g){setTimeout(()=>{try{let E=t.querySelector(g);E&&typeof E.focus=="function"&&E.focus()}catch{}},0)}function fe(){h=!0,$=c&&c.title||"",P(),He('.detail-edit__input[data-edit="title"]')}function Xe(g){$=g.target.value}function de(){h=!1,$="",P()}function je(){Se("edit-text",{id:a,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(h=!1,$=""),P()})}function ae(){b=!0,k=c&&c.description||"",P(),He('.detail-edit__textarea[data-edit="description"]')}function Ne(g){k=g.target.value}function x(){b=!1,k="",P()}function D(){Se("edit-text",{id:a,field:"description",value:k},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(b=!1,k=""),P()})}function Y(g,E,A,I){if(g.key==="Escape"){g.stopPropagation(),A();return}g.key==="Enter"&&(!I||g.ctrlKey||g.metaKey)&&(g.preventDefault(),E())}function U(g){let E=g.target.value;Se("update-status",{id:a,status:E},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>P())}function ue(g){let E=Number(g.target.value);Se("update-priority",{id:a,priority:E},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>P())}function te(g){T=g.target.value}function re(){let g=T.trim();g.length!==0&&Se("label-add",{id:a,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(E=>{E&&(T=""),P()})}function me(g){if(g.key==="Escape"){g.stopPropagation(),T="",P();return}g.key==="Enter"&&(g.preventDefault(),re())}function oe(g){Se("label-remove",{id:a,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>P())}let Re={onCopyPath:Ve,onOpenDoc:Te},ye={onChange:ke};function Ee(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function we(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Le(g){let A=(Array.isArray(g.dependencies)?g.dependencies:[]).map(I=>({id:Ee(I),icon:we(I)})).filter(I=>I.id.length>0);return p`
      <div class="detail-section-label">의존성</div>
      ${A.length===0?p`<div class="detail-empty">의존성 없음</div>`:p`<div class="detail-deps">
            ${A.map(I=>o?p`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(I.id)}
                  >
                    ${I.icon?`${I.icon} `:""}${I.id}
                  </button>`:p`<span class="detail-dep"
                    >${I.icon?`${I.icon} `:""}${I.id}</span
                  >`)}
          </div>`}
    `}function Ye(g){let E=g.metadata||{},A=g.workflow||{},I=A.stages||{},ee=I.spec&&I.spec.stale,he=I.impl&&I.impl.stale,H=A.route_source==="derived",Oe=A.route||E.route||"\u2014";return p`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${H?" detail-kv__v--derived":""}"
          title=${H?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${H&&A.route?`${Oe} ? (\uCD94\uB860)`:Oe}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${E.spec_review||"\uC5C6\uC74C"}${ee?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${E.impl_review||"\uC5C6\uC74C"}${he?" \xB7 stale":""}</span
        >
      </div>
      ${E.pr_url?p`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${E.pr_url}</span>
          </div>`:""}
    `}let Ze={route:["spec_backed","full_plan"],merge_policy:["auto_merge","pr_stop"],drift_policy:["auto_rereview","halt"]};async function ge(g,E){let A=E.target.value;if(g==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&A!=="full_plan"&&!window.confirm(`full_plan \u2192 ${A||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){P();return}await Se("update-workflow-meta",{id:a,key:g,value:A},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),P()}function _e(g){let E=g.metadata||{},A=(I,ee)=>{let he=Ze[I],H=typeof E[I]=="string"?E[I]:"";return p`<div class="detail-kv">
        <span class="detail-kv__k">${I}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${I}
          data-edit=${`wfmeta-${I}`}
          @change=${Oe=>ge(I,Oe)}
        >
          <option value="" ?selected=${!he.includes(H)}>
            ${ee}
          </option>
          ${he.map(Oe=>p`<option value=${Oe} ?selected=${H===Oe}>${Oe}</option>`)}
        </select>
      </div>`};return p`
      ${A("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")}
      ${A("merge_policy","(\uAE30\uBCF8 auto_merge)")}
      ${A("drift_policy","(\uAE30\uBCF8 auto_rereview)")}
    `}function Ie(g){return h?p`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${Xe}
            @keydown=${E=>Y(E,je,de,!1)}
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
              @click=${de}
            >
              취소
            </button>
          </div>
        </div>
      `:p`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${fe}
        >
          ✎
        </button>
      </div>
    `}function M(g){let E=Rt(g.created_at),A=Rt(g.updated_at);return!E&&!A?p``:p`
      ${E?p`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
      ${A?p`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
    `}function S(g,E){return p`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${U}
        >
          ${Va.map(A=>p`<option value=${A} ?selected=${A===g}>${A}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ue}
        >
          ${Za.map(A=>p`<option value=${String(A)} ?selected=${A===E}>
                P${A}
              </option>`)}
        </select>
      </div>
    `}function C(g){return p`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":p`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ae}
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
              .value=${k}
              @input=${Ne}
              @keydown=${E=>Y(E,D,x,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${D}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${x}
              >
                취소
              </button>
            </div>
          </div>`:p`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Z(g){let E=Array.isArray(g.labels)?g.labels:[];return p`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${E.map(A=>p`<span class="detail-label-chip"
              >${A}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${A}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+A}
                @click=${()=>oe(A)}
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
            @input=${te}
            @keydown=${me}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${re}
          >
            추가
          </button>
        </span>
      </div>
    `}function V(){if(!a)return p``;let g=c||{},E=String(g.id||a),A=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",I=g.status||"open",ee=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",he=g.description||"",H={...g,metadata:{...g.metadata||{},...u}};return p`
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
            ${E}
          </button>
          ${Ie(A)} ${S(I,ee)}
          ${M(g)} ${C(he)}
          ${Z(g)} ${Le(g)}
          ${Ye(g)} ${_e(g)}
          ${Ts(g,Re)}
          ${Cs(H,ye,q())}
          ${po(y(),v)}
        </div>
      </div>
    `}function P(){ce(V(),t)}return{load(g){g!==a&&(u={},N()),a=g,c=null,De()},clear(){a=null,c=null,u={},N(),z.close(),R.close(),ce(p``,t)},destroy(){j&&(j(),j=null),X&&(X(),X=null),document.removeEventListener("keydown",J),z.destroy(),F.parentNode&&F.parentNode.removeChild(F),R.destroy(),O.parentNode&&O.parentNode.removeChild(O),a=null,c=null,ce(p``,t)}}}var Ka=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ho(t,e){return Wr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Xa(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function mo(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(_){let w=r.get();if(w)try{let v=await n("display-policy-set",{expected_revision:w.revision,policy:_(w)});a(v),v&&v.conflict&&v.policy&&(v=await n("display-policy-set",{expected_revision:v.policy.revision,policy:_(v.policy)}),a(v)),v&&v.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(_){_&&_.policy&&typeof _.policy=="object"&&r.set(_.policy)}function c(_){let w=r.get();if(!w)return;let v=ho(_,w)!=="shown";l(q=>Xa(_,q,v))}function u(){let _=i.trim();_.length!==0&&(i="",l(w=>w.hidden_prefixes.includes(_)?{hidden_prefixes:w.hidden_prefixes}:{hidden_prefixes:[...w.hidden_prefixes,_]}),N())}function h(_){l(w=>({hidden_prefixes:w.hidden_prefixes.filter(v=>v!==_)}))}function b(_){let w=r.get();if(!w)return;let v=w.chips[_]===!1;l(()=>({chips:{[_]:v}}))}function $(_){let w=s();return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${w.length===0?p`<div class="display-settings__empty">라벨 없음</div>`:p`<div class="display-settings__pills">
              ${w.map(v=>{let q=ho(v,_);return p`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${q}`}
                  data-label=${v}
                  data-state=${q}
                  @click=${()=>c(v)}
                >
                  ${v}
                </button>`})}
            </div>`}
      </section>
    `}function k(_){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${_.hidden_prefixes.map(w=>p`<span class="display-settings__prefix">
                ${w}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${w} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h(w)}
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
            @input=${w=>{i=String(w.target.value||"")}}
          />
          <button type="button" @click=${u}>추가</button>
        </div>
      </section>
    `}function T(_){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Ka.map(([w,v])=>p`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${w}
                  .checked=${_.chips[w]!==!1}
                  @change=${()=>b(w)}
                />
                <span>${v}</span>
              </label>`)}
        </div>
      </section>
    `}function N(){let _=r.get();ce(p`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${y}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${_?p`${$(_)} ${k(_)}
                ${T(_)}`:p`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let F=!1,z=()=>{F=!1};o.addEventListener("close",z),o.addEventListener("cancel",z);let O=null;r.subscribe&&(O=r.subscribe(()=>{F&&N()}));function R(){F||(i="",F=!0,N(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function y(){F&&(F=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:R,close:y,destroy(){F=!1,o.removeEventListener("close",z),o.removeEventListener("cancel",z),O&&(O(),O=null),o.remove()}}}function go(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,u,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let b=typeof h=="string"?h.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function _o(t,e,r){let n=$e("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return p`
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
    `}function l(){ce(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),ce(p``,t)}}}var bo=["bug","feature","task","epic","chore"];function yo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ko=["Critical","High","Medium","Low","Backlog"];function wo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),u=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let y=document.createElement("option");y.value="",y.textContent="\u2014 Select \u2014",o.appendChild(y);for(let _ of bo){let w=document.createElement("option");w.value=_,w.textContent=yo(_),o.appendChild(w)}i.replaceChildren();for(let _=0;_<=4;_+=1){let w=document.createElement("option");w.value=String(_);let v=ko[_]||"Medium";w.textContent=`${_} \u2013 ${v}`,i.appendChild(w)}}$();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function T(y){s.disabled=y,o.disabled=y,i.disabled=y,l.disabled=y,a.disabled=y,u.disabled=y,h.disabled=y,h.textContent=y?"Creating\u2026":"Create"}function N(){c.textContent=""}function F(y){c.textContent=y}function z(){try{let y=window.localStorage.getItem("beads-ui.new.type");y?o.value=y:o.value="";let _=window.localStorage.getItem("beads-ui.new.priority");_&&/^\d$/.test(_)?i.value=_:i.value="2"}catch{o.value="",i.value="2"}}function O(){let y=o.value||"",_=i.value||"";y.length>0&&window.localStorage.setItem("beads-ui.new.type",y),_.length>0&&window.localStorage.setItem("beads-ui.new.priority",_)}async function R(){N();let y=String(s.value||"").trim();if(y.length===0){F("Title is required"),s.focus();return}let _=Number(i.value||"2");if(!(_>=0&&_<=4)){F("Priority must be 0..4"),i.focus();return}let w=String(o.value||""),v=String(a.value||""),q={title:y};w.length>0&&(q.type=w),String(_).length>0&&(q.priority=_),v.length>0&&(q.description=v),T(!0);try{await e("create-issue",q)}catch{T(!1),F("Failed to create issue");return}O(),T(!1),k()}return r.addEventListener("cancel",y=>{y.preventDefault(),k()}),b.addEventListener("click",()=>k()),u.addEventListener("click",()=>k()),r.addEventListener("keydown",y=>{y.key==="Enter"&&(y.ctrlKey||y.metaKey)&&(y.preventDefault(),R())}),n.addEventListener("submit",y=>{y.preventDefault(),R()}),{open(){n.reset(),N(),z();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var Qa=[{key:"worker_runner",values:()=>Zr},{key:"orchestration_model",values:t=>en(t)},{key:"orchestration_effort",values:()=>Kr},{key:"review_model",values:()=>Xr},{key:"impl_model",values:()=>Qr}],Ja=[{key:"merge_policy",values:["auto_merge","pr_stop"],default_label:"(\uAE30\uBCF8 auto_merge)"},{key:"drift_policy",values:["auto_rereview","halt"],default_label:"(\uAE30\uBCF8 auto_rereview)"}];function vo(t,e){let{queueStore:r,transport:n}=e,s=document.createElement("dialog");s.id="worker-exec-defaults-dialog",s.className="exec-defaults",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),t.appendChild(s);function o(){return r&&r.get()||{revision:0,exec_defaults:{}}}function i(){let O=o();return typeof O.revision=="number"?O.revision:0}function l(){let O=o().exec_defaults;return O&&typeof O=="object"?O:{}}function a(O){O&&O.queue&&r&&r.set(O.queue)}async function c(O,R){if(!n)return;let y={key:O,value:R||null};try{let _=await n("worker-queue-set-exec-default",{...y,expected_revision:i()});a(_),_&&_.conflict&&(_=await n("worker-queue-set-exec-default",{...y,expected_revision:i()}),a(_)),_&&_.conflict&&Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}async function u(O,R){if(!n)return;let y={key:O,value:R||null};try{let _=await n("worker-queue-set-policy",{...y,expected_revision:i()});a(_),_&&_.conflict&&(_=await n("worker-queue-set-policy",{...y,expected_revision:i()}),a(_)),_&&_.conflict&&Q("\uC804\uC5ED \uC815\uCC45 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uC804\uC5ED \uC815\uCC45 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function h(O,R,y){let _=!!y&&!R.includes(y);return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${O}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${O}`}
        data-key=${O}
        @change=${w=>{c(O,w.target.value)}}
      >
        <option value="" ?selected=${!y}>
          ${Jr[O]||"(\uAE30\uBCF8)"}
        </option>
        ${_?p`<option value=${y} ?selected=${!0}>
              ${y} (비호환)
            </option>`:""}
        ${R.map(w=>p`<option value=${w} ?selected=${y===w}>${w}</option>`)}
      </select>
    </div>`}function b(O,R){let y=typeof R[O.key]=="string"?R[O.key]:"";return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${O.key}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${O.key}`}
        data-policy-key=${O.key}
        @change=${_=>{u(O.key,_.target.value)}}
      >
        <option value="" ?selected=${!O.values.includes(y)}>
          ${O.default_label}
        </option>
        ${O.values.map(_=>p`<option value=${_} ?selected=${y===_}>${_}</option>`)}
      </select>
    </div>`}function $(){let O=o(),R=l(),y=R.worker_runner||"";ce(p`
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
            ${Qa.map(_=>h(_.key,_.values(y),R[_.key]||""))}
            <p class="exec-defaults__hint exec-defaults__hint--policy">
              전역 정책 (좁은 화면에서 상단 바 대신 여기서 편집)
            </p>
            ${Ja.map(_=>b(_,O))}
          </div>
        </div>
      `,s)}let k=!1,T=()=>{k=!1};s.addEventListener("close",T),s.addEventListener("cancel",T);let N=null;r&&r.subscribe&&(N=r.subscribe(()=>{k&&$()}));function F(){k||(k=!0,$(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))}function z(){k&&(k=!1,typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:F,close:z,destroy(){k=!1,s.removeEventListener("close",T),s.removeEventListener("cancel",T),N&&(N(),N=null),s.remove()}}}function el(t){let e=t.draggable&&!t.done;return p`<div
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
                ?disabled=${!t.breaker.resume_eligible}
                title=${t.breaker.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.breaker.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
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
  </div>`}var sl="tab:worker:ready",ol="tab:worker:blocked";function il(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function al(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function ll(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function $n(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l}=e,a=n?dr(n,i):null,c=ur({transport:r,uiOrderStore:i}),u=null,h=[],b=[],$=document.createElement("div");$.className="worker-console";let k=document.createElement("div"),T=document.createElement("div");T.className="worker-drawer-host";let N=document.createElement("div");N.className="worker-lanes-host",$.append(k,T,N),t.appendChild($);let F=null,z=hr(T,{transport:r,sessionLogStore:o,onClose:()=>{F=null,Te()}}),O=vo($,{queueStore:s,transport:r});function R(){return s&&s.get()||{revision:0,auto_advance:!1,serial:[],parallel:[],done:[]}}function y(){let x=R();return typeof x.revision=="number"?x.revision:0}function _(x){x&&x.queue&&s&&s.set(x.queue)}async function w(x,D,Y){if(!r)return;let U=await r("worker-queue-place",{bead_id:x,lane:D,index:Y,expected_revision:y()});_(U),U&&U.conflict&&await r("worker-queue-place",{bead_id:x,lane:D,index:Y,expected_revision:y()}).then(_)}async function v(x,D,Y){if(!r)return;let U=await r("worker-queue-reorder",{bead_id:x,lane:D,to_index:Y,expected_revision:y()});_(U),U&&U.conflict&&await r("worker-queue-reorder",{bead_id:x,lane:D,to_index:Y,expected_revision:y()}).then(_)}async function q(x){if(!r)return;let D=await r("worker-queue-remove",{bead_id:x,expected_revision:y()});_(D),D&&D.conflict&&await r("worker-queue-remove",{bead_id:x,expected_revision:y()}).then(_)}async function j(x){!r||!x||await r("worker-attempt-stop",{attempt_id:x})}async function X(x){if(!r||!x)return;let D=await r("worker-attempt-resume",{attempt_id:x,expected_revision:y()});_(D),D&&D.conflict&&(D=await r("worker-attempt-resume",{attempt_id:x,expected_revision:y()}),_(D)),D&&D.resumed===!1&&!D.conflict&&D.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${D.reason}`,"error",2400)}async function J(x){if(!r)return;let D=await r("worker-queue-toggle",{on:x,expected_revision:y()});_(D),D&&D.conflict&&await r("worker-queue-toggle",{on:x,expected_revision:y()}).then(_)}async function De(x,D){if(!r)return;let Y={key:x,value:D||null},U=await r("worker-queue-set-policy",{...Y,expected_revision:y()});_(U),U&&U.conflict&&await r("worker-queue-set-policy",{...Y,expected_revision:y()}).then(_)}function Fe(){let x=R(),D=a?a.selectBoardColumn(sl,"ready"):[],Y=a?a.selectBoardColumn(ol,"blocked"):[],U=new Map;for(let M of[...D,...Y])U.set(M.id,M.title||M.id);let ue=new Set([...x.serial.map(M=>M.bead_id),...x.parallel.map(M=>M.bead_id),...x.done.map(M=>M.bead_id)]),te=new Set(Y.map(M=>M.id)),re=i?i.get()?.order||{}:{},me=new Set,oe=[];for(let M of[...D,...Y])ue.has(M.id)||me.has(M.id)||al(M)||(me.add(M.id),oe.push(M));oe.sort(lr(re)),h=oe;let Re=x.admission||{},ye=M=>Re[M]?`\u26D4 ${Re[M].reason}`:"",Ee=oe.map(M=>{let S=il(M),C=[];te.has(M.id)&&C.push(ll(M)),S||C.push("spec \uC5C6\uC74C");let Z=ye(M.id);return Z&&C.push(Z),{id:M.id,title:M.title||M.id,reason:C.join(" \xB7 "),draggable:S,lane:"candidate",workflow:M.workflow,status:M.status}}),we=(M,S)=>M.map(C=>({id:C.bead_id,title:U.get(C.bead_id)||C.bead_id,reason:S==="done"?"":ye(C.bead_id),draggable:S!=="done",done:S==="done",lane:S})),Le=new Map;for(let M of x.serial||[])Le.set(M.bead_id,"serial");for(let M of x.parallel||[])Le.set(M.bead_id,"parallel");let Ye=x.attempts?Object.values(x.attempts):[],Ze=new Set;for(let M of Ye)M&&typeof M.resumed_from=="string"&&M.resumed_from.length>0&&Ze.add(M.resumed_from);let ge=[],_e=null;for(let M of Ye)M.status==="running"?ge.push({bead_id:M.bead_id,attempt_id:M.attempt_id,title:U.get(M.bead_id)||M.bead_id,lane:Le.get(M.bead_id)||"parallel",runner:M.runner||null,model:M.model||null,effort:M.effort||null,started_at:typeof M.started_at=="number"?M.started_at:null,merge_policy:M.merge_policy||null,demoted_reason:M.demoted_reason||null,resumed_from:M.resumed_from||null}):(M.status==="failed"||M.status==="orphaned")&&(_e=M);let Ie=null;if(_e){let M=typeof _e.session_id=="string"&&_e.session_id.length>0,S=Ze.has(_e.attempt_id);Ie={repo:_e.repo||"",reason:_e.cause||_e.status,resume_attempt_id:_e.attempt_id,resume_eligible:M&&!S,resume_reason:M?S?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}return{queue:x,idToTitle:U,candidates:Ee,running:ge,breaker:Ie,serial:we(x.serial,"serial"),parallel:we(x.parallel,"parallel"),done:we(x.done,"done")}}function Ce(x){let D=x.serial.length>0?x.serial[0].id:"\u2014",Y=x.queue.workspace_info||{},U=Y.verify_cmd&&Array.isArray(Y.verify_cmd.cmd)?Y.verify_cmd.cmd.join(" "):null,te=!!Y.verify_cmd&&Y.verify_cmd.source==="detected"?" (\uC790\uB3D9 \uAC10\uC9C0)":"",re=U?`verify_cmd \u2014 \uC124\uC815 \uD30C\uC77C \uBA85\uC2DC > \uC790\uB3D9 \uAC10\uC9C0 > \uC5C6\uC74C, \uBBF8\uC124\uC815 \uC2DC auto_merge\uAC00 pr_stop\uC73C\uB85C \uAC15\uB4F1. \uC804\uCCB4 \uBA85\uB839: ${U}${te}`:"verify_cmd \u2014 \uC124\uC815 \uD30C\uC77C \uBA85\uC2DC > \uC790\uB3D9 \uAC10\uC9C0 > \uC5C6\uC74C, \uBBF8\uC124\uC815 \uC2DC auto_merge\uAC00 pr_stop\uC73C\uB85C \uAC15\uB4F1",me=(oe,Re,ye)=>{let Ee=typeof x.queue[oe]=="string"?x.queue[oe]:"";return p`<label class="worker-policy">
        <span class="worker-policy__k">${oe}</span>
        <select
          class="worker-policy__sel"
          aria-label=${`\uC804\uC5ED ${oe}`}
          data-policy-key=${oe}
          @change=${we=>{De(oe,we.target.value)}}
        >
          <option value="" ?selected=${!Re.includes(Ee)}>
            ${ye}
          </option>
          ${Re.map(we=>p`<option value=${we} ?selected=${Ee===we}>${we}</option>`)}
        </select>
      </label>`};return p`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${x.queue.auto_advance?" is-active":""}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${x.running.length}</b> · serial 다음
          <b>${D}</b></span
        >
        <span class="worker-tgl"
          >parallel slot <b>${x.parallel.length}</b></span
        >
        ${me("merge_policy",["auto_merge","pr_stop"],"(\uAE30\uBCF8 auto_merge)")}
        ${me("drift_policy",["auto_rereview","halt"],"(\uAE30\uBCF8 auto_rereview)")}
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
          class="worker-verifycmd${U?"":" worker-verifycmd--unset"}"
          title=${re}
        >
          ${U?p`<span class="worker-verifycmd__full"
                  >verify_cmd:
                  <code>${U}</code>${te}</span
                ><span class="worker-verifycmd__badge"
                  >verify_cmd ✓${te}</span
                >`:p`<span class="worker-verifycmd__full"
                  >verify_cmd: 미설정 (auto_merge→pr_stop 강등)</span
                ><span class="worker-verifycmd__badge"
                  >verify_cmd 미설정 ⤵pr_stop</span
                >`}</span
        >
      </div>
      ${$o({autoAdvance:!!x.queue.auto_advance,breaker:x.breaker})}
      ${xo(x.running,Date.now(),F)}`}function Ve(x){return p`<div class="worker-lanes">
      ${tr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:x.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${tr({id:"worker-pane-serial",lane:"serial",title:"Serial \uD050",items:x.serial,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${tr({id:"worker-pane-parallel",lane:"parallel",title:"Parallel \uD480",items:x.parallel,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${tr({id:"worker-pane-done",lane:"done",title:`Done \xB7 \uC624\uB298 ${x.done.length}`,items:x.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Te(){let x=Fe();ce(Ce(x),k),ce(Ve(x),N)}function ke(x){let D=x.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!D)return;let Y=D.dataset.beadId||"",U=D.dataset.lane||"";u={bead_id:Y,from_lane:U};try{x.dataTransfer?.setData("text/plain",Y),x.dataTransfer&&(x.dataTransfer.effectAllowed="move")}catch{}}function Se(x){let D=x.target?.closest?.(".worker-pane");D&&(x.preventDefault(),x.dataTransfer&&(x.dataTransfer.dropEffect="move"),D.classList.add("worker-pane--drag-over"))}function He(x){x.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function fe(x,D){let Y=h.find(re=>re.id===x);if(!Y)return;let U=h.filter(re=>re.id!==x),ue=U.length;if(D){let re=D.dataset.beadId;if(re===x)return;let me=U.findIndex(oe=>oe.id===re);me>=0&&(ue=me)}let te=U.slice();te.splice(ue,0,Y),c.applyReorder(x,te,ue)}function Xe(x){let D=x.target?.closest?.(".worker-pane");if(!D)return;x.preventDefault(),D.classList.remove("worker-pane--drag-over");let Y=D.dataset.lane||"",U=u?.bead_id||x.dataTransfer?.getData("text/plain")||"",ue=u?.from_lane||"";if(u=null,!U)return;let te=x.target?.closest?.(".worker-mini, .worker-card"),re=Array.from(D.querySelectorAll(".worker-mini, .worker-card")),me=re.length;if(te){let oe=re.indexOf(te);oe>=0&&(me=oe)}if(Y==="candidate"){if(ue==="candidate"){fe(U,te);return}(ue==="serial"||ue==="parallel")&&q(U);return}(Y==="serial"||Y==="parallel")&&(ue===Y?v(U,Y,me):w(U,Y,me))}function de(x){return x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,worktree:x.worktree||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}}function je(x){let D=R(),Y=D.attempts?D.attempts[x]:null;F=x,z.open({attempt_id:x,meta:de(Y)}),Te()}function ae(){if(!F)return;let x=R(),D=x.attempts?x.attempts[F]:null;D&&z.updateMeta(de(D))}function Ne(x){let D=x.target;if(D?.closest?.("#worker-exec-defaults-dialog"))return;if(D?.closest?.(".worker-exec-defaults-btn")){O.open();return}let Y=D?.closest?.(".worker-banner__resume");if(Y){let te=Y.dataset.attemptId;te&&X(te);return}if(D?.closest?.(".worker-play")){J(!0);return}if(D?.closest?.(".worker-pause")){J(!1);return}if(D?.closest?.(".rtile__stop")){let re=D?.closest?.(".rtile")?.dataset?.attemptId;re&&j(re);return}if(D?.closest?.(".rtile__info")){let re=D?.closest?.(".rtile")?.dataset?.beadId;re&&l&&l(re);return}if(D?.closest?.(".worker-drawer-host"))return;let U=D?.closest?.(".rtile");if(U){let te=U.dataset.attemptId;te&&je(te);return}let ue=D?.closest?.(".worker-mini, .worker-card");if(ue){let te=ue.dataset.beadId;if(D?.closest?.(".worker-mini__id, .worker-card__id")){te&&It(te).then(re=>{re?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}te&&l&&l(te)}}return t.addEventListener("dragstart",ke),t.addEventListener("dragover",Se),t.addEventListener("dragleave",He),t.addEventListener("drop",Xe),t.addEventListener("click",Ne),a&&b.push(a.subscribe(Te)),s&&b.push(s.subscribe(()=>{Te(),ae()})),Te(),{load(){Te()},destroy(){for(let x of b.splice(0))try{x()}catch{}t.removeEventListener("dragstart",ke),t.removeEventListener("dragover",Se),t.removeEventListener("dragleave",He),t.removeEventListener("drop",Xe),t.removeEventListener("click",Ne);try{z.destroy()}catch{}try{O.destroy()}catch{}ce(p``,t)}}}function xn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function So(t,e,r,n=async()=>{},s=async()=>{}){let o=$e("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function u(_){let v=_.target.value,j=e.getState().workspace?.current?.path||"";if(v&&v!==j){o("switching workspace to %s",v),l=!0,y();try{await r(v)}catch(X){o("workspace switch failed: %o",X)}finally{l=!1,y()}}}async function h(){let _=e.getState(),w=_.workspace?.current?.path||_.workspace?.available?.[0]?.path||"";if(!(!w||a)){o("git-pulling workspace %s",w),a=!0,y();try{await n(w)}catch(v){o("workspace git pull failed: %o",v)}finally{a=!1,y()}}}function b(_){let w=_.target;w&&t.contains(w)||T()}function $(_){_.key==="Escape"&&T()}function k(){c||(c=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",$),y())}function T(){c&&(c=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",$),y())}function N(){c?T():k()}async function F(_){let w=_.target,v=w.value,q=w.checked;o("toggling visibility %s \u2192 %s",v,String(q));try{await s(v,q)}catch(j){o("workspace visibility toggle failed: %o",j)}}function z(_){return _?p`
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
    `:p``}function O(_,w){return p`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${N}
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
                ${_.map(v=>p`
                    <label
                      class="workspace-picker__manage-row"
                      title="${v.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${v.path}"
                        .checked=${!w.has(v.path)}
                        @change=${F}
                      />
                      <span class="workspace-picker__manage-name"
                        >${xn(v.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function R(){let _=e.getState(),w=_.workspace?.current,v=_.workspace?.available||[],q=new Set(_.workspace?.hidden||[]),j=w?.path||v[0]?.path||"";if(v.length===0)return p``;let X=v.filter(J=>!q.has(J.path)||J.path===j);if(X.length<=1){let J=X[0]||v[0],De=xn(J.path);return p`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${J.path}"
            >${De}</span
          >
          ${O(v,q)}
          ${z(j)}
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
          ${X.map(J=>p`
              <option
                value="${J.path}"
                ?selected=${J.path===j}
                title="${J.path}"
              >
                ${xn(J.path)}
              </option>
            `)}
        </select>
        ${O(v,q)}
        ${z(j)}
        ${l||a?p`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function y(){ce(R(),t)}return y(),i=e.subscribe(()=>y()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",$),ce(p``,t)}}}var Ao=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-policy","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-stop","worker-attempt-resume","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Sn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function To(t,e,r=Sn()){return{id:r,type:t,payload:e}}function Eo(t={}){let e=$e("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,u=[],h=new Map,b=new Set;function $(R){for(let y of Array.from(b))try{y(R)}catch{}}function k(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),$(o);let R=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),y=(r.jitterRatio||0)*R,_=Math.max(0,Math.round(R+(Math.random()*2-1)*y));e("ws retry in %d ms (attempt %d)",_,i+1),l=setTimeout(()=>{l=null,O()},_)}function T(R){try{s?.send(JSON.stringify(R))}catch(y){e("ws send failed",y)}}function N(){for(o="open",e("ws open"),$(o),i=0;u.length;){let R=u.shift();R&&T(R)}}function F(R){let y;try{y=JSON.parse(String(R.data))}catch{e("ws received non-JSON message");return}if(!y||typeof y.id!="string"||typeof y.type!="string"){e("ws received invalid envelope");return}if(c.has(y.id)){let w=c.get(y.id);c.delete(y.id),y.ok?w?.resolve(y.payload):w?.reject(y.error||new Error("ws error"));return}let _=h.get(y.type);if(_&&_.size>0)for(let w of Array.from(_))try{w(y.payload)}catch(v){e("ws event handler error",v)}else e("ws received unhandled message type: %s",y.type)}function z(){o="closed",e("ws closed"),$(o);for(let[R,y]of c.entries())y.reject(new Error("ws disconnected")),c.delete(R);i+=1,k()}function O(){if(!a)return;let R=n();try{s=new WebSocket(R),e("ws connecting %s",R),o="connecting",$(o),s.addEventListener("open",N),s.addEventListener("message",F),s.addEventListener("error",()=>{}),s.addEventListener("close",z)}catch(y){e("ws connect failed %o",y),k()}}return O(),{send(R,y){if(!Ao.includes(R))return Promise.reject(new Error(`unknown message type: ${R}`));let _=Sn(),w=To(R,y,_);return e("send %s id=%s",R,_),new Promise((v,q)=>{c.set(_,{resolve:v,reject:q,type:R}),s&&s.readyState===s.OPEN?T(w):(e("queue %s id=%s (state=%s)",R,_,o),u.push(w))})},on(R,y){h.has(R)||h.set(R,new Set);let _=h.get(R);return _?.add(y),()=>{_?.delete(y)}},onConnection(R){return b.add(R),()=>{b.delete(R)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,O()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function cl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function dl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var An=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Co=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Ro="worker:queue",Lo="ui:order",Io="ui:display-policy",dt="tab:board:closed",Do="beads-ui.board.closed-range";function ul(t){let e=$e("main");e("bootstrap start");let r=p`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ce(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let v=function(f,m){let K="Request failed",G="";if(f&&typeof f=="object"){let ve=f;if(typeof ve.message=="string"&&ve.message.length>0&&(K=ve.message),typeof ve.details=="string")G=ve.details;else if(ve.details&&typeof ve.details=="object")try{G=JSON.stringify(ve.details,null,2)}catch{G=""}}else typeof f=="string"&&f.length>0&&(K=f);let ne=m&&m.length>0?`Failed to load ${m}`:"Request failed";w.open(ne,K,G)},ae=function(f){return`${I.getState().workspace.current?.path||""}\0${f}`},Ne=function(){Te&&(Te().catch(()=>{}),Te=null),ke=null,Se=null},D=function(f){He=f;let m=()=>{He!==f||I.getState().selected_id!==f||(He=null,x(f))};if(!de){Xe.then(m);return}m()},te=function(){let f=Yn(ue);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},re=function(f){if(f)for(let[m,K]of An){if(Y.has(m)||U.has(m))continue;let G=m===dt?te():{type:K};try{J.register(m,G)}catch(ne){e("register %s store failed: %o",m,ne)}U.add(m),X.subscribeList(m,G).then(ne=>{Y.set(m,ne)}).catch(ne=>{e("subscribe %s failed: %o",m,ne),v(ne,"board")}).finally(()=>{U.delete(m)})}else oe()},oe=function(){for(let[f]of An){let m=Y.get(f);m&&(m().catch(()=>{}),Y.delete(f));try{J.unregister(f)}catch(K){e("unregister %s failed: %o",f,K)}}},Ee=function(f){if(!f){we();return}for(let[m,K]of Co)if(!(Re.has(m)||U.has(m))){try{J.register(m,{type:K})}catch(G){e("register %s store failed: %o",m,G)}U.add(m),X.subscribeList(m,{type:K}).then(G=>{Re.set(m,G)}).catch(G=>{e("subscribe %s failed: %o",m,G),v(G,"worker")}).finally(()=>{U.delete(m)})}ye||(j("subscribe-worker-queue",{id:Ro}).catch(m=>{e("subscribe-worker-queue failed: %o",m)}),ye=()=>j("unsubscribe-worker-queue",{id:Ro}))},we=function(){for(let[f]of Co){let m=Re.get(f);m&&(m().catch(()=>{}),Re.delete(f));try{J.unregister(f)}catch(K){e("unregister %s failed: %o",f,K)}}ye&&(ye().catch(()=>{}),ye=null)},Ye=function(){Le||(j("subscribe-ui-order",{id:Lo}).catch(f=>{e("subscribe-ui-order failed: %o",f)}),Le=()=>j("unsubscribe-ui-order",{id:Lo}))},Ze=function(){Le&&(Le().catch(()=>{}),Le=null),Fe.clear()},_e=function(){ge||(j("subscribe-display-policy",{id:Io}).catch(f=>{e("subscribe-display-policy failed: %o",f)}),ge=()=>j("unsubscribe-display-policy",{id:Io}))},Ie=function(){ge&&(ge().catch(()=>{}),ge=null),Ce.clear()},P=function(f){if(!f)return"Unknown";let m=f.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var l=v,a=ae,c=Ne,u=D,h=te,b=re,$=oe,k=Ee,T=we,N=Ye,F=Ze,z=_e,O=Ie,R=P;let y=document.getElementById("header-loading"),_=gs(y),w=go(t),q=Eo(),j=_.wrapSend((f,m)=>q.send(f,m)),X=cs(j),J=ds(),De=ps(),Fe=us(),Ce=Vn(),Ve=Zn();q.on("worker-queue-snapshot",f=>{let m=f;if(m&&m.queue)try{De.set(m.queue)}catch{}}),q.on("ui-order-snapshot",f=>{let m=f;if(m&&typeof m.revision=="number")try{Fe.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),q.on("display-policy-snapshot",f=>{let m=f;if(m&&m.policy&&typeof m.policy=="object")try{Ce.set(m.policy)}catch{}}),q.on("session-log-snapshot",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{Ve.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[])}catch{}}),q.on("session-log-append",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{Ve.append(m.attempt_id,m.event)}catch{}}),q.on("snapshot",f=>{let m=f,K=m&&typeof m.id=="string"?m.id:"",G=K?J.getStore(K):null;if(G&&m&&m.type==="snapshot")try{G.applyPush(m)}catch{}}),q.on("upsert",f=>{let m=f,K=m&&typeof m.id=="string"?m.id:"",G=K?J.getStore(K):null;if(G&&m&&m.type==="upsert")try{G.applyPush(m)}catch{}}),q.on("delete",f=>{let m=f,K=m&&typeof m.id=="string"?m.id:"",G=K?J.getStore(K):null;if(G&&m&&m.type==="delete")try{G.applyPush(m)}catch{}});let Te=null,ke=null,Se=null,He=null,fe=()=>{},Xe=new Promise(f=>{fe=()=>f(void 0)}),de=!1,je=!1;async function x(f){let m=ae(f);if(m===ke||m===Se)return;Se=m;let K=`detail:${f}`,G={type:"issue-detail",params:{id:f}};try{J.register(K,G)}catch(ne){e("register detail store failed: %o",ne)}try{let ne=await X.subscribeList(K,G);if(I.getState().selected_id!==f||ae(f)!==m){await ne().catch(()=>{});return}Te&&await Te().catch(()=>{}),Te=ne,ke=m}catch(ne){e("detail subscribe failed: %o",ne),v(ne,"issue details")}finally{Se===m&&(Se=null)}}let Y=new Map,U=new Set,ue=or;try{let f=window.localStorage.getItem(Do);Br(f)&&(ue=f)}catch{}async function me(f){if(!Br(f)||f===ue)return;ue=f;try{window.localStorage.setItem(Do,f)}catch{}let m=Y.get(dt);if(!m)return;Y.delete(dt),await m().catch(()=>{});let K=te();try{J.register(dt,K)}catch(G){e("register %s store failed: %o",dt,G)}try{let G=await X.subscribeList(dt,K);Y.set(dt,G)}catch(G){e("re-subscribe %s failed: %o",dt,G),v(G,"board")}}let Re=new Map,ye=null,Le=null,ge=null;async function M(){ge=null,Ce.clear();let f=I.getState().workspace.current?.path;if(f)try{await q.send("set-workspace",{path:f})}catch(m){e("workspace restore after reconnect failed: %o",m);return}_e()}async function S(){e("clearing all subscriptions for workspace switch"),oe(),we(),De.clear(),Ze(),Ye(),Ie(),_e(),Ne();let f=I.getState();if(f.selected_id)try{J.unregister(`detail:${f.selected_id}`)}catch{}let m=I.getState();re(m.view==="board"),Ee(m.view==="worker"),m.selected_id&&D(m.selected_id)}async function C(f){e("requesting workspace switch to %s",f),je=!0;try{let m=await q.send("set-workspace",{path:f});e("workspace switch result: %o",m),m&&m.workspace&&(I.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),m.changed&&(await S(),Q("Switched to "+P(f),"success",2e3)))}catch(m){throw e("workspace switch failed: %o",m),Q("Failed to switch workspace","error",3e3),m}finally{je=!1}}async function Z(f){e("requesting workspace git pull for %s",f);try{let m=await q.send("git-pull-workspace",{});e("workspace git pull result: %o",m);let K=m?.status;if(K==="up_to_date"){Q("Already up to date","success",2e3);return}if(K==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+P(f),"success",2e3)}catch(m){e("workspace git pull failed: %o",m);let K=m?.code,G=m?.message;if(K==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(K==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(K==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let ne=G?`: ${G}`:"";throw Q(`Git pull failed${ne}`,"error",3e3),m}}async function V(f,m){e("setting workspace visibility %s \u2192 %s",f,String(m));try{await q.send("set-workspace-visibility",{path:f,visible:m}),await g()}catch(K){e("workspace visibility update failed: %o",K),Q("Failed to update project visibility","error",3e3)}}async function g(){try{let f=await q.send("list-workspaces",{});if(e("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let m=f.workspaces.map(ve=>({path:ve.path,database:ve.database,pid:ve.pid,version:ve.version})),K=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,G=Array.isArray(f.hidden)?f.hidden.filter(ve=>typeof ve=="string"):[];I.setState({workspace:{current:K,available:m,hidden:G}});let ne=window.localStorage.getItem("beads-ui.workspace");ne&&(!m.some(nr=>nr.path===ne)||G.includes(ne)?window.localStorage.removeItem("beads-ui.workspace"):K&&ne!==K.path&&(e("restoring saved workspace preference: %s",ne),await C(ne)))}}catch(f){e("failed to load workspaces: %o",f)}}q.on("workspace-changed",f=>{e("workspace-changed event: %o",f),f&&f.root_dir&&(I.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),g(),S())});let E=!1;if(typeof q.onConnection=="function"){let f=m=>{e("ws state %s",m),m==="reconnecting"||m==="closed"?(E=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&E&&(E=!1,Q("Reconnected","success",2200),dl(I,(K,G)=>{e(`${K}: %o`,G)}),M())};q.onConnection(f)}let A="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker")&&(A=f)}catch(f){e("view parse error: %o",f)}let I=ms({config:cl(),view:A}),ee=fs(I);ee.start();let he=async(f,m)=>{try{return await j(f,m)}catch{return[]}};n&&_o(n,I,ee);let H=document.getElementById("workspace-picker");H&&So(H,I,C,Z,V);let Oe=wo(t,(f,m)=>j(f,m));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>Oe.open())}catch{}let wt=mo(t,{policyStore:Ce,transport:(f,m)=>j(f,m),labelOptions:()=>{let f=new Set;for(let[m]of An)for(let K of J.snapshotFor(m)||[]){let G=K.labels;if(Array.isArray(G))for(let ne of G)typeof ne=="string"&&ne.length>0&&f.add(ne)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>wt.open())}catch{}let vt=$s(s,{gotoIssue:f=>ee.gotoIssue(f),issueStores:J,transport:he,uiOrderStore:Fe,displayPolicyStore:Ce,closedRange:ue,onClosedRangeChange:f=>{me(f)},onNewIssue:()=>Oe.open()}),Ar=$n(o,{transport:he,issueStores:J,queueStore:De,sessionLogStore:Ve,uiOrderStore:Fe,gotoIssue:f=>I.setState({selected_id:f})}),nt=fo(i,{issueStores:J,transport:he,queueStore:De,sessionLogStore:Ve,getWorkspacePath:()=>I.getState().workspace.current?.path,onNavigate:f=>{I.getState().view==="worker"?I.setState({selected_id:f}):ee.gotoIssue(f)},onClose:()=>{let f=I.getState();I.setState({selected_id:null});try{ee.gotoView(f.view==="worker"?"worker":"board")}catch{}}}),Mt=I.getState().selected_id;Mt&&(i.hidden=!1,nt.load(Mt),D(Mt)),I.subscribe(f=>{let m=f.selected_id;m?(i.hidden=!1,nt.load(m),je||D(m)):(nt.clear(),i.hidden=!0,Ne())});let rr=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",re(f.view==="board"),Ee(f.view==="worker"),!f.selected_id&&f.view==="board"&&vt.load(),f.view==="worker"&&Ar.load(),window.localStorage.setItem("beads-ui.view",f.view)};I.subscribe(rr),rr(I.getState()),Ye(),_e(),g().finally(()=>{de=!0,fe()}),window.addEventListener("keydown",f=>{let m=f.ctrlKey||f.metaKey,K=String(f.key||"").toLowerCase(),G=f.target,ne=G&&G.tagName?String(G.tagName).toLowerCase():"",ve=ne==="input"||ne==="textarea"||ne==="select"||G&&typeof G.isContentEditable=="boolean"&&G.isContentEditable;m&&K==="n"&&(ve||(f.preventDefault(),Oe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&ul(e)});export{ul as bootstrap,cl as readBootstrapConfig,dl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
