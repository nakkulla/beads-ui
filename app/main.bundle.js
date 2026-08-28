var kf=Object.create;var Si=Object.defineProperty;var wf=Object.getOwnPropertyDescriptor;var $f=Object.getOwnPropertyNames;var xf=Object.getPrototypeOf,Af=Object.prototype.hasOwnProperty;var Sf=(e,t,n)=>t in e?Si(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ei=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ef=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of $f(t))!Af.call(e,o)&&o!==n&&Si(e,o,{get:()=>t[o],enumerable:!(r=wf(t,o))||r.enumerable});return e};var Tf=(e,t,n)=>(n=e!=null?kf(xf(e)):{},Ef(t||!e||!e.__esModule?Si(n,"default",{value:e,enumerable:!0}):n,e));var Rt=(e,t,n)=>Sf(e,typeof t!="symbol"?t+"":t,n);var Sl=Ei((Av,Al)=>{var Or=1e3,Lr=Or*60,Ir=Lr*60,hr=Ir*24,Of=hr*7,Lf=hr*365.25;Al.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return If(e);if(n==="number"&&isFinite(e))return t.long?Pf(e):Mf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function If(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Lf;case"weeks":case"week":case"w":return n*Of;case"days":case"day":case"d":return n*hr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Ir;case"minutes":case"minute":case"mins":case"min":case"m":return n*Lr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Or;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Mf(e){var t=Math.abs(e);return t>=hr?Math.round(e/hr)+"d":t>=Ir?Math.round(e/Ir)+"h":t>=Lr?Math.round(e/Lr)+"m":t>=Or?Math.round(e/Or)+"s":e+"ms"}function Pf(e){var t=Math.abs(e);return t>=hr?os(e,t,hr,"day"):t>=Ir?os(e,t,Ir,"hour"):t>=Lr?os(e,t,Lr,"minute"):t>=Or?os(e,t,Or,"second"):e+" ms"}function os(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Tl=Ei((Sv,El)=>{function Df(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Sl(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let g=0;g<d.length;g++)p=(p<<5)-p+d.charCodeAt(g),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,g=null,_,$;function R(...j){if(!R.enabled)return;let G=R,ie=Number(new Date),ee=ie-(p||ie);G.diff=ee,G.prev=p,G.curr=ie,p=ie,j[0]=n.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let F=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(I,W)=>{if(I==="%%")return"%";F++;let K=n.formatters[W];if(typeof K=="function"){let ne=j[F];I=K.call(G,ne),j.splice(F,1),F--}return I}),n.formatArgs.call(G,j),(G.log||n.log).apply(G,j)}return R.namespace=d,R.useColors=n.useColors(),R.color=n.selectColor(d),R.extend=r,R.destroy=n.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(_!==n.namespaces&&(_=n.namespaces,$=n.enabled(d)),$),set:j=>{g=j}}),typeof n.init=="function"&&n.init(R),R}function r(d,p){let g=n(this.namespace+(typeof p>"u"?":":p)+d);return g.log=this.log,g}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of p)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function s(d,p){let g=0,_=0,$=-1,R=0;for(;g<d.length;)if(_<p.length&&(p[_]===d[g]||p[_]==="*"))p[_]==="*"?($=_,R=g,_++):(g++,_++);else if($!==-1)_=$+1,R++,g=R;else return!1;for(;_<p.length&&p[_]==="*";)_++;return _===p.length}function i(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(s(d,p))return!1;for(let p of n.names)if(s(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}El.exports=Df});var Cl=Ei((fn,ss)=>{fn.formatArgs=qf;fn.save=Ff;fn.load=jf;fn.useColors=Nf;fn.storage=Bf();fn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();fn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Nf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function qf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ss.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}fn.log=console.debug||console.log||(()=>{});function Ff(e){try{e?fn.storage.setItem("debug",e):fn.storage.removeItem("debug")}catch{}}function jf(){let e;try{e=fn.storage.getItem("debug")||fn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Bf(){try{return localStorage}catch{}}ss.exports=Tl()(fn);var{formatters:Uf}=ss.exports;Uf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var no=globalThis,Xo=no.trustedTypes,cl=Xo?Xo.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ci="$lit$",Fn=`lit$${Math.random().toFixed(9).slice(2)}$`,Ri="?"+Fn,Cf=`<${Ri}>`,fr=document,ro=()=>fr.createComment(""),oo=e=>e===null||typeof e!="object"&&typeof e!="function",Oi=Array.isArray,ml=e=>Oi(e)||typeof e?.[Symbol.iterator]=="function",Ti=`[ 	
\f\r]`,to=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ul=/-->/g,dl=/>/g,dr=RegExp(`>|${Ti}(?:([^\\s"'>=/]+)(${Ti}*=${Ti}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pl=/'/g,fl=/"/g,gl=/^(?:script|style|textarea|title)$/i,Li=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Li(1),io=Li(2),bv=Li(3),yn=Symbol.for("lit-noChange"),qt=Symbol.for("lit-nothing"),_l=new WeakMap,pr=fr.createTreeWalker(fr,129);function hl(e,t){if(!Oi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return cl!==void 0?cl.createHTML(t):t}var bl=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=to;for(let l=0;l<n;l++){let a=e[l],u,d,p=-1,g=0;for(;g<a.length&&(i.lastIndex=g,d=i.exec(a),d!==null);)g=i.lastIndex,i===to?d[1]==="!--"?i=ul:d[1]!==void 0?i=dl:d[2]!==void 0?(gl.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=dr):d[3]!==void 0&&(i=dr):i===dr?d[0]===">"?(i=o??to,p=-1):d[1]===void 0?p=-2:(p=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?dr:d[3]==='"'?fl:pl):i===fl||i===pl?i=dr:i===ul||i===dl?i=to:(i=dr,o=void 0);let _=i===dr&&e[l+1].startsWith("/>")?" ":"";s+=i===to?a+Cf:p>=0?(r.push(u),a.slice(0,p)+Ci+a.slice(p)+Fn+_):a+Fn+(p===-2?l:_)}return[hl(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},so=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=bl(t,n);if(this.el=e.createElement(u,r),pr.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=pr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(Ci)){let g=d[i++],_=o.getAttribute(p).split(Fn),$=/([.?@])?(.*)/.exec(g);a.push({type:1,index:s,name:$[2],strings:_,ctor:$[1]==="."?Jo:$[1]==="?"?es:$[1]==="@"?ts:mr}),o.removeAttribute(p)}else p.startsWith(Fn)&&(a.push({type:6,index:s}),o.removeAttribute(p));if(gl.test(o.tagName)){let p=o.textContent.split(Fn),g=p.length-1;if(g>0){o.textContent=Xo?Xo.emptyScript:"";for(let _=0;_<g;_++)o.append(p[_],ro()),pr.nextNode(),a.push({type:2,index:++s});o.append(p[g],ro())}}}else if(o.nodeType===8)if(o.data===Ri)a.push({type:2,index:s});else{let p=-1;for(;(p=o.data.indexOf(Fn,p+1))!==-1;)a.push({type:7,index:s}),p+=Fn.length-1}s++}}static createElement(t,n){let r=fr.createElement("template");return r.innerHTML=t,r}};function _r(e,t,n=e,r){if(t===yn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=oo(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=_r(e,o._$AS(e,t.values),o,r)),t}var Zo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??fr).importNode(n,!0);pr.currentNode=o;let s=pr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Cr(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new ns(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=pr.nextNode(),i++)}return pr.currentNode=fr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Cr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=qt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=_r(this,t,n),oo(t)?t===qt||t==null||t===""?(this._$AH!==qt&&this._$AR(),this._$AH=qt):t!==this._$AH&&t!==yn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ml(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==qt&&oo(this._$AH)?this._$AA.nextSibling.data=t:this.T(fr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=so.createElement(hl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new Zo(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=_l.get(t.strings);return n===void 0&&_l.set(t.strings,n=new so(t)),n}k(t){Oi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(ro()),this.O(ro()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},mr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=qt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=qt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=_r(this,t,n,0),i=!oo(t)||t!==this._$AH&&t!==yn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=_r(this,l[r+a],n,a),u===yn&&(u=this._$AH[a]),i||(i=!oo(u)||u!==this._$AH[a]),u===qt?t=qt:t!==qt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===qt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Jo=class extends mr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===qt?void 0:t}},es=class extends mr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==qt)}},ts=class extends mr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=_r(this,t,n,0)??qt)===yn)return;let r=this._$AH,o=t===qt&&r!==qt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==qt&&(r===qt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ns=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){_r(this,t)}},yl={M:Ci,P:Fn,A:Ri,C:1,L:bl,R:Zo,D:ml,V:_r,I:Cr,H:mr,N:es,U:ts,B:Jo,F:ns},Rf=no.litHtmlPolyfillSupport;Rf?.(so,Cr),(no.litHtmlVersions??(no.litHtmlVersions=[])).push("3.3.1");var at=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Cr(t.insertBefore(ro(),s),s,void 0,n??{})}return o._$AI(e),o};var rs="today",vl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Rr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Ln(e){return e==="today"?"today":"7d"}function Ii(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function gr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function kl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function $l(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function xl(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Rl=Tf(Cl(),1);function Pt(e){return(0,Rl.default)(`beads-ui:${e}`)}function Wf(e){let n=Ol((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ol(e){return typeof e=="string"?e.trim():""}function zf(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var Hf=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Mr(e){let t=Wf(e),n=Ol(zf(e).spec_review),r=Hf.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function kn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ao(e,t){let n=kn(e.created_at),r=kn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Nl(e,t){let n=kn(e.created_at),r=kn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function ql(e,t){let n=kn(e.updated_at),r=kn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function Fl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=kn(e.created_at),s=kn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function jl(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var is=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function Gf(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(is,e)}function Pi(e){if(!e||typeof e!="object")return!1;let t=e;return Gf(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Ll(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Il(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Mr(e).evidence==="published"?1:0;case"created":return Ll(e.created_at);case"updated":return Ll(e.updated_at);default:return null}}function Ml(e,t,n){let r=Il(e,n.key),o=Il(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function Bl(e){let t=Array.isArray(e)?e.filter(Pi):[];return(n,r)=>{for(let l of t){let a=Ml(n,r,l);if(a!==0)return a}let o=Ml(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var Kf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Pl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Dl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Kf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Ul(e,t){let n=Pl(e),r=Pl(t);if(n!==r)return n<r?-1:1;let o=Dl(e),s=Dl(t);if(o!==s)return o<s?-1:1;let i=kn(e&&e.created_at),l=kn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Mi=2**20;function Pr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-kn(e&&e.created_at)}function Wl(e){return(t,n)=>{let r=Pr(t,e),o=Pr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function Di(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Pr(l,n)-Mi};if(!l)return{rank:Pr(i,n)+Mi};let a=Pr(i,n),u=Pr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((p,g)=>({bead_id:p.id,rank:g*Mi}))}}function Ni(e,t={}){let n=Pt(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||ao;function u(){for(let g of Array.from(i))try{g()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(g){if(l||!g||g.id!==e)return;let _=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,_),!(_<=s&&g.type!=="snapshot")){if(g.type==="snapshot"){if(_<=s)return;r.clear();let $=Array.isArray(g.issues)?g.issues:[];for(let R of $)R&&typeof R.id=="string"&&R.id.length>0&&r.set(R.id,R);d(),s=_,u();return}if(g.type==="upsert"){let $=g.issue;if($&&typeof $.id=="string"&&$.id.length>0){let R=r.get($.id);if(!R)r.set($.id,$);else{let j=Number.isFinite(R.updated_at)?R.updated_at:0,G=Number.isFinite($.updated_at)?$.updated_at:0;if(j<=G){for(let ie of Object.keys(R))ie in $||delete R[ie];for(let[ie,ee]of Object.entries($))R[ie]=ee}}d()}s=_,u()}else if(g.type==="delete"){let $=String(g.issue_id||"");$&&(r.delete($),d()),s=_,u()}}}return{id:e,subscribe(g){return i.add(g),()=>{i.delete(g)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(g){return r.get(g)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function as(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function zl(e){let t=Pt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],g=Array.isArray(a.removed)?a.removed:[];for(let _ of Array.from(u)){let $=n.get(_);if(!$)continue;let R=$.itemsById;for(let j of d)typeof j=="string"&&j.length>0&&R.set(j,!0);for(let j of p)typeof j=="string"&&j.length>0&&R.set(j,!0);for(let j of g)typeof j=="string"&&j.length>0&&R.delete(j)}}async function s(l,a){let u=as(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==u){let g=r.get(p.key);g&&(g.delete(l),g.size===0&&r.delete(p.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let g=n.get(l)||null;if(g){let _=r.get(g.key);_&&(_.delete(l),_.size===0&&r.delete(g.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let g=r.get(p.key);g&&(g.delete(l),g.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:as,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Hl(){let e=Pt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let p=u?as(u):"",g=n.get(a)||"",_=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,g),_&&g&&p&&g!==p){let $=t.get(a);if($)try{$.dispose()}catch{}let R=o.get(a);if(R){try{R()}catch{}o.delete(a)}let j=Ni(a,d);t.set(a,j);let G=j.subscribe(()=>s());o.set(a,G)}else if(!_){let $=Ni(a,d);t.set(a,$);let R=$.subscribe(()=>s());o.set(a,R)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Gl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Kl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function qi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Yf(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function Vf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Yl(e){let t=Pt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):Yf(r),i=Vf(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=qi(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?qi(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var Qf=Object.freeze({workspace_config:{default_workspace:null}});function Vl(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Qf.workspace_config.default_workspace}}}function Ql(e={}){let t=Pt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Vl(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?Vl(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Xl(e){let t=Pt("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(p,g)=>{let _=o++,$=Date.now();r.set(_,{type:p,start_ts:$}),t("request start id=%d type=%s count=%d",_,p,n+1),i();let R=!1,j=()=>{R||(R=!0,r.delete(_),l())},G=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",_,p,Date.now()-$),j())},3e4);try{let ie=await u(p,g),ee=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",_,p,ee),ie}catch(ie){let ee=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",_,p,ee,ie),ie}finally{clearTimeout(G),j()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Dr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(jl),a;switch(l){case"created_desc":return a.sort(ao),a;case"created_asc":return a.sort(Nl),a;case"updated_desc":return a.sort(ql),a;case"priority":return a.sort(Fl),a;case"manual":default:{let u=n();return u?a.sort(Wl(u)):a.sort(ao),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function Jn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Yt(e){let t=Jn(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function rn(e,t){let n=Jn(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Zl(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=Jn(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function ls(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function cs(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=ls(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function us(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=Zl(n);return{total:n.length,count:r,current:o,children:n}}function Jl(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Di(l,a,u.order),i);o(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let g={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(g);let _=r(Di(l,a,g.order),i);o(g,_);let $=await t("ui-order-set",{expected_revision:g.revision,entries:_});$&&$.applied&&n.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:s}}function ec(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function lo(e,t){let n=ec(e),r=ec(t);return n.length===0||r.length===0?!1:n!==r}function ds(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fi(e,t){return!t||typeof e!="string"||e.length===0||ds(t.visible_labels).includes(e)?!0:ds(t.hidden_labels).includes(e)?!1:!ds(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function tc(e,t){return ds(e).filter(n=>Fi(n,t))}function er(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Xf(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Zf(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Jf(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${Xf(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function ps(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(Ul):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Zf(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>Jf(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var e_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},rc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},nc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},t_={review:"\u2713",skip:"\u2298"},tr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function n_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function oc(e){let t=e&&e.fill||"none";return t==="none"?tr.none:e&&e.stale===!0?tr.stale:t==="dim"?tr.dim:e&&e.glyph==="review"?tr.review:e&&e.glyph==="skip"?tr.skip:tr.done}function r_(e){if(!e||e.fill==="none"||!e.approval_state)return oc(e);let t=[];return e.glyph==="review"?t.push(tr.review):e.glyph==="skip"&&t.push(tr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function o_(e,t,n,r){let o=e_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=t_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",p=rc[e]||e,g=r?sc(t):null;if(!g)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${p}</div>
      </div>
    `;let _=`${p} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${g.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${_}
      title=${_}
      @click=${$=>{$.preventDefault(),$.stopPropagation(),r($,g,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${p}</div>
    </button>
  `}function sc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function fs(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=nc[e.route]||nc.spec_backed,s=e.stages,i=n_(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${rc[u]||u} ${u==="plan"?r_(s[u]||{}):oc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>sc(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>o_(u,s[u]||{},u===i,r))}
    </div>
  `}function s_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ic=2;function ac(e){let t=e.slice(0,ic).join(", "),n=e.length-ic;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function i_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(lo(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${ac(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${ac(s)}</span
      >`),n}function a_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function ji(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function _s(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function jn(e){return`${e.kind}:${_s(e)}@${e.sha}`}function ms(e,t){if(!e)return null;let n=ji(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=ji(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${jn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function lc(e,t){let n=ms(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function l_(e){if(!e)return null;let t=ji(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${jn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function c_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&er(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&er(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&er(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=lc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${jn(l)}`}
        >${`exec ${l.kind==="delegated"?_s(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of tc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&er(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),er(n,"blocked")){let l=a_(e.metadata);l&&o.push(l),o.push(...i_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&er(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function u_(e){let t=rn(e.created_at),n=rn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Yt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Yt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function d_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return ps(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:u_(e),empty_label:"children \uC5C6\uC74C",childChips:Bi,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Bi(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return ms(t,n)?c`<span class="board-card__roll-child-chips">
    ${lc(t,n)}
    ${l_(n)}
  </span>`:null}function gs(e,t){let n=s_(e.priority);return c`
    <article
      class="board-card"
      data-issue-id=${e.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${r=>t.onCardClick(r,e.id)}
      @dragstart=${r=>t.onDragStart(r,e.id)}
      @dragend=${t.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${e.id} \uBCF5\uC0AC`}
          @click=${r=>t.onCopyId(r,e.id)}
        >
          ${e.id}
        </button>
        ${n?c`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${c_(e,t)}
      ${e.workflow&&er(t.policy||null,"stepper")?fs(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${d_(e,t)}
    </article>
  `}function Nr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
    <section class=${r?"board-column board-column--closed":"board-column"} id=${e.id}>
      <header
        class="board-column__header"
        id=${e.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${e.title}</span>
          <span class="board-column__count" aria-label=${`${n}\uAC74`}
            >${n}</span
          >
        </div>
        ${r?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${vl.map(s=>c`<option
                    value=${s.value}
                    ?selected=${s.value===e.closed_range}
                  >
                    ${s.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(s=>gs(s,t))}
      </div>
    </section>
  `}function cc(e,t,n){return c`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${n.onOverlayClick}
      @cancel=${n.onClose}
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
            @click=${n.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>gs(r,t))}
        </div>
      </div>
    </dialog>
  `}var p_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],f_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],__=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function m_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${o} ▾
      </button>
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(s=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(s)}
                        @change=${()=>t.onLabelToggle(s)}
                      />
                      <span>${s}</span>
                    </label>`)}
            ${r>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function uc(e,t,n){return c`
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
        ${p_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.priority===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${t.onTypeChange}
      >
        ${f_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${m_(e,t,n)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${n.deferred_popup_open?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-haspopup="dialog"
        aria-expanded=${n.deferred_popup_open?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${n.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${__.map(r=>c`<option
              value=${r.value}
              ?selected=${n.sort_mode===r.value}
            >
              ${r.label}
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
  `}var g_=200,h_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},b_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),dc="beads-ui.board.sort",pc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function y_(){try{let e=window.localStorage.getItem(dc);if(e&&pc.has(e))return e}catch{}return"created_desc"}function fc(e,t){let n=Pt("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,g=t.closedRange||rs,_=o?Dr(o,i):null,$=Jl({transport:s,uiOrderStore:i}),R=[],j=[],G=[],ie=[],ee=[],F=[],M=!1,I=0,W=y_(),K=new Map,ne=new Map,D=new Map,Y=new Set,H={search:"",priority:"",type:"",labels:[]},Z=!1,Oe=null;function we(O){return String(O.status||"open")==="open"}function ce(O){return String(O.status||"open")==="open"}function q(O){let X=H.search.trim().toLowerCase(),Ne=H.priority,Ve=H.type,qe=H.labels;return O.filter(ct=>{if(X){let st=String(ct.id||"").toLowerCase(),We=String(ct.title||"").toLowerCase();if(!st.includes(X)&&!We.includes(X))return!1}if(Ne!==""&&String(ct.priority)!==Ne||Ve!==""&&String(ct.issue_type||"")!==Ve)return!1;if(qe.length>0){let st=Array.isArray(ct.labels)?ct.labels:[];if(!qe.some(We=>st.includes(We)))return!1}return!0})}function $e(){let O=new Set;for(let X of[R,j,G,ie,ee,F])for(let Ne of X){let Ve=Array.isArray(Ne.labels)?Ne.labels:[];for(let qe of Ve)typeof qe=="string"&&qe.length>0&&O.add(qe)}return Array.from(O).sort()}function Se(){return H.search.trim()!==""||H.priority!==""||H.type!==""||H.labels.length>0}function E(){try{if(_){let O=_.selectBoardColumn("tab:board:in-progress","in_progress",W),X=_.selectBoardColumn("tab:board:blocked","blocked",W).filter(ce),Ne=new Set(O.map(Ke=>Ke.id)),Ve=_.selectBoardColumn("tab:board:ready","ready",W).filter(Ke=>we(Ke)&&!Ne.has(Ke.id)),qe=_.selectBoardColumn("tab:board:resolved","resolved",W),ct=_.selectBoardColumn("tab:board:deferred","deferred",W),st=_.selectBoardColumn("tab:board:closed","closed").slice(0,g_),We=[...X,...Ve,...O,...qe,...st];J(We);let et=new Set;for(let Ke of We)Ke&&Ke.id&&!ls(Ke)&&et.add(Ke.id);let kt=!Se();R=kt?co(X,et):X,j=kt?co(Ve,et):Ve,G=kt?co(O,et):O,ie=kt?co(qe,et):qe,ee=ct,I=ct.length,F=kt?co(st,et):st,K=new Map;for(let Ke of R)K.set(Ke.id,"open");for(let Ke of j)K.set(Ke.id,"open");for(let Ke of G)K.set(Ke.id,"in_progress");for(let Ke of ie)K.set(Ke.id,"resolved");for(let Ke of ee)K.set(Ke.id,"deferred");for(let Ke of F)K.set(Ke.id,"closed");ne=new Map;for(let Ke of R)ne.set(Ke.id,"blocked-col");for(let Ke of j)ne.set(Ke.id,"ready-col");for(let Ke of G)ne.set(Ke.id,"in-progress-col");for(let Ke of ie)ne.set(Ke.id,"resolved-col");for(let Ke of F)ne.set(Ke.id,"closed-col")}Be()}catch{R=[],j=[],G=[],ie=[],ee=[],F=[],D=new Map,Be()}}function J(O){D=cs(O)}function Ce(O){return us(D,O)}function fe(O){return!Y.has(O)}function xe(O,X){O.preventDefault(),O.stopPropagation(),Y.has(X)?Y.delete(X):Y.add(X),Be()}function me(O,X){O.preventDefault(),O.stopPropagation(),r(X)}function Ue(O,X){O.preventDefault(),O.stopPropagation(),r(X)}function dt(O,X){Oe||r(X)}function Pe(O,X){O.preventDefault(),O.stopPropagation(),v_(X).then(Ne=>{Ne&&de("\uBCF5\uC0AC\uB428","success",1200)})}function B(O,X){Oe=X,O.dataTransfer&&(O.dataTransfer.setData("text/plain",X),O.dataTransfer.effectAllowed="move"),O.target.classList.add("board-card--dragging")}function ue(O){O.target.classList.remove("board-card--dragging"),jt(),setTimeout(()=>{Oe=null},0)}function se(O){let X=String(O.target.value||"");!X||X===g||(g=X,u&&u(X),Be())}function ae(){return l?l.get():null}function Ee(O){let X=a?a.get():null,Ne=X?X.cleanup_failed:null;if(!Ne||typeof Ne!="object"||Array.isArray(Ne))return null;let Ve=Ne[O];return!Ve||typeof Ve!="object"||Array.isArray(Ve)?null:Ve}let _e={onCardClick:dt,onCopyId:Pe,onDragStart:B,onDragEnd:ue,onClosedRangeChange:se,rollupFor:Ce,isExpanded:fe,onRollupToggle:xe,onChildClick:me,onFromChipClick:Ue,onOpenDoc:p?(O,X)=>p(X):void 0,cleanupFailureFor:Ee,get policy(){return ae()}};function Le(O,X){Oe||(U(),r(X))}function Ze(O,X){O.preventDefault(),O.stopPropagation(),U(),r(X)}let Ge={..._e,onCardClick:Le,onChildClick:Ze,onFromChipClick:Ze,onOpenDoc:p?(O,X)=>{U(),p(X)}:void 0,get policy(){return ae()}};function ze(O){let X=O.target,Ne=e.querySelector(".board-filter__labels");X&&Ne&&Ne.contains(X)||Ae()}function te(O){O.key==="Escape"&&Ae()}function z(){Z||(Z=!0,document.addEventListener("mousedown",ze),document.addEventListener("keydown",te),Be())}function Ae(){Z&&(Z=!1,document.removeEventListener("mousedown",ze),document.removeEventListener("keydown",te),Be())}function lt(O){O.key==="Escape"&&U()}function x(){M||(M=!0,document.addEventListener("keydown",lt),Be())}function U(){M&&(M=!1,document.removeEventListener("keydown",lt),Be())}let he={onClose:U,onOverlayClick(O){O.target===O.currentTarget&&U()}},De={onSearchInput(O){H.search=String(O.target.value||""),E()},onPriorityChange(O){H.priority=String(O.target.value||""),E()},onTypeChange(O){H.type=String(O.target.value||""),E()},onSortChange(O){let X=String(O.target.value||"");if(!(!pc.has(X)||X===W)){W=X;try{window.localStorage.setItem(dc,X)}catch{}E()}},onDeferredToggle(){M?U():x()},onLabelMenuToggle(){Z?Ae():z()},onLabelToggle(O){let X=H.labels.indexOf(O);X===-1?H.labels.push(O):H.labels.splice(X,1),E()},onLabelClear(){H.labels.length!==0&&(H.labels=[],E())},onNewIssue(){d&&d()}};function Fe(){return c`
      <div class="board-view">
        ${uc(H,De,{sort_mode:W,deferred_popup_open:M,deferred_count:I,label_options:$e(),label_menu_open:Z})}
        <div class="board-root">
          ${Nr({title:"Blocked",id:"blocked-col",items:q(R)},_e)}
          ${Nr({title:"Ready",id:"ready-col",items:q(j)},_e)}
          ${Nr({title:"In progress",id:"in-progress-col",items:q(G)},_e)}
          ${Nr({title:"Resolved",id:"resolved-col",items:q(ie)},_e)}
          ${Nr({title:"Closed",id:"closed-col",items:q(F),is_closed:!0,closed_range:g},_e)}
        </div>
        ${M?cc({items:q(ee),count:I},Ge,he):""}
      </div>
    `}function Be(){at(Fe(),e),ut()}function ut(){try{let O=e.querySelector("#deferred-popup");O&&!O.open&&(typeof O.showModal=="function"?O.showModal():O.setAttribute("open",""));let X=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ne of X)Array.from(Ne.querySelectorAll(".board-card")).forEach((qe,ct)=>{qe.tabIndex=ct===0?0:-1})}catch{}}async function At(O,X){if(!s){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:O,status:X}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ne){n("update-status failed: %o",Ne),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Dt(O){switch(O){case"blocked-col":return R;case"ready-col":return j;case"in-progress-col":return G;case"resolved-col":return ie;default:return[]}}function Wt(O,X,Ne){if(!s||!i)return;let Ve=Dt(O),qe=Ve.find(kt=>kt.id===X);if(!qe)return;let ct=Ve.filter(kt=>kt.id!==X),st=Ne.closest?Ne.closest(".board-card"):null,We=ct.length;if(st){let kt=st.getAttribute("data-issue-id");if(kt===X)return;let Ke=ct.findIndex(Ot=>Ot.id===kt);Ke>=0&&(We=Ke)}let et=ct.slice();et.splice(We,0,qe),$.applyReorder(X,et,We)}function jt(){for(let O of Array.from(e.querySelectorAll(".board-column--drag-over")))O.classList.remove("board-column--drag-over")}let ht=null;e.addEventListener("dragover",O=>{O.preventDefault(),O.dataTransfer&&(O.dataTransfer.dropEffect="move");let Ne=O.target.closest(".board-column");Ne&&Ne!==ht&&(ht&&ht.classList.remove("board-column--drag-over"),Ne.classList.add("board-column--drag-over"),ht=Ne)}),e.addEventListener("dragleave",O=>{let X=O.relatedTarget;(!X||!e.contains(X))&&ht&&(ht.classList.remove("board-column--drag-over"),ht=null)}),e.addEventListener("drop",O=>{O.preventDefault(),ht&&(ht.classList.remove("board-column--drag-over"),ht=null);let X=O.target,Ne=X.closest(".board-column");if(!Ne)return;let Ve=O.dataTransfer?.getData("text/plain")||"";if(!Ve)return;let qe=Ne.id,ct=ne.get(Ve);if(ct&&ct===qe){if(b_.has(qe)){if(W!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Wt(qe,Ve,X)}return}let st=h_[qe];if(!st){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}K.get(Ve)!==st&&At(Ve,st)}),e.addEventListener("keydown",O=>{let X=O.target;if(!(X instanceof HTMLElement))return;let Ne=String(X.tagName||"").toLowerCase();if(Ne==="input"||Ne==="textarea"||Ne==="select"||Ne==="button"||Ne==="a"||X.isContentEditable===!0)return;let Ve=X.closest(".board-card");if(!Ve)return;let qe=String(O.key||"");if(qe==="Enter"||qe===" "){O.preventDefault();let et=Ve.getAttribute("data-issue-id");et&&r(et);return}if(qe!=="ArrowUp"&&qe!=="ArrowDown"&&qe!=="ArrowLeft"&&qe!=="ArrowRight")return;O.preventDefault();let ct=Ve.closest(".board-column");if(!ct)return;let st=Array.from(ct.querySelectorAll(".board-card")),We=st.indexOf(Ve);if(qe==="ArrowDown"&&We<st.length-1){Ye(Ve,st[We+1]);return}if(qe==="ArrowUp"&&We>0){Ye(Ve,st[We-1]);return}if(qe==="ArrowLeft"||qe==="ArrowRight"){let et=Array.from(e.querySelectorAll(".board-column")),kt=et.indexOf(ct),Ke=qe==="ArrowRight"?1:-1,Ot=kt+Ke;for(;Ot>=0&&Ot<et.length;){let Je=et[Ot].querySelector(".board-card");if(Je){Ye(Ve,Je);return}Ot+=Ke}}});function Ye(O,X){try{O.tabIndex=-1,X.tabIndex=0,X.focus()}catch{}}let L=null;_&&_.subscribe&&(L=_.subscribe(()=>{try{E()}catch{}}));let re=null;l&&l.subscribe&&(re=l.subscribe(()=>{try{E()}catch{}}));let ge=null;return a&&a.subscribe&&(ge=a.subscribe(()=>{Be()})),{async load(){n("load"),E()},clear(){Ae(),U(),L&&(L(),L=null),re&&(re(),re=null),ge&&(ge(),ge=null),e.replaceChildren(),R=[],j=[],G=[],ie=[],ee=[],F=[],K=new Map,ne=new Map}}}function co(e,t){return e.filter(n=>{let r=ls(n);return!(r&&t.has(r))})}async function v_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var tn=e=>e??qt;async function on(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function br(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function uo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function k_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${br(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${br(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Bn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await k_(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var w_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],_c={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},$_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function zt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ft(e){return typeof e=="string"&&e.length>0?e:null}function qr(e){return e.startsWith("gpt-")?e.slice(4):e}function It(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function gc(e,t,n){let r=Ft(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ft(n[e]);return o===null?null:{value:o,source:"global"}}function po(e,t,n,r){return gc(e,t,n)||{value:r,source:"base"}}function Ui(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&zt(o?.[t])){let i=Ft(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&zt(o)){for(let i of Object.values(o))if(zt(i)){let l=Ft(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Ft(r?.runners?.[s]?.models?.[e]?.id)||e}function x_(e,t){return Ft(t?.review?.reviewers?.[e]?.model)||e}function Fr(e,t,n=!1){if(e==="default")return It(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?qr(e):e;return It(e,t,r,e,"explicit")}function hc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];zt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(zt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function A_(e,t){let n=[],r=e?.implementation?.model_catalog;zt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(zt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function S_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of A_(t,n)){let s=hc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Wi(e){return It(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function mc(e,t,n){let r=gc(e,t,n);return r?Fr(r.value,r.source):It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function mn(e){let t=zt(e.pin)?e.pin:{},n=zt(e.global)?e.global:{},r=zt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&zt(r.session)?r.session:null,s=r?.supported===!0&&zt(r.orchestration)?r.orchestration:null,i=zt(e.runner_catalog)?e.runner_catalog:null,l=Ft(n.quick_fix_impl_model),a=S_(l,o,i),u={};if(o){let d=po("workflow_mode",t,n,Ft(o.workflow_mode_default));u.workflow_mode=d.source==="base"?It(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Fr(d.value,d.source);for(let ee of["spec_review","plan_review","impl_review"]){let F=`${ee}_model`,M=Ft(ee==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),I=po(F,t,n,M);if(I.value===null)u[F]=It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(I.value!=="self"&&I.value!=="skip"&&!zt(o.review?.reviewers?.[I.value]))u[F]=Wi(It(I.value,I.source,"",null,"explicit"));else{let W=x_(I.value,o);u[F]=It(I.value,I.source,qr(W),W,I.source==="base"?"default":"explicit")}}for(let[ee,F]of Object.entries(_c)){let M=u[F].value;if(M==="self"||M==="skip"){u[ee]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let I=Ft(o.review?.reviewers?.[M||""]?.effort),W=po(ee,t,n,I);u[ee]=W.value===null?It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):It(W.value,W.source,W.value,W.value,W.source==="base"?"default":"explicit")}let p=zt(o.implementation?.default)?o.implementation.default:{},g=Ft(e.route),_=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),$=zt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},R=_&&zt($[g])?$[g]:{};for(let ee of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let F=po(ee,t,n,ee==="impl_dispatch"?Ft(R.dispatch)||Ft(p.dispatch):Ft(p[ee.replace("impl_","")]));u[ee]=F.value===null?It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):It(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}let j=Ft(t.impl_runtime),G=j==="inherit"?Ft(e.controller_runtime):j,ie=g==="quick_fix"&&Ft(t.impl_dispatch)===null&&a.runtime!==null&&(j===null||G===a.runtime);if(ie){let ee=a.runtime,F=l;u.impl_dispatch=It("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(u.impl_runtime=It(ee,"global",`${ee} (\uC720\uB3C4)`,ee,"explicit")),Ft(t.impl_model)===null&&(u.impl_model=It(F,"global",F,F,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let ee of["impl_runtime","impl_model","impl_effort","impl_speed"])u[ee]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ie&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let ee=u.impl_runtime.value==="inherit"?Ft(e.controller_runtime):u.impl_runtime.value,F=ee?hc(ee,o,i):[];if(u.impl_model.value!=="auto"&&F.length>0&&!F.includes(u.impl_model.value))u.impl_model=Wi(u.impl_model);else{let M=Ui(u.impl_model.value,ee,o,i);u.impl_model.display=qr(M),u.impl_model.full_value=M}}if(u.impl_effort.value==="auto"){let ee=Ft(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),F=ee?Ft(o.implementation?.effort_by_transport?.[ee]?.auto):null;F&&!$_.has(F)?(u.impl_effort.display=`${F} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=F,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?It("default","base","default (\uC77C\uBC18)","default","default"):Fr("default",u.impl_speed.source))}}else for(let d of w_.filter(p=>!p.startsWith("orchestration_")))u[d]=mc(d,t,n);if(!o){for(let[d,p]of Object.entries(_c))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=mc(d,t,n);continue}let p=d.replace("orchestration_",""),g=Ft(s[p]),_=po(d,t,n,g);if(d==="orchestration_effort"&&_.source==="base"){u[d]=It(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(_.value===null){u[d]=It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let $=_.source==="base"?Ft(s.model_id)||_.value:Ui(_.value,null,o,i);u[d]=It(_.value,_.source,qr($),$,_.source==="base"?"default":"explicit");continue}if(_.value==="default"){u[d]=_.source==="base"?It("default","base","default (\uC77C\uBC18)","default","default"):Fr("default",_.source);continue}u[d]=Fr(_.value,_.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=It(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${qr(d)})`,null,"default")}else if(a.runtime!==null){let d=Ui(l,a.runtime,o,i);u.quick_fix_impl_model=It(l,"global",qr(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=Wi(It(l,"global","",null,"explicit")):u.quick_fix_impl_model=Fr(l,"global");return u}function E_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function hs(e){let t=zt(e.pin)?e.pin:{},n=zt(e.global)?e.global:{},r=zt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let g={...r,...p};return mn({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Ft(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:E_(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let g=o({...s,[e.key]:p})[e.key];return{value:p,label:g.display,full_value:g.full_value}})}}function jr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=p=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(p))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),d())}),t.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function zi(e){return`session:${e.provider}:${e.session_id}`}function fo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function T_(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Br(e,t,n,r){return{attempt_id:zi(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:fo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:T_(e,n)}}}var Hi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",C_="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",bc="\uBD84\uD574 \uC5C6\uB294 leg";function Ut(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Mn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Ur=[...Mn,"reasoning_output_tokens"],R_={codex:["implementation","review-consult"],claude:["subagent"]};function Gi(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Mn.some(t=>Number.isFinite(e[t]))}function O_(e){return!e||typeof e!="object"?!1:Ur.some(t=>Number.isFinite(e[t]))}function Ki(e){let t=0;for(let n of Mn)t+=Ut(e?.[n]);return t}function L_(e){return!e||typeof e!="object"?!1:Mn.some(t=>Number.isFinite(e[t]))}function yc(e){return!e||typeof e!="object"?!1:Ur.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function I_(e){let t={};for(let n of Ur)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function vc(e){let t={};for(let n of Ur)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function kc(e,t){return Gi(t)?Ut(t.total_tokens):e==="codex"?Ut(t.input_tokens)+Ut(t.output_tokens):Ki(t)}function M_(e){return e==="claude"?"Claude":"Codex"}function P_(e){return`\u03C4 ${$c(e)}`}function D_(e,t){let n=t.breakdown||{},r=Ut(t.total_only_subtotal);if(Gi(n)||r>0&&!O_(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,C_];return t.replayed&&u.push(Hi),u.join(`
`)}let o=[`\uC785\uB825 ${Ut(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Ut(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${bc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${bc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Hi),a.join(`
`)}function Zt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${M_(n)} ${P_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:D_(n,r)})}return t}function ys(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Ut(l.total_only_subtotal)+Ut(i.total_only_subtotal));for(let a of Ur)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Ut(l.breakdown[a])+Ut(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Yi(e){return!e||typeof e!="object"?null:Wn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function N_(e){return e==="codex"?"codex":"claude"}function In(){return{subtotal:0,breakdown:I_(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function bs(e,t,n){e.subtotal+=t.subtotal,Gi(t.usage)&&(e.total_only+=t.subtotal);for(let r of Ur)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ut(e.breakdown[r])+Ut(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function wc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function $c(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Wr(e){return L_(e)?`\u03C4 ${$c(Ki(e))}`:null}function Un(e){let t=Wr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function _o(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ut(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ut(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Ki(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Hi),n.join(`
`)}function Wn(e,t){let n={claude:In(),codex:In()},r={orchestrator:{claude:In(),codex:In()},implementation:{claude:In(),codex:In()},"review-consult":{claude:In(),codex:In()},subagent:{claude:In(),codex:In()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(yc(a)){let d=N_(l.runner),p=vc(a),g={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:kc(d,p)};p.replayed===!0&&(g.replayed=!0),typeof l.model=="string"&&(g.model=l.model),typeof l.session_id=="string"&&(g.session_id=l.session_id),bs(n[d],g,!0),bs(r.orchestrator[d],g,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!R_[p].includes(d.role)||!yc(d.usage))continue;let g=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!g||o.has(g))continue;o.add(g);let _=vc(d.usage),$={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:_,subtotal:kc(p,_)};$.receipt_id=g,typeof d.agent_type=="string"&&($.agent_type=d.agent_type),typeof d.agent_id=="string"&&($.agent_id=d.agent_id),typeof d.model=="string"&&($.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&($.effort=d.effort),typeof d.session_id=="string"?$.session_id=d.session_id:typeof d.thread_id=="string"&&($.session_id=d.thread_id),typeof d.turn_id=="string"&&($.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&($.completed_at=d.completed_at),_.replayed===!0&&($.replayed=!0),bs(n[p],$,!1),bs(r[$.role][p],$,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=wc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...wc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var xc={running:3,paused:2,failed:1};function zn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Ac(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Sc(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),zn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!zn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),p=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!p&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=xc[u.run_state],p=xc[l];if(d>p||d===p&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var vs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Qi=[...vs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Hn=["orchestration_model","orchestration_effort","orchestration_speed"],zr=[...vs,...Hn],q_=Qi.filter(e=>zr.includes(e)),Ec=["delegated","main"],ks=["inherit","claude","codex"],mo=["default","fast"],go=["standard","fast_track"],ho=["codex","opus","fable","self","skip"],ws=["codex","fable","skip"],$s=["low","medium","high","xhigh"],hn="auto";function gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Tc(e){if(!gn(e)||!gn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))gn(r)&&gn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Hr(e,t){let n=Tc(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[hn,...r.flatMap(([,o])=>o)]}function Cc(e,t,n,r){if(!gn(e)||!gn(e.runners))return[hn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!gn(i)||!gn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==hn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[hn,...o]}function Gr(e,t,n){return Cc(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Xi(e,t,n){return Cc(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function bo(e,t){let n=Tc(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Rc(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Hr(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Gr(t,o,r.impl_model||hn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var F_={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Vi=[...q_,...Hn],j_=[...zr,...Qi].filter((e,t,n)=>n.indexOf(e)===t&&!Vi.includes(e));function Oc(e,t){let n=gn(e)?e:{},r=gn(t)?t:{},o=[];for(let i of Vi){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:F_[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...j_,...Object.keys(r)])!Vi.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function Zi(e,t,n,r,o,s){return hs({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function Lc(e,t){let n={};for(let r of Qi){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function Ic(e,t){let n={};for(let r of Hn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var Ji=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Hn]}],nr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},xs={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ea(e,t,n,r,o,s=null){let i=mn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function Mc(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of ea(e,t,n,r,o,s))i[l.source]+=1;return i}function Pc(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Dc(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var tw=[...vs,...Hn];var Nc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function yo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function As(e){if(!yo(e)||!yo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>yo(n)&&yo(n.models));return t.length>0?t:null}function wn(e,t){let n=As(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function qc(e,t){return yo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Fc(e,t){let n=As(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return qc(r,r.models[t]);return[]}function B_(e){let t=As(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of qc(r,o))n.includes(s)||n.push(s);return n}function U_(e,t){if(!t)return B_(e);let r=As(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of Fc(e,s))o.includes(i)||o.push(i);return o}function jc(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=wn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Fc(t,r.impl_model):U_(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var ta=new Set(["unavailable","not_applicable"]);function rr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Bc(e){return e.filter(t=>t!==null).join(" \xB7 ")}function or(e,t){return t===null?null:`${nr[e]}: ${t.display} (${xs[t.source]})`}function na(e){return e.filter(t=>t!==null).join(`
`)}function ra(e){if(typeof e!="object"||e===null)return null;let t=br(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:na(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(nr.orchestration_model,e.model),n(nr.orchestration_effort,e.effort),n(nr.orchestration_speed,e.speed)])}}function Kr(e,t){let n=rr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=rr(e,"orchestration_effort"),o=rr(e,"orchestration_speed"),s=Bc([wn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:na(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",or("orchestration_model",n),or("orchestration_effort",r),or("orchestration_speed",o)])}}function W_(e,t){return e===null||e.value===null||ta.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function z_(e){return e===null||ta.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function H_(e){return e===null?null:e.value==="auto"?"auto":ta.has(e.resolution)?null:e.display}function yr(e,t){if(typeof e!="object"||e===null)return null;let n=rr(e,"impl_dispatch"),r=rr(e,"impl_runtime"),o=rr(e,"impl_model"),s=rr(e,"impl_effort"),i=rr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Bc([W_(r,t??null),z_(o),H_(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:na(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",or("impl_dispatch",n),or("impl_runtime",r),or("impl_model",o),or("impl_effort",s),or("impl_speed",i)])}}var G_=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var Uc={orchestration_model:["fable"],impl_runtime:["claude"]},K_={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Wc(e){return typeof e=="object"&&e!==null?e:null}function zc(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Y_(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>G_.includes(t))}function vo(e,t=e){let n=Wc(e);if(!n)return null;let r=zc(n.rec_orchestration_model,Uc.orchestration_model);if(r.length===0)return null;let o=zc(n.rec_impl_runtime,Uc.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=Wc(t)||{},l=Object.keys(s),a=0,u=0;for(let p of l){let g=i[p];typeof g=="string"&&g.length>0&&(a+=1,g===s[p]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Y_(n.rec_reason),rec:s,state:d}}function Ss(e){if(!e||typeof e!="object")return"";let t=Array.isArray(e.reasons)?e.reasons:[],n=K_[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(", ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Es(e){return e.replace(/\/+$/,"")}function V_(e,t){let n=Es(e),r=Es(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Ts(e,t){let n=new Set;for(let r of e)for(let o of t){if(!V_(r,o))continue;let s=Es(r),i=Es(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function oa(e,t){return`${e}\0${t}`}function Hc(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function sa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function ko(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Gc(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${ko(o)})`,location_label:ko(o),scope:null,same_lane_ahead:!1};let i=sa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function Kc(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=oa(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=oa(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,g=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],_=o.get(u);if(_)for(let $ of g){let R=r.get($);R&&R!==u&&!_.includes(R)&&_.push(R)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||u.has(p)||(u.add(p),d.push(...o.get(p)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let p=n.get(d);s(d,l)&&p&&u.push(p)}u.length>0&&i.set(l,u)}return i}function Yc(e,t){return oa(e,t)}async function Q_(e){let t=await on(e);de(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Cs(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Q_(e)}}
    >
      ⧉
    </button></span
  >`}function Os(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Qc(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function vr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function Xc(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function Zc(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null};let n=!1,r=null,o=-1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;if(i.bead_id!==t||i.kind!=="review_session")continue;if(i.status==="pending"||i.status==="running"){n=!0;continue}if(i.status!=="failed")continue;let l=typeof i.finished_at=="number"?i.finished_at:0;l>=o&&(o=l,r=typeof i.cause=="string"&&i.cause.length>0?i.cause:null)}return n?{active:!0,failure:null}:{active:!1,failure:r}}function Jc(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Ls(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function X_(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Os(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function eu(e,t){let n=X_(e,t);return n?c`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?c`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?Yt(n.deploy.at):""}
            >${Ls(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${vr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Yr(e){let t=rn(e.created_at),n=rn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Yt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Yt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Z_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function wo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Is(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Gn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,g)=>(p.requested_at||0)-(g.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Z_(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function tu(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Rs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?c`<code>백업: ${r}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${o.number||"?"}</a
        >`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${s.number||"?"} ·
          ${s.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var J_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function nu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:J_[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Ms(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return c`${e.orchestration?c`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?c`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function em(e){return c`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>c`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>c`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?c`<p class="mon-overlap__note">${t.action.text}</p>`:c`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function Ps(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.released)?e.released:[],r=e.dependents||null,o=Array.isArray(e.overlaps)?e.overlaps:[],s=e.scope_missing===!0,i=e.popover||null,l=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&o.length===0&&!s&&!l&&!a?"":c`<div class="worker-deps">
    ${l?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${l.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${l.label}
        </button>`:""}
    ${a?c`<span
          class=${`worker-dep worker-dep--armed${a.orphan?" worker-dep--armed-orphan":""}`}
          title=${a.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
          >${a.orphan?c`${a.label}<button
                  type="button"
                  class="worker-dep__label mon2-arm__release"
                  data-lane-id=${a.lane_id}
                >
                  해제
                </button>`:a.label}</span
        >`:""}
    ${t.map(u=>c`<span
          class=${`worker-dep worker-dep--pred${u.foreign?" worker-dep--foreign":""}`}
          title=${u.title||""}
          >${u.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${u.id}
                data-root-dir=${u.root_dir||""}
              >
                ${u.label}
              </button>`:u.label}</span
        >`)}${n.map(u=>c`<span
          class=${`worker-dep worker-dep--released${u.foreign?" worker-dep--foreign":""}`}
          title=${u.title||""}
          >${u.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${u.id}
                data-root-dir=${u.root_dir||""}
              >
                ${u.label}
              </button>`:u.label}</span
        >`)}${r?c`<span
          class="worker-dep worker-dep--dependents"
          title=${r.title}
          >→ 후속 ${r.count}</span
        >`:""}${o.map(u=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${u.id}
          aria-label=${`scope \uACB9\uCE68 ${u.id} (${u.location_label})`}
          title=${[`\uACB9\uCE68 ${u.id} (${u.location_label})`,...u.prefixes].join(`
`)}
        >
          ⧉ ${u.id}
        </button>`)}${s?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${i?em(i):""}
  </div>`}function Ds(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function tm(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],o=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${o}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function ru(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Ns(e){return e?c`<span
    class="ctl-chip ctl-chip--label worker-card__rec"
    data-state=${e.state}
    title=${Ss(e)}
    >${"\uBCF5\uC7A1"}</span
  >`:""}function ou(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function qs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function nm(e){let t=Array.isArray(e.badges)?e.badges:[],n=Zt(e.usage),r=Un(e.usage),o=rn(e.done_at);return c`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${ou(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Yt(e.done_at)}`}
            >완료 ${o}</span
          >`:""}
      ${t.map(s=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${s}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>c`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?c`<span class="worker-usage" title=${_o(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Qc(e.work_kind)}
            >작업 ${vr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function $n(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return nm(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=Zt(e.usage),s=Un(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,u=a?rn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",_=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,R=e.lane==="done"?"":Ds(e.workflow),j=e.lane==="done"?"":ru(e.from_id),G=qs(e.priority),ie=c`<span class="worker-mini__title">${e.title}</span>`,ee=ou(e.pr_url,e.pr_number),F=r.map(xe=>xe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${xe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${xe===e.completion_badge&&e.completion_title||""}
          >${xe}</span
        >`),M=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",I=o.length>0?o.map(xe=>c`<span class="worker-usage" title=${xe.tooltip}
              >${xe.label}</span
            >`):s?c`<span class="worker-usage" title=${_o(e.usage)}
            >${s}</span
          >`:"",W=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",K=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",ne=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",D=e.discard,Y=D?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${D?.attempt_id||""}
          data-operation-id=${D?.operation?.operation_id||""}
          data-discard-mode=${D?.confirmation||"unmerged"}
          ?disabled=${D?!D.enabled:e.discard_enabled===!1}
          title=${D?D.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${D?.label||"\uD3D0\uAE30"}
        </button>`:"",H=e.stale_work||null,Z=H?c`${H.can_resume||H.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${H.action_id}
            ?disabled=${H.locked}
          >
            기존 작업 이어가기
          </button>`:""}${H.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${H.action_id}
            ?disabled=${H.locked}
          >
            백업 후 새로 시작
          </button>`:""}${H.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${H.action_id}
            ?disabled=${H.locked}
          >
            다시 확인
          </button>`:""}`:"",Oe=H?c`<div class="worker-mini__stale">
        <strong>${H.title}</strong>
        <span>${H.summary}</span>
        <span>${H.cause}</span>
        ${H.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",we=e.revise_action?c`<button
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
        </button>`:"",ce=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),q=Ns(e.rec),$e=Cs(e.log_path),Se=_||R||j||ce||q||I||$e?c`<div class="worker-chips">
          ${_}${R}${j}${ce?Ms(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${q}${I}${$e}
        </div>`:"",E=Ps(e.dependency_chips),J=Rs(e),Ce=t.actions?t.actions:"",fe=!!(i||e.merge_action||e.cancel_action||e.discard_action||D?.operation||e.revise_action||H);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${_}${$}${G}${j}${ee}${ie}${Ce}
          </div>
          <div class="worker-mini__row2">
            ${I}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Yt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Qc(e.work_kind)}
                  >작업 ${vr(e.work_ms)}</span
                >`:""}${F}${W}
            <span class="worker-mini__actions"
              >${K}${ne}${Y}</span
            >
            ${Yr(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${p}${$}${G}${ee}${F}${g}${M}${Ce}
            </div>
            <div class="worker-mini__body">${ie}${Oe}</div>
            ${E}${Se}${fe?c`<div class="worker-mini__foot">
                  ${W}
                  <span class="worker-mini__actions"
                    >${K}${ne}${Y}${we}${Z}</span
                  >
                  ${Rs(e)}
                </div>`:""}
            ${Yr(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${$}${G}${ie}${ee}${F}${g}${M}${W}${K}${ne}${Y}${Ce}
            </div>
            ${E}${Se}${J} ${Yr(e)}`}
  </div>`}function rm(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var om={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"},Fs="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function aa(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=om[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],p=d.includes("missing_description"),g=d.some(ee=>ee.startsWith(Fs)),_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),$=Ps(e.dependency_chips),R=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",j=Ds(u),G=ru(e.from_id),ie=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${qs(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:l?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${a}
              >세션 권장</span
            >`:""}${Ns(e.rec)}${tm(u)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?fs(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${$}
    ${R||j||G||ie?c`<div class="worker-chips">
          ${R}${j}${G}${Ms(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${rm(t.lanes,e.id)}
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
                  class="worker-card__reason${_?" worker-card__reason--danger":""}"
                  >${e.reason}</span
                >`:""}
            <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 후보 레인에서 대기로 가는
                 유일한 경로다 (UI-d13v §6). 막는 것은 예전 드래그와 같다 — spec
                 없는 후보만 막고, blocked-with-spec은 적재할 수 있다. 포인터
                 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":g?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":p?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${Yr(e)}
  </div>`}function Pn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${tn(e.id||void 0)}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<header class="worker-pane__hd">
          <button
            type="button"
            class="worker-pane__toggle"
            data-lane=${e.lane}
            aria-expanded=${t?"false":"true"}
          >
            <span class="worker-pane__caret" aria-hidden="true"
              >${t?"\u25B8":"\u25BE"}</span
            >
            ${r}
          </button>
          ${t||!e.header_control?"":e.header_control}
        </header>`:c`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.header_row?e.header_row:""}${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(o=>e.lane==="candidate"?aa(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):$n(o))}
          </div>`}
  </section>`}function Vc(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function js(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${Vc("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${tn(r.drop)}
            data-root-dir=${tn(r.root_dir)}
            data-lane-id=${tn(r.lane_id)}
            data-lane-length=${tn(r.lane_length)}
          >
            ${t.rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:t.rows}
          </div>`}
    </section>
    <section
      class="worker-wait__area worker-wait__area--serial${n.collapsed?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="worker-wait__area-hd">
        ${Vc("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>sm(o))}
          </div>`}
    </section>
  </div>`}function sm(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Pn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${tn(t.drop)}
        data-root-dir=${tn(t.root_dir)}
        data-lane-id=${tn(t.lane_id)}
        data-lane-length=${tn(t.lane_length)}
      >
        ${e.rows.length===0?c`<div class="worker-pane__empty">
              비어 있음 — 행을 여기로 드래그
            </div>`:e.rows}
      </div>`})}
    ${e.empty?c`<div class="worker-wait__hint">${e.title} · 비어 있음</div>`:""}
    ${e.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:""}
    ${e.after?e.after:""}
  </div>`}function Bs(e){return e.count?c`<section
    class="worker-now${e.live?" worker-pane--live":""}"
    id="worker-now"
  >
    <header class="worker-now__hd">
      <span
        class="worker-pane__dot worker-pane__dot--running"
        aria-hidden="true"
      ></span>
      <span class="worker-now__title">지금</span>
      <span class="worker-now__count">${e.count}</span>
    </header>
    ${e.running_body?e.running_body:""}
    ${e.pr_wait_rows?e.pr_wait_rows:""}
  </section>`:""}var su=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],$o=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Us(e,t){let n=su.find(o=>o.step===e);if(!n)return null;let r=su.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function iu(e){let t=$o.findIndex(n=>n.step===e);return $o.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function kr(e){let t=$o.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function im(e){let t=$o.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:$o.length}}function Ws(e){let t=im(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ca=new Set(["queued","running","retry_pending"]),au=new Set(["failed","succeeded"]),am={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},xo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},lm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:xo.base_containment,child_sweep:xo.child_sweep,branch_cleanup:xo.branch_cleanup,parent_close:xo.parent_close};function cm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function um(e,t,n){return!["verify","deploy"].includes(e.kind)||![...ca,...au].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function dm(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function la(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=am[o];if(!s)return null;let i=Us(n,`${r} ${s}`);return i?{...i,active:ca.has(o),failed:o==="failed"}:null}function pm(e){return!e||typeof e!="object"?null:lm[e.step]||null}function Ao(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=pm(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=cm(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter($=>$&&typeof $=="object"&&um($,t,l)).sort(dm):[],u=i?a:[],d=u.find($=>ca.has($.state));if(d)return la(d);if(o)return o.step==="repo_operations"&&a[0]?la(a[0],!0):null;let p=u.find($=>au.has($.state)?$.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return la(p);if(r){let $=Us(r.step,r.label);return $?{...$,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?xo[e.cleanup_cursor]:null;if(!g)return null;let _=Us(g.step,g.label);return _?{..._,active:!0,failed:!1}:null}function zs(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var fm="\uBBF8\uC801\uC7AC";function ua(e,t){let n=lo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var _m=10080*60*1e3;function lu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-_m)return null;let o=lo(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} \uD574\uC81C: ${t.id}`,title:`${t.id}\uAC00 ${Yt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function cu(e){let t=e.count;if(typeof t!="number"||!Number.isFinite(t)||t<=0)return null;let n=Array.isArray(e.ids)?e.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t-n.length,o=[n.join(", "),r>0?`\uC678 ${r}`:""].filter(s=>s.length>0);return{count:t,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9AC\uB294 \uC774\uC288: ${o.join(" ")}`}}function uu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=ua(s,{id:a,location_label:o.get(a)||fm}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var Gs=1,So=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],fa=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Vr={show_blocked:!0,spec:"all"},du={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function mm(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!zn(r)||(n=typeof r.status=="string"?r.status:null);return n}function gm(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!zn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function hm(e,t,n={}){let{winners:r,resumed_from_ids:o}=Sc(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,g=u!=="running"&&p&&!o.has(a.attempt_id),_=p?o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00",$=_t(n.observations?.[i]),R=_t($.pr),j=typeof a.merge_sha=="string"&&a.merge_sha.length>0||R.state==="MERGED",G=Gn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:j}),ie=u==="failed"?fu(a,{resume_eligible:g,resume_reason:_,confirmation:G.confirmation}):null;s.set(i,{...pu(a,e,u),started_at:d,...ie?{failure:ie}:{},can_pause:u==="running"&&p,can_resume:g})}for(let[i,l]of ym(e,t)){if(s.has(i))continue;let a=l.attempt,u=Gn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=hu(a);s.set(i,{...pu(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:fu(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation})}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function pu(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Wn(t,e.bead_id)}}function fu(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:hu(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:tu(e),confirmation:t.confirmation}}function hu(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var bm=new Set(["parked","retry_wait"]);function ym(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&zn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!zn(s)||!bm.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function _u(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function _t(e){return e&&typeof e=="object"?e:{}}function vm(e,t,n){let r=_t(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=g=>mn({pin:g,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=mu(Kr(a,s),Kr(u,s)),p=mu(yr(a,null),yr(u,null));return d||p?{orchestration:d,worker:p}:null}function mu(e,t){return!e||t&&t.text===e.text?null:e}var km=2;function wm(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(a=>a&&typeof a=="object"&&typeof a.id=="string").slice().sort((a,u)=>(typeof u.closed_at=="number"?u.closed_at:0)-(typeof a.closed_at=="number"?a.closed_at:0)),s=[];for(let a of o){let u=lu(e,a,n);u&&s.push(u)}if(s.length===0)return null;let i=s.slice(0,km),l=s.length-i.length;if(l>0){let a=i[i.length-1];i[i.length-1]={...a,label:`${a.label} \uC678 ${l}`}}return i}function _a(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var $m=new Set(["quick_fix","spec_backed","full_plan"]);function gu(e){return typeof e=="string"&&$m.has(e)}function xm(e){let t={..._t(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Am(e,t,n){let r=e.runner_catalog??null,o=pa(e,t,n,null);if(!o)return null;let s=wn(r,o.orchestration_model.value??""),i=s===null?o:pa(e,t,n,s)||o,l=Kr(i,r),a=yr(i,s);return l||a?{orchestration:l,worker:a}:null}function pa(e,t,n,r){let o=gu(n)?n:gu(t.route)?t.route:null;try{return mn({pin:t,global:xm(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function Sm(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:yr(pa(e,_t(t.metadata),t.route,n),n)}function ma(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function Em(e){let t={};for(let l of Mn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Mn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?Zt(ys(i)):n?Un(t):null}function bu(e,t){let n=sa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Tm(e,t,n){let r=t.get(e);if(!r)return bu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return ko(r)}function Cm(e,t,n,r){let o=t.get(e);if(!o)return{label:bu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":ko(o),title:""}}function Rm(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Om(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Lm(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let p=a.status==="confirmed"?"confirmed":"draft",g=Array.isArray(a.entries)?a.entries:[],_=[];g.forEach((G,ie)=>{let ee=G&&typeof G.bead_id=="string"?G.bead_id:"";if(ee.length===0)return;let F=G&&typeof G.root_dir=="string"?G.root_dir:"",M=n.get(ee),I=M?M.state:void 0,W=I==="running"||I==="pr_wait"||I==="done",K=!M||I==="runnable",ne=M&&M.lane==="parallel"&&typeof M.position=="number"?M.position-1:null,D=Cm(ee,n,r,t),Y=_.length>0?_[_.length-1].id:null,H=p==="confirmed"&&Y!==null&&!(t.get(ee)||[]).includes(Y);_.push({id:ee,title:o.get(ee)||ee,root_dir:M?M.root_dir:F,workspace_name:M?M.workspace_name:s.get(F)||"",seq:ie+1,location_label:D.label,location_title:D.title,draggable:!W,fixed:W,done:I==="done",unplaced:K,mismatch:H,...ne!==null?{queue_index:ne}:{}})}),_.forEach((G,ie)=>{G.seq=ie+1});let $=_.length>0&&_.every(G=>G.done),R=_.filter(G=>!G.fixed&&i.armed_by_bead.get(G.id)!==d).map(G=>G.id),j=Om(d,p,_,$,R,i);l.push({lane_id:d,status:p,draft:p==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:_,all_done:$,can_confirm:p==="draft"&&_.length>=2,has_mismatch:p==="confirmed"&&_.some(G=>G.mismatch||G.unplaced),unlaunched:R,...j})}),l}function Im(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function Mm(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:p,state:g}=Im(a,t,n);g!==void 0&&(a.scope_state=g),s.set(u,{cards:[a],scope:p})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let g of a.cards)g.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=i.get(d);p?p.push(a):i.set(d,[a])}let l=(a,u,d)=>{let p=u.cards[0],g={id:p.id,title:p.title,location_label:Tm(p.id,r,o),prefixes:d};for(let _ of a.cards)_.overlap_chips?_.overlap_chips.push(g):_.overlap_chips=[g]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let p=Ts(a[u].scope,a[d].scope);p.length!==0&&(l(a[u],a[d],p),l(a[d],a[u],p))}}function da(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Hs(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function sr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...Vr,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&So.some(x=>x.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",p=Date.now(),g=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&g.set(x.root_dir,x);let _=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&_.set(x.root_dir,x.name||x.root_dir);for(let x of r)x&&typeof x.root_dir=="string"&&_.set(x.root_dir,x.name||x.root_dir);let $=[],R=[],j=[],G=[],ie=[],ee=[],F=new Map,M=new Map,I=new Map,W=new Map,K=new Map,ne=new Map,D=new Map,Y=new Map,H=new Map,Z=new Map,Oe=new Map,we=new Map,ce=new Set,q=new Map,$e=new Map,Se=new Map;for(let x of r){if(!x||typeof x.root_dir!="string")continue;let U=x.root_dir,he=x.name||U,De=g.get(U),Fe=De&&typeof De.revision=="number"?De.revision:typeof x.revision=="number"?x.revision:0,Be=_t(x.attempts),ut=_t(x.bead_titles);for(let[h,A]of Object.entries(ut))typeof A=="string"&&A.length>0&&Se.set(h,A);let At=_t(x.bead_times),Dt=_t(x.pr_observations),Wt=_t(x.admission),jt=_t(x.revise_parked),ht=_t(x.merge_queue_state),Ye=_t(x.cleanup_failed),L=_t(x.discard_operations),re=_t(x.bead_blocked_by);Object.hasOwn(x,"bead_scope")&&q.set(U,_t(x.bead_scope));let ge=_t(x.bead_workflow),O=_t(x.pr_activity),X=Array.isArray(x.repo_operations)?x.repo_operations:[];Y.set(U,X);let Ne=typeof x.declared_base=="string"?x.declared_base:null;D.set(U,Ne),ne.set(U,Object.entries(Ye).map(([h,A])=>({bead_id:h,step:A&&A.step?A.step:"",reason:A&&A.reason?A.reason:"",at:A&&typeof A.at=="number"?A.at:null,detail:A&&typeof A.detail=="string"?A.detail:null,output_tail:A&&typeof A.output_tail=="string"&&A.output_tail?A.output_tail:void 0,log_path:A&&typeof A.log_path=="string"&&A.log_path?A.log_path:void 0,retry_count:A&&typeof A.retry_count=="number"&&Number.isInteger(A.retry_count)&&A.retry_count>0?A.retry_count:0,failure_code:A&&typeof A.failure_code=="string"?A.failure_code:void 0})));for(let[h,A]of Object.entries(_t(x.bead_overlay)))A&&typeof A=="object"&&H.set(`${U}\0${h}`,A);let Ve=new Map;for(let h of Object.values(Be))h&&typeof h.attempt_id=="string"&&Ve.set(h.attempt_id,h);let qe=Array.isArray(x.merge_queue)?x.merge_queue:[],ct=new Set(qe.filter(h=>h&&typeof h.bead_id=="string").map(h=>h.bead_id)),st=new Map(qe.filter(h=>h&&typeof h.bead_id=="string").map(h=>[h.bead_id,h])),We=new Map,et=new Map,kt=new Map,Ke=new Map;qe.forEach((h,A)=>{h&&typeof h.bead_id=="string"&&(We.set(h.bead_id,A+1),et.set(h.bead_id,h.resolution),kt.set(h.bead_id,h.continuation_action||null),Ke.set(h.bead_id,h.authority||null))});let Ot=_t(x.auto_merge_skips),Je=h=>{let A=Ot[h];if(!A)return null;let pe=_t(_t(Dt[h]).pr).head_sha;return pe&&pe===A.head_sha?A.reason||"":null};K.set(U,{positions:We,resolutions:et,continuations:kt,authorities:Ke,state:{active:typeof ht.active=="string"?ht.active:null,failures:_t(ht.failures),waiting:ht.waiting&&typeof ht.waiting.bead_id=="string"&&typeof ht.waiting.reason=="string"?ht.waiting:null},auto_excluded:(Array.isArray(x.pr_wait)?x.pr_wait:[]).map(h=>h&&h.bead_id).filter(h=>typeof h=="string"&&Je(h)!==null),running:qe.length>0});let rt=Array.isArray(x.queue)?x.queue:[];for(let h of[...rt,...Array.isArray(x.pr_wait)?x.pr_wait:[]])h&&typeof h.bead_id=="string"&&typeof h.armed_by_lane=="string"&&h.armed_by_lane.length>0&&Oe.set(h.bead_id,h.armed_by_lane);for(let h of Array.isArray(x.disarmed_on_load)?x.disarmed_on_load:[])typeof h=="string"&&h.length>0&&ce.add(h);let Bt=(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).filter(h=>h&&/^s[1-5]$/.test(h.id)&&Array.isArray(h.entries)),Mt=_t(x.lane_states),Tt=typeof x.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(x.serial_lane_count))):Math.min(5,Bt.length);I.set(U,Tt),W.set(U,rt.length);let Ht=new Map(Bt.map(h=>[h.id,h])),nn=new Map;for(let h of Bt)for(let A of h.entries)A&&typeof A.bead_id=="string"&&nn.set(A.bead_id,h.id);for(let[h,A]of Object.entries(re))Array.isArray(A)&&Z.set(h,A.filter(pe=>typeof pe=="string"&&pe.length>0));let Gt=Array.isArray(x.done)?x.done:[];for(let h of Gt)h&&typeof h.bead_id=="string"&&ee.push({id:h.bead_id,root_dir:U,workspace_name:he});let Kt=new Map;for(let h of Gt)h&&typeof h.bead_id=="string"&&typeof h.added_at=="number"&&Kt.set(h.bead_id,h.added_at);let Lt=h=>({id:h,title:ut[h]||h,root_dir:U,workspace_name:he,expected_revision:Fe,draggable:!1,..._t(At[h]).created_at?{created_at:_t(At[h]).created_at}:{},..._t(At[h]).updated_at?{updated_at:_t(At[h]).updated_at}:{}}),bn=h=>{let A=ge[h]?.chips?.pr;return A&&typeof A.number=="number"&&typeof A.url=="string"?{pr_number:A.number,pr_url:A.url}:{}},Xt=h=>Object.hasOwn(re,h)?{blocked_by:Array.isArray(re[h])?re[h].filter(A=>typeof A=="string"&&A.length>0):[]}:{},St=new Set;for(let[h,A]of hm(Be,Kt,{discard_operations:L,observations:Dt})){St.add(h);let pe=A.run_state==="failed"?Rm(Be,A.attempt_id):null;pe!==null&&we.set(h,pe);let je=Ve.get(A.attempt_id)||null,Me=H.get(`${U}\0${h}`),be=Me&&Me.rollup?Me.rollup:null,yt=_a(Ne,je?je.target_base:null),pt=je?ma(je,Ve):!1,ft=je&&je.quickfix_lane===!0&&je.quickfix_landing&&typeof je.quickfix_landing=="object"?je.quickfix_landing:null,it=ft&&typeof ft.reason=="string"&&ft.reason.length>0?ft.reason:null,m=ft?Ao({bead_id:h,merge_sha:ft.head_sha,cleanup_cursor:ft.cursor,cleanup_failed:it?{step:ft.cursor,reason:it}:null,repo_operations:X}):null;R.push({...Lt(h),lane:"running",...Xt(h),...nn.has(h)?{serial_lane_id:nn.get(h)}:{},attempt_id:A.attempt_id,run_state:A.run_state,status:A.status||void 0,workflow:ge[h]||null,can_pause:A.can_pause,can_resume:A.can_resume,started_at:A.started_at,last_event_at:A.last_event_at,last_activity:A.last_activity,legs:A.legs,runner:A.runner,model:A.model,effort:A.effort,speed:A.speed,resumed_from:A.resumed_from,continuation_mode:A.continuation_mode,usage:A.usage,failure:A.failure||null,retry:A.retry||null,exec_chips:{orchestration:ra(A),worker:Sm(_t(De),Me,A.runner||null)},discard:Gn(L,h,{attempt_id:A.attempt_id,merged:A.failure?.confirmation==="merged"||_t(Dt[h]).pr?.state==="MERGED"}),...be?{rollup:be}:{},...pt?{conflict_resolution:!0}:{},...yt?{base_exception:yt}:{},...m?{landing:m}:{},badges:A.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:A.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:A.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:A.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:[],alert:A.run_state==="failed"})}for(let[h,A]of Ac(Be)){if(R.some(je=>je.id===h))continue;let pe=A.attempt;R.push({...Lt(h),lane:"running",kind:"session",...Xt(h),attempt_id:typeof pe.attempt_id=="string"?pe.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ge[h]||null,can_pause:!1,can_resume:!1,started_at:A.started_at,last_event_at:typeof pe.last_event_at=="number"?pe.last_event_at:null,last_activity:pe.last_activity&&typeof pe.last_activity=="object"?pe.last_activity:null,legs:Array.isArray(pe.legs)?pe.legs:[],runner:typeof pe.runner=="string"?pe.runner:null,model:typeof pe.model=="string"?pe.model:null,effort:typeof pe.effort=="string"?pe.effort:null,speed:typeof pe.speed=="string"?pe.speed:null,resumed_from:null,continuation_mode:null,usage:pe.usage&&typeof pe.usage=="object"?pe.usage:null,exec_chips:{orchestration:ra(pe),worker:null},discard:Gn(L,h,{merge_queued:!0}),badges:[A.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let h of Array.isArray(x.session_active)?x.session_active:[]){let A=h&&h.bead_id;typeof A!="string"||St.has(A)||(St.add(A),Array.isArray(h.blocked_by)&&h.blocked_by.length>0&&Z.set(A,h.blocked_by.filter(pe=>typeof pe=="string"&&pe.length>0)),typeof h.title=="string"&&h.title.length>0&&Se.set(A,h.title),R.push({...Lt(A),title:h.title||ut[A]||A,lane:"running",kind:"session",status:"in_progress",started_at:da(h.started_at)??da(h.updated_at)??void 0,updated_at:da(h.updated_at)??void 0,workflow:h.workflow||null,labels:Array.isArray(h.labels)?h.labels:[],spec_id:typeof h.spec_id=="string"?h.spec_id:"",blocked:h.blocked===!0,...Array.isArray(h.blocked_by)?{blocked_by:h.blocked_by.filter(pe=>typeof pe=="string"&&pe.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(h.session_refs)?h.session_refs:[],badges:[],alert:!1}))}for(let h of Array.isArray(x.pr_wait)?x.pr_wait:[]){let A=h&&h.bead_id;if(typeof A!="string"||St.has(A))continue;St.add(A);let pe=_t(Dt[A]),je=_t(pe.pr),Me=pe.gate?_t(pe.gate):null,be=ct.has(A),yt=st.get(A)?.continuation_action||null,pt=!!yt&&yt.continuation===null,ft=ht.active===A,it=h.external===!0,m=Ye[A]||null,b=_t(O[A]),C=Ao({bead_id:A,merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,merge_progress:b.merge_progress||null,cleanup_failed:m,repo_operations:X}),P=zs(C),f=!!Me&&Me.base_badge==="\uCDA9\uB3CC",y=!!m&&["child_sweep","branch_cleanup","parent_close"].includes(m.step)&&!!Me&&Me.tier==="merged",V=it&&!!m&&!!Me&&Me.tier==="merged",le=!!Me&&["closed_unmerged","review","undecidable"].includes(Me.tier)&&Me.reason!=="review_receipt_undetermined",Re=Gn(L,A,{external:it,merge_active:ft||C?.step==="merge",merge_queued:be,cleanup_active:P,merged:!!m||Me?.tier==="merged"}),mt=!!Re.operation;j.push({...Lt(A),lane:"pr_wait",...Xt(A),workflow:ge[A]||null,pr_number:typeof je.number=="number"?je.number:null,pr_url:typeof je.url=="string"?je.url:void 0,external:it,usage:Wn(Be,A),merge_step:C,badges:pt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:C?[Me?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:m?[kr(m.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${kr(m.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof Me?.gate_badge=="string"&&Me.gate_badge.length>0?[Me.gate_badge]:[],alert:C?C.failed===!0:!!m||le,reason:m&&C?.active!==!0?Ws(m.step):"PR \uB300\uAE30",merge_action:Me?.tier==="merged"&&!y&&!V?!1:!be||pt,merge_enabled:!mt&&(pt||Me?.enabled===!0||f||y||V),merge_label:pt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":V||y?"\uC815\uB9AC \uC7AC\uAC1C":f&&!y?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:pt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":mt?Re.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Re.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Re.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:V?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":y?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":f?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Me?.enabled===!0?`\uBA38\uC9C0 (${Me.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Me?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:be&&!pt,cancel_enabled:!ft,continuation_mismatch:yt?.mismatch||null,discard:Re,discard_action:Re.action,discard_enabled:Re.enabled,discard_title:Re.title})}let Vt=(h,A,pe,je)=>{let Me=h&&h.bead_id;if(typeof Me!="string"||St.has(Me))return null;St.add(Me);let be=jt[Me],yt=Gn(L,Me),pt=yt.operation?yt:null,ft={...Lt(Me),lane:A,workflow:ge[Me]||null,draggable:!pt,discard:pt||void 0,reason:_u(Wt,Me),seq:pe+1,queue_position:pe+1,queue_index:pe,queue_length:je,badges:be?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!be,revise_action:!!be,revise_enabled:!!be&&!pt,revise_title:be?be.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${be.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},it=Xt(Me);return Object.hasOwn(it,"blocked_by")&&(ft.blocked_by=it.blocked_by),ft};for(let h=0;h<rt.length;h++){let A=Vt(rt[h],"queue",h,rt.length);if(!A)continue;G.push(A);let pe=F.get(U);pe?pe.push(A):F.set(U,[A])}let dn=h=>{let A=j.find(be=>be.id===h&&be.root_dir===U);if(A)return{id:h,title:A.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let pe=R.find(be=>be.id===h&&be.root_dir===U),je=pe?pe.run_state:mm(Be,h),Me=je==="failed"||je==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":je==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:h,title:pe?pe.title:Lt(h).title,badge:Me}},ye=[];for(let h=0;h<Math.max(Tt,Bt.length);h++){let A=`s${h+1}`,pe=Ht.get(A),je=pe&&Array.isArray(pe.entries)?pe.entries:[],Me=_t(Mt[A]),be=Array.isArray(Me.occupied_by)?Me.occupied_by.filter(ft=>typeof ft=="string"):[],yt=new Set(be),pt=[];for(let ft=0;ft<je.length;ft++){let it=je[ft]&&je[ft].bead_id;if(typeof it=="string"&&yt.has(it)){St.add(it);continue}let m=Vt(je[ft],A,ft,je.length);m&&(pt.push(m),G.push(m))}pt.length===0&&be.length===0&&(Tt<=1||h>=Tt)||ye.push({id:A,index:h,items:pt,raw_length:je.length,occupied_by:be,occupants:be.map(ft=>dn(ft)),corrections:Array.isArray(Me.corrections)?Me.corrections.length:0,cycle:Me.cycle===!0,...pt.length===0&&be.length===0?{empty:!0}:{}})}M.set(U,ye);let T=Array.from({length:Tt},(h,A)=>{let pe=`s${A+1}`,je=Ht.get(pe),Me=je&&Array.isArray(je.entries)?je.entries:[],be=_t(Mt[pe]);return{id:pe,index:Me.length,length:Me.length,occupied_by:Array.isArray(be.occupied_by)?be.occupied_by.filter(yt=>typeof yt=="string"):[]}});for(let h of Array.isArray(x.runnable)?x.runnable:[]){let A=h&&h.bead_id;if(typeof A!="string"||St.has(A))continue;St.add(A);let pe=h.workflow&&typeof h.workflow=="object"?h.workflow:null,je=pe&&typeof pe.route=="string"&&pe.route||(typeof h.route=="string"?h.route:null),Me=vm(_t(De),h.exec_pins,je),be=vo(h.rec,h.exec_pins);Array.isArray(h.blocked_by)&&h.blocked_by.length>0&&Z.set(A,h.blocked_by.filter(P=>typeof P=="string"&&P.length>0)),typeof h.title=="string"&&h.title.length>0&&Se.set(A,h.title),Array.isArray(h.scope)&&$e.set(A,h.scope.filter(P=>typeof P=="string"&&P.length>0));let yt=h.eligible!==!1,pt=h.worker_ineligible===!0,ft=Object.hasOwn(h,"eligible"),it=[];typeof h.reason=="string"&&h.reason.length>0&&it.push(h.reason);let m=_u(Wt,A);m&&it.push(m);let b=wm(A,h.release_info,p),C=h.dependents_info&&typeof h.dependents_info=="object"?cu(h.dependents_info):null;$.push({...Lt(A),title:h.title||ut[A]||A,lane:"runnable",draggable:!ft,queue_placeable:yt&&!pt,...pt?{worker_ineligible:!0}:{},...h.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof h.session_preferred_reason=="string"?h.session_preferred_reason:""}:{},...b||C?{dependency_chips:{...b?{released:b}:{},...C?{dependents:C}:{}}}:{},reason:it.join(" \xB7 "),created_at:h.created_at??void 0,updated_at:h.updated_at??void 0,status:typeof h.status=="string"?h.status:void 0,labels:Array.isArray(h.labels)?h.labels:[],spec_id:typeof h.spec_id=="string"?h.spec_id:"",published:h.published===!0,workflow:pe||(je?{route:je,chips:{route:je}}:null),...Me?{exec_chips:Me}:{},...be?{rec:be}:{},blocked:h.blocked===!0,...Array.isArray(h.blocked_by)?{blocked_by:h.blocked_by.filter(P=>typeof P=="string"&&P.length>0)}:{},place_index:rt.length,place_lanes:T})}for(let h of Gt){let A=h&&h.bead_id;if(typeof A!="string"||St.has(A)||(St.add(A),s!==void 0&&typeof h.added_at=="number"&&h.added_at<s))continue;let pe=gm(Be,A),je=pe&&typeof pe.done_kind=="string"?pe.done_kind:null;ie.push({...Lt(A),lane:"done",done:!0,done_layout:"three_line",usage:Wn(Be,A),work_ms:Jc(Be,A),done_at:typeof h.added_at=="number"?h.added_at:void 0,done_kind:je,...bn(A),badges:[...je&&du[je]?[du[je]]:[],...Xc(Be,A)]})}for(let h of Array.isArray(x.session_done)?x.session_done:[]){let A=h&&(h.id||h.bead_id);typeof A!="string"||St.has(A)||(St.add(A),ie.push({...Lt(A),...h,id:A,root_dir:U,workspace_name:he,expected_revision:Fe,lane:"done",done:!0}))}}if(H.size>0)for(let x of[...$,...G,...R,...j,...ie]){let U=H.get(`${x.root_dir}\0${x.id}`);if(!U||(typeof U.priority=="number"&&(x.priority=U.priority),typeof U.from_id=="string"&&U.from_id.length>0&&(x.from_id=U.from_id),!Object.hasOwn(U,"metadata")))continue;let he=_t(U.metadata);if(x.rec=vo(he),x.lane==="runnable"||x.lane.startsWith("s")||x.lane==="queue"){let De=Am(_t(g.get(x.root_dir)),he,typeof U.route=="string"&&U.route.length>0?U.route:_t(x.workflow).route);De&&(x.exec_chips=De)}}let E=new Map;o.forEach((x,U)=>{x&&typeof x.root_dir=="string"&&E.set(x.root_dir,U)});let J=n&&n.running_sort==="repo"?"repo":"started";R.sort((x,U)=>{let he=x.kind==="session",De=U.kind==="session";if(he!==De)return he?1:-1;if(he&&De){let ut=Hs(U.updated_at)-Hs(x.updated_at);return ut!==0?ut:x.id.localeCompare(U.id)}if(J==="repo"){let ut=E.get(x.root_dir)??Number.MAX_SAFE_INTEGER,At=E.get(U.root_dir)??Number.MAX_SAFE_INTEGER;if(ut!==At)return ut-At}let Fe=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,Be=typeof U.started_at=="number"&&Number.isFinite(U.started_at)?U.started_at:null;return Fe!==null&&Be!==null&&Fe!==Be?Fe-Be:Fe===null&&Be!==null?1:Fe!==null&&Be===null?-1:x.id.localeCompare(U.id)}),ie.sort((x,U)=>(U.done_at??0)-(x.done_at??0));let Ce=o.length>0?o:r.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,runner_catalog:x&&x.runner_catalog})),fe=new Set($.map(x=>x.root_dir)),xe=new Map;for(let x of R)x.kind==="session"||x.run_state!=="running"||xe.set(x.root_dir,(xe.get(x.root_dir)||0)+1);let me=new Map;for(let x of ie){let U=me.get(x.root_dir);U?U.push(x):me.set(x.root_dir,[x])}let Ue={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},dt=[];for(let x of Ce){if(!x||typeof x.root_dir!="string")continue;let U=F.get(x.root_dir)||[],he=M.get(x.root_dir)||[],De=U.length>0||he.some(ut=>ut.items.length>0||ut.occupied_by.length>0);if(u!=="all"&&!De&&!fe.has(x.root_dir))continue;let Fe=typeof x.slots=="number"&&x.slots>=Gs?x.slots:Gs,Be=xe.get(x.root_dir)||0;dt.push({live_count:Be,over_cap:Be>Fe,merge:K.get(x.root_dir)||Ue,token_total:Em(me.get(x.root_dir)||[]),cleanup_failures:ne.get(x.root_dir)||[],declared_base:D.get(x.root_dir)??null,repo_operations:Y.get(x.root_dir)||[],root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:Fe,revision:typeof x.revision=="number"?x.revision:0,runner_catalog:_t(x.runner_catalog),items:U,sublanes:{parallel:U,serial:he},serial_lane_count:I.get(x.root_dir)||0,raw_queue_length:W.get(x.root_dir)||0})}let Pe={runnable:$,runnable_all:$,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:G,queue_groups:dt,running:R,pr_wait:j,done:ie,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(W),owner_of:{}},B=Hc(Pe);for(let x of ee)B.has(x.id)||B.set(x.id,{root_dir:x.root_dir,workspace_name:x.workspace_name,lane:"done",state:"done"});for(let x of[...Pe.queue,...Pe.runnable,...Pe.running,...Pe.pr_wait]){if(!Object.hasOwn(x,"blocked_by"))continue;let U=B.get(x.id);x.blockers=(x.blocked_by||[]).map(he=>Gc(he,U,B,o))}for(let x of[...Pe.queue,...Pe.runnable,...Pe.running,...Pe.pr_wait]){let U=(x.blockers||[]).map(De=>{let Fe=B.get(De.id)?.root_dir;return{...ua(x.id,De),openable:!0,...typeof Fe=="string"&&Fe.length>0?{root_dir:Fe}:{}}});if(U.length===0)continue;let he={...x.dependency_chips||{},predecessors:U};x.dependency_chips=he}Mm(Pe,q,$e,B,o);let ue=Kc(Pe.queue_groups);for(let x of Pe.queue_groups)for(let U of x.sublanes.serial){let he=ue.get(Yc(x.root_dir,U.id));he&&(U.cross_wait_peers=he)}Pe.chain_lanes=Lm(l&&Array.isArray(l.lanes)?l.lanes:[],Z,B,o,Se,_,{armed_by_bead:Oe,failed_by_bead:we,disarmed_lanes:ce});let se=new Map;for(let x of[...Pe.queue,...Pe.runnable])se.has(x.id)||se.set(x.id,x);let ae=new Set;for(let x of Pe.chain_lanes)for(let U of x.rows){if(x.status==="confirmed"&&!U.unplaced&&!U.fixed&&ae.add(U.id),!x.draft&&!U.unplaced)continue;let he=se.get(U.id);he&&(he.cross_lane_chip={lane_id:x.lane_id,number:x.number,status:x.status,label:x.draft?`\uC5F0\uACB0 ${x.number} (draft)`:`\uC5F0\uACB0 ${x.number}`})}let Ee=new Map(Pe.chain_lanes.map(x=>[x.lane_id,x.number]));for(let x of[...Pe.queue,...Pe.running]){let U=Oe.get(x.id);if(typeof U!="string"||U.length===0)continue;let he=Ee.get(U);x.armed_lane_chip=he===void 0?{lane_id:U,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:U,label:`\u25B6 \uC5F0\uACB0 ${he}`,orphan:!1}}let _e=[];for(let x of F.values())for(let U of x)ae.has(U.id)||_e.push(U);_e.sort((x,U)=>{let he=x.workspace_name.localeCompare(U.workspace_name);return he!==0?he:(x.queue_index??0)-(U.queue_index??0)}),Pe.parallel_rows=_e;let Le={};for(let[x,U]of B)typeof U.root_dir=="string"&&U.root_dir.length>0&&(Le[x]=U.root_dir);for(let x of Pe.chain_lanes)for(let U of x.rows)!Object.hasOwn(Le,U.id)&&U.root_dir.length>0&&_.has(U.root_dir)&&(Le[U.id]=U.root_dir);Pe.owner_of=Le;let Ze=Pe.runnable.length;Pe.runnable_all=Pe.runnable.slice();let Ge=Pe.runnable,ze=x=>i.show_blocked||x.blocked!==!0,te=x=>i.spec==="all"||(i.spec==="with"?x.published===!0:x.published!==!0);if(d==="per_control"){let x=[],U=0,he=0;for(let De of Ge){let Fe=ze(De),Be=te(De);Fe&&Be?x.push(De):!Fe&&Be?U+=1:Fe&&!Be&&(he+=1)}Ge=x,Pe.runnable_hidden={blocked:U,spec:he}}else{Ge=Ge.filter(ze);let x=Ge.length;Ge=Ge.filter(te),Pe.runnable_hidden={blocked:Ze-x,spec:x-Ge.length}}let z=(x,U)=>{let he=Hs(U.updated_at)-Hs(x.updated_at);return he!==0?he:x.id.localeCompare(U.id)},lt=a==="repo_spec"?(x,U)=>{let he=x.published===!0?0:1,De=U.published===!0?0:1;return he!==De?he-De:z(x,U)}:z;if(a==="as_given")Pe.runnable=Ge,Pe.runnable_sections=[];else if(a==="updated_flat")Pe.runnable=Ge.slice().sort(z),Pe.runnable_sections=[];else{let x=new Map;for(let De of Ge){let Fe=x.get(De.root_dir);Fe?Fe.push(De):x.set(De.root_dir,[De])}let U=[],he=[];for(let De of Ce){if(!De||typeof De.root_dir!="string")continue;let Fe=(x.get(De.root_dir)||[]).slice().sort(lt);x.delete(De.root_dir),Fe.length!==0&&(U.push({root_dir:De.root_dir,name:De.name||De.root_dir,items:Fe.map(Be=>({...Be,workspace_name:""}))}),he.push(...Fe))}for(let[De,Fe]of x){let Be=Fe.slice().sort(lt);U.push({root_dir:De,name:Be[0]?.workspace_name||De,items:Be.map(ut=>({...ut,workspace_name:""}))}),he.push(...Be)}Pe.runnable=he,Pe.runnable_sections=U}return Pe}function yu(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),g=Number(l.get(a))>Number(l.get(d));p&&g&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var Pm="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ys="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Dm="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Nm="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Qr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Eo(e,t){return`${e}\0${t}`}function qm(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function Fm(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Ro(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=qm(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[p,g]of o)for(let _ of g)s.push({blocker:_,blockee:p});let i=Fm(e,t),l=new Map(r.map((p,g)=>[p,g])),a=r.slice(0,i).filter(p=>o.get(p).some(g=>Number(l.get(g))>Number(l.get(p)))),u=yu(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,i),...u.order.map(p=>d.get(p))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function vu(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Ro(n,t)}function jm(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Bm(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Um(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function ga(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function Wm(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Eo(i,a));let r=new Map,o=new Map;for(let i of e){let l=Eo(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Eo(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function zm(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Hm(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Ks(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function ha(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Oo(e){let t=Um(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Bm(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,p)=>{if(o.refusal!==null||u===d)return;let g=t.get(u)||[];if(g.includes(d))return;let _=s(u);if(_!==null){if(ga(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...g,d]),p!==void 0&&r.add(Eo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:_,...p===void 0?{}:{lane_id:p}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let p=t.get(u)||[];if(!p.includes(d))return;let g=s(u);g!==null&&(t.set(u,p.filter(_=>_!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:g}))},laneCreated:(u,d)=>r.has(Eo(u,d))}}function Lo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Wm(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:jm(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function ku(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function To(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function wu(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function $u(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(Ks(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Co(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Vs(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Qs(e,t,n){let r=Oo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Pm};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Dm};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${ha(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Qr}}if(e.kind==="chain"&&d===void 0)return{refused:Qr};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let $=d.entries.findIndex(ee=>ee.bead_id===e.bead_id);if($<0)return;let R=$>0?d.entries[$-1]:null,j=$+1<d.entries.length?d.entries[$+1]:null,G=To(d,$),ie=j!==null&&To(d,$+1);G&&R!==null&&r.removeDep(e.bead_id,R.bead_id),ie&&j!==null&&r.removeDep(j.bead_id,e.bead_id),(G||ie)&&R!==null&&j!==null&&r.addDep(j.bead_id,R.bead_id,u)},g=($,R)=>{let j=n.cross_lanes.get($),G=j.entries.findIndex(D=>D.bead_id===e.bead_id),ie=j.entries.filter(D=>D.bead_id!==e.bead_id),ee=Math.max(0,Math.min(ie.length,G>=0&&R>G?R-1:R)),F=-1;if(ie.forEach((D,Y)=>{n.fixed_members.has(D.bead_id)&&(F=Y)}),ee<=F){r.state.refusal=Nm;return}let M=G>=0?j.entries[G]:d?.entries.find(D=>D.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Ro({status:j.status,entries:[...ie.slice(0,ee),M,...ie.slice(ee)]},n);let I=l.entries;if(Vs(I,j.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:$,entries:Co(I)}}),j.status!=="confirmed")return;let W=I.findIndex(D=>D.bead_id===e.bead_id),K=W>0?I[W-1].bead_id:null,ne=W+1<I.length?I[W+1].bead_id:null;if(K===null){ne!==null&&r.addDep(ne,e.bead_id,$);return}if(r.addDep(e.bead_id,K,$),ne!==null&&(r.graph.get(ne)||[]).includes(K)){let D=j.entries.findIndex(Y=>Y.bead_id===ne);(r.laneCreated(ne,K)||D>0&&j.entries[D-1].bead_id===K&&To(j,D))&&r.removeDep(ne,K),r.addDep(ne,e.bead_id,$)}},_=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...wu(n,d,u,d.entries.filter($=>$.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Co(d.entries.filter($=>$.bead_id!==e.bead_id))}}))),t.kind==="chain"&&g(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let $=zm(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(Ks(e.bead_id,e.root_dir,$));else if(e.kind==="parallel"){let R=n.parallel_rows,j=R[Math.max(0,Math.min(R.length,t.marker_index))];if(!(!!j&&j.bead_id===e.bead_id)&&Hm(n,e.root_dir)&&_!==void 0){let ie=_>$?$:$-1;ie>=0&&ie!==_&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ie},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let $=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&$.status==="confirmed"&&s.push(Ks(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(_!==void 0&&t.index!==_){let $=_>t.index?t.index:t.index-1;$>=0&&$!==_&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:$},root_dir:e.root_dir})}}else s.push(Ks(e.bead_id,e.root_dir,t.index,t.lane_id));return Lo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function xu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Ro(n,t);if(r.held)return{refused:Ys};let o=r.entries,s=Oo(t),i=[];ku(s,o,e),s.state.refusal===null&&$u(s,t,o,i);let l=Vs(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Co(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Lo(s,t,l,i,{lane_id:e,correction:r})}function Au(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Ro(n,t),o=r.entries,s=Oo(t),i=[];ku(s,o,e),s.state.refusal===null&&$u(s,t,o,i);let l=Vs(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Co(o)}}];return Lo(s,t,l,i,{lane_id:e,correction:r})}function Su(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Ro(n,t),o=r.entries;return Lo(Oo(t),t,Vs(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Co(o)}}],[],{lane_id:e,correction:r})}function Eu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Oo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)To(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Lo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:wu(t,n,e,n.entries)})}function Tu(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;To(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${ha(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Cu(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Ru(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function ba(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${ha(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Gm="\uC0AC\uC774\uD074";function Km(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function ya(e,t,n){let r=sr(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Km(e)}}function Ou(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=ga(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:Gm}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function Lu(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Bu,setPrototypeOf:Iu,isFrozen:Ym,getPrototypeOf:Vm,getOwnPropertyDescriptor:Qm}=Object,{freeze:an,seal:vn,create:Sa}=Object,{apply:Ea,construct:Ta}=typeof Reflect<"u"&&Reflect;an||(an=function(t){return t});vn||(vn=function(t){return t});Ea||(Ea=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Ta||(Ta=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Xs=ln(Array.prototype.forEach),Xm=ln(Array.prototype.lastIndexOf),Mu=ln(Array.prototype.pop),Io=ln(Array.prototype.push),Zm=ln(Array.prototype.splice),Js=ln(String.prototype.toLowerCase),va=ln(String.prototype.toString),ka=ln(String.prototype.match),Mo=ln(String.prototype.replace),Jm=ln(String.prototype.indexOf),eg=ln(String.prototype.trim),xn=ln(Object.prototype.hasOwnProperty),sn=ln(RegExp.prototype.test),Po=tg(TypeError);function ln(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Ea(e,t,r)}}function tg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ta(e,n)}}function bt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Js;Iu&&Iu(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(Ym(t)||(t[r]=s),o=s)}e[o]=!0}return e}function ng(e){for(let t=0;t<e.length;t++)xn(e,t)||(e[t]=null);return e}function Kn(e){let t=Sa(null);for(let[n,r]of Bu(e))xn(e,n)&&(Array.isArray(r)?t[n]=ng(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Kn(r):t[n]=r);return t}function Do(e,t){for(;e!==null;){let r=Qm(e,t);if(r){if(r.get)return ln(r.get);if(typeof r.value=="function")return ln(r.value)}e=Vm(e)}function n(){return null}return n}var Pu=an(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),wa=an(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),$a=an(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),rg=an(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),xa=an(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),og=an(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Du=an(["#text"]),Nu=an(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Aa=an(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),qu=an(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Zs=an(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),sg=vn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ig=vn(/<%[\w\W]*|[\w\W]*%>/gm),ag=vn(/\$\{[\w\W]*/gm),lg=vn(/^data-[\-\w.\u00B7-\uFFFF]+$/),cg=vn(/^aria-[\-\w]+$/),Uu=vn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ug=vn(/^(?:\w+script|data):/i),dg=vn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Wu=vn(/^html$/i),pg=vn(/^[a-z][.\w]*(-[.\w]+)+$/i),Fu=Object.freeze({__proto__:null,ARIA_ATTR:cg,ATTR_WHITESPACE:dg,CUSTOM_ELEMENT:pg,DATA_ATTR:lg,DOCTYPE_NAME:Wu,ERB_EXPR:ig,IS_ALLOWED_URI:Uu,IS_SCRIPT_OR_DATA:ug,MUSTACHE_EXPR:sg,TMPLIT_EXPR:ag}),No={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},fg=function(){return typeof window>"u"?null:window},_g=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},ju=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function zu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:fg(),t=ye=>zu(ye);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==No.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:g,trustedTypes:_}=e,$=a.prototype,R=Do($,"cloneNode"),j=Do($,"remove"),G=Do($,"nextSibling"),ie=Do($,"childNodes"),ee=Do($,"parentNode");if(typeof i=="function"){let ye=n.createElement("template");ye.content&&ye.content.ownerDocument&&(n=ye.content.ownerDocument)}let F,M="",{implementation:I,createNodeIterator:W,createDocumentFragment:K,getElementsByTagName:ne}=n,{importNode:D}=r,Y=ju();t.isSupported=typeof Bu=="function"&&typeof ee=="function"&&I&&I.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:H,ERB_EXPR:Z,TMPLIT_EXPR:Oe,DATA_ATTR:we,ARIA_ATTR:ce,IS_SCRIPT_OR_DATA:q,ATTR_WHITESPACE:$e,CUSTOM_ELEMENT:Se}=Fu,{IS_ALLOWED_URI:E}=Fu,J=null,Ce=bt({},[...Pu,...wa,...$a,...xa,...Du]),fe=null,xe=bt({},[...Nu,...Aa,...qu,...Zs]),me=Object.seal(Sa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ue=null,dt=null,Pe=Object.seal(Sa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),B=!0,ue=!0,se=!1,ae=!0,Ee=!1,_e=!0,Le=!1,Ze=!1,Ge=!1,ze=!1,te=!1,z=!1,Ae=!0,lt=!1,x="user-content-",U=!0,he=!1,De={},Fe=null,Be=bt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ut=null,At=bt({},["audio","video","img","source","image","track"]),Dt=null,Wt=bt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),jt="http://www.w3.org/1998/Math/MathML",ht="http://www.w3.org/2000/svg",Ye="http://www.w3.org/1999/xhtml",L=Ye,re=!1,ge=null,O=bt({},[jt,ht,Ye],va),X=bt({},["mi","mo","mn","ms","mtext"]),Ne=bt({},["annotation-xml"]),Ve=bt({},["title","style","font","a","script"]),qe=null,ct=["application/xhtml+xml","text/html"],st="text/html",We=null,et=null,kt=n.createElement("form"),Ke=function(T){return T instanceof RegExp||T instanceof Function},Ot=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(et&&et===T)){if((!T||typeof T!="object")&&(T={}),T=Kn(T),qe=ct.indexOf(T.PARSER_MEDIA_TYPE)===-1?st:T.PARSER_MEDIA_TYPE,We=qe==="application/xhtml+xml"?va:Js,J=xn(T,"ALLOWED_TAGS")?bt({},T.ALLOWED_TAGS,We):Ce,fe=xn(T,"ALLOWED_ATTR")?bt({},T.ALLOWED_ATTR,We):xe,ge=xn(T,"ALLOWED_NAMESPACES")?bt({},T.ALLOWED_NAMESPACES,va):O,Dt=xn(T,"ADD_URI_SAFE_ATTR")?bt(Kn(Wt),T.ADD_URI_SAFE_ATTR,We):Wt,ut=xn(T,"ADD_DATA_URI_TAGS")?bt(Kn(At),T.ADD_DATA_URI_TAGS,We):At,Fe=xn(T,"FORBID_CONTENTS")?bt({},T.FORBID_CONTENTS,We):Be,Ue=xn(T,"FORBID_TAGS")?bt({},T.FORBID_TAGS,We):Kn({}),dt=xn(T,"FORBID_ATTR")?bt({},T.FORBID_ATTR,We):Kn({}),De=xn(T,"USE_PROFILES")?T.USE_PROFILES:!1,B=T.ALLOW_ARIA_ATTR!==!1,ue=T.ALLOW_DATA_ATTR!==!1,se=T.ALLOW_UNKNOWN_PROTOCOLS||!1,ae=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=T.SAFE_FOR_TEMPLATES||!1,_e=T.SAFE_FOR_XML!==!1,Le=T.WHOLE_DOCUMENT||!1,ze=T.RETURN_DOM||!1,te=T.RETURN_DOM_FRAGMENT||!1,z=T.RETURN_TRUSTED_TYPE||!1,Ge=T.FORCE_BODY||!1,Ae=T.SANITIZE_DOM!==!1,lt=T.SANITIZE_NAMED_PROPS||!1,U=T.KEEP_CONTENT!==!1,he=T.IN_PLACE||!1,E=T.ALLOWED_URI_REGEXP||Uu,L=T.NAMESPACE||Ye,X=T.MATHML_TEXT_INTEGRATION_POINTS||X,Ne=T.HTML_INTEGRATION_POINTS||Ne,me=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&Ke(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(me.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&Ke(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(me.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(me.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ee&&(ue=!1),te&&(ze=!0),De&&(J=bt({},Du),fe=[],De.html===!0&&(bt(J,Pu),bt(fe,Nu)),De.svg===!0&&(bt(J,wa),bt(fe,Aa),bt(fe,Zs)),De.svgFilters===!0&&(bt(J,$a),bt(fe,Aa),bt(fe,Zs)),De.mathMl===!0&&(bt(J,xa),bt(fe,qu),bt(fe,Zs))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?Pe.tagCheck=T.ADD_TAGS:(J===Ce&&(J=Kn(J)),bt(J,T.ADD_TAGS,We))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?Pe.attributeCheck=T.ADD_ATTR:(fe===xe&&(fe=Kn(fe)),bt(fe,T.ADD_ATTR,We))),T.ADD_URI_SAFE_ATTR&&bt(Dt,T.ADD_URI_SAFE_ATTR,We),T.FORBID_CONTENTS&&(Fe===Be&&(Fe=Kn(Fe)),bt(Fe,T.FORBID_CONTENTS,We)),U&&(J["#text"]=!0),Le&&bt(J,["html","head","body"]),J.table&&(bt(J,["tbody"]),delete Ue.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw Po('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Po('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');F=T.TRUSTED_TYPES_POLICY,M=F.createHTML("")}else F===void 0&&(F=_g(_,o)),F!==null&&typeof M=="string"&&(M=F.createHTML(""));an&&an(T),et=T}},Je=bt({},[...wa,...$a,...rg]),rt=bt({},[...xa,...og]),Bt=function(T){let h=ee(T);(!h||!h.tagName)&&(h={namespaceURI:L,tagName:"template"});let A=Js(T.tagName),pe=Js(h.tagName);return ge[T.namespaceURI]?T.namespaceURI===ht?h.namespaceURI===Ye?A==="svg":h.namespaceURI===jt?A==="svg"&&(pe==="annotation-xml"||X[pe]):!!Je[A]:T.namespaceURI===jt?h.namespaceURI===Ye?A==="math":h.namespaceURI===ht?A==="math"&&Ne[pe]:!!rt[A]:T.namespaceURI===Ye?h.namespaceURI===ht&&!Ne[pe]||h.namespaceURI===jt&&!X[pe]?!1:!rt[A]&&(Ve[A]||!Je[A]):!!(qe==="application/xhtml+xml"&&ge[T.namespaceURI]):!1},Mt=function(T){Io(t.removed,{element:T});try{ee(T).removeChild(T)}catch{j(T)}},Tt=function(T,h){try{Io(t.removed,{attribute:h.getAttributeNode(T),from:h})}catch{Io(t.removed,{attribute:null,from:h})}if(h.removeAttribute(T),T==="is")if(ze||te)try{Mt(h)}catch{}else try{h.setAttribute(T,"")}catch{}},Ht=function(T){let h=null,A=null;if(Ge)T="<remove></remove>"+T;else{let Me=ka(T,/^[\r\n\t ]+/);A=Me&&Me[0]}qe==="application/xhtml+xml"&&L===Ye&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let pe=F?F.createHTML(T):T;if(L===Ye)try{h=new g().parseFromString(pe,qe)}catch{}if(!h||!h.documentElement){h=I.createDocument(L,"template",null);try{h.documentElement.innerHTML=re?M:pe}catch{}}let je=h.body||h.documentElement;return T&&A&&je.insertBefore(n.createTextNode(A),je.childNodes[0]||null),L===Ye?ne.call(h,Le?"html":"body")[0]:Le?h.documentElement:je},nn=function(T){return W.call(T.ownerDocument||T,T,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Gt=function(T){return T instanceof p&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof d)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},Kt=function(T){return typeof l=="function"&&T instanceof l};function Lt(ye,T,h){Xs(ye,A=>{A.call(t,T,h,et)})}let bn=function(T){let h=null;if(Lt(Y.beforeSanitizeElements,T,null),Gt(T))return Mt(T),!0;let A=We(T.nodeName);if(Lt(Y.uponSanitizeElement,T,{tagName:A,allowedTags:J}),_e&&T.hasChildNodes()&&!Kt(T.firstElementChild)&&sn(/<[/\w!]/g,T.innerHTML)&&sn(/<[/\w!]/g,T.textContent)||T.nodeType===No.progressingInstruction||_e&&T.nodeType===No.comment&&sn(/<[/\w]/g,T.data))return Mt(T),!0;if(!(Pe.tagCheck instanceof Function&&Pe.tagCheck(A))&&(!J[A]||Ue[A])){if(!Ue[A]&&St(A)&&(me.tagNameCheck instanceof RegExp&&sn(me.tagNameCheck,A)||me.tagNameCheck instanceof Function&&me.tagNameCheck(A)))return!1;if(U&&!Fe[A]){let pe=ee(T)||T.parentNode,je=ie(T)||T.childNodes;if(je&&pe){let Me=je.length;for(let be=Me-1;be>=0;--be){let yt=R(je[be],!0);yt.__removalCount=(T.__removalCount||0)+1,pe.insertBefore(yt,G(T))}}}return Mt(T),!0}return T instanceof a&&!Bt(T)||(A==="noscript"||A==="noembed"||A==="noframes")&&sn(/<\/no(script|embed|frames)/i,T.innerHTML)?(Mt(T),!0):(Ee&&T.nodeType===No.text&&(h=T.textContent,Xs([H,Z,Oe],pe=>{h=Mo(h,pe," ")}),T.textContent!==h&&(Io(t.removed,{element:T.cloneNode()}),T.textContent=h)),Lt(Y.afterSanitizeElements,T,null),!1)},Xt=function(T,h,A){if(Ae&&(h==="id"||h==="name")&&(A in n||A in kt))return!1;if(!(ue&&!dt[h]&&sn(we,h))){if(!(B&&sn(ce,h))){if(!(Pe.attributeCheck instanceof Function&&Pe.attributeCheck(h,T))){if(!fe[h]||dt[h]){if(!(St(T)&&(me.tagNameCheck instanceof RegExp&&sn(me.tagNameCheck,T)||me.tagNameCheck instanceof Function&&me.tagNameCheck(T))&&(me.attributeNameCheck instanceof RegExp&&sn(me.attributeNameCheck,h)||me.attributeNameCheck instanceof Function&&me.attributeNameCheck(h,T))||h==="is"&&me.allowCustomizedBuiltInElements&&(me.tagNameCheck instanceof RegExp&&sn(me.tagNameCheck,A)||me.tagNameCheck instanceof Function&&me.tagNameCheck(A))))return!1}else if(!Dt[h]){if(!sn(E,Mo(A,$e,""))){if(!((h==="src"||h==="xlink:href"||h==="href")&&T!=="script"&&Jm(A,"data:")===0&&ut[T])){if(!(se&&!sn(q,Mo(A,$e,"")))){if(A)return!1}}}}}}}return!0},St=function(T){return T!=="annotation-xml"&&ka(T,Se)},Vt=function(T){Lt(Y.beforeSanitizeAttributes,T,null);let{attributes:h}=T;if(!h||Gt(T))return;let A={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:fe,forceKeepAttr:void 0},pe=h.length;for(;pe--;){let je=h[pe],{name:Me,namespaceURI:be,value:yt}=je,pt=We(Me),ft=yt,it=Me==="value"?ft:eg(ft);if(A.attrName=pt,A.attrValue=it,A.keepAttr=!0,A.forceKeepAttr=void 0,Lt(Y.uponSanitizeAttribute,T,A),it=A.attrValue,lt&&(pt==="id"||pt==="name")&&(Tt(Me,T),it=x+it),_e&&sn(/((--!?|])>)|<\/(style|title|textarea)/i,it)){Tt(Me,T);continue}if(pt==="attributename"&&ka(it,"href")){Tt(Me,T);continue}if(A.forceKeepAttr)continue;if(!A.keepAttr){Tt(Me,T);continue}if(!ae&&sn(/\/>/i,it)){Tt(Me,T);continue}Ee&&Xs([H,Z,Oe],b=>{it=Mo(it,b," ")});let m=We(T.nodeName);if(!Xt(m,pt,it)){Tt(Me,T);continue}if(F&&typeof _=="object"&&typeof _.getAttributeType=="function"&&!be)switch(_.getAttributeType(m,pt)){case"TrustedHTML":{it=F.createHTML(it);break}case"TrustedScriptURL":{it=F.createScriptURL(it);break}}if(it!==ft)try{be?T.setAttributeNS(be,Me,it):T.setAttribute(Me,it),Gt(T)?Mt(T):Mu(t.removed)}catch{Tt(Me,T)}}Lt(Y.afterSanitizeAttributes,T,null)},dn=function ye(T){let h=null,A=nn(T);for(Lt(Y.beforeSanitizeShadowDOM,T,null);h=A.nextNode();)Lt(Y.uponSanitizeShadowNode,h,null),bn(h),Vt(h),h.content instanceof s&&ye(h.content);Lt(Y.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(ye){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},h=null,A=null,pe=null,je=null;if(re=!ye,re&&(ye="<!-->"),typeof ye!="string"&&!Kt(ye))if(typeof ye.toString=="function"){if(ye=ye.toString(),typeof ye!="string")throw Po("dirty is not a string, aborting")}else throw Po("toString is not a function");if(!t.isSupported)return ye;if(Ze||Ot(T),t.removed=[],typeof ye=="string"&&(he=!1),he){if(ye.nodeName){let yt=We(ye.nodeName);if(!J[yt]||Ue[yt])throw Po("root node is forbidden and cannot be sanitized in-place")}}else if(ye instanceof l)h=Ht("<!---->"),A=h.ownerDocument.importNode(ye,!0),A.nodeType===No.element&&A.nodeName==="BODY"||A.nodeName==="HTML"?h=A:h.appendChild(A);else{if(!ze&&!Ee&&!Le&&ye.indexOf("<")===-1)return F&&z?F.createHTML(ye):ye;if(h=Ht(ye),!h)return ze?null:z?M:""}h&&Ge&&Mt(h.firstChild);let Me=nn(he?ye:h);for(;pe=Me.nextNode();)bn(pe),Vt(pe),pe.content instanceof s&&dn(pe.content);if(he)return ye;if(ze){if(te)for(je=K.call(h.ownerDocument);h.firstChild;)je.appendChild(h.firstChild);else je=h;return(fe.shadowroot||fe.shadowrootmode)&&(je=D.call(r,je,!0)),je}let be=Le?h.outerHTML:h.innerHTML;return Le&&J["!doctype"]&&h.ownerDocument&&h.ownerDocument.doctype&&h.ownerDocument.doctype.name&&sn(Wu,h.ownerDocument.doctype.name)&&(be="<!DOCTYPE "+h.ownerDocument.doctype.name+`>
`+be),Ee&&Xs([H,Z,Oe],yt=>{be=Mo(be,yt," ")}),F&&z?F.createHTML(be):be},t.setConfig=function(){let ye=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ot(ye),Ze=!0},t.clearConfig=function(){et=null,Ze=!1},t.isValidAttribute=function(ye,T,h){et||Ot({});let A=We(ye),pe=We(T);return Xt(A,pe,h)},t.addHook=function(ye,T){typeof T=="function"&&Io(Y[ye],T)},t.removeHook=function(ye,T){if(T!==void 0){let h=Xm(Y[ye],T);return h===-1?void 0:Zm(Y[ye],h,1)[0]}return Mu(Y[ye])},t.removeHooks=function(ye){Y[ye]=[]},t.removeAllHooks=function(){Y=ju()},t}var Hu=zu();var Yn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ei=e=>(...t)=>({_$litDirective$:e,values:t}),Xr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var qo=class extends Xr{constructor(t){if(super(t),this.it=qt,t.type!==Yn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===qt||t==null)return this._t=void 0,this.it=t;if(t===yn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};qo.directiveName="unsafeHTML",qo.resultType=1;var Gu=ei(qo);function La(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var $r=La();function Ju(e){$r=e}var Uo={exec:()=>null};function wt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(cn.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var mg=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),cn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},gg=/^(?:[ \t]*(?:\n|$))+/,hg=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,bg=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Wo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,yg=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ia=/(?:[*+-]|\d{1,9}[.)])/,ed=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,td=wt(ed).replace(/bull/g,Ia).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),vg=wt(ed).replace(/bull/g,Ia).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ma=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,kg=/^[^\n]+/,Pa=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,wg=wt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Pa).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),$g=wt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ia).getRegex(),ii="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Da=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,xg=wt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Da).replace("tag",ii).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),nd=wt(Ma).replace("hr",Wo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ii).getRegex(),Ag=wt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",nd).getRegex(),Na={blockquote:Ag,code:hg,def:wg,fences:bg,heading:yg,hr:Wo,html:xg,lheading:td,list:$g,newline:gg,paragraph:nd,table:Uo,text:kg},Ku=wt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Wo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ii).getRegex(),Sg={...Na,lheading:vg,table:Ku,paragraph:wt(Ma).replace("hr",Wo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ku).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ii).getRegex()},Eg={...Na,html:wt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Da).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Uo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:wt(Ma).replace("hr",Wo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",td).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Tg=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Cg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,rd=/^( {2,}|\\)\n(?!\s*$)/,Rg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ai=/[\p{P}\p{S}]/u,qa=/[\s\p{P}\p{S}]/u,od=/[^\s\p{P}\p{S}]/u,Og=wt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,qa).getRegex(),sd=/(?!~)[\p{P}\p{S}]/u,Lg=/(?!~)[\s\p{P}\p{S}]/u,Ig=/(?:[^\s\p{P}\p{S}]|~)/u,Mg=wt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",mg?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),id=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Pg=wt(id,"u").replace(/punct/g,ai).getRegex(),Dg=wt(id,"u").replace(/punct/g,sd).getRegex(),ad="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ng=wt(ad,"gu").replace(/notPunctSpace/g,od).replace(/punctSpace/g,qa).replace(/punct/g,ai).getRegex(),qg=wt(ad,"gu").replace(/notPunctSpace/g,Ig).replace(/punctSpace/g,Lg).replace(/punct/g,sd).getRegex(),Fg=wt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,od).replace(/punctSpace/g,qa).replace(/punct/g,ai).getRegex(),jg=wt(/\\(punct)/,"gu").replace(/punct/g,ai).getRegex(),Bg=wt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ug=wt(Da).replace("(?:-->|$)","-->").getRegex(),Wg=wt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ug).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ri=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,zg=wt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ri).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ld=wt(/^!?\[(label)\]\[(ref)\]/).replace("label",ri).replace("ref",Pa).getRegex(),cd=wt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Pa).getRegex(),Hg=wt("reflink|nolink(?!\\()","g").replace("reflink",ld).replace("nolink",cd).getRegex(),Yu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Fa={_backpedal:Uo,anyPunctuation:jg,autolink:Bg,blockSkip:Mg,br:rd,code:Cg,del:Uo,emStrongLDelim:Pg,emStrongRDelimAst:Ng,emStrongRDelimUnd:Fg,escape:Tg,link:zg,nolink:cd,punctuation:Og,reflink:ld,reflinkSearch:Hg,tag:Wg,text:Rg,url:Uo},Gg={...Fa,link:wt(/^!?\[(label)\]\((.*?)\)/).replace("label",ri).getRegex(),reflink:wt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ri).getRegex()},Ca={...Fa,emStrongRDelimAst:qg,emStrongLDelim:Dg,url:wt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Yu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:wt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Yu).getRegex()},Kg={...Ca,br:wt(rd).replace("{2,}","*").getRegex(),text:wt(Ca.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ti={normal:Na,gfm:Sg,pedantic:Eg},Fo={normal:Fa,gfm:Ca,breaks:Kg,pedantic:Gg},Yg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Vu=e=>Yg[e];function Vn(e,t){if(t){if(cn.escapeTest.test(e))return e.replace(cn.escapeReplace,Vu)}else if(cn.escapeTestNoEncode.test(e))return e.replace(cn.escapeReplaceNoEncode,Vu);return e}function Qu(e){try{e=encodeURI(e).replace(cn.percentDecode,"%")}catch{return null}return e}function Xu(e,t){let n=e.replace(cn.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(cn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(cn.slashPipe,"|");return r}function jo(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function Vg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Zu(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Qg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var oi=class{constructor(e){Rt(this,"options");Rt(this,"rules");Rt(this,"lexer");this.options=e||$r}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:jo(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Qg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=jo(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:jo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=jo(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=p,n.length===0)break;let g=s.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let _=g,$=_.raw+`
`+n.join(`
`),R=this.blockquote($);s[s.length-1]=R,r=r.substring(0,r.length-_.raw.length)+R.raw,o=o.substring(0,o.length-_.text.length)+R.text;break}else if(g?.type==="list"){let _=g,$=_.raw+`
`+n.join(`
`),R=this.list($);s[s.length-1]=R,r=r.substring(0,r.length-g.raw.length)+R.raw,o=o.substring(0,o.length-_.raw.length)+R.raw,n=$.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),g=e.split(`
`,1)[0],_=!p.trim(),$=0;if(this.options.pedantic?($=2,d=p.trimStart()):_?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,d=p.slice($),$+=t[1].length),_&&this.rules.other.blankLine.test(g)&&(u+=g+`
`,e=e.substring(g.length+1),a=!0),!a){let R=this.rules.other.nextBulletRegex($),j=this.rules.other.hrRegex($),G=this.rules.other.fencesBeginRegex($),ie=this.rules.other.headingBeginRegex($),ee=this.rules.other.htmlBeginRegex($);for(;e;){let F=e.split(`
`,1)[0],M;if(g=F,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),M=g):M=g.replace(this.rules.other.tabCharGlobal,"    "),G.test(g)||ie.test(g)||ee.test(g)||R.test(g)||j.test(g))break;if(M.search(this.rules.other.nonSpaceChar)>=$||!g.trim())d+=`
`+M.slice($);else{if(_||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||G.test(p)||ie.test(p)||j.test(p))break;d+=`
`+g}!_&&!g.trim()&&(_=!0),u+=F+`
`,e=e.substring(F.length+1),p=M.slice($)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Xu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(Xu(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=jo(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=Vg(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Zu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Zu(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let _=p.slice(1,-1);return{type:"em",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}let g=p.slice(2,-2);return{type:"strong",raw:p,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},An=class Ra{constructor(t){Rt(this,"tokens");Rt(this,"options");Rt(this,"state");Rt(this,"inlineQueue");Rt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||$r,this.options.tokenizer=this.options.tokenizer||new oi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:cn,block:ti.normal,inline:Fo.normal};this.options.pedantic?(n.block=ti.pedantic,n.inline=Fo.pedantic):this.options.gfm&&(n.block=ti.gfm,this.options.breaks?n.inline=Fo.breaks:n.inline=Fo.gfm),this.tokenizer.rules=n}static get rules(){return{block:ti,inline:Fo}}static lex(t,n){return new Ra(n).lex(t)}static lexInline(t,n){return new Ra(n).inlineTokens(t)}lex(t){t=t.replace(cn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(cn.tabCharGlobal,"    ").replace(cn.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),g;this.options.extensions.startInline.forEach(_=>{g=_.call({lexer:this},p),typeof g=="number"&&g>=0&&(d=Math.min(d,g))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},si=class{constructor(e){Rt(this,"options");Rt(this,"parser");this.options=e||$r}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(cn.notSpaceStart)?.[0],o=e.replace(cn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Vn(r)+'">'+(n?o:Vn(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:Vn(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let l=e.items[i];r+=this.listitem(l)}let o=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+o+s+`>
`+r+"</"+o+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let s=e.rows[o];n="";for(let i=0;i<s.length;i++)n+=this.tablecell(s[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Vn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Qu(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Vn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Qu(e);if(o===null)return Vn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Vn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Vn(e.text)}},ja=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Sn=class Oa{constructor(t){Rt(this,"options");Rt(this,"renderer");Rt(this,"textRenderer");this.options=t||$r,this.options.renderer=this.options.renderer||new si,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ja}static parse(t,n){return new Oa(n).parse(t)}static parseInline(t,n){return new Oa(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},ni,Bo=(ni=class{constructor(e){Rt(this,"options");Rt(this,"block");this.options=e||$r}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?An.lex:An.lexInline}provideParser(){return this.block?Sn.parse:Sn.parseInline}},Rt(ni,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Rt(ni,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ni),Xg=class{constructor(...e){Rt(this,"defaults",La());Rt(this,"options",this.setOptions);Rt(this,"parse",this.parseMarkdown(!0));Rt(this,"parseInline",this.parseMarkdown(!1));Rt(this,"Parser",Sn);Rt(this,"Renderer",si);Rt(this,"TextRenderer",ja);Rt(this,"Lexer",An);Rt(this,"Tokenizer",oi);Rt(this,"Hooks",Bo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new si(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new oi(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Bo;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Bo.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&Bo.passThroughHooksRespectAsync.has(s))return(async()=>{let p=await l.call(o,u);return a.call(o,p)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,u);return p===!1&&(p=await a.apply(o,u)),p})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return An.lex(e,t??this.defaults)}parser(e,t){return Sn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?An.lex:An.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Sn.parse:Sn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?An.lex:An.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Sn.parse:Sn.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Vn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},wr=new Xg;function Et(e,t){return wr.parse(e,t)}Et.options=Et.setOptions=function(e){return wr.setOptions(e),Et.defaults=wr.defaults,Ju(Et.defaults),Et};Et.getDefaults=La;Et.defaults=$r;Et.use=function(...e){return wr.use(...e),Et.defaults=wr.defaults,Ju(Et.defaults),Et};Et.walkTokens=function(e,t){return wr.walkTokens(e,t)};Et.parseInline=wr.parseInline;Et.Parser=Sn;Et.parser=Sn.parse;Et.Renderer=si;Et.TextRenderer=ja;Et.Lexer=An;Et.lexer=An.lex;Et.Tokenizer=oi;Et.Hooks=Bo;Et.parse=Et;var t$=Et.options,n$=Et.setOptions,r$=Et.use,o$=Et.walkTokens,s$=Et.parseInline;var i$=Sn.parse,a$=An.lex;function ir(e){let t=Et.parse(e),n=Hu.sanitize(t);return Gu(n)}function Qn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Zr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function li(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var dd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Zg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Jg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,eh=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function En(e){return!!e&&typeof e=="object"}function Ba(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ua(e,t){let n=Ba(e),r=Ba(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function pd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>En(o)&&typeof o.text=="string"?o.text:"").join(""):En(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function th(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:dd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ba(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=Ua(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=Ua(En(l)?l.old_string:"",En(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Wa(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var nh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function fd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>En(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(nh,"").trim();return n.length>0?{kind:"user",text:n}:null}function za(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Jg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:eh.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function rh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function oh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(En(i)){if(i.type==="text"&&typeof i.text=="string")s.push(za(i.text));else if(i.type==="thinking"){let l=Wa(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=th(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?ud(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(En(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=pd(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=fd(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?ud([o],n):[o]}return[]}function ud(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function sh(e){let t=typeof e.command=="string"?e.command:"",n=pd(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:dd.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function ih(e){if(e.type==="item.completed"&&En(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[za(t.text)];if(t.type==="user_message"){let n=fd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Wa(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[sh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function ah(e){if(e.schema!=="codex-delegation-monitor-v1"||!En(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&En(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[za(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=Wa(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Zg[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function lh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ch(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return En(t)?t:null}function _d(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=ch(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return rh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?ah(s):lh(s)?ih(s):oh(s,n);return i.length>0&&(r.progress=null),i}}}function Ha(e){let t=[],n=_d(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var uh=5,dh=10,ph=/Task\s+#(\d+)/,fh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,_h=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function zo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function mh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function gh(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function hh(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=ph.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function bh(e){if(e.tool==="Bash"){let t=e.command||"";return fh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":_h.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function yh(e){let t=e.filter(o=>o.kind==="tool").slice(-dh),n=new Map;t.forEach((o,s)=>{let i=bh(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function vh(e){let t=gh(e);if(t)return{text:t,guess:!1};let n=hh(e);if(n)return{text:n,guess:!1};let r=yh(e);return r?{text:r,guess:!0}:null}function kh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:rn(e,t)}function Jr(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,p={},g=!0,_=new Set,$=new Set,R=null,j=null,G=!1,ie=!1,ee=!1,F=null,M=null;function I(){G=!1,ie=!1,ee=!1,F=null,M=null}async function W(te){if(n){ie=!0,ee=!1,Ue();try{let z=await Promise.resolve(n("get-attempt-prompt",{attempt_id:te,...u?{root_dir:u}:{}}));if(s!==te)return;!z||typeof z!="object"||Array.isArray(z)?ee=!0:(F=z,M=te)}catch{s===te&&(ee=!0)}finally{s===te&&(ie=!1,Ue())}}}function K(){if(G=!G,G&&s&&M!==s){W(s);return}Ue()}function ne(){if(!G)return"";let te=Zr({loading:ie,error:ee});if(te)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${te}
      </div>`;if(!F)return"";if(F.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let z=li(F.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${z?c`<div class="prompt-block__meta">${z} 발송</div>`:""}
      ${typeof F.task_prompt=="string"?Qn("\uACFC\uC5C5 (user)",F.task_prompt):""}
      ${typeof F.system_prompt=="string"?Qn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",F.system_prompt):""}
    </div>`}function D(){if(!a||!r)return[];let te=r.get(a);return Ha(te?te.lines:[])}function Y(){if(!a||!r)return null;let te=r.get(a),z=te?te.last_event_at:null;return typeof z=="number"?z:null}function H(){return p.status==="running"}function Z(){if(H()&&s){j||(j=setInterval(()=>Ue(),1e3));return}Oe()}function Oe(){j&&(clearInterval(j),j=null)}function we(te){let z=[],Ae=0;for(;Ae<te.length;){let{idx:lt,line:x}=te[Ae];if(x.kind==="tool"){let U=Ae;for(;U<te.length&&te[U].line.kind==="tool"&&te[U].line.tool===x.tool;)U+=1;if(U-Ae>=uh&&!$.has(lt)){z.push({kind:"group",idx:lt,tool:x.tool||"",lines:te.slice(Ae,U)}),Ae=U;continue}}z.push({kind:"line",idx:lt,line:x}),Ae+=1}return z}function ce(te){let z=[],Ae=new Map;for(let U=0;U<te.length;U+=1){let he=te[U],De=he.parent_tool_use_id;if(typeof De=="string"&&De.length>0){let Fe=Ae.get(De);Fe||(Fe={kind:"subagent",idx:U,launch_id:De,agent_type:null,header:null,lines:[]},Ae.set(De,Fe),z.push(Fe)),Fe.lines.push({idx:U,line:he});continue}if(he.kind==="tool"&&he.tool==="Agent"&&typeof he.launch_id=="string"&&he.launch_id.length>0){let Fe=q(he),Be=Ae.get(he.launch_id);if(Be){Be.header={idx:U,line:he},Be.agent_type=Fe;continue}let ut={kind:"subagent",idx:U,launch_id:he.launch_id,agent_type:Fe,header:{idx:U,line:he},lines:[]};Ae.set(he.launch_id,ut),z.push(ut);continue}z.push({kind:"entry",idx:U,line:he})}let lt=[],x=0;for(;x<z.length;){if(z[x].kind!=="entry"){lt.push(z[x]),x+=1;continue}let U=x;for(;U<z.length&&z[U].kind==="entry";)U+=1;lt.push(...we(z.slice(x,U))),x=U}return lt}function q(te){let z=te.input;return z&&typeof z.subagent_type=="string"?z.subagent_type:null}function $e(te){for(let z=te.length-1;z>=0;z-=1){let Ae=te[z];if(Ae.kind==="result"||Ae.kind==="error")return null;if(Ae.kind==="tool"&&!Object.hasOwn(Ae,"result"))return Ae}return null}function Se(te){for(let z=te.length-1;z>=0;z-=1)if(te[z].kind==="thinking")return te[z];return null}function E(te,z){if(z.kind==="gate")return c`<div class="sv__gate">${z.text}</div>`;if(z.kind==="phase")return c`<div class="sv__phase">${z.text}</div>`;if(z.kind==="result")return c`<div
        class="sv__result${z.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${z.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${ir(z.text||(z.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(z.kind==="thinking"){let Ae=_.has(te);return c`<div
        class="sv__think${Ae?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Pe(te)}
      >
        <span class="sv__think-line">💭 ${zo(z.text)}</span>
        ${Ae?c`<pre class="sv__think-expand">${z.text}</pre>`:""}
      </div>`}if(z.kind==="user"){let Ae=_.has(te);return c`<div
        class="sv__line sv__line--user${Ae?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Pe(te)}
      >
        <span class="sv__user-line">▷ ${zo(z.text)}</span>
        ${Ae?c`<pre class="sv__user-expand">${z.text}</pre>`:""}
      </div>`}if(z.kind==="error")return c`<div class="sv__error">⛔ ${z.text}</div>`;if(z.kind==="blocker")return c`<div class="sv__error">⛔ ${z.text}</div>`;if(z.kind==="tool"){let Ae=_.has(te),lt=z.tool==="Bash"?mh(z.command):0,x=z.tool==="Bash"?lt>1?zo(z.command):z.command:z.path||z.command||"";return c`<div
        class="sv__tool${Ae?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Pe(te)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${z.icon}</span>
          <span class="sv__tool-name">${z.tool}</span>
          ${x?c`<span class="sv__tool-detail">${x}</span>`:""}
          ${lt>1?c`<span class="sv__tool-more">⋯ ${lt}줄</span>`:""}
          ${typeof z.added=="number"?c`<span class="sv__diff-add">+${z.added}</span>`:""}
          ${typeof z.removed=="number"?c`<span class="sv__diff-del">−${z.removed}</span>`:""}
          ${z.result?c`<span class="sv__tool-ok">→ ${z.result}</span>`:""}
        </span>
        ${Ae?c`<pre class="sv__tool-expand">${J(z)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${ir(z.text||"")}</div>`}function J(te){let z=[];if(te.tool==="Bash"&&typeof te.command=="string"&&te.command.length>0)z.push(te.command);else if(te.input!==void 0)try{z.push(`input: ${JSON.stringify(te.input,null,2)}`)}catch{}return typeof te.output=="string"&&te.output.length>0&&z.push(`output:
${te.output}`),z.join(`

`)}function Ce(){if(!s)return c``;let te=D(),z=(i?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),Ae=p.session_id||"",lt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${g?"ON":"OFF"}`,x=H(),U=x?kh(Y(),Date.now()):"",he=x?$e(te):null,De=x?Se(te):null,Fe=vh(te);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(i?p.role||"":s)}</span
        >
        ${Fe?c`<span
              class="sv__stage${Fe.guess?" sv__stage--guess":""}"
              title=${Fe.text}
              >${Fe.text}</span
            >`:""}
        ${x?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${U?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${U}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${U?c`<span class="sv__live-ago">${U}</span>`:""}</span
            >`:""}
        ${Ae?c`<button
              type="button"
              class="sv__session"
              title=${Ae}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ae}`}
              @click=${()=>ue(Ae)}
            >
              ⧉ ${Ae.slice(0,8)}
            </button>`:""}
        ${p.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${p.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${p.resume_command}`}
              @click=${()=>ue(p.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${z?c`<span class="sv__meta">${z}</span>`:""}
        ${p.worktree?c`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${G?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${G?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${K}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${g?" sv__follow--on":""}"
          aria-pressed=${g?"true":"false"}
          aria-label=${lt}
          @click=${B}
        >
          <span class="sv__follow-full">⇣ ${lt}</span>
          <span class="sv__follow-short">⇣ ${g?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ze()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":ne()}
      <div class="sv__body">
        ${te.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ce(te).map(Be=>Be.kind==="subagent"?xe(Be):Be.kind==="group"?fe(Be):E(Be.idx,Be.line))}
      </div>
      ${he||De?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${he?c`<span class="sv__now-icon">${he.icon}</span>
                  <span class="sv__now-name">${he.tool}</span>
                  <span class="sv__now-detail"
                    >${he.tool==="Bash"?zo(he.command):he.path||he.command||""}</span
                  >`:""}
            ${De?c`<span class="sv__now-think"
                  >💭 ${zo(De.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function fe(te){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>me(te.idx)}
    >
      <span class="sv__group-icon">${te.lines[0].line.icon}</span>
      <span class="sv__group-name">${te.tool}</span>
      <span class="sv__group-count">${te.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function xe(te){let z=$.has(te.idx),Ae=te.header?te.header.line:null,lt=Ae?Ae.is_error===!0?"\u2717":typeof Ae.result=="string"?"\u2713":"\u27F3":"",x=Ae&&Ae.command?Ae.command:"";return c`<div class="sv__sub${z?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>me(te.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${te.agent_type||"subagent"}</span>
        ${x?c`<span class="sv__sub-detail">${x}</span>`:""}
        <span class="sv__sub-count">${te.lines.length}줄</span>
        ${lt?c`<span class="sv__sub-state">${lt}</span>`:""}
        ${z?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${z?c`<div class="sv__sub-body">
            ${we(te.lines).map(U=>U.kind==="group"?fe(U):E(U.idx,U.line))}
          </div>`:""}
    </div>`}function me(te){$.add(te),Ue()}function Ue(){at(Ce(),e),Z(),g&&dt()}function dt(){let te=e.querySelector(".sv__body");te&&(te.scrollTop=te.scrollHeight)}function Pe(te){_.has(te)?_.delete(te):_.add(te),Ue()}function B(){g=!g,Ue()}function ue(te){on(te).then(z=>{z?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function se(te){!s||!te||(p={...p,...te},Ue())}function ae(te){let z=te.target;if(!z||!z.classList||!z.classList.contains("sv__body"))return;!(z.scrollHeight-z.scrollTop-z.clientHeight<=4)&&g&&(g=!1,Ue())}e.addEventListener("scroll",ae,!0);function Ee(te){let z=te.target;!z||typeof z.closest!="function"||e.contains(z)||z.closest("dialog")||z.closest(".md-viewer-root")||ze()}let _e=!1;function Le(){_e||(document.addEventListener("mousedown",Ee),_e=!0)}function Ze(){_e&&(document.removeEventListener("mousedown",Ee),_e=!1)}function Ge(te){let z=te&&te.attempt_id;if(!z)return;let Ae=typeof te.launch_id=="string"&&te.launch_id.length>0?te.launch_id:null,lt=te.session_ref&&typeof te.session_ref=="object"?te.session_ref:null;if(Ae&&lt)return;let x=a;s=z,i=Ae,l=lt,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&x&&x!==a&&Promise.resolve(n("unsubscribe-session-log",{id:x})).catch(()=>{}),u=typeof te.root_dir=="string"&&te.root_dir.length>0?te.root_dir:null,p=te.meta||{},d=te.hide_prompt===!0,g=!0,_.clear(),$.clear(),I(),!R&&r&&(R=r.subscribe(Ue)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Le(),Ue()}function ze(){let te=a;Ze(),s=null,i=null,l=null,a=null,u=null,d=!1,_.clear(),$.clear(),I(),Oe(),n&&te&&Promise.resolve(n("unsubscribe-session-log",{id:te})).catch(()=>{}),at(c``,e),o&&o()}return{open:Ge,updateMeta:se,close:ze,isOpen(){return s!==null},destroy(){Oe(),Ze(),R&&(R(),R=null),e.removeEventListener("scroll",ae,!0),s=null,i=null,l=null,a=null,u=null,d=!1,at(c``,e)}}}function wh(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function $h(e){let t=e&&e.metadata||{},n=Mr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:wh(t)?null:"plan_pending"}),r}function md(e,t){let n=$h(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${o=>t.onCopyPath(o,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${o=>t.onOpenDoc(o,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var xh="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Ah=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Sh=/^\*\*결론\*\* — (.+)$/;function ci(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==xh)return null;let n=Ah.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Sh.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var gd=20;function hd(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function Eh(e){return e.length>gd?`${e.slice(0,gd)}\u2026`:e}function Th(e,t,n,r){let o=`${t.lane} ${Eh(t.identifier)}`;return c`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${r?"true":"false"}
      @click=${()=>n.onToggle&&n.onToggle(e.id)}
    >
      <span class="detail-report__tri">${r?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${t.lane==="worker"?" detail-report__lane--worker":""}"
          title=${`${t.lane} ${t.identifier} \xB7 ${t.timestamp}`}
          >${o}</span
        >
        <span class="detail-report__time">${hd(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${ir(t.body)}
        </div>`:""}
  </div>`}function Ch(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${hd(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${ir(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function bd(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=ci(typeof a.text=="string"?a.text:"");return u?Th(a,u,t,o.has(a.id)):Ch(a)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${i}
        .value=${s}
        @input=${a=>t.onDraftInput&&t.onDraftInput(a.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${i||s.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:B$}=yl;var yd=e=>e.strings===void 0;var Rh={},vd=(e,t=Rh)=>e._$AH=t;var xr=ei(class extends Xr{constructor(e){if(super(e),e.type!==Yn.PROPERTY&&e.type!==Yn.ATTRIBUTE&&e.type!==Yn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!yd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===yn||t===qt)return t;let n=e.element,r=e.name;if(e.type===Yn.PROPERTY){if(t===n[r])return yn}else if(e.type===Yn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return yn}else if(e.type===Yn.ATTRIBUTE&&n.getAttribute(r)===t+"")return yn;return vd(e),t}});var Oh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ga={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},kd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Lh={pin:"pin",global:"global",base:"base"};function Ih(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Lh[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Mh(e,t,n){switch(e){case"workflow_mode":return go;case"spec_review_model":case"impl_review_model":return ho;case"plan_review_model":return ws;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return $s;case"impl_dispatch":return Ec;case"impl_runtime":return ks;case"impl_model":return Hr(n,t.impl_runtime);case"impl_effort":return Gr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return mo;case"orchestration_model":return bo(n,null);case"orchestration_effort":return Gr(n,void 0,t.orchestration_model||hn).filter(r=>r!==hn);default:return[]}}function Ph(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Ih(e.source)}
    <span class="detail-effective__k"
      >${nr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${xs[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${nr[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${n=>{let r=String(n.target.value);t.onEdit(e.key,r.length===0?null:r)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(n=>c`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function wd(e,t){let n=Ji.flatMap(a=>a.keys),r=ea(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Mc(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${a=>t.onToggle(a.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${a=>{a.preventDefault();let u=a.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${l}
        >${Dh(s)}</span
      >
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${o.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${o.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${o.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </summary>
    ${e.expanded?c`<div class="detail-effective__body">
          ${Ji.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=hs({key:u.key,choices:Mh(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Ph(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${xr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${a=>t.onPresetSelect(String(a.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(a=>c`<option
                    value=${a.id}
                    ?selected=${a.id===e.preset_id}
                  >
                    ${a.name}${a.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
  </details>`}function Dh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Nh(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function $d(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Nh(r.exec_receipt),u=a?jn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=ms(r.planned_execution,r.exec_receipt),g=r.chips?.pr?.number,_=typeof g=="number"?`PR #${g}`:"PR",$=vo(n),R=t.onApplyRec;return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${i?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${i}
            target="_blank"
            rel="noreferrer"
            >${_}</a
          >`:""}
      ${p?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${u?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${a?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${$?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec"
            data-state=${$.state}
            title=${Ss($)}
            ?disabled=${$.state==="applied"}
            @click=${()=>R?.($.rec,$.state)}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${qh(s).map(j=>Fh(j,n,o,{label:j.id==="pr"?_:j.label,href:j.id==="pr"?i:""}))}
    </div>
  </section>`}function qh(e){let n=typeof e=="string"&&Object.hasOwn(Ga,e)&&Ga[e]||Ga.spec_backed;return Oh.filter(r=>n.includes(r.id))}var ui={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Fh(e,t,n,r){let o=jh(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=u?ui.stale:l?ui.on:a?ui.current:ui.none,g=Bh(e,n),_=`${r.label} \xB7 ${p}${g?` \xB7 ${g}`:""}${o?` \xB7 ${o}`:""}`,$=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,R=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${$}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${_}
      >${R}</a
    >`:c`<span
    class=${$}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${_}
    >${R}</span
  >`}function jh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Bh(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(kd,n)?kd[n]:""}function di(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function xd(e){return di(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Ad(e,t){let n=e&&e[t];if(!di(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(xd),o=xd(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Td(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function pi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Td(e)}${t}`}function eo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Td(e)}`}function Uh(e,t,n){if(n!==null){let o=e==="claude"?pi:eo,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:eo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Sd(e,t){if(!di(e)||e.state!=="usable"||!di(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Ed(e){let t=e.provider_key==="claude"?pi:eo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Uh(e.provider_key,e.provider,e.workspace_default)}
        </option>
        ${e.selected&&!n?c`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>c`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?c`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":c`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function Cd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Ed({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Ad(t,"claude"),selected:o,workspace_default:Sd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Ed({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Ad(t,"codex"),selected:s,workspace_default:Sd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Wh(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function zh(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function fi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(R){R.key==="Escape"&&o&&(R.preventDefault(),_())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>_()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Wh(o)}</span
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
            ${s==="loading"?c`<div class="mv__status">불러오는 중…</div>`:s==="pending"?c`<div class="mv__status">${a}</div>`:s==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${ir(i)}`}
          </div>
        </div>
      </div>
    `:c``}function p(){at(d(),e)}async function g(R,j={}){o=R,s="loading",i="",l=null,a="",p();let G=j.workspace||(n?n():"");if(!G){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let ie="/api/doc?workspace="+encodeURIComponent(G)+"&path="+encodeURIComponent(R);try{let ee=await r(ie),F=await ee.json().catch(()=>({}));if(!ee.ok||!F||F.ok!==!0){if(F?.error==="not_found"&&j.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(F&&F.error||ee.status)+")",p();return}let M=zh(String(F.content||""));l=M.front,i=M.body,s="ready",p()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function _(){o=null,at(c``,e)}function $(){document.removeEventListener("keydown",u),_()}return{open:g,close:_,destroy:$}}var Hh=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ld="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",_i=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Gh=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Rd(e){return typeof e=="string"&&Gh.has(e)}var Kh=["running","done","failed","interrupted"],Yh={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Vh(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Qh(e){let t=Zt(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Wr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Ld}
          >부분 집계</span
        >`:""}`}function Od(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Va(e){if(typeof e=="number")return Ho(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ho(t):""}function Xh(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Zh(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ka(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ya(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Jh(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!_i.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ka(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ka(t.effort))||!(!("agent_type"in t)||Ka(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Kh.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Ya(t.started_at)||!Ya(t.last_event_at)||!Ya(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function eb(e,t,n){let o=Zt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?c`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${Va(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Va(n.completed_at)}</span
        >`:""}
    ${o?c`<span class="detail-session__usage" title=${o.tooltip}
          >${o.label}</span
        >`:""}
  </div>`}function tb(e,t,n,r){let o=e.status==="running"?null:t,i=(o?Zt({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Ho(e.last_event_at):o?Va(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,Xh(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Zh(e,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Yh[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${a}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${u.title}
      >${u.text}</span
    >
    ${l?c`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function nb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function rb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let p=Jh(d);!p||o.has(p.launch_id)||Rd(p.agent_type)||(o.add(p.launch_id),r.push(p))}r.sort((d,p)=>(d.started_at||0)-(p.started_at||0));let i={};for(let{role:d,provider:p}of _i){let g=t?t.roles[d]?.[p]:null;i[d]=g?[...g.legs]:[]}let l=_i.flatMap(({role:d})=>i[d]),a=new Set,u=[];for(let{role:d,provider:p}of _i){for(let g of r.filter(_=>_.role===d&&_.provider===p)){let _=l.find($=>$.receipt_id===g.launch_id)||null;_&&!nb(g,_)||(_&&a.add(_.receipt_id),u.push(tb(g,_,e.attempt_id,n)))}for(let g of i[d])!a.has(g.receipt_id)&&!Rd(g.agent_type)&&u.push(eb(d,p,g))}return u}function ob(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Hh,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Vh(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Ld}</span>`:""}
  </div>`}var sb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ho(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function ib(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var ab={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function lb(e,t){let n=ab[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${zi(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${fo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Ho(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Id(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(_=>_&&_.current===!0),...s.filter(_=>_&&_.current!==!0).sort((_,$)=>$.index-_.index)],l=i.map(_=>lb(_,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let _ of o)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&u.add(_.resumed_from);let d=_=>{if(!(_.status==="failed"||_.status==="orphaned"))return"";let R=typeof _.session_id=="string"&&_.session_id.length>0,j=u.has(_.attempt_id),G=R&&!j,ie=R?j?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${_.attempt_id}
      ?disabled=${!G}
      title=${ie}
      @click=${ee=>{ee.stopPropagation(),G&&t.onResume&&t.onResume(_.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=_=>{if(!(_.status==="failed"||_.status==="orphaned")||typeof _.cause!="string"||_.cause==="")return"";let R=_.cause_detail,j=R&&typeof R.reason=="string"&&R.reason.length>0?typeof R.command=="string"&&R.command.length>0?`${R.reason} \xB7 ${R.command}`:R.reason:_.cause;return c`<div class="detail-session__cause" title=${j}>
      ${_.cause}
    </div>`},g=_=>{let $=Od(Yi(_));if(Zt($).length===0&&!Wr(_.usage))return"";let R=a.has(_.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${_.attempt_id}
      aria-expanded=${R?"true":"false"}
      title=${R?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${j=>{j.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(_.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Qh(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(_=>{let $=Yi(_),R=Od($),j=Zt(R);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${_.status||"unknown"}"
            data-attempt-id=${_.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(_.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${sb[_.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${_.attempt_id}</span>
            ${uo(_)?c`<span
                  class="detail-session__resumed"
                  title=${uo(_)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${br(_)}</span>
            ${j.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${_.session_id?c`<span class="detail-session__sid" title=${_.session_id}
                  >${String(_.session_id).slice(0,8)}</span
                >`:""}
            ${j.length>0?j.map(G=>c`<span
                      class="detail-session__usage"
                      title=${G.tooltip}
                      >${G.label}</span
                    >`):Wr(_.usage)?c`<span class="detail-session__usage"
                    >${Wr(_.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ho(_.started_at)}</span>
          </button>
          ${g(_)} ${d(_)} ${p(_)} ${ib(_)}
          ${a.has(_.attempt_id)&&_.usage?ob(_.usage,_.runner==="codex"?"codex":"claude"):""}
          ${rb(_,$,t)}
        </div>`})}
    </div>
  `}function Md(e,t={}){return c`
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
          ${cb(e)}
        </div>`:""}
  `}function cb(e){let t=Zr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Qn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=li(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Qn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Qn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var ub=["open","in_progress","deferred","resolved","closed"],db=[0,1,2,3,4];function Pd(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,p={},g="",_=!1,$=[],R=!1,j={},G={claude:null,codex:null},ie=null,ee=null,F=0,M=!1,I=!1,W="",K="",ne="",D="",Y=!1;function H(){M=!1,I=!1,W="",K="",ne="",D="",Y=!1}function Z(){G={claude:null,codex:null},ie=null,ee=null,F+=1}async function Oe(){if(!o)return null;try{let v=await Promise.resolve(o("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function we(v){try{let Q=await fetch(v);if(!Q.ok)return null;let N=await Q.json();if(!N||typeof N!="object"||!Array.isArray(N.accounts))return null;let Ie=N.accounts.filter(tt=>tt!==null&&typeof tt=="object"&&!Array.isArray(tt));return{accounts:Ie,active:Ie.find(tt=>tt.active===!0)||null}}catch{return null}}async function ce(v){ee=v;let Q=++F,[N,Ie,tt]=await Promise.all([we("/api/claude-usage"),we("/api/codex-usage"),Oe()]);Q!==F||v!==u||(G={claude:N,codex:Ie},ie=tt,ke())}let q=[],$e=null,Se=null,E=!1,J="",Ce=!1,fe=0,xe=new Set;function me(){q=[],$e=null,Se=null,E=!1,J="",Ce=!1,fe+=1,xe.clear()}async function Ue(v){if(!o)return;let Q=++fe;try{let N=await Promise.resolve(o("get-comments",{id:v}));if(Q!==fe||v!==u)return;q=Array.isArray(N)?N:[],E=!1}catch{if(Q!==fe||v!==u)return;E=!0}ke()}function dt(){if(!o||!u)return;let v=d&&typeof d.comment_count=="number"?d.comment_count:null;if($e!==u){$e=u,Se=v,Ue(u);return}v!==null&&v!==Se&&(Se=v,Ue(u))}function Pe(v){xe.has(v)?xe.delete(v):xe.add(v),ke()}function B(v){let Q=J.trim().length===0;J=v,Q!==(v.trim().length===0)&&ke()}async function ue(){let v=J.trim();if(!o||!u||v.length===0||Ce)return;let Q=u;Ce=!0,ke();let N=!1;try{let Ie=await Promise.resolve(o("add-comment",{id:Q,text:v}));Array.isArray(Ie)&&Ie.length>0&&(N=!0,Q===u&&(q=Ie,E=!1,J="",Se=Ie.length))}catch{N=!1}N||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),Q===u&&(Ce=!1),ke()}let se={onToggle:Pe,onDraftInput:B,onSubmit:ue},ae=t.mdViewer||null,Ee=null;ae||(Ee=document.createElement("div"),Ee.className="md-viewer-root",document.body.appendChild(Ee));let _e=ae||fi(Ee,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Le=document.createElement("div");Le.className="session-log-root",document.body.appendChild(Le);let Ze=Jr(Le,{transport:o?(v,Q)=>Promise.resolve(o(v,Q)):void 0,sessionLogStore:a}),Ge=!1,ze=!1,te=!1,z=null,Ae=null,lt=0;function x(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function U(){Ge=!1,ze=!1,te=!1,z=null,Ae=null,lt+=1}async function he(v){if(!o)return;let Q=++lt;ze=!0,te=!1,ke();try{let N=await Promise.resolve(o("get-bead-prompt",{bead_id:v}));if(Q!==lt)return;!N||typeof N!="object"||Array.isArray(N)?te=!0:(z=N,Ae=x(v))}catch{Q===lt&&(te=!0)}finally{Q===lt&&(ze=!1,ke())}}let De=[],Fe=null,Be=0;function ut(v,Q){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${Q}`}function At(){De=[],Fe=null,Be+=1}async function Dt(v,Q){if(!o)return;let N=++Be,Ie;try{Ie=await Promise.resolve(o("get-session-refs",{bead_id:v}))}catch{Ie=null}N!==Be||Q!==Fe||(De=Ie&&Array.isArray(Ie.sessions)?Ie.sessions:[],ke())}function Wt(){if(!o||!u)return;let v=d&&d.metadata,Q=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(Q===null){At();return}let N=ut(u,Q);Fe!==N&&(De=[],Fe=N,Dt(u,N))}function jt(){if(Ge=!Ge,Ge&&u&&Ae!==x(u)){z=null,he(u);return}ke()}function ht(){if(!i||!u)return[];let v=i.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(N=>N&&N.bead_id===u).sort((N,Ie)=>(Ie.started_at||0)-(N.started_at||0)).map(N=>({attempt_id:N.attempt_id,bead_id:N.bead_id,status:N.status,started_at:typeof N.started_at=="number"?N.started_at:null,runner:N.runner||null,model:N.model||null,effort:N.effort||N.observed_effort||null,speed:N.speed||null,session_id:N.session_id||null,resumed_from:N.resumed_from||null,continuation_mode:N.continuation_mode||null,dismissed_at:typeof N.dismissed_at=="number"?N.dismissed_at:null,cause:typeof N.cause=="string"?N.cause:null,cause_detail:N.cause_detail||null,exec_default_preset_id:typeof N.exec_default_preset_id=="string"?N.exec_default_preset_id:null,exec_default_preset_revision:typeof N.exec_default_preset_revision=="number"?N.exec_default_preset_revision:null,exec_values:N.exec_values&&typeof N.exec_values=="object"?N.exec_values:null,usage:N.usage||null,usage_legs:Array.isArray(N.usage_legs)?N.usage_legs:[],delegation_sessions:Array.isArray(N.delegation_sessions)?N.delegation_sessions:[]}))}function Ye(){if(!i||!u)return null;let v=i.get();return Wn(v&&v.attempts||{},u)}let L=new Set;function re(v){L.has(v)?L.delete(v):L.add(v),ke()}function ge(v){let Q=i?i.get():null,N=Q&&Q.attempts?Q.attempts[v]:null;Ze.open({attempt_id:v,meta:N?{runner:N.runner||void 0,model:N.model||void 0,effort:N.effort||void 0,status:N.status||void 0,session_id:N.session_id||void 0}:{}})}function O(v,Q){let N=i?i.get():null,Ie=N&&N.attempts?N.attempts[v]:null,nt=(Ie&&Array.isArray(Ie.delegation_sessions)?Ie.delegation_sessions:[]).find(vt=>vt&&typeof vt=="object"&&vt.launch_id===Q);nt&&Ze.open({attempt_id:v,launch_id:Q,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function X(v){if(!o||!v)return;let Q=await jr();if(Q===null)return;let N=()=>{let vt=i?i.get():null;return vt&&typeof vt.revision=="number"?vt.revision:0},Ie=async(vt={},Qe=N())=>await o("worker-attempt-resume",{attempt_id:v,expected_revision:Qe,...Q!==""?{instructions:Q}:{},...vt}),tt=vt=>{vt?.queue&&i?.set&&i.set(vt.queue)},nt=await Ie();if(tt(nt),nt&&nt.conflict){let vt=nt.queue&&typeof nt.queue.revision=="number"?nt.queue.revision:N();nt=await Ie({},vt),tt(nt)}nt=await Bn(nt,(vt,Qe)=>Ie({continuation:vt,decision_token:Qe}),{onResult:tt,refresh:()=>Ie()}),nt&&nt.resumed===!1&&!nt.conflict&&nt.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${nt.reason}`,"error",2400)}function Ne(v){!v||!u||Ze.open(Br(v,u,d&&d.status))}let Ve={onOpen:ge,onOpenDelegation:O,onResume:X,onToggleUsage:re,onOpenSessionRef:Ne,onCopyResumeCommand:Kt};function qe(){let v=i?i.get():null,Q={...j};for(let N of["orchestration_model","orchestration_effort","orchestration_speed"]){let Ie=v&&v[N];typeof Ie=="string"&&(Q[N]=Ie)}return Q}async function ct(){if(o){try{let v=await Promise.resolve(o("get-session-defaults",{}));j=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{j={}}ke()}}function st(){let v=i?i.get():null;return v&&v.runner_catalog||null}function We(){let v=i?i.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function et(){let v=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},N=mn({pin:{...v,...p},global:qe(),execution_defaults:We(),runner_catalog:st(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return wn(st(),N)}function kt(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Ke(v){return v?.compatible===!1}function Ot(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function Je(){let v=kt(),Q=v?.presets.find(N=>N.id===g);if(!(!o||!u||!v||!Q||Ke(Q)||_)){_=!0,$=[],ke();try{let N=await Promise.resolve(o("apply-impl-preset",Dc(u,Q.id,v.revision)));if(N&&N.conflict){Ot(N),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Ie=N&&Array.isArray(N.issue)?N.issue[0]:N?.issue;if(N&&N.applied&&Ie&&typeof Ie=="object"){d=Ie,$=Array.isArray(N.skipped_orchestration_keys)?N.skipped_orchestration_keys.filter(tt=>typeof tt=="string"):[];for(let tt of Nc)delete p[tt];de($.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}N&&N.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(N){N&&typeof N=="object"&&N.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{_=!1,ke()}}}let rt=null;n&&n.subscribe&&(rt=n.subscribe(()=>Gt()));let Bt=null;i&&typeof i.subscribe=="function"&&(Bt=i.subscribe(()=>{u&&ke()}));let Mt=null,Tt=null;function Ht(){Tt&&(Tt(),Tt=null)}l&&typeof l.subscribe=="function"&&(Mt=l.subscribe(()=>{u&&ke()}));function nn(v){v.key==="Escape"&&u&&(v.preventDefault(),r())}document.addEventListener("keydown",nn);function Gt(){if(u){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+u)||[];d=v.find(N=>N&&N.id===u)||v[0]||d}dt(),Wt(),ke()}}function Kt(v){on(v).then(Q=>{Q?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Lt(v){v.preventDefault(),v.stopPropagation(),u&&Kt(u)}function bn(v,Q){v.preventDefault(),v.stopPropagation(),Kt(Q)}function Xt(v,Q,N){v.preventDefault(),v.stopPropagation(),_e.open(Q,{missing_state:N})}async function St(v,Q){let N=Object.hasOwn(p,v),Ie=p[v];if(p[v]=Q,ke(),!(!o||!u))try{let tt=await Promise.resolve(o("update-exec-settings",Pc(u,v,Q.length===0?null:Q))),nt=Array.isArray(tt)?tt[0]:tt;if(!nt||typeof nt!="object"||!nt.id)throw new Error("exec settings readback failed");d=nt,delete p[v],ke()}catch(tt){throw N?p[v]=Ie:delete p[v],ke(),de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),tt}}function Vt(v){v.catch(()=>{})}async function dn(v,Q){let N=d||{},Ie=N.metadata&&typeof N.metadata=="object"?N.metadata:{},tt={};for(let Qe of["impl_runtime","impl_model","impl_effort"])tt[Qe]=Object.hasOwn(p,Qe)?p[Qe]:typeof Ie[Qe]=="string"?Ie[Qe]:"";tt[v]=Q;let nt=jc(tt,st(),et()),vt={};for(let Qe of["impl_runtime","impl_model","impl_effort"])vt[Qe]=p[Qe],p[Qe]=nt[Qe]||"";if(ke(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...nt,orchestration_runtime:et()})).then(Qe=>{let gt=Array.isArray(Qe)?Qe[0]:Qe;if(!gt||typeof gt!="object"||!gt.id)throw new Error("implementation target readback failed");d=gt;for(let Te of["impl_runtime","impl_model","impl_effort"])delete p[Te];ke()}).catch(Qe=>{for(let gt of["impl_runtime","impl_model","impl_effort"])vt[gt]===void 0?delete p[gt]:p[gt]=vt[gt];throw ke(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Qe})}async function ye(v,Q){if(!(!v||typeof v!="object")&&!(Q==="diverged"&&!window.confirm("\uCD94\uCC9C \uC2E4\uD589 \uC124\uC815\uC744 \uC801\uC6A9\uD560\uAE4C\uC694? \uD604\uC7AC \uC218\uB3D9 \uC124\uC815\uC744 \uB36E\uC5B4\uC501\uB2C8\uB2E4."))){try{await St("orchestration_model",v.orchestration_model)}catch{return}if(typeof v.impl_runtime=="string"&&v.impl_runtime.length>0)try{await dn("impl_runtime",v.impl_runtime)}catch{}}}async function T(v,Q,N){if(!o||!u)return!1;try{let Ie=await Promise.resolve(o(v,Q)),tt=Array.isArray(Ie)?Ie[0]:Ie;return tt&&typeof tt=="object"&&tt.id?(d=tt,!0):(de(N,"error"),!1)}catch(Ie){return Ie&&typeof Ie=="object"&&Ie.code==="bd_readback_failed"?(de("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(de(N,"error"),!1)}}function h(v){setTimeout(()=>{try{let Q=e.querySelector(v);Q&&typeof Q.focus=="function"&&Q.focus()}catch{}},0)}function A(){M=!0,W=d&&d.title||"",ke(),h('.detail-edit__input[data-edit="title"]')}function pe(v){W=v.target.value}function je(){M=!1,W="",ke()}function Me(){T("edit-text",{id:u,field:"title",value:W},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(Q=>{Q===!0&&(M=!1,W=""),ke()})}function be(){I=!0,K=d&&d.description||"",ke(),h('.detail-edit__textarea[data-edit="description"]')}function yt(v){K=v.target.value}function pt(){I=!1,K="",ke()}function ft(){T("edit-text",{id:u,field:"description",value:K},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(Q=>{Q===!0&&(I=!1,K=""),ke()})}function it(v,Q,N,Ie){if(v.key==="Escape"){v.stopPropagation(),N();return}v.key==="Enter"&&(!Ie||v.ctrlKey||v.metaKey)&&(v.preventDefault(),Q())}function m(v){let Q=v.target.value;T("update-status",{id:u,status:Q},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ke())}function b(v){let Q=Number(v.target.value);T("update-priority",{id:u,priority:Q},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ke())}function C(v){ne=v.target.value}function P(){let v=ne.trim();v.length!==0&&T("label-add",{id:u,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(Q=>{Q===!0&&(ne=""),ke()})}function f(v){if(v.key==="Escape"){v.stopPropagation(),ne="",ke();return}v.key==="Enter"&&(v.preventDefault(),P())}function y(v){T("label-remove",{id:u,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ke())}let V={onCopyPath:bn,onOpenDoc:Xt};function le(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function Re(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function mt(v){switch(v){case"discovered-from":return"\u21A9 \uBC1C\uACAC ";case"parent-child":return"\u2338 \uC0C1\uC704 ";case"related":return"\uAD00\uB828 ";default:return v.length>0?`${v} `:""}}function Ct(v){if(!v||typeof v!="object")return;let Q=typeof v.status=="string"?v.status:"",N=typeof v.title=="string"?v.title:"";return Q.length>0&&N.length>0?`${Q} \xB7 ${N}`:void 0}function Dn(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function w(){return t.depCandidates?t.depCandidates():null}async function k(v,Q,N){let Ie=Dn(),tt=u;if(!tt)return;if(Ie.length===0){de("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let nt=await T(v,{a:tt,b:Q,view_id:tt,root_dir:Ie},N),vt=nt===!0||nt!==!1&&nt.saved===!0;vt&&t.onDepChanged&&t.onDepChanged({type:v,a:tt,b:Q}),v==="dep-add"&&vt&&(D="",Y=!1),ke()}function S(v){if(!u)return;let Q=globalThis.confirm;typeof Q=="function"&&!Q(`${v}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||k("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function oe(v){v.disabled||k("dep-add",v.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function ve(v){D=v.target.value,Y=!0,ke()}function He(){Y||(Y=!0,ke())}function ot(v,Q){if(v.key==="Escape"){v.stopPropagation(),D="",Y=!1,ke();return}v.key==="Enter"&&(v.preventDefault(),Q.length===1&&!Q[0].disabled&&oe(Q[0]))}function $t(v){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${D}
        @focus=${He}
        @input=${ve}
        @keydown=${Q=>ot(Q,v)}
      />
      ${Y||D.length>0?c`<div class="detail-dep-add__list">
            ${v.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:v.map(Q=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${Q.bead_id}
                      ?disabled=${Q.disabled}
                      title=${tn(Q.reason)}
                      @click=${()=>oe(Q)}
                    >
                      <span class="detail-dep-add__repo"
                        >${Q.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${Q.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${Q.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function Xe(v,Q){let N=Q.get(v.id),Ie=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${tn(v.title)}
          @click=${()=>N===void 0?s(v.id):s(v.id,N)}
        >
          ${v.label}
        </button>`:c`<span class="detail-dep__link" title=${tn(v.title)}
          >${v.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${v.kind}${s?" detail-dep--link":""}`}
      >${Ie}${v.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${v.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+v.id}
            @click=${()=>S(v.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Nt(v){let Q=Array.isArray(v.dependencies)?v.dependencies:[],N=Array.isArray(v.dependents)?v.dependents:[],Ie=[];for(let Qe of Q){let gt=le(Qe);gt.length>0&&Re(Qe)==="blocks"&&Ie.push({id:gt,label:`\u26D3 \uB9C9\uB294 ${gt}`,kind:"pred",title:Ct(Qe)})}for(let Qe of N){let gt=le(Qe);gt.length>0&&Re(Qe)==="blocks"&&Ie.push({id:gt,label:`\u26D3 \uB9C9\uD788\uB294 ${gt}`,kind:"succ",title:Ct(Qe)})}for(let Qe of Q){let gt=le(Qe),Te=Re(Qe);gt.length>0&&Te!=="blocks"&&Ie.push({id:gt,label:`${mt(Te)}${gt}`,kind:"other",title:Ct(Qe)})}let tt=w(),nt=new Map;if(tt)for(let Qe of tt.issues)nt.has(Qe.bead_id)||nt.set(Qe.bead_id,Qe.root_dir);let vt=tt&&u?Lu(Ou(u,tt),D):[];return c`
      <div class="detail-section-label">의존성</div>
      ${Ie.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${Ie.map(Qe=>Xe(Qe,nt))}
          </div>`}
      ${tt===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:$t(vt)}
    `}function en(v){let Q=v.metadata||{},N=v.workflow||{},Ie=N.stages||{},tt=Ie.spec&&Ie.spec.stale,nt=Ie.impl&&Ie.impl.stale,vt=N.quick_fix_review?.state==="stale",Qe=Ie.plan||null,gt=N.route_source==="derived",Te=N.route||Q.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${gt?" detail-kv__v--derived":""}"
          title=${gt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${gt?"unset":Te}</span
        >
      </div>
      ${N.route!=="quick_fix"||Object.hasOwn(Q,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${Q.spec_review||"\uC5C6\uC74C"}${tt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${N.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Qe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Qe?.approval_receipt||"\uC5C6\uC74C"}${Qe?.approval_state==="stale"?" \xB7 stale":Qe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${N.route!=="quick_fix"||Object.hasOwn(Q,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${Q.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${N.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${N.resolver.attempt} \xB7 ${N.resolver.prior_sha} \u2192 ${N.resolver.sha}`}
              >${`${N.resolver.prior_sha.slice(0,7)} \u2192 ${N.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${N.route==="quick_fix"||Object.hasOwn(Q,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${Q.quick_fix_review||"\uC5C6\uC74C"}${vt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${N.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${N.planned_execution.kind}</span>
            </div>
            ${N.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${N.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${N.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${jn(N.exec_receipt)}</span
            >
          </div>`:""}
      ${N.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${N.impl_entry.actor}@${N.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${Q.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${Q.pr_url}</span>
          </div>`:""}
    `}let Cn={route:["quick_fix","spec_backed","full_plan"]};async function ur(v,Q){let N=Q.target.value;if(v==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&N!=="full_plan"&&!window.confirm(`full_plan \u2192 ${N||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ke();return}await T("update-workflow-meta",{id:u,key:v,value:N},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ke()}function Rn(v){let Q=v.metadata||{};return c` ${((Ie,tt)=>{let nt=Cn[Ie],vt=typeof Q[Ie]=="string"?Q[Ie]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Ie}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Ie}
          data-edit=${`wfmeta-${Ie}`}
          @change=${Qe=>ur(Ie,Qe)}
        >
          <option value="" ?selected=${!nt.includes(vt)}>
            ${tt}
          </option>
          ${nt.map(Qe=>c`<option value=${Qe} ?selected=${vt===Qe}>${Qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Nn(v,Q){return M?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${W}
            @input=${pe}
            @keydown=${N=>it(N,Me,je,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Me}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${je}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${Zt(Q).map(N=>c`<span class="detail-usage-total" title=${N.tooltip}
              >${N.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${A}
        >
          ✎
        </button>
      </div>
    `}function Qt(v){let Q=Yt(v.created_at),N=Yt(v.updated_at);return!Q&&!N?c``:c`
      ${Q?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${Q}</span>
          </div>`:""}
      ${N?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${N}</span>
          </div>`:""}
    `}function Xn(v,Q){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${m}
        >
          ${ub.map(N=>c`<option value=${N} ?selected=${N===v}>${N}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${b}
        >
          ${db.map(N=>c`<option value=${String(N)} ?selected=${N===Q}>
                P${N}
              </option>`)}
        </select>
      </div>
    `}function Tr(v){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${I?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${be}
            >
              ✎
            </button>`}
      </div>
      ${I?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${K}
              @input=${yt}
              @keydown=${Q=>it(Q,ft,pt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ft}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${pt}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function On(v){let Q=typeof v.notes=="string"?v.notes:"";return Q.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${Q}</div>
    `}function qn(v){let Q=Array.isArray(v.labels)?v.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${Q.map(N=>c`<span class="detail-label-chip"
              >${N}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${N}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+N}
                @click=${()=>y(N)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${ne}
            @input=${C}
            @keydown=${f}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${P}
          >
            추가
          </button>
        </span>
      </div>
    `}function Zn(){if(!u)return c``;let v=d||{},Q=String(v.id||u),N=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Ie=Ye(),tt=v.status||"open",nt=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",vt=v.description||"",Qe={...v,metadata:{...v.metadata||{},...p}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Lt}
            >
              ${Q}
            </button>
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>r()}
            >
              ✕
            </button>
          </div>
          ${Nn(N,Ie)}
          ${$d(Qe,{onApplyRec:ye})}
          ${wd({metadata:Qe.metadata,workspace_values:qe(),catalog:st(),execution_defaults:We(),expanded:R,presets:kt()?.presets||[],preset_id:g,preset_busy:_,skipped_orchestration_keys:$},{onToggle:gt=>{R=gt,ke()},onEdit:(gt,Te)=>{if(gt==="impl_runtime"||gt==="impl_model"||gt==="impl_effort"){Vt(dn(gt,Te??""));return}Vt(St(gt,Te??""))},onPresetSelect:gt=>{g=gt,$=[],ke()},onPresetApply:()=>{Je()}})}
          ${Cd({md:Qe.metadata,catalog:G,workspace_defaults:ie,handlers:{onExecChange:(gt,Te)=>Vt(St(gt,Te))}})}
          ${Xn(tt,nt)} ${Qt(v)}
          ${Tr(vt)}
          ${bd(q,se,{expanded:xe,draft:J,sending:Ce,error:E})}
          ${On(v)} ${qn(v)} ${Nt(v)}
          ${en(v)} ${Rn(v)}
          ${md(v,V)}
          ${Md({expanded:Ge,loading:ze,error:te,data:z},{onToggle:jt})}
          ${Id(ht(),Ve,{total:Ie,expanded:L},De)}
        </div>
      </div>
    `}function ke(){at(Zn(),e)}return{load(v){v!==u&&(p={},g="",$=[],R=!1,H(),me(),U(),At(),Z()),u=v,d=null,!Tt&&t.subscribeCandidates&&(Tt=t.subscribeCandidates(()=>{u&&ke()})),Gt(),ct(),ee!==v&&ce(v)},clear(){u=null,d=null,p={},g="",_=!1,$=[],R=!1,H(),me(),U(),At(),Z(),Ht(),_e.close(),Ze.close(),at(c``,e)},destroy(){rt&&(rt(),rt=null),Bt&&(Bt(),Bt=null),Mt&&(Mt(),Mt=null),Ht(),document.removeEventListener("keydown",nn),ae||(_e.destroy(),Ee&&Ee.parentNode&&Ee.parentNode.removeChild(Ee)),Ze.destroy(),Le.parentNode&&Le.parentNode.removeChild(Le),u=null,d=null,Z(),g="",_=!1,$=[],me(),U(),At(),at(c``,e)}}}function Dd(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,p="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let g=typeof p=="string"?p.trim():"";if(o&&(g.length>0?(o.textContent=g,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var pb="(max-width: 640px)";function mi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(pb),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function fb(){return{lanes:{done:!0},areas:{}}}function Go(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function _b(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Go(r.lanes),areas:Go(r.areas)}:{lanes:Go(r),areas:{}}}catch{return null}}function Nd(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function gi(e,t=fb()){let n={lanes:Go(t.lanes),areas:Go(t.areas)},r=_b(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},Nd(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},Nd(e,o),i}}}function Qa(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function hi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function bi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:p,candidate_drop:g}=e,_=[],$=null,R=!1,j=null,G=null,ie=null;function ee(){j!==null&&clearTimeout(j),j=setTimeout(()=>{j=null,R=!1},0)}function F(){return s()??null}function M(){let B=new Map,ue=o();for(let se of Array.isArray(ue)?ue:[]){if(!se||typeof se!="object")continue;let ae=se.bead_blocked_by&&typeof se.bead_blocked_by=="object"?se.bead_blocked_by:{};for(let[Ee,_e]of Object.entries(ae))Array.isArray(_e)&&B.set(Ee,hi(_e));for(let Ee of[...Array.isArray(se.runnable)?se.runnable:[],...Array.isArray(se.session_active)?se.session_active:[]])Ee&&typeof Ee.bead_id=="string"&&Array.isArray(Ee.blocked_by)&&Ee.blocked_by.length>0&&B.set(Ee.bead_id,hi(Ee.blocked_by))}return B}function I(){let B=new Map,ue=new Map,se=o();for(let ae of Array.isArray(se)?se:[]){if(!ae||typeof ae!="object")continue;let Ee=ae.bead_blocked_by&&typeof ae.bead_blocked_by=="object"?ae.bead_blocked_by:{};for(let[_e,Le]of Object.entries(Ee))Array.isArray(Le)&&B.set(_e,hi(Le));for(let _e of Array.isArray(ae.runnable)?ae.runnable:[])_e&&typeof _e.bead_id=="string"&&Array.isArray(_e.blocked_by)&&ue.set(_e.bead_id,hi(_e.blocked_by))}for(let ae of _)for(let Ee of[B,ue]){let _e=Ee.get(ae.a);_e!==void 0&&Ee.set(ae.a,ae.type==="dep-remove"?_e.filter(Le=>Le!==ae.b):_e.includes(ae.b)?_e:[..._e,ae.b])}return{snapshot:B,runnable:ue}}function W(){let B=M();for(let ue of _){let se=(B.get(ue.a)||[]).slice();ue.type==="dep-remove"?B.set(ue.a,se.filter(ae=>ae!==ue.b)):se.includes(ue.b)||B.set(ue.a,[...se,ue.b])}return B}function K(B=r(),ue=F()){let se=new Map;for(let ze of Array.isArray(ue?.lanes)?ue.lanes:[]){let te=new Map;for(let z of Array.isArray(ze?.entries)?ze.entries:[])z&&typeof z.bead_id=="string"&&te.set(z.bead_id,z.dep_created_by_lane===!0);se.set(typeof ze?.id=="string"?ze.id:"",te)}let ae=new Map,Ee=new Map,_e=new Set,Le=new Set;for(let ze of B.chain_lanes){let te=se.get(ze.lane_id);ae.set(ze.lane_id,{status:ze.status,entries:ze.rows.map((z,Ae)=>({bead_id:z.id,root_dir:z.root_dir,...Ae===0?{}:{dep_created_by_lane:te?.get(z.id)===!0}}))});for(let z of ze.rows)Ee.set(z.id,ze.lane_id),z.fixed&&_e.add(z.id),z.unplaced||Le.add(z.id)}let Ze=new Map;for(let ze of B.parallel_rows)typeof ze.queue_index=="number"&&Ze.set(ze.id,ze.queue_index);for(let ze of B.queue_groups)for(let te of ze.sublanes.serial)for(let z of te.items)typeof z.queue_index=="number"&&Ze.set(z.id,z.queue_index);let Ge=I();return{blocked_by_map:W(),snapshot_blocked_by:Ge.snapshot,runnable_blocked_by:Ge.runnable,owner_of:new Map(Object.entries(B.owner_of)),cross_lanes:ae,owner_lane_of:Ee,fixed_members:_e,placed_members:Le,parallel_rows:B.parallel_rows.map(ze=>({bead_id:ze.id,root_dir:ze.root_dir,queue_index:ze.queue_index??0})),parallel_raw_length:new Map(Object.entries(B.parallel_raw_length)),queue_index_of:Ze}}function ne(B,ue){let se=r();for(let Ee of[...se.runnable,...se.queue,...se.running,...se.pr_wait,...se.done])if(!(Ee.non_occupying||Ee.id!==ue)){if(Ee.root_dir===B)return Ee.expected_revision;break}let ae=se.queue_groups.find(Ee=>Ee.root_dir===B);return ae?ae.revision:0}async function D(B,ue,se,ae){if(!t)return null;let _e=await t(B,{...ue,...se?{root_dir:se}:{},expected_revision:ae});if(_e&&_e.conflict){_e.queue&&d?.(se,_e.queue);let Le=_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:ae;_e=await t(B,{...ue,...se?{root_dir:se}:{},expected_revision:Le})}return _e&&_e.queue&&d?.(se,_e.queue),_e}async function Y(B,ue,se,ae,Ee){try{let _e=await D(B,ue,se,ae.get(se)??ne(se,Ee.bead_id));return!_e||typeof _e.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(_e.queue&&typeof _e.queue.revision=="number"&&ae.set(se,_e.queue.revision),_e.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):_e.applied===!1?(a(_e.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${_e.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:ae.get(se)??0)}catch(_e){return a(Qa(_e),"error"),null}}async function H(B,ue,se=new Map){if(B.type==="worker-queue-disarm"){try{let ae=await D(B.type,B.payload,B.root_dir,se.get(B.root_dir)??ne(B.root_dir,ue));ae&&ae.queue&&typeof ae.queue.revision=="number"&&se.set(B.root_dir,ae.queue.revision)}catch{}return!0}if(B.type==="worker-queue-place"||B.type==="worker-queue-reorder"||B.type==="worker-queue-remove")return await Y(B.type,B.payload,B.root_dir,se,{bead_id:ue})!==null;try{return(B.type==="dep-add"||B.type==="dep-remove")&&t&&await t(B.type,{a:B.a,b:B.b,...B.root_dir?{root_dir:B.root_dir}:{}}),!0}catch(ae){return a(Qa(ae),"error"),!1}}function Z(B){(B.type==="dep-add"||B.type==="dep-remove")&&(_=[..._,{type:B.type,a:B.a,b:B.b}])}async function Oe(B,ue){if(!t)return{ok:!1};try{let se=await t(B.type,{...B.payload,expected_revision:ue});return!se||typeof se.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:se.revision}}catch(se){let ae=se,Ee=ae&&ae.code==="conflict"?ae.details?.cross_lanes:null;return Ee&&typeof Ee.revision=="number"&&Array.isArray(Ee.lanes)?{ok:!1,conflict:Ee}:(a(Qa(se),"error"),{ok:!1})}}async function we(B,ue,se){let ae=new Map,Ee=[],_e=B.ops.slice(0,B.lane_op_index),Le=B.ops.slice(B.lane_op_index);for(let Ge of _e){if(!await H(Ge,se,ae))return{done:!0};Z(Ge)}let Ze=ue;for(let Ge of B.lane_ops){if(Ze===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let ze=await Oe(Ge,Ze);if(!ze.ok)return ze.conflict?{done:!1,conflict:ze.conflict}:{done:!0};Ze=ze.revision}for(let Ge of Le){if(!await H(Ge,se,ae))return{done:!0};Z(Ge),Ge.type==="dep-add"&&Ee.push(Ge)}for(let Ge of Cu(Ee))Ze=await ce(Ge,Ze);return{done:!0}}async function ce(B,ue){if(ue===null||!t)return ue;let se=B.pairs,ae=ue;for(let Ee=0;Ee<2;Ee+=1){if(se.length===0)return ae;try{let _e=await t("monitor-lane-provenance",{lane_id:B.lane_id,pairs:se.map(Le=>({bead_id:Le.bead_id,after:Le.after,value:!0})),expected_revision:ae});return _e&&typeof _e.revision=="number"?_e.revision:ae}catch(_e){let Le=_e,Ze=Le&&Le.code==="conflict"?Le.details?.cross_lanes:null;if(!Ze||typeof Ze.revision!="number"||!Array.isArray(Ze.lanes))return ae;let Ge=Ze.lanes.find(ze=>ze&&ze.id===B.lane_id);se=Ru(Array.isArray(Ge?.entries)?Ge.entries:[],se),ae=Ze.revision}}return ae}async function q(B,ue,se=[]){_=se,l("",0);let ae=r(),Ee=F();for(let _e=0;;_e+=1){let Le=B(K(ae,Ee));if("refused"in Le){a(Le.refused,"error");break}let Ze=await we(Le,ae.cross_lanes_revision,ue);if(Ze.done){Le.correction&&l(Le.correction.lane_id,Le.correction.corrected);break}if(_e>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Ge=i(Ze.conflict);ae=Ge.lanes,Ee=Ge.raw_lanes}_=[],u()}async function $e(B,ue){await q(se=>Qs(B,ue,se),B.bead_id)}function Se(B,ue){let se=ue&&typeof ue.closest=="function"?ue.closest("[data-row-index]"):null;if(se&&B.contains(se)){let ae=Number(se.getAttribute("data-row-index"));return Number.isFinite(ae)?ae:0}return B.querySelectorAll("[data-row-index]").length}function E(B){let ue=typeof B?.closest=="function"?B.closest(".worker-pane--collapsed[data-lane]"):null;if(!ue)return null;let se=ue.getAttribute("data-lane");return se==="queue"?{zone:ue,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:se==="candidate"&&g===!0?{zone:ue,target:{kind:"candidate"}}:null}function J(B){let ue=B.target;if(!$)return null;let se=typeof ue?.closest=="function"?ue.closest("[data-drop]"):null;if(!se)return E(ue);let ae=se.getAttribute("data-drop");if(ae==="candidate")return{zone:se,target:{kind:"candidate"}};if(ae==="parallel")return{zone:se,target:{kind:"parallel",marker_index:Se(se,ue)}};if(ae==="chain")return{zone:se,target:{kind:"chain",lane_id:se.getAttribute("data-lane-id")||"",marker_index:Se(se,ue)}};if(ae==="repo-serial"){let Ee=se.getAttribute("data-root-dir")||"";if(Ee!==$.root_dir)return null;let _e=typeof ue?.closest=="function"?ue.closest("[data-queue-index]"):null,Le=_e&&se.contains(_e)?_e.getAttribute("data-queue-index"):se.getAttribute("data-lane-length"),Ze=Number(Le);return{zone:se,target:{kind:"repo-serial",root_dir:Ee,lane_id:se.getAttribute("data-lane-id")||"",index:Number.isFinite(Ze)?Ze:0}}}return null}function Ce(){for(let B of Array.from(n.querySelectorAll(".is-drop-over")))B.classList.remove("is-drop-over")}function fe(B){G=B.target instanceof Element?B.target:null}function xe(B){let ue=B.target,se=typeof ue?.closest=="function"?ue.closest('[draggable="true"][data-bead-id]'):null,ae=se?se.closest("[data-drag-kind]"):null;if(!ae)return;if(se&&G&&se.contains(G)&&typeof G.closest=="function"&&G.closest("input, button, a")){B.preventDefault();return}let Ee=ae.getAttribute("data-bead-id")||"",_e=ae.getAttribute("data-drag-kind")||"",Le=ae.getAttribute("data-root-dir")||"";if(!Ee||!_e)return;let Ze=ae.getAttribute("data-queue-index")||"",Ge=Number(Ze),ze=ae.getAttribute("data-lane-id")||"";$={kind:_e,bead_id:Ee,root_dir:Le,...Ze!==""&&Number.isFinite(Ge)?{queue_index:Ge}:{},...ze?{lane_id:ze}:{}},R=!0,p?.(),n.classList.add("is-dragging");try{B.dataTransfer?.setData("text/plain",Ee),B.dataTransfer&&(B.dataTransfer.effectAllowed="move")}catch{}}function me(B){let ue=J(B);ue&&(B.preventDefault(),B.dataTransfer&&(B.dataTransfer.dropEffect="move"),ue.zone.classList.add("is-drop-over"))}function Ue(B){let ue=B.target;typeof ue?.closest=="function"&&(ue.closest("[data-drop]")?.classList.remove("is-drop-over"),ue.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function dt(){$=null,Ce(),n.classList.remove("is-dragging"),ee()}function Pe(B){let ue=J(B),se=$;$=null,Ce(),n.classList.remove("is-dragging"),!(!ue||!se)&&(B.preventDefault(),$e(se,ue.target))}return{attach(B){ie||(ie=B,B.addEventListener("pointerdown",fe),B.addEventListener("dragstart",xe),B.addEventListener("dragover",me),B.addEventListener("dragleave",Ue),B.addEventListener("drop",Pe),B.addEventListener("dragend",dt))},detach(){j!==null&&(clearTimeout(j),j=null);let B=ie;ie=null,B&&(B.removeEventListener("pointerdown",fe),B.removeEventListener("dragstart",xe),B.removeEventListener("dragover",me),B.removeEventListener("dragleave",Ue),B.removeEventListener("drop",Pe),B.removeEventListener("dragend",dt))},isDragging(){return $!==null},consumeClickSuppression(){let B=R;return R=!1,B},applyDrop:$e,runPlanned:q,dropModel:K,sendOp:H,sendQueueCas:Y,rememberDep:Z}}function Fd(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Ts(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var mb=["parallel","serial","candidate"];function qd(e){return mb.includes(e.kind)?e.kind!=="candidate"||e.queue_placeable===!0:!1}function Ko(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Xa(e,t,n){let r=n.members_by_id.get(e),o=n.members_by_id.get(t);if(!r||!o)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let s=r.lane_id,i=o.lane_id;if(s!==null&&s===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let l=qd(r),a=qd(o);if(r.kind==="candidate"&&!l)return{kind:"disabled",title:`${e}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(o.kind==="candidate"&&!a)return{kind:"disabled",title:`${t}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(l&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(s!==null&&a&&i===null)return{kind:"ops",title:`${s} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:s,index:n.serial_raw_lengths[s]||0}]};if(l&&s===null&&a&&i===null){let u=gb(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!l&&!a?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:l?{kind:"note",text:`${Ko(o.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Ko(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function gb(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Za=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var jd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function vi(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function yi(e){for(let t of vi(e)){if(Object.hasOwn(jd,t))return jd[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Ud(e){return vi(e).length===0?null:yi(e)||"\uC2E4\uD328"}function Ar(e){let t=null;for(let n of vi(e))Object.hasOwn(Za,n)&&(t=Za[n]);return t}function ar(e){let t=yi(e),n=Ar(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Wd(e,t){let n=yi(e)??yi(t),r=Ar(t)??Ar(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var hb=new Set(["repo_operation_timeout_unresolved"]);function bb(e){for(let t of vi(e))if(hb.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function yb(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function zd(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||bb(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(yb(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${vr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Bd={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Hd(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Bd,t.blocked_reason)?Bd[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=ar(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=ar(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function vb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var Gd=200;function kb(e){return typeof e!="string"||e.length===0?"":e.length>Gd?`${e.slice(0,Gd)}\u2026`:e}function wb(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function $b(e,t){if(!e||e.open!==!0)return"";let n=Ar(e.cause)||ar(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${rn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(p=>typeof p=="string"&&p.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"";return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${n?c`<div>
            <dt>원인</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${r?c`<div>
            <dt>재시도 이력</dt>
            <dd>${r}</dd>
          </div>`:""}
      ${e.cause?c`<div>
            <dt>실패 코드</dt>
            <dd><code>${e.cause}</code></dd>
          </div>`:""}
      ${o?.reason?c`<div>
            <dt>가드/원인</dt>
            <dd>${o.reason}</dd>
          </div>`:""}
      ${o?.command?c`<div>
            <dt>명령</dt>
            <dd><code>${o.command}</code></dd>
          </div>`:""}
      ${i?c`<div>
            <dt>착지 단계</dt>
            <dd>${i}</dd>
          </div>`:""}
      ${l?c`<div>
            <dt>실패 시각</dt>
            <dd>${l}</dd>
          </div>`:""}
      ${a?c`<div>
            <dt>실행</dt>
            <dd>${a}</dd>
          </div>`:""}
      ${e.attempt_id?c`<div>
            <dt>attempt id</dt>
            <dd>
              <code>${e.attempt_id}</code>
              <button
                type="button"
                class="rtile__attempt-copy"
                data-attempt-id=${e.attempt_id}
                title="attempt id 복사"
                aria-label="attempt id 복사"
              >
                ⧉
              </button>
            </dd>
          </div>`:""}
      ${d?c`<div>
            <dt>비용</dt>
            <dd>${d}</dd>
          </div>`:""}
      <div>
        <dt>재개</dt>
        <dd>
          ${e.resume_eligible?"\uC774\uC5B4\uD558\uAE30 \uAC00\uB2A5":e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
        </dd>
      </div>
    </dl>
    ${e.attempt_id?c`<button
          type="button"
          class="rtile__session"
          title="실패 세션 열기"
          aria-label="실패 세션 열기"
        >
          ▤ 세션
        </button>`:""}
    ${e.landed?c`<p class="rtile__failure-landed">
          이미 base에 착지됨 — 이어하기로 배포·정리를 재개
        </p>`:""}
  </div>`}function xb(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Ab=new Set(["codex-runner"]);function Sb(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(_=>_&&!(typeof _.agent_type=="string"&&Ab.has(_.agent_type))),a=l.filter(_=>_&&_.state==="live"),u=l.filter(_=>_&&_.state!=="live"),d=r&&typeof r.last_event_at=="number"?rn(r.last_event_at,t):"",p=r?rn(r.updated_at,t):"",g=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:p?`\uAC31\uC2E0 ${p}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${rn(i,t)}</span
            >`:""}
      </div>`:g?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${g}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(_=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${_.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(_=>_.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var Eb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Tb(e){if(!e)return"";let t=Eb[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Cb(e,t,n){if(!e)return"";let r=kb(t?.summary);return c`${r?c`<p class="rtile__held-summary">${r}</p>`:""}
    <div class="rtile__foot">
      <button
        type="button"
        class="rtile__parked-retry"
        title="이 bead를 새 attempt로 다시 디스패치합니다 (같은 세션을 잇지 않습니다)"
        aria-label="재시도"
      >
        재시도
      </button>
      ${n}
    </div>`}function Ja(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(J=>J&&J.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=a&&e.failure||null,p=a||u,g=!!e.paused,_=i||p?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):g?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?vb(t-e.started_at):"\u2014",$=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,R=uo(e),j=Zt(e.usage),G=Un(e.usage),ie=e.conflict_resolution?g?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,ee=e.base_exception||null,F=e.landing,M=e.attempt_id&&e.attempt_id===n,I=r.monitor||null,W=xb(I),K=I?Ps(I.dependency_chips):"",ne=Sb(I,t,g,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),D=o&&e.workflow?.chips?.exec_receipt||null,Y=Ds(e.workflow),H=Ns(e.rec),Z=D?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${jn(D)}`}
        >${`${D.kind}:${_s(D)}`}</span
      >`:"",Oe=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${fo(s)}</span
      >`:"",we=W||Y||Oe||Z||H?c`<div class="rtile__meta">
          ${W}${Y}${Oe}${Z}${H}
        </div>`:"",ce=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Ud(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",q=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${wb(e.retry)}</span
        >`:"",$e=c`${ie?c`<span class="worker-mini__badge">${ie}</span>`:""}${ee?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${ee}</span
      >`:""}${ce}${q}`,Se=o?"":Yr(e),E=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"";return c`<div
    class="rtile${M?" rtile--sel":""}${g?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${p?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${qs(e.priority)}${R?c`<span class="rtile__resumed" title=${R}>↻</span>`:""}${$e}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${_}</span>`:""}${Tb(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${_}</span>`}
        ${o||p?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${E}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${g?c`<button
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
                ${E}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${p?Cb(a,d,E):i?"":c`${ne}${e.rollup?ps(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Bi}):""}
            ${F?c`<div class="rtile__landing">
                  <span
                    class="merge-step${F.failed?" merge-step--failed":""}"
                    style=${`--progress: ${F.percent}%`}
                    >${F.label}${F.index>0?c`<span class="merge-step__n"
                          >${F.index}/${F.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${K}
            ${o?we:W||Y||$||H||j.length>0||G?c`<div class="rtile__meta">
                    ${W}${Y}${Ms(e.exec_chips)}${H}
                    ${j.length>0?j.map(J=>c`<span
                              class="worker-usage"
                              title=${J.tooltip}
                              >${J.label}</span
                            >`):G?c`<span
                            class="worker-usage"
                            title=${_o(e.usage)}
                            >${G}</span
                          >`:""}
                  </div>`:""}
            ${Rs(e)} ${Se}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||g?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${$b(l,t)}
  </div>`}function Rb(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function Kd(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Ja(o,t,n,{monitor:Rb(o)}))}
  </div>`}var Jt="",Ob=["impl_runtime","impl_model","impl_effort"],Lb=["claude_account","codex_account"],Ib=5,ki=1;function _n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function wi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(L=>de(L,"error",4e3)),s={},i={},l=[],a=!1,u={state:"absent",values:{},warnings:[]},d={},p={},g=Promise.resolve(),_={claude:null,codex:null},$=!1,R=null,j={},G="",ie="",ee=!1,F=!1,M=!1,I=null,W=!1;function K(){let L=t.queue?t.queue():null;return _n(L)?L:null}function ne(){let L=K();return L?L.runner_catalog:null}function D(){let L=K();return L&&_n(L.execution_defaults)?L.execution_defaults:null}function Y(){let L=t.implPresetStore?.get();return _n(L)&&Array.isArray(L.presets)?L:null}function H(){return r===null?{}:{root_dir:r}}async function Z(L,re){return W||!n?null:await n(L,re)}function Oe(L){L&&_n(L.queue)&&t.onQueueAdopt?.(L.queue)}async function we(L,re){let ge=K();if(!ge||W)return null;let O=await Z(L,{...re,...H(),expected_revision:ge.revision});if(Oe(O),r!==null&&O&&O.conflict){let X=O.queue&&typeof O.queue.revision=="number"?O.queue.revision:K()?.revision??ge.revision;O=await Z(L,{...re,...H(),expected_revision:X}),Oe(O)}return O}async function ce(){a=!0,Ye();try{let L=await Z("get-session-defaults",{...H()});s=_n(L?.values)?{...L.values}:{},i={...s},l=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){l=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}finally{a=!1,Ye()}}async function q(){let L=Lc(s,i);if(Object.keys(L).length!==0){try{let re=await Z("set-session-defaults",{values:L,...H()});s=_n(re?.values)?{...re.values}:{},i={...s},l=Array.isArray(re?.warnings)?re.warnings:[]}catch(re){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}Ye()}}function $e(L,re){if(!_n(L))return;let ge=L.state;u={state:ge==="usable"||ge==="unusable"||ge==="absent"?ge:"absent",values:_n(L.values)?{...L.values}:{},warnings:Array.isArray(L.warnings)?L.warnings:[]},p={...u.values},re&&(d={...p})}async function Se(){try{$e(await Z("get-workspace-accounts",{...H()}),!0)}catch(L){u={state:"unusable",values:{},warnings:["kv_read_failed"]},p={},d={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}Ye()}async function E(L){try{let re=await fetch(L);if(!re.ok)return null;let ge=await re.json();if(!_n(ge)||!Array.isArray(ge.accounts))return null;let O=ge.accounts.filter(X=>_n(X)&&typeof X.key=="string"&&X.key.length>0&&typeof X.email=="string"&&X.email.length>0);return{accounts:O,active:O.find(X=>X.active===!0)||null}}catch{return null}}async function J(){$=!0;let[L,re]=await Promise.all([E("/api/claude-usage"),E("/api/codex-usage")]);W||(_={claude:L,codex:re},Ye())}function Ce(){let L={};for(let re of Lb){let ge=Object.hasOwn(d,re)?d[re]:null,O=Object.hasOwn(p,re)?p[re]:null;ge!==O&&(L[re]=ge)}return L}async function fe(){let L=Ce();if(Object.keys(L).length!==0){try{$e(await Z("set-workspace-accounts",{values:L,...H()}),!1)}catch(re){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}Ye()}}function xe(L,re){re===Jt?delete d[L]:d[L]=re,Ye(),g=g.then(()=>fe())}function me(L,re){if(Ob.includes(L)){Pe(L,re);return}re===Jt?delete i[L]:i[L]=re,Ye(),q()}function Ue(){let L=jt().orchestration_model,re=mn({global:{orchestration_model:L??void 0},execution_defaults:D(),runner_catalog:ne()}).orchestration_model.value;return re?wn(ne(),re):null}function dt(L,re){typeof re=="string"&&re.length>0?i[L]=re:delete i[L]}function Pe(L,re){let ge=re===Jt?void 0:re,O=Rc({impl_runtime:L==="impl_runtime"?ge:i.impl_runtime,impl_model:L==="impl_model"?ge:i.impl_model,impl_effort:L==="impl_effort"?ge:i.impl_effort},ne(),Ue());dt("impl_runtime",O.impl_runtime),dt("impl_model",O.impl_model),dt("impl_effort",O.impl_effort),Ye(),q()}async function B(){let L=K();if(!L)return;let re={orchestration_model:L.orchestration_model??null,orchestration_effort:L.orchestration_effort??null,orchestration_speed:L.orchestration_speed??null},ge=Ic(re,{...re,...j});if(Object.keys(ge).length!==0){try{let O=await we("worker-queue-set-orchestration-defaults",{values:ge});if(O&&O.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}j={}}catch(O){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}Ye()}}function ue(L,re){j[L]=re===Jt?null:re,Ye(),B()}function se(L){if(R=L,!L){Ye();return}let re=ne(),ge=jt(),O=ge.orchestration_model;O&&!bo(re,L).includes(O)&&(j.orchestration_model=null,O=null);let X=ge.orchestration_effort;X&&!Xi(re,L,O||hn).includes(X)&&(j.orchestration_effort=null),Ye(),B()}async function ae(L){if(!(!K()||L<ki)){try{await we("worker-queue-set-slots",{slots:L})}catch(re){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}Ye()}}async function Ee(L){if(!(!K()||L<ki||L>Ib)){try{await we("worker-queue-set-serial-lane-count",{count:L})}catch(re){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}Ye()}}async function _e(L,re){let ge=L==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await we(ge,{on:re})}catch(O){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}Ye()}function Le(){let L={},re=jt();for(let ge of zr){let O=Hn.includes(ge)?re[ge]:i[ge];typeof O=="string"&&O.length>0&&(L[ge]=O)}return L}async function Ze(){let L=Y();if(!L)return;let re=Le();if(Object.keys(re).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ge=(L.presets||[]).find(X=>X.id===G),O=ie.trim()||(ge?ge.name:"");if(!O){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let X=ge?await Z("impl-preset-update",{expected_revision:L.revision,id:ge.id,name:O,settings:re}):await Z("impl-preset-create",{expected_revision:L.revision,name:O,settings:re});if(X&&X.applied){if(ie="",!ge&&Array.isArray(X.presets)){let Ne=X.presets.find(Ve=>Ve.name===O);G=Ne?Ne.id:G}Ye()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ye()}catch(X){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}}async function Ge(){let L=Y();if(!(!L||G.length===0))try{let re=await Z("impl-preset-delete",{expected_revision:L.revision,id:G});re&&re.applied?(G="",Ye()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ye())}catch(re){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}}function ze(L){s=_n(L.values)?{...L.values}:{},i={...s},l=Array.isArray(L.warnings)?L.warnings:[],_n(L.queue)&&(t.onQueueAdopt?.(L.queue),j={})}async function te(){let L=Y(),re=K();if(!L||!re||G.length===0)return;let ge=O=>({preset_id:G,expected_revision:L.revision,expected_queue_revision:O,...H()});try{let O=await Z("apply-impl-preset-global",ge(re.revision));if(O&&O.applied&&ze(O),r!==null&&O&&O.queue_applied===!1){let X=O.queue&&typeof O.queue.revision=="number"?O.queue.revision:K()?.revision??re.revision;O=await Z("apply-impl-preset-global",ge(X)),O&&O.applied&&ze(O)}O&&O.applied?O.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):O&&O.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(O){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}Ye()}async function z(){F=!0,M=!1,Ye();try{let L=await Z("get-worker-system-prompt",{});!L||typeof L!="object"||Array.isArray(L)?M=!0:I=L}catch{M=!0}finally{F=!1,Ye()}}function Ae(){if(ee=!ee,ee&&!I){z();return}Ye()}function lt(){let L=Zr({loading:F,error:M});if(L)return L;if(!I)return"";let re=Array.isArray(I.variants)?I.variants:[];return c`<div class="settings-dialog__sp-body">
      ${I.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${I.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${re.map(ge=>c`<div class="settings-dialog__sp-variant" data-variant=${ge.key}>
            <div class="settings-dialog__sp-cond">${ge.condition}</div>
            ${Qn(ge.label,ge.system_prompt)}
          </div>`)}
    </div>`}function x(){return c`<section
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
        aria-expanded=${ee?"true":"false"}
        @click=${Ae}
      >
        ${ee?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${ee?lt():""}
    </section>`}function U(L,re,ge,O,X,Ne,Ve){let qe=X[L]??Jt,ct=Zi(L,ge,X,D(),ne(),Ve),st=ct.options.find(et=>et.value===qe),We=qe===Jt?ct.full_value:st?.full_value;return c`<select
        class=${qe===Jt?"settings-dialog__unset":""}
        data-key=${L}
        aria-label=${re}
        title=${We||""}
        ?disabled=${Ne===!0||ct.disabled}
        .value=${xr(String(qe))}
        @change=${et=>O(L,String(et.target.value))}
      >
        <option value=${Jt} ?selected=${qe===Jt}>
          ${ct.unset_label}
        </option>
        ${ct.options.map(et=>c`<option
              value=${et.value}
              title=${et.full_value||""}
              ?selected=${et.value===qe}
            >
              ${et.label}
            </option>`)}
      </select>
      ${qe===Jt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function he(L,re,ge,O,X,Ne=!1,Ve){return c`<div
      class=${`settings-dialog__row${Ne?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${re}</span>
      <span class="settings-dialog__controls">
        ${U(L,re,ge,O,X,Ne,Ve)}
      </span>
    </div>`}function De(L,re){let ge=re?re.active:null;return _n(ge)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${L==="claude"?ge.email:eo({...ge,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Fe(L,re,ge){let O=_[ge],X=Object.hasOwn(d,L)?d[L]:Jt,Ne=ge==="claude"?pi:eo,Ve=!!O?.accounts.some(qe=>qe.key===X);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${re}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${re}
          data-account-key=${L}
          @change=${qe=>xe(L,String(qe.target.value))}
        >
          <option value=${Jt} ?selected=${X.length===0}>
            ${De(ge,O)}
          </option>
          ${X.length>0&&!Ve?c`<option value=${X} selected>
                ${X} (목록에 없음)
              </option>`:""}
          ${O?.accounts.map(qe=>c`<option value=${qe.key} ?selected=${qe.key===X}>
                ${Ne(qe)}
              </option>`)||""}
        </select>
        ${O?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Be(){let L=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${L} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${L}`:null}function ut(L,re,ge,O,X){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${re}-on)`}
        ></i>
        ${L}
      </span>
      <span class="settings-dialog__controls">
        ${U(ge,`${L} \uBAA8\uB378`,O,me,i,!1)}
        ${U(X,`${L} effort`,$s,me,i,!1)}
      </span>
    </div>`}function At(L,re,ge,O){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${re}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${O?" is-on":""}`}
          data-automation=${L}
          aria-pressed=${O?"true":"false"}
          aria-label=${re}
          @click=${()=>_e(L,!O)}
        >
          ${O?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ge}</span>
      </span>
    </div>`}function Dt(L,re,ge,O){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${re}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${L}>
          <button
            type="button"
            aria-label=${`${re} \uAC10\uC18C`}
            @click=${()=>O(ge-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ge}</span>
          <button
            type="button"
            aria-label=${`${re} \uC99D\uAC00`}
            @click=${()=>O(ge+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Wt(L){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${L.rows.length>0?`\uBCC0\uACBD ${L.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${L.rows.map(re=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${re.kind}
          >
            <span class="settings-dialog__preset-diff-label">${re.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${re.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${re.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${L.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${L.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function jt(){let L=K(),re={};for(let ge of Hn)re[ge]=Object.prototype.hasOwnProperty.call(j,ge)?j[ge]:L&&typeof L[ge]=="string"?L[ge]:null;return re}function ht(){let L=ne(),re=i.impl_runtime,ge=i.impl_model,O=Y(),X=K(),Ne=jt(),Ve=bo(L,R),qe=Hr(L,void 0).filter(rt=>rt!==hn),ct=Xi(L,R,Ne.orchestration_model||hn).filter(rt=>rt!==hn),st=G?(O?.presets||[]).find(rt=>rt.id===G):null,We=st?Oc(Le(),_n(st.settings)?st.settings:{}):null,et=X&&typeof X.slots=="number"?X.slots:ki+1,kt=X&&typeof X.serial_lane_count=="number"?X.serial_lane_count:ki,Ke=D()?.supported===!0,Ot=Be(),Je=Zi("workflow_mode",go,i,D(),L);return c`
      ${l.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${Ot?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Ot}
          </div>`:""}
      ${Ke?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${a?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${xr(G)}
                @change=${rt=>{G=String(rt.target.value),Ye()}}
              >
                <option value="" ?selected=${G===""}>
                  실행 프리셋…
                </option>
                ${(O?.presets||[]).map(rt=>c`<option
                      value=${rt.id}
                      ?selected=${rt.id===G}
                    >
                      ${rt.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!We||We.rows.length===0}
                @click=${te}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${G?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${xr(ie)}
                @input=${rt=>{ie=String(rt.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${G?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Ze}
              >
                ${G?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${G.length===0}
                @click=${Ge}
              >
                삭제
              </button>
            </div>
            ${We?Wt(We):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${xr(R||Jt)}
                    @change=${rt=>{let Bt=String(rt.target.value);se(Bt===Jt?null:Bt)}}
                  >
                    <option value=${Jt} ?selected=${!R}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${R==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${R==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${he("orchestration_model","\uBAA8\uB378",Ve,ue,Ne)}
              ${he("orchestration_effort","effort",ct,ue,Ne)}
              ${he("orchestration_speed","\uC18D\uB3C4",mo,ue,Ne)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Fe("claude_account","Claude","claude")}
              ${Fe("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Jt}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>me("workflow_mode",Jt)}
                    >
                      ${Je.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${go.map(rt=>c`<button
                          type="button"
                          data-mode=${rt}
                          aria-pressed=${String(i.workflow_mode===rt)}
                          @click=${()=>me("workflow_mode",rt)}
                        >
                          ${rt}
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
              ${ut("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ho,"spec_review_effort")}
              ${ut("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",ws,"plan_review_effort")}
              ${ut("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ho,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${he("impl_runtime","\uC704\uC784 \uB300\uC0C1",ks,me,i)}
              ${he("impl_model","\uBAA8\uB378",Hr(L,re),me,i)}
              ${he("impl_effort","effort",Gr(L,re,ge),me,i)}
              ${he("impl_speed","\uC18D\uB3C4",mo,me,i)}
              ${he("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",qe,me,i,!1,{...i,...Ne})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${At("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",X?.auto_advance===!0)}
              ${At("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",X?.auto_merge===!0)}
              ${Dt("slots","\uB3D9\uC2DC \uC2E4\uD589",et,rt=>ae(rt))}
              ${Dt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",kt,rt=>Ee(rt))}
            </div>
            ${x()}
          `}
    `}function Ye(){W||at(ht(),e)}return{load(){j={};let L=[ce(),Se()];return $||L.push(J()),Promise.all(L).then(()=>{})},render:Ye,sessionDraft:()=>({...i}),destroy(){W=!0,at(c``,e)}}}function $i(e){return c`<svg
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
  </svg>`}function Yd(){return $i(io`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Vd(){return $i(io`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Qd(){return $i(io`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Xd(){return $i(io`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Zd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Jd(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Zt(ys(t));let n={};for(let l of Mn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Mn){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Un(n):null}function Tn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function el(e,t){let n=Tn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Mb(e,t){if(!Tn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Pb(e){if(!Tn(e)||!Tn(e.execution_defaults)||!Tn(e.runner_catalog)||!Tn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=mn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=wn(e.runner_catalog,n.orchestration_model.value??""),o=Kr(n,e.runner_catalog),s=yr(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function ep(e,t){let n=t.notify||(E=>de(E,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,p=null,g=new Map;function _(){let E=t.workspacesState?t.workspacesState():[];return Array.isArray(E)?E.filter(J=>Tn(J)):[]}function $(E){return _().find(J=>J.root_dir===E)||null}function R(E){return Mb($(E),g.get(E))}function j(){for(let E of _()){let J=g.get(E.root_dir);J&&typeof J.revision=="number"&&typeof E.revision=="number"&&E.revision>=J.revision&&g.delete(E.root_dir)}}async function G(E,J,Ce){let fe=t.transport,xe=R(J);if(!(!fe||!Tn(xe))){try{let me=await fe(E,{...Ce,root_dir:J,expected_revision:xe.revision});if(Tn(me?.queue)&&g.set(J,me.queue),me&&me.conflict){let Ue=Tn(me.queue)&&typeof me.queue.revision=="number"?me.queue.revision:R(J)?.revision;me=await fe(E,{...Ce,root_dir:J,expected_revision:Ue}),Tn(me?.queue)&&g.set(J,me.queue)}}catch(me){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${me instanceof Error?me.message:String(me)}`)}q()}}function ie(E){u!==E&&(u=E,t.onFocusChange?.(u),q())}function ee(E){ie(u===E?null:E)}function F(E){if(d===E){I();return}M(),d=E;let J=$(E);i.textContent=`${J?.name||E} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=wi(a,{root_dir:E,queue:()=>R(E),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Ce=>{g.set(E,Ce),q()}}),p.load(),q()}function M(){p?.destroy(),p=null}function I(E){M(),d=null,o.hidden=!0,i.textContent="",E!==!0&&q()}let W=()=>I();l.addEventListener("click",W);function K(E){E.key==="Escape"&&u!==null&&ie(null)}document.addEventListener("keydown",K);function ne(E,J){let Ce=Math.max(J,E,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${J}\uAC1C \uC911 ${E}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Ce},(fe,xe)=>xe<E?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function D(E){let J=E.auto_advance===!0,Ce=E.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${J?" is-on":""}`}
        data-act="auto"
        aria-pressed=${J?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9\uD654`}
        title=${J?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${J?Vd():Yd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Ce?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Ce?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Ce?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Qd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===E.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===E.root_dir?"true":"false"}
        aria-label=${`${E.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Xd()}
      </button>`}function Y(E){let J=Pb(E);return J?c`<div class="mon2-deck__chips">
      ${J.orchestration?c`<span class="mon2-deck__chip" title=${J.orchestration.title}
            >오케 ${J.orchestration.text}</span
          >`:""}
      ${J.worker?c`<span class="mon2-deck__chip" title=${J.worker.title}
            >워커 ${J.worker.text}</span
          >`:""}
    </div>`:""}function H(E){let J=[];for(let[Ce,fe]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let xe=el(E,Ce);xe>0&&J.push(`${fe} ${xe}`)}return J.join(" \xB7 ")}function Z(E){let J=el(E,"running"),Ce=typeof E.slots=="number"?E.slots:1;return c`<div
      class=${`mon2-deck__tile${u===E.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${E.root_dir}
      aria-pressed=${u===E.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${E.root_dir}>${E.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Ce}\uAC1C \uC911 ${J}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${J}/${Ce}</span>
          ${ne(J,Ce)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${E.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${D(E)}</div>
        <span class="mon2-deck__counts">${H(E)}</span>
        ${Y(E)}
      </div>
    </div>`}function Oe(E){let J=t.doneItems?t.doneItems():[],Ce=t.rangeLabel?t.rangeLabel():"",fe=Jd(Array.isArray(J)?J:[]),xe=me=>E.reduce((Ue,dt)=>Ue+el(dt,me),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${E.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Ce}`}
        >실행 ${xe("running")} · 대기 ${xe("queue")} · PR
        ${xe("pr_wait")}${xe("session_active")>0?` \xB7 \uC138\uC158 ${xe("session_active")}`:""}
        · ${Ce} 완료
        ${Array.isArray(J)?J.length:0}</span
      >
      ${fe===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof fe=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Zd(Ce)}
                  >${fe}</span
                >`:fe.map(me=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${me.provider}
                      title=${me.tooltip}
                      >${me.label}</span
                    >`)}
          </span>`}
    </div>`}function we(){let E=_();return E.length===0?"":c`${Oe(E)}
      <div class="mon2-deck__strip">
        ${E.map(J=>Z(J))}
      </div>`}function ce(){u!==null&&!$(u)&&(u=null,t.onFocusChange?.(null))}function q(){j(),ce(),d!==null&&!$(d)&&I(!0),at(we(),r),p?.render()}function $e(E){let J=E.target;if(!J||typeof J.closest!="function")return;let Ce=J.closest("[data-root-dir]");if(!Ce)return;let fe=Ce.getAttribute("data-root-dir")||"",xe=J.closest("[data-act]")?.getAttribute("data-act");if(xe==="worker"){t.gotoWorkerTab?.(fe);return}if(xe==="auto"){G("worker-automation-toggle",fe,{on:R(fe)?.auto_advance!==!0});return}if(xe==="merge"){G("worker-merge-auto-toggle",fe,{on:R(fe)?.auto_merge!==!0});return}if(xe==="gear"){F(fe);return}ee(fe)}function Se(E){if(E.key!=="Enter"&&E.key!==" ")return;let J=E.target;if(!J||typeof J.closest!="function")return;let Ce=J.closest('[data-root-dir][role="button"]');!Ce||Ce!==J||(E.preventDefault(),ee(Ce.getAttribute("data-root-dir")||""))}return r.addEventListener("click",$e),r.addEventListener("keydown",Se),{render:q,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",K),r.removeEventListener("click",$e),r.removeEventListener("keydown",Se),l.removeEventListener("click",W),M(),at(c``,r),e.replaceChildren()}}}var tp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Db=1e4;function np(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function rp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var ap="bdui.monitor.done-range",lp="bdui.monitor.running_sort",cp="bdui.monitor.candidate_sort",up="beads-ui.monitor.candidate-filter",dp="beads-ui.monitor.sections";function Nb(){try{let e=window.localStorage.getItem(up);if(!e)return{...Vr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Vr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Vr.show_blocked,spec:fa.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Vr}}}function op(e){try{window.localStorage.setItem(up,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function qb(){try{let e=window.localStorage.getItem(cp);return So.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Fb(e){try{window.localStorage.setItem(cp,e)}catch{}}function jb(){try{let e=window.localStorage.getItem(dp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Bb(e){try{window.localStorage.setItem(dp,JSON.stringify(e))}catch{}}function Ub(){try{let e=window.localStorage.getItem(ap);return e===null?"today":Ln(e)}catch{return"today"}}function Wb(e){try{window.localStorage.setItem(ap,e)}catch{}}function zb(){try{return window.localStorage.getItem(lp)==="repo"?"repo":"started"}catch{return"started"}}function Hb(e){try{window.localStorage.setItem(lp,e)}catch{}}var pp="tab:monitor:pipeline",Gb=1e3,sp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Kb=["queue","runnable","done"],ip="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Yb(e){return e>=1&&e<=ip.length?ip[e-1]:`(${e})`}function fp(e,t){let n=Pt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(m=>typeof globalThis.confirm!="function"||globalThis.confirm(m)),g=Ub(),_=zb(),$=Nb(),R=qb(),j=jb(),G=gi("beads-ui.monitor.lane-collapsed"),ie=!1,ee=null,F=null,M=null,I=null,W=null,K=null,ne=null,D=null,Y=null;function H(m){return Y===null&&(Y=B()),vu(m,Y)}function Z(m,b){Oe(),!(b<=0)&&(ne={lane_id:m,corrected:b},D=setTimeout(()=>{D=null,ne=null,Je()},Db))}function Oe(){D!==null&&(clearTimeout(D),D=null),ne=null}function we(){let m=Rr.find(b=>b.value===g);return m?m.label:""}let ce=document.createElement("div");ce.className="mon",e.appendChild(ce);let q=document.createElement("div");q.className="worker-drawer-overlay",q.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let Se=document.createElement("div");Se.className="worker-drawer-host mon2-drawer",q.append($e,Se),e.appendChild(q);let E=sr(null,null),J=new Map,Ce=new Map,fe=null,xe=null,me=null,Ue=Jr(Se,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{F=null,q.hidden=!0,Je()}}),dt=bi({transport:s,console_el:ce,getLanes:()=>E,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:bn,reproject:m=>({lanes:Ot(m),raw_lanes:m}),onCorrection:Z,showToast:de,requestRender:()=>Je(),adoptQueue:(m,b)=>{Ce.set(m,b)},onDragBegin:()=>{M=null},candidate_drop:!0}),{applyDrop:Pe,dropModel:B,runPlanned:ue,sendQueueCas:se}=dt;async function ae(m,b,C,P,f=!0){if(!s||!C)return null;let y=await s(m,{...b,root_dir:C,expected_revision:P});if(y&&y.conflict&&f){y.queue&&Ce.set(C,y.queue);let V=y.queue&&typeof y.queue.revision=="number"?y.queue.revision:P;y=await s(m,{...b,root_dir:C,expected_revision:V})}return y&&y.queue&&C&&Ce.set(C,y.queue),y}function Ee(m,b){let C=Ce.get(m),P=o&&o.get?o.get():null,f=(Array.isArray(P)?P:[]).find(V=>V?.root_dir===m);return(C||f)?.merge_queue?.find(V=>V.bead_id===b)?.continuation_action}async function _e(m,b,C,P){let f=await ae(m,b,C,P),y=Ce.get(C)?.revision??f?.queue?.revision??P;return Bn(f,(V,le)=>ae(m,{...b,continuation:V,decision_token:le},C,y,!1),{refresh:V=>ae(m,b,C,V?.queue?.revision??Ce.get(C)?.revision??y,!1)})}async function Le(m,b,C,P){let f=await Bn({continuation_mismatch:P},(V,le)=>ae("worker-merge-queue-add",{bead_id:b,continuation:V,decision_token:le},m,C,!1)),y=f?.queue?.merge_queue?.find(V=>V.bead_id===b)?.continuation_action;f?.applied!==!0&&y?.continuation===null&&y.mismatch&&await Le(m,b,f.queue.revision,y.mismatch)}async function Ze(m,b,C){let P=await ae("worker-discard",m,b,C);if(P&&P.discarded===!0){de(Is(P),"success",5e3);return}if(P&&P.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${P.reason}`,"error");return}if(P&&P.accepted&&P.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(P&&P.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${P.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}P&&!P.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ge(m,b,C){return!s||!C?null:await s(m,{...b,root_dir:C})}async function ze(){let m=new Map;for(let b of E.pr_wait)m.has(b.root_dir)||m.set(b.root_dir,b.expected_revision);for(let[b,C]of m)await ae("worker-merge-queue-add-all",{},b,C)}function te(m){let b=j[m];return!!(b&&b.runnable===!0)}function z(m){let b={...j[m]||{}};b.runnable=!b.runnable,j={...j,[m]:b},Bb(j),Je()}function Ae(m){G.toggle(m),Je()}function lt(m){G.toggleArea(m),Je()}function x(m){let b=E.queue_groups.find(C=>C.root_dir===m);if(!b)return null;for(let C=0;C<b.serial_lane_count;C+=1){let P=`s${C+1}`,f=b.sublanes.serial.find(y=>y.id===P);if(!f||f.raw_length===0&&f.occupied_by.length===0)return P}return null}function U(m,b){let C=E.queue_groups.find(f=>f.root_dir===m),P=C?C.sublanes.serial.find(f=>f.id===b):void 0;return P?P.raw_length:0}function he(m,b){let C=J.get(m),P=J.get(b);if(!C||!P)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let f=np(C),y=np(P);if(f!==null&&f===y&&C.root_dir===P.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let V=rp(C),le=rp(P);if(V&&y!==null){let Re=y;return{kind:"ops",title:`${Re} \uB05D\uC5D0 ${m}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:P.root_dir,ops:[{bead_id:m,lane:Re,index:U(P.root_dir,Re)}]}}if(f!==null&&le&&y===null){let Re=f;return{kind:"ops",title:`${Re} \uB05D\uC5D0 ${b}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:C.root_dir,ops:[{bead_id:b,lane:Re,index:U(C.root_dir,Re)}]}}if(V&&f===null&&le&&y===null){let Re=x(C.root_dir);return Re===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Re} \uB808\uC778\uC5D0 ${b} \u2192 ${m} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:C.root_dir,ops:[{bead_id:b,lane:Re,index:0},{bead_id:m,lane:Re,index:1}]}}return!V&&!le?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:V?{kind:"note",text:`${Ko(P.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Ko(C.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function De(m,b){let C=he(m,b.id);return{id:b.id,title:b.title,location_label:b.location_label,prefixes:b.prefixes,action:C.kind==="note"?{kind:"note",text:C.text}:C.kind==="disabled"?{kind:"disabled",label:tp,title:C.title}:{kind:"place",label:tp,title:C.title}}}function Fe(m,b){if(!I||I.bead_id!==m)return null;let C=I.counterpart_id,P=b.filter(f=>f.id===C);return P.length===0?null:{rows:P.map(f=>De(m,f))}}function Be(m){let b=m.dependency_chips||null,C=m.overlap_chips||[],P=m.scope_state==="missing",f=m.cross_lane_chip,y=m.armed_lane_chip;if(!b&&C.length===0&&!P&&!f&&!y)return null;let V=Fe(m.id,C);return{...b||{},...C.length>0?{overlaps:C}:{},...P?{scope_missing:!0}:{},...f?{cross_lane:{lane_id:f.lane_id,label:f.label}}:{},...y?{armed_lane:y}:{},...V?{popover:V}:{}}}function ut(m){let b=Be(m);return b?{...m,dependency_chips:b}:m}async function At(m,b){let C=he(m,b);if(I=null,C.kind!=="ops"){Je();return}let P=Xt(C.root_dir,C.ops[0].bead_id);for(let f of C.ops){let y=await Dt(f,C.root_dir,P);if(y===null)break;P=y}Je()}async function Dt(m,b,C){try{let P=await ae("worker-queue-place",m,b,C,!1);if(P&&P.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!P||P.applied!==!0)return de(P&&typeof P.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${P.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let f=P.queue?P.queue.revision:void 0;return typeof f!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):f}catch(P){return de(Kt(P),"error"),null}}function Wt(m){let b=te(m.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${m.root_dir}
        data-section="runnable"
        aria-expanded=${b?"false":"true"}
        aria-label=${`${m.name} \uC139\uC158 ${b?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${b?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${m.root_dir}>${m.name}</span>
      <span class="mon2-sec__count">${m.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${m.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function jt(m,b){return c`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="candidate"
      data-root-dir=${m.root_dir}
    >
      ${b}
    </div>`}function ht(m){if(M!==m.id)return null;let b=E.queue_groups.find(y=>y.root_dir===m.root_dir),C=m.place_lanes||[],P=E.cross_lanes_revision!==null,f=[{id:"parallel",label:"\uBCD1\uB82C",count:m.place_index??0}];for(let y of E.chain_lanes)f.push({id:`lane:${y.lane_id}`,label:`\uC5F0\uACB0 ${y.number} (${y.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:y.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!P});f.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!P,title:P?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let y of C)f.push({id:`serial:${y.id}`,label:`\uC9C1\uB82C ${Number(y.id.slice(1))}`,count:y.length,group:`${b?b.name:""} \uC9C1\uB82C`});return{bead_id:m.id,lanes:f}}function Ye(m){return jt(m,c`${aa(ut(m),ht(m),{exec_chips_mode:"pinned_only",onOpenDoc:l?(b,C)=>l(C,m.root_dir):void 0})}`)}function L(){return E.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${E.runnable.map(m=>Ye(m))}
      </div>`:c`${E.runnable_sections.map(m=>{let b=te(m.root_dir);return c`<section
        class="mon2-sec${b?" is-collapsed":""}"
        data-root-dir=${m.root_dir}
        data-section="runnable"
      >
        ${Wt({root_dir:m.root_dir,name:m.name,count:m.items.length})}
        ${b?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${m.items.map(C=>Ye(C))}
            </div>`}
      </section>`})}`}function re(m,b=!1){return c`<span class="worker-mini__rowops">
      ${b?c`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${m.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${m.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${m.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function ge(m,b){return c`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="parallel"
      data-root-dir=${m.root_dir}
      data-row-index=${b}
      data-queue-index=${String(m.queue_index??0)}
    >
      ${$n(ut(m),{actions:re(m,!0)})}
    </div>`}function O(m,b,C,P){return c`<div
      class="mon2-crow${b.fixed?" mon2-crow--fixed":""}"
      draggable=${b.draggable?"true":"false"}
      data-bead-id=${b.id}
      data-drag-kind="chain"
      data-root-dir=${b.root_dir}
      data-lane-id=${m.lane_id}
      data-row-index=${C}
      data-queue-index=${typeof b.queue_index=="number"?String(b.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Yb(b.seq)}</span
      >
      ${b.workspace_name?c`<span class="worker-mini__repo" title=${b.root_dir}
            >${b.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${b.id}</span>
      <span class="mon2-crow__title">${b.title}</span>
      ${b.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${P.includes(b.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${b.location_title}
        >${b.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${b.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function X(m){let b=E.cross_lanes_revision!==null,C=H(m.lane_id),P=C?.held===!0,f=C?.cycle===!0,y=C?C.mismatched:[],V=ne&&ne.lane_id===m.lane_id?ne.corrected:0;return c`<div class="mon2-clane" data-lane-id=${m.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${m.label}</span>
        <span class="mon2-clane__count">${m.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${m.state}"
          >${m.badge}</span
        >
        ${V>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${V}건 자동 교정</span
            >`:""}
        ${f?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${P?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Ys}</span
            >`:""}
        ${m.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${m.lane_id}
              ?disabled=${!b||!m.can_confirm||P}
              title=${P?Ys:m.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${m.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${m.lane_id}
              ?disabled=${!b}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${m.run_label}
            </button>`:""}
        ${m.state==="confirmed"&&m.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${m.lane_id}
              ?disabled=${!b}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${m.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${m.lane_id}
              ?disabled=${!b}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${m.lane_id}
          ?disabled=${!b}
          title=${m.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${m.lane_id}
      >
        ${m.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:m.rows.map((le,Re)=>O(m,le,Re,y))}
      </div>
    </div>`}function Ne(m,b,C){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="repo-serial"
      data-root-dir=${b.root_dir}
      data-lane-id=${m.id}
      data-row-index=${C}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${$n(ut(b),{actions:re(b)})}
    </div>`}function Ve(m){if(m.length===0)return"";let b=m.length-1;return`${m[0].id} \uC810\uC720${b>0?` +${b}`:""}`}function qe(m){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${m.id}
    >
      ${$n({id:m.id,title:m.title,lane:"running",draggable:!1,ghost:!0,badges:[m.badge]})}
    </div>`}function ct(m,b){let C=b.occupants,P=b.cross_wait_peers||[];return{id:b.id,pane_id:"",title:`${m.name} \xB7 \uC9C1\uB82C ${b.index+1}`,rows:[...C.map(f=>qe(f)),...b.items.map((f,y)=>Ne(b,f,y))],count:b.items.length,empty:b.empty===!0,...C.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${C.map(f=>`${f.id} \u2014 ${f.badge}`).join(`
`)}
              >${Ve(C)}</span
            >`,held:!0}:{},cycle:b.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${m.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...P.length>0?{after:c`${P.map(f=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${f.workspace_name}·${f.lane}과 교차 대기
                </div>`)}`}:{}}}function st(){let m=E.cross_lanes_revision!==null,b=E.chain_lanes.some(C=>C.draft&&C.rows.length===0);return js({parallel:{rows:E.parallel_rows.map((C,P)=>ge(C,P)),count:E.parallel_rows.length,collapsed:G.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:E.queue_groups.flatMap(C=>C.sublanes.serial.map(P=>({...ct(C,P),drop:{drop:"repo-serial",root_dir:C.root_dir,lane_id:P.id,lane_length:String(P.raw_length)}}))),collapsed:G.isAreaCollapsed("serial"),extra_panes:E.chain_lanes.map(C=>X(C)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${b||!m}
          title=${m?b?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...E.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function We(m){return c`<div class="worker-rungrid">
      ${E.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:E.running.map(b=>Ja({bead_id:b.id,attempt_id:b.attempt_id||"",title:b.title,runner:b.runner??null,model:b.model??null,effort:b.effort??null,speed:b.speed??null,started_at:b.started_at??null,kind:b.kind,...b.kind==="session"?{updated_at:b.updated_at,session_refs:b.session_refs||[]}:{},workflow:b.workflow||null,resumed_from:b.resumed_from??null,continuation_mode:b.continuation_mode??null,paused:b.run_state==="paused",failed:b.run_state==="failed",parked:b.run_state==="parked",retry_wait:b.run_state==="retry_wait",retry:b.retry||null,status:b.status,status_label:b.run_state==="failed"?"\uC2E4\uD328":b.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":b.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":void 0,can_pause:b.can_pause!==!1,exec_chips:b.exec_chips||null,usage:b.usage||null,discard:b.discard,failure:b.failure?{...b.failure,open:W===b.attempt_id}:null},m,F,{monitor:{repo:b.workspace_name,root_dir:b.root_dir,serial_lane_id:b.serial_lane_id,last_activity:b.last_activity||null,legs:b.legs||[],dependency_chips:Be(b)}}))}
    </div>`}function et(m){let b={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done},C=P=>{let f=b[P.lane],y=P.lane==="runnable"?E.runnable_flat?f.length>0?L():void 0:E.runnable_sections.length>0?L():void 0:P.lane==="queue"?E.queue_groups.length>0||E.chain_lanes.length>0||E.parallel_rows.length>0||E.cross_lanes_unreadable?st():void 0:P.lane==="running"?We(m):f.length>0?c`${f.map(V=>$n(ut(V)))}`:void 0;return Pn({id:`monitor-${P.lane}`,lane:P.pane,title:P.title,items:f,count:f.length,src:P.lane==="runnable",empty:P.empty,body:y,live:P.lane==="running"&&f.length>0,collapsible:!0,collapsed:G.isCollapsed(P.pane),controls:P.lane==="runnable"?kt():void 0,header_control:Ke(P.lane,f.length)})};if(ie){let P=Kb.map(f=>sp.find(y=>y.lane===f)).filter(f=>f!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Bs({live:E.running.length>0,running_body:E.running.length>0?We(m):"",pr_wait_rows:E.pr_wait.map(f=>$n(ut(f))),count:E.running.length+E.pr_wait.length})}
            ${P.map(f=>C(f))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${sp.map(P=>C(P))}
        </div>
      </div>`}function kt(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒
        blocked${E.runnable_hidden.blocked>0?` ${E.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${fa.map(m=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${$.spec===m.value?" is-active":""}"
              data-spec=${m.value}
              aria-pressed=${$.spec===m.value?"true":"false"}
            >
              ${m.label}
            </button>`)}
        ${E.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${E.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Ke(m,b){return m==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${R}
      >
        ${So.map(C=>c`<option
              value=${C.value}
              ?selected=${R===C.value}
            >
              ${C.label}
            </option>`)}
      </select>`:m==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${_}
      >
        <option value="started" ?selected=${_==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${_==="repo"}>
          레포순
        </option>
      </select>`:m==="pr_wait"&&b>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:m==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Rr.map(C=>c`<option value=${C.value} ?selected=${g===C.value}>
              ${C.label}
            </option>`)}
      </select>`:""}function Ot(m){let b=o&&o.get?o.get():null,C=o&&o.getWorkspacesState?o.getWorkspacesState():[],P=m===void 0?o&&o.crossLanes?o.crossLanes():void 0:m,f={done_since:gr(g,d()),running_sort:_,candidate_filter:$,candidate_sort:R};return P!==void 0&&(f.cross_lanes=P),sr(b,C,f)}function Je(){let m=d();E=Ot(),Y=null,J=new Map;for(let b of[...E.runnable,...E.queue,...E.running,...E.pr_wait,...E.done])!b.non_occupying&&!J.has(b.id)&&J.set(b.id,b);at(et(m),ce),Bt()?.render(),rt(),Mt()}function rt(){let m=new Map;for(let b of E.queue_groups)m.set(b.root_dir,b.auto_advance);for(let b of Array.from(ce.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let C=b.closest(".mon2-item")?.getAttribute("data-root-dir")||"",P=m.get(C);typeof P=="boolean"&&b.setAttribute("title",`${b.textContent||""} \xB7 ${P?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Bt(){if(me)return me;let m=ce.querySelector(".mon2-deck");return m?(me=ep(m,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>E.done,rangeLabel:we,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:Ht,onFocusChange:b=>{K=b,Mt()}}),me):null}function Mt(){ce.classList.toggle("has-focus",K!==null);for(let m of Array.from(ce.querySelectorAll(".mon2-sec[data-root-dir]")))m.classList.toggle("is-focus",K!==null&&m.getAttribute("data-root-dir")===K);for(let m of Array.from(ce.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let b=J.get(m.getAttribute("data-bead-id")||"");m.classList.toggle("is-focus",K!==null&&!!b&&b.root_dir===K)}for(let m of Array.from(ce.querySelectorAll(".mon2-crow[data-root-dir]")))m.classList.toggle("is-focus",K!==null&&m.getAttribute("data-root-dir")===K)}function Tt(m,b){let C=i?i():void 0;if(!b||!C||b===C||!a){r(m);return}a(b).then(()=>{r(m)}).catch(P=>{n("workspace switch for %s failed: %o",b,P)})}function Ht(m){if(!m)return;let b=i?i():void 0,C=()=>{try{u?.gotoView("worker")}catch(P){n("gotoView(worker) failed: %o",P)}};if(!a||b&&b===m){C();return}a(m).then(C).catch(P=>{n("workspace switch for %s failed: %o",m,P),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function nn(m){on(m).then(b=>{de(b?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",b?"success":"error",1400)})}function Gt(m){let b=J.get(m)||null;return{item:b,root_dir:b?b.root_dir:"",revision:b?b.expected_revision:0}}function Kt(m){if(typeof m=="string"&&m.length>0)return m;if(m&&typeof m=="object"){let b=m;if(typeof b.message=="string"&&b.message.length>0)return b.message;if(typeof b.error=="string"&&b.error.length>0)return b.error;if(b.error&&typeof b.error=="object"&&typeof b.error.message=="string")return b.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function Lt(m,b,C){if(m!=="dep-add")return;let P=E.chain_lanes.find(f=>f.rows.some(y=>y.id===b));!P||!P.rows.some(f=>f.id===C)||await ue(f=>Su(P.lane_id,f),"",[{type:m,a:b,b:C}])}function bn(){return(o&&o.crossLanes?o.crossLanes():null)??null}function Xt(m,b){let C=J.get(b);if(C&&C.root_dir===m)return C.expected_revision;let P=E.queue_groups.find(f=>f.root_dir===m);return P?P.revision:0}async function St(m,b){if(m==="run"){await dn(b);return}if(m==="stop"){await ye(b);return}if(m==="create"){await ue(C=>ba(null,C),"");return}if(m==="remove"){let C=Tu(b,B());if(C!==null&&!p(C))return;await ue(P=>Eu(b,P),"");return}await ue(C=>m==="confirm"?xu(b,C):Au(b,C),"")}function Vt(m){let b=new Map;for(let C of m.rows){let P=E.owner_of[C.id]||C.root_dir;typeof P!="string"||P.length===0||b.set(P,[...b.get(P)||[],C.id])}return b}async function dn(m){let b=E.chain_lanes.find(y=>y.lane_id===m);if(!b||E.cross_lanes_revision===null){Je();return}Oe();let C=new Map,P=new Map,f=Vt(b);for(let y of b.rows){if(!y.unplaced)continue;let V=E.owner_of[y.id]||y.root_dir;if(typeof V!="string"||V.length===0){de(`${y.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Je();return}let le=P.get(V)??0;if(await se("worker-queue-place",{bead_id:y.id,lane:"parallel",index:(E.parallel_raw_length[V]??0)+le},V,C,{bead_id:y.id})===null){Je();return}P.set(V,le+1)}for(let[y,V]of f)if(await se("worker-queue-arm",{bead_ids:V,lane_id:m},y,C,{bead_id:V[0]})===null){de("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Je();return}Je()}async function ye(m){let b=E.chain_lanes.find(P=>P.lane_id===m);if(!b||E.cross_lanes_revision===null){Je();return}Oe();let C=new Map;for(let[P,f]of Vt(b))if(await se("worker-queue-disarm",{lane_id:m},P,C,{bead_id:f[0]})===null)break;Je()}async function T(m,b){let{root_dir:C,revision:P}=Gt(m);if(C.length===0){Je();return}await se("worker-queue-disarm",{bead_ids:[m],lane_id:b},C,new Map([[C,P]]),{bead_id:m}),Je()}async function h(m,b){let C=J.get(m);if(!C){Je();return}let P={kind:"candidate",bead_id:m,root_dir:C.root_dir};if(b==="new-lane"){await ue(f=>ba({bead_id:m,root_dir:C.root_dir},f),m);return}if(b.startsWith("lane:")){let f=b.slice(5);if(!E.chain_lanes.find(V=>V.lane_id===f)){Je();return}await ue(V=>Qs(P,{kind:"chain",lane_id:f,marker_index:(V.cross_lanes.get(f)?.entries??[]).length},V),m);return}if(b.startsWith("serial:")){let f=b.slice(7),y=(C.place_lanes||[]).find(V=>V.id===f);await Pe(P,{kind:"repo-serial",root_dir:C.root_dir,lane_id:f,index:y?y.index:0});return}await Pe(P,{kind:"parallel",marker_index:E.parallel_rows.length})}async function A(m,b){let C=E.parallel_rows,P=C.findIndex(mt=>mt.id===m);if(P<0)return;let f=C[P].root_dir,y=[];C.forEach((mt,Ct)=>{mt.root_dir===f&&y.push(Ct)});let V=y.indexOf(P),le=y[V+b];if(typeof le!="number")return;let Re=b===-1?le:y[V+2]??Math.min(C.length,le+1);await Pe({kind:"parallel",bead_id:m,root_dir:f,queue_index:C[P].queue_index??0},{kind:"parallel",marker_index:Re})}async function pe(m){for(let b of E.chain_lanes){let C=b.rows.find(P=>P.id===m);if(C){await Pe({kind:"chain",bead_id:m,root_dir:C.root_dir,lane_id:b.lane_id,...typeof C.queue_index=="number"?{queue_index:C.queue_index}:{}},{kind:"parallel",marker_index:E.parallel_rows.length});return}}}function je(m){return{runner:m.runner||void 0,model:m.model||void 0,effort:m.effort||void 0,status:m.run_state==="running"?"running":m.run_state,worktree:m.root_dir}}function Me(m,b){let{item:C,root_dir:P,revision:f}=Gt(b),y=C?.attempt_id||"",V=m.classList;if(V.contains("worker-mini__rowops-up")||V.contains("worker-mini__rowops-down")){A(b,V.contains("worker-mini__rowops-up")?-1:1);return}if(V.contains("worker-mini__rowops-remove")){ae("worker-queue-remove",{bead_id:b},P,f);return}if(V.contains("mon2-crow__detach")){pe(b);return}if(V.contains("worker-dep__open")){Tt(m.getAttribute("data-dep-id")||"",m.getAttribute("data-root-dir")||"");return}if(V.contains("mon2-arm__release")){T(b,m.getAttribute("data-lane-id")||"");return}if(V.contains("mon-lane__chip")){let le=m.getAttribute("data-lane-id")||"";ce.querySelector(`.mon2-clane[data-lane-id="${le}"]`)?.scrollIntoView({block:"nearest"});return}if(V.contains("mon-overlap__chip")){let le=m.getAttribute("data-overlap-id")||"";I=!!I&&I.bead_id===b&&I.counterpart_id===le?null:{bead_id:b,counterpart_id:le},Je();return}if(V.contains("mon-overlap__place")){At(b,m.getAttribute("data-counterpart-id")||"");return}if(V.contains("rtile__failure-badge")){W=W===y?null:y,Je();return}if(V.contains("rtile__attempt-copy")){let le=m.getAttribute("data-attempt-id")||"";le&&on(le).then(Re=>{de(Re?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Re?"success":"error",1400)});return}if(V.contains("worker-card__place")){M=M===b?null:b,Je();return}if(V.contains("worker-card__place-cancel")){M=null,Je();return}if(V.contains("worker-card__place-lane")){let le=m.getAttribute("data-lane")||"parallel";M=null,h(b,le);return}if(V.contains("rtile__session")){if(C&&C.kind==="session"){let le=(C.session_refs||[]).find(Re=>Re&&Re.current===!0);le&&(q.hidden=!1,Ue.open(Br(le,b,"in_progress",P)),Je());return}F=y,y&&C&&(q.hidden=!1,Ue.open({attempt_id:y,root_dir:P,meta:je(C)})),Je();return}if(V.contains("rtile__pause")){Ge("worker-attempt-pause",{attempt_id:y},P);return}if(V.contains("rtile__resume")){jr().then(le=>{if(le!==null)return _e("worker-attempt-resume",{attempt_id:y,...le!==""?{instructions:le}:{}},P,f)});return}if(V.contains("rtile__parked-retry")){Ge("worker-parked-retry",{bead_id:b,attempt_id:y},P).then(le=>{le&&le.ok===!1&&de(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${le.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":le.reason||""}`,"error")});return}if(V.contains("rtile__discard")){let le=m.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(wo(b,le)))return;Ze({bead_id:b,...y?{attempt_id:y}:{},...m.dataset.operationId?{operation_id:m.dataset.operationId}:{}},P,f);return}if(V.contains("worker-mini__merge")){let le=Ee(P,b);le?.mismatch&&le.continuation===null?Le(P,b,f,le.mismatch):ae("worker-merge-queue-add",{bead_id:b},P,f);return}if(V.contains("worker-mini__merge-cancel")){ae("worker-merge-queue-remove",{bead_id:b},P,f);return}if(V.contains("worker-mini__discard")){let le=m.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(wo(b,le)))return;Ze({bead_id:b,...m.dataset.attemptId?{attempt_id:m.dataset.attemptId}:{},...m.dataset.operationId?{operation_id:m.dataset.operationId}:{}},P,f);return}if(V.contains("worker-mini__revise-fix")){_e("worker-revise-fix",{bead_id:b},P,f);return}V.contains("worker-mini__revise-approve")&&ae("worker-revise-approve",{bead_id:b},P,f)}function be(m){let b=dt.consumeClickSuppression(),C=m.target;if(!C||typeof C.closest!="function"||C.closest("dialog")||C.closest(".worker-drawer-overlay")||C.closest("a"))return;let P=C.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(P){m.preventDefault();let S=C.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||P.textContent?.trim()||"";S&&nn(S);return}let f=C.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(f){m.preventDefault();let k=f.getAttribute("data-root-dir")||J.get(C.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||f.getAttribute("title")||"";Ht(k);return}let y=C.closest(".mon2-sec__toggle");if(y){m.preventDefault(),z(y.getAttribute("data-root-dir")||"");return}let V=C.closest(".worker-pane__toggle[data-lane]");if(V){m.preventDefault();let k=V.getAttribute("data-lane")||"";(k==="candidate"||k==="queue"||k==="running"||k==="pr_wait"||k==="done")&&Ae(k);return}let le=C.closest(".worker-wait__area-toggle[data-area]");if(le){m.preventDefault(),lt(le.getAttribute("data-area")||"parallel");return}if(C.closest(".mon2-newlane")){m.preventDefault(),St("create","");return}let Re=C.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Re){m.preventDefault();let k=Re.getAttribute("data-lane-id")||"",S=Re.classList;St(S.contains("mon2-clane__confirm")?"confirm":S.contains("mon2-clane__reapply")?"reapply":S.contains("mon2-clane__run")?"run":S.contains("mon2-clane__stop")?"stop":"remove",k);return}if(C.closest(".mon-merge-all")){m.preventDefault(),ze();return}let mt=C.closest(".mon-filter__spec");if(mt){m.preventDefault(),$={...$,spec:mt.getAttribute("data-spec")||"all"},op($),Je();return}let Ct=C.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Ct)return;let Dn=Ct.getAttribute("data-bead-id")||"",w=C.closest("button");if(w){m.preventDefault(),Me(w,Dn);return}C.closest(".rtile__failure-pop")||Dn&&!b&&(m.preventDefault(),Tt(Dn,Ct.getAttribute("data-root-dir")||Gt(Dn).root_dir))}function yt(m){let b=m.target;if(!b||typeof b.closest!="function")return;let C=b.closest(".mon-filter__blocked");if(C){$={...$,show_blocked:C.checked},op($),Je();return}let P=b.closest(".mon-candidate-sort");if(P){R=So.some(V=>V.value===P.value)?P.value:"repo_spec",Fb(R),Je();return}let f=b.closest(".mon-running-sort");if(f){_=f.value==="repo"?"repo":"started",Hb(_),Je();return}let y=b.closest(".mon-done-range");y&&(g=Ln(y.value),Wb(g),Je())}function pt(m){let b=m.target,C=b&&typeof b.closest=="function"?f=>b.closest(f):()=>null,P=!1;I&&!C(".mon-overlap__popover, .mon-overlap__chip")&&(I=null,P=!0),W&&!C(".rtile__failure-pop, .rtile__failure-badge")&&(W=null,P=!0),P&&Je()}function ft(m){m.key!=="Escape"||!I&&W===null||(I=null,W=null,Je())}e.addEventListener("click",be),e.addEventListener("change",yt),document.addEventListener("click",pt),document.addEventListener("keydown",ft),dt.attach(e);{let m=!0;ee=mi(b=>{if(ie=b,m){m=!1;return}Je()})}o&&typeof o.subscribe=="function"&&(fe=o.subscribe(()=>{try{Ce.clear(),Je()}catch{}}));function it(){xe!==null&&(clearInterval(xe),xe=null)}return{recorrectSharedLane:Lt,load(){n("load"),Je(),xe===null&&(xe=setInterval(()=>{try{Je()}catch{}},Gb))},pause(){it()},clear(){it(),dt.detach(),fe&&(fe(),fe=null),ee&&(ee(),ee=null),Ue.destroy(),q.hidden=!0,me?.destroy(),me=null,e.removeEventListener("click",be),e.removeEventListener("change",yt),document.removeEventListener("click",pt),document.removeEventListener("keydown",ft),e.replaceChildren()}}}function _p(e,t,n){let r=Pt("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(g){return _=>{_.preventDefault();let $=g==="monitor"&&a()==="monitor"?"worker":g;r("click tab %s",$),n.gotoView($)}}function a(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function u(){let g=a();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${g==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let g=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${g==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${g==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function p(){o&&at(u(),o),s&&at(d(),s)}return p(),i=t.subscribe(()=>p()),{destroy(){i&&(i(),i=null),o&&at(c``,o),s&&at(c``,s)}}}var mp=["bug","feature","task","epic","chore"];function gp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var hp=["Critical","High","Medium","Low","Backlog"];function bp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function _(){s.replaceChildren();let M=document.createElement("option");M.value="",M.textContent="\u2014 Select \u2014",s.appendChild(M);for(let I of mp){let W=document.createElement("option");W.value=I,W.textContent=gp(I),s.appendChild(W)}i.replaceChildren();for(let I=0;I<=4;I+=1){let W=document.createElement("option");W.value=String(I);let K=hp[I]||"Medium";W.textContent=`${I} \u2013 ${K}`,i.appendChild(W)}}_();function $(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function R(M){o.disabled=M,s.disabled=M,i.disabled=M,l.disabled=M,a.disabled=M,d.disabled=M,p.disabled=M,p.textContent=M?"Creating\u2026":"Create"}function j(){u.textContent=""}function G(M){u.textContent=M}function ie(){try{let M=window.localStorage.getItem("beads-ui.new.type");M?s.value=M:s.value="";let I=window.localStorage.getItem("beads-ui.new.priority");I&&/^\d$/.test(I)?i.value=I:i.value="2"}catch{s.value="",i.value="2"}}function ee(){let M=s.value||"",I=i.value||"";M.length>0&&window.localStorage.setItem("beads-ui.new.type",M),I.length>0&&window.localStorage.setItem("beads-ui.new.priority",I)}async function F(){j();let M=String(o.value||"").trim();if(M.length===0){G("Title is required"),o.focus();return}let I=Number(i.value||"2");if(!(I>=0&&I<=4)){G("Priority must be 0..4"),i.focus();return}let W=String(s.value||""),K=String(a.value||""),ne={title:M};W.length>0&&(ne.type=W),String(I).length>0&&(ne.priority=I),K.length>0&&(ne.description=K),R(!0);try{await t("create-issue",ne)}catch{R(!1),G("Failed to create issue");return}ee(),R(!1),$()}return n.addEventListener("cancel",M=>{M.preventDefault(),$()}),g.addEventListener("click",()=>$()),d.addEventListener("click",()=>$()),n.addEventListener("keydown",M=>{M.key==="Enter"&&(M.ctrlKey||M.metaKey)&&(M.preventDefault(),F())}),r.addEventListener("submit",M=>{M.preventDefault(),F()}),{open(){r.reset(),j(),ie();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){$()}}}var Vb=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Qb(e,t){return Fi(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function yp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=Qb(r,e);return c`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${o}`}
                data-label=${r}
                data-state=${o}
                @click=${()=>n(r)}
              >
                ${r}
              </button>`})}
          </div>`}
    </section>
  `}function vp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>c`<span class="settings-dialog__prefix">
              ${r}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${r} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>n.onRemove(r)}
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
          @input=${r=>n.onDraft(String(r.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${n.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function kp(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Vb.map(([n,r])=>c`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${n}
                .checked=${e.chips[n]!==!1}
                @change=${()=>t(n)}
              />
              <span>${r}</span>
            </label>`)}
      </div>
    </section>
  `}var Xb=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function wp(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(Z=>de(Z,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function p(){if(d)return d;let Z=i.querySelector('[data-pane="execution"]');return Z?(d=wi(Z,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Oe=>t.queueStore?.set?.(Oe)}),d):null}function g(){return c`
      <section
        class=${`settings-dialog__pane${l==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        <div class="settings-dialog__pane-body" data-pane="execution"></div>
      </section>
    `}function _(){let Z=r.get();return c`
      <section
        class=${`settings-dialog__pane${l==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${Z?c`
              ${yp(Z,o(),G)}
              ${vp(Z,u,{onDraft:Oe=>{u=Oe},onAdd:ie,onRemove:ee})}
              ${kp(Z,F)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function $(Z){let Oe=r.get();if(Oe)try{let we=await n("display-policy-set",{expected_revision:Oe.revision,policy:Z(Oe)});R(we),we&&we.conflict&&we.policy&&(we=await n("display-policy-set",{expected_revision:we.policy.revision,policy:Z(we.policy)}),R(we)),we&&we.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function R(Z){Z&&Z.policy&&typeof Z.policy=="object"&&r.set(Z.policy)}function j(Z){$(Z)}function G(Z){let Oe=r.get();if(!Oe)return;let we=!Zb(Z,Oe);j(ce=>Jb(Z,ce,we))}function ie(){let Z=u.trim();Z.length!==0&&(u="",j(Oe=>Oe.hidden_prefixes.includes(Z)?{hidden_prefixes:Oe.hidden_prefixes}:{hidden_prefixes:[...Oe.hidden_prefixes,Z]}),M())}function ee(Z){j(Oe=>({hidden_prefixes:Oe.hidden_prefixes.filter(we=>we!==Z)}))}function F(Z){let Oe=r.get();if(!Oe)return;let we=Oe.chips[Z]===!1;j(()=>({chips:{[Z]:we}}))}function M(){at(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Xb.map(Z=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${Z.id}
                  aria-selected=${String(l===Z.id)}
                  aria-controls=${`settings-pane-${Z.id}`}
                  @click=${()=>I(Z.id)}
                >
                  <span class="settings-dialog__glyph">${Z.glyph}</span>
                  ${Z.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${H}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${g()} ${_()}
          </div>
        </div>
      `,i),p()}function I(Z){l=Z,M()}let W=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",W),i.addEventListener("cancel",W);let K=Z=>{Z.target===i&&H()};i.addEventListener("click",K);let ne=null;r.subscribe&&(ne=r.subscribe(()=>{a&&M()}));let D=null;t.implPresetStore?.subscribe&&(D=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function Y(Z="execution"){a||(a=!0,t.onOpenChange?.(!0),l=Z,u="",M(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),p()?.load())}function H(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:Y,close:H,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",W),i.removeEventListener("cancel",W),i.removeEventListener("click",K),ne&&(ne(),ne=null),D&&(D(),D=null),d?.destroy(),d=null,i.remove()}}}function Zb(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Jb(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var ey=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],$p="usage-meter-card",ty="usage-meter-layer",tl=600,ny=["token_expired","relogin_required"];function xp(e){return String(e).padStart(2,"0")}function ry(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Ap(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${xp(r.getHours())}:${xp(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${ey[r.getMonth()]} ${r.getDate()} ${s}`;return`${ry(n,t)} \xB7 ${l}`}function oy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Sp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Ep(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Tp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Rp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function sy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Rp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function iy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=sy(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Rp(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function ay(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=iy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Op(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function ly(e,t){return!e.held||Op(e,t)<=tl?e:{...e,available:!1,windows:[],accounts:[]}}function Cp(e,t){return`${e}:${t}`}function Lp(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){at(c``,e),e.hidden=!0,p()}function d(){if(a===null){let ce=e.ownerDocument;a=ce.createElement("div"),a.id=ty,a.className="usage-meter__layer",ce.body.appendChild(a)}return a}function p(){a!==null&&(at(c``,a),a.remove(),a=null)}function g(ce){n!==ce&&(n===null&&(document.addEventListener("mousedown",$),document.addEventListener("keydown",j),window.addEventListener("resize",R)),n=ce)}function _(){n!==null&&(n=null,document.removeEventListener("mousedown",$),document.removeEventListener("keydown",j),window.removeEventListener("resize",R))}function $(ce){let q=ce.target;q&&(e.contains(q)||a!==null&&a.contains(q))||(_(),H())}function R(){H()}function j(ce){ce.key==="Escape"&&(_(),H())}function G(ce){n===ce?_():g(ce),H()}function ie(){_(),H()}async function ee(ce,q){if(r.has(ce.key))return;let $e=Cp(ce.key,q);r.set(ce.key,q),i.delete($e),H();let Se=null;try{Se=await(await fetch(ce.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:q})})).json()}catch{Se=null}if(t)return;if(r.delete(ce.key),!Se||Se.ok!==!0){let J=Se&&typeof Se.error=="string"&&Se.error.length>0?Se.error:"network_error";i.set($e,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${J}`}),H();return}let E=Array.isArray(Se.warnings)?Se.warnings.filter(J=>typeof J=="string"&&J.length>0):[];E.length>0&&i.set($e,{kind:"warn",text:E.join(" \xB7 ")}),H(),await we()}function F(ce,q,$e,Se){let E=Ep(ce.pct),Ce=`resets ${Ap(ce.resetsAt,Se)}${q?` \xB7 ${$e}`:""}`;return c`<span
      class="usage-meter__window ${Sp(E)}"
      style=${`--progress: ${E}%`}
      title=${Ce}
    >
      <span class="usage-meter__label">${ce.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${E}%</span>
    </span>`}function M(ce,q,$e){let Se=Op(q,$e),E=q.available&&(q.held||Se>tl),J=E?`${Math.floor(Se/60)}\uBD84 \uC804 \uCE21\uC815`:"",Ce=q.accounts.filter(Ue=>!Ue.active).length,fe=`usage-meter__group${E?" usage-meter__group--stale":""}`,xe=c`<span class="usage-meter__provider"
        >${ce.label}</span
      >
      ${q.available?q.windows.map(Ue=>F(Ue,E,J,$e)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Ce>0?c`<span class="usage-meter__badge">+${Ce}</span>`:""}`;if(q.accounts.length===0)return c`<span
        class=${fe}
        aria-label=${`${ce.label} usage`}
        >${xe}</span
      >`;let me=n===ce.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${fe}`}
      aria-label=${`${ce.label} usage`}
      aria-expanded=${me?"true":"false"}
      aria-controls=${$p}
      @click=${()=>G(ce.key)}
    >
      ${xe}
    </button>`}function I(ce,q){return c`<span class="usage-meter" aria-label="Usage">
      ${ce.map($e=>M($e.provider,$e.snapshot,q))}
    </span>`}function W(ce,q){let $e=Ep(ce.pct),Se=Ap(ce.resetsAt,q);return c`<span
      class="usage-meter__account-window ${Sp($e)}"
      style=${`--progress: ${$e}%`}
    >
      <span class="usage-meter__account-key">${ce.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${$e}%</span>
      <span class="usage-meter__account-reset"
        >${Se.length>0?`\u21BB ${Se}`:""}</span
      >
    </span>`}function K(ce,q){return ny.includes(q)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ce.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ne(ce,q,$e){let Se=q.status==="ok",E=typeof q.ageSeconds=="number"&&q.ageSeconds>tl,J=i.get(Cp(ce.key,q.number)),Ce=r.get(ce.key),fe=Ce!==void 0,xe=Ce===q.number,me=["usage-meter__account"];return q.active&&me.push("usage-meter__account--active"),Se||me.push("usage-meter__account--unavailable"),E&&me.push("usage-meter__account--stale"),c`<div class=${me.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${q.email}
          >${q.alias===null?q.email:q.alias}</span
        >
        ${q.plan===null?"":c`<span class="usage-meter__account-tag">${q.plan}</span>`}
        ${q.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${q.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${oy(q.ageSeconds)}</span
            >`}
        ${q.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${fe}
              @click=${()=>{ee(ce,q.number)}}
            >
              ${xe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Se?c`<div class="usage-meter__account-windows">
            ${q.windows.map(Ue=>W(Ue,$e))}
          </div>`:c`<div class="usage-meter__account-status">
            ${K(ce,q.status)}
          </div>`}
      ${J===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${J.kind}"
          >
            ${J.text}
          </div>`}
    </div>`}function D(ce,q,$e){let Se=q.accounts.filter(E=>E.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ce.label} · 활성 ${Se} / 전체
        ${q.accounts.length}
      </h2>
      ${q.accounts.map(E=>ne(ce,E,$e))}
    </section>`}function Y(ce,q){return c`<div
      class="usage-meter__card"
      id=${$p}
      role="dialog"
      aria-label=${`${ce.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${D(ce.provider,ce.snapshot,q)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function H(){let ce=Date.now(),q=[];for(let Se of Tp){let E=s.get(Se.key);E&&q.push({provider:Se,snapshot:ly(E,ce)})}if(q.length===0){_(),u();return}let $e=q.find(Se=>Se.provider.key===n&&Se.snapshot.accounts.length>0);$e||_(),at(I(q,ce),e),e.hidden=!1,$e?Z($e,ce):p()}function Z(ce,q){let $e=d(),Se=e.getBoundingClientRect(),E=e.ownerDocument.documentElement.clientWidth;$e.style.setProperty("--usage-meter-anchor-top",`${Se.bottom}px`),$e.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,E-Se.right)}px`),at(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ie}
        ></div>
        ${Y(ce,q)}`,$e)}async function Oe(ce){try{let q=await fetch(ce.endpoint);return q.ok?ay(await q.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function we(){l+=1;let ce=l,q=await Promise.all(Tp.map(async $e=>({provider:$e,read:await Oe($e)})));if(!(t||ce!==l)){for(let $e of q){let Se=$e.provider.key;if($e.read.kind==="ok"){s.set(Se,$e.read.snapshot);continue}if($e.read.kind==="empty"){s.delete(Se);continue}let E=s.get(Se);E!==void 0&&!E.held&&s.set(Se,{...E,held:!0})}H()}}return u(),we(),o=setInterval(()=>{we()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),_(),u()}}}var cy="worker-ineligible";function Yo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ip(e){return Yo(e).includes(cy)}var uy="worker-serial";function Mp(e){return Yo(e).includes(uy)}var Np="bdui.worker.candidate_sort",Vo=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),xi=Object.freeze({preset:"spec"}),qp=3,Fp=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Pp(e){return Vo.some(t=>t.id===e)}function Dp(e){let t=Vo.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function dy(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function Qo(e){return e&&"preset"in e?Dp(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Dp("spec")}function nl(e){return e&&"preset"in e?e.preset:null}function Sr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return Pp(e)?{preset:e}:xi}return Sr(s)}if(!e||typeof e!="object")return xi;let t=e;if(Pp(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>qp||!n.every(Pi))return xi;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=Vo.find(s=>dy(s.chain,r));return o?{preset:o.id}:{chain:r}}function jp(){try{return Sr(window.localStorage.getItem(Np))}catch{return xi}}function rl(e){try{window.localStorage.setItem(Np,JSON.stringify(e))}catch{}}function Bp(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(is,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:is[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,qp)}function Up(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Wp(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Bl(Qo(t))),n}var zp=new Set(["sh","bash","zsh","dash","ksh"]),Hp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Gp(e){let t=e.split("/");return t[t.length-1]||""}function py(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Gp(n[0]);if(r!=="env")return zp.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&zp.has(Gp(o))}function fy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function _y(e){let t=[],n=0;Hp.lastIndex=0;for(let r of e.matchAll(Hp)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:fy(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function my(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Kp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function p(M,I){return I?_y(M).map(W=>W.kind==="plain"?W.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${W.kind}"
            >${W.text}</span
          >`):M}function g(){if(!o)return c``;let M=s==="ready"&&py(i),I=s==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>ee()}
      ></div>
      <section class="repo-ops-script-viewer__panel">
        <header class="repo-ops-script-viewer__header">
          <div class="repo-ops-script-viewer__identity">
            <span
              class="repo-ops-script-viewer__path"
              title=${o.path}
              >${o.path}</span
            >
            <span class="repo-ops-script-viewer__ref"
              >${o.base_ref}@${o.base_sha.slice(0,7)}</span
            >
          </div>
          <div class="repo-ops-script-viewer__actions">
            <button
              type="button"
              class="repo-ops-script-viewer__copy"
              ?disabled=${s!=="ready"}
              @click=${()=>{$()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>ee()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${s==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:s==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${I.map((W,K)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${K+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(W,M)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function _(){at(g(),r)}async function $(){if(s!=="ready")return;let M=await on(i);de(M?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",M?"success":"error")}function R(M){M.key==="Escape"&&o&&(M.preventDefault(),ee())}function j(){d||(document.addEventListener("keydown",R),d=!0)}function G(){d&&(document.removeEventListener("keydown",R),d=!1)}async function ie(M,I=null){let W=++a;j(),o={...M},u=I||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",_(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",_();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",_();return}let D="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(M.lane)+"&base_sha="+encodeURIComponent(M.base_sha);try{let Y=await n(D),H=await Y.json().catch(()=>({}));if(W!==a)return;if((t?t():"")!==ne){ee();return}if(!Y.ok||!H||H.ok!==!0){s="error",l=my(H&&typeof H.error=="string"?H.error:""),_();return}o={lane:H.lane,base_sha:H.base_sha,path:H.path,base_ref:H.base_ref},i=String(H.content),s="ready",_()}catch{if(W!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",_()}}function ee(){a+=1,G(),o=null,i="",_();let M=u;u=null,M?.isConnected&&M.focus()}function F(){ee(),r.remove()}return{open:ie,close:ee,destroy:F}}var Yp={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},gy=new Set(["queued","running","retry_pending"]);function Vp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let D=s();return typeof D.revision=="number"?D.revision:0}function l(D){t&&D&&D.queue&&typeof D.queue=="object"&&t.set(D.queue)}function a(){let D=s().workspace_info;return D&&typeof D=="object"?D:{}}function u(D,Y){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${D}"
      >${Y}</span
    >`}function d(D){if(typeof D!="number"||!Number.isFinite(D))return"";let Y=D/6e4;return Number.isInteger(Y)?`timeout ${Y}\uBD84`:`timeout ${Math.round(D/1e3)}\uCD08`}function p(D){let Y=d(D);return Y?u("config",Y):""}function g(D,Y,H){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${H.script}
      @click=${Z=>{o&&o({lane:D,base_sha:Y.base_sha,path:H.script,base_ref:Y.base_ref},Z.currentTarget)}}
    ></button>`}function _(){let D=s().repo_operations;return Array.isArray(D)?D:[]}function $(){let D=a().repo_ops,Y=D&&typeof D=="object"?D.repo_id:null;return typeof Y=="string"&&Y?Y:null}function R(){return _().some(D=>D&&D.kind==="deploy"&&gy.has(D.state))}function j(){let D=R(),Y=$()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${D||Y}
      title=${D?"\uBC30\uD3EC \uC9C4\uD589 \uC911":Y?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{I()}}
    >
      배포 실행
    </button>`}function G(){let D=s().repo_ops_opt_out;return{verify:D?.verify===!0,deploy:D?.deploy===!0}}function ie(D,Y){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!Y}
        @change=${H=>{M(D,!H.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function ee(D){let Y=typeof D.base_sha=="string"?D.base_sha:"",H=`${D.source_path||"repo-ops/config.toml"} @ ${D.base_ref||"?"}${Y?`@${Y.slice(0,7)}`:""}`,Z=G(),Oe=!!D.verify&&Z.verify,we=!!D.deploy&&Z.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${H}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Oe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${D.verify?c`${g("verify",D,D.verify)}
              ${p(D.verify.timeout_ms)}
              ${Oe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Oe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":D.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${D.verify?ie("verify",Z.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${we?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${D.deploy?c`${g("deploy",D,D.deploy)}
              ${p(D.deploy.timeout_ms)}
              ${we?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):j()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${we?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":D.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${D.deploy?ie("deploy",Z.deploy):""}
      </div>
    </section>`}function F(D){let Y=D.repo_ops&&typeof D.repo_ops=="object"?D.repo_ops:null;return Y&&(Y.status==="resolved"||Y.status==="absent")?ee(Y):Y&&(Y.status==="pending"||Y.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${Y.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${Y.error_code?c` — <code>${Y.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function M(D,Y){if(!n)return;let H=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:Y,expected_revision:i()});if(l(H),H&&H.conflict){let Z=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:Y,expected_revision:i()});l(Z)}r()}async function I(){let D=$();if(!n||D===null)return;let Y=await n("worker-repo-operation-deploy-run",{repo_id:D});if(l(Y),!Y||Y.ok!==!0){let H=Y&&typeof Y.reason=="string"?Y.reason:"",Z=Object.hasOwn(Yp,H)?Yp[H]:H||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";de(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${Z}`,"error")}else de("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let W={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function K(D,Y,H){return c`<div class="worker-repo-ops__policy-group" data-policy=${H}>
      <div class="worker-repo-ops__policy-label">${D}</div>
      <ul class="worker-repo-ops__policy-list">
        ${Y.map(Z=>c`<li data-token=${Z}>
              ${W[Z]||Z}
            </li>`)}
      </ul>
    </div>`}function ne(){let D=s(),Y=D.repo_operation_policy&&typeof D.repo_operation_policy=="object"?D.repo_operation_policy:null;return Y?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(Y.worker_automatic||[]).length} · 금지
            ${(Y.never_automatic||[]).length}</span
          >
        </summary>
        ${Y.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${Y.schema_version})`}
            </div>`:""}
        ${K("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Y.worker_automatic||[],"worker-automatic")}
        ${K("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Y.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${F(a())} ${ne()}
      </details>`}}}var Zp=20,hy=5,by=new Set(["failed","running","queued","retry_pending"]),Qp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function yy(e,t,n=Zp){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function vy(e){if(e.type==="cleanup")return!0;let t=e.operation;return by.has(t.state)&&!t.dismissed&&!t.superseded_by}function ky(e,t,n={}){let r=yy(e,t,1/0),o=n.expanded===!0?Zp:hy,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||vy(l));return{visible:i,hidden:r.length-i.length}}function Xp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function wy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Jp(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Cs(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function ef(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function $y(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function xy(e,t){let n=zd(e,t),r=Hd(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Ay(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Sy(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Yt(e.at):""}
      >${Ls(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Xp(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Qp,n.kind)?Qp[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${Os(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${vr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Xp(e)}"
          >${wy(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?ef(Wd(n.failure_kind,o)):""}
      ${xy(n,$y(t,n))}
      ${Ay(n)}
      ${Jp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Os(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function Ey(e){let t=e.cleanup,n=kr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Yt(e.at):""}
      >${Ls(e.at)||"\u2014"}</span
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
        ${iu(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${ef(ar(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${Jp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ty(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Ey(r):Sy(r,e.repo_ops))}
        </ul>`}
    ${t>0||n?c`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function tf(e,t={}){let n=null;function r(){if(n===null){at(c``,e);return}let i=ky(n.operations,n.cleanup_failures,{expanded:n.expanded});at(Ty({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var Cy="session-preferred",Ry=["exclusive_machine","iterative_user_judgment","visual_verification"];function nf(e,t){if(!Yo(e).includes(Cy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Ry.includes(n)?n:""}var Oy=Pt("views:worker:adapter"),Ly="tab:worker:ready",Iy="tab:worker:blocked",My="tab:worker:in-progress",Py="tab:worker:resolved",Dy="tab:worker:closed",Ny="\u{1F512} blocked",qy={revision:0,auto_advance:!1,auto_merge:!1,slots:Gs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Fy=["claude_account","codex_account"],jy=[...zr,...Fy];function By(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Uy(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}function Wy(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Fs}: ${n}`:Fs}function Er(e){return e&&typeof e=="object"?e:{}}function zy(e){let t={};for(let n of jy){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Hy(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function rf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Dr(n):null,l=new Map,a={},u=null,d=0,p=null,g=!1;function _(){g||!s||s()}function $(I){return u===I?a:{}}async function R(){if(!r||g)return;let I=o?.()||"";if(u===I||p&&p.key===I&&p.generation===d)return;let W=++d;p={key:I,generation:W};let K=null;try{K=await Promise.resolve(r("get-session-defaults",{}))}catch(ne){if(W!==d)return;p=null,Oy("get-session-defaults failed: %o",ne),_();return}W===d&&(a=K&&typeof K.values=="object"&&K.values!==null?{...K.values}:{},u=I,p=null,_())}function j(){u=null,d+=1,R()}function G(){for(let[I,W]of l)W==="failed"&&l.delete(I)}function ie(I,W){return i?i.selectBoardColumn(I,W):[]}function ee(I,W,K,ne){let D=Array.isArray(I.queue)?I.queue:[],Y=new Set([...D.map(q=>q.bead_id),...(Array.isArray(I.serial_lanes)?I.serial_lanes:[]).flatMap(q=>(Array.isArray(q?.entries)?q.entries:[]).map($e=>$e.bead_id)),...(Array.isArray(I.pr_wait)?I.pr_wait:[]).map(q=>q.bead_id),...(Array.isArray(I.done)?I.done:[]).map(q=>q.bead_id)]),H=new Set(K.map(q=>q.id)),Z=new Set,Oe=[];for(let q of[...W,...K])Y.has(q.id)||Z.has(q.id)||By(q)||(Z.add(q.id),Oe.push(q));let we=Wp(Oe,Sr(ne)),ce=Er(I.bead_scope);return we.map(q=>{let $e=Mr(q),Se=$e.evidence==="published",E=typeof q.workflow?.route=="string"&&q.workflow.route||(q.metadata&&typeof q.metadata.route=="string"?q.metadata.route:""),J=E==="quick_fix",Ce=!Object.hasOwn(q,"description")||typeof q.description=="string"&&q.description.trim().length>0,fe=Object.hasOwn(q,"labels")&&Ip(q.labels),xe=fe||!Object.hasOwn(q,"labels")?"":nf(q.labels,q.metadata),me=q.metadata&&typeof q.metadata=="object"?Object.hasOwn(q.metadata,"awaiting_user"):!1,Ue=!fe&&!me&&(J?Ce:Se&&!$e.conflict),dt=H.has(q.id),Pe=dt?Uy(q):[],B=[];dt&&Pe.length===0&&B.push(Ny),me&&B.push(Wy(q.metadata)),J&&!Ce?B.push("missing_description"):!J&&$e.conflict?B.push("spec_id_conflict"):!J&&$e.evidence==="none"?B.push("spec \uC5C6\uC74C"):!J&&$e.evidence==="draft"&&B.push("spec \uBBF8\uBC1C\uD589(draft)");let ue=ce[q.id];return{bead_id:q.id,title:q.title||q.id,route:E,spec_id:$e.conflict?"":$e.path,published:Se,blocked:dt,blocked_by:Pe,labels:Array.isArray(q.labels)?q.labels:[],created_at:q.created_at,updated_at:q.updated_at,status:q.status,workflow:q.workflow||null,exec_pins:zy(Er(q.metadata)),rec:null,...ue&&Array.isArray(ue.scope)?{scope:ue.scope}:{},eligible:Ue,reason:B.join(" \xB7 "),worker_ineligible:fe,session_preferred:xe.length>0,session_preferred_reason:xe,release_info:q.release_info,dependents_info:q.dependents_info}})}function F(I){let[W,K,ne,D,Y]=I,H=cs([...W,...K,...ne,...D,...Y]),Z={},Oe=(we,ce)=>{if(!we||typeof we.id!="string"||we.id.length===0)return;let q=Z[we.id]||(Z[we.id]={});if(typeof we.priority=="number"&&!("priority"in q)&&(q.priority=we.priority),typeof we.from_id=="string"&&!("from_id"in q)&&(q.from_id=we.from_id),ce&&!("metadata"in q)){q.metadata=Er(we.metadata);let $e=Er(we.workflow).route;typeof $e=="string"&&$e.length>0&&(q.route=$e)}};for(let we of[...W,...K,...ne])Oe(we,!0);for(let we of[...D,...Y])Oe(we,!1);for(let we of new Set([...Object.keys(Z),...H.keys()])){let ce=us(H,we);if(ce.total>0){let q=Z[we]||(Z[we]={});q.rollup=ce}}return Z}function M(I,W,K,ne){let D=new Set((Array.isArray(I.done)?I.done:[]).map(H=>H?.bead_id).filter(H=>typeof H=="string")),Y=[];for(let H of W){let Z=Jn(H.closed_at);if(typeof H.id!="string"||D.has(H.id)||Z===null||ne!==void 0&&Z<ne||typeof H.comment_count!="number"||H.comment_count<=0)continue;let Oe=`${K}\0${H.id}\0${String(H.updated_at)}\0${H.comment_count}`,we=l.get(Oe);if(we===void 0&&r&&(l.set(Oe,"pending"),Promise.resolve(r("get-comments",{id:H.id})).then(q=>{let $e=Array.isArray(q)&&q.some(Se=>ci(typeof Se?.text=="string"?Se.text:"")?.lane==="session");l.set(Oe,$e?"session":"not-session"),_()}).catch(()=>{l.set(Oe,"failed"),_()})),we!=="session")continue;let ce=Jn(H.started_at);Y.push({id:H.id,title:H.title||H.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:ce!==null&&Z>=ce?Z-ce:null,work_kind:"session",done_at:Z,created_at:H.created_at,updated_at:H.updated_at})}return Y}return{read(I){if(!t)return{workspaces:[],workspaces_state:[]};let W=t.get()||qy,K=o?.()||"",ne=I&&typeof I.done_since=="number"?I.done_since:void 0,D=ie(Ly,"ready"),Y=ie(Iy,"blocked"),H=ie(My,"in_progress"),Z=ie(Py,"resolved"),Oe=ie(Dy,"closed");return{workspaces:[{...W,bead_titles:{...Er(W.bead_titles),...Object.fromEntries([...D,...Y].filter(we=>we&&typeof we.id=="string").map(we=>[we.id,we.title||we.id]))},root_dir:K,name:Hy(K),runnable:ee(W,D,Y,I?I.candidate_sort:void 0),session_done:M(W,Oe,K,ne),bead_overlay:F([D,Y,H,Z,Oe])}],workspaces_state:[{root_dir:K,revision:W.revision,auto_advance:W.auto_advance,auto_merge:W.auto_merge,slots:typeof Er(W.workspace_info).slots=="number"?Er(W.workspace_info).slots:W.slots,runner_catalog:W.runner_catalog,execution_defaults:W.execution_defaults,session_defaults:$(K),orchestration_model:W.orchestration_model,orchestration_effort:W.orchestration_effort,orchestration_speed:W.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){R()},refreshSessionDefaults:j,notifyIssuesChanged:G,destroy(){g=!0,d+=1,p=null,l.clear()}}}var Ai=1,of=5,Gy={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Ai,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function un(e){return e&&typeof e=="object"?e:{}}var lf="beads-ui.worker.candidate-filter",ol={show_blocked:!1,spec:"all"};function Ky(){try{let e=window.localStorage.getItem(lf);if(!e)return{...ol};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ol};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...ol}}}function Yy(e){try{window.localStorage.setItem(lf,JSON.stringify(e))}catch{}}var Vy=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],cf="bdui.worker.done-range";function Qy(){try{let e=window.localStorage.getItem(cf);return e===null?"today":Ln(e)}catch{return"today"}}function Xy(e){try{window.localStorage.setItem(cf,e)}catch{}}function sf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Zy(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function af(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Jy(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function ev(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function tv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var nv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),rv=new Set(["waiting_metadata","reviewing","retrying"]);function ov(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Yt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function sv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function iv(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=sv(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Ar(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!nv.has(e.phase)}}function av(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function lv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=av(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";return e.review_session?.active===!0?n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0}):e.review_session?.failure?n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${Zy(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0}):n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${af(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${af(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function cv(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,p=null,g=null,_={},$=!1,R=!1,j={},G=null,ie={active:!1,failure:null}){let ee=!!a&&a.position>0,F=!!a?.continuation_action&&a.continuation_action.continuation===null,M=!!a&&a.active===!0,I=a&&a.failure||null,W=ev(a?a.waiting:null),K=n[e]||null,ne=K&&K.gate?K.gate:null,D=K&&K.pr?K.pr:null,Y=tv(a?a.resolution:null),H=ov(g),Z=iv(g,H),Oe=a&&a.authority||null,we=!!g&&typeof g=="object"&&rv.has(g.phase),ce=ee&&!M&&(!Oe||we||Oe.source==="automatic"&&!R),q=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Y?Y.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":W,$e=!!ne&&ne.base_badge==="\uCDA9\uB3CC",Se=!!ne&&ne.enabled===!0,E=Ao({bead_id:e,merge_sha:j.merge_sha,cleanup_cursor:j.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:j.repo_operations}),J=zs(E),Ce=s&&!E&&(s.queueing??null)?s.queueing:null,fe=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!ne&&ne.tier==="merged",xe=r&&r.step==="repo_operations"&&E?.failed===!0&&(E.step==="deploy"||E.step==="verify")?E.step:null,me=l&&!!r&&!!ne&&ne.tier==="merged",Ue=ce&&(Se||$e||ne?.reason==="base_behind"||ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale"||fe||me),dt=ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale",Pe=l&&$e&&u===!1,B=Gn(_,e,{external:l,merge_active:M||E?.step==="merge",merge_queued:ee,conflict_active:!!i,cleanup_active:J,merged:!!r||ne?.tier==="merged"}),ue=!!B.operation,se=ee&&!I&&!F&&!fe&&!(Z&&Z.lock_actions),ae=lv({auto_pending:se,continuation_required:F,queueing:Ce,merge_step:E,conflict_badge:q,conflict_live:Y?.live===!0||i==="running",auto_resolution:H,recovery:Z,cleanup_failed:r,cleanup_label:r?kr(r.step):null,base_exception:p,conflicting:$e,gate:ne,receipt_check:K&&K.receipt_check?K.receipt_check:null,queue_failure:I,auto_skip:d,queued:ee,queue_active:M,queue_position:a?a.position:0,review_session:ie,activity:q?null:s&&s.activity||null}),Ee=ae?.live===!0&&ae.title?c`<span title=${ae.title}>${ae.label}</span>`:ae?.label||null;return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&E?.active!==!0?Ws(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,...G?{dependency_chips:G}:{},external:l,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:ae?.live!==!0&&ae?.title?ae.label:null,completion_title:ae?.title||"",...g?.phase==="needs_human"&&typeof g.log_path=="string"&&g.log_path.length>0?{log_path:g.log_path}:{},badges:Ee?[Ee]:[],live_badge:ae?.live===!0?Ee:null,usage:o,alert:ae?.alert===!0,merge_action:ne?.tier==="merged"&&!fe&&!me?!1:!ee||F||ce||dt,cancel_action:ee&&!F,cancel_enabled:!M&&!(Z&&Z.lock_actions),cancel_title:Z&&Z.lock_actions?`${Z.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:M?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:B,discard_action:B.action,merge_step:E,discard_enabled:B.enabled,discard_title:B.title,merge_enabled:!E&&!Ce&&!i&&!ue&&!p&&!(Z&&Z.lock_actions)&&!Pe&&ie.active!==!0&&(Se||$e||ne?.reason==="base_behind"||ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale"||fe||me||Ue||we&&!M),merge_label:F?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":fe||me?xe==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":xe==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":$e&&!E&&!fe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":ne?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ce?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ue?B.error?`\uD3D0\uAE30 \uC2E4\uD328: ${B.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${B.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:F?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ce?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":E?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${E.label}`:xe?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${xe==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Pe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":$e?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ie.active===!0?"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":ne?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Se?`\uBA38\uC9C0 (${ne.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:ne&&ne.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${ne&&ne.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function sl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:p}=t,g=r?Dr(r):null,_=Ky(),$=null,R=null,j=null,G={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},ie=new Map,ee=new Map,F=jp(),M=nl(F)===null,I=d?Ln(d):Qy();function W(){let w=Rr.find(k=>k.value===I);return w?w.label:"\uC624\uB298"}let K=gi("beads-ui.worker.lane-collapsed"),ne=!1,D=new Set,Y=new Set,H=new Set,Z=new Set,Oe=new Set,we=null,ce=[],q=rf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>be()});function $e(){q.refreshSessionDefaults()}let Se=document.createElement("div");Se.className="worker-console";let E=document.createElement("div");E.className="worker-top";let J=document.createElement("div");J.className="worker-drawer-overlay",J.hidden=!0;let Ce=document.createElement("div");Ce.className="worker-drawer-overlay__backdrop";let fe=document.createElement("div");fe.className="worker-drawer-host";let xe=document.createElement("div");xe.className="worker-drawer-host",xe.hidden=!0,J.append(Ce,fe,xe);let me=document.createElement("div");me.className="worker-lanes-host",Se.append(E,J,me),e.appendChild(Se);let Ue=sr(null,null),dt=[],Pe=bi({transport:n,console_el:Se,getLanes:()=>Ue,getWorkspaces:()=>dt,getCrossLanes:()=>null,reproject:()=>({lanes:st(),raw_lanes:null}),onCorrection:()=>{},showToast:de,requestRender:()=>be(),adoptQueue:(w,k)=>{o&&o.set(k)},onDragBegin:()=>{$=null}}),B=null,ue=Jr(fe,{transport:n,sessionLogStore:s,onClose:()=>{B=null,J.hidden=!0,be()}}),se=tf(xe,{onClose:()=>{xe.hidden=!0,J.hidden=!0,be()}}),ae=Kp({getWorkspacePath:l||(()=>"")}),Ee=l&&l()||"",_e=Vp({queueStore:o,transport:n,onChanged:()=>be(),onOpenScript:(w,k)=>{ae.open(w,k)}});function Le(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ai,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Ze(){let w=Le(),k=typeof w.serial_lane_count=="number"&&Number.isInteger(w.serial_lane_count)&&w.serial_lane_count>0?Math.min(w.serial_lane_count,5):0,S=Array.isArray(w.serial_lanes)?w.serial_lanes:[],oe=[];for(let He of S){if(oe.length>=k)break;!He||typeof He.id!="string"||!/^s[1-5]$/.test(He.id)||!Array.isArray(He.entries)||oe.push({id:He.id,label:`\uC9C1\uB82C ${He.id.slice(1)}`,count:He.entries.length})}return oe.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(w.queue)?w.queue:[]).length},...oe]}function Ge(w){if(!$||!w.some(S=>S.id===$))return null;let k=Ze();return k?{bead_id:$,lanes:k}:null}function ze(){return l&&l()||""}async function te(w,k){await Pe.sendOp({type:"worker-queue-place",payload:{bead_id:w,...k==="parallel"?{}:{lane:k}},root_dir:ze()},w)}function z(){let w=Le();return typeof w.revision=="number"?w.revision:0}function Ae(w){w&&w.queue&&o&&o.set(w.queue)}async function lt(w){if(!n||!w)return;let k=await n("worker-attempt-pause",{attempt_id:w});k&&k.paused===!1&&k.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function x(w){if(!n||!w)return;let k=await jr();if(k===null)return;let S=async(ve={})=>await n("worker-attempt-resume",{attempt_id:w,expected_revision:z(),...k!==""?{instructions:k}:{},...ve}),oe=await S();Ae(oe),oe&&oe.conflict&&(oe=await S(),Ae(oe)),oe=await Bn(oe,(ve,He)=>S({continuation:ve,decision_token:He}),{onResult:Ae,refresh:()=>S()}),oe&&oe.resumed===!1&&!oe.conflict&&oe.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${oe.reason}`,"error",2400)}async function U(w,k,S=!0){if(!n)return null;let oe=n,ve=await oe(w,{...k,expected_revision:z()});return Ae(ve),ve&&ve.conflict&&S&&(ve=await oe(w,{...k,expected_revision:z()}),Ae(ve)),ve}async function he(w){if(!n||!w)return;let k=Le().merge_queue?.find(oe=>oe.bead_id===w)?.continuation_action;if(k?.mismatch&&k.continuation===null){await ut(w,k.mismatch);return}D.add(w),be();let S;try{S=await U("worker-merge-queue-add",{bead_id:w})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{D.delete(w),be()}if(!(!S||S.applied)){if(S.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(Jy(S.reason),"error",2400)}}async function De(w){if(!(!n||!w||Y.has(w))){Y.add(w),be();try{let k=await n("worker-cleanup-retry",{bead_id:w,expected_revision:z()});Ae(k),k&&!k.retried&&!k.conflict&&k.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${k.reason}`,"error",2400)}finally{Y.delete(w),be()}}}async function Fe(w,k){let S=Le().hold;if(!n||!S||typeof S.since!="number")return;let oe=await n(w,{since:S.since});Ae(oe),oe&&oe.ok===!1&&de(`${k}: ${oe.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":oe.reason||""}`,"error",2800)}async function Be(w,k){if(!n||!w||!k)return;let S=await n("worker-parked-retry",{bead_id:w,attempt_id:k});Ae(S),S&&S.ok===!1&&de(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${S.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":S.reason||""}`,"error",2800)}async function ut(w,k){let S=await Bn({continuation_mismatch:k},(ve,He)=>U("worker-merge-queue-add",{bead_id:w,continuation:ve,decision_token:He},!1)),oe=S?.queue?.merge_queue?.find(ve=>ve.bead_id===w)?.continuation_action;if(S?.applied!==!0&&oe?.continuation===null&&oe.mismatch){await ut(w,oe.mismatch);return}S&&S.applied===!1&&!S.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function At(w){if(!n)return;let k=await U("worker-merge-auto-toggle",{on:w});!k||k.conflict||de(w?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",w?"success":"info",2400)}async function Dt(w){if(!n||!w)return;let k=await U("worker-merge-queue-remove",{bead_id:w});k&&!k.conflict&&!k.applied&&k.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Wt(){await U("worker-merge-queue-remove",{all:!0})}async function jt(w,k=null,S="unmerged",oe=null){if(!n||!w)return;let ve=wo(w,S);if(!(!!oe||typeof globalThis.confirm!="function"||globalThis.confirm(ve)))return;let ot=await n("worker-discard",{bead_id:w,...k?{attempt_id:k}:{},...oe?{operation_id:oe}:{},expected_revision:z()});if(Ae(ot),ot&&ot.conflict&&(ot=await n("worker-discard",{bead_id:w,...k?{attempt_id:k}:{},...oe?{operation_id:oe}:{},expected_revision:z()}),Ae(ot)),ot&&ot.discarded===!0){de(Is(ot),"success",5e3);return}if(ot&&ot.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${ot.reason}`,"error",2800);return}if(ot&&ot.accepted&&ot.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ot&&ot.accepted&&!ot.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${ot.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ot&&!ot.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ht(w,k,S){if(!(!n||!k||!S||Z.has(k))){Z.add(k),be();try{let oe=await n(w,{bead_id:k,action_id:S,expected_revision:z()});Ae(oe),oe?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!oe?.ok&&oe?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(oe.reason)}`,"error",2800)}finally{Z.delete(k),be()}}}async function Ye(w,k){if(!n||!k||H.has(k))return;H.add(k),be();let S;try{let oe=async(ve={})=>await n(w,{bead_id:k,expected_revision:z(),...ve});S=await oe(),Ae(S),S&&S.conflict&&(S=await n(w,{bead_id:k,expected_revision:z()}),Ae(S)),w==="worker-revise-fix"&&(S=await Bn(S,(ve,He)=>oe({continuation:ve,decision_token:He}),{onResult:Ae,refresh:()=>oe()}))}finally{H.delete(k),be()}if(!(!S||S.conflict)){if(S.ok){de(w==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${S.reason||""}`,"error",3e3)}}async function L(w){if(!n)return;let k=await n("worker-automation-toggle",{on:w,expected_revision:z()});Ae(k),k&&k.conflict&&await n("worker-automation-toggle",{on:w,expected_revision:z()}).then(Ae)}async function re(w){if(!n||!w)return;let k=await n("worker-repo-operation-dismiss",{operation_id:w});Ae(k),k&&k.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${k.reason||""}`,"error",3e3)}async function ge(w){if(!n||!Number.isFinite(w))return;let k=Math.max(Ai,Math.floor(w)),S=await n("worker-queue-set-slots",{slots:k,expected_revision:z()});Ae(S),S&&S.conflict&&await n("worker-queue-set-slots",{slots:k,expected_revision:z()}).then(Ae)}async function O(w){if(!n||!Number.isInteger(w)||w<1||w>of)return;let k=Le(),S=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).slice(w).reduce((He,ot)=>He+(Array.isArray(ot?.entries)?ot.entries.length:0),0),oe=()=>({count:w,expected_revision:z()}),ve=await n("worker-queue-set-serial-lane-count",oe());Ae(ve),ve&&ve.conflict&&(ve=await n("worker-queue-set-serial-lane-count",oe()),Ae(ve)),ve&&ve.applied&&S>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${S}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let X="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Ne(w,k){let S=Xa(w,k.id,G);return{id:k.id,title:k.title,location_label:k.location_label,prefixes:k.prefixes,action:S.kind==="note"?{kind:"note",text:S.text}:S.kind==="disabled"?{kind:"disabled",label:X,title:S.title}:{kind:"place",label:X,title:S.title}}}function Ve(w,k){if(!R||R.bead_id!==w)return null;let S=R.counterpart_id,oe=k.filter(ve=>ve.id===S);return oe.length===0?null:{rows:oe.map(ve=>Ne(w,ve))}}async function qe(w,k){let S=Xa(w,k,G);if(R=null,S.kind!=="ops"){be();return}let oe=z();for(let ve of S.ops){let He=await ct(ve,oe);if(He===null)break;oe=He}be()}async function ct(w,k){if(!n)return null;try{let S=await n("worker-queue-place",{bead_id:w.bead_id,lane:w.lane,index:w.index,expected_revision:k});if(Ae(S),S&&S.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!S||S.applied!==!0)return de(S&&typeof S.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${S.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let oe=S.queue?S.queue.revision:void 0;return typeof oe!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):oe}catch(S){return de(S instanceof Error&&S.message?S.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function st(){let w=gr(I),k=q.read({candidate_sort:F,done_since:w});return dt=k.workspaces,Ue=sr(k.workspaces,k.workspaces_state,{done_since:w,candidate_filter:_,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),Ue}function We(w){return w.queue_groups[0]||Gy}function et(w){let k=w.dependency_chips||null,S={...k&&k.released?{released:k.released}:{},...k&&k.dependents?{dependents:k.dependents}:{}},oe=ie.get(w.id),ve=ee.get(w.id)||null,He=oe&&oe.overlaps.length>0?oe.overlaps:null,ot=!!oe&&oe.scope_missing;if(!ve&&!He&&!ot&&Object.keys(S).length===0)return null;let $t=He?Ve(w.id,He):null;return{...S,...ve?{predecessors:ve}:{},...He?{overlaps:He}:{},...ot?{scope_missing:!0}:{},...$t?{popover:$t}:{}}}function kt(w){return{...w,workspace_name:"",done_layout:void 0,dependency_chips:et(w)||void 0}}function Ke(){let w=Le(),k=new Map;for(let S of Object.values(un(w.lane_states))){let oe=Array.isArray(S?.corrections)?S.corrections:[];for(let ve of oe)ve&&typeof ve.bead_id=="string"&&typeof ve.after=="string"&&k.set(ve.bead_id,ve.after)}return{admission:un(w.admission),bead_labels:un(w.bead_labels),correction_after:k}}function Ot(w,k){let S=kt(w),oe=nu(k.admission[w.id]||null,!!w.discard||Z.has(w.id)),ve=k.bead_labels[w.id],He=k.correction_after.get(w.id);return{...S,draggable:S.draggable===!0&&!oe,stale_work:oe,reason:oe?"":S.reason,worker_serial:Array.isArray(ve)&&Mp(ve),badges:He?[`\u{1F517} ${He} \uB4A4 (blocks \uC790\uB3D9)`,...S.badges||[]]:S.badges,revise_enabled:S.revise_enabled===!0&&!H.has(w.id)}}function Je(w){let k=Ke();return We(w).sublanes.parallel.map(S=>Ot(S,k))}function rt(w){let k=Ke();return We(w).sublanes.serial.map(S=>{let oe=S.occupants.map(ve=>({id:ve.id,title:ve.title,draggable:!1,lane:S.id,ghost:!0,badges:[ve.badge]}));return{id:S.id,index:S.index+1,raw_length:S.raw_length,ghosts:oe,items:S.items.map(ve=>Ot(ve,k)),occupied:S.occupied_by.length>0,badge:S.occupants.length>0?S.occupants[0].badge:"\uB300\uAE30",cycle:S.cycle===!0}})}function Bt(w){return w.runnable.map(k=>kt(k))}function Mt(w){return w.done.map(k=>kt(k))}function Tt(w){let k=w.running.filter(S=>S.non_occupying!==!0).map(S=>({...S,bead_id:S.id,attempt_id:S.attempt_id||"",paused:S.run_state==="paused",failed:S.run_state==="failed",parked:S.run_state==="parked",retry_wait:S.run_state==="retry_wait",status_label:S.run_state==="failed"?S.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":S.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":S.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":void 0,can_pause:S.can_pause!==!1,workspace_name:"",dependency_chips:et(S)||void 0,rollup_expanded:Oe.has(S.id),failure:S.failure?{...S.failure,open:j===S.attempt_id}:null}));return[...k.filter(S=>S.failed===!0),...k.filter(S=>S.failed!==!0&&S.parked===!0),...k.filter(S=>S.failed!==!0&&S.parked!==!0)]}function Ht(w){if(we&&we.model===w)return we.rows;let k=Le(),S=We(w),oe=un(k.attempts),ve=Object.values(oe).filter(zn),He=new Map;for(let ke of ve)He.set(ke.attempt_id,ke);let ot=new Map;for(let ke of ve)ot.set(ke.bead_id,ke);let $t=new Map;for(let ke of[...w.pr_wait,...w.running,...w.queue,...w.runnable,...w.done])$t.has(ke.id)||$t.set(ke.id,ke);let Xe=ke=>{let v=null;for(let Q of ve)!Q||Q.bead_id!==ke||ma(Q,He)||(v===null||(typeof Q.started_at=="number"?Q.started_at:0)>=(typeof v.started_at=="number"?v.started_at:0))&&(v=Q);return v&&typeof v.target_base=="string"?v.target_base:null},Nt=new Map;for(let ke of w.running)ke.run_state==="failed"||ke.conflict_resolution!==!0||(ke.run_state!=="paused"?Nt.set(ke.id,"running"):Nt.has(ke.id)||Nt.set(ke.id,"paused"));let en=un(k.auto_merge_skips),Cn=new Set(S.merge.auto_excluded),ur=un(k.pr_observations),Rn=un(k.pr_activity),Nn=un(k.cleanup_failed),Qt=un(k.discard_operations),Xn=un(k.bead_workflow),Tr=un(k.bead_titles),On=k.merge_queue_state||{active:null,failures:{}},qn=S.merge.state.waiting,Zn=(Array.isArray(k.pr_wait)?k.pr_wait:[]).map(ke=>{let v=$t.get(ke.bead_id);return{...cv(ke.bead_id,v?.title||Tr[ke.bead_id]||ke.bead_id,ur,Nn[ke.bead_id]||null,Wn(oe,ke.bead_id),Rn[ke.bead_id]||(D.has(ke.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:Y.has(ke.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Nt.get(ke.bead_id)||null,ke.external===!0,{position:S.merge.positions.get(ke.bead_id)||0,active:On.active===ke.bead_id,failure:un(On.failures)[ke.bead_id]||null,waiting:qn&&qn.bead_id===ke.bead_id?qn.reason:null,resolution:S.merge.resolutions.get(ke.bead_id),continuation_action:S.merge.continuations.get(ke.bead_id),authority:S.merge.authorities.get(ke.bead_id)||null},ke.wt_present!==!1,k.auto_merge===!0&&Cn.has(ke.bead_id)?en[ke.bead_id]?.reason||"":null,_a(S.declared_base,Xe(ke.bead_id)),un(k.completion_status)[ke.bead_id]||null,Qt,ot.get(ke.bead_id)?.worker_serial===!0,k.auto_merge===!0,{merge_sha:ke.merge_sha,cleanup_cursor:ke.cleanup_cursor,repo_operations:S.repo_operations},v?et(v):null,Zc(oe,ke.bead_id)),workflow:Xn[ke.bead_id]||null,priority:v?.priority,from_id:v?.from_id,...v?.created_at===void 0?{}:{created_at:v.created_at},...v?.updated_at===void 0?{}:{updated_at:v.updated_at}}});return we={model:w,rows:Zn},Zn}function nn(w){let k=We(w),S=[];for(let Xe of w.running)Xe.non_occupying!==!0&&S.push({id:Xe.id,title:Xe.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Xe.serial_lane_id??null});for(let Xe of w.pr_wait)S.push({id:Xe.id,title:Xe.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Xe of k.sublanes.serial)Xe.items.forEach((Nt,en)=>{S.push({id:Nt.id,title:Nt.title,location_label:`${Xe.id} #${en+1}`,kind:"serial",lane_id:Xe.id})});k.sublanes.parallel.forEach((Xe,Nt)=>{S.push({id:Xe.id,title:Xe.title,location_label:`#${Nt+1}`,kind:"parallel",lane_id:null})});for(let Xe of w.runnable)S.push({id:Xe.id,title:Xe.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Xe.queue_placeable===!0});let oe=new Map;for(let Xe of S)oe.has(Xe.id)||oe.set(Xe.id,Xe);let ve={},He=new Set;for(let Xe of k.sublanes.serial)ve[Xe.id]=Xe.raw_length,Xe.occupied_by.length>0&&He.add(Xe.id);G={members_by_id:oe,serial_raw_lengths:ve,serial_lane_count:k.serial_lane_count,occupied_lanes:He};let ot=Le();ie=Fd(ot.bead_scope,S);let $t=new Map;for(let Xe of[...w.running,...w.runnable])Array.isArray(Xe.blocked_by)&&Xe.blocked_by.length>0&&$t.set(Xe.id,Xe.blocked_by);for(let[Xe,Nt]of Object.entries(un(ot.bead_blocked_by)))Array.isArray(Nt)&&$t.set(Xe,Nt.filter(en=>typeof en=="string"&&en.length>0));ee=uu($t,S,un(ot.blocker_workspaces))}function Gt(w){let k=w.hold&&typeof w.hold=="object"?w.hold:null;if(!k||k.kind!=="env"&&k.kind!=="systemic")return"";let S=ar(k.cause)||String(k.cause||""),oe=Array.isArray(w.lineages)?w.lineages:[];if(k.kind==="env"){let He=oe.map($t=>$t&&$t.next_at).filter($t=>typeof $t=="number").sort(($t,Xe)=>$t-Xe)[0],ot=typeof He=="number"?` \xB7 \uB2E4\uC74C ${new Date(He).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${S} — 재시도 대기${ot}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let ve=(Array.isArray(k.bead_ids)?k.bead_ids:[]).filter(He=>typeof He=="string"&&He.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${S}${ve.length>0?` \u2014 bead ${ve.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Kt(w){let k=Le(),S=We(w),oe=S.sublanes.parallel,ve=oe.length>0?oe[0].id:"\u2014",He=c`<button
      type="button"
      class="worker-play${k.auto_advance?" is-active":""}"
    >
      ${k.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ot=Vt(w),$t=S.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Xe=k.auto_advance?0:(Array.isArray(k.queue)?k.queue:[]).filter(Qt=>Qt&&typeof Qt.armed_by_lane=="string"&&Qt.armed_by_lane.length>0).length,Nt=Xe>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Xe}건 진행 중</span
          >`:"",en=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${S.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Ht(w).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${W()} 완료 <b>${w.done.length}</b></span
      >`,Cn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${S.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${S.declared_base||"?"}</span
    >`,ur=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ai}
          step="1"
          .value=${String(S.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:of},(Qt,Xn)=>Xn+1).map(Qt=>c`<option
                value=${String(Qt)}
                ?selected=${S.serial_lane_count===Qt}
              >
                ${Qt}
              </option>`)}
        </select>
      </label> `,Rn=eu(S.repo_operations,S.cleanup_failures),Nn=Gt(k);return ne?c`<div class="worker-ribbon">
          ${He} ${ot}
          <div class="worker-kpi worker-kpi--ribbon">
            ${$t}${Nt}${en}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ur}</div>
          <div class="worker-kpi">${Cn}</div>
        </div>
        ${Nn}${Rn}${_e.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${He}${ot}${ur}</div>
        <div class="worker-kpi">
          ${$t}${Nt}${en}${Cn}
          ${(Array.isArray(S.token_total)?S.token_total:S.token_total?[{label:S.token_total,tooltip:`${W()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Qt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Qt.tooltip}
                >${W()} 완료 · 누적 ${Qt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${ve}</b></span
          >
        </div>
      </div>
      ${Nn}${Rn}${_e.template()}`}function Lt(w){let k=w.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${_.show_blocked}
        />
        🔒 blocked${k.blocked>0?` ${k.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Vy.map(S=>c`<button
              type="button"
              class="worker-filter__chip${_.spec===S.value?" is-active":""}"
              data-spec=${S.value}
              aria-pressed=${_.spec===S.value?"true":"false"}
            >
              ${S.label}
            </button>`)}
        ${k.spec>0?c`<span class="worker-filter__hidden">숨김 ${k.spec}</span>`:""}
      </div>
    </div>`}function bn(){let w=M?"custom":nl(F)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${w}
    >
      ${Vo.map(k=>c`<option value=${k.id} ?selected=${w===k.id}>
            ${k.label}
          </option>`)}
      <option value="custom" ?selected=${w==="custom"}>
        사용자 지정…
      </option>
    </select>`}function Xt(){let w=Qo(F);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(k=>{let S=w[k];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${k}
            aria-label=${`${k+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${S?S.key:""}
          >
            ${k===0?"":c`<option value="" ?selected=${!S}>없음</option>`}
            ${Fp.map(oe=>c`<option
                  value=${oe.key}
                  ?selected=${!!S&&S.key===oe.key}
                >
                  ${oe.label}
                </option>`)}
          </select>
          ${S?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${k}
                aria-label=${S.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${S.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${S.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function St(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${I}
      >
        ${Rr.map(w=>c`<option value=${w.value} ?selected=${I===w.value}>
              ${w.label}
            </option>`)}
      </select>
    </div>`}function Vt(w){let k=We(w).merge,S=Le().auto_merge===!0;if(k.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${S?" is-active":""}"
        title=${S?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${S?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${k.positions.size}
      </button>`;if(S)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let oe=new Set(k.auto_excluded),ve=Ht(w).filter(He=>He.merge_action&&He.merge_enabled&&!oe.has(He.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ve>0?` ${ve}`:""}
    </button>`}function dn(w){if(!(w.draggable!==!0||w.done===!0))return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${w.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`}function ye(w,k){return c`<div
      data-bead-id=${w.id}
      data-drag-kind=${k.kind}
      data-root-dir=${k.root_dir}
      data-lane-id=${tn(k.lane_id)}
      data-row-index=${k.row_index}
      data-queue-index=${String(w.queue_index??0)}
    >
      ${$n(w,{actions:dn(w)})}
    </div>`}function T(w){let k=Je(w),S=ze();return js({parallel:{rows:k.map((oe,ve)=>ye(oe,{kind:"parallel",root_dir:S,row_index:ve})),count:k.length,collapsed:K.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:S}},serial:{lanes:rt(w).map(oe=>({id:oe.id,title:`\uC9C1\uB82C ${oe.index}`,rows:[...oe.ghosts.map(ve=>$n(ve,{actions:dn(ve)})),...oe.items.map((ve,He)=>ye(ve,{kind:"repo-serial",root_dir:S,row_index:He,lane_id:oe.id}))],count:oe.ghosts.length+oe.items.length,empty:oe.ghosts.length+oe.items.length===0,badge:oe.badge,held:oe.occupied,cycle:oe.cycle,drop:{drop:"repo-serial",root_dir:S,lane_id:oe.id,lane_length:String(oe.raw_length)}})),collapsed:K.isAreaCollapsed("serial")}})}function h(w){return Kd(Tt(w),Date.now(),B)}function A(w){return w.running.some(k=>k.kind!=="session"&&k.run_state==="running")}function pe(w){let k=We(w),S=Bt(w),oe=Je(w),ve=Mt(w),He=Ht(w),ot=Tt(w),$t=Pn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:S,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:bn(),header_row:M?Xt():void 0,controls:Lt(w),collapsible:!0,collapsed:K.isCollapsed("candidate"),place_menu:Ge(S),onOpenDoc:u?(Nt,en)=>u(en):void 0}),Xe=Pn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:ve,empty:`${W()} \uC644\uB8CC \uC5C6\uC74C`,header_control:St(),collapsible:!0,collapsed:K.isCollapsed("done"),preview:ne?Array.isArray(k.token_total)?k.token_total.map(Nt=>Nt.label).join(" \xB7 "):k.token_total||sf(ve):void 0});return ne?c`<div class="worker-lanes worker-lanes--mobile">
        ${Bs({live:A(w),running_body:ot.length>0?h(w):"",pr_wait_rows:He.map(Nt=>$n(Nt)),count:ot.length+He.length})}
        ${Pn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:oe,count:oe.length,collapsible:!0,collapsed:K.isCollapsed("queue"),preview:sf(oe),body:T(w)})}
        ${$t} ${Xe}
      </div>`:c`<div class="worker-lanes">
      ${$t}
      ${Pn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:oe,count:oe.length,collapsible:!0,collapsed:K.isCollapsed("queue"),body:T(w)})}
      ${Pn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:ot,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${k.slots}</span
        >`,live:A(w),collapsible:!0,collapsed:K.isCollapsed("running"),body:h(w)})}
      ${Pn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:He,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:K.isCollapsed("pr_wait")})}
      ${Xe}
    </div>`}function je(w){K.toggle(w),be()}function Me(w){K.toggleArea(w),be()}function be(){let w=st();nn(w),at(Kt(w),E),at(pe(w),me)}function yt(){let w=!0,k=mi(S=>{if(ne=S,w){w=!1;return}be()});ce.push(k)}function pt(w){_=w,Yy(w),be()}function ft(w){if(w==="custom"){M=!0,be();return}F=Sr(w),rl(F),M=!1,be()}function it(w){F=Sr({chain:w}),rl(F),be()}function m(w){I=Ln(w),Xy(I),p?.(I),be()}function b(w){let k=w.target?.closest?.(".worker-serial-lane-count");if(k){let Xe=Number.parseInt(k.value,10);Number.isFinite(Xe)&&O(Xe).then(be);return}let S=w.target?.closest?.(".worker-filter__blocked");if(S){pt({..._,show_blocked:S.checked});return}let oe=w.target?.closest?.(".worker-sort-chain__key");if(oe){let Xe=Number.parseInt(oe.getAttribute("data-step")||"",10);Number.isFinite(Xe)&&it(Bp(Qo(F),Xe,oe.value));return}let ve=w.target?.closest?.(".worker-done-range");if(ve){m(ve.value);return}let He=w.target?.closest?.(".worker-sort");if(He){ft(He.value);return}let ot=w.target?.closest?.(".worker-slots__input");if(!ot)return;let $t=Number.parseInt(ot.value,10);if(!Number.isFinite($t)){be();return}ge($t).then(be)}function C(w){return w?{runner:w.runner||void 0,model:w.model||void 0,effort:w.effort||void 0,worktree:w.worktree||void 0,status:w.status||void 0,session_id:w.session_id||void 0}:{}}function P(){let w=We(st()),k=Le().workspace_info,S=k&&typeof k=="object"&&k.repo_ops&&typeof k.repo_ops=="object"?k.repo_ops:null;return{operations:w.repo_operations,cleanup_failures:w.cleanup_failures,repo:l&&l()||"",repo_ops:S}}function f(){B&&ue.close(),xe.hidden=!1,J.hidden=!1,se.open(P()),be()}function y(w){let k=Le(),S=k.attempts?k.attempts[w]:null;B=w,se.close(),xe.hidden=!0,J.hidden=!1,ue.open({attempt_id:w,meta:C(S)}),be()}function V(w){let k=Le(),S=(Array.isArray(k.session_active)?k.session_active:[]).find(ve=>ve&&ve.bead_id===w),oe=(S&&Array.isArray(S.session_refs)?S.session_refs:[]).find(ve=>ve&&ve.current===!0);oe&&(se.close(),xe.hidden=!0,J.hidden=!1,ue.open(Br(oe,w,"in_progress")),be())}function le(){if(se.isOpen()&&se.refresh(P()),!B)return;let w=Le(),k=w.attempts?w.attempts[B]:null;if(k){ue.updateMeta(C(k));return}ue.close()}function Re(w,k){if(w.length===0||!i)return;let S=l?l():void 0;if(k.length===0||!S||k===S||!a){i(w);return}Promise.resolve(a(k)).then(()=>{i(w)}).catch(()=>{de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function mt(w){let k=w.target;if(k?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let S=k?.closest?.(".worker-sort-chain__dir");if(S){let Te=Number.parseInt(S.getAttribute("data-step")||"",10);Number.isFinite(Te)&&it(Up(Qo(F),Te));return}let oe=k?.closest?.(".worker-dep__open");if(oe){Re(oe.getAttribute("data-dep-id")||"",oe.getAttribute("data-root-dir")||"");return}let ve=k?.closest?.(".mon-overlap__chip");if(ve){let Te=ve.closest("[data-bead-id]"),xt=Te&&Te.getAttribute("data-bead-id")||"";if(xt){let pn=ve.getAttribute("data-overlap-id")||"";R=!!R&&R.bead_id===xt&&R.counterpart_id===pn?null:{bead_id:xt,counterpart_id:pn},be()}return}let He=k?.closest?.(".mon-overlap__place");if(He){let Te=He.closest("[data-bead-id]"),xt=Te&&Te.getAttribute("data-bead-id")||"";xt&&qe(xt,He.getAttribute("data-counterpart-id")||"");return}if(k?.closest?.(".mon-overlap__popover"))return;if(k?.closest?.(".worker-repo-strip")){f();return}let ot=k?.closest?.(".worker-repo-op__dismiss");if(ot){re(ot.dataset.operationId||"");return}let $t=k?.closest?.(".worker-cleanup__resume");if($t){let Te=$t.dataset.beadId;Te&&De(Te);return}if(k?.closest?.(".worker-hold__retry")){Fe("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(k?.closest?.(".worker-hold__resume")){Fe("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(k?.closest?.(".worker-play")){L(!Le().auto_advance);return}let Xe=k?.closest?.(".worker-merge-all");if(Xe){Xe.classList.contains("worker-merge-all--stop")?Le().auto_merge===!0?At(!1):Wt():At(!0);return}let Nt=k?.closest?.(".worker-pane__toggle[data-lane]");if(Nt){let Te=Nt.dataset.lane;(Te==="candidate"||Te==="queue"||Te==="running"||Te==="pr_wait"||Te==="done")&&je(Te);return}let en=k?.closest?.(".worker-wait__area-toggle[data-area]");if(en){let Te=en.dataset.area;(Te==="parallel"||Te==="serial")&&Me(Te);return}let Cn=k?.closest?.(".worker-card__place-lane");if(Cn){let Te=Cn.dataset.beadId,xt=Cn.dataset.lane;Te&&(xt==="parallel"||/^s[1-5]$/.test(xt||""))&&($=null,be(),te(Te,xt));return}if(k?.closest?.(".worker-card__place-cancel")){$=null,be();return}let Rn=k?.closest?.(".worker-card__place");if(Rn){let Te=Rn.dataset.beadId;Te&&!Rn.disabled&&(Ze()?($=Te,be()):te(Te,"parallel"));return}let Nn=k?.closest?.(".worker-filter__chip");if(Nn){let Te=Nn.dataset.spec;(Te==="all"||Te==="with"||Te==="without")&&pt({..._,spec:Te});return}let Qt=k?.closest?.('[data-action="queue-remove"]');if(Qt){let Te=Qt.dataset.beadId||"";Te&&Pe.sendOp({type:"worker-queue-remove",payload:{bead_id:Te},root_dir:ze()},Te);return}let Xn=k?.closest?.(".worker-mini__merge");if(Xn){let Te=Xn.dataset.beadId||"";Le().cleanup_failed?.[Te]?De(Te):he(Te);return}let Tr=k?.closest?.(".worker-mini__merge-cancel");if(Tr){Dt(Tr.dataset.beadId||"");return}let On=k?.closest?.(".worker-mini__discard");if(On){jt(On.dataset.beadId||"",On.dataset.attemptId||null,On.dataset.discardMode==="merged"?"merged":"unmerged",On.dataset.operationId||null);return}let qn=k?.closest?.(".worker-mini__stale-continue");if(qn){ht("worker-stale-work-continue",qn.dataset.beadId||"",qn.dataset.actionId||"");return}let Zn=k?.closest?.(".worker-mini__stale-backup");if(Zn){ht("worker-stale-work-backup-fresh",Zn.dataset.beadId||"",Zn.dataset.actionId||"");return}let ke=k?.closest?.(".worker-mini__stale-recheck");if(ke){ht("worker-stale-work-recheck",ke.dataset.beadId||"",ke.dataset.actionId||"");return}let v=k?.closest?.(".worker-mini__revise-fix");if(v){Ye("worker-revise-fix",v.dataset.beadId||"");return}let Q=k?.closest?.(".worker-mini__revise-approve");if(Q){Ye("worker-revise-approve",Q.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;let N=k?.closest?.(".rtile__failure-badge");if(N){let Te=N.dataset.attemptId||"";j=j===Te?null:Te,be();return}let Ie=k?.closest?.(".rtile__attempt-copy");if(Ie){let Te=Ie.dataset.attemptId||"";Te&&on(Te).then(xt=>{de(xt?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",xt?"success":"error",1400)});return}if(k?.closest?.(".rtile__parked-retry")){let Te=k?.closest?.(".rtile");Be(Te?.dataset?.beadId||"",Te?.dataset?.attemptId||"");return}let tt=k?.closest?.(".rtile__discard");if(tt){let Te=k?.closest?.(".rtile"),xt=Te?.dataset?.beadId,pn=Te?.dataset?.attemptId;xt&&jt(xt,pn||null,tt.dataset.confirmation==="merged"?"merged":"unmerged",tt.dataset.operationId||null);return}if(k?.closest?.(".rtile__pause")){let xt=k?.closest?.(".rtile")?.dataset?.attemptId;xt&&lt(xt);return}if(k?.closest?.(".rtile__resume")){let xt=k?.closest?.(".rtile")?.dataset?.attemptId;xt&&x(xt);return}if(k?.closest?.(".rtile__session")){let Te=k?.closest?.(".rtile"),xt=Te?.dataset?.attemptId;if(xt){y(xt);return}let pn=Te?.dataset?.beadId;pn&&V(pn);return}if(k?.closest?.(".rtile__failure-pop"))return;if(k?.closest?.(".worker-drawer-overlay__backdrop")){se.close(),ue.close();return}if(k?.closest?.(".worker-drawer-host"))return;let nt=k?.closest?.(".rtile .board-card__roll-toggle");if(nt){let Te=nt.dataset.rollParent;Te&&(Oe.has(Te)?Oe.delete(Te):Oe.add(Te),be());return}let vt=k?.closest?.(".rtile .board-card__roll-child");if(vt){let Te=vt.dataset.childId;Te&&i&&i(Te);return}let Qe=k?.closest?.(".rtile");if(Qe){if(k?.closest?.(".rtile__id")){let xt=Qe.dataset.beadId;xt&&on(xt).then(pn=>{pn?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Te=Qe.dataset.beadId;Te&&i&&i(Te);return}let gt=k?.closest?.(".worker-mini, .worker-card");if(gt){let Te=gt.dataset.beadId;if(k?.closest?.('[data-seam="log-path-copy"]'))return;if(k?.closest?.(".worker-mini__id, .worker-card__id")){Te&&on(Te).then(pn=>{pn?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let xt=k?.closest?.(".ctl-chip--from");if(xt){let pn=xt.dataset.fromId;pn&&i&&i(pn);return}Te&&i&&i(Te)}}Pe.attach(e),e.addEventListener("click",mt),e.addEventListener("change",b);function Ct(w){let k=w.target,S=k&&typeof k.closest=="function"?ve=>k.closest(ve):()=>null,oe=!1;R&&!S(".mon-overlap__popover, .mon-overlap__chip")&&(R=null,oe=!0),j&&!S(".rtile__failure-pop, .rtile__failure-badge")&&(j=null,oe=!0),oe&&be()}function Dn(w){w.key!=="Escape"||!R&&j===null||(R=null,j=null,be())}return document.addEventListener("click",Ct),document.addEventListener("keydown",Dn),ce.push(()=>{document.removeEventListener("click",Ct),document.removeEventListener("keydown",Dn)}),yt(),g&&ce.push(g.subscribe(()=>{q.notifyIssuesChanged(),be()})),o&&ce.push(o.subscribe(()=>{let w=l&&l()||"";w!==Ee&&(Ee=w,ae.close()),be(),le()})),be(),{load(){q.ensureSessionDefaults(),be()},refreshSessionDefaults:$e,destroy(){for(let w of ce.splice(0))try{w()}catch{}Pe.detach(),e.removeEventListener("click",mt),e.removeEventListener("change",b),q.destroy();try{ue.destroy()}catch{}J.hidden=!0;try{ae.destroy()}catch{}at(c``,e)}}}function il(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function uf(e,t,n,r=async()=>{},o=async()=>{}){let s=Pt("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(I){let K=I.target.value,D=t.getState().workspace?.current?.path||"";if(K&&K!==D){s("switching workspace to %s",K),l=!0,M();try{await n(K)}catch(Y){s("workspace switch failed: %o",Y)}finally{l=!1,M()}}}async function p(){let I=t.getState(),W=I.workspace?.current?.path||I.workspace?.available?.[0]?.path||"";if(!(!W||a)){s("git-pulling workspace %s",W),a=!0,M();try{await r(W)}catch(K){s("workspace git pull failed: %o",K)}finally{a=!1,M()}}}function g(I){let W=I.target;W&&e.contains(W)||R()}function _(I){I.key==="Escape"&&R()}function $(){u||(u=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",_),M())}function R(){u&&(u=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",_),M())}function j(){u?R():$()}async function G(I){let W=I.target,K=W.value,ne=W.checked;s("toggling visibility %s \u2192 %s",K,String(ne));try{await o(K,ne)}catch(D){s("workspace visibility toggle failed: %o",D)}}function ie(I){return I?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${p}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function ee(I,W){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${j}
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
                ${I.map(K=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${K.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${K.path}"
                        .checked=${!W.has(K.path)}
                        @change=${G}
                      />
                      <span class="workspace-picker__manage-name"
                        >${il(K.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function F(){let I=t.getState(),W=I.workspace?.current,K=I.workspace?.available||[],ne=new Set(I.workspace?.hidden||[]),D=W?.path||K[0]?.path||"";if(K.length===0)return c``;let Y=K.filter(H=>!ne.has(H.path)||H.path===D);if(Y.length<=1){let H=Y[0]||K[0],Z=il(H.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${H.path}"
            >${Z}</span
          >
          ${ee(K,ne)}
          ${ie(D)}
          ${a?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${Y.map(H=>c`
              <option
                value="${H.path}"
                ?selected=${H.path===D}
                title="${H.path}"
              >
                ${il(H.path)}
              </option>
            `)}
        </select>
        ${ee(K,ne)}
        ${ie(D)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function M(){at(F(),e)}return M(),i=t.subscribe(()=>M()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",_),at(c``,e)}}}var df=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function al(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function pf(e,t,n=al()){return{id:n,type:e,payload:t}}function ff(e={}){let t=Pt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],p=new Map,g=new Set;function _(F){for(let M of Array.from(g))try{M(F)}catch{}}function $(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),_(s);let F=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),M=(n.jitterRatio||0)*F,I=Math.max(0,Math.round(F+(Math.random()*2-1)*M));t("ws retry in %d ms (attempt %d)",I,i+1),l=setTimeout(()=>{l=null,ee()},I)}function R(F){try{o?.send(JSON.stringify(F))}catch(M){t("ws send failed",M)}}function j(){for(s="open",t("ws open"),_(s),i=0;d.length;){let F=d.shift();F&&R(F)}}function G(F){let M;try{M=JSON.parse(String(F.data))}catch{t("ws received non-JSON message");return}if(!M||typeof M.id!="string"||typeof M.type!="string"){t("ws received invalid envelope");return}if(u.has(M.id)){let W=u.get(M.id);u.delete(M.id),M.ok?W?.resolve(M.payload):W?.reject(M.error||new Error("ws error"));return}let I=p.get(M.type);if(I&&I.size>0)for(let W of Array.from(I))try{W(M.payload)}catch(K){t("ws event handler error",K)}else t("ws received unhandled message type: %s",M.type)}function ie(){s="closed",t("ws closed"),_(s);for(let[F,M]of u.entries())M.reject(new Error("ws disconnected")),u.delete(F);i+=1,$()}function ee(){if(!a)return;let F=r();try{o=new WebSocket(F),t("ws connecting %s",F),s="connecting",_(s),o.addEventListener("open",j),o.addEventListener("message",G),o.addEventListener("error",()=>{}),o.addEventListener("close",ie)}catch(M){t("ws connect failed %o",M),$()}}return ee(),{send(F,M){if(!df.includes(F))return Promise.reject(new Error(`unknown message type: ${F}`));let I=al(),W=pf(F,M,I);return t("send %s id=%s",F,I),new Promise((K,ne)=>{u.set(I,{resolve:K,reject:ne,type:F}),o&&o.readyState===o.OPEN?R(W):(t("queue %s id=%s (state=%s)",F,I,s),d.push(W))})},on(F,M){p.has(F)||p.set(F,new Set);let I=p.get(F);return I?.add(M),()=>{I?.delete(M)}},onConnection(F){return g.add(F),()=>{g.delete(F)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,ee()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function uv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function dv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var ll=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],_f=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],lr="tab:worker:closed",pv="bdui.worker.done-range",mf=pp,gf="worker:queue",hf="ui:order",bf="ui:display-policy",yf="exec:presets",cr="tab:board:closed",vf="beads-ui.board.closed-range";function fv(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+_v(e))});return n.observe(e),()=>n.disconnect()}function _v(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function mv(e){let t=Pt("main");t("bootstrap start"),fv(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;at(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&Lp(i),l&&a&&u&&d){let Ce=function(f,y){let V="Request failed",le="";if(f&&typeof f=="object"){let mt=f;if(typeof mt.message=="string"&&mt.message.length>0&&(V=mt.message),typeof mt.details=="string")le=mt.details;else if(mt.details&&typeof mt.details=="object")try{le=JSON.stringify(mt.details,null,2)}catch{le=""}}else typeof f=="string"&&f.length>0&&(V=f);let Re=y&&y.length>0?`Failed to load ${y}`:"Request failed";J.open(Re,V,le)},Ae=function(f){return`${ye.getState().workspace.current?.path||""}\0${f}`},lt=function(){Ee&&(Ee().catch(()=>{}),Ee=null),_e=null,Le=null},U=function(f){Ze=f;let y=()=>{Ze!==f||ye.getState().selected_id!==f||(Ze=null,x(f))};if(!te){ze.then(y);return}y()},Be=function(f,y,V,le,Re){return V!==Fe[y]?(Re().catch(()=>{}),!1):(f.set(le,Re),!0)},At=function(){let f=ye.getState();Ye(f.view==="board"),Ne(f.view==="worker"),et(We(f)),qe(f.view==="board"||f.view==="worker"||ut||!!f.selected_id)},jt=function(){let f=gr(Dt);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},ht=function(){let f=gr(Wt);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},Ye=function(f){if(f)for(let[y,V]of ll){if(he.has(y)||De.has(y))continue;let le=y===cr?jt():{type:V};try{Ue.register(y,le)}catch(Ct){t("register %s store failed: %o",y,Ct)}De.add(y);let Re=Fe.board,mt=!1;me.subscribeList(y,le).then(Ct=>{mt=!Be(he,"board",Re,y,Ct)}).catch(Ct=>{t("subscribe %s failed: %o",y,Ct),Ce(Ct,"board")}).finally(()=>{De.delete(y),mt&&At()})}else ge()},ge=function(){Fe.board+=1;for(let[f]of ll){let y=he.get(f);y&&(y().catch(()=>{}),he.delete(f));try{Ue.unregister(f)}catch(V){t("unregister %s failed: %o",f,V)}}},Ne=function(f){if(!f){Ve();return}for(let[y,V]of _f){if(O.has(y)||De.has(y))continue;let le=y===lr?ht():{type:V};try{Ue.register(y,le)}catch(Ct){t("register %s store failed: %o",y,Ct)}De.add(y);let Re=Fe.worker,mt=!1;me.subscribeList(y,le).then(Ct=>{mt=!Be(O,"worker",Re,y,Ct)}).catch(Ct=>{t("subscribe %s failed: %o",y,Ct),Ce(Ct,"worker")}).finally(()=>{De.delete(y),mt&&At()})}},Ve=function(){Fe.worker+=1;for(let[f]of _f){let y=O.get(f);y&&(y().catch(()=>{}),O.delete(f));try{Ue.unregister(f)}catch(V){t("unregister %s failed: %o",f,V)}}},qe=function(f){if(!f){ct();return}X||(xe("subscribe-worker-queue",{id:gf}).catch(y=>{t("subscribe-worker-queue failed: %o",y)}),X=()=>xe("unsubscribe-worker-queue",{id:gf}))},ct=function(){X&&(X().catch(()=>{}),X=null)},We=function(f){return f.view==="monitor"||f.selected_id!=null},et=function(f){if(!f){kt();return}st||(xe("subscribe-monitor-pipeline",{id:mf}).catch(y=>{t("subscribe-monitor-pipeline failed: %o",y)}),st=()=>xe("unsubscribe-monitor-pipeline",{id:mf}))},kt=function(){st&&(st().catch(()=>{}),st=null)},Ot=function(){Ke||(xe("subscribe-ui-order",{id:hf}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),Ke=()=>xe("unsubscribe-ui-order",{id:hf}))},Je=function(){Ke&&(Ke().catch(()=>{}),Ke=null),B.clear()},Bt=function(){rt||(xe("subscribe-display-policy",{id:bf}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),rt=()=>xe("unsubscribe-display-policy",{id:bf}))},Mt=function(){rt&&(rt().catch(()=>{}),rt=null),ue.clear()},Ht=function(){Tt||(xe("subscribe-impl-presets",{id:yf}).catch(f=>{t("subscribe-impl-presets failed: %o",f)}),Tt=()=>xe("unsubscribe-impl-presets",{id:yf}))},Xt=function(f){if(!f)return"Unknown";let y=f.split("/").filter(Boolean);return y.length>0?y[y.length-1]:"Unknown"},pt=function(f,y){yt.open(f.path,{missing_state:f.missing_state,...y?{workspace:y}:{}})};var p=Ce,g=Ae,_=lt,$=U,R=Be,j=At,G=jt,ie=ht,ee=Ye,F=ge,M=Ne,I=Ve,W=qe,K=ct,ne=We,D=et,Y=kt,H=Ot,Z=Je,Oe=Bt,we=Mt,ce=Ht,q=Xt,$e=pt;let Se=document.getElementById("header-loading"),E=Xl(Se),J=Dd(e),fe=ff(),xe=E.wrapSend((f,y)=>fe.send(f,y)),me=zl(xe),Ue=Hl(),dt=Kl(),Pe=$l(),B=Gl(),ue=kl(),se=wl(),ae=xl();fe.on("impl-presets-snapshot",f=>{let y=f;y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&se.set({revision:y.revision,presets:y.presets})}),fe.on("monitor-pipeline-snapshot",f=>{let y=f;if(!(!y||!Array.isArray(y.workspaces)))try{Pe.set(y.workspaces,y.workspaces_state,y.cross_lanes)}catch{}}),fe.on("ui-order-snapshot",f=>{let y=f;if(y&&typeof y.revision=="number")try{B.set({revision:y.revision,order:y.order&&typeof y.order=="object"?y.order:{}})}catch{}}),fe.on("display-policy-snapshot",f=>{let y=f;if(y&&y.policy&&typeof y.policy=="object")try{ue.set(y.policy)}catch{}}),fe.on("session-log-snapshot",f=>{let y=f;if(y&&typeof y.id=="string")try{ae.set(y.id,Array.isArray(y.lines)?y.lines:[],typeof y.last_event_at=="number"?y.last_event_at:null)}catch{}}),fe.on("session-log-append",f=>{let y=f;if(y&&typeof y.id=="string")try{ae.append(y.id,y.event)}catch{}}),fe.on("snapshot",f=>{let y=f,V=y&&typeof y.id=="string"?y.id:"",le=V?Ue.getStore(V):null;if(le&&y&&y.type==="snapshot")try{le.applyPush(y)}catch{}}),fe.on("upsert",f=>{let y=f,V=y&&typeof y.id=="string"?y.id:"",le=V?Ue.getStore(V):null;if(le&&y&&y.type==="upsert")try{le.applyPush(y)}catch{}}),fe.on("delete",f=>{let y=f,V=y&&typeof y.id=="string"?y.id:"",le=V?Ue.getStore(V):null;if(le&&y&&y.type==="delete")try{le.applyPush(y)}catch{}});let Ee=null,_e=null,Le=null,Ze=null,Ge=()=>{},ze=new Promise(f=>{Ge=()=>f(void 0)}),te=!1,z=!1;async function x(f){let y=Ae(f);if(y===_e||y===Le)return;Le=y;let V=`detail:${f}`,le={type:"issue-detail",params:{id:f}};try{Ue.register(V,le)}catch(Re){t("register detail store failed: %o",Re)}try{let Re=await me.subscribeList(V,le);if(ye.getState().selected_id!==f||Ae(f)!==y){await Re().catch(()=>{});return}Ee&&await Ee().catch(()=>{}),Ee=Re,_e=y}catch(Re){t("detail subscribe failed: %o",Re),Ce(Re,"issue details")}finally{Le===y&&(Le=null)}}let he=new Map,De=new Set,Fe={board:0,worker:0},ut=!1,Dt=rs;try{let f=window.localStorage.getItem(vf);Ii(f)&&(Dt=f)}catch{}let Wt="today";try{let f=window.localStorage.getItem(pv);f!==null&&(Wt=Ln(f))}catch{}async function L(f){if(!Ii(f)||f===Dt)return;Dt=f;try{window.localStorage.setItem(vf,f)}catch{}let y=he.get(cr);if(!y)return;he.delete(cr),await y().catch(()=>{});let V=jt();try{Ue.register(cr,V)}catch(le){t("register %s store failed: %o",cr,le)}try{let le=await me.subscribeList(cr,V);he.set(cr,le)}catch(le){t("re-subscribe %s failed: %o",cr,le),Ce(le,"board")}}async function re(f){let y=Ln(f);if(y===Wt)return;Wt=y;let V=O.get(lr);if(!V)return;O.delete(lr),await V().catch(()=>{});let le=ht();try{Ue.register(lr,le)}catch(Re){t("register %s store failed: %o",lr,Re)}try{let Re=await me.subscribeList(lr,le);O.set(lr,Re)}catch(Re){t("re-subscribe %s failed: %o",lr,Re),Ce(Re,"worker")}}let O=new Map,X=null,st=null,Ke=null,rt=null,Tt=null;async function nn(){rt=null,ue.clear(),Tt=null,se.clear(),X=null,st=null,he.clear(),O.clear(),Fe.board+=1,Fe.worker+=1,Ht();let f=ye.getState().workspace.current?.path;if(f)try{await fe.send("set-workspace",{path:f})}catch(V){t("workspace restore after reconnect failed: %o",V);return}Bt();let y=ye.getState();Ye(y.view==="board"),Ne(y.view==="worker"),et(We(y)),qe(y.view==="board"||y.view==="worker"||!!y.selected_id)}async function Gt(){t("clearing all subscriptions for workspace switch"),ge(),Ve(),ct(),dt.clear(),Je(),Ot(),Mt(),Bt(),lt();let f=ye.getState();if(f.selected_id)try{Ue.unregister(`detail:${f.selected_id}`)}catch{}let y=ye.getState();Ye(y.view==="board"),Ne(y.view==="worker"),et(We(y)),qe(y.view==="board"||y.view==="worker"||!!y.selected_id),y.selected_id&&U(y.selected_id)}async function Kt(f){t("requesting workspace switch to %s",f),z=!0;try{let y=await fe.send("set-workspace",{path:f});t("workspace switch result: %o",y),y&&y.workspace&&(ye.setState({workspace:{current:{path:y.workspace.root_dir,database:y.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),y.changed&&(await Gt(),de("Switched to "+Xt(f),"success",2e3)))}catch(y){throw t("workspace switch failed: %o",y),de("Failed to switch workspace","error",3e3),y}finally{z=!1}}async function Lt(f){t("requesting workspace git pull for %s",f);try{let y=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",y);let V=y?.status;if(V==="up_to_date"){de("Already up to date","success",2e3);return}if(V==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+Xt(f),"success",2e3)}catch(y){t("workspace git pull failed: %o",y);let V=y?.code,le=y?.message;if(V==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(V==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(V==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let Re=le?`: ${le}`:"";throw de(`Git pull failed${Re}`,"error",3e3),y}}async function bn(f,y){t("setting workspace visibility %s \u2192 %s",f,String(y));try{await fe.send("set-workspace-visibility",{path:f,visible:y}),await St()}catch(V){t("workspace visibility update failed: %o",V),de("Failed to update project visibility","error",3e3)}}async function St(){try{let f=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let y=f.workspaces.map(mt=>({path:mt.path,database:mt.database,pid:mt.pid,version:mt.version})),V=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,le=Array.isArray(f.hidden)?f.hidden.filter(mt=>typeof mt=="string"):[];ye.setState({workspace:{current:V,available:y,hidden:le}});let Re=window.localStorage.getItem("beads-ui.workspace");Re&&(!y.some(Ct=>Ct.path===Re)||le.includes(Re)?window.localStorage.removeItem("beads-ui.workspace"):V&&Re!==V.path&&(t("restoring saved workspace preference: %s",Re),await Kt(Re)))}}catch(f){t("failed to load workspaces: %o",f)}}fe.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(ye.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),St(),Gt())});let Vt=!1;if(typeof fe.onConnection=="function"){let f=y=>{t("ws state %s",y),y==="reconnecting"||y==="closed"?(Vt=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):y==="open"&&Vt&&(Vt=!1,de("Reconnected","success",2200),dv(ye,(V,le)=>{t(`${V}: %o`,le)}),nn())};fe.onConnection(f)}let dn="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(dn=f)}catch(f){t("view parse error: %o",f)}let ye=Ql({config:uv(),view:dn});fe.on("worker-queue-snapshot",f=>{let y=f;if(!y||!y.queue)return;let V=ye.getState().workspace.current?.path;if(typeof V=="string"&&V.length>0&&y.root_dir!==V){t("dropping worker-queue snapshot for %s",String(y.root_dir));return}try{dt.set(y.queue)}catch{}});let T=Yl(ye);T.start();let h=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),A=async(f,y)=>{try{return await xe(f,y)}catch(V){if(h.has(f))throw V;return[]}};_p({global_element:r,repo_element:o},ye,T);let pe=document.getElementById("workspace-picker");pe&&uf(pe,ye,Kt,Lt,bn);let je=bp(e,(f,y)=>xe(f,y));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>je.open())}catch{}let Me=wp(e,{policyStore:ue,queueStore:dt,implPresetStore:se,transport:(f,y)=>xe(f,y),onOpenChange:f=>{let y=ut;ut=f,At(),y&&f===!1&&it.refreshSessionDefaults()},labelOptions:()=>{let f=new Set;for(let[y]of ll)for(let V of Ue.snapshotFor(y)||[]){let le=V.labels;if(Array.isArray(le))for(let Re of le)typeof Re=="string"&&Re.length>0&&f.add(Re)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&(f.setAttribute("aria-label","\uC124\uC815"),f.setAttribute("title","\uC124\uC815"),f.addEventListener("click",()=>Me.open()))}catch{}let be=document.createElement("div");be.className="md-viewer-root",document.body.appendChild(be);let yt=fi(be,{getWorkspacePath:()=>ye.getState().workspace.current?.path}),ft=fc(l,{gotoIssue:f=>T.gotoIssue(f),issueStores:Ue,transport:A,workerQueueStore:dt,uiOrderStore:B,displayPolicyStore:ue,closedRange:Dt,onClosedRangeChange:f=>{L(f)},onNewIssue:()=>je.open(),openDoc:pt}),it=sl(a,{transport:A,issueStores:Ue,queueStore:dt,sessionLogStore:ae,gotoIssue:f=>ye.setState({selected_id:f}),getWorkspacePath:()=>ye.getState().workspace.current?.path,switchWorkspace:f=>Kt(f),openDoc:pt,doneRange:Wt,onDoneRangeChange:f=>{re(f)}}),m=fp(u,{transport:A,pipelineStore:Pe,execPresetStore:se,sessionLogStore:ae,router:T,gotoIssue:f=>T.gotoIssue(f),getWorkspacePath:()=>ye.getState().workspace.current?.path,switchWorkspace:f=>Kt(f),openDoc:pt}),b=Pd(d,{issueStores:Ue,transport:A,queueStore:dt,execPresetStore:se,sessionLogStore:ae,getWorkspacePath:()=>ye.getState().workspace.current?.path,mdViewer:yt,depCandidates:()=>{let f=Pe.get();if(f===null)return null;let y=Pe.getWorkspacesState(),V=ye.getState();if(V.view==="monitor")return ya(f,y);let le=V.workspace.current?.path;return le?ya(f,y,{root_dir:le}):null},subscribeCandidates:f=>Pe.subscribe(f),onDepChanged:({type:f,a:y,b:V})=>{let le=m;f==="dep-add"&&le&&typeof le.recorrectSharedLane=="function"&&le.recorrectSharedLane(f,y,V)},onNavigate:(f,y)=>{let V=()=>{ye.getState().view==="worker"?ye.setState({selected_id:f}):T.gotoIssue(f)},le=ye.getState().workspace.current?.path;if(typeof y!="string"||y.length===0||!le||y===le){V();return}Promise.resolve(Kt(y)).then(V).catch(()=>{de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let f=ye.getState();ye.setState({selected_id:null});try{T.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{Me.open("execution")}}),C=ye.getState().selected_id;C&&(d.hidden=!1,b.load(C),U(C)),ye.subscribe(f=>{let y=f.selected_id;y?(d.hidden=!1,b.load(y),z||U(y)):(b.clear(),d.hidden=!0,lt())});let P=f=>{l.hidden=f.view!=="board",a.hidden=f.view!=="worker",u.hidden=f.view!=="monitor",s&&s.classList.toggle("is-quiet",f.view==="monitor"),Ye(f.view==="board"),Ne(f.view==="worker"),et(We(f)),qe(f.view==="board"||f.view==="worker"||ut||!!f.selected_id),!f.selected_id&&f.view==="board"&&ft.load(),f.view==="worker"&&it.load(),f.view==="monitor"?m.load():m.pause(),window.localStorage.setItem("beads-ui.view",f.view)};ye.subscribe(P),P(ye.getState()),Ot(),Bt(),Ht(),St().finally(()=>{te=!0,Ge()}),window.addEventListener("keydown",f=>{let y=f.ctrlKey||f.metaKey,V=String(f.key||"").toLowerCase(),le=f.target,Re=le&&le.tagName?String(le.tagName).toLowerCase():"",mt=Re==="input"||Re==="textarea"||Re==="select"||le&&typeof le.isContentEditable=="boolean"&&le.isContentEditable;y&&V==="n"&&(mt||(f.preventDefault(),je.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&mv(t)});export{mv as bootstrap,uv as readBootstrapConfig,dv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
