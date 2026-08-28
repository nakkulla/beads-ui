var _f=Object.create;var xi=Object.defineProperty;var mf=Object.getOwnPropertyDescriptor;var gf=Object.getOwnPropertyNames;var hf=Object.getPrototypeOf,bf=Object.prototype.hasOwnProperty;var yf=(e,t,n)=>t in e?xi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ai=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var vf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of gf(t))!bf.call(e,o)&&o!==n&&xi(e,o,{get:()=>t[o],enumerable:!(r=mf(t,o))||r.enumerable});return e};var wf=(e,t,n)=>(n=e!=null?_f(hf(e)):{},vf(t||!e||!e.__esModule?xi(n,"default",{value:e,enumerable:!0}):n,e));var St=(e,t,n)=>yf(e,typeof t!="symbol"?t+"":t,n);var $l=Ai((dv,kl)=>{var Er=1e3,Tr=Er*60,Cr=Tr*60,pr=Cr*24,xf=pr*7,Af=pr*365.25;kl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Sf(e);if(n==="number"&&isFinite(e))return t.long?Tf(e):Ef(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Sf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Af;case"weeks":case"week":case"w":return n*xf;case"days":case"day":case"d":return n*pr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Cr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Tr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Er;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Ef(e){var t=Math.abs(e);return t>=pr?Math.round(e/pr)+"d":t>=Cr?Math.round(e/Cr)+"h":t>=Tr?Math.round(e/Tr)+"m":t>=Er?Math.round(e/Er)+"s":e+"ms"}function Tf(e){var t=Math.abs(e);return t>=pr?ns(e,t,pr,"day"):t>=Cr?ns(e,t,Cr,"hour"):t>=Tr?ns(e,t,Tr,"minute"):t>=Er?ns(e,t,Er,"second"):e+" ms"}function ns(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Al=Ai((pv,xl)=>{function Cf(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=$l(),n.destroy=c,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let g=0;g<d.length;g++)p=(p<<5)-p+d.charCodeAt(g),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,g=null,_,A;function T(...N){if(!T.enabled)return;let G=T,le=Number(new Date),X=le-(p||le);G.diff=X,G.prev=p,G.curr=le,p=le,N[0]=n.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let F=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(L,U)=>{if(L==="%%")return"%";F++;let H=n.formatters[U];if(typeof H=="function"){let te=N[F];L=H.call(G,te),N.splice(F,1),F--}return L}),n.formatArgs.call(G,N),(G.log||n.log).apply(G,N)}return T.namespace=d,T.useColors=n.useColors(),T.color=n.selectColor(d),T.extend=r,T.destroy=n.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(_!==n.namespaces&&(_=n.namespaces,A=n.enabled(d)),A),set:N=>{g=N}}),typeof n.init=="function"&&n.init(T),T}function r(d,p){let g=n(this.namespace+(typeof p>"u"?":":p)+d);return g.log=this.log,g}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of p)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function s(d,p){let g=0,_=0,A=-1,T=0;for(;g<d.length;)if(_<p.length&&(p[_]===d[g]||p[_]==="*"))p[_]==="*"?(A=_,T=g,_++):(g++,_++);else if(A!==-1)_=A+1,T++,g=T;else return!1;for(;_<p.length&&p[_]==="*";)_++;return _===p.length}function i(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(s(d,p))return!1;for(let p of n.names)if(s(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}xl.exports=Cf});var Sl=Ai((dn,rs)=>{dn.formatArgs=Of;dn.save=Lf;dn.load=If;dn.useColors=Rf;dn.storage=Df();dn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();dn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Rf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Of(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+rs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}dn.log=console.debug||console.log||(()=>{});function Lf(e){try{e?dn.storage.setItem("debug",e):dn.storage.removeItem("debug")}catch{}}function If(){let e;try{e=dn.storage.getItem("debug")||dn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Df(){try{return localStorage}catch{}}rs.exports=Al()(dn);var{formatters:Mf}=rs.exports;Mf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var eo=globalThis,Vo=eo.trustedTypes,il=Vo?Vo.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ei="$lit$",Pn=`lit$${Math.random().toFixed(9).slice(2)}$`,Ti="?"+Pn,kf=`<${Ti}>`,lr=document,to=()=>lr.createComment(""),no=e=>e===null||typeof e!="object"&&typeof e!="function",Ci=Array.isArray,pl=e=>Ci(e)||typeof e?.[Symbol.iterator]=="function",Si=`[ 	
\f\r]`,Jr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,al=/-->/g,ll=/>/g,ir=RegExp(`>|${Si}(?:([^\\s"'>=/]+)(${Si}*=${Si}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),cl=/'/g,ul=/"/g,fl=/^(?:script|style|textarea|title)$/i,Ri=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),u=Ri(1),oo=Ri(2),ov=Ri(3),bn=Symbol.for("lit-noChange"),Mt=Symbol.for("lit-nothing"),dl=new WeakMap,ar=lr.createTreeWalker(lr,129);function _l(e,t){if(!Ci(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return il!==void 0?il.createHTML(t):t}var ml=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=Jr;for(let l=0;l<n;l++){let a=e[l],c,d,p=-1,g=0;for(;g<a.length&&(i.lastIndex=g,d=i.exec(a),d!==null);)g=i.lastIndex,i===Jr?d[1]==="!--"?i=al:d[1]!==void 0?i=ll:d[2]!==void 0?(fl.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=ir):d[3]!==void 0&&(i=ir):i===ir?d[0]===">"?(i=o??Jr,p=-1):d[1]===void 0?p=-2:(p=i.lastIndex-d[2].length,c=d[1],i=d[3]===void 0?ir:d[3]==='"'?ul:cl):i===ul||i===cl?i=ir:i===al||i===ll?i=Jr:(i=ir,o=void 0);let _=i===ir&&e[l+1].startsWith("/>")?" ":"";s+=i===Jr?a+kf:p>=0?(r.push(c),a.slice(0,p)+Ei+a.slice(p)+Pn+_):a+Pn+(p===-2?l:_)}return[_l(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ro=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[c,d]=ml(t,n);if(this.el=e.createElement(c,r),ar.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=ar.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(Ei)){let g=d[i++],_=o.getAttribute(p).split(Pn),A=/([.?@])?(.*)/.exec(g);a.push({type:1,index:s,name:A[2],strings:_,ctor:A[1]==="."?Xo:A[1]==="?"?Zo:A[1]==="@"?Jo:ur}),o.removeAttribute(p)}else p.startsWith(Pn)&&(a.push({type:6,index:s}),o.removeAttribute(p));if(fl.test(o.tagName)){let p=o.textContent.split(Pn),g=p.length-1;if(g>0){o.textContent=Vo?Vo.emptyScript:"";for(let _=0;_<g;_++)o.append(p[_],to()),ar.nextNode(),a.push({type:2,index:++s});o.append(p[g],to())}}}else if(o.nodeType===8)if(o.data===Ti)a.push({type:2,index:s});else{let p=-1;for(;(p=o.data.indexOf(Pn,p+1))!==-1;)a.push({type:7,index:s}),p+=Pn.length-1}s++}}static createElement(t,n){let r=lr.createElement("template");return r.innerHTML=t,r}};function cr(e,t,n=e,r){if(t===bn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=no(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=cr(e,o._$AS(e,t.values),o,r)),t}var Qo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??lr).importNode(n,!0);ar.currentNode=o;let s=ar.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new Ar(s,s.nextSibling,this,t):a.type===1?c=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(c=new es(s,this,t)),this._$AV.push(c),a=r[++l]}i!==a?.index&&(s=ar.nextNode(),i++)}return ar.currentNode=lr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Ar=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Mt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=cr(this,t,n),no(t)?t===Mt||t==null||t===""?(this._$AH!==Mt&&this._$AR(),this._$AH=Mt):t!==this._$AH&&t!==bn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):pl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Mt&&no(this._$AH)?this._$AA.nextSibling.data=t:this.T(lr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ro.createElement(_l(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new Qo(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=dl.get(t.strings);return n===void 0&&dl.set(t.strings,n=new ro(t)),n}k(t){Ci(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(to()),this.O(to()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ur=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Mt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Mt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=cr(this,t,n,0),i=!no(t)||t!==this._$AH&&t!==bn,i&&(this._$AH=t);else{let l=t,a,c;for(t=s[0],a=0;a<s.length-1;a++)c=cr(this,l[r+a],n,a),c===bn&&(c=this._$AH[a]),i||(i=!no(c)||c!==this._$AH[a]),c===Mt?t=Mt:t!==Mt&&(t+=(c??"")+s[a+1]),this._$AH[a]=c}i&&!o&&this.j(t)}j(t){t===Mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Xo=class extends ur{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Mt?void 0:t}},Zo=class extends ur{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Mt)}},Jo=class extends ur{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=cr(this,t,n,0)??Mt)===bn)return;let r=this._$AH,o=t===Mt&&r!==Mt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Mt&&(r===Mt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},es=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){cr(this,t)}},gl={M:Ei,P:Pn,A:Ti,C:1,L:ml,R:Qo,D:pl,V:cr,I:Ar,H:ur,N:Zo,U:Jo,B:Xo,F:es},$f=eo.litHtmlPolyfillSupport;$f?.(ro,Ar),(eo.litHtmlVersions??(eo.litHtmlVersions=[])).push("3.3.1");var lt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Ar(t.insertBefore(to(),s),s,void 0,n??{})}return o._$AI(e),o};var ts="today",hl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Sr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function On(e){return e==="today"?"today":"7d"}function Oi(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function dr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function bl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function yl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function vl(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function wl(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var El=wf(Sl(),1);function Ct(e){return(0,El.default)(`beads-ui:${e}`)}function Pf(e){let n=Tl((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Tl(e){return typeof e=="string"?e.trim():""}function Nf(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var qf=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Rr(e){let t=Pf(e),n=Tl(Nf(e).spec_review),r=qf.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function vn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function so(e,t){let n=vn(e.created_at),r=vn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Dl(e,t){let n=vn(e.created_at),r=vn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Ml(e,t){let n=vn(e.updated_at),r=vn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function Pl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=vn(e.created_at),s=vn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Nl(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var os=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function Ff(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(os,e)}function Ii(e){if(!e||typeof e!="object")return!1;let t=e;return Ff(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Cl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Rl(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Rr(e).evidence==="published"?1:0;case"created":return Cl(e.created_at);case"updated":return Cl(e.updated_at);default:return null}}function Ol(e,t,n){let r=Rl(e,n.key),o=Rl(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function ql(e){let t=Array.isArray(e)?e.filter(Ii):[];return(n,r)=>{for(let l of t){let a=Ol(n,r,l);if(a!==0)return a}let o=Ol(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var jf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ll(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Il(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=jf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Fl(e,t){let n=Ll(e),r=Ll(t);if(n!==r)return n<r?-1:1;let o=Il(e),s=Il(t);if(o!==s)return o<s?-1:1;let i=vn(e&&e.created_at),l=vn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,c=t&&t.id;return a===c?0:String(a)<String(c)?-1:1}var Li=2**20;function Or(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-vn(e&&e.created_at)}function jl(e){return(t,n)=>{let r=Or(t,e),o=Or(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function Di(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Or(l,n)-Li};if(!l)return{rank:Or(i,n)+Li};let a=Or(i,n),c=Or(l,n),d=(a+c)/2;return a<d&&d<c?{rank:d}:{renormalize:r.map((p,g)=>({bead_id:p.id,rank:g*Li}))}}function Mi(e,t={}){let n=Ct(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||so;function c(){for(let g of Array.from(i))try{g()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(g){if(l||!g||g.id!==e)return;let _=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,_),!(_<=s&&g.type!=="snapshot")){if(g.type==="snapshot"){if(_<=s)return;r.clear();let A=Array.isArray(g.issues)?g.issues:[];for(let T of A)T&&typeof T.id=="string"&&T.id.length>0&&r.set(T.id,T);d(),s=_,c();return}if(g.type==="upsert"){let A=g.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let T=r.get(A.id);if(!T)r.set(A.id,A);else{let N=Number.isFinite(T.updated_at)?T.updated_at:0,G=Number.isFinite(A.updated_at)?A.updated_at:0;if(N<=G){for(let le of Object.keys(T))le in A||delete T[le];for(let[le,X]of Object.entries(A))T[le]=X}}d()}s=_,c()}else if(g.type==="delete"){let A=String(g.issue_id||"");A&&(r.delete(A),d()),s=_,c()}}}return{id:e,subscribe(g){return i.add(g),()=>{i.delete(g)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(g){return r.get(g)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function ss(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Bl(e){let t=Ct("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=r.get(l);if(!c||c.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],g=Array.isArray(a.removed)?a.removed:[];for(let _ of Array.from(c)){let A=n.get(_);if(!A)continue;let T=A.itemsById;for(let N of d)typeof N=="string"&&N.length>0&&T.set(N,!0);for(let N of p)typeof N=="string"&&N.length>0&&T.set(N,!0);for(let N of g)typeof N=="string"&&N.length>0&&T.delete(N)}}async function s(l,a){let c=ss(a);if(t("subscribe %s key=%s",l,c),!n.has(l))n.set(l,{key:c,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==c){let g=r.get(p.key);g&&(g.delete(l),g.size===0&&r.delete(p.key)),n.set(l,{key:c,itemsById:new Map})}}r.has(c)||r.set(c,new Set);let d=r.get(c);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let g=n.get(l)||null;if(g){let _=r.get(g.key);_&&(_.delete(l),_.size===0&&r.delete(g.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,c);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let g=r.get(p.key);g&&(g.delete(l),g.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:ss,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=n.get(l);return c?c.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),c={};if(!a)return c;for(let d of a.itemsById.keys())c[d]=!0;return c}}}}function Ul(){let e=Ct("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,c,d){let p=c?ss(c):"",g=n.get(a)||"",_=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,g),_&&g&&p&&g!==p){let A=t.get(a);if(A)try{A.dispose()}catch{}let T=o.get(a);if(T){try{T()}catch{}o.delete(a)}let N=Mi(a,d);t.set(a,N);let G=N.subscribe(()=>s());o.set(a,G)}else if(!_){let A=Mi(a,d);t.set(a,A);let T=A.subscribe(()=>s());o.set(a,T)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let c=t.get(a);c&&(c.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let c=t.get(a);return c?c.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Wl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function zl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Pi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Bf(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function Uf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Hl(e){let t=Ct("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):Bf(r),i=Uf(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=Pi(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?Pi(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var Wf=Object.freeze({workspace_config:{default_workspace:null}});function Gl(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Wf.workspace_config.default_workspace}}}function Kl(e={}){let t=Ct("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Gl(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?Gl(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((c,d)=>c!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,d)=>c===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Yl(e){let t=Ct("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let c=n>0;e.toggleAttribute("hidden",!c),e.setAttribute("aria-busy",c?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let c=n;n=Math.max(0,n-1),c<=0?t("done called but count was already %d",c):t("done count=%d\u2192%d",c,n),s()}function a(c){return async(p,g)=>{let _=o++,A=Date.now();r.set(_,{type:p,start_ts:A}),t("request start id=%d type=%s count=%d",_,p,n+1),i();let T=!1,N=()=>{T||(T=!0,r.delete(_),l())},G=setTimeout(()=>{T||(t("request TIMEOUT id=%d type=%s elapsed=%dms",_,p,Date.now()-A),N())},3e4);try{let le=await c(p,g),X=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",_,p,X),le}catch(le){let X=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",_,p,X,le),le}finally{clearTimeout(G),N()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let c=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:c-p.start_ts}))}}}function be(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Lr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(Nl),a;switch(l){case"created_desc":return a.sort(so),a;case"created_asc":return a.sort(Dl),a;case"updated_desc":return a.sort(Ml),a;case"priority":return a.sort(Pl),a;case"manual":default:{let c=n();return c?a.sort(jl(c)):a.sort(so),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function Yn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Ht(e){let t=Yn(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function tn(e,t){let n=Yn(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Vl(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=Yn(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function is(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function as(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=is(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function ls(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=Vl(n);return{total:n.length,count:r,current:o,children:n}}function Ql(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let c=n.get()||{revision:0,order:{}},d=r(Di(l,a,c.order),i);o(c,d);let p=await t("ui-order-set",{expected_revision:c.revision,entries:d});if(p&&p.conflict){let g={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(g);let _=r(Di(l,a,g.order),i);o(g,_);let A=await t("ui-order-set",{expected_revision:g.revision,entries:_});A&&A.applied&&n.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:s}}function Xl(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function io(e,t){let n=Xl(e),r=Xl(t);return n.length===0||r.length===0?!1:n!==r}function cs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ni(e,t){return!t||typeof e!="string"||e.length===0||cs(t.visible_labels).includes(e)?!0:cs(t.hidden_labels).includes(e)?!1:!cs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Zl(e,t){return cs(e).filter(n=>Ni(n,t))}function Vn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function zf(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Hf(e,t,n,r,o){return u`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Gf(e,t,n,r){return u`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${zf(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function us(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(Fl):i;return u`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Hf(t.parent_id,e.count,n,r,t.onToggle):u`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?u`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?u`<div class="board-card__roll-list">
            ${l.map((a,c)=>Gf(a,c+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Kf={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},ec={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Jl={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Yf={review:"\u2713",skip:"\u2298"},Qn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Vf(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function tc(e){let t=e&&e.fill||"none";return t==="none"?Qn.none:e&&e.stale===!0?Qn.stale:t==="dim"?Qn.dim:e&&e.glyph==="review"?Qn.review:e&&e.glyph==="skip"?Qn.skip:Qn.done}function Qf(e){if(!e||e.fill==="none"||!e.approval_state)return tc(e);let t=[];return e.glyph==="review"?t.push(Qn.review):e.glyph==="skip"&&t.push(Qn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Xf(e,t,n,r){let o=Kf[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=Yf[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let c=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",p=ec[e]||e,g=r?nc(t):null;if(!g)return u`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${c}>${p}</div>
      </div>
    `;let _=`${p} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${g.path}`;return u`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${_}
      title=${_}
      @click=${A=>{A.preventDefault(),A.stopPropagation(),r(A,g,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${c}>${p}</div>
    </button>
  `}function nc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ds(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Jl[e.route]||Jl.spec_backed,s=e.stages,i=Vf(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(c=>`${ec[c]||c} ${c==="plan"?Qf(s[c]||{}):tc(s[c]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(c=>nc(s[c]||{})!==null);return u`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(c=>Xf(c,s[c]||{},c===i,r))}
    </div>
  `}function Zf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var rc=2;function oc(e){let t=e.slice(0,rc).join(", "),n=e.length-rc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Jf(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(io(e,i)?s:o).push(i);return o.length>0&&n.push(u`<span class="ctl-chip ctl-chip--blocked-dep"
        >${oc(o)}</span
      >`),s.length>0&&n.push(u`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${oc(s)}</span
      >`),n}function e_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:u`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function qi(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function ps(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Nn(e){return`${e.kind}:${ps(e)}@${e.sha}`}function fs(e,t){if(!e)return null;let n=qi(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=qi(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,c=t?` \xB7 exec_receipt ${Nn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${c}`}}function sc(e,t){let n=fs(e,t);return n?u`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function t_(e){if(!e)return null;let t=qi(e.kind);return t?u`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Nn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function n_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&Vn(n,"route")){let l=r.route_source==="derived";o.push(u`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&Vn(n,"fast_track")&&o.push(u`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Vn(n,"pr")){let l=r.pr.number;o.push(u`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=sc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(u`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Nn(l)}`}
        >${`exec ${l.kind==="delegated"?ps(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(u`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Zl(e.labels,n))o.push(u`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&Vn(n,"from")&&o.push(u`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Vn(n,"blocked")){let l=e_(e.metadata);l&&o.push(l),o.push(...Jf(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Vn(n,"blocked")&&o.push(u`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":u`<div class="board-card__chips">${o}</div>`}function r_(e){let t=tn(e.created_at),n=tn(e.updated_at);return!t&&!n?"":u`<span class="board-card__times">
    ${t?u`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?u`<span class="board-card__time-sep">·</span>`:""}
    ${n?u`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function o_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return us(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:r_(e),empty_label:"children \uC5C6\uC74C",childChips:Fi,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Fi(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return fs(t,n)?u`<span class="board-card__roll-child-chips">
    ${sc(t,n)}
    ${t_(n)}
  </span>`:null}function _s(e,t){let n=Zf(e.priority);return u`
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
        ${n?u`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${n_(e,t)}
      ${e.workflow&&Vn(t.policy||null,"stepper")?ds(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${o_(e,t)}
    </article>
  `}function Ir(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return u`
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
        ${r?u`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${hl.map(s=>u`<option
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
        ${e.items.map(s=>_s(s,t))}
      </div>
    </section>
  `}function ic(e,t,n){return u`
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
          ${e.items.length===0?u`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>_s(r,t))}
        </div>
      </div>
    </dialog>
  `}var s_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],i_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],a_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function l_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return u`
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
      ${n.label_menu_open?u`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?u`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(s=>u`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(s)}
                        @change=${()=>t.onLabelToggle(s)}
                      />
                      <span>${s}</span>
                    </label>`)}
            ${r>0?u`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ac(e,t,n){return u`
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
        ${s_.map(r=>u`<option
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
        ${i_.map(r=>u`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${l_(e,t,n)}
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
        ${a_.map(r=>u`<option
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
  `}var c_=200,u_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},d_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),lc="beads-ui.board.sort",cc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function p_(){try{let e=window.localStorage.getItem(lc);if(e&&cc.has(e))return e}catch{}return"created_desc"}function uc(e,t){let n=Ct("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,c=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,g=t.closedRange||ts,_=o?Lr(o,i):null,A=Ql({transport:s,uiOrderStore:i}),T=[],N=[],G=[],le=[],X=[],F=[],I=!1,L=0,U=p_(),H=new Map,te=new Map,D=new Map,K=new Set,W={search:"",priority:"",type:"",labels:[]},J=!1,Ce=null;function ke(E){return String(E.status||"open")==="open"}function ie(E){return String(E.status||"open")==="open"}function q(E){let V=W.search.trim().toLowerCase(),Le=W.priority,Ve=W.type,Pe=W.labels;return E.filter(Xe=>{if(V){let ot=String(Xe.id||"").toLowerCase(),Ue=String(Xe.title||"").toLowerCase();if(!ot.includes(V)&&!Ue.includes(V))return!1}if(Le!==""&&String(Xe.priority)!==Le||Ve!==""&&String(Xe.issue_type||"")!==Ve)return!1;if(Pe.length>0){let ot=Array.isArray(Xe.labels)?Xe.labels:[];if(!Pe.some(Ue=>ot.includes(Ue)))return!1}return!0})}function $e(){let E=new Set;for(let V of[T,N,G,le,X,F])for(let Le of V){let Ve=Array.isArray(Le.labels)?Le.labels:[];for(let Pe of Ve)typeof Pe=="string"&&Pe.length>0&&E.add(Pe)}return Array.from(E).sort()}function Se(){return W.search.trim()!==""||W.priority!==""||W.type!==""||W.labels.length>0}function S(){try{if(_){let E=_.selectBoardColumn("tab:board:in-progress","in_progress",U),V=_.selectBoardColumn("tab:board:blocked","blocked",U).filter(ie),Le=new Set(E.map(Ke=>Ke.id)),Ve=_.selectBoardColumn("tab:board:ready","ready",U).filter(Ke=>ke(Ke)&&!Le.has(Ke.id)),Pe=_.selectBoardColumn("tab:board:resolved","resolved",U),Xe=_.selectBoardColumn("tab:board:deferred","deferred",U),ot=_.selectBoardColumn("tab:board:closed","closed").slice(0,c_),Ue=[...V,...Ve,...E,...Pe,...ot];ee(Ue);let tt=new Set;for(let Ke of Ue)Ke&&Ke.id&&!is(Ke)&&tt.add(Ke.id);let wt=!Se();T=wt?ao(V,tt):V,N=wt?ao(Ve,tt):Ve,G=wt?ao(E,tt):E,le=wt?ao(Pe,tt):Pe,X=Xe,L=Xe.length,F=wt?ao(ot,tt):ot,H=new Map;for(let Ke of T)H.set(Ke.id,"open");for(let Ke of N)H.set(Ke.id,"open");for(let Ke of G)H.set(Ke.id,"in_progress");for(let Ke of le)H.set(Ke.id,"resolved");for(let Ke of X)H.set(Ke.id,"deferred");for(let Ke of F)H.set(Ke.id,"closed");te=new Map;for(let Ke of T)te.set(Ke.id,"blocked-col");for(let Ke of N)te.set(Ke.id,"ready-col");for(let Ke of G)te.set(Ke.id,"in-progress-col");for(let Ke of le)te.set(Ke.id,"resolved-col");for(let Ke of F)te.set(Ke.id,"closed-col")}it()}catch{T=[],N=[],G=[],le=[],X=[],F=[],D=new Map,it()}}function ee(E){D=as(E)}function Ee(E){return ls(D,E)}function ge(E){return!K.has(E)}function xe(E,V){E.preventDefault(),E.stopPropagation(),K.has(V)?K.delete(V):K.add(V),it()}function ye(E,V){E.preventDefault(),E.stopPropagation(),r(V)}function Ne(E,V){E.preventDefault(),E.stopPropagation(),r(V)}function De(E,V){Ce||r(V)}function B(E,V){E.preventDefault(),E.stopPropagation(),f_(V).then(Le=>{Le&&be("\uBCF5\uC0AC\uB428","success",1200)})}function de(E,V){Ce=V,E.dataTransfer&&(E.dataTransfer.setData("text/plain",V),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function re(E){E.target.classList.remove("board-card--dragging"),Rt(),setTimeout(()=>{Ce=null},0)}function _e(E){let V=String(E.target.value||"");!V||V===g||(g=V,c&&c(V),it())}function ve(){return l?l.get():null}function pe(E){let V=a?a.get():null,Le=V?V.cleanup_failed:null;if(!Le||typeof Le!="object"||Array.isArray(Le))return null;let Ve=Le[E];return!Ve||typeof Ve!="object"||Array.isArray(Ve)?null:Ve}let qe={onCardClick:De,onCopyId:B,onDragStart:de,onDragEnd:re,onClosedRangeChange:_e,rollupFor:Ee,isExpanded:ge,onRollupToggle:xe,onChildClick:ye,onFromChipClick:Ne,onOpenDoc:p?(E,V)=>p(V):void 0,cleanupFailureFor:pe,get policy(){return ve()}};function Me(E,V){Ce||(he(),r(V))}function je(E,V){E.preventDefault(),E.stopPropagation(),he(),r(V)}let He={...qe,onCardClick:Me,onChildClick:je,onFromChipClick:je,onOpenDoc:p?(E,V)=>{he(),p(V)}:void 0,get policy(){return ve()}};function pt(E){let V=E.target,Le=e.querySelector(".board-filter__labels");V&&Le&&Le.contains(V)||v()}function Y(E){E.key==="Escape"&&v()}function Q(){J||(J=!0,document.addEventListener("mousedown",pt),document.addEventListener("keydown",Y),it())}function v(){J&&(J=!1,document.removeEventListener("mousedown",pt),document.removeEventListener("keydown",Y),it())}function ne(E){E.key==="Escape"&&he()}function Te(){I||(I=!0,document.addEventListener("keydown",ne),it())}function he(){I&&(I=!1,document.removeEventListener("keydown",ne),it())}let Re={onClose:he,onOverlayClick(E){E.target===E.currentTarget&&he()}},Be={onSearchInput(E){W.search=String(E.target.value||""),S()},onPriorityChange(E){W.priority=String(E.target.value||""),S()},onTypeChange(E){W.type=String(E.target.value||""),S()},onSortChange(E){let V=String(E.target.value||"");if(!(!cc.has(V)||V===U)){U=V;try{window.localStorage.setItem(lc,V)}catch{}S()}},onDeferredToggle(){I?he():Te()},onLabelMenuToggle(){J?v():Q()},onLabelToggle(E){let V=W.labels.indexOf(E);V===-1?W.labels.push(E):W.labels.splice(V,1),S()},onLabelClear(){W.labels.length!==0&&(W.labels=[],S())},onNewIssue(){d&&d()}};function ze(){return u`
      <div class="board-view">
        ${ac(W,Be,{sort_mode:U,deferred_popup_open:I,deferred_count:L,label_options:$e(),label_menu_open:J})}
        <div class="board-root">
          ${Ir({title:"Blocked",id:"blocked-col",items:q(T)},qe)}
          ${Ir({title:"Ready",id:"ready-col",items:q(N)},qe)}
          ${Ir({title:"In progress",id:"in-progress-col",items:q(G)},qe)}
          ${Ir({title:"Resolved",id:"resolved-col",items:q(le)},qe)}
          ${Ir({title:"Closed",id:"closed-col",items:q(F),is_closed:!0,closed_range:g},qe)}
        </div>
        ${I?ic({items:q(X),count:L},He,Re):""}
      </div>
    `}function it(){lt(ze(),e),vt()}function vt(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let V=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Le of V)Array.from(Le.querySelectorAll(".board-card")).forEach((Pe,Xe)=>{Pe.tabIndex=Xe===0?0:-1})}catch{}}async function Nt(E,V){if(!s){be("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:E,status:V}),be("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Le){n("update-status failed: %o",Le),be("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ft(E){switch(E){case"blocked-col":return T;case"ready-col":return N;case"in-progress-col":return G;case"resolved-col":return le;default:return[]}}function xt(E,V,Le){if(!s||!i)return;let Ve=Ft(E),Pe=Ve.find(wt=>wt.id===V);if(!Pe)return;let Xe=Ve.filter(wt=>wt.id!==V),ot=Le.closest?Le.closest(".board-card"):null,Ue=Xe.length;if(ot){let wt=ot.getAttribute("data-issue-id");if(wt===V)return;let Ke=Xe.findIndex(kt=>kt.id===wt);Ke>=0&&(Ue=Ke)}let tt=Xe.slice();tt.splice(Ue,0,Pe),A.applyReorder(V,tt,Ue)}function Rt(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let bt=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let Le=E.target.closest(".board-column");Le&&Le!==bt&&(bt&&bt.classList.remove("board-column--drag-over"),Le.classList.add("board-column--drag-over"),bt=Le)}),e.addEventListener("dragleave",E=>{let V=E.relatedTarget;(!V||!e.contains(V))&&bt&&(bt.classList.remove("board-column--drag-over"),bt=null)}),e.addEventListener("drop",E=>{E.preventDefault(),bt&&(bt.classList.remove("board-column--drag-over"),bt=null);let V=E.target,Le=V.closest(".board-column");if(!Le)return;let Ve=E.dataTransfer?.getData("text/plain")||"";if(!Ve)return;let Pe=Le.id,Xe=te.get(Ve);if(Xe&&Xe===Pe){if(d_.has(Pe)){if(U!=="manual"){be("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}xt(Pe,Ve,V)}return}let ot=u_[Pe];if(!ot){be("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}H.get(Ve)!==ot&&Nt(Ve,ot)}),e.addEventListener("keydown",E=>{let V=E.target;if(!(V instanceof HTMLElement))return;let Le=String(V.tagName||"").toLowerCase();if(Le==="input"||Le==="textarea"||Le==="select"||Le==="button"||Le==="a"||V.isContentEditable===!0)return;let Ve=V.closest(".board-card");if(!Ve)return;let Pe=String(E.key||"");if(Pe==="Enter"||Pe===" "){E.preventDefault();let tt=Ve.getAttribute("data-issue-id");tt&&r(tt);return}if(Pe!=="ArrowUp"&&Pe!=="ArrowDown"&&Pe!=="ArrowLeft"&&Pe!=="ArrowRight")return;E.preventDefault();let Xe=Ve.closest(".board-column");if(!Xe)return;let ot=Array.from(Xe.querySelectorAll(".board-card")),Ue=ot.indexOf(Ve);if(Pe==="ArrowDown"&&Ue<ot.length-1){Ge(Ve,ot[Ue+1]);return}if(Pe==="ArrowUp"&&Ue>0){Ge(Ve,ot[Ue-1]);return}if(Pe==="ArrowLeft"||Pe==="ArrowRight"){let tt=Array.from(e.querySelectorAll(".board-column")),wt=tt.indexOf(Xe),Ke=Pe==="ArrowRight"?1:-1,kt=wt+Ke;for(;kt>=0&&kt<tt.length;){let Ye=tt[kt].querySelector(".board-card");if(Ye){Ge(Ve,Ye);return}kt+=Ke}}});function Ge(E,V){try{E.tabIndex=-1,V.tabIndex=0,V.focus()}catch{}}let O=null;_&&_.subscribe&&(O=_.subscribe(()=>{try{S()}catch{}}));let oe=null;l&&l.subscribe&&(oe=l.subscribe(()=>{try{S()}catch{}}));let we=null;return a&&a.subscribe&&(we=a.subscribe(()=>{it()})),{async load(){n("load"),S()},clear(){v(),he(),O&&(O(),O=null),oe&&(oe(),oe=null),we&&(we(),we=null),e.replaceChildren(),T=[],N=[],G=[],le=[],X=[],F=[],H=new Map,te=new Map}}}function ao(e,t){return e.filter(n=>{let r=is(n);return!(r&&t.has(r))})}async function f_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var en=e=>e??Mt;async function nn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function fr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function lo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function __(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${fr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${fr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let c=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>c("prior_session")),o.addEventListener("click",()=>c("fresh_current")),s.addEventListener("click",()=>c(null)),n.addEventListener("cancel",d=>{d.preventDefault(),c(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function qn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await __(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var m_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],dc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},g_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Wt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Pt(e){return typeof e=="string"&&e.length>0?e:null}function Dr(e){return e.startsWith("gpt-")?e.slice(4):e}function Et(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function fc(e,t,n){let r=Pt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Pt(n[e]);return o===null?null:{value:o,source:"global"}}function co(e,t,n,r){return fc(e,t,n)||{value:r,source:"base"}}function ji(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Wt(o?.[t])){let i=Pt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Wt(o)){for(let i of Object.values(o))if(Wt(i)){let l=Pt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Pt(r?.runners?.[s]?.models?.[e]?.id)||e}function h_(e,t){return Pt(t?.review?.reviewers?.[e]?.model)||e}function Mr(e,t,n=!1){if(e==="default")return Et(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Dr(e):e;return Et(e,t,r,e,"explicit")}function _c(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Wt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Wt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function b_(e,t){let n=[],r=e?.implementation?.model_catalog;Wt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Wt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function y_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of b_(t,n)){let s=_c(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Bi(e){return Et(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function pc(e,t,n){let r=fc(e,t,n);return r?Mr(r.value,r.source):Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function fn(e){let t=Wt(e.pin)?e.pin:{},n=Wt(e.global)?e.global:{},r=Wt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Wt(r.session)?r.session:null,s=r?.supported===!0&&Wt(r.orchestration)?r.orchestration:null,i=Wt(e.runner_catalog)?e.runner_catalog:null,l=Pt(n.quick_fix_impl_model),a=y_(l,o,i),c={};if(o){let d=co("workflow_mode",t,n,Pt(o.workflow_mode_default));c.workflow_mode=d.source==="base"?Et(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Mr(d.value,d.source);for(let X of["spec_review","plan_review","impl_review"]){let F=`${X}_model`,I=Pt(X==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),L=co(F,t,n,I);if(L.value===null)c[F]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(L.value!=="self"&&L.value!=="skip"&&!Wt(o.review?.reviewers?.[L.value]))c[F]=Bi(Et(L.value,L.source,"",null,"explicit"));else{let U=h_(L.value,o);c[F]=Et(L.value,L.source,Dr(U),U,L.source==="base"?"default":"explicit")}}for(let[X,F]of Object.entries(dc)){let I=c[F].value;if(I==="self"||I==="skip"){c[X]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let L=Pt(o.review?.reviewers?.[I||""]?.effort),U=co(X,t,n,L);c[X]=U.value===null?Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Et(U.value,U.source,U.value,U.value,U.source==="base"?"default":"explicit")}let p=Wt(o.implementation?.default)?o.implementation.default:{},g=Pt(e.route),_=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),A=Wt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},T=_&&Wt(A[g])?A[g]:{};for(let X of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let F=co(X,t,n,X==="impl_dispatch"?Pt(T.dispatch)||Pt(p.dispatch):Pt(p[X.replace("impl_","")]));c[X]=F.value===null?Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Et(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}let N=Pt(t.impl_runtime),G=N==="inherit"?Pt(e.controller_runtime):N,le=g==="quick_fix"&&Pt(t.impl_dispatch)===null&&a.runtime!==null&&(N===null||G===a.runtime);if(le){let X=a.runtime,F=l;c.impl_dispatch=Et("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),N===null&&(c.impl_runtime=Et(X,"global",`${X} (\uC720\uB3C4)`,X,"explicit")),Pt(t.impl_model)===null&&(c.impl_model=Et(F,"global",F,F,"explicit"))}if(c.impl_dispatch.value==="main"){c.impl_dispatch.display="\uBA54\uC778";for(let X of["impl_runtime","impl_model","impl_effort","impl_speed"])c[X]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(c.impl_dispatch.value==="delegated"&&!le&&(c.impl_dispatch.display="\uC704\uC784"),c.impl_runtime.value==="inherit"&&(c.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_runtime.resolution="dynamic"),c.impl_model.value!==null){let X=c.impl_runtime.value==="inherit"?Pt(e.controller_runtime):c.impl_runtime.value,F=X?_c(X,o,i):[];if(c.impl_model.value!=="auto"&&F.length>0&&!F.includes(c.impl_model.value))c.impl_model=Bi(c.impl_model);else{let I=ji(c.impl_model.value,X,o,i);c.impl_model.display=Dr(I),c.impl_model.full_value=I}}if(c.impl_effort.value==="auto"){let X=Pt(e.transport)||(c.impl_runtime.value==="codex"?"codex-native-spawn":c.impl_runtime.value==="claude"?"implement-claude":null),F=X?Pt(o.implementation?.effort_by_transport?.[X]?.auto):null;F&&!g_.has(F)?(c.impl_effort.display=`${F} (\uBE44\uD638\uD658)`,c.impl_effort.full_value=F,c.impl_effort.resolution="incompatible"):(c.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_effort.resolution="dynamic")}c.impl_speed.value==="default"&&(c.impl_speed=c.impl_speed.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):Mr("default",c.impl_speed.source))}}else for(let d of m_.filter(p=>!p.startsWith("orchestration_")))c[d]=pc(d,t,n);if(!o){for(let[d,p]of Object.entries(dc))(c[p].value==="self"||c[p].value==="skip")&&(c[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(c.impl_dispatch.value==="main"){c.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])c[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else c.impl_dispatch.value==="delegated"&&(c.impl_dispatch.display="\uC704\uC784"),c.impl_runtime.value==="inherit"&&(c.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_runtime.resolution="dynamic"),c.impl_effort.value==="auto"&&(c.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){c[d]=pc(d,t,n);continue}let p=d.replace("orchestration_",""),g=Pt(s[p]),_=co(d,t,n,g);if(d==="orchestration_effort"&&_.source==="base"){c[d]=Et(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(_.value===null){c[d]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let A=_.source==="base"?Pt(s.model_id)||_.value:ji(_.value,null,o,i);c[d]=Et(_.value,_.source,Dr(A),A,_.source==="base"?"default":"explicit");continue}if(_.value==="default"){c[d]=_.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):Mr("default",_.source);continue}c[d]=Mr(_.value,_.source)}if(o)if(l===null){let d=c.orchestration_model.full_value;c.quick_fix_impl_model=Et(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Dr(d)})`,null,"default")}else if(a.runtime!==null){let d=ji(l,a.runtime,o,i);c.quick_fix_impl_model=Et(l,"global",Dr(d),d,"explicit")}else a.offered?c.quick_fix_impl_model=Bi(Et(l,"global","",null,"explicit")):c.quick_fix_impl_model=Mr(l,"global");return c}function v_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function ms(e){let t=Wt(e.pin)?e.pin:{},n=Wt(e.global)?e.global:{},r=Wt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let g={...r,...p};return fn({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],c=Pt(s[e.key]),d=[...e.choices];return c!==null&&!d.includes(c)&&d.unshift(c),{unset_label:v_(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let g=o({...s,[e.key]:p})[e.key];return{value:p,label:g.display,full_value:g.full_value}})}}function Pr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,c=p=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(p))},d=()=>c(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>c(null)),r.addEventListener("keydown",p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),d())}),t.addEventListener("cancel",p=>{p.preventDefault(),c(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function Ui(e){return`session:${e.provider}:${e.session_id}`}function uo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function w_(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Nr(e,t,n,r){return{attempt_id:Ui(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:uo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:w_(e,n)}}}var Wi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",k_="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",mc="\uBD84\uD574 \uC5C6\uB294 leg";function Ut(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var In=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],qr=[...In,"reasoning_output_tokens"],$_={codex:["implementation","review-consult"],claude:["subagent"]};function zi(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!In.some(t=>Number.isFinite(e[t]))}function x_(e){return!e||typeof e!="object"?!1:qr.some(t=>Number.isFinite(e[t]))}function Hi(e){let t=0;for(let n of In)t+=Ut(e?.[n]);return t}function A_(e){return!e||typeof e!="object"?!1:In.some(t=>Number.isFinite(e[t]))}function gc(e){return!e||typeof e!="object"?!1:qr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function S_(e){let t={};for(let n of qr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function hc(e){let t={};for(let n of qr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function bc(e,t){return zi(t)?Ut(t.total_tokens):e==="codex"?Ut(t.input_tokens)+Ut(t.output_tokens):Hi(t)}function E_(e){return e==="claude"?"Claude":"Codex"}function T_(e){return`\u03C4 ${vc(e)}`}function C_(e,t){let n=t.breakdown||{},r=Ut(t.total_only_subtotal);if(zi(n)||r>0&&!x_(n)){let c=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,k_];return t.replayed&&c.push(Wi),c.join(`
`)}let o=[`\uC785\uB825 ${Ut(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Ut(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${mc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${mc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Wi),a.join(`
`)}function Qt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${E_(n)} ${T_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:C_(n,r)})}return t}function hs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Ut(l.total_only_subtotal)+Ut(i.total_only_subtotal));for(let a of qr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Ut(l.breakdown[a])+Ut(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Gi(e){return!e||typeof e!="object"?null:jn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function R_(e){return e==="codex"?"codex":"claude"}function Ln(){return{subtotal:0,breakdown:S_(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function gs(e,t,n){e.subtotal+=t.subtotal,zi(t.usage)&&(e.total_only+=t.subtotal);for(let r of qr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ut(e.breakdown[r])+Ut(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function yc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function vc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Fr(e){return A_(e)?`\u03C4 ${vc(Hi(e))}`:null}function Fn(e){let t=Fr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function po(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ut(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ut(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Hi(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Wi),n.join(`
`)}function jn(e,t){let n={claude:Ln(),codex:Ln()},r={orchestrator:{claude:Ln(),codex:Ln()},implementation:{claude:Ln(),codex:Ln()},"review-consult":{claude:Ln(),codex:Ln()},subagent:{claude:Ln(),codex:Ln()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(gc(a)){let d=R_(l.runner),p=hc(a),g={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:bc(d,p)};p.replayed===!0&&(g.replayed=!0),typeof l.model=="string"&&(g.model=l.model),typeof l.session_id=="string"&&(g.session_id=l.session_id),gs(n[d],g,!0),gs(r.orchestrator[d],g,!0)}let c=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of c){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!$_[p].includes(d.role)||!gc(d.usage))continue;let g=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!g||o.has(g))continue;o.add(g);let _=hc(d.usage),A={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:_,subtotal:bc(p,_)};A.receipt_id=g,typeof d.agent_type=="string"&&(A.agent_type=d.agent_type),typeof d.agent_id=="string"&&(A.agent_id=d.agent_id),typeof d.model=="string"&&(A.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(A.effort=d.effort),typeof d.session_id=="string"?A.session_id=d.session_id:typeof d.thread_id=="string"&&(A.session_id=d.thread_id),typeof d.turn_id=="string"&&(A.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(A.completed_at=d.completed_at),_.replayed===!0&&(A.replayed=!0),gs(n[p],A,!1),gs(r[A.role][p],A,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let c=yc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(c.total_cost_usd=a.outer_cost),s[l]=c}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let c of["claude","codex"]){let d=r[l][c];d.legs.length>0&&(a[c]={...yc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var wc={running:3,paused:2,failed:1};function _r(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function kc(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function $c(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),_r(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!_r(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),p=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!p&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,c=s.get(i.bead_id);if(c){let d=wc[c.run_state],p=wc[l];if(d>p||d===p&&(c.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var bs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Yi=[...bs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Bn=["orchestration_model","orchestration_effort","orchestration_speed"],jr=[...bs,...Bn],O_=Yi.filter(e=>jr.includes(e)),xc=["delegated","main"],ys=["inherit","claude","codex"],fo=["default","fast"],_o=["standard","fast_track"],mo=["codex","opus","fable","self","skip"],vs=["codex","fable","skip"],ws=["low","medium","high","xhigh"],mn="auto";function _n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ac(e){if(!_n(e)||!_n(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))_n(r)&&_n(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Br(e,t){let n=Ac(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[mn,...r.flatMap(([,o])=>o)]}function Sc(e,t,n,r){if(!_n(e)||!_n(e.runners))return[mn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!_n(i)||!_n(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==mn&&l!==n)continue;let c=r(i,a);if(Array.isArray(c))for(let d of c)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[mn,...o]}function Ur(e,t,n){return Sc(e,t,n,(r,o)=>_n(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Vi(e,t,n){return Sc(e,t,n,(r,o)=>_n(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:_n(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function go(e,t){let n=Ac(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Ec(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Br(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Ur(t,o,r.impl_model||mn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var L_={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ki=[...O_,...Bn],I_=[...jr,...Yi].filter((e,t,n)=>n.indexOf(e)===t&&!Ki.includes(e));function Tc(e,t){let n=_n(e)?e:{},r=_n(t)?t:{},o=[];for(let i of Ki){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:L_[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...I_,...Object.keys(r)])!Ki.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function Qi(e,t,n,r,o,s){return ms({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function Cc(e,t){let n={};for(let r of Yi){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function Rc(e,t){let n={};for(let r of Bn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var Xi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Bn]}],Xn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ks={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Zi(e,t,n,r,o,s=null){let i=fn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function Oc(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of Zi(e,t,n,r,o,s))i[l.source]+=1;return i}function Lc(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Ic(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Bw=[...bs,...Bn];var Dc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function ho(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function $s(e){if(!ho(e)||!ho(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>ho(n)&&ho(n.models));return t.length>0?t:null}function wn(e,t){let n=$s(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Mc(e,t){return ho(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Pc(e,t){let n=$s(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Mc(r,r.models[t]);return[]}function D_(e){let t=$s(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of Mc(r,o))n.includes(s)||n.push(s);return n}function M_(e,t){if(!t)return D_(e);let r=$s(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of Pc(e,s))o.includes(i)||o.push(i);return o}function Nc(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=wn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Pc(t,r.impl_model):M_(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var Ji=new Set(["unavailable","not_applicable"]);function Zn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function qc(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Jn(e,t){return t===null?null:`${Xn[e]}: ${t.display} (${ks[t.source]})`}function ea(e){return e.filter(t=>t!==null).join(`
`)}function ta(e){if(typeof e!="object"||e===null)return null;let t=fr(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ea(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Xn.orchestration_model,e.model),n(Xn.orchestration_effort,e.effort),n(Xn.orchestration_speed,e.speed)])}}function Wr(e,t){let n=Zn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Zn(e,"orchestration_effort"),o=Zn(e,"orchestration_speed"),s=qc([wn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:ea(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Jn("orchestration_model",n),Jn("orchestration_effort",r),Jn("orchestration_speed",o)])}}function P_(e,t){return e===null||e.value===null||Ji.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function N_(e){return e===null||Ji.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function q_(e){return e===null?null:e.value==="auto"?"auto":Ji.has(e.resolution)?null:e.display}function zr(e,t){if(typeof e!="object"||e===null)return null;let n=Zn(e,"impl_dispatch"),r=Zn(e,"impl_runtime"),o=Zn(e,"impl_model"),s=Zn(e,"impl_effort"),i=Zn(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":qc([P_(r,t??null),N_(o),q_(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ea(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Jn("impl_dispatch",n),Jn("impl_runtime",r),Jn("impl_model",o),Jn("impl_effort",s),Jn("impl_speed",i)])}}var F_=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var Fc={orchestration_model:["fable"],impl_runtime:["claude"]},j_={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function jc(e){return typeof e=="object"&&e!==null?e:null}function Bc(e,t){return typeof e=="string"&&t.includes(e)?e:""}function B_(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>F_.includes(t))}function bo(e,t=e){let n=jc(e);if(!n)return null;let r=Bc(n.rec_orchestration_model,Fc.orchestration_model);if(r.length===0)return null;let o=Bc(n.rec_impl_runtime,Fc.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=jc(t)||{},l=Object.keys(s),a=0,c=0;for(let p of l){let g=i[p];typeof g=="string"&&g.length>0&&(a+=1,g===s[p]&&(c+=1))}let d=a===0?"unapplied":c===l.length?"applied":"diverged";return{reasons:B_(n.rec_reason),rec:s,state:d}}function xs(e){if(!e||typeof e!="object")return"";let t=Array.isArray(e.reasons)?e.reasons:[],n=j_[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(", ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function As(e){return e.replace(/\/+$/,"")}function U_(e,t){let n=As(e),r=As(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Ss(e,t){let n=new Set;for(let r of e)for(let o of t){if(!U_(r,o))continue;let s=As(r),i=As(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function na(e,t){return`${e}\0${t}`}function Uc(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function ra(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function yo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Wc(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${yo(o)})`,location_label:yo(o),scope:null,same_lane_ahead:!1};let i=ra(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function zc(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let c=na(l.root_dir,a.id);n.set(c,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(c,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,c)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let c=na(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,g=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],_=o.get(c);if(_)for(let A of g){let T=r.get(A);T&&T!==c&&!_.includes(T)&&_.push(T)}}let s=(l,a)=>{let c=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||c.has(p)||(c.add(p),d.push(...o.get(p)||[]))}return!1},i=new Map;for(let[l,a]of o){let c=[];for(let d of a){let p=n.get(d);s(d,l)&&p&&c.push(p)}c.length>0&&i.set(l,c)}return i}function Hc(e,t){return na(e,t)}async function W_(e){let t=await nn(e);be(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Es(e){return typeof e!="string"||e.length===0?"":u`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{W_(e)}}
    >
      ⧉
    </button></span
  >`}function Cs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Kc(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function mr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function Yc(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function Vc(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null};let n=!1,r=null,o=-1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;if(i.bead_id!==t||i.kind!=="review_session")continue;if(i.status==="pending"||i.status==="running"){n=!0;continue}if(i.status!=="failed")continue;let l=typeof i.finished_at=="number"?i.finished_at:0;l>=o&&(o=l,r=typeof i.cause=="string"&&i.cause.length>0?i.cause:null)}return n?{active:!0,failure:null}:{active:!1,failure:r}}function Qc(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Rs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function z_(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Cs(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Xc(e,t){let n=z_(e,t);return n?u`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?u`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?Ht(n.deploy.at):""}
            >${Rs(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${mr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Hr(e){let t=tn(e.created_at),n=tn(e.updated_at);return!t&&!n?"":u`<div class="worker-mini__meta">
    ${t?u`<span title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?u`<span>·</span>`:""}${n?u`<span title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function H_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function vo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Os(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function er(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,g)=>(p.requested_at||0)-(g.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?H_(o.phase):null,c=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:c?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?c?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function Zc(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Ts(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return u`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?u`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?u`<code>백업: ${r}</code>`:t.error?u`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${o?.url?u`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${o.number||"?"}</a
        >`:""}
    ${s?.url?u`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${s.number||"?"} ·
          ${s.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var G_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Jc(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(c){return Number.isInteger(i[c])?Number(i[c]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:G_[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Ls(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return u`${e.orchestration?u`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?u`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function K_(e){return u`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>u`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>u`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?u`<p class="mon-overlap__note">${t.action.text}</p>`:u`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function Is(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.released)?e.released:[],r=e.dependents||null,o=Array.isArray(e.overlaps)?e.overlaps:[],s=e.scope_missing===!0,i=e.popover||null,l=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&o.length===0&&!s&&!l&&!a?"":u`<div class="worker-deps">
    ${l?u`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${l.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${l.label}
        </button>`:""}
    ${a?u`<span
          class=${`worker-dep worker-dep--armed${a.orphan?" worker-dep--armed-orphan":""}`}
          title=${a.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
          >${a.orphan?u`${a.label}<button
                  type="button"
                  class="worker-dep__label mon2-arm__release"
                  data-lane-id=${a.lane_id}
                >
                  해제
                </button>`:a.label}</span
        >`:""}
    ${t.map(c=>u`<span
          class=${`worker-dep worker-dep--pred${c.foreign?" worker-dep--foreign":""}`}
          title=${c.title||""}
          >${c.openable===!0?u`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${c.id}
                data-root-dir=${c.root_dir||""}
              >
                ${c.label}
              </button>`:c.label}</span
        >`)}${n.map(c=>u`<span
          class=${`worker-dep worker-dep--released${c.foreign?" worker-dep--foreign":""}`}
          title=${c.title||""}
          >${c.openable===!0?u`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${c.id}
                data-root-dir=${c.root_dir||""}
              >
                ${c.label}
              </button>`:c.label}</span
        >`)}${r?u`<span
          class="worker-dep worker-dep--dependents"
          title=${r.title}
          >→ 후속 ${r.count}</span
        >`:""}${o.map(c=>u`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${c.id}
          aria-label=${`scope \uACB9\uCE68 ${c.id} (${c.location_label})`}
          title=${[`\uACB9\uCE68 ${c.id} (${c.location_label})`,...c.prefixes].join(`
`)}
        >
          ⧉ ${c.id}
        </button>`)}${s?u`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${i?K_(i):""}
  </div>`}function Ds(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?u`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Y_(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],o=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return u`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${o}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function eu(e){return e?u`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Ms(e){return e?u`<span
    class="ctl-chip ctl-chip--label worker-card__rec"
    data-state=${e.state}
    title=${xs(e)}
    >${"\uBCF5\uC7A1"}</span
  >`:""}function tu(e,t){return!e||typeof t!="number"?"":u`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Ps(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return u`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function V_(e){let t=Array.isArray(e.badges)?e.badges:[],n=Qt(e.usage),r=Fn(e.usage),o=tn(e.done_at);return u`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?u`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${tu(e.pr_url,e.pr_number)}${o?u`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
            >완료 ${o}</span
          >`:""}
      ${t.map(s=>u`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${s}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>u`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?u`<span class="worker-usage" title=${po(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?u`<span
            class="worker-mini__work"
            title=${Kc(e.work_kind)}
            >작업 ${mr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function kn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return V_(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=Qt(e.usage),s=Fn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,c=a?tn(e.done_at):"",d=n?u`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?u`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.worker_serial===!0?u`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",_=e.workspace_name?u`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",A=u`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,T=e.lane==="done"?"":Ds(e.workflow),N=e.lane==="done"?"":eu(e.from_id),G=Ps(e.priority),le=u`<span class="worker-mini__title">${e.title}</span>`,X=tu(e.pr_url,e.pr_number),F=r.map(xe=>xe===e.live_badge?u`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${xe}</span
        >`:u`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${xe===e.completion_badge&&e.completion_title||""}
          >${xe}</span
        >`),I=e.reason?u`<span class="worker-mini__reason">${e.reason}</span>`:"",L=o.length>0?o.map(xe=>u`<span class="worker-usage" title=${xe.tooltip}
              >${xe.label}</span
            >`):s?u`<span class="worker-usage" title=${po(e.usage)}
            >${s}</span
          >`:"",U=i?u`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?u`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",H=e.merge_action?u`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",te=e.cancel_action?u`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",D=e.discard,K=D?.action||e.discard_action?u`<button
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
        </button>`:"",W=e.stale_work||null,J=W?u`${W.can_resume||W.can_continue?u`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${W.action_id}
            ?disabled=${W.locked}
          >
            기존 작업 이어가기
          </button>`:""}${W.can_backup_fresh?u`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${W.action_id}
            ?disabled=${W.locked}
          >
            백업 후 새로 시작
          </button>`:""}${W.can_recheck?u`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${W.action_id}
            ?disabled=${W.locked}
          >
            다시 확인
          </button>`:""}`:"",Ce=W?u`<div class="worker-mini__stale">
        <strong>${W.title}</strong>
        <span>${W.summary}</span>
        <span>${W.cause}</span>
        ${W.can_backup_fresh?u`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ke=e.revise_action?u`<button
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
        </button>`:"",ie=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),q=Ms(e.rec),$e=Es(e.log_path),Se=_||T||N||ie||q||L||$e?u`<div class="worker-chips">
          ${_}${T}${N}${ie?Ls(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${q}${L}${$e}
        </div>`:"",S=Is(e.dependency_chips),ee=Ts(e),Ee=t.actions?t.actions:"",ge=!!(i||e.merge_action||e.cancel_action||e.discard_action||D?.operation||e.revise_action||W);return u`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?u`<div class="worker-mini__row1">
            ${_}${A}${G}${N}${X}${le}${Ee}
          </div>
          <div class="worker-mini__row2">
            ${L}${c?u`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?u`<span
                  class="worker-mini__work"
                  title=${Kc(e.work_kind)}
                  >작업 ${mr(e.work_ms)}</span
                >`:""}${F}${U}
            <span class="worker-mini__actions"
              >${H}${te}${K}</span
            >
            ${Hr(e)}
          </div>`:l?u`<div class="worker-mini__head">
              ${d}${p}${A}${G}${X}${F}${g}${I}${Ee}
            </div>
            <div class="worker-mini__body">${le}${Ce}</div>
            ${S}${Se}${ge?u`<div class="worker-mini__foot">
                  ${U}
                  <span class="worker-mini__actions"
                    >${H}${te}${K}${ke}${J}</span
                  >
                  ${Ts(e)}
                </div>`:""}
            ${Hr(e)}`:u`<div class="worker-mini__line">
              ${d}${p}${A}${G}${le}${X}${F}${g}${I}${U}${H}${te}${K}${Ee}
            </div>
            ${S}${Se}${ee} ${Hr(e)}`}
  </div>`}function Q_(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(u`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(u`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?u`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return u`${r}`}var X_={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"},Ns="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function sa(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=X_[e.session_preferred_reason||""]||"",c=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],p=d.includes("missing_description"),g=d.some(X=>X.startsWith(Ns)),_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),A=Is(e.dependency_chips),T=e.workspace_name?u`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",N=Ds(c),G=eu(e.from_id),le=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return u`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?u`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Ps(e.priority)}
      ${r?u`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:l?u`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${a}
              >세션 권장</span
            >`:""}${Ms(e.rec)}${Y_(c)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${c?ds(c,e.status,{onOpenDoc:n.onOpenDoc}):""}${A}
    ${T||N||G||le?u`<div class="worker-chips">
          ${T}${N}${G}${Ls(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?u`<div class="worker-card__place-menu">
            ${Q_(t.lanes,e.id)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:u`${e.reason?u`<span
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
    ${Hr(e)}
  </div>`}function Dn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=u`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?u`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return u`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${en(e.id||void 0)}
    data-lane=${e.lane}
  >
    ${e.collapsible?u`<header class="worker-pane__hd">
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
        </header>`:u`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":u`${e.header_row?e.header_row:""}${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?u`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(o=>e.lane==="candidate"?sa(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):kn(o))}
          </div>`}
  </section>`}function Gc(e,t,n){return u`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function qs(e){let t=e.parallel,n=e.serial,r=t.drop||{};return u`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${Gc("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":u`<div
            class="worker-wait__area-body"
            data-drop=${en(r.drop)}
            data-root-dir=${en(r.root_dir)}
            data-lane-id=${en(r.lane_id)}
            data-lane-length=${en(r.lane_length)}
          >
            ${t.rows.length===0?u`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:t.rows}
          </div>`}
    </section>
    <section
      class="worker-wait__area worker-wait__area--serial${n.collapsed?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="worker-wait__area-hd">
        ${Gc("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":u`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Z_(o))}
          </div>`}
    </section>
  </div>`}function Z_(e){let t=e.drop||{},n=e.badge?u`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return u`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Dn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:u`${n}${e.header_control?e.header_control:""}`,body:u`<div
        class="worker-wait__rows"
        data-drop=${en(t.drop)}
        data-root-dir=${en(t.root_dir)}
        data-lane-id=${en(t.lane_id)}
        data-lane-length=${en(t.lane_length)}
      >
        ${e.rows.length===0?u`<div class="worker-pane__empty">
              비어 있음 — 행을 여기로 드래그
            </div>`:e.rows}
      </div>`})}
    ${e.empty?u`<div class="worker-wait__hint">${e.title} · 비어 있음</div>`:""}
    ${e.cycle?u`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:""}
    ${e.after?e.after:""}
  </div>`}function Fs(e){return e.count?u`<section
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
  </section>`:""}var nu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],wo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function js(e,t){let n=nu.find(o=>o.step===e);if(!n)return null;let r=nu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function ru(e){let t=wo.findIndex(n=>n.step===e);return wo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function gr(e){let t=wo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function J_(e){let t=wo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:wo.length}}function Bs(e){let t=J_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var aa=new Set(["queued","running","retry_pending"]),ou=new Set(["failed","succeeded"]),em={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},ko={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},tm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:ko.base_containment,child_sweep:ko.child_sweep,branch_cleanup:ko.branch_cleanup,parent_close:ko.parent_close};function nm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function rm(e,t,n){return!["verify","deploy"].includes(e.kind)||![...aa,...ou].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function om(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=c=>c.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function ia(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=em[o];if(!s)return null;let i=js(n,`${r} ${s}`);return i?{...i,active:aa.has(o),failed:o==="failed"}:null}function sm(e){return!e||typeof e!="object"?null:tm[e.step]||null}function $o(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=sm(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=nm(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&rm(A,t,l)).sort(om):[],c=i?a:[],d=c.find(A=>aa.has(A.state));if(d)return ia(d);if(o)return o.step==="repo_operations"&&a[0]?ia(a[0],!0):null;let p=c.find(A=>ou.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return ia(p);if(r){let A=js(r.step,r.label);return A?{...A,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?ko[e.cleanup_cursor]:null;if(!g)return null;let _=js(g.step,g.label);return _?{..._,active:!0,failed:!1}:null}function Us(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var im="\uBBF8\uC801\uC7AC";function la(e,t){let n=io(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var am=10080*60*1e3;function su(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-am)return null;let o=io(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} \uD574\uC81C: ${t.id}`,title:`${t.id}\uAC00 ${Ht(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function iu(e){let t=e.count;if(typeof t!="number"||!Number.isFinite(t)||t<=0)return null;let n=Array.isArray(e.ids)?e.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t-n.length,o=[n.join(", "),r>0?`\uC678 ${r}`:""].filter(s=>s.length>0);return{count:t,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9AC\uB294 \uC774\uC288: ${o.join(" ")}`}}function au(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let c=la(s,{id:a,location_label:o.get(a)||im}),d=n[a];c.foreign!==!0?c.openable=!0:typeof d=="string"&&d.length>0&&(c.openable=!0,c.root_dir=d),l.push(c)}l.length>0&&r.set(s,l)}return r}var zs=1,xo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ua=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Gr={show_blocked:!0,spec:"all"},lu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function lm(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!_r(r)||(n=typeof r.status=="string"?r.status:null);return n}function cm(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!_r(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function um(e,t,n={}){let{winners:r,resumed_from_ids:o}=$c(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,c=l.run_state,d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,g=c!=="running"&&p&&!o.has(a.attempt_id),_=p?o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00",A=ft(n.observations?.[i]),T=ft(A.pr),N=typeof a.merge_sha=="string"&&a.merge_sha.length>0||T.state==="MERGED",G=er(n.discard_operations,i,{attempt_id:a.attempt_id,merged:N}),le=c==="failed"?{cause:typeof a.cause=="string"?a.cause:null,cause_detail:a.cause_detail&&typeof a.cause_detail=="object"?a.cause_detail:null,finished_at:typeof a.finished_at=="number"?a.finished_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,observed_effort:typeof a.observed_effort=="string"?a.observed_effort:null,speed:typeof a.speed=="string"?a.speed:null,attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",usage:a.usage&&typeof a.usage=="object"?a.usage:null,halted_auto_advance:a.halted_auto_advance===!0,quickfix_lane:a.quickfix_lane===!0,quickfix_landing:a.quickfix_landing&&typeof a.quickfix_landing=="object"?a.quickfix_landing:null,resume_eligible:g,resume_reason:_,landed:Zc(a),confirmation:G.confirmation}:null;s.set(i,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:d,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,last_activity:a.last_activity&&typeof a.last_activity=="object"?a.last_activity:null,legs:Array.isArray(a.legs)?a.legs:[],runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,status:typeof a.status=="string"?a.status:null,usage:jn(e,a.bead_id),...le?{failure:le}:{},can_pause:c==="running"&&p,can_resume:g})}return s}function cu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function ft(e){return e&&typeof e=="object"?e:{}}function dm(e,t,n){let r=ft(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=g=>fn({pin:g,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,c;try{a=l(r),c=l(null)}catch{return null}let d=uu(Wr(a,s),Wr(c,s)),p=uu(zr(a,null),zr(c,null));return d||p?{orchestration:d,worker:p}:null}function uu(e,t){return!e||t&&t.text===e.text?null:e}var pm=2;function fm(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(a=>a&&typeof a=="object"&&typeof a.id=="string").slice().sort((a,c)=>(typeof c.closed_at=="number"?c.closed_at:0)-(typeof a.closed_at=="number"?a.closed_at:0)),s=[];for(let a of o){let c=su(e,a,n);c&&s.push(c)}if(s.length===0)return null;let i=s.slice(0,pm),l=s.length-i.length;if(l>0){let a=i[i.length-1];i[i.length-1]={...a,label:`${a.label} \uC678 ${l}`}}return i}function da(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var _m=new Set(["quick_fix","spec_backed","full_plan"]);function du(e){return typeof e=="string"&&_m.has(e)}function mm(e){let t={...ft(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function gm(e,t,n){let r=e.execution_defaults??null,o=e.runner_catalog??null,s=mm(e),i=du(n)?n:du(t.route)?t.route:null,l=_=>{try{return fn({pin:t,global:s,execution_defaults:r,runner_catalog:o,route:i,controller_runtime:_})}catch{return null}},a=l(null);if(!a)return null;let c=wn(o,a.orchestration_model.value??""),d=c===null?a:l(c)||a,p=Wr(d,o),g=zr(d,c);return p||g?{orchestration:p,worker:g}:null}function pa(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function hm(e){let t={};for(let l of In)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let c=!1;for(let d of In)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,c=!0);c&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?Qt(hs(i)):n?Fn(t):null}function pu(e,t){let n=ra(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function bm(e,t,n){let r=t.get(e);if(!r)return pu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return yo(r)}function ym(e,t,n,r){let o=t.get(e);if(!o)return{label:pu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":yo(o),title:""}}function vm(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function wm(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function km(e,t,n,r,o,s,i){let l=[];return e.forEach((a,c)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let p=a.status==="confirmed"?"confirmed":"draft",g=Array.isArray(a.entries)?a.entries:[],_=[];g.forEach((G,le)=>{let X=G&&typeof G.bead_id=="string"?G.bead_id:"";if(X.length===0)return;let F=G&&typeof G.root_dir=="string"?G.root_dir:"",I=n.get(X),L=I?I.state:void 0,U=L==="running"||L==="pr_wait"||L==="done",H=!I||L==="runnable",te=I&&I.lane==="parallel"&&typeof I.position=="number"?I.position-1:null,D=ym(X,n,r,t),K=_.length>0?_[_.length-1].id:null,W=p==="confirmed"&&K!==null&&!(t.get(X)||[]).includes(K);_.push({id:X,title:o.get(X)||X,root_dir:I?I.root_dir:F,workspace_name:I?I.workspace_name:s.get(F)||"",seq:le+1,location_label:D.label,location_title:D.title,draggable:!U,fixed:U,done:L==="done",unplaced:H,mismatch:W,...te!==null?{queue_index:te}:{}})}),_.forEach((G,le)=>{G.seq=le+1});let A=_.length>0&&_.every(G=>G.done),T=_.filter(G=>!G.fixed&&i.armed_by_bead.get(G.id)!==d).map(G=>G.id),N=wm(d,p,_,A,T,i);l.push({lane_id:d,status:p,draft:p==="draft",number:c+1,label:`\uC5F0\uACB0 ${c+1} \xB7 \uB808\uD3EC \uAC04`,rows:_,all_done:A,can_confirm:p==="draft"&&_.length>=2,has_mismatch:p==="confirmed"&&_.some(G=>G.mismatch||G.unplaced),unlaunched:T,...N})}),l}function $m(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function xm(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let c=`${a.root_dir}\0${a.id}`,d=s.get(c);if(d){d.cards.push(a);continue}let{scope:p,state:g}=$m(a,t,n);g!==void 0&&(a.scope_state=g),s.set(c,{cards:[a],scope:p})}let i=new Map;for(let a of s.values()){let c=a.cards[0].scope_state;if(c!==void 0)for(let g of a.cards)g.scope_state=c;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=i.get(d);p?p.push(a):i.set(d,[a])}let l=(a,c,d)=>{let p=c.cards[0],g={id:p.id,title:p.title,location_label:bm(p.id,r,o),prefixes:d};for(let _ of a.cards)_.overlap_chips?_.overlap_chips.push(g):_.overlap_chips=[g]};for(let a of i.values())for(let c=0;c<a.length;c+=1)for(let d=c+1;d<a.length;d+=1){let p=Ss(a[c].scope,a[d].scope);p.length!==0&&(l(a[c],a[d],p),l(a[d],a[c],p))}}function ca(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ws(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function tr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...Gr,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&xo.some(v=>v.value===n.candidate_sort)?n.candidate_sort:"repo_spec",c=n&&n.groups==="all"?"all":"nonempty",d=Date.now(),p=new Map;for(let v of o)v&&typeof v.root_dir=="string"&&p.set(v.root_dir,v);let g=new Map;for(let v of o)v&&typeof v.root_dir=="string"&&g.set(v.root_dir,v.name||v.root_dir);for(let v of r)v&&typeof v.root_dir=="string"&&g.set(v.root_dir,v.name||v.root_dir);let _=[],A=[],T=[],N=[],G=[],le=[],X=new Map,F=new Map,I=new Map,L=new Map,U=new Map,H=new Map,te=new Map,D=new Map,K=new Map,W=new Map,J=new Map,Ce=new Map,ke=new Set,ie=new Map,q=new Map,$e=new Map;for(let v of r){if(!v||typeof v.root_dir!="string")continue;let ne=v.root_dir,Te=v.name||ne,he=p.get(ne),Re=he&&typeof he.revision=="number"?he.revision:typeof v.revision=="number"?v.revision:0,Be=ft(v.attempts),ze=ft(v.bead_titles);for(let[y,f]of Object.entries(ze))typeof f=="string"&&f.length>0&&$e.set(y,f);let it=ft(v.bead_times),vt=ft(v.pr_observations),Nt=ft(v.admission),Ft=ft(v.revise_parked),xt=ft(v.merge_queue_state),Rt=ft(v.cleanup_failed),bt=ft(v.discard_operations),Ge=ft(v.bead_blocked_by);Object.hasOwn(v,"bead_scope")&&ie.set(ne,ft(v.bead_scope));let O=ft(v.bead_workflow),oe=ft(v.pr_activity),we=Array.isArray(v.repo_operations)?v.repo_operations:[];D.set(ne,we);let E=typeof v.declared_base=="string"?v.declared_base:null;te.set(ne,E),H.set(ne,Object.entries(Rt).map(([y,f])=>({bead_id:y,step:f&&f.step?f.step:"",reason:f&&f.reason?f.reason:"",at:f&&typeof f.at=="number"?f.at:null,detail:f&&typeof f.detail=="string"?f.detail:null,output_tail:f&&typeof f.output_tail=="string"&&f.output_tail?f.output_tail:void 0,log_path:f&&typeof f.log_path=="string"&&f.log_path?f.log_path:void 0,retry_count:f&&typeof f.retry_count=="number"&&Number.isInteger(f.retry_count)&&f.retry_count>0?f.retry_count:0,failure_code:f&&typeof f.failure_code=="string"?f.failure_code:void 0})));for(let[y,f]of Object.entries(ft(v.bead_overlay)))f&&typeof f=="object"&&K.set(`${ne}\0${y}`,f);let V=new Map;for(let y of Object.values(Be))y&&typeof y.attempt_id=="string"&&V.set(y.attempt_id,y);let Le=Array.isArray(v.merge_queue)?v.merge_queue:[],Ve=new Set(Le.filter(y=>y&&typeof y.bead_id=="string").map(y=>y.bead_id)),Pe=new Map(Le.filter(y=>y&&typeof y.bead_id=="string").map(y=>[y.bead_id,y])),Xe=new Map,ot=new Map,Ue=new Map,tt=new Map;Le.forEach((y,f)=>{y&&typeof y.bead_id=="string"&&(Xe.set(y.bead_id,f+1),ot.set(y.bead_id,y.resolution),Ue.set(y.bead_id,y.continuation_action||null),tt.set(y.bead_id,y.authority||null))});let wt=ft(v.auto_merge_skips),Ke=y=>{let f=wt[y];if(!f)return null;let j=ft(ft(vt[y]).pr).head_sha;return j&&j===f.head_sha?f.reason||"":null};U.set(ne,{positions:Xe,resolutions:ot,continuations:Ue,authorities:tt,state:{active:typeof xt.active=="string"?xt.active:null,failures:ft(xt.failures),waiting:xt.waiting&&typeof xt.waiting.bead_id=="string"&&typeof xt.waiting.reason=="string"?xt.waiting:null},auto_excluded:(Array.isArray(v.pr_wait)?v.pr_wait:[]).map(y=>y&&y.bead_id).filter(y=>typeof y=="string"&&Ke(y)!==null),running:Le.length>0});let kt=Array.isArray(v.queue)?v.queue:[];for(let y of[...kt,...Array.isArray(v.pr_wait)?v.pr_wait:[]])y&&typeof y.bead_id=="string"&&typeof y.armed_by_lane=="string"&&y.armed_by_lane.length>0&&J.set(y.bead_id,y.armed_by_lane);for(let y of Array.isArray(v.disarmed_on_load)?v.disarmed_on_load:[])typeof y=="string"&&y.length>0&&ke.add(y);let Ye=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).filter(y=>y&&/^s[1-5]$/.test(y.id)&&Array.isArray(y.entries)),ct=ft(v.lane_states),Ot=typeof v.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(v.serial_lane_count))):Math.min(5,Ye.length);I.set(ne,Ot),L.set(ne,kt.length);let At=new Map(Ye.map(y=>[y.id,y])),Tt=new Map;for(let y of Ye)for(let f of y.entries)f&&typeof f.bead_id=="string"&&Tt.set(f.bead_id,y.id);for(let[y,f]of Object.entries(Ge))Array.isArray(f)&&W.set(y,f.filter(j=>typeof j=="string"&&j.length>0));let Gt=Array.isArray(v.done)?v.done:[];for(let y of Gt)y&&typeof y.bead_id=="string"&&le.push({id:y.bead_id,root_dir:ne,workspace_name:Te});let cn=new Map;for(let y of Gt)y&&typeof y.bead_id=="string"&&typeof y.added_at=="number"&&cn.set(y.bead_id,y.added_at);let Lt=y=>({id:y,title:ze[y]||y,root_dir:ne,workspace_name:Te,expected_revision:Re,draggable:!1,...ft(it[y]).created_at?{created_at:ft(it[y]).created_at}:{},...ft(it[y]).updated_at?{updated_at:ft(it[y]).updated_at}:{}}),Kt=y=>{let f=O[y]?.chips?.pr;return f&&typeof f.number=="number"&&typeof f.url=="string"?{pr_number:f.number,pr_url:f.url}:{}},jt=y=>Object.hasOwn(Ge,y)?{blocked_by:Array.isArray(Ge[y])?Ge[y].filter(f=>typeof f=="string"&&f.length>0):[]}:{},It=new Set;for(let[y,f]of um(Be,cn,{discard_operations:bt,observations:vt})){It.add(y);let j=f.run_state==="failed"?vm(Be,f.attempt_id):null;j!==null&&Ce.set(y,j);let ue=V.get(f.attempt_id)||null,ae=K.get(`${ne}\0${y}`),We=ae&&ae.rollup?ae.rollup:null,at=da(E,ue?ue.target_base:null),ut=ue?pa(ue,V):!1,st=ue&&ue.quickfix_lane===!0&&ue.quickfix_landing&&typeof ue.quickfix_landing=="object"?ue.quickfix_landing:null,_t=st&&typeof st.reason=="string"&&st.reason.length>0?st.reason:null,gt=st?$o({bead_id:y,merge_sha:st.head_sha,cleanup_cursor:st.cursor,cleanup_failed:_t?{step:st.cursor,reason:_t}:null,repo_operations:we}):null;A.push({...Lt(y),lane:"running",...jt(y),...Tt.has(y)?{serial_lane_id:Tt.get(y)}:{},attempt_id:f.attempt_id,run_state:f.run_state,status:f.status||void 0,workflow:O[y]||null,can_pause:f.can_pause,can_resume:f.can_resume,started_at:f.started_at,last_event_at:f.last_event_at,last_activity:f.last_activity,legs:f.legs,runner:f.runner,model:f.model,effort:f.effort,speed:f.speed,resumed_from:f.resumed_from,continuation_mode:f.continuation_mode,usage:f.usage,failure:f.failure||null,exec_chips:{orchestration:ta(f),worker:null},discard:er(bt,y,{attempt_id:f.attempt_id,merged:f.failure?.confirmation==="merged"||ft(vt[y]).pr?.state==="MERGED"}),...We?{rollup:We}:{},...ut?{conflict_resolution:!0}:{},...at?{base_exception:at}:{},...gt?{landing:gt}:{},badges:f.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:f.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:f.run_state==="failed"})}for(let[y,f]of kc(Be)){if(A.some(ue=>ue.id===y))continue;let j=f.attempt;A.push({...Lt(y),lane:"running",kind:"session",...jt(y),attempt_id:typeof j.attempt_id=="string"?j.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:O[y]||null,can_pause:!1,can_resume:!1,started_at:f.started_at,last_event_at:typeof j.last_event_at=="number"?j.last_event_at:null,last_activity:j.last_activity&&typeof j.last_activity=="object"?j.last_activity:null,legs:Array.isArray(j.legs)?j.legs:[],runner:typeof j.runner=="string"?j.runner:null,model:typeof j.model=="string"?j.model:null,effort:typeof j.effort=="string"?j.effort:null,speed:typeof j.speed=="string"?j.speed:null,resumed_from:null,continuation_mode:null,usage:j.usage&&typeof j.usage=="object"?j.usage:null,exec_chips:{orchestration:ta(j),worker:null},discard:er(bt,y,{merge_queued:!0}),badges:[f.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let y of Array.isArray(v.session_active)?v.session_active:[]){let f=y&&y.bead_id;typeof f!="string"||It.has(f)||(It.add(f),Array.isArray(y.blocked_by)&&y.blocked_by.length>0&&W.set(f,y.blocked_by.filter(j=>typeof j=="string"&&j.length>0)),typeof y.title=="string"&&y.title.length>0&&$e.set(f,y.title),A.push({...Lt(f),title:y.title||ze[f]||f,lane:"running",kind:"session",status:"in_progress",started_at:ca(y.started_at)??ca(y.updated_at)??void 0,updated_at:ca(y.updated_at)??void 0,workflow:y.workflow||null,labels:Array.isArray(y.labels)?y.labels:[],spec_id:typeof y.spec_id=="string"?y.spec_id:"",blocked:y.blocked===!0,...Array.isArray(y.blocked_by)?{blocked_by:y.blocked_by.filter(j=>typeof j=="string"&&j.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(y.session_refs)?y.session_refs:[],badges:[],alert:!1}))}for(let y of Array.isArray(v.pr_wait)?v.pr_wait:[]){let f=y&&y.bead_id;if(typeof f!="string"||It.has(f))continue;It.add(f);let j=ft(vt[f]),ue=ft(j.pr),ae=j.gate?ft(j.gate):null,We=Ve.has(f),at=Pe.get(f)?.continuation_action||null,ut=!!at&&at.continuation===null,st=xt.active===f,_t=y.external===!0,gt=Rt[f]||null,ht=ft(oe[f]),h=$o({bead_id:f,merge_sha:y.merge_sha,cleanup_cursor:y.cleanup_cursor,merge_progress:ht.merge_progress||null,cleanup_failed:gt,repo_operations:we}),b=Us(h),R=!!ae&&ae.base_badge==="\uCDA9\uB3CC",M=!!gt&&["child_sweep","branch_cleanup","parent_close"].includes(gt.step)&&!!ae&&ae.tier==="merged",m=_t&&!!gt&&!!ae&&ae.tier==="merged",w=!!ae&&["closed_unmerged","review","undecidable"].includes(ae.tier)&&ae.reason!=="review_receipt_undetermined",z=er(bt,f,{external:_t,merge_active:st||h?.step==="merge",merge_queued:We,cleanup_active:b,merged:!!gt||ae?.tier==="merged"}),ce=!!z.operation;T.push({...Lt(f),lane:"pr_wait",...jt(f),workflow:O[f]||null,pr_number:typeof ue.number=="number"?ue.number:null,pr_url:typeof ue.url=="string"?ue.url:void 0,external:_t,usage:jn(Be,f),merge_step:h,badges:ut?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:h?[ae?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:gt?[gr(gt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${gr(gt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ae?.gate_badge=="string"&&ae.gate_badge.length>0?[ae.gate_badge]:[],alert:h?h.failed===!0:!!gt||w,reason:gt&&h?.active!==!0?Bs(gt.step):"PR \uB300\uAE30",merge_action:ae?.tier==="merged"&&!M&&!m?!1:!We||ut,merge_enabled:!ce&&(ut||ae?.enabled===!0||R||M||m),merge_label:ut?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":m||M?"\uC815\uB9AC \uC7AC\uAC1C":R&&!M?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ut?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ce?z.error?`\uD3D0\uAE30 \uC2E4\uD328: ${z.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${z.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:m?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":M?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":R?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ae?.enabled===!0?`\uBA38\uC9C0 (${ae.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ae?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:We&&!ut,cancel_enabled:!st,continuation_mismatch:at?.mismatch||null,discard:z,discard_action:z.action,discard_enabled:z.enabled,discard_title:z.title})}let Zt=(y,f,j,ue)=>{let ae=y&&y.bead_id;if(typeof ae!="string"||It.has(ae))return null;It.add(ae);let We=Ft[ae],at=er(bt,ae),ut=at.operation?at:null,st={...Lt(ae),lane:f,workflow:O[ae]||null,draggable:!ut,discard:ut||void 0,reason:cu(Nt,ae),seq:j+1,queue_position:j+1,queue_index:j,queue_length:ue,badges:We?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!We,revise_action:!!We,revise_enabled:!!We&&!ut,revise_title:We?We.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${We.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},_t=jt(ae);return Object.hasOwn(_t,"blocked_by")&&(st.blocked_by=_t.blocked_by),st};for(let y=0;y<kt.length;y++){let f=Zt(kt[y],"queue",y,kt.length);if(!f)continue;N.push(f);let j=X.get(ne);j?j.push(f):X.set(ne,[f])}let Yt=y=>{let f=T.find(We=>We.id===y&&We.root_dir===ne);if(f)return{id:y,title:f.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let j=A.find(We=>We.id===y&&We.root_dir===ne),ue=j?j.run_state:lm(Be,y),ae=ue==="failed"||ue==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ue==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:y,title:j?j.title:Lt(y).title,badge:ae}},zt=[];for(let y=0;y<Math.max(Ot,Ye.length);y++){let f=`s${y+1}`,j=At.get(f),ue=j&&Array.isArray(j.entries)?j.entries:[],ae=ft(ct[f]),We=Array.isArray(ae.occupied_by)?ae.occupied_by.filter(st=>typeof st=="string"):[],at=new Set(We),ut=[];for(let st=0;st<ue.length;st++){let _t=ue[st]&&ue[st].bead_id;if(typeof _t=="string"&&at.has(_t)){It.add(_t);continue}let gt=Zt(ue[st],f,st,ue.length);gt&&(ut.push(gt),N.push(gt))}ut.length===0&&We.length===0&&(Ot<=1||y>=Ot)||zt.push({id:f,index:y,items:ut,raw_length:ue.length,occupied_by:We,occupants:We.map(st=>Yt(st)),corrections:Array.isArray(ae.corrections)?ae.corrections.length:0,cycle:ae.cycle===!0,...ut.length===0&&We.length===0?{empty:!0}:{}})}F.set(ne,zt);let un=Array.from({length:Ot},(y,f)=>{let j=`s${f+1}`,ue=At.get(j),ae=ue&&Array.isArray(ue.entries)?ue.entries:[],We=ft(ct[j]);return{id:j,index:ae.length,length:ae.length,occupied_by:Array.isArray(We.occupied_by)?We.occupied_by.filter(at=>typeof at=="string"):[]}});for(let y of Array.isArray(v.runnable)?v.runnable:[]){let f=y&&y.bead_id;if(typeof f!="string"||It.has(f))continue;It.add(f);let j=y.workflow&&typeof y.workflow=="object"?y.workflow:null,ue=j&&typeof j.route=="string"&&j.route||(typeof y.route=="string"?y.route:null),ae=dm(ft(he),y.exec_pins,ue),We=bo(y.rec,y.exec_pins);Array.isArray(y.blocked_by)&&y.blocked_by.length>0&&W.set(f,y.blocked_by.filter(b=>typeof b=="string"&&b.length>0)),typeof y.title=="string"&&y.title.length>0&&$e.set(f,y.title),Array.isArray(y.scope)&&q.set(f,y.scope.filter(b=>typeof b=="string"&&b.length>0));let at=y.eligible!==!1,ut=y.worker_ineligible===!0,st=Object.hasOwn(y,"eligible"),_t=[];typeof y.reason=="string"&&y.reason.length>0&&_t.push(y.reason);let gt=cu(Nt,f);gt&&_t.push(gt);let ht=fm(f,y.release_info,d),h=y.dependents_info&&typeof y.dependents_info=="object"?iu(y.dependents_info):null;_.push({...Lt(f),title:y.title||ze[f]||f,lane:"runnable",draggable:!st,queue_placeable:at&&!ut,...ut?{worker_ineligible:!0}:{},...y.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof y.session_preferred_reason=="string"?y.session_preferred_reason:""}:{},...ht||h?{dependency_chips:{...ht?{released:ht}:{},...h?{dependents:h}:{}}}:{},reason:_t.join(" \xB7 "),created_at:y.created_at??void 0,updated_at:y.updated_at??void 0,status:typeof y.status=="string"?y.status:void 0,labels:Array.isArray(y.labels)?y.labels:[],spec_id:typeof y.spec_id=="string"?y.spec_id:"",published:y.published===!0,workflow:j||(ue?{route:ue,chips:{route:ue}}:null),...ae?{exec_chips:ae}:{},...We?{rec:We}:{},blocked:y.blocked===!0,...Array.isArray(y.blocked_by)?{blocked_by:y.blocked_by.filter(b=>typeof b=="string"&&b.length>0)}:{},place_index:kt.length,place_lanes:un})}for(let y of Gt){let f=y&&y.bead_id;if(typeof f!="string"||It.has(f)||(It.add(f),s!==void 0&&typeof y.added_at=="number"&&y.added_at<s))continue;let j=cm(Be,f),ue=j&&typeof j.done_kind=="string"?j.done_kind:null;G.push({...Lt(f),lane:"done",done:!0,done_layout:"three_line",usage:jn(Be,f),work_ms:Qc(Be,f),done_at:typeof y.added_at=="number"?y.added_at:void 0,done_kind:ue,...Kt(f),badges:[...ue&&lu[ue]?[lu[ue]]:[],...Yc(Be,f)]})}for(let y of Array.isArray(v.session_done)?v.session_done:[]){let f=y&&(y.id||y.bead_id);typeof f!="string"||It.has(f)||(It.add(f),G.push({...Lt(f),...y,id:f,root_dir:ne,workspace_name:Te,expected_revision:Re,lane:"done",done:!0}))}}if(K.size>0)for(let v of[..._,...N,...A,...T,...G]){let ne=K.get(`${v.root_dir}\0${v.id}`);if(!ne||(typeof ne.priority=="number"&&(v.priority=ne.priority),typeof ne.from_id=="string"&&ne.from_id.length>0&&(v.from_id=ne.from_id),!Object.hasOwn(ne,"metadata")))continue;let Te=ft(ne.metadata);if(v.rec=bo(Te),v.lane==="runnable"||v.lane.startsWith("s")||v.lane==="queue"){let he=gm(ft(p.get(v.root_dir)),Te,typeof ne.route=="string"&&ne.route.length>0?ne.route:ft(v.workflow).route);he&&(v.exec_chips=he)}}let Se=new Map;o.forEach((v,ne)=>{v&&typeof v.root_dir=="string"&&Se.set(v.root_dir,ne)});let S=n&&n.running_sort==="repo"?"repo":"started";A.sort((v,ne)=>{let Te=v.kind==="session",he=ne.kind==="session";if(Te!==he)return Te?1:-1;if(Te&&he){let ze=Ws(ne.updated_at)-Ws(v.updated_at);return ze!==0?ze:v.id.localeCompare(ne.id)}if(S==="repo"){let ze=Se.get(v.root_dir)??Number.MAX_SAFE_INTEGER,it=Se.get(ne.root_dir)??Number.MAX_SAFE_INTEGER;if(ze!==it)return ze-it}let Re=typeof v.started_at=="number"&&Number.isFinite(v.started_at)?v.started_at:null,Be=typeof ne.started_at=="number"&&Number.isFinite(ne.started_at)?ne.started_at:null;return Re!==null&&Be!==null&&Re!==Be?Re-Be:Re===null&&Be!==null?1:Re!==null&&Be===null?-1:v.id.localeCompare(ne.id)}),G.sort((v,ne)=>(ne.done_at??0)-(v.done_at??0));let ee=o.length>0?o:r.map(v=>({root_dir:v&&v.root_dir,name:v&&v.name,auto_advance:v&&v.auto_advance,auto_merge:v&&v.auto_merge,slots:v&&v.slots,revision:v&&v.revision,runner_catalog:v&&v.runner_catalog})),Ee=new Set(_.map(v=>v.root_dir)),ge=new Map;for(let v of A)v.kind==="session"||v.run_state!=="running"||ge.set(v.root_dir,(ge.get(v.root_dir)||0)+1);let xe=new Map;for(let v of G){let ne=xe.get(v.root_dir);ne?ne.push(v):xe.set(v.root_dir,[v])}let ye={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},Ne=[];for(let v of ee){if(!v||typeof v.root_dir!="string")continue;let ne=X.get(v.root_dir)||[],Te=F.get(v.root_dir)||[],he=ne.length>0||Te.some(ze=>ze.items.length>0||ze.occupied_by.length>0);if(c!=="all"&&!he&&!Ee.has(v.root_dir))continue;let Re=typeof v.slots=="number"&&v.slots>=zs?v.slots:zs,Be=ge.get(v.root_dir)||0;Ne.push({live_count:Be,over_cap:Be>Re,merge:U.get(v.root_dir)||ye,token_total:hm(xe.get(v.root_dir)||[]),cleanup_failures:H.get(v.root_dir)||[],declared_base:te.get(v.root_dir)??null,repo_operations:D.get(v.root_dir)||[],root_dir:v.root_dir,name:v.name||v.root_dir,auto_advance:v.auto_advance===!0,auto_merge:v.auto_merge===!0,slots:Re,revision:typeof v.revision=="number"?v.revision:0,runner_catalog:ft(v.runner_catalog),items:ne,sublanes:{parallel:ne,serial:Te},serial_lane_count:I.get(v.root_dir)||0,raw_queue_length:L.get(v.root_dir)||0})}let De={runnable:_,runnable_all:_,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:N,queue_groups:Ne,running:A,pr_wait:T,done:G,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(L),owner_of:{}},B=Uc(De);for(let v of le)B.has(v.id)||B.set(v.id,{root_dir:v.root_dir,workspace_name:v.workspace_name,lane:"done",state:"done"});for(let v of[...De.queue,...De.runnable,...De.running,...De.pr_wait]){if(!Object.hasOwn(v,"blocked_by"))continue;let ne=B.get(v.id);v.blockers=(v.blocked_by||[]).map(Te=>Wc(Te,ne,B,o))}for(let v of[...De.queue,...De.runnable,...De.running,...De.pr_wait]){let ne=(v.blockers||[]).map(he=>{let Re=B.get(he.id)?.root_dir;return{...la(v.id,he),openable:!0,...typeof Re=="string"&&Re.length>0?{root_dir:Re}:{}}});if(ne.length===0)continue;let Te={...v.dependency_chips||{},predecessors:ne};v.dependency_chips=Te}xm(De,ie,q,B,o);let de=zc(De.queue_groups);for(let v of De.queue_groups)for(let ne of v.sublanes.serial){let Te=de.get(Hc(v.root_dir,ne.id));Te&&(ne.cross_wait_peers=Te)}De.chain_lanes=km(l&&Array.isArray(l.lanes)?l.lanes:[],W,B,o,$e,g,{armed_by_bead:J,failed_by_bead:Ce,disarmed_lanes:ke});let re=new Map;for(let v of[...De.queue,...De.runnable])re.has(v.id)||re.set(v.id,v);let _e=new Set;for(let v of De.chain_lanes)for(let ne of v.rows){if(v.status==="confirmed"&&!ne.unplaced&&!ne.fixed&&_e.add(ne.id),!v.draft&&!ne.unplaced)continue;let Te=re.get(ne.id);Te&&(Te.cross_lane_chip={lane_id:v.lane_id,number:v.number,status:v.status,label:v.draft?`\uC5F0\uACB0 ${v.number} (draft)`:`\uC5F0\uACB0 ${v.number}`})}let ve=new Map(De.chain_lanes.map(v=>[v.lane_id,v.number]));for(let v of[...De.queue,...De.running]){let ne=J.get(v.id);if(typeof ne!="string"||ne.length===0)continue;let Te=ve.get(ne);v.armed_lane_chip=Te===void 0?{lane_id:ne,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:ne,label:`\u25B6 \uC5F0\uACB0 ${Te}`,orphan:!1}}let pe=[];for(let v of X.values())for(let ne of v)_e.has(ne.id)||pe.push(ne);pe.sort((v,ne)=>{let Te=v.workspace_name.localeCompare(ne.workspace_name);return Te!==0?Te:(v.queue_index??0)-(ne.queue_index??0)}),De.parallel_rows=pe;let qe={};for(let[v,ne]of B)typeof ne.root_dir=="string"&&ne.root_dir.length>0&&(qe[v]=ne.root_dir);for(let v of De.chain_lanes)for(let ne of v.rows)!Object.hasOwn(qe,ne.id)&&ne.root_dir.length>0&&g.has(ne.root_dir)&&(qe[ne.id]=ne.root_dir);De.owner_of=qe;let Me=De.runnable.length;De.runnable_all=De.runnable.slice();let je=De.runnable;i.show_blocked||(je=je.filter(v=>v.blocked!==!0));let He=je.length;i.spec==="with"?je=je.filter(v=>v.published===!0):i.spec==="without"&&(je=je.filter(v=>v.published!==!0)),De.runnable_hidden={blocked:Me-He,spec:He-je.length};let pt=(v,ne)=>{let Te=Ws(ne.updated_at)-Ws(v.updated_at);return Te!==0?Te:v.id.localeCompare(ne.id)},Q=a==="repo_spec"?(v,ne)=>{let Te=v.published===!0?0:1,he=ne.published===!0?0:1;return Te!==he?Te-he:pt(v,ne)}:pt;if(a==="as_given")De.runnable=je,De.runnable_sections=[];else if(a==="updated_flat")De.runnable=je.slice().sort(pt),De.runnable_sections=[];else{let v=new Map;for(let he of je){let Re=v.get(he.root_dir);Re?Re.push(he):v.set(he.root_dir,[he])}let ne=[],Te=[];for(let he of ee){if(!he||typeof he.root_dir!="string")continue;let Re=(v.get(he.root_dir)||[]).slice().sort(Q);v.delete(he.root_dir),Re.length!==0&&(ne.push({root_dir:he.root_dir,name:he.name||he.root_dir,items:Re.map(Be=>({...Be,workspace_name:""}))}),Te.push(...Re))}for(let[he,Re]of v){let Be=Re.slice().sort(Q);ne.push({root_dir:he,name:Be[0]?.workspace_name||he,items:Be.map(ze=>({...ze,workspace_name:""}))}),Te.push(...Be)}De.runnable=Te,De.runnable_sections=ne}return De}function fu(e,t){let n=new Map(e.map((a,c)=>[a,c])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(c=>{if(o.has(c))return!1;for(let d of r.get(c))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,c)=>[a,c]));for(let a of s){let c=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),g=Number(l.get(a))>Number(l.get(d));p&&g&&(c===null||Number(l.get(d))>Number(l.get(c)))&&(c=d)}c!==null&&i.push({bead_id:a,after:c})}return{order:s,corrections:i,cycle:!1}}var Am="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Gs="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Sm="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Em="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Kr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Ao(e,t){return`${e}\0${t}`}function Tm(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function Cm(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function To(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=Tm(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[p,g]of o)for(let _ of g)s.push({blocker:_,blockee:p});let i=Cm(e,t),l=new Map(r.map((p,g)=>[p,g])),a=r.slice(0,i).filter(p=>o.get(p).some(g=>Number(l.get(g))>Number(l.get(p)))),c=fu(r.slice(i),s);if(c.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,i),...c.order.map(p=>d.get(p))],corrections:c.corrections,cycle:!1,held:!1,mismatched:a}}function _u(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:To(n,t)}function Rm(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Om(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Lm(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function fa(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function Im(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Ao(i,a));let r=new Map,o=new Map;for(let i of e){let l=Ao(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Ao(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function Dm(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Mm(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Hs(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function _a(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Co(e){let t=Lm(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=c=>{let d=e.owner_of.get(c);return typeof d!="string"||d.length===0?(o.refusal=Om(c),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(c,d,p)=>{if(o.refusal!==null||c===d)return;let g=t.get(c)||[];if(g.includes(d))return;let _=s(c);if(_!==null){if(fa(t,d,c)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${c}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(c,[...g,d]),p!==void 0&&r.add(Ao(c,d)),n.push({type:"dep-add",a:c,b:d,root_dir:_,...p===void 0?{}:{lane_id:p}})}},removeDep:(c,d)=>{if(o.refusal!==null||c===d)return;let p=t.get(c)||[];if(!p.includes(d))return;let g=s(c);g!==null&&(t.set(c,p.filter(_=>_!==d)),n.push({type:"dep-remove",a:c,b:d,root_dir:g}))},laneCreated:(c,d)=>r.has(Ao(c,d))}}function Ro(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Im(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],c=o.lane_id===void 0||o.correction===void 0?void 0:Rm(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...c===void 0?{}:{correction:c}}}function mu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function So(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function gu(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function hu(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(Hs(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Eo(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ks(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ys(e,t,n){let r=Co(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),c=e.kind==="chain"?e.lane_id??a:void 0,d=c===void 0?void 0:n.cross_lanes.get(c);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Am};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Sm};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${_a(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Kr}}if(e.kind==="chain"&&d===void 0)return{refused:Kr};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let A=d.entries.findIndex(X=>X.bead_id===e.bead_id);if(A<0)return;let T=A>0?d.entries[A-1]:null,N=A+1<d.entries.length?d.entries[A+1]:null,G=So(d,A),le=N!==null&&So(d,A+1);G&&T!==null&&r.removeDep(e.bead_id,T.bead_id),le&&N!==null&&r.removeDep(N.bead_id,e.bead_id),(G||le)&&T!==null&&N!==null&&r.addDep(N.bead_id,T.bead_id,c)},g=(A,T)=>{let N=n.cross_lanes.get(A),G=N.entries.findIndex(D=>D.bead_id===e.bead_id),le=N.entries.filter(D=>D.bead_id!==e.bead_id),X=Math.max(0,Math.min(le.length,G>=0&&T>G?T-1:T)),F=-1;if(le.forEach((D,K)=>{n.fixed_members.has(D.bead_id)&&(F=K)}),X<=F){r.state.refusal=Em;return}let I=G>=0?N.entries[G]:d?.entries.find(D=>D.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=To({status:N.status,entries:[...le.slice(0,X),I,...le.slice(X)]},n);let L=l.entries;if(Ks(L,N.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:A,entries:Eo(L)}}),N.status!=="confirmed")return;let U=L.findIndex(D=>D.bead_id===e.bead_id),H=U>0?L[U-1].bead_id:null,te=U+1<L.length?L[U+1].bead_id:null;if(H===null){te!==null&&r.addDep(te,e.bead_id,A);return}if(r.addDep(e.bead_id,H,A),te!==null&&(r.graph.get(te)||[]).includes(H)){let D=N.entries.findIndex(K=>K.bead_id===te);(r.laneCreated(te,H)||D>0&&N.entries[D-1].bead_id===H&&So(N,D))&&r.removeDep(te,H),r.addDep(te,e.bead_id,A)}},_=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==c)&&(i.push(...gu(n,d,c,d.entries.filter(A=>A.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:c,entries:Eo(d.entries.filter(A=>A.bead_id!==e.bead_id))}}))),t.kind==="chain"&&g(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let A=Dm(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(Hs(e.bead_id,e.root_dir,A));else if(e.kind==="parallel"){let T=n.parallel_rows,N=T[Math.max(0,Math.min(T.length,t.marker_index))];if(!(!!N&&N.bead_id===e.bead_id)&&Mm(n,e.root_dir)&&_!==void 0){let le=_>A?A:A-1;le>=0&&le!==_&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:le},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let A=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&A.status==="confirmed"&&s.push(Hs(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(_!==void 0&&t.index!==_){let A=_>t.index?t.index:t.index-1;A>=0&&A!==_&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:A},root_dir:e.root_dir})}}else s.push(Hs(e.bead_id,e.root_dir,t.index,t.lane_id));return Ro(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function bu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Kr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=To(n,t);if(r.held)return{refused:Gs};let o=r.entries,s=Co(t),i=[];mu(s,o,e),s.state.refusal===null&&hu(s,t,o,i);let l=Ks(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Eo(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Ro(s,t,l,i,{lane_id:e,correction:r})}function yu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Kr};let r=To(n,t),o=r.entries,s=Co(t),i=[];mu(s,o,e),s.state.refusal===null&&hu(s,t,o,i);let l=Ks(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Eo(o)}}];return Ro(s,t,l,i,{lane_id:e,correction:r})}function vu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Kr};let r=To(n,t),o=r.entries;return Ro(Co(t),t,Ks(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Eo(o)}}],[],{lane_id:e,correction:r})}function wu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Kr};let r=Co(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)So(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Ro(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:gu(t,n,e,n.entries)})}function ku(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;So(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${_a(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function $u(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function xu(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function ma(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${_a(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Pm="\uC0AC\uC774\uD074";function Nm(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function ga(e,t,n){let r=tr(e,t),o=[],s=new Set,i=(a,c)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:c}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Nm(e)}}function Au(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=fa(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:Pm}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,c=r!==void 0&&l.root_dir===r;return a!==c?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function Su(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Mu,setPrototypeOf:Eu,isFrozen:qm,getPrototypeOf:Fm,getOwnPropertyDescriptor:jm}=Object,{freeze:on,seal:yn,create:$a}=Object,{apply:xa,construct:Aa}=typeof Reflect<"u"&&Reflect;on||(on=function(t){return t});yn||(yn=function(t){return t});xa||(xa=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Aa||(Aa=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Vs=sn(Array.prototype.forEach),Bm=sn(Array.prototype.lastIndexOf),Tu=sn(Array.prototype.pop),Oo=sn(Array.prototype.push),Um=sn(Array.prototype.splice),Xs=sn(String.prototype.toLowerCase),ha=sn(String.prototype.toString),ba=sn(String.prototype.match),Lo=sn(String.prototype.replace),Wm=sn(String.prototype.indexOf),zm=sn(String.prototype.trim),$n=sn(Object.prototype.hasOwnProperty),rn=sn(RegExp.prototype.test),Io=Hm(TypeError);function sn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return xa(e,t,r)}}function Hm(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Aa(e,n)}}function mt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xs;Eu&&Eu(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(qm(t)||(t[r]=s),o=s)}e[o]=!0}return e}function Gm(e){for(let t=0;t<e.length;t++)$n(e,t)||(e[t]=null);return e}function Un(e){let t=$a(null);for(let[n,r]of Mu(e))$n(e,n)&&(Array.isArray(r)?t[n]=Gm(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Un(r):t[n]=r);return t}function Do(e,t){for(;e!==null;){let r=jm(e,t);if(r){if(r.get)return sn(r.get);if(typeof r.value=="function")return sn(r.value)}e=Fm(e)}function n(){return null}return n}var Cu=on(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ya=on(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),va=on(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Km=on(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),wa=on(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ym=on(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ru=on(["#text"]),Ou=on(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ka=on(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Lu=on(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Qs=on(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Vm=yn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Qm=yn(/<%[\w\W]*|[\w\W]*%>/gm),Xm=yn(/\$\{[\w\W]*/gm),Zm=yn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Jm=yn(/^aria-[\-\w]+$/),Pu=yn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),eg=yn(/^(?:\w+script|data):/i),tg=yn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Nu=yn(/^html$/i),ng=yn(/^[a-z][.\w]*(-[.\w]+)+$/i),Iu=Object.freeze({__proto__:null,ARIA_ATTR:Jm,ATTR_WHITESPACE:tg,CUSTOM_ELEMENT:ng,DATA_ATTR:Zm,DOCTYPE_NAME:Nu,ERB_EXPR:Qm,IS_ALLOWED_URI:Pu,IS_SCRIPT_OR_DATA:eg,MUSTACHE_EXPR:Vm,TMPLIT_EXPR:Xm}),Mo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},rg=function(){return typeof window>"u"?null:window},og=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Du=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:rg(),t=y=>qu(y);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Mo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:g,trustedTypes:_}=e,A=a.prototype,T=Do(A,"cloneNode"),N=Do(A,"remove"),G=Do(A,"nextSibling"),le=Do(A,"childNodes"),X=Do(A,"parentNode");if(typeof i=="function"){let y=n.createElement("template");y.content&&y.content.ownerDocument&&(n=y.content.ownerDocument)}let F,I="",{implementation:L,createNodeIterator:U,createDocumentFragment:H,getElementsByTagName:te}=n,{importNode:D}=r,K=Du();t.isSupported=typeof Mu=="function"&&typeof X=="function"&&L&&L.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:W,ERB_EXPR:J,TMPLIT_EXPR:Ce,DATA_ATTR:ke,ARIA_ATTR:ie,IS_SCRIPT_OR_DATA:q,ATTR_WHITESPACE:$e,CUSTOM_ELEMENT:Se}=Iu,{IS_ALLOWED_URI:S}=Iu,ee=null,Ee=mt({},[...Cu,...ya,...va,...wa,...Ru]),ge=null,xe=mt({},[...Ou,...ka,...Lu,...Qs]),ye=Object.seal($a(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ne=null,De=null,B=Object.seal($a(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),de=!0,re=!0,_e=!1,ve=!0,pe=!1,qe=!0,Me=!1,je=!1,He=!1,pt=!1,Y=!1,Q=!1,v=!0,ne=!1,Te="user-content-",he=!0,Re=!1,Be={},ze=null,it=mt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),vt=null,Nt=mt({},["audio","video","img","source","image","track"]),Ft=null,xt=mt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Rt="http://www.w3.org/1998/Math/MathML",bt="http://www.w3.org/2000/svg",Ge="http://www.w3.org/1999/xhtml",O=Ge,oe=!1,we=null,E=mt({},[Rt,bt,Ge],ha),V=mt({},["mi","mo","mn","ms","mtext"]),Le=mt({},["annotation-xml"]),Ve=mt({},["title","style","font","a","script"]),Pe=null,Xe=["application/xhtml+xml","text/html"],ot="text/html",Ue=null,tt=null,wt=n.createElement("form"),Ke=function(f){return f instanceof RegExp||f instanceof Function},kt=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(tt&&tt===f)){if((!f||typeof f!="object")&&(f={}),f=Un(f),Pe=Xe.indexOf(f.PARSER_MEDIA_TYPE)===-1?ot:f.PARSER_MEDIA_TYPE,Ue=Pe==="application/xhtml+xml"?ha:Xs,ee=$n(f,"ALLOWED_TAGS")?mt({},f.ALLOWED_TAGS,Ue):Ee,ge=$n(f,"ALLOWED_ATTR")?mt({},f.ALLOWED_ATTR,Ue):xe,we=$n(f,"ALLOWED_NAMESPACES")?mt({},f.ALLOWED_NAMESPACES,ha):E,Ft=$n(f,"ADD_URI_SAFE_ATTR")?mt(Un(xt),f.ADD_URI_SAFE_ATTR,Ue):xt,vt=$n(f,"ADD_DATA_URI_TAGS")?mt(Un(Nt),f.ADD_DATA_URI_TAGS,Ue):Nt,ze=$n(f,"FORBID_CONTENTS")?mt({},f.FORBID_CONTENTS,Ue):it,Ne=$n(f,"FORBID_TAGS")?mt({},f.FORBID_TAGS,Ue):Un({}),De=$n(f,"FORBID_ATTR")?mt({},f.FORBID_ATTR,Ue):Un({}),Be=$n(f,"USE_PROFILES")?f.USE_PROFILES:!1,de=f.ALLOW_ARIA_ATTR!==!1,re=f.ALLOW_DATA_ATTR!==!1,_e=f.ALLOW_UNKNOWN_PROTOCOLS||!1,ve=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,pe=f.SAFE_FOR_TEMPLATES||!1,qe=f.SAFE_FOR_XML!==!1,Me=f.WHOLE_DOCUMENT||!1,pt=f.RETURN_DOM||!1,Y=f.RETURN_DOM_FRAGMENT||!1,Q=f.RETURN_TRUSTED_TYPE||!1,He=f.FORCE_BODY||!1,v=f.SANITIZE_DOM!==!1,ne=f.SANITIZE_NAMED_PROPS||!1,he=f.KEEP_CONTENT!==!1,Re=f.IN_PLACE||!1,S=f.ALLOWED_URI_REGEXP||Pu,O=f.NAMESPACE||Ge,V=f.MATHML_TEXT_INTEGRATION_POINTS||V,Le=f.HTML_INTEGRATION_POINTS||Le,ye=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&Ke(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ye.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&Ke(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ye.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ye.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),pe&&(re=!1),Y&&(pt=!0),Be&&(ee=mt({},Ru),ge=[],Be.html===!0&&(mt(ee,Cu),mt(ge,Ou)),Be.svg===!0&&(mt(ee,ya),mt(ge,ka),mt(ge,Qs)),Be.svgFilters===!0&&(mt(ee,va),mt(ge,ka),mt(ge,Qs)),Be.mathMl===!0&&(mt(ee,wa),mt(ge,Lu),mt(ge,Qs))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?B.tagCheck=f.ADD_TAGS:(ee===Ee&&(ee=Un(ee)),mt(ee,f.ADD_TAGS,Ue))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?B.attributeCheck=f.ADD_ATTR:(ge===xe&&(ge=Un(ge)),mt(ge,f.ADD_ATTR,Ue))),f.ADD_URI_SAFE_ATTR&&mt(Ft,f.ADD_URI_SAFE_ATTR,Ue),f.FORBID_CONTENTS&&(ze===it&&(ze=Un(ze)),mt(ze,f.FORBID_CONTENTS,Ue)),he&&(ee["#text"]=!0),Me&&mt(ee,["html","head","body"]),ee.table&&(mt(ee,["tbody"]),delete Ne.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw Io('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Io('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');F=f.TRUSTED_TYPES_POLICY,I=F.createHTML("")}else F===void 0&&(F=og(_,o)),F!==null&&typeof I=="string"&&(I=F.createHTML(""));on&&on(f),tt=f}},Ye=mt({},[...ya,...va,...Km]),ct=mt({},[...wa,...Ym]),Ot=function(f){let j=X(f);(!j||!j.tagName)&&(j={namespaceURI:O,tagName:"template"});let ue=Xs(f.tagName),ae=Xs(j.tagName);return we[f.namespaceURI]?f.namespaceURI===bt?j.namespaceURI===Ge?ue==="svg":j.namespaceURI===Rt?ue==="svg"&&(ae==="annotation-xml"||V[ae]):!!Ye[ue]:f.namespaceURI===Rt?j.namespaceURI===Ge?ue==="math":j.namespaceURI===bt?ue==="math"&&Le[ae]:!!ct[ue]:f.namespaceURI===Ge?j.namespaceURI===bt&&!Le[ae]||j.namespaceURI===Rt&&!V[ae]?!1:!ct[ue]&&(Ve[ue]||!Ye[ue]):!!(Pe==="application/xhtml+xml"&&we[f.namespaceURI]):!1},At=function(f){Oo(t.removed,{element:f});try{X(f).removeChild(f)}catch{N(f)}},Tt=function(f,j){try{Oo(t.removed,{attribute:j.getAttributeNode(f),from:j})}catch{Oo(t.removed,{attribute:null,from:j})}if(j.removeAttribute(f),f==="is")if(pt||Y)try{At(j)}catch{}else try{j.setAttribute(f,"")}catch{}},Gt=function(f){let j=null,ue=null;if(He)f="<remove></remove>"+f;else{let at=ba(f,/^[\r\n\t ]+/);ue=at&&at[0]}Pe==="application/xhtml+xml"&&O===Ge&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");let ae=F?F.createHTML(f):f;if(O===Ge)try{j=new g().parseFromString(ae,Pe)}catch{}if(!j||!j.documentElement){j=L.createDocument(O,"template",null);try{j.documentElement.innerHTML=oe?I:ae}catch{}}let We=j.body||j.documentElement;return f&&ue&&We.insertBefore(n.createTextNode(ue),We.childNodes[0]||null),O===Ge?te.call(j,Me?"html":"body")[0]:Me?j.documentElement:We},cn=function(f){return U.call(f.ownerDocument||f,f,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Lt=function(f){return f instanceof p&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof d)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},Kt=function(f){return typeof l=="function"&&f instanceof l};function jt(y,f,j){Vs(y,ue=>{ue.call(t,f,j,tt)})}let It=function(f){let j=null;if(jt(K.beforeSanitizeElements,f,null),Lt(f))return At(f),!0;let ue=Ue(f.nodeName);if(jt(K.uponSanitizeElement,f,{tagName:ue,allowedTags:ee}),qe&&f.hasChildNodes()&&!Kt(f.firstElementChild)&&rn(/<[/\w!]/g,f.innerHTML)&&rn(/<[/\w!]/g,f.textContent)||f.nodeType===Mo.progressingInstruction||qe&&f.nodeType===Mo.comment&&rn(/<[/\w]/g,f.data))return At(f),!0;if(!(B.tagCheck instanceof Function&&B.tagCheck(ue))&&(!ee[ue]||Ne[ue])){if(!Ne[ue]&&Yt(ue)&&(ye.tagNameCheck instanceof RegExp&&rn(ye.tagNameCheck,ue)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(ue)))return!1;if(he&&!ze[ue]){let ae=X(f)||f.parentNode,We=le(f)||f.childNodes;if(We&&ae){let at=We.length;for(let ut=at-1;ut>=0;--ut){let st=T(We[ut],!0);st.__removalCount=(f.__removalCount||0)+1,ae.insertBefore(st,G(f))}}}return At(f),!0}return f instanceof a&&!Ot(f)||(ue==="noscript"||ue==="noembed"||ue==="noframes")&&rn(/<\/no(script|embed|frames)/i,f.innerHTML)?(At(f),!0):(pe&&f.nodeType===Mo.text&&(j=f.textContent,Vs([W,J,Ce],ae=>{j=Lo(j,ae," ")}),f.textContent!==j&&(Oo(t.removed,{element:f.cloneNode()}),f.textContent=j)),jt(K.afterSanitizeElements,f,null),!1)},Zt=function(f,j,ue){if(v&&(j==="id"||j==="name")&&(ue in n||ue in wt))return!1;if(!(re&&!De[j]&&rn(ke,j))){if(!(de&&rn(ie,j))){if(!(B.attributeCheck instanceof Function&&B.attributeCheck(j,f))){if(!ge[j]||De[j]){if(!(Yt(f)&&(ye.tagNameCheck instanceof RegExp&&rn(ye.tagNameCheck,f)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(f))&&(ye.attributeNameCheck instanceof RegExp&&rn(ye.attributeNameCheck,j)||ye.attributeNameCheck instanceof Function&&ye.attributeNameCheck(j,f))||j==="is"&&ye.allowCustomizedBuiltInElements&&(ye.tagNameCheck instanceof RegExp&&rn(ye.tagNameCheck,ue)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(ue))))return!1}else if(!Ft[j]){if(!rn(S,Lo(ue,$e,""))){if(!((j==="src"||j==="xlink:href"||j==="href")&&f!=="script"&&Wm(ue,"data:")===0&&vt[f])){if(!(_e&&!rn(q,Lo(ue,$e,"")))){if(ue)return!1}}}}}}}return!0},Yt=function(f){return f!=="annotation-xml"&&ba(f,Se)},zt=function(f){jt(K.beforeSanitizeAttributes,f,null);let{attributes:j}=f;if(!j||Lt(f))return;let ue={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ge,forceKeepAttr:void 0},ae=j.length;for(;ae--;){let We=j[ae],{name:at,namespaceURI:ut,value:st}=We,_t=Ue(at),gt=st,ht=at==="value"?gt:zm(gt);if(ue.attrName=_t,ue.attrValue=ht,ue.keepAttr=!0,ue.forceKeepAttr=void 0,jt(K.uponSanitizeAttribute,f,ue),ht=ue.attrValue,ne&&(_t==="id"||_t==="name")&&(Tt(at,f),ht=Te+ht),qe&&rn(/((--!?|])>)|<\/(style|title|textarea)/i,ht)){Tt(at,f);continue}if(_t==="attributename"&&ba(ht,"href")){Tt(at,f);continue}if(ue.forceKeepAttr)continue;if(!ue.keepAttr){Tt(at,f);continue}if(!ve&&rn(/\/>/i,ht)){Tt(at,f);continue}pe&&Vs([W,J,Ce],b=>{ht=Lo(ht,b," ")});let h=Ue(f.nodeName);if(!Zt(h,_t,ht)){Tt(at,f);continue}if(F&&typeof _=="object"&&typeof _.getAttributeType=="function"&&!ut)switch(_.getAttributeType(h,_t)){case"TrustedHTML":{ht=F.createHTML(ht);break}case"TrustedScriptURL":{ht=F.createScriptURL(ht);break}}if(ht!==gt)try{ut?f.setAttributeNS(ut,at,ht):f.setAttribute(at,ht),Lt(f)?At(f):Tu(t.removed)}catch{Tt(at,f)}}jt(K.afterSanitizeAttributes,f,null)},un=function y(f){let j=null,ue=cn(f);for(jt(K.beforeSanitizeShadowDOM,f,null);j=ue.nextNode();)jt(K.uponSanitizeShadowNode,j,null),It(j),zt(j),j.content instanceof s&&y(j.content);jt(K.afterSanitizeShadowDOM,f,null)};return t.sanitize=function(y){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},j=null,ue=null,ae=null,We=null;if(oe=!y,oe&&(y="<!-->"),typeof y!="string"&&!Kt(y))if(typeof y.toString=="function"){if(y=y.toString(),typeof y!="string")throw Io("dirty is not a string, aborting")}else throw Io("toString is not a function");if(!t.isSupported)return y;if(je||kt(f),t.removed=[],typeof y=="string"&&(Re=!1),Re){if(y.nodeName){let st=Ue(y.nodeName);if(!ee[st]||Ne[st])throw Io("root node is forbidden and cannot be sanitized in-place")}}else if(y instanceof l)j=Gt("<!---->"),ue=j.ownerDocument.importNode(y,!0),ue.nodeType===Mo.element&&ue.nodeName==="BODY"||ue.nodeName==="HTML"?j=ue:j.appendChild(ue);else{if(!pt&&!pe&&!Me&&y.indexOf("<")===-1)return F&&Q?F.createHTML(y):y;if(j=Gt(y),!j)return pt?null:Q?I:""}j&&He&&At(j.firstChild);let at=cn(Re?y:j);for(;ae=at.nextNode();)It(ae),zt(ae),ae.content instanceof s&&un(ae.content);if(Re)return y;if(pt){if(Y)for(We=H.call(j.ownerDocument);j.firstChild;)We.appendChild(j.firstChild);else We=j;return(ge.shadowroot||ge.shadowrootmode)&&(We=D.call(r,We,!0)),We}let ut=Me?j.outerHTML:j.innerHTML;return Me&&ee["!doctype"]&&j.ownerDocument&&j.ownerDocument.doctype&&j.ownerDocument.doctype.name&&rn(Nu,j.ownerDocument.doctype.name)&&(ut="<!DOCTYPE "+j.ownerDocument.doctype.name+`>
`+ut),pe&&Vs([W,J,Ce],st=>{ut=Lo(ut,st," ")}),F&&Q?F.createHTML(ut):ut},t.setConfig=function(){let y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};kt(y),je=!0},t.clearConfig=function(){tt=null,je=!1},t.isValidAttribute=function(y,f,j){tt||kt({});let ue=Ue(y),ae=Ue(f);return Zt(ue,ae,j)},t.addHook=function(y,f){typeof f=="function"&&Oo(K[y],f)},t.removeHook=function(y,f){if(f!==void 0){let j=Bm(K[y],f);return j===-1?void 0:Um(K[y],j,1)[0]}return Tu(K[y])},t.removeHooks=function(y){K[y]=[]},t.removeAllHooks=function(){K=Du()},t}var Fu=qu();var Wn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Zs=e=>(...t)=>({_$litDirective$:e,values:t}),Yr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Po=class extends Yr{constructor(t){if(super(t),this.it=Mt,t.type!==Wn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Mt||t==null)return this._t=void 0,this.it=t;if(t===bn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Po.directiveName="unsafeHTML",Po.resultType=1;var ju=Zs(Po);function Ca(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var br=Ca();function Ku(e){br=e}var jo={exec:()=>null};function yt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(an.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var sg=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),an={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},ig=/^(?:[ \t]*(?:\n|$))+/,ag=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,lg=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Bo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,cg=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ra=/(?:[*+-]|\d{1,9}[.)])/,Yu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Vu=yt(Yu).replace(/bull/g,Ra).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ug=yt(Yu).replace(/bull/g,Ra).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Oa=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,dg=/^[^\n]+/,La=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,pg=yt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",La).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),fg=yt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ra).getRegex(),oi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ia=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,_g=yt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ia).replace("tag",oi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Qu=yt(Oa).replace("hr",Bo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oi).getRegex(),mg=yt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Qu).getRegex(),Da={blockquote:mg,code:ag,def:pg,fences:lg,heading:cg,hr:Bo,html:_g,lheading:Vu,list:fg,newline:ig,paragraph:Qu,table:jo,text:dg},Bu=yt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Bo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oi).getRegex(),gg={...Da,lheading:ug,table:Bu,paragraph:yt(Oa).replace("hr",Bo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Bu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oi).getRegex()},hg={...Da,html:yt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ia).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:jo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:yt(Oa).replace("hr",Bo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Vu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},bg=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,yg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Xu=/^( {2,}|\\)\n(?!\s*$)/,vg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,si=/[\p{P}\p{S}]/u,Ma=/[\s\p{P}\p{S}]/u,Zu=/[^\s\p{P}\p{S}]/u,wg=yt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ma).getRegex(),Ju=/(?!~)[\p{P}\p{S}]/u,kg=/(?!~)[\s\p{P}\p{S}]/u,$g=/(?:[^\s\p{P}\p{S}]|~)/u,xg=yt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",sg?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ed=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ag=yt(ed,"u").replace(/punct/g,si).getRegex(),Sg=yt(ed,"u").replace(/punct/g,Ju).getRegex(),td="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Eg=yt(td,"gu").replace(/notPunctSpace/g,Zu).replace(/punctSpace/g,Ma).replace(/punct/g,si).getRegex(),Tg=yt(td,"gu").replace(/notPunctSpace/g,$g).replace(/punctSpace/g,kg).replace(/punct/g,Ju).getRegex(),Cg=yt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zu).replace(/punctSpace/g,Ma).replace(/punct/g,si).getRegex(),Rg=yt(/\\(punct)/,"gu").replace(/punct/g,si).getRegex(),Og=yt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Lg=yt(Ia).replace("(?:-->|$)","-->").getRegex(),Ig=yt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Lg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ti=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Dg=yt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ti).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),nd=yt(/^!?\[(label)\]\[(ref)\]/).replace("label",ti).replace("ref",La).getRegex(),rd=yt(/^!?\[(ref)\](?:\[\])?/).replace("ref",La).getRegex(),Mg=yt("reflink|nolink(?!\\()","g").replace("reflink",nd).replace("nolink",rd).getRegex(),Uu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Pa={_backpedal:jo,anyPunctuation:Rg,autolink:Og,blockSkip:xg,br:Xu,code:yg,del:jo,emStrongLDelim:Ag,emStrongRDelimAst:Eg,emStrongRDelimUnd:Cg,escape:bg,link:Dg,nolink:rd,punctuation:wg,reflink:nd,reflinkSearch:Mg,tag:Ig,text:vg,url:jo},Pg={...Pa,link:yt(/^!?\[(label)\]\((.*?)\)/).replace("label",ti).getRegex(),reflink:yt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ti).getRegex()},Sa={...Pa,emStrongRDelimAst:Tg,emStrongLDelim:Sg,url:yt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Uu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:yt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Uu).getRegex()},Ng={...Sa,br:yt(Xu).replace("{2,}","*").getRegex(),text:yt(Sa.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Js={normal:Da,gfm:gg,pedantic:hg},No={normal:Pa,gfm:Sa,breaks:Ng,pedantic:Pg},qg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Wu=e=>qg[e];function zn(e,t){if(t){if(an.escapeTest.test(e))return e.replace(an.escapeReplace,Wu)}else if(an.escapeTestNoEncode.test(e))return e.replace(an.escapeReplaceNoEncode,Wu);return e}function zu(e){try{e=encodeURI(e).replace(an.percentDecode,"%")}catch{return null}return e}function Hu(e,t){let n=e.replace(an.findPipe,(s,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),r=n.split(an.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(an.slashPipe,"|");return r}function qo(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function Fg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Gu(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function jg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var ni=class{constructor(e){St(this,"options");St(this,"rules");St(this,"lexer");this.options=e||br}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:qo(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=jg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=qo(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:qo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=qo(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let c=l.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${c}`:c,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=p,n.length===0)break;let g=s.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let _=g,A=_.raw+`
`+n.join(`
`),T=this.blockquote(A);s[s.length-1]=T,r=r.substring(0,r.length-_.raw.length)+T.raw,o=o.substring(0,o.length-_.text.length)+T.text;break}else if(g?.type==="list"){let _=g,A=_.raw+`
`+n.join(`
`),T=this.list(A);s[s.length-1]=T,r=r.substring(0,r.length-g.raw.length)+T.raw,o=o.substring(0,o.length-_.raw.length)+T.raw,n=A.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,c="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),g=e.split(`
`,1)[0],_=!p.trim(),A=0;if(this.options.pedantic?(A=2,d=p.trimStart()):_?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,d=p.slice(A),A+=t[1].length),_&&this.rules.other.blankLine.test(g)&&(c+=g+`
`,e=e.substring(g.length+1),a=!0),!a){let T=this.rules.other.nextBulletRegex(A),N=this.rules.other.hrRegex(A),G=this.rules.other.fencesBeginRegex(A),le=this.rules.other.headingBeginRegex(A),X=this.rules.other.htmlBeginRegex(A);for(;e;){let F=e.split(`
`,1)[0],I;if(g=F,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),I=g):I=g.replace(this.rules.other.tabCharGlobal,"    "),G.test(g)||le.test(g)||X.test(g)||T.test(g)||N.test(g))break;if(I.search(this.rules.other.nonSpaceChar)>=A||!g.trim())d+=`
`+I.slice(A);else{if(_||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||G.test(p)||le.test(p)||N.test(p))break;d+=`
`+g}!_&&!g.trim()&&(_=!0),c+=F+`
`,e=e.substring(F.length+1),p=I.slice(A)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),o.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=c}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let d={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let c=a.tokens.filter(p=>p.type==="space"),d=c.length>0&&c.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Hu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(Hu(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=qo(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=Fg(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Gu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Gu(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,c=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+o);(r=c.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let _=p.slice(1,-1);return{type:"em",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}let g=p.slice(2,-2);return{type:"strong",raw:p,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},xn=class Ea{constructor(t){St(this,"tokens");St(this,"options");St(this,"state");St(this,"inlineQueue");St(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||br,this.options.tokenizer=this.options.tokenizer||new ni,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:an,block:Js.normal,inline:No.normal};this.options.pedantic?(n.block=Js.pedantic,n.inline=No.pedantic):this.options.gfm&&(n.block=Js.gfm,this.options.breaks?n.inline=No.breaks:n.inline=No.gfm),this.tokenizer.rules=n}static get rules(){return{block:Js,inline:No}}static lex(t,n){return new Ea(n).lex(t)}static lexInline(t,n){return new Ea(n).inlineTokens(t)}lex(t){t=t.replace(an.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(an.tabCharGlobal,"    ").replace(an.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let c=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),g;this.options.extensions.startInline.forEach(_=>{g=_.call({lexer:this},p),typeof g=="number"&&g>=0&&(d=Math.min(d,g))}),d<1/0&&d>=0&&(c=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(c)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},ri=class{constructor(e){St(this,"options");St(this,"parser");this.options=e||br}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(an.notSpaceStart)?.[0],o=e.replace(an.endingNewline,"")+`
`;return r?'<pre><code class="language-'+zn(r)+'">'+(n?o:zn(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:zn(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${zn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=zu(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+zn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=zu(e);if(o===null)return zn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${zn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:zn(e.text)}},Na=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},An=class Ta{constructor(t){St(this,"options");St(this,"renderer");St(this,"textRenderer");this.options=t||br,this.options.renderer=this.options.renderer||new ri,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Na}static parse(t,n){return new Ta(n).parse(t)}static parseInline(t,n){return new Ta(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},ei,Fo=(ei=class{constructor(e){St(this,"options");St(this,"block");this.options=e||br}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?xn.lex:xn.lexInline}provideParser(){return this.block?An.parse:An.parseInline}},St(ei,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),St(ei,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ei),Bg=class{constructor(...e){St(this,"defaults",Ca());St(this,"options",this.setOptions);St(this,"parse",this.parseMarkdown(!0));St(this,"parseInline",this.parseMarkdown(!1));St(this,"Parser",An);St(this,"Renderer",ri);St(this,"TextRenderer",Na);St(this,"Lexer",xn);St(this,"Tokenizer",ni);St(this,"Hooks",Fo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new ri(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...c)=>{let d=l.apply(o,c);return d===!1&&(d=a.apply(o,c)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new ni(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...c)=>{let d=l.apply(o,c);return d===!1&&(d=a.apply(o,c)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Fo;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Fo.passThroughHooks.has(s)?o[i]=c=>{if(this.defaults.async&&Fo.passThroughHooksRespectAsync.has(s))return(async()=>{let p=await l.call(o,c);return a.call(o,p)})();let d=l.call(o,c);return a.call(o,d)}:o[i]=(...c)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,c);return p===!1&&(p=await a.apply(o,c)),p})();let d=l.apply(o,c);return d===!1&&(d=a.apply(o,c)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return xn.lex(e,t??this.defaults)}parser(e,t){return An.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?xn.lex:xn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let c=await(o.hooks?await o.hooks.provideParser():e?An.parse:An.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(c):c})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?xn.lex:xn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?An.parse:An.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+zn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},hr=new Bg;function $t(e,t){return hr.parse(e,t)}$t.options=$t.setOptions=function(e){return hr.setOptions(e),$t.defaults=hr.defaults,Ku($t.defaults),$t};$t.getDefaults=Ca;$t.defaults=br;$t.use=function(...e){return hr.use(...e),$t.defaults=hr.defaults,Ku($t.defaults),$t};$t.walkTokens=function(e,t){return hr.walkTokens(e,t)};$t.parseInline=hr.parseInline;$t.Parser=An;$t.parser=An.parse;$t.Renderer=ri;$t.TextRenderer=Na;$t.Lexer=xn;$t.lexer=xn.lex;$t.Tokenizer=ni;$t.Hooks=Fo;$t.parse=$t;var Bk=$t.options,Uk=$t.setOptions,Wk=$t.use,zk=$t.walkTokens,Hk=$t.parseInline;var Gk=An.parse,Kk=xn.lex;function nr(e){let t=$t.parse(e),n=Fu.sanitize(t);return ju(n)}function Hn(e,t){return u`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Vr(e){return e.loading?u`<div class="prompt-block__status">불러오는 중…</div>`:e.error?u`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ii(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var sd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ug={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Wg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,zg=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Sn(e){return!!e&&typeof e=="object"}function qa(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Fa(e,t){let n=qa(e),r=qa(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function id(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Sn(o)&&typeof o.text=="string"?o.text:"").join(""):Sn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Hg(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:sd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=qa(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=Fa(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=Fa(Sn(l)?l.old_string:"",Sn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function ja(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Gg=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function ad(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Sn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Gg,"").trim();return n.length>0?{kind:"user",text:n}:null}function Ba(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Wg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:zg.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Kg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Yg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Sn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(Ba(i.text));else if(i.type==="thinking"){let l=ja(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=Hg(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?od(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Sn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=id(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=ad(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?od([o],n):[o]}return[]}function od(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Vg(e){let t=typeof e.command=="string"?e.command:"",n=id(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:sd.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function Qg(e){if(e.type==="item.completed"&&Sn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ba(t.text)];if(t.type==="user_message"){let n=ad(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=ja(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Vg(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Xg(e){if(e.schema!=="codex-delegation-monitor-v1"||!Sn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Sn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Ba(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=ja(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Ug[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Zg(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Jg(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Sn(t)?t:null}function ld(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=Jg(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return Kg(s,r);let i=s.schema==="codex-delegation-monitor-v1"?Xg(s):Zg(s)?Qg(s):Yg(s,n);return i.length>0&&(r.progress=null),i}}}function Ua(e){let t=[],n=ld(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var eh=5,th=10,nh=/Task\s+#(\d+)/,rh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,oh=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Uo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function sh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function ih(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function ah(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=nh.exec(o.output||o.result||""),c=String(s.activeForm||s.subject||"").trim();if(!a||c.length===0)continue;t.set(a[1],{label:c,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function lh(e){if(e.tool==="Bash"){let t=e.command||"";return rh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":oh.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ch(e){let t=e.filter(o=>o.kind==="tool").slice(-th),n=new Map;t.forEach((o,s)=>{let i=lh(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function uh(e){let t=ih(e);if(t)return{text:t,guess:!1};let n=ah(e);if(n)return{text:n,guess:!1};let r=ch(e);return r?{text:r,guess:!0}:null}function dh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:tn(e,t)}function Qr(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,c=null,d=!1,p={},g=!0,_=new Set,A=new Set,T=null,N=null,G=!1,le=!1,X=!1,F=null,I=null;function L(){G=!1,le=!1,X=!1,F=null,I=null}async function U(Y){if(n){le=!0,X=!1,Ne();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Y,...c?{root_dir:c}:{}}));if(s!==Y)return;!Q||typeof Q!="object"||Array.isArray(Q)?X=!0:(F=Q,I=Y)}catch{s===Y&&(X=!0)}finally{s===Y&&(le=!1,Ne())}}}function H(){if(G=!G,G&&s&&I!==s){U(s);return}Ne()}function te(){if(!G)return"";let Y=Vr({loading:le,error:X});if(Y)return u`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Y}
      </div>`;if(!F)return"";if(F.missing)return u`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=ii(F.recorded_at);return u`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?u`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof F.task_prompt=="string"?Hn("\uACFC\uC5C5 (user)",F.task_prompt):""}
      ${typeof F.system_prompt=="string"?Hn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",F.system_prompt):""}
    </div>`}function D(){if(!a||!r)return[];let Y=r.get(a);return Ua(Y?Y.lines:[])}function K(){if(!a||!r)return null;let Y=r.get(a),Q=Y?Y.last_event_at:null;return typeof Q=="number"?Q:null}function W(){return p.status==="running"}function J(){if(W()&&s){N||(N=setInterval(()=>Ne(),1e3));return}Ce()}function Ce(){N&&(clearInterval(N),N=null)}function ke(Y){let Q=[],v=0;for(;v<Y.length;){let{idx:ne,line:Te}=Y[v];if(Te.kind==="tool"){let he=v;for(;he<Y.length&&Y[he].line.kind==="tool"&&Y[he].line.tool===Te.tool;)he+=1;if(he-v>=eh&&!A.has(ne)){Q.push({kind:"group",idx:ne,tool:Te.tool||"",lines:Y.slice(v,he)}),v=he;continue}}Q.push({kind:"line",idx:ne,line:Te}),v+=1}return Q}function ie(Y){let Q=[],v=new Map;for(let he=0;he<Y.length;he+=1){let Re=Y[he],Be=Re.parent_tool_use_id;if(typeof Be=="string"&&Be.length>0){let ze=v.get(Be);ze||(ze={kind:"subagent",idx:he,launch_id:Be,agent_type:null,header:null,lines:[]},v.set(Be,ze),Q.push(ze)),ze.lines.push({idx:he,line:Re});continue}if(Re.kind==="tool"&&Re.tool==="Agent"&&typeof Re.launch_id=="string"&&Re.launch_id.length>0){let ze=q(Re),it=v.get(Re.launch_id);if(it){it.header={idx:he,line:Re},it.agent_type=ze;continue}let vt={kind:"subagent",idx:he,launch_id:Re.launch_id,agent_type:ze,header:{idx:he,line:Re},lines:[]};v.set(Re.launch_id,vt),Q.push(vt);continue}Q.push({kind:"entry",idx:he,line:Re})}let ne=[],Te=0;for(;Te<Q.length;){if(Q[Te].kind!=="entry"){ne.push(Q[Te]),Te+=1;continue}let he=Te;for(;he<Q.length&&Q[he].kind==="entry";)he+=1;ne.push(...ke(Q.slice(Te,he))),Te=he}return ne}function q(Y){let Q=Y.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function $e(Y){for(let Q=Y.length-1;Q>=0;Q-=1){let v=Y[Q];if(v.kind==="result"||v.kind==="error")return null;if(v.kind==="tool"&&!Object.hasOwn(v,"result"))return v}return null}function Se(Y){for(let Q=Y.length-1;Q>=0;Q-=1)if(Y[Q].kind==="thinking")return Y[Q];return null}function S(Y,Q){if(Q.kind==="gate")return u`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return u`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return u`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${nr(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let v=_.has(Y);return u`<div
        class="sv__think${v?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>B(Y)}
      >
        <span class="sv__think-line">💭 ${Uo(Q.text)}</span>
        ${v?u`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="user"){let v=_.has(Y);return u`<div
        class="sv__line sv__line--user${v?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>B(Y)}
      >
        <span class="sv__user-line">▷ ${Uo(Q.text)}</span>
        ${v?u`<pre class="sv__user-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return u`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return u`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let v=_.has(Y),ne=Q.tool==="Bash"?sh(Q.command):0,Te=Q.tool==="Bash"?ne>1?Uo(Q.command):Q.command:Q.path||Q.command||"";return u`<div
        class="sv__tool${v?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>B(Y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${Te?u`<span class="sv__tool-detail">${Te}</span>`:""}
          ${ne>1?u`<span class="sv__tool-more">⋯ ${ne}줄</span>`:""}
          ${typeof Q.added=="number"?u`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?u`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?u`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${v?u`<pre class="sv__tool-expand">${ee(Q)}</pre>`:""}
      </div>`}return u`<div class="sv__as">${nr(Q.text||"")}</div>`}function ee(Y){let Q=[];if(Y.tool==="Bash"&&typeof Y.command=="string"&&Y.command.length>0)Q.push(Y.command);else if(Y.input!==void 0)try{Q.push(`input: ${JSON.stringify(Y.input,null,2)}`)}catch{}return typeof Y.output=="string"&&Y.output.length>0&&Q.push(`output:
${Y.output}`),Q.join(`

`)}function Ee(){if(!s)return u``;let Y=D(),Q=(i?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),v=p.session_id||"",ne=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${g?"ON":"OFF"}`,Te=W(),he=Te?dh(K(),Date.now()):"",Re=Te?$e(Y):null,Be=Te?Se(Y):null,ze=uh(Y);return u`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(i?p.role||"":s)}</span
        >
        ${ze?u`<span
              class="sv__stage${ze.guess?" sv__stage--guess":""}"
              title=${ze.text}
              >${ze.text}</span
            >`:""}
        ${Te?u`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${he?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${he}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${he?u`<span class="sv__live-ago">${he}</span>`:""}</span
            >`:""}
        ${v?u`<button
              type="button"
              class="sv__session"
              title=${v}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${v}`}
              @click=${()=>re(v)}
            >
              ⧉ ${v.slice(0,8)}
            </button>`:""}
        ${p.resume_command?u`<button
              type="button"
              class="sv__resume-cmd"
              title=${p.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${p.resume_command}`}
              @click=${()=>re(p.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Q?u`<span class="sv__meta">${Q}</span>`:""}
        ${p.worktree?u`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${i||d?"":u`<button
              type="button"
              class="sv__prompt-toggle${G?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${G?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${H}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${g?" sv__follow--on":""}"
          aria-pressed=${g?"true":"false"}
          aria-label=${ne}
          @click=${de}
        >
          <span class="sv__follow-full">⇣ ${ne}</span>
          <span class="sv__follow-short">⇣ ${g?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>pt()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":te()}
      <div class="sv__body">
        ${Y.length===0?u`<div class="sv__empty">세션 로그 없음</div>`:ie(Y).map(it=>it.kind==="subagent"?xe(it):it.kind==="group"?ge(it):S(it.idx,it.line))}
      </div>
      ${Re||Be?u`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Re?u`<span class="sv__now-icon">${Re.icon}</span>
                  <span class="sv__now-name">${Re.tool}</span>
                  <span class="sv__now-detail"
                    >${Re.tool==="Bash"?Uo(Re.command):Re.path||Re.command||""}</span
                  >`:""}
            ${Be?u`<span class="sv__now-think"
                  >💭 ${Uo(Be.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ge(Y){return u`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ye(Y.idx)}
    >
      <span class="sv__group-icon">${Y.lines[0].line.icon}</span>
      <span class="sv__group-name">${Y.tool}</span>
      <span class="sv__group-count">${Y.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function xe(Y){let Q=A.has(Y.idx),v=Y.header?Y.header.line:null,ne=v?v.is_error===!0?"\u2717":typeof v.result=="string"?"\u2713":"\u27F3":"",Te=v&&v.command?v.command:"";return u`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ye(Y.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Y.agent_type||"subagent"}</span>
        ${Te?u`<span class="sv__sub-detail">${Te}</span>`:""}
        <span class="sv__sub-count">${Y.lines.length}줄</span>
        ${ne?u`<span class="sv__sub-state">${ne}</span>`:""}
        ${Q?"":u`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?u`<div class="sv__sub-body">
            ${ke(Y.lines).map(he=>he.kind==="group"?ge(he):S(he.idx,he.line))}
          </div>`:""}
    </div>`}function ye(Y){A.add(Y),Ne()}function Ne(){lt(Ee(),e),J(),g&&De()}function De(){let Y=e.querySelector(".sv__body");Y&&(Y.scrollTop=Y.scrollHeight)}function B(Y){_.has(Y)?_.delete(Y):_.add(Y),Ne()}function de(){g=!g,Ne()}function re(Y){nn(Y).then(Q=>{Q?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function _e(Y){!s||!Y||(p={...p,...Y},Ne())}function ve(Y){let Q=Y.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&g&&(g=!1,Ne())}e.addEventListener("scroll",ve,!0);function pe(Y){let Q=Y.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||pt()}let qe=!1;function Me(){qe||(document.addEventListener("mousedown",pe),qe=!0)}function je(){qe&&(document.removeEventListener("mousedown",pe),qe=!1)}function He(Y){let Q=Y&&Y.attempt_id;if(!Q)return;let v=typeof Y.launch_id=="string"&&Y.launch_id.length>0?Y.launch_id:null,ne=Y.session_ref&&typeof Y.session_ref=="object"?Y.session_ref:null;if(v&&ne)return;let Te=a;s=Q,i=v,l=ne,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&Te&&Te!==a&&Promise.resolve(n("unsubscribe-session-log",{id:Te})).catch(()=>{}),c=typeof Y.root_dir=="string"&&Y.root_dir.length>0?Y.root_dir:null,p=Y.meta||{},d=Y.hide_prompt===!0,g=!0,_.clear(),A.clear(),L(),!T&&r&&(T=r.subscribe(Ne)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...c?{root_dir:c}:{}})).catch(()=>{}),Me(),Ne()}function pt(){let Y=a;je(),s=null,i=null,l=null,a=null,c=null,d=!1,_.clear(),A.clear(),L(),Ce(),n&&Y&&Promise.resolve(n("unsubscribe-session-log",{id:Y})).catch(()=>{}),lt(u``,e),o&&o()}return{open:He,updateMeta:_e,close:pt,isOpen(){return s!==null},destroy(){Ce(),je(),T&&(T(),T=null),e.removeEventListener("scroll",ve,!0),s=null,i=null,l=null,a=null,c=null,d=!1,lt(u``,e)}}}function ph(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function fh(e){let t=e&&e.metadata||{},n=Rr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:ph(t)?null:"plan_pending"}),r}function cd(e,t){let n=fh(e);return u`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?u`<div class="detail-empty">산출물 없음</div>`:u`
          ${n.map(r=>u`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${o=>t.onCopyPath(o,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?u`<span class="detail-art__badge">draft</span>`:null}
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
  `}var _h="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",mh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,gh=/^\*\*결론\*\* — (.+)$/;function ai(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==_h)return null;let n=mh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?gh.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",c=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(c).join(`
`).trim()}}var ud=20;function dd(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function hh(e){return e.length>ud?`${e.slice(0,ud)}\u2026`:e}function bh(e,t,n,r){let o=`${t.lane} ${hh(t.identifier)}`;return u`<div class="detail-report">
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
        <span class="detail-report__time">${dd(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?u`<div class="detail-report__body">
          ${nr(t.body)}
        </div>`:""}
  </div>`}function yh(e){return u`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${dd(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${nr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function pd(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,c)=>String(c.created_at||"").localeCompare(String(a.created_at||"")));return u`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?u`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?u`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:u`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let c=ai(typeof a.text=="string"?a.text:"");return c?bh(a,c,t,o.has(a.id)):yh(a)})}
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
  `}var{I:E$}=gl;var fd=e=>e.strings===void 0;var vh={},_d=(e,t=vh)=>e._$AH=t;var yr=Zs(class extends Yr{constructor(e){if(super(e),e.type!==Wn.PROPERTY&&e.type!==Wn.ATTRIBUTE&&e.type!==Wn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!fd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===bn||t===Mt)return t;let n=e.element,r=e.name;if(e.type===Wn.PROPERTY){if(t===n[r])return bn}else if(e.type===Wn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return bn}else if(e.type===Wn.ATTRIBUTE&&n.getAttribute(r)===t+"")return bn;return _d(e),t}});var wh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Wa={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},md={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},kh={pin:"pin",global:"global",base:"base"};function $h(e){return u`<span
    class=${`detail-layer-rail detail-layer-rail--${kh[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function xh(e,t,n){switch(e){case"workflow_mode":return _o;case"spec_review_model":case"impl_review_model":return mo;case"plan_review_model":return vs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ws;case"impl_dispatch":return xc;case"impl_runtime":return ys;case"impl_model":return Br(n,t.impl_runtime);case"impl_effort":return Ur(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return fo;case"orchestration_model":return go(n,null);case"orchestration_effort":return Ur(n,void 0,t.orchestration_model||mn).filter(r=>r!==mn);default:return[]}}function Ah(e,t){return u`<div class="detail-effective__row" data-key=${e.key}>
    ${$h(e.source)}
    <span class="detail-effective__k"
      >${Xn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ks[e.source]}</span
    >
    ${t.expanded?u`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Xn[e.key]||e.key} \uD3B8\uC9D1`}
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
          ${t.options.map(n=>u`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function gd(e,t){let n=Xi.flatMap(a=>a.keys),r=Zi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Oc(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return u`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${a=>t.onToggle(a.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${a=>{a.preventDefault();let c=a.currentTarget.parentElement;t.onToggle(!c.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${l}
        >${Sh(s)}</span
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
    ${e.expanded?u`<div class="detail-effective__body">
          ${Xi.map(a=>u`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(c=>a.keys.includes(c.key)).map(c=>{let d=ms({key:c.key,choices:xh(c.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Ah(c,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${yr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${a=>t.onPresetSelect(String(a.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(a=>u`<option
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
            ${(e.skipped_orchestration_keys||[]).length>0?u`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function Sh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Eh(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function hd(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Eh(r.exec_receipt),c=a?Nn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=fs(r.planned_execution,r.exec_receipt),g=r.chips?.pr?.number,_=typeof g=="number"?`PR #${g}`:"PR",A=bo(n),T=t.onApplyRec;return u`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?u`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?u`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${i?u`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${i}
            target="_blank"
            rel="noreferrer"
            >${_}</a
          >`:""}
      ${p?u`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${c?u`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${c}
            >${d}${a?.effort?u`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${A?u`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec"
            data-state=${A.state}
            title=${xs(A)}
            ?disabled=${A.state==="applied"}
            @click=${()=>T?.(A.rec,A.state)}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Th(s).map(N=>Ch(N,n,o,{label:N.id==="pr"?_:N.label,href:N.id==="pr"?i:""}))}
    </div>
  </section>`}function Th(e){let n=typeof e=="string"&&Object.hasOwn(Wa,e)&&Wa[e]||Wa.spec_backed;return wh.filter(r=>n.includes(r.id))}var li={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Ch(e,t,n,r){let o=Rh(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",c=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=c?li.stale:l?li.on:a?li.current:li.none,g=Oh(e,n),_=`${r.label} \xB7 ${p}${g?` \xB7 ${g}`:""}${o?` \xB7 ${o}`:""}`,A=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${c?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,T=u`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?u`<a
      class=${A}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${_}
      >${T}</a
    >`:u`<span
    class=${A}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${_}
    >${T}</span
  >`}function Rh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Oh(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(md,n)?md[n]:""}function ci(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function bd(e){return ci(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function yd(e,t){let n=e&&e[t];if(!ci(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(bd),o=bd(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function kd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ui(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${kd(e)}${t}`}function Xr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${kd(e)}`}function Lh(e,t,n){if(n!==null){let o=e==="claude"?ui:Xr,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Xr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function vd(e,t){if(!ci(e)||e.state!=="usable"||!ci(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function wd(e){let t=e.provider_key==="claude"?ui:Xr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return u`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Lh(e.provider_key,e.provider,e.workspace_default)}
        </option>
        ${e.selected&&!n?u`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>u`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?u`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":u`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function $d({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return u`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${wd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:yd(t,"claude"),selected:o,workspace_default:vd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${wd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:yd(t,"codex"),selected:s,workspace_default:vd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Ih(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Dh(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function di(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function c(T){T.key==="Escape"&&o&&(T.preventDefault(),_())}document.addEventListener("keydown",c);function d(){return o?u`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>_()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Ih(o)}</span
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
            ${s==="loading"?u`<div class="mv__status">불러오는 중…</div>`:s==="pending"?u`<div class="mv__status">${a}</div>`:s==="error"?u`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:u`${l===null?null:u`<pre class="mv__front">
${l}</pre
                        >`}${nr(i)}`}
          </div>
        </div>
      </div>
    `:u``}function p(){lt(d(),e)}async function g(T,N={}){o=T,s="loading",i="",l=null,a="",p();let G=N.workspace||(n?n():"");if(!G){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let le="/api/doc?workspace="+encodeURIComponent(G)+"&path="+encodeURIComponent(T);try{let X=await r(le),F=await X.json().catch(()=>({}));if(!X.ok||!F||F.ok!==!0){if(F?.error==="not_found"&&N.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(F&&F.error||X.status)+")",p();return}let I=Dh(String(F.content||""));l=I.front,i=I.body,s="ready",p()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function _(){o=null,lt(u``,e)}function A(){document.removeEventListener("keydown",c),_()}return{open:g,close:_,destroy:A}}var Mh=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Sd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",pi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Ph=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function xd(e){return typeof e=="string"&&Ph.has(e)}var Nh=["running","done","failed","interrupted"],qh={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Fh(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function jh(e){let t=Qt(e);if(t.length>0)return t.map(o=>u`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Fr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return u`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?u`<span class="detail-usage-partial" title=${Sd}
          >부분 집계</span
        >`:""}`}function Ad(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ga(e){if(typeof e=="number")return Wo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Wo(t):""}function Bh(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Uh(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function za(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ha(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Wh(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!pi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?za(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||za(t.effort))||!(!("agent_type"in t)||za(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Nh.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Ha(t.started_at)||!Ha(t.last_event_at)||!Ha(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function zh(e,t,n){let o=Qt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return u`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?u`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${Ga(n.completed_at)?u`<span class="detail-session__leg-time detail-session__time"
          >${Ga(n.completed_at)}</span
        >`:""}
    ${o?u`<span class="detail-session__usage" title=${o.tooltip}
          >${o.label}</span
        >`:""}
  </div>`}function Hh(e,t,n,r){let o=e.status==="running"?null:t,i=(o?Qt({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Wo(e.last_event_at):o?Ga(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,Bh(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),c=Uh(e,o);return u`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${qh[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${a}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${c.title}
      >${c.text}</span
    >
    ${l?u`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${i?u`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function Gh(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Kh(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let p=Wh(d);!p||o.has(p.launch_id)||xd(p.agent_type)||(o.add(p.launch_id),r.push(p))}r.sort((d,p)=>(d.started_at||0)-(p.started_at||0));let i={};for(let{role:d,provider:p}of pi){let g=t?t.roles[d]?.[p]:null;i[d]=g?[...g.legs]:[]}let l=pi.flatMap(({role:d})=>i[d]),a=new Set,c=[];for(let{role:d,provider:p}of pi){for(let g of r.filter(_=>_.role===d&&_.provider===p)){let _=l.find(A=>A.receipt_id===g.launch_id)||null;_&&!Gh(g,_)||(_&&a.add(_.receipt_id),c.push(Hh(g,_,e.attempt_id,n)))}for(let g of i[d])!a.has(g.receipt_id)&&!xd(g.agent_type)&&c.push(zh(d,p,g))}return c}function Yh(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Mh,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return u`<div class="detail-session__usage-detail">
    ${r.map(o=>u`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Fh(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":u`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?u`<span class="detail-session__usage-note">${Sd}</span>`:""}
  </div>`}var Vh={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Wo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Qh(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return u`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?u`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Xh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Zh(e,t){let n=Xh[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return u`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Ui(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${uo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Wo(e.last_event_at)}</span>
    </button>
    ${e.resume_command?u`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Ed(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(_=>_&&_.current===!0),...s.filter(_=>_&&_.current!==!0).sort((_,A)=>A.index-_.index)],l=i.map(_=>Zh(_,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return u`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let c=new Set;for(let _ of o)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&c.add(_.resumed_from);let d=_=>{if(!(_.status==="failed"||_.status==="orphaned"))return"";let T=typeof _.session_id=="string"&&_.session_id.length>0,N=c.has(_.attempt_id),G=T&&!N,le=T?N?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return u`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${_.attempt_id}
      ?disabled=${!G}
      title=${le}
      @click=${X=>{X.stopPropagation(),G&&t.onResume&&t.onResume(_.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=_=>{if(!(_.status==="failed"||_.status==="orphaned")||typeof _.cause!="string"||_.cause==="")return"";let T=_.cause_detail,N=T&&typeof T.reason=="string"&&T.reason.length>0?typeof T.command=="string"&&T.command.length>0?`${T.reason} \xB7 ${T.command}`:T.reason:_.cause;return u`<div class="detail-session__cause" title=${N}>
      ${_.cause}
    </div>`},g=_=>{let A=Ad(Gi(_));if(Qt(A).length===0&&!Fr(_.usage))return"";let T=a.has(_.attempt_id);return u`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${_.attempt_id}
      aria-expanded=${T?"true":"false"}
      title=${T?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${N=>{N.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(_.attempt_id)}}
    >
      τ 자세히
    </button>`};return u`
    <div class="detail-section-label">
      세션 이력${jh(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(_=>{let A=Gi(_),T=Ad(A),N=Qt(T);return u`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${_.status||"unknown"}"
            data-attempt-id=${_.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(_.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Vh[_.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${_.attempt_id}</span>
            ${lo(_)?u`<span
                  class="detail-session__resumed"
                  title=${lo(_)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${fr(_)}</span>
            ${N.length>0?u`<span class="detail-session__role">orchestrator</span>`:""}
            ${_.session_id?u`<span class="detail-session__sid" title=${_.session_id}
                  >${String(_.session_id).slice(0,8)}</span
                >`:""}
            ${N.length>0?N.map(G=>u`<span
                      class="detail-session__usage"
                      title=${G.tooltip}
                      >${G.label}</span
                    >`):Fr(_.usage)?u`<span class="detail-session__usage"
                    >${Fr(_.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Wo(_.started_at)}</span>
          </button>
          ${g(_)} ${d(_)} ${p(_)} ${Qh(_)}
          ${a.has(_.attempt_id)&&_.usage?Yh(_.usage,_.runner==="codex"?"codex":"claude"):""}
          ${Kh(_,A,t)}
        </div>`})}
    </div>
  `}function Td(e,t={}){return u`
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
    ${e.expanded?u`<div class="detail-prompt" data-seam="task-prompt">
          ${Jh(e)}
        </div>`:""}
  `}function Jh(e){let t=Vr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return u`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Hn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=ii(n.recorded_at);return u`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Hn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Hn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var eb=["open","in_progress","deferred","resolved","closed"],tb=[0,1,2,3,4];function Cd(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,c=null,d=null,p={},g="",_=!1,A=[],T=!1,N={},G={claude:null,codex:null},le=null,X=null,F=0,I=!1,L=!1,U="",H="",te="",D="",K=!1;function W(){I=!1,L=!1,U="",H="",te="",D="",K=!1}function J(){G={claude:null,codex:null},le=null,X=null,F+=1}async function Ce(){if(!o)return null;try{let x=await Promise.resolve(o("get-workspace-accounts",{}));return x&&typeof x.state=="string"?x:null}catch{return null}}async function ke(x){try{let Z=await fetch(x);if(!Z.ok)return null;let P=await Z.json();if(!P||typeof P!="object"||!Array.isArray(P.accounts))return null;let Oe=P.accounts.filter(Je=>Je!==null&&typeof Je=="object"&&!Array.isArray(Je));return{accounts:Oe,active:Oe.find(Je=>Je.active===!0)||null}}catch{return null}}async function ie(x){X=x;let Z=++F,[P,Oe,Je]=await Promise.all([ke("/api/claude-usage"),ke("/api/codex-usage"),Ce()]);Z!==F||x!==c||(G={claude:P,codex:Oe},le=Je,dt())}let q=[],$e=null,Se=null,S=!1,ee="",Ee=!1,ge=0,xe=new Set;function ye(){q=[],$e=null,Se=null,S=!1,ee="",Ee=!1,ge+=1,xe.clear()}async function Ne(x){if(!o)return;let Z=++ge;try{let P=await Promise.resolve(o("get-comments",{id:x}));if(Z!==ge||x!==c)return;q=Array.isArray(P)?P:[],S=!1}catch{if(Z!==ge||x!==c)return;S=!0}dt()}function De(){if(!o||!c)return;let x=d&&typeof d.comment_count=="number"?d.comment_count:null;if($e!==c){$e=c,Se=x,Ne(c);return}x!==null&&x!==Se&&(Se=x,Ne(c))}function B(x){xe.has(x)?xe.delete(x):xe.add(x),dt()}function de(x){let Z=ee.trim().length===0;ee=x,Z!==(x.trim().length===0)&&dt()}async function re(){let x=ee.trim();if(!o||!c||x.length===0||Ee)return;let Z=c;Ee=!0,dt();let P=!1;try{let Oe=await Promise.resolve(o("add-comment",{id:Z,text:x}));Array.isArray(Oe)&&Oe.length>0&&(P=!0,Z===c&&(q=Oe,S=!1,ee="",Se=Oe.length))}catch{P=!1}P||be("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),Z===c&&(Ee=!1),dt()}let _e={onToggle:B,onDraftInput:de,onSubmit:re},ve=t.mdViewer||null,pe=null;ve||(pe=document.createElement("div"),pe.className="md-viewer-root",document.body.appendChild(pe));let qe=ve||di(pe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Me=document.createElement("div");Me.className="session-log-root",document.body.appendChild(Me);let je=Qr(Me,{transport:o?(x,Z)=>Promise.resolve(o(x,Z)):void 0,sessionLogStore:a}),He=!1,pt=!1,Y=!1,Q=null,v=null,ne=0;function Te(x){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${x}`}function he(){He=!1,pt=!1,Y=!1,Q=null,v=null,ne+=1}async function Re(x){if(!o)return;let Z=++ne;pt=!0,Y=!1,dt();try{let P=await Promise.resolve(o("get-bead-prompt",{bead_id:x}));if(Z!==ne)return;!P||typeof P!="object"||Array.isArray(P)?Y=!0:(Q=P,v=Te(x))}catch{Z===ne&&(Y=!0)}finally{Z===ne&&(pt=!1,dt())}}let Be=[],ze=null,it=0;function vt(x,Z){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${x}::${Z}`}function Nt(){Be=[],ze=null,it+=1}async function Ft(x,Z){if(!o)return;let P=++it,Oe;try{Oe=await Promise.resolve(o("get-session-refs",{bead_id:x}))}catch{Oe=null}P!==it||Z!==ze||(Be=Oe&&Array.isArray(Oe.sessions)?Oe.sessions:[],dt())}function xt(){if(!o||!c)return;let x=d&&d.metadata,Z=x&&typeof x=="object"&&typeof x.session_ref=="string"?x.session_ref:null;if(Z===null){Nt();return}let P=vt(c,Z);ze!==P&&(Be=[],ze=P,Ft(c,P))}function Rt(){if(He=!He,He&&c&&v!==Te(c)){Q=null,Re(c);return}dt()}function bt(){if(!i||!c)return[];let x=i.get();return(x&&x.attempts?Object.values(x.attempts):[]).filter(P=>P&&P.bead_id===c).sort((P,Oe)=>(Oe.started_at||0)-(P.started_at||0)).map(P=>({attempt_id:P.attempt_id,bead_id:P.bead_id,status:P.status,started_at:typeof P.started_at=="number"?P.started_at:null,runner:P.runner||null,model:P.model||null,effort:P.effort||P.observed_effort||null,speed:P.speed||null,session_id:P.session_id||null,resumed_from:P.resumed_from||null,continuation_mode:P.continuation_mode||null,dismissed_at:typeof P.dismissed_at=="number"?P.dismissed_at:null,cause:typeof P.cause=="string"?P.cause:null,cause_detail:P.cause_detail||null,exec_default_preset_id:typeof P.exec_default_preset_id=="string"?P.exec_default_preset_id:null,exec_default_preset_revision:typeof P.exec_default_preset_revision=="number"?P.exec_default_preset_revision:null,exec_values:P.exec_values&&typeof P.exec_values=="object"?P.exec_values:null,usage:P.usage||null,usage_legs:Array.isArray(P.usage_legs)?P.usage_legs:[],delegation_sessions:Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]}))}function Ge(){if(!i||!c)return null;let x=i.get();return jn(x&&x.attempts||{},c)}let O=new Set;function oe(x){O.has(x)?O.delete(x):O.add(x),dt()}function we(x){let Z=i?i.get():null,P=Z&&Z.attempts?Z.attempts[x]:null;je.open({attempt_id:x,meta:P?{runner:P.runner||void 0,model:P.model||void 0,effort:P.effort||void 0,status:P.status||void 0,session_id:P.session_id||void 0}:{}})}function E(x,Z){let P=i?i.get():null,Oe=P&&P.attempts?P.attempts[x]:null,nt=(Oe&&Array.isArray(Oe.delegation_sessions)?Oe.delegation_sessions:[]).find(me=>me&&typeof me=="object"&&me.launch_id===Z);nt&&je.open({attempt_id:x,launch_id:Z,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function V(x){if(!o||!x)return;let Z=await Pr();if(Z===null)return;let P=()=>{let me=i?i.get():null;return me&&typeof me.revision=="number"?me.revision:0},Oe=async(me={},Ae=P())=>await o("worker-attempt-resume",{attempt_id:x,expected_revision:Ae,...Z!==""?{instructions:Z}:{},...me}),Je=me=>{me?.queue&&i?.set&&i.set(me.queue)},nt=await Oe();if(Je(nt),nt&&nt.conflict){let me=nt.queue&&typeof nt.queue.revision=="number"?nt.queue.revision:P();nt=await Oe({},me),Je(nt)}nt=await qn(nt,(me,Ae)=>Oe({continuation:me,decision_token:Ae}),{onResult:Je,refresh:()=>Oe()}),nt&&nt.resumed===!1&&!nt.conflict&&nt.reason&&be(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${nt.reason}`,"error",2400)}function Le(x){!x||!c||je.open(Nr(x,c,d&&d.status))}let Ve={onOpen:we,onOpenDelegation:E,onResume:V,onToggleUsage:oe,onOpenSessionRef:Le,onCopyResumeCommand:Kt};function Pe(){let x=i?i.get():null,Z={...N};for(let P of["orchestration_model","orchestration_effort","orchestration_speed"]){let Oe=x&&x[P];typeof Oe=="string"&&(Z[P]=Oe)}return Z}async function Xe(){if(o){try{let x=await Promise.resolve(o("get-session-defaults",{}));N=x&&x.values&&typeof x.values=="object"?x.values:{}}catch{N={}}dt()}}function ot(){let x=i?i.get():null;return x&&x.runner_catalog||null}function Ue(){let x=i?i.get():null;return x&&typeof x.execution_defaults=="object"?x.execution_defaults:null}function tt(){let x=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},P=fn({pin:{...x,...p},global:Pe(),execution_defaults:Ue(),runner_catalog:ot(),route:typeof x.route=="string"?x.route:null}).orchestration_model.value||"";return wn(ot(),P)}function wt(){let x=l?l.get():null;return!x||typeof x.revision!="number"?null:{revision:x.revision,presets:Array.isArray(x.presets)?x.presets:[]}}function Ke(x){return x?.compatible===!1}function kt(x){l&&x&&typeof x.revision=="number"&&Array.isArray(x.presets)&&l.set({revision:x.revision,presets:x.presets})}async function Ye(){let x=wt(),Z=x?.presets.find(P=>P.id===g);if(!(!o||!c||!x||!Z||Ke(Z)||_)){_=!0,A=[],dt();try{let P=await Promise.resolve(o("apply-impl-preset",Ic(c,Z.id,x.revision)));if(P&&P.conflict){kt(P),be("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Oe=P&&Array.isArray(P.issue)?P.issue[0]:P?.issue;if(P&&P.applied&&Oe&&typeof Oe=="object"){d=Oe,A=Array.isArray(P.skipped_orchestration_keys)?P.skipped_orchestration_keys.filter(Je=>typeof Je=="string"):[];for(let Je of Dc)delete p[Je];be(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}P&&P.error==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(P){P&&typeof P=="object"&&P.code==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{_=!1,dt()}}}let ct=null;n&&n.subscribe&&(ct=n.subscribe(()=>Lt()));let Ot=null;i&&typeof i.subscribe=="function"&&(Ot=i.subscribe(()=>{c&&dt()}));let At=null,Tt=null;function Gt(){Tt&&(Tt(),Tt=null)}l&&typeof l.subscribe=="function"&&(At=l.subscribe(()=>{c&&dt()}));function cn(x){x.key==="Escape"&&c&&(x.preventDefault(),r())}document.addEventListener("keydown",cn);function Lt(){if(c){if(n&&typeof n.snapshotFor=="function"){let x=n.snapshotFor("detail:"+c)||[];d=x.find(P=>P&&P.id===c)||x[0]||d}De(),xt(),dt()}}function Kt(x){nn(x).then(Z=>{Z?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function jt(x){x.preventDefault(),x.stopPropagation(),c&&Kt(c)}function It(x,Z){x.preventDefault(),x.stopPropagation(),Kt(Z)}function Zt(x,Z,P){x.preventDefault(),x.stopPropagation(),qe.open(Z,{missing_state:P})}async function Yt(x,Z){let P=Object.hasOwn(p,x),Oe=p[x];if(p[x]=Z,dt(),!(!o||!c))try{let Je=await Promise.resolve(o("update-exec-settings",Lc(c,x,Z.length===0?null:Z))),nt=Array.isArray(Je)?Je[0]:Je;if(!nt||typeof nt!="object"||!nt.id)throw new Error("exec settings readback failed");d=nt,delete p[x],dt()}catch(Je){throw P?p[x]=Oe:delete p[x],dt(),be("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Je}}function zt(x){x.catch(()=>{})}async function un(x,Z){let P=d||{},Oe=P.metadata&&typeof P.metadata=="object"?P.metadata:{},Je={};for(let Ae of["impl_runtime","impl_model","impl_effort"])Je[Ae]=Object.hasOwn(p,Ae)?p[Ae]:typeof Oe[Ae]=="string"?Oe[Ae]:"";Je[x]=Z;let nt=Nc(Je,ot(),tt()),me={};for(let Ae of["impl_runtime","impl_model","impl_effort"])me[Ae]=p[Ae],p[Ae]=nt[Ae]||"";if(dt(),!(!o||!c))return Promise.resolve(o("update-impl-target",{id:c,...nt,orchestration_runtime:tt()})).then(Ae=>{let et=Array.isArray(Ae)?Ae[0]:Ae;if(!et||typeof et!="object"||!et.id)throw new Error("implementation target readback failed");d=et;for(let hn of["impl_runtime","impl_model","impl_effort"])delete p[hn];dt()}).catch(Ae=>{for(let et of["impl_runtime","impl_model","impl_effort"])me[et]===void 0?delete p[et]:p[et]=me[et];throw dt(),be("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ae})}async function y(x,Z){if(!(!x||typeof x!="object")&&!(Z==="diverged"&&!window.confirm("\uCD94\uCC9C \uC2E4\uD589 \uC124\uC815\uC744 \uC801\uC6A9\uD560\uAE4C\uC694? \uD604\uC7AC \uC218\uB3D9 \uC124\uC815\uC744 \uB36E\uC5B4\uC501\uB2C8\uB2E4."))){try{await Yt("orchestration_model",x.orchestration_model)}catch{return}if(typeof x.impl_runtime=="string"&&x.impl_runtime.length>0)try{await un("impl_runtime",x.impl_runtime)}catch{}}}async function f(x,Z,P){if(!o||!c)return!1;try{let Oe=await Promise.resolve(o(x,Z)),Je=Array.isArray(Oe)?Oe[0]:Oe;return Je&&typeof Je=="object"&&Je.id?(d=Je,!0):(be(P,"error"),!1)}catch(Oe){return Oe&&typeof Oe=="object"&&Oe.code==="bd_readback_failed"?(be("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(be(P,"error"),!1)}}function j(x){setTimeout(()=>{try{let Z=e.querySelector(x);Z&&typeof Z.focus=="function"&&Z.focus()}catch{}},0)}function ue(){I=!0,U=d&&d.title||"",dt(),j('.detail-edit__input[data-edit="title"]')}function ae(x){U=x.target.value}function We(){I=!1,U="",dt()}function at(){f("edit-text",{id:c,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(Z=>{Z===!0&&(I=!1,U=""),dt()})}function ut(){L=!0,H=d&&d.description||"",dt(),j('.detail-edit__textarea[data-edit="description"]')}function st(x){H=x.target.value}function _t(){L=!1,H="",dt()}function gt(){f("edit-text",{id:c,field:"description",value:H},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(Z=>{Z===!0&&(L=!1,H=""),dt()})}function ht(x,Z,P,Oe){if(x.key==="Escape"){x.stopPropagation(),P();return}x.key==="Enter"&&(!Oe||x.ctrlKey||x.metaKey)&&(x.preventDefault(),Z())}function h(x){let Z=x.target.value;f("update-status",{id:c,status:Z},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>dt())}function b(x){let Z=Number(x.target.value);f("update-priority",{id:c,priority:Z},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>dt())}function R(x){te=x.target.value}function M(){let x=te.trim();x.length!==0&&f("label-add",{id:c,label:x},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(Z=>{Z===!0&&(te=""),dt()})}function m(x){if(x.key==="Escape"){x.stopPropagation(),te="",dt();return}x.key==="Enter"&&(x.preventDefault(),M())}function w(x){f("label-remove",{id:c,label:x},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>dt())}let z={onCopyPath:It,onOpenDoc:Zt};function ce(x){return typeof x=="string"?x:x&&typeof x=="object"?String(x.id||x.to||x.issue_id||x.depends_on||""):""}function Ie(x){return x&&typeof x=="object"?String(x.dependency_type||x.type||""):""}function k(x){switch(x){case"discovered-from":return"\u21A9 \uBC1C\uACAC ";case"parent-child":return"\u2338 \uC0C1\uC704 ";case"related":return"\uAD00\uB828 ";default:return x.length>0?`${x} `:""}}function $(x){if(!x||typeof x!="object")return;let Z=typeof x.status=="string"?x.status:"",P=typeof x.title=="string"?x.title:"";return Z.length>0&&P.length>0?`${Z} \xB7 ${P}`:void 0}function C(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function se(){return t.depCandidates?t.depCandidates():null}async function fe(x,Z,P){let Oe=C(),Je=c;if(!Je)return;if(Oe.length===0){be("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let nt=await f(x,{a:Je,b:Z,view_id:Je,root_dir:Oe},P),me=nt===!0||nt!==!1&&nt.saved===!0;me&&t.onDepChanged&&t.onDepChanged({type:x,a:Je,b:Z}),x==="dep-add"&&me&&(D="",K=!1),dt()}function Fe(x){if(!c)return;let Z=globalThis.confirm;typeof Z=="function"&&!Z(`${x}\uAC00 ${c}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||fe("dep-remove",x,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function rt(x){x.disabled||fe("dep-add",x.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function qt(x){D=x.target.value,K=!0,dt()}function Ze(){K||(K=!0,dt())}function Dt(x,Z){if(x.key==="Escape"){x.stopPropagation(),D="",K=!1,dt();return}x.key==="Enter"&&(x.preventDefault(),Z.length===1&&!Z[0].disabled&&rt(Z[0]))}function Jt(x){return u`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${D}
        @focus=${Ze}
        @input=${qt}
        @keydown=${Z=>Dt(Z,x)}
      />
      ${K||D.length>0?u`<div class="detail-dep-add__list">
            ${x.length===0?u`<div class="detail-dep-add__empty">후보 없음</div>`:x.map(Z=>u`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${Z.bead_id}
                      ?disabled=${Z.disabled}
                      title=${en(Z.reason)}
                      @click=${()=>rt(Z)}
                    >
                      <span class="detail-dep-add__repo"
                        >${Z.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${Z.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${Z.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function Tn(x,Z){let P=Z.get(x.id),Oe=s?u`<button
          type="button"
          class="detail-dep__link"
          title=${en(x.title)}
          @click=${()=>P===void 0?s(x.id):s(x.id,P)}
        >
          ${x.label}
        </button>`:u`<span class="detail-dep__link" title=${en(x.title)}
          >${x.label}</span
        >`;return u`<span
      class=${`detail-dep detail-dep--${x.kind}${s?" detail-dep--link":""}`}
      >${Oe}${x.kind==="pred"?u`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${x.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+x.id}
            @click=${()=>Fe(x.id)}
          >
            ✕
          </button>`:""}</span
    >`}function sr(x){let Z=Array.isArray(x.dependencies)?x.dependencies:[],P=Array.isArray(x.dependents)?x.dependents:[],Oe=[];for(let Ae of Z){let et=ce(Ae);et.length>0&&Ie(Ae)==="blocks"&&Oe.push({id:et,label:`\u26D3 \uB9C9\uB294 ${et}`,kind:"pred",title:$(Ae)})}for(let Ae of P){let et=ce(Ae);et.length>0&&Ie(Ae)==="blocks"&&Oe.push({id:et,label:`\u26D3 \uB9C9\uD788\uB294 ${et}`,kind:"succ",title:$(Ae)})}for(let Ae of Z){let et=ce(Ae),hn=Ie(Ae);et.length>0&&hn!=="blocks"&&Oe.push({id:et,label:`${k(hn)}${et}`,kind:"other",title:$(Ae)})}let Je=se(),nt=new Map;if(Je)for(let Ae of Je.issues)nt.has(Ae.bead_id)||nt.set(Ae.bead_id,Ae.root_dir);let me=Je&&c?Su(Au(c,Je),D):[];return u`
      <div class="detail-section-label">의존성</div>
      ${Oe.length===0?u`<div class="detail-empty">의존성 없음</div>`:u`<div class="detail-deps">
            ${Oe.map(Ae=>Tn(Ae,nt))}
          </div>`}
      ${Je===null?u`<div class="detail-empty">후보를 불러올 수 없음</div>`:Jt(me)}
    `}function Cn(x){let Z=x.metadata||{},P=x.workflow||{},Oe=P.stages||{},Je=Oe.spec&&Oe.spec.stale,nt=Oe.impl&&Oe.impl.stale,me=P.quick_fix_review?.state==="stale",Ae=Oe.plan||null,et=P.route_source==="derived",hn=P.route||Z.route||"\u2014";return u`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${et?" detail-kv__v--derived":""}"
          title=${et?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${et?"unset":hn}</span
        >
      </div>
      ${P.route!=="quick_fix"||Object.hasOwn(Z,"spec_review")?u`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${Z.spec_review||"\uC5C6\uC74C"}${Je?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${P.route==="full_plan"?u`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ae?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ae?.approval_receipt||"\uC5C6\uC74C"}${Ae?.approval_state==="stale"?" \xB7 stale":Ae?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${P.route!=="quick_fix"||Object.hasOwn(Z,"impl_review")?u`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${Z.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${P.resolver?u`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${P.resolver.attempt} \xB7 ${P.resolver.prior_sha} \u2192 ${P.resolver.sha}`}
              >${`${P.resolver.prior_sha.slice(0,7)} \u2192 ${P.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${P.route==="quick_fix"||Object.hasOwn(Z,"quick_fix_review")?u`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${Z.quick_fix_review||"\uC5C6\uC74C"}${me?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${P.planned_execution?u`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${P.planned_execution.kind}</span>
            </div>
            ${P.planned_execution.kind==="main"?u`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${P.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${P.exec_receipt?u`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Nn(P.exec_receipt)}</span
            >
          </div>`:""}
      ${P.impl_entry?u`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${P.impl_entry.actor}@${P.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${Z.pr_url?u`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${Z.pr_url}</span>
          </div>`:""}
    `}let Vt={route:["quick_fix","spec_backed","full_plan"]};async function Gn(x,Z){let P=Z.target.value;if(x==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&P!=="full_plan"&&!window.confirm(`full_plan \u2192 ${P||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){dt();return}await f("update-workflow-meta",{id:c,key:x,value:P},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),dt()}function $r(x){let Z=x.metadata||{};return u` ${((Oe,Je)=>{let nt=Vt[Oe],me=typeof Z[Oe]=="string"?Z[Oe]:"";return u`<div class="detail-kv">
        <span class="detail-kv__k">${Oe}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Oe}
          data-edit=${`wfmeta-${Oe}`}
          @change=${Ae=>Gn(Oe,Ae)}
        >
          <option value="" ?selected=${!nt.includes(me)}>
            ${Je}
          </option>
          ${nt.map(Ae=>u`<option value=${Ae} ?selected=${me===Ae}>${Ae}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function xr(x,Z){return I?u`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${ae}
            @keydown=${P=>ht(P,at,We,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${at}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${We}
            >
              취소
            </button>
          </div>
        </div>
      `:u`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${x}</h2>
        ${Qt(Z).map(P=>u`<span class="detail-usage-total" title=${P.tooltip}
              >${P.label}</span
            >`)}
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
    `}function Rn(x){let Z=Ht(x.created_at),P=Ht(x.updated_at);return!Z&&!P?u``:u`
      ${Z?u`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${Z}</span>
          </div>`:""}
      ${P?u`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${P}</span>
          </div>`:""}
    `}function Mn(x,Z){return u`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${h}
        >
          ${eb.map(P=>u`<option value=${P} ?selected=${P===x}>${P}</option>`)}
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
          ${tb.map(P=>u`<option value=${String(P)} ?selected=${P===Z}>
                P${P}
              </option>`)}
        </select>
      </div>
    `}function Kn(x){return u`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${L?"":u`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ut}
            >
              ✎
            </button>`}
      </div>
      ${L?u`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${H}
              @input=${st}
              @keydown=${Z=>ht(Z,gt,_t,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${gt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${_t}
              >
                취소
              </button>
            </div>
          </div>`:u`<div class="detail-overlay__desc">
            ${x||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Qe(x){let Z=typeof x.notes=="string"?x.notes:"";return Z.trim().length===0?u``:u`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${Z}</div>
    `}function Bt(x){let Z=Array.isArray(x.labels)?x.labels:[];return u`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${Z.map(P=>u`<span class="detail-label-chip"
              >${P}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${P}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+P}
                @click=${()=>w(P)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${te}
            @input=${R}
            @keydown=${m}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${M}
          >
            추가
          </button>
        </span>
      </div>
    `}function gn(){if(!c)return u``;let x=d||{},Z=String(x.id||c),P=x.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Oe=Ge(),Je=x.status||"open",nt=typeof x.priority=="number"?Math.max(0,Math.min(4,x.priority)):"",me=x.description||"",Ae={...x,metadata:{...x.metadata||{},...p}};return u`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${jt}
            >
              ${Z}
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
          ${xr(P,Oe)}
          ${hd(Ae,{onApplyRec:y})}
          ${gd({metadata:Ae.metadata,workspace_values:Pe(),catalog:ot(),execution_defaults:Ue(),expanded:T,presets:wt()?.presets||[],preset_id:g,preset_busy:_,skipped_orchestration_keys:A},{onToggle:et=>{T=et,dt()},onEdit:(et,hn)=>{if(et==="impl_runtime"||et==="impl_model"||et==="impl_effort"){zt(un(et,hn??""));return}zt(Yt(et,hn??""))},onPresetSelect:et=>{g=et,A=[],dt()},onPresetApply:()=>{Ye()}})}
          ${$d({md:Ae.metadata,catalog:G,workspace_defaults:le,handlers:{onExecChange:(et,hn)=>zt(Yt(et,hn))}})}
          ${Mn(Je,nt)} ${Rn(x)}
          ${Kn(me)}
          ${pd(q,_e,{expanded:xe,draft:ee,sending:Ee,error:S})}
          ${Qe(x)} ${Bt(x)} ${sr(x)}
          ${Cn(x)} ${$r(x)}
          ${cd(x,z)}
          ${Td({expanded:He,loading:pt,error:Y,data:Q},{onToggle:Rt})}
          ${Ed(bt(),Ve,{total:Oe,expanded:O},Be)}
        </div>
      </div>
    `}function dt(){lt(gn(),e)}return{load(x){x!==c&&(p={},g="",A=[],T=!1,W(),ye(),he(),Nt(),J()),c=x,d=null,!Tt&&t.subscribeCandidates&&(Tt=t.subscribeCandidates(()=>{c&&dt()})),Lt(),Xe(),X!==x&&ie(x)},clear(){c=null,d=null,p={},g="",_=!1,A=[],T=!1,W(),ye(),he(),Nt(),J(),Gt(),qe.close(),je.close(),lt(u``,e)},destroy(){ct&&(ct(),ct=null),Ot&&(Ot(),Ot=null),At&&(At(),At=null),Gt(),document.removeEventListener("keydown",cn),ve||(qe.destroy(),pe&&pe.parentNode&&pe.parentNode.removeChild(pe)),je.destroy(),Me.parentNode&&Me.parentNode.removeChild(Me),c=null,d=null,J(),g="",_=!1,A=[],ye(),he(),Nt(),lt(u``,e)}}}function Rd(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(c,d,p="")=>{n&&(n.textContent=c||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let g=typeof p=="string"?p.trim():"";if(o&&(g.length>0?(o.textContent=g,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var nb="(max-width: 640px)";function fi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(nb),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function rb(){return{lanes:{done:!0},areas:{}}}function zo(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function ob(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:zo(r.lanes),areas:zo(r.areas)}:{lanes:zo(r),areas:{}}}catch{return null}}function Od(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function _i(e,t=rb()){let n={lanes:zo(t.lanes),areas:zo(t.areas)},r=ob(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},Od(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},Od(e,o),i}}}function Ka(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function mi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function gi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:c,adoptQueue:d,onDragBegin:p}=e,g=[],_=null,A=!1,T=null,N=null,G=null;function le(){T!==null&&clearTimeout(T),T=setTimeout(()=>{T=null,A=!1},0)}function X(){return s()??null}function F(){let B=new Map,de=o();for(let re of Array.isArray(de)?de:[]){if(!re||typeof re!="object")continue;let _e=re.bead_blocked_by&&typeof re.bead_blocked_by=="object"?re.bead_blocked_by:{};for(let[ve,pe]of Object.entries(_e))Array.isArray(pe)&&B.set(ve,mi(pe));for(let ve of[...Array.isArray(re.runnable)?re.runnable:[],...Array.isArray(re.session_active)?re.session_active:[]])ve&&typeof ve.bead_id=="string"&&Array.isArray(ve.blocked_by)&&ve.blocked_by.length>0&&B.set(ve.bead_id,mi(ve.blocked_by))}return B}function I(){let B=new Map,de=new Map,re=o();for(let _e of Array.isArray(re)?re:[]){if(!_e||typeof _e!="object")continue;let ve=_e.bead_blocked_by&&typeof _e.bead_blocked_by=="object"?_e.bead_blocked_by:{};for(let[pe,qe]of Object.entries(ve))Array.isArray(qe)&&B.set(pe,mi(qe));for(let pe of Array.isArray(_e.runnable)?_e.runnable:[])pe&&typeof pe.bead_id=="string"&&Array.isArray(pe.blocked_by)&&de.set(pe.bead_id,mi(pe.blocked_by))}for(let _e of g)for(let ve of[B,de]){let pe=ve.get(_e.a);pe!==void 0&&ve.set(_e.a,_e.type==="dep-remove"?pe.filter(qe=>qe!==_e.b):pe.includes(_e.b)?pe:[...pe,_e.b])}return{snapshot:B,runnable:de}}function L(){let B=F();for(let de of g){let re=(B.get(de.a)||[]).slice();de.type==="dep-remove"?B.set(de.a,re.filter(_e=>_e!==de.b)):re.includes(de.b)||B.set(de.a,[...re,de.b])}return B}function U(B=r(),de=X()){let re=new Map;for(let He of Array.isArray(de?.lanes)?de.lanes:[]){let pt=new Map;for(let Y of Array.isArray(He?.entries)?He.entries:[])Y&&typeof Y.bead_id=="string"&&pt.set(Y.bead_id,Y.dep_created_by_lane===!0);re.set(typeof He?.id=="string"?He.id:"",pt)}let _e=new Map,ve=new Map,pe=new Set,qe=new Set;for(let He of B.chain_lanes){let pt=re.get(He.lane_id);_e.set(He.lane_id,{status:He.status,entries:He.rows.map((Y,Q)=>({bead_id:Y.id,root_dir:Y.root_dir,...Q===0?{}:{dep_created_by_lane:pt?.get(Y.id)===!0}}))});for(let Y of He.rows)ve.set(Y.id,He.lane_id),Y.fixed&&pe.add(Y.id),Y.unplaced||qe.add(Y.id)}let Me=new Map;for(let He of B.parallel_rows)typeof He.queue_index=="number"&&Me.set(He.id,He.queue_index);for(let He of B.queue_groups)for(let pt of He.sublanes.serial)for(let Y of pt.items)typeof Y.queue_index=="number"&&Me.set(Y.id,Y.queue_index);let je=I();return{blocked_by_map:L(),snapshot_blocked_by:je.snapshot,runnable_blocked_by:je.runnable,owner_of:new Map(Object.entries(B.owner_of)),cross_lanes:_e,owner_lane_of:ve,fixed_members:pe,placed_members:qe,parallel_rows:B.parallel_rows.map(He=>({bead_id:He.id,root_dir:He.root_dir,queue_index:He.queue_index??0})),parallel_raw_length:new Map(Object.entries(B.parallel_raw_length)),queue_index_of:Me}}function H(B,de){let re=r();for(let ve of[...re.runnable,...re.queue,...re.running,...re.pr_wait,...re.done])if(!(ve.non_occupying||ve.id!==de)){if(ve.root_dir===B)return ve.expected_revision;break}let _e=re.queue_groups.find(ve=>ve.root_dir===B);return _e?_e.revision:0}async function te(B,de,re,_e){if(!t)return null;let pe=await t(B,{...de,...re?{root_dir:re}:{},expected_revision:_e});if(pe&&pe.conflict){pe.queue&&d?.(re,pe.queue);let qe=pe.queue&&typeof pe.queue.revision=="number"?pe.queue.revision:_e;pe=await t(B,{...de,...re?{root_dir:re}:{},expected_revision:qe})}return pe&&pe.queue&&d?.(re,pe.queue),pe}async function D(B,de,re,_e,ve){try{let pe=await te(B,de,re,_e.get(re)??H(re,ve.bead_id));return!pe||typeof pe.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(pe.queue&&typeof pe.queue.revision=="number"&&_e.set(re,pe.queue.revision),pe.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):pe.applied===!1?(a(pe.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${pe.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):pe.queue&&typeof pe.queue.revision=="number"?pe.queue.revision:_e.get(re)??0)}catch(pe){return a(Ka(pe),"error"),null}}async function K(B,de,re=new Map){if(B.type==="worker-queue-disarm"){try{let _e=await te(B.type,B.payload,B.root_dir,re.get(B.root_dir)??H(B.root_dir,de));_e&&_e.queue&&typeof _e.queue.revision=="number"&&re.set(B.root_dir,_e.queue.revision)}catch{}return!0}if(B.type==="worker-queue-place"||B.type==="worker-queue-reorder"||B.type==="worker-queue-remove")return await D(B.type,B.payload,B.root_dir,re,{bead_id:de})!==null;try{return(B.type==="dep-add"||B.type==="dep-remove")&&t&&await t(B.type,{a:B.a,b:B.b,...B.root_dir?{root_dir:B.root_dir}:{}}),!0}catch(_e){return a(Ka(_e),"error"),!1}}function W(B){(B.type==="dep-add"||B.type==="dep-remove")&&(g=[...g,{type:B.type,a:B.a,b:B.b}])}async function J(B,de){if(!t)return{ok:!1};try{let re=await t(B.type,{...B.payload,expected_revision:de});return!re||typeof re.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:re.revision}}catch(re){let _e=re,ve=_e&&_e.code==="conflict"?_e.details?.cross_lanes:null;return ve&&typeof ve.revision=="number"&&Array.isArray(ve.lanes)?{ok:!1,conflict:ve}:(a(Ka(re),"error"),{ok:!1})}}async function Ce(B,de,re){let _e=new Map,ve=[],pe=B.ops.slice(0,B.lane_op_index),qe=B.ops.slice(B.lane_op_index);for(let je of pe){if(!await K(je,re,_e))return{done:!0};W(je)}let Me=de;for(let je of B.lane_ops){if(Me===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let He=await J(je,Me);if(!He.ok)return He.conflict?{done:!1,conflict:He.conflict}:{done:!0};Me=He.revision}for(let je of qe){if(!await K(je,re,_e))return{done:!0};W(je),je.type==="dep-add"&&ve.push(je)}for(let je of $u(ve))Me=await ke(je,Me);return{done:!0}}async function ke(B,de){if(de===null||!t)return de;let re=B.pairs,_e=de;for(let ve=0;ve<2;ve+=1){if(re.length===0)return _e;try{let pe=await t("monitor-lane-provenance",{lane_id:B.lane_id,pairs:re.map(qe=>({bead_id:qe.bead_id,after:qe.after,value:!0})),expected_revision:_e});return pe&&typeof pe.revision=="number"?pe.revision:_e}catch(pe){let qe=pe,Me=qe&&qe.code==="conflict"?qe.details?.cross_lanes:null;if(!Me||typeof Me.revision!="number"||!Array.isArray(Me.lanes))return _e;let je=Me.lanes.find(He=>He&&He.id===B.lane_id);re=xu(Array.isArray(je?.entries)?je.entries:[],re),_e=Me.revision}}return _e}async function ie(B,de,re=[]){g=re,l("",0);let _e=r(),ve=X();for(let pe=0;;pe+=1){let qe=B(U(_e,ve));if("refused"in qe){a(qe.refused,"error");break}let Me=await Ce(qe,_e.cross_lanes_revision,de);if(Me.done){qe.correction&&l(qe.correction.lane_id,qe.correction.corrected);break}if(pe>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let je=i(Me.conflict);_e=je.lanes,ve=je.raw_lanes}g=[],c()}async function q(B,de){await ie(re=>Ys(B,de,re),B.bead_id)}function $e(B,de){let re=de&&typeof de.closest=="function"?de.closest("[data-row-index]"):null;if(re&&B.contains(re)){let _e=Number(re.getAttribute("data-row-index"));return Number.isFinite(_e)?_e:0}return B.querySelectorAll("[data-row-index]").length}function Se(B){let de=typeof B?.closest=="function"?B.closest(".worker-pane--collapsed[data-lane]"):null;if(!de)return null;let re=de.getAttribute("data-lane");return re==="queue"?{zone:de,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:re==="candidate"?{zone:de,target:{kind:"candidate"}}:null}function S(B){let de=B.target;if(!_)return null;let re=typeof de?.closest=="function"?de.closest("[data-drop]"):null;if(!re)return Se(de);let _e=re.getAttribute("data-drop");if(_e==="candidate")return{zone:re,target:{kind:"candidate"}};if(_e==="parallel")return{zone:re,target:{kind:"parallel",marker_index:$e(re,de)}};if(_e==="chain")return{zone:re,target:{kind:"chain",lane_id:re.getAttribute("data-lane-id")||"",marker_index:$e(re,de)}};if(_e==="repo-serial"){let ve=re.getAttribute("data-root-dir")||"";if(ve!==_.root_dir)return null;let pe=typeof de?.closest=="function"?de.closest("[data-queue-index]"):null,qe=pe&&re.contains(pe)?pe.getAttribute("data-queue-index"):re.getAttribute("data-lane-length"),Me=Number(qe);return{zone:re,target:{kind:"repo-serial",root_dir:ve,lane_id:re.getAttribute("data-lane-id")||"",index:Number.isFinite(Me)?Me:0}}}return null}function ee(){for(let B of Array.from(n.querySelectorAll(".is-drop-over")))B.classList.remove("is-drop-over")}function Ee(B){N=B.target instanceof Element?B.target:null}function ge(B){let de=B.target,re=typeof de?.closest=="function"?de.closest('[draggable="true"][data-bead-id]'):null,_e=re?re.closest("[data-drag-kind]"):null;if(!_e)return;if(re&&N&&re.contains(N)&&typeof N.closest=="function"&&N.closest("input, button, a")){B.preventDefault();return}let ve=_e.getAttribute("data-bead-id")||"",pe=_e.getAttribute("data-drag-kind")||"",qe=_e.getAttribute("data-root-dir")||"";if(!ve||!pe)return;let Me=_e.getAttribute("data-queue-index")||"",je=Number(Me),He=_e.getAttribute("data-lane-id")||"";_={kind:pe,bead_id:ve,root_dir:qe,...Me!==""&&Number.isFinite(je)?{queue_index:je}:{},...He?{lane_id:He}:{}},A=!0,p?.(),n.classList.add("is-dragging");try{B.dataTransfer?.setData("text/plain",ve),B.dataTransfer&&(B.dataTransfer.effectAllowed="move")}catch{}}function xe(B){let de=S(B);de&&(B.preventDefault(),B.dataTransfer&&(B.dataTransfer.dropEffect="move"),de.zone.classList.add("is-drop-over"))}function ye(B){let de=B.target;typeof de?.closest=="function"&&(de.closest("[data-drop]")?.classList.remove("is-drop-over"),de.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Ne(){_=null,ee(),n.classList.remove("is-dragging"),le()}function De(B){let de=S(B),re=_;_=null,ee(),n.classList.remove("is-dragging"),!(!de||!re)&&(B.preventDefault(),q(re,de.target))}return{attach(B){G||(G=B,B.addEventListener("pointerdown",Ee),B.addEventListener("dragstart",ge),B.addEventListener("dragover",xe),B.addEventListener("dragleave",ye),B.addEventListener("drop",De),B.addEventListener("dragend",Ne))},detach(){T!==null&&(clearTimeout(T),T=null);let B=G;G=null,B&&(B.removeEventListener("pointerdown",Ee),B.removeEventListener("dragstart",ge),B.removeEventListener("dragover",xe),B.removeEventListener("dragleave",ye),B.removeEventListener("drop",De),B.removeEventListener("dragend",Ne))},isDragging(){return _!==null},consumeClickSuppression(){let B=A;return A=!1,B},applyDrop:q,runPlanned:ie,dropModel:U,sendOp:K,sendQueueCas:D,rememberDep:W}}function Id(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(c=>typeof c=="string"&&c.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Ss(o[i].scope,o[l].scope);if(a.length===0)continue;let c=o[i].member,d=o[l].member;n.get(c.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:c.id,title:c.title,location_label:c.location_label,prefixes:a})}return n}var sb=["parallel","serial","candidate"];function Ld(e){return sb.includes(e.kind)?e.kind!=="candidate"||e.queue_placeable===!0:!1}function Ho(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Ya(e,t,n){let r=n.members_by_id.get(e),o=n.members_by_id.get(t);if(!r||!o)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let s=r.lane_id,i=o.lane_id;if(s!==null&&s===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let l=Ld(r),a=Ld(o);if(r.kind==="candidate"&&!l)return{kind:"disabled",title:`${e}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(o.kind==="candidate"&&!a)return{kind:"disabled",title:`${t}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(l&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(s!==null&&a&&i===null)return{kind:"ops",title:`${s} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:s,index:n.serial_raw_lengths[s]||0}]};if(l&&s===null&&a&&i===null){let c=ib(n);return c===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${c} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:c,index:0},{bead_id:e,lane:c,index:1}]}}return!l&&!a?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:l?{kind:"note",text:`${Ho(o.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Ho(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function ib(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Va=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var Dd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328"};function bi(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function hi(e){for(let t of bi(e)){if(Object.hasOwn(Dd,t))return Dd[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Pd(e){return bi(e).length===0?null:hi(e)||"\uC2E4\uD328"}function vr(e){let t=null;for(let n of bi(e))Object.hasOwn(Va,n)&&(t=Va[n]);return t}function Zr(e){let t=hi(e),n=vr(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Nd(e,t){let n=hi(e)??hi(t),r=vr(t)??vr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ab=new Set(["repo_operation_timeout_unresolved"]);function lb(e){for(let t of bi(e))if(ab.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function cb(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function qd(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||lb(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(cb(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${mr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Md={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Fd(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Md,t.blocked_reason)?Md[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=Zr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=Zr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function ub(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function db(e,t){if(!e||e.open!==!0)return"";let n=vr(e.cause)||Zr(e.cause),r=e.cause_detail,o=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=o?[o.cursor||null,typeof o.head_sha=="string"?o.head_sha.slice(0,7):null,o.reason||null].filter(Boolean).join(" \xB7 "):"",i=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${tn(e.finished_at,t)}`:"",l=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(d=>typeof d=="string"&&d.length>0).join(" \xB7 "),a=e.usage?.total_cost_usd,c=typeof a=="number"&&Number.isFinite(a)?`$${a.toFixed(2)}`:"";return u`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${n?u`<div>
            <dt>원인</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${e.cause?u`<div>
            <dt>실패 코드</dt>
            <dd><code>${e.cause}</code></dd>
          </div>`:""}
      ${r?.reason?u`<div>
            <dt>가드/원인</dt>
            <dd>${r.reason}</dd>
          </div>`:""}
      ${r?.command?u`<div>
            <dt>명령</dt>
            <dd><code>${r.command}</code></dd>
          </div>`:""}
      ${s?u`<div>
            <dt>착지 단계</dt>
            <dd>${s}</dd>
          </div>`:""}
      ${i?u`<div>
            <dt>실패 시각</dt>
            <dd>${i}</dd>
          </div>`:""}
      ${l?u`<div>
            <dt>실행</dt>
            <dd>${l}</dd>
          </div>`:""}
      ${e.attempt_id?u`<div>
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
      ${c?u`<div>
            <dt>비용</dt>
            <dd>${c}</dd>
          </div>`:""}
      <div>
        <dt>재개</dt>
        <dd>
          ${e.resume_eligible?"\uC774\uC5B4\uD558\uAE30 \uAC00\uB2A5":e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
        </dd>
      </div>
    </dl>
    ${e.attempt_id?u`<button
          type="button"
          class="rtile__session"
          title="실패 세션 열기"
          aria-label="실패 세션 열기"
        >
          ▤ 세션
        </button>`:""}
    ${e.landed?u`<p class="rtile__failure-landed">
          이미 base에 착지됨 — 이어하기로 배포·정리를 재개
        </p>`:""}
  </div>`}function pb(e){return!e||!e.repo&&!e.serial_lane_id?"":u`${e.repo?u`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?u`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var fb=new Set(["codex-runner"]);function _b(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(_=>_&&!(typeof _.agent_type=="string"&&fb.has(_.agent_type))),a=l.filter(_=>_&&_.state==="live"),c=l.filter(_=>_&&_.state!=="live"),d=r&&typeof r.last_event_at=="number"?tn(r.last_event_at,t):"",p=r?tn(r.updated_at,t):"",g=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:p?`\uAC31\uC2E0 ${p}`:"";return u`${s?u`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?u`<span class="rtile__activity-age"
              >${tn(i,t)}</span
            >`:""}
      </div>`:g?u`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${g}</span>
        </div>`:""}${a.length>0||c.length>0?u`<div class="rtile__legs">
        ${a.map(_=>u`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${_.label}</span
            >`)}${c.length>0?u`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${c.map(_=>_.label).join(", ")}`}
              >위임 완료 ${c.length}</span
            >`:""}
      </div>`:""}`}var mb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function gb(e){if(!e)return"";let t=mb[e.locality]||"";return u`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Qa(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(ie=>ie&&ie.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=!!e.paused,c=i?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ub(t-e.started_at):"\u2014",d=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,p=lo(e),g=Qt(e.usage),_=Fn(e.usage),A=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,T=e.base_exception||null,N=e.landing,G=e.attempt_id&&e.attempt_id===n,le=r.monitor||null,X=pb(le),F=le?Is(le.dependency_chips):"",I=_b(le,t,a,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),L=o&&e.workflow?.chips?.exec_receipt||null,U=Ds(e.workflow),H=Ms(e.rec),te=L?u`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Nn(L)}`}
        >${`${L.kind}:${ps(L)}`}</span
      >`:"",D=s?u`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${uo(s)}</span
      >`:"",K=X||U||D||te||H?u`<div class="rtile__meta">
          ${X}${U}${D}${te}${H}
        </div>`:"",W=l?u`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Pd(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?u`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",J=u`${A?u`<span class="worker-mini__badge">${A}</span>`:""}${T?u`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${T}</span
      >`:""}${W}`,Ce=o?"":Hr(e),ke=e.discard?.action&&!(i&&l?.landed===!0)?u`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"";return u`<div
    class="rtile${G?" rtile--sel":""}${a?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Ps(e.priority)}${p?u`<span class="rtile__resumed" title=${p}>↻</span>`:""}${J}
      <div class="rtile__hd-actions">
        ${o?u`${typeof e.started_at=="number"?u`<span class="rtile__elapsed">${c}</span>`:""}${gb(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:u`<span class="rtile__elapsed">${c}</span>`}
        ${o?"":i?u`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${ke}`:u`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${a?u`<button
                      type="button"
                      class="rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶
                    </button>`:u`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${ke}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${i?"":u`${I}${e.rollup?us(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Fi}):""}
          ${N?u`<div class="rtile__landing">
                <span
                  class="merge-step${N.failed?" merge-step--failed":""}"
                  style=${`--progress: ${N.percent}%`}
                  >${N.label}${N.index>0?u`<span class="merge-step__n"
                        >${N.index}/${N.total}</span
                      >`:""}</span
                >
              </div>`:""}
          ${F}
          ${o?K:X||U||d||H||g.length>0||_?u`<div class="rtile__meta">
                  ${X}${U}${Ls(e.exec_chips)}${H}
                  ${g.length>0?g.map(ie=>u`<span class="worker-usage" title=${ie.tooltip}
                            >${ie.label}</span
                          >`):_?u`<span
                          class="worker-usage"
                          title=${po(e.usage)}
                          >${_}</span
                        >`:""}
                </div>`:""}
          ${Ts(e)} ${Ce}
          <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
          ${i||a?"":u`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${db(l,t)}
  </div>`}function hb(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function jd(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return u`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?u`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Qa(o,t,n,{monitor:hb(o)}))}
  </div>`}var Xt="",bb=["impl_runtime","impl_model","impl_effort"],yb=["claude_account","codex_account"],vb=5,yi=1;function pn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function vi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(O=>be(O,"error",4e3)),s={},i={},l=[],a=!1,c={state:"absent",values:{},warnings:[]},d={},p={},g=Promise.resolve(),_={claude:null,codex:null},A=!1,T=null,N={},G="",le="",X=!1,F=!1,I=!1,L=null,U=!1;function H(){let O=t.queue?t.queue():null;return pn(O)?O:null}function te(){let O=H();return O?O.runner_catalog:null}function D(){let O=H();return O&&pn(O.execution_defaults)?O.execution_defaults:null}function K(){let O=t.implPresetStore?.get();return pn(O)&&Array.isArray(O.presets)?O:null}function W(){return r===null?{}:{root_dir:r}}async function J(O,oe){return U||!n?null:await n(O,oe)}function Ce(O){O&&pn(O.queue)&&t.onQueueAdopt?.(O.queue)}async function ke(O,oe){let we=H();if(!we||U)return null;let E=await J(O,{...oe,...W(),expected_revision:we.revision});if(Ce(E),r!==null&&E&&E.conflict){let V=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:H()?.revision??we.revision;E=await J(O,{...oe,...W(),expected_revision:V}),Ce(E)}return E}async function ie(){a=!0,Ge();try{let O=await J("get-session-defaults",{...W()});s=pn(O?.values)?{...O.values}:{},i={...s},l=Array.isArray(O?.warnings)?O.warnings:[]}catch(O){l=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${O instanceof Error?O.message:String(O)}`)}finally{a=!1,Ge()}}async function q(){let O=Cc(s,i);if(Object.keys(O).length!==0){try{let oe=await J("set-session-defaults",{values:O,...W()});s=pn(oe?.values)?{...oe.values}:{},i={...s},l=Array.isArray(oe?.warnings)?oe.warnings:[]}catch(oe){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${oe instanceof Error?oe.message:String(oe)}`)}Ge()}}function $e(O,oe){if(!pn(O))return;let we=O.state;c={state:we==="usable"||we==="unusable"||we==="absent"?we:"absent",values:pn(O.values)?{...O.values}:{},warnings:Array.isArray(O.warnings)?O.warnings:[]},p={...c.values},oe&&(d={...p})}async function Se(){try{$e(await J("get-workspace-accounts",{...W()}),!0)}catch(O){c={state:"unusable",values:{},warnings:["kv_read_failed"]},p={},d={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${O instanceof Error?O.message:String(O)}`)}Ge()}async function S(O){try{let oe=await fetch(O);if(!oe.ok)return null;let we=await oe.json();if(!pn(we)||!Array.isArray(we.accounts))return null;let E=we.accounts.filter(V=>pn(V)&&typeof V.key=="string"&&V.key.length>0&&typeof V.email=="string"&&V.email.length>0);return{accounts:E,active:E.find(V=>V.active===!0)||null}}catch{return null}}async function ee(){A=!0;let[O,oe]=await Promise.all([S("/api/claude-usage"),S("/api/codex-usage")]);U||(_={claude:O,codex:oe},Ge())}function Ee(){let O={};for(let oe of yb){let we=Object.hasOwn(d,oe)?d[oe]:null,E=Object.hasOwn(p,oe)?p[oe]:null;we!==E&&(O[oe]=we)}return O}async function ge(){let O=Ee();if(Object.keys(O).length!==0){try{$e(await J("set-workspace-accounts",{values:O,...W()}),!1)}catch(oe){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${oe instanceof Error?oe.message:String(oe)}`)}Ge()}}function xe(O,oe){oe===Xt?delete d[O]:d[O]=oe,Ge(),g=g.then(()=>ge())}function ye(O,oe){if(bb.includes(O)){B(O,oe);return}oe===Xt?delete i[O]:i[O]=oe,Ge(),q()}function Ne(){let O=Rt().orchestration_model,oe=fn({global:{orchestration_model:O??void 0},execution_defaults:D(),runner_catalog:te()}).orchestration_model.value;return oe?wn(te(),oe):null}function De(O,oe){typeof oe=="string"&&oe.length>0?i[O]=oe:delete i[O]}function B(O,oe){let we=oe===Xt?void 0:oe,E=Ec({impl_runtime:O==="impl_runtime"?we:i.impl_runtime,impl_model:O==="impl_model"?we:i.impl_model,impl_effort:O==="impl_effort"?we:i.impl_effort},te(),Ne());De("impl_runtime",E.impl_runtime),De("impl_model",E.impl_model),De("impl_effort",E.impl_effort),Ge(),q()}async function de(){let O=H();if(!O)return;let oe={orchestration_model:O.orchestration_model??null,orchestration_effort:O.orchestration_effort??null,orchestration_speed:O.orchestration_speed??null},we=Rc(oe,{...oe,...N});if(Object.keys(we).length!==0){try{let E=await ke("worker-queue-set-orchestration-defaults",{values:we});if(E&&E.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}N={}}catch(E){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}Ge()}}function re(O,oe){N[O]=oe===Xt?null:oe,Ge(),de()}function _e(O){if(T=O,!O){Ge();return}let oe=te(),we=Rt(),E=we.orchestration_model;E&&!go(oe,O).includes(E)&&(N.orchestration_model=null,E=null);let V=we.orchestration_effort;V&&!Vi(oe,O,E||mn).includes(V)&&(N.orchestration_effort=null),Ge(),de()}async function ve(O){if(!(!H()||O<yi)){try{await ke("worker-queue-set-slots",{slots:O})}catch(oe){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${oe instanceof Error?oe.message:String(oe)}`)}Ge()}}async function pe(O){if(!(!H()||O<yi||O>vb)){try{await ke("worker-queue-set-serial-lane-count",{count:O})}catch(oe){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${oe instanceof Error?oe.message:String(oe)}`)}Ge()}}async function qe(O,oe){let we=O==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await ke(we,{on:oe})}catch(E){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}Ge()}function Me(){let O={},oe=Rt();for(let we of jr){let E=Bn.includes(we)?oe[we]:i[we];typeof E=="string"&&E.length>0&&(O[we]=E)}return O}async function je(){let O=K();if(!O)return;let oe=Me();if(Object.keys(oe).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let we=(O.presets||[]).find(V=>V.id===G),E=le.trim()||(we?we.name:"");if(!E){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let V=we?await J("impl-preset-update",{expected_revision:O.revision,id:we.id,name:E,settings:oe}):await J("impl-preset-create",{expected_revision:O.revision,name:E,settings:oe});if(V&&V.applied){if(le="",!we&&Array.isArray(V.presets)){let Le=V.presets.find(Ve=>Ve.name===E);G=Le?Le.id:G}Ge()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ge()}catch(V){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}async function He(){let O=K();if(!(!O||G.length===0))try{let oe=await J("impl-preset-delete",{expected_revision:O.revision,id:G});oe&&oe.applied?(G="",Ge()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ge())}catch(oe){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${oe instanceof Error?oe.message:String(oe)}`)}}function pt(O){s=pn(O.values)?{...O.values}:{},i={...s},l=Array.isArray(O.warnings)?O.warnings:[],pn(O.queue)&&(t.onQueueAdopt?.(O.queue),N={})}async function Y(){let O=K(),oe=H();if(!O||!oe||G.length===0)return;let we=E=>({preset_id:G,expected_revision:O.revision,expected_queue_revision:E,...W()});try{let E=await J("apply-impl-preset-global",we(oe.revision));if(E&&E.applied&&pt(E),r!==null&&E&&E.queue_applied===!1){let V=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:H()?.revision??oe.revision;E=await J("apply-impl-preset-global",we(V)),E&&E.applied&&pt(E)}E&&E.applied?E.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):E&&E.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(E){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}Ge()}async function Q(){F=!0,I=!1,Ge();try{let O=await J("get-worker-system-prompt",{});!O||typeof O!="object"||Array.isArray(O)?I=!0:L=O}catch{I=!0}finally{F=!1,Ge()}}function v(){if(X=!X,X&&!L){Q();return}Ge()}function ne(){let O=Vr({loading:F,error:I});if(O)return O;if(!L)return"";let oe=Array.isArray(L.variants)?L.variants:[];return u`<div class="settings-dialog__sp-body">
      ${L.target_base_placeholder?u`<div class="prompt-block__meta">
            \`${L.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${oe.map(we=>u`<div class="settings-dialog__sp-variant" data-variant=${we.key}>
            <div class="settings-dialog__sp-cond">${we.condition}</div>
            ${Hn(we.label,we.system_prompt)}
          </div>`)}
    </div>`}function Te(){return u`<section
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
        aria-expanded=${X?"true":"false"}
        @click=${v}
      >
        ${X?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${X?ne():""}
    </section>`}function he(O,oe,we,E,V,Le,Ve){let Pe=V[O]??Xt,Xe=Qi(O,we,V,D(),te(),Ve),ot=Xe.options.find(tt=>tt.value===Pe),Ue=Pe===Xt?Xe.full_value:ot?.full_value;return u`<select
        class=${Pe===Xt?"settings-dialog__unset":""}
        data-key=${O}
        aria-label=${oe}
        title=${Ue||""}
        ?disabled=${Le===!0||Xe.disabled}
        .value=${yr(String(Pe))}
        @change=${tt=>E(O,String(tt.target.value))}
      >
        <option value=${Xt} ?selected=${Pe===Xt}>
          ${Xe.unset_label}
        </option>
        ${Xe.options.map(tt=>u`<option
              value=${tt.value}
              title=${tt.full_value||""}
              ?selected=${tt.value===Pe}
            >
              ${tt.label}
            </option>`)}
      </select>
      ${Pe===Xt?u`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Re(O,oe,we,E,V,Le=!1,Ve){return u`<div
      class=${`settings-dialog__row${Le?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${oe}</span>
      <span class="settings-dialog__controls">
        ${he(O,oe,we,E,V,Le,Ve)}
      </span>
    </div>`}function Be(O,oe){let we=oe?oe.active:null;return pn(we)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${O==="claude"?we.email:Xr({...we,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function ze(O,oe,we){let E=_[we],V=Object.hasOwn(d,O)?d[O]:Xt,Le=we==="claude"?ui:Xr,Ve=!!E?.accounts.some(Pe=>Pe.key===V);return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${oe}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${oe}
          data-account-key=${O}
          @change=${Pe=>xe(O,String(Pe.target.value))}
        >
          <option value=${Xt} ?selected=${V.length===0}>
            ${Be(we,E)}
          </option>
          ${V.length>0&&!Ve?u`<option value=${V} selected>
                ${V} (목록에 없음)
              </option>`:""}
          ${E?.accounts.map(Pe=>u`<option value=${Pe.key} ?selected=${Pe.key===V}>
                ${Le(Pe)}
              </option>`)||""}
        </select>
        ${E?"":u`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function it(){let O=c.warnings.join(", ");return c.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${O} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:c.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${O}`:null}function vt(O,oe,we,E,V){return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${oe}-on)`}
        ></i>
        ${O}
      </span>
      <span class="settings-dialog__controls">
        ${he(we,`${O} \uBAA8\uB378`,E,ye,i,!1)}
        ${he(V,`${O} effort`,ws,ye,i,!1)}
      </span>
    </div>`}function Nt(O,oe,we,E){return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${oe}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${E?" is-on":""}`}
          data-automation=${O}
          aria-pressed=${E?"true":"false"}
          aria-label=${oe}
          @click=${()=>qe(O,!E)}
        >
          ${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${we}</span>
      </span>
    </div>`}function Ft(O,oe,we,E){return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${oe}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${O}>
          <button
            type="button"
            aria-label=${`${oe} \uAC10\uC18C`}
            @click=${()=>E(we-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${we}</span>
          <button
            type="button"
            aria-label=${`${oe} \uC99D\uAC00`}
            @click=${()=>E(we+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function xt(O){return u`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${O.rows.length>0?`\uBCC0\uACBD ${O.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${O.rows.map(oe=>u`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${oe.kind}
          >
            <span class="settings-dialog__preset-diff-label">${oe.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${oe.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${oe.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${O.ignored_keys.length>0?u`<div class="settings-dialog__preset-diff-note">
            ${O.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Rt(){let O=H(),oe={};for(let we of Bn)oe[we]=Object.prototype.hasOwnProperty.call(N,we)?N[we]:O&&typeof O[we]=="string"?O[we]:null;return oe}function bt(){let O=te(),oe=i.impl_runtime,we=i.impl_model,E=K(),V=H(),Le=Rt(),Ve=go(O,T),Pe=Br(O,void 0).filter(ct=>ct!==mn),Xe=Vi(O,T,Le.orchestration_model||mn).filter(ct=>ct!==mn),ot=G?(E?.presets||[]).find(ct=>ct.id===G):null,Ue=ot?Tc(Me(),pn(ot.settings)?ot.settings:{}):null,tt=V&&typeof V.slots=="number"?V.slots:yi+1,wt=V&&typeof V.serial_lane_count=="number"?V.serial_lane_count:yi,Ke=D()?.supported===!0,kt=it(),Ye=Qi("workflow_mode",_o,i,D(),O);return u`
      ${l.length>0?u`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${kt?u`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${kt}
          </div>`:""}
      ${Ke?"":u`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${a?u`<div class="settings-dialog__empty">불러오는 중…</div>`:u`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${yr(G)}
                @change=${ct=>{G=String(ct.target.value),Ge()}}
              >
                <option value="" ?selected=${G===""}>
                  실행 프리셋…
                </option>
                ${(E?.presets||[]).map(ct=>u`<option
                      value=${ct.id}
                      ?selected=${ct.id===G}
                    >
                      ${ct.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Ue||Ue.rows.length===0}
                @click=${Y}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${G?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${yr(le)}
                @input=${ct=>{le=String(ct.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${G?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${je}
              >
                ${G?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${G.length===0}
                @click=${He}
              >
                삭제
              </button>
            </div>
            ${Ue?xt(Ue):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${yr(T||Xt)}
                    @change=${ct=>{let Ot=String(ct.target.value);_e(Ot===Xt?null:Ot)}}
                  >
                    <option value=${Xt} ?selected=${!T}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${T==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${T==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Re("orchestration_model","\uBAA8\uB378",Ve,re,Le)}
              ${Re("orchestration_effort","effort",Xe,re,Le)}
              ${Re("orchestration_speed","\uC18D\uB3C4",fo,re,Le)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${ze("claude_account","Claude","claude")}
              ${ze("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Xt}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>ye("workflow_mode",Xt)}
                    >
                      ${Ye.unset_label}
                    </button>
                    ${i.workflow_mode?"":u`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${_o.map(ct=>u`<button
                          type="button"
                          data-mode=${ct}
                          aria-pressed=${String(i.workflow_mode===ct)}
                          @click=${()=>ye("workflow_mode",ct)}
                        >
                          ${ct}
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
              ${vt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",mo,"spec_review_effort")}
              ${vt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",vs,"plan_review_effort")}
              ${vt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",mo,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Re("impl_runtime","\uC704\uC784 \uB300\uC0C1",ys,ye,i)}
              ${Re("impl_model","\uBAA8\uB378",Br(O,oe),ye,i)}
              ${Re("impl_effort","effort",Ur(O,oe,we),ye,i)}
              ${Re("impl_speed","\uC18D\uB3C4",fo,ye,i)}
              ${Re("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Pe,ye,i,!1,{...i,...Le})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Nt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",V?.auto_advance===!0)}
              ${Nt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",V?.auto_merge===!0)}
              ${Ft("slots","\uB3D9\uC2DC \uC2E4\uD589",tt,ct=>ve(ct))}
              ${Ft("serial-lane-count","\uC9C1\uB82C \uB808\uC778",wt,ct=>pe(ct))}
            </div>
            ${Te()}
          `}
    `}function Ge(){U||lt(bt(),e)}return{load(){N={};let O=[ie(),Se()];return A||O.push(ee()),Promise.all(O).then(()=>{})},render:Ge,sessionDraft:()=>({...i}),destroy(){U=!0,lt(u``,e)}}}function wi(e){return u`<svg
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
  </svg>`}function Bd(){return wi(oo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ud(){return wi(oo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Wd(){return wi(oo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function zd(){return wi(oo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Hd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Gd(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Qt(hs(t));let n={};for(let l of In)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let c=!1;for(let d of In){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,c=!0)}if(c){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Fn(n):null}function En(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Xa(e,t){let n=En(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function wb(e,t){if(!En(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function kb(e){if(!En(e)||!En(e.execution_defaults)||!En(e.runner_catalog)||!En(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=fn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=wn(e.runner_catalog,n.orchestration_model.value??""),o=Wr(n,e.runner_catalog),s=zr(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function Kd(e,t){let n=t.notify||(S=>be(S,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let c=null,d=null,p=null,g=new Map;function _(){let S=t.workspacesState?t.workspacesState():[];return Array.isArray(S)?S.filter(ee=>En(ee)):[]}function A(S){return _().find(ee=>ee.root_dir===S)||null}function T(S){return wb(A(S),g.get(S))}function N(){for(let S of _()){let ee=g.get(S.root_dir);ee&&typeof ee.revision=="number"&&typeof S.revision=="number"&&S.revision>=ee.revision&&g.delete(S.root_dir)}}async function G(S,ee,Ee){let ge=t.transport,xe=T(ee);if(!(!ge||!En(xe))){try{let ye=await ge(S,{...Ee,root_dir:ee,expected_revision:xe.revision});if(En(ye?.queue)&&g.set(ee,ye.queue),ye&&ye.conflict){let Ne=En(ye.queue)&&typeof ye.queue.revision=="number"?ye.queue.revision:T(ee)?.revision;ye=await ge(S,{...Ee,root_dir:ee,expected_revision:Ne}),En(ye?.queue)&&g.set(ee,ye.queue)}}catch(ye){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ye instanceof Error?ye.message:String(ye)}`)}q()}}function le(S){c!==S&&(c=S,t.onFocusChange?.(c),q())}function X(S){le(c===S?null:S)}function F(S){if(d===S){L();return}I(),d=S;let ee=A(S);i.textContent=`${ee?.name||S} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=vi(a,{root_dir:S,queue:()=>T(S),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Ee=>{g.set(S,Ee),q()}}),p.load(),q()}function I(){p?.destroy(),p=null}function L(S){I(),d=null,o.hidden=!0,i.textContent="",S!==!0&&q()}let U=()=>L();l.addEventListener("click",U);function H(S){S.key==="Escape"&&c!==null&&le(null)}document.addEventListener("keydown",H);function te(S,ee){let Ee=Math.max(ee,S,1);return u`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ee}\uAC1C \uC911 ${S}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Ee},(ge,xe)=>xe<S?u`<i class="mon2-deck__slot is-run"></i>`:u`<i class="mon2-deck__slot"></i>`)}
    </span>`}function D(S){let ee=S.auto_advance===!0,Ee=S.auto_merge===!0;return u`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ee?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ee?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9\uD654`}
        title=${ee?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ee?Ud():Bd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Ee?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Ee?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Ee?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Wd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===S.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===S.root_dir?"true":"false"}
        aria-label=${`${S.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${zd()}
      </button>`}function K(S){let ee=kb(S);return ee?u`<div class="mon2-deck__chips">
      ${ee.orchestration?u`<span class="mon2-deck__chip" title=${ee.orchestration.title}
            >오케 ${ee.orchestration.text}</span
          >`:""}
      ${ee.worker?u`<span class="mon2-deck__chip" title=${ee.worker.title}
            >워커 ${ee.worker.text}</span
          >`:""}
    </div>`:""}function W(S){let ee=[];for(let[Ee,ge]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let xe=Xa(S,Ee);xe>0&&ee.push(`${ge} ${xe}`)}return ee.join(" \xB7 ")}function J(S){let ee=Xa(S,"running"),Ee=typeof S.slots=="number"?S.slots:1;return u`<div
      class=${`mon2-deck__tile${c===S.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${S.root_dir}
      aria-pressed=${c===S.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${S.root_dir}>${S.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Ee}\uAC1C \uC911 ${ee}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ee}/${Ee}</span>
          ${te(ee,Ee)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${S.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${D(S)}</div>
        <span class="mon2-deck__counts">${W(S)}</span>
        ${K(S)}
      </div>
    </div>`}function Ce(S){let ee=t.doneItems?t.doneItems():[],Ee=t.rangeLabel?t.rangeLabel():"",ge=Gd(Array.isArray(ee)?ee:[]),xe=ye=>S.reduce((Ne,De)=>Ne+Xa(De,ye),0);return u`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${S.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Ee}`}
        >실행 ${xe("running")} · 대기 ${xe("queue")} · PR
        ${xe("pr_wait")}${xe("session_active")>0?` \xB7 \uC138\uC158 ${xe("session_active")}`:""}
        · ${Ee} 완료
        ${Array.isArray(ee)?ee.length:0}</span
      >
      ${ge===null?"":u`<span class="mon2-deck__total-tokens">
            ${typeof ge=="string"?u`<span
                  class="mon2-deck__tok"
                  title=${Hd(Ee)}
                  >${ge}</span
                >`:ge.map(ye=>u`<span
                      class="mon2-deck__tok"
                      data-provider=${ye.provider}
                      title=${ye.tooltip}
                      >${ye.label}</span
                    >`)}
          </span>`}
    </div>`}function ke(){let S=_();return S.length===0?"":u`${Ce(S)}
      <div class="mon2-deck__strip">
        ${S.map(ee=>J(ee))}
      </div>`}function ie(){c!==null&&!A(c)&&(c=null,t.onFocusChange?.(null))}function q(){N(),ie(),d!==null&&!A(d)&&L(!0),lt(ke(),r),p?.render()}function $e(S){let ee=S.target;if(!ee||typeof ee.closest!="function")return;let Ee=ee.closest("[data-root-dir]");if(!Ee)return;let ge=Ee.getAttribute("data-root-dir")||"",xe=ee.closest("[data-act]")?.getAttribute("data-act");if(xe==="worker"){t.gotoWorkerTab?.(ge);return}if(xe==="auto"){G("worker-automation-toggle",ge,{on:T(ge)?.auto_advance!==!0});return}if(xe==="merge"){G("worker-merge-auto-toggle",ge,{on:T(ge)?.auto_merge!==!0});return}if(xe==="gear"){F(ge);return}X(ge)}function Se(S){if(S.key!=="Enter"&&S.key!==" ")return;let ee=S.target;if(!ee||typeof ee.closest!="function")return;let Ee=ee.closest('[data-root-dir][role="button"]');!Ee||Ee!==ee||(S.preventDefault(),X(Ee.getAttribute("data-root-dir")||""))}return r.addEventListener("click",$e),r.addEventListener("keydown",Se),{render:q,focusRoot:()=>c,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",H),r.removeEventListener("click",$e),r.removeEventListener("keydown",Se),l.removeEventListener("click",U),I(),lt(u``,r),e.replaceChildren()}}}var Yd="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",$b=1e4;function Vd(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Qd(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var ep="bdui.monitor.done-range",tp="bdui.monitor.running_sort",np="bdui.monitor.candidate_sort",rp="beads-ui.monitor.candidate-filter",op="beads-ui.monitor.sections";function xb(){try{let e=window.localStorage.getItem(rp);if(!e)return{...Gr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Gr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Gr.show_blocked,spec:ua.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Gr}}}function Xd(e){try{window.localStorage.setItem(rp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Ab(){try{let e=window.localStorage.getItem(np);return xo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Sb(e){try{window.localStorage.setItem(np,e)}catch{}}function Eb(){try{let e=window.localStorage.getItem(op);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Tb(e){try{window.localStorage.setItem(op,JSON.stringify(e))}catch{}}function Cb(){try{let e=window.localStorage.getItem(ep);return e===null?"today":On(e)}catch{return"today"}}function Rb(e){try{window.localStorage.setItem(ep,e)}catch{}}function Ob(){try{return window.localStorage.getItem(tp)==="repo"?"repo":"started"}catch{return"started"}}function Lb(e){try{window.localStorage.setItem(tp,e)}catch{}}var sp="tab:monitor:pipeline",Ib=1e3,Zd=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Db=["queue","runnable","done"],Jd="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Mb(e){return e>=1&&e<=Jd.length?Jd[e-1]:`(${e})`}function ip(e,t){let n=Ct("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,c=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(h=>typeof globalThis.confirm!="function"||globalThis.confirm(h)),g=Cb(),_=Ob(),A=xb(),T=Ab(),N=Eb(),G=_i("beads-ui.monitor.lane-collapsed"),le=!1,X=null,F=null,I=null,L=null,U=null,H=null,te=null,D=null,K=null;function W(h){return K===null&&(K=de()),_u(h,K)}function J(h,b){Ce(),!(b<=0)&&(te={lane_id:h,corrected:b},D=setTimeout(()=>{D=null,te=null,Ye()},$b))}function Ce(){D!==null&&(clearTimeout(D),D=null),te=null}function ke(){let h=Sr.find(b=>b.value===g);return h?h.label:""}let ie=document.createElement("div");ie.className="mon",e.appendChild(ie);let q=document.createElement("div");q.className="worker-drawer-overlay",q.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let Se=document.createElement("div");Se.className="worker-drawer-host mon2-drawer",q.append($e,Se),e.appendChild(q);let S=tr(null,null),ee=new Map,Ee=new Map,ge=null,xe=null,ye=null,Ne=Qr(Se,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{F=null,q.hidden=!0,Ye()}}),De=gi({transport:s,console_el:ie,getLanes:()=>S,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:It,reproject:h=>({lanes:kt(h),raw_lanes:h}),onCorrection:J,showToast:be,requestRender:()=>Ye(),adoptQueue:(h,b)=>{Ee.set(h,b)},onDragBegin:()=>{I=null}}),{applyDrop:B,dropModel:de,runPlanned:re,sendQueueCas:_e}=De;async function ve(h,b,R,M,m=!0){if(!s||!R)return null;let w=await s(h,{...b,root_dir:R,expected_revision:M});if(w&&w.conflict&&m){w.queue&&Ee.set(R,w.queue);let z=w.queue&&typeof w.queue.revision=="number"?w.queue.revision:M;w=await s(h,{...b,root_dir:R,expected_revision:z})}return w&&w.queue&&R&&Ee.set(R,w.queue),w}function pe(h,b){let R=Ee.get(h),M=o&&o.get?o.get():null,m=(Array.isArray(M)?M:[]).find(z=>z?.root_dir===h);return(R||m)?.merge_queue?.find(z=>z.bead_id===b)?.continuation_action}async function qe(h,b,R,M){let m=await ve(h,b,R,M),w=Ee.get(R)?.revision??m?.queue?.revision??M;return qn(m,(z,ce)=>ve(h,{...b,continuation:z,decision_token:ce},R,w,!1),{refresh:z=>ve(h,b,R,z?.queue?.revision??Ee.get(R)?.revision??w,!1)})}async function Me(h,b,R,M){let m=await qn({continuation_mismatch:M},(z,ce)=>ve("worker-merge-queue-add",{bead_id:b,continuation:z,decision_token:ce},h,R,!1)),w=m?.queue?.merge_queue?.find(z=>z.bead_id===b)?.continuation_action;m?.applied!==!0&&w?.continuation===null&&w.mismatch&&await Me(h,b,m.queue.revision,w.mismatch)}async function je(h,b,R){let M=await ve("worker-discard",h,b,R);if(M&&M.discarded===!0){be(Os(M),"success",5e3);return}if(M&&M.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${M.reason}`,"error");return}if(M&&M.accepted&&M.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(M&&M.accepted){be(`\uD3D0\uAE30 \uC9C4\uD589: ${M.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}M&&!M.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function He(h,b,R){return!s||!R?null:await s(h,{...b,root_dir:R})}async function pt(){let h=new Map;for(let b of S.pr_wait)h.has(b.root_dir)||h.set(b.root_dir,b.expected_revision);for(let[b,R]of h)await ve("worker-merge-queue-add-all",{},b,R)}function Y(h){let b=N[h];return!!(b&&b.runnable===!0)}function Q(h){let b={...N[h]||{}};b.runnable=!b.runnable,N={...N,[h]:b},Tb(N),Ye()}function v(h){G.toggle(h),Ye()}function ne(h){G.toggleArea(h),Ye()}function Te(h){let b=S.queue_groups.find(R=>R.root_dir===h);if(!b)return null;for(let R=0;R<b.serial_lane_count;R+=1){let M=`s${R+1}`,m=b.sublanes.serial.find(w=>w.id===M);if(!m||m.raw_length===0&&m.occupied_by.length===0)return M}return null}function he(h,b){let R=S.queue_groups.find(m=>m.root_dir===h),M=R?R.sublanes.serial.find(m=>m.id===b):void 0;return M?M.raw_length:0}function Re(h,b){let R=ee.get(h),M=ee.get(b);if(!R||!M)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let m=Vd(R),w=Vd(M);if(m!==null&&m===w&&R.root_dir===M.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let z=Qd(R),ce=Qd(M);if(z&&w!==null){let Ie=w;return{kind:"ops",title:`${Ie} \uB05D\uC5D0 ${h}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:M.root_dir,ops:[{bead_id:h,lane:Ie,index:he(M.root_dir,Ie)}]}}if(m!==null&&ce&&w===null){let Ie=m;return{kind:"ops",title:`${Ie} \uB05D\uC5D0 ${b}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:R.root_dir,ops:[{bead_id:b,lane:Ie,index:he(R.root_dir,Ie)}]}}if(z&&m===null&&ce&&w===null){let Ie=Te(R.root_dir);return Ie===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Ie} \uB808\uC778\uC5D0 ${b} \u2192 ${h} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:R.root_dir,ops:[{bead_id:b,lane:Ie,index:0},{bead_id:h,lane:Ie,index:1}]}}return!z&&!ce?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:z?{kind:"note",text:`${Ho(M.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Ho(R.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Be(h,b){let R=Re(h,b.id);return{id:b.id,title:b.title,location_label:b.location_label,prefixes:b.prefixes,action:R.kind==="note"?{kind:"note",text:R.text}:R.kind==="disabled"?{kind:"disabled",label:Yd,title:R.title}:{kind:"place",label:Yd,title:R.title}}}function ze(h,b){if(!L||L.bead_id!==h)return null;let R=L.counterpart_id,M=b.filter(m=>m.id===R);return M.length===0?null:{rows:M.map(m=>Be(h,m))}}function it(h){let b=h.dependency_chips||null,R=h.overlap_chips||[],M=h.scope_state==="missing",m=h.cross_lane_chip,w=h.armed_lane_chip;if(!b&&R.length===0&&!M&&!m&&!w)return null;let z=ze(h.id,R);return{...b||{},...R.length>0?{overlaps:R}:{},...M?{scope_missing:!0}:{},...m?{cross_lane:{lane_id:m.lane_id,label:m.label}}:{},...w?{armed_lane:w}:{},...z?{popover:z}:{}}}function vt(h){let b=it(h);return b?{...h,dependency_chips:b}:h}async function Nt(h,b){let R=Re(h,b);if(L=null,R.kind!=="ops"){Ye();return}let M=Zt(R.root_dir,R.ops[0].bead_id);for(let m of R.ops){let w=await Ft(m,R.root_dir,M);if(w===null)break;M=w}Ye()}async function Ft(h,b,R){try{let M=await ve("worker-queue-place",h,b,R,!1);if(M&&M.conflict)return be("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!M||M.applied!==!0)return be(M&&typeof M.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${M.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let m=M.queue?M.queue.revision:void 0;return typeof m!="number"?(be("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):m}catch(M){return be(Kt(M),"error"),null}}function xt(h){let b=Y(h.root_dir);return u`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${h.root_dir}
        data-section="runnable"
        aria-expanded=${b?"false":"true"}
        aria-label=${`${h.name} \uC139\uC158 ${b?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${b?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${h.root_dir}>${h.name}</span>
      <span class="mon2-sec__count">${h.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${h.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Rt(h,b){return u`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="candidate"
      data-root-dir=${h.root_dir}
    >
      ${b}
    </div>`}function bt(h){if(I!==h.id)return null;let b=S.queue_groups.find(w=>w.root_dir===h.root_dir),R=h.place_lanes||[],M=S.cross_lanes_revision!==null,m=[{id:"parallel",label:"\uBCD1\uB82C",count:h.place_index??0}];for(let w of S.chain_lanes)m.push({id:`lane:${w.lane_id}`,label:`\uC5F0\uACB0 ${w.number} (${w.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:w.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!M});m.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!M,title:M?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let w of R)m.push({id:`serial:${w.id}`,label:`\uC9C1\uB82C ${Number(w.id.slice(1))}`,count:w.length,group:`${b?b.name:""} \uC9C1\uB82C`});return{bead_id:h.id,lanes:m}}function Ge(h){return Rt(h,u`${sa(vt(h),bt(h),{exec_chips_mode:"pinned_only",onOpenDoc:l?(b,R)=>l(R,h.root_dir):void 0})}`)}function O(){return S.runnable_flat?u`<div class="mon2-flat" data-drop="candidate">
        ${S.runnable.map(h=>Ge(h))}
      </div>`:u`${S.runnable_sections.map(h=>{let b=Y(h.root_dir);return u`<section
        class="mon2-sec${b?" is-collapsed":""}"
        data-root-dir=${h.root_dir}
        data-section="runnable"
      >
        ${xt({root_dir:h.root_dir,name:h.name,count:h.items.length})}
        ${b?"":u`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${h.items.map(R=>Ge(R))}
            </div>`}
      </section>`})}`}function oe(h,b=!1){return u`<span class="worker-mini__rowops">
      ${b?u`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${h.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${h.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${h.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function we(h,b){return u`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="parallel"
      data-root-dir=${h.root_dir}
      data-row-index=${b}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${kn(vt(h),{actions:oe(h,!0)})}
    </div>`}function E(h,b,R,M){return u`<div
      class="mon2-crow${b.fixed?" mon2-crow--fixed":""}"
      draggable=${b.draggable?"true":"false"}
      data-bead-id=${b.id}
      data-drag-kind="chain"
      data-root-dir=${b.root_dir}
      data-lane-id=${h.lane_id}
      data-row-index=${R}
      data-queue-index=${typeof b.queue_index=="number"?String(b.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Mb(b.seq)}</span
      >
      ${b.workspace_name?u`<span class="worker-mini__repo" title=${b.root_dir}
            >${b.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${b.id}</span>
      <span class="mon2-crow__title">${b.title}</span>
      ${b.mismatch?u`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${M.includes(b.id)?u`<span
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
    </div>`}function V(h){let b=S.cross_lanes_revision!==null,R=W(h.lane_id),M=R?.held===!0,m=R?.cycle===!0,w=R?R.mismatched:[],z=te&&te.lane_id===h.lane_id?te.corrected:0;return u`<div class="mon2-clane" data-lane-id=${h.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${h.label}</span>
        <span class="mon2-clane__count">${h.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${h.state}"
          >${h.badge}</span
        >
        ${z>0?u`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${z}건 자동 교정</span
            >`:""}
        ${m?u`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${M?u`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Gs}</span
            >`:""}
        ${h.draft?u`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${h.lane_id}
              ?disabled=${!b||!h.can_confirm||M}
              title=${M?Gs:h.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${h.run_label!==null?u`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${h.lane_id}
              ?disabled=${!b}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${h.run_label}
            </button>`:""}
        ${h.state==="confirmed"&&h.has_mismatch?u`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${h.lane_id}
              ?disabled=${!b}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${h.can_stop?u`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${h.lane_id}
              ?disabled=${!b}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${h.lane_id}
          ?disabled=${!b}
          title=${h.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${h.lane_id}
      >
        ${h.rows.length===0?u`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:h.rows.map((ce,Ie)=>E(h,ce,Ie,w))}
      </div>
    </div>`}function Le(h,b,R){return u`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="repo-serial"
      data-root-dir=${b.root_dir}
      data-lane-id=${h.id}
      data-row-index=${R}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${kn(vt(b),{actions:oe(b)})}
    </div>`}function Ve(h){if(h.length===0)return"";let b=h.length-1;return`${h[0].id} \uC810\uC720${b>0?` +${b}`:""}`}function Pe(h){return u`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${h.id}
    >
      ${kn({id:h.id,title:h.title,lane:"running",draggable:!1,ghost:!0,badges:[h.badge]})}
    </div>`}function Xe(h,b){let R=b.occupants,M=b.cross_wait_peers||[];return{id:b.id,pane_id:"",title:`${h.name} \xB7 \uC9C1\uB82C ${b.index+1}`,rows:[...R.map(m=>Pe(m)),...b.items.map((m,w)=>Le(b,m,w))],count:b.items.length,empty:b.empty===!0,...R.length>0?{badge:u`<span
              class="mon2-lane__occupant"
              title=${R.map(m=>`${m.id} \u2014 ${m.badge}`).join(`
`)}
              >${Ve(R)}</span
            >`,held:!0}:{},cycle:b.cycle,header_control:u`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${h.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...M.length>0?{after:u`${M.map(m=>u`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${m.workspace_name}·${m.lane}과 교차 대기
                </div>`)}`}:{}}}function ot(){let h=S.cross_lanes_revision!==null,b=S.chain_lanes.some(R=>R.draft&&R.rows.length===0);return qs({parallel:{rows:S.parallel_rows.map((R,M)=>we(R,M)),count:S.parallel_rows.length,collapsed:G.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:S.queue_groups.flatMap(R=>R.sublanes.serial.map(M=>({...Xe(R,M),drop:{drop:"repo-serial",root_dir:R.root_dir,lane_id:M.id,lane_length:String(M.raw_length)}}))),collapsed:G.isAreaCollapsed("serial"),extra_panes:S.chain_lanes.map(R=>V(R)),header_control:u`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${b||!h}
          title=${h?b?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...S.cross_lanes_unreadable?{notice:u`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function Ue(h){return u`<div class="worker-rungrid">
      ${S.running.length===0?u`<div class="worker-rungrid__empty">실행 세션 없음</div>`:S.running.map(b=>Qa({bead_id:b.id,attempt_id:b.attempt_id||"",title:b.title,runner:b.runner??null,model:b.model??null,effort:b.effort??null,speed:b.speed??null,started_at:b.started_at??null,kind:b.kind,...b.kind==="session"?{updated_at:b.updated_at,session_refs:b.session_refs||[]}:{},workflow:b.workflow||null,resumed_from:b.resumed_from??null,continuation_mode:b.continuation_mode??null,paused:b.run_state==="paused",failed:b.run_state==="failed",status:b.status,status_label:b.run_state==="failed"?"\uC2E4\uD328":void 0,can_pause:b.can_pause!==!1,exec_chips:b.exec_chips||null,usage:b.usage||null,discard:b.discard,failure:b.failure?{...b.failure,open:U===b.attempt_id}:null},h,F,{monitor:{repo:b.workspace_name,root_dir:b.root_dir,serial_lane_id:b.serial_lane_id,last_activity:b.last_activity||null,legs:b.legs||[],dependency_chips:it(b)}}))}
    </div>`}function tt(h){let b={runnable:S.runnable,queue:S.queue,running:S.running,pr_wait:S.pr_wait,done:S.done},R=M=>{let m=b[M.lane],w=M.lane==="runnable"?S.runnable_flat?m.length>0?O():void 0:S.runnable_sections.length>0?O():void 0:M.lane==="queue"?S.queue_groups.length>0||S.chain_lanes.length>0||S.parallel_rows.length>0||S.cross_lanes_unreadable?ot():void 0:M.lane==="running"?Ue(h):m.length>0?u`${m.map(z=>kn(vt(z)))}`:void 0;return Dn({id:`monitor-${M.lane}`,lane:M.pane,title:M.title,items:m,count:m.length,src:M.lane==="runnable",empty:M.empty,body:w,live:M.lane==="running"&&m.length>0,collapsible:!0,collapsed:G.isCollapsed(M.pane),controls:M.lane==="runnable"?wt():void 0,header_control:Ke(M.lane,m.length)})};if(le){let M=Db.map(m=>Zd.find(w=>w.lane===m)).filter(m=>m!==void 0);return u`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Fs({live:S.running.length>0,running_body:S.running.length>0?Ue(h):"",pr_wait_rows:S.pr_wait.map(m=>kn(vt(m))),count:S.running.length+S.pr_wait.length})}
            ${M.map(m=>R(m))}
          </div>
        </div>`}return u`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Zd.map(M=>R(M))}
        </div>
      </div>`}function wt(){return u`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${A.show_blocked}
        />
        🔒
        blocked${S.runnable_hidden.blocked>0?` ${S.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ua.map(h=>u`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${A.spec===h.value?" is-active":""}"
              data-spec=${h.value}
              aria-pressed=${A.spec===h.value?"true":"false"}
            >
              ${h.label}
            </button>`)}
        ${S.runnable_hidden.spec>0?u`<span class="worker-filter__hidden"
              >숨김 ${S.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Ke(h,b){return h==="runnable"?u`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${T}
      >
        ${xo.map(R=>u`<option
              value=${R.value}
              ?selected=${T===R.value}
            >
              ${R.label}
            </option>`)}
      </select>`:h==="running"?u`<select
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
      </select>`:h==="pr_wait"&&b>0?u`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:h==="done"?u`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Sr.map(R=>u`<option value=${R.value} ?selected=${g===R.value}>
              ${R.label}
            </option>`)}
      </select>`:""}function kt(h){let b=o&&o.get?o.get():null,R=o&&o.getWorkspacesState?o.getWorkspacesState():[],M=h===void 0?o&&o.crossLanes?o.crossLanes():void 0:h,m={done_since:dr(g,d()),running_sort:_,candidate_filter:A,candidate_sort:T};return M!==void 0&&(m.cross_lanes=M),tr(b,R,m)}function Ye(){let h=d();S=kt(),K=null,ee=new Map;for(let b of[...S.runnable,...S.queue,...S.running,...S.pr_wait,...S.done])!b.non_occupying&&!ee.has(b.id)&&ee.set(b.id,b);lt(tt(h),ie),Ot()?.render(),ct(),At()}function ct(){let h=new Map;for(let b of S.queue_groups)h.set(b.root_dir,b.auto_advance);for(let b of Array.from(ie.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let R=b.closest(".mon2-item")?.getAttribute("data-root-dir")||"",M=h.get(R);typeof M=="boolean"&&b.setAttribute("title",`${b.textContent||""} \xB7 ${M?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ot(){if(ye)return ye;let h=ie.querySelector(".mon2-deck");return h?(ye=Kd(h,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>S.done,rangeLabel:ke,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:Gt,onFocusChange:b=>{H=b,At()}}),ye):null}function At(){ie.classList.toggle("has-focus",H!==null);for(let h of Array.from(ie.querySelectorAll(".mon2-sec[data-root-dir]")))h.classList.toggle("is-focus",H!==null&&h.getAttribute("data-root-dir")===H);for(let h of Array.from(ie.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let b=ee.get(h.getAttribute("data-bead-id")||"");h.classList.toggle("is-focus",H!==null&&!!b&&b.root_dir===H)}for(let h of Array.from(ie.querySelectorAll(".mon2-crow[data-root-dir]")))h.classList.toggle("is-focus",H!==null&&h.getAttribute("data-root-dir")===H)}function Tt(h,b){let R=i?i():void 0;if(!b||!R||b===R||!a){r(h);return}a(b).then(()=>{r(h)}).catch(M=>{n("workspace switch for %s failed: %o",b,M)})}function Gt(h){if(!h)return;let b=i?i():void 0,R=()=>{try{c?.gotoView("worker")}catch(M){n("gotoView(worker) failed: %o",M)}};if(!a||b&&b===h){R();return}a(h).then(R).catch(M=>{n("workspace switch for %s failed: %o",h,M),be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function cn(h){nn(h).then(b=>{be(b?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",b?"success":"error",1400)})}function Lt(h){let b=ee.get(h)||null;return{item:b,root_dir:b?b.root_dir:"",revision:b?b.expected_revision:0}}function Kt(h){if(typeof h=="string"&&h.length>0)return h;if(h&&typeof h=="object"){let b=h;if(typeof b.message=="string"&&b.message.length>0)return b.message;if(typeof b.error=="string"&&b.error.length>0)return b.error;if(b.error&&typeof b.error=="object"&&typeof b.error.message=="string")return b.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function jt(h,b,R){if(h!=="dep-add")return;let M=S.chain_lanes.find(m=>m.rows.some(w=>w.id===b));!M||!M.rows.some(m=>m.id===R)||await re(m=>vu(M.lane_id,m),"",[{type:h,a:b,b:R}])}function It(){return(o&&o.crossLanes?o.crossLanes():null)??null}function Zt(h,b){let R=ee.get(b);if(R&&R.root_dir===h)return R.expected_revision;let M=S.queue_groups.find(m=>m.root_dir===h);return M?M.revision:0}async function Yt(h,b){if(h==="run"){await un(b);return}if(h==="stop"){await y(b);return}if(h==="create"){await re(R=>ma(null,R),"");return}if(h==="remove"){let R=ku(b,de());if(R!==null&&!p(R))return;await re(M=>wu(b,M),"");return}await re(R=>h==="confirm"?bu(b,R):yu(b,R),"")}function zt(h){let b=new Map;for(let R of h.rows){let M=S.owner_of[R.id]||R.root_dir;typeof M!="string"||M.length===0||b.set(M,[...b.get(M)||[],R.id])}return b}async function un(h){let b=S.chain_lanes.find(w=>w.lane_id===h);if(!b||S.cross_lanes_revision===null){Ye();return}Ce();let R=new Map,M=new Map,m=zt(b);for(let w of b.rows){if(!w.unplaced)continue;let z=S.owner_of[w.id]||w.root_dir;if(typeof z!="string"||z.length===0){be(`${w.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Ye();return}let ce=M.get(z)??0;if(await _e("worker-queue-place",{bead_id:w.id,lane:"parallel",index:(S.parallel_raw_length[z]??0)+ce},z,R,{bead_id:w.id})===null){Ye();return}M.set(z,ce+1)}for(let[w,z]of m)if(await _e("worker-queue-arm",{bead_ids:z,lane_id:h},w,R,{bead_id:z[0]})===null){be("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Ye();return}Ye()}async function y(h){let b=S.chain_lanes.find(M=>M.lane_id===h);if(!b||S.cross_lanes_revision===null){Ye();return}Ce();let R=new Map;for(let[M,m]of zt(b))if(await _e("worker-queue-disarm",{lane_id:h},M,R,{bead_id:m[0]})===null)break;Ye()}async function f(h,b){let{root_dir:R,revision:M}=Lt(h);if(R.length===0){Ye();return}await _e("worker-queue-disarm",{bead_ids:[h],lane_id:b},R,new Map([[R,M]]),{bead_id:h}),Ye()}async function j(h,b){let R=ee.get(h);if(!R){Ye();return}let M={kind:"candidate",bead_id:h,root_dir:R.root_dir};if(b==="new-lane"){await re(m=>ma({bead_id:h,root_dir:R.root_dir},m),h);return}if(b.startsWith("lane:")){let m=b.slice(5);if(!S.chain_lanes.find(z=>z.lane_id===m)){Ye();return}await re(z=>Ys(M,{kind:"chain",lane_id:m,marker_index:(z.cross_lanes.get(m)?.entries??[]).length},z),h);return}if(b.startsWith("serial:")){let m=b.slice(7),w=(R.place_lanes||[]).find(z=>z.id===m);await B(M,{kind:"repo-serial",root_dir:R.root_dir,lane_id:m,index:w?w.index:0});return}await B(M,{kind:"parallel",marker_index:S.parallel_rows.length})}async function ue(h,b){let R=S.parallel_rows,M=R.findIndex(k=>k.id===h);if(M<0)return;let m=R[M].root_dir,w=[];R.forEach((k,$)=>{k.root_dir===m&&w.push($)});let z=w.indexOf(M),ce=w[z+b];if(typeof ce!="number")return;let Ie=b===-1?ce:w[z+2]??Math.min(R.length,ce+1);await B({kind:"parallel",bead_id:h,root_dir:m,queue_index:R[M].queue_index??0},{kind:"parallel",marker_index:Ie})}async function ae(h){for(let b of S.chain_lanes){let R=b.rows.find(M=>M.id===h);if(R){await B({kind:"chain",bead_id:h,root_dir:R.root_dir,lane_id:b.lane_id,...typeof R.queue_index=="number"?{queue_index:R.queue_index}:{}},{kind:"parallel",marker_index:S.parallel_rows.length});return}}}function We(h){return{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,status:h.run_state==="running"?"running":h.run_state,worktree:h.root_dir}}function at(h,b){let{item:R,root_dir:M,revision:m}=Lt(b),w=R?.attempt_id||"",z=h.classList;if(z.contains("worker-mini__rowops-up")||z.contains("worker-mini__rowops-down")){ue(b,z.contains("worker-mini__rowops-up")?-1:1);return}if(z.contains("worker-mini__rowops-remove")){ve("worker-queue-remove",{bead_id:b},M,m);return}if(z.contains("mon2-crow__detach")){ae(b);return}if(z.contains("worker-dep__open")){Tt(h.getAttribute("data-dep-id")||"",h.getAttribute("data-root-dir")||"");return}if(z.contains("mon2-arm__release")){f(b,h.getAttribute("data-lane-id")||"");return}if(z.contains("mon-lane__chip")){let ce=h.getAttribute("data-lane-id")||"";ie.querySelector(`.mon2-clane[data-lane-id="${ce}"]`)?.scrollIntoView({block:"nearest"});return}if(z.contains("mon-overlap__chip")){let ce=h.getAttribute("data-overlap-id")||"";L=!!L&&L.bead_id===b&&L.counterpart_id===ce?null:{bead_id:b,counterpart_id:ce},Ye();return}if(z.contains("mon-overlap__place")){Nt(b,h.getAttribute("data-counterpart-id")||"");return}if(z.contains("rtile__failure-badge")){U=U===w?null:w,Ye();return}if(z.contains("rtile__attempt-copy")){let ce=h.getAttribute("data-attempt-id")||"";ce&&nn(ce).then(Ie=>{be(Ie?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ie?"success":"error",1400)});return}if(z.contains("worker-card__place")){I=I===b?null:b,Ye();return}if(z.contains("worker-card__place-cancel")){I=null,Ye();return}if(z.contains("worker-card__place-lane")){let ce=h.getAttribute("data-lane")||"parallel";I=null,j(b,ce);return}if(z.contains("rtile__session")){if(R&&R.kind==="session"){let ce=(R.session_refs||[]).find(Ie=>Ie&&Ie.current===!0);ce&&(q.hidden=!1,Ne.open(Nr(ce,b,"in_progress",M)),Ye());return}F=w,w&&R&&(q.hidden=!1,Ne.open({attempt_id:w,root_dir:M,meta:We(R)})),Ye();return}if(z.contains("rtile__pause")){He("worker-attempt-pause",{attempt_id:w},M);return}if(z.contains("rtile__resume")){Pr().then(ce=>{if(ce!==null)return qe("worker-attempt-resume",{attempt_id:w,...ce!==""?{instructions:ce}:{}},M,m)});return}if(z.contains("rtile__discard")){let ce=h.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(vo(b,ce)))return;je({bead_id:b,...w?{attempt_id:w}:{},...h.dataset.operationId?{operation_id:h.dataset.operationId}:{}},M,m);return}if(z.contains("worker-mini__merge")){let ce=pe(M,b);ce?.mismatch&&ce.continuation===null?Me(M,b,m,ce.mismatch):ve("worker-merge-queue-add",{bead_id:b},M,m);return}if(z.contains("worker-mini__merge-cancel")){ve("worker-merge-queue-remove",{bead_id:b},M,m);return}if(z.contains("worker-mini__discard")){let ce=h.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(vo(b,ce)))return;je({bead_id:b,...h.dataset.attemptId?{attempt_id:h.dataset.attemptId}:{},...h.dataset.operationId?{operation_id:h.dataset.operationId}:{}},M,m);return}if(z.contains("worker-mini__revise-fix")){qe("worker-revise-fix",{bead_id:b},M,m);return}z.contains("worker-mini__revise-approve")&&ve("worker-revise-approve",{bead_id:b},M,m)}function ut(h){let b=De.consumeClickSuppression(),R=h.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest(".worker-drawer-overlay")||R.closest("a"))return;let M=R.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(M){h.preventDefault();let Fe=R.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||M.textContent?.trim()||"";Fe&&cn(Fe);return}let m=R.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(m){h.preventDefault();let fe=m.getAttribute("data-root-dir")||ee.get(R.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||m.getAttribute("title")||"";Gt(fe);return}let w=R.closest(".mon2-sec__toggle");if(w){h.preventDefault(),Q(w.getAttribute("data-root-dir")||"");return}let z=R.closest(".worker-pane__toggle[data-lane]");if(z){h.preventDefault();let fe=z.getAttribute("data-lane")||"";(fe==="candidate"||fe==="queue"||fe==="running"||fe==="pr_wait"||fe==="done")&&v(fe);return}let ce=R.closest(".worker-wait__area-toggle[data-area]");if(ce){h.preventDefault(),ne(ce.getAttribute("data-area")||"parallel");return}if(R.closest(".mon2-newlane")){h.preventDefault(),Yt("create","");return}let Ie=R.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ie){h.preventDefault();let fe=Ie.getAttribute("data-lane-id")||"",Fe=Ie.classList;Yt(Fe.contains("mon2-clane__confirm")?"confirm":Fe.contains("mon2-clane__reapply")?"reapply":Fe.contains("mon2-clane__run")?"run":Fe.contains("mon2-clane__stop")?"stop":"remove",fe);return}if(R.closest(".mon-merge-all")){h.preventDefault(),pt();return}let k=R.closest(".mon-filter__spec");if(k){h.preventDefault(),A={...A,spec:k.getAttribute("data-spec")||"all"},Xd(A),Ye();return}let $=R.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!$)return;let C=$.getAttribute("data-bead-id")||"",se=R.closest("button");if(se){h.preventDefault(),at(se,C);return}R.closest(".rtile__failure-pop")||C&&!b&&(h.preventDefault(),Tt(C,$.getAttribute("data-root-dir")||Lt(C).root_dir))}function st(h){let b=h.target;if(!b||typeof b.closest!="function")return;let R=b.closest(".mon-filter__blocked");if(R){A={...A,show_blocked:R.checked},Xd(A),Ye();return}let M=b.closest(".mon-candidate-sort");if(M){T=xo.some(z=>z.value===M.value)?M.value:"repo_spec",Sb(T),Ye();return}let m=b.closest(".mon-running-sort");if(m){_=m.value==="repo"?"repo":"started",Lb(_),Ye();return}let w=b.closest(".mon-done-range");w&&(g=On(w.value),Rb(g),Ye())}function _t(h){let b=h.target,R=b&&typeof b.closest=="function"?m=>b.closest(m):()=>null,M=!1;L&&!R(".mon-overlap__popover, .mon-overlap__chip")&&(L=null,M=!0),U&&!R(".rtile__failure-pop, .rtile__failure-badge")&&(U=null,M=!0),M&&Ye()}function gt(h){h.key!=="Escape"||!L&&U===null||(L=null,U=null,Ye())}e.addEventListener("click",ut),e.addEventListener("change",st),document.addEventListener("click",_t),document.addEventListener("keydown",gt),De.attach(e);{let h=!0;X=fi(b=>{if(le=b,h){h=!1;return}Ye()})}o&&typeof o.subscribe=="function"&&(ge=o.subscribe(()=>{try{Ee.clear(),Ye()}catch{}}));function ht(){xe!==null&&(clearInterval(xe),xe=null)}return{recorrectSharedLane:jt,load(){n("load"),Ye(),xe===null&&(xe=setInterval(()=>{try{Ye()}catch{}},Ib))},pause(){ht()},clear(){ht(),De.detach(),ge&&(ge(),ge=null),X&&(X(),X=null),Ne.destroy(),q.hidden=!0,ye?.destroy(),ye=null,e.removeEventListener("click",ut),e.removeEventListener("change",st),document.removeEventListener("click",_t),document.removeEventListener("keydown",gt),e.replaceChildren()}}}function ap(e,t,n){let r=Ct("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(g){return _=>{_.preventDefault();let A=g==="monitor"&&a()==="monitor"?"worker":g;r("click tab %s",A),n.gotoView(A)}}function a(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function c(){let g=a();return u`
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
    `}function d(){let g=a();return u`
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
    `}function p(){o&&lt(c(),o),s&&lt(d(),s)}return p(),i=t.subscribe(()=>p()),{destroy(){i&&(i(),i=null),o&&lt(u``,o),s&&lt(u``,s)}}}var lp=["bug","feature","task","epic","chore"];function cp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var up=["Critical","High","Medium","Low","Backlog"];function dp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),c=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function _(){s.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",s.appendChild(I);for(let L of lp){let U=document.createElement("option");U.value=L,U.textContent=cp(L),s.appendChild(U)}i.replaceChildren();for(let L=0;L<=4;L+=1){let U=document.createElement("option");U.value=String(L);let H=up[L]||"Medium";U.textContent=`${L} \u2013 ${H}`,i.appendChild(U)}}_();function A(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function T(I){o.disabled=I,s.disabled=I,i.disabled=I,l.disabled=I,a.disabled=I,d.disabled=I,p.disabled=I,p.textContent=I?"Creating\u2026":"Create"}function N(){c.textContent=""}function G(I){c.textContent=I}function le(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?s.value=I:s.value="";let L=window.localStorage.getItem("beads-ui.new.priority");L&&/^\d$/.test(L)?i.value=L:i.value="2"}catch{s.value="",i.value="2"}}function X(){let I=s.value||"",L=i.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),L.length>0&&window.localStorage.setItem("beads-ui.new.priority",L)}async function F(){N();let I=String(o.value||"").trim();if(I.length===0){G("Title is required"),o.focus();return}let L=Number(i.value||"2");if(!(L>=0&&L<=4)){G("Priority must be 0..4"),i.focus();return}let U=String(s.value||""),H=String(a.value||""),te={title:I};U.length>0&&(te.type=U),String(L).length>0&&(te.priority=L),H.length>0&&(te.description=H),T(!0);try{await t("create-issue",te)}catch{T(!1),G("Failed to create issue");return}X(),T(!1),A()}return n.addEventListener("cancel",I=>{I.preventDefault(),A()}),g.addEventListener("click",()=>A()),d.addEventListener("click",()=>A()),n.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),F())}),r.addEventListener("submit",I=>{I.preventDefault(),F()}),{open(){r.reset(),N(),le();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){A()}}}var Pb=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Nb(e,t){return Ni(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function pp(e,t,n){return u`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?u`<div class="settings-dialog__empty">라벨 없음</div>`:u`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=Nb(r,e);return u`<button
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
  `}function fp(e,t,n){return u`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>u`<span class="settings-dialog__prefix">
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
  `}function _p(e,t){return u`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Pb.map(([n,r])=>u`<label class="settings-dialog__toggle">
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
  `}var qb=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function mp(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(J=>be(J,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,c="",d=null;function p(){if(d)return d;let J=i.querySelector('[data-pane="execution"]');return J?(d=vi(J,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Ce=>t.queueStore?.set?.(Ce)}),d):null}function g(){return u`
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
    `}function _(){let J=r.get();return u`
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
        ${J?u`
              ${pp(J,o(),G)}
              ${fp(J,c,{onDraft:Ce=>{c=Ce},onAdd:le,onRemove:X})}
              ${_p(J,F)}
            `:u`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function A(J){let Ce=r.get();if(Ce)try{let ke=await n("display-policy-set",{expected_revision:Ce.revision,policy:J(Ce)});T(ke),ke&&ke.conflict&&ke.policy&&(ke=await n("display-policy-set",{expected_revision:ke.policy.revision,policy:J(ke.policy)}),T(ke)),ke&&ke.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function T(J){J&&J.policy&&typeof J.policy=="object"&&r.set(J.policy)}function N(J){A(J)}function G(J){let Ce=r.get();if(!Ce)return;let ke=!Fb(J,Ce);N(ie=>jb(J,ie,ke))}function le(){let J=c.trim();J.length!==0&&(c="",N(Ce=>Ce.hidden_prefixes.includes(J)?{hidden_prefixes:Ce.hidden_prefixes}:{hidden_prefixes:[...Ce.hidden_prefixes,J]}),I())}function X(J){N(Ce=>({hidden_prefixes:Ce.hidden_prefixes.filter(ke=>ke!==J)}))}function F(J){let Ce=r.get();if(!Ce)return;let ke=Ce.chips[J]===!1;N(()=>({chips:{[J]:ke}}))}function I(){lt(u`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${qb.map(J=>u`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${J.id}
                  aria-selected=${String(l===J.id)}
                  aria-controls=${`settings-pane-${J.id}`}
                  @click=${()=>L(J.id)}
                >
                  <span class="settings-dialog__glyph">${J.glyph}</span>
                  ${J.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${W}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${g()} ${_()}
          </div>
        </div>
      `,i),p()}function L(J){l=J,I()}let U=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",U),i.addEventListener("cancel",U);let H=J=>{J.target===i&&W()};i.addEventListener("click",H);let te=null;r.subscribe&&(te=r.subscribe(()=>{a&&I()}));let D=null;t.implPresetStore?.subscribe&&(D=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function K(J="execution"){a||(a=!0,t.onOpenChange?.(!0),l=J,c="",I(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),p()?.load())}function W(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:K,close:W,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",U),i.removeEventListener("cancel",U),i.removeEventListener("click",H),te&&(te(),te=null),D&&(D(),D=null),d?.destroy(),d=null,i.remove()}}}function Fb(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function jb(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Bb=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],gp="usage-meter-card",Ub="usage-meter-layer",Za=600,Wb=["token_expired","relogin_required"];function hp(e){return String(e).padStart(2,"0")}function zb(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function bp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${hp(r.getHours())}:${hp(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${Bb[r.getMonth()]} ${r.getDate()} ${s}`;return`${zb(n,t)} \xB7 ${l}`}function Hb(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function yp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function vp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var wp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function $p(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Gb(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:$p(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Kb(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=Gb(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?$p(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Yb(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Kb(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function xp(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Vb(e,t){return!e.held||xp(e,t)<=Za?e:{...e,available:!1,windows:[],accounts:[]}}function kp(e,t){return`${e}:${t}`}function Ap(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function c(){lt(u``,e),e.hidden=!0,p()}function d(){if(a===null){let ie=e.ownerDocument;a=ie.createElement("div"),a.id=Ub,a.className="usage-meter__layer",ie.body.appendChild(a)}return a}function p(){a!==null&&(lt(u``,a),a.remove(),a=null)}function g(ie){n!==ie&&(n===null&&(document.addEventListener("mousedown",A),document.addEventListener("keydown",N),window.addEventListener("resize",T)),n=ie)}function _(){n!==null&&(n=null,document.removeEventListener("mousedown",A),document.removeEventListener("keydown",N),window.removeEventListener("resize",T))}function A(ie){let q=ie.target;q&&(e.contains(q)||a!==null&&a.contains(q))||(_(),W())}function T(){W()}function N(ie){ie.key==="Escape"&&(_(),W())}function G(ie){n===ie?_():g(ie),W()}function le(){_(),W()}async function X(ie,q){if(r.has(ie.key))return;let $e=kp(ie.key,q);r.set(ie.key,q),i.delete($e),W();let Se=null;try{Se=await(await fetch(ie.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:q})})).json()}catch{Se=null}if(t)return;if(r.delete(ie.key),!Se||Se.ok!==!0){let ee=Se&&typeof Se.error=="string"&&Se.error.length>0?Se.error:"network_error";i.set($e,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ee}`}),W();return}let S=Array.isArray(Se.warnings)?Se.warnings.filter(ee=>typeof ee=="string"&&ee.length>0):[];S.length>0&&i.set($e,{kind:"warn",text:S.join(" \xB7 ")}),W(),await ke()}function F(ie,q,$e,Se){let S=vp(ie.pct),Ee=`resets ${bp(ie.resetsAt,Se)}${q?` \xB7 ${$e}`:""}`;return u`<span
      class="usage-meter__window ${yp(S)}"
      style=${`--progress: ${S}%`}
      title=${Ee}
    >
      <span class="usage-meter__label">${ie.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${S}%</span>
    </span>`}function I(ie,q,$e){let Se=xp(q,$e),S=q.available&&(q.held||Se>Za),ee=S?`${Math.floor(Se/60)}\uBD84 \uC804 \uCE21\uC815`:"",Ee=q.accounts.filter(Ne=>!Ne.active).length,ge=`usage-meter__group${S?" usage-meter__group--stale":""}`,xe=u`<span class="usage-meter__provider"
        >${ie.label}</span
      >
      ${q.available?q.windows.map(Ne=>F(Ne,S,ee,$e)):u`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Ee>0?u`<span class="usage-meter__badge">+${Ee}</span>`:""}`;if(q.accounts.length===0)return u`<span
        class=${ge}
        aria-label=${`${ie.label} usage`}
        >${xe}</span
      >`;let ye=n===ie.key;return u`<button
      type="button"
      class=${`usage-meter__toggle ${ge}`}
      aria-label=${`${ie.label} usage`}
      aria-expanded=${ye?"true":"false"}
      aria-controls=${gp}
      @click=${()=>G(ie.key)}
    >
      ${xe}
    </button>`}function L(ie,q){return u`<span class="usage-meter" aria-label="Usage">
      ${ie.map($e=>I($e.provider,$e.snapshot,q))}
    </span>`}function U(ie,q){let $e=vp(ie.pct),Se=bp(ie.resetsAt,q);return u`<span
      class="usage-meter__account-window ${yp($e)}"
      style=${`--progress: ${$e}%`}
    >
      <span class="usage-meter__account-key">${ie.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${$e}%</span>
      <span class="usage-meter__account-reset"
        >${Se.length>0?`\u21BB ${Se}`:""}</span
      >
    </span>`}function H(ie,q){return Wb.includes(q)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ie.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function te(ie,q,$e){let Se=q.status==="ok",S=typeof q.ageSeconds=="number"&&q.ageSeconds>Za,ee=i.get(kp(ie.key,q.number)),Ee=r.get(ie.key),ge=Ee!==void 0,xe=Ee===q.number,ye=["usage-meter__account"];return q.active&&ye.push("usage-meter__account--active"),Se||ye.push("usage-meter__account--unavailable"),S&&ye.push("usage-meter__account--stale"),u`<div class=${ye.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${q.email}
          >${q.alias===null?q.email:q.alias}</span
        >
        ${q.plan===null?"":u`<span class="usage-meter__account-tag">${q.plan}</span>`}
        ${q.active?u`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${q.ageSeconds===null?"":u`<span class="usage-meter__account-age"
              >${Hb(q.ageSeconds)}</span
            >`}
        ${q.active?"":u`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ge}
              @click=${()=>{X(ie,q.number)}}
            >
              ${xe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Se?u`<div class="usage-meter__account-windows">
            ${q.windows.map(Ne=>U(Ne,$e))}
          </div>`:u`<div class="usage-meter__account-status">
            ${H(ie,q.status)}
          </div>`}
      ${ee===void 0?"":u`<div
            class="usage-meter__account-message usage-meter__account-message--${ee.kind}"
          >
            ${ee.text}
          </div>`}
    </div>`}function D(ie,q,$e){let Se=q.accounts.filter(S=>S.active).length;return u`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ie.label} · 활성 ${Se} / 전체
        ${q.accounts.length}
      </h2>
      ${q.accounts.map(S=>te(ie,S,$e))}
    </section>`}function K(ie,q){return u`<div
      class="usage-meter__card"
      id=${gp}
      role="dialog"
      aria-label=${`${ie.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${D(ie.provider,ie.snapshot,q)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function W(){let ie=Date.now(),q=[];for(let Se of wp){let S=s.get(Se.key);S&&q.push({provider:Se,snapshot:Vb(S,ie)})}if(q.length===0){_(),c();return}let $e=q.find(Se=>Se.provider.key===n&&Se.snapshot.accounts.length>0);$e||_(),lt(L(q,ie),e),e.hidden=!1,$e?J($e,ie):p()}function J(ie,q){let $e=d(),Se=e.getBoundingClientRect(),S=e.ownerDocument.documentElement.clientWidth;$e.style.setProperty("--usage-meter-anchor-top",`${Se.bottom}px`),$e.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,S-Se.right)}px`),lt(u`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${le}
        ></div>
        ${K(ie,q)}`,$e)}async function Ce(ie){try{let q=await fetch(ie.endpoint);return q.ok?Yb(await q.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function ke(){l+=1;let ie=l,q=await Promise.all(wp.map(async $e=>({provider:$e,read:await Ce($e)})));if(!(t||ie!==l)){for(let $e of q){let Se=$e.provider.key;if($e.read.kind==="ok"){s.set(Se,$e.read.snapshot);continue}if($e.read.kind==="empty"){s.delete(Se);continue}let S=s.get(Se);S!==void 0&&!S.held&&s.set(Se,{...S,held:!0})}W()}}return c(),ke(),o=setInterval(()=>{ke()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),_(),c()}}}var Qb="worker-ineligible";function Go(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Sp(e){return Go(e).includes(Qb)}var Xb="worker-serial";function Ep(e){return Go(e).includes(Xb)}var Rp="bdui.worker.candidate_sort",Ko=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),ki=Object.freeze({preset:"spec"}),Op=3,Lp=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Tp(e){return Ko.some(t=>t.id===e)}function Cp(e){let t=Ko.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Zb(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function Yo(e){return e&&"preset"in e?Cp(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Cp("spec")}function Ja(e){return e&&"preset"in e?e.preset:null}function wr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return Tp(e)?{preset:e}:ki}return wr(s)}if(!e||typeof e!="object")return ki;let t=e;if(Tp(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Op||!n.every(Ii))return ki;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=Ko.find(s=>Zb(s.chain,r));return o?{preset:o.id}:{chain:r}}function Ip(){try{return wr(window.localStorage.getItem(Rp))}catch{return ki}}function el(e){try{window.localStorage.setItem(Rp,JSON.stringify(e))}catch{}}function Dp(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(os,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:os[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,Op)}function Mp(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Pp(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(ql(Yo(t))),n}var Np=new Set(["sh","bash","zsh","dash","ksh"]),qp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Fp(e){let t=e.split("/");return t[t.length-1]||""}function Jb(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Fp(n[0]);if(r!=="env")return Np.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&Np.has(Fp(o))}function ey(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function ty(e){let t=[],n=0;qp.lastIndex=0;for(let r of e.matchAll(qp)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:ey(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function ny(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function jp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,c=null,d=!1;function p(I,L){return L?ty(I).map(U=>U.kind==="plain"?U.text:u`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${U.kind}"
            >${U.text}</span
          >`):I}function g(){if(!o)return u``;let I=s==="ready"&&Jb(i),L=s==="ready"?i.split(`
`):[];return u`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>X()}
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
              @click=${()=>{A()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>X()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${s==="loading"?u`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:s==="error"?u`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:u`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${L.map((U,H)=>u`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${H+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(U,I)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function _(){lt(g(),r)}async function A(){if(s!=="ready")return;let I=await nn(i);be(I?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",I?"success":"error")}function T(I){I.key==="Escape"&&o&&(I.preventDefault(),X())}function N(){d||(document.addEventListener("keydown",T),d=!0)}function G(){d&&(document.removeEventListener("keydown",T),d=!1)}async function le(I,L=null){let U=++a;N(),o={...I},c=L||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",_(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let te=t?t():"";if(!te){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",_();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",_();return}let D="/api/repo-ops-script?workspace="+encodeURIComponent(te)+"&lane="+encodeURIComponent(I.lane)+"&base_sha="+encodeURIComponent(I.base_sha);try{let K=await n(D),W=await K.json().catch(()=>({}));if(U!==a)return;if((t?t():"")!==te){X();return}if(!K.ok||!W||W.ok!==!0){s="error",l=ny(W&&typeof W.error=="string"?W.error:""),_();return}o={lane:W.lane,base_sha:W.base_sha,path:W.path,base_ref:W.base_ref},i=String(W.content),s="ready",_()}catch{if(U!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",_()}}function X(){a+=1,G(),o=null,i="",_();let I=c;c=null,I?.isConnected&&I.focus()}function F(){X(),r.remove()}return{open:le,close:X,destroy:F}}var Bp={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},ry=new Set(["queued","running","retry_pending"]);function Up(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let D=s();return typeof D.revision=="number"?D.revision:0}function l(D){t&&D&&D.queue&&typeof D.queue=="object"&&t.set(D.queue)}function a(){let D=s().workspace_info;return D&&typeof D=="object"?D:{}}function c(D,K){return u`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${D}"
      >${K}</span
    >`}function d(D){if(typeof D!="number"||!Number.isFinite(D))return"";let K=D/6e4;return Number.isInteger(K)?`timeout ${K}\uBD84`:`timeout ${Math.round(D/1e3)}\uCD08`}function p(D){let K=d(D);return K?c("config",K):""}function g(D,K,W){return u`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${W.script}
      @click=${J=>{o&&o({lane:D,base_sha:K.base_sha,path:W.script,base_ref:K.base_ref},J.currentTarget)}}
    ></button>`}function _(){let D=s().repo_operations;return Array.isArray(D)?D:[]}function A(){let D=a().repo_ops,K=D&&typeof D=="object"?D.repo_id:null;return typeof K=="string"&&K?K:null}function T(){return _().some(D=>D&&D.kind==="deploy"&&ry.has(D.state))}function N(){let D=T(),K=A()===null;return u`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${D||K}
      title=${D?"\uBC30\uD3EC \uC9C4\uD589 \uC911":K?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{L()}}
    >
      배포 실행
    </button>`}function G(){let D=s().repo_ops_opt_out;return{verify:D?.verify===!0,deploy:D?.deploy===!0}}function le(D,K){return u`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!K}
        @change=${W=>{I(D,!W.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function X(D){let K=typeof D.base_sha=="string"?D.base_sha:"",W=`${D.source_path||"repo-ops/config.toml"} @ ${D.base_ref||"?"}${K?`@${K.slice(0,7)}`:""}`,J=G(),Ce=!!D.verify&&J.verify,ke=!!D.deploy&&J.deploy;return u`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${W}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Ce?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${D.verify?u`${g("verify",D,D.verify)}
              ${p(D.verify.timeout_ms)}
              ${Ce?c("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:u`선언 없음${c("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ce?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":D.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${D.verify?le("verify",J.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ke?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${D.deploy?u`${g("deploy",D,D.deploy)}
              ${p(D.deploy.timeout_ms)}
              ${ke?c("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):N()}`:u`선언 없음${c("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ke?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":D.deploy?u`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${D.deploy?le("deploy",J.deploy):""}
      </div>
    </section>`}function F(D){let K=D.repo_ops&&typeof D.repo_ops=="object"?D.repo_ops:null;return K&&(K.status==="resolved"||K.status==="absent")?X(K):K&&(K.status==="pending"||K.status==="error")?u`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${K.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":u`선언 읽기
              실패${K.error_code?u` — <code>${K.error_code}</code>`:""}`}
        </div>
      </section>`:u`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function I(D,K){if(!n)return;let W=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:K,expected_revision:i()});if(l(W),W&&W.conflict){let J=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:K,expected_revision:i()});l(J)}r()}async function L(){let D=A();if(!n||D===null)return;let K=await n("worker-repo-operation-deploy-run",{repo_id:D});if(l(K),!K||K.ok!==!0){let W=K&&typeof K.reason=="string"?K.reason:"",J=Object.hasOwn(Bp,W)?Bp[W]:W||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";be(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${J}`,"error")}else be("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let U={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function H(D,K,W){return u`<div class="worker-repo-ops__policy-group" data-policy=${W}>
      <div class="worker-repo-ops__policy-label">${D}</div>
      <ul class="worker-repo-ops__policy-list">
        ${K.map(J=>u`<li data-token=${J}>
              ${U[J]||J}
            </li>`)}
      </ul>
    </div>`}function te(){let D=s(),K=D.repo_operation_policy&&typeof D.repo_operation_policy=="object"?D.repo_operation_policy:null;return K?u`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(K.worker_automatic||[]).length} · 금지
            ${(K.never_automatic||[]).length}</span
          >
        </summary>
        ${K.supported===!1?u`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${K.schema_version})`}
            </div>`:""}
        ${H("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",K.worker_automatic||[],"worker-automatic")}
        ${H("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",K.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return u`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${F(a())} ${te()}
      </details>`}}}var Hp=20,oy=5,sy=new Set(["failed","running","queued","retry_pending"]),Wp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function iy(e,t,n=Hp){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function ay(e){if(e.type==="cleanup")return!0;let t=e.operation;return sy.has(t.state)&&!t.dismissed&&!t.superseded_by}function ly(e,t,n={}){let r=iy(e,t,1/0),o=n.expanded===!0?Hp:oy,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||ay(l));return{visible:i,hidden:r.length-i.length}}function zp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function cy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Gp(e){let t=e.filter(n=>n.value);return t.length===0?"":u`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Es(n.value):n.value;return u`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function Kp(e,t="",n=!1){return!e&&!t?"":u`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?u`<br />${t}`:""}
  </p>`}function uy(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function dy(e,t){let n=qd(e,t),r=Fd(e);return!n&&!r?"":u`<p class="worker-ev__why">
    ${n?u`<span class="worker-ev__why-line">${n}</span>`:""}${r?u`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function py(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":u`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function fy(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return u`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${Rs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${zp(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Wp,n.kind)?Wp[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${Cs(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${mr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${zp(e)}"
          >${cy(e)}</span
        >
        ${n.dismissed?u`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?u`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?u`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?Kp(Nd(n.failure_kind,o)):""}
      ${dy(n,uy(t,n))}
      ${py(n)}
      ${Gp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Cs(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function _y(e){let t=e.cleanup,n=gr(t.step);return u`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${Rs(e.at)||"\u2014"}</span
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
        ${ru(t.step).map(r=>u`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Kp(Zr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${Gp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function my(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return u`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?u`<div class="worker-repo-drawer__empty">기록 없음</div>`:u`<ul class="worker-rail">
          ${e.events.map(r=>r.type==="cleanup"?_y(r):fy(r,e.repo_ops))}
        </ul>`}
    ${t>0||n?u`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function Yp(e,t={}){let n=null;function r(){if(n===null){lt(u``,e);return}let i=ly(n.operations,n.cleanup_failures,{expanded:n.expanded});lt(my({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var gy="session-preferred",hy=["exclusive_machine","iterative_user_judgment","visual_verification"];function Vp(e,t){if(!Go(e).includes(gy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&hy.includes(n)?n:""}var by=Ct("views:worker:adapter"),yy="tab:worker:ready",vy="tab:worker:blocked",wy="tab:worker:in-progress",ky="tab:worker:resolved",$y="tab:worker:closed",xy="\u{1F512} blocked",Ay={revision:0,auto_advance:!1,auto_merge:!1,slots:zs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Sy=["claude_account","codex_account"],Ey=[...jr,...Sy];function Ty(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Cy(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}function Ry(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Ns}: ${n}`:Ns}function kr(e){return e&&typeof e=="object"?e:{}}function Oy(e){let t={};for(let n of Ey){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Ly(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function Qp(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Lr(n):null,l=new Map,a={},c=null,d=0,p=null,g=!1;function _(){g||!s||s()}function A(L){return c===L?a:{}}async function T(){if(!r||g)return;let L=o?.()||"";if(c===L||p&&p.key===L&&p.generation===d)return;let U=++d;p={key:L,generation:U};let H=null;try{H=await Promise.resolve(r("get-session-defaults",{}))}catch(te){if(U!==d)return;p=null,by("get-session-defaults failed: %o",te),_();return}U===d&&(a=H&&typeof H.values=="object"&&H.values!==null?{...H.values}:{},c=L,p=null,_())}function N(){c=null,d+=1,T()}function G(){for(let[L,U]of l)U==="failed"&&l.delete(L)}function le(L,U){return i?i.selectBoardColumn(L,U):[]}function X(L,U,H,te){let D=Array.isArray(L.queue)?L.queue:[],K=new Set([...D.map(q=>q.bead_id),...(Array.isArray(L.serial_lanes)?L.serial_lanes:[]).flatMap(q=>(Array.isArray(q?.entries)?q.entries:[]).map($e=>$e.bead_id)),...(Array.isArray(L.pr_wait)?L.pr_wait:[]).map(q=>q.bead_id),...(Array.isArray(L.done)?L.done:[]).map(q=>q.bead_id)]),W=new Set(H.map(q=>q.id)),J=new Set,Ce=[];for(let q of[...U,...H])K.has(q.id)||J.has(q.id)||Ty(q)||(J.add(q.id),Ce.push(q));let ke=Pp(Ce,wr(te)),ie=kr(L.bead_scope);return ke.map(q=>{let $e=Rr(q),Se=$e.evidence==="published",S=typeof q.workflow?.route=="string"&&q.workflow.route||(q.metadata&&typeof q.metadata.route=="string"?q.metadata.route:""),ee=S==="quick_fix",Ee=!Object.hasOwn(q,"description")||typeof q.description=="string"&&q.description.trim().length>0,ge=Object.hasOwn(q,"labels")&&Sp(q.labels),xe=ge||!Object.hasOwn(q,"labels")?"":Vp(q.labels,q.metadata),ye=q.metadata&&typeof q.metadata=="object"?Object.hasOwn(q.metadata,"awaiting_user"):!1,Ne=!ge&&!ye&&(ee?Ee:Se&&!$e.conflict),De=W.has(q.id),B=De?Cy(q):[],de=[];De&&B.length===0&&de.push(xy),ye&&de.push(Ry(q.metadata)),ee&&!Ee?de.push("missing_description"):!ee&&$e.conflict?de.push("spec_id_conflict"):!ee&&$e.evidence==="none"?de.push("spec \uC5C6\uC74C"):!ee&&$e.evidence==="draft"&&de.push("spec \uBBF8\uBC1C\uD589(draft)");let re=ie[q.id];return{bead_id:q.id,title:q.title||q.id,route:S,spec_id:$e.conflict?"":$e.path,published:Se,blocked:De,blocked_by:B,labels:Array.isArray(q.labels)?q.labels:[],created_at:q.created_at,updated_at:q.updated_at,status:q.status,workflow:q.workflow||null,exec_pins:Oy(kr(q.metadata)),rec:null,...re&&Array.isArray(re.scope)?{scope:re.scope}:{},eligible:Ne,reason:de.join(" \xB7 "),worker_ineligible:ge,session_preferred:xe.length>0,session_preferred_reason:xe,release_info:q.release_info,dependents_info:q.dependents_info}})}function F(L){let[U,H,te,D,K]=L,W=as([...U,...H,...te,...D,...K]),J={},Ce=(ke,ie)=>{if(!ke||typeof ke.id!="string"||ke.id.length===0)return;let q=J[ke.id]||(J[ke.id]={});if(typeof ke.priority=="number"&&!("priority"in q)&&(q.priority=ke.priority),typeof ke.from_id=="string"&&!("from_id"in q)&&(q.from_id=ke.from_id),ie&&!("metadata"in q)){q.metadata=kr(ke.metadata);let $e=kr(ke.workflow).route;typeof $e=="string"&&$e.length>0&&(q.route=$e)}};for(let ke of[...U,...H,...te])Ce(ke,!0);for(let ke of[...D,...K])Ce(ke,!1);for(let ke of new Set([...Object.keys(J),...W.keys()])){let ie=ls(W,ke);if(ie.total>0){let q=J[ke]||(J[ke]={});q.rollup=ie}}return J}function I(L,U,H,te){let D=new Set((Array.isArray(L.done)?L.done:[]).map(W=>W?.bead_id).filter(W=>typeof W=="string")),K=[];for(let W of U){let J=Yn(W.closed_at);if(typeof W.id!="string"||D.has(W.id)||J===null||te!==void 0&&J<te||typeof W.comment_count!="number"||W.comment_count<=0)continue;let Ce=`${H}\0${W.id}\0${String(W.updated_at)}\0${W.comment_count}`,ke=l.get(Ce);if(ke===void 0&&r&&(l.set(Ce,"pending"),Promise.resolve(r("get-comments",{id:W.id})).then(q=>{let $e=Array.isArray(q)&&q.some(Se=>ai(typeof Se?.text=="string"?Se.text:"")?.lane==="session");l.set(Ce,$e?"session":"not-session"),_()}).catch(()=>{l.set(Ce,"failed"),_()})),ke!=="session")continue;let ie=Yn(W.started_at);K.push({id:W.id,title:W.title||W.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:ie!==null&&J>=ie?J-ie:null,work_kind:"session",done_at:J,created_at:W.created_at,updated_at:W.updated_at})}return K}return{read(L){if(!t)return{workspaces:[],workspaces_state:[]};let U=t.get()||Ay,H=o?.()||"",te=L&&typeof L.done_since=="number"?L.done_since:void 0,D=le(yy,"ready"),K=le(vy,"blocked"),W=le(wy,"in_progress"),J=le(ky,"resolved"),Ce=le($y,"closed");return{workspaces:[{...U,bead_titles:{...kr(U.bead_titles),...Object.fromEntries([...D,...K].filter(ke=>ke&&typeof ke.id=="string").map(ke=>[ke.id,ke.title||ke.id]))},root_dir:H,name:Ly(H),runnable:X(U,D,K,L?L.candidate_sort:void 0),session_done:I(U,Ce,H,te),bead_overlay:F([D,K,W,J,Ce])}],workspaces_state:[{root_dir:H,revision:U.revision,auto_advance:U.auto_advance,auto_merge:U.auto_merge,slots:typeof kr(U.workspace_info).slots=="number"?kr(U.workspace_info).slots:U.slots,runner_catalog:U.runner_catalog,execution_defaults:U.execution_defaults,session_defaults:A(H),orchestration_model:U.orchestration_model,orchestration_effort:U.orchestration_effort,orchestration_speed:U.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){T()},refreshSessionDefaults:N,notifyIssuesChanged:G,destroy(){g=!0,d+=1,p=null,l.clear()}}}var $i=1,Xp=5,Iy={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:$i,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function ln(e){return e&&typeof e=="object"?e:{}}var ef="beads-ui.worker.candidate-filter",tl={show_blocked:!1,spec:"all"};function Dy(){try{let e=window.localStorage.getItem(ef);if(!e)return{...tl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...tl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...tl}}}function My(e){try{window.localStorage.setItem(ef,JSON.stringify(e))}catch{}}var Py=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],tf="bdui.worker.done-range";function Ny(){try{let e=window.localStorage.getItem(tf);return e===null?"today":On(e)}catch{return"today"}}function qy(e){try{window.localStorage.setItem(tf,e)}catch{}}function Zp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Fy(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Jp(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function jy(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function By(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Uy(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Wy=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),zy=new Set(["waiting_metadata","reviewing","retrying"]);function Hy(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Ht(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Gy(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Ky(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Gy(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?vr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Wy.has(e.phase)}}function Yy(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Vy(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Yy(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";return e.review_session?.active===!0?n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0}):e.review_session?.failure?n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${Fy(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0}):n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Jp(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Jp(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Qy(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,c=!0,d=null,p=null,g=null,_={},A=!1,T=!1,N={},G=null,le={active:!1,failure:null}){let X=!!a&&a.position>0,F=!!a?.continuation_action&&a.continuation_action.continuation===null,I=!!a&&a.active===!0,L=a&&a.failure||null,U=By(a?a.waiting:null),H=n[e]||null,te=H&&H.gate?H.gate:null,D=H&&H.pr?H.pr:null,K=Uy(a?a.resolution:null),W=Hy(g),J=Ky(g,W),Ce=a&&a.authority||null,ke=!!g&&typeof g=="object"&&zy.has(g.phase),ie=X&&!I&&(!Ce||ke||Ce.source==="automatic"&&!T),q=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":K?K.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":U,$e=!!te&&te.base_badge==="\uCDA9\uB3CC",Se=!!te&&te.enabled===!0,S=$o({bead_id:e,merge_sha:N.merge_sha,cleanup_cursor:N.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:N.repo_operations}),ee=Us(S),Ee=s&&!S&&(s.queueing??null)?s.queueing:null,ge=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!te&&te.tier==="merged",xe=r&&r.step==="repo_operations"&&S?.failed===!0&&(S.step==="deploy"||S.step==="verify")?S.step:null,ye=l&&!!r&&!!te&&te.tier==="merged",Ne=ie&&(Se||$e||te?.reason==="base_behind"||te?.reason==="review_receipt_missing"||te?.reason==="review_receipt_stale"||ge||ye),De=te?.reason==="review_receipt_missing"||te?.reason==="review_receipt_stale",B=l&&$e&&c===!1,de=er(_,e,{external:l,merge_active:I||S?.step==="merge",merge_queued:X,conflict_active:!!i,cleanup_active:ee,merged:!!r||te?.tier==="merged"}),re=!!de.operation,_e=X&&!L&&!F&&!ge&&!(J&&J.lock_actions),ve=Vy({auto_pending:_e,continuation_required:F,queueing:Ee,merge_step:S,conflict_badge:q,conflict_live:K?.live===!0||i==="running",auto_resolution:W,recovery:J,cleanup_failed:r,cleanup_label:r?gr(r.step):null,base_exception:p,conflicting:$e,gate:te,receipt_check:H&&H.receipt_check?H.receipt_check:null,queue_failure:L,auto_skip:d,queued:X,queue_active:I,queue_position:a?a.position:0,review_session:le,activity:q?null:s&&s.activity||null}),pe=ve?.live===!0&&ve.title?u`<span title=${ve.title}>${ve.label}</span>`:ve?.label||null;return{id:e,title:l?u`${t}<span class="muted"> · 세션</span>`:t,reason:r&&S?.active!==!0?Bs(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,...G?{dependency_chips:G}:{},external:l,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:ve?.live!==!0&&ve?.title?ve.label:null,completion_title:ve?.title||"",...g?.phase==="needs_human"&&typeof g.log_path=="string"&&g.log_path.length>0?{log_path:g.log_path}:{},badges:pe?[pe]:[],live_badge:ve?.live===!0?pe:null,usage:o,alert:ve?.alert===!0,merge_action:te?.tier==="merged"&&!ge&&!ye?!1:!X||F||ie||De,cancel_action:X&&!F,cancel_enabled:!I&&!(J&&J.lock_actions),cancel_title:J&&J.lock_actions?`${J.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:I?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:de,discard_action:de.action,merge_step:S,discard_enabled:de.enabled,discard_title:de.title,merge_enabled:!S&&!Ee&&!i&&!re&&!p&&!(J&&J.lock_actions)&&!B&&le.active!==!0&&(Se||$e||te?.reason==="base_behind"||te?.reason==="review_receipt_missing"||te?.reason==="review_receipt_stale"||ge||ye||Ne||ke&&!I),merge_label:F?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ge||ye?xe==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":xe==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":$e&&!S&&!ge?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":te?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":te?.reason==="review_receipt_missing"||te?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ie?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:re?de.error?`\uD3D0\uAE30 \uC2E4\uD328: ${de.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${de.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:F?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ee?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":S?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${S.label}`:xe?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${xe==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":B?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":$e?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":te?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":le.active===!0?"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":te?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":te?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":te?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Se?`\uBA38\uC9C0 (${te.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:te&&te.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${te&&te.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function nl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:c,doneRange:d,onDoneRangeChange:p}=t,g=r?Lr(r):null,_=Dy(),A=null,T=null,N=null,G={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},le=new Map,X=new Map,F=Ip(),I=Ja(F)===null,L=d?On(d):Ny();function U(){let k=Sr.find($=>$.value===L);return k?k.label:"\uC624\uB298"}let H=_i("beads-ui.worker.lane-collapsed"),te=!1,D=new Set,K=new Set,W=new Set,J=new Set,Ce=new Set,ke=null,ie=[],q=Qp({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>ae()});function $e(){q.refreshSessionDefaults()}let Se=document.createElement("div");Se.className="worker-console";let S=document.createElement("div");S.className="worker-top";let ee=document.createElement("div");ee.className="worker-drawer-overlay",ee.hidden=!0;let Ee=document.createElement("div");Ee.className="worker-drawer-overlay__backdrop";let ge=document.createElement("div");ge.className="worker-drawer-host";let xe=document.createElement("div");xe.className="worker-drawer-host",xe.hidden=!0,ee.append(Ee,ge,xe);let ye=document.createElement("div");ye.className="worker-lanes-host",Se.append(S,ee,ye),e.appendChild(Se);let Ne=tr(null,null),De=[],B=gi({transport:n,console_el:Se,getLanes:()=>Ne,getWorkspaces:()=>De,getCrossLanes:()=>null,reproject:()=>({lanes:Pe(),raw_lanes:null}),onCorrection:()=>{},showToast:be,requestRender:()=>ae(),adoptQueue:(k,$)=>{o&&o.set($)},onDragBegin:()=>{A=null}}),de=null,re=Qr(ge,{transport:n,sessionLogStore:s,onClose:()=>{de=null,ee.hidden=!0,ae()}}),_e=Yp(xe,{onClose:()=>{xe.hidden=!0,ee.hidden=!0,ae()}}),ve=jp({getWorkspacePath:l||(()=>"")}),pe=l&&l()||"",qe=Up({queueStore:o,transport:n,onChanged:()=>ae(),onOpenScript:(k,$)=>{ve.open(k,$)}});function Me(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:$i,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function je(){let k=Me(),$=typeof k.serial_lane_count=="number"&&Number.isInteger(k.serial_lane_count)&&k.serial_lane_count>0?Math.min(k.serial_lane_count,5):0,C=Array.isArray(k.serial_lanes)?k.serial_lanes:[],se=[];for(let Fe of C){if(se.length>=$)break;!Fe||typeof Fe.id!="string"||!/^s[1-5]$/.test(Fe.id)||!Array.isArray(Fe.entries)||se.push({id:Fe.id,label:`\uC9C1\uB82C ${Fe.id.slice(1)}`,count:Fe.entries.length})}return se.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(k.queue)?k.queue:[]).length},...se]}function He(k){if(!A||!k.some(C=>C.id===A))return null;let $=je();return $?{bead_id:A,lanes:$}:null}function pt(){return l&&l()||""}async function Y(k,$){await B.sendOp({type:"worker-queue-place",payload:{bead_id:k,...$==="parallel"?{}:{lane:$}},root_dir:pt()},k)}function Q(){let k=Me();return typeof k.revision=="number"?k.revision:0}function v(k){k&&k.queue&&o&&o.set(k.queue)}async function ne(k){if(!n||!k)return;let $=await n("worker-attempt-pause",{attempt_id:k});$&&$.paused===!1&&$.reason&&be(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function Te(k){if(!n||!k)return;let $=await Pr();if($===null)return;let C=async(fe={})=>await n("worker-attempt-resume",{attempt_id:k,expected_revision:Q(),...$!==""?{instructions:$}:{},...fe}),se=await C();v(se),se&&se.conflict&&(se=await C(),v(se)),se=await qn(se,(fe,Fe)=>C({continuation:fe,decision_token:Fe}),{onResult:v,refresh:()=>C()}),se&&se.resumed===!1&&!se.conflict&&se.reason&&be(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${se.reason}`,"error",2400)}async function he(k,$,C=!0){if(!n)return null;let se=n,fe=await se(k,{...$,expected_revision:Q()});return v(fe),fe&&fe.conflict&&C&&(fe=await se(k,{...$,expected_revision:Q()}),v(fe)),fe}async function Re(k){if(!n||!k)return;let $=Me().merge_queue?.find(se=>se.bead_id===k)?.continuation_action;if($?.mismatch&&$.continuation===null){await ze(k,$.mismatch);return}D.add(k),ae();let C;try{C=await he("worker-merge-queue-add",{bead_id:k})}catch{be("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{D.delete(k),ae()}if(!(!C||C.applied)){if(C.conflict){be("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}be(jy(C.reason),"error",2400)}}async function Be(k){if(!(!n||!k||K.has(k))){K.add(k),ae();try{let $=await n("worker-cleanup-retry",{bead_id:k,expected_revision:Q()});v($),$&&!$.retried&&!$.conflict&&$.reason&&be(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${$.reason}`,"error",2400)}finally{K.delete(k),ae()}}}async function ze(k,$){let C=await qn({continuation_mismatch:$},(fe,Fe)=>he("worker-merge-queue-add",{bead_id:k,continuation:fe,decision_token:Fe},!1)),se=C?.queue?.merge_queue?.find(fe=>fe.bead_id===k)?.continuation_action;if(C?.applied!==!0&&se?.continuation===null&&se.mismatch){await ze(k,se.mismatch);return}C&&C.applied===!1&&!C.conflict&&be("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function it(k){if(!n)return;let $=await he("worker-merge-auto-toggle",{on:k});!$||$.conflict||be(k?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",k?"success":"info",2400)}async function vt(k){if(!n||!k)return;let $=await he("worker-merge-queue-remove",{bead_id:k});$&&!$.conflict&&!$.applied&&$.reason==="merge_active"&&be("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Nt(){await he("worker-merge-queue-remove",{all:!0})}async function Ft(k,$=null,C="unmerged",se=null){if(!n||!k)return;let fe=vo(k,C);if(!(!!se||typeof globalThis.confirm!="function"||globalThis.confirm(fe)))return;let rt=await n("worker-discard",{bead_id:k,...$?{attempt_id:$}:{},...se?{operation_id:se}:{},expected_revision:Q()});if(v(rt),rt&&rt.conflict&&(rt=await n("worker-discard",{bead_id:k,...$?{attempt_id:$}:{},...se?{operation_id:se}:{},expected_revision:Q()}),v(rt)),rt&&rt.discarded===!0){be(Os(rt),"success",5e3);return}if(rt&&rt.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${rt.reason}`,"error",2800);return}if(rt&&rt.accepted&&rt.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(rt&&rt.accepted&&!rt.discarded){be(`\uD3D0\uAE30 \uC9C4\uD589: ${rt.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}rt&&!rt.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function xt(k,$,C){if(!(!n||!$||!C||J.has($))){J.add($),ae();try{let se=await n(k,{bead_id:$,action_id:C,expected_revision:Q()});v(se),se?.conflict?be("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!se?.ok&&se?.reason&&be(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(se.reason)}`,"error",2800)}finally{J.delete($),ae()}}}async function Rt(k,$){if(!n||!$||W.has($))return;W.add($),ae();let C;try{let se=async(fe={})=>await n(k,{bead_id:$,expected_revision:Q(),...fe});C=await se(),v(C),C&&C.conflict&&(C=await n(k,{bead_id:$,expected_revision:Q()}),v(C)),k==="worker-revise-fix"&&(C=await qn(C,(fe,Fe)=>se({continuation:fe,decision_token:Fe}),{onResult:v,refresh:()=>se()}))}finally{W.delete($),ae()}if(!(!C||C.conflict)){if(C.ok){be(k==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}be(`\uCC98\uBD84 \uAC70\uBD80: ${C.reason||""}`,"error",3e3)}}async function bt(k){if(!n)return;let $=await n("worker-automation-toggle",{on:k,expected_revision:Q()});v($),$&&$.conflict&&await n("worker-automation-toggle",{on:k,expected_revision:Q()}).then(v)}async function Ge(k){if(!n||!k)return;let $=await n("worker-repo-operation-dismiss",{operation_id:k});v($),$&&$.ok===!1&&be(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${$.reason||""}`,"error",3e3)}async function O(k){if(!n||!Number.isFinite(k))return;let $=Math.max($i,Math.floor(k)),C=await n("worker-queue-set-slots",{slots:$,expected_revision:Q()});v(C),C&&C.conflict&&await n("worker-queue-set-slots",{slots:$,expected_revision:Q()}).then(v)}async function oe(k){if(!n||!Number.isInteger(k)||k<1||k>Xp)return;let $=Me(),C=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).slice(k).reduce((Fe,rt)=>Fe+(Array.isArray(rt?.entries)?rt.entries.length:0),0),se=()=>({count:k,expected_revision:Q()}),fe=await n("worker-queue-set-serial-lane-count",se());v(fe),fe&&fe.conflict&&(fe=await n("worker-queue-set-serial-lane-count",se()),v(fe)),fe&&fe.applied&&C>0&&be(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${C}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let we="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function E(k,$){let C=Ya(k,$.id,G);return{id:$.id,title:$.title,location_label:$.location_label,prefixes:$.prefixes,action:C.kind==="note"?{kind:"note",text:C.text}:C.kind==="disabled"?{kind:"disabled",label:we,title:C.title}:{kind:"place",label:we,title:C.title}}}function V(k,$){if(!T||T.bead_id!==k)return null;let C=T.counterpart_id,se=$.filter(fe=>fe.id===C);return se.length===0?null:{rows:se.map(fe=>E(k,fe))}}async function Le(k,$){let C=Ya(k,$,G);if(T=null,C.kind!=="ops"){ae();return}let se=Q();for(let fe of C.ops){let Fe=await Ve(fe,se);if(Fe===null)break;se=Fe}ae()}async function Ve(k,$){if(!n)return null;try{let C=await n("worker-queue-place",{bead_id:k.bead_id,lane:k.lane,index:k.index,expected_revision:$});if(v(C),C&&C.conflict)return be("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!C||C.applied!==!0)return be(C&&typeof C.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${C.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let se=C.queue?C.queue.revision:void 0;return typeof se!="number"?(be("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):se}catch(C){return be(C instanceof Error&&C.message?C.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function Pe(){let k=dr(L),$=q.read({candidate_sort:F,done_since:k});return De=$.workspaces,Ne=tr($.workspaces,$.workspaces_state,{done_since:k,candidate_filter:_,candidate_sort:"as_given",groups:"all"}),Ne}function Xe(k){return k.queue_groups[0]||Iy}function ot(k){let $=k.dependency_chips||null,C={...$&&$.released?{released:$.released}:{},...$&&$.dependents?{dependents:$.dependents}:{}},se=le.get(k.id),fe=X.get(k.id)||null,Fe=se&&se.overlaps.length>0?se.overlaps:null,rt=!!se&&se.scope_missing;if(!fe&&!Fe&&!rt&&Object.keys(C).length===0)return null;let qt=Fe?V(k.id,Fe):null;return{...C,...fe?{predecessors:fe}:{},...Fe?{overlaps:Fe}:{},...rt?{scope_missing:!0}:{},...qt?{popover:qt}:{}}}function Ue(k){return{...k,workspace_name:"",done_layout:void 0,dependency_chips:ot(k)||void 0}}function tt(){let k=Me(),$=new Map;for(let C of Object.values(ln(k.lane_states))){let se=Array.isArray(C?.corrections)?C.corrections:[];for(let fe of se)fe&&typeof fe.bead_id=="string"&&typeof fe.after=="string"&&$.set(fe.bead_id,fe.after)}return{admission:ln(k.admission),bead_labels:ln(k.bead_labels),correction_after:$}}function wt(k,$){let C=Ue(k),se=Jc($.admission[k.id]||null,!!k.discard||J.has(k.id)),fe=$.bead_labels[k.id],Fe=$.correction_after.get(k.id);return{...C,draggable:C.draggable===!0&&!se,stale_work:se,reason:se?"":C.reason,worker_serial:Array.isArray(fe)&&Ep(fe),badges:Fe?[`\u{1F517} ${Fe} \uB4A4 (blocks \uC790\uB3D9)`,...C.badges||[]]:C.badges,revise_enabled:C.revise_enabled===!0&&!W.has(k.id)}}function Ke(k){let $=tt();return Xe(k).sublanes.parallel.map(C=>wt(C,$))}function kt(k){let $=tt();return Xe(k).sublanes.serial.map(C=>{let se=C.occupants.map(fe=>({id:fe.id,title:fe.title,draggable:!1,lane:C.id,ghost:!0,badges:[fe.badge]}));return{id:C.id,index:C.index+1,raw_length:C.raw_length,ghosts:se,items:C.items.map(fe=>wt(fe,$)),occupied:C.occupied_by.length>0,badge:C.occupants.length>0?C.occupants[0].badge:"\uB300\uAE30",cycle:C.cycle===!0}})}function Ye(k){return k.runnable.map($=>Ue($))}function ct(k){return k.done.map($=>Ue($))}function Ot(k){let $=k.running.filter(C=>C.non_occupying!==!0).map(C=>({...C,bead_id:C.id,attempt_id:C.attempt_id||"",paused:C.run_state==="paused",failed:C.run_state==="failed",status_label:C.run_state==="failed"?C.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":void 0,can_pause:C.can_pause!==!1,workspace_name:"",dependency_chips:ot(C)||void 0,rollup_expanded:Ce.has(C.id),failure:C.failure?{...C.failure,open:N===C.attempt_id}:null}));return[...$.filter(C=>C.failed===!0),...$.filter(C=>C.failed!==!0)]}function At(k){if(ke&&ke.model===k)return ke.rows;let $=Me(),C=Xe(k),se=ln($.attempts),fe=Object.values(se).filter(_r),Fe=new Map;for(let Qe of fe)Fe.set(Qe.attempt_id,Qe);let rt=new Map;for(let Qe of fe)rt.set(Qe.bead_id,Qe);let qt=new Map;for(let Qe of[...k.pr_wait,...k.running,...k.queue,...k.runnable,...k.done])qt.has(Qe.id)||qt.set(Qe.id,Qe);let Ze=Qe=>{let Bt=null;for(let gn of fe)!gn||gn.bead_id!==Qe||pa(gn,Fe)||(Bt===null||(typeof gn.started_at=="number"?gn.started_at:0)>=(typeof Bt.started_at=="number"?Bt.started_at:0))&&(Bt=gn);return Bt&&typeof Bt.target_base=="string"?Bt.target_base:null},Dt=new Map;for(let Qe of k.running)Qe.run_state==="failed"||Qe.conflict_resolution!==!0||(Qe.run_state!=="paused"?Dt.set(Qe.id,"running"):Dt.has(Qe.id)||Dt.set(Qe.id,"paused"));let Jt=ln($.auto_merge_skips),Tn=new Set(C.merge.auto_excluded),sr=ln($.pr_observations),Cn=ln($.pr_activity),Vt=ln($.cleanup_failed),Gn=ln($.discard_operations),$r=ln($.bead_workflow),xr=ln($.bead_titles),Rn=$.merge_queue_state||{active:null,failures:{}},Mn=C.merge.state.waiting,Kn=(Array.isArray($.pr_wait)?$.pr_wait:[]).map(Qe=>{let Bt=qt.get(Qe.bead_id);return{...Qy(Qe.bead_id,Bt?.title||xr[Qe.bead_id]||Qe.bead_id,sr,Vt[Qe.bead_id]||null,jn(se,Qe.bead_id),Cn[Qe.bead_id]||(D.has(Qe.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:K.has(Qe.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Dt.get(Qe.bead_id)||null,Qe.external===!0,{position:C.merge.positions.get(Qe.bead_id)||0,active:Rn.active===Qe.bead_id,failure:ln(Rn.failures)[Qe.bead_id]||null,waiting:Mn&&Mn.bead_id===Qe.bead_id?Mn.reason:null,resolution:C.merge.resolutions.get(Qe.bead_id),continuation_action:C.merge.continuations.get(Qe.bead_id),authority:C.merge.authorities.get(Qe.bead_id)||null},Qe.wt_present!==!1,$.auto_merge===!0&&Tn.has(Qe.bead_id)?Jt[Qe.bead_id]?.reason||"":null,da(C.declared_base,Ze(Qe.bead_id)),ln($.completion_status)[Qe.bead_id]||null,Gn,rt.get(Qe.bead_id)?.worker_serial===!0,$.auto_merge===!0,{merge_sha:Qe.merge_sha,cleanup_cursor:Qe.cleanup_cursor,repo_operations:C.repo_operations},Bt?ot(Bt):null,Vc(se,Qe.bead_id)),workflow:$r[Qe.bead_id]||null,priority:Bt?.priority,from_id:Bt?.from_id,...Bt?.created_at===void 0?{}:{created_at:Bt.created_at},...Bt?.updated_at===void 0?{}:{updated_at:Bt.updated_at}}});return ke={model:k,rows:Kn},Kn}function Tt(k){let $=Xe(k),C=[];for(let Ze of k.running)C.push({id:Ze.id,title:Ze.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ze.serial_lane_id??null});for(let Ze of k.pr_wait)C.push({id:Ze.id,title:Ze.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Ze of $.sublanes.serial)Ze.items.forEach((Dt,Jt)=>{C.push({id:Dt.id,title:Dt.title,location_label:`${Ze.id} #${Jt+1}`,kind:"serial",lane_id:Ze.id})});$.sublanes.parallel.forEach((Ze,Dt)=>{C.push({id:Ze.id,title:Ze.title,location_label:`#${Dt+1}`,kind:"parallel",lane_id:null})});for(let Ze of k.runnable)C.push({id:Ze.id,title:Ze.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Ze.queue_placeable===!0});let se=new Map;for(let Ze of C)se.has(Ze.id)||se.set(Ze.id,Ze);let fe={},Fe=new Set;for(let Ze of $.sublanes.serial)fe[Ze.id]=Ze.raw_length,Ze.occupied_by.length>0&&Fe.add(Ze.id);G={members_by_id:se,serial_raw_lengths:fe,serial_lane_count:$.serial_lane_count,occupied_lanes:Fe};let rt=Me();le=Id(rt.bead_scope,C);let qt=new Map;for(let Ze of[...k.running,...k.runnable])Array.isArray(Ze.blocked_by)&&Ze.blocked_by.length>0&&qt.set(Ze.id,Ze.blocked_by);for(let[Ze,Dt]of Object.entries(ln(rt.bead_blocked_by)))Array.isArray(Dt)&&qt.set(Ze,Dt.filter(Jt=>typeof Jt=="string"&&Jt.length>0));X=au(qt,C,ln(rt.blocker_workspaces))}function Gt(k){let $=Me(),C=Xe(k),se=C.sublanes.parallel,fe=se.length>0?se[0].id:"\u2014",Fe=u`<button
      type="button"
      class="worker-play${$.auto_advance?" is-active":""}"
    >
      ${$.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,rt=It(k),qt=C.over_cap?u`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ze=$.auto_advance?0:(Array.isArray($.queue)?$.queue:[]).filter(Vt=>Vt&&typeof Vt.armed_by_lane=="string"&&Vt.armed_by_lane.length>0).length,Dt=Ze>0?u`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Ze}건 진행 중</span
          >`:"",Jt=u`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${C.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${At(k).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${U()} 완료 <b>${k.done.length}</b></span
      >`,Tn=u`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${C.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${C.declared_base||"?"}</span
    >`,sr=u`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${$i}
          step="1"
          .value=${String(C.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Xp},(Vt,Gn)=>Gn+1).map(Vt=>u`<option
                value=${String(Vt)}
                ?selected=${C.serial_lane_count===Vt}
              >
                ${Vt}
              </option>`)}
        </select>
      </label> `,Cn=Xc(C.repo_operations,C.cleanup_failures);return te?u`<div class="worker-ribbon">
          ${Fe} ${rt}
          <div class="worker-kpi worker-kpi--ribbon">
            ${qt}${Dt}${Jt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${sr}</div>
          <div class="worker-kpi">${Tn}</div>
        </div>
        ${Cn}${qe.template()}`:u`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${Fe}${rt}${sr}</div>
        <div class="worker-kpi">
          ${qt}${Dt}${Jt}${Tn}
          ${(Array.isArray(C.token_total)?C.token_total:C.token_total?[{label:C.token_total,tooltip:`${U()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Vt=>u`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Vt.tooltip}
                >${U()} 완료 · 누적 ${Vt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${fe}</b></span
          >
        </div>
      </div>
      ${Cn}${qe.template()}`}function cn(k){let $=k.runnable_hidden;return u`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${_.show_blocked}
        />
        🔒 blocked${$.blocked>0?` ${$.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Py.map(C=>u`<button
              type="button"
              class="worker-filter__chip${_.spec===C.value?" is-active":""}"
              data-spec=${C.value}
              aria-pressed=${_.spec===C.value?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${$.spec>0?u`<span class="worker-filter__hidden">숨김 ${$.spec}</span>`:""}
      </div>
    </div>`}function Lt(){let k=I?"custom":Ja(F)||"custom";return u`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${k}
    >
      ${Ko.map($=>u`<option value=${$.id} ?selected=${k===$.id}>
            ${$.label}
          </option>`)}
      <option value="custom" ?selected=${k==="custom"}>
        사용자 지정…
      </option>
    </select>`}function Kt(){let k=Yo(F);return u`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map($=>{let C=k[$];return u`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${$}
            aria-label=${`${$+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${C?C.key:""}
          >
            ${$===0?"":u`<option value="" ?selected=${!C}>없음</option>`}
            ${Lp.map(se=>u`<option
                  value=${se.key}
                  ?selected=${!!C&&C.key===se.key}
                >
                  ${se.label}
                </option>`)}
          </select>
          ${C?u`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${$}
                aria-label=${C.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${C.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${C.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function jt(){return u`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${L}
      >
        ${Sr.map(k=>u`<option value=${k.value} ?selected=${L===k.value}>
              ${k.label}
            </option>`)}
      </select>
    </div>`}function It(k){let $=Xe(k).merge,C=Me().auto_merge===!0;if($.running)return u`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${C?" is-active":""}"
        title=${C?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${C?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${$.positions.size}
      </button>`;if(C)return u`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let se=new Set($.auto_excluded),fe=At(k).filter(Fe=>Fe.merge_action&&Fe.merge_enabled&&!se.has(Fe.id)).length;return u`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${fe>0?` ${fe}`:""}
    </button>`}function Zt(k){if(!(k.draggable!==!0||k.done===!0))return u`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${k.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`}function Yt(k,$){return u`<div
      data-bead-id=${k.id}
      data-drag-kind=${$.kind}
      data-root-dir=${$.root_dir}
      data-lane-id=${en($.lane_id)}
      data-row-index=${$.row_index}
      data-queue-index=${String(k.queue_index??0)}
    >
      ${kn(k,{actions:Zt(k)})}
    </div>`}function zt(k){let $=Ke(k),C=pt();return qs({parallel:{rows:$.map((se,fe)=>Yt(se,{kind:"parallel",root_dir:C,row_index:fe})),count:$.length,collapsed:H.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:C}},serial:{lanes:kt(k).map(se=>({id:se.id,title:`\uC9C1\uB82C ${se.index}`,rows:[...se.ghosts.map(fe=>kn(fe,{actions:Zt(fe)})),...se.items.map((fe,Fe)=>Yt(fe,{kind:"repo-serial",root_dir:C,row_index:Fe,lane_id:se.id}))],count:se.ghosts.length+se.items.length,empty:se.ghosts.length+se.items.length===0,badge:se.badge,held:se.occupied,cycle:se.cycle,drop:{drop:"repo-serial",root_dir:C,lane_id:se.id,lane_length:String(se.raw_length)}})),collapsed:H.isAreaCollapsed("serial")}})}function un(k){return jd(Ot(k),Date.now(),de)}function y(k){return k.running.some($=>$.kind!=="session"&&$.run_state==="running")}function f(k){let $=Xe(k),C=Ye(k),se=Ke(k),fe=ct(k),Fe=At(k),rt=Ot(k),qt=Dn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:C,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Lt(),header_row:I?Kt():void 0,controls:cn(k),collapsible:!0,collapsed:H.isCollapsed("candidate"),place_menu:He(C),onOpenDoc:c?(Dt,Jt)=>c(Jt):void 0}),Ze=Dn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:fe,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,header_control:jt(),collapsible:!0,collapsed:H.isCollapsed("done"),preview:te?Array.isArray($.token_total)?$.token_total.map(Dt=>Dt.label).join(" \xB7 "):$.token_total||Zp(fe):void 0});return te?u`<div class="worker-lanes worker-lanes--mobile">
        ${Fs({live:y(k),running_body:rt.length>0?un(k):"",pr_wait_rows:Fe.map(Dt=>kn(Dt)),count:rt.length+Fe.length})}
        ${Dn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:se,count:se.length,collapsible:!0,collapsed:H.isCollapsed("queue"),preview:Zp(se),body:zt(k)})}
        ${qt} ${Ze}
      </div>`:u`<div class="worker-lanes">
      ${qt}
      ${Dn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:se,count:se.length,collapsible:!0,collapsed:H.isCollapsed("queue"),body:zt(k)})}
      ${Dn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:rt,header_control:u`<span class="worker-pane__meta"
          >슬롯 ${$.slots}</span
        >`,live:y(k),collapsible:!0,collapsed:H.isCollapsed("running"),body:un(k)})}
      ${Dn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Fe,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:H.isCollapsed("pr_wait")})}
      ${Ze}
    </div>`}function j(k){H.toggle(k),ae()}function ue(k){H.toggleArea(k),ae()}function ae(){let k=Pe();Tt(k),lt(Gt(k),S),lt(f(k),ye)}function We(){let k=!0,$=fi(C=>{if(te=C,k){k=!1;return}ae()});ie.push($)}function at(k){_=k,My(k),ae()}function ut(k){if(k==="custom"){I=!0,ae();return}F=wr(k),el(F),I=!1,ae()}function st(k){F=wr({chain:k}),el(F),ae()}function _t(k){L=On(k),qy(L),p?.(L),ae()}function gt(k){let $=k.target?.closest?.(".worker-serial-lane-count");if($){let Ze=Number.parseInt($.value,10);Number.isFinite(Ze)&&oe(Ze).then(ae);return}let C=k.target?.closest?.(".worker-filter__blocked");if(C){at({..._,show_blocked:C.checked});return}let se=k.target?.closest?.(".worker-sort-chain__key");if(se){let Ze=Number.parseInt(se.getAttribute("data-step")||"",10);Number.isFinite(Ze)&&st(Dp(Yo(F),Ze,se.value));return}let fe=k.target?.closest?.(".worker-done-range");if(fe){_t(fe.value);return}let Fe=k.target?.closest?.(".worker-sort");if(Fe){ut(Fe.value);return}let rt=k.target?.closest?.(".worker-slots__input");if(!rt)return;let qt=Number.parseInt(rt.value,10);if(!Number.isFinite(qt)){ae();return}O(qt).then(ae)}function ht(k){return k?{runner:k.runner||void 0,model:k.model||void 0,effort:k.effort||void 0,worktree:k.worktree||void 0,status:k.status||void 0,session_id:k.session_id||void 0}:{}}function h(){let k=Xe(Pe()),$=Me().workspace_info,C=$&&typeof $=="object"&&$.repo_ops&&typeof $.repo_ops=="object"?$.repo_ops:null;return{operations:k.repo_operations,cleanup_failures:k.cleanup_failures,repo:l&&l()||"",repo_ops:C}}function b(){de&&re.close(),xe.hidden=!1,ee.hidden=!1,_e.open(h()),ae()}function R(k){let $=Me(),C=$.attempts?$.attempts[k]:null;de=k,_e.close(),xe.hidden=!0,ee.hidden=!1,re.open({attempt_id:k,meta:ht(C)}),ae()}function M(k){let $=Me(),C=(Array.isArray($.session_active)?$.session_active:[]).find(fe=>fe&&fe.bead_id===k),se=(C&&Array.isArray(C.session_refs)?C.session_refs:[]).find(fe=>fe&&fe.current===!0);se&&(_e.close(),xe.hidden=!0,ee.hidden=!1,re.open(Nr(se,k,"in_progress")),ae())}function m(){if(_e.isOpen()&&_e.refresh(h()),!de)return;let k=Me(),$=k.attempts?k.attempts[de]:null;if($){re.updateMeta(ht($));return}re.close()}function w(k,$){if(k.length===0||!i)return;let C=l?l():void 0;if($.length===0||!C||$===C||!a){i(k);return}Promise.resolve(a($)).then(()=>{i(k)}).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function z(k){let $=k.target;if($?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let C=$?.closest?.(".worker-sort-chain__dir");if(C){let me=Number.parseInt(C.getAttribute("data-step")||"",10);Number.isFinite(me)&&st(Mp(Yo(F),me));return}let se=$?.closest?.(".worker-dep__open");if(se){w(se.getAttribute("data-dep-id")||"",se.getAttribute("data-root-dir")||"");return}let fe=$?.closest?.(".mon-overlap__chip");if(fe){let me=fe.closest("[data-bead-id]"),Ae=me&&me.getAttribute("data-bead-id")||"";if(Ae){let et=fe.getAttribute("data-overlap-id")||"";T=!!T&&T.bead_id===Ae&&T.counterpart_id===et?null:{bead_id:Ae,counterpart_id:et},ae()}return}let Fe=$?.closest?.(".mon-overlap__place");if(Fe){let me=Fe.closest("[data-bead-id]"),Ae=me&&me.getAttribute("data-bead-id")||"";Ae&&Le(Ae,Fe.getAttribute("data-counterpart-id")||"");return}if($?.closest?.(".mon-overlap__popover"))return;if($?.closest?.(".worker-repo-strip")){b();return}let rt=$?.closest?.(".worker-repo-op__dismiss");if(rt){Ge(rt.dataset.operationId||"");return}let qt=$?.closest?.(".worker-cleanup__resume");if(qt){let me=qt.dataset.beadId;me&&Be(me);return}if($?.closest?.(".worker-play")){bt(!Me().auto_advance);return}let Ze=$?.closest?.(".worker-merge-all");if(Ze){Ze.classList.contains("worker-merge-all--stop")?Me().auto_merge===!0?it(!1):Nt():it(!0);return}let Dt=$?.closest?.(".worker-pane__toggle[data-lane]");if(Dt){let me=Dt.dataset.lane;(me==="candidate"||me==="queue"||me==="running"||me==="pr_wait"||me==="done")&&j(me);return}let Jt=$?.closest?.(".worker-wait__area-toggle[data-area]");if(Jt){let me=Jt.dataset.area;(me==="parallel"||me==="serial")&&ue(me);return}let Tn=$?.closest?.(".worker-card__place-lane");if(Tn){let me=Tn.dataset.beadId,Ae=Tn.dataset.lane;me&&(Ae==="parallel"||/^s[1-5]$/.test(Ae||""))&&(A=null,ae(),Y(me,Ae));return}if($?.closest?.(".worker-card__place-cancel")){A=null,ae();return}let Cn=$?.closest?.(".worker-card__place");if(Cn){let me=Cn.dataset.beadId;me&&!Cn.disabled&&(je()?(A=me,ae()):Y(me,"parallel"));return}let Vt=$?.closest?.(".worker-filter__chip");if(Vt){let me=Vt.dataset.spec;(me==="all"||me==="with"||me==="without")&&at({..._,spec:me});return}let Gn=$?.closest?.('[data-action="queue-remove"]');if(Gn){let me=Gn.dataset.beadId||"";me&&B.sendOp({type:"worker-queue-remove",payload:{bead_id:me},root_dir:pt()},me);return}let $r=$?.closest?.(".worker-mini__merge");if($r){let me=$r.dataset.beadId||"";Me().cleanup_failed?.[me]?Be(me):Re(me);return}let xr=$?.closest?.(".worker-mini__merge-cancel");if(xr){vt(xr.dataset.beadId||"");return}let Rn=$?.closest?.(".worker-mini__discard");if(Rn){Ft(Rn.dataset.beadId||"",Rn.dataset.attemptId||null,Rn.dataset.discardMode==="merged"?"merged":"unmerged",Rn.dataset.operationId||null);return}let Mn=$?.closest?.(".worker-mini__stale-continue");if(Mn){xt("worker-stale-work-continue",Mn.dataset.beadId||"",Mn.dataset.actionId||"");return}let Kn=$?.closest?.(".worker-mini__stale-backup");if(Kn){xt("worker-stale-work-backup-fresh",Kn.dataset.beadId||"",Kn.dataset.actionId||"");return}let Qe=$?.closest?.(".worker-mini__stale-recheck");if(Qe){xt("worker-stale-work-recheck",Qe.dataset.beadId||"",Qe.dataset.actionId||"");return}let Bt=$?.closest?.(".worker-mini__revise-fix");if(Bt){Rt("worker-revise-fix",Bt.dataset.beadId||"");return}let gn=$?.closest?.(".worker-mini__revise-approve");if(gn){Rt("worker-revise-approve",gn.dataset.beadId||"");return}if($?.closest?.(".worker-mini__pr"))return;let dt=$?.closest?.(".rtile__failure-badge");if(dt){let me=dt.dataset.attemptId||"";N=N===me?null:me,ae();return}let x=$?.closest?.(".rtile__attempt-copy");if(x){let me=x.dataset.attemptId||"";me&&nn(me).then(Ae=>{be(Ae?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ae?"success":"error",1400)});return}let Z=$?.closest?.(".rtile__discard");if(Z){let me=$?.closest?.(".rtile"),Ae=me?.dataset?.beadId,et=me?.dataset?.attemptId;Ae&&Ft(Ae,et||null,Z.dataset.confirmation==="merged"?"merged":"unmerged",Z.dataset.operationId||null);return}if($?.closest?.(".rtile__pause")){let Ae=$?.closest?.(".rtile")?.dataset?.attemptId;Ae&&ne(Ae);return}if($?.closest?.(".rtile__resume")){let Ae=$?.closest?.(".rtile")?.dataset?.attemptId;Ae&&Te(Ae);return}if($?.closest?.(".rtile__session")){let me=$?.closest?.(".rtile"),Ae=me?.dataset?.attemptId;if(Ae){R(Ae);return}let et=me?.dataset?.beadId;et&&M(et);return}if($?.closest?.(".rtile__failure-pop"))return;if($?.closest?.(".worker-drawer-overlay__backdrop")){_e.close(),re.close();return}if($?.closest?.(".worker-drawer-host"))return;let P=$?.closest?.(".rtile .board-card__roll-toggle");if(P){let me=P.dataset.rollParent;me&&(Ce.has(me)?Ce.delete(me):Ce.add(me),ae());return}let Oe=$?.closest?.(".rtile .board-card__roll-child");if(Oe){let me=Oe.dataset.childId;me&&i&&i(me);return}let Je=$?.closest?.(".rtile");if(Je){if($?.closest?.(".rtile__id")){let Ae=Je.dataset.beadId;Ae&&nn(Ae).then(et=>{et?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let me=Je.dataset.beadId;me&&i&&i(me);return}let nt=$?.closest?.(".worker-mini, .worker-card");if(nt){let me=nt.dataset.beadId;if($?.closest?.('[data-seam="log-path-copy"]'))return;if($?.closest?.(".worker-mini__id, .worker-card__id")){me&&nn(me).then(et=>{et?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ae=$?.closest?.(".ctl-chip--from");if(Ae){let et=Ae.dataset.fromId;et&&i&&i(et);return}me&&i&&i(me)}}B.attach(e),e.addEventListener("click",z),e.addEventListener("change",gt);function ce(k){let $=k.target,C=$&&typeof $.closest=="function"?fe=>$.closest(fe):()=>null,se=!1;T&&!C(".mon-overlap__popover, .mon-overlap__chip")&&(T=null,se=!0),N&&!C(".rtile__failure-pop, .rtile__failure-badge")&&(N=null,se=!0),se&&ae()}function Ie(k){k.key!=="Escape"||!T&&N===null||(T=null,N=null,ae())}return document.addEventListener("click",ce),document.addEventListener("keydown",Ie),ie.push(()=>{document.removeEventListener("click",ce),document.removeEventListener("keydown",Ie)}),We(),g&&ie.push(g.subscribe(()=>{q.notifyIssuesChanged(),ae()})),o&&ie.push(o.subscribe(()=>{let k=l&&l()||"";k!==pe&&(pe=k,ve.close()),ae(),m()})),ae(),{load(){q.ensureSessionDefaults(),ae()},refreshSessionDefaults:$e,destroy(){for(let k of ie.splice(0))try{k()}catch{}B.detach(),e.removeEventListener("click",z),e.removeEventListener("change",gt),q.destroy();try{re.destroy()}catch{}ee.hidden=!0;try{ve.destroy()}catch{}lt(u``,e)}}}function rl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function nf(e,t,n,r=async()=>{},o=async()=>{}){let s=Ct("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function d(L){let H=L.target.value,D=t.getState().workspace?.current?.path||"";if(H&&H!==D){s("switching workspace to %s",H),l=!0,I();try{await n(H)}catch(K){s("workspace switch failed: %o",K)}finally{l=!1,I()}}}async function p(){let L=t.getState(),U=L.workspace?.current?.path||L.workspace?.available?.[0]?.path||"";if(!(!U||a)){s("git-pulling workspace %s",U),a=!0,I();try{await r(U)}catch(H){s("workspace git pull failed: %o",H)}finally{a=!1,I()}}}function g(L){let U=L.target;U&&e.contains(U)||T()}function _(L){L.key==="Escape"&&T()}function A(){c||(c=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",_),I())}function T(){c&&(c=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",_),I())}function N(){c?T():A()}async function G(L){let U=L.target,H=U.value,te=U.checked;s("toggling visibility %s \u2192 %s",H,String(te));try{await o(H,te)}catch(D){s("workspace visibility toggle failed: %o",D)}}function le(L){return L?u`
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
    `:u``}function X(L,U){return u`
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
        ${c?u`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${L.map(H=>u`
                    <label
                      class="workspace-picker__manage-row"
                      title="${H.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${H.path}"
                        .checked=${!U.has(H.path)}
                        @change=${G}
                      />
                      <span class="workspace-picker__manage-name"
                        >${rl(H.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function F(){let L=t.getState(),U=L.workspace?.current,H=L.workspace?.available||[],te=new Set(L.workspace?.hidden||[]),D=U?.path||H[0]?.path||"";if(H.length===0)return u``;let K=H.filter(W=>!te.has(W.path)||W.path===D);if(K.length<=1){let W=K[0]||H[0],J=rl(W.path);return u`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${W.path}"
            >${J}</span
          >
          ${X(H,te)}
          ${le(D)}
          ${a?u`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return u`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${K.map(W=>u`
              <option
                value="${W.path}"
                ?selected=${W.path===D}
                title="${W.path}"
              >
                ${rl(W.path)}
              </option>
            `)}
        </select>
        ${X(H,te)}
        ${le(D)}
        ${l||a?u`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){lt(F(),e)}return I(),i=t.subscribe(()=>I()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",_),lt(u``,e)}}}var rf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function ol(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function of(e,t,n=ol()){return{id:n,type:e,payload:t}}function sf(e={}){let t=Ct("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,c=new Map,d=[],p=new Map,g=new Set;function _(F){for(let I of Array.from(g))try{I(F)}catch{}}function A(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),_(s);let F=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),I=(n.jitterRatio||0)*F,L=Math.max(0,Math.round(F+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",L,i+1),l=setTimeout(()=>{l=null,X()},L)}function T(F){try{o?.send(JSON.stringify(F))}catch(I){t("ws send failed",I)}}function N(){for(s="open",t("ws open"),_(s),i=0;d.length;){let F=d.shift();F&&T(F)}}function G(F){let I;try{I=JSON.parse(String(F.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(c.has(I.id)){let U=c.get(I.id);c.delete(I.id),I.ok?U?.resolve(I.payload):U?.reject(I.error||new Error("ws error"));return}let L=p.get(I.type);if(L&&L.size>0)for(let U of Array.from(L))try{U(I.payload)}catch(H){t("ws event handler error",H)}else t("ws received unhandled message type: %s",I.type)}function le(){s="closed",t("ws closed"),_(s);for(let[F,I]of c.entries())I.reject(new Error("ws disconnected")),c.delete(F);i+=1,A()}function X(){if(!a)return;let F=r();try{o=new WebSocket(F),t("ws connecting %s",F),s="connecting",_(s),o.addEventListener("open",N),o.addEventListener("message",G),o.addEventListener("error",()=>{}),o.addEventListener("close",le)}catch(I){t("ws connect failed %o",I),A()}}return X(),{send(F,I){if(!rf.includes(F))return Promise.reject(new Error(`unknown message type: ${F}`));let L=ol(),U=of(F,I,L);return t("send %s id=%s",F,L),new Promise((H,te)=>{c.set(L,{resolve:H,reject:te,type:F}),o&&o.readyState===o.OPEN?T(U):(t("queue %s id=%s (state=%s)",F,L,s),d.push(U))})},on(F,I){p.has(F)||p.set(F,new Set);let L=p.get(F);return L?.add(I),()=>{L?.delete(I)}},onConnection(F){return g.add(F),()=>{g.delete(F)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,X()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function Xy(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Zy(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var sl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],af=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],rr="tab:worker:closed",Jy="bdui.worker.done-range",lf=sp,cf="worker:queue",uf="ui:order",df="ui:display-policy",pf="exec:presets",or="tab:board:closed",ff="beads-ui.board.closed-range";function ev(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+tv(e))});return n.observe(e),()=>n.disconnect()}function tv(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function nv(e){let t=Ct("main");t("bootstrap start"),ev(document.querySelector(".app-header"));let n=u`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;lt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&Ap(i),l&&a&&c&&d){let Ee=function(m,w){let z="Request failed",ce="";if(m&&typeof m=="object"){let k=m;if(typeof k.message=="string"&&k.message.length>0&&(z=k.message),typeof k.details=="string")ce=k.details;else if(k.details&&typeof k.details=="object")try{ce=JSON.stringify(k.details,null,2)}catch{ce=""}}else typeof m=="string"&&m.length>0&&(z=m);let Ie=w&&w.length>0?`Failed to load ${w}`:"Request failed";ee.open(Ie,z,ce)},v=function(m){return`${y.getState().workspace.current?.path||""}\0${m}`},ne=function(){pe&&(pe().catch(()=>{}),pe=null),qe=null,Me=null},he=function(m){je=m;let w=()=>{je!==m||y.getState().selected_id!==m||(je=null,Te(m))};if(!Y){pt.then(w);return}w()},it=function(m,w,z,ce,Ie){return z!==ze[w]?(Ie().catch(()=>{}),!1):(m.set(ce,Ie),!0)},Nt=function(){let m=y.getState();Ge(m.view==="board"),Le(m.view==="worker"),tt(Ue(m)),Pe(m.view==="board"||m.view==="worker"||vt||!!m.selected_id)},Rt=function(){let m=dr(Ft);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},bt=function(){let m=dr(xt);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},Ge=function(m){if(m)for(let[w,z]of sl){if(Re.has(w)||Be.has(w))continue;let ce=w===or?Rt():{type:z};try{Ne.register(w,ce)}catch($){t("register %s store failed: %o",w,$)}Be.add(w);let Ie=ze.board,k=!1;ye.subscribeList(w,ce).then($=>{k=!it(Re,"board",Ie,w,$)}).catch($=>{t("subscribe %s failed: %o",w,$),Ee($,"board")}).finally(()=>{Be.delete(w),k&&Nt()})}else we()},we=function(){ze.board+=1;for(let[m]of sl){let w=Re.get(m);w&&(w().catch(()=>{}),Re.delete(m));try{Ne.unregister(m)}catch(z){t("unregister %s failed: %o",m,z)}}},Le=function(m){if(!m){Ve();return}for(let[w,z]of af){if(E.has(w)||Be.has(w))continue;let ce=w===rr?bt():{type:z};try{Ne.register(w,ce)}catch($){t("register %s store failed: %o",w,$)}Be.add(w);let Ie=ze.worker,k=!1;ye.subscribeList(w,ce).then($=>{k=!it(E,"worker",Ie,w,$)}).catch($=>{t("subscribe %s failed: %o",w,$),Ee($,"worker")}).finally(()=>{Be.delete(w),k&&Nt()})}},Ve=function(){ze.worker+=1;for(let[m]of af){let w=E.get(m);w&&(w().catch(()=>{}),E.delete(m));try{Ne.unregister(m)}catch(z){t("unregister %s failed: %o",m,z)}}},Pe=function(m){if(!m){Xe();return}V||(xe("subscribe-worker-queue",{id:cf}).catch(w=>{t("subscribe-worker-queue failed: %o",w)}),V=()=>xe("unsubscribe-worker-queue",{id:cf}))},Xe=function(){V&&(V().catch(()=>{}),V=null)},Ue=function(m){return m.view==="monitor"||m.selected_id!=null},tt=function(m){if(!m){wt();return}ot||(xe("subscribe-monitor-pipeline",{id:lf}).catch(w=>{t("subscribe-monitor-pipeline failed: %o",w)}),ot=()=>xe("unsubscribe-monitor-pipeline",{id:lf}))},wt=function(){ot&&(ot().catch(()=>{}),ot=null)},kt=function(){Ke||(xe("subscribe-ui-order",{id:uf}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),Ke=()=>xe("unsubscribe-ui-order",{id:uf}))},Ye=function(){Ke&&(Ke().catch(()=>{}),Ke=null),de.clear()},Ot=function(){ct||(xe("subscribe-display-policy",{id:df}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),ct=()=>xe("unsubscribe-display-policy",{id:df}))},At=function(){ct&&(ct().catch(()=>{}),ct=null),re.clear()},Gt=function(){Tt||(xe("subscribe-impl-presets",{id:pf}).catch(m=>{t("subscribe-impl-presets failed: %o",m)}),Tt=()=>xe("unsubscribe-impl-presets",{id:pf}))},Zt=function(m){if(!m)return"Unknown";let w=m.split("/").filter(Boolean);return w.length>0?w[w.length-1]:"Unknown"},_t=function(m,w){st.open(m.path,{missing_state:m.missing_state,...w?{workspace:w}:{}})};var p=Ee,g=v,_=ne,A=he,T=it,N=Nt,G=Rt,le=bt,X=Ge,F=we,I=Le,L=Ve,U=Pe,H=Xe,te=Ue,D=tt,K=wt,W=kt,J=Ye,Ce=Ot,ke=At,ie=Gt,q=Zt,$e=_t;let Se=document.getElementById("header-loading"),S=Yl(Se),ee=Rd(e),ge=sf(),xe=S.wrapSend((m,w)=>ge.send(m,w)),ye=Bl(xe),Ne=Ul(),De=zl(),B=vl(),de=Wl(),re=bl(),_e=yl(),ve=wl();ge.on("impl-presets-snapshot",m=>{let w=m;w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&_e.set({revision:w.revision,presets:w.presets})}),ge.on("monitor-pipeline-snapshot",m=>{let w=m;if(!(!w||!Array.isArray(w.workspaces)))try{B.set(w.workspaces,w.workspaces_state,w.cross_lanes)}catch{}}),ge.on("ui-order-snapshot",m=>{let w=m;if(w&&typeof w.revision=="number")try{de.set({revision:w.revision,order:w.order&&typeof w.order=="object"?w.order:{}})}catch{}}),ge.on("display-policy-snapshot",m=>{let w=m;if(w&&w.policy&&typeof w.policy=="object")try{re.set(w.policy)}catch{}}),ge.on("session-log-snapshot",m=>{let w=m;if(w&&typeof w.id=="string")try{ve.set(w.id,Array.isArray(w.lines)?w.lines:[],typeof w.last_event_at=="number"?w.last_event_at:null)}catch{}}),ge.on("session-log-append",m=>{let w=m;if(w&&typeof w.id=="string")try{ve.append(w.id,w.event)}catch{}}),ge.on("snapshot",m=>{let w=m,z=w&&typeof w.id=="string"?w.id:"",ce=z?Ne.getStore(z):null;if(ce&&w&&w.type==="snapshot")try{ce.applyPush(w)}catch{}}),ge.on("upsert",m=>{let w=m,z=w&&typeof w.id=="string"?w.id:"",ce=z?Ne.getStore(z):null;if(ce&&w&&w.type==="upsert")try{ce.applyPush(w)}catch{}}),ge.on("delete",m=>{let w=m,z=w&&typeof w.id=="string"?w.id:"",ce=z?Ne.getStore(z):null;if(ce&&w&&w.type==="delete")try{ce.applyPush(w)}catch{}});let pe=null,qe=null,Me=null,je=null,He=()=>{},pt=new Promise(m=>{He=()=>m(void 0)}),Y=!1,Q=!1;async function Te(m){let w=v(m);if(w===qe||w===Me)return;Me=w;let z=`detail:${m}`,ce={type:"issue-detail",params:{id:m}};try{Ne.register(z,ce)}catch(Ie){t("register detail store failed: %o",Ie)}try{let Ie=await ye.subscribeList(z,ce);if(y.getState().selected_id!==m||v(m)!==w){await Ie().catch(()=>{});return}pe&&await pe().catch(()=>{}),pe=Ie,qe=w}catch(Ie){t("detail subscribe failed: %o",Ie),Ee(Ie,"issue details")}finally{Me===w&&(Me=null)}}let Re=new Map,Be=new Set,ze={board:0,worker:0},vt=!1,Ft=ts;try{let m=window.localStorage.getItem(ff);Oi(m)&&(Ft=m)}catch{}let xt="today";try{let m=window.localStorage.getItem(Jy);m!==null&&(xt=On(m))}catch{}async function O(m){if(!Oi(m)||m===Ft)return;Ft=m;try{window.localStorage.setItem(ff,m)}catch{}let w=Re.get(or);if(!w)return;Re.delete(or),await w().catch(()=>{});let z=Rt();try{Ne.register(or,z)}catch(ce){t("register %s store failed: %o",or,ce)}try{let ce=await ye.subscribeList(or,z);Re.set(or,ce)}catch(ce){t("re-subscribe %s failed: %o",or,ce),Ee(ce,"board")}}async function oe(m){let w=On(m);if(w===xt)return;xt=w;let z=E.get(rr);if(!z)return;E.delete(rr),await z().catch(()=>{});let ce=bt();try{Ne.register(rr,ce)}catch(Ie){t("register %s store failed: %o",rr,Ie)}try{let Ie=await ye.subscribeList(rr,ce);E.set(rr,Ie)}catch(Ie){t("re-subscribe %s failed: %o",rr,Ie),Ee(Ie,"worker")}}let E=new Map,V=null,ot=null,Ke=null,ct=null,Tt=null;async function cn(){ct=null,re.clear(),Tt=null,_e.clear(),V=null,ot=null,Re.clear(),E.clear(),ze.board+=1,ze.worker+=1,Gt();let m=y.getState().workspace.current?.path;if(m)try{await ge.send("set-workspace",{path:m})}catch(z){t("workspace restore after reconnect failed: %o",z);return}Ot();let w=y.getState();Ge(w.view==="board"),Le(w.view==="worker"),tt(Ue(w)),Pe(w.view==="board"||w.view==="worker"||!!w.selected_id)}async function Lt(){t("clearing all subscriptions for workspace switch"),we(),Ve(),Xe(),De.clear(),Ye(),kt(),At(),Ot(),ne();let m=y.getState();if(m.selected_id)try{Ne.unregister(`detail:${m.selected_id}`)}catch{}let w=y.getState();Ge(w.view==="board"),Le(w.view==="worker"),tt(Ue(w)),Pe(w.view==="board"||w.view==="worker"||!!w.selected_id),w.selected_id&&he(w.selected_id)}async function Kt(m){t("requesting workspace switch to %s",m),Q=!0;try{let w=await ge.send("set-workspace",{path:m});t("workspace switch result: %o",w),w&&w.workspace&&(y.setState({workspace:{current:{path:w.workspace.root_dir,database:w.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),w.changed&&(await Lt(),be("Switched to "+Zt(m),"success",2e3)))}catch(w){throw t("workspace switch failed: %o",w),be("Failed to switch workspace","error",3e3),w}finally{Q=!1}}async function jt(m){t("requesting workspace git pull for %s",m);try{let w=await ge.send("git-pull-workspace",{});t("workspace git pull result: %o",w);let z=w?.status;if(z==="up_to_date"){be("Already up to date","success",2e3);return}if(z==="stash_pop_conflict"){be("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}be("Git pulled "+Zt(m),"success",2e3)}catch(w){t("workspace git pull failed: %o",w);let z=w?.code,ce=w?.message;if(z==="rebase_conflict"){be("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(z==="rebase_conflict_abort_failed"){be("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(z==="busy"){be("Git pull skipped: another operation is running","warning",3e3);return}let Ie=ce?`: ${ce}`:"";throw be(`Git pull failed${Ie}`,"error",3e3),w}}async function It(m,w){t("setting workspace visibility %s \u2192 %s",m,String(w));try{await ge.send("set-workspace-visibility",{path:m,visible:w}),await Yt()}catch(z){t("workspace visibility update failed: %o",z),be("Failed to update project visibility","error",3e3)}}async function Yt(){try{let m=await ge.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let w=m.workspaces.map(k=>({path:k.path,database:k.database,pid:k.pid,version:k.version})),z=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,ce=Array.isArray(m.hidden)?m.hidden.filter(k=>typeof k=="string"):[];y.setState({workspace:{current:z,available:w,hidden:ce}});let Ie=window.localStorage.getItem("beads-ui.workspace");Ie&&(!w.some($=>$.path===Ie)||ce.includes(Ie)?window.localStorage.removeItem("beads-ui.workspace"):z&&Ie!==z.path&&(t("restoring saved workspace preference: %s",Ie),await Kt(Ie)))}}catch(m){t("failed to load workspaces: %o",m)}}ge.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(y.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),Yt(),Lt())});let zt=!1;if(typeof ge.onConnection=="function"){let m=w=>{t("ws state %s",w),w==="reconnecting"||w==="closed"?(zt=!0,be("Connection lost. Reconnecting\u2026","error",4e3)):w==="open"&&zt&&(zt=!1,be("Reconnected","success",2200),Zy(y,(z,ce)=>{t(`${z}: %o`,ce)}),cn())};ge.onConnection(m)}let un="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(un=m)}catch(m){t("view parse error: %o",m)}let y=Kl({config:Xy(),view:un});ge.on("worker-queue-snapshot",m=>{let w=m;if(!w||!w.queue)return;let z=y.getState().workspace.current?.path;if(typeof z=="string"&&z.length>0&&w.root_dir!==z){t("dropping worker-queue snapshot for %s",String(w.root_dir));return}try{De.set(w.queue)}catch{}});let f=Hl(y);f.start();let j=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),ue=async(m,w)=>{try{return await xe(m,w)}catch(z){if(j.has(m))throw z;return[]}};ap({global_element:r,repo_element:o},y,f);let ae=document.getElementById("workspace-picker");ae&&nf(ae,y,Kt,jt,It);let We=dp(e,(m,w)=>xe(m,w));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>We.open())}catch{}let at=mp(e,{policyStore:re,queueStore:De,implPresetStore:_e,transport:(m,w)=>xe(m,w),onOpenChange:m=>{let w=vt;vt=m,Nt(),w&&m===!1&&ht.refreshSessionDefaults()},labelOptions:()=>{let m=new Set;for(let[w]of sl)for(let z of Ne.snapshotFor(w)||[]){let ce=z.labels;if(Array.isArray(ce))for(let Ie of ce)typeof Ie=="string"&&Ie.length>0&&m.add(Ie)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&(m.setAttribute("aria-label","\uC124\uC815"),m.setAttribute("title","\uC124\uC815"),m.addEventListener("click",()=>at.open()))}catch{}let ut=document.createElement("div");ut.className="md-viewer-root",document.body.appendChild(ut);let st=di(ut,{getWorkspacePath:()=>y.getState().workspace.current?.path}),gt=uc(l,{gotoIssue:m=>f.gotoIssue(m),issueStores:Ne,transport:ue,workerQueueStore:De,uiOrderStore:de,displayPolicyStore:re,closedRange:Ft,onClosedRangeChange:m=>{O(m)},onNewIssue:()=>We.open(),openDoc:_t}),ht=nl(a,{transport:ue,issueStores:Ne,queueStore:De,sessionLogStore:ve,gotoIssue:m=>y.setState({selected_id:m}),getWorkspacePath:()=>y.getState().workspace.current?.path,switchWorkspace:m=>Kt(m),openDoc:_t,doneRange:xt,onDoneRangeChange:m=>{oe(m)}}),h=ip(c,{transport:ue,pipelineStore:B,execPresetStore:_e,sessionLogStore:ve,router:f,gotoIssue:m=>f.gotoIssue(m),getWorkspacePath:()=>y.getState().workspace.current?.path,switchWorkspace:m=>Kt(m),openDoc:_t}),b=Cd(d,{issueStores:Ne,transport:ue,queueStore:De,execPresetStore:_e,sessionLogStore:ve,getWorkspacePath:()=>y.getState().workspace.current?.path,mdViewer:st,depCandidates:()=>{let m=B.get();if(m===null)return null;let w=B.getWorkspacesState(),z=y.getState();if(z.view==="monitor")return ga(m,w);let ce=z.workspace.current?.path;return ce?ga(m,w,{root_dir:ce}):null},subscribeCandidates:m=>B.subscribe(m),onDepChanged:({type:m,a:w,b:z})=>{let ce=h;m==="dep-add"&&ce&&typeof ce.recorrectSharedLane=="function"&&ce.recorrectSharedLane(m,w,z)},onNavigate:(m,w)=>{let z=()=>{y.getState().view==="worker"?y.setState({selected_id:m}):f.gotoIssue(m)},ce=y.getState().workspace.current?.path;if(typeof w!="string"||w.length===0||!ce||w===ce){z();return}Promise.resolve(Kt(w)).then(z).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let m=y.getState();y.setState({selected_id:null});try{f.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{at.open("execution")}}),R=y.getState().selected_id;R&&(d.hidden=!1,b.load(R),he(R)),y.subscribe(m=>{let w=m.selected_id;w?(d.hidden=!1,b.load(w),Q||he(w)):(b.clear(),d.hidden=!0,ne())});let M=m=>{l.hidden=m.view!=="board",a.hidden=m.view!=="worker",c.hidden=m.view!=="monitor",s&&s.classList.toggle("is-quiet",m.view==="monitor"),Ge(m.view==="board"),Le(m.view==="worker"),tt(Ue(m)),Pe(m.view==="board"||m.view==="worker"||vt||!!m.selected_id),!m.selected_id&&m.view==="board"&&gt.load(),m.view==="worker"&&ht.load(),m.view==="monitor"?h.load():h.pause(),window.localStorage.setItem("beads-ui.view",m.view)};y.subscribe(M),M(y.getState()),kt(),Ot(),Gt(),Yt().finally(()=>{Y=!0,He()}),window.addEventListener("keydown",m=>{let w=m.ctrlKey||m.metaKey,z=String(m.key||"").toLowerCase(),ce=m.target,Ie=ce&&ce.tagName?String(ce.tagName).toLowerCase():"",k=Ie==="input"||Ie==="textarea"||Ie==="select"||ce&&typeof ce.isContentEditable=="boolean"&&ce.isContentEditable;w&&z==="n"&&(k||(m.preventDefault(),We.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&nv(t)});export{nv as bootstrap,Xy as readBootstrapConfig,Zy as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
