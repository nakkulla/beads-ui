var No=Object.create;var Cr=Object.defineProperty;var Po=Object.getOwnPropertyDescriptor;var Fo=Object.getOwnPropertyNames;var Bo=Object.getPrototypeOf,zo=Object.prototype.hasOwnProperty;var qo=(t,e,r)=>e in t?Cr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Rr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Uo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Fo(e))!zo.call(t,s)&&s!==r&&Cr(t,s,{get:()=>e[s],enumerable:!(n=Po(e,s))||n.enumerable});return t};var Ho=(t,e,r)=>(r=t!=null?No(Bo(t)):{},Uo(e||!t||!t.__esModule?Cr(r,"default",{value:t,enumerable:!0}):r,t));var fe=(t,e,r)=>qo(t,typeof e!="symbol"?e+"":e,r);var Xn=Rr((yl,Kn)=>{var At=1e3,Tt=At*60,Et=Tt*60,mt=Et*24,Vo=mt*7,Zo=mt*365.25;Kn.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Ko(t);if(r==="number"&&isFinite(t))return e.long?Qo(t):Xo(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Ko(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Zo;case"weeks":case"week":case"w":return r*Vo;case"days":case"day":case"d":return r*mt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Et;case"minutes":case"minute":case"mins":case"min":case"m":return r*Tt;case"seconds":case"second":case"secs":case"sec":case"s":return r*At;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Xo(t){var e=Math.abs(t);return e>=mt?Math.round(t/mt)+"d":e>=Et?Math.round(t/Et)+"h":e>=Tt?Math.round(t/Tt)+"m":e>=At?Math.round(t/At)+"s":t+"ms"}function Qo(t){var e=Math.abs(t);return e>=mt?ir(t,e,mt,"day"):e>=Et?ir(t,e,Et,"hour"):e>=Tt?ir(t,e,Tt,"minute"):e>=At?ir(t,e,At,"second"):t+" ms"}function ir(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Jn=Rr((kl,Qn)=>{function Jo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Xn(),r.destroy=c,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let h=0;for(let _=0;_<u.length;_++)h=(h<<5)-h+u.charCodeAt(_),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(u){let h,_=null,x,k;function S(...O){if(!S.enabled)return;let P=S,q=Number(new Date),I=q-(h||q);P.diff=I,P.prev=h,P.curr=q,h=q,O[0]=r.coerce(O[0]),typeof O[0]!="string"&&O.unshift("%O");let C=0;O[0]=O[0].replace(/%([a-zA-Z%])/g,(b,w)=>{if(b==="%%")return"%";C++;let v=r.formatters[w];if(typeof v=="function"){let F=O[C];b=v.call(P,F),O.splice(C,1),C--}return b}),r.formatArgs.call(P,O),(P.log||r.log).apply(P,O)}return S.namespace=u,S.useColors=r.useColors(),S.color=r.selectColor(u),S.extend=n,S.destroy=r.destroy,Object.defineProperty(S,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(x!==r.namespaces&&(x=r.namespaces,k=r.enabled(u)),k),set:O=>{_=O}}),typeof r.init=="function"&&r.init(S),S}function n(u,h){let _=r(this.namespace+(typeof h>"u"?":":h)+u);return _.log=this.log,_}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let h=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of h)_[0]==="-"?r.skips.push(_.slice(1)):r.names.push(_)}function o(u,h){let _=0,x=0,k=-1,S=0;for(;_<u.length;)if(x<h.length&&(h[x]===u[_]||h[x]==="*"))h[x]==="*"?(k=x,S=_,x++):(_++,x++);else if(k!==-1)x=k+1,S++,_=S;else return!1;for(;x<h.length&&h[x]==="*";)x++;return x===h.length}function i(){let u=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),u}function l(u){for(let h of r.skips)if(o(u,h))return!1;for(let h of r.names)if(o(u,h))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Qn.exports=Jo});var es=Rr((We,ar)=>{We.formatArgs=ti;We.save=ri;We.load=ni;We.useColors=ei;We.storage=si();We.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();We.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ei(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ti(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+ar.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}We.log=console.debug||console.log||(()=>{});function ri(t){try{t?We.storage.setItem("debug",t):We.storage.removeItem("debug")}catch{}}function ni(){let t;try{t=We.storage.getItem("debug")||We.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function si(){try{return localStorage}catch{}}ar.exports=Jn()(We);var{formatters:oi}=ar.exports;oi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Pt=globalThis,sr=Pt.trustedTypes,Nn=sr?sr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Un="$lit$",lt=`lit$${Math.random().toFixed(9).slice(2)}$`,Hn="?"+lt,Wo=`<${Hn}>`,ht=document,Ft=()=>ht.createComment(""),Bt=t=>t===null||typeof t!="object"&&typeof t!="function",Pr=Array.isArray,Go=t=>Pr(t)||typeof t?.[Symbol.iterator]=="function",Lr=`[ 	
\f\r]`,Nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pn=/-->/g,Fn=/>/g,pt=RegExp(`>|${Lr}(?:([^\\s"'>=/]+)(${Lr}*=${Lr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bn=/'/g,zn=/"/g,Wn=/^(?:script|style|textarea|title)$/i,Fr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),p=Fr(1),fl=Fr(2),hl=Fr(3),gt=Symbol.for("lit-noChange"),$e=Symbol.for("lit-nothing"),qn=new WeakMap,ft=ht.createTreeWalker(ht,129);function Gn(t,e){if(!Pr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nn!==void 0?Nn.createHTML(e):e}var jo=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Nt;for(let l=0;l<r;l++){let a=t[l],c,u,h=-1,_=0;for(;_<a.length&&(i.lastIndex=_,u=i.exec(a),u!==null);)_=i.lastIndex,i===Nt?u[1]==="!--"?i=Pn:u[1]!==void 0?i=Fn:u[2]!==void 0?(Wn.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=pt):u[3]!==void 0&&(i=pt):i===pt?u[0]===">"?(i=s??Nt,h=-1):u[1]===void 0?h=-2:(h=i.lastIndex-u[2].length,c=u[1],i=u[3]===void 0?pt:u[3]==='"'?zn:Bn):i===zn||i===Bn?i=pt:i===Pn||i===Fn?i=Nt:(i=pt,s=void 0);let x=i===pt&&t[l+1].startsWith("/>")?" ":"";o+=i===Nt?a+Wo:h>=0?(n.push(c),a.slice(0,h)+Un+a.slice(h)+lt+x):a+lt+(h===-2?l:x)}return[Gn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},zt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,u]=jo(e,r);if(this.el=t.createElement(c,n),ft.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=ft.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Un)){let _=u[i++],x=s.getAttribute(h).split(lt),k=/([.?@])?(.*)/.exec(_);a.push({type:1,index:o,name:k[2],strings:x,ctor:k[1]==="."?Dr:k[1]==="?"?Or:k[1]==="@"?Mr:St}),s.removeAttribute(h)}else h.startsWith(lt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Wn.test(s.tagName)){let h=s.textContent.split(lt),_=h.length-1;if(_>0){s.textContent=sr?sr.emptyScript:"";for(let x=0;x<_;x++)s.append(h[x],Ft()),ft.nextNode(),a.push({type:2,index:++o});s.append(h[_],Ft())}}}else if(s.nodeType===8)if(s.data===Hn)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(lt,h+1))!==-1;)a.push({type:7,index:o}),h+=lt.length-1}o++}}static createElement(e,r){let n=ht.createElement("template");return n.innerHTML=e,n}};function $t(t,e,r=t,n){if(e===gt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Bt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=$t(t,s._$AS(t,e.values),s,n)),e}var Ir=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??ht).importNode(r,!0);ft.currentNode=s;let o=ft.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new qt(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Nr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=ft.nextNode(),i++)}return ft.currentNode=ht,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},qt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=$e,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=$t(this,e,r),Bt(e)?e===$e||e==null||e===""?(this._$AH!==$e&&this._$AR(),this._$AH=$e):e!==this._$AH&&e!==gt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Go(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==$e&&Bt(this._$AH)?this._$AA.nextSibling.data=e:this.T(ht.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=zt.createElement(Gn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ir(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=qn.get(e.strings);return r===void 0&&qn.set(e.strings,r=new zt(e)),r}k(e){Pr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Ft()),this.O(Ft()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},St=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=$e,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=$e}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=$t(this,e,r,0),i=!Bt(e)||e!==this._$AH&&e!==gt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=$t(this,l[n+a],r,a),c===gt&&(c=this._$AH[a]),i||(i=!Bt(c)||c!==this._$AH[a]),c===$e?e=$e:e!==$e&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===$e?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Dr=class extends St{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$e?void 0:e}},Or=class extends St{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==$e)}},Mr=class extends St{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=$t(this,e,r,0)??$e)===gt)return;let n=this._$AH,s=e===$e&&n!==$e||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==$e&&(n===$e||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Nr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){$t(this,e)}};var Yo=Pt.litHtmlPolyfillSupport;Yo?.(zt,qt),(Pt.litHtmlVersions??(Pt.litHtmlVersions=[])).push("3.3.1");var de=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new qt(e.insertBefore(Ft(),o),o,void 0,r??{})}return s._$AI(t),s};var or="today",jn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Br(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Yn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Vn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Zn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var ts=Ho(es(),1);function we(t){return(0,ts.default)(`beads-ui:${t}`)}function Xe(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Ut(t,e){let r=Xe(t.created_at),n=Xe(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ss(t,e){let r=Xe(t.created_at),n=Xe(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function os(t,e){let r=Xe(t.updated_at),n=Xe(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function is(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=Xe(t.created_at),o=Xe(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function as(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var ii=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function rs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ns(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=ii.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ls(t,e){let r=rs(t),n=rs(e);if(r!==n)return r<n?-1:1;let s=ns(t),o=ns(e);if(s!==o)return s<o?-1:1;let i=Xe(t&&t.created_at),l=Xe(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var zr=2**20;function Ct(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-Xe(t&&t.created_at)}function lr(t){return(e,r)=>{let n=Ct(e,t),s=Ct(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function qr(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ct(l,r)-zr};if(!l)return{rank:Ct(i,r)+zr};let a=Ct(i,r),c=Ct(l,r),u=(a+c)/2;return a<u&&u<c?{rank:u}:{renormalize:n.map((h,_)=>({bead_id:h.id,rank:_*zr}))}}function Ur(t,e={}){let r=we(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Ut;function c(){for(let _ of Array.from(i))try{_()}catch{}}function u(){s=Array.from(n.values()).sort(a)}function h(_){if(l||!_||_.id!==t)return;let x=Number(_.revision)||0;if(r("apply %s rev=%d",_.type,x),!(x<=o&&_.type!=="snapshot")){if(_.type==="snapshot"){if(x<=o)return;n.clear();let k=Array.isArray(_.issues)?_.issues:[];for(let S of k)S&&typeof S.id=="string"&&S.id.length>0&&n.set(S.id,S);u(),o=x,c();return}if(_.type==="upsert"){let k=_.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let S=n.get(k.id);if(!S)n.set(k.id,k);else{let O=Number.isFinite(S.updated_at)?S.updated_at:0,P=Number.isFinite(k.updated_at)?k.updated_at:0;if(O<=P){for(let q of Object.keys(S))q in k||delete S[q];for(let[q,I]of Object.entries(k))S[q]=I}}u()}o=x,c()}else if(_.type==="delete"){let k=String(_.issue_id||"");k&&(n.delete(k),u()),o=x,c()}}}return{id:t,subscribe(_){return i.add(_),()=>{i.delete(_)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(_){return n.get(_)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function cr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function cs(t){let e=we("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let u=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let x of Array.from(c)){let k=r.get(x);if(!k)continue;let S=k.itemsById;for(let O of u)typeof O=="string"&&O.length>0&&S.set(O,!0);for(let O of h)typeof O=="string"&&O.length>0&&S.set(O,!0);for(let O of _)typeof O=="string"&&O.length>0&&S.delete(O)}}async function o(l,a){let c=cr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let _=n.get(h.key);_&&(_.delete(l),_.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let u=n.get(c);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let _=r.get(l)||null;if(_){let x=n.get(_.key);x&&(x.delete(l),x.size===0&&n.delete(_.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let _=n.get(h.key);_&&(_.delete(l),_.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:cr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let u of a.itemsById.keys())c[u]=!0;return c}}}}function ds(){let t=we("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,u){let h=c?cr(c):"",_=r.get(a)||"",x=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,_),x&&_&&h&&_!==h){let k=e.get(a);if(k)try{k.dispose()}catch{}let S=s.get(a);if(S){try{S()}catch{}s.delete(a)}let O=Ur(a,u);e.set(a,O);let P=O.subscribe(()=>o());s.set(a,P)}else if(!x){let k=Ur(a,u);e.set(a,k);let S=k.subscribe(()=>o());s.set(a,S)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let u=s.get(a);if(u){try{u()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function us(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ps(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Hr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function ai(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function li(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function fs(t){let e=we("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):ai(n),i=li(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Hr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Hr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ci=Object.freeze({workspace_config:{default_workspace:null}});function hs(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:ci.workspace_config.default_workspace}}}function gs(t={}){let e=we("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:hs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?hs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,u)=>c!==r.workspace.hidden[u]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,u)=>c===r.worker.show_closed_children[u])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function ms(t){let e=we("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,_)=>{let x=s++,k=Date.now();n.set(x,{type:h,start_ts:k}),e("request start id=%d type=%s count=%d",x,h,r+1),i();let S=!1,O=()=>{S||(S=!0,n.delete(x),l())},P=setTimeout(()=>{S||(e("request TIMEOUT id=%d type=%s elapsed=%dms",x,h,Date.now()-k),O())},3e4);try{let q=await c(h,_),I=Date.now()-k;return e("request done id=%d type=%s elapsed=%dms",x,h,I),q}catch(q){let I=Date.now()-k;throw e("request error id=%d type=%s elapsed=%dms err=%o",x,h,I,q),q}finally{clearTimeout(P),O()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([u,h])=>({id:u,type:h.type,elapsed_ms:c-h.start_ts}))}}}function ee(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function dr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(as),a;switch(l){case"created_desc":return a.sort(Ut),a;case"created_asc":return a.sort(ss),a;case"updated_desc":return a.sort(os),a;case"priority":return a.sort(is),a;case"manual":default:{let c=r();return c?a.sort(lr(c)):a.sort(Ut),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function ur(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},u=n(qr(l,a,c.order),i);s(c,u);let h=await e("ui-order-set",{expected_revision:c.revision,entries:u});if(h&&h.conflict){let _={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(_);let x=n(qr(l,a,_.order),i);s(_,x);let k=await e("ui-order-set",{expected_revision:_.revision,entries:x});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function pr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Wr(t,e){return!e||typeof t!="string"||t.length===0||pr(e.visible_labels).includes(t)?!0:pr(e.hidden_labels).includes(t)?!1:!pr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function bs(t,e){return pr(t).filter(r=>Wr(r,e))}function bt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function Gr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Rt(t){let e=Gr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function jr(t,e){let r=Gr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var di={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},ui={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},pi={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},fi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function hi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function gi(t,e,r){let n=di[t]||t,s=e&&e.state||"empty",o=fi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return p`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${ui[t]||t}
      </div>
    </div>
  `}function fr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=pi[r],s=t.stages,o=hi(n,s,String(e||"open"));return p`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>gi(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function mi(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var _s=2;function bi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(p`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,_s).join(", "),s=r.length-_s,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(p`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function _i(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&bt(r,"route")){let o=n.route_source==="derived";s.push(p`<span
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
      </button>`),bt(r,"blocked")&&s.push(...bi(t.blocked_info)),s.length===0?"":p`<div class="board-card__chips">${s}</div>`}function yi(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ki(t){let e=jr(t.created_at),r=jr(t.updated_at);return!e&&!r?"":p`<span class="board-card__times">
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
      ${_i(t,e)}
      ${t.workflow&&bt(e.policy||null,"stepper")?fr(t.workflow,t.status):""}
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
  `}var vi=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],xi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],$i=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Si(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return p`
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
        ${xi.map(n=>p`<option
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
        ${$i.map(n=>p`<option
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
  `}var Ai=200,Ti={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ei=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),ws="beads-ui.board.sort",vs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ci(){try{let t=window.localStorage.getItem(ws);if(t&&vs.has(t))return t}catch{}return"created_desc"}function xs(t,e){let r=we("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,u=e.closedRange||or,h=s?dr(s,i):null,_=ur({transport:o,uiOrderStore:i}),x=[],k=[],S=[],O=[],P=[],q=[],I=!1,C=0,y=Ci(),b=new Map,w=new Map,v=new Map,F=new Set,j={search:"",priority:"",type:"",labels:[]},Q=!1,J=null;function Re(A){return String(A.status||"open")==="open"}function Ue(A){let L=String(A.status||"open");return L==="open"||L==="blocked"}function Te(A){let L=j.search.trim().toLowerCase(),K=j.priority,N=j.type,g=j.labels;return A.filter(T=>{if(L){let E=String(T.id||"").toLowerCase(),B=String(T.title||"").toLowerCase();if(!E.includes(L)&&!B.includes(L))return!1}if(K!==""&&String(T.priority)!==K||N!==""&&String(T.issue_type||"")!==N)return!1;if(g.length>0){let E=Array.isArray(T.labels)?T.labels:[];if(!g.some(B=>E.includes(B)))return!1}return!0})}function Le(){let A=new Set;for(let L of[x,k,S,O,P,q])for(let K of L){let N=Array.isArray(K.labels)?K.labels:[];for(let g of N)typeof g=="string"&&g.length>0&&A.add(g)}return Array.from(A).sort()}function Ne(){return j.search.trim()!==""||j.priority!==""||j.type!==""||j.labels.length>0}function ue(){try{if(h){let A=h.selectBoardColumn("tab:board:in-progress","in_progress",y),L=h.selectBoardColumn("tab:board:blocked","blocked",y).filter(Ue),K=new Set(A.map(H=>H.id)),N=h.selectBoardColumn("tab:board:ready","ready",y).filter(H=>Re(H)&&!K.has(H.id)),g=h.selectBoardColumn("tab:board:resolved","resolved",y),T=h.selectBoardColumn("tab:board:deferred","deferred",y),E=I?T:[],B=h.selectBoardColumn("tab:board:closed","closed").slice(0,Ai),U=[...L,...N,...A,...g,...E,...B];Pe(U);let ne=new Set;for(let H of U)H&&H.id&&!Yr(H)&&ne.add(H.id);let ce=!Ne();x=ce?Lt(L,ne):L,k=ce?Lt(N,ne):N,S=ce?Lt(A,ne):A,O=ce?Lt(g,ne):g,P=ce?Lt(E,ne):E,C=T.length,q=ce?Lt(B,ne):B,b=new Map;for(let H of x)b.set(H.id,"open");for(let H of k)b.set(H.id,"open");for(let H of S)b.set(H.id,"in_progress");for(let H of O)b.set(H.id,"resolved");for(let H of P)b.set(H.id,"deferred");for(let H of q)b.set(H.id,"closed");w=new Map;for(let H of x)w.set(H.id,"blocked-col");for(let H of k)w.set(H.id,"ready-col");for(let H of S)w.set(H.id,"in-progress-col");for(let H of O)w.set(H.id,"resolved-col");for(let H of P)w.set(H.id,"deferred-col");for(let H of q)w.set(H.id,"closed-col")}Se()}catch{x=[],k=[],S=[],O=[],P=[],q=[],v=new Map,Se()}}function Pe(A){let L=new Map;for(let N of A)N&&N.id&&!L.has(N.id)&&L.set(N.id,N);let K=new Map;for(let N of L.values()){let g=Yr(N);if(!g)continue;let T=K.get(g);T||(T=[],K.set(g,T)),T.push({id:N.id,title:N.title,status:N.status,metadata:N.metadata,created_at:N.created_at})}v=K}function je(A){let L=v.get(A)||[],K=0,N=null;for(let g of L)(g.status==="resolved"||g.status==="closed")&&(K+=1),!N&&g.status==="in_progress"&&(N=g);return{total:L.length,count:K,current:N,children:L}}function pe(A){return!F.has(A)}function Ye(A,L){A.preventDefault(),A.stopPropagation(),F.has(L)?F.delete(L):F.add(L),Se()}function he(A,L){A.preventDefault(),A.stopPropagation(),n(L)}function Ve(A,L){A.preventDefault(),A.stopPropagation(),n(L)}function oe(A,L){J||n(L)}function $(A,L){A.preventDefault(),A.stopPropagation(),Ri(L).then(K=>{K&&ee("\uBCF5\uC0AC\uB428","success",1200)})}function M(A,L){J=L,A.dataTransfer&&(A.dataTransfer.setData("text/plain",L),A.dataTransfer.effectAllowed="move"),A.target.classList.add("board-card--dragging")}function V(A){A.target.classList.remove("board-card--dragging"),Ze(),setTimeout(()=>{J=null},0)}function Y(A){let L=String(A.target.value||"");!L||L===u||(u=L,a&&a(L),Se())}let X={onCardClick:oe,onCopyId:$,onDragStart:M,onDragEnd:V,onClosedRangeChange:Y,rollupFor:je,isExpanded:pe,onRollupToggle:Ye,onChildClick:he,onFromChipClick:Ve,get policy(){return l?l.get():null}};function se(A){let L=A.target,K=t.querySelector(".board-filter__labels");L&&K&&K.contains(L)||me()}function ae(A){A.key==="Escape"&&me()}function ge(){Q||(Q=!0,document.addEventListener("mousedown",se),document.addEventListener("keydown",ae),Se())}function me(){Q&&(Q=!1,document.removeEventListener("mousedown",se),document.removeEventListener("keydown",ae),Se())}let ve={onSearchInput(A){j.search=String(A.target.value||""),ue()},onPriorityChange(A){j.priority=String(A.target.value||""),ue()},onTypeChange(A){j.type=String(A.target.value||""),ue()},onSortChange(A){let L=String(A.target.value||"");if(!(!vs.has(L)||L===y)){y=L;try{window.localStorage.setItem(ws,L)}catch{}ue()}},onDeferredToggle(){I=!I,ue()},onLabelMenuToggle(){Q?me():ge()},onLabelToggle(A){let L=j.labels.indexOf(A);L===-1?j.labels.push(A):j.labels.splice(L,1),ue()},onLabelClear(){j.labels.length!==0&&(j.labels=[],ue())},onNewIssue(){c&&c()}};function xe(){let A=I?"board-root board-root--deferred":"board-root";return p`
      <div class="board-view">
        ${ks(j,ve,{sort_mode:y,show_deferred:I,deferred_count:C,label_options:Le(),label_menu_open:Q})}
        <div class=${A}>
          ${_t({title:"Blocked",id:"blocked-col",items:Te(x)},X)}
          ${_t({title:"Ready",id:"ready-col",items:Te(k)},X)}
          ${_t({title:"In progress",id:"in-progress-col",items:Te(S)},X)}
          ${_t({title:"Resolved",id:"resolved-col",items:Te(O)},X)}
          ${I?_t({title:"Deferred",id:"deferred-col",items:Te(P)},X):""}
          ${_t({title:"Closed",id:"closed-col",items:Te(q),is_closed:!0,closed_range:u},X)}
        </div>
      </div>
    `}function Se(){de(xe(),t),Ee()}function Ee(){try{let A=Array.from(t.querySelectorAll(".board-column"));for(let L of A)Array.from(L.querySelectorAll(".board-card")).forEach((N,g)=>{N.tabIndex=g===0?0:-1})}catch{}}async function De(A,L){if(!o){ee("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:A,status:L}),ee("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(K){r("update-status failed: %o",K),ee("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Oe(A){switch(A){case"blocked-col":return x;case"ready-col":return k;case"in-progress-col":return S;case"resolved-col":return O;case"deferred-col":return P;default:return[]}}function Ge(A,L,K){if(!o||!i)return;let N=Oe(A),g=N.find(ne=>ne.id===L);if(!g)return;let T=N.filter(ne=>ne.id!==L),E=K.closest?K.closest(".board-card"):null,B=T.length;if(E){let ne=E.getAttribute("data-issue-id");if(ne===L)return;let ce=T.findIndex(H=>H.id===ne);ce>=0&&(B=ce)}let U=T.slice();U.splice(B,0,g),_.applyReorder(L,U,B)}function Ze(){for(let A of Array.from(t.querySelectorAll(".board-column--drag-over")))A.classList.remove("board-column--drag-over")}let D=null;t.addEventListener("dragover",A=>{A.preventDefault(),A.dataTransfer&&(A.dataTransfer.dropEffect="move");let K=A.target.closest(".board-column");K&&K!==D&&(D&&D.classList.remove("board-column--drag-over"),K.classList.add("board-column--drag-over"),D=K)}),t.addEventListener("dragleave",A=>{let L=A.relatedTarget;(!L||!t.contains(L))&&D&&(D.classList.remove("board-column--drag-over"),D=null)}),t.addEventListener("drop",A=>{A.preventDefault(),D&&(D.classList.remove("board-column--drag-over"),D=null);let L=A.target,K=L.closest(".board-column");if(!K)return;let N=A.dataTransfer?.getData("text/plain")||"";if(!N)return;let g=K.id,T=w.get(N);if(T&&T===g){if(Ei.has(g)){if(y!=="manual"){ee("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ge(g,N,L)}return}let E=Ti[g];if(!E){ee("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}b.get(N)!==E&&De(N,E)}),t.addEventListener("keydown",A=>{let L=A.target;if(!(L instanceof HTMLElement))return;let K=String(L.tagName||"").toLowerCase();if(K==="input"||K==="textarea"||K==="select"||K==="button"||K==="a"||L.isContentEditable===!0)return;let N=L.closest(".board-card");if(!N)return;let g=String(A.key||"");if(g==="Enter"||g===" "){A.preventDefault();let U=N.getAttribute("data-issue-id");U&&n(U);return}if(g!=="ArrowUp"&&g!=="ArrowDown"&&g!=="ArrowLeft"&&g!=="ArrowRight")return;A.preventDefault();let T=N.closest(".board-column");if(!T)return;let E=Array.from(T.querySelectorAll(".board-card")),B=E.indexOf(N);if(g==="ArrowDown"&&B<E.length-1){ye(N,E[B+1]);return}if(g==="ArrowUp"&&B>0){ye(N,E[B-1]);return}if(g==="ArrowLeft"||g==="ArrowRight"){let U=Array.from(t.querySelectorAll(".board-column")),ne=U.indexOf(T),ce=g==="ArrowRight"?1:-1,H=ne+ce;for(;H>=0&&H<U.length;){let at=U[H].querySelector(".board-card");if(at){ye(N,at);return}H+=ce}}});function ye(A,L){try{A.tabIndex=-1,L.tabIndex=0,L.focus()}catch{}}let be=null;h&&h.subscribe&&(be=h.subscribe(()=>{try{ue()}catch{}}));let Ce=null;return l&&l.subscribe&&(Ce=l.subscribe(()=>{try{ue()}catch{}})),{async load(){r("load"),ue()},clear(){me(),be&&(be(),be=null),Ce&&(Ce(),Ce=null),t.replaceChildren(),x=[],k=[],S=[],O=[],P=[],q=[],b=new Map,w=new Map}}}function Yr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Lt(t,e){return t.filter(r=>{let n=Yr(r);return!(n&&e.has(n))})}async function Ri(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function It(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Li={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ii=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Di=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ct(t){return!!t&&typeof t=="object"}function Vr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function $s(t,e){let r=Vr(t),n=Vr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Oi(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ct(s)&&typeof s.text=="string"?s.text:"").join(""):ct(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Mi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Li[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Vr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=$s(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=$s(ct(l)?l.old_string:"",ct(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ss(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ii.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Di.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ni(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ct(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ss(o.text));else if(o.type==="tool_use"){let i=Mi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ct(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Oi(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Pi(t){if(t.type==="item.completed"&&ct(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Ss(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Fi(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function As(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ct(o))continue;let i=Fi(o)?Pi(o):Ni(o,r);for(let l of i)e.push(l)}return e}function hr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function u(){if(!o||!n)return[];let w=n.get(o);return As(w?w.lines:[])}function h(w,v){if(v.kind==="gate")return p`<div class="sv__gate">${v.text}</div>`;if(v.kind==="phase")return p`<div class="sv__phase">${v.text}</div>`;if(v.kind==="result")return p`<div
        class="sv__result${v.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${v.success?"\u2713":"\u2717"}
        ${v.text||(v.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(v.kind==="error")return p`<div class="sv__error">⛔ ${v.text}</div>`;if(v.kind==="blocker")return p`<div class="sv__error">⛔ ${v.text}</div>`;if(v.kind==="tool"){let F=a.has(w),j=v.tool==="Bash"?v.command:v.path||v.command||"";return p`<div
        class="sv__tool${F?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>O(w)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${v.icon}</span>
          <span class="sv__tool-name">${v.tool}</span>
          ${j?p`<span class="sv__tool-detail">${j}</span>`:""}
          ${typeof v.added=="number"?p`<span class="sv__diff-add">+${v.added}</span>`:""}
          ${typeof v.removed=="number"?p`<span class="sv__diff-del">−${v.removed}</span>`:""}
          ${v.result?p`<span class="sv__tool-ok">→ ${v.result}</span>`:""}
        </span>
        ${F?p`<pre class="sv__tool-expand">${_(v)}</pre>`:""}
      </div>`}return p`<div class="sv__as">${v.text}</div>`}function _(w){let v=[];if(w.input!==void 0)try{v.push(`input: ${JSON.stringify(w.input,null,2)}`)}catch{}return typeof w.output=="string"&&w.output.length>0&&v.push(`output:
${w.output}`),v.join(`

`)}function x(){if(!o)return p``;let w=u(),v=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),F=i.session_id||"",j=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return p`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${F?p`<button
              type="button"
              class="sv__session"
              title=${F}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${F}`}
              @click=${()=>q(F)}
            >
              ⧉ ${F.slice(0,8)}
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
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${j}</span>
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
        ${w.length===0?p`<div class="sv__empty">세션 로그 없음</div>`:w.map((Q,J)=>h(J,Q))}
      </div>
    </div>`}function k(){de(x(),t),l&&S()}function S(){let w=t.querySelector(".sv__body");w&&(w.scrollTop=w.scrollHeight)}function O(w){a.has(w)?a.delete(w):a.add(w),k()}function P(){l=!l,k()}function q(w){It(w).then(v=>{v?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function I(w){!o||!w||(i={...i,...w},k())}function C(w){let v=w.target;if(!v||!v.classList||!v.classList.contains("sv__body"))return;!(v.scrollHeight-v.scrollTop-v.clientHeight<=4)&&l&&(l=!1,k())}t.addEventListener("scroll",C,!0);function y(w){let v=w&&w.attempt_id;v&&(o=v,i=w.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(k)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),k())}function b(){let w=o;o=null,a.clear(),r&&w&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${w}`})).catch(()=>{}),de(p``,t),s&&s()}return{open:y,updateMeta:I,close:b,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",C,!0),o=null,de(p``,t)}}}function Bi(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Ts(t,e){let r=Bi(t);return p`
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
  `}var{entries:Fs,setPrototypeOf:Rs,isFrozen:qi,getPrototypeOf:Ui,getOwnPropertyDescriptor:Hi}=Object,{freeze:Be,seal:Ke,create:ln}=Object,{apply:cn,construct:dn}=typeof Reflect<"u"&&Reflect;Be||(Be=function(e){return e});Ke||(Ke=function(e){return e});cn||(cn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});dn||(dn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var gr=ze(Array.prototype.forEach),Wi=ze(Array.prototype.lastIndexOf),Ls=ze(Array.prototype.pop),Wt=ze(Array.prototype.push),Gi=ze(Array.prototype.splice),br=ze(String.prototype.toLowerCase),tn=ze(String.prototype.toString),rn=ze(String.prototype.match),Gt=ze(String.prototype.replace),ji=ze(String.prototype.indexOf),Yi=ze(String.prototype.trim),Qe=ze(Object.prototype.hasOwnProperty),Fe=ze(RegExp.prototype.test),jt=Vi(TypeError);function ze(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return cn(t,e,n)}}function Vi(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return dn(t,r)}}function re(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:br;Rs&&Rs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(qi(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Zi(t){for(let e=0;e<t.length;e++)Qe(t,e)||(t[e]=null);return t}function ot(t){let e=ln(null);for(let[r,n]of Fs(t))Qe(t,r)&&(Array.isArray(n)?e[r]=Zi(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=ot(n):e[r]=n);return e}function Yt(t,e){for(;t!==null;){let n=Hi(t,e);if(n){if(n.get)return ze(n.get);if(typeof n.value=="function")return ze(n.value)}t=Ui(t)}function r(){return null}return r}var Is=Be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),nn=Be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),sn=Be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ki=Be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),on=Be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Xi=Be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ds=Be(["#text"]),Os=Be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),an=Be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ms=Be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),mr=Be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Qi=Ke(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ji=Ke(/<%[\w\W]*|[\w\W]*%>/gm),ea=Ke(/\$\{[\w\W]*/gm),ta=Ke(/^data-[\-\w.\u00B7-\uFFFF]+$/),ra=Ke(/^aria-[\-\w]+$/),Bs=Ke(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),na=Ke(/^(?:\w+script|data):/i),sa=Ke(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),zs=Ke(/^html$/i),oa=Ke(/^[a-z][.\w]*(-[.\w]+)+$/i),Ns=Object.freeze({__proto__:null,ARIA_ATTR:ra,ATTR_WHITESPACE:sa,CUSTOM_ELEMENT:oa,DATA_ATTR:ta,DOCTYPE_NAME:zs,ERB_EXPR:Ji,IS_ALLOWED_URI:Bs,IS_SCRIPT_OR_DATA:na,MUSTACHE_EXPR:Qi,TMPLIT_EXPR:ea}),Vt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ia=function(){return typeof window>"u"?null:window},aa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ps=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qs(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ia(),e=W=>qs(W);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Vt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:_,trustedTypes:x}=t,k=a.prototype,S=Yt(k,"cloneNode"),O=Yt(k,"remove"),P=Yt(k,"nextSibling"),q=Yt(k,"childNodes"),I=Yt(k,"parentNode");if(typeof i=="function"){let W=r.createElement("template");W.content&&W.content.ownerDocument&&(r=W.content.ownerDocument)}let C,y="",{implementation:b,createNodeIterator:w,createDocumentFragment:v,getElementsByTagName:F}=r,{importNode:j}=n,Q=Ps();e.isSupported=typeof Fs=="function"&&typeof I=="function"&&b&&b.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:J,ERB_EXPR:Re,TMPLIT_EXPR:Ue,DATA_ATTR:Te,ARIA_ATTR:Le,IS_SCRIPT_OR_DATA:Ne,ATTR_WHITESPACE:ue,CUSTOM_ELEMENT:Pe}=Ns,{IS_ALLOWED_URI:je}=Ns,pe=null,Ye=re({},[...Is,...nn,...sn,...on,...Ds]),he=null,Ve=re({},[...Os,...an,...Ms,...mr]),oe=Object.seal(ln(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),$=null,M=null,V=Object.seal(ln(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Y=!0,X=!0,se=!1,ae=!0,ge=!1,me=!0,ve=!1,xe=!1,Se=!1,Ee=!1,De=!1,Oe=!1,Ge=!0,Ze=!1,D="user-content-",ye=!0,be=!1,Ce={},A=null,L=re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),K=null,N=re({},["audio","video","img","source","image","track"]),g=null,T=re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),E="http://www.w3.org/1998/Math/MathML",B="http://www.w3.org/2000/svg",U="http://www.w3.org/1999/xhtml",ne=U,ce=!1,H=null,at=re({},[E,B,U],tn),wt=re({},["mi","mo","mn","ms","mtext"]),vt=re({},["annotation-xml"]),Ar=re({},["title","style","font","a","script"]),rt=null,Mt=["application/xhtml+xml","text/html"],rr="text/html",f=null,m=null,Z=r.createElement("form"),G=function(d){return d instanceof RegExp||d instanceof Function},te=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(m&&m===d)){if((!d||typeof d!="object")&&(d={}),d=ot(d),rt=Mt.indexOf(d.PARSER_MEDIA_TYPE)===-1?rr:d.PARSER_MEDIA_TYPE,f=rt==="application/xhtml+xml"?tn:br,pe=Qe(d,"ALLOWED_TAGS")?re({},d.ALLOWED_TAGS,f):Ye,he=Qe(d,"ALLOWED_ATTR")?re({},d.ALLOWED_ATTR,f):Ve,H=Qe(d,"ALLOWED_NAMESPACES")?re({},d.ALLOWED_NAMESPACES,tn):at,g=Qe(d,"ADD_URI_SAFE_ATTR")?re(ot(T),d.ADD_URI_SAFE_ATTR,f):T,K=Qe(d,"ADD_DATA_URI_TAGS")?re(ot(N),d.ADD_DATA_URI_TAGS,f):N,A=Qe(d,"FORBID_CONTENTS")?re({},d.FORBID_CONTENTS,f):L,$=Qe(d,"FORBID_TAGS")?re({},d.FORBID_TAGS,f):ot({}),M=Qe(d,"FORBID_ATTR")?re({},d.FORBID_ATTR,f):ot({}),Ce=Qe(d,"USE_PROFILES")?d.USE_PROFILES:!1,Y=d.ALLOW_ARIA_ATTR!==!1,X=d.ALLOW_DATA_ATTR!==!1,se=d.ALLOW_UNKNOWN_PROTOCOLS||!1,ae=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ge=d.SAFE_FOR_TEMPLATES||!1,me=d.SAFE_FOR_XML!==!1,ve=d.WHOLE_DOCUMENT||!1,Ee=d.RETURN_DOM||!1,De=d.RETURN_DOM_FRAGMENT||!1,Oe=d.RETURN_TRUSTED_TYPE||!1,Se=d.FORCE_BODY||!1,Ge=d.SANITIZE_DOM!==!1,Ze=d.SANITIZE_NAMED_PROPS||!1,ye=d.KEEP_CONTENT!==!1,be=d.IN_PLACE||!1,je=d.ALLOWED_URI_REGEXP||Bs,ne=d.NAMESPACE||U,wt=d.MATHML_TEXT_INTEGRATION_POINTS||wt,vt=d.HTML_INTEGRATION_POINTS||vt,oe=d.CUSTOM_ELEMENT_HANDLING||{},d.CUSTOM_ELEMENT_HANDLING&&G(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(oe.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&G(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(oe.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(oe.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ge&&(X=!1),De&&(Ee=!0),Ce&&(pe=re({},Ds),he=[],Ce.html===!0&&(re(pe,Is),re(he,Os)),Ce.svg===!0&&(re(pe,nn),re(he,an),re(he,mr)),Ce.svgFilters===!0&&(re(pe,sn),re(he,an),re(he,mr)),Ce.mathMl===!0&&(re(pe,on),re(he,Ms),re(he,mr))),d.ADD_TAGS&&(typeof d.ADD_TAGS=="function"?V.tagCheck=d.ADD_TAGS:(pe===Ye&&(pe=ot(pe)),re(pe,d.ADD_TAGS,f))),d.ADD_ATTR&&(typeof d.ADD_ATTR=="function"?V.attributeCheck=d.ADD_ATTR:(he===Ve&&(he=ot(he)),re(he,d.ADD_ATTR,f))),d.ADD_URI_SAFE_ATTR&&re(g,d.ADD_URI_SAFE_ATTR,f),d.FORBID_CONTENTS&&(A===L&&(A=ot(A)),re(A,d.FORBID_CONTENTS,f)),ye&&(pe["#text"]=!0),ve&&re(pe,["html","head","body"]),pe.table&&(re(pe,["tbody"]),delete $.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');C=d.TRUSTED_TYPES_POLICY,y=C.createHTML("")}else C===void 0&&(C=aa(x,s)),C!==null&&typeof y=="string"&&(y=C.createHTML(""));Be&&Be(d),m=d}},ke=re({},[...nn,...sn,...Ki]),nr=re({},[...on,...Xi]),Oo=function(d){let R=I(d);(!R||!R.tagName)&&(R={namespaceURI:ne,tagName:"template"});let z=br(d.tagName),_e=br(R.tagName);return H[d.namespaceURI]?d.namespaceURI===B?R.namespaceURI===U?z==="svg":R.namespaceURI===E?z==="svg"&&(_e==="annotation-xml"||wt[_e]):!!ke[z]:d.namespaceURI===E?R.namespaceURI===U?z==="math":R.namespaceURI===B?z==="math"&&vt[_e]:!!nr[z]:d.namespaceURI===U?R.namespaceURI===B&&!vt[_e]||R.namespaceURI===E&&!wt[_e]?!1:!nr[z]&&(Ar[z]||!ke[z]):!!(rt==="application/xhtml+xml"&&H[d.namespaceURI]):!1},tt=function(d){Wt(e.removed,{element:d});try{I(d).removeChild(d)}catch{O(d)}},ut=function(d,R){try{Wt(e.removed,{attribute:R.getAttributeNode(d),from:R})}catch{Wt(e.removed,{attribute:null,from:R})}if(R.removeAttribute(d),d==="is")if(Ee||De)try{tt(R)}catch{}else try{R.setAttribute(d,"")}catch{}},Tn=function(d){let R=null,z=null;if(Se)d="<remove></remove>"+d;else{let Ae=rn(d,/^[\r\n\t ]+/);z=Ae&&Ae[0]}rt==="application/xhtml+xml"&&ne===U&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");let _e=C?C.createHTML(d):d;if(ne===U)try{R=new _().parseFromString(_e,rt)}catch{}if(!R||!R.documentElement){R=b.createDocument(ne,"template",null);try{R.documentElement.innerHTML=ce?y:_e}catch{}}let Me=R.body||R.documentElement;return d&&z&&Me.insertBefore(r.createTextNode(z),Me.childNodes[0]||null),ne===U?F.call(R,ve?"html":"body")[0]:ve?R.documentElement:Me},En=function(d){return w.call(d.ownerDocument||d,d,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Tr=function(d){return d instanceof h&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof u)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function")},Cn=function(d){return typeof l=="function"&&d instanceof l};function nt(W,d,R){gr(W,z=>{z.call(e,d,R,m)})}let Rn=function(d){let R=null;if(nt(Q.beforeSanitizeElements,d,null),Tr(d))return tt(d),!0;let z=f(d.nodeName);if(nt(Q.uponSanitizeElement,d,{tagName:z,allowedTags:pe}),me&&d.hasChildNodes()&&!Cn(d.firstElementChild)&&Fe(/<[/\w!]/g,d.innerHTML)&&Fe(/<[/\w!]/g,d.textContent)||d.nodeType===Vt.progressingInstruction||me&&d.nodeType===Vt.comment&&Fe(/<[/\w]/g,d.data))return tt(d),!0;if(!(V.tagCheck instanceof Function&&V.tagCheck(z))&&(!pe[z]||$[z])){if(!$[z]&&In(z)&&(oe.tagNameCheck instanceof RegExp&&Fe(oe.tagNameCheck,z)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(z)))return!1;if(ye&&!A[z]){let _e=I(d)||d.parentNode,Me=q(d)||d.childNodes;if(Me&&_e){let Ae=Me.length;for(let He=Ae-1;He>=0;--He){let st=S(Me[He],!0);st.__removalCount=(d.__removalCount||0)+1,_e.insertBefore(st,P(d))}}}return tt(d),!0}return d instanceof a&&!Oo(d)||(z==="noscript"||z==="noembed"||z==="noframes")&&Fe(/<\/no(script|embed|frames)/i,d.innerHTML)?(tt(d),!0):(ge&&d.nodeType===Vt.text&&(R=d.textContent,gr([J,Re,Ue],_e=>{R=Gt(R,_e," ")}),d.textContent!==R&&(Wt(e.removed,{element:d.cloneNode()}),d.textContent=R)),nt(Q.afterSanitizeElements,d,null),!1)},Ln=function(d,R,z){if(Ge&&(R==="id"||R==="name")&&(z in r||z in Z))return!1;if(!(X&&!M[R]&&Fe(Te,R))){if(!(Y&&Fe(Le,R))){if(!(V.attributeCheck instanceof Function&&V.attributeCheck(R,d))){if(!he[R]||M[R]){if(!(In(d)&&(oe.tagNameCheck instanceof RegExp&&Fe(oe.tagNameCheck,d)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(d))&&(oe.attributeNameCheck instanceof RegExp&&Fe(oe.attributeNameCheck,R)||oe.attributeNameCheck instanceof Function&&oe.attributeNameCheck(R,d))||R==="is"&&oe.allowCustomizedBuiltInElements&&(oe.tagNameCheck instanceof RegExp&&Fe(oe.tagNameCheck,z)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(z))))return!1}else if(!g[R]){if(!Fe(je,Gt(z,ue,""))){if(!((R==="src"||R==="xlink:href"||R==="href")&&d!=="script"&&ji(z,"data:")===0&&K[d])){if(!(se&&!Fe(Ne,Gt(z,ue,"")))){if(z)return!1}}}}}}}return!0},In=function(d){return d!=="annotation-xml"&&rn(d,Pe)},Dn=function(d){nt(Q.beforeSanitizeAttributes,d,null);let{attributes:R}=d;if(!R||Tr(d))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:he,forceKeepAttr:void 0},_e=R.length;for(;_e--;){let Me=R[_e],{name:Ae,namespaceURI:He,value:st}=Me,xt=f(Ae),Er=st,Ie=Ae==="value"?Er:Yi(Er);if(z.attrName=xt,z.attrValue=Ie,z.keepAttr=!0,z.forceKeepAttr=void 0,nt(Q.uponSanitizeAttribute,d,z),Ie=z.attrValue,Ze&&(xt==="id"||xt==="name")&&(ut(Ae,d),Ie=D+Ie),me&&Fe(/((--!?|])>)|<\/(style|title|textarea)/i,Ie)){ut(Ae,d);continue}if(xt==="attributename"&&rn(Ie,"href")){ut(Ae,d);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){ut(Ae,d);continue}if(!ae&&Fe(/\/>/i,Ie)){ut(Ae,d);continue}ge&&gr([J,Re,Ue],Mn=>{Ie=Gt(Ie,Mn," ")});let On=f(d.nodeName);if(!Ln(On,xt,Ie)){ut(Ae,d);continue}if(C&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!He)switch(x.getAttributeType(On,xt)){case"TrustedHTML":{Ie=C.createHTML(Ie);break}case"TrustedScriptURL":{Ie=C.createScriptURL(Ie);break}}if(Ie!==Er)try{He?d.setAttributeNS(He,Ae,Ie):d.setAttribute(Ae,Ie),Tr(d)?tt(d):Ls(e.removed)}catch{ut(Ae,d)}}nt(Q.afterSanitizeAttributes,d,null)},Mo=function W(d){let R=null,z=En(d);for(nt(Q.beforeSanitizeShadowDOM,d,null);R=z.nextNode();)nt(Q.uponSanitizeShadowNode,R,null),Rn(R),Dn(R),R.content instanceof o&&W(R.content);nt(Q.afterSanitizeShadowDOM,d,null)};return e.sanitize=function(W){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},R=null,z=null,_e=null,Me=null;if(ce=!W,ce&&(W="<!-->"),typeof W!="string"&&!Cn(W))if(typeof W.toString=="function"){if(W=W.toString(),typeof W!="string")throw jt("dirty is not a string, aborting")}else throw jt("toString is not a function");if(!e.isSupported)return W;if(xe||te(d),e.removed=[],typeof W=="string"&&(be=!1),be){if(W.nodeName){let st=f(W.nodeName);if(!pe[st]||$[st])throw jt("root node is forbidden and cannot be sanitized in-place")}}else if(W instanceof l)R=Tn("<!---->"),z=R.ownerDocument.importNode(W,!0),z.nodeType===Vt.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?R=z:R.appendChild(z);else{if(!Ee&&!ge&&!ve&&W.indexOf("<")===-1)return C&&Oe?C.createHTML(W):W;if(R=Tn(W),!R)return Ee?null:Oe?y:""}R&&Se&&tt(R.firstChild);let Ae=En(be?W:R);for(;_e=Ae.nextNode();)Rn(_e),Dn(_e),_e.content instanceof o&&Mo(_e.content);if(be)return W;if(Ee){if(De)for(Me=v.call(R.ownerDocument);R.firstChild;)Me.appendChild(R.firstChild);else Me=R;return(he.shadowroot||he.shadowrootmode)&&(Me=j.call(n,Me,!0)),Me}let He=ve?R.outerHTML:R.innerHTML;return ve&&pe["!doctype"]&&R.ownerDocument&&R.ownerDocument.doctype&&R.ownerDocument.doctype.name&&Fe(zs,R.ownerDocument.doctype.name)&&(He="<!DOCTYPE "+R.ownerDocument.doctype.name+`>
`+He),ge&&gr([J,Re,Ue],st=>{He=Gt(He,st," ")}),C&&Oe?C.createHTML(He):He},e.setConfig=function(){let W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};te(W),xe=!0},e.clearConfig=function(){m=null,xe=!1},e.isValidAttribute=function(W,d,R){m||te({});let z=f(W),_e=f(d);return Ln(z,_e,R)},e.addHook=function(W,d){typeof d=="function"&&Wt(Q[W],d)},e.removeHook=function(W,d){if(d!==void 0){let R=Wi(Q[W],d);return R===-1?void 0:Gi(Q[W],R,1)[0]}return Ls(Q[W])},e.removeHooks=function(W){Q[W]=[]},e.removeAllHooks=function(){Q=Ps()},e}var Us=qs();var Hs={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ws=t=>(...e)=>({_$litDirective$:t,values:e}),_r=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Zt=class extends _r{constructor(e){if(super(e),this.it=$e,e.type!==Hs.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===$e||e==null)return this._t=void 0,this.it=e;if(e===gt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Zt.directiveName="unsafeHTML",Zt.resultType=1;var Gs=Ws(Zt);function hn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kt=hn();function Qs(t){kt=t}var Jt={exec:()=>null};function ie(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(qe.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var la=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),qe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},ca=/^(?:[ \t]*(?:\n|$))+/,da=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ua=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,er=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,pa=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,gn=/(?:[*+-]|\d{1,9}[.)])/,Js=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,eo=ie(Js).replace(/bull/g,gn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),fa=ie(Js).replace(/bull/g,gn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),mn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ha=/^[^\n]+/,bn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ga=ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",bn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ma=ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,gn).getRegex(),$r="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",_n=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ba=ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",_n).replace("tag",$r).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),to=ie(mn).replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$r).getRegex(),_a=ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",to).getRegex(),yn={blockquote:_a,code:da,def:ga,fences:ua,heading:pa,hr:er,html:ba,lheading:eo,list:ma,newline:ca,paragraph:to,table:Jt,text:ha},js=ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$r).getRegex(),ya={...yn,lheading:fa,table:js,paragraph:ie(mn).replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",js).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$r).getRegex()},ka={...yn,html:ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",_n).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Jt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ie(mn).replace("hr",er).replace("heading",` *#{1,6} *[^
]`).replace("lheading",eo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},wa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,va=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ro=/^( {2,}|\\)\n(?!\s*$)/,xa=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Sr=/[\p{P}\p{S}]/u,kn=/[\s\p{P}\p{S}]/u,no=/[^\s\p{P}\p{S}]/u,$a=ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,kn).getRegex(),so=/(?!~)[\p{P}\p{S}]/u,Sa=/(?!~)[\s\p{P}\p{S}]/u,Aa=/(?:[^\s\p{P}\p{S}]|~)/u,Ta=ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",la?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),oo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ea=ie(oo,"u").replace(/punct/g,Sr).getRegex(),Ca=ie(oo,"u").replace(/punct/g,so).getRegex(),io="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ra=ie(io,"gu").replace(/notPunctSpace/g,no).replace(/punctSpace/g,kn).replace(/punct/g,Sr).getRegex(),La=ie(io,"gu").replace(/notPunctSpace/g,Aa).replace(/punctSpace/g,Sa).replace(/punct/g,so).getRegex(),Ia=ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,no).replace(/punctSpace/g,kn).replace(/punct/g,Sr).getRegex(),Da=ie(/\\(punct)/,"gu").replace(/punct/g,Sr).getRegex(),Oa=ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ma=ie(_n).replace("(?:-->|$)","-->").getRegex(),Na=ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ma).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),wr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Pa=ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",wr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ao=ie(/^!?\[(label)\]\[(ref)\]/).replace("label",wr).replace("ref",bn).getRegex(),lo=ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",bn).getRegex(),Fa=ie("reflink|nolink(?!\\()","g").replace("reflink",ao).replace("nolink",lo).getRegex(),Ys=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,wn={_backpedal:Jt,anyPunctuation:Da,autolink:Oa,blockSkip:Ta,br:ro,code:va,del:Jt,emStrongLDelim:Ea,emStrongRDelimAst:Ra,emStrongRDelimUnd:Ia,escape:wa,link:Pa,nolink:lo,punctuation:$a,reflink:ao,reflinkSearch:Fa,tag:Na,text:xa,url:Jt},Ba={...wn,link:ie(/^!?\[(label)\]\((.*?)\)/).replace("label",wr).getRegex(),reflink:ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",wr).getRegex()},un={...wn,emStrongRDelimAst:La,emStrongLDelim:Ca,url:ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ys).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ys).getRegex()},za={...un,br:ie(ro).replace("{2,}","*").getRegex(),text:ie(un.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},yr={normal:yn,gfm:ya,pedantic:ka},Kt={normal:wn,gfm:un,breaks:za,pedantic:Ba},qa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Vs=t=>qa[t];function it(t,e){if(e){if(qe.escapeTest.test(t))return t.replace(qe.escapeReplace,Vs)}else if(qe.escapeTestNoEncode.test(t))return t.replace(qe.escapeReplaceNoEncode,Vs);return t}function Zs(t){try{t=encodeURI(t).replace(qe.percentDecode,"%")}catch{return null}return t}function Ks(t,e){let r=t.replace(qe.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(qe.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(qe.slashPipe,"|");return n}function Xt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Ua(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Xs(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Ha(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var vr=class{constructor(t){fe(this,"options");fe(this,"rules");fe(this,"lexer");this.options=t||kt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Xt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Ha(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Xt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Xt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Xt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${u}`:u;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=h,r.length===0)break;let _=o.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let x=_,k=x.raw+`
`+r.join(`
`),S=this.blockquote(k);o[o.length-1]=S,n=n.substring(0,n.length-x.raw.length)+S.raw,s=s.substring(0,s.length-x.text.length)+S.text;break}else if(_?.type==="list"){let x=_,k=x.raw+`
`+r.join(`
`),S=this.list(k);o[o.length-1]=S,n=n.substring(0,n.length-_.raw.length)+S.raw,s=s.substring(0,s.length-x.raw.length)+S.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",u="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),_=t.split(`
`,1)[0],x=!h.trim(),k=0;if(this.options.pedantic?(k=2,u=h.trimStart()):x?k=e[1].length+1:(k=e[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,u=h.slice(k),k+=e[1].length),x&&this.rules.other.blankLine.test(_)&&(c+=_+`
`,t=t.substring(_.length+1),a=!0),!a){let S=this.rules.other.nextBulletRegex(k),O=this.rules.other.hrRegex(k),P=this.rules.other.fencesBeginRegex(k),q=this.rules.other.headingBeginRegex(k),I=this.rules.other.htmlBeginRegex(k);for(;t;){let C=t.split(`
`,1)[0],y;if(_=C,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),y=_):y=_.replace(this.rules.other.tabCharGlobal,"    "),P.test(_)||q.test(_)||I.test(_)||S.test(_)||O.test(_))break;if(y.search(this.rules.other.nonSpaceChar)>=k||!_.trim())u+=`
`+y.slice(k);else{if(x||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||P.test(h)||q.test(h)||O.test(h))break;u+=`
`+_}!x&&!_.trim()&&(x=!0),c+=C+`
`,t=t.substring(C.length+1),h=y.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=u.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),u=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=u}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Ks(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Ks(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Xt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ua(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Xs(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Xs(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...n[0]][0].length,h=t.slice(0,s+n.index+u+i);if(Math.min(s,i)%2){let x=h.slice(1,-1);return{type:"em",raw:h,text:x,tokens:this.lexer.inlineTokens(x)}}let _=h.slice(2,-2);return{type:"strong",raw:h,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},Je=class pn{constructor(e){fe(this,"tokens");fe(this,"options");fe(this,"state");fe(this,"inlineQueue");fe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||kt,this.options.tokenizer=this.options.tokenizer||new vr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:qe,block:yr.normal,inline:Kt.normal};this.options.pedantic?(r.block=yr.pedantic,r.inline=Kt.pedantic):this.options.gfm&&(r.block=yr.gfm,this.options.breaks?r.inline=Kt.breaks:r.inline=Kt.gfm),this.tokenizer.rules=r}static get rules(){return{block:yr,inline:Kt}}static lex(e,r){return new pn(r).lex(e)}static lexInline(e,r){return new pn(r).inlineTokens(e)}lex(e){e=e.replace(qe.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,h=e.slice(1),_;this.options.extensions.startInline.forEach(x=>{_=x.call({lexer:this},h),typeof _=="number"&&_>=0&&(u=Math.min(u,_))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},xr=class{constructor(t){fe(this,"options");fe(this,"parser");this.options=t||kt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(qe.notSpaceStart)?.[0],s=t.replace(qe.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${it(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Zs(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+it(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Zs(t);if(s===null)return it(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${it(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:it(t.text)}},vn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},et=class fn{constructor(e){fe(this,"options");fe(this,"renderer");fe(this,"textRenderer");this.options=e||kt,this.options.renderer=this.options.renderer||new xr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vn}static parse(e,r){return new fn(r).parse(e)}static parseInline(e,r){return new fn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},kr,Qt=(kr=class{constructor(t){fe(this,"options");fe(this,"block");this.options=t||kt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?Je.lex:Je.lexInline}provideParser(){return this.block?et.parse:et.parseInline}},fe(kr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),fe(kr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),kr),Wa=class{constructor(...t){fe(this,"defaults",hn());fe(this,"options",this.setOptions);fe(this,"parse",this.parseMarkdown(!0));fe(this,"parseInline",this.parseMarkdown(!1));fe(this,"Parser",et);fe(this,"Renderer",xr);fe(this,"TextRenderer",vn);fe(this,"Lexer",Je);fe(this,"Tokenizer",vr);fe(this,"Hooks",Qt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new xr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new vr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Qt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Qt.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Qt.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let u=l.call(s,c);return a.call(s,u)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return Je.lex(t,e??this.defaults)}parser(t,e){return et.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?Je.lex:Je.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?et.parse:et.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?Je.lex:Je.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?et.parse:et.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+it(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},yt=new Wa;function le(t,e){return yt.parse(t,e)}le.options=le.setOptions=function(t){return yt.setOptions(t),le.defaults=yt.defaults,Qs(le.defaults),le};le.getDefaults=hn;le.defaults=kt;le.use=function(...t){return yt.use(...t),le.defaults=yt.defaults,Qs(le.defaults),le};le.walkTokens=function(t,e){return yt.walkTokens(t,e)};le.parseInline=yt.parseInline;le.Parser=et;le.parser=et.parse;le.Renderer=xr;le.TextRenderer=vn;le.Lexer=Je;le.lexer=Je.lex;le.Tokenizer=vr;le.Hooks=Qt;le.parse=le;var Oc=le.options,Mc=le.setOptions,Nc=le.use,Pc=le.walkTokens,Fc=le.parseInline;var Bc=et.parse,zc=Je.lex;function co(t){let e=le.parse(t),r=Us.sanitize(e);return Gs(r)}function Ga(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function uo(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(k){k.key==="Escape"&&s&&(k.preventDefault(),_())}document.addEventListener("keydown",a);function c(){return s?p`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>_()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ga(s)}</span
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
            ${o==="loading"?p`<div class="mv__status">불러오는 중…</div>`:o==="error"?p`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:co(i)}
          </div>
        </div>
      </div>
    `:p``}function u(){de(c(),t)}async function h(k){s=k,o="loading",i="",l="",u();let S=r?r():"";if(!S){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",u();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",u();return}let O="/api/doc?workspace="+encodeURIComponent(S)+"&path="+encodeURIComponent(k);try{let P=await n(O),q=await P.json().catch(()=>({}));if(!P.ok||!q||q.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||P.status)+")",u();return}i=String(q.content||""),o="ready",u()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",u()}}function _(){s=null,de(p``,t)}function x(){document.removeEventListener("keydown",a),_()}return{open:h,close:_,destroy:x}}var ja={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ya(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function po(t,e={}){let r=Array.isArray(t)?t:[];return r.length===0?p`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `:p`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(n=>p`<button
            type="button"
            class="detail-session detail-session--${n.status||"unknown"}"
            data-attempt-id=${n.attempt_id}
            @click=${()=>e.onOpen&&e.onOpen(n.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${ja[n.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${n.attempt_id}</span>
            <span class="detail-session__meta"
              >${[n.runner,n.model].filter(Boolean).join(" \xB7 ")}</span
            >
            ${n.session_id?p`<span class="detail-session__sid" title=${n.session_id}
                  >${String(n.session_id).slice(0,8)}</span
                >`:""}
            <span class="detail-session__time">${Ya(n.started_at)}</span>
          </button>`)}
    </div>
  `}var Va=["open","in_progress","deferred","resolved","closed"],Za=[0,1,2,3,4];function fo(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,u={},h=!1,_=!1,x="",k="",S="";function O(){h=!1,_=!1,x="",k="",S=""}let P=document.createElement("div");P.className="md-viewer-root",document.body.appendChild(P);let q=uo(P,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),I=document.createElement("div");I.className="session-log-root",document.body.appendChild(I);let C=hr(I,{transport:s?(g,T)=>Promise.resolve(s(g,T)):void 0,sessionLogStore:l});function y(){if(!i||!a)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(E=>E&&E.bead_id===a).sort((E,B)=>(B.started_at||0)-(E.started_at||0)).map(E=>({attempt_id:E.attempt_id,bead_id:E.bead_id,status:E.status,started_at:typeof E.started_at=="number"?E.started_at:null,runner:E.runner||null,model:E.model||null,session_id:E.session_id||null}))}function b(g){let T=i?i.get():null,E=T&&T.attempts?T.attempts[g]:null;C.open({attempt_id:g,meta:E?{runner:E.runner||void 0,model:E.model||void 0,effort:E.effort||void 0,status:E.status||void 0,session_id:E.session_id||void 0}:{}})}let w={onOpen:b};function v(){let g=i?i.get():null,T=g&&g.exec_defaults;return T&&typeof T=="object"?T:{}}let F=null;r&&r.subscribe&&(F=r.subscribe(()=>J()));let j=null;i&&typeof i.subscribe=="function"&&(j=i.subscribe(()=>{a&&N()}));function Q(g){g.key==="Escape"&&a&&(g.preventDefault(),n())}document.addEventListener("keydown",Q);function J(){if(a){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+a)||[];c=g.find(E=>E&&E.id===a)||g[0]||c}N()}}function Re(g){It(g).then(T=>{T?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ue(g){g.preventDefault(),g.stopPropagation(),a&&Re(a)}function Te(g,T){g.preventDefault(),g.stopPropagation(),Re(T)}function Le(g,T){g.preventDefault(),g.stopPropagation(),q.open(T)}function Ne(g,T){u[g]=T,N(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:g,value:T})).catch(()=>{ee("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function ue(g,T,E){if(!s||!a)return!1;try{let B=await Promise.resolve(s(g,T)),U=Array.isArray(B)?B[0]:B;return U&&typeof U=="object"&&U.id?(c=U,!0):(ee(E,"error"),!1)}catch{return ee(E,"error"),!1}}function Pe(g){setTimeout(()=>{try{let T=t.querySelector(g);T&&typeof T.focus=="function"&&T.focus()}catch{}},0)}function je(){h=!0,x=c&&c.title||"",N(),Pe('.detail-edit__input[data-edit="title"]')}function pe(g){x=g.target.value}function Ye(){h=!1,x="",N()}function he(){ue("edit-text",{id:a,field:"title",value:x},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(T=>{T&&(h=!1,x=""),N()})}function Ve(){_=!0,k=c&&c.description||"",N(),Pe('.detail-edit__textarea[data-edit="description"]')}function oe(g){k=g.target.value}function $(){_=!1,k="",N()}function M(){ue("edit-text",{id:a,field:"description",value:k},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(T=>{T&&(_=!1,k=""),N()})}function V(g,T,E,B){if(g.key==="Escape"){g.stopPropagation(),E();return}g.key==="Enter"&&(!B||g.ctrlKey||g.metaKey)&&(g.preventDefault(),T())}function Y(g){let T=g.target.value;ue("update-status",{id:a,status:T},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>N())}function X(g){let T=Number(g.target.value);ue("update-priority",{id:a,priority:T},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>N())}function se(g){S=g.target.value}function ae(){let g=S.trim();g.length!==0&&ue("label-add",{id:a,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(T=>{T&&(S=""),N()})}function ge(g){if(g.key==="Escape"){g.stopPropagation(),S="",N();return}g.key==="Enter"&&(g.preventDefault(),ae())}function me(g){ue("label-remove",{id:a,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>N())}let ve={onCopyPath:Te,onOpenDoc:Le},xe={onChange:Ne};function Se(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function Ee(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function De(g){let E=(Array.isArray(g.dependencies)?g.dependencies:[]).map(B=>({id:Se(B),icon:Ee(B)})).filter(B=>B.id.length>0);return p`
      <div class="detail-section-label">의존성</div>
      ${E.length===0?p`<div class="detail-empty">의존성 없음</div>`:p`<div class="detail-deps">
            ${E.map(B=>o?p`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(B.id)}
                  >
                    ${B.icon?`${B.icon} `:""}${B.id}
                  </button>`:p`<span class="detail-dep"
                    >${B.icon?`${B.icon} `:""}${B.id}</span
                  >`)}
          </div>`}
    `}function Oe(g){let T=g.metadata||{},E=g.workflow||{},B=E.stages||{},U=B.spec&&B.spec.stale,ne=B.impl&&B.impl.stale,ce=E.route_source==="derived",H=E.route||T.route||"\u2014";return p`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ce?" detail-kv__v--derived":""}"
          title=${ce?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${ce&&E.route?`${H} ? (\uCD94\uB860)`:H}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${T.spec_review||"\uC5C6\uC74C"}${U?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${T.impl_review||"\uC5C6\uC74C"}${ne?" \xB7 stale":""}</span
        >
      </div>
      ${T.pr_url?p`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${T.pr_url}</span>
          </div>`:""}
    `}let Ge={route:["spec_backed","full_plan"],merge_policy:["auto_merge","pr_stop"],drift_policy:["auto_rereview","halt"]};async function Ze(g,T){let E=T.target.value;if(g==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&E!=="full_plan"&&!window.confirm(`full_plan \u2192 ${E||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){N();return}await ue("update-workflow-meta",{id:a,key:g,value:E},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),N()}function D(g){let T=g.metadata||{},E=(B,U)=>{let ne=Ge[B],ce=typeof T[B]=="string"?T[B]:"";return p`<div class="detail-kv">
        <span class="detail-kv__k">${B}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${B}
          data-edit=${`wfmeta-${B}`}
          @change=${H=>Ze(B,H)}
        >
          <option value="" ?selected=${!ne.includes(ce)}>
            ${U}
          </option>
          ${ne.map(H=>p`<option value=${H} ?selected=${ce===H}>${H}</option>`)}
        </select>
      </div>`};return p`
      ${E("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")}
      ${E("merge_policy","(\uAE30\uBCF8 auto_merge)")}
      ${E("drift_policy","(\uAE30\uBCF8 auto_rereview)")}
    `}function ye(g){return h?p`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${x}
            @input=${pe}
            @keydown=${T=>V(T,he,Ye,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${he}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ye}
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
          @click=${je}
        >
          ✎
        </button>
      </div>
    `}function be(g){let T=Rt(g.created_at),E=Rt(g.updated_at);return!T&&!E?p``:p`
      ${T?p`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
      ${E?p`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
    `}function Ce(g,T){return p`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Y}
        >
          ${Va.map(E=>p`<option value=${E} ?selected=${E===g}>${E}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${X}
        >
          ${Za.map(E=>p`<option value=${String(E)} ?selected=${E===T}>
                P${E}
              </option>`)}
        </select>
      </div>
    `}function A(g){return p`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${_?"":p`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ve}
            >
              ✎
            </button>`}
      </div>
      ${_?p`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${k}
              @input=${oe}
              @keydown=${T=>V(T,M,$,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${M}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${$}
              >
                취소
              </button>
            </div>
          </div>`:p`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function L(g){let T=Array.isArray(g.labels)?g.labels:[];return p`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${T.map(E=>p`<span class="detail-label-chip"
              >${E}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${E}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+E}
                @click=${()=>me(E)}
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
            @input=${se}
            @keydown=${ge}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ae}
          >
            추가
          </button>
        </span>
      </div>
    `}function K(){if(!a)return p``;let g=c||{},T=String(g.id||a),E=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",B=g.status||"open",U=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",ne=g.description||"",ce={...g,metadata:{...g.metadata||{},...u}};return p`
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
            @click=${Ue}
          >
            ${T}
          </button>
          ${ye(E)} ${Ce(B,U)}
          ${be(g)} ${A(ne)}
          ${L(g)} ${De(g)}
          ${Oe(g)} ${D(g)}
          ${Ts(g,ve)}
          ${Cs(ce,xe,v())}
          ${po(y(),w)}
        </div>
      </div>
    `}function N(){de(K(),t)}return{load(g){g!==a&&(u={},O()),a=g,c=null,J()},clear(){a=null,c=null,u={},O(),q.close(),C.close(),de(p``,t)},destroy(){F&&(F(),F=null),j&&(j(),j=null),document.removeEventListener("keydown",Q),q.destroy(),P.parentNode&&P.parentNode.removeChild(P),C.destroy(),I.parentNode&&I.parentNode.removeChild(I),a=null,c=null,de(p``,t)}}}var Ka=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ho(t,e){return Wr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Xa(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function go(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(b){let w=r.get();if(w)try{let v=await n("display-policy-set",{expected_revision:w.revision,policy:b(w)});a(v),v&&v.conflict&&v.policy&&(v=await n("display-policy-set",{expected_revision:v.policy.revision,policy:b(v.policy)}),a(v)),v&&v.conflict&&ee("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ee("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(b){b&&b.policy&&typeof b.policy=="object"&&r.set(b.policy)}function c(b){let w=r.get();if(!w)return;let v=ho(b,w)!=="shown";l(F=>Xa(b,F,v))}function u(){let b=i.trim();b.length!==0&&(i="",l(w=>w.hidden_prefixes.includes(b)?{hidden_prefixes:w.hidden_prefixes}:{hidden_prefixes:[...w.hidden_prefixes,b]}),O())}function h(b){l(w=>({hidden_prefixes:w.hidden_prefixes.filter(v=>v!==b)}))}function _(b){let w=r.get();if(!w)return;let v=w.chips[b]===!1;l(()=>({chips:{[b]:v}}))}function x(b){let w=s();return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${w.length===0?p`<div class="display-settings__empty">라벨 없음</div>`:p`<div class="display-settings__pills">
              ${w.map(v=>{let F=ho(v,b);return p`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${F}`}
                  data-label=${v}
                  data-state=${F}
                  @click=${()=>c(v)}
                >
                  ${v}
                </button>`})}
            </div>`}
      </section>
    `}function k(b){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${b.hidden_prefixes.map(w=>p`<span class="display-settings__prefix">
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
    `}function S(b){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Ka.map(([w,v])=>p`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${w}
                  .checked=${b.chips[w]!==!1}
                  @change=${()=>_(w)}
                />
                <span>${v}</span>
              </label>`)}
        </div>
      </section>
    `}function O(){let b=r.get();de(p`
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
            ${b?p`${x(b)} ${k(b)}
                ${S(b)}`:p`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let P=!1,q=()=>{P=!1};o.addEventListener("close",q),o.addEventListener("cancel",q);let I=null;r.subscribe&&(I=r.subscribe(()=>{P&&O()}));function C(){P||(i="",P=!0,O(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function y(){P&&(P=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:C,close:y,destroy(){P=!1,o.removeEventListener("close",q),o.removeEventListener("cancel",q),I&&(I(),I=null),o.remove()}}}function mo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,u,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let _=typeof h=="string"?h.trim():"";if(s&&(_.length>0?(s.textContent=_,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function bo(t,e,r){let n=we("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return p`
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
    `}function l(){de(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),de(p``,t)}}}var _o=["bug","feature","task","epic","chore"];function yo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ko=["Critical","High","Medium","Low","Backlog"];function wo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),u=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),_=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let y=document.createElement("option");y.value="",y.textContent="\u2014 Select \u2014",o.appendChild(y);for(let b of _o){let w=document.createElement("option");w.value=b,w.textContent=yo(b),o.appendChild(w)}i.replaceChildren();for(let b=0;b<=4;b+=1){let w=document.createElement("option");w.value=String(b);let v=ko[b]||"Medium";w.textContent=`${b} \u2013 ${v}`,i.appendChild(w)}}x();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function S(y){s.disabled=y,o.disabled=y,i.disabled=y,l.disabled=y,a.disabled=y,u.disabled=y,h.disabled=y,h.textContent=y?"Creating\u2026":"Create"}function O(){c.textContent=""}function P(y){c.textContent=y}function q(){try{let y=window.localStorage.getItem("beads-ui.new.type");y?o.value=y:o.value="";let b=window.localStorage.getItem("beads-ui.new.priority");b&&/^\d$/.test(b)?i.value=b:i.value="2"}catch{o.value="",i.value="2"}}function I(){let y=o.value||"",b=i.value||"";y.length>0&&window.localStorage.setItem("beads-ui.new.type",y),b.length>0&&window.localStorage.setItem("beads-ui.new.priority",b)}async function C(){O();let y=String(s.value||"").trim();if(y.length===0){P("Title is required"),s.focus();return}let b=Number(i.value||"2");if(!(b>=0&&b<=4)){P("Priority must be 0..4"),i.focus();return}let w=String(o.value||""),v=String(a.value||""),F={title:y};w.length>0&&(F.type=w),String(b).length>0&&(F.priority=b),v.length>0&&(F.description=v),S(!0);try{await e("create-issue",F)}catch{S(!1),P("Failed to create issue");return}I(),S(!1),k()}return r.addEventListener("cancel",y=>{y.preventDefault(),k()}),_.addEventListener("click",()=>k()),u.addEventListener("click",()=>k()),r.addEventListener("keydown",y=>{y.key==="Enter"&&(y.ctrlKey||y.metaKey)&&(y.preventDefault(),C())}),n.addEventListener("submit",y=>{y.preventDefault(),C()}),{open(){n.reset(),O(),q();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var Qa=[{key:"worker_runner",values:()=>Zr},{key:"orchestration_model",values:t=>en(t)},{key:"orchestration_effort",values:()=>Kr},{key:"review_model",values:()=>Xr},{key:"impl_model",values:()=>Qr}],Ja=[{key:"merge_policy",values:["auto_merge","pr_stop"],default_label:"(\uAE30\uBCF8 auto_merge)"},{key:"drift_policy",values:["auto_rereview","halt"],default_label:"(\uAE30\uBCF8 auto_rereview)"}];function vo(t,e){let{queueStore:r,transport:n}=e,s=document.createElement("dialog");s.id="worker-exec-defaults-dialog",s.className="exec-defaults",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),t.appendChild(s);function o(){return r&&r.get()||{revision:0,exec_defaults:{}}}function i(){let I=o();return typeof I.revision=="number"?I.revision:0}function l(){let I=o().exec_defaults;return I&&typeof I=="object"?I:{}}function a(I){I&&I.queue&&r&&r.set(I.queue)}async function c(I,C){if(!n)return;let y={key:I,value:C||null};try{let b=await n("worker-queue-set-exec-default",{...y,expected_revision:i()});a(b),b&&b.conflict&&(b=await n("worker-queue-set-exec-default",{...y,expected_revision:i()}),a(b)),b&&b.conflict&&ee("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ee("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}async function u(I,C){if(!n)return;let y={key:I,value:C||null};try{let b=await n("worker-queue-set-policy",{...y,expected_revision:i()});a(b),b&&b.conflict&&(b=await n("worker-queue-set-policy",{...y,expected_revision:i()}),a(b)),b&&b.conflict&&ee("\uC804\uC5ED \uC815\uCC45 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ee("\uC804\uC5ED \uC815\uCC45 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function h(I,C,y){let b=!!y&&!C.includes(y);return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${I}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${I}`}
        data-key=${I}
        @change=${w=>{c(I,w.target.value)}}
      >
        <option value="" ?selected=${!y}>
          ${Jr[I]||"(\uAE30\uBCF8)"}
        </option>
        ${b?p`<option value=${y} ?selected=${!0}>
              ${y} (비호환)
            </option>`:""}
        ${C.map(w=>p`<option value=${w} ?selected=${y===w}>${w}</option>`)}
      </select>
    </div>`}function _(I,C){let y=typeof C[I.key]=="string"?C[I.key]:"";return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${I.key}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${I.key}`}
        data-policy-key=${I.key}
        @change=${b=>{u(I.key,b.target.value)}}
      >
        <option value="" ?selected=${!I.values.includes(y)}>
          ${I.default_label}
        </option>
        ${I.values.map(b=>p`<option value=${b} ?selected=${y===b}>${b}</option>`)}
      </select>
    </div>`}function x(){let I=o(),C=l(),y=C.worker_runner||"";de(p`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${q}
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
            ${Qa.map(b=>h(b.key,b.values(y),C[b.key]||""))}
            <p class="exec-defaults__hint exec-defaults__hint--policy">
              전역 정책 (좁은 화면에서 상단 바 대신 여기서 편집)
            </p>
            ${Ja.map(b=>_(b,I))}
          </div>
        </div>
      `,s)}let k=!1,S=()=>{k=!1};s.addEventListener("close",S),s.addEventListener("cancel",S);let O=null;r&&r.subscribe&&(O=r.subscribe(()=>{k&&x()}));function P(){k||(k=!0,x(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))}function q(){k&&(k=!1,typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:P,close:q,destroy(){k=!1,s.removeEventListener("close",S),s.removeEventListener("cancel",S),O&&(O(),O=null),s.remove()}}}function el(t){let e=t.draggable&&!t.done;return p`<div
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
  </section>`}function rl(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function xo(t){return p`<div class="worker-banners">
    ${t.autoAdvance?p`<div class="worker-banner worker-banner--on" role="status">
          ▶ 자동 진행 켜짐 — Serial head 1 + Parallel 슬롯까지 실행합니다.
        </div>`:p`<div class="worker-banner worker-banner--off" role="status">
          ⏸ 자동 진행 꺼짐 — 새 세션을 시작하지 않습니다. ▶로 재개.
        </div>`}
    ${t.breaker?p`<div class="worker-banner worker-banner--breaker" role="alert">
          ⛔ ${t.breaker.repo||"repo"} 세션 실패로 차단 —
          ${t.breaker.reason||""}. 신규 launch·머지 진입 차단, 수동 ▶
          필요.
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
  </div>`}function $o(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return p`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?p`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>nl(s,e,r))}
  </div>`}var sl="tab:worker:ready",ol="tab:worker:blocked";function il(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function al(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function ll(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function xn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l}=e,a=n?dr(n,i):null,c=ur({transport:r,uiOrderStore:i}),u=null,h=[],_=[],x=document.createElement("div");x.className="worker-console";let k=document.createElement("div"),S=document.createElement("div");S.className="worker-drawer-host";let O=document.createElement("div");O.className="worker-lanes-host",x.append(k,S,O),t.appendChild(x);let P=null,q=hr(S,{transport:r,sessionLogStore:o,onClose:()=>{P=null,Le()}}),I=vo(x,{queueStore:s,transport:r});function C(){return s&&s.get()||{revision:0,auto_advance:!1,serial:[],parallel:[],done:[]}}function y(){let $=C();return typeof $.revision=="number"?$.revision:0}function b($){$&&$.queue&&s&&s.set($.queue)}async function w($,M,V){if(!r)return;let Y=await r("worker-queue-place",{bead_id:$,lane:M,index:V,expected_revision:y()});b(Y),Y&&Y.conflict&&await r("worker-queue-place",{bead_id:$,lane:M,index:V,expected_revision:y()}).then(b)}async function v($,M,V){if(!r)return;let Y=await r("worker-queue-reorder",{bead_id:$,lane:M,to_index:V,expected_revision:y()});b(Y),Y&&Y.conflict&&await r("worker-queue-reorder",{bead_id:$,lane:M,to_index:V,expected_revision:y()}).then(b)}async function F($){if(!r)return;let M=await r("worker-queue-remove",{bead_id:$,expected_revision:y()});b(M),M&&M.conflict&&await r("worker-queue-remove",{bead_id:$,expected_revision:y()}).then(b)}async function j($){!r||!$||await r("worker-attempt-stop",{attempt_id:$})}async function Q($){if(!r)return;let M=await r("worker-queue-toggle",{on:$,expected_revision:y()});b(M),M&&M.conflict&&await r("worker-queue-toggle",{on:$,expected_revision:y()}).then(b)}async function J($,M){if(!r)return;let V={key:$,value:M||null},Y=await r("worker-queue-set-policy",{...V,expected_revision:y()});b(Y),Y&&Y.conflict&&await r("worker-queue-set-policy",{...V,expected_revision:y()}).then(b)}function Re(){let $=C(),M=a?a.selectBoardColumn(sl,"ready"):[],V=a?a.selectBoardColumn(ol,"blocked"):[],Y=new Map;for(let D of[...M,...V])Y.set(D.id,D.title||D.id);let X=new Set([...$.serial.map(D=>D.bead_id),...$.parallel.map(D=>D.bead_id),...$.done.map(D=>D.bead_id)]),se=new Set(V.map(D=>D.id)),ae=i?i.get()?.order||{}:{},ge=new Set,me=[];for(let D of[...M,...V])X.has(D.id)||ge.has(D.id)||al(D)||(ge.add(D.id),me.push(D));me.sort(lr(ae)),h=me;let ve=$.admission||{},xe=D=>ve[D]?`\u26D4 ${ve[D].reason}`:"",Se=me.map(D=>{let ye=il(D),be=[];se.has(D.id)&&be.push(ll(D)),ye||be.push("spec \uC5C6\uC74C");let Ce=xe(D.id);return Ce&&be.push(Ce),{id:D.id,title:D.title||D.id,reason:be.join(" \xB7 "),draggable:ye,lane:"candidate",workflow:D.workflow,status:D.status}}),Ee=(D,ye)=>D.map(be=>({id:be.bead_id,title:Y.get(be.bead_id)||be.bead_id,reason:ye==="done"?"":xe(be.bead_id),draggable:ye!=="done",done:ye==="done",lane:ye})),De=new Map;for(let D of $.serial||[])De.set(D.bead_id,"serial");for(let D of $.parallel||[])De.set(D.bead_id,"parallel");let Oe=$.attempts?Object.values($.attempts):[],Ge=[],Ze=null;for(let D of Oe)D.status==="running"?Ge.push({bead_id:D.bead_id,attempt_id:D.attempt_id,title:Y.get(D.bead_id)||D.bead_id,lane:De.get(D.bead_id)||"parallel",runner:D.runner||null,model:D.model||null,effort:D.effort||null,started_at:typeof D.started_at=="number"?D.started_at:null,merge_policy:D.merge_policy||null,demoted_reason:D.demoted_reason||null}):(D.status==="failed"||D.status==="orphaned")&&(Ze={repo:D.repo||"",reason:D.cause||D.status});return{queue:$,idToTitle:Y,candidates:Se,running:Ge,breaker:Ze,serial:Ee($.serial,"serial"),parallel:Ee($.parallel,"parallel"),done:Ee($.done,"done")}}function Ue($){let M=$.serial.length>0?$.serial[0].id:"\u2014",V=$.queue.workspace_info||{},Y=V.verify_cmd&&Array.isArray(V.verify_cmd.cmd)?V.verify_cmd.cmd.join(" "):null,X=Y?`verify_cmd \u2014 \uC11C\uBC84 \uC124\uC815 \uD30C\uC77C \uC804\uC6A9(\uC77D\uAE30), \uBBF8\uC124\uC815 \uC2DC auto_merge\uAC00 pr_stop\uC73C\uB85C \uAC15\uB4F1. \uC804\uCCB4 \uBA85\uB839: ${Y}`:"verify_cmd \u2014 \uC11C\uBC84 \uC124\uC815 \uD30C\uC77C \uC804\uC6A9(\uC77D\uAE30), \uBBF8\uC124\uC815 \uC2DC auto_merge\uAC00 pr_stop\uC73C\uB85C \uAC15\uB4F1",se=(ae,ge,me)=>{let ve=typeof $.queue[ae]=="string"?$.queue[ae]:"";return p`<label class="worker-policy">
        <span class="worker-policy__k">${ae}</span>
        <select
          class="worker-policy__sel"
          aria-label=${`\uC804\uC5ED ${ae}`}
          data-policy-key=${ae}
          @change=${xe=>{J(ae,xe.target.value)}}
        >
          <option value="" ?selected=${!ge.includes(ve)}>
            ${me}
          </option>
          ${ge.map(xe=>p`<option value=${xe} ?selected=${ve===xe}>${xe}</option>`)}
        </select>
      </label>`};return p`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${$.queue.auto_advance?" is-active":""}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${$.running.length}</b> · serial 다음
          <b>${M}</b></span
        >
        <span class="worker-tgl"
          >parallel slot <b>${$.parallel.length}</b></span
        >
        ${se("merge_policy",["auto_merge","pr_stop"],"(\uAE30\uBCF8 auto_merge)")}
        ${se("drift_policy",["auto_rereview","halt"],"(\uAE30\uBCF8 auto_rereview)")}
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
          class="worker-verifycmd${Y?"":" worker-verifycmd--unset"}"
          title=${X}
        >
          ${Y?p`<span class="worker-verifycmd__full"
                  >verify_cmd: <code>${Y}</code></span
                ><span class="worker-verifycmd__badge">verify_cmd ✓</span>`:p`<span class="worker-verifycmd__full"
                  >verify_cmd: 미설정 (auto_merge→pr_stop 강등)</span
                ><span class="worker-verifycmd__badge"
                  >verify_cmd 미설정 ⤵pr_stop</span
                >`}</span
        >
      </div>
      ${xo({autoAdvance:!!$.queue.auto_advance,breaker:$.breaker})}
      ${$o($.running,Date.now(),P)}`}function Te($){return p`<div class="worker-lanes">
      ${tr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:$.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${tr({id:"worker-pane-serial",lane:"serial",title:"Serial \uD050",items:$.serial,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${tr({id:"worker-pane-parallel",lane:"parallel",title:"Parallel \uD480",items:$.parallel,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${tr({id:"worker-pane-done",lane:"done",title:`Done \xB7 \uC624\uB298 ${$.done.length}`,items:$.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Le(){let $=Re();de(Ue($),k),de(Te($),O)}function Ne($){let M=$.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!M)return;let V=M.dataset.beadId||"",Y=M.dataset.lane||"";u={bead_id:V,from_lane:Y};try{$.dataTransfer?.setData("text/plain",V),$.dataTransfer&&($.dataTransfer.effectAllowed="move")}catch{}}function ue($){let M=$.target?.closest?.(".worker-pane");M&&($.preventDefault(),$.dataTransfer&&($.dataTransfer.dropEffect="move"),M.classList.add("worker-pane--drag-over"))}function Pe($){$.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function je($,M){let V=h.find(ae=>ae.id===$);if(!V)return;let Y=h.filter(ae=>ae.id!==$),X=Y.length;if(M){let ae=M.dataset.beadId;if(ae===$)return;let ge=Y.findIndex(me=>me.id===ae);ge>=0&&(X=ge)}let se=Y.slice();se.splice(X,0,V),c.applyReorder($,se,X)}function pe($){let M=$.target?.closest?.(".worker-pane");if(!M)return;$.preventDefault(),M.classList.remove("worker-pane--drag-over");let V=M.dataset.lane||"",Y=u?.bead_id||$.dataTransfer?.getData("text/plain")||"",X=u?.from_lane||"";if(u=null,!Y)return;let se=$.target?.closest?.(".worker-mini, .worker-card"),ae=Array.from(M.querySelectorAll(".worker-mini, .worker-card")),ge=ae.length;if(se){let me=ae.indexOf(se);me>=0&&(ge=me)}if(V==="candidate"){if(X==="candidate"){je(Y,se);return}(X==="serial"||X==="parallel")&&F(Y);return}(V==="serial"||V==="parallel")&&(X===V?v(Y,V,ge):w(Y,V,ge))}function Ye($){return $?{runner:$.runner||void 0,model:$.model||void 0,effort:$.effort||void 0,worktree:$.worktree||void 0,status:$.status||void 0,session_id:$.session_id||void 0}:{}}function he($){let M=C(),V=M.attempts?M.attempts[$]:null;P=$,q.open({attempt_id:$,meta:Ye(V)}),Le()}function Ve(){if(!P)return;let $=C(),M=$.attempts?$.attempts[P]:null;M&&q.updateMeta(Ye(M))}function oe($){let M=$.target;if(M?.closest?.("#worker-exec-defaults-dialog"))return;if(M?.closest?.(".worker-exec-defaults-btn")){I.open();return}if(M?.closest?.(".worker-play")){Q(!0);return}if(M?.closest?.(".worker-pause")){Q(!1);return}if(M?.closest?.(".rtile__stop")){let se=M?.closest?.(".rtile")?.dataset?.attemptId;se&&j(se);return}if(M?.closest?.(".rtile__info")){let se=M?.closest?.(".rtile")?.dataset?.beadId;se&&l&&l(se);return}if(M?.closest?.(".worker-drawer-host"))return;let V=M?.closest?.(".rtile");if(V){let X=V.dataset.attemptId;X&&he(X);return}let Y=M?.closest?.(".worker-mini, .worker-card");if(Y){let X=Y.dataset.beadId;if(M?.closest?.(".worker-mini__id, .worker-card__id")){X&&It(X).then(se=>{se?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}X&&l&&l(X)}}return t.addEventListener("dragstart",Ne),t.addEventListener("dragover",ue),t.addEventListener("dragleave",Pe),t.addEventListener("drop",pe),t.addEventListener("click",oe),a&&_.push(a.subscribe(Le)),s&&_.push(s.subscribe(()=>{Le(),Ve()})),Le(),{load(){Le()},destroy(){for(let $ of _.splice(0))try{$()}catch{}t.removeEventListener("dragstart",Ne),t.removeEventListener("dragover",ue),t.removeEventListener("dragleave",Pe),t.removeEventListener("drop",pe),t.removeEventListener("click",oe);try{q.destroy()}catch{}try{I.destroy()}catch{}de(p``,t)}}}function $n(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function So(t,e,r,n=async()=>{},s=async()=>{}){let o=we("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function u(b){let v=b.target.value,j=e.getState().workspace?.current?.path||"";if(v&&v!==j){o("switching workspace to %s",v),l=!0,y();try{await r(v)}catch(Q){o("workspace switch failed: %o",Q)}finally{l=!1,y()}}}async function h(){let b=e.getState(),w=b.workspace?.current?.path||b.workspace?.available?.[0]?.path||"";if(!(!w||a)){o("git-pulling workspace %s",w),a=!0,y();try{await n(w)}catch(v){o("workspace git pull failed: %o",v)}finally{a=!1,y()}}}function _(b){let w=b.target;w&&t.contains(w)||S()}function x(b){b.key==="Escape"&&S()}function k(){c||(c=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",x),y())}function S(){c&&(c=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",x),y())}function O(){c?S():k()}async function P(b){let w=b.target,v=w.value,F=w.checked;o("toggling visibility %s \u2192 %s",v,String(F));try{await s(v,F)}catch(j){o("workspace visibility toggle failed: %o",j)}}function q(b){return b?p`
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
    `:p``}function I(b,w){return p`
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
        ${c?p`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${b.map(v=>p`
                    <label
                      class="workspace-picker__manage-row"
                      title="${v.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${v.path}"
                        .checked=${!w.has(v.path)}
                        @change=${P}
                      />
                      <span class="workspace-picker__manage-name"
                        >${$n(v.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function C(){let b=e.getState(),w=b.workspace?.current,v=b.workspace?.available||[],F=new Set(b.workspace?.hidden||[]),j=w?.path||v[0]?.path||"";if(v.length===0)return p``;let Q=v.filter(J=>!F.has(J.path)||J.path===j);if(Q.length<=1){let J=Q[0]||v[0],Re=$n(J.path);return p`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${J.path}"
            >${Re}</span
          >
          ${I(v,F)}
          ${q(j)}
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
          ${Q.map(J=>p`
              <option
                value="${J.path}"
                ?selected=${J.path===j}
                title="${J.path}"
              >
                ${$n(J.path)}
              </option>
            `)}
        </select>
        ${I(v,F)}
        ${q(j)}
        ${l||a?p`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function y(){de(C(),t)}return y(),i=e.subscribe(()=>y()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",x),de(p``,t)}}}var Ao=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-policy","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-stop","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Sn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function To(t,e,r=Sn()){return{id:r,type:t,payload:e}}function Eo(t={}){let e=we("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,u=[],h=new Map,_=new Set;function x(C){for(let y of Array.from(_))try{y(C)}catch{}}function k(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),x(o);let C=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),y=(r.jitterRatio||0)*C,b=Math.max(0,Math.round(C+(Math.random()*2-1)*y));e("ws retry in %d ms (attempt %d)",b,i+1),l=setTimeout(()=>{l=null,I()},b)}function S(C){try{s?.send(JSON.stringify(C))}catch(y){e("ws send failed",y)}}function O(){for(o="open",e("ws open"),x(o),i=0;u.length;){let C=u.shift();C&&S(C)}}function P(C){let y;try{y=JSON.parse(String(C.data))}catch{e("ws received non-JSON message");return}if(!y||typeof y.id!="string"||typeof y.type!="string"){e("ws received invalid envelope");return}if(c.has(y.id)){let w=c.get(y.id);c.delete(y.id),y.ok?w?.resolve(y.payload):w?.reject(y.error||new Error("ws error"));return}let b=h.get(y.type);if(b&&b.size>0)for(let w of Array.from(b))try{w(y.payload)}catch(v){e("ws event handler error",v)}else e("ws received unhandled message type: %s",y.type)}function q(){o="closed",e("ws closed"),x(o);for(let[C,y]of c.entries())y.reject(new Error("ws disconnected")),c.delete(C);i+=1,k()}function I(){if(!a)return;let C=n();try{s=new WebSocket(C),e("ws connecting %s",C),o="connecting",x(o),s.addEventListener("open",O),s.addEventListener("message",P),s.addEventListener("error",()=>{}),s.addEventListener("close",q)}catch(y){e("ws connect failed %o",y),k()}}return I(),{send(C,y){if(!Ao.includes(C))return Promise.reject(new Error(`unknown message type: ${C}`));let b=Sn(),w=To(C,y,b);return e("send %s id=%s",C,b),new Promise((v,F)=>{c.set(b,{resolve:v,reject:F,type:C}),s&&s.readyState===s.OPEN?S(w):(e("queue %s id=%s (state=%s)",C,b,o),u.push(w))})},on(C,y){h.has(C)||h.set(C,new Set);let b=h.get(C);return b?.add(y),()=>{b?.delete(y)}},onConnection(C){return _.add(C),()=>{_.delete(C)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,I()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function cl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function dl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var An=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Co=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Ro="worker:queue",Lo="ui:order",Io="ui:display-policy",dt="tab:board:closed",Do="beads-ui.board.closed-range";function ul(t){let e=we("main");e("bootstrap start");let r=p`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;de(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let v=function(f,m){let Z="Request failed",G="";if(f&&typeof f=="object"){let ke=f;if(typeof ke.message=="string"&&ke.message.length>0&&(Z=ke.message),typeof ke.details=="string")G=ke.details;else if(ke.details&&typeof ke.details=="object")try{G=JSON.stringify(ke.details,null,2)}catch{G=""}}else typeof f=="string"&&f.length>0&&(Z=f);let te=m&&m.length>0?`Failed to load ${m}`:"Request failed";w.open(te,Z,G)},oe=function(f){return`${U.getState().workspace.current?.path||""}\0${f}`},$=function(){Ne&&(Ne().catch(()=>{}),Ne=null),ue=null,Pe=null},V=function(f){je=f;let m=()=>{je!==f||U.getState().selected_id!==f||(je=null,M(f))};if(!he){Ye.then(m);return}m()},ae=function(){let f=Yn(se);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},ge=function(f){if(f)for(let[m,Z]of An){if(Y.has(m)||X.has(m))continue;let G=m===dt?ae():{type:Z};try{J.register(m,G)}catch(te){e("register %s store failed: %o",m,te)}X.add(m),Q.subscribeList(m,G).then(te=>{Y.set(m,te)}).catch(te=>{e("subscribe %s failed: %o",m,te),v(te,"board")}).finally(()=>{X.delete(m)})}else ve()},ve=function(){for(let[f]of An){let m=Y.get(f);m&&(m().catch(()=>{}),Y.delete(f));try{J.unregister(f)}catch(Z){e("unregister %s failed: %o",f,Z)}}},Ee=function(f){if(!f){De();return}for(let[m,Z]of Co)if(!(xe.has(m)||X.has(m))){try{J.register(m,{type:Z})}catch(G){e("register %s store failed: %o",m,G)}X.add(m),Q.subscribeList(m,{type:Z}).then(G=>{xe.set(m,G)}).catch(G=>{e("subscribe %s failed: %o",m,G),v(G,"worker")}).finally(()=>{X.delete(m)})}Se||(j("subscribe-worker-queue",{id:Ro}).catch(m=>{e("subscribe-worker-queue failed: %o",m)}),Se=()=>j("unsubscribe-worker-queue",{id:Ro}))},De=function(){for(let[f]of Co){let m=xe.get(f);m&&(m().catch(()=>{}),xe.delete(f));try{J.unregister(f)}catch(Z){e("unregister %s failed: %o",f,Z)}}Se&&(Se().catch(()=>{}),Se=null)},Ge=function(){Oe||(j("subscribe-ui-order",{id:Lo}).catch(f=>{e("subscribe-ui-order failed: %o",f)}),Oe=()=>j("unsubscribe-ui-order",{id:Lo}))},Ze=function(){Oe&&(Oe().catch(()=>{}),Oe=null),Ue.clear()},ye=function(){D||(j("subscribe-display-policy",{id:Io}).catch(f=>{e("subscribe-display-policy failed: %o",f)}),D=()=>j("unsubscribe-display-policy",{id:Io}))},be=function(){D&&(D().catch(()=>{}),D=null),Te.clear()},g=function(f){if(!f)return"Unknown";let m=f.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var l=v,a=oe,c=$,u=V,h=ae,_=ge,x=ve,k=Ee,S=De,O=Ge,P=Ze,q=ye,I=be,C=g;let y=document.getElementById("header-loading"),b=ms(y),w=mo(t),F=Eo(),j=b.wrapSend((f,m)=>F.send(f,m)),Q=cs(j),J=ds(),Re=ps(),Ue=us(),Te=Vn(),Le=Zn();F.on("worker-queue-snapshot",f=>{let m=f;if(m&&m.queue)try{Re.set(m.queue)}catch{}}),F.on("ui-order-snapshot",f=>{let m=f;if(m&&typeof m.revision=="number")try{Ue.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),F.on("display-policy-snapshot",f=>{let m=f;if(m&&m.policy&&typeof m.policy=="object")try{Te.set(m.policy)}catch{}}),F.on("session-log-snapshot",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{Le.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[])}catch{}}),F.on("session-log-append",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{Le.append(m.attempt_id,m.event)}catch{}}),F.on("snapshot",f=>{let m=f,Z=m&&typeof m.id=="string"?m.id:"",G=Z?J.getStore(Z):null;if(G&&m&&m.type==="snapshot")try{G.applyPush(m)}catch{}}),F.on("upsert",f=>{let m=f,Z=m&&typeof m.id=="string"?m.id:"",G=Z?J.getStore(Z):null;if(G&&m&&m.type==="upsert")try{G.applyPush(m)}catch{}}),F.on("delete",f=>{let m=f,Z=m&&typeof m.id=="string"?m.id:"",G=Z?J.getStore(Z):null;if(G&&m&&m.type==="delete")try{G.applyPush(m)}catch{}});let Ne=null,ue=null,Pe=null,je=null,pe=()=>{},Ye=new Promise(f=>{pe=()=>f(void 0)}),he=!1,Ve=!1;async function M(f){let m=oe(f);if(m===ue||m===Pe)return;Pe=m;let Z=`detail:${f}`,G={type:"issue-detail",params:{id:f}};try{J.register(Z,G)}catch(te){e("register detail store failed: %o",te)}try{let te=await Q.subscribeList(Z,G);if(U.getState().selected_id!==f||oe(f)!==m){await te().catch(()=>{});return}Ne&&await Ne().catch(()=>{}),Ne=te,ue=m}catch(te){e("detail subscribe failed: %o",te),v(te,"issue details")}finally{Pe===m&&(Pe=null)}}let Y=new Map,X=new Set,se=or;try{let f=window.localStorage.getItem(Do);Br(f)&&(se=f)}catch{}async function me(f){if(!Br(f)||f===se)return;se=f;try{window.localStorage.setItem(Do,f)}catch{}let m=Y.get(dt);if(!m)return;Y.delete(dt),await m().catch(()=>{});let Z=ae();try{J.register(dt,Z)}catch(G){e("register %s store failed: %o",dt,G)}try{let G=await Q.subscribeList(dt,Z);Y.set(dt,G)}catch(G){e("re-subscribe %s failed: %o",dt,G),v(G,"board")}}let xe=new Map,Se=null,Oe=null,D=null;async function Ce(){D=null,Te.clear();let f=U.getState().workspace.current?.path;if(f)try{await F.send("set-workspace",{path:f})}catch(m){e("workspace restore after reconnect failed: %o",m);return}ye()}async function A(){e("clearing all subscriptions for workspace switch"),ve(),De(),Re.clear(),Ze(),Ge(),be(),ye(),$();let f=U.getState();if(f.selected_id)try{J.unregister(`detail:${f.selected_id}`)}catch{}let m=U.getState();ge(m.view==="board"),Ee(m.view==="worker"),m.selected_id&&V(m.selected_id)}async function L(f){e("requesting workspace switch to %s",f),Ve=!0;try{let m=await F.send("set-workspace",{path:f});e("workspace switch result: %o",m),m&&m.workspace&&(U.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),m.changed&&(await A(),ee("Switched to "+g(f),"success",2e3)))}catch(m){throw e("workspace switch failed: %o",m),ee("Failed to switch workspace","error",3e3),m}finally{Ve=!1}}async function K(f){e("requesting workspace git pull for %s",f);try{let m=await F.send("git-pull-workspace",{});e("workspace git pull result: %o",m);let Z=m?.status;if(Z==="up_to_date"){ee("Already up to date","success",2e3);return}if(Z==="stash_pop_conflict"){ee("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ee("Git pulled "+g(f),"success",2e3)}catch(m){e("workspace git pull failed: %o",m);let Z=m?.code,G=m?.message;if(Z==="rebase_conflict"){ee("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Z==="rebase_conflict_abort_failed"){ee("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Z==="busy"){ee("Git pull skipped: another operation is running","warning",3e3);return}let te=G?`: ${G}`:"";throw ee(`Git pull failed${te}`,"error",3e3),m}}async function N(f,m){e("setting workspace visibility %s \u2192 %s",f,String(m));try{await F.send("set-workspace-visibility",{path:f,visible:m}),await T()}catch(Z){e("workspace visibility update failed: %o",Z),ee("Failed to update project visibility","error",3e3)}}async function T(){try{let f=await F.send("list-workspaces",{});if(e("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let m=f.workspaces.map(ke=>({path:ke.path,database:ke.database,pid:ke.pid,version:ke.version})),Z=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,G=Array.isArray(f.hidden)?f.hidden.filter(ke=>typeof ke=="string"):[];U.setState({workspace:{current:Z,available:m,hidden:G}});let te=window.localStorage.getItem("beads-ui.workspace");te&&(!m.some(nr=>nr.path===te)||G.includes(te)?window.localStorage.removeItem("beads-ui.workspace"):Z&&te!==Z.path&&(e("restoring saved workspace preference: %s",te),await L(te)))}}catch(f){e("failed to load workspaces: %o",f)}}F.on("workspace-changed",f=>{e("workspace-changed event: %o",f),f&&f.root_dir&&(U.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),T(),A())});let E=!1;if(typeof F.onConnection=="function"){let f=m=>{e("ws state %s",m),m==="reconnecting"||m==="closed"?(E=!0,ee("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&E&&(E=!1,ee("Reconnected","success",2200),dl(U,(Z,G)=>{e(`${Z}: %o`,G)}),Ce())};F.onConnection(f)}let B="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker")&&(B=f)}catch(f){e("view parse error: %o",f)}let U=gs({config:cl(),view:B}),ne=fs(U);ne.start();let ce=async(f,m)=>{try{return await j(f,m)}catch{return[]}};n&&bo(n,U,ne);let H=document.getElementById("workspace-picker");H&&So(H,U,L,K,N);let at=wo(t,(f,m)=>j(f,m));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>at.open())}catch{}let wt=go(t,{policyStore:Te,transport:(f,m)=>j(f,m),labelOptions:()=>{let f=new Set;for(let[m]of An)for(let Z of J.snapshotFor(m)||[]){let G=Z.labels;if(Array.isArray(G))for(let te of G)typeof te=="string"&&te.length>0&&f.add(te)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>wt.open())}catch{}let vt=xs(s,{gotoIssue:f=>ne.gotoIssue(f),issueStores:J,transport:ce,uiOrderStore:Ue,displayPolicyStore:Te,closedRange:se,onClosedRangeChange:f=>{me(f)},onNewIssue:()=>at.open()}),Ar=xn(o,{transport:ce,issueStores:J,queueStore:Re,sessionLogStore:Le,uiOrderStore:Ue,gotoIssue:f=>U.setState({selected_id:f})}),rt=fo(i,{issueStores:J,transport:ce,queueStore:Re,sessionLogStore:Le,getWorkspacePath:()=>U.getState().workspace.current?.path,onNavigate:f=>{U.getState().view==="worker"?U.setState({selected_id:f}):ne.gotoIssue(f)},onClose:()=>{let f=U.getState();U.setState({selected_id:null});try{ne.gotoView(f.view==="worker"?"worker":"board")}catch{}}}),Mt=U.getState().selected_id;Mt&&(i.hidden=!1,rt.load(Mt),V(Mt)),U.subscribe(f=>{let m=f.selected_id;m?(i.hidden=!1,rt.load(m),Ve||V(m)):(rt.clear(),i.hidden=!0,$())});let rr=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",ge(f.view==="board"),Ee(f.view==="worker"),!f.selected_id&&f.view==="board"&&vt.load(),f.view==="worker"&&Ar.load(),window.localStorage.setItem("beads-ui.view",f.view)};U.subscribe(rr),rr(U.getState()),Ge(),ye(),T().finally(()=>{he=!0,pe()}),window.addEventListener("keydown",f=>{let m=f.ctrlKey||f.metaKey,Z=String(f.key||"").toLowerCase(),G=f.target,te=G&&G.tagName?String(G.tagName).toLowerCase():"",ke=te==="input"||te==="textarea"||te==="select"||G&&typeof G.isContentEditable=="boolean"&&G.isContentEditable;m&&Z==="n"&&(ke||(f.preventDefault(),at.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&ul(e)});export{ul as bootstrap,cl as readBootstrapConfig,dl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
