var mu=Object.create;var ho=Object.defineProperty;var gu=Object.getOwnPropertyDescriptor;var bu=Object.getOwnPropertyNames;var hu=Object.getPrototypeOf,yu=Object.prototype.hasOwnProperty;var vu=(e,t,r)=>t in e?ho(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var yo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var wu=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of bu(t))!yu.call(e,s)&&s!==r&&ho(e,s,{get:()=>t[s],enumerable:!(n=gu(t,s))||n.enumerable});return e};var ku=(e,t,r)=>(r=e!=null?mu(hu(e)):{},wu(t||!e||!e.__esModule?ho(r,"default",{value:e,enumerable:!0}):r,e));var ct=(e,t,r)=>vu(e,typeof t!="symbol"?t+"":t,r);var Si=yo((Tg,Ai)=>{var Qr=1e3,Jr=Qr*60,en=Jr*60,qr=en*24,Au=qr*7,Su=qr*365.25;Ai.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Eu(e);if(r==="number"&&isFinite(e))return t.long?Cu(e):Tu(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Eu(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Su;case"weeks":case"week":case"w":return r*Au;case"days":case"day":case"d":return r*qr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*en;case"minutes":case"minute":case"mins":case"min":case"m":return r*Jr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Tu(e){var t=Math.abs(e);return t>=qr?Math.round(e/qr)+"d":t>=en?Math.round(e/en)+"h":t>=Jr?Math.round(e/Jr)+"m":t>=Qr?Math.round(e/Qr)+"s":e+"ms"}function Cu(e){var t=Math.abs(e);return t>=qr?cs(e,t,qr,"day"):t>=en?cs(e,t,en,"hour"):t>=Jr?cs(e,t,Jr,"minute"):t>=Qr?cs(e,t,Qr,"second"):e+" ms"}function cs(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Ti=yo((Cg,Ei)=>{function Ru(e){r.debug=r,r.default=r,r.coerce=d,r.disable=a,r.enable=s,r.enabled=i,r.humanize=Si(),r.destroy=u,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let b=0;b<p.length;b++)f=(f<<5)-f+p.charCodeAt(b),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,b=null,R,A;function I(...P){if(!I.enabled)return;let V=I,K=Number(new Date),W=K-(f||K);V.diff=W,V.prev=f,V.curr=K,f=K,P[0]=r.coerce(P[0]),typeof P[0]!="string"&&P.unshift("%O");let L=0;P[0]=P[0].replace(/%([a-zA-Z%])/g,(D,k)=>{if(D==="%%")return"%";L++;let B=r.formatters[k];if(typeof B=="function"){let oe=P[L];D=B.call(V,oe),P.splice(L,1),L--}return D}),r.formatArgs.call(V,P),(V.log||r.log).apply(V,P)}return I.namespace=p,I.useColors=r.useColors(),I.color=r.selectColor(p),I.extend=n,I.destroy=r.destroy,Object.defineProperty(I,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(R!==r.namespaces&&(R=r.namespaces,A=r.enabled(p)),A),set:P=>{b=P}}),typeof r.init=="function"&&r.init(I),I}function n(p,f){let b=r(this.namespace+(typeof f>"u"?":":f)+p);return b.log=this.log,b}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of f)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(p,f){let b=0,R=0,A=-1,I=0;for(;b<p.length;)if(R<f.length&&(f[R]===p[b]||f[R]==="*"))f[R]==="*"?(A=R,I=b,R++):(b++,R++);else if(A!==-1)R=A+1,I++,b=I;else return!1;for(;R<f.length&&f[R]==="*";)R++;return R===f.length}function a(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function i(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function d(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ei.exports=Ru});var Ci=yo((Pt,ds)=>{Pt.formatArgs=Lu;Pt.save=Ou;Pt.load=Mu;Pt.useColors=Iu;Pt.storage=Pu();Pt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Pt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Iu(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Lu(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ds.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Pt.log=console.debug||console.log||(()=>{});function Ou(e){try{e?Pt.storage.setItem("debug",e):Pt.storage.removeItem("debug")}catch{}}function Mu(){let e;try{e=Pt.storage.getItem("debug")||Pt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Pu(){try{return localStorage}catch{}}ds.exports=Ti()(Pt);var{formatters:Du}=ds.exports;Du.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var gn=globalThis,ns=gn.trustedTypes,di=ns?ns.createPolicy("lit-html",{createHTML:e=>e}):void 0,wo="$lit$",pr=`lit$${Math.random().toFixed(9).slice(2)}$`,ko="?"+pr,$u=`<${ko}>`,Mr=document,bn=()=>Mr.createComment(""),hn=e=>e===null||typeof e!="object"&&typeof e!="function",$o=Array.isArray,gi=e=>$o(e)||typeof e?.[Symbol.iterator]=="function",vo=`[ 	
\f\r]`,mn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ui=/-->/g,pi=/>/g,Lr=RegExp(`>|${vo}(?:([^\\s"'>=/]+)(${vo}*=${vo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fi=/'/g,_i=/"/g,bi=/^(?:script|style|textarea|title)$/i,xo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=xo(1),$r=xo(2),wg=xo(3),Bt=Symbol.for("lit-noChange"),gt=Symbol.for("lit-nothing"),mi=new WeakMap,Or=Mr.createTreeWalker(Mr,129);function hi(e,t){if(!$o(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return di!==void 0?di.createHTML(t):t}var yi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=mn;for(let i=0;i<r;i++){let d=e[i],u,p,f=-1,b=0;for(;b<d.length&&(a.lastIndex=b,p=a.exec(d),p!==null);)b=a.lastIndex,a===mn?p[1]==="!--"?a=ui:p[1]!==void 0?a=pi:p[2]!==void 0?(bi.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Lr):p[3]!==void 0&&(a=Lr):a===Lr?p[0]===">"?(a=s??mn,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,u=p[1],a=p[3]===void 0?Lr:p[3]==='"'?_i:fi):a===_i||a===fi?a=Lr:a===ui||a===pi?a=mn:(a=Lr,s=void 0);let R=a===Lr&&e[i+1].startsWith("/>")?" ":"";o+=a===mn?d+$u:f>=0?(n.push(u),d.slice(0,f)+wo+d.slice(f)+pr+R):d+pr+(f===-2?i:R)}return[hi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},yn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,d=this.parts,[u,p]=yi(t,r);if(this.el=e.createElement(u,n),Or.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=Or.nextNode())!==null&&d.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(wo)){let b=p[a++],R=s.getAttribute(f).split(pr),A=/([.?@])?(.*)/.exec(b);d.push({type:1,index:o,name:A[2],strings:R,ctor:A[1]==="."?os:A[1]==="?"?as:A[1]==="@"?is:Dr}),s.removeAttribute(f)}else f.startsWith(pr)&&(d.push({type:6,index:o}),s.removeAttribute(f));if(bi.test(s.tagName)){let f=s.textContent.split(pr),b=f.length-1;if(b>0){s.textContent=ns?ns.emptyScript:"";for(let R=0;R<b;R++)s.append(f[R],bn()),Or.nextNode(),d.push({type:2,index:++o});s.append(f[b],bn())}}}else if(s.nodeType===8)if(s.data===ko)d.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(pr,f+1))!==-1;)d.push({type:7,index:o}),f+=pr.length-1}o++}}static createElement(t,r){let n=Mr.createElement("template");return n.innerHTML=t,n}};function Pr(e,t,r=e,n){if(t===Bt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=hn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Pr(e,s._$AS(e,t.values),s,n)),t}var ss=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Mr).importNode(r,!0);Or.currentNode=s;let o=Or.nextNode(),a=0,i=0,d=n[0];for(;d!==void 0;){if(a===d.index){let u;d.type===2?u=new Xr(o,o.nextSibling,this,t):d.type===1?u=new d.ctor(o,d.name,d.strings,this,t):d.type===6&&(u=new ls(o,this,t)),this._$AV.push(u),d=n[++i]}a!==d?.index&&(o=Or.nextNode(),a++)}return Or.currentNode=Mr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=gt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Pr(this,t,r),hn(t)?t===gt||t==null||t===""?(this._$AH!==gt&&this._$AR(),this._$AH=gt):t!==this._$AH&&t!==Bt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):gi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==gt&&hn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=yn.createElement(hi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ss(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=mi.get(t.strings);return r===void 0&&mi.set(t.strings,r=new yn(t)),r}k(t){$o(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(bn()),this.O(bn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Dr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=gt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=gt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Pr(this,t,r,0),a=!hn(t)||t!==this._$AH&&t!==Bt,a&&(this._$AH=t);else{let i=t,d,u;for(t=o[0],d=0;d<o.length-1;d++)u=Pr(this,i[n+d],r,d),u===Bt&&(u=this._$AH[d]),a||(a=!hn(u)||u!==this._$AH[d]),u===gt?t=gt:t!==gt&&(t+=(u??"")+o[d+1]),this._$AH[d]=u}a&&!s&&this.j(t)}j(t){t===gt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},os=class extends Dr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===gt?void 0:t}},as=class extends Dr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==gt)}},is=class extends Dr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Pr(this,t,r,0)??gt)===Bt)return;let n=this._$AH,s=t===gt&&n!==gt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==gt&&(n===gt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ls=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Pr(this,t)}},vi={M:wo,P:pr,A:ko,C:1,L:yi,R:ss,D:gi,V:Pr,I:Xr,H:Dr,N:as,U:is,B:os,F:ls},xu=gn.litHtmlPolyfillSupport;xu?.(yn,Xr),(gn.litHtmlVersions??(gn.litHtmlVersions=[])).push("3.3.1");var Qe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(bn(),o),o,void 0,r??{})}return s._$AI(e),s};var Dt="today",or=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ut(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Nr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function wi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ki(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function $i(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function xi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ri=ku(Ci(),1);function _t(e){return(0,Ri.default)(`beads-ui:${e}`)}function Zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fr(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Oi(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Mi(e,t){let r=Zt(e.updated_at),n=Zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Pi(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Zt(e.created_at),o=Zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Di(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Nu=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ii(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Li(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Nu.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ni(e,t){let r=Ii(e),n=Ii(t);if(r!==n)return r<n?-1:1;let s=Li(e),o=Li(t);if(s!==o)return s<o?-1:1;let a=Zt(e&&e.created_at),i=Zt(t&&t.created_at);if(a!==i)return a<i?-1:1;let d=e&&e.id,u=t&&t.id;return d===u?0:String(d)<String(u)?-1:1}var Ao=2**20;function tn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Zt(e&&e.created_at)}function us(e){return(t,r)=>{let n=tn(t,e),s=tn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function So(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:tn(i,r)-Ao};if(!i)return{rank:tn(a,r)+Ao};let d=tn(a,r),u=tn(i,r),p=(d+u)/2;return d<p&&p<u?{rank:p}:{renormalize:n.map((f,b)=>({bead_id:f.id,rank:b*Ao}))}}function Eo(e,t={}){let r=_t(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,d=t.sort||Fr;function u(){for(let b of Array.from(a))try{b()}catch{}}function p(){s=Array.from(n.values()).sort(d)}function f(b){if(i||!b||b.id!==e)return;let R=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,R),!(R<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(R<=o)return;n.clear();let A=Array.isArray(b.issues)?b.issues:[];for(let I of A)I&&typeof I.id=="string"&&I.id.length>0&&n.set(I.id,I);p(),o=R,u();return}if(b.type==="upsert"){let A=b.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let I=n.get(A.id);if(!I)n.set(A.id,A);else{let P=Number.isFinite(I.updated_at)?I.updated_at:0,V=Number.isFinite(A.updated_at)?A.updated_at:0;if(P<=V){for(let K of Object.keys(I))K in A||delete I[K];for(let[K,W]of Object.entries(A))I[K]=W}}p()}o=R,u()}else if(b.type==="delete"){let A=String(b.issue_id||"");A&&(n.delete(A),p()),o=R,u()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function ps(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function qi(e){let t=_t("subs"),r=new Map,n=new Map;function s(i,d){t("applyDelta %s +%d ~%d -%d",i,(d.added||[]).length,(d.updated||[]).length,(d.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let p=Array.isArray(d.added)?d.added:[],f=Array.isArray(d.updated)?d.updated:[],b=Array.isArray(d.removed)?d.removed:[];for(let R of Array.from(u)){let A=r.get(R);if(!A)continue;let I=A.itemsById;for(let P of p)typeof P=="string"&&P.length>0&&I.set(P,!0);for(let P of f)typeof P=="string"&&P.length>0&&I.set(P,!0);for(let P of b)typeof P=="string"&&P.length>0&&I.delete(P)}}async function o(i,d){let u=ps(d);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let f=r.get(i);if(f&&f.key!==u){let b=n.get(f.key);b&&(b.delete(i),b.size===0&&n.delete(f.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let p=n.get(u);p&&p.add(i);try{await e("subscribe-list",{id:i,type:d.type,params:d.params})}catch(f){let b=r.get(i)||null;if(b){let R=n.get(b.key);R&&(R.delete(i),R.size===0&&n.delete(b.key))}throw r.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let f=r.get(i)||null;if(f){let b=n.get(f.key);b&&(b.delete(i),b.size===0&&n.delete(f.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ps,selectors:{getIds(i){let d=r.get(i);return d?Array.from(d.itemsById.keys()):[]},has(i,d){let u=r.get(i);return u?u.itemsById.has(d):!1},count(i){let d=r.get(i);return d?d.itemsById.size:0},getItemsById(i){let d=r.get(i),u={};if(!d)return u;for(let p of d.itemsById.keys())u[p]=!0;return u}}}}function Fi(){let e=_t("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let d of Array.from(n))try{d()}catch{}}function a(d,u,p){let f=u?ps(u):"",b=r.get(d)||"",R=t.has(d);if(e("register %s key=%s (prev=%s)",d,f,b),R&&b&&f&&b!==f){let A=t.get(d);if(A)try{A.dispose()}catch{}let I=s.get(d);if(I){try{I()}catch{}s.delete(d)}let P=Eo(d,p);t.set(d,P);let V=P.subscribe(()=>o());s.set(d,V)}else if(!R){let A=Eo(d,p);t.set(d,A);let I=A.subscribe(()=>o());s.set(d,I)}return r.set(d,f),()=>i(d)}function i(d){e("unregister %s",d),r.delete(d);let u=t.get(d);u&&(u.dispose(),t.delete(d));let p=s.get(d);if(p){try{p()}catch{}s.delete(d)}}return{register:a,unregister:i,getStore(d){return t.get(d)||null},snapshotFor(d){let u=t.get(d);return u?u.snapshot().slice():[]},subscribe(d){return n.add(d),()=>n.delete(d)}}}function ji(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Bi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ui(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function To(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function qu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Fu(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Wi(e){let t=_t("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):qu(n),a=Fu(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let d=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==d&&(window.location.hash=d)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=To(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?To(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ju=Object.freeze({workspace_config:{default_workspace:null}});function zi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:ju.workspace_config.default_workspace}}}function Hi(e={}){let t=_t("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:zi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?zi(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,p)=>u!==r.workspace.hidden[p]),d=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,p)=>u===r.worker.show_closed_children[p])&&!i&&!d||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Gi(e){let t=_t("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function d(u){return async(f,b)=>{let R=s++,A=Date.now();n.set(R,{type:f,start_ts:A}),t("request start id=%d type=%s count=%d",R,f,r+1),a();let I=!1,P=()=>{I||(I=!0,n.delete(R),i())},V=setTimeout(()=>{I||(t("request TIMEOUT id=%d type=%s elapsed=%dms",R,f,Date.now()-A),P())},3e4);try{let K=await u(f,b),W=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",R,f,W),K}catch(K){let W=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",R,f,W,K),K}finally{clearTimeout(V),P()}}}return o(),{wrapSend:d,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ie(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function fs(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let d=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return d.sort(Di),d;switch(i){case"created_desc":return d.sort(Fr),d;case"created_asc":return d.sort(Oi),d;case"updated_desc":return d.sort(Mi),d;case"priority":return d.sort(Pi),d;case"manual":default:{let u=r();return u?d.sort(us(u)):d.sort(Fr),d}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function kt(e){let t=jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Nt(e,t){let r=jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let d=Math.floor(i/7);if(i<30)return`${d}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function _s(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function ms(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let d={...a.order};for(let u of i)d[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:d})}async function o(a,i,d){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},p=n(So(i,d,u.order),a);s(u,p);let f=await t("ui-order-set",{expected_revision:u.revision,entries:p});if(f&&f.conflict){let b={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(b);let R=n(So(i,d,b.order),a);s(b,R);let A=await t("ui-order-set",{expected_revision:b.revision,entries:R});A&&A.applied&&r.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function gs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Co(e,t){return!t||typeof e!="string"||e.length===0||gs(t.visible_labels).includes(e)?!0:gs(t.hidden_labels).includes(e)?!1:!gs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function bs(e,t){return gs(e).filter(r=>Co(r,t))}function xr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Bu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ki={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Vi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Uu={review:"\u2713",skip:"\u2298"},Ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Wu(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Yi(e){let t=e&&e.fill||"none";return t==="none"?Ar.none:e&&e.stale===!0?Ar.stale:t==="dim"?Ar.dim:e&&e.glyph==="review"?Ar.review:e&&e.glyph==="skip"?Ar.skip:Ar.done}function zu(e){if(!e||e.fill==="none"||!e.approval_state)return Yi(e);let t=[];return e.glyph==="review"?t.push(Ar.review):e.glyph==="skip"&&t.push(Ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Hu(e,t,r){let n=Bu[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Uu[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let d=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${d}>
        ${Ki[e]||e}
      </div>
    </div>
  `}function hs(e,t){if(!e||!e.stages)return"";let r=Vi[e.route]||Vi.spec_backed,n=e.stages,s=Wu(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ki[a]||a} ${a==="plan"?zu(n[a]||{}):Yi(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Hu(a,n[a]||{},a===s))}
    </div>
  `}function Gu(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Zi=2;function Vu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Zi).join(", "),s=r.length-Zi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Ro(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Xi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Br(e){return`${e.kind}:${Xi(e)}@${e.sha}`}function ys(e,t){if(!e)return null;let r=Ro(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=Ro(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,d=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${Br(t)}`:"";return{kind:e.kind,label:i,title:`${d}${u}`}}function Qi(e,t){let r=ys(e,t);return r?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Ku(e){if(!e)return null;let t=Ro(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Br(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Yu(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&xr(r,"route")){let i=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&xr(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&xr(r,"pr")){let i=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Qi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Br(i)}`}
        >${`exec ${i.kind==="delegated"?Xi(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of bs(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&xr(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),xr(r,"blocked")&&s.push(...Vu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&xr(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Zu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Xu(e){let t=Nt(e.created_at),r=Nt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${kt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Qu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ni):r.children;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?c`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:c`<span class="board-card__roll-none">children 없음</span>`}
        ${Xu(e)}
      </div>
      ${n>0&&r.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?c`<div class="board-card__roll-list">
            ${o.map((a,i)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${d=>t.onChildClick&&t.onChildClick(d,a.id)}
                >
                  <span class=${Zu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${ys(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?c`<span class="board-card__roll-child-chips">
                        ${Qi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${Ku(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function vs(e,t){let r=Gu(e.priority);return c`
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
      ${Yu(e,t)}
      ${e.workflow&&xr(t.policy||null,"stepper")?hs(e.workflow,e.status):""}
      ${Qu(e,t)}
    </article>
  `}function rn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
              ${or.map(o=>c`<option
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
        ${e.items.map(o=>vs(o,t))}
      </div>
    </section>
  `}function Ji(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>vs(n,t))}
        </div>
      </div>
    </dialog>
  `}var Ju=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ep=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],tp=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function rp(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function el(e,t,r){return c`
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
        ${Ju.map(n=>c`<option
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
        ${ep.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${rp(e,t,r)}
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
        ${tp.map(n=>c`<option
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
  `}var np=200,sp={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},op=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),tl="beads-ui.board.sort",rl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ap(){try{let e=window.localStorage.getItem(tl);if(e&&rl.has(e))return e}catch{}return"created_desc"}function nl(e,t){let r=_t("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,d=t.workerQueueStore,u=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||Dt,b=s?fs(s,a):null,R=ms({transport:o,uiOrderStore:a}),A=[],I=[],P=[],V=[],K=[],W=[],L=!1,S=0,D=ap(),k=new Map,B=new Map,oe=new Map,de=new Set,te={search:"",priority:"",type:"",labels:[]},re=!1,Oe=null;function nt(j){return String(j.status||"open")==="open"}function De(j){let J=String(j.status||"open");return J==="open"||J==="blocked"}function ot(j){let J=te.search.trim().toLowerCase(),fe=te.priority,w=te.type,C=te.labels;return j.filter(N=>{if(J){let X=String(N.id||"").toLowerCase(),ye=String(N.title||"").toLowerCase();if(!X.includes(J)&&!ye.includes(J))return!1}if(fe!==""&&String(N.priority)!==fe||w!==""&&String(N.issue_type||"")!==w)return!1;if(C.length>0){let X=Array.isArray(N.labels)?N.labels:[];if(!C.some(ye=>X.includes(ye)))return!1}return!0})}function it(){let j=new Set;for(let J of[A,I,P,V,K,W])for(let fe of J){let w=Array.isArray(fe.labels)?fe.labels:[];for(let C of w)typeof C=="string"&&C.length>0&&j.add(C)}return Array.from(j).sort()}function Ve(){return te.search.trim()!==""||te.priority!==""||te.type!==""||te.labels.length>0}function he(){try{if(b){let j=b.selectBoardColumn("tab:board:in-progress","in_progress",D),J=b.selectBoardColumn("tab:board:blocked","blocked",D).filter(De),fe=new Set(j.map(Se=>Se.id)),w=b.selectBoardColumn("tab:board:ready","ready",D).filter(Se=>nt(Se)&&!fe.has(Se.id)),C=b.selectBoardColumn("tab:board:resolved","resolved",D),N=b.selectBoardColumn("tab:board:deferred","deferred",D),X=b.selectBoardColumn("tab:board:closed","closed").slice(0,np),ye=[...J,...w,...j,...C,...X];Me(ye);let Z=new Set;for(let Se of ye)Se&&Se.id&&!Io(Se)&&Z.add(Se.id);let ke=!Ve();A=ke?vn(J,Z):J,I=ke?vn(w,Z):w,P=ke?vn(j,Z):j,V=ke?vn(C,Z):C,K=N,S=N.length,W=ke?vn(X,Z):X,k=new Map;for(let Se of A)k.set(Se.id,"open");for(let Se of I)k.set(Se.id,"open");for(let Se of P)k.set(Se.id,"in_progress");for(let Se of V)k.set(Se.id,"resolved");for(let Se of K)k.set(Se.id,"deferred");for(let Se of W)k.set(Se.id,"closed");B=new Map;for(let Se of A)B.set(Se.id,"blocked-col");for(let Se of I)B.set(Se.id,"ready-col");for(let Se of P)B.set(Se.id,"in-progress-col");for(let Se of V)B.set(Se.id,"resolved-col");for(let Se of W)B.set(Se.id,"closed-col")}M()}catch{A=[],I=[],P=[],V=[],K=[],W=[],oe=new Map,M()}}function Me(j){let J=new Map;for(let w of j)w&&w.id&&!J.has(w.id)&&J.set(w.id,w);let fe=new Map;for(let w of J.values()){let C=Io(w);if(!C)continue;let N=fe.get(C);N||(N=[],fe.set(C,N)),N.push({id:w.id,title:w.title,status:w.status,metadata:w.metadata,workflow:w.workflow,created_at:w.created_at,updated_at:w.updated_at})}oe=fe}function _e(j){let J=oe.get(j)||[],fe=0;for(let C of J)(C.status==="resolved"||C.status==="closed")&&(fe+=1);let w=_s(J);return{total:J.length,count:fe,current:w,children:J}}function ve(j){return!de.has(j)}function Ee(j,J){j.preventDefault(),j.stopPropagation(),de.has(J)?de.delete(J):de.add(J),M()}function Ne(j,J){j.preventDefault(),j.stopPropagation(),n(J)}function we(j,J){j.preventDefault(),j.stopPropagation(),n(J)}function je(j,J){Oe||n(J)}function Ke(j,J){j.preventDefault(),j.stopPropagation(),ip(J).then(fe=>{fe&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function $e(j,J){Oe=J,j.dataTransfer&&(j.dataTransfer.setData("text/plain",J),j.dataTransfer.effectAllowed="move"),j.target.classList.add("board-card--dragging")}function rt(j){j.target.classList.remove("board-card--dragging"),qe(),setTimeout(()=>{Oe=null},0)}function H(j){let J=String(j.target.value||"");!J||J===f||(f=J,u&&u(J),M())}function F(){return i?i.get():null}function se(j){let J=d?d.get():null,fe=J?J.cleanup_failed:null;if(!fe||typeof fe!="object"||Array.isArray(fe))return null;let w=fe[j];return!w||typeof w!="object"||Array.isArray(w)?null:w}let Ce={onCardClick:je,onCopyId:Ke,onDragStart:$e,onDragEnd:rt,onClosedRangeChange:H,rollupFor:_e,isExpanded:ve,onRollupToggle:Ee,onChildClick:Ne,onFromChipClick:we,cleanupFailureFor:se,get policy(){return F()}};function Be(j,J){Oe||(ue(),n(J))}function ze(j,J){j.preventDefault(),j.stopPropagation(),ue(),n(J)}let Te={...Ce,onCardClick:Be,onChildClick:ze,onFromChipClick:ze,get policy(){return F()}};function lt(j){let J=j.target,fe=e.querySelector(".board-filter__labels");J&&fe&&fe.contains(J)||Q()}function Ye(j){j.key==="Escape"&&Q()}function z(){re||(re=!0,document.addEventListener("mousedown",lt),document.addEventListener("keydown",Ye),M())}function Q(){re&&(re=!1,document.removeEventListener("mousedown",lt),document.removeEventListener("keydown",Ye),M())}function Re(j){j.key==="Escape"&&ue()}function Ue(){L||(L=!0,document.addEventListener("keydown",Re),M())}function ue(){L&&(L=!1,document.removeEventListener("keydown",Re),M())}let g={onClose:ue,onOverlayClick(j){j.target===j.currentTarget&&ue()}},$={onSearchInput(j){te.search=String(j.target.value||""),he()},onPriorityChange(j){te.priority=String(j.target.value||""),he()},onTypeChange(j){te.type=String(j.target.value||""),he()},onSortChange(j){let J=String(j.target.value||"");if(!(!rl.has(J)||J===D)){D=J;try{window.localStorage.setItem(tl,J)}catch{}he()}},onDeferredToggle(){L?ue():Ue()},onLabelMenuToggle(){re?Q():z()},onLabelToggle(j){let J=te.labels.indexOf(j);J===-1?te.labels.push(j):te.labels.splice(J,1),he()},onLabelClear(){te.labels.length!==0&&(te.labels=[],he())},onNewIssue(){p&&p()}};function x(){return c`
      <div class="board-view">
        ${el(te,$,{sort_mode:D,deferred_popup_open:L,deferred_count:S,label_options:it(),label_menu_open:re})}
        <div class="board-root">
          ${rn({title:"Blocked",id:"blocked-col",items:ot(A)},Ce)}
          ${rn({title:"Ready",id:"ready-col",items:ot(I)},Ce)}
          ${rn({title:"In progress",id:"in-progress-col",items:ot(P)},Ce)}
          ${rn({title:"Resolved",id:"resolved-col",items:ot(V)},Ce)}
          ${rn({title:"Closed",id:"closed-col",items:ot(W),is_closed:!0,closed_range:f},Ce)}
        </div>
        ${L?Ji({items:ot(K),count:S},Te,g):""}
      </div>
    `}function M(){Qe(x(),e),G()}function G(){try{let j=e.querySelector("#deferred-popup");j&&!j.open&&(typeof j.showModal=="function"?j.showModal():j.setAttribute("open",""));let J=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let fe of J)Array.from(fe.querySelectorAll(".board-card")).forEach((C,N)=>{C.tabIndex=N===0?0:-1})}catch{}}async function Y(j,J){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:j,status:J}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(fe){r("update-status failed: %o",fe),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ne(j){switch(j){case"blocked-col":return A;case"ready-col":return I;case"in-progress-col":return P;case"resolved-col":return V;default:return[]}}function ce(j,J,fe){if(!o||!a)return;let w=ne(j),C=w.find(ke=>ke.id===J);if(!C)return;let N=w.filter(ke=>ke.id!==J),X=fe.closest?fe.closest(".board-card"):null,ye=N.length;if(X){let ke=X.getAttribute("data-issue-id");if(ke===J)return;let Se=N.findIndex(ft=>ft.id===ke);Se>=0&&(ye=Se)}let Z=N.slice();Z.splice(ye,0,C),R.applyReorder(J,Z,ye)}function qe(){for(let j of Array.from(e.querySelectorAll(".board-column--drag-over")))j.classList.remove("board-column--drag-over")}let me=null;e.addEventListener("dragover",j=>{j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect="move");let fe=j.target.closest(".board-column");fe&&fe!==me&&(me&&me.classList.remove("board-column--drag-over"),fe.classList.add("board-column--drag-over"),me=fe)}),e.addEventListener("dragleave",j=>{let J=j.relatedTarget;(!J||!e.contains(J))&&me&&(me.classList.remove("board-column--drag-over"),me=null)}),e.addEventListener("drop",j=>{j.preventDefault(),me&&(me.classList.remove("board-column--drag-over"),me=null);let J=j.target,fe=J.closest(".board-column");if(!fe)return;let w=j.dataTransfer?.getData("text/plain")||"";if(!w)return;let C=fe.id,N=B.get(w);if(N&&N===C){if(op.has(C)){if(D!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ce(C,w,J)}return}let X=sp[C];if(!X){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}k.get(w)!==X&&Y(w,X)}),e.addEventListener("keydown",j=>{let J=j.target;if(!(J instanceof HTMLElement))return;let fe=String(J.tagName||"").toLowerCase();if(fe==="input"||fe==="textarea"||fe==="select"||fe==="button"||fe==="a"||J.isContentEditable===!0)return;let w=J.closest(".board-card");if(!w)return;let C=String(j.key||"");if(C==="Enter"||C===" "){j.preventDefault();let Z=w.getAttribute("data-issue-id");Z&&n(Z);return}if(C!=="ArrowUp"&&C!=="ArrowDown"&&C!=="ArrowLeft"&&C!=="ArrowRight")return;j.preventDefault();let N=w.closest(".board-column");if(!N)return;let X=Array.from(N.querySelectorAll(".board-card")),ye=X.indexOf(w);if(C==="ArrowDown"&&ye<X.length-1){xe(w,X[ye+1]);return}if(C==="ArrowUp"&&ye>0){xe(w,X[ye-1]);return}if(C==="ArrowLeft"||C==="ArrowRight"){let Z=Array.from(e.querySelectorAll(".board-column")),ke=Z.indexOf(N),Se=C==="ArrowRight"?1:-1,ft=ke+Se;for(;ft>=0&&ft<Z.length;){let Et=Z[ft].querySelector(".board-card");if(Et){xe(w,Et);return}ft+=Se}}});function xe(j,J){try{j.tabIndex=-1,J.tabIndex=0,J.focus()}catch{}}let Le=null;b&&b.subscribe&&(Le=b.subscribe(()=>{try{he()}catch{}}));let Ae=null;i&&i.subscribe&&(Ae=i.subscribe(()=>{try{he()}catch{}}));let He=null;return d&&d.subscribe&&(He=d.subscribe(()=>{M()})),{async load(){r("load"),he()},clear(){Q(),ue(),Le&&(Le(),Le=null),Ae&&(Ae(),Ae=null),He&&(He(),He=null),e.replaceChildren(),A=[],I=[],P=[],V=[],K=[],W=[],k=new Map,B=new Map}}}function Io(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function vn(e,t){return e.filter(r=>{let n=Io(r);return!(n&&t.has(n))})}async function ip(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Xt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function lp(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(d=>{let u=p=>{typeof r.close=="function"&&r.close(),r.remove(),d(p)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function fr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await lp(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var cp=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],sl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},dp=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function St(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ht(e){return typeof e=="string"&&e.length>0?e:null}function ws(e){return e.startsWith("gpt-")?e.slice(4):e}function bt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function ll(e,t,r){let n=ht(t[e]);if(n!==null)return{value:n,source:"pin"};let s=ht(r[e]);return s===null?null:{value:s,source:"global"}}function wn(e,t,r,n){return ll(e,t,r)||{value:n,source:"base"}}function ol(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&St(s?.[t])){let a=ht(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&St(s)){for(let a of Object.values(s))if(St(a)){let i=ht(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return ht(n?.runners?.[o]?.models?.[e]?.id)||e}function up(e,t){return ht(t?.review?.reviewers?.[e]?.model)||e}function kn(e,t,r=!1){if(e==="default")return bt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?ws(e):e;return bt(e,t,n,e,"explicit")}function pp(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];St(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(St(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function al(e){return bt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function il(e,t,r){let n=ll(e,t,r);return n?kn(n.value,n.source):bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function nn(e){let t=St(e.pin)?e.pin:{},r=St(e.global)?e.global:{},n=St(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&St(n.session)?n.session:null,o=n?.supported===!0&&St(n.orchestration)?n.orchestration:null,a=St(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let d=wn("workflow_mode",t,r,ht(s.workflow_mode_default));i.workflow_mode=d.source==="base"?bt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):kn(d.value,d.source);for(let A of["spec_review","plan_review","impl_review"]){let I=`${A}_model`,P=ht(A==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),V=wn(I,t,r,P);if(V.value===null)i[I]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(V.value!=="self"&&V.value!=="skip"&&!St(s.review?.reviewers?.[V.value]))i[I]=al(bt(V.value,V.source,"",null,"explicit"));else{let K=up(V.value,s);i[I]=bt(V.value,V.source,ws(K),K,V.source==="base"?"default":"explicit")}}for(let[A,I]of Object.entries(sl)){let P=i[I].value;if(P==="self"||P==="skip"){i[A]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let V=ht(s.review?.reviewers?.[P||""]?.effort),K=wn(A,t,r,V);i[A]=K.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(K.value,K.source,K.value,K.value,K.source==="base"?"default":"explicit")}let u=St(s.implementation?.default)?s.implementation.default:{},p=ht(e.route),f=p!==null&&["quick_fix","spec_backed","full_plan"].includes(p),b=St(s.implementation?.route_defaults)?s.implementation.route_defaults:{},R=f&&St(b[p])?b[p]:{};for(let A of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let I=wn(A,t,r,A==="impl_dispatch"?ht(R.dispatch)||ht(u.dispatch):ht(u[A.replace("impl_","")]));i[A]=I.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(I.value,I.source,I.value,I.value,I.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let A of["impl_runtime","impl_model","impl_effort","impl_speed"])i[A]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let A=i.impl_runtime.value==="inherit"?ht(e.controller_runtime):i.impl_runtime.value,I=A?pp(A,s,a):[];if(i.impl_model.value!=="auto"&&I.length>0&&!I.includes(i.impl_model.value))i.impl_model=al(i.impl_model);else{let P=ol(i.impl_model.value,A,s,a);i.impl_model.display=ws(P),i.impl_model.full_value=P}}if(i.impl_effort.value==="auto"){let A=ht(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),I=A?ht(s.implementation?.effort_by_transport?.[A]?.auto):null;I&&!dp.has(I)?(i.impl_effort.display=`${I} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=I,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):kn("default",i.impl_speed.source))}}else for(let d of cp.filter(u=>!u.startsWith("orchestration_")))i[d]=il(d,t,r);if(!s){for(let[d,u]of Object.entries(sl))(i[u].value==="self"||i[u].value==="skip")&&(i[d]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])i[d]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[d]=il(d,t,r);continue}let u=d.replace("orchestration_",""),p=ht(o[u]),f=wn(d,t,r,p);if(d==="orchestration_effort"&&f.source==="base"){i[d]=bt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(f.value===null){i[d]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let b=f.source==="base"?ht(o.model_id)||f.value:ol(f.value,null,s,a);i[d]=bt(f.value,f.source,ws(b),b,f.source==="base"?"default":"explicit");continue}if(f.value==="default"){i[d]=f.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):kn("default",f.source);continue}i[d]=kn(f.value,f.source)}return i}function fp(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function ks(e){let t=St(e.pin)?e.pin:{},r=St(e.global)?e.global:{},n=p=>nn({pin:e.layer==="pin"?p:t,global:e.layer==="pin"?r:p,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,controller_runtime:e.controller_runtime}),s=e.layer==="pin"?t:r,o={...s};delete o[e.key];let a=n(o)[e.key],i=n(s)[e.key],d=ht(s[e.key]),u=[...e.choices];return d!==null&&!u.includes(d)&&u.unshift(d),{unset_label:fp(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:i?.resolution==="not_applicable",options:u.map(p=>{let f=n({...s,[e.key]:p})[e.key];return{value:p,label:f.display,full_value:f.full_value}})}}function sn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let d=!1,u=f=>{d||(d=!0,typeof t.close=="function"&&t.close(),t.remove(),i(f))},p=()=>u(n.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var fl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function $t(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var _r=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],$n=[..._r,"reasoning_output_tokens"],_p=["implementation","review-consult"];function Lo(e){let t=0;for(let r of _r)t+=$t(e?.[r]);return t}function mp(e){return!e||typeof e!="object"?!1:_r.some(t=>Number.isFinite(e[t]))}function cl(e){return!e||typeof e!="object"?!1:$n.some(t=>Number.isFinite(e[t]))}function gp(e){let t={};for(let r of $n)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function dl(e){let t={};for(let r of $n)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ul(e,t){return e==="codex"?$t(t.input_tokens)+$t(t.output_tokens):Lo(t)}function bp(e){return e==="claude"?"Claude":"Codex"}function hp(e){return`\u03C4 ${_l(e)}`}function yp(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${$t(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${$t(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${$t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${$t(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${$t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${$t(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${$t(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(fl),o.join(`
`)}function xt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${bp(r)} ${hp(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:yp(r,n)})}return t}function xs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let d of $n)Number.isFinite(a.breakdown[d])&&(i.breakdown[d]=$t(i.breakdown[d])+$t(a.breakdown[d]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Oo(e){return!e||typeof e!="object"?null:Wt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function vp(e){return e==="codex"?"codex":"claude"}function Er(){return{subtotal:0,breakdown:gp(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function $s(e,t,r){e.subtotal+=t.subtotal;for(let n of $n)Number.isFinite(t.usage[n])&&(e.breakdown[n]=$t(e.breakdown[n])+$t(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function pl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function _l(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function on(e){return mp(e)?`\u03C4 ${_l(Lo(e))}`:null}function Qt(e){let t=on(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function an(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${$t(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${$t(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${$t(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${$t(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Lo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(fl),r.join(`
`)}function Wt(e,t){let r={claude:Er(),codex:Er()},n={orchestrator:{claude:Er(),codex:Er()},implementation:{claude:Er(),codex:Er()},"review-consult":{claude:Er(),codex:Er()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let d=i.usage;if(cl(d)){let p=vp(i.runner),f=dl(d),b={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:ul(p,f)};f.replayed===!0&&(b.replayed=!0),typeof i.model=="string"&&(b.model=i.model),typeof i.session_id=="string"&&(b.session_id=i.session_id),$s(r[p],b,!0),$s(n.orchestrator[p],b,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of u){if(!p||p.provider!=="codex"||!_p.includes(p.role)||!cl(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let b=dl(p.usage),R={provider:"codex",role:p.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:ul("codex",b)};R.receipt_id=f,typeof p.model=="string"&&(R.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(R.effort=p.effort),typeof p.session_id=="string"?R.session_id=p.session_id:typeof p.thread_id=="string"&&(R.session_id=p.thread_id),typeof p.turn_id=="string"&&(R.turn_id=p.turn_id),typeof p.completed_at=="string"&&(R.completed_at=p.completed_at),b.replayed===!0&&(R.replayed=!0),$s(r.codex,R,!1),$s(n[R.role].codex,R,!1)}}let o={};for(let i of["claude","codex"]){let d=r[i];if(d.legs.length===0)continue;let u=pl(d,!1);i==="claude"&&d.outer_count>0&&d.outer_cost_count===d.outer_count&&(u.total_cost_usd=d.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let d={};for(let u of["claude","codex"]){let p=n[i][u];p.legs.length>0&&(d[u]={...pl(p,!0),legs:p.legs})}Object.keys(d).length>0&&(a[i]=d)}return{providers:o,roles:a}}var{entries:$l,setPrototypeOf:ml,isFrozen:wp,getPrototypeOf:kp,getOwnPropertyDescriptor:$p}=Object,{freeze:It,seal:zt,create:jo}=Object,{apply:Bo,construct:Uo}=typeof Reflect<"u"&&Reflect;It||(It=function(t){return t});zt||(zt=function(t){return t});Bo||(Bo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Uo||(Uo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var As=Lt(Array.prototype.forEach),xp=Lt(Array.prototype.lastIndexOf),gl=Lt(Array.prototype.pop),xn=Lt(Array.prototype.push),Ap=Lt(Array.prototype.splice),Es=Lt(String.prototype.toLowerCase),Mo=Lt(String.prototype.toString),Po=Lt(String.prototype.match),An=Lt(String.prototype.replace),Sp=Lt(String.prototype.indexOf),Ep=Lt(String.prototype.trim),Jt=Lt(Object.prototype.hasOwnProperty),Rt=Lt(RegExp.prototype.test),Sn=Tp(TypeError);function Lt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Bo(e,t,n)}}function Tp(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Uo(e,r)}}function Je(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Es;ml&&ml(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(wp(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Cp(e){for(let t=0;t<e.length;t++)Jt(e,t)||(e[t]=null);return e}function mr(e){let t=jo(null);for(let[r,n]of $l(e))Jt(e,r)&&(Array.isArray(n)?t[r]=Cp(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=mr(n):t[r]=n);return t}function En(e,t){for(;e!==null;){let n=$p(e,t);if(n){if(n.get)return Lt(n.get);if(typeof n.value=="function")return Lt(n.value)}e=kp(e)}function r(){return null}return r}var bl=It(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Do=It(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),No=It(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Rp=It(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),qo=It(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ip=It(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),hl=It(["#text"]),yl=It(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Fo=It(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vl=It(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ss=It(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Lp=zt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Op=zt(/<%[\w\W]*|[\w\W]*%>/gm),Mp=zt(/\$\{[\w\W]*/gm),Pp=zt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Dp=zt(/^aria-[\-\w]+$/),xl=zt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Np=zt(/^(?:\w+script|data):/i),qp=zt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Al=zt(/^html$/i),Fp=zt(/^[a-z][.\w]*(-[.\w]+)+$/i),wl=Object.freeze({__proto__:null,ARIA_ATTR:Dp,ATTR_WHITESPACE:qp,CUSTOM_ELEMENT:Fp,DATA_ATTR:Pp,DOCTYPE_NAME:Al,ERB_EXPR:Op,IS_ALLOWED_URI:xl,IS_SCRIPT_OR_DATA:Np,MUSTACHE_EXPR:Lp,TMPLIT_EXPR:Mp}),Tn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},jp=function(){return typeof window>"u"?null:window},Bp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},kl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Sl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:jp(),t=ge=>Sl(ge);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Tn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:d,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:b,trustedTypes:R}=e,A=d.prototype,I=En(A,"cloneNode"),P=En(A,"remove"),V=En(A,"nextSibling"),K=En(A,"childNodes"),W=En(A,"parentNode");if(typeof a=="function"){let ge=r.createElement("template");ge.content&&ge.content.ownerDocument&&(r=ge.content.ownerDocument)}let L,S="",{implementation:D,createNodeIterator:k,createDocumentFragment:B,getElementsByTagName:oe}=r,{importNode:de}=n,te=kl();t.isSupported=typeof $l=="function"&&typeof W=="function"&&D&&D.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:re,ERB_EXPR:Oe,TMPLIT_EXPR:nt,DATA_ATTR:De,ARIA_ATTR:ot,IS_SCRIPT_OR_DATA:it,ATTR_WHITESPACE:Ve,CUSTOM_ELEMENT:he}=wl,{IS_ALLOWED_URI:Me}=wl,_e=null,ve=Je({},[...bl,...Do,...No,...qo,...hl]),Ee=null,Ne=Je({},[...yl,...Fo,...vl,...Ss]),we=Object.seal(jo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,Ke=null,$e=Object.seal(jo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),rt=!0,H=!0,F=!1,se=!0,Ce=!1,Be=!0,ze=!1,Te=!1,lt=!1,Ye=!1,z=!1,Q=!1,Re=!0,Ue=!1,ue="user-content-",g=!0,$=!1,x={},M=null,G=Je({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Y=null,ne=Je({},["audio","video","img","source","image","track"]),ce=null,qe=Je({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),me="http://www.w3.org/1998/Math/MathML",xe="http://www.w3.org/2000/svg",Le="http://www.w3.org/1999/xhtml",Ae=Le,He=!1,j=null,J=Je({},[me,xe,Le],Mo),fe=Je({},["mi","mo","mn","ms","mtext"]),w=Je({},["annotation-xml"]),C=Je({},["title","style","font","a","script"]),N=null,X=["application/xhtml+xml","text/html"],ye="text/html",Z=null,ke=null,Se=r.createElement("form"),ft=function(l){return l instanceof RegExp||l instanceof Function},Et=function(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ke&&ke===l)){if((!l||typeof l!="object")&&(l={}),l=mr(l),N=X.indexOf(l.PARSER_MEDIA_TYPE)===-1?ye:l.PARSER_MEDIA_TYPE,Z=N==="application/xhtml+xml"?Mo:Es,_e=Jt(l,"ALLOWED_TAGS")?Je({},l.ALLOWED_TAGS,Z):ve,Ee=Jt(l,"ALLOWED_ATTR")?Je({},l.ALLOWED_ATTR,Z):Ne,j=Jt(l,"ALLOWED_NAMESPACES")?Je({},l.ALLOWED_NAMESPACES,Mo):J,ce=Jt(l,"ADD_URI_SAFE_ATTR")?Je(mr(qe),l.ADD_URI_SAFE_ATTR,Z):qe,Y=Jt(l,"ADD_DATA_URI_TAGS")?Je(mr(ne),l.ADD_DATA_URI_TAGS,Z):ne,M=Jt(l,"FORBID_CONTENTS")?Je({},l.FORBID_CONTENTS,Z):G,je=Jt(l,"FORBID_TAGS")?Je({},l.FORBID_TAGS,Z):mr({}),Ke=Jt(l,"FORBID_ATTR")?Je({},l.FORBID_ATTR,Z):mr({}),x=Jt(l,"USE_PROFILES")?l.USE_PROFILES:!1,rt=l.ALLOW_ARIA_ATTR!==!1,H=l.ALLOW_DATA_ATTR!==!1,F=l.ALLOW_UNKNOWN_PROTOCOLS||!1,se=l.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ce=l.SAFE_FOR_TEMPLATES||!1,Be=l.SAFE_FOR_XML!==!1,ze=l.WHOLE_DOCUMENT||!1,Ye=l.RETURN_DOM||!1,z=l.RETURN_DOM_FRAGMENT||!1,Q=l.RETURN_TRUSTED_TYPE||!1,lt=l.FORCE_BODY||!1,Re=l.SANITIZE_DOM!==!1,Ue=l.SANITIZE_NAMED_PROPS||!1,g=l.KEEP_CONTENT!==!1,$=l.IN_PLACE||!1,Me=l.ALLOWED_URI_REGEXP||xl,Ae=l.NAMESPACE||Le,fe=l.MATHML_TEXT_INTEGRATION_POINTS||fe,w=l.HTML_INTEGRATION_POINTS||w,we=l.CUSTOM_ELEMENT_HANDLING||{},l.CUSTOM_ELEMENT_HANDLING&&ft(l.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(we.tagNameCheck=l.CUSTOM_ELEMENT_HANDLING.tagNameCheck),l.CUSTOM_ELEMENT_HANDLING&&ft(l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(we.attributeNameCheck=l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),l.CUSTOM_ELEMENT_HANDLING&&typeof l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(we.allowCustomizedBuiltInElements=l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ce&&(H=!1),z&&(Ye=!0),x&&(_e=Je({},hl),Ee=[],x.html===!0&&(Je(_e,bl),Je(Ee,yl)),x.svg===!0&&(Je(_e,Do),Je(Ee,Fo),Je(Ee,Ss)),x.svgFilters===!0&&(Je(_e,No),Je(Ee,Fo),Je(Ee,Ss)),x.mathMl===!0&&(Je(_e,qo),Je(Ee,vl),Je(Ee,Ss))),l.ADD_TAGS&&(typeof l.ADD_TAGS=="function"?$e.tagCheck=l.ADD_TAGS:(_e===ve&&(_e=mr(_e)),Je(_e,l.ADD_TAGS,Z))),l.ADD_ATTR&&(typeof l.ADD_ATTR=="function"?$e.attributeCheck=l.ADD_ATTR:(Ee===Ne&&(Ee=mr(Ee)),Je(Ee,l.ADD_ATTR,Z))),l.ADD_URI_SAFE_ATTR&&Je(ce,l.ADD_URI_SAFE_ATTR,Z),l.FORBID_CONTENTS&&(M===G&&(M=mr(M)),Je(M,l.FORBID_CONTENTS,Z)),g&&(_e["#text"]=!0),ze&&Je(_e,["html","head","body"]),_e.table&&(Je(_e,["tbody"]),delete je.tbody),l.TRUSTED_TYPES_POLICY){if(typeof l.TRUSTED_TYPES_POLICY.createHTML!="function")throw Sn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof l.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Sn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=l.TRUSTED_TYPES_POLICY,S=L.createHTML("")}else L===void 0&&(L=Bp(R,s)),L!==null&&typeof S=="string"&&(S=L.createHTML(""));It&&It(l),ke=l}},et=Je({},[...Do,...No,...Rp]),yt=Je({},[...qo,...Ip]),dr=function(l){let _=W(l);(!_||!_.tagName)&&(_={namespaceURI:Ae,tagName:"template"});let E=Es(l.tagName),U=Es(_.tagName);return j[l.namespaceURI]?l.namespaceURI===xe?_.namespaceURI===Le?E==="svg":_.namespaceURI===me?E==="svg"&&(U==="annotation-xml"||fe[U]):!!et[E]:l.namespaceURI===me?_.namespaceURI===Le?E==="math":_.namespaceURI===xe?E==="math"&&w[U]:!!yt[E]:l.namespaceURI===Le?_.namespaceURI===xe&&!w[U]||_.namespaceURI===me&&!fe[U]?!1:!yt[E]&&(C[E]||!et[E]):!!(N==="application/xhtml+xml"&&j[l.namespaceURI]):!1},vt=function(l){xn(t.removed,{element:l});try{W(l).removeChild(l)}catch{P(l)}},Tt=function(l,_){try{xn(t.removed,{attribute:_.getAttributeNode(l),from:_})}catch{xn(t.removed,{attribute:null,from:_})}if(_.removeAttribute(l),l==="is")if(Ye||z)try{vt(_)}catch{}else try{_.setAttribute(l,"")}catch{}},ur=function(l){let _=null,E=null;if(lt)l="<remove></remove>"+l;else{let be=Po(l,/^[\r\n\t ]+/);E=be&&be[0]}N==="application/xhtml+xml"&&Ae===Le&&(l='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+l+"</body></html>");let U=L?L.createHTML(l):l;if(Ae===Le)try{_=new b().parseFromString(U,N)}catch{}if(!_||!_.documentElement){_=D.createDocument(Ae,"template",null);try{_.documentElement.innerHTML=He?S:U}catch{}}let ae=_.body||_.documentElement;return l&&E&&ae.insertBefore(r.createTextNode(E),ae.childNodes[0]||null),Ae===Le?oe.call(_,ze?"html":"body")[0]:ze?_.documentElement:ae},wr=function(l){return k.call(l.ownerDocument||l,l,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},jt=function(l){return l instanceof f&&(typeof l.nodeName!="string"||typeof l.textContent!="string"||typeof l.removeChild!="function"||!(l.attributes instanceof p)||typeof l.removeAttribute!="function"||typeof l.setAttribute!="function"||typeof l.namespaceURI!="string"||typeof l.insertBefore!="function"||typeof l.hasChildNodes!="function")},Ht=function(l){return typeof i=="function"&&l instanceof i};function wt(ge,l,_){As(ge,E=>{E.call(t,l,_,ke)})}let nr=function(l){let _=null;if(wt(te.beforeSanitizeElements,l,null),jt(l))return vt(l),!0;let E=Z(l.nodeName);if(wt(te.uponSanitizeElement,l,{tagName:E,allowedTags:_e}),Be&&l.hasChildNodes()&&!Ht(l.firstElementChild)&&Rt(/<[/\w!]/g,l.innerHTML)&&Rt(/<[/\w!]/g,l.textContent)||l.nodeType===Tn.progressingInstruction||Be&&l.nodeType===Tn.comment&&Rt(/<[/\w]/g,l.data))return vt(l),!0;if(!($e.tagCheck instanceof Function&&$e.tagCheck(E))&&(!_e[E]||je[E])){if(!je[E]&&Mt(E)&&(we.tagNameCheck instanceof RegExp&&Rt(we.tagNameCheck,E)||we.tagNameCheck instanceof Function&&we.tagNameCheck(E)))return!1;if(g&&!M[E]){let U=W(l)||l.parentNode,ae=K(l)||l.childNodes;if(ae&&U){let be=ae.length;for(let pe=be-1;pe>=0;--pe){let Ze=I(ae[pe],!0);Ze.__removalCount=(l.__removalCount||0)+1,U.insertBefore(Ze,V(l))}}}return vt(l),!0}return l instanceof d&&!dr(l)||(E==="noscript"||E==="noembed"||E==="noframes")&&Rt(/<\/no(script|embed|frames)/i,l.innerHTML)?(vt(l),!0):(Ce&&l.nodeType===Tn.text&&(_=l.textContent,As([re,Oe,nt],U=>{_=An(_,U," ")}),l.textContent!==_&&(xn(t.removed,{element:l.cloneNode()}),l.textContent=_)),wt(te.afterSanitizeElements,l,null),!1)},tt=function(l,_,E){if(Re&&(_==="id"||_==="name")&&(E in r||E in Se))return!1;if(!(H&&!Ke[_]&&Rt(De,_))){if(!(rt&&Rt(ot,_))){if(!($e.attributeCheck instanceof Function&&$e.attributeCheck(_,l))){if(!Ee[_]||Ke[_]){if(!(Mt(l)&&(we.tagNameCheck instanceof RegExp&&Rt(we.tagNameCheck,l)||we.tagNameCheck instanceof Function&&we.tagNameCheck(l))&&(we.attributeNameCheck instanceof RegExp&&Rt(we.attributeNameCheck,_)||we.attributeNameCheck instanceof Function&&we.attributeNameCheck(_,l))||_==="is"&&we.allowCustomizedBuiltInElements&&(we.tagNameCheck instanceof RegExp&&Rt(we.tagNameCheck,E)||we.tagNameCheck instanceof Function&&we.tagNameCheck(E))))return!1}else if(!ce[_]){if(!Rt(Me,An(E,Ve,""))){if(!((_==="src"||_==="xlink:href"||_==="href")&&l!=="script"&&Sp(E,"data:")===0&&Y[l])){if(!(F&&!Rt(it,An(E,Ve,"")))){if(E)return!1}}}}}}}return!0},Mt=function(l){return l!=="annotation-xml"&&Po(l,he)},kr=function(l){wt(te.beforeSanitizeAttributes,l,null);let{attributes:_}=l;if(!_||jt(l))return;let E={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ee,forceKeepAttr:void 0},U=_.length;for(;U--;){let ae=_[U],{name:be,namespaceURI:pe,value:Ze}=ae,y=Z(be),v=Ze,m=be==="value"?v:Ep(v);if(E.attrName=y,E.attrValue=m,E.keepAttr=!0,E.forceKeepAttr=void 0,wt(te.uponSanitizeAttribute,l,E),m=E.attrValue,Ue&&(y==="id"||y==="name")&&(Tt(be,l),m=ue+m),Be&&Rt(/((--!?|])>)|<\/(style|title|textarea)/i,m)){Tt(be,l);continue}if(y==="attributename"&&Po(m,"href")){Tt(be,l);continue}if(E.forceKeepAttr)continue;if(!E.keepAttr){Tt(be,l);continue}if(!se&&Rt(/\/>/i,m)){Tt(be,l);continue}Ce&&As([re,Oe,nt],T=>{m=An(m,T," ")});let O=Z(l.nodeName);if(!tt(O,y,m)){Tt(be,l);continue}if(L&&typeof R=="object"&&typeof R.getAttributeType=="function"&&!pe)switch(R.getAttributeType(O,y)){case"TrustedHTML":{m=L.createHTML(m);break}case"TrustedScriptURL":{m=L.createScriptURL(m);break}}if(m!==v)try{pe?l.setAttributeNS(pe,be,m):l.setAttribute(be,m),jt(l)?vt(l):gl(t.removed)}catch{Tt(be,l)}}wt(te.afterSanitizeAttributes,l,null)},Gt=function ge(l){let _=null,E=wr(l);for(wt(te.beforeSanitizeShadowDOM,l,null);_=E.nextNode();)wt(te.uponSanitizeShadowNode,_,null),nr(_),kr(_),_.content instanceof o&&ge(_.content);wt(te.afterSanitizeShadowDOM,l,null)};return t.sanitize=function(ge){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},_=null,E=null,U=null,ae=null;if(He=!ge,He&&(ge="<!-->"),typeof ge!="string"&&!Ht(ge))if(typeof ge.toString=="function"){if(ge=ge.toString(),typeof ge!="string")throw Sn("dirty is not a string, aborting")}else throw Sn("toString is not a function");if(!t.isSupported)return ge;if(Te||Et(l),t.removed=[],typeof ge=="string"&&($=!1),$){if(ge.nodeName){let Ze=Z(ge.nodeName);if(!_e[Ze]||je[Ze])throw Sn("root node is forbidden and cannot be sanitized in-place")}}else if(ge instanceof i)_=ur("<!---->"),E=_.ownerDocument.importNode(ge,!0),E.nodeType===Tn.element&&E.nodeName==="BODY"||E.nodeName==="HTML"?_=E:_.appendChild(E);else{if(!Ye&&!Ce&&!ze&&ge.indexOf("<")===-1)return L&&Q?L.createHTML(ge):ge;if(_=ur(ge),!_)return Ye?null:Q?S:""}_&&lt&&vt(_.firstChild);let be=wr($?ge:_);for(;U=be.nextNode();)nr(U),kr(U),U.content instanceof o&&Gt(U.content);if($)return ge;if(Ye){if(z)for(ae=B.call(_.ownerDocument);_.firstChild;)ae.appendChild(_.firstChild);else ae=_;return(Ee.shadowroot||Ee.shadowrootmode)&&(ae=de.call(n,ae,!0)),ae}let pe=ze?_.outerHTML:_.innerHTML;return ze&&_e["!doctype"]&&_.ownerDocument&&_.ownerDocument.doctype&&_.ownerDocument.doctype.name&&Rt(Al,_.ownerDocument.doctype.name)&&(pe="<!DOCTYPE "+_.ownerDocument.doctype.name+`>
`+pe),Ce&&As([re,Oe,nt],Ze=>{pe=An(pe,Ze," ")}),L&&Q?L.createHTML(pe):pe},t.setConfig=function(){let ge=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Et(ge),Te=!0},t.clearConfig=function(){ke=null,Te=!1},t.isValidAttribute=function(ge,l,_){ke||Et({});let E=Z(ge),U=Z(l);return tt(E,U,_)},t.addHook=function(ge,l){typeof l=="function"&&xn(te[ge],l)},t.removeHook=function(ge,l){if(l!==void 0){let _=xp(te[ge],l);return _===-1?void 0:Ap(te[ge],_,1)[0]}return gl(te[ge])},t.removeHooks=function(ge){te[ge]=[]},t.removeAllHooks=function(){te=kl()},t}var El=Sl();var gr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ts=e=>(...t)=>({_$litDirective$:e,values:t}),ln=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Cn=class extends ln{constructor(t){if(super(t),this.it=gt,t.type!==gr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===gt||t==null)return this._t=void 0,this.it=t;if(t===Bt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Cn.directiveName="unsafeHTML",Cn.resultType=1;var Tl=Ts(Cn);function Go(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Wr=Go();function Pl(e){Wr=e}var On={exec:()=>null};function st(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Ot.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Up=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ot={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Wp=/^(?:[ \t]*(?:\n|$))+/,zp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Hp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Mn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Gp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Vo=/(?:[*+-]|\d{1,9}[.)])/,Dl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Nl=st(Dl).replace(/bull/g,Vo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Vp=st(Dl).replace(/bull/g,Vo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ko=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Kp=/^[^\n]+/,Yo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Yp=st(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Yo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Zp=st(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Vo).getRegex(),Ms="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Zo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Xp=st("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Zo).replace("tag",Ms).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ql=st(Ko).replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex(),Qp=st(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ql).getRegex(),Xo={blockquote:Qp,code:zp,def:Yp,fences:Hp,heading:Gp,hr:Mn,html:Xp,lheading:Nl,list:Zp,newline:Wp,paragraph:ql,table:On,text:Kp},Cl=st("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex(),Jp={...Xo,lheading:Vp,table:Cl,paragraph:st(Ko).replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Cl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex()},ef={...Xo,html:st(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Zo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:On,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:st(Ko).replace("hr",Mn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Nl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},tf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,rf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Fl=/^( {2,}|\\)\n(?!\s*$)/,nf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ps=/[\p{P}\p{S}]/u,Qo=/[\s\p{P}\p{S}]/u,jl=/[^\s\p{P}\p{S}]/u,sf=st(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Qo).getRegex(),Bl=/(?!~)[\p{P}\p{S}]/u,of=/(?!~)[\s\p{P}\p{S}]/u,af=/(?:[^\s\p{P}\p{S}]|~)/u,lf=st(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Up?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ul=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,cf=st(Ul,"u").replace(/punct/g,Ps).getRegex(),df=st(Ul,"u").replace(/punct/g,Bl).getRegex(),Wl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",uf=st(Wl,"gu").replace(/notPunctSpace/g,jl).replace(/punctSpace/g,Qo).replace(/punct/g,Ps).getRegex(),pf=st(Wl,"gu").replace(/notPunctSpace/g,af).replace(/punctSpace/g,of).replace(/punct/g,Bl).getRegex(),ff=st("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,jl).replace(/punctSpace/g,Qo).replace(/punct/g,Ps).getRegex(),_f=st(/\\(punct)/,"gu").replace(/punct/g,Ps).getRegex(),mf=st(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),gf=st(Zo).replace("(?:-->|$)","-->").getRegex(),bf=st("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",gf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Is=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,hf=st(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Is).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),zl=st(/^!?\[(label)\]\[(ref)\]/).replace("label",Is).replace("ref",Yo).getRegex(),Hl=st(/^!?\[(ref)\](?:\[\])?/).replace("ref",Yo).getRegex(),yf=st("reflink|nolink(?!\\()","g").replace("reflink",zl).replace("nolink",Hl).getRegex(),Rl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Jo={_backpedal:On,anyPunctuation:_f,autolink:mf,blockSkip:lf,br:Fl,code:rf,del:On,emStrongLDelim:cf,emStrongRDelimAst:uf,emStrongRDelimUnd:ff,escape:tf,link:hf,nolink:Hl,punctuation:sf,reflink:zl,reflinkSearch:yf,tag:bf,text:nf,url:On},vf={...Jo,link:st(/^!?\[(label)\]\((.*?)\)/).replace("label",Is).getRegex(),reflink:st(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Is).getRegex()},Wo={...Jo,emStrongRDelimAst:pf,emStrongLDelim:df,url:st(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Rl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:st(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Rl).getRegex()},wf={...Wo,br:st(Fl).replace("{2,}","*").getRegex(),text:st(Wo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Cs={normal:Xo,gfm:Jp,pedantic:ef},Rn={normal:Jo,gfm:Wo,breaks:wf,pedantic:vf},kf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Il=e=>kf[e];function br(e,t){if(t){if(Ot.escapeTest.test(e))return e.replace(Ot.escapeReplace,Il)}else if(Ot.escapeTestNoEncode.test(e))return e.replace(Ot.escapeReplaceNoEncode,Il);return e}function Ll(e){try{e=encodeURI(e).replace(Ot.percentDecode,"%")}catch{return null}return e}function Ol(e,t){let r=e.replace(Ot.findPipe,(o,a,i)=>{let d=!1,u=a;for(;--u>=0&&i[u]==="\\";)d=!d;return d?"|":" |"}),n=r.split(Ot.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ot.slashPipe,"|");return n}function In(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function $f(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ml(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let d={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,d}function xf(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Ls=class{constructor(e){ct(this,"options");ct(this,"rules");ct(this,"lexer");this.options=e||Wr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:In(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=xf(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=In(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:In(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=In(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],d;for(d=0;d<r.length;d++)if(this.rules.other.blockquoteStart.test(r[d]))i.push(r[d]),a=!0;else if(!a)i.push(r[d]);else break;r=r.slice(d);let u=i.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let R=b,A=R.raw+`
`+r.join(`
`),I=this.blockquote(A);o[o.length-1]=I,n=n.substring(0,n.length-R.raw.length)+I.raw,s=s.substring(0,s.length-R.text.length)+I.text;break}else if(b?.type==="list"){let R=b,A=R.raw+`
`+r.join(`
`),I=this.list(A);o[o.length-1]=I,n=n.substring(0,n.length-b.raw.length)+I.raw,s=s.substring(0,s.length-R.raw.length)+I.raw,r=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let d=!1,u="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,I=>" ".repeat(3*I.length)),b=e.split(`
`,1)[0],R=!f.trim(),A=0;if(this.options.pedantic?(A=2,p=f.trimStart()):R?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,p=f.slice(A),A+=t[1].length),R&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),d=!0),!d){let I=this.rules.other.nextBulletRegex(A),P=this.rules.other.hrRegex(A),V=this.rules.other.fencesBeginRegex(A),K=this.rules.other.headingBeginRegex(A),W=this.rules.other.htmlBeginRegex(A);for(;e;){let L=e.split(`
`,1)[0],S;if(b=L,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),S=b):S=b.replace(this.rules.other.tabCharGlobal,"    "),V.test(b)||K.test(b)||W.test(b)||I.test(b)||P.test(b))break;if(S.search(this.rules.other.nonSpaceChar)>=A||!b.trim())p+=`
`+S.slice(A);else{if(R||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(f)||K.test(f)||P.test(f))break;p+=`
`+b}!R&&!b.trim()&&(R=!0),u+=L+`
`,e=e.substring(L.length+1),f=S.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let d of s.items){if(this.lexer.state.top=!1,d.tokens=this.lexer.blockTokens(d.text,[]),d.task){if(d.text=d.text.replace(this.rules.other.listReplaceTask,""),d.tokens[0]?.type==="text"||d.tokens[0]?.type==="paragraph"){d.tokens[0].raw=d.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),d.tokens[0].text=d.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(d.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};d.checked=p.checked,s.loose?d.tokens[0]&&["paragraph","text"].includes(d.tokens[0].type)&&"tokens"in d.tokens[0]&&d.tokens[0].tokens?(d.tokens[0].raw=p.raw+d.tokens[0].raw,d.tokens[0].text=p.raw+d.tokens[0].text,d.tokens[0].tokens.unshift(p)):d.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):d.tokens.unshift(p)}}if(!s.loose){let u=d.tokens.filter(f=>f.type==="space"),p=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let d of s.items){d.loose=!0;for(let u of d.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ol(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ol(a,o.header.length).map((i,d)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[d]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=In(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=$f(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ml(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ml(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,d=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){d+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+d);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let R=f.slice(1,-1);return{type:"em",raw:f,text:R,tokens:this.lexer.inlineTokens(R)}}let b=f.slice(2,-2);return{type:"strong",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},er=class zo{constructor(t){ct(this,"tokens");ct(this,"options");ct(this,"state");ct(this,"inlineQueue");ct(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Wr,this.options.tokenizer=this.options.tokenizer||new Ls,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ot,block:Cs.normal,inline:Rn.normal};this.options.pedantic?(r.block=Cs.pedantic,r.inline=Rn.pedantic):this.options.gfm&&(r.block=Cs.gfm,this.options.breaks?r.inline=Rn.breaks:r.inline=Rn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Cs,inline:Rn}}static lex(t,r){return new zo(r).lex(t)}static lexInline(t,r){return new zo(r).inlineTokens(t)}lex(t){t=t.replace(Ot.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Ot.tabCharGlobal,"    ").replace(Ot.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),d;this.options.extensions.startBlock.forEach(u=>{d=u.call({lexer:this},i),typeof d=="number"&&d>=0&&(a=Math.min(a,d))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let d;if(this.options.extensions?.inline?.some(p=>(d=p.call({lexer:this},t,r))?(t=t.substring(d.raw.length),r.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),r.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),r.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),r.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);let p=r.at(-1);d.type==="text"&&p?.type==="text"?(p.raw+=d.raw,p.text+=d.text):r.push(d);continue}if(d=this.tokenizer.emStrong(t,n,i)){t=t.substring(d.raw.length),r.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),r.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),r.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),r.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),r.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),r.push(d);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),b;this.options.extensions.startInline.forEach(R=>{b=R.call({lexer:this},f),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(i=d.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=d.raw,p.text+=d.text):r.push(d);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Os=class{constructor(e){ct(this,"options");ct(this,"parser");this.options=e||Wr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Ot.notSpaceStart)?.[0],s=e.replace(Ot.endingNewline,"")+`
`;return n?'<pre><code class="language-'+br(n)+'">'+(r?s:br(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:br(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let i=e.items[a];n+=this.listitem(i)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let s=0;s<e.header.length;s++)r+=this.tablecell(e.header[s]);t+=this.tablerow({text:r});let n="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];r="";for(let a=0;a<o.length;a++)r+=this.tablecell(o[a]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${br(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Ll(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+br(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ll(e);if(s===null)return br(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${br(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:br(e.text)}},ea=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},tr=class Ho{constructor(t){ct(this,"options");ct(this,"renderer");ct(this,"textRenderer");this.options=t||Wr,this.options.renderer=this.options.renderer||new Os,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ea}static parse(t,r){return new Ho(r).parse(t)}static parseInline(t,r){return new Ho(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Rs,Ln=(Rs=class{constructor(e){ct(this,"options");ct(this,"block");this.options=e||Wr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?er.lex:er.lexInline}provideParser(){return this.block?tr.parse:tr.parseInline}},ct(Rs,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ct(Rs,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Rs),Af=class{constructor(...e){ct(this,"defaults",Go());ct(this,"options",this.setOptions);ct(this,"parse",this.parseMarkdown(!0));ct(this,"parseInline",this.parseMarkdown(!1));ct(this,"Parser",tr);ct(this,"Renderer",Os);ct(this,"TextRenderer",ea);ct(this,"Lexer",er);ct(this,"Tokenizer",Ls);ct(this,"Hooks",Ln);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Os(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],d=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=d.apply(s,u)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Ls(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],d=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=d.apply(s,u)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Ln;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],d=s[a];Ln.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Ln.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,u);return d.call(s,f)})();let p=i.call(s,u);return d.call(s,p)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,u);return f===!1&&(f=await d.apply(s,u)),f})();let p=i.apply(s,u);return p===!1&&(p=d.apply(s,u)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return er.lex(e,t??this.defaults)}parser(e,t){return tr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?er.lex:er.lexInline)(a,s),d=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(d,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?tr.parse:tr.parseInline)(d,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?er.lex:er.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?tr.parse:tr.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+br(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ur=new Af;function at(e,t){return Ur.parse(e,t)}at.options=at.setOptions=function(e){return Ur.setOptions(e),at.defaults=Ur.defaults,Pl(at.defaults),at};at.getDefaults=Go;at.defaults=Wr;at.use=function(...e){return Ur.use(...e),at.defaults=Ur.defaults,Pl(at.defaults),at};at.walkTokens=function(e,t){return Ur.walkTokens(e,t)};at.parseInline=Ur.parseInline;at.Parser=tr;at.parser=tr.parse;at.Renderer=Os;at.TextRenderer=ea;at.Lexer=er;at.lexer=er.lex;at.Tokenizer=Ls;at.Hooks=Ln;at.parse=at;var Vb=at.options,Kb=at.setOptions,Yb=at.use,Zb=at.walkTokens,Xb=at.parseInline;var Qb=tr.parse,Jb=er.lex;function Tr(e){let t=at.parse(e),r=El.sanitize(t);return Tl(r)}function hr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function cn(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ds(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Sf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ef={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Tf=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Cf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ir(e){return!!e&&typeof e=="object"}function ta(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Gl(e,t){let r=ta(e),n=ta(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let d=s.get(i)||0;d>0?s.set(i,d-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Rf(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ir(s)&&typeof s.text=="string"?s.text:"").join(""):ir(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function If(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Sf[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ta(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Gl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let d=Gl(ir(i)?i.old_string:"",ir(i)?i.new_string:"");s+=d.added,o+=d.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ra(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function na(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Tf.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Cf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Lf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ir(o)){if(o.type==="text"&&typeof o.text=="string")s.push(na(o.text));else if(o.type==="thinking"){let a=ra(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=If(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ir(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Rf(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Of(e){if(e.type==="item.completed"&&ir(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[na(t.text)];if(t.type==="reasoning"){let r=ra(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Mf(e){if(e.schema!=="codex-delegation-monitor-v1"||!ir(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ir(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[na(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=ra(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=Ef[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Pf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Vl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ir(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?Mf(o):Pf(o)?Of(o):Lf(o,r);for(let i of a)t.push(i)}return t}var Df=5,Nf=10,qf=/Task\s+#(\d+)/,Ff=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,jf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ns(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Bf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Uf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Wf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let d=qf.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!d||u.length===0)continue;t.set(d[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function zf(e){if(e.tool==="Bash"){let t=e.command||"";return Ff.test(t)?"~ PR/\uAC8C\uC2DC \uC911":jf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Hf(e){let t=e.filter(s=>s.kind==="tool").slice(-Nf),r=new Map;t.forEach((s,o)=>{let a=zf(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Gf(e){let t=Uf(e);if(t)return{text:t,guess:!1};let r=Wf(e);if(r)return{text:r,guess:!1};let n=Hf(e);return n?{text:n,guess:!0}:null}function Vf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Nt(e,t)}function qs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,d=!1,u={},p=!0,f=new Set,b=new Set,R=null,A=null,I=!1,P=!1,V=!1,K=null,W=null;function L(){I=!1,P=!1,V=!1,K=null,W=null}async function S(H){if(r){P=!0,V=!1,_e();try{let F=await Promise.resolve(r("get-attempt-prompt",{attempt_id:H}));if(o!==H)return;!F||typeof F!="object"||Array.isArray(F)?V=!0:(K=F,W=H)}catch{o===H&&(V=!0)}finally{o===H&&(P=!1,_e())}}}function D(){if(I=!I,I&&o&&W!==o){S(o);return}_e()}function k(){if(!I)return"";let H=cn({loading:P,error:V});if(H)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${H}
      </div>`;if(!K)return"";if(K.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let F=Ds(K.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${F?c`<div class="prompt-block__meta">${F} 발송</div>`:""}
      ${typeof K.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",K.task_prompt):""}
      ${typeof K.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",K.system_prompt):""}
    </div>`}function B(){if(!i||!n)return[];let H=n.get(i);return Vl(H?H.lines:[])}function oe(){if(!i||!n)return null;let H=n.get(i),F=H?H.last_event_at:null;return typeof F=="number"?F:null}function de(){return u.status==="running"}function te(){if(de()&&o){A||(A=setInterval(()=>_e(),1e3));return}re()}function re(){A&&(clearInterval(A),A=null)}function Oe(H){let F=[],se=0;for(;se<H.length;){let Ce=H[se];if(Ce.kind==="tool"){let Be=se;for(;Be<H.length&&H[Be].kind==="tool"&&H[Be].tool===Ce.tool;)Be+=1;if(Be-se>=Df&&!b.has(se)){F.push({kind:"group",idx:se,tool:Ce.tool||"",lines:H.slice(se,Be).map((ze,Te)=>({idx:se+Te,line:ze}))}),se=Be;continue}}F.push({kind:"line",idx:se,line:Ce}),se+=1}return F}function nt(H){for(let F=H.length-1;F>=0;F-=1){let se=H[F];if(se.kind==="result"||se.kind==="error")return null;if(se.kind==="tool"&&!Object.hasOwn(se,"result"))return se}return null}function De(H){for(let F=H.length-1;F>=0;F-=1)if(H[F].kind==="thinking")return H[F];return null}function ot(H,F){if(F.kind==="gate")return c`<div class="sv__gate">${F.text}</div>`;if(F.kind==="phase")return c`<div class="sv__phase">${F.text}</div>`;if(F.kind==="result")return c`<div
        class="sv__result${F.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${F.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Tr(F.text||(F.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(F.kind==="thinking"){let se=f.has(H);return c`<div
        class="sv__think${se?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ee(H)}
      >
        <span class="sv__think-line">💭 ${Ns(F.text)}</span>
        ${se?c`<pre class="sv__think-expand">${F.text}</pre>`:""}
      </div>`}if(F.kind==="error")return c`<div class="sv__error">⛔ ${F.text}</div>`;if(F.kind==="blocker")return c`<div class="sv__error">⛔ ${F.text}</div>`;if(F.kind==="tool"){let se=f.has(H),Ce=F.tool==="Bash"?Bf(F.command):0,Be=F.tool==="Bash"?Ce>1?Ns(F.command):F.command:F.path||F.command||"";return c`<div
        class="sv__tool${se?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ee(H)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${F.icon}</span>
          <span class="sv__tool-name">${F.tool}</span>
          ${Be?c`<span class="sv__tool-detail">${Be}</span>`:""}
          ${Ce>1?c`<span class="sv__tool-more">⋯ ${Ce}줄</span>`:""}
          ${typeof F.added=="number"?c`<span class="sv__diff-add">+${F.added}</span>`:""}
          ${typeof F.removed=="number"?c`<span class="sv__diff-del">−${F.removed}</span>`:""}
          ${F.result?c`<span class="sv__tool-ok">→ ${F.result}</span>`:""}
        </span>
        ${se?c`<pre class="sv__tool-expand">${it(F)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Tr(F.text||"")}</div>`}function it(H){let F=[];if(H.tool==="Bash"&&typeof H.command=="string"&&H.command.length>0)F.push(H.command);else if(H.input!==void 0)try{F.push(`input: ${JSON.stringify(H.input,null,2)}`)}catch{}return typeof H.output=="string"&&H.output.length>0&&F.push(`output:
${H.output}`),F.join(`

`)}function Ve(){if(!o)return c``;let H=B(),F=(a?[u.model,u.effort]:[u.runner,u.model,u.effort]).filter(Boolean).join(" \xB7 "),se=u.session_id||"",Ce=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,Be=de(),ze=Be?Vf(oe(),Date.now()):"",Te=Be?nt(H):null,lt=Be?De(H):null,Ye=Gf(H);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?u.role||"":o}</span>
        ${Ye?c`<span
              class="sv__stage${Ye.guess?" sv__stage--guess":""}"
              title=${Ye.text}
              >${Ye.text}</span
            >`:""}
        ${Be?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ze?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ze}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ze?c`<span class="sv__live-ago">${ze}</span>`:""}</span
            >`:""}
        ${se?c`<button
              type="button"
              class="sv__session"
              title=${se}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${se}`}
              @click=${()=>we(se)}
            >
              ⧉ ${se.slice(0,8)}
            </button>`:""}
        ${F?c`<span class="sv__meta">${F}</span>`:""}
        ${u.worktree?c`<span class="sv__wt" title=${u.worktree}
              >${u.worktree}</span
            >`:""}
        ${a||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${I?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${I?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${D}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Ce}
          @click=${Ne}
        >
          <span class="sv__follow-full">⇣ ${Ce}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>rt()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":k()}
      <div class="sv__body">
        ${H.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Oe(H).map(z=>z.kind==="group"?he(z):ot(z.idx,z.line))}
      </div>
      ${Te||lt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Te?c`<span class="sv__now-icon">${Te.icon}</span>
                  <span class="sv__now-name">${Te.tool}</span>
                  <span class="sv__now-detail"
                    >${Te.tool==="Bash"?Ns(Te.command):Te.path||Te.command||""}</span
                  >`:""}
            ${lt?c`<span class="sv__now-think"
                  >💭 ${Ns(lt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function he(H){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Me(H.idx)}
    >
      <span class="sv__group-icon">${H.lines[0].line.icon}</span>
      <span class="sv__group-name">${H.tool}</span>
      <span class="sv__group-count">${H.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Me(H){b.add(H),_e()}function _e(){Qe(Ve(),e),te(),p&&ve()}function ve(){let H=e.querySelector(".sv__body");H&&(H.scrollTop=H.scrollHeight)}function Ee(H){f.has(H)?f.delete(H):f.add(H),_e()}function Ne(){p=!p,_e()}function we(H){Xt(H).then(F=>{F?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function je(H){!o||!H||(u={...u,...H},_e())}function Ke(H){let F=H.target;if(!F||!F.classList||!F.classList.contains("sv__body"))return;!(F.scrollHeight-F.scrollTop-F.clientHeight<=4)&&p&&(p=!1,_e())}e.addEventListener("scroll",Ke,!0);function $e(H){let F=H&&H.attempt_id;if(!F)return;let se=i;o=F,a=typeof H.launch_id=="string"&&H.launch_id.length>0?H.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&se&&se!==i&&Promise.resolve(r("unsubscribe-session-log",{id:se})).catch(()=>{}),u=H.meta||{},d=H.hide_prompt===!0,p=!0,f.clear(),b.clear(),L(),!R&&n&&(R=n.subscribe(_e)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),_e()}function rt(){let H=i;o=null,a=null,i=null,d=!1,f.clear(),b.clear(),L(),re(),r&&H&&Promise.resolve(r("unsubscribe-session-log",{id:H})).catch(()=>{}),Qe(c``,e),s&&s()}return{open:$e,updateMeta:je,close:rt,isOpen(){return o!==null},destroy(){re(),R&&(R(),R=null),e.removeEventListener("scroll",Ke,!0),o=null,a=null,i=null,d=!1,Qe(c``,e)}}}function Fs(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=sa(t.spec_id),s=sa(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function sa(e){return typeof e=="string"?e.trim():""}function Kl(e){let t=Fs(e);if(t.path)return t;let r=sa(Kf(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function Kf(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Yf(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Zf(e){let t=e&&e.metadata||{},r=Kl(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Yf(t)?null:"plan_pending"}),n}function Yl(e,t){let r=Zf(e);return c`
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
                ${n.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
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
  `}var Xf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Qf=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Jf=/^\*\*결론\*\* — (.+)$/;function js(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Xf)return null;let r=Qf.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Jf.exec(t[a]):null,d=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:d,body:t.slice(u).join(`
`).trim()}}var Zl=20;function Xl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function e_(e){return e.length>Zl?`${e.slice(0,Zl)}\u2026`:e}function t_(e,t,r,n){let s=`${t.lane} ${e_(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Xl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${Tr(t.body)}
        </div>`:""}
  </div>`}function r_(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Xl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Tr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ql(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((d,u)=>String(u.created_at||"").localeCompare(String(d.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(d=>{let u=js(typeof d.text=="string"?d.text:"");return u?t_(d,u,t,s.has(d.id)):r_(d)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${d=>t.onDraftInput&&t.onDraftInput(d.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${a||o.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:Lh}=vi;var Jl=e=>e.strings===void 0;var n_={},ec=(e,t=n_)=>e._$AH=t;var zr=Ts(class extends ln{constructor(e){if(super(e),e.type!==gr.PROPERTY&&e.type!==gr.ATTRIBUTE&&e.type!==gr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Jl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Bt||t===gt)return t;let r=e.element,n=e.name;if(e.type===gr.PROPERTY){if(t===r[n])return Bt}else if(e.type===gr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Bt}else if(e.type===gr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Bt;return ec(e),t}});var Bs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Cr=["orchestration_model","orchestration_effort","orchestration_speed"],tc=[...Bs,...Cr],Us=["delegated","main"],Ws=["inherit","claude","codex"],Pn=["default","fast"],Dn=["standard","fast_track"],Nn=["codex","opus","fable","self","skip"],zs=["codex","fable","skip"],Hs=["low","medium","high","xhigh"],lr="auto";function yr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function rc(e){if(!yr(e)||!yr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))yr(n)&&yr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function nc(e){return e?.impl_dispatch==="main"}function Gs(e,t){let r=rc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[lr,...n.flatMap(([,s])=>s)]}function dn(e,t,r){if(!yr(e)||!yr(e.runners))return[lr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!yr(o)||!yr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==lr&&a!==r)continue;let d=yr(i)?i.efforts:null;if(Array.isArray(d))for(let u of d)typeof u=="string"&&!n.includes(u)&&n.push(u)}return[lr,...n]}function Vs(e,t){let r=rc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function oa(e,t,r,n,s){return ks({key:e,choices:t,layer:"global",global:r,execution_defaults:n,runner_catalog:s})}function sc(e,t){let r={};for(let n of Bs){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function oc(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var aa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],ia={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ac={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function la(e,t,r,n,s,o=null){let a=nn({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function ic(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of la(e,t,r,n,s,o))a[i.source]+=1;return a}function lc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function cc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Wh=[...Bs,...Cr];var s_=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],o_={pin:"pin",global:"global",base:"base"};function a_(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${o_[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function i_(e,t,r){switch(e){case"workflow_mode":return Dn;case"spec_review_model":case"impl_review_model":return Nn;case"plan_review_model":return zs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Hs;case"impl_dispatch":return Us;case"impl_runtime":return Ws;case"impl_model":return Gs(r,t.impl_runtime);case"impl_effort":return dn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Pn;case"orchestration_model":return Vs(r,null);case"orchestration_effort":return dn(r,void 0,t.orchestration_model||lr).filter(n=>n!==lr);default:return[]}}function l_(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${a_(e.source)}
    <span class="detail-effective__k"
      >${ia[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ac[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${ia[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(r=>c`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function dc(e,t){let r=aa.flatMap(d=>d.keys),n=la(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=ic(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(d=>[d.key,d])),a=Object.fromEntries(n.filter(d=>d.value!==null).map(d=>[d.key,d.value])),i=n.filter(d=>d.full_value&&d.display!==d.full_value).map(d=>d.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${d=>t.onToggle(d.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${d=>{d.preventDefault();let u=d.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${c_(o)}</span
      >
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${s.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${s.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${s.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </summary>
    ${e.expanded?c`<div class="detail-effective__body">
          ${aa.map(d=>c`
              <div class="detail-effective__subhead">${d.label}</div>
              ${n.filter(u=>d.keys.includes(u.key)).map(u=>{let p=ks({key:u.key,choices:i_(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,controller_runtime:e.controller_runtime||null});return l_(u,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${zr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${d=>t.onPresetSelect(String(d.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(d=>c`<option
                    value=${d.id}
                    ?selected=${d.id===e.preset_id}
                  >
                    ${d.name}${d.compatible===!1?" (\uBE44\uD638\uD658)":""}
                  </option>`)}
            </select>
            <button
              type="button"
              data-apply-impl-preset
              ?disabled=${e.preset_id.length===0||e.preset_busy}
              @click=${t.onPresetApply}
            >
              이 이슈에 적용
            </button>
            <span class="detail-effective__hint"
              >세션 키 12개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function c_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function d_(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function uc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=d_(r.exec_receipt),d=i?Br(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=ys(r.planned_execution,r.exec_receipt);return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${p?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${d?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${d}
            >${u}${i?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${s_.map(f=>{let b=f.receipt&&typeof t[f.receipt]=="string"?String(t[f.receipt]):"",R=n[f.id],A=b.length>0||R?.fill==="full",I=!A&&R?.fill==="dim",P=R?.stale===!0;return c`<span
          class=${`detail-summary__gate${A?" detail-summary__gate--on":""}${I?" detail-summary__gate--current":""}${P?" detail-summary__gate--stale":""}`}
          data-gate=${f.id}
        >
          <span class="detail-summary__gate-pill">${f.label}</span>
          ${b?c`<span class="detail-summary__gate-sha"
                >${b.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var pc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function qn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ks(e){if(!qn(e)||!qn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>qn(r)&&qn(r.models));return t.length>0?t:null}function ca(e,t){let r=Ks(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function fc(e,t){return qn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function _c(e,t){let r=Ks(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return fc(n,n.models[t]);return[]}function u_(e){let t=Ks(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of fc(n,s))r.includes(o)||r.push(o);return r}function p_(e,t){if(!t)return u_(e);let n=Ks(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of _c(e,o))s.includes(a)||s.push(a);return s}function mc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ca(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?_c(t,n.impl_model):p_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function f_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function gc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function d(A){A.key==="Escape"&&s&&(A.preventDefault(),b())}document.addEventListener("keydown",d);function u(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${f_(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${i}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Tr(a)}
          </div>
        </div>
      </div>
    `:c``}function p(){Qe(u(),e)}async function f(A,I={}){s=A,o="loading",a="",i="",p();let P=r?r():"";if(!P){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let V="/api/doc?workspace="+encodeURIComponent(P)+"&path="+encodeURIComponent(A);try{let K=await n(V),W=await K.json().catch(()=>({}));if(!K.ok||!W||W.ok!==!0){if(W?.error==="not_found"&&I.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(W&&W.error||K.status)+")",p();return}a=String(W.content||""),o="ready",p()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function b(){s=null,Qe(c``,e)}function R(){document.removeEventListener("keydown",d),b()}return{open:f,close:b,destroy:R}}var __=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],hc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ys=["implementation","review-consult"],m_=["running","done","failed","interrupted"],g_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function b_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function h_(e){let t=xt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=on(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${hc}
          >부분 집계</span
        >`:""}`}function bc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function da(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ua(t):""}function y_(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Ys.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!m_.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function v_(e,t){let n=xt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model,t.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?c`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${da(t.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${da(t.completed_at)}</span
        >`:""}
    ${n?c`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function w_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?xt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?ua(e.last_event_at):s?da(s.completed_at):"";return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${g_[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${["codex",e.model,e.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${e.session_id}
      >${e.session_id.slice(0,8)}</span
    >
    ${i?c`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function k_(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function $_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=y_(p);!f||s.has(f.launch_id)||(s.add(f.launch_id),n.push(f))}n.sort((p,f)=>p.started_at-f.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let p of Ys){let f=t.roles[p]?.codex;a[p]=f?[...f.legs]:[]}let i=Ys.flatMap(p=>a[p]),d=new Set,u=[];for(let p of Ys){for(let f of n.filter(b=>b.role===p)){let b=i.find(R=>R.receipt_id===f.launch_id)||null;b&&!k_(f,b)||(b&&d.add(b.receipt_id),u.push(w_(f,b,e.attempt_id,r)))}for(let f of a[p])d.has(f.receipt_id)||u.push(v_(p,f))}return u}function x_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...__,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${b_(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${hc}</span>`:""}
  </div>`}var A_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ua(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function S_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function yc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let f=typeof u.session_id=="string"&&u.session_id.length>0,b=o.has(u.attempt_id),R=f&&!b,A=f?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!R}
      title=${A}
      @click=${I=>{I.stopPropagation(),R&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let f=u.cause_detail,b=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:u.cause;return c`<div class="detail-session__cause" title=${b}>
      ${u.cause}
    </div>`},d=u=>{let p=bc(Oo(u));if(xt(p).length===0&&!on(u.usage))return"";let f=s.has(u.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${h_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let p=Oo(u),f=bc(p),b=xt(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${A_[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${Sr(u)?c`<span
                  class="detail-session__resumed"
                  title=${Sr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ar(u)}</span>
            ${b.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?c`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(R=>c`<span
                      class="detail-session__usage"
                      title=${R.tooltip}
                      >${R.label}</span
                    >`):on(u.usage)?c`<span class="detail-session__usage"
                    >${on(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ua(u.started_at)}</span>
          </button>
          ${d(u)} ${a(u)} ${i(u)} ${S_(u)}
          ${s.has(u.attempt_id)&&u.usage?x_(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${$_(u,p,t)}
        </div>`})}
    </div>
  `}function vc(e,t={}){return c`
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
          ${E_(e)}
        </div>`:""}
  `}function E_(e){let t=cn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?hr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Ds(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var T_=["open","in_progress","deferred","resolved","closed"],C_=[0,1,2,3,4];function wc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,d=t.sessionLogStore,u=null,p=null,f={},b="",R=!1,A=[],I=!1,P={},V=!1,K=!1,W="",L="",S="";function D(){V=!1,K=!1,W="",L="",S=""}let k=[],B=null,oe=null,de=!1,te="",re=!1,Oe=0,nt=new Set;function De(){k=[],B=null,oe=null,de=!1,te="",re=!1,Oe+=1,nt.clear()}async function ot(m){if(!s)return;let O=++Oe;try{let T=await Promise.resolve(s("get-comments",{id:m}));if(O!==Oe||m!==u)return;k=Array.isArray(T)?T:[],de=!1}catch{if(O!==Oe||m!==u)return;de=!0}v()}function it(){if(!s||!u)return;let m=p&&typeof p.comment_count=="number"?p.comment_count:null;if(B!==u){B=u,oe=m,ot(u);return}m!==null&&m!==oe&&(oe=m,ot(u))}function Ve(m){nt.has(m)?nt.delete(m):nt.add(m),v()}function he(m){let O=te.trim().length===0;te=m,O!==(m.trim().length===0)&&v()}async function Me(){let m=te.trim();if(!s||!u||m.length===0||re)return;let O=u;re=!0,v();let T=!1;try{let ee=await Promise.resolve(s("add-comment",{id:O,text:m}));Array.isArray(ee)&&ee.length>0&&(T=!0,O===u&&(k=ee,de=!1,te="",oe=ee.length))}catch{T=!1}T||ie("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),O===u&&(re=!1),v()}let _e={onToggle:Ve,onDraftInput:he,onSubmit:Me},ve=document.createElement("div");ve.className="md-viewer-root",document.body.appendChild(ve);let Ee=gc(ve,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ne=document.createElement("div");Ne.className="session-log-root",document.body.appendChild(Ne);let we=qs(Ne,{transport:s?(m,O)=>Promise.resolve(s(m,O)):void 0,sessionLogStore:d}),je=!1,Ke=!1,$e=!1,rt=null,H=null,F=0;function se(m){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${m}`}function Ce(){je=!1,Ke=!1,$e=!1,rt=null,H=null,F+=1}async function Be(m){if(!s)return;let O=++F;Ke=!0,$e=!1,v();try{let T=await Promise.resolve(s("get-bead-prompt",{bead_id:m}));if(O!==F)return;!T||typeof T!="object"||Array.isArray(T)?$e=!0:(rt=T,H=se(m))}catch{O===F&&($e=!0)}finally{O===F&&(Ke=!1,v())}}function ze(){if(je=!je,je&&u&&H!==se(u)){rt=null,Be(u);return}v()}function Te(){if(!a||!u)return[];let m=a.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(T=>T&&T.bead_id===u).sort((T,ee)=>(ee.started_at||0)-(T.started_at||0)).map(T=>({attempt_id:T.attempt_id,bead_id:T.bead_id,status:T.status,started_at:typeof T.started_at=="number"?T.started_at:null,runner:T.runner||null,model:T.model||null,effort:T.effort||T.observed_effort||null,speed:T.speed||null,session_id:T.session_id||null,resumed_from:T.resumed_from||null,continuation_mode:T.continuation_mode||null,dismissed_at:typeof T.dismissed_at=="number"?T.dismissed_at:null,cause:typeof T.cause=="string"?T.cause:null,cause_detail:T.cause_detail||null,exec_default_preset_id:typeof T.exec_default_preset_id=="string"?T.exec_default_preset_id:null,exec_default_preset_revision:typeof T.exec_default_preset_revision=="number"?T.exec_default_preset_revision:null,exec_values:T.exec_values&&typeof T.exec_values=="object"?T.exec_values:null,usage:T.usage||null,usage_legs:Array.isArray(T.usage_legs)?T.usage_legs:[],delegation_sessions:Array.isArray(T.delegation_sessions)?T.delegation_sessions:[]}))}function lt(){if(!a||!u)return null;let m=a.get();return Wt(m&&m.attempts||{},u)}let Ye=new Set;function z(m){Ye.has(m)?Ye.delete(m):Ye.add(m),v()}function Q(m){let O=a?a.get():null,T=O&&O.attempts?O.attempts[m]:null;we.open({attempt_id:m,meta:T?{runner:T.runner||void 0,model:T.model||void 0,effort:T.effort||void 0,status:T.status||void 0,session_id:T.session_id||void 0}:{}})}function Re(m,O){let T=a?a.get():null,ee=T&&T.attempts?T.attempts[m]:null,Ge=(ee&&Array.isArray(ee.delegation_sessions)?ee.delegation_sessions:[]).find(Xe=>Xe&&typeof Xe=="object"&&Xe.launch_id===O);Ge&&we.open({attempt_id:m,launch_id:O,meta:{runner:"codex",role:Ge.role,model:Ge.model,effort:Ge.effort,session_id:Ge.session_id,status:Ge.status}})}async function Ue(m){if(!s||!m)return;let O=await sn();if(O===null)return;let T=()=>{let Xe=a?a.get():null;return Xe&&typeof Xe.revision=="number"?Xe.revision:0},ee=async(Xe={},Pe=T())=>await s("worker-attempt-resume",{attempt_id:m,expected_revision:Pe,...O!==""?{instructions:O}:{},...Xe}),Fe=Xe=>{Xe?.queue&&a?.set&&a.set(Xe.queue)},Ge=await ee();if(Fe(Ge),Ge&&Ge.conflict){let Xe=Ge.queue&&typeof Ge.queue.revision=="number"?Ge.queue.revision:T();Ge=await ee({},Xe),Fe(Ge)}Ge=await fr(Ge,(Xe,Pe)=>ee({continuation:Xe,decision_token:Pe}),{onResult:Fe,refresh:()=>ee()}),Ge&&Ge.resumed===!1&&!Ge.conflict&&Ge.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ge.reason}`,"error",2400)}let ue={onOpen:Q,onOpenDelegation:Re,onResume:Ue,onToggleUsage:z};function g(){let m=a?a.get():null,O={...P};for(let T of["orchestration_model","orchestration_effort","orchestration_speed"]){let ee=m&&m[T];typeof ee=="string"&&(O[T]=ee)}return O}async function $(){if(s){try{let m=await Promise.resolve(s("get-session-defaults",{}));P=m&&m.values&&typeof m.values=="object"?m.values:{}}catch{P={}}v()}}function x(){let m=a?a.get():null;return m&&m.runner_catalog||null}function M(){let m=a?a.get():null;return m&&typeof m.execution_defaults=="object"?m.execution_defaults:null}function G(){let m=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},T=nn({pin:{...m,...f},global:g(),execution_defaults:M(),runner_catalog:x(),route:typeof m.route=="string"?m.route:null}).orchestration_model.value||"";return ca(x(),T)}function Y(){let m=i?i.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function ne(m){return m?.compatible===!1}function ce(m){i&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&i.set({revision:m.revision,presets:m.presets})}async function qe(){let m=Y(),O=m?.presets.find(T=>T.id===b);if(!(!s||!u||!m||!O||ne(O)||R)){R=!0,A=[],v();try{let T=await Promise.resolve(s("apply-impl-preset",cc(u,O.id,m.revision)));if(T&&T.conflict){ce(T),ie("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ee=T&&Array.isArray(T.issue)?T.issue[0]:T?.issue;if(T&&T.applied&&ee&&typeof ee=="object"){p=ee,A=Array.isArray(T.skipped_orchestration_keys)?T.skipped_orchestration_keys.filter(Fe=>typeof Fe=="string"):[];for(let Fe of pc)delete f[Fe];ie(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}T&&T.error==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(T){T&&typeof T=="object"&&T.code==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{R=!1,v()}}}let me=null;r&&r.subscribe&&(me=r.subscribe(()=>He()));let xe=null;a&&typeof a.subscribe=="function"&&(xe=a.subscribe(()=>{u&&v()}));let Le=null;i&&typeof i.subscribe=="function"&&(Le=i.subscribe(()=>{u&&v()}));function Ae(m){m.key==="Escape"&&u&&(m.preventDefault(),n())}document.addEventListener("keydown",Ae);function He(){if(u){if(r&&typeof r.snapshotFor=="function"){let m=r.snapshotFor("detail:"+u)||[];p=m.find(T=>T&&T.id===u)||m[0]||p}it(),v()}}function j(m){Xt(m).then(O=>{O?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function J(m){m.preventDefault(),m.stopPropagation(),u&&j(u)}function fe(m,O){m.preventDefault(),m.stopPropagation(),j(O)}function w(m,O,T){m.preventDefault(),m.stopPropagation(),Ee.open(O,{missing_state:T})}function C(m,O){f[m]=O,v(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",lc(u,m,O.length===0?null:O))).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function N(m,O){let T=p||{},ee=T.metadata&&typeof T.metadata=="object"?T.metadata:{},Fe={};for(let Pe of["impl_runtime","impl_model","impl_effort"])Fe[Pe]=Object.hasOwn(f,Pe)?f[Pe]:typeof ee[Pe]=="string"?ee[Pe]:"";Fe[m]=O;let Ge=mc(Fe,x(),G()),Xe={};for(let Pe of["impl_runtime","impl_model","impl_effort"])Xe[Pe]=f[Pe],f[Pe]=Ge[Pe]||"";v(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Ge,orchestration_runtime:G()})).then(Pe=>{let mt=Array.isArray(Pe)?Pe[0]:Pe;if(!mt||typeof mt!="object"||!mt.id)throw new Error("implementation target readback failed");p=mt;for(let sr of["impl_runtime","impl_model","impl_effort"])delete f[sr];v()}).catch(()=>{for(let Pe of["impl_runtime","impl_model","impl_effort"])Xe[Pe]===void 0?delete f[Pe]:f[Pe]=Xe[Pe];v(),ie("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function X(m,O,T){if(!s||!u)return!1;try{let ee=await Promise.resolve(s(m,O)),Fe=Array.isArray(ee)?ee[0]:ee;return Fe&&typeof Fe=="object"&&Fe.id?(p=Fe,!0):(ie(T,"error"),!1)}catch{return ie(T,"error"),!1}}function ye(m){setTimeout(()=>{try{let O=e.querySelector(m);O&&typeof O.focus=="function"&&O.focus()}catch{}},0)}function Z(){V=!0,W=p&&p.title||"",v(),ye('.detail-edit__input[data-edit="title"]')}function ke(m){W=m.target.value}function Se(){V=!1,W="",v()}function ft(){X("edit-text",{id:u,field:"title",value:W},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(V=!1,W=""),v()})}function Et(){K=!0,L=p&&p.description||"",v(),ye('.detail-edit__textarea[data-edit="description"]')}function et(m){L=m.target.value}function yt(){K=!1,L="",v()}function dr(){X("edit-text",{id:u,field:"description",value:L},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(K=!1,L=""),v()})}function vt(m,O,T,ee){if(m.key==="Escape"){m.stopPropagation(),T();return}m.key==="Enter"&&(!ee||m.ctrlKey||m.metaKey)&&(m.preventDefault(),O())}function Tt(m){let O=m.target.value;X("update-status",{id:u,status:O},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function ur(m){let O=Number(m.target.value);X("update-priority",{id:u,priority:O},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function wr(m){S=m.target.value}function jt(){let m=S.trim();m.length!==0&&X("label-add",{id:u,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(O=>{O&&(S=""),v()})}function Ht(m){if(m.key==="Escape"){m.stopPropagation(),S="",v();return}m.key==="Enter"&&(m.preventDefault(),jt())}function wt(m){X("label-remove",{id:u,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>v())}let nr={onCopyPath:fe,onOpenDoc:w};function tt(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function Mt(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function kr(m){let T=(Array.isArray(m.dependencies)?m.dependencies:[]).map(ee=>({id:tt(ee),icon:Mt(ee)})).filter(ee=>ee.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${T.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${T.map(ee=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(ee.id)}
                  >
                    ${ee.icon?`${ee.icon} `:""}${ee.id}
                  </button>`:c`<span class="detail-dep"
                    >${ee.icon?`${ee.icon} `:""}${ee.id}</span
                  >`)}
          </div>`}
    `}function Gt(m){let O=m.metadata||{},T=m.workflow||{},ee=T.stages||{},Fe=ee.spec&&ee.spec.stale,Ge=ee.impl&&ee.impl.stale,Xe=ee.plan||null,Pe=T.route_source==="derived",mt=T.route||O.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Pe?" detail-kv__v--derived":""}"
          title=${Pe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Pe?"unset":mt}</span
        >
      </div>
      ${T.route!=="quick_fix"||Object.hasOwn(O,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${O.spec_review||"\uC5C6\uC74C"}${Fe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Xe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Xe?.approval_receipt||"\uC5C6\uC74C"}${Xe?.approval_state==="stale"?" \xB7 stale":Xe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${T.route!=="quick_fix"||Object.hasOwn(O,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${O.impl_review||"\uC5C6\uC74C"}${Ge?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${T.planned_execution.kind}</span>
            </div>
            ${T.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${T.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${T.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Br(T.exec_receipt)}</span
            >
          </div>`:""}
      ${T.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${T.impl_entry.actor}@${T.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${O.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${O.pr_url}</span>
          </div>`:""}
    `}let ge={route:["quick_fix","spec_backed","full_plan"]};async function l(m,O){let T=O.target.value;if(m==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&T!=="full_plan"&&!window.confirm(`full_plan \u2192 ${T||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){v();return}await X("update-workflow-meta",{id:u,key:m,value:T},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),v()}function _(m){let O=m.metadata||{};return c` ${((ee,Fe)=>{let Ge=ge[ee],Xe=typeof O[ee]=="string"?O[ee]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ee}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ee}
          data-edit=${`wfmeta-${ee}`}
          @change=${Pe=>l(ee,Pe)}
        >
          <option value="" ?selected=${!Ge.includes(Xe)}>
            ${Fe}
          </option>
          ${Ge.map(Pe=>c`<option value=${Pe} ?selected=${Xe===Pe}>${Pe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function E(m,O){return V?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${W}
            @input=${ke}
            @keydown=${T=>vt(T,ft,Se,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ft}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Se}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
        ${xt(O).map(T=>c`<span class="detail-usage-total" title=${T.tooltip}
              >${T.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Z}
        >
          ✎
        </button>
      </div>
    `}function U(m){let O=kt(m.created_at),T=kt(m.updated_at);return!O&&!T?c``:c`
      ${O?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${O}</span>
          </div>`:""}
      ${T?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
    `}function ae(m,O){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Tt}
        >
          ${T_.map(T=>c`<option value=${T} ?selected=${T===m}>${T}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ur}
        >
          ${C_.map(T=>c`<option value=${String(T)} ?selected=${T===O}>
                P${T}
              </option>`)}
        </select>
      </div>
    `}function be(m){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${K?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Et}
            >
              ✎
            </button>`}
      </div>
      ${K?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${L}
              @input=${et}
              @keydown=${O=>vt(O,dr,yt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${dr}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${yt}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${m||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function pe(m){let O=typeof m.notes=="string"?m.notes:"";return O.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${O}</div>
    `}function Ze(m){let O=Array.isArray(m.labels)?m.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${O.map(T=>c`<span class="detail-label-chip"
              >${T}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${T}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+T}
                @click=${()=>wt(T)}
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
            @input=${wr}
            @keydown=${Ht}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${jt}
          >
            추가
          </button>
        </span>
      </div>
    `}function y(){if(!u)return c``;let m=p||{},O=String(m.id||u),T=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ee=lt(),Fe=m.status||"open",Ge=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",Xe=m.description||"",Pe={...m,metadata:{...m.metadata||{},...f}};return c`
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
            @click=${J}
          >
            ${O}
          </button>
          ${E(T,ee)}
          ${uc(Pe)}
          ${dc({metadata:Pe.metadata,workspace_values:g(),catalog:x(),execution_defaults:M(),expanded:I,presets:Y()?.presets||[],preset_id:b,preset_busy:R,skipped_orchestration_keys:A},{onToggle:mt=>{I=mt,v()},onEdit:(mt,sr)=>{if(mt==="impl_runtime"||mt==="impl_model"||mt==="impl_effort"){N(mt,sr??"");return}C(mt,sr??"")},onPresetSelect:mt=>{b=mt,A=[],v()},onPresetApply:()=>{qe()}})}
          ${ae(Fe,Ge)} ${U(m)}
          ${be(Xe)}
          ${Ql(k,_e,{expanded:nt,draft:te,sending:re,error:de})}
          ${pe(m)} ${Ze(m)} ${kr(m)}
          ${Gt(m)} ${_(m)}
          ${Yl(m,nr)}
          ${vc({expanded:je,loading:Ke,error:$e,data:rt},{onToggle:ze})}
          ${yc(Te(),ue,{total:ee,expanded:Ye})}
        </div>
      </div>
    `}function v(){Qe(y(),e)}return{load(m){m!==u&&(f={},b="",A=[],I=!1,D(),De(),Ce()),u=m,p=null,He(),$()},clear(){u=null,p=null,f={},b="",R=!1,A=[],I=!1,D(),De(),Ce(),Ee.close(),we.close(),Qe(c``,e)},destroy(){me&&(me(),me=null),xe&&(xe(),xe=null),Le&&(Le(),Le=null),document.removeEventListener("keydown",Ae),Ee.destroy(),ve.parentNode&&ve.parentNode.removeChild(ve),we.destroy(),Ne.parentNode&&Ne.parentNode.removeChild(Ne),u=null,p=null,b="",R=!1,A=[],De(),Ce(),Qe(c``,e)}}}function kc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},d=(u,p,f="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let b=typeof f=="string"?f.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:d,close:i,getElement(){return t}}}function Zs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Xs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function $c(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function Qs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function R_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:Zs(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function xc(e,t){let r=R_(e,t);return r?c`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?c`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?kt(r.deploy.at):""}
            >${Qs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Xs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function un(e){let t=Nt(e.created_at),r=Nt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${kt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function I_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Fn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Js(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function cr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,b)=>(f.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,d=s?I_(s.phase):null,u=s?.kind==="stale_work_backup_fresh",p=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${d||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:d,error:i,confirmation:p}}function vr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?c`<code>백업: ${n}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var L_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ac(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let d=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:L_[d]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function pa(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=xt(e.usage),s=Qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,d=i?Nt(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",R=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=c`<span class="worker-mini__title">${e.title}</span>`,I=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",P=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",V=r.map(De=>De===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${De}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${De===e.completion_badge&&e.completion_title||""}
          >${De}</span
        >`),K=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",W=n.length>0?n.map(De=>c`<span class="worker-usage" title=${De.tooltip}
              >${De.label}</span
            >`):s?c`<span class="worker-usage" title=${an(e.usage)}
            >${s}</span
          >`:"",L=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",S=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",D=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",k=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",B=e.discard,oe=B?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${B?.attempt_id||""}
          data-operation-id=${B?.operation?.operation_id||""}
          data-discard-mode=${B?.confirmation||"unmerged"}
          ?disabled=${B?!B.enabled:e.discard_enabled===!1}
          title=${B?B.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${B?.label||"\uD3D0\uAE30"}
        </button>`:"",de=e.stale_work||null,te=de?c`${de.can_resume||de.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${de.action_id}
            ?disabled=${de.locked}
          >
            기존 작업 이어가기
          </button>`:""}${de.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${de.action_id}
            ?disabled=${de.locked}
          >
            백업 후 새로 시작
          </button>`:""}${de.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${de.action_id}
            ?disabled=${de.locked}
          >
            다시 확인
          </button>`:""}`:"",re=de?c`<div class="worker-mini__stale">
        <strong>${de.title}</strong>
        <span>${de.summary}</span>
        <span>${de.cause}</span>
        ${de.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Oe=e.revise_action?c`<button
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
        </button>`:"",nt=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||B?.operation||e.revise_action||de);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${b}${R}${A}</div>
          <div class="worker-mini__row2">
            ${W}${d?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${kt(e.done_at)}`}
                  >완료 ${d}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Xs(e.work_ms)}</span
                >`:""}${V}${L}
            <span class="worker-mini__actions"
              >${S}${D}${k}${oe}</span
            >
            ${un(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${u}${p}${b}${R}${I}${P}${V}${f}${K}
            </div>
            <div class="worker-mini__body">${A}${re}</div>
            ${nt?c`<div class="worker-mini__foot">
                  ${W}${L}
                  <span class="worker-mini__actions"
                    >${S}${D}${k}${oe}${Oe}${te}</span
                  >
                  ${vr(e)}
                </div>`:""}
            ${un(e)}`:c`<div class="worker-mini__line">
              ${u}${p}${b}${R}${A}${I}${P}${V}${f}${K}${W}${L}${S}${D}${k}${oe}
            </div>
            ${vr(e)} ${un(e)}`}
  </div>`}function O_(e,t=null){let r=e.draggable&&!e.done,n=r&&t&&t.bead_id===e.id,s=e.workflow,o=s&&s.chips||{},a=o.route||s&&s.route,i=o.route_source==="derived"||!!(s&&s.route_source==="derived"),d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),u=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
    class="worker-card${r?"":" worker-card--static"}"
    draggable=${r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${r?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s&&a?c`<span
            class="ctl-chip ctl-chip--route${i?" is-derived":""}"
            title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${i?"unset":a}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${s?hs(s,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${n?c`<div class="worker-card__place-menu">
            ${t.lanes.map(p=>c`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${p.id}
                  title="${p.label} 대기 맨 뒤에 추가"
                >
                  <span>${p.label}</span>
                  <span class="worker-card__place-count">${p.count}</span>
                </button>`)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:c`${e.reason?c`<span
                  class="worker-card__reason${u?" worker-card__reason--danger":""}"
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
              ?disabled=${!r}
              title=${r?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":d?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${un(e)}
  </div>`}function rr(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?O_(n,e.place_menu):pa(n))}
          </div>`}
  </section>`}function fa(e,t){return`${e}\0${t}`}function _a(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function M_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function P_(e,t){return e==="internal"&&t===void 0}function Sc(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Ec(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Sc(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=M_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:P_(a,s)}}function Tc(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let d of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=fa(i.root_dir,d.id);r.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:d.id}),s.set(u,[]);for(let p of Array.isArray(d.items)?d.items:[])n.set(p.id,u)}for(let i of t)for(let d of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=fa(i.root_dir,d.id),p=Array.isArray(d.items)?d.items[0]:null,b=!!p&&p.queue_index===0&&(!Array.isArray(d.occupied_by)||d.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],R=s.get(u);if(R)for(let A of b){let I=n.get(A);I&&I!==u&&!R.includes(I)&&R.push(I)}}let o=(i,d)=>{let u=new Set,p=[i];for(;p.length>0;){let f=p.pop();if(f===d)return!0;!f||u.has(f)||(u.add(f),p.push(...s.get(f)||[]))}return!1},a=new Map;for(let[i,d]of s){let u=[];for(let p of d){let f=r.get(p);o(p,i)&&f&&u.push(f)}u.length>0&&a.set(i,u)}return a}function Cc(e){let t=_a(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=Sc(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function Rc(e,t){return fa(e,t)}var Ic=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],jn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function eo(e,t){let r=Ic.find(s=>s.step===e);if(!r)return null;let n=Ic.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Lc(e){let t=jn.findIndex(r=>r.step===e);return jn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Hr(e){let t=jn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function D_(e){let t=jn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:jn.length}}function to(e){let t=D_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ga=new Set(["queued","running","retry_pending","repairing"]),Oc=new Set(["failed","succeeded"]),N_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Bn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},q_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Bn.base_containment,child_sweep:Bn.child_sweep,branch_cleanup:Bn.branch_cleanup,parent_close:Bn.parent_close};function F_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function j_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...ga,...Oc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function B_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",d=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(d)}function ma(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=N_[s];if(!o)return null;let a=eo(r,`${n} ${o}`);return a?{...a,active:ga.has(s),failed:s==="failed"}:null}function U_(e){return!e||typeof e!="object"?null:q_[e.step]||null}function Un(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=U_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=F_(e.merge_sha)?e.merge_sha:null,d=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&j_(A,t,i)).sort(B_):[],u=a?d:[],p=u.find(A=>ga.has(A.state));if(p)return ma(p);if(s)return s.step==="repo_operations"&&d[0]?ma(d[0],!0):null;let f=u.find(A=>Oc.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return ma(f);if(n){let A=eo(n.step,n.label);return A?{...A,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?Bn[e.cleanup_cursor]:null;if(!b)return null;let R=eo(b.step,b.label);return R?{...R,active:!0,failed:!1}:null}function ro(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Mc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Pc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Dc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ba(e){for(let t of Dc(e))if(Object.hasOwn(Mc,t))return Mc[t];return null}function ha(e){let t=null;for(let r of Dc(e))Object.hasOwn(Pc,r)&&(t=Pc[r]);return t}function no(e){let t=ba(e),r=ha(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Nc(e,t){let r=ba(e)??ba(t),n=ha(t)??ha(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var qc=160;function W_(e){return e.length>qc?`${e.slice(0,qc)}\u2026`:e}function z_(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${W_(e.command)}</code>`:""}
  </div>`}function H_(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ya(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Fc(e){let t=e.failure?no(e.failure.reason):"";return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?c`<button
                type="button"
                class="worker-banner__discard"
                data-bead-id=${e.failure.bead_id}
                data-attempt-id=${e.failure.resume_attempt_id||""}
                data-operation-id=${e.failure.discard.operation?.operation_id||""}
                data-confirmation=${e.failure.discard.confirmation}
                ?disabled=${!e.failure.discard.enabled}
                title=${e.failure.discard.title}
              >
                ${e.failure.discard.label}
              </button>`:""}
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${z_(e.failure.cause_detail)}
          ${H_(e.failure.reason)}
          ${vr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function G_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ya(t-e.started_at):"\u2014",a=ar(e),i=Sr(e),d=xt(e.usage),u=Qt(e.usage),p=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,f=e.base_exception||null,b=e.landing,R=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${R?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?c`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?c`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${A}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 알림 닫기 — 레인에는 남습니다"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:c`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?c`<button
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
            ${A}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${b?c`<div class="rtile__landing">
          <span
            class="merge-step${b.failed?" merge-step--failed":""}"
            style=${`--progress: ${b.percent}%`}
            >${b.label}${b.index>0?c`<span class="merge-step__n"
                  >${b.index}/${b.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||d.length>0||u||p||f?c`<div class="rtile__meta">
          ${p?c`<span class="worker-mini__badge">${p}</span>`:""}
          ${f?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${f}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${d.length>0?d.map(I=>c`<span class="worker-usage" title=${I.tooltip}
                    >${I.label}</span
                  >`):u?c`<span
                  class="worker-usage"
                  title=${an(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${un(e)} ${vr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function va(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>G_(s,t,r))}
  </div>`}function Gr(e){return c`<svg
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
  </svg>`}function wa(){return Gr($r`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ka(){return Gr($r`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function jc(){return Gr($r`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Bc(){return Gr($r`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Uc(){return Gr($r`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Wc(){return Gr($r`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function zc(){return Gr($r`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Wn=1,V_=6e4,K_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Y_=new Set(["auto_merge","merged","merge","done"]),Hc={running:3,paused:2,failed:1};function Z_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function X_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),b=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let d=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let f=Hc[u.run_state],b=Hc[i];if(f>b||f===b&&(u.started_at??0)>(d??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:d,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Wt(e,a.bead_id),can_pause:i==="running"&&p,can_resume:i!=="running"&&p&&!n.has(a.attempt_id)})}return o}function Gc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function At(e){return e&&typeof e=="object"?e:{}}function $a(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let k of s)k&&typeof k.root_dir=="string"&&a.set(k.root_dir,k);let i=[],d=[],u=[],p=[],f=[],b=[],R=new Map,A=new Map,I=new Map;for(let k of n){if(!k||typeof k.root_dir!="string")continue;let B=k.root_dir,oe=k.name||B,de=a.get(B),te=de&&typeof de.revision=="number"?de.revision:typeof k.revision=="number"?k.revision:0,re=At(k.attempts),Oe=At(k.bead_titles),nt=At(k.pr_observations),De=At(k.admission),ot=At(k.revise_parked),it=At(k.merge_queue_state),Ve=At(k.cleanup_failed),he=At(k.discard_operations),Me=At(k.bead_blocked_by),_e=At(k.pr_activity),ve=Array.isArray(k.repo_operations)?k.repo_operations:[],Ee=Array.isArray(k.merge_queue)?k.merge_queue:[],Ne=new Set(Ee.filter(z=>z&&typeof z.bead_id=="string").map(z=>z.bead_id)),we=new Map(Ee.filter(z=>z&&typeof z.bead_id=="string").map(z=>[z.bead_id,z])),je=Array.isArray(k.queue)?k.queue:[],Ke=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).filter(z=>z&&/^s[1-5]$/.test(z.id)&&Array.isArray(z.entries)),$e=At(k.lane_states),rt=typeof k.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(k.serial_lane_count))):Math.min(5,Ke.length);I.set(B,rt);let H=new Map(Ke.map(z=>[z.id,z])),F=new Map;for(let z of Ke)for(let Q of z.entries)Q&&typeof Q.bead_id=="string"&&F.set(Q.bead_id,z.id);let se=Array.isArray(k.done)?k.done:[];for(let z of se)z&&typeof z.bead_id=="string"&&b.push({id:z.bead_id,root_dir:B,workspace_name:oe});let Ce=new Map;for(let z of se)z&&typeof z.bead_id=="string"&&typeof z.added_at=="number"&&Ce.set(z.bead_id,z.added_at);let Be=z=>({id:z,title:Oe[z]||z,root_dir:B,workspace_name:oe,expected_revision:te,draggable:!1}),ze=new Set;for(let[z,Q]of X_(re,Ce))ze.add(z),d.push({...Be(z),lane:"running",...F.has(z)?{serial_lane_id:F.get(z)}:{},attempt_id:Q.attempt_id,run_state:Q.run_state,can_pause:Q.can_pause,can_resume:Q.can_resume,started_at:Q.started_at,last_event_at:Q.last_event_at,runner:Q.runner,model:Q.model,effort:Q.effort,speed:Q.speed,resumed_from:Q.resumed_from,continuation_mode:Q.continuation_mode,usage:Q.usage,discard:cr(he,z,{attempt_id:Q.attempt_id}),badges:Q.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:Q.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:Q.run_state==="failed"});for(let z of Array.isArray(k.pr_wait)?k.pr_wait:[]){let Q=z&&z.bead_id;if(typeof Q!="string"||ze.has(Q))continue;ze.add(Q);let Re=At(nt[Q]),Ue=At(Re.pr),ue=Re.gate?At(Re.gate):null,g=Ne.has(Q),$=we.get(Q)?.continuation_action||null,x=!!$&&$.continuation===null,M=it.active===Q,G=z.external===!0,Y=Ve[Q]||null,ne=At(_e[Q]),ce=Un({bead_id:Q,merge_sha:z.merge_sha,cleanup_cursor:z.cleanup_cursor,merge_progress:ne.merge_progress||null,cleanup_failed:Y,repo_operations:ve}),qe=ro(ce),me=!!ue&&ue.base_badge==="\uCDA9\uB3CC",xe=!!Y&&["child_sweep","branch_cleanup","parent_close"].includes(Y.step)&&!!ue&&ue.tier==="merged",Le=G&&!!Y&&!!ue&&ue.tier==="merged",Ae=!!ue&&["closed_unmerged","review","undecidable"].includes(ue.tier),He=cr(he,Q,{external:G,merge_active:M||ce?.step==="merge",merge_queued:g,cleanup_active:qe,merged:!!Y||ue?.tier==="merged"}),j=!!He.operation;u.push({...Be(Q),lane:"pr_wait",pr_number:typeof Ue.number=="number"?Ue.number:null,pr_url:typeof Ue.url=="string"?Ue.url:void 0,external:G,usage:Wt(re,Q),merge_step:ce,badges:x?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ce?[ue?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Y?[Hr(Y.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Hr(Y.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ue?.gate_badge=="string"&&ue.gate_badge.length>0?[ue.gate_badge]:[],alert:ce?ce.failed===!0:!!Y||Ae,reason:Y&&ce?.active!==!0?to(Y.step):"PR \uB300\uAE30",merge_action:ue?.tier==="merged"&&!xe&&!Le?!1:!g||x,merge_enabled:!j&&(x||ue?.enabled===!0||me||xe||Le),merge_label:x?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Le||xe?"\uC815\uB9AC \uC7AC\uAC1C":me&&!xe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:x?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":j?He.error?`\uD3D0\uAE30 \uC2E4\uD328: ${He.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${He.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":me?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ue?.enabled===!0?`\uBA38\uC9C0 (${ue.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ue?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:g&&!x,cancel_enabled:!M,continuation_mismatch:$?.mismatch||null,discard:He,discard_action:He.action,discard_enabled:He.enabled,discard_title:He.title})}let Te=(z,Q,Re,Ue)=>{let ue=z&&z.bead_id;if(typeof ue!="string"||ze.has(ue))return null;ze.add(ue);let g=ot[ue],$=cr(he,ue),x=$.operation?$:null,M={...Be(ue),lane:Q,draggable:!x,discard:x||void 0,reason:Gc(De,ue),queue_position:Re+1,queue_index:Re,queue_length:Ue,badges:g?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!g,revise_action:!!g,revise_enabled:!!g&&!x,revise_title:g?g.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${g.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Me,ue)&&(M.blocked_by=Array.isArray(Me[ue])?Me[ue].filter(G=>typeof G=="string"&&G.length>0):[]),M};for(let z=0;z<je.length;z++){let Q=Te(je[z],"queue",z,je.length);if(!Q)continue;p.push(Q);let Re=R.get(B);Re?Re.push(Q):R.set(B,[Q])}let lt=[];for(let z=0;z<Ke.length;z++){let Q=Ke[z],Re=[];for(let ue=0;ue<Q.entries.length;ue++){let g=Te(Q.entries[ue],Q.id,ue,Q.entries.length);g&&(Re.push(g),p.push(g))}if(Re.length===0)continue;let Ue=At($e[Q.id]);lt.push({id:Q.id,index:z,items:Re,occupied_by:Array.isArray(Ue.occupied_by)?Ue.occupied_by.filter(ue=>typeof ue=="string"):[],corrections:Array.isArray(Ue.corrections)?Ue.corrections.length:0,cycle:Ue.cycle===!0})}A.set(B,lt);let Ye=Array.from({length:rt},(z,Q)=>{let Re=`s${Q+1}`,Ue=H.get(Re),ue=Ue&&Array.isArray(Ue.entries)?Ue.entries:[],g=At($e[Re]);return{id:Re,index:ue.length,length:ue.length,occupied_by:Array.isArray(g.occupied_by)?g.occupied_by.filter($=>typeof $=="string"):[]}});for(let z of Array.isArray(k.runnable)?k.runnable:[]){let Q=z&&z.bead_id;typeof Q!="string"||ze.has(Q)||(ze.add(Q),i.push({...Be(Q),title:z.title||Oe[Q]||Q,lane:"runnable",draggable:!0,reason:Gc(De,Q),created_at:z.created_at??void 0,updated_at:z.updated_at??void 0,labels:Array.isArray(z.labels)?z.labels:[],spec_reviewer:typeof z.spec_reviewer=="string"?z.spec_reviewer:void 0,plan_state:z.plan_state==="approved"||z.plan_state==="authored"?z.plan_state:"none",workflow:z.route?{route:z.route,chips:{route:z.route}}:null,blocked:z.blocked===!0,...Array.isArray(z.blocked_by)?{blocked_by:z.blocked_by.filter(Re=>typeof Re=="string"&&Re.length>0)}:{},place_index:je.length,place_lanes:Ye}))}for(let z of se){let Q=z&&z.bead_id;if(typeof Q!="string"||ze.has(Q)||(ze.add(Q),o!==void 0&&typeof z.added_at=="number"&&z.added_at<o))continue;let Re=Z_(re,Q);f.push({...Be(Q),lane:"done",done:!0,usage:Wt(re,Q),done_at:typeof z.added_at=="number"?z.added_at:void 0,done_kind:Re&&typeof Re.done_kind=="string"?Re.done_kind:null})}}let P=new Map;s.forEach((k,B)=>{k&&typeof k.root_dir=="string"&&P.set(k.root_dir,B)});let V=r&&r.running_sort==="repo"?"repo":"started";d.sort((k,B)=>{if(V==="repo"){let te=P.get(k.root_dir)??Number.MAX_SAFE_INTEGER,re=P.get(B.root_dir)??Number.MAX_SAFE_INTEGER;if(te!==re)return te-re}let oe=typeof k.started_at=="number"&&Number.isFinite(k.started_at)?k.started_at:null,de=typeof B.started_at=="number"&&Number.isFinite(B.started_at)?B.started_at:null;return oe!==null&&de!==null&&oe!==de?oe-de:oe===null&&de!==null?1:oe!==null&&de===null?-1:k.id.localeCompare(B.id)}),f.sort((k,B)=>(B.done_at??0)-(k.done_at??0));let K=s.length>0?s:n.map(k=>({root_dir:k&&k.root_dir,name:k&&k.name,auto_advance:k&&k.auto_advance,auto_merge:k&&k.auto_merge,slots:k&&k.slots,revision:k&&k.revision,runner_catalog:k&&k.runner_catalog})),W=[];for(let k of K){if(!k||typeof k.root_dir!="string")continue;let B=R.get(k.root_dir)||[],oe=A.get(k.root_dir)||[];W.push({root_dir:k.root_dir,name:k.name||k.root_dir,auto_advance:k.auto_advance===!0,auto_merge:k.auto_merge===!0,slots:typeof k.slots=="number"&&k.slots>=Wn?k.slots:Wn,revision:typeof k.revision=="number"?k.revision:0,runner_catalog:At(k.runner_catalog),items:B,sublanes:{parallel:B,serial:oe},serial_lane_count:I.get(k.root_dir)||0})}let L={runnable:i,queue:p,queue_groups:W,running:d,pr_wait:u,done:f,automation:{total:W.length,both_on:W.filter(k=>k.auto_advance&&k.auto_merge).length}},S=_a(L);for(let k of b)S.has(k.id)||S.set(k.id,{root_dir:k.root_dir,workspace_name:k.workspace_name,lane:"done",state:"done"});for(let k of[...L.queue,...L.runnable]){if(!Object.hasOwn(k,"blocked_by"))continue;let B=S.get(k.id);k.blockers=(k.blocked_by||[]).map(oe=>Ec(oe,B,S,s)),k.blocker_warnings=k.blockers.filter(oe=>oe.missing_internal).map(oe=>`\u26A0 \uC120\uD589 ${oe.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),k.blocker_warnings.length>0&&(k.alert=!0)}let D=Tc(L.queue_groups);for(let k of L.queue_groups)for(let B of k.sublanes.serial){let oe=D.get(Rc(k.root_dir,B.id));oe&&(B.cross_wait_peers=oe)}return L}function Q_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<V_;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${kt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Nt(e,t)}</span
        >`}</span
  >`}function zn(e){return c`<div class="mon-c__title">${e.title}</div>`}function Hn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function so(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function xa(e){let t=xt(e.usage),r=Qt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${an(e.usage)}
        >${r}</span
      >`:""}function Aa(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function J_(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${ka()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${wa()}
        </button>`}
    ${e.discard?.action?c`<button
          type="button"
          class="mon-op mon-op--discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-discard-mode=${e.discard.confirmation}
          ?disabled=${!e.discard.enabled}
          aria-label=${e.discard.label}
          title=${e.discard.title}
        >
          ${e.discard.label}
        </button>`:""}
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Bc()}
        </button>`:""}
  </span>`}function Vc(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?c`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>c`<span
        class="mon-blocker${r.same_lane_ahead?" mon-blocker--normal":""}"
      >
        <span>${r.label}</span>
        <button
          type="button"
          class="mon-blocker__remove"
          data-blocker-id=${r.id}
          aria-label=${`\uC120\uD589 ${r.id} \uC5F0\uACB0 \uD574\uC81C`}
          title="직렬 연결 해제"
        >
          ✕
        </button>
      </span>`)}function Kc(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?c`<div class="mon-blocker-warnings">
        ${t.map(r=>c`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function Yc(){return c`<span class="mon-link mon-popover-owner">
    <button
      type="button"
      class="mon-link__trigger"
      aria-haspopup="dialog"
      aria-expanded="false"
      title="직렬로 연결"
    >
      🔗
    </button>
    <span class="mon-link__popover mon-card-popover" role="dialog" hidden>
      <input
        type="search"
        class="mon-link__search"
        placeholder="id·제목·위치 검색"
        aria-label="직렬로 연결할 버드 검색"
        autocomplete="off"
      />
      <span class="mon-link__list"></span>
      <button type="button" class="mon-link__direct" hidden></button>
      <span class="mon-link__empty" hidden>검색 결과 없음</span>
      <span class="mon-link__error" role="alert" hidden></span>
    </span>
  </span>`}function em(e,t){let r=typeof e.started_at=="number"?ya(t-e.started_at):"";return c`${zn(e)}
    <div class="mon-c__meta">
      ${Aa(e)}${Q_(e.last_event_at,t)}${Hn(e)}${so(e)}
      ${ar(e)?c`<span class="mon-c__model">${ar(e)}</span>`:""}
      ${Sr(e)?c`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?c`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${xa(e)}${J_(e)}${vr(e)}
    </div>`}function tm(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Nt(e.updated_at);return c`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Hn(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${bs(e.labels,null).map(d=>c`<span class="ctl-chip ctl-chip--label">${d}</span>`)}
      ${so(e)}
      ${i?c`<span title=${`\uC218\uC815 ${kt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?c`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${Vc(e)}
      <span class="mon-c__ops">
        ${Yc()}
        <span class="mon-place mon-popover-owner">
          <button
            type="button"
            class="worker-card__place"
            data-bead-id=${e.id}
            aria-haspopup="menu"
            aria-expanded="false"
            title="적재할 대기 레인 선택"
          >
            대기로 ↴
          </button>
          <span class="mon-place__popover mon-card-popover" role="menu" hidden>
            <button
              type="button"
              class="mon-place__choice"
              data-lane="parallel"
              data-place-index=${String(e.place_index??0)}
              role="menuitem"
              aria-label=${`\uBCD1\uB82C \xB7 \uB300\uAE30 ${e.place_index??0}`}
            >
              <strong>병렬</strong><span>대기 ${e.place_index??0}</span>
            </button>
            ${(e.place_lanes||[]).map(d=>c`<button
                  type="button"
                  class="mon-place__choice"
                  data-lane=${d.id}
                  data-place-index=${String(d.index)}
                  role="menuitem"
                  aria-label=${`${d.id} \xB7 ${d.occupied_by.length>0?`\uC810\uC720 ${d.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"} \xB7 \uB300\uAE30 ${d.length}`}
                >
                  <strong>${d.id}</strong
                  ><span
                    >${d.occupied_by.length>0?`\uC810\uC720 ${d.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"}
                    · 대기 ${d.length}</span
                  >
                </button>`)}
          </span>
        </span>
      </span>
    </div>
    ${Kc(e)}`}function rm(e){let t=!!e.discard?.operation;return c`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Hn(e)}
      ${Aa(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${Vc(e)}
      <span class="mon-c__ops">
        ${Yc()}
        <button
          type="button"
          class="mon-op mon-op--up"
          ?disabled=${t||(e.queue_position??1)<=1}
          aria-label="한 칸 앞으로"
          title="한 칸 앞으로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon-op mon-op--down"
          ?disabled=${t||(e.queue_index??0)>=(e.queue_length??1)-1}
          aria-label="한 칸 뒤로"
          title="한 칸 뒤로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon-op mon-op--remove"
          ?disabled=${t}
          aria-label="대기 큐에서 제거"
          title="대기 큐에서 제거"
        >
          ✕
        </button>
        ${t?c`<button
              type="button"
              class="worker-mini__discard"
              data-bead-id=${e.id}
              data-attempt-id=${e.discard?.attempt_id||""}
              data-operation-id=${e.discard?.operation?.operation_id||""}
              data-discard-mode=${e.discard?.confirmation||"unmerged"}
              ?disabled=${!e.discard?.enabled}
              aria-label=${e.discard?.label||"\uD3D0\uAE30"}
              title=${e.discard?.title||""}
            >
              ${e.discard?.label||"\uD3D0\uAE30"}
            </button>`:""}
      </span>
    </div>
    ${Kc(e)} ${vr(e)}
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
        </div>`:""}`}function nm(e){let t=e.merge_step||null,r=!!(Qt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return c`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${so(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Aa(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?c`<div class="mon-c__tail">
          ${xa(e)}${t?c`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?c`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
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
                data-attempt-id=${e.discard?.attempt_id||""}
                data-operation-id=${e.discard?.operation?.operation_id||""}
                data-discard-mode=${e.discard?.confirmation||"unmerged"}
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_title}
              >
                ${e.discard?.label||"\uD3D0\uAE30"}
              </button>`:""}
          ${vr(e)}
        </div>`:""}`}function sm(e,t){let r=e.done_kind||"",n=r?K_[r]||r:"",s=Nt(e.done_at,t);return c`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${so(e)}
      ${n?c`<span
            class="mon-live__kind${Y_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${xa(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${kt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Zc(e,t){return e.lane==="running"?em(e,t):e.lane==="runnable"?tm(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?rm(e):e.lane==="pr_wait"?nm(e):sm(e,t)}function Xc(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return c`<header
    class="mon-group__hd${r===0?" is-empty":""}"
    data-root-dir=${e.root_dir}
    data-revision=${t}
  >
    <span class="mon-group__name" title=${e.root_dir}>${e.name}</span>
    <span class="mon-group__count">${r}</span>
    <span class="mon-group__ops">
      <button
        type="button"
        class="mon-ctl mon-ctl--advance${e.auto_advance?" is-active":""}"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        data-on=${e.auto_advance?"false":"true"}
        aria-pressed=${e.auto_advance?"true":"false"}
        title=${e.auto_advance?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      >
        ${e.auto_advance?ka():wa()}
        <span class="mon-ctl__label">자동화</span>
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
        ${Uc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Wc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Wn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Qc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=or.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?jc():zc()}
      <span class="mon-auto-all__label"
        >${n?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${r}/${t}`}</span
      >
    </button>
    <div class="mon-kpi">
      <span
        class="mon-running-sort-group"
        role="group"
        aria-label="실행중 정렬"
      >
        <button
          type="button"
          class="mon-running-sort${s==="started"?" is-active":""}"
          data-sort="started"
          aria-pressed=${s==="started"?"true":"false"}
        >
          시작순
        </button>
        <span aria-hidden="true">|</span>
        <button
          type="button"
          class="mon-running-sort${s==="repo"?" is-active":""}"
          data-sort="repo"
          aria-pressed=${s==="repo"?"true":"false"}
        >
          레포순
        </button>
      </span>
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
        ${or.map(i=>c`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Jc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ed(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return xt(xs(t));let r={};for(let i of _r)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let d=i&&i.usage;if(d&&typeof d=="object"){let u=!1;for(let p of _r){let f=d[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,u=!0)}if(u){o+=1;let p=d.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Qt(r):null}var td="bdui.monitor.done-range",rd="bdui.monitor.running_sort",nd="beads-ui.monitor.candidate-filter",Sa={show_blocked:!1};function om(){try{let e=window.localStorage.getItem(nd);if(!e)return{...Sa};let t=JSON.parse(e);return!t||typeof t!="object"?{...Sa}:{show_blocked:t.show_blocked===!0}}catch{return{...Sa}}}function am(e){try{window.localStorage.setItem(nd,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function im(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function lm(){try{let e=window.localStorage.getItem(td);return Ut(e)?e:Dt}catch{return Dt}}function cm(e){try{window.localStorage.setItem(td,e)}catch{}}function dm(){try{return window.localStorage.getItem(rd)==="repo"?"repo":"started"}catch{return"started"}}function um(e){try{window.localStorage.setItem(rd,e)}catch{}}var sd="tab:monitor:pipeline",pm=1e3,fm=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function oo(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}${e.blocked?" mon-card--blocked":""}"
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
    ${Zc(e,t)}
  </div>`}function _m(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?c`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>oo(s,t))}
        </div>
      </section>`:c`<div class="mon-group__list">
        ${e.items.map(s=>oo(s,t))}
      </div>`;return c`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${Xc(e)} ${n}
    ${r?e.sublanes.serial.map(s=>c`<section
              class="mon-sublane mon-sublane--serial"
              data-serial-lane=${s.id}
            >
              <header class="mon-sublane__hd">
                <span class="mon-sublane__name">${s.id}</span>
                <span class="mon-sublane__count"
                  >대기 ${s.items.length}</span
                >
                ${s.occupied_by.length>0?c`<span class="mon-sublane__held"
                      >${`\u25CF \uC810\uC720 \uC911 \xB7 ${s.occupied_by.join(", ")} (\uBA38\uC9C0\uAE4C\uC9C0 \uC720\uC9C0)`}</span
                    >`:""}
                ${s.corrections>0?c`<span class="mon-sublane__corrections"
                      >순서 자동 교정 ${s.corrections}건</span
                    >`:""}
                ${s.cross_wait_peers?.map(o=>c`<span class="mon-sublane__cross-wait"
                      >⚠ 상호 정지 — ${o.workspace_name}·${o.lane}과 교차
                      대기</span
                    >`)}
              </header>
              ${s.cycle?c`<div class="mon-sublane__cycle">
                    ⛔ 의존 사이클 — 자동 교정 불가
                  </div>`:""}
              <div class="mon-group__list">
                ${s.items.map(o=>oo(o,t))}
              </div>
            </section>`):""}
  </div>`}function od(e,t){let r=_t("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,d=t.now||(()=>Date.now()),u=t.confirm||(g=>typeof globalThis.confirm!="function"||globalThis.confirm(g)),p=lm(),f=dm(),b=om();function R(){let g=or.find($=>$.value===p);return g?g.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let I=$a(null,null),P=new Map,V=null,K=null;async function W(g,$,x,M,G=!0){if(!o||!x)return null;let Y=await o(g,{...$,root_dir:x,expected_revision:M});if(Y&&Y.conflict&&G){Y.queue&&P.set(x,Y.queue);let ne=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:M;Y=await o(g,{...$,root_dir:x,expected_revision:ne})}return Y&&Y.queue&&x&&P.set(x,Y.queue),Y}function L(g,$){let x=P.get(g),M=s&&s.get?s.get():null,G=(Array.isArray(M)?M:[]).find(ne=>ne?.root_dir===g);return(x||G)?.merge_queue?.find(ne=>ne.bead_id===$)?.continuation_action}async function S(g,$,x,M){let G=await W(g,$,x,M),Y=P.get(x)?.revision??G?.queue?.revision??M;return fr(G,(ne,ce)=>W(g,{...$,continuation:ne,decision_token:ce},x,Y,!1),{refresh:ne=>W(g,$,x,ne?.queue?.revision??P.get(x)?.revision??Y,!1)})}async function D(g,$,x,M){let G=await fr({continuation_mismatch:M},(ne,ce)=>W("worker-merge-queue-add",{bead_id:$,continuation:ne,decision_token:ce},g,x,!1)),Y=G?.queue?.merge_queue?.find(ne=>ne.bead_id===$)?.continuation_action;G?.applied!==!0&&Y?.continuation===null&&Y.mismatch&&await D(g,$,G.queue.revision,Y.mismatch)}async function k(g,$,x){let M=await W("worker-discard",g,$,x);if(M&&M.discarded===!0){ie(Js(M),"success",5e3);return}if(M&&M.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${M.reason}`,"error");return}if(M&&M.accepted&&M.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(M&&M.accepted){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${M.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}M&&!M.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function B(g,$,x){return!o||!x?null:await o(g,{...$,root_dir:x})}async function oe(g){if(!o||!g&&!u("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let $=await o("monitor-auto-toggle",{on:g}),x=$&&Array.isArray($.failed)?$.failed:[];x.length>0&&ie(`\uC790\uB3D9\uD654 ${g?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${x.map(M=>M.root_dir).join(", ")}`,"error",3200)}async function de(){let g=new Map;for(let $ of I.pr_wait)g.has($.root_dir)||g.set($.root_dir,$.expected_revision);for(let[$,x]of g)await W("worker-merge-queue-add-all",{},$,x)}let te=null,re=!1,Oe=null;function nt(){Oe!==null&&clearTimeout(Oe),Oe=setTimeout(()=>{Oe=null,re=!1},0)}function De(g){let $=g.target;return typeof $?.closest=="function"?$.closest(".mon-group"):null}function ot(g){let $=De(g);return!$||!te?null:($.getAttribute("data-root-dir")||"")===te.root_dir?$:null}function it(){for(let g of Array.from(A.querySelectorAll(".mon-group--drag-over")))g.classList.remove("mon-group--drag-over")}function Ve(g){let $=g.target,x=typeof $?.closest=="function"?$.closest('.mon-card[draggable="true"]'):null;if(x){te={bead_id:x.getAttribute("data-issue-id")||"",lane:x.getAttribute("data-lane")||"",root_dir:x.getAttribute("data-root-dir")||"",revision:Number(x.getAttribute("data-revision")||0)||0,queue_index:Number(x.getAttribute("data-queue-index")),queue_length:Number(x.getAttribute("data-queue-length")),place_index:Number(x.getAttribute("data-place-index"))},re=!0;try{g.dataTransfer?.setData("text/plain",te.bead_id),g.dataTransfer&&(g.dataTransfer.effectAllowed="move")}catch{}}}function he(g){let $=ot(g);$&&(g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect="move"),$.classList.add("mon-group--drag-over"))}function Me(g){De(g)?.classList.remove("mon-group--drag-over")}function _e(){te=null,it(),nt()}function ve(g){let $=ot(g),x=te;if(te=null,it(),!$||!x||!x.bead_id)return;g.preventDefault();let M=g.target,G=typeof M?.closest=="function"?M.closest('.mon-card[data-lane="queue"]'):null,Y=G&&$.contains(G)?Number(G.getAttribute("data-queue-index")):NaN;if(x.lane==="runnable"){let qe=Number.isFinite(Y)?Y:x.place_index;if(!Number.isFinite(qe))return;W("worker-queue-place",{bead_id:x.bead_id,index:qe},x.root_dir,x.revision);return}if(x.lane!=="queue"||G&&G.getAttribute("data-issue-id")===x.bead_id)return;let ne=x.queue_index,ce=Number.isFinite(Y)?ne>Y?Y:Y-1:x.queue_length-1;!Number.isFinite(ce)||ce<0||ce===ne||W("worker-queue-reorder",{bead_id:x.bead_id,to_index:ce},x.root_dir,x.revision)}function Ee(g){let $=im(I.runnable,b),x={runnable:$.visible,queue:I.queue,running:I.running,pr_wait:I.pr_wait,done:I.done};return c`${Qc({automation:I.automation,counts:{running:I.running.length,queue:I.queue.length,pr_wait:I.pr_wait.length},running_sort:f,done_range:p,token_total:ed(I.done),token_tooltip:Jc(R())})}
      <div class="worker-lanes mon-lanes">
        ${fm.map(M=>{let G=x[M.lane],Y=M.lane==="queue"?I.queue_groups.length>0?c`${I.queue_groups.map(ne=>_m(ne,g))}`:void 0:G.length>0?c`${G.map(ne=>oo(ne,g))}`:void 0;return rr({id:`monitor-${M.lane}`,lane:M.pane,title:M.lane==="done"?`\uC644\uB8CC\xB7${R()}`:M.title,items:G,empty:M.empty,body:Y,live:M.lane==="running"&&G.length>0,header_control:M.lane==="runnable"?c`<span class="mon-candidate-filter">
                    <label
                      class="worker-filter__tgl"
                      title="blocked 이슈 표시 (기본 숨김)"
                    >
                      <input
                        type="checkbox"
                        class="mon-filter__blocked"
                        .checked=${b.show_blocked}
                      />
                      🔒 blocked
                    </label>
                    ${$.hidden_blocked>0?c`<span class="worker-filter__hidden"
                          >숨김 ${$.hidden_blocked}건</span
                        >`:""}
                  </span>`:M.lane==="pr_wait"&&G.length>0?c`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function Ne(){let g=s&&s.get?s.get():null,$=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=d();I=$a(g,$,{done_since:Nr(p,x),running_sort:f}),Qe(Ee(x),A)}function we(g,$){let x=a?a():void 0;if(!$||!x||$===x||!i){n(g);return}i($).then(()=>{n(g)}).catch(M=>{r("workspace switch for %s failed: %o",$,M)})}function je(g){return{root_dir:g.getAttribute("data-root-dir")||"",revision:Number(g.getAttribute("data-revision")||0)||0}}function Ke(g){if(typeof g=="string"&&g.length>0)return g;if(g&&typeof g=="object"){let $=g;if(typeof $.message=="string"&&$.message.length>0)return $.message;if(typeof $.error=="string"&&$.error.length>0)return $.error;if($.error&&typeof $.error=="object"&&typeof $.error.message=="string")return $.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function $e(g,$){let x=g.querySelector(".mon-link__trigger"),M=g.querySelector(".mon-link__popover"),G=g.querySelector(".mon-link__error");!x||!M||!G||(Ce(),M.hidden=!1,x.setAttribute("aria-expanded","true"),G.textContent=$,G.hidden=!1)}async function rt(g,$,x){let M=$.getAttribute("data-root-dir")||"",G=$.getAttribute("data-issue-id")||"";if(!(!G||!x||x===G))try{await B(g,{a:G,b:x},M),Ce()}catch(Y){$e($,Ke(Y))}}function H(g,$){let{root_dir:x,revision:M}=je(g),G=g.getAttribute("data-issue-id")||"",Y=$.dataset.attemptId||g.getAttribute("data-attempt-id")||"",ne=$.classList;if(ne.contains("mon-link__trigger")){ze($);return}if(ne.contains("mon-link__candidate")||ne.contains("mon-link__direct")){let ce=$.dataset.targetId||"";rt("dep-add",g,ce);return}if(ne.contains("mon-blocker__remove")){let ce=$.dataset.blockerId||"";rt("dep-remove",g,ce);return}if(ne.contains("mon-place__choice")){let ce=$.dataset.lane||"parallel",qe=Number($.dataset.placeIndex||0)||0;Ce(),W("worker-queue-place",{bead_id:G,...ce==="parallel"?{}:{lane:ce},index:qe},x,M);return}if(ne.contains("worker-card__place")){Be($);return}if(ne.contains("mon-op--up")||ne.contains("mon-op--down")){let ce=Number(g.getAttribute("data-queue-index")||0)||0,qe=ne.contains("mon-op--up")?ce-1:ce+1;if(qe<0)return;W("worker-queue-reorder",{bead_id:G,.../^s[1-5]$/.test(g.dataset.lane||"")?{lane:g.dataset.lane}:{},to_index:qe},x,M);return}if(ne.contains("mon-op--remove")){W("worker-queue-remove",{bead_id:G},x,M);return}if(ne.contains("mon-op--pause")){B("worker-attempt-pause",{attempt_id:Y},x);return}if(ne.contains("mon-op--discard")){if(!u(Fn(G,"unmerged")))return;k({bead_id:G,...Y?{attempt_id:Y}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},x,M);return}if(ne.contains("mon-op--resume")){sn().then(ce=>{if(ce!==null)return S("worker-attempt-resume",{attempt_id:Y,...ce!==""?{instructions:ce}:{}},x,M)});return}if(ne.contains("mon-op--dismiss")){W("worker-attempt-dismiss",{attempt_id:Y},x,M);return}if(ne.contains("worker-mini__merge")){let ce=L(x,G);ce?.mismatch&&ce.continuation===null?D(x,G,M,ce.mismatch):W("worker-merge-queue-add",{bead_id:G},x,M);return}if(ne.contains("worker-mini__merge-cancel")){W("worker-merge-queue-remove",{bead_id:G},x,M);return}if(ne.contains("worker-mini__discard")){let ce=$.dataset.discardMode==="merged"?"merged":"unmerged";if(!u(Fn(G,ce)))return;k({bead_id:G,...Y?{attempt_id:Y}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},x,M);return}if(ne.contains("worker-mini__revise-fix")){S("worker-revise-fix",{bead_id:G},x,M);return}ne.contains("worker-mini__revise-approve")&&W("worker-revise-approve",{bead_id:G},x,M)}function F(g){g.querySelector(".mon-link__list")?.replaceChildren();let x=g.querySelector(".mon-link__search");x&&(x.value="");let M=g.querySelector(".mon-link__direct");M&&(M.hidden=!0,M.dataset.targetId="",M.textContent="");let G=g.querySelector(".mon-link__empty");G&&(G.hidden=!0);let Y=g.querySelector(".mon-link__error");Y&&(Y.hidden=!0,Y.textContent="")}function se(g,$){let x=g.querySelector(".mon-link__list");if(!x)return;let M=document.createDocumentFragment(),G=Cc(I).filter(Y=>Y.id!==$);for(let Y of G){let ne=document.createElement("button");ne.type="button",ne.className="mon-link__candidate",ne.dataset.targetId=Y.id,ne.dataset.search=`${Y.id} ${Y.title} ${Y.location}`.toLocaleLowerCase();let ce=document.createElement("strong");ce.textContent=Y.id;let qe=document.createElement("span");qe.textContent=Y.title;let me=document.createElement("small");me.textContent=Y.location,ne.append(ce,qe,me),M.append(ne)}x.replaceChildren(M)}function Ce(){for(let g of Array.from(A.querySelectorAll(".mon-card-popover"))){let $=g;$.hidden=!0,$.classList.contains("mon-link__popover")&&F($)}for(let g of Array.from(A.querySelectorAll('[aria-expanded="true"]')))g.setAttribute("aria-expanded","false")}function Be(g){let x=g.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!x)return;let M=x.hidden;Ce(),M&&(x.hidden=!1,g.setAttribute("aria-expanded","true"))}function ze(g){let x=g.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!x)return;let M=x.hidden;if(Ce(),M){let G=g.closest(".mon-card");se(x,G?.getAttribute("data-issue-id")||""),x.hidden=!1,g.setAttribute("aria-expanded","true");let Y=x.querySelector(".mon-link__search");Y&&(Te(Y),Y.focus())}}function Te(g){let $=g.closest(".mon-link__popover"),x=g.closest(".mon-card");if(!$||!x)return;let M=g.value.trim(),G=M.toLocaleLowerCase(),Y=0,ne=!1;for(let Le of Array.from($.querySelectorAll(".mon-link__candidate"))){let Ae=Le,He=Ae.dataset.targetId||"",j=G.length===0||(Ae.dataset.search||"").includes(G);Ae.hidden=!j,j&&(Y+=1),He.toLocaleLowerCase()===G&&(ne=!0)}let ce=$.querySelector(".mon-link__direct"),qe=x.getAttribute("data-issue-id")||"";if(ce){let Le=M.length>0&&!ne&&G!==qe.toLocaleLowerCase();ce.hidden=!Le,ce.dataset.targetId=Le?M:"",ce.textContent=Le?`\uC9C1\uC811 \uC785\uB825 \xB7 ${M}`:"",Le&&(Y+=1)}let me=$.querySelector(".mon-link__empty");me&&(me.hidden=Y>0);let xe=$.querySelector(".mon-link__error");xe&&(xe.hidden=!0,xe.textContent="")}function lt(g){let $=g.target;$&&A.contains($)&&typeof $.closest=="function"&&$.closest(".mon-popover-owner")||Ce()}function Ye(g){if(g.key!=="Escape")return;let $=A.querySelector('[aria-expanded="true"]');Ce(),$?.focus()}function z(g){let $=re;re=!1;let x=g.target;if(!x||typeof x.closest!="function"||x.closest("dialog")||x.closest("a"))return;let M=x.closest(".mon-running-sort");if(M){g.preventDefault(),f=M.getAttribute("data-sort")==="repo"?"repo":"started",um(f),Ne();return}let G=x.closest(".mon-auto-all");if(G){g.preventDefault(),oe(G.getAttribute("data-on")==="true");return}if(x.closest(".mon-merge-all")){g.preventDefault(),de();return}let ne=x.closest(".mon-ctl--advance");if(ne){g.preventDefault();let{root_dir:Le,revision:Ae}=je(ne);W("worker-automation-toggle",{on:ne.getAttribute("data-on")==="true"},Le,Ae);return}let ce=x.closest(".mon-ctl--merge-auto");if(ce){g.preventDefault();let{root_dir:Le,revision:Ae}=je(ce);W("worker-merge-auto-toggle",{on:ce.getAttribute("data-on")==="true"},Le,Ae);return}let qe=x.closest(".mon-card");if(!qe)return;let me=x.closest("button");if(me){g.preventDefault(),H(qe,me);return}let xe=qe.getAttribute("data-issue-id");xe&&!$&&(g.preventDefault(),we(xe,qe.getAttribute("data-root-dir")||""))}function Q(g){let $=g.target;if(!$||typeof $.closest!="function")return;let x=$.closest(".mon-filter__blocked");if(x){b={show_blocked:x.checked},am(b),Ne();return}let M=$.closest(".mon-done-range");if(M){p=Ut(M.value)?M.value:Dt,cm(p),Ne();return}let G=$.closest(".mon-slots__input");if(!G)return;let{root_dir:Y,revision:ne}=je(G),ce=Number(G.value);if(!Number.isFinite(ce))return;let qe=Math.max(Wn,Math.floor(ce));W("worker-queue-set-slots",{slots:qe},Y,ne)}function Re(g){let $=g.target;$?.classList.contains("mon-link__search")&&Te($)}e.addEventListener("click",z),e.addEventListener("change",Q),e.addEventListener("input",Re),e.addEventListener("dragstart",Ve),e.addEventListener("dragover",he),e.addEventListener("dragleave",Me),e.addEventListener("drop",ve),e.addEventListener("dragend",_e),document.addEventListener("click",lt),document.addEventListener("keydown",Ye),s&&typeof s.subscribe=="function"&&(V=s.subscribe(()=>{try{P.clear(),Ne()}catch{}}));function Ue(){K!==null&&(clearInterval(K),K=null)}function ue(){Oe!==null&&(clearTimeout(Oe),Oe=null)}return{load(){r("load"),Ne(),K===null&&(K=setInterval(()=>{try{if(A.querySelector(".mon-card-popover:not([hidden])"))return;Ne()}catch{}},pm))},pause(){Ue()},clear(){Ue(),ue(),V&&(V(),V=null),e.removeEventListener("click",z),e.removeEventListener("change",Q),e.removeEventListener("input",Re),e.removeEventListener("dragstart",Ve),e.removeEventListener("dragover",he),e.removeEventListener("dragleave",Me),e.removeEventListener("drop",ve),e.removeEventListener("dragend",_e),document.removeEventListener("click",lt),document.removeEventListener("keydown",Ye),e.replaceChildren()}}}function ad(e,t,r){let n=_t("views:nav"),s=null;function o(d){return u=>{u.preventDefault(),n("click tab %s",d),r.gotoView(d)}}function a(){let d=t.getState(),u=d.view==="worker"||d.view==="monitor"?d.view:"board";return c`
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
        <a
          href="#/monitor"
          class="ctl-tab ${u==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function i(){Qe(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Qe(c``,e)}}}var id=["bug","feature","task","epic","chore"];function ld(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var cd=["Critical","High","Medium","Low","Backlog"];function dd(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),d=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function R(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let D of id){let k=document.createElement("option");k.value=D,k.textContent=ld(D),o.appendChild(k)}a.replaceChildren();for(let D=0;D<=4;D+=1){let k=document.createElement("option");k.value=String(D);let B=cd[D]||"Medium";k.textContent=`${D} \u2013 ${B}`,a.appendChild(k)}}R();function A(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function I(S){s.disabled=S,o.disabled=S,a.disabled=S,i.disabled=S,d.disabled=S,p.disabled=S,f.disabled=S,f.textContent=S?"Creating\u2026":"Create"}function P(){u.textContent=""}function V(S){u.textContent=S}function K(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let D=window.localStorage.getItem("beads-ui.new.priority");D&&/^\d$/.test(D)?a.value=D:a.value="2"}catch{o.value="",a.value="2"}}function W(){let S=o.value||"",D=a.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),D.length>0&&window.localStorage.setItem("beads-ui.new.priority",D)}async function L(){P();let S=String(s.value||"").trim();if(S.length===0){V("Title is required"),s.focus();return}let D=Number(a.value||"2");if(!(D>=0&&D<=4)){V("Priority must be 0..4"),a.focus();return}let k=String(o.value||""),B=String(d.value||""),oe={title:S};k.length>0&&(oe.type=k),String(D).length>0&&(oe.priority=D),B.length>0&&(oe.description=B),I(!0);try{await t("create-issue",oe)}catch{I(!1),V("Failed to create issue");return}W(),I(!1),A()}return r.addEventListener("cancel",S=>{S.preventDefault(),A()}),b.addEventListener("click",()=>A()),p.addEventListener("click",()=>A()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),L())}),n.addEventListener("submit",S=>{S.preventDefault(),L()}),{open(){n.reset(),P(),K();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var mm=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function gm(e,t){return Co(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function ud(e,t,r){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=gm(n,e);return c`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${n}
                data-state=${s}
                @click=${()=>r(n)}
              >
                ${n}
              </button>`})}
          </div>`}
    </section>
  `}function pd(e,t,r){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>c`<span class="settings-dialog__prefix">
              ${n}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${n} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>r.onRemove(n)}
              >
                ×
              </button>
            </span>`)}
      </div>
      <div class="settings-dialog__prefix-add">
        <input
          type="text"
          class="settings-dialog__prefix-input"
          aria-label="숨길 prefix"
          placeholder="예: reviewed:"
          .value=${t}
          @input=${n=>r.onDraft(String(n.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${r.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function fd(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${mm.map(([r,n])=>c`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${r}
                .checked=${e.chips[r]!==!1}
                @change=${()=>t(r)}
              />
              <span>${n}</span>
            </label>`)}
      </div>
    </section>
  `}var bm=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],qt="";function Ft(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function _d(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(g=>ie(g,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",d=!1,u="",p={},f={},b=[],R=!1,A=null,I={},P="",V="",K=!1,W=!1,L=!1,S=null;function D(){let g=t.queueStore?.get();return Ft(g)?g.runner_catalog:null}function k(){let g=t.queueStore?.get();return Ft(g)&&Ft(g.execution_defaults)?g.execution_defaults:null}function B(){let g=t.implPresetStore?.get();return Ft(g)&&Array.isArray(g.presets)?g:null}async function oe(){R=!0,Te();try{let g=await r("get-session-defaults",{});p=Ft(g?.values)?{...g.values}:{},f={...p},b=Array.isArray(g?.warnings)?g.warnings:[]}catch(g){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${g instanceof Error?g.message:String(g)}`)}finally{R=!1,Te()}}async function de(){let g=sc(p,f);if(Object.keys(g).length!==0){try{let $=await r("set-session-defaults",{values:g});p=Ft($?.values)?{...$.values}:{},f={...p},b=Array.isArray($?.warnings)?$.warnings:[]}catch($){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Te()}}function te(g,$){$===qt?delete f[g]:f[g]=$,Te(),de()}async function re(){let g=t.queueStore?.get();if(!Ft(g))return;let $={orchestration_model:g.orchestration_model??null,orchestration_effort:g.orchestration_effort??null,orchestration_speed:g.orchestration_speed??null},x=oc($,{...$,...I});if(Object.keys(x).length!==0){try{let M=await r("worker-queue-set-orchestration-defaults",{expected_revision:g.revision,values:x});if(M&&M.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}I={}}catch(M){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}Te()}}function Oe(g,$){I[g]=$===qt?null:$,Te(),re()}async function nt(g){let $=t.queueStore?.get();if(!(!Ft($)||g<1)){try{await r("worker-queue-set-slots",{expected_revision:$.revision,slots:g})}catch(x){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Te()}}function De(){let g={},$=je();for(let x of tc){let M=Cr.includes(x)?$[x]:f[x];typeof M=="string"&&M.length>0&&(g[x]=M)}return g}async function ot(){let g=B();if(!g)return;let $=De();if(Object.keys($).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let x=(g.presets||[]).find(G=>G.id===P),M=V.trim()||(x?x.name:"");if(!M){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=x?await r("impl-preset-update",{expected_revision:g.revision,id:x.id,name:M,settings:$}):await r("impl-preset-create",{expected_revision:g.revision,name:M,settings:$});if(G&&G.applied){if(V="",!x&&Array.isArray(G.presets)){let Y=G.presets.find(ne=>ne.name===M);P=Y?Y.id:P}Te()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Te()}catch(G){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function it(){let g=B();if(!(!g||P.length===0))try{let $=await r("impl-preset-delete",{expected_revision:g.revision,id:P});$&&$.applied?(P="",Te()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Te())}catch($){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}}async function Ve(){let g=B(),$=t.queueStore?.get();if(!(!g||!Ft($)||P.length===0)){try{let x=await r("apply-impl-preset-global",{preset_id:P,expected_revision:g.revision,expected_queue_revision:$.revision});x&&x.applied?(p=Ft(x.values)?{...x.values}:{},f={...p},b=Array.isArray(x.warnings)?x.warnings:[],Ft(x.queue)&&(t.queueStore?.set?.(x.queue),I={}),x.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):x&&x.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(x){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Te()}}async function he(){W=!0,L=!1,Te();try{let g=await r("get-worker-system-prompt",{});!g||typeof g!="object"||Array.isArray(g)?L=!0:S=g}catch{L=!0}finally{W=!1,Te()}}function Me(){if(K=!K,K&&!S){he();return}Te()}function _e(){let g=cn({loading:W,error:L});if(g)return g;if(!S)return"";let $=Array.isArray(S.variants)?S.variants:[];return c`<div class="settings-dialog__sp-body">
      ${S.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${S.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${$.map(x=>c`<div class="settings-dialog__sp-variant" data-variant=${x.key}>
            <div class="settings-dialog__sp-cond">${x.condition}</div>
            ${hr(x.label,x.system_prompt)}
          </div>`)}
    </div>`}function ve(){return c`<section
      class="settings-dialog__group"
      data-seam="system-prompt"
    >
      <div class="settings-dialog__group-title">
        워커 시스템 프롬프트
        <span class="settings-dialog__hint">읽기 전용 — 서버가 조립</span>
      </div>
      <button
        type="button"
        class="settings-dialog__btn"
        data-seam="system-prompt-toggle"
        aria-expanded=${K?"true":"false"}
        @click=${Me}
      >
        ${K?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${K?_e():""}
    </section>`}function Ee(g,$,x,M,G,Y){let ne=G[g]??qt,ce=oa(g,x,G,k(),D()),qe=ce.options.find(xe=>xe.value===ne),me=ne===qt?ce.full_value:qe?.full_value;return c`<select
        class=${ne===qt?"settings-dialog__unset":""}
        data-key=${g}
        aria-label=${$}
        title=${me||""}
        ?disabled=${Y===!0||ce.disabled}
        .value=${zr(String(ne))}
        @change=${xe=>M(g,String(xe.target.value))}
      >
        <option value=${qt} ?selected=${ne===qt}>
          ${ce.unset_label}
        </option>
        ${ce.options.map(xe=>c`<option
              value=${xe.value}
              title=${xe.full_value||""}
              ?selected=${xe.value===ne}
            >
              ${xe.label}
            </option>`)}
      </select>
      ${ne===qt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ne(g,$,x,M,G,Y=!1){return c`<div
      class=${`settings-dialog__row${Y?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${$}</span>
      <span class="settings-dialog__controls">
        ${Ee(g,$,x,M,G,Y)}
      </span>
    </div>`}function we(g,$,x,M,G){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${$}-on)`}
        ></i>
        ${g}
      </span>
      <span class="settings-dialog__controls">
        ${Ee(x,`${g} \uBAA8\uB378`,M,te,f,!1)}
        ${Ee(G,`${g} effort`,Hs,te,f,!1)}
      </span>
    </div>`}function je(){let g=t.queueStore?.get(),$={};for(let x of Cr)$[x]=Object.prototype.hasOwnProperty.call(I,x)?I[x]:Ft(g)&&typeof g[x]=="string"?g[x]:null;return $}function Ke(){let g=D(),$=nc(f),x=f.impl_runtime,M=f.impl_model,G=B(),Y=t.queueStore?.get(),ne=je(),ce=Vs(g,A),qe=dn(g,A||void 0,ne.orchestration_model||lr).filter(Ae=>Ae!==lr),me=Ft(Y)&&typeof Y.slots=="number"?Y.slots:2,xe=k()?.supported===!0,Le=oa("workflow_mode",Dn,f,k(),g);return c`
      <section
        class=${`settings-dialog__pane${i==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        ${b.length>0?c`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${b.join(", ")}
            </div>`:""}
        ${xe?"":c`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${R?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${zr(P)}
                  @change=${Ae=>{P=String(Ae.target.value),Te()}}
                >
                  <option value="" ?selected=${P===""}>
                    실행 프리셋…
                  </option>
                  ${(G?.presets||[]).map(Ae=>c`<option
                        value=${Ae.id}
                        ?selected=${Ae.id===P}
                      >
                        ${Ae.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${P.length===0}
                  @click=${Ve}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${P?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${zr(V)}
                  @input=${Ae=>{V=String(Ae.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${ot}
                >
                  ${P?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${P.length===0}
                  @click=${it}
                >
                  삭제
                </button>
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">오케스트레이션</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">런타임</span>
                  <span class="settings-dialog__controls">
                    <select
                      aria-label="런타임"
                      data-key="orchestration_runtime_filter"
                      .value=${zr(A||qt)}
                      @change=${Ae=>{let He=String(Ae.target.value);A=He===qt?null:He,Te()}}
                    >
                      <option
                        value=${qt}
                        ?selected=${!A}
                      >
                        전체
                      </option>
                      <option
                        value="claude"
                        ?selected=${A==="claude"}
                      >
                        claude
                      </option>
                      <option
                        value="codex"
                        ?selected=${A==="codex"}
                      >
                        codex
                      </option>
                    </select>
                    <span class="settings-dialog__hint"
                      >모델 목록을 좁힙니다</span
                    >
                  </span>
                </div>
                ${Ne("orchestration_model","\uBAA8\uB378",ce,Oe,ne)}
                ${Ne("orchestration_effort","effort",qe,Oe,ne)}
                ${Ne("orchestration_speed","\uC18D\uB3C4",Pn,Oe,ne)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${qt}
                        aria-pressed=${String(!f.workflow_mode)}
                        @click=${()=>te("workflow_mode",qt)}
                      >
                        ${Le.unset_label}
                      </button>
                      ${f.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Dn.map(Ae=>c`<button
                            type="button"
                            data-mode=${Ae}
                            aria-pressed=${String(f.workflow_mode===Ae)}
                            @click=${()=>te("workflow_mode",Ae)}
                          >
                            ${Ae}
                          </button>`)}
                    </span>
                  </span>
                </div>
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  리뷰 게이트
                  <span class="settings-dialog__hint">모델 · effort</span>
                </div>
                ${we("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Nn,"spec_review_effort")}
                ${we("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",zs,"plan_review_effort")}
                ${we("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Nn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Ne("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Us,te,f)}
                ${Ne("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ws,te,f,$)}
                ${Ne("impl_model","\uBAA8\uB378",Gs(g,x),te,f,$)}
                ${Ne("impl_effort","effort",dn(g,x,M),te,f,$)}
                ${Ne("impl_speed","\uC18D\uB3C4",Pn,te,f,$)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">동시 실행</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">slots</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__stepper">
                      <button
                        type="button"
                        aria-label="slots 감소"
                        @click=${()=>nt(me-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${me}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>nt(me+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${ve()}
            `}
      </section>
    `}function $e(){let g=n.get();return c`
      <section
        class=${`settings-dialog__pane${i==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${g?c`
              ${ud(g,s(),se)}
              ${pd(g,u,{onDraft:$=>{u=$},onAdd:Ce,onRemove:Be})}
              ${fd(g,ze)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function rt(g){let $=n.get();if($)try{let x=await r("display-policy-set",{expected_revision:$.revision,policy:g($)});H(x),x&&x.conflict&&x.policy&&(x=await r("display-policy-set",{expected_revision:x.policy.revision,policy:g(x.policy)}),H(x)),x&&x.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function H(g){g&&g.policy&&typeof g.policy=="object"&&n.set(g.policy)}function F(g){rt(g)}function se(g){let $=n.get();if(!$)return;let x=!hm(g,$);F(M=>ym(g,M,x))}function Ce(){let g=u.trim();g.length!==0&&(u="",F($=>$.hidden_prefixes.includes(g)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,g]}),Te())}function Be(g){F($=>({hidden_prefixes:$.hidden_prefixes.filter(x=>x!==g)}))}function ze(g){let $=n.get();if(!$)return;let x=$.chips[g]===!1;F(()=>({chips:{[g]:x}}))}function Te(){Qe(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${bm.map(g=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${g.id}
                  aria-selected=${String(i===g.id)}
                  aria-controls=${`settings-pane-${g.id}`}
                  @click=${()=>lt(g.id)}
                >
                  <span class="settings-dialog__glyph">${g.glyph}</span>
                  ${g.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ue}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${Ke()} ${$e()}
          </div>
        </div>
      `,a)}function lt(g){i=g,Te()}let Ye=()=>{d=!1,t.onOpenChange?.(!1)};a.addEventListener("close",Ye),a.addEventListener("cancel",Ye);let z=g=>{g.target===a&&ue()};a.addEventListener("click",z);let Q=null;n.subscribe&&(Q=n.subscribe(()=>{d&&Te()}));let Re=null;t.implPresetStore?.subscribe&&(Re=t.implPresetStore.subscribe(()=>{d&&Te()}));function Ue(g="execution"){d||(d=!0,t.onOpenChange?.(!0),i=g,u="",I={},Te(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),oe())}function ue(){d&&(d=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Ue,close:ue,sessionDraft:()=>({...f}),destroy(){d=!1,a.removeEventListener("close",Ye),a.removeEventListener("cancel",Ye),a.removeEventListener("click",z),Q&&(Q(),Q=null),Re&&(Re(),Re=null),a.remove()}}}function hm(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function ym(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var vm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function md(e){return String(e).padStart(2,"0")}function wm(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function km(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${md(n.getHours())}:${md(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${vm[n.getMonth()]} ${n.getDate()} ${o}`;return`${wm(r,t)} \xB7 ${i}`}function $m(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var gd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function bd(e){let t=!1,r=null,n=new Map;function s(){Qe(c``,e),e.hidden=!0}function o(){let d=gd.filter(p=>n.has(p.key));if(d.length===0){s();return}let u=Date.now();Qe(c`<div class="usage-meter" aria-label="Usage">
        ${d.map(p=>{let f=n.get(p.key),b=typeof f.ageSeconds=="number"&&f.ageSeconds>600,R=b?`${Math.floor(f.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${f.windows.map(A=>{let I=typeof A.pct=="number"&&Number.isFinite(A.pct)?A.pct:0,P=Math.min(100,Math.max(0,I)),K=`resets ${km(A.resetsAt,u)}${b?` \xB7 ${R}`:""}`;return c`<span
                class="usage-meter__window ${$m(P)}"
                style=${`--progress: ${P}%`}
                title=${K}
              >
                <span class="usage-meter__label">${A.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${P}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(d){try{let u=await fetch(d.endpoint);if(!u.ok)return null;let p=await u.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function i(){let d=await Promise.all(gd.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of d)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function hd(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var xm="worker-ineligible";function Ea(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ta(e){return Ea(e).includes(xm)}var Am="worker-serial";function Ca(e){return Ea(e).includes(Am)}function Ra(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Sm=new Set(["done","failed","orphaned","stopped","discarded"]),Em={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Tm={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Cm={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ia(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Cm[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function yd(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let d=new Map,u=new Map,p=!1,f=null,b=null,R=null,A=new Set,I=!1,P=0,V=null,K=new Set;function W(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function L(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function S(){return o&&o()||""}async function D(){if(!s)return;let w=++P;I=!0,R=null,A.clear(),me();try{let C=await s("worker-parallel-analysis-targets",{root_dir:S()});if(w!==P||!xe)return;let N=Array.isArray(C?.qualified)?C.qualified:[],X=Array.isArray(C?.excluded)?C.excluded:[];R={qualified:N,excluded:X};for(let ye of N)ye&&typeof ye.id=="string"&&A.add(ye.id)}catch{w===P&&xe&&(R={qualified:[],excluded:[]},ie("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{w===P&&(I=!1,xe&&me())}}function k(w){return Array.isArray(w.runs)?w.runs:[]}function B(){let w=W(),C=new Set;for(let N of Object.values(w.attempts||{})){let X=N;X&&typeof X.bead_id=="string"&&!Sm.has(X.status)&&C.add(X.bead_id)}for(let N of Array.isArray(w.pr_wait)?w.pr_wait:[])N&&typeof N.bead_id=="string"&&C.add(N.bead_id);for(let N of Object.values(w.discard_operations||{})){let X=N;X&&X.phase!=="done"&&typeof X.bead_id=="string"&&C.add(X.bead_id)}return C}function oe(w){return w.filter(C=>de(C)===null)}function de(w){let C=W();for(let N of Array.isArray(C.serial_lanes)?C.serial_lanes:[])if(Array.isArray(N?.entries)&&N.entries.some(X=>X.bead_id===w))return N.id;return(Array.isArray(C.queue)?C.queue:[]).some(N=>N.bead_id===w)?"parallel":null}function te(w,C){let N=d.get(w);return N||[...C.order]}function re(w){if(w.length<2)return!1;let C=de(w[0]);if(!C||C==="parallel")return!1;let N=W(),X=(Array.isArray(N.serial_lanes)?N.serial_lanes:[]).find(Z=>Z.id===C)?.entries.map(Z=>Z.bead_id);if(!Array.isArray(X))return!1;let ye=w.map(Z=>X.indexOf(Z));return ye.every(Z=>Z>=0)&&ye.every((Z,ke)=>ke===0||Z>ye[ke-1])}function Oe(){let w=W(),C=Array.isArray(w.serial_lanes)?w.serial_lanes:[],N=C.find(X=>Array.isArray(X.entries)&&X.entries.length===0);return N?N.id:C[0]?.id||"s1"}function nt(w){let C=W().bead_titles||{};return typeof C[w]=="string"?C[w]:w}async function De(w,C){if(!s||p)return null;p=!0,me();try{return await s(w,C)}finally{p=!1,me()}}async function ot(w){n?.setPending?.(!0);try{let C=await De("worker-parallel-analysis-start",{force:w,target_ids:Array.from(A)});C&&C.applied===!1&&C.reason&&(C.reason==="target_not_qualified"&&Array.isArray(C.detail)?ie(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${C.detail.join(", ")}`,"error",3200):ie(`\uBD84\uC11D \uC2E4\uD328: ${C.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function it(){let w=L().job;!s||!w||await s("worker-parallel-analysis-cancel",{job_id:w.job_id})}async function Ve(w){if(!(!s||K.has(w))){K.add(w),me();try{let C=await s("worker-parallel-analysis-prompt",{root_dir:S(),run_id:w});if(!xe)return;if(C?.ok===!0&&typeof C.prompt=="string"){V={run_id:w,prompt:C.prompt};return}ie(C?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{K.delete(w),me()}}}function he(){V=null,me()}async function Me(){if(!V)return;let w=await Xt(V.prompt);ie(w?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",w?"success":"error",1400)}function _e(w,C){a&&a(w,Ia(C))}function ve(){return W().runner_catalog}function Ee(w){return Object.keys(ve()?.runners?.[w]?.models||{})}function Ne(w){let C=Ee(w),N=ve()?.runners?.[w]?.default_model;return typeof N=="string"&&C.includes(N)?N:C[0]||""}function we(){let w=L().settings,C=f||w.runner||"claude",N=Ee(C),X=f?Ne(C):w.model||N[0]||"",ye=Ra(ve(),C,X),Z=w.effort||"",ke=ye.includes(Z)?Z:ye[0]||"";return{runner:C,model:X,effort:ke,models:N,efforts:ye}}async function je(w){let C=L().settings,N=await De("worker-parallel-analysis-settings-update",{expected_revision:C.revision,runner:w.runner,model:w.model,effort:w.effort});(!N||N.applied!==!0)&&(f=null,me(),N&&N.reason&&ie(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${N.reason}`,"error",2800))}function Ke(w){f=w,me();let C=we();je({runner:w,model:C.model,effort:C.effort})}function $e(w){let C=we(),N=Ra(ve(),C.runner,w);je({runner:C.runner,model:w,effort:N.includes(C.effort)?C.effort:N[0]||""})}function rt(w){let C=we();je({runner:C.runner,model:C.model,effort:w})}async function H(w,C){if(!s||p)return;let N=te(w,C),X=L();if(N.length<2||!X.last_good){ie("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ye=u.get(w)||Oe(),Z=()=>({snapshot_digest:X.last_good.identity_digest,group_index:w,lane:ye,ordered_bead_ids:N,expected_revision:W().revision});p=!0,me();try{let ke=await s("worker-parallel-analysis-submit",Z());ke&&ke.queue&&r&&r.set(ke.queue),ke&&ke.applied!==!0&&ke.conflict===!0&&(ke=await s("worker-parallel-analysis-submit",Z()),ke&&ke.queue&&r&&r.set(ke.queue)),ke&&ke.applied===!0?(d.delete(w),ie(`\uC9C1\uB82C \uB808\uC778 ${ye}\uC5D0 ${N.length}\uAC1C \uBC30\uCE58`,"success")):ie(`\uC81C\uCD9C \uAC70\uBD80: ${ke?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,me()}}function F(w,C,N){d.set(w,te(w,C).filter(X=>X!==N)),me()}function se(w){d.delete(w),me()}function Ce(w,C,N,X){let ye=[...te(w,C)],Z=ye.indexOf(N),ke=Z+X;Z<0||ke<0||ke>=ye.length||(ye.splice(ke,0,...ye.splice(Z,1)),d.set(w,ye),me())}function Be(){let w=L().settings,C=Object.keys(ve()?.runners||{}),N=we();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${X=>Ke(X.target.value)}
        >
          ${C.map(X=>c`<option
                value=${X}
                ?selected=${N.runner===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${X=>$e(X.target.value)}
        >
          ${N.models.map(X=>c`<option
                value=${X}
                ?selected=${N.model===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${X=>rt(X.target.value)}
        >
          ${N.efforts.map(X=>c`<option
                value=${X}
                ?selected=${N.effort===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      ${ze(w)}
    </div>`}function ze(w){return!lt(w)||Te(w)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:w.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${w.runner}/${w.model} · effort
        ${w.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:w.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function Te(w){return w.is_default===!0&&w.compatible===!1}function lt(w){return!!(w.runner&&w.model&&w.effort)}function Ye(w){return lt(w)&&w.compatible!==!1}function z(w){let C=Math.max(0,Math.floor(w/1e3)),N=Math.floor(C/60),X=C%60;return`${N}:${String(X).padStart(2,"0")}`}function Q(w){let C=w.job;if(C){let N=typeof C.started_at=="number"?C.started_at:0,X=`${C.runner||"?"}/${C.model||"?"}`,ye=N?` \xB7 \uACBD\uACFC ${z(Date.now()-N)}`:"",Z=typeof C.session_id=="string"?C.session_id:"",ke=k(w).find(Se=>Se.run_id===C.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${X} · effort ${C.effort||"?"}${ye}</span
        >
        ${Z?c`<code class="pa-session-id" title=${Z}
              >${Z.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>_e(C.job_id,ke||C)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ke?.prompt_saved!==!0||K.has(C.job_id)}
          @click=${()=>{Ve(C.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Re()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Re(){return n?.isPending?.()===!0}function Ue(w){let C=!!w.job,N=Ye(w.settings),X=R!==null&&A.size===0,ye=C||p||Re()||I;return c`<div class="pa-meta">
      ${w.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(w.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${Q(w)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!N||ye||X}
        @click=${()=>{ot(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!N||ye||X}
        @click=${()=>{ot(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!C}
        @click=${()=>{it()}}
      >
        취소
      </button>
    </div>`}function ue(w){return typeof w=="string"&&w.length>0?w:"\uBBF8\uBC30\uCE58"}function g(w,C){C?A.add(w):A.delete(w),me()}function $(w){let C=Array.isArray(w.scope)?w.scope:[],N=Array.isArray(w.overlaps)?w.overlaps:[];return C.length===0&&N.length===0?c``:c`<span class="pa-target__signals">
      ${C.length>0?c`<details class="pa-target__scope" title=${C.join(`
`)}>
            <summary>scope ${C.length}</summary>
            <ul>
              ${C.map(X=>c`<li><code>${X}</code></li>`)}
            </ul>
          </details>`:""}
      ${N.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${N.join(", ")}`}
            >겹침 ${N.join(", ")}</span
          >`:""}
    </span>`}function x(){let w=R?.qualified||[],C=R?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${I?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${w.length} \xB7 \uC81C\uC678 ${C.length}`}</span
        >
      </header>
      ${R&&w.length>0?c`<ul class="pa-targets__list">
            ${w.map(N=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${N.id}
                      .checked=${A.has(N.id)}
                      @change=${X=>g(N.id,X.target.checked)}
                    />
                    <span class="pa-target__title">${N.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${$(N)}
                    <span class="pa-target__route">${N.route}</span>
                    <span class="pa-target__lane"
                      >${ue(N.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:R&&w.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${R&&C.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${C.length}</summary>
            <ul class="pa-targets__list">
              ${C.map(N=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${N.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Em[N.reason]||N.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ue(N.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function M(w){let C=typeof w.session_id=="string"&&w.session_id.length>0,N=C?w.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${w.outcome}"
        >${Tm[w.outcome]||w.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(w.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${w.runner||"?"} / ${w.model||"?"} / ${w.effort||"?"}</span
      >
      ${C?c`<code class="pa-session-id" title=${N}
            >${N.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${w.outcome==="failure"&&w.reason?c`<span class="pa-run-row__reason">${w.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>_e(w.run_id,w)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${w.prompt_saved!==!0||K.has(w.run_id)}
          @click=${()=>{Ve(w.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function G(w){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${w.length>0?c`<ul class="pa-runs__list">
            ${w.map(C=>M(C))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Y(){return V?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${he}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Me()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${he}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function ne(w,C){let N=te(w,C),X=B(),ye=N.filter(et=>X.has(et)),Z=oe(N),ke=re(N),Se=Array.isArray(W().serial_lanes)?W().serial_lanes:[],ft=u.get(w)||Oe(),Et=C.eligible!==!0||N.length<2||ye.length>0||Z.length>0||ke||p;return c`<section class="pa-group" data-group-index=${String(w)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${C.confidence}</span>
        ${C.categories.map(et=>c`<span class="pa-group__category">${et}</span>`)}
        ${ke?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${C.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${Z.length>0?c`<span class="pa-group__stale"
              >stale — ${Z.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${C.reason}</p>
      <ol class="pa-group__members">
        ${N.map((et,yt)=>c`<li class="pa-member" data-bead-id=${et}>
              <span class="pa-member__seq">${yt+1}</span>
              <span class="pa-member__title">${nt(et)}</span>
              ${X.has(et)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${et}
                ?disabled=${yt===0}
                aria-label=${`${et} \uC704\uB85C`}
                @click=${()=>Ce(w,C,et,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${et}
                ?disabled=${yt===N.length-1}
                aria-label=${`${et} \uC544\uB798\uB85C`}
                @click=${()=>Ce(w,C,et,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${et}
                aria-label=${`${et} \uC81C\uC678`}
                @click=${()=>F(w,C,et)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${C.evidence.map(et=>c`<li class="pa-evidence">
              <code>${et.path}</code>
              <span class="pa-evidence__locator">${et.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>se(w)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${et=>{u.set(w,et.target.value),me()}}
          >
            ${Se.map((et,yt)=>c`<option
                  value=${et.id}
                  ?selected=${ft===et.id}
                >
                  직렬 ${yt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Et}
          @click=${()=>{H(w,C)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ce(w){let C=Array.isArray(w.issues)?w.issues:[],N=C.filter(ye=>ye.verdict==="parallel_ok").length,X=C.filter(ye=>ye.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${N}</span>
      <span>uncertain ${X}</span>
    </div>`}function qe(){let w=xe&&!!L().job;if(w&&b===null){b=setInterval(()=>me(),1e3);return}!w&&b!==null&&(clearInterval(b),b=null)}function me(){let w=L();f&&w.settings.runner===f&&(f=null);let C=w.last_good?.result;qe(),Qe(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${fe}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${Be()} ${Ue(w)} ${x()}
            ${C?c`${C.groups.map((N,X)=>ne(X,N))}
                ${C.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ce(C)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${G(k(w))}
          </div>
        </div>
        ${Y()}
      `,i)}let xe=!1,Le=()=>{xe=!1,V=null,P+=1,qe()},Ae=w=>{w.target===w.currentTarget&&fe()};i.addEventListener("close",Le),i.addEventListener("cancel",Le),i.addEventListener("click",Ae);let He=null;r&&r.subscribe&&(He=r.subscribe(()=>{xe&&me()}));let j=null;n&&n.subscribe&&(j=n.subscribe(()=>{xe&&me()}));function J(){xe||(xe=!0,me(),D(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function fe(){xe&&(xe=!1,V=null,P+=1,qe(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:J,close:fe,destroy(){xe=!1,b!==null&&(clearInterval(b),b=null),i.removeEventListener("close",Le),i.removeEventListener("cancel",Le),i.removeEventListener("click",Ae),He&&(He(),He=null),j&&(j(),j=null),i.remove()}}}var vd=new Set(["sh","bash","zsh","dash","ksh"]),wd=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function kd(e){let t=e.split("/");return t[t.length-1]||""}function Rm(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=kd(r[0]);if(n!=="env")return vd.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&vd.has(kd(s))}function Im(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Lm(e){let t=[],r=0;wd.lastIndex=0;for(let n of e.matchAll(wd)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Im(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Om(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function $d(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",d=0,u=null,p=!1;function f(S,D){return D?Lm(S).map(k=>k.kind==="plain"?k.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${k.kind}"
            >${k.text}</span
          >`):S}function b(){if(!s)return c``;let S=o==="ready"&&Rm(a),D=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>W()}
      ></div>
      <section class="repo-ops-script-viewer__panel">
        <header class="repo-ops-script-viewer__header">
          <div class="repo-ops-script-viewer__identity">
            <span
              class="repo-ops-script-viewer__path"
              title=${s.path}
              >${s.path}</span
            >
            <span class="repo-ops-script-viewer__ref"
              >${s.base_ref}@${s.base_sha.slice(0,7)}</span
            >
          </div>
          <div class="repo-ops-script-viewer__actions">
            <button
              type="button"
              class="repo-ops-script-viewer__copy"
              ?disabled=${o!=="ready"}
              @click=${()=>{A()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>W()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${D.map((k,B)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${B+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(k,S)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function R(){Qe(b(),n)}async function A(){if(o!=="ready")return;let S=await Xt(a);ie(S?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",S?"success":"error")}function I(S){S.key==="Escape"&&s&&(S.preventDefault(),W())}function P(){p||(document.addEventListener("keydown",I),p=!0)}function V(){p&&(document.removeEventListener("keydown",I),p=!1)}async function K(S,D=null){let k=++d;P(),s={...S},u=D||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",R(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let oe=t?t():"";if(!oe){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",R();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",R();return}let de="/api/repo-ops-script?workspace="+encodeURIComponent(oe)+"&lane="+encodeURIComponent(S.lane)+"&base_sha="+encodeURIComponent(S.base_sha);try{let te=await r(de),re=await te.json().catch(()=>({}));if(k!==d)return;if((t?t():"")!==oe){W();return}if(!te.ok||!re||re.ok!==!0){o="error",i=Om(re&&typeof re.error=="string"?re.error:""),R();return}s={lane:re.lane,base_sha:re.base_sha,path:re.path,base_ref:re.base_ref},a=String(re.content),o="ready",R()}catch{if(k!==d)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",R()}}function W(){d+=1,V(),s=null,a="",R();let S=u;u=null,S?.isConnected&&S.focus()}function L(){W(),n.remove()}return{open:K,close:W,destroy:L}}function xd(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let L=o();return typeof L.revision=="number"?L.revision:0}function i(L){t&&L&&L.queue&&typeof L.queue=="object"&&t.set(L.queue)}function d(){let L=o().workspace_info;return L&&typeof L=="object"?L:{}}function u(L,S){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${L}"
      >${S}</span
    >`}function p(L){if(typeof L!="number"||!Number.isFinite(L))return"";let S=L/6e4;return Number.isInteger(S)?`timeout ${S}\uBD84`:`timeout ${Math.round(L/1e3)}\uCD08`}function f(L){let S=p(L);return S?u("config",S):""}function b(L,S,D){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${D.script}
      @click=${k=>{s&&s({lane:L,base_sha:S.base_sha,path:D.script,base_ref:S.base_ref},k.currentTarget)}}
    ></button>`}function R(L){let S=typeof L.base_sha=="string"?L.base_sha:"",D=`${L.source_path||"repo-ops/config.toml"} @ ${L.base_ref||"?"}${S?`@${S.slice(0,7)}`:""}`;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${D}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${L.verify?c`${b("verify",L,L.verify)}
              ${f(L.verify.timeout_ms)}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${L.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${L.deploy?c`${b("deploy",L,L.deploy)}
              ${f(L.deploy.timeout_ms)}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${L.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function A(L){let S=L.repo_ops&&typeof L.repo_ops=="object"?L.repo_ops:null;return S&&(S.status==="resolved"||S.status==="absent")?R(S):S&&(S.status==="pending"||S.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
        <p class="worker-repo-ops__vd-title">
          저장소 작업 선언
          <span class="worker-repo-ops__vd-ro"
            >읽기 전용 — config에서 정의</span
          >
        </p>
        <div
          class="worker-repo-ops__vd-line worker-repo-ops__vd-absent"
          data-seam="repo-ops-status"
        >
          ${S.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${S.error_code?c` — <code>${S.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function I(L){if(!r)return;let S=await r("worker-auto-repair-toggle",{on:L,expected_revision:a()});if(i(S),S&&S.conflict){let D=await r("worker-auto-repair-toggle",{on:L,expected_revision:a()});i(D)}n()}let P={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function V(L,S,D){return c`<div class="worker-repo-ops__policy-group" data-policy=${D}>
      <div class="worker-repo-ops__policy-label">${L}</div>
      <ul class="worker-repo-ops__policy-list">
        ${S.map(k=>c`<li data-token=${k}>
              ${P[k]||k}
            </li>`)}
      </ul>
    </div>`}function K(L){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${L.map(S=>{let D=[P[S.trigger]||S.trigger];return Number.isInteger(S.attempts_per_operation_attempt)?D.push(`operation\uB2F9 ${S.attempts_per_operation_attempt}\uD68C`):Number.isInteger(S.attempts)?D.push(`${P[S.budget]||S.budget} ${S.attempts}\uD68C`):Number.isInteger(S.sessions_per_user_action)&&D.push(`${S.sessions_per_user_action}\uD68C`,P[S.user_actions]||S.user_actions),S.applies_when&&D.push(P[S.applies_when]||S.applies_when),c`<li data-token=${S.id}>
            <strong>${P[S.id]||S.id}</strong>
            <span>${D.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function W(){let L=o(),S=L.auto_repair!==!1,D=L.repo_operation_policy&&typeof L.repo_operation_policy=="object"?L.repo_operation_policy:null,k=Array.isArray(L.repo_operations)?L.repo_operations:[],B=k.find(re=>re.state==="repairing"),oe=k.filter(re=>re.state==="failed"||re.state==="repairing"),de=oe.length?Math.min(...oe.map(re=>typeof re.repair?.remaining=="number"?re.repair.remaining:0)):D?.auto_repair?.resolution_ladder?.find(re=>re.id==="auto_repair_session")?.attempts??1,te=Array.isArray(D?.auto_repair?.resolution_ladder)?D.auto_repair.resolution_ladder:[];return c`<section
      class="worker-repo-ops__repair"
      data-seam="auto-repair"
    >
      <p class="worker-repo-ops__vd-title">
        자동 해결
        <span class="worker-repo-ops__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="worker-repo-ops__repair-toggle">
        <input
          type="checkbox"
          class="worker-repo-ops__repair-input"
          .checked=${S}
          @change=${re=>{I(re.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${de}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${B?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${B.repair?.owner_bead||B.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${D?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(D.worker_automatic||[]).length} · 해결 사다리
                ${te.length} · 금지
                ${(D.never_automatic||[]).length}</span
              >
            </summary>
            ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",D.worker_automatic||[],"worker-automatic")}
            ${D.supported===!1||D.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${D.schema_version})`}
                </div>`:K(te)}
            ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",D.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${A(d())} ${W()}
      </details>`}}}var Mm=20,Ad={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Sd={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Pm(e,t,r=Mm){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Ed(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Dm(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Td(e){let t=e.filter(r=>r.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>c`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Cd(e,t="",r=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Nm(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Sd,n)?Sd[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function qm(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?kt(e.at):""}
      >${Qs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Ed(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Ad,t.kind)?Ad[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Zs(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Xs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Ed(e)}"
          >${Dm(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Cd(Nc(t.failure_kind,n)):""}
      ${Nm(t)}
      ${Td([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Zs(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Fm(e){let t=e.cleanup,r=Hr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?kt(e.at):""}
      >${Qs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--warn"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${t.bead_id} 머지 후 정리</span>
        <span class="worker-ev__st worker-ev__st--warn">멈춤</span>
      </div>
      <ol class="worker-stepper" aria-label="정리 단계">
        ${Lc(t.step).map(n=>c`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Cd(no(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?c`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${Td([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function jm(e){return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
    <div class="worker-repo-drawer__hd">
      <h3>저장소 작업 타임라인</h3>
      <span class="worker-repo-drawer__hint">${e.repo}</span>
      <span class="worker-repo-drawer__spacer"></span>
      <button
        type="button"
        class="worker-repo-drawer__close"
        aria-label="닫기"
        data-seam="repo-ops-close"
      >
        ✕
      </button>
    </div>
    ${e.events.length===0?c`<div class="worker-repo-drawer__empty">기록 없음</div>`:c`<ul class="worker-rail">
          ${e.events.map(t=>t.type==="cleanup"?Fm(t):qm(t))}
        </ul>`}
  </section>`}function Rd(e,t={}){let r=null;function n(){Qe(r?jm(r):c``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Pm(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var Bm="tab:worker:ready",Um="tab:worker:blocked",Wm="tab:worker:in-progress",zm="tab:worker:closed",ao=1,Id=5;function Ld(e){return Fs(e).path.length>0}var Pd="beads-ui.worker.candidate-filter",La={show_blocked:!1,spec:"all"};function Hm(){try{let e=window.localStorage.getItem(Pd);if(!e)return{...La};let t=JSON.parse(e);if(!t||typeof t!="object")return{...La};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...La}}}function Gm(e){try{window.localStorage.setItem(Pd,JSON.stringify(e))}catch{}}function Vm(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let d=r(i),u=n(i);d&&u?s.push(i):!d&&u?o+=1:d&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Km=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Dd="bdui.worker.candidate_sort",Ym=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],io="spec";function Zm(){try{let e=window.localStorage.getItem(Dd);return e==="board"||e==="created"||e==="spec"?e:io}catch{return io}}function Xm(e){try{window.localStorage.setItem(Dd,e)}catch{}}var Nd="bdui.worker.done-range";function Qm(){try{let e=window.localStorage.getItem(Nd);return Ut(e)?e:Dt}catch{return Dt}}function Jm(e){try{window.localStorage.setItem(Nd,e)}catch{}}var eg="(max-width: 640px)",qd="beads-ui.worker.lane-collapsed",Gn={queue:!0,done:!0};function tg(){try{let e=window.localStorage.getItem(qd);if(!e)return{...Gn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Gn}:{queue:typeof t.queue=="boolean"?t.queue:Gn.queue,done:typeof t.done=="boolean"?t.done:Gn.done}}catch{return{...Gn}}}function rg(e){try{window.localStorage.setItem(qd,JSON.stringify(e))}catch{}}function Od(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function ng(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Fr):(n.sort(us(r)),t==="board"?n:[...n.filter(Ld),...n.filter(s=>!Ld(s))])}function sg(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function og(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ag(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Md(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function ig(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function lg(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function cg(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function dg(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Oa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function ug(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function pg(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Md(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Md(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function fg(e,t,r,n,s=null,o=null,a=null,i=!1,d=null,u=!0,p=null,f=null,b=null,R={},A=!1,I=!1,P={}){let V=!!d&&d.position>0,K=!!d?.continuation_action&&d.continuation_action.continuation===null,W=!!d&&d.active===!0,L=d&&d.failure||null,S=lg(d?d.waiting:null,b),D=r[e]||null,k=D&&D.gate?D.gate:null,B=D&&D.pr?D.pr:null,oe=ug(b),de=cg(d?d.resolution:null),te=dg(d?d.head_review:null),re=d&&d.head_review||null,Oe=d&&d.authority||null,nt=!!re&&["pending","reviewing","revising"].includes(re.state),De=V&&!W&&(re?.state==="failed"||!Oe||Oe.source==="automatic"&&!I),ot=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":de?de.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":S,it=!!k&&k.base_badge==="\uCDA9\uB3CC",Ve=!!k&&k.enabled===!0,he=Un({bead_id:e,merge_sha:P.merge_sha,cleanup_cursor:P.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:P.repo_operations}),Me=ro(he),_e=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!k&&k.tier==="merged",ve=i&&!!n&&!!k&&k.tier==="merged",Ee=De&&(Ve||it||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||_e||ve),Ne=i&&it&&u===!1,we=cr(R,e,{external:i,merge_active:W||he?.step==="merge",merge_queued:V,conflict_active:!!a,cleanup_active:Me,merged:!!n||k?.tier==="merged"}),je=!!we.operation,Ke=!_e&&!!n&&n.step==="repo_operations",$e=pg({continuation_required:K,merge_step:he,conflict_badge:ot,conflict_live:de?.live===!0||a==="running",head_review:re&&te?{...te,state:re.state,failure_reason:re.failure_reason}:null,recovery:oe,cleanup_failed:n,cleanup_label:n?Hr(n.step):null,base_exception:f,conflicting:it,gate:k,queue_failure:L,auto_skip:p,queued:V,queue_active:W,queue_position:d?d.position:0,activity:ot?null:o&&o.activity||null}),rt=$e?.live===!0&&$e.title?c`<span title=${$e.title}>${$e.label}</span>`:$e?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:n&&he?.active!==!0?to(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,external:i,pr_number:B&&typeof B.number=="number"?B.number:null,pr_url:B&&typeof B.url=="string"?B.url:"",completion_badge:$e?.live!==!0&&$e?.title?$e.label:null,completion_title:$e?.title||"",completion_repair_pr_url:oe?oe.repair_pr_url:"",completion_repair_pr_number:oe?oe.repair_pr_number:null,badges:rt?[rt]:[],live_badge:$e?.live===!0?rt:null,usage:s,alert:$e?.alert===!0,merge_action:k?.tier==="merged"&&!_e&&!ve||Ke?!1:!V||K||De,timeline_action:Ke,cancel_action:V&&!K,cancel_enabled:(!W||nt)&&!(oe&&oe.lock_actions),cancel_title:oe&&oe.lock_actions?`${oe.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:W&&!nt?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":nt?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:we,discard_action:we.action,merge_step:he,discard_enabled:we.enabled,discard_title:we.title,merge_enabled:!he&&!a&&!je&&!f&&!(oe&&oe.lock_actions)&&!Ne&&!Ke&&(Ve||it||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||_e||ve||Ee),merge_label:K?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":_e||ve?"\uC815\uB9AC \uC7AC\uAC1C":it&&!he&&!_e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":k?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":De?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:je?we.error?`\uD3D0\uAE30 \uC2E4\uD328: ${we.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${we.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:K?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":he?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${he.label}`:ve?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ne?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":it?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ve?`\uBA38\uC9C0 (${k.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:k&&k.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${k&&k.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ma(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:d,getWorkspacePath:u,doneRange:p,onDoneRangeChange:f}=t,b=n?fs(n,i):null,R=ms({transport:r,uiOrderStore:i}),A=null,I=[],P=Hm(),V=null,K=Zm(),W=Ut(p)?p:Qm(),L=new Map;function S(){let l=or.find(_=>_.value===W);return l?l.label:"\uC624\uB298"}let D=tg(),k=!1,B=new Set,oe=new Set,de=new Set,te=new Set,re=[],Oe=document.createElement("div");Oe.className="worker-console";let nt=document.createElement("div");nt.className="worker-top";let De=document.createElement("div");De.className="worker-drawer-overlay",De.hidden=!0;let ot=document.createElement("div");ot.className="worker-drawer-overlay__backdrop";let it=document.createElement("div");it.className="worker-drawer-host";let Ve=document.createElement("div");Ve.className="worker-drawer-host",Ve.hidden=!0,De.append(ot,it,Ve);let he=document.createElement("div");he.className="worker-lanes-host",Oe.append(nt,De,he),e.appendChild(Oe);let Me=null,_e=null,ve=qs(it,{transport:r,sessionLogStore:a,onClose:()=>{Me=null,_e=null,De.hidden=!0,Z()}}),Ee=Rd(Ve,{onClose:()=>{Ve.hidden=!0,De.hidden=!0,Z()}}),Ne=$d({getWorkspacePath:u||(()=>"")}),we=u&&u()||"",je=xd({queueStore:s,transport:r,onChanged:()=>Z(),onOpenScript:(l,_)=>{Ne.open(l,_)}}),Ke=o?yd(Oe,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:u,onOpenTranscript:(l,_)=>kr(l,_)}):null;function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ao,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function rt(){let l=$e(),_=typeof l.serial_lane_count=="number"&&Number.isInteger(l.serial_lane_count)&&l.serial_lane_count>0?Math.min(l.serial_lane_count,5):0,E=Array.isArray(l.serial_lanes)?l.serial_lanes:[],U=[];for(let be of E){if(U.length>=_)break;!be||typeof be.id!="string"||!/^s[1-5]$/.test(be.id)||!Array.isArray(be.entries)||U.push({id:be.id,label:`\uC9C1\uB82C ${be.id.slice(1)}`,count:be.entries.length})}return U.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(l.queue)?l.queue:[]).length},...U]}function H(l){if(!V||!l.some(E=>E.id===V))return null;let _=rt();return _?{bead_id:V,lanes:_}:null}function F(){let l=$e();return typeof l.revision=="number"?l.revision:0}function se(l){l&&l.queue&&s&&s.set(l.queue)}function Ce(){let l=$e().queue;return Array.isArray(l)?l.length:0}async function Be(l,_,E){if(!r)return;let U=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},...E===void 0?{}:{index:E},expected_revision:F()}),ae=await r("worker-queue-place",U());se(ae),ae&&ae.conflict&&await r("worker-queue-place",U()).then(se)}async function ze(l,_,E){if(!r)return;let U=()=>({bead_id:l,..._==="parallel"?{}:{lane:_},to_index:E,expected_revision:F()}),ae=await r("worker-queue-reorder",U());se(ae),ae&&ae.conflict&&await r("worker-queue-reorder",U()).then(se)}async function Te(l){if(!r)return;let _=await r("worker-queue-remove",{bead_id:l,expected_revision:F()});se(_),_&&_.conflict&&await r("worker-queue-remove",{bead_id:l,expected_revision:F()}).then(se)}async function lt(l){if(!r||!l)return;let _=await r("worker-attempt-pause",{attempt_id:l});_&&_.paused===!1&&_.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Ye(l){if(!r||!l)return;let _=await sn();if(_===null)return;let E=async(ae={})=>await r("worker-attempt-resume",{attempt_id:l,expected_revision:F(),..._!==""?{instructions:_}:{},...ae}),U=await E();se(U),U&&U.conflict&&(U=await E(),se(U)),U=await fr(U,(ae,be)=>E({continuation:ae,decision_token:be}),{onResult:se,refresh:()=>E()}),U&&U.resumed===!1&&!U.conflict&&U.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${U.reason}`,"error",2400)}async function z(l){if(!r||!l)return;let _=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:F()});se(_),_&&_.conflict&&(_=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:F()}),se(_)),_&&_.dismissed===!1&&!_.conflict&&_.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Q(l,_,E=!0){if(!r)return null;let U=r,ae=await U(l,{..._,expected_revision:F()});return se(ae),ae&&ae.conflict&&E&&(ae=await U(l,{..._,expected_revision:F()}),se(ae)),ae}async function Re(l){if(!r||!l)return;let _=$e().merge_queue?.find(U=>U.bead_id===l)?.continuation_action;if(_?.mismatch&&_.continuation===null){await ue(l,_.mismatch);return}B.add(l),Z();let E;try{E=await Q("worker-merge-queue-add",{bead_id:l})}finally{B.delete(l),Z()}!E||E.conflict||E.applied||ie(ig(E.reason),"error",2400)}async function Ue(l){if(!(!r||!l||oe.has(l))){oe.add(l),Z();try{let _=await r("worker-cleanup-retry",{bead_id:l,expected_revision:F()});se(_),_&&!_.retried&&!_.conflict&&_.reason&&ie(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${_.reason}`,"error",2400)}finally{oe.delete(l),Z()}}}async function ue(l,_){let E=await fr({continuation_mismatch:_},(ae,be)=>Q("worker-merge-queue-add",{bead_id:l,continuation:ae,decision_token:be},!1)),U=E?.queue?.merge_queue?.find(ae=>ae.bead_id===l)?.continuation_action;if(E?.applied!==!0&&U?.continuation===null&&U.mismatch){await ue(l,U.mismatch);return}E&&E.applied===!1&&!E.conflict&&ie("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function g(l){if(!r)return;let _=await Q("worker-merge-auto-toggle",{on:l});!_||_.conflict||ie(l?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",l?"success":"info",2400)}async function $(l){if(!r||!l)return;let _=await Q("worker-merge-queue-remove",{bead_id:l});_&&!_.conflict&&!_.applied&&_.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function x(){await Q("worker-merge-queue-remove",{all:!0})}async function M(l,_=null,E="unmerged",U=null){if(!r||!l)return;let ae=Fn(l,E);if(!(!!U||typeof globalThis.confirm!="function"||globalThis.confirm(ae)))return;let pe=await r("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...U?{operation_id:U}:{},expected_revision:F()});if(se(pe),pe&&pe.conflict&&(pe=await r("worker-discard",{bead_id:l,..._?{attempt_id:_}:{},...U?{operation_id:U}:{},expected_revision:F()}),se(pe)),pe&&pe.discarded===!0){ie(Js(pe),"success",5e3);return}if(pe&&pe.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${pe.reason}`,"error",2800);return}if(pe&&pe.accepted&&pe.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(pe&&pe.accepted&&!pe.discarded){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${pe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}pe&&!pe.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function G(l,_,E){if(!(!r||!_||!E||te.has(_))){te.add(_),Z();try{let U=await r(l,{bead_id:_,action_id:E,expected_revision:F()});se(U),U?.conflict?ie("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!U?.ok&&U?.reason&&ie(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(U.reason)}`,"error",2800)}finally{te.delete(_),Z()}}}async function Y(l,_){if(!r||!_||de.has(_))return;de.add(_),Z();let E;try{let U=async(ae={})=>await r(l,{bead_id:_,expected_revision:F(),...ae});E=await U(),se(E),E&&E.conflict&&(E=await r(l,{bead_id:_,expected_revision:F()}),se(E)),l==="worker-revise-fix"&&(E=await fr(E,(ae,be)=>U({continuation:ae,decision_token:be}),{onResult:se,refresh:()=>U()}))}finally{de.delete(_),Z()}if(!(!E||E.conflict)){if(E.ok){ie(l==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${E.reason||""}`,"error",3e3)}}async function ne(l){if(!r)return;let _=await r("worker-automation-toggle",{on:l,expected_revision:F()});se(_),_&&_.conflict&&await r("worker-automation-toggle",{on:l,expected_revision:F()}).then(se)}async function ce(l){if(!r||!l)return;let _=await r("worker-repo-operation-repair",{operation_id:l});if(se(_),_&&_.ok===!1){ie(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${_.reason||""}`,"error",3e3);return}_&&_.ok===!0&&ie("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function qe(l){if(!r||!l)return;let _=await r("worker-repo-operation-dismiss",{operation_id:l});se(_),_&&_.ok===!1&&ie(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${_.reason||""}`,"error",3e3)}async function me(l){if(!r||!Number.isFinite(l))return;let _=Math.max(ao,Math.floor(l)),E=await r("worker-queue-set-slots",{slots:_,expected_revision:F()});se(E),E&&E.conflict&&await r("worker-queue-set-slots",{slots:_,expected_revision:F()}).then(se)}async function xe(l){if(!r||!Number.isInteger(l)||l<1||l>Id)return;let _=$e(),E=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).slice(l).reduce((be,pe)=>be+(Array.isArray(pe?.entries)?pe.entries.length:0),0),U=()=>({count:l,expected_revision:F()}),ae=await r("worker-queue-set-serial-lane-count",U());se(ae),ae&&ae.conflict&&(ae=await r("worker-queue-set-serial-lane-count",U()),se(ae)),ae&&ae.applied&&E>0&&ie(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${E}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Le(){let l=$e(),_=b?b.selectBoardColumn(Bm,"ready"):[],E=b?b.selectBoardColumn(Um,"blocked"):[],U=b?b.selectBoardColumn(zm,"closed"):[],ae=b?b.selectBoardColumn(Wm,"in_progress"):[],be=new Map;for(let h of ae){let q=og(h);if(!q)continue;let le=be.get(q);le?le.push(h):be.set(q,[h])}let pe=h=>{let q=_s(be.get(h)||[]);return q?q.title||q.id:null},Ze=l.bead_titles||{},y=new Map;for(let[h,q]of Object.entries(Ze))typeof q=="string"&&q.length>0&&y.set(h,q);for(let h of[..._,...E])y.set(h.id,h.title||h.id);let v=l.bead_times&&typeof l.bead_times=="object"&&!Array.isArray(l.bead_times)?l.bead_times:{},m=l.bead_labels&&typeof l.bead_labels=="object"&&!Array.isArray(l.bead_labels)?l.bead_labels:{},O=new Map;for(let[h,q]of Object.entries(m))Array.isArray(q)&&O.set(h,Ca(q));for(let h of[..._,...E]){let q=h.labels;Array.isArray(q)&&!O.has(h.id)&&O.set(h.id,Ca(q))}let T=new Map,ee=o?.get()?.last_good?.result?.groups;for(let h of Array.isArray(ee)?ee:[]){if(h?.eligible!==!0||!Array.isArray(h.members))continue;let q=h.members.map(We=>{let pt=(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).find(Kt=>Kt.entries.some(Ct=>Ct.bead_id===We));return pt?pt.id:null});if(!(q.every(We=>We!==null)&&new Set(q).size===1))for(let We of h.members)T.set(We,h.members.filter(pt=>pt!==We))}let Fe=l.bead_blocked_by&&typeof l.bead_blocked_by=="object"&&!Array.isArray(l.bead_blocked_by)?l.bead_blocked_by:{},Ge=new Map;for(let[h,q]of Object.entries(v))q&&typeof q=="object"&&Ge.set(h,q);for(let h of[..._,...E])Ge.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let Xe=h=>Ge.get(h)||{},Pe=l.pr_wait||[],mt=l.pr_observations||{},sr=l.pr_activity||{},Vr=l.cleanup_failed||{},Vn=Object.entries(Vr).map(([h,q])=>({bead_id:h,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",at:q&&typeof q.at=="number"?q.at:null,detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0,failure_code:q&&typeof q.failure_code=="string"?q.failure_code:void 0,subject_id:q&&typeof q.subject_id=="string"?q.subject_id:void 0,repair_eligible:!!(q&&q.repair_eligible),repair:q&&q.repair?q.repair:void 0})),pn=l.queue||[],fn=new Set([...pn.map(h=>h.bead_id),...(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).flatMap(h=>(Array.isArray(h?.entries)?h.entries:[]).map(q=>q.bead_id)),...Pe.map(h=>h.bead_id),...l.done.map(h=>h.bead_id)]),Kn=new Set(E.map(h=>h.id)),Ie=i?i.get()?.order||{}:{},ut=new Set,Kr=[];for(let h of[..._,...E])fn.has(h.id)||ut.has(h.id)||sg(h)||Object.hasOwn(h,"labels")&&Ta(h.labels)||(ut.add(h.id),Kr.push(h));I=ng(Kr,K,Ie);let Xd=l.admission||{},qa=h=>{let q=Xd[h];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof q.reason=="string"?q.reason:"",We=le.indexOf(":");return We>0&&We<le.length-1?`\u26D4 ${le.slice(0,We)} (${le.slice(We+1)})`:`\u26D4 ${le}`},Qd=I.map(h=>{let q=Fs(h),le=q.path.length>0,We=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",pt=!Object.hasOwn(h,"description")||typeof h.description=="string"&&h.description.trim().length>0,Ct=!(Object.hasOwn(h,"labels")&&Ta(h.labels))&&(We?pt:le&&!q.conflict),dt=Kn.has(h.id),Yt=[];dt&&Yt.push(ag(h)),We&&!pt?Yt.push("missing_description"):!We&&q.conflict?Yt.push("spec_id_conflict"):!We&&!le&&Yt.push("spec \uC5C6\uC74C");let rs=qa(h.id);return rs&&Yt.push(rs),{id:h.id,title:h.title||h.id,reason:Yt.join(" \xB7 "),draggable:Ct,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:We,status:h.status,blocked:dt,has_spec:le}}),lo=Vm(Qd,P),Jd=lo.visible,eu=l.revise_parked||{},Yn=l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},co=(h,q)=>h.map((le,We)=>{let pt=q!=="done",Kt=q!=="done"&&q!=="queue",Ct=pt?eu[le.bead_id]:null,dt=pt?cr(Yn,le.bead_id):null,Yt=dt?.operation?dt:null,rs=pt&&O.get(le.bead_id)===!0,li=Fe[le.bead_id]||[],mo=l.admission&&typeof l.admission=="object"?l.admission[le.bead_id]:null,go=pt?Ac(mo,!!Yt||te.has(le.bead_id)):null,fu=pt&&!go?qa(le.bead_id):null,_u=pt?[fu]:[],ci=pt&&li.length>0&&typeof mo?.reason=="string"&&mo.reason.startsWith("not_ready")?[`\u23F8 ${li.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],bo=pt?T.get(le.bead_id):void 0;return bo&&bo.length>0&&ci.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${bo.join(", ")}\uC640`),{id:le.bead_id,title:y.get(le.bead_id)||le.bead_id,reason:_u.filter(Boolean).join(" \xB7 "),draggable:pt&&!Yt&&!go,done:q==="done",lane:q,seq:Kt?We+1:void 0,worker_serial:rs,discard:Yt,stale_work:go,badges:[...ci,...Ct?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Ct,revise_action:!!Ct,revise_enabled:!!Ct&&!Yt&&!de.has(le.bead_id),revise_title:Ct?Ct.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ct.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?Wt(l.attempts||{},le.bead_id):null,work_ms:q==="done"?$c(l.attempts||{},le.bead_id):null,done_at:q==="done"&&typeof le.added_at=="number"?le.added_at:void 0,...Xe(le.bead_id)}}),Yr=l.attempts?Object.values(l.attempts):[],uo=new Set;for(let h of Yr)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&uo.add(h.resumed_from);let Fa=new Map;for(let h of Yr)Fa.set(h.bead_id,h.attempt_id);let Zn=new Map;for(let h of Yr)Zn.set(h.attempt_id,h);function po(h){let q=new Set,le=h;for(;le&&!q.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;q.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&Zn.get(le.resumed_from)||null}return!1}let Xn=typeof l.declared_base=="string"?l.declared_base:null;function tu(h){let q=null;for(let le of Yr)!le||le.bead_id!==h||po(le)||(q===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=le);return q&&typeof q.target_base=="string"?q.target_base:null}let ja=[],Ba=[],ru=hd(l),Ua=h=>{let q=typeof h.session_id=="string"&&h.session_id.length>0,le=uo.has(h.attempt_id);return{eligible:q&&!le,reason:q?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Vt=null;for(let h of Yr){let q=h.status==="paused"&&!uo.has(h.attempt_id);if(h.status==="running"||q)Ba.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:y.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:q,conflict_resolution:po(h),base_exception:Oa(Xn,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:cr(Yn,h.bead_id,{attempt_id:h.attempt_id}),usage:Wt(l.attempts||{},h.bead_id),current_child:pe(h.bead_id),...Xe(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&ru(h)){let le=Ua(h);ja.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:y.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:cr(Yn,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:po(h),base_exception:Oa(Xn,h.target_base),usage:Wt(l.attempts||{},h.bead_id),current_child:pe(h.bead_id),...Xe(h.bead_id)}),Vt=h}}let Qn=[...ja,...Ba].map(h=>{let q=Zn.get(h.attempt_id),le=q?.quickfix_landing;if(q?.quickfix_lane!==!0||!le||typeof le!="object")return h;let We=typeof le.reason=="string"&&le.reason.length>0?le.reason:null,pt=Un({bead_id:q.bead_id,merge_sha:le.head_sha,cleanup_cursor:le.cursor,cleanup_failed:We?{step:le.cursor,reason:We}:null,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]});return pt?{...h,landing:pt}:h}),Wa=null;if(Vt){let h=Ua(Vt),q=Vt.cause_detail;Wa={bead_id:Vt.bead_id,repo:Vt.repo||"",reason:Vt.cause||Vt.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:Vt.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:cr(Yn,Vt.bead_id,{attempt_id:Vt.attempt_id})}}let za=new Set(Qn.map(h=>h.bead_id)),fo=Array.isArray(l.merge_queue)?l.merge_queue:[],Ha=new Map,Ga=new Map,Va=new Map,Ka=new Map,Ya=new Map;fo.forEach((h,q)=>{h&&typeof h.bead_id=="string"&&(Ha.set(h.bead_id,q+1),Ga.set(h.bead_id,h.resolution),Va.set(h.bead_id,h.continuation_action||null),Ka.set(h.bead_id,h.head_review||null),Ya.set(h.bead_id,h.authority||null))});let Zr=l.merge_queue_state||{active:null,failures:{}},nu=Zr.failures||{},Za=Zr.waiting&&typeof Zr.waiting.bead_id=="string"&&typeof Zr.waiting.reason=="string"?Zr.waiting:null,su=l.auto_merge_skips||{},Xa=h=>{let q=su[h];if(!q)return null;let le=mt[h],We=le&&le.pr?le.pr.head_sha:null;return We&&We===q.head_sha?q.reason||"":null},Jn=new Map;for(let h of Qn)h.failed!==!0&&h.conflict_resolution&&(h.paused?Jn.has(h.bead_id)||Jn.set(h.bead_id,"paused"):Jn.set(h.bead_id,"running"));let Qa=Qn.filter(h=>!h.paused&&h.failed!==!0).length,Ja=(l.workspace_info||{}).slots,ei=typeof Ja=="number"?Ja:typeof l.slots=="number"?l.slots:ao,ou=Qa>ei,es=Nr(W),au=(Array.isArray(l.done)?l.done.slice():[]).filter(h=>es===void 0||typeof h.added_at!="number"||h.added_at>=es).sort((h,q)=>(q.added_at||0)-(h.added_at||0)),_n=co(au,"done"),iu=new Set((Array.isArray(l.done)?l.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),ti=[],lu=u?.()||"";for(let h of U){let q=jr(h.closed_at);if(typeof h.id!="string"||iu.has(h.id)||q===null||es!==void 0&&q<es||typeof h.comment_count!="number"||h.comment_count<=0)continue;let le=`${lu}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,We=L.get(le);We===void 0&&r&&(L.set(le,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(pt=>{let Kt=Array.isArray(pt)&&pt.some(Ct=>js(typeof Ct?.text=="string"?Ct.text:"")?.lane==="session");L.set(le,Kt?"session":"not-session"),Z()}).catch(()=>{L.set(le,"failed"),Z()})),We==="session"&&ti.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:q,created_at:h.created_at,updated_at:h.updated_at})}_n.push(...ti),_n.sort((h,q)=>(q.done_at||0)-(h.done_at||0));let ts={};for(let h of _r)ts[h]=0;let ri=!1,ni=0,_o=0,si=0;for(let h of _n){let q=h.usage;if(q&&typeof q=="object"){let le=!1;for(let We of _r)Number.isFinite(q[We])&&(ts[We]+=q[We],ri=!0,le=!0);le&&(_o+=1,Number.isFinite(q.total_cost_usd)&&(ni+=q.total_cost_usd,si+=1))}}_o>0&&si===_o&&(ts.total_cost_usd=ni);let oi=_n.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),cu=oi.length>0?xt(xs(oi)):ri?Qt(ts):null,du=l.lane_states&&typeof l.lane_states=="object"&&!Array.isArray(l.lane_states)?l.lane_states:{},uu=Array.isArray(l.serial_lanes)?l.serial_lanes:[],ai=h=>{if(Pe.some(We=>We.bead_id===h))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let q=Yr.filter(We=>We&&We.bead_id===h),le=q.length>0?q[q.length-1].status:null;return le==="failed"||le==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":le==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ii=uu.filter(h=>h&&typeof h.id=="string"&&Array.isArray(h.entries)).map((h,q)=>{let le=du[h.id]||{},We=new Map((Array.isArray(le.corrections)?le.corrections:[]).filter(dt=>dt&&typeof dt.bead_id=="string"&&typeof dt.after=="string").map(dt=>[dt.bead_id,dt.after])),pt=co(h.entries.filter(dt=>!za.has(dt.bead_id)),h.id).map(dt=>We.has(dt.id)?{...dt,badges:[`\u{1F517} ${We.get(dt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...dt.badges]}:dt),Kt=Array.isArray(le.occupied_by)?le.occupied_by.filter(dt=>typeof dt=="string"):[],Ct=Kt.map(dt=>({id:dt,title:y.get(dt)||dt,draggable:!1,lane:h.id,ghost:!0,badges:[ai(dt)]}));return{id:h.id,index:q+1,rows:[...Ct,...pt],occupied:Kt.length>0,badge:Kt.length>0?ai(Kt[0]):"\uB300\uAE30",cycle:le.cycle===!0}}),pu=typeof l.serial_lane_count=="number"?l.serial_lane_count:ii.length;return{queue:l,idToTitle:y,candidates:Jd,candidate_hidden:{blocked:lo.hidden_blocked,spec:lo.hidden_spec},running:Qn,live_count:Qa,slots:ei,over_cap:ou,failure:Wa,waiting:co(pn.filter(h=>!za.has(h.bead_id)),"queue"),serial_lanes:ii,serial_lane_count:pu,pr_wait:Pe.map(h=>fg(h.bead_id,y.get(h.bead_id)||h.bead_id,mt,Vr[h.bead_id]||null,Wt(l.attempts||{},h.bead_id),sr[h.bead_id]||(B.has(h.bead_id)||oe.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Jn.get(h.bead_id)||null,h.external===!0,{position:Ha.get(h.bead_id)||0,active:Zr.active===h.bead_id,failure:nu[h.bead_id]||null,waiting:Za?.bead_id===h.bead_id?Za.reason:null,resolution:Ga.get(h.bead_id),continuation_action:Va.get(h.bead_id),head_review:Ka.get(h.bead_id)||null,authority:Ya.get(h.bead_id)||null},h.wt_present!==!1,l.auto_merge===!0?Xa(h.bead_id):null,Oa(Xn,tu(h.bead_id)),l.completion_status&&typeof l.completion_status=="object"&&!Array.isArray(l.completion_status)&&l.completion_status[h.bead_id]||null,l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},Zn.get(Fa.get(h.bead_id)||"")?.worker_serial===!0,l.auto_merge===!0,{merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]})).map(h=>({...h,...Xe(h.id)})),merge_queue_length:fo.length,merge_queue_running:fo.length>0,auto_excluded:Pe.map(h=>h.bead_id).filter(h=>Xa(h)!==null),declared_base:Xn,done:_n,token_total:cu,cleanup_failures:Vn,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]}}function Ae(){let _=!!o?.get()?.job,E=!_&&o?.isPending?.()===!0,U=_?"\uBD84\uC11D \uC911":E?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${U?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${U?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${U?c`<span class="worker-analysis-btn__badge">${U}</span>`:""}
    </button>`}function He(l){let _=l.waiting.length>0?l.waiting[0].id:"\u2014",E=c`<button
      type="button"
      class="worker-play${l.queue.auto_advance?" is-active":""}"
    >
      ${l.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,U=N(l),ae=l.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",be=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${l.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${l.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${S()} 완료 <b>${l.done.length}</b></span
      >`,pe=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${l.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${l.declared_base||"?"}</span
    >`,Ze=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ao}
          step="1"
          .value=${String(l.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Id},(m,O)=>O+1).map(m=>c`<option
                value=${String(m)}
                ?selected=${l.serial_lane_count===m}
              >
                ${m}
              </option>`)}
        </select>
      </label>
      ${o?Ae():""} `,y=Fc({failure:l.failure}),v=xc(l.repo_operations,l.cleanup_failures);return k?c`<div class="worker-ribbon">
          ${E} ${U}
          <div class="worker-kpi worker-kpi--ribbon">${ae}${be}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ze}</div>
          <div class="worker-kpi">${pe}</div>
        </div>
        ${v}${je.template()}${y}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${E}${U}${Ze}</div>
        <div class="worker-kpi">
          ${ae}${be}${pe}
          ${(Array.isArray(l.token_total)?l.token_total:l.token_total?[{label:l.token_total,tooltip:`${S()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(m=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${m.tooltip}
                >${S()} 완료 · 누적 ${m.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_}</b></span
          >
        </div>
      </div>
      ${v}${je.template()}${y}`}function j(l){if(l.running.length===0&&l.pr_wait.length===0)return"";let _=l.running.some(E=>!E.paused&&E.failed!==!0);return c`<section
      class="worker-now${_?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${l.running.length+l.pr_wait.length}</span
        >
      </header>
      ${l.running.length>0?va(l.running,Date.now(),Me):""}
      ${l.pr_wait.map(E=>pa(E))}
    </section>`}function J(l){let _=l.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${P.show_blocked}
        />
        🔒 blocked${_.blocked>0?` ${_.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Km.map(E=>c`<button
              type="button"
              class="worker-filter__chip${P.spec===E.value?" is-active":""}"
              data-spec=${E.value}
              aria-pressed=${P.spec===E.value?"true":"false"}
            >
              ${E.label}
            </button>`)}
        ${_.spec>0?c`<span class="worker-filter__hidden">숨김 ${_.spec}</span>`:""}
      </div>
    </div>`}function fe(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${K}
    >
      ${Ym.map(l=>c`<option value=${l.value} ?selected=${K===l.value}>
            ${l.label}
          </option>`)}
    </select>`}function w(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${W}
      >
        ${or.map(l=>c`<option value=${l.value} ?selected=${W===l.value}>
              ${l.label}
            </option>`)}
      </select>
    </div>`}function C(l){let _=c`<span
      class="worker-lane__badge${l.occupied?" worker-lane__badge--held":""}"
      >${l.badge}</span
    >`,E=l.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return rr({id:`worker-pane-lane-${l.id}`,lane:l.id,title:`\uC9C1\uB82C ${l.index}`,items:l.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:_,controls:E})}function N(l){let _=l.queue.auto_merge===!0;if(l.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${_?" is-active":""}"
        title=${_?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${_?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${l.merge_queue_length}
      </button>`;if(_)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let E=new Set(l.auto_excluded),U=l.pr_wait.filter(ae=>ae.merge_action&&ae.merge_enabled&&!E.has(ae.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${U>0?` ${U}`:""}
    </button>`}function X(l){let _=rr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:l.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:fe(),controls:J(l),place_menu:H(l.candidates)});return k?c`<div class="worker-lanes worker-lanes--mobile">
        ${j(l)}
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:D.queue,preview:Od(l.waiting)})}
        ${l.serial_lanes.map(E=>C(E))}
        ${_}
        ${rr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:l.done,empty:`${S()} \uC644\uB8CC \uC5C6\uC74C`,controls:w(),collapsible:!0,collapsed:D.done,preview:Array.isArray(l.token_total)?l.token_total.map(E=>E.label).join(" \xB7 "):l.token_total||Od(l.done)})}
      </div>`:c`<div class="worker-lanes">
      ${_}
      <div class="worker-wait">
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${l.serial_lanes.map(E=>C(E))}
      </div>
      ${rr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${l.slots}`,items:l.running,live:l.running.some(E=>!E.paused&&E.failed!==!0),body:va(l.running,Date.now(),Me)})}
      ${rr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:l.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${rr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${S()} ${l.done.length}`,items:l.done,empty:`${S()} \uC644\uB8CC \uC5C6\uC74C`,controls:w()})}
    </div>`}function ye(l){D={...D,[l]:!D[l]},rg(D),Z()}function Z(){let l=Le();Qe(He(l),nt),Qe(X(l),he)}function ke(){let l=document.querySelector(".app-header");if(!l)return;let _=()=>{let E=Math.round(l.getBoundingClientRect().height);Oe.style.setProperty("--worker-ribbon-top",`${E}px`)};if(_(),typeof ResizeObserver=="function"){let E=new ResizeObserver(_);E.observe(l),re.push(()=>E.disconnect())}else window.addEventListener("resize",_),re.push(()=>window.removeEventListener("resize",_))}function Se(){if(typeof window.matchMedia!="function")return;let l=window.matchMedia(eg);k=!!l.matches;let _=E=>{let U=!!(E&&typeof E.matches=="boolean"?E.matches:l.matches);U!==k&&(k=U,Z())};typeof l.addEventListener=="function"?(l.addEventListener("change",_),re.push(()=>l.removeEventListener("change",_))):typeof l.addListener=="function"&&(l.addListener(_),re.push(()=>l.removeListener(_)))}let ft=null;function Et(l){ft=l.target instanceof Element?l.target:null}function et(l){let E=l.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!E)return;if(ft&&E.contains(ft)&&ft.closest("input, button, a")){l.preventDefault();return}let U=E.dataset.beadId||"",ae=E.dataset.lane||"";A={bead_id:U,from_lane:ae};try{l.dataTransfer?.setData("text/plain",U),l.dataTransfer&&(l.dataTransfer.effectAllowed="move")}catch{}}function yt(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;let E=_.dataset.lane||"";E!=="candidate"&&E!=="queue"&&!/^s[1-5]$/.test(E)||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move"),_.classList.add("worker-pane--drag-over"))}function dr(l){l.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function vt(l,_){let E=I.find(pe=>pe.id===l);if(!E)return;let U=I.filter(pe=>pe.id!==l),ae=U.length;if(_){let pe=_.dataset.beadId;if(pe===l)return;let Ze=U.findIndex(y=>y.id===pe);Ze>=0&&(ae=Ze)}let be=U.slice();be.splice(ae,0,E),R.applyReorder(l,be,ae)}function Tt(l){let _=l.target?.closest?.(".worker-pane");if(!_)return;l.preventDefault(),_.classList.remove("worker-pane--drag-over");let E=_.dataset.lane||"",U=A?.bead_id||l.dataTransfer?.getData("text/plain")||"",ae=A?.from_lane||"";if(A=null,!U)return;let be=l.target?.closest?.(".worker-mini, .worker-card"),pe=Array.from(_.querySelectorAll(".worker-mini, .worker-card")),Ze=pe.length;if(be){let y=pe.indexOf(be);y>=0&&(Ze=y)}if(Ze=Math.max(0,Ze-_.querySelectorAll(".worker-mini--ghost").length),_.classList.contains("worker-pane--collapsed")&&(Ze=Ce()),E==="candidate"){if(ae==="candidate"){vt(U,be);return}(ae==="queue"||/^s[1-5]$/.test(ae))&&Te(U);return}if(E==="queue"||/^s[1-5]$/.test(E)){let y=E==="queue"?"parallel":E;ae===E?ze(U,y,Ze):Be(U,y,Ze)}}function ur(l){P=l,Gm(l),Z()}function wr(l){K=l==="board"||l==="created"||l==="spec"?l:io,Xm(K),Z()}function jt(l){W=Ut(l)?l:Dt,Jm(W),f?.(W),Z()}function Ht(l){let _=l.target?.closest?.(".worker-serial-lane-count");if(_){let Ze=Number.parseInt(_.value,10);Number.isFinite(Ze)&&xe(Ze).then(Z);return}let E=l.target?.closest?.(".worker-filter__blocked");if(E){ur({...P,show_blocked:E.checked});return}let U=l.target?.closest?.(".worker-done-range");if(U){jt(U.value);return}let ae=l.target?.closest?.(".worker-sort");if(ae){wr(ae.value||io);return}let be=l.target?.closest?.(".worker-slots__input");if(!be)return;let pe=Number.parseInt(be.value,10);if(!Number.isFinite(pe)){Z();return}me(pe).then(Z)}function wt(l){return l?{runner:l.runner||void 0,model:l.model||void 0,effort:l.effort||void 0,worktree:l.worktree||void 0,status:l.status||void 0,session_id:l.session_id||void 0}:{}}function nr(){let l=Le();return{operations:l.repo_operations,cleanup_failures:l.cleanup_failures,repo:u&&u()||""}}function tt(){Me&&ve.close(),Ve.hidden=!1,De.hidden=!1,Ee.open(nr()),Z()}function Mt(l){let _=$e(),E=_.attempts?_.attempts[l]:null;Me=l,_e=null,Ee.close(),Ve.hidden=!0,De.hidden=!1,ve.open({attempt_id:l,meta:wt(E)}),Z()}function kr(l,_){Me=null,_e=l,Ee.close(),Ve.hidden=!0,De.hidden=!1,ve.open({attempt_id:l,meta:_,hide_prompt:!0}),Z()}function Gt(){if(Ee.isOpen()&&Ee.refresh(nr()),_e){let E=(o?.get()?.runs||[]).find(U=>U.run_id===_e);E?ve.updateMeta(Ia(E)):ve.close();return}if(!Me)return;let l=$e(),_=l.attempts?l.attempts[Me]:null;if(_){ve.updateMeta(wt(_));return}ve.close()}function ge(l){let _=l.target;if(_?.closest?.(".worker-mini__serial, .worker-mini__grip")||_?.closest?.("#worker-parallel-analysis-dialog"))return;if(_?.closest?.(".worker-analysis-btn")){Ke?.open();return}if(_?.closest?.(".worker-repo-strip")||_?.closest?.(".worker-mini__timeline")){tt();return}let E=_?.closest?.(".worker-repo-op__session");if(E){let Ie=E.dataset.attemptId;Ie&&Mt(Ie);return}let U=_?.closest?.(".worker-repo-op__resolve");if(U){ce(U.dataset.operationId||"");return}let ae=_?.closest?.(".worker-repo-op__dismiss");if(ae){qe(ae.dataset.operationId||"");return}let be=_?.closest?.(".worker-cleanup__resume");if(be){let Ie=be.dataset.beadId;Ie&&Ue(Ie);return}let pe=_?.closest?.(".worker-banner__resume");if(pe){let Ie=pe.dataset.attemptId;Ie&&Ye(Ie);return}let Ze=_?.closest?.(".worker-banner__discard");if(Ze){let Ie=Ze.dataset.confirmation==="merged"?"merged":"unmerged";M(Ze.dataset.beadId||"",Ze.dataset.attemptId||null,Ie,Ze.dataset.operationId||null);return}let y=_?.closest?.(".worker-banner__dismiss");if(y){let Ie=y.dataset.attemptId;Ie&&z(Ie);return}if(_?.closest?.(".worker-play")){ne(!$e().auto_advance);return}let v=_?.closest?.(".worker-merge-all");if(v){v.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?g(!1):x():g(!0);return}let m=_?.closest?.(".worker-pane__hd--toggle");if(m){let Ie=m.dataset.lane;(Ie==="queue"||Ie==="done")&&ye(Ie);return}let O=_?.closest?.(".worker-card__place-lane");if(O){let Ie=O.dataset.beadId,ut=O.dataset.lane;Ie&&(ut==="parallel"||/^s[1-5]$/.test(ut||""))&&(V=null,Z(),Be(Ie,ut));return}if(_?.closest?.(".worker-card__place-cancel")){V=null,Z();return}let ee=_?.closest?.(".worker-card__place");if(ee){let Ie=ee.dataset.beadId;Ie&&!ee.disabled&&(rt()?(V=Ie,Z()):Be(Ie,"parallel"));return}let Fe=_?.closest?.(".worker-filter__chip");if(Fe){let Ie=Fe.dataset.spec;(Ie==="all"||Ie==="with"||Ie==="without")&&ur({...P,spec:Ie});return}let Ge=_?.closest?.(".worker-mini__merge");if(Ge){let Ie=Ge.dataset.beadId||"";$e().cleanup_failed?.[Ie]?Ue(Ie):Re(Ie);return}let Xe=_?.closest?.(".worker-mini__merge-cancel");if(Xe){$(Xe.dataset.beadId||"");return}let Pe=_?.closest?.(".worker-mini__discard");if(Pe){M(Pe.dataset.beadId||"",Pe.dataset.attemptId||null,Pe.dataset.discardMode==="merged"?"merged":"unmerged",Pe.dataset.operationId||null);return}let mt=_?.closest?.(".worker-mini__stale-continue");if(mt){G("worker-stale-work-continue",mt.dataset.beadId||"",mt.dataset.actionId||"");return}let sr=_?.closest?.(".worker-mini__stale-backup");if(sr){G("worker-stale-work-backup-fresh",sr.dataset.beadId||"",sr.dataset.actionId||"");return}let Vr=_?.closest?.(".worker-mini__stale-recheck");if(Vr){G("worker-stale-work-recheck",Vr.dataset.beadId||"",Vr.dataset.actionId||"");return}let Vn=_?.closest?.(".worker-mini__revise-fix");if(Vn){Y("worker-revise-fix",Vn.dataset.beadId||"");return}let pn=_?.closest?.(".worker-mini__revise-approve");if(pn){Y("worker-revise-approve",pn.dataset.beadId||"");return}if(_?.closest?.(".worker-mini__pr"))return;if(_?.closest?.(".rtile__discard")){let Ie=_?.closest?.(".rtile"),ut=Ie?.dataset?.beadId,Kr=Ie?.dataset?.attemptId;ut&&M(ut,Kr||null,"unmerged",_?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(_?.closest?.(".rtile__dismiss")){let ut=_?.closest?.(".rtile")?.dataset?.attemptId;ut&&z(ut);return}if(_?.closest?.(".rtile__pause")){let ut=_?.closest?.(".rtile")?.dataset?.attemptId;ut&&lt(ut);return}if(_?.closest?.(".rtile__resume")){let ut=_?.closest?.(".rtile")?.dataset?.attemptId;ut&&Ye(ut);return}if(_?.closest?.(".rtile__session")){let ut=_?.closest?.(".rtile")?.dataset?.attemptId;ut&&Mt(ut);return}if(_?.closest?.(".worker-drawer-overlay__backdrop")){Ee.close(),ve.close();return}if(_?.closest?.(".worker-drawer-host"))return;let fn=_?.closest?.(".rtile");if(fn){if(_?.closest?.(".rtile__id")){let ut=fn.dataset.beadId;ut&&Xt(ut).then(Kr=>{Kr?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ie=fn.dataset.beadId;Ie&&d&&d(Ie);return}let Kn=_?.closest?.(".worker-mini, .worker-card");if(Kn){let Ie=Kn.dataset.beadId;if(_?.closest?.(".worker-mini__id, .worker-card__id")){Ie&&Xt(Ie).then(ut=>{ut?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Ie&&d&&d(Ie)}}return e.addEventListener("pointerdown",Et),e.addEventListener("dragstart",et),e.addEventListener("dragover",yt),e.addEventListener("dragleave",dr),e.addEventListener("drop",Tt),e.addEventListener("click",ge),e.addEventListener("change",Ht),Se(),ke(),b&&re.push(b.subscribe(()=>{for(let[l,_]of L)_==="failed"&&L.delete(l);Z()})),s&&re.push(s.subscribe(()=>{let l=u&&u()||"";l!==we&&(we=l,Ne.close()),Z(),Gt()})),o&&typeof o.subscribe=="function"&&re.push(o.subscribe(()=>{Gt(),Z()})),Z(),{load(){Z()},destroy(){for(let l of re.splice(0))try{l()}catch{}e.removeEventListener("pointerdown",Et),e.removeEventListener("dragstart",et),e.removeEventListener("dragover",yt),e.removeEventListener("dragleave",dr),e.removeEventListener("drop",Tt),e.removeEventListener("click",ge),e.removeEventListener("change",Ht);try{ve.destroy()}catch{}De.hidden=!0;try{Ke?.destroy()}catch{}try{Ne.destroy()}catch{}Qe(c``,e)}}}function Pa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Fd(e,t,r,n=async()=>{},s=async()=>{}){let o=_t("views:workspace-picker"),a=null,i=!1,d=!1,u=!1;async function p(D){let B=D.target.value,de=t.getState().workspace?.current?.path||"";if(B&&B!==de){o("switching workspace to %s",B),i=!0,S();try{await r(B)}catch(te){o("workspace switch failed: %o",te)}finally{i=!1,S()}}}async function f(){let D=t.getState(),k=D.workspace?.current?.path||D.workspace?.available?.[0]?.path||"";if(!(!k||d)){o("git-pulling workspace %s",k),d=!0,S();try{await n(k)}catch(B){o("workspace git pull failed: %o",B)}finally{d=!1,S()}}}function b(D){let k=D.target;k&&e.contains(k)||I()}function R(D){D.key==="Escape"&&I()}function A(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",R),S())}function I(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",R),S())}function P(){u?I():A()}async function V(D){let k=D.target,B=k.value,oe=k.checked;o("toggling visibility %s \u2192 %s",B,String(oe));try{await s(B,oe)}catch(de){o("workspace visibility toggle failed: %o",de)}}function K(D){return D?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${i||d}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function W(D,k){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${P}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${D.map(B=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${B.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${B.path}"
                        .checked=${!k.has(B.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Pa(B.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function L(){let D=t.getState(),k=D.workspace?.current,B=D.workspace?.available||[],oe=new Set(D.workspace?.hidden||[]),de=k?.path||B[0]?.path||"";if(B.length===0)return c``;let te=B.filter(re=>!oe.has(re.path)||re.path===de);if(te.length<=1){let re=te[0]||B[0],Oe=Pa(re.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${re.path}"
            >${Oe}</span
          >
          ${W(B,oe)}
          ${K(de)}
          ${d?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||d}
          aria-label="Select project workspace"
        >
          ${te.map(re=>c`
              <option
                value="${re.path}"
                ?selected=${re.path===de}
                title="${re.path}"
              >
                ${Pa(re.path)}
              </option>
            `)}
        </select>
        ${W(B,oe)}
        ${K(de)}
        ${i||d?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){Qe(L(),e)}return S(),a=t.subscribe(()=>S()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",R),Qe(c``,e)}}}var jd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Da(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Bd(e,t,r=Da()){return{id:r,type:e,payload:t}}function Ud(e={}){let t=_t("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,d=!0,u=new Map,p=[],f=new Map,b=new Set;function R(L){for(let S of Array.from(b))try{S(L)}catch{}}function A(){if(!d||i)return;o="reconnecting",t("ws reconnecting\u2026"),R(o);let L=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),S=(r.jitterRatio||0)*L,D=Math.max(0,Math.round(L+(Math.random()*2-1)*S));t("ws retry in %d ms (attempt %d)",D,a+1),i=setTimeout(()=>{i=null,W()},D)}function I(L){try{s?.send(JSON.stringify(L))}catch(S){t("ws send failed",S)}}function P(){for(o="open",t("ws open"),R(o),a=0;p.length;){let L=p.shift();L&&I(L)}}function V(L){let S;try{S=JSON.parse(String(L.data))}catch{t("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){t("ws received invalid envelope");return}if(u.has(S.id)){let k=u.get(S.id);u.delete(S.id),S.ok?k?.resolve(S.payload):k?.reject(S.error||new Error("ws error"));return}let D=f.get(S.type);if(D&&D.size>0)for(let k of Array.from(D))try{k(S.payload)}catch(B){t("ws event handler error",B)}else t("ws received unhandled message type: %s",S.type)}function K(){o="closed",t("ws closed"),R(o);for(let[L,S]of u.entries())S.reject(new Error("ws disconnected")),u.delete(L);a+=1,A()}function W(){if(!d)return;let L=n();try{s=new WebSocket(L),t("ws connecting %s",L),o="connecting",R(o),s.addEventListener("open",P),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",K)}catch(S){t("ws connect failed %o",S),A()}}return W(),{send(L,S){if(!jd.includes(L))return Promise.reject(new Error(`unknown message type: ${L}`));let D=Da(),k=Bd(L,S,D);return t("send %s id=%s",L,D),new Promise((B,oe)=>{u.set(D,{resolve:B,reject:oe,type:L}),s&&s.readyState===s.OPEN?I(k):(t("queue %s id=%s (state=%s)",L,D,o),p.push(k))})},on(L,S){f.has(L)||f.set(L,new Set);let D=f.get(L);return D?.add(S),()=>{D?.delete(S)}},onConnection(L){return b.add(L),()=>{b.delete(L)}},reconnect(){d=!0,i&&(clearTimeout(i),i=null),a=0,W()},close(){d=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function _g(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function mg(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Na=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Wd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Rr="tab:worker:closed",gg="bdui.worker.done-range",zd=sd,Hd="worker:queue",Gd="worker:parallel-analysis",Vd="ui:order",Kd="ui:display-policy",Yd="exec:presets",Ir="tab:board:closed",Zd="beads-ui.board.closed-range";function bg(e){let t=_t("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Qe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(s&&bd(s),o&&a&&i&&d){let Ve=function(y,v){let m="Request failed",O="";if(y&&typeof y=="object"){let ee=y;if(typeof ee.message=="string"&&ee.message.length>0&&(m=ee.message),typeof ee.details=="string")O=ee.details;else if(ee.details&&typeof ee.details=="object")try{O=JSON.stringify(ee.details,null,2)}catch{O=""}}else typeof y=="string"&&y.length>0&&(m=y);let T=v&&v.length>0?`Failed to load ${v}`:"Request failed";it.open(T,m,O)},Ye=function(y){return`${tt.getState().workspace.current?.path||""}\0${y}`},z=function(){H&&(H().catch(()=>{}),H=null),F=null,se=null},Re=function(y){Ce=y;let v=()=>{Ce!==y||tt.getState().selected_id!==y||(Ce=null,Q(y))};if(!Te){ze.then(v);return}v()},$=function(y,v,m,O,T){return m!==g[v]?(T().catch(()=>{}),!1):(y.set(O,T),!0)},M=function(){let y=tt.getState();qe(y.view==="board"),j(y.view==="worker"),N(y.view==="monitor"),fe(y.view==="board"||y.view==="worker"||x||!!y.selected_id)},ne=function(){let y=Nr(G);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},ce=function(){let y=Nr(Y);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},qe=function(y){if(y)for(let[v,m]of Na){if(Ue.has(v)||ue.has(v))continue;let O=v===Ir?ne():{type:m};try{ve.register(v,O)}catch(Fe){t("register %s store failed: %o",v,Fe)}ue.add(v);let T=g.board,ee=!1;_e.subscribeList(v,O).then(Fe=>{ee=!$(Ue,"board",T,v,Fe)}).catch(Fe=>{t("subscribe %s failed: %o",v,Fe),Ve(Fe,"board")}).finally(()=>{ue.delete(v),ee&&M()})}else Le()},Le=function(){g.board+=1;for(let[y]of Na){let v=Ue.get(y);v&&(v().catch(()=>{}),Ue.delete(y));try{ve.unregister(y)}catch(m){t("unregister %s failed: %o",y,m)}}},j=function(y){if(!y){J();return}for(let[v,m]of Wd){if(Ae.has(v)||ue.has(v))continue;let O=v===Rr?ce():{type:m};try{ve.register(v,O)}catch(Fe){t("register %s store failed: %o",v,Fe)}ue.add(v);let T=g.worker,ee=!1;_e.subscribeList(v,O).then(Fe=>{ee=!$(Ae,"worker",T,v,Fe)}).catch(Fe=>{t("subscribe %s failed: %o",v,Fe),Ve(Fe,"worker")}).finally(()=>{ue.delete(v),ee&&M()})}},J=function(){g.worker+=1;for(let[y]of Wd){let v=Ae.get(y);v&&(v().catch(()=>{}),Ae.delete(y));try{ve.unregister(y)}catch(m){t("unregister %s failed: %o",y,m)}}},fe=function(y){if(!y){w();return}He||(Me("subscribe-worker-queue",{id:Hd}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),Me("subscribe-worker-parallel-analysis",{id:Gd}).catch(v=>{t("subscribe-worker-parallel-analysis failed: %o",v)}),He=()=>(Me("unsubscribe-worker-parallel-analysis",{id:Gd}),Me("unsubscribe-worker-queue",{id:Hd})))},w=function(){He&&(He().catch(()=>{}),He=null),Ne.clear()},N=function(y){if(!y){X();return}C||(Me("subscribe-monitor-pipeline",{id:zd}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),C=()=>Me("unsubscribe-monitor-pipeline",{id:zd}))},X=function(){C&&(C().catch(()=>{}),C=null)},Z=function(){ye||(Me("subscribe-ui-order",{id:Vd}).catch(y=>{t("subscribe-ui-order failed: %o",y)}),ye=()=>Me("unsubscribe-ui-order",{id:Vd}))},ke=function(){ye&&(ye().catch(()=>{}),ye=null),je.clear()},ft=function(){Se||(Me("subscribe-display-policy",{id:Kd}).catch(y=>{t("subscribe-display-policy failed: %o",y)}),Se=()=>Me("unsubscribe-display-policy",{id:Kd}))},Et=function(){Se&&(Se().catch(()=>{}),Se=null),Ke.clear()},yt=function(){et||(Me("subscribe-impl-presets",{id:Yd}).catch(y=>{t("subscribe-impl-presets failed: %o",y)}),et=()=>Me("unsubscribe-impl-presets",{id:Yd}))},jt=function(y){if(!y)return"Unknown";let v=y.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var u=Ve,p=Ye,f=z,b=Re,R=$,A=M,I=ne,P=ce,V=qe,K=Le,W=j,L=J,S=fe,D=w,k=N,B=X,oe=Z,de=ke,te=ft,re=Et,Oe=yt,nt=jt;let De=document.getElementById("header-loading"),ot=Gi(De),it=kc(e),he=Ud(),Me=ot.wrapSend((y,v)=>he.send(y,v)),_e=qi(Me),ve=Fi(),Ee=Ui(),Ne=Bi(),we=$i(),je=ji(),Ke=wi(),$e=ki(),rt=xi();he.on("impl-presets-snapshot",y=>{let v=y;v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&$e.set({revision:v.revision,presets:v.presets})}),he.on("monitor-pipeline-snapshot",y=>{let v=y;if(!(!v||!Array.isArray(v.workspaces)))try{we.set(v.workspaces,v.workspaces_state)}catch{}}),he.on("ui-order-snapshot",y=>{let v=y;if(v&&typeof v.revision=="number")try{je.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),he.on("display-policy-snapshot",y=>{let v=y;if(v&&v.policy&&typeof v.policy=="object")try{Ke.set(v.policy)}catch{}}),he.on("session-log-snapshot",y=>{let v=y;if(v&&typeof v.id=="string")try{rt.set(v.id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),he.on("session-log-append",y=>{let v=y;if(v&&typeof v.id=="string")try{rt.append(v.id,v.event)}catch{}}),he.on("snapshot",y=>{let v=y,m=v&&typeof v.id=="string"?v.id:"",O=m?ve.getStore(m):null;if(O&&v&&v.type==="snapshot")try{O.applyPush(v)}catch{}}),he.on("upsert",y=>{let v=y,m=v&&typeof v.id=="string"?v.id:"",O=m?ve.getStore(m):null;if(O&&v&&v.type==="upsert")try{O.applyPush(v)}catch{}}),he.on("delete",y=>{let v=y,m=v&&typeof v.id=="string"?v.id:"",O=m?ve.getStore(m):null;if(O&&v&&v.type==="delete")try{O.applyPush(v)}catch{}});let H=null,F=null,se=null,Ce=null,Be=()=>{},ze=new Promise(y=>{Be=()=>y(void 0)}),Te=!1,lt=!1;async function Q(y){let v=Ye(y);if(v===F||v===se)return;se=v;let m=`detail:${y}`,O={type:"issue-detail",params:{id:y}};try{ve.register(m,O)}catch(T){t("register detail store failed: %o",T)}try{let T=await _e.subscribeList(m,O);if(tt.getState().selected_id!==y||Ye(y)!==v){await T().catch(()=>{});return}H&&await H().catch(()=>{}),H=T,F=v}catch(T){t("detail subscribe failed: %o",T),Ve(T,"issue details")}finally{se===v&&(se=null)}}let Ue=new Map,ue=new Set,g={board:0,worker:0},x=!1,G=Dt;try{let y=window.localStorage.getItem(Zd);Ut(y)&&(G=y)}catch{}let Y=Dt;try{let y=window.localStorage.getItem(gg);Ut(y)&&(Y=y)}catch{}async function me(y){if(!Ut(y)||y===G)return;G=y;try{window.localStorage.setItem(Zd,y)}catch{}let v=Ue.get(Ir);if(!v)return;Ue.delete(Ir),await v().catch(()=>{});let m=ne();try{ve.register(Ir,m)}catch(O){t("register %s store failed: %o",Ir,O)}try{let O=await _e.subscribeList(Ir,m);Ue.set(Ir,O)}catch(O){t("re-subscribe %s failed: %o",Ir,O),Ve(O,"board")}}async function xe(y){if(!Ut(y)||y===Y)return;Y=y;let v=Ae.get(Rr);if(!v)return;Ae.delete(Rr),await v().catch(()=>{});let m=ce();try{ve.register(Rr,m)}catch(O){t("register %s store failed: %o",Rr,O)}try{let O=await _e.subscribeList(Rr,m);Ae.set(Rr,O)}catch(O){t("re-subscribe %s failed: %o",Rr,O),Ve(O,"worker")}}let Ae=new Map,He=null,C=null,ye=null,Se=null,et=null;async function dr(){Se=null,Ke.clear(),et=null,$e.clear(),He=null,C=null,Ue.clear(),Ae.clear(),g.board+=1,g.worker+=1,yt();let y=tt.getState().workspace.current?.path;if(y)try{await he.send("set-workspace",{path:y})}catch(m){t("workspace restore after reconnect failed: %o",m);return}ft();let v=tt.getState();qe(v.view==="board"),j(v.view==="worker"),N(v.view==="monitor"),fe(v.view==="board"||v.view==="worker"||!!v.selected_id)}async function vt(){t("clearing all subscriptions for workspace switch"),Le(),J(),w(),Ee.clear(),ke(),Z(),Et(),ft(),z();let y=tt.getState();if(y.selected_id)try{ve.unregister(`detail:${y.selected_id}`)}catch{}let v=tt.getState();qe(v.view==="board"),j(v.view==="worker"),N(v.view==="monitor"),fe(v.view==="board"||v.view==="worker"||!!v.selected_id),v.selected_id&&Re(v.selected_id)}async function Tt(y){t("requesting workspace switch to %s",y),lt=!0;try{let v=await he.send("set-workspace",{path:y});t("workspace switch result: %o",v),v&&v.workspace&&(tt.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",y),v.changed&&(await vt(),ie("Switched to "+jt(y),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),ie("Failed to switch workspace","error",3e3),v}finally{lt=!1}}async function ur(y){t("requesting workspace git pull for %s",y);try{let v=await he.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let m=v?.status;if(m==="up_to_date"){ie("Already up to date","success",2e3);return}if(m==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+jt(y),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let m=v?.code,O=v?.message;if(m==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(m==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(m==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let T=O?`: ${O}`:"";throw ie(`Git pull failed${T}`,"error",3e3),v}}async function wr(y,v){t("setting workspace visibility %s \u2192 %s",y,String(v));try{await he.send("set-workspace-visibility",{path:y,visible:v}),await Ht()}catch(m){t("workspace visibility update failed: %o",m),ie("Failed to update project visibility","error",3e3)}}async function Ht(){try{let y=await he.send("list-workspaces",{});if(t("workspaces loaded: %o",y),y&&Array.isArray(y.workspaces)){let v=y.workspaces.map(ee=>({path:ee.path,database:ee.database,pid:ee.pid,version:ee.version})),m=y.current?{path:y.current.root_dir,database:y.current.db_path}:null,O=Array.isArray(y.hidden)?y.hidden.filter(ee=>typeof ee=="string"):[];tt.setState({workspace:{current:m,available:v,hidden:O}});let T=window.localStorage.getItem("beads-ui.workspace");T&&(!v.some(Fe=>Fe.path===T)||O.includes(T)?window.localStorage.removeItem("beads-ui.workspace"):m&&T!==m.path&&(t("restoring saved workspace preference: %s",T),await Tt(T)))}}catch(y){t("failed to load workspaces: %o",y)}}he.on("workspace-changed",y=>{t("workspace-changed event: %o",y),y&&y.root_dir&&(tt.setState({workspace:{current:{path:y.root_dir,database:y.db_path}}}),Ht(),vt())});let wt=!1;if(typeof he.onConnection=="function"){let y=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(wt=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&wt&&(wt=!1,ie("Reconnected","success",2200),mg(tt,(m,O)=>{t(`${m}: %o`,O)}),dr())};he.onConnection(y)}let nr="board";try{let y=window.localStorage.getItem("beads-ui.view");(y==="board"||y==="worker"||y==="monitor")&&(nr=y)}catch(y){t("view parse error: %o",y)}let tt=Hi({config:_g(),view:nr});he.on("worker-queue-snapshot",y=>{let v=y;if(!v||!v.queue)return;let m=tt.getState().workspace.current?.path;if(typeof m=="string"&&m.length>0&&v.root_dir!==m){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{Ee.set(v.queue)}catch{}}),he.on("worker-parallel-analysis-snapshot",y=>{let v=y;if(!v)return;let m=tt.getState().workspace.current?.path;if(!(typeof m=="string"&&m.length>0&&typeof v.root_dir=="string"&&v.root_dir!==m))try{Ne.set({settings:v.settings,job:v.job??null,runs:Array.isArray(v.runs)?v.runs:[],last_good:v.last_good??null})}catch{}});let Mt=Wi(tt);Mt.start();let kr=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),Gt=async(y,v)=>{try{return await Me(y,v)}catch(m){if(kr.has(y))throw m;return[]}};n&&ad(n,tt,Mt);let ge=document.getElementById("workspace-picker");ge&&Fd(ge,tt,Tt,ur,wr);let l=dd(e,(y,v)=>Me(y,v));try{let y=document.getElementById("new-issue-btn");y&&y.addEventListener("click",()=>l.open())}catch{}let _=_d(e,{policyStore:Ke,queueStore:Ee,implPresetStore:$e,transport:(y,v)=>Me(y,v),onOpenChange:y=>{x=y,M()},labelOptions:()=>{let y=new Set;for(let[v]of Na)for(let m of ve.snapshotFor(v)||[]){let O=m.labels;if(Array.isArray(O))for(let T of O)typeof T=="string"&&T.length>0&&y.add(T)}return Array.from(y).sort()}});try{let y=document.getElementById("display-settings-btn");y&&(y.setAttribute("aria-label","\uC124\uC815"),y.setAttribute("title","\uC124\uC815"),y.addEventListener("click",()=>_.open()))}catch{}let E=nl(o,{gotoIssue:y=>Mt.gotoIssue(y),issueStores:ve,transport:Gt,workerQueueStore:Ee,uiOrderStore:je,displayPolicyStore:Ke,closedRange:G,onClosedRangeChange:y=>{me(y)},onNewIssue:()=>l.open()}),U=Ma(a,{transport:Gt,issueStores:ve,queueStore:Ee,analysisStore:Ne,sessionLogStore:rt,uiOrderStore:je,gotoIssue:y=>tt.setState({selected_id:y}),getWorkspacePath:()=>tt.getState().workspace.current?.path,doneRange:Y,onDoneRangeChange:y=>{xe(y)}}),ae=od(i,{transport:Gt,pipelineStore:we,execPresetStore:$e,gotoIssue:y=>Mt.gotoIssue(y),getWorkspacePath:()=>tt.getState().workspace.current?.path,switchWorkspace:y=>Tt(y)}),be=wc(d,{issueStores:ve,transport:Gt,queueStore:Ee,execPresetStore:$e,sessionLogStore:rt,getWorkspacePath:()=>tt.getState().workspace.current?.path,onNavigate:y=>{tt.getState().view==="worker"?tt.setState({selected_id:y}):Mt.gotoIssue(y)},onClose:()=>{let y=tt.getState();tt.setState({selected_id:null});try{Mt.gotoView(y.view==="worker"||y.view==="monitor"?y.view:"board")}catch{}},onOpenExecPresets:()=>{_.open("execution")}}),pe=tt.getState().selected_id;pe&&(d.hidden=!1,be.load(pe),Re(pe)),tt.subscribe(y=>{let v=y.selected_id;v?(d.hidden=!1,be.load(v),lt||Re(v)):(be.clear(),d.hidden=!0,z())});let Ze=y=>{o.hidden=y.view!=="board",a.hidden=y.view!=="worker",i.hidden=y.view!=="monitor",qe(y.view==="board"),j(y.view==="worker"),N(y.view==="monitor"),fe(y.view==="board"||y.view==="worker"||x||!!y.selected_id),!y.selected_id&&y.view==="board"&&E.load(),y.view==="worker"&&U.load(),y.view==="monitor"?ae.load():ae.pause(),window.localStorage.setItem("beads-ui.view",y.view)};tt.subscribe(Ze),Ze(tt.getState()),Z(),ft(),yt(),Ht().finally(()=>{Te=!0,Be()}),window.addEventListener("keydown",y=>{let v=y.ctrlKey||y.metaKey,m=String(y.key||"").toLowerCase(),O=y.target,T=O&&O.tagName?String(O.tagName).toLowerCase():"",ee=T==="input"||T==="textarea"||T==="select"||O&&typeof O.isContentEditable=="boolean"&&O.isContentEditable;v&&m==="n"&&(ee||(y.preventDefault(),l.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&bg(t)});export{bg as bootstrap,_g as readBootstrapConfig,mg as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
