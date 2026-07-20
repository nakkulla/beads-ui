var Eo=Object.create;var Ar=Object.defineProperty;var Co=Object.getOwnPropertyDescriptor;var Ro=Object.getOwnPropertyNames;var Io=Object.getPrototypeOf,Lo=Object.prototype.hasOwnProperty;var Do=(t,e,r)=>e in t?Ar(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Tr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Oo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ro(e))!Lo.call(t,s)&&s!==r&&Ar(t,s,{get:()=>e[s],enumerable:!(n=Co(e,s))||n.enumerable});return t};var Mo=(t,e,r)=>(r=t!=null?Eo(Io(t)):{},Oo(e||!t||!t.__esModule?Ar(r,"default",{value:t,enumerable:!0}):r,t));var ae=(t,e,r)=>Do(t,typeof e!="symbol"?e+"":e,r);var qn=Tr((ul,Un)=>{var At=1e3,Tt=At*60,Et=Tt*60,mt=Et*24,zo=mt*7,Uo=mt*365.25;Un.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return qo(t);if(r==="number"&&isFinite(t))return e.long?Go(t):Ho(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function qo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Uo;case"weeks":case"week":case"w":return r*zo;case"days":case"day":case"d":return r*mt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Et;case"minutes":case"minute":case"mins":case"min":case"m":return r*Tt;case"seconds":case"second":case"secs":case"sec":case"s":return r*At;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ho(t){var e=Math.abs(t);return e>=mt?Math.round(t/mt)+"d":e>=Et?Math.round(t/Et)+"h":e>=Tt?Math.round(t/Tt)+"m":e>=At?Math.round(t/At)+"s":t+"ms"}function Go(t){var e=Math.abs(t);return e>=mt?sr(t,e,mt,"day"):e>=Et?sr(t,e,Et,"hour"):e>=Tt?sr(t,e,Tt,"minute"):e>=At?sr(t,e,At,"second"):t+" ms"}function sr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Gn=Tr((pl,Hn)=>{function Wo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=qn(),r.destroy=u,Object.keys(t).forEach(p=>{r[p]=t[p]}),r.names=[],r.skips=[],r.formatters={};function e(p){let h=0;for(let _=0;_<p.length;_++)h=(h<<5)-h+p.charCodeAt(_),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(p){let h,_=null,v,w;function S(...L){if(!S.enabled)return;let O=S,F=Number(new Date),q=F-(h||F);O.diff=q,O.prev=h,O.curr=F,h=F,L[0]=r.coerce(L[0]),typeof L[0]!="string"&&L.unshift("%O");let E=0;L[0]=L[0].replace(/%([a-zA-Z%])/g,(m,T)=>{if(m==="%%")return"%";E++;let C=r.formatters[T];if(typeof C=="function"){let U=L[E];m=C.call(O,U),L.splice(E,1),E--}return m}),r.formatArgs.call(O,L),(O.log||r.log).apply(O,L)}return S.namespace=p,S.useColors=r.useColors(),S.color=r.selectColor(p),S.extend=n,S.destroy=r.destroy,Object.defineProperty(S,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(v!==r.namespaces&&(v=r.namespaces,w=r.enabled(p)),w),set:L=>{_=L}}),typeof r.init=="function"&&r.init(S),S}function n(p,h){let _=r(this.namespace+(typeof h>"u"?":":h)+p);return _.log=this.log,_}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let h=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of h)_[0]==="-"?r.skips.push(_.slice(1)):r.names.push(_)}function o(p,h){let _=0,v=0,w=-1,S=0;for(;_<p.length;)if(v<h.length&&(h[v]===p[_]||h[v]==="*"))h[v]==="*"?(w=v,S=_,v++):(_++,v++);else if(w!==-1)v=w+1,S++,_=S;else return!1;for(;v<h.length&&h[v]==="*";)v++;return v===h.length}function i(){let p=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),p}function l(p){for(let h of r.skips)if(o(p,h))return!1;for(let h of r.names)if(o(p,h))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Hn.exports=Wo});var Wn=Tr((We,or)=>{We.formatArgs=Yo;We.save=Vo;We.load=Zo;We.useColors=jo;We.storage=Ko();We.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();We.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function jo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Yo(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+or.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}We.log=console.debug||console.log||(()=>{});function Vo(t){try{t?We.storage.setItem("debug",t):We.storage.removeItem("debug")}catch{}}function Zo(){let t;try{t=We.storage.getItem("debug")||We.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Ko(){try{return localStorage}catch{}}or.exports=Gn()(We);var{formatters:Xo}=or.exports;Xo.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Nt=globalThis,rr=Nt.trustedTypes,Tn=rr?rr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Dn="$lit$",lt=`lit$${Math.random().toFixed(9).slice(2)}$`,On="?"+lt,No=`<${On}>`,ht=document,Pt=()=>ht.createComment(""),Ft=t=>t===null||typeof t!="object"&&typeof t!="function",Or=Array.isArray,Po=t=>Or(t)||typeof t?.[Symbol.iterator]=="function",Er=`[ 	
\f\r]`,Mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,En=/-->/g,Cn=/>/g,pt=RegExp(`>|${Er}(?:([^\\s"'>=/]+)(${Er}*=${Er}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Rn=/'/g,In=/"/g,Mn=/^(?:script|style|textarea|title)$/i,Mr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),b=Mr(1),ol=Mr(2),il=Mr(3),gt=Symbol.for("lit-noChange"),ke=Symbol.for("lit-nothing"),Ln=new WeakMap,ft=ht.createTreeWalker(ht,129);function Nn(t,e){if(!Or(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Tn!==void 0?Tn.createHTML(e):e}var Fo=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Mt;for(let l=0;l<r;l++){let a=t[l],u,p,h=-1,_=0;for(;_<a.length&&(i.lastIndex=_,p=i.exec(a),p!==null);)_=i.lastIndex,i===Mt?p[1]==="!--"?i=En:p[1]!==void 0?i=Cn:p[2]!==void 0?(Mn.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=pt):p[3]!==void 0&&(i=pt):i===pt?p[0]===">"?(i=s??Mt,h=-1):p[1]===void 0?h=-2:(h=i.lastIndex-p[2].length,u=p[1],i=p[3]===void 0?pt:p[3]==='"'?In:Rn):i===In||i===Rn?i=pt:i===En||i===Cn?i=Mt:(i=pt,s=void 0);let v=i===pt&&t[l+1].startsWith("/>")?" ":"";o+=i===Mt?a+No:h>=0?(n.push(u),a.slice(0,h)+Dn+a.slice(h)+lt+v):a+lt+(h===-2?l:v)}return[Nn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Bt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[u,p]=Fo(e,r);if(this.el=t.createElement(u,n),ft.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=ft.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Dn)){let _=p[i++],v=s.getAttribute(h).split(lt),w=/([.?@])?(.*)/.exec(_);a.push({type:1,index:o,name:w[2],strings:v,ctor:w[1]==="."?Rr:w[1]==="?"?Ir:w[1]==="@"?Lr:$t}),s.removeAttribute(h)}else h.startsWith(lt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Mn.test(s.tagName)){let h=s.textContent.split(lt),_=h.length-1;if(_>0){s.textContent=rr?rr.emptyScript:"";for(let v=0;v<_;v++)s.append(h[v],Pt()),ft.nextNode(),a.push({type:2,index:++o});s.append(h[_],Pt())}}}else if(s.nodeType===8)if(s.data===On)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(lt,h+1))!==-1;)a.push({type:7,index:o}),h+=lt.length-1}o++}}static createElement(e,r){let n=ht.createElement("template");return n.innerHTML=e,n}};function St(t,e,r=t,n){if(e===gt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Ft(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=St(t,s._$AS(t,e.values),s,n)),e}var Cr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??ht).importNode(r,!0);ft.currentNode=s;let o=ft.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new zt(o,o.nextSibling,this,e):a.type===1?u=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(u=new Dr(o,this,e)),this._$AV.push(u),a=n[++l]}i!==a?.index&&(o=ft.nextNode(),i++)}return ft.currentNode=ht,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},zt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=ke,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=St(this,e,r),Ft(e)?e===ke||e==null||e===""?(this._$AH!==ke&&this._$AR(),this._$AH=ke):e!==this._$AH&&e!==gt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Po(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ke&&Ft(this._$AH)?this._$AA.nextSibling.data=e:this.T(ht.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Bt.createElement(Nn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Cr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=Ln.get(e.strings);return r===void 0&&Ln.set(e.strings,r=new Bt(e)),r}k(e){Or(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Pt()),this.O(Pt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},$t=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=ke,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ke}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=St(this,e,r,0),i=!Ft(e)||e!==this._$AH&&e!==gt,i&&(this._$AH=e);else{let l=e,a,u;for(e=o[0],a=0;a<o.length-1;a++)u=St(this,l[n+a],r,a),u===gt&&(u=this._$AH[a]),i||(i=!Ft(u)||u!==this._$AH[a]),u===ke?e=ke:e!==ke&&(e+=(u??"")+o[a+1]),this._$AH[a]=u}i&&!s&&this.j(e)}j(e){e===ke?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Rr=class extends $t{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ke?void 0:e}},Ir=class extends $t{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ke)}},Lr=class extends $t{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=St(this,e,r,0)??ke)===gt)return;let n=this._$AH,s=e===ke&&n!==ke||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==ke&&(n===ke||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Dr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){St(this,e)}};var Bo=Nt.litHtmlPolyfillSupport;Bo?.(Bt,zt),(Nt.litHtmlVersions??(Nt.litHtmlVersions=[])).push("3.3.1");var de=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new zt(e.insertBefore(Pt(),o),o,void 0,r??{})}return s._$AI(t),s};var nr="today",Pn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Nr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Fn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Bn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function zn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var jn=Mo(Wn(),1);function _e(t){return(0,jn.default)(`beads-ui:${t}`)}function Ze(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Ut(t,e){let r=Ze(t.created_at),n=Ze(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Zn(t,e){let r=Ze(t.created_at),n=Ze(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Kn(t,e){let r=Ze(t.updated_at),n=Ze(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function Xn(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=Ze(t.created_at),o=Ze(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Qn(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var Qo=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Yn(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Vn(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=Qo.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Jn(t,e){let r=Yn(t),n=Yn(e);if(r!==n)return r<n?-1:1;let s=Vn(t),o=Vn(e);if(s!==o)return s<o?-1:1;let i=Ze(t&&t.created_at),l=Ze(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,u=e&&e.id;return a===u?0:String(a)<String(u)?-1:1}var Pr=2**20;function Ct(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-Ze(t&&t.created_at)}function ir(t){return(e,r)=>{let n=Ct(e,t),s=Ct(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Fr(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ct(l,r)-Pr};if(!l)return{rank:Ct(i,r)+Pr};let a=Ct(i,r),u=Ct(l,r),p=(a+u)/2;return a<p&&p<u?{rank:p}:{renormalize:n.map((h,_)=>({bead_id:h.id,rank:_*Pr}))}}function Br(t,e={}){let r=_e(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Ut;function u(){for(let _ of Array.from(i))try{_()}catch{}}function p(){s=Array.from(n.values()).sort(a)}function h(_){if(l||!_||_.id!==t)return;let v=Number(_.revision)||0;if(r("apply %s rev=%d",_.type,v),!(v<=o&&_.type!=="snapshot")){if(_.type==="snapshot"){if(v<=o)return;n.clear();let w=Array.isArray(_.issues)?_.issues:[];for(let S of w)S&&typeof S.id=="string"&&S.id.length>0&&n.set(S.id,S);p(),o=v,u();return}if(_.type==="upsert"){let w=_.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let S=n.get(w.id);if(!S)n.set(w.id,w);else{let L=Number.isFinite(S.updated_at)?S.updated_at:0,O=Number.isFinite(w.updated_at)?w.updated_at:0;if(L<=O){for(let F of Object.keys(S))F in w||delete S[F];for(let[F,q]of Object.entries(w))S[F]=q}}p()}o=v,u()}else if(_.type==="delete"){let w=String(_.issue_id||"");w&&(n.delete(w),p()),o=v,u()}}}return{id:t,subscribe(_){return i.add(_),()=>{i.delete(_)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(_){return n.get(_)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function ar(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function es(t){let e=_e("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let p=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let v of Array.from(u)){let w=r.get(v);if(!w)continue;let S=w.itemsById;for(let L of p)typeof L=="string"&&L.length>0&&S.set(L,!0);for(let L of h)typeof L=="string"&&L.length>0&&S.set(L,!0);for(let L of _)typeof L=="string"&&L.length>0&&S.delete(L)}}async function o(l,a){let u=ar(a);if(e("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==u){let _=n.get(h.key);_&&(_.delete(l),_.size===0&&n.delete(h.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let p=n.get(u);p&&p.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let _=r.get(l)||null;if(_){let v=n.get(_.key);v&&(v.delete(l),v.size===0&&n.delete(_.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,u);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let _=n.get(h.key);_&&(_.delete(l),_.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ar,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=r.get(l);return u?u.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),u={};if(!a)return u;for(let p of a.itemsById.keys())u[p]=!0;return u}}}}function ts(){let t=_e("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,u,p){let h=u?ar(u):"",_=r.get(a)||"",v=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,_),v&&_&&h&&_!==h){let w=e.get(a);if(w)try{w.dispose()}catch{}let S=s.get(a);if(S){try{S()}catch{}s.delete(a)}let L=Br(a,p);e.set(a,L);let O=L.subscribe(()=>o());s.set(a,O)}else if(!v){let w=Br(a,p);e.set(a,w);let S=w.subscribe(()=>o());s.set(a,S)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let u=e.get(a);u&&(u.dispose(),e.delete(a));let p=s.get(a);if(p){try{p()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let u=e.get(a);return u?u.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function rs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ns(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function zr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function Jo(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ei(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function ss(t){let e=_e("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Jo(n),i=ei(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=zr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?zr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ti=Object.freeze({workspace_config:{default_workspace:null}});function os(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:ti.workspace_config.default_workspace}}}function is(t={}){let e=_e("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:os(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?os(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((u,p)=>u!==r.workspace.hidden[p]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,p)=>u===r.worker.show_closed_children[p])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function as(t){let e=_e("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let u=r>0;t.toggleAttribute("hidden",!u),t.setAttribute("aria-busy",u?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?e("done called but count was already %d",u):e("done count=%d\u2192%d",u,r),o()}function a(u){return async(h,_)=>{let v=s++,w=Date.now();n.set(v,{type:h,start_ts:w}),e("request start id=%d type=%s count=%d",v,h,r+1),i();let S=!1,L=()=>{S||(S=!0,n.delete(v),l())},O=setTimeout(()=>{S||(e("request TIMEOUT id=%d type=%s elapsed=%dms",v,h,Date.now()-w),L())},3e4);try{let F=await u(h,_),q=Date.now()-w;return e("request done id=%d type=%s elapsed=%dms",v,h,q),F}catch(F){let q=Date.now()-w;throw e("request error id=%d type=%s elapsed=%dms err=%o",v,h,q,F),F}finally{clearTimeout(O),L()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([p,h])=>({id:p,type:h.type,elapsed_ms:u-h.start_ts}))}}}function le(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function lr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Qn),a;switch(l){case"created_desc":return a.sort(Ut),a;case"created_asc":return a.sort(Zn),a;case"updated_desc":return a.sort(Kn),a;case"priority":return a.sort(Xn),a;case"manual":default:{let u=r();return u?a.sort(ir(u)):a.sort(Ut),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function cr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let u=r.get()||{revision:0,order:{}},p=n(Fr(l,a,u.order),i);s(u,p);let h=await e("ui-order-set",{expected_revision:u.revision,entries:p});if(h&&h.conflict){let _={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(_);let v=n(Fr(l,a,_.order),i);s(_,v);let w=await e("ui-order-set",{expected_revision:_.revision,entries:v});w&&w.applied&&r.set({revision:typeof w.revision=="number"?w.revision:0,order:w.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function dr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Ur(t,e){return!e||typeof t!="string"||t.length===0||dr(e.visible_labels).includes(t)?!0:dr(e.hidden_labels).includes(t)?!1:!dr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function ls(t,e){return dr(t).filter(r=>Ur(r,e))}function bt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function qr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Rt(t){let e=qr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Hr(t,e){let r=qr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var ri={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},ni={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},si={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},oi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function ii(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function ai(t,e,r){let n=ri[t]||t,s=e&&e.state||"empty",o=oi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return b`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${ni[t]||t}
      </div>
    </div>
  `}function cs(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=si[r],s=t.stages,o=ii(n,s,String(e||"open"));return b`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>ai(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function li(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var ds=2;function ci(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(b`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,ds).join(", "),s=r.length-ds,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(b`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function di(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&bt(r,"route")&&s.push(b`<span class="ctl-chip ctl-chip--route">${n.route}</span>`),n.fast_track&&bt(r,"fast_track")&&s.push(b`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&bt(r,"pr")){let o=n.pr.number;s.push(b`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of ls(t.labels,r))s.push(b`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&bt(r,"from")&&s.push(b`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),bt(r,"blocked")&&s.push(...ci(t.blocked_info)),s.length===0?"":b`<div class="board-card__chips">${s}</div>`}function ui(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function pi(t){let e=Hr(t.created_at),r=Hr(t.updated_at);return!e&&!r?"":b`<span class="board-card__times">
    ${e?b`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Rt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?b`<span class="board-card__time-sep">·</span>`:""}
    ${r?b`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Rt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function fi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(Jn):r.children;return b`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?b`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:b`<span class="board-card__roll-none">children 없음</span>`}
        ${pi(t)}
      </div>
      ${n>0&&r.current?b`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?b`<div class="board-card__roll-list">
            ${o.map((i,l)=>b`<button
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
  `}function us(t,e){let r=li(t.priority);return b`
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
        ${r?b`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${di(t,e)}
      ${t.workflow&&bt(e.policy||null,"stepper")?cs(t.workflow,t.status):""}
      ${fi(t,e)}
    </article>
  `}function _t(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return b`
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
        ${n?b`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${Pn.map(o=>b`<option
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
  `}var hi=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],gi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],mi=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function bi(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return b`
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
      ${r.label_menu_open?b`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?b`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>b`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?b`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ps(t,e,r){return b`
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
        ${hi.map(n=>b`<option
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
        ${gi.map(n=>b`<option
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
        ${mi.map(n=>b`<option
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
  `}var _i=200,yi={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},ki=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),fs="beads-ui.board.sort",hs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function wi(){try{let t=window.localStorage.getItem(fs);if(t&&hs.has(t))return t}catch{}return"created_desc"}function gs(t,e){let r=_e("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,u=e.onNewIssue,p=e.closedRange||nr,h=s?lr(s,i):null,_=cr({transport:o,uiOrderStore:i}),v=[],w=[],S=[],L=[],O=[],F=[],q=!1,E=0,y=wi(),m=new Map,T=new Map,C=new Map,U=new Set,j={search:"",priority:"",type:"",labels:[]},V=!1,Z=null;function Re(c){return String(c.status||"open")==="open"}function $e(c){let k=String(c.status||"open");return k==="open"||k==="blocked"}function Ae(c){let k=j.search.trim().toLowerCase(),x=j.priority,R=j.type,P=j.labels;return c.filter(Q=>{if(k){let te=String(Q.id||"").toLowerCase(),pe=String(Q.title||"").toLowerCase();if(!te.includes(k)&&!pe.includes(k))return!1}if(x!==""&&String(Q.priority)!==x||R!==""&&String(Q.issue_type||"")!==R)return!1;if(P.length>0){let te=Array.isArray(Q.labels)?Q.labels:[];if(!P.some(pe=>te.includes(pe)))return!1}return!0})}function je(){let c=new Set;for(let k of[v,w,S,L,O,F])for(let x of k){let R=Array.isArray(x.labels)?x.labels:[];for(let P of R)typeof P=="string"&&P.length>0&&c.add(P)}return Array.from(c).sort()}function we(){return j.search.trim()!==""||j.priority!==""||j.type!==""||j.labels.length>0}function ge(){try{if(h){let c=h.selectBoardColumn("tab:board:in-progress","in_progress",y),k=h.selectBoardColumn("tab:board:blocked","blocked",y).filter($e),x=new Set(c.map(G=>G.id)),R=h.selectBoardColumn("tab:board:ready","ready",y).filter(G=>Re(G)&&!x.has(G.id)),P=h.selectBoardColumn("tab:board:resolved","resolved",y),Q=h.selectBoardColumn("tab:board:deferred","deferred",y),te=q?Q:[],pe=h.selectBoardColumn("tab:board:closed","closed").slice(0,_i),W=[...k,...R,...c,...P,...te,...pe];Ue(W);let oe=new Set;for(let G of W)G&&G.id&&!Gr(G)&&oe.add(G.id);let xe=!we();v=xe?It(k,oe):k,w=xe?It(R,oe):R,S=xe?It(c,oe):c,L=xe?It(P,oe):P,O=xe?It(te,oe):te,E=Q.length,F=xe?It(pe,oe):pe,m=new Map;for(let G of v)m.set(G.id,"open");for(let G of w)m.set(G.id,"open");for(let G of S)m.set(G.id,"in_progress");for(let G of L)m.set(G.id,"resolved");for(let G of O)m.set(G.id,"deferred");for(let G of F)m.set(G.id,"closed");T=new Map;for(let G of v)T.set(G.id,"blocked-col");for(let G of w)T.set(G.id,"ready-col");for(let G of S)T.set(G.id,"in-progress-col");for(let G of L)T.set(G.id,"resolved-col");for(let G of O)T.set(G.id,"deferred-col");for(let G of F)T.set(G.id,"closed-col")}D()}catch{v=[],w=[],S=[],L=[],O=[],F=[],C=new Map,D()}}function Ue(c){let k=new Map;for(let R of c)R&&R.id&&!k.has(R.id)&&k.set(R.id,R);let x=new Map;for(let R of k.values()){let P=Gr(R);if(!P)continue;let Q=x.get(P);Q||(Q=[],x.set(P,Q)),Q.push({id:R.id,title:R.title,status:R.status,metadata:R.metadata,created_at:R.created_at})}C=x}function Ye(c){let k=C.get(c)||[],x=0,R=null;for(let P of k)(P.status==="resolved"||P.status==="closed")&&(x+=1),!R&&P.status==="in_progress"&&(R=P);return{total:k.length,count:x,current:R,children:k}}function ne(c){return!U.has(c)}function $(c,k){c.preventDefault(),c.stopPropagation(),U.has(k)?U.delete(k):U.add(k),D()}function I(c,k){c.preventDefault(),c.stopPropagation(),n(k)}function Y(c,k){c.preventDefault(),c.stopPropagation(),n(k)}function N(c,k){Z||n(k)}function J(c,k){c.preventDefault(),c.stopPropagation(),vi(k).then(x=>{x&&le("\uBCF5\uC0AC\uB428","success",1200)})}function ue(c,k){Z=k,c.dataTransfer&&(c.dataTransfer.setData("text/plain",k),c.dataTransfer.effectAllowed="move"),c.target.classList.add("board-card--dragging")}function ce(c){c.target.classList.remove("board-card--dragging"),tt(),setTimeout(()=>{Z=null},0)}function fe(c){let k=String(c.target.value||"");!k||k===p||(p=k,a&&a(k),D())}let se={onCardClick:N,onCopyId:J,onDragStart:ue,onDragEnd:ce,onClosedRangeChange:fe,rollupFor:Ye,isExpanded:ne,onRollupToggle:$,onChildClick:I,onFromChipClick:Y,get policy(){return l?l.get():null}};function Ie(c){let k=c.target,x=t.querySelector(".board-filter__labels");k&&x&&x.contains(k)||Oe()}function De(c){c.key==="Escape"&&Oe()}function Te(){V||(V=!0,document.addEventListener("mousedown",Ie),document.addEventListener("keydown",De),D())}function Oe(){V&&(V=!1,document.removeEventListener("mousedown",Ie),document.removeEventListener("keydown",De),D())}let Ee={onSearchInput(c){j.search=String(c.target.value||""),ge()},onPriorityChange(c){j.priority=String(c.target.value||""),ge()},onTypeChange(c){j.type=String(c.target.value||""),ge()},onSortChange(c){let k=String(c.target.value||"");if(!(!hs.has(k)||k===y)){y=k;try{window.localStorage.setItem(fs,k)}catch{}ge()}},onDeferredToggle(){q=!q,ge()},onLabelMenuToggle(){V?Oe():Te()},onLabelToggle(c){let k=j.labels.indexOf(c);k===-1?j.labels.push(c):j.labels.splice(k,1),ge()},onLabelClear(){j.labels.length!==0&&(j.labels=[],ge())},onNewIssue(){u&&u()}};function Me(){let c=q?"board-root board-root--deferred":"board-root";return b`
      <div class="board-view">
        ${ps(j,Ee,{sort_mode:y,show_deferred:q,deferred_count:E,label_options:je(),label_menu_open:V})}
        <div class=${c}>
          ${_t({title:"Blocked",id:"blocked-col",items:Ae(v)},se)}
          ${_t({title:"Ready",id:"ready-col",items:Ae(w)},se)}
          ${_t({title:"In progress",id:"in-progress-col",items:Ae(S)},se)}
          ${_t({title:"Resolved",id:"resolved-col",items:Ae(L)},se)}
          ${q?_t({title:"Deferred",id:"deferred-col",items:Ae(O)},se):""}
          ${_t({title:"Closed",id:"closed-col",items:Ae(F),is_closed:!0,closed_range:p},se)}
        </div>
      </div>
    `}function D(){de(Me(),t),me()}function me(){try{let c=Array.from(t.querySelectorAll(".board-column"));for(let k of c)Array.from(k.querySelectorAll(".board-card")).forEach((R,P)=>{R.tabIndex=P===0?0:-1})}catch{}}async function ve(c,k){if(!o){le("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:c,status:k}),le("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(x){r("update-status failed: %o",x),le("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function qe(c){switch(c){case"blocked-col":return v;case"ready-col":return w;case"in-progress-col":return S;case"resolved-col":return L;case"deferred-col":return O;default:return[]}}function Je(c,k,x){if(!o||!i)return;let R=qe(c),P=R.find(oe=>oe.id===k);if(!P)return;let Q=R.filter(oe=>oe.id!==k),te=x.closest?x.closest(".board-card"):null,pe=Q.length;if(te){let oe=te.getAttribute("data-issue-id");if(oe===k)return;let xe=Q.findIndex(G=>G.id===oe);xe>=0&&(pe=xe)}let W=Q.slice();W.splice(pe,0,P),_.applyReorder(k,W,pe)}function tt(){for(let c of Array.from(t.querySelectorAll(".board-column--drag-over")))c.classList.remove("board-column--drag-over")}let ye=null;t.addEventListener("dragover",c=>{c.preventDefault(),c.dataTransfer&&(c.dataTransfer.dropEffect="move");let x=c.target.closest(".board-column");x&&x!==ye&&(ye&&ye.classList.remove("board-column--drag-over"),x.classList.add("board-column--drag-over"),ye=x)}),t.addEventListener("dragleave",c=>{let k=c.relatedTarget;(!k||!t.contains(k))&&ye&&(ye.classList.remove("board-column--drag-over"),ye=null)}),t.addEventListener("drop",c=>{c.preventDefault(),ye&&(ye.classList.remove("board-column--drag-over"),ye=null);let k=c.target,x=k.closest(".board-column");if(!x)return;let R=c.dataTransfer?.getData("text/plain")||"";if(!R)return;let P=x.id,Q=T.get(R);if(Q&&Q===P){if(ki.has(P)){if(y!=="manual"){le("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Je(P,R,k)}return}let te=yi[P];if(!te){le("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}m.get(R)!==te&&ve(R,te)}),t.addEventListener("keydown",c=>{let k=c.target;if(!(k instanceof HTMLElement))return;let x=String(k.tagName||"").toLowerCase();if(x==="input"||x==="textarea"||x==="select"||x==="button"||x==="a"||k.isContentEditable===!0)return;let R=k.closest(".board-card");if(!R)return;let P=String(c.key||"");if(P==="Enter"||P===" "){c.preventDefault();let W=R.getAttribute("data-issue-id");W&&n(W);return}if(P!=="ArrowUp"&&P!=="ArrowDown"&&P!=="ArrowLeft"&&P!=="ArrowRight")return;c.preventDefault();let Q=R.closest(".board-column");if(!Q)return;let te=Array.from(Q.querySelectorAll(".board-card")),pe=te.indexOf(R);if(P==="ArrowDown"&&pe<te.length-1){He(R,te[pe+1]);return}if(P==="ArrowUp"&&pe>0){He(R,te[pe-1]);return}if(P==="ArrowLeft"||P==="ArrowRight"){let W=Array.from(t.querySelectorAll(".board-column")),oe=W.indexOf(Q),xe=P==="ArrowRight"?1:-1,G=oe+xe;for(;G>=0&&G<W.length;){let at=W[G].querySelector(".board-card");if(at){He(R,at);return}G+=xe}}});function He(c,k){try{c.tabIndex=-1,k.tabIndex=0,k.focus()}catch{}}let Ne=null;h&&h.subscribe&&(Ne=h.subscribe(()=>{try{ge()}catch{}}));let ie=null;return l&&l.subscribe&&(ie=l.subscribe(()=>{try{ge()}catch{}})),{async load(){r("load"),ge()},clear(){Oe(),Ne&&(Ne(),Ne=null),ie&&(ie(),ie=null),t.replaceChildren(),v=[],w=[],S=[],L=[],O=[],F=[],m=new Map,T=new Map}}}function Gr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function It(t,e){return t.filter(r=>{let n=Gr(r);return!(n&&e.has(n))})}async function vi(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}var xi={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Si=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,$i=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ct(t){return!!t&&typeof t=="object"}function Wr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function ms(t,e){let r=Wr(t),n=Wr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Ai(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ct(s)&&typeof s.text=="string"?s.text:"").join(""):ct(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Ti(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:xi[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Wr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=ms(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=ms(ct(l)?l.old_string:"",ct(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function bs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Si.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:$i.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ei(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ct(o)){if(o.type==="text"&&typeof o.text=="string")s.push(bs(o.text));else if(o.type==="tool_use"){let i=Ti(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ct(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Ai(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Ci(t){if(t.type==="item.completed"&&ct(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[bs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Ri(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function _s(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ct(o))continue;let i=Ri(o)?Ci(o):Ei(o,r);for(let l of i)e.push(l)}return e}function ur(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,u=null;function p(){if(!o||!n)return[];let y=n.get(o);return _s(y?y.lines:[])}function h(y,m){if(m.kind==="gate")return b`<div class="sv__gate">${m.text}</div>`;if(m.kind==="phase")return b`<div class="sv__phase">${m.text}</div>`;if(m.kind==="result")return b`<div
        class="sv__result${m.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${m.success?"\u2713":"\u2717"}
        ${m.text||(m.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(m.kind==="error")return b`<div class="sv__error">⛔ ${m.text}</div>`;if(m.kind==="blocker")return b`<div class="sv__error">⛔ ${m.text}</div>`;if(m.kind==="tool"){let T=a.has(y),C=m.tool==="Bash"?m.command:m.path||m.command||"";return b`<div
        class="sv__tool${T?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>L(y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${m.icon}</span>
          <span class="sv__tool-name">${m.tool}</span>
          ${C?b`<span class="sv__tool-detail">${C}</span>`:""}
          ${typeof m.added=="number"?b`<span class="sv__diff-add">+${m.added}</span>`:""}
          ${typeof m.removed=="number"?b`<span class="sv__diff-del">−${m.removed}</span>`:""}
          ${m.result?b`<span class="sv__tool-ok">→ ${m.result}</span>`:""}
        </span>
        ${T?b`<pre class="sv__tool-expand">${_(m)}</pre>`:""}
      </div>`}return b`<div class="sv__as">${m.text}</div>`}function _(y){let m=[];if(y.input!==void 0)try{m.push(`input: ${JSON.stringify(y.input,null,2)}`)}catch{}return typeof y.output=="string"&&y.output.length>0&&m.push(`output:
${y.output}`),m.join(`

`)}function v(){if(!o)return b``;let y=p(),m=[i.runner,i.model,i.effort,i.worktree].filter(Boolean).join(" \xB7 ");return b`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${m?b`<span class="sv__meta">${m}</span>`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          @click=${O}
        >
          ⇣ 라이브 따라가기 ${l?"ON":"OFF"}
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>E()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${y.length===0?b`<div class="sv__empty">세션 로그 없음</div>`:y.map((T,C)=>h(C,T))}
      </div>
    </div>`}function w(){de(v(),t),l&&S()}function S(){let y=t.querySelector(".sv__body");y&&(y.scrollTop=y.scrollHeight)}function L(y){a.has(y)?a.delete(y):a.add(y),w()}function O(){l=!l,w()}function F(y){let m=y.target;if(!m||!m.classList||!m.classList.contains("sv__body"))return;!(m.scrollHeight-m.scrollTop-m.clientHeight<=4)&&l&&(l=!1,w())}t.addEventListener("scroll",F,!0);function q(y){let m=y&&y.attempt_id;m&&(o=m,i=y.meta||{},l=!0,a.clear(),!u&&n&&(u=n.subscribe(w)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),w())}function E(){let y=o;o=null,a.clear(),r&&y&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${y}`})).catch(()=>{}),de(b``,t),s&&s()}return{open:q,close:E,isOpen(){return o!==null},destroy(){u&&(u(),u=null),t.removeEventListener("scroll",F,!0),o=null,de(b``,t)}}}function Ii(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function ys(t,e){let r=Ii(t);return b`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?b`<div class="detail-empty">산출물 없음</div>`:b`
          ${r.map(n=>b`<div class="detail-art">
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
  `}var Li=["claude","codex","ccx"],ks={claude:["opus","sonnet","haiku","fable"],codex:["gpt-5.6","gpt-5.4"],ccx:["opus","sonnet","haiku","fable"]},Di=["low","medium","high","xhigh"],Oi=["codex","opus","fable","self","skip"],Mi=["opus","fable","sonnet","haiku"],Ni=["standard","fast_track"];function Pi(t){return ks[String(t||"claude")]||ks.claude}function Lt(t,e,r,n,s,o){return b`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>b`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function Dt(t,e=!0){let r=t.map(n=>({value:n,label:n}));return e?[{value:"",label:"(\uAE30\uBCF8)"},...r]:r}function ws(t,e){let r=t&&t.metadata||{},n=r.worker_runner||"",s=r.workflow_mode==="fast_track"?"fast_track":"standard";return b`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Lt("worker_runner","worker_runner",Dt(Li),n,!!n,e)}
    ${Lt("orchestration_model","orchestration_model",Dt(Pi(n)),r.orchestration_model||"",!1,e)}
    ${Lt("orchestration_effort","orchestration_effort",Dt(Di),r.orchestration_effort||"",!1,e)}
    ${Lt("review_model","review_model",Dt(Oi),r.review_model||"",!1,e)}
    ${Lt("impl_model","impl_model",Dt(Mi),r.impl_model||"",!1,e)}
    ${Lt("workflow_mode","workflow_mode",Dt(Ni,!1),s,r.workflow_mode==="fast_track",e)}
  `}var{entries:Rs,setPrototypeOf:vs,isFrozen:Fi,getPrototypeOf:Bi,getOwnPropertyDescriptor:zi}=Object,{freeze:Fe,seal:Ve,create:Qr}=Object,{apply:Jr,construct:en}=typeof Reflect<"u"&&Reflect;Fe||(Fe=function(e){return e});Ve||(Ve=function(e){return e});Jr||(Jr=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});en||(en=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var pr=Be(Array.prototype.forEach),Ui=Be(Array.prototype.lastIndexOf),xs=Be(Array.prototype.pop),qt=Be(Array.prototype.push),qi=Be(Array.prototype.splice),hr=Be(String.prototype.toLowerCase),jr=Be(String.prototype.toString),Yr=Be(String.prototype.match),Ht=Be(String.prototype.replace),Hi=Be(String.prototype.indexOf),Gi=Be(String.prototype.trim),Ke=Be(Object.prototype.hasOwnProperty),Pe=Be(RegExp.prototype.test),Gt=Wi(TypeError);function Be(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Jr(t,e,n)}}function Wi(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return en(t,r)}}function X(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:hr;vs&&vs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Fi(e)||(e[n]=o),s=o)}t[s]=!0}return t}function ji(t){for(let e=0;e<t.length;e++)Ke(t,e)||(t[e]=null);return t}function ot(t){let e=Qr(null);for(let[r,n]of Rs(t))Ke(t,r)&&(Array.isArray(n)?e[r]=ji(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=ot(n):e[r]=n);return e}function Wt(t,e){for(;t!==null;){let n=zi(t,e);if(n){if(n.get)return Be(n.get);if(typeof n.value=="function")return Be(n.value)}t=Bi(t)}function r(){return null}return r}var Ss=Fe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Vr=Fe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Zr=Fe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Yi=Fe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Kr=Fe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Vi=Fe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),$s=Fe(["#text"]),As=Fe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Xr=Fe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ts=Fe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),fr=Fe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Zi=Ve(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ki=Ve(/<%[\w\W]*|[\w\W]*%>/gm),Xi=Ve(/\$\{[\w\W]*/gm),Qi=Ve(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ji=Ve(/^aria-[\-\w]+$/),Is=Ve(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ea=Ve(/^(?:\w+script|data):/i),ta=Ve(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ls=Ve(/^html$/i),ra=Ve(/^[a-z][.\w]*(-[.\w]+)+$/i),Es=Object.freeze({__proto__:null,ARIA_ATTR:Ji,ATTR_WHITESPACE:ta,CUSTOM_ELEMENT:ra,DATA_ATTR:Qi,DOCTYPE_NAME:Ls,ERB_EXPR:Ki,IS_ALLOWED_URI:Is,IS_SCRIPT_OR_DATA:ea,MUSTACHE_EXPR:Zi,TMPLIT_EXPR:Xi}),jt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},na=function(){return typeof window>"u"?null:window},sa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Cs=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ds(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:na(),e=B=>Ds(B);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==jt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:_,trustedTypes:v}=t,w=a.prototype,S=Wt(w,"cloneNode"),L=Wt(w,"remove"),O=Wt(w,"nextSibling"),F=Wt(w,"childNodes"),q=Wt(w,"parentNode");if(typeof i=="function"){let B=r.createElement("template");B.content&&B.content.ownerDocument&&(r=B.content.ownerDocument)}let E,y="",{implementation:m,createNodeIterator:T,createDocumentFragment:C,getElementsByTagName:U}=r,{importNode:j}=n,V=Cs();e.isSupported=typeof Rs=="function"&&typeof q=="function"&&m&&m.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Z,ERB_EXPR:Re,TMPLIT_EXPR:$e,DATA_ATTR:Ae,ARIA_ATTR:je,IS_SCRIPT_OR_DATA:we,ATTR_WHITESPACE:ge,CUSTOM_ELEMENT:Ue}=Es,{IS_ALLOWED_URI:Ye}=Es,ne=null,$=X({},[...Ss,...Vr,...Zr,...Kr,...$s]),I=null,Y=X({},[...As,...Xr,...Ts,...fr]),N=Object.seal(Qr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),J=null,ue=null,ce=Object.seal(Qr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),fe=!0,se=!0,Ie=!1,De=!0,Te=!1,Oe=!0,Ee=!1,Me=!1,D=!1,me=!1,ve=!1,qe=!1,Je=!0,tt=!1,ye="user-content-",He=!0,Ne=!1,ie={},c=null,k=X({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),x=null,R=X({},["audio","video","img","source","image","track"]),P=null,Q=X({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),te="http://www.w3.org/1998/Math/MathML",pe="http://www.w3.org/2000/svg",W="http://www.w3.org/1999/xhtml",oe=W,xe=!1,G=null,at=X({},[te,pe,W],jr),wt=X({},["mi","mo","mn","ms","mtext"]),vt=X({},["annotation-xml"]),xr=X({},["title","style","font","a","script"]),rt=null,Ot=["application/xhtml+xml","text/html"],er="text/html",f=null,g=null,H=r.createElement("form"),z=function(d){return d instanceof RegExp||d instanceof Function},K=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(g&&g===d)){if((!d||typeof d!="object")&&(d={}),d=ot(d),rt=Ot.indexOf(d.PARSER_MEDIA_TYPE)===-1?er:d.PARSER_MEDIA_TYPE,f=rt==="application/xhtml+xml"?jr:hr,ne=Ke(d,"ALLOWED_TAGS")?X({},d.ALLOWED_TAGS,f):$,I=Ke(d,"ALLOWED_ATTR")?X({},d.ALLOWED_ATTR,f):Y,G=Ke(d,"ALLOWED_NAMESPACES")?X({},d.ALLOWED_NAMESPACES,jr):at,P=Ke(d,"ADD_URI_SAFE_ATTR")?X(ot(Q),d.ADD_URI_SAFE_ATTR,f):Q,x=Ke(d,"ADD_DATA_URI_TAGS")?X(ot(R),d.ADD_DATA_URI_TAGS,f):R,c=Ke(d,"FORBID_CONTENTS")?X({},d.FORBID_CONTENTS,f):k,J=Ke(d,"FORBID_TAGS")?X({},d.FORBID_TAGS,f):ot({}),ue=Ke(d,"FORBID_ATTR")?X({},d.FORBID_ATTR,f):ot({}),ie=Ke(d,"USE_PROFILES")?d.USE_PROFILES:!1,fe=d.ALLOW_ARIA_ATTR!==!1,se=d.ALLOW_DATA_ATTR!==!1,Ie=d.ALLOW_UNKNOWN_PROTOCOLS||!1,De=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=d.SAFE_FOR_TEMPLATES||!1,Oe=d.SAFE_FOR_XML!==!1,Ee=d.WHOLE_DOCUMENT||!1,me=d.RETURN_DOM||!1,ve=d.RETURN_DOM_FRAGMENT||!1,qe=d.RETURN_TRUSTED_TYPE||!1,D=d.FORCE_BODY||!1,Je=d.SANITIZE_DOM!==!1,tt=d.SANITIZE_NAMED_PROPS||!1,He=d.KEEP_CONTENT!==!1,Ne=d.IN_PLACE||!1,Ye=d.ALLOWED_URI_REGEXP||Is,oe=d.NAMESPACE||W,wt=d.MATHML_TEXT_INTEGRATION_POINTS||wt,vt=d.HTML_INTEGRATION_POINTS||vt,N=d.CUSTOM_ELEMENT_HANDLING||{},d.CUSTOM_ELEMENT_HANDLING&&z(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(N.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&z(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(N.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(N.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(se=!1),ve&&(me=!0),ie&&(ne=X({},$s),I=[],ie.html===!0&&(X(ne,Ss),X(I,As)),ie.svg===!0&&(X(ne,Vr),X(I,Xr),X(I,fr)),ie.svgFilters===!0&&(X(ne,Zr),X(I,Xr),X(I,fr)),ie.mathMl===!0&&(X(ne,Kr),X(I,Ts),X(I,fr))),d.ADD_TAGS&&(typeof d.ADD_TAGS=="function"?ce.tagCheck=d.ADD_TAGS:(ne===$&&(ne=ot(ne)),X(ne,d.ADD_TAGS,f))),d.ADD_ATTR&&(typeof d.ADD_ATTR=="function"?ce.attributeCheck=d.ADD_ATTR:(I===Y&&(I=ot(I)),X(I,d.ADD_ATTR,f))),d.ADD_URI_SAFE_ATTR&&X(P,d.ADD_URI_SAFE_ATTR,f),d.FORBID_CONTENTS&&(c===k&&(c=ot(c)),X(c,d.FORBID_CONTENTS,f)),He&&(ne["#text"]=!0),Ee&&X(ne,["html","head","body"]),ne.table&&(X(ne,["tbody"]),delete J.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw Gt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Gt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');E=d.TRUSTED_TYPES_POLICY,y=E.createHTML("")}else E===void 0&&(E=sa(v,s)),E!==null&&typeof y=="string"&&(y=E.createHTML(""));Fe&&Fe(d),g=d}},be=X({},[...Vr,...Zr,...Yi]),tr=X({},[...Kr,...Vi]),Ao=function(d){let A=q(d);(!A||!A.tagName)&&(A={namespaceURI:oe,tagName:"template"});let M=hr(d.tagName),he=hr(A.tagName);return G[d.namespaceURI]?d.namespaceURI===pe?A.namespaceURI===W?M==="svg":A.namespaceURI===te?M==="svg"&&(he==="annotation-xml"||wt[he]):!!be[M]:d.namespaceURI===te?A.namespaceURI===W?M==="math":A.namespaceURI===pe?M==="math"&&vt[he]:!!tr[M]:d.namespaceURI===W?A.namespaceURI===pe&&!vt[he]||A.namespaceURI===te&&!wt[he]?!1:!tr[M]&&(xr[M]||!be[M]):!!(rt==="application/xhtml+xml"&&G[d.namespaceURI]):!1},et=function(d){qt(e.removed,{element:d});try{q(d).removeChild(d)}catch{L(d)}},ut=function(d,A){try{qt(e.removed,{attribute:A.getAttributeNode(d),from:A})}catch{qt(e.removed,{attribute:null,from:A})}if(A.removeAttribute(d),d==="is")if(me||ve)try{et(A)}catch{}else try{A.setAttribute(d,"")}catch{}},_n=function(d){let A=null,M=null;if(D)d="<remove></remove>"+d;else{let Se=Yr(d,/^[\r\n\t ]+/);M=Se&&Se[0]}rt==="application/xhtml+xml"&&oe===W&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");let he=E?E.createHTML(d):d;if(oe===W)try{A=new _().parseFromString(he,rt)}catch{}if(!A||!A.documentElement){A=m.createDocument(oe,"template",null);try{A.documentElement.innerHTML=xe?y:he}catch{}}let Le=A.body||A.documentElement;return d&&M&&Le.insertBefore(r.createTextNode(M),Le.childNodes[0]||null),oe===W?U.call(A,Ee?"html":"body")[0]:Ee?A.documentElement:Le},yn=function(d){return T.call(d.ownerDocument||d,d,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Sr=function(d){return d instanceof h&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof p)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function")},kn=function(d){return typeof l=="function"&&d instanceof l};function nt(B,d,A){pr(B,M=>{M.call(e,d,A,g)})}let wn=function(d){let A=null;if(nt(V.beforeSanitizeElements,d,null),Sr(d))return et(d),!0;let M=f(d.nodeName);if(nt(V.uponSanitizeElement,d,{tagName:M,allowedTags:ne}),Oe&&d.hasChildNodes()&&!kn(d.firstElementChild)&&Pe(/<[/\w!]/g,d.innerHTML)&&Pe(/<[/\w!]/g,d.textContent)||d.nodeType===jt.progressingInstruction||Oe&&d.nodeType===jt.comment&&Pe(/<[/\w]/g,d.data))return et(d),!0;if(!(ce.tagCheck instanceof Function&&ce.tagCheck(M))&&(!ne[M]||J[M])){if(!J[M]&&xn(M)&&(N.tagNameCheck instanceof RegExp&&Pe(N.tagNameCheck,M)||N.tagNameCheck instanceof Function&&N.tagNameCheck(M)))return!1;if(He&&!c[M]){let he=q(d)||d.parentNode,Le=F(d)||d.childNodes;if(Le&&he){let Se=Le.length;for(let Ge=Se-1;Ge>=0;--Ge){let st=S(Le[Ge],!0);st.__removalCount=(d.__removalCount||0)+1,he.insertBefore(st,O(d))}}}return et(d),!0}return d instanceof a&&!Ao(d)||(M==="noscript"||M==="noembed"||M==="noframes")&&Pe(/<\/no(script|embed|frames)/i,d.innerHTML)?(et(d),!0):(Te&&d.nodeType===jt.text&&(A=d.textContent,pr([Z,Re,$e],he=>{A=Ht(A,he," ")}),d.textContent!==A&&(qt(e.removed,{element:d.cloneNode()}),d.textContent=A)),nt(V.afterSanitizeElements,d,null),!1)},vn=function(d,A,M){if(Je&&(A==="id"||A==="name")&&(M in r||M in H))return!1;if(!(se&&!ue[A]&&Pe(Ae,A))){if(!(fe&&Pe(je,A))){if(!(ce.attributeCheck instanceof Function&&ce.attributeCheck(A,d))){if(!I[A]||ue[A]){if(!(xn(d)&&(N.tagNameCheck instanceof RegExp&&Pe(N.tagNameCheck,d)||N.tagNameCheck instanceof Function&&N.tagNameCheck(d))&&(N.attributeNameCheck instanceof RegExp&&Pe(N.attributeNameCheck,A)||N.attributeNameCheck instanceof Function&&N.attributeNameCheck(A,d))||A==="is"&&N.allowCustomizedBuiltInElements&&(N.tagNameCheck instanceof RegExp&&Pe(N.tagNameCheck,M)||N.tagNameCheck instanceof Function&&N.tagNameCheck(M))))return!1}else if(!P[A]){if(!Pe(Ye,Ht(M,ge,""))){if(!((A==="src"||A==="xlink:href"||A==="href")&&d!=="script"&&Hi(M,"data:")===0&&x[d])){if(!(Ie&&!Pe(we,Ht(M,ge,"")))){if(M)return!1}}}}}}}return!0},xn=function(d){return d!=="annotation-xml"&&Yr(d,Ue)},Sn=function(d){nt(V.beforeSanitizeAttributes,d,null);let{attributes:A}=d;if(!A||Sr(d))return;let M={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:I,forceKeepAttr:void 0},he=A.length;for(;he--;){let Le=A[he],{name:Se,namespaceURI:Ge,value:st}=Le,xt=f(Se),$r=st,Ce=Se==="value"?$r:Gi($r);if(M.attrName=xt,M.attrValue=Ce,M.keepAttr=!0,M.forceKeepAttr=void 0,nt(V.uponSanitizeAttribute,d,M),Ce=M.attrValue,tt&&(xt==="id"||xt==="name")&&(ut(Se,d),Ce=ye+Ce),Oe&&Pe(/((--!?|])>)|<\/(style|title|textarea)/i,Ce)){ut(Se,d);continue}if(xt==="attributename"&&Yr(Ce,"href")){ut(Se,d);continue}if(M.forceKeepAttr)continue;if(!M.keepAttr){ut(Se,d);continue}if(!De&&Pe(/\/>/i,Ce)){ut(Se,d);continue}Te&&pr([Z,Re,$e],An=>{Ce=Ht(Ce,An," ")});let $n=f(d.nodeName);if(!vn($n,xt,Ce)){ut(Se,d);continue}if(E&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!Ge)switch(v.getAttributeType($n,xt)){case"TrustedHTML":{Ce=E.createHTML(Ce);break}case"TrustedScriptURL":{Ce=E.createScriptURL(Ce);break}}if(Ce!==$r)try{Ge?d.setAttributeNS(Ge,Se,Ce):d.setAttribute(Se,Ce),Sr(d)?et(d):xs(e.removed)}catch{ut(Se,d)}}nt(V.afterSanitizeAttributes,d,null)},To=function B(d){let A=null,M=yn(d);for(nt(V.beforeSanitizeShadowDOM,d,null);A=M.nextNode();)nt(V.uponSanitizeShadowNode,A,null),wn(A),Sn(A),A.content instanceof o&&B(A.content);nt(V.afterSanitizeShadowDOM,d,null)};return e.sanitize=function(B){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},A=null,M=null,he=null,Le=null;if(xe=!B,xe&&(B="<!-->"),typeof B!="string"&&!kn(B))if(typeof B.toString=="function"){if(B=B.toString(),typeof B!="string")throw Gt("dirty is not a string, aborting")}else throw Gt("toString is not a function");if(!e.isSupported)return B;if(Me||K(d),e.removed=[],typeof B=="string"&&(Ne=!1),Ne){if(B.nodeName){let st=f(B.nodeName);if(!ne[st]||J[st])throw Gt("root node is forbidden and cannot be sanitized in-place")}}else if(B instanceof l)A=_n("<!---->"),M=A.ownerDocument.importNode(B,!0),M.nodeType===jt.element&&M.nodeName==="BODY"||M.nodeName==="HTML"?A=M:A.appendChild(M);else{if(!me&&!Te&&!Ee&&B.indexOf("<")===-1)return E&&qe?E.createHTML(B):B;if(A=_n(B),!A)return me?null:qe?y:""}A&&D&&et(A.firstChild);let Se=yn(Ne?B:A);for(;he=Se.nextNode();)wn(he),Sn(he),he.content instanceof o&&To(he.content);if(Ne)return B;if(me){if(ve)for(Le=C.call(A.ownerDocument);A.firstChild;)Le.appendChild(A.firstChild);else Le=A;return(I.shadowroot||I.shadowrootmode)&&(Le=j.call(n,Le,!0)),Le}let Ge=Ee?A.outerHTML:A.innerHTML;return Ee&&ne["!doctype"]&&A.ownerDocument&&A.ownerDocument.doctype&&A.ownerDocument.doctype.name&&Pe(Ls,A.ownerDocument.doctype.name)&&(Ge="<!DOCTYPE "+A.ownerDocument.doctype.name+`>
`+Ge),Te&&pr([Z,Re,$e],st=>{Ge=Ht(Ge,st," ")}),E&&qe?E.createHTML(Ge):Ge},e.setConfig=function(){let B=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};K(B),Me=!0},e.clearConfig=function(){g=null,Me=!1},e.isValidAttribute=function(B,d,A){g||K({});let M=f(B),he=f(d);return vn(M,he,A)},e.addHook=function(B,d){typeof d=="function"&&qt(V[B],d)},e.removeHook=function(B,d){if(d!==void 0){let A=Ui(V[B],d);return A===-1?void 0:qi(V[B],A,1)[0]}return xs(V[B])},e.removeHooks=function(B){V[B]=[]},e.removeAllHooks=function(){V=Cs()},e}var Os=Ds();var Ms={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ns=t=>(...e)=>({_$litDirective$:t,values:e}),gr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Yt=class extends gr{constructor(e){if(super(e),this.it=ke,e.type!==Ms.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ke||e==null)return this._t=void 0,this.it=e;if(e===gt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Yt.directiveName="unsafeHTML",Yt.resultType=1;var Ps=Ns(Yt);function sn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kt=sn();function Gs(t){kt=t}var Xt={exec:()=>null};function ee(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(ze.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var oa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ze={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},ia=/^(?:[ \t]*(?:\n|$))+/,aa=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,la=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ca=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,on=/(?:[*+-]|\d{1,9}[.)])/,Ws=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,js=ee(Ws).replace(/bull/g,on).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),da=ee(Ws).replace(/bull/g,on).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),an=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ua=/^[^\n]+/,ln=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,pa=ee(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ln).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),fa=ee(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,on).getRegex(),wr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",cn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ha=ee("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",cn).replace("tag",wr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ys=ee(an).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wr).getRegex(),ga=ee(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ys).getRegex(),dn={blockquote:ga,code:aa,def:pa,fences:la,heading:ca,hr:Qt,html:ha,lheading:js,list:fa,newline:ia,paragraph:Ys,table:Xt,text:ua},Fs=ee("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wr).getRegex(),ma={...dn,lheading:da,table:Fs,paragraph:ee(an).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Fs).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wr).getRegex()},ba={...dn,html:ee(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",cn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ee(an).replace("hr",Qt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",js).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},_a=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ya=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Vs=/^( {2,}|\\)\n(?!\s*$)/,ka=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,vr=/[\p{P}\p{S}]/u,un=/[\s\p{P}\p{S}]/u,Zs=/[^\s\p{P}\p{S}]/u,wa=ee(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,un).getRegex(),Ks=/(?!~)[\p{P}\p{S}]/u,va=/(?!~)[\s\p{P}\p{S}]/u,xa=/(?:[^\s\p{P}\p{S}]|~)/u,Sa=ee(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",oa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Xs=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,$a=ee(Xs,"u").replace(/punct/g,vr).getRegex(),Aa=ee(Xs,"u").replace(/punct/g,Ks).getRegex(),Qs="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ta=ee(Qs,"gu").replace(/notPunctSpace/g,Zs).replace(/punctSpace/g,un).replace(/punct/g,vr).getRegex(),Ea=ee(Qs,"gu").replace(/notPunctSpace/g,xa).replace(/punctSpace/g,va).replace(/punct/g,Ks).getRegex(),Ca=ee("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zs).replace(/punctSpace/g,un).replace(/punct/g,vr).getRegex(),Ra=ee(/\\(punct)/,"gu").replace(/punct/g,vr).getRegex(),Ia=ee(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),La=ee(cn).replace("(?:-->|$)","-->").getRegex(),Da=ee("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",La).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),_r=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Oa=ee(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",_r).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Js=ee(/^!?\[(label)\]\[(ref)\]/).replace("label",_r).replace("ref",ln).getRegex(),eo=ee(/^!?\[(ref)\](?:\[\])?/).replace("ref",ln).getRegex(),Ma=ee("reflink|nolink(?!\\()","g").replace("reflink",Js).replace("nolink",eo).getRegex(),Bs=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,pn={_backpedal:Xt,anyPunctuation:Ra,autolink:Ia,blockSkip:Sa,br:Vs,code:ya,del:Xt,emStrongLDelim:$a,emStrongRDelimAst:Ta,emStrongRDelimUnd:Ca,escape:_a,link:Oa,nolink:eo,punctuation:wa,reflink:Js,reflinkSearch:Ma,tag:Da,text:ka,url:Xt},Na={...pn,link:ee(/^!?\[(label)\]\((.*?)\)/).replace("label",_r).getRegex(),reflink:ee(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",_r).getRegex()},tn={...pn,emStrongRDelimAst:Ea,emStrongLDelim:Aa,url:ee(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Bs).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ee(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Bs).getRegex()},Pa={...tn,br:ee(Vs).replace("{2,}","*").getRegex(),text:ee(tn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},mr={normal:dn,gfm:ma,pedantic:ba},Vt={normal:pn,gfm:tn,breaks:Pa,pedantic:Na},Fa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},zs=t=>Fa[t];function it(t,e){if(e){if(ze.escapeTest.test(t))return t.replace(ze.escapeReplace,zs)}else if(ze.escapeTestNoEncode.test(t))return t.replace(ze.escapeReplaceNoEncode,zs);return t}function Us(t){try{t=encodeURI(t).replace(ze.percentDecode,"%")}catch{return null}return t}function qs(t,e){let r=t.replace(ze.findPipe,(o,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),n=r.split(ze.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(ze.slashPipe,"|");return n}function Zt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Ba(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Hs(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function za(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var yr=class{constructor(t){ae(this,"options");ae(this,"rules");ae(this,"lexer");this.options=t||kt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Zt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=za(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Zt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Zt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Zt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let u=l.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${p}`:p;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=h,r.length===0)break;let _=o.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let v=_,w=v.raw+`
`+r.join(`
`),S=this.blockquote(w);o[o.length-1]=S,n=n.substring(0,n.length-v.raw.length)+S.raw,s=s.substring(0,s.length-v.text.length)+S.text;break}else if(_?.type==="list"){let v=_,w=v.raw+`
`+r.join(`
`),S=this.list(w);o[o.length-1]=S,n=n.substring(0,n.length-_.raw.length)+S.raw,s=s.substring(0,s.length-v.raw.length)+S.raw,r=w.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,u="",p="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),_=t.split(`
`,1)[0],v=!h.trim(),w=0;if(this.options.pedantic?(w=2,p=h.trimStart()):v?w=e[1].length+1:(w=e[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,p=h.slice(w),w+=e[1].length),v&&this.rules.other.blankLine.test(_)&&(u+=_+`
`,t=t.substring(_.length+1),a=!0),!a){let S=this.rules.other.nextBulletRegex(w),L=this.rules.other.hrRegex(w),O=this.rules.other.fencesBeginRegex(w),F=this.rules.other.headingBeginRegex(w),q=this.rules.other.htmlBeginRegex(w);for(;t;){let E=t.split(`
`,1)[0],y;if(_=E,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),y=_):y=_.replace(this.rules.other.tabCharGlobal,"    "),O.test(_)||F.test(_)||q.test(_)||S.test(_)||L.test(_))break;if(y.search(this.rules.other.nonSpaceChar)>=w||!_.trim())p+=`
`+y.slice(w);else{if(v||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||O.test(h)||F.test(h)||L.test(h))break;p+=`
`+_}!v&&!_.trim()&&(v=!0),u+=E+`
`,t=t.substring(E.length+1),h=y.slice(w)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=p.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!s.loose){let u=a.tokens.filter(h=>h.type==="space"),p=u.length>0&&u.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=p}}if(s.loose)for(let a of s.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=qs(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(qs(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Zt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ba(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Hs(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Hs(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+s);(n=u.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let p=[...n[0]][0].length,h=t.slice(0,s+n.index+p+i);if(Math.min(s,i)%2){let v=h.slice(1,-1);return{type:"em",raw:h,text:v,tokens:this.lexer.inlineTokens(v)}}let _=h.slice(2,-2);return{type:"strong",raw:h,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},Xe=class rn{constructor(e){ae(this,"tokens");ae(this,"options");ae(this,"state");ae(this,"inlineQueue");ae(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||kt,this.options.tokenizer=this.options.tokenizer||new yr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:ze,block:mr.normal,inline:Vt.normal};this.options.pedantic?(r.block=mr.pedantic,r.inline=Vt.pedantic):this.options.gfm&&(r.block=mr.gfm,this.options.breaks?r.inline=Vt.breaks:r.inline=Vt.gfm),this.tokenizer.rules=r}static get rules(){return{block:mr,inline:Vt}}static lex(e,r){return new rn(r).lex(e)}static lexInline(e,r){return new rn(r).inlineTokens(e)}lex(e){e=e.replace(ze.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(ze.tabCharGlobal,"    ").replace(ze.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let u=e;if(this.options.extensions?.startInline){let p=1/0,h=e.slice(1),_;this.options.extensions.startInline.forEach(v=>{_=v.call({lexer:this},h),typeof _=="number"&&_>=0&&(p=Math.min(p,_))}),p<1/0&&p>=0&&(u=e.substring(0,p+1))}if(a=this.tokenizer.inlineText(u)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},kr=class{constructor(t){ae(this,"options");ae(this,"parser");this.options=t||kt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(ze.notSpaceStart)?.[0],s=t.replace(ze.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${it(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Us(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+it(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Us(t);if(s===null)return it(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${it(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:it(t.text)}},fn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},Qe=class nn{constructor(e){ae(this,"options");ae(this,"renderer");ae(this,"textRenderer");this.options=e||kt,this.options.renderer=this.options.renderer||new kr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new fn}static parse(e,r){return new nn(r).parse(e)}static parseInline(e,r){return new nn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},br,Kt=(br=class{constructor(t){ae(this,"options");ae(this,"block");this.options=t||kt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?Xe.lex:Xe.lexInline}provideParser(){return this.block?Qe.parse:Qe.parseInline}},ae(br,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ae(br,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),br),Ua=class{constructor(...t){ae(this,"defaults",sn());ae(this,"options",this.setOptions);ae(this,"parse",this.parseMarkdown(!0));ae(this,"parseInline",this.parseMarkdown(!1));ae(this,"Parser",Qe);ae(this,"Renderer",kr);ae(this,"TextRenderer",fn);ae(this,"Lexer",Xe);ae(this,"Tokenizer",yr);ae(this,"Hooks",Kt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new kr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...u)=>{let p=l.apply(s,u);return p===!1&&(p=a.apply(s,u)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new yr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...u)=>{let p=l.apply(s,u);return p===!1&&(p=a.apply(s,u)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Kt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Kt.passThroughHooks.has(o)?s[i]=u=>{if(this.defaults.async&&Kt.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,u);return a.call(s,h)})();let p=l.call(s,u);return a.call(s,p)}:s[i]=(...u)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,u);return h===!1&&(h=await a.apply(s,u)),h})();let p=l.apply(s,u);return p===!1&&(p=a.apply(s,u)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return Xe.lex(t,e??this.defaults)}parser(t,e){return Qe.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?Xe.lex:Xe.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():t?Qe.parse:Qe.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?Xe.lex:Xe.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?Qe.parse:Qe.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+it(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},yt=new Ua;function re(t,e){return yt.parse(t,e)}re.options=re.setOptions=function(t){return yt.setOptions(t),re.defaults=yt.defaults,Gs(re.defaults),re};re.getDefaults=sn;re.defaults=kt;re.use=function(...t){return yt.use(...t),re.defaults=yt.defaults,Gs(re.defaults),re};re.walkTokens=function(t,e){return yt.walkTokens(t,e)};re.parseInline=yt.parseInline;re.Parser=Qe;re.parser=Qe.parse;re.Renderer=kr;re.TextRenderer=fn;re.Lexer=Xe;re.lexer=Xe.lex;re.Tokenizer=yr;re.Hooks=Kt;re.parse=re;var xc=re.options,Sc=re.setOptions,$c=re.use,Ac=re.walkTokens,Tc=re.parseInline;var Ec=Qe.parse,Cc=Xe.lex;function to(t){let e=re.parse(t),r=Os.sanitize(e);return Ps(r)}function qa(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function ro(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(w){w.key==="Escape"&&s&&(w.preventDefault(),_())}document.addEventListener("keydown",a);function u(){return s?b`
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
            ${o==="loading"?b`<div class="mv__status">불러오는 중…</div>`:o==="error"?b`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:to(i)}
          </div>
        </div>
      </div>
    `:b``}function p(){de(u(),t)}async function h(w){s=w,o="loading",i="",l="",p();let S=r?r():"";if(!S){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let L="/api/doc?workspace="+encodeURIComponent(S)+"&path="+encodeURIComponent(w);try{let O=await n(L),F=await O.json().catch(()=>({}));if(!O.ok||!F||F.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(F&&F.error||O.status)+")",p();return}i=String(F.content||""),o="ready",p()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function _(){s=null,de(b``,t)}function v(){document.removeEventListener("keydown",a),_()}return{open:h,close:_,destroy:v}}var Ha={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ga(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function no(t,e={}){let r=Array.isArray(t)?t:[];return r.length===0?b`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `:b`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(n=>b`<button
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
            <span class="detail-session__time">${Ga(n.started_at)}</span>
          </button>`)}
    </div>
  `}var Wa=["open","in_progress","deferred","resolved","closed"],ja=[0,1,2,3,4];function so(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,u=null,p={},h=!1,_=!1,v="",w="",S="";function L(){h=!1,_=!1,v="",w="",S=""}let O=document.createElement("div");O.className="md-viewer-root",document.body.appendChild(O);let F=ro(O,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),q=document.createElement("div");q.className="session-log-root",document.body.appendChild(q);let E=ur(q,{transport:s?(c,k)=>Promise.resolve(s(c,k)):void 0,sessionLogStore:l});function y(){if(!i||!a)return[];let c=i.get();return(c&&c.attempts?Object.values(c.attempts):[]).filter(x=>x&&x.bead_id===a).sort((x,R)=>(R.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null}))}function m(c){let k=i?i.get():null,x=k&&k.attempts?k.attempts[c]:null;E.open({attempt_id:c,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0}:{}})}let T={onOpen:m},C=null;r&&r.subscribe&&(C=r.subscribe(()=>V()));let U=null;i&&typeof i.subscribe=="function"&&(U=i.subscribe(()=>{a&&ie()}));function j(c){c.key==="Escape"&&a&&(c.preventDefault(),n())}document.addEventListener("keydown",j);function V(){if(a){if(r&&typeof r.snapshotFor=="function"){let c=r.snapshotFor("detail:"+a)||[];u=c.find(x=>x&&x.id===a)||c[0]||u}ie()}}function Z(c){try{navigator.clipboard&&typeof navigator.clipboard.writeText=="function"&&navigator.clipboard.writeText(String(c)).then(()=>le("\uBCF5\uC0AC\uB428","success",1200)).catch(()=>{})}catch{}}function Re(c){c.preventDefault(),c.stopPropagation(),a&&Z(a)}function $e(c,k){c.preventDefault(),c.stopPropagation(),Z(k)}function Ae(c,k){c.preventDefault(),c.stopPropagation(),F.open(k)}function je(c,k){p[c]=k,ie(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:c,value:k})).catch(()=>{le("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function we(c,k,x){if(!s||!a)return!1;try{let R=await Promise.resolve(s(c,k)),P=Array.isArray(R)?R[0]:R;return P&&typeof P=="object"&&P.id?(u=P,!0):(le(x,"error"),!1)}catch{return le(x,"error"),!1}}function ge(c){setTimeout(()=>{try{let k=t.querySelector(c);k&&typeof k.focus=="function"&&k.focus()}catch{}},0)}function Ue(){h=!0,v=u&&u.title||"",ie(),ge('.detail-edit__input[data-edit="title"]')}function Ye(c){v=c.target.value}function ne(){h=!1,v="",ie()}function $(){we("edit-text",{id:a,field:"title",value:v},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&(h=!1,v=""),ie()})}function I(){_=!0,w=u&&u.description||"",ie(),ge('.detail-edit__textarea[data-edit="description"]')}function Y(c){w=c.target.value}function N(){_=!1,w="",ie()}function J(){we("edit-text",{id:a,field:"description",value:w},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&(_=!1,w=""),ie()})}function ue(c,k,x,R){if(c.key==="Escape"){c.stopPropagation(),x();return}c.key==="Enter"&&(!R||c.ctrlKey||c.metaKey)&&(c.preventDefault(),k())}function ce(c){let k=c.target.value;we("update-status",{id:a,status:k},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ie())}function fe(c){let k=Number(c.target.value);we("update-priority",{id:a,priority:k},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ie())}function se(c){S=c.target.value}function Ie(){let c=S.trim();c.length!==0&&we("label-add",{id:a,label:c},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(k=>{k&&(S=""),ie()})}function De(c){if(c.key==="Escape"){c.stopPropagation(),S="",ie();return}c.key==="Enter"&&(c.preventDefault(),Ie())}function Te(c){we("label-remove",{id:a,label:c},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ie())}let Oe={onCopyPath:$e,onOpenDoc:Ae},Ee={onChange:je};function Me(c){return typeof c=="string"?c:c&&typeof c=="object"?String(c.id||c.to||c.issue_id||c.depends_on||""):""}function D(c){switch(c&&typeof c=="object"?String(c.dependency_type||c.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function me(c){let x=(Array.isArray(c.dependencies)?c.dependencies:[]).map(R=>({id:Me(R),icon:D(R)})).filter(R=>R.id.length>0);return b`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?b`<div class="detail-empty">의존성 없음</div>`:b`<div class="detail-deps">
            ${x.map(R=>o?b`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(R.id)}
                  >
                    ${R.icon?`${R.icon} `:""}${R.id}
                  </button>`:b`<span class="detail-dep"
                    >${R.icon?`${R.icon} `:""}${R.id}</span
                  >`)}
          </div>`}
    `}function ve(c){let k=c.metadata||{},x=c.workflow||{},R=x.stages||{},P=R.spec&&R.spec.stale,Q=R.impl&&R.impl.stale;return b`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span class="detail-kv__v">${x.route||k.route||"\u2014"}</span>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${k.spec_review||"\uC5C6\uC74C"}${P?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${k.impl_review||"\uC5C6\uC74C"}${Q?" \xB7 stale":""}</span
        >
      </div>
      ${k.pr_url?b`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${k.pr_url}</span>
          </div>`:""}
    `}function qe(c){return h?b`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${v}
            @input=${Ye}
            @keydown=${k=>ue(k,$,ne,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${$}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${ne}
            >
              취소
            </button>
          </div>
        </div>
      `:b`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${c}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ue}
        >
          ✎
        </button>
      </div>
    `}function Je(c){let k=Rt(c.created_at),x=Rt(c.updated_at);return!k&&!x?b``:b`
      ${k?b`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
      ${x?b`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function tt(c,k){return b`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ce}
        >
          ${Wa.map(x=>b`<option value=${x} ?selected=${x===c}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${fe}
        >
          ${ja.map(x=>b`<option value=${String(x)} ?selected=${x===k}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function ye(c){return b`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${_?"":b`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${I}
            >
              ✎
            </button>`}
      </div>
      ${_?b`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${w}
              @input=${Y}
              @keydown=${k=>ue(k,J,N,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${J}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${N}
              >
                취소
              </button>
            </div>
          </div>`:b`<div class="detail-overlay__desc">
            ${c||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function He(c){let k=Array.isArray(c.labels)?c.labels:[];return b`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${k.map(x=>b`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>Te(x)}
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
            @keydown=${De}
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
    `}function Ne(){if(!a)return b``;let c=u||{},k=String(c.id||a),x=c.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",R=c.status||"open",P=typeof c.priority=="number"?Math.max(0,Math.min(4,c.priority)):"",Q=c.description||"",te={...c,metadata:{...c.metadata||{},...p}};return b`
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
            @click=${Re}
          >
            ${k}
          </button>
          ${qe(x)} ${tt(R,P)}
          ${Je(c)} ${ye(Q)}
          ${He(c)} ${me(c)}
          ${ve(c)}
          ${ys(c,Oe)}
          ${ws(te,Ee)}
          ${no(y(),T)}
        </div>
      </div>
    `}function ie(){de(Ne(),t)}return{load(c){c!==a&&(p={},L()),a=c,u=null,V()},clear(){a=null,u=null,p={},L(),F.close(),E.close(),de(b``,t)},destroy(){C&&(C(),C=null),U&&(U(),U=null),document.removeEventListener("keydown",j),F.destroy(),O.parentNode&&O.parentNode.removeChild(O),E.destroy(),q.parentNode&&q.parentNode.removeChild(q),a=null,u=null,de(b``,t)}}}var Ya=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function oo(t,e){return Ur(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Va(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function io(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(m){let T=r.get();if(T)try{let C=await n("display-policy-set",{expected_revision:T.revision,policy:m(T)});a(C),C&&C.conflict&&C.policy&&(C=await n("display-policy-set",{expected_revision:C.policy.revision,policy:m(C.policy)}),a(C)),C&&C.conflict&&le("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{le("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(m){m&&m.policy&&typeof m.policy=="object"&&r.set(m.policy)}function u(m){let T=r.get();if(!T)return;let C=oo(m,T)!=="shown";l(U=>Va(m,U,C))}function p(){let m=i.trim();m.length!==0&&(i="",l(T=>T.hidden_prefixes.includes(m)?{hidden_prefixes:T.hidden_prefixes}:{hidden_prefixes:[...T.hidden_prefixes,m]}),L())}function h(m){l(T=>({hidden_prefixes:T.hidden_prefixes.filter(C=>C!==m)}))}function _(m){let T=r.get();if(!T)return;let C=T.chips[m]===!1;l(()=>({chips:{[m]:C}}))}function v(m){let T=s();return b`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${T.length===0?b`<div class="display-settings__empty">라벨 없음</div>`:b`<div class="display-settings__pills">
              ${T.map(C=>{let U=oo(C,m);return b`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${U}`}
                  data-label=${C}
                  data-state=${U}
                  @click=${()=>u(C)}
                >
                  ${C}
                </button>`})}
            </div>`}
      </section>
    `}function w(m){return b`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${m.hidden_prefixes.map(T=>b`<span class="display-settings__prefix">
                ${T}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${T} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h(T)}
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
            @input=${T=>{i=String(T.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function S(m){return b`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Ya.map(([T,C])=>b`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${T}
                  .checked=${m.chips[T]!==!1}
                  @change=${()=>_(T)}
                />
                <span>${C}</span>
              </label>`)}
        </div>
      </section>
    `}function L(){let m=r.get();de(b`
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
            ${m?b`${v(m)} ${w(m)}
                ${S(m)}`:b`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let O=!1,F=()=>{O=!1};o.addEventListener("close",F),o.addEventListener("cancel",F);let q=null;r.subscribe&&(q=r.subscribe(()=>{O&&L()}));function E(){O||(i="",O=!0,L(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function y(){O&&(O=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:E,close:y,destroy(){O=!1,o.removeEventListener("close",F),o.removeEventListener("cancel",F),q&&(q(),q=null),o.remove()}}}function ao(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(u,p,h="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let _=typeof h=="string"?h.trim():"";if(s&&(_.length>0?(s.textContent=_,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function lo(t,e,r){let n=_e("views:nav"),s=null;function o(a){return u=>{u.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let u=e.getState().view==="worker"?"worker":"board";return b`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${u==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${u==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
      </div>
    `}function l(){de(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),de(b``,t)}}}var co=["bug","feature","task","epic","chore"];function uo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var po=["Critical","High","Medium","Low","Backlog"];function fo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),_=r.querySelector(".new-issue__close");function v(){o.replaceChildren();let y=document.createElement("option");y.value="",y.textContent="\u2014 Select \u2014",o.appendChild(y);for(let m of co){let T=document.createElement("option");T.value=m,T.textContent=uo(m),o.appendChild(T)}i.replaceChildren();for(let m=0;m<=4;m+=1){let T=document.createElement("option");T.value=String(m);let C=po[m]||"Medium";T.textContent=`${m} \u2013 ${C}`,i.appendChild(T)}}v();function w(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function S(y){s.disabled=y,o.disabled=y,i.disabled=y,l.disabled=y,a.disabled=y,p.disabled=y,h.disabled=y,h.textContent=y?"Creating\u2026":"Create"}function L(){u.textContent=""}function O(y){u.textContent=y}function F(){try{let y=window.localStorage.getItem("beads-ui.new.type");y?o.value=y:o.value="";let m=window.localStorage.getItem("beads-ui.new.priority");m&&/^\d$/.test(m)?i.value=m:i.value="2"}catch{o.value="",i.value="2"}}function q(){let y=o.value||"",m=i.value||"";y.length>0&&window.localStorage.setItem("beads-ui.new.type",y),m.length>0&&window.localStorage.setItem("beads-ui.new.priority",m)}async function E(){L();let y=String(s.value||"").trim();if(y.length===0){O("Title is required"),s.focus();return}let m=Number(i.value||"2");if(!(m>=0&&m<=4)){O("Priority must be 0..4"),i.focus();return}let T=String(o.value||""),C=String(a.value||""),U={title:y};T.length>0&&(U.type=T),String(m).length>0&&(U.priority=m),C.length>0&&(U.description=C),S(!0);try{await e("create-issue",U)}catch{S(!1),O("Failed to create issue");return}q(),S(!1),w()}return r.addEventListener("cancel",y=>{y.preventDefault(),w()}),_.addEventListener("click",()=>w()),p.addEventListener("click",()=>w()),r.addEventListener("keydown",y=>{y.key==="Enter"&&(y.ctrlKey||y.metaKey)&&(y.preventDefault(),E())}),n.addEventListener("submit",y=>{y.preventDefault(),E()}),{open(){n.reset(),L(),F();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){w()}}}function Za(t){let e=t.draggable&&!t.done;return b`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?b`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.reason?b`<span class="worker-mini__reason">${t.reason}</span>`:""}
  </div>`}function Jt(t){return b`<section
    class="worker-pane${t.src?" worker-pane--src":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${t.title}</span>
      <span class="worker-pane__count">${t.items.length}</span>
    </header>
    <div class="worker-pane__body">
      ${t.items.length===0?b`<div class="worker-pane__empty">${t.empty||""}</div>`:t.items.map(e=>Za(e))}
    </div>
  </section>`}function Ka(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function ho(t){return b`<div class="worker-banners">
    ${t.autoAdvance?b`<div class="worker-banner worker-banner--on" role="status">
          ▶ 자동 진행 켜짐 — Serial head 1 + Parallel 슬롯까지 실행합니다.
        </div>`:b`<div class="worker-banner worker-banner--off" role="status">
          ⏸ 자동 진행 꺼짐 — 새 세션을 시작하지 않습니다. ▶로 재개.
        </div>`}
    ${t.breaker?b`<div class="worker-banner worker-banner--breaker" role="alert">
          ⛔ ${t.breaker.repo||"repo"} 세션 실패로 차단 —
          ${t.breaker.reason||""}. 신규 launch·머지 진입 차단, 수동 ▶
          필요.
        </div>`:""}
  </div>`}function Xa(t,e,r=null){let n=t.lane==="serial"?"serial":"\u2225",s=typeof t.started_at=="number"?Ka(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=t.attempt_id&&t.attempt_id===r;return b`<div
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
    ${o?b`<div class="rtile__meta">${o}</div>`:""}
  </div>`}function go(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return b`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?b`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Xa(s,e,r))}
  </div>`}var Qa="tab:worker:ready",Ja="tab:worker:blocked";function el(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function mo(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function hn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l}=e,a=n?lr(n,i):null,u=cr({transport:r,uiOrderStore:i}),p=null,h=[],_=[],v=document.createElement("div");v.className="worker-console";let w=document.createElement("div"),S=document.createElement("div");S.className="worker-drawer-host";let L=document.createElement("div");v.append(w,S,L),t.appendChild(v);let O=null,F=ur(S,{transport:r,sessionLogStore:o,onClose:()=>{O=null,$e()}});function q(){return s&&s.get()||{revision:0,auto_advance:!1,serial:[],parallel:[],done:[]}}function E(){let $=q();return typeof $.revision=="number"?$.revision:0}function y($){$&&$.queue&&s&&s.set($.queue)}async function m($,I,Y){if(!r)return;let N=await r("worker-queue-place",{bead_id:$,lane:I,index:Y,expected_revision:E()});y(N),N&&N.conflict&&await r("worker-queue-place",{bead_id:$,lane:I,index:Y,expected_revision:E()}).then(y)}async function T($,I,Y){if(!r)return;let N=await r("worker-queue-reorder",{bead_id:$,lane:I,to_index:Y,expected_revision:E()});y(N),N&&N.conflict&&await r("worker-queue-reorder",{bead_id:$,lane:I,to_index:Y,expected_revision:E()}).then(y)}async function C($){if(!r)return;let I=await r("worker-queue-remove",{bead_id:$,expected_revision:E()});y(I),I&&I.conflict&&await r("worker-queue-remove",{bead_id:$,expected_revision:E()}).then(y)}async function U($){!r||!$||await r("worker-attempt-stop",{attempt_id:$})}async function j($){if(!r)return;let I=await r("worker-queue-toggle",{on:$,expected_revision:E()});y(I),I&&I.conflict&&await r("worker-queue-toggle",{on:$,expected_revision:E()}).then(y)}function V(){let $=q(),I=a?a.selectBoardColumn(Qa,"ready"):[],Y=a?a.selectBoardColumn(Ja,"blocked"):[],N=new Map;for(let D of[...I,...Y])N.set(D.id,D.title||D.id);let J=new Set([...$.serial.map(D=>D.bead_id),...$.parallel.map(D=>D.bead_id),...$.done.map(D=>D.bead_id)]),ue=new Set(Y.map(D=>D.id)),ce=i?i.get()?.order||{}:{},fe=new Set,se=[];for(let D of[...I,...Y])J.has(D.id)||fe.has(D.id)||(fe.add(D.id),se.push(D));se.sort(ir(ce)),h=se;let Ie=se.map(D=>{let me=el(D),ve;return ue.has(D.id)?ve=me?mo(D):`${mo(D)} \xB7 spec \uC5C6\uC74C`:ve=me?"":"spec \uC5C6\uC74C",{id:D.id,title:D.title||D.id,reason:ve,draggable:me,lane:"candidate"}}),De=(D,me)=>D.map(ve=>({id:ve.bead_id,title:N.get(ve.bead_id)||ve.bead_id,draggable:me!=="done",done:me==="done",lane:me})),Te=new Map;for(let D of $.serial||[])Te.set(D.bead_id,"serial");for(let D of $.parallel||[])Te.set(D.bead_id,"parallel");let Oe=$.attempts?Object.values($.attempts):[],Ee=[],Me=null;for(let D of Oe)D.status==="running"?Ee.push({bead_id:D.bead_id,attempt_id:D.attempt_id,title:N.get(D.bead_id)||D.bead_id,lane:Te.get(D.bead_id)||"parallel",runner:D.runner||null,model:D.model||null,effort:D.effort||null,started_at:typeof D.started_at=="number"?D.started_at:null}):(D.status==="failed"||D.status==="orphaned")&&(Me={repo:D.repo||"",reason:D.cause||D.status});return{queue:$,idToTitle:N,candidates:Ie,running:Ee,breaker:Me,serial:De($.serial,"serial"),parallel:De($.parallel,"parallel"),done:De($.done,"done")}}function Z($){let I=$.serial.length>0?$.serial[0].id:"\u2014";return b`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${$.queue.auto_advance?" is-active":""}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${$.running.length}</b> · serial 다음
          <b>${I}</b></span
        >
        <span class="worker-tgl"
          >parallel slot <b>${$.parallel.length}</b></span
        >
      </div>
      ${ho({autoAdvance:!!$.queue.auto_advance,breaker:$.breaker})}
      ${go($.running,Date.now(),O)}`}function Re($){return b`<div class="worker-lanes">
      ${Jt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:$.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${Jt({id:"worker-pane-serial",lane:"serial",title:"Serial \uD050",items:$.serial,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Jt({id:"worker-pane-parallel",lane:"parallel",title:"Parallel \uD480",items:$.parallel,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Jt({id:"worker-pane-done",lane:"done",title:`Done \xB7 \uC624\uB298 ${$.done.length}`,items:$.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function $e(){let $=V();de(Z($),w),de(Re($),L)}function Ae($){let I=$.target?.closest?.('.worker-mini[draggable="true"]');if(!I)return;let Y=I.dataset.beadId||"",N=I.dataset.lane||"";p={bead_id:Y,from_lane:N};try{$.dataTransfer?.setData("text/plain",Y),$.dataTransfer&&($.dataTransfer.effectAllowed="move")}catch{}}function je($){let I=$.target?.closest?.(".worker-pane");I&&($.preventDefault(),$.dataTransfer&&($.dataTransfer.dropEffect="move"),I.classList.add("worker-pane--drag-over"))}function we($){$.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ge($,I){let Y=h.find(ce=>ce.id===$);if(!Y)return;let N=h.filter(ce=>ce.id!==$),J=N.length;if(I){let ce=I.dataset.beadId;if(ce===$)return;let fe=N.findIndex(se=>se.id===ce);fe>=0&&(J=fe)}let ue=N.slice();ue.splice(J,0,Y),u.applyReorder($,ue,J)}function Ue($){let I=$.target?.closest?.(".worker-pane");if(!I)return;$.preventDefault(),I.classList.remove("worker-pane--drag-over");let Y=I.dataset.lane||"",N=p?.bead_id||$.dataTransfer?.getData("text/plain")||"",J=p?.from_lane||"";if(p=null,!N)return;let ue=$.target?.closest?.(".worker-mini"),ce=Array.from(I.querySelectorAll(".worker-mini")),fe=ce.length;if(ue){let se=ce.indexOf(ue);se>=0&&(fe=se)}if(Y==="candidate"){if(J==="candidate"){ge(N,ue);return}(J==="serial"||J==="parallel")&&C(N);return}(Y==="serial"||Y==="parallel")&&(J===Y?T(N,Y,fe):m(N,Y,fe))}function Ye($){let I=q(),Y=I.attempts?I.attempts[$]:null,N=Y?{runner:Y.runner||void 0,model:Y.model||void 0,effort:Y.effort||void 0,worktree:Y.worktree||void 0,status:Y.status||void 0}:{};O=$,F.open({attempt_id:$,meta:N}),$e()}function ne($){let I=$.target;if(I?.closest?.(".worker-play")){j(!0);return}if(I?.closest?.(".worker-pause")){j(!1);return}if(I?.closest?.(".rtile__stop")){let ue=I?.closest?.(".rtile")?.dataset?.attemptId;ue&&U(ue);return}if(I?.closest?.(".rtile__info")){let ue=I?.closest?.(".rtile")?.dataset?.beadId;ue&&l&&l(ue);return}if(I?.closest?.(".worker-drawer-host"))return;let Y=I?.closest?.(".rtile");if(Y){let J=Y.dataset.attemptId;J&&Ye(J);return}let N=I?.closest?.(".worker-mini");if(N&&l){let J=N.dataset.beadId;J&&l(J)}}return t.addEventListener("dragstart",Ae),t.addEventListener("dragover",je),t.addEventListener("dragleave",we),t.addEventListener("drop",Ue),t.addEventListener("click",ne),a&&_.push(a.subscribe($e)),s&&_.push(s.subscribe($e)),$e(),{load(){$e()},destroy(){for(let $ of _.splice(0))try{$()}catch{}t.removeEventListener("dragstart",Ae),t.removeEventListener("dragover",je),t.removeEventListener("dragleave",we),t.removeEventListener("drop",Ue),t.removeEventListener("click",ne);try{F.destroy()}catch{}de(b``,t)}}}function gn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function bo(t,e,r,n=async()=>{},s=async()=>{}){let o=_e("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function p(m){let C=m.target.value,j=e.getState().workspace?.current?.path||"";if(C&&C!==j){o("switching workspace to %s",C),l=!0,y();try{await r(C)}catch(V){o("workspace switch failed: %o",V)}finally{l=!1,y()}}}async function h(){let m=e.getState(),T=m.workspace?.current?.path||m.workspace?.available?.[0]?.path||"";if(!(!T||a)){o("git-pulling workspace %s",T),a=!0,y();try{await n(T)}catch(C){o("workspace git pull failed: %o",C)}finally{a=!1,y()}}}function _(m){let T=m.target;T&&t.contains(T)||S()}function v(m){m.key==="Escape"&&S()}function w(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",v),y())}function S(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",v),y())}function L(){u?S():w()}async function O(m){let T=m.target,C=T.value,U=T.checked;o("toggling visibility %s \u2192 %s",C,String(U));try{await s(C,U)}catch(j){o("workspace visibility toggle failed: %o",j)}}function F(m){return m?b`
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
    `:b``}function q(m,T){return b`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${L}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?b`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${m.map(C=>b`
                    <label
                      class="workspace-picker__manage-row"
                      title="${C.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${C.path}"
                        .checked=${!T.has(C.path)}
                        @change=${O}
                      />
                      <span class="workspace-picker__manage-name"
                        >${gn(C.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function E(){let m=e.getState(),T=m.workspace?.current,C=m.workspace?.available||[],U=new Set(m.workspace?.hidden||[]),j=T?.path||C[0]?.path||"";if(C.length===0)return b``;let V=C.filter(Z=>!U.has(Z.path)||Z.path===j);if(V.length<=1){let Z=V[0]||C[0],Re=gn(Z.path);return b`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Z.path}"
            >${Re}</span
          >
          ${q(C,U)}
          ${F(j)}
          ${a?b`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return b`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${V.map(Z=>b`
              <option
                value="${Z.path}"
                ?selected=${Z.path===j}
                title="${Z.path}"
              >
                ${gn(Z.path)}
              </option>
            `)}
        </select>
        ${q(C,U)}
        ${F(j)}
        ${l||a?b`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function y(){de(E(),t)}return y(),i=e.subscribe(()=>y()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",v),de(b``,t)}}}var _o=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-remove","worker-attempt-stop","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function mn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function yo(t,e,r=mn()){return{id:r,type:t,payload:e}}function ko(t={}){let e=_e("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,u=new Map,p=[],h=new Map,_=new Set;function v(E){for(let y of Array.from(_))try{y(E)}catch{}}function w(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),v(o);let E=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),y=(r.jitterRatio||0)*E,m=Math.max(0,Math.round(E+(Math.random()*2-1)*y));e("ws retry in %d ms (attempt %d)",m,i+1),l=setTimeout(()=>{l=null,q()},m)}function S(E){try{s?.send(JSON.stringify(E))}catch(y){e("ws send failed",y)}}function L(){for(o="open",e("ws open"),v(o),i=0;p.length;){let E=p.shift();E&&S(E)}}function O(E){let y;try{y=JSON.parse(String(E.data))}catch{e("ws received non-JSON message");return}if(!y||typeof y.id!="string"||typeof y.type!="string"){e("ws received invalid envelope");return}if(u.has(y.id)){let T=u.get(y.id);u.delete(y.id),y.ok?T?.resolve(y.payload):T?.reject(y.error||new Error("ws error"));return}let m=h.get(y.type);if(m&&m.size>0)for(let T of Array.from(m))try{T(y.payload)}catch(C){e("ws event handler error",C)}else e("ws received unhandled message type: %s",y.type)}function F(){o="closed",e("ws closed"),v(o);for(let[E,y]of u.entries())y.reject(new Error("ws disconnected")),u.delete(E);i+=1,w()}function q(){if(!a)return;let E=n();try{s=new WebSocket(E),e("ws connecting %s",E),o="connecting",v(o),s.addEventListener("open",L),s.addEventListener("message",O),s.addEventListener("error",()=>{}),s.addEventListener("close",F)}catch(y){e("ws connect failed %o",y),w()}}return q(),{send(E,y){if(!_o.includes(E))return Promise.reject(new Error(`unknown message type: ${E}`));let m=mn(),T=yo(E,y,m);return e("send %s id=%s",E,m),new Promise((C,U)=>{u.set(m,{resolve:C,reject:U,type:E}),s&&s.readyState===s.OPEN?S(T):(e("queue %s id=%s (state=%s)",E,m,o),p.push(T))})},on(E,y){h.has(E)||h.set(E,new Set);let m=h.get(E);return m?.add(y),()=>{m?.delete(y)}},onConnection(E){return _.add(E),()=>{_.delete(E)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,q()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function tl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function rl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var bn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],wo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],vo="worker:queue",xo="ui:order",So="ui:display-policy",dt="tab:board:closed",$o="beads-ui.board.closed-range";function nl(t){let e=_e("main");e("bootstrap start");let r=b`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;de(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let C=function(f,g){let H="Request failed",z="";if(f&&typeof f=="object"){let be=f;if(typeof be.message=="string"&&be.message.length>0&&(H=be.message),typeof be.details=="string")z=be.details;else if(be.details&&typeof be.details=="object")try{z=JSON.stringify(be.details,null,2)}catch{z=""}}else typeof f=="string"&&f.length>0&&(H=f);let K=g&&g.length>0?`Failed to load ${g}`:"Request failed";T.open(K,H,z)},N=function(f){return`${W.getState().workspace.current?.path||""}\0${f}`},J=function(){we&&(we().catch(()=>{}),we=null),ge=null,Ue=null},ce=function(f){Ye=f;let g=()=>{Ye!==f||W.getState().selected_id!==f||(Ye=null,ue(f))};if(!I){$.then(g);return}g()},De=function(){let f=Fn(Ie);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},Te=function(f){if(f)for(let[g,H]of bn){if(fe.has(g)||se.has(g))continue;let z=g===dt?De():{type:H};try{Z.register(g,z)}catch(K){e("register %s store failed: %o",g,K)}se.add(g),V.subscribeList(g,z).then(K=>{fe.set(g,K)}).catch(K=>{e("subscribe %s failed: %o",g,K),C(K,"board")}).finally(()=>{se.delete(g)})}else Ee()},Ee=function(){for(let[f]of bn){let g=fe.get(f);g&&(g().catch(()=>{}),fe.delete(f));try{Z.unregister(f)}catch(H){e("unregister %s failed: %o",f,H)}}},me=function(f){if(!f){ve();return}for(let[g,H]of wo)if(!(Me.has(g)||se.has(g))){try{Z.register(g,{type:H})}catch(z){e("register %s store failed: %o",g,z)}se.add(g),V.subscribeList(g,{type:H}).then(z=>{Me.set(g,z)}).catch(z=>{e("subscribe %s failed: %o",g,z),C(z,"worker")}).finally(()=>{se.delete(g)})}D||(j("subscribe-worker-queue",{id:vo}).catch(g=>{e("subscribe-worker-queue failed: %o",g)}),D=()=>j("unsubscribe-worker-queue",{id:vo}))},ve=function(){for(let[f]of wo){let g=Me.get(f);g&&(g().catch(()=>{}),Me.delete(f));try{Z.unregister(f)}catch(H){e("unregister %s failed: %o",f,H)}}D&&(D().catch(()=>{}),D=null)},Je=function(){qe||(j("subscribe-ui-order",{id:xo}).catch(f=>{e("subscribe-ui-order failed: %o",f)}),qe=()=>j("unsubscribe-ui-order",{id:xo}))},tt=function(){qe&&(qe().catch(()=>{}),qe=null),$e.clear()},He=function(){ye||(j("subscribe-display-policy",{id:So}).catch(f=>{e("subscribe-display-policy failed: %o",f)}),ye=()=>j("unsubscribe-display-policy",{id:So}))},Ne=function(){ye&&(ye().catch(()=>{}),ye=null),Ae.clear()},P=function(f){if(!f)return"Unknown";let g=f.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var l=C,a=N,u=J,p=ce,h=De,_=Te,v=Ee,w=me,S=ve,L=Je,O=tt,F=He,q=Ne,E=P;let y=document.getElementById("header-loading"),m=as(y),T=ao(t),U=ko(),j=m.wrapSend((f,g)=>U.send(f,g)),V=es(j),Z=ts(),Re=ns(),$e=rs(),Ae=Bn(),je=zn();U.on("worker-queue-snapshot",f=>{let g=f;if(g&&g.queue)try{Re.set(g.queue)}catch{}}),U.on("ui-order-snapshot",f=>{let g=f;if(g&&typeof g.revision=="number")try{$e.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),U.on("display-policy-snapshot",f=>{let g=f;if(g&&g.policy&&typeof g.policy=="object")try{Ae.set(g.policy)}catch{}}),U.on("session-log-snapshot",f=>{let g=f;if(g&&typeof g.attempt_id=="string")try{je.set(g.attempt_id,Array.isArray(g.lines)?g.lines:[])}catch{}}),U.on("session-log-append",f=>{let g=f;if(g&&typeof g.attempt_id=="string")try{je.append(g.attempt_id,g.event)}catch{}}),U.on("snapshot",f=>{let g=f,H=g&&typeof g.id=="string"?g.id:"",z=H?Z.getStore(H):null;if(z&&g&&g.type==="snapshot")try{z.applyPush(g)}catch{}}),U.on("upsert",f=>{let g=f,H=g&&typeof g.id=="string"?g.id:"",z=H?Z.getStore(H):null;if(z&&g&&g.type==="upsert")try{z.applyPush(g)}catch{}}),U.on("delete",f=>{let g=f,H=g&&typeof g.id=="string"?g.id:"",z=H?Z.getStore(H):null;if(z&&g&&g.type==="delete")try{z.applyPush(g)}catch{}});let we=null,ge=null,Ue=null,Ye=null,ne=()=>{},$=new Promise(f=>{ne=()=>f(void 0)}),I=!1,Y=!1;async function ue(f){let g=N(f);if(g===ge||g===Ue)return;Ue=g;let H=`detail:${f}`,z={type:"issue-detail",params:{id:f}};try{Z.register(H,z)}catch(K){e("register detail store failed: %o",K)}try{let K=await V.subscribeList(H,z);if(W.getState().selected_id!==f||N(f)!==g){await K().catch(()=>{});return}we&&await we().catch(()=>{}),we=K,ge=g}catch(K){e("detail subscribe failed: %o",K),C(K,"issue details")}finally{Ue===g&&(Ue=null)}}let fe=new Map,se=new Set,Ie=nr;try{let f=window.localStorage.getItem($o);Nr(f)&&(Ie=f)}catch{}async function Oe(f){if(!Nr(f)||f===Ie)return;Ie=f;try{window.localStorage.setItem($o,f)}catch{}let g=fe.get(dt);if(!g)return;fe.delete(dt),await g().catch(()=>{});let H=De();try{Z.register(dt,H)}catch(z){e("register %s store failed: %o",dt,z)}try{let z=await V.subscribeList(dt,H);fe.set(dt,z)}catch(z){e("re-subscribe %s failed: %o",dt,z),C(z,"board")}}let Me=new Map,D=null,qe=null,ye=null;async function ie(){ye=null,Ae.clear();let f=W.getState().workspace.current?.path;if(f)try{await U.send("set-workspace",{path:f})}catch(g){e("workspace restore after reconnect failed: %o",g);return}He()}async function c(){e("clearing all subscriptions for workspace switch"),Ee(),ve(),Re.clear(),tt(),Je(),Ne(),He(),J();let f=W.getState();if(f.selected_id)try{Z.unregister(`detail:${f.selected_id}`)}catch{}let g=W.getState();Te(g.view==="board"),me(g.view==="worker"),g.selected_id&&ce(g.selected_id)}async function k(f){e("requesting workspace switch to %s",f),Y=!0;try{let g=await U.send("set-workspace",{path:f});e("workspace switch result: %o",g),g&&g.workspace&&(W.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),g.changed&&(await c(),le("Switched to "+P(f),"success",2e3)))}catch(g){throw e("workspace switch failed: %o",g),le("Failed to switch workspace","error",3e3),g}finally{Y=!1}}async function x(f){e("requesting workspace git pull for %s",f);try{let g=await U.send("git-pull-workspace",{});e("workspace git pull result: %o",g);let H=g?.status;if(H==="up_to_date"){le("Already up to date","success",2e3);return}if(H==="stash_pop_conflict"){le("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}le("Git pulled "+P(f),"success",2e3)}catch(g){e("workspace git pull failed: %o",g);let H=g?.code,z=g?.message;if(H==="rebase_conflict"){le("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(H==="rebase_conflict_abort_failed"){le("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(H==="busy"){le("Git pull skipped: another operation is running","warning",3e3);return}let K=z?`: ${z}`:"";throw le(`Git pull failed${K}`,"error",3e3),g}}async function R(f,g){e("setting workspace visibility %s \u2192 %s",f,String(g));try{await U.send("set-workspace-visibility",{path:f,visible:g}),await Q()}catch(H){e("workspace visibility update failed: %o",H),le("Failed to update project visibility","error",3e3)}}async function Q(){try{let f=await U.send("list-workspaces",{});if(e("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let g=f.workspaces.map(be=>({path:be.path,database:be.database,pid:be.pid,version:be.version})),H=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,z=Array.isArray(f.hidden)?f.hidden.filter(be=>typeof be=="string"):[];W.setState({workspace:{current:H,available:g,hidden:z}});let K=window.localStorage.getItem("beads-ui.workspace");K&&(!g.some(tr=>tr.path===K)||z.includes(K)?window.localStorage.removeItem("beads-ui.workspace"):H&&K!==H.path&&(e("restoring saved workspace preference: %s",K),await k(K)))}}catch(f){e("failed to load workspaces: %o",f)}}U.on("workspace-changed",f=>{e("workspace-changed event: %o",f),f&&f.root_dir&&(W.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),Q(),c())});let te=!1;if(typeof U.onConnection=="function"){let f=g=>{e("ws state %s",g),g==="reconnecting"||g==="closed"?(te=!0,le("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&te&&(te=!1,le("Reconnected","success",2200),rl(W,(H,z)=>{e(`${H}: %o`,z)}),ie())};U.onConnection(f)}let pe="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker")&&(pe=f)}catch(f){e("view parse error: %o",f)}let W=is({config:tl(),view:pe}),oe=ss(W);oe.start();let xe=async(f,g)=>{try{return await j(f,g)}catch{return[]}};n&&lo(n,W,oe);let G=document.getElementById("workspace-picker");G&&bo(G,W,k,x,R);let at=fo(t,(f,g)=>j(f,g));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>at.open())}catch{}let wt=io(t,{policyStore:Ae,transport:(f,g)=>j(f,g),labelOptions:()=>{let f=new Set;for(let[g]of bn)for(let H of Z.snapshotFor(g)||[]){let z=H.labels;if(Array.isArray(z))for(let K of z)typeof K=="string"&&K.length>0&&f.add(K)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>wt.open())}catch{}let vt=gs(s,{gotoIssue:f=>oe.gotoIssue(f),issueStores:Z,transport:xe,uiOrderStore:$e,displayPolicyStore:Ae,closedRange:Ie,onClosedRangeChange:f=>{Oe(f)},onNewIssue:()=>at.open()}),xr=hn(o,{transport:xe,issueStores:Z,queueStore:Re,sessionLogStore:je,uiOrderStore:$e,gotoIssue:f=>W.setState({selected_id:f})}),rt=so(i,{issueStores:Z,transport:xe,queueStore:Re,sessionLogStore:je,getWorkspacePath:()=>W.getState().workspace.current?.path,onNavigate:f=>{W.getState().view==="worker"?W.setState({selected_id:f}):oe.gotoIssue(f)},onClose:()=>{let f=W.getState();W.setState({selected_id:null});try{oe.gotoView(f.view==="worker"?"worker":"board")}catch{}}}),Ot=W.getState().selected_id;Ot&&(i.hidden=!1,rt.load(Ot),ce(Ot)),W.subscribe(f=>{let g=f.selected_id;g?(i.hidden=!1,rt.load(g),Y||ce(g)):(rt.clear(),i.hidden=!0,J())});let er=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",Te(f.view==="board"),me(f.view==="worker"),!f.selected_id&&f.view==="board"&&vt.load(),f.view==="worker"&&xr.load(),window.localStorage.setItem("beads-ui.view",f.view)};W.subscribe(er),er(W.getState()),Je(),He(),Q().finally(()=>{I=!0,ne()}),window.addEventListener("keydown",f=>{let g=f.ctrlKey||f.metaKey,H=String(f.key||"").toLowerCase(),z=f.target,K=z&&z.tagName?String(z.tagName).toLowerCase():"",be=K==="input"||K==="textarea"||K==="select"||z&&typeof z.isContentEditable=="boolean"&&z.isContentEditable;g&&H==="n"&&(be||(f.preventDefault(),at.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&nl(e)});export{nl as bootstrap,tl as readBootstrapConfig,rl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
