var pu=Object.create;var go=Object.defineProperty;var fu=Object.getOwnPropertyDescriptor;var _u=Object.getOwnPropertyNames;var mu=Object.getPrototypeOf,gu=Object.prototype.hasOwnProperty;var bu=(e,t,r)=>t in e?go(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var bo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var hu=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of _u(t))!gu.call(e,s)&&s!==r&&go(e,s,{get:()=>t[s],enumerable:!(n=fu(t,s))||n.enumerable});return e};var yu=(e,t,r)=>(r=e!=null?pu(mu(e)):{},hu(t||!e||!e.__esModule?go(r,"default",{value:e,enumerable:!0}):r,e));var lt=(e,t,r)=>bu(e,typeof t!="symbol"?t+"":t,r);var xi=bo(($g,$i)=>{var Yr=1e3,Zr=Yr*60,Xr=Zr*60,Dr=Xr*24,ku=Dr*7,$u=Dr*365.25;$i.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return xu(e);if(r==="number"&&isFinite(e))return t.long?Su(e):Au(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function xu(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*$u;case"weeks":case"week":case"w":return r*ku;case"days":case"day":case"d":return r*Dr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Xr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Zr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Yr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Au(e){var t=Math.abs(e);return t>=Dr?Math.round(e/Dr)+"d":t>=Xr?Math.round(e/Xr)+"h":t>=Zr?Math.round(e/Zr)+"m":t>=Yr?Math.round(e/Yr)+"s":e+"ms"}function Su(e){var t=Math.abs(e);return t>=Dr?ls(e,t,Dr,"day"):t>=Xr?ls(e,t,Xr,"hour"):t>=Zr?ls(e,t,Zr,"minute"):t>=Yr?ls(e,t,Yr,"second"):e+" ms"}function ls(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Si=bo((xg,Ai)=>{function Eu(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=i,r.humanize=xi(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let y=0;y<f.length;y++)_=(_<<5)-_+f.charCodeAt(y),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,y=null,R,x;function L(...D){if(!L.enabled)return;let V=L,K=Number(new Date),U=K-(_||K);V.diff=U,V.prev=_,V.curr=K,_=K,D[0]=r.coerce(D[0]),typeof D[0]!="string"&&D.unshift("%O");let I=0;D[0]=D[0].replace(/%([a-zA-Z%])/g,(P,k)=>{if(P==="%%")return"%";I++;let j=r.formatters[k];if(typeof j=="function"){let oe=D[I];P=j.call(V,oe),D.splice(I,1),I--}return P}),r.formatArgs.call(V,D),(V.log||r.log).apply(V,D)}return L.namespace=f,L.useColors=r.useColors(),L.color=r.selectColor(f),L.extend=n,L.destroy=r.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(R!==r.namespaces&&(R=r.namespaces,x=r.enabled(f)),x),set:D=>{y=D}}),typeof r.init=="function"&&r.init(L),L}function n(f,_){let y=r(this.namespace+(typeof _>"u"?":":_)+f);return y.log=this.log,y}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of _)y[0]==="-"?r.skips.push(y.slice(1)):r.names.push(y)}function o(f,_){let y=0,R=0,x=-1,L=0;for(;y<f.length;)if(R<_.length&&(_[R]===f[y]||_[R]==="*"))_[R]==="*"?(x=R,L=y,R++):(y++,R++);else if(x!==-1)R=x+1,L++,y=L;else return!1;for(;R<_.length&&_[R]==="*";)R++;return R===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function i(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ai.exports=Eu});var Ei=bo((Ot,cs)=>{Ot.formatArgs=Cu;Ot.save=Ru;Ot.load=Iu;Ot.useColors=Tu;Ot.storage=Lu();Ot.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ot.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Tu(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Cu(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+cs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Ot.log=console.debug||console.log||(()=>{});function Ru(e){try{e?Ot.storage.setItem("debug",e):Ot.storage.removeItem("debug")}catch{}}function Iu(){let e;try{e=Ot.storage.getItem("debug")||Ot.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Lu(){try{return localStorage}catch{}}cs.exports=Si()(Ot);var{formatters:Ou}=cs.exports;Ou.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var _n=globalThis,rs=_n.trustedTypes,li=rs?rs.createPolicy("lit-html",{createHTML:e=>e}):void 0,yo="$lit$",pr=`lit$${Math.random().toFixed(9).slice(2)}$`,vo="?"+pr,vu=`<${vo}>`,Lr=document,mn=()=>Lr.createComment(""),gn=e=>e===null||typeof e!="object"&&typeof e!="function",wo=Array.isArray,_i=e=>wo(e)||typeof e?.[Symbol.iterator]=="function",ho=`[ 	
\f\r]`,fn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ci=/-->/g,di=/>/g,Rr=RegExp(`>|${ho}(?:([^\\s"'>=/]+)(${ho}*=${ho}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ui=/'/g,pi=/"/g,mi=/^(?:script|style|textarea|title)$/i,ko=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),d=ko(1),kr=ko(2),gg=ko(3),Ft=Symbol.for("lit-noChange"),mt=Symbol.for("lit-nothing"),fi=new WeakMap,Ir=Lr.createTreeWalker(Lr,129);function gi(e,t){if(!wo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return li!==void 0?li.createHTML(t):t}var bi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=fn;for(let i=0;i<r;i++){let c=e[i],u,f,_=-1,y=0;for(;y<c.length&&(a.lastIndex=y,f=a.exec(c),f!==null);)y=a.lastIndex,a===fn?f[1]==="!--"?a=ci:f[1]!==void 0?a=di:f[2]!==void 0?(mi.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Rr):f[3]!==void 0&&(a=Rr):a===Rr?f[0]===">"?(a=s??fn,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?Rr:f[3]==='"'?pi:ui):a===pi||a===ui?a=Rr:a===ci||a===di?a=fn:(a=Rr,s=void 0);let R=a===Rr&&e[i+1].startsWith("/>")?" ":"";o+=a===fn?c+vu:_>=0?(n.push(u),c.slice(0,_)+yo+c.slice(_)+pr+R):c+pr+(_===-2?i:R)}return[gi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},bn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,f]=bi(t,r);if(this.el=e.createElement(u,n),Ir.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Ir.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(yo)){let y=f[a++],R=s.getAttribute(_).split(pr),x=/([.?@])?(.*)/.exec(y);c.push({type:1,index:o,name:x[2],strings:R,ctor:x[1]==="."?ss:x[1]==="?"?os:x[1]==="@"?as:Mr}),s.removeAttribute(_)}else _.startsWith(pr)&&(c.push({type:6,index:o}),s.removeAttribute(_));if(mi.test(s.tagName)){let _=s.textContent.split(pr),y=_.length-1;if(y>0){s.textContent=rs?rs.emptyScript:"";for(let R=0;R<y;R++)s.append(_[R],mn()),Ir.nextNode(),c.push({type:2,index:++o});s.append(_[y],mn())}}}else if(s.nodeType===8)if(s.data===vo)c.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(pr,_+1))!==-1;)c.push({type:7,index:o}),_+=pr.length-1}o++}}static createElement(t,r){let n=Lr.createElement("template");return n.innerHTML=t,n}};function Or(e,t,r=e,n){if(t===Ft)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=gn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Or(e,s._$AS(e,t.values),s,n)),t}var ns=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Lr).importNode(r,!0);Ir.currentNode=s;let o=Ir.nextNode(),a=0,i=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Kr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new is(o,this,t)),this._$AV.push(u),c=n[++i]}a!==c?.index&&(o=Ir.nextNode(),a++)}return Ir.currentNode=Lr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Kr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=mt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Or(this,t,r),gn(t)?t===mt||t==null||t===""?(this._$AH!==mt&&this._$AR(),this._$AH=mt):t!==this._$AH&&t!==Ft&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):_i(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==mt&&gn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Lr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=bn.createElement(gi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ns(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=fi.get(t.strings);return r===void 0&&fi.set(t.strings,r=new bn(t)),r}k(t){wo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(mn()),this.O(mn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Mr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=mt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=mt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Or(this,t,r,0),a=!gn(t)||t!==this._$AH&&t!==Ft,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Or(this,i[n+c],r,c),u===Ft&&(u=this._$AH[c]),a||(a=!gn(u)||u!==this._$AH[c]),u===mt?t=mt:t!==mt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ss=class extends Mr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===mt?void 0:t}},os=class extends Mr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==mt)}},as=class extends Mr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Or(this,t,r,0)??mt)===Ft)return;let n=this._$AH,s=t===mt&&n!==mt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==mt&&(n===mt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},is=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Or(this,t)}},hi={M:yo,P:pr,A:vo,C:1,L:bi,R:ns,D:_i,V:Or,I:Kr,H:Mr,N:os,U:as,B:ss,F:is},wu=_n.litHtmlPolyfillSupport;wu?.(bn,Kr),(_n.litHtmlVersions??(_n.litHtmlVersions=[])).push("3.3.1");var Ke=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Kr(t.insertBefore(mn(),o),o,void 0,r??{})}return s._$AI(e),s};var Mt="today",sr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function jt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Pr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function yi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function vi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function wi(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ki(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ti=yu(Ei(),1);function ft(e){return(0,Ti.default)(`beads-ui:${e}`)}function Zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Nr(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ii(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Li(e,t){let r=Zt(e.updated_at),n=Zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Oi(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Zt(e.created_at),o=Zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Mi(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Mu=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ci(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ri(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Mu.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Pi(e,t){let r=Ci(e),n=Ci(t);if(r!==n)return r<n?-1:1;let s=Ri(e),o=Ri(t);if(s!==o)return s<o?-1:1;let a=Zt(e&&e.created_at),i=Zt(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var $o=2**20;function Qr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Zt(e&&e.created_at)}function ds(e){return(t,r)=>{let n=Qr(t,e),s=Qr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function xo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Qr(i,r)-$o};if(!i)return{rank:Qr(a,r)+$o};let c=Qr(a,r),u=Qr(i,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((_,y)=>({bead_id:_.id,rank:y*$o}))}}function Ao(e,t={}){let r=ft(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||Nr;function u(){for(let y of Array.from(a))try{y()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function _(y){if(i||!y||y.id!==e)return;let R=Number(y.revision)||0;if(r("apply %s rev=%d",y.type,R),!(R<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(R<=o)return;n.clear();let x=Array.isArray(y.issues)?y.issues:[];for(let L of x)L&&typeof L.id=="string"&&L.id.length>0&&n.set(L.id,L);f(),o=R,u();return}if(y.type==="upsert"){let x=y.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let L=n.get(x.id);if(!L)n.set(x.id,x);else{let D=Number.isFinite(L.updated_at)?L.updated_at:0,V=Number.isFinite(x.updated_at)?x.updated_at:0;if(D<=V){for(let K of Object.keys(L))K in x||delete L[K];for(let[K,U]of Object.entries(x))L[K]=U}}f()}o=R,u()}else if(y.type==="delete"){let x=String(y.issue_id||"");x&&(n.delete(x),f()),o=R,u()}}}return{id:e,subscribe(y){return a.add(y),()=>{a.delete(y)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(y){return n.get(y)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function us(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Di(e){let t=ft("subs"),r=new Map,n=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],_=Array.isArray(c.updated)?c.updated:[],y=Array.isArray(c.removed)?c.removed:[];for(let R of Array.from(u)){let x=r.get(R);if(!x)continue;let L=x.itemsById;for(let D of f)typeof D=="string"&&D.length>0&&L.set(D,!0);for(let D of _)typeof D=="string"&&D.length>0&&L.set(D,!0);for(let D of y)typeof D=="string"&&D.length>0&&L.delete(D)}}async function o(i,c){let u=us(c);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let _=r.get(i);if(_&&_.key!==u){let y=n.get(_.key);y&&(y.delete(i),y.size===0&&n.delete(_.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(_){let y=r.get(i)||null;if(y){let R=n.get(y.key);R&&(R.delete(i),R.size===0&&n.delete(y.key))}throw r.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let _=r.get(i)||null;if(_){let y=n.get(_.key);y&&(y.delete(i),y.size===0&&n.delete(_.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:us,selectors:{getIds(i){let c=r.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=r.get(i);return u?u.itemsById.has(c):!1},count(i){let c=r.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=r.get(i),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function Ni(){let e=ft("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let _=u?us(u):"",y=r.get(c)||"",R=t.has(c);if(e("register %s key=%s (prev=%s)",c,_,y),R&&y&&_&&y!==_){let x=t.get(c);if(x)try{x.dispose()}catch{}let L=s.get(c);if(L){try{L()}catch{}s.delete(c)}let D=Ao(c,f);t.set(c,D);let V=D.subscribe(()=>o());s.set(c,V)}else if(!R){let x=Ao(c,f);t.set(c,x);let L=x.subscribe(()=>o());s.set(c,L)}return r.set(c,_),()=>i(c)}function i(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function qi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Fi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ji(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function So(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Pu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Du(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Bi(e){let t=ft("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Pu(n),a=Du(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=So(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?So(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Nu=Object.freeze({workspace_config:{default_workspace:null}});function Ui(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Nu.workspace_config.default_workspace}}}function Wi(e={}){let t=ft("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ui(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ui(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!i&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function zi(e){let t=ft("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(_,y)=>{let R=s++,x=Date.now();n.set(R,{type:_,start_ts:x}),t("request start id=%d type=%s count=%d",R,_,r+1),a();let L=!1,D=()=>{L||(L=!0,n.delete(R),i())},V=setTimeout(()=>{L||(t("request TIMEOUT id=%d type=%s elapsed=%dms",R,_,Date.now()-x),D())},3e4);try{let K=await u(_,y),U=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",R,_,U),K}catch(K){let U=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",R,_,U,K),K}finally{clearTimeout(V),D()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:u-_.start_ts}))}}}function ie(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function ps(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(Mi),c;switch(i){case"created_desc":return c.sort(Nr),c;case"created_asc":return c.sort(Ii),c;case"updated_desc":return c.sort(Li),c;case"priority":return c.sort(Oi),c;case"manual":default:{let u=r();return u?c.sort(ds(u)):c.sort(Nr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function qr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function vt(e){let t=qr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Pt(e,t){let r=qr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function fs(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=qr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function _s(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(xo(i,c,u.order),a);s(u,f);let _=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(_&&_.conflict){let y={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(y);let R=n(xo(i,c,y.order),a);s(y,R);let x=await t("ui-order-set",{expected_revision:y.revision,entries:R});x&&x.applied&&r.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function ms(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Eo(e,t){return!t||typeof e!="string"||e.length===0||ms(t.visible_labels).includes(e)?!0:ms(t.hidden_labels).includes(e)?!1:!ms(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function gs(e,t){return ms(e).filter(r=>Eo(r,t))}function $r(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var qu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Gi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Hi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Fu={review:"\u2713",skip:"\u2298"},xr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function ju(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Vi(e){let t=e&&e.fill||"none";return t==="none"?xr.none:e&&e.stale===!0?xr.stale:t==="dim"?xr.dim:e&&e.glyph==="review"?xr.review:e&&e.glyph==="skip"?xr.skip:xr.done}function Bu(e){if(!e||e.fill==="none"||!e.approval_state)return Vi(e);let t=[];return e.glyph==="review"?t.push(xr.review):e.glyph==="skip"&&t.push(xr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Uu(e,t,r){let n=qu[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Fu[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${Gi[e]||e}
      </div>
    </div>
  `}function bs(e,t){if(!e||!e.stages)return"";let r=Hi[e.route]||Hi.spec_backed,n=e.stages,s=ju(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Gi[a]||a} ${a==="plan"?Bu(n[a]||{}):Vi(n[a]||{})}`).join(" \xB7 ")}`;return d`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Uu(a,n[a]||{},a===s))}
    </div>
  `}function Wu(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ki=2;function zu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ki).join(", "),s=r.length-Ki,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function To(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function hs(e,t){if(!e)return null;let r=To(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=To(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function Yi(e,t){let r=hs(e,t);return r?d`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Hu(e){if(!e)return null;let t=To(e.kind);return t?d`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Gu(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&$r(r,"route")){let i=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&$r(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&$r(r,"pr")){let i=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Yi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(d`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${i.kind}:${i.actor}@${i.sha}`}
        >${`exec ${i.kind==="delegated"?i.actor:`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(d`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of gs(e.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&$r(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),$r(r,"blocked")&&s.push(...zu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&$r(r,"blocked")&&s.push(d`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function Vu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Ku(e){let t=Pt(e.created_at),r=Pt(e.updated_at);return!t&&!r?"":d`<span class="board-card__times">
    ${t?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${vt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Yu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Pi):r.children;return d`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?d`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:d`<span class="board-card__roll-none">children 없음</span>`}
        ${Ku(e)}
      </div>
      ${n>0&&r.current?d`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?d`<div class="board-card__roll-list">
            ${o.map((a,i)=>d`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${c=>t.onChildClick&&t.onChildClick(c,a.id)}
                >
                  <span class=${Vu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${hs(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?d`<span class="board-card__roll-child-chips">
                        ${Yi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${Hu(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function ys(e,t){let r=Wu(e.priority);return d`
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
        ${r?d`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Gu(e,t)}
      ${e.workflow&&$r(t.policy||null,"stepper")?bs(e.workflow,e.status):""}
      ${Yu(e,t)}
    </article>
  `}function Jr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return d`
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
        ${n?d`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${sr.map(o=>d`<option
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
        ${e.items.map(o=>ys(o,t))}
      </div>
    </section>
  `}function Zi(e,t,r){return d`
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
          ${e.items.length===0?d`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>ys(n,t))}
        </div>
      </div>
    </dialog>
  `}var Zu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Xu=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Qu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Ju(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
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
      ${r.label_menu_open?d`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?d`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>d`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?d`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Xi(e,t,r){return d`
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
        ${Zu.map(n=>d`<option
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
        ${Xu.map(n=>d`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Ju(e,t,r)}
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
        ${Qu.map(n=>d`<option
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
  `}var ep=200,tp={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},rp=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Qi="beads-ui.board.sort",Ji=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function np(){try{let e=window.localStorage.getItem(Qi);if(e&&Ji.has(e))return e}catch{}return"created_desc"}function el(e,t){let r=ft("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||Mt,y=s?ps(s,a):null,R=_s({transport:o,uiOrderStore:a}),x=[],L=[],D=[],V=[],K=[],U=[],I=!1,S=0,P=np(),k=new Map,j=new Map,oe=new Map,ce=new Set,ee={search:"",priority:"",type:"",labels:[]},re=!1,Re=null;function st(F){return String(F.status||"open")==="open"}function Oe(F){let Q=String(F.status||"open");return Q==="open"||Q==="blocked"}function ot(F){let Q=ee.search.trim().toLowerCase(),w=ee.priority,C=ee.type,M=ee.labels;return F.filter(z=>{if(Q){let be=String(z.id||"").toLowerCase(),ve=String(z.title||"").toLowerCase();if(!be.includes(Q)&&!ve.includes(Q))return!1}if(w!==""&&String(z.priority)!==w||C!==""&&String(z.issue_type||"")!==C)return!1;if(M.length>0){let be=Array.isArray(z.labels)?z.labels:[];if(!M.some(ve=>be.includes(ve)))return!1}return!0})}function it(){let F=new Set;for(let Q of[x,L,D,V,K,U])for(let w of Q){let C=Array.isArray(w.labels)?w.labels:[];for(let M of C)typeof M=="string"&&M.length>0&&F.add(M)}return Array.from(F).sort()}function Ge(){return ee.search.trim()!==""||ee.priority!==""||ee.type!==""||ee.labels.length>0}function me(){try{if(y){let F=y.selectBoardColumn("tab:board:in-progress","in_progress",P),Q=y.selectBoardColumn("tab:board:blocked","blocked",P).filter(Oe),w=new Set(F.map(Se=>Se.id)),C=y.selectBoardColumn("tab:board:ready","ready",P).filter(Se=>st(Se)&&!w.has(Se.id)),M=y.selectBoardColumn("tab:board:resolved","resolved",P),z=y.selectBoardColumn("tab:board:deferred","deferred",P),be=y.selectBoardColumn("tab:board:closed","closed").slice(0,ep),ve=[...Q,...C,...F,...M,...be];Le(ve);let Z=new Set;for(let Se of ve)Se&&Se.id&&!Co(Se)&&Z.add(Se.id);let tt=!Ge();x=tt?hn(Q,Z):Q,L=tt?hn(C,Z):C,D=tt?hn(F,Z):F,V=tt?hn(M,Z):M,K=z,S=z.length,U=tt?hn(be,Z):be,k=new Map;for(let Se of x)k.set(Se.id,"open");for(let Se of L)k.set(Se.id,"open");for(let Se of D)k.set(Se.id,"in_progress");for(let Se of V)k.set(Se.id,"resolved");for(let Se of K)k.set(Se.id,"deferred");for(let Se of U)k.set(Se.id,"closed");j=new Map;for(let Se of x)j.set(Se.id,"blocked-col");for(let Se of L)j.set(Se.id,"ready-col");for(let Se of D)j.set(Se.id,"in-progress-col");for(let Se of V)j.set(Se.id,"resolved-col");for(let Se of U)j.set(Se.id,"closed-col")}O()}catch{x=[],L=[],D=[],V=[],K=[],U=[],oe=new Map,O()}}function Le(F){let Q=new Map;for(let C of F)C&&C.id&&!Q.has(C.id)&&Q.set(C.id,C);let w=new Map;for(let C of Q.values()){let M=Co(C);if(!M)continue;let z=w.get(M);z||(z=[],w.set(M,z)),z.push({id:C.id,title:C.title,status:C.status,metadata:C.metadata,workflow:C.workflow,created_at:C.created_at,updated_at:C.updated_at})}oe=w}function ue(F){let Q=oe.get(F)||[],w=0;for(let M of Q)(M.status==="resolved"||M.status==="closed")&&(w+=1);let C=fs(Q);return{total:Q.length,count:w,current:C,children:Q}}function we(F){return!ce.has(F)}function ye(F,Q){F.preventDefault(),F.stopPropagation(),ce.has(Q)?ce.delete(Q):ce.add(Q),O()}function qe(F,Q){F.preventDefault(),F.stopPropagation(),n(Q)}function he(F,Q){F.preventDefault(),F.stopPropagation(),n(Q)}function je(F,Q){Re||n(Q)}function We(F,Q){F.preventDefault(),F.stopPropagation(),sp(Q).then(w=>{w&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function ke(F,Q){Re=Q,F.dataTransfer&&(F.dataTransfer.setData("text/plain",Q),F.dataTransfer.effectAllowed="move"),F.target.classList.add("board-card--dragging")}function et(F){F.target.classList.remove("board-card--dragging"),ge(),setTimeout(()=>{Re=null},0)}function H(F){let Q=String(F.target.value||"");!Q||Q===_||(_=Q,u&&u(Q),O())}function q(){return i?i.get():null}function se(F){let Q=c?c.get():null,w=Q?Q.cleanup_failed:null;if(!w||typeof w!="object"||Array.isArray(w))return null;let C=w[F];return!C||typeof C!="object"||Array.isArray(C)?null:C}let Ie={onCardClick:je,onCopyId:We,onDragStart:ke,onDragEnd:et,onClosedRangeChange:H,rollupFor:ue,isExpanded:we,onRollupToggle:ye,onChildClick:qe,onFromChipClick:he,cleanupFailureFor:se,get policy(){return q()}};function De(F,Q){Re||(de(),n(Q))}function ze(F,Q){F.preventDefault(),F.stopPropagation(),de(),n(Q)}let $e={...Ie,onCardClick:De,onChildClick:ze,onFromChipClick:ze,get policy(){return q()}};function rt(F){let Q=F.target,w=e.querySelector(".board-filter__labels");Q&&w&&w.contains(Q)||J()}function Je(F){F.key==="Escape"&&J()}function W(){re||(re=!0,document.addEventListener("mousedown",rt),document.addEventListener("keydown",Je),O())}function J(){re&&(re=!1,document.removeEventListener("mousedown",rt),document.removeEventListener("keydown",Je),O())}function Te(F){F.key==="Escape"&&de()}function Fe(){I||(I=!0,document.addEventListener("keydown",Te),O())}function de(){I&&(I=!1,document.removeEventListener("keydown",Te),O())}let g={onClose:de,onOverlayClick(F){F.target===F.currentTarget&&de()}},v={onSearchInput(F){ee.search=String(F.target.value||""),me()},onPriorityChange(F){ee.priority=String(F.target.value||""),me()},onTypeChange(F){ee.type=String(F.target.value||""),me()},onSortChange(F){let Q=String(F.target.value||"");if(!(!Ji.has(Q)||Q===P)){P=Q;try{window.localStorage.setItem(Qi,Q)}catch{}me()}},onDeferredToggle(){I?de():Fe()},onLabelMenuToggle(){re?J():W()},onLabelToggle(F){let Q=ee.labels.indexOf(F);Q===-1?ee.labels.push(F):ee.labels.splice(Q,1),me()},onLabelClear(){ee.labels.length!==0&&(ee.labels=[],me())},onNewIssue(){f&&f()}};function A(){return d`
      <div class="board-view">
        ${Xi(ee,v,{sort_mode:P,deferred_popup_open:I,deferred_count:S,label_options:it(),label_menu_open:re})}
        <div class="board-root">
          ${Jr({title:"Blocked",id:"blocked-col",items:ot(x)},Ie)}
          ${Jr({title:"Ready",id:"ready-col",items:ot(L)},Ie)}
          ${Jr({title:"In progress",id:"in-progress-col",items:ot(D)},Ie)}
          ${Jr({title:"Resolved",id:"resolved-col",items:ot(V)},Ie)}
          ${Jr({title:"Closed",id:"closed-col",items:ot(U),is_closed:!0,closed_range:_},Ie)}
        </div>
        ${I?Zi({items:ot(K),count:S},$e,g):""}
      </div>
    `}function O(){Ke(A(),e),G()}function G(){try{let F=e.querySelector("#deferred-popup");F&&!F.open&&(typeof F.showModal=="function"?F.showModal():F.setAttribute("open",""));let Q=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let w of Q)Array.from(w.querySelectorAll(".board-card")).forEach((M,z)=>{M.tabIndex=z===0?0:-1})}catch{}}async function Y(F,Q){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:F,status:Q}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(w){r("update-status failed: %o",w),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ne(F){switch(F){case"blocked-col":return x;case"ready-col":return L;case"in-progress-col":return D;case"resolved-col":return V;default:return[]}}function te(F,Q,w){if(!o||!a)return;let C=ne(F),M=C.find(tt=>tt.id===Q);if(!M)return;let z=C.filter(tt=>tt.id!==Q),be=w.closest?w.closest(".board-card"):null,ve=z.length;if(be){let tt=be.getAttribute("data-issue-id");if(tt===Q)return;let Se=z.findIndex(_t=>_t.id===tt);Se>=0&&(ve=Se)}let Z=z.slice();Z.splice(ve,0,M),R.applyReorder(Q,Z,ve)}function ge(){for(let F of Array.from(e.querySelectorAll(".board-column--drag-over")))F.classList.remove("board-column--drag-over")}let Ae=null;e.addEventListener("dragover",F=>{F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move");let w=F.target.closest(".board-column");w&&w!==Ae&&(Ae&&Ae.classList.remove("board-column--drag-over"),w.classList.add("board-column--drag-over"),Ae=w)}),e.addEventListener("dragleave",F=>{let Q=F.relatedTarget;(!Q||!e.contains(Q))&&Ae&&(Ae.classList.remove("board-column--drag-over"),Ae=null)}),e.addEventListener("drop",F=>{F.preventDefault(),Ae&&(Ae.classList.remove("board-column--drag-over"),Ae=null);let Q=F.target,w=Q.closest(".board-column");if(!w)return;let C=F.dataTransfer?.getData("text/plain")||"";if(!C)return;let M=w.id,z=j.get(C);if(z&&z===M){if(rp.has(M)){if(P!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}te(M,C,Q)}return}let be=tp[M];if(!be){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}k.get(C)!==be&&Y(C,be)}),e.addEventListener("keydown",F=>{let Q=F.target;if(!(Q instanceof HTMLElement))return;let w=String(Q.tagName||"").toLowerCase();if(w==="input"||w==="textarea"||w==="select"||w==="button"||w==="a"||Q.isContentEditable===!0)return;let C=Q.closest(".board-card");if(!C)return;let M=String(F.key||"");if(M==="Enter"||M===" "){F.preventDefault();let Z=C.getAttribute("data-issue-id");Z&&n(Z);return}if(M!=="ArrowUp"&&M!=="ArrowDown"&&M!=="ArrowLeft"&&M!=="ArrowRight")return;F.preventDefault();let z=C.closest(".board-column");if(!z)return;let be=Array.from(z.querySelectorAll(".board-card")),ve=be.indexOf(C);if(M==="ArrowDown"&&ve<be.length-1){Me(C,be[ve+1]);return}if(M==="ArrowUp"&&ve>0){Me(C,be[ve-1]);return}if(M==="ArrowLeft"||M==="ArrowRight"){let Z=Array.from(e.querySelectorAll(".board-column")),tt=Z.indexOf(z),Se=M==="ArrowRight"?1:-1,_t=tt+Se;for(;_t>=0&&_t<Z.length;){let He=Z[_t].querySelector(".board-card");if(He){Me(C,He);return}_t+=Se}}});function Me(F,Q){try{F.tabIndex=-1,Q.tabIndex=0,Q.focus()}catch{}}let Ne=null;y&&y.subscribe&&(Ne=y.subscribe(()=>{try{me()}catch{}}));let Be=null;i&&i.subscribe&&(Be=i.subscribe(()=>{try{me()}catch{}}));let Xe=null;return c&&c.subscribe&&(Xe=c.subscribe(()=>{O()})),{async load(){r("load"),me()},clear(){J(),de(),Ne&&(Ne(),Ne=null),Be&&(Be(),Be=null),Xe&&(Xe(),Xe=null),e.replaceChildren(),x=[],L=[],D=[],V=[],K=[],U=[],k=new Map,j=new Map}}}function Co(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function hn(e,t){return e.filter(r=>{let n=Co(r);return!(n&&t.has(n))})}async function sp(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Xt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function or(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Ar(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function op(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${or(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${or(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function fr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await op(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var ap=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],tl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},ip=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function At(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function bt(e){return typeof e=="string"&&e.length>0?e:null}function vs(e){return e.startsWith("gpt-")?e.slice(4):e}function gt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function ol(e,t,r){let n=bt(t[e]);if(n!==null)return{value:n,source:"pin"};let s=bt(r[e]);return s===null?null:{value:s,source:"global"}}function yn(e,t,r,n){return ol(e,t,r)||{value:n,source:"base"}}function rl(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&At(s?.[t])){let a=bt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&At(s)){for(let a of Object.values(s))if(At(a)){let i=bt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return bt(n?.runners?.[o]?.models?.[e]?.id)||e}function lp(e,t){return bt(t?.review?.reviewers?.[e]?.model)||e}function vn(e,t,r=!1){if(e==="default")return gt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?vs(e):e;return gt(e,t,n,e,"explicit")}function cp(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];At(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(At(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function nl(e){return gt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function sl(e,t,r){let n=ol(e,t,r);return n?vn(n.value,n.source):gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function en(e){let t=At(e.pin)?e.pin:{},r=At(e.global)?e.global:{},n=At(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&At(n.session)?n.session:null,o=n?.supported===!0&&At(n.orchestration)?n.orchestration:null,a=At(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let c=yn("workflow_mode",t,r,bt(s.workflow_mode_default));i.workflow_mode=c.source==="base"?gt(c.value,"base",c.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",c.value,"default"):vn(c.value,c.source);for(let x of["spec_review","plan_review","impl_review"]){let L=`${x}_model`,D=bt(x==="plan_review"?c.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),V=yn(L,t,r,D);if(V.value===null)i[L]=gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(V.value!=="self"&&V.value!=="skip"&&!At(s.review?.reviewers?.[V.value]))i[L]=nl(gt(V.value,V.source,"",null,"explicit"));else{let K=lp(V.value,s);i[L]=gt(V.value,V.source,vs(K),K,V.source==="base"?"default":"explicit")}}for(let[x,L]of Object.entries(tl)){let D=i[L].value;if(D==="self"||D==="skip"){i[x]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let V=bt(s.review?.reviewers?.[D||""]?.effort),K=yn(x,t,r,V);i[x]=K.value===null?gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):gt(K.value,K.source,K.value,K.value,K.source==="base"?"default":"explicit")}let u=At(s.implementation?.default)?s.implementation.default:{},f=bt(e.route),_=f!==null&&["quick_fix","spec_backed","full_plan"].includes(f),y=At(s.implementation?.route_defaults)?s.implementation.route_defaults:{},R=_&&At(y[f])?y[f]:{};for(let x of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let L=yn(x,t,r,x==="impl_dispatch"?bt(R.dispatch)||bt(u.dispatch):bt(u[x.replace("impl_","")]));i[x]=L.value===null?gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):gt(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let x of["impl_runtime","impl_model","impl_effort","impl_speed"])i[x]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let x=i.impl_runtime.value==="inherit"?bt(e.controller_runtime):i.impl_runtime.value,L=x?cp(x,s,a):[];if(i.impl_model.value!=="auto"&&L.length>0&&!L.includes(i.impl_model.value))i.impl_model=nl(i.impl_model);else{let D=rl(i.impl_model.value,x,s,a);i.impl_model.display=vs(D),i.impl_model.full_value=D}}if(i.impl_effort.value==="auto"){let x=bt(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),L=x?bt(s.implementation?.effort_by_transport?.[x]?.auto):null;L&&!ip.has(L)?(i.impl_effort.display=`${L} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=L,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?gt("default","base","default (\uC77C\uBC18)","default","default"):vn("default",i.impl_speed.source))}}else for(let c of ap.filter(u=>!u.startsWith("orchestration_")))i[c]=sl(c,t,r);if(!s){for(let[c,u]of Object.entries(tl))(i[u].value==="self"||i[u].value==="skip")&&(i[c]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let c of["impl_runtime","impl_model","impl_effort","impl_speed"])i[c]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let c of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[c]=sl(c,t,r);continue}let u=c.replace("orchestration_",""),f=bt(o[u]),_=yn(c,t,r,f);if(c==="orchestration_effort"&&_.source==="base"){i[c]=gt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(_.value===null){i[c]=gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(c==="orchestration_model"){let y=_.source==="base"?bt(o.model_id)||_.value:rl(_.value,null,s,a);i[c]=gt(_.value,_.source,vs(y),y,_.source==="base"?"default":"explicit");continue}if(_.value==="default"){i[c]=_.source==="base"?gt("default","base","default (\uC77C\uBC18)","default","default"):vn("default",_.source);continue}i[c]=vn(_.value,_.source)}return i}function dp(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function ws(e){let t=At(e.pin)?e.pin:{},r=At(e.global)?e.global:{},n=f=>en({pin:e.layer==="pin"?f:t,global:e.layer==="pin"?r:f,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,controller_runtime:e.controller_runtime}),s=e.layer==="pin"?t:r,o={...s};delete o[e.key];let a=n(o)[e.key],i=n(s)[e.key],c=bt(s[e.key]),u=[...e.choices];return c!==null&&!u.includes(c)&&u.unshift(c),{unset_label:dp(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:i?.resolution==="not_applicable",options:u.map(f=>{let _=n({...s,[e.key]:f})[e.key];return{value:f,label:_.display,full_value:_.full_value}})}}function tn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let c=!1,u=_=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},f=()=>u(n.value.trim());o.addEventListener("click",f),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),f())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var dl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function wt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var _r=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],wn=[..._r,"reasoning_output_tokens"],up=["implementation","review-consult"];function Ro(e){let t=0;for(let r of _r)t+=wt(e?.[r]);return t}function pp(e){return!e||typeof e!="object"?!1:_r.some(t=>Number.isFinite(e[t]))}function al(e){return!e||typeof e!="object"?!1:wn.some(t=>Number.isFinite(e[t]))}function fp(e){let t={};for(let r of wn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function il(e){let t={};for(let r of wn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ll(e,t){return e==="codex"?wt(t.input_tokens)+wt(t.output_tokens):Ro(t)}function _p(e){return e==="claude"?"Claude":"Codex"}function mp(e){return`\u03C4 ${ul(e)}`}function gp(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${wt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${wt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${wt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${wt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${wt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${wt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${wt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(dl),o.join(`
`)}function kt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${_p(r)} ${mp(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:gp(r,n)})}return t}function $s(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of wn)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=wt(i.breakdown[c])+wt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Io(e){return!e||typeof e!="object"?null:Bt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function bp(e){return e==="codex"?"codex":"claude"}function Sr(){return{subtotal:0,breakdown:fp(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function ks(e,t,r){e.subtotal+=t.subtotal;for(let n of wn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=wt(e.breakdown[n])+wt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function cl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ul(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function rn(e){return pp(e)?`\u03C4 ${ul(Ro(e))}`:null}function Qt(e){let t=rn(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function nn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${wt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${wt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${wt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${wt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Ro(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(dl),r.join(`
`)}function Bt(e,t){let r={claude:Sr(),codex:Sr()},n={orchestrator:{claude:Sr(),codex:Sr()},implementation:{claude:Sr(),codex:Sr()},"review-consult":{claude:Sr(),codex:Sr()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(al(c)){let f=bp(i.runner),_=il(c),y={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:ll(f,_)};_.replayed===!0&&(y.replayed=!0),typeof i.model=="string"&&(y.model=i.model),typeof i.session_id=="string"&&(y.session_id=i.session_id),ks(r[f],y,!0),ks(n.orchestrator[f],y,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!up.includes(f.role)||!al(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let y=il(f.usage),R={provider:"codex",role:f.role,attempt_id:String(i.attempt_id||""),usage:y,subtotal:ll("codex",y)};R.receipt_id=_,typeof f.model=="string"&&(R.model=f.model),typeof f.effort=="string"&&f.effort.trim().length>0&&(R.effort=f.effort),typeof f.session_id=="string"?R.session_id=f.session_id:typeof f.thread_id=="string"&&(R.session_id=f.thread_id),typeof f.turn_id=="string"&&(R.turn_id=f.turn_id),typeof f.completed_at=="string"&&(R.completed_at=f.completed_at),y.replayed===!0&&(R.replayed=!0),ks(r.codex,R,!1),ks(n[R.role].codex,R,!1)}}let o={};for(let i of["claude","codex"]){let c=r[i];if(c.legs.length===0)continue;let u=cl(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[i][u];f.legs.length>0&&(c[u]={...cl(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:vl,setPrototypeOf:pl,isFrozen:hp,getPrototypeOf:yp,getOwnPropertyDescriptor:vp}=Object,{freeze:Ct,seal:Ut,create:qo}=Object,{apply:Fo,construct:jo}=typeof Reflect<"u"&&Reflect;Ct||(Ct=function(t){return t});Ut||(Ut=function(t){return t});Fo||(Fo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});jo||(jo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var xs=Rt(Array.prototype.forEach),wp=Rt(Array.prototype.lastIndexOf),fl=Rt(Array.prototype.pop),kn=Rt(Array.prototype.push),kp=Rt(Array.prototype.splice),Ss=Rt(String.prototype.toLowerCase),Lo=Rt(String.prototype.toString),Oo=Rt(String.prototype.match),$n=Rt(String.prototype.replace),$p=Rt(String.prototype.indexOf),xp=Rt(String.prototype.trim),Jt=Rt(Object.prototype.hasOwnProperty),Tt=Rt(RegExp.prototype.test),xn=Ap(TypeError);function Rt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Fo(e,t,n)}}function Ap(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return jo(e,r)}}function Ze(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ss;pl&&pl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(hp(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Sp(e){for(let t=0;t<e.length;t++)Jt(e,t)||(e[t]=null);return e}function mr(e){let t=qo(null);for(let[r,n]of vl(e))Jt(e,r)&&(Array.isArray(n)?t[r]=Sp(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=mr(n):t[r]=n);return t}function An(e,t){for(;e!==null;){let n=vp(e,t);if(n){if(n.get)return Rt(n.get);if(typeof n.value=="function")return Rt(n.value)}e=yp(e)}function r(){return null}return r}var _l=Ct(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Mo=Ct(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Po=Ct(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ep=Ct(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Do=Ct(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Tp=Ct(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ml=Ct(["#text"]),gl=Ct(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),No=Ct(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),bl=Ct(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),As=Ct(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Cp=Ut(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Rp=Ut(/<%[\w\W]*|[\w\W]*%>/gm),Ip=Ut(/\$\{[\w\W]*/gm),Lp=Ut(/^data-[\-\w.\u00B7-\uFFFF]+$/),Op=Ut(/^aria-[\-\w]+$/),wl=Ut(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Mp=Ut(/^(?:\w+script|data):/i),Pp=Ut(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),kl=Ut(/^html$/i),Dp=Ut(/^[a-z][.\w]*(-[.\w]+)+$/i),hl=Object.freeze({__proto__:null,ARIA_ATTR:Op,ATTR_WHITESPACE:Pp,CUSTOM_ELEMENT:Dp,DATA_ATTR:Lp,DOCTYPE_NAME:kl,ERB_EXPR:Rp,IS_ALLOWED_URI:wl,IS_SCRIPT_OR_DATA:Mp,MUSTACHE_EXPR:Cp,TMPLIT_EXPR:Ip}),Sn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Np=function(){return typeof window>"u"?null:window},qp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},yl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function $l(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Np(),t=fe=>$l(fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Sn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:y,trustedTypes:R}=e,x=c.prototype,L=An(x,"cloneNode"),D=An(x,"remove"),V=An(x,"nextSibling"),K=An(x,"childNodes"),U=An(x,"parentNode");if(typeof a=="function"){let fe=r.createElement("template");fe.content&&fe.content.ownerDocument&&(r=fe.content.ownerDocument)}let I,S="",{implementation:P,createNodeIterator:k,createDocumentFragment:j,getElementsByTagName:oe}=r,{importNode:ce}=n,ee=yl();t.isSupported=typeof vl=="function"&&typeof U=="function"&&P&&P.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:re,ERB_EXPR:Re,TMPLIT_EXPR:st,DATA_ATTR:Oe,ARIA_ATTR:ot,IS_SCRIPT_OR_DATA:it,ATTR_WHITESPACE:Ge,CUSTOM_ELEMENT:me}=hl,{IS_ALLOWED_URI:Le}=hl,ue=null,we=Ze({},[..._l,...Mo,...Po,...Do,...ml]),ye=null,qe=Ze({},[...gl,...No,...bl,...As]),he=Object.seal(qo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,We=null,ke=Object.seal(qo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),et=!0,H=!0,q=!1,se=!0,Ie=!1,De=!0,ze=!1,$e=!1,rt=!1,Je=!1,W=!1,J=!1,Te=!0,Fe=!1,de="user-content-",g=!0,v=!1,A={},O=null,G=Ze({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Y=null,ne=Ze({},["audio","video","img","source","image","track"]),te=null,ge=Ze({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ae="http://www.w3.org/1998/Math/MathML",Me="http://www.w3.org/2000/svg",Ne="http://www.w3.org/1999/xhtml",Be=Ne,Xe=!1,F=null,Q=Ze({},[Ae,Me,Ne],Lo),w=Ze({},["mi","mo","mn","ms","mtext"]),C=Ze({},["annotation-xml"]),M=Ze({},["title","style","font","a","script"]),z=null,be=["application/xhtml+xml","text/html"],ve="text/html",Z=null,tt=null,Se=r.createElement("form"),_t=function(l){return l instanceof RegExp||l instanceof Function},He=function(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(tt&&tt===l)){if((!l||typeof l!="object")&&(l={}),l=mr(l),z=be.indexOf(l.PARSER_MEDIA_TYPE)===-1?ve:l.PARSER_MEDIA_TYPE,Z=z==="application/xhtml+xml"?Lo:Ss,ue=Jt(l,"ALLOWED_TAGS")?Ze({},l.ALLOWED_TAGS,Z):we,ye=Jt(l,"ALLOWED_ATTR")?Ze({},l.ALLOWED_ATTR,Z):qe,F=Jt(l,"ALLOWED_NAMESPACES")?Ze({},l.ALLOWED_NAMESPACES,Lo):Q,te=Jt(l,"ADD_URI_SAFE_ATTR")?Ze(mr(ge),l.ADD_URI_SAFE_ATTR,Z):ge,Y=Jt(l,"ADD_DATA_URI_TAGS")?Ze(mr(ne),l.ADD_DATA_URI_TAGS,Z):ne,O=Jt(l,"FORBID_CONTENTS")?Ze({},l.FORBID_CONTENTS,Z):G,je=Jt(l,"FORBID_TAGS")?Ze({},l.FORBID_TAGS,Z):mr({}),We=Jt(l,"FORBID_ATTR")?Ze({},l.FORBID_ATTR,Z):mr({}),A=Jt(l,"USE_PROFILES")?l.USE_PROFILES:!1,et=l.ALLOW_ARIA_ATTR!==!1,H=l.ALLOW_DATA_ATTR!==!1,q=l.ALLOW_UNKNOWN_PROTOCOLS||!1,se=l.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ie=l.SAFE_FOR_TEMPLATES||!1,De=l.SAFE_FOR_XML!==!1,ze=l.WHOLE_DOCUMENT||!1,Je=l.RETURN_DOM||!1,W=l.RETURN_DOM_FRAGMENT||!1,J=l.RETURN_TRUSTED_TYPE||!1,rt=l.FORCE_BODY||!1,Te=l.SANITIZE_DOM!==!1,Fe=l.SANITIZE_NAMED_PROPS||!1,g=l.KEEP_CONTENT!==!1,v=l.IN_PLACE||!1,Le=l.ALLOWED_URI_REGEXP||wl,Be=l.NAMESPACE||Ne,w=l.MATHML_TEXT_INTEGRATION_POINTS||w,C=l.HTML_INTEGRATION_POINTS||C,he=l.CUSTOM_ELEMENT_HANDLING||{},l.CUSTOM_ELEMENT_HANDLING&&_t(l.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=l.CUSTOM_ELEMENT_HANDLING.tagNameCheck),l.CUSTOM_ELEMENT_HANDLING&&_t(l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),l.CUSTOM_ELEMENT_HANDLING&&typeof l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ie&&(H=!1),W&&(Je=!0),A&&(ue=Ze({},ml),ye=[],A.html===!0&&(Ze(ue,_l),Ze(ye,gl)),A.svg===!0&&(Ze(ue,Mo),Ze(ye,No),Ze(ye,As)),A.svgFilters===!0&&(Ze(ue,Po),Ze(ye,No),Ze(ye,As)),A.mathMl===!0&&(Ze(ue,Do),Ze(ye,bl),Ze(ye,As))),l.ADD_TAGS&&(typeof l.ADD_TAGS=="function"?ke.tagCheck=l.ADD_TAGS:(ue===we&&(ue=mr(ue)),Ze(ue,l.ADD_TAGS,Z))),l.ADD_ATTR&&(typeof l.ADD_ATTR=="function"?ke.attributeCheck=l.ADD_ATTR:(ye===qe&&(ye=mr(ye)),Ze(ye,l.ADD_ATTR,Z))),l.ADD_URI_SAFE_ATTR&&Ze(te,l.ADD_URI_SAFE_ATTR,Z),l.FORBID_CONTENTS&&(O===G&&(O=mr(O)),Ze(O,l.FORBID_CONTENTS,Z)),g&&(ue["#text"]=!0),ze&&Ze(ue,["html","head","body"]),ue.table&&(Ze(ue,["tbody"]),delete je.tbody),l.TRUSTED_TYPES_POLICY){if(typeof l.TRUSTED_TYPES_POLICY.createHTML!="function")throw xn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof l.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw xn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=l.TRUSTED_TYPES_POLICY,S=I.createHTML("")}else I===void 0&&(I=qp(R,s)),I!==null&&typeof S=="string"&&(S=I.createHTML(""));Ct&&Ct(l),tt=l}},ht=Ze({},[...Mo,...Po,...Ep]),qt=Ze({},[...Do,...Tp]),cr=function(l){let m=U(l);(!m||!m.tagName)&&(m={namespaceURI:Be,tagName:"template"});let T=Ss(l.tagName),B=Ss(m.tagName);return F[l.namespaceURI]?l.namespaceURI===Me?m.namespaceURI===Ne?T==="svg":m.namespaceURI===Ae?T==="svg"&&(B==="annotation-xml"||w[B]):!!ht[T]:l.namespaceURI===Ae?m.namespaceURI===Ne?T==="math":m.namespaceURI===Me?T==="math"&&C[B]:!!qt[T]:l.namespaceURI===Ne?m.namespaceURI===Me&&!C[B]||m.namespaceURI===Ae&&!w[B]?!1:!qt[T]&&(M[T]||!ht[T]):!!(z==="application/xhtml+xml"&&F[l.namespaceURI]):!1},xt=function(l){kn(t.removed,{element:l});try{U(l).removeChild(l)}catch{D(l)}},St=function(l,m){try{kn(t.removed,{attribute:m.getAttributeNode(l),from:m})}catch{kn(t.removed,{attribute:null,from:m})}if(m.removeAttribute(l),l==="is")if(Je||W)try{xt(m)}catch{}else try{m.setAttribute(l,"")}catch{}},dr=function(l){let m=null,T=null;if(rt)l="<remove></remove>"+l;else{let _e=Oo(l,/^[\r\n\t ]+/);T=_e&&_e[0]}z==="application/xhtml+xml"&&Be===Ne&&(l='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+l+"</body></html>");let B=I?I.createHTML(l):l;if(Be===Ne)try{m=new y().parseFromString(B,z)}catch{}if(!m||!m.documentElement){m=P.createDocument(Be,"template",null);try{m.documentElement.innerHTML=Xe?S:B}catch{}}let ae=m.body||m.documentElement;return l&&T&&ae.insertBefore(r.createTextNode(T),ae.childNodes[0]||null),Be===Ne?oe.call(m,ze?"html":"body")[0]:ze?m.documentElement:ae},ur=function(l){return k.call(l.ownerDocument||l,l,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Wt=function(l){return l instanceof _&&(typeof l.nodeName!="string"||typeof l.textContent!="string"||typeof l.removeChild!="function"||!(l.attributes instanceof f)||typeof l.removeAttribute!="function"||typeof l.setAttribute!="function"||typeof l.namespaceURI!="string"||typeof l.insertBefore!="function"||typeof l.hasChildNodes!="function")},zt=function(l){return typeof i=="function"&&l instanceof i};function yt(fe,l,m){xs(fe,T=>{T.call(t,l,m,tt)})}let nr=function(l){let m=null;if(yt(ee.beforeSanitizeElements,l,null),Wt(l))return xt(l),!0;let T=Z(l.nodeName);if(yt(ee.uponSanitizeElement,l,{tagName:T,allowedTags:ue}),De&&l.hasChildNodes()&&!zt(l.firstElementChild)&&Tt(/<[/\w!]/g,l.innerHTML)&&Tt(/<[/\w!]/g,l.textContent)||l.nodeType===Sn.progressingInstruction||De&&l.nodeType===Sn.comment&&Tt(/<[/\w]/g,l.data))return xt(l),!0;if(!(ke.tagCheck instanceof Function&&ke.tagCheck(T))&&(!ue[T]||je[T])){if(!je[T]&&Lt(T)&&(he.tagNameCheck instanceof RegExp&&Tt(he.tagNameCheck,T)||he.tagNameCheck instanceof Function&&he.tagNameCheck(T)))return!1;if(g&&!O[T]){let B=U(l)||l.parentNode,ae=K(l)||l.childNodes;if(ae&&B){let _e=ae.length;for(let pe=_e-1;pe>=0;--pe){let Ve=L(ae[pe],!0);Ve.__removalCount=(l.__removalCount||0)+1,B.insertBefore(Ve,V(l))}}}return xt(l),!0}return l instanceof c&&!cr(l)||(T==="noscript"||T==="noembed"||T==="noframes")&&Tt(/<\/no(script|embed|frames)/i,l.innerHTML)?(xt(l),!0):(Ie&&l.nodeType===Sn.text&&(m=l.textContent,xs([re,Re,st],B=>{m=$n(m,B," ")}),l.textContent!==m&&(kn(t.removed,{element:l.cloneNode()}),l.textContent=m)),yt(ee.afterSanitizeElements,l,null),!1)},Qe=function(l,m,T){if(Te&&(m==="id"||m==="name")&&(T in r||T in Se))return!1;if(!(H&&!We[m]&&Tt(Oe,m))){if(!(et&&Tt(ot,m))){if(!(ke.attributeCheck instanceof Function&&ke.attributeCheck(m,l))){if(!ye[m]||We[m]){if(!(Lt(l)&&(he.tagNameCheck instanceof RegExp&&Tt(he.tagNameCheck,l)||he.tagNameCheck instanceof Function&&he.tagNameCheck(l))&&(he.attributeNameCheck instanceof RegExp&&Tt(he.attributeNameCheck,m)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(m,l))||m==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&Tt(he.tagNameCheck,T)||he.tagNameCheck instanceof Function&&he.tagNameCheck(T))))return!1}else if(!te[m]){if(!Tt(Le,$n(T,Ge,""))){if(!((m==="src"||m==="xlink:href"||m==="href")&&l!=="script"&&$p(T,"data:")===0&&Y[l])){if(!(q&&!Tt(it,$n(T,Ge,"")))){if(T)return!1}}}}}}}return!0},Lt=function(l){return l!=="annotation-xml"&&Oo(l,me)},wr=function(l){yt(ee.beforeSanitizeAttributes,l,null);let{attributes:m}=l;if(!m||Wt(l))return;let T={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ye,forceKeepAttr:void 0},B=m.length;for(;B--;){let ae=m[B],{name:_e,namespaceURI:pe,value:Ve}=ae,b=Z(_e),p=Ve,E=_e==="value"?p:xp(p);if(T.attrName=b,T.attrValue=E,T.keepAttr=!0,T.forceKeepAttr=void 0,yt(ee.uponSanitizeAttribute,l,T),E=T.attrValue,Fe&&(b==="id"||b==="name")&&(St(_e,l),E=de+E),De&&Tt(/((--!?|])>)|<\/(style|title|textarea)/i,E)){St(_e,l);continue}if(b==="attributename"&&Oo(E,"href")){St(_e,l);continue}if(T.forceKeepAttr)continue;if(!T.keepAttr){St(_e,l);continue}if(!se&&Tt(/\/>/i,E)){St(_e,l);continue}Ie&&xs([re,Re,st],X=>{E=$n(E,X," ")});let $=Z(l.nodeName);if(!Qe($,b,E)){St(_e,l);continue}if(I&&typeof R=="object"&&typeof R.getAttributeType=="function"&&!pe)switch(R.getAttributeType($,b)){case"TrustedHTML":{E=I.createHTML(E);break}case"TrustedScriptURL":{E=I.createScriptURL(E);break}}if(E!==p)try{pe?l.setAttributeNS(pe,_e,E):l.setAttribute(_e,E),Wt(l)?xt(l):fl(t.removed)}catch{St(_e,l)}}yt(ee.afterSanitizeAttributes,l,null)},Ht=function fe(l){let m=null,T=ur(l);for(yt(ee.beforeSanitizeShadowDOM,l,null);m=T.nextNode();)yt(ee.uponSanitizeShadowNode,m,null),nr(m),wr(m),m.content instanceof o&&fe(m.content);yt(ee.afterSanitizeShadowDOM,l,null)};return t.sanitize=function(fe){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},m=null,T=null,B=null,ae=null;if(Xe=!fe,Xe&&(fe="<!-->"),typeof fe!="string"&&!zt(fe))if(typeof fe.toString=="function"){if(fe=fe.toString(),typeof fe!="string")throw xn("dirty is not a string, aborting")}else throw xn("toString is not a function");if(!t.isSupported)return fe;if($e||He(l),t.removed=[],typeof fe=="string"&&(v=!1),v){if(fe.nodeName){let Ve=Z(fe.nodeName);if(!ue[Ve]||je[Ve])throw xn("root node is forbidden and cannot be sanitized in-place")}}else if(fe instanceof i)m=dr("<!---->"),T=m.ownerDocument.importNode(fe,!0),T.nodeType===Sn.element&&T.nodeName==="BODY"||T.nodeName==="HTML"?m=T:m.appendChild(T);else{if(!Je&&!Ie&&!ze&&fe.indexOf("<")===-1)return I&&J?I.createHTML(fe):fe;if(m=dr(fe),!m)return Je?null:J?S:""}m&&rt&&xt(m.firstChild);let _e=ur(v?fe:m);for(;B=_e.nextNode();)nr(B),wr(B),B.content instanceof o&&Ht(B.content);if(v)return fe;if(Je){if(W)for(ae=j.call(m.ownerDocument);m.firstChild;)ae.appendChild(m.firstChild);else ae=m;return(ye.shadowroot||ye.shadowrootmode)&&(ae=ce.call(n,ae,!0)),ae}let pe=ze?m.outerHTML:m.innerHTML;return ze&&ue["!doctype"]&&m.ownerDocument&&m.ownerDocument.doctype&&m.ownerDocument.doctype.name&&Tt(kl,m.ownerDocument.doctype.name)&&(pe="<!DOCTYPE "+m.ownerDocument.doctype.name+`>
`+pe),Ie&&xs([re,Re,st],Ve=>{pe=$n(pe,Ve," ")}),I&&J?I.createHTML(pe):pe},t.setConfig=function(){let fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};He(fe),$e=!0},t.clearConfig=function(){tt=null,$e=!1},t.isValidAttribute=function(fe,l,m){tt||He({});let T=Z(fe),B=Z(l);return Qe(T,B,m)},t.addHook=function(fe,l){typeof l=="function"&&kn(ee[fe],l)},t.removeHook=function(fe,l){if(l!==void 0){let m=wp(ee[fe],l);return m===-1?void 0:kp(ee[fe],m,1)[0]}return fl(ee[fe])},t.removeHooks=function(fe){ee[fe]=[]},t.removeAllHooks=function(){ee=yl()},t}var xl=$l();var gr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Es=e=>(...t)=>({_$litDirective$:e,values:t}),sn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var En=class extends sn{constructor(t){if(super(t),this.it=mt,t.type!==gr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===mt||t==null)return this._t=void 0,this.it=t;if(t===Ft)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};En.directiveName="unsafeHTML",En.resultType=1;var Al=Es(En);function zo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var jr=zo();function Ll(e){jr=e}var In={exec:()=>null};function nt(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(It.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Fp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),It={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},jp=/^(?:[ \t]*(?:\n|$))+/,Bp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Up=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ln=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Wp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ho=/(?:[*+-]|\d{1,9}[.)])/,Ol=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ml=nt(Ol).replace(/bull/g,Ho).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),zp=nt(Ol).replace(/bull/g,Ho).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Go=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Hp=/^[^\n]+/,Vo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Gp=nt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Vo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Vp=nt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ho).getRegex(),Os="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ko=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Kp=nt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ko).replace("tag",Os).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Pl=nt(Go).replace("hr",Ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Os).getRegex(),Yp=nt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Pl).getRegex(),Yo={blockquote:Yp,code:Bp,def:Gp,fences:Up,heading:Wp,hr:Ln,html:Kp,lheading:Ml,list:Vp,newline:jp,paragraph:Pl,table:In,text:Hp},Sl=nt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Os).getRegex(),Zp={...Yo,lheading:zp,table:Sl,paragraph:nt(Go).replace("hr",Ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Sl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Os).getRegex()},Xp={...Yo,html:nt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ko).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:In,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:nt(Go).replace("hr",Ln).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ml).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Qp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Jp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Dl=/^( {2,}|\\)\n(?!\s*$)/,ef=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ms=/[\p{P}\p{S}]/u,Zo=/[\s\p{P}\p{S}]/u,Nl=/[^\s\p{P}\p{S}]/u,tf=nt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Zo).getRegex(),ql=/(?!~)[\p{P}\p{S}]/u,rf=/(?!~)[\s\p{P}\p{S}]/u,nf=/(?:[^\s\p{P}\p{S}]|~)/u,sf=nt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Fp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Fl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,of=nt(Fl,"u").replace(/punct/g,Ms).getRegex(),af=nt(Fl,"u").replace(/punct/g,ql).getRegex(),jl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",lf=nt(jl,"gu").replace(/notPunctSpace/g,Nl).replace(/punctSpace/g,Zo).replace(/punct/g,Ms).getRegex(),cf=nt(jl,"gu").replace(/notPunctSpace/g,nf).replace(/punctSpace/g,rf).replace(/punct/g,ql).getRegex(),df=nt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Nl).replace(/punctSpace/g,Zo).replace(/punct/g,Ms).getRegex(),uf=nt(/\\(punct)/,"gu").replace(/punct/g,Ms).getRegex(),pf=nt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ff=nt(Ko).replace("(?:-->|$)","-->").getRegex(),_f=nt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ff).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Rs=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,mf=nt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Rs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Bl=nt(/^!?\[(label)\]\[(ref)\]/).replace("label",Rs).replace("ref",Vo).getRegex(),Ul=nt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Vo).getRegex(),gf=nt("reflink|nolink(?!\\()","g").replace("reflink",Bl).replace("nolink",Ul).getRegex(),El=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Xo={_backpedal:In,anyPunctuation:uf,autolink:pf,blockSkip:sf,br:Dl,code:Jp,del:In,emStrongLDelim:of,emStrongRDelimAst:lf,emStrongRDelimUnd:df,escape:Qp,link:mf,nolink:Ul,punctuation:tf,reflink:Bl,reflinkSearch:gf,tag:_f,text:ef,url:In},bf={...Xo,link:nt(/^!?\[(label)\]\((.*?)\)/).replace("label",Rs).getRegex(),reflink:nt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Rs).getRegex()},Bo={...Xo,emStrongRDelimAst:cf,emStrongLDelim:af,url:nt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",El).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:nt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",El).getRegex()},hf={...Bo,br:nt(Dl).replace("{2,}","*").getRegex(),text:nt(Bo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ts={normal:Yo,gfm:Zp,pedantic:Xp},Tn={normal:Xo,gfm:Bo,breaks:hf,pedantic:bf},yf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Tl=e=>yf[e];function br(e,t){if(t){if(It.escapeTest.test(e))return e.replace(It.escapeReplace,Tl)}else if(It.escapeTestNoEncode.test(e))return e.replace(It.escapeReplaceNoEncode,Tl);return e}function Cl(e){try{e=encodeURI(e).replace(It.percentDecode,"%")}catch{return null}return e}function Rl(e,t){let r=e.replace(It.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(It.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(It.slashPipe,"|");return n}function Cn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function vf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Il(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,c}function wf(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Is=class{constructor(e){lt(this,"options");lt(this,"rules");lt(this,"lexer");this.options=e||jr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Cn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=wf(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Cn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Cn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Cn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))i.push(r[c]),a=!0;else if(!a)i.push(r[c]);else break;r=r.slice(c);let u=i.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let R=y,x=R.raw+`
`+r.join(`
`),L=this.blockquote(x);o[o.length-1]=L,n=n.substring(0,n.length-R.raw.length)+L.raw,s=s.substring(0,s.length-R.text.length)+L.text;break}else if(y?.type==="list"){let R=y,x=R.raw+`
`+r.join(`
`),L=this.list(x);o[o.length-1]=L,n=n.substring(0,n.length-y.raw.length)+L.raw,s=s.substring(0,s.length-R.raw.length)+L.raw,r=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),y=e.split(`
`,1)[0],R=!_.trim(),x=0;if(this.options.pedantic?(x=2,f=_.trimStart()):R?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,f=_.slice(x),x+=t[1].length),R&&this.rules.other.blankLine.test(y)&&(u+=y+`
`,e=e.substring(y.length+1),c=!0),!c){let L=this.rules.other.nextBulletRegex(x),D=this.rules.other.hrRegex(x),V=this.rules.other.fencesBeginRegex(x),K=this.rules.other.headingBeginRegex(x),U=this.rules.other.htmlBeginRegex(x);for(;e;){let I=e.split(`
`,1)[0],S;if(y=I,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),S=y):S=y.replace(this.rules.other.tabCharGlobal,"    "),V.test(y)||K.test(y)||U.test(y)||L.test(y)||D.test(y))break;if(S.search(this.rules.other.nonSpaceChar)>=x||!y.trim())f+=`
`+S.slice(x);else{if(R||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(_)||K.test(_)||D.test(_))break;f+=`
`+y}!R&&!y.trim()&&(R=!0),u+=I+`
`,e=e.substring(I.length+1),_=S.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(_=>_.type==="space"),f=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Rl(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Rl(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Cn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=vf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Il(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Il(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let R=_.slice(1,-1);return{type:"em",raw:_,text:R,tokens:this.lexer.inlineTokens(R)}}let y=_.slice(2,-2);return{type:"strong",raw:_,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},er=class Uo{constructor(t){lt(this,"tokens");lt(this,"options");lt(this,"state");lt(this,"inlineQueue");lt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||jr,this.options.tokenizer=this.options.tokenizer||new Is,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:It,block:Ts.normal,inline:Tn.normal};this.options.pedantic?(r.block=Ts.pedantic,r.inline=Tn.pedantic):this.options.gfm&&(r.block=Ts.gfm,this.options.breaks?r.inline=Tn.breaks:r.inline=Tn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Ts,inline:Tn}}static lex(t,r){return new Uo(r).lex(t)}static lexInline(t,r){return new Uo(r).inlineTokens(t)}lex(t){t=t.replace(It.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(It.tabCharGlobal,"    ").replace(It.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},i),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,i)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),y;this.options.extensions.startInline.forEach(R=>{y=R.call({lexer:this},_),typeof y=="number"&&y>=0&&(f=Math.min(f,y))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Ls=class{constructor(e){lt(this,"options");lt(this,"parser");this.options=e||jr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(It.notSpaceStart)?.[0],s=e.replace(It.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${br(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Cl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+br(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Cl(e);if(s===null)return br(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${br(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:br(e.text)}},Qo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},tr=class Wo{constructor(t){lt(this,"options");lt(this,"renderer");lt(this,"textRenderer");this.options=t||jr,this.options.renderer=this.options.renderer||new Ls,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Qo}static parse(t,r){return new Wo(r).parse(t)}static parseInline(t,r){return new Wo(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Cs,Rn=(Cs=class{constructor(e){lt(this,"options");lt(this,"block");this.options=e||jr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?er.lex:er.lexInline}provideParser(){return this.block?tr.parse:tr.parseInline}},lt(Cs,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),lt(Cs,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Cs),kf=class{constructor(...e){lt(this,"defaults",zo());lt(this,"options",this.setOptions);lt(this,"parse",this.parseMarkdown(!0));lt(this,"parseInline",this.parseMarkdown(!1));lt(this,"Parser",tr);lt(this,"Renderer",Ls);lt(this,"TextRenderer",Qo);lt(this,"Lexer",er);lt(this,"Tokenizer",Is);lt(this,"Hooks",Rn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Ls(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Is(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Rn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],c=s[a];Rn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Rn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,u);return c.call(s,_)})();let f=i.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,u);return _===!1&&(_=await c.apply(s,u)),_})();let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return er.lex(e,t??this.defaults)}parser(e,t){return tr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?er.lex:er.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?tr.parse:tr.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?er.lex:er.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?tr.parse:tr.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+br(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Fr=new kf;function at(e,t){return Fr.parse(e,t)}at.options=at.setOptions=function(e){return Fr.setOptions(e),at.defaults=Fr.defaults,Ll(at.defaults),at};at.getDefaults=zo;at.defaults=jr;at.use=function(...e){return Fr.use(...e),at.defaults=Fr.defaults,Ll(at.defaults),at};at.walkTokens=function(e,t){return Fr.walkTokens(e,t)};at.parseInline=Fr.parseInline;at.Parser=tr;at.parser=tr.parse;at.Renderer=Ls;at.TextRenderer=Qo;at.Lexer=er;at.lexer=er.lex;at.Tokenizer=Is;at.Hooks=Rn;at.parse=at;var Ub=at.options,Wb=at.setOptions,zb=at.use,Hb=at.walkTokens,Gb=at.parseInline;var Vb=tr.parse,Kb=er.lex;function Er(e){let t=at.parse(e),r=xl.sanitize(t);return Al(r)}function hr(e,t){return d`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function on(e){return e.loading?d`<div class="prompt-block__status">불러오는 중…</div>`:e.error?d`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ps(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var $f={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},xf={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Af=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Sf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ar(e){return!!e&&typeof e=="object"}function Jo(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Wl(e,t){let r=Jo(e),n=Jo(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Ef(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ar(s)&&typeof s.text=="string"?s.text:"").join(""):ar(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Tf(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:$f[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Jo(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Wl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let c=Wl(ar(i)?i.old_string:"",ar(i)?i.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ea(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ta(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Af.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Sf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Cf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ar(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ta(o.text));else if(o.type==="thinking"){let a=ea(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Tf(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ar(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Ef(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Rf(e){if(e.type==="item.completed"&&ar(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ta(t.text)];if(t.type==="reasoning"){let r=ea(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function If(e){if(e.schema!=="codex-delegation-monitor-v1"||!ar(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ar(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[ta(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=ea(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=xf[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Lf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function zl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ar(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?If(o):Lf(o)?Rf(o):Cf(o,r);for(let i of a)t.push(i)}return t}var Of=5,Mf=10,Pf=/Task\s+#(\d+)/,Df=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Nf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ds(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function qf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ff(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function jf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Pf.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Bf(e){if(e.tool==="Bash"){let t=e.command||"";return Df.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Nf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Uf(e){let t=e.filter(s=>s.kind==="tool").slice(-Mf),r=new Map;t.forEach((s,o)=>{let a=Bf(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Wf(e){let t=Ff(e);if(t)return{text:t,guess:!1};let r=jf(e);if(r)return{text:r,guess:!1};let n=Uf(e);return n?{text:n,guess:!0}:null}function zf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Pt(e,t)}function Ns(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,c=!1,u={},f=!0,_=new Set,y=new Set,R=null,x=null,L=!1,D=!1,V=!1,K=null,U=null;function I(){L=!1,D=!1,V=!1,K=null,U=null}async function S(H){if(r){D=!0,V=!1,ue();try{let q=await Promise.resolve(r("get-attempt-prompt",{attempt_id:H}));if(o!==H)return;!q||typeof q!="object"||Array.isArray(q)?V=!0:(K=q,U=H)}catch{o===H&&(V=!0)}finally{o===H&&(D=!1,ue())}}}function P(){if(L=!L,L&&o&&U!==o){S(o);return}ue()}function k(){if(!L)return"";let H=on({loading:D,error:V});if(H)return d`<div class="sv__prompt" data-seam="attempt-prompt">
        ${H}
      </div>`;if(!K)return"";if(K.missing)return d`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let q=Ps(K.recorded_at);return d`<div class="sv__prompt" data-seam="attempt-prompt">
      ${q?d`<div class="prompt-block__meta">${q} 발송</div>`:""}
      ${typeof K.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",K.task_prompt):""}
      ${typeof K.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",K.system_prompt):""}
    </div>`}function j(){if(!i||!n)return[];let H=n.get(i);return zl(H?H.lines:[])}function oe(){if(!i||!n)return null;let H=n.get(i),q=H?H.last_event_at:null;return typeof q=="number"?q:null}function ce(){return u.status==="running"}function ee(){if(ce()&&o){x||(x=setInterval(()=>ue(),1e3));return}re()}function re(){x&&(clearInterval(x),x=null)}function Re(H){let q=[],se=0;for(;se<H.length;){let Ie=H[se];if(Ie.kind==="tool"){let De=se;for(;De<H.length&&H[De].kind==="tool"&&H[De].tool===Ie.tool;)De+=1;if(De-se>=Of&&!y.has(se)){q.push({kind:"group",idx:se,tool:Ie.tool||"",lines:H.slice(se,De).map((ze,$e)=>({idx:se+$e,line:ze}))}),se=De;continue}}q.push({kind:"line",idx:se,line:Ie}),se+=1}return q}function st(H){for(let q=H.length-1;q>=0;q-=1){let se=H[q];if(se.kind==="result"||se.kind==="error")return null;if(se.kind==="tool"&&!Object.hasOwn(se,"result"))return se}return null}function Oe(H){for(let q=H.length-1;q>=0;q-=1)if(H[q].kind==="thinking")return H[q];return null}function ot(H,q){if(q.kind==="gate")return d`<div class="sv__gate">${q.text}</div>`;if(q.kind==="phase")return d`<div class="sv__phase">${q.text}</div>`;if(q.kind==="result")return d`<div
        class="sv__result${q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Er(q.text||(q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(q.kind==="thinking"){let se=_.has(H);return d`<div
        class="sv__think${se?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ye(H)}
      >
        <span class="sv__think-line">💭 ${Ds(q.text)}</span>
        ${se?d`<pre class="sv__think-expand">${q.text}</pre>`:""}
      </div>`}if(q.kind==="error")return d`<div class="sv__error">⛔ ${q.text}</div>`;if(q.kind==="blocker")return d`<div class="sv__error">⛔ ${q.text}</div>`;if(q.kind==="tool"){let se=_.has(H),Ie=q.tool==="Bash"?qf(q.command):0,De=q.tool==="Bash"?Ie>1?Ds(q.command):q.command:q.path||q.command||"";return d`<div
        class="sv__tool${se?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ye(H)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${q.icon}</span>
          <span class="sv__tool-name">${q.tool}</span>
          ${De?d`<span class="sv__tool-detail">${De}</span>`:""}
          ${Ie>1?d`<span class="sv__tool-more">⋯ ${Ie}줄</span>`:""}
          ${typeof q.added=="number"?d`<span class="sv__diff-add">+${q.added}</span>`:""}
          ${typeof q.removed=="number"?d`<span class="sv__diff-del">−${q.removed}</span>`:""}
          ${q.result?d`<span class="sv__tool-ok">→ ${q.result}</span>`:""}
        </span>
        ${se?d`<pre class="sv__tool-expand">${it(q)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${Er(q.text||"")}</div>`}function it(H){let q=[];if(H.tool==="Bash"&&typeof H.command=="string"&&H.command.length>0)q.push(H.command);else if(H.input!==void 0)try{q.push(`input: ${JSON.stringify(H.input,null,2)}`)}catch{}return typeof H.output=="string"&&H.output.length>0&&q.push(`output:
${H.output}`),q.join(`

`)}function Ge(){if(!o)return d``;let H=j(),q=(a?[u.model,u.effort]:[u.runner,u.model,u.effort]).filter(Boolean).join(" \xB7 "),se=u.session_id||"",Ie=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${f?"ON":"OFF"}`,De=ce(),ze=De?zf(oe(),Date.now()):"",$e=De?st(H):null,rt=De?Oe(H):null,Je=Wf(H);return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?u.role||"":o}</span>
        ${Je?d`<span
              class="sv__stage${Je.guess?" sv__stage--guess":""}"
              title=${Je.text}
              >${Je.text}</span
            >`:""}
        ${De?d`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ze?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ze}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ze?d`<span class="sv__live-ago">${ze}</span>`:""}</span
            >`:""}
        ${se?d`<button
              type="button"
              class="sv__session"
              title=${se}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${se}`}
              @click=${()=>he(se)}
            >
              ⧉ ${se.slice(0,8)}
            </button>`:""}
        ${q?d`<span class="sv__meta">${q}</span>`:""}
        ${u.worktree?d`<span class="sv__wt" title=${u.worktree}
              >${u.worktree}</span
            >`:""}
        ${a||c?"":d`<button
              type="button"
              class="sv__prompt-toggle${L?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${L?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${P}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${f?" sv__follow--on":""}"
          aria-pressed=${f?"true":"false"}
          aria-label=${Ie}
          @click=${qe}
        >
          <span class="sv__follow-full">⇣ ${Ie}</span>
          <span class="sv__follow-short">⇣ ${f?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>et()}
        >
          ✕
        </button>
      </div>
      ${a||c?"":k()}
      <div class="sv__body">
        ${H.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:Re(H).map(W=>W.kind==="group"?me(W):ot(W.idx,W.line))}
      </div>
      ${$e||rt?d`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${$e?d`<span class="sv__now-icon">${$e.icon}</span>
                  <span class="sv__now-name">${$e.tool}</span>
                  <span class="sv__now-detail"
                    >${$e.tool==="Bash"?Ds($e.command):$e.path||$e.command||""}</span
                  >`:""}
            ${rt?d`<span class="sv__now-think"
                  >💭 ${Ds(rt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function me(H){return d`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Le(H.idx)}
    >
      <span class="sv__group-icon">${H.lines[0].line.icon}</span>
      <span class="sv__group-name">${H.tool}</span>
      <span class="sv__group-count">${H.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Le(H){y.add(H),ue()}function ue(){Ke(Ge(),e),ee(),f&&we()}function we(){let H=e.querySelector(".sv__body");H&&(H.scrollTop=H.scrollHeight)}function ye(H){_.has(H)?_.delete(H):_.add(H),ue()}function qe(){f=!f,ue()}function he(H){Xt(H).then(q=>{q?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function je(H){!o||!H||(u={...u,...H},ue())}function We(H){let q=H.target;if(!q||!q.classList||!q.classList.contains("sv__body"))return;!(q.scrollHeight-q.scrollTop-q.clientHeight<=4)&&f&&(f=!1,ue())}e.addEventListener("scroll",We,!0);function ke(H){let q=H&&H.attempt_id;if(!q)return;let se=i;o=q,a=typeof H.launch_id=="string"&&H.launch_id.length>0?H.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&se&&se!==i&&Promise.resolve(r("unsubscribe-session-log",{id:se})).catch(()=>{}),u=H.meta||{},c=H.hide_prompt===!0,f=!0,_.clear(),y.clear(),I(),!R&&n&&(R=n.subscribe(ue)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),ue()}function et(){let H=i;o=null,a=null,i=null,c=!1,_.clear(),y.clear(),I(),re(),r&&H&&Promise.resolve(r("unsubscribe-session-log",{id:H})).catch(()=>{}),Ke(d``,e),s&&s()}return{open:ke,updateMeta:je,close:et,isOpen(){return o!==null},destroy(){re(),R&&(R(),R=null),e.removeEventListener("scroll",We,!0),o=null,a=null,i=null,c=!1,Ke(d``,e)}}}function On(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Hl(t.spec_id),s=Hl(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Hl(e){return typeof e=="string"?e.trim():""}function Hf(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Gf(e){let t=e&&e.metadata||{},r=On(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Hf(t)?null:"plan_pending"}),n}function Gl(e,t){let r=Gf(e);return d`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?d`<div class="detail-empty">산출물 없음</div>`:d`
          ${r.map(n=>d`<div class="detail-art">
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
  `}var Vf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Kf=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Yf=/^\*\*결론\*\* — (.+)$/;function qs(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Vf)return null;let r=Kf.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Yf.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Vl=20;function Kl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Zf(e){return e.length>Vl?`${e.slice(0,Vl)}\u2026`:e}function Xf(e,t,r,n){let s=`${t.lane} ${Zf(t.identifier)}`;return d`<div class="detail-report">
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
        <span class="detail-report__time">${Kl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?d`<div class="detail-report__body">
          ${Er(t.body)}
        </div>`:""}
  </div>`}function Qf(e){return d`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Kl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Er(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Yl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return d`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?d`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?d`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:d`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=qs(typeof c.text=="string"?c.text:"");return u?Xf(c,u,t,s.has(c.id)):Qf(c)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${c=>t.onDraftInput&&t.onDraftInput(c.target.value)}
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
  `}var{I:Eh}=hi;var Zl=e=>e.strings===void 0;var Jf={},Xl=(e,t=Jf)=>e._$AH=t;var Br=Es(class extends sn{constructor(e){if(super(e),e.type!==gr.PROPERTY&&e.type!==gr.ATTRIBUTE&&e.type!==gr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Zl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ft||t===mt)return t;let r=e.element,n=e.name;if(e.type===gr.PROPERTY){if(t===r[n])return Ft}else if(e.type===gr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Ft}else if(e.type===gr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Ft;return Xl(e),t}});var ra=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Fs=["orchestration_model","orchestration_effort","orchestration_speed"],Ql=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],js=["delegated","main"],Bs=["inherit","claude","codex"],Mn=["default","fast"],Pn=["standard","fast_track"],Dn=["codex","opus","fable","self","skip"],Us=["codex","fable","skip"],Ws=["low","medium","high","xhigh"],ir="auto";function yr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Jl(e){if(!yr(e)||!yr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))yr(n)&&yr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function ec(e){return e?.impl_dispatch==="main"}function zs(e,t){let r=Jl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[ir,...n.flatMap(([,s])=>s)]}function an(e,t,r){if(!yr(e)||!yr(e.runners))return[ir];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!yr(o)||!yr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==ir&&a!==r)continue;let c=yr(i)?i.efforts:null;if(Array.isArray(c))for(let u of c)typeof u=="string"&&!n.includes(u)&&n.push(u)}return[ir,...n]}function Hs(e,t){let r=Jl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function na(e,t,r,n,s){return ws({key:e,choices:t,layer:"global",global:r,execution_defaults:n,runner_catalog:s})}function tc(e,t){let r={};for(let n of ra){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function rc(e,t){let r={};for(let n of Fs){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var sa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Fs]}],oa={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},nc={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function aa(e,t,r,n,s,o=null){let a=en({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function sc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of aa(e,t,r,n,s,o))a[i.source]+=1;return a}function oc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function ac(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var qh=[...ra,...Fs];var e_=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],t_={pin:"pin",global:"global",base:"base"};function r_(e){return d`<span
    class=${`detail-layer-rail detail-layer-rail--${t_[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function n_(e,t,r){switch(e){case"workflow_mode":return Pn;case"spec_review_model":case"impl_review_model":return Dn;case"plan_review_model":return Us;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ws;case"impl_dispatch":return js;case"impl_runtime":return Bs;case"impl_model":return zs(r,t.impl_runtime);case"impl_effort":return an(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Mn;case"orchestration_model":return Hs(r,null);case"orchestration_effort":return an(r,void 0,t.orchestration_model||ir).filter(n=>n!==ir);default:return[]}}function s_(e,t){return d`<div class="detail-effective__row" data-key=${e.key}>
    ${r_(e.source)}
    <span class="detail-effective__k"
      >${oa[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${nc[e.source]}</span
    >
    ${t.expanded?d`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${oa[e.key]||e.key} \uD3B8\uC9D1`}
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
          ${t.options.map(r=>d`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function ic(e,t){let r=sa.flatMap(c=>c.keys),n=aa(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=sc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(c=>[c.key,c])),a=Object.fromEntries(n.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=n.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return d`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${c=>t.onToggle(c.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${c=>{c.preventDefault();let u=c.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${o_(o)}</span
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
    ${e.expanded?d`<div class="detail-effective__body">
          ${sa.map(c=>d`
              <div class="detail-effective__subhead">${c.label}</div>
              ${n.filter(u=>c.keys.includes(u.key)).map(u=>{let f=ws({key:u.key,choices:n_(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,controller_runtime:e.controller_runtime||null});return s_(u,{expanded:e.expanded,options:f.options,default_label:f.unset_label,default_full_value:f.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="구현 프리셋"
              .value=${Br(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${c=>t.onPresetSelect(String(c.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                구현 프리셋…
              </option>
              ${e.presets.map(c=>d`<option
                    value=${c.id}
                    ?selected=${c.id===e.preset_id}
                  >
                    ${c.name}${c.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
              >구현 키 5개를 핀으로 기록</span
            >
          </div>
        </div>`:""}
  </details>`}function o_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function lc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=hs(r.planned_execution,r.exec_receipt);return d`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?d`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?d`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?d`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${i?d`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${i.kind}
            title=${i.title}
            >${i.label}</span
          >`:""}
      ${a?d`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${e_.map(c=>{let u=c.receipt&&typeof t[c.receipt]=="string"?String(t[c.receipt]):"",f=n[c.id],_=u.length>0||f?.fill==="full",y=!_&&f?.fill==="dim",R=f?.stale===!0;return d`<span
          class=${`detail-summary__gate${_?" detail-summary__gate--on":""}${y?" detail-summary__gate--current":""}${R?" detail-summary__gate--stale":""}`}
          data-gate=${c.id}
        >
          <span class="detail-summary__gate-pill">${c.label}</span>
          ${u?d`<span class="detail-summary__gate-sha"
                >${u.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var cc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Nn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Gs(e){if(!Nn(e)||!Nn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Nn(r)&&Nn(r.models));return t.length>0?t:null}function ia(e,t){let r=Gs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function dc(e,t){return Nn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function uc(e,t){let r=Gs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return dc(n,n.models[t]);return[]}function a_(e){let t=Gs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of dc(n,s))r.includes(o)||r.push(o);return r}function i_(e,t){if(!t)return a_(e);let n=Gs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of uc(e,o))s.includes(a)||s.push(a);return s}function pc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ia(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?uc(t,n.impl_model):i_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function l_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function fc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function c(x){x.key==="Escape"&&s&&(x.preventDefault(),y())}document.addEventListener("keydown",c);function u(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>y()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${l_(s)}</span
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
            ${o==="loading"?d`<div class="mv__status">불러오는 중…</div>`:o==="pending"?d`<div class="mv__status">${i}</div>`:o==="error"?d`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Er(a)}
          </div>
        </div>
      </div>
    `:d``}function f(){Ke(u(),e)}async function _(x,L={}){s=x,o="loading",a="",i="",f();let D=r?r():"";if(!D){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let V="/api/doc?workspace="+encodeURIComponent(D)+"&path="+encodeURIComponent(x);try{let K=await n(V),U=await K.json().catch(()=>({}));if(!K.ok||!U||U.ok!==!0){if(U?.error==="not_found"&&L.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(U&&U.error||K.status)+")",f();return}a=String(U.content||""),o="ready",f()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function y(){s=null,Ke(d``,e)}function R(){document.removeEventListener("keydown",c),y()}return{open:_,close:y,destroy:R}}var c_=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],mc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Vs=["implementation","review-consult"],d_=["running","done","failed","interrupted"],u_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function p_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function f_(e){let t=kt(e);if(t.length>0)return t.map(s=>d`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=rn(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return d`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?d`<span class="detail-usage-partial" title=${mc}
          >부분 집계</span
        >`:""}`}function _c(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function la(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ca(t):""}function __(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Vs.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!d_.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function m_(e,t){let n=kt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return d`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model,t.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?d`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${la(t.completed_at)?d`<span class="detail-session__leg-time detail-session__time"
          >${la(t.completed_at)}</span
        >`:""}
    ${n?d`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function g_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?kt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?ca(e.last_event_at):s?la(s.completed_at):"";return d`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${u_[e.status]}</span
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
    ${i?d`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?d`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function b_(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function h_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of o){let _=__(f);!_||s.has(_.launch_id)||(s.add(_.launch_id),n.push(_))}n.sort((f,_)=>f.started_at-_.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let f of Vs){let _=t.roles[f]?.codex;a[f]=_?[..._.legs]:[]}let i=Vs.flatMap(f=>a[f]),c=new Set,u=[];for(let f of Vs){for(let _ of n.filter(y=>y.role===f)){let y=i.find(R=>R.receipt_id===_.launch_id)||null;y&&!b_(_,y)||(y&&c.add(y.receipt_id),u.push(g_(_,y,e.attempt_id,r)))}for(let _ of a[f])c.has(_.receipt_id)||u.push(m_(f,_))}return u}function y_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...c_,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return d`<div class="detail-session__usage-detail">
    ${n.map(s=>d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${p_(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?d`<span class="detail-session__usage-note">${mc}</span>`:""}
  </div>`}var v_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ca(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function w_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return d`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?d`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function gc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,y=o.has(u.attempt_id),R=_&&!y,x=_?y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!R}
      title=${x}
      @click=${L=>{L.stopPropagation(),R&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,y=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return d`<div class="detail-session__cause" title=${y}>
      ${u.cause}
    </div>`},c=u=>{let f=_c(Io(u));if(kt(f).length===0&&!rn(u.usage))return"";let _=s.has(u.attempt_id);return d`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${y=>{y.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return d`
    <div class="detail-section-label">
      세션 이력${f_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=Io(u),_=_c(f),y=kt(_);return d`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${v_[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${Ar(u)?d`<span
                  class="detail-session__resumed"
                  title=${Ar(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${or(u)}</span>
            ${y.length>0?d`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?d`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${y.length>0?y.map(R=>d`<span
                      class="detail-session__usage"
                      title=${R.tooltip}
                      >${R.label}</span
                    >`):rn(u.usage)?d`<span class="detail-session__usage"
                    >${rn(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ca(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${w_(u)}
          ${s.has(u.attempt_id)&&u.usage?y_(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${h_(u,f,t)}
        </div>`})}
    </div>
  `}function bc(e,t={}){return d`
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
    ${e.expanded?d`<div class="detail-prompt" data-seam="task-prompt">
          ${k_(e)}
        </div>`:""}
  `}function k_(e){let t=on(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return d`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?hr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Ps(r.recorded_at);return d`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var $_=["open","in_progress","deferred","resolved","closed"],x_=[0,1,2,3,4];function hc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,_={},y="",R=!1,x=!1,L={},D=!1,V=!1,K="",U="",I="";function S(){D=!1,V=!1,K="",U="",I=""}let P=[],k=null,j=null,oe=!1,ce="",ee=!1,re=0,Re=new Set;function st(){P=[],k=null,j=null,oe=!1,ce="",ee=!1,re+=1,Re.clear()}async function Oe(p){if(!s)return;let E=++re;try{let $=await Promise.resolve(s("get-comments",{id:p}));if(E!==re||p!==u)return;P=Array.isArray($)?$:[],oe=!1}catch{if(E!==re||p!==u)return;oe=!0}b()}function ot(){if(!s||!u)return;let p=f&&typeof f.comment_count=="number"?f.comment_count:null;if(k!==u){k=u,j=p,Oe(u);return}p!==null&&p!==j&&(j=p,Oe(u))}function it(p){Re.has(p)?Re.delete(p):Re.add(p),b()}function Ge(p){let E=ce.trim().length===0;ce=p,E!==(p.trim().length===0)&&b()}async function me(){let p=ce.trim();if(!s||!u||p.length===0||ee)return;let E=u;ee=!0,b();let $=!1;try{let X=await Promise.resolve(s("add-comment",{id:E,text:p}));Array.isArray(X)&&X.length>0&&($=!0,E===u&&(P=X,oe=!1,ce="",j=X.length))}catch{$=!1}$||ie("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),E===u&&(ee=!1),b()}let Le={onToggle:it,onDraftInput:Ge,onSubmit:me},ue=document.createElement("div");ue.className="md-viewer-root",document.body.appendChild(ue);let we=fc(ue,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),ye=document.createElement("div");ye.className="session-log-root",document.body.appendChild(ye);let qe=Ns(ye,{transport:s?(p,E)=>Promise.resolve(s(p,E)):void 0,sessionLogStore:c}),he=!1,je=!1,We=!1,ke=null,et=null,H=0;function q(p){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${p}`}function se(){he=!1,je=!1,We=!1,ke=null,et=null,H+=1}async function Ie(p){if(!s)return;let E=++H;je=!0,We=!1,b();try{let $=await Promise.resolve(s("get-bead-prompt",{bead_id:p}));if(E!==H)return;!$||typeof $!="object"||Array.isArray($)?We=!0:(ke=$,et=q(p))}catch{E===H&&(We=!0)}finally{E===H&&(je=!1,b())}}function De(){if(he=!he,he&&u&&et!==q(u)){ke=null,Ie(u);return}b()}function ze(){if(!a||!u)return[];let p=a.get();return(p&&p.attempts?Object.values(p.attempts):[]).filter($=>$&&$.bead_id===u).sort(($,X)=>(X.started_at||0)-($.started_at||0)).map($=>({attempt_id:$.attempt_id,bead_id:$.bead_id,status:$.status,started_at:typeof $.started_at=="number"?$.started_at:null,runner:$.runner||null,model:$.model||null,effort:$.effort||$.observed_effort||null,speed:$.speed||null,session_id:$.session_id||null,resumed_from:$.resumed_from||null,continuation_mode:$.continuation_mode||null,dismissed_at:typeof $.dismissed_at=="number"?$.dismissed_at:null,cause:typeof $.cause=="string"?$.cause:null,cause_detail:$.cause_detail||null,exec_default_preset_id:typeof $.exec_default_preset_id=="string"?$.exec_default_preset_id:null,exec_default_preset_revision:typeof $.exec_default_preset_revision=="number"?$.exec_default_preset_revision:null,exec_values:$.exec_values&&typeof $.exec_values=="object"?$.exec_values:null,usage:$.usage||null,usage_legs:Array.isArray($.usage_legs)?$.usage_legs:[],delegation_sessions:Array.isArray($.delegation_sessions)?$.delegation_sessions:[]}))}function $e(){if(!a||!u)return null;let p=a.get();return Bt(p&&p.attempts||{},u)}let rt=new Set;function Je(p){rt.has(p)?rt.delete(p):rt.add(p),b()}function W(p){let E=a?a.get():null,$=E&&E.attempts?E.attempts[p]:null;qe.open({attempt_id:p,meta:$?{runner:$.runner||void 0,model:$.model||void 0,effort:$.effort||void 0,status:$.status||void 0,session_id:$.session_id||void 0}:{}})}function J(p,E){let $=a?a.get():null,X=$&&$.attempts?$.attempts[p]:null,Ee=(X&&Array.isArray(X.delegation_sessions)?X.delegation_sessions:[]).find(Ye=>Ye&&typeof Ye=="object"&&Ye.launch_id===E);Ee&&qe.open({attempt_id:p,launch_id:E,meta:{runner:"codex",role:Ee.role,model:Ee.model,effort:Ee.effort,session_id:Ee.session_id,status:Ee.status}})}async function Te(p){if(!s||!p)return;let E=await tn();if(E===null)return;let $=()=>{let Ye=a?a.get():null;return Ye&&typeof Ye.revision=="number"?Ye.revision:0},X=async(Ye={},Pe=$())=>await s("worker-attempt-resume",{attempt_id:p,expected_revision:Pe,...E!==""?{instructions:E}:{},...Ye}),xe=Ye=>{Ye?.queue&&a?.set&&a.set(Ye.queue)},Ee=await X();if(xe(Ee),Ee&&Ee.conflict){let Ye=Ee.queue&&typeof Ee.queue.revision=="number"?Ee.queue.revision:$();Ee=await X({},Ye),xe(Ee)}Ee=await fr(Ee,(Ye,Pe)=>X({continuation:Ye,decision_token:Pe}),{onResult:xe,refresh:()=>X()}),Ee&&Ee.resumed===!1&&!Ee.conflict&&Ee.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ee.reason}`,"error",2400)}let Fe={onOpen:W,onOpenDelegation:J,onResume:Te,onToggleUsage:Je};function de(){let p=a?a.get():null,E={...L};for(let $ of["orchestration_model","orchestration_effort","orchestration_speed"]){let X=p&&p[$];typeof X=="string"&&(E[$]=X)}return E}async function g(){if(s){try{let p=await Promise.resolve(s("get-session-defaults",{}));L=p&&p.values&&typeof p.values=="object"?p.values:{}}catch{L={}}b()}}function v(){let p=a?a.get():null;return p&&p.runner_catalog||null}function A(){let p=a?a.get():null;return p&&typeof p.execution_defaults=="object"?p.execution_defaults:null}function O(){let p=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},$=en({pin:{...p,..._},global:de(),execution_defaults:A(),runner_catalog:v(),route:typeof p.route=="string"?p.route:null}).orchestration_model.value||"";return ia(v(),$)}function G(){let p=i?i.get():null;return!p||typeof p.revision!="number"?null:{revision:p.revision,presets:Array.isArray(p.presets)?p.presets:[]}}function Y(p){return p?.compatible===!1}function ne(p){i&&p&&typeof p.revision=="number"&&Array.isArray(p.presets)&&i.set({revision:p.revision,presets:p.presets})}async function te(){let p=G(),E=p?.presets.find($=>$.id===y);if(!(!s||!u||!p||!E||Y(E)||R)){R=!0,b();try{let $=await Promise.resolve(s("apply-impl-preset",ac(u,E.id,p.revision)));if($&&$.conflict){ne($),ie("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let X=$&&Array.isArray($.issue)?$.issue[0]:$?.issue;if($&&$.applied&&X&&typeof X=="object"){f=X;for(let xe of cc)delete _[xe];ie("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}$&&$.error==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch($){$&&typeof $=="object"&&$.code==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{R=!1,b()}}}let ge=null;r&&r.subscribe&&(ge=r.subscribe(()=>Be()));let Ae=null;a&&typeof a.subscribe=="function"&&(Ae=a.subscribe(()=>{u&&b()}));let Me=null;i&&typeof i.subscribe=="function"&&(Me=i.subscribe(()=>{u&&b()}));function Ne(p){p.key==="Escape"&&u&&(p.preventDefault(),n())}document.addEventListener("keydown",Ne);function Be(){if(u){if(r&&typeof r.snapshotFor=="function"){let p=r.snapshotFor("detail:"+u)||[];f=p.find($=>$&&$.id===u)||p[0]||f}ot(),b()}}function Xe(p){Xt(p).then(E=>{E?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function F(p){p.preventDefault(),p.stopPropagation(),u&&Xe(u)}function Q(p,E){p.preventDefault(),p.stopPropagation(),Xe(E)}function w(p,E,$){p.preventDefault(),p.stopPropagation(),we.open(E,{missing_state:$})}function C(p,E){_[p]=E,b(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",oc(u,p,E.length===0?null:E))).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function M(p,E){let $=f||{},X=$.metadata&&typeof $.metadata=="object"?$.metadata:{},xe={};for(let Pe of["impl_runtime","impl_model","impl_effort"])xe[Pe]=Object.hasOwn(_,Pe)?_[Pe]:typeof X[Pe]=="string"?X[Pe]:"";xe[p]=E;let Ee=pc(xe,v(),O()),Ye={};for(let Pe of["impl_runtime","impl_model","impl_effort"])Ye[Pe]=_[Pe],_[Pe]=Ee[Pe]||"";b(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Ee,orchestration_runtime:O()})).then(Pe=>{let ct=Array.isArray(Pe)?Pe[0]:Pe;if(!ct||typeof ct!="object"||!ct.id)throw new Error("implementation target readback failed");f=ct;for(let Gt of["impl_runtime","impl_model","impl_effort"])delete _[Gt];b()}).catch(()=>{for(let Pe of["impl_runtime","impl_model","impl_effort"])Ye[Pe]===void 0?delete _[Pe]:_[Pe]=Ye[Pe];b(),ie("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function z(p,E,$){if(!s||!u)return!1;try{let X=await Promise.resolve(s(p,E)),xe=Array.isArray(X)?X[0]:X;return xe&&typeof xe=="object"&&xe.id?(f=xe,!0):(ie($,"error"),!1)}catch{return ie($,"error"),!1}}function be(p){setTimeout(()=>{try{let E=e.querySelector(p);E&&typeof E.focus=="function"&&E.focus()}catch{}},0)}function ve(){D=!0,K=f&&f.title||"",b(),be('.detail-edit__input[data-edit="title"]')}function Z(p){K=p.target.value}function tt(){D=!1,K="",b()}function Se(){z("edit-text",{id:u,field:"title",value:K},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(D=!1,K=""),b()})}function _t(){V=!0,U=f&&f.description||"",b(),be('.detail-edit__textarea[data-edit="description"]')}function He(p){U=p.target.value}function ht(){V=!1,U="",b()}function qt(){z("edit-text",{id:u,field:"description",value:U},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(V=!1,U=""),b()})}function cr(p,E,$,X){if(p.key==="Escape"){p.stopPropagation(),$();return}p.key==="Enter"&&(!X||p.ctrlKey||p.metaKey)&&(p.preventDefault(),E())}function xt(p){let E=p.target.value;z("update-status",{id:u,status:E},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>b())}function St(p){let E=Number(p.target.value);z("update-priority",{id:u,priority:E},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>b())}function dr(p){I=p.target.value}function ur(){let p=I.trim();p.length!==0&&z("label-add",{id:u,label:p},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(E=>{E&&(I=""),b()})}function Wt(p){if(p.key==="Escape"){p.stopPropagation(),I="",b();return}p.key==="Enter"&&(p.preventDefault(),ur())}function zt(p){z("label-remove",{id:u,label:p},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>b())}let yt={onCopyPath:Q,onOpenDoc:w};function nr(p){return typeof p=="string"?p:p&&typeof p=="object"?String(p.id||p.to||p.issue_id||p.depends_on||""):""}function Qe(p){switch(p&&typeof p=="object"?String(p.dependency_type||p.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Lt(p){let $=(Array.isArray(p.dependencies)?p.dependencies:[]).map(X=>({id:nr(X),icon:Qe(X)})).filter(X=>X.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${$.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${$.map(X=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(X.id)}
                  >
                    ${X.icon?`${X.icon} `:""}${X.id}
                  </button>`:d`<span class="detail-dep"
                    >${X.icon?`${X.icon} `:""}${X.id}</span
                  >`)}
          </div>`}
    `}function wr(p){let E=p.metadata||{},$=p.workflow||{},X=$.stages||{},xe=X.spec&&X.spec.stale,Ee=X.impl&&X.impl.stale,Ye=X.plan||null,Pe=$.route_source==="derived",ct=$.route||E.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Pe?" detail-kv__v--derived":""}"
          title=${Pe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Pe?"unset":ct}</span
        >
      </div>
      ${$.route!=="quick_fix"||Object.hasOwn(E,"spec_review")?d`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${E.spec_review||"\uC5C6\uC74C"}${xe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${$.route==="full_plan"?d`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ye?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ye?.approval_receipt||"\uC5C6\uC74C"}${Ye?.approval_state==="stale"?" \xB7 stale":Ye?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${$.route!=="quick_fix"||Object.hasOwn(E,"impl_review")?d`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${E.impl_review||"\uC5C6\uC74C"}${Ee?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${$.planned_execution?d`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${$.planned_execution.kind}</span>
            </div>
            ${$.planned_execution.kind==="main"?d`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${$.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${$.exec_receipt?d`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${$.exec_receipt.kind}:${$.exec_receipt.actor}@${$.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${$.impl_entry?d`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${$.impl_entry.actor}@${$.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${E.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${E.pr_url}</span>
          </div>`:""}
    `}let Ht={route:["quick_fix","spec_backed","full_plan"]};async function fe(p,E){let $=E.target.value;if(p==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&$!=="full_plan"&&!window.confirm(`full_plan \u2192 ${$||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){b();return}await z("update-workflow-meta",{id:u,key:p,value:$},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),b()}function l(p){let E=p.metadata||{};return d` ${((X,xe)=>{let Ee=Ht[X],Ye=typeof E[X]=="string"?E[X]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${X}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${X}
          data-edit=${`wfmeta-${X}`}
          @change=${Pe=>fe(X,Pe)}
        >
          <option value="" ?selected=${!Ee.includes(Ye)}>
            ${xe}
          </option>
          ${Ee.map(Pe=>d`<option value=${Pe} ?selected=${Ye===Pe}>${Pe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function m(p,E){return D?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${K}
            @input=${Z}
            @keydown=${$=>cr($,Se,tt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Se}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${tt}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${p}</h2>
        ${kt(E).map($=>d`<span class="detail-usage-total" title=${$.tooltip}
              >${$.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ve}
        >
          ✎
        </button>
      </div>
    `}function T(p){let E=vt(p.created_at),$=vt(p.updated_at);return!E&&!$?d``:d`
      ${E?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
      ${$?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
    `}function B(p,E){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${xt}
        >
          ${$_.map($=>d`<option value=${$} ?selected=${$===p}>${$}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${St}
        >
          ${x_.map($=>d`<option value=${String($)} ?selected=${$===E}>
                P${$}
              </option>`)}
        </select>
      </div>
    `}function ae(p){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${V?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${_t}
            >
              ✎
            </button>`}
      </div>
      ${V?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${U}
              @input=${He}
              @keydown=${E=>cr(E,qt,ht,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${qt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ht}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${p||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function _e(p){let E=typeof p.notes=="string"?p.notes:"";return E.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${E}</div>
    `}function pe(p){let E=Array.isArray(p.labels)?p.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${E.map($=>d`<span class="detail-label-chip"
              >${$}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${$}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+$}
                @click=${()=>zt($)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${I}
            @input=${dr}
            @keydown=${Wt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ur}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ve(){if(!u)return d``;let p=f||{},E=String(p.id||u),$=p.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",X=$e(),xe=p.status||"open",Ee=typeof p.priority=="number"?Math.max(0,Math.min(4,p.priority)):"",Ye=p.description||"",Pe={...p,metadata:{...p.metadata||{},..._}};return d`
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
            @click=${F}
          >
            ${E}
          </button>
          ${m($,X)}
          ${lc(Pe)}
          ${ic({metadata:Pe.metadata,workspace_values:de(),catalog:v(),execution_defaults:A(),expanded:x,presets:G()?.presets||[],preset_id:y,preset_busy:R},{onToggle:ct=>{x=ct,b()},onEdit:(ct,Gt)=>{if(ct==="impl_runtime"||ct==="impl_model"||ct==="impl_effort"){M(ct,Gt??"");return}C(ct,Gt??"")},onPresetSelect:ct=>{y=ct,b()},onPresetApply:()=>{te()}})}
          ${B(xe,Ee)} ${T(p)}
          ${ae(Ye)}
          ${Yl(P,Le,{expanded:Re,draft:ce,sending:ee,error:oe})}
          ${_e(p)} ${pe(p)} ${Lt(p)}
          ${wr(p)} ${l(p)}
          ${Gl(p,yt)}
          ${bc({expanded:he,loading:je,error:We,data:ke},{onToggle:De})}
          ${gc(ze(),Fe,{total:X,expanded:rt})}
        </div>
      </div>
    `}function b(){Ke(Ve(),e)}return{load(p){p!==u&&(_={},y="",x=!1,S(),st(),se()),u=p,f=null,Be(),g()},clear(){u=null,f=null,_={},y="",R=!1,x=!1,S(),st(),se(),we.close(),qe.close(),Ke(d``,e)},destroy(){ge&&(ge(),ge=null),Ae&&(Ae(),Ae=null),Me&&(Me(),Me=null),document.removeEventListener("keydown",Ne),we.destroy(),ue.parentNode&&ue.parentNode.removeChild(ue),qe.destroy(),ye.parentNode&&ye.parentNode.removeChild(ye),u=null,f=null,y="",R=!1,st(),se(),Ke(d``,e)}}}function yc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,_="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let y=typeof _=="string"?_.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Ks(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ys(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function vc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function Zs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function A_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:Ks(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function wc(e,t){let r=A_(e,t);return r?d`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?d`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?vt(r.deploy.at):""}
            >${Zs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Ys(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function ln(e){let t=Pt(e.created_at),r=Pt(e.updated_at);return!t&&!r?"":d`<div class="worker-mini__meta">
    ${t?d`<span title=${`\uC0DD\uC131 ${vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?d`<span>·</span>`:""}${r?d`<span title=${`\uC218\uC815 ${vt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function S_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function qn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Xs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function lr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,y)=>(_.requested_at||0)-(y.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?S_(s.phase):null,u=s?.kind==="stale_work_backup_fresh",f=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:f}}function vr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return d`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?d`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?d`<code>백업: ${n}</code>`:t.error?d`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?d`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?d`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var E_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function kc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:E_[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function da(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=kt(e.usage),s=Qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?Pt(e.done_at):"",u=t?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?d`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?d`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",y=e.workspace_name?d`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",R=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,x=d`<span class="worker-mini__title">${e.title}</span>`,L=e.pr_url&&e.pr_number?d`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",D=e.completion_repair_pr_url&&e.completion_repair_pr_number?d`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",V=r.map(Oe=>Oe===e.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Oe}</span
        >`:d`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Oe===e.completion_badge&&e.completion_title||""}
          >${Oe}</span
        >`),K=e.reason?d`<span class="worker-mini__reason">${e.reason}</span>`:"",U=n.length>0?n.map(Oe=>d`<span class="worker-usage" title=${Oe.tooltip}
              >${Oe.label}</span
            >`):s?d`<span class="worker-usage" title=${nn(e.usage)}
            >${s}</span
          >`:"",I=o?d`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?d`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",S=e.merge_action?d`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",P=e.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",k=e.timeline_action?d`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",j=e.discard,oe=j?.action||e.discard_action?d`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${j?.attempt_id||""}
          data-operation-id=${j?.operation?.operation_id||""}
          data-discard-mode=${j?.confirmation||"unmerged"}
          ?disabled=${j?!j.enabled:e.discard_enabled===!1}
          title=${j?j.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${j?.label||"\uD3D0\uAE30"}
        </button>`:"",ce=e.stale_work||null,ee=ce?d`${ce.can_resume||ce.can_continue?d`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ce.can_backup_fresh?d`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ce.can_recheck?d`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            다시 확인
          </button>`:""}`:"",re=ce?d`<div class="worker-mini__stale">
        <strong>${ce.title}</strong>
        <span>${ce.summary}</span>
        <span>${ce.cause}</span>
        ${ce.can_backup_fresh?d`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Re=e.revise_action?d`<button
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
        </button>`:"",st=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||j?.operation||e.revise_action||ce);return d`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?d`<div class="worker-mini__row1">${y}${R}${x}</div>
          <div class="worker-mini__row2">
            ${U}${c?d`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${vt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?d`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Ys(e.work_ms)}</span
                >`:""}${V}${I}
            <span class="worker-mini__actions"
              >${S}${P}${k}${oe}</span
            >
            ${ln(e)}
          </div>`:a?d`<div class="worker-mini__head">
              ${u}${f}${y}${R}${L}${D}${V}${_}${K}
            </div>
            <div class="worker-mini__body">${x}${re}</div>
            ${st?d`<div class="worker-mini__foot">
                  ${U}${I}
                  <span class="worker-mini__actions"
                    >${S}${P}${k}${oe}${Re}${ee}</span
                  >
                  ${vr(e)}
                </div>`:""}
            ${ln(e)}`:d`<div class="worker-mini__line">
              ${u}${f}${y}${R}${x}${L}${D}${V}${_}${K}${U}${I}${S}${P}${k}${oe}
            </div>
            ${vr(e)} ${ln(e)}`}
  </div>`}function T_(e,t=null){let r=e.draggable&&!e.done,n=r&&t&&t.bead_id===e.id,s=e.workflow,o=s&&s.chips||{},a=o.route||s&&s.route,i=o.route_source==="derived"||!!(s&&s.route_source==="derived"),c=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),u=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return d`<div
    class="worker-card${r?"":" worker-card--static"}"
    draggable=${r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${r?d`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?d`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s&&a?d`<span
            class="ctl-chip ctl-chip--route${i?" is-derived":""}"
            title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${i?"unset":a}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${s?bs(s,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${n?d`<div class="worker-card__place-menu">
            ${t.lanes.map(f=>d`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${f.id}
                  title="${f.label} 대기 맨 뒤에 추가"
                >
                  <span>${f.label}</span>
                  <span class="worker-card__place-count">${f.count}</span>
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
          </div>`:d`${e.reason?d`<span
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
              title=${r?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":c?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${ln(e)}
  </div>`}function rr(e){let t=!!e.collapsible&&!!e.collapsed,r=d`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?d`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return d`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?d`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:d`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":d`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?d`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?T_(n,e.place_menu):da(n))}
          </div>`}
  </section>`}function ua(e,t){return`${e}\0${t}`}function pa(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function C_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function R_(e,t){return e==="internal"&&t===void 0}function $c(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function xc(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${$c(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=C_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:R_(a,s)}}function Ac(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=ua(i.root_dir,c.id);r.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let f of Array.isArray(c.items)?c.items:[])n.set(f.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=ua(i.root_dir,c.id),f=Array.isArray(c.items)?c.items[0]:null,y=!!f&&f.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(f.blocked_by)?f.blocked_by:[],R=s.get(u);if(R)for(let x of y){let L=n.get(x);L&&L!==u&&!R.includes(L)&&R.push(L)}}let o=(i,c)=>{let u=new Set,f=[i];for(;f.length>0;){let _=f.pop();if(_===c)return!0;!_||u.has(_)||(u.add(_),f.push(...s.get(_)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let f of c){let _=r.get(f);o(f,i)&&_&&u.push(_)}u.length>0&&a.set(i,u)}return a}function Sc(e){let t=pa(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=$c(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function Ec(e,t){return ua(e,t)}var Tc=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Fn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Qs(e,t){let r=Tc.find(s=>s.step===e);if(!r)return null;let n=Tc.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Cc(e){let t=Fn.findIndex(r=>r.step===e);return Fn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Ur(e){let t=Fn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function I_(e){let t=Fn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Fn.length}}function Js(e){let t=I_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var _a=new Set(["queued","running","retry_pending","repairing"]),Rc=new Set(["failed","succeeded"]),L_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},jn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},O_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:jn.base_containment,child_sweep:jn.child_sweep,branch_cleanup:jn.branch_cleanup,parent_close:jn.parent_close};function M_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function P_(e,t,r){return!["verify","deploy"].includes(e.kind)||![..._a,...Rc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function D_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function fa(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=L_[s];if(!o)return null;let a=Qs(r,`${n} ${o}`);return a?{...a,active:_a.has(s),failed:s==="failed"}:null}function N_(e){return!e||typeof e!="object"?null:O_[e.step]||null}function Bn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=N_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=M_(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(x=>x&&typeof x=="object"&&P_(x,t,i)).sort(D_):[],u=a?c:[],f=u.find(x=>_a.has(x.state));if(f)return fa(f);if(s)return s.step==="repo_operations"&&c[0]?fa(c[0],!0):null;let _=u.find(x=>Rc.has(x.state)?x.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return fa(_);if(n){let x=Qs(n.step,n.label);return x?{...x,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?jn[e.cleanup_cursor]:null;if(!y)return null;let R=Qs(y.step,y.label);return R?{...R,active:!0,failed:!1}:null}function eo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Ic={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Lc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Oc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ma(e){for(let t of Oc(e))if(Object.hasOwn(Ic,t))return Ic[t];return null}function ga(e){let t=null;for(let r of Oc(e))Object.hasOwn(Lc,r)&&(t=Lc[r]);return t}function to(e){let t=ma(e),r=ga(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Mc(e,t){let r=ma(e)??ma(t),n=ga(t)??ga(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Pc=160;function q_(e){return e.length>Pc?`${e.slice(0,Pc)}\u2026`:e}function F_(e){return!e||!e.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?d` · <code>${q_(e.command)}</code>`:""}
  </div>`}function j_(e){return e?d`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ba(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Dc(e){let t=e.failure?to(e.failure.reason):"";return d`<div class="worker-banners">
    ${e.failure?d`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?d`<button
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
          ${e.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${F_(e.failure.cause_detail)}
          ${j_(e.failure.reason)}
          ${vr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function B_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ba(t-e.started_at):"\u2014",a=or(e),i=Ar(e),c=kt(e.usage),u=Qt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,y=e.landing,R=e.attempt_id&&e.attempt_id===r,x=e.discard?.action?d`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return d`<div
    class="rtile${R?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?d`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?d`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${x}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 알림 닫기 — 레인에는 남습니다"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:d`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?d`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:d`<button
                  type="button"
                  class="rtile__pause"
                  ?disabled=${e.can_pause===!1}
                  title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                  aria-label="일시정지"
                >
                  ⏸
                </button>`}
            ${x}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?d`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${y?d`<div class="rtile__landing">
          <span
            class="merge-step${y.failed?" merge-step--failed":""}"
            style=${`--progress: ${y.percent}%`}
            >${y.label}${y.index>0?d`<span class="merge-step__n"
                  >${y.index}/${y.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||c.length>0||u||f||_?d`<div class="rtile__meta">
          ${f?d`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?d`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?d`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map(L=>d`<span class="worker-usage" title=${L.tooltip}
                    >${L.label}</span
                  >`):u?d`<span
                  class="worker-usage"
                  title=${nn(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${ln(e)} ${vr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ha(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>B_(s,t,r))}
  </div>`}function Wr(e){return d`<svg
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
  </svg>`}function ya(){return Wr(kr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function va(){return Wr(kr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Nc(){return Wr(kr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function qc(){return Wr(kr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Fc(){return Wr(kr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function jc(){return Wr(kr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Bc(){return Wr(kr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Un=1,U_=6e4,W_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},z_=new Set(["auto_merge","merged","merge","done"]),Uc={running:3,paused:2,failed:1};function H_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function G_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),y=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!y&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let _=Uc[u.run_state],y=Uc[i];if(_>y||_===y&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Bt(e,a.bead_id),can_pause:i==="running"&&f,can_resume:i!=="running"&&f&&!n.has(a.attempt_id)})}return o}function Wc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function $t(e){return e&&typeof e=="object"?e:{}}function wa(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let k of s)k&&typeof k.root_dir=="string"&&a.set(k.root_dir,k);let i=[],c=[],u=[],f=[],_=[],y=[],R=new Map,x=new Map,L=new Map;for(let k of n){if(!k||typeof k.root_dir!="string")continue;let j=k.root_dir,oe=k.name||j,ce=a.get(j),ee=ce&&typeof ce.revision=="number"?ce.revision:typeof k.revision=="number"?k.revision:0,re=$t(k.attempts),Re=$t(k.bead_titles),st=$t(k.pr_observations),Oe=$t(k.admission),ot=$t(k.revise_parked),it=$t(k.merge_queue_state),Ge=$t(k.cleanup_failed),me=$t(k.discard_operations),Le=$t(k.bead_blocked_by),ue=$t(k.pr_activity),we=Array.isArray(k.repo_operations)?k.repo_operations:[],ye=Array.isArray(k.merge_queue)?k.merge_queue:[],qe=new Set(ye.filter(W=>W&&typeof W.bead_id=="string").map(W=>W.bead_id)),he=new Map(ye.filter(W=>W&&typeof W.bead_id=="string").map(W=>[W.bead_id,W])),je=Array.isArray(k.queue)?k.queue:[],We=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).filter(W=>W&&/^s[1-5]$/.test(W.id)&&Array.isArray(W.entries)),ke=$t(k.lane_states),et=typeof k.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(k.serial_lane_count))):Math.min(5,We.length);L.set(j,et);let H=new Map(We.map(W=>[W.id,W])),q=new Map;for(let W of We)for(let J of W.entries)J&&typeof J.bead_id=="string"&&q.set(J.bead_id,W.id);let se=Array.isArray(k.done)?k.done:[];for(let W of se)W&&typeof W.bead_id=="string"&&y.push({id:W.bead_id,root_dir:j,workspace_name:oe});let Ie=new Map;for(let W of se)W&&typeof W.bead_id=="string"&&typeof W.added_at=="number"&&Ie.set(W.bead_id,W.added_at);let De=W=>({id:W,title:Re[W]||W,root_dir:j,workspace_name:oe,expected_revision:ee,draggable:!1}),ze=new Set;for(let[W,J]of G_(re,Ie))ze.add(W),c.push({...De(W),lane:"running",...q.has(W)?{serial_lane_id:q.get(W)}:{},attempt_id:J.attempt_id,run_state:J.run_state,can_pause:J.can_pause,can_resume:J.can_resume,started_at:J.started_at,last_event_at:J.last_event_at,runner:J.runner,model:J.model,effort:J.effort,speed:J.speed,resumed_from:J.resumed_from,continuation_mode:J.continuation_mode,usage:J.usage,discard:lr(me,W,{attempt_id:J.attempt_id}),badges:J.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:J.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:J.run_state==="failed"});for(let W of Array.isArray(k.pr_wait)?k.pr_wait:[]){let J=W&&W.bead_id;if(typeof J!="string"||ze.has(J))continue;ze.add(J);let Te=$t(st[J]),Fe=$t(Te.pr),de=Te.gate?$t(Te.gate):null,g=qe.has(J),v=he.get(J)?.continuation_action||null,A=!!v&&v.continuation===null,O=it.active===J,G=W.external===!0,Y=Ge[J]||null,ne=$t(ue[J]),te=Bn({bead_id:J,merge_sha:W.merge_sha,cleanup_cursor:W.cleanup_cursor,merge_progress:ne.merge_progress||null,cleanup_failed:Y,repo_operations:we}),ge=eo(te),Ae=!!de&&de.base_badge==="\uCDA9\uB3CC",Me=!!Y&&["child_sweep","branch_cleanup","parent_close"].includes(Y.step)&&!!de&&de.tier==="merged",Ne=G&&!!Y&&!!de&&de.tier==="merged",Be=!!de&&["closed_unmerged","review","undecidable"].includes(de.tier),Xe=lr(me,J,{external:G,merge_active:O||te?.step==="merge",merge_queued:g,cleanup_active:ge,merged:!!Y||de?.tier==="merged"}),F=!!Xe.operation;u.push({...De(J),lane:"pr_wait",pr_number:typeof Fe.number=="number"?Fe.number:null,pr_url:typeof Fe.url=="string"?Fe.url:void 0,external:G,usage:Bt(re,J),merge_step:te,badges:A?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:te?[de?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Y?[Ur(Y.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Ur(Y.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof de?.gate_badge=="string"&&de.gate_badge.length>0?[de.gate_badge]:[],alert:te?te.failed===!0:!!Y||Be,reason:Y&&te?.active!==!0?Js(Y.step):"PR \uB300\uAE30",merge_action:de?.tier==="merged"&&!Me&&!Ne?!1:!g||A,merge_enabled:!F&&(A||de?.enabled===!0||Ae||Me||Ne),merge_label:A?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ne||Me?"\uC815\uB9AC \uC7AC\uAC1C":Ae&&!Me?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:A?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":F?Xe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Xe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Xe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ne?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":de?.enabled===!0?`\uBA38\uC9C0 (${de.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${de?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:g&&!A,cancel_enabled:!O,continuation_mismatch:v?.mismatch||null,discard:Xe,discard_action:Xe.action,discard_enabled:Xe.enabled,discard_title:Xe.title})}let $e=(W,J,Te,Fe)=>{let de=W&&W.bead_id;if(typeof de!="string"||ze.has(de))return null;ze.add(de);let g=ot[de],v=lr(me,de),A=v.operation?v:null,O={...De(de),lane:J,draggable:!A,discard:A||void 0,reason:Wc(Oe,de),queue_position:Te+1,queue_index:Te,queue_length:Fe,badges:g?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!g,revise_action:!!g,revise_enabled:!!g&&!A,revise_title:g?g.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${g.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Le,de)&&(O.blocked_by=Array.isArray(Le[de])?Le[de].filter(G=>typeof G=="string"&&G.length>0):[]),O};for(let W=0;W<je.length;W++){let J=$e(je[W],"queue",W,je.length);if(!J)continue;f.push(J);let Te=R.get(j);Te?Te.push(J):R.set(j,[J])}let rt=[];for(let W=0;W<We.length;W++){let J=We[W],Te=[];for(let de=0;de<J.entries.length;de++){let g=$e(J.entries[de],J.id,de,J.entries.length);g&&(Te.push(g),f.push(g))}if(Te.length===0)continue;let Fe=$t(ke[J.id]);rt.push({id:J.id,index:W,items:Te,occupied_by:Array.isArray(Fe.occupied_by)?Fe.occupied_by.filter(de=>typeof de=="string"):[],corrections:Array.isArray(Fe.corrections)?Fe.corrections.length:0,cycle:Fe.cycle===!0})}x.set(j,rt);let Je=Array.from({length:et},(W,J)=>{let Te=`s${J+1}`,Fe=H.get(Te),de=Fe&&Array.isArray(Fe.entries)?Fe.entries:[],g=$t(ke[Te]);return{id:Te,index:de.length,length:de.length,occupied_by:Array.isArray(g.occupied_by)?g.occupied_by.filter(v=>typeof v=="string"):[]}});for(let W of Array.isArray(k.runnable)?k.runnable:[]){let J=W&&W.bead_id;typeof J!="string"||ze.has(J)||(ze.add(J),i.push({...De(J),title:W.title||Re[J]||J,lane:"runnable",draggable:!0,reason:Wc(Oe,J),created_at:W.created_at??void 0,updated_at:W.updated_at??void 0,labels:Array.isArray(W.labels)?W.labels:[],spec_reviewer:typeof W.spec_reviewer=="string"?W.spec_reviewer:void 0,plan_state:W.plan_state==="approved"||W.plan_state==="authored"?W.plan_state:"none",workflow:W.route?{route:W.route,chips:{route:W.route}}:null,blocked:W.blocked===!0,...Array.isArray(W.blocked_by)?{blocked_by:W.blocked_by.filter(Te=>typeof Te=="string"&&Te.length>0)}:{},place_index:je.length,place_lanes:Je}))}for(let W of se){let J=W&&W.bead_id;if(typeof J!="string"||ze.has(J)||(ze.add(J),o!==void 0&&typeof W.added_at=="number"&&W.added_at<o))continue;let Te=H_(re,J);_.push({...De(J),lane:"done",done:!0,usage:Bt(re,J),done_at:typeof W.added_at=="number"?W.added_at:void 0,done_kind:Te&&typeof Te.done_kind=="string"?Te.done_kind:null})}}let D=new Map;s.forEach((k,j)=>{k&&typeof k.root_dir=="string"&&D.set(k.root_dir,j)});let V=r&&r.running_sort==="repo"?"repo":"started";c.sort((k,j)=>{if(V==="repo"){let ee=D.get(k.root_dir)??Number.MAX_SAFE_INTEGER,re=D.get(j.root_dir)??Number.MAX_SAFE_INTEGER;if(ee!==re)return ee-re}let oe=typeof k.started_at=="number"&&Number.isFinite(k.started_at)?k.started_at:null,ce=typeof j.started_at=="number"&&Number.isFinite(j.started_at)?j.started_at:null;return oe!==null&&ce!==null&&oe!==ce?oe-ce:oe===null&&ce!==null?1:oe!==null&&ce===null?-1:k.id.localeCompare(j.id)}),_.sort((k,j)=>(j.done_at??0)-(k.done_at??0));let K=s.length>0?s:n.map(k=>({root_dir:k&&k.root_dir,name:k&&k.name,auto_advance:k&&k.auto_advance,auto_merge:k&&k.auto_merge,slots:k&&k.slots,revision:k&&k.revision,runner_catalog:k&&k.runner_catalog})),U=[];for(let k of K){if(!k||typeof k.root_dir!="string")continue;let j=R.get(k.root_dir)||[],oe=x.get(k.root_dir)||[];U.push({root_dir:k.root_dir,name:k.name||k.root_dir,auto_advance:k.auto_advance===!0,auto_merge:k.auto_merge===!0,slots:typeof k.slots=="number"&&k.slots>=Un?k.slots:Un,revision:typeof k.revision=="number"?k.revision:0,runner_catalog:$t(k.runner_catalog),items:j,sublanes:{parallel:j,serial:oe},serial_lane_count:L.get(k.root_dir)||0})}let I={runnable:i,queue:f,queue_groups:U,running:c,pr_wait:u,done:_,automation:{total:U.length,both_on:U.filter(k=>k.auto_advance&&k.auto_merge).length}},S=pa(I);for(let k of y)S.has(k.id)||S.set(k.id,{root_dir:k.root_dir,workspace_name:k.workspace_name,lane:"done",state:"done"});for(let k of[...I.queue,...I.runnable]){if(!Object.hasOwn(k,"blocked_by"))continue;let j=S.get(k.id);k.blockers=(k.blocked_by||[]).map(oe=>xc(oe,j,S,s)),k.blocker_warnings=k.blockers.filter(oe=>oe.missing_internal).map(oe=>`\u26A0 \uC120\uD589 ${oe.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),k.blocker_warnings.length>0&&(k.alert=!0)}let P=Ac(I.queue_groups);for(let k of I.queue_groups)for(let j of k.sublanes.serial){let oe=P.get(Ec(k.root_dir,j.id));oe&&(j.cross_wait_peers=oe)}return I}function V_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<U_;return d`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${vt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":d`<span class="mon-beat__age"
          >${Pt(e,t)}</span
        >`}</span
  >`}function Wn(e){return d`<div class="mon-c__title">${e.title}</div>`}function zn(e){return d`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function ro(e){return e.workspace_name?d`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function ka(e){let t=kt(e.usage),r=Qt(e.usage);return t.length>0?t.map(n=>d`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?d`<span class="mon-c__usage" title=${nn(e.usage)}
        >${r}</span
      >`:""}function $a(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>d`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function K_(e){return d`<span class="mon-c__ops">
    ${e.run_state==="running"?d`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${va()}
        </button>`:d`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${ya()}
        </button>`}
    ${e.discard?.action?d`<button
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
    ${e.run_state==="failed"?d`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${qc()}
        </button>`:""}
  </span>`}function zc(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?d`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>d`<span
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
      </span>`)}function Hc(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?d`<div class="mon-blocker-warnings">
        ${t.map(r=>d`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function Gc(){return d`<span class="mon-link mon-popover-owner">
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
  </span>`}function Y_(e,t){let r=typeof e.started_at=="number"?ba(t-e.started_at):"";return d`${Wn(e)}
    <div class="mon-c__meta">
      ${$a(e)}${V_(e.last_event_at,t)}${zn(e)}${ro(e)}
      ${or(e)?d`<span class="mon-c__model">${or(e)}</span>`:""}
      ${Ar(e)?d`<span
            class="rtile__resumed"
            title=${Ar(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?d`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?d`<span class="mon-live__elapsed">${r}</span>`:""}
      ${ka(e)}${K_(e)}${vr(e)}
    </div>`}function Z_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Pt(e.updated_at);return d`${Wn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${zn(e)}
      ${n?d`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?d`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?d`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${gs(e.labels,null).map(c=>d`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${ro(e)}
      ${i?d`<span title=${`\uC218\uC815 ${vt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?d`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${zc(e)}
      <span class="mon-c__ops">
        ${Gc()}
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
            ${(e.place_lanes||[]).map(c=>d`<button
                  type="button"
                  class="mon-place__choice"
                  data-lane=${c.id}
                  data-place-index=${String(c.index)}
                  role="menuitem"
                  aria-label=${`${c.id} \xB7 ${c.occupied_by.length>0?`\uC810\uC720 ${c.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"} \xB7 \uB300\uAE30 ${c.length}`}
                >
                  <strong>${c.id}</strong
                  ><span
                    >${c.occupied_by.length>0?`\uC810\uC720 ${c.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"}
                    · 대기 ${c.length}</span
                  >
                </button>`)}
          </span>
        </span>
      </span>
    </div>
    ${Hc(e)}`}function X_(e){let t=!!e.discard?.operation;return d`${Wn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${zn(e)}
      ${$a(e)}
      ${e.reason?d`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${zc(e)}
      <span class="mon-c__ops">
        ${Gc()}
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
        ${t?d`<button
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
    ${Hc(e)} ${vr(e)}
    ${e.revise_action?d`<div class="mon-c__tail">
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
        </div>`:""}`}function Q_(e){let t=e.merge_step||null,r=!!(Qt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return d`${Wn(e)}
    <div class="mon-c__meta">
      ${zn(e)}${ro(e)}
      ${e.pr_url&&e.pr_number?d`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${$a(e)}
      ${e.reason?d`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?d`<div class="mon-c__tail">
          ${ka(e)}${t?d`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?d`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
          ${e.merge_action?d`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?d`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?d`<button
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
        </div>`:""}`}function J_(e,t){let r=e.done_kind||"",n=r?W_[r]||r:"",s=Pt(e.done_at,t);return d`${Wn(e)}
    <div class="mon-c__meta">
      ${zn(e)}${ro(e)}
      ${n?d`<span
            class="mon-live__kind${z_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${ka(e)}
      ${s?d`<span title=${`\uC644\uB8CC ${vt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Vc(e,t){return e.lane==="running"?Y_(e,t):e.lane==="runnable"?Z_(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?X_(e):e.lane==="pr_wait"?Q_(e):J_(e,t)}function Kc(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return d`<header
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
        ${e.auto_advance?va():ya()}
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
        ${Fc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${jc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Un}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Yc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=sr.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return d`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Nc():Bc()}
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
        ${sr.map(i=>d`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>d`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Zc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Xc(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return kt($s(t));let r={};for(let i of _r)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let f of _r){let _=c[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Qt(r):null}var Qc="bdui.monitor.done-range",Jc="bdui.monitor.running_sort",ed="beads-ui.monitor.candidate-filter",xa={show_blocked:!1};function em(){try{let e=window.localStorage.getItem(ed);if(!e)return{...xa};let t=JSON.parse(e);return!t||typeof t!="object"?{...xa}:{show_blocked:t.show_blocked===!0}}catch{return{...xa}}}function tm(e){try{window.localStorage.setItem(ed,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function rm(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function nm(){try{let e=window.localStorage.getItem(Qc);return jt(e)?e:Mt}catch{return Mt}}function sm(e){try{window.localStorage.setItem(Qc,e)}catch{}}function om(){try{return window.localStorage.getItem(Jc)==="repo"?"repo":"started"}catch{return"started"}}function am(e){try{window.localStorage.setItem(Jc,e)}catch{}}var td="tab:monitor:pipeline",im=1e3,lm=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function no(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return d`<div
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
    ${Vc(e,t)}
  </div>`}function cm(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?d`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>no(s,t))}
        </div>
      </section>`:d`<div class="mon-group__list">
        ${e.items.map(s=>no(s,t))}
      </div>`;return d`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${Kc(e)} ${n}
    ${r?e.sublanes.serial.map(s=>d`<section
              class="mon-sublane mon-sublane--serial"
              data-serial-lane=${s.id}
            >
              <header class="mon-sublane__hd">
                <span class="mon-sublane__name">${s.id}</span>
                <span class="mon-sublane__count"
                  >대기 ${s.items.length}</span
                >
                ${s.occupied_by.length>0?d`<span class="mon-sublane__held"
                      >${`\u25CF \uC810\uC720 \uC911 \xB7 ${s.occupied_by.join(", ")} (\uBA38\uC9C0\uAE4C\uC9C0 \uC720\uC9C0)`}</span
                    >`:""}
                ${s.corrections>0?d`<span class="mon-sublane__corrections"
                      >순서 자동 교정 ${s.corrections}건</span
                    >`:""}
                ${s.cross_wait_peers?.map(o=>d`<span class="mon-sublane__cross-wait"
                      >⚠ 상호 정지 — ${o.workspace_name}·${o.lane}과 교차
                      대기</span
                    >`)}
              </header>
              ${s.cycle?d`<div class="mon-sublane__cycle">
                    ⛔ 의존 사이클 — 자동 교정 불가
                  </div>`:""}
              <div class="mon-group__list">
                ${s.items.map(o=>no(o,t))}
              </div>
            </section>`):""}
  </div>`}function rd(e,t){let r=ft("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,c=t.now||(()=>Date.now()),u=t.confirm||(g=>typeof globalThis.confirm!="function"||globalThis.confirm(g)),f=nm(),_=om(),y=em();function R(){let g=sr.find(v=>v.value===f);return g?g.label:""}let x=document.createElement("div");x.className="mon",e.appendChild(x);let L=wa(null,null),D=new Map,V=null,K=null;async function U(g,v,A,O,G=!0){if(!o||!A)return null;let Y=await o(g,{...v,root_dir:A,expected_revision:O});if(Y&&Y.conflict&&G){Y.queue&&D.set(A,Y.queue);let ne=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:O;Y=await o(g,{...v,root_dir:A,expected_revision:ne})}return Y&&Y.queue&&A&&D.set(A,Y.queue),Y}function I(g,v){let A=D.get(g),O=s&&s.get?s.get():null,G=(Array.isArray(O)?O:[]).find(ne=>ne?.root_dir===g);return(A||G)?.merge_queue?.find(ne=>ne.bead_id===v)?.continuation_action}async function S(g,v,A,O){let G=await U(g,v,A,O),Y=D.get(A)?.revision??G?.queue?.revision??O;return fr(G,(ne,te)=>U(g,{...v,continuation:ne,decision_token:te},A,Y,!1),{refresh:ne=>U(g,v,A,ne?.queue?.revision??D.get(A)?.revision??Y,!1)})}async function P(g,v,A,O){let G=await fr({continuation_mismatch:O},(ne,te)=>U("worker-merge-queue-add",{bead_id:v,continuation:ne,decision_token:te},g,A,!1)),Y=G?.queue?.merge_queue?.find(ne=>ne.bead_id===v)?.continuation_action;G?.applied!==!0&&Y?.continuation===null&&Y.mismatch&&await P(g,v,G.queue.revision,Y.mismatch)}async function k(g,v,A){let O=await U("worker-discard",g,v,A);if(O&&O.discarded===!0){ie(Xs(O),"success",5e3);return}if(O&&O.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${O.reason}`,"error");return}if(O&&O.accepted&&O.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(O&&O.accepted){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${O.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}O&&!O.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function j(g,v,A){return!o||!A?null:await o(g,{...v,root_dir:A})}async function oe(g){if(!o||!g&&!u("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let v=await o("monitor-auto-toggle",{on:g}),A=v&&Array.isArray(v.failed)?v.failed:[];A.length>0&&ie(`\uC790\uB3D9\uD654 ${g?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${A.map(O=>O.root_dir).join(", ")}`,"error",3200)}async function ce(){let g=new Map;for(let v of L.pr_wait)g.has(v.root_dir)||g.set(v.root_dir,v.expected_revision);for(let[v,A]of g)await U("worker-merge-queue-add-all",{},v,A)}let ee=null,re=!1,Re=null;function st(){Re!==null&&clearTimeout(Re),Re=setTimeout(()=>{Re=null,re=!1},0)}function Oe(g){let v=g.target;return typeof v?.closest=="function"?v.closest(".mon-group"):null}function ot(g){let v=Oe(g);return!v||!ee?null:(v.getAttribute("data-root-dir")||"")===ee.root_dir?v:null}function it(){for(let g of Array.from(x.querySelectorAll(".mon-group--drag-over")))g.classList.remove("mon-group--drag-over")}function Ge(g){let v=g.target,A=typeof v?.closest=="function"?v.closest('.mon-card[draggable="true"]'):null;if(A){ee={bead_id:A.getAttribute("data-issue-id")||"",lane:A.getAttribute("data-lane")||"",root_dir:A.getAttribute("data-root-dir")||"",revision:Number(A.getAttribute("data-revision")||0)||0,queue_index:Number(A.getAttribute("data-queue-index")),queue_length:Number(A.getAttribute("data-queue-length")),place_index:Number(A.getAttribute("data-place-index"))},re=!0;try{g.dataTransfer?.setData("text/plain",ee.bead_id),g.dataTransfer&&(g.dataTransfer.effectAllowed="move")}catch{}}}function me(g){let v=ot(g);v&&(g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect="move"),v.classList.add("mon-group--drag-over"))}function Le(g){Oe(g)?.classList.remove("mon-group--drag-over")}function ue(){ee=null,it(),st()}function we(g){let v=ot(g),A=ee;if(ee=null,it(),!v||!A||!A.bead_id)return;g.preventDefault();let O=g.target,G=typeof O?.closest=="function"?O.closest('.mon-card[data-lane="queue"]'):null,Y=G&&v.contains(G)?Number(G.getAttribute("data-queue-index")):NaN;if(A.lane==="runnable"){let ge=Number.isFinite(Y)?Y:A.place_index;if(!Number.isFinite(ge))return;U("worker-queue-place",{bead_id:A.bead_id,index:ge},A.root_dir,A.revision);return}if(A.lane!=="queue"||G&&G.getAttribute("data-issue-id")===A.bead_id)return;let ne=A.queue_index,te=Number.isFinite(Y)?ne>Y?Y:Y-1:A.queue_length-1;!Number.isFinite(te)||te<0||te===ne||U("worker-queue-reorder",{bead_id:A.bead_id,to_index:te},A.root_dir,A.revision)}function ye(g){let v=rm(L.runnable,y),A={runnable:v.visible,queue:L.queue,running:L.running,pr_wait:L.pr_wait,done:L.done};return d`${Yc({automation:L.automation,counts:{running:L.running.length,queue:L.queue.length,pr_wait:L.pr_wait.length},running_sort:_,done_range:f,token_total:Xc(L.done),token_tooltip:Zc(R())})}
      <div class="worker-lanes mon-lanes">
        ${lm.map(O=>{let G=A[O.lane],Y=O.lane==="queue"?L.queue_groups.length>0?d`${L.queue_groups.map(ne=>cm(ne,g))}`:void 0:G.length>0?d`${G.map(ne=>no(ne,g))}`:void 0;return rr({id:`monitor-${O.lane}`,lane:O.pane,title:O.lane==="done"?`\uC644\uB8CC\xB7${R()}`:O.title,items:G,empty:O.empty,body:Y,live:O.lane==="running"&&G.length>0,header_control:O.lane==="runnable"?d`<span class="mon-candidate-filter">
                    <label
                      class="worker-filter__tgl"
                      title="blocked 이슈 표시 (기본 숨김)"
                    >
                      <input
                        type="checkbox"
                        class="mon-filter__blocked"
                        .checked=${y.show_blocked}
                      />
                      🔒 blocked
                    </label>
                    ${v.hidden_blocked>0?d`<span class="worker-filter__hidden"
                          >숨김 ${v.hidden_blocked}건</span
                        >`:""}
                  </span>`:O.lane==="pr_wait"&&G.length>0?d`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function qe(){let g=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],A=c();L=wa(g,v,{done_since:Pr(f,A),running_sort:_}),Ke(ye(A),x)}function he(g,v){let A=a?a():void 0;if(!v||!A||v===A||!i){n(g);return}i(v).then(()=>{n(g)}).catch(O=>{r("workspace switch for %s failed: %o",v,O)})}function je(g){return{root_dir:g.getAttribute("data-root-dir")||"",revision:Number(g.getAttribute("data-revision")||0)||0}}function We(g){if(typeof g=="string"&&g.length>0)return g;if(g&&typeof g=="object"){let v=g;if(typeof v.message=="string"&&v.message.length>0)return v.message;if(typeof v.error=="string"&&v.error.length>0)return v.error;if(v.error&&typeof v.error=="object"&&typeof v.error.message=="string")return v.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function ke(g,v){let A=g.querySelector(".mon-link__trigger"),O=g.querySelector(".mon-link__popover"),G=g.querySelector(".mon-link__error");!A||!O||!G||(Ie(),O.hidden=!1,A.setAttribute("aria-expanded","true"),G.textContent=v,G.hidden=!1)}async function et(g,v,A){let O=v.getAttribute("data-root-dir")||"",G=v.getAttribute("data-issue-id")||"";if(!(!G||!A||A===G))try{await j(g,{a:G,b:A},O),Ie()}catch(Y){ke(v,We(Y))}}function H(g,v){let{root_dir:A,revision:O}=je(g),G=g.getAttribute("data-issue-id")||"",Y=v.dataset.attemptId||g.getAttribute("data-attempt-id")||"",ne=v.classList;if(ne.contains("mon-link__trigger")){ze(v);return}if(ne.contains("mon-link__candidate")||ne.contains("mon-link__direct")){let te=v.dataset.targetId||"";et("dep-add",g,te);return}if(ne.contains("mon-blocker__remove")){let te=v.dataset.blockerId||"";et("dep-remove",g,te);return}if(ne.contains("mon-place__choice")){let te=v.dataset.lane||"parallel",ge=Number(v.dataset.placeIndex||0)||0;Ie(),U("worker-queue-place",{bead_id:G,...te==="parallel"?{}:{lane:te},index:ge},A,O);return}if(ne.contains("worker-card__place")){De(v);return}if(ne.contains("mon-op--up")||ne.contains("mon-op--down")){let te=Number(g.getAttribute("data-queue-index")||0)||0,ge=ne.contains("mon-op--up")?te-1:te+1;if(ge<0)return;U("worker-queue-reorder",{bead_id:G,.../^s[1-5]$/.test(g.dataset.lane||"")?{lane:g.dataset.lane}:{},to_index:ge},A,O);return}if(ne.contains("mon-op--remove")){U("worker-queue-remove",{bead_id:G},A,O);return}if(ne.contains("mon-op--pause")){j("worker-attempt-pause",{attempt_id:Y},A);return}if(ne.contains("mon-op--discard")){if(!u(qn(G,"unmerged")))return;k({bead_id:G,...Y?{attempt_id:Y}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},A,O);return}if(ne.contains("mon-op--resume")){tn().then(te=>{if(te!==null)return S("worker-attempt-resume",{attempt_id:Y,...te!==""?{instructions:te}:{}},A,O)});return}if(ne.contains("mon-op--dismiss")){U("worker-attempt-dismiss",{attempt_id:Y},A,O);return}if(ne.contains("worker-mini__merge")){let te=I(A,G);te?.mismatch&&te.continuation===null?P(A,G,O,te.mismatch):U("worker-merge-queue-add",{bead_id:G},A,O);return}if(ne.contains("worker-mini__merge-cancel")){U("worker-merge-queue-remove",{bead_id:G},A,O);return}if(ne.contains("worker-mini__discard")){let te=v.dataset.discardMode==="merged"?"merged":"unmerged";if(!u(qn(G,te)))return;k({bead_id:G,...Y?{attempt_id:Y}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},A,O);return}if(ne.contains("worker-mini__revise-fix")){S("worker-revise-fix",{bead_id:G},A,O);return}ne.contains("worker-mini__revise-approve")&&U("worker-revise-approve",{bead_id:G},A,O)}function q(g){g.querySelector(".mon-link__list")?.replaceChildren();let A=g.querySelector(".mon-link__search");A&&(A.value="");let O=g.querySelector(".mon-link__direct");O&&(O.hidden=!0,O.dataset.targetId="",O.textContent="");let G=g.querySelector(".mon-link__empty");G&&(G.hidden=!0);let Y=g.querySelector(".mon-link__error");Y&&(Y.hidden=!0,Y.textContent="")}function se(g,v){let A=g.querySelector(".mon-link__list");if(!A)return;let O=document.createDocumentFragment(),G=Sc(L).filter(Y=>Y.id!==v);for(let Y of G){let ne=document.createElement("button");ne.type="button",ne.className="mon-link__candidate",ne.dataset.targetId=Y.id,ne.dataset.search=`${Y.id} ${Y.title} ${Y.location}`.toLocaleLowerCase();let te=document.createElement("strong");te.textContent=Y.id;let ge=document.createElement("span");ge.textContent=Y.title;let Ae=document.createElement("small");Ae.textContent=Y.location,ne.append(te,ge,Ae),O.append(ne)}A.replaceChildren(O)}function Ie(){for(let g of Array.from(x.querySelectorAll(".mon-card-popover"))){let v=g;v.hidden=!0,v.classList.contains("mon-link__popover")&&q(v)}for(let g of Array.from(x.querySelectorAll('[aria-expanded="true"]')))g.setAttribute("aria-expanded","false")}function De(g){let A=g.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!A)return;let O=A.hidden;Ie(),O&&(A.hidden=!1,g.setAttribute("aria-expanded","true"))}function ze(g){let A=g.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!A)return;let O=A.hidden;if(Ie(),O){let G=g.closest(".mon-card");se(A,G?.getAttribute("data-issue-id")||""),A.hidden=!1,g.setAttribute("aria-expanded","true");let Y=A.querySelector(".mon-link__search");Y&&($e(Y),Y.focus())}}function $e(g){let v=g.closest(".mon-link__popover"),A=g.closest(".mon-card");if(!v||!A)return;let O=g.value.trim(),G=O.toLocaleLowerCase(),Y=0,ne=!1;for(let Ne of Array.from(v.querySelectorAll(".mon-link__candidate"))){let Be=Ne,Xe=Be.dataset.targetId||"",F=G.length===0||(Be.dataset.search||"").includes(G);Be.hidden=!F,F&&(Y+=1),Xe.toLocaleLowerCase()===G&&(ne=!0)}let te=v.querySelector(".mon-link__direct"),ge=A.getAttribute("data-issue-id")||"";if(te){let Ne=O.length>0&&!ne&&G!==ge.toLocaleLowerCase();te.hidden=!Ne,te.dataset.targetId=Ne?O:"",te.textContent=Ne?`\uC9C1\uC811 \uC785\uB825 \xB7 ${O}`:"",Ne&&(Y+=1)}let Ae=v.querySelector(".mon-link__empty");Ae&&(Ae.hidden=Y>0);let Me=v.querySelector(".mon-link__error");Me&&(Me.hidden=!0,Me.textContent="")}function rt(g){let v=g.target;v&&x.contains(v)&&typeof v.closest=="function"&&v.closest(".mon-popover-owner")||Ie()}function Je(g){if(g.key!=="Escape")return;let v=x.querySelector('[aria-expanded="true"]');Ie(),v?.focus()}function W(g){let v=re;re=!1;let A=g.target;if(!A||typeof A.closest!="function"||A.closest("dialog")||A.closest("a"))return;let O=A.closest(".mon-running-sort");if(O){g.preventDefault(),_=O.getAttribute("data-sort")==="repo"?"repo":"started",am(_),qe();return}let G=A.closest(".mon-auto-all");if(G){g.preventDefault(),oe(G.getAttribute("data-on")==="true");return}if(A.closest(".mon-merge-all")){g.preventDefault(),ce();return}let ne=A.closest(".mon-ctl--advance");if(ne){g.preventDefault();let{root_dir:Ne,revision:Be}=je(ne);U("worker-automation-toggle",{on:ne.getAttribute("data-on")==="true"},Ne,Be);return}let te=A.closest(".mon-ctl--merge-auto");if(te){g.preventDefault();let{root_dir:Ne,revision:Be}=je(te);U("worker-merge-auto-toggle",{on:te.getAttribute("data-on")==="true"},Ne,Be);return}let ge=A.closest(".mon-card");if(!ge)return;let Ae=A.closest("button");if(Ae){g.preventDefault(),H(ge,Ae);return}let Me=ge.getAttribute("data-issue-id");Me&&!v&&(g.preventDefault(),he(Me,ge.getAttribute("data-root-dir")||""))}function J(g){let v=g.target;if(!v||typeof v.closest!="function")return;let A=v.closest(".mon-filter__blocked");if(A){y={show_blocked:A.checked},tm(y),qe();return}let O=v.closest(".mon-done-range");if(O){f=jt(O.value)?O.value:Mt,sm(f),qe();return}let G=v.closest(".mon-slots__input");if(!G)return;let{root_dir:Y,revision:ne}=je(G),te=Number(G.value);if(!Number.isFinite(te))return;let ge=Math.max(Un,Math.floor(te));U("worker-queue-set-slots",{slots:ge},Y,ne)}function Te(g){let v=g.target;v?.classList.contains("mon-link__search")&&$e(v)}e.addEventListener("click",W),e.addEventListener("change",J),e.addEventListener("input",Te),e.addEventListener("dragstart",Ge),e.addEventListener("dragover",me),e.addEventListener("dragleave",Le),e.addEventListener("drop",we),e.addEventListener("dragend",ue),document.addEventListener("click",rt),document.addEventListener("keydown",Je),s&&typeof s.subscribe=="function"&&(V=s.subscribe(()=>{try{D.clear(),qe()}catch{}}));function Fe(){K!==null&&(clearInterval(K),K=null)}function de(){Re!==null&&(clearTimeout(Re),Re=null)}return{load(){r("load"),qe(),K===null&&(K=setInterval(()=>{try{if(x.querySelector(".mon-card-popover:not([hidden])"))return;qe()}catch{}},im))},pause(){Fe()},clear(){Fe(),de(),V&&(V(),V=null),e.removeEventListener("click",W),e.removeEventListener("change",J),e.removeEventListener("input",Te),e.removeEventListener("dragstart",Ge),e.removeEventListener("dragover",me),e.removeEventListener("dragleave",Le),e.removeEventListener("drop",we),e.removeEventListener("dragend",ue),document.removeEventListener("click",rt),document.removeEventListener("keydown",Je),e.replaceChildren()}}}function nd(e,t,r){let n=ft("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return d`
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
    `}function i(){Ke(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Ke(d``,e)}}}var sd=["bug","feature","task","epic","chore"];function od(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ad=["Critical","High","Medium","Low","Backlog"];function id(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),y=r.querySelector(".new-issue__close");function R(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let P of sd){let k=document.createElement("option");k.value=P,k.textContent=od(P),o.appendChild(k)}a.replaceChildren();for(let P=0;P<=4;P+=1){let k=document.createElement("option");k.value=String(P);let j=ad[P]||"Medium";k.textContent=`${P} \u2013 ${j}`,a.appendChild(k)}}R();function x(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function L(S){s.disabled=S,o.disabled=S,a.disabled=S,i.disabled=S,c.disabled=S,f.disabled=S,_.disabled=S,_.textContent=S?"Creating\u2026":"Create"}function D(){u.textContent=""}function V(S){u.textContent=S}function K(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let P=window.localStorage.getItem("beads-ui.new.priority");P&&/^\d$/.test(P)?a.value=P:a.value="2"}catch{o.value="",a.value="2"}}function U(){let S=o.value||"",P=a.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),P.length>0&&window.localStorage.setItem("beads-ui.new.priority",P)}async function I(){D();let S=String(s.value||"").trim();if(S.length===0){V("Title is required"),s.focus();return}let P=Number(a.value||"2");if(!(P>=0&&P<=4)){V("Priority must be 0..4"),a.focus();return}let k=String(o.value||""),j=String(c.value||""),oe={title:S};k.length>0&&(oe.type=k),String(P).length>0&&(oe.priority=P),j.length>0&&(oe.description=j),L(!0);try{await t("create-issue",oe)}catch{L(!1),V("Failed to create issue");return}U(),L(!1),x()}return r.addEventListener("cancel",S=>{S.preventDefault(),x()}),y.addEventListener("click",()=>x()),f.addEventListener("click",()=>x()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),I())}),n.addEventListener("submit",S=>{S.preventDefault(),I()}),{open(){n.reset(),D(),K();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var dm=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function um(e,t){return Eo(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function ld(e,t,r){return d`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?d`<div class="settings-dialog__empty">라벨 없음</div>`:d`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=um(n,e);return d`<button
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
  `}function cd(e,t,r){return d`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>d`<span class="settings-dialog__prefix">
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
  `}function dd(e,t){return d`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${dm.map(([r,n])=>d`<label class="settings-dialog__toggle">
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
  `}var pm=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Dt="";function Nt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ud(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(g=>ie(g,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="session",c=!1,u="",f={},_={},y=[],R=!1,x=null,L={},D="",V="",K=!1,U=!1,I=!1,S=null;function P(){let g=t.queueStore?.get();return Nt(g)?g.runner_catalog:null}function k(){let g=t.queueStore?.get();return Nt(g)&&Nt(g.execution_defaults)?g.execution_defaults:null}function j(){let g=t.implPresetStore?.get();return Nt(g)&&Array.isArray(g.presets)?g:null}async function oe(){R=!0,$e();try{let g=await r("get-session-defaults",{});f=Nt(g?.values)?{...g.values}:{},_={...f},y=Array.isArray(g?.warnings)?g.warnings:[]}catch(g){y=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${g instanceof Error?g.message:String(g)}`)}finally{R=!1,$e()}}async function ce(){let g=tc(f,_);if(Object.keys(g).length!==0){try{let v=await r("set-session-defaults",{values:g});f=Nt(v?.values)?{...v.values}:{},_={...f},y=Array.isArray(v?.warnings)?v.warnings:[]}catch(v){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${v instanceof Error?v.message:String(v)}`)}$e()}}function ee(g,v){v===Dt?delete _[g]:_[g]=v,$e(),ce()}async function re(){let g=t.queueStore?.get();if(!Nt(g))return;let v={orchestration_model:g.orchestration_model??null,orchestration_effort:g.orchestration_effort??null,orchestration_speed:g.orchestration_speed??null},A=rc(v,{...v,...L});if(Object.keys(A).length!==0){try{let O=await r("worker-queue-set-orchestration-defaults",{expected_revision:g.revision,values:A});if(O&&O.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}L={}}catch(O){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}$e()}}function Re(g,v){L[g]=v===Dt?null:v,$e(),re()}async function st(g){let v=t.queueStore?.get();if(!(!Nt(v)||g<1)){try{await r("worker-queue-set-slots",{expected_revision:v.revision,slots:g})}catch(A){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${A instanceof Error?A.message:String(A)}`)}$e()}}function Oe(){let g={};for(let v of Ql){let A=_[v];typeof A=="string"&&A.length>0&&(g[v]=A)}return g}async function ot(){let g=j();if(!g)return;let v=Oe();if(Object.keys(v).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let A=(g.presets||[]).find(G=>G.id===D),O=V.trim()||(A?A.name:"");if(!O){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=A?await r("impl-preset-update",{expected_revision:g.revision,id:A.id,name:O,settings:v}):await r("impl-preset-create",{expected_revision:g.revision,name:O,settings:v});if(G&&G.applied){if(V="",!A&&Array.isArray(G.presets)){let Y=G.presets.find(ne=>ne.name===O);D=Y?Y.id:D}$e()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),$e()}catch(G){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function it(){let g=j();if(!(!g||D.length===0))try{let v=await r("impl-preset-delete",{expected_revision:g.revision,id:D});v&&v.applied?(D="",$e()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),$e())}catch(v){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${v instanceof Error?v.message:String(v)}`)}}async function Ge(){let g=j();if(!(!g||D.length===0)){try{let v=await r("apply-impl-preset-global",{preset_id:D,expected_revision:g.revision});v&&v.applied?(f=Nt(v.values)?{...v.values}:{},_={...f},y=Array.isArray(v.warnings)?v.warnings:[]):v&&v.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(v){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${v instanceof Error?v.message:String(v)}`)}$e()}}async function me(){U=!0,I=!1,$e();try{let g=await r("get-worker-system-prompt",{});!g||typeof g!="object"||Array.isArray(g)?I=!0:S=g}catch{I=!0}finally{U=!1,$e()}}function Le(){if(K=!K,K&&!S){me();return}$e()}function ue(){let g=on({loading:U,error:I});if(g)return g;if(!S)return"";let v=Array.isArray(S.variants)?S.variants:[];return d`<div class="settings-dialog__sp-body">
      ${S.target_base_placeholder?d`<div class="prompt-block__meta">
            \`${S.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${v.map(A=>d`<div class="settings-dialog__sp-variant" data-variant=${A.key}>
            <div class="settings-dialog__sp-cond">${A.condition}</div>
            ${hr(A.label,A.system_prompt)}
          </div>`)}
    </div>`}function we(){return d`<section
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
        @click=${Le}
      >
        ${K?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${K?ue():""}
    </section>`}function ye(g,v,A,O,G,Y){let ne=G[g]??Dt,te=na(g,A,G,k(),P()),ge=te.options.find(Me=>Me.value===ne),Ae=ne===Dt?te.full_value:ge?.full_value;return d`<select
        class=${ne===Dt?"settings-dialog__unset":""}
        data-key=${g}
        aria-label=${v}
        title=${Ae||""}
        ?disabled=${Y===!0||te.disabled}
        .value=${Br(String(ne))}
        @change=${Me=>O(g,String(Me.target.value))}
      >
        <option value=${Dt} ?selected=${ne===Dt}>
          ${te.unset_label}
        </option>
        ${te.options.map(Me=>d`<option
              value=${Me.value}
              title=${Me.full_value||""}
              ?selected=${Me.value===ne}
            >
              ${Me.label}
            </option>`)}
      </select>
      ${ne===Dt?d`<span class="settings-dialog__source-badge">기본</span>`:""}`}function qe(g,v,A,O,G,Y=!1){return d`<div
      class=${`settings-dialog__row${Y?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${v}</span>
      <span class="settings-dialog__controls">
        ${ye(g,v,A,O,G,Y)}
      </span>
    </div>`}function he(g,v,A,O,G){return d`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${v}-on)`}
        ></i>
        ${g}
      </span>
      <span class="settings-dialog__controls">
        ${ye(A,`${g} \uBAA8\uB378`,O,ee,_,!1)}
        ${ye(G,`${g} effort`,Ws,ee,_,!1)}
      </span>
    </div>`}function je(){let g=P(),v=ec(_),A=_.impl_runtime,O=_.impl_model,G=j(),Y=k()?.supported===!0,ne=na("workflow_mode",Pn,_,k(),g);return d`
      <section
        class=${`settings-dialog__pane${i==="session"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-session"
        aria-label="세션 기본값"
      >
        <header class="settings-dialog__pane-head"><h2>세션 기본값</h2></header>
        <p class="settings-dialog__pane-sub">
          모든 세션(터미널 대화형 포함)이 따르는 전역 기본값입니다. 이슈에 핀이
          있으면 핀이 우선합니다.
        </p>
        ${y.length>0?d`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${y.join(", ")}
            </div>`:""}
        ${Y?"":d`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${R?d`<div class="settings-dialog__empty">불러오는 중…</div>`:d`
              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Dt}
                        aria-pressed=${String(!_.workflow_mode)}
                        @click=${()=>ee("workflow_mode",Dt)}
                      >
                        ${ne.unset_label}
                      </button>
                      ${_.workflow_mode?"":d`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Pn.map(te=>d`<button
                            type="button"
                            data-mode=${te}
                            aria-pressed=${String(_.workflow_mode===te)}
                            @click=${()=>ee("workflow_mode",te)}
                          >
                            ${te}
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
                ${he("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Dn,"spec_review_effort")}
                ${he("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Us,"plan_review_effort")}
                ${he("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Dn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${qe("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",js,ee,_)}
                ${qe("impl_runtime","\uC704\uC784 \uB300\uC0C1",Bs,ee,_,v)}
                ${qe("impl_model","\uBAA8\uB378",zs(g,A),ee,_,v)}
                ${qe("impl_effort","effort",an(g,A,O),ee,_,v)}
                ${qe("impl_speed","\uC18D\uB3C4",Mn,ee,_,v)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Br(D)}
                  @change=${te=>{D=String(te.target.value),$e()}}
                >
                  <option value="" ?selected=${D===""}>
                    구현 프리셋…
                  </option>
                  ${(G?.presets||[]).map(te=>d`<option
                        value=${te.id}
                        ?selected=${te.id===D}
                      >
                        ${te.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${D.length===0}
                  @click=${Ge}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${D?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Br(V)}
                  @input=${te=>{V=String(te.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${ot}
                >
                  ${D?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${D.length===0}
                  @click=${it}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function We(){let g=t.queueStore?.get(),v=P(),A={orchestration_model:L.orchestration_model??(Nt(g)?g.orchestration_model:null),orchestration_effort:L.orchestration_effort??(Nt(g)?g.orchestration_effort:null),orchestration_speed:L.orchestration_speed??(Nt(g)?g.orchestration_speed:null)},O=Hs(v,x),G=an(v,x||void 0,A.orchestration_model||ir).filter(ne=>ne!==ir),Y=Nt(g)&&typeof g.slots=="number"?g.slots:2;return d`
      <section
        class=${`settings-dialog__pane${i==="worker"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-worker"
        aria-label="Worker 설정"
      >
        <header class="settings-dialog__pane-head"><h2>Worker 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          Worker가 세션을 띄울 때 쓰는 오케스트레이션 설정과 동시 실행 수입니다.
        </p>
        ${k()?.supported!==!0?d`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`:""}
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">오케스트레이션</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">런타임</span>
            <span class="settings-dialog__controls">
              <select
                aria-label="런타임"
                data-key="orchestration_runtime_filter"
                .value=${Br(x||Dt)}
                @change=${ne=>{let te=String(ne.target.value);x=te===Dt?null:te,$e()}}
              >
                <option value=${Dt} ?selected=${!x}>
                  전체
                </option>
                <option
                  value="claude"
                  ?selected=${x==="claude"}
                >
                  claude
                </option>
                <option
                  value="codex"
                  ?selected=${x==="codex"}
                >
                  codex
                </option>
              </select>
              <span class="settings-dialog__hint">모델 목록을 좁힙니다</span>
            </span>
          </div>
          ${qe("orchestration_model","\uBAA8\uB378",O,Re,A)}
          ${qe("orchestration_effort","effort",G,Re,A)}
          ${qe("orchestration_speed","\uC18D\uB3C4",Mn,Re,A)}
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
                  @click=${()=>st(Y-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${Y}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>st(Y+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${we()}
      </section>
    `}function ke(){let g=n.get();return d`
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
        ${g?d`
              ${ld(g,s(),se)}
              ${cd(g,u,{onDraft:v=>{u=v},onAdd:Ie,onRemove:De})}
              ${dd(g,ze)}
            `:d`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function et(g){let v=n.get();if(v)try{let A=await r("display-policy-set",{expected_revision:v.revision,policy:g(v)});H(A),A&&A.conflict&&A.policy&&(A=await r("display-policy-set",{expected_revision:A.policy.revision,policy:g(A.policy)}),H(A)),A&&A.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function H(g){g&&g.policy&&typeof g.policy=="object"&&n.set(g.policy)}function q(g){et(g)}function se(g){let v=n.get();if(!v)return;let A=!fm(g,v);q(O=>_m(g,O,A))}function Ie(){let g=u.trim();g.length!==0&&(u="",q(v=>v.hidden_prefixes.includes(g)?{hidden_prefixes:v.hidden_prefixes}:{hidden_prefixes:[...v.hidden_prefixes,g]}),$e())}function De(g){q(v=>({hidden_prefixes:v.hidden_prefixes.filter(A=>A!==g)}))}function ze(g){let v=n.get();if(!v)return;let A=v.chips[g]===!1;q(()=>({chips:{[g]:A}}))}function $e(){Ke(d`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${pm.map(g=>d`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${g.id}
                  aria-selected=${String(i===g.id)}
                  aria-controls=${`settings-pane-${g.id}`}
                  @click=${()=>rt(g.id)}
                >
                  <span class="settings-dialog__glyph">${g.glyph}</span>
                  ${g.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${de}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${je()} ${We()} ${ke()}
          </div>
        </div>
      `,a)}function rt(g){i=g,$e()}let Je=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",Je),a.addEventListener("cancel",Je);let W=g=>{g.target===a&&de()};a.addEventListener("click",W);let J=null;n.subscribe&&(J=n.subscribe(()=>{c&&$e()}));let Te=null;t.implPresetStore?.subscribe&&(Te=t.implPresetStore.subscribe(()=>{c&&$e()}));function Fe(g="session"){c||(c=!0,t.onOpenChange?.(!0),i=g,u="",L={},$e(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),oe())}function de(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Fe,close:de,sessionDraft:()=>({..._}),destroy(){c=!1,a.removeEventListener("close",Je),a.removeEventListener("cancel",Je),a.removeEventListener("click",W),J&&(J(),J=null),Te&&(Te(),Te=null),a.remove()}}}function fm(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function _m(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var mm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function pd(e){return String(e).padStart(2,"0")}function gm(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function bm(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${pd(n.getHours())}:${pd(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${mm[n.getMonth()]} ${n.getDate()} ${o}`;return`${gm(r,t)} \xB7 ${i}`}function hm(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var fd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function _d(e){let t=!1,r=null,n=new Map;function s(){Ke(d``,e),e.hidden=!0}function o(){let c=fd.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();Ke(d`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let _=n.get(f.key),y=typeof _.ageSeconds=="number"&&_.ageSeconds>600,R=y?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return d`<span
            class="usage-meter__group${y?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${_.windows.map(x=>{let L=typeof x.pct=="number"&&Number.isFinite(x.pct)?x.pct:0,D=Math.min(100,Math.max(0,L)),K=`resets ${bm(x.resetsAt,u)}${y?` \xB7 ${R}`:""}`;return d`<span
                class="usage-meter__window ${hm(D)}"
                style=${`--progress: ${D}%`}
                title=${K}
              >
                <span class="usage-meter__label">${x.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${D}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function i(){let c=await Promise.all(fd.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function md(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var ym="worker-ineligible";function Aa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Sa(e){return Aa(e).includes(ym)}var vm="worker-serial";function Ea(e){return Aa(e).includes(vm)}function Ta(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var wm=new Set(["done","failed","orphaned","stopped","discarded"]),km={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},$m={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},xm={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ca(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:xm[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function gd(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,f=!1,_=null,y=null,R=null,x=new Set,L=!1,D=0,V=null,K=new Set;function U(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function I(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function S(){return o&&o()||""}async function P(){if(!s)return;let w=++D;L=!0,R=null,x.clear(),ge();try{let C=await s("worker-parallel-analysis-targets",{root_dir:S()});if(w!==D||!Ae)return;let M=Array.isArray(C?.qualified)?C.qualified:[],z=Array.isArray(C?.excluded)?C.excluded:[];R={qualified:M,excluded:z};for(let be of M)be&&typeof be.id=="string"&&x.add(be.id)}catch{w===D&&Ae&&(R={qualified:[],excluded:[]},ie("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{w===D&&(L=!1,Ae&&ge())}}function k(w){return Array.isArray(w.runs)?w.runs:[]}function j(){let w=U(),C=new Set;for(let M of Object.values(w.attempts||{})){let z=M;z&&typeof z.bead_id=="string"&&!wm.has(z.status)&&C.add(z.bead_id)}for(let M of Array.isArray(w.pr_wait)?w.pr_wait:[])M&&typeof M.bead_id=="string"&&C.add(M.bead_id);for(let M of Object.values(w.discard_operations||{})){let z=M;z&&z.phase!=="done"&&typeof z.bead_id=="string"&&C.add(z.bead_id)}return C}function oe(w){return w.filter(C=>ce(C)===null)}function ce(w){let C=U();for(let M of Array.isArray(C.serial_lanes)?C.serial_lanes:[])if(Array.isArray(M?.entries)&&M.entries.some(z=>z.bead_id===w))return M.id;return(Array.isArray(C.queue)?C.queue:[]).some(M=>M.bead_id===w)?"parallel":null}function ee(w,C){let M=c.get(w);return M||[...C.order]}function re(w){if(w.length<2)return!1;let C=ce(w[0]);if(!C||C==="parallel")return!1;let M=U(),z=(Array.isArray(M.serial_lanes)?M.serial_lanes:[]).find(ve=>ve.id===C)?.entries.map(ve=>ve.bead_id);if(!Array.isArray(z))return!1;let be=w.map(ve=>z.indexOf(ve));return be.every(ve=>ve>=0)&&be.every((ve,Z)=>Z===0||ve>be[Z-1])}function Re(){let w=U(),C=Array.isArray(w.serial_lanes)?w.serial_lanes:[],M=C.find(z=>Array.isArray(z.entries)&&z.entries.length===0);return M?M.id:C[0]?.id||"s1"}function st(w){let C=U().bead_titles||{};return typeof C[w]=="string"?C[w]:w}async function Oe(w,C){if(!s||f)return null;f=!0,ge();try{return await s(w,C)}finally{f=!1,ge()}}async function ot(w){n?.setPending?.(!0);try{let C=await Oe("worker-parallel-analysis-start",{force:w,target_ids:Array.from(x)});C&&C.applied===!1&&C.reason&&(C.reason==="target_not_qualified"&&Array.isArray(C.detail)?ie(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${C.detail.join(", ")}`,"error",3200):ie(`\uBD84\uC11D \uC2E4\uD328: ${C.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function it(){let w=I().job;!s||!w||await s("worker-parallel-analysis-cancel",{job_id:w.job_id})}async function Ge(w){if(!(!s||K.has(w))){K.add(w),ge();try{let C=await s("worker-parallel-analysis-prompt",{root_dir:S(),run_id:w});if(!Ae)return;if(C?.ok===!0&&typeof C.prompt=="string"){V={run_id:w,prompt:C.prompt};return}ie(C?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{K.delete(w),ge()}}}function me(){V=null,ge()}async function Le(){if(!V)return;let w=await Xt(V.prompt);ie(w?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",w?"success":"error",1400)}function ue(w,C){a&&a(w,Ca(C))}function we(){return U().runner_catalog}function ye(w){return Object.keys(we()?.runners?.[w]?.models||{})}function qe(w){let C=ye(w),M=we()?.runners?.[w]?.default_model;return typeof M=="string"&&C.includes(M)?M:C[0]||""}function he(){let w=I().settings,C=_||w.runner||"claude",M=ye(C),z=_?qe(C):w.model||M[0]||"",be=Ta(we(),C,z),ve=w.effort||"",Z=be.includes(ve)?ve:be[0]||"";return{runner:C,model:z,effort:Z,models:M,efforts:be}}async function je(w){let C=I().settings,M=await Oe("worker-parallel-analysis-settings-update",{expected_revision:C.revision,runner:w.runner,model:w.model,effort:w.effort});(!M||M.applied!==!0)&&(_=null,ge(),M&&M.reason&&ie(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${M.reason}`,"error",2800))}function We(w){_=w,ge();let C=he();je({runner:w,model:C.model,effort:C.effort})}function ke(w){let C=he(),M=Ta(we(),C.runner,w);je({runner:C.runner,model:w,effort:M.includes(C.effort)?C.effort:M[0]||""})}function et(w){let C=he();je({runner:C.runner,model:C.model,effort:w})}async function H(w,C){if(!s||f)return;let M=ee(w,C),z=I();if(M.length<2||!z.last_good){ie("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let be=u.get(w)||Re(),ve=()=>({snapshot_digest:z.last_good.identity_digest,group_index:w,lane:be,ordered_bead_ids:M,expected_revision:U().revision});f=!0,ge();try{let Z=await s("worker-parallel-analysis-submit",ve());Z&&Z.queue&&r&&r.set(Z.queue),Z&&Z.applied!==!0&&Z.conflict===!0&&(Z=await s("worker-parallel-analysis-submit",ve()),Z&&Z.queue&&r&&r.set(Z.queue)),Z&&Z.applied===!0?(c.delete(w),ie(`\uC9C1\uB82C \uB808\uC778 ${be}\uC5D0 ${M.length}\uAC1C \uBC30\uCE58`,"success")):ie(`\uC81C\uCD9C \uAC70\uBD80: ${Z?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{f=!1,ge()}}function q(w,C,M){c.set(w,ee(w,C).filter(z=>z!==M)),ge()}function se(w){c.delete(w),ge()}function Ie(w,C,M,z){let be=[...ee(w,C)],ve=be.indexOf(M),Z=ve+z;ve<0||Z<0||Z>=be.length||(be.splice(Z,0,...be.splice(ve,1)),c.set(w,be),ge())}function De(){let w=I().settings,C=Object.keys(we()?.runners||{}),M=he();return d`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${z=>We(z.target.value)}
        >
          ${C.map(z=>d`<option
                value=${z}
                ?selected=${M.runner===z}
              >
                ${z}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${z=>ke(z.target.value)}
        >
          ${M.models.map(z=>d`<option
                value=${z}
                ?selected=${M.model===z}
              >
                ${z}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${z=>et(z.target.value)}
        >
          ${M.efforts.map(z=>d`<option
                value=${z}
                ?selected=${M.effort===z}
              >
                ${z}
              </option>`)}
        </select>
      </label>
      ${ze(w)}
    </div>`}function ze(w){return!rt(w)||$e(w)?d`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:w.compatible===!1?d`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${w.runner}/${w.model} · effort
        ${w.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:w.is_default===!0?d`<span class="pa-settings__default">기본값</span>`:""}function $e(w){return w.is_default===!0&&w.compatible===!1}function rt(w){return!!(w.runner&&w.model&&w.effort)}function Je(w){return rt(w)&&w.compatible!==!1}function W(w){let C=Math.max(0,Math.floor(w/1e3)),M=Math.floor(C/60),z=C%60;return`${M}:${String(z).padStart(2,"0")}`}function J(w){let C=w.job;if(C){let M=typeof C.started_at=="number"?C.started_at:0,z=`${C.runner||"?"}/${C.model||"?"}`,be=M?` \xB7 \uACBD\uACFC ${W(Date.now()-M)}`:"",ve=typeof C.session_id=="string"?C.session_id:"",Z=k(w).find(tt=>tt.run_id===C.job_id);return d`<span class="pa-meta__progress">
        <span
          >분석 중 — ${z} · effort ${C.effort||"?"}${be}</span
        >
        ${ve?d`<code class="pa-session-id" title=${ve}
              >${ve.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ue(C.job_id,Z||C)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Z?.prompt_saved!==!0||K.has(C.job_id)}
          @click=${()=>{Ge(C.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Te()?d`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Te(){return n?.isPending?.()===!0}function Fe(w){let C=!!w.job,M=Je(w.settings),z=R!==null&&x.size===0,be=C||f||Te()||L;return d`<div class="pa-meta">
      ${w.last_good?d`<span class="pa-meta__at"
            >분석 ${new Date(w.last_good.at||0).toLocaleString()}</span
          >`:d`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${J(w)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!M||be||z}
        @click=${()=>{ot(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!M||be||z}
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
    </div>`}function de(w){return typeof w=="string"&&w.length>0?w:"\uBBF8\uBC30\uCE58"}function g(w,C){C?x.add(w):x.delete(w),ge()}function v(){let w=R?.qualified||[],C=R?.excluded||[];return d`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${L?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${w.length} \xB7 \uC81C\uC678 ${C.length}`}</span
        >
      </header>
      ${R&&w.length>0?d`<ul class="pa-targets__list">
            ${w.map(M=>d`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${M.id}
                      .checked=${x.has(M.id)}
                      @change=${z=>g(M.id,z.target.checked)}
                    />
                    <span class="pa-target__title">${M.title}</span>
                  </label>
                  <span class="pa-target__route">${M.route}</span>
                  <span class="pa-target__lane">${de(M.lane)}</span>
                </li>`)}
          </ul>`:R&&w.length===0?d`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${R&&C.length>0?d`<details class="pa-targets__excluded">
            <summary>제외 대상 ${C.length}</summary>
            <ul class="pa-targets__list">
              ${C.map(M=>d`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${M.title}</span>
                    </label>
                    <span class="pa-target__reason"
                      >${km[M.reason]||M.reason}</span
                    >
                    <span class="pa-target__lane"
                      >${de(M.lane)}</span
                    >
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function A(w){let C=typeof w.session_id=="string"&&w.session_id.length>0,M=C?w.session_id:"";return d`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${w.outcome}"
        >${$m[w.outcome]||w.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(w.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${w.runner||"?"} / ${w.model||"?"} / ${w.effort||"?"}</span
      >
      ${C?d`<code class="pa-session-id" title=${M}
            >${M.slice(0,8)}</code
          >`:d`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${w.outcome==="failure"&&w.reason?d`<span class="pa-run-row__reason">${w.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ue(w.run_id,w)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${w.prompt_saved!==!0||K.has(w.run_id)}
          @click=${()=>{Ge(w.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function O(w){return d`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${w.length>0?d`<ul class="pa-runs__list">
            ${w.map(C=>A(C))}
          </ul>`:d`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function G(){return V?d`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${me}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Le()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${me}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function Y(w,C){let M=ee(w,C),z=j(),be=M.filter(He=>z.has(He)),ve=oe(M),Z=re(M),tt=Array.isArray(U().serial_lanes)?U().serial_lanes:[],Se=u.get(w)||Re(),_t=C.eligible!==!0||M.length<2||be.length>0||ve.length>0||Z||f;return d`<section class="pa-group" data-group-index=${String(w)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${C.confidence}</span>
        ${C.categories.map(He=>d`<span class="pa-group__category">${He}</span>`)}
        ${Z?d`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${C.eligible===!0?"":d`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ve.length>0?d`<span class="pa-group__stale"
              >stale — ${ve.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${C.reason}</p>
      <ol class="pa-group__members">
        ${M.map((He,ht)=>d`<li class="pa-member" data-bead-id=${He}>
              <span class="pa-member__seq">${ht+1}</span>
              <span class="pa-member__title">${st(He)}</span>
              ${z.has(He)?d`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${He}
                ?disabled=${ht===0}
                aria-label=${`${He} \uC704\uB85C`}
                @click=${()=>Ie(w,C,He,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${He}
                ?disabled=${ht===M.length-1}
                aria-label=${`${He} \uC544\uB798\uB85C`}
                @click=${()=>Ie(w,C,He,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${He}
                aria-label=${`${He} \uC81C\uC678`}
                @click=${()=>q(w,C,He)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${C.evidence.map(He=>d`<li class="pa-evidence">
              <code>${He.path}</code>
              <span class="pa-evidence__locator">${He.locator}</span>
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
            @change=${He=>{u.set(w,He.target.value),ge()}}
          >
            ${tt.map((He,ht)=>d`<option
                  value=${He.id}
                  ?selected=${Se===He.id}
                >
                  직렬 ${ht+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${_t}
          @click=${()=>{H(w,C)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ne(w){let C=Array.isArray(w.issues)?w.issues:[],M=C.filter(be=>be.verdict==="parallel_ok").length,z=C.filter(be=>be.verdict==="uncertain").length;return d`<div class="pa-summary">
      <span>parallel_ok ${M}</span>
      <span>uncertain ${z}</span>
    </div>`}function te(){let w=Ae&&!!I().job;if(w&&y===null){y=setInterval(()=>ge(),1e3);return}!w&&y!==null&&(clearInterval(y),y=null)}function ge(){let w=I();_&&w.settings.runner===_&&(_=null);let C=w.last_good?.result;te(),Ke(d`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Q}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${De()} ${Fe(w)} ${v()}
            ${C?d`${C.groups.map((M,z)=>Y(z,M))}
                ${C.groups.length===0?d`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ne(C)}`:d`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${O(k(w))}
          </div>
        </div>
        ${G()}
      `,i)}let Ae=!1,Me=()=>{Ae=!1,V=null,D+=1,te()},Ne=w=>{w.target===w.currentTarget&&Q()};i.addEventListener("close",Me),i.addEventListener("cancel",Me),i.addEventListener("click",Ne);let Be=null;r&&r.subscribe&&(Be=r.subscribe(()=>{Ae&&ge()}));let Xe=null;n&&n.subscribe&&(Xe=n.subscribe(()=>{Ae&&ge()}));function F(){Ae||(Ae=!0,ge(),P(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Q(){Ae&&(Ae=!1,V=null,D+=1,te(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:F,close:Q,destroy(){Ae=!1,y!==null&&(clearInterval(y),y=null),i.removeEventListener("close",Me),i.removeEventListener("cancel",Me),i.removeEventListener("click",Ne),Be&&(Be(),Be=null),Xe&&(Xe(),Xe=null),i.remove()}}}var bd=new Set(["sh","bash","zsh","dash","ksh"]),hd=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function yd(e){let t=e.split("/");return t[t.length-1]||""}function Am(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=yd(r[0]);if(n!=="env")return bd.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&bd.has(yd(s))}function Sm(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Em(e){let t=[],r=0;hd.lastIndex=0;for(let n of e.matchAll(hd)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Sm(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Tm(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function vd(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",c=0,u=null,f=!1;function _(S,P){return P?Em(S).map(k=>k.kind==="plain"?k.text:d`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${k.kind}"
            >${k.text}</span
          >`):S}function y(){if(!s)return d``;let S=o==="ready"&&Am(a),P=o==="ready"?a.split(`
`):[];return d`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>U()}
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
              @click=${()=>{x()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>U()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?d`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?d`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:d`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${P.map((k,j)=>d`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${j+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(k,S)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function R(){Ke(y(),n)}async function x(){if(o!=="ready")return;let S=await Xt(a);ie(S?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",S?"success":"error")}function L(S){S.key==="Escape"&&s&&(S.preventDefault(),U())}function D(){f||(document.addEventListener("keydown",L),f=!0)}function V(){f&&(document.removeEventListener("keydown",L),f=!1)}async function K(S,P=null){let k=++c;D(),s={...S},u=P||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",R(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let oe=t?t():"";if(!oe){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",R();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",R();return}let ce="/api/repo-ops-script?workspace="+encodeURIComponent(oe)+"&lane="+encodeURIComponent(S.lane)+"&base_sha="+encodeURIComponent(S.base_sha);try{let ee=await r(ce),re=await ee.json().catch(()=>({}));if(k!==c)return;if((t?t():"")!==oe){U();return}if(!ee.ok||!re||re.ok!==!0){o="error",i=Tm(re&&typeof re.error=="string"?re.error:""),R();return}s={lane:re.lane,base_sha:re.base_sha,path:re.path,base_ref:re.base_ref},a=String(re.content),o="ready",R()}catch{if(k!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",R()}}function U(){c+=1,V(),s=null,a="",R();let S=u;u=null,S?.isConnected&&S.focus()}function I(){U(),n.remove()}return{open:K,close:U,destroy:I}}function wd(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let I=o();return typeof I.revision=="number"?I.revision:0}function i(I){t&&I&&I.queue&&typeof I.queue=="object"&&t.set(I.queue)}function c(){let I=o().workspace_info;return I&&typeof I=="object"?I:{}}function u(I,S){return d`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${I}"
      >${S}</span
    >`}function f(I){if(typeof I!="number"||!Number.isFinite(I))return"";let S=I/6e4;return Number.isInteger(S)?`timeout ${S}\uBD84`:`timeout ${Math.round(I/1e3)}\uCD08`}function _(I){let S=f(I);return S?u("config",S):""}function y(I,S,P){return d`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${P.script}
      @click=${k=>{s&&s({lane:I,base_sha:S.base_sha,path:P.script,base_ref:S.base_ref},k.currentTarget)}}
    ></button>`}function R(I){let S=typeof I.base_sha=="string"?I.base_sha:"",P=`${I.source_path||"repo-ops/config.toml"} @ ${I.base_ref||"?"}${S?`@${S.slice(0,7)}`:""}`;return d`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${P}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${I.verify?d`${y("verify",I,I.verify)}
              ${_(I.verify.timeout_ms)}`:d`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${I.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${I.deploy?d`${y("deploy",I,I.deploy)}
              ${_(I.deploy.timeout_ms)}`:d`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${I.deploy?d`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function x(I){let S=I.repo_ops&&typeof I.repo_ops=="object"?I.repo_ops:null;return S&&(S.status==="resolved"||S.status==="absent")?R(S):S&&(S.status==="pending"||S.status==="error")?d`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${S.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":d`선언 읽기
              실패${S.error_code?d` — <code>${S.error_code}</code>`:""}`}
        </div>
      </section>`:d`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function L(I){if(!r)return;let S=await r("worker-auto-repair-toggle",{on:I,expected_revision:a()});if(i(S),S&&S.conflict){let P=await r("worker-auto-repair-toggle",{on:I,expected_revision:a()});i(P)}n()}let D={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function V(I,S,P){return d`<div class="worker-repo-ops__policy-group" data-policy=${P}>
      <div class="worker-repo-ops__policy-label">${I}</div>
      <ul class="worker-repo-ops__policy-list">
        ${S.map(k=>d`<li data-token=${k}>
              ${D[k]||k}
            </li>`)}
      </ul>
    </div>`}function K(I){return d`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${I.map(S=>{let P=[D[S.trigger]||S.trigger];return Number.isInteger(S.attempts_per_operation_attempt)?P.push(`operation\uB2F9 ${S.attempts_per_operation_attempt}\uD68C`):Number.isInteger(S.attempts)?P.push(`${D[S.budget]||S.budget} ${S.attempts}\uD68C`):Number.isInteger(S.sessions_per_user_action)&&P.push(`${S.sessions_per_user_action}\uD68C`,D[S.user_actions]||S.user_actions),S.applies_when&&P.push(D[S.applies_when]||S.applies_when),d`<li data-token=${S.id}>
            <strong>${D[S.id]||S.id}</strong>
            <span>${P.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function U(){let I=o(),S=I.auto_repair!==!1,P=I.repo_operation_policy&&typeof I.repo_operation_policy=="object"?I.repo_operation_policy:null,k=Array.isArray(I.repo_operations)?I.repo_operations:[],j=k.find(re=>re.state==="repairing"),oe=k.filter(re=>re.state==="failed"||re.state==="repairing"),ce=oe.length?Math.min(...oe.map(re=>typeof re.repair?.remaining=="number"?re.repair.remaining:0)):P?.auto_repair?.resolution_ladder?.find(re=>re.id==="auto_repair_session")?.attempts??1,ee=Array.isArray(P?.auto_repair?.resolution_ladder)?P.auto_repair.resolution_ladder:[];return d`<section
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
          @change=${re=>{L(re.target.checked)}}
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
          >남은 자동 해결 ${ce}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${j?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${j.repair?.owner_bead||j.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${P?d`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(P.worker_automatic||[]).length} · 해결 사다리
                ${ee.length} · 금지
                ${(P.never_automatic||[]).length}</span
              >
            </summary>
            ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",P.worker_automatic||[],"worker-automatic")}
            ${P.supported===!1||P.schema_version!==2?d`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${P.schema_version})`}
                </div>`:K(ee)}
            ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",P.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return d`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${x(c())} ${U()}
      </details>`}}}var Cm=20,kd={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},$d={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Rm(e,t,r=Cm){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function xd(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Im(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Ad(e){let t=e.filter(r=>r.value);return t.length===0?"":d`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>d`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Sd(e,t="",r=!1){return!e&&!t?"":d`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?d`<br />${t}`:""}
  </p>`}function Lm(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return d`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn($d,n)?$d[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?d`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":d`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function Om(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return d`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?vt(e.at):""}
      >${Zs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${xd(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(kd,t.kind)?kd[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ks(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Ys(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${xd(e)}"
          >${Im(e)}</span
        >
        ${t.dismissed?d`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?d`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Sd(Mc(t.failure_kind,n)):""}
      ${Lm(t)}
      ${Ad([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ks(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Mm(e){let t=e.cleanup,r=Ur(t.step);return d`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?vt(e.at):""}
      >${Zs(e.at)||"\u2014"}</span
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
        ${Cc(t.step).map(n=>d`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Sd(to(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?d`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${Ad([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Pm(e){return d`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?d`<div class="worker-repo-drawer__empty">기록 없음</div>`:d`<ul class="worker-rail">
          ${e.events.map(t=>t.type==="cleanup"?Mm(t):Om(t))}
        </ul>`}
  </section>`}function Ed(e,t={}){let r=null;function n(){Ke(r?Pm(r):d``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Rm(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var Dm="tab:worker:ready",Nm="tab:worker:blocked",qm="tab:worker:in-progress",Fm="tab:worker:closed",so=1,Td=5;function Cd(e){return On(e).path.length>0}var Ld="beads-ui.worker.candidate-filter",Ra={show_blocked:!1,spec:"all"};function jm(){try{let e=window.localStorage.getItem(Ld);if(!e)return{...Ra};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ra};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Ra}}}function Bm(e){try{window.localStorage.setItem(Ld,JSON.stringify(e))}catch{}}function Um(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=r(i),u=n(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Wm=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Od="bdui.worker.candidate_sort",zm=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],oo="spec";function Hm(){try{let e=window.localStorage.getItem(Od);return e==="board"||e==="created"||e==="spec"?e:oo}catch{return oo}}function Gm(e){try{window.localStorage.setItem(Od,e)}catch{}}var Md="bdui.worker.done-range";function Vm(){try{let e=window.localStorage.getItem(Md);return jt(e)?e:Mt}catch{return Mt}}function Km(e){try{window.localStorage.setItem(Md,e)}catch{}}var Ym="(max-width: 640px)",Pd="beads-ui.worker.lane-collapsed",Hn={queue:!0,done:!0};function Zm(){try{let e=window.localStorage.getItem(Pd);if(!e)return{...Hn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Hn}:{queue:typeof t.queue=="boolean"?t.queue:Hn.queue,done:typeof t.done=="boolean"?t.done:Hn.done}}catch{return{...Hn}}}function Xm(e){try{window.localStorage.setItem(Pd,JSON.stringify(e))}catch{}}function Rd(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Qm(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Nr):(n.sort(ds(r)),t==="board"?n:[...n.filter(Cd),...n.filter(s=>!Cd(s))])}function Jm(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function eg(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function tg(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Id(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function rg(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function ng(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function sg(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function og(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Ia(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function ag(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function ig(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Id(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Id(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function lg(e,t,r,n,s=null,o=null,a=null,i=!1,c=null,u=!0,f=null,_=null,y=null,R={},x=!1,L=!1,D={}){let V=!!c&&c.position>0,K=!!c?.continuation_action&&c.continuation_action.continuation===null,U=!!c&&c.active===!0,I=c&&c.failure||null,S=ng(c?c.waiting:null,y),P=r[e]||null,k=P&&P.gate?P.gate:null,j=P&&P.pr?P.pr:null,oe=ag(y),ce=sg(c?c.resolution:null),ee=og(c?c.head_review:null),re=c&&c.head_review||null,Re=c&&c.authority||null,st=!!re&&["pending","reviewing","revising"].includes(re.state),Oe=V&&!U&&(re?.state==="failed"||!Re||Re.source==="automatic"&&!L),ot=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ce?ce.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":S,it=!!k&&k.base_badge==="\uCDA9\uB3CC",Ge=!!k&&k.enabled===!0,me=Bn({bead_id:e,merge_sha:D.merge_sha,cleanup_cursor:D.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:D.repo_operations}),Le=eo(me),ue=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!k&&k.tier==="merged",we=i&&!!n&&!!k&&k.tier==="merged",ye=Oe&&(Ge||it||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||ue||we),qe=i&&it&&u===!1,he=lr(R,e,{external:i,merge_active:U||me?.step==="merge",merge_queued:V,conflict_active:!!a,cleanup_active:Le,merged:!!n||k?.tier==="merged"}),je=!!he.operation,We=!ue&&!!n&&n.step==="repo_operations",ke=ig({continuation_required:K,merge_step:me,conflict_badge:ot,conflict_live:ce?.live===!0||a==="running",head_review:re&&ee?{...ee,state:re.state,failure_reason:re.failure_reason}:null,recovery:oe,cleanup_failed:n,cleanup_label:n?Ur(n.step):null,base_exception:_,conflicting:it,gate:k,queue_failure:I,auto_skip:f,queued:V,queue_active:U,queue_position:c?c.position:0,activity:ot?null:o&&o.activity||null}),et=ke?.live===!0&&ke.title?d`<span title=${ke.title}>${ke.label}</span>`:ke?.label||null;return{id:e,title:i?d`${t}<span class="muted"> · 세션</span>`:t,reason:n&&me?.active!==!0?Js(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:x,external:i,pr_number:j&&typeof j.number=="number"?j.number:null,pr_url:j&&typeof j.url=="string"?j.url:"",completion_badge:ke?.live!==!0&&ke?.title?ke.label:null,completion_title:ke?.title||"",completion_repair_pr_url:oe?oe.repair_pr_url:"",completion_repair_pr_number:oe?oe.repair_pr_number:null,badges:et?[et]:[],live_badge:ke?.live===!0?et:null,usage:s,alert:ke?.alert===!0,merge_action:k?.tier==="merged"&&!ue&&!we||We?!1:!V||K||Oe,timeline_action:We,cancel_action:V&&!K,cancel_enabled:(!U||st)&&!(oe&&oe.lock_actions),cancel_title:oe&&oe.lock_actions?`${oe.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:U&&!st?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":st?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:he,discard_action:he.action,merge_step:me,discard_enabled:he.enabled,discard_title:he.title,merge_enabled:!me&&!a&&!je&&!_&&!(oe&&oe.lock_actions)&&!qe&&!We&&(Ge||it||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||ue||we||ye),merge_label:K?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ue||we?"\uC815\uB9AC \uC7AC\uAC1C":it&&!me&&!ue?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":k?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Oe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:je?he.error?`\uD3D0\uAE30 \uC2E4\uD328: ${he.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${he.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:K?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${me.label}`:we?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":qe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":it?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ge?`\uBA38\uC9C0 (${k.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:k&&k.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${k&&k.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function La(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:_}=t,y=n?ps(n,i):null,R=_s({transport:r,uiOrderStore:i}),x=null,L=[],D=jm(),V=null,K=Hm(),U=jt(f)?f:Vm(),I=new Map;function S(){let l=sr.find(m=>m.value===U);return l?l.label:"\uC624\uB298"}let P=Zm(),k=!1,j=new Set,oe=new Set,ce=new Set,ee=new Set,re=[],Re=document.createElement("div");Re.className="worker-console";let st=document.createElement("div");st.className="worker-top";let Oe=document.createElement("div");Oe.className="worker-drawer-overlay",Oe.hidden=!0;let ot=document.createElement("div");ot.className="worker-drawer-overlay__backdrop";let it=document.createElement("div");it.className="worker-drawer-host";let Ge=document.createElement("div");Ge.className="worker-drawer-host",Ge.hidden=!0,Oe.append(ot,it,Ge);let me=document.createElement("div");me.className="worker-lanes-host",Re.append(st,Oe,me),e.appendChild(Re);let Le=null,ue=null,we=Ns(it,{transport:r,sessionLogStore:a,onClose:()=>{Le=null,ue=null,Oe.hidden=!0,Z()}}),ye=Ed(Ge,{onClose:()=>{Ge.hidden=!0,Oe.hidden=!0,Z()}}),qe=vd({getWorkspacePath:u||(()=>"")}),he=u&&u()||"",je=wd({queueStore:s,transport:r,onChanged:()=>Z(),onOpenScript:(l,m)=>{qe.open(l,m)}}),We=o?gd(Re,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:u,onOpenTranscript:(l,m)=>wr(l,m)}):null;function ke(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:so,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function et(){let l=ke(),m=typeof l.serial_lane_count=="number"&&Number.isInteger(l.serial_lane_count)&&l.serial_lane_count>0?Math.min(l.serial_lane_count,5):0,T=Array.isArray(l.serial_lanes)?l.serial_lanes:[],B=[];for(let _e of T){if(B.length>=m)break;!_e||typeof _e.id!="string"||!/^s[1-5]$/.test(_e.id)||!Array.isArray(_e.entries)||B.push({id:_e.id,label:`\uC9C1\uB82C ${_e.id.slice(1)}`,count:_e.entries.length})}return B.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(l.queue)?l.queue:[]).length},...B]}function H(l){if(!V||!l.some(T=>T.id===V))return null;let m=et();return m?{bead_id:V,lanes:m}:null}function q(){let l=ke();return typeof l.revision=="number"?l.revision:0}function se(l){l&&l.queue&&s&&s.set(l.queue)}function Ie(){let l=ke().queue;return Array.isArray(l)?l.length:0}async function De(l,m,T){if(!r)return;let B=()=>({bead_id:l,...m==="parallel"?{}:{lane:m},...T===void 0?{}:{index:T},expected_revision:q()}),ae=await r("worker-queue-place",B());se(ae),ae&&ae.conflict&&await r("worker-queue-place",B()).then(se)}async function ze(l,m,T){if(!r)return;let B=()=>({bead_id:l,...m==="parallel"?{}:{lane:m},to_index:T,expected_revision:q()}),ae=await r("worker-queue-reorder",B());se(ae),ae&&ae.conflict&&await r("worker-queue-reorder",B()).then(se)}async function $e(l){if(!r)return;let m=await r("worker-queue-remove",{bead_id:l,expected_revision:q()});se(m),m&&m.conflict&&await r("worker-queue-remove",{bead_id:l,expected_revision:q()}).then(se)}async function rt(l){if(!r||!l)return;let m=await r("worker-attempt-pause",{attempt_id:l});m&&m.paused===!1&&m.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Je(l){if(!r||!l)return;let m=await tn();if(m===null)return;let T=async(ae={})=>await r("worker-attempt-resume",{attempt_id:l,expected_revision:q(),...m!==""?{instructions:m}:{},...ae}),B=await T();se(B),B&&B.conflict&&(B=await T(),se(B)),B=await fr(B,(ae,_e)=>T({continuation:ae,decision_token:_e}),{onResult:se,refresh:()=>T()}),B&&B.resumed===!1&&!B.conflict&&B.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${B.reason}`,"error",2400)}async function W(l){if(!r||!l)return;let m=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:q()});se(m),m&&m.conflict&&(m=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:q()}),se(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function J(l,m,T=!0){if(!r)return null;let B=r,ae=await B(l,{...m,expected_revision:q()});return se(ae),ae&&ae.conflict&&T&&(ae=await B(l,{...m,expected_revision:q()}),se(ae)),ae}async function Te(l){if(!r||!l)return;let m=ke().merge_queue?.find(B=>B.bead_id===l)?.continuation_action;if(m?.mismatch&&m.continuation===null){await de(l,m.mismatch);return}j.add(l),Z();let T;try{T=await J("worker-merge-queue-add",{bead_id:l})}finally{j.delete(l),Z()}!T||T.conflict||T.applied||ie(rg(T.reason),"error",2400)}async function Fe(l){if(!(!r||!l||oe.has(l))){oe.add(l),Z();try{let m=await r("worker-cleanup-retry",{bead_id:l,expected_revision:q()});se(m),m&&!m.retried&&!m.conflict&&m.reason&&ie(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${m.reason}`,"error",2400)}finally{oe.delete(l),Z()}}}async function de(l,m){let T=await fr({continuation_mismatch:m},(ae,_e)=>J("worker-merge-queue-add",{bead_id:l,continuation:ae,decision_token:_e},!1)),B=T?.queue?.merge_queue?.find(ae=>ae.bead_id===l)?.continuation_action;if(T?.applied!==!0&&B?.continuation===null&&B.mismatch){await de(l,B.mismatch);return}T&&T.applied===!1&&!T.conflict&&ie("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function g(l){if(!r)return;let m=await J("worker-merge-auto-toggle",{on:l});!m||m.conflict||ie(l?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",l?"success":"info",2400)}async function v(l){if(!r||!l)return;let m=await J("worker-merge-queue-remove",{bead_id:l});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function A(){await J("worker-merge-queue-remove",{all:!0})}async function O(l,m=null,T="unmerged",B=null){if(!r||!l)return;let ae=qn(l,T);if(!(!!B||typeof globalThis.confirm!="function"||globalThis.confirm(ae)))return;let pe=await r("worker-discard",{bead_id:l,...m?{attempt_id:m}:{},...B?{operation_id:B}:{},expected_revision:q()});if(se(pe),pe&&pe.conflict&&(pe=await r("worker-discard",{bead_id:l,...m?{attempt_id:m}:{},...B?{operation_id:B}:{},expected_revision:q()}),se(pe)),pe&&pe.discarded===!0){ie(Xs(pe),"success",5e3);return}if(pe&&pe.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${pe.reason}`,"error",2800);return}if(pe&&pe.accepted&&pe.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(pe&&pe.accepted&&!pe.discarded){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${pe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}pe&&!pe.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function G(l,m,T){if(!(!r||!m||!T||ee.has(m))){ee.add(m),Z();try{let B=await r(l,{bead_id:m,action_id:T,expected_revision:q()});se(B),B?.conflict?ie("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!B?.ok&&B?.reason&&ie(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(B.reason)}`,"error",2800)}finally{ee.delete(m),Z()}}}async function Y(l,m){if(!r||!m||ce.has(m))return;ce.add(m),Z();let T;try{let B=async(ae={})=>await r(l,{bead_id:m,expected_revision:q(),...ae});T=await B(),se(T),T&&T.conflict&&(T=await r(l,{bead_id:m,expected_revision:q()}),se(T)),l==="worker-revise-fix"&&(T=await fr(T,(ae,_e)=>B({continuation:ae,decision_token:_e}),{onResult:se,refresh:()=>B()}))}finally{ce.delete(m),Z()}if(!(!T||T.conflict)){if(T.ok){ie(l==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${T.reason||""}`,"error",3e3)}}async function ne(l){if(!r)return;let m=await r("worker-automation-toggle",{on:l,expected_revision:q()});se(m),m&&m.conflict&&await r("worker-automation-toggle",{on:l,expected_revision:q()}).then(se)}async function te(l){if(!r||!l)return;let m=await r("worker-repo-operation-repair",{operation_id:l});if(se(m),m&&m.ok===!1){ie(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${m.reason||""}`,"error",3e3);return}m&&m.ok===!0&&ie("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function ge(l){if(!r||!l)return;let m=await r("worker-repo-operation-dismiss",{operation_id:l});se(m),m&&m.ok===!1&&ie(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}async function Ae(l){if(!r||!Number.isFinite(l))return;let m=Math.max(so,Math.floor(l)),T=await r("worker-queue-set-slots",{slots:m,expected_revision:q()});se(T),T&&T.conflict&&await r("worker-queue-set-slots",{slots:m,expected_revision:q()}).then(se)}async function Me(l){if(!r||!Number.isInteger(l)||l<1||l>Td)return;let m=ke(),T=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).slice(l).reduce((_e,pe)=>_e+(Array.isArray(pe?.entries)?pe.entries.length:0),0),B=()=>({count:l,expected_revision:q()}),ae=await r("worker-queue-set-serial-lane-count",B());se(ae),ae&&ae.conflict&&(ae=await r("worker-queue-set-serial-lane-count",B()),se(ae)),ae&&ae.applied&&T>0&&ie(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${T}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Ne(){let l=ke(),m=y?y.selectBoardColumn(Dm,"ready"):[],T=y?y.selectBoardColumn(Nm,"blocked"):[],B=y?y.selectBoardColumn(Fm,"closed"):[],ae=y?y.selectBoardColumn(qm,"in_progress"):[],_e=new Map;for(let h of ae){let N=eg(h);if(!N)continue;let le=_e.get(N);le?le.push(h):_e.set(N,[h])}let pe=h=>{let N=fs(_e.get(h)||[]);return N?N.title||N.id:null},Ve=l.bead_titles||{},b=new Map;for(let[h,N]of Object.entries(Ve))typeof N=="string"&&N.length>0&&b.set(h,N);for(let h of[...m,...T])b.set(h.id,h.title||h.id);let p=l.bead_times&&typeof l.bead_times=="object"&&!Array.isArray(l.bead_times)?l.bead_times:{},E=l.bead_labels&&typeof l.bead_labels=="object"&&!Array.isArray(l.bead_labels)?l.bead_labels:{},$=new Map;for(let[h,N]of Object.entries(E))Array.isArray(N)&&$.set(h,Ea(N));for(let h of[...m,...T]){let N=h.labels;Array.isArray(N)&&!$.has(h.id)&&$.set(h.id,Ea(N))}let X=new Map,xe=o?.get()?.last_good?.result?.groups;for(let h of Array.isArray(xe)?xe:[]){if(h?.eligible!==!0||!Array.isArray(h.members))continue;let N=h.members.map(Ue=>{let pt=(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).find(Kt=>Kt.entries.some(Et=>Et.bead_id===Ue));return pt?pt.id:null});if(!(N.every(Ue=>Ue!==null)&&new Set(N).size===1))for(let Ue of h.members)X.set(Ue,h.members.filter(pt=>pt!==Ue))}let Ee=l.bead_blocked_by&&typeof l.bead_blocked_by=="object"&&!Array.isArray(l.bead_blocked_by)?l.bead_blocked_by:{},Ye=new Map;for(let[h,N]of Object.entries(p))N&&typeof N=="object"&&Ye.set(h,N);for(let h of[...m,...T])Ye.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let Pe=h=>Ye.get(h)||{},ct=l.pr_wait||[],Gt=l.pr_observations||{},cn=l.pr_activity||{},zr=l.cleanup_failed||{},Gn=Object.entries(zr).map(([h,N])=>({bead_id:h,step:N&&N.step?N.step:"",reason:N&&N.reason?N.reason:"",at:N&&typeof N.at=="number"?N.at:null,detail:N&&typeof N.detail=="string"?N.detail:null,output_tail:N&&typeof N.output_tail=="string"&&N.output_tail?N.output_tail:void 0,log_path:N&&typeof N.log_path=="string"&&N.log_path?N.log_path:void 0,retry_count:N&&typeof N.retry_count=="number"&&Number.isInteger(N.retry_count)&&N.retry_count>0?N.retry_count:0,failure_code:N&&typeof N.failure_code=="string"?N.failure_code:void 0,subject_id:N&&typeof N.subject_id=="string"?N.subject_id:void 0,repair_eligible:!!(N&&N.repair_eligible),repair:N&&N.repair?N.repair:void 0})),dn=l.queue||[],un=new Set([...dn.map(h=>h.bead_id),...(Array.isArray(l.serial_lanes)?l.serial_lanes:[]).flatMap(h=>(Array.isArray(h?.entries)?h.entries:[]).map(N=>N.bead_id)),...ct.map(h=>h.bead_id),...l.done.map(h=>h.bead_id)]),Vn=new Set(T.map(h=>h.id)),Ce=i?i.get()?.order||{}:{},ut=new Set,Hr=[];for(let h of[...m,...T])un.has(h.id)||ut.has(h.id)||Jm(h)||Object.hasOwn(h,"labels")&&Sa(h.labels)||(ut.add(h.id),Hr.push(h));L=Qm(Hr,K,Ce);let Kd=l.admission||{},Da=h=>{let N=Kd[h];if(!N)return"";if(N.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof N.reason=="string"?N.reason:"",Ue=le.indexOf(":");return Ue>0&&Ue<le.length-1?`\u26D4 ${le.slice(0,Ue)} (${le.slice(Ue+1)})`:`\u26D4 ${le}`},Yd=L.map(h=>{let N=On(h),le=N.path.length>0,Ue=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",pt=!Object.hasOwn(h,"description")||typeof h.description=="string"&&h.description.trim().length>0,Et=!(Object.hasOwn(h,"labels")&&Sa(h.labels))&&(Ue?pt:le&&!N.conflict),dt=Vn.has(h.id),Yt=[];dt&&Yt.push(tg(h)),Ue&&!pt?Yt.push("missing_description"):!Ue&&N.conflict?Yt.push("spec_id_conflict"):!Ue&&!le&&Yt.push("spec \uC5C6\uC74C");let ts=Da(h.id);return ts&&Yt.push(ts),{id:h.id,title:h.title||h.id,reason:Yt.join(" \xB7 "),draggable:Et,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:Ue,status:h.status,blocked:dt,has_spec:le}}),ao=Um(Yd,D),Zd=ao.visible,Xd=l.revise_parked||{},Kn=l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},io=(h,N)=>h.map((le,Ue)=>{let pt=N!=="done",Kt=N!=="done"&&N!=="queue",Et=pt?Xd[le.bead_id]:null,dt=pt?lr(Kn,le.bead_id):null,Yt=dt?.operation?dt:null,ts=pt&&$.get(le.bead_id)===!0,ai=Ee[le.bead_id]||[],fo=l.admission&&typeof l.admission=="object"?l.admission[le.bead_id]:null,_o=pt?kc(fo,!!Yt||ee.has(le.bead_id)):null,du=pt&&!_o?Da(le.bead_id):null,uu=pt?[du]:[],ii=pt&&ai.length>0&&typeof fo?.reason=="string"&&fo.reason.startsWith("not_ready")?[`\u23F8 ${ai.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],mo=pt?X.get(le.bead_id):void 0;return mo&&mo.length>0&&ii.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${mo.join(", ")}\uC640`),{id:le.bead_id,title:b.get(le.bead_id)||le.bead_id,reason:uu.filter(Boolean).join(" \xB7 "),draggable:pt&&!Yt&&!_o,done:N==="done",lane:N,seq:Kt?Ue+1:void 0,worker_serial:ts,discard:Yt,stale_work:_o,badges:[...ii,...Et?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Et,revise_action:!!Et,revise_enabled:!!Et&&!Yt&&!ce.has(le.bead_id),revise_title:Et?Et.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Et.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:N==="done"?Bt(l.attempts||{},le.bead_id):null,work_ms:N==="done"?vc(l.attempts||{},le.bead_id):null,done_at:N==="done"&&typeof le.added_at=="number"?le.added_at:void 0,...Pe(le.bead_id)}}),Gr=l.attempts?Object.values(l.attempts):[],lo=new Set;for(let h of Gr)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&lo.add(h.resumed_from);let Na=new Map;for(let h of Gr)Na.set(h.bead_id,h.attempt_id);let Yn=new Map;for(let h of Gr)Yn.set(h.attempt_id,h);function co(h){let N=new Set,le=h;for(;le&&!N.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;N.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&Yn.get(le.resumed_from)||null}return!1}let Zn=typeof l.declared_base=="string"?l.declared_base:null;function Qd(h){let N=null;for(let le of Gr)!le||le.bead_id!==h||co(le)||(N===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof N.started_at=="number"?N.started_at:0))&&(N=le);return N&&typeof N.target_base=="string"?N.target_base:null}let qa=[],Fa=[],Jd=md(l),ja=h=>{let N=typeof h.session_id=="string"&&h.session_id.length>0,le=lo.has(h.attempt_id);return{eligible:N&&!le,reason:N?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Vt=null;for(let h of Gr){let N=h.status==="paused"&&!lo.has(h.attempt_id);if(h.status==="running"||N)Fa.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:b.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:N,conflict_resolution:co(h),base_exception:Ia(Zn,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:lr(Kn,h.bead_id,{attempt_id:h.attempt_id}),usage:Bt(l.attempts||{},h.bead_id),current_child:pe(h.bead_id),...Pe(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&Jd(h)){let le=ja(h);qa.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:b.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:lr(Kn,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:co(h),base_exception:Ia(Zn,h.target_base),usage:Bt(l.attempts||{},h.bead_id),current_child:pe(h.bead_id),...Pe(h.bead_id)}),Vt=h}}let Xn=[...qa,...Fa].map(h=>{let N=Yn.get(h.attempt_id),le=N?.quickfix_landing;if(N?.quickfix_lane!==!0||!le||typeof le!="object")return h;let Ue=typeof le.reason=="string"&&le.reason.length>0?le.reason:null,pt=Bn({bead_id:N.bead_id,merge_sha:le.head_sha,cleanup_cursor:le.cursor,cleanup_failed:Ue?{step:le.cursor,reason:Ue}:null,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]});return pt?{...h,landing:pt}:h}),Ba=null;if(Vt){let h=ja(Vt),N=Vt.cause_detail;Ba={bead_id:Vt.bead_id,repo:Vt.repo||"",reason:Vt.cause||Vt.status,cause_detail:N&&typeof N.reason=="string"?{reason:N.reason,command:typeof N.command=="string"?N.command:null}:null,resume_attempt_id:Vt.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:lr(Kn,Vt.bead_id,{attempt_id:Vt.attempt_id})}}let Ua=new Set(Xn.map(h=>h.bead_id)),uo=Array.isArray(l.merge_queue)?l.merge_queue:[],Wa=new Map,za=new Map,Ha=new Map,Ga=new Map,Va=new Map;uo.forEach((h,N)=>{h&&typeof h.bead_id=="string"&&(Wa.set(h.bead_id,N+1),za.set(h.bead_id,h.resolution),Ha.set(h.bead_id,h.continuation_action||null),Ga.set(h.bead_id,h.head_review||null),Va.set(h.bead_id,h.authority||null))});let Vr=l.merge_queue_state||{active:null,failures:{}},eu=Vr.failures||{},Ka=Vr.waiting&&typeof Vr.waiting.bead_id=="string"&&typeof Vr.waiting.reason=="string"?Vr.waiting:null,tu=l.auto_merge_skips||{},Ya=h=>{let N=tu[h];if(!N)return null;let le=Gt[h],Ue=le&&le.pr?le.pr.head_sha:null;return Ue&&Ue===N.head_sha?N.reason||"":null},Qn=new Map;for(let h of Xn)h.failed!==!0&&h.conflict_resolution&&(h.paused?Qn.has(h.bead_id)||Qn.set(h.bead_id,"paused"):Qn.set(h.bead_id,"running"));let Za=Xn.filter(h=>!h.paused&&h.failed!==!0).length,Xa=(l.workspace_info||{}).slots,Qa=typeof Xa=="number"?Xa:typeof l.slots=="number"?l.slots:so,ru=Za>Qa,Jn=Pr(U),nu=(Array.isArray(l.done)?l.done.slice():[]).filter(h=>Jn===void 0||typeof h.added_at!="number"||h.added_at>=Jn).sort((h,N)=>(N.added_at||0)-(h.added_at||0)),pn=io(nu,"done"),su=new Set((Array.isArray(l.done)?l.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),Ja=[],ou=u?.()||"";for(let h of B){let N=qr(h.closed_at);if(typeof h.id!="string"||su.has(h.id)||N===null||Jn!==void 0&&N<Jn||typeof h.comment_count!="number"||h.comment_count<=0)continue;let le=`${ou}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,Ue=I.get(le);Ue===void 0&&r&&(I.set(le,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(pt=>{let Kt=Array.isArray(pt)&&pt.some(Et=>qs(typeof Et?.text=="string"?Et.text:"")?.lane==="session");I.set(le,Kt?"session":"not-session"),Z()}).catch(()=>{I.set(le,"failed"),Z()})),Ue==="session"&&Ja.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:N,created_at:h.created_at,updated_at:h.updated_at})}pn.push(...Ja),pn.sort((h,N)=>(N.done_at||0)-(h.done_at||0));let es={};for(let h of _r)es[h]=0;let ei=!1,ti=0,po=0,ri=0;for(let h of pn){let N=h.usage;if(N&&typeof N=="object"){let le=!1;for(let Ue of _r)Number.isFinite(N[Ue])&&(es[Ue]+=N[Ue],ei=!0,le=!0);le&&(po+=1,Number.isFinite(N.total_cost_usd)&&(ti+=N.total_cost_usd,ri+=1))}}po>0&&ri===po&&(es.total_cost_usd=ti);let ni=pn.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),au=ni.length>0?kt($s(ni)):ei?Qt(es):null,iu=l.lane_states&&typeof l.lane_states=="object"&&!Array.isArray(l.lane_states)?l.lane_states:{},lu=Array.isArray(l.serial_lanes)?l.serial_lanes:[],si=h=>{if(ct.some(Ue=>Ue.bead_id===h))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let N=Gr.filter(Ue=>Ue&&Ue.bead_id===h),le=N.length>0?N[N.length-1].status:null;return le==="failed"||le==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":le==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},oi=lu.filter(h=>h&&typeof h.id=="string"&&Array.isArray(h.entries)).map((h,N)=>{let le=iu[h.id]||{},Ue=new Map((Array.isArray(le.corrections)?le.corrections:[]).filter(dt=>dt&&typeof dt.bead_id=="string"&&typeof dt.after=="string").map(dt=>[dt.bead_id,dt.after])),pt=io(h.entries.filter(dt=>!Ua.has(dt.bead_id)),h.id).map(dt=>Ue.has(dt.id)?{...dt,badges:[`\u{1F517} ${Ue.get(dt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...dt.badges]}:dt),Kt=Array.isArray(le.occupied_by)?le.occupied_by.filter(dt=>typeof dt=="string"):[],Et=Kt.map(dt=>({id:dt,title:b.get(dt)||dt,draggable:!1,lane:h.id,ghost:!0,badges:[si(dt)]}));return{id:h.id,index:N+1,rows:[...Et,...pt],occupied:Kt.length>0,badge:Kt.length>0?si(Kt[0]):"\uB300\uAE30",cycle:le.cycle===!0}}),cu=typeof l.serial_lane_count=="number"?l.serial_lane_count:oi.length;return{queue:l,idToTitle:b,candidates:Zd,candidate_hidden:{blocked:ao.hidden_blocked,spec:ao.hidden_spec},running:Xn,live_count:Za,slots:Qa,over_cap:ru,failure:Ba,waiting:io(dn.filter(h=>!Ua.has(h.bead_id)),"queue"),serial_lanes:oi,serial_lane_count:cu,pr_wait:ct.map(h=>lg(h.bead_id,b.get(h.bead_id)||h.bead_id,Gt,zr[h.bead_id]||null,Bt(l.attempts||{},h.bead_id),cn[h.bead_id]||(j.has(h.bead_id)||oe.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Qn.get(h.bead_id)||null,h.external===!0,{position:Wa.get(h.bead_id)||0,active:Vr.active===h.bead_id,failure:eu[h.bead_id]||null,waiting:Ka?.bead_id===h.bead_id?Ka.reason:null,resolution:za.get(h.bead_id),continuation_action:Ha.get(h.bead_id),head_review:Ga.get(h.bead_id)||null,authority:Va.get(h.bead_id)||null},h.wt_present!==!1,l.auto_merge===!0?Ya(h.bead_id):null,Ia(Zn,Qd(h.bead_id)),l.completion_status&&typeof l.completion_status=="object"&&!Array.isArray(l.completion_status)&&l.completion_status[h.bead_id]||null,l.discard_operations&&typeof l.discard_operations=="object"&&!Array.isArray(l.discard_operations)?l.discard_operations:{},Yn.get(Na.get(h.bead_id)||"")?.worker_serial===!0,l.auto_merge===!0,{merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]})).map(h=>({...h,...Pe(h.id)})),merge_queue_length:uo.length,merge_queue_running:uo.length>0,auto_excluded:ct.map(h=>h.bead_id).filter(h=>Ya(h)!==null),declared_base:Zn,done:pn,token_total:au,cleanup_failures:Gn,repo_operations:Array.isArray(l.repo_operations)?l.repo_operations:[]}}function Be(){let m=!!o?.get()?.job,T=!m&&o?.isPending?.()===!0,B=m?"\uBD84\uC11D \uC911":T?"\uC900\uBE44 \uC911":"";return d`<button
      type="button"
      class=${B?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${B?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${B?d`<span class="worker-analysis-btn__badge">${B}</span>`:""}
    </button>`}function Xe(l){let m=l.waiting.length>0?l.waiting[0].id:"\u2014",T=d`<button
      type="button"
      class="worker-play${l.queue.auto_advance?" is-active":""}"
    >
      ${l.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,B=z(l),ae=l.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",_e=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${l.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${l.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${S()} 완료 <b>${l.done.length}</b></span
      >`,pe=d`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${l.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${l.declared_base||"?"}</span
    >`,Ve=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${so}
          step="1"
          .value=${String(l.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Td},(E,$)=>$+1).map(E=>d`<option
                value=${String(E)}
                ?selected=${l.serial_lane_count===E}
              >
                ${E}
              </option>`)}
        </select>
      </label>
      ${o?Be():""} `,b=Dc({failure:l.failure}),p=wc(l.repo_operations,l.cleanup_failures);return k?d`<div class="worker-ribbon">
          ${T} ${B}
          <div class="worker-kpi worker-kpi--ribbon">${ae}${_e}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ve}</div>
          <div class="worker-kpi">${pe}</div>
        </div>
        ${p}${je.template()}${b}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${T}${B}${Ve}</div>
        <div class="worker-kpi">
          ${ae}${_e}${pe}
          ${(Array.isArray(l.token_total)?l.token_total:l.token_total?[{label:l.token_total,tooltip:`${S()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(E=>d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${E.tooltip}
                >${S()} 완료 · 누적 ${E.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${p}${je.template()}${b}`}function F(l){if(l.running.length===0&&l.pr_wait.length===0)return"";let m=l.running.some(T=>!T.paused&&T.failed!==!0);return d`<section
      class="worker-now${m?" worker-pane--live":""}"
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
      ${l.running.length>0?ha(l.running,Date.now(),Le):""}
      ${l.pr_wait.map(T=>da(T))}
    </section>`}function Q(l){let m=l.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${D.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Wm.map(T=>d`<button
              type="button"
              class="worker-filter__chip${D.spec===T.value?" is-active":""}"
              data-spec=${T.value}
              aria-pressed=${D.spec===T.value?"true":"false"}
            >
              ${T.label}
            </button>`)}
        ${m.spec>0?d`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function w(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${K}
    >
      ${zm.map(l=>d`<option value=${l.value} ?selected=${K===l.value}>
            ${l.label}
          </option>`)}
    </select>`}function C(){return d`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${U}
      >
        ${sr.map(l=>d`<option value=${l.value} ?selected=${U===l.value}>
              ${l.label}
            </option>`)}
      </select>
    </div>`}function M(l){let m=d`<span
      class="worker-lane__badge${l.occupied?" worker-lane__badge--held":""}"
      >${l.badge}</span
    >`,T=l.cycle?d`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return rr({id:`worker-pane-lane-${l.id}`,lane:l.id,title:`\uC9C1\uB82C ${l.index}`,items:l.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:m,controls:T})}function z(l){let m=l.queue.auto_merge===!0;if(l.merge_queue_running)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${m?" is-active":""}"
        title=${m?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${m?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${l.merge_queue_length}
      </button>`;if(m)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let T=new Set(l.auto_excluded),B=l.pr_wait.filter(ae=>ae.merge_action&&ae.merge_enabled&&!T.has(ae.id)).length;return d`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${B>0?` ${B}`:""}
    </button>`}function be(l){let m=rr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:l.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:w(),controls:Q(l),place_menu:H(l.candidates)});return k?d`<div class="worker-lanes worker-lanes--mobile">
        ${F(l)}
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:P.queue,preview:Rd(l.waiting)})}
        ${l.serial_lanes.map(T=>M(T))}
        ${m}
        ${rr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:l.done,empty:`${S()} \uC644\uB8CC \uC5C6\uC74C`,controls:C(),collapsible:!0,collapsed:P.done,preview:Array.isArray(l.token_total)?l.token_total.map(T=>T.label).join(" \xB7 "):l.token_total||Rd(l.done)})}
      </div>`:d`<div class="worker-lanes">
      ${m}
      <div class="worker-wait">
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${l.serial_lanes.map(T=>M(T))}
      </div>
      ${rr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${l.slots}`,items:l.running,live:l.running.some(T=>!T.paused&&T.failed!==!0),body:ha(l.running,Date.now(),Le)})}
      ${rr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:l.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${rr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${S()} ${l.done.length}`,items:l.done,empty:`${S()} \uC644\uB8CC \uC5C6\uC74C`,controls:C()})}
    </div>`}function ve(l){P={...P,[l]:!P[l]},Xm(P),Z()}function Z(){let l=Ne();Ke(Xe(l),st),Ke(be(l),me)}function tt(){let l=document.querySelector(".app-header");if(!l)return;let m=()=>{let T=Math.round(l.getBoundingClientRect().height);Re.style.setProperty("--worker-ribbon-top",`${T}px`)};if(m(),typeof ResizeObserver=="function"){let T=new ResizeObserver(m);T.observe(l),re.push(()=>T.disconnect())}else window.addEventListener("resize",m),re.push(()=>window.removeEventListener("resize",m))}function Se(){if(typeof window.matchMedia!="function")return;let l=window.matchMedia(Ym);k=!!l.matches;let m=T=>{let B=!!(T&&typeof T.matches=="boolean"?T.matches:l.matches);B!==k&&(k=B,Z())};typeof l.addEventListener=="function"?(l.addEventListener("change",m),re.push(()=>l.removeEventListener("change",m))):typeof l.addListener=="function"&&(l.addListener(m),re.push(()=>l.removeListener(m)))}let _t=null;function He(l){_t=l.target instanceof Element?l.target:null}function ht(l){let T=l.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!T)return;if(_t&&T.contains(_t)&&_t.closest("input, button, a")){l.preventDefault();return}let B=T.dataset.beadId||"",ae=T.dataset.lane||"";x={bead_id:B,from_lane:ae};try{l.dataTransfer?.setData("text/plain",B),l.dataTransfer&&(l.dataTransfer.effectAllowed="move")}catch{}}function qt(l){let m=l.target?.closest?.(".worker-pane");if(!m)return;let T=m.dataset.lane||"";T!=="candidate"&&T!=="queue"&&!/^s[1-5]$/.test(T)||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function cr(l){l.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function xt(l,m){let T=L.find(pe=>pe.id===l);if(!T)return;let B=L.filter(pe=>pe.id!==l),ae=B.length;if(m){let pe=m.dataset.beadId;if(pe===l)return;let Ve=B.findIndex(b=>b.id===pe);Ve>=0&&(ae=Ve)}let _e=B.slice();_e.splice(ae,0,T),R.applyReorder(l,_e,ae)}function St(l){let m=l.target?.closest?.(".worker-pane");if(!m)return;l.preventDefault(),m.classList.remove("worker-pane--drag-over");let T=m.dataset.lane||"",B=x?.bead_id||l.dataTransfer?.getData("text/plain")||"",ae=x?.from_lane||"";if(x=null,!B)return;let _e=l.target?.closest?.(".worker-mini, .worker-card"),pe=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),Ve=pe.length;if(_e){let b=pe.indexOf(_e);b>=0&&(Ve=b)}if(Ve=Math.max(0,Ve-m.querySelectorAll(".worker-mini--ghost").length),m.classList.contains("worker-pane--collapsed")&&(Ve=Ie()),T==="candidate"){if(ae==="candidate"){xt(B,_e);return}(ae==="queue"||/^s[1-5]$/.test(ae))&&$e(B);return}if(T==="queue"||/^s[1-5]$/.test(T)){let b=T==="queue"?"parallel":T;ae===T?ze(B,b,Ve):De(B,b,Ve)}}function dr(l){D=l,Bm(l),Z()}function ur(l){K=l==="board"||l==="created"||l==="spec"?l:oo,Gm(K),Z()}function Wt(l){U=jt(l)?l:Mt,Km(U),_?.(U),Z()}function zt(l){let m=l.target?.closest?.(".worker-serial-lane-count");if(m){let Ve=Number.parseInt(m.value,10);Number.isFinite(Ve)&&Me(Ve).then(Z);return}let T=l.target?.closest?.(".worker-filter__blocked");if(T){dr({...D,show_blocked:T.checked});return}let B=l.target?.closest?.(".worker-done-range");if(B){Wt(B.value);return}let ae=l.target?.closest?.(".worker-sort");if(ae){ur(ae.value||oo);return}let _e=l.target?.closest?.(".worker-slots__input");if(!_e)return;let pe=Number.parseInt(_e.value,10);if(!Number.isFinite(pe)){Z();return}Ae(pe).then(Z)}function yt(l){return l?{runner:l.runner||void 0,model:l.model||void 0,effort:l.effort||void 0,worktree:l.worktree||void 0,status:l.status||void 0,session_id:l.session_id||void 0}:{}}function nr(){let l=Ne();return{operations:l.repo_operations,cleanup_failures:l.cleanup_failures,repo:u&&u()||""}}function Qe(){Le&&we.close(),Ge.hidden=!1,Oe.hidden=!1,ye.open(nr()),Z()}function Lt(l){let m=ke(),T=m.attempts?m.attempts[l]:null;Le=l,ue=null,ye.close(),Ge.hidden=!0,Oe.hidden=!1,we.open({attempt_id:l,meta:yt(T)}),Z()}function wr(l,m){Le=null,ue=l,ye.close(),Ge.hidden=!0,Oe.hidden=!1,we.open({attempt_id:l,meta:m,hide_prompt:!0}),Z()}function Ht(){if(ye.isOpen()&&ye.refresh(nr()),ue){let T=(o?.get()?.runs||[]).find(B=>B.run_id===ue);T?we.updateMeta(Ca(T)):we.close();return}if(!Le)return;let l=ke(),m=l.attempts?l.attempts[Le]:null;if(m){we.updateMeta(yt(m));return}we.close()}function fe(l){let m=l.target;if(m?.closest?.(".worker-mini__serial, .worker-mini__grip")||m?.closest?.("#worker-parallel-analysis-dialog"))return;if(m?.closest?.(".worker-analysis-btn")){We?.open();return}if(m?.closest?.(".worker-repo-strip")||m?.closest?.(".worker-mini__timeline")){Qe();return}let T=m?.closest?.(".worker-repo-op__session");if(T){let Ce=T.dataset.attemptId;Ce&&Lt(Ce);return}let B=m?.closest?.(".worker-repo-op__resolve");if(B){te(B.dataset.operationId||"");return}let ae=m?.closest?.(".worker-repo-op__dismiss");if(ae){ge(ae.dataset.operationId||"");return}let _e=m?.closest?.(".worker-cleanup__resume");if(_e){let Ce=_e.dataset.beadId;Ce&&Fe(Ce);return}let pe=m?.closest?.(".worker-banner__resume");if(pe){let Ce=pe.dataset.attemptId;Ce&&Je(Ce);return}let Ve=m?.closest?.(".worker-banner__discard");if(Ve){let Ce=Ve.dataset.confirmation==="merged"?"merged":"unmerged";O(Ve.dataset.beadId||"",Ve.dataset.attemptId||null,Ce,Ve.dataset.operationId||null);return}let b=m?.closest?.(".worker-banner__dismiss");if(b){let Ce=b.dataset.attemptId;Ce&&W(Ce);return}if(m?.closest?.(".worker-play")){ne(!ke().auto_advance);return}let p=m?.closest?.(".worker-merge-all");if(p){p.classList.contains("worker-merge-all--stop")?ke().auto_merge===!0?g(!1):A():g(!0);return}let E=m?.closest?.(".worker-pane__hd--toggle");if(E){let Ce=E.dataset.lane;(Ce==="queue"||Ce==="done")&&ve(Ce);return}let $=m?.closest?.(".worker-card__place-lane");if($){let Ce=$.dataset.beadId,ut=$.dataset.lane;Ce&&(ut==="parallel"||/^s[1-5]$/.test(ut||""))&&(V=null,Z(),De(Ce,ut));return}if(m?.closest?.(".worker-card__place-cancel")){V=null,Z();return}let xe=m?.closest?.(".worker-card__place");if(xe){let Ce=xe.dataset.beadId;Ce&&!xe.disabled&&(et()?(V=Ce,Z()):De(Ce,"parallel"));return}let Ee=m?.closest?.(".worker-filter__chip");if(Ee){let Ce=Ee.dataset.spec;(Ce==="all"||Ce==="with"||Ce==="without")&&dr({...D,spec:Ce});return}let Ye=m?.closest?.(".worker-mini__merge");if(Ye){let Ce=Ye.dataset.beadId||"";ke().cleanup_failed?.[Ce]?Fe(Ce):Te(Ce);return}let Pe=m?.closest?.(".worker-mini__merge-cancel");if(Pe){v(Pe.dataset.beadId||"");return}let ct=m?.closest?.(".worker-mini__discard");if(ct){O(ct.dataset.beadId||"",ct.dataset.attemptId||null,ct.dataset.discardMode==="merged"?"merged":"unmerged",ct.dataset.operationId||null);return}let Gt=m?.closest?.(".worker-mini__stale-continue");if(Gt){G("worker-stale-work-continue",Gt.dataset.beadId||"",Gt.dataset.actionId||"");return}let cn=m?.closest?.(".worker-mini__stale-backup");if(cn){G("worker-stale-work-backup-fresh",cn.dataset.beadId||"",cn.dataset.actionId||"");return}let zr=m?.closest?.(".worker-mini__stale-recheck");if(zr){G("worker-stale-work-recheck",zr.dataset.beadId||"",zr.dataset.actionId||"");return}let Gn=m?.closest?.(".worker-mini__revise-fix");if(Gn){Y("worker-revise-fix",Gn.dataset.beadId||"");return}let dn=m?.closest?.(".worker-mini__revise-approve");if(dn){Y("worker-revise-approve",dn.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__discard")){let Ce=m?.closest?.(".rtile"),ut=Ce?.dataset?.beadId,Hr=Ce?.dataset?.attemptId;ut&&O(ut,Hr||null,"unmerged",m?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(m?.closest?.(".rtile__dismiss")){let ut=m?.closest?.(".rtile")?.dataset?.attemptId;ut&&W(ut);return}if(m?.closest?.(".rtile__pause")){let ut=m?.closest?.(".rtile")?.dataset?.attemptId;ut&&rt(ut);return}if(m?.closest?.(".rtile__resume")){let ut=m?.closest?.(".rtile")?.dataset?.attemptId;ut&&Je(ut);return}if(m?.closest?.(".rtile__session")){let ut=m?.closest?.(".rtile")?.dataset?.attemptId;ut&&Lt(ut);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){ye.close(),we.close();return}if(m?.closest?.(".worker-drawer-host"))return;let un=m?.closest?.(".rtile");if(un){if(m?.closest?.(".rtile__id")){let ut=un.dataset.beadId;ut&&Xt(ut).then(Hr=>{Hr?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ce=un.dataset.beadId;Ce&&c&&c(Ce);return}let Vn=m?.closest?.(".worker-mini, .worker-card");if(Vn){let Ce=Vn.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){Ce&&Xt(Ce).then(ut=>{ut?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Ce&&c&&c(Ce)}}return e.addEventListener("pointerdown",He),e.addEventListener("dragstart",ht),e.addEventListener("dragover",qt),e.addEventListener("dragleave",cr),e.addEventListener("drop",St),e.addEventListener("click",fe),e.addEventListener("change",zt),Se(),tt(),y&&re.push(y.subscribe(()=>{for(let[l,m]of I)m==="failed"&&I.delete(l);Z()})),s&&re.push(s.subscribe(()=>{let l=u&&u()||"";l!==he&&(he=l,qe.close()),Z(),Ht()})),o&&typeof o.subscribe=="function"&&re.push(o.subscribe(()=>{Ht(),Z()})),Z(),{load(){Z()},destroy(){for(let l of re.splice(0))try{l()}catch{}e.removeEventListener("pointerdown",He),e.removeEventListener("dragstart",ht),e.removeEventListener("dragover",qt),e.removeEventListener("dragleave",cr),e.removeEventListener("drop",St),e.removeEventListener("click",fe),e.removeEventListener("change",zt);try{we.destroy()}catch{}Oe.hidden=!0;try{We?.destroy()}catch{}try{qe.destroy()}catch{}Ke(d``,e)}}}function Oa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Dd(e,t,r,n=async()=>{},s=async()=>{}){let o=ft("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function f(P){let j=P.target.value,ce=t.getState().workspace?.current?.path||"";if(j&&j!==ce){o("switching workspace to %s",j),i=!0,S();try{await r(j)}catch(ee){o("workspace switch failed: %o",ee)}finally{i=!1,S()}}}async function _(){let P=t.getState(),k=P.workspace?.current?.path||P.workspace?.available?.[0]?.path||"";if(!(!k||c)){o("git-pulling workspace %s",k),c=!0,S();try{await n(k)}catch(j){o("workspace git pull failed: %o",j)}finally{c=!1,S()}}}function y(P){let k=P.target;k&&e.contains(k)||L()}function R(P){P.key==="Escape"&&L()}function x(){u||(u=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",R),S())}function L(){u&&(u=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",R),S())}function D(){u?L():x()}async function V(P){let k=P.target,j=k.value,oe=k.checked;o("toggling visibility %s \u2192 %s",j,String(oe));try{await s(j,oe)}catch(ce){o("workspace visibility toggle failed: %o",ce)}}function K(P){return P?d`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:d``}function U(P,k){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${D}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?d`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${P.map(j=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${j.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${j.path}"
                        .checked=${!k.has(j.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Oa(j.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let P=t.getState(),k=P.workspace?.current,j=P.workspace?.available||[],oe=new Set(P.workspace?.hidden||[]),ce=k?.path||j[0]?.path||"";if(j.length===0)return d``;let ee=j.filter(re=>!oe.has(re.path)||re.path===ce);if(ee.length<=1){let re=ee[0]||j[0],Re=Oa(re.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${re.path}"
            >${Re}</span
          >
          ${U(j,oe)}
          ${K(ce)}
          ${c?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${i||c}
          aria-label="Select project workspace"
        >
          ${ee.map(re=>d`
              <option
                value="${re.path}"
                ?selected=${re.path===ce}
                title="${re.path}"
              >
                ${Oa(re.path)}
              </option>
            `)}
        </select>
        ${U(j,oe)}
        ${K(ce)}
        ${i||c?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){Ke(I(),e)}return S(),a=t.subscribe(()=>S()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",R),Ke(d``,e)}}}var Nd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Ma(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function qd(e,t,r=Ma()){return{id:r,type:e,payload:t}}function Fd(e={}){let t=ft("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,f=[],_=new Map,y=new Set;function R(I){for(let S of Array.from(y))try{S(I)}catch{}}function x(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),R(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),S=(r.jitterRatio||0)*I,P=Math.max(0,Math.round(I+(Math.random()*2-1)*S));t("ws retry in %d ms (attempt %d)",P,a+1),i=setTimeout(()=>{i=null,U()},P)}function L(I){try{s?.send(JSON.stringify(I))}catch(S){t("ws send failed",S)}}function D(){for(o="open",t("ws open"),R(o),a=0;f.length;){let I=f.shift();I&&L(I)}}function V(I){let S;try{S=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){t("ws received invalid envelope");return}if(u.has(S.id)){let k=u.get(S.id);u.delete(S.id),S.ok?k?.resolve(S.payload):k?.reject(S.error||new Error("ws error"));return}let P=_.get(S.type);if(P&&P.size>0)for(let k of Array.from(P))try{k(S.payload)}catch(j){t("ws event handler error",j)}else t("ws received unhandled message type: %s",S.type)}function K(){o="closed",t("ws closed"),R(o);for(let[I,S]of u.entries())S.reject(new Error("ws disconnected")),u.delete(I);a+=1,x()}function U(){if(!c)return;let I=n();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",R(o),s.addEventListener("open",D),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",K)}catch(S){t("ws connect failed %o",S),x()}}return U(),{send(I,S){if(!Nd.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let P=Ma(),k=qd(I,S,P);return t("send %s id=%s",I,P),new Promise((j,oe)=>{u.set(P,{resolve:j,reject:oe,type:I}),s&&s.readyState===s.OPEN?L(k):(t("queue %s id=%s (state=%s)",I,P,o),f.push(k))})},on(I,S){_.has(I)||_.set(I,new Set);let P=_.get(I);return P?.add(S),()=>{P?.delete(S)}},onConnection(I){return y.add(I),()=>{y.delete(I)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,U()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function cg(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function dg(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Pa=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],jd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Tr="tab:worker:closed",ug="bdui.worker.done-range",Bd=td,Ud="worker:queue",Wd="worker:parallel-analysis",zd="ui:order",Hd="ui:display-policy",Gd="exec:presets",Cr="tab:board:closed",Vd="beads-ui.board.closed-range";function pg(e){let t=ft("main");t("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ke(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&_d(s),o&&a&&i&&c){let Ge=function(b,p){let E="Request failed",$="";if(b&&typeof b=="object"){let xe=b;if(typeof xe.message=="string"&&xe.message.length>0&&(E=xe.message),typeof xe.details=="string")$=xe.details;else if(xe.details&&typeof xe.details=="object")try{$=JSON.stringify(xe.details,null,2)}catch{$=""}}else typeof b=="string"&&b.length>0&&(E=b);let X=p&&p.length>0?`Failed to load ${p}`:"Request failed";it.open(X,E,$)},Je=function(b){return`${Qe.getState().workspace.current?.path||""}\0${b}`},W=function(){H&&(H().catch(()=>{}),H=null),q=null,se=null},Te=function(b){Ie=b;let p=()=>{Ie!==b||Qe.getState().selected_id!==b||(Ie=null,J(b))};if(!$e){ze.then(p);return}p()},v=function(b,p,E,$,X){return E!==g[p]?(X().catch(()=>{}),!1):(b.set($,X),!0)},O=function(){let b=Qe.getState();ge(b.view==="board"),F(b.view==="worker"),z(b.view==="monitor"),w(b.view==="board"||b.view==="worker"||A||!!b.selected_id)},ne=function(){let b=Pr(G);return b===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:b}}},te=function(){let b=Pr(Y);return b===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:b}}},ge=function(b){if(b)for(let[p,E]of Pa){if(Fe.has(p)||de.has(p))continue;let $=p===Cr?ne():{type:E};try{we.register(p,$)}catch(Ee){t("register %s store failed: %o",p,Ee)}de.add(p);let X=g.board,xe=!1;ue.subscribeList(p,$).then(Ee=>{xe=!v(Fe,"board",X,p,Ee)}).catch(Ee=>{t("subscribe %s failed: %o",p,Ee),Ge(Ee,"board")}).finally(()=>{de.delete(p),xe&&O()})}else Ne()},Ne=function(){g.board+=1;for(let[b]of Pa){let p=Fe.get(b);p&&(p().catch(()=>{}),Fe.delete(b));try{we.unregister(b)}catch(E){t("unregister %s failed: %o",b,E)}}},F=function(b){if(!b){Q();return}for(let[p,E]of jd){if(Be.has(p)||de.has(p))continue;let $=p===Tr?te():{type:E};try{we.register(p,$)}catch(Ee){t("register %s store failed: %o",p,Ee)}de.add(p);let X=g.worker,xe=!1;ue.subscribeList(p,$).then(Ee=>{xe=!v(Be,"worker",X,p,Ee)}).catch(Ee=>{t("subscribe %s failed: %o",p,Ee),Ge(Ee,"worker")}).finally(()=>{de.delete(p),xe&&O()})}},Q=function(){g.worker+=1;for(let[b]of jd){let p=Be.get(b);p&&(p().catch(()=>{}),Be.delete(b));try{we.unregister(b)}catch(E){t("unregister %s failed: %o",b,E)}}},w=function(b){if(!b){C();return}Xe||(Le("subscribe-worker-queue",{id:Ud}).catch(p=>{t("subscribe-worker-queue failed: %o",p)}),Le("subscribe-worker-parallel-analysis",{id:Wd}).catch(p=>{t("subscribe-worker-parallel-analysis failed: %o",p)}),Xe=()=>(Le("unsubscribe-worker-parallel-analysis",{id:Wd}),Le("unsubscribe-worker-queue",{id:Ud})))},C=function(){Xe&&(Xe().catch(()=>{}),Xe=null),qe.clear()},z=function(b){if(!b){be();return}M||(Le("subscribe-monitor-pipeline",{id:Bd}).catch(p=>{t("subscribe-monitor-pipeline failed: %o",p)}),M=()=>Le("unsubscribe-monitor-pipeline",{id:Bd}))},be=function(){M&&(M().catch(()=>{}),M=null)},Z=function(){ve||(Le("subscribe-ui-order",{id:zd}).catch(b=>{t("subscribe-ui-order failed: %o",b)}),ve=()=>Le("unsubscribe-ui-order",{id:zd}))},tt=function(){ve&&(ve().catch(()=>{}),ve=null),je.clear()},_t=function(){Se||(Le("subscribe-display-policy",{id:Hd}).catch(b=>{t("subscribe-display-policy failed: %o",b)}),Se=()=>Le("unsubscribe-display-policy",{id:Hd}))},He=function(){Se&&(Se().catch(()=>{}),Se=null),We.clear()},qt=function(){ht||(Le("subscribe-impl-presets",{id:Gd}).catch(b=>{t("subscribe-impl-presets failed: %o",b)}),ht=()=>Le("unsubscribe-impl-presets",{id:Gd}))},Wt=function(b){if(!b)return"Unknown";let p=b.split("/").filter(Boolean);return p.length>0?p[p.length-1]:"Unknown"};var u=Ge,f=Je,_=W,y=Te,R=v,x=O,L=ne,D=te,V=ge,K=Ne,U=F,I=Q,S=w,P=C,k=z,j=be,oe=Z,ce=tt,ee=_t,re=He,Re=qt,st=Wt;let Oe=document.getElementById("header-loading"),ot=zi(Oe),it=yc(e),me=Fd(),Le=ot.wrapSend((b,p)=>me.send(b,p)),ue=Di(Le),we=Ni(),ye=ji(),qe=Fi(),he=wi(),je=qi(),We=yi(),ke=vi(),et=ki();me.on("impl-presets-snapshot",b=>{let p=b;p&&typeof p.revision=="number"&&Array.isArray(p.presets)&&ke.set({revision:p.revision,presets:p.presets})}),me.on("monitor-pipeline-snapshot",b=>{let p=b;if(!(!p||!Array.isArray(p.workspaces)))try{he.set(p.workspaces,p.workspaces_state)}catch{}}),me.on("ui-order-snapshot",b=>{let p=b;if(p&&typeof p.revision=="number")try{je.set({revision:p.revision,order:p.order&&typeof p.order=="object"?p.order:{}})}catch{}}),me.on("display-policy-snapshot",b=>{let p=b;if(p&&p.policy&&typeof p.policy=="object")try{We.set(p.policy)}catch{}}),me.on("session-log-snapshot",b=>{let p=b;if(p&&typeof p.id=="string")try{et.set(p.id,Array.isArray(p.lines)?p.lines:[],typeof p.last_event_at=="number"?p.last_event_at:null)}catch{}}),me.on("session-log-append",b=>{let p=b;if(p&&typeof p.id=="string")try{et.append(p.id,p.event)}catch{}}),me.on("snapshot",b=>{let p=b,E=p&&typeof p.id=="string"?p.id:"",$=E?we.getStore(E):null;if($&&p&&p.type==="snapshot")try{$.applyPush(p)}catch{}}),me.on("upsert",b=>{let p=b,E=p&&typeof p.id=="string"?p.id:"",$=E?we.getStore(E):null;if($&&p&&p.type==="upsert")try{$.applyPush(p)}catch{}}),me.on("delete",b=>{let p=b,E=p&&typeof p.id=="string"?p.id:"",$=E?we.getStore(E):null;if($&&p&&p.type==="delete")try{$.applyPush(p)}catch{}});let H=null,q=null,se=null,Ie=null,De=()=>{},ze=new Promise(b=>{De=()=>b(void 0)}),$e=!1,rt=!1;async function J(b){let p=Je(b);if(p===q||p===se)return;se=p;let E=`detail:${b}`,$={type:"issue-detail",params:{id:b}};try{we.register(E,$)}catch(X){t("register detail store failed: %o",X)}try{let X=await ue.subscribeList(E,$);if(Qe.getState().selected_id!==b||Je(b)!==p){await X().catch(()=>{});return}H&&await H().catch(()=>{}),H=X,q=p}catch(X){t("detail subscribe failed: %o",X),Ge(X,"issue details")}finally{se===p&&(se=null)}}let Fe=new Map,de=new Set,g={board:0,worker:0},A=!1,G=Mt;try{let b=window.localStorage.getItem(Vd);jt(b)&&(G=b)}catch{}let Y=Mt;try{let b=window.localStorage.getItem(ug);jt(b)&&(Y=b)}catch{}async function Ae(b){if(!jt(b)||b===G)return;G=b;try{window.localStorage.setItem(Vd,b)}catch{}let p=Fe.get(Cr);if(!p)return;Fe.delete(Cr),await p().catch(()=>{});let E=ne();try{we.register(Cr,E)}catch($){t("register %s store failed: %o",Cr,$)}try{let $=await ue.subscribeList(Cr,E);Fe.set(Cr,$)}catch($){t("re-subscribe %s failed: %o",Cr,$),Ge($,"board")}}async function Me(b){if(!jt(b)||b===Y)return;Y=b;let p=Be.get(Tr);if(!p)return;Be.delete(Tr),await p().catch(()=>{});let E=te();try{we.register(Tr,E)}catch($){t("register %s store failed: %o",Tr,$)}try{let $=await ue.subscribeList(Tr,E);Be.set(Tr,$)}catch($){t("re-subscribe %s failed: %o",Tr,$),Ge($,"worker")}}let Be=new Map,Xe=null,M=null,ve=null,Se=null,ht=null;async function cr(){Se=null,We.clear(),ht=null,ke.clear(),Xe=null,M=null,Fe.clear(),Be.clear(),g.board+=1,g.worker+=1,qt();let b=Qe.getState().workspace.current?.path;if(b)try{await me.send("set-workspace",{path:b})}catch(E){t("workspace restore after reconnect failed: %o",E);return}_t();let p=Qe.getState();ge(p.view==="board"),F(p.view==="worker"),z(p.view==="monitor"),w(p.view==="board"||p.view==="worker"||!!p.selected_id)}async function xt(){t("clearing all subscriptions for workspace switch"),Ne(),Q(),C(),ye.clear(),tt(),Z(),He(),_t(),W();let b=Qe.getState();if(b.selected_id)try{we.unregister(`detail:${b.selected_id}`)}catch{}let p=Qe.getState();ge(p.view==="board"),F(p.view==="worker"),z(p.view==="monitor"),w(p.view==="board"||p.view==="worker"||!!p.selected_id),p.selected_id&&Te(p.selected_id)}async function St(b){t("requesting workspace switch to %s",b),rt=!0;try{let p=await me.send("set-workspace",{path:b});t("workspace switch result: %o",p),p&&p.workspace&&(Qe.setState({workspace:{current:{path:p.workspace.root_dir,database:p.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",b),p.changed&&(await xt(),ie("Switched to "+Wt(b),"success",2e3)))}catch(p){throw t("workspace switch failed: %o",p),ie("Failed to switch workspace","error",3e3),p}finally{rt=!1}}async function dr(b){t("requesting workspace git pull for %s",b);try{let p=await me.send("git-pull-workspace",{});t("workspace git pull result: %o",p);let E=p?.status;if(E==="up_to_date"){ie("Already up to date","success",2e3);return}if(E==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+Wt(b),"success",2e3)}catch(p){t("workspace git pull failed: %o",p);let E=p?.code,$=p?.message;if(E==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(E==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(E==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let X=$?`: ${$}`:"";throw ie(`Git pull failed${X}`,"error",3e3),p}}async function ur(b,p){t("setting workspace visibility %s \u2192 %s",b,String(p));try{await me.send("set-workspace-visibility",{path:b,visible:p}),await zt()}catch(E){t("workspace visibility update failed: %o",E),ie("Failed to update project visibility","error",3e3)}}async function zt(){try{let b=await me.send("list-workspaces",{});if(t("workspaces loaded: %o",b),b&&Array.isArray(b.workspaces)){let p=b.workspaces.map(xe=>({path:xe.path,database:xe.database,pid:xe.pid,version:xe.version})),E=b.current?{path:b.current.root_dir,database:b.current.db_path}:null,$=Array.isArray(b.hidden)?b.hidden.filter(xe=>typeof xe=="string"):[];Qe.setState({workspace:{current:E,available:p,hidden:$}});let X=window.localStorage.getItem("beads-ui.workspace");X&&(!p.some(Ee=>Ee.path===X)||$.includes(X)?window.localStorage.removeItem("beads-ui.workspace"):E&&X!==E.path&&(t("restoring saved workspace preference: %s",X),await St(X)))}}catch(b){t("failed to load workspaces: %o",b)}}me.on("workspace-changed",b=>{t("workspace-changed event: %o",b),b&&b.root_dir&&(Qe.setState({workspace:{current:{path:b.root_dir,database:b.db_path}}}),zt(),xt())});let yt=!1;if(typeof me.onConnection=="function"){let b=p=>{t("ws state %s",p),p==="reconnecting"||p==="closed"?(yt=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):p==="open"&&yt&&(yt=!1,ie("Reconnected","success",2200),dg(Qe,(E,$)=>{t(`${E}: %o`,$)}),cr())};me.onConnection(b)}let nr="board";try{let b=window.localStorage.getItem("beads-ui.view");(b==="board"||b==="worker"||b==="monitor")&&(nr=b)}catch(b){t("view parse error: %o",b)}let Qe=Wi({config:cg(),view:nr});me.on("worker-queue-snapshot",b=>{let p=b;if(!p||!p.queue)return;let E=Qe.getState().workspace.current?.path;if(typeof E=="string"&&E.length>0&&p.root_dir!==E){t("dropping worker-queue snapshot for %s",String(p.root_dir));return}try{ye.set(p.queue)}catch{}}),me.on("worker-parallel-analysis-snapshot",b=>{let p=b;if(!p)return;let E=Qe.getState().workspace.current?.path;if(!(typeof E=="string"&&E.length>0&&typeof p.root_dir=="string"&&p.root_dir!==E))try{qe.set({settings:p.settings,job:p.job??null,runs:Array.isArray(p.runs)?p.runs:[],last_good:p.last_good??null})}catch{}});let Lt=Bi(Qe);Lt.start();let wr=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),Ht=async(b,p)=>{try{return await Le(b,p)}catch(E){if(wr.has(b))throw E;return[]}};n&&nd(n,Qe,Lt);let fe=document.getElementById("workspace-picker");fe&&Dd(fe,Qe,St,dr,ur);let l=id(e,(b,p)=>Le(b,p));try{let b=document.getElementById("new-issue-btn");b&&b.addEventListener("click",()=>l.open())}catch{}let m=ud(e,{policyStore:We,queueStore:ye,implPresetStore:ke,transport:(b,p)=>Le(b,p),onOpenChange:b=>{A=b,O()},labelOptions:()=>{let b=new Set;for(let[p]of Pa)for(let E of we.snapshotFor(p)||[]){let $=E.labels;if(Array.isArray($))for(let X of $)typeof X=="string"&&X.length>0&&b.add(X)}return Array.from(b).sort()}});try{let b=document.getElementById("display-settings-btn");b&&(b.setAttribute("aria-label","\uC124\uC815"),b.setAttribute("title","\uC124\uC815"),b.addEventListener("click",()=>m.open()))}catch{}let T=el(o,{gotoIssue:b=>Lt.gotoIssue(b),issueStores:we,transport:Ht,workerQueueStore:ye,uiOrderStore:je,displayPolicyStore:We,closedRange:G,onClosedRangeChange:b=>{Ae(b)},onNewIssue:()=>l.open()}),B=La(a,{transport:Ht,issueStores:we,queueStore:ye,analysisStore:qe,sessionLogStore:et,uiOrderStore:je,gotoIssue:b=>Qe.setState({selected_id:b}),getWorkspacePath:()=>Qe.getState().workspace.current?.path,doneRange:Y,onDoneRangeChange:b=>{Me(b)}}),ae=rd(i,{transport:Ht,pipelineStore:he,execPresetStore:ke,gotoIssue:b=>Lt.gotoIssue(b),getWorkspacePath:()=>Qe.getState().workspace.current?.path,switchWorkspace:b=>St(b)}),_e=hc(c,{issueStores:we,transport:Ht,queueStore:ye,execPresetStore:ke,sessionLogStore:et,getWorkspacePath:()=>Qe.getState().workspace.current?.path,onNavigate:b=>{Qe.getState().view==="worker"?Qe.setState({selected_id:b}):Lt.gotoIssue(b)},onClose:()=>{let b=Qe.getState();Qe.setState({selected_id:null});try{Lt.gotoView(b.view==="worker"||b.view==="monitor"?b.view:"board")}catch{}},onOpenExecPresets:()=>{m.open("session")}}),pe=Qe.getState().selected_id;pe&&(c.hidden=!1,_e.load(pe),Te(pe)),Qe.subscribe(b=>{let p=b.selected_id;p?(c.hidden=!1,_e.load(p),rt||Te(p)):(_e.clear(),c.hidden=!0,W())});let Ve=b=>{o.hidden=b.view!=="board",a.hidden=b.view!=="worker",i.hidden=b.view!=="monitor",ge(b.view==="board"),F(b.view==="worker"),z(b.view==="monitor"),w(b.view==="board"||b.view==="worker"||A||!!b.selected_id),!b.selected_id&&b.view==="board"&&T.load(),b.view==="worker"&&B.load(),b.view==="monitor"?ae.load():ae.pause(),window.localStorage.setItem("beads-ui.view",b.view)};Qe.subscribe(Ve),Ve(Qe.getState()),Z(),_t(),qt(),zt().finally(()=>{$e=!0,De()}),window.addEventListener("keydown",b=>{let p=b.ctrlKey||b.metaKey,E=String(b.key||"").toLowerCase(),$=b.target,X=$&&$.tagName?String($.tagName).toLowerCase():"",xe=X==="input"||X==="textarea"||X==="select"||$&&typeof $.isContentEditable=="boolean"&&$.isContentEditable;p&&E==="n"&&(xe||(b.preventDefault(),l.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&pg(t)});export{pg as bootstrap,cg as readBootstrapConfig,dg as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
