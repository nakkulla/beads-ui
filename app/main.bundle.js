var Eo=Object.create;var Ar=Object.defineProperty;var Co=Object.getOwnPropertyDescriptor;var Ro=Object.getOwnPropertyNames;var Io=Object.getPrototypeOf,Lo=Object.prototype.hasOwnProperty;var Do=(t,e,r)=>e in t?Ar(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Tr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Oo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ro(e))!Lo.call(t,s)&&s!==r&&Ar(t,s,{get:()=>e[s],enumerable:!(n=Co(e,s))||n.enumerable});return t};var Mo=(t,e,r)=>(r=t!=null?Eo(Io(t)):{},Oo(e||!t||!t.__esModule?Ar(r,"default",{value:t,enumerable:!0}):r,t));var ue=(t,e,r)=>Do(t,typeof e!="symbol"?e+"":e,r);var qn=Tr((pl,Un)=>{var At=1e3,Tt=At*60,Et=Tt*60,mt=Et*24,zo=mt*7,Uo=mt*365.25;Un.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return qo(t);if(r==="number"&&isFinite(t))return e.long?Wo(t):Ho(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function qo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Uo;case"weeks":case"week":case"w":return r*zo;case"days":case"day":case"d":return r*mt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Et;case"minutes":case"minute":case"mins":case"min":case"m":return r*Tt;case"seconds":case"second":case"secs":case"sec":case"s":return r*At;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ho(t){var e=Math.abs(t);return e>=mt?Math.round(t/mt)+"d":e>=Et?Math.round(t/Et)+"h":e>=Tt?Math.round(t/Tt)+"m":e>=At?Math.round(t/At)+"s":t+"ms"}function Wo(t){var e=Math.abs(t);return e>=mt?sr(t,e,mt,"day"):e>=Et?sr(t,e,Et,"hour"):e>=Tt?sr(t,e,Tt,"minute"):e>=At?sr(t,e,At,"second"):t+" ms"}function sr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Wn=Tr((fl,Hn)=>{function Go(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=qn(),r.destroy=c,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let f=0;for(let _=0;_<u.length;_++)f=(f<<5)-f+u.charCodeAt(_),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=e;function r(u){let f,_=null,w,k;function A(...D){if(!A.enabled)return;let P=A,z=Number(new Date),j=z-(f||z);P.diff=j,P.prev=f,P.curr=z,f=z,D[0]=r.coerce(D[0]),typeof D[0]!="string"&&D.unshift("%O");let C=0;D[0]=D[0].replace(/%([a-zA-Z%])/g,(b,E)=>{if(b==="%%")return"%";C++;let I=r.formatters[E];if(typeof I=="function"){let H=D[C];b=I.call(P,H),D.splice(C,1),C--}return b}),r.formatArgs.call(P,D),(P.log||r.log).apply(P,D)}return A.namespace=u,A.useColors=r.useColors(),A.color=r.selectColor(u),A.extend=n,A.destroy=r.destroy,Object.defineProperty(A,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(w!==r.namespaces&&(w=r.namespaces,k=r.enabled(u)),k),set:D=>{_=D}}),typeof r.init=="function"&&r.init(A),A}function n(u,f){let _=r(this.namespace+(typeof f>"u"?":":f)+u);return _.log=this.log,_}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let f=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of f)_[0]==="-"?r.skips.push(_.slice(1)):r.names.push(_)}function o(u,f){let _=0,w=0,k=-1,A=0;for(;_<u.length;)if(w<f.length&&(f[w]===u[_]||f[w]==="*"))f[w]==="*"?(k=w,A=_,w++):(_++,w++);else if(k!==-1)w=k+1,A++,_=A;else return!1;for(;w<f.length&&f[w]==="*";)w++;return w===f.length}function i(){let u=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),u}function l(u){for(let f of r.skips)if(o(u,f))return!1;for(let f of r.names)if(o(u,f))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Hn.exports=Go});var Gn=Tr((Ge,or)=>{Ge.formatArgs=Yo;Ge.save=Vo;Ge.load=Zo;Ge.useColors=jo;Ge.storage=Ko();Ge.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ge.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function jo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Yo(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+or.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Ge.log=console.debug||console.log||(()=>{});function Vo(t){try{t?Ge.storage.setItem("debug",t):Ge.storage.removeItem("debug")}catch{}}function Zo(){let t;try{t=Ge.storage.getItem("debug")||Ge.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Ko(){try{return localStorage}catch{}}or.exports=Wn()(Ge);var{formatters:Xo}=or.exports;Xo.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Nt=globalThis,rr=Nt.trustedTypes,Tn=rr?rr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Dn="$lit$",lt=`lit$${Math.random().toFixed(9).slice(2)}$`,On="?"+lt,No=`<${On}>`,ht=document,Pt=()=>ht.createComment(""),Ft=t=>t===null||typeof t!="object"&&typeof t!="function",Or=Array.isArray,Po=t=>Or(t)||typeof t?.[Symbol.iterator]=="function",Er=`[ 	
\f\r]`,Mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,En=/-->/g,Cn=/>/g,pt=RegExp(`>|${Er}(?:([^\\s"'>=/]+)(${Er}*=${Er}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Rn=/'/g,In=/"/g,Mn=/^(?:script|style|textarea|title)$/i,Mr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),g=Mr(1),il=Mr(2),al=Mr(3),gt=Symbol.for("lit-noChange"),we=Symbol.for("lit-nothing"),Ln=new WeakMap,ft=ht.createTreeWalker(ht,129);function Nn(t,e){if(!Or(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Tn!==void 0?Tn.createHTML(e):e}var Fo=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Mt;for(let l=0;l<r;l++){let a=t[l],c,u,f=-1,_=0;for(;_<a.length&&(i.lastIndex=_,u=i.exec(a),u!==null);)_=i.lastIndex,i===Mt?u[1]==="!--"?i=En:u[1]!==void 0?i=Cn:u[2]!==void 0?(Mn.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=pt):u[3]!==void 0&&(i=pt):i===pt?u[0]===">"?(i=s??Mt,f=-1):u[1]===void 0?f=-2:(f=i.lastIndex-u[2].length,c=u[1],i=u[3]===void 0?pt:u[3]==='"'?In:Rn):i===In||i===Rn?i=pt:i===En||i===Cn?i=Mt:(i=pt,s=void 0);let w=i===pt&&t[l+1].startsWith("/>")?" ":"";o+=i===Mt?a+No:f>=0?(n.push(c),a.slice(0,f)+Dn+a.slice(f)+lt+w):a+lt+(f===-2?l:w)}return[Nn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Bt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,u]=Fo(e,r);if(this.el=t.createElement(c,n),ft.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=ft.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(Dn)){let _=u[i++],w=s.getAttribute(f).split(lt),k=/([.?@])?(.*)/.exec(_);a.push({type:1,index:o,name:k[2],strings:w,ctor:k[1]==="."?Rr:k[1]==="?"?Ir:k[1]==="@"?Lr:St}),s.removeAttribute(f)}else f.startsWith(lt)&&(a.push({type:6,index:o}),s.removeAttribute(f));if(Mn.test(s.tagName)){let f=s.textContent.split(lt),_=f.length-1;if(_>0){s.textContent=rr?rr.emptyScript:"";for(let w=0;w<_;w++)s.append(f[w],Pt()),ft.nextNode(),a.push({type:2,index:++o});s.append(f[_],Pt())}}}else if(s.nodeType===8)if(s.data===On)a.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(lt,f+1))!==-1;)a.push({type:7,index:o}),f+=lt.length-1}o++}}static createElement(e,r){let n=ht.createElement("template");return n.innerHTML=e,n}};function $t(t,e,r=t,n){if(e===gt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Ft(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=$t(t,s._$AS(t,e.values),s,n)),e}var Cr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??ht).importNode(r,!0);ft.currentNode=s;let o=ft.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new zt(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Dr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=ft.nextNode(),i++)}return ft.currentNode=ht,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},zt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=we,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=$t(this,e,r),Ft(e)?e===we||e==null||e===""?(this._$AH!==we&&this._$AR(),this._$AH=we):e!==this._$AH&&e!==gt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Po(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==we&&Ft(this._$AH)?this._$AA.nextSibling.data=e:this.T(ht.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Bt.createElement(Nn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Cr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=Ln.get(e.strings);return r===void 0&&Ln.set(e.strings,r=new Bt(e)),r}k(e){Or(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Pt()),this.O(Pt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},St=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=we,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=we}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=$t(this,e,r,0),i=!Ft(e)||e!==this._$AH&&e!==gt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=$t(this,l[n+a],r,a),c===gt&&(c=this._$AH[a]),i||(i=!Ft(c)||c!==this._$AH[a]),c===we?e=we:e!==we&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===we?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Rr=class extends St{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===we?void 0:e}},Ir=class extends St{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==we)}},Lr=class extends St{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=$t(this,e,r,0)??we)===gt)return;let n=this._$AH,s=e===we&&n!==we||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==we&&(n===we||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Dr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){$t(this,e)}};var Bo=Nt.litHtmlPolyfillSupport;Bo?.(Bt,zt),(Nt.litHtmlVersions??(Nt.litHtmlVersions=[])).push("3.3.1");var fe=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new zt(e.insertBefore(Pt(),o),o,void 0,r??{})}return s._$AI(t),s};var nr="today",Pn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Nr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Fn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Bn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function zn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var jn=Mo(Gn(),1);function ye(t){return(0,jn.default)(`beads-ui:${t}`)}function Xe(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Ut(t,e){let r=Xe(t.created_at),n=Xe(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Zn(t,e){let r=Xe(t.created_at),n=Xe(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Kn(t,e){let r=Xe(t.updated_at),n=Xe(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function Xn(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=Xe(t.created_at),o=Xe(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Qn(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var Qo=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Yn(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Vn(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=Qo.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Jn(t,e){let r=Yn(t),n=Yn(e);if(r!==n)return r<n?-1:1;let s=Vn(t),o=Vn(e);if(s!==o)return s<o?-1:1;let i=Xe(t&&t.created_at),l=Xe(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var Pr=2**20;function Ct(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-Xe(t&&t.created_at)}function ir(t){return(e,r)=>{let n=Ct(e,t),s=Ct(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Fr(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ct(l,r)-Pr};if(!l)return{rank:Ct(i,r)+Pr};let a=Ct(i,r),c=Ct(l,r),u=(a+c)/2;return a<u&&u<c?{rank:u}:{renormalize:n.map((f,_)=>({bead_id:f.id,rank:_*Pr}))}}function Br(t,e={}){let r=ye(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Ut;function c(){for(let _ of Array.from(i))try{_()}catch{}}function u(){s=Array.from(n.values()).sort(a)}function f(_){if(l||!_||_.id!==t)return;let w=Number(_.revision)||0;if(r("apply %s rev=%d",_.type,w),!(w<=o&&_.type!=="snapshot")){if(_.type==="snapshot"){if(w<=o)return;n.clear();let k=Array.isArray(_.issues)?_.issues:[];for(let A of k)A&&typeof A.id=="string"&&A.id.length>0&&n.set(A.id,A);u(),o=w,c();return}if(_.type==="upsert"){let k=_.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let A=n.get(k.id);if(!A)n.set(k.id,k);else{let D=Number.isFinite(A.updated_at)?A.updated_at:0,P=Number.isFinite(k.updated_at)?k.updated_at:0;if(D<=P){for(let z of Object.keys(A))z in k||delete A[z];for(let[z,j]of Object.entries(k))A[z]=j}}u()}o=w,c()}else if(_.type==="delete"){let k=String(_.issue_id||"");k&&(n.delete(k),u()),o=w,c()}}}return{id:t,subscribe(_){return i.add(_),()=>{i.delete(_)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(_){return n.get(_)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function ar(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function es(t){let e=ye("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let u=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let w of Array.from(c)){let k=r.get(w);if(!k)continue;let A=k.itemsById;for(let D of u)typeof D=="string"&&D.length>0&&A.set(D,!0);for(let D of f)typeof D=="string"&&D.length>0&&A.set(D,!0);for(let D of _)typeof D=="string"&&D.length>0&&A.delete(D)}}async function o(l,a){let c=ar(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let f=r.get(l);if(f&&f.key!==c){let _=n.get(f.key);_&&(_.delete(l),_.size===0&&n.delete(f.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let u=n.get(c);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let _=r.get(l)||null;if(_){let w=n.get(_.key);w&&(w.delete(l),w.size===0&&n.delete(_.key))}throw r.delete(l),f}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let f=r.get(l)||null;if(f){let _=n.get(f.key);_&&(_.delete(l),_.size===0&&n.delete(f.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ar,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let u of a.itemsById.keys())c[u]=!0;return c}}}}function ts(){let t=ye("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,u){let f=c?ar(c):"",_=r.get(a)||"",w=e.has(a);if(t("register %s key=%s (prev=%s)",a,f,_),w&&_&&f&&_!==f){let k=e.get(a);if(k)try{k.dispose()}catch{}let A=s.get(a);if(A){try{A()}catch{}s.delete(a)}let D=Br(a,u);e.set(a,D);let P=D.subscribe(()=>o());s.set(a,P)}else if(!w){let k=Br(a,u);e.set(a,k);let A=k.subscribe(()=>o());s.set(a,A)}return r.set(a,f),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let u=s.get(a);if(u){try{u()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function rs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ns(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function zr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function Jo(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ei(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function ss(t){let e=ye("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Jo(n),i=ei(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=zr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?zr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ti=Object.freeze({workspace_config:{default_workspace:null}});function os(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:ti.workspace_config.default_workspace}}}function is(t={}){let e=ye("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:os(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?os(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,u)=>c!==r.workspace.hidden[u]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,u)=>c===r.worker.show_closed_children[u])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function as(t){let e=ye("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(f,_)=>{let w=s++,k=Date.now();n.set(w,{type:f,start_ts:k}),e("request start id=%d type=%s count=%d",w,f,r+1),i();let A=!1,D=()=>{A||(A=!0,n.delete(w),l())},P=setTimeout(()=>{A||(e("request TIMEOUT id=%d type=%s elapsed=%dms",w,f,Date.now()-k),D())},3e4);try{let z=await c(f,_),j=Date.now()-k;return e("request done id=%d type=%s elapsed=%dms",w,f,j),z}catch(z){let j=Date.now()-k;throw e("request error id=%d type=%s elapsed=%dms err=%o",w,f,j,z),z}finally{clearTimeout(P),D()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([u,f])=>({id:u,type:f.type,elapsed_ms:c-f.start_ts}))}}}function ce(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function lr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Qn),a;switch(l){case"created_desc":return a.sort(Ut),a;case"created_asc":return a.sort(Zn),a;case"updated_desc":return a.sort(Kn),a;case"priority":return a.sort(Xn),a;case"manual":default:{let c=r();return c?a.sort(ir(c)):a.sort(Ut),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function cr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},u=n(Fr(l,a,c.order),i);s(c,u);let f=await e("ui-order-set",{expected_revision:c.revision,entries:u});if(f&&f.conflict){let _={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(_);let w=n(Fr(l,a,_.order),i);s(_,w);let k=await e("ui-order-set",{expected_revision:_.revision,entries:w});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function dr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Ur(t,e){return!e||typeof t!="string"||t.length===0||dr(e.visible_labels).includes(t)?!0:dr(e.hidden_labels).includes(t)?!1:!dr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function ls(t,e){return dr(t).filter(r=>Ur(r,e))}function bt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function qr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Rt(t){let e=qr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Hr(t,e){let r=qr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var ri={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},ni={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},si={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},oi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function ii(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function ai(t,e,r){let n=ri[t]||t,s=e&&e.state||"empty",o=oi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return g`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${ni[t]||t}
      </div>
    </div>
  `}function cs(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=si[r],s=t.stages,o=ii(n,s,String(e||"open"));return g`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>ai(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function li(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var ds=2;function ci(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(g`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,ds).join(", "),s=r.length-ds,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(g`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function di(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&bt(r,"route")){let o=n.route_source==="derived";s.push(g`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&bt(r,"fast_track")&&s.push(g`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&bt(r,"pr")){let o=n.pr.number;s.push(g`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of ls(t.labels,r))s.push(g`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&bt(r,"from")&&s.push(g`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),bt(r,"blocked")&&s.push(...ci(t.blocked_info)),s.length===0?"":g`<div class="board-card__chips">${s}</div>`}function ui(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function pi(t){let e=Hr(t.created_at),r=Hr(t.updated_at);return!e&&!r?"":g`<span class="board-card__times">
    ${e?g`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Rt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?g`<span class="board-card__time-sep">·</span>`:""}
    ${r?g`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Rt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function fi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(Jn):r.children;return g`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?g`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:g`<span class="board-card__roll-none">children 없음</span>`}
        ${pi(t)}
      </div>
      ${n>0&&r.current?g`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?g`<div class="board-card__roll-list">
            ${o.map((i,l)=>g`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${ui(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function us(t,e){let r=li(t.priority);return g`
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
        ${r?g`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${di(t,e)}
      ${t.workflow&&bt(e.policy||null,"stepper")?cs(t.workflow,t.status):""}
      ${fi(t,e)}
    </article>
  `}function _t(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return g`
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
        ${n?g`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${Pn.map(o=>g`<option
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
        ${t.items.map(o=>us(o,e))}
      </div>
    </section>
  `}var hi=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],gi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],mi=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function bi(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return g`
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
      ${r.label_menu_open?g`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?g`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>g`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?g`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ps(t,e,r){return g`
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
        ${hi.map(n=>g`<option
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
        ${gi.map(n=>g`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${bi(t,e,r)}
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
        ${mi.map(n=>g`<option
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
  `}var _i=200,yi={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},ki=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),fs="beads-ui.board.sort",hs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function wi(){try{let t=window.localStorage.getItem(fs);if(t&&hs.has(t))return t}catch{}return"created_desc"}function gs(t,e){let r=ye("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,u=e.closedRange||nr,f=s?lr(s,i):null,_=cr({transport:o,uiOrderStore:i}),w=[],k=[],A=[],D=[],P=[],z=[],j=!1,C=0,y=wi(),b=new Map,E=new Map,I=new Map,H=new Set,Z={search:"",priority:"",type:"",labels:[]},K=!1,X=null;function Ie($){return String($.status||"open")==="open"}function qe($){let R=String($.status||"open");return R==="open"||R==="blocked"}function me($){let R=Z.search.trim().toLowerCase(),N=Z.priority,h=Z.type,x=Z.labels;return $.filter(S=>{if(R){let M=String(S.id||"").toLowerCase(),re=String(S.title||"").toLowerCase();if(!M.includes(R)&&!re.includes(R))return!1}if(N!==""&&String(S.priority)!==N||h!==""&&String(S.issue_type||"")!==h)return!1;if(x.length>0){let M=Array.isArray(S.labels)?S.labels:[];if(!x.some(re=>M.includes(re)))return!1}return!0})}function je(){let $=new Set;for(let R of[w,k,A,D,P,z])for(let N of R){let h=Array.isArray(N.labels)?N.labels:[];for(let x of h)typeof x=="string"&&x.length>0&&$.add(x)}return Array.from($).sort()}function ke(){return Z.search.trim()!==""||Z.priority!==""||Z.type!==""||Z.labels.length>0}function be(){try{if(f){let $=f.selectBoardColumn("tab:board:in-progress","in_progress",y),R=f.selectBoardColumn("tab:board:blocked","blocked",y).filter(qe),N=new Set($.map(V=>V.id)),h=f.selectBoardColumn("tab:board:ready","ready",y).filter(V=>Ie(V)&&!N.has(V.id)),x=f.selectBoardColumn("tab:board:resolved","resolved",y),S=f.selectBoardColumn("tab:board:deferred","deferred",y),M=j?S:[],re=f.selectBoardColumn("tab:board:closed","closed").slice(0,_i),W=[...R,...h,...$,...x,...M,...re];Ye(W);let Q=new Set;for(let V of W)V&&V.id&&!Wr(V)&&Q.add(V.id);let le=!ke();w=le?It(R,Q):R,k=le?It(h,Q):h,A=le?It($,Q):$,D=le?It(x,Q):x,P=le?It(M,Q):M,C=S.length,z=le?It(re,Q):re,b=new Map;for(let V of w)b.set(V.id,"open");for(let V of k)b.set(V.id,"open");for(let V of A)b.set(V.id,"in_progress");for(let V of D)b.set(V.id,"resolved");for(let V of P)b.set(V.id,"deferred");for(let V of z)b.set(V.id,"closed");E=new Map;for(let V of w)E.set(V.id,"blocked-col");for(let V of k)E.set(V.id,"ready-col");for(let V of A)E.set(V.id,"in-progress-col");for(let V of D)E.set(V.id,"resolved-col");for(let V of P)E.set(V.id,"deferred-col");for(let V of z)E.set(V.id,"closed-col")}xe()}catch{w=[],k=[],A=[],D=[],P=[],z=[],I=new Map,xe()}}function Ye($){let R=new Map;for(let h of $)h&&h.id&&!R.has(h.id)&&R.set(h.id,h);let N=new Map;for(let h of R.values()){let x=Wr(h);if(!x)continue;let S=N.get(x);S||(S=[],N.set(x,S)),S.push({id:h.id,title:h.title,status:h.status,metadata:h.metadata,created_at:h.created_at})}I=N}function Ve($){let R=I.get($)||[],N=0,h=null;for(let x of R)(x.status==="resolved"||x.status==="closed")&&(N+=1),!h&&x.status==="in_progress"&&(h=x);return{total:R.length,count:N,current:h,children:R}}function de($){return!H.has($)}function Ze($,R){$.preventDefault(),$.stopPropagation(),H.has(R)?H.delete(R):H.add(R),xe()}function v($,R){$.preventDefault(),$.stopPropagation(),n(R)}function B($,R){$.preventDefault(),$.stopPropagation(),n(R)}function L($,R){X||n(R)}function G($,R){$.preventDefault(),$.stopPropagation(),vi(R).then(N=>{N&&ce("\uBCF5\uC0AC\uB428","success",1200)})}function ne($,R){X=R,$.dataTransfer&&($.dataTransfer.setData("text/plain",R),$.dataTransfer.effectAllowed="move"),$.target.classList.add("board-card--dragging")}function J($){$.target.classList.remove("board-card--dragging"),Ae(),setTimeout(()=>{X=null},0)}function ae($){let R=String($.target.value||"");!R||R===u||(u=R,a&&a(R),xe())}let oe={onCardClick:L,onCopyId:G,onDragStart:ne,onDragEnd:J,onClosedRangeChange:ae,rollupFor:Ve,isExpanded:de,onRollupToggle:Ze,onChildClick:v,onFromChipClick:B,get policy(){return l?l.get():null}};function pe($){let R=$.target,N=t.querySelector(".board-filter__labels");R&&N&&N.contains(R)||Oe()}function ve($){$.key==="Escape"&&Oe()}function Ee(){K||(K=!0,document.addEventListener("mousedown",pe),document.addEventListener("keydown",ve),xe())}function Oe(){K&&(K=!1,document.removeEventListener("mousedown",pe),document.removeEventListener("keydown",ve),xe())}let Se={onSearchInput($){Z.search=String($.target.value||""),be()},onPriorityChange($){Z.priority=String($.target.value||""),be()},onTypeChange($){Z.type=String($.target.value||""),be()},onSortChange($){let R=String($.target.value||"");if(!(!hs.has(R)||R===y)){y=R;try{window.localStorage.setItem(fs,R)}catch{}be()}},onDeferredToggle(){j=!j,be()},onLabelMenuToggle(){K?Oe():Ee()},onLabelToggle($){let R=Z.labels.indexOf($);R===-1?Z.labels.push($):Z.labels.splice(R,1),be()},onLabelClear(){Z.labels.length!==0&&(Z.labels=[],be())},onNewIssue(){c&&c()}};function Le(){let $=j?"board-root board-root--deferred":"board-root";return g`
      <div class="board-view">
        ${ps(Z,Se,{sort_mode:y,show_deferred:j,deferred_count:C,label_options:je(),label_menu_open:K})}
        <div class=${$}>
          ${_t({title:"Blocked",id:"blocked-col",items:me(w)},oe)}
          ${_t({title:"Ready",id:"ready-col",items:me(k)},oe)}
          ${_t({title:"In progress",id:"in-progress-col",items:me(A)},oe)}
          ${_t({title:"Resolved",id:"resolved-col",items:me(D)},oe)}
          ${j?_t({title:"Deferred",id:"deferred-col",items:me(P)},oe):""}
          ${_t({title:"Closed",id:"closed-col",items:me(z),is_closed:!0,closed_range:u},oe)}
        </div>
      </div>
    `}function xe(){fe(Le(),t),Ce()}function Ce(){try{let $=Array.from(t.querySelectorAll(".board-column"));for(let R of $)Array.from(R.querySelectorAll(".board-card")).forEach((h,x)=>{h.tabIndex=x===0?0:-1})}catch{}}async function Me($,R){if(!o){ce("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:$,status:R}),ce("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(N){r("update-status failed: %o",N),ce("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function O($){switch($){case"blocked-col":return w;case"ready-col":return k;case"in-progress-col":return A;case"resolved-col":return D;case"deferred-col":return P;default:return[]}}function Te($,R,N){if(!o||!i)return;let h=O($),x=h.find(Q=>Q.id===R);if(!x)return;let S=h.filter(Q=>Q.id!==R),M=N.closest?N.closest(".board-card"):null,re=S.length;if(M){let Q=M.getAttribute("data-issue-id");if(Q===R)return;let le=S.findIndex(V=>V.id===Q);le>=0&&(re=le)}let W=S.slice();W.splice(re,0,x),_.applyReorder(R,W,re)}function Ae(){for(let $ of Array.from(t.querySelectorAll(".board-column--drag-over")))$.classList.remove("board-column--drag-over")}let he=null;t.addEventListener("dragover",$=>{$.preventDefault(),$.dataTransfer&&($.dataTransfer.dropEffect="move");let N=$.target.closest(".board-column");N&&N!==he&&(he&&he.classList.remove("board-column--drag-over"),N.classList.add("board-column--drag-over"),he=N)}),t.addEventListener("dragleave",$=>{let R=$.relatedTarget;(!R||!t.contains(R))&&he&&(he.classList.remove("board-column--drag-over"),he=null)}),t.addEventListener("drop",$=>{$.preventDefault(),he&&(he.classList.remove("board-column--drag-over"),he=null);let R=$.target,N=R.closest(".board-column");if(!N)return;let h=$.dataTransfer?.getData("text/plain")||"";if(!h)return;let x=N.id,S=E.get(h);if(S&&S===x){if(ki.has(x)){if(y!=="manual"){ce("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Te(x,h,R)}return}let M=yi[x];if(!M){ce("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}b.get(h)!==M&&Me(h,M)}),t.addEventListener("keydown",$=>{let R=$.target;if(!(R instanceof HTMLElement))return;let N=String(R.tagName||"").toLowerCase();if(N==="input"||N==="textarea"||N==="select"||N==="button"||N==="a"||R.isContentEditable===!0)return;let h=R.closest(".board-card");if(!h)return;let x=String($.key||"");if(x==="Enter"||x===" "){$.preventDefault();let W=h.getAttribute("data-issue-id");W&&n(W);return}if(x!=="ArrowUp"&&x!=="ArrowDown"&&x!=="ArrowLeft"&&x!=="ArrowRight")return;$.preventDefault();let S=h.closest(".board-column");if(!S)return;let M=Array.from(S.querySelectorAll(".board-card")),re=M.indexOf(h);if(x==="ArrowDown"&&re<M.length-1){He(h,M[re+1]);return}if(x==="ArrowUp"&&re>0){He(h,M[re-1]);return}if(x==="ArrowLeft"||x==="ArrowRight"){let W=Array.from(t.querySelectorAll(".board-column")),Q=W.indexOf(S),le=x==="ArrowRight"?1:-1,V=Q+le;for(;V>=0&&V<W.length;){let at=W[V].querySelector(".board-card");if(at){He(h,at);return}V+=le}}});function He($,R){try{$.tabIndex=-1,R.tabIndex=0,R.focus()}catch{}}let Ne=null;f&&f.subscribe&&(Ne=f.subscribe(()=>{try{be()}catch{}}));let Pe=null;return l&&l.subscribe&&(Pe=l.subscribe(()=>{try{be()}catch{}})),{async load(){r("load"),be()},clear(){Oe(),Ne&&(Ne(),Ne=null),Pe&&(Pe(),Pe=null),t.replaceChildren(),w=[],k=[],A=[],D=[],P=[],z=[],b=new Map,E=new Map}}}function Wr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function It(t,e){return t.filter(r=>{let n=Wr(r);return!(n&&e.has(n))})}async function vi(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function ms(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var xi={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},$i=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Si=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ct(t){return!!t&&typeof t=="object"}function Gr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function bs(t,e){let r=Gr(t),n=Gr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Ai(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ct(s)&&typeof s.text=="string"?s.text:"").join(""):ct(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Ti(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:xi[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Gr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=bs(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=bs(ct(l)?l.old_string:"",ct(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function _s(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=$i.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Si.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ei(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ct(o)){if(o.type==="text"&&typeof o.text=="string")s.push(_s(o.text));else if(o.type==="tool_use"){let i=Ti(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ct(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Ai(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Ci(t){if(t.type==="item.completed"&&ct(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[_s(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Ri(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function ys(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ct(o))continue;let i=Ri(o)?Ci(o):Ei(o,r);for(let l of i)e.push(l)}return e}function ur(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function u(){if(!o||!n)return[];let y=n.get(o);return ys(y?y.lines:[])}function f(y,b){if(b.kind==="gate")return g`<div class="sv__gate">${b.text}</div>`;if(b.kind==="phase")return g`<div class="sv__phase">${b.text}</div>`;if(b.kind==="result")return g`<div
        class="sv__result${b.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${b.success?"\u2713":"\u2717"}
        ${b.text||(b.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(b.kind==="error")return g`<div class="sv__error">⛔ ${b.text}</div>`;if(b.kind==="blocker")return g`<div class="sv__error">⛔ ${b.text}</div>`;if(b.kind==="tool"){let E=a.has(y),I=b.tool==="Bash"?b.command:b.path||b.command||"";return g`<div
        class="sv__tool${E?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>D(y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${b.icon}</span>
          <span class="sv__tool-name">${b.tool}</span>
          ${I?g`<span class="sv__tool-detail">${I}</span>`:""}
          ${typeof b.added=="number"?g`<span class="sv__diff-add">+${b.added}</span>`:""}
          ${typeof b.removed=="number"?g`<span class="sv__diff-del">−${b.removed}</span>`:""}
          ${b.result?g`<span class="sv__tool-ok">→ ${b.result}</span>`:""}
        </span>
        ${E?g`<pre class="sv__tool-expand">${_(b)}</pre>`:""}
      </div>`}return g`<div class="sv__as">${b.text}</div>`}function _(y){let b=[];if(y.input!==void 0)try{b.push(`input: ${JSON.stringify(y.input,null,2)}`)}catch{}return typeof y.output=="string"&&y.output.length>0&&b.push(`output:
${y.output}`),b.join(`

`)}function w(){if(!o)return g``;let y=u(),b=[i.runner,i.model,i.effort,i.worktree].filter(Boolean).join(" \xB7 ");return g`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${b?g`<span class="sv__meta">${b}</span>`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          @click=${P}
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
        ${y.length===0?g`<div class="sv__empty">세션 로그 없음</div>`:y.map((E,I)=>f(I,E))}
      </div>
    </div>`}function k(){fe(w(),t),l&&A()}function A(){let y=t.querySelector(".sv__body");y&&(y.scrollTop=y.scrollHeight)}function D(y){a.has(y)?a.delete(y):a.add(y),k()}function P(){l=!l,k()}function z(y){let b=y.target;if(!b||!b.classList||!b.classList.contains("sv__body"))return;!(b.scrollHeight-b.scrollTop-b.clientHeight<=4)&&l&&(l=!1,k())}t.addEventListener("scroll",z,!0);function j(y){let b=y&&y.attempt_id;b&&(o=b,i=y.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(k)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),k())}function C(){let y=o;o=null,a.clear(),r&&y&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${y}`})).catch(()=>{}),fe(g``,t),s&&s()}return{open:j,close:C,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",z,!0),o=null,fe(g``,t)}}}function Ii(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function ks(t,e){let r=Ii(t);return g`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?g`<div class="detail-empty">산출물 없음</div>`:g`
          ${r.map(n=>g`<div class="detail-art">
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
  `}var Li=["claude","codex","ccx"],ws={claude:["opus","sonnet","haiku","fable"],codex:["gpt-5.6","gpt-5.4"],ccx:["opus","sonnet","haiku","fable"]},Di=["low","medium","high","xhigh"],Oi=["codex","opus","fable","self","skip"],Mi=["opus","fable","sonnet","haiku"],Ni=["standard","fast_track"];function Pi(t){return ws[String(t||"claude")]||ws.claude}function Lt(t,e,r,n,s,o){return g`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>g`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function Dt(t,e=!0){let r=t.map(n=>({value:n,label:n}));return e?[{value:"",label:"(\uAE30\uBCF8)"},...r]:r}function vs(t,e){let r=t&&t.metadata||{},n=r.worker_runner||"",s=r.workflow_mode==="fast_track"?"fast_track":"standard";return g`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Lt("worker_runner","worker_runner",Dt(Li),n,!!n,e)}
    ${Lt("orchestration_model","orchestration_model",Dt(Pi(n)),r.orchestration_model||"",!1,e)}
    ${Lt("orchestration_effort","orchestration_effort",Dt(Di),r.orchestration_effort||"",!1,e)}
    ${Lt("review_model","review_model",Dt(Oi),r.review_model||"",!1,e)}
    ${Lt("impl_model","impl_model",Dt(Mi),r.impl_model||"",!1,e)}
    ${Lt("workflow_mode","workflow_mode",Dt(Ni,!1),s,r.workflow_mode==="fast_track",e)}
  `}var{entries:Is,setPrototypeOf:xs,isFrozen:Fi,getPrototypeOf:Bi,getOwnPropertyDescriptor:zi}=Object,{freeze:Be,seal:Ke,create:Qr}=Object,{apply:Jr,construct:en}=typeof Reflect<"u"&&Reflect;Be||(Be=function(e){return e});Ke||(Ke=function(e){return e});Jr||(Jr=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});en||(en=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var pr=ze(Array.prototype.forEach),Ui=ze(Array.prototype.lastIndexOf),$s=ze(Array.prototype.pop),qt=ze(Array.prototype.push),qi=ze(Array.prototype.splice),hr=ze(String.prototype.toLowerCase),jr=ze(String.prototype.toString),Yr=ze(String.prototype.match),Ht=ze(String.prototype.replace),Hi=ze(String.prototype.indexOf),Wi=ze(String.prototype.trim),Qe=ze(Object.prototype.hasOwnProperty),Fe=ze(RegExp.prototype.test),Wt=Gi(TypeError);function ze(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Jr(t,e,n)}}function Gi(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return en(t,r)}}function te(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:hr;xs&&xs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Fi(e)||(e[n]=o),s=o)}t[s]=!0}return t}function ji(t){for(let e=0;e<t.length;e++)Qe(t,e)||(t[e]=null);return t}function ot(t){let e=Qr(null);for(let[r,n]of Is(t))Qe(t,r)&&(Array.isArray(n)?e[r]=ji(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=ot(n):e[r]=n);return e}function Gt(t,e){for(;t!==null;){let n=zi(t,e);if(n){if(n.get)return ze(n.get);if(typeof n.value=="function")return ze(n.value)}t=Bi(t)}function r(){return null}return r}var Ss=Be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Vr=Be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Zr=Be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Yi=Be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Kr=Be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Vi=Be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),As=Be(["#text"]),Ts=Be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Xr=Be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Es=Be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),fr=Be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Zi=Ke(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ki=Ke(/<%[\w\W]*|[\w\W]*%>/gm),Xi=Ke(/\$\{[\w\W]*/gm),Qi=Ke(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ji=Ke(/^aria-[\-\w]+$/),Ls=Ke(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ea=Ke(/^(?:\w+script|data):/i),ta=Ke(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ds=Ke(/^html$/i),ra=Ke(/^[a-z][.\w]*(-[.\w]+)+$/i),Cs=Object.freeze({__proto__:null,ARIA_ATTR:Ji,ATTR_WHITESPACE:ta,CUSTOM_ELEMENT:ra,DATA_ATTR:Qi,DOCTYPE_NAME:Ds,ERB_EXPR:Ki,IS_ALLOWED_URI:Ls,IS_SCRIPT_OR_DATA:ea,MUSTACHE_EXPR:Zi,TMPLIT_EXPR:Xi}),jt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},na=function(){return typeof window>"u"?null:window},sa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Rs=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Os(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:na(),e=U=>Os(U);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==jt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:f,DOMParser:_,trustedTypes:w}=t,k=a.prototype,A=Gt(k,"cloneNode"),D=Gt(k,"remove"),P=Gt(k,"nextSibling"),z=Gt(k,"childNodes"),j=Gt(k,"parentNode");if(typeof i=="function"){let U=r.createElement("template");U.content&&U.content.ownerDocument&&(r=U.content.ownerDocument)}let C,y="",{implementation:b,createNodeIterator:E,createDocumentFragment:I,getElementsByTagName:H}=r,{importNode:Z}=n,K=Rs();e.isSupported=typeof Is=="function"&&typeof j=="function"&&b&&b.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:X,ERB_EXPR:Ie,TMPLIT_EXPR:qe,DATA_ATTR:me,ARIA_ATTR:je,IS_SCRIPT_OR_DATA:ke,ATTR_WHITESPACE:be,CUSTOM_ELEMENT:Ye}=Cs,{IS_ALLOWED_URI:Ve}=Cs,de=null,Ze=te({},[...Ss,...Vr,...Zr,...Kr,...As]),v=null,B=te({},[...Ts,...Xr,...Es,...fr]),L=Object.seal(Qr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),G=null,ne=null,J=Object.seal(Qr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ae=!0,oe=!0,pe=!1,ve=!0,Ee=!1,Oe=!0,Se=!1,Le=!1,xe=!1,Ce=!1,Me=!1,O=!1,Te=!0,Ae=!1,he="user-content-",He=!0,Ne=!1,Pe={},$=null,R=te({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),N=null,h=te({},["audio","video","img","source","image","track"]),x=null,S=te({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),M="http://www.w3.org/1998/Math/MathML",re="http://www.w3.org/2000/svg",W="http://www.w3.org/1999/xhtml",Q=W,le=!1,V=null,at=te({},[M,re,W],jr),wt=te({},["mi","mo","mn","ms","mtext"]),vt=te({},["annotation-xml"]),xr=te({},["title","style","font","a","script"]),rt=null,Ot=["application/xhtml+xml","text/html"],er="text/html",p=null,m=null,Y=r.createElement("form"),q=function(d){return d instanceof RegExp||d instanceof Function},ee=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(m&&m===d)){if((!d||typeof d!="object")&&(d={}),d=ot(d),rt=Ot.indexOf(d.PARSER_MEDIA_TYPE)===-1?er:d.PARSER_MEDIA_TYPE,p=rt==="application/xhtml+xml"?jr:hr,de=Qe(d,"ALLOWED_TAGS")?te({},d.ALLOWED_TAGS,p):Ze,v=Qe(d,"ALLOWED_ATTR")?te({},d.ALLOWED_ATTR,p):B,V=Qe(d,"ALLOWED_NAMESPACES")?te({},d.ALLOWED_NAMESPACES,jr):at,x=Qe(d,"ADD_URI_SAFE_ATTR")?te(ot(S),d.ADD_URI_SAFE_ATTR,p):S,N=Qe(d,"ADD_DATA_URI_TAGS")?te(ot(h),d.ADD_DATA_URI_TAGS,p):h,$=Qe(d,"FORBID_CONTENTS")?te({},d.FORBID_CONTENTS,p):R,G=Qe(d,"FORBID_TAGS")?te({},d.FORBID_TAGS,p):ot({}),ne=Qe(d,"FORBID_ATTR")?te({},d.FORBID_ATTR,p):ot({}),Pe=Qe(d,"USE_PROFILES")?d.USE_PROFILES:!1,ae=d.ALLOW_ARIA_ATTR!==!1,oe=d.ALLOW_DATA_ATTR!==!1,pe=d.ALLOW_UNKNOWN_PROTOCOLS||!1,ve=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=d.SAFE_FOR_TEMPLATES||!1,Oe=d.SAFE_FOR_XML!==!1,Se=d.WHOLE_DOCUMENT||!1,Ce=d.RETURN_DOM||!1,Me=d.RETURN_DOM_FRAGMENT||!1,O=d.RETURN_TRUSTED_TYPE||!1,xe=d.FORCE_BODY||!1,Te=d.SANITIZE_DOM!==!1,Ae=d.SANITIZE_NAMED_PROPS||!1,He=d.KEEP_CONTENT!==!1,Ne=d.IN_PLACE||!1,Ve=d.ALLOWED_URI_REGEXP||Ls,Q=d.NAMESPACE||W,wt=d.MATHML_TEXT_INTEGRATION_POINTS||wt,vt=d.HTML_INTEGRATION_POINTS||vt,L=d.CUSTOM_ELEMENT_HANDLING||{},d.CUSTOM_ELEMENT_HANDLING&&q(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(L.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&q(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(L.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(L.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ee&&(oe=!1),Me&&(Ce=!0),Pe&&(de=te({},As),v=[],Pe.html===!0&&(te(de,Ss),te(v,Ts)),Pe.svg===!0&&(te(de,Vr),te(v,Xr),te(v,fr)),Pe.svgFilters===!0&&(te(de,Zr),te(v,Xr),te(v,fr)),Pe.mathMl===!0&&(te(de,Kr),te(v,Es),te(v,fr))),d.ADD_TAGS&&(typeof d.ADD_TAGS=="function"?J.tagCheck=d.ADD_TAGS:(de===Ze&&(de=ot(de)),te(de,d.ADD_TAGS,p))),d.ADD_ATTR&&(typeof d.ADD_ATTR=="function"?J.attributeCheck=d.ADD_ATTR:(v===B&&(v=ot(v)),te(v,d.ADD_ATTR,p))),d.ADD_URI_SAFE_ATTR&&te(x,d.ADD_URI_SAFE_ATTR,p),d.FORBID_CONTENTS&&($===R&&($=ot($)),te($,d.FORBID_CONTENTS,p)),He&&(de["#text"]=!0),Se&&te(de,["html","head","body"]),de.table&&(te(de,["tbody"]),delete G.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');C=d.TRUSTED_TYPES_POLICY,y=C.createHTML("")}else C===void 0&&(C=sa(w,s)),C!==null&&typeof y=="string"&&(y=C.createHTML(""));Be&&Be(d),m=d}},_e=te({},[...Vr,...Zr,...Yi]),tr=te({},[...Kr,...Vi]),Ao=function(d){let T=j(d);(!T||!T.tagName)&&(T={namespaceURI:Q,tagName:"template"});let F=hr(d.tagName),ge=hr(T.tagName);return V[d.namespaceURI]?d.namespaceURI===re?T.namespaceURI===W?F==="svg":T.namespaceURI===M?F==="svg"&&(ge==="annotation-xml"||wt[ge]):!!_e[F]:d.namespaceURI===M?T.namespaceURI===W?F==="math":T.namespaceURI===re?F==="math"&&vt[ge]:!!tr[F]:d.namespaceURI===W?T.namespaceURI===re&&!vt[ge]||T.namespaceURI===M&&!wt[ge]?!1:!tr[F]&&(xr[F]||!_e[F]):!!(rt==="application/xhtml+xml"&&V[d.namespaceURI]):!1},tt=function(d){qt(e.removed,{element:d});try{j(d).removeChild(d)}catch{D(d)}},ut=function(d,T){try{qt(e.removed,{attribute:T.getAttributeNode(d),from:T})}catch{qt(e.removed,{attribute:null,from:T})}if(T.removeAttribute(d),d==="is")if(Ce||Me)try{tt(T)}catch{}else try{T.setAttribute(d,"")}catch{}},_n=function(d){let T=null,F=null;if(xe)d="<remove></remove>"+d;else{let $e=Yr(d,/^[\r\n\t ]+/);F=$e&&$e[0]}rt==="application/xhtml+xml"&&Q===W&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");let ge=C?C.createHTML(d):d;if(Q===W)try{T=new _().parseFromString(ge,rt)}catch{}if(!T||!T.documentElement){T=b.createDocument(Q,"template",null);try{T.documentElement.innerHTML=le?y:ge}catch{}}let De=T.body||T.documentElement;return d&&F&&De.insertBefore(r.createTextNode(F),De.childNodes[0]||null),Q===W?H.call(T,Se?"html":"body")[0]:Se?T.documentElement:De},yn=function(d){return E.call(d.ownerDocument||d,d,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},$r=function(d){return d instanceof f&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof u)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function")},kn=function(d){return typeof l=="function"&&d instanceof l};function nt(U,d,T){pr(U,F=>{F.call(e,d,T,m)})}let wn=function(d){let T=null;if(nt(K.beforeSanitizeElements,d,null),$r(d))return tt(d),!0;let F=p(d.nodeName);if(nt(K.uponSanitizeElement,d,{tagName:F,allowedTags:de}),Oe&&d.hasChildNodes()&&!kn(d.firstElementChild)&&Fe(/<[/\w!]/g,d.innerHTML)&&Fe(/<[/\w!]/g,d.textContent)||d.nodeType===jt.progressingInstruction||Oe&&d.nodeType===jt.comment&&Fe(/<[/\w]/g,d.data))return tt(d),!0;if(!(J.tagCheck instanceof Function&&J.tagCheck(F))&&(!de[F]||G[F])){if(!G[F]&&xn(F)&&(L.tagNameCheck instanceof RegExp&&Fe(L.tagNameCheck,F)||L.tagNameCheck instanceof Function&&L.tagNameCheck(F)))return!1;if(He&&!$[F]){let ge=j(d)||d.parentNode,De=z(d)||d.childNodes;if(De&&ge){let $e=De.length;for(let We=$e-1;We>=0;--We){let st=A(De[We],!0);st.__removalCount=(d.__removalCount||0)+1,ge.insertBefore(st,P(d))}}}return tt(d),!0}return d instanceof a&&!Ao(d)||(F==="noscript"||F==="noembed"||F==="noframes")&&Fe(/<\/no(script|embed|frames)/i,d.innerHTML)?(tt(d),!0):(Ee&&d.nodeType===jt.text&&(T=d.textContent,pr([X,Ie,qe],ge=>{T=Ht(T,ge," ")}),d.textContent!==T&&(qt(e.removed,{element:d.cloneNode()}),d.textContent=T)),nt(K.afterSanitizeElements,d,null),!1)},vn=function(d,T,F){if(Te&&(T==="id"||T==="name")&&(F in r||F in Y))return!1;if(!(oe&&!ne[T]&&Fe(me,T))){if(!(ae&&Fe(je,T))){if(!(J.attributeCheck instanceof Function&&J.attributeCheck(T,d))){if(!v[T]||ne[T]){if(!(xn(d)&&(L.tagNameCheck instanceof RegExp&&Fe(L.tagNameCheck,d)||L.tagNameCheck instanceof Function&&L.tagNameCheck(d))&&(L.attributeNameCheck instanceof RegExp&&Fe(L.attributeNameCheck,T)||L.attributeNameCheck instanceof Function&&L.attributeNameCheck(T,d))||T==="is"&&L.allowCustomizedBuiltInElements&&(L.tagNameCheck instanceof RegExp&&Fe(L.tagNameCheck,F)||L.tagNameCheck instanceof Function&&L.tagNameCheck(F))))return!1}else if(!x[T]){if(!Fe(Ve,Ht(F,be,""))){if(!((T==="src"||T==="xlink:href"||T==="href")&&d!=="script"&&Hi(F,"data:")===0&&N[d])){if(!(pe&&!Fe(ke,Ht(F,be,"")))){if(F)return!1}}}}}}}return!0},xn=function(d){return d!=="annotation-xml"&&Yr(d,Ye)},$n=function(d){nt(K.beforeSanitizeAttributes,d,null);let{attributes:T}=d;if(!T||$r(d))return;let F={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:v,forceKeepAttr:void 0},ge=T.length;for(;ge--;){let De=T[ge],{name:$e,namespaceURI:We,value:st}=De,xt=p($e),Sr=st,Re=$e==="value"?Sr:Wi(Sr);if(F.attrName=xt,F.attrValue=Re,F.keepAttr=!0,F.forceKeepAttr=void 0,nt(K.uponSanitizeAttribute,d,F),Re=F.attrValue,Ae&&(xt==="id"||xt==="name")&&(ut($e,d),Re=he+Re),Oe&&Fe(/((--!?|])>)|<\/(style|title|textarea)/i,Re)){ut($e,d);continue}if(xt==="attributename"&&Yr(Re,"href")){ut($e,d);continue}if(F.forceKeepAttr)continue;if(!F.keepAttr){ut($e,d);continue}if(!ve&&Fe(/\/>/i,Re)){ut($e,d);continue}Ee&&pr([X,Ie,qe],An=>{Re=Ht(Re,An," ")});let Sn=p(d.nodeName);if(!vn(Sn,xt,Re)){ut($e,d);continue}if(C&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!We)switch(w.getAttributeType(Sn,xt)){case"TrustedHTML":{Re=C.createHTML(Re);break}case"TrustedScriptURL":{Re=C.createScriptURL(Re);break}}if(Re!==Sr)try{We?d.setAttributeNS(We,$e,Re):d.setAttribute($e,Re),$r(d)?tt(d):$s(e.removed)}catch{ut($e,d)}}nt(K.afterSanitizeAttributes,d,null)},To=function U(d){let T=null,F=yn(d);for(nt(K.beforeSanitizeShadowDOM,d,null);T=F.nextNode();)nt(K.uponSanitizeShadowNode,T,null),wn(T),$n(T),T.content instanceof o&&U(T.content);nt(K.afterSanitizeShadowDOM,d,null)};return e.sanitize=function(U){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},T=null,F=null,ge=null,De=null;if(le=!U,le&&(U="<!-->"),typeof U!="string"&&!kn(U))if(typeof U.toString=="function"){if(U=U.toString(),typeof U!="string")throw Wt("dirty is not a string, aborting")}else throw Wt("toString is not a function");if(!e.isSupported)return U;if(Le||ee(d),e.removed=[],typeof U=="string"&&(Ne=!1),Ne){if(U.nodeName){let st=p(U.nodeName);if(!de[st]||G[st])throw Wt("root node is forbidden and cannot be sanitized in-place")}}else if(U instanceof l)T=_n("<!---->"),F=T.ownerDocument.importNode(U,!0),F.nodeType===jt.element&&F.nodeName==="BODY"||F.nodeName==="HTML"?T=F:T.appendChild(F);else{if(!Ce&&!Ee&&!Se&&U.indexOf("<")===-1)return C&&O?C.createHTML(U):U;if(T=_n(U),!T)return Ce?null:O?y:""}T&&xe&&tt(T.firstChild);let $e=yn(Ne?U:T);for(;ge=$e.nextNode();)wn(ge),$n(ge),ge.content instanceof o&&To(ge.content);if(Ne)return U;if(Ce){if(Me)for(De=I.call(T.ownerDocument);T.firstChild;)De.appendChild(T.firstChild);else De=T;return(v.shadowroot||v.shadowrootmode)&&(De=Z.call(n,De,!0)),De}let We=Se?T.outerHTML:T.innerHTML;return Se&&de["!doctype"]&&T.ownerDocument&&T.ownerDocument.doctype&&T.ownerDocument.doctype.name&&Fe(Ds,T.ownerDocument.doctype.name)&&(We="<!DOCTYPE "+T.ownerDocument.doctype.name+`>
`+We),Ee&&pr([X,Ie,qe],st=>{We=Ht(We,st," ")}),C&&O?C.createHTML(We):We},e.setConfig=function(){let U=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ee(U),Le=!0},e.clearConfig=function(){m=null,Le=!1},e.isValidAttribute=function(U,d,T){m||ee({});let F=p(U),ge=p(d);return vn(F,ge,T)},e.addHook=function(U,d){typeof d=="function"&&qt(K[U],d)},e.removeHook=function(U,d){if(d!==void 0){let T=Ui(K[U],d);return T===-1?void 0:qi(K[U],T,1)[0]}return $s(K[U])},e.removeHooks=function(U){K[U]=[]},e.removeAllHooks=function(){K=Rs()},e}var Ms=Os();var Ns={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ps=t=>(...e)=>({_$litDirective$:t,values:e}),gr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Yt=class extends gr{constructor(e){if(super(e),this.it=we,e.type!==Ns.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===we||e==null)return this._t=void 0,this.it=e;if(e===gt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Yt.directiveName="unsafeHTML",Yt.resultType=1;var Fs=Ps(Yt);function sn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kt=sn();function Gs(t){kt=t}var Xt={exec:()=>null};function se(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Ue.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var oa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ue={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},ia=/^(?:[ \t]*(?:\n|$))+/,aa=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,la=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ca=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,on=/(?:[*+-]|\d{1,9}[.)])/,js=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ys=se(js).replace(/bull/g,on).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),da=se(js).replace(/bull/g,on).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),an=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ua=/^[^\n]+/,ln=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,pa=se(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ln).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),fa=se(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,on).getRegex(),wr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",cn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ha=se("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",cn).replace("tag",wr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Vs=se(an).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wr).getRegex(),ga=se(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Vs).getRegex(),dn={blockquote:ga,code:aa,def:pa,fences:la,heading:ca,hr:Qt,html:ha,lheading:Ys,list:fa,newline:ia,paragraph:Vs,table:Xt,text:ua},Bs=se("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wr).getRegex(),ma={...dn,lheading:da,table:Bs,paragraph:se(an).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Bs).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wr).getRegex()},ba={...dn,html:se(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",cn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:se(an).replace("hr",Qt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ys).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},_a=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ya=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Zs=/^( {2,}|\\)\n(?!\s*$)/,ka=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,vr=/[\p{P}\p{S}]/u,un=/[\s\p{P}\p{S}]/u,Ks=/[^\s\p{P}\p{S}]/u,wa=se(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,un).getRegex(),Xs=/(?!~)[\p{P}\p{S}]/u,va=/(?!~)[\s\p{P}\p{S}]/u,xa=/(?:[^\s\p{P}\p{S}]|~)/u,$a=se(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",oa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Qs=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Sa=se(Qs,"u").replace(/punct/g,vr).getRegex(),Aa=se(Qs,"u").replace(/punct/g,Xs).getRegex(),Js="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ta=se(Js,"gu").replace(/notPunctSpace/g,Ks).replace(/punctSpace/g,un).replace(/punct/g,vr).getRegex(),Ea=se(Js,"gu").replace(/notPunctSpace/g,xa).replace(/punctSpace/g,va).replace(/punct/g,Xs).getRegex(),Ca=se("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ks).replace(/punctSpace/g,un).replace(/punct/g,vr).getRegex(),Ra=se(/\\(punct)/,"gu").replace(/punct/g,vr).getRegex(),Ia=se(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),La=se(cn).replace("(?:-->|$)","-->").getRegex(),Da=se("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",La).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),_r=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Oa=se(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",_r).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),eo=se(/^!?\[(label)\]\[(ref)\]/).replace("label",_r).replace("ref",ln).getRegex(),to=se(/^!?\[(ref)\](?:\[\])?/).replace("ref",ln).getRegex(),Ma=se("reflink|nolink(?!\\()","g").replace("reflink",eo).replace("nolink",to).getRegex(),zs=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,pn={_backpedal:Xt,anyPunctuation:Ra,autolink:Ia,blockSkip:$a,br:Zs,code:ya,del:Xt,emStrongLDelim:Sa,emStrongRDelimAst:Ta,emStrongRDelimUnd:Ca,escape:_a,link:Oa,nolink:to,punctuation:wa,reflink:eo,reflinkSearch:Ma,tag:Da,text:ka,url:Xt},Na={...pn,link:se(/^!?\[(label)\]\((.*?)\)/).replace("label",_r).getRegex(),reflink:se(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",_r).getRegex()},tn={...pn,emStrongRDelimAst:Ea,emStrongLDelim:Aa,url:se(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",zs).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:se(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",zs).getRegex()},Pa={...tn,br:se(Zs).replace("{2,}","*").getRegex(),text:se(tn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},mr={normal:dn,gfm:ma,pedantic:ba},Vt={normal:pn,gfm:tn,breaks:Pa,pedantic:Na},Fa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Us=t=>Fa[t];function it(t,e){if(e){if(Ue.escapeTest.test(t))return t.replace(Ue.escapeReplace,Us)}else if(Ue.escapeTestNoEncode.test(t))return t.replace(Ue.escapeReplaceNoEncode,Us);return t}function qs(t){try{t=encodeURI(t).replace(Ue.percentDecode,"%")}catch{return null}return t}function Hs(t,e){let r=t.replace(Ue.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Ue.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ue.slashPipe,"|");return n}function Zt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Ba(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ws(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function za(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var yr=class{constructor(t){ue(this,"options");ue(this,"rules");ue(this,"lexer");this.options=t||kt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Zt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=za(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Zt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Zt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Zt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${u}`:u;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=f,r.length===0)break;let _=o.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let w=_,k=w.raw+`
`+r.join(`
`),A=this.blockquote(k);o[o.length-1]=A,n=n.substring(0,n.length-w.raw.length)+A.raw,s=s.substring(0,s.length-w.text.length)+A.text;break}else if(_?.type==="list"){let w=_,k=w.raw+`
`+r.join(`
`),A=this.list(k);o[o.length-1]=A,n=n.substring(0,n.length-_.raw.length)+A.raw,s=s.substring(0,s.length-w.raw.length)+A.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",u="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let f=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,A=>" ".repeat(3*A.length)),_=t.split(`
`,1)[0],w=!f.trim(),k=0;if(this.options.pedantic?(k=2,u=f.trimStart()):w?k=e[1].length+1:(k=e[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,u=f.slice(k),k+=e[1].length),w&&this.rules.other.blankLine.test(_)&&(c+=_+`
`,t=t.substring(_.length+1),a=!0),!a){let A=this.rules.other.nextBulletRegex(k),D=this.rules.other.hrRegex(k),P=this.rules.other.fencesBeginRegex(k),z=this.rules.other.headingBeginRegex(k),j=this.rules.other.htmlBeginRegex(k);for(;t;){let C=t.split(`
`,1)[0],y;if(_=C,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),y=_):y=_.replace(this.rules.other.tabCharGlobal,"    "),P.test(_)||z.test(_)||j.test(_)||A.test(_)||D.test(_))break;if(y.search(this.rules.other.nonSpaceChar)>=k||!_.trim())u+=`
`+y.slice(k);else{if(w||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||P.test(f)||z.test(f)||D.test(f))break;u+=`
`+_}!w&&!_.trim()&&(w=!0),c+=C+`
`,t=t.substring(C.length+1),f=y.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=u.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!s.loose){let c=a.tokens.filter(f=>f.type==="space"),u=c.length>0&&c.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=u}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Hs(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Hs(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Zt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ba(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ws(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ws(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...n[0]][0].length,f=t.slice(0,s+n.index+u+i);if(Math.min(s,i)%2){let w=f.slice(1,-1);return{type:"em",raw:f,text:w,tokens:this.lexer.inlineTokens(w)}}let _=f.slice(2,-2);return{type:"strong",raw:f,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},Je=class rn{constructor(e){ue(this,"tokens");ue(this,"options");ue(this,"state");ue(this,"inlineQueue");ue(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||kt,this.options.tokenizer=this.options.tokenizer||new yr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ue,block:mr.normal,inline:Vt.normal};this.options.pedantic?(r.block=mr.pedantic,r.inline=Vt.pedantic):this.options.gfm&&(r.block=mr.gfm,this.options.breaks?r.inline=Vt.breaks:r.inline=Vt.gfm),this.tokenizer.rules=r}static get rules(){return{block:mr,inline:Vt}}static lex(e,r){return new rn(r).lex(e)}static lexInline(e,r){return new rn(r).inlineTokens(e)}lex(e){e=e.replace(Ue.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,f=e.slice(1),_;this.options.extensions.startInline.forEach(w=>{_=w.call({lexer:this},f),typeof _=="number"&&_>=0&&(u=Math.min(u,_))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},kr=class{constructor(t){ue(this,"options");ue(this,"parser");this.options=t||kt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Ue.notSpaceStart)?.[0],s=t.replace(Ue.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${it(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=qs(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+it(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=qs(t);if(s===null)return it(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${it(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:it(t.text)}},fn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},et=class nn{constructor(e){ue(this,"options");ue(this,"renderer");ue(this,"textRenderer");this.options=e||kt,this.options.renderer=this.options.renderer||new kr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new fn}static parse(e,r){return new nn(r).parse(e)}static parseInline(e,r){return new nn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},br,Kt=(br=class{constructor(t){ue(this,"options");ue(this,"block");this.options=t||kt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?Je.lex:Je.lexInline}provideParser(){return this.block?et.parse:et.parseInline}},ue(br,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ue(br,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),br),Ua=class{constructor(...t){ue(this,"defaults",sn());ue(this,"options",this.setOptions);ue(this,"parse",this.parseMarkdown(!0));ue(this,"parseInline",this.parseMarkdown(!1));ue(this,"Parser",et);ue(this,"Renderer",kr);ue(this,"TextRenderer",fn);ue(this,"Lexer",Je);ue(this,"Tokenizer",yr);ue(this,"Hooks",Kt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new kr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new yr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Kt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Kt.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Kt.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await l.call(s,c);return a.call(s,f)})();let u=l.call(s,c);return a.call(s,u)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(s,c);return f===!1&&(f=await a.apply(s,c)),f})();let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return Je.lex(t,e??this.defaults)}parser(t,e){return et.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?Je.lex:Je.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?et.parse:et.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?Je.lex:Je.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?et.parse:et.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+it(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},yt=new Ua;function ie(t,e){return yt.parse(t,e)}ie.options=ie.setOptions=function(t){return yt.setOptions(t),ie.defaults=yt.defaults,Gs(ie.defaults),ie};ie.getDefaults=sn;ie.defaults=kt;ie.use=function(...t){return yt.use(...t),ie.defaults=yt.defaults,Gs(ie.defaults),ie};ie.walkTokens=function(t,e){return yt.walkTokens(t,e)};ie.parseInline=yt.parseInline;ie.Parser=et;ie.parser=et.parse;ie.Renderer=kr;ie.TextRenderer=fn;ie.Lexer=Je;ie.lexer=Je.lex;ie.Tokenizer=yr;ie.Hooks=Kt;ie.parse=ie;var Sc=ie.options,Ac=ie.setOptions,Tc=ie.use,Ec=ie.walkTokens,Cc=ie.parseInline;var Rc=et.parse,Ic=Je.lex;function ro(t){let e=ie.parse(t),r=Ms.sanitize(e);return Fs(r)}function qa(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function no(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(k){k.key==="Escape"&&s&&(k.preventDefault(),_())}document.addEventListener("keydown",a);function c(){return s?g`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>_()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${qa(s)}</span
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
            ${o==="loading"?g`<div class="mv__status">불러오는 중…</div>`:o==="error"?g`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:ro(i)}
          </div>
        </div>
      </div>
    `:g``}function u(){fe(c(),t)}async function f(k){s=k,o="loading",i="",l="",u();let A=r?r():"";if(!A){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",u();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",u();return}let D="/api/doc?workspace="+encodeURIComponent(A)+"&path="+encodeURIComponent(k);try{let P=await n(D),z=await P.json().catch(()=>({}));if(!P.ok||!z||z.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(z&&z.error||P.status)+")",u();return}i=String(z.content||""),o="ready",u()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",u()}}function _(){s=null,fe(g``,t)}function w(){document.removeEventListener("keydown",a),_()}return{open:f,close:_,destroy:w}}var Ha={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Wa(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function so(t,e={}){let r=Array.isArray(t)?t:[];return r.length===0?g`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `:g`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(n=>g`<button
            type="button"
            class="detail-session detail-session--${n.status||"unknown"}"
            data-attempt-id=${n.attempt_id}
            @click=${()=>e.onOpen&&e.onOpen(n.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Ha[n.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${n.attempt_id}</span>
            <span class="detail-session__meta"
              >${[n.runner,n.model].filter(Boolean).join(" \xB7 ")}</span
            >
            <span class="detail-session__time">${Wa(n.started_at)}</span>
          </button>`)}
    </div>
  `}var Ga=["open","in_progress","deferred","resolved","closed"],ja=[0,1,2,3,4];function oo(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,u={},f=!1,_=!1,w="",k="",A="";function D(){f=!1,_=!1,w="",k="",A=""}let P=document.createElement("div");P.className="md-viewer-root",document.body.appendChild(P);let z=no(P,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),j=document.createElement("div");j.className="session-log-root",document.body.appendChild(j);let C=ur(j,{transport:s?(h,x)=>Promise.resolve(s(h,x)):void 0,sessionLogStore:l});function y(){if(!i||!a)return[];let h=i.get();return(h&&h.attempts?Object.values(h.attempts):[]).filter(S=>S&&S.bead_id===a).sort((S,M)=>(M.started_at||0)-(S.started_at||0)).map(S=>({attempt_id:S.attempt_id,bead_id:S.bead_id,status:S.status,started_at:typeof S.started_at=="number"?S.started_at:null,runner:S.runner||null,model:S.model||null}))}function b(h){let x=i?i.get():null,S=x&&x.attempts?x.attempts[h]:null;C.open({attempt_id:h,meta:S?{runner:S.runner||void 0,model:S.model||void 0,effort:S.effort||void 0,status:S.status||void 0}:{}})}let E={onOpen:b},I=null;r&&r.subscribe&&(I=r.subscribe(()=>K()));let H=null;i&&typeof i.subscribe=="function"&&(H=i.subscribe(()=>{a&&N()}));function Z(h){h.key==="Escape"&&a&&(h.preventDefault(),n())}document.addEventListener("keydown",Z);function K(){if(a){if(r&&typeof r.snapshotFor=="function"){let h=r.snapshotFor("detail:"+a)||[];c=h.find(S=>S&&S.id===a)||h[0]||c}N()}}function X(h){ms(h).then(x=>{x?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ie(h){h.preventDefault(),h.stopPropagation(),a&&X(a)}function qe(h,x){h.preventDefault(),h.stopPropagation(),X(x)}function me(h,x){h.preventDefault(),h.stopPropagation(),z.open(x)}function je(h,x){u[h]=x,N(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:h,value:x})).catch(()=>{ce("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function ke(h,x,S){if(!s||!a)return!1;try{let M=await Promise.resolve(s(h,x)),re=Array.isArray(M)?M[0]:M;return re&&typeof re=="object"&&re.id?(c=re,!0):(ce(S,"error"),!1)}catch{return ce(S,"error"),!1}}function be(h){setTimeout(()=>{try{let x=t.querySelector(h);x&&typeof x.focus=="function"&&x.focus()}catch{}},0)}function Ye(){f=!0,w=c&&c.title||"",N(),be('.detail-edit__input[data-edit="title"]')}function Ve(h){w=h.target.value}function de(){f=!1,w="",N()}function Ze(){ke("edit-text",{id:a,field:"title",value:w},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(x=>{x&&(f=!1,w=""),N()})}function v(){_=!0,k=c&&c.description||"",N(),be('.detail-edit__textarea[data-edit="description"]')}function B(h){k=h.target.value}function L(){_=!1,k="",N()}function G(){ke("edit-text",{id:a,field:"description",value:k},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(x=>{x&&(_=!1,k=""),N()})}function ne(h,x,S,M){if(h.key==="Escape"){h.stopPropagation(),S();return}h.key==="Enter"&&(!M||h.ctrlKey||h.metaKey)&&(h.preventDefault(),x())}function J(h){let x=h.target.value;ke("update-status",{id:a,status:x},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>N())}function ae(h){let x=Number(h.target.value);ke("update-priority",{id:a,priority:x},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>N())}function oe(h){A=h.target.value}function pe(){let h=A.trim();h.length!==0&&ke("label-add",{id:a,label:h},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(x=>{x&&(A=""),N()})}function ve(h){if(h.key==="Escape"){h.stopPropagation(),A="",N();return}h.key==="Enter"&&(h.preventDefault(),pe())}function Ee(h){ke("label-remove",{id:a,label:h},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>N())}let Oe={onCopyPath:qe,onOpenDoc:me},Se={onChange:je};function Le(h){return typeof h=="string"?h:h&&typeof h=="object"?String(h.id||h.to||h.issue_id||h.depends_on||""):""}function xe(h){switch(h&&typeof h=="object"?String(h.dependency_type||h.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ce(h){let S=(Array.isArray(h.dependencies)?h.dependencies:[]).map(M=>({id:Le(M),icon:xe(M)})).filter(M=>M.id.length>0);return g`
      <div class="detail-section-label">의존성</div>
      ${S.length===0?g`<div class="detail-empty">의존성 없음</div>`:g`<div class="detail-deps">
            ${S.map(M=>o?g`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(M.id)}
                  >
                    ${M.icon?`${M.icon} `:""}${M.id}
                  </button>`:g`<span class="detail-dep"
                    >${M.icon?`${M.icon} `:""}${M.id}</span
                  >`)}
          </div>`}
    `}function Me(h){let x=h.metadata||{},S=h.workflow||{},M=S.stages||{},re=M.spec&&M.spec.stale,W=M.impl&&M.impl.stale,Q=S.route_source==="derived",le=S.route||x.route||"\u2014";return g`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Q?" detail-kv__v--derived":""}"
          title=${Q?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${Q&&S.route?`${le} ? (\uCD94\uB860)`:le}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${x.spec_review||"\uC5C6\uC74C"}${re?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${x.impl_review||"\uC5C6\uC74C"}${W?" \xB7 stale":""}</span
        >
      </div>
      ${x.pr_url?g`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${x.pr_url}</span>
          </div>`:""}
    `}let O={route:["spec_backed","full_plan"],merge_policy:["auto_merge","pr_stop"],drift_policy:["auto_rereview","halt"]};async function Te(h,x){let S=x.target.value;if(h==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&S!=="full_plan"&&!window.confirm(`full_plan \u2192 ${S||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){N();return}await ke("update-workflow-meta",{id:a,key:h,value:S},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),N()}function Ae(h){let x=h.metadata||{},S=(M,re)=>{let W=O[M],Q=typeof x[M]=="string"?x[M]:"";return g`<div class="detail-kv">
        <span class="detail-kv__k">${M}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${M}
          data-edit=${`wfmeta-${M}`}
          @change=${le=>Te(M,le)}
        >
          <option value="" ?selected=${!W.includes(Q)}>
            ${re}
          </option>
          ${W.map(le=>g`<option value=${le} ?selected=${Q===le}>${le}</option>`)}
        </select>
      </div>`};return g`
      ${S("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")}
      ${S("merge_policy","(\uAE30\uBCF8 auto_merge)")}
      ${S("drift_policy","(\uAE30\uBCF8 auto_rereview)")}
    `}function he(h){return f?g`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${w}
            @input=${Ve}
            @keydown=${x=>ne(x,Ze,de,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ze}
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
      `:g`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${h}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ye}
        >
          ✎
        </button>
      </div>
    `}function He(h){let x=Rt(h.created_at),S=Rt(h.updated_at);return!x&&!S?g``:g`
      ${x?g`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
      ${S?g`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${S}</span>
          </div>`:""}
    `}function Ne(h,x){return g`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${J}
        >
          ${Ga.map(S=>g`<option value=${S} ?selected=${S===h}>${S}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ae}
        >
          ${ja.map(S=>g`<option value=${String(S)} ?selected=${S===x}>
                P${S}
              </option>`)}
        </select>
      </div>
    `}function Pe(h){return g`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${_?"":g`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${v}
            >
              ✎
            </button>`}
      </div>
      ${_?g`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${k}
              @input=${B}
              @keydown=${x=>ne(x,G,L,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${G}
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
          </div>`:g`<div class="detail-overlay__desc">
            ${h||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function $(h){let x=Array.isArray(h.labels)?h.labels:[];return g`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${x.map(S=>g`<span class="detail-label-chip"
              >${S}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${S}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+S}
                @click=${()=>Ee(S)}
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
            @input=${oe}
            @keydown=${ve}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${pe}
          >
            추가
          </button>
        </span>
      </div>
    `}function R(){if(!a)return g``;let h=c||{},x=String(h.id||a),S=h.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",M=h.status||"open",re=typeof h.priority=="number"?Math.max(0,Math.min(4,h.priority)):"",W=h.description||"",Q={...h,metadata:{...h.metadata||{},...u}};return g`
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
            ${x}
          </button>
          ${he(S)} ${Ne(M,re)}
          ${He(h)} ${Pe(W)}
          ${$(h)} ${Ce(h)}
          ${Me(h)} ${Ae(h)}
          ${ks(h,Oe)}
          ${vs(Q,Se)}
          ${so(y(),E)}
        </div>
      </div>
    `}function N(){fe(R(),t)}return{load(h){h!==a&&(u={},D()),a=h,c=null,K()},clear(){a=null,c=null,u={},D(),z.close(),C.close(),fe(g``,t)},destroy(){I&&(I(),I=null),H&&(H(),H=null),document.removeEventListener("keydown",Z),z.destroy(),P.parentNode&&P.parentNode.removeChild(P),C.destroy(),j.parentNode&&j.parentNode.removeChild(j),a=null,c=null,fe(g``,t)}}}var Ya=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function io(t,e){return Ur(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Va(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function ao(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(b){let E=r.get();if(E)try{let I=await n("display-policy-set",{expected_revision:E.revision,policy:b(E)});a(I),I&&I.conflict&&I.policy&&(I=await n("display-policy-set",{expected_revision:I.policy.revision,policy:b(I.policy)}),a(I)),I&&I.conflict&&ce("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ce("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(b){b&&b.policy&&typeof b.policy=="object"&&r.set(b.policy)}function c(b){let E=r.get();if(!E)return;let I=io(b,E)!=="shown";l(H=>Va(b,H,I))}function u(){let b=i.trim();b.length!==0&&(i="",l(E=>E.hidden_prefixes.includes(b)?{hidden_prefixes:E.hidden_prefixes}:{hidden_prefixes:[...E.hidden_prefixes,b]}),D())}function f(b){l(E=>({hidden_prefixes:E.hidden_prefixes.filter(I=>I!==b)}))}function _(b){let E=r.get();if(!E)return;let I=E.chips[b]===!1;l(()=>({chips:{[b]:I}}))}function w(b){let E=s();return g`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${E.length===0?g`<div class="display-settings__empty">라벨 없음</div>`:g`<div class="display-settings__pills">
              ${E.map(I=>{let H=io(I,b);return g`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${H}`}
                  data-label=${I}
                  data-state=${H}
                  @click=${()=>c(I)}
                >
                  ${I}
                </button>`})}
            </div>`}
      </section>
    `}function k(b){return g`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${b.hidden_prefixes.map(E=>g`<span class="display-settings__prefix">
                ${E}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${E} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>f(E)}
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
    `}function A(b){return g`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Ya.map(([E,I])=>g`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${E}
                  .checked=${b.chips[E]!==!1}
                  @change=${()=>_(E)}
                />
                <span>${I}</span>
              </label>`)}
        </div>
      </section>
    `}function D(){let b=r.get();fe(g`
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
            ${b?g`${w(b)} ${k(b)}
                ${A(b)}`:g`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let P=!1,z=()=>{P=!1};o.addEventListener("close",z),o.addEventListener("cancel",z);let j=null;r.subscribe&&(j=r.subscribe(()=>{P&&D()}));function C(){P||(i="",P=!0,D(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function y(){P&&(P=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:C,close:y,destroy(){P=!1,o.removeEventListener("close",z),o.removeEventListener("cancel",z),j&&(j(),j=null),o.remove()}}}function lo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,u,f="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let _=typeof f=="string"?f.trim():"";if(s&&(_.length>0?(s.textContent=_,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function co(t,e,r){let n=ye("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return g`
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
    `}function l(){fe(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),fe(g``,t)}}}var uo=["bug","feature","task","epic","chore"];function po(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var fo=["Critical","High","Medium","Low","Backlog"];function ho(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),u=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),_=r.querySelector(".new-issue__close");function w(){o.replaceChildren();let y=document.createElement("option");y.value="",y.textContent="\u2014 Select \u2014",o.appendChild(y);for(let b of uo){let E=document.createElement("option");E.value=b,E.textContent=po(b),o.appendChild(E)}i.replaceChildren();for(let b=0;b<=4;b+=1){let E=document.createElement("option");E.value=String(b);let I=fo[b]||"Medium";E.textContent=`${b} \u2013 ${I}`,i.appendChild(E)}}w();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function A(y){s.disabled=y,o.disabled=y,i.disabled=y,l.disabled=y,a.disabled=y,u.disabled=y,f.disabled=y,f.textContent=y?"Creating\u2026":"Create"}function D(){c.textContent=""}function P(y){c.textContent=y}function z(){try{let y=window.localStorage.getItem("beads-ui.new.type");y?o.value=y:o.value="";let b=window.localStorage.getItem("beads-ui.new.priority");b&&/^\d$/.test(b)?i.value=b:i.value="2"}catch{o.value="",i.value="2"}}function j(){let y=o.value||"",b=i.value||"";y.length>0&&window.localStorage.setItem("beads-ui.new.type",y),b.length>0&&window.localStorage.setItem("beads-ui.new.priority",b)}async function C(){D();let y=String(s.value||"").trim();if(y.length===0){P("Title is required"),s.focus();return}let b=Number(i.value||"2");if(!(b>=0&&b<=4)){P("Priority must be 0..4"),i.focus();return}let E=String(o.value||""),I=String(a.value||""),H={title:y};E.length>0&&(H.type=E),String(b).length>0&&(H.priority=b),I.length>0&&(H.description=I),A(!0);try{await e("create-issue",H)}catch{A(!1),P("Failed to create issue");return}j(),A(!1),k()}return r.addEventListener("cancel",y=>{y.preventDefault(),k()}),_.addEventListener("click",()=>k()),u.addEventListener("click",()=>k()),r.addEventListener("keydown",y=>{y.key==="Enter"&&(y.ctrlKey||y.metaKey)&&(y.preventDefault(),C())}),n.addEventListener("submit",y=>{y.preventDefault(),C()}),{open(){n.reset(),D(),z();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}function Za(t){let e=t.draggable&&!t.done;return g`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?g`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.reason?g`<span class="worker-mini__reason">${t.reason}</span>`:""}
  </div>`}function Jt(t){return g`<section
    class="worker-pane${t.src?" worker-pane--src":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${t.title}</span>
      <span class="worker-pane__count">${t.items.length}</span>
    </header>
    <div class="worker-pane__body">
      ${t.items.length===0?g`<div class="worker-pane__empty">${t.empty||""}</div>`:t.items.map(e=>Za(e))}
    </div>
  </section>`}function Ka(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function go(t){return g`<div class="worker-banners">
    ${t.autoAdvance?g`<div class="worker-banner worker-banner--on" role="status">
          ▶ 자동 진행 켜짐 — Serial head 1 + Parallel 슬롯까지 실행합니다.
        </div>`:g`<div class="worker-banner worker-banner--off" role="status">
          ⏸ 자동 진행 꺼짐 — 새 세션을 시작하지 않습니다. ▶로 재개.
        </div>`}
    ${t.breaker?g`<div class="worker-banner worker-banner--breaker" role="alert">
          ⛔ ${t.breaker.repo||"repo"} 세션 실패로 차단 —
          ${t.breaker.reason||""}. 신규 launch·머지 진입 차단, 수동 ▶
          필요.
        </div>`:""}
  </div>`}function Xa(t,e,r=null){let n=t.lane==="serial"?"serial":"\u2225",s=typeof t.started_at=="number"?Ka(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=t.attempt_id&&t.attempt_id===r;return g`<div
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
    ${o?g`<div class="rtile__meta">${o}</div>`:""}
    ${t.merge_policy?g`<div class="rtile__meta rtile__meta--policy">
          ${t.merge_policy}${t.demoted_reason?g` <span
                class="rtile__demoted"
                title=${`\uAC15\uB4F1: ${t.demoted_reason}`}
                >⤵ ${t.demoted_reason}</span
              >`:""}
        </div>`:""}
  </div>`}function mo(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return g`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?g`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Xa(s,e,r))}
  </div>`}var Qa="tab:worker:ready",Ja="tab:worker:blocked";function el(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function tl(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function hn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l}=e,a=n?lr(n,i):null,c=cr({transport:r,uiOrderStore:i}),u=null,f=[],_=[],w=document.createElement("div");w.className="worker-console";let k=document.createElement("div"),A=document.createElement("div");A.className="worker-drawer-host";let D=document.createElement("div");w.append(k,A,D),t.appendChild(w);let P=null,z=ur(A,{transport:r,sessionLogStore:o,onClose:()=>{P=null,me()}});function j(){return s&&s.get()||{revision:0,auto_advance:!1,serial:[],parallel:[],done:[]}}function C(){let v=j();return typeof v.revision=="number"?v.revision:0}function y(v){v&&v.queue&&s&&s.set(v.queue)}async function b(v,B,L){if(!r)return;let G=await r("worker-queue-place",{bead_id:v,lane:B,index:L,expected_revision:C()});y(G),G&&G.conflict&&await r("worker-queue-place",{bead_id:v,lane:B,index:L,expected_revision:C()}).then(y)}async function E(v,B,L){if(!r)return;let G=await r("worker-queue-reorder",{bead_id:v,lane:B,to_index:L,expected_revision:C()});y(G),G&&G.conflict&&await r("worker-queue-reorder",{bead_id:v,lane:B,to_index:L,expected_revision:C()}).then(y)}async function I(v){if(!r)return;let B=await r("worker-queue-remove",{bead_id:v,expected_revision:C()});y(B),B&&B.conflict&&await r("worker-queue-remove",{bead_id:v,expected_revision:C()}).then(y)}async function H(v){!r||!v||await r("worker-attempt-stop",{attempt_id:v})}async function Z(v){if(!r)return;let B=await r("worker-queue-toggle",{on:v,expected_revision:C()});y(B),B&&B.conflict&&await r("worker-queue-toggle",{on:v,expected_revision:C()}).then(y)}async function K(v,B){if(!r)return;let L={key:v,value:B||null},G=await r("worker-queue-set-policy",{...L,expected_revision:C()});y(G),G&&G.conflict&&await r("worker-queue-set-policy",{...L,expected_revision:C()}).then(y)}function X(){let v=j(),B=a?a.selectBoardColumn(Qa,"ready"):[],L=a?a.selectBoardColumn(Ja,"blocked"):[],G=new Map;for(let O of[...B,...L])G.set(O.id,O.title||O.id);let ne=new Set([...v.serial.map(O=>O.bead_id),...v.parallel.map(O=>O.bead_id),...v.done.map(O=>O.bead_id)]),J=new Set(L.map(O=>O.id)),ae=i?i.get()?.order||{}:{},oe=new Set,pe=[];for(let O of[...B,...L])ne.has(O.id)||oe.has(O.id)||(oe.add(O.id),pe.push(O));pe.sort(ir(ae)),f=pe;let ve=v.admission||{},Ee=O=>ve[O]?`\u26D4 ${ve[O].reason}`:"",Oe=pe.map(O=>{let Te=el(O),Ae=[];J.has(O.id)&&Ae.push(tl(O)),Te||Ae.push("spec \uC5C6\uC74C");let he=Ee(O.id);return he&&Ae.push(he),{id:O.id,title:O.title||O.id,reason:Ae.join(" \xB7 "),draggable:Te,lane:"candidate"}}),Se=(O,Te)=>O.map(Ae=>({id:Ae.bead_id,title:G.get(Ae.bead_id)||Ae.bead_id,reason:Te==="done"?"":Ee(Ae.bead_id),draggable:Te!=="done",done:Te==="done",lane:Te})),Le=new Map;for(let O of v.serial||[])Le.set(O.bead_id,"serial");for(let O of v.parallel||[])Le.set(O.bead_id,"parallel");let xe=v.attempts?Object.values(v.attempts):[],Ce=[],Me=null;for(let O of xe)O.status==="running"?Ce.push({bead_id:O.bead_id,attempt_id:O.attempt_id,title:G.get(O.bead_id)||O.bead_id,lane:Le.get(O.bead_id)||"parallel",runner:O.runner||null,model:O.model||null,effort:O.effort||null,started_at:typeof O.started_at=="number"?O.started_at:null,merge_policy:O.merge_policy||null,demoted_reason:O.demoted_reason||null}):(O.status==="failed"||O.status==="orphaned")&&(Me={repo:O.repo||"",reason:O.cause||O.status});return{queue:v,idToTitle:G,candidates:Oe,running:Ce,breaker:Me,serial:Se(v.serial,"serial"),parallel:Se(v.parallel,"parallel"),done:Se(v.done,"done")}}function Ie(v){let B=v.serial.length>0?v.serial[0].id:"\u2014",L=v.queue.workspace_info||{},G=L.verify_cmd&&Array.isArray(L.verify_cmd.cmd)?L.verify_cmd.cmd.join(" "):null,ne=(J,ae,oe)=>{let pe=typeof v.queue[J]=="string"?v.queue[J]:"";return g`<label class="worker-policy">
        <span class="worker-policy__k">${J}</span>
        <select
          class="worker-policy__sel"
          aria-label=${`\uC804\uC5ED ${J}`}
          data-policy-key=${J}
          @change=${ve=>{K(J,ve.target.value)}}
        >
          <option value="" ?selected=${!ae.includes(pe)}>
            ${oe}
          </option>
          ${ae.map(ve=>g`<option value=${ve} ?selected=${pe===ve}>${ve}</option>`)}
        </select>
      </label>`};return g`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${v.queue.auto_advance?" is-active":""}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${v.running.length}</b> · serial 다음
          <b>${B}</b></span
        >
        <span class="worker-tgl"
          >parallel slot <b>${v.parallel.length}</b></span
        >
        ${ne("merge_policy",["auto_merge","pr_stop"],"(\uAE30\uBCF8 auto_merge)")}
        ${ne("drift_policy",["auto_rereview","halt"],"(\uAE30\uBCF8 auto_rereview)")}
        <span
          class="worker-verifycmd${G?"":" worker-verifycmd--unset"}"
          title="verify_cmd — 서버 설정 파일 전용(읽기), 미설정 시 auto_merge가 pr_stop으로 강등"
          >verify_cmd:
          ${G?g`<code>${G}</code>`:"\uBBF8\uC124\uC815 (auto_merge\u2192pr_stop \uAC15\uB4F1)"}</span
        >
      </div>
      ${go({autoAdvance:!!v.queue.auto_advance,breaker:v.breaker})}
      ${mo(v.running,Date.now(),P)}`}function qe(v){return g`<div class="worker-lanes">
      ${Jt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:v.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${Jt({id:"worker-pane-serial",lane:"serial",title:"Serial \uD050",items:v.serial,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Jt({id:"worker-pane-parallel",lane:"parallel",title:"Parallel \uD480",items:v.parallel,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Jt({id:"worker-pane-done",lane:"done",title:`Done \xB7 \uC624\uB298 ${v.done.length}`,items:v.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function me(){let v=X();fe(Ie(v),k),fe(qe(v),D)}function je(v){let B=v.target?.closest?.('.worker-mini[draggable="true"]');if(!B)return;let L=B.dataset.beadId||"",G=B.dataset.lane||"";u={bead_id:L,from_lane:G};try{v.dataTransfer?.setData("text/plain",L),v.dataTransfer&&(v.dataTransfer.effectAllowed="move")}catch{}}function ke(v){let B=v.target?.closest?.(".worker-pane");B&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"),B.classList.add("worker-pane--drag-over"))}function be(v){v.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ye(v,B){let L=f.find(ae=>ae.id===v);if(!L)return;let G=f.filter(ae=>ae.id!==v),ne=G.length;if(B){let ae=B.dataset.beadId;if(ae===v)return;let oe=G.findIndex(pe=>pe.id===ae);oe>=0&&(ne=oe)}let J=G.slice();J.splice(ne,0,L),c.applyReorder(v,J,ne)}function Ve(v){let B=v.target?.closest?.(".worker-pane");if(!B)return;v.preventDefault(),B.classList.remove("worker-pane--drag-over");let L=B.dataset.lane||"",G=u?.bead_id||v.dataTransfer?.getData("text/plain")||"",ne=u?.from_lane||"";if(u=null,!G)return;let J=v.target?.closest?.(".worker-mini"),ae=Array.from(B.querySelectorAll(".worker-mini")),oe=ae.length;if(J){let pe=ae.indexOf(J);pe>=0&&(oe=pe)}if(L==="candidate"){if(ne==="candidate"){Ye(G,J);return}(ne==="serial"||ne==="parallel")&&I(G);return}(L==="serial"||L==="parallel")&&(ne===L?E(G,L,oe):b(G,L,oe))}function de(v){let B=j(),L=B.attempts?B.attempts[v]:null,G=L?{runner:L.runner||void 0,model:L.model||void 0,effort:L.effort||void 0,worktree:L.worktree||void 0,status:L.status||void 0}:{};P=v,z.open({attempt_id:v,meta:G}),me()}function Ze(v){let B=v.target;if(B?.closest?.(".worker-play")){Z(!0);return}if(B?.closest?.(".worker-pause")){Z(!1);return}if(B?.closest?.(".rtile__stop")){let J=B?.closest?.(".rtile")?.dataset?.attemptId;J&&H(J);return}if(B?.closest?.(".rtile__info")){let J=B?.closest?.(".rtile")?.dataset?.beadId;J&&l&&l(J);return}if(B?.closest?.(".worker-drawer-host"))return;let L=B?.closest?.(".rtile");if(L){let ne=L.dataset.attemptId;ne&&de(ne);return}let G=B?.closest?.(".worker-mini");if(G&&l){let ne=G.dataset.beadId;ne&&l(ne)}}return t.addEventListener("dragstart",je),t.addEventListener("dragover",ke),t.addEventListener("dragleave",be),t.addEventListener("drop",Ve),t.addEventListener("click",Ze),a&&_.push(a.subscribe(me)),s&&_.push(s.subscribe(me)),me(),{load(){me()},destroy(){for(let v of _.splice(0))try{v()}catch{}t.removeEventListener("dragstart",je),t.removeEventListener("dragover",ke),t.removeEventListener("dragleave",be),t.removeEventListener("drop",Ve),t.removeEventListener("click",Ze);try{z.destroy()}catch{}fe(g``,t)}}}function gn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function bo(t,e,r,n=async()=>{},s=async()=>{}){let o=ye("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function u(b){let I=b.target.value,Z=e.getState().workspace?.current?.path||"";if(I&&I!==Z){o("switching workspace to %s",I),l=!0,y();try{await r(I)}catch(K){o("workspace switch failed: %o",K)}finally{l=!1,y()}}}async function f(){let b=e.getState(),E=b.workspace?.current?.path||b.workspace?.available?.[0]?.path||"";if(!(!E||a)){o("git-pulling workspace %s",E),a=!0,y();try{await n(E)}catch(I){o("workspace git pull failed: %o",I)}finally{a=!1,y()}}}function _(b){let E=b.target;E&&t.contains(E)||A()}function w(b){b.key==="Escape"&&A()}function k(){c||(c=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",w),y())}function A(){c&&(c=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",w),y())}function D(){c?A():k()}async function P(b){let E=b.target,I=E.value,H=E.checked;o("toggling visibility %s \u2192 %s",I,String(H));try{await s(I,H)}catch(Z){o("workspace visibility toggle failed: %o",Z)}}function z(b){return b?g`
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
    `:g``}function j(b,E){return g`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${D}
          aria-haspopup="true"
          aria-expanded=${c?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${c?g`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${b.map(I=>g`
                    <label
                      class="workspace-picker__manage-row"
                      title="${I.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${I.path}"
                        .checked=${!E.has(I.path)}
                        @change=${P}
                      />
                      <span class="workspace-picker__manage-name"
                        >${gn(I.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function C(){let b=e.getState(),E=b.workspace?.current,I=b.workspace?.available||[],H=new Set(b.workspace?.hidden||[]),Z=E?.path||I[0]?.path||"";if(I.length===0)return g``;let K=I.filter(X=>!H.has(X.path)||X.path===Z);if(K.length<=1){let X=K[0]||I[0],Ie=gn(X.path);return g`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${X.path}"
            >${Ie}</span
          >
          ${j(I,H)}
          ${z(Z)}
          ${a?g`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return g`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${u}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${K.map(X=>g`
              <option
                value="${X.path}"
                ?selected=${X.path===Z}
                title="${X.path}"
              >
                ${gn(X.path)}
              </option>
            `)}
        </select>
        ${j(I,H)}
        ${z(Z)}
        ${l||a?g`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function y(){fe(C(),t)}return y(),i=e.subscribe(()=>y()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",w),fe(g``,t)}}}var _o=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-policy","worker-queue-remove","worker-attempt-stop","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function mn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function yo(t,e,r=mn()){return{id:r,type:t,payload:e}}function ko(t={}){let e=ye("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,u=[],f=new Map,_=new Set;function w(C){for(let y of Array.from(_))try{y(C)}catch{}}function k(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),w(o);let C=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),y=(r.jitterRatio||0)*C,b=Math.max(0,Math.round(C+(Math.random()*2-1)*y));e("ws retry in %d ms (attempt %d)",b,i+1),l=setTimeout(()=>{l=null,j()},b)}function A(C){try{s?.send(JSON.stringify(C))}catch(y){e("ws send failed",y)}}function D(){for(o="open",e("ws open"),w(o),i=0;u.length;){let C=u.shift();C&&A(C)}}function P(C){let y;try{y=JSON.parse(String(C.data))}catch{e("ws received non-JSON message");return}if(!y||typeof y.id!="string"||typeof y.type!="string"){e("ws received invalid envelope");return}if(c.has(y.id)){let E=c.get(y.id);c.delete(y.id),y.ok?E?.resolve(y.payload):E?.reject(y.error||new Error("ws error"));return}let b=f.get(y.type);if(b&&b.size>0)for(let E of Array.from(b))try{E(y.payload)}catch(I){e("ws event handler error",I)}else e("ws received unhandled message type: %s",y.type)}function z(){o="closed",e("ws closed"),w(o);for(let[C,y]of c.entries())y.reject(new Error("ws disconnected")),c.delete(C);i+=1,k()}function j(){if(!a)return;let C=n();try{s=new WebSocket(C),e("ws connecting %s",C),o="connecting",w(o),s.addEventListener("open",D),s.addEventListener("message",P),s.addEventListener("error",()=>{}),s.addEventListener("close",z)}catch(y){e("ws connect failed %o",y),k()}}return j(),{send(C,y){if(!_o.includes(C))return Promise.reject(new Error(`unknown message type: ${C}`));let b=mn(),E=yo(C,y,b);return e("send %s id=%s",C,b),new Promise((I,H)=>{c.set(b,{resolve:I,reject:H,type:C}),s&&s.readyState===s.OPEN?A(E):(e("queue %s id=%s (state=%s)",C,b,o),u.push(E))})},on(C,y){f.has(C)||f.set(C,new Set);let b=f.get(C);return b?.add(y),()=>{b?.delete(y)}},onConnection(C){return _.add(C),()=>{_.delete(C)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,j()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function rl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function nl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var bn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],wo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],vo="worker:queue",xo="ui:order",$o="ui:display-policy",dt="tab:board:closed",So="beads-ui.board.closed-range";function sl(t){let e=ye("main");e("bootstrap start");let r=g`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;fe(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let I=function(p,m){let Y="Request failed",q="";if(p&&typeof p=="object"){let _e=p;if(typeof _e.message=="string"&&_e.message.length>0&&(Y=_e.message),typeof _e.details=="string")q=_e.details;else if(_e.details&&typeof _e.details=="object")try{q=JSON.stringify(_e.details,null,2)}catch{q=""}}else typeof p=="string"&&p.length>0&&(Y=p);let ee=m&&m.length>0?`Failed to load ${m}`:"Request failed";E.open(ee,Y,q)},L=function(p){return`${W.getState().workspace.current?.path||""}\0${p}`},G=function(){ke&&(ke().catch(()=>{}),ke=null),be=null,Ye=null},J=function(p){Ve=p;let m=()=>{Ve!==p||W.getState().selected_id!==p||(Ve=null,ne(p))};if(!v){Ze.then(m);return}m()},ve=function(){let p=Fn(pe);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},Ee=function(p){if(p)for(let[m,Y]of bn){if(ae.has(m)||oe.has(m))continue;let q=m===dt?ve():{type:Y};try{X.register(m,q)}catch(ee){e("register %s store failed: %o",m,ee)}oe.add(m),K.subscribeList(m,q).then(ee=>{ae.set(m,ee)}).catch(ee=>{e("subscribe %s failed: %o",m,ee),I(ee,"board")}).finally(()=>{oe.delete(m)})}else Se()},Se=function(){for(let[p]of bn){let m=ae.get(p);m&&(m().catch(()=>{}),ae.delete(p));try{X.unregister(p)}catch(Y){e("unregister %s failed: %o",p,Y)}}},Ce=function(p){if(!p){Me();return}for(let[m,Y]of wo)if(!(Le.has(m)||oe.has(m))){try{X.register(m,{type:Y})}catch(q){e("register %s store failed: %o",m,q)}oe.add(m),K.subscribeList(m,{type:Y}).then(q=>{Le.set(m,q)}).catch(q=>{e("subscribe %s failed: %o",m,q),I(q,"worker")}).finally(()=>{oe.delete(m)})}xe||(Z("subscribe-worker-queue",{id:vo}).catch(m=>{e("subscribe-worker-queue failed: %o",m)}),xe=()=>Z("unsubscribe-worker-queue",{id:vo}))},Me=function(){for(let[p]of wo){let m=Le.get(p);m&&(m().catch(()=>{}),Le.delete(p));try{X.unregister(p)}catch(Y){e("unregister %s failed: %o",p,Y)}}xe&&(xe().catch(()=>{}),xe=null)},Te=function(){O||(Z("subscribe-ui-order",{id:xo}).catch(p=>{e("subscribe-ui-order failed: %o",p)}),O=()=>Z("unsubscribe-ui-order",{id:xo}))},Ae=function(){O&&(O().catch(()=>{}),O=null),qe.clear()},He=function(){he||(Z("subscribe-display-policy",{id:$o}).catch(p=>{e("subscribe-display-policy failed: %o",p)}),he=()=>Z("unsubscribe-display-policy",{id:$o}))},Ne=function(){he&&(he().catch(()=>{}),he=null),me.clear()},x=function(p){if(!p)return"Unknown";let m=p.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var l=I,a=L,c=G,u=J,f=ve,_=Ee,w=Se,k=Ce,A=Me,D=Te,P=Ae,z=He,j=Ne,C=x;let y=document.getElementById("header-loading"),b=as(y),E=lo(t),H=ko(),Z=b.wrapSend((p,m)=>H.send(p,m)),K=es(Z),X=ts(),Ie=ns(),qe=rs(),me=Bn(),je=zn();H.on("worker-queue-snapshot",p=>{let m=p;if(m&&m.queue)try{Ie.set(m.queue)}catch{}}),H.on("ui-order-snapshot",p=>{let m=p;if(m&&typeof m.revision=="number")try{qe.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),H.on("display-policy-snapshot",p=>{let m=p;if(m&&m.policy&&typeof m.policy=="object")try{me.set(m.policy)}catch{}}),H.on("session-log-snapshot",p=>{let m=p;if(m&&typeof m.attempt_id=="string")try{je.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[])}catch{}}),H.on("session-log-append",p=>{let m=p;if(m&&typeof m.attempt_id=="string")try{je.append(m.attempt_id,m.event)}catch{}}),H.on("snapshot",p=>{let m=p,Y=m&&typeof m.id=="string"?m.id:"",q=Y?X.getStore(Y):null;if(q&&m&&m.type==="snapshot")try{q.applyPush(m)}catch{}}),H.on("upsert",p=>{let m=p,Y=m&&typeof m.id=="string"?m.id:"",q=Y?X.getStore(Y):null;if(q&&m&&m.type==="upsert")try{q.applyPush(m)}catch{}}),H.on("delete",p=>{let m=p,Y=m&&typeof m.id=="string"?m.id:"",q=Y?X.getStore(Y):null;if(q&&m&&m.type==="delete")try{q.applyPush(m)}catch{}});let ke=null,be=null,Ye=null,Ve=null,de=()=>{},Ze=new Promise(p=>{de=()=>p(void 0)}),v=!1,B=!1;async function ne(p){let m=L(p);if(m===be||m===Ye)return;Ye=m;let Y=`detail:${p}`,q={type:"issue-detail",params:{id:p}};try{X.register(Y,q)}catch(ee){e("register detail store failed: %o",ee)}try{let ee=await K.subscribeList(Y,q);if(W.getState().selected_id!==p||L(p)!==m){await ee().catch(()=>{});return}ke&&await ke().catch(()=>{}),ke=ee,be=m}catch(ee){e("detail subscribe failed: %o",ee),I(ee,"issue details")}finally{Ye===m&&(Ye=null)}}let ae=new Map,oe=new Set,pe=nr;try{let p=window.localStorage.getItem(So);Nr(p)&&(pe=p)}catch{}async function Oe(p){if(!Nr(p)||p===pe)return;pe=p;try{window.localStorage.setItem(So,p)}catch{}let m=ae.get(dt);if(!m)return;ae.delete(dt),await m().catch(()=>{});let Y=ve();try{X.register(dt,Y)}catch(q){e("register %s store failed: %o",dt,q)}try{let q=await K.subscribeList(dt,Y);ae.set(dt,q)}catch(q){e("re-subscribe %s failed: %o",dt,q),I(q,"board")}}let Le=new Map,xe=null,O=null,he=null;async function Pe(){he=null,me.clear();let p=W.getState().workspace.current?.path;if(p)try{await H.send("set-workspace",{path:p})}catch(m){e("workspace restore after reconnect failed: %o",m);return}He()}async function $(){e("clearing all subscriptions for workspace switch"),Se(),Me(),Ie.clear(),Ae(),Te(),Ne(),He(),G();let p=W.getState();if(p.selected_id)try{X.unregister(`detail:${p.selected_id}`)}catch{}let m=W.getState();Ee(m.view==="board"),Ce(m.view==="worker"),m.selected_id&&J(m.selected_id)}async function R(p){e("requesting workspace switch to %s",p),B=!0;try{let m=await H.send("set-workspace",{path:p});e("workspace switch result: %o",m),m&&m.workspace&&(W.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",p),m.changed&&(await $(),ce("Switched to "+x(p),"success",2e3)))}catch(m){throw e("workspace switch failed: %o",m),ce("Failed to switch workspace","error",3e3),m}finally{B=!1}}async function N(p){e("requesting workspace git pull for %s",p);try{let m=await H.send("git-pull-workspace",{});e("workspace git pull result: %o",m);let Y=m?.status;if(Y==="up_to_date"){ce("Already up to date","success",2e3);return}if(Y==="stash_pop_conflict"){ce("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ce("Git pulled "+x(p),"success",2e3)}catch(m){e("workspace git pull failed: %o",m);let Y=m?.code,q=m?.message;if(Y==="rebase_conflict"){ce("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Y==="rebase_conflict_abort_failed"){ce("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Y==="busy"){ce("Git pull skipped: another operation is running","warning",3e3);return}let ee=q?`: ${q}`:"";throw ce(`Git pull failed${ee}`,"error",3e3),m}}async function h(p,m){e("setting workspace visibility %s \u2192 %s",p,String(m));try{await H.send("set-workspace-visibility",{path:p,visible:m}),await S()}catch(Y){e("workspace visibility update failed: %o",Y),ce("Failed to update project visibility","error",3e3)}}async function S(){try{let p=await H.send("list-workspaces",{});if(e("workspaces loaded: %o",p),p&&Array.isArray(p.workspaces)){let m=p.workspaces.map(_e=>({path:_e.path,database:_e.database,pid:_e.pid,version:_e.version})),Y=p.current?{path:p.current.root_dir,database:p.current.db_path}:null,q=Array.isArray(p.hidden)?p.hidden.filter(_e=>typeof _e=="string"):[];W.setState({workspace:{current:Y,available:m,hidden:q}});let ee=window.localStorage.getItem("beads-ui.workspace");ee&&(!m.some(tr=>tr.path===ee)||q.includes(ee)?window.localStorage.removeItem("beads-ui.workspace"):Y&&ee!==Y.path&&(e("restoring saved workspace preference: %s",ee),await R(ee)))}}catch(p){e("failed to load workspaces: %o",p)}}H.on("workspace-changed",p=>{e("workspace-changed event: %o",p),p&&p.root_dir&&(W.setState({workspace:{current:{path:p.root_dir,database:p.db_path}}}),S(),$())});let M=!1;if(typeof H.onConnection=="function"){let p=m=>{e("ws state %s",m),m==="reconnecting"||m==="closed"?(M=!0,ce("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&M&&(M=!1,ce("Reconnected","success",2200),nl(W,(Y,q)=>{e(`${Y}: %o`,q)}),Pe())};H.onConnection(p)}let re="board";try{let p=window.localStorage.getItem("beads-ui.view");(p==="board"||p==="worker")&&(re=p)}catch(p){e("view parse error: %o",p)}let W=is({config:rl(),view:re}),Q=ss(W);Q.start();let le=async(p,m)=>{try{return await Z(p,m)}catch{return[]}};n&&co(n,W,Q);let V=document.getElementById("workspace-picker");V&&bo(V,W,R,N,h);let at=ho(t,(p,m)=>Z(p,m));try{let p=document.getElementById("new-issue-btn");p&&p.addEventListener("click",()=>at.open())}catch{}let wt=ao(t,{policyStore:me,transport:(p,m)=>Z(p,m),labelOptions:()=>{let p=new Set;for(let[m]of bn)for(let Y of X.snapshotFor(m)||[]){let q=Y.labels;if(Array.isArray(q))for(let ee of q)typeof ee=="string"&&ee.length>0&&p.add(ee)}return Array.from(p).sort()}});try{let p=document.getElementById("display-settings-btn");p&&p.addEventListener("click",()=>wt.open())}catch{}let vt=gs(s,{gotoIssue:p=>Q.gotoIssue(p),issueStores:X,transport:le,uiOrderStore:qe,displayPolicyStore:me,closedRange:pe,onClosedRangeChange:p=>{Oe(p)},onNewIssue:()=>at.open()}),xr=hn(o,{transport:le,issueStores:X,queueStore:Ie,sessionLogStore:je,uiOrderStore:qe,gotoIssue:p=>W.setState({selected_id:p})}),rt=oo(i,{issueStores:X,transport:le,queueStore:Ie,sessionLogStore:je,getWorkspacePath:()=>W.getState().workspace.current?.path,onNavigate:p=>{W.getState().view==="worker"?W.setState({selected_id:p}):Q.gotoIssue(p)},onClose:()=>{let p=W.getState();W.setState({selected_id:null});try{Q.gotoView(p.view==="worker"?"worker":"board")}catch{}}}),Ot=W.getState().selected_id;Ot&&(i.hidden=!1,rt.load(Ot),J(Ot)),W.subscribe(p=>{let m=p.selected_id;m?(i.hidden=!1,rt.load(m),B||J(m)):(rt.clear(),i.hidden=!0,G())});let er=p=>{s.hidden=p.view!=="board",o.hidden=p.view!=="worker",Ee(p.view==="board"),Ce(p.view==="worker"),!p.selected_id&&p.view==="board"&&vt.load(),p.view==="worker"&&xr.load(),window.localStorage.setItem("beads-ui.view",p.view)};W.subscribe(er),er(W.getState()),Te(),He(),S().finally(()=>{v=!0,de()}),window.addEventListener("keydown",p=>{let m=p.ctrlKey||p.metaKey,Y=String(p.key||"").toLowerCase(),q=p.target,ee=q&&q.tagName?String(q.tagName).toLowerCase():"",_e=ee==="input"||ee==="textarea"||ee==="select"||q&&typeof q.isContentEditable=="boolean"&&q.isContentEditable;m&&Y==="n"&&(_e||(p.preventDefault(),at.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&sl(e)});export{sl as bootstrap,rl as readBootstrapConfig,nl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
