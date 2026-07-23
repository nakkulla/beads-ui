var Oo=Object.create;var Er=Object.defineProperty;var Mo=Object.getOwnPropertyDescriptor;var No=Object.getOwnPropertyNames;var Po=Object.getPrototypeOf,Fo=Object.prototype.hasOwnProperty;var Bo=(t,e,r)=>e in t?Er(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Cr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var zo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of No(e))!Fo.call(t,s)&&s!==r&&Er(t,s,{get:()=>e[s],enumerable:!(n=Mo(e,s))||n.enumerable});return t};var qo=(t,e,r)=>(r=t!=null?Oo(Po(t)):{},zo(e||!t||!t.__esModule?Er(r,"default",{value:t,enumerable:!0}):r,t));var pe=(t,e,r)=>Bo(t,typeof e!="symbol"?e+"":e,r);var Zn=Cr((ml,Vn)=>{var At=1e3,Tt=At*60,Et=Tt*60,mt=Et*24,jo=mt*7,Yo=mt*365.25;Vn.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Vo(t);if(r==="number"&&isFinite(t))return e.long?Ko(t):Zo(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Vo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Yo;case"weeks":case"week":case"w":return r*jo;case"days":case"day":case"d":return r*mt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Et;case"minutes":case"minute":case"mins":case"min":case"m":return r*Tt;case"seconds":case"second":case"secs":case"sec":case"s":return r*At;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Zo(t){var e=Math.abs(t);return e>=mt?Math.round(t/mt)+"d":e>=Et?Math.round(t/Et)+"h":e>=Tt?Math.round(t/Tt)+"m":e>=At?Math.round(t/At)+"s":t+"ms"}function Ko(t){var e=Math.abs(t);return e>=mt?sr(t,e,mt,"day"):e>=Et?sr(t,e,Et,"hour"):e>=Tt?sr(t,e,Tt,"minute"):e>=At?sr(t,e,At,"second"):t+" ms"}function sr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Xn=Cr((bl,Kn)=>{function Xo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Zn(),r.destroy=c,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let h=0;for(let _=0;_<u.length;_++)h=(h<<5)-h+u.charCodeAt(_),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(u){let h,_=null,w,k;function S(...O){if(!S.enabled)return;let I=S,P=Number(new Date),F=P-(h||P);I.diff=F,I.prev=h,I.curr=P,h=P,O[0]=r.coerce(O[0]),typeof O[0]!="string"&&O.unshift("%O");let C=0;O[0]=O[0].replace(/%([a-zA-Z%])/g,(m,E)=>{if(m==="%%")return"%";C++;let D=r.formatters[E];if(typeof D=="function"){let W=O[C];m=D.call(I,W),O.splice(C,1),C--}return m}),r.formatArgs.call(I,O),(I.log||r.log).apply(I,O)}return S.namespace=u,S.useColors=r.useColors(),S.color=r.selectColor(u),S.extend=n,S.destroy=r.destroy,Object.defineProperty(S,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(w!==r.namespaces&&(w=r.namespaces,k=r.enabled(u)),k),set:O=>{_=O}}),typeof r.init=="function"&&r.init(S),S}function n(u,h){let _=r(this.namespace+(typeof h>"u"?":":h)+u);return _.log=this.log,_}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let h=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of h)_[0]==="-"?r.skips.push(_.slice(1)):r.names.push(_)}function o(u,h){let _=0,w=0,k=-1,S=0;for(;_<u.length;)if(w<h.length&&(h[w]===u[_]||h[w]==="*"))h[w]==="*"?(k=w,S=_,w++):(_++,w++);else if(k!==-1)w=k+1,S++,_=S;else return!1;for(;w<h.length&&h[w]==="*";)w++;return w===h.length}function i(){let u=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),u}function l(u){for(let h of r.skips)if(o(u,h))return!1;for(let h of r.names)if(o(u,h))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Kn.exports=Xo});var Qn=Cr((Ye,or)=>{Ye.formatArgs=Jo;Ye.save=ei;Ye.load=ti;Ye.useColors=Qo;Ye.storage=ri();Ye.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ye.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Qo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Jo(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+or.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Ye.log=console.debug||console.log||(()=>{});function ei(t){try{t?Ye.storage.setItem("debug",t):Ye.storage.removeItem("debug")}catch{}}function ti(){let t;try{t=Ye.storage.getItem("debug")||Ye.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function ri(){try{return localStorage}catch{}}or.exports=Xn()(Ye);var{formatters:ni}=or.exports;ni.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Nt=globalThis,rr=Nt.trustedTypes,On=rr?rr.createPolicy("lit-html",{createHTML:t=>t}):void 0,zn="$lit$",lt=`lit$${Math.random().toFixed(9).slice(2)}$`,qn="?"+lt,Uo=`<${qn}>`,ht=document,Pt=()=>ht.createComment(""),Ft=t=>t===null||typeof t!="object"&&typeof t!="function",Nr=Array.isArray,Ho=t=>Nr(t)||typeof t?.[Symbol.iterator]=="function",Rr=`[ 	
\f\r]`,Mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Mn=/-->/g,Nn=/>/g,pt=RegExp(`>|${Rr}(?:([^\\s"'>=/]+)(${Rr}*=${Rr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pn=/'/g,Fn=/"/g,Un=/^(?:script|style|textarea|title)$/i,Pr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),f=Pr(1),dl=Pr(2),ul=Pr(3),gt=Symbol.for("lit-noChange"),xe=Symbol.for("lit-nothing"),Bn=new WeakMap,ft=ht.createTreeWalker(ht,129);function Hn(t,e){if(!Nr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return On!==void 0?On.createHTML(e):e}var Wo=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Mt;for(let l=0;l<r;l++){let a=t[l],c,u,h=-1,_=0;for(;_<a.length&&(i.lastIndex=_,u=i.exec(a),u!==null);)_=i.lastIndex,i===Mt?u[1]==="!--"?i=Mn:u[1]!==void 0?i=Nn:u[2]!==void 0?(Un.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=pt):u[3]!==void 0&&(i=pt):i===pt?u[0]===">"?(i=s??Mt,h=-1):u[1]===void 0?h=-2:(h=i.lastIndex-u[2].length,c=u[1],i=u[3]===void 0?pt:u[3]==='"'?Fn:Pn):i===Fn||i===Pn?i=pt:i===Mn||i===Nn?i=Mt:(i=pt,s=void 0);let w=i===pt&&t[l+1].startsWith("/>")?" ":"";o+=i===Mt?a+Uo:h>=0?(n.push(c),a.slice(0,h)+zn+a.slice(h)+lt+w):a+lt+(h===-2?l:w)}return[Hn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Bt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,u]=Wo(e,r);if(this.el=t.createElement(c,n),ft.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=ft.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(zn)){let _=u[i++],w=s.getAttribute(h).split(lt),k=/([.?@])?(.*)/.exec(_);a.push({type:1,index:o,name:k[2],strings:w,ctor:k[1]==="."?Ir:k[1]==="?"?Dr:k[1]==="@"?Or:St}),s.removeAttribute(h)}else h.startsWith(lt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Un.test(s.tagName)){let h=s.textContent.split(lt),_=h.length-1;if(_>0){s.textContent=rr?rr.emptyScript:"";for(let w=0;w<_;w++)s.append(h[w],Pt()),ft.nextNode(),a.push({type:2,index:++o});s.append(h[_],Pt())}}}else if(s.nodeType===8)if(s.data===qn)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(lt,h+1))!==-1;)a.push({type:7,index:o}),h+=lt.length-1}o++}}static createElement(e,r){let n=ht.createElement("template");return n.innerHTML=e,n}};function $t(t,e,r=t,n){if(e===gt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Ft(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=$t(t,s._$AS(t,e.values),s,n)),e}var Lr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??ht).importNode(r,!0);ft.currentNode=s;let o=ft.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new zt(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Mr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=ft.nextNode(),i++)}return ft.currentNode=ht,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},zt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=xe,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=$t(this,e,r),Ft(e)?e===xe||e==null||e===""?(this._$AH!==xe&&this._$AR(),this._$AH=xe):e!==this._$AH&&e!==gt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ho(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==xe&&Ft(this._$AH)?this._$AA.nextSibling.data=e:this.T(ht.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Bt.createElement(Hn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Lr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=Bn.get(e.strings);return r===void 0&&Bn.set(e.strings,r=new Bt(e)),r}k(e){Nr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Pt()),this.O(Pt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},St=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=xe,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=xe}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=$t(this,e,r,0),i=!Ft(e)||e!==this._$AH&&e!==gt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=$t(this,l[n+a],r,a),c===gt&&(c=this._$AH[a]),i||(i=!Ft(c)||c!==this._$AH[a]),c===xe?e=xe:e!==xe&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===xe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ir=class extends St{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===xe?void 0:e}},Dr=class extends St{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==xe)}},Or=class extends St{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=$t(this,e,r,0)??xe)===gt)return;let n=this._$AH,s=e===xe&&n!==xe||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==xe&&(n===xe||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Mr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){$t(this,e)}};var Go=Nt.litHtmlPolyfillSupport;Go?.(Bt,zt),(Nt.litHtmlVersions??(Nt.litHtmlVersions=[])).push("3.3.1");var ue=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new zt(e.insertBefore(Pt(),o),o,void 0,r??{})}return s._$AI(t),s};var nr="today",Wn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Fr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Gn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function jn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Yn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var Jn=qo(Qn(),1);function we(t){return(0,Jn.default)(`beads-ui:${t}`)}function Xe(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function qt(t,e){let r=Xe(t.created_at),n=Xe(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function rs(t,e){let r=Xe(t.created_at),n=Xe(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ns(t,e){let r=Xe(t.updated_at),n=Xe(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function ss(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=Xe(t.created_at),o=Xe(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function os(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var si=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function es(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ts(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=si.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function is(t,e){let r=es(t),n=es(e);if(r!==n)return r<n?-1:1;let s=ts(t),o=ts(e);if(s!==o)return s<o?-1:1;let i=Xe(t&&t.created_at),l=Xe(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var Br=2**20;function Ct(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-Xe(t&&t.created_at)}function ir(t){return(e,r)=>{let n=Ct(e,t),s=Ct(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function zr(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ct(l,r)-Br};if(!l)return{rank:Ct(i,r)+Br};let a=Ct(i,r),c=Ct(l,r),u=(a+c)/2;return a<u&&u<c?{rank:u}:{renormalize:n.map((h,_)=>({bead_id:h.id,rank:_*Br}))}}function qr(t,e={}){let r=we(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||qt;function c(){for(let _ of Array.from(i))try{_()}catch{}}function u(){s=Array.from(n.values()).sort(a)}function h(_){if(l||!_||_.id!==t)return;let w=Number(_.revision)||0;if(r("apply %s rev=%d",_.type,w),!(w<=o&&_.type!=="snapshot")){if(_.type==="snapshot"){if(w<=o)return;n.clear();let k=Array.isArray(_.issues)?_.issues:[];for(let S of k)S&&typeof S.id=="string"&&S.id.length>0&&n.set(S.id,S);u(),o=w,c();return}if(_.type==="upsert"){let k=_.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let S=n.get(k.id);if(!S)n.set(k.id,k);else{let O=Number.isFinite(S.updated_at)?S.updated_at:0,I=Number.isFinite(k.updated_at)?k.updated_at:0;if(O<=I){for(let P of Object.keys(S))P in k||delete S[P];for(let[P,F]of Object.entries(k))S[P]=F}}u()}o=w,c()}else if(_.type==="delete"){let k=String(_.issue_id||"");k&&(n.delete(k),u()),o=w,c()}}}return{id:t,subscribe(_){return i.add(_),()=>{i.delete(_)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(_){return n.get(_)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function ar(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function as(t){let e=we("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let u=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let w of Array.from(c)){let k=r.get(w);if(!k)continue;let S=k.itemsById;for(let O of u)typeof O=="string"&&O.length>0&&S.set(O,!0);for(let O of h)typeof O=="string"&&O.length>0&&S.set(O,!0);for(let O of _)typeof O=="string"&&O.length>0&&S.delete(O)}}async function o(l,a){let c=ar(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let _=n.get(h.key);_&&(_.delete(l),_.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let u=n.get(c);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let _=r.get(l)||null;if(_){let w=n.get(_.key);w&&(w.delete(l),w.size===0&&n.delete(_.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let _=n.get(h.key);_&&(_.delete(l),_.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ar,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let u of a.itemsById.keys())c[u]=!0;return c}}}}function ls(){let t=we("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,u){let h=c?ar(c):"",_=r.get(a)||"",w=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,_),w&&_&&h&&_!==h){let k=e.get(a);if(k)try{k.dispose()}catch{}let S=s.get(a);if(S){try{S()}catch{}s.delete(a)}let O=qr(a,u);e.set(a,O);let I=O.subscribe(()=>o());s.set(a,I)}else if(!w){let k=qr(a,u);e.set(a,k);let S=k.subscribe(()=>o());s.set(a,S)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let u=s.get(a);if(u){try{u()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function cs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ds(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Ur(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function oi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ii(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function us(t){let e=we("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):oi(n),i=ii(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Ur(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Ur(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ai=Object.freeze({workspace_config:{default_workspace:null}});function ps(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:ai.workspace_config.default_workspace}}}function fs(t={}){let e=we("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:ps(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?ps(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,u)=>c!==r.workspace.hidden[u]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,u)=>c===r.worker.show_closed_children[u])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function hs(t){let e=we("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,_)=>{let w=s++,k=Date.now();n.set(w,{type:h,start_ts:k}),e("request start id=%d type=%s count=%d",w,h,r+1),i();let S=!1,O=()=>{S||(S=!0,n.delete(w),l())},I=setTimeout(()=>{S||(e("request TIMEOUT id=%d type=%s elapsed=%dms",w,h,Date.now()-k),O())},3e4);try{let P=await c(h,_),F=Date.now()-k;return e("request done id=%d type=%s elapsed=%dms",w,h,F),P}catch(P){let F=Date.now()-k;throw e("request error id=%d type=%s elapsed=%dms err=%o",w,h,F,P),P}finally{clearTimeout(I),O()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([u,h])=>({id:u,type:h.type,elapsed_ms:c-h.start_ts}))}}}function se(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function lr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(os),a;switch(l){case"created_desc":return a.sort(qt),a;case"created_asc":return a.sort(rs),a;case"updated_desc":return a.sort(ns),a;case"priority":return a.sort(ss),a;case"manual":default:{let c=r();return c?a.sort(ir(c)):a.sort(qt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function cr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},u=n(zr(l,a,c.order),i);s(c,u);let h=await e("ui-order-set",{expected_revision:c.revision,entries:u});if(h&&h.conflict){let _={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(_);let w=n(zr(l,a,_.order),i);s(_,w);let k=await e("ui-order-set",{expected_revision:_.revision,entries:w});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function dr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Hr(t,e){return!e||typeof t!="string"||t.length===0||dr(e.visible_labels).includes(t)?!0:dr(e.hidden_labels).includes(t)?!1:!dr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function gs(t,e){return dr(t).filter(r=>Hr(r,e))}function bt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function Wr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Rt(t){let e=Wr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Gr(t,e){let r=Wr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var li={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},ci={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},di={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},ui={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function pi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function fi(t,e,r){let n=li[t]||t,s=e&&e.state||"empty",o=ui[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return f`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${ci[t]||t}
      </div>
    </div>
  `}function ur(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=di[r],s=t.stages,o=pi(n,s,String(e||"open"));return f`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>fi(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function hi(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var ms=2;function gi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(f`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,ms).join(", "),s=r.length-ms,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(f`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function mi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&bt(r,"route")){let o=n.route_source==="derived";s.push(f`<span
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
      </button>`),bt(r,"blocked")&&s.push(...gi(t.blocked_info)),s.length===0?"":f`<div class="board-card__chips">${s}</div>`}function bi(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function _i(t){let e=Gr(t.created_at),r=Gr(t.updated_at);return!e&&!r?"":f`<span class="board-card__times">
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
  </span>`}function yi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(is):r.children;return f`
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
  `}function bs(t,e){let r=hi(t.priority);return f`
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
      ${mi(t,e)}
      ${t.workflow&&bt(e.policy||null,"stepper")?ur(t.workflow,t.status):""}
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
              ${Wn.map(o=>f`<option
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
        ${t.items.map(o=>bs(o,e))}
      </div>
    </section>
  `}var ki=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],wi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],vi=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function xi(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return f`
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
  `}function _s(t,e,r){return f`
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
        ${ki.map(n=>f`<option
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
        ${wi.map(n=>f`<option
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
  `}var $i=200,Si={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ai=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),ys="beads-ui.board.sort",ks=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ti(){try{let t=window.localStorage.getItem(ys);if(t&&ks.has(t))return t}catch{}return"created_desc"}function ws(t,e){let r=we("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,u=e.closedRange||nr,h=s?lr(s,i):null,_=cr({transport:o,uiOrderStore:i}),w=[],k=[],S=[],O=[],I=[],P=[],F=!1,C=0,y=Ti(),m=new Map,E=new Map,D=new Map,W=new Set,Z={search:"",priority:"",type:"",labels:[]},K=!1,Q=null;function Ie($){return String($.status||"open")==="open"}function We($){let R=String($.status||"open");return R==="open"||R==="blocked"}function Se($){let R=Z.search.trim().toLowerCase(),B=Z.priority,g=Z.type,v=Z.labels;return $.filter(A=>{if(R){let N=String(A.id||"").toLowerCase(),ne=String(A.title||"").toLowerCase();if(!N.includes(R)&&!ne.includes(R))return!1}if(B!==""&&String(A.priority)!==B||g!==""&&String(A.issue_type||"")!==g)return!1;if(v.length>0){let N=Array.isArray(A.labels)?A.labels:[];if(!v.some(ne=>N.includes(ne)))return!1}return!0})}function Ae(){let $=new Set;for(let R of[w,k,S,O,I,P])for(let B of R){let g=Array.isArray(B.labels)?B.labels:[];for(let v of g)typeof v=="string"&&v.length>0&&$.add(v)}return Array.from($).sort()}function ve(){return Z.search.trim()!==""||Z.priority!==""||Z.type!==""||Z.labels.length>0}function be(){try{if(h){let $=h.selectBoardColumn("tab:board:in-progress","in_progress",y),R=h.selectBoardColumn("tab:board:blocked","blocked",y).filter(We),B=new Set($.map(V=>V.id)),g=h.selectBoardColumn("tab:board:ready","ready",y).filter(V=>Ie(V)&&!B.has(V.id)),v=h.selectBoardColumn("tab:board:resolved","resolved",y),A=h.selectBoardColumn("tab:board:deferred","deferred",y),N=F?A:[],ne=h.selectBoardColumn("tab:board:closed","closed").slice(0,$i),G=[...R,...g,...$,...v,...N,...ne];Ge(G);let ee=new Set;for(let V of G)V&&V.id&&!jr(V)&&ee.add(V.id);let de=!ve();w=de?Lt(R,ee):R,k=de?Lt(g,ee):g,S=de?Lt($,ee):$,O=de?Lt(v,ee):v,I=de?Lt(N,ee):N,C=A.length,P=de?Lt(ne,ee):ne,m=new Map;for(let V of w)m.set(V.id,"open");for(let V of k)m.set(V.id,"open");for(let V of S)m.set(V.id,"in_progress");for(let V of O)m.set(V.id,"resolved");for(let V of I)m.set(V.id,"deferred");for(let V of P)m.set(V.id,"closed");E=new Map;for(let V of w)E.set(V.id,"blocked-col");for(let V of k)E.set(V.id,"ready-col");for(let V of S)E.set(V.id,"in-progress-col");for(let V of O)E.set(V.id,"resolved-col");for(let V of I)E.set(V.id,"deferred-col");for(let V of P)E.set(V.id,"closed-col")}ye()}catch{w=[],k=[],S=[],O=[],I=[],P=[],D=new Map,ye()}}function Ge($){let R=new Map;for(let g of $)g&&g.id&&!R.has(g.id)&&R.set(g.id,g);let B=new Map;for(let g of R.values()){let v=jr(g);if(!v)continue;let A=B.get(v);A||(A=[],B.set(v,A)),A.push({id:g.id,title:g.title,status:g.status,metadata:g.metadata,created_at:g.created_at})}D=B}function Ve($){let R=D.get($)||[],B=0,g=null;for(let v of R)(v.status==="resolved"||v.status==="closed")&&(B+=1),!g&&v.status==="in_progress"&&(g=v);return{total:R.length,count:B,current:g,children:R}}function ce($){return!W.has($)}function Ke($,R){$.preventDefault(),$.stopPropagation(),W.has(R)?W.delete(R):W.add(R),ye()}function fe($,R){$.preventDefault(),$.stopPropagation(),n(R)}function x($,R){$.preventDefault(),$.stopPropagation(),n(R)}function L($,R){Q||n(R)}function U($,R){$.preventDefault(),$.stopPropagation(),Ei(R).then(B=>{B&&se("\uBCF5\uC0AC\uB428","success",1200)})}function j($,R){Q=R,$.dataTransfer&&($.dataTransfer.setData("text/plain",R),$.dataTransfer.effectAllowed="move"),$.target.classList.add("board-card--dragging")}function X($){$.target.classList.remove("board-card--dragging"),Ce(),setTimeout(()=>{Q=null},0)}function J($){let R=String($.target.value||"");!R||R===u||(u=R,a&&a(R),ye())}let oe={onCardClick:L,onCopyId:U,onDragStart:j,onDragEnd:X,onClosedRangeChange:J,rollupFor:Ve,isExpanded:ce,onRollupToggle:Ke,onChildClick:fe,onFromChipClick:x,get policy(){return l?l.get():null}};function he($){let R=$.target,B=t.querySelector(".board-filter__labels");R&&B&&B.contains(R)||De()}function ge($){$.key==="Escape"&&De()}function _e(){K||(K=!0,document.addEventListener("mousedown",he),document.addEventListener("keydown",ge),ye())}function De(){K&&(K=!1,document.removeEventListener("mousedown",he),document.removeEventListener("keydown",ge),ye())}let Te={onSearchInput($){Z.search=String($.target.value||""),be()},onPriorityChange($){Z.priority=String($.target.value||""),be()},onTypeChange($){Z.type=String($.target.value||""),be()},onSortChange($){let R=String($.target.value||"");if(!(!ks.has(R)||R===y)){y=R;try{window.localStorage.setItem(ys,R)}catch{}be()}},onDeferredToggle(){F=!F,be()},onLabelMenuToggle(){K?De():_e()},onLabelToggle($){let R=Z.labels.indexOf($);R===-1?Z.labels.push($):Z.labels.splice(R,1),be()},onLabelClear(){Z.labels.length!==0&&(Z.labels=[],be())},onNewIssue(){c&&c()}};function Oe(){let $=F?"board-root board-root--deferred":"board-root";return f`
      <div class="board-view">
        ${_s(Z,Te,{sort_mode:y,show_deferred:F,deferred_count:C,label_options:Ae(),label_menu_open:K})}
        <div class=${$}>
          ${_t({title:"Blocked",id:"blocked-col",items:Se(w)},oe)}
          ${_t({title:"Ready",id:"ready-col",items:Se(k)},oe)}
          ${_t({title:"In progress",id:"in-progress-col",items:Se(S)},oe)}
          ${_t({title:"Resolved",id:"resolved-col",items:Se(O)},oe)}
          ${F?_t({title:"Deferred",id:"deferred-col",items:Se(I)},oe):""}
          ${_t({title:"Closed",id:"closed-col",items:Se(P),is_closed:!0,closed_range:u},oe)}
        </div>
      </div>
    `}function ye(){ue(Oe(),t),Me()}function Me(){try{let $=Array.from(t.querySelectorAll(".board-column"));for(let R of $)Array.from(R.querySelectorAll(".board-card")).forEach((g,v)=>{g.tabIndex=v===0?0:-1})}catch{}}async function Pe($,R){if(!o){se("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:$,status:R}),se("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(B){r("update-status failed: %o",B),se("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ee($){switch($){case"blocked-col":return w;case"ready-col":return k;case"in-progress-col":return S;case"resolved-col":return O;case"deferred-col":return I;default:return[]}}function M($,R,B){if(!o||!i)return;let g=Ee($),v=g.find(ee=>ee.id===R);if(!v)return;let A=g.filter(ee=>ee.id!==R),N=B.closest?B.closest(".board-card"):null,ne=A.length;if(N){let ee=N.getAttribute("data-issue-id");if(ee===R)return;let de=A.findIndex(V=>V.id===ee);de>=0&&(ne=de)}let G=A.slice();G.splice(ne,0,v),_.applyReorder(R,G,ne)}function Ce(){for(let $ of Array.from(t.querySelectorAll(".board-column--drag-over")))$.classList.remove("board-column--drag-over")}let ae=null;t.addEventListener("dragover",$=>{$.preventDefault(),$.dataTransfer&&($.dataTransfer.dropEffect="move");let B=$.target.closest(".board-column");B&&B!==ae&&(ae&&ae.classList.remove("board-column--drag-over"),B.classList.add("board-column--drag-over"),ae=B)}),t.addEventListener("dragleave",$=>{let R=$.relatedTarget;(!R||!t.contains(R))&&ae&&(ae.classList.remove("board-column--drag-over"),ae=null)}),t.addEventListener("drop",$=>{$.preventDefault(),ae&&(ae.classList.remove("board-column--drag-over"),ae=null);let R=$.target,B=R.closest(".board-column");if(!B)return;let g=$.dataTransfer?.getData("text/plain")||"";if(!g)return;let v=B.id,A=E.get(g);if(A&&A===v){if(Ai.has(v)){if(y!=="manual"){se("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}M(v,g,R)}return}let N=Si[v];if(!N){se("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}m.get(g)!==N&&Pe(g,N)}),t.addEventListener("keydown",$=>{let R=$.target;if(!(R instanceof HTMLElement))return;let B=String(R.tagName||"").toLowerCase();if(B==="input"||B==="textarea"||B==="select"||B==="button"||B==="a"||R.isContentEditable===!0)return;let g=R.closest(".board-card");if(!g)return;let v=String($.key||"");if(v==="Enter"||v===" "){$.preventDefault();let G=g.getAttribute("data-issue-id");G&&n(G);return}if(v!=="ArrowUp"&&v!=="ArrowDown"&&v!=="ArrowLeft"&&v!=="ArrowRight")return;$.preventDefault();let A=g.closest(".board-column");if(!A)return;let N=Array.from(A.querySelectorAll(".board-card")),ne=N.indexOf(g);if(v==="ArrowDown"&&ne<N.length-1){Re(g,N[ne+1]);return}if(v==="ArrowUp"&&ne>0){Re(g,N[ne-1]);return}if(v==="ArrowLeft"||v==="ArrowRight"){let G=Array.from(t.querySelectorAll(".board-column")),ee=G.indexOf(A),de=v==="ArrowRight"?1:-1,V=ee+de;for(;V>=0&&V<G.length;){let at=G[V].querySelector(".board-card");if(at){Re(g,at);return}V+=de}}});function Re($,R){try{$.tabIndex=-1,R.tabIndex=0,R.focus()}catch{}}let Fe=null;h&&h.subscribe&&(Fe=h.subscribe(()=>{try{be()}catch{}}));let Be=null;return l&&l.subscribe&&(Be=l.subscribe(()=>{try{be()}catch{}})),{async load(){r("load"),be()},clear(){De(),Fe&&(Fe(),Fe=null),Be&&(Be(),Be=null),t.replaceChildren(),w=[],k=[],S=[],O=[],I=[],P=[],m=new Map,E=new Map}}}function jr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Lt(t,e){return t.filter(r=>{let n=jr(r);return!(n&&e.has(n))})}async function Ei(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function pr(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ci={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ri=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Li=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ct(t){return!!t&&typeof t=="object"}function Yr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function vs(t,e){let r=Yr(t),n=Yr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Ii(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ct(s)&&typeof s.text=="string"?s.text:"").join(""):ct(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Di(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Ci[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Yr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=vs(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=vs(ct(l)?l.old_string:"",ct(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function xs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ri.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Li.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Oi(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ct(o)){if(o.type==="text"&&typeof o.text=="string")s.push(xs(o.text));else if(o.type==="tool_use"){let i=Di(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ct(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Ii(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Mi(t){if(t.type==="item.completed"&&ct(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[xs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Ni(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function $s(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ct(o))continue;let i=Ni(o)?Mi(o):Oi(o,r);for(let l of i)e.push(l)}return e}function fr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function u(){if(!o||!n)return[];let y=n.get(o);return $s(y?y.lines:[])}function h(y,m){if(m.kind==="gate")return f`<div class="sv__gate">${m.text}</div>`;if(m.kind==="phase")return f`<div class="sv__phase">${m.text}</div>`;if(m.kind==="result")return f`<div
        class="sv__result${m.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${m.success?"\u2713":"\u2717"}
        ${m.text||(m.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(m.kind==="error")return f`<div class="sv__error">⛔ ${m.text}</div>`;if(m.kind==="blocker")return f`<div class="sv__error">⛔ ${m.text}</div>`;if(m.kind==="tool"){let E=a.has(y),D=m.tool==="Bash"?m.command:m.path||m.command||"";return f`<div
        class="sv__tool${E?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>O(y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${m.icon}</span>
          <span class="sv__tool-name">${m.tool}</span>
          ${D?f`<span class="sv__tool-detail">${D}</span>`:""}
          ${typeof m.added=="number"?f`<span class="sv__diff-add">+${m.added}</span>`:""}
          ${typeof m.removed=="number"?f`<span class="sv__diff-del">−${m.removed}</span>`:""}
          ${m.result?f`<span class="sv__tool-ok">→ ${m.result}</span>`:""}
        </span>
        ${E?f`<pre class="sv__tool-expand">${_(m)}</pre>`:""}
      </div>`}return f`<div class="sv__as">${m.text}</div>`}function _(y){let m=[];if(y.input!==void 0)try{m.push(`input: ${JSON.stringify(y.input,null,2)}`)}catch{}return typeof y.output=="string"&&y.output.length>0&&m.push(`output:
${y.output}`),m.join(`

`)}function w(){if(!o)return f``;let y=u(),m=[i.runner,i.model,i.effort,i.worktree].filter(Boolean).join(" \xB7 ");return f`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${m?f`<span class="sv__meta">${m}</span>`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          @click=${I}
        >
          ⇣ 라이브 따라가기 ${l?"ON":"OFF"}
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>C()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${y.length===0?f`<div class="sv__empty">세션 로그 없음</div>`:y.map((E,D)=>h(D,E))}
      </div>
    </div>`}function k(){ue(w(),t),l&&S()}function S(){let y=t.querySelector(".sv__body");y&&(y.scrollTop=y.scrollHeight)}function O(y){a.has(y)?a.delete(y):a.add(y),k()}function I(){l=!l,k()}function P(y){let m=y.target;if(!m||!m.classList||!m.classList.contains("sv__body"))return;!(m.scrollHeight-m.scrollTop-m.clientHeight<=4)&&l&&(l=!1,k())}t.addEventListener("scroll",P,!0);function F(y){let m=y&&y.attempt_id;m&&(o=m,i=y.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(k)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),k())}function C(){let y=o;o=null,a.clear(),r&&y&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${y}`})).catch(()=>{}),ue(f``,t),s&&s()}return{open:F,close:C,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",P,!0),o=null,ue(f``,t)}}}function Pi(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Ss(t,e){let r=Pi(t);return f`
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
  `}var Vr=["claude","codex","ccx"],As={claude:["opus","sonnet","haiku","fable"],codex:["gpt-5.6","gpt-5.4"],ccx:["opus","sonnet","haiku","fable"]},Zr=["low","medium","high","xhigh"],Kr=["codex","opus","fable","self","skip"],Xr=["opus","fable","sonnet","haiku"],Fi=["standard","fast_track"];function Qr(t){return As[String(t||"claude")]||As.claude}function It(t,e,r,n,s,o){return f`
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
  `}function Dt(t,e=!0){let r=t.map(n=>({value:n,label:n}));return e?[{value:"",label:"(\uAE30\uBCF8)"},...r]:r}function Ts(t,e){let r=t&&t.metadata||{},n=r.worker_runner||"",s=r.workflow_mode==="fast_track"?"fast_track":"standard";return f`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${It("worker_runner","worker_runner",Dt(Vr),n,!!n,e)}
    ${It("orchestration_model","orchestration_model",Dt(Qr(n)),r.orchestration_model||"",!1,e)}
    ${It("orchestration_effort","orchestration_effort",Dt(Zr),r.orchestration_effort||"",!1,e)}
    ${It("review_model","review_model",Dt(Kr),r.review_model||"",!1,e)}
    ${It("impl_model","impl_model",Dt(Xr),r.impl_model||"",!1,e)}
    ${It("workflow_mode","workflow_mode",Dt(Fi,!1),s,r.workflow_mode==="fast_track",e)}
  `}var{entries:Ns,setPrototypeOf:Es,isFrozen:Bi,getPrototypeOf:zi,getOwnPropertyDescriptor:qi}=Object,{freeze:qe,seal:Ze,create:on}=Object,{apply:an,construct:ln}=typeof Reflect<"u"&&Reflect;qe||(qe=function(e){return e});Ze||(Ze=function(e){return e});an||(an=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});ln||(ln=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var hr=Ue(Array.prototype.forEach),Ui=Ue(Array.prototype.lastIndexOf),Cs=Ue(Array.prototype.pop),Ut=Ue(Array.prototype.push),Hi=Ue(Array.prototype.splice),mr=Ue(String.prototype.toLowerCase),Jr=Ue(String.prototype.toString),en=Ue(String.prototype.match),Ht=Ue(String.prototype.replace),Wi=Ue(String.prototype.indexOf),Gi=Ue(String.prototype.trim),Qe=Ue(Object.prototype.hasOwnProperty),ze=Ue(RegExp.prototype.test),Wt=ji(TypeError);function Ue(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return an(t,e,n)}}function ji(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return ln(t,r)}}function re(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:mr;Es&&Es(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Bi(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Yi(t){for(let e=0;e<t.length;e++)Qe(t,e)||(t[e]=null);return t}function ot(t){let e=on(null);for(let[r,n]of Ns(t))Qe(t,r)&&(Array.isArray(n)?e[r]=Yi(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=ot(n):e[r]=n);return e}function Gt(t,e){for(;t!==null;){let n=qi(t,e);if(n){if(n.get)return Ue(n.get);if(typeof n.value=="function")return Ue(n.value)}t=zi(t)}function r(){return null}return r}var Rs=qe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),tn=qe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),rn=qe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Vi=qe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),nn=qe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Zi=qe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ls=qe(["#text"]),Is=qe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),sn=qe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ds=qe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),gr=qe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ki=Ze(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Xi=Ze(/<%[\w\W]*|[\w\W]*%>/gm),Qi=Ze(/\$\{[\w\W]*/gm),Ji=Ze(/^data-[\-\w.\u00B7-\uFFFF]+$/),ea=Ze(/^aria-[\-\w]+$/),Ps=Ze(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ta=Ze(/^(?:\w+script|data):/i),ra=Ze(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Fs=Ze(/^html$/i),na=Ze(/^[a-z][.\w]*(-[.\w]+)+$/i),Os=Object.freeze({__proto__:null,ARIA_ATTR:ea,ATTR_WHITESPACE:ra,CUSTOM_ELEMENT:na,DATA_ATTR:Ji,DOCTYPE_NAME:Fs,ERB_EXPR:Xi,IS_ALLOWED_URI:Ps,IS_SCRIPT_OR_DATA:ta,MUSTACHE_EXPR:Ki,TMPLIT_EXPR:Qi}),jt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},sa=function(){return typeof window>"u"?null:window},oa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ms=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Bs(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:sa(),e=q=>Bs(q);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==jt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:_,trustedTypes:w}=t,k=a.prototype,S=Gt(k,"cloneNode"),O=Gt(k,"remove"),I=Gt(k,"nextSibling"),P=Gt(k,"childNodes"),F=Gt(k,"parentNode");if(typeof i=="function"){let q=r.createElement("template");q.content&&q.content.ownerDocument&&(r=q.content.ownerDocument)}let C,y="",{implementation:m,createNodeIterator:E,createDocumentFragment:D,getElementsByTagName:W}=r,{importNode:Z}=n,K=Ms();e.isSupported=typeof Ns=="function"&&typeof F=="function"&&m&&m.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Q,ERB_EXPR:Ie,TMPLIT_EXPR:We,DATA_ATTR:Se,ARIA_ATTR:Ae,IS_SCRIPT_OR_DATA:ve,ATTR_WHITESPACE:be,CUSTOM_ELEMENT:Ge}=Os,{IS_ALLOWED_URI:Ve}=Os,ce=null,Ke=re({},[...Rs,...tn,...rn,...nn,...Ls]),fe=null,x=re({},[...Is,...sn,...Ds,...gr]),L=Object.seal(on(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),U=null,j=null,X=Object.seal(on(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),J=!0,oe=!0,he=!1,ge=!0,_e=!1,De=!0,Te=!1,Oe=!1,ye=!1,Me=!1,Pe=!1,Ee=!1,M=!0,Ce=!1,ae="user-content-",Re=!0,Fe=!1,Be={},$=null,R=re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),B=null,g=re({},["audio","video","img","source","image","track"]),v=null,A=re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),N="http://www.w3.org/1998/Math/MathML",ne="http://www.w3.org/2000/svg",G="http://www.w3.org/1999/xhtml",ee=G,de=!1,V=null,at=re({},[N,ne,G],Jr),wt=re({},["mi","mo","mn","ms","mtext"]),vt=re({},["annotation-xml"]),Sr=re({},["title","style","font","a","script"]),rt=null,Ot=["application/xhtml+xml","text/html"],er="text/html",p=null,b=null,Y=r.createElement("form"),H=function(d){return d instanceof RegExp||d instanceof Function},te=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(b&&b===d)){if((!d||typeof d!="object")&&(d={}),d=ot(d),rt=Ot.indexOf(d.PARSER_MEDIA_TYPE)===-1?er:d.PARSER_MEDIA_TYPE,p=rt==="application/xhtml+xml"?Jr:mr,ce=Qe(d,"ALLOWED_TAGS")?re({},d.ALLOWED_TAGS,p):Ke,fe=Qe(d,"ALLOWED_ATTR")?re({},d.ALLOWED_ATTR,p):x,V=Qe(d,"ALLOWED_NAMESPACES")?re({},d.ALLOWED_NAMESPACES,Jr):at,v=Qe(d,"ADD_URI_SAFE_ATTR")?re(ot(A),d.ADD_URI_SAFE_ATTR,p):A,B=Qe(d,"ADD_DATA_URI_TAGS")?re(ot(g),d.ADD_DATA_URI_TAGS,p):g,$=Qe(d,"FORBID_CONTENTS")?re({},d.FORBID_CONTENTS,p):R,U=Qe(d,"FORBID_TAGS")?re({},d.FORBID_TAGS,p):ot({}),j=Qe(d,"FORBID_ATTR")?re({},d.FORBID_ATTR,p):ot({}),Be=Qe(d,"USE_PROFILES")?d.USE_PROFILES:!1,J=d.ALLOW_ARIA_ATTR!==!1,oe=d.ALLOW_DATA_ATTR!==!1,he=d.ALLOW_UNKNOWN_PROTOCOLS||!1,ge=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,_e=d.SAFE_FOR_TEMPLATES||!1,De=d.SAFE_FOR_XML!==!1,Te=d.WHOLE_DOCUMENT||!1,Me=d.RETURN_DOM||!1,Pe=d.RETURN_DOM_FRAGMENT||!1,Ee=d.RETURN_TRUSTED_TYPE||!1,ye=d.FORCE_BODY||!1,M=d.SANITIZE_DOM!==!1,Ce=d.SANITIZE_NAMED_PROPS||!1,Re=d.KEEP_CONTENT!==!1,Fe=d.IN_PLACE||!1,Ve=d.ALLOWED_URI_REGEXP||Ps,ee=d.NAMESPACE||G,wt=d.MATHML_TEXT_INTEGRATION_POINTS||wt,vt=d.HTML_INTEGRATION_POINTS||vt,L=d.CUSTOM_ELEMENT_HANDLING||{},d.CUSTOM_ELEMENT_HANDLING&&H(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(L.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&H(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(L.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(L.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),_e&&(oe=!1),Pe&&(Me=!0),Be&&(ce=re({},Ls),fe=[],Be.html===!0&&(re(ce,Rs),re(fe,Is)),Be.svg===!0&&(re(ce,tn),re(fe,sn),re(fe,gr)),Be.svgFilters===!0&&(re(ce,rn),re(fe,sn),re(fe,gr)),Be.mathMl===!0&&(re(ce,nn),re(fe,Ds),re(fe,gr))),d.ADD_TAGS&&(typeof d.ADD_TAGS=="function"?X.tagCheck=d.ADD_TAGS:(ce===Ke&&(ce=ot(ce)),re(ce,d.ADD_TAGS,p))),d.ADD_ATTR&&(typeof d.ADD_ATTR=="function"?X.attributeCheck=d.ADD_ATTR:(fe===x&&(fe=ot(fe)),re(fe,d.ADD_ATTR,p))),d.ADD_URI_SAFE_ATTR&&re(v,d.ADD_URI_SAFE_ATTR,p),d.FORBID_CONTENTS&&($===R&&($=ot($)),re($,d.FORBID_CONTENTS,p)),Re&&(ce["#text"]=!0),Te&&re(ce,["html","head","body"]),ce.table&&(re(ce,["tbody"]),delete U.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');C=d.TRUSTED_TYPES_POLICY,y=C.createHTML("")}else C===void 0&&(C=oa(w,s)),C!==null&&typeof y=="string"&&(y=C.createHTML(""));qe&&qe(d),b=d}},ke=re({},[...tn,...rn,...Vi]),tr=re({},[...nn,...Zi]),Io=function(d){let T=F(d);(!T||!T.tagName)&&(T={namespaceURI:ee,tagName:"template"});let z=mr(d.tagName),me=mr(T.tagName);return V[d.namespaceURI]?d.namespaceURI===ne?T.namespaceURI===G?z==="svg":T.namespaceURI===N?z==="svg"&&(me==="annotation-xml"||wt[me]):!!ke[z]:d.namespaceURI===N?T.namespaceURI===G?z==="math":T.namespaceURI===ne?z==="math"&&vt[me]:!!tr[z]:d.namespaceURI===G?T.namespaceURI===ne&&!vt[me]||T.namespaceURI===N&&!wt[me]?!1:!tr[z]&&(Sr[z]||!ke[z]):!!(rt==="application/xhtml+xml"&&V[d.namespaceURI]):!1},tt=function(d){Ut(e.removed,{element:d});try{F(d).removeChild(d)}catch{O(d)}},ut=function(d,T){try{Ut(e.removed,{attribute:T.getAttributeNode(d),from:T})}catch{Ut(e.removed,{attribute:null,from:T})}if(T.removeAttribute(d),d==="is")if(Me||Pe)try{tt(T)}catch{}else try{T.setAttribute(d,"")}catch{}},Sn=function(d){let T=null,z=null;if(ye)d="<remove></remove>"+d;else{let $e=en(d,/^[\r\n\t ]+/);z=$e&&$e[0]}rt==="application/xhtml+xml"&&ee===G&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");let me=C?C.createHTML(d):d;if(ee===G)try{T=new _().parseFromString(me,rt)}catch{}if(!T||!T.documentElement){T=m.createDocument(ee,"template",null);try{T.documentElement.innerHTML=de?y:me}catch{}}let Ne=T.body||T.documentElement;return d&&z&&Ne.insertBefore(r.createTextNode(z),Ne.childNodes[0]||null),ee===G?W.call(T,Te?"html":"body")[0]:Te?T.documentElement:Ne},An=function(d){return E.call(d.ownerDocument||d,d,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Ar=function(d){return d instanceof h&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof u)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function")},Tn=function(d){return typeof l=="function"&&d instanceof l};function nt(q,d,T){hr(q,z=>{z.call(e,d,T,b)})}let En=function(d){let T=null;if(nt(K.beforeSanitizeElements,d,null),Ar(d))return tt(d),!0;let z=p(d.nodeName);if(nt(K.uponSanitizeElement,d,{tagName:z,allowedTags:ce}),De&&d.hasChildNodes()&&!Tn(d.firstElementChild)&&ze(/<[/\w!]/g,d.innerHTML)&&ze(/<[/\w!]/g,d.textContent)||d.nodeType===jt.progressingInstruction||De&&d.nodeType===jt.comment&&ze(/<[/\w]/g,d.data))return tt(d),!0;if(!(X.tagCheck instanceof Function&&X.tagCheck(z))&&(!ce[z]||U[z])){if(!U[z]&&Rn(z)&&(L.tagNameCheck instanceof RegExp&&ze(L.tagNameCheck,z)||L.tagNameCheck instanceof Function&&L.tagNameCheck(z)))return!1;if(Re&&!$[z]){let me=F(d)||d.parentNode,Ne=P(d)||d.childNodes;if(Ne&&me){let $e=Ne.length;for(let je=$e-1;je>=0;--je){let st=S(Ne[je],!0);st.__removalCount=(d.__removalCount||0)+1,me.insertBefore(st,I(d))}}}return tt(d),!0}return d instanceof a&&!Io(d)||(z==="noscript"||z==="noembed"||z==="noframes")&&ze(/<\/no(script|embed|frames)/i,d.innerHTML)?(tt(d),!0):(_e&&d.nodeType===jt.text&&(T=d.textContent,hr([Q,Ie,We],me=>{T=Ht(T,me," ")}),d.textContent!==T&&(Ut(e.removed,{element:d.cloneNode()}),d.textContent=T)),nt(K.afterSanitizeElements,d,null),!1)},Cn=function(d,T,z){if(M&&(T==="id"||T==="name")&&(z in r||z in Y))return!1;if(!(oe&&!j[T]&&ze(Se,T))){if(!(J&&ze(Ae,T))){if(!(X.attributeCheck instanceof Function&&X.attributeCheck(T,d))){if(!fe[T]||j[T]){if(!(Rn(d)&&(L.tagNameCheck instanceof RegExp&&ze(L.tagNameCheck,d)||L.tagNameCheck instanceof Function&&L.tagNameCheck(d))&&(L.attributeNameCheck instanceof RegExp&&ze(L.attributeNameCheck,T)||L.attributeNameCheck instanceof Function&&L.attributeNameCheck(T,d))||T==="is"&&L.allowCustomizedBuiltInElements&&(L.tagNameCheck instanceof RegExp&&ze(L.tagNameCheck,z)||L.tagNameCheck instanceof Function&&L.tagNameCheck(z))))return!1}else if(!v[T]){if(!ze(Ve,Ht(z,be,""))){if(!((T==="src"||T==="xlink:href"||T==="href")&&d!=="script"&&Wi(z,"data:")===0&&B[d])){if(!(he&&!ze(ve,Ht(z,be,"")))){if(z)return!1}}}}}}}return!0},Rn=function(d){return d!=="annotation-xml"&&en(d,Ge)},Ln=function(d){nt(K.beforeSanitizeAttributes,d,null);let{attributes:T}=d;if(!T||Ar(d))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:fe,forceKeepAttr:void 0},me=T.length;for(;me--;){let Ne=T[me],{name:$e,namespaceURI:je,value:st}=Ne,xt=p($e),Tr=st,Le=$e==="value"?Tr:Gi(Tr);if(z.attrName=xt,z.attrValue=Le,z.keepAttr=!0,z.forceKeepAttr=void 0,nt(K.uponSanitizeAttribute,d,z),Le=z.attrValue,Ce&&(xt==="id"||xt==="name")&&(ut($e,d),Le=ae+Le),De&&ze(/((--!?|])>)|<\/(style|title|textarea)/i,Le)){ut($e,d);continue}if(xt==="attributename"&&en(Le,"href")){ut($e,d);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){ut($e,d);continue}if(!ge&&ze(/\/>/i,Le)){ut($e,d);continue}_e&&hr([Q,Ie,We],Dn=>{Le=Ht(Le,Dn," ")});let In=p(d.nodeName);if(!Cn(In,xt,Le)){ut($e,d);continue}if(C&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!je)switch(w.getAttributeType(In,xt)){case"TrustedHTML":{Le=C.createHTML(Le);break}case"TrustedScriptURL":{Le=C.createScriptURL(Le);break}}if(Le!==Tr)try{je?d.setAttributeNS(je,$e,Le):d.setAttribute($e,Le),Ar(d)?tt(d):Cs(e.removed)}catch{ut($e,d)}}nt(K.afterSanitizeAttributes,d,null)},Do=function q(d){let T=null,z=An(d);for(nt(K.beforeSanitizeShadowDOM,d,null);T=z.nextNode();)nt(K.uponSanitizeShadowNode,T,null),En(T),Ln(T),T.content instanceof o&&q(T.content);nt(K.afterSanitizeShadowDOM,d,null)};return e.sanitize=function(q){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},T=null,z=null,me=null,Ne=null;if(de=!q,de&&(q="<!-->"),typeof q!="string"&&!Tn(q))if(typeof q.toString=="function"){if(q=q.toString(),typeof q!="string")throw Wt("dirty is not a string, aborting")}else throw Wt("toString is not a function");if(!e.isSupported)return q;if(Oe||te(d),e.removed=[],typeof q=="string"&&(Fe=!1),Fe){if(q.nodeName){let st=p(q.nodeName);if(!ce[st]||U[st])throw Wt("root node is forbidden and cannot be sanitized in-place")}}else if(q instanceof l)T=Sn("<!---->"),z=T.ownerDocument.importNode(q,!0),z.nodeType===jt.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?T=z:T.appendChild(z);else{if(!Me&&!_e&&!Te&&q.indexOf("<")===-1)return C&&Ee?C.createHTML(q):q;if(T=Sn(q),!T)return Me?null:Ee?y:""}T&&ye&&tt(T.firstChild);let $e=An(Fe?q:T);for(;me=$e.nextNode();)En(me),Ln(me),me.content instanceof o&&Do(me.content);if(Fe)return q;if(Me){if(Pe)for(Ne=D.call(T.ownerDocument);T.firstChild;)Ne.appendChild(T.firstChild);else Ne=T;return(fe.shadowroot||fe.shadowrootmode)&&(Ne=Z.call(n,Ne,!0)),Ne}let je=Te?T.outerHTML:T.innerHTML;return Te&&ce["!doctype"]&&T.ownerDocument&&T.ownerDocument.doctype&&T.ownerDocument.doctype.name&&ze(Fs,T.ownerDocument.doctype.name)&&(je="<!DOCTYPE "+T.ownerDocument.doctype.name+`>
`+je),_e&&hr([Q,Ie,We],st=>{je=Ht(je,st," ")}),C&&Ee?C.createHTML(je):je},e.setConfig=function(){let q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};te(q),Oe=!0},e.clearConfig=function(){b=null,Oe=!1},e.isValidAttribute=function(q,d,T){b||te({});let z=p(q),me=p(d);return Cn(z,me,T)},e.addHook=function(q,d){typeof d=="function"&&Ut(K[q],d)},e.removeHook=function(q,d){if(d!==void 0){let T=Ui(K[q],d);return T===-1?void 0:Hi(K[q],T,1)[0]}return Cs(K[q])},e.removeHooks=function(q){K[q]=[]},e.removeAllHooks=function(){K=Ms()},e}var zs=Bs();var qs={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Us=t=>(...e)=>({_$litDirective$:t,values:e}),br=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Yt=class extends br{constructor(e){if(super(e),this.it=xe,e.type!==qs.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===xe||e==null)return this._t=void 0,this.it=e;if(e===gt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Yt.directiveName="unsafeHTML",Yt.resultType=1;var Hs=Us(Yt);function pn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kt=pn();function Ks(t){kt=t}var Xt={exec:()=>null};function ie(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(He.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var ia=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),He={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},aa=/^(?:[ \t]*(?:\n|$))+/,la=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ca=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,da=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,fn=/(?:[*+-]|\d{1,9}[.)])/,Xs=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Qs=ie(Xs).replace(/bull/g,fn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ua=ie(Xs).replace(/bull/g,fn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),hn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,pa=/^[^\n]+/,gn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,fa=ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",gn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ha=ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,fn).getRegex(),xr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",mn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ga=ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",mn).replace("tag",xr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Js=ie(hn).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex(),ma=ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Js).getRegex(),bn={blockquote:ma,code:la,def:fa,fences:ca,heading:da,hr:Qt,html:ga,lheading:Qs,list:ha,newline:aa,paragraph:Js,table:Xt,text:pa},Ws=ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex(),ba={...bn,lheading:ua,table:Ws,paragraph:ie(hn).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ws).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex()},_a={...bn,html:ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",mn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ie(hn).replace("hr",Qt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Qs).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ya=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ka=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,eo=/^( {2,}|\\)\n(?!\s*$)/,wa=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$r=/[\p{P}\p{S}]/u,_n=/[\s\p{P}\p{S}]/u,to=/[^\s\p{P}\p{S}]/u,va=ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,_n).getRegex(),ro=/(?!~)[\p{P}\p{S}]/u,xa=/(?!~)[\s\p{P}\p{S}]/u,$a=/(?:[^\s\p{P}\p{S}]|~)/u,Sa=ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ia?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),no=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Aa=ie(no,"u").replace(/punct/g,$r).getRegex(),Ta=ie(no,"u").replace(/punct/g,ro).getRegex(),so="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ea=ie(so,"gu").replace(/notPunctSpace/g,to).replace(/punctSpace/g,_n).replace(/punct/g,$r).getRegex(),Ca=ie(so,"gu").replace(/notPunctSpace/g,$a).replace(/punctSpace/g,xa).replace(/punct/g,ro).getRegex(),Ra=ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,to).replace(/punctSpace/g,_n).replace(/punct/g,$r).getRegex(),La=ie(/\\(punct)/,"gu").replace(/punct/g,$r).getRegex(),Ia=ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Da=ie(mn).replace("(?:-->|$)","-->").getRegex(),Oa=ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Da).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),kr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ma=ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",kr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),oo=ie(/^!?\[(label)\]\[(ref)\]/).replace("label",kr).replace("ref",gn).getRegex(),io=ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",gn).getRegex(),Na=ie("reflink|nolink(?!\\()","g").replace("reflink",oo).replace("nolink",io).getRegex(),Gs=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,yn={_backpedal:Xt,anyPunctuation:La,autolink:Ia,blockSkip:Sa,br:eo,code:ka,del:Xt,emStrongLDelim:Aa,emStrongRDelimAst:Ea,emStrongRDelimUnd:Ra,escape:ya,link:Ma,nolink:io,punctuation:va,reflink:oo,reflinkSearch:Na,tag:Oa,text:wa,url:Xt},Pa={...yn,link:ie(/^!?\[(label)\]\((.*?)\)/).replace("label",kr).getRegex(),reflink:ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",kr).getRegex()},cn={...yn,emStrongRDelimAst:Ca,emStrongLDelim:Ta,url:ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Gs).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Gs).getRegex()},Fa={...cn,br:ie(eo).replace("{2,}","*").getRegex(),text:ie(cn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},_r={normal:bn,gfm:ba,pedantic:_a},Vt={normal:yn,gfm:cn,breaks:Fa,pedantic:Pa},Ba={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},js=t=>Ba[t];function it(t,e){if(e){if(He.escapeTest.test(t))return t.replace(He.escapeReplace,js)}else if(He.escapeTestNoEncode.test(t))return t.replace(He.escapeReplaceNoEncode,js);return t}function Ys(t){try{t=encodeURI(t).replace(He.percentDecode,"%")}catch{return null}return t}function Vs(t,e){let r=t.replace(He.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(He.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(He.slashPipe,"|");return n}function Zt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function za(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Zs(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function qa(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var wr=class{constructor(t){pe(this,"options");pe(this,"rules");pe(this,"lexer");this.options=t||kt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Zt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=qa(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Zt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Zt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Zt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${u}`:u;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=h,r.length===0)break;let _=o.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let w=_,k=w.raw+`
`+r.join(`
`),S=this.blockquote(k);o[o.length-1]=S,n=n.substring(0,n.length-w.raw.length)+S.raw,s=s.substring(0,s.length-w.text.length)+S.text;break}else if(_?.type==="list"){let w=_,k=w.raw+`
`+r.join(`
`),S=this.list(k);o[o.length-1]=S,n=n.substring(0,n.length-_.raw.length)+S.raw,s=s.substring(0,s.length-w.raw.length)+S.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",u="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),_=t.split(`
`,1)[0],w=!h.trim(),k=0;if(this.options.pedantic?(k=2,u=h.trimStart()):w?k=e[1].length+1:(k=e[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,u=h.slice(k),k+=e[1].length),w&&this.rules.other.blankLine.test(_)&&(c+=_+`
`,t=t.substring(_.length+1),a=!0),!a){let S=this.rules.other.nextBulletRegex(k),O=this.rules.other.hrRegex(k),I=this.rules.other.fencesBeginRegex(k),P=this.rules.other.headingBeginRegex(k),F=this.rules.other.htmlBeginRegex(k);for(;t;){let C=t.split(`
`,1)[0],y;if(_=C,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),y=_):y=_.replace(this.rules.other.tabCharGlobal,"    "),I.test(_)||P.test(_)||F.test(_)||S.test(_)||O.test(_))break;if(y.search(this.rules.other.nonSpaceChar)>=k||!_.trim())u+=`
`+y.slice(k);else{if(w||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||I.test(h)||P.test(h)||O.test(h))break;u+=`
`+_}!w&&!_.trim()&&(w=!0),c+=C+`
`,t=t.substring(C.length+1),h=y.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=u.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),u=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=u}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Vs(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Vs(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Zt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=za(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Zs(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Zs(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...n[0]][0].length,h=t.slice(0,s+n.index+u+i);if(Math.min(s,i)%2){let w=h.slice(1,-1);return{type:"em",raw:h,text:w,tokens:this.lexer.inlineTokens(w)}}let _=h.slice(2,-2);return{type:"strong",raw:h,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},Je=class dn{constructor(e){pe(this,"tokens");pe(this,"options");pe(this,"state");pe(this,"inlineQueue");pe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||kt,this.options.tokenizer=this.options.tokenizer||new wr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:He,block:_r.normal,inline:Vt.normal};this.options.pedantic?(r.block=_r.pedantic,r.inline=Vt.pedantic):this.options.gfm&&(r.block=_r.gfm,this.options.breaks?r.inline=Vt.breaks:r.inline=Vt.gfm),this.tokenizer.rules=r}static get rules(){return{block:_r,inline:Vt}}static lex(e,r){return new dn(r).lex(e)}static lexInline(e,r){return new dn(r).inlineTokens(e)}lex(e){e=e.replace(He.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(He.tabCharGlobal,"    ").replace(He.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,h=e.slice(1),_;this.options.extensions.startInline.forEach(w=>{_=w.call({lexer:this},h),typeof _=="number"&&_>=0&&(u=Math.min(u,_))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},vr=class{constructor(t){pe(this,"options");pe(this,"parser");this.options=t||kt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(He.notSpaceStart)?.[0],s=t.replace(He.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${it(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Ys(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+it(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ys(t);if(s===null)return it(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${it(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:it(t.text)}},kn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},et=class un{constructor(e){pe(this,"options");pe(this,"renderer");pe(this,"textRenderer");this.options=e||kt,this.options.renderer=this.options.renderer||new vr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new kn}static parse(e,r){return new un(r).parse(e)}static parseInline(e,r){return new un(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},yr,Kt=(yr=class{constructor(t){pe(this,"options");pe(this,"block");this.options=t||kt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?Je.lex:Je.lexInline}provideParser(){return this.block?et.parse:et.parseInline}},pe(yr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),pe(yr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),yr),Ua=class{constructor(...t){pe(this,"defaults",pn());pe(this,"options",this.setOptions);pe(this,"parse",this.parseMarkdown(!0));pe(this,"parseInline",this.parseMarkdown(!1));pe(this,"Parser",et);pe(this,"Renderer",vr);pe(this,"TextRenderer",kn);pe(this,"Lexer",Je);pe(this,"Tokenizer",wr);pe(this,"Hooks",Kt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new vr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new wr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Kt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Kt.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Kt.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let u=l.call(s,c);return a.call(s,u)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return Je.lex(t,e??this.defaults)}parser(t,e){return et.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?Je.lex:Je.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?et.parse:et.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?Je.lex:Je.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?et.parse:et.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+it(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},yt=new Ua;function le(t,e){return yt.parse(t,e)}le.options=le.setOptions=function(t){return yt.setOptions(t),le.defaults=yt.defaults,Ks(le.defaults),le};le.getDefaults=pn;le.defaults=kt;le.use=function(...t){return yt.use(...t),le.defaults=yt.defaults,Ks(le.defaults),le};le.walkTokens=function(t,e){return yt.walkTokens(t,e)};le.parseInline=yt.parseInline;le.Parser=et;le.parser=et.parse;le.Renderer=vr;le.TextRenderer=kn;le.Lexer=Je;le.lexer=Je.lex;le.Tokenizer=wr;le.Hooks=Kt;le.parse=le;var Cc=le.options,Rc=le.setOptions,Lc=le.use,Ic=le.walkTokens,Dc=le.parseInline;var Oc=et.parse,Mc=Je.lex;function ao(t){let e=le.parse(t),r=zs.sanitize(e);return Hs(r)}function Ha(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function lo(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(k){k.key==="Escape"&&s&&(k.preventDefault(),_())}document.addEventListener("keydown",a);function c(){return s?f`
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
    `:f``}function u(){ue(c(),t)}async function h(k){s=k,o="loading",i="",l="",u();let S=r?r():"";if(!S){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",u();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",u();return}let O="/api/doc?workspace="+encodeURIComponent(S)+"&path="+encodeURIComponent(k);try{let I=await n(O),P=await I.json().catch(()=>({}));if(!I.ok||!P||P.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(P&&P.error||I.status)+")",u();return}i=String(P.content||""),o="ready",u()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",u()}}function _(){s=null,ue(f``,t)}function w(){document.removeEventListener("keydown",a),_()}return{open:h,close:_,destroy:w}}var Wa={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ga(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function co(t,e={}){let r=Array.isArray(t)?t:[];return r.length===0?f`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `:f`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(n=>f`<button
            type="button"
            class="detail-session detail-session--${n.status||"unknown"}"
            data-attempt-id=${n.attempt_id}
            @click=${()=>e.onOpen&&e.onOpen(n.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Wa[n.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${n.attempt_id}</span>
            <span class="detail-session__meta"
              >${[n.runner,n.model].filter(Boolean).join(" \xB7 ")}</span
            >
            <span class="detail-session__time">${Ga(n.started_at)}</span>
          </button>`)}
    </div>
  `}var ja=["open","in_progress","deferred","resolved","closed"],Ya=[0,1,2,3,4];function uo(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,u={},h=!1,_=!1,w="",k="",S="";function O(){h=!1,_=!1,w="",k="",S=""}let I=document.createElement("div");I.className="md-viewer-root",document.body.appendChild(I);let P=lo(I,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),F=document.createElement("div");F.className="session-log-root",document.body.appendChild(F);let C=fr(F,{transport:s?(g,v)=>Promise.resolve(s(g,v)):void 0,sessionLogStore:l});function y(){if(!i||!a)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(A=>A&&A.bead_id===a).sort((A,N)=>(N.started_at||0)-(A.started_at||0)).map(A=>({attempt_id:A.attempt_id,bead_id:A.bead_id,status:A.status,started_at:typeof A.started_at=="number"?A.started_at:null,runner:A.runner||null,model:A.model||null}))}function m(g){let v=i?i.get():null,A=v&&v.attempts?v.attempts[g]:null;C.open({attempt_id:g,meta:A?{runner:A.runner||void 0,model:A.model||void 0,effort:A.effort||void 0,status:A.status||void 0}:{}})}let E={onOpen:m},D=null;r&&r.subscribe&&(D=r.subscribe(()=>K()));let W=null;i&&typeof i.subscribe=="function"&&(W=i.subscribe(()=>{a&&B()}));function Z(g){g.key==="Escape"&&a&&(g.preventDefault(),n())}document.addEventListener("keydown",Z);function K(){if(a){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+a)||[];c=g.find(A=>A&&A.id===a)||g[0]||c}B()}}function Q(g){pr(g).then(v=>{v?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ie(g){g.preventDefault(),g.stopPropagation(),a&&Q(a)}function We(g,v){g.preventDefault(),g.stopPropagation(),Q(v)}function Se(g,v){g.preventDefault(),g.stopPropagation(),P.open(v)}function Ae(g,v){u[g]=v,B(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:g,value:v})).catch(()=>{se("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function ve(g,v,A){if(!s||!a)return!1;try{let N=await Promise.resolve(s(g,v)),ne=Array.isArray(N)?N[0]:N;return ne&&typeof ne=="object"&&ne.id?(c=ne,!0):(se(A,"error"),!1)}catch{return se(A,"error"),!1}}function be(g){setTimeout(()=>{try{let v=t.querySelector(g);v&&typeof v.focus=="function"&&v.focus()}catch{}},0)}function Ge(){h=!0,w=c&&c.title||"",B(),be('.detail-edit__input[data-edit="title"]')}function Ve(g){w=g.target.value}function ce(){h=!1,w="",B()}function Ke(){ve("edit-text",{id:a,field:"title",value:w},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(v=>{v&&(h=!1,w=""),B()})}function fe(){_=!0,k=c&&c.description||"",B(),be('.detail-edit__textarea[data-edit="description"]')}function x(g){k=g.target.value}function L(){_=!1,k="",B()}function U(){ve("edit-text",{id:a,field:"description",value:k},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(v=>{v&&(_=!1,k=""),B()})}function j(g,v,A,N){if(g.key==="Escape"){g.stopPropagation(),A();return}g.key==="Enter"&&(!N||g.ctrlKey||g.metaKey)&&(g.preventDefault(),v())}function X(g){let v=g.target.value;ve("update-status",{id:a,status:v},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>B())}function J(g){let v=Number(g.target.value);ve("update-priority",{id:a,priority:v},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>B())}function oe(g){S=g.target.value}function he(){let g=S.trim();g.length!==0&&ve("label-add",{id:a,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(v=>{v&&(S=""),B()})}function ge(g){if(g.key==="Escape"){g.stopPropagation(),S="",B();return}g.key==="Enter"&&(g.preventDefault(),he())}function _e(g){ve("label-remove",{id:a,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>B())}let De={onCopyPath:We,onOpenDoc:Se},Te={onChange:Ae};function Oe(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function ye(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Me(g){let A=(Array.isArray(g.dependencies)?g.dependencies:[]).map(N=>({id:Oe(N),icon:ye(N)})).filter(N=>N.id.length>0);return f`
      <div class="detail-section-label">의존성</div>
      ${A.length===0?f`<div class="detail-empty">의존성 없음</div>`:f`<div class="detail-deps">
            ${A.map(N=>o?f`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(N.id)}
                  >
                    ${N.icon?`${N.icon} `:""}${N.id}
                  </button>`:f`<span class="detail-dep"
                    >${N.icon?`${N.icon} `:""}${N.id}</span
                  >`)}
          </div>`}
    `}function Pe(g){let v=g.metadata||{},A=g.workflow||{},N=A.stages||{},ne=N.spec&&N.spec.stale,G=N.impl&&N.impl.stale,ee=A.route_source==="derived",de=A.route||v.route||"\u2014";return f`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ee?" detail-kv__v--derived":""}"
          title=${ee?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${ee&&A.route?`${de} ? (\uCD94\uB860)`:de}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${v.spec_review||"\uC5C6\uC74C"}${ne?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${v.impl_review||"\uC5C6\uC74C"}${G?" \xB7 stale":""}</span
        >
      </div>
      ${v.pr_url?f`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${v.pr_url}</span>
          </div>`:""}
    `}let Ee={route:["spec_backed","full_plan"],merge_policy:["auto_merge","pr_stop"],drift_policy:["auto_rereview","halt"]};async function M(g,v){let A=v.target.value;if(g==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&A!=="full_plan"&&!window.confirm(`full_plan \u2192 ${A||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){B();return}await ve("update-workflow-meta",{id:a,key:g,value:A},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),B()}function Ce(g){let v=g.metadata||{},A=(N,ne)=>{let G=Ee[N],ee=typeof v[N]=="string"?v[N]:"";return f`<div class="detail-kv">
        <span class="detail-kv__k">${N}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${N}
          data-edit=${`wfmeta-${N}`}
          @change=${de=>M(N,de)}
        >
          <option value="" ?selected=${!G.includes(ee)}>
            ${ne}
          </option>
          ${G.map(de=>f`<option value=${de} ?selected=${ee===de}>${de}</option>`)}
        </select>
      </div>`};return f`
      ${A("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")}
      ${A("merge_policy","(\uAE30\uBCF8 auto_merge)")}
      ${A("drift_policy","(\uAE30\uBCF8 auto_rereview)")}
    `}function ae(g){return h?f`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${w}
            @input=${Ve}
            @keydown=${v=>j(v,Ke,ce,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ke}
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
      `:f`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ge}
        >
          ✎
        </button>
      </div>
    `}function Re(g){let v=Rt(g.created_at),A=Rt(g.updated_at);return!v&&!A?f``:f`
      ${v?f`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${v}</span>
          </div>`:""}
      ${A?f`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
    `}function Fe(g,v){return f`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${X}
        >
          ${ja.map(A=>f`<option value=${A} ?selected=${A===g}>${A}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${J}
        >
          ${Ya.map(A=>f`<option value=${String(A)} ?selected=${A===v}>
                P${A}
              </option>`)}
        </select>
      </div>
    `}function Be(g){return f`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${_?"":f`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${fe}
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
              .value=${k}
              @input=${x}
              @keydown=${v=>j(v,U,L,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${U}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${L}
              >
                취소
              </button>
            </div>
          </div>`:f`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function $(g){let v=Array.isArray(g.labels)?g.labels:[];return f`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${v.map(A=>f`<span class="detail-label-chip"
              >${A}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${A}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+A}
                @click=${()=>_e(A)}
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
            @input=${oe}
            @keydown=${ge}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${he}
          >
            추가
          </button>
        </span>
      </div>
    `}function R(){if(!a)return f``;let g=c||{},v=String(g.id||a),A=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",N=g.status||"open",ne=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",G=g.description||"",ee={...g,metadata:{...g.metadata||{},...u}};return f`
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
            @click=${Ie}
          >
            ${v}
          </button>
          ${ae(A)} ${Fe(N,ne)}
          ${Re(g)} ${Be(G)}
          ${$(g)} ${Me(g)}
          ${Pe(g)} ${Ce(g)}
          ${Ss(g,De)}
          ${Ts(ee,Te)}
          ${co(y(),E)}
        </div>
      </div>
    `}function B(){ue(R(),t)}return{load(g){g!==a&&(u={},O()),a=g,c=null,K()},clear(){a=null,c=null,u={},O(),P.close(),C.close(),ue(f``,t)},destroy(){D&&(D(),D=null),W&&(W(),W=null),document.removeEventListener("keydown",Z),P.destroy(),I.parentNode&&I.parentNode.removeChild(I),C.destroy(),F.parentNode&&F.parentNode.removeChild(F),a=null,c=null,ue(f``,t)}}}var Va=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function po(t,e){return Hr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Za(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function fo(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(m){let E=r.get();if(E)try{let D=await n("display-policy-set",{expected_revision:E.revision,policy:m(E)});a(D),D&&D.conflict&&D.policy&&(D=await n("display-policy-set",{expected_revision:D.policy.revision,policy:m(D.policy)}),a(D)),D&&D.conflict&&se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(m){m&&m.policy&&typeof m.policy=="object"&&r.set(m.policy)}function c(m){let E=r.get();if(!E)return;let D=po(m,E)!=="shown";l(W=>Za(m,W,D))}function u(){let m=i.trim();m.length!==0&&(i="",l(E=>E.hidden_prefixes.includes(m)?{hidden_prefixes:E.hidden_prefixes}:{hidden_prefixes:[...E.hidden_prefixes,m]}),O())}function h(m){l(E=>({hidden_prefixes:E.hidden_prefixes.filter(D=>D!==m)}))}function _(m){let E=r.get();if(!E)return;let D=E.chips[m]===!1;l(()=>({chips:{[m]:D}}))}function w(m){let E=s();return f`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${E.length===0?f`<div class="display-settings__empty">라벨 없음</div>`:f`<div class="display-settings__pills">
              ${E.map(D=>{let W=po(D,m);return f`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${W}`}
                  data-label=${D}
                  data-state=${W}
                  @click=${()=>c(D)}
                >
                  ${D}
                </button>`})}
            </div>`}
      </section>
    `}function k(m){return f`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${m.hidden_prefixes.map(E=>f`<span class="display-settings__prefix">
                ${E}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${E} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h(E)}
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
            @input=${E=>{i=String(E.target.value||"")}}
          />
          <button type="button" @click=${u}>추가</button>
        </div>
      </section>
    `}function S(m){return f`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Va.map(([E,D])=>f`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${E}
                  .checked=${m.chips[E]!==!1}
                  @change=${()=>_(E)}
                />
                <span>${D}</span>
              </label>`)}
        </div>
      </section>
    `}function O(){let m=r.get();ue(f`
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
            ${m?f`${w(m)} ${k(m)}
                ${S(m)}`:f`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let I=!1,P=()=>{I=!1};o.addEventListener("close",P),o.addEventListener("cancel",P);let F=null;r.subscribe&&(F=r.subscribe(()=>{I&&O()}));function C(){I||(i="",I=!0,O(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function y(){I&&(I=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:C,close:y,destroy(){I=!1,o.removeEventListener("close",P),o.removeEventListener("cancel",P),F&&(F(),F=null),o.remove()}}}function ho(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,u,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let _=typeof h=="string"?h.trim():"";if(s&&(_.length>0?(s.textContent=_,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function go(t,e,r){let n=we("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return f`
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
    `}function l(){ue(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),ue(f``,t)}}}var mo=["bug","feature","task","epic","chore"];function bo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var _o=["Critical","High","Medium","Low","Backlog"];function yo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),u=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),_=r.querySelector(".new-issue__close");function w(){o.replaceChildren();let y=document.createElement("option");y.value="",y.textContent="\u2014 Select \u2014",o.appendChild(y);for(let m of mo){let E=document.createElement("option");E.value=m,E.textContent=bo(m),o.appendChild(E)}i.replaceChildren();for(let m=0;m<=4;m+=1){let E=document.createElement("option");E.value=String(m);let D=_o[m]||"Medium";E.textContent=`${m} \u2013 ${D}`,i.appendChild(E)}}w();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function S(y){s.disabled=y,o.disabled=y,i.disabled=y,l.disabled=y,a.disabled=y,u.disabled=y,h.disabled=y,h.textContent=y?"Creating\u2026":"Create"}function O(){c.textContent=""}function I(y){c.textContent=y}function P(){try{let y=window.localStorage.getItem("beads-ui.new.type");y?o.value=y:o.value="";let m=window.localStorage.getItem("beads-ui.new.priority");m&&/^\d$/.test(m)?i.value=m:i.value="2"}catch{o.value="",i.value="2"}}function F(){let y=o.value||"",m=i.value||"";y.length>0&&window.localStorage.setItem("beads-ui.new.type",y),m.length>0&&window.localStorage.setItem("beads-ui.new.priority",m)}async function C(){O();let y=String(s.value||"").trim();if(y.length===0){I("Title is required"),s.focus();return}let m=Number(i.value||"2");if(!(m>=0&&m<=4)){I("Priority must be 0..4"),i.focus();return}let E=String(o.value||""),D=String(a.value||""),W={title:y};E.length>0&&(W.type=E),String(m).length>0&&(W.priority=m),D.length>0&&(W.description=D),S(!0);try{await e("create-issue",W)}catch{S(!1),I("Failed to create issue");return}F(),S(!1),k()}return r.addEventListener("cancel",y=>{y.preventDefault(),k()}),_.addEventListener("click",()=>k()),u.addEventListener("click",()=>k()),r.addEventListener("keydown",y=>{y.key==="Enter"&&(y.ctrlKey||y.metaKey)&&(y.preventDefault(),C())}),n.addEventListener("submit",y=>{y.preventDefault(),C()}),{open(){n.reset(),O(),P();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var Ka=[{key:"worker_runner",values:()=>Vr},{key:"orchestration_model",values:t=>Qr(t)},{key:"orchestration_effort",values:()=>Zr},{key:"review_model",values:()=>Kr},{key:"impl_model",values:()=>Xr}];function ko(t,e){let{queueStore:r,transport:n}=e,s=document.createElement("dialog");s.id="worker-exec-defaults-dialog",s.className="exec-defaults",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),t.appendChild(s);function o(){return r&&r.get()||{revision:0,exec_defaults:{}}}function i(){let I=o();return typeof I.revision=="number"?I.revision:0}function l(){let I=o().exec_defaults;return I&&typeof I=="object"?I:{}}function a(I){I&&I.queue&&r&&r.set(I.queue)}async function c(I,P){if(!n)return;let F={key:I,value:P||null};try{let C=await n("worker-queue-set-exec-default",{...F,expected_revision:i()});a(C),C&&C.conflict&&(C=await n("worker-queue-set-exec-default",{...F,expected_revision:i()}),a(C)),C&&C.conflict&&se("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{se("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function u(I,P,F){let C=!!F&&!P.includes(F);return f`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${I}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${I}`}
        data-key=${I}
        @change=${y=>{c(I,y.target.value)}}
      >
        <option value="" ?selected=${!F}>(기본)</option>
        ${C?f`<option value=${F} ?selected=${!0}>
              ${F} (비호환)
            </option>`:""}
        ${P.map(y=>f`<option value=${y} ?selected=${F===y}>${y}</option>`)}
      </select>
    </div>`}function h(){let I=l(),P=I.worker_runner||"";ue(f`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${O}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            <p class="exec-defaults__hint">
              워크스페이스 전역 기본값입니다. bead metadata가 우선하며,
              '(기본)'은 미설정(하드코딩 기본)입니다.
            </p>
            ${Ka.map(F=>u(F.key,F.values(P),I[F.key]||""))}
          </div>
        </div>
      `,s)}let _=!1,w=()=>{_=!1};s.addEventListener("close",w),s.addEventListener("cancel",w);let k=null;r&&r.subscribe&&(k=r.subscribe(()=>{_&&h()}));function S(){_||(_=!0,h(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))}function O(){_&&(_=!1,typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:S,close:O,destroy(){_=!1,s.removeEventListener("close",w),s.removeEventListener("cancel",w),k&&(k(),k=null),s.remove()}}}function Xa(t){let e=t.draggable&&!t.done;return f`<div
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
    ${r?ur(r,t.status):""}
    ${t.reason?f`<div class="worker-card__foot">
          <span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >
        </div>`:""}
  </div>`}function Jt(t){return f`<section
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
  </section>`}function Ja(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function wo(t){return f`<div class="worker-banners">
    ${t.autoAdvance?f`<div class="worker-banner worker-banner--on" role="status">
          ▶ 자동 진행 켜짐 — Serial head 1 + Parallel 슬롯까지 실행합니다.
        </div>`:f`<div class="worker-banner worker-banner--off" role="status">
          ⏸ 자동 진행 꺼짐 — 새 세션을 시작하지 않습니다. ▶로 재개.
        </div>`}
    ${t.breaker?f`<div class="worker-banner worker-banner--breaker" role="alert">
          ⛔ ${t.breaker.repo||"repo"} 세션 실패로 차단 —
          ${t.breaker.reason||""}. 신규 launch·머지 진입 차단, 수동 ▶
          필요.
        </div>`:""}
  </div>`}function el(t,e,r=null){let n=t.lane==="serial"?"serial":"\u2225",s=typeof t.started_at=="number"?Ja(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=t.attempt_id&&t.attempt_id===r;return f`<div
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
    ${o?f`<div class="rtile__meta">${o}</div>`:""}
    ${t.merge_policy?f`<div class="rtile__meta rtile__meta--policy">
          ${t.merge_policy}${t.demoted_reason?f` <span
                class="rtile__demoted"
                title=${`\uAC15\uB4F1: ${t.demoted_reason}`}
                >⤵ ${t.demoted_reason}</span
              >`:""}
        </div>`:""}
  </div>`}function vo(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return f`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?f`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>el(s,e,r))}
  </div>`}var tl="tab:worker:ready",rl="tab:worker:blocked";function nl(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function sl(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function ol(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function wn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l}=e,a=n?lr(n,i):null,c=cr({transport:r,uiOrderStore:i}),u=null,h=[],_=[],w=document.createElement("div");w.className="worker-console";let k=document.createElement("div"),S=document.createElement("div");S.className="worker-drawer-host";let O=document.createElement("div");O.className="worker-lanes-host",w.append(k,S,O),t.appendChild(w);let I=null,P=fr(S,{transport:r,sessionLogStore:o,onClose:()=>{I=null,Ae()}}),F=ko(w,{queueStore:s,transport:r});function C(){return s&&s.get()||{revision:0,auto_advance:!1,serial:[],parallel:[],done:[]}}function y(){let x=C();return typeof x.revision=="number"?x.revision:0}function m(x){x&&x.queue&&s&&s.set(x.queue)}async function E(x,L,U){if(!r)return;let j=await r("worker-queue-place",{bead_id:x,lane:L,index:U,expected_revision:y()});m(j),j&&j.conflict&&await r("worker-queue-place",{bead_id:x,lane:L,index:U,expected_revision:y()}).then(m)}async function D(x,L,U){if(!r)return;let j=await r("worker-queue-reorder",{bead_id:x,lane:L,to_index:U,expected_revision:y()});m(j),j&&j.conflict&&await r("worker-queue-reorder",{bead_id:x,lane:L,to_index:U,expected_revision:y()}).then(m)}async function W(x){if(!r)return;let L=await r("worker-queue-remove",{bead_id:x,expected_revision:y()});m(L),L&&L.conflict&&await r("worker-queue-remove",{bead_id:x,expected_revision:y()}).then(m)}async function Z(x){!r||!x||await r("worker-attempt-stop",{attempt_id:x})}async function K(x){if(!r)return;let L=await r("worker-queue-toggle",{on:x,expected_revision:y()});m(L),L&&L.conflict&&await r("worker-queue-toggle",{on:x,expected_revision:y()}).then(m)}async function Q(x,L){if(!r)return;let U={key:x,value:L||null},j=await r("worker-queue-set-policy",{...U,expected_revision:y()});m(j),j&&j.conflict&&await r("worker-queue-set-policy",{...U,expected_revision:y()}).then(m)}function Ie(){let x=C(),L=a?a.selectBoardColumn(tl,"ready"):[],U=a?a.selectBoardColumn(rl,"blocked"):[],j=new Map;for(let M of[...L,...U])j.set(M.id,M.title||M.id);let X=new Set([...x.serial.map(M=>M.bead_id),...x.parallel.map(M=>M.bead_id),...x.done.map(M=>M.bead_id)]),J=new Set(U.map(M=>M.id)),oe=i?i.get()?.order||{}:{},he=new Set,ge=[];for(let M of[...L,...U])X.has(M.id)||he.has(M.id)||sl(M)||(he.add(M.id),ge.push(M));ge.sort(ir(oe)),h=ge;let _e=x.admission||{},De=M=>_e[M]?`\u26D4 ${_e[M].reason}`:"",Te=ge.map(M=>{let Ce=nl(M),ae=[];J.has(M.id)&&ae.push(ol(M)),Ce||ae.push("spec \uC5C6\uC74C");let Re=De(M.id);return Re&&ae.push(Re),{id:M.id,title:M.title||M.id,reason:ae.join(" \xB7 "),draggable:Ce,lane:"candidate",workflow:M.workflow,status:M.status}}),Oe=(M,Ce)=>M.map(ae=>({id:ae.bead_id,title:j.get(ae.bead_id)||ae.bead_id,reason:Ce==="done"?"":De(ae.bead_id),draggable:Ce!=="done",done:Ce==="done",lane:Ce})),ye=new Map;for(let M of x.serial||[])ye.set(M.bead_id,"serial");for(let M of x.parallel||[])ye.set(M.bead_id,"parallel");let Me=x.attempts?Object.values(x.attempts):[],Pe=[],Ee=null;for(let M of Me)M.status==="running"?Pe.push({bead_id:M.bead_id,attempt_id:M.attempt_id,title:j.get(M.bead_id)||M.bead_id,lane:ye.get(M.bead_id)||"parallel",runner:M.runner||null,model:M.model||null,effort:M.effort||null,started_at:typeof M.started_at=="number"?M.started_at:null,merge_policy:M.merge_policy||null,demoted_reason:M.demoted_reason||null}):(M.status==="failed"||M.status==="orphaned")&&(Ee={repo:M.repo||"",reason:M.cause||M.status});return{queue:x,idToTitle:j,candidates:Te,running:Pe,breaker:Ee,serial:Oe(x.serial,"serial"),parallel:Oe(x.parallel,"parallel"),done:Oe(x.done,"done")}}function We(x){let L=x.serial.length>0?x.serial[0].id:"\u2014",U=x.queue.workspace_info||{},j=U.verify_cmd&&Array.isArray(U.verify_cmd.cmd)?U.verify_cmd.cmd.join(" "):null,X=(J,oe,he)=>{let ge=typeof x.queue[J]=="string"?x.queue[J]:"";return f`<label class="worker-policy">
        <span class="worker-policy__k">${J}</span>
        <select
          class="worker-policy__sel"
          aria-label=${`\uC804\uC5ED ${J}`}
          data-policy-key=${J}
          @change=${_e=>{Q(J,_e.target.value)}}
        >
          <option value="" ?selected=${!oe.includes(ge)}>
            ${he}
          </option>
          ${oe.map(_e=>f`<option value=${_e} ?selected=${ge===_e}>${_e}</option>`)}
        </select>
      </label>`};return f`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${x.queue.auto_advance?" is-active":""}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${x.running.length}</b> · serial 다음
          <b>${L}</b></span
        >
        <span class="worker-tgl"
          >parallel slot <b>${x.parallel.length}</b></span
        >
        ${X("merge_policy",["auto_merge","pr_stop"],"(\uAE30\uBCF8 auto_merge)")}
        ${X("drift_policy",["auto_rereview","halt"],"(\uAE30\uBCF8 auto_rereview)")}
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
          class="worker-verifycmd${j?"":" worker-verifycmd--unset"}"
          title="verify_cmd — 서버 설정 파일 전용(읽기), 미설정 시 auto_merge가 pr_stop으로 강등"
          >verify_cmd:
          ${j?f`<code>${j}</code>`:"\uBBF8\uC124\uC815 (auto_merge\u2192pr_stop \uAC15\uB4F1)"}</span
        >
      </div>
      ${wo({autoAdvance:!!x.queue.auto_advance,breaker:x.breaker})}
      ${vo(x.running,Date.now(),I)}`}function Se(x){return f`<div class="worker-lanes">
      ${Jt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:x.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${Jt({id:"worker-pane-serial",lane:"serial",title:"Serial \uD050",items:x.serial,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Jt({id:"worker-pane-parallel",lane:"parallel",title:"Parallel \uD480",items:x.parallel,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Jt({id:"worker-pane-done",lane:"done",title:`Done \xB7 \uC624\uB298 ${x.done.length}`,items:x.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Ae(){let x=Ie();ue(We(x),k),ue(Se(x),O)}function ve(x){let L=x.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!L)return;let U=L.dataset.beadId||"",j=L.dataset.lane||"";u={bead_id:U,from_lane:j};try{x.dataTransfer?.setData("text/plain",U),x.dataTransfer&&(x.dataTransfer.effectAllowed="move")}catch{}}function be(x){let L=x.target?.closest?.(".worker-pane");L&&(x.preventDefault(),x.dataTransfer&&(x.dataTransfer.dropEffect="move"),L.classList.add("worker-pane--drag-over"))}function Ge(x){x.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ve(x,L){let U=h.find(oe=>oe.id===x);if(!U)return;let j=h.filter(oe=>oe.id!==x),X=j.length;if(L){let oe=L.dataset.beadId;if(oe===x)return;let he=j.findIndex(ge=>ge.id===oe);he>=0&&(X=he)}let J=j.slice();J.splice(X,0,U),c.applyReorder(x,J,X)}function ce(x){let L=x.target?.closest?.(".worker-pane");if(!L)return;x.preventDefault(),L.classList.remove("worker-pane--drag-over");let U=L.dataset.lane||"",j=u?.bead_id||x.dataTransfer?.getData("text/plain")||"",X=u?.from_lane||"";if(u=null,!j)return;let J=x.target?.closest?.(".worker-mini, .worker-card"),oe=Array.from(L.querySelectorAll(".worker-mini, .worker-card")),he=oe.length;if(J){let ge=oe.indexOf(J);ge>=0&&(he=ge)}if(U==="candidate"){if(X==="candidate"){Ve(j,J);return}(X==="serial"||X==="parallel")&&W(j);return}(U==="serial"||U==="parallel")&&(X===U?D(j,U,he):E(j,U,he))}function Ke(x){let L=C(),U=L.attempts?L.attempts[x]:null,j=U?{runner:U.runner||void 0,model:U.model||void 0,effort:U.effort||void 0,worktree:U.worktree||void 0,status:U.status||void 0}:{};I=x,P.open({attempt_id:x,meta:j}),Ae()}function fe(x){let L=x.target;if(L?.closest?.("#worker-exec-defaults-dialog"))return;if(L?.closest?.(".worker-exec-defaults-btn")){F.open();return}if(L?.closest?.(".worker-play")){K(!0);return}if(L?.closest?.(".worker-pause")){K(!1);return}if(L?.closest?.(".rtile__stop")){let J=L?.closest?.(".rtile")?.dataset?.attemptId;J&&Z(J);return}if(L?.closest?.(".rtile__info")){let J=L?.closest?.(".rtile")?.dataset?.beadId;J&&l&&l(J);return}if(L?.closest?.(".worker-drawer-host"))return;let U=L?.closest?.(".rtile");if(U){let X=U.dataset.attemptId;X&&Ke(X);return}let j=L?.closest?.(".worker-mini, .worker-card");if(j){let X=j.dataset.beadId;if(L?.closest?.(".worker-mini__id, .worker-card__id")){X&&pr(X).then(J=>{J?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}X&&l&&l(X)}}return t.addEventListener("dragstart",ve),t.addEventListener("dragover",be),t.addEventListener("dragleave",Ge),t.addEventListener("drop",ce),t.addEventListener("click",fe),a&&_.push(a.subscribe(Ae)),s&&_.push(s.subscribe(Ae)),Ae(),{load(){Ae()},destroy(){for(let x of _.splice(0))try{x()}catch{}t.removeEventListener("dragstart",ve),t.removeEventListener("dragover",be),t.removeEventListener("dragleave",Ge),t.removeEventListener("drop",ce),t.removeEventListener("click",fe);try{P.destroy()}catch{}try{F.destroy()}catch{}ue(f``,t)}}}function vn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function xo(t,e,r,n=async()=>{},s=async()=>{}){let o=we("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function u(m){let D=m.target.value,Z=e.getState().workspace?.current?.path||"";if(D&&D!==Z){o("switching workspace to %s",D),l=!0,y();try{await r(D)}catch(K){o("workspace switch failed: %o",K)}finally{l=!1,y()}}}async function h(){let m=e.getState(),E=m.workspace?.current?.path||m.workspace?.available?.[0]?.path||"";if(!(!E||a)){o("git-pulling workspace %s",E),a=!0,y();try{await n(E)}catch(D){o("workspace git pull failed: %o",D)}finally{a=!1,y()}}}function _(m){let E=m.target;E&&t.contains(E)||S()}function w(m){m.key==="Escape"&&S()}function k(){c||(c=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",w),y())}function S(){c&&(c=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",w),y())}function O(){c?S():k()}async function I(m){let E=m.target,D=E.value,W=E.checked;o("toggling visibility %s \u2192 %s",D,String(W));try{await s(D,W)}catch(Z){o("workspace visibility toggle failed: %o",Z)}}function P(m){return m?f`
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
    `:f``}function F(m,E){return f`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${O}
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
                ${m.map(D=>f`
                    <label
                      class="workspace-picker__manage-row"
                      title="${D.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${D.path}"
                        .checked=${!E.has(D.path)}
                        @change=${I}
                      />
                      <span class="workspace-picker__manage-name"
                        >${vn(D.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function C(){let m=e.getState(),E=m.workspace?.current,D=m.workspace?.available||[],W=new Set(m.workspace?.hidden||[]),Z=E?.path||D[0]?.path||"";if(D.length===0)return f``;let K=D.filter(Q=>!W.has(Q.path)||Q.path===Z);if(K.length<=1){let Q=K[0]||D[0],Ie=vn(Q.path);return f`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Q.path}"
            >${Ie}</span
          >
          ${F(D,W)}
          ${P(Z)}
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
          ${K.map(Q=>f`
              <option
                value="${Q.path}"
                ?selected=${Q.path===Z}
                title="${Q.path}"
              >
                ${vn(Q.path)}
              </option>
            `)}
        </select>
        ${F(D,W)}
        ${P(Z)}
        ${l||a?f`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function y(){ue(C(),t)}return y(),i=e.subscribe(()=>y()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",w),ue(f``,t)}}}var $o=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-policy","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-stop","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function xn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function So(t,e,r=xn()){return{id:r,type:t,payload:e}}function Ao(t={}){let e=we("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,u=[],h=new Map,_=new Set;function w(C){for(let y of Array.from(_))try{y(C)}catch{}}function k(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),w(o);let C=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),y=(r.jitterRatio||0)*C,m=Math.max(0,Math.round(C+(Math.random()*2-1)*y));e("ws retry in %d ms (attempt %d)",m,i+1),l=setTimeout(()=>{l=null,F()},m)}function S(C){try{s?.send(JSON.stringify(C))}catch(y){e("ws send failed",y)}}function O(){for(o="open",e("ws open"),w(o),i=0;u.length;){let C=u.shift();C&&S(C)}}function I(C){let y;try{y=JSON.parse(String(C.data))}catch{e("ws received non-JSON message");return}if(!y||typeof y.id!="string"||typeof y.type!="string"){e("ws received invalid envelope");return}if(c.has(y.id)){let E=c.get(y.id);c.delete(y.id),y.ok?E?.resolve(y.payload):E?.reject(y.error||new Error("ws error"));return}let m=h.get(y.type);if(m&&m.size>0)for(let E of Array.from(m))try{E(y.payload)}catch(D){e("ws event handler error",D)}else e("ws received unhandled message type: %s",y.type)}function P(){o="closed",e("ws closed"),w(o);for(let[C,y]of c.entries())y.reject(new Error("ws disconnected")),c.delete(C);i+=1,k()}function F(){if(!a)return;let C=n();try{s=new WebSocket(C),e("ws connecting %s",C),o="connecting",w(o),s.addEventListener("open",O),s.addEventListener("message",I),s.addEventListener("error",()=>{}),s.addEventListener("close",P)}catch(y){e("ws connect failed %o",y),k()}}return F(),{send(C,y){if(!$o.includes(C))return Promise.reject(new Error(`unknown message type: ${C}`));let m=xn(),E=So(C,y,m);return e("send %s id=%s",C,m),new Promise((D,W)=>{c.set(m,{resolve:D,reject:W,type:C}),s&&s.readyState===s.OPEN?S(E):(e("queue %s id=%s (state=%s)",C,m,o),u.push(E))})},on(C,y){h.has(C)||h.set(C,new Set);let m=h.get(C);return m?.add(y),()=>{m?.delete(y)}},onConnection(C){return _.add(C),()=>{_.delete(C)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,F()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function il(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function al(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var $n=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],To=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Eo="worker:queue",Co="ui:order",Ro="ui:display-policy",dt="tab:board:closed",Lo="beads-ui.board.closed-range";function ll(t){let e=we("main");e("bootstrap start");let r=f`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ue(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let D=function(p,b){let Y="Request failed",H="";if(p&&typeof p=="object"){let ke=p;if(typeof ke.message=="string"&&ke.message.length>0&&(Y=ke.message),typeof ke.details=="string")H=ke.details;else if(ke.details&&typeof ke.details=="object")try{H=JSON.stringify(ke.details,null,2)}catch{H=""}}else typeof p=="string"&&p.length>0&&(Y=p);let te=b&&b.length>0?`Failed to load ${b}`:"Request failed";E.open(te,Y,H)},L=function(p){return`${G.getState().workspace.current?.path||""}\0${p}`},U=function(){ve&&(ve().catch(()=>{}),ve=null),be=null,Ge=null},X=function(p){Ve=p;let b=()=>{Ve!==p||G.getState().selected_id!==p||(Ve=null,j(p))};if(!fe){Ke.then(b);return}b()},ge=function(){let p=Gn(he);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},_e=function(p){if(p)for(let[b,Y]of $n){if(J.has(b)||oe.has(b))continue;let H=b===dt?ge():{type:Y};try{Q.register(b,H)}catch(te){e("register %s store failed: %o",b,te)}oe.add(b),K.subscribeList(b,H).then(te=>{J.set(b,te)}).catch(te=>{e("subscribe %s failed: %o",b,te),D(te,"board")}).finally(()=>{oe.delete(b)})}else Te()},Te=function(){for(let[p]of $n){let b=J.get(p);b&&(b().catch(()=>{}),J.delete(p));try{Q.unregister(p)}catch(Y){e("unregister %s failed: %o",p,Y)}}},Me=function(p){if(!p){Pe();return}for(let[b,Y]of To)if(!(Oe.has(b)||oe.has(b))){try{Q.register(b,{type:Y})}catch(H){e("register %s store failed: %o",b,H)}oe.add(b),K.subscribeList(b,{type:Y}).then(H=>{Oe.set(b,H)}).catch(H=>{e("subscribe %s failed: %o",b,H),D(H,"worker")}).finally(()=>{oe.delete(b)})}ye||(Z("subscribe-worker-queue",{id:Eo}).catch(b=>{e("subscribe-worker-queue failed: %o",b)}),ye=()=>Z("unsubscribe-worker-queue",{id:Eo}))},Pe=function(){for(let[p]of To){let b=Oe.get(p);b&&(b().catch(()=>{}),Oe.delete(p));try{Q.unregister(p)}catch(Y){e("unregister %s failed: %o",p,Y)}}ye&&(ye().catch(()=>{}),ye=null)},M=function(){Ee||(Z("subscribe-ui-order",{id:Co}).catch(p=>{e("subscribe-ui-order failed: %o",p)}),Ee=()=>Z("unsubscribe-ui-order",{id:Co}))},Ce=function(){Ee&&(Ee().catch(()=>{}),Ee=null),We.clear()},Re=function(){ae||(Z("subscribe-display-policy",{id:Ro}).catch(p=>{e("subscribe-display-policy failed: %o",p)}),ae=()=>Z("unsubscribe-display-policy",{id:Ro}))},Fe=function(){ae&&(ae().catch(()=>{}),ae=null),Se.clear()},v=function(p){if(!p)return"Unknown";let b=p.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var l=D,a=L,c=U,u=X,h=ge,_=_e,w=Te,k=Me,S=Pe,O=M,I=Ce,P=Re,F=Fe,C=v;let y=document.getElementById("header-loading"),m=hs(y),E=ho(t),W=Ao(),Z=m.wrapSend((p,b)=>W.send(p,b)),K=as(Z),Q=ls(),Ie=ds(),We=cs(),Se=jn(),Ae=Yn();W.on("worker-queue-snapshot",p=>{let b=p;if(b&&b.queue)try{Ie.set(b.queue)}catch{}}),W.on("ui-order-snapshot",p=>{let b=p;if(b&&typeof b.revision=="number")try{We.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),W.on("display-policy-snapshot",p=>{let b=p;if(b&&b.policy&&typeof b.policy=="object")try{Se.set(b.policy)}catch{}}),W.on("session-log-snapshot",p=>{let b=p;if(b&&typeof b.attempt_id=="string")try{Ae.set(b.attempt_id,Array.isArray(b.lines)?b.lines:[])}catch{}}),W.on("session-log-append",p=>{let b=p;if(b&&typeof b.attempt_id=="string")try{Ae.append(b.attempt_id,b.event)}catch{}}),W.on("snapshot",p=>{let b=p,Y=b&&typeof b.id=="string"?b.id:"",H=Y?Q.getStore(Y):null;if(H&&b&&b.type==="snapshot")try{H.applyPush(b)}catch{}}),W.on("upsert",p=>{let b=p,Y=b&&typeof b.id=="string"?b.id:"",H=Y?Q.getStore(Y):null;if(H&&b&&b.type==="upsert")try{H.applyPush(b)}catch{}}),W.on("delete",p=>{let b=p,Y=b&&typeof b.id=="string"?b.id:"",H=Y?Q.getStore(Y):null;if(H&&b&&b.type==="delete")try{H.applyPush(b)}catch{}});let ve=null,be=null,Ge=null,Ve=null,ce=()=>{},Ke=new Promise(p=>{ce=()=>p(void 0)}),fe=!1,x=!1;async function j(p){let b=L(p);if(b===be||b===Ge)return;Ge=b;let Y=`detail:${p}`,H={type:"issue-detail",params:{id:p}};try{Q.register(Y,H)}catch(te){e("register detail store failed: %o",te)}try{let te=await K.subscribeList(Y,H);if(G.getState().selected_id!==p||L(p)!==b){await te().catch(()=>{});return}ve&&await ve().catch(()=>{}),ve=te,be=b}catch(te){e("detail subscribe failed: %o",te),D(te,"issue details")}finally{Ge===b&&(Ge=null)}}let J=new Map,oe=new Set,he=nr;try{let p=window.localStorage.getItem(Lo);Fr(p)&&(he=p)}catch{}async function De(p){if(!Fr(p)||p===he)return;he=p;try{window.localStorage.setItem(Lo,p)}catch{}let b=J.get(dt);if(!b)return;J.delete(dt),await b().catch(()=>{});let Y=ge();try{Q.register(dt,Y)}catch(H){e("register %s store failed: %o",dt,H)}try{let H=await K.subscribeList(dt,Y);J.set(dt,H)}catch(H){e("re-subscribe %s failed: %o",dt,H),D(H,"board")}}let Oe=new Map,ye=null,Ee=null,ae=null;async function Be(){ae=null,Se.clear();let p=G.getState().workspace.current?.path;if(p)try{await W.send("set-workspace",{path:p})}catch(b){e("workspace restore after reconnect failed: %o",b);return}Re()}async function $(){e("clearing all subscriptions for workspace switch"),Te(),Pe(),Ie.clear(),Ce(),M(),Fe(),Re(),U();let p=G.getState();if(p.selected_id)try{Q.unregister(`detail:${p.selected_id}`)}catch{}let b=G.getState();_e(b.view==="board"),Me(b.view==="worker"),b.selected_id&&X(b.selected_id)}async function R(p){e("requesting workspace switch to %s",p),x=!0;try{let b=await W.send("set-workspace",{path:p});e("workspace switch result: %o",b),b&&b.workspace&&(G.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",p),b.changed&&(await $(),se("Switched to "+v(p),"success",2e3)))}catch(b){throw e("workspace switch failed: %o",b),se("Failed to switch workspace","error",3e3),b}finally{x=!1}}async function B(p){e("requesting workspace git pull for %s",p);try{let b=await W.send("git-pull-workspace",{});e("workspace git pull result: %o",b);let Y=b?.status;if(Y==="up_to_date"){se("Already up to date","success",2e3);return}if(Y==="stash_pop_conflict"){se("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}se("Git pulled "+v(p),"success",2e3)}catch(b){e("workspace git pull failed: %o",b);let Y=b?.code,H=b?.message;if(Y==="rebase_conflict"){se("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Y==="rebase_conflict_abort_failed"){se("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Y==="busy"){se("Git pull skipped: another operation is running","warning",3e3);return}let te=H?`: ${H}`:"";throw se(`Git pull failed${te}`,"error",3e3),b}}async function g(p,b){e("setting workspace visibility %s \u2192 %s",p,String(b));try{await W.send("set-workspace-visibility",{path:p,visible:b}),await A()}catch(Y){e("workspace visibility update failed: %o",Y),se("Failed to update project visibility","error",3e3)}}async function A(){try{let p=await W.send("list-workspaces",{});if(e("workspaces loaded: %o",p),p&&Array.isArray(p.workspaces)){let b=p.workspaces.map(ke=>({path:ke.path,database:ke.database,pid:ke.pid,version:ke.version})),Y=p.current?{path:p.current.root_dir,database:p.current.db_path}:null,H=Array.isArray(p.hidden)?p.hidden.filter(ke=>typeof ke=="string"):[];G.setState({workspace:{current:Y,available:b,hidden:H}});let te=window.localStorage.getItem("beads-ui.workspace");te&&(!b.some(tr=>tr.path===te)||H.includes(te)?window.localStorage.removeItem("beads-ui.workspace"):Y&&te!==Y.path&&(e("restoring saved workspace preference: %s",te),await R(te)))}}catch(p){e("failed to load workspaces: %o",p)}}W.on("workspace-changed",p=>{e("workspace-changed event: %o",p),p&&p.root_dir&&(G.setState({workspace:{current:{path:p.root_dir,database:p.db_path}}}),A(),$())});let N=!1;if(typeof W.onConnection=="function"){let p=b=>{e("ws state %s",b),b==="reconnecting"||b==="closed"?(N=!0,se("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&N&&(N=!1,se("Reconnected","success",2200),al(G,(Y,H)=>{e(`${Y}: %o`,H)}),Be())};W.onConnection(p)}let ne="board";try{let p=window.localStorage.getItem("beads-ui.view");(p==="board"||p==="worker")&&(ne=p)}catch(p){e("view parse error: %o",p)}let G=fs({config:il(),view:ne}),ee=us(G);ee.start();let de=async(p,b)=>{try{return await Z(p,b)}catch{return[]}};n&&go(n,G,ee);let V=document.getElementById("workspace-picker");V&&xo(V,G,R,B,g);let at=yo(t,(p,b)=>Z(p,b));try{let p=document.getElementById("new-issue-btn");p&&p.addEventListener("click",()=>at.open())}catch{}let wt=fo(t,{policyStore:Se,transport:(p,b)=>Z(p,b),labelOptions:()=>{let p=new Set;for(let[b]of $n)for(let Y of Q.snapshotFor(b)||[]){let H=Y.labels;if(Array.isArray(H))for(let te of H)typeof te=="string"&&te.length>0&&p.add(te)}return Array.from(p).sort()}});try{let p=document.getElementById("display-settings-btn");p&&p.addEventListener("click",()=>wt.open())}catch{}let vt=ws(s,{gotoIssue:p=>ee.gotoIssue(p),issueStores:Q,transport:de,uiOrderStore:We,displayPolicyStore:Se,closedRange:he,onClosedRangeChange:p=>{De(p)},onNewIssue:()=>at.open()}),Sr=wn(o,{transport:de,issueStores:Q,queueStore:Ie,sessionLogStore:Ae,uiOrderStore:We,gotoIssue:p=>G.setState({selected_id:p})}),rt=uo(i,{issueStores:Q,transport:de,queueStore:Ie,sessionLogStore:Ae,getWorkspacePath:()=>G.getState().workspace.current?.path,onNavigate:p=>{G.getState().view==="worker"?G.setState({selected_id:p}):ee.gotoIssue(p)},onClose:()=>{let p=G.getState();G.setState({selected_id:null});try{ee.gotoView(p.view==="worker"?"worker":"board")}catch{}}}),Ot=G.getState().selected_id;Ot&&(i.hidden=!1,rt.load(Ot),X(Ot)),G.subscribe(p=>{let b=p.selected_id;b?(i.hidden=!1,rt.load(b),x||X(b)):(rt.clear(),i.hidden=!0,U())});let er=p=>{s.hidden=p.view!=="board",o.hidden=p.view!=="worker",_e(p.view==="board"),Me(p.view==="worker"),!p.selected_id&&p.view==="board"&&vt.load(),p.view==="worker"&&Sr.load(),window.localStorage.setItem("beads-ui.view",p.view)};G.subscribe(er),er(G.getState()),M(),Re(),A().finally(()=>{fe=!0,ce()}),window.addEventListener("keydown",p=>{let b=p.ctrlKey||p.metaKey,Y=String(p.key||"").toLowerCase(),H=p.target,te=H&&H.tagName?String(H.tagName).toLowerCase():"",ke=te==="input"||te==="textarea"||te==="select"||H&&typeof H.isContentEditable=="boolean"&&H.isContentEditable;b&&Y==="n"&&(ke||(p.preventDefault(),at.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&ll(e)});export{ll as bootstrap,il as readBootstrapConfig,al as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
